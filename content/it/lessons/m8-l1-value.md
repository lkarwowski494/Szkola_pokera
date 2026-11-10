---
id: m8.l1
module: m8
order: 1
title: "Value bet al river"
sub: "Punta quando pagano mani peggiori"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: tutte le carte sono già sul {{t:board}}. A che serve puntare?"
    options:
      - { text: "Perché paghino mani peggiori o perché mani migliori {{t:fold|foldino}}", correct: true, why: "Al river non ci sono più carte da scoprire, quindi una puntata ha solo due scopi: il valore (pagano mani peggiori) o il {{t:bluff}} (mani migliori {{t:fold|foldano}}). Una puntata che non fa nessuna delle due cose costa e basta." }
      - { text: "Per togliere all'avversario la possibilità di migliorare", why: "Questo è un motivo per puntare al flop e al turn. Al river l'avversario non pescherà più nulla: la sua mano è definitiva." }
      - { text: "Per verificare se la mia mano è la migliore", why: "Una puntata non è una domanda. Quando punti con una mano media, le mani peggiori di solito {{t:fold|foldano}} e pagano quelle migliori, quindi «lo scopri» con i tuoi soldi. Gratis lo scopri facendo {{t:check}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, l'avversario {{t:check|fa check}}. Stimi che pagherà la tua puntata in {{n:value.ex.calls}} casi: {{n:value.ex.many}} volte con una mano peggiore, {{n:value.ex.few}} volte con una migliore. Non può {{t:raise|rilanciarti}}. Punti?"
    options:
      - { text: "Sì, è una puntata per {{t:value|valore}}", correct: true, why: "Vinci la puntata {{n:value.ex.many}} volte e la perdi {{n:value.ex.few}} volte: al netto restano {{n:value.ex.net}} puntate. Più del {{n:value.threshold}} delle {{t:call|chiamate}} sono mani peggiori, quindi puntare rende più del {{t:check}}." }
      - { text: "No, perché a volte pagherà con una mano migliore", why: "Una mano migliore pagherà sempre in una parte dei casi. Conta se le {{t:call|chiamate}} peggiori sono più di quelle migliori: qui sono {{n:value.ex.many}} contro {{n:value.ex.few}}." }
      - { text: "Solo se l'avversario non ha mai una mano migliore", why: "Così punteresti solo con il nuts e rinunceresti a molto valore. Basta che più del {{n:value.threshold}} delle {{t:call|chiamate}} siano mani peggiori." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, l'avversario {{t:check|fa check}}. Pagherà la tua puntata in {{n:value.ex.calls}} casi: {{n:value.ex.few}} volte con una mano peggiore, {{n:value.ex.many}} volte con una migliore. Le mani peggiori dell'avversario che {{t:fold|foldano}} perderebbero comunque contro di te allo showdown. Che cosa fai?"
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "La puntata vincerebbe {{n:value.ex.few}} volte e perderebbe {{n:value.ex.many}} volte: al netto perdi {{n:value.ex.net}} puntate. Facendo {{t:check}} vinci il {{t:pot|piatto}} contro le stesse mani peggiori, solo senza pagare quelle migliori." }
      - { text: "Punto, perché ho una mano discreta", why: "La forza della mano da sola non basta. Conta chi paga: qui la maggior parte delle {{t:call|chiamate}} sono mani migliori, quindi la puntata perde." }
      - { text: "Punto forte, così le mani migliori {{t:fold|foldano}}", why: "Sarebbe un {{t:bluff}} con una mano che spesso vince allo showdown. Le mani migliori {{t:fold|foldano}} di rado al river, e dopo il {{t:check}} batterai comunque quelle peggiori." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. La tua puntata verrà {{t:call|chiamata}} da {{n:value.ex.many}} mani peggiori e {{n:value.ex.few}} migliori. Quante puntate guadagni al netto su queste {{n:value.ex.calls}} {{t:call|chiamate}}? Inserisci un numero."
    answer: value.ex.net
    explanation: "Ogni {{t:call}} con una mano peggiore è una puntata vinta, ogni {{t:call}} con una migliore è una puntata persa: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Il {{t:pot|piatto}} lo vinceresti contro le mani peggiori anche facendo {{t:check}}, quindi conti solo le puntate."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}. Hai puntato al flop e al turn e ogni volta hai ricevuto una {{t:call|chiamata}}. River, il {{t:big-blind}} {{t:check|fa check}}. Che cosa fai?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Punto per {{t:value|valore}}", correct: true, why: "{{t:top-pair|Top pair}} con il kicker migliore. Un avversario che {{t:call|ha chiamato}} due {{t:street}} ha molti re più deboli (KQ, KJ, KT) e molti 9, e su questo {{t:board}} c'erano pochi {{t:draw|progetti}}. Le mani peggiori pagheranno molto più spesso di quelle migliori ({{t:two-pair}}, set). Di solito la {{t:top-pair}} regge due {{t:value|street di valore}} (M9); qui anche una terza, perché l'avversario paga con re più deboli." }
      - { text: "{{t:check|Faccio check}}, perché l'avversario potrebbe avere un set", why: "Potrebbe, ma succede di rado. Facendo {{t:check}} perdi la puntata di tutti i re più deboli con cui pagherebbe. Conti chi {{t:call|chiamerà}}, non se esiste una mano migliore." }
      - { text: "{{t:check|Faccio check}}, così l'avversario bluffa", why: "Un avversario che {{t:call|ha chiamato}} due volte ha soprattutto {{t:pair|coppie}} e {{t:bluff|bluffa}} di rado dopo il tuo {{t:check}}. Guadagni in modo più sicuro puntando contro i suoi re più deboli." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}. Al flop hai fatto c-bet e hai ricevuto una {{t:call|chiamata}}, al turn {{t:check|avete fatto check}} entrambi. River, il {{t:big-blind}} {{t:check|fa check}}. Che cosa fai?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "La {{t:second-pair|seconda coppia}} con kicker debole batte i {{t:draw|progetti}} mancati e le {{t:pair|coppie}} più deboli, ma queste mani su una puntata {{t:fold|foldano}}. Pagheranno soprattutto re e 10 migliori. {{t:check|Fai check}} e vedi lo showdown gratis." }
      - { text: "Punto per {{t:value|valore}}", why: "Chi pagherà? Le mani senza {{t:pair|coppia}} {{t:fold|foldano}}, mentre re e 10 migliori {{t:call|chiamano}}. La maggior parte delle {{t:call|chiamate}} sarebbe migliore della tua mano." }
      - { text: "Punto forte come {{t:bluff}}", why: "La tua mano vince spesso allo showdown. {{t:bluff|Bluffando}} rinunci a quella vincita: le mani peggiori {{t:fold|folderebbero}} comunque, e i re {{t:fold|foldano}} di rado." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}. Al flop hai fatto c-bet e hai ricevuto una {{t:call|chiamata}}, al turn {{t:check|avete fatto check}} entrambi. River, il {{t:big-blind}} {{t:check|fa check}}. Hai {{t:top-pair}} con kicker 10. Quali mani pagheranno una puntata piccola pur essendo peggiori della tua?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Coppie di 8, di 4 e donne con kicker più debole", correct: true, why: "Queste mani hanno chiamato al flop e hanno una {{t:pair|coppia}}, quindi spesso pagheranno una puntata piccola. Perdi contro donna con kicker migliore, {{t:two-pair}}, set e {{t:straight|scale}} (A5, 65), ma le {{t:call|chiamate}} peggiori sono di più." }
      - { text: "Mani senza {{t:pair|coppia}}", why: "Una mano senza {{t:pair|coppia}} paga di rado una puntata al river; a volte paga un asso alto, ma qui le {{t:pair|coppie}} peggiori sono molte di più." }
      - { text: "Nessuna, pagano solo mani migliori", why: "Troppo prudente: il {{t:big-blind}} difende molte {{t:pair|coppie}} più basse della donna. Dopo il {{t:check}} al turn, il suo {{t:range}} ne contiene parecchie." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Stessa situazione: hai {{t:top-pair}} con kicker 10, il {{t:big-blind}} fa check al river. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}. Che cosa fai?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Punto {{n:ex.bet.quarter}}, cioè 1/4 del {{t:pot|piatto}}", correct: true, why: "Thin value: batti poco più della metà delle mani che pagheranno. Una puntata piccola viene {{t:call|chiamata}} da coppie di 8, di 4 e da donne più deboli, quindi le {{t:call|chiamate}} peggiori restano più di quelle migliori." }
      - { text: "Punto {{n:ex.bet.pot}}, cioè l'intero {{t:pot|piatto}}", sizeError: true, why: "Azione giusta, dimensione sbagliata: su una puntata pari al {{t:pot|piatto}} le coppie di 8 e di 4 {{t:fold|foldano}}, e pagano soprattutto donne migliori, {{t:two-pair}} e set. Allora la maggior parte delle {{t:call|chiamate}} è migliore di te. La thin value si punta piccola." }
      - { text: "{{t:check|Faccio check}}", why: "Perdi valore: l'avversario ha molte {{t:pair|coppie}} più basse che pagherebbero una puntata piccola. Il {{t:check}} regala quei soldi." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Un amico dice: «Al river con una {{t:pair|coppia}} media punto per capire a che punto sono». Che cosa non va in questa idea?"
    options:
      - { text: "Le mani peggiori {{t:fold|foldano}} e quelle migliori pagano", correct: true, why: "Dopo una puntata così, le mani che batti {{t:fold|foldano}}, mentre quelle contro cui perdi pagano o {{t:raise|rilanciano}}. L'informazione la ottieni gratis facendo {{t:check}}, perché sei in {{t:position|posizione}} e l'avversario mostrerà le carte allo showdown." }
      - { text: "Niente, è un buon modo per ottenere informazioni", why: "Qui l'informazione costa una puntata che di solito perdi. Dopo il {{t:check}} vedrai la mano dell'avversario senza pagare altro." }
      - { text: "La puntata dovrebbe essere più grande", why: "Una puntata più grande peggiora le cose: ancora più mani peggiori {{t:fold|folderanno}}, e quelle migliori continueranno a pagare." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Il tuo {{t:flush-draw}} non è entrato. Al river stai pensando di puntare. Che tipo di puntata sarebbe?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Un {{t:bluff}}", correct: true, why: "Hai solo la donna come carta più alta. Nessuna mano che ti {{t:call|chiama}} sarà peggiore, quindi la puntata può vincere solo se l'avversario {{t:fold|folda}}. È un {{t:bluff}} (la scelta dei {{t:bluff}} è trattata nelle prossime lezioni)." }
      - { text: "Una puntata per {{t:value|valore}}", why: "Una puntata per {{t:value|valore}} richiede che paghino mani peggiori. Con la sola donna, quasi nessuna mano peggiore ti {{t:call|chiamerà}}." }
      - { text: "Thin value", why: "La thin value è una puntata con una mano che batte poco più della metà delle {{t:call|chiamate}}. La tua mano non batte quasi nessuna {{t:call|chiamata}}." }
---
Al river tutte le carte sono già sul {{t:board}}. Nessuno pescherà più nulla, quindi una puntata può fare solo due cose: far pagare una mano peggiore (**valore**) o far {{t:fold|foldare}} una migliore (**{{t:bluff}}**). In questa lezione ti occupi del valore, nelle prossime dei {{t:bluff}} e delle chiamate.

## La soglia: più di metà delle {{t:call|chiamate}}

Quando punti in {{t:position|posizione}} e l'avversario può solo {{t:call|chiamare}} o {{t:fold|foldare}}, conti esclusivamente le mani con cui pagherà:

```formula
puntata per valore: chiamate peggiori > chiamate migliori
```

Ogni {{t:call}} con una mano peggiore vince una puntata. Ogni {{t:call}} con una mano migliore perde una puntata. Quando l'avversario {{t:fold|folda}} una mano peggiore, vinci lo stesso {{t:pot|piatto}} che avresti vinto facendo {{t:check}}. Per questo la puntata guadagna quando più del **{{n:value.threshold}}** delle mani che pagano sono peggiori della tua.

Esempio: su {{n:value.ex.calls}} {{t:call|chiamate}}, {{n:value.ex.many}} sono mani peggiori e {{n:value.ex.few}} migliori. Al netto guadagni {{n:value.ex.net}} puntate. Se la proporzione fosse inversa, perderesti altrettanto.

## Chi pagherà

Non ti chiedi «ho una buona mano?», ma «con che cosa pagherà l'avversario?». Aiuta passare in rassegna il suo {{t:range}}:

- le mani senza {{t:pair|coppia}} pagano di rado; a volte paga un asso alto, che batte i {{t:bluff}},
- le {{t:pair|coppie}} più basse e i kicker più deboli pagano spesso una puntata piccola,
- le mani migliori pagheranno sempre, e a volte {{t:raise|rilanceranno}}.

Quando l'avversario può {{t:raise|rilanciarti}} e a quel punto dovresti {{t:fold|foldare}}, la soglia è ancora più alta: la puntata guadagna solo se le {{t:call|chiamate}} peggiori prevalgono nettamente.

## Thin value: piccola, ma pagata

La thin value (valore sottile) è una puntata con una mano che batte poco più della metà delle {{t:call|chiamate}}, ad esempio {{t:top-pair}} con kicker medio. Questa puntata la fai **più piccola** che con una mano forte, di solito circa 1/4–1/2 del {{t:pot|piatto}}: una puntata piccola la pagano anche le {{t:pair|coppie}} più deboli, mentre su una grande {{t:fold|foldano}} e restano solo le mani migliori.

È una semplificazione: senza rischio di check-raise, un solver punta la thin value anche intorno a 1/4 del {{t:pot|piatto}}; con questo rischio, in {{t:position|posizione}}, scende di rado sotto 1/2 del {{t:pot|piatto}}.

## La mano media fa {{t:check}}

Hai una mano media {{t:in-position}}, ad esempio la {{t:second-pair|seconda coppia}}. Su una puntata le mani peggiori dell'avversario {{t:fold|foldano}}, mentre quelle migliori pagano. La puntata trasforma così la tua mano in un {{t:bluff}}. {{t:check|Fai check}}: vincerai lo showdown contro le mani peggiori senza pagare quelle migliori.

:::note Da dove vengono queste regole
La soglia di più di metà delle {{t:call|chiamate}} è pura matematica (puntata {{t:in-position}}, senza {{t:raise|rilancio}} e senza rake). La dimensione della thin value e il {{t:check}} con una mano media provengono da analisi pubblicate di solver ({{t:tournament|tornei}} con stack più corti) e da materiali didattici.
:::
