# Reaudyt: Treści i wiedza domenowa — Szkoła Pokera — 2026-11-17
Commit kodu: 196cb8c2b062e46e0f90aaee062fff24fc06f729 (gałąź `claude/sesja-ir-reaudit-m1`) · Baza: 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Tryb: reaudit, pętla 1 (brak wcześniejszych raportów `06-tresci-reaudit-*.md` w katalogu roli) · Subagent opus/high, świeży kontekst.
Środowisko: Linux (chmura), Node v22.23.4, Python 3, `curl` do beyondgto.com, blog.gtowizard.com, upswingpoker.com i cardplayer.com działa (HTTP 200). Bez Xcode i bez zrzutów (zakres treści, nie wyglądu). Sondy w `git worktree add` w scratchpadzie (`pnpm install --offline`, kod 0), w raporcie tylko jako `.txt`. Pełnego `pnpm run ci` nie uruchamiałem (polecenie); IS: pełne ci kod 0 na 5f34458a (`audit/M1-2026-11-17/dowody/M2/ci-koniec-5f34458a.log`, ostatni wiersz „kod=0”), a od 5f34458a do 196cb8c2 zmieniły się tylko pliki `audit/`.
W trakcie mojej pracy sesja koordynująca dodała na gałęzi commity reaudytu (HEAD 8f4709d7: tylko `audit/M1-2026-11-17/reaudit-2026-11-17/` i `docs/decyzje/IR.md`); kod aplikacji i treść = 196cb8c2, więc bez przerwania.

## Podsumowanie
Trzy pozycje z mojego zakresu są zweryfikowane na bieżącym commicie, z dowodem z dzisiejszego odczytu źródeł. Siatki obrony BB (6- i 9-max) mają klasy niepewne dokładnie równe rękom z różnicą ≥ 50 pp wobec beyondgto (16 i 13 klas, równość zbiorów w 35 bazach językowych), a zadania, tryb gry M13 i malowanie przestały oceniać je jako błąd. Skrócenie wyciągów zostawia ≤ 250 znaków na adres (test kod 0), a cytaty rejestru, które zniknęły z plików odczytu, nadal są w rejestrze i w źródle (próbka 5/5 dosłownie). Lekcja M4.l2 i jej siatka oznaczają ręce sporne tak samo jak zadania, a 11 przekładów zdania odpowiada zmianie w pl. Nowe znalezisko jest jedno, P2: identyfikator 06-tresci-502 przypisano dwóm różnym znaleziskom. Żadna pozycja nie blokuje buildu 1012 ani App Store.

| Zadanie | Wynik | Poziom (było → jest) | Blokuje 1012 | Blokuje App Store | Dowód |
|---|---|---|---|---|---|
| M1-audytor-generalny-002 (06-tresci-501) | zweryfikowane | P1 → zamknięte | nie | nie | dowody/002-porownanie-niezalezne.txt, dowody/002-siatki-niepewne-narzedzie.txt, dowody/002-test-content-build.txt, dowody/002-sonda-rangedecision-bb.txt |
| M1-audytor-generalny-007 (06-tresci-001) | zweryfikowane | P1 → zamknięte | nie | nie | dowody/007-test-wyciagi.txt, dowody/007-cytaty-rejestru.txt, dowody/007-probka-zrodla.txt, dowody/007-podciagi.txt |
| M2-koordynator-napraw-001 (KO-129), strona merytoryczna | zweryfikowane (treść); wygląd kropki poza moim zakresem (rola 04) | P1 → zamknięte w treści | nie | nie | dowody/002-m2001-test-mobile.txt, dowody/m2001-siatki-lekcji.txt, dowody/m2001-para-zdan-m4.txt |
| D-2015 (odstępstwo: rola 08 zamiast 06) | ocenione w „Decyzje dla właściciela” | — | — | — | ten raport |
| Próbka regresji TRE: M5.l2 (ziarno 20261117) | bez znalezisk | — | nie | nie | dowody/tre-m5-l2-rachunek.txt, dowody/tre-m5-l2-zrodla.txt |

| ID | Poziom | Wynik | Tytuł | Blokuje 1012 / App Store |
|---|---|---|---|---|
| 06-tresci-001 | P2 | regresja (śledzenie, nie treść) | Identyfikator 06-tresci-502 oznacza dwa różne znaleziska | nie / nie |

## Weryfikacja twierdzeń
Zakres: zadania z polecenia w całości; próbka 5 z 35 cytatów rejestru usuniętych z plików odczytu (`random.Random(20261117).sample`); próbka regresji: jedna lekcja M5 losowo (`random.Random(20261117).choice` z 4 plików → `m5-l2-przewagi.md`), w niej wszystkie 7 kluczy `{{n:}}` i 4 reguły. Hierarchia: z CLAUDE.md (ADR-24). Skrypty: `siatki-niepewne.py` kod 0; niezależne porównanie kod 0; `pnpm content:check` kod 0; `pnpm tresci:rejestr` kod 0 (0 błędów, 1 uwaga sprzed zmian: przekłady bez `sha_pl`), dowody/content-check.txt, dowody/tresci-rejestr.txt (oba kod 0)

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M4-004 / siatka | `content/ranges/spots.yaml:83` (klasy niepewne BB vs BTN) | 16 klas z różnicą ≥ 50 pp jest niepewnych | https://beyondgto.com/defense/bb-vs-btn, siatka 169 klas, atrybut data-tip, pole „defend”; odczyt 2026-11-17 15:29 UTC | "Facing a 2.5bb button open in 6-max cash at 100bb, the big blind 3-bets 13% of hands, calls 32% and folds 55%." | POPARTE (lista = zbiór różnic, bez braków i nadmiaru) | zdanie `content/pl/lessons/m4-l2-obrona-bb.md:73` z siatką: suited bronione < 50% poza listą to tylko śmieci, które źródło też pasuje (T3s 0,09/0,38, 84s 0/0,20) | brak | — |
| R-M4-014 / siatka | `content/ranges/spots.yaml:92` | 13 klas z różnicą ≥ 50 pp jest niepewnych | https://beyondgto.com/defense/bb-vs-sb, jak wyżej | "Facing a 3bb small blind open in 6-max cash at 100bb, the big blind 3-bets 17% of hands, calls 39% and folds 44%." | POPARTE | poza listą 0 rąk z inną akcją większościową niż źródło | brak | — |
| R-M4-004 | `content/pl/lessons/m4-l2-obrona-bb.md:73` „dlatego zwykle bronisz nimi chętniej” | ręce w kolorze, konektory i pary realizują więcej, więc broni się nimi chętniej | jak wyżej (siatka źródła) | — | POPARTE z „zwykle” (źródło broni 74s, 63s, J3s; pasuje 94s–62s) | z siatką pod zdaniem: sporne ręce mają „•” | brak | — |
| R-M5-003 | `content/pl/lessons/m5-l2-przewagi.md:86` (przewaga zakresu na K72) | BB po samym sprawdzeniu ma mało AA/KK/AK | https://blog.gtowizard.com/the-turn-probe-bet/ | "BB lacks the stronger Ace-highs because they would have 3-bet with them preflop." | POPARTE | sąsiednie zdanie o 765 (R-M5-004) zgodne | brak | — |
| R-M5-004 | `content/pl/lessons/m5-l2-przewagi.md:88` | na niskim połączonym flopie przewaga zakresu prawie znika | https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ | "Size down and bet less on flops that complete straights and flushes in your opponent's range." | POPARTE | — | brak | — |
| R-M5-005 | `content/pl/lessons/m5-l2-przewagi.md:92` | przewaga nutsów → większy rozmiar; sama przewaga zakresu → mało | https://blog.gtowizard.com/the-mechanics-of-c-bet-sizing/ | "When your opponent has the nut advantage, but you have the range advantage, you are incentivized to bet small with value." | POPARTE | — | brak | — |
| R-M5-006 | `content/pl/lessons/m5-l2-przewagi.md:96` (67,6%, 29%, 32,4%) | brak pary na flopie 67,6% | rachunek C(44,3)/C(50,3); https://cardplayer.com/poker-tools/odds-and-outs | "a pair (matching one of your holecards) 2.45-1 29.0%" | POPARTE (67,571%; 28,959%; 32,429% = 28,96 + 2,02 + 1,45) | «Dlatego bet często wygrywa pulę od razu» + «Chybienie nie zawsze oznacza fold» — zastrzeżenie obecne (to wzorzec, który audyt M1 wskazał dla 06-tresci-503) | brak | — |

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Źródła beyondgto (4 strony), skróty SHA-256 stron | tak, curl 2026-11-17 15:29 UTC | dowody/002-porownanie-niezalezne.txt |
| Narzędzie autora `docs/tresci/narzedzia/siatki-niepewne.py` na bieżącej bazie pl | tak, kod 0, 0 klas poza `uncertain` w 8 spotach | dowody/002-siatki-niepewne-narzedzie.txt |
| Niezależne porównanie (własne parsowanie data-tip, 35 baz, równość zbiorów, zgodność z `docs/tresci/porownanie-siatek.json`) | tak, kod 0 | dowody/002-porownanie-niezalezne.txt, dowody/002-porownanie-niezalezne.py.txt |
| Test `tools/content-build/test/is-siatki-niepewne.test.ts` i `tools/content-build/test/grading.test.ts` | tak, 27/27, kod 0 | dowody/002-test-content-build.txt |
| Zadania „gram / pas” (engine) na prawdziwych spotach BB z bazy pl, 12 000 instancji | tak, 0 klas niepewnych | dowody/002-sonda-rangedecision-bb.txt, dowody/002-sonda-rangedecision-bb.test.ts.txt |
| Malowanie, siatka lekcji (testy jednostkowe) | tak, 9/9 dopasowanych, kod 0 | dowody/002-m2001-test-mobile.txt |
| Tryb gry M13 (`check: solver-spot`) | kod: `packages/poker-core/src/grading.ts:327` zwraca null dla klasy niepewnej; test grading zielony | dowody/002-test-content-build.txt |
| Scenariusze sc-07, sc-15, sc-16, sc-17, sc-26 | kod przeczytany; uwaga w „Do sprawdzenia” | — |
| Wszystkie siatki w lekcjach pl z `uncertain` (skutek 1d756b0b poza M4.l2) | tak, skan zdań obok 19 siatek (13 z klasami niepewnymi) | dowody/m2001-siatki-lekcji.txt |
| 11 przekładów zdania M4.l2 (linia 73) | tak, diff 0e7e5e00..HEAD przeczytany w każdym języku | ten raport (M2-001) |
| Test wyciągów `tests/narzedzia/wyciagi-zrodel.test.mjs` | tak, 3/3, kod 0 | dowody/007-test-wyciagi.txt |
| Cytaty rejestru vs skrócone pliki; brzmienie wierszy | tak, 35 z 70 cytatów nie ma już w plikach odczytu; wiersze to podciągi oryginału | dowody/007-cytaty-rejestru.txt, dowody/007-podciagi.txt |
| Próbka 5 usuniętych cytatów w źródle | tak, 5/5 dosłownie | dowody/007-probka.txt, dowody/007-probka-zrodla.txt |
| Regresja M5.l2: liczby i reguły | tak | dowody/tre-m5-l2-rachunek.txt, dowody/tre-m5-l2-zrodla.txt |
| Stan CI na `main` (GitHub Actions) | nie sprawdzono: poza zakresem polecenia | — |
| Wygląd kropki (kontrast, 320 pt, duża czcionka) | nie: rola 04 i lista telefonu | — |

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <ten raport> /home/user/Szkola_pokera /home/user/Szkola_pokera/audit/M1-2026-11-17/reaudit-2026-11-17/06-tresci --rola 06-tresci` → wynik w dowody/sprawdz-raport.txt (kod 0 po poprawkach)

`git status --porcelain` na początku (przed pierwszym zapisem): `?? audit/M1-2026-11-17/reaudit-2026-11-17/`; po commitach koordynatora (inne role reaudytu): `?? audit/M1-2026-11-17/reaudit-2026-11-17/06-tresci/` (dowody/git-status-start.txt); na końcu: dowody/git-status-koniec.txt (ten sam wiersz) Plików śledzonych ani `.git/info/exclude` nie zmieniałem; worktree w scratchpadzie usunięty na końcu.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-02 | dotyczy | ok (siatki BB, M5.l2, próbka 007) |
| TRE-05 | dotyczy | ok: sprzeczność kanon (bez walidacji, D-153) vs szczebel 2 rozstrzygnięta klasami niepewnymi (M1-002) |
| TRE-06 | dotyczy (regresja M5.l2) | ok: 7 kluczy = rachunek |
| TRE-08 | dotyczy | ok: pary zdań M4.l2 (linia 73), M4.l1 obok siatek, M5.l2 (linia 96); przekłady zgodne |
| TRE-14 | dotyczy | ok (M1-007) |
| TRE-01, 03, 04, 07, 09, 10, 13 | poza zakresem reaudytu (pliki niezmienione) | nie sprawdzono: zakres polecenia |
| TRE-11, TRE-12 | nie dotyczy (brak treści o miejscach pamięci i lokalizacji) | — |

## Znaleziska (szczegóły)
### 06-tresci-001 · Identyfikator 06-tresci-502 oznacza dwa różne znaleziska
- Pozycja listy kontrolnej: TRE-05 (zapis decyzji i śledzenie)
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: w audycie M1 06-tresci-502 to «Mały blind wobec Buttona prawie nic nie sprawdza» (`audit/M1-2026-11-17/role/06-tresci-b/06-tresci-2026-11-17.md:117`), zadanie M1-audytor-generalny-042 w `audit/M1-2026-11-17/plan-napraw.json` (otwarte, partia 4). Sesja fix nadała ten sam numer nowemu znalezisku o siatce lekcji (`audit/M1-2026-11-17/role/06-tresci/fix-2026-11-17/wynik.md:47`), a za nią poszły `docs/decyzje/IS.md:39` (D-2015), raport M2 (`audit/M1-2026-11-17/M2-koordynator-napraw-2026-11-17.md:46`) i commity 1d756b0b, 5f34458a (w treści: M2-koordynator-napraw-001; 06-tresci-502).
- Mechanizm: sesja fix numerowała nowe znalezisko od 502, a ten numer był już zajęty w raporcie audytu B; `git log --oneline 0e7e5e00..196cb8c2 | grep 06-tresci-502` → 2 commity.
- Powraca: nie
- Wzorzec lub źródło: szablon „Znalezisko”: „ID jest stabilne między audytem, naprawą i ponownym audytem”.
- Kroki w aplikacji: brak (skutek w śledzeniu: przy naprawie M1-042 `grep 06-tresci-502` pokaże commity siatki, a nie zdania o SB).
- Opcje: (a) w IS.md i raporcie M2 dopisać „06-tresci-502 (fix) = nowe ID 06-tresci-505”, historia commitów bez zmian; (b) zostawić i opisać kolizję w M1-042. Rekomendacja: (a).
- Test akceptacyjny: `grep -rn "06-tresci-502" docs/decyzje audit/M1-2026-11-17/plan-napraw.json` wskazuje tylko jedno znaczenie albo jawne mapowanie.
- Status: otwarte (backlog, nie blokuje)

## Do sprawdzenia (pewność ≤ 80%)
- Scenariusze obrony BB (sc-07, sc-15, sc-16, sc-17, sc-26) losują rękę gracza z zakresu obrony kanonu bez pomijania klas niepewnych (`packages/poker-core/src/scenario-gen.ts:811`, wywołanie `packages/poker-core/src/scenario-gen.ts:925`); w BB vs BTN to 14,8% losowań (np. Q8o, K7o, T2s). Decyzji przed flopem te scenariusze nie oceniają, a klasy niepewne projekt uznaje za grane w obie strony, więc ręka nie jest oceniana jako błąd i nie zgłaszam znaleziska. Zdanie wyniku roli 06 «generator scenariuszy pomija je» (`audit/M1-2026-11-17/role/06-tresci/fix-2026-11-17/wynik.md:35`) dotyczy tylko punktów range-spot (`packages/poker-core/src/scenario-gen.ts:843`). Czy przesłanka «sprawdziłeś z Q8o» wymaga zmiany, ocenia rola 06 przy opcji (b) 06-tresci-501 (siatki z opublikowanego rozwiązania).
- Rejestr `docs/tresci/rejestr.json` ma na niektóre adresy ponad 250 znaków cytatów łącznie (np. 20 cytatów z jednego artykułu GTO Wizard); każdy pojedynczy cytat ma ≤ 250 znaków (najdłuższy 240). D-141 dopuszcza „cytat do 250 znaków” w rejestrze, a D-2010 świadomie liczy limit na plik odczytu, więc to nie jest regresja 007. Czy miara na adres ma obejmować rejestr, rozstrzyga rola 06 przy pełnym audycie przed App Store.
- Pełne wyciągi zostają w historii git (D-2010, bez przepisywania historii); ryzyko brzegowe, decyzja właściciela już zapisana.

## Co działa dobrze i należy zachować
- Klasy niepewne mają jedno źródło prawdy (`content/ranges/spots.yaml` z aliasami 9-max) i test, który przy zmianie kanonu wymusza ponowne porównanie (skrót kanonu w `docs/tresci/porownanie-siatek.json`).
- Lekcja M4.l1 nazywa sporne ręce zdaniem („ćwiczenia ich nie oceniają”, `content/pl/lessons/m4-l1-3bet.md:85`), a od 1d756b0b te same ręce mają kropkę w siatce: tekst i siatka mówią to samo.
- Skrócone wiersze odczytów są dosłownymi podciągami oryginału z tym samym numerem wiersza, a nagłówek ma SHA-256 pliku sprzed skrócenia (zgodny z `git show 0e7e5e00`).

## Decyzje dla właściciela
- **D-2015 (rola 08 zamiast 06 dla M2-001): przyjąć, bez zmiany pliku.** Odstępstwo dotyczy wykonawcy kodu; rola 06 w trybie fix nie zmienia kodu aplikacji, więc wybór 08 był właściwy. Merytorykę przed wdrożeniem ocenił koordynator (KO-129), a nie sesja z kompetencją roli 06, i po wdrożeniu nikt z roli 06 jej nie sprawdził. Recenzja niezależna 08 sprawdzała kod i dane, nie sens oznaczenia. Ten reaudyt (rola 06) uzupełnia tę lukę: kropka „•” stoi dokładnie na klasach, których zadania nie oceniają, a malowanie zalicza w obie strony. Opis „mieszana” zgadza się z regułą CLAUDE.md dla sprzeczności (ręka mieszana, ADR-04). W pozostałych 4 lekcjach, w których zmiana dodała kropki (M3.l3, M4.l1, M11.l1, M11.l2), żadne zdanie przy siatce nie przeczy oznaczeniu. Opcje: (a) przyjąć D-2015 z adnotacją „merytoryka sprawdzona w reaudycie 06” — bez kosztu; (b) na przyszłość dodać do polecenia napraw krok „rola 06 sprawdza treść po zmianie kodu, która zmienia to, co pokazuje lekcja” — jeden subagent więcej na taką zmianę. Rekomendacja: (a) teraz, (b) do backlogu procesu.
- 06-tresci-001: wybór (a) lub (b), bez wpływu na wydanie.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001` (po buildzie 1012; tylko zapis mapowania ID w `docs/decyzje/IS.md` i raporcie M2).
