# Weryfikacja g7-tresc (M1, 2026-11-17)

Wejście: `audit/M1-2026-11-17/weryfikacja/wejscie-g7-tresc.md`. Repozytorium: gałąź `claude/sesja-ir-audyt-m1`; poza `audit/` różni się od f75acdff tylko plikiem `docs/decyzje/IR.md` (sprawdzone `git diff --name-only f75acdff HEAD`), więc treść i kod aplikacji to f75acdff. Źródła zewnętrzne pobrane ponownie dziś (curl, odczyt 2026-11-17) do scratchpadu; dane z nich wyłącznie jako dane. Hierarchia ADR-24 z CLAUDE.md: rachunek → opublikowane solvery → książki → serwisy.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 06-tresci-501 | potwierdzone (rozbieżność znana z D-153, ale bez klas niepewnych i bez oceny skutku w ćwiczeniach) | dowody/g7-tresc-501-siatki.txt, dowody/g7-tresc-501-ocena.txt | P1 (WYSOKIE: błędne twierdzenie merytoryczne) | tak | tak |
| 06-tresci-502 | potwierdzone (słabsze niż w opisie: zdanie ma przeczytane źródło szczebla 2 w R-M4-003) | dowody/g7-tresc-502-zrodla.txt | P2 (NISKIE) | nie | nie |
| 06-tresci-503 | potwierdzone (bez źródła dla „dlatego”; zarzut sprzeczności z m5-l2 częściowo obalony) | dowody/g7-tresc-503-zdanie.txt | P2 (ŚREDNIE) | nie | nie |
| 06-tresci-002 | potwierdzone (luka w rejestrze; samo zdanie prawdziwe) | dowody/g7-tresc-002-hazard.txt | P2 (NISKIE) | nie | nie |
| 06-tresci-003 | potwierdzone | dowody/g7-tresc-003-504-wazne-do.txt | P2 (NISKIE) | nie | nie |
| 06-tresci-504 | potwierdzone częściowo (ta sama przyczyna co 003; rozbieżność dat wyjaśniona, wartości dziś bez zmian) | dowody/g7-tresc-003-504-wazne-do.txt | P2 (NISKIE), duplikat 003 | nie | nie |

Wspólne przyczyny: 003 i 504 to jedna przyczyna (zasada `wazne_do` tylko dla numerów pomocy); 504 jest podzbiorem 003 (tylko `n:rake.*`) i można je scalić. 501 i 502 dotyczą tego samego zjawiska (solver aplikacji kontra opublikowane tabele BeyondGTO/GTO Wizard), ale mają różne przyczyny i naprawy.

## 06-tresci-501 · Siatki obrony BB bez klas niepewnych

Wynik: **potwierdzone**. Poziom P1 pasuje do skutku.

Dowód odtworzony niezależnie (własny skrypt, kolejność klas z `HAND_CLASSES` w `packages/poker-core/src/ranges.ts`, świeże pobranie BeyondGTO): dowody/g7-tresc-501-siatki.txt, kod 0. Liczby zgadzają się z opisem co do ręki: BB vs BTN obrona aplikacji 0,496 wobec opublikowanej 0,451, 16 rąk (136 kombinacji) z różnicą 50 pp lub więcej (m.in. T2s 1,00 wobec 0, Q8o 1,00 wobec 0, K7o 1,00 wobec 0, J3s 0,01 wobec 1,00, 74s 0,18 wobec 1,00, 63s 0,15 wobec 1,00); BB vs SB 13 rąk (116 kombinacji), m.in. A3o 0 wobec 1,00, 32s 0 wobec 1,00. Klasy niepewne w bazie `[]` we wszystkich czterech spotach (także `nine.*`). Strona BeyondGTO dziś: „T2s · fold 100%”, „J3s · call 100% · defend 100%”.

Czy coś to unieważnia:
- Decyzja D-153 i `docs/tresci/e1b-solver.md:50` „zgodność „gram / pas” z BeyondGTO 89,7% i 91,3%” — projekt wiedział o ok. 10% rozbieżnych kombinacji i świadomie zostawił siatki z dopiskiem (odrzucone: ukrycie siatek). To **nie unieważnia** znaleziska: (1) D-153 nie rozważył klas niepewnych, czyli środka, którego projekt używa w innych spotach (`content/ranges/spots.yaml:56` „kanon różni się od opublikowanych tabel solvera (defense/btn-vs-co, NL500, 100bb)”), więc znalezisko wskazuje alternatywę, której decyzja nie odrzuciła; (2) zgodność BB vs BTN wynosi dziś 87,9% (ważone kombinacjami), nie 89,7%; (3) solver aplikacji jest szczeblem 2 tylko po walidacji, a te spoty jej nie przeszły: `docs/tresci/walidacja-solvera.json:106` „"status": "otwarte"”, a nagłówek pliku spotów mówi `content/ranges/spots.yaml:3` „Tylko spoty, które przeszły walidację”. Zostaje jedno źródło szczebla 2 (BeyondGTO), a ADR-24 w CLAUDE.md zabrania uczenia zasady sprzecznej ze szczeblami 1–2; decyzja agenta (D-153) nie stoi nad CLAUDE.md.
- Dopisek w lekcji mówi tylko o łącznej szerokości: `content/pl/lessons/m4-l2-obrona-bb.md:79` „Solver aplikacji, z którego pochodzi siatka, broni tu szerzej niż opublikowane rozwiązania.” Nie mówi, że pojedyncze ręce są ocenione odwrotnie.

Skutek w aplikacji (sprawdzony w kodzie, dowody/g7-tresc-501-ocena.txt):
- Ćwiczenie „gram / pas” losuje każdą klasę spoza `uncertain`, także czyste: `apps/mobile/src/features/drills/engine.ts:436` „(uncertain.has(hc) ? 0 : combosCount(hc) * (0.25 + 4 * play(h) * (1 - play(h))))”; lekcja ma to ćwiczenie dla obu spotów (`content/pl/lessons/m4-l2-obrona-bb.md:56` „generator: rangeDecision”).
- Tryb gry M13 pomija ocenę tylko dla klas niepewnych: `packages/poker-core/src/grading.ts:327` „if (spot.uncertain.includes(hc)) return null;” — przy pustej liście T2s „pas” jest oceniany solverem aplikacji jako błąd.
- Para zdań potwierdzona: `content/pl/lessons/m4-l2-obrona-bb.md:73` „realizują więcej, dlatego w siatce bronisz nimi chętniej” stoi nad siatką, która pasuje 74s (0,18), 63s (0,15), 32s (0) i broni 75o (0,98), K5o (0,86), A2o (0,82).

Uwaga merytoryczna: rozbieżne ręce to dół zakresu obrony (T2s, Q8o, K7o, J3s, 74s, 63s), gdzie różnice EV między solverami są małe. Właśnie dlatego zgodnie z ADR-04 i praktyką projektu powinny być mieszane albo niepewne, a nie ocenione jako błąd w jedną stronę. Nie zmienia to poziomu: aplikacja wystawia ocenę „błąd” za zagranie, które jedyne zwalidowane źródło szczebla 2 gra w 100%.

Blokuje 1012: **tak**. CLAUDE.md „Audyty i wydania” pkt 1 wymienia błędne twierdzenia merytoryczne bez rozróżnienia TestFlight i App Store. Naprawa jest mała (pole `uncertain` w czterech spotach BB w `content/ranges/spots.yaml` według kryterium 50 pp, `pnpm content:build`, poprawka zdania z linii 73) i nie wymaga przebudowy. Blokuje App Store: **tak**, ten sam powód.

## 06-tresci-502 · „prawie nic nie sprawdza” przy 13% z BeyondGTO

Wynik: **potwierdzone, słabsze niż w opisie**. Poziom P2 pasuje (raczej NISKIE).

- Zdanie: `content/pl/lessons/m4-l1-3bet.md:93` „Według opublikowanego rozwiązania solvera {{t:small-blind}} wobec Buttona prawie nic nie {{t:call|sprawdza}}”. Liczba: `content/numbers.yaml:116` „roughly 5% as a flat call and 13% as a 3-bet”. Dziś na BeyondGTO: „GTO defends the Small Blind with about 18% of hands : roughly 5% as a flat call and 13% as a 3-bet” (dowody/g7-tresc-502-zrodla.txt, kod 0).
- Co osłabia znalezisko: twierdzenie „prawie nie sprawdzasz” ma w rejestrze przeczytane źródło szczebla 2. Reguła R-M4-003 (`docs/tresci/rejestr.json:16727` „the SB barely calls anything. Instead, they almost exclusively 3-bet or fold”, status potwierdzone) cytuje GTO Wizard, a cytat dziś nadal jest na stronie (ten sam plik dowodu). Twierdzenie nie jest więc pozbawione źródła ani sprzeczne z szczeblem 2.
- Co zostaje: zdanie przypisuje „prawie nic” i 13% jednemu „opublikowanemu rozwiązaniu”, a pochodzą z dwóch, i to, z którego jest 13%, podaje 5% sprawdzeń (ok. 28% obrony). Według ADR-24 przy dwóch źródłach na tym samym szczeblu uczy się części wspólnej („rzadko sprawdza”). Decyzja „3-bet albo pas” jest nazwanym uproszczeniem (`content/ranges/spots.yaml:67` „solvery grają tu 3-bet albo pas”), więc ocena zagrań się nie zmienia. To kwestia sformułowania i atrybucji, nie błędna liczba.

Blokuje 1012: nie. Blokuje App Store: nie. Kategoria pkt 1 („błędne twierdzenie”) nie jest spełniona, bo zdanie ma źródło szczebla 2. Do backlogu.

## 06-tresci-503 · „chybia flop … dlatego mały c-bet tak często się opłaca”

Wynik: **potwierdzone** co do braku źródła dla związku przyczynowego. Zarzut sprzeczności wewnętrznej **częściowo obalony**. Poziom P2 pasuje.

- Oba zdania istnieją: `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:131` „chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, dlatego mały c-bet tak często się opłaca” i `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:89` „Rywal chybia flop dużo częściej, dlatego mały c-bet tak często się opłaca”.
- W rejestrze nie ma wpisu z tym związkiem. R-M5-006 pokrywa tylko rachunek odsetka chybień, R-M5-011 tylko próg alpha, a wyszukiwanie zdania w `docs/tresci/` daje 0 trafień (dowody/g7-tresc-503-zdanie.txt, kod 0 i 1). Związek przyczynowy nie ma więc przeczytanego źródła, choć CLAUDE.md go wymaga. Kierunkowo jest uproszczeniem: przy obronie bliskiej MDF blef dowolną ręką wychodzi blisko zera, więc częstość chybień nie jest przyczyną opłacalności. Nie jest też nazwany uproszczeniem.
- Częściowo obalone: znalezisko twierdzi, że aplikacja „gdzie indziej” uczy inaczej. Tymczasem poprawna odpowiedź w M5-L2 uczy tego samego związku z zastrzeżeniem: `content/pl/lessons/m5-l2-przewagi.md:71` „Rywal często nie ma nic, więc nawet mały {{t:bet}} często wygrywa {{t:pot|pulę}} od razu”. Linia 72 odrzuca tylko utożsamienie chybienia z pasem w 100%. Sprzeczność dotyczy więc sformułowania („dlatego się opłaca” bez zastrzeżenia), a nie dwóch przeciwnych zasad.

Blokuje 1012: nie. Blokuje App Store: nie. Liczby są poprawne (rachunek), zalecane działanie (częsty mały c-bet na korzystnych flopach) zgadza się ze źródłami R-M5-007, a błąd dotyczy tylko podanej przyczyny. Do backlogu.

## 06-tresci-002 · Zdanie „Poker na pieniądze to gra hazardowa” bez wpisu w rejestrze

Wynik: **potwierdzone**. Poziom P2 pasuje (NISKIE).

- Tekst: `apps/mobile/src/i18n/locales/pl.json:375` „Poker na pieniądze to gra hazardowa.”, wersja angielska `apps/mobile/src/i18n/locales/en.json:353` „Poker for money is gambling.”, wyświetlane w `apps/mobile/src/app/help.tsx:46` „<Muted>{t('help.intro')}</Muted>”.
- Rejestr: 0 trafień „gra hazardowa” w `docs/tresci/rejestr.json`, `docs/tresci/rejestr-hz.md` i wszystkich `docs/tresci/rejestr/*.json`. W decyzjach nie ma też wpisu o `help.intro` (dowody/g7-tresc-002-hazard.txt, kod 1 = brak trafień).
- Jedyne uzasadnienie opiera się na prawie polskim: `docs/tresci/e3/A7c.md:48` „art. 1 ust. 2 u.g.h.: gry w karty to gry hazardowe”, a aplikacja nie ma storefrontu PL (CLAUDE.md, D-292).
- Samo zdanie jest prawdziwe na rynku GB. Dziś odczytano legislation.gov.uk, Gambling Act 2005 s. 6: „In this Act “ gaming ” means playing a game of chance for a prize.” oraz „a game that involves both an element of chance and an element of skill” (ten sam plik dowodu). To luka w dokumentacji źródła, nie błędne twierdzenie. Rynek główny US nie ma jeszcze cytatu.

Blokuje 1012: nie. Blokuje App Store: nie. Zdanie jest prawdziwe, ostrzega i odsyła do pomocy, więc nie niesie ryzyka odrzucenia. Do backlogu: wpis w rejestrze ze źródłem dla US i GB.

## 06-tresci-003 · Fakty zmienne bez `wazne_do`

Wynik: **potwierdzone**. Poziom P2 pasuje (NISKIE).

- `docs/tresci/rejestr.json` ma 1062 wpisy, w tym 1006 potwierdzonych. `wazne_do` ma 46 wpisów, ale 44 z nich to wycofane numery pomocy; wśród potwierdzonych tylko H-INT-1 i H-INT-2 (2027-11-04). Bez `wazne_do` są wszystkie 19 potwierdzonych `n:rake.*` i 21 `n:mda.*`, z odczytem 2026-11-04 (dowody/g7-tresc-003-504-wazne-do.txt, kod 0). Liczba 2 z 1006 w opisie jest dokładna.
- Zasada projektu daje termin tylko numerom pomocy: `docs/tresci/00-rozpoznanie.md:41` „numery pomocy `wazne_do` co 12 miesięcy”. Żadna decyzja ani kod (`tools/content-build`, `content-schema`) nie przewiduje terminu dla innych faktów, więc nic nie unieważnia znaleziska. To luka procesu.
- Skutek dla użytkownika łagodzi data w tekście: `content/pl/lessons/m10-l4-rake.md:126` „odczyt 5 października 2026”. Lista z opisu zawiera też wielkości, które nie są faktami zmiennymi sal (`n:rake.ex.*` jako przykłady pochodne, `n:rake.solver.*` jako wyniki solvera z rake'iem), więc 37 to górne oszacowanie. Opis sam to zaznacza.

Blokuje 1012: nie. Blokuje App Store: nie. Dziś liczby są aktualne (zob. 504), a brakuje tylko przypomnienia o ponownym odczycie. Do backlogu.

## 06-tresci-504 · Rake bez terminu przeglądu; data w lekcji inna niż w rejestrze

Wynik: **potwierdzone częściowo**. To ta sama przyczyna co 06-tresci-003 i jej podzbiór (`n:rake.*`); proponuję scalić. Poziom P2 pasuje.

- Brak `wazne_do` w 19 potwierdzonych wpisach `n:rake.*` potwierdzony (dowody/g7-tresc-003-504-wazne-do.txt, kod 0), łącznie z `content/numbers.yaml:714` „stan na 5.10.2026”.
- Rozbieżność dat jest wyjaśniona i nie jest błędem. 2026-11-04 w rejestrze to ponowny odczyt API, który potwierdził tę samą wartość (wpis `n:rake.micro.low`: „rake_per_100_hands_in_bb”:7.7535, odczyt 2026-11-04). Lekcja podaje datę pierwotnych danych, czyli zaniża świeżość, ale niczego nie fałszuje.
- „Do sprawdzenia” z opisu rozstrzygnięte. Dzisiejszy odczyt API primedope (big_blind 0.1 i 0.25) daje PokerStars NL25 7,7535 bb/100, GGPoker NL10 9,0981 bb/100 i 5% dla obu przy NL10. Wartości w `content/numbers.yaml` (7,8; 9,1; 5%) nadal się zgadzają (ten sam plik dowodu, kod 0).

Blokuje 1012: nie. Blokuje App Store: nie. Liczby są dziś poprawne, a brakuje tylko terminu przeglądu. Do backlogu razem z 003.
