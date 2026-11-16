# Rejestr twierdzeń sesji HZ (SC-09; zmiany względem rejestru HP)
Stan: 2026-11-16 · Rola 06 build, sesja HZ · Odczyt: `docs/tresci/odczyty/hz-2026-11-16.tsv` (adres, sha256 HTML, cytat dosłowny; HTML pobrany `curl`, tekst bez skryptów) · Skróty: PW = preflopwizard.app ISO Raise Strategy, PN = pokernews.com 10 Tips for Crushing Limpers (oba szczebel 4, źródła R-M4-012 w `content/pl/rules.yaml:342`).
Zdania „Masz {{w:reka}}…” (opis wariantu) to dane zadania (D-1300), nie twierdzenia. Szablony SC-16, 18, 21, 26, 27, 30: twierdzenia w `docs/tresci/szablony-robocze/fd/rejestr-hp.md` (bez zmian poza listą „Zmiany” niżej).

## SC-09 (izolacja limpera, rozmiar przebicia; gracz CO, limper HJ)

| ID | Twierdzenie (jak w szablonie) | Źródło: cytat (odczyt 2026-11-16) | Szczebel | Uwagi |
|---|---|---|---|---|
| T-HZ-01 | Przebijasz do `pf.iso.base` plus `pf.iso.per-limper` za każdego limpera. | PN: „Raise to 3bb+1bb per limper when playing online”; PW: „Base open size (3bb) + 1 big blind per limper” | 4 | R-M4-012 `then`; rozmiar dla gry online (jak źródło reguły) |
| T-HZ-02 | Mniejsze przebicie daje limperowi zbyt dobrą cenę i nie odbiera mu rozdania. | PW: „Never min-raise a limped pot. A raise to 2bb over a 1bb limp gives every limper 4-to-1 odds to call. At those prices, even 72o starts becoming a call.” | 4 | R-M4-012 `because`; cytat dotyczy min-raise'u, w szablonie „mniejsze” = 0,8 standardu (`SIZE_SMALL_FACTOR`), kierunek ten sam |
| T-HZ-03 | Bez pozycji przebijasz o `pf.iso.oop-extra` więcej. | PW: „Add 1bb more from OOP positions.” | 4 | Tylko w wyjaśnieniu raise-big jako opis standardu; gracz w szablonie jest na CO (z pozycją), więc dopłata go nie dotyczy |

## Otwarte

- **OP-HZ-1: SC-09 z graczem na BB** (D-1824). Generator dolicza `pf.iso.oop-extra` graczowi na SB i BB (`packages/poker-core/src/scenario-gen.ts:1214`). Gdy gracz jest na BB, a limperem jest SB, to po flopie SB gra bez pozycji wobec BB, więc „OOP” nie jest jednoznaczne. PW: „Add 1bb more from OOP positions.” (bez definicji pozycji OOP); w sekcji BB PW nie podaje rozmiaru: „The BB ISO is the least common and least profitable spot. You check your option or raise for value/semi-bluff.”; w sekcji SB: „A 5-6bb raise over a 1bb limp is an example, not a universal solver prescription.” Brak przeczytanego źródła z rozmiarem izolacji z BB → szablon tylko z graczem poza BB (warunek `positions.hero: CO`). Do rozstrzygnięcia: źródło szczebla 2–4 z rozmiarem izolacji z BB wobec limpera z SB i spoza SB.
- **OP-HZ-2: sprzeczność wewnątrz PW** (D-1824 b). Tabela „Adjusting for multiple limpers” (kolumna „BTN ISO size”): „1 limper 4-5x open (9-12bb)”, a ta sama strona: „Base open size (3bb) + 1 big blind per limper”, tabela IP: 1 limper 4bb, oraz jako błąd: „over-sizing to 10-12bb against a single limper”. Rozstrzygnięcie: zostaje formuła R-M4-012 (dwa źródła szczebla 4 zgodne: PN i tekst PW; tabela „9-12bb” sprzeczna z resztą tej samej strony). Do przeglądu reguły R-M4-012 przez rolę 06 przy audycie źródeł M4.

## Zmiany względem rejestru HP

- SC-18: wyjaśnienie bet-small usunięte (ekran turn-action: check + bet-big, decyzja koordynatora IB/KO-115; D-1820). Twierdzenia rejestru HP dotyczące tylko bet-small (R-M7-005) nie są już w szablonie.
- SC-30: situation bez `{{w:vpip}}`; VPIP rywala jako zakres `hud.ex.nit3bet.vpip.low`–`high` (8–10%), dana zadania (D-1300), nie twierdzenie. Pas sprawdzony rachunkiem dla każdej klasy ręki z generatora (21 klas, margines ≥ 0,04, D-1829) przy VPIP 0,08, 0,09 i 0,10 (`docs/tresci/dowody/hz-szablony.txt`; D-1822).
- SC-16, 18, 21, 27, 30: dopisane znaczniki terminów `{{t:…}}` (T-02, 11 miejsc); treść twierdzeń bez zmian.
- SC-07, 15, 17, 24, 31 (`content/`): poprawki brzmienia z uwag HY (D-1817 → D-1823); twierdzenia te same, zmienione tylko sformułowania („udział blefów” zamiast „liczba blefów”, „dana zadania” zamiast „rozdanie”, warunek backdoora z kartą wyższą od wszystkich kart stołu jak R-M6-006 „z co najmniej jedną kartą wyższą”).
