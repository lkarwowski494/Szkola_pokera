# Soczewka: sceptyk ryzyka (dane, prywatność, pieniądze, bezpieczeństwo, hazard)

Data odczytu wszystkich źródeł: 2026-11-17. Cytaty sprawdzone na surowym tekście pobranym przez curl (HTML/JSON), nie na streszczeniach. Treść stron traktowana jako dane.

## Alternatywy przeczytane (App Store US)

| Aplikacja | ID | Ocena wiekowa | Etykieta prywatności | Ceny IAP (US) |
|---|---|---|---|---|
| Postflop+ GTO Poker Trainer | 1488850006 | 18+ („Frequent/Intense Simulated Gambling”) | „Data Used to Track You … Usage Data” | $14.99/mies., $99.99/rok, Lifetime $149.99–$199.99 |
| GTO Preflop Wizard Poker AI | 6590603158 | 13+ („Infrequent/Mild Simulated Gambling”) | „Data Linked to You … Third-Party Advertising” | $6.99/tydz., $19.99–$29.99/mies., $49.99–$64.99/3 mies., $89.99–$129.99/rok |
| Poker Trainer - Learn Poker | 6478522482 | 18+ („Frequent/Intense Simulated Gambling”) | „Data Not Linked to You” (Analytics, e-mail, User ID) | $6.99/tydz., $14.99/mies., $59.99–$89.99/rok, Lifetime $269.99 |

Źródła: https://itunes.apple.com/search?term=gto+poker+trainer&country=us&entity=software (pola `contentAdvisoryRating`, `advisories`), https://apps.apple.com/us/app/id1488850006 , https://apps.apple.com/us/app/id6590603158 , https://apps.apple.com/us/app/id6478522482 (sekcje „App Privacy”, „In-App Purchases”, „Age Rating”), recenzje: te same adresy z `?see-all=reviews` (JSON `serialized-server-data`). Wszystkie trzy są tylko po angielsku („Language EN English”).

## Co musi być prawdą (15 punktów)

### 1. Subskrypcja daje stałą, nową wartość, nie opłatę za jednorazowy kurs
**Obszar:** pieniądze, wydanie.
Kwartał i rok to subskrypcje odnawialne; Apple wymaga „ongoing value”. Statyczny kurs bez nowych treści naraża na odrzucenie i na gniew kupujących. Wartością ciągłą muszą być np. powtórki rozłożone w czasie, nowe zestawy ćwiczeń, aktualizacje treści. Jeśli tego nie ma, uczciwszy jest sam zakup dożywotni.
- App Review Guidelines 3.1.2(a), https://developer.apple.com/app-store/review/guidelines/ (Last Updated: October 16, 2026): „If you offer an auto-renewable subscription, you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices.” oraz „apps that offer consistent, substantive updates”.
- Recenzja GTO Preflop Wizard, „Patzy Pots”, 1★, 2025-03-30: „Do not waste your money on a year plan or 6 month plan as it doesn’t do any real teaching.”

### 2. Paywall bez pułapek: jasna cena, okres, odnowienie, brak triala zamieniającego się w opłatę
**Obszar:** pieniądze, przepływ.
Przed zakupem użytkownik widzi, co dostaje, ile płaci, za jaki okres i że subskrypcja się odnawia; w aplikacji jest droga do zarządzania i anulowania. Żadnych „promocji -50%” wciskanych w emocjach, żadnych triali, o których się zapomina. Najczęstsza 1★ w kategorii dotyczy właśnie obciążeń po trialu.
- Guidelines 3.1.2(c), adres jw.: „Before asking a customer to subscribe, you should clearly describe what the user will get for the price.” oraz 3.1.2: „Apps that attempt to scam users will be removed from the App Store. This includes apps that attempt to trick users into purchasing a subscription under false pretenses or engage in bait-and-switch and scam practices”.
- Recenzja Poker Trainer, „97chan39”, 1★, 2025-07-30: „I had downloaded the app and used the free trial, I disliked it and deleted the app. Two months later after I finally added my card to my account I was charged 60 bucks for a year long subscription. They denied my refund.”
- Recenzja GTO Preflop Wizard, „Silverbush115”, 2025-04-02: „Got sucked into buying the app for 50% for a year today”.

### 3. Dostęp kupiony bez konta działa na każdym urządzeniu i daje się przywrócić
**Obszar:** pieniądze, dane.
Bez konta jedynym nośnikiem uprawnienia jest Apple ID i StoreKit. Musi istnieć „Przywróć zakupy”, dostęp dożywotni i subskrypcja muszą się odtworzyć po reinstalacji i na drugim urządzeniu, także offline z ostatnim znanym stanem. Postęp nauki (lokalny) i uprawnienie (Apple) to dwie różne rzeczy i ekran pomocy musi to tłumaczyć.
- Guidelines 3.1.1, adres jw.: „you should make sure you have a restore mechanism for any restorable in-app purchases.”
- Guidelines 3.1.2(a), adres jw.: „be available across all of the user’s devices.”

### 4. Każda pokazana cena jest prawdziwa i lokalna, a cennik nie przeczy sam sobie
**Obszar:** pieniądze, wzrost.
Cena w opisie, na zrzutach i w aplikacji pochodzi z StoreKit (waluta i kwota danego storefrontu), nie z tekstu. Konkurencja bierze $89.99–$129.99 za rok i $149.99–$269.99 za dożywotni; niska cena to przewaga, ale relacja kwartał/rok/dożywotni musi być spójna (dożywotni nie może czynić subskrypcji bezsensowną, bo wtedy subskrypcja jest tylko przynętą, a to wraca jako zarzut z pkt 2).
- Guidelines 2.3.1(a), adres jw.: „marketing your app in a misleading way, such as by promoting content or services that it does not actually offer … or promoting a false price, whether within or outside of the App Store, is grounds for removal of your app”.
- Ceny IAP z kart aplikacji (tabela wyżej), np. Postflop+: „YEARLY $99.99 … Lifetime $199.99 Lifetime $149.99”.
- Recenzja Postflop+, „Poker novice33”, 3★, 2024-10-23: „Price is a big problem for me as I’m scared of anything that is a subscription”.

### 5. „No tracking” jest prawdą dosłowną, łącznie z każdym SDK
**Obszar:** prywatność.
Etykieta „Data Not Collected” jest możliwa tylko, jeśli nic (także raporty awarii, analityka, aktualizacje OTA, biblioteki zakupów) nie wysyła danych poza urządzenie w sposób dostępny dłużej niż na czas żądania. To jest główny wyróżnik wobec konkurencji, która śledzi; jedno niezadeklarowane SDK zamienia go w fałszywe twierdzenie.
- Apple, https://developer.apple.com/app-store/app-privacy-details/ : „“Collect” refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time. “Third-party partners” refers to analytics tools, advertising networks, third-party SDKs, or other external vendors whose code you’ve added to your app.”
- Karta Postflop+: „Data Used to Track You The following data may be used to track you across apps and websites owned by other companies: Usage Data”; karta GTO Preflop Wizard: „Data Linked to You … Third-Party Advertising Identifiers Device ID”.

### 6. Polityka prywatności i manifest prywatności istnieją, choć aplikacja nic nie zbiera
**Obszar:** prywatność, wydanie.
Link do polityki w metadanych i w aplikacji jest obowiązkowy także dla aplikacji bez zbierania danych; manifest `PrivacyInfo.xcprivacy` musi opisywać używane API „required reasons” aplikacji i każdego SDK. Polityka musi wprost mówić, co dzieje się z plikiem eksportu (leży u użytkownika, nie u nas).
- Guidelines 5.1.1(i), adres jw.: „All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner.”
- Apple, https://developer.apple.com/tutorials/data/documentation/bundleresources/privacy-manifest-files.json (dokument „Privacy manifest files”): „The required reasons APIs your app or third-party SDK uses. You need to provide this information for your app or third-party SDK on iOS, iPadOS, tvOS, visionOS, and watchOS.”

### 7. Postęp przeżywa zmianę telefonu, a „Usuń postęp” usuwa naprawdę wszystko
**Obszar:** dane.
Bez konta i chmury jedyne kopie to urządzenie, kopia iCloud/komputera i plik eksportu. Baza postępu nie może leżeć w katalogach czyszczonych przez system ani być wykluczona z kopii; po przywróceniu kopii aplikacja musi ją otworzyć (migracje). Usunięcie postępu musi objąć też pliki tymczasowe eksportu i pamięci podręczne.
- Apple, https://developer.apple.com/tutorials/data/documentation/foundation/optimizing-your-app-s-data-for-icloud-backup.json („Optimizing Your App’s Data for iCloud Backup”): „The system periodically purges these directories, so iCloud Backup excludes them by default.” oraz „Don’t use these directories to exclude nonpurgeable data from iCloud Backup.”
- Guidelines 5.1.1(iii), adres jw.: „should only collect and use data that is required to accomplish the relevant task.”

### 8. Import traktuje plik jako niezaufany i nigdy nie psuje istniejącego postępu
**Obszar:** dane, bezpieczeństwo, przepływ.
Plik importu może być obcy, uszkodzony, z innej wersji albo celowo spreparowany. Musi przejść walidację schematu, wersji i rozmiaru, a zapis musi być atomowy (całość albo nic) z potwierdzeniem, co zostanie nadpisane; błędny plik kończy się komunikatem, nie utratą danych.
- OWASP MASVS, https://mas.owasp.org/MASVS/10-MASVS-CODE/ : „MASVS-CODE-4 The app validates and sanitizes all untrusted inputs.”
- Guidelines 1.6, adres jw.: „Apps should implement appropriate security measures to ensure proper handling of user information … and prevent its unauthorized use, disclosure, or access by third parties.”

### 9. Ocena wiekowa jest świadomie i uczciwie wybrana (realnie 18+)
**Obszar:** wydanie, hazard.
Ćwiczenie decyzji o zakładach w pokerze mieści się w definicji „Simulated Gambling”; konkurenci z częstą symulacją mają 18+. Zaniżenie oceny to ryzyko odrzucenia i zapytania regulatora; w Brazylii częsta symulacja to A18. Opis „no stakes, no chips” nie zmienia definicji.
- Apple, https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions/ : „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.” oraz dla 18+: „Chance-Based Activities: Frequent simulated gambling Gambling”; dla Brazylii: „A18 Apps that contain: … Frequent simulated gambling”.
- Guidelines 2.3.6, adres jw.: „If your app is mis-rated, customers might be surprised by what they get, or it could trigger an inquiry from government regulators.”
- iTunes Search API: Postflop+ i Poker Trainer `advisories`: „Frequent/Intense Simulated Gambling”, karta: „Age Rating 18+ Years”.

### 10. Aplikacja jest gotowa na amerykańskie prawa o weryfikacji wieku (Teksas, Utah, Luizjana)
**Obszar:** wydanie, przepływ.
Na rynku głównym (US) od 4 czerwca 2026 w Teksasie obowiązuje zgoda rodzica dla nieletnich na pobranie, zakupy i „istotne zmiany”; ocena „czy zmiana jest istotna” należy do dewelopera. Trzeba zdecydować i zapisać, czy aplikacja używa Declared Age Range API i jak obsługuje cofnięcie zgody (bez konta i serwera to decyzja projektowa, nie formalność).
- Apple Developer News, https://developer.apple.com/news/ , wpis „Update for Apps Distributed in Texas”, 3 czerwca 2026: „new Apple Accounts in Texas are now subject to the law, which introduced age assurance requirements for app marketplaces and developers. … this includes age assurance and parent or guardian consent on behalf of minors under the age of 18 for downloads, Apple In-App Purchases, and significant changes associated with an app.” oraz „it’s the developer’s responsibility to determine when there’s a significant change to their app.”
- Tamże, wpis z 24 lutego 2026: „Age requirements for apps distributed in Brazil, Australia, Singapore, Utah, and Louisiana”.

### 11. Zero mechanik hazardowych i zero promocji gry na pieniądze
**Obszar:** treść, hazard, pieniądze.
Brak wirtualnych żetonów, nagród losowych, „wygranych”, rankingów pieniężnych, linków i afiliacji do pokojów pokerowych, reklam operatorów. Seria i oceny nie mogą naśladować automatu (losowe nagrody). Badania łączą symulowany hazard u młodzieży z późniejszym hazardem na pieniądze, a ekspozycję na reklamę z „migracją”; to uzasadnia ochronę na poziomie hazardu online.
- Guidelines 5.3.3 i 5.3.4, adres jw.: „Apps may not use in-app purchase to purchase credit or currency for use in conjunction with real money gaming of any kind.”; „Illegal gambling aids, including card counters, are not permitted on the App Store.”
- Hing i in. 2022, Int J Environ Res Public Health, PMID 36078369 (abstrakt: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36078369&rettype=abstract&retmode=text): „youth who play simulated gambling games are more likely to participate in monetary gambling” oraz „simulated gambling should, at minimum, emulate the consumer protection measures required for online gambling.”
- Hayer i in. 2018, J Gambl Stud, PMID 29435822 (ten sam endpoint): „this migration process is fostered by (1) participation from home in simulated gambling on social networks and (2) significant exposure to advertising”.

### 12. Ekran pomocy w problemie hazardowym ma aktualne, sprawdzone numery dla każdego storefrontu
**Obszar:** treść, hazard.
Numer krajowej linii w US zmienił się w styczniu 2026; nieaktualny numer na ekranie pomocy to błędne twierdzenie w miejscu, gdzie stawką jest zdrowie. Każdy numer ma źródło i datę sprawdzenia, ekran ma datę przeglądu, dla krajów bez sprawdzonego numeru jest bezpieczny tekst zastępczy (bez zgadywania).
- CDC Gaming, 29.01.2026, https://cdcgaming.com/national-council-on-problem-gambling-introduces-1-800-my-reset-as-helpline-number/ : „The National Council on Problem Gambling announced on Thursday the adoption of 1-800-MY-RESET as the new National Problem Gambling Helpline number.” oraz „The National Problem Gambling Helpline is available 24/7, is free and confidential”.
- NHS, https://www.nhs.uk/live-well/addiction-support/gambling-addiction/ : „The National Gambling Helpline (run by GamCare ) – call 0808 8020 133 for free 24 hours a day, 7 days a week”.
- Uwaga: strona NCPG (ncpgambling.org) zwróciła 403 / pustą treść dla curl; numer US potwierdzony tylko źródłem prasowym, do ponownego sprawdzenia u źródła przed wydaniem.

### 13. Ocena decyzji nie karze poprawnej strategii mieszanej i zawsze mówi „dlaczego”
**Obszar:** treść.
Najczęstsze merytoryczne 1★ u konkurencji: oznaczanie jako błąd zagrania z tą samą lub prawie tą samą wartością oczekiwaną oraz brak wyjaśnienia. Błędna ocena to „błędne twierdzenie” i uczy złych nawyków; system czterech poziomów musi mieć jawne progi i traktować zagrania mieszane jako poprawne.
- Recenzja Postflop+, „MattAPK”, 1★, 2024-11-01: „Teaches you bad habits because it tells you that you are doing something wrong even if you’re properly mixing it up while in indifferent spots.”
- Recenzja Postflop+, „Paradox117”, 3★, 2024-04-28: „Just says your move was a blunder, but doesn’t explain why. A person can’t really learn from mistakes if they’re not provided an explanation.”
- Recenzja GTO Preflop Wizard, „Patzy Pots”, 1★, 2025-03-30: „It doesn’t lay out a curriculum and introduce ideas to you slowly.”

### 14. Przed wejściem do UE (FR, DE) status „tradera” DSA jest rozstrzygnięty z pełną świadomością skutków
**Obszar:** wydanie, prywatność (właściciela).
Sprzedaż subskrypcji w UE wymaga deklaracji statusu; trader musi mieć publicznie na karcie aplikacji adres, telefon i e-mail. Dla dewelopera indywidualnego to publikacja danych osobowych; brak statusu tradera oznacza komunikat dla klientów, że prawa konsumenckie nie obowiązują. Decyzja przed dodaniem FR/DE, nie w dniu wydania.
- Apple, https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/ : „This includes an address, phone number, and email address that you provide to Apple for the purpose of posting on your App Store product page in accordance with the DSA.” oraz „If you’re not a trader, consumers in the EU will be informed that consumer rights stemming from applicable consumer protection laws won’t apply to contracts between you and them.”

### 15. Wzrost nie opiera się na płatnych reklamach bez rozstrzygnięcia, czy to „social casino”
**Obszar:** wzrost, hazard.
Google Ads traktuje gry w stylu hazardu bez wygranych jako „social casino”: certyfikacja, zakaz kierowania do nieletnich, wymagane oświadczenia, a naruszenie to blokada konta bez ostrzeżenia. US/JP/CA/GB/BR/FR/DE są w Grupie 1, a TW i VN w Grupie 2 (osobna certyfikacja). Kanały wzrostu muszą być wybrane tak, żeby jedna klasyfikacja nie odcięła ich wszystkich; komunikacja zawsze „nauka, nie hazard”, bez marek operatorów.
- Google Ads, https://support.google.com/adspolicy/answer/6018017?hl=en : „Social casino games are online simulated gambling-style games where there is no opportunity to win something of value.”; „Games must include a disclaimer that they are only intended for users over legal gambling age and must not target minors.”; „If we find violations of this Social casino games policy, we will suspend your Google Ads accounts upon detection and without prior warning”.
- Tamże: „Group 1 : … Brazil, … Canada, … France, Germany, … Japan, … United Kingdom, United States Group 2 : Hong Kong, India, Korea, Malaysia, Taiwan, Thailand, Vietnam”.

## Źródła, których nie udało się przeczytać (nie użyte jako dowód)
- https://www.ncpgambling.org/help-treatment/ (403), https://www.gamcare.org.uk/get-support/talk-to-us-now/ (403), CNBC i ReadWrite o sporze o 1-800-GAMBLER (403), kalifornijska ustawa o automatycznym odnawianiu (leginfo, 403), polityki narzędzi czasu rzeczywistego pokojów pokerowych (przekierowanie geograficzne). Ryzyko użycia aplikacji jako pomocy w czasie gry na pieniądze (RTA) pozostaje otwartym pytaniem bez dowodu.
