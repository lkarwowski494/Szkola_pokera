# Audyt zgodności roli 04: ekrany części 5b i 6

Rola 04 (Studio Projektowe), tryb audit, 2026-11-09, gałąź `claude/sleepy-brahmagupta-2065nu` na `381fd39`. Zlecenie: D-281 (c).
Wzorzec: `docs/design/design-spec.md`, makieta `docs/design/ekrany/e3.html` + `e3.css`, `docs/design/tokeny.ts`, D-118–D-123, D-274–D-280.
Decyzje z tego audytu: D-282–D-284 (A, do weta). Waga według progu wydania z `CLAUDE.md` („Audyty i wydania”, pkt 1).

**Wyjątek nazwany (zasada 7).** Prompt roli (`assemble.mjs 04-studio-projektowe --tryb audit`) nie został przeczytany. Repo `lkarwowski494/prompts` jest prywatne, `add_repo` odrzucił klasyfikator uprawnień, a `git clone` bez poświadczeń kończy się błędem `could not read Username`. Zamiast tego: metodyka z `design-spec.md` („Podłogi dostępności”, „Znaczenie kolorów”, „Macierz stanów”), linia bazowa SP-13 (`wzorce-zrzuty/`) i próg wydania z `CLAUDE.md`. Format i miejsce raportu wybrał agent (folder artefaktów roli 04). Koordynator może ponowić audyt z promptem, jeśli prompt wymaga innego formatu.

## Metoda i dowody

| Dowód | Jak | Wynik |
|---|---|---|
| Odczyt kodu | ekrany i komponenty z listy zlecenia (`Stol`, `PasekStrategii`, `SkalaStopni`, `PanelDecyzji`, `StopienOceny`, `kroje.ts`, `tokens.ts`, `session.tsx`, „Dziś”, zakup, start, ustawienia, dane, ocena poziomu, powitanie, zakładki) | znaleziska niżej, plik:linia według `381fd39` |
| Render RNTL (tymczasowy test, niecommitowany; kopia: scratchpad sesji `dowody.test.tsx`, log `dowody-rntl.log`) | `npx jest` w `apps/mobile`, 5/5 przebiegów | A: etykieta stołu „Kto wygrywa” = `Twoje karty: 10♥ 9♥. Na stole (board): A♠ 8♣ 7♦ J♥ 2♠.` (bez kart rywala A♣ A♦, choć są narysowane); B: teksty miejsc i indeks karty bez `allowFontScaling`/`maxFontSizeMultiplier`; C: kontener paska przed decyzją `flexDirection: row` bez `flexWrap`; E: ocena poziomu pokazuje odpowiedzi jako `[[8h 6d 5c]]`, stół z samą pozycją ma etykietę `""` |
| Kontrast (WCAG 2.x, wzór luminancji; przezroczystość złożona z tłem) | skrypt w sesji | `muted` na `surface` przy `opacity 0.75` (jasny): 4,07:1 (próg 4,5); ciemny 5,23:1; `cardBlue` #2456A6 na karcie 6,98 / 6,13; `cardGreen` #2A7A3B 5,23 / 4,59 |
| Analogia z Treningu (D-191; `lkarwowski494/trening` `2e4b0f8`, odczyt 2026-11-09) | grep | `lib/announce.ts:1–10` (ogłoszenia VoiceOver; `accessibilityLiveRegion` działa tylko na Androidzie), strażnik `tests/interaction-guards.test.ts:88`; `lib/theme.ts:33–37` (limity Dynamic Type: `GLYPH_SCALE_MAX = 1.4`, uzasadnienie z telefonu T-04 27.10.2026: znaki bez limitu „wychodzą poza pole albo są ucinane”) |
| Zrzuty ekranu | brak: projekt nie ma `react-native-web`, więc Playwright nie wyrenderuje ekranów; symulator iOS jest poza tym kontenerem | wygląd oznaczony „do sprawdzenia na zrzucie” (lista na końcu) |

## Znaleziska

### WYSOKIE (blokują wydanie)

| ID | Problem | Miejsce | Dowód | Naprawa (rola 08) |
|---|---|---|---|---|
| A04-01 | **Karty rywala nie mają opisu.** Zadanie „Kto wygrywa to rozdanie?” (generowane, `features/drills/text.pl.ts:159`) i egzaminy z `opp` (43 wpisy w `content/`, np. `content/pl/exams/m0.yaml:9`) rysują karty rywala na suknie. Etykieta VoiceOver stołu i opis pod stołem pomijają `opp`. Karty wewnątrz obrazu są ukryte przed czytnikiem (rodzic `accessible`), więc użytkownik VoiceOver nie zna kart rywala i nie może odpowiedzieć na pytanie. Widzący dostaje dwa rzędy kart tej samej wielkości bez podpisu: karty rywala i karty wspólne wyglądają tak samo. | `components/Stol.tsx:34, 45`; `features/stol/uklad.ts:83–90` (`opisKart` bez `opp`); `features/drills/engine.ts:288` | RNTL A | D-282: `opisKart` z „Karty rywala: …”; podpisy rzędów na suknie („Rywal”, „Na stole”); test: etykieta zawiera każdą narysowaną kartę |
| A04-02 | **Surowe tokeny kart w ocenie poziomu.** Odpowiedzi są zwykłym `Text`, więc pytanie m5.exam.q2 z puli oceny (`docs/tresci/ocena-poziomu-pytania.md`) pokazuje „[[8h 6d 5c]]”, „[[Kd Td 3s]]”, „[[Ah Ad 7c]]” (`content/pl/exams/m5.yaml:22–24`). To pierwszy ekran po instalacji, a VoiceOver czyta same kody kart. | `features/ocena-poziomu/EkranyOceny.tsx:55` (i `:33` dla treści) | RNTL E | `RichText` dla treści i odpowiedzi, jak w `session.tsx:359, 473`; test z tokenem `[[…]]` |
| A04-03 | **VoiceOver nie ogłasza oceny.** `accessibilityLiveRegion` działa tylko na Androidzie, a w `src` nie ma ani jednego `announceForAccessibility` (grep). Po dotknięciu akcji przycisk z fokusem znika, a stopień, pasek i skala pojawiają się bez ogłoszenia. To samo dotyczy nagłówka oceny zadań bez strategii i komunikatu o błędzie zapisu. Główna pętla nauki jest dla czytnika ekranu „cicha”. | `features/stol/PanelDecyzji.tsx:44`; `app/session.tsx:400, 361` | grep; wzór Treningu `lib/announce.ts:1–10` | D-283: pomocnik `announce` / `useAnnounce` jak w Treningu; strażnik „bez `accessibilityLiveRegion` poza pomocnikiem” (Trening `tests/interaction-guards.test.ts:88`); ogłoszenie stopnia, opisu paska i nagłówka; razem z 08-F25 |

### ŚREDNIE (backlog z wersją: przed upublicznieniem w App Store; A04-10 przed drugim językiem)

| ID | Problem | Miejsce | Dowód | Naprawa |
|---|---|---|---|---|
| A04-04 | Stół z samą pozycją, bez kart i przebiegu (42 zadania `table: { position: X }`, np. `content/pl/lessons/m6-l1-mdf-alpha.md:80`): pusty owal, pusta etykieta obrazu `""` i pusty tekst pod stołem. 125 zadań ma pozycję i karty bez `path`: pozycja znika z rysunku i z opisu. | `components/Stol.tsx:32–35, 60` | RNTL E; grep `content/pl` | D-282 |
| A04-05 | Tekst w rysunkach skaluje się bez limitu, choć design-spec („Typografia”) mówi, że miejsca i indeksy kart mają stały rozmiar. Przy AX5 nazwa miejsca (13 pt) i stan nie mieszczą się w pigułce 72×40, a indeks karty 26 pt wychodzi poza kartę 52×72. Informację niesie też opis pod stołem, ale podłoga „0 tekstu uciętego albo nachodzącego przy AX5” nie jest spełniona. Dotyczy też kart w tekście (`RichText`, rozmiar `sm`). | `components/Stol.tsx:87–92`; `components/PlayingCard.tsx:36–37` | RNTL B; Trening `lib/theme.ts:36–37` (to samo zjawisko na telefonie) | D-283: `allowFontScaling={false}` w miejscach i indeksach kart (rysunek); znak ⚙︎ i podobne: `maxFontSizeMultiplier={1.4}` |
| A04-06 | Pasek przed decyzją i skala stopni nie zawijają się (wiersz, `flex: 1`). Makieta zawija segmenty (`e3.css:101–102`: `flex-wrap`, `flex-basis: 70px × skala`), a skala ma sufit kroju (`e3.css:112–113`). Przy AX słowa „Przebicie” i „Dopuszczalna” łamią się w środku przy 390 i 430 pt, a D-122 dopuszcza to tylko przy 320. | `components/PasekStrategii.tsx:130–131`; `components/SkalaStopni.tsx:32–33` | RNTL C; porównanie z makietą | D-283: `flexWrap: 'wrap'` + `flexBasis` z `PixelRatio.getFontScale()`; w skali `maxFontSizeMultiplier` z sufitu 6% szerokości |
| A04-07 | Sufit tytułów od AX1 (`typografia.skala.*.maxW`, D-122) nie jest wdrożony (grep `maxW`: tylko tokeny); D-278 odłożył go do „Zostaje”. Słowo stopnia ma 28/34 (`styl.tytul`) zamiast `slowoStopnia` 34/38. | `theme/tokens.ts:86–92`; `features/ocena/StopienOceny.tsx:26–27` | grep | `maxFontSizeMultiplier` liczony z `maxW × szerokość okna / rozmiar` dla `tytul`, `tytulDuzy`, `slowoStopnia`; styl `slowoStopnia` |
| A04-08 | Kontrast: niewybrane odpowiedzi po ocenie mają `opacity 0.75`, więc wyjaśnienie (`muted`, 15 pt) ma 4,07:1 w motywie jasnym (próg 4,5). | `app/session.tsx:458` | pomiar | bez przezroczystości: stan niosą obwódka i znak (już są) |
| A04-09 | Lista lekcji i egzaminów na „Dziś”: etykieta VoiceOver bez stanu („ukończona”, „rozpoczęta”) i bez wyniku `x/y`. Stan widać tylko na rysunku kropki. | `app/(tabs)/index.tsx:140, 161` | odczyt | etykieta z `t()`: tytuł, opis, stan, wynik |
| A04-10 | Teksty wpisane w kod, poza `t()`: legenda i podpowiedź `PaintGrid`, stany pól dla czytnika; etykieta `RangeGrid`; nazwy kart dla czytnika; „Spróbuj ponownie”; „Wróć” w nagłówku. Przy 35 językach się nie przetłumaczą (D-137). Rozstrzyga uwagę o `PaintGrid.tsx:153–156`: to nie jest znane odstępstwo, tylko luka. | `components/PaintGrid.tsx:115, 153–156, 159`; `components/RangeGrid.tsx:15`; `components/PlayingCard.tsx:7–8, 26`; `components/RenderErrorScreen.tsx:17`; `app/_layout.tsx:180` | grep | D-284: klucze `paint.*`, `range.label`, `card.rank.*`/`card.suit.*`, `error.retry`, `nav.back`; brzmienie pl jak dziś. Wersja: przed rolą 09 (drugi język) |
| A04-11 | Etykieta VoiceOver kart bez pozycji używa symboli („10♥ 9♥”), a makieta ma nazwy („dziesiątka pik, siódemka kier…”, `e3.html:118`). Jak VoiceOver po polsku czyta ♥ ♦ ♣ ♠ — do sprawdzenia na urządzeniu. | `features/stol/uklad.ts:79–90` | RNTL A | etykieta z nazw kart (te same klucze co A04-10); tekst widoczny zostaje z symbolami |
| A04-12 | Haptyka niezgodna z tokenami: Zgodna → `Success`, Błąd → `Error`, pozostałe → `Warning`. Tokeny: Zgodna i Dopuszczalna `impactLight`, Błąd `notificationWarning`; `notificationError` jest zarezerwowany dla błędu działania. | `app/session.tsx:239–241`; `theme/tokeny.ts:200–207` | odczyt | mapowanie z `haptyka` |
| A04-13 | Pasek po ocenie (element firmowy D-116): oś ma 16 pt i nie ma obrysu; makieta ma 44 pt, obrys `onFelt` 1,5 i promień 12 (`e3.css:111`). Znacznik to koło 12 pt zamiast trójkąta (`e3.css:114`). Podpisy mają 13 pt zamiast 15 i nie stoją pod swoimi segmentami. | `components/PasekStrategii.tsx:133–138, 115–123` | porównanie z makietą | wysokość 44, obrys, trójkąt (obramowania RN), podpisy `przypis` w szerokości segmentu |
| 08-F24 | „Powtórki” dla wiersza i zakładki | jak w zgłoszeniu | | D-284: wiersz „Powtórki na dziś” |
| 08-F25 | Brak powrotu na górę po „Dalej” | jak w zgłoszeniu | | D-283: (A) przewinięcie na górę i fokus VoiceOver na początek zadania |

### NISKIE (backlog)

| ID | Problem | Miejsce | Rozstrzygnięcie |
|---|---|---|---|
| A04-14 | Treść zadania w `naglowek` 17 pt, nie w Literacie. Makieta ma krótki tytuł sytuacji, a treść w aplikacji to zdania. | `app/session.tsx:359` | akceptacja (D-284): Literata dla opisu ręki i słowa stopnia; zdania treści krojem systemowym |
| A04-15 | Ustawienia: stos obramowanych przycisków zamiast list grupowanych (design-spec, „Komponenty”); nagłówki sekcji bez roli `header`; tytuł `tytul` zamiast `tytulDuzy` | `features/ustawienia/EkranUstawien.tsx:30–45` | naprawa: wiersze jak `WierszGrupy` na „Dziś” |
| A04-16 | Karta: promień 6 i 4 zamiast `promien.karta` 8; cień `'#000'` poza tokenem | `components/PlayingCard.tsx:33, 57` | naprawa: `promien.karta` (sm: 4 zostaje, mały rysunek), `tk.shadow` |
| A04-17 | Zakup: „Wróć do lekcji” na dole (w makiecie jest pod wstępem); „Zamknij” po prawej, z obramowaniem (makieta: lewy górny róg, bez ramki) | `features/zakup/EkranZakupu.tsx:86–88, 140` | naprawa przy okazji; do zrzutu |
| A04-18 | `RangeGrid`: etykiety `ink` na `felt1` z `opacity 0.85` (ok. 4:1, 8 pt) — poza ekranami 5b i 6 (lekcja) | `components/RangeGrid.tsx:12, 24` | razem z tokenami siatek (08-F27b) |
| 08-F15, F16, F22, F26, F27, F28 | zgłoszenia do 04 | `zgloszenia-08.md` | D-284 |

## Co jest zgodne

- Tokeny: kopia 1:1 (`theme/tokeny.ts`, strażnik `motyw-08`); wariant jasny, ciemny i „Zwiększ kontrast” (`theme/tokens.ts:47–77`); poza `PlayingCard.tsx:57` brak kolorów wpisanych w kod (grep `#hex`); `tk.przejsciowe` tylko w nazwanych wyjątkach (L-2, D-274) i w diagnostyce.
- Znaczenie kolorów: złoto tylko dla „ty” (miejsce, znacznik, przedział); stopnie słowem i znakiem bez koloru (`StopienOceny`, `ChoiceOptions`); `alert` tylko dla błędów zakupu, importu i zapisu.
- `Stol` z pozycją i przebiegiem: 6 miejsc, ty na dole, „pas” z kreskowaną obwódką, „ty” ze złotą obwódką 2,5; etykieta czytnika i opis ręki z tych samych danych (D-119, D-275).
- Pasek: segmenty mają cel 64 pt; ruch 240/160+200 ms; przy „Ogranicz ruch” tylko przenikanie 120 ms (`PasekStrategii.tsx:16, 81–93`); opis czytnika po ocenie zgodny ze wzorem z design-spec.
- Krój: Literata do XXXL, od AX1 krój systemowy; start nie czeka na krój dłużej niż 3 s (D-278).
- Słownik interakcji: „Zakończ”, „Dalej”, „Wróć do lekcji”, „Przywróć zakupy”, „Zamknij”, „Usuń postęp” z potwierdzeniem systemowym.

## Lista napraw dla roli 08 (kolejność)

1. A04-01: karty rywala w opisie i podpisy rzędów (D-282).
2. A04-02: `RichText` w ocenie poziomu.
3. A04-03 + 08-F25: ogłoszenia VoiceOver, powrót na górę i fokus po „Dalej”, strażnik `accessibilityLiveRegion` (D-283).
4. A04-04: stół z samą pozycją oraz pozycja bez przebiegu (D-282).
5. A04-05, A04-06, A04-07: tekst w rysunkach bez skalowania, zawijanie paska i skali, sufity tytułów (D-283).
6. A04-08, A04-09: kontrast odpowiedzi po ocenie, stany lekcji dla czytnika.
7. A04-10, A04-11: teksty do `t()` i nazwy kart dla czytnika (przed rolą 09).
8. A04-12, A04-13, 08-F24: haptyka, pasek po ocenie, „Powtórki na dziś”.
9. NISKIE: 08-F15 (tokeny `cardBlue`, `cardGreen` w `docs/design/tokeny.ts` i w kopii jednym commitem, inaczej `motyw-08` zrobi się czerwony), 08-F22 (limit 1,4 dla ⚙︎), A04-14–A04-18.

Pozycje 1–3 to blokery wydania. Każda z testem odtwarzającym (czerwony → zielony), potem `pnpm run ci` i E2E (CLAUDE.md, „Audyty i wydania”, pkt 2). Kolejnego audytu nie ma.

## Do sprawdzenia na zrzucie (właściciel, telefon; dopisane do listy w `zgloszenia-08.md`)

`sesja-decyzja:przed` i `po-ocenie-*` przy AX3 i AX5 na 390 pt (pasek, skala, miejsca, indeksy kart); `sesja-bez-pozycji` z zadaniem „Kto wygrywa” (rząd rywala); `ocena-poziomu:pytanie` przy m5.exam.q2; VoiceOver: po dotknięciu akcji, czy coś zostaje ogłoszone (oczekiwane przed naprawą: nic) i jak VoiceOver czyta „10♥”; motyw ciemny: pasek po ocenie i skala na suknie.
