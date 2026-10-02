/*
 * Tablica equity trzech graczy (169 klas, pule 3-osobowe na flopie, ADR-20, opcja B).
 * Dla każdej nieuporządkowanej trójki klas (i ≤ j ≤ k): lista WSZYSTKICH rozłącznych trójek kombinacji,
 * z niej losowane są ręce (dokładny rozkład z blokerami), stół losowany z pozostałych 46 kart.
 * Wynik binarny: nagłówek "SZKP3EQ1", liczba trójek (uint32), liczba prób (uint32),
 * potem dla każdej trójki 3 × uint16 equity (·65535) w kolejności i, j, k.
 * Losowość deterministyczna (ziarno = indeks trójki), więc wynik nie zależy od liczby wątków.
 * Kompilacja: gcc -O3 -march=native -fopenmp equity3.c -o equity3 ; ./equity3 SAMPLES > equity3.bin
 */
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

static const char *R = "23456789TJQKA";
static int combos[169][12][2], ncombos[169];
static void init_classes(void) {
  int k = 0;
  for (int row = 12; row >= 0; row--) for (int col = 12; col >= 0; col--) {
    int hi, lo, type;
    if (row == col) { hi = lo = row; type = 0; } else if (col < row) { hi = row; lo = col; type = 1; } else { hi = col; lo = row; type = 2; }
    int n = 0;
    for (int s1 = 0; s1 < 4; s1++) for (int s2 = 0; s2 < 4; s2++) {
      if (type == 0 && s2 <= s1) continue; if (type == 1 && s1 != s2) continue; if (type == 2 && s1 == s2) continue;
      combos[k][n][0] = hi * 4 + s1; combos[k][n][1] = lo * 4 + s2; n++;
    }
    ncombos[k] = n; k++;
  }
  (void)R;
}

static inline uint64_t xs(uint64_t *s) { uint64_t x = *s; x ^= x << 13; x ^= x >> 7; x ^= x << 17; return *s = x; }

int main(int argc, char **argv) {
  int samples = argc > 1 ? atoi(argv[1]) : 4000;
  init_classes();
  int ntri = 0;
  for (int i = 0; i < 169; i++) for (int j = i; j < 169; j++) ntri += 169 - j;
  int *ti = malloc(sizeof(int) * ntri), *tj = malloc(sizeof(int) * ntri), *tk = malloc(sizeof(int) * ntri);
  int n = 0;
  for (int i = 0; i < 169; i++) for (int j = i; j < 169; j++) for (int k = j; k < 169; k++) { ti[n] = i; tj[n] = j; tk[n] = k; n++; }
  uint16_t *out = malloc(sizeof(uint16_t) * 3 * ntri);
  int done = 0;

  #pragma omp parallel for schedule(dynamic, 64)
  for (int t = 0; t < ntri; t++) {
    int A = ti[t], B = tj[t], C = tk[t];
    /* wszystkie rozłączne trójki kombinacji */
    static __thread int list[1728][6];
    int nl = 0;
    for (int a = 0; a < ncombos[A]; a++) for (int b = 0; b < ncombos[B]; b++) {
      int a0 = combos[A][a][0], a1 = combos[A][a][1], b0 = combos[B][b][0], b1 = combos[B][b][1];
      if (a0 == b0 || a0 == b1 || a1 == b0 || a1 == b1) continue;
      for (int c = 0; c < ncombos[C]; c++) {
        int c0 = combos[C][c][0], c1 = combos[C][c][1];
        if (c0 == a0 || c0 == a1 || c0 == b0 || c0 == b1 || c1 == a0 || c1 == a1 || c1 == b0 || c1 == b1) continue;
        list[nl][0] = a0; list[nl][1] = a1; list[nl][2] = b0; list[nl][3] = b1; list[nl][4] = c0; list[nl][5] = c1; nl++;
      }
    }
    double w[3] = {0, 0, 0};
    if (nl == 0) { w[0] = w[1] = w[2] = 1.0 / 3; }
    else {
      uint64_t s = 0x9E3779B97F4A7C15ull ^ ((uint64_t)t * 0xBF58476D1CE4E5B9ull) ^ 0x94D049BB133111EBull;
      if (s == 0) s = 1;
      for (int it = 0; it < samples; it++) {
        int *h = list[xs(&s) % nl];
        int dead[52] = {0}; for (int q = 0; q < 6; q++) dead[h[q]] = 1;
        int deck[46], m = 0; for (int q = 0; q < 52; q++) if (!dead[q]) deck[m++] = q;
        int board[5];
        for (int q = 0; q < 5; q++) { int r = q + (int)(xs(&s) % (46 - q)); int tmp = deck[q]; deck[q] = deck[r]; deck[r] = tmp; board[q] = deck[q]; }
        int c1[7] = {h[0], h[1], board[0], board[1], board[2], board[3], board[4]};
        int c2[7] = {h[2], h[3], board[0], board[1], board[2], board[3], board[4]};
        int c3[7] = {h[4], h[5], board[0], board[1], board[2], board[3], board[4]};
        unsigned e1 = eval7(c1), e2 = eval7(c2), e3 = eval7(c3);
        unsigned best = e1 > e2 ? e1 : e2; if (e3 > best) best = e3;
        int nw = (e1 == best) + (e2 == best) + (e3 == best);
        if (e1 == best) w[0] += 1.0 / nw; if (e2 == best) w[1] += 1.0 / nw; if (e3 == best) w[2] += 1.0 / nw;
      }
      for (int q = 0; q < 3; q++) w[q] /= samples;
    }
    for (int q = 0; q < 3; q++) out[3 * t + q] = (uint16_t)(w[q] * 65535.0 + 0.5);
    #pragma omp atomic
    done++;
    if (t % 50000 == 0) { fprintf(stderr, "%d/%d\n", done, ntri); }
  }
  fwrite("SZKP3EQ1", 1, 8, stdout);
  uint32_t hdr[2] = {(uint32_t)ntri, (uint32_t)samples};
  fwrite(hdr, sizeof(uint32_t), 2, stdout);
  fwrite(out, sizeof(uint16_t), 3 * ntri, stdout);
  fprintf(stderr, "gotowe: %d trójek, %d prób\n", ntri, samples);
  return 0;
}
