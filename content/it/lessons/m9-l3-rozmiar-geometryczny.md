---
id: m9.l3
module: m9
order: 3
title: "Dimensione geometrica"
sub: "La stessa frazione del piatto fino all'all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}. Punti l'intero {{t:pot|piatto}} ({{n:ex.bet.pot}}) e l'avversario {{t:call|chiama}}. Quanto c'è ora nel {{t:pot|piatto}}? Inserisci un numero."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Una {{t:bet|puntata}} pari al {{t:pot|piatto}} e una {{t:call|chiamata}} moltiplicano il {{t:pot|piatto}} per tre. In generale: una {{t:bet|puntata}} pari a f del {{t:pot|piatto}} e una {{t:call|chiamata}} moltiplicano il {{t:pot|piatto}} per (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}. Al flop, al turn e al river punti l'intero {{t:pot|piatto}} ({{n:ex.bet.pot}}, poi {{n:geo.ex.turn}}, poi {{n:geo.ex.river}}) e l'avversario {{t:call|chiama}} ogni volta. Quanto mette in totale ciascuno di voi? Inserisci un numero."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. Il {{t:pot|piatto}} cresce da {{n:ex.pot}} a {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} e {{n:geo.ex.river-after}}. Tre {{t:bet|puntate}} pari al {{t:pot|piatto}} portano quindi all'all-in con {{t:spr}} {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Con quale {{t:spr}} tre {{t:bet|puntate}} da metà {{t:pot|piatto}} (flop, turn, river, ognuna chiamata) mettono esattamente tutto lo stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Piatto}} {{n:ex.pot}}: {{t:bet|puntate}} di {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}} fanno in totale {{n:geo.half.total}}, cioè uno stack di {{n:geo.half.stack}}. Dalla formula: (1 + 2·{{n:ex.frac.half}}) alla terza = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Con {{t:spr}} {{n:spr.zone.deep}} bisogna puntare l'intero {{t:pot|piatto}} su ogni {{t:street|street}}. {{t:bet|Puntate}} da metà {{t:pot|piatto}} metterebbero allora solo {{n:geo.half.total}} su {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Con {{t:spr}} {{n:spr.commit}} tre {{t:bet|puntate}} da metà {{t:pot|piatto}} sono troppo: lo stack finisce già al river, prima che tu possa {{t:bet|puntare}} un mezzo {{t:pot|piatto}} pieno. Questo piano corrisponde a {{t:spr}} {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Piatto}} con un solo rilancio: al flop ci sono {{n:bb.pot-after.vs-btn}} e ciascuno di voi ha dietro {{n:spr.srp.stack}}. Punti metà {{t:pot|piatto}} al flop, al turn e al river, e l'avversario {{t:call|chiama}} sempre. Quanto metti in totale?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. La maggior parte dello stack resta fuori dal {{t:pot|piatto}}: con {{t:spr}} circa {{n:spr.srp}}, metà {{t:pot|piatto}} è troppo poco per giocarsi tutto lo stack." }
      - { text: "{{n:spr.srp.stack}}, cioè tutto lo stack", why: "Il {{t:pot|piatto}} cresce solo fino a {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} e oltre. Tre {{t:bet|puntate}} da metà {{t:pot|piatto}} mettono in totale {{n:srp.half.total}}, lontano da tutto lo stack." }
      - { text: "{{n:srp.potbet.total}}", why: "Tanto metterebbero tre {{t:bet|puntate}} pari all'intero {{t:pot|piatto}} ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Le {{t:bet|puntate}} da metà {{t:pot|piatto}} danno solo {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Piatto}} con un solo rilancio, {{t:spr}} circa {{n:spr.srp}}. Quale dimensione fissa della {{t:bet|puntata}} al flop, al turn e al river mette tutto lo stack?"
    options:
      - { text: "Circa {{n:geo.srp.3}} del {{t:pot|piatto}}, cioè più dell'intero {{t:pot|piatto}}", correct: true, why: "Sì: perfino tre {{t:bet|puntate}} pari al {{t:pot|piatto}} mettono solo {{n:srp.potbet.total}} su uno stack di {{n:spr.srp.stack}}. Tutto lo stack entra solo con circa {{n:geo.srp.3}} del {{t:pot|piatto}} su ogni {{t:street|street}}." }
      - { text: "Circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}", why: "Questo basta in un {{t:pot|piatto}} 3-bet ({{t:spr}} circa {{n:spr.3bet-ip}}). In un {{t:pot|piatto}} con un solo rilancio lo {{t:spr}} è circa {{n:spr.srp}}, quindi le {{t:bet|puntate}} devono essere più grandi del {{t:pot|piatto}}." }
      - { text: "Circa {{n:cbet.size.small}} del {{t:pot|piatto}}", why: "Tre {{t:bet|puntate}} così mettono solo una piccola parte dello stack. Con {{t:spr}} circa {{n:spr.srp}} serve circa {{n:geo.srp.3}} del {{t:pot|piatto}} su ogni {{t:street|street}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Piatto}} 3-bet, hai la {{t:position|posizione}}, {{t:spr}} circa {{n:spr.3bet-ip}}. Hai una mano molto forte e vuoi mettere tutto lo stack entro il river con {{t:bet|puntate}} uguali. Quanto punti al flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Sì: (1 + 2f) alla terza = 1 + 2·{{n:spr.3bet-ip}} dà f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Puntate}} di {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} fanno in totale {{n:geo.3bet-ip.total}}, cioè tutto lo stack." }
      - { text: "{{n:cbet.size.small}} del {{t:pot|piatto}} ({{n:g3b.third.flop}})", sizeError: true, why: "Azione giusta, dimensione sbagliata: tre {{t:bet|puntate}} da 1/3 di {{t:pot|piatto}} mettono solo circa {{n:g3b.third.total}} su {{n:spr.3bet-ip.stack}}. Il piano “tutto lo stack entro il river” richiede circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}." }
      - { text: "Faccio {{t:check|check}}, poi al river vado all-in", why: "Al river un all-in di {{n:spr.3bet-ip.stack}} in un {{t:pot|piatto}} di {{n:vs3bet.pot-after}} è una {{t:bet|puntata}} molte volte più grande del {{t:pot|piatto}}: l'avversario la pagherà solo con una mano molto forte. {{t:bet|Puntate}} uguali su tre {{t:street|street}} gli danno l'occasione di mettere soldi un po' alla volta." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Piatto}} dopo il tuo 3-bet dal {{t:big-blind|big blind}}, {{t:spr}} circa {{n:spr.3bet-oop}}. Vuoi mettere tutto lo stack entro il river con {{t:bet|puntate}} uguali. Quale frazione del {{t:pot|piatto}} su ogni {{t:street|street}}?"
    table: { position: BB }
    options:
      - { text: "Circa {{n:geo.3bet-oop.3}} del {{t:pot|piatto}}", correct: true, why: "Sì: con {{t:spr}} circa {{n:spr.3bet-oop}}, (1 + 2f) alla terza = 1 + 2·{{n:spr.3bet-oop}}, quindi f ≈ {{n:geo.3bet-oop.3}}. {{t:spr}} più basso che dopo un 3-bet {{t:in-position}}, quindi anche una dimensione più piccola." }
      - { text: "Circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}", sizeError: true, why: "Vicino, ma è la dimensione per {{t:spr}} circa {{n:spr.3bet-ip}}. Con {{t:spr}} circa {{n:spr.3bet-oop}} basta circa {{n:geo.3bet-oop.3}} del {{t:pot|piatto}}, e con {{t:bet|puntate}} più grandi al river non avrai abbastanza stack per una {{t:bet|puntata}} piena." }
      - { text: "Circa {{n:geo.4bet.3}} del {{t:pot|piatto}}", sizeError: true, why: "Questo basta dopo un 4-bet ({{t:spr}} circa {{n:spr.4bet}}). Con {{t:spr}} circa {{n:spr.3bet-oop}} tre {{t:bet|puntate}} così lasciano fuori una buona parte dello stack." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Piatto}} dopo un 4-bet, {{t:spr}} circa {{n:spr.4bet}}. Vuoi mettere tutto lo stack con due {{t:bet|puntate}}: al flop e al turn. Quanto punti al flop?"
    options:
      - { text: "Circa {{n:geo.4bet.2}} del {{t:pot|piatto}}", correct: true, why: "Sì: per due {{t:street|street}} (1 + 2f) al quadrato = 1 + 2·{{n:spr.4bet}}, quindi f ≈ {{n:geo.4bet.2}}. Dopo la {{t:bet|puntata}} e la {{t:call|chiamata}} resta esattamente quanto una {{t:bet|puntata}} uguale al turn." }
      - { text: "Circa {{n:geo.4bet.3}} del {{t:pot|piatto}}", sizeError: true, why: "È la dimensione per tre {{t:street|street}}. Con due {{t:bet|puntate}} da {{n:geo.4bet.3}} del {{t:pot|piatto}} una parte dello stack resta per il river." }
      - { text: "All-in subito ({{n:spr.4bet.stack}})", why: "È un piano per una sola {{t:street|street}}, non per due. Una {{t:bet|puntata}} di circa {{n:spr.4bet}} {{t:pot|piatti}} subito dà all'avversario una sola decisione: {{t:call|chiamare}} tutto o {{t:fold|foldare}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Che cosa significa dimensione geometrica?"
    options:
      - { text: "La stessa frazione del {{t:pot|piatto}} su ogni {{t:street|street}}, in modo che l'ultima {{t:bet|puntata}} sia all-in", correct: true, why: "Sì: una {{t:bet|puntata}} pari a f e una {{t:call|chiamata}} moltiplicano il {{t:pot|piatto}} per (1 + 2f) su ogni {{t:street|street}}. Scegli la dimensione in modo che dopo l'ultima {{t:bet|puntata}} tutto lo stack sia nel {{t:pot|piatto}}." }
      - { text: "Sempre una {{t:bet|puntata}} pari all'intero {{t:pot|piatto}}", why: "L'intero {{t:pot|piatto}} è geometrico solo con un determinato {{t:spr}} (ad es. {{n:spr.zone.deep}} per tre {{t:street|street}}). Con {{t:spr}} circa {{n:spr.3bet-ip}} basta circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}." }
      - { text: "{{t:bet|Puntate}} sempre più grandi in percentuale: piccola al flop, grande al river", why: "Gli importi crescono perché cresce il {{t:pot|piatto}}, ma la frazione del {{t:pot|piatto}} è uguale su ogni {{t:street|street}}. In un {{t:pot|piatto}} 3-bet sono {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, ogni volta circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}." }
---
Prima di {{t:bet|puntare}} al flop, conviene sapere quanti soldi si possono mettere entro il river. Una {{t:bet|puntata}} e una {{t:call|chiamata}} non aggiungono al {{t:pot|piatto}} un importo fisso: lo moltiplicano.

## Come cresce il {{t:pot|piatto}}

Una {{t:bet|puntata}} pari a f del {{t:pot|piatto}} e una {{t:call|chiamata}} moltiplicano il {{t:pot|piatto}} per (1 + 2f). Con una {{t:bet|puntata}} pari all'intero {{t:pot|piatto}}, il {{t:pot|piatto}} triplica:

| {{t:street|Street}} | {{t:pot|Piatto}} prima della {{t:bet|puntata}} | {{t:bet|Puntata}} (intero {{t:pot|piatto}}) | {{t:pot|Piatto}} dopo la {{t:call|chiamata}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Ogni giocatore ha messo {{n:geo.ex.total}}, cioè {{n:spr.zone.deep}} {{t:pot|piatti}}. Tre {{t:bet|puntate}} pari al {{t:pot|piatto}} portano quindi all'all-in esattamente con {{t:spr}} {{n:spr.zone.deep}}. Da qui viene la soglia della zona più alta di {{t:spr}} della prima lezione.

## La formula

La dimensione geometrica è la stessa frazione f del {{t:pot|piatto}} su ogni {{t:street|street}}, scelta in modo che l'ultima {{t:bet|puntata}} sia all-in. Per n {{t:street|street}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Esempio: con {{t:spr}} {{n:geo.half.spr}} tre {{t:bet|puntate}} da metà {{t:pot|piatto}} mettono tutto lo stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}}, in totale {{n:geo.half.total}} con un {{t:pot|piatto}} di {{n:ex.pot}}.

## Dimensioni per i {{t:pot|piatti}} tipici

| {{t:pot|Piatto}} | {{t:spr}} | Tre {{t:street|street}} | Due {{t:street|street}} |
|---|---|---|---|
| {{t:open|Apertura}} e {{t:call|chiamata}} | {{n:spr.srp}} | {{n:geo.srp.3}} del {{t:pot|piatto}} | – |
| 3-bet {{t:in-position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} del {{t:pot|piatto}} | – |
| 3-bet dal {{t:big-blind|big blind}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} del {{t:pot|piatto}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} del {{t:pot|piatto}} | {{n:geo.4bet.2}} del {{t:pot|piatto}} |

In un {{t:pot|piatto}} 3-bet {{t:in-position}} sono {{t:bet|puntate}} di {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, in totale {{n:geo.3bet-ip.total}}, cioè tutto lo stack.

## Il {{t:pot|piatto}} con un solo rilancio è profondo

Con {{t:spr}} circa {{n:spr.srp}} tre {{t:bet|puntate}} da metà {{t:pot|piatto}} mettono solo {{n:srp.half.total}}, e tre {{t:bet|puntate}} pari al {{t:pot|piatto}} {{n:srp.potbet.total}} su uno stack di {{n:spr.srp.stack}}. Tutto lo stack entra solo con {{t:bet|puntate}} più grandi del {{t:pot|piatto}}. Per questo in un {{t:pot|piatto}} così giocarsi tutto lo stack capita soprattutto con mani molto forti.

:::note Quando è utile
La dimensione geometrica è utile quando vuoi mettere tutto lo stack entro il river, cioè con una mano molto forte. Non tutte le mani vogliono giocarsi tutto lo stack: di quante {{t:value|street di valore}} regge una mano parla la prossima lezione. La formula è pura matematica. I moduli precedenti indicano dimensioni adatte alla {{t:texture|texture}} del flop; la dimensione geometrica è un punto di riferimento per un piano su tutto lo stack.
:::
