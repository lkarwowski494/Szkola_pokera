# Decyzje sesji HL (08 build): react-native-web i zrzuty z Expo web
Pula D-1670…D-1679. Właściciel może każdą zawetować.

## D-1670 · 2026-11-16 · Zrzuty z wejścia zastępczego, nie z pełnej aplikacji
- Decyzja: `react-native-web` ~0.21.4 w `apps/mobile` (devDependencies); zrzuty z Expo web renderują prawdziwe komponenty ekranu scenariusza (`PrzebiegScenariusza`, `StartScenariusza`) przez wejście `apps/mobile/zrzuty-web/wejscie.tsx` na danych testowych (`test-utils/fgScenariusz`). Wejście podstawia `metro.config.js` tylko przy `SZKOLA_ZRZUTY=1` na platformie web; bez zmiennej konfiguracja Metro działa jak wcześniej. Do bundla dodano `wasm` w `assetExts` (expo-sqlite web importuje wa-sqlite.wasm; iOS tego pliku nie importuje).
- Dowód: pełna aplikacja na web (`expo export --platform web` bez wejścia zastępczego) buduje się, ale startuje na ekranie błędu („Something went wrong”): `expo-file-system` jest na web niewspierany („expo-file-system is not supported on web”, konsola Chromium 2026-11-16), a start aplikacji kopiuje bazę treści plikami.
- Odrzucone: (a) shim `expo-file-system` i bazy treści na web: dotyka `apps/mobile/src/data/` (ścieżka wrażliwa), duży zakres, poza zadaniem; (b) zostać przy renderze z drzewa jest (D-1630): zamiennik bez Yoga.
- Analogia: Trening ma `react-native-web ^0.21.0` (`lkarwowski494/trening:package.json:85`, odczyt 2026-11-16) i skrypt `scripts/screens/run.mjs` + `shoot.mjs` (export web + Playwright). Odstępstwo: Trening ma aplikację działającą na web (dane z localStorage); tu pełna aplikacja nie działa, więc wejście zastępcze.
- Zależy od: nowy ekran bez danych w `test-utils` wymaga dopisania do `wejscie.tsx`.

## D-1671 · 2026-11-16 · Wersja i licencje react-native-web
- Decyzja: `~0.21.4` według `expo/bundledNativeModules.json` SDK 58 (`react-native-web: ~0.21.4`, odczyt 2026-11-16). Wcześniej 0.21.3 wchodziło tylko jako peer (auto-install-peers), bez deklaracji.
- Licencje (pole `license` w `package.json` zainstalowanych pakietów, odczyt 2026-11-16): react-native-web, fbjs, inline-style-prefixer, memoize-one, nullthrows, postcss-value-parser, styleq, @react-native/normalize-colors: MIT. Bez GPL/AGPL.
- Odrzucone: `^0.21.0` jak Trening (nie zgadza się z wersją SDK).

## D-1672 · 2026-11-16 · „AX5” na web jako przybliżenie
- Decyzja: `react-native-web` nie stosuje skali czcionki systemu; zrzutowy `Text` (`zrzuty-web/Text.tsx`) mnoży fontSize i lineHeight przez 3,12 (53/17 pt, jak w HH), z sufitem `maxFontSizeMultiplier` i pominięciem `allowFontScaling={false}`. To jeden mnożnik, bez krzywej stylów Dynamic Type; nie zastępuje testu na urządzeniu.
- Skrypt przy AX5 zgłasza przepełnienia jako INFO (znaleziska audytu HH), przy rozmiarze domyślnym jako błąd (kod 1).
- Odrzucone: skalowanie DOM po renderze (zniekształcało karty o stałym rozmiarze, sprawdzone na zrzucie).
