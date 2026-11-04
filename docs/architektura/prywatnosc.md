# Prywatność: inwentarz danych i required reason API (rola 05 E3, 2026-11-04; wejście dla roli 10)
Wymaganie: NFR-PRYW-001 (0 domen poza sklepem, 0 SDK analityki i raportów awarii, etykieta „Data Not Collected”). Decyzje: ADR 0002, 0006, 0008, 0009, 0012, 0013. Manifest i formularz w App Store Connect przygotowuje rola 10; ten dokument podaje stan zgodny z architekturą.

## 1. Inwentarz danych
| Dane | Skąd | Gdzie trzymane | Czy opuszczają urządzenie (dokąd, kiedy) | Cel | Czas życia |
|---|---|---|---|---|---|
| Postęp: aktywności, odpowiedzi, wyniki testów, karty i log powtórek, postęp lekcji (`postep.db`) | działania użytkownika w PR-01–PR-05 | `Documents/SQLite/postep.db` (ADR 0002) | (1) kopia iCloud systemu, jeśli użytkownik ją włączył — Apple, nie twórca; (2) plik eksportu, gdy użytkownik sam go udostępni (F-14, arkusz systemowy) | nauka, powtórki, powrót w tym samym miejscu | do „Usuń postęp” albo odinstalowania |
| Ustawienia: język, przypomnienie (włączone, godzina, minuta), licznik próśb o ocenę, data ostatniego eksportu, punkt startu | wybór użytkownika, F-01, F-11, F-14, F-16, F-17 | `ustawienie` w `postep.db` | jw. (kopia iCloud, eksport) | działanie funkcji | jw. |
| Zużycie dziennego limitu (`aktywnosc.dzien_lokalny`, `strefa`, `z_limitu`) | start aktywności | `postep.db` | jw.; strefa czasowa telefonu w eksporcie (np. `America/New_York`) | limit F-18 (ADR 0007) | jw.; dzisiejsze znaczniki przeżywają „Usuń postęp” (dane.md) |
| Pamięć uprawnień (`uprawnienie_cache`: produkt, data wygaśnięcia) | odczyt transakcji StoreKit | `postep.db` | nie (poza eksportem) | dostęp bez sieci do końca okresu (ADR 0006) | nadpisywana przy każdym odczycie ze sklepu |
| Transakcje zakupu | App Store (StoreKit przez `expo-iap`/OpenIAP) | system i Apple | tak: Apple (zakup, przywracanie); twórca nie dostaje danych od aplikacji | zakup F-13 | zarządza Apple |
| Dziennik błędów (`dziennik`: czas, kod, ekran, wersja) | polityka błędów (`tlo-i-bledy.md`) | `postep.db`, pierścień `DZIENNIK_MAKS_WPISOW` | tylko gdy użytkownik dołączy go do wiadomości „Zgłoś błąd” (sekcja 4) | diagnoza zgłoszeń | najstarsze wpisy usuwane; „Usuń postęp” |
| Zgłoszenie błędu (wersja, język, identyfikator zadania, opcjonalnie wpisy dziennika) | F-17, treść widoczna przed wysłaniem | szkic w programie pocztowym | tak: poczta do twórcy, wysyła użytkownik ze swojego programu | poprawa treści i błędów | skrzynka twórcy (poza aplikacją) |
| Zaplanowane przypomnienie | F-11 | system (Notification Center) | nie (lokalne, bez APNs: `enableRemoteNotifications: false`, `tlo-i-bledy.md` sekcja 3) | przypomnienie | do wyłączenia albo „Usuń postęp” |
| Język i region telefonu, strefa czasowa | `expo-localization` | odczyt w pamięci | nie | wybór języka, numery pomocy (F-15), granica dnia | sesja aplikacji |
| Stare bazy z buildów 1005–1008 (`user.db*`) | poprzednia wersja aplikacji | `Documents/SQLite` | jak postęp (kopia iCloud) | brak (nieczytane, ADR 0004) | do „Usuń postęp” |
| Treść kursu (`tresc-*.db`) | paczka aplikacji | `Documents/SQLite` (kopia z paczki, ADR 0005) | nie | nauka | odtwarzana z paczki |

Sprawdzone, brak: identyfikatory urządzenia i reklamowe, konto, adres e-mail w aplikacji, lokalizacja, kontakty, zdjęcia, zdrowie, dane płatnicze (obsługuje Apple), śledzenie (`NSPrivacyTracking` = false, brak `NSPrivacyTrackingDomains`).

**Sieć (NFR-PRYW-001):** jedyne połączenia to StoreKit (Apple). Biblioteka `expo-iap` 6.4.2 zawiera klienta usługi weryfikacji `https://kit.openiap.dev` (`build/kit-api.js:4`) i adapter Amazon (`build/vega-adapter.js:859`), wołane tylko przez `verifyPurchaseWithProvider` / `kitApi` (`build/index.js:988-1010`); aplikacja ich nie używa (ADR 0006: dostęp z `currentEntitlements`), co sprawdza kontrola statyczna (`kontrole-07.md`, K-07). Kod Swift pakietu OpenIAP 4.0.8 (`packages/apple/Sources`, 20 plików) nie zawiera `URLSession` (grep, 2026-11-04).

**Sekrety:** aplikacja nie ma kluczy API ani sekretów (bez serwera, bez Sentry po ADR 0009; `extra.sentry` do usunięcia z `app.json`). Zmienne `EXPO_PUBLIC_*` nie są tajne (Expo: „These variables will be visible in plain-text in your compiled application”), więc żadna nie przenosi sekretu. Repo publiczne: kontrola `git diff --cached` przed commitem.

**Atakujący z dostępem do urządzenia lub kopii:** postęp nauki nie jest daną wrażliwą; baza bez szyfrowania (SQLCipher wyłączony, `expo.sqlite.useSQLCipher` brak) — świadomie, ochronę daje blokada urządzenia i szyfrowanie kopii iCloud przez system. Plik eksportu zawiera strefę czasową i daty aktywności: tekst przy eksporcie mówi, co zawiera plik (rola 04/06) `[DO USTALENIA: tekst]`.

## 2. Required reason API (zależności w wersjach SDK 58)
Metoda (2026-11-04): `npm pack` 25 pakietów natywnych z wersji zalecanych przez `expo@58.0.23/bundledNativeModules.json` i `expo-iap@6.4.2`, rozpakowanie bez uruchamiania, `find -name PrivacyInfo.xcprivacy` oraz `grep` kodu iOS (`*.swift`, `*.m`, `*.mm`, `*.h`, `*.c`, `*.cpp`) po interfejsach z listy Apple (`NSPrivacyAccessedAPIType`, developer.apple.com, odczyt 2026-11-04: kategorie FileTimestamp, SystemBootTime, DiskSpace, ActiveKeyboards, UserDefaults); pakiet Swift OpenIAP 4.0.8 z `github.com/hyodotdev/openiap` (tag `4.0.8`, plik `openiap-versions.json` w `expo-iap`: `"apple": "4.0.8"`). Zależności przechodnie spoza tej listy (np. `expo-glass-effect`, `@react-native-masked-view/masked-view` z `expo-router`) nie były sprawdzone: po `pnpm install` rola 07 uruchamia K-08 na pełnym drzewie.

| Pakiet (wersja) | Własny `PrivacyInfo.xcprivacy` | Kategorie i powody w manifeście pakietu | Użycie bez manifestu (grep) |
|---|---|---|---|
| react-native 0.88.1 (`React/Resources`, `ReactCommon/cxxreact`, `ReactCommon/react/timing`, boost, glog, RCT-Folly) | tak | FileTimestamp C617.1; UserDefaults CA92.1; SystemBootTime 35F9.1 | — |
| expo-file-system 58.0.13 (zależność `expo`) | tak | FileTimestamp 0A2A.1, 3B52.1; DiskSpace E174.1, 85F4.1 | — |
| expo-constants 58.0.15 | tak | UserDefaults CA92.1 | — |
| expo-localization 58.0.5 | tak | UserDefaults CA92.1 | — |
| expo-notifications 58.1.8 | tak | UserDefaults CA92.1 | — |
| expo-application 58.1.2 (zależność `expo-notifications`) | tak | FileTimestamp C617.1 | — |
| expo-system-ui 58.0.7 | tak | UserDefaults CA92.1 | — |
| expo-sqlite 58.0.15 (SQLite 3.53.3 z paczki, `vendor/sqlite3`) | **nie** | — | `sqlite3.c`: `stat`, `fstat`, `lstat` (FileTimestamp), `fstatfs` przy każdym otwarciu pliku na Apple (`#if defined(__APPLE__) …`, ok. linia 46956) i `statfs` (DiskSpace) |
| expo-document-picker 58.0.4 | **nie** | — | `DocumentPickerModule.swift:128`: `contentModificationDateKey` pliku wybranego przez użytkownika (FileTimestamp; powód 3B52.1: „files or directories that the user specifically granted access to, such as using a document picker”) |
| expo-sharing 58.0.22 | **nie** | — | `SharingModule.swift:93,122`: `UserDefaults(suiteName: appGroupId)` tylko w funkcjach „share into” (odbieranie udostępnień), których aplikacja nie używa |
| OpenIAP 4.0.8 (pakiet Swift `expo-iap`) | **nie** | — | `Helpers/OpenIapFirstPurchaseNotice.swift:11`: `UserDefaults.standard` (CA92.1) |
| expo-iap 6.4.2, expo-modules-core, expo-asset, expo-font, expo-haptics, expo-keep-awake, expo-linking, expo-router, expo-splash-screen, expo-status-bar, expo 58.0.23, gesture-handler 3.3.0, reanimated 4.7.1, safe-area-context 5.11.1, screens 4.30.1, worklets 0.13.0 | nie | — | brak trafień |
| `ActiveKeyboards` (`activeInputModes`) | — | — | brak w żadnym pakiecie |

**Agregacja:** React Native 0.88.1 przy `pod install` scala manifesty podów do manifestu aplikacji (`scripts/react_native_pods.rb:97` `privacy_file_aggregation_enabled: true`, `:660-661` `add_aggregated_privacy_manifest`; `cocoapods/privacy_manifest_utils.rb:118-140` czyta tylko pliki `PrivacyInfo.xcprivacy` z pakietów). Pakiety bez manifestu nie są więc pokryte agregacją. Expo (docs.expo.dev/guides/apple-privacy, odczyt 2026-11-04): „Apple does not correctly parse all the PrivacyInfo files included by static CocoaPods dependencies … You may need to include the required reasons for the APIs used by those dependencies in your app's PrivacyInfo.xcprivacy file or the configuration in the app.json.”

**Wniosek dla roli 10 (`app.json` → `expo.ios.privacyManifests`):**
| Kategoria | Powody do zadeklarowania w aplikacji | Uzasadnienie |
|---|---|---|
| `NSPrivacyAccessedAPICategoryFileTimestamp` | C617.1, 3B52.1 | pliki w kontenerze aplikacji (SQLite, RN); plik wybrany w imporcie (expo-document-picker bez własnego manifestu) |
| `NSPrivacyAccessedAPICategoryUserDefaults` | CA92.1 | RN, Expo, OpenIAP (bez własnego manifestu); aplikacja nie ma App Group |
| `NSPrivacyAccessedAPICategorySystemBootTime` | 35F9.1 | RN (pomiar czasu między zdarzeniami w aplikacji) |
| `NSPrivacyAccessedAPICategoryDiskSpace` | E174.1 | `fstatfs`/`statfs` w SQLite z expo-sqlite (bez własnego manifestu) i expo-file-system. Powód dla wywołania SQLite (odczyt typu systemu plików, nie wolnego miejsca) nie pasuje dosłownie do żadnego z czterech powodów Apple `[DO USTALENIA: rola 10 — E174.1 jako najbliższy albo zgłoszenie powodu do Apple]` |
| `NSPrivacyCollectedDataTypes` | pusta lista | po ADR 0009 (usunięcie trzech wpisów CrashData, PerformanceData, OtherDiagnosticData z `app.json:18-20`) |

Obecny `app.json` (kod sprzed sztafety) ma FileTimestamp C617.1, UserDefaults CA92.1, SystemBootTime 35F9.1, bez DiskSpace i bez 3B52.1 — różnica do usunięcia przez rolę 10 (po instalacji SDK 58 i K-08).

## 3. Etykieta „Data Not Collected”
Apple (developer.apple.com/app-store/app-privacy-details, odczyt 2026-11-04): „„Collect” refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time”; „Data that is processed only on device is not „collected” and does not need to be disclosed”; „You are not responsible for disclosing data collected by Apple”. Postęp, ustawienia, limit, dziennik i przypomnienie zostają na urządzeniu; zakupy obsługuje Apple; kopia iCloud należy do systemu.

## 4. Otwarte pytanie dla roli 10: „Zgłoś błąd” (F-17)
Wiadomość z wersją, językiem, identyfikatorem zadania i (opcjonalnie) wpisami dziennika trafia do twórcy pocztą. Kryteria „Optional disclosure” Apple wymagają łącznie m.in.: „Collection of the data occurs only in infrequent cases that are not part of your app’s primary functionality, and which are optional for the user. The data is provided by the user in your app’s interface, it is clear to the user what data is collected, the user’s name or account name is prominently displayed in the submission form alongside the other data elements being submitted, and the user affirmatively chooses to provide the data for collection each time.” Szkic powstaje w programie pocztowym (nie w interfejsie aplikacji), a nadawca widnieje w polu „Od” programu pocztowego. Czy to spełnia kryteria, `[DO USTALENIA: rola 10]`. Realność: **brzegowa** (zgłoszenia rzadkie), ale błędna etykieta to ryzyko odrzucenia. Opcje dla roli 10: (a) uznać za opcjonalne (kryteria spełnione: rzadkie, dobrowolne, treść widoczna, nadawca widoczny); (b) zadeklarować „Other Diagnostic Data” / „Customer Support” jako niepowiązane z tożsamością, ale wtedy etykieta przestaje być „Data Not Collected” (sprzeczne z NFR-PRYW-001 — decyzja właściciela); (c) bez danych diagnostycznych w szkicu, sam tekst użytkownika i adres do skopiowania.
