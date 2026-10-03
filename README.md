# Szkoła Pokera

Aplikacja iOS do nauki No-Limit Texas Hold'em od zera, po polsku. Dokumentacja projektu (wymagania, architektura, decyzje ADR, backlog) jest w folderze „Szkoła Pokera” na Google Drive.

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `apps/mobile` | Aplikacja Expo (SDK 57, Expo Router, expo-sqlite + Drizzle, Zustand, i18next) |
| `packages/poker-core` | Silnik pokera w czystym TypeScript: karty, ocena rąk, equity, zakresy, outy, matematyka, generatory zadań |
| `packages/srs` | Powtórki FSRS na poziomie rodzin zadań |
| `packages/content-schema` | Schematy treści (Zod), wspólne dla aplikacji i potoku treści |
| `tools/content-build` | Kompiluje `content/` do `apps/mobile/assets/content/content-vN.db` (N = `CONTENT_SCHEMA_VERSION` w `packages/content-schema`) |
| `content/` | Treść: `numbers.yaml` (jedyne źródło liczb), `pl/modules.yaml`, `pl/rules.yaml`, `pl/lessons/*.md` |

## Wymagania

- Node.js 22.13 lub nowszy (LTS), `corepack enable` (włącza pnpm 10)
- Konto Expo i płatne konto Apple Developer
- iPhone z iOS 16.4+ z włączonym trybem dewelopera

## Codzienne komendy

```bash
pnpm install            # zależności całego repo
pnpm run ci             # typy, testy wszystkich pakietów, aktualność bazy treści
pnpm content:build      # po każdej zmianie w content/
pnpm --filter @szkola/mobile start   # serwer Metro dla development builda
pnpm --filter @szkola/poker-core bench   # pomiar wydajności w Node (to samo co ekran „Pomiar wydajności” w aplikacji)
```

## Aplikacja na iPhonie (ad hoc, jak Trening)

Wszystko z przeglądarki, bez Maca i bez terminala. Aplikacja instaluje się z linku, ma własną ikonę i działa bez komputera; podpis jest ważny ok. roku.
Kompilacja odbywa się na darmowym Macu w GitHub Actions (repozytorium publiczne, bez limitu minut), więc nie zużywa limitu 15 buildów iOS miesięcznie w Expo.

Jednorazowo:
1. Sekrety w GitHubie (Settings → Secrets and variables → Actions → New repository secret):
   - `APPLE_TEAM_ID`: developer.apple.com/account → Membership details → Team ID,
   - `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_API_KEY_P8`: App Store Connect → Users and Access → Integrations → App Store Connect API → Team Keys → + (dostęp Admin); plik .p8 można pobrać tylko raz, do sekretu wklej całą jego treść,
   - `EXPO_TOKEN`: expo.dev → Account settings → Access tokens → Create token.
2. Actions → **iPhone (EAS)** → Run workflow → `konfiguruj-podpis` (certyfikat i profil ad hoc ze wszystkimi urządzeniami zarejestrowanymi na koncie Expo).
3. iPhone: Ustawienia → Prywatność i ochrona → Tryb dewelopera (wymagany dla instalacji ad hoc).

Każda nowa wersja: Actions → **iPhone (lokalnie, bez limitu Expo)** → Run workflow → `instalacja`. Po ok. 20–40 minutach link jest w podsumowaniu przebiegu: otwórz go na iPhonie w Safari i wybierz Install. Tryb `tylko-kompilacja` sprawdza sam build iOS bez żadnych sekretów.

Zapas: **iPhone (EAS)** → `build-w-chmurze` buduje na serwerach Expo i zużywa 1 z 15 darmowych buildów iOS w miesiącu (stan na 3 października 2026: po wyczerpaniu limitu buildy są zablokowane do 1. dnia następnego miesiąca, bez opłat).

Nowy iPhone (np. innej osoby) trzeba najpierw zarejestrować na koncie Expo (`npx eas-cli@latest device:create` na komputerze; urządzenie zarejestrowane tylko w portalu Apple importuje się tym samym poleceniem, opcja „Developer Portal”), potem ponownie `konfiguruj-podpis` i nowy build. Linku rejestracyjnego nie generujemy w GitHubie, bo logi publicznego repozytorium widzi każdy. Apple przetwarza nowe urządzenie do 24–72 h.

Pomiar wydajności po instalacji: Postęp → Pomiar wydajności → Zmierz (backlog B-009).

### Development build (praca nad kodem przy komputerze)

Profil `development` wymaga serwera Metro na komputerze w tej samej sieci Wi-Fi przy każdym uruchomieniu:
`cd apps/mobile`, `npx eas-cli@latest build --profile development --platform ios` (zużywa limit Expo), potem `pnpm --filter @szkola/mobile start`. Nowy build jest potrzebny tylko po zmianie części natywnej (nowa biblioteka natywna, zmiana `app.json`).

## Zasady

- Liczby w treści tylko przez `{{n:klucz}}` z `content/numbers.yaml`. Budowanie treści wykrywa liczby wpisane ręcznie.
- Reguła eksploatacyjna (`level: exploit`) musi mieć `population`.
- `poker-core`, `srs` i `content-schema` nie importują React Native.
