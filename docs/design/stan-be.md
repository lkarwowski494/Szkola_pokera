# Stan sesji BE (rola 04, build): zębatka, menu kafelkowe, scenariusz, ocena
Aktualizacja: 2026-11-10 · gałąź `sesja-be-projekt` @ 00b0566 (start zgodny z poleceniem) · koordynator: polecenie `docs/koordynacja/polecenia/BE.md` @ 02e9b95

## E0 (zakończone, STOP → raport do koordynatora)
- Środowisko: Linux, Node 22.23.4, pnpm install --frozen-lockfile OK, typecheck kod 0, Playwright 1.63.0 (Chromium w `/opt/pw-browsers`), push na gałąź roboczą; bez Xcode (renderu SF Symbols i natywnego paska zakładek nie zobaczę — makieta HTML naśladuje).
- Wejście: KO-035–KO-041 (gałąź `koordynacja`), `apps/mobile/src/app/(tabs)/index.tsx`, `(tabs)/_layout.tsx`, `docs/design/design-spec.md`, `docs/design/tokeny.ts`, 12 plików `apps/mobile/src/i18n/locales/`.
- Zębatka dziś (`apps/mobile/src/app/(tabs)/index.tsx:84-88`): znak tekstowy „⚙︎” w `styl.naglowek` (17 pt, cienka kreska), kolor `ink`, `hitSlop` 12, skala ograniczona do 1,4. Kontrast barw tokenów jest wysoki (ink/bg); słaba widoczność wynika z cienkiej kreski i małego znaku (antyaliasing), nie z tokenu — do potwierdzenia pomiarem na renderze.
- Dziś na ekranie: BlokLekcji → „Ćwiczenia” (2 wiersze) → AdvancementCard → „Wszystkie lekcje” (moduły × lekcje + test modułu). Pasek: Dziś / Powtórki / Postęp. Aplikacja nie ma `react-native-svg` ani `expo-symbols` (`apps/mobile/package.json`).
- Analogia Trening (`lkarwowski494/trening` @ 2e4b0f8, odczyt 2026-11-10): `app/(tabs)/index.tsx:43-53` ekran główny = jedna duża akcja (start) + „Ten tydzień” jako kafelki-przycisk do Postępów; `docs/22-przeplywy-i-nawigacja.md:292-305` wariant A: rzadkie funkcje zeszły z paska do „Więcej”, statystyki dostały zakładkę; `app/(tabs)/more.tsx:17-24` Ustawienia jako wiersz listy w „Więcej”, nie zębatka.
- Najdłuższe etykiety (12 języków): „Wskaźnik zaawansowania” (pl), „Wiederholungen für heute” (de), „Sessão de exercícios” (pt).

## Plan
- A1 zębatka: 2 opcje (ikona rysowana z grubszą kreską w przycisku 44×44 z tłem `surface` vs SF Symbol przez nową zależność), pomiar kontrastu przed/po, zrzut.
- A2 menu: 2 warianty układu (siatka kafelków vs „jedna duża akcja + kafelki”), ekran „Lekcje”, stany (nowy, w trakcie, wszystko zrobione, limit), 320/390, AX5, 12 języków, opis VoiceOver; raport z rekomendacją.
- B po SHA z BD.

## Część A (wykonana 2026-11-10)
- Zębatka D-540, menu W1/W2 D-541 (rek. W1), ekran „Lekcje” D-542; specyfikacja `docs/design/menu-i-zebatka.md`, zrzuty `docs/design/wzorce-zrzuty/menu/`.

## Następny krok
Czekam na wybór W1/W2 (właściciel przez koordynatora) i SHA przekazania BD; potem część B.
