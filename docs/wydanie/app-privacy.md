# App Privacy w App Store Connect: odpowiedzi i zgodność z manifestem (rola 10, 2026-11-09)

Wejście: 08-F20, P-2, W2 (D-297, D-301), NFR-PRYW-001, inwentarz `docs/architektura/prywatnosc.md`. Stan kodu: commit `f851474`. To nie jest opinia prawna (OP-13). Formularz wypełnia właściciel (W-06); agent nie zmienia niczego w App Store Connect.

**Wynik:** odpowiedź „No, we do not collect data from this app”, etykieta „Data Not Collected”, bez śledzenia; manifest w `app.json` zgodny co do danych i śledzenia; jedna rozbieżność w powodach required reason API (10-PRYW-01 dla 08) i jedna nieścisłość w inwentarzu (10-PRYW-02 dla 05/08). Decyzja: D-307.

## 1. Źródła (przeczytane 2026-11-09)

| ID | Adres | Cytat |
|---|---|---|
| AP-1 | developer.apple.com/app-store/app-privacy-details/ | „“Collect” refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time.” |
| AP-2 | jw. | „Data that is processed only on device is not “collected” and does not need to be disclosed in your answers.” |
| AP-3 | jw. | „You are not responsible for disclosing data collected by Apple.” |
| AP-4 | jw. | „Data types that meet all of the following criteria are optional to disclose:” … „Collection of the data occurs only in infrequent cases that are not part of your app’s primary functionality, and which are optional for the user.” … „The data is provided by the user in your app’s interface, it is clear to the user what data is collected, the user’s name or account name is prominently displayed in the submission form alongside the other data elements being submitted, and the user affirmatively chooses to provide the data for collection each time.” … „Examples of data that may not need to be disclosed include data collected in optional feedback forms or customer service requests that are unrelated to the primary purpose of the app and meet the other criteria above.” |
| AP-5 | jw. | „“Tracking” refers to linking data collected from your app about a particular end-user or device … with Third-Party Data for targeted advertising or advertising measurement purposes, or sharing data collected from your app about a particular end-user or device with a data broker.” |
| AP-6 | jw. | „Privacy Policy (Required): The URL to your publicly accessible privacy policy.” |
| MP-1 | developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/ | „In the dialog that appears, indicate whether you or your third-party partners collect data from your app. If the answer is no, select "No, we do not collect data from this app" and then click Save. You don’t need to answer any further questions.” |
| MP-2 | jw. | „A privacy policy URL is required for all apps, while a user privacy choices URL is optional.” … „Next to Privacy Policy, click Edit. Enter the privacy policy URL” … „You can localize the privacy policy URLs” … „Any changes to the URLs releases with your next app version.” |
| G-511 | developer.apple.com/app-store/review/guidelines/ (5.1.1(i)) | „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner. The privacy policy must clearly and explicitly: Identify what data, if any, the app/service collects, how it collects that data, and all uses of that data. … Explain its data retention/deletion policies and describe how a user can revoke consent and/or request deletion of the user’s data.” |
| G-15 | jw. (1.5) | „Make sure your app and its Support URL include an easy way to contact you” |
| PV-1 | developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information | „Support URL … This URL must lead to actual contact information (legal address, email address, telephone number), as may be required by local law … This property is required and can be localized.” |
| T-1 | Trening `docs/48-zgloszenie-1-0.md:111` (commit 2e4b0f8, odczyt 2026-11-09) | Z-17: „„No, we do not collect data from this app” → Publish” (zrobione 26.10.2026, `docs/18-przekazanie.md:589`) |
| T-2 | Trening `docs/45-formalnosci-asc.md:31-34` | „App Privacy — „Data Not Collected” (Q9 A)” … „Znane ryzyko: Apple wymienia wśród warunków wyjątku „Optional disclosure” podanie danych „in your app’s interface”… wtedy wariant B (Contact Info → Email Address, User Content → Customer Support, App Functionality, bez śledzenia).” |

## 2. Pytania formularza i odpowiedzi

| # | Pytanie (miejsce w ASC) | Odpowiedź | Dowód |
|---|---|---|---|
| 1 | App Privacy → Get Started: „do you or your third-party partners collect data from your app?” (MP-1) | **„No, we do not collect data from this app”** → Save; dalszych pytań brak (MP-1) | niżej 1a–1f |
| 1a | Czy aplikacja wysyła dane poza urządzenie? | Nie. Zero wywołań sieciowych w kodzie aplikacji: `grep fetch(\|XMLHttpRequest\|WebSocket` w `apps/mobile/src`, `packages/*/src` — 0 trafień (2026-11-09); jedyne adresy to odnośniki otwierane w przeglądarce/systemie: `apps/mobile/src/platform/adresy.ts:8`, `apps/mobile/src/features/opinie/Opinie.tsx:25`, `apps/mobile/src/data/content/helplines.generated.ts:42`. Klient `kit.openiap.dev` w `expo-iap` nieużywany (`docs/architektura/prywatnosc.md` §1 „Sieć”, kontrola K-07) | AP-1, AP-2 |
| 1b | Postęp, ustawienia, limit, dziennik | Tylko na urządzeniu (`postep.db`): tabele `packages/domena/src/eksport.ts:6`; dziennik `packages/postep/src/dziennik.ts:13-14`, limit 200 wpisów `packages/domena/src/konfiguracja.ts:24` | AP-2 |
| 1c | Zakupy | StoreKit przez `expo-iap` (`apps/mobile/src/platform/zakupy.ts:9-10`, `app.json:46`); dane zakupu zbiera Apple | AP-3 |
| 1d | Powiadomienia | Lokalne, bez APNs: `app.json:45` (`enableRemoteNotifications: false`), `apps/mobile/src/platform/powiadomienia.ts:18-21` | AP-2 |
| 1e | Prośba o ocenę | systemowe okno Apple: `apps/mobile/src/platform/opinie.ts:1,6` (`expo-store-review`, brak kodu sieciowego i manifestu w `node_modules/expo-store-review/ios`, 2026-11-09) | AP-3 |
| 1f | „Napisz do nas” / „Zgłoś błąd w tym zadaniu” | `mailto:` otwiera program pocztowy użytkownika (`Opinie.tsx:44`, `:61-62`); szkic: identyfikator zadania, wersja, język (`apps/mobile/src/i18n/locales/pl.json:113`); wysyła użytkownik, rzadko i dobrowolnie, poza główną funkcją. Traktowane jak w Treningu jako „optional disclosure” (T-1, T-2). Ryzyko jak T-2: kryterium „in your app’s interface” i „user’s name … prominently displayed in the submission form” — szkic powstaje w Poczcie, nadawca widoczny w polu „Od”. Realność: **brzegowa**; plan B jak T-2 | AP-4 |
| 2 | Tracking (pytanie nie pada przy „No”) | Brak: `app.json:18` `NSPrivacyTracking: false`, brak domen śledzących, brak SDK reklam i analityki (`apps/mobile/package.json`, zależności, 2026-11-09) | AP-5 |
| 3 | App Privacy → Privacy Policy → Edit: Privacy Policy URL (wymagany, AP-6, MP-2) | `[DO USTALENIA: adres z P-2]`; rekomendacja: `https://lkarwowski494.github.io/Szkola_pokera/privacy.html` (D-308). Ten sam adres w aplikacji (`ADRES_PRYWATNOSCI`, `apps/mobile/src/platform/adresy.ts:9`, dziś `null` — 08-F20, K-09); oba muszą istnieć przed wysłaniem (G-511: link w metadanych **i** w aplikacji) | G-511, MP-2 |
| 4 | User Privacy Choices URL | puste (opcjonalne, MP-2; aplikacja nie ma wyborów do zarządzania) | MP-2 |
| 5 | Support URL (strona wersji; wymagany, PV-1) | `https://lkarwowski494.github.io/Szkola_pokera/support.html` (rekomendacja; adres poczty W-04 `support@apps4brew.com` wpisany 2026-11-10; publikacja strony za zgodą właściciela, D-308) i danymi kontaktowymi wymaganymi lokalnie (PV-1: „legal address, email address, telephone number … as may be required by local law” — powiązane z J2 z D-301 i DSA E1) | PV-1, G-15 |

**Odpowiedź na pytanie z 08-F23** („Czy App Store wymaga adresu wsparcia w metadanych”): tak, Support URL jest wymagany i musi prowadzić do danych kontaktowych (PV-1, G-15). 08-F23 jest więc warunkiem wysyłki, nie tylko funkcją ukrytą (ocena ŚREDNIE dotyczy przycisków w aplikacji; strona wsparcia blokuje wysyłkę — K-10).

**Wariant B (gdyby recenzja zakwestionowała 1f), wzór T-2:** „Yes, we collect data” → Contact Info: Email Address; User Content: Customer Support; Diagnostics: Other Diagnostic Data (wersja, identyfikator zadania); cel: App Functionality; niepowiązane z reklamą, bez śledzenia. Zmienia NFR-PRYW-001 („Data Not Collected”) — decyzja właściciela przy takiej odpowiedzi recenzji.

## 3. Porównanie z manifestem prywatności (`apps/mobile/app.json:16-25`)

Metoda: odczyt `app.json`, `node tests/narzedzia/k08-manifesty.mjs` (2026-11-09: „pakiety natywne 39, z manifestem 7, trafienia w kodzie bez manifestu 53”, wszystkie 4 kategorie „ok”), inwentarz §2, grep kodu aplikacji.

| Pole | `app.json` | Stan z kodu i zależności | Zgodność |
|---|---|---|---|
| `NSPrivacyCollectedDataTypes` | `[]` (`:17`) | nic nie opuszcza urządzenia (1a) | zgodne z „Data Not Collected” |
| `NSPrivacyTracking` | `false` (`:18`) | brak śledzenia | zgodne |
| `NSPrivacyTrackingDomains` | `[]` | brak domen | zgodne |
| UserDefaults | CA92.1 (`:21`) | RN, Expo, OpenIAP `OpenIapFirstPurchaseNotice.swift:11` (inwentarz §2; pakiet Swift pobierany przy `pod install`, nie sprawdzony ponownie); brak App Group | zgodne |
| SystemBootTime | 35F9.1 (`:22`) | RN | zgodne |
| FileTimestamp | **C617.1** (`:23`) | C617.1 (SQLite, RN, expo-application) **oraz 3B52.1**: `expo-document-picker` bez własnego manifestu czyta `contentModificationDateKey` pliku wybranego przez użytkownika (`node_modules/expo-document-picker/ios/DocumentPickerModule.swift:128`, sprawdzone 2026-11-09; import postępu, `apps/mobile/src/platform/pliki.ts:47`) | **rozbieżność → 10-PRYW-01** |
| DiskSpace | E174.1, 85F4.1 (`:24`) | E174.1: `fstatfs`/`statfs` w SQLite (expo-sqlite bez manifestu), expo-file-system. 85F4.1 („display to user”) pochodzi z manifestu `expo-file-system`; kod aplikacji nie pokazuje wolnego miejsca (grep `DiskSpace\|freeDiskStorage\|volumeAvailableCapacity` w `apps/mobile/src`, `packages/*/src`: 0 trafień) | zgodne (85F4.1 nadmiarowe, ale opisuje zależność; bez zgłoszenia). Otwarte z inwentarza: wywołanie SQLite czyta typ systemu plików, nie wolne miejsce — E174.1 jako najbliższy; zostaje `[DO USTALENIA]` do odpowiedzi Apple, jeśli e-mail ITMS-91053 przyjdzie mimo wpisu |
| ActiveKeyboards | brak | brak użycia (inwentarz §2) | zgodne |
| `ITSAppUsesNonExemptEncryption` | `false` (`:15`) | poza zakresem tego dokumentu (moduł szyfrowania, plan 1.0) | — |

## 4. Zgłoszenia

| ID | Dla | Opis | Dowód | Realność / próg |
|---|---|---|---|---|
| 10-PRYW-01 | 08 (ścieżka wrażliwa `app.json`, przegląd D-043) | Dodać `3B52.1` do `NSPrivacyAccessedAPICategoryFileTimestamp` w `expo.ios.privacyManifests` (obok `C617.1`). Apple: powody mają „accurately reflect your use” (Describing use of required reason API; cytat z modułu roli 10, odczyt 18.10.2026); Expo (inwentarz §2, odczyt 2026-11-04): powody zależności bez manifestu deklaruje aplikacja. Test: K-08 rozszerzony o wymóg 3B52.1 przy `expo-document-picker` (dziś K-08 sprawdza tylko obecność kategorii) | `app.json:23`; inwentarz §2 („Wniosek dla roli 10”: C617.1, 3B52.1) | brzegowa; ŚREDNIE (nie blokuje: kategoria jest zadeklarowana, więc ITMS-91053 nie powinien przyjść [OCENA]); przed buildem 1.0. **Zrobione 2026-11-09 (D-326):** `app.json:23` C617.1 + 3B52.1; K-08 sprawdza powody z `POWODY_WYMAGANE` |
| 10-PRYW-02 | 05 (dokument) | Inwentarz §1 i §4 mówią, że zgłoszenie błędu może zawierać wpisy dziennika; kod wysyła tylko identyfikator zadania, wersję i język (`pl.json:113`, `Opinie.tsx:61`). Inwentarz także nie wymienia `expo-store-review` (dodany w 08 cz. 5b; brak manifestu i trafień, 1e). Poprawić inwentarz albo — jeśli dziennik ma trafiać do szkicu — najpierw politykę i ten dokument | `docs/architektura/prywatnosc.md` §1 wiersz „Zgłoszenie błędu”, §4 | teoretyczna dla etykiety; NISKIE |
| 08-F20 (aktualizacja) | 08 / właściciel | Po P-2: `ADRES_PRYWATNOSCI` = adres z D-308; strona musi istnieć przed buildem do recenzji | `adresy.ts:9` | WYSOKIE bez zmian |
| 08-F23 (aktualizacja) | 08 / właściciel | Support URL wymagany (PV-1): strona `support.html` z adresem poczty W-04 przed wysyłką | PV-1 | blokuje wysyłkę (strona), przyciski w aplikacji — ŚREDNIE bez zmian |

## 5. Kroki właściciela (W-06, ok. 10 min, po publikacji strony)
1. App Store Connect → aplikacja → App Privacy → Get Started → „No, we do not collect data from this app” → Save; potem Publish (T-1).
2. Tamże: Privacy Policy → Edit → adres z D-308 (po włączeniu strony, P-2) → Save. Lokalizacja adresu: jeden adres dla wszystkich języków (strona dwujęzyczna, jak Trening).
3. Strona wersji: Support URL = `…/support.html`.
