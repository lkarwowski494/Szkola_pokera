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

## 2. Zmiany (D-1020…D-1023, `docs/decyzje/DT.md`)

`build` raz (cache CocoaPods + DerivedData) → `e2e` w macierzy 2 części (podział `scripts/ci/e2e-podzial.mjs`, wagi z czasów flowów) → `e2e-razem` (zielone tylko, gdy wszystkie 9 flowów ma zielony wynik w raportach części). Flowy, progi i ponowienia (D-178) bez zmian; lista flowów przed = po sprawdzana w CI (`e2e-podzial.test.mjs`, krok `sprawdz`, zadanie `e2e-razem`). ccache wypróbowany i odrzucony (przebieg 43080852450: 0,0 GB po buildzie).

## 3. Pomiar „po” (te same flowy: 9; wszystkie przebiegi zielone; commity 516882e3 → a076a05b)

| Przebieg | Opis | Kolejka macOS | Build | Część 1 | Część 2 | Całość (od utworzenia) |
|---|---|---|---|---|---|---|
| 43080852450 | split, ccache (nie działa), zimny cache | 10 + 22 min | 38:50 | 18:13 | 13:36 | 80:13 (bez kolejki ok. 58) |
| 43110722675 | split, DerivedData zimny, CocoaPods ciepły | 0 | 32:01 | 15:42 | 19:29 (ponowienie flowu 4:35) | 52:02 |
| 43117974356 | split, DerivedData i CocoaPods ciepłe | 0 | 28:06 | 15:38 | 18:41 | 47:21 |
| **przed (śr. 5)** | jeden job | 0:02 | 30:16 (+1:50 przed) | 14:30 (sym.+flowy) | | 47:47 |

Części = czas całego zadania macierzy (checkout, install, symulator, flowy), nie samych flowów.

## 4. Wniosek

Przyspieszenie < 5 min: ciepły przebieg 47:21 vs średnia przed 47:47 (zakres przed 40:11–51:45, więc różnica mieści się w rozrzucie).
- Cache DerivedData: xcodebuild 27:02 (zimny) → 24:32 (ciepły), czyli −2:30; Xcode po `prebuild --clean` odbudowuje większość celów (Swift: ExpoModulesCore ok. 15 min, RNScreens/RNSVG/Reanimated ok. 5–8 min). Cache CocoaPods: pod install 2:06 → 1:08 (−1 min).
- Podział flowów: flowy to tylko ok. 30% przebiegu, a każda część powtarza narzut (runner, checkout, install, rozruch symulatora, instalacja Maestro: ok. 4–5 min), więc części nie są krótsze niż dotychczasowy jeden job z flowami. Dodatkowo dwa zadania macOS zamiast jednego to dwukrotnie większa wrażliwość na kolejkę (run 1: 10 i 22 min czekania, przebieg zbiorczy 80 min).
- Ponowienie D-178 w run 2 (flaky flow w części 2) dodało 4:35, niezależnie od zmian.

Wariant prostszy do pozostawienia (rekomendacja): jeden job jak dotąd + cache CocoaPods i DerivedData (≈ −3,5 min buildu, bez dodatkowego narzutu macOS ani ryzyka kolejki). Podział na 2 części ma sens dopiero przy dłuższych flowach (≥ 25 min samych flowów) albo wolnym buildzie po stronie Maestro; obecna konfiguracja (split) działa poprawnie i zostaje na gałęzi `claude/dt-e2e` do decyzji koordynatora.

## 5. Wariant końcowy (KO-079, D-1024): jeden job + cache CocoaPods i DerivedData

Split wycofany; `e2e-ios.yml` = struktura z b3963e9a + dwa cache (commit 5997fd68). Przebieg weryfikacyjny 43126163648 (push, zielony, 9/9 flowów, ponowień brak):

| | Kolejka macOS | Job | Pods | xcodebuild | Symulator | Flowy | Całość od utworzenia |
|---|---|---|---|---|---|---|---|
| przed (śr. 5) | 0:02 | 47:48 | 2:05 | 25–30 min | 2–5 min | 8:37–12:50 | 47:49 |
| 43126163648 | 26:21 | 55:24 | 1:24 | 30:56 | 3:47 | 13:18 | 81:46 |

Wniosek: cache nie dał mierzalnego zysku w tym przebiegu — xcodebuild 30:56 mimo ciepłego DerivedData (przywrócenie 1:11), pod install −0:41; czas joba 55:24 mieści się w rozrzucie runnerów macOS (przed: 40–52 min; build 26:52–33:22 przy tym samym kodzie). Kolejka macOS 26 min wynika z obciążenia kont/innych przebiegów (jeden job, więc nie z podziału). Zysk z cache widziany w przebiegach 43110722675 → 43117974356 (xcodebuild 27:02 → 24:32) nie powtórzył się; pomiar nie rozstrzyga, czy cache pomaga (hipoteza: kilka minut, w granicach szumu). Cache zostaje (koszt: ok. 1 min na przywrócenie i zapis), do weryfikacji na kolejnych przebiegach z `main`/`claude/**`.
