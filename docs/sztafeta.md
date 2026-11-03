# Stan sztafety
Ścieżka: greenfield (przebudowa istniejącej aplikacji „prawie od nowa”) · Aktualizacja: 2026-11-03

Decyzja właściciela (2026-11-03, jego słowa): „Przejść dla aplikacji Szkoła Pokera przez role 1–5 w trybie build z prompts i zrobić ją prawie od nowa, ale wykorzystując elementy aktualnej aplikacji, które są dobre. Cel: monetyzacja. […] Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening. Całkiem od nowa UX, przepływy, ocena monetyzacji, BRD.” Kolejność (wybór właściciela): bramka opłacalności (02, krok 0) → 01 → 02 → 03 → 04 → 05.

| Rola | Tryb | Stan | Commit | Artefakty | Otwarte decyzje |
|---|---|---|---|---|---|
| 02 Monetyzacja (bramka, krok 0) | build `--moduly oplacalnosc` | E1b zakończone: werdykt „budować” (słaby dowód), STOP na decyzję właściciela (2026-11-03) | (ten commit) | `docs/monetyzacja.md` (sekcja „Opłacalność”), `docs/monetyzacja/dowody/` | dołączenie repo `prompts`; wpis decyzji E0 w rejestrze 03 (brak konektora Google Docs) |

## E0 bramki: ustalenia (2026-11-03)
- Środowisko: chmura Linux, Node v22.23.4, pnpm 10.28.0, Playwright 1.63.0, push na gałąź roboczą przez git. Bez Maca/Xcode.
- Sieć: `developer.apple.com` działa; **zablokowane przez politykę sieci sesji: `itunes.apple.com`, `apps.apple.com`, `api.nbp.pl`** (403 na CONNECT, 2026-11-03 16:24 UTC). Bez nich nie ma dowodów rynku (E1) ani kursu NBP.
- CI na `main` (23950a4): workflow CI zielony (9.10.2026). E2E (Maestro) padał w każdym przebiegu nocnym 13–20.10.2026 (przebiegi 11–18), wyłączony ręcznie 20.10.2026. Znalezisko dla roli 07 przy przebudowie; nie blokuje bramki.
- Rejestr decyzji (Drive, „03 Rejestr decyzji (ADR) — Szkoła Pokera”): ADR-11 model zarabiania „Do decyzji” (A freemium + subskrypcja, B jednorazowy, C darmowa; ceny konkurentów z 2.10.2026 do ponownego odczytu); ADR-12 kategoria wiekowa „Do decyzji” (rekomendacja 18+); ADR-13 zero poker roomów i afiliacji (art. 29 u.g.h.) „Do decyzji”; ADR-14 „Polski na start” zatwierdzona 2.10.2026 — **sprzeczna z nowym celem „35 języków”** (do zapisania jako zmiana decyzji właściciela); ADR-18 RevenueCat vs expo-iap „Do decyzji”.
- Reguły sklepu, App Review Guidelines „Last Updated: October 16, 2026” (odczyt 2026-11-03): 3.1.1 (IAP, „XX-day Trial”, restore), 3.1.2(a) („ongoing value”, ≥ 7 dni, okres próbny przez App Store Connect), 3.2.2(x), 4.2, 4.3(b), 5.6; **5.3.4**: „Apps that offer real money gaming (such as … poker …) … must be free on the App Store. Illegal gambling aids, including card counters, are not permitted” — aplikacja nauki bez gry na pieniądze i bez pomocy w czasie gry. Kategorie wiekowe (developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions, odczyt 2026-11-03): „Simulated Gambling: Betting or wagering without using real money…”; „Frequent simulated gambling” → 18+, „Infrequent simulated gambling” → niższa kategoria. Skutek dla zasięgu idzie do bramki jako założenie.
- Brak sekcji „Stan projektu” w CLAUDE.md, brak `docs/monetyzacja.md` i BRD.

## Decyzje właściciela z E0 (2026-11-03, odpowiedzi w sesji /apps4brew)
- Sieć: „Pełny dostęp do sieci” (zmiana ustawień środowiska; działa w nowej sesji). Odrzucone: lista domen, ręczne wklejanie danych.
- Próg opłacalności: „500 USD/rok” netto, globalnie (domyślny D-024). Odrzucone: 1000, 2500 USD.
- Platformy w bramce: „iOS i Android” (Google Play 25 USD jednorazowo, zamknięty test 12 osób × 14 dni — koszt portfela). Odrzucone: tylko iOS.
- Dokumenty: „Repo + skrót na Dysku” — `docs/monetyzacja.md` i `docs/monetyzacja/*.mjs|json` (tylko dane publiczne), wpis z odnośnikiem w rejestrze 03 na Dysku. Odrzucone: wszystko na Dysku.
- Standard marki: „Wysoki” — bez reklam i SDK śledzących; wariant reklamowy liczony tylko do porównania.
- Umowa Paid Apps w App Store Connect: „Tak, podpisana”.
- Polityka języków: szeroka, 35 języków jak Trening (słowa właściciela z 2026-11-03) — zastępuje ADR-14 „Polski na start” (do wpisania w rejestrze 03 jako zmiana decyzji właściciela).
- Do zrobienia w E1/E1b: wpis tych decyzji w rejestrze 03 na Dysku (zasada wspólna 6).

## E1 bramki: wynik (2026-11-03)
- Szczegóły i źródła: `docs/monetyzacja.md`, dane `docs/monetyzacja/e1-rynek-2026-11-03.json`.
- Sieć: pełny dostęp działa; jedynie `itunes.apple.com/search` zwraca 403 z serwera Apple (nie proxy) — konkurenci z dokumentu 07 i list „podobne aplikacje” (29 aplikacji).
- Ceny (mediany US): 14,99 $/mies., 89,99 $/rok, 149,99 $ dożywotni; PL 64,99 / 409,99 / 699,99 zł. Wariant właściciela 0,99/6,99/14,99 USD jest 10–15× niżej.
- Lokalizacja: 25 z 29 konkurentów tylko EN; w JP prowadzą 2 aplikacje z japońskim. Popyt (oceny/rok): US 3548, JP 1711, CA 482, BR 283, GB 281, FR 277, TW 264, VN 229; PL 37.
- Android ÷ iOS w kategorii: 0,10–3,0 (dwie aplikacje) → szeroki przedział założenia.
- Prompt roli złożony ręcznie z plików `prompts` (c025063): uruchomienie `assemble.mjs` zablokował klasyfikator środowiska; treść odpowiada skryptowi (rdzeń, wzorce, moduły oplacalnosc + cena-i-rachunek + rachunek, szablony build).

## E1b bramki: stan (2026-11-03)
- Zapisane: `docs/monetyzacja/rachunek.mjs` i `oplacalnosc.mjs` (bloki z modułów `rachunek` i `oplacalnosc`, prompts c025063, bez zmian), `generuj-warianty.mjs`, `oplacalnosc-wlasna.json` (wariant właściciela D-029), `warianty/*.json` (11 wariantów D-028: właściciel, środek, rynek, mies.+rok, mies., rok, jednorazowy ×3, płatna z góry, napiwek; reklamy pominięte: standard wysoki i brak przeczytanego źródła przychodu na użytkownika).
- Lista krótka: US, JP, CA, GB, BR, FR, TW, VN, DE, PL × iOS i Android (20 sklepów). Prowizja 15% (Apple SBP, Google Play; odczyt 2026-11-03), VAT GB odczytany, pozostałe `[ZAŁOŻENIE]`.
- **Blokada:** klasyfikator środowiska odrzucił uruchomienie `oplacalnosc.mjs` i `rachunek.mjs` („Code from External”, kod z repo `prompts`). Skrypty przeczytane: czytają tylko podany JSON i wypisują wynik. Potrzebna zgoda właściciela (reguła uprawnień dla `node` w `docs/monetyzacja/`).

## E1b bramki: wynik (2026-11-03, druga sesja)
- Skrypty uruchomione za zgodą właściciela: `oplacalnosc.mjs oplacalnosc-wlasna.json` (kod 0) → `dowody/oplacalnosc-2026-11-03.txt` (16:58 UTC); macierz → `dowody/warianty-2026-11-03.txt`. `generuj-warianty.mjs` bez zmian (dane przyjęte).
- Wariant właściciela 0,99/6,99/14,99: razem 32,96 / 3130,75 / 266 152,96 USD; sam iOS 29,97 / 1956,72 / 88 717,65 → „budować” (słaby dowód: pes. 15× pod progiem). Najwyższy wynik normalny: rynek 14,99/89,99/149,99 (24 958 USD). Napiwek: „odłożyć”.
- Kontrola skryptów: przykłady biblioteki niedostępne; zastępczo niezależne przeliczenie ios/us = 886,83 USD (zgodne).
- **Blokady środowiska:** `add_repo lkarwowski494/prompts` odrzucony przez klasyfikator („Access Added As A Means”) → brak promptu roli z `assemble.mjs`, przykładów kontrolnych, karty portfela 48 i zasady 18. Konektor Google Docs nadal niedostępny (jest tylko Drive) → wpis E0 w rejestrze 03 niezrobiony, nowego pliku nie tworzono.
- VAT FR/DE/PL/JP/TW/VN: próby odczytu u źródła nieudane (OP-06), wpływ < 5%.
- Rozbieżności z dokumentem „Aplikacje Mobilne do Nauki Pokera”: tabela w `docs/monetyzacja.md`; główna: niepełna lista konkurentów (brak m.in. Poker Skill, River, Pokr).

## Decyzje właściciela z E1b (2026-11-03)
- Model i cena: „Twój wariant 0,99/6,99/14,99” (USD mies./rok/dożywotni; wynik normalny 3 130,75 USD/rok, zapas 6,3× nad progiem). Odrzucone: ceny rynku 14,99/89,99/149,99 (rekomendowane, 24 958 USD), jednorazowy 99,99 (17 893 USD), środek 4,99/29,99/59,99 (10 784 USD). Ryzyko przyjęte: sam iOS spada pod próg, jeśli udział nowej aplikacji okaże się pesymistyczny; najtańsza kontrola po wydaniu: App Store Connect Analytics, 90 dni.
- Nowa sesja: „Nie” — kontynuacja w tej sesji.

## Następny krok
Po decyzji właściciela o modelu i cenie: (1) gdy repo `prompts` dostępne — kontrola skryptów na przykładach biblioteki (A 55,26 zł „porzucić”, B 455,36 zł „odłożyć”; rachunek 13,81 zł, próg 28), karta portfela 48 do tabeli rozbieżności, zasada 18 w podłodze; (2) wpis decyzji E0 i E1b w rejestrze 03 (konektor Google Docs); (3) rola 01 (BRD) w trybie build, potem 02 → 03 → 04 → 05.
