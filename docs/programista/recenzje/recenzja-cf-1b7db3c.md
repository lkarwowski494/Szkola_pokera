# Audyt: Programista — Szkoła Pokera — recenzja niezależna CF — 2026-11-10
Commit: zakres `1533486..1b7db3c` (CF: db5fe10d, 1b7db3c4) · Tryb: audit (recenzja D-043, polecenie CG) · Środowisko: Linux, Node 22.23.4, pnpm, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (nie dotyczy: zmiany w pakietach TypeScript bez UI). Ścieżki dowodów względem `docs/programista/`.

## Podsumowanie
Werdykt: **do scalenia** (0 KRYT, 0 WYS, 1 ŚR, 3 NIS). Zasada zero utraty danych spełniona: migracja v3 to jedno `ALTER TABLE … ADD COLUMN … DEFAULT 0` w transakcji runnera z wycofaniem, przetestowana na kopii bazy v2 z wpisami; zapis to UPSERT; eksport zawiera kolumnę, import pliku sprzed kolumny działa (wpisy = 0), zły typ i nadmiar dają `bledny_plik` bez zmiany bazy. Najważniejsze ryzyko (ŚR): wersja zgodności „to samo rozdanie” śledzi tylko kod generatora, a wynik pod tym samym ziarnem zależy też od treści (szablon, kontekst) — po wydaniu z poprawioną treścią ta sama ręka wraca z inną pulą i zakładem, a `czyPowtorkaWariantu` uzna ją za powtórkę (poza limitem). Test odtwarzający: `packages/domena/test/cg-recenzja-powtorka.test.ts` (`it.fails`, czerwony jako `it`). Decyzja dla koordynatora: sposób naprawy 001 przed podłączeniem przycisku w UI.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR | D | „To samo rozdanie” po aktualizacji treści daje inną pulę/zakład przy zgodnej wersji | otwarte |
| 08-programista-002 | NIS | D | Rezerwa `wybierzWariant` po migracji może powtórzyć odcisk z bieżącej sesji | otwarte |
| 08-programista-003 | NIS | D | Plik eksportu z v3 w starszym buildzie: `bledny_plik` zamiast `nowsza_wersja` | otwarte |
| 08-programista-004 | NIS | D | Komunikat użycia `sprawdz-eksport.mjs` bez argumentu schemat-v3 | otwarte |

## Linia bazowa i założenia
Ustalone z kodu przed przeczytaniem uzasadnień autora (`docs/decyzje/CF.md` i `stan-cf.md` przeczytane dopiero po własnej ocenie, żeby odróżnić decyzje od defektów).
- **Ścieżki zapisu:** `zapiszOdcisk` (UPSERT + przycięcie okna w jednej transakcji), migracja v3, import (DELETE + INSERT w jednej transakcji po walidacji całości), kopia `VACUUM INTO`. Wynik: wszystkie w transakcji, bez `OR REPLACE` (grep `OR REPLACE|REPLACE INTO` w `packages/postep/src`, `apps/mobile/src` → tylko komentarze ostrzegawcze).
- **Obsługa błędów:** ujemna/niecałkowita wersja → CHECK → `zapis_nieudany`; zły typ w bazie → `odczyt_nieudany` (nie udaje 0); zły plik → `bledny_plik`, baza bez zmian. Brak pustych `catch` w diffie.
- **Typy na granicach:** `jakoOdcisk` parsuje `generator_wersja` z `unknown` (`packages/postep/src/wariantyHistoria.ts:43`); import przez `zgodnaZTypem`.
- **Wydajność, system projektowy, i18n, dostępność:** sprawdzone, brak zmian w tych obszarach (diff bez UI).
- **Liczby konfiguracyjne:** `SCHEMAT_WERSJA: 3` w module konfiguracji; `GENERATOR_WERSJA` w poker-core (stała kodu, nie konfiguracja).
- **Testy na właściwym poziomie:** migracja i import na `node:sqlite` przez port; logika powtórki czysta w domenie.
- **Soczewki:** zapis przerwany w połowie (migracja z błędem po ALTER: wycofana, test `packages/postep/test/wariantyHistoria-cf.test.ts:56`); recenzent szukający ścieżki bez testu (znalazł 001: zmiana treści); programista czytający moduł pierwszy raz (komentarz przy `GENERATOR_WERSJA` wymienia „kontekst” jako przyczynę podniesienia wersji, ale kontekst i szablon pochodzą z treści, której zmiana nie dotyka tej stałej); VoiceOver — nie dotyczy (brak UI).
- **Wzorzec najlepszych:** odtwarzalność przez ziarno wymaga wersjonowania wszystkich wejść funkcji deterministycznej (kod + dane). Tu wejścia to `generateVariant(template, level, seed, ctx)` (`packages/poker-core/src/scenario-gen.ts:472`), a wersjonowany jest tylko kod.
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/postep/src/migracje.ts`, `schemat-v3.ts`, `docs/architektura/schemat-v3.sql` | tak | odczyt kodu; testy `k02-migracje`, `wariantyHistoria-cf`, `schemat-v3` w `dowody/cg-ci-1188910a.txt` |
| `packages/postep/src/wariantyHistoria.ts` (UPSERT, odczyt) | tak | odczyt kodu; testy j.w. |
| `packages/postep/src/daneUzytkownika.ts` (eksport, import, kopia) | tak | odczyt kodu, porównanie z `1533486` |
| `packages/domena/src/wariant.ts`, `limit.ts`, `konfiguracja.ts` | tak | odczyt kodu; sonda `dowody/cg-sonda-powtorka-czerwony.txt` |
| `packages/poker-core/src/scenario-gen.ts` (stała, odcisk, generator) | tak | odczyt kodu, sonda j.w. |
| `tests/narzedzia/sprawdz-eksport.mjs`, `wzorzec-bazy.ts` | tak | odczyt kodu |
| Wywołania w `apps/mobile` | tak | grep `zapiszOdcisk|odczytajOdciski|ziarnoPowtorki|czyPowtorkaWariantu|GENERATOR_WERSJA` → 0 wywołań w aplikacji |
| Zachowanie na urządzeniu (expo-sqlite iOS) | nie | brak macOS; migracja to `ALTER TABLE ADD COLUMN`, bez przebudowy, ścieżka jak v2 |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cf-1b7db3c.md . docs/programista --rola 08-programista` (kopia skryptu w scratchpadzie): `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0. `git diff --cached` przejrzany przed commitem: tylko test, raport, decyzje i dowody, bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | 08-programista-001 (ścieżka „zmiana treści” bez testu); reszta reguł D-731 z testami w `packages/domena/test/wariant-cf.test.ts` |
| DEV-02 | dotyczy | ok: 1/1 commit zmieniający zachowanie (db5fe10d) zawiera testy |
| DEV-03 | dotyczy | ok: w diffie brak `.skip`/`.only`; zmienione oczekiwania (wersja 2→3, migracja „zła” 3→4) wynikają z nowej migracji, nie luzują asercji |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0, `dowody/cg-ci-1188910a.txt` |
| DEV-05 | dotyczy | ok: UPSERT `packages/postep/src/wariantyHistoria.ts:27`, import w jednej transakcji |
| DEV-06 | dotyczy | ok: migracja w transakcji `packages/postep/src/migracje.ts:57`, wycofanie `packages/postep/src/migracje.ts:67`; test na kopii v2 z wpisami `packages/postep/test/wariantyHistoria-cf.test.ts:39`; kopia `VACUUM INTO` bez zmian |
| DEV-07 | dotyczy | ok: domyślne 0 przy imporcie = wartość nadawana przez migrację (`docs/architektura/schemat-v3.sql:6`), nie zgadywanie |
| DEV-08 | nie dotyczy | brak zmian w datach |
| DEV-09 | dotyczy | ok: `generator_wersja` parsowane z `unknown` |
| DEV-10 | dotyczy | ok: błędy zapisu/odczytu jako `Wynik` |
| DEV-11 | nie dotyczy | brak zmian UI |
| DEV-12 | nie dotyczy | brak tekstów UI |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | ok: brak sekretów w diffie |
| DEV-15 | nie dotyczy | brak efektów/timerów |
| DEV-16 | nie dotyczy | brak wartości z jednostką w zmianie |

## Znaleziska (szczegóły)

### 08-programista-001 · „To samo rozdanie” po aktualizacji treści pokazuje tę samą rękę z inną pulą i zakładem, a limit liczy to jako powtórkę
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR (P2) — ocena D-736
- Realność: brzegowy dziś (brak wywołań w UI), realny po podłączeniu przycisku: każde wydanie zmieniające szablon scenariusza albo dane kontekstu (`numbers.yaml`, zakresy, przypadki c-betu, reguły rozmiaru, equity) · Pewność: wysoka
- Rodzaj: D
- Dowód: zgodność to tylko `w.generatorWersja === GENERATOR_WERSJA` (`packages/domena/src/wariant.ts:13`), a `generateVariant(template, level, seed, ctx)` (`packages/poker-core/src/scenario-gen.ts:472`) zależy od szablonu i kontekstu z treści (ADR 0005: treść w paczce, wersja treści niezależna od kodu). Odcisk to tylko ręka i stół (`packages/poker-core/src/scenario-gen.ts:271`), bez puli i zakładu. Sonda: szablon draw-call, lista pul `[20,40,60,100]` → `[20,40,60,80,100]`, ten sam kod: odcisk `test-a|latwy|K050/A1Q2J2` identyczny, decyzja `[60,60]` → `[80,80]` (`dowody/cg-sonda-powtorka-czerwony.txt`, kod 1).
- Mechanizm: wersja odtwarzalności obejmuje jedno z trzech wejść funkcji deterministycznej; `grep -rn "zgodny(" packages/domena/src` → 3 użycia, wszystkie z tą samą luką: `ziarnoPowtorki`, `czyPowtorkaWariantu`, rezerwa `wybierzWariant`.
- Powraca: tak, ta sama klasa co ŚR-001 (recenzja BU) → trwała kontrola: test `packages/domena/test/cg-recenzja-powtorka.test.ts` (dziś `it.fails`).
- Wzorzec lub źródło: D-734 ogranicza kontrolę do zmian kodu; zmiana treści nie jest w nim wymieniona. Komentarz przy stałej wymienia „kontekst” jako przyczynę podniesienia wersji (`packages/poker-core/src/scenario-gen.ts:211`), ale kontekst zmienia się z treścią, nie z kodem.
- Kroki w aplikacji (po podłączeniu): zagraj scenariusz → aktualizacja aplikacji z poprawioną listą pul w szablonie → „Zagraj jeszcze raz to samo rozdanie” → ta sama ręka, inna pula i zakład, inne wymagane equity; start nie zużywa limitu, bo odcisk i wersja są zgodne.
- Opcje: (A) zapisywać w historii także wersję treści (`meta.wersja` bazy treści, ADR 0005 pkt 5) i wymagać zgodności obu — prosto, migracja v4 jak v3; każde wydanie treści unieważnia wszystkie powtórki (zdarzenie rzadkie, koszt: raz nowe rozdanie zamiast powtórki). (B) zapisywać skrót (hash) szablonu i użytego kontekstu — precyzyjne (unieważnia tylko zmieniony szablon), ale wymaga stabilnej serializacji i więcej kodu. (C) zapisywać pełny wariant (JSON) i odtwarzać z zapisu, nie z ziarna — zawsze wiernie, ale większa tabela i format eksportu. Rekomendacja: (A), bo daje ten sam mechanizm co v3 i zero ryzyka cichej różnicy; (B) dopiero, gdy wydania treści będą częste.
- Test akceptacyjny: `packages/domena/test/cg-recenzja-powtorka.test.ts` z `it` zamiast `it.fails` przechodzi (po zmianie treści ziarno powtórki albo odtwarza ten sam wariant, albo `ziarnoPowtorki` zwraca `null`); analogiczny przypadek dla `czyPowtorkaWariantu` (nie powtórka przy innej wersji treści).
- Status: otwarte

### 08-programista-002 · Zaraz po migracji rezerwa `wybierzWariant` może zwrócić odcisk zagrany już w tej sesji
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS (P2)
- Realność: teoretyczny (wymaga 200 kolejnych prób bez wolnego odcisku, czyli szablonu o pojemności bliskiej oknu 20) · Pewność: średnia
- Rodzaj: D
- Dowód: pętla rezerwy pomija wpisy niezgodne (`packages/domena/src/wariant.ts:41`), a gdy całe okno ma wersję 0 (stan po migracji), kończy na `return ostatni;` (`packages/domena/src/wariant.ts:46`) — ostatni wygenerowany wariant bez sprawdzenia `o.sesja`. Przed CF ta ścieżka wymagała, by wszystkie wpisy okna były w sesji; po CF wystarczy stara wersja.
- Mechanizm: jedna funkcja; brak innych trafień.
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-002 (w sesji 0 powtórzeń odcisku), komentarz `packages/domena/src/wariant.ts:1`.
- Kroki w aplikacji: brak drogi dziś (funkcja bez wywołań w UI).
- Opcje: (A) w pętli prób zapamiętać pierwszy wariant spoza `o.sesja` i zwrócić go zamiast `ostatni` — mała zmiana; (B) zostawić i zapisać w backlogu — brak kosztu teraz. Rekomendacja: (A) przy naprawie 001.
- Test akceptacyjny: historia z samymi wpisami wersji 0, generator zwracający tylko odciski z okna i sesji → wynik spoza sesji, jeśli taki był wśród prób.
- Status: otwarte

### 08-programista-003 · Kopia z nowej wersji wczytywana w starszym buildzie TestFlight daje „błędny plik” zamiast „nowsza wersja”
- Pozycja listy kontrolnej: DEV-10
- Poziom: NIS (P2)
- Realność: brzegowy (tylko powrót do starszego buildu TestFlight; App Store nie pozwala na obniżenie wersji); bez utraty danych — walidacja przed dotknięciem bazy · Pewność: wysoka
- Rodzaj: D
- Dowód: `wersja_formatu` zostaje 1 (D-732), a starszy kod odrzuca wiersz o innej liczbie kolumn (`git show 1533486:packages/postep/src/daneUzytkownika.ts`, linia 52: `if (Object.keys(w).length !== kolumny.length) return null;`), więc plik z `generator_wersja` daje `bledny_plik`, nie `nowsza_wersja`.
- Mechanizm: dodawanie kolumny bez zmiany `wersja_formatu`; dotyczy każdej przyszłej kolumny opcjonalnej.
- Powraca: nie
- Wzorzec lub źródło: ADR 0008 (`nowsza_wersja` dla pliku z nowszego formatu).
- Kroki w aplikacji: eksport w buildzie z v3 → instalacja starszego buildu z TestFlight → import → komunikat o błędnym pliku.
- Opcje: (A) zostawić (brak użytkowników poza właścicielem, App Store bez obniżania wersji) — zero kosztu; (B) dodać do koperty pole `schemat` i w imporcie rozróżnić „nowszy schemat” — dokładny komunikat, zmiana formatu. Rekomendacja: (A), wpis do backlogu.
- Test akceptacyjny: (B) plik z nieznaną kolumną i wyższym `schemat` → `nowsza_wersja`.
- Status: otwarte

### 08-programista-004 · Komunikat użycia narzędzia kontroli eksportu nie wymienia argumentu schemat-v3
- Pozycja listy kontrolnej: DEV-13
- Poziom: NIS (P2)
- Realność: teoretyczny (narzędzie deweloperskie; domyślne ścieżki działają) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tests/narzedzia/sprawdz-eksport.mjs:70` — „użycie: node tests/narzedzia/sprawdz-eksport.mjs <plik.json> [<schemat.sql> [<schemat-v2.sql>]]”, a nagłówek pliku podaje już czwarty argument.
- Mechanizm: jedno miejsce.
- Powraca: nie
- Wzorzec lub źródło: nagłówek `tests/narzedzia/sprawdz-eksport.mjs:3`.
- Kroki w aplikacji: brak (narzędzie).
- Opcje: (A) dopisać `[<schemat-v3.sql>]` — jedna linia; (B) zostawić. Rekomendacja: (A) przy najbliższej zmianie pliku.
- Test akceptacyjny: komunikat zgodny z nagłówkiem.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Kontrola D-733 (jeden wzorzec: szablon A, poziom średni, ziarno 12345) nie złapie zmian kodu w ścieżkach range-spot, size-spot, cbet-case, icm-call ani linii turnu; autor nazwał to w D-734 („dolna granica”). Nie zgłaszam jako znalezisko (świadoma decyzja), ale przy naprawie 001 warto rozszerzyć wzorzec o po jednym wariancie każdego rodzaju punktu.
- SQLite na iOS (expo-sqlite 58): `ADD COLUMN` z `NOT NULL DEFAULT 0 CHECK` — dokumentacja sqlite.org dopuszcza; na urządzeniu nie sprawdzone (brak macOS). Krok dla właściciela: test na telefonie po instalacji buildu z v3 na danych z v2 (lista kontrolna).

## Co działa dobrze i należy zachować
- Migracja jako czysty `ADD COLUMN` (bez przebudowy tabeli), test na kopii bazy v2 z wpisami i test wycofania błędu po ALTER (`packages/postep/test/wariantyHistoria-cf.test.ts:56`).
- Wpisy sprzed migracji = 0, a nie 1: nie udają zgodności z generatorem, którego nikt nie sprawdził.
- Import: brak kolumny opcjonalnej dozwolony, nadmiar i zły typ nadal `bledny_plik`; baza bez zmian przy błędzie (`packages/postep/test/wariantyHistoria-cf.test.ts:125`).
- Okno bez powtórzeń liczy wszystkie wersje (nie wraca rozdanie świeżo widziane tylko dlatego, że zmienił się generator).
- `odczytajOdciski` przy złym typie kolumny zwraca `odczyt_nieudany`, nie wersję 0.

## Decyzje dla właściciela
Brak decyzji produktowych dla właściciela. Dla koordynatora (techniczna, do weta): wybór naprawy 08-programista-001 — rekomendacja (A) wersja treści w historii, przed podłączeniem przycisku „Zagraj jeszcze raz to samo rozdanie” (D-737). Decyzje recenzji: `docs/decyzje/CG.md` (D-735…D-737).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002`
(003 i 004 do backlogu.)
