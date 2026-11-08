// Metro: monorepo konfiguruje Expo automatycznie (SDK 52+). Dodajemy tylko typ pliku .db (bazy treści dołączane jako zasób).
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('db');

module.exports = config;
