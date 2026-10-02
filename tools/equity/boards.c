/*
 * Tablice gry po flopie z nowymi kartami (solver preflop, wersja 3b: flop, turn i river jako osobne ulice).
 *
 * Dla F losowych flopów, T losowych turnów na flop i R losowych riverów na turn (deterministyczne ziarno):
 * na każdej planszy (3, 4 albo 5 kart) liczymy dokładne equity każdej pary rozłącznych kombinacji po wszystkich
 * dokończeniach do 5 kart, cechy OCHS (equity przeciw 8 grupom rąk rywala z oktyli E[HS], Johanson i in. 2013),
 * k-średnie → B koszyków posortowanych od najsłabszego, i macierze koszyk × koszyk:
 *   E[a][b] = Σ equity(x, y), D[a][b] = liczba par rozłącznych (x ∈ a, y ∈ b).
 * Przejścia między ulicami (który koszyk turnu dla kombinacji z koszyka flopu) wynikają z tablic koszyków.
 *
 * Format (little endian): "SZKPPF2\0", uint32 F, T, R, B; dalej dla każdego flopu:
 *   plansza flopu, potem T × (plansza turnu, potem R × plansza rivera).
 * Plansza: 4 bajty (nowe karty: flop 3, turn/river 1, reszta zera), 1326 × uint8 koszyk (255 = zablokowana),
 *   B×B float32 E, B×B float32 D.
 * Kompilacja: gcc -O3 -march=native -fopenmp boards.c -o boards ; ./boards F T R B SEED > boards.bin
 */
#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <omp.h>

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

static inline uint64_t xs(uint64_t *s) { uint64_t x = *s; x ^= x << 13; x ^= x >> 7; x ^= x << 17; return *s = x; }

#define NC 1326
#define K_OCHS 8
static int ca[NC], cb[NC];

typedef struct { uint8_t bucket[NC]; float *E, *D; } Board;

static int cmp_dbl_idx_data_dummy;

/* Rozwiązuje jedną planszę (nb = 3, 4 lub 5 kart). */
static void solve_board(const int *board, int nb, int B, uint64_t seed, Board *out) {
  uint64_t bm = 0;
  for (int i = 0; i < nb; i++) bm |= 1ull << board[i];
  int loc[NC], n = 0;
  uint64_t mask[NC];
  for (int g = 0; g < NC; g++) {
    uint64_t m = (1ull << ca[g]) | (1ull << cb[g]);
    if (m & bm) continue;
    mask[n] = m; loc[n++] = g;
  }
  int rest[52], nr = 0;
  for (int c = 0; c < 52; c++) if (!((bm >> c) & 1)) rest[nr++] = c;
  uint16_t *W = calloc((size_t)n * n, sizeof(uint16_t));
  unsigned *rank = malloc(sizeof(unsigned) * n);
  uint8_t *ok = malloc(n);
  int need = 5 - nb;
  double FULL;
  { /* liczba dokończeń dla pary rozłącznej: C(52 - nb - 4, need) */
    int m = 52 - nb - 4; FULL = need == 0 ? 1 : need == 1 ? m : (double)m * (m - 1) / 2; FULL *= 2;
  }
  int cards[7];
  for (int i = 0; i < nb; i++) cards[2 + i] = board[i];
  int t0max = need >= 1 ? nr : 1;
  for (int t = 0; t < t0max; t++) {
    int r0 = need == 2 ? t + 1 : 0, r1 = need == 2 ? nr : 1;
    for (int r = r0; r < r1; r++) {
      uint64_t rm = 0;
      if (need >= 1) { cards[2 + nb] = rest[t]; rm |= 1ull << rest[t]; }
      if (need == 2) { cards[3 + nb] = rest[r]; rm |= 1ull << rest[r]; }
      for (int x = 0; x < n; x++) {
        if (mask[x] & rm) { ok[x] = 0; continue; }
        ok[x] = 1; cards[0] = ca[loc[x]]; cards[1] = cb[loc[x]];
        rank[x] = eval7(cards);
      }
      for (int x = 0; x < n; x++) {
        if (!ok[x]) continue;
        unsigned rx = rank[x];
        uint64_t mx = mask[x];
        uint16_t *row = W + (size_t)x * n;
        for (int y = x + 1; y < n; y++) {
          if (!ok[y] || (mask[y] & mx)) continue;
          row[y] += rx > rank[y] ? 2 : rx == rank[y] ? 1 : 0;
        }
      }
    }
  }
  for (int x = 0; x < n; x++) for (int y = x + 1; y < n; y++) if (!(mask[x] & mask[y])) W[(size_t)y * n + x] = (uint16_t)(FULL - W[(size_t)x * n + y]);
  double *ehs = malloc(sizeof(double) * n);
  for (int x = 0; x < n; x++) {
    double s = 0; int c = 0;
    for (int y = 0; y < n; y++) if (y != x && !(mask[x] & mask[y])) { s += W[(size_t)x * n + y] / FULL; c++; }
    ehs[x] = s / c;
  }
  int *ord = malloc(sizeof(int) * n), *grp = malloc(sizeof(int) * n);
  for (int x = 0; x < n; x++) ord[x] = x;
  for (int i = 1; i < n; i++) { int v = ord[i], j = i - 1; while (j >= 0 && ehs[ord[j]] > ehs[v]) { ord[j + 1] = ord[j]; j--; } ord[j + 1] = v; }
  for (int i = 0; i < n; i++) grp[ord[i]] = (i * K_OCHS) / n;
  double *feat = malloc(sizeof(double) * n * K_OCHS);
  for (int x = 0; x < n; x++) {
    double s[K_OCHS] = {0}; int c[K_OCHS] = {0};
    for (int y = 0; y < n; y++) if (y != x && !(mask[x] & mask[y])) { s[grp[y]] += W[(size_t)x * n + y] / FULL; c[grp[y]]++; }
    for (int k = 0; k < K_OCHS; k++) feat[x * K_OCHS + k] = c[k] ? s[k] / c[k] : 0.5;
  }
  double *cen = malloc(sizeof(double) * B * K_OCHS), *d2 = malloc(sizeof(double) * n);
  int *as = malloc(sizeof(int) * n);
  uint64_t rs = seed * 0x9E3779B97F4A7C15ull + 1;
  int first = (int)(xs(&rs) % n);
  memcpy(cen, feat + first * K_OCHS, sizeof(double) * K_OCHS);
  for (int k = 1; k < B; k++) {
    double tot = 0;
    for (int x = 0; x < n; x++) {
      double best = 1e30;
      for (int j = 0; j < k; j++) { double d = 0; for (int f = 0; f < K_OCHS; f++) { double e = feat[x * K_OCHS + f] - cen[j * K_OCHS + f]; d += e * e; } if (d < best) best = d; }
      d2[x] = best; tot += best;
    }
    double u = (xs(&rs) >> 11) * (1.0 / 9007199254740992.0) * tot;
    int pick = n - 1;
    for (int x = 0; x < n; x++) { u -= d2[x]; if (u <= 0) { pick = x; break; } }
    memcpy(cen + k * K_OCHS, feat + pick * K_OCHS, sizeof(double) * K_OCHS);
  }
  for (int it = 0; it < 200; it++) {
    int changed = 0;
    for (int x = 0; x < n; x++) {
      double best = 1e30; int bj = 0;
      for (int j = 0; j < B; j++) { double d = 0; for (int f = 0; f < K_OCHS; f++) { double e = feat[x * K_OCHS + f] - cen[j * K_OCHS + f]; d += e * e; } if (d < best) { best = d; bj = j; } }
      if (it == 0 || as[x] != bj) { changed++; as[x] = bj; }
    }
    if (!changed) break;
    for (int j = 0; j < B; j++) {
      double s[K_OCHS] = {0}; int c = 0;
      for (int x = 0; x < n; x++) if (as[x] == j) { c++; for (int f = 0; f < K_OCHS; f++) s[f] += feat[x * K_OCHS + f]; }
      if (c) for (int f = 0; f < K_OCHS; f++) cen[j * K_OCHS + f] = s[f] / c;
    }
  }
  double meanE[256]; int cnt[256], perm[256], inv[256];
  for (int j = 0; j < B; j++) { meanE[j] = 0; cnt[j] = 0; perm[j] = j; }
  for (int x = 0; x < n; x++) { meanE[as[x]] += ehs[x]; cnt[as[x]]++; }
  for (int j = 0; j < B; j++) meanE[j] = cnt[j] ? meanE[j] / cnt[j] : 2.0;
  for (int i = 1; i < B; i++) { int v = perm[i], j = i - 1; while (j >= 0 && meanE[perm[j]] > meanE[v]) { perm[j + 1] = perm[j]; j--; } perm[j + 1] = v; }
  for (int i = 0; i < B; i++) inv[perm[i]] = i;
  memset(out->bucket, 255, NC);
  for (int x = 0; x < n; x++) out->bucket[loc[x]] = (uint8_t)inv[as[x]];
  double *E = calloc((size_t)B * B, sizeof(double)), *D = calloc((size_t)B * B, sizeof(double));
  for (int x = 0; x < n; x++) {
    int a = inv[as[x]];
    for (int y = 0; y < n; y++) {
      if (y == x || (mask[x] & mask[y])) continue;
      int b = inv[as[y]];
      E[a * B + b] += W[(size_t)x * n + y] / FULL;
      D[a * B + b] += 1;
    }
  }
  out->E = malloc(sizeof(float) * B * B); out->D = malloc(sizeof(float) * B * B);
  for (int i = 0; i < B * B; i++) { out->E[i] = (float)E[i]; out->D[i] = (float)D[i]; }
  free(W); free(rank); free(ok); free(ehs); free(ord); free(grp); free(feat); free(cen); free(d2); free(as); free(E); free(D);
  (void)cmp_dbl_idx_data_dummy;
}

static void write_board(const Board *b, const int *newc, int nn, int B) {
  uint8_t c4[4] = {0, 0, 0, 0};
  for (int i = 0; i < nn; i++) c4[i] = (uint8_t)newc[i];
  fwrite(c4, 1, 4, stdout);
  fwrite(b->bucket, 1, NC, stdout);
  fwrite(b->E, sizeof(float), (size_t)B * B, stdout);
  fwrite(b->D, sizeof(float), (size_t)B * B, stdout);
}

int main(int argc, char **argv) {
  int F = argc > 1 ? atoi(argv[1]) : 60;
  int T = argc > 2 ? atoi(argv[2]) : 2;
  int R = argc > 3 ? atoi(argv[3]) : 2;
  int B = argc > 4 ? atoi(argv[4]) : 24;
  uint64_t seed = argc > 5 ? strtoull(argv[5], 0, 10) : 1;
  if (B < 2 || B > 250 || F < 1 || T < 1 || R < 1 || T > 40 || R > 40) { fprintf(stderr, "zle parametry\n"); return 1; }
  int g = 0;
  for (int a = 0; a < 52; a++) for (int b = a + 1; b < 52; b++) { ca[g] = a; cb[g] = b; g++; }
  /* flopy: to samo losowanie co w flops.c (to samo ziarno → te same flopy) */
  int (*fl)[3] = malloc(sizeof(int[3]) * F);
  uint8_t *used = calloc(52 * 52 * 52, 1);
  uint64_t s = seed * 0xD1B54A32D192ED03ull + 7;
  for (int i = 0; i < F;) {
    int c[3];
    c[0] = (int)(xs(&s) % 52); c[1] = (int)(xs(&s) % 52); c[2] = (int)(xs(&s) % 52);
    if (c[0] == c[1] || c[0] == c[2] || c[1] == c[2]) continue;
    for (int p = 0; p < 2; p++) for (int q = 0; q < 2 - p; q++) if (c[q] > c[q + 1]) { int t = c[q]; c[q] = c[q + 1]; c[q + 1] = t; }
    int key = (c[0] * 52 + c[1]) * 52 + c[2];
    if (used[key]) continue;
    used[key] = 1;
    memcpy(fl[i], c, sizeof c); i++;
  }
  /* turny i rivery: różne karty spoza planszy, deterministycznie z ziarna flopu */
  int *turn = malloc(sizeof(int) * F * T), *river = malloc(sizeof(int) * F * T * R);
  for (int i = 0; i < F; i++) {
    uint64_t ts = seed * 7919ull + (uint64_t)i * 104729ull + 3;
    uint64_t taken = (1ull << fl[i][0]) | (1ull << fl[i][1]) | (1ull << fl[i][2]);
    for (int t = 0; t < T; t++) {
      int c; do c = (int)(xs(&ts) % 52); while ((taken >> c) & 1);
      taken |= 1ull << c; turn[i * T + t] = c;
    }
    for (int t = 0; t < T; t++) {
      uint64_t tk = (1ull << fl[i][0]) | (1ull << fl[i][1]) | (1ull << fl[i][2]) | (1ull << turn[i * T + t]);
      for (int r = 0; r < R; r++) {
        int c; do c = (int)(xs(&ts) % 52); while ((tk >> c) & 1);
        tk |= 1ull << c; river[(i * T + t) * R + r] = c;
      }
    }
  }
  int nboards = F * (1 + T + T * R);
  Board *bs = calloc(nboards, sizeof(Board));
  int done = 0;
#pragma omp parallel for schedule(dynamic, 1)
  for (int k = 0; k < nboards; k++) {
    int i = k / (1 + T + T * R), j = k % (1 + T + T * R);
    int board[5] = {fl[i][0], fl[i][1], fl[i][2], 0, 0}, nb = 3;
    if (j >= 1 && j <= T) { board[3] = turn[i * T + (j - 1)]; nb = 4; }
    else if (j > T) { int tr = j - 1 - T, t = tr / R, r = tr % R; board[3] = turn[i * T + t]; board[4] = river[(i * T + t) * R + r]; nb = 5; }
    solve_board(board, nb, B, seed * 1000003ull + (uint64_t)k, &bs[k]);
#pragma omp atomic
    done++;
    if (done % 50 == 0) fprintf(stderr, "plansze: %d/%d\n", done, nboards);
  }
  fwrite("SZKPPF2", 1, 8, stdout);
  uint32_t hdr[4] = {(uint32_t)F, (uint32_t)T, (uint32_t)R, (uint32_t)B};
  fwrite(hdr, sizeof(uint32_t), 4, stdout);
  for (int i = 0; i < F; i++) {
    int base = i * (1 + T + T * R);
    write_board(&bs[base], fl[i], 3, B);
    for (int t = 0; t < T; t++) {
      write_board(&bs[base + 1 + t], &turn[i * T + t], 1, B);
      for (int r = 0; r < R; r++) write_board(&bs[base + 1 + T + t * R + r], &river[(i * T + t) * R + r], 1, B);
    }
  }
  return 0;
}
