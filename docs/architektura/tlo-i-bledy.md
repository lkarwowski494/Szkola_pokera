# Praca w tle i polityka błędów (rola 05 E3, 2026-11-04)
Decyzje: ADR 0003 (port bazy), 0010 (maszyny stanów), 0012 (przypomnienie), 0013 (ochrona długich operacji). Moduł roli: `tlo-i-sensory-ios`, stosowany częściowo (00-rozpoznanie, sekcja 7). Dowód: [`eksperymenty/e3-blokady-czasy.mjs`](eksperymenty/e3-blokady-czasy.mjs), wynik [`e3-blokady-czasy.wynik.txt`](eksperymenty/e3-blokady-czasy.wynik.txt) (10 wyników zgodnych, kod wyjścia 0).

## 1. Praca w tle: przegląd wymiaru
| Element modułu | Dotyczy? | Ustalenie |
|---|---|---|
| Lokalizacja, geofencing, limit 20 regionów | nie (sprawdzone, brak) | kontrakt: „Uprawnienia: tylko powiadomienia”; brak `expo-location` w zależnościach |
| Dźwięk i sesja dźwięku (także start z tła) | nie (sprawdzone, brak) | dźwięk „domyślnie wyłączony; włączony zawsze razem z haptyką” (`design-spec.md:31`), tylko na pierwszym planie; bez trybu `audio` |
| Zadania w tle (`expo-background-task`), tryby tła | nie | `UIBackgroundModes` pusty (ADR 0012 pkt 4) |
| Powiadomienie lokalne F-11 | tak | sekcja 3 |
| Zawieszenie bez blokady pliku (`0xdead10cc`) | tak | sekcja 2, ADR 0013 |
| Czas z zapisanych znaczników | tak | limit dnia z `aktywnosc.dzien_lokalny` i strefy (ADR 0007); powrót do aktywności z `aktywnosc.krok` (ADR 0010); bez `setInterval` |
| Przerwania (połączenie, przełączenie aplikacji, zabicie procesu) | tak | stan zapisany po każdym kroku w jednej transakcji (ADR 0010); powrót w tym samym zadaniu (BR-CWI-004) |
| Uprawnienie odebrane w trakcie | tak (powiadomienia) | sekcja 3, pkt 4 |

## 2. Zawieszenie bez blokady pliku
Źródło (odczyt 2026-11-04, developer.apple.com/documentation/xcode/sigkill): „The operating system terminated the app because it held on to a file lock or SQLite database lock during suspension. […] Make this request well before starting to write to the file in order to complete those operations and relinquish the lock before the app suspends.” Okno po przejściu do tła: „five seconds to perform any tasks and return” (developer.apple.com/documentation/uikit/extending-your-app-s-background-execution-time).

Kiedy blokada jest trzymana (tryb `DELETE`, pomiar `e3-blokady-czasy.mjs`):
| Stan połączenia | Plik zablokowany dla innych? | Test |
|---|---|---|
| bez transakcji i bez otwartego kursora | nie | 2a, 2c, 2f |
| otwarta transakcja zapisu | tak | 2b |
| otwarta transakcja odczytu | tak (blokada współdzielona) | 2d |
| niedokończony kursor poza transakcją | tak | 2e |

Klasyfikacja operacji (czasy z laptopa w chmurze, dane 3-letnie; punkt odniesienia, nie budżet):
| Operacja | Czas (laptop) | Klasa | Ochrona |
|---|---|---|---|
| krok aktywności (UPSERT odpowiedzi + krok, jedna transakcja) | p50 1,7 ms, p95 3,4 ms, maks 6,7 ms (200×) | krótka | kolejka portu; kończy się w oknie 5 s |
| zapis ustawienia, pamięci uprawnień, dziennika | rząd kroku (pojedynczy wiersz) | krótka | jw. |
| kopia `VACUUM INTO` | mediana 87 ms | długa | ADR 0013 |
| eksport (odczyt 7 tabel w transakcji + JSON) | mediana 460 ms, maks 1 067 ms | długa | ADR 0013 |
| „Usuń postęp” | mediana 260 ms | długa | ADR 0013 |
| import (70 tys. wierszy, jedna transakcja) | mediana 2 664 ms, maks 3 132 ms | długa, ryzyko realne | ADR 0013 |
| migracja z przebudową | zależy od migracji | długa | ADR 0013 pkt 7 |

Zasady dla roli 08 (wiążące przez ADR 0003 i 0013):
1. Transakcja nie czeka na sieć, sklep, okno dialogowe, wybór pliku ani udostępnianie. Kolejność eksportu: odczyt i zapis pliku tymczasowego → koniec transakcji → arkusz udostępniania. Importu: wybór pliku → odczyt i walidacja tekstu → potwierdzenie → dopiero wtedy `rozpocznij` i transakcja.
2. Zapis pliku eksportu (`expo-file-system`) nie trzyma blokady bazy: dane odczytane w transakcji, plik zapisany po `COMMIT`.
3. `AppState` → `background`: port kończy kolejkę, nie przyjmuje nowych operacji długich; operacja długa bez przyznanego czasu (`rozpocznij` = −1) przerywa się na granicy instrukcji (ADR 0013 pkt 4).
4. `AppState` → `active`: odczyt dnia lokalnego i strefy (limit mógł się odnowić, BR-LIM-005), odczyt zgody na powiadomienia (sekcja 3, pkt 4); uprawnienia ze sklepu z nasłuchu transakcji (ADR 0006).
5. Baza i pliki nie leżą we wspólnym kontenerze (App Group); rozszerzenia aplikacji: brak. Zmiana wymaga osobnego ADR.

## 3. Powiadomienie F-11 (ADR 0012) — uzupełnienie z E3
1. **Wtyczka `expo-notifications` z `enableRemoteNotifications: false`.** Docs.expo.dev …/notifications (odczyt 2026-11-04): „`enableRemoteNotifications` true … Whether to enable remote notifications. If set to false, the plugin does not add the APNs entitlement, which is useful for apps that use only local notifications. Remote notifications do not work in this case.” Kod wtyczki 58.1.8 (`plugin/build/withNotificationsIOS.js:53-56`): przy wartości domyślnej dodaje `aps-environment`. Aplikacja nie ma serwera push (NFR-PRYW-001), więc uprawnienie push byłoby nieużywane (zasada 7 modułu: tylko to, czego używa przepływ). Trening używa wartości domyślnej (`trening/app.json`: `["expo-notifications", { "color": "#1F5FD1" }]`, odczyt 2026-11-04) — tu odstępstwo od analogii, z powodem. W kodzie Treningu nie znalazłem rejestracji push (wyszukiwanie kodu GitHub `PushTokenAsync repo:lkarwowski494/trening`: 0 wyników, 2026-11-04; indeks wyszukiwarki może być niepełny), więc znalezisko prawdopodobnie dotyczy także Treningu — informacja dla właściciela, cudzego repo nie zmieniam.
2. `getDevicePushTokenAsync` / `getExpoPushTokenAsync` nie są wywoływane (rejestracja w APNs tylko na żądanie: `ios/ExpoNotifications/PushToken/PushTokenModule.swift:44`); kontrola statyczna w `kontrole-07.md`.
3. Bez `enableBackgroundRemoteNotifications` (domyślnie wyłączone, wtyczka dodaje wtedy `remote-notification` do `UIBackgroundModes`, `withNotificationsIOS.js:68-82`).
4. Drabina uprawnień (jedyne uprawnienie aplikacji): `getPermissionsAsync` („There is no user-facing effect”) → zdanie wyjaśnienia (rola 04/06) → `requestPermissionsAsync` po akcji użytkownika. Odmowa albo odebranie zgody w Ustawieniach: przy powrocie na pierwszy plan odczyt zgody; przełącznik pokazuje stan „wyłączone w Ustawieniach telefonu” z przejściem do ustawień systemu (stan do zaprojektowania przez rolę 04); `ustawienie.przypomnienie` zostaje (po przywróceniu zgody przypomnienie wraca bez ponownego wyboru pory).
5. Planowanie: przy starcie, zmianie ustawienia, imporcie i zmianie języka: anuluj własne → zaplanuj jedno (ADR 0012 pkt 1). Po „Usuń postęp” — anuluj (dane.md).

## 4. Polityka błędów projektu
Błędy domeny i portów są wartościami `{ ok: false, powod }` (moduly.md, `Wynik`); adaptery tłumaczą wyjątki `expo-sqlite`, `expo-iap`, `expo-file-system`, `expo-notifications` na te wartości. Pusty `catch` przy zapisie jest zakazany (kontrola statyczna). Każdy błąd poza „oczekiwanym z udziałem użytkownika” trafia do dziennika (`dziennik`: czas, `kod`, ekran, wersja; bez treści odpowiedzi, bez identyfikatorów osób; ADR 0009).

| Rodzaj | `powod` / kod dziennika | Skąd (rozpoznanie w adapterze) | Zachowanie | Stan w projekcie (rola 04) |
|---|---|---|---|---|
| Oczekiwany, z udziałem użytkownika | `bledny_plik`, `nowsza_wersja` | walidacja eksportu (ADR 0008) | import nie zaczyna się; dane bez zmian | **brak w macierzy** — do zaprojektowania (ekran Dane) |
| jw. | `limit_wyczerpany` | `mozeStartowac` (ADR 0007) | ekran limitu i zakupu | jest (macierz: Limit) |
| jw. | `akcja_niedostepna` | maszyna scenariusza (D-109) | przycisk niedostępny, nic się nie zapisuje | interfejs nie pozwala wybrać (D-109) |
| jw. | `powiadomienia_odmowa` | `getPermissionsAsync` | przełącznik wyłączony, reszta bez zmian (T-08) | **brak** — stan przełącznika (sekcja 3) |
| Oczekiwany, systemowy | `sklep_niedostepny` | `expo-iap`: błąd pobrania produktów | ceny niedostępne + „Spróbuj ponownie”; dostęp z pamięci (ADR 0006) | jest (macierz: Limit i zakup) |
| jw. | `zakup_anulowany`, `zakup_oczekuje`, `zakup_blad` | maszyna `zakup` (moduly.md) | anulowanie bez komunikatu; oczekiwanie: informacja; błąd: komunikat i powrót do `bezczynny` | częściowo (przywracanie bez zakupu jest; oczekuje i błąd zakupu: **brak**) |
| jw. | `przerwano_w_tle` | ADR 0013 | dane bez zmian; po powrocie komunikat „Import nie został dokończony” i ponowienie | **brak** |
| Nieudany zapis danych użytkownika | `zapis_nieudany` (SQLite: `SQLITE_IOERR`, `SQLITE_BUSY`), `brak_miejsca` (`SQLITE_FULL`) | adapter portu | nigdy cicho: komunikat; stan aktywności sprzed kroku (transakcja wycofana); odpowiedź zostaje na ekranie do ponowienia | **brak** (wzór tekstu błędu jest: „Nie udało się …”) |
| Awaria danych przy starcie | `baza_nowsza` | runner migracji (E4f); wyjątek `BladStartuPostepu` z `otworzPostep` (L8-01, D-200) | aplikacja nie zapisuje nic; ekran „Zaktualizuj aplikację”; dane bez zmian | **brak** |
| jw. | `migracja_nieudana` | runner (ROLLBACK, E4e); wyjątek `BladStartuPostepu` jak wyżej | dane w wersji sprzed migracji + kopia `postep-przed-v<N>.db`; ekran błędu z „Zgłoś błąd” (F-17) | **brak** |
| jw. | `baza_uszkodzona` (`SQLITE_CORRUPT`, `SQLITE_NOTADB`) | adapter portu przy otwarciu | bez nadpisywania pliku: plik przemianowany na `postep-uszkodzona-<ms>.db`, nowa pusta baza, komunikat z „Zgłoś błąd” i informacją o imporcie z ostatniego eksportu | **brak** |
| jw. | `tresc_niedostepna` | brak albo błąd pliku `tresc-*.db` (ADR 0005) | ekran błędu bez pustych list; dane użytkownika nietknięte | **brak** |
| Nieoczekiwany | `wyjatek_ekranu` | granica błędu ekranu | ekran zastępczy z „Spróbuj ponownie” i „Zgłoś błąd”; wpis w dzienniku; raportowanie awarii: rola 12 (ADR 0009) | **brak** |

Uwagi:
- „Baza uszkodzona”: realność **teoretyczna/brzegowa** (SQLite w trybie `DELETE` wycofuje przerwane transakcje; uszkodzenie wymaga awarii nośnika albo błędu systemu), ale skutek to utrata danych, więc zabezpieczenie jest wymagane (zasada wspólna 5): plik nigdy nie jest kasowany automatycznie.
- Teksty komunikatów: rola 04 (stan) i 06 (słowa); kody `powod` są kontraktem dla 07 i 08.

## 5. Znaleziska dla innych ról (E3)
- **04:** 9 stanów oznaczonych „brak” w tabeli sekcji 4 i stan przełącznika przypomnienia (sekcja 3 pkt 4) — do macierzy stanów; teksty: 06.
- **Właściciel (Trening):** `expo-notifications` z domyślnym `enableRemoteNotifications` dodaje uprawnienie push, którego Trening nie używa (sekcja 3 pkt 1) — informacja, bez działania w tym repo.
