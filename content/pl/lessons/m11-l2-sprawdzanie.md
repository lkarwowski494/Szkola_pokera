---
id: m11.l2
module: m11
order: 2
title: "Sprawdzanie all-inu"
sub: "Ile equity potrzebujesz i dlaczego sprawdzasz węziej"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Masz {{n:m11.depth.10}} na {{t:big-blind|dużym blindzie}}, bez ante. {{t:small-blind|Mały blind}} wszedł all-in na {{n:m11.depth.10}}. Ile procent equity potrzebujesz, żeby {{t:call}} się opłacało? Wpisz liczbę."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Twój blind już leży w {{t:pot|puli}}, więc dopłacasz {{n:m11.call.10.cost}}. {{t:pot|Pula}} po {{t:call|sprawdzeniu}} ma {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Ten sam spot, ale stacki mają po {{n:m11.depth.5}}. Ile equity potrzebujesz do {{t:call|sprawdzenia}} all-inu?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Dopłacasz {{n:m11.call.5.cost}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Przy krótszym stacku blind stanowi większą część stacku, więc cena jest lepsza." }
      - { text: "{{n:m11.call.10.eq}}", why: "To cena przy {{n:m11.depth.10}}. Przy {{n:m11.depth.5}} twój blind to większa część całego stacku, więc potrzebujesz mniej: {{n:m11.call.5.eq}}." }
      - { text: "Połowę", why: "Połowy potrzebowałbyś, gdybyś dokładał cały stack. Blind już leży w {{t:pot|puli}}, więc dopłacasz tylko {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacki po {{n:m11.depth.15}}, {{t:small-blind}} wszedł all-in. Ile equity potrzebujesz do {{t:call|sprawdzenia}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Dopłacasz {{n:m11.call.15.cost}} do {{t:pot|puli}} {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Im głębszy stack, tym bliżej połowy." }
      - { text: "{{n:m11.call.5.eq}}", why: "To cena przy {{n:m11.depth.5}}. Przy {{n:m11.depth.15}} blind jest mniejszą częścią stacku, więc cena rośnie do {{n:m11.call.15.eq}}." }
      - { text: "Ponad połowę", why: "Nawet przy bardzo głębokim stacku cena nie przekracza połowy: zawsze masz w {{t:pot|puli}} swój blind." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Masz {{n:m11.depth.10}} na {{t:big-blind|dużym blindzie}}, {{t:small-blind}} wszedł all-in. Pomaluj ręce, z którymi {{t:call|sprawdzasz}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Przy {{n:m11.depth.10}} solver z {{t:small-blind|małego blinda}} wchodzi all-in z siódemką i szóstką w jednym kolorze (76s). Ty masz tę rękę na {{t:big-blind|dużym blindzie}} i to {{t:small-blind}} wszedł all-in. Co robisz?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "All-in z 76s opłaca się głównie dzięki {{t:fold|pasom}} rywala. {{t:call|Sprawdzając}}, wygrywasz tylko na showdownie, i to przeciw {{t:range|zakresowi}} all-inu, który ma dużo wysokich kart i {{t:pair|par}}. Solver {{t:fold|pasuje}} tę rękę." }
      - { text: "{{t:call|Sprawdzam}}, bo z {{t:small-blind|małego blinda}} bym z nią wszedł", why: "{{t:call|Sprawdzenie}} to inna sytuacja: nie masz fold equity, a {{t:range}} rywala jest silniejszy niż losowy. Do {{t:call|sprawdzenia}} potrzebujesz silniejszej ręki." }
      - { text: "{{t:call|Sprawdzam}}, bo ręka w kolorze dobrze się rozwija", why: "Po all-inie nie ma dalszej gry, w której ręka może się rozwinąć. Liczy się tylko equity do showdownu." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Duży blind}}, {{t:small-blind}} wszedł all-in. Masz {{t:pair|parę}} dwójek. Przy {{n:m11.depth.10}} solver {{t:call|sprawdza}}. A przy {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Pasuje}}", correct: true, why: "Przy {{n:m11.depth.15}} cena rośnie do {{n:m11.call.15.eq}}, a {{t:range}} all-inu jest węższy (ok. {{n:m11.push.15}} rąk), więc {{t:pair}} dwójek częściej trafia na wyższą {{t:pair|parę}}. {{t:range|Zakres}} {{t:call|sprawdzenia}} spada z ok. {{n:m11.call.10}} do ok. {{n:m11.call.15}} rąk." }
      - { text: "{{t:call|Sprawdza}}, bo {{t:pair}} zawsze jest faworytem", why: "{{t:pair|Para}} dwójek wobec dwóch wyższych kart to mniej więcej rzut monetą, a wobec każdej wyższej {{t:pair|pary}} jest wyraźnym outsiderem. Przy głębszym stacku rywal {{t:shove|wpycha}} mniej słabych rąk, więc {{t:pair|pary}} stanowią większą część jego {{t:range|zakresu}}." }
      - { text: "{{t:call|Sprawdza}}, bo im głębszy stack, tym szerzej", why: "Odwrotnie: im głębszy stack, tym więcej kosztuje {{t:call}} i tym węższy {{t:range}} {{t:call|sprawdzenia}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Przy {{n:m11.depth.10}} {{t:small-blind}} wchodzi all-in z ok. {{n:m11.push.10}} rąk, a {{t:big-blind}} {{t:call|sprawdza}} tylko ok. {{n:m11.call.10}}. Dlaczego?"
    options:
      - { text: "Sprawdzający nie ma fold equity, a gra przeciw {{t:range|zakresowi}} silniejszemu niż losowy", correct: true, why: "All-in wygrywa też wtedy, gdy rywal {{t:fold|spasuje}}. {{t:call|Sprawdzenie}} wygrywa tylko na showdownie i to przeciw rękom, które już przeszły selekcję. Stąd stara zasada: do {{t:call|sprawdzenia}} potrzebujesz lepszej ręki niż do wejścia pierwszy." }
      - { text: "{{t:big-blind|Duży blind}} płaci więcej", why: "Obaj ryzykują ten sam stack, a {{t:big-blind|BB}} ma już w {{t:pot|puli}} swój blind, więc dopłaca nawet mniej." }
      - { text: "Solver się myli", why: "To równowaga gry all-in albo {{t:fold}}: żaden gracz nie zarobi, zmieniając tylko swój {{t:range}}. Różnica wynika z fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Masz {{n:m11.depth.10}} na {{t:big-blind|dużym blindzie}} i wpłaciłeś ante {{n:m11.ante}}. {{t:small-blind|Mały blind}} wszedł all-in. Ile equity potrzebujesz do {{t:call|sprawdzenia}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Dopłacasz tyle samo ({{n:m11.call.10.cost}}), ale w {{t:pot|puli}} jest jeszcze ante: po {{t:call|sprawdzeniu}} {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Dlatego z ante {{t:call|sprawdzasz}} szerzej: ok. {{n:m11.call.10-ante}} rąk zamiast {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "To cena bez ante. Ante zostaje w {{t:pot|puli}}, więc za tę samą dopłatę wygrywasz więcej: {{n:m11.call.10-ante.eq}}." }
      - { text: "Więcej niż bez ante, bo wpłaciłeś więcej", why: "Ante to już wydane pieniądze. Liczy się tylko, ile jeszcze dopłacasz i ile możesz wygrać." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Trzech graczy, stacki po {{n:m11.depth.3max}}. Button wszedł all-in, {{t:small-blind}} {{t:call|sprawdził}}. Na {{t:big-blind|dużym blindzie}} potrzebujesz tylko {{n:m11.3max.bb-two.eq}} equity. {{t:call|Sprawdzasz}} szerzej niż wtedy, gdy all-in wszedł sam Button?"
    table: { position: BB }
    options:
      - { text: "Nie, węziej", correct: true, why: "Cena jest lepsza, ale grasz przeciw dwóm {{t:range|zakresom}}, w tym przeciw sprawdzającemu, który ma silną rękę. Solver {{t:call|sprawdza}} tu ok. {{n:m11.3max.call.bb-two}} rąk, a gdy all-in jest tylko Button, ok. {{n:m11.3max.call.bb}}." }
      - { text: "Tak, bo cena jest dużo lepsza", why: "Lepsza cena nie wystarcza: przeciw dwóm rywalom equity słabszych rąk szybko spada. Solver {{t:call|sprawdza}} tylko ok. {{n:m11.3max.call.bb-two}} rąk." }
      - { text: "Tak samo, bo liczy się tylko twoja ręka", why: "Liczy się equity wobec rąk rywali. Sprawdzający po all-inie Buttona ma {{t:range}} silniejszy niż Button, więc {{t:call|sprawdzasz}} węziej." }
---
Gdy rywal wchodzi all-in, a ty masz {{t:big-blind}}, decyzja jest prosta w formie: {{t:call|sprawdzasz}} albo {{t:fold|pasujesz}}. Po {{t:call|sprawdzeniu}} nie ma już dalszej gry, więc liczy się tylko cena i twoje equity wobec {{t:range|zakresu}} all-inu.

## Cena {{t:call|sprawdzenia}}

Twój blind już leży w {{t:pot|puli}}. Przy stacku {{n:m11.depth.10}} dopłacasz {{n:m11.call.10.cost}}, a {{t:pot}} po {{t:call|sprawdzeniu}} ma {{n:m11.call.10.pot}}.

```formula
potrzebne equity = dopłata ÷ pula po sprawdzeniu
```

| Stack | Dopłata | {{t:pot|Pula}} po {{t:call|sprawdzeniu}} | Potrzebne equity |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Im krótszy stack, tym lepsza cena, bo twój blind jest większą częścią całego stacku.

## {{t:call|Sprawdzasz}} węziej, niż {{t:shove|wpychasz}}

Wchodząc all-in pierwszy, wygrywasz także wtedy, gdy rywal {{t:fold|spasuje}}. {{t:call|Sprawdzając}}, wygrywasz tylko na showdownie, i to przeciw rękom, które rywal wybrał do all-inu. Dlatego do {{t:call|sprawdzenia}} potrzebujesz lepszej ręki niż do wejścia all-in pierwszy (David Sklansky nazwał to „gap concept”).

```range
call.bb-10
```

Przy {{n:m11.depth.10}} {{t:small-blind}} wchodzi all-in z ok. {{n:m11.push.10}} rąk, a {{t:big-blind}} {{t:call|sprawdza}} ok. {{n:m11.call.10}}. Ręce takie jak [[7s 6s]] {{t:shove|wpychasz}} z {{t:small-blind|małego blinda}}, ale {{t:fold|pasujesz}} je wobec all-inu: bez fold equity mają za mało equity przeciw wysokim kartom i {{t:pair|parom}}. Dla porównania PokerStrategy podaje przy {{n:m11.depth.10}} {{t:range}} {{t:call|sprawdzenia}} {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Głębszy stack oznacza droższe {{t:call}} i węższy {{t:range}} all-inu rywala, więc {{t:call|sprawdzasz}} rzadziej: ok. {{n:m11.call.15}} przy {{n:m11.depth.15}}, a przy {{n:m11.depth.5}} aż ok. {{n:m11.call.5}}.

## Gdy za tobą ktoś jeszcze jest

Przy trzech graczach i stackach po {{n:m11.depth.3max}} {{t:small-blind}} {{t:call|sprawdza}} all-in Buttona tylko ok. {{n:m11.3max.call.sb}} rąk, choć potrzebuje {{n:m11.3max.sb.eq}} equity. {{t:big-blind|Duży blind}} w tej samej sytuacji, gdy {{t:small-blind}} {{t:fold|spasował}}, dopłaca {{n:m11.3max.bb.cost}} do {{t:pot|puli}} {{n:m11.3max.bb.pot}}, potrzebuje {{n:m11.3max.bb.eq}} equity i {{t:call|sprawdza}} ok. {{n:m11.3max.call.bb}}. Różnica bierze się z gracza za tobą: {{t:small-blind}} może {{t:call|sprawdzić}} i trafić na jeszcze silniejszą rękę {{t:big-blind|dużego blinda}}.

```range
call.sb-vs-btn-3max
```

Gdy all-in są już dwaj gracze, cena spada do {{n:m11.3max.bb-two.eq}}, a mimo to {{t:big-blind}} {{t:call|sprawdza}} tylko ok. {{n:m11.3max.call.bb-two}} rąk. Przeciw dwóm {{t:range|zakresom}}, z których jeden już {{t:call|sprawdził}} all-in, słabsze ręce szybko tracą equity.

```range
call.bb-vs-two-3max
```

## Z ante {{t:call|sprawdzasz}} szerzej

Ante zostaje w {{t:pot|puli}}, więc za tę samą dopłatę wygrywasz więcej: przy {{n:m11.depth.10}} i ante {{n:m11.ante}} potrzebujesz {{n:m11.call.10-ante.eq}} zamiast {{n:m11.call.10.eq}}. Rywal z ante także {{t:shove|wpycha}} szerzej, więc solver {{t:call|sprawdza}} ok. {{n:m11.call.10-ante}} rąk.

```range
call.bb-10-ante
```

:::note {{t:range|Zakresy}} w tej lekcji
Siatki dotyczą gry dwóch graczy: {{t:small-blind|małego blinda}} przeciw {{t:big-blind|dużemu blindowi}}, gdy wszyscy inni {{t:fold|spasowali}}, i liczą {{t:chips}}, a nie pieniądze. Gdy w {{t:tournament|turnieju}} liczą się {{t:payout|wypłaty}}, {{t:call|sprawdzasz}} jeszcze węziej (następna lekcja).
:::
