# Decyzje sesji HW (08 fix): narzędzie zrzutów i luki testów HK
Pula D-1790…D-1799. Właściciel może każdą zawetować. Wejście: `docs/programista/recenzje/recenzja-hm-hk-hl.md` (501, 502, 504); wybór opcji (a) w poleceniu HW.

## D-1790 · 2026-11-16 · 501: fontScale z `?fs=` w `Dimensions` zrzutów web (opcja a)
- Decyzja: przy `SZKOLA_ZRZUTY=1` na web `metro.config.js` podmienia `react-native-web/dist/exports/Dimensions` modułem `apps/mobile/zrzuty-web/Dimensions.ts`, który zwraca `fontScale` z `?fs=` (wspólny parser `zrzuty-web/skala.ts`, używa go też zrzutowy `Text`). Podmiana po ścieżce rozwiązanego pliku, nie po nazwie importu: `useWindowDimensions` i `PixelRatio` w samej paczce importują `../Dimensions` względnie (`node_modules/react-native-web/dist/exports/useWindowDimensions/index.js:11`, `PixelRatio/index.js:11`, odczyt 2026-11-16).
- Dowód: skrypt sprawdza w DOM `flexDirection` rodzica nagłówka przebiegu (column przy `fs=3.12`, row przy 1); czerwony przed (6 problemów, `docs/programista/dowody/hw-zrzuty-przed-501.txt`), zielony po (kod 0). Test resolvera `tests/narzedzia/zrzuty-metro.test.mjs` (czerwony: `hw-501-czerwony.txt`).
- Odrzucone: (b) łatka tekstu zminifikowanej paczki po eksporcie (zależy od postaci kodu, kruche). Zdarzenie `change` (zmiana widoku w skrypcie, 502) też niesie skalę, bo `addEventListener` opakowuje uchwyty.
- Analogia: Trening robi zrzuty z `fullPage` bez symulacji dużego tekstu (`lkarwowski494/trening:scripts/screens/shoot.mjs:36` według recenzji HM, odczyt 2026-11-16; własne wyszukiwanie `fontScale` w repo Trening bez trafień, 2026-11-16). Odstępstwo: brak wzorca do przejęcia.
- Zależy od: nowa wersja react-native-web zmieniająca ścieżkę lub kształt `Dimensions` (test resolvera i kontrola DOM padną).

## D-1791 · 2026-11-16 · 502: widok = wysokość treści, kontrola duplikatów md5 (opcja a)
- Decyzja: przed zrzutem `dopasujWysokosc` (`scripts/zrzuty/hl-zrzuty-lib.mjs`) ustawia wysokość widoku na największy `scrollHeight` w drzewie, w granicach 844…12000 px. Skrypt kończy się kodem 1, gdy na ekranie oceny pasek ocen lub „Zobacz podsumowanie” są poza kadrem albo brak ich w DOM, oraz gdy dwa zrzuty mają ten sam md5.
- Dowód: `scripts/zrzuty/hl-zrzuty-lib.test.mjs` (Chromium, strona z przewijaniem w środku; czerwony: `hw-502-czerwony.txt`); `pnpm zrzuty:web` kod 0; md5 16 zrzutów: `docs/programista/dowody/hw-zrzuty-md5.txt`.
- Odrzucone: (b) seria zrzutów po przewinięciu (więcej plików do przeglądu). Margines nad `scrollHeight` pominięty: `scrollHeight` jest dokładny, a margines 40 px podniósł krótkie ekrany z 844 do 884 px (wykryte testem).
- Zależy od: sufit 12000 px (ekran dłuższy zostanie ucięty bez komunikatu; dziś najdłuższy 5716 px).

## D-1792 · 2026-11-16 · 504: trzy asercje i przypadek nawiasu (opcja a)
- Decyzja: dopisane asercje (kolor `actionInk` nazwy i stopnia, `goldText` dopisku „twój wybór”, ulica bez `minWidth`/`textAlign` przy AX5 i z nimi przy tekście domyślnym) oraz przypadek nawiasu i cudzysłowu po znaku końca zdania (`(top pair.)`, `„Czekam.”`, `「…。」`). Testy sprawdzają też, że tokeny różnią się od zamienników mutantów (`actionInk` ≠ `ink`, `goldText` ≠ `goldOnBg`).
- Dowód: mutanty M3, M4, M6, M13 z `hm-mutanty-skrypt.txt`: przed 4 przeżyły, po 4 zabite (`docs/programista/dowody/hw-mutanty-504.txt`).
- Odrzucone: (b) poprawić tylko nazwy testów (luka zostaje).
