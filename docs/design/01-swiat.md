# Rola 04, E1: świat dziedziny (2026-11-04)
Wejście: `00-rozpoznanie.md`, ekran kluczowy „Decyzja w sesji” (D-114). Zasada: fakty dziedzinowe mają przeczytane źródło; opis wyglądu przedmiotów i obserwacje skanu to obserwacje, nie twierdzenia, których aplikacja uczy.

## Inwentarz świata dziedziny
| Kategoria | Co jest w świecie gry i nauki pokera | Uwagi dla projektu |
|---|---|---|
| Przedmioty i narzędzia | karty (talia 52), indeks w rogu karty (ranga + kolor), przycisk dealera „D”, stół z miejscami, żetony; w nauce: notatnik rozdań, wydrukowane tabele otwarć (Preflop+ reklamuje „Start Printing”), solver na komputerze, zegar turniejowy z poziomami blindów | żetony i stół kasynowy niosą hazard (W-07, „Tam nie ma być hazardu”, właściciel 2026-11-03): poza kandydatami na element firmowy |
| Materiały | karton karty z fakturą lnianą, plastik kart, sukno stołu, papier notatnika i wydruku, ekran solvera | sukno = klisza kategorii (skan niżej), papier wydruku i zeszytu = świat nauki |
| Znaki i oznaczenia | cztery symbole kolorów (♠ ♥ ♦ ♣), indeksy rang (A K Q J T 9…2; „T” dla dziesiątki w zapisie rąk), zapis ręki „AKs / AKo / 77”, zapis pozycji (UTG, HJ, CO, BTN, SB, BB), rozmiary w bb, ulice (preflop, flop, turn, river) | zapis rąk i pozycji to język użytkownika (PR-03, PR-05); kolor karty zawsze z symbolem, nie samym kolorem (NFR-DOST-001) |
| Dokumenty i formularze | zapis rozdania (hand history: ulica po ulicy, akcje i rozmiary), tabela zakresu 13×13 = 169 klas rąk, wynik solvera (częstotliwości akcji w klasie ręki), arkusz przeglądu rozdań z trenerem | 169 = 13 par + 78 kolorowych + 78 różnokolorowych; 1326 = C(52, 2) kombinacji (rachunek, szczebel 1); projekt używa ich zapisu, liczby w treści idą przez `numbers.yaml` (rola 06) |
| Zapis oceny | szachowy zapis partii z adnotacjami: PGN, „There are exactly six such annotations available: "!", "?", "!!", "!?", "?!", and "??"” (Standard PGN, sekcja 8.2.3.8, saremba.de/chessgml/standards/pgn/pgn-complete.htm, odczyt 2026-11-04; NAG 1 „good move (traditional "!")”, NAG 2 „poor move (traditional "?")”) | znak oceny przy ruchu to gotowy, niekolorowy nośnik stopnia (NFR-DOST-001); w pokerze nie jest standardem — to przeniesienie z pokrewnej dziedziny, do nazwania w projekcie |
| Dane oceny w aplikacji (projekt) | stopień zagrania wynika z częstotliwości akcji w rozwiązaniu: zgodna ≥ 25% albo najczęstsza, dopuszczalna 3,5–25%, błąd < 3,5%, niedokładność = dobra akcja, zły rozmiar (`apps/mobile/src/features/drills/thresholds.ts:8-22`, ADR-26; źródło progu 3,5% w komentarzu: help.gtowizard.com/measure-performance) | element firmowy może pokazać dokładnie te dane, z których wynika ocena (zasada studia 2) |
| Liternictwo | indeksy kart: wąskie, wysokie znaki rang; wydruki tabel i zapisy rozdań: tekst tabelaryczny o stałej szerokości znaków; plansze solverów: drobna siatka liczb | kandydaci na krój tytułów w E2 z liternictwa indeksów i druków tabel, nie z modnych krojów |
| Dźwięki | tasowanie (riffle), położenie karty na suknie, stuk żetonów (hazard: odpada) | dźwięk nie niesie znaczenia samodzielnie (dojazd, hałas: `00-rozpoznanie.md`); haptyka sama wystarcza |
| Kolory z kodów i norm | talia francuska: kolory czerwone (♥ ♦) i czarne (♠ ♣); talia czterokolorowa w pokerze online (dodatkowe barwy dla ♦ i ♣) — przypisanie barw różni się między producentami `[DO USTALENIA]` (jedyne odczytane miejsce: Wikipedia „Four-color deck”, szczebel 5, nie potwierdza; strona pomocy PokerStars nie dała tekstu bez skryptów); obserwowana konwencja kategorii w planszach solverów: czerwień = podbicie, zieleń = sprawdzenie (skan niżej) | nie ma normy barwnej jak IWF w Treningu; paleta wyjdzie z materiału (karton, papier, druk) i z zapisu, a barwy akcji muszą mieć też kształt lub słowo |

## Skan konkurencji (13 aplikacji, odczyt 2026-11-04 ok. 05:00 UTC)
Metoda: `itunes.apple.com/search` (frazy „poker trainer”, „learn poker”, „gto poker”; country us i pl), odfiltrowane gry na pieniądze, wybór aplikacji do nauki; ikony i 2 pierwsze zrzuty obejrzane na arkuszu w scratchpadzie (cudzy materiał, poza repo).

| Nr | Aplikacja | Adres |
|---|---|---|
| 0 | Learn Poker | https://apps.apple.com/us/app/learn-poker/id1494263170 |
| 1 | Poker Coaching | https://apps.apple.com/us/app/poker-coaching/id1444569705 |
| 2 | GTO Preflop Wizard Poker AI | https://apps.apple.com/pl/app/gto-preflop-wizard-poker-ai/id6590603158 |
| 3 | Postflop+ GTO Poker Trainer | https://apps.apple.com/pl/app/postflop-gto-poker-trainer/id1488850006 |
| 4 | Gambit – Play and Learn Poker | https://apps.apple.com/pl/app/gambit-play-and-learn-poker/id6758732164 |
| 5 | Preflop+ Poker GTO Nash Charts | https://apps.apple.com/pl/app/preflop-poker-gto-nash-charts/id1435468870 |
| 6 | GTO Preflop | https://apps.apple.com/pl/app/gto-preflop/id1629141961 |
| 7 | Poker Academy: Learn GTO poker | https://apps.apple.com/pl/app/poker-academy-learn-gto-poker/id1626050814 |
| 8 | Evenbet Poker Trainer | https://apps.apple.com/us/app/evenbet-poker-trainer/id1541518500 |
| 9 | Solver+ Poker: GTO Strategy | https://apps.apple.com/pl/app/solver-poker-gto-strategy/id1530767783 |
| 10 | DTO MTT – GTO Poker Trainer | https://apps.apple.com/pl/app/dto-mtt-gto-poker-trainer/id1458491856 |
| 11 | NTPoker – GTO Poker Trainer | https://apps.apple.com/pl/app/ntpoker-gto-poker-trainer/id1630961215 |
| 12 | Poker Trainer – Learn Poker | https://apps.apple.com/pl/app/poker-trainer-learn-poker/id6478522482 |

Klisze (liczba aplikacji z 13, obserwacja zrzutów):
| Klisza | Ile | Gdzie |
|---|---|---|
| Prawie czarne albo granatowe tło całego interfejsu | 10 | 1, 3, 4, 5, 6, 7, 9, 10, 11, 12 |
| Owalny stół z widoku z góry z miejscami wokół jako główny ekran decyzji | 6 | 2, 3, 5, 7, 11, 12 |
| Siatka 13×13 jako czerwono-zielona mapa ciepła | 6 | 5, 6, 7, 9, 10, 11 |
| Zielone sukno / zieleń jako barwa marki | 6 | 1, 4, 5, 6, 7, 10 |
| Kwasowa zieleń albo neon na ciemnym tle jako akcent | 5 | 1, 4, 6, 9, 11 |
| Karty do gry w ikonie | 4 | 0, 3, 4, 5 (+ pik w 9, 10, 12) |
| Żetony w ikonie lub na ekranie | 3 | 3, 4, 5 |
| Ocena zagrania samym kolorem (zieleń / czerwień paska) | 3 | 6, 11, 12 |
| Słowa szachowe przy ocenie („Mistake”, „Blunder”) | 1 | 6 (tylko słowo, bez znaku przy ruchu) |
| Plakietka „AI” | 2 | 2, 11 |

Wnioski: (1) sukno, owalny stół, ciemne tło z neonem i mapa ciepła 13×13 to język kategorii — bez funkcji odpadają, a obecny motyw Szkoły Pokera (sukno `#1F5E45`) leży w środku kliszy; (2) nikt nie pokazuje, **z czego wynika ocena**: pasek jest zielony albo czerwony, a liczby solvera siedzą w osobnej tabeli; (3) nikt nie ma jasnego, papierowego świata nauki — to wolne miejsce, ale grozi kliszą „krem + szeryf” z kalibracji (sprawdzić w teście generyczności E2).

## Kandydaci na metaforę (10)
| Nr | Metafora (jedno zdanie) | Dane użytkownika | Moment firmowy | Ryzyko |
|---|---|---|---|---|
| M1 | **Zapis rozdania z adnotacjami**: każda decyzja to wiersz zapisu ulicy, a ocena to znak redaktora przy twoim ruchu, jak w zapisie partii szachowej | twoje decyzje w rozdaniu i sesji, stopień każdej, krótkie „dlaczego” | znak oceny „wpisywany” przy twoim ruchu (ruch + haptyka), linia zapisu rośnie z każdą decyzją | znaki szachowe obce części graczy (słowo zawsze obok znaku); gęstość tekstu przy AX5 |
| M2 | **Pasek strategii mieszanej**: jeden pasek pokazuje, jak często rozwiązanie gra każdą akcję w tej sytuacji, a twój wybór ląduje na nim jako znacznik | częstotliwości akcji z zakresu (te same, z których liczy się stopień), twój wybór, stopień | po decyzji pasek rozkłada się na udziały, a znacznik spada na twoją akcję: widać, dlaczego „dopuszczalne” nie jest błędem | częstotliwości muszą istnieć dla każdego zadania (dla zadań bez zakresu: inna forma, do E3); paski akcji są u konkurencji w tabelach |
| M3 | **Mapa 169 jako twoja mapa wiedzy**: siatka 13×13 wypełnia się w miarę, jak opanowujesz klasy rąk w danej pozycji | opanowanie każdej klasy (powtórki F-10, błędy), bieżąca ręka podświetlona w siatce | pole bieżącej ręki „zapełnia się” po ocenie | klisza kategorii nr 3 (mapa ciepła); przy 320 pt pola ok. 20 pt; dla P-2 na starcie pusta |
| M4 | **Indeks karty jako znak**: ogromne indeksy twoich dwóch kart prowadzą ekran, jak róg karty podniesionej znad stołu | twoja ręka, kolor przez symbol | podniesienie rogu kart przy nowym zadaniu | karty są w 4 ikonach z 13; mało danych poza ręką |
| M5 | **Plan stołu jako rysunek techniczny**: miejsca i kolejność akcji jako schemat liniowy, bez sukna | pozycja, kto działał, rozmiary w bb | przycisk dealera przesuwa się o miejsce przy nowym rozdaniu | owalny stół to klisza nr 2; schemat może wyglądać jak instrukcja |
| M6 | **Karta wyniku jak w golfie**: każda decyzja ma wpis kosztu w bb, sesja kończy się kartą | strata w bb na decyzję | wpis wyniku do karty | wymaga EV dla każdego zadania (nie mamy: progi bez EV, `thresholds.ts:16`); liczby sugerują wynik pieniężny |
| M7 | **Zeszyt z marginesem nauczyciela**: zadanie jak w zeszycie, ocena i „dlaczego” na marginesie | stopień, wyjaśnienie | adnotacja na marginesie | infantylne „szkolne”; czerwony długopis = błąd tylko kolorem; nakłada się z M1 |
| M8 | **Licznik outów**: karty, które poprawiają rękę, wyłożone w rzędzie | outy, szanse (F-06) | odliczanie outów | wąskie: tylko część zadań (F-06) |
| M9 | **Przycisk dealera jako znak**: krążek „D” wędruje po ścieżce modułów jak po miejscach stołu | postęp na ścieżce M0–M13 | krążek przesuwa się na następny moduł | sztuczne powiązanie (przycisk nie oznacza postępu) |
| M10 | Żetony i stos | — | — | **odrzucone z założenia**: hazard (W-07, OG-01, OG-02) |

## Wybór do rozwinięcia w E2
| Kierunek | Metafora | Dlaczego | Czym różni się od pozostałych |
|---|---|---|---|
| A | M1 Zapis z adnotacjami | jedyny z niekolorowym nośnikiem stopnia w samej metaforze (znak + słowo, NFR-DOST-001); pasuje do zapisu rozdania w scenariuszu F-12 i do „Zgłoś błąd” przy konkretnym ruchu; w skanie nikt go nie ma | element: znak przy ruchu i linia zapisu; układ: zapis ulic od góry, decyzje u dołu; świat: druk i papier |
| B | M2 Pasek strategii mieszanej | pokazuje dokładnie dane, z których liczy się ocena (`thresholds.ts`), więc „dlaczego” zaczyna się od obrazu, a ręka mieszana (ADR-04) przestaje wyglądać na błąd; wyróżnik wobec skanu (wniosek 2) | element: pasek częstotliwości z twoim znacznikiem; układ: sytuacja w jednym wierszu, pasek przez całą szerokość, akcje jako segmenty |
| C | M3 Mapa 169 | klisza z funkcją (lekcja Treningu): u konkurencji mapa jest tabelą solvera, tu byłaby twoją wiedzą (powtórki, błędy); łączy sesję z postępem | element: siatka z podświetloną ręką i stanem opanowania; układ: siatka jako tło sytuacji; ryzyko kliszy jawne w teście generyczności |

Rezerwa: M5 (plan stołu jako rysunek) i M4 (indeks karty). Odrzucone z powodem: M6 (brak EV), M7 (infantylne, kolor), M8 (wąskie), M9 (sztuczne), M10 (hazard).

## Karty kontrolne testu generyczności (E2, 2026-11-04, zapisane przed kartami kierunków)
Zadanie kart: pokazać, co powstaje bez wiedzy o tej aplikacji. Każde pole kierunku, które się z nimi pokrywa, zmieniam w E2 (tabela w `02-kierunki.md`).

| Pole | (a) Trener pokera bez wiedzy o dziedzinie | (b) Inna dziedzina, ten sam przepływ: trener zadań szachowych (pozycja → ruch → ocena i wyjaśnienie) |
|---|---|---|
| Idea | „Graj jak zawodowiec”: stół kasynowy w kieszeni | „Rozwiąż zadanie”: plansza i seria zadań |
| Element firmowy | owalny stół z sukna z góry, miejsca graczy, żetony przed graczami, twoje karty na dole | plansza 8×8, ruch podświetlony na zielono albo czerwono, ikona „!!” / „??” jako plakietka |
| Paleta | granat prawie czarny `#0E1726`, sukno `#1B6B45`, neonowa zieleń `#22C55E`, czerwień `#EF4444` na błąd, złoto `#F5B700` na wygraną | biel, zieleń pola `#769656`, beż pola `#EEEED2`, zieleń „dobrze” `#81B64C`, czerwień „źle” `#FA412D` |
| Kroje | Montserrat 800 albo Inter, liczby w Roboto Mono | Inter, tytuły zaokrąglonym krojem (Nunito 800) |
| Układ ekranu decyzji | stół na środku, trzy przyciski na dole: Pas (czerwony), Sprawdź (zielony), Przebij (żółty) z suwakiem | plansza na górze, pasek „Twój ruch” pod nią, po ruchu baner od dołu „Świetnie!” z przyciskiem „Dalej” |
| Ocena | zielony ptaszek albo czerwony krzyżyk na całym ekranie, licznik serii | zielony albo czerwony baner, ikona oceny, punkty rankingu zadań |
| Ruch, haptyka, dźwięk | karty rozdawane z przesunięciem, żetony suną do puli, konfetti przy dobrej decyzji, dźwięk żetonów | podskok figury, konfetti, dźwięk „ding” |
| Głos | „Nice hand!”, „Ouch, that's a leak!”, „Let's crush it!” | „Brilliant!”, „Oops, try again”, „You're on fire!” |
| Ikona | pik albo dwie karty z żetonem na zielonym albo czarnym tle | skoczek albo pionek na zielonym polu |
