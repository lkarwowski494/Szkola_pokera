# Decyzje sesji DT (przyspieszenie E2E iOS), pula D-1020…D-1029

Zgoda właściciela 2026-11-11 ok. 18:30: „Zgoda na przyspieszenia”; zakres: ten sam zestaw kontroli (te same flowy, progi, bramki). Wzór: Trening `.github/workflows/e2e-ios.yml` (HEAD 2d97581, odczyt 2026-11-11). Wszystkie decyzje do weta koordynatora/właściciela.

## D-1020 (2026-11-11): build raz + macierz 2 części flowów + zadanie zbiorcze
- Decyzja: `build` (artefakt `szkola-sim-app`, 1 dzień) → `e2e` w macierzy `czesc` 1–2 (`fail-fast: false`) → `e2e-razem` (ubuntu; zielone tylko, gdy build i obie części zielone i raporty razem mają zielony KAŻDY flow bramki). Podział: `scripts/ci/e2e-podzial.mjs` (zachłannie wg liczby kroków flowu, deterministyczny); część dostaje kopię katalogu e2e z `config.yaml`, `wspolne/` i tylko swoimi flowami, więc `config.yaml` (`flows: '*.yaml'`, `continueOnFailure`) działa jak dotąd. Ponowienia D-178 i `podsumuj` per część na jej katalogu.
- Lista flowów przed = po: `e2e-podzial.mjs sprawdz 2` w obu zadaniach i w CI (`scripts/ci/e2e-podzial.test.mjs`, w `test:skrypty`); `e2e-podzial.mjs razem` w `e2e-razem` sprawdza raporty.
- Odrzucone: (a) 3 części — przy 9 flowach i narzucie ~2 min (install, symulator) mały zysk, więcej minut macOS; (b) podział po `--include-tags`/tagach — wymagałby zmian w `.maestro`/flowach (zakaz); (c) kilka ścieżek flowów w jednym wywołaniu Maestro — semantyka `continueOnFailure` poza `config.yaml` niepewna; (d) wagi z czasów (Trening `e2e-shards.json`) — brak per-flow czasów w danych, odstępstwo nazwane.
- Zmiana testów poza listą ścieżek (konieczna, nazwana): `tests/narzedzia/workflowy.test.mjs` — test D-273 czyta kroki z `jobs.build`/`jobs.e2e` zamiast jednego zadania (te same asercje, nic nie osłabione) + 2 nowe testy (macierz, cache); `package.json` — `scripts/ci/e2e-podzial.test.mjs` dopisany do `test:skrypty`. Limit buildu 67 min pozostaje wzorem 30 + 3n + 10 (test w `e2e-flowy.test.mjs` bez zmian).
- Zależy od: nazwy artefaktu `szkola-sim-app` (używa `store-screenshots.yml`) — zachowana; artefakt wyników z `e2e-wyniki` na `e2e-wyniki-<część>` (nikt go nie czyta poza dokumentacją).

## D-1021 (2026-11-11): cache CocoaPods
- `~/Library/Caches/CocoaPods`, klucz `cocoapods-v1-<hash pnpm-lock.yaml, app.json>-<sha>`, odczyt z przedrostka. Nie zmienia wyniku (tylko pobrania speców i paczek). Trening nie cache'uje (e2e-ios.yml:79–86) — odstępstwo: tu pods ≈ 2 min.

## D-1022 (2026-11-11): ccache dla kompilacji C/C++/ObjC
- React Native ma wbudowaną obsługę (`react-native/scripts/cocoapods/utils.rb:159–182`, `ccache-clang.sh`); w CI po `expo prebuild` ustawiam `apple.ccacheEnabled=true` w `ios/Podfile.properties.json` (nie zmienia `app.json` ani kodu); `actions/cache` na `.ccache`, klucz od lockfile'a, `CCACHE_BASEDIR`/`SLOPPINESS` wg dokumentacji RN. Statystyki trafień w podsumowaniu przebiegu.
- Odrzucone: cache `DerivedData` (prebuild --clean zmienia mtime/ścieżki plików → Xcode odbudowuje; kruche), `brew install ccache` zawsze (robimy tylko gdy brak).
- Ryzyko [DO USTALENIA przebiegiem]: czy szablon Podfile Expo (SDK 58) czyta `apple.ccacheEnabled` — krok ostrzega, gdy nie; wynik pokaże pomiar „po”.
