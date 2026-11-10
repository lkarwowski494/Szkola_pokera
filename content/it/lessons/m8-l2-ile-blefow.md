---
id: m8.l2
module: m8
order: 2
title: "Quanto bluffare"
sub: "Il rapporto tra bluff e dimensione della puntata"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}} e punti l'intero {{t:pot|piatto}}: {{n:ex.bet.pot}}. Il tuo {{t:range}} è fatto di mani molto forti e {{t:bluff|bluff}}. Che quota delle tue puntate dovrebbe essere {{t:bluff|bluff}}, perché l'avversario non possa sfruttarti? Inserisci il numero in percentuale."
    answer: bluff.share.bet-pot
    explanation: "Quota di {{t:bluff|bluff}} = puntata ÷ ({{t:pot}} + 2·puntata) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Una puntata su tre è un {{t:bluff}}: così la mano dell'avversario che batte solo i {{t:bluff|bluff}} non guadagna né {{t:call|chiamando}} né {{t:fold|foldando}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}} e punti metà {{t:pot|piatto}}: {{n:ex.bet.half}}. In equilibrio, che quota delle tue puntate sono {{t:bluff|bluff}}? Inserisci il numero in percentuale."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Una puntata più piccola dà all'avversario un prezzo migliore, quindi i {{t:bluff|bluff}} sono meno che con l'intero {{t:pot|piatto}} ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}} e punti {{n:ex.bet.three-quarters}}. In equilibrio, che quota delle tue puntate sono {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. È lo stesso numero dell'equity che serve all'avversario per {{t:call|chiamare}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Questo è l'alpha: quanto spesso deve funzionare un singolo {{t:bluff}} senza chance. La quota di {{t:bluff|bluff}} nel {{t:range}} la calcoli con entrambe le puntate al denominatore: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Questa è la {{t:mdf}}, cioè quanto dovrebbe difendere l'avversario. La quota dei tuoi {{t:bluff|bluff}} è {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}} e punti più del {{t:pot|piatto}}: {{n:ex.bet.overbet}}. In equilibrio, che quota delle tue puntate sono {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Un {{t:overbet}}, cioè una {{t:bet|puntata}} più grande dell'intero {{t:pot|piatto}}, dà all'avversario il prezzo peggiore, quindi puoi metterci il maggior numero di {{t:bluff|bluff}}, ma comunque meno della metà." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Questo è l'alpha per questa dimensione: quanto spesso l'avversario deve {{t:fold|foldare}} perché un singolo {{t:bluff}} sia redditizio. La quota di {{t:bluff|bluff}} nel {{t:range}} è {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Questa è la quota di {{t:bluff|bluff}} con una puntata pari all'intero {{t:pot|piatto}}. Con una puntata di {{n:ex.bet.overbet}} ce ne sono di più: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Con quale puntata al river hai più {{t:bluff|bluff}} nel {{t:range}}: 1/3 di {{t:pot|piatto}} o l'intero {{t:pot|piatto}}?"
    options:
      - { text: "Con l'intero {{t:pot|piatto}}", correct: true, why: "Con 1/3 di {{t:pot|piatto}} i {{t:bluff|bluff}} sono circa il {{n:bluff.share.bet-third}} delle puntate, con l'intero {{t:pot|piatto}} circa il {{n:bluff.share.bet-pot}}. Una puntata più grande dà all'avversario un prezzo peggiore, quindi la sua {{t:call|chiamata}} ha bisogno di più {{t:bluff|bluff}} per essere redditizia." }
      - { text: "Con 1/3 di {{t:pot|piatto}}", why: "Al contrario. Una puntata piccola dà all'avversario un buon prezzo: per {{t:call|chiamare}} gli basta circa il {{n:bluff.share.bet-third}} di {{t:bluff|bluff}} tra le tue puntate. Con più {{t:bluff|bluff}} pagherebbe in profitto." }
      - { text: "Lo stesso numero", why: "La quota di {{t:bluff|bluff}} dipende dalla dimensione: circa il {{n:bluff.share.bet-third}} con 1/3 di {{t:pot|piatto}}, circa il {{n:bluff.share.bet-pot}} con l'intero {{t:pot|piatto}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Al river punti l'intero {{t:pot|piatto}}. L'alpha è {{n:alpha.bet-pot}} e la quota di {{t:bluff|bluff}} {{n:bluff.share.bet-pot}}. Che cosa dice ciascuno di questi numeri?"
    options:
      - { text: "Alpha: quanto spesso l'avversario deve {{t:fold|foldare}}; quota: che parte delle puntate sono {{t:bluff|bluff}}", correct: true, why: "L'alpha riguarda un singolo {{t:bluff}} senza chance: va in pari quando l'avversario {{t:fold|folda}} nel {{n:alpha.bet-pot}} dei casi. La quota di {{t:bluff|bluff}} descrive la composizione del tuo {{t:range}}: una puntata su tre è un {{t:bluff}}, perché la {{t:call|chiamata}} dell'avversario vada in pari." }
      - { text: "Sono due nomi della stessa cosa, uno dei due è calcolato male", why: "Sono calcolati correttamente entrambi: alpha = puntata ÷ ({{t:pot}} + puntata), quota di {{t:bluff|bluff}} = puntata ÷ ({{t:pot}} + 2·puntata). Rispondono a domande diverse." }
      - { text: "Alpha: quanti {{t:bluff|bluff}} hai nel {{t:range}}; quota: quanto spesso l'avversario {{t:fold|folda}}", why: "Al contrario. L'alpha è la soglia di {{t:fold|fold}} dell'avversario per un singolo {{t:bluff}}, mentre la quota di {{t:bluff|bluff}} è la composizione del tuo {{t:range}} di puntata." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Perché la quota di {{t:bluff|bluff}} nelle tue puntate la calcoli con la stessa formula dell'equity che serve all'avversario per {{t:call|chiamare}}?"
    options:
      - { text: "Perché la mano dell'avversario che cattura i {{t:bluff|bluff}} vince esattamente quando {{t:bluff|bluffi}}", correct: true, why: "La sua mano perde contro il tuo valore e vince contro i {{t:bluff|bluff}}, quindi la sua equity è la quota di {{t:bluff|bluff}}. Quando questa è pari all'equity necessaria, la {{t:call|chiamata}} va in pari e l'avversario non può sfruttarti né chiamando né foldando." }
      - { text: "È un caso, le formule si somigliano soltanto", why: "Non è un caso. Scegli la quota di {{t:bluff|bluff}} in modo che l'equity della mano che cattura i {{t:bluff|bluff}} sia pari al suo prezzo." }
      - { text: "Perché l'avversario ha sempre esattamente l'equity necessaria", why: "L'avversario ha l'equity che deriva dalle tue puntate. Sei tu a scegliere il numero di {{t:bluff|bluff}} in modo che vada in pari." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Al river punti l'intero {{t:pot|piatto}}, ma i tuoi {{t:bluff|bluff}} sono la metà delle puntate, non il {{n:bluff.share.bet-pot}}. Che cosa può fare un avversario attento?"
    options:
      - { text: "{{t:call|Chiamare}} più spesso, anche con mani deboli che catturano i {{t:bluff|bluff}}", correct: true, why: "La sua {{t:call|chiamata}} vince nella metà dei casi, mentre gli serve solo il {{n:eq.bet-pot}}. Pagando di più, guadagna sui tuoi {{t:bluff|bluff}} più di quanto perde contro il tuo valore." }
      - { text: "{{t:fold|Foldare}} più spesso", why: "Foldando ti lascia il {{t:pot|piatto}} con i {{t:bluff|bluff}}. Quando i {{t:bluff|bluff}} sono troppi, l'avversario guadagna {{t:call|chiamando}}." }
      - { text: "Niente, il rapporto non conta", why: "Conta: con troppi {{t:bluff|bluff}} ogni {{t:call|chiamata}} con una mano che cattura i {{t:bluff|bluff}} è redditizia per l'avversario." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Al river punti l'intero {{t:pot|piatto}} quasi solo {{t:value|per valore}}, quasi senza {{t:bluff|bluff}}. Che cosa può fare un avversario attento?"
    options:
      - { text: "{{t:fold|Foldare}} tutte le mani che battono solo i {{t:bluff|bluff}}", correct: true, why: "Quando i {{t:bluff|bluff}} sono meno del {{n:bluff.share.bet-pot}}, una {{t:call|chiamata}} con una mano che cattura i {{t:bluff|bluff}} perde. L'avversario allora paga solo con mani migliori e le tue puntate {{t:value|per valore}} vengono pagate più di rado." }
      - { text: "{{t:call|Chiamare}} più spesso", why: "{{t:call|Chiamando}} pagherebbe soprattutto il tuo valore. Senza {{t:bluff|bluff}} nel tuo {{t:range}}, gli conviene {{t:fold|foldare}}." }
      - { text: "{{t:raise|Rilanciare}} con ogni mano", why: "{{t:raise|Rilanciare}} la tua mano forte senza un punto migliore è una perdita sicura. L'avversario semplicemente {{t:fold|folda}} più spesso." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "Al river punti l'intero {{t:pot|piatto}} con un {{t:range}} di {{n:bluff.ex.range}} {{t:combo|combo}}: valore e {{t:bluff|bluff}}. In equilibrio, quante di queste sono {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|bluff}} e {{n:bluff.ex.value}} {{t:combo|combo}} {{t:value|per valore}}: un {{t:bluff}} ogni due mani {{t:value|per valore}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "È quello che otterresti con l'alpha ({{n:alpha.bet-pot}}). L'alpha è la soglia di {{t:fold|fold}} per un singolo {{t:bluff}}, non la quota di {{t:bluff|bluff}} nel {{t:range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Queste sono le {{t:combo|combo}} {{t:value|per valore}}. I {{t:bluff|bluff}} sono la metà: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "Al river ti servono alcuni {{t:bluff|bluff}} per le puntate pari all'intero {{t:pot|piatto}}. Quali mani scegli?"
    options:
      - { text: "Le più deboli, ad es. {{t:draw|progetti}} di {{t:straight|scala}} mancati o carte alte senza chance", correct: true, why: "Una mano senza chance allo showdown non perde nulla se il {{t:bluff}} non riesce: dopo il {{t:check}} perderebbe comunque. Per questo è lei a {{t:bluff|bluffare}}." }
      - { text: "{{t:pair|Coppie}} medie", why: "Una {{t:pair|coppia}} media vince spesso dopo il {{t:check}}. Se {{t:bluff|bluffi}} con lei, le mani peggiori {{t:fold|foldano}} e quelle migliori pagano: rinunci a una vittoria allo showdown." }
      - { text: "Qualsiasi, purché il rapporto sia giusto", why: "Il rapporto non è tutto. Un {{t:bluff}} con una mano che vincerebbe allo showdown costa di più di un {{t:bluff}} con una mano senza chance." }
---
Nella prima lezione hai puntato {{t:value|per valore}}. Ma se al river puntassi solo con mani forti, un avversario attento folderebbe tutto tranne le mani ancora più forti e le tue puntate non verrebbero quasi mai pagate. I {{t:bluff|bluff}} fanno sì che all'avversario convenga pagare.

## {{t:range|Range}} {{t:polarized|polarizzato}}

Al river {{t:in-position|in posizione}} punti spesso con un **{{t:range}} {{t:polarized|polarizzato}}** (come in M7): mani molto forti {{t:value|per valore}} e {{t:bluff|bluff}}, senza mani medie (quelle fanno {{t:check}}, come nella prima lezione). Al river i {{t:bluff|bluff}} sono mani senza chance allo showdown. L'avversario ha allora molte mani che perdono contro il tuo valore ma battono i {{t:bluff|bluff}}. Sono i **bluff-catcher** (mani che catturano i {{t:bluff|bluff}}).

## Quanti {{t:bluff|bluff}}

Scegli il numero di {{t:bluff|bluff}} in modo che il bluff-catcher dell'avversario vada in pari sia che {{t:call|chiami}} sia che {{t:fold|foldi}}:

```formula
quota di bluff = puntata ÷ (piatto + 2·puntata)
```

È la stessa formula dell'equity necessaria per {{t:call|chiamare}} vista in M2. Non è un caso: il bluff-catcher vince esattamente quando {{t:bluff|bluffi}}, quindi la sua equity è la quota dei tuoi {{t:bluff|bluff}}. Con una puntata pari all'intero {{t:pot|piatto}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, cioè una puntata su tre è un {{t:bluff}}.

## Puntata più grande, più {{t:bluff|bluff}}

| Puntata | Quota di {{t:bluff|bluff}} | Alpha (da M6) |
|---|---|---|
| 1/3 di {{t:pot|piatto}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 di {{t:pot|piatto}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 di {{t:pot|piatto}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Intero {{t:pot|piatto}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|piatti}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Una puntata più grande dà all'avversario un prezzo peggiore, quindi puoi metterci più {{t:bluff|bluff}}. Una puntata piccola ne regge solo pochi.

## La quota di {{t:bluff|bluff}} non è l'alpha

L'alpha di M6 = puntata ÷ ({{t:pot}} + puntata) dice quanto spesso l'avversario deve {{t:fold|foldare}} perché **un singolo** {{t:bluff}} senza chance vada in pari. La quota di {{t:bluff|bluff}} = puntata ÷ ({{t:pot}} + 2·puntata) dice che parte dell'**intero {{t:range}} di puntata** sono {{t:bluff|bluff}}. Con una puntata pari all'intero {{t:pot|piatto}}, un {{t:bluff}} ha bisogno di più del {{n:alpha.bet-pot}} di {{t:fold|fold}}, mentre nel {{t:range}} hai il {{n:bluff.share.bet-pot}} di {{t:bluff|bluff}}. Nel secondo denominatore c'è una puntata in più, perché calcoli il prezzo della {{t:call|chiamata}} dell'avversario.

## Con che cosa {{t:bluff|bluffare}}

Per i {{t:bluff|bluff}} scegli le **mani più deboli**, ad es. {{t:draw|progetti}} di {{t:straight|scala}} mancati o carte alte senza chance (dei {{t:flush|colori}} mancati si parla nella lezione sui {{t:blocker|blocker}}): dopo il {{t:check}} perderebbero comunque, quindi un {{t:bluff}} fallito non toglie loro nulla. Le mani con valore allo showdown fanno {{t:check}}.

:::note È un punto di equilibrio, non una ricetta per ogni avversario
Queste proporzioni ti proteggono da un avversario che gioca bene. Contro giocatori specifici puoi discostartene; se ne parla nel modulo sullo {{t:exploit|sfruttamento}} ai microlimiti (M10). La formula della quota di {{t:bluff|bluff}} è un calcolo in un modello semplificato: un {{t:range}} {{t:polarized|polarizzato}} contro una mano che cattura i {{t:bluff|bluff}} (un modello giocattolo della teoria dei giochi). Il consiglio di {{t:bluff|bluffare}} con le mani più deboli viene da materiali didattici e analisi dei solver.
:::
