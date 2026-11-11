# Przyspieszenie E2E iOS (sesja DT, 2026-11-11)

Zakres (zgoda właściciela 2026-11-11): ten sam zestaw kontroli (te same flowy, progi, bramki). Źródło pomiarów: `gh api repos/lkarwowski494/Szkola_pokera/actions/runs/<id>/jobs` (kroki `started_at`/`completed_at`), odczyt 2026-11-11.

## 1. Pomiar „przed” (5 ostatnich zakończonych przebiegów `e2e-ios.yml`, wszystkie zielone, 9 flowów)

„Przed buildem” = start joba, checkout, Xcode, pnpm install, content:check. „Build” = expo prebuild + pod install + xcodebuild. „Symulator+flowy” = od startu kroku Symulator do końca ponowień. Kolejka (utworzenie → start joba) 2–3 s: runner darmowy, repo publiczne.

| Run ID | Start | Kolejka | Przed buildem | Build | Symulator+flowy | Całość (job) |
|---|---|---|---|---|---|---|
| 43032964388 | 11-11 13:51 | 0:02 | 2:22 | 29:47 | 18:25 (ponowienie 1:34) | 51:45 |
| 42964699807 | 11-11 05:16 | 0:02 | 1:59 | 26:52 | 10:43 | 40:11 |
| 42958391277 | 11-11 04:18 | 0:03 | 1:37 | 32:16 | 15:25 (ponowienie 2:32) | 50:14 |
| 42927915115 | 11-11 00:00 | 0:02 | 1:36 | 29:05 | 15:03 (ponowienie 1:35) | 46:36 |
| 42913863149 | 11-10 22:21 | 0:03 | 1:56 | 33:22 | 13:53 | 50:10 |
| **średnia** | | 0:02 | 1:50 | 30:16 | 14:30 | 47:47 |

Wniosek: build (xcodebuild 25–30 min + pod install ok. 2 min) to ok. 63% przebiegu, flowy ok. 30% (w tym rozruch symulatora 2–5 min). Pozostałe kroki (Maestro 10–15 s, zapis i wysyłka artefaktu ok. 10 s) pomijalne.

Wzór z Treningu (`lkarwowski494/trening` `.github/workflows/e2e-ios.yml:5–7,121–133`, odczyt 2026-11-11, HEAD 2d97581): zadanie `build` raz + artefakt, macierz `shard` z `needs: build`, `fail-fast: false`, podział skryptem `scripts/ci/e2e-shards.mjs`. Trening nie cache'uje xcodebuild (36 min, `e2e-ios.yml:79`).
