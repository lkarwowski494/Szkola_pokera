# Recenzja niezależna zmian CW (ŚR-005, CW-1, CW-2, NIS-003): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-11
Commit: 0ef7785 (= `origin/sesja-cw-tresci`, gałąź `sesja-dd-recenzja`), przedmiot `git diff 46197812..0ef77858` (141 plików: 60 plików `content/*/`, 35 baz treści, `poker-core` i `content-schema`, 5 testów i fixture'y, rejestr, dokumenty) · Tryb: audit (rola 06, moduł kontrole-mechaniczne; tresci-krytyczne nie dotyczy) · Sesja DD, polecenie koordynatora `docs/koordynacja/polecenia/DD.md` @ be472bb · Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0, Playwright niepotrzebny (zmiana bez nowego ekranu), symulator iOS niedostępny.

Kolejność pracy: najpierw własna ocena (rachunek od zera, mutacje w osobnym worktree, źródło otwarte dziś), dopiero potem `docs/decyzje/CW.md` i `docs/tresci/stan-cw.md`.

## Podsumowanie
**Werdykt: PRZYJĄĆ Z WARUNKIEM.** ŚR-005, CW-1 i CW-2 są poprawne merytorycznie i technicznie. Rachunek 90 ze 138 układów policzyłem od nowa i się zgadza. Filtr `oesdPossible: false` jest na semi-connected i disconnected zgodny z prawdziwym OESD na wszystkich 22 100 flopach. Źródło szczebla 2 otworzyłem dziś i popiera granicę zakresu. Testy zabijają mutację filtra draw, okna OESD i granicy SC-11. Warunek dotyczy NIS-003: zdanie „każda karta wyższa od stołu daje jeszcze 3 niepewne outy” podaje złą liczbę w części wariantów draw do koloru. Gdy na stole leżą trzy karty koloru, a karta gracza wyższa od stołu jest w innym kolorze, nowych outów są 2, bo trzecia karta tej rangi jest już outem koloru. To błąd liczby merytorycznej (06-tresci-001, WYSOKIE), choć odpowiedź call/fold się nie zmienia. Zmiana `GENERATOR_WERSJA` 2→3 nie psuje identyfikatorów w powtórkach. Identyfikatory zadań się nie zmieniły. Stare wpisy historii tracą tylko „to samo rozdanie”, zgodnie z ŚR-001.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 · WYSOKIE | M | NIS-003: zdanie „każda karta wyższa od stołu daje jeszcze 3 outy” jest fałszywe (2 outy) przy drawie do koloru z trzema kartami koloru na stole i nadkartą w innym kolorze (sc-01, sc-19; 35 baz) | otwarte |
| 06-tresci-002 | P2 · ŚREDNIE | P | Zdanie NIS-003 stoi w każdym wyjaśnieniu draw-call, a w 88% punktów gracz nie ma żadnej karty wyższej od stołu | otwarte |
| 06-tresci-003 | P2 · NISKIE | M | R-M2-005 (punkty flopu sc-01, sc-02, sc-19) ma w rejestrze `uproszczenie: null`, choć treść nazywa teraz uproszczenie NIS-003 | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 1, NISKIE 1. Test odtwarzający dla WYSOKIEGO: `tools/content-build/test/recenzja-cw-odtworzenie.test.ts` (`it.fails`; ten sam plik z `it` daje 2 czerwone przypadki z właściwego powodu, `dowody/cw-0ef7785-wys001-czerwony.txt`). `pnpm run ci` na commicie z testem: `docs/tresci/dowody/dd-ci-f0292319.txt`.

Decyzje autora: D-856 i D-858 (zakres R-M5-007 bez flopów z możliwym OESD) **poparte** źródłem szczebla 2 i rachunkiem. D-859 (filtr draw bez pary) **poparty**: mutacja zabita. D-857 (zdanie NIS-003) **częściowo**. Odpowiedź rzeczywiście się nie zmienia, bo generator sprawdza ją z górną granicą outów. Tekst podaje jednak tę górną granicę jako dokładną liczbę (06-tresci-001).

## Weryfikacja twierdzeń
Zakres: całość zmienionej treści pl, czyli 14 wyjaśnień draw-call z nowym zdaniem, granica SC-11 średni i przypadki 1 zadań `m5.l3.c-btn` i `m5.l4.c-review`. Przekłady (11 języków) sprawdzone na sensie zdania NIS-003 (sc-01, pierwsza akcja) i na równości `when` (test autora, 12 języków). Pozostałe 23 bazy biorą treść en (sprawdzone zapytaniem do baz). Sondy: 2000 ziaren na poziom, wyrocznie na wszystkich 22 100 flopach. Treść nie jest krytyczna w rozumieniu modułu: pieniądze występują tylko w nauce gry. · Hierarchia: z CLAUDE.md (ADR-24: 1 rachunek, 2 solvery, 3 książki, 4 serwisy, 5 eksploatacja) · Skrypt mechaniczny: `pnpm tresci:rejestr` w `pnpm run ci` (`docs/tresci/dowody/dd-ci-f0292319.txt`).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M5-007, granica | `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:20` (`oesdPossible: false`), tak samo `content/pl/lessons/m5-l4-bez-pozycji.md:79` i `content/pl/scenarios/sc-11.yaml:20` | "często i mało" tylko na wysokich flopach bez możliwego OESD | blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/, "Flop Connectedness" (`dowody/cw-0ef7785-zrodlo-gtow-flop-heuristics-ip.txt`) | "OESD possible … increased use of the 66% pot bet size, but decreased overall betting frequency"; "Disconnected … frequent use of the 33% sizing" | POPARTE | lekcja `m5-l3` (sekcja "Flop z wieloma drawami: rzadziej, ale więcej", KJ7) teraz zgodna z zadaniem | — | — |
| podział źródła | rejestr R-M5-007, pole `uproszczenie` | flopy z samym gutshotem = „Disconnected” | jak wyżej, wiersz 147 | "We classify flops as connected if it allows for the possibility of a flopped straight." | POPARTE (źródło ma trzy klasy: Disconnected, OESD possible, Connected; flop bez strita i bez OESD jest Disconnected) | — | — | — |
| rachunek 90/138 | `tools/content-build/test/cw-sc11-oesd.test.ts:58` | 90 ze 138 układów rang wysokich flopów półpołączonych pozwala na OESD | rachunek DD od zera: OESD = 5 kart bez strita, dwie rangi domykające z okna czterech rang (`dowody/cw-0ef7785-oesd-wyrocznia.txt`) | "układy high semi-connected 138 z OESD 90" | POPARTE | — | — | — |
| NIS-003, liczba | `content/pl/scenarios/sc-01.yaml:24` (i 13 dalszych wyjaśnień) | "Każda twoja karta wyższa od stołu daje jeszcze 3 niepewne outy na parę" | rachunek z kart, 2000 ziaren na poziom (`dowody/cw-0ef7785-nakladanie-outow.txt`) | sc-01: 515 z 2520 nadkart nakłada się z outem koloru; sc-19: 127 z 611; sc-02, sc-03: 0 | CZĘŚCIOWO (w sc-01 i sc-19 bywa 2, nie 3) | z poprzednim zdaniem "Masz 9 outów" daje 9 + 3 = 12, a realnie 11 | "daje jeszcze najwyżej 3" (albo liczba z wariantu) | 06-tresci-001 |
| NIS-003, odpowiedź | jak wyżej, "ale tu nie zmienia to odpowiedzi" | odpowiedź z outami drawa = odpowiedź z nadkartami | `packages/poker-core/src/scenario-gen.ts:526-531` (górna granica w generatorze), test autora `cw-nadkarty` | „nieusuwane, więc to górna granica” | POPARTE (górna granica, wynik monotoniczny w liczbie outów) | — | — | — |
| NIS-003, przekłady | `content/en/scenarios/sc-01.yaml:24` i 10 dalszych języków | sens i liczba jak pl | odczyt zdań w 11 językach (sc-01) | "adds {{n:pair.outs.per-rank}} uncertain outs" | POPARTE jako przekład (dziedziczą 06-tresci-001) | — | jak pl | 06-tresci-001 |

## Linia bazowa i założenia
Wymiary pokrycia:
- Kategorie twierdzeń: liczba outów (NIS-003), reguła strategii (R-M5-007 i jej granica), definicja pojęcia (OESD), rachunek kombinatoryczny (90/138). Wszystkie sprawdzone.
- Progi krytyczne: sprawdzone, brak (treść nie dotyczy zdrowia, życia ani prawa).
- Brakujące ostrzeżenia: sprawdzone. Dziedzina zna błąd „podwójnego liczenia outów”, a tekst powinien go nie popełniać, nie przed nim ostrzegać. Znalezisko 06-tresci-001.
- Jednostki i warianty regionalne: sprawdzone. Liczba idzie przez `{{n:}}` we wszystkich językach, przekład zachowuje sens i nie wymaga terminu spoza słownika.
- Aktualność źródeł: źródło GTO Wizard otwarte dziś (HTTP 200), cytaty dosłowne w surowym tekście.
- Trudna pamięć: nie dotyczy.
- Pary zdań: „Masz 9 outów” i „każda karta wyższa daje jeszcze 3” razem dają 12 outów. Przy nakładaniu realnie jest 11 (06-tresci-001).
- Twierdzenia z jednym źródłem: R-M5-007 ma dwa źródła szczebla 2, a granica OESD stoi na jednym (GTO Wizard). Szczebel 2 wystarcza (D-013).

Soczewki: laik czyta „daje jeszcze 3” dosłownie i doda 3 do 9. Ekspert szuka podwójnego liczenia outów. Weryfikator sam otworzył źródło i policzył rachunek. Osoba z innego kraju widzi ten sam tekst w 35 bazach. Wzorzec najlepszych: podręczniki liczenia outów (szczebel 4, np. Upswing „Poker drawing odds & outs explained” w `content/numbers.yaml:54`) uczą, żeby nie liczyć tej samej karty dwa razy. Aplikacja tak robi w lekcji M2 (`content/pl/lessons/m2-l2-pot-odds.md:25`, as w kolorze drawa, bez nakładania), a scenariusze nie. Rejestr założeń: bez zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/texture.ts` (`hasOesdPair`, `oesdPossible`, filtr) | tak | wyrocznia DD na 22 100 flopach (`dowody/cw-0ef7785-oesd-wyrocznia.txt`), mutacja okna z asem (`dowody/cw-0ef7785-mutacja-m2.txt`) |
| `packages/poker-core/src/scenario-gen.ts` (filtr draw, `GENERATOR_WERSJA`) | tak | mutacja: cofnięcie CW-2 czerwone (`dowody/cw-0ef7785-mutacja-m1.txt`); odciski: zmiana tylko `sc-11|sredni` |
| `packages/content-schema/src/index.ts` (pole schematu) | tak | odczyt diffu; `.strict()` zachowane |
| SC-11 średni, przypadki `m5.l3.c-btn` i `m5.l4.c-review` (12 języków) | tak | mutacja granicy pl (`dowody/cw-0ef7785-mutacja-m3.txt`), rozkład mokrości (`dowody/cw-0ef7785-mokrosc-sc11.txt`) |
| 14 wyjaśnień NIS-003 pl, sens przekładów 11 języków | tak | sondy (`dowody/cw-0ef7785-nakladanie-outow.txt`, `dowody/cw-0ef7785-bez-nadkart.txt`) |
| 35 baz treści (`apps/mobile/assets/content/`) | tak, zapytaniem | każda baza ma `oesdPossible` w przypadkach i zdanie NIS-003 w szablonach (23 bazy przez en) |
| Ocena w trybie gry (`grading.ts`), boty (`bots.ts`), silnik zadań (`engine.ts`) | tak, odczyt | flop bez przypadku: `grading.ts` zwraca null (bez oceny), boty biorą rozmiar z mokrości, silnik zadań losuje flop do przypadku |
| Powtórki i historia wariantów (`packages/domena/src/wariant.ts`, `packages/postep/`) | tak, odczyt | wersja globalna: stare wpisy bez „tego samego rozdania” (ŚR-001), identyfikatory zadań bez zmian, `tools/content-build/src` bez zmian w diffie |
| Testy przed poprawką (`docs/tresci/dowody/cw-*`) | tak | czerwone z właściwego powodu; zmiana oczekiwanej liczby 84→90 uzasadniona rachunkiem, nie dopasowaniem |
| Pełne CI | tak | `docs/tresci/dowody/dd-ci-f0292319.txt` |
| Ekran na telefonie | nie (brak symulatora) | lista kontrolna dla właściciela niepotrzebna: zmiana to zdanie tekstu i rozkład flopów |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-cw-0ef7785.md . docs/tresci/recenzje --rola 06-tresci`: wynik wklejony na końcu raportu (sekcja „Wynik kontroli raportu”).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy | ok: nowe zdania mają twierdzenia R-M7-007, R-M7-008 i R-M5-007; dla R-M2-005 brak zapisu uproszczenia: 06-tresci-003 |
| TRE-02 | dotyczy | ok dla R-M5-007 (źródło otwarte dziś); NIS-003 CZĘŚCIOWO: 06-tresci-001 |
| TRE-03 | dotyczy | ok: źródło dotyczy BTN vs BB w cashu, tak jak zadania i SC-11 |
| TRE-04 | dotyczy | ok: szczebel 2 oznaczony w rejestrze |
| TRE-05 | dotyczy | ok: D-856 rozstrzyga klasę gutshotu według podziału źródła |
| TRE-06 | dotyczy | 06-tresci-001 (liczba 3 wobec 2 w części wariantów); `{{n:pair.outs.per-rank}}` = 3 zgodne z `content/numbers.yaml:222` |
| TRE-07 | dotyczy | 06-tresci-003 (uproszczenie nieoznaczone przy R-M2-005); kierunek zgodny |
| TRE-08 | dotyczy | 06-tresci-001 (para zdań daje 12 outów zamiast 11) |
| TRE-09 | nie dotyczy | brak faktów zmiennych w czasie |
| TRE-10 | nie dotyczy | treść niekrytyczna |
| TRE-11 | nie dotyczy | brak trudnej pamięci |
| TRE-12 | nie dotyczy | brak treści zależnej od lokalizacji |
| TRE-13 | dotyczy | ok: bazy `68e8823198` zawierają zmienione przypadki i zdania (zapytanie do 35 baz) |
| TRE-14 | dotyczy | ok: cytat źródła 1–2 zdania tylko w rejestrze i dowodach, w produkcie własne słowa |

## Znaleziska (szczegóły)

### 06-tresci-001 · NIS-003 podaje „3 outy” na kartę wyższą od stołu tam, gdzie są 2
- Pozycja listy kontrolnej: TRE-06 (także TRE-08, para zdań)
- Poziom: P1 (WYSOKIE według progu wydania: błędna liczba merytoryczna)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-01.yaml:24` „Każda twoja karta wyższa od stołu daje jeszcze {{n:pair.outs.per-rank}} niepewne outy na {{t:pair|parę}}”. Sonda (`dowody/cw-0ef7785-nakladanie-outow.txt`, 2000 ziaren na poziom): w sc-01 515 z 2520 przypadków karty wyższej od stołu nakłada się z outem koloru, w sc-19 127 z 611, w sc-02 i sc-03 0. Przykład (sc-01, łatwy, ziarno 2): ręka A♥ 4♦, stół T♦ 3♦ 8♦. As karo jest już jednym z 9 outów koloru, więc nowe outy na parę asów to tylko A♠ i A♣. Test `tools/content-build/test/recenzja-cw-odtworzenie.test.ts` z `it` daje kod 1, „nowych outów 2, zdanie mówi 3” (`dowody/cw-0ef7785-wys001-czerwony.txt`).
- Mechanizm: zdanie podaje górną granicę generatora (`packages/poker-core/src/scenario-gen.ts:526-531`, „nieusuwane, więc to górna granica”) jako dokładną liczbę. `grep -rln "pair.outs.per-rank" content/*/scenarios` → 48 plików (sc-01, sc-02, sc-03, sc-19 × 12 języków), a 23 pozostałe bazy dostają tekst en. Błędna liczba dotyczy tylko sc-01 i sc-19 (draw do koloru). Przy drawie do strita karty gracza leżą wewnątrz okna, więc nakładania nie ma (test `it` dla sc-02 i sc-03 przechodzi).
- Powraca: nie (nowe w CW) → trwała kontrola: test odtwarzający przechodzi na `it` po naprawie.
- Wzorzec lub źródło: rachunek (szczebel 1): w talii są 4 karty rangi, 1 trzyma gracz, zostają 3 (`content/numbers.yaml:222`). Jeśli jedna z nich jest w kolorze drawa, liczy się już w 9 outach koloru. Lekcja M2 liczy outy bez nakładania (`content/pl/lessons/m2-l2-pot-odds.md:25`, A♥ przy drawie kierowym).
- Kroki w aplikacji: Scenariusze → sc-01 („draw do koloru”) albo sc-19 → wariant z trzema kartami koloru na stole i nadkartą w innym kolorze → wyjaśnienie dowolnej akcji.
- Opcje: (a) „daje jeszcze najwyżej {{n:pair.outs.per-rank}} niepewne outy” w 12 plikach × 4 szablony. To tylko tekst, generator bez zmian, ale zdanie mniej konkretne. (b) liczba nowych outów liczona w wariancie (zmienna `{{w:…}}`, rola 08). Wynik dokładny i łączy się z 06-tresci-002, ale trzeba zmienić kod ekranu i szablonu. (c) generator odrzuca warianty z nakładaniem. Tekst zostaje, ale zmienia się rozkład rąk, trzeba podnieść `GENERATOR_WERSJA` i uczy to mniej typowych sytuacji. Rekomendacja (merytoryczna, moja): (a) teraz, bo to minimalna prawdziwa poprawka. (b) rozważyć razem z 06-tresci-002.
- Test akceptacyjny: `recenzja-cw-odtworzenie.test.ts` z `it` zamiast `it.fails` przechodzi. Test bez zmian przyjmuje opcję (a): gdy zdanie mówi „najwyżej”, sprawdza `nowe ≤ 3` (D-899). Sonda w worktree z „najwyżej” w 4 plikach pl dała 5/5 zielonych. Opcje (b) i (c) wymagają nazwanej zmiany wyroczni. Do tego `pnpm run ci` kod 0.
- Status: otwarte

### 06-tresci-002 · Zdanie o kartach wyższych od stołu pokazywane, gdy takich kart nie ma
- Pozycja listy kontrolnej: TRE-08 (brzmienie: SP-11 roli 04; raportu roli 04 z tego commitu brak, zgłaszam sam)
- Poziom: P2 (ŚREDNIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: P
- Dowód: `dowody/cw-0ef7785-bez-nadkart.txt`: w 28 157 z 32 000 punktów draw-call (88,0%) gracz nie ma karty wyższej od stołu, a wyjaśnienie i tak kończy się zdaniem „Każda twoja karta wyższa od stołu daje jeszcze 3 niepewne outy…, ale tu nie zmienia to odpowiedzi” (`content/pl/scenarios/sc-02.yaml:23`). Zdanie jest prawdziwe (warunkowe), ale w 9 na 10 wariantów nie dotyczy ręki gracza. Do tego „niepewne outy” nie są nigdzie wcześniej zdefiniowane: `grep -rn "niepewn" content/pl` → tylko te 14 zdań.
- Mechanizm: D-857 nazwał uproszczenie samą treścią, bez znacznika wariantu, więc zdanie jest stałe; `grep -c "pair.outs.per-rank" content/pl/scenarios/sc-0[123].yaml content/pl/scenarios/sc-19.yaml` → 14 wyjaśnień.
- Powraca: nie
- Wzorzec lub źródło: zasada 18 (obciążenie poznawcze), CLAUDE.md „pojęcie zdefiniowane przed pierwszym użyciem”.
- Kroki w aplikacji: Scenariusze → sc-02 → dowolny wariant bez karty wyższej od stołu → wyjaśnienie.
- Opcje: (a) zdanie tylko w wariantach z kartą wyższą od stołu (warunek w ekranie albo zmienna wariantu, rola 08 i 04). Tekst trafia tylko tam, gdzie jest prawdziwy i potrzebny, a przy okazji można podać dokładną liczbę (06-tresci-001 b), ale trzeba zmienić kod i odwrócić D-857. (b) zostawić stałe zdanie i tylko zastąpić „niepewne outy” opisem z lekcji M2. Bez kodu, ale długie wyjaśnienie zostaje w 88% wariantów. Rekomendacja: (a), decyzja produktowa (rola 03/04 z właścicielem).
- Test akceptacyjny: dla (a) test ekranu albo szablonu: wariant bez karty wyższej od stołu nie pokazuje zdania, wariant z nią pokazuje. Dla (b) `grep "niepewn"` w treści daje 0 albo termin ma definicję przed użyciem.
- Status: otwarte

### 06-tresci-003 · R-M2-005 bez zapisu uproszczenia, które treść już nazywa
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2 (NISKIE)
- Realność: realny (rejestr, bez skutku w interfejsie) · Pewność: wysoka
- Rodzaj: M
- Dowód: `docs/tresci/rejestr/m0-m4.json:369` (R-M2-005) ma `uproszczenie: null`. Punkty flopu sc-01, sc-02 i sc-19 mają `rule: R-M2-005` i od CW kończą się zdaniem uproszczenia (`content/pl/scenarios/sc-01.yaml:24`). R-M7-007 i R-M7-008 dostały ten zapis w CW.
- Mechanizm: rejestr podzielony na pliki, a sesja CW miała dostęp tylko do `m5-m8.json`; `grep -n "rule: R-M2-005" content/pl/scenarios/sc-0[12].yaml content/pl/scenarios/sc-19.yaml` → 3 punkty.
- Powraca: nie
- Wzorzec lub źródło: wzorce roli, pole `uproszczenie` („co pominięto i dlaczego kierunek się zgadza”).
- Kroki w aplikacji: brak (tylko rejestr).
- Opcje: jedna realna, czyli dopisać uproszczenie do R-M2-005 tym samym brzmieniem co R-M7-007 (po poprawce 06-tresci-001). Druga opcja, nic nie robić, zostawia rejestr niezgodny z treścią.
- Test akceptacyjny: `pnpm tresci:rejestr` kod 0, a R-M2-005 ma `uproszczenie` różne od `null`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- **Double gutshot na A-7-3 i A-Q-8 (tęczowe):** to 2 z 48 układów rang w zakresie R-M5-007 po CW. Gracz z 4-5 (A73) albo T-J (AQ8) ma 8 outów do strita bez OESD. Definicja źródła („four consecutive cards … either end”) ich nie obejmuje, więc decyzja CW jest zgodna z literą źródła. Nie wiadomo, jak GTO Wizard klasyfikuje takie flopy w swoich agregatach. Brakuje opisu algorytmu klasyfikacji albo raportu agregatów dla tych flopów. Sonda: `dowody/cw-0ef7785-oesd-wyrocznia.txt`.
- **`oesdPossible = true` na 8 układach połączonych (632, A32, A42, A52, KQ9, AKT, AKJ, AKQ):** tam każde okno czterech rang daje już strita, więc OESD jako ręki bez strita nie ma. Komentarz w `packages/poker-core/src/texture.ts:141` („Dokładnie wtedy gracz może dołożyć brakujące rangi okna i mieć OESD”) mówi więcej, niż kod liczy, a wyrocznia testu ma tę samą definicję, więc nie jest w pełni niezależna. Dziś nie ma drogi przez interfejs, bo żaden filtr nie łączy `oesdPossible` z flopami połączonymi. Autor zapisał to w D-856 jako „ostrożnie true”. Do backlogu, gdy pole zostanie użyte na flopach połączonych.
- **Mokrość „suchy” na flopach z możliwym OESD (zmiana spoza diffu):** wszystkie 3312 flopów dawnego SC-11 średni aplikacja klasyfikuje jako `dry` (`dowody/cw-0ef7785-mokrosc-sc11.txt`), także te z OESD, które źródło traktuje osobno. Podsumowanie tekstury w zadaniach może więc nazywać „suchym” flop, na którym lekcja `m5-l3` (KJ7) uczy „rzadziej, ale więcej”. Trzeba sprawdzić `textureText.summary` na takim flopie, rola 06 przy następnym audycie M4–M5.

## Co działa dobrze i należy zachować
- Wyrocznie na wszystkich 22 100 flopach zamiast próbki; rachunek recenzji CQ poprawiony z jawnym uzasadnieniem (84 → 90), co potwierdza niezależny rachunek DD.
- Granica w trzech miejscach naraz (SC-11, przypadek zadania, rejestr) i test równości `when` w 12 językach. Usunięcie granicy z SC-11 pl łapie test równości, a generator i tak nie wylosuje flopu z OESD, bo przypadek R-M5-007 go wyklucza (`dowody/cw-0ef7785-mutacja-m3.txt`).
- CW-2: test fixture'a zabija dokładnie cofnięcie poprawki, a nie tylko mutację „zawsze true” (`dowody/cw-0ef7785-mutacja-m1.txt`).
- `GENERATOR_WERSJA` podniesiona razem z odciskami w jednym commicie; zmiana odcisków ograniczona do `sc-11|sredni`.
- Tryb gry bez fałszywej oceny: flop bez przypadku nie dostaje werdyktu (`packages/poker-core/src/grading.ts:390`).

## Decyzje dla właściciela
Brak decyzji wymagających właściciela teraz (zakaz pytań w poleceniu DD). Decyzja produktowa z 06-tresci-002 (zdanie warunkowe w ekranie albo stałe) należy do roli 03/04 i koordynatora; rekomendacja w znalezisku. Decyzje DD: `docs/decyzje/DD.md` (D-897…D-900), wszystkie do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-003` (treść i rejestr). 06-tresci-002 dopiero po decyzji produktowej; przy opcji (a) zadanie dla roli 08 (kod ekranu) i 04 (brzmienie).

## Wynik kontroli raportu
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-cw-0ef7785.md . docs/tresci/recenzje --rola 06-tresci` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0. `pnpm run ci` @f029231 kod 0 (`docs/tresci/dowody/dd-ci-f0292319.txt`); końcowy przebieg po uodpornieniu testu: plik `dd-ci-<sha8>` końcowego commita.
