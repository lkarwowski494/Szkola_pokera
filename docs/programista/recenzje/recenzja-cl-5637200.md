# Audyt: Programista — Szkoła Pokera — recenzja niezależna scalenia CL — 2026-11-11
Commit: `5637200` (gałąź `sesja-cm-recenzja` = gałąź robocza po scaleniu CL) · Zakres: CJ `cb782bb..2e9c358` i CK `f3f548f..5952fc5` w `tools/content-build/src` i `packages/poker-core/src/scenario-gen.ts`; scalenie CL `07b04fb..5637200` (79ad5ef, a9fe969, ce65318, eae5d1b, 1873e52, c82d6b4) · Tryb: audit (recenzja D-043, polecenie CM) · Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (nie dotyczy: zmiany w TypeScript, ekran sprawdzony testami Jest i odczytem kodu). Ścieżki dowodów względem `docs/programista`.

## Podsumowanie
Werdykt: **przyjąć** (0 KRYT, 0 WYS, 2 ŚR, 3 NIS); nic nie blokuje wydania testowego. (a) Kontrola generatora nie ma ścieżki pominięcia poza testami: `content:build` i `content:check` wołają `compileAll` z domyślnymi opcjami, `content:check` jest w `pnpm run ci` (CI GitHub) i w bramce pre-push, a `build.test.ts` robi jedną pełną kompilację z pomiarem czasu na szablon. Formuły all-in (martwe blindy z pozycji) i progu ICM z blindem gracza zgadzają się z rachunkiem dla pozycji z fixture; wyrocznie testów liczą je niezależnie od generatora. (b) Rozwiązania konfliktów zachowują oba zamiary (CK `checkScenarioNaEkran` + CJ `kontrolaGeneratora`); konflikt semantyczny CA/CJ×CK zostawił jednak bramkę ekranu niepełną (001). (c) KO-059: brak drogi przez interfejs do błędnej powtórki; ŚR-001 CG zostaje teoretyczne i nie blokuje wydania.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR | D | Budowanie przepuszcza szablony `cbet-case`, `size-spot`, `icm-call`, których ekran nie wygeneruje („plan_niepoprawny”) | otwarte |
| 08-programista-002 | ŚR | M | `icm-call` przyjmuje gracza SB wobec all-inu BB: koszt pasu 0,5 bb i zakres all-inu z SB są błędne dla tej pary | otwarte |
| 08-programista-003 | NIS | D | Nowa gałąź „powtórka przy wpisie innej wersji generatora” w `otworzScenariusz` bez testu na poziomie ekranu | otwarte |
| 08-programista-004 | NIS | D | Wznowienie rozdania po aktualizacji treści odtwarza wariant z ziarna bez sprawdzenia odcisku | otwarte |
| 08-programista-005 | NIS | D | Dwa commity scaleń z nieusuniętymi znacznikami konfliktu w `build.ts` | otwarte |

## Linia bazowa i założenia
Ocena z kodu i diffów przed przeczytaniem uzasadnień autorów (`docs/decyzje/CJ.md`, `CK.md`, `CL.md`, `stan-cj/ck/cl.md` przeczytane po własnej ocenie, tylko by odróżnić decyzje od defektów; żadne znalezisko nie jest unieważnione decyzją, 001 jest słownie odnotowane w `stan-cl.md` jako „otwarte” bez kontroli mechanicznej).
- **Ścieżki zapisu:** w zakresie tylko `zapiszOdcisk` z `generatorWersja` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:110`); zapis po starcie aktywności, błąd do dziennika (decyzja wcześniejsza, bez zmian). Bez `OR REPLACE`, bez nowych migracji.
- **Obsługa błędów:** błąd generatora na ekranie → `plan_niepoprawny` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:88`); to skutek 001 dla szablonów F2–F4.
- **Typy na granicach:** `naGenerator` rzutuje szablon z bazy treści (`as GeneratorTemplate`, `apps/mobile/src/features/scenariusz/wariant.ts:27`) tak samo jak kontrola generatora; szablon przechodzi wcześniej przez schemat zod przy odczycie bazy. Bez nowego znaleziska.
- **System projektowy, i18n, dostępność, wydajność listy:** sprawdzone, brak zmian w tych obszarach w zakresie.
- **Liczby konfiguracyjne:** `BUDZET_KONTROLI_SZABLONU_MS = 45_000` w teście (`tools/content-build/test/build.test.ts:81`), budżet testu, nie wartość aplikacji.
- **Testy na właściwym poziomie:** formuły w czystych funkcjach poker-core, wyrocznie w testach (`tools/content-build/test/martwe-blindy-wyrocznia.ts`, ICM z definicji w `szablony-f4-ca.test.ts`); ekran na `node:sqlite`.
- **Soczewki:** (1) recenzent szukający ścieżki bez testu → 001, 003; (2) programista czytający moduł pierwszy raz → `checkScenarioNaEkran` sugeruje, że chroni ekran, a chroni jeden z czterech rodzajów wymagających kontekstu (001); (3) zapis przerwany w połowie → bez zmian w zakresie; (4) rachunek szczebla 1 (ADR-24) → 002.
- **Wzorzec najlepszych:** bramka budowania dla konsumenta treści opisuje, co konsument umie (lista dozwolonych), a nie co jest zakazane; wtedy nowy rodzaj punktu jest odrzucany domyślnie.
- **Rachunek (szczebel 1):** stos all-in = stackBb − (pula − martwe)/2, martwe = 1,5 − blind gracza − blind rywala; dla BB wobec BTN martwe = 0,5, dla BTN wobec BB 0,5, dla BTN wobec CO 1,5, dla SB wobec BB 0. Próg ICM: wymagane = (EV_pas − EV_przegrana)/(EV_wygrana − EV_przegrana), EV_pas po utracie blinda gracza. Przykład ręczny (3 graczy, wypłaty 0,6/0,4, stacki 5000/3000/2000, gracz BB 2000, rywal SB 5000, stackBb 10 → bb = 200): EV_pas (1800 wobec 5200, 3000) = 0,18·0,6 + (0,52·1800/4800 + 0,3·1800/7000)·0,4 = 0,21686; EV_wygrana (4000) = 0,4·0,6 + 0,6·4000/7000·0,4 = 0,37714; EV_przegrana = 0; wymagane = 0,575. Kod (`equityAfter`) daje to samo (`dowody/cm-sonda-5637200.txt`).
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `tools/content-build/src/build.ts`, `cli.ts` (opcje, `compileAll`, check/build) | tak | odczyt kodu; grep `kontrolaGeneratora` (tylko testy) |
| `tools/content-build/src/scenariusze.ts` (CJ pozycje size-spot, CK `checkScenarioNaEkran`, kontrola generatora) | tak | odczyt; sonda `dowody/cm-sonda-5637200.txt` |
| `packages/poker-core/src/scenario-gen.ts` (all-in, ICM z blindami) | tak | odczyt; rachunek ręczny; sonda j.w. |
| Scalenia 79ad5ef, a9fe969, eae5d1b (`git show --remerge-diff`), ce65318 | tak | odczyt diffów; `git grep` znaczników na każdym commicie |
| `build.test.ts` (deterministyczność 30 s, budżet czasu), `allin-stos-ca`, `stos-zakladu-bu`, `szablony-f4-ca`, `szablon-allin-ck`, fixture `ko043` | tak | odczyt diffów; przebieg w `dowody/cm-ci-cec0119.txt` |
| `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts`, `wariant.ts`, `apps/mobile/src/app/scenario.tsx` | tak | odczyt kodu; testy Jest w przebiegu CI |
| `packages/domena/src/wariant.ts` (`ziarnoPowtorki`, `czyPowtorkaWariantu`) | tak | odczyt; test CG `packages/domena/test/cg-recenzja-powtorka.test.ts` |
| Przekłady szablonów (generator tylko dla pl) | tak | test struktury `tools/content-build/test/szablony-bs.test.ts:73` |
| Zachowanie na urządzeniu iOS | nie | brak macOS; zakres to logika TypeScript, sprawdzona testami |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cl-5637200.md . docs/programista --rola 08-programista` (kopia skryptu w scratchpadzie): `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0. `git diff --cached` przejrzany przed commitem: tylko test, raport, decyzje i dowody, bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (formuły all-in, ICM, bramki budowania) | 001, 002; formuły dla pozycji z fixture ok (wyrocznie niezależne) |
| DEV-02 | dotyczy (7 commitów zmieniających zachowanie) | 7/7 zmienia testy w tym samym commicie (f5e4395, 994e285, 2e9c358, 7c7b7ff, c47c337, 1873e52, c82d6b4); w c82d6b4 nowa gałąź powtórki bez własnego testu (003) |
| DEV-03 | dotyczy | ok: jedyne `it.fails` to CG i ten raport, z ID i instrukcją; brak `.skip`/`.only`; test deterministyczności zachował asercję hasha |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/cm-ci-cec0119.txt`) |
| DEV-05 | dotyczy (zapis odcisku) | ok: bez zmian ścieżki zapisu poza nowym polem |
| DEV-06 | nie dotyczy: brak migracji w zakresie | — |
| DEV-07 | dotyczy | ok: `icm-call` bez `positions`/`stackBb` daje `TemplateError`, nie domyślną wartość |
| DEV-08 | nie dotyczy: brak dat w zakresie | — |
| DEV-09 | dotyczy (`naGenerator`) | ok: rzutowanie jak w kontroli; szablon po schemacie |
| DEV-10 | dotyczy | 001 (błąd generatora → komunikat ogólny „plan_niepoprawny” dla poprawnej treści) |
| DEV-11 | nie dotyczy: brak zmian UI | — |
| DEV-12 | nie dotyczy: brak nowych tekstów | — |
| DEV-13 | dotyczy | ok: martwe blindy z jednej funkcji `deadBlindsBb` |
| DEV-14 | dotyczy | ok: diff bez sekretów |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów w zakresie | — |
| DEV-16 | dotyczy (bb ↔ żetony w ICM) | ok: bb = stos efektywny ÷ stackBb, jedno miejsce (`packages/poker-core/src/scenario-gen.ts:389`) |

## Znaleziska (szczegóły)

### 08-programista-001 · Budowanie przepuszcza szablony, których ekran scenariusza nie wygeneruje
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (ŚR wg progu wydania: dziś brak takiej treści)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `tools/content-build/src/scenariusze.ts:197` odrzuca tylko `range-spot`; ekran woła generator bez kontekstu (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:88`), a generator bez `GeneratorContext` rzuca dla `cbet-case`, `size-spot`, `icm-call`. Sonda: 8 fixture F2–F4 ma 0 błędów `checkScenarioNaEkran` i błąd z tekstem GeneratorContext bez kontekstu (`dowody/cm-sonda-5637200.txt`). Test odtwarzający: `tools/content-build/test/cm-recenzja-cl.test.ts` (`it.fails`).
- Mechanizm: bramka CK (D-755) to lista zakazanych rodzajów spisana, gdy kontekstu wymagał tylko `range-spot`; CA/CJ dodały trzy rodzaje, a CL po scaleniu przekazuje wszystkie punkty do generatora ekranu; `grep -n "range-spot" tools/content-build/src/scenariusze.ts` → bramka ekranu w jednym miejscu (`:198`).
- Powraca: nie (pierwsze wystąpienie po D-755) → trwała kontrola: test `cm-recenzja-cl.test.ts` po zamianie `it.fails` na `it`.
- Wzorzec lub źródło: polecenie roli 06 / D-755 („szablon nie może trafić do bazy treści”, gdy ekran go nie obsłuży).
- Kroki w aplikacji: rola 06 dodaje szablon c-betu (F2) albo ICM (F4) → `pnpm content:build` przechodzi → użytkownik otwiera scenariusz → komunikat błędu zamiast rozdania.
- Opcje: (A) bramka jako lista dozwolonych: ekran przyjmuje tylko `draw-call` — każdy nowy rodzaj odrzucony, dopóki ekran go nie obsłuży; (B) dopisać trzy rodzaje do listy zakazanych — mniej zmian, ale następny rodzaj znów przejdzie. Rekomendacja: A.
- Test akceptacyjny: `cm-recenzja-cl.test.ts` blok ŚR-001 zielony po zamianie `it.fails` na `it`; `szablon-na-ekranie-ck.test.ts` bez zmian.
- Status: otwarte

### 08-programista-002 · `icm-call` przyjmuje gracza SB wobec all-inu BB z błędnym kosztem pasu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (ŚR wg progu wydania: brak takiego szablonu w treści)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: M (kwestia merytoryczna, rachunek szczebel 1)
- Dowód: `packages/poker-core/src/scenario-gen.ts:377` dopuszcza każdą parę bez martwych blindów, w tym SB wobec BB; koszt pasu to blind gracza (`:389`, 0,5 bb dla SB). BB wchodzi all-in tylko po akcji SB (limp 1 bb albo podbicie), więc gracz SB traci przy pasie co najmniej 1 bb; zakres all-inu rywala bierze `spot` z pozycji SB (`push.sb-10`), a nic nie wiąże pozycji spotu z pozycją rywala. Sonda: szablon fixture z pozycjami odwróconymi przechodzi kontrolę generatora bez błędów (`dowody/cm-sonda-5637200.txt`, wiersz icm SB wobec BB: pusta lista błędów). Test odtwarzający: `cm-recenzja-cl.test.ts` (`it.fails`).
- Mechanizm: walidacja pozycji tylko przez sumę martwych blindów; `grep -n "deadBlindsBb(pos)" packages/poker-core/src/scenario-gen.ts` → 1 trafienie (`:377`).
- Powraca: nie → trwała kontrola: test j.w.
- Wzorzec lub źródło: ADR-24 szczebel 1 (rachunek); D-745 (CJ) przyjął model „pas = utrata blinda gracza”, poprawny dla gracza BB wobec all-inu SB.
- Kroki w aplikacji: brak dziś (treść nie ma `icm-call`; ekran i tak go nie obsłuży, 001); w zadaniu ICM z taką parą pozycji próg byłby zaniżony i odpowiedź „call”/„fold” mogłaby być błędna.
- Opcje: (A) budowanie dopuszcza w `icm-call` tylko gracza BB wobec SB i sprawdza, że spot zakresu all-inu ma pozycję rywala — mała zmiana, pokrywa fixture; (B) model limp/podbicia SB — wymaga nowych zakresów i decyzji roli 06. Rekomendacja: A.
- Test akceptacyjny: blok ŚR-002 `cm-recenzja-cl.test.ts` zielony po zamianie `it.fails` na `it`; `szablony-f4-ca.test.ts` bez zmian.
- Status: otwarte

### 08-programista-003 · Gałąź powtórki przy wpisie innej wersji generatora bez testu ekranu
- Pozycja listy kontrolnej: DEV-02
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: warunek `ziarnoPowtorki(h) !== null` dodany w c82d6b4 (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:88`); testy `aktywnoscScenariusza.test.ts` pokrywają powtórkę ze zgodnym wpisem i bez historii, nie wpis `generatorWersja: 0`. Logika domeny ma testy (`ziarnoPowtorki`), połączenie na ekranie nie.
- Mechanizm: jedno miejsce wywołania; `grep -rn "ziarnoPowtorki" apps/mobile/src` → 1 trafienie poza testami.
- Powraca: nie.
- Wzorzec lub źródło: zasada roli nr 2 (test przed kodem).
- Kroki w aplikacji: tester z historią sprzed CF (wersja 0) — ostatni wpis zawsze nadpisze bieżące rozdanie przed powtórką, więc droga przez UI praktycznie nie istnieje.
- Opcje: (A) test na `node:sqlite`: historia z wpisem `generatorWersja: 0`, `tryb: 'powtorka'` → nowy wariant z limitu; (B) bez testu (domena pokryta). Rekomendacja: A, przy następnej pracy w tym pliku.
- Test akceptacyjny: test (A) zielony i czerwony po usunięciu warunku.
- Status: otwarte

### 08-programista-004 · Wznowienie po aktualizacji treści odtwarza wariant z ziarna bez sprawdzenia odcisku
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NIS)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `wznow` generuje wariant z `plan.wariant.ziarno` i porównuje tylko liczbę decyzji (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:61`); plan nie zapisuje odcisku. Po aktualizacji aplikacji ze zmienionym szablonem (ta sama liczba punktów) wznowione rozdanie ma inne karty lub pulę niż odpowiedzi już zapisane. Ten sam mechanizm co ŚR-001 CG; kod sprzed CL (07b04fb).
- Mechanizm: ziarno odtwarza wariant tylko przy tej samej treści; `grep -n "generateVariant(" apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts` → 2 trafienia (`:57`, `:88`).
- Powraca: tak, ten sam mechanizm co CG 08-programista-001 → trwała kontrola: test wznowienia ze zmienionym szablonem.
- Wzorzec lub źródło: D-731 (CF) — ziarno ma sens tylko przy zgodnych wejściach generatora.
- Kroki w aplikacji: rozdanie w toku → zamknięcie aplikacji → aktualizacja z nową treścią szablonu → otwarcie scenariusza → wznowienie z innym wariantem. Bez utraty danych (odpowiedzi zostają), skutek: niespójne rozdanie.
- Opcje: (A) zapis odcisku w planie i porównanie przy wznowieniu (niezgodny → nowe rozdanie) — zmiana planu aktywności (rola 05); (B) wersja treści szablonu w planie — szersza zmiana razem z naprawą CG-001. Rekomendacja: B razem z CG-001 (jedna naprawa mechanizmu).
- Test akceptacyjny: wznowienie po zmianie `pots` szablonu nie zwraca innego wariantu niż zapisany.
- Status: otwarte

### 08-programista-005 · Dwa commity scaleń ze znacznikami konfliktu w `build.ts`
- Pozycja listy kontrolnej: DEV-04
- Poziom: P2 (NIS)
- Realność: realny (historia) · Pewność: wysoka
- Rodzaj: D (defekt procesu)
- Dowód: `git grep -n -E '^(<<<<<<<|=======|>>>>>>>)' 79ad5ef -- tools/content-build/src/build.ts` → linie 425, 428, 430; to samo w a9fe969; naprawione w ce65318. HEAD 5637200: 0 trafień.
- Mechanizm: bramka pre-push (`scripts/pre-push-check.mjs`) sprawdza tylko drzewo HEAD; commity pośrednie pushu nie są kompilowane.
- Powraca: nie (pierwsze wystąpienie) → trwała kontrola: sprawdzenie znaczników konfliktu w każdym nowym commicie pushu.
- Wzorzec lub źródło: zasada wspólna 21 (kontrola mechaniczna zamiast notatki).
- Kroki w aplikacji: brak (dotyczy `git bisect` i cofania commitów).
- Opcje: (A) w `pre-push-check.mjs` `git grep` znaczników na commitach `@{u}..HEAD` — tanie; (B) tylko notatka w instrukcji scalania — bez kontroli. Rekomendacja: A.
- Test akceptacyjny: test w `scripts/pre-push-check.test.mjs`: commit pośredni ze znacznikiem blokuje push.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Budżet 45 s na szablon przy limicie 120 s testu kompilacji: przy czterech wolnych szablonach limit testu padnie wcześniej niż budżet; dziś najdłuższy szablon kilka sekund (dowód czasu tylko z pomiaru CL, nie sprawdzałem na runnerze GitHub).

## Co działa dobrze i należy zachować
- `kontrolaGeneratora: false` tylko w testach; `content:check` (CI i pre-push) i `content:build` zawsze z kontrolą; test „wyłączenie kontroli nie zmienia hasha” uzasadnia szybszy test deterministyczności.
- Wyrocznie testów liczą martwe blindy i ICM bez kodu generatora (`tools/content-build/test/martwe-blindy-wyrocznia.ts`, ICM z definicji w `szablony-f4-ca.test.ts`).
- Generator odrzuca `icm-call` z martwymi blindami trzecich graczy zamiast zgadywać (D-745).
- Przekłady szablonów pilnowane testem struktury, więc kontrola generatora tylko dla pl wystarcza.

## Decyzje dla właściciela
Brak: wszystkie decyzje w zakresie technicznym i merytorycznym (D-775…D-779, `docs/decyzje/CM.md`), do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-005` (003 i 004 do backlogu; 004 razem z CG 08-programista-001).
