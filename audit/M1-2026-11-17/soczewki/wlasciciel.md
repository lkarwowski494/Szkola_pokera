# Soczewka: właściciel (czas ograniczony, budżet 0 zł poza Apple Developer)

Data odczytu wszystkich źródeł: 2026-11-17. Cytaty sprawdzone na surowym tekście pobranym curlem (JSON `serialized-server-data` stron App Store, HTML stron Apple/NCPG/Expo/GitHub), nie na streszczeniu.

## Alternatywy przeczytane (App Store US)

| Aplikacja | ID | Ocena / liczba | Wiek | Języki | Ceny IAP (US) |
|---|---|---|---|---|---|
| GTO Preflop Wizard Poker AI | 6590603158 | 4,76 / 3491 | 13+ | EN | 6,99/tydz., 19,99–29,99/mies., 49,99–64,99/3 mies., 89,99–129,99/rok |
| Postflop+ GTO Poker Trainer | 1488850006 | 4,67 / 1984 | 18+ | EN | 4,99–9,99/tydz., 14,99/mies., 99,99/rok, lifetime 149,99–199,99 |
| Poker Trainer – Learn Poker | 6478522482 | 4,75 / 1182 | 18+ | EN | 6,99/tydz., 14,99/mies., 59,99–89,99/rok, lifetime 269,99 |
| Poker Skill – Learn Holdem (pomocniczo) | 6748104711 | 4,72 / 527 | 4+ | EN, FR, DE, IT, JA, KO, PT, ES | 9,99–14,99/mies., 64,99–99,99/rok |

Źródła: `https://itunes.apple.com/search?term=poker+gto+trainer&country=us&entity=software`, `https://itunes.apple.com/lookup?id=<ID>&country=us` (pole `languageCodesISO2A`), `https://apps.apple.com/us/app/id<ID>` (sekcja „In-App Purchases”, plakietka wieku, etykiety prywatności), `https://apps.apple.com/us/app/id<ID>?see-all=reviews` (recenzje).

## Co musi być prawdą (15)

### 1. Każda ocena decyzji ma wyjaśnienie „dlaczego” z liczbami — obszar: treść
Najczęstsza skarga na droższe konkurencje to ocena bez uzasadnienia; to główny powód, by ktoś zapłacił za tańszą aplikację.
- `https://apps.apple.com/us/app/id6590603158?see-all=reviews` (2025-03-30, 1★): „It just runs you through scenarios and tells you if you are right or wrong. Doesn’t tell you why.”
- `https://apps.apple.com/us/app/id1488850006?see-all=reviews` (2024-04-28, 3★): „it doesn’t provide reasoning behind blunders. Just says your move was a blunder, but doesn’t explain why.”

### 2. Skala ocen jest sprawiedliwa dla zagrań mieszanych i o równym EV — obszar: treść
Czterostopniowa skala bez reguły dla rąk mieszanych (równe EV) produkuje recenzje 1★ „uczy złych nawyków”. Ocena musi wynikać ze straty EV, a zagrania o tym samym EV dostają tę samą ocenę.
- `https://apps.apple.com/us/app/id1488850006?see-all=reviews` (2024-11-01, 1★): „Teaches you bad habits because it tells you that you are doing something wrong even if you’re properly mixing it up while in indifferent spots.”
- tamże (2020-10-20, 5★): „If two actions have the same EV, why is one “ok” and one “perfect”?”

### 3. Założenia każdego spotu są jawne, a zakresy i ćwiczenia ze sobą zgodne — obszar: treść
Rozjazd między pokazanym zakresem a oceną albo ukryte założenia (głębokość stacka, typ gry) niszczą zaufanie szybciej niż brak funkcji.
- `https://apps.apple.com/us/app/id6590603158?see-all=reviews` (2024-11-06, 1★): „Charts don’t match the daily trainer or the endless trainer.”
- `https://apps.apple.com/us/app/id6478522482?see-all=reviews` (2026-02-23, 2★): „it is lacking the range detail which results in training to be TOO tight.”

### 4. Kurs prowadzi od zera w krótkich sesjach (5–10 min) z nawykiem dziennym — obszar: przepływ
Rynek nagradza strukturę „Duolingo dla pokera”, a karze sam „dryl” bez programu nauczania.
- `https://apps.apple.com/us/app/id6590603158?see-all=reviews` (2025-03-30, 1★): „It doesn’t lay out a curriculum and introduce ideas to you slowly.”
- tamże (2024-08-10, 5★, tytuł „Duolingo meets poker”): „This app is amazing at keeping me motivated to study even if it’s only 2 minutes a day!”
- `https://apps.apple.com/us/app/id6748104711?see-all=reviews` (2025-12-31, 5★, tytuł „It really is Duolingo for poker”).

### 5. Stabilny interfejs, wyciszenie dźwięku i działający kanał zgłoszeń, obsługiwany przez jedną osobę — obszar: przepływ
Właściciel ma mało czasu, więc wsparcie musi być rzadkie, ale działające. Przebudowy ekranów i niedziałający formularz zgłoszeń dają 1–3★, a szybka odpowiedź twórcy daje 5★.
- `https://apps.apple.com/us/app/id6478522482?see-all=reviews` (2026-06-23, 3★): „What the heck did you do to the training setup page?… Why do you keep messing with it?”
- tamże (2024-10-30, 4★): „I’d love the ability to turn off the volume so that I can use while listening to music”
- tamże (2025-11-21, 5★): „I even emailed the support email a question and the founder responded to me so there’s great customer support.”
- `https://apps.apple.com/us/app/id6590603158?see-all=reviews` (2025-01-23, 1★): „the ability to submit in app bugs and in app feedback is broken.”

### 6. Cena wyraźnie niższa od rynku, a próg 500 USD netto/rok osiągalny przy kilkudziesięciu zakupach — obszar: pieniądze
Konkurenci biorą 59,99–129,99 USD/rok i 149,99–269,99 USD za dożywotni dostęp (tabela wyżej). Przy prowizji 15% (Small Business Program) 14,99/rok daje ok. 12,74 USD netto, a 19,99 dożywotnio ok. 16,99 USD netto. Próg 500 USD wymaga więc ok. 40 rocznych albo ok. 30 dożywotnich zakupów rocznie. To rachunek bez VAT w FR/DE, który w UE obniża kwotę netto.
- `https://developer.apple.com/app-store/small-business-program/`: „It features a reduced commission rate of 15% on paid apps and Apple In-App Purchases”
- `https://apps.apple.com/us/app/id6590603158?see-all=reviews` (2024-10-20, 3★): „for a 100$ a year app this app lacks any sort of filtering.” Cena jest tu argumentem, ale nie zastępuje jakości.

### 7. Subskrypcja daje ciągłą wartość, a limit darmowy i warunki są opisane przed zakupem — obszar: pieniądze
Apple wymaga ciągłej wartości subskrypcji. Statyczny kurs offline z kwartałem i rokiem musi mieć regularne, istotne aktualizacje treści albo opierać wartość na dożywotnim odblokowaniu. Niejasny limit („energia”) i zaskakujące odnowienie dają recenzje 1★.
- `https://developer.apple.com/app-store/review/guidelines/` (3.1.2(a), „Last Updated: October 16, 2026”): „If you offer an auto-renewable subscription, you must provide ongoing value to the customer” … „apps that offer consistent, substantive updates”
- tamże (3.1.2(c)): „Before asking a customer to subscribe, you should clearly describe what the user will get for the price.”
- `https://apps.apple.com/us/app/id6478522482?see-all=reviews` (2025-07-30, 1★): „I was charged 60 bucks for a year long subscription. They denied my refund.”
- `https://apps.apple.com/us/app/id6748104711?see-all=reviews` (2026-02-20, 5★): „Not sure how long it takes to get more energy on the free option”

### 8. Zakup przywraca się bez konta, na każdym urządzeniu użytkownika — obszar: pieniądze
- `https://developer.apple.com/app-store/review/guidelines/` (3.1.1): „you should make sure you have a restore mechanism for any restorable in-app purchases.”
- tamże (3.1.2(a)): „the subscription period must last at least seven days and be available across all of the user’s devices.”

### 9. Postęp bez konta przeżywa zmianę telefonu tylko dzięki eksportowi i importowi, więc oba muszą działać bezbłędnie — obszar: dane
Brak konta jest zgodny z wytycznymi i zdejmuje z właściciela serwer i RODO kont, ale całe ryzyko utraty postępu przechodzi na plik eksportu i ścieżkę importu.
- `https://developer.apple.com/app-store/review/guidelines/` (5.1.1(v)): „If your app doesn’t include significant account-based features, let people use it without a login”

### 10. „Bez śledzenia” jest faktem w etykiecie App Store, z polityką prywatności w metadanych i w aplikacji — obszar: prywatność
Wszyscy trzej główni konkurenci deklarują zbieranie danych, a dwóch z nich śledzenie. Etykieta „Data Not Collected” to realny wyróżnik, ale tylko gdy żaden SDK jej nie łamie.
- `https://apps.apple.com/us/app/id6590603158`: sekcje „Data Used to Track You” (kategoria Identifiers) i „Data Linked to You” (cel Third-Party Advertising).
- `https://apps.apple.com/us/app/id1488850006`: „Data Used to Track You” (Usage Data).
- `https://apps.apple.com/us/app/id6478522482`: „Data Not Linked to You” (Analytics).
- `https://developer.apple.com/app-store/review/guidelines/` (5.1.1(i)): „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner.”

### 11. Uczciwa kategoria wieku dla „symulowanego hazardu” i zero elementów kojarzonych z hazardem na pieniądze — obszar: wydanie
Konkurenci tego samego typu mają od 4+ do 18+. Apple definiuje symulowany hazard szeroko, a w Australii nawet rzadki daje R 18+. Żadnych żetonów kupowanych za IAP i żadnej funkcji „pomocnika przy stole” na żywo.
- `https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions`: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.”; „18+ … Chance-Based Activities: Gambling Frequent simulated gambling”; Australia: „R 18+ Apps that contain: Chance-Based Activities: Infrequent simulated gambling”
- `https://developer.apple.com/app-store/review/guidelines/` (2.3.6): „Answer the age rating questions in App Store Connect honestly”; (5.3.3): „Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.”; (5.3.4): „Illegal gambling aids, including card counters, are not permitted on the App Store.”
- Plakietki wieku: Preflop Wizard 13+, Postflop+ 18+, Poker Trainer 18+, Poker Skill 4+ (strony produktów wyżej).

### 12. Przed storefrontami UE (FR, DE) właściciel świadomie decyduje o publicznych danych kontaktowych (DSA) — obszar: wydanie
Osoba fizyczna dystrybuująca w UE musi opublikować adres (może być skrytka pocztowa), telefon i e-mail na stronie produktu. To koszt prywatności właściciela, nie aplikacji.
- `https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements`: „Individuals: You’ll need to enter the following for display on your App Store product pages: Address or P.O. Box Phone number Email address”; „Even if you don’t distribute apps in the EU, you’ll still need to declare a trader status.”

### 13. Ekran pomocy przy problemie hazardowym ma datowane, okresowo sprawdzane numery dla każdego kraju sprzedaży — obszar: treść
Numery infolinii się zmieniają. Strona NCPG podaje dziś 1-800-MY-RESET, a dawny numer 1-800-GAMBLER nie występuje w jej surowym tekście. Wpisany na sztywno numer zestarzeje się bez wydania aplikacji.
- `https://www.ncpgambling.org/help-treatment/`: „Call. 1-800-MY-RESET Text. 1-800-MY-RESET Chat. Chat Online”; „the National Problem Gambling Helpline™ ( 1-800-MY-RESET ) to help connect you with local resources.”

### 14. Budowanie i wydanie mieszczą się w darmowych limitach, a tempo wydań jest do nich dopasowane — obszar: wydanie
Standardowe runnery GitHub dla repozytoriów publicznych są darmowe, większe runnery płatne. Darmowy EAS daje 15 buildów iOS miesięcznie, w kolejce o niskim priorytecie i z jednym zadaniem macOS naraz. Więcej niż ok. 3 buildy TestFlight tygodniowo albo przejście na repo prywatne oznacza koszt.
- `https://docs.github.com/en/billing/concepts/product-billing/github-actions`: „The following usage remains free independently and does not reduce the included compute usage: Standard GitHub-hosted runners in public repositories.”; „Larger runners are billed for public repositories.”
- `https://expo.dev/pricing`: „Free … $ 0 /MONTH … Includes: 15 Android and 15 iOS builds Low-priority queue”; „5 concurrencies, up to 1 on macOS”

### 15. Wzrost bez budżetu reklamowego: lokalizacja i ASO jako przewaga — obszar: wzrost
Trzej główni konkurenci mają tylko EN, a jedyny zlokalizowany (Poker Skill, 8 języków) kupuje ruch reklamami. Przy 0 zł zostają metadane w wielu językach. Sklep US pokazuje też metadane m.in. po hiszpańsku (Meksyk), chińsku i wietnamsku, więc 35 języków działa na wzrost już w rynku głównym, pod warunkiem spójnej terminologii pokerowej w każdym z nich.
- `https://developer.apple.com/help/app-store-connect/reference/app-store-localizations`: wiersz „USA United States English (US) Arabic, Chinese (Simplified), Chinese (Traditional), French, Korean, Portuguese (Brazil), Russian, Spanish (Mexico), Vietnamese”
- `https://itunes.apple.com/lookup?id=<ID>&country=us`: `languageCodesISO2A` = ['EN'] dla 6590603158, 1488850006, 6478522482; ['EN','FR','DE','IT','JA','KO','PT','ES'] dla 6748104711.
- `https://apps.apple.com/us/app/id6748104711?see-all=reviews` (2026-02-20, 5★): „Just saw an ad for this on Instagram and decided to give it a shot.”
