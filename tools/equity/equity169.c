/*
 * Dokładna macierz equity 169x169 (heads-up, all-in preflop) dla Szkoły Pokera.
 * Dla każdej pary klas rąk: średnia po wszystkich zgodnych parach kombinacji (bez wspólnych kart),
 * każda para kombinacji liczona przez pełne przeliczenie 1 712 304 stołów.
 * Pary kombinacji równoważne z dokładnością do permutacji kolorów liczone raz (pamięć podręczna).
 * Wynik: JSON na stdout. Kompilacja: gcc -O3 -march=native -fopenmp equity169.c -o equity169
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <omp.h>

static const char *R = "23456789TJQKA";

static int straight_hi(int m) {
  for (int h = 12; h >= 3; h--) {
    int need = (h == 3) ? (0xF | (1 << 12)) : (0x1F << (h - 4));
    if ((m & need) == need) return h + 1;
  }
  return 0;
}
static int topbits(int m, int n) { int r = 0, c = 0; for (int i = 12; i >= 0 && c < n; i--) if (m & (1 << i)) { r |= 1 << i; c++; } return r; }

/* Ocena 7 kart: większa liczba = silniejszy układ. */
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

static double exact(int a0, int a1, int b0, int b1) {
  int dead[52] = {0}; dead[a0] = dead[a1] = dead[b0] = dead[b1] = 1;
  int deck[48], n = 0; for (int i = 0; i < 52; i++) if (!dead[i]) deck[n++] = i;
  double w = 0; long tot = 0; int h[7], v[7]; h[0] = a0; h[1] = a1; v[0] = b0; v[1] = b1;
  for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) for (int k = j + 1; k < n; k++) for (int l = k + 1; l < n; l++) for (int m = l + 1; m < n; m++) {
    h[2] = v[2] = deck[i]; h[3] = v[3] = deck[j]; h[4] = v[4] = deck[k]; h[5] = v[5] = deck[l]; h[6] = v[6] = deck[m];
    unsigned x = eval7(h), y = eval7(v); if (x > y) w += 1; else if (x == y) w += 0.5; tot++;
  }
  return w / tot;
}

/* Kanoniczny klucz pary kombinacji: minimum po 24 permutacjach kolorów. */
static int perms[24][4];
static void init_perms(void) { int k = 0; for (int a = 0; a < 4; a++) for (int b = 0; b < 4; b++) for (int c = 0; c < 4; c++) for (int d = 0; d < 4; d++) if (a != b && a != c && a != d && b != c && b != d && c != d) { perms[k][0] = a; perms[k][1] = b; perms[k][2] = c; perms[k][3] = d; k++; } }
static unsigned canon(int a0, int a1, int b0, int b1) {
  unsigned best = 0xFFFFFFFFu;
  for (int p = 0; p < 24; p++) {
    int x0 = (a0 & ~3) | perms[p][a0 & 3], x1 = (a1 & ~3) | perms[p][a1 & 3];
    int y0 = (b0 & ~3) | perms[p][b0 & 3], y1 = (b1 & ~3) | perms[p][b1 & 3];
    if (x0 < x1) { int t = x0; x0 = x1; x1 = t; }
    if (y0 < y1) { int t = y0; y0 = y1; y1 = t; }
    unsigned key = ((unsigned)x0 << 18) | ((unsigned)x1 << 12) | ((unsigned)y0 << 6) | (unsigned)y1;
    if (key < best) best = key;
  }
  return best;
}

/* Tablica pamięci podręcznej indeksowana kluczem (24 bity). */
static float *cache;

static char cls[169][4];
static int combos[169][12][2], ncombos[169];

static void init_classes(void) {
  int k = 0;
  for (int row = 12; row >= 0; row--) for (int col = 12; col >= 0; col--) {
    int hi, lo, type;
    if (row == col) { hi = lo = row; type = 0; }
    else if (col < row) { hi = row; lo = col; type = 1; }
    else { hi = col; lo = row; type = 2; }
    if (type == 0) snprintf(cls[k], 4, "%c%c", R[hi], R[lo]);
    else snprintf(cls[k], 4, "%c%c%c", R[hi], R[lo], type == 1 ? 's' : 'o');
    int n = 0;
    for (int s1 = 0; s1 < 4; s1++) for (int s2 = 0; s2 < 4; s2++) {
      if (type == 0 && s2 <= s1) continue;
      if (type == 1 && s1 != s2) continue;
      if (type == 2 && s1 == s2) continue;
      combos[k][n][0] = hi * 4 + s1; combos[k][n][1] = lo * 4 + s2; n++;
    }
    ncombos[k] = n; k++;
  }
}

int main(void) {
  init_perms(); init_classes();
  cache = malloc(sizeof(float) * (1u << 24));
  for (unsigned i = 0; i < (1u << 24); i++) cache[i] = -1.0f;

  /* 1. Zbierz unikalne klucze kanoniczne. */
  unsigned *keys = malloc(sizeof(unsigned) * 60000); int nk = 0;
  for (int A = 0; A < 169; A++) for (int B = 0; B < 169; B++)
    for (int i = 0; i < ncombos[A]; i++) for (int j = 0; j < ncombos[B]; j++) {
      int a0 = combos[A][i][0], a1 = combos[A][i][1], b0 = combos[B][j][0], b1 = combos[B][j][1];
      if (a0 == b0 || a0 == b1 || a1 == b0 || a1 == b1) continue;
      unsigned key = canon(a0, a1, b0, b1), rkey = canon(b0, b1, a0, a1);
      /* equity(B vs A) = 1 - equity(A vs B), więc liczymy tylko jeden kierunek */
      if (cache[key] == -1.0f && cache[rkey] == -1.0f) { cache[key] = -2.0f; keys[nk++] = key; }
    }
  fprintf(stderr, "unikalnych par kombinacji: %d\n", nk);

  /* 2. Policz je równolegle. */
  int done = 0;
  #pragma omp parallel for schedule(dynamic, 16)
  for (int i = 0; i < nk; i++) {
    unsigned key = keys[i];
    int a0 = (key >> 18) & 63, a1 = (key >> 12) & 63, b0 = (key >> 6) & 63, b1 = key & 63;
    cache[key] = (float)exact(a0, a1, b0, b1);
    #pragma omp atomic
    done++;
    if (done % 2000 == 0) fprintf(stderr, "%d/%d\n", done, nk);
  }

  /* 3. Złóż macierz: średnia po zgodnych parach kombinacji, plus liczba par. */
  printf("{\"classes\":[");
  for (int A = 0; A < 169; A++) printf("%s\"%s\"", A ? "," : "", cls[A]);
  printf("],\"equity\":[");
  for (int A = 0; A < 169; A++) {
    printf("%s[", A ? "," : "");
    for (int B = 0; B < 169; B++) {
      double sum = 0; int cnt = 0;
      for (int i = 0; i < ncombos[A]; i++) for (int j = 0; j < ncombos[B]; j++) {
        int a0 = combos[A][i][0], a1 = combos[A][i][1], b0 = combos[B][j][0], b1 = combos[B][j][1];
        if (a0 == b0 || a0 == b1 || a1 == b0 || a1 == b1) continue;
        float e = cache[canon(a0, a1, b0, b1)];
        sum += (e >= 0.0f) ? e : 1.0 - cache[canon(b0, b1, a0, a1)]; cnt++;
      }
      printf("%s%.6f", B ? "," : "", cnt ? sum / cnt : 0.5);
    }
    printf("]");
  }
  printf("],\"pairs\":[");
  for (int A = 0; A < 169; A++) {
    printf("%s[", A ? "," : "");
    for (int B = 0; B < 169; B++) {
      int cnt = 0;
      for (int i = 0; i < ncombos[A]; i++) for (int j = 0; j < ncombos[B]; j++) {
        int a0 = combos[A][i][0], a1 = combos[A][i][1], b0 = combos[B][j][0], b1 = combos[B][j][1];
        if (!(a0 == b0 || a0 == b1 || a1 == b0 || a1 == b1)) cnt++;
      }
      printf("%s%d", B ? "," : "", cnt);
    }
    printf("]");
  }
  printf("]}\n");
  return 0;
}
