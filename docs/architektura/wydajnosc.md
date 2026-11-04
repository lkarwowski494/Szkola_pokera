# Budżety wydajności z metodą pomiaru (rola 05 E3, 2026-11-04; OP-21, NFR-WYD-001)
Zasada roli: liczba bez pomiaru nie jest budżetem. Poniżej każdy budżet ma urządzenie, dane, miarę i metodę; wartości liczbowe powstaną z pomiaru bazowego po implementacji (rola 08), a **cel ustala właściciel** na podstawie pomiaru (sprawa produktowa, OP-21).

## 1. Najstarszy wspierany telefon (D-128)
- Expo SDK 58 (ADR 0001): `ExpoModulesCore.podspec:53-54` (`expo-modules-core` 58.0.30): `s.platforms = { :ios => '16.4', …}` — minimalny iOS aplikacji to 16.4.
- iOS 16: „iOS 16.5, which is compatible with the following models: iPhone X iPhone XR iPhone XS …” — lista obejmuje m.in. iPhone 8, iPhone 8 Plus, iPhone SE (2nd generation) (support.apple.com/en-us/guide/iphone/iphe3fa5df43/16.0/ios/16.0, „iPhone models compatible with iOS 16”, odczyt 2026-11-04). Najstarsze: **iPhone 8 / 8 Plus (2017)**.
- Decyzja agenta (D-128, analogia: Trening nie podnosi celu wdrożenia — `trening/app.json` bez `deploymentTarget` i bez `expo-build-properties`, odczyt 2026-11-04): cel wdrożenia = domyślny SDK (iOS 16.4). Odrzucone: podniesienie do iOS 17/18 (mniej urządzeń do sprawdzenia, ale mniejszy rynek bez nazwanego problemu technicznego).
- Pomiar na iPhonie 8 wymaga takiego telefonu. Pomiar bazowy idzie na telefonie właściciela (model zapisany przy wyniku `[DO USTALENIA: model]`). Wyjątek nazwany: najstarszy telefon niezmierzony; tańsza kontrola: ten sam scenariusz na telefonie właściciela w trybie niskiego zużycia energii jako drugi przebieg (kierunek, nie równoważnik) i raporty „Launch Time” z Xcode Organizer od użytkowników, gdy aplikacja będzie miała użytkowników (dane Apple, bez SDK — zgodne z ADR 0009; dostępność danych w Organizerze `[DO USTALENIA: rola 12]`).

## 2. Budżety
| Scenariusz | Budżet | Urządzenie | Dane | Miara | Metoda |
|---|---|---|---|---|---|
| B-1 Start do pierwszej decyzji w PR-03 (NFR-WYD-001): dotknięcie ikony przy zabitym procesie → „Dziś” → „Ćwiczenia” → widoczny pierwszy stół z akcjami | po pomiarze bazowym (właściciel) | telefon właściciela (+ tryb niskiego zużycia) | szacunek 3-letni Pro (`e2-schemat.mjs`: 34 tys. odpowiedzi, 6,2 MB) wgrany importem | mediana i maksimum z 5 przebiegów; czas bez dotknięć użytkownika (od klatki dotknięcia ikony do klatki pierwszego ekranu „Dziś” + od dotknięcia „Ćwiczenia” do klatki stołu) | nagranie ekranu iPhone'a (wbudowane nagrywanie, Centrum sterowania), plik do agenta; agent liczy klatki `ffmpeg`/`ffprobe` (dostępne w środowisku agenta, 2026-11-04). Z Makiem: Instruments, szablon App Launch (developer.apple.com, „Reducing your app's launch time”) |
| B-2 Zimny start do „Dziś” | jw. | jw. | jw. | jw. | jw. (pierwsza część B-1) |
| B-3 Odpowiedź → ocena widoczna (krok aktywności: ocena w domenie + zapis transakcji) | jw. | jw. | jw. | p95 z 20 kroków | znaczniki `performance.now()` w buildzie deweloperskim (ekran diagnostyki tylko pod `__DEV__`, ADR 0011), wynik do dziennika konsoli; odniesienie: zapis p95 3,4 ms na laptopie (`e3-blokady-czasy.mjs`) |
| B-4 Zapytania głównych ekranów (6 z `e2-schemat.mjs`) | jw. | jw. | jw. | p95 z 20 powtórzeń | `EXPLAIN QUERY PLAN` (agent: wszystkie 6 używają indeksu, E2) + czas na telefonie w buildzie deweloperskim |
| B-5 Import i eksport pliku 3-letniego (12,1 MB) | warunek ADR 0013: import krótszy niż `backgroundTimeRemaining` | jw. | plik eksportu 3-letni | mediana i maks. z 3 przebiegów; `backgroundTimeRemaining` odczytane po przejściu do tła | build deweloperski: znaczniki czasu; odniesienie laptop: import 2,7 s, eksport 0,46 s |
| B-6 Rozmiar pobrania | ADR 0005: powyżej 50 MB [OCENA] decyzja właściciela | — | build wydania z treścią wszystkich gotowych języków | MB („Download Size” w App Store Connect, raport rozmiarów) | App Store Connect po wysłaniu builda (właściciel albo rola 10); suma rozmiarów `tresc-*.db` z `content-build` (agent, przed wysłaniem) |
| B-7 Bateria w tle | nie dotyczy (sprawdzone, brak): brak pracy w tle (tlo-i-bledy.md, sekcja 1) | — | — | — | — |

## 3. Plan pomiaru bazowego (po implementacji przez rolę 08)
| Krok | Kto | Czas | Czeka na |
|---|---|---|---|
| 1. Build deweloperski i TestFlight z ekranem pomiarów pod `__DEV__` (B-3, B-4, B-5) i plikiem 3-letnim do importu (generator z `e2-schemat.mjs` jako narzędzie roli 07) | rola 08 / 07 (agent) | ok. 1 h | implementacja |
| 2. Import pliku 3-letniego, 5 nagrań B-1 (proces zabity w przełączniku aplikacji przed każdym), drugi zestaw w trybie niskiego zużycia, odczyt ekranu pomiarów (zrzut) | właściciel na iPhonie | ok. 15–20 min | build z kroku 1 |
| 3. Analiza nagrań klatka po klatce, tabela wyników, propozycja celów z opcjami | agent | ok. 30 min | pliki z kroku 2 |
| 4. Decyzja o celach B-1–B-3 (np. „mediana nie gorsza niż pomiar bazowy + X%”) i wpis w `docs/decyzje.md` | właściciel | 5 min | tabela z kroku 3 |
| 5. Rozmiar pobrania z App Store Connect | właściciel / rola 10 | 5 min | pierwszy build wydania |

Po decyzji z kroku 4: rola 07 dopina B-3 i B-4 jako test regresji w buildzie deweloperskim (porównanie z pomiarem bazowym), B-1 jako krok listy kontrolnej przed wydaniem (zasada „Audyty i wydania” w `CLAUDE.md`, pkt 4).
