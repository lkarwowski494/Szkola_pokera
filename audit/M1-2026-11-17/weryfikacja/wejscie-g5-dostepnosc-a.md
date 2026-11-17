### 04-studio-projektowe-001 · Pasek strategii po ocenie nie pokazuje granicy między akcjami innymi niż pas
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: procenty niosą podpisy i etykieta VoiceOver)
- Realność: realny · Pewność: wysoka
- Dowód: `apps/mobile/src/components/PasekStrategii.tsx:159` każdy segment nie-pas ma wypełnienie `raiseFill` i granicę `onFelt`; `apps/mobile/src/theme/tokeny.ts:23` i `apps/mobile/src/theme/tokeny.ts:40` oba mają wartość `#FFFDF7`, więc granica ma kontrast 1:1 do obu sąsiadów. Zrzut `zrzuty/po-ocenie-390-jasny.png` (CO, J9o: pas 10%, sprawdzenie 70%, przebicie 20%): oś pokazuje ciemny pas i jeden kremowy blok 90%. Makieta zna tylko dwa segmenty (`docs/design/ekrany/e3.css:115`), więc projekt nie ma stylu dla drugiej akcji nie-pas. Szczegóły: `dowody/f-pasek-granica.txt`.
- Kroki w aplikacji: lekcja albo sesja z zadaniem strategii o trzech akcjach (pas, sprawdzenie, przebicie) → wybór → ocena: pasek nie pokazuje, ile z 90% to sprawdzenie, a ile przebicie.

### 04-studio-projektowe-003 · Kontrolka poziomu scenariusza ucina nazwy poziomów przy dużym tekście
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: wybór „Automatycznie” jest domyślny, a zdanie pod kontrolką podaje bieżący poziom)
- Realność: realny · Pewność: wysoka
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:244` wiersz segmentów bez zawijania (`flexDirection: 'row'`, `overflow: 'hidden'`), `apps/mobile/src/features/scenariusz/komponenty.tsx:245` segment `flex: 1`; tekst `styl.drobny` bez sufitu. Zrzut `zrzuty/start-320-jasny-ax5.png`: słowo Automatycznie widać jako „omatyc”; `dowody/zrzuty-web.txt`: Automatycznie poza ekranem przy 390 i 320 pt AX5, oba motywy. Ten sam wynik był w pomiarze sesji HH (`docs/design/dowody/hh-przepelnienie.txt:207`), bez znaleziska.
- Kroki w aplikacji: Rozmiar tekstu AX5 → Scenariusze → wybierz scenariusz → ekran startu: nazwy poziomów ucięte.

### 04-studio-projektowe-004 · Liczby wyników (wskaźnik, wynik sesji) w stałych rozmiarach poza skalą nie mieszczą się przy AX5
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: ta sama liczba jest w etykiecie VoiceOver i w wierszu „Wiedza N”)
- Realność: realny · Pewność: wysoka (rachunek; zrzut iOS nie wykonany)
- Dowód: `apps/mobile/src/features/advancement/AdvancementCard.tsx:61` liczba 30 pt w kole `apps/mobile/src/features/advancement/AdvancementCard.tsx:59` 72×72 pt; `apps/mobile/src/app/session.tsx:661` wynik sesji 56 pt; `apps/mobile/src/app/advancement.tsx:98` 56 pt. Przy AX5: 93,6 pt w kole 72 pt (wychodzi poza plakietkę i nachodzi na tytuł w pionowym stosie), „12/15” ok. 175 pt nie mieści się w 288 pt i łamie się w środku liczby. Rachunek: `dowody/f-liczby-ax5.txt`.
- Kroki w aplikacji: AX5 → zakładka Postęp (plakietka wskaźnika); zakończ sesję albo egzamin (ekran wyniku).

### 08-programista-006 · Rozmiary i krój tekstu wpisane na sztywno w 6 miejscach poza modułem motywu
- Katalog dowodów: audit/M1-2026-11-17/role/08-programista/
- Poziom: P2
- Realność: realny (poza systemem projektowym), skutek brzegowy (duży tekst) · Pewność: wysoka
- Dowód: `apps/mobile/src/app/session.tsx:660-661` (28 i 56 pt), `apps/mobile/src/app/advancement.tsx:98` (56 pt), `apps/mobile/src/features/advancement/AdvancementCard.tsx:61` (30 pt), `apps/mobile/src/components/PaintGrid.tsx:189-190` (8 pt), `apps/mobile/src/components/RangeGrid.tsx:63` (8 pt), `apps/mobile/src/components/Blocks.tsx:119` (`fontFamily: 'Menlo'`); grep: dowody/dev11-tokeny.txt
- Kroki w aplikacji: wynik sesji („12/15”) i wskaźnik zaawansowania przy AX5 skalują 56 pt bez sufitu, który mają tytuły (D-122); na 320 pt liczba może wyjść poza ekran — niesprawdzone zrzutem (do roli 04).

### 04-studio-projektowe-005 · Tytuły w Literacie nie reagują na „Pogrubiony tekst”
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: tytuły mają już wagę 600, treść systemowa reaguje)
- Realność: realny · Pewność: wysoka
- Dowód: w `apps/mobile/src` 0 trafień `BoldText`; w aplikacji jest jeden plik kroju `apps/mobile/assets/fonts/Literata-SemiBold.ttf`; RN 0.88.1 ma `isBoldTextEnabled` (`node_modules/react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo.js:86`). Uzasadnienie wyboru kroju w `docs/design/02-kierunki.md:170` zakładało reakcję na ustawienie Pogrubiony tekst. `dowody/f-pogrubiony.txt`.
- Kroki w aplikacji: Ustawienia iOS → Dostępność → Wyświetlanie i rozmiar tekstu → Pogrubiony tekst → tytuły w aplikacji bez zmiany, treść pogrubiona.

### 04-studio-projektowe-006 · Linki „Słowniczek” i „Pomoc” na ekranie Postęp mają cel dotyku 24 pt
- Katalog dowodów: audit/M1-2026-11-17/role/04-studio-projektowe/
- Poziom: P1 (WYSOKIE, bez blokady wg CLAUDE.md pkt 1: Pomoc jest też w Ustawieniach jako wiersz 44 pt; 24 pt spełnia WCAG 2.2 AA 2.5.8, nie spełnia minimum HIG 28 pt)
- Realność: realny · Pewność: wysoka
- Dowód: `apps/mobile/src/app/(tabs)/progress.tsx:78` i `apps/mobile/src/app/(tabs)/progress.tsx:81`: `Pressable` bez stylu, `minHeight` i `hitSlop`; wysokość = wiersz `styl.tresc` 24 pt. Słowniczek ma tylko to wejście (`grep "'/glossary'"` → 1 trafienie). `dowody/f-linki-postep.txt`.
- Kroki w aplikacji: zakładka Postęp → „Słowniczek”/„Pomoc” na dole ekranu.

