# Reaudit: Treści i wiedza domenowa (06-tresci), poprawki DG 06-tresci-001 i 06-tresci-003, Szkoła Pokera, 2026-11-11
Commit: a13d407bd93183ed575bca768de4549edada4eb1 (= `origin/sesja-dg-poprawki`, gałąź `sesja-di-reaudit`) · zakres `git diff 431cb885..a13d407b` · Tryb: reaudit, pętla nr 1 dla znalezisk z `docs/tresci/recenzje/recenzja-cw-0ef7785.md` · Sesja DI, polecenie koordynatora `docs/koordynacja/polecenia/DI.md` @ 6888b54 · Środowisko: Linux 6.18, Node 22, pnpm, `pnpm install --frozen-lockfile` kod 0, `node:sqlite` do odczytu baz treści; Playwright i symulator iOS niepotrzebne (zmiana to słowo w tekście), push na gałąź roboczą przez git.

Kolejność pracy: rachunek z kart, test przed i po poprawce, diff i odczyt baz zrobiłem sam. `docs/decyzje/DG.md` przeczytałem dopiero po wyrobieniu wniosku. Potwierdził jedną rzecz, którą znalazłem sam: przekłady nie zostały poprawione (D-919: przekazane roli 09).

## Podsumowanie
**Werdykt: 06-tresci-003 naprawione. 06-tresci-001 naprawione z uwagą: tylko w pl. W 34 z 35 baz treści błąd WYSOKI nadal jest w produkcie, w tym w en (rynek główny US), i blokuje wydanie.**

Nowe brzmienie „najwyżej {{n:pair.outs.per-rank}}” sprawdziłem rachunkiem z kart, wyrocznią pisaną od zera. Na 2000 ziaren na poziom we wszystkich wariantach sc-01, sc-02, sc-03 i sc-19 karta wyższa od stołu daje 2 albo 3 nowe outy, nigdy więcej. Wartość 2 występuje tylko przy drawie do koloru (sc-01, sc-19). Zdanie w pl jest więc prawdziwe.

Para zdań z „Masz N outów” nie daje fałszywego wniosku. Liczba outów drawa z kart równa się liczbie w zdaniu w 100% punktów: 9, 8 i 4.

Test odtwarzający jest teraz zwykłym `it`. Sam sprawdziłem, że jest czerwony na treści pl z 431cb885 (2 przypadki, sc-01 i sc-19, z właściwego powodu: „nowych outów 2, zdanie mówi 3”). Na HEAD jest zielony 5/5. Zabija też mutację, w której z jednego wyjaśnienia usunąłem „najwyżej”.

Diff poza wskazanymi miejscami jest czysty. W treści jest dokładnie 14 wstawień słowa „najwyżej”. W 35 bazach zmieniła się tylko `meta.wersja`, a w pl dodatkowo 4 wiersze scenariuszy. Pozostałe zmiany to rejestr, test, dowody i DG.md.

`pnpm run ci` kod 0 (`docs/tresci/dowody/di-ci-a13d407b.txt`).

Nowe znalezisko: 06-tresci-004 (ŚREDNIE). Trwała kontrola 06-tresci-001 czyta tylko pl, więc nie sprawdzi poprawki przekładów.

| ID | Wynik | Dowód |
|---|---|---|
| 06-tresci-001 | naprawione z uwagą: zweryfikowane w pl (14 wyjaśnień, baza pl); **nadal otwarte** w 11 przekładach i 23 bazach z tekstem en, łącznie 34 z 35 baz (WYSOKIE, blokuje wydanie; zadanie roli 09 według D-919) | dowody/di-a13d407b-sonda-nadkarty.txt, dowody/di-a13d407b-test-odtwarzajacy.txt, dowody/di-a13d407b-przeklady.txt |
| 06-tresci-002 | poza zakresem (decyzja produktowa), bez zmian, otwarte | dowody/di-a13d407b-diff.txt (zdanie nadal stałe) |
| 06-tresci-003 | zweryfikowane | `docs/tresci/rejestr/m0-m4.json:383`, `pnpm tresci:rejestr` w CI kod 0 |
| 06-tresci-004 | nowe, ŚREDNIE (P2): test odtwarzający 06-tresci-001 sprawdza tylko pl, a wyrażenie górnej granicy zna tylko polskie słowa | `tools/content-build/test/recenzja-cw-odtworzenie.test.ts:18`, `tools/content-build/test/recenzja-cw-odtworzenie.test.ts:21` |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 1 (06-tresci-001, nadal otwarte w przekładach), ŚREDNIE 2 (06-tresci-002 bez zmian, 06-tresci-004 nowe), NISKIE 0 (06-tresci-003 zamknięte).

## Weryfikacja twierdzeń
Zakres: całość zmian (14 wyjaśnień pl, R-M2-005, R-M7-007, R-M7-008), przekłady na obecność poprawki (12 języków × 4 szablony, 35 baz). Wariantów nie próbkowałem ręcznie, tylko sondą: 2000 ziaren na każdy poziom każdego szablonu, wszystkie punkty ze zdaniem NIS-003. Hierarchia: z CLAUDE.md (ADR-24, szczebel 1 to rachunek). Skrypt mechaniczny: `pnpm tresci:rejestr` w `pnpm run ci`, „0 błędów, 0 uwag”, kod 0.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| NIS-003 pl | `content/pl/scenarios/sc-01.yaml:24` i 13 dalszych (sc-01:24,26,35,37; sc-02:23,25,34,36; sc-03:24,26; sc-19:23,25,34,36) | każda karta wyższa od stołu daje jeszcze najwyżej 3 niepewne outy na parę | rachunek z kart, wyrocznia DI od zera (dowody/di-a13d407b-sonda-nadkarty.txt) | sc-01: nowe=2 w 515, nowe=3 w 2005 punktach nadkart; sc-19: 127 / 484; sc-02: 3 w 454; sc-03: 3 w 762; nigdy > 3; par kieszonkowych 0 | POPARTE | zdanie Masz N outów (sc-01: 9, sc-02: 8; sc-03: masz 4 outy) + „najwyżej 3” daje łącznie najwyżej 12 / 11 / 7; z kart outy drawa = 9 / 8 / 4 w 100% punktów, więc para nie daje fałszywej sumy | — | — |
| NIS-003, „nie zmienia odpowiedzi” | jak wyżej | odpowiedź z górną granicą outów = odpowiedź wariantu | test autora `cw-nadkarty` w CI (górna granica +3 na rangę), monotoniczność w liczbie outów | CI kod 0 (`docs/tresci/dowody/di-ci-a13d407b.txt`) | POPARTE (bez zmian od recenzji DD) | — | — | — |
| NIS-003 przekłady | `content/en/scenarios/sc-01.yaml:24` i 43 dalsze pliki (11 języków × 4 szablony) | jak pl | rachunek jak wyżej | w en zdanie mówi adds 3 uncertain outs, a z kart bywa 2 (sc-01, sc-19) | CZĘŚCIOWO (bez zmian od 431cb885; 34 bazy: dowody/di-a13d407b-przeklady.txt) | ze zdaniem You have 9 outs daje 12 zamiast 11, jak w recenzji DD | odpowiednik „najwyżej” w 11 językach (rola 09, D-919) | 06-tresci-001 |
| R-M2-005 `uproszczenie` | `docs/tresci/rejestr/m0-m4.json:383` | punkty flopu sc-01, sc-02, sc-19; najwyżej 3, a 2 przy nakładaniu z kolorem drawa; lekcja M2 dolicza asy jawnie; egzamin M2 bez NIS-003 | treść pl: reguły punktów (R-M2-005 to flop sc-01, sc-02, sc-19; sc-03 ma tylko turn z R-M7-007); `grep -rln pair.outs.per-rank content/pl` (scenariusze, lekcje m2-l2 i m8-l3, egzamin m8, rules.yaml; bez egzaminu M2); `content/pl/lessons/m2-l2-pot-odds.md:25` | A♥5♥ na K♥8♥3♣J♣: trzy pozostałe asy są w innych kolorach, więc 9 + 3 = 12, 12/46 = 26,1% | POPARTE (zakres i wyjątek 2 zgodne z sondą) | — | — | — |
| R-M7-007, R-M7-008 `uproszczenie` | `docs/tresci/rejestr/m5-m8.json:1294`, `docs/tresci/rejestr/m5-m8.json:1319` | jak NIS-003 z wyjątkiem 2 | rachunek jak wyżej | jak wyżej | POPARTE | — | — | — |

## Linia bazowa i założenia
Wymiary pokrycia:
- Kategorie twierdzeń: liczba outów (NIS-003) i zapis uproszczenia w rejestrze. Sprawdzone.
- Progi krytyczne: sprawdzone, brak (treść niekrytyczna).
- Brakujące ostrzeżenia: sprawdzone, bez nowych.
- Jednostki i warianty regionalne: **przekłady bez poprawki** (06-tresci-001).
- Aktualność: brak faktów zmiennych.
- Trudna pamięć: nie dotyczy.
- Pary zdań: sprawdzone rachunkiem (tabela wyżej).
- Jedno źródło: szczebel 1 (rachunek), wystarcza.

Soczewki:
- Laik z „najwyżej 3” nie doda już na pewno 3.
- Ekspert: podwójnego liczenia outów nie ma w pl.
- Osoba z innego kraju: w 34 bazach dalej czyta „3”, a to główna luka.

Próbka regresji, trzy pozycje listy kontrolnej spoza zmienionych plików:
1. TRE-06, `content/numbers.yaml`: liczby outów z kart równają się kluczom. `outs.flush` = 9, `outs.oesd` = 8, `outs.gutshot` = 4 w 100% punktów sondy, a `pair.outs.per-rank` = 3 (`content/numbers.yaml:222`). Wynik ok.
2. TRE-02, lekcja M2 `content/pl/lessons/m2-l2-pot-odds.md:25`: A♥5♥ na K♥8♥3♣J♣ daje 12 outów bez nakładania, 12/46 = 26,1% wobec wymaganych 33,3% (zakład wielkości puli: 100/300). Wynik ok.
3. TRE-13, bazy nieobjęte zmianą treści: w 34 bazach wiersze tabel identyczne z 431cb885 poza `meta.wersja` (dowody/di-a13d407b-diff.txt). Treść w produkcie równa się YAML, także stare zdanie w przekładach. Wynik ok.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| 14 wyjaśnień pl, rachunek z kart | tak | dowody/di-a13d407b-sonda-nadkarty.txt (wyrocznia DI z kodem) |
| Test odtwarzający przed i po poprawce, mutacja | tak | dowody/di-a13d407b-test-odtwarzajacy.txt |
| Przekłady YAML i 35 baz | tak | dowody/di-a13d407b-przeklady.txt |
| Diff 431cb885..a13d407b (treść słowami, bazy wierszami, `tresc.generated.ts`) | tak | dowody/di-a13d407b-diff.txt |
| Rejestr R-M2-005, R-M7-007, R-M7-008 | tak | odczyt + `pnpm tresci:rejestr` w CI |
| Pełne CI | tak | `docs/tresci/dowody/di-ci-a13d407b.txt` (kod 0) |
| Ekran na telefonie | nie | zmiana jednego słowa w tekście, bez nowego ekranu; lista kontrolna dla właściciela niepotrzebna |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/reaudit-dg-a13d407b.md . docs/tresci/recenzje --rola 06-tresci` (kopia skryptu w scratchpadzie sesji): wynik na końcu raportu, sekcja „Wynik kontroli raportu”.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy | ok: zmienione zdania mają `rule` R-M2-005, R-M7-007, R-M7-008 |
| TRE-02 | dotyczy | ok w pl; przekłady 06-tresci-001 |
| TRE-03 | dotyczy | ok: zakres R-M2-005 zgodny z regułami punktów |
| TRE-04 | dotyczy | ok: szczebel 1 |
| TRE-05 | nie dotyczy | jedno źródło (rachunek), bez sprzeczności |
| TRE-06 | dotyczy | 06-tresci-001 w przekładach; próbka regresji `numbers.yaml` ok |
| TRE-07 | dotyczy | ok: 06-tresci-003 zamknięte, uproszczenie nazwane i zgodne z kierunkiem |
| TRE-08 | dotyczy | ok w pl (para zdań); przekłady 06-tresci-001 |
| TRE-09 | nie dotyczy | brak faktów zmiennych |
| TRE-10 | nie dotyczy | treść niekrytyczna |
| TRE-11 | nie dotyczy | brak trudnej pamięci |
| TRE-12 | nie dotyczy | brak treści zależnej od lokalizacji |
| TRE-13 | dotyczy | ok: baza pl ma „najwyżej”, 34 bazy bez zmian treści (zgodne z YAML) |
| TRE-14 | dotyczy | ok: brak cudzych tekstów w diffie |

## Znaleziska (szczegóły)

### 06-tresci-001 · NIS-003 podaje „3 outy” na kartę wyższą od stołu tam, gdzie są 2 (stan po DG)
- Pozycja listy kontrolnej: TRE-06 (także TRE-08)
- Poziom: P1 (WYSOKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: pl poprawione, `content/pl/scenarios/sc-01.yaml:24` „daje jeszcze najwyżej {{n:pair.outs.per-rank}} niepewne outy”. Sonda DI: nowe outy ∈ {2, 3}, nigdy > 3. Test czerwony przed poprawką, zielony po niej i zabija mutację (dowody/di-a13d407b-test-odtwarzajacy.txt). Przekłady bez zmian: `content/en/scenarios/sc-01.yaml:24` mówi „adds {{n:pair.outs.per-rank}} uncertain outs”. W bazach treści 34 z 35 ma 4 szablony ze zdaniem bez górnej granicy, a tylko baza pl ma „najwyżej” (dowody/di-a13d407b-przeklady.txt).
- Mechanizm: polecenie DG obejmowało tylko pl, a przekłady przekazano roli 09 (D-919). `grep -c najwyżej content/{en,de,…}/scenarios/sc-0[123].yaml` → 0.
- Powraca: nie; trwała kontrola pokrywa tylko pl (06-tresci-004).
- Wzorzec lub źródło: rachunek (szczebel 1), jak w recenzji DD.
- Kroki w aplikacji: aplikacja w języku innym niż pl → Scenariusze → sc-01 albo sc-19 → wariant z trzema kartami koloru na stole i nadkartą w innym kolorze → wyjaśnienie.
- Opcje: (a) rola 09 dodaje odpowiednik „najwyżej” w 44 plikach (11 języków), a 23 bazy dostają go przez en. Sama zmiana tekstu, minimalna i zgodna z D-917. (b) wydanie tylko pl, bez pozostałych języków: sprzeczne z polityką 35 języków i z rynkiem US. Rekomendacja: (a), przed wydaniem.
- Test akceptacyjny: test odtwarzający dla 12 języków (06-tresci-004) zielony, w każdej bazie zero szablonów ze zdaniem bez górnej granicy, `pnpm run ci` kod 0.
- Status: naprawione z uwagą (pl zweryfikowane; przekłady nadal otwarte)

### 06-tresci-004 · Trwała kontrola 06-tresci-001 nie obejmuje przekładów
- Pozycja listy kontrolnej: TRE-08 (tłumaczenie zachowuje liczby i granice); test należy do roli 07 (JAK-02), raportu tej roli z tego commitu brak, zgłaszam sam
- Poziom: P2 (ŚREDNIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/recenzja-cw-odtworzenie.test.ts:18` ładuje tylko `content/pl/scenarios`, a wyrażenie górnej granicy w linii 21 zna tylko polskie słowa („najwyżej”, „maksymalnie”, „nie więcej niż”, „do”). Przekłady z błędem przechodzą CI (kod 0, `docs/tresci/dowody/di-ci-a13d407b.txt`).
- Mechanizm: test powstał w recenzji DD dla pl. Poprawka przekładów (rola 09) nie będzie miała mechanicznej kontroli i może pominąć część z 44 plików.
- Powraca: nie
- Wzorzec lub źródło: zasada 21 (kontrolę wymusza test); TRE-08.
- Kroki w aplikacji: brak (test).
- Opcje: (a) test czyta 12 języków, a górną granicę bierze z mapy słów na język (na przykład en „at most”, de „höchstens”). Pokrywa wszystko, ale mapa wymaga brzmień z roli 09. (b) test równości: gdy pl ma „najwyżej”, każdy język ma w tym samym wyjaśnieniu inny tekst niż przed DG, czyli porównanie z odciskiem. To słabsza kontrola, bo nie sprawdza sensu. Rekomendacja: (a), razem z poprawką przekładów roli 09.
- Test akceptacyjny: na przekładach sprzed poprawki test jest czerwony dla sc-01 i sc-19 w każdym z 11 języków, a po poprawce zielony.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
Brak. Wszystkie wnioski oparłem na rachunku i odczycie baz.

## Co działa dobrze i należy zachować
- Minimalna poprawka: jedno słowo w 14 miejscach, bez zmian w generatorze, `GENERATOR_WERSJA` i identyfikatorach.
- Test odtwarzający przełączony na `it` bez zmiany asercji. Jest czerwony na starej treści z właściwego powodu.
- Zapis uproszczenia R-M2-005 podaje zakres (tylko scenariusze) i wyjątek liczbowy zgodny z rachunkiem.

## Decyzje dla właściciela
Brak pytań do właściciela (zakaz w poleceniu DI). Decyzje DI: `docs/decyzje/DI.md` (D-930, D-931), do weta. Do koordynatora należy przydzielenie poprawki przekładów (rola 09) i 06-tresci-004 przed wydaniem.

## Proponowane polecenie naprawy
Przekłady 06-tresci-001 to zadanie roli 09 (D-919). Test 06-tresci-004 robi rola 07 albo ta sama sesja 09, bo mapa słów pochodzi z przekładów. Trzeciego `fix` roli 06 nie proponuję, bo w pl nie ma już nic do naprawy. Polecenie: `node tools/assemble.mjs 09 --tryb fix --zadania 06-tresci-001,06-tresci-004`; nazwę roli 09 w bibliotece potwierdza koordynator.

## Wynik kontroli raportu
`node sprawdz-raport.mjs docs/tresci/recenzje/reaudit-dg-a13d407b.md . docs/tresci/recenzje --rola 06-tresci` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0. `pnpm run ci` @a13d407b kod 0 (`docs/tresci/dowody/di-ci-a13d407b.txt`). `git status --porcelain` repo na starcie: pusty; na końcu: tylko nowe pliki tej sesji (raport, 4 dowody, CI, `docs/decyzje/DI.md`).
