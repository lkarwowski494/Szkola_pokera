---
id: m11.l2
module: m11
order: 2
title: "Chiamare un all-in"
sub: "Quanta equity ti serve e perché chiami più stretto"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Hai {{n:m11.depth.10}} in {{t:big-blind}}, senza ante. Lo {{t:small-blind}} è andato all-in per {{n:m11.depth.10}}. Che percentuale di equity ti serve perché la {{t:call|chiamata}} sia redditizia? Inserisci un numero."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Il tuo blind è già nel {{t:pot|piatto}}, quindi aggiungi {{n:m11.call.10.cost}}. Dopo la {{t:call|chiamata}} il {{t:pot|piatto}} è di {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stesso spot, ma gli stack sono di {{n:m11.depth.5}} ciascuno. Quanta equity ti serve per {{t:call|chiamare}} l'all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Aggiungi {{n:m11.call.5.cost}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} è di {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Con uno stack più corto il blind è una parte più grande dello stack, quindi il prezzo è migliore." }
      - { text: "{{n:m11.call.10.eq}}", why: "È il prezzo con {{n:m11.depth.10}}. Con {{n:m11.depth.5}} il tuo blind è una parte più grande dell'intero stack, quindi ti serve meno: {{n:m11.call.5.eq}}." }
      - { text: "La metà", why: "Ti servirebbe la metà se mettessi l'intero stack. Il blind è già nel {{t:pot|piatto}}, quindi aggiungi solo {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stack di {{n:m11.depth.15}} ciascuno, lo {{t:small-blind}} è andato all-in. Quanta equity ti serve per {{t:call|chiamare}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Aggiungi {{n:m11.call.15.cost}} a un {{t:pot|piatto}} di {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Più lo stack è profondo, più ci si avvicina alla metà." }
      - { text: "{{n:m11.call.5.eq}}", why: "È il prezzo con {{n:m11.depth.5}}. Con {{n:m11.depth.15}} il blind è una parte più piccola dello stack, quindi il prezzo sale a {{n:m11.call.15.eq}}." }
      - { text: "Più della metà", why: "Anche con uno stack molto profondo il prezzo non supera la metà: nel {{t:pot|piatto}} hai sempre il tuo blind." }
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
    prompt: "Hai {{n:m11.depth.10}} in {{t:big-blind}}, lo {{t:small-blind}} è andato all-in. Colora le mani con cui {{t:call|chiami}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Con {{n:m11.depth.10}} il solver va all-in dallo {{t:small-blind}} con sette e sei dello stesso seme (76s). Tu hai questa mano in {{t:big-blind}} ed è lo {{t:small-blind}} ad andare all-in. Cosa fai?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "L'all-in con 76s è redditizio soprattutto grazie ai {{t:fold|fold}} dell'avversario. Se {{t:call|chiami}}, vinci solo allo showdown, e contro un {{t:range}} di all-in con molte carte alte e {{t:pair|coppie}}. Il solver {{t:fold|folda}} questa mano." }
      - { text: "{{t:call|Chiamo}}, perché dallo {{t:small-blind}} ci andrei all-in", why: "La {{t:call|chiamata}} è una situazione diversa: non hai fold equity e il {{t:range}} dell'avversario è più forte di uno casuale. Per {{t:call|chiamare}} ti serve una mano più forte." }
      - { text: "{{t:call|Chiamo}}, perché una mano dello stesso seme si sviluppa bene", why: "Dopo un all-in non c'è altro gioco in cui la mano possa svilupparsi. Conta solo l'equity fino allo showdown." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Big blind}}, lo {{t:small-blind}} è andato all-in. Hai una {{t:pair|coppia}} di due. Con {{n:m11.depth.10}} il solver {{t:call|chiama}}. E con {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Folda}}", correct: true, why: "Con {{n:m11.depth.15}} il prezzo sale a {{n:m11.call.15.eq}} e il {{t:range}} di all-in è più stretto (circa {{n:m11.push.15}} mani), quindi la {{t:pair|coppia}} di due incontra più spesso una {{t:pair|coppia}} più alta. Il {{t:range}} di {{t:call|chiamata}} scende da circa {{n:m11.call.10}} a circa {{n:m11.call.15}} mani." }
      - { text: "{{t:call|Chiama}}, perché una {{t:pair|coppia}} è sempre favorita", why: "Una {{t:pair|coppia}} di due contro due carte più alte è più o meno un testa o croce, e contro qualsiasi {{t:pair|coppia}} più alta è nettamente sfavorita. Con uno stack più profondo l'avversario {{t:shove|pusha}} meno mani deboli, quindi le {{t:pair|coppie}} sono una parte più grande del suo {{t:range}}." }
      - { text: "{{t:call|Chiama}}, perché più lo stack è profondo, più si chiama largo", why: "Al contrario: più lo stack è profondo, più costa la {{t:call|chiamata}} e più stretto è il {{t:range}} di {{t:call|chiamata}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Con {{n:m11.depth.10}} lo {{t:small-blind}} va all-in con circa {{n:m11.push.10}} mani, ma il {{t:big-blind}} {{t:call|chiama}} solo con circa {{n:m11.call.10}}. Perché?"
    options:
      - { text: "Chi chiama non ha fold equity e gioca contro un {{t:range}} più forte di uno casuale", correct: true, why: "L'all-in vince anche quando l'avversario {{t:fold|folda}}. La {{t:call|chiamata}} vince solo allo showdown, e contro mani che sono già state selezionate. Da qui la vecchia regola: per {{t:call|chiamare}} ti serve una mano migliore che per andare all-in per primo." }
      - { text: "Il {{t:big-blind}} paga di più", why: "Entrambi rischiano lo stesso stack, e il {{t:big-blind|BB}} ha già il suo blind nel {{t:pot|piatto}}, quindi aggiunge persino meno." }
      - { text: "Il solver sbaglia", why: "È l'equilibrio del gioco all-in o {{t:fold|fold}}: nessun giocatore guadagna cambiando solo il proprio {{t:range}}. La differenza nasce dalla fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Si gioca con il {{t:bb-ante}}. Hai {{n:m11.depth.10}} in {{t:big-blind}} e hai versato un ante di {{n:m11.ante}}. Lo {{t:small-blind}} è andato all-in. Quanta equity ti serve per {{t:call|chiamare}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Aggiungi la stessa cifra ({{n:m11.call.10.cost}}), ma nel {{t:pot|piatto}} c'è anche l'ante: dopo la {{t:call|chiamata}} è di {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Per questo con l'ante {{t:call|chiami}} più largo: circa {{n:m11.call.10-ante}} mani invece di {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "È il prezzo senza ante. L'ante resta nel {{t:pot|piatto}}, quindi con la stessa cifra vinci di più: {{n:m11.call.10-ante.eq}}." }
      - { text: "Più che senza ante, perché hai versato di più", why: "L'ante è denaro già speso. Conta solo quanto devi ancora aggiungere e quanto puoi vincere." }
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
    prompt: "Tre giocatori, stack di {{n:m11.depth.3max}} ciascuno. Il Button è andato all-in e lo {{t:small-blind}} ha {{t:call|chiamato}}. In {{t:big-blind}} ti serve solo {{n:m11.3max.bb-two.eq}} di equity. {{t:call|Chiami}} più largo rispetto a quando all-in è andato solo il Button?"
    table: { position: BB }
    options:
      - { text: "No, più stretto", correct: true, why: "Il prezzo è migliore, ma giochi contro due {{t:range|range}}, tra cui quello di chi ha chiamato e ha una mano forte. Il solver qui {{t:call|chiama}} con circa {{n:m11.3max.call.bb-two}} mani, e quando all-in c'è solo il Button, con circa {{n:m11.3max.call.bb}}." }
      - { text: "Sì, perché il prezzo è molto migliore", why: "Un prezzo migliore non basta: contro due avversari l'equity delle mani più deboli cala in fretta. Il solver {{t:call|chiama}} solo con circa {{n:m11.3max.call.bb-two}} mani." }
      - { text: "Uguale, perché conta solo la tua mano", why: "Conta l'equity contro le mani degli avversari. Chi chiama l'all-in del Button ha un {{t:range}} più forte di quello del Button, quindi {{t:call|chiami}} più stretto." }
---
Quando un avversario va all-in e tu sei in {{t:big-blind}}, la decisione è semplice nella forma: {{t:call|chiami}} o {{t:fold|foldi}}. Dopo la {{t:call|chiamata}} non c'è altro gioco, quindi contano solo il prezzo e la tua equity contro il {{t:range}} di all-in.

## Il prezzo della {{t:call|chiamata}}

Il tuo blind è già nel {{t:pot|piatto}}. Con uno stack di {{n:m11.depth.10}} aggiungi {{n:m11.call.10.cost}}, e il {{t:pot|piatto}} dopo la {{t:call|chiamata}} è di {{n:m11.call.10.pot}}.

```formula
equity necessaria = cifra da aggiungere ÷ piatto dopo la chiamata
```

| Stack | Da aggiungere | {{t:pot|Piatto}} dopo la {{t:call|chiamata}} | Equity necessaria |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Più lo stack è corto, migliore è il prezzo, perché il tuo blind è una parte più grande dell'intero stack.

## {{t:call|Chiami}} più stretto di quanto {{t:shove|pushi}}

Se vai all-in per primo, vinci anche quando l'avversario {{t:fold|folda}}. Se {{t:call|chiami}}, vinci solo allo showdown, e contro mani che l'avversario ha scelto per andare all-in. Per questo per {{t:call|chiamare}} ti serve una mano migliore che per andare all-in per primo (in letteratura si chiama “gap concept”).

```range
call.bb-10
```

Con {{n:m11.depth.10}} lo {{t:small-blind}} va all-in con circa {{n:m11.push.10}} mani, mentre il {{t:big-blind}} {{t:call|chiama}} con circa {{n:m11.call.10}}. Mani come [[7s 6s]] le {{t:shove|pushi}} dallo {{t:small-blind}}, ma le {{t:fold|foldi}} contro un all-in: senza fold equity hanno troppa poca equity contro carte alte e {{t:pair|coppie}}. Per confronto, una tabella di un sito di formazione indica con {{n:m11.depth.10}} un {{t:range}} di {{t:call|chiamata}} di {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Uno stack più profondo significa una {{t:call|chiamata}} più cara e un {{t:range}} di all-in dell'avversario più stretto, quindi {{t:call|chiami}} meno spesso: circa {{n:m11.call.15}} con {{n:m11.depth.15}}, e con {{n:m11.depth.5}} addirittura circa {{n:m11.call.5}}.

## Quando dietro di te c'è ancora qualcuno

Con tre giocatori e stack di {{n:m11.depth.3max}} ciascuno, lo {{t:small-blind}} {{t:call|chiama}} l'all-in del Button solo con circa {{n:m11.3max.call.sb}} mani, anche se gli serve {{n:m11.3max.sb.eq}} di equity. Il {{t:big-blind}} nella stessa situazione, quando lo {{t:small-blind}} ha {{t:fold|foldato}}, aggiunge {{n:m11.3max.bb.cost}} a un {{t:pot|piatto}} di {{n:m11.3max.bb.pot}}, gli serve {{n:m11.3max.bb.eq}} di equity e {{t:call|chiama}} con circa {{n:m11.3max.call.bb}}. La differenza nasce soprattutto dal giocatore dietro di te (i prezzi differiscono poco): lo {{t:small-blind}} può {{t:call|chiamare}} e trovarsi contro una mano ancora più forte del {{t:big-blind}}.

```range
call.sb-vs-btn-3max
```

Quando all-in ci sono già due giocatori, il prezzo scende a {{n:m11.3max.bb-two.eq}}, eppure il {{t:big-blind}} {{t:call|chiama}} solo con circa {{n:m11.3max.call.bb-two}} mani. Contro due {{t:range|range}}, uno dei quali ha già {{t:call|chiamato}} l'all-in, le mani più deboli perdono equity in fretta.

```range
call.bb-vs-two-3max
```

## Con l'ante {{t:call|chiami}} più largo

L'ante resta nel {{t:pot|piatto}}, quindi con la stessa cifra vinci di più: con {{n:m11.depth.10}} e un {{t:bb-ante}} di {{n:m11.ante}} ti serve {{n:m11.call.10-ante.eq}} invece di {{n:m11.call.10.eq}}. Con l'ante anche l'avversario {{t:shove|pusha}} più largo, quindi il solver {{t:call|chiama}} con circa {{n:m11.call.10-ante}} mani.

```range
call.bb-10-ante
```

:::note {{t:range|Range}} in questa lezione
Le griglie riguardano il gioco a due giocatori: lo {{t:small-blind}} contro il {{t:big-blind}} quando tutti gli altri hanno {{t:fold|foldato}}, e contano le {{t:chips|fiches}}, non il denaro. Quando in un {{t:tournament|torneo}} contano i {{t:payout|premi}}, {{t:call|chiami}} ancora più stretto (prossima lezione).
:::
