# Przekazanie roli 07 → 08 (Programista): testy akceptacyjne do zazielenienia

Stan: E4 roli 07 (build), 2026-11-07, commit bazowy 5886657. Źródło prawdy o testach: `docs/jakosc/strategia.md` §9 (tabele części 1–13), definicja ukończenia funkcji: §6, polityka niestabilnych testów: §7, lista „tylko telefon”: §8, kontrole roli 05: §8.1.

## Procedura (obowiązuje przy każdym teście z tabeli)

Testy istnieją; nie piszesz ich od nowa. Dla każdego: zamień znacznik `NIEZAIMPLEMENTOWANE` w zaślepce na najprostszy wynik zgodny z typem, uruchom test i zapisz czerwień na asercji, potem implementuj. Test z katalogu oczekujących przenieś do głównego zestawu w commicie, który go zazielenia (D-175: `tests/akceptacja/…` → testy pakietu albo `apps/mobile`, plik bez zmian poza ścieżkami importu). Błędny test zgłaszasz roli 07.

Dodatkowo (decyzje roli 07, do weta):
- 07 fix (2026-11-07, D-224): plik oczekujący o tej samej nazwie co plik w `packages/*/test/` **zastępuje** go w commicie, który go zazielenia (tabela: `docs/jakosc/fix-07-2026-11-07.md` „Zlecenie dla 08”).
- Uruchomienie: `pnpm test:akceptacja` (Vitest domena + Jest ekrany; poza `pnpm run ci`); po przeniesieniu test biegnie w `pnpm run ci` i jest bramką.
- Zaślepka z sygnaturą zaproponowaną przez rolę 07 (`kurs.ts`, `scenariusz.ts`, `wyjasnienie.ts`, typy maszyn, porty treści i powiadomień, kontrakty propsów ekranów w `apps/mobile/src/features/`) najpierw do potwierdzenia przez 05 (luki w §9); zmiana sygnatury po decyzji 05 to zmiana testu przez 07, nie przez 08.
- Testy-strażniki (29 zielonych dziś) muszą zostać zielone; czerwień strażnika po zmianie to regresja.
- Ścieżki wrażliwe (`packages/postep/`, `packages/domena/`, `apps/mobile/src/platform/`, `.github/workflows/`, `tools/content-build/`): przegląd w świeżym kontekście przed oddaniem (D-043).
- Każdy test domeny: ręczna próba mutacji w kopii (D-172) albo raport Strykera z nocnego przebiegu.

## Kolejność wdrożenia

Najpierw dane (S1), potem czysta domena, treść, kontrole, ekrany, na końcu przepływy E2E (kontrakt roli 07: „pierwszeństwo mają domena i zapis danych, potem przepływy”).

| Kolejność | Test (plik) | Kryteria / kontrole | Plik lub port do wdrożenia |
|---|---|---|---|
| 1 | `tests/akceptacja/postep/k02-migracje.test.ts` | K-02, NFR-DANE-001-a–c (ADR 0003, 0004) | `packages/postep/src`: `listaMigracji`, `migruj`, `otworzPostep` |
| 1 | `tests/akceptacja/postep/k04-k15-port.test.ts` | K-04, K-15 (kolejka zapisów, ADR 0010) | `packages/postep/src`: `zapiszKrok`, `zapiszPowtorke` |
| 1 | `tests/akceptacja/postep/k12-bledy.test.ts` | K-12, K-06 (błędy zapisu, uszkodzona baza) | `packages/postep/src`: `uruchomPostep`, `zapiszKrok`, `zapiszPowtorke` |
| 1 | `tests/akceptacja/postep/k14-stare-bazy.test.ts` | K-14 (ADR 0004: `user.db*` nietknięte) | `packages/postep/src`: `uruchomPostep`, `usunStareBazy` |
| 1 | `tests/akceptacja/postep/k11-dane.test.ts` | K-11, BR-DANE-001/002/003, NFR-DANE-002 | `packages/postep/src`: `eksportuj`, `importuj`, `usunPostep` |
| 1 | `tests/akceptacja/postep/k10-ochrona.test.ts` | K-10 (ochrona tła w 4 operacjach) | `packages/postep/src`: `eksportuj`, `importuj`, `kopiaBazy`, `migruj`, `usunPostep` |
| 2 | `tests/akceptacja/domena/eksport.test.ts` | BR-DANE-002, K-11, ADR 0008 | `packages/domena/src/eksport.ts`: `walidujEksport`, `migrujFormat` |
| 2 | `tests/akceptacja/domena/limit.test.ts` | BR-LIM-001/003/005, K-05 (9 stref, D-177) | `packages/domena/src/limit.ts`: `limitDnia`, `mozeStartowac` |
| 2 | `tests/akceptacja/domena/dostep.test.ts` | BR-ZAK-003, K-05 (9 wektorów dostępu) | `packages/domena/src/dostep.ts`: `decyzja` |
| 2 | `tests/akceptacja/domena/maszyny.test.ts` | ADR 0010 (aktywność, zakup, import), BR-CWI-004, BR-LIM-002/003, BR-ONB-001, BR-ZAK-002, D-109 | `packages/domena/src/maszyny.ts`: `startAktywnosci`, `przejscieAktywnosci`, `wejscieDoAktywnosci`, `przejscieZakupu`, `przejscieImportu` |
| 2 | `tests/akceptacja/domena/powtorki-wznowienie.test.ts` | BR-POW-001/002, BR-KURS-004, BR-SCN-001-b | `packages/domena/src/tresc.ts`: `kolejkaPowtorek`; `maszyny.ts`: `wejscieDoAktywnosci` (POW-001 — strażnik na `@szkola/srs`) |
| 2 | `tests/akceptacja/domena/k06-tresc.test.ts` | K-06 część czysta, BR-DANE-004 | `packages/domena/src/tresc.ts`: `nazwaPlikuTresci`, `planTresci`, `sprawdzMetaTresci`, `kolejkaPowtorek` |
| 2 | `tests/akceptacja/domena/k13-przypomnienie.test.ts` | K-13, BR-POW-003 (ADR 0012) | `packages/domena/src/przypomnienie.ts`: `wlaczPrzypomnienie`, `odtworzPrzypomnienie` |
| 2 | `tests/akceptacja/domena/kurs.test.ts` | BR-KURS-001/002, BR-ONB-003, BR-OPIN-001 (D-106, D-110) | `packages/domena/src/kurs.ts`: `nastepnaLekcja`, `planLekcji`, `poKrokuLekcji`, `wynikTestuModulu`, `poTescieModulu`, `poPonownejOcenie`, `czyProsicOOcene` (sygnatury — luka 05) |
| 2 | `tests/akceptacja/domena/wyjasnienie.test.ts` | BR-CWI-002/003/007, BR-JEZ-002 | `packages/domena/src/wyjasnienie.ts`: `wyjasnienieZadania`, `ocenOdpowiedzLiczbowa`, `formatProcent` (luka 05) |
| 2 | `tests/akceptacja/domena/scenariusz.test.ts` | BR-SCN-001–004, D-109 | `packages/domena/src/scenariusz.ts`: `przebiegScenariusza` (kształt treści — luka 05; treść scenariuszy — 06) |
| 2 | `tests/akceptacja/poker-core/brd-wektory.test.ts`, `rd11-ocena.test.ts` | RYZ-03 / ER-11 (błędne dane odrzucone walidacją), BR-CWI-001 (RD-11) | `packages/poker-core/src`: walidacja wejścia (`math.ts`, `icm.ts`), `grading.ts` (progi RD-11, D-143) |
| 3 | `tests/akceptacja/tresc/k06-start.test.ts` | K-06 start na plikach, K-12 `tresc_niedostepna`, K-14 | `packages/domena/src/tresc.ts`: `przygotujTresc` (port `PlikiTresci`) |
| 3 | `tests/akceptacja/tresc/k06-content-build.test.ts` | K-06 wyjście, NFR-JEZ-001/002, BR-JEZ-002-a | `tools/content-build`: 35 plików `tresc-<wersja>-<język>.db` z manifestem (ADR 0005) |
| 3 | `tests/akceptacja/tresc/kryteria-liczby.test.ts`, `kryteria-terminy.test.ts` | BR-CWI-002/003/005/006, BR-KURS-003/005 | treść `content/` — rola 06 (3 czerwone to znaleziska treści, nie kod); 08 tylko pole lekcji definiującej w schemacie terminów po decyzji 05/06 |
| 4 | `tests/akceptacja/kontrole/k07-zakazy.test.ts`, `k08-manifesty.test.ts`, `k09-app-json.test.ts`, `r56-runner-xcode.test.ts` (wykonane 08 cz. 4: K-07, K-09, R-56 w `tests/kontrole/`, K-08 zielony i informacyjnie w CI) | K-07, K-08, K-09, R-56 / D-050 | usunięcie starego kodu (ADR 0003, 0004, 0009, 0011), `apps/mobile/app.json` (manifest prywatności), podniesienie SDK do 58 z tabelą Xcode (Xcode dla SDK 58 [DO USTALENIA] — cytat z docs.expo.dev) |
| 5 | `tests/akceptacja/ekrany/*.test.tsx` (8 plików, 80 testów) | BR-ZAK-001–004, BR-ONB-001/002/004, BR-LIM-001–004, BR-DANE-001–003, BR-POM-001/002, BR-OPIN-002/003, NFR-DOST-001/002, NFR-PRYW-001 | komponenty z kontraktem propsów: `apps/mobile/src/features/{zakup,powitanie,ocena-poziomu,ustawienia,ocena,start,dane,opinie}/` (wygląd i teksty — system roli 04) |
| 6 | `apps/mobile/e2e/oczekujace/05–09-*.yaml` | PR-01, PR-03, PR-05, R-07, R-35, R-36, R-40, R-42, R-45, R-52, R-57 | przenieść do `apps/mobile/e2e/` (bramka `e2e-ios.yml`) w commicie, który je zazielenia; limit `e2e-ios.yml` = 20 + 3 × liczba flowów + 10 (test `tests/narzedzia/e2e-flowy.test.mjs`) |

## Definicja ukończenia roli 07 (build) — sprawdzenie punkt po punkcie

| Punkt | Dowód | Stan |
|---|---|---|
| Każde ryzyko ma skutek, prawdopodobieństwo, wyrocznię, poziom testu i miejsce | `strategia.md` §2: 61 ryzyk, 10 kolumn; skrypt kontroli 2026-11-07: 1 wiersz bez miejsca (R-61) — uzupełniony | spełniony |
| Każde kryterium z kontraktu zakresu ma test z ID albo powód; każdy test ładuje się i pada na asercji albo znaczniku | `pnpm test:akceptacja` 2026-11-07: 375 testów, 346 czerwonych (znacznik albo asercja), 29 strażników; 0 błędów importu, składni, typu (`tsc -p tests/akceptacja` czysty); 48 ID BR/NFR z `scope-contract.md` → §9 część 13 | spełniony po części 13 (D-197; w raporcie STOP E3 błędnie zgłoszony wcześniej) |
| Macierz możliwości z dowodem; nic z „niedostępne” nie opisane jako sprawdzone | §1 + `00-rozpoznanie.md` §1; aktualizacja 2026-11-07 (Maestro na runnerze, artefakty niedostępne) | spełniony |
| Każde narzędzie i próg to decyzja z ≥ 2 opcjami | D-171 (runnery, fast-check 100/1000, bez progu pokrycia), D-172 (Stryker), D-173 (rachunki), D-175, D-177, D-178, D-190, D-193 | spełniony |
| Plan CI: widoczność, runnery, minuty z cennikiem i datą, limity zależne od danych, nowa kontrola najpierw informacyjna | §5 (repo publiczne, 0 USD, cennik z odczytem w E2); limit E2E liczony z liczby flowów (test), bramka TestFlight z relacją do limitu E2E (test); `rachunki` informacyjne do pierwszego zielonego przebiegu (D-173), `akceptacja` informacyjna na stałe (D-175) | spełniony |
| Każda pozycja listy kontroli roli 05 ma miejsce | §8.1: K-01–K-15 | spełniony |
| Dane testowe z wycinków prawdziwych plików z opisem pochodzenia, bez danych osobowych | §4; `tests/dane/` (wzorzec bazy v1, manifesty K-08), plik eksportu z TestFlight — krok właściciela przy wydaniu (P-3), skrypt `sprawdz-eksport.mjs` | spełniony (eksport z telefonu czeka na pierwsze wydanie) |
| Lista stref zdefiniowana raz, przejścia wyliczane | `tests/narzedzia/strefy.ts` (9 stref, D-177), `czas.ts` (`przejsciaCzasu`) | spełniony |

## Zgłoszenia

**Do roli 05 (architektura)** — luki z `strategia.md` §9 części 2–8 i 13; najważniejsze:
- sygnatury zaproponowane przez 07 do potwierdzenia: `kurs.ts`, `scenariusz.ts`, `wyjasnienie.ts`, typy maszyn (`maszyny.ts`, pary nierozstrzygnięte), kontrakty propsów ekranów;
- scenariusz: `dalej` z treści pozwala na skoki, a `aktywnosc.krok` / `akcjeZOcena[krok]` zakładają liniowość;
- lekcja: ukończenie przez przejście maszyny `aktywnosc`, `poKrokuLekcji` tylko jako rzut na postęp; `zaliczoneOcena` jako pochodna `punkt_startu`;
- prośba o ocenę: czas ostatniej prośby wobec „licznika próśb” w `ustawienie.opinie`;
- format liczb według języka (`formatProcent`, `formatNumber` w content-build bez języka; z 09);
- ekran przypomnień bez kontraktu (BR-POW-003-b);
- ścieżki utraty danych: JAK-E1-01 (ADR 0007 pkt 1) i luki K-10–K-14 z §9 części 2–3.

**Do roli 06 (treść)**:
- KURS-005-a: przy wyniku z reguły 2 i 4 słowo „przybliżenie” (dziś „Ok. … / Dokładnie …”: `m2-l1-outy.md`, `m7-l3-implied-odds.md`, `exams/m2.yaml`, 7 miejsc);
- CWI-005-b: `exams/m11.yaml` — zdanie o ograniczeniu modelu ICM (umiejętności, pozycja) przy equity;
- KURS-003-b: lekcja definiująca każdy termin w `terms.yaml` (162 terminy);
- lista zakazanych sformułowań NFR-ZGOD-002 (`teksty.ts`, [DO USTALENIA]);
- treść scenariuszy (PR-05) w kształcie potwierdzonym przez 05.

**Do roli 01 (wymagania)**: BR-POW-001 „pojawia się wcześniej” (oba zadania mogą wrócić tego samego dnia — odczyt D-197); BR-ONB-003 — czy niezaliczony test zdejmuje zaliczenie oceną; BR-ONB-001 „Przerwana ocena” wobec tabeli `wznow` (część 5).

**Do ról 04 i 03**: kryteria bez stanu ekranu: ekran przypomnień (BR-POW-003-b), lista scenariuszy (BR-SCN-002-b, dziś tylko flow 07); ocena odpowiedzi liczbowej między tolerancją OK i BLISKO (B-017; z 06).

**Do właściciela (kroki, bez decyzji teorii)**: scalenie zmian workflowów z `main` (osobna zgoda); plik eksportu z telefonu przy pierwszym wydaniu (P-3); lista „tylko telefon” (§8) przy wydaniu TestFlight.
