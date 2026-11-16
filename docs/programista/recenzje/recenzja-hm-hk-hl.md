# Audyt: Programista — Szkoła Pokera — 2026-11-16 (recenzja niezależna HK i HL)
Commity: HK `375efeff` (diff `0b0855ef..375efeff`), HL `cf296709` (diff `0b0855ef..cf296709`); pomiar na lokalnym scaleniu HK+HL `39d90fb9` (niewypchniętym). Tryb: audit, sesja HM. Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0, Playwright Chromium (wbudowany), sieć do raw.githubusercontent.com dostępna. Bez macOS, Xcode i iPhone'a: iOS sprawdzony tylko eksportem paczki (`expo export --platform ios`), a „AX5” tylko jako przybliżenie w Chromium. Odwołania `plik:linia` w tym raporcie dotyczą drzewa `39d90fb9` (kod HK i HL nie leży na gałęzi `claude/sesja-hm-recenzja`).

## Podsumowanie
**HK: PRZYJĄĆ Z UWAGAMI.** Poprawki 001, 002 i 003 działają na zrzutach z prawdziwym układem: pasek ocen jest granatowy z segmentami i złotą obwódką wyboru, przy AX5 układa się w pionowy stos bez dzielenia wyrazów; nagłówek przebiegu i dziennik przy AX5 przechodzą w kolumnę. Poprawka 006 skraca tytuł startu SC-29 z 11 do 5 wierszy przy 390 pt, ale kryterium audytu (≤ 3 wiersze) nie jest spełnione. HK zgłosił to sam w D-1660, więc potrzebna jest decyzja. 404: 7 z 7 mutantów HK zabitych w moim przebiegu. Testy HK łapią 9 z 13 moich mutantów. Cztery przeżyły (kolory tekstu na granacie, `minWidth` ulicy przy AX5, nawias po kropce) i to są luki P2.
**HL: PRZYJĄĆ Z UWAGAMI.** `react-native-web ~0.21.4` zgadza się z SDK 58 i ma tylko licencje MIT. Paczka JS dla iOS przed HL i po HL jest identyczna bajt w bajt, a CI na scaleniu ma kod 0. Narzędzie zrzutów ma jednak dwie wady P1. „AX5” skaluje tylko czcionkę, a układ zostaje jak przy tekście domyślnym (react-native-web ma stałe `fontScale: 1`). Zrzut z `fullPage` kończy się na 844 px, więc pasek ocen i werdykt AX5 nie trafiają na żaden zrzut: 6 zrzutów AX5 HL to dwie trójki identycznych plików. Te zrzuty nie mogą być dowodem w audytach, dopóki wady nie zostaną naprawione (D-1682).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-501 | P1 | D | HL: zrzuty „AX5” pokazują układ z tekstu domyślnego (fontScale na web = 1), więc nie widać poprawek AX5 | otwarte |
| 08-programista-502 | P1 | D | HL: zrzut kończy się na 844 px, ocena (werdykt AX5, pasek ocen) poza kadrem; zrzuty AX5 identyczne bajtowo | otwarte |
| 08-programista-503 | P2 | P | HK 006: tytuł startu SC-29 ma 5 wierszy przy 390 pt (kryterium audytu ≤ 3) | otwarte |
| 08-programista-504 | P2 | D | HK: testy 001/002/006 nie łapią 4 z 13 mutantów (kolory na granacie, minWidth ulicy przy AX5, nawias po kropce) | otwarte |

## Linia bazowa i założenia
Najpierw, przed porównaniem z deklaracjami autorów, ustaliłem z kodu i specyfikacji `docs/design/scenariusz-i-ocena.md`, co ma być prawdą. Pasek ocen ma mieć te same segmenty co pasek przed decyzją: słowo stopnia, złotą obwódkę wyboru i żadnych procentów. Przy dużym tekście segmenty układają się w kolumnę, nagłówek przebiegu idzie w pionowy stos, a dziennik pokazuje ulicę nad wpisem. Tytuł startu nie może być akapitem. Narzędzie zrzutów ma pokazywać to, co zobaczy użytkownik iPhone'a przy AX5. Zależność web nie może zmienić aplikacji iOS.

Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone, brak. Diff HK i HL nie dotyka `packages/postep/`, `apps/mobile/src/data/` ani schematu (`git diff --stat`, sekcja Pokrycie).
- Obsługa błędów: sprawdzone, brak nowych ścieżek. `podzielSytuacje` jest czystą funkcją i zawsze zwraca wynik (pusty tekst daje tytuł pusty i resztę null).
- Typy na granicach: sprawdzone. `zrzuty-web/Text.tsx` czyta `?fs=` przez `Number(...) || 1`, poza aplikacją. Danych z zewnątrz w HK brak.
- System projektowy: sprawdzone. Pasek ocen ma tylko tokeny (`actionBg`, `actionEdge`, `actionInk`, `gold`, `goldText`). Kontrast wszystkich par ≥ 8:1 w czterech motywach (`dowody/hm-kontrast-licencje.txt`).
- i18n: sprawdzone. Nowych napisów brak; podział zdań na 35 bazach treści w `dowody/hm-podzial-35-jezykow.txt`.
- Wydajność: sprawdzone, brak. Podział zdania liczony przy każdym renderze startu, liniowo po kilkuset znakach.
- Testy na właściwym poziomie: logika podziału w czystym teście, ekrany w RNTL. Mutanty: `dowody/hm-mutanty.txt`.
- Dostępność: sprawdzone. Tytuł zostaje nagłówkiem, reszta sytuacji zwykłym tekstem (VoiceOver czyta oba); etykieta paska ocen bez zmian.
- Liczby konfiguracyjne: `SKALA_BEZ_PASKA` (2,5) wyeksportowana i użyta w trzech miejscach zamiast nowej stałej, co jest dobre.

Soczewki: użytkownik z dużym tekstem (zrzuty AX5 z łatką `fontScale`), recenzent szukający ścieżki bez testu (13 mutantów własnych), programista czytający moduł pierwszy raz (komentarze `zdanie.ts`, `metro.config.js`). Subagentów nie użyłem, bo zakres obejmuje dwa małe diffy.
Wzorzec: Trening robi zrzuty z Expo web z `fullPage` (repo `lkarwowski494/trening`, plik `scripts/screens/shoot.mjs`, linia 36, odczyt 2026-11-16) i nie symuluje dużego tekstu. Wynika z tego, że wzorzec Treningu nie wystarczy do audytu AX5 (D-1680).
Rejestr założeń: bez zmian proponowanych.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| HK: `EkranScenariusza.tsx`, `komponenty.tsx`, `zdanie.ts`, 6 plików testów, `docs/decyzje/HK.md` | tak, cały diff | odczyt diffu; mutanty `dowody/hm-mutanty.txt`; zrzuty `hm-*.png` w katalogu dowodów |
| HK 404: test bramki 402 | tak | skrypt HK ponownie: `dowody/hm-mutanty-404.txt` (7/7 zabitych) |
| HK 006 na treści 35 języków | tak | `dowody/hm-podzial-35-jezykow.txt` (630 szablonów, 178 podzielonych) |
| HL: `metro.config.js`, `apps/mobile/package.json`, `pnpm-lock.yaml`, `zrzuty-web/*`, `scripts/zrzuty/hl-zrzuty.mjs`, `docs/decyzje/HL.md`, `CLAUDE.md` | tak, cały diff | odczyt; licencje `dowody/hm-kontrast-licencje.txt`; iOS `dowody/hm-ios-bez-zmian.txt` |
| HL: 16 zrzutów `docs/design/dowody/hl-*.png` | tak | md5 i podgląd (sekcja 502) |
| Ekrany start, decyzja, ocena zgodna/błąd: 390 i 320, domyślny i AX5 | tak, w Chromium | `dowody/hm-pomiar.txt` |
| CI na scaleniu | tak | `dowody/hm-ci-39d90fb9.txt` (kod 0) |
| Motyw ciemny, zwiększony kontrast, iPhone, VoiceOver, Dynamic Type z krzywą stylów | nie sprawdzono (brak iOS; render web tylko jasny) | lista dla telefonu w „Decyzje” |
| Pozostałe języki na ekranie startu (zrzuty) | nie (tylko rachunek podziału) | `dowody/hm-podzial-35-jezykow.txt` |

Zadanie 3 polecenia HM, znalezisko → zrzut → wynik (Chromium, łatka `fontScale` i pełna wysokość według D-1680):

| Znalezisko audytu HH | Zrzut | Wynik |
|---|---|---|
| 04-studio-projektowe-001 (pasek ocen, 390 domyślny) | `dowody/hm-ocena-blad-390.png`, `dowody/hm-ocena-zgodna-390.png` | zgodne: granatowe segmenty, złota obwódka i „twój wybór”, bez procentów |
| 04-studio-projektowe-001 (pasek ocen, 320 AX5) | `dowody/hm-ocena-blad-320-ax5.png` | zgodne: pionowy stos, wyrazy niedzielone |
| 04-studio-projektowe-002 (nagłówek przebiegu AX5) | `dowody/hm-decyzja-320-ax5.png` (bez łatki: `dowody/hm-bezfs-decyzja-320-ax5.png`) | zgodne z łatką (kolumna); bez łatki wiersz, czyli zrzut HL tego nie pokazuje (501) |
| 04-studio-projektowe-003 (dziennik AX5) | `dowody/hm-ocena-blad-320-ax5.png` | zgodne: ulica nad wpisem |
| 04-studio-projektowe-006 (tytuł startu SC-29) | `dowody/hm-start-sc29-390.png`, `dowody/hm-start-sc29-320.png`, `dowody/hm-start-sc29-390-ax5.png`, `dowody/hm-start-sc29-320-ax5.png` | niezgodne z kryterium ≤ 3: 5 / 6 / 7 / 7 wierszy (503); poprawa z 11 |
| Kontrola regresji: ekran decyzji, domyślny rozmiar | `dowody/hm-decyzja-390.png` | zgodne, bez regresji |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-hm-hk-hl.md <drzewo 39d90fb9> docs/programista/recenzje --rola 08-programista` → kod 0, wynik: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”. Ręczny grep dowodów na adres e-mail i klucze: jedyne trafienie to `risk-of-ruin` (wzorzec `sk-`), czyli fałszywy alarm.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (`podzielSytuacje` = logika czysta) | ok: test z wektorami 7 przypadków i 35 bazami treści; luka nawiasu: 08-programista-504 |
| DEV-02 | dotyczy | ok 6/6: każdy commit HK zmieniający zachowanie ma test w tym samym commicie (1f546ffd, 2cad9d93, 30fe422c, 41e43136, 87ede1d4; bdd6a4ed tylko testy); HL bez zmian zachowania aplikacji |
| DEV-03 | dotyczy | ok: brak `.skip`, `.only`, pustych asercji w nowych testach |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0, 148 zestawów i 1464 testy aplikacji (`dowody/hm-ci-39d90fb9.txt`) |
| DEV-05 | nie dotyczy: diff nie zapisuje danych | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w diffie | — |
| DEV-07 | dotyczy (fallback `?fs=` w `Text.tsx`) | ok: narzędzie deweloperskie, 1 = tekst domyślny |
| DEV-08 | nie dotyczy: brak dat w diffie | — |
| DEV-09 | dotyczy (`zrzuty-web`, adres strony) | ok: `typy.d.ts` deklaruje tylko moduły web; brak danych użytkownika |
| DEV-10 | nie dotyczy: brak nowych ścieżek błędu | — |
| DEV-11 | dotyczy | ok: tylko tokeny; kontrast `dowody/hm-kontrast-licencje.txt` |
| DEV-12 | dotyczy | ok: brak nowych napisów; podział działa w 35 bazach |
| DEV-13 | dotyczy | ok: `SKALA_BEZ_PASKA` użyta zamiast nowej stałej; `AX5 = 3.12` tylko w narzędziu i testach |
| DEV-14 | dotyczy | ok: brak sekretów w diffie i dowodach |
| DEV-15 | nie dotyczy: brak timerów i nasłuchów | — |
| DEV-16 | dotyczy (skala tekstu) | ok w aplikacji; w narzędziu skala czcionki bez skali układu: 08-programista-501 |

## Znaleziska (szczegóły)

### 08-programista-501 · HL: zrzuty „AX5” pokazują układ z tekstu domyślnego, więc nie widać poprawek dla dużego tekstu
- Pozycja listy kontrolnej: DEV-16
- Poziom: P1 (narzędzie deweloperskie; nie blokuje wydania, ale jego zrzuty AX5 nie mogą być dowodem, D-1682)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: react-native-web ma stałą skalę (`node_modules/react-native-web/dist/exports/Dimensions/index.js:17`, w kodzie `fontScale: 1`), a zrzutowy `apps/mobile/zrzuty-web/Text.tsx:16` mnoży tylko `fontSize`/`lineHeight`. `useWindowDimensions().fontScale` (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:218`) i `PixelRatio.getFontScale()` (`apps/mobile/src/features/scenariusz/komponenty.tsx:103`) zwracają 1. Pomiar bez łatki: nagłówek przy AX5 w wierszu, tytuł startu SC-29 ma 87,36 px i 17 wierszy (bez `sufitTytulu`); z łatką: kolumna, 39 px, 7 wierszy (`dowody/hm-pomiar.txt`; zrzuty `dowody/hm-bezfs-decyzja-320-ax5.png` vs `dowody/hm-decyzja-320-ax5.png`, `dowody/hm-bezfs-start-sc29-390-ax5.png` vs `dowody/hm-start-sc29-390-ax5.png`).
- Mechanizm: skala tylko w `Text`, a wszystkie decyzje układu od skali tekstu czytają `fontScale`; `grep -rn "fontScale\|getFontScale" apps/mobile/src --include=*.tsx --include=*.ts` w kodzie bez testów obejmuje m.in. `SKALA_BEZ_PASKA`, `podstawaSegmentu`, `sufitTytulu`, `PasekStrategii`.
- Powraca: nie
- Wzorzec lub źródło: zasada 2 (dowód zamiast deklaracji); D-1672 sam nazywa „AX5” przybliżeniem, ale nie wymienia, że układ się nie przełącza.
- Kroki w aplikacji: brak (narzędzie). Skutek: audyt roli 04 na tych zrzutach widziałby stan, którego na iPhone nie ma.
- Opcje: (a) w `metro.config.js` przy `SZKOLA_ZRZUTY=1` podstawić także `react-native-web/dist/exports/Dimensions` modułem z `fontScale` z `?fs=` (tak jak `Text`): prawdziwe gałęzie układu, mały diff w narzędziu; (b) łatka tekstu paczki po eksporcie (jak `dowody/hm-pomiar-skrypt.txt`): działa od razu, ale zależy od postaci zminifikowanego kodu. Rekomendacja: (a). Do tego trzeba ponownie zrobić albo usunąć `docs/design/dowody/hl-*-ax5.png`.
- Test akceptacyjny: `hl-decyzja-320-ax5.png` z nagłówkiem w kolumnie (Zakończ, Scenariusz, River jeden pod drugim) i tytuł startu w rozmiarze po `sufitTytulu`; skrypt sprawdza w DOM `flexDirection: column` rodzica nagłówka przy `fs=3.12`.
- Status: otwarte

### 08-programista-502 · HL: zrzut kończy się na 844 px, a ocena (werdykt przy AX5, pasek ocen) wypada poza kadr
- Pozycja listy kontrolnej: DEV-04
- Poziom: P1 (narzędzie; zrzuty oceny nie pokazują znaleziska 001, które miały dowieść)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `scripts/zrzuty/hl-zrzuty.mjs:35` (widok 844) i `scripts/zrzuty/hl-zrzuty.mjs:54` (`fullPage: true`). Ekran przewija się wewnątrz ScrollView, więc dokument ma wysokość okna. md5 zrzutów HL: `hl-decyzja-390-ax5`, `hl-ocena-blad-390-ax5` i `hl-ocena-zgodna-390-ax5` mają ten sam skrót c2ac1156…, a trójka 320-ax5 ma f21114a0…. Przy 390 domyślnym `hl-ocena-blad-390.png` kończy się na bloku „Dlaczego” bez paska ocen. Po powiększeniu widoku do wysokości treści pasek jest widoczny (`dowody/hm-ocena-blad-390.png`, `dowody/hm-ocena-blad-320-ax5.png`).
- Mechanizm: `fullPage` mierzy dokument, a nie przewijany element; to samo dotyczy każdego przyszłego ekranu dłuższego niż 844 px.
- Powraca: nie
- Wzorzec lub źródło: zasada 2. Trening też ma `fullPage` (repo `lkarwowski494/trening`, plik `scripts/screens/shoot.mjs`, linia 36), ale tam strona przewija dokument.
- Kroki w aplikacji: brak (narzędzie).
- Opcje: (a) przed zrzutem ustawić wysokość widoku na `scrollHeight` najwyższego elementu (sposób z `dowody/hm-pomiar-skrypt.txt`), mały diff; (b) seria zrzutów po przewinięciu ScrollView, więcej plików do przeglądu. Rekomendacja: (a).
- Test akceptacyjny: zrzut `hl-ocena-blad-320-ax5.png` zawiera pasek ocen i przycisk „Zobacz podsumowanie”; żadne dwa zrzuty różnych ekranów nie mają tego samego md5 (kontrola w skrypcie).
- Status: otwarte

### 08-programista-503 · HK 006: tytuł startu SC-29 ma 5 wierszy przy 390 pt zamiast najwyżej 3
- Pozycja listy kontrolnej: DEV-11
- Poziom: P2
- Realność: realny · Pewność: wysoka (pomiar w Chromium; iOS z innym fontem może się różnić o wiersz)
- Rodzaj: P
- Dowód: `dowody/hm-pomiar.txt`: SC-29 (pl) tytuł 5 wierszy przy 390, 6 przy 320, 7 przy AX5 390 i 320; zrzut `dowody/hm-start-sc29-390.png`. Pierwsze zdanie SC-29 pl ma 106 znaków (`dowody/hm-podzial-35-jezykow.txt`). HK przewidział 4–5 wierszy i nazwał kryterium „NIEPOTWIERDZONE” w D-1660 (`docs/decyzje/HK.md:6`). Poprawa względem stanu sprzed HK: 11 → 5 wierszy.
- Mechanizm: opcja (a) z audytu HH bierze pierwsze zdanie, a w SC-22/25/29 pierwsze zdanie ma 105–106 znaków pl (en 79, de 72). Kryterium audytu (≤ 3) nie da się spełnić bez zmiany treści albo stylu.
- Powraca: nie
- Wzorzec lub źródło: audyt HH 04-studio-projektowe-006, test akceptacyjny „tytuł najwyżej 3 wiersze”; decyzja właściciela „(a) 1. zdanie tytułem” (D-1660).
- Kroki w aplikacji: Scenariusze → SC-29 (także SC-22, SC-25).
- Opcje: (a) przyjąć 5 wierszy jako wynik decyzji właściciela i zmienić kryterium 006 (decyzja roli 04): zero pracy, tytuł nadal długi; (b) krótkie pole tytułu w szablonie (rola 06, 35 szablonów × 12 języków źródłowych): tytuł 1–2 wiersze, dużo pracy; (c) mniejszy styl tytułu (np. `naglowek`) dla sytuacji dłuższej niż N znaków: jedna zmiana kodu, ale hierarchia zależy od długości. Rekomendacja: (a) teraz, a (b) przy następnym przeglądzie treści roli 06.
- Test akceptacyjny: decyzja roli 04 zapisana z nowym kryterium albo zrzut SC-29 390 z tytułem ≤ 3 wiersze.
- Status: otwarte

### 08-programista-504 · HK: testy poprawek nie łapią 4 z 13 mutantów
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2
- Realność: brzegowy (kod jest dziś poprawny, luka dotyczy przyszłej regresji) · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/hm-mutanty.txt`, przeżyły: M3 (dopisek „twój wybór” kolorem `goldOnBg` na granacie, kontrast jasnego motywu ok. 2:1 zamiast 13,5:1), M4 (nazwa akcji kolorem `ink` na granacie), M6 (ulica przy AX5 zachowuje `minWidth: 64` i wyrównanie do prawej; nazwa testu w `apps/mobile/src/features/scenariusz/__tests__/hk-naglowek-ax5-002.test.tsx:43` obiecuje „ulica bez minWidth 64”, a asercja w linii 44 sprawdza tylko kierunek), M13 (zamykający nawias po kropce nie wchodzi do tytułu; test w `apps/mobile/src/features/scenariusz/__tests__/hk-zdanie-006.test.ts:19` obiecuje „nawias zamykający wchodzi do tytułu”, ale fixture ma nawias przed `。`). Zabite: 9/13 (M1, M2, M5, M7–M12). Drzewo po przebiegu czyste.
- Mechanizm: asercje sprawdzają układ (podstawa, kierunek), a nie kolory i pozostałe pola stylu, choć nazwy testów je obiecują.
- Powraca: nie
- Wzorzec lub źródło: zasada 11; prompt roli, „Dobry test”.
- Kroki w aplikacji: brak (regresja byłaby widoczna: nieczytelny dopisek „twój wybór” na granacie).
- Opcje: (a) dopisać 3 asercje (kolor `actionInk` nazwy, `goldText` dopisku, brak `minWidth` ulicy przy AX5) i jeden przypadek `「…」。` albo `(… .)`: mały diff; (b) zostawić i poprawić nazwy testów, żeby nie obiecywały więcej: najtańsze, luka zostaje. Rekomendacja: (a).
- Test akceptacyjny: mutanty M3, M4, M6 i M13 z `dowody/hm-mutanty-skrypt.txt` zabite.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- `podzielSytuacje` dzieli po skrócie przed wielką literą: „Du hast z. B. Könige.” daje tytuł „Du hast z.”, a „Rywal vs. BB czeka.” tytuł „Rywal vs.” (sonda w scratchpadzie). W 630 sytuacjach 35 baz takich skrótów jest 0, więc dziś to problem teoretyczny. Brakuje decyzji, czy bramka `content:check` ma odrzucać takie skróty w pierwszym zdaniu.
- Przy AX5 w Chromium poza ekranem zostają: „Automatycznie” (kontrolka poziomu), „Scenariusze” (przycisk wstecz 320), „sprawdzających” (długie słowo) i „Zobacz podsumowanie” (`dowody/hm-pomiar.txt`). To elementy spoza diffu HK; HH zapisał, że Chromium ucina, a iOS łamie wyraz. Do potwierdzenia na telefonie.
- Bajtkod `.hbc` iOS różni się między eksportami przed HL i po HL, choć nazwa pliku (hash treści) i JS są identyczne (`dowody/hm-ios-bez-zmian.txt`). Najpewniej to niedeterminizm kompilacji Hermes; brakuje eksportu dwa razy z tego samego commitu, który by to potwierdził.
- Przy AX5 segmenty paska ocen w stosie nie mają poziomej linii między wierszami; obwódka wybranego segmentu oddziela je tylko wtedy, gdy to on jest w stosie. Brakuje makiety pionowego stosu paska ocen (rola 04).

## Co działa dobrze i należy zachować
- HK 001: zamiast przerabiać `PasekStrategii` (który po ocenie pokazuje procenty), dodano osobny wariant na tych samych tokenach (D-1661). Zgadza się to ze spec, która wymaga paska bez procentów (`dowody/hm-ocena-blad-390.png`).
- HK 006: podział zdania działa na wszystkich 35 bazach. W 178 podzielonych sytuacjach żadna nie została ucięta na skrócie („ok.”, „np.”, „VPIP 35%”), a japoński i chiński są dzielone po `。` (`dowody/hm-podzial-35-jezykow.txt`).
- HK 404: test obejmuje każdy poziom i punkt 1, a 7 z 7 mutantów zabitych (`dowody/hm-mutanty-404.txt`).
- HL: resolver zastępczy działa tylko przy `SZKOLA_ZRZUTY=1` i na web, a paczka JS dla iOS jest identyczna bajt w bajt (`dowody/hm-ios-bez-zmian.txt`). `wasm` w `assetExts` jest dodane bezwarunkowo (`apps/mobile/metro.config.js:7`), ale też bez wpływu na iOS.
- HL: wersja z `bundledNativeModules.json` SDK 58 i same licencje MIT, zgodnie z D-1671.

## Decyzje dla właściciela
1. HK 006 (08-programista-503): przyjąć 5 wierszy tytułu SC-29 jako wynik decyzji „(a) 1. zdanie tytułem” i zmienić kryterium (rekomendacja), czy zlecić krótkie pole tytułu (rola 06).
2. HL: naprawa 501 i 502 (sesja 08 fix, mały diff w narzędziu) przed kolejnym audytem wyglądu z `pnpm zrzuty:web`; do tego czasu zrzuty AX5 HL nie są dowodem (D-1682). Alternatywa: usunąć pliki `hl-*-ax5.png` z `docs/design/dowody/`.
3. Lista na telefon (iPhone, AX5 i domyślny, jasny i ciemny): SC-29 start (liczba wierszy tytułu), dowolny scenariusz z oceną (pasek ocen w stosie, nagłówek w kolumnie, dziennik „ulica nad wpisem”), VoiceOver na tytule i reszcie sytuacji.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-501,08-programista-502,08-programista-504` (503 po decyzji z punktu 1).

`git status --porcelain` na gałęzi `claude/sesja-hm-recenzja` przed commitem: tylko nowe pliki (`docs/decyzje/HM.md`, `docs/programista/plan-hm.md`, ta recenzja, `docs/programista/recenzje/dowody/hm-*`); pliki śledzone nietknięte (wynik w `dowody/hm-git-status.txt`).
