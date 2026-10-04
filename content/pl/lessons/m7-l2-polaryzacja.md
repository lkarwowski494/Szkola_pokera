---
id: m7.l2
module: m7
order: 2
title: "Polaryzacja"
sub: "Duży bet: silne ręce i półblefy"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Który zakres betu na turnie jest spolaryzowany?"
    options:
      - { text: "Sety, dwie pary i dobierania, bez średnich par", correct: true, why: "Tak: zakres spolaryzowany ma dwa bieguny, bardzo silne ręce i półblefy. Środka, czyli średnich rąk, w nim nie ma: te ręce czekają." }
      - { text: "Najwyższe pary, średnie pary i słabsze pary", why: "To zakres liniowy: betujesz od najsilniejszych rąk w dół, bez blefów. Tak często betujesz mało na suchym flopie, a nie dużo na turnie." }
      - { text: "Same blefy", why: "Zakres bez silnych rąk rywal łatwo rozpozna i będzie sprawdzał. Spolaryzowany zakres łączy blefy z bardzo silnymi rękami." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Na suchym flopie [[Ks 7d 2c]] betowałeś mało prawie wszystkimi rękami: od seta po słabe pary. Jak nazywa się taki zakres betu?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Liniowy (zmieszany)", correct: true, why: "Tak: silne i średnie ręce betują razem, małym rozmiarem. To plan z M5 na suchym, wysokim flopie, gdzie masz przewagę zakresu." }
      - { text: "Spolaryzowany", why: "Spolaryzowany zakres nie ma średnich rąk: betują tylko bardzo silne ręce i blefy. Tu betowały też słabe pary." }
      - { text: "Ograniczony", why: "Ograniczony zakres to taki, w którym brakuje najsilniejszych rąk. Ty betowałeś także setami." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Dlaczego średnia para nie lubi dużego betu na turnie?"
    options:
      - { text: "Bo gorsze ręce spasują, a zapłacą lepsze", correct: true, why: "Tak: duży bet średnią parą zarabia tylko wtedy, gdy zapłaci gorsza ręka, a takie ręce na duży bet zwykle pasują. Zostają sprawdzenia od rąk, które cię biją." }
      - { text: "Bo duży bet zawsze jest blefem", why: "Nie: duży bet stawiają też najsilniejsze ręce. Kłopot średniej pary polega na tym, kto jej zapłaci." }
      - { text: "Bo średnia para nie może wygrać", why: "Może: wygrywa z blefami i z gorszymi parami. Dlatego czeka i dochodzi do showdownu tanio." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to dwójka. W puli jest {{n:ex.pot}}, rywal czeka. Masz seta. Co robisz?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Tak: rywal może dobierać do koloru (dwa kiery) i do strita (np. 65, T9). Przy becie 3/4 puli dobieranie do koloru potrzebuje {{n:eq.bet-three-quarters}} equity, a ma ok. {{n:odds.flush.turn-river}}: płaci za drogo." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: przy becie 1/4 puli dobieranie potrzebuje tylko {{n:eq.bet-quarter}} equity, więc dostaje dobrą cenę. Z bardzo silną ręką na mokrym stole betujesz dużo." }
      - { text: "Czekam", why: "Darmowa karta to prezent dla dobierań, a ty nie budujesz puli przed riverem. Set na mokrym stole betuje." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to trójka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Tak: dobieranie do koloru z dwiema wysokimi kartami to dobry półblef. Betujesz tym samym dużym rozmiarem co silne ręce, więc rywal nie odróżni blefu od wartości." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: tak tani bet rywal sprawdzi każdą parą, a półblef zarabia przede wszystkim na pasach. Gdyby małe bety oznaczały u ciebie dobierania, a duże silne ręce, rywal łatwo by to wykorzystał." }
      - { text: "Czekam", why: "Nie jest to duży błąd, bo za darmo zobaczysz rivera, ale rezygnujesz z wygrania puli od razu. Dobieranie z wysokimi kartami to jeden z najlepszych półblefów." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to piątka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "Czekam", correct: true, why: "Najwyższa para ze słabym kickerem to średnia ręka. Na duży bet zapłacą głównie lepsze króle (AK, KQ, KJ), a gorsze ręce spasują. Czekając, dochodzisz tanio do showdownu." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Duży bet pasuje do zakresu spolaryzowanego. Z tą ręką zarabiasz głównie od rąk, które cię biją." }
      - { text: "Betuję {{n:ex.bet.pot}}", why: "Jeszcze większa pula z ręką średniej siły: gorsze ręce prawie zawsze spasują, a lepsze zapłacą." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. W puli jest {{n:ex.pot}}, betujesz {{n:ex.bet.three-quarters}} z bardzo silną ręką. Ile procent equity potrzebuje rywal z dobieraniem, żeby sprawdzić? Wpisz liczbę."
    answer: eq.bet-three-quarters
    explanation: "Rywal dopłaca {{n:ex.bet.three-quarters}} do puli, która po sprawdzeniu ma {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. Dobieranie do koloru ma na turnie ok. {{n:odds.flush.turn-river}}, więc płaci za drogo."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Masz seta i betujesz tylko {{n:ex.bet.quarter}} do puli {{n:ex.pot}}. Rywal dobiera do koloru (ok. {{n:odds.flush.turn-river}} na riverze). Co z tego wynika?"
    options:
      - { text: "Dostaje dobrą cenę: potrzebuje tylko {{n:eq.bet-quarter}}", correct: true, why: "Tak: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, mniej niż jego {{n:odds.flush.turn-river}}. Sprawdzenie mu się opłaca, a tobie mały bet oddaje część wartości." }
      - { text: "Musi spasować, bo potrzebuje {{n:eq.bet-three-quarters}}", why: "Tyle potrzebowałby przy becie 3/4 puli. Przy becie 1/4 puli wystarcza mu {{n:eq.bet-quarter}}." }
      - { text: "Cena nie ma znaczenia, bo i tak go bijesz", why: "Teraz go bijesz, ale w ok. {{n:odds.flush.turn-river}} przypadków wygra na riverze. Rozmiar betu decyduje, czy płaci za tę szansę za dużo, czy za mało." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Rywal ma na turnie otwarte dobieranie do strita: ok. {{n:odds.oesd.turn-river}} na riverze. Od jakiego twojego betu płaci za drogo (licząc tylko pot odds)?"
    options:
      - { text: "Już od 1/3 puli: potrzebuje {{n:eq.bet-third}}", correct: true, why: "Tak: {{n:eq.bet-third}} to więcej niż {{n:odds.oesd.turn-river}}. Na turnie dobierania mają tylko jedną kartę, więc nawet średni bet daje im złą cenę." }
      - { text: "Dopiero od całej puli: potrzebuje {{n:eq.bet-pot}}", why: "Przy całej puli płaci dużo za drogo, ale już przy 1/3 puli potrzebuje {{n:eq.bet-third}}, więcej niż swoje {{n:odds.oesd.turn-river}}." }
      - { text: "Nigdy, dobieranie zawsze może sprawdzić", why: "Dobieranie sprawdza tylko przy dobrej cenie albo z implied odds (następna lekcja). Na turnie ma ok. {{n:odds.oesd.turn-river}}, więc większość betów to dla niego zła cena." }
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. W puli jest {{n:ex.pot}}, betujesz całą pulę: {{n:ex.bet.pot}}. Ile procent equity potrzebuje rywal, żeby sprawdzić? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "Rywal dopłaca {{n:ex.bet.pot}} do puli, która po sprawdzeniu ma {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Ani kolor (ok. {{n:odds.flush.turn-river}}), ani strit otwarty (ok. {{n:odds.oesd.turn-river}}) nie mają takiej szansy."
---
Na flopie często betowałeś mało prawie całym zakresem. Na turnie zakres betu się zmienia: zostają w nim bardzo silne ręce i półblefy, a średnie ręce czekają. Taki zakres nazywamy spolaryzowanym.

## Dwa rodzaje zakresu

- **Liniowy (zmieszany):** betujesz od najsilniejszych rąk w dół, razem ze średnimi. Zwykle małym rozmiarem, np. c-bet {{n:cbet.size.small}} puli na [[Ks 7d 2c]].
- **Spolaryzowany:** betują dwa bieguny, bardzo silne ręce (sety, dwie pary, mocne najwyższe pary) i półblefy (dobierania). Średnich rąk w nim nie ma.

## Dlaczego na turnie polaryzujesz

Rywal sprawdził flop, więc ma parę albo dobieranie. Średnia ręka na drugi bet nic nie zyskuje: gorsze ręce pasują, a lepsze płacą. Silne ręce chcą zbudować pulę przed riverem, a półblefy potrzebują pasów i mają outy, gdy dostaną sprawdzenie.

## Duży zakres, duży bet

Zakres spolaryzowany betuje dużo, np. 3/4 puli. Silne ręce wyciągają więcej żetonów, a półblefy częściej wygrywają od razu. Średnie ręce czekają. Gdy blefy i silne ręce betują tym samym rozmiarem, rywal nie wie, co masz.

## Cena dla dobierań

Na turnie dobieranie ma tylko jedną kartę. Duży bet każe mu płacić za drogo:

| Twój bet | Rywal potrzebuje | Kolor ma | Strit otwarty ma |
|---|---|---|---|
| 1/4 puli | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 puli | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 puli | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 puli | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Cała pula | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Przy becie 1/4 puli dobieranie do koloru ma dobrą cenę. Od 1/3 puli wzwyż płaci za drogo, chyba że liczy na implied odds (następna lekcja).

:::note Skąd te zasady
Pojęcia zakresu spolaryzowanego i liniowego oraz zasada „spolaryzowany zakres betuje dużo, średnie ręce czekają” pochodzą z literatury (GTO Gecko, PokerCoaching, PokerStrategy) i są tu heurystyką. Rozmiar 3/4 puli to przykład do ćwiczeń, a nie jedyny dobry rozmiar. Ceny w tabeli to dokładne obliczenia aplikacji.
:::
