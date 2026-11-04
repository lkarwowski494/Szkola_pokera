# Architektura E0: rozpoznanie
Rola 05 Architekt systemu, tryb build, E0 · 2026-11-04 (dwunasta sesja) · Prompt: `assemble.mjs 05-architekt --tryb build` (prompts c025063; moduły `dane-lokalne-sqlite`, `pakiety-tresci`, `tlo-i-sensory-ios`), przeczytany w całości.

Wejście: `docs/scope-contract.md` (D-112), `docs/design/design-spec.md` (D-123), `docs/brd/wymagania.md` (NFR), `docs/brd/wymagania-sklep.md` (BR-LIM, BR-DANE), `docs/monetyzacja.md` (kontrakt płatności, szkic ADR biblioteki), `docs/decyzje.md` (D-101–D-123), `CLAUDE.md`, kod `apps/mobile`, `packages/*`, rejestr 03 na Dysku (ADR-01–ADR-26, odczyt przez konektor Drive 2026-11-04). Analogie: repo `trening` (publiczne, klon 2026-11-04).

## 1. Środowisko
| Sprawdź | Wynik |
|---|---|
| System, Node, git | Linux x86_64 (chmura), Node 22.23.4, pnpm 10.28.0; gałąź `claude/sleepy-brahmagupta-2065nu` = 79ac5bd |
| SQLite do eksperymentów | brak `sqlite3`; `node:sqlite` działa (SQLite 3.53.4, ostrzeżenie „experimental”) |
| GitHub | MCP GitHub, push na gałąź roboczą; repo publiczne (minuty Actions darmowe, nic poufnego w commitach) |
| Przeglądarka | Chromium + Playwright (nieużywane w tej roli) |
| Xcode, symulator, iPhone | brak: pomiary na urządzeniu (start, zapytania, zakupy, powiadomienia) to kroki właściciela |
| Sieć | docs.expo.dev, developer.apple.com (JSON dokumentacji), registry.npmjs.org, GitHub raw: tak; www.npmjs.com: 403 |
| CI na `main` (MCP, odczyt 2026-11-04) | E2E (Maestro, iOS) czerwony w przebiegach 13–18 (15–20.10.2026), od 20.10 brak przebiegów; znalezisko dla roli 07 (zasada 21), bez zmian od roli 03 |
| Bramka opłacalności (zasada 20) | `docs/monetyzacja.md`: werdykt „budować” (słaby dowód), aktualny |

## 2. Założenia z wejścia (hipotezy do sprawdzenia, nie prawda)
| Założenie | Skąd | Stan po E0 |
|---|---|---|
| Cała nauka bez sieci; sieć tylko sklep i linki | NFR-OFF-001, kontrakt pkt 05 | zgodne z kodem (treść w paczce: `content-v6.db`) |
| 0 domen poza sklepem, 0 SDK raportów awarii („Data Not Collected”) | NFR-PRYW-001, OP-12 | **kod przeczy**: `@sentry/react-native` i `expo-observe` w zależnościach, `privacyManifests` deklaruje CrashData, PerformanceData, OtherDiagnosticData; usunięcie = ADR (sekcja 6) |
| Jedyni użytkownicy to właściciel (TestFlight 1005–1008, testy wewnętrzne) | `CLAUDE.md` | przyjęte; schemat bazy w tych buildach: `[DO USTALENIA]` (historia repo płytka: 50 commitów od 2026-11-03, bez tagów buildów); kod ma migracje drizzle 0000–0002 |
| 35 języków treści | `CLAUDE.md`, NFR-JEZ-001 | treść i interfejs dziś tylko `pl` (`meta.locale = 'pl'`, `src/i18n/pl.ts`) |
| Limit liczony w dniu kalendarzowym telefonu | BR-LIM-005 | przyjęte; OP-24 (ponowna instalacja) do ADR |
| Biblioteka płatności `expo-iap` | `docs/monetyzacja.md`, szkic ADR | `expo-iap` 6.4.2 (MIT, registry 2026-11-04); repo `hyochan/expo-iap` zarchiwizowane, rozwój w `hyodotdev/openiap` (README, odczyt 2026-11-04) — do ADR |

Rejestr założeń `docs/zalozenia.md`: bez nowych wpisów w E0; podważenie NFR-PRYW-001 przez kod to nie założenie, tylko znalezisko (kod sprzed sztafety).

## 3. Przepływ → technika
| Przepływ (funkcje) | Dane czytane / zapisywane | Zdarzenia | Tło | Offline | Uprawnienia | Stany wymagające techniki |
|---|---|---|---|---|---|---|
| PR-01 pierwszy ekran i ocena poziomu (F-02, F-01) | treść pytań (baza treści); zapis: wynik oceny, punkt startu, stan „ocena przerwana” | użytkownik | — | pełne | — | przerwanie w połowie (powrót albo start od M0) |
| PR-02 lekcja i test modułu (F-03, F-04, F-06) | lekcje, zadania, słownik, liczby (baza treści); zapis: postęp lekcji, miejsce w lekcji, wyniki testów, odpowiedzi | użytkownik | — | pełne | — | powrót w tym samym miejscu; test powtórny z limitu |
| PR-03 sesja ćwiczeń z oceną (F-07, F-05, F-08, F-09, F-18) | zadania, progi, zakresy; zapis: sesja w toku (zadanie, odpowiedzi), odpowiedzi, karty i log powtórek, zużycie limitu dnia | użytkownik, zmiana dnia (limit), `AppState` (przerwanie) | — | pełne | — | przerwanie i powrót w tym samym zadaniu (BR-CWI-004); limit przed startem, nie w trakcie (BR-LIM-001, -002) |
| PR-04 powtórki (F-10, F-11) | karty FSRS, log; zapis: jak PR-03 | użytkownik, data i strefa telefonu | powiadomienie lokalne codzienne (planuje system) | pełne | powiadomienia (za zgodą) | odmowa zgody bez skutków; zmiana strefy; limit wyczerpany: harmonogram przesunięty, nie skasowany (BR-LIM-004) |
| PR-05 scenariusz (F-12) | scenariusze (treść); zapis: przebieg (decyzje), podsumowanie | użytkownik | — | pełne | — | powrót w tej samej decyzji; tylko akcje z oceną (D-109) |
| PR-06 zakup (F-13, F-18) | produkty i transakcje ze sklepu; zapis: pamięć podręczna uprawnień | użytkownik, nasłuch transakcji, zwrot | — | dostęp z pamięci do końca okresu | konto sklepu (system) | ceny niedostępne, przywracanie bez zakupu, zwrot (`design-spec.md`, macierz) |
| PR-07 eksport, import, usunięcie (F-14) | cała baza użytkownika; plik eksportu | użytkownik, udostępnianie systemu, wybór pliku | — | pełne | — (systemowy wybór pliku) | plik uszkodzony, obcy, z nowszej wersji; import przy istniejącym postępie (BR-DANE-002) |
| PR-08 pomoc (F-15) | numery pomocy dla regionu (treść), region telefonu | użytkownik, dotknięcie numeru | — | pełne | — | kraj bez wpisu (RD-12-W6), urządzenie bez telefonu |
| PR-09 opinie (F-17) | wersja, język, identyfikator zadania; zapis: licznik prac i data ostatniej prośby (D-110) | koniec lekcji / sesji | — | poczta czeka w programie pocztowym | — | brak programu pocztowego (adres do skopiowania) |
| Wszystkie (F-16) | język aplikacji (ustawienie), zapis liczb wg języka | zmiana języka systemu | — | pełne | — | brak tłumaczenia klucza (nie wolno: NFR-JEZ-001 = 100%) |

## 4. Skala danych ([OCENA], założenia jawne)
| Dane | Założenie | Po 1 roku | Po 3 latach |
|---|---|---|---|
| Odpowiedzi (`answers`) | darmowy: 1 aktywność × ok. 15 zadań dziennie, 250 dni aktywnych w roku; Pro: 3 aktywności | 3,8 tys. (darmowy) / 11 tys. (Pro) | 11 tys. / 34 tys. |
| Log powtórek | ≈ liczba odpowiedzi | jw. | jw. |
| Karty powtórek | 1 na rodzinę zadań; rodzin ≤ liczba zadań (392 + 137 egzaminacyjnych) | ≤ 530 | ≤ 530 + nowe z kwartalnych aktualizacji (D-108) |
| Postęp lekcji, testy, scenariusze | 44 lekcje, 14 modułów, scenariusze z treści | setki wierszy | setki wierszy |
| Rozmiar bazy użytkownika | ok. 100–150 B na wiersz odpowiedzi i logu | < 5 MB | < 15 MB |
| Treść `pl` (pomiar `content-v6.db`, 2026-11-04) | plik 1 024 000 B; dane w kolumnach: lekcje 156 KB, zadania 323 KB, egzaminy 121 KB, reguły 58 KB, zakresy 59 KB, terminy 6 KB | — | — |
| Treść 35 języków | tekst powielony na język, zakresy i liczby wspólne | ok. 25–35 MB nieskompresowane [OCENA] | + kwartalne aktualizacje |

Wniosek: skala nie wymaga indeksów poza kluczami obcymi i datą; rozmiar treści jest 2 rzędy wielkości poniżej sufitu sklepu (sekcja 5).

## 5. Rejestr ograniczeń platformy (odczyt 2026-11-04; surowy tekst przez `curl` + `grep`, strony Apple przez JSON dokumentacji)
| Ograniczenie | Wartość | Źródło i cytat | Wpływ |
|---|---|---|---|
| Wersja Expo | SDK 58 (`expo` 58.0.23, registry.npmjs.org); kod na SDK 57 (`expo ~57.0.26`) | docs.expo.dev/versions/latest/sdk/sqlite: „Recommended version: ~58.0.15” | ADR wersji SDK przed rolą 08 |
| Transakcja wyłączna i klucze obce | nowe połączenie bez pragm | docs.expo.dev …/sqlite: „withExclusiveTransactionAsync() runs on a new database connection, so connection settings made on your original database, such as PRAGMA foreign_keys = ON , do not apply inside it.” | ścieżka zapisu: jedna kolejka na połączeniu z `foreign_keys = ON` (moduł SQLite) |
| Transakcja zwykła nie jest wyłączna | — | jw.: „any query that runs while the transaction is active will be included in the transaction. This includes query statements that are outside of the scope function” | kolejka zapisów w porcie bazy |
| `execAsync` bez parametrów | — | jw.: „`execAsync()` does not escape parameters and may lead to SQL injection.” | tylko stały SQL z kodu |
| Kopia działającej bazy | `backupDatabaseAsync({ destDatabase, destDatabaseName, sourceDatabase, sourceDatabaseName })` | jw., sekcja Methods | kopia przed importem i migracją z przebudową |
| Baza treści z paczki | `assetSource.forceOverwrite`: „Force overwrite the local database file even if it already exists. Default: false” | jw. | obecny kod nadpisuje przy każdym starcie (treść zawsze z paczki) |
| Miejsce plików | document: „safe from being deleted by the system”; cache: „can be deleted by the system when the device runs low on storage” | docs.expo.dev/versions/latest/sdk/filesystem (~58.0.13) | baza użytkownika w dokumentach, nigdy w cache |
| Kopia iCloud | `/tmp` i `Library/Caches` poza kopią; dane tworzone przez użytkownika: „Nonpurgeable data is data the user creates, or data the app requires to function as the user expects.” | developer.apple.com/documentation/foundation/optimizing-your-app-s-data-for-icloud-backup | baza użytkownika w kopii iCloud (przywrócenie na nowym telefonie bez eksportu); treść z paczki odtwarzalna |
| Uprawnienia po ponownej instalacji | „When users reinstall your app or download it on a new device, the app automatically has all transactions available to it upon initial launch.” | developer.apple.com/documentation/storekit/appstore/sync() | uprawnienia ze sklepu, lokalnie tylko pamięć podręczna |
| Przywracanie | „Call this function only in response to an explicit user action, like tapping or clicking a button.” | jw. | `sync` tylko z przycisku „Przywróć zakupy” |
| Zwroty | „Products that the App Store has refunded or revoked don’t appear in the current entitlements.” | developer.apple.com/documentation/storekit/transaction/currententitlements | wektor „zwrot dożywotniego” z kontraktu płatności |
| Zarządzanie subskrypcją | arkusz pozwala „view, upgrade, downgrade, or cancel their subscription” | developer.apple.com/documentation/storekit/appstore/showmanagesubscriptions(in:) | OP-09: anulowanie tylko przez arkusz systemowy, nie przez aplikację (wniosek z opisu; potwierdzenie w ADR) |
| Mechanizm przywracania | „you should make sure you have a restore mechanism for any restorable in-app purchases” | App Review Guidelines 3.1.1 (developer.apple.com/app-store/review/guidelines, odczyt 2026-11-04) | przycisk w zakupie i ustawieniach |
| Bez konta | „If your app doesn’t include significant account-based features, let people use it without a login.” (5.1.1) | jw. | brak konta zgodny z decyzją |
| Required reason API | „apps that don’t describe their use of required reason API in their privacy manifest file aren’t accepted by App Store Connect” | developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api | inwentarz w E3 po instalacji zależności |
| Manifest w Expo | „privacyManifests field under expo.ios in your app config” | docs.expo.dev/guides/apple-privacy | obecny wpis do przebudowy (usunięcie typów danych zbieranych) |
| Powiadomienie codzienne | `DailyTriggerInput`: „delivered once per day when the hour and minute date components match the specified values” | docs.expo.dev/versions/latest/sdk/notifications (~58.1.8) | jedno zaplanowane powiadomienie powtarzane przez system, bez pracy w tle |
| Zgoda na powiadomienia | `getPermissionsAsync`: „There is no user-facing effect”; `requestPermissionsAsync` pokazuje prośbę systemu | jw. | najpierw odczyt, prośba po zdaniu wyjaśnienia (F-11) |
| Strefa telefonu | `getCalendars()` zwraca m.in. `"timeZone" : "Europe/Warsaw"` (przykład w dokumentacji) | docs.expo.dev/versions/latest/sdk/localization (~58.0.5) | granica dnia limitu (BR-LIM-005) |
| Udostępnianie i wybór pliku | `expo-sharing` ~58.0.22, `expo-document-picker` ~58.0.4 | strony SDK, „Recommended version” | eksport i import (F-14); bez nowych uprawnień |
| Rozmiar aplikacji | iOS 9.0+: 4 GB nieskompresowane | developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes („Maximum uncompressed app size … 4 GB”) | treść 35 języków w paczce mieści się z dużym zapasem |
| Zawieszenie z blokadą pliku (`0xdead10cc`) | stan modułu z 18.10.2026 (developer.apple.com/documentation/xcode/sigkill) | ponowny odczyt w E3 | dotyczy każdej aplikacji z SQLite: krótkie zapisy, nic nie czeka w transakcji |

Nie potwierdzone w dniu pracy (do E1–E3): `[DO USTALENIA]` dostępność modułu JS dla `beginBackgroundTask` w SDK 58; czy `expo-iap` 6.x ma własny `PrivacyInfo.xcprivacy` i czy łączy się z czymkolwiek poza StoreKit (sprawdzenie po instalacji: `find node_modules -name PrivacyInfo.xcprivacy`); limit liczby zaplanowanych powiadomień lokalnych na iOS (przeczytane strony go nie podają; projekt używa jednego).

## 6. Stan kodu (co jest i co da się wziąć)
| Obszar | Stan | Wniosek do ADR |
|---|---|---|
| Monorepo pnpm: `poker-core`, `srs`, `content-schema`, `tools/content-build` (ADR-06) | czysty TypeScript, 41 plików testów; `poker-core`, `srs` bez React Native (`CLAUDE.md`) | zostaje: to już „domena” w rozumieniu zasady 6 |
| Treść: YAML → `content-v6.db` w paczce, tylko do odczytu, nadpisywana przy starcie (ADR-08, ADR-16) | jeden język (`pl`), 1 MB | ADR treści: układ dla 35 języków (jedna baza czy baza na język), wersjonowanie i reakcja na usunięte zadania (BR-DANE-004) |
| Baza użytkownika: `user.db`, drizzle 0.45 + migrator drizzle (`__drizzle_migrations`), API synchroniczne, bez kluczy obcych, UPSERT w `recordAnswer` | 11 tabel, w tym 4 tabele gry z botami (F-19 = NIE) | ADR przechowywania i migracji: drizzle zostaje czy port bazy + `user_version`; tabele gry poza schematem v1 (kontrakt: „bez nowych tabel … na zapas dla F-19–F-21”) |
| Stan interfejsu: zustand tylko kopia, źródłem prawdy SQLite (ADR-09) | zgodne z wzorcem | zostaje |
| Raporty awarii: Sentry (ADR-17) i EAS Observe | sprzeczne z NFR-PRYW-001 i OP-12 | ADR: usunięcie obu; dziennik lokalny bez wysyłki; raportowanie awarii w ogóle — rola 12 |
| Płatności | brak kodu; ADR-18 „Do decyzji” (RevenueCat) | ADR biblioteki (szkic roli 02: `expo-iap`) |
| Eksport, import, limit, przypomnienie, pomoc z regionem | brak (pomoc: ekran i `helplines.generated.ts` jest) | nowe moduły domeny i adaptery |
| Diagnostyka, tryb na czas, księga reguł, gra z botami (D-104) | w kodzie | ADR kodu bez BR: ukrycie w buildzie wydania czy usunięcie (05 z 08) |

## 7. Stosowalność modułów
| Moduł | Decyzja | Powód |
|---|---|---|
| `dane-lokalne-sqlite` | tak | dane użytkownika w relacyjnej bazie na urządzeniu (odpowiedzi, karty, log), eksport i import, migracje |
| `pakiety-tresci` | tak, bez pobierania | treść wersjonowana osobno od kodu (`content-build`), 35 języków; dostarczenie w paczce to opcja do ADR obok pobierania (pobieranie łamie NFR-PRYW-001 i NFR-KOSZT-001, jeśli nie z serwerów Apple) |
| `tlo-i-sensory-ios` | częściowo | bez lokalizacji, dźwięku i trybów tła; dotyczy: zawieszenie bez blokady pliku (każda aplikacja z SQLite), powiadomienie lokalne planowane na porę (zasada 4 modułu: czas z zapisanych znaczników) |

Kod z innych aplikacji właściciela: tylko decyzje i dokumenty Treningu (delegacja w `CLAUDE.md`); kodu z Treningu nie biorę bez wskazania (pytanie P-2 niżej).

## 8. ADR do podjęcia w E1 (status „proponowana”)
| Nr | Obszar | Opcje (co najmniej dwie) | Kto decyduje |
|---|---|---|---|
| 0001 | Wersja Expo SDK na start budowy | 57 (obecny) · 58 (aktualny) | agent (technika) |
| 0002 | Przechowywanie danych użytkownika | SQLite (expo-sqlite) · pliki JSON z wersją · klucz-wartość | agent; wariant bez relacyjnej bazy rozważony |
| 0003 | Dostęp do bazy i migracje | drizzle + migrator drizzle · port bazy (`run/all/transakcja`) z kolejką i `user_version` · drizzle tylko jako budowniczy zapytań na porcie | agent |
| 0004 | Schemat v1 a bazy z buildów 1005–1008 | migracja ze schematu drizzle · nowy schemat v1, stara baza odłożona obok bez kasowania | **właściciel** (P-1) |
| 0005 | Treść: dostarczenie i układ 35 języków | w paczce, baza na język · w paczce, jedna baza · Apple-Hosted Background Assets · własny serwer | agent (fakty), rozmiar pobrania produktowo, jeśli > [OCENA] 50 MB |
| 0006 | Płatności | `expo-iap` · RevenueCat · własny StoreKit 2 | agent na podstawie OP-12 i szkicu 02 (zastępuje ADR-18) |
| 0007 | Licznik dziennego limitu (OP-24) | lokalny w bazie · Keychain (przeżywa ponowną instalację) | agent z delegacji, analogia Trening (lokalny licznik; ryzyko zmiany daty przyjęte jako teoretyczne, `trening/docs/40-lekcje.md` R-M5-2) |
| 0008 | Kopia i przeniesienie | eksport pliku + kopia iCloud systemu · tylko eksport · usługa chmurowa | agent (W-05 odrzuca synchronizację) |
| 0009 | Raporty awarii i analityka | usunąć Sentry i Observe, dziennik lokalny · zostawić Observe bez błędów | agent na podstawie NFR-PRYW-001 (zastępuje ADR-17); raportowanie: rola 12 |
| 0010 | Maszyny stanów (sesja, limit, scenariusz, zakup) | maszyna w domenie z tabelą przejść · flagi w ekranach | agent |
| 0011 | Kod bez BR (D-104) | ukryć w buildzie wydania (flaga z konfiguracji) · usunąć z repo | agent z rolą 08 |
| 0012 | Przypomnienie (F-11) | `expo-notifications` z wyzwalaczem codziennym · bez przypomnienia systemowego (tylko licznik w aplikacji) | agent; F-11 jest w zakresie (D-102), więc druga opcja tylko jako odniesienie |

## 9. Pytania produktowe
- **P-1 (ADR 0004): dane z buildów TestFlight 1005–1008.** Jedynym użytkownikiem jest właściciel; schemat tych buildów jest nieznany z repo.
  - (a) **Rekomendacja:** nowy schemat v1 od zera; przy pierwszym starcie nowej wersji stary plik `user.db` zostaje przemianowany i zachowany obok (nie kasowany, nieczytany). Koszt: postęp testowy właściciela nie przechodzi do nowej wersji. Wyjątek od zasady 10 nazwany: dotyczy tylko danych testowych właściciela, bez użytkowników zewnętrznych; tańsza kontrola zamiast migracji: plik zachowany, a migracja od v1 testowana na kopii każdej wydanej wersji od pierwszego wydania sztafety.
  - (b) migracja ze schematu drizzle 0002: wymaga wzorca bazy z builda 1008 (plik z telefonu, krok właściciela przez Xcode albo eksport, którego stara aplikacja nie ma) i kodu przenoszącego 4 tabele gry, których v1 nie ma. Koszt: ok. 2–3 h agenta i krok właściciela na Macu.
- **P-2: kod z Treningu.** Czy wolno brać z repo `trening` wzorce kodu (eksport i import pliku, `expo-iap`, przypomnienie), a nie tylko decyzje?
  - (a) **Rekomendacja: tak, jako wzorzec do przepisania z testami** (rola 08), bo Trening jest na tym samym SDK 57 i ma w zależnościach `expo-iap` 5.8.1, `expo-document-picker`, `expo-sharing`, `expo-notifications` (`trening/package.json`), a jego linia 1.0 przeszła testy zakupów na telefonie (`trening/docs/18-przekazanie.md`, wpis 29.10.2026); (b) nie, tylko dokumenty i decyzje (więcej pracy roli 08, zero ryzyka przeniesienia cudzych założeń).

## 10. Plan i czas
| Etap | Agent | Oczekiwanie | Właściciel |
|---|---|---|---|
| E1 ADR 0001–0012, eksperymenty `node:sqlite` (kolejka, UPSERT, kaskada, migracja), zapis D-124+ | ok. 2 h | — | odpowiedzi P-1, P-2 (5 min); ewentualne weto |
| E2 moduły, `schemat.sql` z dowodem, konfiguracja, ścieżki utraty danych | ok. 2–2,5 h | — | przegląd bramki (10 min) |
| E3 tło (zawieszenie, powiadomienie), błędy, `prywatnosc.md`, budżety, kontrole dla 07 | ok. 1,5–2 h | — | decyzja o budżecie OP-21 dopiero po pomiarze bazowym (krok na iPhonie po implementacji, ok. 15 min) |
| E4 `README.md`, definicja ukończenia, „Ścieżki wrażliwe” w `CLAUDE.md` | ok. 1 h | — | zgoda na wpis w `CLAUDE.md` |

Stan poza gitem (zgłoszenie, bez zmian): rejestr 03 i dokument 13 na Dysku bez wpisów D-101–D-123 (konektor nie edytuje Google Docs); nowe ADR roli 05 zastąpią ADR-08 (częściowo), ADR-17 i ADR-18 z rejestru 03 — wpis zastąpienia też czeka na właściciela.
