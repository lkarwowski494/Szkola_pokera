# Rola 08 (fix) · M2-koordynator-napraw-006 · RangeGrid: etykieta, podkładka, kropka, rozmiar
Data 2026-11-17 · gałąź `claude/sesja-is-naprawy-p1` · zgoda właściciela KO-132 · specyfikacja: `audit/M1-2026-11-17/role/04-studio-projektowe/fix-2026-11-17/wynik.md` sekcja 2 · D-2020 (`docs/decyzje/IS.md`).

## E0
Linux, Node 22.23.4, repo publiczne, czysty stan. Klasyfikacja: D (defekt dostępności), kierunek rozstrzygnięty przez właściciela (KO-132). Stan wyjściowy testów RangeGrid, znak-kolor i theme: 94/94 zielone (`dowody/baza-przed.txt`). Ścieżki wrażliwe z CLAUDE.md nie dotknięte (przegląd w świeżym kontekście niewymagany). Wszystkie wywołania `RangeGrid`: `apps/mobile/src/components/Blocks.tsx:128` (sygnatura bez zmian).

## Commity
| SHA | zakres | ID |
|---|---|---|
| 983b919e | testy akceptacyjne 2.5 + zaślepka `wymiaryEtykietySiatki` (czerwone) | M2-koordynator-napraw-006 |
| ee18e39e | zmiana zachowania: `RangeGrid.tsx`, `wymiaryEtykietySiatki` w `apps/mobile/src/theme/skalowanie.ts` | M2-koordynator-napraw-006 |
| a66f1446 | zaostrzenie testu geometrii (mutant M6) | M2-koordynator-napraw-006 |

## Test przed i po
- Przed (kod c946948d + zaślepka): 50 niezaliczonych z 136, powody właściwe: asercja o `onFelt` bez podkładki dla f = 1 (jest rodzic z tłem `surface`), pole f = 0,85 ma `onFelt` zamiast `ink`, brak `testID` siatki i kropki (kropka to tekst), `fontSize` 8 zamiast 8,25/10,17/10,4 (zaślepka), obecna stała `POKRYCIE_ETYKIETY_NA_SUKNIE` w kodzie. Dowód: `audit/M1-2026-11-17/role/08-programista/fix-2026-11-17-d/dowody/czerwone-przed-kodem.txt`. Żaden nie padł z powodu błędu importu.
- Po: 142/142 w zestawach RangeGrid, znak-kolor, teksty-08 i theme (`dowody/zielone-po-kodzie.txt`); `env -u NODE_PATH pnpm --filter @szkola/mobile test`: 179 zestawów, 1883 testów, kod 0 (`dowody/test-mobile.txt`); `env -u NODE_PATH pnpm typecheck`: kod 0 (`dowody/typecheck.txt`). Lint: brak pliku `eslint.config.*` w `apps/mobile` (komenda `eslint` kończy się kodem 2 bez uruchomienia reguł), więc nie sprawdzony; `pnpm run ci` zostaje koordynatorowi.

## Mapowanie testów akceptacyjnych 2.5
1. `apps/mobile/src/theme/__tests__/siatka-etykieta-08.test.ts` (tabela 2.3 ±0,01 i niezmienniki pola 22,15–31,4 × skala 0,8–3,12).
2. `apps/mobile/src/components/__tests__/RangeGrid-etykieta-kontrast-08.test.tsx`, blok „KO-132” (4 motywy; f = 1 → `onFelt` bez podkładki; f ∈ {0; 0,001; 0,15; 0,5; 0,85; 0,999} → `ink` na `surface`; kontrast do tła, na którym leży ≥ 4,5; podkładka 1 pt, bez promienia).
3. `apps/mobile/src/components/__tests__/RangeGrid-geometria-08.test.tsx` (`allowFontScaling` false, `fontSize`/`lineHeight` z funkcji dla layout 288/358/398 i skali 1 oraz 3,12; pole przed pomiarem; reakcja na zmianę skali).
4. Kropka: ten sam blok „KO-132” (View 3 × 3, `top`/`right` 1, `ink`, ≥ 3:1) + `RangeGrid-geometria-08` (ukryta przed czytnikiem).
5. Strażnik grup: `RangeGrid-etykieta-kontrast-08`, „każdy spot pl ma jedną grupę albo kropka `ink` ≥ 3:1 do paska grupy g ≥ 2” (4 motywy); dziś zielony (34/34 spotów z jedną grupą).
6. Pary: `apps/mobile/src/theme/__tests__/kontrast-pary-08.test.ts` (etykieta f = 1 ≥ 4,5; etykieta na podkładce ≥ 4,5; kropka ≥ 3; 4 motywy; brak stałej progu w kodzie).

## Zmienione asercje (zmiana specyfikacji KO-132 / D-2020, nie osłabienie)
- `RangeGrid-etykieta-kontrast-08.test.tsx`: „pole puste, pełne (1 i 0,85): ≥ 4,5 do felt1” → pole f = 1 `onFelt` bez podkładki (0,85 przestaje być polem pełnym: próg koloru 0,85 → 1). Powód: reguła 2.1.
- Tamże: „próg 0,84 → ink, 0,85 → onFelt” → „0,999 → ink na podkładce, 1 → onFelt bez podkładki”. Powód: 2.1.
- Tamże: „pola pośrednie ≥ 3:1 do obu teł” (gwarancja słabsza) → ink na podkładce ≥ 4,5 do tła, na którym leży (silniejsza). Powód: 2.2.
- Tamże: „znak „•” ≥ 3:1” (szukany jako tekst) → kropka jako View 3 × 3 z `testID`; ta sama para ≥ 3:1. Powód: 2.4.
- Tamże, treść pl: „pola puste i pełne (próg 0,15/0,85)” → każde pole: `onFelt` tylko dla f ≥ 1, kontrast do tła, na którym leży ≥ 4,5; test „każdy spot ma jedną grupę” → strażnik 2.5 pkt 5 (łagodniejszy: dopuszcza grupy g ≥ 2 z kropką ≥ 3:1).
- `RangeGrid-uncertain.test.tsx`: wyszukiwanie `getAllByText('•')` → `getAllByTestId(/^kropka-/, { includeHiddenElements: true })` (kropka jest ukryta przed czytnikiem, więc RNTL pomija ją domyślnie); trzeci test szuka pola przez rodzica kropki. Zachowanie sprawdzane to samo: kropka tylko dla klas z `uncertain` i legenda tylko przy niepustym `uncertain` (spoty pl: liczba kropek = liczba klas niepewnych, 34 siatki).
- `znak-kolor-etykiety-08.test.tsx`: kolor znaku RangeGrid czytany z `backgroundColor` kropki (View), etykieta szukana także w podkładce; asercja „znak = etykieta (ink)” bez zmian.
- `kontrast-pary-08.test.ts`: dopisane testy (nic nie usunięto).

## Mutanty (kopia `git worktree`, usunięta; `dowody/mutanty.txt`)
| mutant | wynik |
|---|---|
| M1 próg z powrotem 0,85 | padł (12 testów) |
| M2 bez podkładki | padł (10) |
| M3 `allowFontScaling` domyślne | padł (3) |
| M4 kropka jako tekst 8 pt bez limitu | padł (6) |
| M5 skala tekstu ignorowana | padł (5) |
| M6 pole z okna zamiast z `onLayout` | przeżył na pierwszej wersji testu; po zaostrzeniu (okno 390, layout 288/358/398) pada (1) |

## Kontrast (WCAG 2.x, `kontrast.ts` testów; `dowody/kontrasty.txt`; sukno = `felt1` 0,85 na `surface`)
| para | light | lightHigh | dark | darkHigh |
|---|---|---|---|---|
| etykieta f = 1: `onFelt` na sukni (≥ 4,5) | 4,55 | 5,49 | 8,97 | 10,47 |
| etykieta na podkładce: `ink` na `surface` (≥ 4,5) | 18,17 | 18,17 | 13,48 | 13,48 |
| kropka: `ink` na sukni (≥ 3) | 3,92 | 3,26 | 7,87 | 9,19 |
| kropka: `ink` na `surface` (≥ 3) | 18,17 | 18,17 | 13,48 | 13,48 |
Zgodne z sekcją 3 wyniku roli 04.

## Powtórne wyszukanie wystąpień
`grep -rn "POKRYCIE_ETYKIETY\|•" apps/mobile/src` poza testami: znak „•” zostaje w `PaintGrid` (poza zakresem tej naprawy, kolor sprawdza `znak-kolor-etykiety-08`); `POKRYCIE_ETYKIETY_NA_SUKNIE`: 0 trafień w kodzie, strażnik w `kontrast-pary-08`. Nowych znalezisk nie ma.

## Otwarte
- Pomiar SF Pro na telefonie (`szerokoscEm` 2,2 to przybliżenie z Inter) i zrzut przy AX5: lista poniżej.
- 04-studio-projektowe-011 (wykres w ciemnych motywach) i tokeny F27b: poza zakresem, decyzja koordynatora lub właściciela.
- Lint w `apps/mobile` nie ma konfiguracji (`eslint.config.*`): do sprawdzenia przez koordynatora (może być znana).
- Zrzut „przed/po” z aplikacji niemożliwy w tym środowisku (bez symulatora); makiety roli 04: `audit/M1-2026-11-17/role/04-studio-projektowe/fix-2026-11-17/dowody/`.

## Lista kontrolna telefonu (T-SIATKA, build TestFlight)
Lekcja z siatką „Button, CO otworzył na 2,5bb”, jasny motyw: (1) tekst domyślny: etykiety całe, pola częściowe (A9s, T9s) mają białą podkładkę, pasek widać nad i pod nią; (2) Ustawienia, Dostępność, Większy tekst, AX5: etykiety całe (bez „…”), nie wychodzą poza pole, nie dotykają kropek; (3) „Zwiększ kontrast” i ciemny motyw: to samo; (4) „Pogrubiony tekst”: „AQo”, „KQo” całe. Zrzut przy AX5 do `docs/design/dowody/`. Negatyw w (2) lub (4): rola 04 zwiększa `szerokoscEm`.
