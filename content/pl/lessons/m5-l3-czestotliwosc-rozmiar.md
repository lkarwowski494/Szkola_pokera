---
id: m5.l3
module: m5
order: 3
title: "Jak często i jak dużo"
sub: "C-bet z pozycją"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził i na flopie czeka. Jaki plan pasuje do tego flopu?"
    position: BTN
    options:
      check: "Częściej czekam, c-bet rzadziej niż zwykle"
      small: "C-bet często i mało: {{n:cbet.size.small}} puli ({{n:cbet.btn.small}})"
      big: "C-bet często i dużo: {{n:cbet.size.big}} puli ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Za ostrożnie: na suchym, wysokim flopie masz przewagę zakresu, a rywal zwykle chybił. Czekając, dajesz mu darmową kartę."
          small: "Tak: suchy, wysoki flop sprzyja tobie. Mały zakład wystarcza, żeby rywal spasował słabe ręce, a gorsze pary wciąż go sprawdzą."
          big: "Dobra akcja, zły rozmiar: na suchym flopie rywal ma mało dobierań, a ręce, które chybiły, spasują także na mały zakład. Większy zakład nie spasuje więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} puli."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Za ostrożnie: masz przewagę zakresu, a na sparowanym flopie trudno o dobieranie, więc rywal bez pary rzadko może zapłacić nawet mały zakład."
          small: "Tak: na sparowanym flopie betujesz często i mało. Rywal bez pary rzadko ma czym sprawdzić, a trójkę mogą mieć obaj gracze, więc nie ma powodu ryzykować więcej."
          big: "Dobra akcja, zły rozmiar: na sparowanym flopie trójkę może mieć każdy z was, więc duży zakład się nie opłaca, a słabe ręce rywala spasują także na mały. Wystarczy ok. {{n:cbet.size.small}} puli."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Tak: niski flop z kartami blisko siebie sprzyja dużemu blindowi, który częściej ma tu dwie pary albo strita. C-betujesz rzadziej niż na wysokich flopach: wiele rąk czeka, a betują głównie silne ręce i mocne dobierania."
          small: "Za często: na niskim flopie z kartami blisko siebie to duży blind ma przewagę orzechową. Częste c-bety, nawet małe, dają mu okazję do przebicia (check-raise) najsilniejszymi rękami."
          big: "Za często i za drogo: duży blind częściej trafił tu dwie pary albo strita. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził i czeka. Masz parę króli z waletem. Co robisz?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} puli)", correct: true, why: "Tak: najwyższa para na suchym flopie. Mały zakład dostanie sprawdzenie od siódemek, dwójek i słabszych króli, a rywal prawie nie ma dobierań." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} puli)", sizeError: true, why: "Dobra akcja, zły rozmiar: na suchym flopie rywal nie ma dobierań, a ręce, które chybiły, spasują także na mały zakład. Większy zakład nie spasuje więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} puli." }
      - { text: "Czekam", why: "Tracisz wartość: rywal ma wiele słabszych par i rąk z asem, które zapłaciłyby mały zakład. Na suchym flopie z najwyższą parą betujesz." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził i czeka. Masz seta waletów na mokrym flopie. Co robisz?"
    table: { hand: "Jc Js", position: BTN, board: "Jh Th 8c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} puli)", correct: true, why: "Tak: na mokrym flopie rywal ma wiele dobierań do koloru i strita (np. KQ, A9, dwa kiery). Duży zakład każe im drogo płacić za kolejną kartę." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} puli)", sizeError: true, why: "Dobra akcja, zły rozmiar: mały zakład daje dobieraniom rywala tanią kartę, a twój set może przegrać z kolorem albo stritem. Na mokrym flopie betuj dużo." }
      - { text: "Czekam, żeby nie spłoszyć rywala", why: "Na mokrym flopie darmowa karta to prezent dla dobierań. Z bardzo silną ręką budujesz pulę od razu." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził i czeka. Flop jest sparowany. Jaki plan pasuje?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet często i mało", correct: true, why: "Tak: masz przewagę zakresu, a na sparowanym flopie trudno o dobieranie, więc rywal bez pary rzadko może zapłacić nawet mały zakład. Masz też więcej wysokich par, np. AA i KK, których duży blind po samym sprawdzeniu zwykle nie ma." }
      - { text: "C-bet często i dużo", sizeError: true, why: "Dobra akcja, zły rozmiar: trójkę może mieć każdy z was, więc duży zakład się nie opłaca, a rywal bez pary spasuje także na mały. Betuj często i mało." }
      - { text: "Częściej czekam niż betuję", why: "Za ostrożnie: sparowany, wysoki flop sprzyja tobie, a rywal zwykle nie ma tu nic." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził i czeka. Flop jest monotoniczny. Jaki plan pasuje?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet rzadziej niż zwykle i mało", correct: true, why: "Tak: kolor może mieć już każdy z graczy, więc twoja przewaga orzechowa jest mniejsza niż na zwykłym wysokim flopie. Betujesz rzadziej i małym rozmiarem, żeby nie budować dużej puli przeciw kolorowi." }
      - { text: "C-bet często i dużo, żeby dobierania płaciły", why: "Na monotonicznym flopie duża pula jest groźna: rywal może mieć gotowy kolor, a twoje ręce bez kiera słabo się bronią." }
      - { text: "Zawsze czekam", why: "Za ostrożnie: wysoki flop nadal ci sprzyja, a część rąk (np. z wysokim kierem) chętnie betuje mało." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "W puli jest {{n:ex.pot}}. Betujesz {{n:cbet.ex.small}} bez żadnej ręki. W ilu procentach przypadków rywal musi spasować, żeby ten zakład wychodził na zero? Wpisz liczbę."
    answer: alpha.cbet.small
    explanation: "Ryzykujesz {{n:cbet.ex.small}}, żeby wygrać {{n:ex.pot}}. Próg to bet ÷ (pula + bet): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Rywal chybia flop dużo częściej, dlatego mały c-bet tak często się opłaca."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "W puli jest {{n:ex.pot}}. Betujesz {{n:cbet.ex.big}} bez żadnej ręki. W ilu procentach przypadków rywal musi spasować, żeby ten zakład wychodził na zero? Wpisz liczbę."
    answer: alpha.cbet.big
    explanation: "Ryzykujesz {{n:cbet.ex.big}}, żeby wygrać {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Duży blef musi działać dużo częściej niż mały ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Dlaczego na suchym flopie c-bet {{n:cbet.size.small}} puli z ręką bez szans opłaca się częściej niż c-bet {{n:cbet.size.big}} puli?"
    options:
      - { text: "Bo mały zakład potrzebuje pasa tylko w {{n:alpha.cbet.small}} przypadków, a duży w {{n:alpha.cbet.big}}", correct: true, why: "Tak: na suchym flopie najsłabsze ręce rywala (bez pary i bez dobierania) pasują na oba rozmiary, więc mały zakład osiąga ten sam efekt taniej." }
      - { text: "Bo mały zakład zawsze dostaje pas", why: "Nie: rywal sprawdza mały zakład każdą parą. Mały zakład po prostu ryzykuje mniej, więc potrzebuje mniej pasów." }
      - { text: "Bo duży zakład jest zawsze błędem", why: "Nie: na mokrym flopie i z przewagą orzechową duży zakład bywa najlepszy. Na suchym flopie nie daje jednak nic w zamian za większe ryzyko." }
---
C-bet (zakład kontynuacyjny) to zakład na flopie gracza, który ostatni przebijał przed flopem. W tej lekcji grasz z pozycją: otworzyłeś z Buttona, duży blind sprawdził i na flopie czeka. Pula na flopie to {{n:bb.pot-after.vs-btn}}. Pytania są dwa: jak często betować i jak dużo.

## Suchy i wysoki flop: często i mało

Na flopie takim jak [[Ks 7d 2c]] masz przewagę zakresu, a rywal prawie nie ma dobierań. Betujesz często i mało, ok. {{n:cbet.size.small}} puli, czyli ok. {{n:cbet.btn.small}}. Mały zakład wystarczy, żeby rywal spasował ręce, które chybiły, a gorsze pary wciąż go sprawdzą. Większy zakład nie spasuje więcej rąk, a ryzykuje więcej.

Typowy mały c-bet to ok. {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} puli, a duży ok. {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (Upswing); solvery używają zwykle {{n:cbet.size.small}} oraz {{n:cbet.solver.big.low}}–{{n:cbet.size.big}} (GTO Wizard).

## Mokry flop: rzadziej, ale więcej

Na flopie takim jak [[Jh Th 8c]] rywal ma wiele dobierań do koloru i strita. Silne ręce i mocne dobierania betują większym rozmiarem, np. {{n:cbet.size.big}} puli, żeby dobierania płaciły drogo za kolejną kartę. Ręce średnie bez dobierania częściej czekają.

## Sparowany i monotoniczny

Na sparowanym flopie, np. [[Qd Qs 6h]], masz przewagę zakresu, a trudno o dobieranie, więc rywal bez pary rzadko może sprawdzić. Betujesz często i mało: duży zakład się nie opłaca, bo trójkę może mieć każdy z was. Na monotonicznym flopie, np. [[Kh 8h 3h]], kolor może mieć już każdy, więc betujesz rzadziej niż zwykle i mało.

Uwaga: „mokry” nie znaczy „duży bet”. Monotoniczny flop jest w aplikacji zawsze mokry, a mimo to solver betuje na nim rzadko i małym rozmiarem (GTO Wizard). Rozmiar rośnie z mokrością tylko do pewnego poziomu: na najbardziej mokrych flopach, takich jak [[Qd 8d 7d]], znowu spada. Większy rozmiar z poprzedniej sekcji dotyczy mokrych flopów, które nie są monotoniczne.

## Niski z kartami blisko siebie: częściej czekasz

Na [[7s 6h 5d]] to duży blind częściej ma dwie pary albo strita (lekcja o przewagach). Podobnie na innych niskich flopach połączonych i półpołączonych. C-betujesz rzadziej niż na wysokich flopach: wiele rąk czeka, a betują głównie bardzo silne ręce i mocne dobierania.

## Ile musi spasować rywal

Zakład (bet) bez żadnej ręki wychodzi na zero, gdy rywal pasuje w bet ÷ (pula + bet) przypadków. Przy {{n:cbet.size.small}} puli to {{n:alpha.cbet.small}}, przy {{n:cbet.size.big}} puli już {{n:alpha.cbet.big}}. Ręka bez pary chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, dlatego mały c-bet tak często się opłaca.

:::note Skąd te zasady
Kierunki (suchy flop: mało i często, mokry: więcej i rzadziej, sparowany: mało, monotoniczny: rzadziej i mało) to ogólne zasady z literatury (Upswing, PokerCoaching, GTO Wizard, GTO Gecko), oznaczone jako heurystyki. Rozmiary {{n:cbet.size.small}} i {{n:cbet.size.big}} puli to przykłady z przedziałów podanych wyżej (Upswing, Bet Sizing Strategy: 8 Rules; GTO Wizard). Aplikacja nie podaje, jak często betować w procentach, bo takie liczby pochodzą z wyników solverów.
:::
