# Stan sesji CU (06-tresci, fix): WYS-001 recenzji CT — ocena i tekst dużego c-betu w SC-12
Gałąź `sesja-cu-sc12` od 5839a90 (= sesja-ct-recenzja); decyzje `docs/decyzje/CU.md` (D-845…D-848, do weta). Data: 2026-11-11.

## Zrobione
- **WYS-001 (08-programista-001), commit `a746b4d5`:** rozstrzygnięcie merytoryczne D-845 (źródło szczebla 2 przeczytane dziś `curl`): duży c-bet przy `best: check` to niedokładność tylko na flopie połączonym (`sizeDown: { ranks: [connected] }` w przypadku R-M5-004 zadania `m5.l3.c-btn`, 12 języków); na półpołączonym zostaje dopuszczalny (źródło: „increased use of the 66% pot bet size”). Opcja CT (a) w wersji globalnej odrzucona jako sprzeczna ze źródłem.
- Kod w zakresie KO-061 koordynatora: `packages/poker-core/src/grading.ts` (`cbetVerdict` + wywołanie w `cbet-case` + typ przypadku), `packages/poker-core/src/scenario-gen.ts` (pole `sizeDown?` w `CbetCaseData`, argument tekstury przy werdyktach; losowanie i `GENERATOR_WERSJA` bez zmian), `packages/content-schema/src/index.ts` (pole w `CbetCase`, `CompiledEvalRule`, `GeneratorEvalRules` — bez tego zod w aplikacji obcinałby pole), `tools/content-build/src/build.ts`.
- Treść: wyjaśnienie `bet-big` SC-12 w pl i 11 przekładach (D-848), nagłówek `sc-12.yaml`; rejestr R-M5-004 +2 źródła (odczyt 2026-11-11), `docs/tresci/rejestr.json` scalony (`scal-rejestr.mjs --przeglad zastępczy`: 0 błędów).
- Testy: nowy `tools/content-build/test/cu-cbet-size-down.test.ts` (cbetVerdict; wektory gry 7-6-5 i 8-6-4 połączone → duży niedokładny, 8-5-2 i 9-7-2 półpołączone → dopuszczalny; czerwony przed poprawką: `docs/tresci/dowody/cu-czerwone-przed.txt`); `szablony-co.test.ts` OCENY.check `bet-big` = `inaccuracy`; test 001 w `recenzja-ct-odtworzenie.test.ts` jako `it` (część ŚR-002 nietknięta, CV).
- Odciski: fingerprint generatora (karty) identyczny dla ziaren 1–500 każdego poziomu SC-11/SC-12; zmienia się tylko `verdicts['bet-big']` SC-12 (acceptable → inaccuracy) — `docs/tresci/dowody/cu-sonda-odciski.txt`. Skutek: `odciskWariantu` (FNV z `points`) SC-12 inny, więc przerwany plan SC-12 po aktualizacji zaczyna nowe rozdanie z zachowaniem odpowiedzi (D-787); historia i limit (fingerprint) bez zmian.

## Otwarte / dla innych ról
- **09:** przegląd przekładów nowego wyjaśnienia `bet-big` SC-12 (11 języków, D-848).
- **Backlog (D-846, NIS-003):** zdanie o nadkartach w wyjaśnieniu i „Liczbach” wariantów draw-call z nadkartą (sc-01/02/03/19 × 12 języków, `pl.json`), wymaga znacznika wariantu (08) i brzmienia (04). Wersja: po wydaniu SC-11/12 [DO USTALENIA przez koordynatora].
- **Backlog (D-847, NIS-004, rodzaj P):** brak rąk z nadkartą w sc-01 T i sc-03 Ś — decyzja roli 03/właściciela; rekomendacja CT (a) z asercją w teście CQ 003.
- **R-M5-004, półpołączone niskie flopy:** `best: check` dla nich pozostaje otwartym pytaniem z D-510 (`docs/tresci/e1-m5-m8.md`); D-845 go nie rozstrzyga.
- **Rejestr Drive (12/13):** D-845…D-848 tylko w repo, do przeniesienia przez sesję z dostępem do Drive.
- **Scalenie z CV (ŚR-002):** pliki poza `content/`: `packages/poker-core/src/grading.ts`, `packages/poker-core/src/scenario-gen.ts` (linie 98–99 i 506–510, rozłączne z `GENERATOR_WERSJA`), `packages/content-schema/src/index.ts`, `tools/content-build/src/build.ts`, `tools/content-build/test/{cu-cbet-size-down,szablony-co,recenzja-ct-odtworzenie}.test.ts`, `apps/mobile/src/data/content/tresc.generated.ts`, `apps/mobile/assets/content/*.db`.
- Status „zweryfikowane” nadaje reaudit.
- Przegląd ścieżki wrażliwej (D-043, subagent w świeżym kontekście, tylko `git diff 5839a90..a746b4d5 -- packages tools/content-build/src apps/mobile/src` + zasady 10–14): **„brak uwag”** (sprawdził: pole dociera do aplikacji przez schemat zod w `repo.ts`, losowanie bez rng w nowym warunku, przypadki bez pola po staremu, werdykty nie są zapisywane w danych użytkownika).

## Dowody
- `pnpm content:build` kod 0; `pnpm run ci` kod 0 na `a746b4d5`: `docs/programista/dowody/cu-ci-a746b4d5.txt` (content-build 400 + 2 oczekiwane porażki: ŚR-002 CT dla CV i wcześniejszy `it.fails`; mobile 910).
