# Stan sesji AQ — pełny przegląd przekładu pt-BR, es, it (2026-11-10)

Rola 09-lokalizacja, tryb audit, tylko dokumenty. Gałąź `przeglad-aq-romanskie` od `claude/sleepy-brahmagupta-2065nu` @ 016317e (polecenie podawało e01ba05; różnica 2 commity D-395/D-396 poza `content/` i słownikami — potwierdzone przez koordynatora). Polecenie: `docs/koordynacja/polecenia/AQ.md` @ 5c930d5 (gałąź `koordynacja`).

## Wynik: wszystkie trzy języki ukończone

| Język | Jednostki przeczytane w całości | KRYT | WYS | ŚR | NISKIE | Znalezisk | Poprawek do nałożenia | Odrzucone przez koordynującego |
|---|---|---|---|---|---|---|---|---|
| it | 65/65 + terms-nazwy + metadane fala 2 | 0 | 0 | 119 | 117 | 236 | 291 (`it/poprawki-it.json`) | 0 |
| es | 65/65 + terms-nazwy + metadane fala 2 (es-ES) | 0 | 1 | 73 | 50 | 124 | 123 (`es/poprawki-es.json`) | 2 (es-U-01, es-L5-03) |
| pt-BR | 65/65 + terms-nazwy + metadane fala 1 | 0 | 0 | 70 | 36 | 106 | 112 (`pt-BR/poprawki-pt-BR.json`) | 3 (pt-BR-U-03, -04, -05) |

Nieprzejrzane: brak. Jedyny WYS: es `content/es/lessons/m4-l4-limperzy.md:33` „todos pasan hasta ti” (pasar = check; pl: fold) → „todos se retiran hasta ti”, potwierdzony u źródła. Treść krytyczna (m12, R-M12-*, exams/m12, helplines) w trzech językach: bez zmiany liczby, granicy ani kierunku.

## Pliki
- `<język>/znaleziska.md` — liczby, rozstrzygnięcia, pokrycie 65 jednostek, tabele znalezisk (plik:linia, było → ma być, powód), błędy źródła, „Do sprawdzenia”.
- `<język>/poprawki-<język>.json` — do nałożenia; format `docs/lokalizacja/narzedzia/poprawki.mjs` (jezyk, cel, stary, nowy, waga, powod, grupa). `stary` występuje w pliku `cel` dokładnie raz na stanie 016317e; poprawki tego samego pliku nie nachodzą na siebie, kolejność dowolna.
- `<język>/czesci/` — surowe wyniki czytających (13 na język) i ich listy poprawek; `<język>/uzupelnienia.tsv` + `czesci/poprawki-<język>-S.json` — uzupełnienia koordynującego; `<język>/decyzje.md` — rozstrzygnięcia.
- `instrukcja-subagenta.md` (prompt czytającego), `sprawdz-poprawki.py`, `scal.py`, `uzupelnij.py`, `zbuduj-znaleziska.py`.

## Jak nałożyć (sesja kodu)
`poprawki.mjs` działa na pliku propozycji (`jednostki[].tekst`); te listy celują w pliki już wydane w `content/` i słowniku, więc: albo zbudować plik propozycji z bieżących plików (`jednostki: [{jezyk, cel, tekst: <treść pliku>}]`) i użyć `poprawki.mjs` bez zmian, albo nałożyć wprost (`tekst.replace(stary, nowy)` przy dokładnie jednym wystąpieniu — tak robi `scal.py --kopia <katalog>`, który zapisuje poprawione pliki do kopii). Poprawki w `store/app-store-metadata.json` (pt-BR, 6) i `docs/sklep/aso/metadane-fala2.json` (it 3, es 1) dotyczą plików generowanych przez `docs/sklep/aso/zbuduj-metadane.py` — nanieść w generatorze (rola 10). Po nałożeniu: `pnpm content:build`, `pnpm run ci`.

Odtworzenie kontroli: `python3 scal.py it`, `python3 scal.py es --bez es-U-01,es-L5-03`, `python3 scal.py pt-BR --bez pt-BR-U-03,pt-BR-U-04,pt-BR-U-05` (kod 0 = 0 pominiętych, pliki parsują się, `{{n:…}}`/`[[…]]` = pl).

## Decyzje (pula D-430…D-439; terminologiczne, do weta; do wpisania w `docs/decyzje.md` przez koordynatora)
- **D-430** it: formy terminów za nazwą z `terms-nazwy.yaml` (top pair, OESD, secco, maniac, exploit, fiches, premi, apertura, foldare) — `it/decyzje.md`.
- **D-431** es: forma rodzima spójna w korpusie zostaje (pareja mayor, bloqueador, sobrepareja; wzór D-389), forma mieszana idzie za nazwą (overbet, alpha, recreativo, primeras posiciones, odds implícitas, etykiety raportu jak w `es.json`) — `es/decyzje.md`.
- **D-432** pt-BR: „Tilt por …”, microlimites, aumento/abertura w definicjach, prêmios, Bolha, teto, Second barrel — `pt-BR/decyzje.md`.
Niewykorzystane: D-433…D-439.

## Wyjątki nazwane
1. Raport `audit/09-lokalizacja-2026-11-10.md` z szablonu roli i `sprawdz-raport.mjs` nie powstał: polecenie AQ zawęża wyjście do `znaleziska.md` + listy poprawek na język; kontrola zastępcza: `sprawdz-poprawki.py` i `scal.py` (kod 0) oraz weryfikacja WYS u źródła.
2. Lista 65 jednostek odtworzona z logiki `jednostki()` (`scripts/i18n/wspolne.mjs:147`: słownik + 61 plików `content/pl` + spots + helplines + terms-def), bez uruchamiania narzędzia przekładu.
3. Tryb audit zakłada brak commitów; polecenie AQ nakazuje commit dokumentów na gałęzi sesji. `content/`, słowniki, kod i workflowy nietknięte (`git diff --stat 016317e -- content apps packages scripts tools .github store` puste).
4. Czytający dostali własną instrukcję (`instrukcja-subagenta.md`) opartą na prompcie modułu `tlumaczenie` z roli; nie czytali wcześniejszych przeglądów (D-366…D-394).
5. Do jakości języka: to drugi przegląd AI, nie ocena rodzimego użytkownika (zasada roli nr 2); pozycje „Do sprawdzenia” są pytaniami do człowieka znającego język.

## Koszt
0 USD API (workflow `przeglad-tlumaczen.yml` nieuruchamiany). 39 subagentów: ok. 6,96 mln tokenów (it 2,40 mln, es 2,30 mln, pt-BR 2,26 mln; 145–230 tys. na czytającego) + sesja główna. Czas zegarowy: ok. 10 min czytania na język równolegle, całość ok. 1 h.

## Następny krok
Sesja kodu: nałożenie trzech list, decyzje globalne z „Bez rozstrzygnięcia” (es Button/botón, pt-BR street i pré-flop, it rodzajnik przed procentem, it nazwy royal/straight flush), błędy źródła pl do roli 06 (`exams/m2.yaml:89`, `lessons/m10-l3:49`).
