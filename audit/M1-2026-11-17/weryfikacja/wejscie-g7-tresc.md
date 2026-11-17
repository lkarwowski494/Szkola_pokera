### 06-tresci-501 · Siatki obrony BB oceniają 16 i 13 rąk odwrotnie niż opublikowane rozwiązanie solvera, bez klas niepewnych
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci-b/
- Poziom: P1 (WYSOKIE: błędne twierdzenie merytoryczne w głównym przepływie, CLAUDE.md „Audyty i wydania” pkt 1)
- Realność: realny · Pewność: wysoka
- Dowód: dowody/siatki-obrona-bb.txt (kod 0): wobec Buttona aplikacja broni 49,6%, beyondgto 45,1%; 16 rąk (136 kombinacji) różni się o 50 pp lub więcej, w tym czysto przeciwnie: J3s 0,01 wobec 1,00; 74s 0,18 wobec 1,00; 63s 0,15 wobec 1,00; T2s 1,00 wobec 0; Q8o 1,00 wobec 0; K7o 1,00 wobec 0; 75o 0,98 wobec 0. Wobec małego blinda 13 rąk (116 kombinacji), np. A3o 0 wobec 1,00, 32s 0 wobec 1,00, T7o 0,99 wobec 0,05. Klasy niepewne w bazie: puste we wszystkich czterech spotach (6- i 9-max).
  - Projekt sam oznaczył te spoty jako niezwalidowane (status "otwarte", uwaga "niezgodne: 4,6 pp powyżej 45%"): `docs/tresci/walidacja-solvera.json:106` i `docs/tresci/walidacja-solvera.json:122`.
  - Dla innych spotów stosuje kryterium klas niepewnych: `content/ranges/spots.yaml:56` „kanon różni się od opublikowanych tabel solvera (defense/btn-vs-co, NL500, 100bb) w „gram / pas” o 50 pp lub więcej”
  - W spotach BB kryterium nie zastosowano (brak pola `uncertain`): `content/ranges/spots.yaml:79`, `content/ranges/spots.yaml:86`.
  - Para zdań: `content/pl/lessons/m4-l2-obrona-bb.md:73` „realizują więcej, dlatego w siatce bronisz nimi chętniej” stoi nad siatką, która pasuje 74s, 63s, 42s, 32s i broni 75o, K5o, A2o.
- Kroki w aplikacji: Lekcje → M4 „Obrona dużego blinda” → ćwiczenie „gram / pas” albo malowanie siatki; ręka T2s albo Q8o: odpowiedź „pas” oceniona jako błąd („Znak „−”: ręka z zakresu, której brakuje”); J3s, 74s: „gram” oceniony jako błąd. To samo w trybie gry M13 przy obronie BB.

### 06-tresci-502 · „Mały blind wobec Buttona prawie nic nie sprawdza” przy liczbie 13% ze źródła, które podaje 5% sprawdzeń
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci-b/
- Poziom: P2 (zalecane działanie „3-bet albo pas” zgodne z nazwanym uproszczeniem szczebla 2; różnica dotyczy opisu częstości, nie decyzji)
- Realność: realny · Pewność: wysoka
- Dowód: `content/pl/lessons/m4-l1-3bet.md:93` „Według opublikowanego rozwiązania solvera {{t:small-blind}} wobec Buttona prawie nic nie {{t:call|sprawdza}}: 3-betuje ok. {{n:pf.3bet-freq.sb-vs-btn}} rąk”; liczba 13% pochodzi z `content/numbers.yaml:116` (beyondgto), gdzie to samo zdanie źródła podaje 5% sprawdzeń (ok. 28% obrony); "barely calls" pochodzi z innego źródła (GTO Wizard, liczby tylko na grafice). Dowody: dowody/zrodla-strategia.txt (oba cytaty TAK).
- Kroki w aplikacji: Lekcje → M4 „3-bet” → akapit o małym blindzie

### 06-tresci-503 · „Rywal chybia flop dużo częściej, dlatego mały c-bet tak często się opłaca”: przyczyna spoza źródła
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci-b/
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Dowód: `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:131` „chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, dlatego mały c-bet tak często się opłaca” i `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:89` „Rywal chybia flop dużo częściej, dlatego mały c-bet tak często się opłaca”. Ta sama aplikacja uczy gdzie indziej, że chybienie to nie pas: `content/pl/lessons/m5-l2-przewagi.md:72` „Rywal {{t:fold|spasuje}} dokładnie w {{n:flop.miss.unpaired}} przypadków” jako odpowiedź błędna; R-M6-006 (duży blind kontynuuje wobec małego c-betu parami, drawami, backdoorami i asem) i MDF 75% wobec 1/3 puli (m6-l1). Źródła reguł c-betu (GTO Wizard Flop Heuristics, w rejestrze R-M5-007) wiążą częsty mały c-bet z przewagą zakresu, nie z odsetkiem chybień.
- Kroki w aplikacji: Lekcje → M5 „Częstotliwość i rozmiar c-betu” → sekcja „Ile musi spasować rywal” i ćwiczenie z alphą

### 06-tresci-002 · Zdanie ekranu „Pomoc” o hazardzie nie ma twierdzenia w rejestrze, uzasadnienie oparto na prawie kraju bez sprzedaży
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci/
- Poziom: P2
- Realność: realny (zdanie widzi każdy użytkownik ekranu „Pomoc”) · Pewność: wysoka
- Dowód: apps/mobile/src/i18n/locales/pl.json:375 „Poker na pieniądze to gra hazardowa. Jeśli granie przestaje być pod kontrolą, możesz skorzystać z pomocy poniżej.”, wyświetlane na ekranie „Pomoc”; w rejestrze brak wpisu (`grep "gra hazardowa"` w `docs/tresci/rejestr*` → 0 trafień). Dotychczasowe uzasadnienie w przeglądzie E3: docs/tresci/e3/A7c.md:48 „art. 1 ust. 2 u.g.h.: gry w karty to gry hazardowe” — prawo polskie, a aplikacja nie ma storefrontu PL (CLAUDE.md, D-292). Źródło rynku sprzedaży otwarte dziś: https://www.legislation.gov.uk/ukpga/2005/19/section/6, odczyt 2026-11-17: "gaming" means playing a game of chance for a prize; "game of chance" includes "a game that involves both an element of chance and an element of skill". Zdanie jest więc prawdziwe co najmniej dla GB. Miejsce wyświetlenia: apps/mobile/src/app/help.tsx:46.
- Kroki w aplikacji: Ustawienia albo lekcja M12-L4 → „Pomoc” → pierwsze zdanie pod tytułem.

### 06-tresci-003 · Fakty zmienne (rake sal, dane populacji) bez terminu ponownego odczytu w rejestrze
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci/
- Poziom: P2
- Realność: brzegowy (tekst ma „stan na”, więc użytkownik nie dostaje faktu bez daty; brakuje przypomnienia o ponownym odczycie) · Pewność: wysoka
- Dowód: w rejestrze tylko 2 z 1006 potwierdzonych twierdzeń mają `wazne_do` (H-INT-1, H-INT-2); 37 twierdzeń o stanie zmiennym bez terminu, m.in. `n:rake.ex.pct`, `n:rake.micro.*`, `n:rake.nl500.*`, `n:rake.pop.*` (8), `n:mda.*` (kilka z listy to pochodne przykłady, np. `n:rake.ex.keep`, więc faktów zmiennych jest nieco mniej) — lista z datami odczytu: `dowody/fakty-zmienne.txt` (kod 0). Tekst: content/pl/lessons/m10-l4-rake.md:93 „Na dwóch największych salach online przy NL2–NL10 to”, z datą w nocie content/pl/lessons/m10-l4-rake.md:126 („odczyt 5 października 2026”). Zasada projektu daje termin tylko numerom pomocy: docs/tresci/00-rozpoznanie.md:41 „numery pomocy `wazne_do` co 12 miesięcy”.
- Kroki w aplikacji: Moduł 10 → lekcja „Rake” → „Ile to kosztuje” i „Dane z populacji”.

### 06-tresci-504 · Dane o rake'u (fakty zmienne) bez terminu przeglądu w rejestrze; data odczytu w lekcji inna niż w rejestrze
- Katalog dowodów: audit/M1-2026-11-17/role/06-tresci-b/
- Poziom: P2
- Realność: brzegowy · Pewność: wysoka
- Dowód: `content/pl/lessons/m10-l4-rake.md:126` „odczyt 5 października 2026”; `content/numbers.yaml:714` (population „stan na 5.10.2026”); w `docs/tresci/rejestr.json` 19 potwierdzonych wpisów `n:rake.*` nie ma `wazne_do`, a ich `odczyt` to 2026-11-04 (dowody/rake-wazne-do.txt, kod 0). Harmonogramy rake'u sal zmieniają się w czasie; wartości pochodzą z API strony (dziś nieodczytane, Do sprawdzenia).
- Kroki w aplikacji: Lekcje → M10 „Rake” → tabela i ramka „Źródła”

