# Apple Ads (dawniej Search Ads): czy da się zobaczyć popularność fraz bez Maca i bez kampanii

Sesja AF (rola 10/11, tylko dokumenty), 2026-11-09, zadanie z D-377 (B). Źródła: strony Apple pobrane curl-em 2026-11-09 ok. 21:55 UTC i przeczytane jako tekst (cytaty dosłowne). Streszczenia wyszukiwarki posłużyły tylko do znalezienia adresów.

## Wynik w skrócie

| Pytanie | Odpowiedź | Pewność |
|---|---|---|
| Czy konto zakłada się i obsługuje w przeglądarce, bez Maca? | **Tak.** Apple wymienia Windows 10 i Chrome 125 jako wspierane | przeczytane (S1, S2) |
| Czy można założyć konto **dziś**, przed premierą w App Store? | **Raczej nie.** Apple wymaga aplikacji „currently on the App Store”. Szkoła Pokera jest dziś tylko w TestFlight | przeczytane (S2); „Certain exceptions apply”, ale bez opisu wyjątków |
| Gdzie widać popularność fraz? | W narzędziu podpowiedzi słów kluczowych w koncie i na stronie rekomendacji, w skali 1–5 | przeczytane (S3, S4, S5) |
| Czy popularność widać bez uruchomionej i opłaconej kampanii? | **Nie wiadomo.** Apple nie pisze tego wprost. Karta płatnicza jest krokiem zakładania konta, a kampania bez niej „won’t run” | otwarte pytanie (S1, S6) |
| Koszt | Za samo konto Apple nie podaje opłaty. Kampanie rozlicza się za kliknięcie (CPT). Apple wspomina o „100 USD credit” na start, z zastrzeżeniem w przypisie (*), którego nie czytaliśmy | przeczytane (S7); warunki kredytu niesprawdzone |

**Wniosek dla właściciela:** dziś (przed wydaniem w App Store) konta najpewniej nie da się dokończyć, bo Apple wymaga aplikacji obecnej w sklepie. Rekomendacja: konto Apple Ads po premierze 1.0. Słowa kluczowe nowych języków powstały teraz na darmowych danych (`docs/sklep/aso/README.md`). Popularność z Apple Ads posłuży do ich poprawki w 1.0.1/1.1. Zanim karta zostanie podpięta albo kampania uruchomiona, potrzebna jest osobna zgoda na koszt (CLAUDE.md: koszty tylko za zgodą).

## Kroki (po premierze 1.0 w App Store)

1. Komputer z **Windows 10 lub nowszym**, przeglądarka **Chrome 125+** (Mac niepotrzebny, S2). Telefonu Apple nie wymienia jako wspieranego sposobu dostępu.
2. Wejdź na ads.apple.com, wybierz **Advanced** (podpowiedzi słów kluczowych z popularnością są opisane dla kampanii w wynikach wyszukiwania, czyli w Advanced; Basic działa automatycznie, S7) → „Get Started”.
3. Zaloguj się **tym samym kontem Apple**, które ma w App Store Connect rolę Admin, Legal, App Manager albo Marketing. Konto Apple musi mieć adres e-mail, bo same numery telefonu Apple odrzuca (S2).
4. Wypełnij ustawienia: nazwa konta, kraj, **waluta i strefa czasowa** (potem niezmienne, S1), nazwa podmiotu, kontakt. Zaakceptuj warunki, wypełnij „Business Details” (dane podatkowe; osoba fizyczna: „No” przy pytaniu o podmiot gospodarczy, S1).
5. Metoda płatności (S1, S6): Visa, Mastercard albo American Express, także debetowa. Karty przedpłacone i PayPal są niedozwolone. **Tu zatrzymaj się**, jeśli nie chcesz podawać karty: Apple nie pisze, czy podpowiedzi słów kluczowych otworzą się bez niej (otwarte pytanie P-AF3).
6. Utwórz szkic kampanii „Search results” dla kraju (np. United States), **bez jej uruchamiania**. W grupie reklam otwórz dodawanie słów kluczowych i wpisz frazę (np. „poker trainer”). Narzędzie pokaże podobne frazy z popularnością 1–5 (S4: „The tool displays keyword popularity based on App Store searches”).
7. Zapisz w notatce: kraj, fraza, popularność. Sesja ASO wpisze to do `docs/sklep/aso/` i poprawi słowa kluczowe (osobna decyzja). Kampanii nie uruchamiaj bez zgody na koszt.

## Źródła (odczyt 2026-11-09)

| # | Adres | Cytat |
|---|---|---|
| S1 | ads.apple.com/app-store/help/get-started/0004-set-up-an-account | „Click the Get Started button to set up an Apple Ads Advanced account […] Sign in using your Apple Account. […] Accept the Apple Advertising Services Terms of Service. Complete the Business Details page with tax information. Set up your payment method. Note that once you set the time zone and currency for your account, you cannot change them.” |
| S2 | ads.apple.com/app-store/help/get-started/0052-solve-setup-and-access-issues | „Supported operating systems macOS High Sierra 10.13.2 or later Windows 10 or later Supported browsers Safari 15 or later Chrome 125 or later” · „To set up an Apple Ads account, you must have an app for iPhone or iPad currently on the App Store in the available countries and regions. You must also have an email address associated with your Apple Account. Apple Accounts that use phone numbers only aren’t accepted. Certain exceptions apply” · „You must be assigned the Admin, Legal, App Manager, or Marketing role in your App Store Connect account to link accounts to Apple Ads.” |
| S3 | ads.apple.com/app-store/help-glossary | „search popularity A relative indicator of an Apple Ads keyword’s popularity. The search popularity indicator is designed to help you learn which keywords in search results campaigns might be most important for promoting your app. Search popularity is displayed as numbers from 1 to 5, with 5 being the most popular.” |
| S4 | ads.apple.com/app-store/best-practices/keywords | „You can also use the keyword suggestion tool in your account to find related terms. The tool displays keyword popularity based on App Store searches.” |
| S5 | ads.apple.com/app-store/help/recommendations/0055-review-recommendations | „Search Popularity: The popularity of a keyword, based on App Store searches. Search popularity is displayed as numbers from 1 to 5, with 5 being the most popular.” |
| S6 | ads.apple.com/app-store/help/get-started/0030-set-your-payment-method | „Your Apple Ads campaign won’t run until your account includes a valid payment method. […] Apple Ads accepts Visa, Mastercard (including Apple Card), and American Express. […] Invalid forms of payment include pre-paid cards, gift cards […] and digital wallets such as PayPal and Venmo.” |
| S7 | searchads.apple.com/basic, searchads.apple.com/advanced | Basic: „Our intelligent automation will optimize your search results app promotions for you” · Advanced: „pick your own keywords or use the ones suggested” · „Try it for free with a 100 USD credit. *” |

## Otwarte

- P-AF3: czy podpowiedzi słów kluczowych z popularnością są dostępne przed dodaniem karty i bez uruchomionej kampanii? Apple tego nie opisuje. Rozstrzygnie dopiero próba właściciela w kroku 5–6.
- Warunki kredytu 100 USD (przypis „*”): nieprzeczytane. Sprawdzić przed decyzją o kampanii.
- Wyjątki od wymogu „currently on the App Store” („Certain exceptions apply”): nieopisane. Nie zakładamy, że nas dotyczą.
- Dostępność Apple Ads w danym kraju (strona „Countries and Regions”): nieprzeczytana. Dla US jest dostępne (przykłady Apple w USD).
