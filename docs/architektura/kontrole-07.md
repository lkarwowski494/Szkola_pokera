# Kontrole automatyczne i scenariusze na urządzeniu (rola 05 E3, 2026-11-04; wejście dla roli 07)
Każda kontrola ma źródło (ADR, dokument) i wzór dowodu z eksperymentów roli 05. Rola 07 pisze testy przed kodem (zasada wspólna 11) i dopina je do `pnpm run ci`; kolejność wdrożenia: domena i dane z testami, potem adaptery, na końcu ekrany (rola 08).

## Kontrole automatyczne (Node / CI)
| ID | Kontrola | Jak (wzór) | Źródło |
|---|---|---|---|
| K-01 | Granice modułów: pliki ≤ 20 KB, domena bez importów spoza siebie (poza `import type` i listą czystych bibliotek), brak cykli | `node docs/architektura/narzedzia/granice.mjs <pakiet>/src .` dla `domena`, `postep`, `poker-core`, `srs`, `content-schema`; `granice.mjs apps/mobile/src __brak__` (tylko rozmiar i cykle); kod 1 = czerwone. Lista dozwolonych: stała `DOZWOLONE` w skrypcie | moduly.md; zasada roli 7 |
| K-02 | Migracja z kopii każdej wydanej wersji | dla każdego `bazy/vN.db` (wzorzec z danymi brzegowymi): kopia → `migruj` → liczności każdej tabeli, `integrity_check` = ok, `foreign_key_check` pusty, `user_version` = bieżąca, drugie uruchomienie bez zmian; przypadek negatywny (dane łamiące nowe CHECK) → wycofanie; baza nowsza → odmowa bez zmian. Od pierwszego wydania (D-124) | dane.md „Polityka migracji”; `e1-sqlite.mjs` E4a–E4f |
| K-03 | Stany maszyn = listy w CHECK | eksportowane listy z `domena` porównane z CHECK w schemacie (`aktywnosc.rodzaj`, `aktywnosc.stan`, `odpowiedz.ocena`) | ADR 0010; `e2-schemat.mjs` sekcja 2 |
| K-04 | `PRAGMA foreign_keys` odczytane wewnątrz transakcji zapisu przez port = 1 | test portu na `node:sqlite` (otwarcie z `enableForeignKeyConstraints: false`, jak w aplikacji) + kontrola przy starcie w buildzie deweloperskim na adapterze expo-sqlite (wpis w dzienniku przy ≠ 1) | ADR 0003; `e1-sqlite.mjs` E1c/E1d |
| K-05 | Wektory logiki: limit dnia (`limitDnia`, `mozeStartowac`: północ w trakcie sesji, zmiana strefy, Pro, test powtórny), dostęp (9 wektorów z `docs/monetyzacja.md`), walidacja eksportu (obcy, ucięty, nowszy, starszy → migracja formatu), scenariusz (`akcja_niedostepna`) | czyste funkcje w Node | ADR 0006, 0007, 0008, 0010; D-109 |
| K-06 | Walidacja treści i manifestu pakietu treści: `tresc-<wersja>-<język>.db` z `meta` (format, wersja, język); format nowszy niż obsługiwany odrzucony; brak pliku → `tresc_niedostepna`; identyfikatory z postępu nieobecne w treści pomijane (BR-DANE-004) | test `content-build` na wyjściu + test czystej funkcji wyboru pliku treści | ADR 0005 |
| K-07 | Zakazy statyczne (grep w `apps/`, `packages/`, kod 0 trafień): `INSERT OR REPLACE`/`REPLACE INTO`; `withExclusiveTransactionAsync`; `execAsync(` z szablonem `${`; pusty `catch {}` / `catch (e) {}`; `@sentry/`, `expo-observe`; `verifyPurchaseWithProvider`, `kitApi`, `iapkit`; `getExpoPushTokenAsync`, `getDevicePushTokenAsync`; `expo-background-task`, `expo-task-manager`; `setInterval` w `packages/domena`; `getEachAsync` poza `packages/postep` i adapterem | skrypt `grep -rnE` w CI | ADR 0003, 0006, 0009, 0012, 0013; prywatnosc.md |
| K-08 | Required reason API: każdy `PrivacyInfo.xcprivacy` w drzewie zależności i grep interfejsów z listy Apple w pakietach bez manifestu; wynik porównany z `expo.ios.privacyManifests` | `find node_modules -name PrivacyInfo.xcprivacy -not -path '*/example/*'` po `pnpm install` + grep jak w prywatnosc.md sekcja 2; zmiana wersji zależności natywnej = ponowne uruchomienie | prywatnosc.md |
| K-09 | Konfiguracja `app.json`: brak `UIBackgroundModes`; `expo-notifications` z `enableRemoteNotifications: false`; `NSPrivacyCollectedDataTypes` = []; brak wtyczki i `extra` Sentry | test JSON w CI (`expo config --type introspect` albo odczyt `app.json`) | ADR 0009, 0012; tlo-i-bledy.md sekcja 3 |
| K-10 | Ochrona długich operacji: każda operacja z listy ADR 0013 pkt 3 woła `rozpocznij` przed pierwszą instrukcją i `zakoncz` dokładnie raz (także przy wyjątku); wstrzyknięte `wygasa` w środku importu → `przerwano_w_tle`, liczności bez zmian, `integrity_check` = ok | test portu z atrapą `OchronaTla` na `node:sqlite` | ADR 0013 |
| K-11 | Eksport → import bez różnic (NFR-DANE-002); awaria w środku importu → `ROLLBACK`, dane bez zmian; „Usuń postęp” zostawia dzisiejsze zużycie limitu i pamięć uprawnień | wzór `e2-schemat.mjs` sekcje 6–7 przez port | ADR 0008; dane.md |
| K-12 | Polityka błędów: wstrzyknięty błąd portu (`SQLITE_FULL`, `SQLITE_IOERR`) → `brak_miejsca` / `zapis_nieudany`, stan aktywności sprzed kroku; `SQLITE_CORRUPT` przy otwarciu → plik przemianowany (nie usunięty), nowa baza; brak pliku treści → `tresc_niedostepna` | atrapa adaptera zgłaszająca błędy + test na plikach w katalogu tymczasowym | tlo-i-bledy.md sekcja 4 |
| K-13 | Przypomnienie: włączenie → dokładnie jedno zaplanowane powiadomienie z wyzwalaczem `daily`; ponowne włączenie, import, zmiana języka → nadal jedno; odmowa → zero, bez błędu; „Usuń postęp” → zero | atrapa `expo-notifications` | ADR 0012 |
| K-14 | Stare bazy `user.db*` nietknięte do „Usuń postęp” (sumy SHA-256 przed i po starcie nowej wersji) | test adaptera plików na katalogu tymczasowym | ADR 0004 |
| K-15 | UPSERT zamiast REPLACE zachowuje wiersze podrzędne; kaskady działają przez port | wzór `e2-schemat.mjs` sekcja 4 przez port | ADR 0003 |

## Scenariusze na urządzeniu (krok właściciela, lista kontrolna od roli 07)
| ID | Scenariusz | Oczekiwany wynik | Źródło |
|---|---|---|---|
| U-1 | Sesja ćwiczeń: po 3. odpowiedzi zabicie aplikacji w przełączniku, ponowne otwarcie | powrót w 4. zadaniu, 3 odpowiedzi zapisane | ADR 0010; BR-CWI-004 |
| U-2 | Import pliku 3-letniego; po 1 s przycisk Home; powrót po 30 s | import zakończony albo komunikat „nie został dokończony”, dane spójne; brak awarii `0xdead10cc` w Xcode Organizer/raportach TestFlight | ADR 0013 |
| U-3 | Przypomnienie: zgoda → powiadomienie następnego dnia o porze; odmowa → aplikacja działa; odebranie zgody w Ustawieniach → stan przełącznika po powrocie | jak w kolumnie | ADR 0012; T-08 |
| U-4 | Tryb samolotowy: PR-01–PR-05, PR-07, PR-08 | wszystko działa; zakup pokazuje stan „ceny niedostępne” | NFR-OFF-001 |
| U-5 | Zakupy w piaskownicy: kwartał, rok, dożywotni; przywracanie na drugim urządzeniu albo po ponownej instalacji; zwrot (StoreKit test) | dostęp zgodny z wektorami ADR 0006 | ADR 0006 |
| U-6 | Przywrócenie z kopii iCloud na telefonie po wymazaniu albo na drugim telefonie | postęp zachowany | dane.md; T-06 |
| U-7 | Pomiar bazowy B-1–B-5 | nagrania i zrzut ekranu pomiarów | wydajnosc.md |
| U-8 | Zapis ruchu przez proxy w pełnym przejściu PR-01–PR-08 (wymaga komputera z proxy; z pomocą roli 07) | 0 domen poza Apple | NFR-PRYW-001 |
| U-9 | „Usuń postęp” → potwierdzenie → aplikacja jak po instalacji, ale dzisiejszy limit wykorzystany i dostęp Pro zachowany | jak w kolumnie | dane.md; BR-DANE-003 |

## Wynik `granice.mjs` na obecnym kodzie (2026-11-04, przed przebudową; znaleziska dla roli 08)
| Zakres | Wynik | Wniosek |
|---|---|---|
| `packages/srs/src` | OK, 5 plików, kod 0 | — |
| `packages/poker-core/src` | kod 1: `bots.ts` 31,6 KB, `grading.ts` 23,1 KB | `bots.ts` służy grze z botami (F-19 = NIE, D-104): po usunięciu `features/play` (ADR 0011) sprawdzić, czy jest używany, i usunąć; `grading.ts` do podziału |
| `packages/content-schema/src` | kod 1: `index.ts` 20,8 KB | podział przy zmianie formatu treści (ADR 0005) |
| `apps/mobile/src` (bez domeny; pliki `.generated.` pominięte) | kod 1: `app/session.tsx` 22,4 KB, `features/drills/text.pl.ts` 26,6 KB; 0 cykli w 64 plikach | ekrany przebudowuje rola 08; teksty przechodzą do i18n (35 języków) |
| Samosprawdzenie skryptu (drzewo testowe w katalogu tymczasowym) | wykrył import `react-native` w domenie i cykl `a → b → a`; `zod` i `import type` przepuszczone; kod 1 | skrypt działa |

CI `main`: E2E Maestro czerwony w przebiegach 13–18 (15–20.10.2026) — znalezisko dla roli 07 bez zmian (zasada wspólna 21).
