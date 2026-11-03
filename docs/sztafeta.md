# Stan sztafety
Ścieżka: greenfield (przebudowa istniejącej aplikacji „prawie od nowa”) · Aktualizacja: 2026-11-03

Decyzja właściciela (2026-11-03, jego słowa): „Przejść dla aplikacji Szkoła Pokera przez role 1–5 w trybie build z prompts i zrobić ją prawie od nowa, ale wykorzystując elementy aktualnej aplikacji, które są dobre. Cel: monetyzacja. […] Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening. Całkiem od nowa UX, przepływy, ocena monetyzacji, BRD.” Kolejność (wybór właściciela): bramka opłacalności (02, krok 0) → 01 → 02 → 03 → 04 → 05.

| Rola | Tryb | Stan | Commit | Artefakty | Otwarte decyzje |
|---|---|---|---|---|---|
| 01 Odkrywanie | build | E1 zakończone, STOP (2026-11-03) | 8ce11d7 | „Stan projektu” w `CLAUDE.md`, `docs/brd/` (README, wywiad, odkrywanie, zrodla) | — (OP-01: bez rozmów z graczami, decyzja 2026-11-03) |
| 02 Monetyzacja (bramka, krok 0) | build `--moduly oplacalnosc` | E1b zakończone: werdykt „budować” (słaby dowód), STOP na decyzję właściciela (2026-11-03) | (ten commit) | `docs/monetyzacja.md` (sekcja „Opłacalność”), `docs/monetyzacja/dowody/` | wpis decyzji E0 w rejestrze 03 (brak konektora Google Docs) |

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
- Kontrola skryptów na przykładach biblioteki (prompts c025063, dołączone za zgodą właściciela): A 55,26 zł „porzucić”, B 455,36 zł „odłożyć”, próg 1948,70 zł; rachunek 13,81 zł, próg 28 — zgodne. Prompt roli złożony `assemble.mjs` (kod 0, 66 169 znaków) i przeczytany.
- Karta portfela 48 (portfel-aplikacji 262a076) przeczytana po zapisaniu dowodu; tabela rozbieżności w `docs/monetyzacja.md`. **Sprzeczność:** karta ma decyzję o rynkach z 01.11.2026 „wszędzie poza Polską” (art. 29 u.g.h.), lista krótka E1 zawiera PL. Bez PL: 3 112,14 USD norm., werdykt bez zmian. Konektor Google Docs nadal niedostępny (jest tylko Drive) → wpis E0 w rejestrze 03 niezrobiony, nowego pliku nie tworzono.
- VAT FR/DE/PL/JP/TW/VN: próby odczytu u źródła nieudane (OP-06), wpływ < 5%.
- Rozbieżności z dokumentem „Aplikacje Mobilne do Nauki Pokera”: tabela w `docs/monetyzacja.md`; główna: niepełna lista konkurentów (brak m.in. Poker Skill, River, Pokr).

## Decyzje właściciela z E1b (2026-11-03)
- Model i cena: „Twój wariant 0,99/6,99/14,99” (USD mies./rok/dożywotni; wynik normalny 3 130,75 USD/rok, zapas 6,3× nad progiem). Odrzucone: ceny rynku 14,99/89,99/149,99 (rekomendowane, 24 958 USD), jednorazowy 99,99 (17 893 USD), środek 4,99/29,99/59,99 (10 784 USD). Ryzyko przyjęte: sam iOS spada pod próg, jeśli udział nowej aplikacji okaże się pesymistyczny; najtańsza kontrola po wydaniu: App Store Connect Analytics, 90 dni.
- Nowa sesja: „Nie” — kontynuacja w tej sesji.
- Rynek PL: „Tak, bez PL, polski zostaje” — storefront PL odznaczony w App Store Connect (i Google Play), język pl zostaje w 35 językach; potwierdza decyzję z karty 48 (01.11.2026). Odrzucone: bez PL i bez polskiego; z Polską. Wynik bramki bez PL: 32,77 / 3 112,14 / 264 341,02 USD, „budować”.
- Dalej: „Rola 01 w tej sesji”.

## Rola 01, E0: rama (2026-11-03)
- Prompt: `node tools/assemble.mjs 01-odkrywanie --tryb build` (prompts c025063, kod 0; moduły kontrola-brd, repozytorium, rynek-i-polityki, wywiad), przeczytany.
- Środowisko: jak w E0 bramki; dodatkowo Dysk (konektor Drive: odczyt i zapis plików, bez edycji Google Docs), repo `prompts` i `portfel-aplikacji` dołączone do odczytu. Autor commitów: noreply (repo publiczne). Repo istnieje — moduł `repozytorium` pominięty.
- Pomysł słowami właściciela (2026-11-03): „Przejść dla aplikacji Szkoła Pokera przez role 1–5 w trybie build z prompts i zrobić ją prawie od nowa, ale wykorzystując elementy aktualnej aplikacji, które są dobre. Cel: monetyzacja. […] Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening.”
- Hierarchia źródeł dziedziny: z `CLAUDE.md` (ADR-24, 5 szczebli: rachunek → solvery → książki → serwisy szkoleniowe → eksploatacja z populacją). Bez nowej decyzji.
- Wejście jako hipotezy: PRD na Dysku („01 Wymagania (PRD)”, stan 4.10.2026: FR-01–19, NFR-01–11), roadmapa (00), przekazanie 17 (11.10.2026), karta portfela 48, wynik bramki 02. Kod: 44 lekcje, 14 egzaminów, 142 reguły, 162 terminy, poker-core, srs (FSRS), solver preflop, tryb gry.
- **Sprzeczności wejścia z nowym celem** (do E1–E2): PRD „aplikacja na iOS po polsku” i wyróżnik „tworzona od początku po polsku” wobec 35 języków, iOS + Android i braku storefrontu PL; FR-16 „subskrypcja i paywall w fazie 4” wobec monetyzacji jako celu; karta 48 „model optymalny: pojedynczy zakup” wobec wybranego 0,99/6,99/14,99.
- Wielkość BRD: **dzielony** (wiele modułów nauki, > 3 reguły dziedzinowe, reguły krytyczne prawne: hazard i telefony pomocy). Pliki według wzorców: README, odkrywanie, wymagania-<moduł>, reguly, zrodla, errata.
- Decyzje właściciela E0 (2026-11-03): miejsce BRD „Repo + skrót na Dysku” (odrzucone: tylko Dysk); przegląd treści krytycznych „Zastępczy” (D-027; odrzucone: człowiek).
- Plan i czas: E1 wywiad ~5–8 pytań pojedynczo (agent ~1 h, właściciel ~15–20 min); E2 rynek, OG, RD z istniejących reguł (agent ~3–4 h, sieć); E3 przepływy, BR, NFR, wektory, `kontrola-brd.mjs` (agent ~4–6 h); E4 przekazanie (~1 h). Czeka się na: odpowiedzi właściciela na bramkach.

## Ceny: propozycja właściciela po E1b (2026-11-03, do decyzji)
- Właściciel: drabina bez miesięcznej (kwartał / rok / dożywotni), warianty 7,99/14,99/19,99 i 9,99/14,99/19,99 USD; aplikacja poza oficjalnym portfelem Apps4brew, osobna strona z materiałami później. Przeliczenie: `docs/monetyzacja.md`, „Drabina cen właściciela”. Macierz przeliczona bez storefrontu PL (`generuj-warianty.mjs`).
- **Decyzja właściciela 2026-11-03:** „Ok zgodnie z rekomendacją” — kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD zastępuje 0,99/6,99/14,99 (odrzucone: 7,99/14,99/19,99; mies. 5,99/14,99/19,99). Kwartał dostępny w obu sklepach (odczyt 2026-11-03). Miesięczna 6,99: decyzja właściciela 2026-11-03 „A” — nie na start; hipoteza z warunkiem powrotu (dane ze sklepu: dużo wyświetleń ekranu zakupu bez zakupu). Odrzucone: dodać od razu (wariant 4 planów: 5 439,63 USD norm., 13,00 $ na płacącego).

## Następny krok
**Rola 01 build, E2** (rynek, polityki, dziedzina): prompt `node /home/user/prompts/tools/assemble.mjs 01-odkrywanie --tryb build` (prompts c025063). Wejście: `docs/brd/odkrywanie.md` (J-01–J-06, P-1–P-3, ZP-01–05, granice W-03–W-06), `docs/monetyzacja.md` (rynek, ceny, rozbieżności z dokumentem z Dysku), PRD i roadmapa na Dysku jako hipotezy. Do zrobienia: (1) skan konkurencji z brakującymi aplikacjami (Poker Skill, River, Pokr, LeakSeek — lookup po ID, wyszukiwarka 403); (2) OG: App Review 5.3.4, 1.4?, kategorie wiekowe (symulowany hazard przy grze z botami, W-03), 3.1, 4.2, 4.3, Google Play (hazard, symulowany hazard, kategoria wiekowa), art. 29 u.g.h. (karta 48, `portfel-aplikacji/dane/poker-prawo-hazard.md`); (3) RD z `content/pl/rules.yaml` (142 reguły) i `content/numbers.yaml` — które aplikacja liczy (pot odds, MDF, equity, outy), reguły krytyczne (odpowiedzialna gra, telefony pomocy `content/helplines.yaml`); (4) H dla 02/03: ocena poziomu (W-02), trener AI z warunkiem (W-04), raport postępu za zgodą (W-06), podział (jedna ścieżka vs moduły), ZAL w `docs/zalozenia.md`; (5) ER: sprzeczności PRD z nowym celem (E0 roli 01). Potem STOP E2 z decyzją kontynuować / zmienić kierunek / zatrzymać; dalej E3, E4, rola 02 sesja 2.

