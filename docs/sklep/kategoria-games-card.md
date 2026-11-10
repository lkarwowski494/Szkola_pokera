# Kategoria Education + Games/Card: sprawdzenie u źródła i krok ręczny

Stan: 2026-11-10, sesja AM (rola 10, tryb build). Decyzja: D-395 (właściciel 2026-11-10, weto D-360): Primary = Education, Secondary = Games, podkategoria Games = Card. Strony Apple czytane 2026-11-10 jako surowy HTML (`curl`), cytaty dosłowne z tekstu strony (numer linii dotyczy tekstu po usunięciu znaczników, nie zapisanego w repo).

## 1. Wynik w skrócie

| Pytanie | Wynik | Podstawa |
|---|---|---|
| Czy kategoria dodatkowa Games zmienia ankietę wiekową (D-310, D-362: Simulated Gambling = None, 13+ z tabeli, ręcznie 18+)? | **Nie.** Ankieta pyta o treści i możliwości, nie o kategorię; kategoria nie jest jej wejściem. Jedyne powiązanie: pole Korea (RCN) pojawia się przy Games/Entertainment z oceną 17+, a wymagane jest tylko przy „Frequent/Intense” (u nas None) | AI-1, AI-2, AR-1 |
| Czy zmienia wytyczne o hazardzie symulowanym? | **Nie.** 5.3.4 dotyczy gry za prawdziwe pieniądze („real money gaming (such as … poker …)”); nasza aplikacja nie ma stawek. Definicja ankiety („Betting or wagering without using real money …”) liczy się za treść, nie za kategorię | GL-1, AR-1 |
| Czy zmienia notatki dla recenzenta? | **Treść notatek: nie** (`store/review-notes.en.txt` nie zawiera „not a game”). **Opis w sklepie: tak, ryzyko** — `store/app-store-metadata.json:22` (en) mówi „It is a course, not a game”, a kategoria Games/Card mówi coś przeciwnego (patrz §3) | plik repo, GL-1 (2.3.5) |
| Czy podkategorię Games ustawia się ręcznie w ASC? | **Tak, w App Information** (Apple: „you can also select one or two subcategories”); to pole opcjonalne („can”), nie wymagane — poprawka względem D-360, która pisała „Games wymaga podkategorii” | AI-1, KAT-1 |

## 2. Źródła (odczyt 2026-11-10)

| ID | Adres | Cytat |
|---|---|---|
| KAT-1 | developer.apple.com/app-store/categories/ | „You can assign two categories to your app — a primary and a secondary category.” · „Apps and games with Entertainment or Games selected as a primary or secondary category in App Store Connect will appear in the corresponding Time Allowance category.” · „If your app is a game, you can choose up to two Games subcategories.” · Games: „Apps that provide single or multiplayer interactive activities for entertainment purposes. For example: action, adventure, board, card, family …” · „Make sure that the category you choose accurately reflects your app’s core experience. Choosing categories that are not appropriate for your app is against the App Review Guidelines.” |
| AI-1 | developer.apple.com/help/app-store-connect/reference/app-information | „Category (Primary and Secondary): The categories that best describe your app.” · „Subcategory: If you select Games or Stickers as the Primary or Secondary Category, you can also select one or two subcategories to help more accurately define your game or stickers app.” · Korea: „Apps in the Casino subcategory with age rating 17+ … Apps in the Games or Entertainment categories with a Frequent/Intense level of frequency in at least one of the following content descriptions: Simulated Gambling …” · „this field will display if your app is in the Games or Entertainment category with a rating of 17+, but is only required if your app meets the above criteria.” · Chiny: „games must secure an approval number” |
| AI-2 | developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/ | „In Apps, select the app you want to view. In the sidebar, under General, click App Information.” · „Below Age Ratings, click the Set Up Age Ratings button.” · „To determine the age rating of your app, respond to the age rating questionnaire … content descriptors, in-app controls, and capabilities” (brak kategorii wśród wejść) |
| AR-1 | developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/ | „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.” · „Apps and games with Frequent or Intense simulated gambling content are only available on the App Store in Korea if you provide a Rating Classification Number (RCN).” |
| GL-1 | developer.apple.com/app-store/review/guidelines/ (Last Updated: October 16, 2026) | 2.3.5: „Select the most appropriate category for your app … If you’re way off base, we may change the category for you.” · 2.3.6: „Answer the age rating questions in App Store Connect honestly …” · 5.3.4: „Apps that offer real money gaming (such as sports betting, poker, casino games, horse racing) or lotteries must have necessary licensing …” |

Nie odczytano: osobnej strony pomocy „wybór kategorii w ASC” (adres `…/manage-app-information/select-an-app-category-and-subcategory/` zwraca pustą stronę bez treści), więc nazwy rozwijanych list i przycisków w interfejsie są `[DO USTALENIA]` (patrz §4).

## 3. Ryzyka i skutki kategorii Games

1. **Sprzeczność komunikatu (ryzyko rzeczywiste, ŚREDNIE).** Opis en (`store/app-store-metadata.json:22`): „It is a course, not a game: there are no stakes, no chips to win and no real-money play.” Strona produktu pokaże Games/Card obok zdania „not a game”. Wytyczna 2.3.5 daje Apple prawo do zmiany kategorii („we may change the category for you”), nie do odrzucenia, ale recenzent może zapytać; 2.3 wymaga, by metadane „accurately reflect the app’s core experience”. Zdanie jest też prawdziwe (brak stawek), więc nie jest fałszem, tylko tonem sprzecznym z półką. Rozstrzygnięte: właściciel wybrał przeformułowanie (D-396), zdanie zmienione w 11 lokalizacjach.
2. **Czas przed ekranem.** Games jako kategoria dodatkowa zalicza aplikację do kategorii limitu czasu „Games” (KAT-1). Skutek dla użytkownika z limitem na gry; przy ocenie 18+ rzadko istotny. Informacja, nie bloker.
3. **Korea i Chiny.** Pole RCN pojawi się w ASC (Games + ocena 17+), ale jest wymagane tylko przy „Frequent/Intense” hazardzie symulowanym; u nas None, a KOR i CHN są poza listą 166 storefrontów (D-362). Gdyby je kiedyś włączyć: Chiny wymagają dla gier numeru zatwierdzenia (AI-1), do sprawdzenia przed włączeniem.
4. **Ankieta wiekowa bez zmian.** Simulated Gambling = None zostaje prawdziwe niezależnie od kategorii. Sama kategoria Games nie jest sygnałem hazardu w ankiecie; tytuł „Card” to gatunek.
5. **Wzorzec rynku (LK-1, `docs/sklep/dowody/kategorie-konkurencji-2026-11-09.json`):** Poker Trainer – Learn Poker ma Education + Games/Card/Casino; Casino nie wybieramy (KOR: „Apps in the Casino subcategory with age rating 17+” wymaga RCN).

## 4. Krok ręczny właściciela w App Store Connect (nie wykonuje go agent)

Zapis w ASC tylko właściciel. Ścieżka dojścia z przeczytanej strony AI-2: Apps → wybierz aplikację → pasek boczny, sekcja General → **App Information**. Dalej, wg AI-1, są tam pola **Category (Primary and Secondary)** i **Subcategory**.

1. Wejdź w App Information (jak wyżej).
2. Primary Category = **Education** (już ustawione; nie zmieniaj).
3. Secondary Category = **Games**.
4. Subcategory (pojawia się po wyborze Games, AI-1) = **Card**; drugiej podkategorii nie wybieraj (Casino nie: patrz §3 pkt 5).
5. Zapisz (przycisk zapisu strony; nazwa przycisku `[DO USTALENIA]`, strony pomocy nie odczytano).
6. Nie zmieniaj ankiety wiekowej ani notatek dla recenzenta.
7. Kontrola po zapisie: uruchom workflow `asc-kontrola` (ref `claude/sleepy-brahmagupta-2065nu`). Oczekiwane: `kategoria` OK (EDUCATION + GAMES). Id `GAMES` dla `secondaryCategory` to założenie z konwencji API (narzędzie czyta `relationships.secondaryCategory.data.id`, `apps4brew-narzedzia` `asc-kontrola/kontekst.mjs`, SHA 43afe81, odczyt 2026-11-10) `[DO USTALENIA: potwierdzi pierwszy przebieg]`; podkategorii narzędzie nie porównuje.
8. Czas: ok. 2 min.

## 5. Otwarte

- Zdanie „not a game”: rozstrzygnięte (D-396). Zmiana metadanych dotrze do ASC dopiero po `metadane.mjs --zapis` (krok właściciela); fala 2 dopiero po dopisaniu kodów do LOCALE_MAP.
- Nazwy elementów interfejsu ASC i id `GAMES` (patrz wyżej) — do potwierdzenia przy kroku ręcznym.
