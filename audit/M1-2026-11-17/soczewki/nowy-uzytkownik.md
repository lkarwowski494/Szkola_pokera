# Soczewka: nowy użytkownik w pierwszym tygodniu

Perspektywa: początkujący gracz rekreacyjny w USA, bez instrukcji, chce nauczyć się pokera bez ryzyka pieniędzy.
Data odczytu wszystkich źródeł: 2026-11-17 (curl, surowy tekst; recenzje z JSON w `serialized-server-data` strony App Store, metadane z iTunes Lookup API).

## Alternatywy przeczytane (App Store US)

| Aplikacja | ID | Ocena (liczba) | Wiek | Języki | Ceny zakupów w aplikacji |
|---|---|---|---|---|---|
| Poker Trainer - Learn Poker (SweDevIT AB) | 6478522482 | 4,75 (1182) | 17+, „Frequent/Intense Simulated Gambling” | EN | tydzień 6,99; miesiąc 14,99; rok 59,99–89,99; dożywotni 269,99 USD |
| GTO Preflop Wizard Poker AI (Heater LLC) | 6590603158 | 4,76 (3492) | 12+, „Infrequent/Mild Simulated Gambling” | EN | tydzień 6,99; miesiąc 19,99–29,99; 3 mies. 49,99–64,99; rok 89,99–129,99 USD |
| Poker Skill - Learn Holdem (Funco Inc.) | 6748104711 | 4,72 (527) | 4+ | EN, FR, DE, IT, JA, KO, PT, ES | miesiąc 9,99–14,99; rok 64,99–99,99 USD |

Źródła: https://itunes.apple.com/lookup?id=6478522482,6748104711,6590603158&country=us oraz https://apps.apple.com/us/app/id<ID> (sekcja „In-App Purchases”, „App Privacy”) i https://apps.apple.com/us/app/id<ID>?see-all=reviews. Pominięto Handly (6761502652): widoczne recenzje mają powtarzalny, szablonowy tekst („More active than watching videos … Making the choice myself has helped the lessons stay with me.”), więc nie są wiarygodnym dowodem.

## Co musi być prawdą (15 punktów)

### 1. Pierwsza sesja: decyzja z oceną w ciągu pierwszych minut, bez konfiguracji
Obszar: **przepływ**
Nowy użytkownik musi od razu wykonać prawdziwe zadanie (lekcja albo ćwiczenie) bez konta, ankiety ustawień czy wyboru parametrów; test plasujący jest opcjonalny i da się go pominąć.
- Apple HIG, Onboarding, https://developer.apple.com/tutorials/data/design/human-interface-guidelines/onboarding.json: „Teach through interactivity. People tend to grasp and retain information better when they can actually perform the task they’re learning about instead of just viewing instructional material.” oraz „Postpone nonessential setup flows or customization steps. Provide reasonable default settings so most people can immediately start interacting”.
- Poker Trainer, recenzja 3★ z 2026-06-23 (https://apps.apple.com/us/app/id6478522482?see-all=reviews): „I’m trying to learn but I’m spending most of the time figuring out how to set up my parameters.”
- Ta sama strona, 5★ z 2024-07-16: „A little overwhelming for a beginner, but it's got everything”.

### 2. Ścieżka od zera: najpierw karty i układy, potem pojęcia po kolei
Obszar: **treść**
Kurs musi zaczynać się od absolutnych podstaw (kolory, starszeństwo kart, układy) i wprowadzać jedno pojęcie naraz; test plasujący nie może wrzucić początkującego za daleko.
- Poker Skill, opis w sklepie (lookup): „Is it good for beginners? Yes. The first lesson starts with the cards.”
- Poker Skill, recenzja 5★ z 2025-11-21 (https://apps.apple.com/us/app/id6748104711?see-all=reviews): „a challenge tree that actually teaches (even beginners) the basics to not just poker but the cards too regarding suits and the meaning of each card.”
- GTO Preflop Wizard, recenzja 1★ z 2025-03-30 (https://apps.apple.com/us/app/id6590603158?see-all=reviews): „It doesn’t lay out a curriculum and introduce ideas to you slowly. It just runs you through scenarios and tells you if you are right or wrong.”

### 3. Każda ocena mówi „dlaczego”, z liczbami
Obszar: **treść**
Ocena bez wyjaśnienia to główny powód złych recenzji trenera; wyjaśnienie z liczbami (pot odds, equity) przy każdej odpowiedzi, także poprawnej, musi być domyślnie widoczne, nie za dodatkową opłatą.
- GTO Preflop Wizard, 1★ z 2025-03-30: „it doesn’t explain any of its logic … Doesn’t tell you why.”
- GTO Preflop Wizard, 4★ z 2025-02-24: „I feel that there should be explanations for your mistakes and not just a mock playing model.”
- Poker Skill, opis: „Get one wrong and you see the better play, and why”.

### 4. Ocena poprawna w kontekście: głębokość stosu, typ gry, ręce mieszane, zgłoszenie błędu
Obszar: **treść**
Każde rozdanie musi pokazywać założenia (cash czy turniej, stos w BB, pozycje), ręka mieszana nie może być oceniana jako błąd, a użytkownik musi móc zgłosić podejrzaną ocenę z poziomu ćwiczenia (bez konta, np. e-mailem z identyfikatorem ćwiczenia).
- Poker Trainer, 2★ z 2026-02-23: „with 100BB, in UTG+1, facing an UTG open, one may call sometimes with pocket 9s; this app demands a fold in that spot.”
- Poker Trainer, 3★ z 2026-01-27, tytuł: „Some of the decisions are questionable”.
- GTO Preflop Wizard, 4★ z 2024-10-17: „the “Crazy Mode” doesn’t really specify if you’re supposed to be making tournament range decisions or cash game range decisions.”
- GTO Preflop Wizard, 1★ z 2025-01-23: „the ability to submit feedback and report box in app feature is broken.”

### 5. Powtórki rozłożone w czasie i aktywne przypominanie, nie ponowne czytanie
Obszar: **przepływ**
Powtórki muszą wracać do błędów po odstępach i wymagać odpowiedzi (test), a nie pokazywać ponownie lekcję. To standard kategorii, nie wyróżnik.
- Roediger, Karpicke, „Test-enhanced learning”, Psychol Sci 2006, https://pubmed.ncbi.nlm.nih.gov/16507066/ (abstrakt przez eutils): „on the delayed tests, prior testing produced substantially greater retention than studying, even though repeated studying increased students' confidence”.
- Cepeda i in., Psychol Bull 2006, https://pubmed.ncbi.nlm.nih.gov/16719566/: „the ISI producing maximal retention increased as retention interval increased.”
- Poker Trainer, opis: „revisit common mistakes over time with spaced repetition.”

### 6. Krótka sesja dzienna, która daje poczucie postępu
Obszar: **wzrost**
Codzienna porcja musi mieścić się w 2–10 minutach i kończyć widocznym postępem (seria, ukończona lekcja); użytkownicy porównują kategorię do Duolingo i tego oczekują.
- GTO Preflop Wizard, 5★ z 2024-08-10, tytuł „Duolingo meets poker”: „keeping me motivated to study even if it’s only 2 minutes a day!”
- Poker Skill, 5★ z 2025-12-31, tytuł: „It really is Duolingo for poker”.
- GTO Preflop Wizard, 5★ z 2025-03-19: „The drills are quick and chill usually 5-10 mins”.

### 7. Darmowy limit przewidywalny i opisany z góry; blokada dopiero po realnej wartości
Obszar: **pieniądze**
Użytkownik musi przed pierwszym ćwiczeniem wiedzieć, co jest darmowe („lekcje”), co liczy się jako „jedna aktywność dziennie” i kiedy limit się odnawia; nie może trafić na blokadę w środku ścieżki dla początkujących bez wcześniejszej zapowiedzi.
- Poker Skill, 5★ z 2026-02-23: „To get through the first 2 sections and then be locked out was really disheartening”.
- Poker Skill, 5★ z 2026-02-20: „Not sure how long it takes to get more energy on the free option”; odpowiedź twórcy pod recenzją: „we've got an update coming very soon that should make the free experience feel a lot more generous.”
- Poker Trainer, 5★ z 2024-07-16: „doesn't require you to pay before you can look at it.”

### 8. Cena jawna i niska widocznie przed zakupem; bez pułapek okresu próbnego
Obszar: **pieniądze**
Konkurencja kosztuje 59,99–129,99 USD rocznie i 269,99 USD dożywotnio; cena PokerGym (14,99 rok, 19,99 dożywotnio) jest wyróżnikiem tylko wtedy, gdy paywall jasno pokazuje, co się dostaje, i nie ma automatycznego przejścia z próby w drogi plan.
- Ceny alternatyw: tabela wyżej (strony aplikacji, sekcja „In-App Purchases”).
- Poker Trainer, 1★ z 2025-07-30: „I was charged 60 bucks for a year long subscription. They denied my refund.”
- GTO Preflop Wizard, 1★ z 2025-03-30: „The trainer would be great if it was a dollar.”
- App Review Guidelines 3.1.2(c), https://developer.apple.com/app-store/review/guidelines/: „Before asking a customer to subscribe, you should clearly describe what the user will get for the price.” Oraz 3.1.2: „apps that attempt to trick users into purchasing a subscription under false pretenses or engage in bait-and-switch and scam practices; these will be removed”.

### 9. Zakup działa na każdym urządzeniu i da się go przywrócić; subskrypcja daje stałą wartość
Obszar: **wydanie**
Bez konta jedynym nośnikiem uprawnień jest Apple ID: przycisk „Przywróć zakupy”, dożywotni zakup jako nieodnawialny, subskrypcja uzasadniona ciągłą wartością (np. nowe rozdania i powtórki).
- App Review Guidelines 3.1.2(a): „you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices.”
- App Review Guidelines 3.1.1: „you should make sure you have a restore mechanism for any restorable in-app purchases.”

### 10. Postęp bez konta i offline, przenośny między telefonami
Obszar: **dane**
Bez konta zmiana telefonu albo reinstalacja nie może kasować postępu: eksport i import muszą być łatwe do znalezienia i działać na nowym urządzeniu; aplikacja musi działać w trybie samolotowym od pierwszego uruchomienia.
- App Review Guidelines 5.1.1(v): „If your app doesn’t include significant account-based features, let people use it without a login.”
- Apple HIG, Onboarding: „Don’t let large downloads hinder onboarding. People want to start using your app or game immediately after first launching it”.
- Konkurencja deklaruje offline: Poker Trainer „Practice online or offline, at your own pace.”; GTO Preflop Wizard „Offline Practice: Train anytime, anywhere without needing an internet connection.”

### 11. Etykieta prywatności „Data Not Collected” jest prawdziwa i widoczna
Obszar: **prywatność**
Brak śledzenia jest realnym wyróżnikiem w kategorii, ale tylko gdy etykieta w sklepie i binarka (brak SDK analityki i reklam) się zgadzają.
- GTO Preflop Wizard, „App Privacy” (https://apps.apple.com/us/app/id6590603158): „Data Used to Track You … Identifiers … Other Data”; „Third-Party Advertising … Device ID”.
- Poker Skill, „App Privacy” (https://apps.apple.com/us/app/id6748104711): „Data Used to Track You … Identifiers”; „Data Linked to You … Email Address Name Phone Number”.
- Poker Trainer, „App Privacy”: „Data Not Linked to You … Analytics … Usage Data”.

### 12. Kategoria wiekowa świadomie dobrana i spójna z „bez żetonów”
Obszar: **wydanie**
Odpowiedź na pytanie o „Simulated Gambling” w kwestionariuszu musi być uczciwa i uzasadniona: od niej zależy, czy aplikację zobaczy nastolatek, i jak będzie oznaczona w BR i AU. Konkurenci odpowiadają różnie (17+, 12+, 4+), więc to decyzja, nie formalność.
- Apple, Age ratings values and definitions, https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.”; w nowych ocenach: 16+ „Chance-Based Activities: Infrequent simulated gambling”, 18+ „Frequent simulated gambling”.
- Ta sama strona, Australia: „R 18+ Apps that contain: Chance-Based Activities: Infrequent simulated gambling”; Brazylia: „A18 Apps that contain: … Frequent simulated gambling”.
- Ratingi alternatyw: tabela wyżej (`contentAdvisoryRating`, `advisories` z lookup).

### 13. Ekran pomocy w problemie hazardowym z aktualnym numerem dla USA i każdego rynku
Obszar: **treść**
Numer i kanały pomocy muszą być aktualne; krajowa infolinia NCPG działa dziś pod marką 1-800-MY-RESET (połączenie, SMS, czat). Dla JP, CA, GB, BR, FR, TW, VN, DE potrzebne osobne, sprawdzone kontakty.
- NCPG, https://1800gamblerchat.org/: „Call. 1-800-MY-RESET Text. 1-800-MY-RESET Chat. Chat Online” oraz „FREE, CONFIDENTIAL AND AVAILABLE 24/7. WORKS IN ALL 50 STATES.”; regulamin SMS na tej stronie wymienia też numery „1-800-522-4700 or 1-800-697-3738”.
- Strona ncpgambling.org/help-treatment/ zwróciła blokadę Cloudflare przy curl; numer potwierdzony na stronie czatu NCPG wyżej.

### 14. Nic, co przypomina kasyno: bez żetonów, dźwięków wygranej, mikropłatności w grze, z wyłączeniem dźwięku
Obszar: **treść**
Obietnica „Training, not gambling” musi być prawdziwa w odczuciu użytkownika: brak bankrolla do wygrania, nagród za „wygrane” rozdania, kasynowych efektów dźwiękowych i zakupów powiązanych z rozgrywką; dźwięk da się wyłączyć.
- Kim i in., J Gambl Stud 2015, https://pubmed.ncbi.nlm.nih.gov/25410278/: „Approximately 26% of social casino gamers reported having migrated to online gambling. Importantly, engagement in micro-transactions was the only unique predictor of migration”.
- Hayer i in., J Gambl Stud 2018, https://pubmed.ncbi.nlm.nih.gov/29435822/: przejście nastolatków do hazardu na pieniądze „is fostered by (1) participation from home in simulated gambling on social networks and (2) significant exposure to advertising”.
- Bramley, Gainsbury, J Gambl Stud 2015, https://pubmed.ncbi.nlm.nih.gov/25344661/: dźwięki w obu typach gier pełnią funkcje m.in. „providing reinforcement, heightening player emotions … this may reduce the ability of players to make a clear distinction between these two activities”.
- Poker Trainer, 4★ z 2024-10-30: „I’d love the ability to turn off the volume so that I can use while listening to music”; 5★ z 2025-09-29: „there is no option to mute the sound FX”.

### 15. Pełna, natywna nauka w języku rynku, łącznie z opisem w sklepie
Obszar: **wzrost**
Żadna z czołowych alternatyw nie ma chińskiego tradycyjnego (TW) ani wietnamskiego (VN), a dwie mają tylko angielski; przewaga istnieje tylko, gdy cała treść (wyjaśnienia, terminologia pokerowa przyjęta w danym kraju) i strona w sklepie są przetłumaczone, nie sam interfejs.
- iTunes Lookup (`languageCodesISO2A`): Poker Trainer „['EN']”; GTO Preflop Wizard „['EN']”; Poker Skill „['EN', 'FR', 'DE', 'IT', 'JA', 'KO', 'PT', 'ES']”.
- Poker Skill, 5★ z 2026-06-19: „The terminology they use is techy, but not too niche that it becomes a foreign language.”
