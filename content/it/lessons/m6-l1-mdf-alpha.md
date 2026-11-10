---
id: m6.l1
module: m6
order: 1
title: "MDF e alpha"
sub: "Quanto difendere quando l'avversario punta"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.third.pot}}, l'avversario {{t:bet|punta}} {{n:ex.third.bet}}. Qual è la quota minima del tuo {{t:range}} che devi difendere ({{t:call|chiamando}} o {{t:raise|rilanciando}}) perché il suo {{t:bluff}} senza equity non guadagni automaticamente? Inserisci un numero in percentuale."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot|piatto}} ÷ ({{t:pot|piatto}} + puntata) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. L'avversario rischia {{n:ex.third.bet}} per vincere {{n:ex.third.pot}}, quindi il suo {{t:bluff}} guadagna se {{t:fold|foldi}} più spesso del {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:bet|punta}} tutto il {{t:pot|piatto}}: {{n:ex.bet.pot}}. Quanto vale la {{t:mdf}}? Inserisci un numero in percentuale."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Con una puntata pari al {{t:pot|piatto}}, il {{t:bluff}} rischia quanto può vincere, quindi basta che tu {{t:fold|foldi}} una volta su due perché vada in pari."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:bet|punta}} metà {{t:pot|piatto}}: {{n:ex.bet.half}}. Quanto vale la {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. Questa è la quota del tuo {{t:range}} che difendi perché un {{t:bluff}} senza equity non guadagni." }
      - { text: "{{n:alpha.bet-half}}", why: "Questo è alpha: quanto spesso deve funzionare il {{t:bluff}} dell'avversario. La {{t:mdf}} è il resto fino al totale, cioè {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Questa è l'equity necessaria per {{t:call|chiamare}} con una singola mano (da M2). La {{t:mdf}} indica quale quota dell'intero {{t:range}} difendi." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:bet|punta}} più del {{t:pot|piatto}}: {{n:ex.bet.overbet}}. Quanto vale la {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Più grande è la puntata, minore è la quota del {{t:range}} che devi difendere." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Questo è alpha: quanto spesso deve funzionare un {{t:bluff}} da {{n:ex.bet.overbet}}. Tu difendi il resto, cioè {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Questa è l'equity necessaria per {{t:call|chiamare}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Numero diverso, domanda diversa." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Bluffi}} con una mano senza equity: il {{t:pot|piatto}} è di {{n:ex.pot}}, {{t:bet|punti}} {{n:ex.bet.half}}. Quanto spesso l'avversario deve {{t:fold|foldare}} perché il {{t:bluff}} vada in pari? Inserisci un numero in percentuale."
    answer: alpha.bet-half
    explanation: "Alpha = puntata ÷ ({{t:pot|piatto}} + puntata) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Rischi {{n:ex.bet.half}} per vincere {{n:ex.pot}}: se l'avversario {{t:fold|folda}} più spesso, il {{t:bluff}} guadagna."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Bluffi}}: il {{t:pot|piatto}} è di {{n:ex.pot}}, {{t:bet|punti}} {{n:ex.bet.three-quarters}}. Quanto spesso l'avversario deve {{t:fold|foldare}} perché il {{t:bluff}} sia profittevole?"
    options:
      - { text: "Più spesso del {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Questo è l'alpha per una puntata di 3/4 di {{t:pot|piatto}}." }
      - { text: "Più spesso del {{n:mdf.bet-three-quarters}}", why: "Questa è la {{t:mdf}}, cioè quanto dovrebbe difendere l'avversario. Alpha è la quota che può {{t:fold|foldare}} prima che il tuo {{t:bluff}} inizi a guadagnare: {{n:alpha.bet-three-quarters}}." }
      - { text: "Più spesso del {{n:eq.bet-three-quarters}}", why: "Questa è l'equity che serve all'avversario per {{t:call|chiamare}}. La soglia del {{t:bluff}} la calcoli senza la sua {{t:call|chiamata}} al denominatore: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "Il {{t:pot|piatto}} è di {{n:ex.pot}}. Quale {{t:bluff}} senza equity ha bisogno di {{t:fold|fold}} meno frequenti dell'avversario: quello da {{n:ex.bet.quarter}} o quello da {{n:ex.bet.pot}}?"
    options:
      - { text: "Quello da {{n:ex.bet.quarter}}: basta oltre il {{n:alpha.bet-quarter}} di {{t:fold|fold}}", correct: true, why: "Un {{t:bluff}} piccolo rischia poco: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Un {{t:bluff}} da tutto il {{t:pot|piatto}} ha bisogno di oltre il {{n:alpha.bet-pot}} di {{t:fold|fold}}." }
      - { text: "Quello da {{n:ex.bet.pot}}: basta oltre il {{n:alpha.bet-quarter}} di {{t:fold|fold}}", why: "Al contrario. Una puntata più grande rischia di più, quindi l'avversario deve {{t:fold|foldare}} più spesso: con tutto il {{t:pot|piatto}}, oltre il {{n:alpha.bet-pot}}." }
      - { text: "Entrambi hanno bisogno della stessa frequenza", why: "Alpha dipende dalla dimensione: {{n:alpha.bet-quarter}} con {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} con {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, l'avversario {{t:bet|punta}} 1/3 di {{t:pot|piatto}}. La {{t:mdf}} è {{n:mdf.bet-third}}, e per {{t:call|chiamare}} ti serve il {{n:eq.bet-third}} di equity. Come conciliare questi due numeri?"
    options:
      - { text: "La {{t:mdf}} riguarda l'intero {{t:range}}, l'equity una singola mano", correct: true, why: "La {{t:mdf}} indica quale quota di tutte le tue mani difendi perché l'avversario non possa {{t:bluff|bluffare}} con qualsiasi carta. L'equity necessaria indica se una {{t:call|chiamata}} con una mano specifica è profittevole contro ciò con cui l'avversario {{t:bet|punta}} davvero." }
      - { text: "Una delle due è calcolata male", why: "Sono entrambe corrette: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} e {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Rispondono a domande diverse." }
      - { text: "{{t:call|Chiami}} quando hai almeno il {{n:mdf.bet-third}} di equity", why: "Confusione di concetti. Per {{t:call|chiamare}} basta il {{n:eq.bet-third}} di equity. Il {{n:mdf.bet-third}} è una quota del {{t:range}}, non la probabilità di una singola mano." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Difendi il {{t:big-blind}}, il Button {{t:bet|punta}} una c-bet da 1/3 di {{t:pot|piatto}}. La {{t:mdf}} è {{n:mdf.bet-third}}. Devi difendere così tante mani?"
    table: { position: BB }
    options:
      - { text: "No, puoi difendere un po' meno", correct: true, why: "La {{t:mdf}} presuppone un {{t:bluff}} senza alcuna equity. Al flop i {{t:bluff}} del Button hanno ancora equity ({{t:draw|progetti}}, carte alte), e tu {{t:out-of-position|fuori posizione}} non realizzerai tutta l'equity delle mani deboli. Per questo puoi difendere un po' meno della {{t:mdf}}, ma contro una c-bet piccola non {{t:fold|foldi}} in massa." }
      - { text: "Sì, altrimenti il Button guadagna con qualsiasi mano", why: "Al river sarebbe così. Al flop il Button non {{t:bluff|bluffa}} con una mano senza equity: anche se lo {{t:call|chiami}}, può ancora migliorare. La {{t:mdf}} è un punto di riferimento, non un obbligo." }
      - { text: "No, difendi di più perché è solo il flop", why: "Al contrario. Le {{t:street|street}} future favoriscono chi punta {{t:in-position|in posizione}}, quindi difendi meno, non di più." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Un giocatore che, da molte mani precedenti, sai che {{t:bluff|bluffa}} raramente, al river {{t:bet|punta}} tutto il {{t:pot|piatto}}. Hai una {{t:pair|coppia}} di re con un kicker debole. Cosa fai?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Da molte mani precedenti sai che questo giocatore {{t:bluff|bluffa}} raramente. Quando i {{t:bluff}} mancano, la tua {{t:pair|coppia}} paga soprattutto mani migliori (KQ, set). Contro un giocatore così {{t:fold|foldi}} più spesso di quanto indichi la {{t:mdf}}." }
      - { text: "{{t:call|Chiamo}}, perché la {{t:mdf}} dice di difendere il {{n:mdf.bet-pot}}", why: "La {{t:mdf}} protegge da un giocatore che {{t:bluff|bluffa}} abbastanza spesso. Questo giocatore non lo fa, quindi attenersi alla {{t:mdf}} significa regalargli soldi." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Le mani migliori pagheranno, quelle peggiori {{t:fold|folderanno}}. Una {{t:pair|coppia}} con un kicker debole non è una mano da {{t:raise|rilancio}}." }
---
Quando l'avversario {{t:bet|punta}}, non ti chiedi solo „questa mano può vincere?”. Guardi anche tutte le mani che puoi avere in questa situazione, cioè il tuo {{t:range}}. Due numeri ti dicono quante difenderne e quanto spesso deve funzionare il {{t:bluff}} dell'avversario.

## Alpha: quanto spesso deve funzionare un {{t:bluff}}

Un {{t:bluff}} senza equity vince solo quando l'avversario {{t:fold|folda}}. Rischi la puntata per vincere il {{t:pot|piatto}}.

```formula
alpha = puntata ÷ (piatto + puntata)
```

Esempio: il {{t:pot|piatto}} è di {{n:ex.pot}}, {{t:bet|punti}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Se l'avversario {{t:fold|folda}} più spesso, il tuo {{t:bluff}} guadagna anche senza alcuna mano.

## {{t:mdf}}: quanto devi difendere

La {{t:mdf}} (frequenza minima di difesa) è l'altra faccia dell'alpha. Se difendi ({{t:call|chiami}} o {{t:raise|rilanci}}) meno mani, l'avversario guadagna {{t:bluff|bluffando}} con qualsiasi carta.

```formula
MDF = piatto ÷ (piatto + puntata)
```

Esempio al river: il {{t:pot|piatto}} è di {{n:ex.third.pot}}, l'avversario {{t:bet|punta}} {{n:ex.third.bet}}, cioè 1/3 di {{t:pot|piatto}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Puntata dell'avversario | {{t:mdf}} | Alpha | Equity necessaria |
|---|---|---|---|
| 1/4 di {{t:pot|piatto}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 di {{t:pot|piatto}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 di {{t:pot|piatto}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 di {{t:pot|piatto}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Tutto il {{t:pot|piatto}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## La {{t:mdf}} non è l'equity necessaria

L'equity necessaria di M2 riguarda **una singola mano**: se una {{t:call|chiamata}} con quella mano è profittevole. La {{t:mdf}} riguarda **l'intero {{t:range}}**: quale quota ne difendi. Contro una puntata di 1/3 di {{t:pot|piatto}} al river, la {{t:mdf}} suggerisce di difendere circa il {{n:mdf.bet-third}} delle mani, mentre una singola {{t:call|chiamata}} è profittevole se la mano vince almeno nel {{n:eq.bet-third}} dei casi.

## Al flop {{t:out-of-position|fuori posizione}} difendi meno

La {{t:mdf}} presuppone che il {{t:bluff}} dell'avversario non abbia alcuna equity. È più vicino al vero al river, dove i {{t:draw|progetti}} non possono più migliorare. Al flop i {{t:bluff}} hanno ancora equity: {{t:draw|progetti}} e carte alte possono migliorare. In più, {{t:out-of-position|fuori posizione}} non realizzerai tutta l'equity delle tue mani deboli. Per questo al flop {{t:out-of-position|fuori posizione}} puoi difendere meno della {{t:mdf}} (sui flop sfavorevoli a chi difende, nettamente meno) e la consideri un punto di riferimento, non un obbligo; contro le c-bet piccole, però, non {{t:fold|foldi}} in massa. In un esempio al turn, il solver ha difeso in media vicino alla {{t:mdf}}.

:::note Quando l'avversario {{t:bluff|bluffa}} raramente
La {{t:mdf}} ti protegge da un giocatore che {{t:bluff|bluffa}} abbastanza spesso. Se dalle tue osservazioni sai che un giocatore specifico {{t:bluff|bluffa}} troppo raramente con le puntate grandi al river, contro di lui {{t:fold|foldi}} più spesso di quanto indichi la {{t:mdf}}: {{t:call|chiamare}} con una {{t:pair|coppia}} più debole paga soprattutto mani migliori. Questo è un {{t:exploit}}, non una strategia contro chiunque (approfondimento nel modulo 10).
:::
