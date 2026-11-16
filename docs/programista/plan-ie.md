# Plan IE (08-programista, tryb fix): testy content-build dla 7 szablonów HZ — stan bieżący
Stan na 2026-11-16. Gałąź `claude/sesja-ie-testy` od b1c010ca. Decyzje: `docs/decyzje/IE.md` (D-1870…D-1873). Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/IE.md`.

## Zatwierdzone ID i klasyfikacja
Wejście: 5 czerwonych testów `tools/content-build/test` z `docs/tresci/dowody/id-ci-67e1a434.txt` (D-1865). Wszystkie rodzaj D (brak testów/filtrów w stronie testowej; kod `src` poprawny: aplikacja buduje kontekst z iso-size, `ib-rodzaje-ho-ekran` zielony).

| # | Test czerwony na b1c010ca (przyczyna) | Poprawka | Commit |
|---|---|---|---|
| 1 | `generator-odciski.test.ts` „ziarna 1–200…” (filtr bez iso-size; brak 10 kluczy) | filtr + `generator-odciski.json` +10 kluczy | 3.1 |
| 2 | `recenzja-cq-odtworzenie.test.ts` „sc-09 latwy…” (filtr bez iso-size) | filtr | 3.1 |
| 3 | `szablony-du.test.ts` „treść ma szablony size-spot” (lista bez sc-09) | lista sc-06, sc-08, sc-09 | 3.1 |
| 4 | `szablony-du.test.ts` „sc-09 latwy: 10000 wariantów” (filtr; wyrocznia NaN dla iso-size) | filtr + `isoStandard` z parametrów reguły | 3.1 |
| 5 | `cz-pokrycie-szablonow.test.ts` „każdy szablon pl ma punkt objęty testem…” (sc-16, 18, 21, 26, 27, 30 bez wpisu) | `hz-pokrycie-wyrocznie.test.ts` + `wyrocznie-hz.ts` + 5 wpisów mapy | 3.2 |

## Różnica kluczy `generator-odciski.json` (baza b1c010ca → po 3.1)
wersja 6 → 6, ziarna 200 → 200. Nowe (10): sc-09|latwy, sc-16|latwy, sc-18|latwy, sc-21|latwy, sc-21|sredni, sc-26|latwy, sc-26|sredni, sc-27|latwy, sc-27|sredni, sc-30|latwy. Usunięte: 0. Zmienione: 0.

## Realność
Realny dla wydania (ci czerwone blokuje scalenie gałęzi ID, D-1865); dla użytkownika brak skutku (zmiany tylko w testach).

## Otwarte (poza zakresem IE, do koordynatora)
1. `[DO USTALENIA]` sc-26 i sc-27 (Ś): `stackBb` z ekranu startu vs stosy wariantów (D-1873). Rodzaj M/D treści, rola 06.
