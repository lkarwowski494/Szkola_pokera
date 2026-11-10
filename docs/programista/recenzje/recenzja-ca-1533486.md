# Recenzja niezależna CA (08-programista, audit): format szablonów F2–F4 i poprawki KO-056 — 2026-11-10
Commit: 1533486 (zakres `6a5ca17..1533486`, 7 commitów) · Tryb: audit (recenzja D-043, sesja CE) · Środowisko: Linux, Node, pnpm, vitest; bez Xcode i symulatora (nie dotyczy: zmiany bez interfejsu).

## Podsumowanie
Werdykt: **do poprawy przed użyciem F4 i linii all-in w treści** (2 × WYS, 3 × ŚR, 4 × NIS). Rachunek F2 (c-bet) i F3 (rozmiary) zgadza się z silnikiem gry (`grading.ts`), a ich testy mają wyrocznię niezależną od generatora (prawdziwe rozdanie + `gradeDecision`). Dwa błędy rachunku (szczebel 1 ADR-24): punkt `icm-call` liczy próg ICM bez blindów, choć szablon stawia gracza w BB wobec all-inu SB przy 10 bb, i na poziomie trudnym 41% wariantów ma odwrotną poprawną odpowiedź; linia all-in rywala nadal jest o 0,5 bb większa niż stos gracza, gdy gracz albo rywal jest blindem (stała „martwe blindy 1,5 bb”), a zmieniona wyrocznia `tools/content-build/test/szablony-f5-bu.test.ts:43` powtarza tę formułę generatora (ŚR-204). Oba dotyczą dziś tylko fikstur (żaden szablon w `content/` nie używa `icm-call` ani `villain: all-in`), więc realność jest brzegowa, ale fikstury są wzorcem dla roli 06. Testy odtwarzające: `tools/content-build/test/recenzja-ce-odtworzenie.test.ts` (czerwone z `CE_CZERWONE=1`).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (P1) | D | `icm-call`: próg ICM bez blindów przy pozycjach BB wobec SB; trudny poziom 1239/3000 wariantów odwróconych | otwarte |
| 08-programista-002 | WYS (P1) | D | all-in rywala o 0,5 bb większy niż stos, gdy w rozdaniu jest blind; wyrocznia powtarza formułę (ŚR-204) | otwarte |
| 08-programista-003 | ŚR (P2) | D | `size-spot`: brak sprawdzenia pozycji wobec reguły (3-bet IP/OOP, kolejność otwierającego); fikstura z hero = villain przechodzi | otwarte |
| 08-programista-004 | ŚR (P2) | M | `raise-small` = 0,8 × 2,5 = 2,0 bb to rozmiar solvera z UTG; open-size z UTG uczyłby, że rozmiar solvera jest zły | otwarte |
| 08-programista-005 | ŚR (P2) | M | `cbet-case`: wariant ma jedną poprawną akcję, silnik gry daje rzadszej akcji „dopuszczalne” | otwarte |
| 08-programista-006 | NIS (P2) | D | `equity169.json` rzutowany `as Equity169Data` bez parsowania; brak klasy cicho daje wagę 0 | otwarte |
| 08-programista-007 | NIS (P2) | D | `round1` rozmiaru 3-betu a tolerancja `near` < 0,05 bb; test F3 powtarza `round1` | otwarte |
| 08-programista-008 | NIS (P2) | D | próg 0,5 w grze o żetony w dwóch miejscach; komunikat walidacji pomija `icm-call` | otwarte |
| 08-programista-009 | NIS (P2) | D | `cbet-case`: brak sprawdzenia, że gracz jest jedynym agresorem i ma pozycję (warunki `grading.ts`) | otwarte |

## Linia bazowa i założenia
Linię bazową zbudowałem z kodu i rachunku przed przeczytaniem `docs/decyzje/CA.md` i `docs/programista/stan-ca.md` (polecenie CE, pkt 3); uzasadnienia autora przeczytałem dopiero po ocenie, tylko żeby nie zgłaszać nazwanych uproszczeń (D-699 nazywa „blindy pominięte” dla progu w grze o żetony, nie dla progu ICM przy pozycjach blindów, więc 001 zostaje).
- Wzorzec: punkt scenariusza ma tę samą odpowiedź co silnik gry (`grading.ts`) albo rachunek z definicji, policzony z danych widocznych w szablonie (pozycje, stos), a test ma wyrocznię spoza modelu generatora.
- Wymiary: ścieżki zapisu — sprawdzone, brak (zmiany bez zapisu danych użytkownika; tabela `scenarios` z D-664 poza zakresem). Obsługa błędów: brak kontekstu daje `TemplateError` (sprawdzone, brak zgadywanych progów po NIS-006). Typy na granicach: 006. System projektowy, i18n, dostępność: nie dotyczy (bez interfejsu; `apps/mobile` nie woła `generateVariant`). Wydajność: generator do 5000 odrzuceń, testy 10 000 losowań — sprawdzone, brak. Testy na właściwym poziomie: F2 i F3 dobrze, F4 i F5 powtarzają model generatora (001, 002). Liczby konfiguracyjne: 008.
- Soczewka „recenzent szukający ścieżki bez testu”: walidacja pozycji (003, 009) nie ma testu, a fikstury z niespójnymi pozycjami przechodzą.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (diff CA) | tak, cały diff | czytanie + sonda 3000 wariantów/poziom (`dowody/ce-odtworzenie-czerwone.txt`) |
| `packages/poker-core/src/icm.ts` (eksporty) | tak | porównanie z `generateIcmCall` |
| `packages/content-schema/src/index.ts` | tak | czytanie diffu |
| `tools/content-build/src/{scenariusze,build}.ts` | tak | czytanie diffu |
| `packages/domena/src/wariant.ts` (GeneratorContext) | tak | czytanie; przekazanie kontekstu bez zmiany logiki |
| testy F2, F3, F4, `allin-stos-ca`, `szablony-f5-bu:43` | tak | czytanie pod ŚR-204 |
| `margines-ca`, `progi-bez-zgadywania-ca`, `wariant-kontekst-ca` | pobieżnie | przechodzą w CI |
| interfejs, ekrany | nie dotyczy | generator nieużywany w `apps/mobile` |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-ca-1533486.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0. `pnpm run ci` kod 0 przed testami CE (baza) i po nich: `dowody/ce-ci-1533486.txt` (content-build: 293 zielone, 2 oczekiwane porażki). Czerwień testów odtwarzających: `dowody/ce-odtworzenie-czerwone.txt` (kod 1). Kontekst sesji przy oddaniu: ok. 45% (szacunek).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | 001, 002 (rachunek bez wektora z blindami) |
| DEV-02 | dotyczy | 7/7 commitów CA zmieniających zachowanie ma test w tym samym commicie (d6ceeee, 1392fc7, ad0f3f0, 9053b98, 6273ea2, 5802982; 1533486 tylko dokumenty) |
| DEV-03 | dotyczy | zmieniona wyrocznia `tools/content-build/test/szablony-f5-bu.test.ts:43` dopasowana do nowej formuły generatora: 002 |
| DEV-04 | dotyczy | `pnpm run ci` kod 0 (przed i po testach CE): `dowody/ce-ci-1533486.txt` |
| DEV-05, DEV-06 | nie dotyczy | zmiany bez zapisu danych użytkownika |
| DEV-07 | dotyczy | ok (marginMin bez domyślnej, progi bez zapasowych) |
| DEV-08 | nie dotyczy | brak dat |
| DEV-09 | dotyczy | 006 |
| DEV-10 | dotyczy | ok (`TemplateError` z opisem) |
| DEV-11, DEV-12, DEV-15 | nie dotyczy | bez interfejsu |
| DEV-13 | dotyczy | 008 |
| DEV-14 | dotyczy | ok (brak sekretów w diffie) |
| DEV-16 | dotyczy | ok (bb i żetony rozdzielone w nazwach) |

## Znaleziska

### 08-programista-001 · `icm-call` liczy próg ICM bez blindów, choć szablon stawia gracza w BB wobec all-inu SB; odpowiedź bywa odwrotna
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS: błędne liczby, rachunek szczebla 1)
- Realność: brzegowy (tylko fikstura `sc-fx-icm-call`; realny z pierwszym szablonem w treści) · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:370` „const required = (eqNow - eqLose) / (eqWin - eqLose);” — `eqNow` to stan bez straty blinda przy pasie; pozycje i stos szablonu (`tools/content-build/test/fixtures/icm-call/sc-fx-icm-call.yaml:6` „positions: { hero: BB, villain: SB }”) nie wchodzą do rachunku, a `heroIndex` i `villainIndex` są losowe (`packages/poker-core/src/scenario-gen.ts:363`). Zakres rywala to all-in SB przy 10 bb (`spot: push.sb-10`), więc gracz w BB ma wpłacony 1 bb. Sonda (3000 wariantów/poziom, bb = stos efektywny ÷ 10, pas = strata 1 bb): łatwy 0, średni 0, trudny 1239 odwróconych; przykład: AQo equity 0,627, generator „fold” (próg 0,656), z blindem próg 0,613 → „call”. `CE_CZERWONE=1 vitest run test/recenzja-ce-odtworzenie.test.ts` → kod 1 (`dowody/ce-odtworzenie-czerwone.txt`).
- Mechanizm: wyrocznia testu F4 (`szablony-f4-ca.test.ts`) liczy ICM od zera, ale w tym samym modelu (bez blindów, losowe miejsca), więc błędu nie widzi (ŚR-204 na poziomie modelu). Ten sam model ma `generateIcmCall` (`icm.ts`), ale tam equity jest abstrakcyjne, bez pozycji.
- Powraca: nie → trwała kontrola: test odtwarzający przełączony na `it`.
- Wzorzec lub źródło: R-M11-009 (BF ÷ (BF + 1) z equity „teraz”, które przy pasie z BB zawiera stratę blinda); ADR-24 szczebel 1.
- Kroki w aplikacji: brak dziś (szablon w treści nie istnieje); po dodaniu: poziom trudny pokazuje „pas” jako jedyną dobrą odpowiedź z AQo.
- Opcje: (a) rachunek z blindami z pozycji szablonu i stosu `stackBb` (bb = stos efektywny ÷ stackBb, gracz w BB/SB traci blind przy pasie, blindy w puli) — zgodny ze spotem push, większa zmiana; (b) usunąć pozycje blindów z szablonów `icm-call` i nazwać „blindy pominięte” w tekście zadania, a zakres rywala brać ze spotu bez blindów gracza — mniej kodu, słabsza zgodność z rzeczywistym spotem; (c) `marginMin` ≥ 0,06 na każdym poziomie (wpływ blindów mniejszy niż margines) — najtańsze, ale zostawia rozjazd modelu. Rekomendacja: (a).
- Test akceptacyjny: `recenzja-ce-odtworzenie.test.ts` 001 jako `it` przechodzi; wyrocznia F4 liczy próg z blindami niezależnie od generatora.
- Status: otwarte

### 08-programista-002 · All-in rywala jest o 0,5 bb większy niż stos gracza, gdy gracz albo rywal jest blindem
- Pozycja listy kontrolnej: DEV-03
- Poziom: P1 (WYS: błędne liczby, poprawka ŚR-002 niepełna)
- Realność: brzegowy (linia all-in tylko w fiksturze `sc-fx-allin-draw`, BB wobec BTN) · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:214` „const MARTWE_BLINDY_BB = 1.5;” i `:434` „t.stackBb! - (pot - MARTWE_BLINDY_BB) / 2”: 1,5 bb martwych blindów jest prawdą tylko, gdy żaden z graczy nie jest blindem. Przy BB wobec BTN martwy jest tylko SB (0,5 bb): pula 36 → wkład 17,75, stos za pulą 17,25, generator daje all-in 17,75. `CE_CZERWONE=1` → kod 1 („1: pula 36, all-in 17.75, stos za pulą 17.25”).
- Mechanizm: ta sama stała w limicie stosu ŚR-203 (`packages/poker-core/src/scenario-gen.ts:436`); wyrocznie powtarzają formułę generatora: `tools/content-build/test/szablony-f5-bu.test.ts:43` (`wkladGracza` z `MARTWE_BB = 1.5`) i `tools/content-build/test/allin-stos-ca.test.ts:21` ("const stos = t.stackBb - (d.pot - 1.5) / 2;") — ŚR-204. `grep -rn "1.5\b\|MARTWE" tools/content-build/test packages/poker-core/src/scenario-gen.ts` → 4 miejsca.
- Powraca: tak, ŚR-002 (recenzja BZ) → trwała kontrola: wyrocznia z martwymi blindami liczonymi z pozycji szablonu.
- Wzorzec lub źródło: rachunek: pula przed flopem = 2 × wkład + blindy graczy spoza rozdania.
- Kroki w aplikacji: brak dziś; w treści sc-02 i sc-19 (BTN wobec BB, 35 bb) ten sam błąd zawyża limit stosu o 0,5 bb (patrz „Do sprawdzenia”).
- Opcje: (a) martwe blindy z `positions` szablonu (funkcja w poker-core, wspólna dla all-in i limitu ŚR-203) — dokładne; (b) build odrzuca linię all-in i `stackBb`, gdy gracz albo rywal jest blindem — prostsze, ogranicza treść (sc-02, sc-19 to BTN wobec BB). Rekomendacja: (a).
- Test akceptacyjny: `recenzja-ce-odtworzenie.test.ts` 002 jako `it` przechodzi; wyrocznie F5 i `allin-stos-ca` nie używają stałej 1,5.
- Status: otwarte

### 08-programista-003 · `size-spot` nie sprawdza pozycji wobec reguły; fikstura z graczem i rywalem w tym samym miejscu przechodzi
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR) · Realność: brzegowy · Pewność: wysoka · Rodzaj: D
- Dowód: `tools/content-build/test/fixtures/size-spot/sc-fx-3bet-oop.yaml:6` „positions: { hero: BB, villain: BB }”; `sc-fx-3bet-ip` ma BTN wobec BB (BB nie może otworzyć przed BTN). Test F3 ignoruje pozycje fikstur i ustawia własne (`tools/content-build/test/szablony-f3-ca.test.ts:37`). `checkScenarioTemplate` nie porównuje `params.position` reguły (ip/oop) z pozycjami — szablon z regułą IP przy graczu bez pozycji uczyłby złego rozmiaru (3× zamiast 4×).
- Opcje: (a) walidacja w buildzie: hero ≠ villain, otwierający przed graczem, ip/oop zgodne z regułą; (b) pozycje wyprowadzane z reguły. Rekomendacja: (a).
- Test akceptacyjny: fikstury z niespójnymi pozycjami odrzucone z komunikatem; test F3 bierze pozycje z fikstury.
- Status: otwarte

### 08-programista-004 · Zły rozmiar „raise-small” 2,0 bb to rozmiar solvera z UTG
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (ŚR) · Realność: teoretyczny (dziś tylko BTN i SB) · Pewność: wysoka · Rodzaj: M
- Dowód: `packages/poker-core/src/scenario-gen.ts:217` (0,8 × `pf.open-size` 2,5 = 2,0 bb); `content/numbers.yaml:89` ("The smallest open is for the minimum of 2bb from UTG"). Brak ograniczenia pozycji gracza dla `open-size`.
- Opcje: (a) build dopuszcza open-size tylko z BTN i SB (tam 2,0 bb jest poniżej rozmiaru solvera); (b) zły mały rozmiar spoza przedziału rozmiarów solvera (np. min-raise tylko, gdy solver otwiera > 2 bb). Rekomendacja: (a); merytorycznie do potwierdzenia przez rolę 06.
- Test akceptacyjny: szablon open-size z UTG/LJ/HJ/CO odrzucony w buildzie.
- Status: otwarte

### 08-programista-005 · `cbet-case` ocenia jedną akcję, a silnik gry uznaje rzadszą za dopuszczalną
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR) · Realność: brzegowy · Pewność: średnia · Rodzaj: M
- Dowód: `packages/poker-core/src/grading.ts:386` (przy best small/big czekanie = "acceptable", komentarz: reguły c-betu są częstotliwościowe); `packages/poker-core/src/scenario-gen.ts:418` zapisuje tylko `correct`, bez akcji dopuszczalnych, a fikstura `sc-fx-cbet-dry` uczy "Stawiasz mało" każdą klasą ręki (air, para, draw) z reguły o zakresie.
- Opcje: (a) pole `acceptable` w wariancie z `grading.ts`, ekran pokazuje „dopuszczalne”; (b) wyjaśnienia o strategii zakresu, nie ręki, i bez filtra `holding`. Rekomendacja: (a) + przegląd tekstów przez rolę 06.
- Test akceptacyjny: wyrocznia F2 porównuje także akcje „acceptable” z silnikiem.
- Status: otwarte

### 08-programista-006 · Macierz equity z pliku bez parsowania
- Pozycja listy kontrolnej: DEV-09 · Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: `tools/content-build/src/build.ts:409` (`JSON.parse(...) as Equity169Data`); `packages/poker-core/src/scenario-gen.ts:228` (`freqs[HAND_CLASSES.indexOf(vc)] ?? 0`: klasa spoza listy daje wagę 0 bez błędu).
- Opcje: schemat zod w content-schema; albo sprawdzenie 169 klas i wymiarów w buildzie. Rekomendacja: zod.
- Test akceptacyjny: uszkodzony plik daje błąd buildu. · Status: otwarte

### 08-programista-007 · Zaokrąglenie rozmiaru 3-betu a tolerancja oceny
- Pozycja listy kontrolnej: DEV-01 · Poziom: P2 (NIS) · Realność: teoretyczny (3 × 2,5 i 4 × 2,5 dokładne) · Pewność: wysoka · Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:394` `round1`; `grading.ts` `near` < 0,05: np. 3,5 × 2,5 = 8,75 → 8,8, różnica 0,05 → „inaccuracy” dla poprawnej akcji. Test F3 powtarza `round1` (`tools/content-build/test/szablony-f3-ca.test.ts:74`).
- Opcje: rozmiar bez zaokrąglenia w ocenie; albo build sprawdza `near(round1(x), x)`. · Status: otwarte

### 08-programista-008 · Próg 0,5 w dwóch miejscach; komunikat walidacji bez `icm-call`
- Pozycja listy kontrolnej: DEV-13 · Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:220` i `packages/poker-core/src/icm.ts:125`; `packages/poker-core/src/scenario-gen.ts:274` wymienia tylko cbet-case i size-spot.
- Opcje: wspólna stała w `icm.ts`. · Status: otwarte

### 08-programista-009 · `cbet-case` bez sprawdzenia warunków spotu z silnika gry
- Pozycja listy kontrolnej: DEV-01 · Poziom: P2 (NIS) · Realność: teoretyczny · Pewność: wysoka · Rodzaj: D
- Dowód: `grading.ts` ocenia c-bet tylko, gdy gracz jest jedynym agresorem i ma pozycję; `checkScenarioTemplate` (gałąź cbet-case) nie sprawdza `positions` (np. BB wobec BTN przeszedłby).
- Opcje: walidacja pozycji w buildzie. · Status: otwarte

## Do sprawdzenia
- Treść sc-02 i sc-19 (BTN wobec BB, 35 bb): limit ŚR-203 zawyżony o 0,5 bb (mechanizm 002); czy jakikolwiek wariant ma zakład w przedziale (stos, stos + 0,5] — brak pomiaru.
- Zakres all-in SB 10 bb a losowe stosy 3–4 graczy (`randomStacks`, stół 6-max w szablonie): spójność opisu sytuacji z liczbami — do roli 06 przy pierwszym szablonie.

## Co działa dobrze i należy zachować
- Wyrocznie F2 i F3 na prawdziwym rozdaniu w silniku gry (`gradeDecision`), nie na modelu generatora.
- Brak zgadywanych progów i marginesów (NIS-006, ŚR-003): brak kontekstu = `TemplateError`, brak `marginMin` = błąd buildu.
- Odcisk `icm-call` z rozszerzeniem o stosy (pojemność, BR-GEN-002).

## Decyzje dla właściciela
Brak produktowych. Decyzje recenzji: `docs/decyzje/CE.md` (D-725…D-727, do weta).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003`
(ŚR 004–005 z rolą 06; NIS do backlogu.)
