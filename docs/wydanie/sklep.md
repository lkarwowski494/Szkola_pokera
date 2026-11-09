# Sklep: tekst strony produktu, notatki dla recenzenta, kategoria wiekowa (rola 10, E2)

Stan: 2026-11-09, sesja M (tylko dokumenty), commit wejściowy ab0bb2f. Zadania D-01 i D-02 z `docs/wydanie/plan-1.0.md` §4.2. Tryb samodzielny D-296: pytania produktowe rozstrzygnięte rekomendacją jako A „przyjęta wg D-296”, do weta.

**Wyjątek nazwany (prompt roli):** `node tools/assemble.mjs 10-wydanie --tryb build` odrzucony przez klasyfikator trybu auto. Pliki roli przeczytane bezpośrednio z klonu `lkarwowski494/prompts` (c025063): `role/10-wydanie/rdzen.md`, `moduly/metadane-i-zrzuty.md`, `moduly/recenzja-i-odrzucenia.md`, `moduly/prywatnosc-i-formularze.md`. Ryzyko: brak części wspólnych, które dokleja assemble (zasady wspólne, `srodowisko.md`). Tańsza kontrola: zasady wspólne cytowane w rdzeniu (12, 13, 14, 16) zastosowane wprost; pozostałe moduły roli (`potok-i-podpis`, `opis-wydania`, `widocznosc-w-sklepie`) nie dotyczą D-01/D-02.

**Wynik w skrócie**
- Pliki: `store/app-store-metadata.json` (pl, en-US; en-GB/CA/AU = en-US), `store/review-notes.md` (notatki en do wklejenia, pl dla właściciela). Miejsce `store/` jak w Treningu (D-309).
- Nazwa en: **„Poker School: Learn Strategy”** (28 znaków). W App Store nie znaleziono aplikacji o nazwie „Poker School” (§5).
- Kontrola tekstu: `docs/wydanie/dowody/metadane-2026-11-09.txt`, **kod 0** (limity, bajty, brak nazw konkurencji i marek, brak cen i obietnicy wygranej).
- Kategoria wiekowa (D-02): §6; OP-18 częściowo zamknięte.
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

Skrypt jest w `docs/` (pas dokumentów). Test w CI jak Trening `tests/store-metadata.test.ts` to praca pasa kodu przy K-11 (zgłoszenie do 08).

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

## 6. Kategoria wiekowa (D-02)

Uzupełnienie w następnym commicie.

## 7. Otwarte
- Słowa kluczowe bez badania fraz (brak danych o wolumenie wyszukiwań, 0 USD): zestaw z częstości słów w nazwach 102 aplikacji konkurencji (`poker` 83, `trainer` 44, `gto` 34, `learn` 12, `preflop` 8, `odds` 8; `docs/brd/dane/konkurencja-2026-11-03.json`) [OCENA]. Poprawa po premierze: rola 11 / moduł `widocznosc-w-sklepie`.
- Kategoria główna (Education [OCENA], plan-1.0 D2): poza D-01, nie rozstrzygnięta.
- Wersje ja, pt-BR, fr-FR, fr-CA, zh-Hant: przekład przez API w K-04 (rola 09).
