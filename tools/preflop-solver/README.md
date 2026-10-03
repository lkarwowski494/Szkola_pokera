# Solver preflop (ADR-20)

Własny solver preflop dla 6-max 100bb: Discounted CFR (α=1,5, β=0, γ=2) na 169 klasach rąk, gra po flopie przybliżona modelem realizacji equity (EQR). Drzewo w wersji 2 dopuszcza pule trzyosobowe (duży blind dołącza do otwarcia z jednym sprawdzeniem); ich equity pochodzi z tablicy 169³ liczonej Monte Carlo. Przez pierwsze 150 iteracji rywale grają z eksploracją ε = 0,1/√t, żeby rzadko odwiedzane węzły (np. odpowiedź na 3-bet) nie zamarzały ze strategią z początku obliczeń. Raport walidacji i znane ograniczenia: dokument „10 Solver preflop: raport walidacji” w folderze projektu na Google Drive.

## Odtworzenie wyniku

```bash
# 1. Macierz equity 169×169 (dokładna, ok. 60–90 min na 2 rdzeniach); wynik jest w repo
gcc -O3 -march=native -fopenmp tools/equity/equity169.c -o equity169 && ./equity169 > tools/equity/equity169.json
# 1b. Tablica equity trzyosobowej puli (8000 prób Monte Carlo na trójkę klas, kilka godzin na 2 rdzeniach); wynik jest w repo
gcc -O3 -march=native -fopenmp tools/equity/equity3.c -o equity3 && ./equity3 8000 | gzip -9 > tools/equity/equity3.bin.gz
# 2. Kalibracja dwóch parametrów EQR (cele: RFI z Buttona, obrona BB vs BTN)
pnpm --filter @szkola/preflop-solver solve --calibrate --iterations 250 --ks 1,1.25 --ms 0.16,0.2,0.24
# 3. Rozwiązanie końcowe → content/ranges/preflop-6max-100bb.json
pnpm --filter @szkola/preflop-solver solve --iterations 1000 --k 1.25 --m 0.16
pnpm content:build
```

Na 2 rdzeniach krok 3 trwa ok. 13 minut, kalibracja ok. 8 minut na punkt siatki. Bez tablicy 3-way: flaga `--no-3way` (drzewo wersji 1).

Parametry, liczba iteracji, NashConv i metryki walidacyjne (`summary`) są zapisane w polu `meta` pliku wynikowego.

Gra po flopie (wersja 3, opcja C; wariant pomiarowy, nie kanon — wyniki w dokumentach 10 i 11):

```bash
# tablice: trzy ulice (60 flopów × 2 turny × 2 rivery, 24 koszyki) albo sam flop bez nowych kart
gcc -O3 -march=native -fopenmp tools/equity/boards.c -o boards && ./boards 60 2 2 24 1 | gzip -9 > tools/equity/boards.bin.gz
gcc -O3 -march=native -fopenmp tools/equity/flops.c -o flops && ./flops 60 24 1 | gzip -9 > tools/equity/flops.bin.gz
# rozwiązanie z grą po flopie w pulach 3-betowanych, z punktem kontrolnym (wznowienie po restarcie maszyny)
pnpm --filter @szkola/preflop-solver solve --iterations 250 --k 1.25 --m 0.16 --flops tools/equity/boards.bin.gz --checkpoint /tmp/ck.bin --out /tmp/v3b.json
```

Skrypty diagnostyczne w `scripts/`: `subgame.ts` i `subgame3.ts` (zbieżność i realizacja equity samej gry po flopie), `converge.ts` (zbieżność całości, z wykorzystywalnością samego preflopu), `checkdown.ts` (błąd przybliżenia koszyków), `timing.ts`.

Warianty modelu (nie kanon, tylko do pomiarów; żaden nie przeszedł walidacji, wyniki w dokumencie 10): `--role 0.2` (premia dla ostatniego podbijającego we wszystkich pulach), `--role3 0.3` (to samo w pulach 3-betowanych i wyżej), `--role4 0` (osobna wartość dla pul 4-betowanych), `--spr-full 4` (SPR, od którego przewaga pozycji działa w pełni; kanon 8). W kalibracji: `--roles`, `--role3s`, `--spr-fulls`.
