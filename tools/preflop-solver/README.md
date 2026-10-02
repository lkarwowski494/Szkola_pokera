# Solver preflop (ADR-20)

Własny solver preflop dla 6-max 100bb: Discounted CFR (α=1,5, β=0, γ=2) na 169 klasach rąk, gra po flopie przybliżona modelem realizacji equity (EQR). Raport walidacji i znane ograniczenia: dokument „10 Solver preflop: raport walidacji” w folderze projektu na Google Drive.

## Odtworzenie wyniku

```bash
# 1. Macierz equity 169×169 (dokładna, ok. 60–90 min na 2 rdzeniach); wynik jest w repo
gcc -O3 -march=native -fopenmp tools/equity/equity169.c -o equity169 && ./equity169 > tools/equity/equity169.json
# 2. Kalibracja dwóch parametrów EQR (cele: RFI z Buttona, obrona BB vs BTN)
pnpm --filter @szkola/preflop-solver solve --calibrate --iterations 150 --ks 1,1.25,1.5 --ms 0.12,0.14,0.16
# 3. Rozwiązanie końcowe → content/ranges/preflop-6max-100bb.json
pnpm --filter @szkola/preflop-solver solve --iterations 1000 --k 1.25 --m 0.16
pnpm content:build
```

Parametry, liczba iteracji i NashConv są zapisane w polu `meta` pliku wynikowego.
