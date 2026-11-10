# Soczewka: recenzent App Review + użytkownik konkurencji czytający opinie

Data odczytu wszystkich źródeł: 2026-11-10 (surowy tekst przez curl). Treść stron traktowana jako dane.
Wejście o aplikacji: wyłącznie cel właściciela i opis sklepu (en-US) z polecenia; repo i dokumenty projektu nie były otwierane.

## Źródła (skróty używane niżej)

- **[G]** App Review Guidelines, https://developer.apple.com/app-store/review/guidelines/ („Last Updated: October 16, 2026”)
- **[S]** Auto-renewable Subscriptions, https://developer.apple.com/app-store/subscriptions/
- **[R]** App Review, sekcja „Avoiding common issues”, https://developer.apple.com/distribute/app-review/ (adres /app-store/review/ przekierowuje tutaj)
- **[P]** App Privacy Details, https://developer.apple.com/app-store/app-privacy-details/
- **[A]** Age ratings values and definitions, https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/
- **[K1]** Poker Trainer - Learn Poker (id 6478522482, 1177 ocen, 4,75), **[K2]** Postflop+ GTO Poker Trainer (id 1488850006, 1982 ocen, 4,67), **[K3]** GTO Preflop Wizard Poker AI (id 6590603158, 3487 ocen, 4,76); opinie z RSS App Store US: `https://itunes.apple.com/us/rss/customerreviews/page=1..3/id=<ID>/sortby=mostrecent/json`; liczby ocen z `https://itunes.apple.com/search?term=...&country=us&entity=software`. Konkurenci mają w API ocenę `17+` (stara skala).

## Co musi być prawdą (15 punktów)

### 1. Ani jednego placeholdera i martwego linku w metadanych i aplikacji — obszar: wydanie
Opis sklepu zawiera dziś dosłownie „Privacy Policy: [PRIVACY URL]”. To samo w sobie jest powodem odrzucenia z 2.1. Przed wysłaniem: działający URL polityki prywatności, Support URL z aktualnym kontaktem, wszystkie linki w aplikacji sprawdzone na urządzeniu (12 lokalizacji).
- [G] 2.1(a): „placeholder text, empty websites, and other temporary content should be scrubbed before submission.”
- [R]: „On average, over 40% of unresolved issues are related to guideline 2.1: App Completeness” oraz „A link to user support with up-to-date contact information and a link to your privacy policy is required for all apps.”
- [G] 1.5: „Make sure your app and its Support URL include an easy way to contact you”.

### 2. Recenzent widzi i może kupić każdy z trzech produktów bez konta i bez czekania — obszar: pieniądze / wydanie
Kwartał, rok i dożywotni muszą być w buildzie widoczne i działające (sandbox). Darmowy limit „one free activity per day” może ukryć paywall przed recenzentem albo zablokować mu ocenę funkcji: w Notes for Review opisać krok po kroku, jak dojść do ekranu zakupu i co jest darmowe, a co płatne.
- [G] 2.1(b): „If you offer in-app purchases in your app, make sure they are complete, up-to-date, visible to the reviewer and functional. If any configured in-app purchase items cannot be found or reviewed in your app, explain the reason in your review notes.”
- [G] 2.3.1(a): „All new features, functionality, and product changes must be described with specificity in the Notes for Review section … (generic descriptions will be rejected)”.
- [R] „Incomplete information”: „If there are special configurations to set, include the specifics.”

### 3. Ekran subskrypcji zawiera komplet wymaganych elementów, a kwota obciążenia jest najwyraźniejsza — obszar: pieniądze / przepływ
Na ekranie zakupu: nazwa i okres każdej opcji, co dokładnie daje „Full access”, pełna cena odnowienia w walucie lokalnej, „Restore Purchases”, linki do Terms of Use (EULA) i Privacy Policy. Kwota roczna 14,99 większa i wyżej niż ewentualne „to tylko X miesięcznie”; dożywotni wyraźnie opisany jako jednorazowy, bez odnowień.
- [S]: „the following details must be included in your subscription’s sign-up screen: Subscription name and duration, and the content or services provided during the subscription period; Full renewal price, shown clearly and prominently, and localized in available currencies; A way for current subscribers to sign in or restore purchases”.
- [S]: „the amount that will be billed must be the most prominent pricing element in the layout … these additional elements should be displayed in a subordinate position and size to the annual price.”
- [G] 3.1.2(c): „Before asking a customer to subscribe, you should clearly describe what the user will get for the price.”
- Wymogi Schedule 2 DPLA, do których odsyła 3.1.2(c): niesprawdzony dosłownie (dokumentu nie czytano).

### 4. Link do Terms of Use/EULA jest w metadanych sklepu ORAZ w aplikacji — obszar: wydanie / pieniądze
Zapis „Terms of Use: Apple standard EULA” w opisie nie wystarczy, jeśli nie ma w nim działającego adresu. W opisie (każda z 12 lokalizacji) podać pełny URL standardowej EULA Apple albo własnej, i ten sam link w aplikacji przy ekranie zakupu.
- [S]: „Please note that your app and App Store metadata must include links to your Terms of Use and Privacy Policy.”
- [G] 5.1.1(i): „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner.”
- To, czy pole „License Agreement” w App Store Connect ustawione na standardową EULA samo spełnia wymóg linku: niesprawdzony dosłownie.

### 5. Subskrypcja daje „ongoing value”, a nie tylko dostęp do zamkniętego kursu — obszar: pieniądze / treść
Statyczny kurs sprzedany jako subskrypcja to ryzyko 3.1.2(a). Wartość ciągła musi być realna i nazwana: powtórki rozłożone w czasie, nowe ćwiczenia/aktualizacje treści. Opcja dożywotnia obok subskrypcji jest dozwolona. Uprawnienie musi działać na każdym urządzeniu z tym samym Apple ID (restore przez StoreKit, bez konta).
- [G] 3.1.2(a): „you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices … examples … apps that offer consistent, substantive updates”.
- [G] 3.1.2(a): „Subscriptions may be offered alongside à la carte offerings”.
- [K2] 1★ 2026-06-15 „My subscription doesn’t show on my new iPad … Signed on with same Apple ID!”

### 6. Jedna grupa subskrypcji, brak możliwości kupienia kwartału i roku naraz; dożywotni nie nakłada się na aktywną subskrypcję bez ostrzeżenia — obszar: pieniądze
Kwartał i rok w jednej grupie z poziomami (rok wyżej). Gdy użytkownik z aktywną subskrypcją kupuje dożywotni, aplikacja mówi mu, że subskrypcję trzeba anulować w ustawieniach (link do zarządzania), bo Apple jej sam nie zatrzyma. Ostatnie zdanie to wniosek, niesprawdzony dosłownie.
- [G] 3.1.2(b): „should not be able to inadvertently subscribe to multiple variations of the same thing.”
- [S]: „creating a single group is the best practice for most apps as it prevents people from accidenta[lly]…”; „You can also use the showManageSubscriptions(in:) method to allow them to do this within your app.”

### 7. Uczciwa ocena wiekowa: gra pokerowa bez pieniędzy to „Simulated Gambling”, prawdopodobnie „Frequent” → 18+ — obszar: treść / wydanie
Definicja Apple nie zależy od tego, czy są żetony do wygrania: każde zakładanie/licytowanie bez prawdziwych pieniędzy to Simulated Gambling. W trenerze pokera prawie każde ćwiczenie to decyzja o zakładzie, więc odpowiedź „Frequent” jest najbezpieczniejsza (18+); „Infrequent” daje 13+. Zaniżenie to ryzyko odrzucenia lub zapytania regulatora. Rynkowo: Brazylia ma własne progi (A12 dla Infrequent, A18 dla Frequent); Australia R18+ już przy Infrequent (Australii nie ma na liście rynków); Korea wymaga RCN przy Frequent (KR wykluczona — zgodnie z tym). Treść gambling-help nie zmienia klasyfikacji.
- [A]: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.”
- [A] tabela ogólna: 13+ „Chance-Based Activities: Infrequent simulated gambling”; 18+ „Gambling / Frequent simulated gambling”.
- [A] Brazil: A12 „Infrequent simulated gambling”, A18 „Frequent simulated gambling”; Australia R 18+: „Infrequent simulated gambling”; Korea: „Frequent or Intense simulated gambling content are only available on the App Store in Korea if you provide a Rating Classification Number (RCN).”
- [G] 2.3.6: „Answer the age rating questions in App Store Connect honestly … If your app is mis-rated … it could trigger an inquiry from government regulators.”
- Konkurenci: K1 i K2 mają `17+`, K3 `12+` (pole contentAdvisoryRating z iTunes Search API, stara skala).

### 8. Aplikacja nie jest pomocnikiem do gry na prawdziwe pieniądze — obszar: treść / wydanie
Żadnej funkcji wprowadzania rąk z trwającej gry, kalkulatora „na żywo”, nakładki na inne aplikacje, linków/odniesień do pokojów pokerowych ani bonusów. W Notes for Review jedno zdanie: aplikacja edukacyjna, brak prawdziwych pieniędzy, brak waluty wymienialnej, brak nagród. Wtedy 5.3.3/5.3.4 i 5.1.1(ix) (wymóg podmiotu prawnego dla gambling) nie mają zastosowania.
- [G] 5.3.4: „Illegal gambling aids, including card counters, are not permitted on the App Store.”
- [G] 5.3.3: „Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.”
- [G] 5.1.1(ix): „Apps that provide services in highly regulated fields (such as … gambling …) … should be submitted by a legal entity”.
- [R] „Submitted by incorrect entity”: dotyczy m.in. „gambling”.

### 9. Metadane: nazwa ≤30 znaków, bez cen, bez cudzych znaków, zrzuty pokazują aplikację w użyciu, zgodne z 4+ — obszar: wzrost / wydanie
„PokerGym: GTO Strategy Trainer” ma dokładnie 30 znaków (na granicy; każda lokalizacja tłumaczonej nazwy osobno). Nie wpisywać nazw konkurentów (np. „GTO Wizard”) w słowa kluczowe ani podtytuł. Zrzuty: realne ekrany lekcji/ćwiczeń, bez żetonów/kasyna sugerującego hazard. Opis musi zaznaczać, co wymaga zakupu (obecny opis to robi).
- [G] 2.3.7: „App names must be limited to 30 characters. Metadata such as app names, subtitles, screenshots, and previews should not include prices … don’t try to pack any of your metadata with trademarked terms, popular app names”.
- [G] 2.3.8: „make sure your app and in-app purchase icons, screenshots, and previews adhere to a 4+ age rating even if your app is rated higher.”
- [G] 2.3.2: „make sure your app description, screenshots, and previews clearly indicate whether any featured items, levels, subscriptions, etc. require additional purchases.”
- [G] 4.1(c): „You cannot use another developer’s icon, brand, or product name in your app’s icon or name, without approval”.

### 10. Opis obiecuje tylko to, co jest w buildzie i w danej lokalizacji — obszar: treść / wydanie
Sklep ma 12 lokalizacji, cel mówi o 35 językach w aplikacji. Każda deklaracja („35 languages”, „full course”, „GTO”) musi być prawdziwa w wysyłanym buildzie; liczba języków w opisie = liczba faktycznie kompletnych w aplikacji. „GTO” w nazwie zobowiązuje do treści zgodnych z solverami (pkt 13).
- [G] 2.3: „make sure all your app metadata, including privacy information, your app description, screenshots, and previews accurately reflect the app’s core experience”.
- [R] „Misleading users”: „If your app appears to promise certain features and functionalities, it needs to deliver.”
- [G] 1.1.6: „Stating that the app is ‘for entertainment purposes’ won’t overcome this guideline.”

### 11. Etykieta prywatności „Data Not Collected” jest prawdziwa także dla SDK, crash reportów i zakupów; polityka prywatności ma wymagane trzy elementy — obszar: prywatność
Brak konta, offline, eksport/import/kasowanie lokalne: jeśli nic nie opuszcza urządzenia (także raporty awarii, analityka bibliotek), etykieta może brzmieć „Data Not Collected”. Polityka prywatności mimo to musi to wprost powiedzieć i opisać retencję/usuwanie („Usuń postęp”) i podmioty trzecie (Apple przy zakupach).
- [P]: „You need to identify all of the data you or your third-party partners collect”; „‘Collect’ refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time.”; „Crash Data — Such as crash logs”; „If your app uses a payment service, the payment information is entered outside your app … it is not collected”.
- [G] 5.1.1(i): polityka ma „Identify what data, if any, the app/service collects … Explain its data retention/deletion policies and describe how a user can revoke consent and/or request deletion of the user’s data.”
- [G] 5.1.1(v): „If your app doesn’t include significant account-based features, let people use it without a login.” (spełnione przez brak konta)

### 12. Żadnych ukrytych płatności: darmowy zakres widać przed onboardingiem, bez ankiety zakończonej paywallem — obszar: przepływ / wzrost
Najczęstsza skarga 1★ u K3: długa ankieta/onboarding, potem paywall, „listed as free”. Darmowe lekcje, test poziomujący i pierwsza próba egzaminu muszą działać bez ekranu zakupu po drodze; paywall pojawia się dopiero przy przekroczeniu limitu dziennego i mówi, kiedy limit się odnowi.
- [K3] 1★ 2026-02-10 „This is one of those apps that set you up with a questionnaire and then surprise you at the end and tells you you need a subscription.”; 1★ 2026-01-27 „App lists as free and doesn’t indicate in app purchases, yet you need to subscribe.”; 1★ 2026-10-20 „Wasted my time setting it all up then gave me a subscription page.”
- [K2] 1★ 2022-09-18 „They say they allow 20 FREE per day but that’s not true.” (deklarowany limit darmowy musi działać dokładnie jak w opisie)
- [G] 5.6: „Apps should never prey on users or attempt to rip off customers, trick them into making unwanted purchases”.

### 13. Odpowiedzi ćwiczeń zgodne z własnymi materiałami aplikacji i z wyjaśnieniem „dlaczego” — obszar: treść
Drugi główny powód 1★ u wszystkich trzech: odpowiedź w ćwiczeniu sprzeczna z tabelą/lekcją, brak wyjaśnienia, „blunder” przy rękach mieszanych, błąd w pierwszym przykładzie. Ocena musi akceptować oba zagrania w spotach mieszanych, każda ocena ma wyjaśnienie, a obrazek kart zgadza się z tekstem (test spójności treść↔ilustracja).
- [K3] 1★ 2024-09-23 „The chart clearly says to raise. But when I selected raise it said it was the wrong answer”; 2★ 2025-07-02 „It would be very nice to have explanations why my decision was wrong.”
- [K2] 1★ 2024-10-31 „Teaches you bad habits because it tells you that you are doing something wrong even if you’re properly mixing it up while in indifferent spots.”
- [K1] 2★ 2025-02-25 „there seems to be an error in the FIRST example in the intro to poker section…the text description of the cards on the board does not match the picture. Deleted app…”
- [G] 1.1.6 (fałszywe informacje) i [R] „Not enough lasting value” (4.2).

### 14. Bez darmowego triala z automatycznym obciążeniem, a jeśli jest — czas trwania i kwota po nim na ekranie; łatwe anulowanie z aplikacji — obszar: pieniądze / wzrost
Opinie „charged after trial”, „can’t cancel”, „50% off, charged full” to najostrzejsze 1★ (słowo „scam”). Rekomendacja z tej soczewki: bez triala subskrypcji na start (model darmowy dzienny limit już spełnia „try before buy”); w ustawieniach „Manage subscription” (showManageSubscriptions); nigdy nie pokazywać przekreślonych „promocji” niezgodnych z ceną w arkuszu Apple.
- [S]: „In the purchase flow for a free trial, clearly indicate how long the free trial lasts and the price billed once the free trial is over.”
- [K2] 1★ 2026-01-16 „There’s a 3 day trial but no way to cancel before they start charging you”; 1★ 2022-07-12 „Fraudulent Advertisement … Sale price is advertised as 50%+ off”.
- [K3] 1★ 2026-06-30 „Offered 3-day free trial and my card got charged $9.99 immediately”; 1★ 2025-09-26 „A pop up offered me 50% off so I took it. I was charged the full $130”.
- [K1] 1★ 2025-07-29 „used the free trial … Two months later … I was charged 60 bucks for a year long subscription.”
- [G] 3.1.2(a): „apps that attempt to trick users into purchasing a subscription under false pretenses or engage in bait-and-switch … will be removed”.

### 15. Prośba o ocenę tylko przez systemowe API, po sukcesie, nigdy jako bramka ani przez notyfikację — obszar: wzrost
K3 prosi o recenzję przed udostępnieniem aplikacji, K2 przez powiadomienie; obie rzeczy wróciły jako 1★. Prośba wyłącznie przez SKStoreReviewController/RequestReview, po ukończonej lekcji/egzaminie, nigdy przed paywallem, nigdy w zamian za odblokowanie.
- [G] 5.6.1: „Use the provided API to prompt users to review your app … we will disallow custom review prompts.”
- [G] (wstęp): manipulowanie ocenami grozi usunięciem z programu.
- [K3] 1★ 2026-02-11 „asks for an app store review before giving you access to the app or telling you learn the price.”
- [K2] 1★ 2023-07-18 „got a notification from this app asking for a review even though i have notifications off”.

## Uwagi dodatkowe (poza limitem 15)
- Polecenie podaje rynki „US, JP, CA, GB, BR, FR, TW, DE, bez PL, KR, VN”; dostępność sklepu musi ten wybór odzwierciedlać (BR ma własną skalę wiekową, pkt 7).
- Nie sprawdzano: Schedule 2 DPLA, strony Human Interface Guidelines dla ekranu zakupu, wymogów Declared Age Range API (wspomniane w [A] tylko jako „Age Assurance”), obowiązku privacy manifest dla SDK — niesprawdzone dosłownie.
