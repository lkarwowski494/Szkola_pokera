# Audyt: Treści i wiedza domenowa — Szkoła Pokera — recenzja IL 7 szablonów HZ — 2026-11-17
Commit: ef75f613863eb5e4081b83eefc5b45846fd40f42 · Tryb: audit (rola 06-tresci, moduły kontrole-mechaniczne, tresci-krytyczne; prompt `prompts@af4c0a83`, sha256 d48128aa…be16) · Środowisko: Linux, Node 22, pnpm 10.28; sieć działa (14 źródeł pobranych `curl`, HTTP 200); bez macOS/Xcode (nie dotyczy: recenzja treści). Odstępstwa od kontraktu roli według polecenia IL: ścieżka raportu, ID `IL-NNN`, poziomy z CLAUDE.md „Audyty i wydania”, commit na gałąź (D-1930).

## Podsumowanie
Sprawdziłem wszystkie twierdzenia, liczby i oceny zagrań w 7 szablonach (SC-09, 16, 18, 21, 26, 27, 30; pl i en) na `ef75f61`. Rachunki są poprawne: 10/10 liczb zgodnych z niezależnym rachunkiem, 2100 pól wariantów zgodnych z niezależnym wzorem, equity SC-30 z własnego Monte Carlo różni się od aplikacji o ≤ 0,005. Wszystkie 49 cytatów występuje dosłownie w dzisiejszym tekście źródeł. Najważniejsze ryzyko: SC-18 ocenia duży second barrel jako jedyną zgodną akcję także przy najwyższej parze ze słabym kickerem (41% wariantów), wbrew regule R-M7-003 tej samej aplikacji i źródłu szczebla 2 (IL-001, WYSOKIE, blokuje build 1012 według progu wydania). Pozostałe znaleziska to terminologia i brzmienie (2 ŚREDNIE, 4 NISKIE).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| IL-001 | WYSOKIE | M | SC-18: duży second barrel jedyną zgodną akcją przy każdym kickerze | otwarte |
| IL-002 | ŚREDNIE | M | SC-16: „strity otwarte” ze znacznikiem strita zamiast OESD | otwarte |
| IL-003 | ŚREDNIE | M | SC-26: termin ICM przed lekcją definiującą (m11.l3); mechanizm w 6 szablonach | otwarte |
| IL-004 | NISKIE | M | SC-09: uzasadnienie „nie odbiera mu rozdania” poza częścią wspólną źródeł | otwarte |
| IL-005 | NISKIE | M | SC-18, SC-26: brzmienie szersze niż źródło lub rachunek | otwarte |
| IL-006 | NISKIE | D | SC-27: „ok. 29,944bb” — liczba bez zaokrąglenia (mechanizm w 7 miejscach) | otwarte |
| IL-007 | NISKIE | M | Rejestr HP T-HP-24: kombinatoryka niezgodna z generatorem (treść poprawna) | otwarte |

## Weryfikacja twierdzeń
Zakres: całość (7 szablonów × pl i en, każde zdanie wyjaśnień i sytuacji; zdania „Masz {{w:reka}}…” i założenia „Załóż, że…” to dane zadania, D-1300) · Hierarchia: z CLAUDE.md (ADR-24; szczebel 1 = rachunek) · Skrypty: `dowody/rachunki-niezalezne.txt` (kod 0, 10/10), `dowody/sonda-rachunki.txt` (kod 0, 2100/2100), `dowody/sc30-equity-mc.txt` (kod 0), `dowody/cytaty-odczyt.txt` (49/49 OK), `dowody/content-check.txt` (kod 0), `dowody/tresci-rejestr.txt` (kod 0, 0 błędów). Skróty źródeł jak w `docs/tresci/szablony-robocze/fd/rejestr-hp.md` i `docs/tresci/rejestr-hz.md`; wszystkie otwarte 2026-11-17 (sha256 HTML w `dowody/cytaty-odczyt.txt`). Tłumaczenie en porównane zdanie po zdaniu z pl: zgodne co do sensu i liczb, poza IL-005 (en „holds”).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| T-HZ-01 | `content/pl/scenarios/sc-09.yaml:22` | 3bb + 1bb za limpera | PN; PW | "Raise to 3bb+1bb per limper when playing online"; "Base open size (3bb) + 1 big blind per limper" | POPARTE (szczebel 4; rachunek 4 bb = wariant) | ok | — | — |
| T-HZ-02 | `content/pl/scenarios/sc-09.yaml:24` | mniejsze przebicie: zbyt dobra cena i nie odbiera rozdania | PW; PN | PW: "enough to fold weaker limping hands"; PN: "small enough for the limper to call happily" | CZĘŚCIOWO (cena POPARTE; "nie odbiera rozdania" tylko PW, PN mówi o celu odwrotnie) | ok | zostawić samą cenę | IL-004 |
| T-HZ-03 | `content/pl/scenarios/sc-09.yaml:26` | bez pozycji o 1bb więcej | PW | "Add 1bb more from OOP positions" | POPARTE | gracz na CO, opis standardu | — | — |
| T-HP-01 | `content/pl/scenarios/sc-16.yaml:23` | draw: dwie drogi do wygranej | UP check-raise-lucid | "when they get called they still have a good chance of hitting a flush" | POPARTE | ok | — | — |
| T-HP-02 | `content/pl/scenarios/sc-16.yaml:23` | drawy do koloru i OESD dobre do check-raise'u | UP check-raise-lucid | "Flush draws make for good check-raises"; "Open-enders should check-raise often" | POPARTE treść; termin błędny | ok | `{{t:oesd}}` zamiast "strity otwarte" | IL-002 |
| T-HP-03 | `content/pl/scenarios/sc-16.yaml:23` | wobec małego c-betu ok. 4,5x | UP podcast ep1 | "Use a 4.5x raise vs. smaller c-bets" | POPARTE (patrz "Do sprawdzenia": stoły z figurami) | ok | — | — |
| T-HP-04 | `content/pl/scenarios/sc-16.yaml:25` | nie każdy mocny draw trzeba przebijać | UP podcast ep1 | "You don't always want to raise your high-equity draws" | POPARTE | ok | — | — |
| T-HP-05 | `content/pl/scenarios/sc-16.yaml:25` | wobec c-betu 1/3 potrzebujesz ok. 20% | rachunek 30 ÷ (90 + 60) | — | POPARTE (IL 0,2000 = aplikacja) | ok | — | — |
| T-HP-06 | `content/pl/scenarios/sc-16.yaml:27` | kontynuujesz drawami | R-M6-006, T-HP-02/04 | jw. | POPARTE | ok | — | — |
| T-HP-07 | `content/pl/scenarios/sc-16.yaml:29` | przy 1,5x Button potrzebuje ok. 8% | rachunek 15 ÷ (165 + 15) | — | POPARTE (0,0833; warianty 0,0833) | ok | — | — |
| T-HP-08 | `content/pl/scenarios/sc-16.yaml:29` | ok. 3x–4,5x, więcej przy mniejszym c-becie | UP podcast ep1 | "Use a 3.2x raise vs. larger c-bets" | POPARTE (3 = zaokrąglenie 3,2 nazwane w `numbers.yaml`) | ok | — | — |
| T-HP-09 | `content/pl/scenarios/sc-18.yaml:19` | nadkarta nieco bardziej pomaga zakresowi otwierającego | GW the-worst-turn-card | "Overcards are generally slightly better for the preflop raiser than BB" | POPARTE (zakres) | **nie**: wniosek o ręce | patrz IL-001 | IL-001 |
| T-HP-10 | `content/pl/scenarios/sc-18.yaml:19` | wiele chybionych rąk ma teraz najwyższą parę | GW; PC | "which turned top pair or a draw"; "a huge chunk of your missed range just became top pair" | POPARTE | jw. | — | — |
| T-HP-11 | `content/pl/scenarios/sc-18.yaml:19` | każda para rywala spadła o miejsce | PL | "Whatever pair your opponent held on the flop just got demoted to a worse pair" | CZĘŚCIOWO (źródło: para z flopu; en "holds" obejmuje parę z turnem) | ok | "każda para rywala z flopu" | IL-005 |
| T-HP-12 | `content/pl/scenarios/sc-18.yaml:19` | na takiej karcie otwierający stawia częściej | GW; PC | "There's some correlation between our equity and our betting frequency" | POPARTE (częstość zakresu) | **nie**: "Stawiasz duży" dla każdej najwyższej pary | patrz IL-001 | IL-001 |
| ocena SC-18 | `content/pl/scenarios/sc-18.yaml:12` | bet-big zgodne, check tylko dopuszczalne "oddaje okazję" przy każdym kickerze | GW principles-of-turn-strategy (2); R-M7-003; PL (4) | "Medium-strength hands, including most top pair, consistently check"; PL: "If you never double barrel with top pair, good kicker" | SPRZECZNE przy kickerze < Q (41% wariantów) | — | kickerMin Q albo check zgodne | IL-001 |
| T-HP-27 | `content/pl/scenarios/sc-18.yaml:21` | twoja para bije pary, które spadły | rachunek rang | — | POPARTE | ok | — | — |
| T-HP-14 | `content/pl/scenarios/sc-21.yaml:20` | po sprawdzeniu flopu zakres rywala silniejszy | GW principles | "BB has folded away their equity disadvantage and now has a stronger range on most turns" | POPARTE (źródło UTG vs BB; zasada ogólna) | ok | — | — |
| T-HP-15 | `content/pl/scenarios/sc-21.yaml:20` | jedna karta: mało z ochrony, tani showdown | GW principles | "With less to gain from protection, medium-strength hands have more incentive to check" | POPARTE | ok | — | — |
| T-HP-16 | `content/pl/scenarios/sc-21.yaml:22` | średnie czekają, silne i część drawów stawiają | GW principles | "Third pair, second pair, and even most top pairs strictly check" | POPARTE (100 bb; przy 20 bb inaczej, szablon 100 bb) | ok | — | — |
| T-HP-17 | `content/pl/scenarios/sc-26.yaml:24` | niski SPR: najwyższa para i lepsze grają o stack | GW stack-to-pot-ratio | "Any top pair or better is good enough to stack off, even with no fold equity" | POPARTE (ten sam układ: BTN vs BB, 14 bb, pula 5,5, odpowiedź BB na all-in) | ok | — | — |
| T-HP-18 | `content/pl/scenarios/sc-26.yaml:26` | (pas) przy tak niskim SPR grają o stack | GW; PC | jw.; "One-pair hands like TPTK and overpairs gain value" | POPARTE | ok | — | — |
| T-HP-19, 29 | `content/pl/scenarios/sc-26.yaml:24` | SPR 2 → ok. 40%; im niższy SPR, tym lepsza cena | rachunek s ÷ (1 + 2s); GW | "you would need $200/$500 = 40% equity" | POPARTE (warianty 0,392–0,410) | "rzadziej niż co drugi raz" dosłownie za szerokie | IL-005 | IL-005 |
| T-HP-30 | `content/pl/scenarios/sc-26.yaml:26` | nie musisz być faworytem | rachunek 0,40 < 0,5 | — | POPARTE | ok | — | — |
| sytuacja SC-26 | `content/pl/scenarios/sc-26.yaml:7` | "bez presji ICM" | D-1753/D-1772 | — | POPARTE treść; termin przed definicją | — | — | IL-003 |
| T-HP-20 | `content/pl/scenarios/sc-27.yaml:24` | ten sam ułamek wpłaca stack na riverze | GW pot-geometry; rachunek | "betting an equal fraction of the pot on each street, such that you're all-in by the river" | POPARTE (ułamek 0,6514 = aplikacja) | ok | — | — |
| T-HP-21 | `content/pl/scenarios/sc-27.yaml:24` | w teorii rywal broni się najszerzej, wpłaca najwięcej | GW pot-geometry | "betting geometrically will force the widest theoretical defence" | POPARTE ("w teorii" + założenie w sytuacji) | "więc" łączy dwa twierdzenia GW przyczynowo; kierunek zgodny | — | — |
| T-HP-22 | `content/pl/scenarios/sc-27.yaml:26` | 3 × 1/3 puli przy 92,5bb to tylko ok. 29,9bb | rachunek 16,5 × 49/27 | — | POPARTE (29,944) | zapis "ok. 29,944bb" | `decimals: 1` | IL-006 |
| T-HP-23 | `content/pl/scenarios/sc-27.yaml:26` | już na flopie rozmiar geometryczny | rachunek; GW | "Game theory optimal strategies typically use geometric bet sizes" | POPARTE | ok | — | — |
| T-HP-24 | `content/pl/scenarios/sc-30.yaml:22` | górne 8–10%: głównie pary i najlepsze asy | rachunek (zbiory `topRangeClasses`) | — | POPARTE (8%: 100 z 104 kombinacji; 10%: 122 z 130) | ok | poprawić liczby rejestru | IL-007 |
| T-HP-25 | `content/pl/scenarios/sc-30.yaml:24` | equity < cena sprawdzenia | rachunek: cena 7,5 ÷ 20,5; MC 60 000 | — | POPARTE (min. margines MC 0,0447, aplikacja 0,0448) | ok | — | — |
| T-HP-26 | `content/pl/scenarios/sc-30.yaml:7` | 3-bet mieści się w rękach VPIP (założenie) | dana zadania; PC poker-stats | "the percentage of hands a player has invested money into the pot beyond the blinds and the antes" | POPARTE jako założenie | ok | — | — |
| hud.hands.vpip.low | `content/pl/scenarios/sc-30.yaml:7` | VPIP po co najmniej ok. 100 rękach | PC poker-stats | "For VPIP and PFR, you need at least 100 to 200 hands before the numbers begin to stabilize" | POPARTE | ok | — | — |

## Linia bazowa i założenia
- Hierarchia: CLAUDE.md (ADR-24), nie domyślna z `zrodla.md`. Treść nie jest krytyczna dla zdrowia ani prawa; moduł tresci-krytyczne sprawdzony: brak progów zdrowia/życia/mienia/prawa w 7 szablonach (gra o pieniądze: zastrzeżenia hazardowe poza zakresem szablonów).
- Wymiary pokrycia: fakty, liczby, reguły, oceny zagrań — sprawdzone (tabela wyżej); progi krytyczne — sprawdzone, brak; brakujące ostrzeżenia — IL-001 (brak warunku kickera, który dziedzina i aplikacja w R-M7-003 i D-1256 wymagają); jednostki i warianty regionalne — sprawdzone, brak (reguły gry wspólne; en zgodne z pl poza IL-005); aktualność źródeł — wszystkie otwarte dziś, sha256 w `dowody/cytaty-odczyt.txt`; trudna pamięć — sprawdzone, brak; pary zdań — przeczytane, znaleziska IL-001, IL-005; twierdzenia z jednym źródłem lub niskim szczeblem — SC-09 stoi na szczeblu 4 (PN, PW), z atrybucją w treści brak (rejestr HZ to dopuszcza dla izolacji; patrz IL-004).
- Soczewki (bez subagentów, po kolei): laik dosłowny — IL-005 („rzadziej niż co drugi raz”), IL-002 („strity otwarte”); ekspert szukający szkodliwych uproszczeń — IL-001; sceptyczny weryfikator — 49 cytatów na surowym tekście, wszystkie rachunki od zera; osoba z innego kraju — en czytane osobno.
- Linia bazowa od zera dla ocen o największej szkodzie (E0b): dla SC-18 i SC-21 szukałem w źródłach strategii konkretnej klasy ręki na turnie, a nie tylko częstości zakresu; dla SC-26 sprawdziłem, czy przykład GW to ten sam układ (tak); dla SC-30 policzyłem equity własnym ewaluatorem.
- Wzorzec najlepszych: serwisy solverów publikują strategię na turnie per klasa ręki (GW Principles of Turn Strategy: „Medium-strength hands, including most top pair, consistently check”); szablon oceniający pojedynczą rękę powinien opierać się na takiej warstwie, nie na częstości zakresu.
- Rejestr założeń (`docs/zalozenia.md`): brak zmian proponowanych.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-{09,16,18,21,26,27,30}.yaml` (situation, wyjaśnienia, bounds, decyzje) | tak, całość | tabela weryfikacji; `dowody/sonda-warianty.tsv` |
| `content/en/scenarios/` te same 7 | tak, całość (sens, liczby) | porównanie zdań z pl |
| pozostałe 10 języków tych szablonów | nie (rola 09) | — |
| `content/numbers.yaml` (klucze 7 szablonów) | tak | `dowody/liczby-aplikacji.txt`, `dowody/rachunki-niezalezne.txt` |
| generator wariantów (`packages/poker-core/src/scenario-gen.ts`) — pola liczbowe | tak, próbka 300 ziaren na poziom (ziarna 1–300) | `dowody/sonda-rachunki.txt` |
| equity SC-30 (equity169 aplikacji) | tak, niezależny MC (ziarno 20261117, n = 60 000) | `dowody/sc30-equity-mc.txt`, `dowody/eq_mc.py.txt` |
| źródła 14 adresów | tak, otwarte dziś | `dowody/cytaty-odczyt.txt`, `dowody/h2t.py.txt` |
| terminy: kolejność definicji | tak, wszystkie szablony pl | `dowody/kolejnosc-terminow.txt` |
| rejestr Drive (dokumenty 12, 13, tabela terminologii) | nie (brak odczytu Drive w tej sesji); użyto `content/terms.yaml` jako jedynego źródła nazw | — |
| ekran aplikacji (Expo web) | nie (recenzja treści; zapis „29,944bb” potwierdzony funkcją formatu) | `dowody/liczby-aplikacji.txt` |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs audit/il-recenzja-hz-2026-11-17/raport.md . ` (bez `--rola`, bo ID `IL-NNN` z polecenia; D-1930) → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone”, kod 0 (`dowody/sprawdz-raport.txt`). Cytaty ze źródeł zewnętrznych w raporcie stoją w "…", cytaty z plików repo w „…” (skrypt sprawdza te drugie przy odwołaniu `plik:linia`).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każde zdanie 7 szablonów ma twierdzenie w `rejestr-hp.md`/`rejestr-hz.md`; `pnpm tresci:rejestr` 0 błędów |
| TRE-02 | dotyczy | 49/49 cytatów dosłownie; CZĘŚCIOWO: IL-004, IL-005 |
| TRE-03 | dotyczy | znalezisko IL-001 (wniosek z częstości zakresu rozszerzony na każdą rękę) |
| TRE-04 | dotyczy | ok (szczeble 1, 2, 4; SC-09 tylko szczebel 4, zapisane w rejestrze HZ) |
| TRE-05 | dotyczy | znalezisko IL-001 (szczebel 2 i R-M7-003 przeciw ocenie), IL-004 (szczebel 4 różni się co do celu) |
| TRE-06 | dotyczy | ok rachunkowo (10/10, 2100/2100); IL-006 (zapis), IL-007 (rejestr) |
| TRE-07 | dotyczy | ok: uproszczenia SC-30 („bez gry po flopie”), 3 ≈ 3,2x nazwane |
| TRE-08 | dotyczy | znaleziska IL-002, IL-005 |
| TRE-09 | nie dotyczy | brak faktów zmiennych w czasie w 7 szablonach |
| TRE-10 | nie dotyczy | brak treści krytycznej (CLAUDE.md: przegląd zastępczy D-027 dla poziomu treści, nie progów zdrowia) |
| TRE-11, TRE-12 | nie dotyczy | brak trudnej pamięci i treści lokalizacyjnej |
| TRE-13 | dotyczy | ok: `pnpm content:check` „Treść aktualna (35 baz)”, kod 0 |
| TRE-14 | dotyczy | ok: cytaty w rejestrach ≤ 2 zdania, poza produktem |

## Znaleziska (szczegóły)

### IL-001 · SC-18 uczy dużego second barrela najwyższą parą ze słabym kickerem jako jedynej zgodnej akcji
- Pozycja listy kontrolnej: TRE-03, TRE-05
- Poziom: WYSOKIE (błędne twierdzenie merytoryczne / ocena zagrania; próg wydania CLAUDE.md)
- Realność: realny (41% wariantów) · Pewność: wysoka
- Rodzaj: M
- Dowód: poziom łatwy bez warunku kickera, `content/pl/scenarios/sc-18.yaml:12` „expected: [bet-big], turnClass: overcard, flopMiss: true, pairKind: [top]”; wyjaśnienie czekania `content/pl/scenarios/sc-18.yaml:21` „{{t:check|Czekanie}} jest dopuszczalne, ale oddaje okazję”. Próbka 300 wariantów: 124 to najwyższa para z kickerem 9 lub niższym, np. Kh3h na 6h 4d Tc + Kc, Ac5s na 6c 3d Ks + Ah (`dowody/sc18-kickery.txt`, `dowody/sonda-warianty.tsv`). Reguła tej samej aplikacji `content/pl/rules.yaml:586` „na turnie masz średnią rękę (np. {{t:second-pair|drugą parę}} albo {{t:top-pair|najwyższą parę}} ze słabym kickerem)” → „częściej {{t:check|czekasz}}”. Źródło szczebla 2 (GW Principles of Turn Strategy, odczyt dziś): "Medium-strength hands, including most top pair, consistently check"; "Third pair, second pair, and even most top pairs strictly check" (`dowody/cytaty-odczyt.txt`).
- Mechanizm: wniosek o częstości zakresu („otwierający stawia częściej”, GW worst-turn-card, PC) przeniesiony na ocenę każdej ręki; generator turn-action nie czyta `kickerMin` (warunek tylko w spr-call: `packages/poker-core/src/scenario-gen.ts:1199`), a próg kickera ≥ Q istnieje tylko w turn-bet (`packages/poker-core/src/scenario-gen.ts:1564`). `grep -n "pairKind: \[top\]" content/pl/scenarios/*.yaml` → tylko sc-18 w punkcie turn-action.
- Powraca: tak, analogicznie D-1256 (turn-bet, 2026-11-12: „nie daje błędnej odpowiedzi ‘betuj dużo’ dla średniej ręki”) → trwała kontrola: test wyroczni turn-action z kickerem.
- Wzorzec lub źródło: GW principles-of-turn-strategy (szczebel 2); E2 (weryfikacja przeciwna): źródła popierające second barrel mówią o zakresie (PC: "a huge chunk of your missed range just became top pair") albo o dobrym kickerze (PL: "If you never double barrel with top pair, good kicker"); źródła wspierającego duży zakład najwyższą parą ze słabym kickerem nie znalazłem.
- Kroki w aplikacji: M7 → Scenariusze → SC-18 → np. Kh3h na 6-4-T + K → „Czekam” → ocena „dopuszczalne… oddaje okazję”.
- Opcje: (a) `kickerMin: Q` w poziomie łatwym SC-18 jak D-1256 — wymaga obsługi `kickerMin` w turn-action (rola 08), treść bez zmian; (b) przy kickerze < Q czekanie `compliant`, zakład `inaccuracy` z wyjaśnieniem z R-M7-003 — nowe zdania i przekład; (c) obie akcje `compliant` (ręka mieszana ADR-04) — najsłabszy sygnał dydaktyczny. Rekomendacja: (a), analogia D-1256 i najmniej nowych zdań.
- Test akceptacyjny: każdy wariant SC-18 z oczekiwanym bet-big ma najwyższą parę z kickerem ≥ Q (próbka ≥ 300 ziaren), albo przy kickerze < Q czekanie nie jest oceniane jako gorsze.
- Status: otwarte

### IL-002 · SC-16 nazywa OESD „stritami otwartymi” ze znacznikiem gotowego strita
- Pozycja listy kontrolnej: TRE-08 (jedna nazwa na pojęcie, CLAUDE.md)
- Poziom: ŚREDNIE · Realność: realny · Pewność: wysoka · Rodzaj: M
- Dowód: `content/pl/scenarios/sc-16.yaml:23` „{{t:straight|strity}} otwarte”; en `content/en/scenarios/sc-16.yaml:21` „open-ended {{t:straight}} draws”. Generator losuje `draws: [flush, oesd]` (`content/pl/scenarios/sc-16.yaml:12`); termin `oesd` istnieje (`content/terms.yaml:464`). Dotknięcie pokazuje definicję gotowego strita, a "strity otwarte" to trzecia nazwa pojęcia obok "OESD" i "draw do strita".
- Mechanizm: `grep -rn "strity}} otwarte" content/pl` → 1 trafienie (sc-16); znacznik dodany w HZ D-1827.
- Powraca: nie
- Wzorzec lub źródło: UP check-raise-lucid "Open-enders should check-raise often".
- Kroki w aplikacji: M6 → SC-16 → wyjaśnienie check-raise'u.
- Opcje: (a) pl „{{t:oesd|OESD}}”, en „{{t:oesd|open-ended straight draws}}”; (b) pl „{{t:straight-draw|drawy do strita}} otwarte”. Rekomendacja: (a), nazwa z tabeli terminów.
- Test akceptacyjny: brak `{{t:straight|strity}} otwarte` w treści; kontrola przekładów 10 języków (rola 09).
- Status: otwarte

### IL-003 · SC-26 (M9) używa terminu ICM definiowanego dopiero w m11.l3; to samo w 5 innych szablonach
- Pozycja listy kontrolnej: TRE-08 (pojęcie zdefiniowane przed pierwszym użyciem, CLAUDE.md; BR-KURS-003)
- Poziom: ŚREDNIE · Realność: realny (szablon odblokowany po pierwszej lekcji M9; M11 ma `recommended: false`) · Pewność: wysoka · Rodzaj: M
- Dowód: `content/pl/scenarios/sc-26.yaml:7` „Gra turniejowa bez presji {{t:icm}}”; `content/terms.yaml:1059` icm z `lesson: m11.l3`; odblokowanie `apps/mobile/src/features/scenariusz/dostep.ts:18`. Kontrola BR-KURS-003 obejmuje tylko lekcje (`tests/akceptacja/tresc/kryteria-terminy.test.ts:13`).
- Mechanizm: termin w szablonie modułu mN z lekcją definiującą w module > N; skrypt `dowody/kolejnosc-terminow.txt` → 12 trafień: sc-01, sc-02, sc-03 (3-bet → m3.l2), sc-04 (range-advantage, dry, c-bet → m5), sc-05 (connectors → m4.l1, c-bet, connected → m5.l1), sc-07 (c-bet → m5.l1, backdoor → m6.l2), sc-26 (icm → m11.l3). W zakresie IL tylko sc-26.
- Powraca: nie (dla szablonów; dla lekcji kontrola istnieje) → trwała kontrola: rozszerzyć test BR-KURS-003 na szablony scenariuszy.
- Wzorzec lub źródło: BR-KURS-003 (`docs/brd/wymagania-nauka.md:105`); D-1753 wybrało zastrzeżenie ICM świadomie, bez oceny kolejności definicji.
- Kroki w aplikacji: po pierwszej lekcji M9 → Scenariusze → SC-26.
- Opcje: (a) sytuacja bez słowa ICM: „gra o żetony (bez wpływu wypłat turniejowych)” — nowe zdanie i przekład; (b) zostawić znacznik (dotknięcie pokazuje definicję) i zapisać wyjątek od BR-KURS-003 dla szablonów; (c) przenieść lekcję definiującą ICM wcześniej — sprawa roli 03. Rekomendacja: (b) dla build 1012 (termin ma definicję pod dotknięciem), (a) po wydaniu razem z kontrolą dla wszystkich 6 szablonów; decyzja produktowa.
- Test akceptacyjny: kontrola kolejności terminów dla szablonów zielona albo wyjątek zapisany z ID.
- Status: otwarte

### IL-004 · SC-09 podaje jako powód „nie odbiera mu rozdania”, w czym źródła szczebla 4 się różnią
- Pozycja listy kontrolnej: TRE-05
- Poziom: NISKIE · Realność: brzegowy · Pewność: wysoka · Rodzaj: M
- Dowód: `content/pl/scenarios/sc-09.yaml:24` „daje limperowi zbyt dobrą cenę i nie odbiera mu rozdania” (to samo uzasadnienie w raise, linia 22). PW: "IP, 1 limper 4bb Standard — enough to fold weaker limping hands"; PN (to samo źródło reguły): "These sizings are big enough to discourage the players behind from calling, but small enough for the limper to call happily" (`dowody/cytaty-odczyt.txt`). Część wspólna: cena (PW "gives every limper 4-to-1 odds to call").
- Mechanizm: jedno zdanie w dwóch wyjaśnieniach (pl, en).
- Powraca: nie
- Kroki w aplikacji: M4 → SC-09 → wyjaśnienie.
- Opcje: (a) zostawić samą cenę: „daje limperowi zbyt dobrą cenę”; (b) atrybucja „według serwisu z tabelami preflop”. Rekomendacja: (a).
- Test akceptacyjny: zdanie mówi tylko część wspólną PN i PW.
- Status: otwarte

### IL-005 · Dwa zdania mówią szerzej niż źródło albo rachunek
- Pozycja listy kontrolnej: TRE-08
- Poziom: NISKIE · Realność: brzegowy · Pewność: wysoka · Rodzaj: M
- Dowód: (1) `content/en/scenarios/sc-18.yaml:17` „every {{t:pair}} your opponent holds just dropped one place” (pl `content/pl/scenarios/sc-18.yaml:19` „każda {{t:pair}} rywala spadła o jedno miejsce niżej”) — PL (źródło): "Whatever pair your opponent held on the flop"; para rywala z kartą turnu (np. Kx na turnie K) nie spadła, a często bije parę gracza ze słabym kickerem. (2) `content/pl/scenarios/sc-26.yaml:24` „wystarczy wygrywać rzadziej niż co drugi raz” — dosłownie każde equity < 50% wystarcza; rachunek: wystarcza ok. 40%.
- Mechanizm: 2 zdania × 2 języki.
- Powraca: nie
- Opcje: (a) „każda {{t:pair}} rywala z flopu”/„every pair your opponent held on the flop”; „czyli nie musisz wygrywać co drugi raz”. (b) usunąć oba dopowiedzenia. Rekomendacja: (a).
- Test akceptacyjny: brzmienie zgodne z cytatem PL i z rachunkiem T-HP-19.
- Status: otwarte

### IL-006 · Zapis „ok. 29,944bb” w SC-27 i 6 innych miejscach
- Pozycja listy kontrolnej: TRE-06 (zaokrąglenie)
- Poziom: NISKIE · Realność: realny · Pewność: wysoka · Rodzaj: D
- Dowód: `content/numbers.yaml:405` `g3b.third.total` bez `decimals`; wyrenderowane „29,944bb” (pl) i „29.944bb” (en) w `dowody/liczby-aplikacji.txt`; użycie z „ok.” w `content/pl/scenarios/sc-27.yaml:26`. Wartość poprawna (29,944 = 16,5 × 49/27).
- Mechanizm: `grep -rn "g3b.third.total" content/pl` → 7 trafień: sc-27, `content/pl/lessons/m9-l4-plan-trzech-ulic.md:57`, `:127`, `content/pl/lessons/m9-l3-rozmiar-geometryczny.md:58`, `content/pl/exams/m9.yaml:75`, `:76`, `content/pl/rules.yaml:844`.
- Powraca: tak, zgłoszone w przeglądzie lokalizacji (`docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/ko/podsumowanie.md:370`), bez wpisu z wersją w repo → trwała kontrola: liczba z formułą i jednostką bb/percent ma `decimals`.
- Opcje: (a) `decimals: 1` → „29,9bb”; (b) `decimals: 0` → „30bb”. Rekomendacja: (a).
- Test akceptacyjny: zapis „29,9bb” we wszystkich 7 miejscach i 35 bazach.
- Status: otwarte

### IL-007 · Rejestr HP podaje kombinatorykę górnych 8–10%, której generator nie używa
- Pozycja listy kontrolnej: TRE-06
- Poziom: NISKIE · Realność: teoretyczny (tylko dokument; treść aplikacji poprawna) · Pewność: wysoka · Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/rejestr-hp.md:30` „górne 8% wg equity169 = 110 kombinacji, w tym pary 54 i ręce z asem 52; górne 10% = 134, pary 54, asy 72”. Zbiory z `topRangeClasses` (`dowody/sc30-gorne-zakresy-app.txt`): 8% = 104 kombinacje (pary AA–77: 48, asy bez pary 52, KQs 4); 10% = 130 (pary AA–66: 54, asy 68, KQs i KJs 8). Wniosek „głównie pary i najlepsze asy” prawdziwy (96% i 94%).
- Mechanizm: 1 wiersz rejestru.
- Powraca: nie
- Opcje: (a) poprawić liczby w rejestrze; (b) zastąpić odsyłaczem do dowodu. Rekomendacja: (a).
- Test akceptacyjny: liczby rejestru = zbiory z `topRangeClasses`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- SC-16: UP podcast ep1 podaje też „Use a 3.2x raise on broadway boards vs. the button”; szablon dopuszcza 2 figury na flopie (88 z 300 wariantów), a wyjaśnienie mówi „wobec małego {{t:c-bet|c-betu}} … do ok. 4,5x”. Źródło nie definiuje „broadway board” ani pierwszeństwa reguł; odpowiedzi 4,5x vs 1,5x nie zmienia (D-1933). Brakuje: definicji z UP albo źródła szczebla 2.
- Terminologia z tabeli dokumentu 13 na Dysku: nieczytana w tej sesji; sprawdzone tylko względem `content/terms.yaml`.

## Co działa dobrze i należy zachować
- Wszystkie liczby przez `{{n:}}` z formułami; niezależny rachunek 10/10 i 2100/2100 pól wariantów.
- SC-26 odwzorowuje dokładnie układ GW (BTN vs BB, 14 bb, pula 5,5, odpowiedź na all-in), więc zakres twierdzenia równa się zakresowi źródła.
- SC-30: margines pasu ≥ 0,04 potwierdzony niezależnym MC; uproszczenie „bez gry po flopie” nazwane w obu wyjaśnieniach.
- SC-21 zgodne z GW (średnie ręce czekają) i z R-M7-003.

## Decyzje dla właściciela
- IL-003: wyjątek od BR-KURS-003 dla SC-26 na build 1012 czy zmiana zdania przed buildem (produktowa; rekomendacja: wyjątek teraz, zdanie po wydaniu).
- IL-001 nie wymaga decyzji właściciela (merytoryczna, ADR-24); wybór (a)/(b) techniczny dla 08/06.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania IL-001,IL-002,IL-004,IL-005,IL-006,IL-007` (IL-001 (a) z rolą 08: `kickerMin` w turn-action; IL-003 po decyzji).
