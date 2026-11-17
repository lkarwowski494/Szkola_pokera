# Design spec: Szkoła Pokera, kierunek I „Stół w granacie”
Rola 04, build E3, 2026-11-04. Decyzje: D-114 (ekran kluczowy), D-116 (pasek strategii), D-117 (elegancko, punkt odniesienia: poprzednia aplikacja), D-118 (kierunek I), D-119 (stół zależny od zadania), D-120 (Literata 600), D-121–D-122 (ta sesja). Wdrożenie: rola 08, wyłącznie z tokenów i komponentów poniżej.

## Pliki
| Co | Plik |
|---|---|
| Tokeny (propozycja modułu motywu, zastępuje `apps/mobile/src/theme/tokens.ts`) | `tokeny.ts` |
| Tabela kontrastu (132 pomiary, 0 poniżej progu; jasny, ciemny, oba ze zwiększonym kontrastem) | `kontrast-e3.md` (generuje `narzedzia/tokeny.mjs`) |
| Makieta kluczowych ekranów | `ekrany/e3.html` (+ `e3.css`, `tokeny.css` generowany) |
| Zrzuty wzorcowe (linia bazowa audytu SP-13): 5 ekranów × 320/390/430 × jasny/ciemny × domyślny/AX5 = 60 | `wzorce-zrzuty/`, arkusze `wzorce-zrzuty/arkusze/` |
| Ikona: warstwy SVG, PNG, arkusz | `ikona/` (generuje `narzedzia/ikona-warstwy.mjs`, pliki `narzedzia/ikona.mjs`, arkusz `narzedzia/arkusz-ikony.py`) |
| Menu kafelkowe (układ końcowy KO-045), zakładki „Lekcje” i „Postęp”, zębatka (sesje BE, BH; D-540–D-542, D-546) | `menu-i-zebatka.md` |
| Scenariusz: start, przebieg, ocena „dlaczego”, koniec (sesja BE, D-543–D-545) | `scenariusz-i-ocena.md` |
| Scenariusz: nazwy akcji F1–F4, „Liczby” F2–F4, punkt ICM (sesja DA, D-886–D-890) | `scenariusz-akcje-i-liczby.md`, `ekrany/scenariusz-icm.html`, sekcja „Scenariusz: punkt ICM” niżej |
| Kierunek i kroje (historia E2) | `02-kierunki.md`, `kroje-tytulow.png` |

## Znaczenie kolorów
- **Złoto znaczy wyłącznie „ty”**: twoje miejsce przy stole, znacznik twojego wyboru na pasku, twój przedział na skali. Nigdy wygrana ani „dobrze”.
- Kier `cardRed` tylko na kartach; kolor karty zawsze z symbolem (NFR-DOST-001).
- Stopnie oceny (Błąd, Dopuszczalna, Zgodna) nie mają koloru: niosą je znak, słowo i obwódka przedziału; znaki: ✓ Zgodna, ≈ Dopuszczalna, ~ Niedokładność, ✗ Błąd (D-213, D-284; bez kółka wokół znaku).
- `alert` tylko dla błędu działania (zakup, import), zawsze z tekstem, co zrobić.
- Bez żetonów i puli (bez hazardu, cel właściciela 2026-11-03).

## Typografia
- Tytuły: Literata 600 (D-120): tytuł zadania, słowo stopnia, indeksy kart, opis ręki, duże tytuły ekranów. Treść: krój systemowy (SF Pro) z Dynamic Type. Cyfry: tabelaryczne w licznikach i cenach, wersalikowe w tytułach.
- **Duży tekst** (D-122): treść skaluje się bez limitu do AX5. Tytuły od rozmiaru AX1 przechodzą na krój systemowy (semibold) i mają sufit jako ułamek szerokości ekranu (`typografia.skala.*.maxW`: tytuł 10%, duży tytuł 10%, słowo stopnia na suknie 8,5%), żeby najdłuższe słowo mieściło się w wierszu bez dzielenia. Przy tekście domyślnym sufit nie działa (28 i 34 pt są poniżej). Dzielenie wyrazów nie jest warunkiem układu: React Native na iOS nie daje go jako właściwości `Text` `[DO USTALENIA: rola 08 sprawdza w dokumentacji RN 0.8x; jeśli jest — włączyć dla pl]`. Długi tytuł sytuacji na starcie scenariusza: styl `tytulDlugi` 20/25 według progu długości (D-1730, D-1731, `scenariusz-i-ocena.md`).
- Łamanie w środku wyrazu dozwolone tylko przy AX3–AX5 na 320 pt (wyjątek nazwany w D-122); pomiar: `narzedzia/przepelnienie.mjs` raportuje je jako INFO (12 wyrazów na 5 ekranach, 0 przy 390 i 430 pt).
- Miejsca przy stole i indeksy kart mają stały rozmiar (rysunek); informację niosą też tekstem, który skaluje się z treścią: opis ręki pod stołem („różne kolory; UTG i HJ spasowali, po tobie BTN, SB i BB”) i etykieta VoiceOver stołu.

## Odstępy, promienie, ruch, haptyka
- Jednostka 4 pt (`odstep`). Wartości poza jednostką w pomiarze `warsztat.mjs` pochodzą z `em` i procentów (pozycje miejsc przy stole), nie z odstępów.
- Promienie według hierarchii (`promien`): karta 8, przedział skali 10, przycisk i komórka 14, sukno 32, rama 40, owal stołu = połowa wysokości, miejsce = pigułka.
- Ruch (`ruch`): ocena 240 ms (granice paska przesuwają się do 80/20), znacznik 160 ms po 200 ms, karty 200 ms; „Ogranicz ruch”: przenikanie do 120 ms. Każdy ruch przerywa dotknięcie „Dalej”.
- Haptyka (`haptyka`): wybór akcji `selection`; ocena Zgodna i Dopuszczalna `impactLight`, Błąd `notificationWarning`; zakup `notificationSuccess`; błąd działania `notificationError`. Dźwięk domyślnie wyłączony; włączony zawsze razem z haptyką.

## Komponenty
| Komponent | Systemowy czy własny | Uwagi |
|---|---|---|
| Nawigacja, pasek zakładek (Dziś, Powtórki, Postęp), listy grupowane, arkusz zakupu Apple, przełączniki | systemowe | D-104: bez zakładki Reguły |
| `Stol` | własny | dane wejściowe niżej; etykieta VoiceOver z danych |
| `Karta` | własny | indeks Literata, symbol koloru zawsze obecny |
| `PasekStrategii` (element firmowy, D-116) | własny | dwa stany niżej |
| `SkalaStopni` | własny | trzy przedziały z progów `apps/mobile/src/features/drills/thresholds.ts` |
| `BlokLekcji` (sukno na „Dziś”) | własny, prosty | rama + sukno, bez kart i miejsc |

### `Stol`: zależy od danych zadania (D-119)
Stan miejsca „limp” (iso-size, D-1734): obwódka ciągła 2,5 pt `seatInk` + słowo „limp”, jak „all-in” w ICM; szczegóły `scenariusz-i-ocena.md`.
- Zadanie ma pozycję i stan graczy (sytuacja z przebiegiem akcji, np. `spots.yaml` z `path`): owal z miejscami w kolejności zgodnej z ruchem wskazówek zegara, ty na dole; miejsce: nazwa pozycji + stan („pas” z obwódką kreskowaną, „przebija”, „po tobie”, „ty” ze złotą obwódką 2,5 pt; D-275, D-284). Liczba miejsc = `meta.players`.
- Zadanie bez pozycji (outy, szanse, pot odds, kombinatoryka, siła ręki, np. `m2.exam.q2`): owal bez miejsc; karty wspólne na suknie, twoje przy krawędzi stołu; pod stołem opis tekstem („Twoje karty: J♣ 9♦. Na stole: 10♠ 7♥ 2♣.”). Nie ma pustych ani wyszarzonych miejsc.
- Karty rywala (`opp`): rząd z podpisem „Rywal” nad nim, karty wspólne z podpisem „Na stole”; opis i etykieta zawierają każdą narysowaną kartę (D-282). Sama pozycja bez kart i przebiegu: bez owalu, wiersz „Twoja pozycja: BB”; pozycja z kartami bez przebiegu: dopisek pozycji w opisie (D-282).
- Etykieta VoiceOver budowana z tych samych danych, np. „Przy stole: UTG pas (fold), HJ pas (fold), ty na CO z J9o, po tobie BTN, SB i BB.” (D-275: „stół” = karty wspólne, „czekać” = check). Karty w etykiecie nazwami, nie symbolami (A04-11).

### `PasekStrategii`
- Przed decyzją: równe segmenty-przyciski (po jednym na akcję, cel ≥ 64 pt wysokości), nic nie zdradzają.
- Po ocenie: te same granice przesunięte do częstotliwości solvera (np. pas 80%, przebicie 20%), część „pas” kreskowana (w RN: wypełnienie `foldFill` + kreskowana obwódka `foldStripe`, D-284), złoty znacznik nad twoim wyborem, podpisy z procentami i „twój wybór”. Opis VoiceOver: „Strategia solvera dla J9o: pas 80 procent, przebicie 20 procent. Twój wybór: przebicie.”

### `RangeGrid` (siatka zakresu w lekcji; M2-koordynator-napraw-006, KO-132, D-2020; barwa paska M2-koordynator-napraw-009, D-2021)
Pole 13×13: od lewej pasek każdej grupy akcji (szerokość = częstość, pierwsza grupa w `rangeFill` z kryciem 0,85 na `surface`), na środku etykieta ręki, w prawym górnym rogu kropka klasy niepewnej. Tokeny geometrii: `siatka` w `tokeny.ts`. Makieta i pomiar: `audit/M1-2026-11-17/role/04-studio-projektowe/fix-2026-11-17/` (wynik.md, dowody); barwa paska: `…/fix-2026-11-17-b/`.
- **Barwa paska pierwszej grupy i próbki w legendzie: `rangeFill`** (token wykresu, nie `felt1`; `felt1` zostaje suknem stołu, `Stol`, `BlokLekcji`, `PanelDecyzji`). Jasne motywy: `rangeFill` = `felt1` (`#23694D`, `#1B5940`), bez zmiany wyglądu. Ciemne (dark i darkHigh): `#2B8F67`, ten sam odcień co sukno (H 156°), jaśniejszy. *Dlaczego:* sukno dobrane pod białe napisy ma do granatowego `surface` 1,71 (dark) i 1,47 (darkHigh), więc „gram” i „pas” różnią się poniżej 3:1 (WCAG 1.4.11). Okno progów w ciemnych motywach jest wąskie: złożony pasek musi mieć luminancję 0,152–0,179 (≥ 3 do `surface`, ≥ 4,5 dla `onFelt`); `#2B8F67` daje 0,165, czyli zapas po równo z obu stron. darkHigh ma ten sam `surface` i `onFelt`, więc to samo okno i tę samą wartość.

| Para (krycie 0,85 na `surface`) | Próg | light | lightHigh | dark przed → po | darkHigh przed → po |
|---|---|---|---|---|---|
| pasek / `surface` | 3 | 4,63 | 5,58 | 1,71 → 3,20 | 1,47 → 3,20 |
| `onFelt` / pasek (etykieta pola pełnego) | 4,5 | 4,55 | 5,49 | 8,97 → 4,80 | 10,47 → 4,80 |
| kropka `ink` / pasek | 3 | 3,92 | 3,26 | 7,87 → 4,21 | 9,19 → 4,21 |
| próbka legendy (bez krycia) / `bg` | 3 | 5,59 | 7,02 | 2,24 → 4,52 | 1,86 → 4,52 |
| próbka legendy / `surface` (blok „note”) | 3 | 6,56 | 8,24 | 1,93 → 3,89 | 1,60 → 3,89 |

Pary są w `pary` i `paryZlozone` (`tokeny.ts`), więc test `kontrast-pary-08` liczy je w CI. Odporność: złożony pasek ±1 na kanał (zaokrąglenie przy kryciu) daje najmniej 3,16 / 4,73 / 4,15.
- **Kolor etykiety** (KO-132 (a)): pole pełne, czyli pierwsza grupa `freqs[i] >= 1` → `onFelt`, bez podkładki. Każde inne pole (0, częściowe, 0,999, grupy 2 i 3) → `ink` na **podkładce** `surface`. *Dlaczego:* `ink` na zieleni ma 3,92/3,26 w jasnych motywach, a `onFelt` na `surface` 1,02; tylko tekst na jednym tle daje ≥ 4,5 w czterech motywach.
- **Podkładka:** prostokąt bez zaokrąglenia, kolor `surface`, wyśrodkowany; wysokość = interlinia etykiety, szerokość = tekst + `siatka.podkladkaPoziom` z każdej strony, najwyżej pole − 2 pt. Pasek leży pod nią, nie zmienia koloru ani krycia; koniec paska widać nad podkładką i pod nią (podkładka zajmuje najwyżej połowę wysokości pola).
- **Rozmiar etykiety** (Dynamic Type): wzór w komentarzu `siatka`; `allowFontScaling={false}`, `fontSize` i `lineHeight` z wzoru, skala tekstu z `useWindowDimensions().fontScale`, pole z `onLayout` siatki (przed pomiarem: szerokość okna − 2 × `odstep.l`). Wynik: 8 pt przy tekście domyślnym, do 8,25 pt na 320 pt i 10,4 pt od 375 pt przy AX1–AX5; nigdy poza podkładką ani polem. `numberOfLines={1}` + `adjustsFontSizeToFit` jako zabezpieczenie, gdy krój jest szerszy niż `szerokoscEm`. Etykieta jest rysunkiem jak miejsca przy stole (D-122): treść o siatce niesie tytuł, legenda i etykieta VoiceOver, które skalują się bez limitu.
- **Kropka klasy niepewnej:** koło `siatka.znakSrednica` (3 pt) w `ink`, `siatka.znakOdstep` (1 pt) od górnej i prawej krawędzi; `View`, nie znak tekstu, więc nie rośnie z tekstem i nie wchodzi na podkładkę (odstęp ≥ 1 pt). Kontrast: ≥ 3,26 do zieleni (lightHigh; w ciemnych 4,21 do `rangeFill`), 13,48 do `surface`.
- **Grupy 2 i 3** (`przejsciowe.warn`, `cardBlue`; treść pl ich nie używa): etykieta zawsze na podkładce, więc ≥ 4,5. Kropka `ink` na pasku `warn` w ciemnych motywach ma 2,23 < 3: przed pierwszym spotem z dwiema grupami rola 04 dostarcza tokeny siatek (F27b, D-284); strażnik w teście treści pl.

## Scenariusz: punkt ICM (`icm-call`, sesja DA, D-889)
Warunek powrotu SC-34 (D-807, D-817, D-825): ekran pokazuje stosy wszystkich graczy w bb i wypłaty. Makieta `ekrany/scenariusz-icm.html` (+ `scenariusz-icm.css`), zrzuty `wzorce-zrzuty/scenariusz-icm/` (390 jasny i ciemny, 320 AX5; ekrany: 4 graczy, 3 graczy, ocena z „Liczbami”). Nazwy akcji i zdanie „Liczb”: `scenariusz-akcje-i-liczby.md`.

**Układ decyzji (od góry):** pasek nawigacji („Zakończ · Scenariusz · Preflop”; bez kroków ulic, bo punkt kończy rozdanie, D-783); `Stol` z 3 albo 4 miejscami (ty = BB na dole, dalej zgodnie z ruchem wskazówek zegara: gracze spoza pary, SB po prawej; miejsce: nazwa + stan „pas” / „all-in” / „ty”, bez stosów: przy 4 miejscach na 320 pt liczby by się nie mieściły, a w rysunku nie skalują się z tekstem); twoje karty na środku sukna; wiersz „W puli … · do sprawdzenia …”; gdy twój stos ≤ stosu rywala, przypis „{{kwota}} to cały twój stos: przegrana kończy dla ciebie turniej bez nagrody.”; nagłówek „Bańka: płatne {{platne}} miejsca z {{gracze}}”; zdanie nagród („Nagrody: 1. miejsce 50%, 2. miejsce 30%, 3. miejsce 20% puli nagród. Czwarte miejsce nic nie dostaje.”, spacja nierozdzielająca po liczebniku porządkowym); lista grupowana „Stosy na początku rozdania” (Ty, BB · Rywal, SB · Gracz A · Gracz B, w kolejności miejsc od ciebie; wartość „N bb” po prawej, cyfry tabelaryczne); dziennik z jednym wpisem („Gracz A: pas. Gracz B: pas. SB: all-in 12,5 bb”, klucze `play.log.*`); `PasekStrategii` „Pas · Sprawdzenie / N bb”.

**Pasek stosu** (w wierszu listy, między nazwą a liczbą): stos ÷ największy stos przy stole; twój złoty (`gold-on-bg`, złoto = „ty”), pozostałe `muted` na torze `separator`. Ozdobą nie jest: pokazuje, kto jest krótki, czyli to, co w ICM decyduje o cenie. Liczba obok niesie tę samą informację (pasek ukryty dla VoiceOver, przy AX5 znika, wartość schodzi pod nazwę). Kontrast 8 par ≥ 3:1 w obu motywach: `kontrast-da.txt`.

**Liczby wariantu:** 1 bb = mniejszy stos pary ÷ `stackBb` (generator, `scenario-gen.ts:455`), więc stosy pozostałych graczy bywają ułamkowe: zapis z jednym miejscem po przecinku, bez końcowego zera („10 bb”, „12,5 bb”, „11,7 bb”). Twoje miejsce i dopłata liczone z twojego stosu, nie ze `stackBb` (gdy masz więcej niż rywal, dopłacasz stos rywala − blind). Pula = stos rywala + twój blind. Nagrody w procentach puli nagród, nigdy w pieniądzach.

**Ocena:** jak w BE; pod „Liczbami” (`scenario.numbers.icm`) zwinięty wiersz „Stosy i nagrody” z tą samą listą i zdaniem nagród (ocena zasłania stół).

**VoiceOver:** stół „Stół: ty na BB z asem karo i siódemką trefl. Rywal na SB wchodzi all-in. Gracz A i Gracz B spasowali.”; lista stosów jako lista („Ty, BB, 10 bb”); nagłówek bańki jako nagłówek; wpis dziennika ogłaszany.

**Stany:** typowy (4 i 3 graczy); twój stos większy niż rywala (3 graczy w makiecie: bez przypisu o całym stosie); ocena; AX5. Brak danych ICM w wariancie (stosy, wypłaty) nie ma stanu na ekranie: bramka budowania odrzuca szablon, ekran nie zgaduje liczb (macierz stanów, pkt 5). Bez sieci działa (treść lokalna).

**Kryteria akceptacji dla 08** (z nimi `icm-call` wraca na `RODZAJE_NA_EKRANIE`, D-817):
1. Test ekranu: dla wariantu 3 i 4 graczy na ekranie decyzji są stosy wszystkich graczy w bb (zapis jak wyżej) i wszystkie wypłaty w procentach; ich suma = 100%.
2. Stos „ty” i dopłata z twojego stosu: wariant z twoim stosem większym niż rywala daje dopłatę = stos rywala − 1 bb i brak przypisu o całym stosie; wariant z mniejszym albo równym daje przypis.
3. Pula, dopłata, kwota na przycisku i dziennik zgodne (jedna funkcja kwoty, D-886).
4. Etykieta VoiceOver stołu wymienia karty nazwami, stan każdego gracza i rywala na SB; lista stosów ma rolę listy; pasek stosu jest ukryty dla czytnika.
5. AX5 na 320/390/430: przepełnienie kod 0 (`narzedzia/przepelnienie.mjs`; łamanie w środku wyrazu tylko przy 320 AX5, D-122).
6. Zrzut ekranu z aplikacji porównany z `wzorce-zrzuty/scenariusz-icm/icm-4-graczy-390.png` (rola 04 w trybie audit).

## Słownik interakcji
Domyślny słownik studia, z ustaleniami projektu: **Zakończ** (wyjście z sesji ćwiczeń i egzaminu, lewy górny róg; sesja zapisana, bez pytania — F-07), **Dalej** (następne zadanie po ocenie), **Wróć do lekcji** (z ekranu limitu, jeden ruch, BR-LIM-001), **Przywróć zakupy** (ekran zakupu i ustawienia), **Zamknij** (ekran zakupu), **Zgłoś błąd w tym zadaniu** (PR-09). Usunięcie danych (PR-07): „Usuń postęp” z potwierdzeniem. Nazwa „dzienny limit”, nigdy „pula” (D-111).

## Macierz stanów kluczowych ekranów
| Ekran | Typowy | Pierwsze użycie | Błąd / brak sieci | Limit | Pro |
|---|---|---|---|---|---|
| Dziś | następna lekcja, ćwiczenia, licznik „Dzienny limit: 1 darmowa aktywność na dziś” | po ocenie poziomu: pierwsza lekcja z punktu startu (PR-01) | działa bez sieci (treść lokalna) | „0 darmowych aktywności, odnowi się o północy” (BR-LIM-001) | bez licznika |
| Decyzja w sesji | przed decyzją / po ocenie; stół zależny od zadania | pierwsza ocena z krótkim opisem skali pod paskiem `[DO USTALENIA: tekst rola 06]` | bez sieci działa | licznika w trakcie nie ma; sesja kończy się bez przerwania (BR-LIM-002) | — |
| Limit i zakup | plany, ceny ze sklepu, „Wróć do lekcji” | — | ceny niedostępne: „Nie udało się pobrać cen. Sprawdź połączenie i spróbuj ponownie.” + „Spróbuj ponownie”; przywracanie bez zakupu: „Nie znaleźliśmy zakupów na tym koncie Apple.” | stan przepływu PR-03 (nie wyskakuje w lekcji) | ekran niedostępny |

## Głos
- Ty, strona czynna, bez wykrzykników i bez sprzedawania. Liczby po ludzku: „Solver gra tak w 20% przypadków, więc to nie błąd…”.
- Zakazane: „pula” dla limitu, „wygrana”, „promocja”, „najpopularniejszy”, odliczanie, zawstydzanie przy odmowie (`docs/monetyzacja.md`, „Zakazane wzorce”).
- Wzory: pusty stan „Na dziś nie masz powtórek. Następne pojawią się jutro.”; błąd „Nie udało się …. Sprawdź … i spróbuj ponownie.”; sukces zakupu „Masz pełny dostęp. Limit dzienny już nie obowiązuje.” `[PRZYKŁAD: teksty końcowe rola 06]`.

## Podłogi dostępności (OP-19, NFR-DOST-002; D-121)
| Miara | Próg | Metoda | Wynik na makiecie E3 |
|---|---|---|---|
| Elementy interaktywne PR-01–PR-08 z rolą i etykietą czytnika ekranu | 100% | przejście VoiceOver i TalkBack (rola 07); w makiecie `aria-label` / tekst | 5 ekranów: 100% (przyciski z tekstem, ikona ustawień z etykietą) |
| Grafika z danymi (stół, pasek strategii, skala stopni) z opisem tekstowym danych | 100% | jw. | 3 z 3 |
| Tekst ucięty, nachodzący albo poza pojemnikiem przy AX5 na 320/390/430 pt | 0 | `narzedzia/przepelnienie.mjs` | 0 (kod 0) |
| Łamanie w środku wyrazu przy AX5 | tylko 320 pt (D-122) | jw., INFO | 12 przy 320 pt, 0 przy 390 i 430 pt |
| Informacja tylko kolorem | 0 (NFR-DOST-001) | skala szarości | 0 (`warianty.mjs --szarosc`) |
| Kontrast par z tokenów, cztery warianty | 100% par ≥ progu | `narzedzia/tokeny.mjs` | 132/132 |
| Cel dotykowy | ≥ 44 pt; akcje decyzji ≥ 64 pt | pomiar makiety | spełnione (pasek zakładek 48 pt, akcje 64 pt) |

## Ikona (D-118; pliki w `ikona/`)
- Warstwy: `tlo.svg`, `pierwszy-plan.svg`, złożenie `ikona.svg`; ciemne: `tlo-ciemne.svg`, `pierwszy-plan-ciemny.svg`, `ikona-ciemna.svg`. Bez własnych cieni i blasków.
- PNG (`ikona.mjs`, kod 0): `icon.png` 1024 RGB bez alfy, `ios-dark.png`, `android-foreground.png` i `android-monochrome.png` (RGBA, treść w bezpiecznym kole: skala 0,66), `splash-icon.png` (RGBA). Arkusz `arkusz.png`: obejrzany w 29 pt (karty i pasek czytelne jako kształty) i na obu tapetach.
- Konfiguracja dla roli 08 (`app.json`): `"icon": "./assets/images/icon.png"`, `"ios": { "icon": { "light": "./assets/images/icon.png", "dark": "./assets/images/ios-dark.png" } }`, `"android": { "adaptiveIcon": { "foregroundImage": "./assets/images/android-foreground.png", "monochromeImage": "./assets/images/android-monochrome.png", "backgroundColor": "#22488A" } }`, ekran startowy: `splash-icon.png`, tło `#E9EDF5` (ciemne `#0A1430`). Ścieżki docelowe ustala rola 08.
- Otwarte: indeksy J i 9 są krojem osadzonym w SVG; do Icon Composer (plik `.icon`, macOS) trzeba je zamienić na krzywe (krok właściciela albo roli 08 na macOS).

## Otwarte
- Przejście poznawcze i test 3–5 osób (kryteria „Intuicyjność” z `docs/scope-contract.md`) — po implementacji, na TestFlight; wynik wraca do roli 03.
- Ekrany poza kluczowymi (ocena poziomu, lekcja, powtórki, scenariusz, dane, pomoc, ustawienia) rola 08 buduje z tych komponentów; audyt roli 04 części 5b i 6: `audyt-5b-6.md` (2026-11-09; naprawy dla 08, D-282–D-284).
- Tokeny `cardBlue`, `cardGreen` (talia czterokolorowa, D-284) i barwy siatek `PaintGrid`/`RangeGrid` (08-F27b) — do dopisania w `tokeny.ts` razem z kopią w aplikacji; geometria etykiety `RangeGrid` jest w `siatka` (D-2020), barwa paska pierwszej grupy w `rangeFill` (D-2021; wdrożenie w komponencie: rola 08). Barwy grup 2 i 3 (`warn`, `cardBlue`; F27b) nadal bez tokenu siatki.
- Najdłuższy język (35 języków): sprawdzenie układu na de/fr/vi po przekładzie — rola 06/08; sufity tytułów są liczone od szerokości, nie od słowa polskiego.
