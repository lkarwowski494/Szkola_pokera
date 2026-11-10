---
id: m7.l3
module: m7
order: 3
title: "Progetti e implied odds"
sub: "Quanto devi vincere dopo"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "Al flop avevi circa {{n:odds.flush.flop-river}} di probabilità di fare {{t:flush|colore}} entro il river. Il turn non ti ha aiutato. Quante probabilità hai adesso?"
    options:
      - { text: "Circa {{n:odds.flush.turn-river}}", correct: true, why: "Sì: resta una sola carta. {{n:outs.flush}} out su {{n:cards.unseen.turn}} carte non viste danno {{n:odds.flush.turn-river}}, più o meno metà della probabilità del flop." }
      - { text: "Sempre circa {{n:odds.flush.flop-river}}, perché gli out sono gli stessi", why: "Gli out sono gli stessi, ma restano meno carte da scoprire. {{n:odds.flush.flop-river}} conta due carte, mentre al turn ne resta una." }
      - { text: "Non si può calcolare senza una calcolatrice", why: "Si può: con la regola del 2 e del 4 del M2. Una carta, quindi out × 2: circa {{n:odds.flush.rule-turn}}. Esattamente {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Quanti out hai per {{t:flush|colore}} o {{t:straight|scala}}? Inserisci un numero."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Per il {{t:flush|colore}} {{n:outs.flush}} cuori, per la {{t:straight|scala}} ogni donna e ogni sette, cioè {{n:outs.oesd}} carte. La donna di cuori e il sette di cuori sono già contati nel colore, quindi sottrai {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.three-quarters}}. Cosa fai?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Hai {{n:outs.combo}} out, cioè circa {{n:odds.combo.turn-river}} al river. Ti serve {{n:eq.bet-three-quarters}}, quindi la {{t:call|chiamata}} conviene anche senza implied odds." }
      - { text: "{{t:fold|Foldo}}, perché un {{t:draw|progetto}} al turn non basta", why: "Con un semplice {{t:draw|progetto}} a questo prezzo in effetti {{t:fold|foldi}}, ma {{t:flush|colore}} e {{t:straight|scala}} insieme danno circa {{n:odds.combo.turn-river}}, più del necessario ({{n:eq.bet-three-quarters}})." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.third.pot}}, l'avversario {{t:bet|punta}} {{n:io.flush.bet}}. Hai un {{t:flush-draw|progetto di colore}}: {{n:outs.flush}} out su {{n:cards.unseen.turn}} carte. Quante {{t:chips|fiches}} devi vincere in più al river, quando chiudi, perché la {{t:call|chiamata}} vada in pareggio? Inserisci un numero."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Ti serve {{n:io.flush.eq}} di equity e hai circa {{n:odds.flush.turn-river}}. Su {{n:cards.unseen.turn}} river possibili chiudi {{n:outs.flush}} volte e manchi {{n:miss.flush.turn}} volte, perdendo ogni volta {{n:io.flush.bet}}. Ogni volta che chiudi devi quindi incassare {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. Il {{t:pot|piatto}} contiene {{n:io.flush.pot-after-bet}}, mancano {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:io.oesd.pot}}, l'avversario {{t:bet|punta}} {{n:io.oesd.bet}}. Hai un {{t:oesd|progetto di scala bilaterale}}: {{n:outs.oesd}} out, {{n:miss.oesd.turn}} carte che non chiudono. Quanto devi vincere in più al river, quando chiudi?"
    options:
      - { text: "Circa {{n:io.oesd.extra}}", correct: true, why: "Ogni volta che chiudi devi incassare {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. Il {{t:pot|piatto}} contiene {{n:io.oesd.pot-after-bet}}, quindi mancano {{n:io.oesd.extra}}." }
      - { text: "Circa {{n:io.oesd.need}}", why: "Questo è quanto devi vincere in totale ogni volta che chiudi. Una parte è già nel {{t:pot|piatto}} ({{n:io.oesd.pot-after-bet}}), quindi in più mancano {{n:io.oesd.extra}}." }
      - { text: "Niente, il prezzo basta", why: "Ti serve {{n:eq.bet-half}} di equity e hai circa {{n:odds.oesd.turn-river}}. Il {{t:pot|piatto}} da solo non basta, mancano {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.third.pot}}, l'avversario {{t:bet|punta}} {{n:io.flush.bet}}. Vi restano ancora {{n:io.flush.stack}} a testa, e l'avversario paga volentieri con una {{t:pair|coppia}} d'assi. Cosa fai?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Il prezzo da solo non basta ({{n:io.flush.eq}} contro circa {{n:odds.flush.turn-river}}), ma quando chiudi ti basta vincere altri {{n:io.flush.extra}}. Hai un {{t:draw|progetto}} al {{t:flush|colore}} migliore (l'asso di cuori è sul {{t:board|board}}, quindi il {{t:flush|colore}} al re è il più alto), l'avversario ha ancora molte {{t:chips|fiches}}, e un giocatore con una {{t:pair|coppia}} d'assi spesso paga una puntata così al river. La tua mano chiusa si vedrà (un terzo cuori), ma l'avversario con una {{t:pair|coppia}} d'assi spesso pagherà comunque; per questo qui le implied odds sono minori che con una mano chiusa nascosta." }
      - { text: "{{t:fold|Foldo}}, perché {{n:odds.flush.turn-river}} è meno di {{n:io.flush.eq}}", why: "Le pot odds dicono “{{t:fold|folda}}”, ma trascuri le implied odds. Mancano solo {{n:io.flush.extra}}, e l'avversario ha ancora {{n:io.flush.stack}} e una mano che pagherà." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Un avversario con una {{t:pair|coppia}} d'assi probabilmente {{t:call|chiamerà}}, e a quel punto hai solo circa {{n:odds.flush.turn-river}}. Meglio vedere il river a poco prezzo e vincere di più quando chiudi." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.half}}. Hai un gutshot. Se chiudi, dovresti vincere altri {{n:io.gut.extra}}, ma all'avversario restano solo {{n:io.gut.stack}}. Cosa fai?"
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Il gutshot dà circa {{n:odds.gutshot.turn-river}}, e ti serve {{n:eq.bet-half}}. Le implied odds non aiutano: anche se l'avversario mette tutti i suoi {{n:io.gut.stack}}, non copre i {{n:io.gut.extra}} mancanti." }
      - { text: "{{t:call|Chiamo}}, per le implied odds", why: "Le implied odds sono le {{t:chips|fiches}} che l'avversario può ancora pagarti. Ne ha solo {{n:io.gut.stack}}, e ti servono {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Un {{t:bluff|bluff}} all-in con {{n:outs.gutshot}} out rischia tutto. Un avversario che ha {{t:bet|puntato}} mezzo {{t:pot|piatto}} con uno stack così piccolo spesso non {{t:fold|folderà}} più." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.pot}}, un avversario prudente {{t:bet|punta}} tutto il {{t:pot|piatto}}: {{n:ex.bet.pot}}. Cosa fai?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Ti serve {{n:eq.bet-pot}}, e hai circa {{n:odds.flush.turn-river}}. In più il tuo {{t:flush|colore}} è basso: quando arriva un cuori, un avversario con la donna o il fante di cuori ha un {{t:flush|colore}} migliore, ed è proprio lì che perdi di più (implied odds inverse)." }
      - { text: "{{t:call|Chiamo}}, per le implied odds", why: "Qui le implied odds sono scarse: un {{t:flush|colore}} chiuso può perdere contro uno più alto, e un terzo cuori sul {{t:board|board}} lo vedono tutti. E manca anche molto: il prezzo è {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Rilancio}}", why: "Un avversario prudente che {{t:bet|punta}} tutto il {{t:pot|piatto}} su un {{t:board|board}} con asso e re raramente {{t:fold|folderà}}. Rischi molto con una mano che può perdere anche quando chiude." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Quando le implied odds sono più grandi?"
    options:
      - { text: "Quando hai un {{t:draw|progetto}} alla mano migliore, e l'avversario ha una mano forte e molte {{t:chips|fiches}} davanti", correct: true, why: "Sì: allora quando chiudi vinci, e l'avversario ha sia le fiches sia la mano per pagarti." }
      - { text: "Quando l'avversario ha poche {{t:chips|fiches}} ({{t:spr|SPR}} basso)", why: "Al contrario: con un {{t:spr|SPR}} basso l'avversario non ha più niente da aggiungere, quindi le implied odds sono piccole." }
      - { text: "Quando hai un {{t:draw|progetto}} a un {{t:flush|colore}} basso", why: "Queste sono le implied odds inverse: a volte chiudi e perdi lo stesso, e in un {{t:pot|piatto}} grande." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "All'inizio del turn il {{t:pot|piatto}} è di {{n:ex.pot}}, e il più piccolo dei vostri stack è {{n:spr.stack.high}}. Quanto vale l'{{t:spr|SPR}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr|SPR}} = stack ÷ {{t:pot|piatto}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. L'avversario ha davanti diversi {{t:pot|piatti}}, quindi le implied odds possono essere grandi." }
      - { text: "{{n:spr.low}}", why: "Sarebbe così con uno stack di {{n:spr.stack.low}}. Qui lo stack è {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Questo è il {{t:pot|piatto}}. L'{{t:spr|SPR}} è un rapporto: lo stack diviso il {{t:pot|piatto}}." }
---
Al turn resta ormai una sola carta. La probabilità del tuo {{t:draw|progetto}} si riduce più o meno della metà, e il prezzo della carta successiva di solito sale. Per questo al turn conti con più precisione e ti fai una nuova domanda: quanto posso vincere dopo, se chiudo?

## Una carta alla fine

| {{t:draw|Progetto}} | Out | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Colore}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Scala}} bilaterale | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Colore}} + {{t:straight|scala}} bilaterale | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Con la regola del 2 e del 4 del M2 moltiplichi gli out per 2. Quando due {{t:draw|progetti}} hanno carte in comune, le conti una volta sola.

## Implied odds

Le implied odds (probabilità implicite) sono le {{t:chips|fiches}} che vincerai al river se chiudi. Esempio: il {{t:pot|piatto}} è di {{n:ex.third.pot}}, l'avversario {{t:bet|punta}} {{n:io.flush.bet}}, tu hai un {{t:flush-draw|progetto di colore}}. Ti serve {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} di equity, e hai circa {{n:odds.flush.turn-river}}. Il {{t:pot|piatto}} da solo non basta.

Su {{n:cards.unseen.turn}} river possibili chiudi {{n:outs.flush}} volte e manchi {{n:miss.flush.turn}} volte. Per andare in pareggio, ogni volta che chiudi devi incassare quanto ti costano le volte che manchi:

```formula
vincita necessaria = importo da chiamare × (carte che non chiudono ÷ out)
```

Qui: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. Il {{t:pot|piatto}} contiene {{n:io.flush.pot-after-bet}}, quindi al river devi ricevere in media altri **{{n:io.flush.extra}}**.

## {{t:spr|SPR}}: quante {{t:chips|fiches}} ha davanti l'avversario

L'{{t:spr|SPR}} (rapporto stack/{{t:pot|piatto}}) è lo {{t:effective-stack|stack effettivo}}, cioè il più piccolo dei due, diviso il {{t:pot|piatto}} all'inizio della {{t:street|street}}. Puoi calcolare l'{{t:spr|SPR}} su ogni {{t:street|street}}; qui lo calcoli al turn. Con un {{t:pot|piatto}} di {{n:ex.pot}} e uno stack di {{n:spr.stack.high}} l'{{t:spr|SPR}} è {{n:spr.high}}, cioè l'avversario ha ancora davanti diversi {{t:pot|piatti}}; con uno stack di {{n:spr.stack.low}} è solo {{n:spr.low}}. Le implied odds non possono superare le {{t:chips|fiches}} che l'avversario ha ancora davanti. Con un {{t:spr|SPR}} basso contano quasi solo le pot odds. Per saperne di più sull'{{t:spr|SPR}}, vedi il modulo “Piano della mano” (M9), che pianifica la mano in base all'{{t:spr|SPR}} del flop.

## Quando le implied odds sono reali

- hai un {{t:draw|progetto}} alla **mano migliore** (il {{t:flush|colore}} più alto possibile, di solito con l'asso),
- l'avversario ha una **mano forte** con cui pagherà,
- l'avversario ha **molte {{t:chips|fiches}}** davanti ({{t:spr|SPR}} alto),
- la tua mano chiusa **non dà nell'occhio** (ad es. un gutshot si vede meno di un terzo cuori sul {{t:board|board}}).

Le implied odds inverse giocano contro di te: quando hai un {{t:draw|progetto}} a un {{t:flush|colore}} basso, o a una {{t:straight|scala}} mentre sul {{t:board|board}} può arrivare un {{t:flush|colore}}, a volte chiudi e perdi lo stesso, e in un {{t:pot|piatto}} grande.

:::note Da dove vengono queste regole
Il calcolo delle implied odds è un calcolo esatto basato sul {{t:expected-value|valore atteso}}. Le condizioni in cui le implied odds sono reali e le implied odds inverse sono euristiche tratte da materiali di formazione.
:::
