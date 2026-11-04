# Zgłoszenia roli 06 po D-158 i D-159 (2026-11-04)

Źródło: decyzje właściciela D-158 (pomoc bez numerów krajowych) i D-159 (M12 bez gry na prawdziwe pieniądze); wykonanie w treściach: D-160, D-161, commit 32ea0a0.

## Do roli 01 (`fix`): RD-12
- `docs/brd/reguly.md` RD-12 („Telefon pomocy … według kraju użytkownika”) i wektory RD-12-W1…W6 opisują numery krajowe (D-142). Po D-158 reguła brzmi: w każdym kraju to samo zdanie ogólne (twierdzenie H-INT-2) i jeden link do pomocy międzynarodowej online (H-INT-1); bez wyboru kraju i regionu.
- Do zmiany: RD-12, wektory w `tests/wektory/brd.json` (13 wystąpień „RD-12”), BR-POM-001/002 w `docs/brd/README.md`, akapit w `docs/brd/odkrywanie.md:146`. Proponowane wektory: kraj US / GB / brak regionu / kraj spoza dawnych rynków → zawsze `fallback.text` raz i link `gamblingtherapy.org`, zero przycisków „Zadzwoń”.
- Dziś te wektory nie są czytane przez żaden test (sprawdzone: `grep -rln RD-12 tests/ apps/ packages/ tools/`), więc nie blokują CI.

## Do roli 08: ekran „Pomoc”
- Dane mają jeden wpis i pusty `regions`; kod nadal obsługuje kraje, regiony i przyciski tel: (`apps/mobile/src/app/help.tsx`, `selectHelplines` w `packages/content-schema/src/helplines.ts`, `regions_label`). Propozycja: uproszczenie ekranu do zdania i linku, usunięcie `expo-localization` z tego ekranu, pól `regions`, `regions_label`, `national`, `phone*` z modelu; test mechaniki na danych syntetycznych (`tools/content-build/test/helplines.test.ts`) usunąć razem z kodem.
- Naprawione przez 06 tylko to, co psuło ekran po zmianie danych: zdanie pokazane dwa razy (`help.tsx`, `abroadText` przy `fallbackText`) i E2E `04-pomoc.yaml` / `helplines-env.mjs`, które czytały numery. E2E nie było uruchomione (Maestro tylko na macOS; CI main ma czerwone E2E, rola 07).
- Tekst `help.intro` w i18n („Poker na pieniądze to gra hazardowa…”) zostaje (zdanie ostrzegawcze); brzmienie należy do 04.

## Do roli 04
- Lekcja M12-L4 ma nowy tytuł i podtytuł („Bankroll i ryzyko”, „Wariancja liczona w wpisowych i kiedy zejść stawkę”); brzmienie do przeglądu głosu.

## Do roli 09
- Zmienione teksty do tłumaczenia: `content/helplines.yaml` (pointer, fallback.text), M12-L4, egzamin M12 (q8, q9, q10), M12-L3 (dwa zadania), M13-L3 (zdanie wstępu), termin `bankroll`.
