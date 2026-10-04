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
    prompt: "Co to jest bloker?"
    options:
      - { text: "Karta w twojej ręce, przez którą rywal ma mniej kombinacji jakiejś ręki", correct: true, why: "Karty, którą trzymasz, rywal nie może mieć. Gdy masz asa, rywal ma mniej asów: mniej par asów, mniej AK, mniej kolorów z asem." }
      - { text: "Karta na stole, która psuje dobieranie", why: "Tak czasem mówi się potocznie o kartach na stole, ale bloker w tym znaczeniu to karta w twojej ręce. Karty na stole widzą obaj gracze." }
      - { text: "Mały bet, który ma zatrzymać duży bet rywala", why: "To tzw. blocking bet, inna rzecz. Bloker to karta w ręce, która zmniejsza liczbę kombinacji rywala." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Bez żadnej wiedzy AK ma {{n:combos.unpaired}} kombinacji. Trzymasz króla (bez asa). Ile kombinacji AK może mieć rywal? Wpisz liczbę."
    answer: combos.unpaired.one-blocked
    explanation: "Asów jest {{n:cards.suits}}, a królów zostało {{n:pair.outs.per-rank}}, bo jeden jest u ciebie: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Jedna karta usuwa całą ćwiartkę kombinacji."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Para asów ma {{n:combos.pair}} kombinacji. Trzymasz jednego asa. Ile kombinacji pary asów może mieć rywal? Wpisz liczbę."
    answer: combos.pair.one-blocked
    explanation: "Zostały {{n:pair.outs.per-rank}} asy, a z trzech kart można ułożyć tylko {{n:combos.pair.one-blocked}} pary. Jeden as w twojej ręce usuwa połowę kombinacji AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Trzymasz [[Ah Kc]]. Ile kombinacji AK może mieć rywal?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Zostały {{n:pair.outs.per-rank}} asy i {{n:pair.outs.per-rank}} króle: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Tyle byłoby, gdybyś trzymał tylko asa albo tylko króla. Blokujesz obie rangi." }
      - { text: "{{n:combos.unpaired}}", why: "Tyle kombinacji AK jest w talii, zanim zobaczysz swoje karty. Twój as i twój król nie mogą być u rywala." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "Na riverze weszła trzecia karta kier i kolor jest możliwy. Duży blind czeka. Masz w ręce samego asa i chcesz zablefować. Którą ręką blef jest lepszy?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "As kier blokuje najsilniejsze kolory rywala: nie może mieć koloru z asem, a to ręka, która zawsze zapłaci. Rywal ma mniej rąk do sprawdzenia, więc blef częściej zadziała." }
      - { text: "[[Ad 3c]]", why: "Taka sama siła przy showdownie, ale nie blokujesz żadnego koloru. Rywal ma wszystkie swoje kolory, którymi zapłaci." }
      - { text: "Bez różnicy, obie to sam as", why: "Przy showdownie tak, ale jako blef nie. As kier zmniejsza liczbę kolorów rywala, które na pewno zapłacą." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "Dobieranie do koloru w pikach nie weszło. Duży blind czeka na riverze. Obie ręce mają tylko damę z ósemką. Którą lepiej zablefować?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Bez pików nie blokujesz nietrafionych dobierań rywala, a to ręce, które na twój bet spasują. Pozostałe karty obu rąk są takie same." }
      - { text: "[[Qd 8s]]", why: "Ósemka pik blokuje część nietrafionych dobierań do koloru (np. [[8s 7s]]), którymi rywal by spasował. Zostaje mu relatywnie więcej rąk, którymi zapłaci." }
      - { text: "Bez różnicy", why: "Różnica jest w kolorze ósemki. Pik w twojej ręce zabiera rywalowi część rąk do spasowania." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Ta sama sytuacja: piki nie weszły, duży blind czeka. Masz jedną z dwóch rąk. Którą blefujesz, a którą czekasz?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Blefuję [[Qc Jd]], czekam z [[9c 8c]]", correct: true, why: "Para dziewiątek wygrywa z nietrafionymi dobieraniami po czekaniu. Dama z waletem przegrywa prawie z każdą ręką, więc tylko blefem może wygrać pulę." }
      - { text: "Blefuję [[9c 8c]], czekam z [[Qc Jd]]", why: "Odwrotnie. Blef parą dziewiątek oddaje wygraną przy showdownie, a czekanie z damą z waletem oddaje pulę bez walki." }
      - { text: "Blefuję obiema", why: "Para dziewiątek nie potrzebuje blefu: wygrywa z wieloma rękami po czekaniu. Blefujesz rękami bez wartości przy showdownie." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Wybierasz blef na riverze spośród rąk bez wartości przy showdownie. Która karta w ręce pomaga najbardziej?"
    options:
      - { text: "Karta z rąk, którymi rywal zapłaci", correct: true, why: "Blokujesz jego wartość: ma mniej silnych rąk, więc częściej zostaje mu ręka do spasowania." }
      - { text: "Karta w kolorze nietrafionego dobierania", why: "Ona blokuje ręce, którymi rywal spasuje. Blef działa wtedy rzadziej." }
      - { text: "Najwyższa karta, niezależnie od stołu", why: "Wysoka karta daje trochę siły przy showdownie, ale nie mówi nic o tym, co blokujesz. Patrz, które ręce rywala zapłacą." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "Na riverze weszła trzecia karta kier. Duży blind czeka. Masz parę dziewiątek i asa kier. Co robisz?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "Czekam", correct: true, why: "Para dziewiątek wygrywa po czekaniu z wieloma rękami rywala bez pary. Bloker nie zamienia ręki z wartością przy showdownie w dobry blef: najpierw wybierasz ręce bez szans, dopiero potem patrzysz na blokery." }
      - { text: "Betuję jako blef, bo mam asa kier", why: "As kier to dobry bloker, ale z parą dziewiątek tracisz, blefując: gorsze ręce i tak by spasowały, a kolory i króle zapłacą." }
      - { text: "Betuję dla wartości", why: "Kto zapłaci gorszą ręką? Na stole z możliwym kolorem ręce słabsze od pary dziewiątek prawie zawsze spasują." }
---
W poprzedniej lekcji ustaliłeś, ile blefów potrzebujesz i że blefujesz rękami bez szans przy showdownie. Często takich rąk jest więcej, niż potrzeba. Wtedy wybór rozstrzygają **blokery**.

## Bloker

Karty, którą trzymasz, rywal nie może mieć. Dlatego ma mniej kombinacji rąk z tą kartą:

| Ręka rywala | Bez blokera | Trzymasz jedną kartę tej rangi |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Gdy trzymasz i asa, i króla, rywal ma tylko {{n:combos.unpaired.both-blocked}} kombinacji AK.

## Blokuj ręce, którymi rywal zapłaci

Dobry blef ma kartę z rąk, którymi rywal **sprawdzi**. Przykład: na riverze weszła trzecia karta kier. As kier w twojej ręce oznacza, że rywal nie ma koloru z asem, czyli ręki, która zawsze płaci. Zostaje mu więcej rąk do spasowania.

## Nie blokuj rąk, którymi rywal spasuje

Gdy dobieranie do koloru **nie weszło**, rywal spasuje swoje nietrafione dobierania. Jeśli masz kartę w tym kolorze, ma ich mniej, więc twój blef częściej trafi na rękę, która zapłaci. Z dwóch podobnych blefów wybierasz ten bez kart w kolorze nietrafionego dobierania.

## Najpierw siła przy showdownie

Kolejność jest stała: najpierw odkładasz ręce, które mogą wygrać po czekaniu, a dopiero z reszty wybierasz blefy z najlepszymi blokerami. Dobry bloker nie zrobi blefu z pary, która wygrałaby showdown. Blokery przechylają wybór między podobnymi rękami; sam efekt jest niewielki.

:::note Skąd te zasady
Liczby kombinacji to kombinatoryka. Zasady wyboru blefów według blokerów pochodzą z programu nauczania oraz z GTO Wizard i Upswing. Gdy brakuje innych blefów, solver blefuje też nietrafionymi kolorami.
:::
