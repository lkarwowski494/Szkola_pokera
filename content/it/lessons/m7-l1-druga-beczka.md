---
id: m7.l1
module: m7
order: 1
title: "Second barrel"
sub: "Quando puntare di nuovo al turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}}. Al flop [[Jd 7c 3s]] {{t:bet|hai puntato}} un c-bet e lui {{t:call|ha chiamato}}. Quale carta al turn aiuta di più il tuo {{t:second-barrel|second barrel}}?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Sì: l'asso colpisce molte mani del tuo {{t:range}} di {{t:open|apertura}} (AK, AQ, AJ), mentre il {{t:big-blind}} {{t:call|ha chiamato}} il flop soprattutto con {{t:pair|coppie}} e {{t:draw|progetti}}. Ogni sua {{t:pair}} scende di un posto." }
      - { text: "[[8h]]", why: "No: l'otto si collega al flop. Dà una {{t:straight|scala}} a T9 e una {{t:two-pair}} a 87, cioè mani che il {{t:big-blind}} difende molto. È piuttosto una carta per lui." }
      - { text: "[[3h]]", why: "Non è la peggiore, ma cambia poco: migliora di rado il tuo {{t:range}}, e l'avversario con una {{t:pair|coppia}} ha ancora una {{t:pair|coppia}}. L'asso dà molto di più al tuo {{t:second-barrel|second barrel}}." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Perché un asso al turn dopo il flop [[Jd 7c 3s]] è utile al {{t:second-barrel|second barrel}} di chi {{t:open|apre}} dal Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Colpisce i tuoi AK e AQ, e la {{t:pair}} dell'avversario diventa la seconda o la terza {{t:pair|coppia}}", correct: true, why: "Sì: una carta alta colpisce più spesso il {{t:range}} di chi {{t:open|apre}}, e l'avversario che {{t:call|ha chiamato}} il flop con una {{t:pair|coppia}} di jack o di sette ora ha una mano più debole rispetto al {{t:board}}." }
      - { text: "Perché sull'asso l'avversario {{t:fold|folda}} sempre", why: "Non sempre: l'avversario con un asso o con un set pagherà. L'asso aumenta la probabilità di un {{t:fold}}, ma non garantisce nulla." }
      - { text: "Perché l'asso completa i {{t:draw|progetti}} dell'avversario", why: "No: su questo {{t:board}} l'asso non completa nessun {{t:flush|colore}} né alcuna {{t:straight|scala}} che l'avversario potrebbe avere. Aiuta perché si adatta al tuo {{t:range}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}}. Al flop {{t:bet|hai puntato}} un c-bet e lui {{t:call|ha chiamato}}. Il turn è un sette. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:check|fa check}}. Cosa fai?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Un sette su un {{t:board}} con un nove e un sei dà una {{t:straight|scala}} a T8 e 85 e una {{t:two-pair}} a 76 e 97, cioè a mani che il {{t:big-blind}} difende. Tu non hai né {{t:pair|coppia}} né {{t:draw|progetto}}. Rinunci al {{t:bluff}} e prendi una carta gratis." }
      - { text: "Punto {{n:ex.bet.three-quarters}}", why: "Questa carta si adatta al {{t:range}} dell'avversario, non al tuo, e non hai out verso una mano forte. Gioca il {{t:second-barrel|second barrel}} come {{t:bluff}} sulle carte che ti aiutano e con mani che possono migliorare." }
      - { text: "Punto {{n:ex.bet.pot}}", why: "Un grosso {{t:bluff}} su una carta che favorisce l'avversario rischia molto: dovrebbe {{t:fold|foldare}} più spesso che nel {{n:alpha.bet-pot}} dei casi, e dopo aver {{t:call|chiamato}} il flop ha molte {{t:pair|coppie}} e molti {{t:draw|progetti}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}} il c-bet al flop. Il turn è un asso. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:check|fa check}}. Cosa fai?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Punto {{n:ex.bet.three-quarters}}", correct: true, why: "Un buon {{t:second-barrel}}: l'asso si adatta al tuo {{t:range}} e hai un gutshot per la {{t:straight|scala}} (un dieci). Se l'avversario {{t:fold|folda}} una {{t:pair|coppia}}, vinci subito, e se {{t:call|chiama}}, puoi ancora prendere la carta buona." }
      - { text: "Punto {{n:ex.bet.quarter}}", sizeError: true, why: "Azione giusta, misura sbagliata: una puntata così economica l'avversario la {{t:call|chiamerà}} con qualsiasi {{t:pair|coppia}}, e questo {{t:bluff}} guadagna soprattutto dai {{t:fold|fold}}. Su una carta che ti aiuta punta grosso, come con le mani forti." }
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Va bene anche così: hai out e vedrai il river gratis, quindi il {{t:check}} non è un errore. In un esempio di solver pubblicato, un gutshot per la {{t:straight|scala}} massima al turn {{t:check|faceva check}}. Entrambe le giocate sono corrette." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}} il c-bet al flop. Il turn è un due. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:check|fa check}}. Cosa fai?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Non hai né {{t:pair|coppia}} né {{t:draw|progetto}}: tre cuori sono troppo pochi con una sola carta da scoprire, e per la {{t:straight|scala}} mancano due carte. Il due non cambia nulla, e l'avversario {{t:call|ha chiamato}} il flop su un {{t:board}} con un re, quindi spesso ha una {{t:pair|coppia}}. Rinunci al {{t:bluff}}." }
      - { text: "Punto {{n:ex.bet.three-quarters}}", why: "Un {{t:bluff}} senza out vince solo se l'avversario {{t:fold|folda}}. Dopo aver {{t:call|chiamato}} il flop ha molte {{t:pair|coppie}} (re, otto) che su un due vuoto non {{t:fold|folderanno}}." }
      - { text: "{{t:fold|Foldo}}", why: "L'avversario {{t:check|fa check}}, quindi puoi {{t:check|fare check}} gratis (regola del modulo 1). Il {{t:fold}} cede il {{t:pot|piatto}} senza motivo." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:bet|Punti}} un {{t:second-barrel|second barrel}} con un {{t:flush-draw|progetto di colore}} e l'avversario {{t:call|chiama}}. Che probabilità hai ancora?"
    options:
      - { text: "Circa {{n:odds.flush.turn-river}} di chiudere il {{t:flush|colore}} al river", correct: true, why: "Sì: è la seconda strada per vincere. {{n:outs.flush}} out su {{n:cards.unseen.turn}} carte sconosciute. Per questo il {{t:semi-bluff}} è meglio di un {{t:bluff}} senza out." }
      - { text: "Nessuna, il {{t:bluff}} non è riuscito", why: "Un {{t:bluff}} senza out non ha più chance, ma tu hai un {{t:draw|progetto}}: il {{t:flush|colore}} al river vince nonostante la {{t:call|chiamata}}." }
      - { text: "Circa {{n:odds.flush.flop-river}}", why: "Era la tua probabilità al flop, quando avevi davanti due carte. Al turn ne resta una: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}} il c-bet al flop. Il turn è un due. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:check|fa check}}. Cosa fai?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Una {{t:pair|coppia}} di nove è una mano media: batte i {{t:bluff}}, ma perde contro ogni re. Su una seconda puntata l'avversario {{t:fold|folderà}} le mani peggiori e pagherà con i re. {{t:check|Facendo check}}, tieni piccolo il {{t:pot|piatto}} e arrivi allo showdown." }
      - { text: "Punto {{n:ex.bet.three-quarters}}", why: "L'avversario {{t:call|ha già chiamato}} il flop su un {{t:board}} con un re. Le mani peggiori (otto, tre) {{t:fold|folderanno}} o pagheranno una volta, mentre quelle migliori pagheranno sempre. Una puntata così fa guadagnare le mani migliori." }
      - { text: "Punto per capire a che punto sono", why: "La puntata «per informazione» è un errore comune: la paghi, perché le mani migliori comunque non ti lasceranno andare, e quelle peggiori scapperanno. Punti per {{t:value|valore}} o come {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Hai aperto}} dal Button e il {{t:big-blind}} {{t:call|ha chiamato}} il c-bet al flop. Il turn è un due. Il {{t:pot|piatto}} è di {{n:ex.pot}}, l'avversario {{t:check|fa check}}. Cosa fai?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Punto per {{t:value|valore}}", correct: true, why: "Una {{t:top-pair|top pair}} con il miglior kicker è una mano forte. L'avversario {{t:call|ha chiamato}} il flop, quindi spesso ha un re più debole o degli otto, che pagheranno ancora una volta." }
      - { text: "{{t:check|Faccio check}}, tanto l'avversario non ha niente", why: "L'avversario {{t:call|ha chiamato}} il flop, quindi spesso ha una {{t:pair|coppia}}. {{t:check|Facendo check}}, perdi una {{t:bet}} che una mano peggiore avrebbe pagato." }
      - { text: "Vado all-in", why: "Le {{t:pair|coppie}} peggiori raramente pagheranno l'intero stack. Scegli una misura che venga pagata dai re più deboli e dagli otto." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Con quali mani {{t:bet|punti}} più spesso un {{t:second-barrel|second barrel}} al turn?"
    options:
      - { text: "Con mani forti e {{t:draw|progetti}}; le mani medie {{t:check|fanno check}}", correct: true, why: "Sì: le mani forti vogliono essere pagate, i {{t:draw|progetti}} vincono in due modi, e le mani medie non guadagnano nulla da un'altra {{t:bet|puntata}}." }
      - { text: "Con tutte, per non perdere l'{{t:initiative|iniziativa}}", why: "L'{{t:initiative|iniziativa}} da sola non vince. L'avversario {{t:call|ha chiamato}} il flop, quindi ha un {{t:range}} più forte, e le mani senza out e le {{t:pair|coppie}} medie perdono a forza di puntare di continuo." }
      - { text: "Solo con le mani più forti", why: "Allora l'avversario folderebbe ogni volta che punti e pagherebbe solo quando ti batte. I {{t:draw|progetti}} sono {{t:semi-bluff|semi-bluff}} naturali." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. Il {{t:pot|piatto}} è di {{n:ex.pot}}, {{t:bluff|bluffi}} con una mano che non vincerà quasi mai e {{t:bet|punti}} {{n:ex.bet.three-quarters}}. Quanto spesso l'avversario deve {{t:fold|foldare}} perché questo {{t:bluff}} vada in pari? Inserisci il numero in percentuale."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = puntata ÷ ({{t:pot}} + puntata) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Con gli out ti servono meno {{t:fold|fold}}, perché una parte delle {{t:call|chiamate}} la vincerai comunque al river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Perché, dopo la {{t:call|chiamata}} del c-bet, il {{t:range}} dell'avversario al turn è più forte che al flop?"
    options:
      - { text: "Perché ha {{t:fold|foldato}} le mani più deboli al flop", correct: true, why: "Sì: contro il c-bet {{t:fold|foldano}} le mani senza {{t:pair|coppia}} e senza {{t:draw|progetto}}. Restano {{t:pair|coppie}} e {{t:draw|progetti}}, quindi il {{t:second-barrel}} trova un {{t:range}} più forte rispetto alla prima puntata." }
      - { text: "Perché il turn lo aiuta sempre", why: "No: il turn è casuale e a volte aiuta te (ad es. un asso). A rafforzare il {{t:range}} dell'avversario è la sua stessa decisione al flop." }
      - { text: "Non lo è, ha lo stesso {{t:range}} di prima del flop", why: "Ogni decisione filtra una parte delle mani. Chi {{t:call|ha chiamato}} una {{t:bet}} di solito ha centrato qualcosa o ha un {{t:draw|progetto}}." }
---
Il {{t:second-barrel|second barrel}} è la seconda {{t:bet}} del giocatore che {{t:raise|ha rilanciato}} prima del flop: c-bet al flop, {{t:call}}, e poi puntata al turn. Al turn non ti chiedi solo «ho una mano», ma anche «questa carta aiuta me o l'avversario».

## L'avversario {{t:call|ha chiamato}}, quindi è più forte

Contro il c-bet l'avversario {{t:fold|folda}} le mani senza {{t:pair|coppia}} e senza {{t:draw|progetto}}. Chi {{t:call|ha chiamato}} di solito ha una {{t:pair|coppia}} o un {{t:draw|progetto}}, a volte carte alte con un backdoor (come nella difesa di M6). Per questo il {{t:second-barrel}} trova un {{t:range}} più forte rispetto al primo, e non punti una seconda volta con tutto.

## Quale carta aiuta

- **Una carta alta su un {{t:board}} più basso** (asso, re) di solito aiuta chi {{t:open|apre}}: colpisce i suoi AK, AQ, KQ, e ogni {{t:pair}} dell'avversario scende di un posto. Su queste carte punti una seconda volta più spesso, anche come {{t:bluff}}.
- **Una carta bassa che si collega al {{t:board}}**, ad es. un sette su [[9h 6c 2d]], aiuta il {{t:big-blind|big blind}}: dà {{t:straight|scale}} e {{t:two-pair|doppie coppie}} alle mani che difende di più.
- **Una carta vuota**, ad es. un due su [[Kd 8c 3s]], cambia poco. Decide la tua mano.

## Con cosa puntare una seconda volta

Punti con mani forti (per {{t:value|valore}}) e con {{t:draw|progetti}} (come {{t:semi-bluff}}). Il {{t:semi-bluff}} vince in due modi: quando l'avversario {{t:fold|folda}} o quando chiudi il punto al river. Con le mani senza {{t:pair|coppia}} e senza out rinunci più spesso, perché vincono solo sul fold, a meno che non blocchino le mani con cui l'avversario pagherà. Quando l'avversario può rispondere con un {{t:raise|rilancio}}, il solver {{t:bluff|bluffa}} anche con mani senza out.

Un {{t:bluff}} senza chance va in pari quando l'avversario {{t:fold|folda}} in una quota di casi pari a puntata ÷ ({{t:pot}} + puntata) (alpha di M6). Con una puntata di 3/4 del {{t:pot|piatto}} è {{n:alpha.bet-three-quarters}}, con mezzo {{t:pot|piatto}} {{n:alpha.bet-half}}.

## Le mani medie {{t:check|fanno check}}

Una {{t:second-pair|seconda coppia}} o una {{t:top-pair}} con kicker debole batte i {{t:bluff}}, ma perde contro {{t:pair|coppie}} migliori. Su una seconda puntata le mani peggiori {{t:fold|folderanno}} e quelle migliori pagheranno. {{t:check|Fai check}}, tieni piccolo il {{t:pot|piatto}} e arrivi allo showdown.

:::note Da dove vengono queste regole
Le direzioni generali (le carte alte di solito favoriscono il {{t:second-barrel|second barrel}}, {{t:bluff}} con out invece che senza out, le mani medie {{t:check|fanno check}}) sono euristiche tratte da materiali didattici e analisi di solver. Valgono per stack di circa {{n:format.stack}}. È una semplificazione: il solver {{t:bluff|bluffa}} anche con una parte delle mani senza out, quando bloccano il valore dell'avversario o quando l'avversario può rispondere con un {{t:raise|rilancio}}. L'app non indica in percentuale con che frequenza puntare, perché questi numeri dipendono dalla mano specifica nei risultati dei solver.
:::
