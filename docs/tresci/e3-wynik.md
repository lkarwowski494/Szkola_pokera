# Rola 06 E3: wynik (2026-11-04) — STOP E3

Historia przebiegu E3 (sesje 19–21): `docs/archiwum/tresci-e3-wynik-robocze-2026-11-04.md`. Werdykty: `docs/tresci/e3/A1–A12`, kontrole zawężone `A11-kontrola.md`, `A11-kontrola-2.md`. Lista poprawek z werdyktów: `docs/tresci/e3/do-poprawy.md` (0 pozycji „do zrobienia”). Decyzje: D-156–D-164 w `docs/decyzje.md`.

## Definicja ukończenia (build), punkt po punkcie

| Punkt | Stan | Dowód |
|---|---|---|
| Skrypt kontroli bez `--przed-przegladem` kod 0 na rejestrze, treściach i parametrach (przegląd zapisany dla bieżącej wersji zdań) | spełniony | `pnpm tresci:rejestr` = `scal-rejestr.mjs --przeglad zastępczy --sprawdz`: „0 błędów, 0 uwag”, w `pnpm run ci` (kod 0, ostatni przebieg przed commitem tej bramki); strażnik `tools/content-build/src/registry.ts` w `content:build` |
| Każde potwierdzone twierdzenie ma przeczytane źródło (adres, cytat albo miejsce, data, szczebel); żadne tylko na szczeblu 5; jedno źródło szczebla 3–4 oznaczone; atrybucja przy najniższym szczeblu | spełniony z wyjątkiem nazwanym | 994 potwierdzone, 0 bez źródeł, 0 tylko ze szczebla 5 (wynik `scal-rejestr`); 119 z jednym źródłem szczebla 3–4 wylicza raport skryptu; atrybucja: karta reguły pokazuje rodzaj i liczbę źródeł („jedno źródło”); definicje terminów ze źródłem szczebla 4 bez atrybucji w tekście (wyjątek D-163, reguła właściciela nr 5); rachunki odtwarzalne w repo: `docs/tresci/narzedzia/rachunki/` (3 skrypty, 167 sprawdzeń, kod 0) |
| Sprzeczności rozstrzygnięte i zapisane z odrzuconymi opcjami; czego nie potwierdzono, jest w otwartych pytaniach | spełniony | D-138–D-164; 2 wpisy `otwarte` (P-FSRS_CZAS, P-OCENA_PROG_MIESZANA): parametry produktowe bez źródła zewnętrznego, w tekście nazwane ustawieniem aplikacji (D-145) |
| Każde twierdzenie ma werdykt weryfikatora, który nie był autorem; krytyczne mają zapis przeglądu | spełniony | A1–A7 (1034 wpisy E2), A12 (7 wpisów dodanych w E3); 11 krytycznych z `przeglad` ze skrótem bieżącej wersji: przegląd zastępczy D-027 (A8–A11, kontrole zawężone D-162); przegląd eksperta, gdy aplikacja zyska użytkowników (CLAUDE.md, ZAL) |
| Parametry i wektory przekazane z ID twierdzeń; publiczne repo bez kopii źródeł i roboczych tekstów spoza zgody | spełniony | parametry: `content/numbers.yaml` (klucz = `n:` w rejestrze), P-* w `docs/tresci/rejestr/pomoc.json`; wektory: `tests/wektory/brd.json`, `tools/content-build/test/helplines.test.ts`, `HelpScreen.test.tsx`, skrypty rachunków; repo zawiera rejestr i odczyty (cytaty ≤ 2 zdania), zgodnie z wyborem E0 (`docs/tresci/00-rozpoznanie.md:60`, rejestr w `docs/tresci/`) i kartą „Stan projektu” (repo treści prywatnych: brak) |

## Przekazanie

- **07 Jakość:** wektory: `tests/wektory/brd.json`; rachunki jako wyrocznie liczb: `python3 -I docs/tresci/narzedzia/rachunki/rachunek_*.py` (kod 1 przy rozbieżności); warunki testów dla stanów błędów: kolumna „Warunek” w `docs/tresci/stany-bledow-fakty.md`; skala oceny P-OCENA_STOPNIE (0 < f < 3,5% to niedokładność, nie błąd; D-143) do testu `grading.ts`/`thresholds.ts` po zmianie roli 08. CI main: E2E Maestro czerwony (znalezisko z E0).
- **05 Architekt / 08 Budowa:** kontrola treści w CI: `pnpm tresci:rejestr` (już w `pnpm run ci`); format treści bez zmian (`content-build`, baza na język, ADR 0005). 08: etykieta werdyktu dla 0 < f < 3,5% (D-143, `thresholds.ts`, `grading.ts`, gałąź `wrong` w `drills/text.pl.ts`); ocena poziomu F-01: pytania `docs/tresci/ocena-poziomu-pytania.md` (reguła wyniku do decyzji 03/04/08); komunikaty błędów zgodne z `stany-bledow-fakty.md`; zgłoszenia D-158/D-159: `docs/tresci/e3/zgloszenia-D-158-D-159.md`.
- **09 Lokalizacja:** do przekładu: `content/pl/` (lekcje, reguły, egzaminy), `content/terms.yaml`, `content/helplines.yaml` (zdanie H-INT-2 zmienione w E3), trzy teksty w `drills/text.pl.ts` (ocena zakresu); liczby tylko przez `{{n:}}`; tłumaczenia przechodzą `content:build` (strażnik rejestru) w każdym języku. Zdania 11 twierdzeń krytycznych w innych językach wymagają tej samej kontroli (skrót wersji liczony dla PL).
- **04 Studio Projektowe:** brzmienie komunikatów 9 stanów błędów według `docs/tresci/stany-bledow-fakty.md` (kolumna „Nie wolno”; rekomendacja: bez proponowania reinstalacji); ekran oceny poziomu (8 pytań, „Pomiń”); trzy zmienione teksty oceny zakresu w `drills/text.pl.ts` (fakty: 06, brzmienie: 04).
- **10 Wydanie:** tekst sklepu i opis wydania tylko z twierdzeń `potwierdzone` w rejestrze; aplikacja bez gry na prawdziwe pieniądze (D-159; App Review 5.3.4, odczyt w E0 roli 02); bez numerów infolinii krajowych (D-158).
- **Właściciel:** rejestr 03 i dokument 13 na Dysku czekają na D-101–D-164 oraz tabelę par terminów (konektor bez edycji, krok właściciela); przegląd eksperta treści krytycznych, gdy aplikacja zyska użytkowników; regulamin MedlinePlus zabrania automatycznego pobierania treści — weryfikatorzy pobierali pojedyncze strony do odczytu cytatu (do wiadomości).

## Ograniczenia i wyjątki (nazwane)
- D-162: poprawki po A11 potwierdzone kontrolą zawężoną w świeżym kontekście, nie piątym pełnym przeglądem (akceptacja właściciela 2026-11-04).
- D-163: definicje terminów ze źródłem szczebla 4 bez atrybucji w tekście.
- Skrót wersji obejmuje całą lekcję z regułą krytyczną (D-157): każda zmiana m12-l4, m12-l1, egzaminu M12, `helplines.yaml` albo wpisu z 11 krytycznych daje czerwone CI do czasu kontroli zawężonej i nowego zapisu `przeglad`.
- E2E iOS nieuruchomione (brak macOS w chmurze); testy na telefonie: krok właściciela z listą od roli 07.
