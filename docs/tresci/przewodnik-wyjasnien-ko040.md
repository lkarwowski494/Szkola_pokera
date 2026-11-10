# Przewodnik wyjaśnień „dlaczego dobrze / dlaczego źle” (KO-040)
Stan: 2026-11-10 · Rola 06 build, sesja BG · Wymagania: BR-OCE-001, BR-OCE-002 (`docs/brd/wymagania-scenariusze.md:151-189`) · Decyzja: D-565

Słowa właściciela (KO-040): „Ludzie muszą się uczyć na intuicję - jak mam to i to i taką pozycję i taką sytuacją na stole to gram to bo…”. Ten przewodnik mówi, **jak zbudować** wyjaśnienie; **co jest prawdą**, rozstrzyga rejestr (`docs/tresci/rejestr.json`) i hierarchia ADR-24. Brzmienie ogólne (ton, „ty”, długość zdań) należy do roli 04 (`docs/design/`).

## 1. Wzorzec (kolejność części)
1. **Sytuacja** — to, co widzi gracz: „Masz <ręka>, jesteś na <pozycja>, na stole <karty albo opis>, rywal <akcja>”. Tylko części, które zadanie ma (generator `drawCall` nie ma pozycji: nie dopisujemy jej).
2. **Zagranie** — „→ grasz / sprawdzasz / pasujesz <akcja>”.
3. **Bo** — powód słowami gry: kogo bijesz, kto zapłaci, czego się boisz, co zyskujesz, ile graczy jest za tobą. Powód pochodzi z pola `because` reguły (`content/pl/rules.yaml`) albo z rachunku na danych zadania; nigdy z pamięci.
4. **Liczba (opcjonalnie, na końcu)** — z przełożeniem w tym samym zdaniu: „potrzebujesz 25%, czyli wygrywać mniej więcej raz na 4”. Wzór (np. `bet ÷ (pula + 2·bet)`) najwyżej po przełożeniu, jako „jak to policzyć”.

**Dlaczego źle** (każda zła opcja, BR-OCE-002): co ta akcja **traci w tej sytuacji** albo jaki **błąd myślowy** za nią stoi („liczysz szansę do rivera, a płacisz tylko za turn”). Samo „Nie.”, sam próg albo sam procent solvera nie są wyjaśnieniem.

**Ręka mieszana (ADR-04)**: gdy źródło gra obie akcje, mówimy to wprost („to ręka na granicy: grają ją raz tak, raz tak; obie odpowiedzi są dobre”) i podajemy powód, dla którego jest na granicy (pozycja, liczba graczy za tobą).

## 2. Zasady
- **Merytoryka bez zmian.** Przeróbka zmienia kolejność i słowa, nie decyzję, liczbę ani poziom pewności. Nowe twierdzenie (nowy powód) wymaga przeczytanego źródła w rejestrze albo trafia do otwartych pytań.
- **„Raz na N” to rachunek**, nie twierdzenie: N = 1 ÷ ułamek, zaokrąglone, ze słowem „mniej więcej”. Gdy dwa zaokrąglenia dają to samo N, decyduje dokładna liczba podana obok („trochę rzadziej”).
- **Częstość solvera** zostaje jako dodatek po „bo” i dostaje sens: „prawie zawsze”, „zwykle”, „rzadko”, „prawie nigdy”.
- **Liczby w treści** tylko przez `{{n:klucz}}` (`CLAUDE.md`); w generatorach liczby z danych zadania.
- **Bez tautologii.** „Traci, bo traci w długim terminie” zastępujemy powodem („płacisz za kartę, która trafia rzadziej, niż wymaga cena”).
- **Długość:** sytuacja + bo w 1–2 zdaniach; liczba w jednym. Dłuższe tło należy do lekcji.

## 3. Przykłady przed / po
| # | Miejsce | Przed | Po |
|---|---|---|---|
| 1 | generator `rangeDecision`, spot `rfi.utg`, ręka A9o (zła opcja „Przebicie”) | „Solver gra tak tylko w 0,3% przypadków, czyli prawie nigdy.” | „Za luźno. A9o z UTG pasujesz: za tobą jest jeszcze pięciu graczy, więc ktoś częściej ma lepszą rękę [R-M3-002]. Solver gra tak tylko w 0,3% przypadków, czyli prawie nigdy.” |
| 2 | generator `drawCall`, flop, draw do koloru, zakład = pula | „Masz 9 outów z 47 nieznanych kart, czyli 19,1% szans na turnie. … Potrzebujesz 33%. Szansa jest wyraźnie mniejsza niż cena…” | „Masz draw do koloru na flopie, rywal stawia 100 do puli 100. Pasujesz, bo płacisz za jedną kartę, a ona trafia rzadziej, niż wymaga cena. Cena: potrzebujesz 33%, czyli wygrywać mniej więcej raz na 3; draw trafia na turnie w 19,1% (9 outów z 47 kart), mniej więcej raz na 5.” |
| 3 | egzamin `m2.exam.q6`, opcja „Pasuję” | „Potrzebujesz 33%. Sprawdzenie kupuje tylko turn, a na nim trafisz z szansą ok. 19,1%. To wyraźnie za mało.” | „Tak. Masz draw do koloru, a rywal stawia całą pulę: sprawdzenie kupuje tylko turn, bo na nim rywal może postawić znowu. Za tę cenę musisz trafiać mniej więcej raz na 3 (33%), a kolor trafia na turnie mniej więcej raz na 5 (ok. 19,1%).” |
| 4 | egzamin `m8.exam.q8`, opcja „Pasuję” | „Tak: potrzebujesz 60 ÷ (90 + 60 + 60) = 28,6% equity, a bluff-catcher wygrywa tylko z blefami, czyli w ok. 20% przypadków. Sprawdzenie traci.” | „Tak. Twoja ręka bije tylko blefy, a ten rywal blefuje za rzadko: sprawdzenie wygra mniej więcej raz na 5, a cena wymaga mniej więcej raz na 3,5. Rachunek: 60 ÷ (90 + 60 + 60) = 28,6% wobec ok. 20% blefów.” |
| 5 | generator `icm`, sprawdzenie na bańce przy equity powyżej progu w żetonach (zła opcja „Sprawdzam”) | „Nie. Według ICM potrzebujesz 66,5% equity, a masz 55%. W grze o żetony call by się opłacało, ale przegrana kosztuje tu więcej pieniędzy, niż wygrana dodaje.” | „Nie. Na bańce przegrana zabiera ci więcej z puli nagród, niż wygrana dodaje, więc sprawdzasz tylko ręką, która wygrywa wyraźnie częściej [R-M11-009]. Tu potrzebujesz 66,5% (mniej więcej 2 razy na 3), a masz 55%; w grze o żetony to sprawdzenie by się opłaciło.” |

Liczby w tabeli są przykładowe (wartości z `content/numbers.yaml` i z przykładowego zadania); w treści zostają klucze `{{n:…}}`.

## 4. Kontrola po przeróbce
- Ta sama decyzja i te same liczby (porównanie przed/po w recenzji niezależnej, `docs/tresci/stan-bg.md`).
- Zmienione klucze `drill.*` w `pl.json` i pliki `content/pl/` wypisane dla roli 09 (przekład w kroku I).
- Metoda oceny BR-OCE-003 (A/B/C) jak w `docs/zakres/ocena-wyjasnien-ko040.md`.
