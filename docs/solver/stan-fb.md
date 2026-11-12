# Stan sesji FB / FB2 / FB3 (solver postflop, plan B), 2026-11-12

- Rola 08-programista, tryb build. Polecenie `origin/koordynacja:docs/koordynacja/polecenia/FB2.md` @ 00f3c254, gałąź `sesja-fb-solver` od 1fbd77c2. Koordynator: session_01T66VBxieQ5g3pdTFhQvKA9 od 13:50 UTC (aktualny ID: `stan.md` na gałęzi `koordynacja`).
- Sesja FB (zadania 1–3): rozpoznanie, diagnoza BB, plan postflop. Decyzja właściciela KO-088 wybrała plan B. Szczegóły w historii git (b573f755).

## Etapy planu B (`docs/solver/plan-b-etapy.md`)

| Etap | Stan | Dowód |
|---|---|---|
| B0 cel W2 jako dane | gotowe | `docs/solver/w2-cel.md`, `w2-cel-sumy.txt`; skrypt `scripts/fetch-beyondgto-spots.ts` |
| B1 kryteria W2 | gotowe przed pomiarem | D-1332 (kryteria), D-1333 (model gry), D-1334 (zakresy) |
| B2 river TS | gotowe | `dowody/b2-w1-czerwone.txt`, `b2-w1-zielone.txt` |
| B3 turn + river TS | gotowe | `dowody/b3-czerwone.txt`, `b3-zielone-czas.txt` (298 ms/it. na stół turn) |
| B4 flop w C | gotowe | `dowody/b4-czerwone.txt`, `b4-zielone.txt`; stół SRP: 2,8 GB, ok. 2,4 s/it. na 4 wątkach |
| B5 przesiew 7 stołów | **STOP: 2/7 przeszło** (próg 5/7) | `docs/solver/w2-przesiew.md`, `dowody/b5-*.log` |
| Opcja B (KO-090): D0 kod (donk, węzeł ścieżki, parametr modelu) | gotowe (FB3), CI kod 0 na 28087a65 | `dowody/d0-*.txt`, D-1400 |
| D1 diagnoza (7 stołów B5) | gotowe: d1333 2/7, rake0 1/7, kandydat 3/7; bez decyzji o modelu | `docs/solver/w2-diagnoza.md`, `dowody/d1-*.log` |
| D2 nowy przesiew (7 odłożonych) | **STOP: 2/7 przeszło** (SRP 2/4, 3BP 0/3) | `w2-diagnoza.md` sekcja D2, `dowody/d2-*.log` |
| B6, B7 | po D2 | — |

## PYTANIE do koordynatora (STOP D2, FB3)

- **A: zakończyć plan B.** Solver nie przeszedł W2 ani w B5 (2/7), ani w D2 (2/7), więc do treści 1.0 nic z niego nie trafia (KO-084). SC-13, SC-14 i SC-20 idą drogami bez solvera. Kod i testy zostają w repo. Dalszy koszt: 0.
- **C: walidacja wobec celu ze znanym drzewem i zakresami (W3, np. opublikowane analizy solvera dla konkretnych stołów).** Usuwa H-B (nieznane zakresy), która w D2 najmocniej wskazuje na 3BP (+24…+47 pp). [OCENA] 0,5 sesji na wyszukanie i odczyt plus 1 sesja obliczeń. Ryzyko: celu może nie dać się przeczytać.
- Rekomendacja: **A dla 1.0**; C po 1.0, jeśli jest potrzeba solvera postflop. Wariant „tylko SRP” (2/4 w D2) odrzucam jako zmianę kryterium po wyniku.
- Poprzednie pytanie (STOP B5) i odpowiedź B (KO-090): wersja tego pliku @ 68b76d27.

## Odtworzenie

```bash
cd tools/preflop-solver
npx tsx scripts/fetch-beyondgto-spots.ts          # cel W2 → targets/beyondgto-spots/ (poza gitem); porównaj sumy z docs/solver/w2-cel-sumy.txt
npx tsx scripts/w2-run.ts --model kandydat btn-vs-bb-srp-k72-rainbow   # wynik → targets/w2-results/<model>/ (poza gitem); gcc z OpenMP; modele: d1333, kandydat, rake0
```

- Pomiar stołów odcinkami: `w2-run.ts` pomija stoły, które mają już wynik (punkt kontrolny na poziomie stołu). Jeden stół SRP liczy się ok. 8 min.
- Wyniki pośrednie: `targets/` nie jest w gicie. Nowa sesja liczy je od nowa (ok. 8–30 min na stół).

## Znane ograniczenia

- Zakresy drzewa flopu BeyondGTO nie są opublikowane: łączny c-bet ze stron odtwarza się z siatek preflop tylko w 39 ze 105 stołów (±2 pp). Dlatego K1 porównuje siatki z tą samą wagą (D-1332).
- W 3BP zakres sprawdzenia 3-betu pochodzi z kanonu (D-1334).
- Drzewo turnu i rivera BeyondGTO nie jest znane. D-1333 przyjmuje 66% puli i przebicie ×3; kandydat {33%, 75%}, river bez przebicia (D-1400). Stół SRP kandydata: do 8,4 GB tablic, 12–25 min.
- Regrety w C są we float32. Strategie w sytuacjach obojętnych różnią się od wersji float64, model jest ten sam (`dowody/b4-zielone.txt`).

## Koszt i decyzje

- Koszt FB2 do B5: ok. 4 h agenta, ok. 2,5 h CPU. FB3 (D0–D2): ok. 2 h agenta, ok. 3,5 h CPU kontenera (D1 2,2 h, D2 1,3 h), 0 zł.
- Decyzje do weta: D-1330, D-1331 (FB); D-1332…D-1335 (FB2); D-1400 (FB3). Pula FB3 D-1401…D-1409 niewykorzystana.
- Następny krok: odpowiedź koordynatora na PYTANIE (A albo C). Prompt kontynuacji: `docs/solver/prompt-kontynuacji-fb.md` (dla C wymaga nowego planu W3).
