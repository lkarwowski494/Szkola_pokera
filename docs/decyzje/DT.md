# Decyzje sesji DT (przyspieszenie E2E iOS), pula D-1020…D-1029

Zgoda właściciela 2026-11-11 ok. 18:30: „Zgoda na przyspieszenia”; zakres: ten sam zestaw kontroli (te same flowy, progi, bramki). Wzór: Trening `.github/workflows/e2e-ios.yml` (HEAD 2d97581, odczyt 2026-11-11). Wszystkie decyzje do weta koordynatora/właściciela.

## D-1020 (2026-11-11): build raz + macierz 2 części flowów + zadanie zbiorcze
- Decyzja: `build` (artefakt `szkola-sim-app`, 1 dzień) → `e2e` w macierzy `czesc` 1–2 (`fail-fast: false`) → `e2e-razem` (ubuntu; zielone tylko, gdy build i obie części zielone i raporty razem mają zielony KAŻDY flow bramki). Podział: `scripts/ci/e2e-podzial.mjs` (zachłannie wg wag, deterministyczny); część dostaje kopię katalogu e2e z `config.yaml`, `wspolne/` i tylko swoimi flowami, więc `config.yaml` (`flows: '*.yaml'`, `continueOnFailure`) działa jak dotąd. Ponowienia D-178 i `podsumuj` per część na jej katalogu.
- Lista flowów przed = po: `e2e-podzial.mjs sprawdz 2` w obu zadaniach i w CI (`scripts/ci/e2e-podzial.test.mjs`, w `test:skrypty`); `e2e-podzial.mjs razem` w `e2e-razem` sprawdza raporty.
- Odrzucone: (a) 3 części — przy 9 flowach i narzucie ~2 min (install, symulator) mały zysk, więcej minut macOS; (b) podział po `--include-tags`/tagach — wymagałby zmian w `.maestro`/flowach (zakaz); (c) kilka ścieżek flowów w jednym wywołaniu Maestro — semantyka `continueOnFailure` poza `config.yaml` niepewna; (d) wagi z liczby kroków — wypróbowane w przebiegu 43080852450, nierówne, zastąpione czasami (D-1023).
- Zmiana testów poza listą ścieżek (konieczna, nazwana): `tests/narzedzia/workflowy.test.mjs` — test D-273 czyta kroki z `jobs.build`/`jobs.e2e` zamiast jednego zadania (te same asercje, nic nie osłabione) + 2 nowe testy (macierz, cache); `package.json` — `scripts/ci/e2e-podzial.test.mjs` dopisany do `test:skrypty`. Limit buildu 67 min pozostaje wzorem 30 + 3n + 10 (test w `e2e-flowy.test.mjs` bez zmian).
- Zależy od: nazwy artefaktu `szkola-sim-app` (używa `store-screenshots.yml`) — zachowana; artefakt wyników z `e2e-wyniki` na `e2e-wyniki-<część>` (nikt go nie czyta poza dokumentacją).

## D-1021 (2026-11-11): cache CocoaPods
- `~/Library/Caches/CocoaPods`, klucz `cocoapods-v1-<hash pnpm-lock.yaml, app.json>-<sha>`, odczyt z przedrostka. Nie zmienia wyniku (tylko pobrania speców i paczek). Trening nie cache'uje (e2e-ios.yml:79–86) — odstępstwo: tu pods ≈ 2 min.

## D-1022 (2026-11-11, zmieniona po przebiegu 43080852450): cache DerivedData zamiast ccache
- Pierwotnie ccache (wbudowana obsługa RN `utils.rb:159–182`). Dowód z przebiegu 43080852450: Podfile ustawił CC/CXX (log „[Ccache]: Setting CC, LD, CXX & LDPLUSPLUS”), ale po buildzie „Cache size 0.0 / 2.0 GB” — kompilacja nie przechodzi przez ccache; najdłuższe cele to Swift (ExpoModulesCore 15 min), którego ccache i tak nie obejmuje. Odrzucone: dalsze diagnozowanie ccache (każda próba = 35+ min runnera).
- Teraz: `actions/cache` na `apps/mobile/ios/build` (derivedDataPath), przywracany po prebuild i pod install, klucz `xcode-dd-v1-<hash pnpm-lock.yaml, app.json>-<sha>`, odczyt z przedrostka. Wynik buildu ten sam (Xcode dobudowuje różnicę). [DO USTALENIA przebiegiem: czy Xcode uzna cele za aktualne po `prebuild --clean`; pomiar „po” rozstrzyga. Jeśli nie — zostaje cache CocoaPods + podział, wariant prostszy.]

## D-1023 (2026-11-11): wagi podziału z zmierzonych czasów
- Przebieg 43080852450 (liczba kroków jako waga): część 1 flowy 10:45, część 2 7:30 — nierówno (08-drugi-jezyk 3:45 przy 64 liniach). Teraz wagi = czasy flowów z logu Maestro (`WAGI_S` w `e2e-podzial.mjs`, części 384 s i 408 s); flow bez wagi: liczba kroków × 5 s. Zgodnie z Treningiem (`e2e-shards.json`).

## D-1024 (2026-11-12, KO-079): powrót do jednego joba E2E, cache zostaje
- Decyzja koordynatora (KO-079, rekomendacja DT): `e2e-ios.yml` wraca do jednego zadania `e2e` (struktura z b3963e9a: bez `build`/macierzy/`e2e-razem`), z dodanymi cache CocoaPods (przed prebuild) i DerivedData (po pod install, przed xcodebuild), oba tylko gdy aplikacja jest budowana w tym przebiegu. Te same flowy 9/9 i ta sama kontrola `podsumuj` (każdy flow z katalogu wymagany w raporcie).
- Powód: pomiar 3 przebiegów (43080852450, 43110722675, 43117974356): split ≈ 0 zysku (47:21 vs 47:48) i wrażliwy na kolejkę macOS (run 1: 80 min, 2 zadania czekały 10 i 22 min).
- Wycofane: `scripts/ci/e2e-podzial.mjs` i jego test (martwy kod bez macierzy), wpis w `test:skrypty`, testy macierzy/zbiorcze w `workflowy.test.mjs` (przywrócony stan z b3963e9a + nowy test cache). Zakres edycji poza listą ścieżek (testy, package.json) = przywrócenie wersji z b3963e9a plus jeden nowy test; nic nie osłabione względem b3963e9a. D-1020 i D-1023 historyczne (wycofane); D-1021, D-1022 obowiązują.
