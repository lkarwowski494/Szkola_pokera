# Reaudyt: Wydanie i sklepy — Szkoła Pokera — 2026-11-17
Commit: 196cb8c2b062e46e0f90aaee062fff24fc06f729 (gałąź claude/sesja-ir-reaudit-m1; w trakcie pracy koordynator dodał 4360eee5 „IR reaudit M1 pętla 1: start”: tylko plik assemble.txt w katalogu dowodów reaudytu i docs/decyzje/IR.md, kod aplikacji = 196cb8c2) · Baza: 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Tryb: reaudit, pętla 1 · Środowisko: Linux, Node, git (klon płytki: `git rev-parse --is-shallow-repository` → true), worktree bazy w scratchpadzie; bez Xcode, bez App Store Connect; Trening odczytany przez raw.githubusercontent.com (API GitHub dla tego repo: 403 w tej sesji).

## Podsumowanie
Jedyne znalezisko w zakresie (M1-audytor-generalny-061 = 10-wydanie-007, P2 → NISKIE, WYD-01) jest naprawione i zweryfikowane na bieżącym commicie. Próbka regresji (manifest prywatności i uprawnienia w `apps/mobile/app.json`, zmiana nazw baz treści, manifest K-08) nie wykazała zmian wpływających na etykietę App Privacy ani manifest. Nowych znalezisk brak. Nic z tego zakresu nie blokuje buildu TestFlight 1012 ani App Store.

| ID | Wynik | Poziom | Blokuje 1012 | Blokuje App Store | Dowód |
|---|---|---|---|---|---|
| 10-wydanie-007 | zweryfikowane (M1-audytor-generalny-061, c9a7c332) | P2 → NISKIE | nie | nie | dowody/061-test-gitignore.txt, dowody/061-check-ignore.txt, dowody/061-sekrety.txt |

### 10-wydanie-007 (M1-audytor-generalny-061) · szczegóły weryfikacji
- Stan: `.gitignore:12-22` dodaje `.env*`, `*.p8`, `*.p12`, `*.jks`, `*.keystore`, `*.mobileprovision`, `*.cer`, `*.pem`, `*.key`, `credentials.json` w katalogu głównym (działa w całym drzewie). Lista zgodna z Treningiem: https://raw.githubusercontent.com/lkarwowski494/trening/main/.gitignore, linie 16–26 (`.env*`, `*.p8`, `*.p12`, `*.mobileprovision`, `*.cer`, `credentials.json`, `*.pem`, `*.key`, `*.jks`, `*.keystore`), odczyt 2026-11-17 (D-191).
- Test: `tests/narzedzia/gitignore-sekrety.test.mjs:12` — na HEAD 2/2, kod 0; ten sam test na `.gitignore` z 0e7e5e00 kod 1 (1 pass, 1 fail) — czerwony przed z właściwego powodu. Test jest w `test:skrypty` (`package.json`, diff 0e7e5e00..HEAD).
- Próbka `git check-ignore --no-index`: ignorowane `.env`, `.env.local`, `.env.production`, `.env.production.local`, `apps/mobile/.env.development`, `packages/domena/.env`, `tools/x/.env`, `AuthKey_ABC.p8` (katalog główny i `apps/mobile/`), `dist.p12`, `credentials.json` (oba katalogi), `apps/mobile/credentials/ios/dist.p12`; nieignorowane (słusznie) `apps/mobile/eas.json`, `apps/mobile/app.json`, `package.json`. W bazie `.env`, `credentials.json`, `apps/mobile/credentials.json`, `packages/domena/.env`, `dist.p12` w katalogu głównym nie były ignorowane.
- Nie ukrywa plików śledzonych: wszystkie 4848 plików `git ls-files` przez `git check-ignore --no-index --stdin` → 6 trafień, identyczne jak w bazie (pliki `tests/dane/k08/moduly/*/ios/*` przez regułę `ios/` z `.gitignore:8`, istniejącą przed c9a7c332). Drugi test pliku (`tests/narzedzia/gitignore-sekrety.test.mjs:24`) pilnuje, że żaden śledzony plik nie ma nazwy klucza ani `.env`.
- `sprawdz-wydanie.mjs sekrety` (kopia z promptu w scratchpadzie): HEAD → `OK`, kod 0, bez UWAG o `.gitignore`; baza → 6 UWAG `.gitignore nie obejmuje` (x.p8, x.p12, x.jks, x.mobileprovision, credentials.json, .env). Test akceptacyjny z raportu M1 spełniony.
- Uwagi bez nowego ID (poniżej progu, teoretyczne): `.env*` ignoruje też ewentualny wzorzec `.env.example` (tak samo w Treningu; obecnie brak takiego pliku, dodanie wymaga `git add -f`); nazwy z wielką literą (`AuthKey_X.P8`, `.ENV`) nie są ignorowane na systemie z rozróżnianiem wielkości liter — Apple pobiera klucz jako `.p8`; plik JSON konta usługi Google Play nie ma stałej nazwy i nie jest objęty — Android poza zakresem (Google Play: nic, CLAUDE.md).

### Próbka regresji (spoza zmienionych plików)
| Pozycja | Wynik | Dowód |
|---|---|---|
| WYD-09 / WYD-08: manifest prywatności i uprawnienia | `apps/mobile/app.json`, `apps/mobile/eas.json`, `apps/mobile/package.json`, `apps/mobile/modules`, `apps/mobile/src/platform`, `pnpm-lock.yaml` bez zmian względem 0e7e5e00 (`git diff --quiet` kod 0); zależności bez zmian, więc brak nowych SDK i danych do etykiety. `apps/mobile/app.json:17` „"NSPrivacyCollectedDataTypes": []”, `apps/mobile/app.json:18` „"NSPrivacyTracking": false” jak w bazie. K-08: test 6/6, skrypt kod 0, cztery kategorie required reason API pokryte w `app.json` | dowody/regresja-app-json-k08.txt |
| WYD-08: bazy treści `tresc-d0b124291f-*.db` | 35 plików jak w bazie, suma rozmiarów 50 913 280 B w obu stanach (rozmiar paczki bez zmian); stary skrót 70ddf027b1 bez odwołań w kodzie; `apps/mobile/src/data/content/tresc.generated.ts:3` „export const WERSJA_TRESCI = 'd0b124291f';” to jedyna zmiana poza nazwami plików. Bazy to zasoby tylko do odczytu w paczce; nic nie wychodzi z urządzenia, więc etykieta App Privacy bez zmian | dowody/regresja-bazy-tresci.txt |
| WYD-01: workflowy (zmienione przez 047, sprawdzone tylko pod kątem sekretów) | diff `.github/workflows/` to wyłącznie 15 × `pnpm/action-setup@v5` → pełny SHA v5.0.0; brak zmian w `secrets`, wyzwalaczach i `pull_request_target` | dowody/regresja-app-json-k08.txt |

### Czego nie sprawdzono
- Skan historii `sprawdz-wydanie.mjs sekrety --historia`: klon płytki; `git fetch --unshallow` zmieniłby `.git`, więc pominięty. Zastępczo przejrzany diff c9a7c332 (3 pliki: `.gitignore`, `package.json`, test) — bez sekretów.
- Poziom 10-wydanie-007 bez zmiany: P2 → NISKIE (poświadczeń w drzewie i w sprawdzonej historii nie było, raport M1); nie blokuje 1012 ani App Store.

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <raport> /home/user/Szkola_pokera /home/user/Szkola_pokera/audit/M1-2026-11-17/reaudit-2026-11-17/10-wydanie --rola 10-wydanie` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 10-wydanie”, kod 0.

`git status --porcelain` na początku i na końcu: `?? audit/M1-2026-11-17/reaudit-2026-11-17/` (bez zmian plików śledzonych; worktree bazy tylko w scratchpadzie, usunięty po pracy).
