# Soczewka: praktyk dziedziny (gracz/trener NLHE)

Data odczytu wszystkich źródeł: 2026-11-17. Cytaty sprawdzone na surowym tekście pobranym przez curl (JSON `serialized-server-data` stron App Store, HTML stron źródłowych), nie na streszczeniu.

## Przeczytane alternatywy (App Store US)

| Aplikacja | ID | Ocena / liczba ocen | Ceny w aplikacji (strona produktu) | Języki | Etykieta prywatności | Wiek |
|---|---|---|---|---|---|---|
| Postflop+ GTO Poker Trainer (Crafty Wheel Studios) | 1488850006 | 4,67 / 1984 | Weekly 4,99–9,99; Monthly 14,99; Yearly 99,99; Lifetime 149,99–199,99 USD | English | „Data Used to Track You” | 18+ |
| Poker Trainer - Learn Poker (SweDevIT AB) | 6478522482 | 4,75 / 1182 | Weekly 6,99; Monthly 14,99; Yearly 59,99–89,99; Lifetime premium 269,99 USD | English | „Data Not Linked to You” | 18+ |
| GTO Preflop Wizard Poker AI (Heater LLC) | 6590603158 | 4,76 / 3492 | Weekly 6,99; Monthly 19,99–29,99; 3 Months 49,99–64,99; Annual 89,99–129,99 USD | English | „Data Used to Track You”, „Data Linked to You” | 13+ |

Adresy: `https://apps.apple.com/us/app/id<ID>` i `https://apps.apple.com/us/app/id<ID>?see-all=reviews`; dane liczbowe także z `https://itunes.apple.com/lookup?id=1488850006,6478522482,6590603158&country=us`.

## Co musi być prawdą

### 1. Ocena decyzji opiera się na stracie EV, a akcje mieszane o równym EV są obie „najlepsze”
- Obszar: treść
- Dlaczego: najczęstsza merytoryczna skarga na lidera postflop to karanie poprawnego mieszania; czterostopniowa skala bez reguły „równe EV = ta sama ocena” uczy złych nawyków.
- Dowód: Postflop+ (id1488850006?see-all=reviews), 2024-11-01, 1★: „always recognizes any move besides the #1 most optimal move as a blunder … Teaches you bad habits because it tells you that you are doing something wrong even if you’re properly mixing it up while in indifferent spots.” Tamże 2025-08-18: „How can a +EV decision be a blunder?” Źródło dziedziny: https://poker.academy/blog/post/what-is-gto-in-poker : „a hand is only mixed when the actions it mixes have (almost) the same EV. If one action were clearly better, the solver would take it 100% of the time. The name for this is indifference.”

### 2. Każda ocena ma wyjaśnienie „dlaczego”, nie tylko werdykt
- Obszar: treść
- Dlaczego: brak uzasadnienia to główny powód niskich ocen płatnych trenerów; to jest przewaga, którą opis PokerGym już obiecuje („explanation with numbers”) i musi ją dowieźć w każdym ćwiczeniu, także przy odpowiedzi poprawnej.
- Dowód: Postflop+, 2024-04-28, 3★: „it doesn’t provide reasoning behind blunders. Just says your move was a blunder, but doesn’t explain why. A person can’t really learn from mistakes if they’re not provided an explanation.” Preflop Wizard (id6590603158), 2025-02-24, 4★: „without explaining why K6ss is a raise UTG with 40 but K5ss is not … doesn’t elevate my game.”

### 3. Kurs ma prawdziwy program w kolejności, a nie tylko losowe zadania
- Obszar: przepływ
- Dlaczego: praktycy odróżniają „symulator z oceną” od nauki; ułożony program (zasady → matematyka → pozycja → ulice) to wyróżnik wobec trenerów-quizów.
- Dowód: Preflop Wizard, 2025-03-30, 1★: „it doesn’t do any real teaching. … It doesn’t lay out a curriculum and introduce ideas to you slowly. It just runs you through scenarios and tells you if you are right or wrong. Doesn’t tell you why.” Poker Trainer (id6478522482), 2024-07-16, 5★: „A little overwhelming for a beginner, but it's got everything”.

### 4. Każde zadanie jawnie podaje założenia: format (cash/turniej), głębokość stacka, liczbę graczy, rozmiar otwarcia, rake/ante
- Obszar: treść
- Dlaczego: ta sama ręka ma inne poprawne zagranie przy 40 bb i 100 bb, w cashu i w turnieju; bez założeń na ekranie gracz uznaje poprawną odpowiedź za błąd albo uczy się złej reguły.
- Dowód: Poker Trainer, 2026-02-23, 2★: „with 100BB, in UTG+1, facing an UTG open, one may call sometimes with pocket 9s; this app demands a fold in that spot.” Preflop Wizard, 2024-10-17: „the “Crazy Mode” doesn’t really specify if you’re supposed to be making tournament range decisions or cash game range decisions.” Źródło dziedziny: https://www.pokerstrategy.com/strategy/sit-and-go/1779/ : „Other structures, such as that at PokerStars (antes of between 12.5% and 5% of the BB, depending on the level) lead to a slightly different result.”

### 5. Tabele zakresów i ćwiczenia pochodzą z jednego źródła danych i nigdy sobie nie przeczą
- Obszar: dane
- Dlaczego: rozjazd między „ściągą” a oceną w ćwiczeniu niszczy zaufanie szybciej niż jakakolwiek luka w zakresie treści.
- Dowód: Preflop Wizard, 2024-11-06, 1★: „So may bugs and incorrect feedback. Charts don’t match the daily trainer or the endless trainer. Needs a lot more QA and WOULD NOT RECOMMEND.” Tamże: „the endless trainer has many situations with small stack sizes < 30BB which the app does not have any charts for.”

### 6. Push/fold i ICM uczone z jawnym modelem: efektywny stack, ante, wypłaty; Nash chip-EV nazwany jako uproszczenie wobec ICM
- Obszar: treść
- Dlaczego: moduł turniejowy jest najłatwiejszym miejscem na błędne liczby; tabela bez parametrów modelu jest dla praktyka bezużyteczna albo myląca.
- Dowód: https://www.pokerstrategy.com/strategy/sit-and-go/1779/ : „The effective stack (ES) is an important parameter in the analysis of push-or-fold situations … It refers to the size of the smaller of the two stacks before the blinds (and antes) are posted, measured in BBs.” oraz „For the version that includes antes, the antes are 10% of the BB.” Tamże: „The %-figures and the precise ranges are taken from the ICM calculator at www.holdemresources.net.”

### 7. Ćwiczenie można zawęzić do konkretnego wycieku (np. tylko pule 3-bet, tylko obrona BB), a wybór filtra realnie zmienia zadania
- Obszar: przepływ
- Dlaczego: praktyk trenuje swoje słabe miejsca; „personalizacja”, która nie zmienia zadań, jest wytykana wprost.
- Dowód: Preflop Wizard, 2024-10-20, 3★: „for a 100$ a year app this app lacks any sort of filtering. One of the largest mistakes in my game is three bet pots”. Tamże, 2024-10-01, 4★: „It seems that no matter what you select as issues you want to work on, you get the same drills.” Postflop+, 2024-09-15, 5★ (wzorzec pozytywny): „choose which variables that are causing the most damage to your game … SPR, Limp, 3bet, 4bet, BvB”.

### 8. Krótka sesja dzienna z serią i powtórkami błędów, ale bez presji czasu (limit czasu tylko opcjonalny)
- Obszar: wzrost
- Dlaczego: format „Duolingo” jest tym, co chwalą użytkownicy; wymuszony zegar przy trudnych decyzjach jest krytykowany.
- Dowód: Preflop Wizard, 2024-08-10, 5★ „Duolingo meets poker”: „keeping me motivated to study even if it’s only 2 minutes a day”. Tamże, 2024-10-01, 4★ „The timer is not adjustable”; 2024-10-17: „if this feature had an option to include or not include the timer”. Poker Trainer (opis): „Complete Daily Drills, build your streak and revisit common mistakes over time with spaced repetition.”

### 9. Cena wyraźnie niższa od konkurencji i uczciwy przepływ zakupu: bez ukrytego przejścia z trialu, z łatwym przywróceniem zakupu i zgodny z 3.1.2
- Obszar: pieniądze
- Dlaczego: konkurenci biorą 60–270 USD rocznie/dożywotnio i zbierają za to 1★; cennik PokerGym (9,99/14,99/19,99) to przewaga tylko wtedy, gdy przepływ zakupu jest przejrzysty, a subskrypcja daje „ongoing value”.
- Dowód: ceny w tabeli wyżej (strony produktów, 2026-11-17). Postflop+, 2024-10-23, 3★: „Price is a big problem for me as I’m scared of anything that is a subscription … They offer a 1 time purchase which is 200 dollars”. Poker Trainer, 2025-07-30, 1★: „I was charged 60 bucks for a year long subscription. They denied my refund.” Apple, https://developer.apple.com/app-store/review/guidelines/ , 3.1.2(a): „If you offer an auto-renewable subscription, you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices.”

### 10. Pełna lokalizacja jest realnym wyróżnikiem: wszyscy trzej konkurenci są tylko po angielsku
- Obszar: wzrost
- Dlaczego: rynki JP, BR, FR, TW, VN, DE nie mają lokalnego trenera tej klasy; ale terminologia pokerowa w każdym języku musi być spójna z tym, czego używają lokalni gracze (inaczej praktyk uzna tłumaczenie za amatorskie).
- Dowód: strony produktów `apps.apple.com/us/app/id1488850006`, `id6478522482`, `id6590603158`: pole „Languages” = „English” w każdej z trzech.

### 11. Brak śledzenia jest twardą przewagą i musi być prawdą w etykiecie prywatności
- Obszar: prywatność
- Dlaczego: dwóch z trzech konkurentów deklaruje śledzenie; etykieta „Data Not Collected” odróżnia PokerGym, ale tylko jeśli żaden SDK (np. analityka zakupów, raporty awarii) jej nie podważa.
- Dowód: strona `apps.apple.com/us/app/id1488850006`: sekcja „Data Used to Track You”; `id6590603158`: „Data Used to Track You” i „Data Linked to You”; `id6478522482`: tylko „Data Not Linked to You”.

### 12. Kategoria wiekowa ustalona świadomie: pytanie o „simulated gambling” odpowiedziane zgodnie z faktyczną częstotliwością rozdań w aplikacji, z wiedzą o regionalnych wyjątkach
- Obszar: wydanie
- Dlaczego: brak żetonów i stawek nie zwalnia z deskryptora symulowanego hazardu; konkurenci są na 18+ (frequent) albo 13+ (infrequent), a Australia daje R 18+ nawet przy „infrequent”. Zła odpowiedź grozi odrzuceniem albo ograniczeniem widoczności.
- Dowód: https://developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions/ : „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.” oraz przy 18+: „Chance-Based Activities: Gambling Frequent simulated gambling”; dla Australii: „R 18+ Apps that contain: Chance-Based Activities: Infrequent simulated gambling”. Strony produktów: Postflop+ i Poker Trainer „18+”, Preflop Wizard „13+”.

### 13. Aplikacja jest wyłącznie narzędziem nauki poza stołem: żadnej funkcji, która działa jako pomoc w czasie rzeczywistym (RTA), i jasna informacja o tym w regulaminie/pomocy
- Obszar: wydanie
- Dlaczego: pokoje pokerowe banują konta za RTA, a Apple nie dopuszcza „illegal gambling aids”; trener, który da się użyć w trakcie gry online (np. szybkie wpisanie ręki i pozycji → odpowiedź), szkodzi użytkownikom i reputacji „Training, not gambling”.
- Dowód: Apple, https://developer.apple.com/app-store/review/guidelines/ , 5.3.4: „Illegal gambling aids, including card counters, are not permitted on the App Store.” https://pokerlistings.com/blog/what-is-rta-in-poker-and-why-is-it-prohibited : „GGPoker defines RTA as “ any external assistance which provides users with an unfair advantage over their opponents, influences their decision making in real-time, or allows them to play in a manner they otherwise would not be able to replicate ”.” (źródło wtórne wobec regulaminu GGPoker). https://www.pokernews.com/news/2025/05/gto-wizard-supports-online-poker-operators-48685.htm : „GTO Wizard released it Fair Play Check, a tool that helps identify potential use of bots and Real-Time Assistance (RTA)”.

### 14. Ekran pomocy przy problemowym hazardzie podaje aktualny numer dla kraju użytkownika (US: 1-800-MY-RESET), a nie numer zapamiętany sprzed lat
- Obszar: treść
- Dlaczego: NCPG promuje dziś 1-800-MY-RESET; stary numer nadal działa, ale ekran pomocy ma być zgodny ze stroną organizacji i lokalny dla każdego rynku (GB, CA, DE, JP… mają własne linie), inaczej funkcja „help screen” jest martwa poza US.
- Dowód: https://ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/ : „Call. 1-800-MY-RESET Text. 1-800-MY-RESET Chat. Chat Online” oraz „The National Problem Gambling Helpline™ offers call, text and chat services 24/7/365.” oraz „By texting the National Problem Gambling Helpline ( 1-800-522-4700 or 1-800-697-3738 )”. (Strona GamCare dla GB zwróciła 403 przy curl; numer GB niezweryfikowany na surowym tekście.)

### 15. Jakość wykonania podstawowych rzeczy: wyciszenie dźwięku, stabilny ekran ustawień, działające zgłaszanie błędów, poprawne parametry ćwiczeń
- Obszar: przepływ
- Dlaczego: przy ocenie 4,7 u liderów różnicę robią drobiazgi, a recenzje 1–3★ dotyczą głównie ich, nie teorii.
- Dowód: Poker Trainer, 2024-10-30: „I’d love the ability to turn off the volume so that I can use while listening to music”; 2026-06-23, 3★: „I’m spending most of the time figuring out how to set up my parameters. You guys keep doing this.”; 2024-07-09: „the pot odds exercise got stuck such that the villain always bet 2 chips on a pot of 24 chips”. Preflop Wizard, 2025-01-23, 1★: „the ability to submit in app bugs and in app feedback is broken.”

## Ograniczenia tej soczewki
- Trzy alternatywy, recenzje tylko z pierwszej strony „see-all=reviews” (po ok. 10 na aplikację); brak próby statystycznej.
- RTA: definicja GGPoker przez źródło wtórne (pokerlistings); regulaminu GGPoker nie pobrano. Strony PokerStars przekierowały na FanDuel (geolokalizacja), GamCare zwrócił 403.
- Nie oceniano samej aplikacji PokerGym (zgodnie z poleceniem); punkty to wymagania „najlepszej w klasie”, nie znaleziska.
