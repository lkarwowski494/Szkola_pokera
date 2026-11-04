# Stan sztafety
Ścieżka: greenfield (przebudowa istniejącej aplikacji „prawie od nowa”) · Aktualizacja: 2026-11-04 (rola 04 E0)

Decyzja właściciela (2026-11-03, jego słowa): „Przejść dla aplikacji Szkoła Pokera przez role 1–5 w trybie build z prompts i zrobić ją prawie od nowa, ale wykorzystując elementy aktualnej aplikacji, które są dobre. Cel: monetyzacja. […] Tam nie ma być hazardu. Pełna nauka w 35 językach jak trening. Całkiem od nowa UX, przepływy, ocena monetyzacji, BRD.” Kolejność (wybór właściciela): bramka opłacalności (02, krok 0) → 01 → 02 → 03 → 04 → 05.

| Rola | Tryb | Stan | Commit | Artefakty | Otwarte decyzje |
|---|---|---|---|---|---|
| 01 Odkrywanie | build | zakończona 2026-11-03 (E4, przekazanie niżej) | (commit E4) | `docs/brd/` (README, wywiad, odkrywanie, wymagania, wymagania-nauka, wymagania-sklep, reguly, errata, zrodla, dane/), `tests/wektory/brd.json`, `docs/zalozenia.md`, „Stan projektu” w `CLAUDE.md` | OP-10, OP-14, OP-16, OP-18 (źródła), OP-19 (04), OP-20, OP-22 (03 z właścicielem), OP-21 (05) |
| 02 Monetyzacja (bramka, krok 0) | build `--moduly oplacalnosc` | E1b zakończone: werdykt „budować” (słaby dowód), STOP na decyzję właściciela (2026-11-03) | (ten commit) | `docs/monetyzacja.md` (sekcja „Opłacalność”), `docs/monetyzacja/dowody/` | wpis decyzji E0 w rejestrze 03 (brak konektora Google Docs) |
| 02 Monetyzacja (sesja 2) | build | zakończona 2026-11-03 (E3 zaakceptowane) | (commit E3) | `docs/monetyzacja.md` („Sesja 2, E0–E3”), `docs/monetyzacja/rachunek.json`, `dowody/rachunek-2026-11-03.txt` | OP-09 (monetyzacja), OP-20, OP-22, H-04 |
| 03 Zakres | build | zakończona 2026-11-04 (E3 zaakceptowane, D-112) | (commit E3) | `docs/scope-contract.md` (E3), `docs/archiwum/scope-contract-2026-11-03-robocze.md` (E0–E2), `docs/zakres/wzorzec-2026-11-03.json`, `docs/decyzje.md` | — |
| 01 Odkrywanie | fix OP-20, OP-22, OP-23 | zakończona 2026-11-04 (D-113; kontrola BRD kod 0, wektory bez zmian) | 42dc490, be4e4e4, f795905 | `docs/brd/` (README, wymagania-nauka, wymagania-sklep, wymagania) | OP-24 (05), OP-10 (06) |
| 02 Monetyzacja | fix OP-11 | zakończona 2026-11-04 (D-113; dokument, bez zmian rachunku i kodu) | 37ab4f1 | `docs/monetyzacja.md` | OP-09, OP-10 (05) |
| 04 Studio Projektowe | build | E0 zakończone 2026-11-04 (D-114: ekran „Decyzja w sesji”); E1 zakończone 2026-11-04 (D-115: metafory A, B, C); E2 zbudowane 2026-11-04, STOP: wybór kierunku okiem | a838dda, 118a5c1 | `docs/design/00-rozpoznanie.md`, `01-swiat.md` | OP-19 w E3 |
| 01 Odkrywanie | fix ER-12, ER-13 | zakończona 2026-11-03 (BR-OPIN, BR-LIM; 43 BR, kontrola kod 0) | 7f3bc5b, 46be5b8 | `docs/brd/` | OP-23 (03), OP-24 (05) |

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

## Rola 01, E2: wynik (2026-11-03)
- Prompt: `assemble.mjs 01-odkrywanie --tryb build` (prompts c025063, kod 0, 60 369 znaków), przeczytany; sesja opus, wysiłek high (ustawiony przez właściciela).
- Rynek: 102 aplikacje nauki (72 nowe; wyszukiwarka Apple działała z przerwami), 828 recenzji; dane `docs/brd/dane/konkurencja-2026-11-03.json`. Płatne są zadania z oceną; gra z botami przeważnie darmowa; najczęstsza potrzeba: „dlaczego” (ok. 85 z 828).
- Polityki (odczyt 2026-11-03, cytaty sprawdzone na surowym tekście): OG-01–OG-14; nic nie blokuje funkcji; DSA zamknięte (status przedsiębiorcy z konta, repo `trening`); subskrypcja wymaga stałej wartości (OG-05).
- Dziedzina: RD-01–RD-12, 77 wektorów liczonych niezależnie od kodu; kod zgodny w 9 funkcjach, 2 bez kontroli wejścia (ER-11). Decyzja merytoryczna roli 01: ocena zagrań według źródła progu — 0 < f < 3,5% to niedokładność, nie błąd (ER-01; wpis do dokumentu 13 na Dysku: krok właściciela, brak edycji Google Docs).
- Reguła krytyczna RD-12: telefony pomocy tylko dla PL, a storefrontu PL nie ma (ER-04, bloker); US: 1-800-MY-RESET (nie 1-800-GAMBLER), GB: 0808 8020 133 / Walia 0808 2819 265.
- Decyzja właściciela W-07 (2026-11-03): „B: scenariusze (Recommended)” — całe rozdania jako scenariusze bez stosu do wygrania; gra z botami jako H-07 z warunkiem powrotu (zmienia W-03 „a”). Odrzucone: A, C.
- Hipotezy H-01–H-09 dla ról 02 i 03, założenia ZAL-001–ZAL-012, erraty ER-01–ER-11 (sprzeczności PRD z celem).
- Kontrola: `node kontrola-brd.mjs docs/brd --szkic` → kod 0, 0 błędów, 4 uwagi (wektory błędnych danych RD-05, RD-09, RD-10; pochodzenie RD-12-W6) — do E3.
- Repo `trening` (publiczne, odczyt) to wzór formalności App Store Connect (polecenie właściciela 2026-11-03).

## Decyzje właściciela na bramce E2 (2026-11-03)
- Bramka: „Kontynuować do E3 (Recommended)”; odrzucone: zmienić kierunek, zatrzymać.
- OP-12 raporty awarii: „Usunąć SDK (Recommended)” — bez Sentry, raporty sklepów, etykieta „Data Not Collected” jak w Treningu; zmienia ADR-17; odrzucone: zostawić wyłączone, włączyć bez danych osobowych.
- OP-11 cel: „Jakość decyzji, bez obietnicy (Recommended)” — bez obietnicy wygranej i bez wskazania gry online; odrzucone: cel z PRD.
- Nowa sesja: „Tak, otwórz i zarchiwizuj tę (Recommended)”.
- Do wpisu w rejestrze 03 i 13 na Dysku (krok właściciela, brak edycji Google Docs): W-07, ER-01, OP-11, OP-12.

## Rola 01, E3: wynik (2026-11-03, czwarta sesja)
- Prompt: `assemble.mjs 01-odkrywanie --tryb build` (prompts c025063), przeczytany w całości; skrypt `kontrola-brd.mjs` z modułu `kontrola-brd`.
- Przepływy PR-01–PR-08 z pracami J-01–J-06 i sytuacjami brzegowymi (`docs/brd/wymagania.md`).
- Wymagania: 35 BR z kryteriami w Gherkinie (`wymagania-nauka.md`: ONB, KURS, CWI, POW, SCN; `wymagania-sklep.md`: ZAK, DANE, POM, JEZ), 13 NFR z miarą, progiem i metodą; liczby w kryteriach z wektorów RD albo z decyzji.
- Reguły: dopisane wektory błędnych danych RD-05-W7, RD-09-W7, RD-10-W10, pochodzenie RD-12-W6; 80 wektorów, eksport `tests/wektory/brd.json`.
- Źródło S-54 (WCAG 2.2, 1.4.1, odczyt surowego tekstu 2026-11-03) dla NFR-DOST-001. Lista 35 języków: `locales/` w repo `trening` (commit 2e4b0f8).
- Blokery wydania: tabela w `docs/brd/README.md`. Nowe OP-19–OP-22 (dostępność 04, długość oceny poziomu i próg testu modułu 03 z właścicielem, budżet startu 05).
- Kontrola: `node kontrola-brd.mjs docs/brd` (bez `--szkic`) → kod 0, 35 BR, 12 RD, 80 wektorów, 15 OP, 0 błędów, 0 uwag.
- Poza gitem bez zmian: wpisy do rejestru 03 i dokumentu 13 na Dysku (W-07, ER-01, OP-11, OP-12, decyzje E0/E1b bramki i E0 roli 01) czekają na właściciela; konektor Drive nie edytuje Google Docs.

## Decyzje właściciela na bramce E3 (2026-11-03)
- Bramka: „Akceptuję, przejdź do E4 (Recommended)”; odrzucone: najpierw zmiany, zatrzymać.
- OP-13: „Bez opinii teraz (Recommended)” — wraca przy storefroncie PL; odrzucone: opinia przed wydaniem, usunięcie pl.
- OP-15: „Wszystkie poza PL” — odrzucona rekomendacja roli 01 (lista 9 rynków). Skutek: RD-12 (bloker) obejmuje każdy kraj sprzedaży; dla krajów bez przeczytanego numeru pomocy gałąź RD-12-W6 (numer alarmowy ze źródła), zakres OP-10 rośnie (rola 06).
- Nowa sesja: „Tak, otwórz nową i zarchiwizuj tę (Recommended)”.

## Rola 01, E4: definicja ukończenia (2026-11-03, piąta sesja)
Prompt: `assemble.mjs 01-odkrywanie --tryb build` (prompts c025063), przeczytany w całości; `kontrola-brd.mjs` wycięty z modułu `kontrola-brd` bez zmian.

| Punkt definicji (build) | Wynik | Dowód |
|---|---|---|
| każdy [FAKT] ma S-nn przeczytane w dniu pracy; reszta w OP | spełnione | 51 znaczników [FAKT], każdy z S-nn (skrypt: 0 błędów); 54 źródła, wszystkie z odczytem 2026-11-03; szczeble: 41 × 1, 1 × 4, 12 × 5 (szczebel 5 tylko jako recenzje, nigdy jedyne źródło faktu: skrypt) |
| pytania produktowe pojedynczo, z opcjami; odpowiedzi dosłownie z datą; merytoryka hierarchią | spełnione | `docs/brd/wywiad.md` W-01–W-07 z datami; decyzje bramek E0–E3 w tym pliku, słowami właściciela; decyzja merytoryczna ER-01 według S-06 |
| RD: wzór, jednostki, granica, podstawa, ≥ 3 wektory z granicą i obiema stronami; krytyczne tylko ze szczebla 1–3, oznaczone dla 06 | spełnione | skrypt bez `--szkic`: 12 RD, 80 wektorów, 0 błędów, 0 uwag; jedyna krytyczna RD-12 (`reguly.md:211`, „przegląd roli 06, przegląd zastępczy D-027”), źródła S-39–S-41 szczebla 1 |
| BR z PR, PR z J; scenariusz główny z obserwowalnym wynikiem; liczby ze źródła, decyzji albo [DO USTALENIA]; NFR mierzalne | spełnione | skrypt: każde z 35 BR ma PR, „Dowód potrzeby”, Scenariusz z „Wtedy”; PR-01–PR-08 mają J; 13 NFR z Miarą, Progiem, Metodą; przegląd `grep` kroków z liczbami w `wymagania-*.md`: każda liczba z wektorem RD-nn-Wn albo decyzją, M0–M13 to nazwy modułów kursu |
| OG z polityk użytych w przepływach przypisane do wymagań | spełnione z wyjątkiem nazwanym | 10 z 14 OG ma odwołanie w `wymagania*.md`; bez odwołania: OG-03 i OG-04 (tylko przy H-07 albo innej odpowiedzi w ankiecie, OP-18), OG-09 (podział, H-04 dla 03), OG-13 (DSA, formalność konta, już spełniona) — żaden nie dotyczy przepływu PR-01–PR-08 |
| cena, zakres MVP, podział tylko jako H | spełnione | `grep -i "MVP\|pierwsza wersja" wymagania*.md`: brak; podział H-04, monetyzacja H-01 i H-09, zakres H-02, H-03, H-06, H-07; cena to decyzja właściciela z bramki 02, nie roli 01 |
| `kontrola-brd.mjs` bez `--szkic` z kodem 0; BRD w miejscu z CLAUDE.md; w publicznym repo brak danych rozmówców i cudzych materiałów | spełnione | `node kontrola-brd.mjs docs/brd` → kod 0, 9 plików, 35 BR, 12 RD, 80 wektorów, 15 OP, 0 błędów, 0 uwag (2026-11-03); rozmowy z graczami nie odbyły się (OP-01), `dane/konkurencja-2026-11-03.json` bez cudzych opisów i recenzji, w BRD tylko krótkie cytaty z adresem; skrót BRD na Dysku założony po decyzji właściciela na bramce E4: „BRD — Szkoła Pokera (skrót)” w folderze „Szkoła Pokera” (2026-11-03, treść odczytana po zapisie) |

Poprawka w E4: OG-03 miało nieaktualny znacznik „[DO WYJAŚNIENIA] (OP-15)” po decyzji właściciela; zastąpione skutkiem decyzji.

### Przekazanie do następnej roli
- Zakończono: rola 01, build, E0–E4, gałąź `claude/sleepy-brahmagupta-2065nu` (commit E4); artefakty: `docs/brd/`, `tests/wektory/brd.json`, `docs/zalozenia.md` (ZAL-001–ZAL-012).
- **02 Monetyzacja (sesja 2: model i kontrakt płatności):** hipotezy H-01 (co darmowe, co płatne; rekomendacja roli 01: (b) lekcje darmowe, płatna wartość ciągła) i H-09 (subskrypcja broni się aktualizacjami, OG-05, RYZ-01); ceny konkurencji z datą odczytu 2026-11-03: `docs/monetyzacja.md` (mediany US 14,99 $/mies., 89,99 $/rok, 149,99 $ dożywotni) i `docs/brd/dane/konkurencja-2026-11-03.json` (102 aplikacje), Poker Skill S-43; wymagania zakupu BR-ZAK-001–BR-ZAK-004, OG-06, OP-16 (Schedule 2). Cena 9,99/14,99/19,99 USD to decyzja właściciela z 2026-11-03.
- **03 Zakres:** przepływy PR-01–PR-08 (`wymagania.md`) i 35 BR (`wymagania-nauka.md`, `wymagania-sklep.md`); hipotezy zakresu H-02, H-03, H-05, H-06, H-07, H-08; propozycja podziału H-04 (rekomendacja: jedna aplikacja z modułami, turnieje M11 jako wariant); blokery wydania: tabela w `docs/brd/README.md`; OP-20 i OP-22 z właścicielem.
- **06 Treść (później):** RD-01–RD-12 i S-01–S-54 do rejestru twierdzeń; RD-12 krytyczna do przeglądu (zastępczy, D-027), OP-10 obejmuje wszystkie storefronty poza PL; OP-09, OP-14; ER-01 (ocena zagrań według S-06). Po weryfikacji rejestr 06 ma pierwszeństwo, rozbieżność przez ER do roli 01.
- **07 i 08:** RD-01–RD-12 i `tests/wektory/brd.json` tylko do odczytu, zmiana przez ER; ER-11 (2 funkcje bez kontroli wejścia); znalezisko: E2E na `main` wyłączony 20.10.2026.
- **Właściciel (kroki zewnętrzne):** (1) wpisy w rejestrze 03 i dokumencie 13 na Dysku: W-07, ER-01, OP-11, OP-12 (zmiana ADR-17), OP-13, OP-15, ADR-14 → 35 języków, decyzje E0/E1b bramki i E0 roli 01 (konektor nie edytuje Google Docs); (2) skrót BRD na Dysku: zrobione 2026-11-03; (3) storefront PL odznaczony w App Store Connect; (4) rozmowy z graczami: nie (OP-01).
- Następny krok ścieżki: **02-monetyzacja**, tryb `build`, sesja 2; nowa sesja: opus, wysiłek high. Polecenie: `node /home/user/prompts/tools/assemble.mjs 02-monetyzacja --tryb build`.
- Paczka wejściowa: `docs/monetyzacja.md`, `docs/brd/README.md`, `docs/brd/odkrywanie.md` (H, OG, RYZ), `docs/brd/wymagania-sklep.md`, `docs/zalozenia.md`, ten plik.
- Otwarte decyzje: OP-16 (02), OP-20 i OP-22 (03 z właścicielem), H-01 i H-04 (02/03 z właścicielem).

## Decyzje właściciela na bramce E4 (2026-11-03)
- Bramka: „Akceptuję, dalej rola 02 (Recommended)”; odrzucone: najpierw zmiany w E4.
- Skrót BRD: „Załóż plik w folderze projektu (Recommended)”; odrzucone: zrobię to sam.
- Nowa sesja: „Nie” — rola 02 sesja 2 w tej sesji; odrzucone: nowa sesja z archiwizacją tej (rekomendacja), nowa bez archiwizacji.
- Tożsamość commitów: hook środowiska prosi o autora `noreply@anthropic.com`; zostaje tożsamość z `CLAUDE.md` (noreply właściciela), zgodnie z wcześniejszymi commitami gałęzi.

## Rola 02 sesja 2: decyzje właściciela (2026-11-03)
- Bramka E0: „Akceptuję, dalej E1 (Recommended)”; odrzucone: zmień plan. Nowa sesja: „Nie” (odrzucona rekomendacja: nowa z archiwizacją).
- E1 (wynik): klasy WTP dla 35 BR (`docs/monetyzacja.md`, „Sesja 2, E1”); WTP-1: CWI-001, CWI-002, POW-001, SCN-001, SCN-003, KURS-001 (z dowodem przeciw); WTP-X: brak; statusy H-01, H-09, ZAL-005, ZAL-011, ZAL-MON-01 bez zmian (hipotezy).
- Bramka E1: „Akceptuję, dalej E2 (Recommended)”; nowa sesja: „Nie”.

- Bramka E2: model „A: drabina 9,99/14,99/19,99” (odrzucona rekomendacja B: sam jednorazowy 19,99); podział „Wszystkie lekcje darmowe (Recommended)”; „Bez próby, Family Sharing wył. (Recommended)”; nowa sesja: „Nie”. Szczegóły: `docs/monetyzacja.md`, „Decyzje właściciela na bramce E2”.
- E3: kontrakt płatności, szkic ADR biblioteki (`expo-iap`), wektory dostępu, definicja ukończenia i przekazanie: `docs/monetyzacja.md`, „Sesja 2, E3”.

- Bramka E3: „Akceptuję, dalej rola 03 (Recommended)”; nowa sesja: „Nie” — rola 03 w tej sesji.

## Zmiana podziału darmowe/płatne (2026-11-03, po bramce E3 roli 02)
- Właściciel: „Jedna dzienna pula (Recommended)” — lekcje, pierwsze podejście do egzaminu, postęp i eksport darmowe; wspólna dzienna pula N zadań (ćwiczenia, powtórki, scenariusze, powtórne egzaminy); Pro bez limitu. Płatny zapis postępu odrzucony (5.6). Szczegóły: `docs/monetyzacja.md`, „Zmiana podziału”; N: OP-11 (03 z właścicielem).

## Rola 03 E0: odpowiedź właściciela (2026-11-03)
- Apetyt: właściciel nie podał liczby godzin; jego słowa: „wszystko jesteś w stanie wytestować sam i z kontrolami zastępczymi na opus high […] Moje zaangażowanie ograniczy się do kilku decyzji produktowych oraz ewentualnych testów na telefonie z checklistą którą mi dasz.” Skutek: apetyt mierzony godzinami właściciela = testy na telefonie z listy kontrolnej i kilka decyzji; funkcje nie wypadają z powodu jego czasu przeglądu. Odrzucone opcje pytania: 25 h, 40 h (rekomendacja), 50 h.
- Delegacja decyzji: sekcja „Delegacja decyzji” w `CLAUDE.md` (Trening jako wzór analogii; Oczko, Piekarz: wzory procesu decyzji).
- Nowa sesja: „Tak, otwórz nową i zarchiwizuj tę (Recommended)”.

## Rola 03 E1: wynik (2026-11-03, szósta sesja)
- Wzory decyzji przeczytane: Trening (limit tylko przy starcie, prośba o ocenę przed blokadą), Piekarz (E1 roli 03, ER przed cięciem D-041), Oczko (rejestr bieżący); miejsca w `docs/scope-contract.md`, E1.
- Pętla główna: F-02 → F-01 → F-03 → F-05 → F-07 → F-10 → F-04; krok „sprawdź się” F-12; podłogi F-13, F-14, F-15, F-06.
- Wzorzec (odczyt 20:49 UTC, US): GTO Preflop Wizard (3483), Postflop+ (1982), Poker Trainer (1165); tło Poker Skill (417); 186 recenzji, cytaty sprawdzone na surowym JSON. Wniosek: pętla to standard niszy; wyróżnik to sposób (darmowa nauka, „dlaczego”, poprawność, bez konta, 35 języków); skargi: płatność i błędna treść; pula ma być hojna i jawna.
- Nadmiar w kodzie: tryb „na czas”, księga reguł, diagnostyka, pomoc i słownik schowane w Postępie, gra z botami — do E2.
- Pominięcia: ER-12 (pętla opinii i zgłoszenie błędu w zadaniu), ER-13 (zasady dziennej puli jako BR).
- ZAL-005: dopisany dowód przeciw w części, status bez zmian.

## Decyzje właściciela na bramce E1 roli 03 (2026-11-03)
- ER-12 i ER-13: „Najpierw BR, potem E2 (Recommended)” — rola 01 w trybie fix dopisuje BR, potem cięcie E2 (analogia: Piekarz D-041). Odrzucone: E2 teraz z BR równolegle; zmiana ustaleń E1.
- Nowa sesja: „Nie” — kontynuacja w tej sesji (odrzucona rekomendacja: nowa z archiwizacją).

## Rola 01 fix i rola 03 E2 (2026-11-03, szósta sesja)
- Rola 01 fix (prompt `assemble.mjs 01-odkrywanie --tryb fix --zadania ER-12,ER-13`): klasa D obu znalezisk; czerwień: brak BR w `docs/brd` (grep); po: 43 BR, `kontrola-brd.mjs` bez `--szkic` kod 0; `pnpm run ci` kod 0 (pierwszy przebieg padł na limicie czasu 5 s testu `tools/content-build` „kompiluje się bez błędów…”, drugi zielony 91/91: test niestabilny — znalezisko dla roli 07). Wyjątki nazwane (zasada 7): bez osobnej gałęzi `naprawy/…` (jedna gałąź sztafety) i bez STOP E0/E2 trybu fix (decyzja właściciela D-101 obejmowała plan; dowody w commitach).
- Nowe w BRD: J-07, PR-09, OG-15, OG-16, BR-OPIN-001–003, BR-LIM-001–005, S-55–S-68, OP-23, OP-24, ER-12, ER-13. Nazwa „dzienny limit” zamiast „pula” (D-111).
- Rola 03 E2: warianty 1–3, D-103–D-106, D-108–D-111 decyzjami agenta (delegacja), D-102 i D-107 do właściciela; `zakres.mjs --brd --apetyt 16.5` kod 0. Rejestr w repo: `docs/decyzje.md` (do przeniesienia na Dysk).

## Decyzje właściciela na bramce E2 roli 03 (2026-11-03)
- Wariant: „1 »Pełna nauka« (Recommended)” (D-102); odrzucone: 2, 3. Apetyt wersji 1 = 16,5 h [OCENA].
- Limit: „1 aktywność dziennie (Recommended)” (D-107); odrzucone: 2 aktywności, 10 zadań. Do E3: OP-23 w BRD zamknąć (rola 01, ER albo wpis), OP-11 w `docs/monetyzacja.md` — uwaga dla roli 02.
- Nowa sesja: „Tak, otwórz nową i zarchiwizuj tę (Recommended)”.

## Rola 03 E3: wynik (2026-11-04, siódma sesja)
- Prompt: `node /home/user/prompts/tools/assemble.mjs 03-zakres --tryb build` (prompts c025063), przeczytany w całości; `zakres.mjs` z modułu `ciecie` bez zmian (scratchpad).
- `docs/scope-contract.md` według szablonu z wzorców (wzór: Piekarz `docs/scope-contract.md`); historia E0–E2 w `docs/archiwum/scope-contract-2026-11-03-robocze.md`. Treść tabel Zakres, NIE robimy i Ranking bez zmian względem E2 poza F-18 (nazwa i kryterium po D-107).
- `zakres.mjs docs/scope-contract.md --brd docs/brd --apetyt 16.5`: 21 funkcji (MVP 18, NIE 3), 43 BR, 0 błędów, 0 uwag, kod 0 (wynik wklejony w kontrakcie).
- Nowe sekcje: „Kolejność i przekazanie” (04, 05, 06, 07, 08, 02, 01), „Lista kontrolna na telefonie” (T-01–T-10, właściciel), „Definicja ukończenia” z dowodem.
- CI na `main` (odczyt 2026-11-04 przez MCP GitHub): E2E (Maestro) czerwony w przebiegach 14–18 (16–20.10), potem wyłączony; znane znalezisko dla roli 07, bez zmian.
- Bez zmian w BRD i `docs/monetyzacja.md` (zasada roli 7: nie pisze cudzych artefaktów); zamknięcia OP-23, OP-20, OP-22 i OP-11 przekazane rolom 01 i 02.

## Decyzje właściciela na bramce E3 roli 03 (2026-11-04)
- Kontrakt: „Akceptuję (Recommended)” (D-112).
- Poprawki BRD i `docs/monetyzacja.md`: „Na starcie następnej sesji (Recommended)” (D-113).
- Nowa sesja: „Nie”.

### Przekazanie do następnej roli
- Zakończono: 03-zakres, build, commit E3 na `claude/sleepy-brahmagupta-2065nu`; `docs/scope-contract.md`, `docs/decyzje.md`, `docs/zakres/`.
- Następny krok ścieżki greenfield: **04-studio-projektowe Studio Projektowe (UX, marka, przepływy)**, tryb `build`; nowa sesja: opus, wysiłek high.
- Polecenie: `node /home/user/prompts/tools/assemble.mjs 04-studio-projektowe --tryb build`
- Paczka wejściowa: `docs/scope-contract.md` (sekcje „Zakres”, „NIE robimy”, „Funkcje w kodzie bez BR”, „Kolejność i przekazanie” pkt 04, „Lista kontrolna na telefonie”), `docs/brd/wymagania.md` (PR-01–PR-09), `docs/brd/README.md` (blokery, OP-19), `docs/monetyzacja.md` (kontrakt płatności), `docs/decyzje.md`, `CLAUDE.md`.
- Przed 04 albo równolegle (krótkie poprawki cudzych artefaktów): rola 01 `fix` (OP-23 → D-107, OP-20 → D-105, OP-22 → D-106 w BRD), rola 02 (OP-11 → D-107, „pula” → „dzienny limit” w `docs/monetyzacja.md`).
- Otwarte decyzje: OP-09 (02), OP-24 = OP-10 monetyzacji (05), BRD OP-10 numery pomocy (06, bloker), OP-19 (04), OP-21 (05).

## Poprawki ról 01 i 02 po E3 (2026-11-04, D-113, siódma sesja)
- Prompty: `assemble.mjs 01-odkrywanie --tryb fix --zadania OP-23,OP-20,OP-22` i `assemble.mjs 02-monetyzacja --tryb fix --zadania OP-11` (prompts c025063), sekcje trybu fix przeczytane. Klasa D (zapis istniejących decyzji D-105, D-106, D-107, D-111).
- Czerwień (wiersz macierzy): `grep` w BRD pokazywał `[DO WYJAŚNIENIA]` przy OP-20, OP-22, OP-23 i „N darmowych zadań” w BR-LIM-001, BR-LIM-005, mimo decyzji w `docs/decyzje.md`; `docs/monetyzacja.md`: OP-11 otwarte i 6 wystąpień „pula” poza cytatem decyzji. Po: brak trafień poza cytatami decyzji; `kontrola-brd.mjs docs/brd` kod 0 (43 BR, 17 OP); `tests/wektory/brd.json` bez zmian; `zakres.mjs --brd --apetyt 16.5` kod 0.
- BR-LIM-001 i BR-LIM-002: scenariusze przepisane na jednostkę „aktywność” (limit zużyty przy starcie, „Jeden wspólny limit” pokazuje 0 i godzinę odnowienia); polecenie dla roli 07: testy tych scenariuszy pisać według nowego brzmienia. Nagłówek modułu: „Dzienny limit darmowych aktywności (LIM)”.
- Wyjątki nazwane (zasada 7): bez gałęzi `naprawy/…` (jedna gałąź sztafety) i bez STOP E0/E2 trybu fix (plan objęty decyzją właściciela D-113; dowody w commitach); praca ról 01 i 02 w sesji roli 03 (D-113: „na starcie następnej sesji”, właściciel kazał kontynuować tutaj).

## Rola 04 E0: wynik (2026-11-04, ósma sesja)
- Prompt: `assemble.mjs 04-studio-projektowe --tryb build` (prompts c025063), przeczytany w całości; skrypty modułu `render-i-krytyka` w scratchpadzie, próbnie uruchomione (kod 0).
- Raport: `docs/design/00-rozpoznanie.md` (środowisko, inwentarz obecnego motywu, PR-01–PR-09, konteksty, ograniczenia, pamięć portfolio, ekran kluczowy, plan). Moduł `kontekst-oczy-zajete` pominięty (oczy wolne we wszystkich przepływach).
- Stan CI `main`: E2E czerwony w przebiegach 11–18, bez zmian (rola 07).

## Rola 04 E2: wynik (2026-11-04, dziewiąta sesja)
- Trzy kierunki na ekranie „Decyzja w sesji” (prawdziwa treść: spot `rfi.co`, J9o, pas 80% / przebicie 20%, stopień „dopuszczalna”): `docs/design/kierunki/a-zapis.html`, `b-pasek.html`, `c-mapa.html`; karty stylu, test generyczności, krytyka i pomiary w `docs/design/02-kierunki.md`; karty kontrolne w `01-swiat.md`; strona `docs/design/porownanie.html` + `porownanie.png`; kroje OFL w `docs/design/fonty/`; skrypty w `docs/design/narzedzia/`.
- Pomiary: `warsztat.mjs` kod 0 (A, B, C), `kontrast.mjs` 35 par kod 0, `zrzuty.mjs` 72 zrzuty kod 0, `ikona.mjs` 6 ikon kod 0.
- Rekomendacja: A z paskiem B w wyjaśnieniu zadań z zakresu; C w rezerwie jako ekran postępu.
- Znalezisko dla roli 06: `range.acceptable` i dopisek w `range.explanation` (`apps/mobile/src/features/drills/text.pl.ts`) powtarzają to samo zdanie o „dopuszczalnej”.

## Następny krok
**Rola 04 build E2, dokończenie po wyborze właściciela:** zapis wyboru dosłownie w `docs/decyzje.md` (D-116) i w `02-kierunki.md`, potem ok. 5 krojów tytułów na ekranie wybranego kierunku (jeden zrzut zbiorczy, pochodzenie każdego kroju w świecie dziedziny), wybór kroju przez właściciela, potem E3. Prompt: `node /home/user/prompts/tools/assemble.mjs 04-studio-projektowe --tryb build`, sesja opus/high.

## Poprzedni następny krok (rola 03, wykonany)
**Rola 04 build** według „Przekazanie do następnej roli” wyżej: `node /home/user/prompts/tools/assemble.mjs 04-studio-projektowe --tryb build`; nowa sesja opus/high. Paczka: `docs/scope-contract.md`, `docs/brd/`, `docs/monetyzacja.md`, `docs/decyzje.md`, `CLAUDE.md`.
