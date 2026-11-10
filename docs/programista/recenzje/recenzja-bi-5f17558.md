# Audyt: Programista — recenzja niezależna pracy BI (menu W2, zębatka, Wskaźnik w Postępie, stany kafelków) — 2026-11-10
Commit: 5f17558 (gałąź `sesja-bl-recenzja` = `sesja-bi-menu`, HEAD zgodny z poleceniem) · Przedmiot: `git diff 0c24cb6..5f17558` · Tryb: audit (rola 08, zakres zawężony poleceniem BL @ dda4ee2) · Sesja BL
Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0, sieć do rejestru npm działa; brak macOS/Xcode/Maestro (flowów E2E nie uruchomiono, ocena statyczna + test w Node); aplikacja nie ma wsparcia web (brak zrzutów, ustalenie BI potwierdzone brakiem `react-native-web` w zależnościach aplikacji).

## Podsumowanie
**Werdykt: przyjąć z warunkiem.** Warunek: przed scaleniem do `main`/`integration/**` naprawić 08-programista-001 (3 z 9 flowów bramki E2E czekają na tekst, którego po zmianie nie ma na „Dziś”; bramka TestFlight wymaga zielonego `e2e-ios.yml`). Reszta pracy jest poprawna: `react-native-svg` 15.16.0 = wersja przypięta przez Expo SDK 58, licencje dopuszczalne, `app.json` i manifest prywatności bez zmian (bez potrzeby); stan limitu na „Dziś” liczony tą samą funkcją domeny co ekran startu, bez obejścia (kafelek zawsze prowadzi przez `przygotujStart`); zmienione testy statyczne nie straciły asercji. `pnpm run ci` kod 0.

Znaleziska wg progu CLAUDE.md „Audyty i wydania”: KRYT 0 · WYS 1 · ŚR 3 · NIS 6.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P1 · WYSOKIE | D | Flowy E2E 02, 03, 04 czekają na wstęp listy lekcji na „Dziś”, a ten jest już tylko na „Lekcjach” — bramka E2E/TestFlight będzie czerwona | otwarte (test czerwony w commicie BL) |
| 08-programista-002 | P2 · ŚREDNIE | P | Kafelek Powtórki bez treści prowadzi przez ekran startu z licznikiem (przy wyczerpanym limicie: „Pełny dostęp”) do pustej kolejki | otwarte |
| 08-programista-003 | P2 · ŚREDNIE | D | Stan „Wszystko zrobione” bez kafelka „Kurs ukończony” z makiety | otwarte |
| 08-programista-004 | P2 · ŚREDNIE | D | Karta Wskaźnika na Postępie bez wariantu AX5 (pionowy stos) z projektu | otwarte |
| 08-programista-005 | P2 · NISKIE | P | Stany „Po pierwszej lekcji…” liczone z ukończonych lekcji, nie z rzeczywistego warunku (start od M3+, karty z sesji) | otwarte |
| 08-programista-006 | P2 · NISKIE | D | Etykiety czytnika sklejane w kodzie zamiast klucza z parametrami (jak `today.rowLabel`) | otwarte |
| 08-programista-007 | P2 · NISKIE | D | Przed odczytem i po błędzie odczytu kafelki pokazują stan zgadnięty („Brak na dziś”, „Wkrótce”) | otwarte |
| 08-programista-008 | P2 · NISKIE | D | Test „Wskaźnik … jako pierwszy element ekranu” nie sprawdza kolejności | otwarte |
| 08-programista-009 | P2 · NISKIE | P | 17 nowych kluczy w 12 językach (w tym 5 wydanych) bez drugiego przeglądu roli 09 | otwarte |
| 08-programista-010 | P2 · NISKIE | D | Martwe klucze i18n po usunięciu zakładki Powtórki i listy z „Dziś” | otwarte |

## Linia bazowa i założenia
Linię bazową ustaliłem z kodu i wymagań przed czytaniem `docs/programista/stan-bi.md` i `docs/programista/dowody/bi-*` (przeczytane dopiero po ocenie, dla porównania; rozbieżność: BI nie wykrył 001). Najlepsza w klasie wersja tego obszaru: każda ścieżka dotarcia flowu E2E sprawdzona statycznie w Node (wzorzec projektu: `tests/narzedzia/e2e-flowy.test.mjs`), stan kafelków z jednej funkcji domeny, kafelek bez treści nie prowadzi do pustego ekranu (BR-MENU-001), wszystkie stany makiety wdrożone, etykiety czytnika z kluczy z parametrami.

Wymiary pokrycia:
- Ścieżki zapisu: zmiana nie dodaje zapisu; ekrany tylko czytają `postep.db`. Pusta kolejka powtórek nie zużywa limitu: `nowa()` wychodzi przed zapisem aktywności (`apps/mobile/src/features/session/aktywnoscSesji.ts:62`). Sprawdzone, brak problemu.
- Obsługa błędów: błąd odczytu → `BladOdczytu` z ponowieniem; nowa zależność `zuzyteDzis` w odczycie „Dziś”; stan kafelków przy błędzie zgadnięty (007).
- Typy na granicach: nowe dane z bazy przez istniejące parsery portu (`zuzyteDzis`, `odczytajKarty`); brak nowych `as`/`!` na danych z zewnątrz (przeniesione `exams.get(m.id)!` w `lessons.tsx` to wartość z mapy w tym samym wyrażeniu, styl).
- System projektowy: tokeny `odstep`, `promien.przycisk` (14), `styl.naglowek` 17/600, `styl.przypis` 15 zgodne z `menu-i-zebatka.md`; rozbieżności 003, 004.
- i18n: wszystkie nowe teksty przez `t()`, klucze w 12 plikach + kontekst; sklejanie etykiet 006; martwe klucze 010; przegląd 009.
- Wydajność: lista 14 modułów, bez pętli zapytań; sprawdzone, brak.
- Testy na właściwym poziomie: logika `stanKafli`/`liczbaKolumnKafli`/`etykietaKafla` czysta z testem w Node; ekrany na prawdziwej bazie treści i `postep.db` (node:sqlite); brak kontroli flowów E2E względem treści ekranu (001).
- Dostępność: role, etykiety, `accessibilityState.expanded`, cele ≥ 44 pt, ikony ukryte; AX5 karty Wskaźnika 004.
- Liczby konfiguracyjne: `MODUL_SCENARIUSZY_OD = 2` z ID decyzji (D-536), próg kolumn 1,3 z komentarzem; sprawdzone, brak.

Soczewki (po kolei, bez subagentów): użytkownik VoiceOver/duży tekst (006, 004), recenzent szukający ścieżki bez testu (001, 008), nowy użytkownik i użytkownik po ocenie poziomu (002, 005), użytkownik z przerwanym odczytem (007). Rejestr założeń: bez propozycji zmian.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `react-native-svg`: wersja vs Expo SDK, licencje zależności, natywne API z wymaganym powodem, wtyczka, `app.json` | tak | `npx expo install --check` (svg nie na liście; kod 1 tylko przez jest/@types/jest sprzed BI): dowody/bl-expo-install-check.txt; licencje: dowody/bl-licencje-svg.txt; grep API w `node_modules/react-native-svg/apple` (0 trafień); brak `app.plugin.js`/`PrivacyInfo.xcprivacy` w paczce; `app.json` poza diffem |
| Stany kafelków, limit (`widok.ts`, `wejscieStartu.ts`, `index.tsx`) | tak, kod + testy | czytanie; `packages/domena/src/limit.ts:20` (`mozeStartowac`) |
| `lessons.tsx`, `scenarios.tsx`, `_layout.tsx`, `Kafel.tsx`, `Ikona.tsx`, `BlokLekcji.tsx` | tak | czytanie diffu |
| Zmienione testy (widok-08, skalowanie-08, k11-sklep) przed/po | tak | `git diff 0c24cb6..5f17558` |
| Flowy Maestro 01, 02, 08, 09 i niezmienione 03–06, 10 | tak, statycznie | dowody/bl-test-001-czerwony.txt, dowody/bl-test-001-baza-0c24cb6.txt |
| `pnpm run ci` | tak, kod 0 | dowody/bl-ci-5f17558.log |
| Mieszczenie bez przewijania 375×667, łamanie wyrazów 320 pt / AX5 na urządzeniu | nie (brak symulatora i web) | „Do sprawdzenia” |
| Uruchomienie flowów E2E | nie (brak macOS) | test statyczny 001 zamiast |
| `progress.tsx`, `AdvancementCard.tsx` (bez zmian w diffie) | tak, tylko pod kątem projektu | czytanie |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-bi-5f17558.md . --rola 08-programista` (kopia skryptu w scratchpadzie): `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0. Trafienie wzorca sekretu w logu CI (`bl-ci-5f17558.log`, wiersz rejestru treści) to fałszywy alarm (fragment identyfikatora `n:hud…`), sprawdzone ręcznie.

Komendy (kody wyjścia):
- `pnpm install --frozen-lockfile` → 0
- `pnpm run ci` → 0 (apps/mobile: 93 zestawy, 723 testy; domena 314; postep 108; kontrole 35; i18n:kod 0 błędów) — dowody/bl-ci-5f17558.log
- `npx expo install --check` (apps/mobile) → 1 (jest 29.7.0 i @types/jest; `react-native-svg` zgodny) — dowody/bl-expo-install-check.txt
- `node --test tests/narzedzia/e2e-flowy.test.mjs` @ 5f17558 + test BL → 1 (9 pass, 1 fail: nowy test) — dowody/bl-test-001-caly-plik-5f17558.txt
- ten sam plik testu na kopii 0c24cb6 (worktree w scratchpadzie) → 0 (10 pass) — dowody/bl-test-001-baza-0c24cb6.txt
- Wyjątek nazwany (zasada 7; CLAUDE.md „Przed commitem `pnpm run ci` musi być zielone”): commit BL z testem odtwarzającym 001 jest celowo czerwony w `test:skrypty` (polecenie BL pkt 5: test czerwony, bez naprawy). Kontrola zastępcza: czerwień tylko w nowym teście z właściwego powodu (pozostałe 9 testów pliku zielone), ten sam test zielony na 0c24cb6; `pnpm run ci` na 5f17558 bez testu BL kod 0. Gałąź `sesja-bl-recenzja` nie trafia do E2E ani TestFlight; naprawa 001 zazieleni test.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy (`stanKafli`, `limitZeZuzycia`, `liczbaKolumnKafli`, `etykietaKafla`) | ok: `kafle-bi.test.ts` (wektory: nowy, M0–1, M2/M3, limit, Pro), `menu-bi.test.tsx` (limit z prawdziwej bazy) |
| DEV-02 | dotyczy | 3/3 commitów zmieniających zachowanie (ffe748a, 524e569, 5f17558) ma test w tym samym commicie; uwaga: ffe748a zacommitowany przy czerwonym CI (K-11), naprawione w 524e569 |
| DEV-03 | dotyczy | asercje nie zdjęte (widok-08: ta sama asercja, inny plik; skalowanie-08: ⚙︎ zastąpione kontrolą `<Ikona nazwa="ustawienia"`; k11: dowód funkcji w `index.tsx`); 08-programista-008 (nazwa testu ponad asercję) |
| DEV-04 | dotyczy | `pnpm run ci` kod 0; E2E nie uruchomione → 08-programista-001 |
| DEV-05 | nie dotyczy: zmiana nie zapisuje danych | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w diffie | — |
| DEV-07 | dotyczy | 08-programista-007 |
| DEV-08 | dotyczy (dzień lokalny dla limitu) | ok; uwaga o drugim odczycie zegara w „Do sprawdzenia” |
| DEV-09 | dotyczy | ok (dane przez parsery portu) |
| DEV-10 | dotyczy | ok (`BladOdczytu`); nieudanych zapisów brak |
| DEV-11 | dotyczy | ok (tokeny); rozbieżności z makietą: 003, 004 |
| DEV-12 | dotyczy | 08-programista-006, 009, 010 |
| DEV-13 | dotyczy | ok (`MODUL_SCENARIUSZY_OD` z D-536, próg 1,3 opisany) |
| DEV-14 | dotyczy (nowa zależność, lockfile) | ok: lockfile dodaje tylko `react-native-svg` i 11 zależności (licencje MIT, ISC, BSD-2-Clause, CC0-1.0) |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów w diffie | — |
| DEV-16 | dotyczy (dzień lokalny, `termin_ms`) | ok |

## Znaleziska (szczegóły)

### 08-programista-001 · Flowy E2E 02, 03 i 04 padną: czekają na „Dziś” na tekst, który jest już tylko na zakładce „Lekcje”
- Pozycja listy kontrolnej: DEV-04
- Poziom: P1 · WYSOKIE (bramka TestFlight czeka na zielony `e2e-ios.yml` dla tego samego commitu, `.github/workflows/testflight.yml:15-16`; zasada 21)
- Realność: realny · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/e2e/02-powtorki.yaml:12`, `apps/mobile/e2e/03-slowniczek.yaml:12`, `apps/mobile/e2e/04-pomoc.yaml:13` czekają 30 s na `'No-Limit Hold’em od zera.*'` (`learn.intro`) zaraz po powitaniu („Dziś”). Po BI klucz renderuje tylko `apps/mobile/src/app/(tabs)/lessons.tsx:55`; `index.tsx` go nie ma (grep `t('learn.intro')` → 1 trafienie). Flow 01 BI poprawił (tap `zakladka-lekcje` przed oczekiwaniem), 02/03/04 nie. Test BL: dowody/bl-test-001-czerwony.txt (kod 1, trzy flowy wymienione), na 0c24cb6 zielony: dowody/bl-test-001-baza-0c24cb6.txt (kod 0).
- Mechanizm: flow czeka na tekst ekranu, który zmiana przeniosła na inną zakładkę; `grep -rn "No-Limit Hold’em od zera" apps/mobile/e2e` → 4 trafienia: 01 (poprawny), 02, 03, 04. Nieaktywna zakładka NativeTabs nie jest w widocznej hierarchii, więc Maestro jej tekstu nie znajdzie.
- Powraca: tak, klasa JAK-E0-01 („flow z tekstem, którego nie ma”, nagłówek `tests/narzedzia/e2e-flowy.test.mjs`) → trwała kontrola: test dopisany w commicie BL do tego pliku.
- Wzorzec lub źródło: `tests/narzedzia/e2e-flowy.test.mjs` (kontrola flowów w Node, D-189); E2E uruchamia się dopiero po pushu na `main`/`integration/**`/`claude/**` (`.github/workflows/e2e-ios.yml:19-23`), więc na gałęzi `sesja-bi-menu` nikt go nie widział.
- Kroki w aplikacji: nie dotyczy użytkownika; po scaleniu każdy przebieg `e2e-ios.yml` czerwony (3 flowy × 30 s + ponowienie), TestFlight zablokowany.
- Opcje: (a) we flowach 02/03/04 czekać na element „Dziś” (`${LEKCJA_START_TYTUL}` jak `wspolne/za-powitaniem.yaml` albo `id: dzis-lekcja`) — flow sprawdza ekran, na którym stoi; (b) przed oczekiwaniem stuknąć `zakladka-lekcje`, a w 02/03/04 wrócić na „Dziś”/„Postęp” — dłuższe flowy, test zakładki Lekcje trzy razy. Rekomendacja: (a); oczekiwanie jest już w podprzepływie powitania, więc w 02/03/04 wystarczy usunąć zbędne czekanie albo zamienić je na `id: dzis-lekcja`.
- Test akceptacyjny: `node --test tests/narzedzia/e2e-flowy.test.mjs` zielony (test „tekst wstępu listy lekcji (learn.intro) sprawdzany we flowach tylko na zakładce, która go renderuje”), potem zielony `e2e-ios.yml` na scalonym commicie.
- Status: otwarte

### 08-programista-002 · Kafelek Powtórki bez treści prowadzi przez ekran startu z licznikiem do pustej kolejki
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 · ŚREDNIE
- Realność: realny (każdy nowy użytkownik; flow 02 przechodzi właśnie tę drogę) · Pewność: wysoka
- Rodzaj: P (decyzja produktowa, rola 04/03)
- Dowód: BR-MENU-001 w `docs/brd/wymagania-scenariusze.md:221`: kafelek bez treści mówi, co go odblokuje, „zamiast znikać albo prowadzić do pustego ekranu”. Kafelek zawsze wywołuje `router.push({ pathname: '/session', params: { mode: 'review' } })` (`apps/mobile/src/app/(tabs)/index.tsx:78-84`), także w stanie "Po pierwszej lekcji"/"Brak na dziś". Sesja pokazuje `EkranStartu` z licznikiem darmowej aktywności, a przy wyczerpanym limicie przycisk "Pełny dostęp" (`apps/mobile/src/features/start/EkranStartu.tsx:53`), potem pusty stan `review.none`. Przed BI przycisk startu w zakładce Powtórki był wyłączony przy 0 kart (`disabled={state.due === 0}` w usuniętym `review.tsx`, 0c24cb6). Limitu nie zużywa (`apps/mobile/src/features/session/aktywnoscSesji.ts:62`).
- Mechanizm: stan kafelka nie wpływa na cel stuknięcia; `grep -n "onPress" apps/mobile/src/app/(tabs)/index.tsx` → 4 kafelki/przyciski, żaden nie zależy od `stan`.
- Powraca: nie
- Wzorzec lub źródło: BR-MENU-001 (wyżej); `menu-i-zebatka.md` opisuje tylko stuknięcie w stanie limitu.
- Kroki w aplikacji: nowa instalacja → „Zacznij od początku” → kafelek „Powtórki. Po pierwszej lekcji.” → ekran startu „1 darmowa aktywność dziś / Zacznij” → „Nic nie czeka na powtórkę”. Z wyczerpanym limitem: zamiast pustej kolejki oferta zakupu.
- Opcje: (a) przy 0 kart na dziś sesja powtórek pomija `EkranStartu` i pokazuje od razu pusty stan z następnym terminem (dawne `review.next`) — 1 dotknięcie, bez licznika i oferty, ale nadal ekran; (b) kafelek w stanie „Po pierwszej lekcji”/„Brak na dziś” nieaktywny (`accessibilityState.disabled`, stan czytany przez VoiceOver) — zgodne literalnie z BR-MENU-001, ale martwy kafelek na ekranie głównym. Rekomendacja: (a) (komunikat jest informacją, oferta zakupu przy braku treści nie).
- Test akceptacyjny: test ekranu sesji `mode: 'review'` przy 0 kart: brak `EkranStartu` i brak „Pełny dostęp”, widoczny `review.none`; flow 02 bez kroku „Zacznij”.
- Status: otwarte

### 08-programista-003 · Stan „Wszystko zrobione” bez kafelka „Kurs ukończony” z makiety
- Pozycja listy kontrolnej: DEV-11
- Poziom: P2 · ŚREDNIE
- Realność: realny (po ukończeniu kursu) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/design/menu-i-zebatka.md:37` (stan "Wszystko zrobione": "Kurs ukończony" + `today.courseDone`), makieta `docs/design/ekrany/menu.html` (kafelek na suknie `aria-label="Kurs ukończony. Wszystkie lekcje są ukończone…"`); kod pokazuje sam przypis `apps/mobile/src/app/(tabs)/index.tsx:75` (`<Muted>{t('today.courseDone')}</Muted>`), bez sukna i tytułu; klucza "Kurs ukończony" brak.
- Mechanizm: jeden stan makiety pominięty; pozostałe trzy stany (nowy, w trakcie, limit) wdrożone.
- Powraca: nie
- Wzorzec lub źródło: D-582 („Stany kafelków „Dziś” wdrożone według `menu-i-zebatka.md`”).
- Kroki w aplikacji: ukończyć wszystkie lekcje → „Dziś” bez elementu firmowego na górze, tylko szary tekst.
- Opcje: wdrożyć wariant `BlokLekcji` bez przycisku z nowym kluczem tytułu (12 języków + przegląd 09) — jedna jasna droga, bo makieta to rozstrzyga.
- Test akceptacyjny: test ekranu „Dziś” z wszystkimi lekcjami ukończonymi: element z etykietą „Kurs ukończony. …” na suknie, bez przycisku.
- Status: otwarte

### 08-programista-004 · Karta Wskaźnika na „Postępie” bez wariantu AX5 z projektu
- Pozycja listy kontrolnej: DEV-11
- Poziom: P2 · ŚREDNIE (projekt sam ocenia łamanie „zaawansowania” przy AX5 jako ŚREDNIE)
- Realność: realny (AX5) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/design/menu-i-zebatka.md:28` (karta przy AX5 przechodzi w pionowy stos: plakietka nad tytułem, bez szewronu); `apps/mobile/src/features/advancement/AdvancementCard.tsx` bez `fontScale`/`useWindowDimensions` (grep 0 trafień) — układ wierszowy przy każdej skali. BI nie zmienił karty (poza diffem), choć "Wskaźnik w Postępie" był w zakresie (D-541).
- Mechanizm: wariant AX5 z projektu nie wdrożony; kafelki „Dziś” go mają (`liczbaKolumnKafli`).
- Powraca: nie
- Wzorzec lub źródło: D-541; NFR dostępności (AX5) w `menu-i-zebatka.md` „Dostępność i języki”.
- Kroki w aplikacji: Ustawienia iOS → Większy tekst AX5 → „Postęp”: tytuł karty łamany w środku wyrazu obok plakietki.
- Opcje: wariant pionowy od tego samego progu co kafelki (1,3) — jedna droga, wynika z projektu.
- Test akceptacyjny: test renderu karty przy `fontScale` 3,1: plakietka nad tytułem, bez szewronu; przy 1,0 układ bez zmian.
- Status: otwarte

### 08-programista-005 · Stany „Po pierwszej lekcji…” liczone z ukończonych lekcji, nie z rzeczywistego warunku
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · NISKIE
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: P (tekst i reguła: rola 04/03)
- Dowód: `apps/mobile/src/features/dzis/widok.ts:95` (scenariusze odblokowane, gdy któraś ukończona lekcja ma moduł o ord ≥ 2) i `apps/mobile/src/features/dzis/widok.ts:97` (Powtórki "po pierwszej", gdy brak ukończonych lekcji i kart na dziś). (a) Użytkownik po ocenie poziomu ze startem od M3+ widzi "Po pierwszej lekcji modułu 2", a odblokuje go pierwsza lekcja M3 (ord ≥ 2; interpretacja ord ≥ 2 jest lepsza niż "dokładnie M2", które zablokowałoby go na stałe — zachować). (b) Karty FSRS powstają przy każdej odpowiedzi w sesji (`apps/mobile/src/features/session/aktywnoscSesji.ts:113`), więc po przerwanej lekcji albo sesji ćwiczeń z kartami jeszcze nie na dziś kafelek mówi "Po pierwszej lekcji", choć powtórki już są zaplanowane.
- Mechanizm: warunek kafelka przybliżony liczbą ukończonych lekcji.
- Powraca: nie
- Wzorzec lub źródło: D-582, BR-MENU-001 („kafelek mówi, co go odblokuje”).
- Kroki w aplikacji: ocena poziomu → start M4 → „Dziś”: „Scenariusze. Po pierwszej lekcji modułu 2.”
- Opcje: (a) tekst z numerem modułu wyliczonym z `max(2, moduł startu)` („Po pierwszej lekcji modułu {{n}}”) i Powtórki „po pierwszej” tylko przy braku jakichkolwiek kart — dokładne, nowy parametr w 12 językach; (b) zostawić i zapisać jako uproszczenie — zero pracy, tekst myli wąską grupę. Rekomendacja: (a) przy kroku F (scenariusze), bo wtedy i tak zmienia się stan kafelka.
- Test akceptacyjny: wektory `stanKafli`: start od M4 bez lekcji → tekst z modułem 4; karty niezaplanowane na dziś bez ukończonej lekcji → „brak”.
- Status: otwarte

### 08-programista-006 · Etykiety czytnika sklejane w kodzie zamiast klucza z parametrami
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 · NISKIE
- Realność: realny (ja, zh-Hant, ko: interpunkcja „. ” zamiast „。”) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/dzis/widok.ts:78-80` (`etykietaKafla` zwraca szablon z kropkami w kodzie), `apps/mobile/src/features/dzis/BlokLekcji.tsx:21`, `apps/mobile/src/app/(tabs)/lessons.tsx:73`. Istniejący wzorzec projektu robi to kluczem: `today.rowLabel` = `{{tytul}}. {{opis}}.` (`apps/mobile/src/features/dzis/widok.ts:64`).
- Mechanizm: `grep -n "accessibilityLabel={\`" apps/mobile/src` w plikach BI → 2 trafienia + `etykietaKafla`.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 08 pkt 8 (bez sklejania przetłumaczonych kawałków).
- Kroki w aplikacji: VoiceOver w ja na „Dziś”: „復習. 今日はなし.” z kropkami łacińskimi.
- Opcje: klucze `today.tileLabel`, `today.lessonLabel`, `lessons.moduleLabel` z parametrami — jedna droga, wzorzec już istnieje.
- Test akceptacyjny: test etykiet przez `t()` w pl i ja; brak szablonów z kropką w `accessibilityLabel`.
- Status: otwarte

### 08-programista-007 · Przed odczytem i po błędzie odczytu kafelki pokazują stan zgadnięty
- Pozycja listy kontrolnej: DEV-07
- Poziom: P2 · NISKIE (komunikat `BladOdczytu` widoczny nad kafelkami)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/app/(tabs)/index.tsx:57-58`: przy `stan === null` (ładowanie albo błąd) Powtórki "Brak na dziś", Scenariusze "Wkrótce", Sesja opis — wartości wyglądające na fakt; u nowego użytkownika migają przed "Po pierwszej lekcji".
- Mechanizm: domyślna gałąź warunku zamiast stanu „brak danych”.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 08 pkt 9 (brak zostaje brakiem).
- Kroki w aplikacji: błąd odczytu `postep.db` → „Powtórki. Brak na dziś.” mimo zaległych kart.
- Opcje: przy `stan === null` kafelki bez linii stanu (tylko tytuł) — jedna droga.
- Test akceptacyjny: test „Dziś” z portem zwracającym błąd: brak tekstów `reviewsTileNone`/`scenariosSoon`.
- Status: otwarte

### 08-programista-008 · Test „Wskaźnik … jako pierwszy element ekranu” nie sprawdza kolejności
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 · NISKIE
- Realność: teoretyczny (dziś karta stoi pod tytułem) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/__tests__/menu-bi.test.tsx:191-198`: asercje tylko na obecność, rolę i nawigację; przeniesienie karty na dół ekranu nie zmieni wyniku.
- Mechanizm: nazwa testu obiecuje więcej niż asercja.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 08 pkt 3.
- Kroki w aplikacji: brak (jakość testu).
- Opcje: asercja kolejności (indeks karty w drzewie zaraz po nagłówku) albo zmiana nazwy na „Wskaźnik na Postępie” — rekomendacja: asercja, bo to kryterium D-541.
- Test akceptacyjny: test pada, gdy karta nie jest pierwsza po tytule.
- Status: otwarte

### 08-programista-009 · Nowe klucze w 12 językach bez drugiego przeglądu roli 09
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 · NISKIE
- Realność: realny (ja, zh-Hant, pt-BR, fr, pt są „wydane w kodzie”) · Pewność: wysoka
- Rodzaj: P (proces 09)
- Dowód: 17 nowych kluczy (`apps/mobile/src/i18n/locales/pl.kontekst.json:703-719`, znacznik `[BI, 2026-11-10]`), przekład własny roli 08; `docs/lokalizacja/jezyki.md:3` wymaga klucza, kontekstu i wszystkich języków (spełnione), kolumna "Drugi przegląd AI" w tabeli języków dotyczy też nowych tekstów.
- Mechanizm: przekład bez przeglądu; BI sam to zapisał jako „do przeglądu roli 09”.
- Powraca: nie
- Wzorzec lub źródło: `docs/lokalizacja/jezyki.md`.
- Kroki w aplikacji: teksty kafelków w wydanych językach bez przeglądu.
- Opcje: (a) przegląd 09 przed najbliższym TestFlight; (b) w ramach najbliższej fali przeglądu — rekomendacja (b), teksty są krótkie i bez treści merytorycznej.
- Test akceptacyjny: wpis przeglądu w `docs/lokalizacja/dowody/` dla 17 kluczy.
- Status: otwarte

### 08-programista-010 · Martwe klucze i18n po usunięciu zakładki Powtórki i listy z „Dziś”
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 · NISKIE
- Realność: realny (koszt przekładu w 35 językach) · Pewność: wysoka
- Rodzaj: D
- Dowód: grep w `apps/mobile/src` (bez testów) → 0 użyć: `today.exercises`, `today.reviews`, `today.reviewsDue_*`, `today.allLessons` (tylko test BI), `tabs.review`, `review.due_*`, `review.start`, `review.next`, `review.speed`; `i18n:kod` nie zgłasza nieużywanych kluczy.
- Mechanizm: usunięcie ekranu bez sprzątania kluczy (BI zostawił je świadomie do decyzji 09).
- Powraca: nie
- Wzorzec lub źródło: `docs/lokalizacja/jezyki.md:3`.
- Kroki w aplikacji: brak; koszt przy fali przekładu.
- Opcje: usunąć w 13 plikach przy fix 001 albo dopisać do backlogu 09 — rekomendacja: usunąć przy fix (`today.allLessons` z testu zastąpić tekstem `lessons.title`).
- Test akceptacyjny: grep tych kluczy w `apps/mobile/src` i `locales` → 0.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Mieszczenie „Dziś” bez przewijania na 375×667 (BR-MENU-001) i łamanie w środku wyrazu de „Wiederholungen” w kafelku połówkowym na 320 pt przy tekście domyślnym (moje oszacowanie ok. 114 pt szerokości wnętrza kafelka wobec ok. 125–135 pt słowa 17 pt semibold; bez renderu). Brakuje: zrzut z urządzenia/symulatora — pozycja do listy telefonu właściciela.
- `limitZeZuzycia` czyta zegar drugi raz (`apps/mobile/src/features/start/wejscieStartu.ts:15-18`), a `zuzyteDzis` liczono dla dnia z pierwszego odczytu (`apps/mobile/src/features/start/wejscieStartu.ts:26-27`); przed BI oba z jednego `dzien`. Rozjazd tylko przy przejściu przez północ między odczytami (milisekundy) — teoretyczny; propozycja: przekazać `dzien` jako argument.
- Atrybucja licencji BSD-2-Clause (`css-select`, `css-what`, `domhandler`, `domutils`, `nth-check`, `entities`, `domelementtype`) w wersji binarnej: aplikacja nie ma ekranu licencji zewnętrznych (dotyczy też wcześniejszych zależności MIT). Brakuje: czy te moduły trafiają do paczki JS (główne wejście `react-native-svg` vs `react-native-svg/css`) — sprawa dla 05/10, nie blokuje BI.
- Flow 02: przycisk „Zacznij.*” na ekranie startu powtórek przy pustej kolejce — zgodnie z kodem `EkranStartu` jest przy niewyczerpanym limicie; potwierdzi pierwszy przebieg E2E po naprawie 001.

## Co działa dobrze i należy zachować
- Jedna droga limitu: `limitZeZuzycia` w `wejscieStartu.ts` używana i przez `przygotujStart`, i przez „Dziś”; kafelek w stanie limitu nie blokuje i nie omija ekranu startu (test `menu-bi.test.tsx`, limit z prawdziwej bazy).
- Interpretacja „po pierwszej lekcji modułu 2” jako ord ≥ 2 (nie „dokładnie M2”) — użytkownik po ocenie poziomu nie zostaje zablokowany na stałe.
- `react-native-svg` przypięty dokładnie (15.16.0 = `node_modules/expo/bundledNativeModules.json:115`), bez wtyczki i bez zmian w `app.json`.
- Zmienione testy statyczne opisane decyzją D-583, asercje zachowane albo zastąpione równoważną kontrolą.
- Testy ekranów na prawdziwej bazie treści i `postep.db` (node:sqlite), atrapy tylko platformy.

## Decyzje dla właściciela
Brak do właściciela. Do ról: 002 i 005 (tekst/reguła kafelków) — rola 04 z 03; 009 — rola 09. Delegacja z CLAUDE.md: decyzje zapisuje rola, która je podejmie.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-003,08-programista-004,08-programista-006,08-programista-007,08-programista-008,08-programista-010` (001 przed scaleniem; pozostałe ŚR/NIS do backlogu z wersją; 002 i 005 po decyzji 04, 009 w fali 09).

Stan plików śledzonych przed commitem BL (`git status --porcelain`): zmieniony tylko `tests/narzedzia/e2e-flowy.test.mjs` (test odtwarzający 001) oraz nowe pliki tego raportu i `docs/programista/recenzje/dowody/bl-*`.
