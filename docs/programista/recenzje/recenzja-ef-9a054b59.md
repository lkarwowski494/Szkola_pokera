# Recenzja niezależna EF: silnik N1–N7, KO-076 (zakres 539919af..9a054b59)
Sesja EI (08-programista, tryb audit/recenzja), 2026-11-11. HEAD gałęzi `sesja-ei-recenzja` = 9a054b59 (zgodny z poleceniem). Raportu autora nie czytałem; `docs/decyzje/EF.md` i `docs/programista/stan-dx.md` tylko jako opis zamiaru. Kod produkcyjny nietknięty; sondy i mutanty w osobnym worktree poza repo, kopie w `docs/programista/recenzje/ei-9a054b59/`.

## Werdykt: PO POPRAWKACH
Rachunek nowych punktów (ceny, progi, sumy grup, rozmiar iso) jest poprawny i zgodny z moimi wyroczniami; CI kod 0; odciski starych szablonów bez różnic, więc `GENERATOR_WERSJA` 3 jest uzasadniona. Jedno znalezisko WYS: punkt `turn-bet` w ok. 18% wariantów uczy „duży zakład odbiera drawowi cenę” w rozdaniach, w których draw rywala nie ma żadnego żywego outu, a w 3,5% „silna ręka” gracza to tylko draw. Dziś nieosiągalne dla użytkownika (ekran zablokowany, brak szablonów treści), ale musi być poprawione przed włączeniem szablonu turn-bet.

| ID | Waga | Tytuł |
|---|---|---|
| EI-001 | WYS | turn-bet: martwy draw rywala (18%) i „silna” ręka będąca drawem (3,5%) przeczą uzasadnieniu R-M7-006 |
| EI-002 | ŚR | turn-bet: testy nie zabijają 4 mutantów (strona dużego zakładu, klasa silna, filtr rywala) |
| EI-003 | NIS | defend: zaokrąglenie zakładu przenosi ułamek z listy w lukę (0,4; 0,7), bramka sprawdza tylko surowe ułamki |
| EI-004 | NIS | iso-size: generator zakłada oopExtra dla BB bez zapisu, kto limpuje; ocena liczy oop względem wszystkich limperów |
| EI-005 | NIS | list-hand: kontrola duplikatu klas w generatorze bez testu (mutant przeżył) |
| EI-006 | NIS | defend: bramka nie sprawdza, że gracz to BB, a spot to obrona BB (zamiar D-1144) |

## Dowody uruchomień
- `pnpm install --frozen-lockfile` kod 0; `pnpm run ci` na 9a054b59 **kod 0**: `docs/programista/dowody/ei-ci-9a054b59.txt` (poker-core 230/230, content-build 559 + 1 expected fail, domena 347 + 1 expected fail, skrypty 201/201, kontrole 35/35).
- Mutanty (24, każdy osobno, testy autora): 18 zabitych, 6 przeżyło: `ei-9a054b59/mutanty-wynik.txt`, runner `ei-9a054b59/mutanty.mjs.txt`.
- Czerwone przed kodem (testy commitu na kodzie rodzica): N5 `375c0b7f` czerwony z asercji (`expected null to be 'R-OOP-X'`) — właściwy powód; KO-076 `4adf0453` czerwony z `ZodError` (pole nieznane schematowi), N6 `82eb8738` z `TypeError`/dyskryminatora schematu — powód strukturalny, typowy dla nowego rodzaju; zastępczo mutanty: `ei-9a054b59/czerwone-przed-kodem.txt`.
- Test odtwarzający EI-001: `ei-9a054b59/ei-turn-bet-zywe-outy.test.ts.txt` (kopiować do `packages/poker-core/test/` jako `.ts`); na 9a054b59 kod 1, 2 testy czerwone: `ei-9a054b59/repro-001-wynik.txt`.
- Sondy (rozkład klas w turn-bet, siła klas KO-076 vs Monte Carlo): `ei-9a054b59/sondy-wynik.txt`.

## Wyrocznie niezależne (policzone przeze mnie)
| Wektor | Rachunek własny | Kod | Wynik |
|---|---|---|---|
| turn-bet, pula 16, 1/4 i 3/4 | zakłady 4 i 12; cena 4/24 = 0,1667, 12/40 = 0,300; kolor 9/46 = 0,1957 → mały daje cenę, duży nie | `scenario-gen.ts:692` | zgodne |
| turn-bet, pula 10 | round(2,5) = 3 → 3/16 = 0,1875 < 0,1957 (margines 0,008 < 0,02 → odrzut); 8/26 = 0,308 | j.w. | zgodne (wariant odrzucany przez margines) |
| river-catch | EV call = s·(P+B) − (1−s)·B > 0 ⇔ s > B/(P+2B); mutant P+B zabity | `requiredEquity`, `math.ts:7` | zgodne |
| iso-size | BTN, 2 limperów: 3 + 2·1 = 5 bb; SB, 3 limperów: 3 + 3 + 1 = 7 bb (`content/numbers.yaml:146`, `:147`, `:150`) | `scenario-gen.ts:744` | zgodne |
| N1 grupa play | 0,5 + 0,48 = 0,98 ≥ 0,97 → `play` zgodne; pas 0,02 < mixedMin → niedokładność | `groupedSpot` | zgodne; mutant max zamiast sumy zabity |
| KO-076 siła klas | equity wobec losowej z macierzy vs Monte Carlo 40 000: AA 0,852/0,850, T9s 0,540/0,535, 72o 0,346/0,354 | `silaKlas` | zgodne w 1 pp |
| EE ŚR-009 | J♠9♠ na 7♠2♦5♠: nadkarty J, 9 > 7 tak; turn Q♥: brak | `ko073-nadkarty.test.ts` | zgodne |

## Odciski i GENERATOR_WERSJA
`tools/content-build/test/generator-odciski.json` bez zmian w zakresie (`git diff --stat 539919af..9a054b59` pusty dla pliku), a test `generator-odciski.test.ts` przechodzi w CI. Szablony `content/pl/scenarios` obejmują `cbet-case` (2) i `draw-call` (7), więc refaktor `handFromRange` (ta sama kolejność wywołań `rng`) jest sprawdzony na prawdziwych szablonach. Nowe rodzaje to nowe gałęzie `kind`; `eligibleClasses` bez `equityMarginMin` działa jak dotąd. Wersja 3 bez podniesienia: uzasadniona. Ograniczenie: `range-spot`, `size-spot`, `icm-call` nie mają szablonów w `content/pl` na tej gałęzi, więc ich odciski chroni tylko niezmieniony kod.

## Ścieżki wrażliwe
`packages/domena/` bez zmian w zakresie. `tools/content-build/`: `build.ts` dołącza macierz equity do bazy treści także dla `equityMarginMin` (`potrzebujeMacierzyEquity`); bez takich szablonów hash treści bez zmian (content:check zielony). Bramka ekranu odrzuca wszystkie nowe rodzaje, iso-size i `play` (mutanty M23, M24 zabite). Identyfikatory w powtórkach nietknięte.

## Znaleziska

### EI-001 · WYS · turn-bet uczy „odbierz drawowi cenę”, gdy draw rywala jest martwy albo ręka gracza sama jest drawem
- Dowód: `packages/poker-core/src/scenario-gen.ts:682` wymaga tylko klasy `very-strong`/`strong` i karty gracza w parze; `:683` bierze draw rywala z jego perspektywy (`hitNextCard`), bez sprawdzenia, czy trafienie wygrywa z ręką gracza. Sonda na fixture EF (ziarna 1–3000, draws flush): 507 wariantów (16,9%) z **zerem żywych outów** rywala: full/kareta gracza (225), wyższa karta koloru w ręce gracza przy parze/dwóch parach (np. ziarno 15: A♥J♦ vs 8♠6♦ na Q♦2♦4♥A♦ — każdy karo daje graczowi wyższy kolor). Z draws flush+oesd: 105/3000 (3,5%) „silnych” rąk to druga/niska para albo underpair z 12–15 outami (np. ziarno 9: 5♦6♣ na A♦3♣4♦6♦), bo `classifyHolding` daje `strong` za combo draw.
- Skutek: reguła R-M7-006 (`content/pl/rules.yaml:607`) mówi o silnej, wrażliwej ręce i uzasadnia duży zakład tym, że mały „daje drawowi dobrą cenę”. Gracz widzi własne karty, więc w tych wariantach wie, że draw jest martwy; jedyna poprawna odpowiedź „bet-big” z tym uzasadnieniem to błędne twierdzenie merytoryczne. Realność: realny po włączeniu szablonu; dziś brzegowy (ekran blokuje, brak szablonów turn-bet w treści).
- Test odtwarzający: `ei-9a054b59/ei-turn-bet-zywe-outy.test.ts.txt` — czerwony na 9a054b59 (90/500 wariantów z martwym drawem; 105/3000 „silnych” rąk-drawów).
- Opcje: (a) filtr w generatorze: co najmniej jeden żywy out rywala (ewaluator 7 kart, karty gracza znane) i `pairKind` ∈ {overpair, top} albo układ ≥ dwie pary z kartą gracza, bez klasy „strong” z samych outów — mały diff, test odtwarzający zielony; (b) mocniej: equity rywala z żywych outów > cena małego zakładu (przesłanka reguły prawdziwa przy pełnej informacji) — odrzuca dodatkowo ok. 1/3 wariantów z „brudnymi” outami, wymaga decyzji roli 06, bo reguła liczy 9/46 z perspektywy rywala. **Rekomendacja: (a) teraz, (b) jako pytanie do 06.**

### EI-002 · ŚR · testy turn-bet nie sprawdzają strony dużego zakładu, klasy ręki gracza ani filtra rywala
- Dowód: mutanty M03 (bez `hit < reqBig`), M04 (bez marginesu od dużego progu), M06 (bez wymogu klasy silnej), M07 (bez odrzutu rywala poprawiającego stół) przeżyły `ef-turn-bet.test.ts`. Przyczyna: fixture ma `big` 0,75, więc cena dużego zakładu to zawsze 0,30, daleko od 9/46; asercja `packages/poker-core/test/ef-turn-bet.test.ts:32` nigdy nie jest blisko granicy; `:36` sprawdza tylko kartę gracza w parze, nie klasę.
- Opcje: (a) dodać przypadek z `big` blisko progu (np. pula 40, `big` 0,36 → zakład 14, cena 14/68 = 0,206, margines 0,010 < 0,02 → wariant musi być odrzucony) oraz asercje klasy gracza i braku poprawy stołu u rywala; (b) test jednostkowy wydzielonej funkcji decyzji turn-bet z wektorami granicznymi. Rekomendacja: (a), razem z poprawką EI-001.

### EI-003 · NIS · defend: zaokrąglenie przenosi ułamek w lukę źródła
- Dowód: `scenario-gen.ts:701` zaokrągla zakład, a bramka `tools/content-build/src/scenariusze.ts:134` sprawdza surowe ułamki. Wektor: pula 3, ułamek 0,75 → zakład 2 → 0,667 ∈ (0,4; 0,7) → `defendVsCbet` null → cichy odrzut. Całkowity brak wariantów łapie próg pojemności; częściowy tylko zawęża losowanie. Realność: brzegowy.
- Opcje: (a) bramka liczy ułamek po zaokrągleniu dla każdej pary pula × ułamek; (b) zostawić i opisać w komentarzu. Rekomendacja: (a).

### EI-004 · NIS · iso-size: BB zawsze z dopłatą OOP, ale wariant nie zapisuje, kto limpuje
- Dowód: generator `scenario-gen.ts:744` daje oopExtra dla SB i BB; ocena `packages/poker-core/src/grading.ts:380` — tylko gdy gracz mówi przed wszystkimi limperami. Gdy limpuje SB, BB nie jest przed nim i ocena da 1 bb mniej. Bramka (`scenariusze.ts:206`) liczy dla BB miejsca bez blindów, więc dziś spójne, ale założenie „SB nie limpuje” nie jest zapisane w wariancie ani w teście. Realność: teoretyczny do czasu widoku limperów (04).
- Opcje: (a) test: wariant BB iso-size + rozdanie z limpującym SB w silniku → oczekiwany rozmiar bez dopłaty, i zapis miejsc limperów w wariancie; (b) notatka w zadaniu dla 04/ekranu. Rekomendacja: (b) teraz, (a) przy widoku.

### EI-005 · NIS · list-hand: duplikat klasy w generatorze bez testu
- Dowód: mutant M17 (`scenario-gen.ts:591` wyłączony) przeżył `ef-list-hand.test.ts`; bramka (M18) jest testowana. Realność: teoretyczny (bramka blokuje wcześniej). Opcje: test `generateVariant` z duplikatem → `TemplateError`; albo usunąć kontrolę z generatora i zostawić bramkę. Rekomendacja: test.

### EI-006 · NIS · defend: brak kontroli pozycji BB i rodzaju spotu
- Dowód: `scenariusze.ts:132` sprawdza tylko istnienie spotu; D-1144 opisuje gracza jako BB broniącego otwarcia. Szablon z `positions.hero: CO` i spotem `rfi.co` przejdzie bramkę. Realność: brzegowy (błąd autora treści). Opcje: bramka wymaga `hero: BB` i spotu `vs-open.bb-*`; albo opis w `docs/tresci`. Rekomendacja: bramka.

## Do sprawdzenia (pewność ≤ 80%)
- KO-076 (D-1141): miara „equity wobec losowej ręki” jest nazwanym uproszczeniem; zakresy otwarcia nie są monotoniczne w tej mierze (np. małe pary i suited connectors), więc filtr 2 pp może odrzucać ręce daleko od realnej granicy albo zostawiać bliskie. Wyrocznia testu `ef-margines-ko076.test.ts` powtarza tę samą definicję, więc sprawdza wykonanie, nie trafność. Do roli 06 razem z dopisaniem `equityMarginMin` do SC-06/32/33. Mutant M13 (`< 0,5` zamiast `≤`) przeżył — na danych to mutant równoważny (brak częstości dokładnie 0,5), nie znalezisko.
- Pamięć `equityMargin` (`scenario-gen.ts:493`) jest kluczowana spotem i `expected|hc`, bez macierzy; inna macierz dla tego samego obiektu spotu dałaby stary wynik. Teoretyczne (jedna macierz na kontekst).

## Co działa dobrze
- N5: zmiana jednej linii w ocenie, stare reguły bez parametru zachowują się jak dotąd; test czerwony z asercji przed kodem; bramka pozycji ip/oop dla cbet-case (mutanty M01, M02 zabite).
- River-catch, defend, iso-size, grupa play: rachunek i bramki zabijają mutanty (M08–M12, M14–M16, M18–M24).
- Wszystkie nowe rodzaje zablokowane na ekranie głośnym błędem, nie cichym pominięciem.

## Decyzje
Brak decyzji z puli D-1180…D-1184 (recenzja nie wymagała rozstrzygnięć). Wagi znalezisk to ocena recenzenta według progu z CLAUDE.md („błędne twierdzenia merytoryczne” = blokujące wydanie po włączeniu funkcji).

## Proponowane polecenie naprawy
EF/następca 08 w trybie fix: EI-001 (opcja a) + EI-002 w jednym commicie z testem odtwarzającym przeniesionym do `packages/poker-core/test/`; EI-003, EI-005, EI-006 jako małe bramki/testy; EI-004 jako notatka w zadaniu widoku dla 04; pytanie do 06: przesłanka R-M7-006 przy „brudnych” outach (EI-001 b) i trafność miary KO-076.
