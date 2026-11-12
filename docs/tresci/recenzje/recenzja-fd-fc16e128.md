# Recenzja niezależna FD (06-tresci, audit): szkice treści fali 1–2 i decyzje D-1350…D-1358 — Szkoła Pokera — 2026-11-12
Commit recenzowany: fc16e128 (ostatni commit FD, w gałęzi roboczej `claude/sleepy-brahmagupta-2065nu` @ 56a7ac70, HEAD zgodny z poleceniem) · Sesja: FK · Tryb: audit (moduły kontrole-mechaniczne; tresci-krytyczne i historia-i-miejsca nie dotyczą: poker bez progów zdrowia, życia i prawa, bez miejsc i trudnej pamięci) · Środowisko: Linux 6.18, Node 22, pnpm 10.28 z lockfile (kod 0); sieć działa (12 adresów źródeł pobranych `curl`, HTTP 200); macOS/Xcode niedostępne (nie dotyczy: recenzja treści).

## Podsumowanie
Werdykt ogólny: **PO POPRAWKACH** (0 KRYT, 3 WYS, 4 ŚR, 4 NIS). W podziale: **SC-14 — PRZYJĄĆ**; **SC-23 — PRZYJĄĆ Z UWAGAMI** (ŚR 004: dwuznaczny zakres w pl); **SC-24, SC-20 — PRZYJĄĆ Z UWAGAMI** (NIS); **SC-07, SC-09, SC-15, SC-17, SC-31 — PO POPRAWKACH**; specyfikacje 08-FD-1…5 — przyjąć (08-FD-3 z uwagą NIS 009). Rachunki FD odtworzyłem dwa razy: `fd_wektory.py` daje wynik identyczny z dowodem autora, a mój własny ewaluator (bez importu z repo) daje te same zbiory kart, W, L i werdykty A–H. 21 z 21 cytatów, na których stoją szkice, znalazłem dziś dosłownie w surowym tekście 12 stron.

Najważniejsze ryzyko: SC-15 na flopie uczy progu „jeśli pasujesz częściej niż {{n:alpha.bet-third}}, rywal zarabia” jako normy obrony, choć lekcja m6-l1 oznacza tę odpowiedź jako błędną dla flopa, a GTO Wizard (szczebel 2) pokazuje, że BB w równowadze pasuje częściej (001). Do tego SC-17 podaje „ok. 75% puli / 30%”, gdy generator stawia pełną pulę (002), a SC-09 pokazuje na ekranie rywala „Big blind” jako limpera przed CO (003).

SC-14 i SC-23 mogą wejść do `content/` (08-FD-5): **TAK, z warunkami** (sekcja „Werdykt 08-FD-5”). Decyzji właściciela brak: wszystkie znaleziska są merytoryczne (ADR-24) albo wykonawcze; rozstrzygnięcia FK w `docs/decyzje/FK.md` (D-1410…D-1413), do weta.

Skala: KRYT = P0, WYS = P1, ŚR = P2, NIS = P2 bez zmiany działania (szlif zapisu).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 (WYS) | M | SC-15: próg alpha na flopie podany jako norma obrony; sprzeczne z lekcją m6-l1 i z GTO Wizard (szczebel 2) | naprawione-do-weryfikacji (FN, 03609a6a) |
| 06-tresci-002 | P1 (WYS) | M | SC-17 (i SC-07): tekst podaje stały rozmiar zakładu i cenę, a generator po zaokrągleniu stawia 80–100% puli (SC-07: 40%) | naprawione-do-weryfikacji (FN, 3c7a7a7a) |
| 06-tresci-003 | P1 (WYS) | M | SC-09: ekran pokazuje rywala „Big blind”, a sytuacja mówi, że limpował przed tobą (CO) | naprawione-do-weryfikacji (FN, 70c7b3a9) |
| 06-tresci-004 | P2 (ŚR) | M | SC-23 pl: „AK i AQ w kolorze” i „KQ, KJ, QJ, QT i JT w kolorze” — ta sama składnia, inny zasięg „w kolorze” | naprawione-do-weryfikacji (FN, cb1ae089) |
| 06-tresci-005 | P2 (ŚR) | M | SC-31: etykieta „ten rywal często stawia i przebija” bez „załóż” i oba poziomy z odpowiedzią call | naprawione-do-weryfikacji (FN, b8da70f8) |
| 06-tresci-006 | P2 (ŚR) | M | SC-07 Ś: „ani nie wygrywają z blefami, ani nie mają się z czego poprawić” mocniej niż reguła | naprawione-do-weryfikacji (FN, 2461866e) |
| 06-tresci-007 | P2 (ŚR) | M | SC-10: AKs CO wobec 3-betu BTN — źródło dla tego spotu (Pailiku) mówi call; D-1354 nie nazywa sprzeczności | naprawione-do-weryfikacji (FN, 2b933eaf (dane bez zmian, D-1435; spec 08-FN-1)) |
| 06-tresci-008 | P2 (NIS) | D | SC-20, SC-17: rozmiar zakładu z szablonu, a w tekście klucz `cbet.size.big`; „ćwierć puli” słowem poza `{{n:}}` | otwarte |
| 06-tresci-009 | P2 (NIS) | M | 08-FD-3: tylko e = N/47; D-1286 na turnie sprawdza dwie liczby (pokazywaną i dokładną) | otwarte |
| 06-tresci-010 | P2 (NIS) | D | Nagłówek SC-17 przypisuje „When to Call With Ace-High” serwisowi pokercoaching; to Upswing | naprawione-do-weryfikacji (FN, 62e01f31) |
| 06-tresci-011 | P2 (NIS) | M | SC-23: „trzyma więcej kart” i „nie zasłania rąk do spasowania” mocniej niż kryterium D-1054 | naprawione-do-weryfikacji (FN, 04289ccb) |

## Werdykt 08-FD-5: czy SC-14 i SC-23 mogą wejść do `content/`
**TAK, z warunkami** (decyzja D-1410):
1. SC-14: bez poprawek merytorycznych. Cytat źródła i zakres (otwarcie ze środkowej pozycji, Button sprawdza, bez blind vs blind i bez UTG) zgodne z tekstem; `height: low` to najwyższa karta 9 i niżej (`packages/poker-core/src/texture.ts:11`), czyli dokładnie zakres źródła “nine-high and below”.
2. SC-23: najpierw poprawka 004 w `pl` (zasięg „w kolorze”); en jest jednoznaczne. 011 zalecane, niewymagane.
3. 08-FD-5 w całości w jednym commicie: kontekst testów jak `buildGeneratorContext`, odciski SC-14 i SC-23 dla bieżącej `GENERATOR_WERSJA`, SC-14 na liście cbet-case w `szablony-co.test.ts`, test zgodności `pick-hand` na treści, przekład 09 w 10 językach; `pnpm run ci` kod 0 z dowodem.
4. Przekład 09 bierze tekst pl po poprawce 004 (inaczej dwuznaczność przejdzie do tłumaczeń z pl).
5. Bez zmian w regułach: R-M5-012 i R-M8-007 pozostają POPARTE (cytaty dosłownie dziś, `dowody/fk-zrodla.txt`).

## Weryfikacja twierdzeń
Zakres: całość (10 szkiców pl + en, 9 decyzji D-1350…D-1358, specyfikacje 08-FD-1…5, 10 reguł użytych w szkicach, 8 wektorów rachunku) · Hierarchia: z `CLAUDE.md` (ADR-24) · Skrypty: `fd_wektory.py` kod 0, wynik identyczny (`dowody/fk-fd-wektory.txt`); własny rachunek kod 0 (`dowody/fk-niezalezny.txt`); `fd-kontrola-szkicow.sh` kod 0, struktura pl/en zgodna (`dowody/fk-szkice.txt`); rozmiary zakładów defend (`dowody/fk-defend-rozmiary.txt`); 21/21 cytatów dosłownie (`dowody/fk-zrodla.txt`).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M5-012 (SC-14) | `docs/tresci/szablony-robocze/fd/pl/sc-14.yaml:28` | środkowa pozycja vs Button: niski flop bez pary → czekanie całym zakresem | upswingpoker.com/podcast/ep24-cbetting-oop, 03:35 | “The solver checks nine-high and below unpaired flops, which is so many flops that we're just checking our entire range on” | POPARTE (zakres: “Suppose you raise in middle position and the button calls”) | zakres skondensowany: GW c-betting OOP (R-M5-012, szczebel 2) | — | — |
| R-M8-007 (SC-23) | `docs/tresci/szablony-robocze/fd/pl/sc-23.yaml:25` | bloker silnych rąk, bez blokowania pasujących | blog.gtowizard.com/blockers-unblockers…, wstęp | “A good bluff should simultaneously block very strong hands and unblock the hands that we want to fold out.” | POPARTE | „nie zasłania rąk do spasowania” mocniej niż „nie mniej F” | patrz 011 | 011 |
| zakres rywala (SC-23) | `docs/tresci/szablony-robocze/fd/pl/sc-23.yaml:9` | dana zadania (D-1300) | — | — | dwuznaczne w pl | — | patrz 004 | 004 |
| R-M6-006 (SC-07, SC-15) | `docs/tresci/szablony-robocze/fd/pl/sc-07.yaml:23` | mały c-bet: pary, drawy, backdoor z overkartą, zwykle as | pokercoaching.com/blog/defending-bb-on-high-card-boards (K84) | “we will continue with pretty much all pairs including he underpairs and even A-high hands” | POPARTE | rozmiar „ok. 1/3” vs zakład 40% przy puli 5 | patrz 002 | 002, 006 |
| R-M6-001/003 (SC-15) | `docs/tresci/szablony-robocze/fd/pl/sc-15.yaml:24` | na flopie: pas częściej niż alpha = rywal zarabia; nie pasujesz masowo | blog.gtowizard.com/mdf-alpha (raport BTN vs BB, 1755 flopów) | “On average, BB is consistently over-folding to all bet sizes on the flop.” | SPRZECZNE (para zdań daje normę: pasuj najwyżej tyle co alpha, na flopie) | lekcja m6-l1 oznacza to jako błąd | patrz 001 | 001 |
| R-M6-007 (SC-17) | `docs/tresci/szablony-robocze/fd/pl/sc-17.yaml:22` | duży c-bet: as-high bez backdoora pas; najlepiej backdoor do najwyższego koloru | upswingpoker.com/when-to-call-with-ace-high (J♦4♦2♠, 66%) | “Almost all Ace-highs with which the solver calls have the backdoor nut flush draw” | POPARTE | liczba w tekście (ok. 75% puli) vs zakład pełnej puli | patrz 002 | 002 |
| R-M4-012 (SC-09) | `docs/tresci/szablony-robocze/fd/pl/sc-09.yaml:22` | 3 bb + 1 bb na limpera; mniejsze daje zbyt dobrą cenę | pokernews.com 10 Tips (1.); preflopwizard.app ISO | “Never min-raise a limped pot. A raise to 2bb over a 1bb limp gives every limper 4-to-1 odds to call.” | POPARTE (uzasadnienie „za mała” ma źródło PFW) | pozycja rywala BB sprzeczna z sytuacją | patrz 003 | 003 |
| R-M4-010 (SC-10) | `docs/tresci/szablony-robocze/fd/pl/sc-10.yaml:20` | AA, KK → 4-bet; AK → 4-bet, call dopuszczalny | Upswing vs 3-bet (BTN vs BB); Deepfold; pailiku.com/charts/co-vs-btn-3bet | “4-bet QQ+, AKo, A5s-A4s Call JJ-77, AQs-ATs, AKs” | CZĘŚCIOWO (dla CO vs BTN źródło spotu: AKs call) | — | patrz 007 | 007 |
| R-M7-006 (SC-20) | `docs/tresci/szablony-robocze/fd/pl/sc-20.yaml:23` | ¾ puli: draw potrzebuje 30%, ma ok. 19,6% | rachunek (szczebel 1, D-1286); pokercoaching connected boards | “Strong and vulnerable bets big” | POPARTE (rachunek: 0,75/2,5 = 0,30; 9/46 = 0,1957) | klucz rozmiaru c-betu dla zakładu na turnie | patrz 008 | 008 |
| R-M8-010 (SC-24, SC-31) | `docs/tresci/szablony-robocze/fd/pl/sc-24.yaml:24` | call, gdy udział blefów > B/(P+2B) | deepfold.co/en/blog/bluff-catching-principles | “Call when villain's bluff combos / (bluff + value combos) > breakeven equity.” | POPARTE | SC-31: etykieta rywala bez „załóż” | patrz 005 | 005 |
| wektory A–C (08-FD-3) | `docs/tresci/stan-fd.md:27-29` | A przyjęty, B i C odrzucone | rachunek własny (`dowody/fk-niezalezny.txt`) | — | POPARTE (zbiory kart identyczne; z N/45: A +0,0333 / +0,0857) | — | patrz 009 | 009 |
| wektory D–H (08-FD-4) | `docs/tresci/stan-fd.md:33-37` | G bet 8/9, H czekanie 4/11, E w pasie, D i F odrzucone | rachunek własny | — | POPARTE (W, L, pasujące, lepsze wśród pasujących — identyczne) | — | — | — |

## Linia bazowa i założenia
Linię bazową zbudowałem przed czytaniem uzasadnień autora: dla twierdzeń z największym skutkiem (progi rozmiaru i ceny, normy obrony, zakres źródła względem spotu w szablonie) otworzyłem źródła od nowa (12 adresów), przeczytałem otoczenie cytatów i sam policzyłem wektory. `stan-fd.md` i `FD.md` czytałem dopiero jako przedmiot recenzji.

Wymiary pokrycia:
- Kategorie twierdzeń (reguły, uzasadnienia w wyjaśnieniach, liczby `{{n:}}`, dane zadania, progi generatora): sprawdzone; znaleziska 001–011.
- Progi krytyczne dla zdrowia, życia, mienia i prawa: sprawdzone, brak (treść pokerowa bez progów bezpieczeństwa; hazard poza zakresem szkiców).
- Brakujące ostrzeżenia i granice stosowania: sprawdzone; 001 (MDF na flopie bez „punkt odniesienia, nie obowiązek”, choć lekcja i R-M6-003 to mówią).
- Jednostki i warianty regionalne: sprawdzone; brak problemu jednostek (bb, % puli); wariant językowy pl/en: 004 (dwuznaczność tylko w pl).
- Aktualność źródeł: sprawdzone; wszystkie 12 stron dostępne dziś, cytaty bez zmian.
- Trudna pamięć: sprawdzone, brak (nie dotyczy dziedziny).
- Pary zdań: sprawdzone; 001, 006, 011.
- Twierdzenia z jednym źródłem albo z niskich szczebli: sprawdzone; R-M4-012 i R-M4-010 tylko szczebel 4 (oznaczone w rejestrze), R-M5-012 dla SC-14 stoi na szczeblu 4 z kierunkiem szczebla 2 (GW) — dopuszczalne.

Soczewki: laik czytający dosłownie (004, 002, 003), ekspert szukający szkodliwych uproszczeń (001, 005, 006), sceptyczny weryfikator otwierający źródła (007, 010), osoba z innego języka (004: en jednoznaczne, pl nie). Wzorzec najlepszych: kurs, w którym liczba w wyjaśnieniu równa się liczbie na ekranie, a dana zadania jest jednoznaczna; tu łamią to 002, 003 i 004. Zmian w `docs/zalozenia.md` nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `docs/tresci/szablony-robocze/fd/pl/*.yaml` (10) | tak, każde zdanie | odczyt + źródła (`dowody/fk-zrodla.txt`) |
| `docs/tresci/szablony-robocze/fd/en/*.yaml` (10) | tak: struktura skryptem, sens wyrywkowo (sc-09, 14, 15, 17, 20, 23, 31) | `dowody/fk-szkice.txt` |
| `docs/decyzje/FD.md` D-1350…D-1358 | tak | odczyt, odwołania sprawdzone |
| `docs/tresci/stan-fd.md` (08-FD-1…5) | tak | odczyt + rachunek własny (`dowody/fk-niezalezny.txt`) |
| `fd_wektory.py` vs `fd-wektory.txt` | tak | `dowody/fk-fd-wektory.txt` |
| generator: defend, iso-size, cbet-case, river-catch, pick-hand | tak (gałęzie użyte przez szkice) | `packages/poker-core/src/scenario-gen.ts:651-656`, `:771-780`, `:1003-1023`, `:1076-1099` |
| ekran startu scenariusza (pozycje) | tak (kod; bez uruchomienia aplikacji) | `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:109` |
| rejestr reguł użytych w szkicach (10) | tak | `docs/tresci/rejestr.json` |
| lekcje M4–M10 poza m6-l1 | nie (poza zakresem polecenia) | — |
| przekłady 33 języków | nie (szkice istnieją tylko pl/en) | — |
| aplikacja uruchomiona (Expo web) | nie: rodzaje szkiców nie są na ekranie (D-1356) | — |

## Kontrola dowodów i sekretów
`node <scratchpad>/narzedzia/sprawdz-raport.mjs docs/tresci/recenzje/recenzja-fd-fc16e128.md . docs/tresci/recenzje --rola 06-tresci` → wynik w sekcji „Wynik kontroli” na końcu raportu. `git status --porcelain` na początku pracy: pusty (poza `__pycache__` z mojego uruchomienia rachunku, usuniętym); na końcu: tylko pliki tej recenzji i `docs/decyzje/FK.md`.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każde zdanie szkiców ma regułę z rejestru albo jest daną zadania/ramą; brak nowych twierdzeń (zgodnie z `stan-fd.md`) |
| TRE-02 | dotyczy | 007 (CZĘŚCIOWO); pozostałe POPARTE, 21/21 cytatów dosłownie |
| TRE-03 | dotyczy | 001 (reguła rivera zastosowana na flopie), 007 (spot BTN vs BB zastosowany do CO vs BTN) |
| TRE-04 | dotyczy | ok: brak jedynego szczebla 5; szczebel 4 oznaczony w rejestrze |
| TRE-05 | dotyczy | 007 (sprzeczność szczebla 4 bez zapisu w D-1354) |
| TRE-06 | dotyczy | 002, 008, 009 |
| TRE-07 | dotyczy | ok: uproszczenia nazwane (D-1287 „dopuszczalne”, D-1306 jedna karta) |
| TRE-08 | dotyczy | 001, 003, 004, 005, 006, 011 |
| TRE-09 | nie dotyczy: brak faktów zmiennych w czasie (ceny, przepisy) w szkicach | — |
| TRE-10 | nie dotyczy: brak treści krytycznych (`krytyczne: false` we wszystkich użytych regułach) | — |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnych od lokalizacji | — |
| TRE-13 | dotyczy częściowo | ok: szkice poza produktem (D-1358); warunek 4 werdyktu 08-FD-5 |
| TRE-14 | dotyczy | ok: cytaty źródeł tylko w komentarzach i rejestrze, najwyżej 1–2 zdania; repo publiczne zgodnie z `CLAUDE.md` |

## Znaleziska (szczegóły)

### 06-tresci-001 · SC-15 uczy na flopie progu alpha jako normy obrony, sprzecznie z lekcją m6-l1 i z wynikiem solvera
- Pozycja listy kontrolnej: TRE-03 (zakres reguły rivera), TRE-08 (para zdań)
- Poziom: P1 (WYS) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-15.yaml:24` „jeśli {{t:fold|pasujesz}} częściej niż {{n:alpha.bet-third}}, rywal zarabia”; to samo w linii 22 i w en (sc-15, linie 20 i 22). Lekcja tego samego modułu oznacza tę tezę na flopie jako błędną: `content/pl/lessons/m6-l1-mdf-alpha.md:83` „Tak, inaczej Button zarabia każdą ręką”, z wyjaśnieniem „Na riverze tak by było”. Reguła R-M6-001 dotyczy rivera (rejestr: „przeciwnik betuje na riverze 1/3 puli”). GTO Wizard (szczebel 2, odczyt dziś, `dowody/fk-zrodla.txt`): “On average, BB is consistently over-folding to all bet sizes on the flop.”
- Mechanizm: wyjaśnienie defend łączy MDF/alpha z rivera z obroną na flopie; `grep -rn "alpha.bet-third" docs/tresci/szablony-robocze/fd` → 4 trafienia: pl/sc-15 linie 22 i 24; en/sc-15 linie 20 i 22.
- Powraca: nie (w lekcjach rozstrzygnięte w m6-l1 q-flop-mdf).
- Kroki w aplikacji: po wejściu SC-15 do bazy — BB, mały c-bet, wybór „pas” → wyjaśnienie podaje próg 25% jako granicę błędu.
- Opcje: (a) zastąpić klauzulę alpha brzmieniem lekcji i R-M6-003: „{{t:mdf}} ({{n:mdf.bet-third}}) to punkt odniesienia: na flopie {{t:out-of-position}} możesz bronić trochę mniej, ale na mały c-bet nie {{t:fold|pasujesz}} masowo” — zgodne ze szczeblem 2 i lekcją; (b) usunąć zdanie o MDF/alpha i zostać przy R-M6-006 — prostsze, ale SC-15 traci kotwicę M6. Rekomendacja: (a) (D-1411).
- Test akceptacyjny: `grep -n "alpha.bet-third" docs/tresci/szablony-robocze/fd/*/sc-15.yaml` → 0 trafień albo tylko w zdaniu „punkt odniesienia”; `fd-kontrola-szkicow.sh` kod 0.
- Status: naprawione-do-weryfikacji (sesja FN, commit 03609a6a; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-001` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-002 · SC-17 (i SC-07) podaje stały rozmiar zakładu i cenę, a generator stawia inny
- Pozycja listy kontrolnej: TRE-06
- Poziom: P1 (WYS) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: generator zaokrągla zakład do pełnych bb, `packages/poker-core/src/scenario-gen.ts:774` „const bet = Math.round(pot * pick(rng, spec.fractions));”. Przy `pots: [5, 6]` i `fractions: [0.75, 1]` (`docs/tresci/szablony-robocze/fd/pl/sc-17.yaml:18-19`) zakłady to 80%, 83% i 100% puli, potrzebne equity 30,8–33,3% (`dowody/fk-defend-rozmiary.txt`). Tekst `docs/tresci/szablony-robocze/fd/pl/sc-17.yaml:22` mówi „Wobec {{t:bet|zakładu}} ok. {{n:cbet.size.big}} {{t:pot|puli}} potrzebujesz już ok. {{n:eq.bet-three-quarters}} equity”, czyli 75% i 30%. Przy zakładzie pełnej puli liczba w wyjaśnieniu przeczy liczbie na ekranie. SC-07: pula 5 → zakład 2 = 40% (22,2%), tekst `docs/tresci/szablony-robocze/fd/pl/sc-07.yaml:23` 33% i 20%.
- Mechanizm: wyjaśnienie defend podaje rozmiar ze stałego klucza, a rozmiar wariantu bierze się z `fractions` i zaokrąglenia; `grep -rn "cbet.size" docs/tresci/szablony-robocze/fd/pl` → 4 trafienia: sc-07 l. 23, sc-15 l. 22, sc-17 l. 22, sc-20 l. 23 (SC-15 mówi warunkowo „przy zakładzie”, SC-20 ma rozmiary dokładne — 008).
- Powraca: nie.
- Kroki w aplikacji: SC-17, ziarno z pulą 6 i ułamkiem 1 → ekran: zakład 6 do puli 6; wyjaśnienie: „ok. 75% puli … ok. 30%”.
- Opcje: (a) SC-17 `fractions: [0.75]` i pule dające dokładny ułamek (np. 4, 8, 12 → 3, 6, 9); SC-07 pule 6, 9 (→ 2, 3) — liczba w tekście równa się ekranowi; zmienia tylko dane szablonu; (b) zdanie bez stałego rozmiaru: „Wobec dużego {{t:c-bet|c-betu}} potrzebujesz dużo equity (przy {{n:cbet.size.big}} {{t:pot|puli}}: {{n:eq.bet-three-quarters}})” — warunkowe jak SC-15, działa przy każdym rozmiarze, mniej konkretne; (c) wartości z wariantu w sekcji „Liczby” (08/04) — najdokładniejsze, wymaga kodu. Rekomendacja: (a) dla SC-07 i SC-17 (D-1412); (c) jako dalszy krok razem z 08-FD-1.
- Test akceptacyjny: dla każdego wariantu SC-07 i SC-17 (2000 ziaren) |bet/pot − ułamek z tekstu| < 0,02 albo tekst bez stałego rozmiaru.
- Status: naprawione-do-weryfikacji (sesja FN, commit 3c7a7a7a; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-002` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-003 · SC-09 pokazuje rywala „Big blind”, a sytuacja mówi, że limpował przed graczem z CO
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1 (WYS) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-09.yaml:9` „positions: { hero: CO, villain: BB }” i `:7` „Gracz przed tobą tylko wyrównał”. Ekran startu pokazuje pozycję rywala z szablonu: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:109` (`scenario.start.about`, „rywal: …”). Przed flopem BB działa po CO, więc nie może limpować przed nim. To samo w en `docs/tresci/szablony-robocze/fd/en/sc-09.yaml:6`.
- Mechanizm: pozycja rywala w szablonie nie jest sprawdzana względem kolejności akcji preflop; `grep -n "villain" docs/tresci/szablony-robocze/fd/*/sc-09.yaml` → 2 trafienia.
- Powraca: nie.
- Kroki w aplikacji: po wejściu SC-09 — ekran startu „Ty: Cutoff, rywal: Big blind” + sytuacja „gracz przed tobą wyrównał”.
- Opcje: (a) `villain: HJ` (najbliższa pozycja przed CO; izolacja jednego limpera z pozycją, bez dopłaty OOP — zgodne z `isoSizeStandardBb`) — jedna zmiana danych; (b) `villain: UTG` — też poprawne, dalej od CO. Rekomendacja: (a) (D-1412).
- Test akceptacyjny: test schematu albo kontrola szkiców: dla `iso-size` pozycja rywala działa preflop przed graczem (kolejność UTG, HJ, CO, BTN, SB, BB).
- Status: naprawione-do-weryfikacji (sesja FN, commit 70c7b3a9; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-003` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-004 · SC-23 pl: zakres rywala dwuznaczny („w kolorze” raz dla jednej ręki, raz dla wszystkich)
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-23.yaml:9` „z AA, KK, QQ, JJ, AK i AQ {{t:suited|w kolorze}}, a {{t:fold|spasuje}} z KQ, KJ, QJ, QT i JT {{t:suited|w kolorze}}”. Dane: `calls: [AA, KK, QQ, JJ, AKs, AKo, AQs]`, `folds: [KQs, KJs, QJs, QTs, JTs]` (`:21-22`). W drugiej liście „w kolorze” dotyczy wszystkich pięciu klas, w pierwszej tylko AQ; czytelnik stosujący ten sam odczyt uzna AK za tylko w kolorze (bez 12 kombinacji AKo), a od tej liczby zależy V. En jest jednoznaczne („AK and {{t:suited}} AQ”, „folds {{t:suited}} KQ…”).
- Mechanizm: jeden zdanie; `grep -n "w kolorze" docs/tresci/szablony-robocze/fd/pl/sc-23.yaml` → 1 linia (9).
- Powraca: nie.
- Kroki w aplikacji: SC-23 — liczenie blokerów z zakresu w sytuacji.
- Opcje: (a) „…sprawdzi z AA, KK, QQ, JJ, każdym AK i z AQ {{t:suited|w kolorze}}, a {{t:fold|spasuje}} z KQ, KJ, QJ, QT i JT, wszystkimi {{t:suited|w kolorze}}” — minimalna zmiana; (b) przenieść „w kolorze” przed listę („…spasuje z rękami w kolorze: KQ, KJ…”) — czytelniej, większa zmiana. Rekomendacja: (a).
- Test akceptacyjny: zdanie pl ma jeden możliwy odczyt (przegląd 06 przy wejściu 08-FD-5); przekład 09 z poprawionego pl i en.
- Status: naprawione-do-weryfikacji (sesja FN, commit cb1ae089; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-004` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-005 · SC-31: etykieta rywala bez „załóż” i odpowiedź zawsze call uczą wniosku z etykiety, nie z liczby
- Pozycja listy kontrolnej: TRE-08 (D-1300 war. 1 i 2)
- Poziom: P2 (ŚR) · Realność: realny · Pewność: średnia · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-31.yaml:6` „Ten rywal często {{t:bet|stawia}} i {{t:raise|przebija}}.” — stwierdzenie bez „załóż” (D-1300 war. 1 wymaga ramy założenia; „załóż” dotyczy w tym zdaniu tylko udziału blefów). Poziomy `:12-13` oba `expected: [call]`, `bluffShares` 0,35–0,55 (`:20`). Szablon nigdy nie pokazuje pasu wobec rywala z etykietą „agresywny”, więc uczy „agresywny → sprawdzaj” bez danych populacji (ADR-24 szczebel 5), choć wyjaśnienie samo nie uogólnia.
- Mechanizm: jedno miejsce (`grep -n "często" docs/tresci/szablony-robocze/fd/pl/sc-31.yaml` → 1).
- Powraca: nie.
- Kroki w aplikacji: SC-31 na obu poziomach — za każdym razem poprawny call.
- Opcje: (a) „Załóż, że ten rywal często stawia i przebija…” oraz poziom z pasem przy udziale blefów poniżej ceny (np. 0,25–0,3 przy zakładzie 1–1½ puli) — werdykt idzie za liczbą, etykieta jest tylko ramą; zmienia zakres szablonu; (b) tylko „Załóż, że…” — spełnia war. 1, wzorzec „zawsze call” zostaje; (c) usunąć zdanie o rywalu — SC-31 staje się SC-24 z większymi zakładami. Rekomendacja: (a) (D-1413); D-1352 odrzuciło pas „wobec rywala opisanego jako agresywny”, ale właśnie ten wariant pokazuje, że decyduje udział blefów.
- Test akceptacyjny: sytuacja zaczyna się ramą założenia; co najmniej jeden poziom z `expected: [fold]`; `fd-kontrola-szkicow.sh` kod 0 (pojemność).
- Status: naprawione-do-weryfikacji (sesja FN, commit b8da70f8; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-005` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-006 · SC-07 Ś: pas uzasadniony zdaniem mocniejszym niż reguła
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (ŚR) · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-07.yaml:25` „takie ręce ani nie wygrywają z {{t:bluff|blefami}}, ani nie mają się z czego poprawić”. Ręka bez pary i drawa poprawia się, trafiając parę (do 6 outów), a wysoka karta wygrywa z niższymi blefami; R-M6-006 mówi tylko „pasujesz najsłabszymi rękami bez pary i bez drawa”, uzasadnienie dotyczy rąk kontynuujących. Laik zapamięta fałsz „bez pary = nic się nie poprawi”.
- Mechanizm: `grep -rn "nie mają się z czego" docs/tresci/szablony-robocze/fd` → pl/sc-07 linia 25 i odpowiednik en.
- Powraca: nie.
- Kroki w aplikacji: SC-07 poziom średni, pas.
- Opcje: (a) skrócić do brzmienia reguły: „Wobec małego c-betu bronisz szeroko, ale najsłabsze ręce bez pary i bez drawa pasujesz” — bez nowego twierdzenia; (b) „rzadko wygrywają … i rzadko się poprawiają” — wymaga źródła na „rzadko”. Rekomendacja: (a).
- Test akceptacyjny: zdanie pas SC-07 nie zawiera zaprzeczenia bezwzględnego („ani … ani”); przegląd 06.
- Status: naprawione-do-weryfikacji (sesja FN, commit 2461866e; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-006` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-007 · SC-10: dla AKs w spocie CO wobec 3-betu BTN źródło spotu podaje call, a D-1354 tego nie nazywa
- Pozycja listy kontrolnej: TRE-03, TRE-05
- Poziom: P2 (ŚR) · Realność: brzegowy · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-10.yaml:20` „{ hands: [AKs, AKo], correct: "4bet", acceptable: [call] }”. Źródła R-M4-010 (odczyt dziś, `dowody/fk-zrodla.txt`): Upswing 4-bet 100% „in the above Button vs Big Blind example” (inny spot); Deepfold „AKs (mixed), AKo (mixed)”; Pailiku dla CO vs BTN: “4-bet QQ+, AKo, A5s-A4s Call JJ-77, AQs-ATs, AKs”. Sprzeczność na szczeblu 4; ADR-24: część wspólna albo oba zagrania poprawne (ADR-04). Skutek dla użytkownika mały (call z AK jest „dopuszczalny”, nie błąd), ale werdykt przechyla się na stronę źródła z innego spotu.
- Mechanizm: jedno miejsce; D-1354 (`docs/decyzje/FD.md:10`) cytuje tylko Upswing.
- Powraca: nie.
- Kroki w aplikacji: SC-10 z AKs, wybór „call” → „dopuszczalne”.
- Opcje: (a) AKs i AKo: oba zagrania poprawne (ręka mieszana, ADR-04), jeśli `list-hand` to obsługuje — zgodne z częścią wspólną; (b) zostawić werdykt i dopisać w D-1354 sprzeczność i rozstrzygnięcie („zwykle 4-bet” z R-M4-010) — bez zmiany działania. Rekomendacja: (b) teraz (zapis), (a) gdy silnik dopuści dwie poprawne akcje w `list-hand`.
- Test akceptacyjny: D-1354 (albo decyzja następcza) wymienia Pailiku CO vs BTN i rozstrzygnięcie.
- Status: naprawione-do-weryfikacji (sesja FN, commit 2b933eaf (dane bez zmian, D-1435; spec 08-FN-1); test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-007` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-008 · SC-20 i SC-17: rozmiar zakładu w szablonie, a w tekście klucz c-betu; „ćwierć puli” słowem
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-20.yaml:23` „przy {{t:bet|zakładzie}} {{n:cbet.size.big}} {{t:pot|puli}}” dla zakładu na turnie z `big: 0.75` (`:20`); `:25` „przy {{t:bet|zakładzie}} ćwierć {{t:pot|puli}}” — wielkość słowem poza `{{n:}}`. Dziś wartości równe (0,75), ale zmiana `cbet.size.big` w `content/numbers.yaml:184` (rozmiar c-betu na flopie) zmieni tekst SC-20 bez zmiany jego rozmiaru. Dla obrony podobną zgodność pilnuje komentarz/test (`packages/poker-core/src/scenario-gen.ts:1033`).
- Mechanizm: `grep -rn "cbet.size.big\|ćwierć" docs/tresci/szablony-robocze/fd/pl` → sc-17 l. 22, sc-20 l. 23 i 25.
- Opcje: (a) test równości `big`/`fractions` szablonu z wartością klucza użytego w tekście (jak dla DEFEND_BIG_MIN) — trwała kontrola; (b) osobny klucz rozmiaru zakładu na turnie i `{{n:}}` dla ¼ — czystsze, więcej kluczy. Rekomendacja: (a) przy 08-FD-1.
- Test akceptacyjny: test czerwony, gdy `cbet.size.big` ≠ `big` SC-20.
- Status: otwarte

### 06-tresci-009 · 08-FD-3 liczy tylko e = N/47, a konwencja D-1286 sprawdza dwie liczby
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/stan-fd.md:25` warunek z „e = N/47”; D-1286 dla turnu: pokazywana szansa N/46 wobec ceny małego i dokładne e = N/44 (obie ręce znane) wobec ceny dużego. Analog na flopie: N/47 i N/45. Rachunek własny (`dowody/fk-niezalezny.txt`): A z N/45 = 0,2000, marginesy +0,0333 / +0,0857; B i C bez zmiany werdyktu. Dziś bez skutku (czyste 9 outów), ale specyfikacja dla 08 powinna mówić to samo co D-1286.
- Mechanizm: jedno miejsce (spec 08-FD-3).
- Opcje: (a) dopisać do 08-FD-3: „cena ¼ < N/47 i N/45 < cena ⅔, oba z marginesem” — spójne z D-1286; (b) zostawić N/47 — prostsze, rozbieżne z turnem. Rekomendacja: (a).
- Test akceptacyjny: test 08-FD-3 z wektorami A–C sprawdza obie liczby.
- Status: otwarte

### 06-tresci-010 · Nagłówek SC-17 przypisuje artykuł o asie-high serwisowi pokercoaching
- Pozycja listy kontrolnej: TRE-04 (atrybucja)
- Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-17.yaml:2` „źródło pokercoaching When to Call With Ace-High”; adres w rejestrze R-M6-007 i w D-1353: upswingpoker.com/when-to-call-with-ace-high (otwarty dziś, HTTP 200). Komentarz nie trafia do aplikacji.
- Mechanizm: `grep -rn "pokercoaching When to Call" docs/tresci/szablony-robocze/fd` → pl/sc-17 linia 2 i en.
- Opcje: (a) poprawić na „Upswing” przy przeniesieniu; (b) zostawić — tylko komentarz. Rekomendacja: (a).
- Test akceptacyjny: nagłówek zgodny z rejestrem.
- Status: naprawione-do-weryfikacji (sesja FN, commit 62e01f31; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-010` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### 06-tresci-011 · SC-23: wyjaśnienia mówią trochę więcej niż kryterium wyboru ręki
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (NIS) · Realność: brzegowy · Pewność: średnia · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-23.yaml:25` „ta trzyma więcej kart z rąk, którymi rywal {{t:call|sprawdzi}}” — kryterium D-1054 to mniej kombinacji V, a nie więcej kart; linia 27 „która nie zasłania rąk do spasowania” — kryterium dopuszcza, że lepsza ręka blokuje tyle samo rąk pasujących (nie mniej F). Kryterium w kodzie: `packages/poker-core/src/scenario-gen.ts:1021`.
- Mechanizm: dwa zdania w jednym pliku (+ en).
- Opcje: (a) „ta zostawia rywalowi mniej {{t:combo|kombinacji}}, którymi {{t:call|sprawdzi}}, i nie mniej tych, które {{t:fold|spasuje}}” oraz „…która nie zasłania ich więcej” — zgodne z kryterium; (b) zostawić jako uproszczenie dydaktyczne i nazwać je w D-1351. Rekomendacja: (a) razem z 004.
- Test akceptacyjny: brzmienie zgodne z warunkiem `a.v < b.v && a.f >= b.f`.
- Status: naprawione-do-weryfikacji (sesja FN, commit 04289ccb; test `docs/tresci/narzedzia/fn-kontrola.mjs 06-tresci-011` czerwony przed, zielony po: `docs/tresci/dowody/fn-kontrola-przed.txt`, `fn-kontrola-po.txt`)

### FN-N1 (nowe w sesji FN, bez naprawy) · SC-24: wyjaśnienia napisane jak dla akcji poprawnej, a poziomy mają raz call, raz fold
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (ŚR) · Realność: realny (po wejściu SC-24 na ekran) · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-24.yaml:24` „Tu {{t:bluff|blefów}} jest więcej, niż wynosi potrzebne equity” i `docs/tresci/szablony-robocze/fd/pl/sc-24.yaml:26` „a tu jest ich mniej, niż wynosi potrzebne equity”; poziomy łatwy i trudny mają `expected: [call]`, średni `[fold]` (`docs/tresci/szablony-robocze/fd/pl/sc-24.yaml:12-14`). Ekran bierze jeden tekst na akcję bez względu na werdykt, więc na poziomie średnim wybór call pokazuje blok słabszej akcji z tekstem, że blefów jest więcej i sprawdzenie zarabia, czyli fałsz w tym rozdaniu; en tak samo (`apps/mobile/src/features/scenariusz/wariant.ts:374`).
- Mechanizm: `grep -n "Tu {{t:bluff|blefów}} jest więcej\|a tu jest ich mniej" docs/tresci/szablony-robocze/fd/pl/sc-24.yaml` → 2 trafienia (+ en).
- Opcje: (a) wyjaśnienia warunkowe jak SC-31 po D-1438 („sprawdzenie zarabia tylko wtedy, gdy…”) — sam tekst; (b) warunek wariantu w tekście (jak `nadkarty`, `scenario-gen.ts:986`) z flagą „blefów więcej/mniej” — dokładniej, wymaga kodu 08. Rekomendacja: (a).
- Test akceptacyjny: żaden tekst akcji SC-24 nie stwierdza kierunku nierówności bez warunku.
- Status: otwarte (zgłoszone koordynatorowi; poza zakresem FN)

## Do sprawdzenia
- Czy `list-hand` umie oznaczyć dwie akcje jako poprawne (007 opcja a) — nie sprawdzałem silnika ocen poza generatorem; pytanie do 08.
- Rozkład pozycji ręki w SC-23 (które pary rąk generator zestawia) i pojemność — kontrola szkiców kod 0 (2000 losowań) wystarcza do wejścia; jakości przykładów (np. czy często dwie ręce z asem) nie oceniałem.
- Sens przekładów en sprawdziłem w 7 z 10 plików (sc-07, sc-10, sc-24 tylko strukturalnie); różnic merytorycznych w przeczytanych brak poza 004 (dotyczy pl).

## Co działa dobrze i należy zachować
- Dyscyplina „tylko z rejestru”: szkice nie wprowadzają nowych twierdzeń; każda liczba przez `{{n:}}` (poza 008), nazwy klas bez cyfr (D-1351).
- Rachunki 08-FD-3/4 z wektorami granicznymi (B tuż pod marginesem, C z nieczystymi outami, D i F z lepszą ręką wśród pasujących) — dobrze pomyślane przypadki odrzucenia; odtworzone niezależnie.
- Wyjątek D-1356 nazwany i zastąpiony tańszą kontrolą (pełny `content:build` w kopii roboczej), skrypt powtarzalny (kod 0 u mnie).
- D-1357: wymóg widoczności danej zadania (udział blefów, cena) przed wejściem `river-catch` na ekran.

## Decyzje dla właściciela
Brak. Znaleziska 001–007, 009, 011 są merytoryczne (ADR-24, rozstrzyga rola 06: D-1411…D-1413 w `docs/decyzje/FK.md`), 008 i 010 wykonawcze. Werdykt wejścia SC-14 i SC-23: D-1410. Wszystkie do weta przez koordynatora.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-003,06-tresci-004,06-tresci-005,06-tresci-006,06-tresci-007,06-tresci-010,06-tresci-011` (szkice i decyzje, rola 06); `06-tresci-008` i `06-tresci-009` do roli 08 razem z 08-FD-1 i 08-FD-3.

Kolejność: najpierw 004 (+011), bo warunkuje wejście SC-23 (08-FD-5); potem 001, 002, 003, 005, 006 przed przeniesieniem SC-07, SC-09, SC-15, SC-17, SC-31 po widokach 04/08.

## Wynik kontroli
Wynik `sprawdz-raport.mjs`: wpisany po uruchomieniu (niżej).
