---
id: m4.l1
module: m4
order: 1
title: "Quando qualcuno apre prima di te"
sub: "Fold, call o 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "Il {{t:cutoff|CO}} {{t:open|ha aperto}} a {{n:pf.open-size}}. Vuoi {{t:raise|rilanciare}} dal Button. A quanto?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "A {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|In posizione}} {{t:raise|rilanci}} a circa {{n:pf.3bet.size-ip}} l'{{t:open|apertura}}. È lo standard, e lascia un buon rapporto tra stack e {{t:pot|piatto}} al flop." }
      - { text: "A {{n:pf.3bet.too-small}}", why: "Troppo poco: l'avversario ottiene un ottimo prezzo per {{t:call|chiamare}} con quasi tutto e continuare a giocare." }
      - { text: "A {{n:pf.3bet.too-big}}", why: "Troppo per chi gioca {{t:in-position|in posizione}}: rischi di più, e le mani migliori dell'avversario comunque non {{t:fold|foldano}}." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Il Button {{t:open|ha aperto}} a {{n:pf.open-size}}, lo {{t:small-blind|small blind}} {{t:fold|ha foldato}}. Vuoi {{t:raise|rilanciare}} dal {{t:big-blind|big blind}}. A quanto?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "A {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Fuori posizione}} {{t:raise|rilanci}} a circa {{n:pf.3bet.size-oop}} l'{{t:open|apertura}}. Una dimensione maggiore toglie al Button un {{t:call|call}} economico {{t:in-position|in posizione}}." }
      - { text: "A {{n:pf.3bet.ip-total}}", why: "È la dimensione per un giocatore {{t:in-position|in posizione}}. {{t:out-of-position|Fuori posizione}} dai all'avversario un prezzo troppo buono." }
      - { text: "{{t:call|Chiamo}} soltanto", why: "Con KK vuoi costruire il {{t:pot|piatto}} subito: è la seconda mano migliore preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Il Button {{t:open|ha aperto}} a {{n:pf.open-size}}. Sei in {{t:small-blind|small blind}}. Quale piano è lo standard?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Rilancio}} o {{t:fold|foldo}}", correct: true, why: "Dopo un {{t:call|call}} giochi {{t:out-of-position|fuori posizione}}, e dietro di te c'è ancora il {{t:big-blind|big blind}}. Dallo {{t:small-blind|small blind}} contro le {{t:open|aperture}} dalle posizioni avanzate, i solver quasi sempre {{t:raise|rilanciano}} o {{t:fold|foldano}}." }
      - { text: "{{t:call|Chiamo}} largo, perché ho già mezzo blind nel {{t:pot|piatto}}", why: "Mezzo blind è poco. Un {{t:call|call}} {{t:out-of-position|fuori posizione}} con il {{t:big-blind|big blind}} alle spalle ha una scarsa {{t:equity-realization|realizzazione dell'equity}}: vinci una parte del {{t:pot|piatto}} minore di quanto indichi l'equity della mano, perché spesso {{t:fold|foldi}} prima dello showdown." }
      - { text: "{{t:fold|Foldo}} sempre", why: "Troppo stretto: il Button {{t:open|apre}} molto largo, quindi conviene {{t:raise|rilanciare}} con le mani forti e con una parte dei {{t:bluff|bluff}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Sei in {{t:big-blind|big blind}} contro un'{{t:open|apertura}} dal Button. Quale di queste mani è un tipico 3-bet come {{t:bluff|bluff}}?"
    table: { position: BB }
    options:
      - { text: "A5 dello stesso seme", correct: true, why: "Blocca AA e AK dell'avversario, e dopo un {{t:call|call}} può chiudere un {{t:flush|colore}} o una {{t:straight|scala}}. È un tipico {{t:bluff|bluff}} dalla parte bassa del {{t:range|range}} di {{t:call|call}}: dal {{t:big-blind|big blind}} fai 3-bet con le mani più forti più {{t:bluff|bluff}} come questo." }
      - { text: "K7 di semi diversi", why: "Con questa mano ti difendi con un {{t:call|call}}. Come 3-bet non blocca niente di importante e gioca male quando l'avversario {{t:call|chiama}}." }
      - { text: "{{t:pair|Coppia}} 22", why: "Le {{t:pair|coppie}} più piccole si difendono con un {{t:call|call}}: guadagnano quando chiudono un set (un {{t:three-of-a-kind|tris}} con una {{t:pocket-pair|coppia servita}}, cioè una {{t:pair|coppia}} formata dalle due {{t:hole-cards|carte personali}}), e un 3-bet con queste mani regge male un 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Quando qualcuno prima di te {{t:open|ha aperto}}, hai tre possibilità: {{t:fold|foldi}}, {{t:call|chiami}} oppure {{t:raise|rilanci}} ancora. Il nuovo {{t:raise|rilancio}} si chiama 3-bet, perché è la terza {{t:bet|puntata}} della mano (blind, {{t:open|apertura}}, {{t:raise|rilancio}}).

## Dimensione del 3-bet

{{t:in-position|In posizione}} {{t:raise|rilanci}} a circa {{n:pf.3bet.size-ip}} l'{{t:open|apertura}}, cioè, con un'{{t:open|apertura}} a {{n:pf.open-size}}, a {{n:pf.3bet.ip-total}}. {{t:out-of-position|Fuori posizione}}, per esempio dai blind contro un'{{t:open|apertura}} dal {{t:cutoff|CO}} o dal Button, a circa {{n:pf.3bet.size-oop}} l'{{t:open|apertura}}, cioè {{n:pf.3bet.oop-total}}. Una dimensione maggiore {{t:out-of-position|fuori posizione}} toglie all'avversario un {{t:call|call}} economico, con cui poi giocherebbe con il vantaggio della {{t:position|posizione}}.

## La {{t:position|posizione}} decide se {{t:call|chiamare}}

Secondo le soluzioni dei solver pubblicate, il Button contro un'{{t:open|apertura}} dal {{t:cutoff|CO}} di solito fa 3-bet con circa {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} delle mani e {{t:call|chiama}} solo con circa {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Contro un'{{t:open|apertura}} da {{t:utg|UTG}} (che in questa soluzione è minima, a {{n:pf.open-size.solver-utg}}) i {{t:call|call}} sono già un po' più numerosi dei 3-bet: circa {{n:pf.call-freq.btn-vs-utg}} contro {{n:pf.3bet-freq.btn-vs-utg}}. Il {{t:range|range}} di {{t:utg|UTG}} è forte, quindi un 3-bet riceve più spesso un 4-bet e vince meno spesso il {{t:pot|piatto}} subito.

```range
vs-open.btn-vs-co
```

La griglia mostra solo quali mani il Button gioca (con un 3-bet o con un {{t:call|call}}) e quali {{t:fold|folda}}. La divisione tra 3-bet e {{t:call|call}} imparala dai numeri qui sopra: il solver dell'app non {{t:call|chiama}} quasi mai in questo spot, quindi non la riproduce. In più di una decina di mani, ad es. A8s, 98s e 44, il solver dell'app gioca diversamente dalle soluzioni pubblicate, quindi gli esercizi non le valutano.

Dallo {{t:small-blind|small blind}} quasi sempre {{t:raise|rilanci}} o {{t:fold|foldi}}. Un {{t:call|call}} significa giocare {{t:out-of-position|fuori posizione}}, e il {{t:big-blind|big blind}} dietro di te può ancora {{t:raise|rilanciare}}. {{t:out-of-position|Fuori posizione}} una mano ha una peggiore **{{t:equity-realization|realizzazione dell'equity}}**: vince una parte del {{t:pot|piatto}} minore di quanto indichi la sua equity, perché {{t:fold|foldi}} più spesso prima dello showdown e ti è più difficile vincere il {{t:pot|piatto}} con una {{t:bet|puntata}}.

```range
vs-open.sb-vs-btn
```

Secondo la soluzione del solver pubblicata, lo {{t:small-blind|small blind}} contro il Button non {{t:call|chiama}} quasi niente: fa 3-bet con circa {{n:pf.3bet-freq.sb-vs-btn}} delle mani, la parte alta del {{t:range|range}} (tra cui 77+, AJo+, KQo, A5s, A4s, T9s), e {{t:fold|folda}} il resto. Il solver dell'app qui fa 3-bet con {{n:solver.3bet.sb-vs-btn}} delle mani, comprese le {{t:pair|coppie}} 55 e 66, che anche la soluzione pubblicata mette spesso in 3-bet; i suoi rari {{t:call|call}} la griglia li conta come {{t:fold|fold}}. In alcune mani, ad es. ATo, T9s e A4s, il solver dell'app gioca diversamente dalle soluzioni pubblicate, quindi gli esercizi non le valutano.

## {{t:range|Range}} {{t:linear|lineare}} o {{t:polarized|polarizzato}}

Con la {{t:position|posizione}} contro un'{{t:open|apertura}} dal {{t:cutoff|CO}}, fai 3-bet soprattutto con le mani migliori dall'alto e aggiungi qualche {{t:bluff|bluff}} con assi dello stesso seme (A5s, A4s), mentre le mani medie (ad es. 77–99, AJs, ATs, {{t:connectors|connettori}} dello stesso seme) le giochi in modo misto: con alcune fai 3-bet, con altre {{t:call|chiami}}. L'avversario {{t:call|chiama}} spesso, quindi vuoi una mano che giochi bene nel {{t:pot|piatto}} dopo un {{t:call|call}}. Le fonti chiamano un {{t:range|range}} così in modi diversi: alcune {{t:linear|lineare}} (costruito dalle mani più forti verso il basso), altre {{t:polarized|polarizzato}} (composto soprattutto da mani molto forti e {{t:bluff|bluff}}, quasi senza mani medie); conta di più con quali mani fai 3-bet e con quali {{t:call|chiami}}.

Dal {{t:big-blind|big blind}} contro il Button fai 3-bet con le mani più forti (TT+, AQ+, AJs+) più {{t:bluff|bluff}} dalla parte bassa del {{t:range|range}} di {{t:call|call}}: A5s, a volte A4s, e {{t:connectors|connettori}} dello stesso seme. Gli assi dello stesso seme bloccano AA e AK dell'avversario, e quando ricevono un {{t:call|call}} possono ancora chiudere un {{t:flush|colore}} o una {{t:straight|scala}}. Con le {{t:pair|coppie}} medie e piccole, KQo e gli assi di semi diversi (AJo–A9o) di solito fai solo {{t:call|call}}: dal {{t:big-blind|big blind}} entri spendendo poco e chiudi l'azione, quindi queste mani guadagnano di più dopo un {{t:call|call}}. La composizione dipende dal {{t:rake|rake}} e dalla dimensione del 3-bet, quindi 99, KQo e AJo vengono giocate in modi diversi. Contro un'{{t:open|apertura}} dello {{t:small-blind|small blind}} fai 3-bet soprattutto per {{t:value|valore}} (TT+, AJs+, parte di AQo e KQ), mentre con A5s e i {{t:connectors|connettori}} dello stesso seme di solito {{t:call|chiami}}.

Dallo {{t:small-blind|small blind}} giochi diversamente: 3-bet o {{t:fold|fold}}, con la parte alta del {{t:range|range}} in 3-bet.

:::note Da dove vengono queste regole
Le griglie del Button e dello {{t:small-blind|small blind}} provengono dal solver dell'app e corrispondono approssimativamente alle fonti (nello {{t:small-blind|small blind}}, tranne alcune mani che gli esercizi non valutano). Come fare 3-bet dal {{t:big-blind|big blind}} lo insegna una regola basata sui risultati pubblicati di altri solver, provenienti da diverse fonti indipendenti: la composizione dei 3-bet dal {{t:big-blind|big blind}} nel solver dell'app se ne discosta.
:::
