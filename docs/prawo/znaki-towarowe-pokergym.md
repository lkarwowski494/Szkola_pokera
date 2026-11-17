# Znaki towarowe „PokerGym”: instrukcja sprawdzenia krok po kroku

Sesja IN, 2026-11-17 · D-1950…D-1954 (`docs/decyzje/IN.md`) · wynik: instrukcja i tabela dla właściciela, wstępne wyszukiwanie z kontenera **nie wykonane** (pkt 6).

**To nie jest porada prawna.** Dokument mówi, jak przeszukać trzy publiczne bazy i jak zapisać wynik. Nie ocenia, czy nazwa narusza czyjeś prawa. Przy każdej kolizji albo wątpliwości: konsultacja z rzecznikiem patentowym lub prawnikiem od znaków towarowych (zob. „Granica”).

Kontekst: D-378 pkt 3 (`docs/decyzje.md:290`) wstrzymuje zmianę nazwy w App Store Connect na „PokerGym: GTO Strategy Trainer” do sprawdzenia znaków; decyzja właściciela 2026-11-17 „A: najpierw znaki”. Storefronty: US (główny), JP, CA, GB, BR, FR, TW, VN, DE (CLAUDE.md, „Stan projektu”).

## 1. Co przygotować (ok. 15 min, przeglądarka komputerowa)

- Zapytania do wpisania (każde osobno, w każdej bazie, o ile baza na to pozwala):
  1. `pokergym` (jedno słowo)
  2. `poker gym` (dwa słowa)
  3. `poker-gym`
  4. `*pokergym*` (gwiazdka = dowolne znaki; łapie „PokerGyms”, „MyPokerGym”)
  5. `pokergim`, `pokerjim` (zapis fonetyczny; w TMview przez „Fuzzy search”)
  6. `gym` razem z klasą 9 / 41 / 42 (kto jeszcze używa „gym” przy nauce lub grach; tylko do wiedzy, nie do decyzji)
- Wielkość liter nie ma znaczenia (wyjątek: USPTO field tag, niżej).
- Do tabeli (rozdział 6) zapisuj: liczbę wyników, a przy każdym wyniku żywym lub podobnym: tekst znaku, właściciel, status, klasy, urząd, numer.

## 2. Które klasy nicejskie (Nice) są istotne

Aplikacja = nauka pokera (ćwiczenia, lekcje, powtórki) bez gry o pieniądze, pobierana z App Store.

| Klasa | Nagłówek (Nice, wydanie 11-2019, odczyt 2026-11-17) | Dlaczego dotyczy aplikacji |
|---|---|---|
| **9** | „…recorded and downloadable media, computer software…”; objaśnienie: „all computer programs and software regardless of recording media or means of dissemination, that is, software recorded on magnetic media or downloaded from a remote computer network” | sama aplikacja jako oprogramowanie do pobrania |
| **41** | „Education; providing of training; entertainment; sporting and cultural activities”; objaśnienie: „all forms of education of persons”, „entertainment, amusement or recreation of people” | nauka, szkolenie, rozrywka (cel produktu) |
| **42** | „Scientific and technological services and research and design relating thereto; … design and development of computer hardware and software” | usługi techniczne i oprogramowanie jako usługa; sprawdzić dla kompletu |
| **28** | „Games, toys and playthings; video game apparatus; gymnastic and sporting articles” | gry; sąsiednia klasa przy „poker” i „gym” (USPTO wiąże ją z klasą 9 jako skoordynowaną) |
| **35** | (reklama, usługi biznesowe) | tylko jako skoordynowana z 9, 28 i 41 (USPTO); nie szukać osobno, jeśli klasy 9/41/42/28 dały wynik |

- Skoordynowane klasy USPTO (źródło 6): dla klasy 9 to 10, 16, 28, 35, 38, 41, 42, 44; dla 28 to 9, 16, 20, 25, 35, 41, 42; dla 41 to 35–40, 42–45. Aplikację obejmują więc 9, 28, 35, 41, 42; reszta to zakres „na wszelki wypadek”, nie obowiązek.
- Uwaga: wydanie Nice, które udało się pobrać surowo (PDF), to 11-2019. Aktualne wydanie i aktualne brzmienie nagłówków nie zostały przeczytane (nclpub.wipo.int zwraca „Access Denied” z kontenera) `[DO USTALENIA]`. Numery klas 9/28/41/42 są stabilne od lat, ale brzmienie mogło się zmienić; kto filtruje po klasie w bazie, widzi tam aktualne nagłówki.
- Klasyfikację własnej aplikacji (które klasy zgłosić, jakie sformułowania towarów) ustala rzecznik; ten dokument służy wyłącznie do **szukania** kolizji.

## 3. Krok po kroku

### 3.1 USPTO (Stany Zjednoczone, rynek główny)

1. Otwórz https://tmsearch.uspto.gov (zalecane: zaloguj się kontem USPTO.gov; źródło 1: logowanie „helps you avoid errors when the system is handling heavy traffic”).
2. Rozwijana lista „Wordmark”, wpisz `pokergym`. Uwaga (źródło 2): kilka słów w jednym polu system traktuje jako osobne terminy, nie jako frazę („returns results that include just one of the words”). Dlatego „poker gym” szukaj przez **Field tag** (krok 3).
3. Wybierz „Field tag and Search builder” (nie wolno łączyć z rozwijanymi listami; źródło 3). Wpisz po kolei (tagi wielkimi literami, terminy małymi):
   - `CM:pokergym` oraz `CM:"poker gym"` oraz `CM:*pokergym*` oraz `CM:*poker*gym*`
   - ten sam zestaw z `AND LD:true`, aby zobaczyć tylko żywe (źródło 3: `CM:*dog* AND LD:true`); osobno `LD:false`, aby zobaczyć martwe
   - zawężenie do klas: `CM:*pokergym* AND IC:(009 028 035 041 042)`; do skoordynowanych: `CC:009`, `CC:041`
   - wieloznaczniki: `?` = jeden znak, `*` = dowolna liczba znaków, nie używać wewnątrz cudzysłowu (źródło 3)
4. Otwórz każdy wynik: ekran szczegółów pokazuje dane z TSDR (źródło 4).
5. Jeśli wyników jest za dużo: włącz „expert mode” i filtr klas skoordynowanych (źródło 5).
6. USPTO sam zaleca coś więcej niż własną bazę: Official Gazette (TMOG), rejestry stanowe, szukanie w internecie (prawo zwyczajowe), Madrid Monitor, WIPO, TMview (źródło 7). Dla naszego celu wystarczy: USPTO + TMview + WIPO + wyszukiwanie ogólne i w App Store/Google Play.

### 3.2 EUIPO / TMview (UE i wiele urzędów poza UE)

1. Otwórz https://www.tmdn.org/tmview (TMview jest wejściem EUIPO do baz krajowych; źródło 7 wymienia go jako „EUIPO … TMview, a database of trademark applications and registered trademarks from all EU national IP offices, the EUIPO, and several international partner offices outside the EU”).
2. „Quick search”, pole nazwy: `pokergym`. Domyślnie szukanie jest „po słowie” (`cola` znajdzie „coca cola”, ale nie „chocolate”); wieloznaczniki: `*` (zero lub więcej znaków), `?` (jeden znak) (źródło 8). Dlatego wpisz też `*pokergym*` i `poker gym`.
3. Zaznacz „Fuzzy search” (podobieństwo pisowni, odległość Levenshteina, źródło 8) i powtórz dla `pokergym`; „Phrase search” dla `poker gym`.
4. „Advanced search”: dodaj „Nice class” (numery po przecinku: `9,28,35,41,42`) i status.
5. Status (źródło 8): All; **Registered (R)** = „legally protected”; **Filed (A)** = wniosek w badaniu, jeszcze nie zarejestrowany; **Ended (E)** = „refused, cancelled, withdrawn etc.”; **Expired (X)** = „registration period has ended and the trade mark was not renewed”. Żywe = R i A. Martwe = E i X.
6. TMview szuka we wszystkich urzędach naraz (źródło 8: „searches can only be launched for all the offices at once”); kolumna urzędu pokaże, czy trafienie dotyczy np. DE, FR, EUIPO, a z urzędów spoza UE np. JP, GB, CA, BR, TW, VN, jeśli są w TMview. Lista urzędów w TMview `[DO USTALENIA]` (nie odczytana; sprawdź filtr „Office” w aplikacji i zapisz, których storefrontów nie ma).
7. Alternatywa/uzupełnienie: strona EUIPO „eSearch plus” (https://euipo.europa.eu) — z kontenera niedostępna (403), więc **jej opisu nie ma** w tym dokumencie.

### 3.3 WIPO Global Brand Database

1. Otwórz https://branddb.wipo.int (opis: https://www.wipo.int/en/web/global-brand-database). Baza obejmuje m.in. znaki międzynarodowe (Madryt) i znaki z uczestniczących urzędów krajowych; szukać można „keywords, names, numbers, goods and services and image similarity” (źródło 9). Strona może najpierw pokazać widżet weryfikacji („Altcha”): rozwiąż go w przeglądarce zwykłym kliknięciem.
2. Wybierz wyszukiwanie po „Brand” (nazwa znaku): `pokergym`, potem `poker gym`; filtruj po klasie Nice 9, 28, 35, 41, 42 i po statusie.
3. Szczegółów interfejsu (nazwy pól, wartości statusów) **nie odczytano** z kontenera (strona wymaga przeglądarki); wartości statusów zapisz dosłownie z ekranu, na podstawie ich nazw oceń: „aktywny / zarejestrowany / oczekujący” = żywy, „wygasły / wycofany / odmowa” = martwy. Wątpliwy status = potraktuj jako żywy.
4. WIPO sam zastrzega (źródło 9): baza nie obejmuje wszystkiego („it may be prudent to search also the registers of national/regional intellectual property offices. You may also consult a trademark attorney”).

### 3.4 Uzupełnienie (2 min)

- App Store (US, GB, DE, JP) i Google Play: wyszukaj „PokerGym” i „poker gym”; zapisz aplikacje o tej nazwie (dostępność nazwy sprawdzono częściowo przez iTunes Search API 2026-11-09, D-378, D-382).
- Wyszukiwarka internetowa: `"pokergym"`, `"poker gym"` (prawo zwyczajowe, źródło 7).

## 4. Jak odczytać wynik

| Pytanie | Jak odpowiedzieć |
|---|---|
| Żywy czy wygasły? | USPTO: filtr/`LD:true` = żywy, `LD:false` = martwy (źródło 3). TMview: R i A = żywy; E i X = martwy (źródło 8). WIPO: nazwy statusów z ekranu (3.3 pkt 3). |
| Identyczny czy podobny? | Znaki mogą być „confusingly similar” także, gdy nie są identyczne: podobne w brzmieniu, wyglądzie lub znaczeniu (źródło 10). Dla „PokerGym” podobne to m.in. „Poker Gym”, „PokerGYM”, „Poker-Gym”, „PokerJim”, „PokerGyms”, „Pokergym Pro”. Zapisz każdy taki znak. |
| Czy towary/usługi pokrewne? | Pokrewne mogą być towary „identical, similar or competitive; used together; used by the same purchasers; advertised together; or sold by the same manufacturer or dealer” (źródło 10). Ten sam napis dla „Dove soap and Dove ice cream bars” może współistnieć. Dla nas: klasy 9, 28, 41, 42 (i 35 jako skoordynowana) uznaj za pokrewne; klasa zupełnie inna (np. 3, 29, 30) wymaga oceny rzecznika, nie właściciela. |
| Która klasa? | Kolumna „Class”/„Nice class” (USPTO: International class). Zapisz wszystkie klasy znaku. |
| Kto jest właścicielem i kraj? | Zapisz; znak innego kraju niż nasze storefronty też notuj (rząd „kraj” w tabeli). |

## 5. Wstępne wyszukiwanie z kontenera [OCENA, do potwierdzenia przez właściciela]

**Nie wykonano.** Co sprawdziłem 2026-11-17 i dlaczego nie da się przeszukać z kontenera:

- USPTO `tmsearch.uspto.gov`: strona ładuje się (HTTP 200), ale to aplikacja przeglądarkowa; zapytań nie ma jak wpisać bez przeglądarki. Próbę bezpośredniego wywołania wewnętrznego interfejsu API zablokował klasyfikator uprawnień sesji; nie obchodziłem go (to nieudokumentowany interfejs).
- WIPO `branddb.wipo.int`: strona zwraca widżet weryfikacji (Altcha); nie obchodzę go.
- TMview `tmdn.org/tmview`: aplikacja przeglądarkowa (odpowiedź 531 B); plik pomocy odczytany, wyszukiwanie niewykonalne.
- EUIPO `euipo.europa.eu`: HTTP 403 / pusta odpowiedź.
- Nice `nclpub.wipo.int`: „Access Denied”; użyto starszego wydania PDF (2019).

Wynik: **czego nie dało się sprawdzić: wszystkiego, co jest w tabeli rozdziału 6.** Jedyne wstępne ustalenie z wcześniejszych sesji: brak aplikacji „PokerGym” w App Store (US/GB/DE/JP), D-378/D-382 (częściowe, nie zastępuje rejestrów).

## 6. Tabela do wypełnienia przez właściciela

Data wykonania: ____ · wykonał: właściciel · przeglądarka: ____

| Urząd | Zapytanie | Filtr (klasy, status) | Liczba wyników (żywych / martwych) | Uwagi (znak, właściciel, klasa, status, kraj) |
|---|---|---|---|---|
| USPTO | `CM:pokergym` | wszystkie | | |
| USPTO | `CM:"poker gym"` | wszystkie | | |
| USPTO | `CM:*pokergym*` AND IC:(009 028 035 041 042) | żywe | | |
| USPTO | `CM:*poker*gym*` | żywe | | |
| USPTO | `CM:pokerjim` lub `CM:pokergim` | żywe | | |
| TMview | `pokergym` (Quick) | All | | |
| TMview | `*pokergym*` | klasy 9,28,35,41,42 | | |
| TMview | `poker gym` (Phrase) | All | | |
| TMview | `pokergym` + Fuzzy | R, A | | |
| WIPO GBD | `pokergym` | klasy 9,28,35,41,42 | | |
| WIPO GBD | `poker gym` | wszystkie | | |
| App Store / Google Play / internet | „PokerGym”, „poker gym” | — | | |

Do notatek dodatkowo: czy w TMview/WIPO widać urzędy: JP, CA, GB, BR, FR, DE, TW, VN (tak/nie, które).

## 7. Reguła decyzyjna

- **CZYSTO, zmieniamy nazwę w ASC** (D-378 pkt 3 spełniony), gdy jednocześnie: (a) wszystkie wiersze tabeli rozdziału 6 wypełnione, trzy bazy (USPTO, TMview, WIPO) rzeczywiście przeszukane; (b) brak **żywego** znaku identycznego lub podobnego (rozdz. 4) w klasach 9, 28, 35, 41, 42; (c) znaki martwe (E, X, `LD:false`) tylko zapisane w uwagach, nie blokują.
- **ZATRZYMAJ, pytanie do koordynatora** (z kopią tabeli), gdy zachodzi którykolwiek z warunków: żywy znak identyczny lub podobny w klasach 9, 28, 35, 41, 42 (każdy kraj); żywy identyczny znak w innej klasie (ocena pokrewności, rozdz. 4, należy do rzecznika); jakakolwiek baza niedostępna albo niewypełniona (brak wyniku nie znaczy „czysto”); wątpliwy status (traktuj jako żywy); wynik nieczytelny. Koordynator przedstawia właścicielowi opcje (np. konsultacja przed zmianą nazwy, wariant nazwy) z rekomendacją.
- Granica: przy **każdej** kolizji, a także gdy właściciel chce ocenić „czy to nam szkodzi”: konsultacja z rzecznikiem patentowym lub prawnikiem. Wynik „czysto” znaczy tylko „te trzy bazy z dnia sprawdzenia nie pokazały konfliktu”; nie jest opinią o prawie do nazwy, nie obejmuje znaków niezarejestrowanych (prawo zwyczajowe) ani urzędów spoza trzech baz, ani oceny, czy „PokerGym” jest nazwą opisową (rozdzielność od zwykłych słów „poker” i „gym”).
- Zapis: wypełnioną tabelę i decyzję (czysto/zatrzymaj) właściciel lub koordynator wpisuje do `docs/decyzje.md` z datą (D-378 pkt 3).

## 8. Źródła (odczyt 2026-11-17; adres + cytat; surowy tekst przez `curl`/`pdftotext`, chyba że zaznaczono)

1. https://www.uspto.gov/trademarks/search — „Log into your USPTO.gov account for a better search experience. Logging in using the Sign in link in the top right corner helps you avoid errors when the system is handling heavy traffic.” Lista: „Likelihood of confusion”, „Using coordinated classes”, „Comprehensive clearance search”, „Field tag searching handout”.
2. https://www.uspto.gov/sites/default/files/documents/TM-FederalTrademarkSearching-GettingStarted-handout.pdf — „You can include more than one word on the search line, but the system will not treat it as a phrase. Instead, the system treats each word as a search term and returns results that include just one of the words.” oraz „You can use the checkboxes on the left to filter live and dead cases.”
3. https://www.uspto.gov/sites/default/files/documents/TM-FederalTrademarkSearching-FieldTags-handout.pdf — „Field tags must be in all caps, followed by a colon. Search terms must be in lowercase.”; „LD: Live/dead indicator LD:true or LD:false”; „CC: Coordinated class”; „IC: International class”; „? Returns one instance of any character except space”; „* Returns infinite instances of any character except space”; „You cannot combine field tag searching with drop-down searching.”; przykład `CM:*dog* AND LD:true`.
4. https://www.uspto.gov/trademarks/search/trademark-search-system-updates — „This feature shows more information about a trademark when you open a search result without needing to go to the Trademark Status and Documents (TSDR) system.”
5. https://www.uspto.gov/trademarks/search/using-coordinated-classes-your-federal-trademark-search — „If you’re doing a federal trademark search, coordinated classes are a tool that can help you find trademarks with goods and services that may be related to yours.”; „You must be in expert mode to use this filter.” Lista: „009 Electrical and scientific apparatus International classes 010 … 028 Toys and sporting goods 035 … 038 … 041 Education and entertainment services 042 … 044”.
6. Ta sama strona (5): „028 Toys and sporting goods International classes 009 … 016 … 020 … 025 … 035 … 041 … 042”; „041 Education and entertainment services International classes 035 … 036 … 037 … 038 … 039 … 040 … 042 … 043 … 044 … 045”.
7. https://www.uspto.gov/trademarks/search/comprehensive-clearance-search-similar-trademarks — „A comprehensive clearance search means checking a variety of resources to determine whether your trademark conflicts with other existing trademarks.”; „We also recommend you search for common-law use of the trademark by others.”; „At a minimum, be sure to check our database and the TMOG for federal applications and registrations, and also search the internet for common-law use.”; lista „Madrid Monitor”, „Global Brand Database”, „EUIPO … TMview, a database of trademark applications and registered trademarks from all EU national IP offices, the EUIPO, and several international partner offices outside the EU”; „An attorney can provide a clearance search and interpret the search results”.
8. https://www.tmdn.org/static/tmdsview/tmview/helpFiles/en/help.html (pomoc TMview) — „The default is a search by word or name, i.e. input is: 'cola', results is 'coca cola' or 'cola flavoured' but not 'chocolate'.”; „The asterisk (*) substitutes zero or more characters.”; „The question mark (?) substitutes only one character”; „Tick the check box Fuzzy search to search for trade marks that are similar in spelling. The TMview fuzzy search is based on the Levenshtein distance”; „Registered (R): The trade mark is legally protected. Filed (A): The trade mark is still an application … Ended (E): The trade mark has been refused, cancelled, withdrawn etc. Expired (X): The registration period has ended and the trade mark was not renewed.”; „Search by Nice class One or more classes, separated by commas, may be specified using class numbers.”; „Because searches can only be launched for all the offices at once”.
9. https://www.wipo.int/en/web/global-brand-database — „You can search those collections using keywords, names, numbers, goods and services and image similarity and/or a combination of those.”; „Although the Global Brand Database covers a number of large trademark collections, it may be prudent to search also the registers of national/regional intellectual property offices. You may also consult a trademark attorney.”
10. https://www.uspto.gov/trademarks/search/likelihood-confusion — „Trademarks don’t have to be identical to be confusingly similar. Instead, they could just be similar in sound, appearance, or meaning, or could create a similar commercial impression.”; „Goods or services could be related if they are identical, similar or competitive; used together; used by the same purchasers; advertised together; or sold by the same manufacturer or dealer.”; „This is how identical trademarks with different owners can be registered for Dove soap and Dove ice cream bars”.
11. https://www.wipo.int/classifications/data/nice/ITSupport_and_download_area/20190101/revision_files/ncl-20190101-E-revision_file.pdf („Nice Classification (11th Edition – Version 2019)”) — nagłówki klas 9, 28, 41, 42 i objaśnienia klas 9 i 41 jak w rozdz. 2 (linie PDF po `pdftotext`: 38–50, 113, 143–144, 540–545, 1800–1805). Brzmienie ostatnie nieznane `[DO USTALENIA]`.
12. Nieprzeczytane (blokada z kontenera): euipo.europa.eu (403), nclpub.wipo.int (Access Denied), interfejsy wyszukiwania USPTO/WIPO/TMview (aplikacje przeglądarkowe, weryfikacja Altcha).

## 9. Otwarte pytania

- `[DO USTALENIA]` aktualne wydanie Nice i brzmienie nagłówków 9/28/41/42.
- `[DO USTALENIA]` które z urzędów JP, CA, GB, BR, FR, DE, TW, VN są w TMview/WIPO GBD (filtr „Office”).
- `[DO USTALENIA]` nazwy statusów w WIPO GBD (nieodczytane).
- Czy „PokerGym” jest nazwą opisową („poker” + „gym”), ocena rzecznika; poza zakresem tego dokumentu.
