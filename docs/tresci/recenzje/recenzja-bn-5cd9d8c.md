# Recenzja niezależna pracy BN (KO-040: powody z klasy ręki, nowe reguły, egzaminy): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-10
Commit: 5cd9d8c (= `origin/sesja-bn-wyjasnienia`), przedmiot `git diff 02b1fe1..5cd9d8c` (81 plików) · Tryb: audit (rola 06, sesja BP, polecenie koordynatora `docs/koordynacja/polecenia/BP.md` @ d9d0911) · Środowisko: Linux 6.18, Node 22.23, pnpm 10.28; `pnpm install --frozen-lockfile` kod 0, `pnpm content:build` kod 0, `pnpm run ci` kod 0; sieć do źródeł działa (curl, HTTP 200); bez macOS i Xcode (niepotrzebne do tej recenzji).

Zgodnie z poleceniem `docs/tresci/stan-bn.md` i `docs/tresci/dowody/bn-*` przeczytałem dopiero po własnej ocenie (po E1). Porównanie z nimi jest w polu „Powraca” znalezisk.

## Podsumowanie
**Werdykt: przyjąć z warunkiem.** Warunek: przed wydaniem naprawić 06-tresci-001 (WYSOKIE). Uzasadnienie R-M3-012 mówi, że ręka zdominowana „wygrywa … rzadziej” niż ręka, która ją dominuje. Dokładny rachunek (pełny przegląd 1 712 304 boardów, dwa niezależne ewaluatory) obala to dla ręki zdominowanej w kolorze: A2s wobec A3o wygrywa 455 224 razy, a przegrywa 452 274 razy. Test autora sprawdza tylko ręce w różnych kolorach, a tego zastrzeżenia nie ma w treści reguły. Poprawka to jedno słowo albo jedno zastrzeżenie w 12 językach i w rejestrze.

Reszta jest w porządku. Najważniejsze: niezależny skrypt przeszedł wszystkie 2417 par spot × klasa, w których działa powód z klasy ręki. Żaden powód nie przeczy decyzji, a każda cecha jest prawdziwa dla swojej ręki: liczba stritów liczona od nowa, odsetek flopów z kartą wyższą z pełnego przeglądu, „lepszy kicker” istnieje. Poprawne odpowiedzi egzaminów i klucze `{{n:}}` są bez zmian, `numbers.yaml` bez zmian, a M12 nietknięte.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 · WYSOKIE | M | R-M3-012: „ręka zdominowana wygrywa … rzadziej” jest fałszywe dla ręki zdominowanej w kolorze (A2s wobec A3o, K2s wobec K3o) | otwarte; test czerwony dopisany |
| 06-tresci-002 | P2 · ŚREDNIE | M | Powód „ręka zdominowana” pada przy dwóch wysokich kartach (QJo, KTo, QTo, JTo; 18 par), choć R-M3-012 wyłącza je w warunku („dwie wysokie karty działają odwrotnie”); ta sama klasa w innym spocie dostaje powód „wysoki kicker” | otwarte |
| 06-tresci-003 | P2 · ŚREDNIE | M | Powód all-in „twoja wyższa karta to 10/J” podaje słabą cechę jako argument za grą; źródło R-M11-013 mówi tylko o zasadach rozstrzygania | otwarte |
| 06-tresci-004 | P2 · ŚREDNIE | M | R-M11-013: część „nie ma już zakładów” nie ma w rejestrze przeczytanego źródła (źródło szczebla 1 istnieje: TDA, reguła 17) | otwarte |
| 06-tresci-005 | P2 · NISKIE | M | Nienazwane uproszczenie: „wygrywa wyższa karta”, „kicker … bije” pomijają karty stołu (pula dzielona, kicker bez znaczenia) | otwarte |
| 06-tresci-006 | P2 · NISKIE | D | Wyjaśnienia 6 opcji egzaminów zmienione tylko po polsku; w 11 językach stara kolejność, a w m11 brak nowego zdania powodu | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 3, NISKIE 2.

## Weryfikacja twierdzeń
Zakres: całość nowych i zmienionych twierdzeń z diffu: 5 nowych reguł, `because` R-M2-005, 8 powodów `drill.range.hand.*`, `pushSbDeep` i 6 wyjaśnień egzaminów. Dla powodów z klasy ręki: wszystkie pary spot × klasa z bazy pl (skrypt). · Hierarchia: z CLAUDE.md (ADR-24) · Skrypty: `dowody/bn-5cd9d8c-powody-reki.txt` (kod 0, 2417 par, 0 źle, 0 bez powodu), `dowody/bn-5cd9d8c-egzaminy.txt` (kod 0), `dowody/bn-5cd9d8c-equity-dominacja.txt`, źródła: `dowody/bn-5cd9d8c-zrodla.txt` (wszystkie otwarte 2026-11-10, cytaty sprawdzone grepem na surowym tekście).

| ID | Zdanie (plik:linia) i cytat | Źródło otwarte dziś | Werdykt | Para zdań | Znalezisko |
|---|---|---|---|---|---|
| R-M2-005 because | `content/pl/rules.yaml:114` „zwraca się tylko wtedy, gdy wygrywasz co najmniej tak często, jak wymaga cena” | rachunek EV(call) = eq·(P + 2B) − B; EV < 0 ⇔ eq·(P + 2B) < B, czyli średnio wpłacasz więcej, niż odzyskujesz | POPARTE (bez tautologii) | ok | — |
| R-M3-011 | `content/pl/rules.yaml:212` „sąsiednie karty od 5-4 do J-T są w czterech różnych” | własny przegląd 10 stritów dla 169 klas (`dowody/bn-5cd9d8c-skrypt-powody.ts.txt`); 5-4 = 4, J-T = 4, Q-J = 3, 5-3 = 3, Q-T = 3, 4-2 = 2, 7-2 = 0, A-6 = 0; definicja strita: OAG, s. 2, „five cards that are in consecutive ranking”, „5, 4, 3, 2 and Ace is the lowest ranked Straight” | POPARTE | ok | — |
| R-M3-012 then | `content/pl/rules.yaml:220` „rywal z lepszym {{t:kicker|kickerem}} cię bije (twoja ręka jest zdominowana)” | pokerskill.com/poker-glossary/dominated-hand: „A dominated hand occurs when two players share a high card, but one has a worse kicker.” | POPARTE (uproszczenie: karty stołu, 06-tresci-005) | koliduje z użyciem w aplikacji przy dwóch wysokich kartach | 06-tresci-002, 06-tresci-005 |
| R-M3-012 because | `content/pl/rules.yaml:221` „ręka zdominowana wygrywa z ręką, która ją dominuje, rzadziej niż ona” | rachunek dokładny (`dowody/bn-5cd9d8c-equity-dominacja.txt`): w różnych kolorach 0,31–0,47; ręka zdominowana w kolorze: A2s–A3o 0,5009, K2s–K3o 0,5004, Q2s, J2s, T2s 0,5003–0,5004; upswingpoker.com (vs 3-bet): „the frequency at which they are dominated makes them very difficult to play” | SPRZECZNE dla rąk w kolorze, POPARTE dla rąk w różnych kolorach | — | 06-tresci-001 |
| R-M3-013 | `content/pl/rules.yaml:228` „na flopie zwykle pada co najmniej jedna karta wyższa od obu” | pełny przegląd flopów (skrypt): przy dziewiątce 0,7929, przy ósemce 0,8673, niżej więcej; „zwykle” = ≥ 0,75 (`oftenKey`) | POPARTE | ok | — |
| R-M3-014 | `content/pl/rules.yaml:236` „ręka bez {{t:pair|pary}}, żeby ją pobić, potrzebuje pomocy” | OAG, s. 2: One Pair „two cards of the same rank” stoi nad High Card | POPARTE | ok | — |
| R-M11-013 then | `content/pl/rules.yaml:1177` „nie ma już {{t:bet|zakładów}}: rozdanie rozstrzyga sam układ” | ranking: OAG, s. 2 (High Card); all-in: TDA reguła 17 „All hands will be tabled without delay once a player is all-in and all betting action by all other players in the hand is complete” (brak w rejestrze) | POPARTE, źródło części all-in niezapisane; „wygrywa wyższa karta” to uproszczenie | ok | 06-tresci-004, 06-tresci-005 |
| hand.pair | `apps/mobile/src/i18n/locales/pl.json:753` „czyli gotowy układ już przed flopem” | R-M3-014 | POPARTE (161 par) | ok | — |
| hand.high | `apps/mobile/src/i18n/locales/pl.json:754` „druga karta to wysoki {{t:kicker}}, który bije słabsze ręce” | R-M3-012 then | POPARTE (244 pary) | „bije” bez kart stołu | 06-tresci-005 |
| hand.suited | R-M3-005 (spoza diffu) | R-M3-005 „daje dodatkową drogę do wygranej” | POPARTE (252 pary) | ok | — |
| hand.connected | liczba z `handFeatures`, równa własnemu przeglądowi | R-M3-011 | POPARTE (12 par, 3–4 strity) | ok | — |
| hand.highAllIn | `apps/mobile/src/i18n/locales/pl.json:760` „a twoja wyższa karta to {{rank}}” | R-M11-013 (zasady rozstrzygania, nie siła ręki) | CZĘŚCIOWO (113 par) | wniosek „wysoka karta = powód gry” bez źródła; przy 10/J mylący | 06-tresci-003 |
| hand.dominated | `apps/mobile/src/i18n/locales/pl.json:761` „rywal z tą samą kartą i lepszym {{t:kicker|kickerem}} cię bije” | definicja pokerskill; AK nigdy nie dostaje tego powodu (skrypt) | POPARTE (781 par) | przy QJo, KTo, QTo, JTo sprzeczne z R-M3-012 if/then | 06-tresci-002 |
| hand.overcards / overcardsPair | `apps/mobile/src/i18n/locales/pl.json:762` „pada co najmniej jedna karta wyższa od obu twoich” | R-M3-013; odsetek z `overcardFlop` równy pełnemu przeglądowi (np. 22: 100%, zawsze; poprawne) | POPARTE (845 par) | ok | — |
| pushSbDeep | `apps/mobile/src/i18n/locales/pl.json:750` „ryzykujesz więcej względem blindów” | R-M11-002 then (im krótszy stack, tym więcej rąk) i because, odwrócone; tylko przy rękach poza zakresem (kierunek tight) | POPARTE | ok | — |
| egzaminy ×6 | m6 l.17 i 47, m9 l.10 i 45, m11 l.25 i 66 | te same twierdzenia, zmieniona kolejność (sens, potem rachunek); m11 l.25 i 66: zdania z istniejących złych opcji tego samego zadania; rachunek geometrii w m9 l.45 sprawdzony (SPR 4, bet = pula, po sprawdzeniu pula ×3, drugi bet = cały stack) | POPARTE | ok | 06-tresci-006 (przekład) |

Skrypt modułu `kontrole-mechaniczne` (`kontrole-tresci.mjs` z promptu roli) nie był uruchamiany: treść projektu jest w YAML i JSON bez znaczników `[T:…]`, a projekt ma własną kontrolę rejestru `pnpm tresci:rejestr` (część `pnpm run ci`, wynik „0 błędów, 0 uwag”, `dowody/bn-5cd9d8c-ci.txt`). Poprawka regexu `LICZBA` w prompcie roli (wiadomość koordynatora 2026-11-10) nie zmienia więc wyników tej recenzji.

## Linia bazowa i założenia
Linia bazowa (przed czytaniem argumentów autora): dobre wyjaśnienie „dlaczego” przy decyzji preflop podaje cechę ręki, która naprawdę decyduje w tym spocie (siła na showdownie, grywalność po flopie, dominacja, blokery, cena), a nie tylko cechę prawdziwą. Wzorzec: serwisy solverów i szkoleniowe (upswingpoker.com, „Offsuit hands with big gaps … dominated”) tłumaczą pas dominacją i słabą grywalnością, a sprawdzenie all-in ceną i zakresem rywala. Wynika z tego, że prawdziwość cechy to warunek konieczny, ale niewystarczający: cecha musi też być powodem tej decyzji (06-tresci-003).

Wymiary pokrycia:
- Kategorie twierdzeń (fakty, liczby, reguły, mechaniki): sprawdzone wszystkie z diffu, tabela wyżej.
- Progi krytyczne dla zdrowia, mienia, prawa: sprawdzone, brak w diffie (M12 i treści krytyczne nietknięte).
- Brakujące ostrzeżenia i granice stosowania: highAllIn nie mówi o cenie sprawdzenia (06-tresci-003); poza tym brak.
- Jednostki i warianty regionalne: przekład en, de, ja (próbka) zachowuje sens, liczby i granice; ja i de: forma rangi `{{rank}}` jak w zapisie rąk.
- Aktualność źródeł: wszystkie źródła otwarte 2026-11-10; fakty zmienne (ceny, przepisy) w diffie: brak.
- Trudna pamięć: nie dotyczy (dziedzina: teoria pokera).
- Pary zdań: sprawdzone we wszystkich ośmiu powodach i sześciu egzaminach; znaleziska 002, 003.
- Jedno źródło albo niskie szczeble: R-M3-012 część heurystyczna opiera się na szczeblu 4 (pokerskill, upswing) plus rachunku; zapisane w rejestrze `docs/tresci/rejestr/bn.json`.

Soczewki: laik czytający dosłownie (06-tresci-001, 005), ekspert szukający szkodliwych uproszczeń (002, 003), sceptyczny weryfikator otwierający źródła (004), osoba z innego języka (006). Subagentów nie użyłem: zakres to jeden diff, a skrypty dają niezależność od testów autora.

Proponowane zmiany w rejestrze założeń: brak.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `hand-reasons.ts`, `range-reasons.ts`, `text.ts`, `engine.ts` (diff) | tak, przeczytane w całości | `dowody/bn-5cd9d8c-powody-reki.txt` |
| Wszystkie 34 spoty × 169 klas (bez klas niepewnych i mieszanych) z bazy pl | tak, skryptem: 2417 par z powodem z klasy ręki, 3057 z powodem spotu | `dowody/bn-5cd9d8c-powody-reki.txt` |
| `content/pl/rules.yaml` (5 nowych reguł, R-M2-005) i ich źródła | tak, źródła otwarte i zgrepowane | `dowody/bn-5cd9d8c-zrodla.txt` |
| Twierdzenie o equity ręki zdominowanej | tak, dokładnie (dwa ewaluatory) | `dowody/bn-5cd9d8c-equity-dominacja.txt` |
| Egzaminy m6, m9, m11 pl: odpowiedzi, klucze `{{n:}}` | tak, skryptem (14 plików, 350 opcji) | `dowody/bn-5cd9d8c-egzaminy.txt` |
| Przekład en, de, ja (pl.json `drill.range.hand.*`, `pushSbDeep`, rules.yaml) | tak, próbka według polecenia | ten raport, 06-tresci-006 |
| Przekład pozostałych 8 języków | nie, zostaje dla roli 09 | — |
| `docs/tresci/rejestr/bn.json`, `docs/decyzje.md` (D-595, D-596) | tak, przeczytane | — |
| M12 i treści krytyczne | tak: 0 zmienionych linii z „M12” w `content/`, i18n i rejestrze | `git diff 02b1fe1..5cd9d8c` |
| `pnpm content:build`, `pnpm run ci` | tak, kody 0 | `dowody/bn-5cd9d8c-content-build.txt`, `dowody/bn-5cd9d8c-ci.txt` |
| Ekran aplikacji (render na urządzeniu) | nie, tekst sprawdzony na danych i szablonach; render nie zmienia treści | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-bn-5cd9d8c.md . --rola 06-tresci` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0 (przebieg końcowy, 2026-11-10).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każdy nowy powód ma regułę (`HAND_REASON_RULE`), każda reguła wpis w `bn.json` |
| TRE-02 | dotyczy | 06-tresci-004 (część all-in bez źródła w rejestrze); reszta POPARTE |
| TRE-03 | dotyczy | 06-tresci-001 (zakres „w różnych kolorach” zgubiony), 06-tresci-002 (reguła użyta poza warunkiem) |
| TRE-04 | dotyczy | ok: szczebel 4 tylko obok rachunku, nie jako jedyne źródło |
| TRE-05 | dotyczy | ok: brak sprzecznych źródeł jednego szczebla |
| TRE-06 | dotyczy | ok: `numbers.yaml` bez zmian, klucze `{{n:}}` w egzaminach te same, odsetki liczone w kodzie |
| TRE-07 | dotyczy | 06-tresci-005 |
| TRE-08 | dotyczy | 06-tresci-003; przekład: 06-tresci-006 |
| TRE-09 | nie dotyczy: brak faktów zmiennych w diffie | — |
| TRE-10 | dotyczy (M12) | ok: M12 nietknięte, przegląd zastępczy D-027 nie unieważniony |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnych od lokalizacji | — |
| TRE-13 | dotyczy | ok: baza po `content:build` zgodna z plikami (status czysty po buildzie) |
| TRE-14 | dotyczy | ok: cytaty ze źródeł po 1–2 zdania, tylko w polu `source` |

## Znaleziska (szczegóły)

### 06-tresci-001 · R-M3-012 uczy, że ręka zdominowana zawsze wygrywa rzadziej, a ręka zdominowana w kolorze wygrywa częściej
- Pozycja listy kontrolnej: TRE-03
- Poziom: P1 (WYSOKIE: błędne twierdzenie merytoryczne)
- Realność: brzegowy (dotyczy rąk w kolorze z niskim kickerem; reguła jest w bazie treści, ale dziś nie ma jej w `rules` żadnej lekcji, więc `RuleCard` jej nie pokazuje) · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:221` „ręka zdominowana wygrywa z ręką, która ją dominuje, rzadziej niż ona”; dokładny przegląd 1 712 304 boardów: As2s wobec Ad3c wygrane 455 224, przegrane 452 274, equity 0,5009; Ks2s wobec Kd3c 0,5004 (`dowody/bn-5cd9d8c-equity-dominacja.txt`, ewaluator własny i `compareHands` z `packages/poker-core`); test odtwarzający czerwony: `dowody/bn-5cd9d8c-test-czerwony.txt` (2 failed, kod 1).
- Mechanizm: zakres rachunku z pola `source` („wszystkie pary rąk w różnych kolorach”) nie przeszedł do `because`; test autora losuje tylko ręce w różnych kolorach: `apps/mobile/src/features/drills/__tests__/hand-reasons.test.ts:59`. To samo brzmienie: `docs/tresci/rejestr/bn.json:38` i `content/<język>/rules.yaml` w 11 językach (`grep -rn "R-M3-012" content/*/rules.yaml` → 12 trafień).
- Powraca: nie (przegląd świeży autora dał temu twierdzeniu POPARTE)
- Wzorzec lub źródło: hierarchia ADR-24, szczebel 1 (rachunek) wygrywa z brzmieniem reguły
- Kroki w aplikacji: dziś niewidoczne; pojawi się, gdy R-M3-012 trafi do `rules` lekcji M3
- Opcje: (a) „zwykle wygrywa rzadziej” z dopiskiem „ręka w kolorze z niskim kickerem bywa mniej więcej na równi”; (b) zawężenie: „gdy obie ręce są w różnych kolorach, ręka zdominowana wygrywa rzadziej”. Rekomendacja: (b), bo zgadza się dokładnie z rachunkiem; decyzja należy do roli 06 build (ADR-24).
- Test akceptacyjny: `apps/mobile/src/features/drills/__tests__/recenzja-bp-dominacja.test.ts` zastąpiony testem nowego brzmienia (np. dla rąk w różnych kolorach dokładnie < 0,5, a dla rąk w kolorze zastrzeżenie w tekście); `pnpm run ci` zielone.
- Status: otwarte

### 06-tresci-002 · QJo, KTo, QTo i JTo poza zakresem dostają powód „ręka zdominowana”, a w innym spocie ta sama klasa dostaje „wysoki kicker”
- Pozycja listy kontrolnej: TRE-03
- Poziom: P2 (ŚREDNIE)
- Realność: realny (18 par spot × klasa, m.in. rfi.hj QJo i JTo, vs-open.btn-vs-co KTo i QTo) · Pewność: wysoka
- Rodzaj: M
- Dowód: `apps/mobile/src/features/drills/hand-reasons.ts:84` „if (!f.pair) return 'dominated';” bez warunku na niską drugą kartę; R-M3-012 `content/pl/rules.yaml:220` „dwie wysokie karty działają odwrotnie: wysoki {{t:kicker}} bije słabsze ręce”; lista par: `dowody/bn-5cd9d8c-powody-reki.txt` (kolumna `dominated`). Zdanie z aplikacji jest prawdziwe z definicji (pokerskill), ale reguła, którą przywołuje, wyłącza dwie wysokie karty w warunku.
- Mechanizm: `grep -n "return 'dominated'" apps/mobile/src/features/drills/hand-reasons.ts` → 1 trafienie
- Powraca: tak, autor zapisał to w swoich otwartych pytaniach jako ŚREDNIE → trwała kontrola: test, że `dominated` nie pada przy `low >= 10`, albo zmiana brzmienia reguły
- Wzorzec lub źródło: CLAUDE.md, „jedna nazwa na jedno pojęcie… jedna definicja”
- Kroki w aplikacji: ćwiczenie zakresów, rfi.hj, ręka QJo, odpowiedź „Pas” → „ręka zdominowana”; w spotach M11, gdzie QJo jest w zakresie (np. call.bb-10, push.btn-3max; 9 spotów) → „wysoki kicker”
- Opcje: (a) dla dwóch wysokich kart inny powód słabości z regułą (np. tylko powód spotu); (b) zmienić R-M3-012, żeby dominacja dotyczyła każdej niepełnej ręki. Rekomendacja: (a), bo (b) rozmywa pojęcie.
- Test akceptacyjny: skrypt `dowody/bn-5cd9d8c-skrypt-powody.ts.txt` (albo test autora) nie zwraca `dominated` dla klasy z dwiema kartami ≥ 10.
- Status: otwarte

### 06-tresci-003 · Przy all-in powód „twoja wyższa karta to 10/J” podaje słabą cechę jako argument za grą
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (ŚREDNIE)
- Realność: realny (113 par; mylące przy 10 i J: call.bb-5 T7o, J5o–J8o, call.bb-10-ante J7o, J8o) · Pewność: wysoka
- Rodzaj: M
- Dowód: `apps/mobile/src/i18n/locales/pl.json:760` „a twoja wyższa karta to {{rank}}”; `apps/mobile/src/features/drills/hand-reasons.ts:80` „if (isAllInSpot(spot) && f.high >= 10) return 'highAllIn';”; R-M11-013 (`content/pl/rules.yaml:1178` „przy samych wysokich kartach decyduje najwyższa”) mówi, jak rozstrzyga się pulę, a nie że karta 10 jest atutem. Wniosek „mam dziesiątkę, więc sprawdzam” nie ma źródła, a prawdziwy powód sprawdzenia T7o przy 5bb to cena (zakres pushującego jest szeroki).
- Mechanizm: 1 gałąź kodu, 113 par (`dowody/bn-5cd9d8c-powody-reki.txt`, kolumna `highAllIn`: A 62, K 28, Q 16, J 6, 10 1)
- Powraca: tak, autor zapisał to w otwartych pytaniach jako ŚREDNIE → trwała kontrola: test progu rangi albo powód z ceną
- Wzorzec lub źródło: zasada roli „tekst nie mówi więcej niż twierdzenie” (TRE-08)
- Kroki w aplikacji: ćwiczenie zakresów M11, call.bb-5, ręka T7o, odpowiedź „Pas”
- Opcje: (a) powód z ceny sprawdzenia (reguła M11 o cenie, jeśli ma przeczytane źródło); (b) próg `f.high >= 13` i brak powodu dla niższych (wyjątek nazwany). Rekomendacja: (a), bo daje prawdziwy powód; (b) jako tańsza kontrola zastępcza.
- Test akceptacyjny: żadna para z kluczem `highAllIn` nie ma rangi 10 ani J albo powód odwołuje się do ceny.
- Status: otwarte

### 06-tresci-004 · R-M11-013: część o braku zakładów po all-in nie ma w rejestrze przeczytanego źródła
- Pozycja listy kontrolnej: TRE-02
- Poziom: P2 (ŚREDNIE; twierdzenie prawdziwe, brakuje zapisu źródła)
- Realność: realny dla procesu (brak w rejestrze), nie dla użytkownika · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:1177` „nie ma już {{t:bet|zakładów}}: rozdanie rozstrzyga sam układ”; pole `source` cytuje tylko ranking High Card (OAG). Źródło szczebla 1 istnieje i jest przeczytane dziś: pokertda.com/view-poker-tda-rules, reguła 17 „All hands will be tabled without delay once a player is all-in and all betting action by all other players in the hand is complete” (`dowody/bn-5cd9d8c-zrodla.txt`).
- Mechanizm: 1 reguła (+ 11 przekładów i `bn.json`)
- Powraca: tak, autor zapisał to w otwartych pytaniach
- Wzorzec lub źródło: CLAUDE.md „Każde twierdzenie w aplikacji ma przeczytane źródło (adres i cytat)”
- Kroki w aplikacji: nie dotyczy (rejestr)
- Opcje: jedna sensowna: dopisać cytat TDA 17 do `source`, `sources` i `bn.json` (inaczej zawęzić regułę do samego rankingu, co osłabia powód all-in).
- Test akceptacyjny: `pnpm tresci:rejestr` zielone, wpis R-M11-013 ma źródło części all-in z cytatem.
- Status: otwarte

### 06-tresci-005 · „Wygrywa wyższa karta” i „kicker … bije” pomijają karty stołu bez nazwania tego uproszczeniem
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2 (NISKIE)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: M
- Dowód: OAG, s. 2: „An Ace, King, Queen, Jack and 9 is the highest ranked High Card hand”, czyli porównuje się pięć kart, także ze stołu; gdy grają karty stołu, pula jest dzielona, a kicker nic nie daje. Trafienia: `content/pl/rules.yaml:1177` „ani lepszego układu, wygrywa wyższa karta”; `apps/mobile/src/i18n/locales/pl.json:754` „który bije słabsze ręce z tą samą kartą”; `apps/mobile/src/i18n/locales/pl.json:761` „rywal z tą samą kartą i lepszym {{t:kicker|kickerem}} cię bije”; `content/pl/rules.yaml:220` (then R-M3-012).
- Mechanizm: `grep -n "wygrywa wyższa karta\|cię bije\|bije słabsze" content/pl/rules.yaml apps/mobile/src/i18n/locales/pl.json` → 5 trafień
- Powraca: częściowo (autor: NISKIE „bije” → „zwykle bije”)
- Wzorzec lub źródło: CLAUDE.md „Uproszczenie dydaktyczne wolno stosować, gdy … jest nazwane uproszczeniem”
- Kroki w aplikacji: każde wyjaśnienie z kluczem high, dominated, highAllIn
- Opcje: (a) „zwykle” w tekstach; (b) dopisek „uproszczenie” w regułach. Rekomendacja: (a) w tekstach i (b) w regułach.
- Test akceptacyjny: rejestr oznacza uproszczenie, teksty mają „zwykle”.
- Status: otwarte

### 06-tresci-006 · Nowe wyjaśnienia 6 opcji egzaminów są tylko po polsku
- Pozycja listy kontrolnej: TRE-08 (przekład)
- Poziom: P2 (NISKIE: przekłady mówią to samo, ale bez nowego zdania powodu albo w starej kolejności)
- Realność: realny (11 języków) · Pewność: wysoka
- Rodzaj: D
- Dowód: `content/pl/exams/m11.yaml:25` „Ryzykujesz dużo więcej, niż wygrywasz, więc sam {{t:bluff}} potrzebowałby bardzo częstych” wobec `content/en/exams/m11.yaml:25` „You put in {{n:exam.m11.fe.risk}} to win” (bez zdania powodu); m6 l.17 i 47, m9 l.10 i 45, m11 l.66 analogicznie (`git diff --stat 02b1fe1..5cd9d8c -- content/*/exams` → tylko `content/pl/exams`).
- Mechanizm: 6 opcji × 11 języków
- Powraca: nie; autor przekazał to roli 09; wpisu w backlogu z wersją nie znalazłem [DO USTALENIA]
- Wzorzec lub źródło: KO-040 (sens przed rachunkiem) i polityka 35 języków
- Kroki w aplikacji: egzamin M11 w języku innym niż polski, pytanie o fold equity, poprawna odpowiedź
- Opcje: (a) przekład teraz w BN; (b) w kroku roli 09 z wpisem do backlogu. Rekomendacja: (b), bo przekłady nie są fałszywe, a rola 09 i tak robi przegląd.
- Test akceptacyjny: 6 opcji × 11 języków ma zdanie powodu przed rachunkiem.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Przekład 8 języków poza próbką (es, fr, it, ko, pt, pt-BR, vi, zh-Hant): poza zakresem polecenia, rola 09.
- `source` R-M3-012 podaje zakres Monte Carlo „od ok. 0,25 do ok. 0,48”; dokładny rachunek dla sąsiednich kickerów daje maksimum 0,4707 (A2o–A3o). Pełnego przeglądu wszystkich 230 par nie robiłem; różnica nie zmienia brzmienia.

## Co działa dobrze i należy zachować
- Kierunek powodu: niezależny skrypt potwierdza, że żaden powód z klasy ręki nie przeczy decyzji (2417 par, 0 błędów) i że żadna para nie zostaje bez powodu. To właściwy mechanizm: cecha siły tylko przy ręce w zakresie, cecha słabości tylko poza nim.
- Liczby z rachunku na danych zadania (odsetek flopów z kartą wyższą, liczba stritów) zamiast nowych kluczy `numbers.yaml`; rachunek zgadza się z pełnym przeglądem.
- R-M2-005 bez tautologii: powód z rachunku EV.
- Egzaminy: sens przed rachunkiem, te same odpowiedzi i klucze `{{n:}}` (skrypt, 350 opcji).
- M12 nietknięte (przegląd zastępczy D-027 zachowany); autor sam cofnął przeróbkę M12.
- Każde twierdzenie ma regułę z poziomem pewności i wpis w rejestrze z datą odczytu; cytaty OAG, pokerskill i upswing są dosłownie w źródłach.

## Decyzje dla właściciela
Brak. Wszystkie znaleziska są merytoryczne (ADR-24: rozstrzyga rola 06 build). Kolejność napraw ustala koordynator.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-003,06-tresci-004,06-tresci-005` (06-tresci-006 dla roli 09). Test czerwony 06-tresci-001: `apps/mobile/src/features/drills/__tests__/recenzja-bp-dominacja.test.ts` (osobny commit, bez naprawy).

`git status --porcelain` na starcie: pusty. Na końcu: pusty po commitach (stan w odpowiedzi do koordynatora).
