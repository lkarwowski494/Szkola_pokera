# E2 Kierunki: karty stylu, test generyczności, krytyka

Rola 04 Studio Projektowe, tryb build, 2026-11-04 (dziewiąta sesja). Metafory A, B, C z D-115, ekran kluczowy D-114 („Decyzja w sesji”, stany `przed-decyzja` i `po-ocenie`). Makiety: `kierunki/a-zapis.html`, `kierunki/b-pasek.html`, `kierunki/c-mapa.html` (wspólna rama `kierunki/wspolne.css`); strona porównania: `porownanie.html` i `porownanie.png`. Karty kontrolne zapisano w `01-swiat.md` przed kartami kierunków (commit 8c8a8d1).

**Treść makiet (prawdziwa):** spot `rfi.co` z `content/ranges/spots.yaml` („CO, wszyscy przed tobą spasowali”), ręka J9o, strategia z `content/ranges/preflop-6max-100bb.json` (path `UTG:fold,HJ:fold`: pas 0,8, przebicie do 2,5bb 0,2), stopień z `apps/mobile/src/features/drills/thresholds.ts` (20% mieści się w przedziale 3,5–25%, więc „dopuszczalna”), zdania oceny z `apps/mobile/src/features/drills/text.pl.ts` (`range.acceptable`, `range.explanation`). [PRZYKŁAD]: kolory kart J♠ 9♥, numer zadania, stan mapy wiedzy w C.

## Karty stylu

| Pole | A Zapis z adnotacją | B Pasek strategii mieszanej | C Mapa 169 jako mapa wiedzy |
|---|---|---|---|
| Idea | Każda decyzja to wiersz zapisu rozdania, a ocena to znak przy twoim ruchu, jak w zapisie partii szachowej, zawsze ze słowem obok. | Przyciski akcji tworzą jeden pasek; po decyzji pasek rozkłada się na częstotliwości rozwiązania, a znacznik pokazuje twój wybór i przedział stopnia. | Siatka 13×13 nie pokazuje strategii, tylko twoją wiedzę w tej pozycji; bieżąca ręka jest obwiedziona, a ocena zmienia stan jej pola. |
| Element firmowy i dane | zapis ulicy: pozycje i akcje graczy, twój wiersz z ruchem na zakreślaczu i znakiem stopnia (! zgodna, !? dopuszczalna, ?! niedokładność, ? błąd; znaki z PGN 8.2.3.8, przypisanie to decyzja projektu). VoiceOver: „Zapis rozdania: UTG pas, HJ pas, ty na CO: przebicie do 2,5 big blinda, ocena dopuszczalna.” | pasek częstotliwości akcji w tej sytuacji (te same liczby, z których liczy się stopień), znacznik twojego wyboru, skala stopni z progami 3,5% i 25%. VoiceOver: „Strategia solvera dla J9o: pas 80 procent, przebicie 20 procent. Twój wybór: przebicie.” | stan każdej z 169 klas w danej pozycji (opanowane: pole pełne, w nauce: kreskowane, nie ćwiczone: kontur), bieżąca ręka obwiedziona, nagłówki jej rangi wyróżnione. VoiceOver: „Mapa wiedzy, otwarcie z CO: N klas opanowanych, M w nauce, K nie ćwiczonych. Ta ręka: J9o, w nauce.” |
| Paleta (hex, pochodzenie) | kartka `#FCFCFA` (biel offsetowa, neutralna, nie krem); tusz `#1A1C20`; ołówek `#5B5F67` (drugi plan); zakreślacz `#FFE45C` (zakreślacz ucznia: tylko twój ruch); czerwień kart `#B8232A` (tylko ♥ ♦); nocą kartka `#1D2025` | tło `#F2F3F5` (grupowane iOS); plansza `#FFFFFF`; grafit akcji `#2F333B`; pas kreskowany `#C5CAD2` / `#7B828E`; twój wybór magenta `#B0125B` (jedyny akcent, poza konwencją kategorii czerwień/zieleń/niebieski); nocą `#1B1E23` | papier `#FFFFFF`; tusz `#20232A`; pola `#767C86`; milimetrówka `#F2D3A8` (linie papieru, bez danych); bursztyn kratki `#A35800` (tylko „ta ręka”); nocą `#1F2226` |
| Kroje | tytuły Literata 600 (krój książkowy: druk podręczników i zapisów partii); treść SF Pro (w makiecie Noto Sans) | tytuły Encode Sans Semi Condensed 700 (wąski krój tabel z liczbami); treść SF Pro | tytuły Archivo 700 (grotesk wydrukowanych tabel zakresów); treść SF Pro |
| Kształty i gęstość | jedna kolumna, wiersze zapisu z liniami (linia = akcja gracza), promień 14 przycisków, 8 kart; średnia gęstość | pasek z segmentami, promień 12 paska i planszy, 8 skali; rzadki układ, pusta strefa nad paskiem dla kciuka | siatka 13×13 zajmuje szerokość ekranu, pola promień 3, przyciski w pełni zaokrąglone; najgęstszy |
| Ruch, haptyka, dźwięk | znak „wpisuje się” po ruchu (ok. 200 ms), zakreślacz przeciąga się pod ruch; haptyka lekka; dźwięk: pociągnięcie zakreślacza (opcjonalny); „Ogranicz ruch”: bez przejścia | równe segmenty-przyciski przesuwają granice do częstotliwości, znacznik opada na twoją akcję (ok. 300 ms, sprężyna bez odbicia); haptyka średnia; dźwięk opcjonalny; „Ogranicz ruch”: od razu stan końcowy | pole ręki zmienia stan (pełne albo kreskowane) z błyskiem obwódki (ok. 250 ms); haptyka lekka; „Ogranicz ruch”: bez błysku |
| Głos: pusty / błąd / sukces | „Na dziś bez powtórek. Zacznij sesję ćwiczeń.” / „Nie zapisałem tej decyzji. Spróbuj jeszcze raz; poprzednie zostały.” / „Sesja zapisana: 12 decyzji. Błędne wrócą w powtórkach.” [PRZYKŁAD] | „Na dziś bez powtórek. Zacznij sesję ćwiczeń.” / „Decyzja się nie zapisała. Poprzednie są bezpieczne; spróbuj ponownie.” / „Zapisano 12 decyzji. Dopuszczalne i błędne wrócą wcześniej.” [PRZYKŁAD] | „Mapa jest pusta. Pierwsza sesja zacznie ją wypełniać.” / „Nie zapisałem decyzji; mapa została jak była. Spróbuj jeszcze raz.” / „Zapisano 12 decyzji. Na mapie przybyły 3 pola opanowane.” [PRZYKŁAD] |
| Ikona | znak „!?” na zakreślaczu (jasna i ciemna z tym samym zakreślaczem) | pasek 80/20 z kreskowaniem i magentowym znacznikiem | siatka 5×5 (uproszczenie 13×13) na milimetrówce z obwiedzionym polem |
| Najmocniejszy argument | działa przy każdym typie zadania (zakresy, liczby, scenariusz), bo znak i słowo nie potrzebują częstotliwości; zapis ulica po ulicy to gotowy ekran scenariusza F-12 | jedyny, który pokazuje obrazem dokładnie dane, z których liczy się ocena; ręka mieszana przestaje wyglądać na błąd; w skanie 13 aplikacji nikt tego nie robi | każda decyzja dokłada się do widocznego obrazu postępu, więc krótka sesja w dojeździe ma sens poza jednym zadaniem |

## Test generyczności

Pełna tabela pole po polu jest na stronie porównania (`porownanie.html`, sekcja „Test generyczności”); pokrycia i zmiany w skrócie:
- A: znaki szachowe z karty (b) zostały, ale bez plakietki, bez „!!/??”, bez zieleni i czerwieni, zawsze ze słowem; linie zapisu (kalibracja „układ gazetowy”) zostały, bo każda niesie akcję gracza, przy zaokrąglonych przyciskach i kartach; szeryf Literata bez kremu i terakoty.
- B: ciemny motyw (kalibracja „prawie czarne + jeden akcent”) dostał tło `#1B1E23` i magentę wyłącznie na znaczniku wyboru; karta-kontener na rękę usunięta (kalibracja „karty SaaS”); bez czerwono-zielonych pasków (a).
- C: mapa 13×13 (klisza kategorii) niesie wiedzę, nie strategię, i nie ma czerwieni ani zieleni; akcent przesunięty z `#B9470E` na `#A35800`, bo pierwszy leżał przy terakocie Organizera `#B4471F` (pamięć portfolio).
- Wszystkie: przyciski akcji tuszem (nie czerwony pas i zielone sprawdzenie z (a)), głos bez wykrzykników, bez WERSALIKÓW, emoji, „→” i ciągów „A · B”.

## Krytyka (najpierw usterki) i poprawki

| Kierunek | Usterka (miejsce, co źle) | Poprawka | Para przed/po |
|---|---|---|---|
| A | przyciski podkreślone jak linki | `text-decoration: none` w ramie | `kierunki/przed-po/a-przed-390-jasny.png` → `a-po-390-jasny.png` |
| A | trzej czekający gracze zajmowali po wierszu, ręka (najważniejsza do decyzji) spadała w dół i była mała | jeden wiersz „Czekają BTN, SB i BB”, karty 76×104, J9o krojem tytułów | jw. |
| A | ciemny: zakreślacz `#4E4410` wyglądał jak oliwkowa plama | ten sam żółty `#FFE45C` z ciemnym tekstem (mała powierzchnia) | `a-przed-390-ciemny.png` → `a-po-390-ciemny.png` |
| A | trzeci akapit oceny powtarzał pierwszy („dopuszczalna… to nie błąd”) | usunięty z makiety; znalezisko dla roli 06: `range.acceptable` i dopisek w `range.explanation` mówią to samo | jw. |
| B | magenta znaczyła „Zakończ” i „twój wybór” (ten sam kolor, dwa znaczenia) | nawigacja i linki tuszem | `b-przed-390-jasny.png` → `b-po-390-jasny.png` |
| B | ręka w białej karcie na szarym tle: zestaw kart SaaS | karty bez kontenera, większe (88×122) | jw. |
| B | obwódka karty 2,68:1 (grafika < 3:1) | `#7B828E`, 3,49:1 | — |
| C | czarne pola mapy przytłaczały decyzję, ręka ginęła | pola szarością `#767C86` (3:1 zachowane), nagłówki rangi ręki wyróżnione, grubsza obwódka | `c-przed-390-jasny.png` → `c-po-390-jasny.png` |
| C | pomarańcz w nawigacji i na „tej ręce” (dwa znaczenia); legenda „ta ręka” łamała się | nawigacja tuszem; pozycja legendy usunięta (wyróżnione nagłówki) | jw. |
| wszystkie | AX5 320 pt: tytuł „Dopuszczalna” ucięty; licznik „Zadanie 4” stałe 12 px | tytuł najwyżej 11% szerokości, ale nigdy mniejszy niż treść; licznik w skali tekstu | `*-przed-320-jasny-ax5.png` → `*-po-320-jasny-ax5.png` |
| wszystkie | AX5 320 pt: długie słowa (Dopuszczalna, przypadków) dzielą się w środku bez łącznika (Chromium w Linuksie nie ma polskiego słownika dzielenia) | otwarte do E3: dzielenie wyrazów w iOS i skala tytułów; to samo otwarte zadanie co w Piekarzu | — |
| ikony | A: kropki znaków ginęły na pasku zakreślacza, w ciemnej jasne kropki na żółtym; B: znacznik za mały przy 29 pt; C: obwódka za cienka | A: zakreślacz pod całym znakiem, glify tuszem w obu wariantach; B: większy znacznik i grubszy pasek; C: obwódka 40 | `kierunki/przed-po/ikony-przed.png` → `kierunki/ikony/arkusz.png` |

Odpowiedzi na listę krytyki: (1) w pierwszej sekundzie: A zapis i twój pusty wiersz, B sytuacja i karty, C mapa (za mocno, nazwane w słabościach). (2) Element przy 320 pt: A i B czytelne; C pola ok. 19 pt, czytelne jako obraz, bez nazw klas. (3) Kalibracja: tabela testu. (4) Hierarchia: sytuacja → ręka → akcje; po ocenie: stopień → liczby → Dalej. (5) Ciemne motywy mają własne barwy (tła z nutą granatu, jaśniejsze akcenty), nie odwrócenie. (6) AX5: patrz wiersz otwarty. (7) Po zakryciu nazwy: A znak „!?” na zakreślaczu, B pasek ze znacznikiem, C siatka z obwiedzionym polem. (10) Cudzysłowy drukarskie, półpauza w „3,5–25%”, cyfry tabelaryczne w liczbach.

## Pomiary
- `narzedzia/warsztat.mjs` przy 390 px: A, B, C bez błędów (kod 0). Ostrzeżenia z uzasadnieniem: liczba wielkości tekstu (10–11) i kolorów tekstu (5–6) obejmuje panele poza ekranami i pasek stanu; same ekrany mają 5 wielkości, skalę uporządkuje E3. Odstępy 2, 6 i 10 px (karty, pasek stanu) poza jednostką 4: do tokenów w E3. Interlinia 1,10 w „J9o”: jednowierszowy tytuł, nie akapit. Obrazy testu mrużenia: `kierunki/*-mruzenie-390.png` (grupy i jeden punkt skupienia widoczne; w C punktem skupienia jest mapa).
- `narzedzia/kontrast.mjs kierunki/kontrast/pary-e2.json`: 35 par, wszystkie spełniają progi (kod 0; wynik `kierunki/kontrast/wynik-e2.txt`, najniższe: linia zapisu A 3,07:1, kontur pola C 3,20:1). Wariant „Zwiększ kontrast” w E3.
- `narzedzia/zrzuty.mjs`: 24 zrzuty na kierunek (320/390/430 × jasny/ciemny × domyślny/AX5), kontrola krojów kod 0; arkusze w `kierunki/zrzuty/`.
- `narzedzia/ikona.mjs`: 6 plików 1024×1024 bez kanału alfa, kod 0; arkusz `kierunki/ikony/arkusz.png` (120/60/29, obie tapety).

## Rekomendacja
**A, z paskiem B w wyjaśnieniu zadań z zakresu.** Ekran decyzji obsługuje sesję, powtórki, ćwiczenia w lekcji, egzamin i scenariusz (PR-02–PR-05). Tylko A działa dla wszystkich typów zadań, w tym liczbowych, bo znak i słowo nie wymagają częstotliwości. Zapis ulica po ulicy to naturalny ekran scenariusza F-12. Pasek B jako komponent adnotacji pokazuje, z czego wynika stopień, tam gdzie są częstotliwości. C w rezerwie jako ekran postępu w E3. Opcjonalnie test pięciosekundowy z 5 osobami (ok. 1 h czasu właściciela).

## Wybór właściciela, runda 1
2026-11-04: „Bardzo mało kreatywne i żywe te kolory. Każda aplikacja wygląda jak checklista. Motyw powinien być pełen i robić efekt wow. Ale przyznam że podoba mi się pasek który porównałeś do baterii (po prostu ten element)” (D-116). Zostaje pasek strategii z B; runda 2 niżej. Strona rundy 1: `porownanie-runda1.html` / `.png`.

# Runda 2 (D-116): pełny kolor, ten sam pasek

Makiety: `kierunki/d-ekran-pasek.html`, `kierunki/e-kolor-pozycji.html`, `kierunki/f-mieszanie-farb.html`; strona `porownanie.html` / `porownanie.png`. Treść jak w rundzie 1. We wszystkich: przed decyzją pasek = przyciski akcji w równych częściach (nic nie zdradza), po decyzji ten sam pasek rozkłada się 80/20, znacznik spada na twój wybór, pod spodem skala stopni (błąd poniżej 3,5%, dopuszczalna 3,5–25%, zgodna od 25%) i znak „∼” ze słowem.

| Pole | D Ekran-pasek | E Kolor pozycji | F Mieszanie farb |
|---|---|---|---|
| Idea | pasek zajmuje cały dół ekranu: dwie wielkie barwne połowy, po decyzji pasy w proporcji rozwiązania | tło całego ekranu w barwie twojej pozycji przy stole (6 barw, nazwa zawsze obok), pasek-kapsuła w strefie kciuka | plakat z risografu: żółty papier, dwie farby; strategia mieszana = mieszanie farb |
| Element i dane | częstotliwości akcji (pasy), znacznik wyboru, skala stopni; VoiceOver: „Strategia solvera dla J9o: pas 80 procent, przebicie 20 procent. Twój wybór: przebicie.” | jw. + barwa ekranu = pozycja (pasek pozycji UTG–BB z nazwami) | jw.; nakład farb na styku pasów |
| Paleta | lazur `#12A4F0` (pas), nagietek `#FFB21C` (przebicie), tusz `#0C1230`, góra jasna `#E6F5FE`, noc `#0F1638` | UTG `#5A8CF5`, HJ `#14B1C9`, CO `#FF7146`, BTN `#FFC233`, SB `#F2559A`, BB `#7BC043`; tusz `#1E0B05`, plansza `#FFF3EE`, noc CO `#2B120B` | papier `#FFE14D`, granat `#17215C`, farba niebieska `#0078BF`, różowa `#FF48B0` (hex okiem, przybliżenie farb risografu); noc `#171B45` |
| Kroje | Anton (plakatowy, wąski: wielkie liczby pasów) | Unbounded 700 (szeroki, wielkie „CO”) | Big Shoulders Display 800 (plakatowy) |
| Kształty | pełne pola bez zaokrągleń, przycisk „Dalej” kapsułą | kapsuła promień 22, plakietki pozycji | prostokąty farby bez zaokrągleń, ziarno druku |
| Ruch, haptyka | granice pasów przesuwają się do częstotliwości, znacznik opada (ok. 300 ms), haptyka średnia | jw. w kapsule; przy nowym zadaniu tło przechodzi w barwę nowej pozycji (ok. 250 ms) | farby „dociskane” jak w druku (ok. 250 ms); „Ogranicz ruch” we wszystkich: stan końcowy od razu |
| Ikona | ekran podzielony 80/20 ze znacznikiem | kapsuła 80/20 na koralu | dwie farby ze znacznikiem na żółtym |
| Argument | polubiony pasek jako cały ekran; największe cele dla kciuka (pół ekranu na akcję) | barwa niesie pozycję, najważniejszą informację przed flopem | najbardziej rozpoznawalny, metafora tłumaczy strategię mieszaną bez słów |
| Słabość | 3+ akcje zwężają kolumny; ciemny granat blisko kategorii | 6 barw do nauki; ciemne warianty brązowawe; szeroki krój przy AX5 | może być zbyt zabawowy dla P-3; różowa blisko czerwieni kier; moda na riso |

Test generyczności rundy 2: tabela na stronie porównania (granat D w ciemnym motywie, „duża liczba” w pasach D, niebieski UTG wobec Treningu, moda na szerokie groteski i riso; przyciski bez czerwieni i zieleni).

## Krytyka rundy 2 (najpierw usterki)

| Kierunek | Usterka | Poprawka | Przed/po |
|---|---|---|---|
| D | „20%” i „twój wybór” ucięte w pasie 20% | limit kroju względem szerokości, „twój / wybór” w dwóch wierszach | `przed-po/runda2-przed-390-jasny.png` → `zrzuty/d-ekran-pasek-390-jasny.png` |
| D | „Przebij” na przycisku, a w aplikacji „Przebicie” (dwie nazwy jednej akcji) | „Przebicie / do 2,5bb” | jw. |
| D | biała góra ekranu: motyw nie był pełny | góra w jasnym lazurze `#E6F5FE` | jw. |
| F | różowa farba mnożona przez żółty papier dawała czerwień (kier, błąd) | farba bez mnożenia, nakład tylko na styku pasów | jw. → `zrzuty/f-mieszanie-farb-390-jasny.png` |
| E | etykieta UTG 3,95:1 | UTG `#5A8CF5` (5,89:1) | — |
| D, E, F | AX5 320 pt: plakatowe kroje bez limitu (ucięte „Przebicie”, „Dopuszczalna”, „J9o”), przyciski-pasy nie przechodzą w pion, plakietki pozycji łamane po literze | limity względem szerokości ekranu, podstawa przycisku `70px × skala tekstu` (przy AX5 pion), plakietki co najmniej 11 px | `przed-po/{d,e,f}-przed-320-jasny-ax5.png` → `{d,e,f}-po-320-jasny-ax5.png` |
| E | Unbounded przy AX5 na 320 pt: tytuł mniejszy niż treść | otwarte do E3: od AX1 tytuły krojem systemowym | — |

Pomiary rundy 2: `warsztat.mjs` D, E, F kod 0; `kontrast.mjs kierunki/kontrast/pary-e2-runda2.json` 33 pary kod 0 (najniższe: niebieskie „J9o” na żółtym 3,63:1, duży tekst; lazur i nagietek obok siebie 1,53:1 odróżnia granica tuszem 3 px, nie barwa); `zrzuty.mjs` 72 zrzuty, kontrola krojów kod 0; `ikona.mjs` 6 ikon kod 0, arkusz `kierunki/ikony/arkusz-r2.png`.

## Rekomendacja rundy 2
**D, z barwą pozycji z E w górnej części ekranu.** Kontekst główny to jedna ręka w dojeździe; D daje największe cele i robi z polubionego paska cały ekran, a ocena jest widoczna jednym spojrzeniem. Barwa pozycji może zabarwić górę ekranu. F najmocniejszy jako marka, ale ryzykowny dla zaawansowanych.

## Wybór właściciela, runda 2
Czeka na STOP E2.
