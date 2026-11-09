# Sklep: tekst strony produktu, notatki dla recenzenta, kategoria wiekowa (rola 10, E2)

Stan: 2026-11-09, sesja M (tylko dokumenty), commit wejściowy ab0bb2f. Zadania D-01 i D-02 z `docs/wydanie/plan-1.0.md` §4.2. Tryb samodzielny D-296: pytania produktowe rozstrzygnięte rekomendacją jako A „przyjęta wg D-296”, do weta.

**Wyjątek nazwany (prompt roli):** `node tools/assemble.mjs 10-wydanie --tryb build` odrzucony przez klasyfikator trybu auto. Pliki roli przeczytane bezpośrednio z klonu `lkarwowski494/prompts` (c025063): `role/10-wydanie/rdzen.md`, `moduly/metadane-i-zrzuty.md`, `moduly/recenzja-i-odrzucenia.md`, `moduly/prywatnosc-i-formularze.md`. Ryzyko: brak części wspólnych, które dokleja assemble (zasady wspólne, `srodowisko.md`). Tańsza kontrola: zasady wspólne cytowane w rdzeniu (12, 13, 14, 16) zastosowane wprost; pozostałe moduły roli (`potok-i-podpis`, `opis-wydania`, `widocznosc-w-sklepie`) nie dotyczą D-01/D-02.

**Wynik w skrócie**
- Pliki: `store/app-store-metadata.json` (pl, en-US; en-GB/CA/AU = en-US), `store/review-notes.md` (notatki en do wklejenia, pl dla właściciela). Miejsce `store/` jak w Treningu (D-309).
- Nazwa en: **„Poker School: Learn Strategy”** (28 znaków). W App Store nie znaleziono aplikacji o nazwie „Poker School” (§5). **Zastąpiona 2026-11-09 przez D-378 (W): „PokerGym: GTO Strategy Trainer”; nowe nazwy i słowa kluczowe: `docs/sklep/aso/README.md` (D-382).**
- Kontrola tekstu: `docs/wydanie/dowody/metadane-2026-11-09.txt`, **kod 0** (limity, bajty, brak nazw konkurencji i marek, brak cen i obietnicy wygranej).
- Kategoria wiekowa (D-02, D-310): odpowiedzi z kodu dają 13+; rekomendacja A: override do 18+ (grupa docelowa dorośli); Simulated Gambling = None; OP-18 zamknięte dla ankiety Apple 1.0 (§6).
- Zgłoszenia do innych ról: 10-D01-01 (WYSOKIE, tekst ekranu zakupu obiecuje scenariusze), 10-D01-02 (ŚREDNIE), §4.

## 1. Reguły Apple z dnia pracy (odczyt 2026-11-09)

„dosł.” = cytat z pobranego HTML strony (curl, plik w scratchpadzie sesji); „stresz.” = brzmienie z odczytu narzędziem, które oddało tę część strony tylko streszczeniem. Tam zgodność z tabelą modułu roli (odczyt 18.10.2026) jest jedyną kontrolą. Przed wpisem do ASC zostaje ponowny odczyt (plan-1.0 D-06).

| Pole / reguła | Cytat | Źródło | Rodzaj |
|---|---|---|---|
| Nazwa | „The name must be at least two characters and no more than 30 characters.” | developer.apple.com/help/app-store-connect/reference/app-information/app-information | stresz. (zgodne z modułem 18.10) |
| Podtytuł | „This can't be longer than 30 characters.” | tamże | stresz. |
| Tekst promocyjny / opis | „can't be longer than 170 characters” / „Limited to 4000 characters.” | …/platform-version-information | stresz. |
| Słowa kluczowe | „You can provide up to 100 bytes of content.” „Names of other apps or companies aren't allowed.” Nazwy aplikacji i firmy „you shouldn't duplicate” | tamże | stresz. |
| Słowa kluczowe (strona produktu) | „Keywords are limited to 100 characters total, with terms separated by commas and no spaces.” Unikać: „Duplicate words”, „Plurals of words that you’ve already included in singular form”; nie używać: „Competing app names”, „Unauthorized use of trademarked terms” | developer.apple.com/app-store/product-page/ | dosł. |
| Opis bez cen | „Also avoid including specific prices in your app description.” | tamże | dosł. |
| Notatki App Review | „The Notes field can contain up to 4000 bytes.” | …/platform-version-information | stresz. |
| 2.3.7 | „Choose a unique app name, assign keywords that accurately describe your app, and don’t try to pack any of your metadata with trademarked terms, popular app names, pricing information, or other irrelevant phrases just to game the system. […] App subtitles […] should not include inappropriate content, reference other apps, or make unverifiable product claims.” | developer.apple.com/app-store/review/guidelines/ („Last Updated: October 16, 2026”) | dosł. |
| 2.3.8 | „Metadata should be appropriate for all audiences, so make sure your app and in-app purchase icons, screenshots, and previews adhere to a 4+ age rating even if your app is rated higher.” | tamże | dosł. |
| 2.3.1(a) | „marketing your app in a misleading way, such as by promoting content or services that it does not actually offer […] is grounds for removal” | tamże | dosł. |
| 2.1(b) | „If you offer in-app purchases in your app, make sure they are complete, up-to-date, visible to the reviewer and functional.” | tamże | dosł. |
| 5.1.1(ix) | „Apps that provide services in highly regulated fields (such as banking and financial services, healthcare, gambling, legal cannabis use, air travel and crypto exchanges) or that require sensitive user information should be submitted by a legal entity that provides the services, and not by an individual developer.” | tamże | dosł. |
| 5.3.4 | „Apps that offer real money gaming (such as sports betting, poker, casino games, horse racing) or lotteries must have necessary licensing […]. Illegal gambling aids, including card counters, are not permitted on the App Store.” | tamże | dosł. |
| Notatki: funkcje nieoczywiste | „Include detailed explanations of non-obvious features and in-app purchases in the App Review notes” | tamże („Before You Submit”) | dosł. (przez narzędzie) |

Skutek dla tekstów: limity niżej są bezpieczniejsze z dwóch brzmień (100 **bajtów**). Notatki odpowiadają na 5.3.4 i 5.1.1(ix) faktami: brak gry na pieniądze, stawek, żetonów, nagród, gry z innymi; brak pomocy przy grze poza aplikacją (NFR-ZGOD-003); brak operatorów (NFR-ZGOD-001). Bez przekonywania (rola 10, zasada 9).

## 2. Opis a kod (każde zdanie opisu ma miejsce w kodzie, commit ab0bb2f)

| Zdanie opisu | Miejsce w kodzie / treści |
|---|---|
| Moduły: zasady … analiza własnej gry (13 tematów, bez liczby modułów) | `content/pl/modules.yaml:1–14`; każdy moduł ma lekcje (`content/pl/lessons`, 44 pliki, m0–m13) |
| Terminy w miejscu użycia i słowniczek | `apps/mobile/src/app/glossary.tsx`, `features/glossary/glossary.ts`; wejście z zakładki Postęp `(tabs)/progress.tsx:77` |
| Ocena poziomu do 8 pytań, „Pomiń”, wskazana lekcja | `packages/domena/src/konfiguracja.ts:9`; `pl.json` `placement.skip`, `placement.startAt` |
| Egzamin modułu 15 zadań | `konfiguracja.ts:6–7` (próg 85% nie w opisie) |
| Ocena w czterech stopniach | `pl.json` `grade.zgodne/dopuszczalne/niedokladnosc/blad` |
| Wybór akcji, odpowiedź liczbowa, malowanie zakresu | `session.chooseAction`, `session.numberLabel`, `paint.*`; `features/session/build.ts:66` |
| Sesja przerwana → powrót do tego samego zadania | `app/session.tsx:74` (D-248) |
| Powtórki rozłożone w czasie | `packages/srs`, zakładka `(tabs)/review.tsx` |
| Trafność, najsłabsze, seria, wskaźnik zaawansowania | `pl.json` `progress.accuracy/weakest/streak_*`, `advancement.*` |
| Codzienne przypomnienie (opcjonalne) | `app/settings.tsx:115–123` |
| Offline, bez konta, bez reklam i śledzenia | `docs/architektura/prywatnosc.md:21` (tylko StoreKit); D-307 („Data Not Collected”) |
| Eksport, import, usunięcie postępu | `app/data.tsx`; `features/ustawienia/EkranUstawien.tsx` (`usunPostep`) |
| Ekran „Pomoc” | `app/help.tsx`; `content/helplines.yaml` (D-158) |
| Dostęp: co darmowe, 1 aktywność dziennie, plany | `packages/domena/src/limit.ts:21–27`; `konfiguracja.ts:5, 29–33`; `pl.json` `purchase.renews*`, `purchase.cancelInfo` |

Nie ma w opisie (świadomie): scenariusze całego rozdania (F-12, D-305), liczba języków (dziś tylko pl; po K-04 ewentualnie zdanie „available in …” przy przekładzie), ceny (strona produktu Apple), słowo „solver” (narzędzie treści, nie funkcja aplikacji), „trening na czas” (usunięty, ADR 0011). Liczby w opisie (8, 15, 1) pochodzą z `KONFIGURACJA`, nie z `content/numbers.yaml`: tam są tylko liczby treści pokerowej. To nazwane odstępstwo od polecenia: przy zmianie `KONFIGURACJA` tekst sklepu wymaga zmiany (lista przed wysyłką, D-06).

## 3. Kontrola tekstu

Skrypt `docs/wydanie/dowody/sprawdz-metadane.py` (uruchomienie z katalogu repo: `python3 -I docs/wydanie/dowody/sprawdz-metadane.py`): długości pól, bajty słów kluczowych, słowa ≥ 3 znaki, bez duplikatów i spacji, bez słów z nazwy, lista zakazanych słów (marki i operatorzy, ceny i waluty, obietnica wygranej, „for kids”) na granicach słów, nazwy aplikacji konkurencji z `docs/brd/dane/konkurencja-2026-11-03.json`. Wynik: `dowody/metadane-2026-11-09.txt`, **0 błędów, kod 0**. Pierwsze uruchomienie (podciągi) dało 5 trafień: 3 fałszywe („zł” w „złe”, „earn” w „learn”) i fraza „learn poker” (nazwa konkurenta) w tekście promocyjnym en, zastąpiona przez „Study poker”. Test samego sprawdzenia: „Wygraj teraz” → wykryte, „learn” → nie, „za 10 zł” → wykryte.

Skrypt jest w `docs/` (pas dokumentów, dowód sesji M). **Od sesji S (D-334) kontrolę w CI robi `tests/kontrole/k11-sklep.test.ts`** (`pnpm test:kontrole` w `pnpm run ci`): te same reguły plus słowa kluczowe bez słów z podtytułu (jak Trening; usunięto „nauka” z pl) i mapa §2 jako wiersze testu — nowy punkt „•” w opisie wymaga wiersza mapy z miejscem w kodzie.

## 4. Zgłoszenia z D-01

| ID | Waga | Co | Dla | Dowód |
|---|---|---|---|---|
| 10-D01-01 | **WYSOKIE** (ryzyko odrzucenia 2.3.1(a); funkcja nieobecna w 1.0) | Ekran zakupu: `purchase.unlocks` = „Bez dziennego limitu: sesje ćwiczeń, powtórki, **scenariusze** i egzaminy każdego dnia.” Przy F-12 poza 1.0 (D-305) tekst obiecuje funkcję, której nie ma. Propozycja: „Bez dziennego limitu: sesje ćwiczeń, powtórki i powtórne egzaminy każdego dnia. Lekcje zostają darmowe.” (brzmienie 04) i wróci przy F-12 | 04 (tekst), 08 | `apps/mobile/src/i18n/locales/pl.json` `purchase.unlocks`; D-305; 2.3.1(a) §1 |
| 10-D01-02 | ŚREDNIE | Ekran zakupu otwiera się tylko po wyczerpaniu dziennego limitu (`EkranStartu` → „Pełny dostęp”); w ustawieniach jest tylko „Przywróć zakupy”. Recenzent dojdzie ścieżką z notatek (2.1(b) spełnione notatką), ale Trening ma wejście „Zobacz plany” w ustawieniach (`review-notes.md` Treningu, „More > Settings, section Subscription”). Propozycja: wiersz „Pełny dostęp” w sekcji Zakupy | 04, 08 (1.0 albo 1.0.1) | `features/ustawienia/EkranUstawien.tsx:36–37`; `app/session.tsx:268–290` |
| 10-D01-03 | warunek wysyłki | Wstawki `[ADRES PRYWATNOSCI]`/`[PRIVACY URL]` i `[SUPPORT EMAIL]` | właściciel (zgoda na Pages, D-308; W-04) | `store/app-store-metadata.json`, `store/review-notes.md` |
| 10-D01-04 | warunek wysyłki | Etykiety en w notatkach to robocze przekłady z kluczami; podmiana z `en.json` po K-03 | 09 / 10 | `store/review-notes.md` |

## 5. Nazwa en (D-293 pkt P-3; D-309)

Sprawdzenie zajętości: iTunes Search API, 5 fraz × US, GB, JP, 2026-11-09 08:00–08:03 UTC, 0 USD; wynik `docs/wydanie/dowody/nazwy-2026-11-09.json`.

| Fraza | Aplikacje z frazą w nazwie (US/GB/JP) | Wniosek |
|---|---|---|
| Poker School | tylko „Gatsby Poker School” (US, 0 ocen, Sports) | wolna jako nazwa; podobieństwo częściowe |
| Szkoła Pokera | 0 wyników | wolna |
| Poker Academy | „Poker Academy: Learn GTO poker” (iSolve Sp. z o.o.) | zajęta |
| Poker Coach | 7–11 aplikacji, m.in. „Poker Coach: GTO Training”, „Poker Coach: AI Strategy” | zajęta, tłoczno |
| Poker Lessons | „River: Poker Lessons & Trainer” | wolna jako nazwa, ale w cudzej nazwie |

Ograniczenie: wyszukiwarka zwraca do 50 wyników na kraj; ostatecznie unikalność sprawdza App Store Connect przy zapisie nazwy (krok właściciela). Znaków towarowych nie sprawdzano: [DO SPRAWDZENIA] przy teście marek W4 (D-301), fraza opisowa.

| Opcja | Nazwa en | Kompromis |
|---|---|---|
| **A (rekomendacja, przyjęta wg D-296)** | **Poker School: Learn Strategy** (28) | „Poker School” = przekład „Szkoła Pokera” (D-293); człon po dwukropku opisuje pracę (wzór nazw Treningu: „Training: Gym Log & Rest Timer”); słowa nazwy nie powtarzają się w słowach kluczowych, więc te mają miejsce na inne frazy |
| B | Poker School | krótsza, mocniejsza marka; mniej słów indeksowanych w nazwie |
| C | Poker School: GTO Trainer | fraza „gto”/„trainer” najczęstsza w nazwach konkurencji (34 i 44 ze 102), ale tłoczno i bliżej cudzych nazw („GTO … Trainer”) |

Nazwa pod ikoną (`locales/systemowe/en.json`, K-03) to „Poker School” (D-293); nazwa w sklepie może mieć człon po dwukropku jak w Treningu.

## 6. Kategoria wiekowa (D-02, D-310)

Źródła (odczyt 2026-11-09, pobrany HTML, cytaty dosłowne): „Age ratings values and definitions” (developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions), „Set an app age rating” (…/manage-app-information/set-an-app-age-rating), wytyczna 2.3.6 (guidelines, Last Updated 16.10.2026), Apple Developer News „Age rating questionnaire now includes social media questions” (developer.apple.com/news/?id=tlur8uvi, 9.07.2026).

Kluczowe cytaty:
- Simulated Gambling: „Betting or wagering without using real money or in-game currency that can be exchanged for real money.” To samo brzmienie co S-19 z 2026-11-03 (`docs/brd/zrodla.md:24`): definicja się nie zmieniła.
- Gambling: „Betting or wagering using real money or in-game currency that may be exchanged for real money. May include: casino or card games, sports and non-sports betting, or lotteries and raffles.”
- Contests: „Events that allow users to compete with one another for rankings, rewards, or the achievement of personal goals. May include: skill-based competitions, trivia quizzes, or sport or fitness contests”
- Medical or Treatment Information: „Content that provides diagnoses or guidance around the management of medical conditions or health and wellness. May include: medication guidance, emergency medical care, or treatment information.”
- Health or Wellness Topics: „Content that provides self-care or lifestyle recommendations.”
- Mature or Suggestive Themes: „… topics for older audiences due to the complex, intense, or sensitive nature, which may deal with real-world issues or content unsuitable for children. May include: … moral or ethical dilemmas …”
- Progi: 13+ m.in. „Infrequent medical or treatment information”, „Infrequent simulated gambling”; 9+ „Health and wellness topics”, „Infrequent mature or suggestive themes”; 18+ „Gambling”, „Frequent simulated gambling”. Australia: „R 18+ … Infrequent simulated gambling”.
- Override: „To increase the rating of your app to a rating that exceeds the rating assigned by Apple, choose Override to Higher Age Rating […]. App Store will display this specified age rating, and the content descriptions will still reflect your questionnaire answers.” Powód z instrukcji: „if you believe your app should be rated higher”.
- 2.3.6: „Answer the age rating questions in App Store Connect honestly so that your app aligns properly with parental controls. If your app is mis-rated, customers might be surprised by what they get, or it could trigger an inquiry from government regulators.”
- Pytania o media społecznościowe: „beginning in September 2026, responses will be required when submitting new apps or updates” (news tlur8uvi).

Odpowiedzi (prawda z kodu i treści ab0bb2f; przy wątpliwości wyżej, zasada roli 3):

| Pytanie | Odpowiedź | Podstawa |
|---|---|---|
| Parental Controls, Age Assurance | nie | brak takich funkcji |
| Unrestricted Web Access | nie | linki otwierają przeglądarkę systemową (`Linking.openURL`), bez WebView w `apps/mobile` (grep 2026-11-09) |
| User-Generated Content, Social Media, Social Media Disabled for Users Under 13, Messaging and Chat | nie | bez konta, serwera i wymiany treści (`docs/architektura/prywatnosc.md:21`) |
| Advertising | nie | bez reklam (CLAUDE.md, standard marki) |
| Profanity, Horror, Alcohol/Tobacco/Drugs | None | treść pl: 0 trafień „alkohol”, „papieros”, „narkot” (grep `content/pl`) |
| Medical or Treatment Information | **Infrequent** [wątpliwość → wyżej] | ekran „Pomoc” i lekcja M12-L4: „porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego. W nagłym zagrożeniu […] dzwoń na lokalny numer alarmowy” (`content/helplines.yaml`, H-INT-2): to wskazanie pomocy, nie diagnoza, ale definicja obejmuje „emergency medical care” |
| Health or Wellness Topics | **tak** | moduł M12 „Mental game i bankroll: wariancja i tilt” (zalecenia dotyczące samokontroli) |
| Mature or Suggestive Themes | **Infrequent** [wątpliwość → wyżej] | treść mówi o grze na pieniądze poza aplikacją (bankroll, problem z hazardem) jako temacie dla dorosłych |
| Sexual Content, Graphic Sexual, wszystkie Violence | None | brak |
| Gambling | None | w aplikacji nie ma stawki ani waluty wymienialnej na pieniądze (NFR-ZGOD-001, OG-01) |
| **Simulated Gambling** | **None** | ćwiczenie pokazuje sytuację i pyta o decyzję; użytkownik niczego nie stawia, wynik to ocena i wyjaśnienie, nie wygrana ani przegrana, bez rozstrzygnięcia losem (OG-02). Brak gry z botami (F-19 NIE) i scenariuszy w 1.0 (D-305). Definicja z dnia = S-19 |
| Contests | None | brak rywalizacji między użytkownikami i rankingów; egzamin i seria są indywidualne. Gdyby recenzent uznał inaczej: „Infrequent contests” = 4+, więc kategoria się nie zmienia |
| Loot Boxes | None | brak |

Wynik z tabeli Apple: **13+** (najwyższy próg: „Infrequent medical or treatment information”). Australia: bez osobnej kategorii (żadna odpowiedź z listy AU).

| Opcja | Co wpisać | Kompromis |
|---|---|---|
| **A (rekomendacja, przyjęta wg D-296)** | odpowiedzi jak wyżej + **Override to Higher Age Rating: 18+** | grupa docelowa to dorośli (OG-04: „Grupa docelowa: dorośli (P-1–P-3), niezależnie od kategorii”); kurs dotyczy gry, która poza aplikacją jest hazardem, więc mniejsze ryzyko zarzutu promocji hazardu wśród nieletnich (2.3.6 „inquiry from government regulators”, art. 29 u.g.h. OG-07); zgodne z 64 ze 102 aplikacji nauki z 17+ (stara skala). Opisy treści dalej mówią prawdę (override ich nie zmienia). Koszt: aplikacja niewidoczna dla kont z ograniczeniem wieku < 18 (to nie grupa docelowa); możliwe dodatkowe kroki potwierdzania wieku dla 18+ w części krajów [DO SPRAWDZENIA, niżej] |
| B | odpowiedzi jak wyżej, bez override → 13+ | zasięg także 13–17 lat; w kategorii są aplikacje 4+ i 12+ (29 i 9 ze 102), więc 13+ nie odstaje; ryzyko regulacyjne i wizerunkowe przy nauce gry hazardowej przez nastolatków |
| C | Simulated Gambling „Frequent” → 18+ | odrzucone: niezgodne z definicją (brak zakładu), czyli nieprawdziwa deklaracja wbrew 2.3.6; w Brazylii A18, w Australii R 18+ także przy „Infrequent”; wyższą kategorię daje uczciwie override (A) |

**OP-18:** zamknięte dla ankiety Apple w wersji 1.0 (decyzja D-310: Simulated Gambling = None; definicja z 2026-11-09 identyczna z S-19). Czego brakuje: (1) przyjęcia przez recenzenta Apple (wynik po F2; przy pytaniu odpowiedź z faktami z `store/review-notes.md`); (2) ankiety IARC dla Google Play (poza zakresem 1.0, Google Play: nic); (3) ponownej oceny przy F-12 (scenariusze bez stosu w 1.1, D-305: ta sama odpowiedź, jeśli scenariusz nie ma stawki ani rozstrzygnięcia losem).

Otwarte do D-06 (przed wpisem w ASC, ponowny odczyt w dniu wysyłki): czy kategoria 18+ uruchamia dodatkowe potwierdzanie wieku przez Apple w części krajów (np. przepisy stanowe w US o sklepach z aplikacjami, Brazylia) i czy dotyczy to aplikacji bez treści z listy 18+ [DO SPRAWDZENIA: nie przeczytano]; jeśli tak i utrudnia zakup dorosłym, wraca wybór A/B do właściciela.

## 7. Otwarte
- Słowa kluczowe bez badania fraz (brak danych o wolumenie wyszukiwań, 0 USD): zestaw z częstości słów w nazwach 102 aplikacji konkurencji (`poker` 83, `trainer` 44, `gto` 34, `learn` 12, `preflop` 8, `odds` 8; `docs/brd/dane/konkurencja-2026-11-03.json`) [OCENA]. Poprawa po premierze: rola 11 / moduł `widocznosc-w-sklepie`.
- Kategoria główna (Education [OCENA], plan-1.0 D2): poza D-01, nie rozstrzygnięta.
- Wersje ja, zh-Hant, pt-BR, fr-FR (fr-CA = fr-FR) w `store/`, fala 2 (de-DE, es-ES, es-MX, ko, it, vi) w `docs/sklep/aso/metadane-fala2.json`: sesja AF, D-382, `docs/sklep/aso/README.md` (2026-11-09).
