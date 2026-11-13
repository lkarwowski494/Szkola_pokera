# Recenzja niezależna HA (06-tresci, audit): SC-13/22/25/28/29 w `content/`, D-1566 i `build.ts` — Szkoła Pokera — 2026-11-13
Commit recenzowany: 0d59a42d (gałąź `claude/sesja-ha-tresci`, zgodny z poleceniem HD @ 457cb85a), zakres `7740eeab..0d59a42` · Sesja: HD · Tryb: audit (moduł kontrole-mechaniczne; tresci-krytyczne i historia-i-miejsca nie dotyczą: poker bez progów zdrowia, życia i prawa, bez miejsc i trudnej pamięci) · Środowisko: Linux, Node 22, pnpm 10.28, sieć przez proxy (strony źródeł pobrane `curl`), brak macOS/Xcode (nie dotyczy treści). Raportu autora (HA) nie czytałem przed własnym przeglądem; czytałem decyzje `docs/decyzje/HA.md` i dowody wskazane w poleceniu.

## Podsumowanie
Werdykt: **ODRZUCIĆ w obecnym kształcie — jedyny powód: 06-tresci-001 (WYS, SC-25)**. Pozostały zakres przyjmuję: SC-13, SC-22, SC-28 i SC-29 są merytorycznie poprawne w 2000/2000 wariantów na szablon (rachunek niezależny), zmiana `build.ts` z D-1566 nie osłabia bramki (3 mutanty giną), w żadnej z 35 baz nie zniknęło ID, a przekłady 10 języków przechodzą kontrolę mechaniczną bez błędu.

Najważniejsze ryzyko: SC-25 uczy „{{t:bet|Zakład}} traci”, a generator dopuszcza warianty, w których ręka z listy pasujących remisuje z graczem (575/2000). Taki remis po czekaniu dzieli pulę, a po zakładzie spasuje, więc zakład zyskuje pół puli. Wzór R-M8-001 tego nie liczy. Przy zakładzie 1/4 puli zakład jest lepszy od czekania w 152/2000 wariantów, przy 1/2 puli w 9/2000, a dopiero od ok. 0,53 puli w żadnym. To ten sam mechanizm, dla którego D-1302 odrzuca pasujące ręce lepsze od gracza („inaczej bet zyskuje dodatkowo pulę i wzór zaniża zysk”, `docs/decyzje/EX.md:8`).

Decyzji właściciela brak. Merytoryczne rozstrzygnąłem sam (D-1590…D-1592 w `docs/decyzje/HD.md`), wszystkie do weta przez koordynatora. Skala: KRYT = P0, WYS = P1, ŚR = P2, NIS = P2 bez zmiany działania.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 (WYS) | M | SC-25: „Zakład traci” fałszywe przy zakładzie ≤ ok. 0,53 puli, gdy ręka z listy pasujących remisuje (152/2000 przy 1/4 puli); ten sam brak w zdaniu SC-22 „nie liczysz ich w tym rachunku” | otwarte |
| 06-tresci-002 | P2 (NIS) | D | Warunek D-1410 „w jednym commicie, `pnpm run ci` kod 0”: commit treści 49fca211 sam ma czerwony test (naprawa w b15d37b1) | otwarte |

## Weryfikacja twierdzeń
Zakres: całość (5 szablonów pl + en, w każdym sytuacja i 2 wyjaśnienia; 5 reguł, na których stoją: R-M5-008, R-M8-001, R-M8-002, R-M9-008, R-M10-006; 5 kluczy liczb). Hierarchia: z `CLAUDE.md` (ADR-24). Skrypty: własne, bez narzędzi autora; tylko `generateVariant` jest wspólny, liczenie kombinacji i outów napisałem od nowa. Wyniki: `dowody/hd-rachunek.txt` (kod 0, 0 błędów), `dowody/hd-remisy.txt` (kod 0), `dowody/hd-sc13-strit.txt` (kod 0). Ziarna 1–2000, poziom `latwy` (jedyny w każdym szablonie). Źródła otwarte 2026-11-13, cytaty dosłowne na surowym tekście: `dowody/hd-zrodla.txt`.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| SC-13 sytuacja | `content/pl/scenarios/sc-13.yaml:10` | flop two-tone, silna ręka, rywal może mieć draw do koloru | rachunek: 2000 wariantów | — | POPARTE (2000/2000 two-tone, bez pary, 0 flopów z możliwym stritem) | ok | — | — |
| R-M5-008 (SC-13 bet-big) | `content/pl/scenarios/sc-13.yaml:26` | drawy mają dużo equity, więc duży zakład każe im drogo płacić | blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ (podsumowanie); pokercoaching.com/blog/bet-sizing-on-connected-boards-pot-it-or-slow-down/ | “Polarize with larger and less frequent bets on flops where draws are present but not yet completed.”; “Strong and vulnerable bets big, because every chip you charge a live draw…” | POPARTE (szczebel 2 + 4; zakres R-M5-008 zachowany, patrz wiersz wyżej) | ok | — | — |
| ceny SC-13 | `content/pl/scenarios/sc-13.yaml:26`, `:28` | 19,1% (9/47) < 29% (2/7); 17% (1/6) < 19,1% | rachunek: N = 9 w 2000/2000 (czyste outy), 9/45 = 0,200 < 2/7; 9/47 = 0,191 > 1/6; pokaz z bazy pl: „19,1%”, „17%”, „29%” | — | POPARTE | „trafia … w ok. 19,1%” i „cena … jest wyższa” razem: draw nie ma ceny na jedną kartę — prawda | — | — |
| R-M8-001 (SC-22, SC-28, SC-29 bet i check) | `content/pl/scenarios/sc-22.yaml:23`, `sc-28.yaml:25`, `sc-29.yaml:24` | wśród sprawdzających gorszych więcej niż lepszych; remis wśród sprawdzających nie zmienia rachunku | rachunek: w ∈ [0,600; 1] (SC-22, SC-29), [0,742; 1] (SC-28) | — | POPARTE (2000/2000; remis sprawdzający oddaje każdemu jego zakład, więc wynik = czekanie) | ok | — | — |
| R-M8-001 (SC-22 check) | `content/pl/scenarios/sc-22.yaml:25` | ręce pasujące nie płacą zakładu, więc nie liczysz ich | rachunek: 521/2000 wariantów z remisem wśród pasujących | — | CZĘŚCIOWO (remis pasujący daje zakładowi +½ puli; kierunek werdyktu ten sam) | — | patrz 001 | 001 |
| R-M8-001/002 (SC-25 check) | `content/pl/scenarios/sc-25.yaml:24` | większość sprawdzających to ręce lepsze; po czekaniu wygrywasz pulę z każdą gorszą | rachunek: lepsze > gorsze + remisy w 2000/2000 | — | POPARTE | ok | — | — |
| R-M8-001 (SC-25 bet) | `content/pl/scenarios/sc-25.yaml:26` | „Zakład traci” | rachunek: EV(zakład) − EV(czekanie) = k·(W − L) + T_pas/2 w jednostkach puli | — | SPRZECZNE w części wariantów (152/2000 przy k = 1/4, 9/2000 przy k = 1/2, 0 od k = 0,533) | „pasujące i tak nie wygrałyby” + „Zakład traci” sugerują, że pasujące nic nie zmieniają; remis pasujący zmienia | warunek generatora (D-1590) | 001 |
| R-M8-002 (SC-25 bet) | `content/pl/scenarios/sc-25.yaml:26` | zakład zamienia rękę z wartością przy showdownie w blef | blog.gtowizard.com/mastering-thin-value-bets-in-checked-down-pots/ | “those with too much showdown value to bluff but not so much value that they want to grow the pot” | POPARTE (kierunek; reguła heuristic) | patrz wiersz wyżej | — | — |
| R-M9-008 (SC-28 check) | `content/pl/scenarios/sc-28.yaml:27` | overparą trzecią ulicę wtedy, gdy rywal płaci słabszymi | upswingpoker.com/when-to-check-top-pair/ | “the stack-to-pot ratio (SPR) is too high to comfortably get 3 streets of value with many top pair hands” | POPARTE (kierunek; liczba ulic nazwana uproszczeniem w regule) | „a tu tak jest”: rachunek w ≥ 0,742 | — | — |
| R-M10-004/005 (SC-29 sytuacja) | `content/pl/scenarios/sc-29.yaml:8` | pasywny gracz rekreacyjny: VPIP od ok. 35%, PFR niższy o ponad 10 punktów | pokercoaching.com/blog/poker-stats/; deepfold.co/en/blog/hud-stats-guide | “6-max cash 22 to 28 35+”; “more than 10 points below their VPIP”; “35%+ Loose (likely recreational)”; “Gap > 10 → Passive player” | POPARTE (szczebel 4, dwa niezależne serwisy) | ok | — | — |
| R-M10-006 (SC-29 bet i check) | `content/pl/scenarios/sc-29.yaml:24`, `:26` | przeciw pasywnemu graczowi rekreacyjnemu betujesz dla wartości więcej rąk, także cieńszych | jw. | “bluff them less and value bet them more”; “Value bet thinly, never bluff river” | POPARTE (szczebel 4); część populacyjna reguły: patrz „Do sprawdzenia” | ok (D-1300: „Załóż”, wyjaśnienie mówi „tu”) | — | — |
| tekst en | `content/en/scenarios/sc-13.yaml:20`, `content/en/scenarios/sc-29.yaml:20` | jak pl | różnice szkic → content tylko D-1563 (liczba ceny) i D-1564 (znaczniki w en SC-29): `dowody/hd-szkice-tekst.txt` | — | POPARTE (sens i liczby jak pl; reszta en = szkice przyjęte w FS) | — | — | — |

## Linia bazowa i założenia
Linia bazowa od zera (soczewki po kolei, bez subagentów: zakres 5 szablonów nie uzasadniał kosztu kilku agentów). Najwyższy szczebel dla `river-value` to rachunek (szczebel 1), więc najlepsza w klasie wersja to taka, w której każde zdanie wyjaśnienia jest prawdą w każdym wylosowanym wariancie, także przy remisach i dowolnym rozmiarze zakładu, którego sytuacja nie podaje.
- **Fakty, liczby, reguły, zalecenia:** 5 kluczy liczb w tekście (`odds.flush.flop-turn`, `eq.bet-quarter`, `eq.bet-two-thirds`, `hud.vpip.loose`, `hud.gap.passive`), wszystkie przez `{{n:…}}`, policzalne formułą z `refs` (sprawdzone wyżej). Reguły: 5. Zalecenia: rozmiar zakładu (SC-13), bet/czekanie (pozostałe).
- **Progi krytyczne:** sprawdzone, brak (poker, bez zdrowia, życia, mienia; produkt bez hazardu).
- **Brakujące ostrzeżenia i granice stosowania:** jedna luka modelu, 001 (rozmiar zakładu nieznany, a werdykt SC-25 od niego zależy przy remisach). SC-13 nie mówi o implied odds. To zgodne z R-M7-006 i ceną na jedną kartę, nie jest znaleziskiem.
- **Warianty regionalne:** sprawdzone, brak (6-max cash online; progi HUD z serwisów dla 6-max, zakres zachowany).
- **Aktualność źródeł:** strony otwarte dziś, cytaty bez zmian względem rejestru reguł.
- **Trudna pamięć:** sprawdzone, nie dotyczy.
- **Pary zdań:** przeczytane we wszystkich 15 tekstach pl; jeden fałszywy wniosek pary (SC-25 bet, 001).
- **Jedno źródło / niski szczebel:** R-M10-004/005/006 stoją na szczeblu 4 (dwa serwisy) i populacji. Treść zachowuje atrybucję typu („Załóż”, D-1300).

Zmiana w rejestrze założeń: brak propozycji (`docs/zalozenia.md` nie ma pozycji o tych szablonach).

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/{pl,en}/scenarios/sc-{13,22,25,28,29}.yaml` (tekst, dane generatora) | tak, całość | czytanie + `dowody/hd-rachunek.txt`, `dowody/hd-remisy.txt`, `dowody/hd-sc13-strit.txt`, `dowody/hd-szkice-tekst.txt` |
| 10 przekładów (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant) | tylko mechanicznie (zadanie 3) | `dowody/hd-przeklady.txt` (55 plików, 0 błędów) |
| Reguły R-M5-008, R-M8-001, R-M8-002, R-M9-008, R-M10-004…006 i ich źródła | tak (źródła web otwarte dziś) | `dowody/hd-zrodla.txt` |
| `content/numbers.yaml` klucze użyte w szablonach | tak | pokaz z bazy pl/en/ja w tym raporcie (wiersz „ceny SC-13”) |
| `tools/content-build/src/build.ts` (D-1566), testy gb-303 i fv-d1461 | tak, mutanty | `dowody/hd-mutanty-d1566.txt` |
| `generator-odciski.json` | tak, przez `pnpm run ci` (test odcisków) | `docs/tresci/dowody/hd-ci-0d59a42d.txt` |
| 35 baz `apps/mobile/assets/content/*.db` (D-043) | tak | `dowody/hd-d043-bazy.txt` |
| `docs/decyzje/HA.md`, `docs/tresci/rejestr.json` (D-1560) | tak (czytanie; rachunek 2/7 powtórzony) | ten raport |
| Ekran aplikacji (widoki `flop-size`, `river-value`) | nie: poza zakresem 06 (wygląd 04, kod 08); środowisko bez symulatora | — |
| Populacja R-M10-006 (bluffaces MDA) | nie: strona-aplikacja JS, bez tekstu do przeczytania przez `curl` | „Do sprawdzenia” |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-ha-0d59a42.md . --rola 06-tresci` → wynik w `dowody/hd-sprawdz-raport.txt` (kod 0). `git diff --cached` przejrzany przed commitem: tylko `docs/tresci/**` i `docs/decyzje/HD.md`, bez sekretów i bez pełnych kopii cudzych stron (tylko krótkie cytaty).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy (projekt nie używa znaczników `[T:]`; ogniwo zdanie → reguła/klucz liczby przez pole `rule` i `{{n:…}}`) | ok: każde zdanie ma regułę albo rachunek |
| TRE-02 | dotyczy | 001 |
| TRE-03 | dotyczy (zakres R-M5-008: flop bez pary i bez strita; progi HUD: 6-max) | ok (0/2000 poza zakresem) |
| TRE-04 | dotyczy | ok (szczebel 4 tylko z dwoma serwisami i ramą „Załóż”) |
| TRE-05 | dotyczy (D-1417/D-1472 wobec rachunku) | 001: D-1417 w części „remis z pasującą nie odrzuca” wraca do sprawdzenia (D-1590) |
| TRE-06 | dotyczy | ok: liczby tylko `{{n:…}}`, pokaz 19,1% / 17% / 29% / 35% / 10 zgodny z rachunkiem; 2/7 vs 0,285714347 (zapis 0,666667) bez zmiany pokazu |
| TRE-07 | dotyczy (uproszczenie: konwencja e = N/47, D-1421) | ok: kierunek zgodny, 9/45 też < 2/7 |
| TRE-08 | dotyczy | 001 (para zdań SC-25 bet) |
| TRE-09 | nie dotyczy: brak faktów zmiennych w czasie w tych tekstach | — |
| TRE-10 | nie dotyczy: brak treści krytycznych (moduł tresci-krytyczne nie dotyczy) | — |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy (bazy w repo = wynik builda, D-1565) | ok: `content:check` w `pnpm run ci` kod 0 (`docs/tresci/dowody/hd-ci-0d59a42d.txt`) |
| TRE-14 | dotyczy (repo publiczne) | ok: w produkcie własne zdania; cytaty tylko w polach `source` reguł, krótkie |
| Warunki D-1410 (polecenie, zad. 1) | dotyczy | 002 (jeden commit); przekład agenta zamiast 09 nazwany w D-1564 |

## Znaleziska

### 06-tresci-001 · SC-25 mówi „Zakład traci”, a przy małym zakładzie i remisie z ręką pasującą zakład jest lepszy od czekania
- Pozycja listy kontrolnej: TRE-02 (też TRE-08, para zdań; TRE-05, decyzja D-1417)
- Poziom: P1 (WYS: błędne twierdzenie merytoryczne w części wariantów)
- Realność: realny (575/2000 wariantów SC-25 ma remis wśród pasujących; werdykt odwraca się przy zakładzie ≤ ok. 0,53 puli) · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-25.yaml:26` „traci: większość rąk, które”; generator odrzuca tylko pasującą rękę lepszą, nie remisującą: `packages/poker-core/src/scenario-gen.ts:867` „D-1302 war. 2: lepsza ręka wśród pasujących”; `docs/decyzje/FL.md:8` „remis z pasującą nie odrzuca”. Rachunek `dowody/hd-remisy.txt` (kod 0): „EV(bet) > EV(check) przy zakładzie 1/2 puli: 9, przy zakładzie = pula: 0, przy 1/4 puli: 152; najmniejszy zakład (ułamek puli), od którego czekanie jest lepsze we wszystkich wariantach: 0.533”. Przykład z tego pliku (ziarno 4): gracz Q♥2♥, stół K♥ Q♠ 4♣ 8♠ 8♦, QJ remisuje (Q Q 8 8 K).
- Mechanizm: wzór R-M8-001 liczy tylko ręce sprawdzające, a remis pasujący po czekaniu dzieli pulę, po zakładzie oddaje ją całą (+½ puli na kombinację). Grep zdań o pasujących w `river-value`: `grep -n "spasują" content/pl/scenarios/sc-2*.yaml` → `sc-22.yaml:25` („nie liczysz ich w tym rachunku”: 521/2000 wariantów, kierunek werdyktu zgodny, ale zdanie nieprawdziwe), `sc-25.yaml:26` (werdykt odwrócony w części wariantów); SC-28: 0 remisów wśród pasujących; SC-29: 293/2000, bez zdania o pasujących. Przekłady: te same zdania w 11 językach.
- Powraca: tak: ta sama klasa co FS 06-tresci-002 (remis pasującej; poprawka D-1472 zmieniła brzmienie, nie model) → trwała kontrola: test content-build „0 wariantów river-value z remisem wśród pasujących na 2000 ziarnach”.
- Wzorzec lub źródło: rachunek (szczebel 1); D-1302 (`docs/decyzje/EX.md:8` „inaczej bet zyskuje dodatkowo pulę i wzór zaniża zysk”) — ten sam powód dotyczy remisu (½ puli).
- Kroki w aplikacji: moduł M8 → SC-25 → wybór „Zakład” → wyjaśnienie „Zakład traci…” w wariancie z remisem wśród pasujących i małą stawką w myśli użytkownika (sytuacja nie podaje rozmiaru).
- Opcje: (a) 08: rozszerzyć war. 2 D-1302 o remis wśród pasujących dla wszystkich `river-value` (jedna linia: `.better > 0 || .ties > 0`), nowe odciski SC-22/25/29, kontrola pojemności (limit 60 000) — wzór staje się dokładny, zdania SC-22 i SC-25 prawdziwe bez zmiany tekstu; (b) jak (a), ale tylko dla poziomów z `expected: check` — mniejszy ubytek wariantów, SC-22 zostaje nieprecyzyjne; (c) wycofać SC-25 z `content/` do czasu (a) — zero ryzyka, M8 bez szablonu „średnia ręka”; (d) podać rozmiar zakładu w sytuacji SC-25 (np. pula) — tekst się wydłuża, a wzór R-M8-001 dalej pomija remis. Rekomendacja: (a) (D-1590).
- Test akceptacyjny: `dowody/hd-remisy.txt` po naprawie: „warianty z remisem wśród pasujących 0/2000” dla SC-22, SC-25, SC-29; nowy test w `tools/content-build/test/` czerwony na 0d59a42 z powodu remisu, zielony po zmianie; `pnpm run ci` kod 0.
- Status: otwarte

### 06-tresci-002 · Commit treści 49fca211 sam w sobie ma czerwony test, wbrew warunkowi D-1410 „w jednym commicie, `pnpm run ci` kod 0”
- Pozycja listy kontrolnej: — (warunek D-1410 z polecenia; poza listą TRE)
- Poziom: P2 (NIS)
- Realność: brzegowy (dotyczy tylko bisectu albo wybiórczego przeniesienia 49fca211) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/decyzje/HA.md:12` „pierwsze `pnpm run ci`: 1 czerwony, `test/gb-303-zarezerwowane-uzyta.test.ts`”; naprawa w następnym commicie b15d37b1; `docs/decyzje/FK.md:6` „08-FD-5 w jednym commicie”.
- Mechanizm: test GB-303 zależał od wpisów listy, które D-1562 usunął w tym samym commicie; `git log 7740eeab..0d59a42` → 4 commity, czerwony tylko 49fca211.
- Powraca: nie
- Wzorzec lub źródło: D-1410.
- Kroki w aplikacji: brak (repo).
- Opcje: (a) przy scaleniu złączyć 49fca211 i b15d37b1 w jeden commit (koordynator) — warunek spełniony dosłownie; (b) zostawić, zapisać jako wyjątek — historia mówi prawdę, bisect ma jeden czerwony punkt. Rekomendacja: (b), bo HEAD jest zielony, a przepisywanie historii nie jest w zakresie sesji.
- Test akceptacyjny: zapis wyjątku w decyzjach koordynatora albo jeden commit treści z zielonym `pnpm run ci`.
- Status: otwarte

## Do sprawdzenia
- **Populacja R-M10-006** (`https://bluffaces.com/calculators/mda/`): strona to aplikacja w JS, a `curl` nie zwraca tekstu z liczbami WTSD i wygranych showdownów. Część „betujesz więcej rąk, także cieńszych” stoi na dwóch serwisach szczebla 4 przeczytanych dziś. Krok: ręczny odczyt filtrów w przeglądarce przy najbliższym audycie M10 (nie blokuje: reguła istniała przed HA, a HA jej nie zmienia).
- **Ocena językowa 10 przekładów** należy do roli 09; poniżej lista miejsc niepewnych (zadania 09). Pewność, że to błędy: ≤ 80%.
  - 09-HD-1: `second-pair` w de jako „Second Pair” (angielska etykieta w tekście niemieckim; `content/de/terms-nazwy.yaml:86` ma „[WIELE FORM] [DO USTALENIA]”); es/fr/it/vi/zh-Hant/ja/ko — formy do potwierdzenia.
  - 09-HD-2: `recreational`: de „Freizeitspieler”, ja „レクリエーショナルプレイヤー”, ko „레크리에이션 플레이어”, es/pt/pt-BR bez formy (etykieta z `terms-nazwy` [DO USTALENIA]).
  - 09-HD-3: ułamki słownie w SC-13: ja „三分の二”, „四分の一”; ko „삼분의 이”, „사분의 일” (cyfry poza `{{n:}}` są zakazane, więc forma słowna jest wymuszona; naturalność do oceny).
  - 09-HD-4: zaimek drawa w SC-13 bet-small: vi „nó cần”, zh-Hant „它只要有”; szyk ja/ko „エクイティ{{n:…}}”, „에퀴티 {{n:…}}”.

## Co działa dobrze i należy zachować
- SC-13: czyste outy wymuszone generatorem dają N = 9 w 2000/2000 wariantów, więc pokazane 19,1% jest dokładne dla konwencji, a nierówności 9/47 > 1/6 i 9/45 < 2/7 zachodzą zawsze. Zakres R-M5-008 (bez pary, bez strita) jest pilnowany: 0/2000 poza zakresem.
- Wyjaśnienia `river-value` mówią „remis dzieli pulę i nie zmienia rachunku” tylko o rękach sprawdzających, a tam to prawda.
- SC-29 trzyma D-1300: rama „Załóż”, typ rywala progami z dwóch serwisów, reguła exploit cytowana tylko z R-M10-006.
- D-1566 nie osłabia bramki (mutanty M2, M3 i M4 giną; produkcja nie podaje opcji: `grep -rn liczbyZarezerwowane` → tylko `build.ts` i test).
- Dane generatora identyczne ze szkicami, a różnice tekstu ograniczają się do dwóch nazwanych decyzji (`dowody/hd-szkice-tekst.txt`).
- D-043: 35/35 baz, żadne ID nie zniknęło, przybyło dokładnie 5 scenariuszy (`dowody/hd-d043-bazy.txt`).

## Decyzje dla właściciela
Brak decyzji produktowych. Do weta przez koordynatora (`docs/decyzje/HD.md`):
- D-1590 (M): w `river-value` remis ręki z listy pasujących odrzuca wariant (zmienia D-1417 w części „remis z pasującą nie odrzuca”; zmienia D-1472, opcja odrzucona (b) przyjęta).
- D-1591 (A): D-1566 utrzymana. Prostsza opcja zgodna z poleceniem istniała: test mógł na czas testu dopisać klucz do eksportowanego obiektu `LICZBY_ZAREZERWOWANE` (bez zmiany `src/`). Odrzucam ją, bo zmienia stan modułu współdzielony przez testy i obchodzi typ `Readonly`. Zmiana w `src/` to jedno pole opcji i jedna linia (`tools/content-build/src/build.ts:486` „(opts.liczbyZarezerwowane ?? LICZBY_ZAREZERWOWANE)[key]”), jak istniejące opcje testowe.
- D-1592 (A): werdykt ODRZUCIĆ do poprawki 001; reszta zakresu przyjęta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001` (z D-1590; kod generatora i odciski: zadanie dla 08 — `08-programista-HD-1`: w `packages/poker-core/src/scenario-gen.ts:867` warunek `classComboSplit(hero, board, spec.folds)` z `.better > 0 || .ties > 0`, test najpierw czerwony na 0d59a42, nowe odciski SC-22/25/29, kontrola limitu odrzuceń). 06-tresci-002: decyzja koordynatora przy scaleniu. Przekłady: zadania 09-HD-1…4.

`git status --porcelain` repo aplikacji na początku: pusty; na końcu: tylko pliki tej recenzji (`docs/tresci/**`, `docs/decyzje/HD.md`) przed commitem. Repo treści prywatnych: brak (`CLAUDE.md`).
