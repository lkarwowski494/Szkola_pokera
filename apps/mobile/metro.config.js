// Metro: monorepo konfiguruje Expo automatycznie (SDK 52+). Dodajemy tylko typy plików:
// .db (baza treści dołączana jako zasób) i .sql (migracje Drizzle wczytywane jako tekst).
// getSentryExpoConfig = domyślna konfiguracja Expo plus identyfikatory map źródeł dla Sentry (ADR-17).
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const config = getSentryExpoConfig(__dirname);
config.resolver.assetExts.push('db');
config.resolver.sourceExts.push('sql');

module.exports = config;
