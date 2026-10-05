---
id: m8.l3
module: m8
order: 3
title: "Blokery"
sub: "Którą ręką blefować"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "Co to jest {{t:blocker}}?"
    options:
      - { text: "Karta w twojej ręce, przez którą rywal ma mniej {{t:combo|kombinacji}} jakiejś ręki", correct: true, why: "Karty, którą trzymasz, rywal nie może mieć. Gdy masz asa, rywal ma mniej asów: mniej {{t:pair|par}} asów, mniej AK, mniej kolorów z asem." }
      - { text: "Karta na {{t:board|stole}}, która psuje {{t:draw}}", why: "Tak czasem mówi się potocznie o kartach na {{t:board|stole}}, ale {{t:blocker}} w tym znaczeniu to karta w twojej ręce. Karty na {{t:board|stole}} widzą obaj gracze." }
      - { text: "Mały bet, który ma zatrzymać duży bet rywala", why: "To tzw. blocking bet, inna rzecz. {{t:blocker|Bloker}} to karta w ręce, która zmniejsza liczbę {{t:combo|kombinacji}} rywala." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Bez żadnej wiedzy AK ma {{n:combos.unpaired}} {{t:combo|kombinacji}}. Trzymasz króla (bez asa). Ile {{t:combo|kombinacji}} AK może mieć rywal? Wpisz liczbę."
    answer: combos.unpaired.one-blocked
    explanation: "Asów jest {{n:cards.suits}}, a królów zostało {{n:pair.outs.per-rank}}, bo jeden jest u ciebie: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Jedna karta usuwa całą ćwiartkę {{t:combo|kombinacji}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "{{t:pair|Para}} asów ma {{n:combos.pair}} {{t:combo|kombinacji}}. Trzymasz jednego asa. Ile {{t:combo|kombinacji}} {{t:pair|pary}} asów może mieć rywal? Wpisz liczbę."
    answer: combos.pair.one-blocked
    explanation: "Zostały {{n:pair.outs.per-rank}} asy, a z trzech kart można ułożyć tylko {{n:combos.pair.one-blocked}} {{t:pair|pary}}. Jeden as w twojej ręce usuwa połowę {{t:combo|kombinacji}} AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Trzymasz [[Ah Kc]]. Ile {{t:combo|kombinacji}} AK może mieć rywal?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Zostały {{n:pair.outs.per-rank}} asy i {{n:pair.outs.per-rank}} króle: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Tyle byłoby, gdybyś trzymał tylko asa albo tylko króla. Blokujesz obie rangi." }
      - { text: "{{n:combos.unpaired}}", why: "Tyle {{t:combo|kombinacji}} AK jest w talii, zanim zobaczysz swoje karty. Twój as i twój król nie mogą być u rywala." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "Na riverze weszła trzecia karta kier i {{t:flush}} jest możliwy. {{t:big-blind|Duży blind}} {{t:check|czeka}}. Masz w ręce samego asa i chcesz zablefować. Którą ręką {{t:bluff}} jest lepszy?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "As kier blokuje najsilniejsze kolory rywala: nie może mieć {{t:flush|koloru}} z asem, a to ręka, która zawsze zapłaci. Rywal ma mniej rąk do {{t:call|sprawdzenia}}, więc {{t:bluff}} częściej zadziała." }
      - { text: "[[Ad 3c]]", why: "Taka sama siła przy showdownie, ale nie blokujesz żadnego {{t:flush|koloru}}. Rywal ma wszystkie swoje kolory, którymi zapłaci." }
      - { text: "Bez różnicy, obie to sam as", why: "Przy showdownie tak, ale jako {{t:bluff}} nie. As kier zmniejsza liczbę kolorów rywala, które na pewno zapłacą." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "{{t:flush-draw|Dobieranie do koloru}} w pikach nie weszło. {{t:big-blind|Duży blind}} czeka na riverze. Obie ręce mają tylko damę z ósemką. Którą lepiej zablefować?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Bez pików nie blokujesz nietrafionych {{t:draw|dobierań}} rywala, a to ręce, które na twój bet {{t:fold|spasują}}. Pozostałe karty obu rąk są takie same." }
      - { text: "[[Qd 8s]]", why: "Ósemka pik blokuje część nietrafionych {{t:flush-draw|dobierań do koloru}} (np. [[8s 7s]]), którymi rywal by {{t:fold|spasował}}. Zostaje mu relatywnie więcej rąk, którymi zapłaci." }
      - { text: "Bez różnicy", why: "Różnica jest w kolorze ósemki. Pik w twojej ręce zabiera rywalowi część rąk do spasowania." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Ta sama sytuacja: piki nie weszły, {{t:big-blind}} {{t:check|czeka}}. Masz jedną z dwóch rąk. Którą {{t:bluff|blefujesz}}, a którą {{t:check|czekasz}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Blefuję}} [[Qc Jd]], {{t:check|czekam}} z [[9c 8c]]", correct: true, why: "{{t:pair|Para}} dziewiątek wygrywa z nietrafionymi {{t:draw|dobieraniami}} po {{t:check|czekaniu}}. Dama z waletem przegrywa prawie z każdą ręką, więc tylko {{t:bluff|blefem}} może wygrać {{t:pot|pulę}}." }
      - { text: "{{t:bluff|Blefuję}} [[9c 8c]], {{t:check|czekam}} z [[Qc Jd]]", why: "Odwrotnie. {{t:bluff|Blef}} {{t:pair|parą}} dziewiątek oddaje wygraną przy showdownie, a {{t:check}} z damą z waletem oddaje {{t:pot|pulę}} bez walki." }
      - { text: "{{t:bluff|Blefuję}} obiema", why: "{{t:pair|Para}} dziewiątek nie potrzebuje {{t:bluff|blefu}}: wygrywa z wieloma rękami po {{t:check|czekaniu}}. {{t:bluff|Blefujesz}} rękami bez wartości przy showdownie." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Wybierasz {{t:bluff}} na riverze spośród rąk bez wartości przy showdownie. Która karta w ręce pomaga najbardziej?"
    options:
      - { text: "Karta z rąk, którymi rywal zapłaci", correct: true, why: "Blokujesz jego wartość: ma mniej silnych rąk, więc częściej zostaje mu ręka do spasowania." }
      - { text: "Karta w kolorze nietrafionego {{t:draw|dobierania}}", why: "Ona blokuje ręce, którymi rywal {{t:fold|spasuje}}. {{t:bluff|Blef}} działa wtedy rzadziej." }
      - { text: "Najwyższa karta, niezależnie od stołu", why: "Wysoka karta daje trochę siły przy showdownie, ale nie mówi nic o tym, co blokujesz. Patrz, które ręce rywala zapłacą." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "Na riverze weszła trzecia karta kier. {{t:big-blind|Duży blind}} {{t:check|czeka}}. Masz {{t:pair|parę}} dziewiątek i asa kier. Co robisz?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "{{t:pair|Para}} dziewiątek wygrywa po {{t:check|czekaniu}} z wieloma rękami rywala bez {{t:pair|pary}}. {{t:blocker|Bloker}} nie zamienia ręki z wartością przy showdownie w dobry {{t:bluff}}: najpierw wybierasz ręce bez szans, dopiero potem patrzysz na {{t:blocker|blokery}}." }
      - { text: "Betuję jako {{t:bluff}}, bo mam asa kier", why: "As kier to dobry {{t:blocker}}, ale z {{t:pair|parą}} dziewiątek tracisz, {{t:bluff|blefując}}: gorsze ręce i tak by {{t:fold|spasowały}}, a kolory i króle zapłacą." }
      - { text: "Betuję {{t:value|dla wartości}}", why: "Kto zapłaci gorszą ręką? Na {{t:board|stole}} z możliwym kolorem ręce słabsze od {{t:pair|pary}} dziewiątek prawie zawsze {{t:fold|spasują}}." }
---
W poprzedniej lekcji ustaliłeś, ile {{t:bluff|blefów}} potrzebujesz i że {{t:bluff|blefujesz}} rękami bez szans przy showdownie. Często takich rąk jest więcej, niż potrzeba. Wtedy wybór rozstrzygają **{{t:blocker|blokery}}**.

## {{t:blocker|Bloker}}

Karty, którą trzymasz, rywal nie może mieć. Dlatego ma mniej {{t:combo|kombinacji}} rąk z tą kartą:

| Ręka rywala | Bez {{t:blocker|blokera}} | Trzymasz jedną kartę tej rangi |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Gdy trzymasz i asa, i króla, rywal ma tylko {{n:combos.unpaired.both-blocked}} {{t:combo|kombinacji}} AK.

## Blokuj ręce, którymi rywal zapłaci

Dobry {{t:bluff}} ma kartę z rąk, którymi rywal **{{t:call|sprawdzi}}**. Przykład: na riverze weszła trzecia karta kier. As kier w twojej ręce oznacza, że rywal nie ma {{t:flush|koloru}} z asem, czyli ręki, która zawsze płaci. Zostaje mu więcej rąk do spasowania.

## Nie blokuj rąk, którymi rywal {{t:fold|spasuje}}

Gdy {{t:flush-draw}} **nie weszło**, rywal {{t:fold|spasuje}} swoje nietrafione {{t:draw|dobierania}}. Jeśli masz kartę w tym kolorze, ma ich mniej, więc twój {{t:bluff}} częściej trafi na rękę, która zapłaci. Z dwóch podobnych {{t:bluff|blefów}} wybierasz ten bez kart w kolorze nietrafionego {{t:draw|dobierania}}.

## Najpierw siła przy showdownie

Kolejność jest stała: najpierw odkładasz ręce, które mogą wygrać po {{t:check|czekaniu}}, a dopiero z reszty wybierasz {{t:bluff|blefy}} z najlepszymi {{t:blocker|blokerami}}. Dobry {{t:blocker}} nie zrobi {{t:bluff|blefu}} z {{t:pair|pary}}, która wygrałaby showdown. {{t:blocker|Blokery}} przechylają wybór między podobnymi rękami; sam efekt jest niewielki.

:::note Skąd te zasady
Liczby {{t:combo|kombinacji}} to kombinatoryka. Zasady wyboru {{t:bluff|blefów}} według {{t:blocker|blokerów}} pochodzą z programu nauczania oraz z GTO Wizard i Upswing. Gdy brakuje innych {{t:bluff|blefów}}, solver {{t:bluff|blefuje}} też nietrafionymi kolorami.
:::
