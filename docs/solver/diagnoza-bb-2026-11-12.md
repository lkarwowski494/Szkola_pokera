# Diagnoza: obrona BB vs BTN i BB vs SB (sesja FB, zadanie 2, 2026-11-12)

Wejście: `docs/tresci/walidacja-solvera.json`. Niezgodne są dwie liczby: `solver.def.bb-vs-btn` 49,61% wobec ok. 45% (+4,6 pp) i `solver.def.bb-vs-sb` 53,04% wobec ok. 56% (−3,0 pp). Kryterium D-153: najwyżej 2 pp. Kanon: `content/ranges/preflop-6max-100bb.json` (v3c, opis w `docs/solver/rozpoznanie-2026-11-12.md`).

## Wynik w skrócie

- **Gra po flopie nie jest przyczyną.** Bez rake'u realizacja equity zakresów kanonu w pulach z jednym podbiciem zgadza się z raportami realizacji solvera: BTN–BB 82/114% (cel 81/115), SB–BB 99/102% (cel 97/104). Drobniejsza abstrakcja zmienia ją najwyżej o 2,5 pp (więcej runoutów: BB bez pozycji w BTN–BB −2,5 pp).
- **Rake modelu wykazanie przesuwa podział sprawdzenie / 3-bet.** Rake 5% z limitem 3bb zabiera ok. 9% puli w SRP i ok. 5% w puli 3-betowanej. Sprawdzenie traci więc względem 3-betu. Ten kierunek odpowiada błędowi podziału w BB vs SB (sprawdzenie 27 wobec 39%, 3-bet 26 wobec 17%) i brakowi sprawdzeń BTN vs CO.
- **Nadmiernej obrony BB vs BTN rake nie tłumaczy.** Mniejszy rake poszerza obronę, więc różnicę +4,6 pp by zwiększył. Przyczyny nie wykazano.
- **Poprawki kanonu nie ma.** Wynik na 24 liczbach przed i po jest ten sam (tabela w pkt 4). Jedyną dostępną drogą do zmiany byłoby dopasowanie parametru rake'u bez źródła (pkt 3).

## 1. Metoda

`tools/preflop-solver/scripts/fb-srp-realization.ts` bierze strategie preflop kanonu jako stałe zakresy. Dla trzech pul z jednym podbiciem (BTN–BB, SB–BB, CO–BTN) rozwiązuje od zera samą grę po flopie: 400 iteracji DCFR na wybranej tablicy plansz, w drzewie z meta kanonu. Mierzy realizację equity (EQR) tą samą funkcją co kanon (`src/solver.ts:476-502`) i wykorzystywalność samej gry po flopie. Preflop nie jest liczony od nowa, więc pomiar izoluje gra po flopie.

Kontrola metody: przebieg na tablicy kanonu (60×2×2, 24 koszyki) odtwarza raport realizacji z meta kanonu. BTN–BB wychodzi 73,4/105,9% wobec 74/106% w meta, SB–BB 90,1/90,9% wobec 90/91%.

Cele realizacji pochodzą z `scripts/fit-eqr.ts:16-24` (rangeconverter, 6-max 100bb, odczyt w październiku, dokument 10). **2026-11-12 strona zwraca HTTP 404**. Nie dało się jej odczytać ponownie, więc cele służą tu tylko jako wskazówka diagnostyczna, nie walidacja (D-1330). Warunki rake'u raportu nie są znane `[DO USTALENIA]`.

## 2. Hipotezy i pomiary

| Hipoteza | Pomiar | BTN–BB EQR OOP/IP | SB–BB EQR OOP/IP | CO–BTN EQR OOP/IP | Werdykt |
|---|---|---|---|---|---|
| — (kanon) | 60 flopów × 2 × 2, 24 koszyki | 73,4 / 105,9 | 90,1 / 90,9 | 89,0 / 91,4 | punkt odniesienia |
| H1a abstrakcja: koszyki | 48 koszyków | 74,4 / 105,8 | 91,7 / 89,8 | 89,9 / 91,5 | odrzucona (≤ 1,6 pp) |
| H1b abstrakcja: próbka flopów | 120 flopów, inne ziarno | 73,0 / 106,2 | 90,4 / 90,0 | 88,6 / 92,1 | odrzucona (≤ 0,9 pp) |
| H1c abstrakcja: runouty | 4 turny × 4 rivery | 70,9 / 107,0 | 90,1 / 89,1 | 87,3 / 91,7 | mały efekt (≤ 2,5 pp); BB bez pozycji realizuje mniej, kierunek zgodny z nadmierną obroną BB vs BTN, wielkości wpływu na obronę nie zmierzono |
| H2 rake modelu | kanon bez rake'u | 82,4 / 114,5 | 98,8 / 101,5 | 99,3 / 100,3 | gra po flopie zgodna z celami (≤ 2,2 pp w pulach BB); różnica wynika z rake'u |
| cel (rangeconverter) | — | 81,4 / 115,2 | 96,7 / 103,7 | 92,6 / 106,9 | — |

Wykorzystywalność samej gry po flopie po 400 iteracjach: najwyżej 0,004 bb na rozdanie we wszystkich przebiegach. Pula CO–BTN prawie nie powstaje (BTN sprawdza 0,01% otwarć CO), więc jej EQR to szum zakresu bliskiego zeru i nie wchodzi do wniosków.

### H2: ile rake zabiera z puli (rachunek z raportu realizacji w meta kanonu)

Suma udziałów obu graczy w puli netto, w liniach `meta.realization` kanonu:

- SRP: SB–BB 50,2% + 40,3% = 90,5%; BTN–BB 33,4% + 57,9% = 91,3%.
- 3BP: SB–BB 39,6% + 54,9% = 94,5%; BTN–BB 50,6% + 44,3% = 94,9%.

Rake po flopie zabiera więc ok. 9% puli w SRP i ok. 5% w puli 3-betowanej, licząc od puli preflop. Limit 3bb jest mały wobec puli 3-betowanej (ok. 20bb), a duży wobec SRP (5,5–6bb). Rake w modelu: `src/model.ts:47-49`, `:109`, `:182-184`.

Skutek: sprawdzenie (SRP) traci względem 3-betu (3BP) więcej, niż traciłoby bez rake'u albo przy rake'u o innej strukturze. Kierunek zgadza się z trzema znanymi błędami składu:

- BB vs SB sprawdza 27,3% wobec 39% w BeyondGTO i 3-betuje 25,7% wobec 17%;
- BTN vs CO sprawdza 0,0% wobec ok. 9%;
- BB vs BTN 3-betuje część środka zakresu (dokument 10, K2).

Cele BeyondGTO pochodzą z „NL500 rake structure” (https://beyondgto.com/methodology, odczyt 2026-11-12). Parametry tej struktury (procent i limit w bb) nie są tam podane `[DO USTALENIA]`.

Czego H2 nie wyjaśnia: obrona BB vs BTN jest za szeroka (+4,6 pp), a mniejszy rake by ją jeszcze poszerzył. Dla BB vs SB (−3,0 pp) kierunek jest zgodny, ale wielkości bez przeliczenia preflopu nie znamy.

### Hipotezy niesprawdzone (wymagają przeliczenia preflopu: przesiew 250 iteracji ok. 1 h, pełne rozwiązanie ok. 7,5 h)

- H3, rozmiar 3-betu BB: kanon 10bb (×4). Opublikowane rozwiązanie NL200 podaje 11bb („it 3-bets 11.5% to 11bb and calls 29.0%”, Poker Academy, `content/numbers.yaml:155`). BeyondGTO rozmiaru nie podaje.
- H4, rozmiary zakładów po flopie: kanon ma na flopie 33/75%, na turnie 66%, na riverze zakład geometryczny. Opublikowane rozwiązania nie podają drzewa po flopie dla preflopu `[DO USTALENIA]`.
- H5, brak limpów SB w drzewie (`src/tree.ts:2-8`): wpływa na zakres otwarć SB, a przez to na BB vs SB. BeyondGTO też pokazuje otwarcie podbiciem 3bb, ale czy jego drzewo dopuszcza limp, nie wiadomo `[DO USTALENIA]`.
- Cel: dwa opublikowane rozwiązania BB vs BTN to 40,5% (NL200, 3-bet do 11bb) i 45% (NL500). Kanon z 49,6% leży poza przedziałem obu. Dawny cel K1 „50–60%” pochodził ze źródła szczebla 4 (D-144) i nie może podważać szczebla 2.

## 3. Dlaczego bez poprawki

- Rake: poprawka wymagałaby parametrów rake'u NL500, których źródło nie podaje. Dobranie ich tak, żeby trafić w 56% albo w podział 39/17, byłoby **dopasowaniem parametru pod wynik**, którego polecenie zabrania. Przebieg bez rake'u jest dopuszczalny jako pomiar ograniczający: pokazuje kierunek i wielkość efektu. Kanonem być nie może, bo cel ma rake.
- Brak wykazanej przyczyny dla BB vs BTN.
- Każdy wariant to przeliczenie preflopu z grą po flopie: ok. 1 h na przesiew, ok. 7,5 h na kanon (4 rdzenie, bez płatnych zasobów). Decyzję o uruchomieniu zostawiam koordynatorowi (PYTANIE w raporcie).

## 4. Zestaw 24 liczb: przed i po

Kanon się nie zmienił, więc wszystkie 24 wartości `wartosc_solvera_pct` w `docs/tresci/walidacja-solvera.json` są identyczne przed i po: **19 zgodnych, 2 niezgodne (BB vs BTN +4,6 pp, BB vs SB −3,0 pp), 3 bez celu (9-max)**. Porównanie przed i po będzie miało sens dopiero po wybraniu wariantu w odpowiedzi na PYTANIE.

## 5. Odtworzenie

```bash
cd tools/preflop-solver
gcc -O3 -march=native -fopenmp ../equity/boards.c -o /tmp/boards -lm
/tmp/boards 60 2 2 48 1 | gzip -1 > /tmp/b-60-2-2-48.bin.gz        # 85 s na 4 rdzeniach
/tmp/boards 120 2 2 24 2 | gzip -1 > /tmp/b-120-2-2-24-s2.bin.gz   # 113 s
/tmp/boards 60 4 4 24 1 | gzip -1 > /tmp/b-60-4-4-24.bin.gz        # 51 s; pomiar realizacji ok. 31 min
npx tsx scripts/fb-srp-realization.ts ../../content/ranges/preflop-6max-100bb.json ../equity/boards.bin.gz 400          # ok. 10 min
npx tsx scripts/fb-srp-realization.ts ../../content/ranges/preflop-6max-100bb.json ../equity/boards.bin.gz 400 --rake0  # ok. 9 min
```

Logi przebiegów: `docs/solver/dowody/fb-realizacja-*.log`.
