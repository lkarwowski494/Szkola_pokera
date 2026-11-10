# fr-L1: francuski (fr), lekcje m1–m3 (6 plików) i egzaminy m0–m3

Recenzja niezależna względem `content/pl` (te same numery linii). Terminologia: `content/fr/terms-nazwy.yaml`. Zestawy kluczy znaczników `{{t:…}}` / `{{n:…}}`, karty (`hand`, `board`, `opp`, `[[…]]`), `correct: true` i liczby wpisane cyfrą porównane dodatkowo skryptem linia po linii: bez różnic (jedyna różnica cyfr: m0.yaml:60 „comme un 1” za „jako jedynka”, poprawne).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m1-l1-przebieg.md | tak | 97 |
| content/fr/lessons/m2-l1-outy.md | tak | 135 |
| content/fr/lessons/m2-l2-pot-odds.md | tak | 98 |
| content/fr/lessons/m3-l1-pozycja.md | tak | 70 |
| content/fr/lessons/m3-l2-rece-startowe.md | tak | 62 |
| content/fr/lessons/m3-l3-zakresy-otwarc.md | tak | 87 |
| content/fr/exams/m0.yaml | tak | 92 |
| content/fr/exams/m1.yaml | tak | 75 |
| content/fr/exams/m2.yaml | tak | 99 |
| content/fr/exams/m3.yaml | tak | 95 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | exams/m3.yaml:21 | `(env. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} mains)` | `… {{n:pf.rfi.utg.high}} des mains)` | wartości to procenty; „env. 15 %–18 % mains” jest niegramatyczne, lekcje mają „des mains” | wysoka | tak |
| 2 | ŚR | exams/m3.yaml:49 | `{{n:pf.rfi.btn.high}} mains` | `{{n:pf.rfi.btn.high}} des mains` | jw. | wysoka | tak |
| 3 | ŚR | exams/m3.yaml:59 | `{{n:pf.rfi.sb.high}} mains` | `{{n:pf.rfi.sb.high}} des mains` | jw. | wysoka | tak |
| 4 | ŚR | lessons/m2-l1-outy.md:111, 126; exams/m2.yaml:12, 36, 45, 86 | lekcja: `{{t:oesd\|Tirage quinte par les deux bouts}}`; egzamin: `{{t:oesd\|tirage quinte bilatéral}}` | jedna nazwa w lekcji i egzaminie | dwa różne tłumaczenia OESD w tym samym module (lekcja uczy jednej nazwy, egzamin pyta inną); w korpusie obie formy po ok. 10 razy, klucza `oesd` nie ma w terms-nazwy — wybór dla całego korpusu | wysoka | nie |
| 5 | ŚR | lessons/m3-l1-pozycja.md (15, 32, 35, 46, 55, 62, 66), exams/m3.yaml (9, 11, 12, 13, 32, 40, 49, 50) vs lessons/m3-l2:46, m3-l3:35, 49, 65, 71, 77 | „Button” / „Bouton” | jedna nazwa (terms-nazwy: `button: "bouton"`) | ta sama pozycja nazwana „Button” w m3-l1 i egzaminie, „Bouton” w m3-l2 i m3-l3; niespójność także w całym korpusie (ok. 107 vs 244) | wysoka | nie |
| 6 | ŚR | lessons/m2-l2-pot-odds.md (13, 41, 63, 73–97), exams/m2.yaml (61, 70) | „equity” | „équité” (terms-nazwy: `equity: "équité"`) albo świadomie „equity” wszędzie | termin bez znacznika pozostawiony po angielsku wbrew przyjętej nazwie; w korpusie fr oba warianty (ok. 116 vs 193) — decyzja dla całego korpusu | średnia | nie |
| 7 | ŚR | lessons/m1-l1-przebieg.md:77; exams/m1.yaml:44, 56 | `{{t:board\|tableau}}` | `{{t:board\|board}}` | terms-nazwy: `board: "board"`; m0 i m2 (egzaminy, lekcja m2-l1) mają „board”, moduł 1 „tableau” — dwa słowa na jedno pojęcie; niespójność w całym korpusie (111 vs 166) | wysoka | nie |
| 8 | ŚR | lessons/m2-l2-pot-odds.md:27; lessons/m3-l3-zakresy-otwarc.md:43; exams/m2.yaml:45, 77, 81 | „tout votre tapis”, „des tapis de {{n:format.stack}}”, „Relancer à tapis” vs „Les stacks sont profonds” | „stack(s)” (terms-nazwy: `stack: "stack"`), „all-in” (lekcja m1-l1 uczy „all-in”) | stack raz „tapis”, raz „stack”; all-in raz „all-in”, raz „à tapis” w przejrzanych plikach | średnia | nie |
| 9 | ŚR | exams/m2.yaml:77 | `(sans implied odds)` | `(sans cotes implicites)` | lekcja m2-l2:97 wprowadza pojęcie jako „cotes implicites” (terms-nazwy: `cote implicite`), egzamin tego samego modułu używa angielskiego „implied odds” bez objaśnienia; angielska forma występuje też w dalszych modułach (m6, m7), więc wybór korpusowy | średnia | nie |
| 10 | NISKIE | lessons/m3-l2-rece-startowe.md:45 | `attaquer les blinds` | `attaquer les blindes` | pisownia niespójna z terms-nazwy („blinde”) i lekcjami m1-l1, m3-l1, m3-l3 | wysoka | tak |
| 11 | NISKIE | lessons/m3-l2-rece-startowe.md:47 | `remporter les blinds` | `remporter les blindes` | jw. | wysoka | tak |
| 12 | NISKIE | exams/m3.yaml:11 | `les blinds parlent en premier` | `les blindes parlent en premier` | jw. | wysoka | tak |
| 13 | NISKIE | exams/m3.yaml:13 | `Préflop, les blinds parlent` | `Préflop, les blindes parlent` | jw. | wysoka | tak |
| 14 | NISKIE | exams/m3.yaml:23 | `Le limp cède … remporter les blinds` | `… remporter les blindes` | jw. | wysoka | tak |
| 15 | NISKIE | exams/m3.yaml:40 | `le Button et les blinds` | `le Button et les blindes` | jw. | wysoka | tak |
| 16 | NISKIE | exams/m3.yaml:49 | `Il ne reste que les blinds` | `Il ne reste que les blindes` | jw. | wysoka | tak |
| 17 | NISKIE | exams/m3.yaml:50 | `Face aux seules blinds` | `Face aux seules blindes` | jw. | wysoka | tak |
| 18 | NISKIE | exams/m3.yaml:51 | `remporte souvent les blinds` | `remporte souvent les blindes` | jw. | wysoka | tak |
| 19 | NISKIE | exams/m3.yaml:61 | `Compléter cède … remporter les blinds` | `… remporter les blindes` | jw. | wysoka | tak |
| 20 | NISKIE | exams/m3.yaml:88 | `laissez entrer les blinds` | `laissez entrer les blindes` | jw. | wysoka | tak |
| 21 | NISKIE | lessons/m3-l1-pozycja.md:69 | `{{t:early-position\|positions précoces}}` | `{{t:early-position\|premières positions}}` | kalka; egzamin m3 (m3.yaml:70) i m3-l3:80 mają „premières positions” | średnia | tak |
| 22 | NISKIE | lessons/m2-l1-outy.md:26 | `{{n:draw.oesd.ranks}} hauteurs ×` | `{{n:draw.oesd.ranks}} rangs ×` | ranga karty: „hauteurs” tylko w tej lekcji, egzamin m2 i moduł 3 mają „rang(s)” w tym samym rachunku | średnia | tak |
| 23 | NISKIE | lessons/m2-l1-outy.md:28 | `Deux hauteurs de cartes` | `Deux rangs de cartes` | jw. | średnia | tak |
| 24 | NISKIE | lessons/m1-l1-przebieg.md:96 | `**{{t:side-pot\|pot secondaire}}**, que seuls eux se disputent` | `**{{t:side-pot\|pot secondaire}}** (side pot), qu'eux seuls se disputent` | pominięty dopisek źródła „(side pot)”; niezręczny szyk | średnia | tak |
| 25 | NISKIE | lessons/m3-l2:26, 37; m3-l3:43; exams/m1.yaml:71, 73, 74; exams/m3.yaml:13, 18 vs m1-l1:76, m3-l1:17, 61, 64 | „préflop” / „Préflop” | jedna pisownia (terms-nazwy: `preflop`) | „preflop” i „préflop” na przemian (lekcja m1 uczy „Preflop”, egzamin m1 pyta o „préflop”); w korpusie 84 vs 41 | wysoka | nie |
| 26 | NISKIE | lessons/m2-l2-pot-odds.md:5 | `title: "Pot odds"` | ewent. „Cote du pot (pot odds)” | terms-nazwy: `pot-odds: "cote du pot"`, ale forma „cote du pot” nie występuje nigdzie w korpusie; tytuł jak w pl — do decyzji terminologicznej | średnia | nie |

Razem: KRYT 0, WYS 0, ŚR 9, NISKIE 17.

## Do sprawdzenia przez człowieka znającego język

- „Je complète la grosse blinde” jako limp z UTG / Buttona / w egzaminie (m3-l1:27, 37; m3.yaml:23, 51): „compléter” w żargonie fr dotyczy zwykle małego blinda (dopłata połowy); z innych pozycji naturalniej „Je paie seulement la grosse blinde” / „Je limpe”. Sens zrozumiały dzięki „(limp)” w uzasadnieniu; dla SB (m3.yaml:61, m3-l3:77) poprawne.
- `{{t:late-position|position tardive}}` (m3-l2:55): terms-nazwy podaje „fin de parole”; „position tardive” zrozumiałe, ale to jedyne wystąpienie w korpusie.
- „le cœur de la combinaison” za „rdzeń układu” (m0.yaml:32, 40): poprawne, ale w kontekście kart „cœur” to także kier; ewent. „la base de la combinaison”.
- „étroit / plus étroit” (m3.yaml:22, 32, 89) obok „serré / plus serré” (m3-l1:66, m3-l3:80, m3.yaml:22, 50, 62) za „wąsko / węziej”: oba zrozumiałe, w pokerze fr częściej „serré”.
- Typografia: m3-l1 i exams/m1.yaml używają apostrofu typograficznego (’), pozostałe pliki prostego ('); nie wpływa na sens.
- Teksty opcji raz w 1. osobie („Je me couche”, m1-l1, m3, m2.yaml:80–99), raz w bezokoliczniku („Se coucher”, m2-l2, m1.yaml) tam, gdzie pl ma 1. osobę („Pasuję”); kwestia spójności stylu.

## Uwagi do źródła pl

- exams/m2.yaml:23 (m2.exam.q2, opcja `{{n:draw.oesd.ranks}}`): uzasadnienie „Domyka cię jedna ranga (ósemka), ale w czterech kolorach” nie tłumaczy wprost, skąd błędna liczba 2 (zdanie wygląda na przeniesione z pytania o OESD, gdzie rangi były dwie). Przekład wierny.
- Źródło pl samo używa „Button” jako nazwy pozycji i „equity”, „pot odds”, „implied odds” bez znaczników; część niespójności fr (znaleziska 5, 6, 9, 26) wynika z tego, że terminy bez znacznika nie są pilnowane przez terms-nazwy.

## Ocena ogólna

Przekład jest wierny: we wszystkich 10 plikach nie znalazłem zmienionej liczby, ręki, pozycji, kierunku zalecenia, poprawnej odpowiedzi ani zgubionego znacznika, a francuszczyzna jest naturalna i poprawna. Jedyny wyraźny błąd językowy to trzykrotne „env. X–Y mains” bez „des” w egzaminie m3. Główna słabość to spójność terminologii między plikami (OESD, Button/Bouton, board/tableau, equity/équité, stack/tapis, preflop/préflop, blinds/blindes), widoczna dla ucznia zwłaszcza na styku lekcja–egzamin; większość wymaga decyzji dla całego korpusu, nie poprawek punktowych.
