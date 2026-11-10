---
id: m4.l4
module: m4
order: 4
title: "Limper"
sub: "Isolamento: dimensione e range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un giocatore prima di te ha solo pareggiato il {{t:big-blind}} (limp). Vuoi {{t:raise|rilanciare}} dal Button. A quanto?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "A {{n:pf.iso.one-limper}}", correct: true, why: "Base {{n:pf.iso.base}} più {{n:pf.iso.per-limper}} per limper. Questa dimensione toglie al limper un buon prezzo." }
      - { text: "A {{n:pf.min-raise}}", why: "Un {{t:raise|rilancio}} minimo dà al limper un ottimo prezzo e quasi mai vince subito il {{t:pot|piatto}}." }
      - { text: "A {{n:pf.open-size}}, come una normale {{t:open|apertura}}", why: "Il limper ha già messo un blind, quindi il {{t:pot|piatto}} è più grande. Il {{t:raise|rilancio}} deve essere più grande di una normale {{t:open|apertura}}." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Due giocatori prima di te hanno solo pareggiato il {{t:big-blind}}. Vuoi {{t:raise|rilanciare}} dal {{t:cutoff|CO}}. A quanto?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "A {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} più {{n:pf.iso.per-limper}} per ciascuno dei due limper." }
      - { text: "A {{n:pf.iso.one-limper}}", why: "Questa è la dimensione contro un limper. Ogni limper in più aggiunge {{n:pf.iso.per-limper}}." }
      - { text: "Chiamo soltanto", why: "AQ dello stesso seme è una mano da {{t:raise|rilanciare}} {{t:value|per valore}}. Chiamare cede l'{{t:initiative|iniziativa}} e fa entrare tutti a poco prezzo." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un giocatore fa limp e tutti {{t:fold|foldano}} fino a te sullo {{t:small-blind}}. Vuoi {{t:raise|rilanciare}}. A quanto?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "A {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Fuori posizione}} aggiungi ancora {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} più {{n:pf.iso.per-limper}} per limper più {{n:pf.iso.oop-extra}}." }
      - { text: "A {{n:pf.iso.one-limper}}", why: "Questa è la dimensione {{t:in-position}}. {{t:out-of-position|Fuori posizione}} {{t:raise|rilanci}} un po' di più, così l'avversario {{t:fold|folda}} più spesso o paga di più." }
      - { text: "Chiamo soltanto", why: "Con KK costruisci sempre il {{t:pot|piatto}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un giocatore prima di te ha solo pareggiato il {{t:big-blind}} (limp). Sei sul Button. Cosa fai?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Rilancio}} a {{n:pf.iso.one-limper}}", correct: true, why: "AJ è una mano da {{t:isolation|isolamento}}: domina molte mani con cui un giocatore più debole fa limp, e dopo il flop hai la {{t:position|posizione}}. Dimensione: {{n:pf.iso.base}} più {{n:pf.iso.per-limper}} per limper." }
      - { text: "{{t:raise|Rilancio}} a {{n:pf.min-raise}}", sizeError: true, why: "Azione giusta, ma un {{t:raise|rilancio}} minimo dà al limper un ottimo prezzo, quindi quasi mai {{t:fold|folderà}} e non giochi testa a testa contro di lui. {{t:raise|Rilanci}} a {{n:pf.iso.one-limper}}." }
      - { text: "Chiamo", why: "Cedi l'{{t:initiative|iniziativa}} e fai entrare i blind a poco prezzo. Con una mano che domina il limper, vuoi costruire il {{t:pot|piatto}}." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto: contro un limper il Button {{t:isolation|isola}} circa il {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} delle mani, e AJ ci rientra con ampio margine." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Tre giocatori prima di te hanno solo pareggiato il {{t:big-blind}}. Sei sul Button. Cosa fai?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Chiamo", correct: true, why: "Contro molti limper i {{t:connectors|connettori}} dello stesso seme sono mani speculative: vedi il flop a poco prezzo {{t:in-position}} e puoi chiudere una mano forte. Una fonte consiglia qui di chiamare; un'altra suggerisce di evitarlo, quindi accettiamo anche il {{t:fold}}." }
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Anche questo è corretto: una fonte suggerisce di non chiamare, ma di {{t:raise|rilanciare}} o {{t:fold|foldare}}, e 76s non è una mano da {{t:raise|rilanciare}} {{t:value|per valore}}. Un'altra fonte consiglia di chiamare, quindi accettiamo entrambe le giocate." }
      - { text: "{{t:raise|Rilancio}} a {{n:pf.iso.two-limpers}}", why: "Con tre limper un {{t:raise|rilancio}} di {{t:bluff}} raramente porta a casa il {{t:pot|piatto}}, e la dimensione dovrebbe essere ancora più grande. 76s non è una mano da {{t:raise|rilanciare}} {{t:value|per valore}}." }
---
Il limp è l'ingresso nella mano pareggiando soltanto il {{t:big-blind}}. I professionisti raramente fanno limp per primi (regola del modulo 3), quindi i limper ai microlimiti sono di solito giocatori più deboli. {{t:raise|Rilanciare}} un limper si chiama {{t:isolation|isolamento}}: vuoi giocare testa a testa contro di lui, idealmente {{t:in-position}}.

:::note Da dove vengono queste regole
Il solver dell'app non gioca i limp, quindi questa lezione si basa su materiali didattici. Le regole sono indicate come euristiche.
:::

## Dimensione dell'{{t:isolation|isolamento}}

Online {{t:raise|rilanci}} a {{n:pf.iso.base}} più {{n:pf.iso.per-limper}} per ogni limper: contro uno a {{n:pf.iso.one-limper}}, contro due a {{n:pf.iso.two-limpers}}. {{t:out-of-position|Fuori posizione}} aggiungi ancora {{n:pf.iso.oop-extra}}. Non rilanciare mai il minimo: il limper avrebbe un ottimo prezzo e quasi mai {{t:fold|folderebbe}}.

## {{t:range|Range}} di {{t:isolation|isolamento}}

Sul Button contro un limper {{t:isolation|isoli}} largo, circa il {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} delle mani: {{t:pair|coppie}} medie e alte, assi dello stesso seme, assi forti di semi diversi, carte alte e parte dei {{t:connectors|connettori}} dello stesso seme. Più la tua {{t:position}} è iniziale e più sono i limper, più stretto è il {{t:range}}: contro tre limper {{t:raise|rilanci}} soprattutto {{t:value|per valore}}.

Con mani speculative, come le {{t:pair|coppie}} basse e i {{t:connectors|connettori}} dello stesso seme, contro molti limper puoi chiamare {{t:in-position}}. Qui le fonti divergono: una consiglia di chiamare, l'altra suggerisce di evitarlo; negli esercizi accettiamo entrambe le giocate, il call e il {{t:fold}}.
