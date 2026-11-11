# Recenzja niezależna: treści i testy sesji DU — Szkoła Pokera — 2026-11-11
Commit: 7a7a0f1dd5c31436137a0bd44d30250d7bedd39b (= `origin/sesja-du-szablony`) · zakres `b3963e9a..7a7a0f1d` · Rola: 06-tresci, tryb audit (moduły kontrole-mechaniczne, tresci-krytyczne) · Sesja EA (koordynator: polecenie EA @ c56be33e)
Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0, sieć dostępna (źródła otwarte `curl`), Python 3 do rachunku niezależnego; bez macOS/Xcode (ekran sprawdzony testem jest w worktree, nie na urządzeniu). Raportu autora (`docs/tresci/stan-du.md`) ani transkryptu DU nie czytałem.

**Werdykt: PRZYJĄĆ PO POPRAWKACH.** Liczby, odpowiedzi poprawne i oceny SC-06, SC-32, SC-33 i SC-34 zgadzają się z rachunkiem liczonym inną ścieżką (surowe pliki solvera, macierz equity, ICM od zera; 0 rozbieżności w 4000 wariantach SC-34). Każde twierdzenie ma regułę, a źródła reguł otwarte dziś zawierają cytowane zdania. Zmiany testów nie luzują żadnej asercji, a trzy moje mutanty dają czerwony wynik. Do poprawy przed wydaniem: jedno WYSOKIE (06-tresci-001: SC-34 łatwy podaje ICM jako powód pasu, choć w 90% wariantów ręka jest pasem także w grze o żetony). Reszta to ŚREDNIE i NISKIE do backlogu.

## Podsumowanie
Sesja DU wprowadziła do treści cztery szablony (SC-06 otwarcie z małego blinda i jego rozmiar, SC-32 push z SB przy 10 bb, SC-33 sprawdzenie BB przy 10 bb, SC-34 bańka ICM bez poziomu trudnego) w 12 językach, nowy test `szablony-du.test.ts` i dopasowanie pięciu testów. Najważniejsze ryzyko merytoryczne: wyjaśnienie pasu w SC-34 łatwym daje fałszywą przyczynę (06-tresci-001, WYS). Drugie: poziom łatwy szablonów zakresowych zawiera ręce na samej granicy zakresu, a BRD definiuje taki wariant jako trudny (06-tresci-002, ŚR, decyzja produktowa). Testy: brak testu ekranu na prawdziwej bazie dla nowych szablonów, czyli ten sam mechanizm, który recenzja CQ zgłosiła jako 06-tresci-001 (06-tresci-003, ŚR; moja sonda przechodzi). Decyzje: PYTANIE o kalibrację poziomu łatwego (06-tresci-002).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 · WYS | M | SC-34 łatwy: „Pasujesz, bo [ICM]” przy rękach, które są pasem także w grze o żetony (1807/2000 wariantów) | otwarte |
| 06-tresci-002 | P2 · ŚR | P | Poziom łatwy SC-06, SC-32, SC-33 losuje ręce z granicy zakresu (margines equity < 2 pp w 11–22% wariantów), wbrew BR-POZ-001 | otwarte |
| 06-tresci-003 | P2 · ŚR | D | Nowe szablony bez testu ekranu na prawdziwej bazie treści (mechanizm CQ 06-tresci-001) | otwarte |
| 06-tresci-004 | P2 · NIS | M | Dwa zdania mówią więcej niż reguła: „ryzykuje więcej żetonów” (SC-06) i „ryzykujesz mało” (SC-32) | otwarte |
| 06-tresci-005 | P2 · NIS | M | SC-34 korzysta z R-M11-009, której warunek („może cię wyeliminować”) nie obejmuje 38–63% wariantów | otwarte |
| 06-tresci-006 | P2 · NIS | D | es SC-34: „pagar” bez znacznika `{{t:call}}` (jedyna rozbieżność znaczników w 12 językach) | otwarte |

## Weryfikacja twierdzeń
Zakres: całość (4 szablony × wszystkie akcje, pl; przekłady tylko struktura) · Hierarchia: z `CLAUDE.md` (ADR-24) · Skrypty: `dowody/ea-du-weryf.txt`, `dowody/ea-du-icm.txt`, `dowody/ea-du-zrodla.txt` (kod 0). Rachunek niezależny: equity z `tools/equity/equity169.json` i częstości z surowych `content/ranges/*.json` w Pythonie, bez kodu generatora; ICM rekurencją Malmutha-Harville'a.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| SC-06 przebicie | `content/pl/scenarios/sc-06.yaml:20` | R-M3-009: SB otwiera ok. 40–45%, jak z Buttona; po flopie mówi pierwszy | beyondgto.com/ranges/sb-open-6max-100bb; preflopwizard.app/blog/6-max-preflop-charts | "GTO opens about 44% of hands first-in from the Small Blind"; "You open a range nearly as wide as the button (39-47%)" | POPARTE; rachunek: solver projektu `rfi.sb` 42,3%, `rfi.btn` 41,4% | ok | — | 002 (poziom) |
| SC-06 pas | `content/pl/scenarios/sc-06.yaml:22` | jw.; "solver tę rękę zwykle przebija" | jw. + `preflop-6max-100bb.json` | 87 klas z `raise 3` ≥ 0,97 | POPARTE | ok | — | 002 |
| SC-06 rozmiar 3 bb | `content/pl/scenarios/sc-06.yaml:30` | R-M3-007 (heuristic, uproszczenie): 2,5 bb, z SB 3 bb, bo bez pozycji | preflopwizard.app (jw.); blog.gtowizard.com/preflop-range-morphology | "2.5bb from all positions (3bb from the small blind)"; "the SB makes it 3bb" | POPARTE | ok | — | — |
| SC-06 mały / duży | `content/pl/scenarios/sc-06.yaml:32`, `:34` | jw.; 2,4 i 4,8 bb = niedokładność | jw. | jw. | POPARTE (:32); CZĘŚCIOWO (:34) | :34 dodaje powód spoza reguły | usunąć "a większe przebicie ryzykuje…" albo zastąpić `because` | 004 |
| SC-32 all-in | `content/pl/scenarios/sc-32.yaml:19` | R-M11-002: przy 10 bb push ok. 58,4% | pokerstrategy.com/…/push-fold-play-nash-ranges (10 bb: 56,6%); rachunek EV push vs pas | "10 56.6%" | POPARTE (113 klas; 111 z EV push ≥ pas, 84s i 43s −0,001 i −0,007 bb, w granicy przybliżenia) | "ryzykujesz mało" zamiast "mniej" | "ryzykujesz mniej" | 002, 004 |
| SC-32 pas | `content/pl/scenarios/sc-32.yaml:21` | jw. | jw. | jw. | POPARTE | ok | — | 002 |
| SC-33 sprawdzenie | `content/pl/scenarios/sc-33.yaml:19` | R-M11-006 (math): (S−1)÷2S = 45%; R-M11-007: call 37,6% węziej niż push 58,4% | pokercoaching.com/push-fold-charts; rachunek | "Calling ranges are tighter than shoving ranges" | POPARTE (70 klas, każda ≥ 45% equity wobec zakresu push) | ok | — | 002 |
| SC-33 pas | `content/pl/scenarios/sc-33.yaml:21` | jw. | jw. | jw. | POPARTE | ok | — | 002 |
| SC-34 pas (Ł) | `content/pl/scenarios/sc-34.yaml:21` | R-M11-009: BF ÷ (BF+1); przegrana kosztuje więcej, niż wygrana dodaje | blog.gtowizard.com/what-is-the-bubble-factor-in-poker-tournaments | "Required Equity = Bubble Factor / (Bubble Factor + 1)"; "You always stand to lose more equity than you gain in tournaments" | CZĘŚCIOWO: odpowiedź i próg zgodne (0 rozbieżności / 2000), ale "bo [ICM]" fałszywe w 1807/2000 | "Pasujesz, bo… częściej niż w grze o żetony" sugeruje sprawdzenie w żetonach | zdanie bez przyczyny ICM albo warunkowe | 001, 005 |
| SC-34 sprawdzenie (Ś) | `content/pl/scenarios/sc-34.yaml:23` | jw. | jw. | jw. | POPARTE (0/2000; próg ICM > 45% w 2000/2000) | ok | — | 005 |

## Linia bazowa i założenia
Linię bazową zbudowałem od zera, zanim otworzyłem decyzje DU: (1) dla każdej odpowiedzi poprawnej rachunek inną ścieżką niż generator; (2) dla każdego zdania „bo” reguła i jej źródło otwarte dziś; (3) wymagania z BRD (`docs/brd/wymagania-scenariusze.md` BR-POZ-001, BR-GEN-003) zamiast notatek autora.
- **Kategorie twierdzeń:** liczby (`{{n:}}`: szerokości zakresów, cena 45%, rozmiary 2,5/3 bb), reguły (R-M3-007/009, R-M11-002/006/007/009), przyczyny („bo”), oceny (werdykty akcji). Wynik: tabela wyżej.
- **Progi krytyczne dla zdrowia, życia, mienia, prawa:** sprawdzone, brak. Szablony nie dotyczą pieniędzy gracza poza nauką gry; moduł `tresci-krytyczne` nie ma tu twierdzeń krytycznych (żadna reguła nie ma statusu krytycznego).
- **Brakujące ostrzeżenia i granice stosowania:** SC-32/33 nie mówią, że zakresy są z gry heads-up bez ante (reguła R-M11-002 to mówi w `source`); dla 10 bb bez ante to zgodne z sytuacją, bez znaleziska. SC-34: założenie o zakresie all-inu z gry o żetony nazwane w CQ 06-tresci-002, dotyczy poziomu trudnego, którego w treści nie ma.
- **Jednostki i warianty regionalne:** bb i procenty w 12 językach przez te same klucze `{{n:}}` (sprawdzone skryptem: `dowody/ea-du-przeklady.txt`).
- **Aktualność źródeł:** wszystkie 9 cytatów znalezione dziś w surowym tekście (`dowody/ea-du-zrodla.txt`).
- **Trudna pamięć:** sprawdzone, brak.
- **Pary zdań:** dwie pary dają wniosek bez źródła (06-tresci-001, 06-tresci-004).
- **Jedno źródło / niskie szczeble:** R-M3-007 stoi na szczeblu 4 i 2 (heuristic, uproszczenie nazwane) — zgodnie z ADR-24; R-M11-002/007 na solverze projektu (szczebel 2 po walidacji, dokument 10) i serwisach szczebla 4; R-M11-006/009 na rachunku (szczebel 1).
- **Soczewki:** laik (dosłowne „bo”: 001, 004), ekspert (granica zakresu w poziomie łatwym: 002), sceptyczny weryfikator (źródła, mutanty, ICM od zera), inny język (struktura przekładów: 006).
- **Wzorzec najlepszych:** serwisy solverowe uczą push/fold i obrony BB na tabelach z wartością EV ręki (np. tabele Nash z marginesem); wniosek dla aplikacji: poziom „łatwy” warto wybierać po marginesie EV/equity, nie po samej częstości (opcja w 06-tresci-002).
- Rejestr założeń: bez proponowanych zmian statusu.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-06.yaml`, `sc-32.yaml`, `sc-33.yaml`, `sc-34.yaml` (każde zdanie) | tak | odczyt + rachunek: `dowody/ea-du-weryf.txt`, `dowody/ea-du-icm.txt` |
| reguły R-M3-007, R-M3-009, R-M11-002, R-M11-006, R-M11-007, R-M11-009 i ich źródła | tak | `dowody/ea-du-zrodla.txt` |
| klucze `content/numbers.yaml` użyte w szablonach | tak | odczyt (`content/numbers.yaml:85-88`, `:522`, `:528`, `:539`) |
| 10 przekładów + en (struktura, znaczniki) | tak (bez jakości językowej: rola 09) | `dowody/ea-du-przeklady.txt` |
| testy zmienione wg KO-070 (6 plików) i `generator-odciski.json` | tak | diff + mutanty: `dowody/ea-du-mutanty.txt` |
| `pnpm run ci` na 7a7a0f1d | tak | `dowody/ea-du-ci-7a7a0f1d.txt` |
| determinizm `pnpm content:build` | tak | `dowody/ea-du-build.txt` |
| ekran na prawdziwej bazie (SC-06/32/33/34, każda akcja) | tak, sondą w worktree | `dowody/ea-du-sonda-ekranu.txt` |
| decyzje D-1030…D-1040 | tak (odczyt; merytorycznie D-1032, D-1034, D-1036, D-1038, D-1039) | `docs/decyzje/DU.md` |
| szkice SC-04, SC-05, SC-08 (`docs/tresci/szablony-robocze/`) | nie: poza treścią aplikacji, nie wchodzą do bazy | — |
| urządzenie iOS / TestFlight | nie: brak macOS | krok właściciela przy teście na telefonie |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-du-7a7a0f1d.md . --rola 06-tresci` (kopia skryptu z promptu roli w scratchpadzie) → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0. Dowody bez sekretów i bez ścieżek prywatnych (ścieżki scratchpadu zastąpione `<scratchpad>`).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każde zdanie z faktem ma regułę (`rule:` w punkcie decyzji); 06-tresci-004 (dodany powód) |
| TRE-02 | dotyczy | ok: 9/9 cytatów w surowym tekście; SC-34 Ł CZĘŚCIOWO → 06-tresci-001 |
| TRE-03 | dotyczy | 06-tresci-005 |
| TRE-04 | dotyczy | ok (szczeble zgodne z ADR-24, poziomy pewności `heuristic`/`gto`/`math` jak szczebel) |
| TRE-05 | dotyczy | ok: R-M3-009 przedział 40–45% to część wspólna źródeł; solver 42,3% w środku |
| TRE-06 | dotyczy | ok: liczby tylko przez `{{n:}}`; standard rozmiaru w teście z `rules.yaml` → `numbers.yaml` |
| TRE-07 | dotyczy | ok: raise-or-fold i rozmiar 2,5/3 bb to nazwane uproszczenia reguł |
| TRE-08 | dotyczy | 06-tresci-001, 06-tresci-004; przekłady: tylko struktura (06-tresci-006) |
| TRE-09 | nie dotyczy: brak faktów zmiennych w czasie | — |
| TRE-10 | nie dotyczy: brak treści krytycznych (moduł bez twierdzeń krytycznych) | — |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy | ok: baza `tresc-18ee6d332a-pl.db` budowana z repo deterministycznie (`dowody/ea-du-build.txt`); ekran pokazuje tekst z bazy (sonda) |
| TRE-14 | dotyczy | ok: cytaty w regułach ≤ 1–2 zdania, treść w `content/` zgodnie z CLAUDE.md |

## Znaleziska (szczegóły)

### 06-tresci-001 · SC-34 łatwy uczy, że pas wynika z ICM, choć ręka jest pasem także w grze o żetony
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1 (WYSOKIE: twierdzenie merytoryczne fałszywe dla 90% wariantów poziomu; próg wydania z CLAUDE.md, „błędne … twierdzenia merytoryczne”)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-34.yaml:21` „{{t:fold|Pasujesz}}, bo w {{t:tournament|turnieju}} z {{t:payout|wypłatami}} przegrana kosztuje więcej pieniędzy, niż wygrana dodaje”; `dowody/ea-du-icm.txt`: poziom łatwy 2000 wariantów, `fold_tez_w_zetonach: 1807` (equity < 45% = próg w żetonach (S−1)÷2S), np. ziarno 2: 32s, equity 0,345, próg ICM 0,555, próg w żetonach 0,450. Odpowiedź „pas” i próg ICM: 0 rozbieżności z generatorem.
- Mechanizm: bramka poziomu łatwego `content/pl/scenarios/sc-34.yaml:12` „latwy: { marginMin: 0.1, expected: [fold] }” wymaga tylko marginesu od progu ICM, nie od progu w żetonach; wyjaśnienie jest jedno na akcję i zawsze podaje ICM jako przyczynę. `grep -rn "Pasujesz}}, bo w" content/pl/scenarios` → 1 trafienie (sc-34). Przekłady powtarzają zdanie w 11 językach.
- Powraca: nie (CQ oceniła Ł jako POPARTE na poziomie odpowiedzi, nie przyczyny) → trwała kontrola: test w `szablony-co.test.ts`, że dla każdego wariantu Ł z equity < (S−1)÷2S wyjaśnienie nie zawiera zdania przyczyny ICM (albo zdanie ma postać prawdziwą w 100% wariantów)
- Wzorzec lub źródło: R-M11-009 `because` mówi, że sprawdzenie musi wygrywać częściej, a nie że ręka bez ICM byłaby sprawdzeniem; R-M11-006: próg w żetonach 45%
- Kroki w aplikacji: Scenariusze → M11 → SC-34 łatwy → ręka np. 32s → „Pas” → wyjaśnienie wiąże pas z wypłatami turnieju
- Opcje: (a) zdanie prawdziwe dla każdego wariantu, sama treść (rola 06): „{{t:fold|Pasujesz}}: ta ręka ma wobec {{t:range|zakresu}} {{t:all-in|all-inu}} za mało {{t:equity}}, a na {{t:bubble|bańce}} próg z {{t:icm}} jest jeszcze wyższy niż w grze o {{t:chips|żetony}}, bo przegrana kosztuje więcej pieniędzy, niż wygrana dodaje.” Kompromis: poziom łatwy nie pokazuje różnicy ICM–żetony, tylko o niej mówi. (b) poziom łatwy tylko z rąk między progiem w żetonach a progiem ICM − 0,1 (filtr generatora, rola 08): 193/2000 wariantów, 40 klas. Kompromis: zmiana silnika i węższa pojemność. (c) zdanie warunkowe jak KO-073 (rola 08 + 06). Rekomendacja: (a) teraz; (b) rozważyć przy kalibracji poziomów (06-tresci-002).
- Test akceptacyjny: dla 10 000 wariantów Ł żadne wyjaśnienie nie podaje ICM jako jedynej przyczyny pasu ręki z equity < (S−1)÷2S; przekłady zmienione w 11 językach (struktura jak `dowody/ea-du-przeklady.txt`, 0 rozbieżności)
- Status: otwarte

### 06-tresci-002 · Poziom łatwy szablonów zakresowych losuje ręce z samej granicy zakresu
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2 (ŚREDNIE: kalibracja trudności, odpowiedzi zgodne z solverem)
- Realność: realny · Pewność: wysoka
- Rodzaj: P
- Dowód: `dowody/ea-du-weryf.txt`: SC-33 Ł: 8/70 klas (11% wariantów) z marginesem equity < 2 pp (Q6s: 0,03 pp, K5o: 0,37 pp); SC-32 Ł: 25/113 klas (22%) < 2 pp, a 84s i 43s mają w rachunku niezależnym EV push niższe od pasu o 0,001 i 0,007 bb (obojętne, solver daje 1,0); SC-06 Ł zawiera 52s (42s i 62s: 0) i A5o (A4o: 0). BR-POZ-001: `docs/brd/wymagania-scenariusze.md:116` „**łatwy** — poprawną decyzję widać z sytuacji bez liczenia (margines BR-GEN-003); **średni** — decyzja wymaga jednej liczby z kursu (outy, cena sprawdzenia, SPR, procent otwarć); **trudny** — wartość blisko progu (margines od 0 do 2 pp poniżej progu albo powyżej”
- Mechanizm: `packages/poker-core/src/scenario-gen.ts:403` `eligibleClasses` wybiera klasy tylko po częstości (`freqs: [{ min: 0.97 }]`), a rozkłady solvera są prawie czyste, więc 0,97 obejmuje cały zakres aż do granicy; D-1034 rozważyła poziom średni z częstości, nie odległość poziomu łatwego od granicy. `grep -n "min: 0.97" content/pl/scenarios/*.yaml` → 3 trafienia: sc-06:12, sc-32:11, sc-33:11
- Powraca: nie
- Wzorzec lub źródło: BR-POZ-001 (wyżej); szkic zasad `docs/tresci/szablony-robocze/README.md:19` („**Ł** = ręka grana tą akcją w ≥ 90% i daleko od granicy zakresu”)
- Kroki w aplikacji: Scenariusze → M11 → SC-33 łatwy → Q6s → „Pas” oceniony jako błąd, „Pas jest za ostrożny”, choć różnica EV wynosi ok. 0,006 bb
- Opcje: (a) Ł z marginesem equity (push/fold: macierz equity169, jak `marginMin` w SC-34; SC-06: klasy otwierane z ≥ 0,97 już z CO jako „rdzeń” zakresu), rola 08 w generatorze; pojemność wg KO-074 = liczba klas (SC-33 przy marginesie 5 pp: 48 klas, przy 10 pp: 28). Kompromis: praca silnika, mniej wariantów. (b) obecne warianty oznaczyć jako średni („procent pushów” z kursu), a Ł dodać później. Kompromis: do czasu (a) szablon bez poziomu łatwego, wbrew BR-SZB-002. (c) zostawić, zapisać jako nazwany wyjątek od BR-POZ-001 z powodem (rozkłady solvera czyste). Kompromis: 11–22% wariantów „łatwych” to decyzje graniczne. Rekomendacja: (a), do czasu wdrożenia (c) z zapisem.
- Test akceptacyjny: `szablony-du.test.ts` sprawdza dla Ł margines equity ≥ ustalony próg (wyrocznia z equity169 i surowego pliku solvera) w 10 000 wariantów
- Status: otwarte (PYTANIE do koordynatora)

### 06-tresci-003 · Nowe szablony nie mają testu ekranu na prawdziwej bazie treści
- Pozycja listy kontrolnej: TRE-13
- Poziom: P2 (ŚREDNIE: luka kontroli; sonda pokazuje, że dziś działa)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/__tests__/cs-tresc-realna.test.tsx:29` sprawdza tylko obecność range-spot w bazie (`toEqual(['sc-06', 'sc-32', 'sc-33'])`), a przebieg ekranu tylko dla `['sc-11', 'sc-12']` (`:31`); `tools/content-build/test/recenzja-cq-odtworzenie.test.ts:24-30` buduje kontekst ręcznie, nie z bazy. Sonda w worktree (`dowody/ea-du-sonda-ekranu.txt`): 15/15 przypadków zielonych, kod 0 (dziś działa)
- Mechanizm: test ekranu z prawdziwej bazy jest listą jawnych ID, a nie pętlą po szablonach bazy; `grep -n "for (const id of \['sc-11', 'sc-12'\])" apps/mobile/src/features/scenariusz/__tests__/cs-tresc-realna.test.tsx` → 1 trafienie
- Powraca: tak, CQ 06-tresci-001 (szablon w bazie, którego ekran nie uruchamia) → trwała kontrola: pętla po wszystkich szablonach bazy w `cs-tresc-realna.test.tsx`
- Wzorzec lub źródło: KO-070 („recenzja niezależna obejmie testy”); `docs/tresci/recenzje/recenzja-co-ad62a2d.md:11`
- Kroki w aplikacji: brak objawu dziś; przyszła zmiana kontekstu z bazy (np. `sizeRules`) przeszłaby CI bez czerwonego testu
- Opcje: (a) pętla po `getScenarioTemplates(dbCn)` × poziomy × akcje w `cs-tresc-realna` (jak sonda). Kompromis: dłuższy test jest. (b) zostawić listę i dopisać cztery ID. Kompromis: kolejny szablon znów wymaga pamiętania. Rekomendacja: (a).
- Test akceptacyjny: sonda `dowody/ea-du-sonda-ekranu.txt` w repo jako test, czerwona po usunięciu `sizeRules` z `buildGeneratorContext`
- Status: otwarte

### 06-tresci-004 · Dwa zdania dodają do reguły powód albo mocniejsze słowo
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (NISKIE: wzmocnienie bez zmiany odpowiedzi)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-06.yaml:34` „a większe {{t:raise|przebicie}} ryzykuje więcej {{t:chips|żetonów}} tą samą ręką” (R-M3-007 `because` tego nie mówi; zasada w `docs/tresci/szablony-robocze/README.md:19`: „tylko z pola `because` reguły (D-565, D-567)”); `content/pl/scenarios/sc-32.yaml:19` „przy tak krótkim stacku ryzykujesz mało względem blindów” wobec R-M11-002 `because` „przy krótszym stacku ryzykujesz mniej” (porównanie zamienione w ocenę bezwzględną: przy 10 bb ryzykujesz 10 bb, by wygrać 1,5 bb)
- Mechanizm: zdanie uzasadnienia spoza `because`; `grep -rn "ryzykujesz mało\|ryzykuje więcej" content/pl/scenarios` → 3 trafienia: sc-06:34, sc-32:19, sc-32:21
- Powraca: nie
- Wzorzec lub źródło: preflopwizard.app (otwarte dziś) wspiera kierunek częściowo („a smaller size limits variance and avoids building huge pots out of position”), ale reguła tego nie zapisuje
- Kroki w aplikacji: SC-06 → rozmiar duży; SC-32 → all-in albo pas
- Opcje: minimalna poprawka (sama treść, 3 zdania × 12 języków): usunąć klauzulę w sc-06:34; „mało” → „mniej” w sc-32:19 i :21. Druga opcja: dopisać powód do `because` R-M3-007 z cytatem preflopwizard. Rekomendacja: minimalna poprawka.
- Test akceptacyjny: `grep -rn "ryzykujesz mało\|ryzykuje więcej" content/pl/scenarios` → 0
- Status: otwarte

### 06-tresci-005 · SC-34 używa R-M11-009 poza jej warunkiem „może cię wyeliminować”
- Pozycja listy kontrolnej: TRE-03
- Poziom: P2 (NISKIE: tekst szablonu prawdziwy, rozjazd reguły ze źródłem)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `dowody/ea-du-icm.txt`: gracz pokrywa rywala w 755/2000 wariantów Ł i 1257/2000 Ś; R-M11-009 `if` „{{t:call|sprawdzasz}} all-in, który może cię wyeliminować”; źródło (otwarte dziś) jest szersze: „You always stand to lose more equity than you gain in tournaments”; próg ICM > 45% w 4000/4000 wariantów
- Mechanizm: generator losuje gracza i rywala niezależnie od stacków (`packages/poker-core/src/scenario-gen.ts:470-471`); `grep -rn "R-M11-009" content/pl/scenarios` → 2 trafienia (sc-34:1 komentarz, sc-34:18 punkt decyzji)
- Powraca: nie
- Wzorzec lub źródło: blog.gtowizard.com/what-is-the-bubble-factor-in-poker-tournaments (2026-11-11)
- Kroki w aplikacji: SC-34, wariant ze stackiem gracza większym niż rywala
- Opcje: (a) poszerzyć `if` reguły do brzmienia źródła („sprawdzasz all-in w turnieju z ICM”); (b) generator tylko z gracza, który może odpaść (rola 08). Rekomendacja: (a), sama treść reguły.
- Test akceptacyjny: `if` R-M11-009 obejmuje wszystkie warianty generatora (test: dla każdego wariantu warunek reguły prawdziwy)
- Status: otwarte

### 06-tresci-006 · Przekład hiszpański SC-34 gubi odnośnik do pojęcia „sprawdzenie”
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 (NISKIE: brak odnośnika słownika w jednym zdaniu)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/ea-du-przeklady.txt`: „ZNACZNIKI es sc-34 0 fold brak: [('t', 'call')]”; `content/es/scenarios/sc-34.yaml:21` „así que pagar debe ganar más a menudo”
- Mechanizm: przekład z sesji CO (`ad62a2d`), przeniesiony bez zmian; poza tym 0 rozbieżności znaczników i struktury w 12 językach × 4 szablony
- Powraca: nie
- Wzorzec lub źródło: pl `content/pl/scenarios/sc-34.yaml:21` („{{t:call|sprawdzenie}}”)
- Kroki w aplikacji: język es → SC-34 → pas
- Opcje: „pagar” → „{{t:call|pagar}}” (jedna zmiana); kontrola mechaniczna: rozszerzyć test struktury en (`tools/content-build/test/szablony-du.test.ts:137-145`) na wszystkie języki i zbiór znaczników. Rekomendacja: obie.
- Test akceptacyjny: `ea-du-przeklady.py.txt` → „rozbieżności: 0”
- Status: otwarte

## Testy (KO-070)
- `pnpm run ci` na 7a7a0f1d: **kod 0** (`dowody/ea-du-ci-7a7a0f1d.txt`; content-build 509 passed + 1 expected fail, domena 347 + 1 expected fail, rejestr treści 0 błędów).
- Luzowanie: brak. Każda zmiana wynika z nowego szablonu: `cz-pokrycie` dopisuje trzy rodzaje do mapy (test nadal wymaga filtra `some` i ścieżki `'pl', 'scenarios'`); `szablony-co`, `recenzja-cq-odtworzenie`, `cs-tresc-realna` zamieniają asercję „brak icm-call/range-spot” na dokładne listy (`[['sc-34', ['latwy', 'sredni']]]`, `['sc-06', 'sc-32', 'sc-33']`); `generator-odciski.json` tylko dopisuje 5 wpisów, `ZIARNA = 200` bez zmian; `LOSOWANIA = 10_000` w nowym teście jak w CO.
- Mutanty niezależne od mutanta DU (filtr klas niepewnych), każdy osobno w worktree (`dowody/ea-du-mutanty.txt`, skrypt `dowody/ea-du-mutanty.sh.txt`): M-A range-spot z częstościami klasy sąsiedniej → `szablony-du` kod 1 (3 testy czerwone); M-B rozmiar z SB z parametru `open` → `szablony-du` kod 1; M-C próg ICM bez blinda gracza → `szablony-co` kod 1 (5 testów, treść i szkic). Kontrola bez mutanta: 37/37, kod 0.
- `pnpm content:build` deterministyczny: dwa przebiegi, 0 zmian w plikach śledzonych, skrót bazy pl równy zacommitowanemu (`dowody/ea-du-build.txt`).
- Luka: test ekranu na prawdziwej bazie (06-tresci-003).

## Do sprawdzenia
- SC-32 84s i 43s: rachunek niezależny daje EV push niższe od pasu o 0,001 i 0,007 bb, solver projektu push 1,0. Różnica mieści się w przybliżeniu macierzy equity169 i zbieżności równowagi; bez dokładnego equity kombinacji nie rozstrzygam (pewność < 80%). Wpływa tylko na 06-tresci-002.
- Jakość językowa 10 przekładów: rola 09 (polecenie EA pkt 4.4).
- Obszar roli 04/08 (SP-11, zgłaszam bez oceny, raportu 04 z tego commitu brak): sonda ekranu pokazuje „Masz … na mały blind (small blind, SB), preflop” (`{{w:pozycja}}` w mianowniku po „na”; mechanizm we wszystkich 10 szablonach, `grep -c "na {{w:pozycja}}" content/pl/scenarios/*.yaml`) oraz „przebicie (raise) do 2.4 bb” w przebiegu rozdania obok „2,4 bb” w ocenie (`dowody/ea-du-sonda-ekranu.txt`). Nie dotyczy prawdziwości treści.

## Co działa dobrze i należy zachować
- Wyrocznia `szablony-du.test.ts` czyta surowe pliki solvera i `rules.yaml`, a werdykt liczy od zera z progów `numbers.yaml`; sprawdza też, że akcje z wyjaśnieniem „za ostrożny” nie są zgodne (`tools/content-build/test/szablony-du.test.ts:79-83`).
- Zmiany starych testów zastępują asercje „brak X” dokładnymi listami (`toEqual([['sc-34', ['latwy', 'sredni']]])`), więc są ostrzejsze, nie luźniejsze; plik odcisków tylko dopisany, `ZIARNA` bez zmian.
- D-1032 (rozmiar zamiast `no-limp`) i D-1036 (SC-34 bez poziomu trudnego) zgodne z węzłem solvera i z otwartym CQ 06-tresci-002.
- SC-06: szerokość otwarcia SB solvera projektu (42,3%) mieści się w przedziale źródeł 40–45% i jest bliska Buttona (41,4%), więc zdanie „mniej więcej tak szeroko jak z Buttona” zgadza się z danymi, na których aplikacja ocenia.

## Decyzje dla właściciela
- PYTANIE (przez koordynatora), 06-tresci-002: kalibracja poziomu łatwego szablonów zakresowych: (a) margines equity / rdzeń zakresu (08), (b) przeniesienie na średni, (c) nazwany wyjątek. Rekomendacja (a), do czasu wdrożenia (c).
- Merytoryczne (06-tresci-001, 004, 005) rozstrzyga rola 06 według ADR-24; do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-004,06-tresci-005,06-tresci-006`; 06-tresci-002 (a) i 06-tresci-003 do roli 08 (generator) i 07 (test ekranu) po decyzji.

`git status --porcelain` na początku: pusty; na końcu (przed commitem raportu): tylko pliki tej recenzji (`docs/tresci/recenzje/recenzja-du-7a7a0f1d.md`, `docs/tresci/recenzje/dowody/ea-du-*`); żadnych zmian w treści DU, testach ani kodzie. Sondy i mutanty tylko w worktree w scratchpadzie. Koszt: patrz PRZEKAZANIE.
