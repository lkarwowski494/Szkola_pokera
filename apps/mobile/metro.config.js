// Metro: monorepo konfiguruje Expo automatycznie (SDK 52+). Dodajemy tylko typy plików:
// .db (baza treści dołączana jako zasób) i .sql (migracje Drizzle wczytywane jako tekst).
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('db');
config.resolver.sourceExts.push('sql');

module.exports = config;
