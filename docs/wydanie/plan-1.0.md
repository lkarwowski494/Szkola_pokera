# Plan wydania 1.0 w App Store (rola 10, E0: plan bez wdrożenia)

Stan: 2026-11-09, sesja K (tylko dokumenty), commit wejściowy 0f03c8e. Zadanie: D-302 (właściciel: „Tak, plan, ale z kilkoma największymi językami”). Tryb: samodzielny D-296 (pytania produktowe rozstrzygnięte rekomendacją jako A „przyjęta wg D-296”, do weta).

**Wyjątek nazwany (prompt roli):** repo `prompts` jest prywatne; `add_repo` odrzucony przez klasyfikator trybu auto, klon bez logowania nie działa (`could not read Username`). Prompt roli 10 nie został przeczytany. Zamiast niego wzorem jest to, jak Trening zaplanował i wydał 1.0 (D-191): `docs/41-droga-do-app-store.md`, `docs/42-plan-wydania-1.0.md`, `docs/48-zgloszenie-1-0.md` (repo `lkarwowski494/trening`, SHA 2e4b0f8, odczyt 2026-11-09). Ryzyko wyjątku: brak listy kontrolnej roli 10. Tańsza kontrola zamiast niej: lista braków A–F skopiowana z Treningu (§5) i dopasowana do naszej aplikacji.

**Wynik w skrócie**
- Języki 1.0: **pl, en, ja, pt-BR, fr, zh-Hant** (D-303, A wg D-296). Pozostałe 29 przyjdą w aktualizacjach (D-292 się nie zmienia).
- Scenariusz całego rozdania (F-12) **nie wchodzi do 1.0, tylko do 1.1** (D-305, A wg D-296). To zmiana zakresu, więc bramka wymaga słów właściciela: pytanie P-1, §9.
- Data wysłania do Apple: **2026-11-24 – 2026-12-05, najpewniej ok. 2026-11-27** [OCENA]. Publikacja zwykle 1–2 dni po wysłaniu. Założenia są w §7, a wariant z F-12 w 1.0 jest o 2–3 dni późniejszy.
- Ścieżka krytyczna: naprawa treści → zamrożenie źródła → przekład en → przekład pozostałych 4 języków → pełny audyt → kandydat w TestFlight → telefon → wysłanie → recenzja (§8).

## 1. Analogia z Treningu (D-191; SHA 2e4b0f8, odczyt 2026-11-09)

| Co | Jak w Treningu | Miejsce | U nas |
|---|---|---|---|
| Lista braków do „Submit for Review” | bloki A build i jakość, B zakupy, C zrzuty, D metadane, E prawo i kontakt, F wysyłka; kolumny: kto, wpis (API / ręcznie), zależy od, blokuje, czas agenta, czas właściciela | `docs/41-droga-do-app-store.md:52–145` | ten sam układ (§5) |
| Kolejność | najpierw pełny audyt w repo i naprawy blokerów, potem build 1.0 | `docs/41:12–27` | tak samo (bez przenosin repo: aplikacja jest poza portfelem Apps4brew, CLAUDE.md) |
| Wydanie 1.0 | ręcznie, po kontroli na telefonie; pierwsze wydanie bez etapowania | `docs/42-plan-wydania-1.0.md:18–23` | tak samo (D-304) |
| Aktualizacje | stopniowo przez 7 dni; pauza po 1. zgłoszeniu utraty danych albo awarii przy starcie albo po 3 zgłoszeniach tego samego błędu | `docs/42:25–42` | tak samo (D-304) |
| Zły build | ocena realności → pauza → test odtwarzający → poprawka → przyspieszona recenzja | `docs/42:44–54` | tak samo (§10) |
| Zrzuty | workflow `store-screenshots.yml` z danymi pokazowymi; 35 języków ≈ 1,5–2 h zegarowo; repo publiczne: minuty macOS bez opłat | `docs/41:83–105` | ten sam wzór dla 6 języków (C1) |
| Czas recenzji | „co najmniej 50% < 24 h, 90% < 48 h” | `docs/41:144` | odczytane ponownie dziś (§7) |
| DSA (UE) | status przedsiębiorcy zweryfikowany przez Apple 20.10.2026 | `docs/48-zgloszenie-1-0.md:117`, `docs/45-formalnosci-asc.md:21` | to samo konto dewelopera: tylko sprawdzić stan (E4) |

Odstępstwa nazwane:
1. Adresy polityki prywatności i wsparcia nie są na apps4brew.com, bo aplikacja jest poza portfelem (CLAUDE.md, D-266). Wybór adresu należy do właściciela (P-2).
2. Bez przenosin do czystego repo (`docs/41` E1). U nas repo jest od początku publiczne, a historia nie zawiera cudzych długich cytatów. To sprawdza audyt (A3, prawa autorskie).

## 2. Języki 1.0 (D-303, A wg D-296, do weta)

Dane: przesiew 45 storefrontów i rachunek opłacalności roli 02 (`docs/monetyzacja.md:231–256`; `docs/monetyzacja/dowody/oplacalnosc-2026-11-03.txt:3–21`, wynik normalny iOS, USD netto/rok, wariant cen z 2026-11-03). Rachunek dla starych cen, ale proporcje między krajami zostają. Storefronty według D-301: 166 krajów, bez VN, TR, KR, CN, AF, GA, MA i PL.

| Język | Storefronty (oceny/rok konkurentów) | iOS norm. [USD/rok] | Storefront dostępny w 1.0 | Koszt API przekład + przegląd [OCENA] | Czas agenta [OCENA] | Uwagi |
|---|---|---|---|---|---|---|
| en | US 3548, CA 482, GB 281, AU 189 | 886,83 + 96,66 + 78,75 + … | tak | 7–11 USD (`plan-09.md` §8) | 15–22 h (rola 09 K1–K8) | rynek główny; język zastępczy po przekładzie (D-289) |
| pl | — (bez storefrontu) | — | nie (decyzja właściciela 2026-11-03) | 0 (źródło) | 0 | w aplikacji jak w Treningu (D-292) |
| **ja** | JP 1711 | 455,15 | tak (warunki J1–J2, D-301) | 8–11 USD | 4–6 h | 2. rynek; lokalizacja zbiera tam popyt (`monetyzacja.md:237`); CJK: krój Literata bez CJK → krój systemowy (`jezyki.md:90`) |
| **pt-BR** | BR 283 | 99,05 | tak | 7–9 USD | 2–3 h | `NAKLADKI` pt-BR → pt (`packages/jezyki/src/jezyki.ts:17`): w 1.0 pełny słownik pt-BR, pt później ([DO USTALENIA] K2, rola 09) |
| **fr** | FR 277 (+ część BE, CH, CA) | 99,21 | tak | 7–9 USD | 2–3 h | formy `many/one/other` |
| **zh-Hant** | TW 264, HK 159 | 97,22 (sam TW) | tak | 8–11 USD | 2–3 h | drugi CJK: praca nad krojem wspólna z ja |
| razem 1.0 poza en | | | | **30–40 USD** (+ en 7–11) | **10–15 h** (4–6 sesji) | |

Metoda kosztu API [OCENA, przed przebiegiem zastąpi ją `--szacuj`]: wejście = źródło pl (ok. 270 tys. tokenów, `plan-09.md` §8) + odniesienie en (D-289) + glosariusz w każdym żądaniu; wyjście = przekład (pismo CJK ok. 1,3–1,6× tokenów łacinki [OCENA]); przegląd = pl + en + przekład na wejściu, propozycje na wyjściu; cennik Opus 5.5 Batch z `plan-09.md` §8 (stan 2026-10-06, odczyt u źródła przed przebiegiem). Każdy przebieg (jeden język, przekład albo przegląd) zmieści się poniżej 15 USD (limit D-295 dla en). Kwotę dla czterech języków właściciel potwierdza osobno (krok W-03, §9).

**Rekomendacja A (przyjęta wg D-296): ja, pt-BR, fr, zh-Hant.** To cztery największe rynki z rachunku po US, z dostępnym storefrontem. Ta sama kolejność jest w fali 1 (D-131, `jezyki.md:33`) z pominięciem vi (storefront VN nie teraz, D-301) i de (najmniejszy, 58,16). Razem z US te rynki dają ok. 93% wyniku normalnego iOS rachunku (886,83 + 455,15 + 99,05 + 99,21 + 97,22 + CA/GB w en 175,41 = 1 812,87 z 1 956,72 USD).

| Opcja | Języki poza pl i en | Kompromis | Czas agenta | Data (§7) |
|---|---|---|---|---|
| **A (rekomendacja)** | ja, pt-BR, fr, zh-Hant | 4 największe rynki z rachunku; dwa pisma CJK sprawdzają krój i łamanie wierszy raz dla obu | 10–15 h | bazowa |
| B | ja, pt-BR, fr, zh-Hant, es (+ es-419 jako nakładka) | hiszpański ma łącznie MX 168 + ES 111 + AR 61 + CO 45 = 385 ocen/rok (`monetyzacja.md:245–249`), ale nie był w rachunku przychodu (brak liczby); +1 język | +2–3 h | +0,5–1 dnia |
| C | tylko ja | najszybciej; US + JP to 69% wyniku (`monetyzacja.md:282`); BR, FR i TW bez języka do pierwszej aktualizacji | 4–6 h | −1–2 dni |
| D | pt-BR, fr, de (bez CJK) | bez ryzyka kroju CJK, ale bez 2. rynku (JP 455 USD wobec 58–99) | 6–9 h | −0,5–1 dnia |

Odrzucone: vi (storefront VN dopiero po sprawdzeniu prawnym, D-301), ko (KR sporny, D-300), de (najmniejszy z listy krótkiej). Kolejna fala po 1.0: es/es-419 i de, potem reszta według `jezyki.md:33`.

## 3. Pomiar stanu (2026-11-09, commit 0f03c8e; dowód: `docs/wydanie/dowody/stan-2026-11-09.txt`)

| Co | Wynik | Dowód |
|---|---|---|
| `pnpm test:akceptacja` | **kod 1: 3 czerwone z 14** (domena/treść); ekrany: brak testów oczekujących (wszystkie w `apps/mobile`, D-175) | `dowody/stan-2026-11-09.txt`; szczegóły niżej |
| `pnpm run ci` | **kod 0** (§3a) | tamże |
| E2E na szczycie kodu | brak dowodu na af71a5e (Maestro 504 ×2, nie kod); dispatch z aplikacją z 42566410755 w toku u koordynatora; pełny E2E po pushu sesji I | `plan-08.md` „Koordynacja” 06:49 |
| Flowy oczekujące | 07 Scenariusz (czeka na treść scenariuszy, D-255) i 08 Drugi język (czeka na `content/en`) | `apps/mobile/e2e/oczekujace/` |

Czerwone testy akceptacyjne (wszystkie wymagają poprawki treści, rola 06):

| Test | Co nie przechodzi | Waga (CLAUDE.md, próg wydania) |
|---|---|---|
| AK-BR-KURS-005-a (RD-05-W1) | 7 miejsc z przybliżeniem z reguły 2 i 4 bez słowa „przybliżenie”: `m2-l1-outy.md` (×3), `m7-l3-implied-odds.md`, `exams/m2.yaml` (×3) | **WYSOKIE**: niepełne twierdzenie liczbowe |
| AK-BR-CWI-005-b (RD-09-W1) | ICM bez ograniczenia modelu (umiejętności, pozycja): `m11-l3-icm.md`, `exams/m11.yaml` | **WYSOKIE**: twierdzenie merytoryczne bez ograniczenia |
| AK-BR-KURS-003-b | 162 z 162 terminów nie ma w `terms.yaml` pola lekcji definiującej, więc nie da się sprawdzić kolejności „definicja przed użyciem” | ŚREDNIE jako brak danych. Każdy termin użyty przed definicją po uzupełnieniu pola to błąd spójności (CLAUDE.md, „Spójność”); ocena po uzupełnieniu |

Wszystkie trzy muszą być naprawione **przed zamrożeniem źródła do przekładu** (K4). Inaczej każda poprawka w pl otwiera nową falę przekładu w 5 językach.

### 3a. `pnpm run ci` (stan wejściowy, 0f03c8e)
**Kod 0.** Testy: srs 21, jezyki 136, poker-core 155, domena 314, preflop-solver 43 (tym razem w limicie; F-SOLVER-CZAS nadal otwarte), postep 105, content-build 124, mobile 453; `pnpm i18n`: 0 błędów, 455 kluczy, języki: pl; `content:check`: 0 błędów, 0 uwag, krytyczne: 56. Osobno `pnpm i18n:kod`: **kod 1**, 10 błędów i 18 uwag (A04-10, w toku w sesji I). Dowód: `docs/wydanie/dowody/stan-2026-11-09.txt`.

### 3b. Funkcje MVP z `docs/scope-contract.md`: co nie jest gotowe

| Funkcja | Stan | Dowód | Co brakuje do 1.0 |
|---|---|---|---|
| F-12 scenariusz całego rozdania | **niegotowa**: maszyna domeny jest (`packages/domena/src/scenariusz.ts`), ale treść ma 0 scenariuszy, w aplikacji nie ma ekranu przebiegu scenariusza (`session.tsx` bez trybu scenariusza), a wejście na „Dziś” jest ukryte (D-255) | `e2e/oczekujace/07-scenariusz.yaml:2`; D-255 | treść 06 (scenariusze z oceną każdej decyzji i źródłem, BR-SCN-003 i RD-11 to blokery), ekran 08, flow 07, przekład. **Propozycja: 1.1** (D-305, P-1) |
| F-16 języki | mechanizm jest (D-269), ale żaden język poza pl | `plan-09.md` §2 | rola 09 (en) i języki 1.0 (§2) |
| F-17 opinie | ukryte „Oceń w sklepie”, „Napisz do nas”, „Zgłoś błąd” (brak App Store ID i adresu poczty) | 08-F23, D-270 | fakty właściciela (W-04) |
| F-13 zakup | kod jest; w App Store Connect brak produktów; zdanie o anulowaniu (10-US-01/02, 10-JP-01) robi sesja I | D-301; CLAUDE.md „Sklep: … częściowo” | produkty IAP i ceny (W-06), piaskownica na telefonie (W-08) |
| F-01 ocena poziomu | działa; BR-ONB-001/002 spełnione częściowo (brak pytania o cel i samooceny) | 08-F19 (ŚREDNIE) | decyzja 01/06: zostawić jako nazwane uproszczenie albo dopisać pytania (§4, wiersz 08-F19) |
| pozostałe (F-01–F-11, F-13–F-15, F-18) | w kodzie; E2E 01–06, 09 zielone na 6ea86fa | `plan-08.md` „Raport nocy D-272” | tylko naprawy z §4 |

## 4. Pełna lista pracy do 1.0

Waga według CLAUDE.md „Audyty i wydania”: wydanie blokują tylko KRYTYCZNE i WYSOKIE. ŚREDNIE mają przypisaną wersję. W kolumnie „1.0?”: **B** = bloker, **P** = planowane w 1.0, ale może przejść do 1.0.1 bez łamania progu.

### 4.1. Kod i treść (pas kodu: jedna sesja naraz)

| # | Praca | Źródło | 1.0? | Sesje agenta [OCENA] | Zależy od |
|---|---|---|---|---|---|
| K-01 | Sesja I (w toku): A04-10, A04-11, 10-US-01/02 + 10-JP-01 (EkranZakupu), F-SOLVER-CZAS, ponowienie pobrania Maestro; push → E2E | `koordynator.md:46` | B (10-US/JP: warunki D-301; A04-10: warunek przekładu) | 1 | — |
| K-02 | Treść: 3 czerwone testy akceptacyjne (§3) | `dowody/stan-2026-11-09.txt` | B (dwa WYSOKIE) | 1–2 | — |
| K-03 | Rola 09 en: K1–K8 z `plan-09.md` §11 (mechanizm, narzędzie API, glosariusz, zamrożenie, słownik i treść en, zrzuty en, flow 08 w bramce, rejestr) | `plan-09.md` §6, §11 | B (D-302) | 5–8 | K-01, K-02, W-02 (klucz API) |
| K-04 | Języki 1.0: ja, pt-BR, fr, zh-Hant: przebieg API (przekład + przegląd), kontrola (a) treści krytycznej (11 twierdzeń + H-INT-2, D-135), `content:build`, krój CJK, formy mnogie i dane `Intl` dla polyfillu, `supportedLocales`, nazwa pod ikoną (`locales/systemowe/<kod>.json`), zrzuty | `plan-09.md` §5; D-303 | B (D-302) | 4–6 | K-03 (mechanizm i en jako odniesienie, D-289), W-03 |
| K-05 | Rendering terminów `{{t:…}}` w ja, pt-BR, fr, zh-Hant (D-287: decyzja 09 z 06 przy fali). Założenie planu: jak w Treningu, nazwa angielska poza pl (`docs/16-jezyki-i-marka.md:27` Treningu, cytowane w D-287); wariant z nazwami lokalnymi wymaga przeczytanych źródeł dla 162 terminów × 4 języki (+2–4 sesje 06) | D-287 | B (część K-04) | w K-04 | K-03 |
| K-06 | ŚREDNIE z wersją „przed upublicznieniem”: A04-12 (haptyka), A04-13 (pasek po ocenie); wykonania D-284: 08-F15 (tokeny kart), 08-F22 (limit ⚙︎), 08-F24 („Powtórki na dziś”); NISKIE A04-14–A04-18 przy okazji | `audyt-5b-6.md:29–54`; `zgloszenia-08.md` | P | 1–2 | — |
| K-07 | 08-F21: test renderu ekranu sesji (mutanty M29–M32 przeżywają) | `zgloszenia-08.md` | P (luka testów; zachowanie sprawdza E2E) | 0,5–1 | — |
| K-08 | 08-F19: pytanie o cel i samoocena w ocenie poziomu albo zapis uproszczenia (rola 01/06 decyduje, czy kryterium BRD zmienić) | `zgloszenia-08.md` | P | 0–1 | decyzja 01/06 |
| K-09 | Adresy w kodzie: `ADRES_PRYWATNOSCI`, `ID_APLIKACJI_SKLEPU`, `ADRES_KONTAKTOWY` (`platform/adresy.ts`) → przycisk polityki działa, sekcja „Opinie” i „Zgłoś błąd” widoczne; testy | 08-F20 (WYSOKIE dla App Store), 08-F23 | B | 0,5 | W-04, W-05 |
| K-10 | Strona polityki prywatności i wsparcia (pl, en + 4 języki): treść zgodna z „Data Not Collected” (`docs/architektura/prywatnosc.md` §3), kontakt, numer pomocy przy hazardzie; publikacja według P-2 (np. GitHub Pages z katalogu `site/` jak Trening `site/privacy.html` przed apps4brew) | `docs/41` D5, D9, E5 Treningu | B (5.1.1(i)) | 1 | P-2 |
| K-11 | Sklep w repo jak Trening `store/`: `app-store-metadata.json` (nazwa, podtytuł, opis, słowa kluczowe ≤ 100 B, tekst promocyjny) w 6 językach i lokalizacjach ASC (en-US, en-GB, en-CA, en-AU, ja, pt-BR, fr-FR, fr-CA, zh-Hant), `review-notes.md`, testy długości i zgodności opisu z kodem (bez nazw innych aplikacji, 2.3.7; bez obietnicy wygranej, NFR-ZGOD-002) | `docs/41` D1–D4, A5 Treningu | B | 1–1,5 (tekst pl/en w pasie dokumentów, przekład przez API w K-04) | K-04 |
| K-12 | Zrzuty sklepu: workflow `store-screenshots.yml` (dane pokazowe, ekrany przez łącza, iPhone 6,9″ i 6,3″, 6 języków) + zrzut zakupu do przeglądu (B4) | `docs/41` C1, B4 Treningu | B (zrzuty wymagane) | 1–2 (+ CI ok. 1 h) | K-04 |
| K-13 | Naprawy KRYTYCZNYCH i WYSOKICH z pełnego audytu (A3): test odtwarzający, `pnpm run ci`, E2E; bez drugiego audytu | CLAUDE.md „Audyty i wydania” pkt 2, 4 | B | 1–3 (zależy od znalezisk) | D-03 |
| K-14 | Wersja 1.0.0 (`app.json` `version`, dziś 0.1.0), numer buildu, export compliance (sprawdzić `ITSAppUsesNonExemptEncryption`), kandydat: push → E2E zielony → `testflight.yml` (bramka E2E jest, D-170) | `docs/41` A6–A8 Treningu | B | 0,5–1 (+ CI) | K-13; zgoda właściciela na TestFlight |
| K-15 | (tylko przy P-1 = B) F-12: scenariusze w treści (06), ekran przebiegu (08), flow 07 do bramki, przekład scenariuszy w 6 językach | scope-contract F-12 | B przy P-1 = B | 3–5 | K-03 |

### 4.2. Dokumenty (pas dokumentów, równolegle)

| # | Praca | 1.0? | Sesje [OCENA] | Zależy od |
|---|---|---|---|---|
| D-01 | Tekst sklepu pl/en (podtytuł, opis, słowa kluczowe), notatki dla recenzenta (bez hazardu: nauka decyzji, bez żetonów; 5.3.4 i 5.1.1(ix) z RYZ-02); propozycja nazwy en „Poker School” ze sprawdzeniem dostępności w App Store (D-293) | B | 1 | — |
| D-02 | Kategoria wiekowa: kwestionariusz Apple przeczytany w dniu pracy, odpowiedź „Simulated Gambling” według OG-02 (scenariusze bez stawki → „None”, jeśli definicja S-19 się nie zmieniła); zamyka OP-18 | B (2.3.6) | 0,5 | — |
| D-03 | **Pełny głęboki audyt całości** przed upublicznieniem (stała lista: dane, migracje, prywatność, sekrety, prawa autorskie, dostępność, ryzyko odrzucenia; treść krytyczna w 6 językach; zgodność manifestu prywatności z kodem K-08). Od startu audytu zakres zamrożony | B | 1–2 | K-03, K-04, K-06–K-12 (stan kandydata bez zrzutów) |
| D-04 | Lista kontrolna telefonu dla kandydata 1.0: T-01–T-10 ze `scope-contract.md` + języki (samosprawdzenie `Intl`, zmiana języka bez restartu, lekcja w en i ja) + piaskownica (6 scenariuszy kontraktu płatności) + U-2, U-5 z `plan-08.md` | B | 0,5 | K-14 |
| D-05 | Plan wydania i plan „zły build” (§10) przeczytany przez właściciela (W1-08 Treningu) | B | 0 (jest w tym pliku) | — |
| D-06 | Zestawienie kroków ASC krok po kroku z adresami stron Apple przeczytanymi w dniu wysyłki (wzór `docs/48` Treningu: Z-14…Z-29) | B | 0,5–1 | D-01, D-02 |
| D-07 | Rejestry: dokumenty 03, 04, 05 na Dysku (konektor nie edytuje Google Docs: krok właściciela albo eksport) | P | — | — |

### 4.3. Zgłoszenia otwarte: przypisanie do 1.0

| ID | Waga | Gdzie w planie |
|---|---|---|
| 08-F20 polityka prywatności | WYSOKIE (App Store) | K-09, K-10, W-04 |
| 08-F23 App Store ID, poczta | ŚREDNIE | K-09, W-05 |
| 08-F19 cel i samoocena | ŚREDNIE | K-08 |
| 08-F21 test renderu sesji | ŚREDNIE | K-07 |
| 08-F15, F22, F24 (wykonania D-284) | NISKIE/ŚREDNIE | K-06 |
| 08-F17 (06), F18 (05/07), F26 (06), F28 (dok. 13) | NISKIE | 1.0.1 albo przy okazji K-02 (06); nie blokują |
| A04-10, A04-11 | ŚREDNIE (warunek przekładu) | K-01 |
| A04-12, A04-13 | ŚREDNIE | K-06 |
| A04-14–A04-18 | NISKIE | K-06 przy okazji, inaczej 1.0.1 |
| 10-US-01, 10-US-02, 10-JP-01 | warunki D-301 (blokują publikację w US i JP) | K-01; przekład zdania ja: K-04 (warunek J1: skutek anulowania) |
| 10-JP-02 oznaczenie sprzedawcy | warunek D-301 (JP) | W-07 |
| W4/J3 test marek na treści en i ja | warunek D-301 | K-03 (en), K-04 (ja) |
| F-SOLVER-CZAS | ŚREDNIE (fałszywa czerwień CI) | K-01 |

## 5. App Store Connect (wzór `docs/41` Treningu, bloki B–F)

| # | Co | Kto | Wpis | Zależy od | Czas właściciela [OCENA] |
|---|---|---|---|---|---|
| B1 | Produkty: `pl.lkarwowski.szkolapokera.kwartal` i `.rok` (grupa subskrypcji „pelny”), `.dozywotni` (niezużywalny); ceny 9,99 / 14,99 / 19,99 USD i tabele cen Apple dla pozostałych krajów; Family Sharing wyłączone; lokalizacje nazw produktów w 6 językach; Small Business Program (15%) | właściciel (albo agent przez API ASC za zgodą, jak Trening `scripts/asc/iap-localizations.mjs`) | ręcznie / API | — | 30–45 min |
| B2 | Pierwsze zakupy każdego typu w tym samym zgłoszeniu co wersja 1.0; zrzut zakupu do przeglądu (K-12) | właściciel przy F1 | ręcznie | K-12 | w F1 |
| C1 | Zrzuty iPhone (wymagany rozmiar z Dynamic Island) w 6 językach; iPad niepotrzebny, jeśli `supportsTablet: false` (sprawdzić w `app.json`) | agent (CI) | API | K-12 | 15 min akceptacja |
| D1 | Nazwa (≤ 30 znaków) dla każdej lokalizacji, podtytuł, opis, słowa kluczowe, Support URL, Privacy Policy URL, Copyright | agent (teksty) + właściciel (Copyright, adresy) | API / ręcznie | D-01, K-11, P-2 | 15 min |
| D2 | Kategoria (Education [OCENA], do sprawdzenia z wzorcem konkurencji), wiek (D-02), App Privacy „Data Not Collected” (NFR-PRYW-001) | właściciel | ręcznie | D-02 | 20 min |
| D3 | Dostępność: 166 storefrontów z D-301 (bez PL, VN, TR, KR, CN, AF, GA, MA) | właściciel | ręcznie | warunki D-301 spełnione | 10 min |
| D4 | Język główny rekordu aplikacji w ASC: sprawdzić, jaki jest dziś; rekomendacja en-US (storefronty bez lokalizacji pokazują język główny) [DO SPRAWDZENIA] | właściciel | ręcznie | — | 5 min |
| D5 | Opcja wydania: ręcznie (D-304) | właściciel | ręcznie | — | 1 min |
| E1 | Status przedsiębiorcy DSA (UE): zweryfikowany 20.10.2026 dla konta (Trening) — sprawdzić, że widnieje także przy tej aplikacji | właściciel | — | — | 2 min |
| E2 | JP: oznaczenie sprzedawcy wg 特定商取引法 albo zapisany wyjątek (10-JP-02) | właściciel + rola 10 (warianty) | — | — | 15–30 min |
| F1 | Wersja 1.0: build, zrzuty, metadane, zakupy → „Submit for Review” | właściciel (agent sprawdza kompletność) | ręcznie | wszystko z B | 20–30 min |
| F2 | Recenzja Apple; odrzucenie → Resolution Center, naprawa według progu | Apple / agent | — | F1 | czekanie (§7) |
| F3 | „Release” po kontroli kandydata na telefonie | właściciel | ręcznie | F2 | 5 min |

## 6. Szacunek czasu (zasada 9)

**Czas agenta** (sesja ≈ 2–3 h pracy agenta [OCENA, z dziennika `plan-08.md` „Koordynacja”: sesje F, G, H, J 2026-11-09]):

| Pas | Wariant A (F-12 w 1.1) | Wariant z F-12 w 1.0 |
|---|---|---|
| Kod i treść (K-01–K-14) | 16–28 sesji | 19–33 sesje |
| Dokumenty (D-01–D-06) | 4–6 sesji (równolegle, nie wydłuża) | 4–6 sesji |

**Czekanie** (bez pracy agenta i właściciela):

| Na co | Ile | Źródło |
|---|---|---|
| E2E iOS po każdym pushu kodu | ok. 20–40 min (build ok. 21 min; z aplikacją z innego przebiegu 20,5 min) | `plan-08.md` „Koordynacja” 21:24 i 06:49 |
| Przebieg API (Message Batches) | do 24 h na przebieg [DO SPRAWDZENIA u źródła przed przebiegiem]; 2 przebiegi na język (przekład, przegląd); en osobno, cztery języki jednym zestawem → ok. 4 przebiegi po kolei | D-294 |
| TestFlight z bramką E2E | E2E + build ok. 1–1,5 h [OCENA; Trening „CI ~1,5 h”, `docs/41:18`] | `.github/workflows/testflight.yml:15–39` |
| Recenzja Apple | „App Review works around the clock, typically reviewing at least 50% of submissions in less than 24 hours and 90% in less than 48 hours.” | https://developer.apple.com/distribute/app-review/ (odczyt 2026-11-09) |
| Telefon właściciela | właściciel w pracy do 14:00 UTC w dni robocze: test kandydata najwcześniej tego samego popołudnia | D-296 |

**Czas właściciela** (osobno, §9): razem ok. 6–8 h [OCENA], w tym telefon 3–4 h i App Store Connect 1,5–2 h.

## 7. Data docelowa (przedział z założeniami)

Założenia:
1. Tempo: jedna sesja kodu naraz i jedna sesja dokumentów (polecenie koordynatora); ok. 3 sesje kodu dziennie w dzień, bez nocy (noce tylko za zgodą właściciela) [OCENA z dziennika 2026-11-09].
2. Klucz API (W-02) i zgoda na kwotę (W-03) przyjdą w ciągu doby od gotowości `--szacuj` (ok. 11–12.11).
3. Audyt nie znajdzie blokera wymagającego przebudowy (inaczej decyzja właściciela: naprawa albo wyłączenie, CLAUDE.md pkt 5).
4. Fakty właściciela (W-04, W-05, W-07) są do 2026-11-17.
5. Recenzja Apple bez odrzucenia (odrzucenie: +1–3 dni [OCENA]).

| Etap | Okno [OCENA] |
|---|---|
| K-01 (sesja I), K-02 treść, start K-03 (K1, K2, K3a) | 10–11.11 |
| K-03: przebiegi API en, przegląd, nałożenie 3 fal, K6–K7 | 12–14.11 |
| K-04: cztery języki (przebiegi, przegląd, kontrola (a), krój CJK) | 14–18.11 |
| K-06–K-12 (backlog, adresy, strona prywatności, sklep w repo, zrzuty) | 17–20.11 (część równolegle z K-04 w pasie dokumentów) |
| D-03 pełny audyt + K-13 naprawy | 20–22.11 |
| K-14 kandydat 1.0 → TestFlight; W-08 telefon; B1–E2 w ASC | 22–25.11 |
| F1 wysyłka → recenzja → F3 Release | **wysłanie 24.11 – 05.12, najpewniej ok. 27.11; publikacja zwykle 1–2 dni później** |

Wariant z F-12 w 1.0 (P-1 = B): +3–5 sesji kodu i treści, więc wysłanie **27.11 – 09.12**. Szacunek koordynatora sprzed planu dla samego pl+en (17–24.11, D-302) mieści się w dolnej części przedziału po odjęciu K-04.

## 8. Ścieżka krytyczna i ryzyka

```
K-01 sesja I ─┐
K-02 treść ───┴→ K-03 en: K1/K2/K3a → [W-02 klucz] → K4 zamrożenie → przebiegi en → nałożenie → K6/K7
   → K-04 ja, pt-BR, fr, zh-Hant (przebiegi, kontrola (a), krój CJK) → K-11/K-12 sklep i zrzuty w 6 językach
   → D-03 pełny audyt (zakres zamrożony) → K-13 naprawy → K-14 kandydat 1.0 → TestFlight → W-08 telefon
   → F1 wysyłka (+ B1–E2 gotowe wcześniej) → F2 recenzja → F3 Release
Równolegle (poza ścieżką): D-01, D-02, D-06 dokumenty; K-06–K-10 kod; W-04/W-05/W-07 fakty właściciela.
```

| Ryzyko | Ocena | Kontrola |
|---|---|---|
| Przekład zmienia sens reguły albo liczbę w 5 językach | realne | znaczniki `{{n:}}`/`{{t:}}` i skrypt; drugi przegląd API; kontrola (a) treści krytycznej w każdym języku; audyt D-03 |
| Poprawka treści pl po zamrożeniu otwiera nową falę przekładu × 5 | realne | K-02 przed K4; zmiany po zamrożeniu tylko KRYTYCZNE i WYSOKIE (jednym przebiegiem dla wszystkich języków) |
| Krój i łamanie wierszy CJK (Literata bez CJK) | realne dla ja, zh-Hant | krój systemowy (D-122 od AX1), zrzuty K-12, lista telefonu; wariant C/D, gdy wyjdzie bloker |
| Brak adresu polityki prywatności blokuje wysyłkę (5.1.1(i)) | realne | W-04 z terminem 17.11; K-10 strona gotowa wcześniej |
| Odrzucenie przez Apple: hazard (5.3.4), kategoria wiekowa, subskrypcja (3.1.2) | brzegowe | notatki dla recenzenta (D-01), kwestionariusz zgodnie z prawdą (D-02), zdania o odnawianiu i anulowaniu (10-US/JP), plan aktualizacji D-108 |
| Subskrypcja bez stałej wartości bez F-12 (3.1.2(a), OG-05) | brzegowe | Pro = bez limitu ćwiczeń, powtórek i powtórnych egzaminów; F-12 w 1.1 jako pierwsza aktualizacja kwartalna (D-108); w razie pytania recenzenta: odpowiedź z planem aktualizacji |
| Przebieg API trwa do 24 h albo przekracza kwotę | brzegowe | `--szacuj` przed wysłaniem, limit w skrypcie, `--wznow`; cztery języki jednym zestawem |
| Niestabilne E2E (Maestro 504, test solvera 59/60 s) | realne | K-01 (ponowienie pobrania, limit 180 s); ścieżka awaryjna bramki tylko z powodem |
| Właściciel niedostępny w dzień (praca) | realne | kroki właściciela zebrane w paczki z terminami (§9); telefon po 14:00 UTC |
| Pełny audyt znajdzie bloker wymagający przebudowy | brzegowe | decyzja właściciela: naprawa teraz albo wyłączenie funkcji (CLAUDE.md pkt 5) |

## 9. Kroki i decyzje właściciela (z terminami [OCENA])

| # | Krok | Termin | Czas |
|---|---|---|---|
| P-1 | **Zakres: F-12 scenariusz w 1.1 (rekomendacja A, D-305) czy w 1.0 (B, +3–5 sesji, wysłanie ok. 3 dni później).** Bramka „Zmiany zakresu” wymaga słów właściciela | 10.11 (pytanie zbiorcze 14:00 UTC 09.11) | 2 min |
| W-01 | Weto albo akceptacja D-303 (języki 1.0), D-304 (sposób wydania), D-305 | 10.11 | 10 min |
| W-02 | Sekret `ANTHROPIC_API_KEY` w ustawieniach repo, po `--szacuj` z kwotą ≤ 15 USD (en) | ok. 11–12.11 (gdy K3a gotowe) | 10 min |
| W-03 | Zgoda na kwotę przekładu i przeglądu ja, pt-BR, fr, zh-Hant: łącznie ok. 30–40 USD [OCENA], limit 15 USD na przebieg (jak D-295) | do 14.11 | 2 min |
| P-2 | **Adres polityki prywatności i wsparcia** (08-F20, rano „zostaw [DO USTALENIA]”, D-281). Opcje: A (rekomendacja) GitHub Pages tego publicznego repo (`lkarwowski494.github.io/Szkola_pokera/…`), 0 USD, tak zaczynał Trening (`docs/41:162`); B podstrona apps4brew.com (aplikacja poza portfelem); C własna domena (koszt, później). Krok: włączenie Pages w ustawieniach repo | do 17.11 | 10–15 min |
| W-04 | Adres poczty do opinii i zgłoszeń (Support URL musi prowadzić do kontaktu) | do 17.11 | 5 min |
| W-05 | App Store ID (numer „Apple ID” z App Information w ASC; rekord aplikacji już jest, bo są buildy TestFlight) | do 17.11 | 2 min |
| W-06 | ASC: produkty i ceny (B1), Small Business Program, Family Sharing wyłączone, kategoria i wiek (D2), App Privacy, 166 storefrontów (D3), język główny (D4), DSA (E1), Copyright, kontakt dla recenzenta | 20–24.11 | 1,5–2 h |
| W-07 | JP: dane sprzedawcy wg 特定商取引法 albo zapisany wyjątek (10-JP-02); warianty przygotuje rola 10 | do 20.11 | 15–30 min |
| W-08 | Zgoda na TestFlight kandydata; telefon: lista D-04 (T-01–T-10, języki, piaskownica, U-2, U-5) | 23–25.11 | 3–4 h |
| W-09 | Akceptacja zrzutów sklepu i tekstu pl/en (opis, podtytuł, nazwa „Poker School”) | 20–22.11 | 20–30 min |
| W-10 | Wysyłka (F1) i „Release” po kontroli (F3) | 24.11 → po akceptacji | 30 min |
| W-11 | Rejestry 03/04/05 na Dysku (konektor nie edytuje Google Docs) | przy okazji | 15 min |

Lista 32 stanów do zrzutu z `zgloszenia-08.md` (64 pliki) przestaje być osobnym krokiem: stany, które da się ustawić łączem, robi workflow zrzutów (K-12), a resztę obejmuje lista telefonu W-08. To propozycja do akceptacji koordynatora, bez zmiany decyzji 04.

## 10. Wydanie, aktualizacje, zły build (D-304, analogia `docs/42` Treningu)

1. **Bramki przed wysłaniem:** pełne `pnpm run ci` i jeden pełny katalog E2E zielony na commicie kandydata (jedno ponowienie flowu dozwolone); pełny audyt i naprawy KRYTYCZNYCH/WYSOKICH; 0 czerwonych w `pnpm test:akceptacja` (poza F-12, jeśli 1.1); warunki D-301 (W1–W4, J1–J2) spełnione; lista telefonu odhaczona na tym samym buildzie.
2. **1.0 ręcznie:** po akceptacji Apple właściciel klika „Release” po kontroli kandydata na telefonie. Pierwsze wydanie bez etapowania (`docs/42:22` Treningu).
3. **Aktualizacje:** stopniowo przez 7 dni (1%, 2%, 5%, 10%, 20%, 50%, 100%). Pauza po pierwszym zgłoszeniu utraty danych albo awarii przy starcie albo po 3 zgłoszeniach tego samego błędu (`docs/42:27–42`; strona Apple przeczytana tam 20.10.2026, ponowny odczyt przy pierwszej aktualizacji).
4. **Zły build** (KRYTYCZNE/WYSOKIE po wydaniu): ocena realności → pauza etapowania → test odtwarzający → poprawka, `pnpm run ci`, E2E → dane użytkownika najpierw zabezpieczone → nowy build (TestFlight, lista dla dotkniętych punktów) → przyspieszona recenzja → „Co nowego” z informacją. Wadliwy język: wycofanie wydaniem (D-295 pkt 1).
5. **Pierwsza aktualizacja (1.1):** F-12 (przy P-1 = A), es/es-419 i de, ŚREDNIE i NISKIE z backlogu (§4.3); plan kwartalny D-108.

## 11. Decyzje tej sesji (wpisane w `docs/decyzje.md`)
- D-303 (A wg D-296, do weta): języki 1.0 = pl, en, ja, pt-BR, fr, zh-Hant.
- D-304 (A, proces, do weta): sposób wydania według `docs/42` Treningu (ręcznie po telefonie, aktualizacje stopniowo 7 dni, zły build) i kolejność: treść naprawiona przed zamrożeniem źródła, pełny audyt po przekładach.
- D-305 (A wg D-296, warunkowo, do weta): F-12 poza 1.0, w 1.1; wiąże dopiero po słowach właściciela na bramce zmiany zakresu (P-1).

