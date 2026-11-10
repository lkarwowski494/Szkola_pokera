# Przegląd zmian BI w świeżym kontekście (D-043)
2026-11-10 · `git diff 0c24cb6..HEAD` @ ffe748a · subagent bez uzasadnień autora, zakres: zależności/app.json, nawigacja, dane, dostępność, testy zmienione, flowy E2E.

## Wynik
- **P1 (1), naprawione:** `tests/kontrole/k11-sklep.test.ts:98` sprawdzał istnienie usuniętego `apps/mobile/src/app/(tabs)/review.tsx`. Potwierdzone na żywo: `pnpm run ci` @ ffe748a kod 1, k11 AK-K-11-h (`docs/programista/dowody/bi-ci-czerwony-k11-ffe748a.log`). Poprawka: dowód funkcji w `(tabs)/index.tsx` (`mode: 'review'`), asercji nie zdjęto (D-583). Po poprawce `pnpm run ci` kod 0 (`bi-ci-po-k11.log`).
- Brak uwag w pozostałym zakresie: `react-native-svg` 15.16.0 = wersja z `node_modules/expo/bundledNativeModules.json:115`, `app.json` bez zmian (manifest prywatności nietknięty); brak odwołań do `review`/`zakladka-powtorki` poza komentarzem w `pl.kontekst.json` (sam komentarz kontekstu; nieszkodliwe); ekrany tylko czytają `postep.db`, błąd odczytu → `BladOdczytu`; cel dotyku 44 pt, role i etykiety; teksty przez `t()`.
- Założenie nieweryfikowalne bez urządzenia: flow 02 wymaga, by ekran startu powtórek miał „Zacznij” przy pustej kolejce (Maestro uruchomi właściciel/CI iOS).
