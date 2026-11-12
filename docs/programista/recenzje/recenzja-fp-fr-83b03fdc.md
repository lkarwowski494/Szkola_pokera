# Recenzja niezależna (FU): Programista — Szkoła Pokera — 2026-11-12
Commit: 83b03fdc (diff `5ec4f912..83b03fdc`, 14 commitów FP i FR, gałąź `sesja-fp-poprawki`) · Tryb: audit (recenzja niezależna, polecenie FU koordynatora @ 48b1929e) · Środowisko: Linux 6.18 x86_64, Node v22.23.4, pnpm 10.28.0, git; `pnpm install --frozen-lockfile` kod 0; pełne `pnpm run ci` działa; brak macOS/Xcode (E2E i telefon nie sprawdzone); dostęp do GitHub przez MCP, push tylko na `sesja-fu-recenzja`.

Dokument nie jest raportem `audit/` (polecenie FU wskazuje tę ścieżkę i pozwala ją commitować). ID znalezisk w zakresie 201+ (D-1485), bo 001–009 i 103–105 są już zajęte przez recenzje FO i wcześniejsze.

## Podsumowanie
Diff robi to, co deklaruje: poprawki 08-programista-001/002/003/005/006, 08-FQ-1, FM-01/02/08, widok river-value (KO-091), 06-tresci-008 i 08-FN-1 są w kodzie, mają testy, a 6 z 7 niezależnych mutantów (cofnięcie jednej poprawki) daje czerwony test z właściwego powodu. Bazowe `pnpm run ci` na 83b03fdc kończy się kodem 0 (`dowody/fu-ci-baseline-83b03fdc.txt`). Diff nie zmienia `content/` ani baz treści, więc identyfikatory elementów w powtórkach są nietknięte (`dowody/fu-d043-tresc.txt`). Najważniejsze ryzyko leży w nowej semantyce ręki mieszanej (08-FN-1): druga akcja poprawna trafia na ekranie pod nagłówek „Dlaczego nie”, co uczy fałszu; dziś nieosiągalne (żaden szablon w `content/` nie używa `correct: [..]`), ale blokuje wejście takiej treści. Brak blokerów KRYT/WYS dla obecnego stanu.

**Werdykt: PRZYJĄĆ Z UWAGAMI** (D-1487). Blokery KRYT/WYS: brak. Warunek: 08-programista-201 naprawione (albo bramka treści odrzuca `correct: [..]`) przed wejściem do `content/` szablonu z ręką mieszaną.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-201 | P1 (ŚREDNIE, warunkowo WYS) | D | Ręka mieszana: druga akcja poprawna pokazana jako „Dlaczego nie …” | otwarte |
| 08-programista-202 | P2 (ŚREDNIE) | D | `scenario.potOnly` w 10 językach po angielsku („Pot”) zamiast lokalnego tekstu, który już istnieje; oznaczenie zastępczości tylko prozą | otwarte |
| 08-programista-203 | P2 (NISKIE) | D | Wpięcie kontroli 06-tresci-008 w budowanie bez testu (mutant przeżywa) | otwarte |
| 08-programista-204 | P2 (NISKIE) | D | Dziennik: `play.log.call/raise` z surową liczbą i `bb ?? 0` (FM-02 niepełne; sprzed diffu) | otwarte |
| 08-programista-205 | P2 (NISKIE) | D | Commit pośredni b419ebdf z czerwoną bramką i18n (18 błędów) | otwarte |

## Linia bazowa i założenia
Linia bazowa ustalona z kodu przed lekturą uzasadnień autorów (`docs/decyzje/FR.md`, `docs/programista/plan-08.md`): najpierw diff źródeł, potem testy, potem mutanty, na końcu decyzje.

Wymiary pokrycia:
- **Ścieżki zapisu:** diff nie dotyka `packages/postep/`, `apps/mobile/src/data/`, schematu ani eksportu; jedyny styk z zapisem to słownik akcji ekranu: nowa akcja `bet` w `AKCJE` (walidacja wyboru z bazy) jest dodaniem, stare wybory nadal przechodzą `jestAkcja` (`apps/mobile/src/features/scenariusz/wariant.ts:24`). `alsoCorrect` pojawia się w wariancie tylko przy ręce mieszanej, więc kształt istniejących wariantów bez zmian (`packages/poker-core/src/scenario-gen.ts:707`).
- **Obsługa błędów:** 005 (komunikat z nazwą rodzaju) i 006 (δ ≥ 0,5 to `TemplateError` w generatorze i błąd bramki) sprawdzone mutantami MU7 i MU1; brak kwoty w turn-bet/flop-size nadal rzuca błąd zamiast „zakład 0 bb” (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:59`).
- **Typy na granicach:** schemat `correct: string | string[]` z `min(2)` i bez powtórzeń (`packages/content-schema/src/index.ts:661`); `pierwszaPoprawna` ma `?? ''`, ale schemat gwarantuje ≥ 2 elementy, więc gałąź martwa (nie znalezisko).
- **System projektowy:** nowe teksty przez `t()` i istniejące komponenty; wygląd widoku river-value i FM na flop-size do akceptacji 04 (D-1451, sekcja decyzji).
- **i18n:** 2 nowe klucze w 12 językach, bramka kod 0, +3 uwagi skryptu (ja, ko, zh-Hant: „brak liter pisma języka”) → 08-programista-202.
- **Wydajność:** limit odrzuceń 60 000 wydłuża tylko ścieżkę odmowy (ok. 3×, ey-ev4: ok. 9 s w Node); generator działa na telefonie (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:63`) → sekcja Do sprawdzenia.
- **Testy na właściwym poziomie:** logika w Node (poker-core, content-build), ekrany w jest; wyrocznie FL niezależne od generatora (własne liczenie outów po kolorze, `tools/content-build/test/wyrocznie-fl.ts:36`).
- **Dostępność:** etykieta czytnika przy powtórzonej nazwie „nazwa, kwota” (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:221`); nie sprawdzono VoiceOver na urządzeniu.
- **Liczby konfiguracyjne:** `MAX_CONSECUTIVE_REJECTIONS` w jednym miejscu z historią decyzji w komentarzu (`packages/poker-core/src/scenario-gen.ts:458`).

Soczewki: (1) recenzent szukający ścieżki bez testu → mutanty MU1–MU7, 08-programista-203; (2) uczący się w języku innym niż pl/en → 08-programista-202; (3) uczący się, który wybrał drugą poprawną akcję ręki mieszanej → 08-programista-201; (4) przyszła treść 06 (ID w powtórkach) → D-043. Wzorzec najlepszych: każda poprawka ma test, który pada bez niej (Beck, TDD; zasada 11), a brak tłumaczenia jest wykrywany mechanicznie — w Treningu przegląd przekładu oznacza brak tłumaczenia wagą „krytyczna” (`lkarwowski494/trening`, plik `scripts/i18n/przeglad-api.mjs`, linia 115 @ 2d97581, odczyt 2026-11-12). Zmian w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Diff źródeł: `scenario-gen.ts`, `content-schema/index.ts`, `scenariusze.ts`, `build.ts`, `wariant.ts`, `EkranScenariusza.tsx` | tak, w całości | lektura `git diff 5ec4f912..83b03fdc` |
| Testy nowe i zmienione (poker-core `fp-fl-00*`, `fn-08-fn-1`, `fq-08-fq-1`; content-build `fr-klucze-rozmiaru`, `fn-08-fn-1-bramka`, `fl-*`, `wyrocznie-fl`; mobile `fm-*`, `fn-*`, `fr-*`, `fg-*`, `fl-*`) | tak (lektura); osłabienia: brak (refaktor wyroczni zachowuje asercje i dodaje M10–M12) | `git diff` plików testów |
| Mutanty (cofnięcie jednej poprawki, 7 prób) | tak | `dowody/fu-mutanty.txt` |
| Pełne CI na 83b03fdc | tak, kod 0 | `dowody/fu-ci-baseline-83b03fdc.txt` |
| D-043: `tools/content-build/`, ID w powtórkach, baza na język | tak | `dowody/fu-d043-tresc.txt` |
| i18n 12 języków, `pl.kontekst.json`, `i18n:kod` przed i po | tak | `dowody/fu-i18n.txt` |
| Ręka mieszana na ekranie (bloki wyjaśnień) | tak, test odtwarzający | `dowody/fu-sonda-reka-mieszana.txt` |
| E2E (Maestro), telefon, VoiceOver | nie sprawdzono: brak macOS/iOS | — |
| Czas generowania wariantu flop-size na telefonie | nie sprawdzono: brak urządzenia | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-fp-fr-83b03fdc.md . docs/programista --rola 08-programista` (kopia skryptu w scratchpadzie): wynik na końcu pracy — „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0. `git diff --cached` przejrzany przed commitem: tylko `docs/programista/recenzje/**`, `docs/programista/dowody/fu-*`, `docs/decyzje/FU.md`; brak adresów e-mail i sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 logika domenowa z testami | dotyczy | ok: każda poprawka ma test (MU1–MU7); wyjątek 08-programista-203 |
| DEV-02 testy przed kodem | dotyczy | 9/10 commitów zmieniających zachowanie ma test w tym samym commicie (e157b28f, 63e85914, 87ffa871, b419ebdf, fba3f8dc, 905f241e; 8f7f7b42, 8380bee3 to same testy; d34e7e5f refaktor); bez testu: wpięcie w `build.ts` (905f241e) → 08-programista-203 |
| DEV-03 testy nie osłabione | dotyczy | ok: `.skip`/`.only` w diffie 0; jedyne „poluzowanie” to limit czasu ey-ev4 60 s (975e8763) z powodem (D-1450) |
| DEV-04 testy, typecheck, lint na czysto | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/fu-ci-baseline-83b03fdc.txt`) |
| DEV-05 zapis danych | nie dotyczy: diff nie dotyka zapisu | — |
| DEV-06 migracje i kopie | nie dotyczy: diff nie dotyka schematu ani kopii | — |
| DEV-07 brak zgadywanych wartości | dotyczy | 08-programista-204 (`bb ?? 0`, sprzed diffu); nowe kody: ok |
| DEV-08 daty | nie dotyczy: diff bez dat | — |
| DEV-09 parsowanie z unknown | dotyczy (schemat treści) | ok: zod z `refine` |
| DEV-10 błędy typowane | dotyczy | ok (005, 006) |
| DEV-11 tokeny i komponenty | dotyczy | ok: bez nowych stylów; wygląd do akceptacji 04 (D-1451, river-value) |
| DEV-12 i18n | dotyczy | 08-programista-202, 08-programista-204 |
| DEV-13 liczby konfiguracyjne | dotyczy | ok |
| DEV-14 sekrety | dotyczy | ok: diff bez plików `.env`/kluczy; raport sprawdzony skryptem |
| DEV-15 zwalnianie zasobów | nie dotyczy: diff bez efektów i nasłuchów | — |
| DEV-16 jednostki | dotyczy | ok: kwoty w bb przez `formatujLiczbe` w nowych miejscach |

## Znaleziska (szczegóły)

### 08-programista-201 · Ręka mieszana: druga akcja poprawna pokazana jako „Dlaczego nie …”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (ŚREDNIE wg CLAUDE.md „Audyty i wydania”; WYS w chwili wejścia treści z `correct: [..]`, bo to błędne twierdzenie merytoryczne)
- Realność: brzegowy dziś (żaden szablon w `content/` nie używa listy w `correct`; `dowody/fu-d043-tresc.txt`), realny po rozdzieleniu AKs/AKo w SC-10 (06-tresci-007, D-1435) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:387` — przy ocenie „zgodne” wszystkie pozostałe akcje punktu idą do bloków „dlaczego_nie”, także druga akcja z `alsoCorrect` (`apps/mobile/src/features/scenariusz/wariant.ts:200`). Test odtwarzający (czerwony): AKs `correct: [4bet, call]`, wybór call → bloki `["dobrze:call","dlaczego_nie:fold","dlaczego_nie:4bet"]`, nagłówek: Dlaczego nie „4-bet”; `dowody/fu-sonda-reka-mieszana.txt`, kod 1.
- Mechanizm: ten sam filtr `a !== wybor` decyduje o bloku dlaczego_nie; `grep -n "dlaczego_nie" apps/mobile/src/features/scenariusz/*.ts*` → 2 trafienia (`apps/mobile/src/features/scenariusz/wariant.ts:387` budowa, `apps/mobile/src/features/scenariusz/komponenty.tsx:204` tytuł). W range-spot problemu nie było, bo ręka mieszana daje tam drugą akcję dopuszczalne, nie zgodne; FN-1 wprowadza pierwszy przypadek dwóch akcji zgodnych.
- Powraca: nie (nowa semantyka z 905f241e)
- Wzorzec lub źródło: ADR-04 (ręka mieszana: obie akcje poprawne); CLAUDE.md „Audyty i wydania” pkt 1 (błędne twierdzenie merytoryczne = WYS)
- Kroki w aplikacji: (po wejściu treści) scenariusz z listą rąk → ręka AKs → wybierz „sprawdzenie” → ekran oceny: „Dlaczego nie „4-bet”” z tekstem uzasadniającym 4-bet.
- Opcje: (a) bloki dla akcji „zgodne” innych niż wybór jako „też dobre” (nowy tytuł bloku: tekst i wygląd od 04) — pełna naprawa, wymaga klucza i18n w 12 językach; (b) do czasu (a) bramka treści odrzuca `correct: [..]` z powodem „widok ręki mieszanej czeka na 04” — tanie, blokuje 06-tresci-007; (c) pominąć akcje „zgodne” w „dlaczego nie” bez nowego bloku — tanie, ale uczący się nie zobaczy, że druga akcja też jest dobra. Rekomendacja: (b) od razu, (a) po projekcie 04.
- Test akceptacyjny: test sondy z `dowody/fu-sonda-reka-mieszana.txt` przeniesiony do `fn-list-hand-mieszana.test.tsx` jest zielony (żaden blok „dlaczego_nie” nie dotyczy akcji „zgodne”), a przy (b) test bramki: szablon z `correct: [..]` daje błąd `checkScenarioNaEkran`.
- Status: otwarte

### 08-programista-202 · `scenario.potOnly` po angielsku w 10 językach, choć lokalny tekst już istnieje
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 (ŚREDNIE)
- Realność: brzegowy dziś (wiersz `potOnly` pokazują tylko turn-bet i flop-size, `apps/mobile/src/features/scenariusz/wariant.ts:319`, a tych rodzajów nie ma w `content/`); realny po wejściu SC-20 · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/i18n/locales/ja.json:1017` ma „{{t:pot|Pot}} {{pula}} bb” (wymuszona angielska forma „Pot”), a wcześniej ten sam wiersz brał `play.potLabel`, przetłumaczony we wszystkich 12 językach (ja „{{t:pot|ポット}}：{{bb}}bb”). Skrypt i18n: +3 uwagi „brak liter pisma języka” (ja, ko, zh-Hant), błędów 0 (`dowody/fu-i18n.txt`). Zastępczość opisana tylko prozą w `apps/mobile/src/i18n/locales/pl.kontekst.json:722`; nic nie zablokuje wydania z angielskim tekstem.
- Mechanizm: `grep -n '"potOnly"' apps/mobile/src/i18n/locales/*.json` → 12 trafień, 10 z „{{t:pot|Pot}}”. `scenario.action.bet` = „{{t:bet}}” nie ma tego problemu: znacznik bez formy daje nazwę ze słownika terminów języka (ja „ベット”, `content/ja/terms-nazwy.yaml:17`).
- Powraca: nie
- Wzorzec lub źródło: Trening, `scripts/i18n/przeglad-api.mjs` linia 115 (brak tłumaczenia = waga „krytyczna”), @ 2d97581, odczyt 2026-11-12; zasada 21 (kontrola wymuszona mechanicznie, nie prozą)
- Kroki w aplikacji: (po wejściu SC-20) język ja → scenariusz turn-bet → wiersz pod stołem „Pot 12 bb”.
- Opcje: (a) w 10 językach wartość z istniejącego tłumaczenia: pierwsza część `scenario.pot` danego języka (np. es „{{t:pot|Bote}} {{pula}} bb”) — bez przekładu 09, poprawna gramatyka, zostaje do przeglądu 09; (b) „{{t:pot}} {{pula}} bb” (nazwa ze słownika terminów) — jeden wzór dla wszystkich; (c) zostawić do fali 2 FE, ale dodać mechaniczny znacznik zastępczości (lista kluczy w pliku sprawdzanym przez `i18n`, czerwona przed wydaniem w App Store). Rekomendacja: (a) plus (c) jako trwała kontrola dla przyszłych wartości zastępczych.
- Test akceptacyjny: `node scripts/sprawdz-i18n.mjs …` bez uwag „brak liter pisma” dla `scenario.potOnly`; test ekranu turn-bet w ja nie zawiera „Pot”.
- Status: otwarte

### 08-programista-203 · Wpięcie kontroli 06-tresci-008 w budowanie bez testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NISKIE)
- Realność: teoretyczny dziś (w `content/` brak turn-bet, flop-size i defend, więc kontrola nic nie sprawdza), realny po wejściu SC-17/SC-20 · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant MU5 usuwa `numberValue` z kontekstu bramki w `tools/content-build/src/build.ts:422`; testy `fr-klucze-rozmiaru` i `fl-bramka-*` zielone (kod 0), `dowody/fu-mutanty.txt`. Bez tej linii warunek w `tools/content-build/src/scenariusze.ts:349` po cichu pomija kontrolę.
- Mechanizm: kontrola opcjonalna w kontekście (`numberValue?`), testowana tylko z jawnie podanym kontekstem; `grep -rln "numberValue\|kluczeRozmiaruZgodne" tools/content-build/test` → 1 plik.
- Powraca: nie
- Wzorzec lub źródło: zasada 21 (kontrolę, którą da się pominąć, wymusza test)
- Kroki w aplikacji: brak bezpośrednich; skutek: rozjazd rozmiaru w tekście i w wariancie przechodzi bramkę.
- Opcje: (a) test `compileContent` na fiksturze z niezgodnym rozmiarem oczekuje błędu 06-tresci-008 — mały; (b) uczynić `numberValue` wymaganym w `ScenarioCheckContext` — typecheck pilnuje wpięcia, ale zmienia wszystkie wywołania testowe. Rekomendacja: (a).
- Test akceptacyjny: mutant MU5 ginie.
- Status: otwarte

### 08-programista-204 · Dziennik: `play.log.call/raise` z surową liczbą i `bb ?? 0`
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 (NISKIE)
- Realność: realny (size-spot i range-spot są w `content/`; w pl kwota z kropką zamiast przecinka), ale sprzed diffu; FR zgłosił to sam jako nowe NIS (`docs/programista/plan-08.md:1333`) · Pewność: średnia (nie oglądane na ekranie)
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:162` (i 163) przekazuje `bb ?? 0` bez `formatujLiczbe`, podczas gdy FM-02 formatuje `play.log.bet` (linia 165).
- Mechanizm: `grep -n "play.log" apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` → 12 trafień; z liczbą bez `formatujLiczbe`: linie 155 (otwarcie rywala przed size-spot), 162 (call), 163 (raise), 164 (allin).
- Powraca: nie
- Wzorzec lub źródło: FM-02 (liczby wg języka); DEV-07 (brak zostaje brakiem)
- Kroki w aplikacji: pl → scenariusz z przebiciem 2,5 bb → dziennik „przebicie do 2.5 bb”.
- Opcje: (a) `formatujLiczbe` w trzech miejscach i usunięcie `?? 0` (warunki już sprawdzają `bb !== null`) — mały diff; (b) zostawić do backlogu z wersją. Rekomendacja: (a) w najbliższym fix 08.
- Test akceptacyjny: test dziennika w pl dla raise 2,5 bb pokazuje „2,5”.
- Status: otwarte

### 08-programista-205 · Commit pośredni z czerwoną bramką i18n
- Pozycja listy kontrolnej: DEV-02
- Poziom: P2 (NISKIE)
- Realność: brzegowy (utrudnia `git bisect`; push szedł zbiorczo po 3156267a) · Pewność: wysoka
- Rodzaj: D
- Dowód: na b419ebdf `sprawdz-i18n` daje 18 błędów „brak tłumaczenia”, kod 1; na 3156267a kod 0 (`dowody/fu-i18n.txt`).
- Mechanizm: commit przed decyzją o kluczach zastępczych (opis b419ebdf: „Klucze w 10 pozostałych słownikach czekają na decyzję koordynatora”); 905f241e opisany „pełne zestawy w toku”.
- Powraca: nie
- Wzorzec lub źródło: rola 08, zasada 4 (oba commity przy zielonych testach)
- Kroki w aplikacji: brak
- Opcje: (a) nic nie przepisywać (historia wypchnięta; zakaz przepisywania), odnotować; (b) w przyszłości commit dopiero po zielonym `pnpm i18n`. Rekomendacja: (a) + (b).
- Test akceptacyjny: brak (proces).
- Status: otwarte

## Do sprawdzenia
- Czas generowania wariantu flop-size na telefonie: akceptacja ok. 2,4e-4 na próbę (D-1450) daje średnio ok. 4 200 prób na wariant, a odmowa przy 60 000 trwa w Node ok. 9 s (komentarz w 975e8763). Generator działa synchronicznie na telefonie (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:63`). Brakuje pomiaru na urządzeniu (Hermes) przed wejściem flop-size do `content/`; nie wynika z tego diffu poza ogonem odmowy.
- Brak kwoty i wiersza puli w widoku river-value oraz pusta sekcja „Liczby”: zgodne z wariantem (nie niesie puli ani zakładu), ale to decyzja wyglądu i treści bez numeru decyzji → do akceptacji 04 i 06.
- 08-programista-002/003: niezależnie nie mutowałem M06/M07/M10–M12 (zrobili to autorzy, `dowody/fp-mutanty-M06-M12.txt`); moje próbki objęły 005, 006, FQ-1, FM-08, FN-1, KO-091 i 06-tresci-008.

## Co działa dobrze i należy zachować
- Każda poprawka FP/FR z testem, który ginie bez niej (6/7 mutantów zabitych, `dowody/fu-mutanty.txt`); testy FP opisują mutant, który zabijają (M10–M12).
- Wyrocznie pokrycia wydzielone do jednego modułu i niezależne od generatora (outy liczone po kolorze, δ jak w generatorze bez domyślnego 0).
- Zmiana limitu odrzuceń zachowuje prefiks losowań: pętla `generateVariant` zwraca pierwszy sukces, więc ziarna udane przy 20 000 dają identyczne warianty (`packages/poker-core/src/scenario-gen.ts:1030`); `GENERATOR_WERSJA` słusznie bez zmian.
- `alsoCorrect` tylko przy ręce mieszanej: warianty istniejących szablonów bez zmiany kształtu.
- D-043: diff bez zmian `content/`, baz i `src/data`; `content:check` kod 0 (35 baz aktualnych), więc ID elementów w powtórkach nietknięte.
- Tożsamość wszystkich 14 commitów: Łukasz Karwowski noreply (CLAUDE.md).

## Decyzje dla właściciela
Brak decyzji dla właściciela w tej recenzji (sprawy techniczne rozstrzygnięte do weta w `docs/decyzje/FU.md`, wygląd do roli 04). Werdykty decyzji FR:

| Decyzja | Werdykt | Powód |
|---|---|---|
| D-1450 (limit odrzuceń 60 000) | utrzymać | prefiks losowań bez zmian (sprawdzone w kodzie), test czerwony bez poprawki (MU4); analogia D-1310 trafna; warunek „przy akceptacji < 1e-4 przejrzeć akceptację, nie limit” słuszny |
| D-1451 (FM także dla flop-size) | utrzymać technicznie; **do akceptacji 04** | ta sama gałąź kodu i kształt decyzji co turn-bet; wygląd rozstrzyga 04 |
| D-1452 (wartość zastępcza en w 10 językach) | zmienić częściowo | `scenario.action.bet` („{{t:bet}}”) daje nazwę ze słownika języka — utrzymać; `scenario.potOnly` — zamienić na lokalny tekst z `scenario.pot` (08-programista-202, opcja a), bo odrzucono tylko opcję B, a opcja bez przekładu istniała |
| D-1453…D-1459 | nie użyte | pula FR zarezerwowana, nie wykorzystana |
| Widok river-value minimalny (fba3f8dc, bez numeru D) | **do akceptacji 04** | nie rozstrzygam wyglądu |

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-201,08-programista-202,08-programista-203,08-programista-204` (201: najpierw opcja b, opcja a po projekcie 04; 205 tylko odnotowane).
