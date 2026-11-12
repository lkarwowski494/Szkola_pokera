/*
 * Solver jednego stołu bez abstrakcji kart, flop + turn + river (plan B, etap B4, docs/solver/plan-b-etapy.md).
 * Wierne odwzorowanie src/flop/game.ts (te same reguły drzewa, terminale, DCFR α 1,5 β 0 γ 2, NashConv),
 * w C z OpenMP: równolegle po kartach węzła losowego najwyższego poziomu. Regrety i sumy strategii float32.
 * Model gry: D-1333 (docs/decyzje/FB.md). Ewaluator 7 kart skopiowany z tools/equity/boards.c (eval7).
 *
 * Kompilacja: gcc -O3 -march=native -fopenmp native/flop.c -o flop -lm
 * Użycie:     ./flop wejście.json wyjście.json      (format: src/flop/native.ts)
 */
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#ifdef _OPENMP
#include <omp.h>
#endif

#define NC 1326
/* typ regretów i sum strategii: float (domyślnie, pamięć) albo double (-DREAL=double, testy różnicowe z TS) */
#ifndef REAL
#define REAL float
#endif

/* ---------- ewaluator (tools/equity/boards.c:24-42): wyższa liczba = silniejsza ręka ---------- */
static int straight_hi(int m) {
  for (int h = 12; h >= 3; h--) { int need = (h == 3) ? (0xF | (1 << 12)) : (0x1F << (h - 4)); if ((m & need) == need) return h + 1; }
  return 0;
}
static int topbits(int m, int n) { int r = 0, c = 0; for (int i = 12; i >= 0 && c < n; i--) if (m & (1 << i)) { r |= 1 << i; c++; } return r; }
static unsigned eval7(const int *c) {
  int cnt[13] = {0}, sm[4] = {0}, all = 0;
  for (int i = 0; i < 7; i++) { int r = c[i] >> 2, s = c[i] & 3; cnt[r]++; sm[s] |= 1 << r; all |= 1 << r; }
  for (int s = 0; s < 4; s++) if (__builtin_popcount(sm[s]) >= 5) { int sh = straight_hi(sm[s]); if (sh) return (8u << 26) | sh; return (5u << 26) | topbits(sm[s], 5); }
  int quad = -1, trips[2] = {-1, -1}, nt = 0, pairs[3] = {-1, -1, -1}, np = 0;
  for (int r = 12; r >= 0; r--) { if (cnt[r] == 4) quad = r; else if (cnt[r] == 3) { if (nt < 2) trips[nt++] = r; } else if (cnt[r] == 2) { if (np < 3) pairs[np++] = r; } }
  if (quad >= 0) return (7u << 26) | (quad << 13) | topbits(all & ~(1 << quad), 1);
  if (nt >= 1 && (nt >= 2 || np >= 1)) { int p = nt >= 2 ? trips[1] : pairs[0]; if (nt >= 2 && np >= 1 && pairs[0] > p) p = pairs[0]; return (6u << 26) | (trips[0] << 13) | (1 << p); }
  int sh = straight_hi(all); if (sh) return (4u << 26) | sh;
  if (nt == 1) return (3u << 26) | (trips[0] << 13) | topbits(all & ~(1 << trips[0]), 2);
  if (np >= 2) return (2u << 26) | (((1 << pairs[0]) | (1 << pairs[1])) << 13) | topbits(all & ~((1 << pairs[0]) | (1 << pairs[1])), 1);
  if (np == 1) return (1u << 26) | (pairs[0] << 13) | topbits(all & ~(1 << pairs[0]), 3);
  return topbits(all, 5);
}

/* ---------- minimalny parser JSON (obiekty, tablice, liczby, napisy, true/false/null) ---------- */
typedef struct J { char t; double num; char *str; int n; char **keys; struct J **v; } J;
static const char *jp;
static void jws(void) { while (*jp == ' ' || *jp == '\n' || *jp == '\r' || *jp == '\t') jp++; }
static void jdie(const char *m) { fprintf(stderr, "JSON: %s przy '%.20s'\n", m, jp); exit(2); }
static char *jstring(void) {
  if (*jp != '"') jdie("oczekiwano napisu");
  const char *s = ++jp;
  while (*jp && *jp != '"') { if (*jp == '\\') jp++; jp++; }
  size_t n = (size_t)(jp - s);
  char *o = malloc(n + 1); memcpy(o, s, n); o[n] = 0; jp++;
  return o;
}
static J *jvalue(void) {
  jws();
  J *x = calloc(1, sizeof(J));
  if (*jp == '{' || *jp == '[') {
    char close = *jp == '{' ? '}' : ']';
    x->t = *jp == '{' ? 'o' : 'a'; jp++;
    int cap = 8; x->v = malloc(cap * sizeof(J *)); if (x->t == 'o') x->keys = malloc(cap * sizeof(char *));
    jws();
    if (*jp == close) { jp++; return x; }
    for (;;) {
      if (x->n == cap) { cap *= 2; x->v = realloc(x->v, cap * sizeof(J *)); if (x->t == 'o') x->keys = realloc(x->keys, cap * sizeof(char *)); }
      if (x->t == 'o') { jws(); x->keys[x->n] = jstring(); jws(); if (*jp != ':') jdie("oczekiwano ':'"); jp++; }
      x->v[x->n++] = jvalue();
      jws();
      if (*jp == ',') { jp++; continue; }
      if (*jp == close) { jp++; return x; }
      jdie("oczekiwano ',' albo zamknięcia");
    }
  }
  if (*jp == '"') { x->t = 's'; x->str = jstring(); return x; }
  if (!strncmp(jp, "true", 4)) { x->t = 'b'; x->num = 1; jp += 4; return x; }
  if (!strncmp(jp, "false", 5)) { x->t = 'b'; x->num = 0; jp += 5; return x; }
  if (!strncmp(jp, "null", 4)) { x->t = 'n'; jp += 4; return x; }
  char *end; x->t = 'd'; x->num = strtod(jp, &end); if (end == jp) jdie("oczekiwano wartości"); jp = end; return x;
}
static J *jget(J *o, const char *k) { if (!o || o->t != 'o') return NULL; for (int i = 0; i < o->n; i++) if (!strcmp(o->keys[i], k)) return o->v[i]; return NULL; }
static double jnum(J *o, const char *k, double def) { J *x = jget(o, k); return x && (x->t == 'd' || x->t == 'b') ? x->num : def; }

/* ---------- specyfikacja gry (jak GameSpec w game.ts) ---------- */
static int board0[5], nb0;
static double range_[2][NC];
static double POT, STACK, RAISE_MULT, ALLIN_FRAC, RAKE_RATE, RAKE_CAP;
static int IP_BET_AFTER_CHECK = 1, OOP_CHECKED_FIRST = 0;
static int nbets[3], bets_bb[3]; static double bets[3][8];
static int nlead[3]; static double lead[3][8]; static int noraise[3]; /* 1 = ulica bez przebić (D-1400) */ /* pierwszy zakład OOP na ulicy w bb (donk, D-1335 M3); 0 = rozmiary ulicy */
static int turn_allowed[52], river_allowed[52], has_turn_allowed, has_river_allowed;
static double ALPHA = 1.5, BETA = 0, GAMMA = 2;

static int C1[NC], C2[NC];
static int WITH[52][51];
static int act[2][NC], nact[2], actall[NC], nactall;
static int pos[2][NC]; /* indeks kombinacji w act[p] albo -1 */

/* ---------- drzewo ---------- */
typedef struct Node Node;
struct Node {
  char k; /* 'd' decyzja, 't' terminal, 'c' losowy */
  int p, nA; char **labels; Node **ch; REAL *reg, *sum; /* decyzja */
  int winner; double c0, c1; uint64_t bmask; struct SD *sd; /* terminal */
  int ncards; int *cards; double div; /* losowy */
};

/* kolejność siły na pełnym stole (od najsłabszej), tylko kombinacje aktywne */
typedef struct SD { uint64_t key; int n; int *ord; unsigned *str; } SD;
#define SDCAP 8192
static SD *sdtab[SDCAP];
static SD *sd_for(const int *b) {
  uint64_t key = 0; for (int i = 0; i < 5; i++) key |= 1ull << b[i];
  uint64_t h = (key * 0x9E3779B97F4A7C15ull) >> 51;
  while (sdtab[h & (SDCAP - 1)] && sdtab[h & (SDCAP - 1)]->key != key) h++;
  if (sdtab[h & (SDCAP - 1)]) return sdtab[h & (SDCAP - 1)];
  SD *s = calloc(1, sizeof(SD)); s->key = key; s->ord = malloc(nactall * sizeof(int)); s->str = malloc(nactall * sizeof(unsigned));
  int c[7]; for (int i = 0; i < 5; i++) c[i] = b[i];
  for (int j = 0; j < nactall; j++) {
    int i = actall[j];
    if ((key >> C1[i]) & 1 || (key >> C2[i]) & 1) continue;
    c[5] = C1[i]; c[6] = C2[i];
    s->ord[s->n] = i; s->str[s->n] = eval7(c); s->n++;
  }
  /* sortowanie przez wstawianie po sile rosnąco (od najsłabszej); n ≤ 1326, raz na planszę */
  for (int a = 1; a < s->n; a++) { int oi = s->ord[a]; unsigned os = s->str[a]; int b2 = a - 1; while (b2 >= 0 && s->str[b2] > os) { s->ord[b2 + 1] = s->ord[b2]; s->str[b2 + 1] = s->str[b2]; b2--; } s->ord[b2 + 1] = oi; s->str[b2 + 1] = os; }
  sdtab[h & (SDCAP - 1)] = s;
  return s;
}

typedef struct { int board[5]; int nb; int street; double c[2], s[2]; int toAct; char hist; } St;
static long n_dec = 0; static size_t bytes_tab = 0;

static char *fmt_label(char kind, double x) {
  char buf[64]; double r = round(x * 100) / 100; snprintf(buf, sizeof buf, "%c%.2f", kind, r);
  char *d = strchr(buf, '.'); if (d) { char *e = buf + strlen(buf) - 1; while (e > d && *e == '0') *e-- = 0; if (e == d) *e = 0; }
  return strdup(buf);
}
static double remaining(const St *st, int p) { return STACK - st->c[p]; }
static double sized(const St *st, int p, double total) {
  double rem = remaining(st, p) + st->s[p];
  if (total >= rem || total - st->s[p] >= ALLIN_FRAC * remaining(st, p)) return rem;
  return total;
}
static St put(const St *st, int p, double total, char hist) {
  St n = *st; double add = total - st->s[p]; n.c[p] += add; n.s[p] += add; n.toAct = p == 0 ? 1 : 0; n.hist = hist; return n;
}
static Node *build(const St *st);
static Node *terminal(const St *st, int winner) {
  Node *n = calloc(1, sizeof(Node)); n->k = 't'; n->winner = winner; n->c0 = st->c[0]; n->c1 = st->c[1];
  for (int i = 0; i < st->nb; i++) n->bmask |= 1ull << st->board[i];
  if (winner == -1) n->sd = sd_for(st->board);
  return n;
}
static Node *next_street(const St *st) {
  if (st->nb == 5) return terminal(st, -1);
  int *allowed = st->nb == 3 ? (has_turn_allowed ? turn_allowed : NULL) : (has_river_allowed ? river_allowed : NULL);
  Node *n = calloc(1, sizeof(Node)); n->k = 'c'; n->cards = malloc(52 * sizeof(int)); n->ch = malloc(52 * sizeof(Node *));
  int nallowed = 0; if (allowed) for (int c = 0; c < 52; c++) nallowed += allowed[c];
  for (int card = 0; card < 52; card++) {
    int on = 0; for (int i = 0; i < st->nb; i++) if (st->board[i] == card) on = 1;
    if (on || (allowed && !allowed[card])) continue;
    St nx = *st; nx.board[nx.nb++] = card; nx.street++; nx.s[0] = nx.s[1] = 0; nx.toAct = 0; nx.hist = 0;
    int allin = remaining(st, 0) <= 1e-9 || remaining(st, 1) <= 1e-9;
    n->cards[n->ncards] = card; n->ch[n->ncards] = allin ? next_street(&nx) : build(&nx); n->ncards++;
  }
  n->div = allowed ? nallowed : 52 - st->nb - 4;
  return n;
}
static Node *dec(int p, int nA, char **labels, Node **ch) {
  Node *n = calloc(1, sizeof(Node)); n->k = 'd'; n->p = p; n->nA = nA; n->labels = labels; n->ch = ch;
  size_t sz = (size_t)nA * nact[p];
  n->reg = calloc(sz, sizeof(REAL)); n->sum = calloc(sz, sizeof(REAL));
  if (!n->reg || !n->sum) { fprintf(stderr, "brak pamięci (%zu MB w tablicach)\n", bytes_tab >> 20); exit(3); }
  n_dec++; bytes_tab += 2 * sz * sizeof(REAL);
  return n;
}
static Node *build(const St *st) {
  int p = st->toAct, o = p == 0 ? 1 : 0;
  char **lab = malloc(8 * sizeof(char *)); Node **ch = malloc(8 * sizeof(Node *)); int nA = 0;
  if (st->hist == 0 || st->hist == 'x') {
    if (st->hist == 0) { St x = *st; x.toAct = 1; x.hist = 'x'; lab[nA] = strdup("x"); ch[nA++] = build(&x); }
    else { lab[nA] = strdup("x"); ch[nA++] = next_street(st); }
    if (st->hist == 0 || IP_BET_AFTER_CHECK) {
      double potNow = POT + st->c[0] + st->c[1]; double seen[8]; int ns = 0;
      int useLead = p == 0 && st->hist == 0 && nlead[st->street] > 0;
      int nb = useLead ? nlead[st->street] : nbets[st->street];
      for (int i = 0; i < nb; i++) {
        double raw = useLead ? lead[st->street][i] : bets_bb[st->street] ? bets[st->street][i] : bets[st->street][i] * potNow;
        double amt = sized(st, p, raw); double key = round(amt * 1e6); int dup = 0;
        for (int j = 0; j < ns; j++) if (seen[j] == key) dup = 1;
        if (amt <= 0 || dup) continue;
        seen[ns++] = key; St b = put(st, p, amt, 'b'); lab[nA] = fmt_label('b', amt); ch[nA++] = build(&b);
      }
    }
    return dec(p, nA, lab, ch);
  }
  lab[nA] = strdup("f"); ch[nA++] = terminal(st, o);
  double callTo = st->s[o] < st->s[p] + remaining(st, p) ? st->s[o] : st->s[p] + remaining(st, p);
  St c = put(st, p, callTo, st->hist); lab[nA] = strdup("c"); ch[nA++] = next_street(&c);
  int facingAllIn = remaining(st, o) <= 1e-9;
  if (st->hist == 'b' && RAISE_MULT > 0 && !noraise[st->street] && !facingAllIn && remaining(st, p) > st->s[o] - st->s[p]) {
    double amt = sized(st, p, RAISE_MULT * st->s[o]); St r = put(st, p, amt, 'r');
    lab[nA] = fmt_label('r', amt); ch[nA++] = build(&r);
  }
  return dec(p, nA, lab, ch);
}

/* ---------- przejścia ---------- */
enum { TRAIN, AVG, BR };
static double posW, negW, avgW;

static void compat_sum(uint64_t bmask, const double *opp, double *R) {
  double card[52] = {0}, tot = 0;
  for (int j = 0; j < nactall; j++) { int i = actall[j]; double r = opp[i]; if (r == 0) continue; tot += r; card[C1[i]] += r; card[C2[i]] += r; }
  for (int j = 0; j < nactall; j++) { int i = actall[j]; R[i] = ((bmask >> C1[i]) & 1 || (bmask >> C2[i]) & 1) ? 0 : tot - card[C1[i]] - card[C2[i]] + opp[i]; }
}

static void term_value(const Node *t, int p, const double *opp, double *out) {
  double T = POT + t->c0 + t->c1, rake = T * RAKE_RATE < RAKE_CAP ? T * RAKE_RATE : RAKE_CAP, net = T - rake;
  double own = p == 0 ? t->c0 : t->c1;
  double *R = malloc(NC * sizeof(double));
  if (t->winner != -1) {
    compat_sum(t->bmask, opp, R);
    double pay = (t->winner == p ? net : 0) - own;
    for (int j = 0; j < nactall; j++) { int i = actall[j]; out[i] = pay * R[i]; }
    free(R); return;
  }
  const SD *s = t->sd; double accC[52] = {0}, gC[52] = {0}, acc = 0;
  for (int j = 0; j < nactall; j++) out[actall[j]] = 0;
  int k = 0;
  while (k < s->n) {
    int e = k; unsigned sv = s->str[k];
    while (e < s->n && s->str[e] == sv) e++;
    double g = 0;
    for (int j = k; j < e; j++) { int i = s->ord[j]; double r = opp[i]; g += r; gC[C1[i]] += r; gC[C2[i]] += r; }
    for (int j = k; j < e; j++) {
      int i = s->ord[j];
      double win = acc - accC[C1[i]] - accC[C2[i]], tie = g - gC[C1[i]] - gC[C2[i]] + opp[i];
      out[i] = net * (win + tie / 2);
    }
    for (int j = k; j < e; j++) { int i = s->ord[j]; double r = opp[i]; acc += r; accC[C1[i]] += r; accC[C2[i]] += r; gC[C1[i]] = 0; gC[C2[i]] = 0; }
    k = e;
  }
  if (own != 0) { compat_sum(t->bmask, opp, R); for (int j = 0; j < nactall; j++) { int i = actall[j]; out[i] -= own * R[i]; } }
  free(R);
}

static void sigma(const Node *d, int avg, double *sig /* nact[p] × nA */) {
  int nA = d->nA, np = nact[d->p]; const REAL *src = avg ? d->sum : d->reg;
  for (int q = 0; q < np; q++) {
    double tot = 0;
    for (int a = 0; a < nA; a++) { double v = src[(size_t)q * nA + a]; if (v > 0) tot += v; }
    for (int a = 0; a < nA; a++) { double v = src[(size_t)q * nA + a]; sig[q * nA + a] = tot > 0 ? (v > 0 ? v / tot : 0) : 1.0 / nA; }
  }
}

static void walk(const Node *n, int p, const double *r0, const double *r1, int mode, double *out);

static void walk_chance(const Node *n, int p, const double *r0, const double *r1, int mode, double *out) {
  for (int j = 0; j < nact[p]; j++) out[act[p][j]] = 0;
  int par = 0;
#ifdef _OPENMP
  par = !omp_in_parallel();
#endif
  double *vals = malloc((size_t)n->ncards * NC * sizeof(double));
#pragma omp parallel for schedule(dynamic, 1) if (par)
  for (int ci = 0; ci < n->ncards; ci++) {
    int card = n->cards[ci];
    double *a0 = malloc(NC * sizeof(double)), *a1 = malloc(NC * sizeof(double));
    memcpy(a0, r0, NC * sizeof(double)); memcpy(a1, r1, NC * sizeof(double));
    for (int w = 0; w < 51; w++) { a0[WITH[card][w]] = 0; a1[WITH[card][w]] = 0; }
    double *v = vals + (size_t)ci * NC;
    walk(n->ch[ci], p, a0, a1, mode, v);
    for (int w = 0; w < 51; w++) v[WITH[card][w]] = 0;
    free(a0); free(a1);
  }
  for (int ci = 0; ci < n->ncards; ci++) { const double *v = vals + (size_t)ci * NC; for (int j = 0; j < nact[p]; j++) { int i = act[p][j]; out[i] += v[i]; } }
  for (int j = 0; j < nact[p]; j++) out[act[p][j]] /= n->div;
  free(vals);
}

static void walk(const Node *n, int p, const double *r0, const double *r1, int mode, double *out) {
  if (n->k == 't') { term_value(n, p, p == 0 ? r1 : r0, out); return; }
  if (n->k == 'c') { walk_chance(n, p, r0, r1, mode, out); return; }
  int nA = n->nA, q = n->p, nq = nact[q];
  double *sig = malloc((size_t)nq * nA * sizeof(double));
  sigma(n, mode != TRAIN, sig);
  double *r = malloc(NC * sizeof(double));
  if (q != p) {
    const double *opp = q == 0 ? r0 : r1;
    double *v = malloc(NC * sizeof(double));
    for (int j = 0; j < nact[p]; j++) out[act[p][j]] = 0;
    memset(r, 0, NC * sizeof(double));
    for (int a = 0; a < nA; a++) {
      for (int j = 0; j < nq; j++) { int i = act[q][j]; r[i] = opp[i] * sig[j * nA + a]; }
      walk(n->ch[a], p, q == 0 ? r : r0, q == 0 ? r1 : r, mode, v);
      for (int j = 0; j < nact[p]; j++) { int i = act[p][j]; out[i] += v[i]; }
    }
    free(v); free(r); free(sig); return;
  }
  const double *own = p == 0 ? r0 : r1;
  double *vals = malloc((size_t)nA * NC * sizeof(double));
  memset(r, 0, NC * sizeof(double));
  for (int a = 0; a < nA; a++) {
    for (int j = 0; j < nq; j++) { int i = act[q][j]; r[i] = own[i] * sig[j * nA + a]; }
    walk(n->ch[a], p, p == 0 ? r : r0, p == 0 ? r1 : r, mode, vals + (size_t)a * NC);
  }
  for (int j = 0; j < nq; j++) {
    int i = act[q][j];
    if (mode == BR) { double best = -INFINITY; for (int a = 0; a < nA; a++) if (vals[(size_t)a * NC + i] > best) best = vals[(size_t)a * NC + i]; out[i] = best; continue; }
    double s = 0; for (int a = 0; a < nA; a++) s += sig[j * nA + a] * vals[(size_t)a * NC + i];
    out[i] = s;
    if (mode != TRAIN) continue;
    for (int a = 0; a < nA; a++) {
      size_t ix = (size_t)j * nA + a;
      double rr = n->reg[ix] + (vals[(size_t)a * NC + i] - s);
      n->reg[ix] = (REAL)(rr > 0 ? rr * posW : rr * negW);
      n->sum[ix] = (REAL)(n->sum[ix] * avgW + own[i] * sig[j * nA + a]);
    }
  }
  free(vals); free(r); free(sig);
}

static uint64_t board_mask0(void) { uint64_t m = 0; for (int i = 0; i < nb0; i++) m |= 1ull << board0[i]; return m; }
static double pairs_weight(void) {
  double *R = calloc(NC, sizeof(double)); compat_sum(board_mask0(), range_[1], R);
  double z = 0; for (int i = 0; i < NC; i++) z += range_[0][i] * R[i];
  free(R); return z;
}
static double value(const Node *root, int p, int mode) {
  double *v = calloc(NC, sizeof(double)); walk(root, p, range_[0], range_[1], mode, v);
  double s = 0; for (int i = 0; i < NC; i++) s += range_[p][i] * v[i];
  free(v); return s / pairs_weight();
}

/* średnia strategia węzła decyzji jako "nazwa":{player, actions, freqs[kombinacja × akcja]} */
static void write_strategy(FILE *o, const char *name, const Node *r) {
  double *sig = malloc((size_t)nact[r->p] * r->nA * sizeof(double)); sigma(r, 1, sig);
  fprintf(o, "\"%s\":{\"player\":%d,\"actions\":[", name, r->p);
  for (int a = 0; a < r->nA; a++) fprintf(o, "%s\"%s\"", a ? "," : "", r->labels[a]);
  fprintf(o, "],\"freqs\":[");
  for (int i = 0; i < NC; i++) for (int a = 0; a < r->nA; a++) {
    int q = pos[r->p][i]; double x = q >= 0 ? sig[q * r->nA + a] : 0;
    fprintf(o, "%s%.7g", (i || a) ? "," : "", x);
  }
  fprintf(o, "]}");
  free(sig);
}

/* węzeł decyzji po ścieżce akcji (etykiety jak w game.ts strategyAt, bez gałęzi losowych); NULL = brak */
static const Node *node_at(const Node *n, J *path) {
  for (int k = 0; path && k < path->n; k++) {
    if (n->k != 'd' || path->v[k]->t != 's') return NULL;
    int found = -1; for (int a = 0; a < n->nA; a++) if (!strcmp(n->labels[a], path->v[k]->str)) found = a;
    if (found < 0) return NULL;
    n = n->ch[found];
  }
  return n->k == 'd' ? n : NULL;
}

int main(int argc, char **argv) {
  if (argc < 3) { fprintf(stderr, "użycie: flop wejście.json wyjście.json\n"); return 1; }
  FILE *f = fopen(argv[1], "rb"); if (!f) { perror(argv[1]); return 1; }
  fseek(f, 0, SEEK_END); long len = ftell(f); fseek(f, 0, SEEK_SET);
  char *buf = malloc(len + 1); if (fread(buf, 1, len, f) != (size_t)len) { perror("odczyt"); return 1; } buf[len] = 0; fclose(f);
  jp = buf; J *in = jvalue();

  J *b = jget(in, "board"); nb0 = b->n; for (int i = 0; i < nb0; i++) board0[i] = (int)b->v[i]->num;
  J *rg = jget(in, "ranges"); for (int p = 0; p < 2; p++) for (int i = 0; i < NC; i++) range_[p][i] = rg->v[p]->v[i]->num;
  POT = jnum(in, "pot", 0); STACK = jnum(in, "stack", 0); RAISE_MULT = jnum(in, "raiseMult", 0); ALLIN_FRAC = jnum(in, "allinFrac", 2.0 / 3);
  RAKE_RATE = jnum(in, "rakeRate", 0); RAKE_CAP = jnum(in, "rakeCap", 0);
  IP_BET_AFTER_CHECK = jget(in, "ipBetAfterCheck") ? (int)jnum(in, "ipBetAfterCheck", 1) : 1;
  OOP_CHECKED_FIRST = (int)jnum(in, "oopCheckedFirst", 0);
  J *sts = jget(in, "streets"); if (nb0 + sts->n != 6) { fprintf(stderr, "streets: jeden wpis na każdą ulicę do rivera\n"); return 1; }
  for (int s = 0; s < sts->n; s++) {
    J *bb = jget(sts->v[s], "betsBb"), *bp = jget(sts->v[s], "betsPot"), *src = bb ? bb : bp;
    bets_bb[s] = bb != NULL; nbets[s] = src ? src->n : 0;
    if (nbets[s] > 8) { fprintf(stderr, "streets: najwyżej 8 rozmiarów\n"); return 1; }
    for (int i = 0; i < nbets[s]; i++) bets[s][i] = src->v[i]->num;
    noraise[s] = (int)jnum(sts->v[s], "noRaise", 0);
    J *ld = jget(sts->v[s], "oopLeadBb"); nlead[s] = ld ? ld->n : 0;
    if (nlead[s] > 8) { fprintf(stderr, "oopLeadBb: najwyżej 8 rozmiarów\n"); return 1; }
    for (int i = 0; i < nlead[s]; i++) lead[s][i] = ld->v[i]->num;
  }
  J *tc = jget(in, "turnCards"); if (tc) { has_turn_allowed = 1; for (int i = 0; i < tc->n; i++) turn_allowed[(int)tc->v[i]->num] = 1; }
  J *rc = jget(in, "riverCards"); if (rc) { has_river_allowed = 1; for (int i = 0; i < rc->n; i++) river_allowed[(int)rc->v[i]->num] = 1; }
  int iters = (int)jnum(in, "iterations", 100), every = (int)jnum(in, "reportEvery", 0);
  double target = jnum(in, "targetNashConvPot", 0); /* > 0: stop, gdy NashConv ÷ pula spadnie poniżej (sprawdzane co reportEvery) */
  ALPHA = jnum(in, "alpha", 1.5); BETA = jnum(in, "beta", 0); GAMMA = jnum(in, "gamma", 2);
#ifdef _OPENMP
  int threads = (int)jnum(in, "threads", 0); if (threads > 0) omp_set_num_threads(threads);
  omp_set_max_active_levels(1);
#endif

  { int i = 0; for (int a = 0; a < 52; a++) for (int c = a + 1; c < 52; c++) { C1[i] = a; C2[i] = c; i++; } }
  for (int c = 0; c < 52; c++) { int w = 0; for (int i = 0; i < NC; i++) if (C1[i] == c || C2[i] == c) WITH[c][w++] = i; }
  uint64_t bm = board_mask0(); int seen[NC] = {0};
  for (int p = 0; p < 2; p++) {
    nact[p] = 0;
    for (int i = 0; i < NC; i++) { pos[p][i] = -1; if (range_[p][i] > 0 && !((bm >> C1[i]) & 1) && !((bm >> C2[i]) & 1)) { pos[p][i] = nact[p]; act[p][nact[p]++] = i; seen[i] = 1; } }
  }
  for (int i = 0; i < NC; i++) if (seen[i]) actall[nactall++] = i;

  struct timespec t0, t1; clock_gettime(CLOCK_MONOTONIC, &t0);
  St st; memset(&st, 0, sizeof st); for (int i = 0; i < nb0; i++) st.board[i] = board0[i]; st.nb = nb0;
  if (OOP_CHECKED_FIRST) { st.toAct = 1; st.hist = 'x'; }
  Node *root = build(&st);
  const Node *node = node_at(root, jget(in, "path"));
  if (!node) { fprintf(stderr, "path: brak węzła decyzji na tej ścieżce\n"); return 4; }
  clock_gettime(CLOCK_MONOTONIC, &t1);
  fprintf(stderr, "drzewo: %ld węzłów decyzji, %zu MB tablic, %.1f s; aktywne kombinacje OOP %d, IP %d\n", n_dec, bytes_tab >> 20,
          (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9, nact[0], nact[1]);

  double nashconv = NAN;
  for (int t = 1; t <= iters; t++) {
    posW = pow(t, ALPHA) / (pow(t, ALPHA) + 1); negW = pow(t, BETA) / (pow(t, BETA) + 1); avgW = pow((double)t / (t + 1), GAMMA);
    double *v = malloc(NC * sizeof(double));
    for (int p = 0; p < 2; p++) walk(root, p, range_[0], range_[1], TRAIN, v);
    free(v);
    if (every > 0 && (t % every == 0 || t == iters)) {
      nashconv = 0; for (int p = 0; p < 2; p++) nashconv += value(root, p, BR) - value(root, p, AVG);
      clock_gettime(CLOCK_MONOTONIC, &t1);
      fprintf(stderr, "it %d: %.1f s, NashConv %.4f%% puli\n", t, (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9, 100 * nashconv / POT);
      if (target > 0 && nashconv / POT < target) { iters = t; break; }
    }
  }
  double v0 = value(root, 0, AVG);
  if (isnan(nashconv) || every == 0 || iters % every != 0) { nashconv = 0; for (int p = 0; p < 2; p++) nashconv += value(root, p, BR) - value(root, p, AVG); }
  clock_gettime(CLOCK_MONOTONIC, &t1);
  double secs = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;

  FILE *o = fopen(argv[2], "w"); if (!o) { perror(argv[2]); return 1; }
  fprintf(o, "{\"iterations\":%d,\"nashConv\":%.10g,\"nashConvPot\":%.10g,\"valueOop\":%.10g,\"seconds\":%.3f,\"decisionNodes\":%ld,\"tableMB\":%zu,\n",
          iters, nashconv, nashconv / POT, v0, secs, n_dec, bytes_tab >> 20);
  write_strategy(o, "root", root);
  fprintf(o, ",\n");
  write_strategy(o, "node", node);
  fprintf(o, "}\n");
  fclose(o);
  return 0;
}
