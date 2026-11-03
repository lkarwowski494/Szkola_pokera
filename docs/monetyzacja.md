# Monetyzacja: Szkoła Pokera
Stan: E1b bramki opłacalności zakończone (werdykt „budować”, słaby dowód) (rola 02, krok 0, `--moduly oplacalnosc`) · Aktualizacja: 2026-11-03 · Wejście: brak BRD (krok 0 przed rolą 01), decyzje właściciela z E0 w `docs/sztafeta.md`

Dane surowe: `docs/monetyzacja/e1-rynek-2026-11-03.json` (lookup, zakupy w aplikacji US/PL/DE/GB, 45 storefrontów, StatCounter, NBP, Google Play). Parsery: `docs/monetyzacja/iap.mjs`, `plany.mjs`. Niezależność (D-023): przed zapisaniem `oplacalnosc-wlasna.json` nie otwierano karty portfela ani dokumentu „Aplikacje Mobilne do Nauki Pokera”; otwarto dokument 07 (Dysk, za zgodą z przekazania) i ADR-11.

## Środowisko E1 (2026-11-03)
- Działa: `itunes.apple.com/lookup`, `apps.apple.com` (strony aplikacji), RSS recenzji, `api.nbp.pl`, `gs.statcounter.com`, `play.google.com/store/apps/details`.
- **Nie działa: `itunes.apple.com/search`** — 403 z serwera Apple (nagłówek `server: daiquiri`, nie proxy) dla każdej frazy, także „chess”. ID konkurentów wzięto z dokumentu 07 i z list „podobne aplikacje” na stronach aplikacji (29 aplikacji nauki/treningu). Skutek: lista może pomijać aplikacje bez powiązań z tymi stronami [DO USTALENIA: powtórzyć wyszukiwanie w innej sesji].
- `reddit.com` 403: społeczności hobby jako sygnał popytu niepoliczone [DO USTALENIA].

## Rynek (odczyt 2026-11-03)
Kategoria: trenery GTO i kursy pokera (iOS). Wszystkie 29 aplikacji to darmowe pobranie z zakupami w aplikacji (subskrypcje; część z planem dożywotnim). Ceny: najniższa widoczna cena planu na stronie storefrontu (z promocjami „Special”, więc dolna granica).

| Aplikacja (ID) | Oceny US | Języki | Wiek | Mies. US / PL | Rok US / PL | Dożywotni US / PL |
|---|---|---|---|---|---|---|
| GTO Preflop Wizard (6590603158) | 3483 | EN | 12+ | 19,99 $ / 99,99 zł | 89,99 $ / 99,99 zł* | — |
| Postflop+ (1488850006) | 1982 | EN | 17+ | 14,99 $ / 49,99 zł | 99,99 $ / 489,99 zł | 149,99 $ / 699,99 zł |
| Poker Trainer – Learn Poker (6478522482) | 1165 | EN | 17+ | 14,99 $ / 79,99 zł | 59,99 $ / 299,99 zł | 269,99 $ / 1199,99 zł |
| Solver+ (1530767783) | 1163 | EN | 17+ | 17,99 $ / 49,99 zł | 149,99 $ / — | 299,99 $ / 999,99 zł |
| Preflop+ (1435468870) | 1022 | EN | 17+ | 5,99 $ / 29,99 zł | 79,99 $ / 389,99 zł | 59,99 $ / 299,99 zł |
| Flop Factor (6747833042) | 360 | EN | 17+ | — | — | 149,99 $ / 699,99 zł |
| Preflop AI (6747779080) | 298 | EN | 17+ | 14,49 $ / 79,99 zł | 49,99 $ / 147,99 zł | — |
| DTO MTT (1458491856) | 283 | EN | 17+ | 9,99 $ / 44,99 zł | 89,99 $ / 419,99 zł | — |
| NTPoker (1630961215) | 163 | 17, w tym PL, JA, KO | 4+ | 9,99 $ / 49,99 zł | 69,99 $ / 399,99 zł | — |
| POKER Q'z (6737678499) | 31 | 17, w tym PL, JA, KO | 12+ | 17,99 $ / — | 109,99 $ / 499,99 zł | — |
| Poker Academy (1626050814) | 8 | EN | 17+ | 9,99 $ / 49,99 zł | 99,99 $ / 499,99 zł | — |
| GTO Gecko (6738748434) | 62 | 11 (bez PL) | 17+ | 14,99 $ / 79,99 zł | — | 119,99 $ / 699,99 zł |

\* nazwa produktu „Annual VIP Access” w PL ma cenę 99,99 zł obok miesięcznego 99,99 zł — wpis z jednego odczytu, do sprawdzenia przed użyciem w wariancie.

**Mediany (US, n aplikacji):** miesięczny 14,99 $ (n=14, 5,99–19,99), roczny 89,99 $ (n=13, 49,99–149,99), dożywotni 149,99 $ (n=8, 29,99–299,99). **PL:** 64,99 zł (n=12), 409,99 zł (n=12), 699,99 zł (n=8). Kurs NBP 214/A/NBP/2026 z 2026-11-03: 1 USD = 3,9526 zł.

Wnioski (hipotezy dla bramki):
- **H-E1-01** Rynek płaci za trening pokera w modelu subskrypcji ~10–15 $/mies., ~60–100 $/rok; plan dożywotni jest częsty (8 z 16) i chwalony w recenzjach. Status: potwierdzone dla rynku US (R).
- **H-E1-02** Wariant właściciela 0,99 / 6,99 / 14,99 USD (D-029) jest 10–15× poniżej median kategorii. Do policzenia w macierzy wariantów E1b obok wariantów z cenami rynku; sama cena nie jest dowodem popytu.
- **H-E1-03** Prawie cała kategoria jest tylko po angielsku (25 z 29 aplikacji EN albo bez języków; 2 z PL). Status: potwierdzone (lookup, 2026-11-03).

## Recenzje o cenie i modelu (US, RSS, strony 1–3, 10 aplikacji, 349 recenzji z 2019-12-23 – 2026-10-20)
Liczby to trafienia wyrażeń regularnych bez rozróżniania wielkości liter na tytule i treści (górna granica), kierunek potwierdzają cytaty. Wyrażenia: ściana `pay ?wall|no free|not free|0 functionality|nothing for free|have to pay|before i spend|immediately wants`; drogo `expensive|overpriced|pricey|ridiculous|rip ?off|too much`; okres próbny `free trial|charged me|keeps charging|cancel`; pochwała `worth (every|it|the money|checking)|great value|paid for itself|affordable|great price|\+ev`; dożywotni `lifetime`; promocja `50%|discount|sale price|scam pricing`; urządzenie `new (ipad|phone|iphone)|switch(ed|ing)? (to )?(apple|phone)|transfer|another device|not show|honor the license`. Źródło: `https://itunes.apple.com/us/rss/customerreviews/page=<1–3>/id=<id>/sortby=mostrecent/json`.

| Motyw | Trafień z 349 | Cytat (aplikacja, ocena, data) |
|---|---|---|
| Ściana płatności bez próby | 23 | „This is a paid app. You will have 0 functionality unless you pay. No trial period. No demo.” (6590603158, 1★, 2026-05-03) |
| Za drogo | 20 | „$5.00 a week for a game is beyond ridiculous.” (1488850006, 2★, 2024-12-14) |
| Okres próbny zamieniony w opłatę, trudne anulowanie | 17 | „They give you a free trial but don’t give you the option to cancel” (1530767783, 1★, 2026-01-16) |
| Pochwała wartości | 20 | „It has paid for itself many time over.” (1435468870, 5★, 2020-05-29) |
| Plan dożywotni | 13 | „If you’re serious about poker, get this app. Lifetime membership is most +EV.” (1488850006, 5★, 2022-01-18) |
| Fałszywa promocja | 7 | „They will offer you a “50%!!” Discount which is NOT 50% off.” (1488850006, 3★, 2023-05-08) |
| Zakup nie przechodzi na nowe urządzenie | 4 | „My subscription doesn’t show on my new iPad” (1488850006, 1★, 2026-06-15) |
| Brak wyjaśnień | (wyrażenie zbyt szerokie) | „Ultra basic and doesn’t tell you the why behind anything.” (6590603158, 1★, 2026-06-13) |

Wnioski: **H-E1-04** darmowa część z prawdziwą nauką przed zakupem to przewaga (skargi na ścianę płatności dotyczą lidera US); **H-E1-05** uczciwe ujawnienia, przywracanie i działające przenoszenie zakupu to wymóg, nie dodatek (zasada roli 6–7); **H-E1-06** wyjaśnienie „dlaczego” to luka rynku (zgodne z dokumentem 07). Status: hipotezy (R, jedna próbka US).

## Przesiew storefrontów i języków (35 języków Treningu, 45 storefrontów, 2026-11-03)
Popyt: oceny 20 aplikacji nauki ÷ lata od wydania (min. 1), z `lookup` per storefront. Podaż: języki konkurentów. Platforma: StatCounter, październik 2026.

| Storefront (język) | Oceny/rok konkurentów | Android ÷ iOS | Luka lokalizacji | Uwagi |
|---|---|---|---|---|
| US (en) | 3548 | 0,92 | brak (wszyscy EN) | rynek główny |
| JP (ja) | 1711 | 0,86 | 2 aplikacje z JA prowadzą (NTPoker 2601, POKER Q'z 1570 ocen vs EN 772, 647) | dowód, że lokalizacja zbiera popyt |
| CA (en) | 482 | 0,54 | brak | |
| BR (pt-BR) | 283 | 2,81 | top 4 tylko EN | |
| GB (en) | 281 | 0,99 | brak | |
| FR (fr) | 277 | 1,79 | top 4 tylko EN | |
| TW (zh-Hant) / HK | 264 / 159 | 0,94 / 1,15 | do sprawdzenia (zh w 2 aplikacjach) | |
| VN (vi) | 229 | 1,61 | top 4 tylko EN | |
| AU (en) | 189 | 0,61 | brak | |
| MX (es-419) | 168 | 2,86 | brak ES w top 4 [DO USTALENIA] | |
| KR (ko) | 166 | 1,54 | NTPoker KO prowadzi | tylko 8 z 20 aplikacji dostępnych w storefroncie |
| DE (de) | 161 | 2,61 | top tylko EN | |
| RU (ru) | 119 | — | — | płatności App Store w Rosji [DO USTALENIA] |
| IT 114, ES 111, RO 67, IN 63, AR 61, NL 58, UA 51, CH 47, CO 45 | | | | |
| **PL (pl) 37**, BE 37, SE 35, TR 33, NO 33, MY 30, DK 30 | | | | PL: rynek domowy, mały popyt |
| AT 26, PT 23, HU 23, CZ 23, FI 20, GR 18, ID 15, BG 15, LT 13, SI 10, EE 8, SK 7, RS 7, LV 7, HR 7 | | | | |

Suma ocen iOS 20 aplikacji w 45 storefrontach: 31 554.

**Lista krótka do rachunku E1b:** US (rynek główny), JP, CA, GB, BR, FR, TW, VN, DE oraz PL (rynek domowy, treść istnieje). Kolejność przeglądu rodzimego dla roli 09 przy polityce szerokiej: en → ja → pt-BR → fr → zh-Hant → vi → es-419 → ko → de → pozostałe. Odrzuconych języków brak (polityka szeroka, decyzja właściciela 2026-11-03).

**Android:** Play reviews ÷ oceny iOS (45 storefrontów): Preflop Wizard 605 / 6328 = 0,10; GTO Gecko 1,1 tys. / 371 ≈ 3,0 (oba „10K+ Downloads”). Rozrzut 30× → w bramce `[ZAŁOŻENIE]` z przedziałem, nie stały udział StatCounter.

## Reguły sklepu
Z E0 (App Review Guidelines „Last Updated: October 16, 2026”, odczyt 2026-11-03): 3.1.1, 3.1.2(a), 3.2.2(x), 4.2, 4.3(b), 5.6, 5.3.4 — cytaty w `docs/sztafeta.md`. Kategoria wiekowa: 21 z 29 konkurentów ma „17+”, 5 (m.in. NTPoker, Poker Coaching) „4+”, 3 „12+” (lookup, `contentAdvisoryRating`) — wejście do ADR-12, decyzja po E1b.

## Opłacalność (E1b, 2026-11-03)
Dowody uruchomienia: `docs/monetyzacja/dowody/oplacalnosc-2026-11-03.txt` (wariant właściciela, 16:58 UTC) i `dowody/warianty-2026-11-03.txt` (macierz). Próg: 500 USD/rok netto, globalnie (decyzja właściciela 2026-11-03). Kwoty: USD netto/rok po VAT i prowizji 15%, przed podatkiem dochodowym, bez kosztów portfela (Apple Developer, rejestracja Google Play — D-024). Wartości pes. / norm. / opt.

**Kontrola skryptów (2026-11-03, prompts c025063):** `node oplacalnosc.mjs prompts/tests/fixtures/oplacalnosc-przyklad.json` → A 55,26 zł „porzucić”, B 455,36 zł „odłożyć” przy progu 1948,70 zł; `node rachunek.mjs prompts/tests/fixtures/rachunek-przyklad.json` → wpływ 13,81 zł, próg 28 płacących/rok (kod 0, zgodne z oczekiwanymi). Dodatkowo niezależne przeliczenie ios/us bez importu skryptu: 3548,6 ocen/rok × założenia normalne = 134,14 płacących × 6,6113 USD = **886,83 USD**, zgodne ze skryptem.

### Werdykt: **budować** (wariant właściciela 0,99 / 6,99 / 14,99 USD, D-029)
| Zakres | pes. | norm. | opt. |
|---|---|---|---|
| ios/us | 16,01 | 886,83 | 27 628,08 |
| ios/jp | 5,47 | 455,15 | 28 367,25 |
| ios/ca · gb · br · fr · tw · vn · de | 0,70–1,74 | 58–99 | 2 453–6 183 |
| ios/pl | 0,17 | 11,63 | 603,98 |
| android/us | 1,60 | 532,10 | 55 256,16 |
| android/jp | 0,55 | 273,09 | 56 734,50 |
| android, pozostałe 8 sklepów | 0,02–0,17 | 7–59 | 1 208–12 366 |
| **iOS razem** | 29,97 | 1 956,72 | 88 717,65 |
| **Android razem** | 3,00 | 1 174,03 | 177 435,31 |
| **Razem** | **32,96** | **3 130,75** | **266 152,96** |
| **Sam iOS** | 29,97 | 1 956,72 | 88 717,65 → też „budować” |

Siła dowodu: **słaba**. Wynik normalny jest 6,3× nad progiem, ale pesymistyczny 15× pod nim, a rozrzut pes.–opt. to ~8000×. Popyt (oceny konkurentów, ceny, VAT GB, prowizja) jest odczytany u źródła; trzy mnożniki o największym wpływie to `[ZAŁOŻENIE]` bez przeczytanego benchmarku. US i JP dają 69% wyniku normalnego (2 147,17 z 3 130,75); PL (rynek domowy) poniżej 1%.

### Wrażliwość
| Założenie (wszystkie sklepy) | Wynik przy pes. → opt. (reszta norm.) | Zmienia werdykt? | Najtańsze sprawdzenie |
|---|---|---|---|
| instalacje na ocenę (20 / 60 / 200) | 1 043,58 → 10 435,84 | nie sam | przeczytany raport branżowy o stosunku ocen do pobrań (0 zł, ~1 h agenta) |
| konwersja pobranie → płacący (1,5 / 4,5 / 12%) | 1 043,58 → 8 348,67 | nie sam | publiczny raport subskrypcji aplikacji z konwersją według ceny i kategorii (0 zł, ~1 h agenta) |
| udział nowej aplikacji (0,5 / 2 / 5%) | 782,69 → 7 826,88 | **tak dla „sam iOS”** (1 956,72 ÷ 4 < 500) | po wydaniu: App Store Connect Analytics, 90 dni (0 zł, czas oczekiwania) |
| VAT FR/DE/PL/JP/TW/VN (`[ZAŁOŻENIE]`) | < 5% wyniku | nie | odczyt stawek u źródła: próby 2026-11-03 nieudane (gov.pl, nta.go.jp bez stawki w HTML; impots.gouv 404; BMF 503) — OP-06 |

Margines wariantu właściciela: werdykt spada do „odłożyć”, gdy dwa z trzech głównych założeń są pesymistyczne naraz (np. 3 × 4 = 12 > 6,3). Margines wariantu rynkowego: ~50×, spada dopiero przy prawie wszystkich pesymistycznych.

### Macierz wariantów (D-028; reklamy pominięte: standard marki wysoki, brak przeczytanego źródła przychodu)
| Wariant | Razem pes. / norm. / opt. (USD) | Sam iOS norm. | Werdykt |
|---|---|---|---|
| rynek 14,99 mies. / 89,99 rok / 149,99 dożywotni | 270 / 24 958 / 1 553 497 | 15 599 | budować |
| jednorazowy 99,99 | 186 / 17 893 / 1 046 198 | 11 183 | budować |
| rok 59,99 | 149 / 13 419 / 784 592 | 8 387 | budować |
| jednorazowy 49,99 | 155 / 13 418 / 784 563 | 8 386 | budować |
| mies. 9,99 + rok 59,99 | 149 / 13 414 / 883 728 | 8 384 | budować |
| środek 4,99 / 29,99 / 59,99 | 116 / 10 784 / 752 977 | 6 740 | budować |
| mies. 9,99 | 124 / 10 725 / 627 108 | 6 703 | budować |
| jednorazowy 19,99 | 75 / 6 439 / 418 298 | 4 024 | budować |
| **właściciel 0,99 / 6,99 / 14,99** | 33 / 3 131 / 266 153 | 1 957 | budować |
| płatna z góry 9,99 | 16 / 1 341 / 104 518 | 838 | budować (sam iOS: zależny od 3 założeń) |
| napiwek 2,99 | 2 / 134 / 7 826 | 84 | odłożyć |

Zastrzeżenie: kolejność wariantów zależy od założonej konwersji przy danej cenie (`[ZAŁOŻENIE]`, np. 4,5% przy 0,99 USD wobec 3% przy 14,99 USD). Różnice między miejscami 2–7 mieszczą się w błędzie tego założenia; pewna jest tylko różnica rzędu wielkości między cenami rynku a wariantem właściciela (8× w wyniku normalnym).

### Model optymalny (najwyższy wynik normalny w podłodze)
Najwyższy wynik normalny: **rynek 14,99 $/mies., 89,99 $/rok, 149,99 $ dożywotni** (ceny lokalne według tabel cen Apple). Podłoga:
- bez ciemnych wzorców: darmowa część z prawdziwą nauką przed zakupem (H-E1-04), okres próbny tylko przez App Store Connect z jasnym ujawnieniem ceny po okresie, bez fałszywych promocji „50%” (H-E1-05), łatwe anulowanie przez ustawienia systemu, działające „Przywróć zakupy”;
- wytyczne sklepów: subskrypcja tylko z bieżącą wartością (3.1.2(a): aktualizacje treści, powtórki SRS), plan dożywotni jako zakup nieodnawialny, bez gry na pieniądze i pomocy w czasie gry (5.3.4); odpowiedniki w Google Play [DO SPRAWDZENIA przez rolę 02 w kroku cennika];
- standard marki wysoki: bez reklam i SDK śledzących — spełnione we wszystkich wariantach macierzy;
- zasada 18 biblioteki („Tylko funkcje z wartością i intuicyjne; żadnych kombajnów”, `shared/zasady.md`, wersja 2026-10-31): dotyczy funkcji, nie ceny; wariant nie dodaje funkcji — spełnione; podział darmowe/płatne i WTP-X ocenia sesja 2 roli 02 z rolą 03.
Wybór ceny to decyzja produktowa właściciela (CLAUDE.md). **Decyzja właściciela 2026-11-03: wariant 0,99 / 6,99 / 14,99 USD** (odrzucone: ceny rynku, jednorazowy 99,99, środek; szczegóły w `docs/sztafeta.md`). Podłoga powyżej obowiązuje także dla tego wariantu.

### Rozbieżności z kartą portfela i dokumentem „Aplikacje Mobilne do Nauki Pokera” (otwarte po zapisaniu dowodu, D-023)
Karta `portfel-aplikacji/karty/48-szkola-pokera.md`: **nieotwarta** — leży w osobnym repo `portfel-aplikacji`; jego dołączenie odrzucił klasyfikator środowiska (2026-11-03, OP-05). Dokument z Dysku (id 121Gf18Z…, odczyt 2026-11-03):

| Wielkość | Nasza (E1, lookup/strony App Store 2026-11-03) | Dokument | Przyczyna |
|---|---|---|---|
| Liczba aplikacji w kategorii | 29 (z dokumentu 07 i list „podobne”) | 45–50 aktywnych, 33 wiodące | `itunes.apple.com/search` 403 → pominięte m.in. Poker Skill, River, Pokr, LeakSeek, Insta Poker Coach, PokerCruncher, Poker Sense (OP-01). Skutek: popyt (oceny/rok) zaniżony, a konkurencja darmowa i zlokalizowana też zaniżona — kierunek wpływu na wynik nieznany |
| Darmowa alternatywa | `[ZAŁOŻENIE]` 50 / 70 / 90% popytu niezabranego | Poker Skill „Free forever” (lekcje, 8 języków w aplikacji) | brak tej aplikacji w naszych danych; mnożnik może być zawyżony dla początkujących |
| Luka lokalizacji (poza EN) | 25 z 29 tylko EN; mnożnik 1 / 1,5 / 3 | ~70% tylko EN; River 8 języków (w tym JA, FR, DE, PT-BR), Poker Skill 8, Pokr 6 | dokument ma aplikacje spoza naszej listy; mnożnik dla JP/FR/DE/BR/TW może być zawyżony |
| Języki Poker Academy | EN (metadane App Store) | 5 (PL, EN, ES, FR, ZH-Hans), przełącznik w aplikacji | inne źródło: metadane sklepu vs język wewnątrz aplikacji |
| Języki NTPoker / POKER Q'z | 17 (metadane App Store) | 2+ / 3+ | dokument liczy języki treści, my metadane sklepu |
| Preflop+ mies. / dożywotni (US) | 5,99 $ / 59,99 $ | 9,99 $ / 129,99 $ | my bierzemy najniższą cenę z listy zakupów (z promocjami „Special”); dokument cenę podstawową; dokument opisuje testy cen A/B |
| Solver+ mies. / dożywotni | 17,99 $ / 299,99 $ | 22,99–50 $ / 349,99 $ | jak wyżej |
| GTO Gecko mies. / rok | 14,99 $ / — | 24,99 $ / 149,99 $ | jak wyżej; inny plan (1 format vs All-Access) |
| Preflop Wizard | 19,99 $ mies., 89,99 $ rok | 10,83 $/mies. przy rocznym (≈ 129,99 $/rok) | testy cen / inny odczyt [DO USTALENIA] |
| POKER Q'z mies. | 17,99 $ | 13,99 $ | jak wyżej |
| Zgodne | Poker Trainer (14,99 / 59,99 / 269,99), NTPoker (9,99 / 69,99), DTO (9,99 / 89,99), Postflop+ (14,99), Poker Academy (9,99 $ / 49,99 zł) | | |

Wniosek: rozbieżności cen nie zmieniają median kategorii rzędu wielkości (wariant właściciela pozostaje 10× pod rynkiem). Istotna jest **niepełna lista konkurentów** (OP-01): przy ponownym przebiegu dodać brakujące aplikacje (popyt i darmowa/zlokalizowana podaż), zanim cena trafi do cennika.

## Otwarte pytania
| ID | Pytanie | Rozstrzyga | Dotyczy |
|---|---|---|---|
| OP-01 | [DO USTALENIA] Powtórzyć `itunes.apple.com/search` (fraza w językach listy krótkiej) — czy nie pominięto konkurentów | 02, kolejna sesja | lista konkurentów |
| OP-02 | [DO USTALENIA] Płatności App Store w storefroncie RU | 02, E1b | przesiew |
| OP-03 | [DO USTALENIA] Instalacje na ocenę i udział nowej aplikacji: brak przeczytanego benchmarku → `[ZAŁOŻENIE]` z rozrzutem ≥ 10× | 02, E1b | bramka |
| OP-04 | [DO WYJAŚNIENIA] Wpis decyzji E0 w rejestrze 03 na Dysku wymaga konektora Google Docs (sesja ma tylko Drive) | właściciel | rejestr |
| OP-05 | [DO WYJAŚNIENIA] Repo `portfel-aplikacji` niedostępne w sesji (add_repo odrzucony przez klasyfikator 2026-11-03): karta 48 do tabeli rozbieżności. Repo `prompts` dołączone (kontrola skryptów i zasada 18 zrobione) | właściciel (zgoda na dołączenie repo) | rozbieżności |
| OP-06 | [DO USTALENIA] Stawki VAT FR/DE/PL/JP/TW/VN u źródła (wpływ < 5%) | 02, krok cennika | rachunek |
| OP-07 | [DO USTALENIA] Benchmark instalacji na ocenę i konwersji według ceny (przeczytane źródło) — najtańsze sprawdzenie werdyktu | 02, przed cennikiem | bramka |

