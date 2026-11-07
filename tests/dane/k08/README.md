# Dane testowe K-08 (`tests/narzedzia/k08-manifesty.test.mjs`)
Katalog `moduly/` udaje `node_modules` (nazwa inna, bo `node_modules/` jest w `.gitignore`).
- `pkg-z-manifestem/ios/PrivacyInfo.xcprivacy`: kopia `expo-constants` 57.0.20 `ios/PrivacyInfo.xcprivacy` (MIT), bez zmian.
- `@zakres/pkg-sqlite/vendor/sqlite3.c`: 4 linie z `expo-sqlite` 57.0.3 `vendor/sqlite3/sqlite3.c` (SQLite, domena publiczna) + linia z makrem `osFstat` (bez trafienia).
- `pkg-zbiera/ios/PrivacyInfo.xcprivacy`: manifest `expo-constants` z dopisanym typem `CrashData` (przypadek naruszenia).
- `pkg-przyklad/example/`: manifest z `NSPrivacyTracking` = true w katalogu `example/` (ma być pominięty).
- `pkg-js`, `pkg-komentarz`: syntetyczne (pakiet bez `ios/`, API tylko w komentarzach).
Bez danych osobowych.
