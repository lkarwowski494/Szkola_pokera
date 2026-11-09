// Pakiety z modułami natywnymi podmieniamy w testach w całości (tu: brak; Sentry i EAS Observe usunięte, ADR 0009).

// Język testów: pl (źródło), jawnie — od wydania en pusta lista języków systemu wybierałaby en (wybierzJezyk → ZAPASOWY).
// Jak Trening: `tests/setup.js:4,25` (2e4b0f8, odczyt 2026-11-09). Reszta modułu bez zmian; test może nadpisać `global.__locales`
// albo zamockować moduł u siebie (np. `help`, region). getCalendars zostaje z modułu (strefa: `platform/zegar.ts`).
global.__locales = [{ languageTag: 'pl-PL', languageCode: 'pl', regionCode: null }];
jest.mock('expo-localization', () => ({ ...jest.requireActual('expo-localization'), getLocales: () => global.__locales }));
