# Soczewka: recenzent App Store i użytkownik konkurencji

Data odczytu wszystkich źródeł: 2026-11-17 (curl na surowym HTML/JSON, cytaty sprawdzone w pobranym tekście).
Wiedza o aplikacji: tylko cel właściciela i opis en-US z polecenia. Repo i dokumenty projektu nie były otwierane.

## Przeczytane alternatywy (App Store US)

| Aplikacja | ID | Ocena (liczba) | Wiek | Języki | Ceny IAP (z karty produktu) | Prywatność (deklaracja) |
|---|---|---|---|---|---|---|
| Poker Trainer - Learn Poker (SweDevIT AB) | 6478522482 | 4,75 (1182) | 18+, „Frequent Simulated Gambling” | English | tydzień 6,99; miesiąc 14,99; rok 59,99/89,99; dożywotni 269,99 USD | Data Not Linked to You (analityka, e-mail, User ID) |
| GTO Preflop Wizard Poker AI (Heater LLC) | 6590603158 | 4,76 (3492) | 13+, „Infrequent Simulated Gambling” | English | tydzień 6,99; miesiąc 19,99/29,99; 3 mies. 49,99/64,99; rok 89,99/129,99 USD | Data Used to Track You; reklama zewnętrzna |
| Postflop+ GTO Poker Trainer (Crafty Wheel Studios) | 1488850006 | 4,67 (1984) | 18+, „Frequent Simulated Gambling” | English | tydzień 4,99/9,99; miesiąc 14,99; rok 99,99; dożywotni 149,99/199,99 USD | Data Used to Track You (Usage Data) |

Adresy: `https://apps.apple.com/us/app/id<ID>` (karta), `https://apps.apple.com/us/app/id<ID>?see-all=reviews` (recenzje w JSON), `https://itunes.apple.com/search?term=poker+trainer&country=us&entity=software` (wyszukiwarka). Wyszukiwanie „pokergym” w US nie zwróciło aplikacji o tej nazwie (tylko gry pokerowe innych wydawców).

## Co musi być prawdą (15 punktów)

### 1. Każda ocena decyzji ma wyjaśnienie „dlaczego”, nie tylko „dobrze/źle” — obszar: treść
Najczęstszy zarzut w 1–3★ u wszystkich trzech konkurentów to ocena bez uzasadnienia. Opis PokerGym obiecuje „explanation with numbers”; to musi być prawdą dla każdej oceny, także w darmowej aktywności dnia.
- Preflop Wizard, 1★, 2025-03-30, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „It just runs you through scenarios and tells you if you are right or wrong. Doesn’t tell you why.”
- Postflop+, 3★, 2024-04-28, `https://apps.apple.com/us/app/id1488850006?see-all=reviews`: „Just says your move was a blunder, but doesn’t explain why. A person can’t really learn from mistakes if they’re not provided an explanation.”
- Preflop Wizard, 4★, 2025-02-24 (ten sam adres): „there should be explanations for your mistakes and not just a mock playing model.”

### 2. Czteropoziomowa skala ocen jest spójna z EV i z rękami mieszanymi — obszar: treść
Zagranie o tym samym (najwyższym) EV nie może dostać gorszej oceny; częstotliwość mieszana nie może być karana jako błąd; próg „poważnego błędu” wynika z wielkości straty, a nie z pozycji na liście opcji. Każdy poziom ma jawną definicję widoczną dla użytkownika.
- Postflop+, 1★, 2024-11-01, `https://apps.apple.com/us/app/id1488850006?see-all=reviews`: „Teaches you bad habits because it tells you that you are doing something wrong even if you’re properly mixing it up while in indifferent spots. Will say one decision is “perfect” and the other is “ok” when both are nearly 50% and the same (highest possible) EV.”
- Postflop+, 3★, 2025-08-18 (ten sam adres): „How can a +EV decision be a blunder?”
- Postflop+, 5★, 2020-10-20 (ten sam adres): „If two actions have the same EV, why is one “ok” and one “perfect”?”

### 3. Założenia każdego ćwiczenia są jawne i zgodne z tabelą/zakresem w kursie — obszar: treść
Format (cash/turniej), głębokość stosu, pozycje i typ gry są pokazane przy każdym ćwiczeniu; zakres w lekcji i odpowiedź wzorcowa w ćwiczeniu pochodzą z tego samego źródła danych. Gdzie odpowiedź zależy od populacji (np. gra na żywo 2/5), aplikacja mówi, że uczy bazy GTO, a odstępstwo podaje osobno z nazwaną populacją.
- Preflop Wizard, 1★, 2024-11-06, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „Charts don’t match the daily trainer or the endless trainer.”
- Preflop Wizard, 4★, 2024-10-17 (ten sam adres): „the “Crazy Mode” doesn’t really specify if you’re supposed to be making tournament range decisions or cash game range decisions.”
- Poker Trainer, 3★, 2026-01-27, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „I dont think thats realistic in a 2/5 cash game especially with questionable equity.”
- Poker Trainer, 2★, 2026-02-23 (ten sam adres): „one may call sometimes with pocket 9s; this app demands a fold in that spot.”

### 4. Generator rozdań jest wewnętrznie spójny — obszar: treść
Ręce przeciwnika należą do zakresu zgodnego z jego wcześniejszą akcją; odpowiedź wzorcowa zawsze jest jednym z przycisków; ćwiczenie nie „zacina się” na jednym wariancie (np. stała stawka). Wymaga testu własności na wygenerowanych rozdaniach.
- Postflop+, 1★, 2025-07-08, `https://apps.apple.com/us/app/id1488850006?see-all=reviews`: „the blind is given hands that it should not have, like premium pairs. These are hands that would have 3-bet the IP opponent. On a couple of deals the app told me that the perfect bidding choice was one that was not given as an option to choose.”
- Poker Trainer, 4★, 2024-07-09, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „the pot odds exercise got stuck such that the villain always bet 2 chips on a pot of 24 chips.”

### 5. Kurs prowadzi początkującego krok po kroku, a zaawansowany może ćwiczyć wybrany temat i ten wybór naprawdę działa — obszar: przepływ
Moduły w kolejności z pojęciem zdefiniowanym przed użyciem; sprawdzian poziomu pozwala pominąć znane części; filtr tematów (np. tylko 3-bet) zmienia zestaw ćwiczeń; ustawienia nie zmieniają się między wersjami bez powodu.
- Preflop Wizard, 1★, 2025-03-30, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „It doesn’t lay out a curriculum and introduce ideas to you slowly.”
- Preflop Wizard, 4★, 2024-10-01 (ten sam adres): „It seems that no matter what you select as issues you want to work on, you get the same drills.”
- Preflop Wizard, 3★, 2024-10-20 (ten sam adres): „for a 100$ a year app this app lacks any sort of filtering.”
- Poker Trainer, 3★, 2026-06-23, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „I’m spending most of the time figuring out how to set up my parameters.”
- Poker Trainer, 5★, 2024-07-16 (ten sam adres): „A little overwhelming for a beginner”.

### 6. Nauka bez presji: brak limitu czasu domyślnie, dźwięk wyłączalny, tryb ciemny — obszar: przepływ
Konkurenci tracą gwiazdki za wymuszony zegar, brak wyciszenia i jasny ekran. Aplikacja edukacyjna („training, not gambling”) nie potrzebuje zegara ani rankingu na czas.
- Preflop Wizard, 4★, 2024-10-17, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „I reckon if this feature had an option to include or not include the timer” oraz „Crazy mode display is bright white with no option for dark mode”.
- Poker Trainer, 4★, 2024-10-30, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „I’d love the ability to turn off the volume so that I can use while listening to music”.

### 7. Ekran zakupu spełnia wymagania Apple co do treści i układu — obszar: pieniądze
Na ekranie: nazwa i okres każdej opcji (kwartał, rok, dożywotni), co dokładnie odblokowuje, pełna cena odnowienia jako najbardziej widoczny element, „Przywróć zakupy”, linki do Warunków i Polityki prywatności (w aplikacji i w metadanych). Kwartał i rok w jednej grupie subskrypcji, żeby nie dało się kupić obu.
- `https://developer.apple.com/app-store/subscriptions/`: „Subscription name and duration, and the content or services provided during the subscription period / Full renewal price, shown clearly and prominently, and localized in available currencies / A way for current subscribers to sign in or restore purchases / Please note that your app and App Store metadata must include links to your Terms of Use and Privacy Policy.”
- Tamże: „the amount that will be billed must be the most prominent pricing element in the layout.” oraz „creating a single group is the best practice for most apps as it prevents people from accidentally purchasing multiple subscriptions.”
- Wytyczne, 3.1.2(c), `https://developer.apple.com/app-store/review/guidelines/` (Last Updated: October 16, 2026): „Before asking a customer to subscribe, you should clearly describe what the user will get for the price.”

### 8. Żadnych zaskakujących obciążeń: jasny okres próbny (jeśli jest), łatwe zarządzanie subskrypcją z aplikacji — obszar: pieniądze
Najostrzejsze 1★ dotyczą obciążenia po okresie próbnym. Jeśli jest trial, ekran podaje jego długość i kwotę po jego końcu; w ustawieniach jest wejście do zarządzania subskrypcją (showManageSubscriptions). Zwroty i skargi są dla Apple sygnałem niskiej jakości.
- Poker Trainer, 1★, 2025-07-30, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „I was charged 60 bucks for a year long subscription. They denied my refund.”
- `https://developer.apple.com/app-store/subscriptions/`: „In the purchase flow for a free trial, clearly indicate how long the free trial lasts and the price billed once the free trial is over.”
- Wytyczne 5.6.4, `https://developer.apple.com/app-store/review/guidelines/`: „Indications that this expectation is not being met include excessive customer reports about concerns with your app, such as negative customer reviews, and excessive refund requests.”

### 9. Darmowa część pokazuje prawdziwą wartość, a subskrypcja daje „ongoing value” — obszar: pieniądze
Recenzent Apple pyta, za co jest ciągła opłata, gdy kurs jest stały: powtórki rozłożone w czasie, nowe ćwiczenia i aktualizacje treści muszą to uzasadniać (inaczej ryzyko 3.1.2(a)). Użytkownicy chwalą możliwość obejrzenia przed zapłatą i krytykują zbyt mało darmowej treści. Ceny PokerGym (9,99 / 14,99 / 19,99 USD) są wielokrotnie niższe od konkurentów (rok 59,99–129,99, dożywotni 149,99–269,99 USD), co jest przewagą tylko wtedy, gdy jakość z punktów 1–4 jest prawdą.
- Wytyczne 3.1.2(a), `https://developer.apple.com/app-store/review/guidelines/`: „If you offer an auto-renewable subscription, you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices.”
- Wytyczne 2.3.2 (tamże): „make sure your app description, screenshots, and previews clearly indicate whether any featured items, levels, subscriptions, etc. require additional purchases.”
- Poker Trainer, 5★, 2024-07-16, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „doesn’t require you to pay before you can look at it.”
- Postflop+, 3★, 2024-10-23, `https://apps.apple.com/us/app/id1488850006?see-all=reviews`: „this app is not really usable with the amount of free content it gives.”
- Ceny: karty `https://apps.apple.com/us/app/id6478522482` („Lifetime premium $269.99”), `https://apps.apple.com/us/app/id1488850006` („$199.99 one-time for lifetime access (Forever)”), `https://apps.apple.com/us/app/id6590603158` („Annual VIP Access $129.99”).

### 10. Ocena wiekowa jest uczciwa, a zrzuty ekranu nadają się dla 4+ — obszar: wydanie
Rozgrywanie rąk z zakładami bez pieniędzy mieści się w definicji „Simulated Gambling”; wszyscy trzej konkurenci ją zadeklarowali (dwóch jako częstą, 18+). Zaniżenie oceny to ryzyko odrzucenia. Uwaga dla rynków: w Australii nawet „infrequent” daje R 18+; w Korei (nie na liście) częsta symulacja wymaga numeru RCN. Wniosek recenzenta, nie decyzja: najbezpieczniej zadeklarować symulację i przyjąć 18+, albo udokumentować, dlaczego „infrequent” (13+).
- `https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/`: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.”; w tabeli 13+: „Infrequent simulated gambling”; 18+: „Gambling | Frequent simulated gambling”; Australia „R 18+ | Apps that contain: | Chance-Based Activities: | Infrequent simulated gambling”.
- Wytyczne 2.3.6, `https://developer.apple.com/app-store/review/guidelines/`: „Answer the age rating questions in App Store Connect honestly so that your app aligns properly with parental controls.” oraz 2.3.8: „make sure your app and in-app purchase icons, screenshots, and previews adhere to a 4+ age rating even if your app is rated higher.”

### 11. Aplikacja nie ma żadnej cechy usługi hazardowej ani „pomocy do gry” — obszar: treść
Brak żetonów lub waluty do kupienia, nagród, rankingów z wygranymi, linków i afiliacji do pokojów pokerowych, obietnic zarobku i trybu pomocy w czasie rzeczywistym podczas gry. Opis „Training, not gambling” musi być prawdą w każdym ekranie (2.3.1), bo inaczej aplikacja wpada w 5.3 i w wymóg podmiotu prawnego (5.1.1(ix)). Ekran pomocy dla problemowego hazardu podaje działający numer dla rynku (US: 1-800-GAMBLER).
- Wytyczne 5.3.3 i 5.3.4, `https://developer.apple.com/app-store/review/guidelines/`: „Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.” oraz „Illegal gambling aids, including card counters, are not permitted on the App Store.”
- Wytyczne 5.1.1(ix) (tamże): „Apps that provide services in highly regulated fields (such as banking and financial services, healthcare, gambling, …) … should be submitted by a legal entity that provides the services, and not by an individual developer.”
- Wzór pozycjonowania u konkurenta, `https://apps.apple.com/us/app/id6478522482`: „Poker Trainer is an educational app. No real-money gambling or multiplayer poker games.”
- Infolinia US, `https://1800gambler.net/`: „1-800-GAMBLER is pleased to offer you Connections — a free recovery support app with 24/7 peer support”.

### 12. Deklaracja prywatności „Data Not Collected” jest prawdziwa, a polityka prywatności istnieje i jest w aplikacji — obszar: prywatność
„No account, no ads, no tracking” to realny wyróżnik: dwóch z trzech konkurentów deklaruje śledzenie. Musi to potwierdzać kod (zero SDK analityki/reklam, brak raportów awarii wysyłanych bez zgody) i etykieta w App Store Connect. Brak kont oznacza brak obowiązku usuwania konta, ale polityka prywatności (także „nic nie zbieramy”) jest wymagana w metadanych i w aplikacji.
- Preflop Wizard, karta `https://apps.apple.com/us/app/id6590603158`: „Data Used to Track You … Third-Party Advertising | Identifiers | Device ID”.
- Postflop+, karta `https://apps.apple.com/us/app/id1488850006`: „Data Used to Track You | The following data may be used to track you across apps and websites owned by other companies: | Usage Data”.
- Wytyczne 5.1.1(i), `https://developer.apple.com/app-store/review/guidelines/`: „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner.” oraz 2.3: „make sure all your app metadata, including privacy information, … accurately reflect the app’s core experience”.

### 13. Postęp lokalny nie ginie i nie „cofa się”, a zakup działa na każdym urządzeniu użytkownika — obszar: dane
Bez konta jedyną kopią jest urządzenie: eksport/import musi odtwarzać pełny stan (powtórki, seria, wyniki), aktualizacja aplikacji nie może resetować planu powtórek, a „Przywróć zakupy” musi odblokować dostęp na nowym telefonie bez logowania. Aplikacja mówi wprost, że postęp nie synchronizuje się sam.
- Preflop Wizard, 1★, 2025-01-23, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „the daily trainer seems to regress or reset automatically”.
- Wytyczne 3.1.2(a), `https://developer.apple.com/app-store/review/guidelines/`: „Subscriptions must work on all of the user’s devices where the app is available.”
- Wytyczne 3.1.1 (tamże): „you should make sure you have a restore mechanism for any restorable in-app purchases.”

### 14. 35 języków i dostępność są prawdziwym, zadeklarowanym wyróżnikiem, a wymogi storefrontów są spełnione przed wejściem — obszar: wydanie
Wszyscy trzej konkurenci mają tylko angielski; lokalizacja treści i metadanych jest przewagą tylko przy jakości wyjaśnień w każdym języku (2.3: metadane zgodne z aplikacją). Etykiety dostępności (VoiceOver, Larger Text) wypełnione zgodnie z prawdą; u konkurenta ich brak. Dla DE/FR: status tradera DSA i dane kontaktowe publikowane na karcie.
- Karty trzech aplikacji: „Languages | English” (`https://apps.apple.com/us/app/id6478522482`, `…/id6590603158`, `…/id1488850006`).
- Poker Trainer, karta: „The developer has not yet indicated which accessibility features this app supports.”
- `https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/`: „The labels appear on the app product page and will help users understand if they can use a feature like VoiceOver or Larger Text to complete common tasks in the app.”
- `https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/`: „Articles 30 and 31 of the Digital Services Act (DSA) require Apple to verify and display trader contact information for all traders distributing apps on the App Store in the European Union (EU). This includes an address, phone number, and email address”.

### 15. Działający kanał zgłoszeń w aplikacji, odpowiedzi na recenzje i systemowa prośba o ocenę — obszar: wzrost
Przy jednym właścicielu i bez analityki zgłoszenia z aplikacji to główne źródło informacji o błędach treści; zepsuty formularz zamienia się w 1★. Odpowiedź twórcy podnosi oceny. Prośba o ocenę tylko przez API systemowe.
- Preflop Wizard, 1★, 2025-01-23, `https://apps.apple.com/us/app/id6590603158?see-all=reviews`: „the ability to submit in app bugs and in app feedback is broken.” oraz „Once I see a reply, I’ll update back to Fivestars.”
- Poker Trainer, 5★, 2025-11-21, `https://apps.apple.com/us/app/id6478522482?see-all=reviews`: „I even emailed the support email a question and the founder responded to me so there’s great customer support.”
- Wytyczne 5.6.1, `https://developer.apple.com/app-store/review/guidelines/`: „Use the provided API to prompt users to review your app … we will disallow custom review prompts.”

## Ograniczenia tej soczewki
- Strona recenzji zwraca ok. 10 recenzji na aplikację (wybór Apple, nie pełna próba); wnioski są jakościowe.
- Strona NCPG (`https://www.ncpgambling.org/help-treatment/`) zwróciła 403; numer US potwierdzony na `https://1800gambler.net/`. Infolinie dla JP, CA, GB, BR, FR, TW, VN, DE nie były sprawdzane.
- Wymogi lokalne dla gier w VN/TW/JP nie były sprawdzane (aplikacja nie jest w kategorii Games, ale to wymaga potwierdzenia przy wyborze kategorii, 2.3.5).
