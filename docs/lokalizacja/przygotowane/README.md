# Przygotowane słowniki interfejsu (rola 09)

`en.json` — słownik interfejsu en po przekładzie przez API (przebieg 42635183106, Opus 5.5, źródło @831ebba) i drugim przeglądzie
AI z rozstrzygnięciami (D-345; `../dowody/przeglad-en-2026-11-09/`). Leży tu, a nie w `apps/mobile/src/i18n/locales/`, bo plik
w `locales/` oznacza język wydany: `konfiguracja.test.ts` wymaga wtedy `WYDANE`, `supportedLocales`, `locales/systemowe/en.json`
i polyfillu (K3, reszta). Krok K3: `git mv docs/lokalizacja/przygotowane/en.json apps/mobile/src/i18n/locales/en.json` razem z
konfiguracją wydania, potem `pnpm i18n` i `pnpm run ci` (D-346).
