---
id: m11.l2
module: m11
order: 2
title: "Sprawdzanie all-inu"
sub: "Ile equity potrzebujesz i dlaczego sprawdzasz węziej"
rules: [R-M11-006, R-M11-007]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Masz {{n:m11.depth.10}} na dużym blindzie, bez ante. Mały blind wszedł all-in na {{n:m11.depth.10}}. Ile procent equity potrzebujesz, żeby sprawdzenie się opłacało? Wpisz liczbę."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Twój blind już leży w puli, więc dopłacasz {{n:m11.call.10.cost}}. Pula po sprawdzeniu ma {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Ten sam spot, ale stacki mają po {{n:m11.depth.5}}. Ile equity potrzebujesz do sprawdzenia all-inu?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Dopłacasz {{n:m11.call.5.cost}} do puli, która po sprawdzeniu ma {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Przy krótszym stacku blind stanowi większą część stawki, więc cena jest lepsza." }
      - { text: "{{n:m11.call.10.eq}}", why: "To cena przy {{n:m11.depth.10}}. Przy {{n:m11.depth.5}} twój blind to większa część całej stawki, więc potrzebujesz mniej: {{n:m11.call.5.eq}}." }
      - { text: "Połowę", why: "Połowy potrzebowałbyś, gdybyś dokładał cały stack. Blind już leży w puli, więc dopłacasz tylko {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacki po {{n:m11.depth.15}}, mały blind wszedł all-in. Ile equity potrzebujesz do sprawdzenia?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Dopłacasz {{n:m11.call.15.cost}} do puli {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Im głębszy stack, tym bliżej połowy." }
      - { text: "{{n:m11.call.5.eq}}", why: "To cena przy {{n:m11.depth.5}}. Przy {{n:m11.depth.15}} blind jest mniejszą częścią stawki, więc cena rośnie do {{n:m11.call.15.eq}}." }
      - { text: "Ponad połowę", why: "Nawet przy bardzo głębokim stacku cena nie przekracza połowy: zawsze masz w puli swój blind." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 5
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Masz {{n:m11.depth.10}} na dużym blindzie, mały blind wszedł all-in. Pomaluj ręce, z którymi sprawdzasz."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Przy {{n:m11.depth.10}} solver z małego blinda wchodzi all-in z siódemką i szóstką w jednym kolorze (76s). Ty masz tę rękę na dużym blindzie i to mały blind wszedł all-in. Co robisz?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "All-in z 76s opłaca się głównie dzięki pasom rywala. Sprawdzając, wygrywasz tylko na showdownie, i to przeciw zakresowi all-inu, który ma dużo wysokich kart i par. Solver pasuje tę rękę." }
      - { text: "Sprawdzam, bo z małego blinda bym z nią wszedł", why: "Sprawdzenie to inna sytuacja: nie masz fold equity, a zakres rywala jest silniejszy niż losowy. Do sprawdzenia potrzebujesz silniejszej ręki." }
      - { text: "Sprawdzam, bo ręka w kolorze dobrze się rozwija", why: "Po all-inie nie ma dalszej gry, w której ręka może się rozwinąć. Liczy się tylko equity do showdownu." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "Duży blind, mały blind wszedł all-in. Masz parę dwójek. Przy {{n:m11.depth.10}} solver sprawdza. A przy {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "Pasuje", correct: true, why: "Przy {{n:m11.depth.15}} cena rośnie do {{n:m11.call.15.eq}}, a zakres all-inu jest węższy (ok. {{n:m11.push.15}} rąk), więc para dwójek częściej trafia na wyższą parę. Zakres sprawdzenia spada z ok. {{n:m11.call.10}} do ok. {{n:m11.call.15}} rąk." }
      - { text: "Sprawdza, bo para zawsze jest faworytem", why: "Para dwójek wobec dwóch wyższych kart to mniej więcej rzut monetą, a wobec każdej wyższej pary jest wyraźnym outsiderem. Przy głębszym stacku rywal wpycha mniej słabych rąk, więc pary stanowią większą część jego zakresu." }
      - { text: "Sprawdza, bo im głębszy stack, tym szerzej", why: "Odwrotnie: im głębszy stack, tym więcej kosztuje sprawdzenie i tym węższy zakres sprawdzenia." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Przy {{n:m11.depth.10}} mały blind wchodzi all-in z ok. {{n:m11.push.10}} rąk, a duży blind sprawdza tylko ok. {{n:m11.call.10}}. Dlaczego?"
    options:
      - { text: "Sprawdzający nie ma fold equity, a gra przeciw zakresowi silniejszemu niż losowy", correct: true, why: "All-in wygrywa też wtedy, gdy rywal spasuje. Sprawdzenie wygrywa tylko na showdownie i to przeciw rękom, które już przeszły selekcję. Stąd stara zasada: do sprawdzenia potrzebujesz lepszej ręki niż do wejścia pierwszy." }
      - { text: "Duży blind płaci więcej", why: "Obaj ryzykują ten sam stack, a BB ma już w puli swój blind, więc dopłaca nawet mniej." }
      - { text: "Solver się myli", why: "To równowaga gry all-in albo pas: żaden gracz nie zarobi, zmieniając tylko swój zakres. Różnica wynika z fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Masz {{n:m11.depth.10}} na dużym blindzie i wpłaciłeś ante {{n:m11.ante}}. Mały blind wszedł all-in. Ile equity potrzebujesz do sprawdzenia?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Dopłacasz tyle samo ({{n:m11.call.10.cost}}), ale w puli jest jeszcze ante: po sprawdzeniu {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Dlatego z ante sprawdzasz szerzej: ok. {{n:m11.call.10-ante}} rąk zamiast {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "To cena bez ante. Ante zostaje w puli, więc za tę samą dopłatę wygrywasz więcej: {{n:m11.call.10-ante.eq}}." }
      - { text: "Więcej niż bez ante, bo wpłaciłeś więcej", why: "Ante to już wydane pieniądze. Liczy się tylko, ile jeszcze dopłacasz i ile możesz wygrać." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 2
---
Gdy rywal wchodzi all-in, a ty masz duży blind, decyzja jest prosta w formie: sprawdzasz albo pasujesz. Po sprawdzeniu nie ma już dalszej gry, więc liczy się tylko cena i twoje equity wobec zakresu all-inu.

## Cena sprawdzenia

Twój blind już leży w puli. Przy stacku {{n:m11.depth.10}} dopłacasz {{n:m11.call.10.cost}}, a pula po sprawdzeniu ma {{n:m11.call.10.pot}}.

```formula
potrzebne equity = dopłata ÷ pula po sprawdzeniu
```

| Stack | Dopłata | Pula po sprawdzeniu | Potrzebne equity |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Im krótszy stack, tym lepsza cena, bo twój blind jest większą częścią całej stawki.

## Sprawdzasz węziej, niż wpychasz

Wchodząc all-in pierwszy, wygrywasz także wtedy, gdy rywal spasuje. Sprawdzając, wygrywasz tylko na showdownie, i to przeciw rękom, które rywal wybrał do all-inu. Dlatego do sprawdzenia potrzebujesz lepszej ręki niż do wejścia all-in pierwszy (David Sklansky nazwał to „gap concept”).

```range
call.bb-10
```

Przy {{n:m11.depth.10}} mały blind wchodzi all-in z ok. {{n:m11.push.10}} rąk, a duży blind sprawdza ok. {{n:m11.call.10}}. Ręce takie jak [[7s 6s]] wpychasz z małego blinda, ale pasujesz je wobec all-inu: bez fold equity mają za mało equity przeciw wysokim kartom i parom. Dla porównania PokerStrategy podaje przy {{n:m11.depth.10}} zakres sprawdzenia {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Głębszy stack oznacza droższe sprawdzenie i węższy zakres all-inu rywala, więc sprawdzasz rzadziej: ok. {{n:m11.call.15}} przy {{n:m11.depth.15}}, a przy {{n:m11.depth.5}} aż ok. {{n:m11.call.5}}.

## Z ante sprawdzasz szerzej

Ante zostaje w puli, więc za tę samą dopłatę wygrywasz więcej: przy {{n:m11.depth.10}} i ante {{n:m11.ante}} potrzebujesz {{n:m11.call.10-ante.eq}} zamiast {{n:m11.call.10.eq}}. Rywal z ante także wpycha szerzej, więc solver sprawdza ok. {{n:m11.call.10-ante}} rąk.

```range
call.bb-10-ante
```

:::note Zakresy w tej lekcji
Siatki dotyczą gry dwóch graczy: małego blinda przeciw dużemu blindowi, gdy wszyscy inni spasowali, i liczą żetony, a nie pieniądze. Gdy w turnieju liczą się wypłaty, sprawdzasz jeszcze węziej (następna lekcja).
:::
