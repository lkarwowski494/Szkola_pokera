# Stan sesji FB / FB2 (solver postflop, plan B), 2026-11-12

- Rola 08-programista, tryb build. Polecenie `origin/koordynacja:docs/koordynacja/polecenia/FB2.md` @ 00f3c254, gałąź `sesja-fb-solver` od 1fbd77c2. Koordynator: session_01T66VBzrrZfFbE7GoxYVNTB (aktualny ID: `stan.md` na gałęzi `koordynacja`).
- Sesja FB (zadania 1–3): rozpoznanie, diagnoza BB, plan postflop. Decyzja właściciela KO-088 wybrała plan B. Szczegóły w historii git (b573f755).

## Etapy planu B (`docs/solver/plan-b-etapy.md`)

| Etap | Stan | Dowód |
|---|---|---|
| B0 cel W2 jako dane | gotowe | `docs/solver/w2-cel.md`, `w2-cel-sumy.txt`; skrypt `scripts/fetch-beyondgto-spots.ts` |
| B1 kryteria W2 | gotowe przed pomiarem | D-1332 (kryteria), D-1333 (model gry), D-1334 (zakresy) |
| B2 river TS | gotowe | `dowody/b2-w1-czerwone.txt`, `b2-w1-zielone.txt` |
| B3 turn + river TS | gotowe | `dowody/b3-czerwone.txt`, `b3-zielone-czas.txt` (298 ms/it. na stół turn) |
| B4 flop w C | gotowe | `dowody/b4-czerwone.txt`, `b4-zielone.txt`; stół SRP: 2,8 GB, ok. 2,4 s/it. na 4 wątkach |
| B5 przesiew 7 stołów | w toku: 1/7 przeszedł | `docs/solver/w2-przesiew.md` |
| B6, B7 | nie zaczęte | decyzja „105 czy próbka 35” przy B5 (PYTANIE do koordynatora) |

## Odtworzenie

```bash
cd tools/preflop-solver
npx tsx scripts/fetch-beyondgto-spots.ts          # cel W2 → targets/beyondgto-spots/ (poza gitem); porównaj sumy z docs/solver/w2-cel-sumy.txt
npx tsx scripts/w2-run.ts btn-vs-bb-srp-k72-rainbow   # wynik → targets/w2-results/ (poza gitem); gcc z OpenMP wymagany
```

- Pomiar stołów odcinkami: `w2-run.ts` pomija stoły, które mają już wynik (punkt kontrolny na poziomie stołu). Jeden stół SRP liczy się ok. 8 min.
- Wyniki pośrednie: `targets/` nie jest w gicie. Nowa sesja liczy je od nowa (ok. 8–30 min na stół).

## Znane ograniczenia

- Zakresy drzewa flopu BeyondGTO nie są opublikowane: łączny c-bet ze stron odtwarza się z siatek preflop tylko w 39 ze 105 stołów (±2 pp). Dlatego K1 porównuje siatki z tą samą wagą (D-1332).
- W 3BP zakres sprawdzenia 3-betu pochodzi z kanonu (D-1334).
- Drzewo turnu i rivera BeyondGTO nie jest znane. D-1333 przyjmuje 66% puli i przebicie ×3.
- Regrety w C są we float32. Strategie w sytuacjach obojętnych różnią się od wersji float64, model jest ten sam (`dowody/b4-zielone.txt`).

## Koszt i decyzje

- Koszt FB2 do b0926e55: ok. 3,5 h agenta, ok. 1,5 h CPU kontenera, 0 zł.
- Decyzje do weta: D-1330, D-1331 (FB), D-1332, D-1333, D-1334 (FB2). Wolne numery: D-1335…D-1339.
