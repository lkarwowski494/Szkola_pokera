# de-L1: niemiecki (de), lekcje m1–m3 (6 plików) i egzaminy m0–m3

Przegląd niezależny, źródło `content/pl`, terminologia `content/de/terms-nazwy.yaml`. Zestawy kluczy znaczników `{{t:…}}` i `{{n:…}}` porównane mechanicznie plik po pliku: we wszystkich 10 plikach te same klucze w tej samej liczbie (różni się tylko kolejność w zdaniu).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m1-l1-przebieg.md | tak | 97 |
| content/de/lessons/m2-l1-outy.md | tak | 135 |
| content/de/lessons/m2-l2-pot-odds.md | tak | 98 |
| content/de/lessons/m3-l1-pozycja.md | tak | 70 |
| content/de/lessons/m3-l2-rece-startowe.md | tak | 62 |
| content/de/lessons/m3-l3-zakresy-otwarc.md | tak | 87 |
| content/de/exams/m0.yaml | tak | 92 |
| content/de/exams/m1.yaml | tak | 75 |
| content/de/exams/m2.yaml | tak | 99 |
| content/de/exams/m3.yaml | tak | 95 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | lessons/m1-l1-przebieg.md:6 | Blinds, Straßen und mögliche Aktionen | Blinds, Streets und mögliche Aktionen | pl „ulice”; w korpusie „Straße” = strit (układ), ulica = „Street” (terms-nazwy) — podtytuł dwuznaczny | wysoka | tak |
| 2 | ŚR | lessons/m1-l1-przebieg.md:96 | \*\*{{t:side-pot\|Nebenpot}}\*\*, um den | \*\*{{t:side-pot\|Nebenpot}}\*\* (Side Pot), um den | pominięty nawias „(side pot)” ze źródła; nazwa terminu w terms-nazwy to „Side Pot” | wysoka | tak |
| 3 | NISKIE | lessons/m1-l1-przebieg.md:96 | Du bietest nicht mehr weiter mit | Du setzt danach nicht mehr | „mitbieten” to słownictwo aukcji, w pokerze nienaturalne | średnia | tak |
| 4 | ŚR | lessons/m3-l2-rece-startowe.md:58 | {{t:combo\|Kombos}} es gibt | {{t:combo\|Kombinationen}} es gibt | terms-nazwy: „Kombination”; m0-l1 i m5 mają „Kombinationen” | wysoka | tak |
| 5 | ŚR | lessons/m3-l2-rece-startowe.md:59 | {{n:combos.total}} {{t:combo\|Kombos}} | {{n:combos.total}} {{t:combo\|Kombinationen}} | jw. | wysoka | tak |
| 6 | ŚR | lessons/m3-l2-rece-startowe.md:59 | {{n:combos.pair}} {{t:combo\|Kombos}} | {{n:combos.pair}} {{t:combo\|Kombinationen}} | jw. | wysoka | tak |
| 7 | NISKIE | lessons/m3-l3-zakresy-otwarc.md:77 | ähnlich weit wie der Button | ähnlich breit wie der Button | „szeroko” w m3 to „breit”; niespójne | wysoka | tak |
| 8 | ŚR | exams/m3.yaml:77 | {{t:straight\|Straights}} genauso oft | {{t:straight\|Straßen}} genauso oft | strit wszędzie indziej i w terms-nazwy = „Straße” | wysoka | tak |
| 9 | ŚR | exams/m3.yaml:79 | eine {{t:straight\|Straight}} | eine {{t:straight\|Straße}} | jw. | wysoka | tak |
| 10 | ŚR | exams/m3.yaml:79 | {{t:straight\|Straights}} hängen | {{t:straight\|Straßen}} hängen | jw. | wysoka | tak |
| 11 | NISKIE | exams/m3.yaml:21 | {{n:pf.rfi.utg.high}} Hände) | {{n:pf.rfi.utg.high}} der Hände) | liczby to procenty; „15 %–18 % Hände” niegramatyczne, lekcje mają „der Hände” | wysoka | tak |
| 12 | NISKIE | exams/m3.yaml:49 | {{n:pf.rfi.btn.high}} Hände. | {{n:pf.rfi.btn.high}} der Hände. | jw. | wysoka | tak |
| 13 | NISKIE | exams/m3.yaml:59 | {{n:pf.rfi.sb.high}} Hände. | {{n:pf.rfi.sb.high}} der Hände. | jw. | wysoka | tak |
| 14 | ŚR | exams/m3.yaml:40 | eröffnest du weiter als aus dem HJ | eröffnest du breiter als aus dem HJ | „weiter” czyta się też jako „nadal”; pl „szerzej”, w m3-l1 „breiter” | wysoka | tak |
| 15 | NISKIE | exams/m3.yaml:41 | die {{t:range}} ist weiter. | die {{t:range}} ist breiter. | spójność „szerszy” = „breiter” | wysoka | tak |
| 16 | NISKIE | exams/m3.yaml:59 | {{t:open\|eröffnest}} du weit, ca. | {{t:open\|eröffnest}} du breit, ca. | spójność „szeroko” = „breit” | wysoka | tak |
| 17 | ŚR | exams/m3.yaml:61 | Auf den {{t:big-blind\|Big Blind}} ergänzen | Zum {{t:big-blind\|Big Blind}} komplettieren | dopłata z SB w m1-l1:49 i m3-l3:77 to „komplettieren”; „ergänzen” nie jest terminem pokerowym | wysoka | tak |
| 18 | NISKIE | exams/m3.yaml:61 | Mit dem Ergänzen gibst du | Mit dem Komplettieren gibst du | jw. | wysoka | tak |
| 19 | NISKIE | exams/m3.yaml:95 | Färbe die Hände ein, mit | Male die Hände an, mit | to samo polecenie w m3-l3:35 i :41 brzmi „Male die Hände an” | średnia | tak |
| 20 | ŚR | lessons/m1-l1-przebieg.md:16, 34, 35, 72, 87, 92 wobec exams/m1.yaml:8, 11, 19, 30, 39 i m2–m3 | {{t:call\|Mitgehen}}, {{t:call\|mitgehen}}, „Ich {{t:call\|gehe mit}}” | {{t:call\|Callen}} / {{t:call\|callen}} (albo odwrotnie w egzaminie m1) | lekcja m1.l1 uczy akcji jako „Mitgehen”, a egzamin tego samego modułu i wszystkie dalsze pliki używają tylko „callen/Call”; słowo „Call” nie pada w lekcji ani razu. Wybór formy dotyczy całego korpusu | średnia | nie |
| 21 | NISKIE | lessons/m3-l1-pozycja.md:26, 35 („Ich {{t:raise\|raise}}”), m3-l3:43, 77, exams/m3.yaml („Raisen”, „raist”) wobec m1-l1, exams/m1.yaml, m3-l2:26, 35, 45, 47, 53 („erhöhen”, „Ich erhöhe”) | raisen / erhöhen | jedna forma czasownika w całym zakresie | to samo zagranie raz „erhöhen”, raz „raisen”, także w obrębie modułu 3; obie formy zrozumiałe, wybór dotyczy całego korpusu | średnia | nie |
| 22 | NISKIE | exams/m3.yaml:21, 31, 49, 75 wobec lekcji m3 | AT ungleichfarbig, T9 ungleichfarbig | AT in verschiedenen Farben | lekcje m3 mają „in verschiedenen Farben” / „gleichfarbig”; „ungleichfarbig” występuje tylko w egzaminie | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- `exams/m3.yaml:23, 51` „Den {{t:big-blind|Big Blind}} bezahlen” oraz `lessons/m3-l1-pozycja.md:27, 37` „Ich zahle den {{t:big-blind|Big Blind}}” (pl „Dopłacam do dużego blinda”, czyli limp): po niemiecku można to odczytać jako wpłatę obowiązkowego blinda. Uzasadnienie odpowiedzi nazywa to limpem, więc sens da się odtworzyć; do rozważenia „Nur den Big Blind callen (limpen)”.
- `lessons/m2-l1-outy.md:55` „Gegen eine normale {{t:bet|Bet}} am Flop kaufst du eine Karte” (pl „Za zwykły bet na flopie kupujesz jedną kartę”): zrozumiałe, ale przyimek „gegen” jest nietypowy; możliwe „Mit dem Call einer normalen Bet”.
- Zakład (bet) to raz „Einsatz” (m1-l1, m2-l2, exams/m1), raz „Bet” (m2-l1, exams/m2, m3-l1:69). Obie formy są w `terms-nazwy.yaml` jako formy tłumacza, a m1-l1:17 i :86 wprowadza obie nazwy, więc nie zgłaszam jako błąd; decyzja o ujednoliceniu należy do osoby prowadzącej terminologię.
- `lessons/m1-l1-przebieg.md:6`: jeśli „Streets” w podtytule pierwszej lekcji uznacie za zbyt żargonowe, alternatywą jest „Setzrunden” (termin używany w treści tej lekcji).

## Uwagi do źródła pl

Brak.

## Ocena ogólna

Przekład jest wierny: we wszystkich 10 plikach liczby, ręce, pozycje, kierunki zaleceń, poprawne odpowiedzi i uzasadnienia zgadzają się ze źródłem, a znaczniki mają te same klucze. Nie ma znalezisk KRYT ani WYS. Uwagi dotyczą spójności terminologii (Straße/Straight, Kombination/Kombos, breit/weit, komplettieren/ergänzen, Mitgehen/callen) i kilku drobiazgów językowych; najwięcej z nich skupia się w `exams/m3.yaml`, który wygląda na tłumaczony osobno od lekcji modułu 3.
