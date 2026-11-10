# Ponowna ocena storefrontów KR i VN (2026-11-10)

> **To nie jest opinia prawna** (OP-13). Agent (rola 10, sesja AN) przeczytał przepisy i dokumentację Apple i zestawił je z aplikacją. Wynik to rekomendacja; decyzję podejmuje właściciel (pytanie przez koordynatora). Miejsca, gdzie potrzebny prawnik, są oznaczone **[prawnik]**.

- Zlecenie: właściciel 2026-11-10 „Zleć ponowną ocenę KR i VN” (przekład ko i vi jest wydany w kodzie: `apps/mobile/app.json` `supportedLocales`, D-385/D-388; storefronty KOR i VNM wyłączone w D-362).
- Data odczytu wszystkich źródeł: **2026-11-10**. Wyciągi surowego tekstu: `docs/prawo/dowody/kr-vn-cytaty-2026-11-10.md` (oznaczenia A1–A12, K1–K9, V1–V2 niżej). Dane konkurencji: `docs/prawo/dowody/kr-vn-konkurencja-2026-11-10.json`.
- Metoda: Apple — `curl` stron developer.apple.com i tekst po usunięciu znaczników; Korea — portal rządowy law.go.kr (Chromium, `innerText` ramki z tekstem ujednoliconym); Wietnam — PDF z datafiles.chinhphu.vn (`pdftotext`). Przekłady cytatów: **robocze, agenta**.
- Analogia z Treningiem (D-191): brak (wyszukiwanie kodu `repo:lkarwowski494/trening`: „Korea”, „KOR”, „GRAC”, „Vietnam” — 0 trafień, 2026-11-10). Odstępstwo nazwane: decyzja bez wzoru.
- Fakty o aplikacji, na których stoi ocena: kategoria główna **Education** (D-360); ankieta wiekowa: Simulated Gambling **None**, Gambling None, Medical Infrequent, Mature/Suggestive Infrequent, Health/Wellness tak, wynik z tabeli **13+**, **override 18+** (D-310, D-362); bez stawek, żetonów, nagród i gry z ludźmi (NFR-ZGOD-001); bez zbierania danych (D-307); zakupy: kwartał, rok (subskrypcje odnawialne), dożywotni (jednorazowy).

## 1. Co ustalono wcześniej (zadanie 1)

| Decyzja | Co ustalono | Na jakim źródle | Czego nie przeczytano |
|---|---|---|---|
| D-300 (A), przyjęta w D-301 | KR, CN, AF, GA, MA „nie teraz”; VN i TR po sprawdzeniu prawnym. KR: 5/25 aplikacji nauki i 0/10 gier na żetony | **tylko sygnał sklepowy**: iTunes Lookup API × 174 storefronty (`docs/wydanie/konkurencja/storefronty.md`) | dla KR: **żaden przepis, żadna strona Apple**; hipoteza „kategoria gier ma w KR osobne wymogi” zapisana jako `[DO USTALENIA]` (`storefronty.md` pkt 3) |
| D-316 (A), przyjęta w D-341 („VN nie”) | VN „nie teraz”: kodeks karny nie obejmuje aplikacji; ryzyka: dekret 147/2024 (gra G4 → spółka w VN, karty blokują zgłoszenie, Apple wymaga licencji gier), ustawa 19/2023 art. 41 (subskrypcja ≥ 3 mies. = usługa ciągła → pełnomocnik w VN), art. 23 ust. 2 (umowa po wietnamsku), vi poza 1.0, rynek ok. 74 USD/rok | BLHS 135/VBHN-VPQH art. 321–322; ND 147/2024 (OCR skanu); Luật 19/2023; Luật 91/2025; Apple news 06h4gf33, App information; DPLA Schedule 2 (`docs/wydanie/legalnosc/VN.md`) | granica gra/edukacja w dekrecie 147; czy pole „Availability in Vietnam” dotyczy Education; art. 41 przy komisancie Apple; czy dożywotni to usługa ciągła; EULA po wietnamsku; art. 37 ust. 1 tylko z raportu subagenta |
| D-341 (W) | właściciel: „VN nie, TR po T1” | pytanie koordynatora | — |
| D-362 (A) | dostępność 1.0 = 166 storefrontów (bez POL, VNM, TUR, KOR, CHN, AFG, GAB, MAR); KR: „storefront wyłączony, więc RCN nie dotyczy” (`docs/sklep/asc-reczne-wartosci.md:81`) | D-301, D-341 | czy override 18+ uruchamia w części krajów potwierdzanie wieku — nieprzeczytane |

Wniosek z tabeli: **KR był wyłączony bez żadnego sprawdzenia przepisów** — to pierwsza ocena prawna KR. VN był sprawdzony; zmieniło się od tego czasu tylko to, że vi jest w aplikacji.

## 2. Korea Południowa (KR)

### 2.1 Nowy odczyt sygnału sklepowego

Ten sam zestaw 35 aplikacji, dziś z kategorią i oceną wiekową z US (`kr-vn-konkurencja-2026-11-10.json`):

| Ocena w US | Aplikacji | Dostępnych w KR |
|---|---|---|
| 4+ | 5 | 4 |
| 12+ | 1 | 1 |
| 17+ | 29 | **0** |

Kategoria nie tłumaczy wyniku (Education 3/9, Games 1/9 w KR); ocena wiekowa tłumaczy go prawie w całości. W KR brak **wszystkich** aplikacji 17+, także w kategorii Education, a są prawie wszystkie 4+/12+ (w tym „Poker Skill — Learn Holdem” w kategorii Games). Zgadza się to z regułą Apple z wiersza K-a niżej. **Ocena, nie fakt**: korelacja na 35 aplikacjach; brak jednej aplikacji 4+ („Learn Poker”, płatna) może być wyborem twórcy.

### 2.2 Tabela źródeł

| # | Pytanie | Źródło · cytat · odczyt | Wniosek | Status |
|---|---|---|---|---|
| K-a | Kiedy Apple wymaga numeru klasyfikacji GRAC (RCN) w KR | A4, developer.apple.com/help/app-store-connect/reference/app-information/app-information · „If your app meets one or more of the following characteristics, a Rating Classification Number from the Game Rating and Administration Committee (GRAC) is required in order to offer it on the App Store in the Republic of Korea.” — cechy: ocena KR-19 nadana przez GRAC; podkategoria Casino z 17+; kategorie Games albo Entertainment z poziomem Frequent/Intense w Simulated Gambling, Sexual Content, Alcohol…, Realistic Violence · A1 (age-ratings-values-and-definitions): „Apps and games with Frequent or Intense simulated gambling content are only available on the App Store in Korea if you provide a Rating Classification Number (RCN).” · 2026-11-10 | Żadna cecha nas nie dotyczy: Education, Simulated Gambling None, brak KR-19 od GRAC. Według Apple RCN **nie jest wymagany**. | potwierdzone (dokumentacja Apple) |
| K-b | Jaką ocenę pokaże KR przy naszych odpowiedziach | A1 · tabela „Republic of Korea age rating values”: „All” m.in. „Health or wellness topics”; „12+” m.in. „Infrequent medical or treatment information”, „Infrequent mature or suggestive themes”; „19+” m.in. „Frequent simulated gambling” · 2026-11-10 | Z ankiety wychodzi **KR 12+**. Ale mamy override 18+, a Apple pisze, że override „may override to a different rating value per region based on region-specific requirements” (A6). Jaką wartość KR da override 18+ (15+? 19+?) i czy przy 19+ Apple zażąda RCN — Apple tego nie pisze. | **`[DO USTALENIA]`** — sprawdzalne bez publikacji (K-1 niżej) |
| K-c | Czy aplikacja to „게임물” (gra) w prawie koreańskim | K1, 게임산업진흥에 관한 법률 (ustawa o promocji przemysłu gier, nr 20485, w mocy od 23.10.2025), art. 2 pkt 1 · „“게임물”이라 함은 컴퓨터프로그램 등 정보처리 기술이나 기계장치를 이용하여 오락을 할 수 있게 하거나 이에 부수하여 여가선용, 학습 및 운동효과 등을 높일 수 있도록 제작된 영상물 […]을 말한다.” — tłum.: „„gra” to utwór audiowizualny wykonany tak, by przy użyciu programu komputerowego umożliwiać rozrywkę albo, ubocznie do niej, zwiększać efekty wypoczynku, nauki, ruchu itp.” · 2026-11-10 | Definicja wychodzi od rozrywki; nauka jest „ubocznie”. Lekcje i ćwiczenia decyzyjne bez punktów rywalizacji to raczej nie gra, ale ustawa tego nie wyłącza wprost. **[prawnik]**, jeśli GRAC kiedyś o to zapyta. | ryzyko (niskie) |
| K-d | Czy to „gra hazardowa” (사행성게임물) | K2, art. 2 pkt 1의2 · „“사행성게임물”이라 함은 다음 각 목에 해당하는 게임물로서, 그 결과에 따라 재산상 이익 또는 손실을 주는 것을 말한다.” — tłum.: „gra hazardowa to gra z listy (zakłady, wynik losowy, kasyno i ich naśladowanie), której wynik daje korzyść albo stratę majątkową” · 2026-11-10 | Wynik ćwiczenia nie daje korzyści ani straty majątkowej (brak stawek i wypłat). | potwierdzone |
| K-e | Klasyfikacja przed dystrybucją i rola Apple | K3, art. 21 ust. 1: kto wytwarza lub dystrybuuje grę, „위원회 또는 제21조의2제1항에 따라 지정을 받은 사업자로부터 […] 등급분류를 받아야 한다” — tłum.: „musi otrzymać klasyfikację od Komisji (GRAC) albo od podmiotu wyznaczonego wg art. 21의2 ust. 1” · K6, art. 21의4 ust. 1: „자체등급분류사업자로부터 등급분류를 받은 게임물은 위원회의 등급분류를 받은 것으로 본다.” — „gra sklasyfikowana przez podmiot samoklasyfikujący uznaje się za sklasyfikowaną przez Komisję” · K5, art. 21의2 ust. 3: podmiot samoklasyfikujący klasyfikuje gry ze sklepu, „다만, 제21조제2항제4호에 해당하거나 […] 게임물은 제외한다” — „z wyjątkiem gier z art. 21 ust. 2 pkt 4” (K4: „청소년이용불가” — niedostępne dla młodzieży) · K7, art. 32 ust. 1 pkt 1: zakaz dystrybucji gry bez klasyfikacji · 2026-11-10 | Jeśli aplikacja byłaby grą, pokrywa ją ocena regionalna Apple (Apple pokazuje ocenę KR „for all apps made available in Korea”, A1) — **chyba że** ocena to kategoria dla dorosłych (19): tej Apple nadać nie może, potrzebna klasyfikacja GRAC (RCN). To jest mechanizm za K-a i za brakiem konkurencji 17+ w KR (2.1). Nasze ryzyko leży więc tylko w override 18+ (K-b). Że Apple jest wyznaczonym podmiotem samoklasyfikującym — wynika z A2/A7 (oceny regionalne „as required by” GRAC), wprost nazwy na liście ministerstwa nie czytano. | ryzyko (zależy od K-b) |
| K-f | Przedstawiciel w Korei | K8, rozporządzenie wykonawcze (w mocy od 24.03.2026) art. 18의3 ust. 1: obowiązek przedstawiciela krajowego (art. 31의2 ustawy) mają podmioty z „전체 매출액이 1조원 이상” (przychód ≥ 1 bln KRW), z grą instalowaną średnio „하루 평균 1천건 이상” (≥ 1000 instalacji dziennie w KR) albo wezwane przez ministra · 2026-11-10 | Nie dotyczy (skala). | potwierdzone |
| K-g | Zwolnienie gier edukacyjnych z klasyfikacji | K9, rozp. art. 11의3 ust. 1: zwolnione są gry podmiotów z art. 25 ust. 1 pkt 1–3 ustawy oraz gry tworzone w kraju „영리를 목적으로 하지 않고” (nie w celu zarobku) | Nie dotyczy (sprzedaż). Bez znaczenia, jeśli K-b wyjdzie dobrze. | potwierdzone |
| K-h | Dane sprzedawcy (ustawa o handlu elektronicznym) | A9, „Manage Korea compliance information” · „If you're an individual or organization based in South Korea, the Act on Consumer Protection in Electronic Commerce requires Apple to collect and verify identification information for the purpose of displaying on your apps’ product pages.” · 2026-11-10 | Obowiązek opisany przez Apple dotyczy deweloperów **z siedzibą w Korei**. Właściciel nie jest. Tekstu ustawy (전자상거래법) nie czytano. | potwierdzone wg Apple; ustawa `[DO USTALENIA]` (niskie) |
| K-i | Kto sprzedaje i podatki | A10, DPLA Schedule 2 Exhibit A: „You appoint Apple Services Pte. Ltd. as Your commissionaire […]” — na liście „Korea*” · A11, Exhibit C, przypis „**” przy „Korea”: „Solely applicable to non-resident Developers.” (Apple pobiera i odprowadza podatek za nierezydentów) · A12: numer podatkowy KR tylko dla rezydentów Korei · 2026-11-10 | Sprzedaje komisant Apple; VAT rozlicza Apple; numer podatkowy niepotrzebny. | potwierdzone |
| K-j | Ochrona danych | — | Aplikacja nie zbiera danych (D-307). Ustawy PIPA nie czytano; e-mail od użytkownika (D-307) to jedyny kontakt z danymi. | `[DO USTALENIA]` (niskie) |
| K-k | Język | `apps/mobile/app.json` (`supportedLocales` zawiera „ko”); metadane ko: `docs/sklep/aso/metadane-fala2.json` (D-382, przegląd D-387) | ko jest w aplikacji; metadanych fali 2 skrypt `metadane.mjs` jeszcze nie zapisuje (`LOCALE_MAP`, D-382 pkt 3). Bez metadanych ko strona produktu w KR byłaby po angielsku — dopuszczalne, słabsze. | stan faktyczny |
| K-l | Wartość rynku | `docs/monetyzacja/dowody/oplacalnosc-2026-11-03.txt` — KR nie ma w rachunku | Wartość KR nieznana | `[DO USTALENIA]` |

### 2.3 Opcje dla KR

| Opcja | Na czym polega | Kompromis | Co potwierdza wykonalność |
|---|---|---|---|
| **A. Warunkowo w 1.0 (rekomendacja)** | KOR na listę dostępności 1.0 (167 krajów) po spełnieniu **K-1**: właściciel w ASC (App Information → Age Ratings) po zapisaniu ankiety z override 18+ odczytuje wiersz „Republic of Korea” (Apple: „Here, you can view your global and region-specific ratings”, A8). Warunek spełniony, gdy KR nie pokazuje 19+ i nie ma przy nim wymogu RCN. Do tego **K-2**: przed włączeniem ponowić `sprawdz-storefronty.mjs` (5 min, 0 USD) | + rynek KR i sens przekładu ko; + reguła Apple jasna, przepis o samoklasyfikacji spójny z danymi konkurencji. − ryzyko wiadomości od App Review (A2/A7: GRAC może nadać inną ocenę; wtedy RCN albo wycofanie z KR — usunięcie z jednego storefrontu, bez kar w przeczytanych tekstach); − kraj nr 167 trzeba dopisać w 3 plikach (`storefronty-1.0.json`, `asc-kontrola.json`, `asc-reczne-wartosci.md` §5) i w workflowie dostępności (rola 08/10) | A1, A4 (reguła RCN), K5–K6 (samoklasyfikacja), K8 (brak przedstawiciela), A9–A12 (dane i podatki); K-1 (2 min właściciela w ASC) |
| B. Nie teraz (stan obecny) | KOR zostaje wyłączony; powrót po decyzji o override 18+ albo po 1.0 | + zero ryzyka; − brak rynku KR mimo przekładu ko; uzasadnienie D-300 („nauka prawie nieobecna”) jest już wyjaśnione oceną wiekową, nie kategorią | — |
| C. Włączyć bez warunku K-1 | KOR od razu | + najprościej; − jeśli override 18+ daje w KR 19+, aplikacja może zostać zatrzymana albo odrzucona w KR bez RCN (A1, K5) | brak — K-b nieprzeczytane |

Gdy **K-1 nie przejdzie** (KR pokazuje 19+ albo żąda RCN): albo KR „nie teraz” (B), albo powrót do D-310 (override 18+ to decyzja produktowa: bez override aplikacja ma 13+ globalnie i 12+ w KR). RCN od GRAC dla dewelopera z PL — koszt i procedura `[DO USTALENIA]`, **[prawnik]** albo agent w Korei; nie rekomenduję.

**[prawnik]** potrzebny w A tylko, jeśli GRAC lub App Review zakwestionują ocenę (K-c).

## 3. Wietnam (VN)

### 3.1 Co się zmieniło od D-316 (2026-11-09)

| Element D-316 | Stan 2026-11-10 | Źródło |
|---|---|---|
| vi poza 1.0, umowa i ekran zakupu nie po wietnamsku (4c) | **vi w aplikacji** (`app.json` „vi”; przekład D-385, przegląd D-388); metadane vi w fali 2 (`metadane-fala2.json`), jeszcze niezapisywalne | repo |
| pole Apple „Availability in Vietnam” (2e) | bez zmian: „Vietnamese regulators require games distributed in Vietnam to be licensed to remain available on the App Store in Vietnam.” (A5). Odnośnik Apple do przepisów (game.gov.vn) zwraca dziś stronę „not-found” | A5; `curl` 2026-11-10 |
| oceny wiekowe VN | nowa obserwacja: Apple stosuje tabelę wg dekretu 147 art. 38 do aplikacji z określonymi opisami treści („As required by Article 38 of Vietnam Decree 147, apps that have at least one of the following content descriptors will display the region-specific age rating”, A3), bez ograniczenia do gier. To pokazuje, że Apple wykonuje dekret 147 szerzej niż pole licencji; nie rozstrzyga, czy Education to gra | A3 |
| art. 41 ustawy 19/2023 (4b) | bez zmian, sprawdzony ponownie na tekście PDF: „Trường hợp tổ chức, cá nhân kinh doanh cung cấp dịch vụ liên tục trên lãnh thổ Việt Nam không có đại diện theo pháp luật tại Việt Nam thì phải chỉ định đại diện theo ủy quyền tại Việt Nam […]” (V1). Art. 3 pkt 6: usługa ciągła to usługa „có thời hạn từ 03 tháng trở lên hoặc không xác định thời hạn” — 3 mies. lub dłużej **albo na czas nieokreślony** (V2). Wniosek nowy: **dostęp dożywotni też najpewniej jest „usługą ciągłą”** (czas nieokreślony), więc sprzedaż w VN tylko dożywotniego nie omija art. 41 — **ocena, nie fakt**, **[prawnik]** | V1, V2 |
| rozporządzenie wykonawcze 55/2024 (szczegóły art. 41) | nie przeczytano: nie znaleziono pliku na datafiles.chinhphu.vn (4 adresy 404, przegląd stron dokumentów vanban.chinhphu.vn przerwany — połączenia zrywane) | `[DO USTALENIA]` |
| rynek | bez zmian: ok. 74 USD netto/rok iOS, wariant normalny | `oplacalnosc-2026-11-03.txt:17` |
| sygnał sklepowy | bez zmian: 25/25 nauki (także 9 aplikacji Games), 1/10 gier na żetony | `kr-vn-konkurencja-2026-11-10.json` |

### 3.2 Opcje dla VN

| Opcja | Na czym polega | Kompromis | Co potwierdza wykonalność |
|---|---|---|---|
| **A. Nie teraz, z tanim krokiem wyjaśniającym (rekomendacja)** | VNM zostaje wyłączony (D-316/D-341). Właściciel wysyła do Apple Developer Support (bezpłatnie, ok. 10 min; agent przygotuje tekst po angielsku) dwa pytania: (1) czy aplikacja w kategorii Education bez symulowanego hazardu wymaga licencji gier w VN; (2) czy przy komisancie Apple deweloper z UE musi wyznaczyć pełnomocnika z art. 41 ustawy 19/2023 dla subskrypcji. Powrót do decyzji po odpowiedzi | + bez ryzyka; + odpowiedź Apple zamyka 2a/2e z D-316 bez kosztu; − Apple może nie odpowiedzieć na pytanie prawne (2); − brak ok. 74 USD/rok w wariancie normalnym | Apple Developer Support (krok właściciela); art. 41 rozstrzyga ostatecznie tylko **[prawnik]** |
| B. Warunkowo w aktualizacji po 1.0 | Włączyć VN, gdy (a) Apple potwierdzi na piśmie, że Education nie potrzebuje licencji gier, **i** (b) art. 41 rozstrzygnięty: opinia prawna albo pełnomocnik w VN | + jasna ścieżka; − (b) to koszt poza zakresem właściciela (płaci tylko za Apple Developer, CLAUDE.md) i więcej niż wartość rynku (ocena) | jak A plus opinia prawna (OP-13: dziś nie) |
| C. Włączyć w 1.0 | VNM od razu, bo vi jest gotowe | + rynek; − ryzyka 2a–2e i 4b z D-316 bez zmian; przy uznaniu za grę usunięcie ze storefrontu; art. 41 dotyczy także dożywotniego (V2) | brak |

## 4. Rekomendacja łączna

- **KR: A — warunkowo w 1.0** po kroku K-1 (2 min właściciela w ASC) i K-2 (ponowienie listy konkurencji). Po spełnieniu: KOR dopisany do dostępności (167 storefrontów); zmiana plików `store/` i workflowu to osobne zadanie po decyzji.
- **VN: A — nie teraz**, pytanie do Apple Developer Support (10 min właściciela).
- Obie rekomendacje czekają na decyzję właściciela (pytanie przez koordynatora). Do tego czasu `store/` i kod bez zmian.

## 5. Otwarte

| ID | Pytanie | Krok i kto |
|---|---|---|
| K-1 | Jaką ocenę KR daje override 18+ i czy wymaga RCN | właściciel, ASC → App Information → Age Ratings, wiersz „Republic of Korea” po zapisaniu ankiety (2 min); wynik do `asc-reczne-wartosci.md` §2 |
| K-2 | Czy sygnał sklepowy KR bez zmian | agent: `node docs/wydanie/konkurencja/sprawdz-storefronty.mjs` przed włączeniem (5 min) |
| K-3 | Czy 18+ uruchamia w KR potwierdzanie wieku przy pobraniu (utrudnia zakup dorosłym) | nie przeczytano; odczyt pojawi się w K-1 albo w App Review |
| K-4 | Ustawa o handlu elektronicznym i PIPA dla nierezydenta | niskie; **[prawnik]** tylko przy skardze |
| V-1 | Licencja gier dla Education w VN | Apple Developer Support (właściciel) |
| V-2 | Art. 41 przy komisancie; dożywotni jako usługa ciągła | Apple Developer Support, ostatecznie **[prawnik]** |
| V-3 | Rozporządzenie 55/2024 (szczegóły art. 41) | nie przeczytano (plik niedostępny z kontenera) |
