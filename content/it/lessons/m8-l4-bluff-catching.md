---
id: m8.l4
module: m8
order: 4
title: "Catturare i bluff"
sub: "Con quali mani chiamare al river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Difendi il {{t:big-blind|big blind}}. Al river fai {{t:check|check}} e il Button {{t:bet|punta}} tutto il {{t:pot|piatto}}. Le picche non sono arrivate. Che ruolo ha la tua {{t:pair|coppia}} di nove?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: batte solo i {{t:bluff|bluff}}", correct: true, why: "Per tutto il {{t:pot|piatto}} il Button punta {{t:value|per valore}} almeno con un re e {{t:bluff|bluffa}} soprattutto con {{t:draw|progetti}} mancati. La tua {{t:pair|coppia}} perde contro ogni sua mano {{t:value|di valore}} e batte ogni suo {{t:bluff|bluff}}." }
      - { text: "Una mano {{t:value|di valore}}", why: "Una mano {{t:value|di valore}} batte le mani che pagano o puntano {{t:value|per valore}}. Una {{t:pair|coppia}} di nove perde contro ogni re e ogni mano migliore del Button." }
      - { text: "Una mano senza possibilità", why: "Una {{t:pair|coppia}} di nove batte i {{t:draw|progetti}} mancati, ed è con quelli che il Button {{t:bluff|bluffa}}. Ha delle possibilità, ma solo contro i {{t:bluff|bluff}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Il {{t:pot|piatto}} è di {{n:ex.pot}} e l'avversario {{t:bet|punta}} tutto il {{t:pot|piatto}}: {{n:ex.bet.pot}}. Hai un bluff-catcher. Almeno che percentuale delle sue puntate devono essere {{t:bluff|bluff}} perché {{t:call|chiamare}} convenga? Inserisci un numero."
    answer: eq.bet-pot
    explanation: "La tua equity è la quota di {{t:bluff|bluff}} tra le sue puntate. Metti {{n:ex.bet.pot}} per vincere il {{t:pot|piatto}} dopo la {{t:call|chiamata}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. È lo stesso numero della quota di {{t:bluff|bluff}} all'equilibrio vista nella lezione precedente."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. L'avversario {{t:bet|punta}} mezzo {{t:pot|piatto}}. Hai un bluff-catcher e stimi che i {{t:bluff|bluff}} siano circa il {{n:catch.ex.bluffs-low}} delle sue puntate. Cosa fai?"
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Ti serve il {{n:eq.bet-half}} di equity, e il tuo bluff-catcher vince solo nel {{n:catch.ex.bluffs-low}} dei casi. {{t:call|Chiamare}} perde." }
      - { text: "{{t:call|Chiamo}}, perché la {{t:mdf|MDF}} è del {{n:mdf.bet-half}}", why: "La {{t:mdf|MDF}} ti protegge da un avversario che {{t:bluff|bluffa}} abbastanza spesso. Quando i {{t:bluff|bluff}} sono troppo pochi, {{t:call|chiamare}} con i bluff-catcher regala soldi." }
      - { text: "{{t:raise|Rilancio}}", why: "La tua mano batte solo i {{t:bluff|bluff}}. Dopo il {{t:raise|rilancio}} i {{t:bluff|bluff}} {{t:fold|foldano}} e pagano le mani {{t:value|di valore}}: perdi di più." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. L'avversario {{t:bet|punta}} tutto il {{t:pot|piatto}}. Hai un bluff-catcher e stimi che i {{t:bluff|bluff}} siano circa il {{n:catch.ex.bluffs-high}} delle sue puntate. Cosa fai?"
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Ti serve il {{n:eq.bet-pot}} di equity, e i {{t:bluff|bluff}} sono il {{n:catch.ex.bluffs-high}}. L'avversario {{t:bluff|bluffa}} più di quanto preveda l'equilibrio, quindi la {{t:call|chiamata}} guadagna." }
      - { text: "{{t:fold|Foldo}}, perché la puntata è grande", why: "Una puntata grande alza il prezzo al {{n:eq.bet-pot}}, ma i {{t:bluff|bluff}} sono di più. Conta il confronto tra questi due numeri, non la dimensione della puntata in sé." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Un bluff-catcher non {{t:raise|rilancia}}: i {{t:bluff|bluff}} {{t:fold|foldano}} e pagano solo le mani migliori della tua." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "L'avversario punta al river tutto il {{t:pot|piatto}} e {{t:bluff|bluffa}} esattamente nel {{n:bluff.share.bet-pot}} dei casi. Quanto guadagni {{t:call|chiamando}} con un bluff-catcher?"
    options:
      - { text: "Niente: {{t:call|chiamare}} e {{t:fold|foldare}} si equivalgono", correct: true, why: "Una quota di {{t:bluff|bluff}} pari al {{n:eq.bet-pot}} è esattamente il prezzo della {{t:call|chiamata}}. Le vincite sui {{t:bluff|bluff}} compensano le perdite contro il valore, quindi l'avversario non ti fa guadagnare né {{t:call|chiamando}} né {{t:fold|foldando}}." }
      - { text: "Guadagno, perché i {{t:bluff|bluff}} sono tanti", why: "Sono esattamente quanti ne indica il prezzo. Guadagni solo quando l'avversario {{t:bluff|bluffa}} più spesso del {{n:eq.bet-pot}}." }
      - { text: "Perdo, perché c'è più valore che {{t:bluff|bluff}}", why: "Il valore è di più, ma {{t:call|chiamando}} rischi {{n:ex.bet.pot}} per vincere {{n:ex.pot}} + {{n:ex.bet.pot}}. Con questa quota di {{t:bluff|bluff}} le due cose si compensano." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Le picche non sono arrivate. Al river fai {{t:check|check}} e il Button {{t:bet|punta}} tutto il {{t:pot|piatto}}. Hai {{t:top-pair|top pair}} con kicker dieci. Con quale di queste due mani la {{t:call|chiamata}} è migliore?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Senza picche non blocchi i {{t:flush-draw|progetti di colore}} mancati, cioè i principali {{t:bluff|bluff}} del Button (ad es. dieci e jack di picche). Nel suo {{t:range|range}} restano più {{t:bluff|bluff}} che batti." }
      - { text: "[[Kc Ts]]", why: "Il dieci di picche toglie al Button una parte dei {{t:draw|progetti}} mancati con cui {{t:bluff|bluffa}} (ad es. jack e dieci di picche). Gli resta relativamente più valore, quindi la {{t:call|chiamata}} è peggiore." }
      - { text: "Nessuna differenza", why: "La forza allo showdown è la stessa, ma la picca nella tua mano blocca i {{t:bluff|bluff}} del Button. Questo cambia contro cosa stai davvero giocando." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Al river è arrivata la terza carta di cuori. Fai {{t:check|check}} e il Button {{t:bet|punta}} tutto il {{t:pot|piatto}}. Hai una {{t:pair|coppia}} di nove. Con quale di queste due mani la {{t:call|chiamata}} è migliore?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "L'asso di cuori blocca il {{t:flush|colore}} all'asso, una delle mani {{t:value|di valore}} più forti del Button. Quando blocchi il suo valore, tra le sue puntate restano più {{t:bluff|bluff}}." }
      - { text: "[[Ad 9c]]", why: "La stessa {{t:pair|coppia}}, ma non blocchi nessun {{t:flush|colore}}. Il Button ha tutti i suoi colori, contro cui perdi." }
      - { text: "Nessuna differenza", why: "Allo showdown le due mani sono ugualmente forti, ma l'asso di cuori toglie al Button una parte delle mani {{t:value|di valore}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Le picche non sono arrivate. Al river fai {{t:check|check}} e il Button {{t:bet|punta}} mezzo {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Hai solo il sette come carta più alta. Perdi persino contro la maggior parte dei {{t:bluff|bluff}} del Button (donna con picche, jack con picche), quindi non è un bluff-catcher. Difendi con altre mani." }
      - { text: "{{t:call|Chiamo}}, perché il prezzo è buono", why: "Il prezzo ({{n:eq.bet-half}}) non aiuta una mano che perde contro quasi tutto, persino contro i {{t:bluff|bluff}}." }
      - { text: "{{t:raise|Rilancio}} come {{t:bluff|bluff}}", why: "Il {{t:raise|rilancio}} in {{t:bluff|bluff}} al river è una giocata avanzata e rischiosa. È più semplice e meglio foldare una mano senza possibilità." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. L'avversario {{t:bet|punta}} mezzo {{t:pot|piatto}}. La {{t:mdf|MDF}} è del {{n:mdf.bet-half}}. Quali mani difendi per prime?"
    options:
      - { text: "I migliori bluff-catcher: battono i {{t:bluff|bluff}} e hanno buoni {{t:blocker|blocker}}", correct: true, why: "Difendi le mani che battono i {{t:bluff|bluff}} e, tra mani di forza simile, scegli quelle che bloccano il valore dell'avversario e non bloccano i suoi {{t:bluff|bluff}}. {{t:fold|Foldi}} le mani che perdono persino contro i {{t:bluff|bluff}}." }
      - { text: "Un {{n:mdf.bet-half}} casuale del {{t:range|range}}", why: "La {{t:mdf|MDF}} dice quanto difendere, non con cosa. Una difesa casuale paga con mani che non vinceranno mai." }
      - { text: "Solo mani {{t:value|di valore}}", why: "Così difendi troppo poco e l'avversario guadagna {{t:bluff|bluffando}} con carte qualsiasi. Per arrivare alla {{t:mdf|MDF}} aggiungi i migliori bluff-catcher." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Perché con un bluff-catcher al river {{t:call|chiami}} e non {{t:raise|rilanci}}?"
    options:
      - { text: "Perché dopo il {{t:raise|rilancio}} i {{t:bluff|bluff}} {{t:fold|foldano}} e pagano solo mani migliori", correct: true, why: "La tua mano batte solo i {{t:bluff|bluff}}. Il {{t:raise|rilancio}} fa uscire proprio quelle mani e lascia quelle contro cui perdi." }
      - { text: "Perché al river non si può {{t:raise|rilanciare}}", why: "Si può. Semplicemente, un {{t:raise|rilancio}} con un bluff-catcher lo trasforma in un {{t:bluff|bluff}} contro mani che non {{t:fold|folderanno}}." }
      - { text: "Perché la {{t:call|chiamata}} costa sempre meno", why: "Non è una questione di costo, ma di chi resta in gioco. Dopo il {{t:raise|rilancio}} restano le mani che ti battono." }
---
Ora sei dall'altra parte: è l'avversario a puntare al river, e tu hai una mano media. Il più delle volte sarà un **bluff-catcher**, cioè una mano che perde contro ogni mano {{t:value|di valore}} dell'avversario, ma batte i suoi {{t:bluff|bluff}}.

## La tua equity sono i suoi {{t:bluff|bluff}}

Un bluff-catcher vince esattamente quando l'avversario {{t:bluff|bluffa}}. La sua equity è quindi la quota di {{t:bluff|bluff}} tra le puntate dell'avversario. {{t:call|Chiami}} quando questa quota è maggiore dell'equity necessaria vista in M2:

| Puntata dell'avversario | Equity necessaria ({{t:bluff|bluff}} almeno) |
|---|---|
| 1/3 del {{t:pot|piatto}} | {{n:eq.bet-third}} |
| 1/2 del {{t:pot|piatto}} | {{n:eq.bet-half}} |
| Tutto il {{t:pot|piatto}} | {{n:eq.bet-pot}} |

Quando l'avversario {{t:bluff|bluffa}} esattamente nella proporzione della lezione precedente ({{n:bluff.share.bet-pot}} con tutto il {{t:pot|piatto}}), la {{t:call|chiamata}} va in pari. Quando {{t:bluff|bluffa}} più spesso, {{t:call|chiami}}; quando meno spesso, {{t:fold|foldi}}. I numeri non includono il rake; il rake alza un po' l'equity necessaria.

## Quanto difendere, e con cosa

Quanto difendere te lo dice la {{t:mdf|MDF}} di M6: contro una puntata di mezzo {{t:pot|piatto}}, circa il **{{n:mdf.bet-half}}** del {{t:range|range}}. Questa lezione risponde alla seconda domanda: **con quali mani**. {{t:call|Chiami}} con i migliori bluff-catcher: tra mani di forza simile scegli quelle con {{t:blocker|blocker}} migliori; {{t:fold|foldi}} le mani che perdono persino contro i {{t:bluff|bluff}}.

Un bluff-catcher migliore:

- batte più {{t:bluff|bluff}} (una {{t:pair|coppia}} è meglio di una semplice carta alta),
- blocca le mani {{t:value|di valore}} dell'avversario,
- non blocca i suoi {{t:bluff|bluff}}.

## I {{t:blocker|blocker}} quando {{t:call|chiami}}

È lo specchio della lezione precedente. Quando le picche non arrivano, l'avversario {{t:bluff|bluffa}} con {{t:flush-draw|progetti di colore}} mancati. Una picca nella tua mano gli toglie una parte dei {{t:bluff|bluff}}, quindi la {{t:call|chiamata}} è peggiore. Quando il {{t:flush|colore}} è arrivato, l'asso di quel seme nella tua mano gli toglie i colori più forti, quindi la {{t:call|chiamata}} è migliore.

## Non rilanciare con un bluff-catcher

Dopo il {{t:raise|rilancio}} i {{t:bluff|bluff}} {{t:fold|foldano}} e pagano solo le mani che ti battono. Con un bluff-catcher {{t:call|chiami}} o {{t:fold|foldi}}.

:::note Quando l'avversario {{t:bluff|bluffa}} di rado
Queste regole presuppongono un avversario che {{t:bluff|bluffa}} più o meno all'equilibrio. Contro un giocatore che {{t:bluff|bluffa}} di rado con una grossa puntata al river, {{t:fold|foldi}} più spesso di quanto indichi la {{t:mdf|MDF}}: quando i {{t:bluff|bluff}} sono meno di quanto richiede il prezzo, la {{t:call|chiamata}} perde (il calcolo di questa lezione). Le regole per scegliere i bluff-catcher in base ai {{t:blocker|blocker}} provengono da materiali didattici e analisi dei solver (gioco al river, {{t:blocker|blocker}}): tra i bluff-catcher (mani che comunque battono solo i {{t:bluff|bluff}}) il solver sceglie le {{t:call|chiamate}} più in base ai {{t:blocker|blocker}} che alla sola forza della mano.
:::
