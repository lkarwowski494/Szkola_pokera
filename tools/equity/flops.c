/*
 * Tablice gry po flopie dla solvera preflop (ADR-20, opcja C: pule 3-betowane i 4-betowane).
 *
 * Dla F losowych flopów (jednostajnie z 22 100, deterministyczne ziarno):
 *  1. dokładne equity każdej pary rozłącznych kombinacji (1176 kombinacji niezablokowanych przez flop)
 *     po wszystkich 990 dokończeniach turn + river;
 *  2. cechy rąk w stylu OCHS (Johanson i in., AAMAS 2013): equity przeciw 8 grupom rąk rywala
 *     wyznaczonym przez oktyle E[HS] na tym flopie;
 *  3. k-średnie na cechach → B koszyków (bucketów), posortowanych od najsłabszego (średnie E[HS]);
 *  4. macierze koszyk × koszyk: E[a][b] = Σ equity(x, y), D[a][b] = liczba par rozłącznych (x ∈ a, y ∈ b).
 *
 * Format wyjścia (little endian): "SZKPFLP1", uint32 F, uint32 B, potem dla każdego flopu:
 *   3 × uint8 karty flopu, 1 bajt zera, 1326 × uint8 koszyk kombinacji (255 = zablokowana przez flop),
 *   B × float32 średnie E[HS] koszyka, B×B × float32 E, B×B × float32 D.
 * Indeks kombinacji: pary kart a < b w kolejności leksykograficznej (0..1325); karta = ranga·4 + kolor.
 *
 * Kompilacja: gcc -O3 -march=native -fopenmp flops.c -o flops ; ./flops F B SEED > flops.bin
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

typedef struct { uint8_t cards[3]; uint8_t bucket[NC]; float *ehs, *E, *D; } FlopOut;

static void solve_flop(const int fl[3], int B, uint64_t seed, FlopOut *out) {
  uint64_t fm = (1ull << fl[0]) | (1ull << fl[1]) | (1ull << fl[2]);
  int loc[NC], n = 0;           /* lokalne kombinacje → globalny indeks */
  uint64_t mask[NC];
  for (int g = 0; g < NC; g++) {
    uint64_t m = (1ull << ca[g]) | (1ull << cb[g]);
    if (m & fm) continue;
    mask[n] = m; loc[n++] = g;
  }
  int rest[52], nr = 0;
  for (int c = 0; c < 52; c++) if (!((fm >> c) & 1)) rest[nr++] = c;
  uint16_t *W = calloc((size_t)n * n, sizeof(uint16_t));   /* W[x*n+y] = 2·wygrane + remisy x nad y */
  unsigned *rank = malloc(sizeof(unsigned) * n);
  uint8_t *ok = malloc(n);
  for (int t = 0; t < nr; t++)
    for (int r = t + 1; r < nr; r++) {
      uint64_t rm = (1ull << rest[t]) | (1ull << rest[r]);
      int cards[7] = {0, 0, fl[0], fl[1], fl[2], rest[t], rest[r]};
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
  const double FULL = 2.0 * 990.0; /* 45 kart → C(45,2) = 990 dokończeń dla pary rozłącznej */
  /* uzupełnienie dolnego trójkąta */
  for (int x = 0; x < n; x++) for (int y = x + 1; y < n; y++) if (!(mask[x] & mask[y])) W[(size_t)y * n + x] = (uint16_t)(FULL - W[(size_t)x * n + y]);
  /* E[HS] */
  double *ehs = malloc(sizeof(double) * n);
  for (int x = 0; x < n; x++) {
    double s = 0; int c = 0;
    for (int y = 0; y < n; y++) if (y != x && !(mask[x] & mask[y])) { s += W[(size_t)x * n + y] / FULL; c++; }
    ehs[x] = s / c;
  }
  /* oktyle E[HS] */
  int *ord = malloc(sizeof(int) * n), *grp = malloc(sizeof(int) * n);
  for (int x = 0; x < n; x++) ord[x] = x;
  for (int i = 1; i < n; i++) { int v = ord[i], j = i - 1; while (j >= 0 && ehs[ord[j]] > ehs[v]) { ord[j + 1] = ord[j]; j--; } ord[j + 1] = v; }
  for (int i = 0; i < n; i++) grp[ord[i]] = (i * K_OCHS) / n;
  /* cechy OCHS */
  double *feat = malloc(sizeof(double) * n * K_OCHS);
  for (int x = 0; x < n; x++) {
    double s[K_OCHS] = {0}; int c[K_OCHS] = {0};
    for (int y = 0; y < n; y++) if (y != x && !(mask[x] & mask[y])) { s[grp[y]] += W[(size_t)x * n + y] / FULL; c[grp[y]]++; }
    for (int k = 0; k < K_OCHS; k++) feat[x * K_OCHS + k] = c[k] ? s[k] / c[k] : 0.5;
  }
  /* k-średnie z inicjalizacją k-means++ */
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
  /* sortowanie koszyków po średnim E[HS]; puste koszyki na końcu */
  double meanE[256]; int cnt[256], perm[256], inv[256];
  for (int j = 0; j < B; j++) { meanE[j] = 0; cnt[j] = 0; perm[j] = j; }
  for (int x = 0; x < n; x++) { meanE[as[x]] += ehs[x]; cnt[as[x]]++; }
  for (int j = 0; j < B; j++) meanE[j] = cnt[j] ? meanE[j] / cnt[j] : 2.0;
  for (int i = 1; i < B; i++) { int v = perm[i], j = i - 1; while (j >= 0 && meanE[perm[j]] > meanE[v]) { perm[j + 1] = perm[j]; j--; } perm[j + 1] = v; }
  for (int i = 0; i < B; i++) inv[perm[i]] = i;
  memcpy(out->cards, (uint8_t[]){(uint8_t)fl[0], (uint8_t)fl[1], (uint8_t)fl[2]}, 3);
  memset(out->bucket, 255, NC);
  for (int x = 0; x < n; x++) out->bucket[loc[x]] = (uint8_t)inv[as[x]];
  for (int i = 0; i < B; i++) out->ehs[i] = cnt[perm[i]] ? (float)meanE[perm[i]] : 0.f;
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
  for (int i = 0; i < B * B; i++) { out->E[i] = (float)E[i]; out->D[i] = (float)D[i]; }
  free(W); free(rank); free(ok); free(ehs); free(ord); free(grp); free(feat); free(cen); free(d2); free(as); free(E); free(D);
}

int main(int argc, char **argv) {
  int F = argc > 1 ? atoi(argv[1]) : 60;
  int B = argc > 2 ? atoi(argv[2]) : 24;
  uint64_t seed = argc > 3 ? strtoull(argv[3], 0, 10) : 1;
  if (B < 2 || B > 250 || F < 1) { fprintf(stderr, "zle parametry\n"); return 1; }
  int g = 0;
  for (int a = 0; a < 52; a++) for (int b = a + 1; b < 52; b++) { ca[g] = a; cb[g] = b; g++; }
  /* losowanie F różnych flopów jednostajnie z 22 100 */
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
  FlopOut *outs = calloc(F, sizeof(FlopOut));
  for (int i = 0; i < F; i++) { outs[i].ehs = malloc(sizeof(float) * B); outs[i].E = malloc(sizeof(float) * B * B); outs[i].D = malloc(sizeof(float) * B * B); }
  int done = 0;
#pragma omp parallel for schedule(dynamic, 1)
  for (int i = 0; i < F; i++) {
    solve_flop(fl[i], B, seed * 1000003ull + (uint64_t)i, &outs[i]);
#pragma omp atomic
    done++;
    if (done % 10 == 0) fprintf(stderr, "flopy: %d/%d\n", done, F);
  }
  fwrite("SZKPFLP1", 1, 8, stdout);
  uint32_t hdr[2] = {(uint32_t)F, (uint32_t)B};
  fwrite(hdr, sizeof(uint32_t), 2, stdout);
  for (int i = 0; i < F; i++) {
    uint8_t c4[4] = {outs[i].cards[0], outs[i].cards[1], outs[i].cards[2], 0};
    fwrite(c4, 1, 4, stdout);
    fwrite(outs[i].bucket, 1, NC, stdout);
    fwrite(outs[i].ehs, sizeof(float), B, stdout);
    fwrite(outs[i].E, sizeof(float), (size_t)B * B, stdout);
    fwrite(outs[i].D, sizeof(float), (size_t)B * B, stdout);
  }
  return 0;
}
