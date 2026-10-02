# Szkoła Pokera

Aplikacja iOS do nauki No-Limit Texas Hold'em od zera, po polsku. Dokumentacja projektu (wymagania, architektura, decyzje ADR, backlog) jest w folderze „Szkoła Pokera” na Google Drive.

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `apps/mobile` | Aplikacja Expo (SDK 57, Expo Router, expo-sqlite + Drizzle, Zustand, i18next) |
| `packages/poker-core` | Silnik pokera w czystym TypeScript: karty, ocena rąk, equity, zakresy, outy, matematyka, generatory zadań |
| `packages/srs` | Powtórki FSRS na poziomie rodzin zadań |
| `packages/content-schema` | Schematy treści (Zod), wspólne dla aplikacji i potoku treści |
| `tools/content-build` | Kompiluje `content/` do `apps/mobile/assets/content/content-v1.db` |
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
```

## Pierwszy development build (tylko na twój iPhone, ADR-19)

Wszystko z Windows, bez Maca. Build powstaje na serwerach Expo.

1. `cd apps/mobile`
2. `npx eas-cli@latest login`
3. `npx eas-cli@latest init` (dopisze identyfikator projektu do `app.json`; zrób commit)
4. `npx eas-cli@latest device:create`, otwórz link na iPhonie i zainstaluj profil. Apple potrzebuje do 24–72 h na przetworzenie nowego urządzenia.
5. `npx eas-cli@latest build --profile development --platform ios`. Przy pierwszym buildzie zaloguj się Apple ID; EAS sam utworzy certyfikat i profil.
6. Zainstaluj build z linku lub kodu QR z EAS na iPhonie. Włącz tryb dewelopera: Ustawienia → Prywatność i ochrona → Tryb dewelopera.
7. Na komputerze: `pnpm --filter @szkola/mobile start`. iPhone i komputer w tej samej sieci Wi-Fi; otwórz aplikację i wybierz serwer albo zeskanuj kod QR aparatem. Windows może zapytać o zgodę zapory dla Node.

Nowy build jest potrzebny tylko po zmianie części natywnej (nowa biblioteka natywna, zmiana `app.json`). Zmiany w kodzie JS i w treści widać od razu przez Metro.

## Zasady

- Liczby w treści tylko przez `{{n:klucz}}` z `content/numbers.yaml`. Budowanie treści wykrywa liczby wpisane ręcznie.
- Reguła eksploatacyjna (`level: exploit`) musi mieć `population`.
- `poker-core`, `srs` i `content-schema` nie importują React Native.
