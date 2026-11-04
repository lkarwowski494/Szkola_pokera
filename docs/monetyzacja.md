# Monetyzacja: Szkoła Pokera
Stan: sesja 2, E3 (2026-11-03): kontrakt płatności i przekazanie; bramka opłacalności (krok 0) zakończona werdyktem „budować” (słaby dowód) · Aktualizacja: 2026-11-03 · Wejście: brak BRD (krok 0 przed rolą 01), decyzje właściciela z E0 w `docs/sztafeta.md`

Dane surowe: `docs/monetyzacja/e1-rynek-2026-11-03.json` (lookup, zakupy w aplikacji US/PL/DE/GB, 45 storefrontów, StatCounter, NBP, Google Play). Parsery: `docs/monetyzacja/iap.mjs`, `plany.mjs`. Niezależność (D-023): przed zapisaniem `oplacalnosc-wlasna.json` nie otwierano karty portfela ani dokumentu „Aplikacje Mobilne do Nauki Pokera”; otwarto dokument 07 (Dysk, za zgodą z przekazania) i ADR-11.

## Sesja 2, E0: rama (2026-11-03, po BRD roli 01)
Prompt: `assemble.mjs 02-monetyzacja --tryb build` (prompts c025063; moduły audyt-paywalla, cena-i-rachunek, rachunek, storekit-expo), przeczytany od kontraktu roli (część wspólna taka sama jak w prompcie roli 01 z tej sesji).

**Środowisko (2026-11-03, ok. 18:50 UTC):** `itunes.apple.com/search` → 200 (w E1 było 403: OP-01 można teraz zamknąć w E1), RSS recenzji → 200, `apps.apple.com/us/app/id…` → 301 na stronę aplikacji, `developer.apple.com` → 200. Konto App Store Connect jest, umowa Paid Apps podpisana (E0 bramki). Mac z Xcode: brak, więc testy StoreKit są krokiem właściciela. Kod: brak biblioteki płatności w `apps/mobile/package.json`; jest `@sentry/react-native` ~7.11.0 (do usunięcia, OP-12 w BRD, rola 05/08).

**Wejście z roli 01 jako hipotezy** (BRD `docs/brd/`, commit 6ab5453):
| ID | Treść (skrót) | Status przed tą sesją | Co sprawdzam |
|---|---|---|---|
| H-01 / ZAL-005 | darmowa część z prawdziwą nauką zwiększa sprzedaż; rekomendacja 01: lekcje darmowe, płatna wartość ciągła | hipoteza | E1.3 (WTP), E2 (podział dla 03) |
| H-09 / ZAL-011 | subskrypcja broni się powtórkami, scenariuszami i aktualizacjami (OG-05) | hipoteza | E2: reguła 3.1.2(a) wobec każdej opcji |
| ZAL-MON-01 | drabina 9,99 kwartał / 14,99 rok / 19,99 dożywotni kieruje do dożywotniego | hipoteza (właściciel) | E2: rachunek wariantów udziału planów |
| ZAL-006 | brak synchronizacji jest akceptowany; zakup przywraca sklep | hipoteza | E3: kontrakt (przywracanie, nowe urządzenie) |
| ZAL-009 | mnożniki bramki | hipoteza | bez zmian; OP-03, OP-07 |
| BR-ZAK-001–BR-ZAK-004, OG-05, OG-06, OP-16 | zakup, ujawnienia, przywracanie, anulowanie | wymagania | E3 |

**Reguły sklepu na dziś** (odczyt 2026-11-03, surowy tekst stron):
- App Review Guidelines, „Last Updated: October 16, 2026”. 3.1.1: „setting up a Non-Consumable IAP item at Price Tier 0 that follows the naming convention: “XX-day Trial.” Prior to the start of the trial, your app must clearly identify its duration, the content or services that will no longer be accessible when the trial ends”; „you should make sure you have a restore mechanism for any restorable in-app purchases”. 3.1.2(a): „you must provide ongoing value to the customer, and the subscription period must last at least seven days and be available across all of the user’s devices”. 5.6: „Apps should never prey on users or attempt to rip off customers, trick them into making unwanted purchases”.
- developer.apple.com/app-store/subscriptions: „clearly indicate how long the free trial lasts and the price billed once the free trial is over”; „the amount that will be billed must be the most prominent pricing element in the layout”; „A way for current subscribers to sign in or restore purchases”; „use the showManageSubscriptions(in:) method”.
- developer.apple.com/app-store/small-business-program: „a reduced commission rate of 15% on paid apps and Apple In-App Purchases”.
- Family Sharing (pomoc App Store Connect): „once you turn on Family Sharing for an In-App Purchases in App Store Connect, you can't turn it off” — decyzja w E2.
- Google Play, zasady subskrypcji (support.google.com/googleplay/android-developer/answer/9900533): „You must be transparent about your offer. This includes clearly and explicitly disclosing your offer terms, the cost of your subscription, the frequency of your…” (cytat urwany na końcu fragmentu; pełne brzmienie w E2).

**Sprzeczność do E3 (ADR z rolą 05):** ADR-18 „RevenueCat vs expo-iap” jest „Do decyzji”, a decyzja OP-12 (etykieta „Data Not Collected”) wyklucza praktycznie RevenueCat: biblioteka wymaga ujawnienia „Purchases” w App Privacy (wzorce roli, odczyt 18.10.2026; ponowny odczyt w E3).

**Plan i czas (agent / oczekiwanie / właściciel):**
- E1.3–E1.4: klasy WTP dla 35 BR z danymi konkurencji (`docs/brd/dane/`), wyszukiwanie z OP-01, statusy H i ZAL; ok. 2 h agenta, limit wyszukiwarki ok. 20 wywołań/min; właściciel: bramka E1 (1 pytanie).
- E2: co najmniej 3 opcje (decyzja z 2026-11-03: kwartał + rok + dożywotni; sam zakup dożywotni; sama subskrypcja), `rachunek.json` + `rachunek.mjs`, decyzje: okres próbny, Family Sharing, podział darmowe/płatne dla 03; ok. 2–3 h; właściciel: 3–4 pytania.
- E3: kontrakt płatności, szkic ADR biblioteki, wektory dostępu, przekazanie do 03, 04, 05, 07, 08; ok. 2 h; właściciel: bramka i kroki w App Store Connect (produkty, progi cen, zapis do Small Business Program, jeśli go nie ma).

## Zmiana podziału darmowe/płatne (decyzja właściciela 2026-11-03, po bramce E3)
- Pytanie właściciela: „Może jeszcze oprócz lekcji jakieś egzaminy i zapisywanie postępów jest płatne?”; propozycja właściciela: „lekcje i egzaminy i postęp darmowe ale dwa podejścia do egzaminów dziennie za darmo plus x sesji ćwiczeń za darmo plus ileś powtórek za darmo i ileś scenariuszy za darmo”.
- Decyzja: „Jedna dzienna pula (Recommended)” — lekcje, pierwsze podejście do egzaminu modułu, postęp i eksport zawsze darmowe; darmowa dzienna pula „N zadań dziennie” wspólna dla sesji ćwiczeń, powtórek, scenariuszy i powtórnych podejść do egzaminu; Pro (kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD) zdejmuje limit. Odrzucone: cztery osobne limity, pula z powtórkami bez limitu, bez zmian (wszystko poza lekcjami tylko w Pro).
- Płatne zapisywanie postępu: odrzucone przez rolę 02 jako niedozwolone (5.6: „trick them into making unwanted purchases … any other manipulative practices”; tabela „Etyka” wzorców roli: dane jako zakładnik); wzór Treningu (`docs/monetyzacja.md:33` w repo `trening`: historia zawsze dostępna) i Oczka (`README.md:140`: historia tylko do odczytu po próbie).
- Skutki: limit użycia, nie czasu, to nie okres próbny 3.1.1 (wzorce roli, „Kalibracja”), więc bez mechanizmu „XX-day Trial”; licznik jawny przed startem zadania, nie w trakcie; licznik odporny na ponowną instalację [DO USTALENIA] (OP-10: czy wystarczy licznik lokalny, skoro reset daje tylko jedną dodatkową aktywność dnia); wartość N = 1 aktywność dziennie (D-107; OP-11 rozstrzygnięte, korekta po danych ze sklepu przez bramkę zmian roli 03); zablokowana powtórka przesuwa harmonogram, nie kasuje danych — komunikat mówi to wprost. Ryzyko: skargi na „limit energii” u konkurencji (BRD, rynek) — limit musi być widoczny i hojny.
- Doprecyzowanie 2026-11-04 (rola 02 fix, D-107, D-111): N = 1 rozpoczęta aktywność dziennie (sesja ćwiczeń, kolejka powtórek, scenariusz albo powtórne podejście do egzaminu), aktywność zużywa limit przy starcie (decyzja właściciela „1 aktywność dziennie (Recommended)”, 2026-11-03; OP-11 rozstrzygnięte). Nazwa w dokumentach i interfejsie: „dzienny limit”, nie „pula” (w treści pokerowej pula = pot; jedna nazwa na jedno pojęcie, `CLAUDE.md`). Słowo „pula” zostaje tylko w cytatach decyzji.
- Zastępuje propozycję z bramki E2 („Wszystkie lekcje darmowe”: płatne sesje, powtórki, scenariusze bez darmowej części). Zależy od: ZAL-005.

## Decyzje właściciela na bramce E2 (2026-11-03)
- Model: „A: drabina 9,99/14,99/19,99” — potwierdza decyzję z 2026-11-03; odrzucone: B sam jednorazowy 19,99 (rekomendacja roli 02, 6 400,43 vs 5 199,87 USD norm.), C sama subskrypcja. Ryzyko przyjęte: drabina wymaga konwersji ≥ 1,23× zakupu jednorazowego, żeby mu dorównać; kontrola po wydaniu: App Store Connect (Sales and Trends, udział planów), 90 dni. Zależy od: ZAL-MON-01, ZAL-011.
- Podział darmowe/płatne (propozycja dla roli 03): „Wszystkie lekcje darmowe (Recommended)” — darmowe lekcje z ćwiczeniami w środku; płatne sesje ćwiczeń z oceną poza lekcją, powtórki, scenariusze; odrzucone: darmowe M0–M2, dzienny limit. Zależy od: ZAL-005 (H-01).
- Okres próbny i Family Sharing: „Bez próby, Family Sharing wył. (Recommended)”; odrzucone: Family Sharing wł., próba 7 dni. Obie decyzje odwracalne (włączenie później).
- Nowa sesja: „Nie”.

## Sesja 2, E3: kontrakt płatności (2026-11-03)
Dla ról 04, 05, 07, 08. Ceny US; inne kraje według tabel cen sklepów (krok właściciela w App Store Connect i Play Console). ID produktów to propozycja (prefiks z `apps/mobile/app.json`: `pl.lkarwowski.szkolapokera`); ID zatwierdza rola 05.

| Produkt (ID) | Typ | Cena (US) | Family Sharing | Odblokowuje |
|---|---|---|---|---|
| `pl.lkarwowski.szkolapokera.kwartal` | subskrypcja odnawiana, 3 miesiące, grupa „pelny” | 9,99 USD | wył. (decyzja E2) | część płatna |
| `pl.lkarwowski.szkolapokera.rok` | subskrypcja odnawiana, 1 rok, ta sama grupa | 14,99 USD | wył. | część płatna |
| `pl.lkarwowski.szkolapokera.dozywotni` | niezużywalny (Non-Consumable); w Google Play produkt jednorazowy | 19,99 USD | wył. | część płatna, bez końca |

| Przepływ (PR) | Akcja | Bez dostępu (co widzi użytkownik) | Dane zawsze dostępne |
|---|---|---|---|
| PR-01 ocena poziomu | cała | — (darmowe) | wynik oceny |
| PR-02 lekcja | lekcja z ćwiczeniami w środku, pierwsze podejście do egzaminu modułu | — (darmowe) | postęp lekcji |
| PR-03 sesja ćwiczeń | zadania z oceną i wyjaśnieniem poza lekcją; powtórne podejście do egzaminu | dzienny limit: 1 darmowa aktywność dziennie (D-107; licznik widoczny przed startem); po wyczerpaniu ekran zakupu jako stan przepływu, z informacją, kiedy limit się odnowi; powrót do lekcji jednym ruchem | historia odpowiedzi |
| PR-04 powtórki | kolejka powtórek | ten sam dzienny limit; po wyczerpaniu harmonogram się przesuwa (bez utraty danych), komunikat mówi to wprost | lista błędów, harmonogram |
| PR-05 scenariusz | scenariusz całego rozdania | ten sam dzienny limit; opis scenariusza widoczny | wyniki scenariuszy |
| PR-06 zakup | zakup, przywracanie, zarządzanie subskrypcją | zawsze dostępne | — |
| PR-07 dane | eksport, import, usunięcie | zawsze dostępne, bez zakupu | cały postęp |
| PR-08 pomoc | numer pomocy | zawsze dostępne, bez zakupu | — |

- **Źródło dostępu:** transakcje sklepu (StoreKit `Transaction.currentEntitlements`, Google Play Billing); lokalny zapis to tylko pamięć podręczna ostatniego udanego odczytu (produkty, data końca opłaconego okresu). Po ponownej instalacji i na nowym urządzeniu dostęp wraca z transakcji sklepu (wzorce roli: „the app automatically has all transactions available to it upon initial launch”).
- **Bez sieci:** pamięć podręczna daje dostęp do końca opłaconego okresu (subskrypcja) albo bez końca (dożywotni); błąd odczytu to nie brak zakupu (logika dostępu z modułu `storekit-expo`).
- **Przywracanie:** przycisk „Przywróć zakupy” na ekranie zakupu i w ustawieniach; wywołuje synchronizację tylko na żądanie użytkownika (`AppStore.sync()`: „Call this function only in response to an explicit user action”). Przywracanie bez zakupu: komunikat, brak dostępu.
- **Okres próbny:** brak (decyzja E2); próbę daje darmowy kurs.
- **Zarządzanie subskrypcją w aplikacji:** `showManageSubscriptions(in:)` (expo-iap: `showManageSubscriptionsIOS`, `deepLinkToSubscriptions`).
- **Zmiana planu:** kwartał i rok w jednej grupie subskrypcji (zmiana bez podwójnej opłaty); zakup dożywotniego przy aktywnej subskrypcji: ujawnienie, że subskrypcję trzeba anulować w ustawieniach (sklep nie anuluje jej sam) [DO USTALENIA] (OP-09: czy StoreKit lub Play pozwalają to zrobić z aplikacji).
- **Ujawnienia dla roli 04** (ekran zakupu; strona subskrypcji Apple i zasady Play, odczyt 2026-11-03): tytuł i długość każdego okresu; pełna cena odnowienia jako największy element ceny („the amount that will be billed must be the most prominent pricing element”), bez przeliczenia „za miesiąc” większym krojem; dożywotni jako jednorazowa opłata bez odnowień; droga do przywracania; odnośniki do warunków (Terms of Use) i polityki prywatności; co zostaje darmowe.
- **Zakazane wzorce** (tabela „Etyka” we wzorcach roli): fałszywe odliczanie i „promocje”, zawstydzanie przy odmowie, ekran zakupu wyskakujący w środku lekcji, dane jako zakładnik, „najpopularniejszy” bez danych, nacisk na ocenę w zamian za dostęp.

### Szkic ADR biblioteki płatności (dla roli 05; zastępuje „Do decyzji” w ADR-18)
| Opcja (npm, odczyt 2026-11-03) | Koszt i prywatność | Uwagi |
|---|---|---|
| `expo-iap` 6.4.1, MIT | bez usługi zewnętrznej i opłat; brak danych wychodzących do stron trzecich | iOS i Android; `restorePurchases`, `getAvailablePurchases`, nasłuch transakcji (wzorce roli); **rekomendacja** |
| `react-native-purchases` 11.0.0, MIT (RevenueCat) | „Pay nothing for up to $2,500 in monthly tracked revenue. Then pay 1%” (revenuecat.com/pricing); „If you are using RevenueCat, you must disclose that your app collects ‘Purchases’ information from the App Privacy tab” (revenuecat.com/docs, apple-app-privacy) | sprzeczne z decyzją OP-12 („Data Not Collected”) i standardem marki wysokim |
| własny moduł StoreKit 2 | bez opłat | tylko iOS; Android osobno; koszt kodu natywnego |
Rekomendacja: `expo-iap`. Potwierdzenie: test logiki dostępu (niżej) i scenariusze na urządzeniu (krok właściciela, TestFlight i zamknięty test Play). Wymaga buildu deweloperskiego, nie Expo Go (wzorce roli).

### Logika dostępu: wektory (wzorzec dla 07 i 08)
`odblokowuja = ['kwartal', 'rok', 'dozywotni']` (pełne ID z tabeli produktów), `teraz = T`; funkcja `decyzja()` z modułu `storekit-expo` biblioteki.

| Scenariusz | Odczyt | Pamięć | Oczekiwane |
|---|---|---|---|
| dożywotni | sklep: `dozywotni`, bez końca | brak | dostęp, `sklep`; pamięć `['dozywotni']`, bez końca |
| ponowna instalacja | sklep: `dozywotni` | brak (wyczyszczona) | dostęp, `sklep` |
| subskrypcja roczna trwa | sklep: `rok`, wygasa T+1 | brak | dostęp, `sklep`; pamięć wygasa T+1 |
| brak sieci, roczna trwa | błąd | `['rok']`, wygasa T+1 | dostęp, `pamiec` |
| brak sieci, kwartał wygasł | błąd | `['kwartal']`, wygasa T−1 | brak dostępu |
| brak sieci, nigdy nie kupił | błąd | brak | brak dostępu |
| zwrot dożywotniego | sklep: `dozywotni`, odebrane | `['dozywotni']` | brak dostępu, pamięć wyczyszczona |
| dożywotni i wygasły kwartał | sklep: `dozywotni` bez końca, `kwartal` T−1 | brak | dostęp; pamięć `['dozywotni']`, bez końca |
| przywracanie bez zakupu | sklep: pusta lista | brak | brak dostępu i komunikat |
Testy tylko na telefonie (krok właściciela): zakup, ponowna instalacja, tryb samolotowy, przywracanie na drugim urządzeniu, zwrot (sandbox), zmiana kwartał ↔ rok.

### Definicja ukończenia (build, sesja 2)
| Punkt | Wynik | Dowód |
|---|---|---|
| ceny, stawki, reguły sklepu z adresem, cytatem i datą | spełnione z wyjątkami w OP | reguły: „Sesja 2, E0” (odczyt 2026-11-03); ceny konkurencji z 2026-11-03 (E1 bramki, BRD); VAT US i retencja jako [ZAŁOŻENIE]/[OCENA]; VAT innych krajów OP-06, Google Play OP-08, Schedule 2 OP-16 (BRD) |
| ≥ 2 modele z regułą, kompromisem, ryzykiem etycznym i rachunkiem; rekomendacja; wybór właściciela słowami z datą | spełnione | „Sesja 2, E2” (A, B, C + bez opłat, napiwek, płatne pobranie); rekomendacja B; wybór „A: drabina 9,99/14,99/19,99” (2026-11-03) |
| bramka: `oplacalnosc.mjs` kod 0, werdykt, interpretacje A/B | spełnione w sesji 1 | „Opłacalność (E1b)”; w E2 ponowne uruchomienie dla A, B, C (kod 0) |
| `rachunek.mjs` kod 0, wejścia ze źródłem albo [OCENA] | spełnione | `dowody/rachunek-2026-11-03.txt`, `rachunek.json` |
| każda funkcja z BR ma klasę WTP; WTP-X zgłoszone 03 | spełnione | „Sesja 2, E1”: 35 z 35 BR (skrypt pokrycia), WTP-X brak |
| kontrakt płatności: produkty, uprawnienia, bramki, przywracanie, bez sieci, okres próbny, Family Sharing, ujawnienia | spełnione | ta sekcja |
| H i ZAL ze statusem; sprzeczność z 01 jako ER | spełnione | statusy w „Sesja 2, E1” i decyzjach E2; sprzeczności z BRD: brak (ER nie potrzebne) |

### Przekazanie do następnej roli
- Zakończono: rola 02, build, sesja 2 (E0–E3), gałąź `claude/sleepy-brahmagupta-2065nu`; artefakty: `docs/monetyzacja.md`, `docs/monetyzacja/rachunek.json`, `docs/monetyzacja/dowody/rachunek-2026-11-03.txt`, `docs/monetyzacja/warianty/`.
- **03 Zakres:** tabela WTP („Sesja 2, E1”), propozycja podziału: wszystkie lekcje darmowe, płatne sesje ćwiczeń poza lekcją, powtórki, scenariusze (decyzja właściciela E2); WTP-X brak; najsłabszy dowód: BR-CWI-005, BR-CWI-006; rozróżnienie CWI w lekcji (PR-02) i w sesji (PR-03).
- **04 Projekt:** ekran zakupu jako stan przepływu PR-03, PR-04, PR-05; ujawnienia i zakazane wzorce z „Kontrakt płatności”; przywracanie i zarządzanie subskrypcją.
- **05 Architektura:** szkic ADR biblioteki (rekomendacja `expo-iap`), ID produktów, pamięć podręczna uprawnień (JSON, miejsce w ADR), brak danych wychodzących (inwentarz prywatności: „Data Not Collected”), usunięcie `@sentry/react-native` (OP-12).
- **07 i 08:** wektory logiki dostępu wyżej, lista testów tylko na telefonie, ryzyka: OG-05/RYZ-01 (stała wartość subskrypcji), OP-09 (dożywotni przy aktywnej subskrypcji).
- **Właściciel (App Store Connect i Play Console):** zapis do Small Business Program, jeśli go nie ma (15% zamiast 30%); produkty z tabeli w grupie subskrypcji; ceny według tabel cen sklepów; Family Sharing wyłączone; storefront PL odznaczony.
- Następny krok ścieżki greenfield: **03-zakres**, tryb `build`; nowa sesja: opus, wysiłek high. Polecenie: `node /home/user/prompts/tools/assemble.mjs 03-zakres --tryb build`.
- Paczka wejściowa: `docs/brd/`, `docs/monetyzacja.md` („Sesja 2”), `docs/zalozenia.md`, `docs/sztafeta.md`.
- Otwarte decyzje: OP-20, OP-22 (BRD, 03 z właścicielem), H-04 podział aplikacji (03 z właścicielem), OP-09 (dożywotni przy subskrypcji).

## Sesja 2, E2: modele i rachunek (2026-11-03)
Dowody uruchomienia: `node oplacalnosc.mjs warianty/<wariant>.json` (kod 0 dla trzech opcji; wyniki w scratchpadzie sesji, liczby niżej), `node rachunek.mjs rachunek.json` (kod 0) → `docs/monetyzacja/dowody/rachunek-2026-11-03.txt`. Nowy wariant C dopisany do `generuj-warianty.mjs` (`sub-9.99-14.99`); pozostałe 15 plików wariantów po ponownym wygenerowaniu bez zmian (`git status`: tylko nowy plik). Bez storefrontu PL. Kwoty: USD netto/rok, pes. / norm. / opt.

| Opcja | Produkty (US) | Razem | Sam iOS (norm.) | Reguła sklepu | Ryzyko etyczne | Koszt utrzymania |
|---|---|---|---|---|---|---|
| A: drabina (decyzja właściciela 2026-11-03) | subskrypcje kwartał 9,99 i rok 14,99, niezużywalny dożywotni 19,99 | 50,93 / 5 199,87 / 363 501,94 | 3 249,92 | 3.1.2(a): „you must provide ongoing value to the customer, and the subscription period must last at least seven days” (odczyt 2026-11-03); ujawnienia ze strony subskrypcji („the amount that will be billed must be the most prominent pricing element”) | kwartał odnawia się, a uczący się porzuca po miesiącu (słowa właściciela): ryzyko skarg „keeps charging” (17 z 349 recenzji) | stałe aktualizacje treści uzasadniające subskrypcję (OG-05, RYZ-01) |
| B: sam zakup jednorazowy | niezużywalny „pełny dostęp” 19,99 | 74,10 / 6 400,43 / 415 450,83 | 4 000,27 | 3.1.1: odblokowanie przez zakup w aplikacji, „restore mechanism for any restorable in-app purchases”; okres próbny tylko jako „XX-day Trial” | najmniejsze: brak odnowień | brak obowiązku stałej wartości; aktualizacje bez przychodu z odnowień |
| C: sama subskrypcja | kwartał 9,99 i rok 14,99 | 34,72 / 3 554,95 / 240 795,32 | 2 221,84 | jak A | jak A, bez wyjścia „bez odnowień” | jak A |

Pozostałe modele z wymiaru pokrycia (bramka, `dowody/warianty-2026-11-03*.txt`): bez opłat — wpływ 0 wobec progu 500 USD; napiwek 2,99 — „odłożyć”; płatne pobranie 9,99 — skargi na płacenie przed wypróbowaniem (23 z 349). Bez reklam (standard marki wysoki).

**Wpływ na płacącego** (`rachunek.mjs`, US, prowizja 15%): kwartał 8,49, rok 12,74, dożywotni 16,99 USD; bez Small Business Program dożywotni 13,99 USD (30%). Próg kosztu Apple Developer (99 USD, koszt portfela): 6–12 płacących/rok.

**Skąd różnica A–B** [RACHUNEK]: w obu opcjach założona konwersja jest ta sama (3,6% norm.), a w A ćwierć płacących wybiera kwartał za 9,99 zamiast 19,99. Opcja A wygrywa tylko wtedy, gdy tańsze wejście podnosi konwersję co najmniej 1,23× (6 400,43 / 5 199,87). Tego nie rozstrzygnie rachunek, a App Store nie testuje cen A/B. Odnowienia rocznej subskrypcji w drugim roku nie są liczone (brak źródła retencji, OP-03). Odwracalność: przejście B → A później nie odbiera niczego kupującym; przejście A → B kończy subskrypcje opłacone przez ludzi (3.1.2(a): „you should not take away the primary functionality existing users have already paid for”, wzorce roli).

**Okres próbny** (wymiar pokrycia): subskrypcja tylko przez ofertę wprowadzającą w App Store Connect („clearly indicate how long the free trial lasts and the price billed once the free trial is over”); zakup jednorazowy tylko „XX-day Trial” (3.1.1). Darmowa część kursu daje próbę bez mechanizmu sklepu.

**Family Sharing**: tylko niezużywalne i subskrypcje odnawiane; „once you turn on Family Sharing … you can't turn it off” (odczyt 2026-11-03). Wyłączone na start da się włączyć później, odwrotnie nie.

**Google Play**: okres „Every 3 months” jest dostępny (E1b); zasady subskrypcji: „You must be transparent about your offer” (answer/9900533, odczyt 2026-11-03); zakup jednorazowy jako produkt jednorazowy Play. Pełny odczyt warunków przed cennikiem: OP-08 niżej.

## Sesja 2, E1: wartość funkcji (2026-11-03)
Klasy według słownika WTP z wzorców roli (pierwsza pasująca), poziom dowodu R/W/B/H. Dowody rynku z BRD (`docs/brd/odkrywanie.md`, „Rynek”, odczyt 2026-11-03; 102 aplikacje, 828 recenzji) i z E1 bramki (349 recenzji). Ceny to fakty zmienne z datą 2026-11-03.

| Wymaganie (BR) | Funkcja | WTP | Dowód | Propozycja: darmowa / płatna / do roli 03 |
|---|---|---|---|---|
| BR-ONB-001–BR-ONB-003 | ocena poziomu, punkt startu, korekta ścieżki | WTP-2 | R: River ma test poziomujący (S-44, płatna 19,99 $/mies.); skarga na brak pomijania (S-49); B: W-03 | darmowa (droga do głównej pracy) |
| BR-ONB-004 | pierwszy ekran mówi, czym aplikacja jest | WTP-0 | B: OG-07, NFR-ZGOD-002 | darmowa |
| BR-KURS-001 | lekcje w kolejności, każda z ćwiczeniem | WTP-1 | R: kursy płatne u River (19,99 $/mies.) i Poker Skill Plus 9,99–14,99 $/mies. (S-43); przeciw: Gambit darmowy (S-52), skarga „requires payment before you even finish the first lesson” (S-53) | do roli 03 (H-01: część lekcji darmowa przed zakupem, ZAL-005) |
| BR-KURS-002 | test modułu pozwala pominąć znane treści | WTP-2 | R: S-49 (brak pomijania) | darmowa |
| BR-KURS-003, BR-KURS-005 | termin przed użyciem, uproszczenia nazwane | WTP-0 | B: CLAUDE.md (spójność), RD-02, RD-05, RD-09 | darmowa (jakość treści) |
| BR-KURS-004 | powrót do miejsca w lekcji | WTP-0 | R: utrata postępu u konkurenta (S-51) | darmowa |
| BR-CWI-001 | ocena zagrania w czterech stopniach | WTP-1 | R: płatne zadania z oceną: GTO Preflop Wizard 19,99 $/mies. (S-46), Postflop+ 14,99 $/mies. (S-04, skarga na ocenę „blunder”) | płatna (zadania poza lekcjami); w lekcjach darmowa |
| BR-CWI-002 | wyjaśnienie „dlaczego” z liczbami | WTP-1 | R: ok. 85 z 828 recenzji (BRD, rynek); „doesn’t tell you the why” u płatnego lidera (`docs/monetyzacja.md`); „It has paid for itself” (1435468870) | płatna w zadaniach; w lekcjach darmowa |
| BR-CWI-003, BR-CWI-007 | szanse trafienia, ranking układów | WTP-0 | B: J-02, moduły M0, M2 (podstawa w każdym kursie od zera) | darmowa |
| BR-CWI-004 | krótka sesja, przerwanie bez straty | WTP-0 | R: „The drills are quick and chill usually 5-10 mins” (S-01) | darmowa (sposób działania, nie funkcja płatna) |
| BR-CWI-005 | ćwiczenia ICM w turniejach | WTP-2 | B: moduł M11, P-3; brak płatnego odpowiednika w danych konkurencji | do roli 03 (wariant H-04 c: pakiet turniejowy) |
| BR-CWI-006 | plan rozdania: SPR i rozmiar geometryczny | WTP-2 | B: moduł M9, P-3 | do roli 03 |
| BR-POW-001 | błąd wraca wcześniej (powtórki) | WTP-1 | R: „I use this app nearly daily to review ranges … drills to help range study so I can more easily commit them to memory” (S-02, aplikacja płatna 1435468870) | płatna (wartość ciągła, OG-05) |
| BR-POW-002 | powrót po przerwie bez kary | WTP-0 | R: S-51 (start od początku po przerwie) | darmowa |
| BR-POW-003 | lokalne przypomnienie za zgodą | WTP-2 | R: S-02 („nearly daily”); B: J-03 | darmowa |
| BR-SCN-001, BR-SCN-003 | scenariusz całego rozdania z oceną każdej decyzji | WTP-1 | R: 2 aplikacje scenariuszy z prawdziwych rozdań, płatne pakiety 2,99–4,99 $ (BRD, rynek); W-07 | płatna |
| BR-SCN-002, BR-SCN-004 | bez stosu do wygrania, bez losowania | WTP-0 | B: OG-01, OG-02, W-07 (warunek zgodności) | warunek, nie funkcja |
| BR-ZAK-001–BR-ZAK-004 | informacja, odblokowanie, przywracanie, anulowanie | WTP-0 | B: OG-06; reguły sklepu z E0 | zawsze dostępne |
| BR-DANE-001–BR-DANE-004 | eksport, import, usunięcie, zachowanie postępu | — | zasada uczciwości: dane nigdy płatne (wzorce roli) | zawsze darmowe |
| BR-POM-001, BR-POM-002 | numer pomocy, pomoc pod ręką | WTP-0 | B: RD-12 (reguła krytyczna) | zawsze darmowe |
| BR-JEZ-001, BR-JEZ-002 | język systemu, zapis liczb | WTP-2 | R: liderzy JP z japońskim (NTPoker, POKER Q'z, `docs/monetyzacja.md`); ZAL-003 częściowo potwierdzone | darmowa (wszystkie języki w każdym planie) |

**WTP-X: brak.** Każde z 35 BR ma dowód potrzeby w BRD (skrypt `kontrola-brd.mjs`: 0 błędów), więc żadne nie trafia na listę odcięć z tej roli. Najsłabszy dowód (tylko B, bez rynku): BR-CWI-005 i BR-CWI-006 (moduły M9 i M11, persona P-3). Rola 03 może je przesunąć, ale to decyzja o zakresie, nie wynik braku wartości.

**Wnioski E1 (hipotezy, rozstrzyga E2 z właścicielem i rola 03):**
- Płaci się za ćwiczenie z oceną i wyjaśnieniem (CWI-001, CWI-002), powtórki (POW-001) i scenariusze (SCN-001, SCN-003). To jest wartość ciągła, więc nadaje się na subskrypcję (OG-05, ZAL-011).
- Lekcje kursu są płatne u części konkurencji i darmowe u innych. Skarga S-53 i 23 z 349 recenzji o ścianie płatności wskazują, że część lekcji powinna być darmowa przed zakupem (H-01, ZAL-005). Granicę ustala E2 (opcje) i rola 03.
- Plan dożywotni: 13 z 349 recenzji go wymienia, m.in. „Lifetime membership is most +EV” (1488850006, 2022-01-18). To wspiera ZAL-MON-01, ale nie mówi o udziale planów (rachunek w E2).

**Statusy po E1:** H-01 / ZAL-005: hipoteza (dowód R kierunkowy, bez pomiaru konwersji). H-09 / ZAL-011: hipoteza (sprawdzenie wobec 3.1.2(a) w E2). ZAL-MON-01: hipoteza, wsparta jakościowo (R). ZAL-003: bez zmian (częściowo potwierdzone). OP-01 z tego dokumentu: zamknięte, bo rola 01 w E2 przeszukała wyszukiwarkę Apple frazami (72 nowe aplikacje, `docs/brd/dane/`).

**Sprzeczności z wejściem roli 01:** brak. Uwaga dla roli 03: BR-CWI-001 i BR-CWI-002 występują w lekcjach (PR-02) i w sesji ćwiczeń (PR-03). Podział darmowe/płatne wymaga rozróżnienia tych dwóch miejsc w kontrakcie zakresu.

## Środowisko E1 (2026-11-03)
- Działa: `itunes.apple.com/lookup`, `apps.apple.com` (strony aplikacji), RSS recenzji, `api.nbp.pl`, `gs.statcounter.com`, `play.google.com/store/apps/details`.
- **Nie działa: `itunes.apple.com/search`** — 403 z serwera Apple (nagłówek `server: daiquiri`, nie proxy) dla każdej frazy, także „chess”. ID konkurentów wzięto z dokumentu 07 i z list „podobne aplikacje” na stronach aplikacji (29 aplikacji nauki/treningu). Skutek: lista może pomijać aplikacje bez powiązań z tymi stronami [DO USTALENIA: powtórzyć wyszukiwanie w innej sesji].
- `reddit.com` 403: społeczności hobby jako sygnał popytu niepoliczone [DO USTALENIA].

## Rynek (odczyt 2026-11-03)
Kategoria: trenery GTO i kursy pokera (iOS). Wszystkie 29 aplikacji to darmowe pobranie z zakupami w aplikacji (subskrypcje; część z planem dożywotnim). Ceny: najniższa widoczna cena planu na stronie storefrontu (z promocjami „Special”, więc dolna granica).

| Aplikacja (ID) | Oceny US | Języki | Wiek | Mies. US / PL | Rok US / PL | Dożywotni US / PL |
|---|---|---|---|---|---|---|
| GTO Preflop Wizard (6590603158) | 3483 | EN | 12+ | 19,99 $ / 99,99 zł | 89,99 $ / 99,99 zł* | — |
| Postflop+ (1488850006) | 1982 | EN | 17+ | 14,99 $ / 49,99 zł | 99,99 $ / 489,99 zł | 149,99 $ / 699,99 zł |
| Poker Trainer – Learn Poker (6478522482) | 1165 | EN | 17+ | 14,99 $ / 79,99 zł | 59,99 $ / 299,99 zł | 269,99 $ / 1199,99 zł |
| Solver+ (1530767783) | 1163 | EN | 17+ | 17,99 $ / 49,99 zł | 149,99 $ / — | 299,99 $ / 999,99 zł |
| Preflop+ (1435468870) | 1022 | EN | 17+ | 5,99 $ / 29,99 zł | 79,99 $ / 389,99 zł | 59,99 $ / 299,99 zł |
| Flop Factor (6747833042) | 360 | EN | 17+ | — | — | 149,99 $ / 699,99 zł |
| Preflop AI (6747779080) | 298 | EN | 17+ | 14,49 $ / 79,99 zł | 49,99 $ / 147,99 zł | — |
| DTO MTT (1458491856) | 283 | EN | 17+ | 9,99 $ / 44,99 zł | 89,99 $ / 419,99 zł | — |
| NTPoker (1630961215) | 163 | 17, w tym PL, JA, KO | 4+ | 9,99 $ / 49,99 zł | 69,99 $ / 399,99 zł | — |
| POKER Q'z (6737678499) | 31 | 17, w tym PL, JA, KO | 12+ | 17,99 $ / — | 109,99 $ / 499,99 zł | — |
| Poker Academy (1626050814) | 8 | EN | 17+ | 9,99 $ / 49,99 zł | 99,99 $ / 499,99 zł | — |
| GTO Gecko (6738748434) | 62 | 11 (bez PL) | 17+ | 14,99 $ / 79,99 zł | — | 119,99 $ / 699,99 zł |

\* nazwa produktu „Annual VIP Access” w PL ma cenę 99,99 zł obok miesięcznego 99,99 zł — wpis z jednego odczytu, do sprawdzenia przed użyciem w wariancie.

**Mediany (US, n aplikacji):** miesięczny 14,99 $ (n=14, 5,99–19,99), roczny 89,99 $ (n=13, 49,99–149,99), dożywotni 149,99 $ (n=8, 29,99–299,99). **PL:** 64,99 zł (n=12), 409,99 zł (n=12), 699,99 zł (n=8). Kurs NBP 214/A/NBP/2026 z 2026-11-03: 1 USD = 3,9526 zł.

Wnioski (hipotezy dla bramki):
- **H-E1-01** Rynek płaci za trening pokera w modelu subskrypcji ~10–15 $/mies., ~60–100 $/rok; plan dożywotni jest częsty (8 z 16) i chwalony w recenzjach. Status: potwierdzone dla rynku US (R).
- **H-E1-02** Wariant właściciela 0,99 / 6,99 / 14,99 USD (D-029) jest 10–15× poniżej median kategorii. Do policzenia w macierzy wariantów E1b obok wariantów z cenami rynku; sama cena nie jest dowodem popytu.
- **H-E1-03** Prawie cała kategoria jest tylko po angielsku (25 z 29 aplikacji EN albo bez języków; 2 z PL). Status: potwierdzone (lookup, 2026-11-03).

## Recenzje o cenie i modelu (US, RSS, strony 1–3, 10 aplikacji, 349 recenzji z 2019-12-23 – 2026-10-20)
Liczby to trafienia wyrażeń regularnych bez rozróżniania wielkości liter na tytule i treści (górna granica), kierunek potwierdzają cytaty. Wyrażenia: ściana `pay ?wall|no free|not free|0 functionality|nothing for free|have to pay|before i spend|immediately wants`; drogo `expensive|overpriced|pricey|ridiculous|rip ?off|too much`; okres próbny `free trial|charged me|keeps charging|cancel`; pochwała `worth (every|it|the money|checking)|great value|paid for itself|affordable|great price|\+ev`; dożywotni `lifetime`; promocja `50%|discount|sale price|scam pricing`; urządzenie `new (ipad|phone|iphone)|switch(ed|ing)? (to )?(apple|phone)|transfer|another device|not show|honor the license`. Źródło: `https://itunes.apple.com/us/rss/customerreviews/page=<1–3>/id=<id>/sortby=mostrecent/json`.

| Motyw | Trafień z 349 | Cytat (aplikacja, ocena, data) |
|---|---|---|
| Ściana płatności bez próby | 23 | „This is a paid app. You will have 0 functionality unless you pay. No trial period. No demo.” (6590603158, 1★, 2026-05-03) |
| Za drogo | 20 | „$5.00 a week for a game is beyond ridiculous.” (1488850006, 2★, 2024-12-14) |
| Okres próbny zamieniony w opłatę, trudne anulowanie | 17 | „They give you a free trial but don’t give you the option to cancel” (1530767783, 1★, 2026-01-16) |
| Pochwała wartości | 20 | „It has paid for itself many time over.” (1435468870, 5★, 2020-05-29) |
| Plan dożywotni | 13 | „If you’re serious about poker, get this app. Lifetime membership is most +EV.” (1488850006, 5★, 2022-01-18) |
| Fałszywa promocja | 7 | „They will offer you a “50%!!” Discount which is NOT 50% off.” (1488850006, 3★, 2023-05-08) |
| Zakup nie przechodzi na nowe urządzenie | 4 | „My subscription doesn’t show on my new iPad” (1488850006, 1★, 2026-06-15) |
| Brak wyjaśnień | (wyrażenie zbyt szerokie) | „Ultra basic and doesn’t tell you the why behind anything.” (6590603158, 1★, 2026-06-13) |

Wnioski: **H-E1-04** darmowa część z prawdziwą nauką przed zakupem to przewaga (skargi na ścianę płatności dotyczą lidera US); **H-E1-05** uczciwe ujawnienia, przywracanie i działające przenoszenie zakupu to wymóg, nie dodatek (zasada roli 6–7); **H-E1-06** wyjaśnienie „dlaczego” to luka rynku (zgodne z dokumentem 07). Status: hipotezy (R, jedna próbka US).

## Przesiew storefrontów i języków (35 języków Treningu, 45 storefrontów, 2026-11-03)
Popyt: oceny 20 aplikacji nauki ÷ lata od wydania (min. 1), z `lookup` per storefront. Podaż: języki konkurentów. Platforma: StatCounter, październik 2026.

| Storefront (język) | Oceny/rok konkurentów | Android ÷ iOS | Luka lokalizacji | Uwagi |
|---|---|---|---|---|
| US (en) | 3548 | 0,92 | brak (wszyscy EN) | rynek główny |
| JP (ja) | 1711 | 0,86 | 2 aplikacje z JA prowadzą (NTPoker 2601, POKER Q'z 1570 ocen vs EN 772, 647) | dowód, że lokalizacja zbiera popyt |
| CA (en) | 482 | 0,54 | brak | |
| BR (pt-BR) | 283 | 2,81 | top 4 tylko EN | |
| GB (en) | 281 | 0,99 | brak | |
| FR (fr) | 277 | 1,79 | top 4 tylko EN | |
| TW (zh-Hant) / HK | 264 / 159 | 0,94 / 1,15 | do sprawdzenia (zh w 2 aplikacjach) | |
| VN (vi) | 229 | 1,61 | top 4 tylko EN | |
| AU (en) | 189 | 0,61 | brak | |
| MX (es-419) | 168 | 2,86 | brak ES w top 4 [DO USTALENIA] | |
| KR (ko) | 166 | 1,54 | NTPoker KO prowadzi | tylko 8 z 20 aplikacji dostępnych w storefroncie |
| DE (de) | 161 | 2,61 | top tylko EN | |
| RU (ru) | 119 | — | — | płatności App Store w Rosji [DO USTALENIA] |
| IT 114, ES 111, RO 67, IN 63, AR 61, NL 58, UA 51, CH 47, CO 45 | | | | |
| **PL (pl) 37**, BE 37, SE 35, TR 33, NO 33, MY 30, DK 30 | | | | PL: rynek domowy, mały popyt |
| AT 26, PT 23, HU 23, CZ 23, FI 20, GR 18, ID 15, BG 15, LT 13, SI 10, EE 8, SK 7, RS 7, LV 7, HR 7 | | | | |

Suma ocen iOS 20 aplikacji w 45 storefrontach: 31 554.

**Lista krótka do rachunku E1b:** US (rynek główny), JP, CA, GB, BR, FR, TW, VN, DE oraz PL (rynek domowy, treść istnieje). Kolejność przeglądu rodzimego dla roli 09 przy polityce szerokiej: en → ja → pt-BR → fr → zh-Hant → vi → es-419 → ko → de → pozostałe. Odrzuconych języków brak (polityka szeroka, decyzja właściciela 2026-11-03).

**Android:** Play reviews ÷ oceny iOS (45 storefrontów): Preflop Wizard 605 / 6328 = 0,10; GTO Gecko 1,1 tys. / 371 ≈ 3,0 (oba „10K+ Downloads”). Rozrzut 30× → w bramce `[ZAŁOŻENIE]` z przedziałem, nie stały udział StatCounter.

## Reguły sklepu
Z E0 (App Review Guidelines „Last Updated: October 16, 2026”, odczyt 2026-11-03): 3.1.1, 3.1.2(a), 3.2.2(x), 4.2, 4.3(b), 5.6, 5.3.4 — cytaty w `docs/sztafeta.md`. Kategoria wiekowa: 21 z 29 konkurentów ma „17+”, 5 (m.in. NTPoker, Poker Coaching) „4+”, 3 „12+” (lookup, `contentAdvisoryRating`) — wejście do ADR-12, decyzja po E1b.

## Opłacalność (E1b, 2026-11-03)
Dowody uruchomienia: `docs/monetyzacja/dowody/oplacalnosc-2026-11-03.txt` (wariant właściciela, 16:58 UTC) i `dowody/warianty-2026-11-03.txt` (macierz). Próg: 500 USD/rok netto, globalnie (decyzja właściciela 2026-11-03). Kwoty: USD netto/rok po VAT i prowizji 15%, przed podatkiem dochodowym, bez kosztów portfela (Apple Developer, rejestracja Google Play — D-024). Wartości pes. / norm. / opt.

**Kontrola skryptów (2026-11-03, prompts c025063):** `node oplacalnosc.mjs prompts/tests/fixtures/oplacalnosc-przyklad.json` → A 55,26 zł „porzucić”, B 455,36 zł „odłożyć” przy progu 1948,70 zł; `node rachunek.mjs prompts/tests/fixtures/rachunek-przyklad.json` → wpływ 13,81 zł, próg 28 płacących/rok (kod 0, zgodne z oczekiwanymi). Dodatkowo niezależne przeliczenie ios/us bez importu skryptu: 3548,6 ocen/rok × założenia normalne = 134,14 płacących × 6,6113 USD = **886,83 USD**, zgodne ze skryptem.

### Werdykt: **budować** (wariant właściciela 0,99 / 6,99 / 14,99 USD, D-029)
| Zakres | pes. | norm. | opt. |
|---|---|---|---|
| ios/us | 16,01 | 886,83 | 27 628,08 |
| ios/jp | 5,47 | 455,15 | 28 367,25 |
| ios/ca · gb · br · fr · tw · vn · de | 0,70–1,74 | 58–99 | 2 453–6 183 |
| ios/pl | 0,17 | 11,63 | 603,98 |
| android/us | 1,60 | 532,10 | 55 256,16 |
| android/jp | 0,55 | 273,09 | 56 734,50 |
| android, pozostałe 8 sklepów | 0,02–0,17 | 7–59 | 1 208–12 366 |
| **iOS razem** | 29,97 | 1 956,72 | 88 717,65 |
| **Android razem** | 3,00 | 1 174,03 | 177 435,31 |
| **Razem** | **32,96** | **3 130,75** | **266 152,96** |
| **Sam iOS** | 29,97 | 1 956,72 | 88 717,65 → też „budować” |

Siła dowodu: **słaba**. Wynik normalny jest 6,3× nad progiem, ale pesymistyczny 15× pod nim, a rozrzut pes.–opt. to ~8000×. Popyt (oceny konkurentów, ceny, VAT GB, prowizja) jest odczytany u źródła; trzy mnożniki o największym wpływie to `[ZAŁOŻENIE]` bez przeczytanego benchmarku. US i JP dają 69% wyniku normalnego (2 147,17 z 3 130,75); PL (rynek domowy) poniżej 1%.

### Wrażliwość
| Założenie (wszystkie sklepy) | Wynik przy pes. → opt. (reszta norm.) | Zmienia werdykt? | Najtańsze sprawdzenie |
|---|---|---|---|
| instalacje na ocenę (20 / 60 / 200) | 1 043,58 → 10 435,84 | nie sam | przeczytany raport branżowy o stosunku ocen do pobrań (0 zł, ~1 h agenta) |
| konwersja pobranie → płacący (1,5 / 4,5 / 12%) | 1 043,58 → 8 348,67 | nie sam | publiczny raport subskrypcji aplikacji z konwersją według ceny i kategorii (0 zł, ~1 h agenta) |
| udział nowej aplikacji (0,5 / 2 / 5%) | 782,69 → 7 826,88 | **tak dla „sam iOS”** (1 956,72 ÷ 4 < 500) | po wydaniu: App Store Connect Analytics, 90 dni (0 zł, czas oczekiwania) |
| VAT FR/DE/PL/JP/TW/VN (`[ZAŁOŻENIE]`) | < 5% wyniku | nie | odczyt stawek u źródła: próby 2026-11-03 nieudane (gov.pl, nta.go.jp bez stawki w HTML; impots.gouv 404; BMF 503) — OP-06 |

Margines wariantu właściciela: werdykt spada do „odłożyć”, gdy dwa z trzech głównych założeń są pesymistyczne naraz (np. 3 × 4 = 12 > 6,3). Margines wariantu rynkowego: ~50×, spada dopiero przy prawie wszystkich pesymistycznych.

### Macierz wariantów (D-028; reklamy pominięte: standard marki wysoki, brak przeczytanego źródła przychodu)
| Wariant | Razem pes. / norm. / opt. (USD) | Sam iOS norm. | Werdykt |
|---|---|---|---|
| rynek 14,99 mies. / 89,99 rok / 149,99 dożywotni | 270 / 24 958 / 1 553 497 | 15 599 | budować |
| jednorazowy 99,99 | 186 / 17 893 / 1 046 198 | 11 183 | budować |
| rok 59,99 | 149 / 13 419 / 784 592 | 8 387 | budować |
| jednorazowy 49,99 | 155 / 13 418 / 784 563 | 8 386 | budować |
| mies. 9,99 + rok 59,99 | 149 / 13 414 / 883 728 | 8 384 | budować |
| środek 4,99 / 29,99 / 59,99 | 116 / 10 784 / 752 977 | 6 740 | budować |
| mies. 9,99 | 124 / 10 725 / 627 108 | 6 703 | budować |
| jednorazowy 19,99 | 75 / 6 439 / 418 298 | 4 024 | budować |
| **właściciel 0,99 / 6,99 / 14,99** | 33 / 3 131 / 266 153 | 1 957 | budować |
| płatna z góry 9,99 | 16 / 1 341 / 104 518 | 838 | budować (sam iOS: zależny od 3 założeń) |
| napiwek 2,99 | 2 / 134 / 7 826 | 84 | odłożyć |

Zastrzeżenie: kolejność wariantów zależy od założonej konwersji przy danej cenie (`[ZAŁOŻENIE]`, np. 4,5% przy 0,99 USD wobec 3% przy 14,99 USD). Różnice między miejscami 2–7 mieszczą się w błędzie tego założenia; pewna jest tylko różnica rzędu wielkości między cenami rynku a wariantem właściciela (8× w wyniku normalnym).

### Drabina cen właściciela (2026-11-03, przeliczenie ad hoc, bez storefrontu PL)
Propozycja właściciela (2026-11-03): bez miesięcznej, „kwartalna … roczna … i Lifetime”; uzasadnienie jego słowami: „9.99 na kwartał to zakup impulsywny. Ale wtedy ktoś widzi że rok jest za niewiele więcej więc dokłada te 5 USD. Ale wtedy widzi że za 5 USD więcej ma Lifetime”; „Ludzie porzucają naukę po max miesiącu więc ważne żeby Lifetime wydawał się okazja.” Aplikacja poza oficjalnym portfelem Apps4brew, z osobną stroną z materiałami szkoleniowymi (później).

Ceny najtańszej konkurencji (US, apps.apple.com, odczyt 2026-11-03, `e1-rynek-2026-11-03.json`): kwartał 49,99 $ (GTO Preflop Wizard „VIP Access 3 Months”), rok 49,99 $ (Poker AI „One Year Membership”), dożywotni 59,99 $ (Preflop+ „Lifetime Upgrade”); najtańszy jednorazowy dostęp 29,99 $ (GTO Preflop „Access to all ranges”). Obie drabiny są w każdym planie poniżej najtańszego konkurenta (kwartał 5–6×, rok 3,3×, dożywotni 3×).

Założenia nowe (`[ZAŁOŻENIE]`, `generuj-warianty.mjs`): kwartał = 1 płatność w roku (porzucenie po miesiącu, słowa właściciela); podział płacących kwartał / rok / dożywotni: pes. 50/25/25%, norm. 25/25/50%, opt. 15/20/65% (hipoteza drabiny właściciela); konwersja 7,99: 1,2 / 4,0 / 9,0%; 9,99: 1,2 / 3,6 / 8,0% (jak jednorazowy 19,99). Reszta jak w macierzy.

| Wariant | Razem pes. / norm. / opt. (USD netto/rok) | Sam iOS norm. | Zapas nad progiem (norm.) | Wpływ na płacącego US (norm.) |
|---|---|---|---|---|
| drabina 7,99 / 14,99 / 19,99 | 47,22 / 5 599,84 / 401 929,43 | 3 499,90 | 11,2× | 13,38 $ |
| drabina 9,99 / 14,99 / 19,99 | 50,93 / 5 199,87 / 363 501,94 | 3 249,92 | 10,4× | 13,80 $ |
| zapas: mies. 5,99 / rok 14,99 / dożywotni 19,99 | 43,52 / 5 421,92 / 394 913,07 | 3 388,70 | 10,8× | 12,88 $ |
| propozycja: mies. 6,99 / kwartał 9,99 / rok 14,99 / dożywotni 19,99 | 42,78 / 5 439,63 / 396 079,35 | 3 399,77 | 10,9× | 13,00 $ |
| poprzedni wybór 0,99 / 6,99 / 14,99 (bez PL) | 32,77 / 3 112,14 / 264 341,02 | 1 945,09 | 6,2× | 6,61 $ |

Kwartał jest dostępny w obu sklepach: App Store Connect Help („Offer auto-renewable subscriptions”, odczyt 2026-11-03): „Possible durations are 1 week, 1 month, 2 months, 3 months, 6 months, and 1 year.” i „The duration can’t be changed after you submit for review.”; Play Console Help answer/140504: okres rozliczeniowy „Every 3 months”. Wariant zapasowy z miesięczną (właściciel: „jeżeli nie da się zrobić kwartalnej”) policzony dla porównania: miesiąc = 1 płatność w roku, konwersja jak przy 7,99 (`dowody/drabina-mies-2026-11-03.txt`).

Wniosek: obie drabiny ~1,7–1,8× nad poprzednim wyborem i bez żadnego pojedynczego założenia, które zmienia werdykt (także sam iOS). Różnica 7,99 vs 9,99 wynika tylko z założonej konwersji: wpływ na płacącego przy 9,99 jest o 3% wyższy, więc 9,99 wygrywa, jeśli jego konwersja jest ≥ 97% konwersji przy 7,99 — tego nie rozstrzygnie rachunek, tylko dane ze sklepu. Dowód: `dowody/warianty-2026-11-03-drabina.txt` (17:43 UTC). Podłoga dla drabiny: cena kwartału jako największy element (bez „2,66 $/mies.”), dożywotni jako stała cena bez fałszywego odliczania (2005/29/WE zał. I pkt 7), przypomnienie o odnowieniu kwartału zgodne ze sklepem; dożywotni zmniejsza ryzyko skarg „keeps charging” (17 z 349 recenzji).

### Model optymalny (najwyższy wynik normalny w podłodze)
Najwyższy wynik normalny: **rynek 14,99 $/mies., 89,99 $/rok, 149,99 $ dożywotni** (ceny lokalne według tabel cen Apple). Podłoga:
- bez ciemnych wzorców: darmowa część z prawdziwą nauką przed zakupem (H-E1-04), okres próbny tylko przez App Store Connect z jasnym ujawnieniem ceny po okresie, bez fałszywych promocji „50%” (H-E1-05), łatwe anulowanie przez ustawienia systemu, działające „Przywróć zakupy”;
- wytyczne sklepów: subskrypcja tylko z bieżącą wartością (3.1.2(a): aktualizacje treści, powtórki SRS), plan dożywotni jako zakup nieodnawialny, bez gry na pieniądze i pomocy w czasie gry (5.3.4); odpowiedniki w Google Play [DO SPRAWDZENIA przez rolę 02 w kroku cennika];
- standard marki wysoki: bez reklam i SDK śledzących — spełnione we wszystkich wariantach macierzy;
- zasada 18 biblioteki („Tylko funkcje z wartością i intuicyjne; żadnych kombajnów”, `shared/zasady.md`, wersja 2026-10-31): dotyczy funkcji, nie ceny; wariant nie dodaje funkcji — spełnione; podział darmowe/płatne i WTP-X ocenia sesja 2 roli 02 z rolą 03.
Wybór ceny to decyzja produktowa właściciela (CLAUDE.md). **Decyzja właściciela 2026-11-03 (zmiana): kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD** („Ok zgodnie z rekomendacją”); zastępuje wcześniejszy wybór 0,99 / 6,99 / 14,99 (odrzucone też: 7,99/14,99/19,99, mies. 5,99/14,99/19,99). Miesięczna 6,99: nie na start (decyzja właściciela 2026-11-03 „A”); hipoteza H-MON-01 z warunkiem powrotu: App Store Connect pokazuje wiele wyświetleń ekranu zakupu bez zakupu; powód: kanibalizacja kwartału przy porzuceniu po miesiącu, nierówne kroki drabiny, plan łatwo dodać później. Podłoga powyżej obowiązuje także dla tego wariantu.

### Rozbieżności z kartą portfela i dokumentem „Aplikacje Mobilne do Nauki Pokera” (otwarte po zapisaniu dowodu, D-023)
**Karta portfela** `portfel-aplikacji/karty/48-szkola-pokera.md` (commit 262a076, otwarta 2026-11-03 po zapisaniu dowodu):

| Wielkość | Nasza (E1b) | Karta | Przyczyna |
|---|---|---|---|
| Wynik wariantu 0,99/6,99/14,99 | 33 / 3 131 / 266 153 USD netto/rok (pes./norm./opt.) | 1 698 USD (średnia, 3. rok) | inna metoda: karta — benchmark młodych aplikacji z rozkładem P10–P90, rok 3; my — oceny konkurentów × jawne założenia, stan ustalony. Rząd wielkości zgodny |
| Model optymalny | rynek 14,99/89,99/149,99 (najwyższy normalny); wybrany przez właściciela: 0,99/6,99/14,99 | pojedynczy zakup 14,99 USD: 3 582 USD (P10/P50/P90: 0 / 175 / 10 187) | karta nie liczyła cen rynku ani subskrypcji z ceną rynku; nasz jednorazowy 19,99 = 6 439 USD (norm.), 14,99 nie liczony. Obie metody: jednorazowy > wariant 0,99/6,99/14,99 |
| Instalacje nowej aplikacji na rok | 800 / 16 796 / 395 036 (wszystkie 20 sklepów) | 534 / 44 310 / 109 873 (młode porównywalne, 16 sklepów) | nasza norma 2,6× niżej, rozrzut szerszy; karta ma benchmark 10 młodych aplikacji, my `[ZAŁOŻENIE]` (OP-03) — benchmark karty to kandydat na źródło do OP-07 (do przeczytania u źródła) |
| Udział USA | 45% wyniku normalnego (iOS + Android) | 69% | my mamy mnożnik lokalizacji dla JP/BR/FR/TW/VN/DE; karta zakłada angielski |
| Oceny US: Preflop Wizard / Poker Trainer | 3 483 / 1 165 (2026-11-03) | 3 471 / 1 142 (18.10.2026) | przyrost w 16 dni |
| Darmowa alternatywa | `[ZAŁOŻENIE]` 50 / 70 / 90% popytu niezabranego | Texas Hold'em (Apple), 74 183 ocen — „nie pokrywa” (gra bez lekcji) | zgodne kierunkowo; karta nie zna Poker Skill (darmowy kurs, dokument z Dysku) |
| Reklamy | pominięte (standard wysoki) | 2 557 USD (2. marka) | decyzja właściciela E0: standard wysoki |
| **Rynki** | lista krótka **z PL** (rynek domowy) | **„wszędzie poza Polską”** (decyzja o rynkach z 01.11.2026, art. 29 u.g.h., `dane/poker-prawo-hazard.md`) | E0 tej roli nie odczytało karty (D-023). Przeliczenie bez PL: 32,77 / 3 112,14 / 264 341,02 USD; sam iOS 29,79 / 1 945,09 / 88 113,67 — werdykt bez zmian („budować”). **Decyzja właściciela 2026-11-03: „Tak, bez PL, polski zostaje”** (storefront PL wyłączony, pl w 35 językach). |

**Dokument z Dysku** „Aplikacje Mobilne do Nauki Pokera” (id 121Gf18Z…, odczyt 2026-11-03):

| Wielkość | Nasza (E1, lookup/strony App Store 2026-11-03) | Dokument | Przyczyna |
|---|---|---|---|
| Liczba aplikacji w kategorii | 29 (z dokumentu 07 i list „podobne”) | 45–50 aktywnych, 33 wiodące | `itunes.apple.com/search` 403 → pominięte m.in. Poker Skill, River, Pokr, LeakSeek, Insta Poker Coach, PokerCruncher, Poker Sense (OP-01). Skutek: popyt (oceny/rok) zaniżony, a konkurencja darmowa i zlokalizowana też zaniżona — kierunek wpływu na wynik nieznany |
| Darmowa alternatywa | `[ZAŁOŻENIE]` 50 / 70 / 90% popytu niezabranego | Poker Skill „Free forever” (lekcje, 8 języków w aplikacji) | brak tej aplikacji w naszych danych; mnożnik może być zawyżony dla początkujących |
| Luka lokalizacji (poza EN) | 25 z 29 tylko EN; mnożnik 1 / 1,5 / 3 | ~70% tylko EN; River 8 języków (w tym JA, FR, DE, PT-BR), Poker Skill 8, Pokr 6 | dokument ma aplikacje spoza naszej listy; mnożnik dla JP/FR/DE/BR/TW może być zawyżony |
| Języki Poker Academy | EN (metadane App Store) | 5 (PL, EN, ES, FR, ZH-Hans), przełącznik w aplikacji | inne źródło: metadane sklepu vs język wewnątrz aplikacji |
| Języki NTPoker / POKER Q'z | 17 (metadane App Store) | 2+ / 3+ | dokument liczy języki treści, my metadane sklepu |
| Preflop+ mies. / dożywotni (US) | 5,99 $ / 59,99 $ | 9,99 $ / 129,99 $ | my bierzemy najniższą cenę z listy zakupów (z promocjami „Special”); dokument cenę podstawową; dokument opisuje testy cen A/B |
| Solver+ mies. / dożywotni | 17,99 $ / 299,99 $ | 22,99–50 $ / 349,99 $ | jak wyżej |
| GTO Gecko mies. / rok | 14,99 $ / — | 24,99 $ / 149,99 $ | jak wyżej; inny plan (1 format vs All-Access) |
| Preflop Wizard | 19,99 $ mies., 89,99 $ rok | 10,83 $/mies. przy rocznym (≈ 129,99 $/rok) | testy cen / inny odczyt [DO USTALENIA] |
| POKER Q'z mies. | 17,99 $ | 13,99 $ | jak wyżej |
| Zgodne | Poker Trainer (14,99 / 59,99 / 269,99), NTPoker (9,99 / 69,99), DTO (9,99 / 89,99), Postflop+ (14,99), Poker Academy (9,99 $ / 49,99 zł) | | |

Wniosek: rozbieżności cen nie zmieniają median kategorii rzędu wielkości (wariant właściciela pozostaje 10× pod rynkiem). Istotna jest **niepełna lista konkurentów** (OP-01): przy ponownym przebiegu dodać brakujące aplikacje (popyt i darmowa/zlokalizowana podaż), zanim cena trafi do cennika.

## Otwarte pytania
| ID | Pytanie | Rozstrzyga | Dotyczy |
|---|---|---|---|
| OP-01 | Zamknięte 2026-11-03 (rola 01 E2: wyszukiwarka frazami, 72 nowe aplikacje). Było: powtórzyć `itunes.apple.com/search` (fraza w językach listy krótkiej) — czy nie pominięto konkurentów | 02, kolejna sesja | lista konkurentów |
| OP-02 | [DO USTALENIA] Płatności App Store w storefroncie RU | 02, E1b | przesiew |
| OP-03 | [DO USTALENIA] Instalacje na ocenę i udział nowej aplikacji: brak przeczytanego benchmarku → `[ZAŁOŻENIE]` z rozrzutem ≥ 10× | 02, E1b | bramka |
| OP-04 | [DO WYJAŚNIENIA] Wpis decyzji E0 w rejestrze 03 na Dysku wymaga konektora Google Docs (sesja ma tylko Drive) | właściciel | rejestr |
| OP-05 | Rozstrzygnięte 2026-11-03: bez storefrontu PL, pl w językach (decyzja właściciela) | — | rynki, rola 09 |
| OP-06 | [DO USTALENIA] Stawki VAT FR/DE/PL/JP/TW/VN u źródła (wpływ < 5%) | 02, krok cennika | rachunek |
| OP-10 | [DO USTALENIA] Licznik dziennego limitu: lokalny czy odporny na ponowną instalację (Keychain); realność obejścia: brzegowa (jedna dodatkowa aktywność dnia); to samo co BRD OP-24 | 05 | kontrakt płatności |
| OP-11 | Rozstrzygnięte 2026-11-03 (D-107, właściciel: „1 aktywność dziennie (Recommended)”): N = 1 rozpoczęta aktywność dziennie; odrzucone: 2 aktywności, 10 zadań dziennie | 03 z właścicielem | kontrakt płatności, F-07, F-10, F-12, F-04 |
| OP-09 | [DO USTALENIA] Zakup dożywotniego przy aktywnej subskrypcji: czy StoreKit i Google Play Billing pozwalają anulować subskrypcję z aplikacji, czy tylko wskazać ustawienia | 05, 07 | kontrakt płatności |
| OP-08 | [DO USTALENIA] Google Play: pełne warunki subskrypcji i produktów jednorazowych (ujawnienia, okres próbny, przywracanie) przed cennikiem | 02, E3 | kontrakt płatności |
| OP-07 | [DO USTALENIA] Benchmark instalacji na ocenę i konwersji według ceny (przeczytane źródło) — najtańsze sprawdzenie werdyktu | 02, przed cennikiem | bramka |

