# Rola 07 Jakość, build, E0: rozpoznanie (2026-11-04)
Prompt: `assemble.mjs 07-jakosc --tryb build` (repo `prompts`, moduły: e2e-mobilne, geo-slady, wlasnosci-i-domena, wydanie; 65 938 znaków), przeczytany w całości. Baza: `f67c9de` na `claude/sleepy-brahmagupta-2065nu`. Strategia trafi do `docs/jakosc/strategia.md` (CLAUDE.md nie wskazuje innego miejsca); ten plik to raport bramki E0.

## 1. Macierz możliwości środowiska (kontener Linux w chmurze, `CLAUDE_CODE_REMOTE`)
| Metoda | Dostępna | Dowód (komenda → wynik, 2026-11-04) |
|---|---|---|
| Node, pnpm, git | tak | `node -v` → v22.23.4; `pnpm -v` → 10.28.0; `uname -a` → Linux x86_64 |
| Instalacja zależności z lockfile | tak | `pnpm install --frozen-lockfile` → kod 0, 8,6 s |
| Runner testów pakietów (Vitest) | tak | vitest 5.0.3; `pnpm run ci` kod 0 (sekcja 3) |
| Jest + React Native Testing Library (ekrany, bez układu) | tak | jest 29.7.0, `@testing-library/react-native` 14.0.1; 18 zestawów, 147 testów zielone |
| `node --test` (skrypty) | tak | `pnpm test:skrypty` → pass 16, fail 0 |
| fast-check (własności) | tak | fast-check 4.10.2 w `poker-core` i `srs` |
| `node:sqlite` (port bazy w Node, K-02, K-04, K-10–K-12, K-15) | tak | `DatabaseSync(':memory:')` → SQLite 3.53.4 (ostrzeżenie „experimental”) |
| Stryker (mutacje) | niedostępne | brak w `node_modules`; instalacja z npm i uruchomienie pobranego kodu blokuje polityka środowiska (przekazanie sesji) — nie próbowano; zastępczo ręczna próba mutacji w scratchpadzie (decyzja E2) |
| ESLint / `expo lint` | niedostępne | brak `eslint` w `node_modules/.bin`; `expo lint` doinstalowałby pakiety z npm — nie uruchomiono; lint nie jest częścią `pnpm run ci` |
| Maestro, Detox, `xcodebuild`, symulator iOS | niedostępne | `command -v maestro detox xcodebuild` → brak (Linux); iOS tylko na runnerze `macos-26` w CI albo u właściciela |
| Emulator Androida | niedostępne | `emulator`, `adb` → brak; Android poza zakresem sklepu (CLAUDE.md: Google Play nic) |
| Przeglądarka (Playwright/Chromium) | tak | `require('playwright')` → ok; do zrzutów makiet, nie do testów aplikacji RN |
| GitHub: odczyt przebiegów CI, logów | tak | MCP `actions_list`, `get_job_logs` (sekcja 2) |
| GitHub: push na gałąź roboczą | tak | `list_repos` → `can_push: true` |
| Sieć (strony dokumentacji) | tak | `curl docs.github.com/…/github-actions` → 200 |
| Widoczność repo | publiczne | `list_repos` → `"visibility":"public"` |
| Telefon (TestFlight) | tylko właściciel | lista „tylko telefon” (E2) |

Koszt CI (odczyt 2026-11-04, docs.github.com/en/billing/concepts/product-billing/github-actions, surowy tekst przez `curl`): „The following usage remains free independently and does not reduce the included compute usage: Standard GitHub-hosted runners in public repositories.” oraz „Larger runners are billed for public repositories.” Wniosek: `ubuntu-latest` i standardowy `macos-26` w tym repo 0 USD; większe runnery nie. Brzmienie strony zmieniło się względem cytatu we wzorcach roli (odczyt 18.10.2026); sens ten sam — uwaga do biblioteki `prompts`.

## 2. Stan CI na `main` (zasada wspólna 21) — znalezisko JAK-E0-01
- CI (`ci.yml`, Linux): ostatni przebieg 42 na `23950a4` — sukces (2026-10-09).
- E2E (`e2e.yml`, Maestro, `macos-26`): **czerwony od przebiegu 5 (2026-10-07, `e3d0f15`) do 18 (2026-10-20)**, nie tylko 13–18, jak podawały przekazania; ostatni zielony: przebieg 4 (2026-10-06, `7fe86f0`).
- Przyczyna (przebieg 18, zadanie 118442040590, krok „Flowy Maestro”): `[Failed] Słowniczek (47s) (Assertion is false: "bańka.*" is visible)`; pozostałe trzy flowy zielone (Powtórki, Pomoc, Lekcja i pierwsze zadanie). Build 13 min 41 s, flowy 8 min 30 s.
- Klasyfikacja (polityka niestabilnych testów, pkt 5): **nieaktualny scenariusz**, nie błąd aplikacji ani maszyny. Dowód: commit `acb9f0f` (2026-10-06, „Słowniczek: wdrożenie nazw używanych przez polskich graczy”) zmienił termin na `bubble` (`content/terms.yaml:932–933`: `pl: bubble`), a `apps/mobile/e2e/03-slowniczek.yaml:17` nadal ma `assertVisible: 'bańka.*'`. Czerwień przez 2 tygodnie bez reakcji — ten sam wzór co w Oczku (zasada wspólna 21).
- Skutek: realny dla procesu (E2E nie chroni wydania od 7.10), S3 dla użytkownika (aplikacja działa). Naprawa: w E3 razem z nowym planem E2E (flow słowniczka pobiera nazwę terminu z treści, nie z tekstu wpisanego w YAML). Zmiana `.github/workflows/` to ścieżka wrażliwa (D-043): przegląd w świeżym kontekście, scala właściciel.

## 3. Stan wyjściowy kodu (`pnpm run ci` na `f67c9de`, kod 0, 1 min 31 s)
| Część | Wynik |
|---|---|
| typecheck (wszystkie pakiety) | kod 0 |
| `packages/srs` | 21/21 |
| `packages/jezyki` | 136/136 |
| `packages/poker-core` | 65/65 |
| `tools/content-build` | 107/107 |
| `tools/preflop-solver` | 43/43 |
| `apps/mobile` (Jest) | 147/147 w 18 zestawach |
| `test:skrypty` (`node --test`) | 16/16 |
| `pnpm i18n` | 0 błędów, 0 uwag (309 kluczy) |
| `content:check` | treść aktualna (44 lekcje, 141 reguł, 162 terminy) |
| `tresci:rejestr` | 0 błędów, 0 uwag |
Razem 535 testów. Pakietów `domena` i `postep` z ADR 0003/0010 jeszcze nie ma; testy `apps/mobile/src/data/user/`, `features/play/`, `observability/` dotyczą kodu do usunięcia (ADR 0004, 0009, 0011) — rola 08 usuwa je razem z kodem. Log: scratchpad sesji (`ci-baseline.log`), nie w repo.

## 4. Wejście: przepływy, kryteria, kontrole
| Wejście | Liczba | Źródło |
|---|---|---|
| Przepływy | 9 (PR-01–PR-09) | `docs/brd/wymagania.md` |
| BR w zakresie (MVP, wariant 1) | 43 | `docs/scope-contract.md` (D-102, D-112) |
| Scenariusze akceptacji (Gherkin) | 92 (41 nauka, 51 sklep i dane) | `docs/brd/wymagania-nauka.md`, `wymagania-sklep.md` |
| Wymagania niefunkcjonalne | 13 | `docs/brd/wymagania.md` „Wymagania niefunkcjonalne” |
| Wektory reguł RD-01–RD-12 | 80 | `tests/wektory/brd.json` |
| Rachunki niezależne (wyrocznie liczb) | 3 skrypty, 167 sprawdzeń | `docs/tresci/narzedzia/rachunki/` |
| Kontrole automatyczne roli 05 | K-01–K-15 | `docs/architektura/kontrole-07.md` |
| Scenariusze na urządzeniu | U-1–U-9 (05) + T-01–T-10 (03) | `kontrole-07.md`, `scope-contract.md` |
| Ścieżki utraty danych | 17 | `docs/architektura/dane.md` |
| Stany błędów (warunki testów) | 9 | `docs/tresci/stany-bledow-fakty.md` |
| Blokery wydania | 13 wierszy | `docs/brd/README.md` „Blokery wydania” |

Mapa przepływ → BR: PR-01 (BR-ONB-001–004), PR-02 (BR-KURS-001–005), PR-03 (BR-CWI-001–007, BR-LIM-001–003, BR-LIM-005), PR-04 (BR-POW-001–003, BR-LIM-004), PR-05 (BR-SCN-001–004), PR-06 (BR-ZAK-001–004), PR-07 (BR-DANE-001–004), PR-08 (BR-POM-001–002), PR-09 (BR-OPIN-001–003); przekrojowe: BR-JEZ-001–002 i NFR.

## 5. Luki w wejściach
| ID | Luka | Do roli | Propozycja |
|---|---|---|---|
| L-01 | BR-POM-001/002 nadal wymagają numerów według regionu (RD-12-W1–W6: 1-800-MY-RESET, GB, „numer alarmowy kraju”), a D-158 (właściciel) zastąpił to jednym zdaniem i jednym linkiem; D-158 wymaga `fix` roli 01, którego nie wykonano. To samo w `docs/brd/README.md` „Blokery wydania” (OP-10), w kontrakcie zakresu (F-15 „numer dla kraju jednym dotknięciem”, T-07) i w 6 wektorach RD-12 w `tests/wektory/brd.json` | 01 (ER), 03 (bramka zmian) | brzmienie kryterium: „Gdy użytkownik otworzy »Pomoc« (z ustawień albo z lekcji M12), także bez sieci, Wtedy widzi zdanie `fallback.text` z `content/helplines.yaml` w języku aplikacji i jeden link do pomocy międzynarodowej online (H-INT-1), bez numerów krajowych; link otwiera przeglądarkę systemową”. Do czasu poprawki testy BR-POM piszę według D-158 (decyzja właściciela wyżej w hierarchii niż BRD) z odwołaniem do L-01 |
| L-02 | BR-CWI-004 „Obsługa jedną ręką” i kryteria „intuicyjności” — bez sprawdzalnego wyniku w automacie | 04 (test pierwszego użycia), lista „tylko telefon” | test układu nie działa w Jest (render bez układu); pozycja listy telefonu + przejście poznawcze roli 04 |
| L-03 | NFR-WYD-001 próg `[DO USTALENIA]` (OP-21) | właściciel / 05 | pomiar U-7 na telefonie; do tego czasu bez testu progu |
| L-04 | Reguła wyniku oceny poziomu F-01 (BR-ONB-002) otwarta (03/04/08, `docs/tresci/ocena-poziomu-pytania.md`) | 03 | test sprawdza zachowanie względem parametru z `konfiguracja.ts` (wynik → wskazana lekcja), nie konkretną regułę |
| L-05 | Parametry `[DO USTALENIA]` w `moduly.md` „Konfiguracja”: `SESJA_LICZBA_ZADAN`, `PRZYPOMNIENIE_DOMYSLNA_PORA`, `DZIENNIK_MAKS_WPISOW` | 08 / 04 | testy importują parametr, nie liczbę (zasada roli 2) |
| L-06 | Etykieta niedokładności 0 < f < 3,5% (D-143) jeszcze nie w kodzie (`thresholds.ts`, `grading.ts`) | 08 | test akceptacyjny BR-CWI-001 z wektorami RD-11 będzie czerwony do zmiany 08 (właściwy powód) |
| L-07 | SDK: `package.json` 57, ADR 0001 zakłada 58; `e2e.yml` sprawdza Xcode dla SDK 57 | 08 / 05 | kontrakt runner ↔ narzędzia (D-050) w planie CI; wersja z ADR po podniesieniu SDK |

## 6. Założenia z wejścia, na których opieram plan (wejście to hipoteza)
| Założenie | Źródło | Status dla 07 | Kontrola w planie |
|---|---|---|---|
| Kolejka zapisów i transakcje zachowują się w `expo-sqlite` tak jak w `node:sqlite` | ADR 0003, eksperymenty `e1-sqlite.mjs` (tylko Node) | hipoteza (na telefonie niesprawdzone) | test adaptera w buildzie deweloperskim / E2E + U-1 |
| `Intl.PluralRules` w Hermes wymaga polyfillu (ZAL-L01) | rola 09 | hipoteza | samosprawdzenie przy starcie + krok telefonu |
| Najstarszy system iOS 16.4 (D-128) | ADR 0001 | potwierdzone odczytem podspec (05) | E2E na symulatorze domyślnym; najstarszy telefon niezmierzony (wyjątek D-128) |
| Granica dnia limitu = dzień kalendarzowy strefy telefonu (BR-LIM-005) | BRD, ADR 0007 | decyzja | lista stref testowych + przejścia czasu wyliczane (E2) |
| Wektory RD-01–RD-12 są wyrocznią niezależną od kodu | rola 01/06 | potwierdzone (pochodzenie: rachunek/źródło przy każdym wektorze) | testy wektorowe; RD-12 do zmiany (L-01) |
Żadne nie jest podważone na tym etapie; wpisy do `docs/zalozenia.md` dopiszę, jeśli E1 coś podważy.

## 7. Stosowalność modułów
| Moduł | Dotyczy | Powód |
|---|---|---|
| `e2e-mobilne` | tak | główny przepływ zależy od ekranu i nawigacji; Maestro już jest (4 flowy), runner `macos-26` darmowy w repo publicznym |
| `wlasnosci-i-domena` | tak | aplikacja liczy (szanse, pot odds, MDF, SPR, ICM, ocena częstości solvera) i decyduje (limit dnia, dostęp, maszyny stanów, harmonogram FSRS) |
| `geo-slady` | nie | brak lokalizacji i wyzwalania po miejscu (uprawnienia: tylko powiadomienia, kontrakt zakresu dla 05) |
| `wydanie` | tak | wydania TestFlight; w build wpis planu wydania do strategii (jeden SHA, aktualizacja z poprzedniej wersji, lista „tylko telefon”) |
Logika kalendarzowa jest (limit dnia, powtórki): lista stref testowych i `przejsciaCzasu` wchodzą do E2/E3.

## 8. Plan i czas
| Etap | Co | Czas agenta | Oczekiwanie | Czas właściciela |
|---|---|---|---|---|
| E1 | rejestr ryzyk (9 przepływów + aktualizacja + dane + prywatność + treść krytyczna) z wyroczniami; pytania produktowe | 2–3 h | — | decyzje na bramce (~10 min) |
| E2 | plan: poziomy, narzędzia i progi jako decyzje, dane testowe, CI z kosztem, definicja ukończenia, lista „tylko telefon”, K-01–K-15 → miejsca | 2–3 h | — | ~10 min |
| E3 | testy akceptacyjne (92 scenariusze + 13 NFR, pierwszeństwo domena i dane) wobec zaślepek z sygnaturami ADR, narzędzia (strefy, port `node:sqlite`), naprawa flowu słowniczka, szkic workflowu na gałęzi | 6–10 h (kilka sesji) | jeden przebieg E2E na gałęzi (ok. 25 min `macos-26`, 0 USD), przegląd D-043 workflowu | ~15 min |
| E4 | strategia kompletna, definicja ukończenia z dowodami, tabela dla 08 | 1 h | — | akceptacja |
Ciężkie przebiegi pojedynczo (zasada roli 6).
