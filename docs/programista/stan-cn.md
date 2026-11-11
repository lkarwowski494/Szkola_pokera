# Stan sesji CN (08-programista, build): GeneratorContext na ekranie scenariusza (F2–F4), ŚR-001/002 i NIS-004 z recenzji CM
Gałąź `sesja-cn-kontekst` od 9143dec; decyzje `docs/decyzje/CN.md` (D-780…D-787). Rola 08, tryb build; polecenie koordynatora `docs/koordynacja/polecenia/CN.md`.

## Zrobione
- **Zadanie 1** (ekran → pełny kontekst): `getKontekstGeneratora(db, szablon)` (`apps/mobile/src/data/content/repo.ts`) składa `GeneratorContext` z bazy treści tą samą funkcją co kontrola w budowaniu (`buildGeneratorContext`, poker-core); `scenario.tsx` podaje go do `otworzScenariusz`. F2 (cbet-case), F3 (size-spot) i F4 (icm-call) dają poprawny plan i ekran: akcje własne punktu, graf planu z `points`, kwoty i dziennik rywala. `checkScenarioNaEkran` = lista dozwolonych (draw-call, cbet-case, size-spot, icm-call); **range-spot (F1) nadal odrzucany** (D-755, D-782).
- **Zadanie 2** (ŚR-002): icm-call tylko BB wobec all-inu SB; `it.fails` → `it` (D-786).
- **Zadanie 3** (NIS-004): odcisk wariantu w planie; wznowienie po zmianie szablonu zaczyna nowe rozdanie (D-787).
- ŚR-001 CM: test `cm-recenzja-cl.test.ts` zmieniony z „odrzuca F2–F4” na „bramka zgodna z ekranem” (D-782, powód zapisany).

## Dowody
- `docs/programista/dowody/cn-ci-08abdad.txt`: `pnpm run ci` kod 0 na czystym HEAD 08abdad3 (kod i decyzje); liczby: mobile 115 zestawów / 861 testów, content-build 322, postep 160, domena 347 (+1 oczekiwany fail CG), poker-core 179.
- Testy nowe: `apps/mobile/src/features/scenariusz/__tests__/kontekst-cn.test.ts` (30: kontekst z bazy, plan, odpowiedzi, wznowienie, kwoty), `ekran-cn.test.tsx` (7: render F2–F4), `wznowienie-cn.test.ts` (3; czerwony bez porównania odcisku), `packages/postep/test/plan-odcisk-cn.test.ts` (3), `tools/content-build/test/cm-recenzja-cl.test.ts` (ŚR-001/002).
- Czerwień przed kodem: testy „bez kontekstu → plan_niepoprawny” dokumentują stan sprzed CN; ŚR-002: `it.fails` CM był dowodem czerwieni; NIS-004: porównanie odcisku wyłączone na próbę → „Expected: not "w3"” (to samo id wznowione), po przywróceniu zielone.
- Zmieniony istniejący test: `aktywnoscScenariusza.test.ts:33` (plan zawiera teraz `odcisk`, D-787).

## Zgłoszenia do innych ról
- **04 (system projektowy, teksty):** (a) nazwy akcji F2/F3 reużywają `play.*`: „Mały c-bet”, „Przebicie do N bb”, limp jako „Sprawdzam 0,5 bb”; potrzebne właściwe etykiety (rozmiar jako ułamek puli, limp); (b) „Liczby” dla c-betu, rozmiaru i ICM (equity ręki, próg ICM, próg w żetonach) bez tekstu (D-785); (c) `{{w:stol}}` przed flopem = „preflop” (D-784); (d) układ ekranu dla jednopunktowego rozdania preflop (brak puli, kart stołu).
- **05 (architektura):** `WariantPlanu.odcisk?` w planie aktywności (D-787) i `game_kit.equity169` w bazie treści (D-781); wersja treści szablonu w planie nadal brak (CG ŚR-001 szersza naprawa).
- **06 (treść):** icm-call wymaga pary BB wobec SB (D-786) i spotu, którego `hero` to pozycja rywala (nie sprawdzane maszynowo); range-spot czeka na ekran (F1).

## Otwarte
- range-spot (F1): ekran z akcjami etykiet spotu (3-bet, all-in, call vs open…) i tekstami od roli 04; wtedy `RODZAJE_NA_EKRANIE` o `range-spot`. Zmiana `generateVariant` może też wymagać podniesienia `GENERATOR_WERSJA`: **tu nie podniesione**, bo wynik generatora dla dotychczasowych szablonów (draw-call) się nie zmienił; zmieniła się tylko odmowa icm-call dla pary SB/BB (wariantów wcześniej nie było w treści).
- Walidacja maszynowa pozycji spotu icm-call (RangeSpotData bez `hero`).
- Weryfikacja na urządzeniu iOS: brak macOS; zmiany sprawdzone testami Jest (render react-native-testing-library), bez zrzutów ekranu (zrzut wymaga uruchomienia aplikacji w Expo web/symulatorze).
- NIS-003 CM (test ekranu gałęzi powtórki z wpisem wersji 0) i NIS-005 CM (znaczniki konfliktu w pre-push): bez zmian, do backlogu.
- Przegląd niezależny ścieżek wrażliwych (`tools/content-build/src`, `packages/poker-core`, `packages/postep`, także `packages/domena`): zlecić po PRZEKAZANIU (D-043).
