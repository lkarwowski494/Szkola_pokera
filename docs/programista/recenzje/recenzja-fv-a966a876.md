# Recenzja niezależna (FX): Programista — Szkoła Pokera — 2026-11-13
Commit: a966a876 (diff `a79ad506..a966a876`, 11 commitów FV, gałąź `sesja-fv-poprawki`) · Tryb: audit (recenzja niezależna, polecenie FX koordynatora @ bcc4416b) · Środowisko: Linux 6.18 x86_64, Node v22.23.4, pnpm 10.28.0, git; `pnpm install --frozen-lockfile` kod 0; pełne `pnpm run ci` działa; brak macOS/Xcode (E2E i telefon nie sprawdzone); GitHub przez MCP, push tylko na `sesja-fx-recenzja`.

Dokument nie jest raportem `audit/` (polecenie FX wskazuje tę ścieżkę i pozwala ją commitować). ID znalezisk od 08-programista-301 (D-1505), bo 001–009, 103–105 i 201–205 są zajęte przez wcześniejsze recenzje. Raport autora (`docs/decyzje/FV.md`, sekcja FV w `docs/programista/plan-08.md`) przeczytany dopiero po werdykcie wstępnym.

## Podsumowanie
Diff robi to, co deklaruje: bramka ręki mieszanej (201, opcja b), dziennik przez `formatujLiczbe` (204), test wpięcia 06-tresci-008 (203), `marginMax` w river-value (08-FQ-2), klucze ceny ⅔ puli jako formuła z `refs` (D-1461), lista `LICZBY_ZAREZERWOWANE` (D-1490), trwała kontrola zdań FS-001/005 i FW-01/02 są w kodzie i mają testy. Bazowe `pnpm run ci` na a966a876 kończy się kodem 0 (`dowody/fx-ci-baseline-a966a876.txt`). Przegląd D-043 objął wszystkie 35 baz treści (autor porównał tylko pl): żaden identyfikator nie zniknął, w każdej bazie doszły tylko 3 liczby, zmieniły się wyłącznie `meta.wersja` i `meta.hash` (`dowody/fx-d043-35-baz.txt`). Z 12 mutantów 6 zabitych, 6 przeżyło: wszystkie ocalałe to luki w testach regresji, a nie błędy obecnego zachowania (`dowody/fx-mutanty-a966a876.txt`). Brak blokerów KRYT/WYS.

**Werdykt: PRZYJĄĆ Z UWAGAMI** (D-1506). Blokery KRYT/WYS: 0. Warunek: 08-programista-301 naprawione przed wejściem do `content/` szablonów river-value (SC-22/25/28/29) albo przed dodaniem im poziomów Ś/T.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-301 | P2 (ŚREDNIE, warunkowo WYS) | D | Kontrola prawdziwości zdań FS sprawdza tylko poziom łatwy i tylko szkice w `docs/`, nie treść, która trafi do aplikacji | otwarte |
| 08-programista-302 | P2 (NISKIE) | D | Test regresji 204 obejmuje tylko `play.log.raise`; cofnięcie poprawki dla call i all-in przechodzi testy | otwarte |
| 08-programista-303 | P2 (NISKIE) | D | `LICZBY_ZAREZERWOWANE`: gałąź „jest już używana” bez testu i brak wygaśnięcia, gdy klucz nigdy nie wejdzie do treści | otwarte |
| 08-programista-304 | P2 (NISKIE) | D | `marginMax` w river-value: ścieżka `margins[i].max` i granica `|w − 0,5| = marginMax` bez testu | otwarte |

## Linia bazowa i założenia
Linia bazowa z kodu przed lekturą uzasadnień: diff źródeł, testy, mutanty, porównanie baz, na końcu decyzje autora.

Wymiary pokrycia:
- **Ścieżki zapisu:** diff nie dotyka `packages/postep/`, `apps/mobile/src/data/` (poza wygenerowanym `tresc.generated.ts`), schematu ani eksportu. Jedyny styk z danymi użytkownika to identyfikatory treści w powtórkach: wszystkie zachowane (D-043 niżej).
- **Obsługa błędów:** `marginMax ≤ δ` daje `TemplateError` z nazwą szablonu (`packages/poker-core/src/scenario-gen.ts:857`, mutant M7 zabity); brak kwoty w dzienniku zostaje brakiem (fraza akcji) zamiast „0 bb” (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:164`), ale bez testu (302).
- **Typy na granicach:** nowy kod nie czyta danych z zewnątrz poza YAML w teście; `correct: string | string[]` tylko w `list-hand` (`packages/content-schema/src/index.ts:661`), więc bramka 201 w tej jednej gałęzi pokrywa całe zjawisko.
- **System projektowy:** wpis rywala river-value używa istniejącego klucza `play.log.check` (bez nowego tekstu); FW-01 bez renderu (KO-097).
- **i18n:** liczby w dzienniku przez `formatujLiczbe(…, jezykZadan())`; nowe liczby mają `display` według języka (pl „0,67”, de „29 %”, ja „29%”).
- **Wydajność:** nowe testy generatora 120–300 ziaren; w CI mieszczą się w czasie (pełne CI 9 min 17 s).
- **Testy na właściwym poziomie:** logika w Node (poker-core, content-build); wyrocznia FS liczy W/L/T własnymi kombinacjami, niezależnie od `classComboSplit` (dobre).
- **Dostępność:** brak zmian w komponentach.
- **Liczby konfiguracyjne:** nowe liczby treści w `content/numbers.yaml` jako formuły z `refs`; `0.666667` to parametr definicyjny (jak `ex.frac.three-quarters: 0.75`), rachunek 66,6667 / (100 + 2·66,6667) = 0,2857143 ≈ 2/7 sprawdzony niezależnie.

Soczewki: użytkownik z przerwanym zapisem (nie dotyczy, diff bez zapisu), recenzent szukający ścieżki bez testu (mutanty, 302–304), programista czytający moduł pierwszy raz (komentarze z ID decyzji są przy każdej zmianie), VoiceOver (brak zmian w etykietach).

Wzorzec najlepszych: każda naprawa błędu ma test, który pada po jej cofnięciu (mutant), a trwała kontrola sprawdza to, co trafia do użytkownika, nie kopię roboczą. Rozbieżności: 301 (kontrola na kopii roboczej) i 302–304 (mutanty przeżywają). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `tools/content-build/src/scenariusze.ts` (bramka 201) | tak | odczyt diffu, mutant M1 (`dowody/fx-mutanty-a966a876.txt`) |
| `tools/content-build/src/build.ts` (`LICZBY_ZAREZERWOWANE`) | tak | odczyt, mutanty M2, M3 |
| `packages/poker-core/src/scenario-gen.ts` (08-FQ-2) | tak | odczyt, porównanie z `inMargin` (linia 548), mutanty M4–M7 |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx`, `wariant.ts` (204, FW-01/02) | tak | odczyt, `kwotaAkcji` (ścieżki call z ułamkiem), mutanty M8–M12 |
| `content/numbers.yaml`, bazy treści (35) | tak | `dowody/fx-d043-35-baz.txt` |
| Testy diffu (8 plików) | tak | odczyt; brak `.skip`, `.only`, usuniętych linii w plikach testów (grep, kod 1 = brak trafień) |
| Rejestr 06 (`docs/tresci/rejestr*`) | częściowo | bramka `tresci:rejestr` w CI kod 0; brzmienie wpisów należy do 06 |
| Ekran na telefonie, VoiceOver | nie | brak macOS/urządzenia; diff bez zmian wyglądu poza wpisem dziennika |
| Pełne CI na a966a876 | tak | `dowody/fx-ci-baseline-a966a876.txt` (kod 0, mobile 1395 testów) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-fv-a966a876.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0 (skrypt w scratchpadzie, poza repo). `git diff --cached` przejrzany przed commitem: tylko raport, dowody i `docs/decyzje/FX.md`.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | ok: każda zmiana logiki ma test (bramka, marginMax, zakres, dziennik); luki mutantów w 302–304 |
| DEV-02 | dotyczy | 7/7 commitów zmieniających zachowanie ma test w tym samym commicie (e679dbb7, 500b20c5, eb90b221, 8638d10f, 955dcdae, 2fc01437, bee175e6); 8cd2b4da to sam test; c1e332cb, 73d69a50, a966a876 bez zmian zachowania |
| DEV-03 | dotyczy | ok: 0 trafień `.skip`/`.only`/`expect(true)`, 0 usuniętych linii w plikach testów |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/fx-ci-baseline-a966a876.txt`) |
| DEV-05 | nie dotyczy | diff bez zapisu do bazy użytkownika |
| DEV-06 | nie dotyczy | diff bez migracji i kopii |
| DEV-07 | dotyczy | ok: `bb ?? 0` usunięte, brak zostaje brakiem; bez testu → 302 |
| DEV-08 | nie dotyczy | diff bez dat |
| DEV-09 | dotyczy | ok w kodzie produkcyjnym; `as unknown as` tylko w testach |
| DEV-10 | dotyczy | ok: `TemplateError` z nazwą szablonu |
| DEV-11 | dotyczy | ok: istniejący klucz i komponenty |
| DEV-12 | dotyczy | ok: liczby przez `formatujLiczbe`; zdanie FW-01 odłożone decyzją KO-097 |
| DEV-13 | dotyczy | ok: liczby treści w `numbers.yaml`; lista wyjątków nazwana (D-1490) → 303 |
| DEV-14 | dotyczy | ok: diff bez plików kluczy; skrypt kontroli raportu bez trafień sekretów |
| DEV-15 | nie dotyczy | brak nasłuchów i timerów w diffie |
| DEV-16 | dotyczy | ok: kwoty w bb przez jeden formatator; marginMax i δ w tej samej jednostce (ułamek) |

## Znaleziska (szczegóły)

### 08-programista-301 · Kontrola zdań FS nie obejmie treści, która trafi do aplikacji (tylko poziom łatwy, tylko szkice w docs)
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚREDNIE; WYS, jeśli szablon river-value wejdzie do `content/` albo dostanie poziom Ś/T bez poprawki)
- Realność: realny (Ś/T to cel 08-FQ-2, przeniesienie szkiców do `content/` jest zaplanowane) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/fv-fs-trwale-kontrole.test.ts:62` „const v = generateVariant(g, 'latwy', seed);” oraz `tools/content-build/test/fv-fs-trwale-kontrole.test.ts:12` „const AKT = join(root, 'docs', 'tresci', 'szablony-robocze', 'fq');”. Budowanie treści (`tools/content-build/src/scenariusze.ts`) nie ma odpowiednika tej kontroli dla `content/` (grep `i tak przegrałyby|value.threshold` w `tools/content-build/src` → 0 trafień).
- Mechanizm: kontrola trwała czyta stałą ścieżkę kopii roboczej i stały poziom; `grep -n "'latwy'" tools/content-build/test/fv-fs-trwale-kontrole.test.ts` → 1 trafienie (linia 62). Szkice mają dziś tylko `latwy`, więc obecny wynik jest prawdziwy.
- Powraca: nie (nowa kontrola z FV)
- Wzorzec lub źródło: zasada „bramki mechaniczne” (D-050): kontrola ma sprawdzać to, co trafia do użytkownika
- Kroki w aplikacji: dziś brak (river-value nie ma w `content/`). Po dodaniu poziomu `sredni` z `marginMax` albo po skopiowaniu SC-22 do `content/pl/scenarios/` i edycji zdania tam test zostaje zielony, a ekran może pokazać zdanie fałszywe w części wariantów (06-tresci-001/002).
- Opcje: (a) iterować po `Object.keys(y.bounds)` i dodatkowo po szablonach river-value w `content/*/scenarios` — mały diff, pełne pokrycie; (b) przenieść kontrolę do `compileContent` jako błąd budowy — mocniejsze, ale dłuższe budowanie (300 ziaren na szablon i poziom). Rekomendacja: (a) teraz, (b) przy wejściu SC-22 do `content/`.
- Test akceptacyjny: kopia SC-22 z poziomem `sredni` (`marginMax` 0,2, zdanie „gorszych jest więcej niż lepszych” przy `expected: check`) daje czerwony test; szablon river-value w `content/` jest objęty tym samym testem.
- Status: otwarte

### 08-programista-302 · Test regresji 204 nie broni poprawki dla call i all-in
- Pozycja listy kontrolnej: DEV-02
- Poziom: P2 (NISKIE)
- Realność: realny (ścieżka call z ułamkiem istnieje: range-spot „call” = stos − blind, np. 99,5 bb z SB; `apps/mobile/src/features/scenariusz/wariant.ts:126`) · Pewność: wysoka
- Rodzaj: D
- Dowód: mutanty M9 (call bez `formatujLiczbe`), M10 (all-in bez `formatujLiczbe`), M11 (powrót `bb ?? 0` w call) przeżywają cały katalog `src/features/scenariusz` (358 testów zielonych), `dowody/fx-mutanty-a966a876.txt`. Test 204 sprawdza tylko raise (`apps/mobile/src/features/scenariusz/__tests__/fm-turn-bet-ekran.test.tsx:91`).
- Mechanizm: trzy gałęzie `reakcjaGracza` (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:164`–166) poprawione razem, test na jedną.
- Powraca: tak, 08-programista-204 (recenzja FU) → trwała kontrola: test dziennika dla call z ułamkiem i call z `bb = null`
- Wzorzec lub źródło: zasada programisty 2 (czerwony test dla każdej naprawy)
- Kroki w aplikacji: po regresji dziennik range-spotu SB pokazałby „SB sprawdza 99.5 bb” w pl zamiast „99,5”.
- Opcje: (a) dopisać dwa przypadki (call 99,5 z SB; call z `bb = null` → fraza akcji) — minimalny diff; (b) test parametryczny po wszystkich akcjach z kwotą — szerszy, więcej utrzymania. Rekomendacja: (a).
- Test akceptacyjny: M9, M10 i M11 dają czerwony test.
- Status: otwarte

### 08-programista-303 · LICZBY_ZAREZERWOWANE: ostrzeżenie „jest już używana” bez testu i brak wygaśnięcia
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (NISKIE)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant M2 (usunięcie linii `tools/content-build/src/build.ts:490`) przeżywa testy D-1461 i 203 (`dowody/fx-mutanty-a966a876.txt`). Decyzja D-1490 w `docs/decyzje/FV.md` twierdzi "lista wygasa sama", ale gdy SC-13 wejdzie z innym kluczem albo nie wejdzie wcale, wpisy zostają bez żadnego sygnału.
- Mechanizm: wyjątek od kontroli bez daty ani warunku sprawdzanego mechanicznie; jedyna lista tego typu (`grep -n "ZAREZERWOWANE" -r tools/content-build/src` → 3 trafienia: definicja, odczyt i tekst ostrzeżenia).
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 7 (wyjątek nazwany, ryzykowną kontrolę zastąp tańszą); analogia `docs/decyzje/FR.md` D-1452 (wartość zastępcza z warunkiem wygaśnięcia)
- Kroki w aplikacji: brak skutku dla użytkownika (nieużywana liczba w bazie jest martwa); ryzyko tylko dla higieny bramki.
- Opcje: (a) test: kopia treści z użyciem `{{n:eq.bet-two-thirds}}` daje ostrzeżenie „jest już używana” — zabija M2; (b) dodatkowo pole „wygasa po” (ID zadania lub data) sprawdzane testem. Rekomendacja: (a); (b) dopiero, gdy lista urośnie ponad 3 wpisy.
- Test akceptacyjny: M2 daje czerwony test.
- Status: otwarte
- Odpowiedź na pytanie polecenia FX („czy nie maskuje błędu po wejściu SC-13”): nie maskuje dziś: po użyciu klucza w pl test `fv-d1461` jest czerwony (M3 pokazuje, że kontrola nieużywanych liczb działa poza listą). Maskowanie możliwe tylko po cichym usunięciu gałęzi ostrzeżenia (M2), stąd 303.

### 08-programista-304 · marginMax w river-value: ścieżka margins[i].max i granica bez testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NISKIE)
- Realność: teoretyczny dziś (żaden szablon river-value nie ma `margins`; szkice mają tylko `latwy` bez `marginMax`), brzegowy po FQ-2 · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant M5 (`>=` → `>` w `packages/poker-core/src/scenario-gen.ts:869`) i M6 (`b.margins?.[i]?.max` pominięte w linii 856) przeżywają (`dowody/fx-mutanty-a966a876.txt`; M6: cały pakiet poker-core, 310 testów). Dodatkowo semantyka różni się od `inMargin` (linia 548): tam `margins[i]` z `max: null` znaczy „bez granicy”, a w river-value `null ?? b.marginMax` spada na globalny `marginMax`.
- Mechanizm: dwie definicje „margines na punkt zastępuje globalny” (`grep -n "margins?.\[i\]" packages/poker-core/src/scenario-gen.ts` → 548, 795, 853, 856; 795 i 853 to dolna granica δ innych punktów i river-value).
- Powraca: nie
- Wzorzec lub źródło: komentarz schematu `packages/content-schema/src/index.ts:535` „zastępuje marginMin/marginMax”
- Kroki w aplikacji: brak dziś; po dodaniu `margins` do szablonu river-value poziom mógłby dostać inny przedział niż draw-call przy tym samym zapisie.
- Opcje: (a) wspólna funkcja odczytu marginesu punktu (jak `inMargin`) i test z `margins` — usuwa rozjazd; (b) tylko test granicy i `margins` bez zmiany kodu — tańsze, rozjazd zostaje opisany. Rekomendacja: (a).
- Test akceptacyjny: M5 i M6 dają czerwony test; `margins: [{min: 0.05, max: null}]` przy globalnym `marginMax` zachowuje się jak w `inMargin`.
- Status: otwarte

## Do sprawdzenia
- `zakresSprawdzenia` (`apps/mobile/src/features/scenariusz/wariant.ts:395`) nie ma dziś wywołania w kodzie produkcyjnym (1 trafienie grep = definicja); świadomie odłożone (KO-097). Nie zgłaszam jako kodu na zapas, bo ma decyzję i test; do sprawdzenia przy podpięciu zdania FW-01.
- Kontrola FS i `LICZBY_ZAREZERWOWANE` są wymuszane testami kompilującymi tylko `pl` (`tools/content-build/test/kit.ts:7`); jeśli SC-13 wejdzie najpierw w innym języku, ostrzeżenie nie zadziała. Pewność, że kolejność wejścia będzie inna niż pl-first, niska.
- Telefon i VoiceOver: wpis rywala river-value nie sprawdzony na urządzeniu.

## Co działa dobrze i należy zachować
- Mutanty zabite: bramka 201 (M1), kontrola nieużywanych liczb poza listą (M3), filtr i błąd `marginMax` (M4, M7), wpis rywala river-value (M8), formatowanie otwarcia rywala (M12).
- Wyrocznia FS niezależna od generatora (własne kombinacje i `strength`) z fixture'ami sprzed FT, które dowodzą czerwieni z właściwego powodu.
- Liczby D-1461 jako formuły z `refs` i niezależny rachunek 2/7 w teście.
- Komentarze przy każdej zmianie z ID decyzji i znaleziska.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje recenzji do weta: D-1505 (zakres ID 301+), D-1506 (werdykt), D-1507 (D-043 na wszystkich 35 bazach) w `docs/decyzje/FX.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-301,08-programista-302,08-programista-303,08-programista-304`
