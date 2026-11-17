# Weryfikacja g5-dostepnosc-a (M1, 2026-11-17)

Kod aplikacji: commit f75acdff16915aeb43ff788888216e28616c11ed (gałąź robocza różni się od niego tylko plikami `audit/M1-2026-11-17/` i `docs/decyzje/IR.md`; sprawdzone `git diff --name-only f75acdff HEAD`). Bez iOS: skutki na urządzeniu oceniane z kodu, rachunku i zrzutów web z katalogu dowodów roli 04. Próg: CLAUDE.md „Audyty i wydania” pkt 1. Etap: TestFlight wewnętrzny, poza właścicielem brak użytkowników.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 04-studio-projektowe-001 | potwierdzone w kodzie, skutek obalony dla obecnej treści (wada uśpiona) | `apps/mobile/src/components/PasekStrategii.tsx:159`, `apps/mobile/src/theme/tokeny.ts:40`; dowody/g5-dostepnosc-a-001-pasek.txt | P2 (było P1) | nie | nie |
| 04-studio-projektowe-003 | potwierdzone (na web ucięte; na iOS raczej łamanie w środku wyrazu, niepewne bez zrzutu iOS) | `apps/mobile/src/features/scenariusz/komponenty.tsx:244`; dowody/g5-dostepnosc-a-003-poziom.txt | P2 (było P1) | nie | nie |
| 04-studio-projektowe-004 | potwierdzone (rachunek; zrzutu iOS brak) | `apps/mobile/src/features/advancement/AdvancementCard.tsx:59`; dowody/g5-dostepnosc-a-004-liczby.txt | P2 (było P1) | nie | nie |
| 08-programista-006 | potwierdzone | `apps/mobile/src/app/session.tsx:661`; dowody/g5-dostepnosc-a-004-liczby.txt | P2 (bez zmiany) | nie | nie |
| 04-studio-projektowe-005 | potwierdzone | `apps/mobile/src/theme/kroje.ts:7`; dowody/g5-dostepnosc-a-005-pogrubiony.txt | P2 (było P1) | nie | nie |
| 04-studio-projektowe-006 | potwierdzone | `apps/mobile/src/app/(tabs)/progress.tsx:78`; dowody/g5-dostepnosc-a-006-linki.txt | P2 (było P1) | nie | nie |

Wspólna przyczyna: 04-studio-projektowe-004 i 08-programista-006 dotyczą tych samych linii: `apps/mobile/src/app/session.tsx:661`, `apps/mobile/src/app/advancement.tsx:98` i `apps/mobile/src/features/advancement/AdvancementCard.tsx:61`. To rozmiary liczb wpisane poza modułem motywu, bez sufitu `maxFontSizeMultiplier`. 08-programista-006 obejmuje dodatkowo siatki 8 pt i `Menlo`, bez skutku AX5 opisanego w 004. Naprawa jednego zamyka skutek drugiego. 003, 004 i 006 naruszają ten sam próg projektu D-121 (0 tekstów uciętych lub poza pojemnikiem przy AX5, cele ≥ 44 pt), ale przyczyny w kodzie mają różne.

Uwaga ogólna do poziomów: wejście nadaje 001, 003, 004, 005 i 006 poziom P1 z dopiskiem „bez blokady”. Według CLAUDE.md pkt 1 P1 z kategorii „bariera dostępności” blokuje wydanie, więc „P1 bez blokady” jest wewnętrznie sprzeczne. W żadnym z tych ID funkcja nie staje się niedostępna: informacja jest w tekście albo w etykiecie VoiceOver, a sterowanie działa. Po weryfikacji wszystkie są więc P2, do backlogu z wersją, bez blokady TestFlight 1012 i App Store. Żadne nie grozi odrzuceniem w App Review, bo recenzja nie mierzy kontrastu granic, Dynamic Type ani rozmiaru celów. Zastrzeżenie: jeśli w App Store Connect zadeklarowano etykietę dostępności „Larger Text”, deklaracja byłaby nieścisła. Ta deklaracja leży poza repo i nie została sprawdzona.

## 04-studio-projektowe-001 · Pasek strategii: granica między akcjami nie-pas

- Dowód w kodzie się zgadza: `apps/mobile/src/components/PasekStrategii.tsx:159` „backgroundColor: tk.raiseFill, borderColor: tk.onFelt, borderLeftWidth: i === 0 ? 0 : GRUBOSC_OSI”.
- Te same kolory: `apps/mobile/src/theme/tokeny.ts:40` „raiseFill: '#FFFDF7', // część” i onFelt `#FFFDF7` (linia 23). Ciemny motyw dziedziczy oba z jasnego (`...light`), więc granica ma kontrast 1:1 do sąsiada nie-pas.
- Obalony skutek „w aplikacji”: z obecną treścią pasek po ocenie nigdy nie ma dwóch akcji nie-pas o częstości > 0. Jedynym źródłem częstości w zadaniach jest `rangeDecision`: `apps/mobile/src/features/drills/engine.ts:444` „const freqs = [...spot.groups.map((g) => ({ name: g.name, f: g.freqs[h] ?? 0 })), { name: t.range.fold, f: Math.max(0, 1 - play(h)) }];”
- Każdy spot we wszystkich 12 plikach `spots.yaml` ma dokładnie jedną grupę (sonda yaml: MAX 1; dowody/g5-dostepnosc-a-001-pasek.txt). Grupy łączące sprawdzenie i 3-bet są celowo jedną akcją: `content/ranges/spots.yaml:79` „groups: &g-bb-vs-btn { "Bronię ({{t:call}} albo 3-bet)": ["call 2.5", "raise 10"] }”
- Opcje „zły rozmiar” mają częstość 0, więc w pasku zajmują kolumnę szerokości ~0: `apps/mobile/src/features/drills/engine.ts:470` „{ text: w.text, correct: false, sizeError: true, why: w.why, czestosc: 0 }”
- Scenariusze wołają `PasekStrategii` tylko przed decyzją (`wybor={null}`, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:325`); ich ocenę pokazuje `PasekOcenAkcji`.
- Zrzut `po-ocenie-390-jasny.png` pochodzi z fikstury harnessu, nie z treści: `apps/mobile/zrzuty-web/wejscie.tsx:98` „{ text: nazwa('call'), correct: true, why: 'Solver sprawdza z tą ręką w 70% przypadków.', czestosc: 0.7 },”
- Nawet przy trzech akcjach informacja nie ginie. Pod każdym segmentem jest podpis z procentem (`apps/mobile/src/components/PasekStrategii.tsx:175`), a czytnik dostaje opis `opisPaska` (linia 138). WCAG 1.4.11 nie wymaga kontrastu części grafiki, gdy ta sama informacja jest podana tekstem.
- Poziom: P2. To wada uśpiona, która uaktywni się przy pierwszym spocie z dwiema grupami. Blokuje 1012: nie, bo treść nie prowadzi do tego stanu. Blokuje App Store: nie (z tego samego powodu; nie jest to też ryzyko recenzji).

## 04-studio-projektowe-003 · Kontrolka poziomu scenariusza przy AX5

- Dowód się zgadza: `apps/mobile/src/features/scenariusz/komponenty.tsx:244` „segmenty: { flexDirection: 'row', borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: promien.przycisk, overflow: 'hidden' },”
- Segment ma `flex: 1` (linia 245), a tekst `styl.drobny` nie ma `maxFontSizeMultiplier` (linia 42 tego pliku).
- Segmentów jest do czterech: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:108` „const poziomy: WyborPoziomu[] = ['auto', ...p.szablon.levels];”
- Zrzut web `start-320-jasny-ax5.png` z katalogu roli 04 pokazuje ucięte słowo w zaznaczonym segmencie. `zrzuty-web.txt` roli 04 notuje to samo przy 390 i 320 pt w obu motywach. Żadna decyzja tego nie dopuszcza, a D-121 wymaga zera tekstów uciętych przy AX5 (`docs/decyzje.md:30`).
- Zastrzeżenie co do skutku na iOS (niepewne): web nie łamie wyrazu dłuższego niż wiersz, więc go ucina. RN na iOS łamie taki wyraz po znakach, a segment ma tylko `minHeight`, więc rośnie w pionie. Na telefonie należy się więc spodziewać raczej słowa pociętego na 6–7 kawałków po ok. 2 znaki niż ucięcia (rachunek: dowody/g5-dostepnosc-a-003-poziom.txt). Obie formy są dla słabowidzącego nieczytelne, ale żadna nie blokuje działania.
- Funkcja działa: przycisk radio ma rolę i etykietę z tekstu, więc VoiceOver czyta pełne nazwy. Domyślny wybór „Automatycznie” nie wymaga dotykania kontrolki, a zdanie pod nią podaje bieżący poziom (widać na zrzucie).
- Poziom: P2 (narusza próg projektu D-121, nie próg wydania). Blokuje 1012: nie. Blokuje App Store: nie, kontrolka działa i nie jest to ryzyko recenzji.

## 04-studio-projektowe-004 · Liczby wyników w stałych rozmiarach przy AX5

- Dowód się zgadza: `apps/mobile/src/features/advancement/AdvancementCard.tsx:59` „badge: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },”
- Wynik sesji: `apps/mobile/src/app/session.tsx:661` „score: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },”
- Ekran wskaźnika: `apps/mobile/src/app/advancement.tsx:98` „big: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },”
- Nie ma sufitu ani `defaultProps` (grep: 0 trafień, kod 1). Mnożnik AX5 3,12 jak w `scripts/zrzuty/hl-zrzuty.mjs:22`, skala wskaźnika 0–100 (`packages/srs/src/advancement.ts:20`).
- Rachunek (dowody/g5-dostepnosc-a-004-liczby.txt): przy AX5 liczba w plakietce ma 93,6 pt i pole 68 pt. Wartość dwucyfrowa łamie się więc między cyframi i ma 224–336 pt wysokości. Koło nie ma `overflow: 'hidden'`, więc liczba wychodzi poza plakietkę. W pionowym stosie AX5 (`apps/mobile/src/features/advancement/AdvancementCard.tsx:19`) może nachodzić na tytuł i wiersz „Wiedza N”. Wynik „12/15” przy 174,7 pt ma ok. 524 pt szerokości i łamie się na 2–3 wiersze.
- Uwaga do tekstu znaleziska: „ok. 175 pt” to rozmiar kroju, nie szerokość napisu. Szerokość podaje dowód roli 04, a wniosek się nie zmienia. Zrzutu iOS brak, więc skala nachodzenia jest niepewna.
- Funkcja działa: karta jest przyciskiem z pełną etykietą czytnika (`apps/mobile/src/features/advancement/AdvancementCard.tsx:38`). Liczba na ekranie wskaźnika ma `accessibilityLabel` (`apps/mobile/src/app/advancement.tsx:30`), a wynik sesji jest zwykłym tekstem czytanym wprost. Liczby są widoczne, nie ucięte.
- Poziom: P2. Blokuje 1012: nie. Blokuje App Store: nie, nie ma ryzyka recenzji. Warto to naprawić razem z 08-programista-006 przed publikacją, bo to pierwszy element zakładki Postęp.

## 08-programista-006 · Rozmiary i krój tekstu poza modułem motywu

- Potwierdzone grepem (dowody/g5-dostepnosc-a-004-liczby.txt, ostatnia komenda, kod 0). Wszystkie miejsca zgadzają się z wejściem:
  - `apps/mobile/src/app/session.tsx:660` — 28 pt, pole wpisywania;
  - `apps/mobile/src/app/session.tsx:661` — 56 pt;
  - `apps/mobile/src/app/advancement.tsx:98` — 56 pt;
  - `apps/mobile/src/features/advancement/AdvancementCard.tsx:61` — 30 pt;
  - `apps/mobile/src/components/PaintGrid.tsx:189-190` — 8 pt;
  - `apps/mobile/src/components/Blocks.tsx:119` — krój `Menlo`.
- Siatka zakresów, to samo 8 pt: `apps/mobile/src/components/RangeGrid.tsx:63` „label: { fontSize: 8, fontWeight: '600' },”
- Żadna decyzja tych wyjątków nie nazywa (szukane w `docs/decyzje.md`, `docs/decyzje/*.md` i `docs/design/`). D-259 nazywa wyjątki kolorów, nie rozmiarów.
- Przyczyna jest ta sama co w 04-studio-projektowe-004 (trzy z siedmiu linii). Komórki siatek 13×13 rosną z Dynamic Type, bo nie mają `allowFontScaling={false}`, ale mają `overflow: 'hidden'`. Przy dużym tekście etykieta komórki może się więc uciąć. To skutek brzegowy, którego znalezisko nie opisuje.
- Poziom: P2, zgodny z wejściem. Blokuje 1012: nie. Blokuje App Store: nie.

## 04-studio-projektowe-005 · Tytuły w Literacie a „Pogrubiony tekst”

- Potwierdzone: aplikacja ma tylko statyczny plik o wadze 600: `apps/mobile/src/theme/kroje.ts:7` „export const LITERATA = 'Literata-SemiBold';”
- `BoldText` i `isBoldTextEnabled` nie występują w `apps/mobile/src` (grep: kod 1, dowody/g5-dostepnosc-a-005-pogrubiony.txt).
- Uzasadnienie wyboru kroju zakładało reakcję na to ustawienie: `docs/design/02-kierunki.md:170` „pełna oś odmian (reaguje na”. Przy odrzuceniu Instrument Serif nazywa się to podłogą (linia 168 tego pliku). Audyt HH zostawił ten punkt jako niesprawdzony (`docs/design/audyt-hh-b7bc12e6.md:76`).
- Od AX1 tytuły są krojem systemowym (`apps/mobile/src/theme/tokens.ts:82`), który na ustawienie reaguje.
- Poziom: P2. Tytuły do rozmiaru XXXL mają już wagę 600, więc są czytelne, a treść reaguje na ustawienie. Nie ginie ani informacja, ani funkcja. Blokuje 1012: nie. Blokuje App Store: nie, bo „Pogrubiony tekst” nie jest wymogiem recenzji ani etykietą dostępności App Store.

## 04-studio-projektowe-006 · Linki „Słowniczek” i „Pomoc” na Postępie

- Potwierdzone: `apps/mobile/src/app/(tabs)/progress.tsx:78` „<Pressable accessibilityRole="link" onPress={() => router.push('/glossary')}>”
- Link w linii 81 tak samo: `Pressable` bez `style`, `minHeight` i `hitSlop`. Wysokość celu to wysokość wiersza treści, 24 pt: `apps/mobile/src/theme/tokeny.ts:173` „tresc: { size: 17, line: 24, kroj: 'system', textStyle: 'body', maxW: null },”
- Słowniczek ma jedno wejście (grep `'/glossary'`: 1 trafienie). Pomoc ma drugie wejście w Ustawieniach (`apps/mobile/src/app/settings.tsx:105`). Rozmiar celu narusza D-121, który wymaga celów ≥ 44 pt (`docs/decyzje.md:30`).
- Co łagodzi skutek: cel ma pełną szerokość ekranu (Pressable w kolumnie z domyślnym rozciąganiem), a między linkami jest 12 pt odstępu. Wysokość rośnie z Dynamic Type i od rozmiarów AX ma ≥ 44 pt. 24 pt spełnia WCAG 2.2 AA 2.5.8.
- Poziom: P2. Blokuje 1012: nie. Blokuje App Store: nie, bo rozmiar celu nie jest kryterium recenzji, a link działa.
