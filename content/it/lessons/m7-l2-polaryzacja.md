---
id: m7.l2
module: m7
order: 2
title: "Polarizzazione"
sub: "Puntata grande: mani forti e semi-bluff"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Quale {{t:range|range}} di puntata al turn è {{t:polarized|polarizzato}}?"
    options:
      - { text: "Set, {{t:two-pair|doppie coppie}} e {{t:draw|progetti}}, senza {{t:pair|coppie}} medie", correct: true, why: "Sì: un {{t:range|range}} {{t:polarized|polarizzato}} ha due poli, mani molto forti e {{t:semi-bluff|semi-bluff}}. Il centro, cioè le mani medie, non c'è: queste mani fanno {{t:check|check}}." }
      - { text: "{{t:top-pair|Top pair}}, {{t:pair|coppie}} medie e {{t:pair|coppie}} più deboli", why: "Qui non c'è nessun polo: mancano le mani molto forti e i {{t:semi-bluff|semi-bluff}}, ci sono solo {{t:pair|coppie}} dall'alto verso il basso. È più vicino a un {{t:range|range}} {{t:linear|lineare}}, che punta soprattutto con mani di valore, di solito con un sizing piccolo, e non grande al turn." }
      - { text: "Solo {{t:bluff|bluff}}", why: "Un {{t:range|range}} senza mani forti l'avversario lo riconosce facilmente e {{t:call|chiamerà}}. Un {{t:range|range}} {{t:polarized|polarizzato}} unisce i {{t:bluff|bluff}} a mani molto forti." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Sul flop {{t:dry|secco}} [[Ks 7d 2c]] hai puntato piccolo con quasi tutte le mani: dal set alle {{t:pair|coppie}} deboli. Come si chiama questo {{t:range|range}} di puntata?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Lineare}}", correct: true, why: "Sì: le mani forti e medie puntano insieme, con un sizing piccolo. È il piano dell'M5 su un flop {{t:dry|secco}} e alto, dove hai il {{t:range-advantage|vantaggio di range}}." }
      - { text: "{{t:polarized|Polarizzato}}", why: "Un {{t:range|range}} {{t:polarized|polarizzato}} non ha mani medie: puntano solo le mani molto forti e i {{t:bluff|bluff}}. Qui hanno puntato anche le {{t:pair|coppie}} deboli." }
      - { text: "Limitato", why: "Un {{t:range|range}} limitato è quello in cui mancano le mani più forti. Tu hai puntato anche con i set." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Perché a una {{t:pair|coppia}} media non piace una puntata grande al turn?"
    options:
      - { text: "Perché le mani peggiori {{t:fold|folderanno}} e pagheranno quelle migliori", correct: true, why: "Sì: una puntata grande con una {{t:pair|coppia}} media guadagna solo quando paga una mano peggiore, e queste mani contro una puntata grande di solito {{t:fold|foldano}}. Restano le {{t:call|chiamate}} delle mani che ti battono." }
      - { text: "Perché una puntata grande è sempre un {{t:bluff|bluff}}", why: "No: anche le mani più forti {{t:bet|puntano}} grande. Il problema della {{t:pair|coppia}} media è chi la paga." }
      - { text: "Perché una {{t:pair|coppia}} media non può vincere", why: "Può: batte i {{t:bluff|bluff}} e le {{t:pair|coppie}} peggiori. Per questo fa {{t:check|check}} e arriva allo showdown a poco prezzo." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind|big blind}} ha {{t:call|chiamato}} il c-bet sul flop. Al turn esce un due. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario fa {{t:check|check}}. Hai un set. Cosa fai?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Punto {{n:ex.bet.three-quarters}}", correct: true, why: "Sì: l'avversario può avere un {{t:draw|progetto}} a {{t:flush|colore}} (due cuori) e a {{t:straight|scala}} (es. 65, T9). Contro una puntata di 3/4 del {{t:pot|piatto}} un {{t:flush-draw|progetto di colore}} ha bisogno di {{n:eq.bet-three-quarters}} di equity, e il {{t:flush|colore}} arriva in circa il {{n:odds.flush.turn-river}} dei casi. Contro il tuo set ha ancora meno: [[4h]] e [[2h]] ti danno il {{t:full-house|full}}, quindi gli restano {{n:outs.flush.vs-set}} out puliti, circa {{n:odds.flush.vs-set}}. Paga troppo." }
      - { text: "Punto {{n:ex.bet.quarter}}", sizeError: true, why: "Azione giusta, sizing sbagliato: contro una puntata di 1/4 del {{t:pot|piatto}} un {{t:draw|progetto}} ha bisogno solo di {{n:eq.bet-quarter}} di equity, quindi ottiene un buon prezzo. Con una mano molto forte su un {{t:board|board}} con un {{t:flush-draw|progetto di colore}} punti grande." }
      - { text: "{{t:check|Check}}", why: "Una carta gratis è un regalo per i {{t:draw|progetti}}, e tu non costruisci il {{t:pot|piatto}} prima del river. Un set su un {{t:board|board}} con un {{t:flush-draw|progetto di colore}} punta." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind|big blind}} ha {{t:call|chiamato}} il c-bet sul flop. Al turn esce un tre. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario fa {{t:check|check}}. Cosa fai?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Punto {{n:ex.bet.three-quarters}}", correct: true, why: "Sì: un {{t:flush-draw|progetto di colore}} con due carte alte è un buon {{t:semi-bluff|semi-bluff}}. Punti con lo stesso sizing grande delle mani forti, quindi l'avversario non distingue il {{t:bluff|bluff}} dal valore." }
      - { text: "Punto {{n:ex.bet.quarter}}", sizeError: true, why: "Azione giusta, sizing sbagliato: una puntata così economica l'avversario la {{t:call|chiamerà}} con qualsiasi {{t:pair|coppia}}, e un {{t:semi-bluff|semi-bluff}} guadagna soprattutto dai {{t:fold|fold}}. Se le tue puntate piccole significassero {{t:draw|progetti}} e quelle grandi mani forti, l'avversario lo sfrutterebbe facilmente." }
      - { text: "{{t:check|Check}}", correct: true, why: "Va bene anche così: vedi il river gratis e chiudi il {{t:flush|colore}} nel {{n:odds.flush.turn-river}} dei casi. Di solito però puntare è meglio, perché un {{t:draw|progetto}} con carte alte è uno dei migliori {{t:semi-bluff|semi-bluff}}, e facendo {{t:check|check}} rinunci a vincere subito il {{t:pot|piatto}}." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind|big blind}} ha {{t:call|chiamato}} il c-bet sul flop. Al turn esce un cinque. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario fa {{t:check|check}}. Cosa fai?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "{{t:top-pair|Top pair}} con kicker debole è una mano media. Una puntata grande la pagheranno soprattutto i re migliori (AK, KQ, KJ), mentre le mani peggiori {{t:fold|folderanno}}. Facendo {{t:check|check}} arrivi allo showdown a poco prezzo." }
      - { text: "Punto {{n:ex.bet.three-quarters}}", why: "Una puntata grande si adatta a un {{t:range|range}} {{t:polarized|polarizzato}}. Con questa mano guadagni soprattutto dalle mani che ti battono." }
      - { text: "Punto {{n:ex.bet.pot}}", why: "Un {{t:pot|piatto}} ancora più grande con una mano di forza media: le mani peggiori {{t:fold|folderanno}} quasi sempre, e quelle migliori pagheranno." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, punti {{n:ex.bet.three-quarters}} con una mano molto forte. Di quale percentuale di equity ha bisogno l'avversario con un {{t:draw|progetto}} per {{t:call|chiamare}}? Inserisci un numero."
    answer: eq.bet-three-quarters
    explanation: "L'avversario aggiunge {{n:ex.bet.three-quarters}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} è di {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. Un {{t:flush-draw|progetto di colore}} al turn ha circa il {{n:odds.flush.turn-river}}, quindi paga troppo."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Hai un set e punti solo {{n:ex.bet.quarter}} in un {{t:pot|piatto}} di {{n:ex.pot}}. L'avversario ha un {{t:flush-draw|progetto di colore}} (circa il {{n:odds.flush.turn-river}} al river). Cosa ne consegue?"
    options:
      - { text: "Ottiene un buon prezzo: gli serve solo {{n:eq.bet-quarter}}", correct: true, why: "Sì: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, meno del suo {{n:odds.flush.turn-river}}. {{t:call|Chiamare}} gli conviene, e a te la puntata piccola fa regalare parte del valore." }
      - { text: "Deve {{t:fold|foldare}}, perché gli serve {{n:eq.bet-three-quarters}}", why: "Questo gli servirebbe contro una puntata di 3/4 del {{t:pot|piatto}}. Contro una puntata di 1/4 del {{t:pot|piatto}} gli basta {{n:eq.bet-quarter}}." }
      - { text: "Il prezzo non conta, perché tanto lo batti", why: "Ora lo batti, ma in circa il {{n:odds.flush.turn-river}} dei casi vincerà al river. Il sizing della puntata decide se per questa possibilità paga troppo o troppo poco." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Al turn l'avversario ha un {{t:oesd|progetto di scala bilaterale}}: circa il {{n:odds.oesd.turn-river}} al river. Da quale tua puntata in su paga troppo (contando solo le pot odds)?"
    options:
      - { text: "Già da 1/3 del {{t:pot|piatto}}: gli serve {{n:eq.bet-third}}", correct: true, why: "Sì: {{n:eq.bet-third}} è più di {{n:odds.oesd.turn-river}}. Al turn i {{t:draw|progetti}} hanno solo una carta, quindi anche una puntata media dà loro un prezzo cattivo." }
      - { text: "Solo dal {{t:pot|piatto}} intero: gli serve {{n:eq.bet-pot}}", why: "Con il {{t:pot|piatto}} intero paga decisamente troppo, ma già con 1/3 del {{t:pot|piatto}} gli serve {{n:eq.bet-third}}, più del suo {{n:odds.oesd.turn-river}}." }
      - { text: "Mai, un {{t:draw|progetto}} può sempre {{t:call|chiamare}}", why: "Un {{t:draw|progetto}} {{t:call|chiama}} solo con un buon prezzo o con le implied odds (prossima lezione). Al turn ha circa il {{n:odds.oesd.turn-river}}, quindi la maggior parte delle puntate per lui è un prezzo cattivo." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, punti l'intero {{t:pot|piatto}}: {{n:ex.bet.pot}}. Di quale percentuale di equity ha bisogno l'avversario per {{t:call|chiamare}}? Inserisci un numero."
    answer: eq.bet-pot
    explanation: "L'avversario aggiunge {{n:ex.bet.pot}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} è di {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Né il {{t:flush|colore}} (circa il {{n:odds.flush.turn-river}}) né la {{t:straight|scala}} aperta (circa il {{n:odds.oesd.turn-river}}) hanno una possibilità del genere."
---
Sul flop spesso hai puntato piccolo con quasi tutto il tuo {{t:range|range}}. Al turn il {{t:range|range}} di puntata cambia: ci restano le mani molto forti e i {{t:semi-bluff|semi-bluff}}, mentre le mani medie fanno {{t:check|check}}. Un {{t:range|range}} così lo chiamiamo {{t:polarized|polarizzato}}.

## Due tipi di {{t:range|range}}

- **{{t:linear|Lineare}}:** punti dalle mani più forti in giù, insieme a quelle medie. Di solito con un sizing piccolo, es. un c-bet di {{n:cbet.size.small}} del {{t:pot|piatto}} su [[Ks 7d 2c]].
- **{{t:polarized|Polarizzato}}:** puntano i due poli, mani molto forti (set, {{t:two-pair|doppie coppie}}, {{t:straight|scale}}, colori) e {{t:semi-bluff|semi-bluff}} ({{t:draw|progetti}}). Mani medie non ce ne sono.

In generale un {{t:range|range}} {{t:polarized|polarizzato}} è fatto di mani molto forti e {{t:bluff|bluff}}. Al turn i {{t:bluff|bluff}} sono di solito {{t:semi-bluff|semi-bluff}}, al river (M8) mani senza possibilità allo showdown.

## Perché al turn polarizzi

L'avversario ha {{t:call|chiamato}} il flop, quindi di solito ha una {{t:pair|coppia}} o un {{t:draw|progetto}}, a volte carte alte con una backdoor (M6). Una mano media non guadagna nulla da una seconda puntata: le mani peggiori {{t:fold|foldano}} e quelle migliori pagano. Le mani forti vogliono costruire il {{t:pot|piatto}} prima del river, e i {{t:semi-bluff|semi-bluff}} hanno bisogno di {{t:fold|fold}} e hanno out quando ricevono una {{t:call|chiamata}}.

## {{t:range|Range}} {{t:polarized|polarizzato}}, puntata grande

Un {{t:range|range}} {{t:polarized|polarizzato}} punta grande, es. 3/4 del {{t:pot|piatto}}. Le mani forti estraggono più {{t:chips|fiches}}, e i {{t:semi-bluff|semi-bluff}} vincono più spesso subito. Le mani medie fanno {{t:check|check}}. Quando {{t:bluff|bluff}} e mani forti puntano con lo stesso sizing, l'avversario non sa cosa hai.

## Il prezzo per i {{t:draw|progetti}}

Al turn un {{t:draw|progetto}} ha solo una carta. Una puntata grande gli fa pagare troppo:

| La tua puntata | All'avversario serve | Il {{t:flush|colore}} ha | La {{t:straight|scala}} aperta ha |
|---|---|---|---|
| 1/4 del {{t:pot|piatto}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 del {{t:pot|piatto}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 del {{t:pot|piatto}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 del {{t:pot|piatto}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|Piatto}} intero | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Con una puntata di 1/4 del {{t:pot|piatto}} un {{t:flush-draw|progetto di colore}} ha un buon prezzo. Con 1/3 del {{t:pot|piatto}} il prezzo è quasi pari alla possibilità del {{t:flush|colore}} ({{n:eq.bet-third}} contro {{n:odds.flush.turn-river}}), e da 1/2 del {{t:pot|piatto}} in su il {{t:flush|colore}} paga chiaramente troppo, a meno che non conti sulle implied odds (prossima lezione). Gli esercizi con un {{t:draw|progetto}} in questa lezione contano solo le pot odds.

:::note Da dove vengono queste regole
I concetti di {{t:range|range}} {{t:polarized|polarizzato}} e {{t:linear|lineare}} e la regola «un {{t:range|range}} {{t:polarized|polarizzato}} punta grande, le mani medie fanno {{t:check|check}}» provengono da materiali didattici e qui sono un'euristica; lo stesso vale per il consiglio di puntare grande con una mano forte ma vulnerabile. Al turn il solver usa anche sizing piccoli. Il sizing di 3/4 del {{t:pot|piatto}} è un esempio per esercitarsi, non l'unico sizing buono. I prezzi nella tabella sono calcoli esatti dell'app.
:::
