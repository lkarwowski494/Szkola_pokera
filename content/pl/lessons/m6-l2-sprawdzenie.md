---
id: m6.l2
module: m6
order: 2
title: "Sprawdzić czy spasować"
sub: "Obrona przed c-betem bez pozycji"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. W puli jest {{n:ex.third.pot}}, Button stawia c-bet {{n:ex.third.bet}}. Ile equity potrzebujesz do sprawdzenia?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Dopłacasz {{n:ex.third.bet}} do puli, która po sprawdzeniu ma {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Mały c-bet daje bardzo dobrą cenę." }
      - { text: "{{n:alpha.bet-third}}", why: "To alpha: jak często blef Buttona musi zadziałać. Do mianownika potrzebnego equity dolicz też swoje sprawdzenie." }
      - { text: "{{n:mdf.bet-third}}", why: "To MDF, czyli część zakresu, a nie equity jednej ręki. Na flopie bronisz zresztą mniej niż MDF." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. W puli jest {{n:ex.pot}}, Button stawia c-bet {{n:ex.bet.three-quarters}}. Ile procent equity potrzebujesz do sprawdzenia? Wpisz liczbę."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Dopłacasz {{n:ex.bet.three-quarters}} do puli, która po sprawdzeniu ma {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ tę sumę = {{n:eq.bet-three-quarters}}. To ponad dwa razy więcej niż wobec c-betu 1/4 puli ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Ta sama ręka na tym samym flopie. Raz Button stawia 1/3 puli, raz całą pulę. Jak zmienia się twoja obrona?"
    table: { position: BB }
    options:
      - { text: "Wobec całej puli bronisz węższym zakresem", correct: true, why: "Większy bet to gorsza cena: potrzebne equity rośnie z {{n:eq.bet-third}} do {{n:eq.bet-pot}}, a MDF spada z {{n:mdf.bet-third}} do {{n:mdf.bet-pot}}. Najsłabsze ręce, które sprawdzały mały bet, teraz pasujesz." }
      - { text: "Bronisz tak samo, bo to ta sama ręka", why: "Ręka ta sama, ale cena inna. Przy becie wielkości puli potrzebujesz {{n:eq.bet-pot}} equity zamiast {{n:eq.bet-third}}." }
      - { text: "Wobec całej puli bronisz szerzej, bo duży bet to częściej blef", why: "Nie ma takiej reguły. Duży bet zwykle oznacza zakres spolaryzowany (bardzo silne ręce i blefy), a w każdym razie gorszą cenę dla ciebie." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "Sprawdzam", correct: true, why: "Środkowa para wygrywa ze wszystkimi blefami Buttona (ręce bez pary), a do sprawdzenia potrzebujesz tylko {{n:eq.bet-third}} equity. Standardowa obrona." }
      - { text: "Pasuję", why: "Za ciasno. Wobec małego c-betu pasujesz ręce bez pary i bez dobierania, a nie parę." }
      - { text: "Check-raise", why: "Po przebiciu gorsze ręce Buttona spasują, a zapłacą lepsze (króle, wyższe pary). Średnia para zamienia się wtedy w blef. Lepiej sprawdzić." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 3/4 puli. Co robisz?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "Nie masz pary ani dobierania (żadnego pika, a strit jest daleko). Wobec dużego c-betu potrzebujesz {{n:eq.bet-three-quarters}} equity, a bez pozycji rzadko dojdziesz z samymi wysokimi kartami do showdownu. Para damy albo waleta też nie zawsze wygra." }
      - { text: "Sprawdzam", why: "Kusi, bo dama i walet są wyższe od stołu. Ale gołe wysokie karty to za mało przy takiej cenie: na turnie często dostaniesz kolejny bet i spasujesz." }
      - { text: "Check-raise", why: "Do blefu lepiej nadają się ręce z dobieraniem, które mają drugą drogę do wygranej. Ta ręka nie ma żadnej." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "Sprawdzam", correct: true, why: "Dwie wysokie karty plus dodatkowe dobieranie do koloru (backdoor: trzy piki, potrzebujesz pika na turnie i na riverze). Przy cenie {{n:eq.bet-third}} to wystarczy do sprawdzenia." }
      - { text: "Check-raise", why: "Blefy w check-raise'ach robisz przede wszystkim mocnymi dobieraniami (kolor, strit otwarty z obu stron). Dodatkowe dobieranie to słabe dobieranie: po przebiciu i sprawdzeniu zwykle zostajesz z samymi wysokimi kartami. Doświadczeni gracze czasem tak blefują, ale prościej i bezpieczniej jest sprawdzić." }
      - { text: "Pasuję", why: "Za ciasno wobec małego c-betu. Dodatkowe dobieranie i dwie wysokie karty dają dość equity przy cenie {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "Sprawdzam", correct: true, why: "Masz gutshot do strita (dama) i króla wyższego od stołu. Sam gutshot daje ok. {{n:odds.gutshot.flop-river}} do rivera, a król dokłada szansę na najwyższą parę. Przy cenie {{n:eq.bet-third}} sprawdzenie się opłaca." }
      - { text: "Pasuję", why: "Za ciasno: dobieranie plus wysoka karta to wystarczająco dużo wobec małego c-betu." }
      - { text: "Check-raise all-in", why: "Ryzykujesz cały stack ręką, która jeszcze nic nie ma. Taki rozmiar wypycha słabsze ręce, a płacą tylko lepsze." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "Nie masz pary ani dobierania do koloru, a do strita brakuje ci dwóch kart. Na flopie z asem i królem Button ma dużo silnych rąk. Cena jest dobra, ale ta ręka prawie nigdy jej nie zrealizuje." }
      - { text: "Sprawdzam, bo MDF wynosi {{n:mdf.bet-third}}", why: "MDF to punkt odniesienia dla całego zakresu, a nie powód, żeby płacić najsłabszymi rękami. Na flopie bronisz mniej niż MDF." }
      - { text: "Check-raise", why: "Na flopie z asem i królem przewaga zakresu jest po stronie Buttona, a ty nie masz dobierania, które dawałoby drugą drogę do wygranej." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Dlaczego bez pozycji nie sprawdzasz na flopie każdej ręki, której equity jest choć trochę wyższe od ceny?"
    table: { position: BB }
    options:
      - { text: "Bo nie zrealizujesz całego equity", correct: true, why: "Equity to szansa przy grze do showdownu bez dalszych zakładów. Bez pozycji mówisz pierwszy na turnie i riverze i często spasujesz na kolejny bet. Słabe ręce realizują wtedy mniej niż swoje equity." }
      - { text: "Bo Button na flopie zawsze ma silną rękę", why: "Button otwiera i c-betuje szeroko, także blefami. Problemem jest twoja pozycja, nie jego siła." }
      - { text: "Bo trzeba oszczędzać żetony na lepsze okazje", why: "Liczy się wartość oczekiwana każdej decyzji, nie oszczędzanie żetonów." }
---
W M5 grałeś c-bet jako agresor. Teraz siedzisz po drugiej stronie: bronisz duży blind, czekasz na flopie, a Button stawia c-bet. Pamiętaj z M5: c-bet to zakład gracza, który przebijał preflop, a przewaga zakresu zależy od tekstury flopu.

## Cena c-betu

Najpierw liczysz, ile equity potrzebujesz (wzór z M2). Mały c-bet daje świetną cenę, duży wyraźnie gorszą.

| C-bet Buttona | Potrzebne equity | MDF |
|---|---|---|
| 1/4 puli | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 puli | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 puli | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 puli | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Cała pula | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

MDF pokazuje kierunek: im większy bet, tym mniej rąk bronisz. Na flopie bronisz mniej niż MDF, bo blefy Buttona mają jeszcze equity.

## Bez pozycji realizujesz mniej

Equity to szansa przy grze do końca bez dalszych zakładów. Bez pozycji mówisz pierwszy na każdej ulicy, więc często spasujesz, zanim zobaczysz showdown. Słabe ręce bez dobierania realizują mniej, niż wynika z equity. Ręce w kolorze, łączniki i pary realizują więcej, bo trafiają mocne układy albo już wygrywają.

## Czym sprawdzasz

Wobec małego c-betu (ok. 1/3 puli):

- każdą parą, także środkową i najniższą,
- dobieraniami do koloru i strita, także gutshotem z wysoką kartą,
- wysokimi kartami z dodatkowym dobieraniem (backdoor), np. trzema kartami w jednym kolorze.

## Czym pasujesz

- rękami bez pary i bez dobierania, zwłaszcza na flopach z asem albo królem, gdzie Button ma przewagę zakresu,
- dwiema wysokimi kartami bez dobierania, gdy c-bet jest duży.

Gdy c-bet rośnie, kolejne najsłabsze ręce przechodzą ze sprawdzenia do pasa.
