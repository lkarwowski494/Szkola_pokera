# Recenzja niezależna: sesja CZ (46197812..ee7f991a) — Szkoła Pokera — 2026-11-11
Commit: ee7f991a71aa3fbdfa5c80b508416c8fd6bb679d (gałąź `sesja-df-recenzja` = `origin/sesja-cz-jakosc`) · Tryb: audit (rola 07, recenzja w świeżym kontekście, D-043) · Środowisko: Linux, Node v22.23.4, pnpm 10.28.0, vitest i jest działają; Maestro i symulator iOS niedostępne (flow 07 oceniony statycznie).

## Werdykt: PRZYJĄĆ Z WARUNKIEM
Warunek: flow `07-scenariusz.yaml` nie idzie na symulator ani do bramki, dopóki 07-jakosc-001 nie jest naprawione, a test odtwarzający `tests/narzedzia/df-flow-zakoncz.test.mjs` nie jest zielony i włączony do `pnpm test:skrypty`. Zmiany testów ŚR-006, NIS-007 i 08-programista-004 można przyjąć: wzmacniają kontrole i niczego nie luzują poza jednym miejscem opisanym w 07-jakosc-003. Dwa znaleziska ŚREDNIE (002, 003) to luki w sile nowych testów, bez wpływu na obecną treść, więc do backlogu albo do tej samej naprawy (koszt kilku linii). Próg projektu (CLAUDE.md, „Audyty i wydania” pkt 1): blokują tylko KRYTYCZNE i WYSOKIE.

| Waga | Liczba |
|---|---|
| KRYTYCZNE | 0 |
| WYSOKIE | 1 |
| ŚREDNIE | 2 |
| NISKIE | 2 |

## Podsumowanie
Testy z ŚR-006 i NIS-007 łapią błędy, dla których powstały: mutanty C, D, G i H padają (sekcja „Komendy”). Zmiana „generator dostaje stackBb/positions jak aplikacja” dotyczy tylko testów. Kod `tools/content-build/src`, `packages/` i `apps/mobile/src` jest w zakresie bez zmian, a regeneracja treści daje pusty diff, więc odciski i identyfikatory się nie zmieniają. Najpoważniejszy problem jest w flow Maestro 07. Pętla lekcji stuka `'(Dalej|Zakończ)'`, a ten wzorzec pasuje też do stałego przycisku „Zakończ” u góry ekranu sesji, który porzuca lekcję. Według kodu wyboru elementu w Maestro flow w pierwszym obrocie pętli porzuci lekcję m2.l1 i nie dojdzie do scenariusza. Test w Node z sesji CZ tego nie wykrywa. Do decyzji: sposób naprawy flowu (opcje w 07-jakosc-001), rekomendacja to `testID` na przycisku pod oceną.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 07-jakosc-001 | WYS (P1) | D | Flow 07: `'(Dalej|Zakończ)'` trafia w „Zakończ” porzucający lekcję; flow nie dojdzie do scenariusza | otwarte, test odtwarzający czerwony |
| 07-jakosc-002 | ŚR (P2) | D | Fixture „D-630 zgłasza błąd” nie izoluje D-630: mutanty usuwające lub psujące warunek D-630 przeżywają | otwarte |
| 07-jakosc-003 | ŚR (P2) | D | Wyrocznia „air” z rang i kolorów nie wyklucza gotowego strita; usunięta kontrola klasy przepuszcza mutanta | otwarte |
| 07-jakosc-004 | NIS (P2) | D | Mapa pokrycia `cz-pokrycie` liczy szablon jako pokryty, gdy pokryty jest jeden jego punkt | otwarte |
| 07-jakosc-005 | NIS (P2) | D | `some` w bv-gotowa-reka i stos-zakladu-bu bez fixture mieszanego: filtr punktu niczego dziś nie sprawdza | otwarte |

## Komendy (każda osobno)
| Komenda | Kod wyjścia | Wynik (liczby) | Uwagi |
|---|---|---|---|
| `pnpm install --frozen-lockfile` | 0 | zależności z blokady | — |
| `npx vitest run` 5 plików testów CZ (kopia @ee7f991a) | 0 | 62/62 | dowody/df-baza-testy.txt, 158 s |
| `pnpm content:build` na kopii + `git status --porcelain` | 0 | pusty diff | dowody/df-regeneracja.txt |
| mutant A: usunięty warunek D-630 w `bledyD630` | 0 (przeżył) | 3 passed | dowody/df-mut-A-bez-D630.txt |
| mutant B: `v.decisions.length === 1` → `v.points.length === 1` | 0 (przeżył) | 3 passed | dowody/df-mut-B-points-length.txt |
| mutant C: pętla po `v.decisions` z numerem draw-call | 1 (zabity) | 2 failed | dowody/df-mut-C-indeks-decisions.txt |
| mutant D: filtr `every` zamiast `some` | 1 (zabity) | 2 failed | dowody/df-mut-D-every.txt |
| mutant E: generator przyjmuje klasę `weak` jako air | 1 (zabity) | 4 failed | dowody/df-mut-E-air-przyjmuje-weak.txt |
| mutant F: generator przyjmuje strit jako air, `szablony-co` | 1 | 1 failed (tylko sc-12 średni, przez kolor) | dowody/df-mut-F-air-przyjmuje-strit.txt; sc-12 łatwy przeszedł |
| sonda F: strity w wariantach air pod mutantem F | — | sc-12 łatwy 413/10000, średni 415/10000 | dowody/df-sonda-F.txt |
| mutant F4/F5: `classifyHolding` nie daje strita do very-strong | 0 / 1 | poker-core 179/179; content-build 1 failed (tylko odciski) | dowody/df-mut-F4-classifyHolding-strit-air.txt, dowody/df-mut-F5-classifyHolding-strit-content-build.txt |
| mutant G: ręka cbet-case spoza zakresu otwarcia | 1 (zabity) | 4 failed | dowody/df-mut-G-cbet-reka-spoza-zakresu.txt |
| mutant H: generator bez limitu zakładu do stosu | 1 (zabity) | 2 failed (sc-02, sc-19) | dowody/df-mut-H-bez-limitu-stosu.txt |
| mutanty CK1, CK2 (`WyborScenariusza`: odwrócony warunek, zły klucz) | 1, 1 (zabite) | 1 failed każdy | dowody/df-mut-CK1-warunek-odwrocony.txt, dowody/df-mut-CK2-zly-klucz.txt |
| `node --test tests/narzedzia/df-flow-zakoncz.test.mjs` | 1 (czerwony, zgodnie z celem) | 1 pass, 1 fail | dowody/df-repro.txt |
| `pnpm run ci` na 3c9db98e (ee7f991a + test odtwarzający poza `test:skrypty`) | 0 | mobile 910/910, content-build 430 + 1 expected fail, domena 347 + 1, postep 160/160 | docs/jakosc/dowody/df-ci-3c9db98e.txt (ten sam plik: test odtwarzający osobno, kod 1) |

## Linia bazowa i założenia
Ryzyka spisane od zera, zanim przeczytałem raport autora (D-043, polecenie DF pkt 3.1):
- **Liczby, których aplikacja uczy:** cena sprawdzenia, D-630 i implied odds w punktach draw-call. Kluczowe jest pytanie, czy rachunek obejmuje punkt draw-call po innym punkcie (ŚR-006). Wynik: tak (mutanty C i D zabite), ale gałąź D-630 nie jest przypięta (002).
- **Twierdzenia treści:** „ręka bez pary i bez drawa chybiła” w SC-11 i SC-12 (`content/pl/scenarios/sc-12.yaml:27`). Ręka musi pochodzić z zakresu otwarcia BTN (mutant G zabity). Wyrocznia „air” nie wyklucza gotowego strita (003).
- **Zgodność testu z aplikacją:** wariant w teście musi być tym samym, który pokazuje ekran. `naGenerator` (`apps/mobile/src/features/scenariusz/wariant.ts:61-65`) i `checkScenarioGenerator` (`tools/content-build/src/scenariusze.ts:239`) podają `stackBb` i `positions`. CZ dopisało je w testach bs i bv, więc testy sprawdzają te same warianty co aplikacja. Pod limitem stosu (`packages/poker-core/src/scenario-gen.ts:538-540`) zbiór wariantów jest podzbiorem dawnego, a asercje się nie zmieniły. To wyrównanie do aplikacji, nie poluzowanie.
- **Ścieżka wrażliwa `tools/content-build/`:** zmienione są tylko pliki w `test/`. Regeneracja na kopii daje pusty diff (dowody/df-regeneracja.txt), więc odciski i identyfikatory w powtórkach są bez zmian.
- **Główny przepływ scenariusza (PR-05) w E2E:** flow 07 musi być zgodny z ekranem sesji i scenariusza. Wynik: niezgodny (001).
- **Dowód siły testu CK (08-programista-004):** moje mutanty CK1 i CK2 zabite.

Soczewki: użytkownik dostający błędne twierdzenie (003), programista zmieniający `classifyHolding` (003), sceptyk szukający testu, który nie może paść (002, 005), właściciel czekający na wynik E2E z runnera macOS (001).

Wzorzec: wybór elementu w Maestro przy wielu dopasowaniach. Odczyt źródła 2026-11-11 jest zapisany w dowody/df-maestro-wybor-elementu.txt (fragmenty Orchestra.kt i Filters.kt). Selektor bez `index` dostaje `Filters.clickableFirst()`, czyli stabilne sortowanie po `clickable`, a potem brany jest pierwszy element w kolejności drzewa. CI instaluje bieżące Maestro bez przypiętej wersji (`.github/workflows/e2e-ios.yml:150`).

## Pokrycie
| Obszar / pliki | Sprawdzone? | Jak |
|---|---|---|
| `tools/content-build/test/szablony-bs.test.ts`, fixture `cz-range-draw/` | tak | odczyt, mutanty A–D |
| `tools/content-build/test/stos-zakladu-bu.test.ts`, `bv-gotowa-reka.test.ts` | tak | odczyt, mutant H, przegląd treści pl (brak szablonów mieszanych) |
| `tools/content-build/test/cz-pokrycie-szablonow.test.ts` | tak | odczyt, mutant D |
| `tools/content-build/test/szablony-co.test.ts` (NIS-007) | tak | odczyt, mutanty E, F, F4, F5, G, sonda F |
| `apps/mobile/src/features/scenariusz/__tests__/wybor-pusta-lista-ck.test.tsx` | tak | mutanty CK1, CK2 |
| `apps/mobile/e2e/oczekujace/07-scenariusz.yaml`, README | tak, statycznie | porównanie z `session.tsx`, `pl.json`, `WyborScenariusza.tsx`, `komponenty.tsx`, `dostep.ts`, źródłem Maestro |
| `tests/narzedzia/e2e-flowy.test.mjs` | tak | odczyt; poszerzenie kontroli id na `oczekujace/`, bez poluzowania |
| przebieg flow 07 na symulatorze | nie | Linux bez Xcode; krok dla E2E w sekcji „Do sprawdzenia” |
| `docs/programista/dowody/cz-ci-9c38b12e.txt` (3279 linii) | nie | dowód autora; mój przebieg CI osobno |

## Kontrola dowodów i sekretów
`node <scratchpad>/sprawdz-raport.mjs docs/jakosc/recenzje/recenzja-cz-ee7f991.md . --rola 07-jakosc` → kod 0: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 07-jakosc”.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| JAK-01 | dotyczy (ryzyka z zakresu CZ) | ok poza 001 |
| JAK-02 | dotyczy | 003 (wyrocznia niepełna); wyrocznia zakresu z surowego JSON: ok |
| JAK-03 | nie dotyczy: recenzja zakresu zmian, nie kryteriów | — |
| JAK-04 | dotyczy | 002, 003, 005 |
| JAK-05 | dotyczy | ok: ziarna 1…N deterministyczne, bez zegara |
| JAK-06 | nie dotyczy: brak logiki dat w zakresie | — |
| JAK-07 | nie dotyczy: brak testów własności w zakresie | — |
| JAK-08 | nie dotyczy: brak danych z zewnątrz | — |
| JAK-09 | dotyczy | ok: test odtwarzający celowo poza `test:skrypty` (D-912) |
| JAK-10, JAK-11 | nie dotyczy: workflowy bez zmian | — |
| JAK-12 | dotyczy | 001; przebieg nie sprawdzono (Linux) |
| JAK-13 | nie dotyczy | — |
| JAK-14 | nie dotyczy: brak wyzwalania po lokalizacji | — |
| JAK-15 | dotyczy | 001 obala twierdzenie README flowów „asercje zgodne z ekranem” (`apps/mobile/e2e/oczekujace/README.md:18-20`) |
| JAK-16 | nie dotyczy: recenzja zmian, nie kandydat do wydania | — |
| JAK-17 | dotyczy | ok: nazwy testów zgodne z działaniem poza 002 (nazwa obiecuje D-630) |
| JAK-18 | nie dotyczy: stan `main` poza zakresem recenzji | — |

## Znaleziska

### 07-jakosc-001 · Flow 07 porzuca lekcję m2.l1 zamiast ją ukończyć, więc nie dochodzi do scenariusza
- Pozycja listy kontrolnej: JAK-12
- Poziom: P1 (WYS)
- Realność: realny · Pewność: wysoka (wybór elementu potwierdzony w źródle Maestro; przebieg na symulatorze nie sprawdzony)
- Rodzaj: D
- Dowód:
  - flow: `apps/mobile/e2e/oczekujace/07-scenariusz.yaml:66` „- tapOn: '(Dalej|Zakończ)'” (to samo w `scrollUntilVisible`, linia 62);
  - ekran sesji renderuje stały przycisk końca sesji u góry: `apps/mobile/src/app/session.tsx:361` „{t('session.end')}”;
  - przycisk pod oceną jest później w drzewie: `apps/mobile/src/app/session.tsx:414` „idx + 1 < items.length ? t('session.next') : t('session.finish')”;
  - oba „Zakończ” mają ten sam tekst: `apps/mobile/src/i18n/locales/pl.json:218` „"end": "Zakończ",” i linia 206 (`finish`);
  - górny „Zakończ” porzuca aktywność i wraca: `apps/mobile/src/app/session.tsx:216` „void porzucAktywnosc(port, s.id, Date.now()).then((w) => {”;
  - Maestro bez `index` bierze pierwsze dopasowanie w kolejności drzewa po stabilnym `clickableFirst`: dowody/df-maestro-wybor-elementu.txt ;
  - przycisk jest osiągalny tekstem: flow 09 w bramce stuka „Zakończ” po odpowiedzi, żeby zakończyć sesję (`apps/mobile/e2e/09-limit-dnia.yaml:18`);
  - test odtwarzający: dowody/df-repro.txt (kod 1; błąd: tapOn '(Dalej|Zakończ)' pasuje do „Dalej” i do „Zakończ” session.end).
- Mechanizm: selektor tekstowy pasujący do „Dalej” i do „Zakończ” sesji. Sprawdziłem wszystkie flowy, także oczekujące (`tests/narzedzia/df-flow-zakoncz.test.mjs`), i trafia tylko flow 07 (2 kroki, linie 62 i 66).
- Powraca: nie → trwała kontrola: `df-flow-zakoncz.test.mjs` w `pnpm test:skrypty`.
- Kroki: pierwszy obrót pętli w sesji lekcji to `option-0`, potem `scrollUntilVisible` kończy się od razu, bo górny „Zakończ” jest widoczny, a `tapOn` porzuca lekcję i wraca do jej ekranu. Kolejny obrót nie znajduje „Dalej”/„Zakończ” i po 30 s pada. Nawet przy innej kolejności drzewa ostatnie zadanie ma dwa „Zakończ”, a górny po ostatniej odpowiedzi tylko wraca (`router.back()`), bez ekranu „Wynik”.
- Opcje:
  - (a) `testID` na przycisku pod oceną (np. `sesja-dalej`) w `apps/mobile/src/app/session.tsx:414`, a flow stuka po `id`. Zmiana aplikacji to jedna linia, rola 08. Selektor jest odporny na tekst i język, podobnie jak `option-<i>` i `scenariusz-<id>`.
  - (b) Bez zmiany aplikacji: w pętli `tapOn: 'Dalej'`, a na ostatnim zadaniu `tapOn: { text: 'Zakończ', index: 1 }`. Zależy to od kolejności drzewa iOS i od tego, czy element jest poza ekranem, więc jest kruche.
  - (c) Selektor względny (`below:` licznika „n z N”). Też zależy od układu.
  - Rekomendacja: (a). Ta sama konwencja co reszta flowów stukających po `id` (README flowów: „Każde id we flowie … ma testID”).
- Test akceptacyjny: `node --test tests/narzedzia/df-flow-zakoncz.test.mjs` zielony i włączony do `pnpm test:skrypty`, a potem przebieg flow 07 na symulatorze z zrzutami `07-przed-decyzja`, `07-ocena`, `07-podsumowanie`.
- Status: otwarte.

### 07-jakosc-002 · Test „D-630 zgłasza błąd przy punkcie #2” przechodzi bez działającego warunku D-630
- Pozycja listy kontrolnej: JAK-04
- Poziom: P2 (ŚR)
- Realność: teoretyczny (w treści pl nie ma szablonu z innym punktem przed draw-call) · Pewność: wysoka
- Rodzaj: D
- Dowód: asercja przyjmuje błąd D-630 albo „pas nieodporny” (`tools/content-build/test/szablony-bs.test.ts:82`). Fixture „zły” zawsze daje też „pas nieodporny”, więc mutant A (usunięty warunek z `:60`) i mutant B (`v.points.length === 1`, czyli dokładnie pomyłka punkt / decyzja, którą miało przypiąć ŚR-006) przeżywają: dowody/df-mut-A-bez-D630.txt, dowody/df-mut-B-points-length.txt (kod 0).
- Mechanizm: alternatywa w asercji akceptuje inny komunikat; `grep -n "pas nieodporny/" tools/content-build/test/*.ts` → 1 trafienie (`tools/content-build/test/szablony-bs.test.ts:82`).
- Powraca: nie.
- Opcje: (a) asercja wymaga co najmniej jednego komunikatu D-630 przy #2 (`b.some((x) => /#2: .*\(D-630\)/.test(x))`) — jedna linia; (b) drugi fixture, w którym implied odds nie przekraczają stosu, a łamie tylko D-630 — czystszy, więcej pracy. Rekomendacja: (a).
- Test akceptacyjny: mutanty A i B padają.
- Status: otwarte.

### 07-jakosc-003 · Wyrocznia „air” w SC-11/SC-12 nie wyklucza gotowego strita, a CZ usunęło kontrolę klasy
- Pozycja listy kontrolnej: JAK-02
- Poziom: P2 (ŚR)
- Realność: teoretyczny (dziś `classifyHolding` daje strit do `very-strong`, `packages/poker-core/src/holding.ts:78`, więc generator go nie pokazuje) · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - wyrocznia sprawdza tylko parę i outy drawa: `tools/content-build/test/szablony-co.test.ts:143-144`; `outyDrawa` przy gotowym stricie zwraca 0 outów strita;
  - treść: `content/pl/scenarios/sc-12.yaml:27` mówi o ręce „bez {{t:pair|pary}} i bez {{t:draw|drawa}} chybiła”;
  - mutant F4/F5 w `classifyHolding` (strit nie trafia do very-strong) przeżywa poker-core (179/179) i wszystkie testy zgodności content-build. Pada tylko migawka odcisków `generator-odciski` (dowody/df-mut-F5-classifyHolding-strit-content-build.txt), czyli detektor zmiany, nie wyrocznia; przy zamierzonej zmianie modelu bota programista ją przegeneruje;
  - pod mutantem F sc-12 łatwy pokazuje gotowego strita w 413 z 10 000 wariantów (dowody/df-sonda-F.txt), a `szablony-co` dla sc-12 łatwy przechodzi (dowody/df-mut-F-air-przyjmuje-strit.txt);
  - wcześniejsza kontrola `classifyHolding(...).cls !== 'air'` łapała mutanta F w `holdingMatches`, a CZ ją usunęło (`git diff 46197812..ee7f991a -- tools/content-build/test/szablony-co.test.ts`).
- Mechanizm: wyrocznia „chybiła” = brak pary i brak drawa, bez gotowego układu z kartą gracza. `grep -n "filtrem air" tools/content-build/test/*.ts` → `tools/content-build/test/szablony-co.test.ts:143-144` i fixture `szablony-f2-ca.test.ts` (klasa z `classifyHolding`).
- Powraca: nie.
- Opcje: (a) dodać do wyroczni brak gotowego strita i koloru z rang i kolorów (5 kolejnych rang w ręce i flopie z kartą gracza; 5 kart w kolorze) i przywrócić kontrolę `cls === 'air'` jako drugą, zależną kontrolę — kilka linii; (b) tylko przywrócić `cls === 'air'`: zamyka mutanta F, nie F4. Rekomendacja: (a).
- Test akceptacyjny: mutanty F i F4 padają w `szablony-co.test.ts` dla sc-12 łatwy.
- Status: otwarte.

### 07-jakosc-004 · Mapa pokrycia uznaje szablon za pokryty, gdy pokryty jest jeden z jego punktów
- Pozycja listy kontrolnej: JAK-04
- Poziom: P2 (NIS)
- Realność: teoretyczny (brak szablonów mieszanych w pl) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/cz-pokrycie-szablonow.test.ts:22` filtruje `!t.decisions.some((d) => TESTY[rodzaj(d)])`, a komentarz w `:11` sam nazywa range-spot luką. Szablon range-spot + draw-call przejdzie test pokrycia, choć jego punkt range-spot nie ma testu zgodności na treści pl.
- Mechanizm: `some` zamiast `every` po punktach w teście pokrycia; 1 trafienie.
- Powraca: nie.
- Opcje: (a) `every` po punktach z jawną listą wyjątków z powodem; (b) zostawić i opisać w strategii. Rekomendacja: (a).
- Test akceptacyjny: fixture z range-spot + draw-call w katalogu pl-podobnym daje czerwony test pokrycia.
- Status: otwarte.

### 07-jakosc-005 · Zmiana na `some` w bv-gotowa-reka i stos-zakladu-bu nie ma fixture, który by ją sprawdził
- Pozycja listy kontrolnej: JAK-04
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: wszystkie szablony pl z draw-call mają same punkty draw-call (sc-01, sc-02, sc-03, sc-19), więc filtr `d.point !== 'draw-call'` (`tools/content-build/test/bv-gotowa-reka.test.ts:32`) nie ma dziś na czym zadziałać; fixture `cz-range-draw` używa tylko `szablony-bs`.
- Mechanizm: fixture mieszany podpięty do jednego z trzech plików mapy `TESTY['draw-call']`.
- Opcje: (a) podpiąć `cz-range-draw` także w bv i bu (kilka linii); (b) zostawić, bo `cz-pokrycie` pilnuje filtra tekstem źródła. Rekomendacja: (a).
- Test akceptacyjny: usunięcie `d.point !== 'draw-call' ||` w bv daje czerwony test na fixture.
- Status: otwarte.

## Do sprawdzenia
Rzeczy, które musi potwierdzić przebieg E2E flow 07 na symulatorze (po naprawie 001):
- „Twoja odpowiedź liczbowa” to etykieta pola (`apps/mobile/src/i18n/locales/pl.json:228`), a nie widoczny tekst. Maestro dopasowuje też `hintText`/etykietę dostępności, ale na iOS trzeba to potwierdzić, tak samo jak to, że klawiatura nie zasłania „Sprawdź” (lekcja m2.l1 ma 3 zadania liczbowe).
- Trwałość ukończenia lekcji po `stopApp` (`apps/mobile/e2e/oczekujace/07-scenariusz.yaml:69`): ukończenie zapisuje się przy ostatniej odpowiedzi, przed ekranem „Wynik”. Kod tego nie wyklucza, ale przebieg tego nie potwierdził.
- Budżet czasu w bramce (`e2e-flowy.test.mjs`: 3 min na flow): flow 07 przechodzi 12 zadań lekcji i scenariusz. Przed przeniesieniem do bramki trzeba zmierzyć czas.
- Ocena „Błąd” po pasie w SC-01 łatwy: testy RNTL to pokrywają, na ekranie nie zostało to sprawdzone.
- Dla roli 04 (SP), nie znalezisko tej roli: po ostatniej odpowiedzi ekran sesji ma dwa przyciski „Zakończ” o różnym skutku (ukończenie i porzucenie). VoiceOver czyta je tak samo (`apps/mobile/src/app/session.tsx:361` i `apps/mobile/src/app/session.tsx:414`).
- Autor (D-882) przekazał roli 06 pytanie merytoryczne, czy gutshot to „air”. Treść mówi „bez drawa”, a w ok. 20% wariantów jest gutshot. Nie powielam tego pytania.

## Co działa dobrze i należy zachować
- Indeksowanie po punkcie szablonu (`v.points`, `d.point`) w bs i bv oraz fixture zgodny/zły: mutant C (stare indeksowanie) pada.
- Wyrocznia zakresu otwarcia z surowego `preflop-6max-100bb.json` bez `compileRanges`: mutant G pada w 4 testach.
- Kontrola id także we flowach oczekujących i przesłanki flow 07 z treści w Node (D-885).
- Test CK pustej listy: pada na odwróconym warunku i na złym kluczu.
- Wyrównanie wejścia generatora w testach do `naGenerator` aplikacji (ten sam zbiór wariantów co na ekranie).

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje techniczne recenzenta D-912 i D-913 są w `docs/decyzje/DF.md` (do weta). Sposób naprawy 001 rozstrzyga sesja naprawy według rekomendacji (a), a koordynator może go zmienić.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 07-jakosc-001` (testID w `session.tsx` i flow), a potem `node tools/assemble.mjs 07-jakosc --tryb fix --zadania 07-jakosc-002,07-jakosc-003,07-jakosc-004,07-jakosc-005` (testy). Po naprawie: przebieg E2E flow 07 na runnerze macOS za zgodą właściciela.
