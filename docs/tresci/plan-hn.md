# Sesja HN (06-tresci build): szkice FD → content — stan
Aktualizacja: 2026-11-16 · gałąź `claude/sesja-hn-szablony` od 0b0855ef · polecenie `koordynacja:docs/koordynacja/polecenia/HN.md` @ 751bdd85

## E0 (zakończone, STOP do koordynatora)
Stan faktyczny @ 0b0855ef: `content/pl/scenarios` i `content/en/scenarios` mają po 18 szablonów (SC-01–06, 08, 11–13, 19, 22, 25, 28, 29, 32–34);
tabela §2 `docs/zakres/scenariusze-plan.md` (11–12.11) jest nieaktualna (SC-22, 25, 28, 29 oznaczone „brakuje”, a są w treści).

Metoda: każdy szkic `docs/tresci/szablony-robocze/fd/{pl,en}/sc-NN.yaml` osobno skopiowany do `content/{pl,en}/scenarios`, `pnpm content:check`;
logi w scratchpad sesji (nie w repo). Bazowo (bez szkiców) `content:check` kod 0.

| Szkic | Wynik `content:check` | Klasa |
|---|---|---|
| SC-10, 14, 17, 20, 23, 24, 31 | walidacja szablonu przechodzi; jedyny błąd „Uruchom: pnpm content:build” (bazy nieaktualne po dodaniu pliku) | gotowe do przeniesienia |
| SC-07 | `rozmiar fractions 0.33 w decyzji, a tekst podaje {{n:cbet.size.small}} = 0.333333 (06-tresci-008)` | poprawka treści (06): fractions = 0.333333 |
| SC-15 | to samo dla fractions 0.25 i 0.33 | poprawka treści (06): ułamki zgodne z kluczem w tekście |
| SC-09 | `punkt 1 iso-size nie jest jeszcze obsługiwany na ekranie scenariusza (…limperów…)` | czeka na silnik/ekran (HO/08 + 04) |

## Następny krok
Po odpowiedzi koordynatora: przeniesienie 7 gotowych + SC-07, SC-15 po poprawce, `pnpm content:build`, testy, `pnpm run ci`.

## Stan po E2 (2026-11-16, @ 154a960a + dowód)
- W `content/` (11 języków): SC-07, 10, 15, 17, 20, 23, 24, 31 (D-1690 rozmiar 1/3, D-1692 przekłady agenta do przeglądu 09, D-1693 en `{{t:bet}}`).
- SC-14 wycofany (D-1691, R-M5-012 / 08-FD-5); SC-09 czeka na widok limperów (iso-size). Szkice obu zostają w `docs/tresci/szablony-robocze/fd/`.
- CI: `docs/tresci/dowody/hn-ci-154a960a.txt` — kod 1; 3 czerwone testy czekają na HO (KO-111): pokrycie CZ (5 rodzajów bez wyroczni), `generator-odciski.json` (przelicza HO po scaleniu), `cs-tresc-realna` sc-23 (pętla podaje akcje szablonu zamiast hand-a/hand-b). Testy z winy treści: 0.
- Następny krok: po scaleniu z HO powtórzyć `pnpm run ci` (kod 0 = gotowe); rola 09: przegląd 80 przekładów agenta.
