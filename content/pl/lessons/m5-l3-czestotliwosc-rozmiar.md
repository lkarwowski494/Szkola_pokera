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
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i na flopie {{t:check|czeka}}. Jaki plan pasuje do tego flopu?"
    position: BTN
    options:
      check: "Częściej {{t:check|czekam}}, c-bet rzadziej niż zwykle"
      small: "C-bet często i mało: {{n:cbet.size.small}} {{t:pot|puli}} ({{n:cbet.btn.small}})"
      big: "C-bet często i dużo: {{n:cbet.size.big}} {{t:pot|puli}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Za ostrożnie: na {{t:dry|suchym}}, wysokim flopie masz {{t:range-advantage|przewagę zakresu}}, a rywal zwykle chybił. {{t:check|Czekając}}, dajesz mu darmową kartę."
          small: "Tak: {{t:dry}}, wysoki flop sprzyja tobie. Mały {{t:bet}} wystarcza, żeby rywal {{t:fold|spasował}} słabe ręce, a gorsze {{t:pair|pary}} wciąż go {{t:call|sprawdzą}}."
          big: "Dobra akcja, zły rozmiar: na {{t:dry|suchym}} flopie rywal ma mało {{t:draw|drawów}}, a ręce, które chybiły, {{t:fold|spasują}} także na mały {{t:bet}}. Większy {{t:bet}} nie {{t:fold|spasuje}} więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} {{t:pot|puli}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Za ostrożnie: masz {{t:range-advantage|przewagę zakresu}}, a na {{t:paired|sparowanym}} flopie trudno o {{t:draw}}, więc rywal bez {{t:pair|pary}} rzadko może zapłacić nawet mały {{t:bet}}."
          small: "Tak: na {{t:paired|sparowanym}} flopie betujesz często i mało. Rywal bez {{t:pair|pary}} rzadko ma czym {{t:call|sprawdzić}}, a {{t:three-of-a-kind|trójkę}} mogą mieć obaj gracze, więc nie ma powodu ryzykować więcej."
          big: "Dobra akcja, zły rozmiar: na {{t:paired|sparowanym}} flopie {{t:three-of-a-kind|trójkę}} może mieć każdy z was, więc duży {{t:bet}} się nie opłaca, a słabe ręce rywala {{t:fold|spasują}} także na mały. Wystarczy ok. {{n:cbet.size.small}} {{t:pot|puli}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Tak: niski flop z kartami blisko siebie sprzyja {{t:big-blind|dużemu blindowi}}, który częściej ma tu {{t:two-pair}} albo {{t:straight|strita}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."
          small: "Za często: na niskim flopie z kartami blisko siebie to {{t:big-blind}} ma {{t:nuts-advantage|przewagę nutsów}}. Częste c-bety, nawet małe, dają mu okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."
          big: "Za często i za drogo: {{t:big-blind}} częściej trafił tu {{t:two-pair}} albo {{t:straight|strita}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i {{t:check|czeka}}. Masz {{t:pair|parę}} króli z waletem. Co robisz?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} {{t:pot|puli}})", correct: true, why: "Tak: {{t:top-pair}} na {{t:dry|suchym}} flopie. Mały {{t:bet}} dostanie {{t:call}} od siódemek, dwójek i słabszych króli, a rywal prawie nie ma {{t:draw|drawów}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} {{t:pot|puli}})", sizeError: true, why: "Dobra akcja, zły rozmiar: na {{t:dry|suchym}} flopie rywal nie ma {{t:draw|drawów}}, a ręce, które chybiły, {{t:fold|spasują}} także na mały {{t:bet}}. Większy {{t:bet}} nie {{t:fold|spasuje}} więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} {{t:pot|puli}}." }
      - { text: "{{t:check|Czekam}}", why: "Tracisz wartość: rywal ma wiele słabszych {{t:pair|par}} i rąk z asem, które zapłaciłyby mały {{t:bet}}. Na {{t:dry|suchym}} flopie z {{t:top-pair|najwyższą parą}} betujesz." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i {{t:check|czeka}}. Masz seta waletów na {{t:wet|mokrym}} flopie. Co robisz?"
    table: { hand: "Jc Js", position: BTN, board: "Jh Th 8c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} {{t:pot|puli}})", correct: true, why: "Tak: na {{t:wet|mokrym}} flopie rywal ma wiele {{t:flush-draw|drawów do koloru}} i {{t:straight|strita}} (np. KQ, A9, dwa kiery). Duży {{t:bet}} każe im drogo płacić za kolejną kartę." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} {{t:pot|puli}})", sizeError: true, why: "Dobra akcja, zły rozmiar: mały {{t:bet}} daje {{t:draw|drawom}} rywala tanią kartę, a twój set może przegrać z kolorem albo {{t:straight|stritem}}. Na {{t:wet|mokrym}} flopie betuj dużo." }
      - { text: "{{t:check|Czekam}}, żeby nie spłoszyć rywala", why: "Na {{t:wet|mokrym}} flopie darmowa karta to prezent dla {{t:draw|drawów}}. Z bardzo silną ręką budujesz {{t:pot|pulę}} od razu." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i {{t:check|czeka}}. Flop jest {{t:paired}}. Jaki plan {{t:fold|pasuje}}?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet często i mało", correct: true, why: "Tak: masz {{t:range-advantage|przewagę zakresu}}, a na {{t:paired|sparowanym}} flopie trudno o {{t:draw}}, więc rywal bez {{t:pair|pary}} rzadko może zapłacić nawet mały {{t:bet}}. Masz też więcej wysokich {{t:pair|par}}, np. AA i KK, których {{t:big-blind}} po samym {{t:call|sprawdzeniu}} zwykle nie ma." }
      - { text: "C-bet często i dużo", sizeError: true, why: "Dobra akcja, zły rozmiar: {{t:three-of-a-kind|trójkę}} może mieć każdy z was, więc duży {{t:bet}} się nie opłaca, a rywal bez {{t:pair|pary}} {{t:fold|spasuje}} także na mały. Betuj często i mało." }
      - { text: "Częściej {{t:check|czekam}} niż betuję", why: "Za ostrożnie: {{t:paired}}, wysoki flop sprzyja tobie, a rywal zwykle nie ma tu nic." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i {{t:check|czeka}}. Flop jest {{t:monotone}}. Jaki plan {{t:fold|pasuje}}?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet rzadziej niż zwykle i mało", correct: true, why: "Tak: {{t:flush}} może mieć już każdy z graczy, więc twoja {{t:nuts-advantage}} jest mniejsza niż na zwykłym wysokim flopie. Betujesz rzadziej i małym rozmiarem, żeby nie budować dużej {{t:pot|puli}} przeciw kolorowi." }
      - { text: "C-bet często i dużo, żeby {{t:draw|drawy}} płaciły", why: "Na {{t:monotone|jednokolorowym}} flopie duża {{t:pot}} jest groźna: rywal może mieć gotowy {{t:flush}}, a twoje ręce bez kiera słabo się bronią." }
      - { text: "Zawsze {{t:check|czekam}}", why: "Za ostrożnie: wysoki flop nadal ci sprzyja, a część rąk (np. z wysokim kierem) chętnie betuje mało." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Betujesz {{n:cbet.ex.small}} bez żadnej ręki. W ilu procentach przypadków rywal musi {{t:fold|spasować}}, żeby ten {{t:bet}} wychodził na zero? Wpisz liczbę."
    answer: alpha.cbet.small
    explanation: "Ryzykujesz {{n:cbet.ex.small}}, żeby wygrać {{n:ex.pot}}. Próg to bet ÷ ({{t:pot}} + bet): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Rywal chybia flop dużo częściej, dlatego mały c-bet tak często się opłaca."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Betujesz {{n:cbet.ex.big}} bez żadnej ręki. W ilu procentach przypadków rywal musi {{t:fold|spasować}}, żeby ten {{t:bet}} wychodził na zero? Wpisz liczbę."
    answer: alpha.cbet.big
    explanation: "Ryzykujesz {{n:cbet.ex.big}}, żeby wygrać {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Duży {{t:bluff}} musi działać dużo częściej niż mały ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Dlaczego na {{t:dry|suchym}} flopie c-bet {{n:cbet.size.small}} {{t:pot|puli}} z ręką bez szans opłaca się częściej niż c-bet {{n:cbet.size.big}} {{t:pot|puli}}?"
    options:
      - { text: "Bo mały {{t:bet}} potrzebuje pasa tylko w {{n:alpha.cbet.small}} przypadków, a duży w {{n:alpha.cbet.big}}", correct: true, why: "Tak: na {{t:dry|suchym}} flopie najsłabsze ręce rywala (bez {{t:pair|pary}} i bez {{t:draw|drawa}}) {{t:fold|pasują}} na oba rozmiary, więc mały {{t:bet}} osiąga ten sam efekt taniej." }
      - { text: "Bo mały {{t:bet}} zawsze dostaje {{t:fold}}", why: "Nie: rywal {{t:call|sprawdza}} mały {{t:bet}} każdą {{t:pair|parą}}. Mały {{t:bet}} po prostu ryzykuje mniej, więc potrzebuje mniej {{t:fold|pasów}}." }
      - { text: "Bo duży {{t:bet}} jest zawsze błędem", why: "Nie: na {{t:wet|mokrym}} flopie i z {{t:nuts-advantage|przewagą nutsów}} duży {{t:bet}} bywa najlepszy. Na {{t:dry|suchym}} flopie nie daje jednak nic w zamian za większe ryzyko." }
---
C-bet ({{t:bet}} kontynuacyjny) to {{t:bet}} na flopie gracza, który ostatni {{t:raise|przebijał}} przed flopem. W tej lekcji grasz {{t:in-position}}: {{t:open|otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i na flopie {{t:check|czeka}}. {{t:pot|Pula}} na flopie to {{n:bb.pot-after.vs-btn}}. Pytania są dwa: jak często betować i jak dużo.

## {{t:dry|Suchy}} i wysoki flop: często i mało

Na flopie takim jak [[Ks 7d 2c]] masz {{t:range-advantage|przewagę zakresu}}, a rywal prawie nie ma {{t:draw|drawów}}. Betujesz często i mało, ok. {{n:cbet.size.small}} {{t:pot|puli}}, czyli ok. {{n:cbet.btn.small}}. Mały {{t:bet}} wystarczy, żeby rywal {{t:fold|spasował}} ręce, które chybiły, a gorsze {{t:pair|pary}} wciąż go {{t:call|sprawdzą}}. Większy {{t:bet}} nie {{t:fold|spasuje}} więcej rąk, a ryzykuje więcej.

Typowy mały c-bet to ok. {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} {{t:pot|puli}}, a duży ok. {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (Upswing); solvery używają zwykle {{n:cbet.size.small}} oraz {{n:cbet.solver.big.low}}–{{n:cbet.size.big}} (GTO Wizard).

## {{t:wet|Mokry}} flop: rzadziej, ale więcej

Na flopie takim jak [[Jh Th 8c]] rywal ma wiele {{t:flush-draw|drawów do koloru}} i {{t:straight|strita}}. Silne ręce i mocne {{t:draw|drawy}} betują większym rozmiarem, np. {{n:cbet.size.big}} {{t:pot|puli}}, żeby {{t:draw|drawy}} płaciły drogo za kolejną kartę. Ręce średnie bez {{t:draw|drawa}} częściej {{t:check|czekają}}.

## {{t:paired|Sparowany}} i {{t:monotone}}

Na {{t:paired|sparowanym}} flopie, np. [[Qd Qs 6h]], masz {{t:range-advantage|przewagę zakresu}}, a trudno o {{t:draw}}, więc rywal bez {{t:pair|pary}} rzadko może {{t:call|sprawdzić}}. Betujesz często i mało: duży {{t:bet}} się nie opłaca, bo {{t:three-of-a-kind|trójkę}} może mieć każdy z was. Na {{t:monotone|jednokolorowym}} flopie, np. [[Kh 8h 3h]], {{t:flush}} może mieć już każdy, więc betujesz rzadziej niż zwykle i mało.

Uwaga: „{{t:wet}}” nie znaczy „duży bet”. {{t:monotone|Jednokolorowy}} flop jest w aplikacji zawsze {{t:wet}}, a mimo to solver betuje na nim rzadko i małym rozmiarem (GTO Wizard). Rozmiar rośnie z {{t:wetness|mokrością}} tylko do pewnego poziomu: na najbardziej {{t:wet|mokrych}} flopach, takich jak [[Qd 8d 7d]], znowu spada. Większy rozmiar z poprzedniej sekcji dotyczy {{t:wet|mokrych}} flopów, które nie są {{t:monotone|jednokolorowe}}.

## Niski z kartami blisko siebie: częściej {{t:check|czekasz}}

Na [[7s 6h 5d]] to {{t:big-blind}} częściej ma {{t:two-pair}} albo {{t:straight|strita}} (lekcja o przewagach). Podobnie na innych niskich flopach {{t:connected|połączonych}} i {{t:semi-connected|półpołączonych}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie bardzo silne ręce i mocne {{t:draw|drawy}}.

## Ile musi {{t:fold|spasować}} rywal

{{t:bet|Zakład}} bez żadnej ręki wychodzi na zero, gdy rywal {{t:fold|pasuje}} w bet ÷ ({{t:pot}} + bet) przypadków. Przy {{n:cbet.size.small}} {{t:pot|puli}} to {{n:alpha.cbet.small}}, przy {{n:cbet.size.big}} {{t:pot|puli}} już {{n:alpha.cbet.big}}. Ręka bez {{t:pair|pary}} chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, dlatego mały c-bet tak często się opłaca.

:::note Skąd te zasady
Kierunki ({{t:dry}} flop: mało i często, {{t:wet}}: więcej i rzadziej, {{t:paired}}: mało, {{t:monotone}}: rzadziej i mało) to ogólne zasady z literatury (Upswing, PokerCoaching, GTO Wizard, GTO Gecko), oznaczone jako heurystyki. Rozmiary {{n:cbet.size.small}} i {{n:cbet.size.big}} {{t:pot|puli}} to przykłady z przedziałów podanych wyżej (Upswing, Bet Sizing Strategy: 8 Rules; GTO Wizard). Aplikacja nie podaje, jak często betować w procentach, bo takie liczby pochodzą z wyników solverów.
:::
