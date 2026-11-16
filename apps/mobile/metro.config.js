// Metro: monorepo konfiguruje Expo automatycznie (SDK 52+). Dodajemy tylko typ pliku .db (bazy treści dołączane jako zasób).
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('db');
// Expo web (zrzuty, HL): expo-sqlite na web importuje wa-sqlite.wasm jako zasób; iOS tego pliku nie importuje.
config.resolver.assetExts.push('wasm');

// HL (D-1670): zrzuty ekranów z Expo web. Tylko przy SZKOLA_ZRZUTY=1 i platformie web wejście aplikacji zastępuje `zrzuty-web/wejscie.tsx`;
// bez zmiennej (build iOS, CI) konfiguracja zachowuje się jak dotąd.
if (process.env.SZKOLA_ZRZUTY === '1') {
  const poprzedni = config.resolver.resolveRequest;
  config.resolver.resolveRequest = (kontekst, nazwa, platforma) => {
    if (platforma === 'web' && /expo-router\/entry(\.js)?$/.test(nazwa)) return { type: 'sourceFile', filePath: require('path').join(__dirname, 'zrzuty-web', 'wejscie.tsx') };
    // babel-plugin-react-native-web zamienia importy na `react-native-web/dist/exports/<Komponent>`; podmieniamy tylko Text (skala czcionki).
    if (platforma === 'web' && nazwa === 'react-native-web/dist/exports/Text' && !kontekst.originModulePath.includes('zrzuty-web')) return { type: 'sourceFile', filePath: require('path').join(__dirname, 'zrzuty-web', 'Text.tsx') };
    return (poprzedni ?? kontekst.resolveRequest)(kontekst, nazwa, platforma);
  };
}

module.exports = config;
