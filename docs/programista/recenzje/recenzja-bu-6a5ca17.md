# Audyt: Programista — Szkoła Pokera — 2026-11-10
Recenzja niezależna sesji BZ zmian BU `b9a656a..6a5ca17` (D-043, ścieżki wrażliwe) · Commit: 6a5ca17 · Tryb: audit (polecenie BZ koordynatora) · Środowisko: Linux 6.18 x86_64, Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (nie dotyczy: zmiany są w pakietach czystych i potoku treści, bez ekranu).

**Werdykt: PRZYJĄĆ Z WARUNKIEM.** Brak znalezisk KRYTYCZNYCH i WYSOKICH; 4 ŚREDNIE i 2 NISKIE do backlogu. Warunek: 08-programista-001 i 08-programista-003 trafiają do backlogu z wersją „przed włączeniem ekranu scenariuszy (krok F)”, bo dopiero wtedy ich skutek dosięga użytkownika.

## Podsumowanie

Zmiany BU robią to, co deklarują, i mają testy, które potrafią paść: na generatorze sprzed BU test gotowej ręki wykrywa 496–880 wariantów „pas z gotową ręką”, a test stosu 167–666 zakładów większych niż stos (`dowody/bz-sonda6-testy-czerwone-na-b9a656a.txt`). `pnpm run ci` na 6a5ca17: kod wyjścia 0 (poker-core 178, domena 332, postep 136, content-build 249, apps/mobile 760 testów; `dowody/bz-ci-6a5ca17.txt`). Ryzyka, które zostają, są utajone (żaden szablon w `content/pl` ich nie uruchamia, a ekran scenariuszy ma stan „wkrótce”): zmiana wyjścia generatora dla tych samych ziaren bez strażnika wersji (ziarna zapisuje historia użytkownika, D-531), linia all-in zawsze o 0,25 bb większa od stosu gracza, schemat po cichu zdejmujący margines poziomu łatwego, brak ścieżki range-spot w domenie. Limit 5000 odrzuceń (D-665) jest uzasadniony pomiarem; rozbieżność z BR-GEN-003 to sprawa dokumentu, nie kodu.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P2 (ŚREDNIE) | D | Ta sama para szablon+ziarno daje po BU inną rękę w 37–63% ziaren; historia wariantów nie ma wersji generatora | otwarte |
| 08-programista-002 | P2 (ŚREDNIE) | D | Linia all-in: zakład rywala w 100% wariantów o 0,25 bb większy niż stos gracza (ŚR-203) | otwarte |
| 08-programista-003 | P2 (ŚREDNIE) | D | Schemat daje `marginMin` 0 i `marginMax` null domyślnie: poziom łatwy bez marginesu przechodzi budowanie (BR-GEN-003: ≥ 10 pp) | otwarte |
| 08-programista-004 | P2 (ŚREDNIE) | D | Domena (`wybierzWariant`) nie przekazuje danych zakresów: każdy szablon range-spot (F1) rzuca TemplateError | otwarte |
| 08-programista-005 | P2 (NISKIE) | P | MAX_CONSECUTIVE_REJECTIONS 5000 w kodzie, 1000 w BR-GEN-003 | otwarte |
| 08-programista-006 | P2 (NISKIE) | D | Progi range.mixed.* z `numbers.yaml` mają zgadnięte wartości zapasowe w dwóch miejscach | otwarte |

## Linia bazowa i założenia

Linia bazowa ustalona z kodu i BRD przed lekturą uzasadnień autora (`docs/programista/stan-bu.md`, D-664, D-665 czytane dopiero po werdykcie, sekcja „Do sprawdzenia”, punkt ostatni). Najlepszy w klasie generator wariantów: (1) te same dane dają ten sam wynik także między wersjami aplikacji albo zmiana wyniku jest jawna (wersja, test złotych wektorów), bo ziarno jest w danych użytkownika; (2) każda granica z BRD (marginesy poziomów, zakład ≤ stos) jest wymuszona przez kod albo budowanie, nie przez dyscyplinę autora szablonu; (3) wyrocznia testu jest niezależna od generatora; (4) granica treść → domena → aplikacja przenosi wszystkie dane potrzebne generatorowi.

Wymiary pokrycia:
- Ścieżki zapisu: zapis bazy treści (`writeContentDb`, tabela `scenarios` w transakcji, klucz obcy do `modules`, test `foreign_key_check`): ok. Dane użytkownika: BU ich nie zapisuje, ale zmienia znaczenie zapisanego ziarna (08-programista-001).
- Obsługa błędów: generator rzuca typowany `TemplateError` z opisem; budowanie zamienia go na błąd szablonu. Brak pustych `catch` w diffie.
- Typy na granicach: YAML przez zod (`ScenarioTemplate`); `as GeneratorTemplate` w `scenariusze.ts` i `as typeof d` w `build.ts` na danych już sparsowanych przez zod: styl, nie znalezisko.
- System projektowy, i18n, dostępność: sprawdzone, brak (diff nie dotyka interfejsu; `tresc.generated.ts` to tylko nazwy plików).
- Kod wrażliwy na wydajność: czas wariantu śr. 1,2–2,1 ms, maks. 17 ms na tej maszynie przy limicie 5000 (`dowody/bz-sonda2-limit-5000.txt`); telefon nie mierzony.
- Testy na właściwym poziomie: logika w Node, wektory 2000–10 000 ziaren, wyrocznie z `classifyHolding`, `hitProbability`, `requiredEquity`; testy ŚR-203 i KO-051 obejmują tylko `content/pl`, nie fixture all-in (08-programista-002).
- Liczby konfiguracyjne: `MARTWE_BLINDY_BB` w generatorze i `1.5` w dwóch testach; progi range.mixed.* zdublowane (08-programista-006).

Soczewki: recenzent szukający ścieżki bez testu (all-in vs ŚR-203, margines domyślny), użytkownik z zapisaną historią wariantów (ziarno po aktualizacji), programista czytający moduł pierwszy raz (rozbieżność BRD/kod). Soczewki przechodzone po kolei w tej sesji, bez subagentów (recenzja jednego diffu).

Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)

| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (cały diff) | tak | lektura + sondy 1–6 (`dowody/bz-sonda1-ziarna-stary-nowy.txt` … `dowody/bz-sonda6-testy-czerwone-na-b9a656a.txt`) |
| `packages/content-schema/src/index.ts` (diff, wersja 7) | tak | lektura + sonda 5 (`dowody/bz-sonda5-margines-domyslny.txt`) |
| `tools/content-build/src/{scenariusze,build}.ts` (diff, tabela `scenarios`) | tak | lektura; test `scenarios-db-bu` w CI |
| `packages/domena/src/wariant.ts` (wywołanie generatora) | tak | lektura + sonda 4 (`dowody/bz-sonda4-allin-domena.txt`) |
| `packages/domena/test/wariant-bf.test.ts` (diff: pole `points`) | tak | lektura: zmiana tylko kształtu atrapy |
| Testy BU (`bv-gotowa-reka`, `stos-zakladu-bu`, `scenarios-db-bu`, `szablony-f5-bu`, zmiany `build.test`, `szablon-scenariusza-bf`, `liczby-jezyk-08`) | tak | lektura; zdolność do czerwieni: sonda 6 |
| `szablony-f1-bu.test.ts`, `zestaw-szablonow-bu.test.ts` | częściowo | przebieg w CI, bez lektury wyroczni linia po linii |
| `packages/postep` (historia wariantów, D-532) | częściowo | grep zapisu `wariant_historia`; brak wywołań w `apps/mobile/src` |
| Bazy `apps/mobile/assets/content/tresc-*.db` | nie | pliki binarne; pośrednio przez `scenarios-db-bu` i `content:check` w CI |
| Telefon, Expo, Maestro | nie | środowisko bez macOS; diff bez ekranów |

## Kontrola dowodów i sekretów

Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-bu-6a5ca17.md . docs/programista/recenzje --rola 08-programista` (kopia skryptu w scratchpadzie): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0 (`dowody/bz-sprawdz-raport.txt`). `git diff --cached` przejrzany przed commitem: tylko raport, dowody i `docs/decyzje/BZ.md`.

## Stosowalność listy kontrolnej

| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy | ok: każda nowa reguła generatora (gotowa ręka, zakład ≤ stos, all-in, drawToBest, margines per punkt, range-spot, ŚR-103 b) ma test; luka testu all-in vs stos → 08-programista-002 |
| DEV-02 | dotyczy | 5/5 commitów zmieniających zachowanie ma test w tym samym commicie (cce31df, 3b97306, 613188a, 9e9cb42, 15e2717); czerwień przed kodem potwierdzona sondą dla KO-051 i ŚR-203 |
| DEV-03 | dotyczy | ok: zmiany testów w bd0adbd i e6dfee3 to izolacja od `content/` i dłuższe limity czasu, bez usuniętych asercji |
| DEV-04 | dotyczy | ok: `pnpm run ci` na 6a5ca17 kod 0 (typecheck, testy, skrypty, kontrole, i18n:kod, content:check, tresci:rejestr): `dowody/bz-ci-6a5ca17.txt` |
| DEV-05 | dotyczy (baza treści) | ok: `INSERT INTO scenarios` w transakcji, świeża baza, klucz obcy sprawdzony testem |
| DEV-06 | nie dotyczy | baza treści budowana od zera, bez migracji; dane użytkownika bez zmian schematu |
| DEV-07 | dotyczy | 08-programista-003 (domyślny margines), 08-programista-006 (zapasowe progi) |
| DEV-08 | nie dotyczy | diff bez dat i czasu |
| DEV-09 | dotyczy | ok: wejście przez zod; asercje typów na danych już sparsowanych |
| DEV-10 | dotyczy | ok: błędy szablonu typowane i głośne |
| DEV-11 | nie dotyczy | diff bez interfejsu |
| DEV-12 | nie dotyczy | diff bez tekstów interfejsu |
| DEV-13 | dotyczy | 08-programista-005, 08-programista-006 |
| DEV-14 | dotyczy | ok: `git diff b9a656a..6a5ca17` bez plików kluczy; skrypt sekretów na raporcie |
| DEV-15 | nie dotyczy | brak nasłuchów i timerów |
| DEV-16 | dotyczy | ok: wartości w bb nazwane (`stackBb`, `MARTWE_BLINDY_BB`); błąd zaokrąglenia → 08-programista-002 |

## Znaleziska (szczegóły)

### 08-programista-001 · Po aktualizacji to samo ziarno z historii użytkownika daje inną rękę, a nic tego nie wykrywa
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg wydania: ŚREDNIE (dane użytkownika, ale funkcja nie jest jeszcze dostępna)
- Realność: teoretyczny dziś (ekran scenariuszy „wkrótce”, `wariant_historia` nie jest zapisywana z aplikacji), realny od kroku F · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód:
  - `packages/poker-core/src/scenario-gen.ts:239` „if (classifyHolding(hero, stol).improvesBoard) return null;” stoi przed losowaniem puli (linia 240), a filtr stosu (linia 248) dochodzi po nim: oba zmieniają zużycie generatora liczb losowych.
  - Sonda 1 (`dowody/bz-sonda1-ziarna-stary-nowy.txt`): na ziarnach 1–300 ten sam odcisk ma tylko 107–190 z 300 (sc-19 łatwy: 107, w tym 70 z tą samą pulą i zakładem).
  - Historia zapisuje ziarno: `packages/postep/src/wariantyHistoria.ts:10` „export interface ZapisOdcisku { szablonId: string; poziom: PoziomWariantu; odcisk: string; ziarno: number; terazMs: number }”.
  - Domena odtwarza wariant z ziarna: `packages/domena/src/wariant.ts:34` „return generuj(szablon, poziom, w.ziarno);”.
- Mechanizm: każda zmiana generatora albo granic szablonu zmienia wynik dla zapisanych ziaren; brak wersji generatora w `wariant_historia` i brak testu złotych wektorów (szablon, poziom, ziarno → odcisk). `grep -rn "generatorVersion\|GENERATOR_VERSION\|wersja generatora"` → 0 trafień.
- Powraca: nie
- Wzorzec lub źródło: D-531 („Powtórka i wznowienie wariantu dają te same karty”), D-558 (powtórka przez odcisk), zasada 10.
- Kroki w aplikacji (od kroku F): użytkownik gra wariant (zapis ziarna i odcisku) → aktualizacja aplikacji ze zmienionym generatorem → gałąź „najdawniej widziany” w `wybierzWariant` zwraca inną rękę niż zapisany odcisk, która może być rozdaniem już zagranym w tej sesji (sprawdzenie `o.sesja` patrzy na stary odcisk); wznowienie po aktualizacji pokazuje inne karty.
- Opcje: (a) wersja generatora w odcisku albo w wierszu historii, wpisy innej wersji ignorowane (mała migracja addytywna, odporne); (b) test złotych wektorów: lista (szablon, poziom, ziarno → odcisk) w repo, zmiana wymaga jawnej aktualizacji wektora i decyzji (tanie, wykrywa, ale nie chroni historii); (c) zostawić do kroku F (zero kosztu teraz, ryzyko, że zapomnimy). Rekomendacja: (b) teraz, (a) przed włączeniem ekranu scenariuszy.
- Test akceptacyjny: test złotych wektorów dla `content/pl/scenarios` (np. ziarna 1–20 na poziom) w CI; przed krokiem F: zmiana wyniku generatora dla zapisanego ziarna nie zmienia kart wariantu wznowionego z historii.
- Status: otwarte

### 08-programista-002 · Linia all-in stawia o 0,25 bb więcej, niż gracz ma za pulą
- Pozycja listy kontrolnej: DEV-01 (też DEV-16)
- Poziom: P2 · próg wydania: ŚREDNIE (błędna liczba, dziś tylko w fixture)
- Realność: brzegowy (żaden szablon `content/pl` nie ma `villain: all-in`; F5 jest gotowe dla przyszłej treści) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód:
  - `packages/poker-core/src/scenario-gen.ts:244` „const linie = allIn ? [Math.round(t.stackBb! - (pot - MARTWE_BLINDY_BB) / 2)]” zaokrągla all-in.
  - `packages/poker-core/src/scenario-gen.ts:248` „.filter((bet) => allIn || bet <= stosGracza)” wyłącza z ŚR-203 właśnie all-in.
  - Sonda 4 (`dowody/bz-sonda4-allin-domena.txt`) na `sc-fx-allin-draw`: 2000/2000 wariantów z zakładem > stos (np. pula 30: zakład 21, stos gracza za pulą 20,75). Test F5 utrwala zaokrąglenie (`tools/content-build/test/szablony-f5-bu.test.ts:45`), a test ŚR-203 (`tools/content-build/test/stos-zakladu-bu.test.ts:8`) czyta tylko `content/pl`.
- Mechanizm: wkład gracza (pula − 1,5) ÷ 2 ma ułamek 0,25 dla każdej puli parzystej; `Math.round` daje zawsze stos + 0,25. `grep -n "Math.round(t.stackBb" packages/poker-core/src` → 1 trafienie.
- Powraca: nie
- Wzorzec lub źródło: ŚR-203 (zakład ≤ stos), komentarz `packages/poker-core/src/scenario-gen.ts:245`.
- Kroki w aplikacji: po dodaniu szablonu all-in ekran przebiegu (D-543, głębokość w bb przy miejscach) pokaże „do sprawdzenia 21” przy stosie 20,75; cena w ocenie liczona od 21 (różnica ok. 0,15 pp, decyzji nie odwraca przy marginesie ≥ 2 pp).
- Opcje: (a) all-in = dokładny stos za pulą bez zaokrąglenia (liczby w bb z ułamkiem, spójne z ceną); (b) zaokrąglenie w dół (`Math.floor`) i pule dobrane tak, by wkład był całkowity (prostsze liczby na ekranie, ograniczenie dla autora treści, wymaga sprawdzenia w budowaniu). Rekomendacja: (a), z testem ŚR-203 rozszerzonym na fixture all-in.
- Test akceptacyjny: `stos-zakladu-bu` (albo nowy test) obejmuje `tools/content-build/test/fixtures/scenariusze/` i przechodzi bez wyjątku dla all-in.
- Status: otwarte

### 08-programista-003 · Poziom łatwy bez marginesu przechodzi schemat i budowanie
- Pozycja listy kontrolnej: DEV-07
- Poziom: P2 · próg wydania: ŚREDNIE (osłabiona bramka treści; obecna treść ma marginesy wpisane)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `packages/content-schema/src/index.ts:511` „marginMin: z.number().min(0).max(1).default(0),” i linia 512 (`marginMax` domyślnie null); przed BU oba pola były wymagane. Sonda 5 (`dowody/bz-sonda5-margines-domyslny.txt`): `sc-01` z usuniętym `marginMin`/`marginMax` poziomu łatwego — schemat przyjęty, `checkScenarioTemplate` i `checkScenarioGenerator` bez błędów, najmniejszy margines poziomu łatwego 0,12 pp, 2983 punkty decyzji poniżej 10 pp na 2000 wariantów. `margins` (linia 509 tego pliku) nie ma sprawdzenia długości wobec liczby punktów: brakujący wpis cicho wraca do tych samych domyślnych 0/null (`scenario-gen.ts` `inMargin`).
- Mechanizm: brak wartości zamieniony na „bez ograniczenia”; budowanie nie sprawdza progów BR-GEN-003 (łatwy ≥ 0,10, średni ≥ 0,02). `grep -n "default(" packages/content-schema/src/index.ts` w `ScenarioLevelBounds` → 3 trafienia (`draws`, `marginMin`/`marginMax`, `reject`); tylko margines zmienia decyzję dydaktyczną.
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-003, `docs/brd/wymagania-scenariusze.md:110` „Wtedy na poziomie łatwym odległość wynosi co najmniej 10 punktów procentowych, a na średnim co najmniej 2”; zasada roli 08 „brak zostaje brakiem”.
- Kroki w aplikacji: autor dodaje szablon draw-call bez marginesu → budowanie zielone → poziom „łatwy” daje decyzje 0,1 pp od progu.
- Opcje: (a) w `checkScenarioTemplate` dla każdego punktu draw-call efektywny margines (z `margins[i]` albo `marginMin`) ≥ progu poziomu i `margins.length === decisions.length` (zachowuje elastyczność F1/F5); (b) przywrócić wymagane `marginMin`/`marginMax` (prościej, ale range-spot musi wpisywać pola bez znaczenia). Rekomendacja: (a).
- Test akceptacyjny: szablon z poziomem łatwym bez marginesu i szablon z `margins` krótszym niż liczba punktów dają błąd budowania.
- Status: otwarte

### 08-programista-004 · Domena nie umie wylosować wariantu range-spot
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg wydania: ŚREDNIE (funkcja F1 niegotowa do użycia; błąd głośny, nie cichy)
- Realność: teoretyczny dziś (brak szablonów range-spot w `content/pl`, brak ekranu) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `packages/domena/src/wariant.ts:27` „const v = generuj(szablon, poziom, (ziarnoStartowe + Math.imul(k, KROK_ZIARNA)) >>> 0);” bez czwartego argumentu; generator rzuca bez `GeneratorContext` (`packages/poker-core/src/scenario-gen.ts:195`). Sonda 4: `wybierzWariant` na `sc-fx-rfi-btn` → `TemplateError … punkt range-spot wymaga danych zakresów (GeneratorContext)`. Pokrewne: `stackBb` w `GeneratorTemplate` jest opcjonalne, a jego brak cicho wyłącza ŚR-203 (`packages/poker-core/src/scenario-gen.ts:246`, `: Infinity`).
- Mechanizm: rozszerzenie generatora bez przeniesienia przez granicę domeny; `grep -rn "generuj(" packages/domena/src` → 2 trafienia (linie 27 i 34 `packages/domena/src/wariant.ts`).
- Powraca: nie
- Wzorzec lub źródło: ADR roli 05 (logika w domenie, aplikacja cienka), D-661 („poker-core nie czyta plików”).
- Kroki w aplikacji: po dodaniu szablonu range-spot i ekranu scenariuszy start scenariusza kończy się błędem.
- Opcje: (a) `OpcjeWyboru` z `kontekst: GeneratorContext` i wymaganym `stackBb` w typie szablonu dla domeny (mała zmiana teraz); (b) odłożyć do kroku F z pozycją w backlogu (zero kosztu, ryzyko rozjazdu). Rekomendacja: (a) razem z 08-programista-001.
- Test akceptacyjny: `wybierzWariant` na fixture range-spot zwraca wariant z `points[0].point === 'range-spot'`.
- Status: otwarte

### 08-programista-005 · Limit odrzuceń w kodzie (5000) różni się od BR-GEN-003 (1000)
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 · próg wydania: NISKIE (rozbieżność dokumentu)
- Realność: realny (dokument mówi co innego niż kod) · Pewność: wysoka
- Rodzaj: P (decyzja produktowa / BRD)
- Dowód:
  - BRD: `docs/brd/wymagania-scenariusze.md:105` „po 1000 odrzuceniach z rzędu zgłasza błąd szablonu w teście”.
  - Kod: `packages/poker-core/src/scenario-gen.ts:121` „export const MAX_CONSECUTIVE_REJECTIONS = 5000;”.
  - Pomiar własny (sonda 2): przy 1000 pada sc-19 łatwy na 10/3000 ziaren, sc-01 (każdy poziom) i sc-19 średni na 1/3000 (`dowody/bz-sonda2-limit-1000.txt`); przy 5000: 0/3000 we wszystkich, czas śr. 1,2–2,0 ms, maks. 16,5 ms (`dowody/bz-sonda2-limit-5000.txt`). Ziarno 1588 (wspólny błąd sc-01 i sc-19 średni) to zwykła seria odrzuceń, nie wada generatora liczb (`dowody/bz-sonda3-ziarno-1588.txt`).
- Mechanizm: limit chroni przed szablonem o zbyt małej puli rozdań; przy akceptacji ok. 0,57% (sc-19 łatwy) 1000 daje ok. 0,3% błędów, 5000 ok. 4e-13.
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-003; D-665 (do weta).
- Kroki w aplikacji: brak (różnica dokumentu; przy 1000 sporadyczny błąd budowania albo startu wariantu).
- Opcje: (a) przyjąć 5000 i zaktualizować BR-GEN-003 (rola 01), z zasadą „limit ≥ 30 ÷ najmniejsza akceptacja szablonu” (prosto, pomiar to potwierdza); (b) zostać przy 1000 i wymagać w budowaniu akceptacji ≥ 1% na poziom (szablony sc-19 łatwy do przebudowy, mocniejsza bramka wydajności na telefonie). Rekomendacja: (a); wybór dokumentu należy do roli 01, o ewentualnym wecie decyduje właściciel.
- Test akceptacyjny: BR-GEN-003 i `MAX_CONSECUTIVE_REJECTIONS` mówią to samo.
- Status: otwarte

### 08-programista-006 · Progi akcji mieszanej mają zgadnięte wartości zapasowe w dwóch miejscach
- Pozycja listy kontrolnej: DEV-13 (też DEV-07)
- Poziom: P2 · próg wydania: NISKIE
- Realność: teoretyczny (klucze są w `content/numbers.yaml:178-179` z tymi samymi wartościami) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: zapasowe `?? 0.035` i `?? 0.25`, `tools/content-build/src/build.ts:389` „brak liczb = punkty range-spot nie przejdą sprawdzenia generatora”, który przeczy kodowi (zapas sprawia, że przejdą ze zgadniętymi progami); drugi zestaw literałów: `tools/content-build/src/scenariusze.ts:118`.
- Mechanizm: ta sama wielkość w trzech miejscach (`numbers.yaml`, `build.ts`, `scenariusze.ts`); `grep -rn "0.035" tools/content-build/src` → 2 trafienia.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md „Ta sama wielkość ma jeden klucz”; DEV-13.
- Kroki w aplikacji: brak dziś; po zmianie progu w `numbers.yaml` z literówką w kluczu budowanie użyje starego progu bez błędu.
- Opcje: (a) brak klucza = błąd budowania, bez zapasu; (b) zostawić zapas, poprawić komentarz (najmniej pracy, dubel zostaje). Rekomendacja: (a).
- Test akceptacyjny: treść bez `range.mixed.min` daje błąd budowania.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)

- `fraction` w wariancie zmieniło znaczenie z ułamka z szablonu na `bet / pot` po zaokrągleniu (`scenario-gen.ts` w `tryVariant`); dziś bez odbiorcy (grep: tylko `drills.ts` ma własne pole). Sprawdzić przy ekranie, jeśli ma pokazywać „pół puli”.
- Odrzucanie gotowej ręki obejmuje też punkty z oczekiwanym `call` (sc-01): zachowawcze i zgodne z `grading.ts` `drawFacts`; czy to zamierzone dla treści — pytanie do roli 06, nie błąd kodu.
- Walidacja generatora w budowaniu działa tylko dla `pl` (`build.ts`, warunek `locale === 'pl'`); szablony `en` mają te same granice, ale bez sprawdzenia generatorem. Bez zmian w BU, nie sprawdzano zgodności `en`/`pl`.
- Wydajność na telefonie (Hermes) przy limicie 5000 i `WYBOR_MAKS_PROB` 200: nie mierzona (brak urządzenia).
- Po werdykcie przeczytane uzasadnienie autora (`docs/programista/stan-bu.md`, D-664, D-665 w `docs/decyzje.md`): porównanie w dowodzie `dowody/bz-po-werdykcie.txt`.

## Co działa dobrze i należy zachować

- Testy z wyrocznią spoza generatora (`classifyHolding`, `hitProbability`, `requiredEquity`, `nutOutsShare`) i dużą próbą ziaren (2000–10 000); oba testy KO-051 i ŚR-203 padają na kodzie sprzed BU (sonda 6).
- Odrzucenie gotowej ręki używa tej samej definicji co silnik ocen (`grading.ts` `drawFacts`), więc generator i ocena nie rozjeżdżają się.
- Tabela `scenarios` z kluczem obcym do `modules` i testem `foreign_key_check`; wersja schematu podniesiona razem ze zmianą tabeli.
- Zmiany testów z bd0adbd izolują je od treści zamiast luzować asercje.
- Rozbieżność z BRD (5000) jest nazwana w kodzie i w rejestrze (D-665), a nie ukryta.

## Decyzje dla właściciela

- Brak decyzji do podjęcia teraz. 08-programista-005 rozstrzyga rola 01 (dokument BR-GEN-003); właściciel może zawetować D-665.
- Kolejność napraw ŚREDNICH (produktowa): rekomendacja — 001 (wariant b) i 002 przed pierwszym szablonem all-in, 001 (a) i 004 przed włączeniem ekranu scenariuszy.

## Proponowane polecenie naprawy

`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004,08-programista-006`

## Stan repozytorium
Pliki śledzone kodu nietknięte (tylko raport, dowody i `docs/decyzje/BZ.md`, zgodnie z poleceniem BZ). `git status --porcelain` przed commitem:

```
?? docs/decyzje/
?? docs/programista/recenzje/
```
