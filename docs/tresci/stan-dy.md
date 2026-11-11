# Stan sesji DY (06-tresci, build): szablony kroku E (SC-16…SC-31)
Gałąź `sesja-dy-szablony-e` od 29130d39 (= `origin/sesja-dv-zrodla`). Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/DY.md` @ 100319bb. Stan na 2026-11-11. Decyzje: `docs/decyzje/DY.md` (pula D-1080…D-1094). Wejście: `docs/tresci/zrodla-krok-e.md` (DV, D-1050…D-1057), KO-069…KO-072 (`origin/koordynacja:docs/koordynacja/decyzje.md:77-80`), wzór DU (`origin/sesja-du-szablony:docs/tresci/stan-du.md`, odczyt).

## Środowisko (ETAP 0)
Linux x86_64, Node v22.23.4, `pnpm install --frozen-lockfile` kod 0; git push na gałąź roboczą; sieć przez proxy (źródła czytała sesja DV, ta sesja nie dodaje nowych twierdzeń z sieci). Repo publiczne. Bez Xcode (tylko testy węzłowe).

## Inwentaryzacja (zadanie 1)
Silnik na tej gałęzi (= robocza b3963e9a, DX jeszcze bez pushu): rodzaje punktów `draw-call` (flop, turn), `range-spot`, `cbet-case`, `size-spot` (`open-size`, `three-bet-size`, `no-limp`), `icm-call` (`packages/content-schema/src/index.ts:561-644`, `tools/content-build/src/scenariusze.ts:203`). **Żaden punkt na riverze, żadna akcja gracza wobec c-betu, żaden zakład gracza na turnie.** Reguły: wszystkie wymienione mają w `content/pl/rules.yaml` wpis i w `docs/tresci/rejestr.json` status „potwierdzone” (szczeble w nawiasie, odczyt 2026-11-11). Żadna nie ma pola `check` poza R-M7-008.

| SC | Moduł | Krok | Reguły (poziom; szczeble rejestru) | Warunek (źródło DV) | Rodzaj punktu dziś | Potrzebny rodzaj (kto) | Wynik DY |
|---|---|---|---|---|---|---|---|
| SC-16 | M6 | E | R-M6-008 heuristic (2), R-M6-010 heuristic (1/2/4) | SC-16a, 16b, 16c | brak | 08-N2 + **08-N8** (akcja check-raise w punkcie obrony i rozmiar jako krotność c-betu) | szkic |
| SC-17 | M6 | D (DU) | R-M6-007 heuristic (2) | DU 08-N2 | brak | 08-N2 | szkic (DU nie szkicował) |
| SC-18 | M7 | E | R-M7-001 heuristic (2/4), R-M7-005 heuristic (2/4) | SC-18a, 18b, 18c | brak | **08-N9** (zakład/czekanie otwierającego na turnie po c-becie, klasa turnu, filtr ręki) + rozmiar 1/3 wobec ≥ 2/3 | szkic |
| SC-19 | M7 | C | R-M7-008 math, R-M7-009 | — | draw-call | — | już w treści (`content/pl/scenarios/sc-19.yaml`) |
| SC-20 | M7 | D (DU) | R-M7-006 math (1/4), R-M7-002 heuristic (2/4) | DU 08-N6 | brak | 08-N6 | szkic (DU nie szkicował) |
| SC-21 | M7 | E | R-M7-003 heuristic (2/4), R-M7-012 heuristic | SC-21 | brak | **08-N9** (jak SC-18, filtr `pairKind ∈ {second, low}`) | szkic |
| SC-22 | M8 | E | R-M8-001 math (1/4), R-M8-003 heuristic | SC-22 (D-1050, D-1051) | brak | **08-N7b** (river IP: bet/czekanie z zakresu sprawdzenia podanego jako dana) | szkic |
| SC-23 | M8 | E | R-M8-006 heuristic (2/4), R-M8-007 heuristic (2) | SC-23a, 23b (D-1054) | brak | typ KO-072 „wybór jednej z dwóch rąk” | szkic |
| SC-24 | M8 | D/E | R-M8-010 math (1/4), R-M8-012 heuristic (2/4) | SC-24 | brak | **08-N7a** (river: sprawdzenie/pas bluff-catcherem ze składu zakładów jako danej) | szkic |
| SC-25 | M8 | E | R-M8-002 heuristic (2/4) jako wniosek R-M8-001 math | SC-25 | brak | 08-N7b | szkic |
| SC-26 | M9 | E | R-M9-001 math (1/2/4), R-M9-003 heuristic (1/2/4), R-M9-010 heuristic | SC-26 | brak (draw-call `all-in` ocenia tylko drawy) | **08-N10** (flop: sprawdzenie/pas all-inu ręką gotową przy SPR < 3, filtr najwyższa para lub lepsza) | szkic |
| SC-27 | M9 | E | R-M9-006 math (1/2/4), R-M9-009 math (1/2) | SC-27 | brak (`size-spot` tylko preflop) | **08-N11** (rozmiar na flopie w puli 3-betowanej: geometryczny wobec 1/3, ręka na trzy ulice) | szkic |
| SC-28 | M9 | E | R-M9-008 heuristic (2/4) jako kierunek, R-M8-001 math | SC-28 | brak | 08-N7b (trzeci zakład na riverze overparą) | szkic |
| SC-29 | M10 | E | KO-071: R-M8-001 math (warunek SC-22); R-M10-004 heuristic tylko w opisie typu (4) | SC-22 z szerokim zakresem sprawdzenia | brak | 08-N7b | szkic (zadanie 4) |
| SC-30 | M10 | E | KO-071: rachunek equity wobec górnych x% (handEquity) i cena sprawdzenia; R-M10-007 exploit **nie** | D-1055 SC-30 | brak | **08-N12** (preflop: sprawdzenie/pas 3-betu, equity ręki wobec górnych x% rąk jako danej) | szkic (zadanie 4) |
| SC-31 | M10 | E | KO-071: R-M8-010 math (warunek SC-24); R-M10-008 exploit **nie** | SC-24 ze składem maniaka | brak | 08-N7a | szkic (zadanie 4) |

Podsumowanie: z 16 szablonów obecny silnik obsługuje tylko SC-19 (już w treści). **Zadanie 2 (szablony do `content/`) ma dziś zakres pusty**; 15 szkiców trafia do `docs/tresci/szablony-robocze/` (zadanie 3 i 4). Szablony nie używają `villainType` (schemat: tylko z regułą exploit z populacją, `index.ts:658`): typ rywala w M10 jest w polu `situation` jako dana (KO-071).

## Zadania dla roli 08 (DX) wynikające z kroku E
N1…N7 i typ KO-072 są w poleceniu DX. Nowe albo doprecyzowane (zachowanie i test akceptacji w szkicach, `docs/tresci/szablony-robocze/krok-e.md`):
- **08-N7a / 08-N7b**: N7 z DU dotyczy sprawdzenia bluff-catcherem (a). Krok E potrzebuje też (b): river IP, rywal czeka, gracz bet/czekanie; zakres sprawdzenia rywala w szablonie jako lista klas rąk; w = gorsze ÷ (gorsze + lepsze) po usunięciu kart gracza i stołu, remisy pominięte; bet ⇔ w ≥ `value.threshold` + δ, czekanie ⇔ w ≤ `value.threshold` − δ, pas ±δ odrzucany (D-1050, D-1051).
- **08-N8**: akcja `raise` (check-raise) w punkcie obrony wobec c-betu (N2) i drugi punkt: rozmiar jako krotność c-betu (m ≥ `xr.mult.low` zgodne, m < `xr.mult.low` niedokładność).
- **08-N9**: punkt otwierającego na turnie po c-becie i sprawdzeniu: klasa turnu (nadkarta, parująca, niska, neutralna; neutralna odrzucana), filtr ręki (`pairKind`, `outs`), akcje `check` / `bet-small` / `bet-big`.
- **08-N10**: flop, rywal all-in, gracz z ręką gotową (najwyższa para lub lepsza), SPR wariantu z przedziału szablonu.
- **08-N11**: rozmiar na flopie w puli 3-betowanej IP: `bet-geo` (f z R-M9-006) wobec `bet-small` (1/3).
- **08-N12**: preflop wobec 3-betu: equity ręki gracza wobec górnych x% rąk (x jako dana szablonu) i cena sprawdzenia.

## Następny krok
Zadanie 2: pusty zakres (zgłoszone). Zadania 3–4: szkice SC-16…31 bez SC-19. Zadanie 5: ZAL-013. Zadanie 6: `pnpm run ci`.
