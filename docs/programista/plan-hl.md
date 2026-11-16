# Plan i stan HL (08 build) · 2026-11-16
Zadanie: react-native-web + zrzuty z Expo web (polecenie HL, D-1630 z audytu HH). Stan: zrobione, czeka na przegląd koordynatora.
- Krok 1 `react-native-web ~0.21.4`: commit 1e4a1b5f; `pnpm install --frozen-lockfile` kod 0.
- Krok 2 `pnpm zrzuty:web`: commit 0e9a6cb5; 16 zrzutów `docs/design/dowody/hl-*.png`; decyzje D-1670…D-1672 (`docs/decyzje/HL.md`).
- Krok 3: `expo export --platform ios` kod 0; `pnpm run ci` kod 0 → `docs/programista/dowody/hl-ci-0e9a6cb5.txt`.
Otwarte: wejście zastępcze zna jeden szablon (river-value); kolejne ekrany = dopisek w `apps/mobile/zrzuty-web/wejscie.tsx`. Pełna aplikacja na web nie działa (expo-file-system).
