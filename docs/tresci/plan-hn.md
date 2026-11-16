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
