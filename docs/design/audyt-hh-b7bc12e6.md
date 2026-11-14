# Audyt: Studio Projektowe (UX, marka, przepływy) — Szkoła Pokera, ekrany scenariuszy — 2026-11-13
Commit: b7bc12e6 · Tryb: audit (sesja HH, polecenie `koordynacja:docs/koordynacja/polecenia/HH.md` @ 6ccb1f90) · Środowisko: Linux, Node 22, pnpm install --frozen-lockfile kod 0, Chromium + Playwright z obrazu; Expo web niedostępny (brak `react-native-web` w `apps/mobile/package.json`), więc zrzuty z renderu prawdziwych komponentów przez jest → HTML (D-1630); brak macOS, VoiceOver i Dynamic Type na urządzeniu.

Wyjątek nazwany od trybu audit roli (raport w `audit/`, bez commitu): polecenie HH każe zapisać raport i zrzuty w `docs/design/` i wypchnąć gałąź; kod aplikacji nietknięty (dowód na końcu).

## Podsumowanie
Nowe elementy z HA, GB i FV (zdanie zakresu sprawdzenia FW-01, wpis rywala FW-02, bloki ręki mieszanej §3, przyciski flop-size D-1500) są wdrożone zgodnie ze specyfikacją FW przy domyślnym rozmiarze tekstu; zrzuty 390 i 320 odpowiadają makietom `wzorce-zrzuty/fw/`. Odstępstwa dotyczą części wspólnych ekranu scenariusza, których GB i FW przy AX5 nie sprawdzały: nagłówek i etykiety ulic w dzienniku nie mają układu dla dużego tekstu, a pasek ocen akcji to białe kafle o stałej podstawie 96 pt (spec: te same segmenty co przed decyzją), więc „Sprawdzenie (call)” łamie się w środku wyrazu już przy rozmiarze domyślnym. Żadne znalezisko nie jest KRYTYCZNE ani WYSOKIE według progu wydania z `CLAUDE.md`, więc wydanie nie jest blokowane. Decyzje dla właściciela: sposób zrzutów (dodać `react-native-web` jak Trening albo zostać przy renderze z drzewa) i układ ekranu startu przy długich sytuacjach.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 04-studio-projektowe-001 | P1 (ŚREDNIE) | D | Pasek ocen akcji łamie nazwy akcji w środku wyrazu i odbiega od spec (białe kafle zamiast segmentów) | otwarte |
| 04-studio-projektowe-002 | P1 (ŚREDNIE) | D | Nagłówek ekranu scenariusza przy AX5: tytuł w pionie litera po literze, etykieta ulicy nachodzi na tytuł | otwarte |
| 04-studio-projektowe-003 | P2 (NISKIE) | D | Etykieta ulicy w dzienniku ma stałą szerokość 64 pt, przy AX5 „Preflop” w trzech kawałkach | otwarte |
| 04-studio-projektowe-004 | P2 (NISKIE) | D | Werdykt nie wyróżnia twojego wyboru złotem (spec: złoto = ty) | otwarte |
| 04-studio-projektowe-005 | P2 (NISKIE) | D | Wiersz River w river-value bez karty rivera (FW-02: wiersz ze świeżą kartą) | otwarte |
| 04-studio-projektowe-006 | P2 (NISKIE) | P | Ekran startu: sytuacja SC-22…29 (34–53 słowa) w stylu tytułu, przy 390 pt 11 wierszy pogrubionego tekstu | otwarte |

## Linia bazowa i założenia
Linia bazowa ustalona przed porównaniem z makietą FW:
- **Kontekst użycia:** nauka w spokoju, telefon w ręce, sesja kilkuminutowa, oczy wolne. Moduł „oczy zajęte” nie dotyczy. Kluczowa czynność: przeczytać dane zadania (karty, zakres rywala), wybrać akcję, zrozumieć ocenę. Najtrudniejszy realny kontekst to duży tekst (AX5) na wąskim telefonie (320 pt, iPhone SE i Powiększenie ekranu).
- **Klisze kategorii:** zielone sukno i karty to klisza z funkcją: niesie dane rozdania (zasada „Lekcja z Treningu”). Element firmowy D-116 (`PasekStrategii`, segmenty akcji na granacie) niesie dane decyzji. Spec przenosi go na ocenę: te same segmenty ze słowem stopnia (`docs/design/scenariusz-i-ocena.md:20`).
- **Wzorzec:** Trening `2d97581` robi zrzuty przez Expo web (repo trening, plik package.json, wiersz 85: `react-native-web`). Tu go nie ma, więc zamiennik (D-1630).
- **Soczewki:** (1) użytkownik z AX5 na 320 pt: znaleziska 002, 003, 001; (2) VoiceOver: etykiety z drzewa (zakres bez osobnej etykiety, kryterium 4 FW, test zielony), pasek ocen jako obraz z opisem; (3) krytyk klisz: brak nowych ozdób, ale białe kafle oceny to zestaw kart SaaS zamiast elementu firmowego (001); (4) nowa osoba: sytuacja na starcie w stylu tytułu (006).
- **Założenia do rejestru (`docs/zalozenia.md`):** brak zmian statusu.

Wymiary pokrycia:
| Wymiar | Wynik |
|---|---|
| Konteksty użycia | nauka w spokoju; najtrudniejszy: AX5 na 320 → 001, 002, 003 |
| Stany kluczowych ekranów | start, decyzja, ocena (zgodna, niedokładność, błąd, ręka mieszana zgodna i błąd), koniec: zrzuty; ładowanie, offline, błąd zapisu: sprawdzone, brak zmian w HA/GB (prop `bladZapisu` bez zmian) |
| Element firmowy | `PasekStrategii` przy decyzji zgodny (przy AX5 segmenty w stos, `apps/mobile/src/components/PasekStrategii.tsx:62`); na ocenie zastąpiony kaflami → 001 |
| Podłogi dostępności | kontrast tekstu OK (`dowody/hh-kontrast.txt`); AX5 → 001–003; kolor nie jest jedynym nośnikiem (znak ✓ ✗ ~ + słowo); cele: przyciski akcji minHeight 64, Zakończ 44 |
| Ruch, haptyka, dźwięk | sprawdzone, brak zmian w zakresie HH |
| Obecność poza ekranami | nie dotyczy zakresu HH |
| Głos i teksty | zdanie zakresu, „Też dobrze”, „Lepiej: … albo …” zgodne z kluczami FW; brak wykrzykników i emoji |
| Motyw ciemny, zwiększony kontrast | nie sprawdzono: render jest daje motyw jasny (`useColorScheme` bez mocka); nowe elementy używają istniejących tokenów (`tk.ink`, `tk.muted`), bez nowych par |
| Lokalizacja | en: render UI po angielsku z treścią pl (baza testowa `dbCn` jest pl), więc długość tekstów en niesprawdzona na treści; tylko pl jako dowód |

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| SC-22, SC-25, SC-28, SC-29 (river-value): decyzja, ocena bet i check | tak, 390/320 × domyślny/AX5 | `dowody/hh-sonda.test.tsx.txt`, `dowody/hh-pl-sc-28-decyzja-390.png`, `dowody/hh-pl-sc-29-ocena-check-320-ax5.png` |
| SC-13 (flop-size): start, decyzja, ocena | tak | `dowody/hh-pl-sc-13-decyzja-320-ax5.png`, `dowody/hh-pl-sc-13-ocena-bet-small-390.png` |
| Ręka mieszana (fixture GB, AKs `correct: [4bet, call]`; w `content/` brak takiego wpisu) | tak | `dowody/hh-pl-mix-ocena-call-390.png`, `dowody/hh-pl-mix-ocena-fold-320-ax5.png` |
| Start i koniec SC-28 | tak | `dowody/hh-pl-sc-28-start-390.png` |
| Przepełnienia (wszystkie 46 ekranów) | tak, z odsianiem artefaktów (D-1631) | `dowody/hh-przepelnienie.txt` |
| Kontrast par nowych i ocenowych | tak, motyw jasny | `dowody/hh-kontrast.txt` |
| Kod: `EkranScenariusza.tsx`, `komponenty.tsx`, `PasekStrategii.tsx`, `tokens.ts` | tak, fragmenty | odwołania w znaleziskach |
| Motyw ciemny, en z treścią en, VoiceOver i Dynamic Type na urządzeniu | nie: ograniczenia renderu i brak macOS | lista dla telefonu w „Decyzjach” |

Ograniczenia renderu (D-1630): krój zastępczy (Liberation Sans zamiast SF Pro i Literata), bez cieni, Chromium zamiast Yoga. Słowo dłuższe niż wiersz Chromium ucina, a iOS łamie w środku wyrazu, więc ucięcia pojedynczego słowa (przycisk „Zobacz podsumowanie”, werdykt przy AX5) to artefakt; ten sam stan zaakceptowała FW (`fw-river-value-i-mieszana.md`, sekcja Otwarte).

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/design/audyt-hh-b7bc12e6.md . docs/design --rola 04-studio-projektowe` → OK, kod 0 (wynik wklejony przy oddaniu, `dowody/hh-sprawdz-raport.txt`).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| SP-01 | dotyczy | ok: każdy element ekranów wynika z przepływu scenariusza (start → decyzja → ocena → koniec); bez osieroconych przycisków |
| SP-02 | dotyczy | znalezisko 001 (na ocenie element firmowy zastąpiony kaflami); przy decyzji ok |
| SP-03 | dotyczy | ok w zakresie HH: kolory z `useTokens`, odstępy z `odstep`; stałe 64 i 96 to wymiary → 001, 003 |
| SP-04 | dotyczy | ok dla tekstu (`dowody/hh-kontrast.txt`); obwódki 1,87:1 i 1,53:1 nie niosą samodzielnie informacji (wybór ma tekst „twój wybór”, 6,20:1); ciemny nie sprawdzono |
| SP-05 | dotyczy | ok: stopnie mają znak i słowo, ulica bieżąca podkreślenie + pogrubienie |
| SP-06 | dotyczy | ok: akcje minHeight 64, Zakończ 44 |
| SP-07 | dotyczy | znaleziska 001, 002, 003 |
| SP-08 | nie dotyczy | brak ruchu w nowych elementach |
| SP-09 | dotyczy | ok: „Zakład (bet)” w przycisku, dzienniku, werdykcie i pasku; „albo” zgodnie z `scenario.or` |
| SP-10 | dotyczy | ok w zakresie HH (stany ocen z ręką mieszaną obecne); pozostałe stany bez zmian |
| SP-11 | dotyczy | ok |
| SP-12 | dotyczy | znalezisko 001 (kafle z jednym promieniem i obwódką bez decyzji) |
| SP-13 | dotyczy | linia bazowa `wzorce-zrzuty/fw/` jest; znaleziska 001, 004, 005; reszta zgodna |
| SP-14 | nie dotyczy | zakres HH nie zmienia krojów; na zrzutach krój zastępczy |
| SP-15 | dotyczy | ok w kodzie: przyciski RN, brak gestów bez alternatywy |
| SP-16 | nie dotyczy | ikona i start aplikacji poza zakresem HH |
| SP-17 | dotyczy | ok: nauka w spokoju, bez kontekstu rąk i oczu zajętych |
| SP-18 | dotyczy | ok w drzewie: zakres czytany jako tekst, pasek ocen z opisem (`scenario.scale.label`), werdykt ogłaszany (`useAnnounce`); Pogrubiony tekst i kolejność na urządzeniu: nie sprawdzono (brak iOS) |
| SP-21 | nie dotyczy | ikona poza zakresem HH |

## Znaleziska (szczegóły)

### 04-studio-projektowe-001 · Pasek ocen akcji łamie nazwy akcji w środku wyrazu i odbiega od spec
- Pozycja listy kontrolnej: SP-13
- Poziom: P1 (próg wydania: ŚREDNIE, nie blokuje)
- Realność: realny · Pewność: wysoka (kod i arytmetyka szerokości), średnia co do dokładnego miejsca podziału na iOS
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:235` (segmentOceny: flexGrow 1, flexBasis 96, padding odstep.m); kafel `apps/mobile/src/features/scenariusz/komponenty.tsx:101` na tle `tk.surface` z obwódką. Spec: `docs/design/scenariusz-i-ocena.md:20` (te same segmenty co przed decyzją). Przy 390 i trzech akcjach kafel ma ok. 114 pt, a nazwa Sprawdzenie 17 pt semibold się nie mieści: `dowody/hh-pl-mix-ocena-call-390.png` (podział Sprawdze/nie); przy AX5 dwa kafle w wierszu i każde słowo w kawałkach: `dowody/hh-pl-mix-ocena-fold-320-ax5.png`. Wzorzec: `wzorce-zrzuty/fw/mix-zgodna-390.png` (granatowe segmenty), przy AX5 pionowy stos.
- Mechanizm: stała podstawa bez zależności od fontScale, a pasek przed decyzją już ją ma (`apps/mobile/src/components/PasekStrategii.tsx:62`, podstawaSegmentu z PixelRatio.getFontScale()); `grep -n "flexBasis: 96" apps/mobile/src` → 1 trafienie (linia 235 pliku komponenty.tsx).
- Powraca: nie (pierwszy raz zgłoszone; audyt 5b-6 nie miał zrzutów)
- Wzorzec lub źródło: `docs/design/scenariusz-i-ocena.md:20`; D-116 (element firmowy); kalibracja Zestaw kart SaaS
- Kroki w aplikacji: dowolny scenariusz list-hand z trzema akcjami (pas, sprawdzenie, 4-bet) → wybór → ocena; przy dużym tekście każdy scenariusz.
- Opcje: (a) pasek ocen jako `PasekStrategii` w stanie „po ocenie” (granat, złota obwódka wyboru), z tą samą podstawą od fontScale — zgodne ze spec i elementem firmowym, większa zmiana; (b) zostawić kafle, ale podstawa `podstawaSegmentu(fontScale)` i minimalna szerokość dla najdłuższej nazwy — mniejszy diff, spec dalej niespełniona. Rekomendacja: (a).
- Test akceptacyjny: test ekranu: segment oceny ma tę samą podstawę co segment decyzji przy fontScale 1 i 3,12; zrzut 390 domyślny bez podziału „Sprawdzenie” i AX5 320 w pionowym stosie (lista telefonu).
- Status: otwarte

### 04-studio-projektowe-002 · Nagłówek ekranu scenariusza przy AX5: tytuł w pionie, etykieta ulicy nachodzi na tytuł
- Pozycja listy kontrolnej: SP-07
- Poziom: P1 (próg wydania: ŚREDNIE; Zakończ dalej działa)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:248-251`: wiersz z przyciskiem Zakończ, nagłówkiem i etykietą ulicy (minWidth 64), bez flexWrap, bez gałęzi dla dużego tekstu i bez maxFontSizeMultiplier (tekst styl.naglowek i styl.drobny skaluje się ×3,12). Zrzut: `dowody/hh-pl-sc-28-decyzja-320-ax5.png` (tytuł litera po literze, „River” na tytule). Wzorzec: `wzorce-zrzuty/fw/rv-po-320-ax5.png` (Zakończ, Scenariusz i ulica jeden pod drugim).
- Mechanizm: wiersz bez wariantu dla dużego tekstu (start ma tylko przycisk, więc problem dotyczy przebiegu i oceny); `grep -n "justifyContent: 'space-between'" apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` → 2 trafienia: linia 248 (nagłówek) i 374 (wiersz listy na ekranie końca, poza zakresem tego znaleziska).
- Powraca: nie
- Wzorzec lub źródło: podłogi dostępności (tekst do AX5, układ przechodzi w pionowy stos); HIG Typography
- Kroki w aplikacji: Ustawienia → Dostępność → Większy tekst → AX5 → dowolny scenariusz.
- Opcje: (a) przy fontScale ≥ progu (jak `SKALA_BEZ_PASKA`) wiersz w kolumnę: Zakończ, tytuł, ulica — zgodne z makietą; (b) sufit maxFontSizeMultiplier na tytule i ulicy (jak etykiety paska nawigacji systemu) — mniej pracy, tekst nawigacji mniejszy niż treść. Rekomendacja: (a), bo makieta FW tego wymaga.
- Test akceptacyjny: test z fontScale 3,12: nagłówek renderuje się w kolumnie (flexDirection column); zrzut AX5 320 bez nachodzenia (lista telefonu).
- Status: otwarte

### 04-studio-projektowe-003 · Etykieta ulicy w dzienniku przy AX5 dzieli słowa
- Pozycja listy kontrolnej: SP-07
- Poziom: P2 (próg wydania: NISKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:81` (styl.drobny, width 64): przy AX5 drobny 13 pt × 3,12 ≈ 40 pt, „Preflop” potrzebuje ok. 2,5 raza więcej. Zrzut: `dowody/hh-pl-mix-ocena-fold-320-ax5.png` („Pr/efl/op”), `dowody/hh-pl-sc-28-decyzja-320-ax5.png` („Riv/er”).
- Mechanizm: stała szerokość przy tekście skalowanym; `grep -n "width: 64" apps/mobile/src/features/scenariusz` → 1 trafienie (linia 81 pliku komponenty.tsx).
- Powraca: nie
- Wzorzec lub źródło: podłogi dostępności (układ w pionowy stos przy dużym tekście); wzorzec FW: ulica nad wpisem
- Kroki w aplikacji: AX5 → scenariusz → dziennik pod stołem.
- Opcje: (a) przy dużym tekście ulica nad wpisem (kolumna) — zgodne z makietą; (b) minWidth zamiast width — prosto, ale wiersz dalej ciasny. Rekomendacja: (a), razem z 002.
- Test akceptacyjny: test z fontScale 3,12: etykieta bez stałej szerokości.
- Status: otwarte

### 04-studio-projektowe-004 · Werdykt nie wyróżnia twojego wyboru złotem
- Pozycja listy kontrolnej: SP-13
- Poziom: P2 (NISKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:294` (Werdykt dostaje zwykły tekst z zdanieWerdyktu); spec `docs/design/scenariusz-i-ocena.md:18` (złoto = ty); zrzut `dowody/hh-pl-mix-ocena-call-390.png` vs `wzorce-zrzuty/fw/mix-zgodna-390.png` (wybór złoty pogrubiony).
- Mechanizm: zdanie jako jeden ciąg; brak znacznika w kluczach `scenario.verdict.*`. Jedno miejsce.
- Powraca: nie
- Wzorzec lub źródło: spec oceny D-544
- Kroki w aplikacji: każda ocena w scenariuszu.
- Opcje: (a) znacznik w kluczu (np. `<b>{{akcja}}</b>` przez RichText) — zmiana 12 słowników; (b) zostawić (złoto jest na pasku ocen) i dopisać decyzję zmieniającą spec. Rekomendacja: (b) do decyzji przy 001: jeśli pasek ocen wróci do segmentów ze złotem, wyróżnienie w werdykcie jest zbędne.
- Test akceptacyjny: decyzja zapisana albo test werdyktu z fragmentem wyróżnionym.
- Status: otwarte

### 04-studio-projektowe-005 · Wiersz River w river-value bez karty rivera
- Pozycja listy kontrolnej: SP-13
- Poziom: P2 (NISKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: spec `docs/design/fw-river-value-i-mieszana.md:26` (FW-02: wiersz River ze świeżą kartą); kod `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:154` (sam play.log.check); zrzut `dowody/hh-pl-sc-28-decyzja-390.png` vs `wzorce-zrzuty/fw/rv-po-390.png`. Kryterium 2 FW nie wymagało karty, więc testy są zielone.
- Mechanizm: dziennik w żadnym rodzaju nie pokazuje kart ulicy (także flop w SC-13: `dowody/hh-pl-sc-13-ocena-bet-small-390.png`), więc to spójne z resztą aplikacji, a niezgodne tylko z makietą FW.
- Powraca: nie
- Wzorzec lub źródło: FW-02
- Kroki w aplikacji: SC-22/25/28/29 → decyzja.
- Opcje: (a) karta ulicy na początku wiersza dziennika we wszystkich rodzajach — spójne, większy zakres; (b) poprawić makietę FW (karty są na stole) i zamknąć — zero kodu. Rekomendacja: (b), bo karta jest na stole 2 cm wyżej.
- Test akceptacyjny: (b) zapis decyzji i makieta bez karty w dzienniku.
- Status: otwarte

### 04-studio-projektowe-006 · Ekran startu: długa sytuacja w stylu tytułu
- Pozycja listy kontrolnej: SP-13
- Poziom: P2 (NISKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: P
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:104` (Title z sytuacją); spec `docs/design/scenariusz-i-ocena.md:15` (D-545: tytuł szablonu = sytuacja). Sytuacje nowych szablonów mają 34–53 słowa (SC-29: 271 znaków, z regułą „Załóż, że…” i zakresem); zrzut `dowody/hh-pl-sc-28-start-390.png` (11 wierszy pogrubienia przy 390), `dowody/hh-pl-sc-28-start-320-ax5.png`.
- Mechanizm: D-545 zakładało krótką sytuację; od SC-22 sytuacja niesie też dane zadania.
- Powraca: nie
- Wzorzec lub źródło: Warsztat grafika (hierarchia: najważniejsze największe; nie cały akapit w tytule), NN/g
- Kroki w aplikacji: Scenariusze → SC-28 albo SC-29.
- Opcje: (a) tytuł = pierwsze zdanie sytuacji, reszta zwykłą treścią (styl.tresc) — jedna zmiana w kodzie, bez zmiany treści; (b) krótkie pole tytułu w szablonie (rola 06 pisze 35 szablonów × 12 języków) — czytelniej, dużo pracy; (c) zostawić. Rekomendacja: (a).
- Test akceptacyjny: zrzut startu SC-29 przy 390: tytuł najwyżej 3 wiersze.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Kolejność na ocenie: spec wymienia werdykt pierwszy „od góry” (`docs/design/scenariusz-i-ocena.md:17`), a ekran pokazuje nad werdyktem stół i dziennik (`dowody/hh-pl-mix-ocena-call-390.png`); makieta FW zaczyna od werdyktu. Brakuje: decyzji, czy stół na ocenie jest zamierzony (żadnego wpisu nie znalazłem).
- Motyw ciemny i zwiększony kontrast nowych elementów: render jest daje tylko jasny.
- Teksty en na treści en: sonda miała treść pl (baza testowa pl).
- Zachowanie iOS przy słowie dłuższym niż wiersz (AX5, „podsumowanie”): Chromium ucina, iOS według makiety FW łamie; do potwierdzenia na telefonie.

## Co działa dobrze i należy zachować
- Zdanie zakresu sprawdzenia pod stołem: treść, kolejność klas i styl jak spec FW-01; przy AX5 320 czytelne bez ucięć (`dowody/hh-pl-sc-28-decyzja-320-ax5.png`).
- Przyciski decyzji przechodzą w pionowy stos przy AX5 (`PasekStrategii` z podstawą od fontScale); flop-size ma nazwę i kwotę w dwóch liniach.
- Ręka mieszana: werdykt „Też dobrze: 4-bet”, widoczny blok „to też dobre zagranie”, „Dlaczego nie” tylko dla pasa, „Lepiej: … albo …” przy błędzie — zgodnie z §3.
- Karty na stole bez skalowania (allowFontScaling false), więc stół nie rozjeżdża się przy AX5.

## Decyzje dla właściciela
1. Źródło zrzutów w kolejnych audytach (D-1630): (a) dodać `react-native-web` jak Trening (repo trening, package.json, wiersz 85) i robić zrzuty z Expo web — prawdziwy layout Yoga w przeglądarce, nowa zależność do utrzymania (zmiana dla roli 08); (b) zostać przy renderze z drzewa jest — bez zależności, ale przybliżenie i artefakty do odsiewania. Rekomendacja: (a).
2. Znalezisko 006 (opcje wyżej): rekomendacja (a).
3. Lista dla telefonu (iPhone, AX5 i domyślny, jasny i ciemny): SC-28 decyzja i ocena; ręka mieszana nie ma jeszcze treści w `content/`, więc tylko po jej wejściu; VoiceOver: zdanie zakresu, pasek ocen, werdykt.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 04-studio-projektowe --tryb fix --zadania 04-studio-projektowe-001,04-studio-projektowe-002,04-studio-projektowe-003` (wdrożenie: rola 08; 004–006 po decyzjach).

Pliki śledzone nietknięte (`git status --porcelain` przed commitem, tylko nowe pliki w `docs/design/`): zob. `dowody/hh-git-status.txt`.
