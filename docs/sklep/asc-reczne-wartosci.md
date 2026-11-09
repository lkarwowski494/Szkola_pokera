# App Store Connect: wartości do wpisania ręcznie (wersja 1.0)

Stan: 2026-11-09, sesja Z (tylko dokumenty, rola 10 prawo/sklep), wejście `a30188b`. Tryb nocny D-359: rekomendacje przyjęte jako A „przyjęta wg D-359”, do weta rano. To nie jest opinia prawna (OP-13).

**Wyjątek nazwany (prompt roli):** `add_repo lkarwowski494/prompts` odrzucone przez klasyfikator trybu auto, więc `assemble.mjs 10-prawo-sklep` nie uruchomiony. Rola według planów w repo: zakres D-01/D-02 i dokumenty roli 10 (`docs/wydanie/sklep.md`, `app-privacy.md`, `legalnosc/*.md`, `konkurencja/storefronty.md`). Ryzyko: brak modułów roli z repo `prompts`. Tańsza kontrola: zasady z CLAUDE.md (przeczytane źródło z adresem i cytatem, D-191, próg wydania), a każdy wiersz niżej ma źródło przeczytane w tej sesji.

**Źródła przeczytane dziś** (pobrany HTML/JSON, cytaty dosłowne; kopie w scratchpadzie sesji):

| ID | Adres | Co |
|---|---|---|
| AR-1 | developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions | pytania ankiety i progi |
| AR-2 | …/manage-app-information/set-an-app-age-rating | kroki, override |
| PV-1 | …/reference/app-information/platform-version-information | App Review Information |
| KAT-1 | developer.apple.com/app-store/categories/ | opisy kategorii, wybór kategorii |
| API-1 | developer.apple.com/tutorials/data/index/appstoreconnectapi (indeks dokumentacji API, 1,6 MB) oraz `…/documentation/appstoreconnectapi/ageratingdeclaration/attributes-data.dictionary.json`, `…/appstorereviewdetail/attributes-data.dictionary.json` | co da się ustawić przez API |
| LK-1 | `https://itunes.apple.com/lookup?id=<24 id>&country=us&entity=software` | kategorie konkurencji, wynik: `dowody/kategorie-konkurencji-2026-11-09.json` |
| TR-1 | Trening `docs/48-zgloszenie-1-0.md` (2e4b0f8, odczyt 2026-11-09), wiersze 86–125 | analogia D-191: co Trening wpisał ręcznie, a co zrobił workflow |

## Kolejność (ok. 25 min właściciela)

App Store Connect → Apps → Szkoła Pokera. Role Apple: Account Holder, Admin lub App Manager (AR-2: „Required role: Account Holder, Admin, App Manager, or Marketing”).

| # | Krok | Gdzie | Sekcja | Czas |
|---|---|---|---|---|
| 1 | Kategoria | General → App Information → Category | §1 | 1 min |
| 2 | Ocena wiekowa | General → App Information → Age Ratings → Set Up Age Ratings | §2 | 5 min |
| 3 | App Privacy | General → App Privacy | §3 | 3 min |
| 4 | App Review Information | strona wersji 1.0 | §4 | 5 min, po W-04 |
| 5 | Dostępność w krajach | przez workflow produktów (D-356), wartość z §5 | §5 | zatwierdzenie `release` |
| 6 | Pozostałe pola ręczne | §6 | §6 | 5 min |

## 1. Kategoria (decyzja D-360)

**Wpisz:** Primary Category = **Education**. Secondary Category = **brak (puste)**.

Zasada Apple (KAT-1): „Your primary category should be the one that best describes the main function or subject matter of your app.” … „Research how similar apps are categorized” … „Choosing categories that are not appropriate for your app is against the App Review Guidelines.” Opis Education: „Apps that provide an interactive learning experience on a specific skill or subject.” Opis Games: „Apps that provide single or multiplayer interactive activities for entertainment purposes. For example: … board, card …”. Skutek gier (KAT-1): „Apps and games with Entertainment or Games selected as a primary or secondary category in App Store Connect will appear in the corresponding Time Allowance category.”

Wzorzec konkurencji (LK-1, US, 24 z 25 aplikacji top 25 nauki; „Learn Poker Offline” nie wróciła w wyniku): kategoria główna Education 9, Games 8, Utilities 4, Sports 2, Productivity 1; dodatkowa (gatunki poza główną) Card 12, Education 8, Casino 6, Games 4, Entertainment 4, Sports 3. Największe: GTO Preflop Wizard (3487 ocen) Education + Sports; Poker Trainer – Learn Poker Education + Games/Card/Casino; Solver+ Education + Entertainment; NTPoker Education + Productivity.

Analogia D-191 (TR-1, wiersz Z-20): „Kategoria główna Health & Fitness; brak kategorii dodatkowej” — Trening nie wybrał dodatkowej.

| Opcja | Wartość | Kompromis |
|---|---|---|
| **A (przyjęta wg D-359)** | Education, bez dodatkowej | opis Education pasuje do kursu wprost; zgodne z notatkami dla recenzenta („It is a course, not a game”) i z odpowiedzią Simulated Gambling = None (D-310); bez kategorii Games aplikacja nie trafia do limitu czasu „Games” w Czasie przed ekranem; jak Trening. Koszt: brak drugiej półki przeglądania |
| B | Education + Games (podkategoria Card) | najczęstsza para u konkurencji (Card 12×); widoczność w Games → Card. Koszt: limit „Games” w Czasie przed ekranem, sprzeczność z pozycjonowaniem „nie gra”, Games wymaga podkategorii; większe ryzyko pytań recenzenta o 5.3.4 |
| C | Education + Sports | jak lider GTO Preflop Wizard; opis Sports zawiera „instruction”. Koszt: poker jako sport to rozciągnięcie opisu Apple („professional, amateur, collegiate, or recreational sporting activities”), ryzyko „not appropriate” z KAT-1 |

Zmiana kategorii po wydaniu jest możliwa z kolejną wersją, więc A jest odwracalne. `store/asc-kontrola.json` ma `"kategoria": { "glowna": null }`: po wecie albo akceptacji sesja kodu wpisuje `EDUCATION` (zgłoszenie Z-01 niżej).

## 2. Ocena wiekowa (D-310, potwierdzona na zestawie pytań z dziś: D-362)

Zestaw pytań z AR-1 (odczyt dziś) ma **jedną kategorię więcej niż tabela D-310: „Guns or Other Weapons”** („References to or depictions of guns, weapons, or objects that may cause bodily harm.”). Odpowiedź: None (brak w treści). Pozostałe pytania i definicje bez zmian względem `docs/wydanie/sklep.md` §6. Pola API (API-1, `AgeRatingDeclaration.Attributes`) zgadzają się z listą: m.in. `gamblingSimulated`, `contests`, `lootBox`, `gunsOrOtherWeapons`, `healthOrWellnessTopics`, `ageRatingOverride`.

Wpisz po kolei (AR-2: „review the list of in-app controls and capabilities options, and select any that your app includes … then click Next”; „answering the questions and selecting the appropriate level of frequency”):

| Ekran | Pytanie (brzmienie Apple) | Odpowiedź | Podstawa |
|---|---|---|---|
| In-App Controls | Parental Controls | No | brak takich funkcji |
| In-App Controls | Age Assurance | No | brak; aplikacja nie woła Declared Age Range API |
| Capabilities | Unrestricted Web Access | No | brak WebView; linki otwierają system (`sklep.md` §6) |
| Capabilities | User-Generated Content | No | bez konta i serwera |
| Capabilities | Social Media | No | jw. |
| Capabilities | Social Media Disabled for Users Under 13 | No | nie dotyczy (brak mediów społecznościowych) |
| Capabilities | Messaging and Chat | No | jw. |
| Capabilities | Advertising | No | bez reklam (standard marki) |
| Mature Themes | Profanity or Crude Humor | None | — |
| Mature Themes | Horror/Fear Themes | None | — |
| Mature Themes | Alcohol, Tobacco, or Drug Use or References | None | `sklep.md` §6 (grep treści) |
| Medical or Wellness | Medical or Treatment Information | **Infrequent** | ekran „Pomoc” (lekarz, numer alarmowy); D-310 |
| Medical or Wellness | Health or Wellness Topics | **Yes** | M12 wariancja i tilt; D-310 |
| Sexuality or Nudity | Mature or Suggestive Themes | **Infrequent** | gra na pieniądze poza aplikacją jako temat; D-310 |
| Sexuality or Nudity | Sexual Content or Nudity; Graphic Sexual Content and Nudity | None | — |
| Violence | Cartoon or Fantasy; Realistic; Prolonged Graphic or Sadistic | None | — |
| Violence | **Guns or Other Weapons** (nowe) | None | brak w treści; D-362 |
| Chance-Based Activities | Gambling | None | brak stawek i waluty (NFR-ZGOD-001) |
| Chance-Based Activities | **Simulated Gambling** | **None** | definicja AR-1: „Betting or wagering without using real money …”; w aplikacji nie ma zakładu; D-310 |
| Chance-Based Activities | Contests | None | brak rywalizacji między użytkownikami (AR-1: „compete with one another”) |
| Chance-Based Activities | Loot Boxes | None | — |
| Age Categories and Override | — | **Override to Higher Age Rating → 18+** | D-310 (A, bez weta w D-341) |

Wynik z tabeli Apple przed override: **13+** (AR-1, 13+: „Infrequent medical or treatment information”; 9+: „Health and wellness topics”, „Infrequent mature or suggestive themes”). Override (AR-2): „App Store will display this specified age rating, and the content descriptions will still reflect your questionnaire answers.” „The override will apply in all regions where your app is available”. Made for Kids: nie zaznaczać. Korea: storefront KR wyłączony (§5), więc RCN nie dotyczy.

Otwarte z D-310 bez zmian: czy 18+ uruchamia dodatkowe potwierdzanie wieku w części krajów — **nie przeczytano** [DO SPRAWDZENIA przed wpisem].

## 3. App Privacy (D-307, NFR-PRYW-001; manifest D-326)

**Wpisz:** App Privacy → Get Started → **„No, we do not collect data from this app”** → Save → Publish. Privacy Policy URL: ten sam co w metadanych (zapisany już workflowem metadanych 2026-11-09 18:17, plan-08 „Koordynacja”); User Privacy Choices URL: puste.

Potwierdzenie z kodem (tylko odczyt, `a30188b`, 2026-11-09):
- sieć: `grep -E "fetch\(|XMLHttpRequest|WebSocket|axios"` w `apps/mobile/src`, `packages/*/src` (bez testów) — **0 trafień**; jedyne połączenia to StoreKit (dane zbiera Apple, `app-privacy.md` AP-3);
- SDK: 36 zależności w `apps/mobile/package.json`, żadna z nazw analityki, reklam, raportów awarii ani atrybucji (filtr: analytics, firebase, sentry, amplitude, mixpanel, ads, admob, facebook, segment, appsflyer, adjust, branch, bugsnag, crashlytics, posthog, tracking) — **0**;
- manifest `apps/mobile/app.json:16–25`: `NSPrivacyCollectedDataTypes: []`, `NSPrivacyTracking: false`, `NSPrivacyTrackingDomains: []`, FileTimestamp `C617.1` + `3B52.1` (D-326);
- „Napisz do nas” to `mailto:` (`apps/mobile/src/features/opinie/Opinie.tsx:44`, `:62`) — ryzyko brzegowe i plan B bez zmian (`app-privacy.md` 1f).

Przez API tego nie da się ustawić: w indeksie dokumentacji App Store Connect API (API-1) **0 tytułów** ze słowem „privacy” (sprawdzone dziś). To dowód z braku, nie cytat [OCENA]; zgodne z Treningiem (TR-1, Z-17: krok właściciela).

## 4. App Review Information

Pola (PV-1): „Contact: Name, email, phone number … Enter the phone number in international format, including a plus sign (+)”; „Notes … can contain up to 4000 bytes”; „Sign-in required: … If your app requires a login to use it.”

| Pole | Wartość |
|---|---|
| Contact First Name / Last Name | [DO USTALENIA — właściciel wpisuje w ASC, nie w repo] |
| Contact Phone | [DO USTALENIA] — format `+48 …` |
| Contact Email | [DO USTALENIA: W-04] |
| Sign-in required | **wyłączone** (brak konta; TR-1 Z-25) |
| Notes | tekst niżej (2491 bajtów < 4000) |
| Attachment | brak |

Tekst Notes: `store/review-notes.en.txt` z usuniętymi kluczami w nawiasach. Etykiety sprawdzone dziś z `apps/mobile/src/i18n/locales/en.json`: wszystkie 11 (`tabs.today` „Today”, `today.practice` „Practice session”, `start.begin` „Start”, `session.end` „End”, `start.fullAccess` „Full access”, `purchase.restore` „Restore purchases”, `settings.manage` „Manage subscription”, `data.title` „Data”, `settings.reset` „Delete progress”, `settings.help` „Help”, `placement.skip` „Skip”) są identyczne z roboczym przekładem, więc warunek 10-D01-04 jest spełniony. Ścieżka do ustawień (ikona koła zębatego na „Today”) w kodzie: `apps/mobile/src/app/(tabs)/index.tsx:94`; „Help” w zakładce postępu: `(tabs)/progress.tsx:80`.

Zostają warunki z `store/review-notes.md`: ścieżki przejść na buildzie kandydata (D-04), produkty IAP w tym samym zgłoszeniu, adres poczty (W-04) — bez niego usuń akapit CONTACT.

```text
Thank you for reviewing Poker School.

WHAT THE APP IS
- A course in No-Limit Texas Hold'em decision-making: lessons, exercises graded on four levels with an explanation, spaced reviews and module exams.
- No real-money gaming. There are no stakes, no chips or credits, no prizes, no leaderboards and no play against other people or bots. An exercise shows a situation and asks for a decision; the result is a grade and an explanation, never a win or a loss.
- The app does not take input from hands played elsewhere and gives no advice during live play. All hands come from the app's own course content.
- The app does not offer, link to or advertise any gambling operator.

NO ACCOUNT, NO SERVER
- No sign-in and no backend. Progress is stored only on the device. No demo account is needed.
- First launch: a welcome screen, then a short placement check (up to 8 questions); "Skip" works on every question.

IN-APP PURCHASES (one subscription group: quarterly and yearly auto-renewable subscriptions, plus a one-time lifetime unlock; no introductory offers or free trials)
- Free without purchase: all lessons, the placement check and the first attempt at each module exam. One more activity per day is free: a practice session, a review session or an exam retake.
- To reach the purchase screen: on the "Today" tab tap "Practice session", then "Start". This uses today's free activity. Close the session with "End", tap "Practice session" again and then "Full access".
- The purchase screen shows prices and periods from the App Store, the auto-renewal and cancellation terms, "Restore purchases", and links to the Terms of Use (Apple's standard EULA) and the Privacy Policy.
- Settings (gear icon on the "Today" tab): "Restore purchases"; "Manage subscription" appears when a subscription is active.
- Ongoing value (3.1.2(a)): new lessons, exercises and content corrections are added in regular updates, and new exercises are generated for spaced reviews. Users who prefer one payment can choose the lifetime unlock.

DATA
- No data is collected. The only network connections are App Store purchase calls (StoreKit).
- Settings > "Data": export progress to a file and import it. Settings > "Delete progress" asks for confirmation first.

RESPONSIBLE GAMBLING
- "Help" in Settings and in the Progress tab: where to find support for problem gambling (talk to a doctor or a mental health professional; emergency number; an international online support service).

CONTACT
- [SUPPORT EMAIL]
```

Uwaga: od K3 (D-349) aplikacja ma en, a recenzent zwykle ma telefon po angielsku; tekst zakłada interfejs en.

## 5. Dostępność w krajach (D-301, D-341)

**Wartość: 166 storefrontów** = 174 z tabeli Apple (`docs/wydanie/konkurencja/storefronty-apple.json`, odczyt 2026-11-09) minus 8:

| Kod | Powód |
|---|---|
| POL | CLAUDE.md / D-292 (art. 29 u.g.h.) |
| VNM | D-316 przyjęta w D-341 („VN nie”) |
| TUR | D-317 przyjęta warunkowo w D-341 — dopiero po odczycie T1 (`legalnosc/TR.md`) |
| KOR, CHN, AFG, GAB, MAR | sporne wg D-300, przyjęte w D-301 („nie teraz”) |

Lista do wklejenia w workflow (`dowody/storefronty-1.0.json`, pole `wlaczone_iso3`, 166 kodów ISO-3). JP jest na liście z warunkami J1–J2 (D-301); J2 = `docs/prawo/w07-jp-tokusho.md`.

Dwa kody do sprawdzenia przez sesję kodu na `GET /v1/territories` przed zapisem: Boliwia ma w tabeli Apple „BO”, a nie ISO-3 „BOL”; Kosowo „XKS” (`storefronty-apple.json`, pole `metoda`) [DO SPRAWDZENIA].

**Rozbieżność do naprawy (zgłoszenie Z-02):** `store/asc-kontrola.json` ma `"terytoria": { "wybrane": [8 krajów D-295] }` i `"dostepnosc": { "terytoria": null }` — sprzed D-301. Kontrola po włączeniu 166 krajów pokaże RÓŻNICĘ. Plik należy do sesji kodu (ta sesja zmienia tylko `docs/` i `store/*.md`).

## 6. Co robi workflow, a co ręcznie

Przez API da się ustawić (API-1): ocenę wiekową (`AgeRatingDeclarationUpdateRequest`, w tym `ageRatingOverride` z wartością `EIGHTEEN_PLUS`), kategorię (`AppInfoUpdateRequest.Data.Relationships.PrimaryCategory`/`SecondaryCategory`), App Review Information (`AppStoreReviewDetail.Attributes`: `contactFirstName`, `contactLastName`, `contactPhone`, `contactEmail`, `demoAccountRequired`, `notes`), dostępność (`AppAvailabilityV2CreateRequest` z `territoryAvailabilities`). Nie da się: App Privacy (§3).

| Wartość | Dziś robi | Rekomendacja |
|---|---|---|
| Nazwa, podtytuł, słowa kluczowe, opis, tekst promocyjny, Privacy/Support URL | `asc-metadane.yml` (zapisane 2026-11-09, plan-08 18:17–18:47) | bez zmian |
| Lokalizacje zakupów | `asc-iap-localizations.yml` | po produktach |
| Zrzuty | `asc-zrzuty.yml` (D-355) | bez zmian |
| Produkty, ceny, Family Sharing | `asc-produkty.yml` (D-356, port z Oczka; D-364: Family Sharing wył. wg monetyzacja.md) | bez zmian |
| **Dostępność aplikacji (166 krajów)** | `asc-produkty.yml` (D-364: port z Oczka ustawiał tylko zakupy; dodana dostępność aplikacji v2, nowe terytoria wył.) | lista z §5 = wejście workflowu (`store/produkty.json` → `storefronty-1.0.json`) |
| Kategoria | ręcznie (§1); `asc-kontrola` tylko odczyt | ręcznie, 1 min (jak Trening Z-20) |
| Ocena wiekowa | ręcznie (§2) | ręcznie: jednorazowa, a odpowiedzi wymagają oceny człowieka; API możliwe, ale nie warto budować dla jednego wpisu |
| App Review Information | ręcznie (§4); `asc-kontrola` czyta notatki z `store/review-notes.en.txt` | ręcznie: kontakt to dane osobowe, nie trafiają do repo |
| App Privacy | ręcznie (§3) | tylko ręcznie (brak API) |
| Copyright | ręcznie (TR-1, Z-15: „imię i nazwisko sprzedawcy; nie wpisujemy do repo”) | `2026 [IMIĘ I NAZWISKO]` |
| Cena aplikacji: darmowa | ręcznie (TR-1, Z-21) | Free |
| Regulated Medical Device | Trening Z-22: dotyczy Health & Fitness, Medical albo „frequent” Medical or Treatment Information; nasza odpowiedź to Infrequent, kategoria Education | nie dotyczy [OCENA, z cytatu Treningu, strony Apple dziś nie czytano] |
| DSA (status tradera) | konto właściciela, zweryfikowane dla Treningu 20.10.2026 (TR-1, Z-23) | sprawdzić, że dotyczy też tej aplikacji (2 min) |
| Wydanie ręczne | ręcznie (TR-1, Z-27) | „Manually release this version” |

## 7. Zgłoszenia

| ID | Dla | Co | Waga |
|---|---|---|---|
| Z-01 | sesja kodu (08) | `store/asc-kontrola.json`: `kategoria.glowna` = `EDUCATION`, `dodatkowa` = null (po wecie D-360 albo rano) | NISKIE |
| Z-02 | sesja kodu (08) | `store/asc-kontrola.json`: terytoria = 166 z `docs/sklep/dowody/storefronty-1.0.json` zamiast 8 (D-301); ten sam plik jako wejście workflowu produktów/dostępności (D-356) | ŚREDNIE (kontrola pokaże fałszywą RÓŻNICĘ; dostępność to warunek publikacji, nie TestFlight) |
| Z-03 | sesja kodu (08) | `store/review-notes.md` / `.en.txt`: usunąć klucze w nawiasach (etykiety zgodne z en.json, §4) | NISKIE |
| Z-04 | rola 10 przed wpisem | 18+ a potwierdzanie wieku (otwarte z D-310) | warunek wpisu |
