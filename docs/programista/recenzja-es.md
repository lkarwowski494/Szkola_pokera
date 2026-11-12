# Audyt: Programista — Szkoła Pokera — 2026-11-12 (sesja ES, recenzja niezależna DT)
Commit: fb99729e (gałąź `claude/dt-e2e`; zakres b3963e9a..fb99729e) · Tryb: audit · Środowisko: Linux 6.18 w chmurze, Node 22, pnpm 10.28.0; bez macOS i Xcode (buildu iOS nie uruchamiałem, workflowów też nie: zakaz polecenia ES). Przebiegi E2E czytane przez API GitHub (tylko odczyt).

## Podsumowanie
Zmiana dodaje do `.github/workflows/e2e-ios.yml` dwa kroki `actions/cache@v4` (CocoaPods przed prebuild, DerivedData po `pod install`) i jeden test w `tests/narzedzia/workflowy.test.mjs`. Ryzyko z polecenia, czyli zatruty cache, który przepuściłby E2E na nieaktualnym buildzie, sprawdziłem i je obaliłem: bundle JS wykonuje się przy każdym buildzie (`alwaysOutOfDate = 1` w szablonie, w logu krok uruchomiony), a Xcode i tak kompiluje praktycznie wszystko od nowa. Kontrole nie są osłabione względem b3963e9a: diff tylko dodaje, flowy 9/9, `timeout-minutes: 67` pilnowany testem (mutant czerwony). Najważniejsze znalezisko: cache DerivedData nic nie przyspiesza. Przy trafieniu 2,2 GB xcodebuild kompiluje 1144 pliki wobec 1147 bez cache, a kosztuje ok. 2:34 na przebieg i 2,2 GB nowego wpisu przy każdym pushu (limit repozytorium 10 GB). Spełnił się więc warunek, który D-1022 sama zapisała jako powód wycofania („Jeśli nie — zostaje cache CocoaPods”).

**Werdykt: PRZYJĘTE Z ZASTRZEŻENIAMI.** Bez blokerów KRYTYCZNYCH ani WYSOKICH. Zalecane: usunąć cache DerivedData i zostawić cache CocoaPods. `pnpm run ci` na fb99729e: kod 0 (`dowody/es-ci-fb99729e.txt`).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P2 (ŚREDNIE, nie blokuje) | D | Cache DerivedData nie skraca kompilacji, a dodaje ok. 2:34 na przebieg i 2,2 GB na push | otwarte |
| 08-programista-002 | P2 (NISKIE) | D | Test cache nie łapie usunięcia `app.json` z klucza ani złej ścieżki DerivedData | otwarte |

## Linia bazowa i założenia
Linię bazową ustaliłem z kodu i dokumentacji, zanim przeczytałem dokumenty autora (`docs/decyzje/DT.md`, `docs/jakosc/e2e-przyspieszenie.md`; `stan-dt.md` pominąłem). Najlepszy w klasie cache buildu w CI spełnia cztery warunki: (1) jego klucz obejmuje wszystko, od czego zależy wynik, albo wynik nie zależy od zawartości cache, bo narzędzie samo unieważnia wpisy; (2) zapis jest możliwy tylko z zaufanych zdarzeń; (3) nie zawiera sekretów; (4) ma zmierzony zysk większy niż koszt przywrócenia i zapisu. Wzorzec projektu (D-191): Trening `e2e-ios.yml` cache'uje tylko npm (`cache: npm`, linia 86, odczyt 2026-11-12 przez raw.githubusercontent.com). Build iOS nie ma tam cache, więc oba kroki DT to odstępstwo. D-1021 je nazywa, D-1022 nazywa je warunkowo.

Wymiary pokrycia:
- Ścieżki zapisu (tu: zapis cache): klucz z `github.sha`, zapis w kroku „Post” tylko po sukcesie joba (log: „Cache saved with key …5997fd68…”). Zakres gałęzi według dokumentacji GitHub („Workflow runs can restore caches created in either the current branch or the default branch”, docs.github.com, dependency-caching, odczyt 2026-11-12 z repo github/docs). Bez `pull_request`, więc fork nie zapisze cache.
- Obsługa błędów: chybienie cache jest ciche i tylko spowalnia przebieg. To nie jest wybór wersji narzędzia (zasada 21), więc w tym miejscu nie wymaga głośnej porażki.
- Typy na granicach: nie dotyczy (YAML, bez kodu aplikacji).
- System projektowy, i18n, dostępność: sprawdzone, nie dotyczy (zmiana tylko w CI).
- Kod wrażliwy na wydajność: to jest cel zmiany. Zmierzone, patrz 001.
- Testy na właściwym poziomie: test strukturalny YAML w Node, sprawdzony mutantami (002).
- Liczby konfiguracyjne: `timeout-minutes: 67` bez zmian, pilnowany przez `tests/narzedzia/e2e-flowy.test.mjs:66`.

Soczewki: „recenzent szukający ścieżki bez testu” (mutanty), „przerwany zapis” (zapis cache tylko po sukcesie, więc przerwany lub czerwony przebieg nie zostawia wpisu). Proponowane zmiany w rejestrze założeń: brak. D-1022 ma warunek „[DO USTALENIA przebiegiem…]”, który rozstrzyga 001.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `git diff b3963e9a..fb99729e` (5 plików, tylko dodane linie) | tak | `git diff --stat`, diff `.github` i `tests` |
| `.github/workflows/e2e-ios.yml` w całości | tak | odczyt pliku na fb99729e |
| `tests/narzedzia/workflowy.test.mjs` (nowy test) | tak | mutanty M0–M10, `dowody/es-mutanty.txt` |
| Czy bundle JS może być nieaktualny po przywróceniu DerivedData | tak | szablon `expo-template-bare-minimum` 58.0.33 i log przebiegu 43126163648, `dowody/es-przebiegi-cache.txt` |
| Zysk z cache (3 przebiegi: b3963e9a, a076a05, 5997fd68) | tak | czasy kroków z API i liczba kompilacji z logów, `dowody/es-przebiegi-cache.txt` |
| Sekrety w cache | tak, z kodu i logu | brak `secrets.*` w workflowie; build `CODE_SIGNING_ALLOWED=NO`; `SENTRY_DISABLE_AUTO_UPLOAD` |
| Zawartość archiwum cache DerivedData (pliki) | nie | wymaga pobrania cache z runnera (API cache nie zwraca treści); wniosek o sekretach oparty na tym, że job nie ma żadnego sekretu |
| `pnpm run ci` | tak | `dowody/es-ci-fb99729e.txt` |
| Build iOS lokalnie / przebieg E2E | nie | brak macOS; uruchamianie workflowów zakazane |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzja-es.md . --rola 08-programista` (kopia skryptu w scratchpadzie): wynik w ostatniej linii sekcji, wklejony po przebiegu.

WYNIK_SPRAWDZ_RAPORT

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | nie dotyczy: zakres to workflow CI i test, bez logiki domenowej | — |
| DEV-02 | dotyczy (próbka 6 commitów zakresu) | 2 commity CI (516882e3, 5997fd68) zmieniają test razem z workflowem; a076a05b zmienia klucz cache bez zmiany testu (wariant wycofany potem w 5997fd68); 3 commity to same dokumenty. 2/3 commitów zachowania z testem |
| DEV-03 | dotyczy | ok: brak `.skip`/`.only`, diff testów tylko dodaje (`git diff b3963e9a..fb99729e -- tests` = +17 linii) |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 |
| DEV-05, DEV-06, DEV-07, DEV-08, DEV-09, DEV-10 | nie dotyczy: brak zmian w danych, bazie i kodzie aplikacji | — |
| DEV-11, DEV-12 | nie dotyczy: brak zmian interfejsu | — |
| DEV-13 | dotyczy (timeout jako liczba konfiguracyjna) | ok: 67 = 30 + 3×9 + 10 bez zmian; mutant M10 czerwony w `e2e-flowy.test.mjs` |
| DEV-14 | dotyczy | ok: brak sekretów w diffie i w krokach cache |
| DEV-15, DEV-16 | nie dotyczy: brak kodu aplikacji | — |
| Polecenie ES: klucz cache, zatrucie, sekrety, zasada 21, mutant, osłabienia | dotyczy | 001, 002; zatrucie obalone (Weryfikacja przeciwna niżej) |

## Znaleziska (szczegóły)

### 08-programista-001 · Cache DerivedData nie skraca kompilacji, a każdy przebieg wydłuża o ok. 2:34 i zostawia 2,2 GB nowego cache
- Pozycja listy kontrolnej: poza listą DEV (CI, zadanie 1 polecenia ES); najbliższa DEV-13 (konfiguracja CI)
- Poziom: P2; według progu wydania z CLAUDE.md ŚREDNIE (nie dotyczy danych, prywatności, bezpieczeństwa ani poprawności E2E; nie blokuje)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/es-przebiegi-cache.txt`. Liczba linii „Compiling” w logu xcodebuild: 1147 bez cache (b3963e9a), 1147 przy trafieniu DD (a076a05, 43117974356), 1144 przy trafieniu DD (5997fd68, 43126163648, konfiguracja jak fb99729e). Czasy xcodebuild: 28:58 / 24:32 / 30:56, czyli rozrzut runnera, nie efekt cache. Koszt w 43126163648: przywrócenie DD 1:11 + zapis DD 1:23 (cache 2214 MB); job 55:24 wobec 51:35 przed zmianą. Zapis następuje przy każdym nowym SHA (`key: …-${{ github.sha }}`, `.github/workflows/e2e-ios.yml:114`).
- Mechanizm: `expo prebuild --clean` i `pod install` odtwarzają `ios/` przy każdym przebiegu, więc Xcode uznaje cele za nieaktualne i kompiluje je ponownie. Przywrócone produkty nie są używane. `grep -n "actions/cache" .github/workflows/*.yml` → 2 trafienia, oba w e2e-ios.yml (94, 111).
- Powraca: nie. D-1022 sama ustaliła warunek wycofania: „[DO USTALENIA przebiegiem: czy Xcode uzna cele za aktualne po `prebuild --clean`; …Jeśli nie — zostaje cache CocoaPods + podział, wariant prostszy.]” (`docs/decyzje/DT.md`, D-1022). Autor w `docs/jakosc/e2e-przyspieszenie.md:55` pisze „pomiar nie rozstrzyga”. Liczba kompilacji rozstrzyga, że cele nie są uznawane za aktualne.
- Wzorzec lub źródło: GitHub, dependency-caching (odczyt 2026-11-12, `github/docs` main): „By default, the limit is 10 GB per repository” oraz „The cache eviction process may cause cache thrashing”. Wpis 2,2 GB na każdy push zapełnia limit po ok. 4 pushach i wypycha mniejsze wpisy (pnpm 180 MB, CocoaPods 161 MB), przez co cache CocoaPods też traci skuteczność.
- Kroki w aplikacji: brak skutku dla użytkownika aplikacji; skutek dla procesu: dłuższe E2E na każdym pushu do main/integration/claude, mniejszy zapas do `timeout-minutes: 67` (55:24 wobec 51:35).
- Opcje: (a) usunąć krok „Cache DerivedData” i jego asercje w teście, zostawić cache CocoaPods (pod install 2:22 → 1:24, przywrócenie i zapis 0:30). Kompromis: zostaje sam zysk ok. 30 s netto, ale nic nie kosztuje. (b) zostawić DD z kluczem bez `github.sha` (zapis raz na lockfile). Kompromis: znika koszt zapisu, zostaje 1:11 przywracania bez zysku. (c) diagnozować, dlaczego Xcode nie reużywa celów (np. stałe mtime po prebuild, build Pods w osobnym kroku). Kompromis: każda próba to 55 min runnera macOS, a wynik niepewny. Rekomendacja: (a), zgodnie z warunkiem samej D-1022 i z Treningiem (bez cache buildu).
- Test akceptacyjny: `tests/narzedzia/workflowy.test.mjs` sprawdza dokładnie jeden krok `actions/cache` (CocoaPods) przed prebuild; `pnpm run ci` kod 0; w pierwszym przebiegu E2E po zmianie brak „Cache DerivedData”, a xcodebuild mieści się w zakresie rozrzutu 25–31 min.
- Status: otwarte

### 08-programista-002 · Test cache przechodzi także po usunięciu `app.json` z klucza i po zmianie ścieżki DerivedData
- Pozycja listy kontrolnej: DEV-03 (siła testu)
- Poziom: P2; według progu wydania NISKIE
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/es-mutanty.txt`: M1, M2, M3 (usunięcie kroku cache), M6 (restore-keys bez hasha lockfile'a), M8 (bez `if`) i M9 (DD przed prebuild) dają kod 1. Kod 0 dają M4 (klucz bez `apps/mobile/app.json`), M5 (klucz bez SHA) i M7 (`path: apps/mobile/build`). Test sprawdza tylko `pnpm-lock.yaml` w kluczu (`tests/narzedzia/workflowy.test.mjs:328`).
- Mechanizm: asercja regexem na jednym pliku z `hashFiles`; ścieżki ani drugiego wejścia klucza nie sprawdza.
- Powraca: nie
- Wzorzec lub źródło: zasada 11 i DEV-03 roli (test ma umieć paść). Zmiana `app.json` (wtyczki natywne) zmienia Podfile, a komentarz kroku obiecuje, że klucz od niej zależy (`.github/workflows/e2e-ios.yml:91`).
- Kroki w aplikacji: brak. Ryzyko: przyszła zmiana klucza po cichu skróciłaby go o konfigurację aplikacji. Dla cache CocoaPods skutek jest mały (cache pobrań, `pod install` i tak rozwiązuje zależności).
- Opcje: (a) przy naprawie 001 asercja na `apps/mobile/app.json` w kluczu i na `path: ~/Library/Caches/CocoaPods`. Kompromis: dwie linie testu. (b) zostawić. Kompromis: zero pracy, luka zostaje. Rekomendacja: (a), w tym samym commicie co 001.
- Test akceptacyjny: mutanty M4 i M7 (dla kroku, który zostanie) dają kod 1.
- Status: otwarte

## Weryfikacja przeciwna (E2) i obalone hipotezy
- **Zatruty cache → zielone E2E na starym JS (obalone).** Bundle „Bundle React Native code and images” ma w szablonie prebuild `alwaysOutOfDate = 1`. W logu 43126163648 krok jest uruchomiony z notą „will be run during every build”. Restore-keys zawierają hash lockfile'a, więc inna wersja zależności nie zostanie przywrócona (mutant M6 pilnuje tego testem). Natywne źródła repo mają po checkoucie nowsze mtime niż przywrócone produkty, a liczba kompilacji pokazuje, że i tak wszystko się kompiluje. Zapis tylko po zielonym jobie, zakres gałęzi, bez `pull_request`.
- **Klucz bez wersji Xcode (obalone jako ryzyko fałszywej zieleni, NISKIE).** Obraz zmienił Xcode na 26.6 (log), a komentarz w workflowie mówi o 26.4.1 (sprzed zakresu). Przy pełnej rekompilacji stary DD nie zostaje użyty. Po opcji (a) z 001 sprawa znika.
- **Sekrety lub podpisy w cache (obalone).** Job nie używa `secrets.*`, build bez podpisu (`CODE_SIGNING_ALLOWED=NO`), cache jest dostępny tylko dla workflowów repo (dokumentacja GitHub), CocoaPods trzyma publiczne pody.
- **Osłabienie kontroli (obalone).** Diff wyłącznie dodaje; 9 flowów (`apps/mobile/e2e/*.yaml` bez `config.yaml`); timeout 67 pilnowany testem (M10 czerwony); kroki ponowień, `podsumuj` i bramka D-273 bez zmian.

## Do sprawdzenia (pewność ≤ 80%)
- `actions/cache@v4` w logu: „Node.js 20 is deprecated … forced to run on Node.js 24: actions/cache@v4”. Czy jest `actions/cache@v5` na Node 24: [DO USTALENIA] (API GitHub odmówiło odczytu repo `actions/cache` w tej sesji). Dotyczy też upload-artifact@v5, czyli wszystkich workflowów, nie tylko zakresu.
- Run 43095186010 (a076a05, push) ma od 2026-11-11 20:18 status `queued`. Możliwy zawieszony przebieg; do sprawdzenia przez koordynatora (anulowanie wymaga zgody, nie robiłem).
- Komentarz `e2e-ios.yml` „obraz macos-26 ma domyślnie Xcode 26.4.1” jest nieaktualny (log: 26.6). Sprzed zakresu, kosmetyka.

## Co działa dobrze i należy zachować
- Oba kroki cache mają `if: inputs.aplikacja_z_przebiegu == ''`, więc przebieg z cudzą aplikacją niczego nie przywraca ani nie zapisuje. Test to pilnuje (M8).
- DerivedData przywracane dopiero po `prebuild --clean`, zgodnie z kolejnością pilnowaną testem (M9).
- Restore-keys z hashem lockfile'a, bez gołego przedrostka (M6 czerwony).
- Wycofanie podziału (D-1024) przywróciło testy z b3963e9a bez osłabień.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje merytoryczne i techniczne tej recenzji są w `docs/decyzje/ES.md` (D-1270, D-1271), do weta koordynatora lub właściciela.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002`

## Stan plików śledzonych
`git status --porcelain` przed commitem tej recenzji: tylko nowe pliki `docs/programista/recenzja-es.md`, `docs/programista/dowody/es-*.txt`, `docs/decyzje/ES.md` (kod i workflowy nietknięte).
