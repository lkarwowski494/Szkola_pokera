---
id: m5.l2
module: m5
order: 2
title: "Chi è favorito dal flop"
sub: "Vantaggio di range e vantaggio di nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}}. Flop: [[Ks 7d 2c]]. Chi ha il {{t:range-advantage|vantaggio di range}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Tu, che hai {{t:open|aperto}} dal Button", correct: true, why: "Sì: nel tuo {{t:range}} hai tutte le KK, AK e KQ. Il {{t:big-blind}} rilancerebbe le più forti prima del flop, e la sua difesa ampia è fatta per lo più di mani che qui hanno mancato il flop." }
      - { text: "Il {{t:big-blind}}", why: "No: il {{t:big-blind}} ha più mani deboli, perché ha difeso in modo ampio. Ha un re con un buon kicker meno spesso di te." }
      - { text: "Nessuno, il flop è casuale", why: "Il flop è casuale, ma i {{t:range}} no. Lo stesso flop si adatta meglio al {{t:range}} che contiene più carte alte." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}}. Flop: [[7s 6h 5d]]. Chi ha più spesso qui una mano molto forte ({{t:two-pair}} o {{t:straight}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Il {{t:big-blind}}", correct: true, why: "Sì: il {{t:big-blind}} difende molti {{t:connectors|connettori}} dello stesso seme e mani con un sei o un sette. Tu dal Button hai più carte alte che qui hanno mancato il flop. È il {{t:nuts-advantage|vantaggio di nuts}} del {{t:big-blind}}." }
      - { text: "Tu, che hai {{t:open|aperto}} dal Button", why: "No: il tuo {{t:range}} è pieno di carte alte. Hai più {{t:overpair}} ({{t:pocket-pair|coppie servite}} più alte di ogni carta sul {{t:board}}, ad es. TT, JJ), ma meno {{t:two-pair|doppie coppie}} e {{t:straight|scale}}; di set (tris con una {{t:pocket-pair|coppia servita}}) ne avete un numero simile." }
      - { text: "Entrambi con la stessa frequenza", why: "No: i {{t:range}} hanno una composizione diversa. La difesa ampia del {{t:big-blind}} ha molte carte basse, il tuo {{t:range}} carte alte." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Perché il {{t:big-blind}}, che ha solo {{t:call|chiamato}} la tua {{t:open|apertura}}, ha raramente AA o AK sul flop [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Perché con queste mani di solito {{t:raise|rilancia}} prima del flop (3-bet)", correct: true, why: "Sì: il {{t:big-blind}} gioca le mani più forti con un 3-bet, quindi dopo una semplice {{t:call|chiamata}} il suo {{t:range}} contiene poche delle mani migliori. Nel tuo {{t:range}} ci sono tutte." }
      - { text: "Perché il {{t:big-blind}} non gioca mai gli assi", why: "No: il {{t:big-blind}} difende molti assi, ad es. A5 o A9. Gli mancano soprattutto i più forti, che rilancerebbe." }
      - { text: "Perché sul flop c'è già un asso", why: "L'asso sul {{t:board}} riduce il numero di {{t:combo|combinazioni}} di assi in entrambi i {{t:range}}, ma non crea una differenza tra loro. La differenza nasce dalle decisioni prima del flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Hai il {{t:range-advantage|vantaggio di range}}, ma l'avversario ha tante mani tra le più forti quante ne hai tu. Che dimensione di puntata scegli di solito?"
    options:
      - { text: "Piccola, e spesso", correct: true, why: "Sì: il {{t:range-advantage|vantaggio di range}} dice che puoi puntare spesso. Senza {{t:nuts-advantage|vantaggio di nuts}}, una {{t:bet|puntata}} grande rischia molto contro le mani più forti dell'avversario, e le mani più deboli {{t:fold|foldano}} comunque anche su una piccola." }
      - { text: "Grande, perché hai il vantaggio", why: "No: a decidere una dimensione grande è il {{t:nuts-advantage|vantaggio di nuts}}, cioè avere più mani tra le più forti. Qui non ce l'hai." }
      - { text: "Faccio sempre {{t:check}}", why: "Troppo prudente: il {{t:range-advantage|vantaggio di range}} è un motivo per puntare spesso, solo poco." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Nel tuo {{t:range}} ci sono molte più mani tra le più forti che nel {{t:range}} dell'avversario. Che cosa ti dà?"
    options:
      - { text: "Puoi puntare grosso, perché raramente troverai una mano migliore", correct: true, why: "Sì: è il {{t:nuts-advantage|vantaggio di nuts}}. Una {{t:bet|puntata}} grande estrae di più dalle mani medie dell'avversario, e un {{t:raise|rilancio}} da una mano migliore capita raramente." }
      - { text: "Devi sempre puntare poco", why: "No: scegli una dimensione piccola quando hai solo il {{t:range-advantage|vantaggio di range}}. Il {{t:nuts-advantage|vantaggio di nuts}} ti permette di puntare di più." }
      - { text: "Niente, conta solo la tua mano", why: "La tua mano è importante, ma l'avversario vede solo il tuo {{t:range}}. La dimensione della {{t:bet|puntata}} si sceglie in modo che vada bene per molte mani insieme." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "L'avversario ha due carte di valore diverso, ad es. [[Jc Td]]. In che percentuale dei casi il flop non ne accoppia nessuna? Inserisci un numero."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Delle {{n:cards.unseen.preflop}} carte sconosciute, solo {{n:pair.outs.unpaired}} danno una {{t:pair|coppia}}: i tre jack e i tre dieci rimasti. Il flop è di {{n:cards.board.flop}} carte, e la probabilità che nessuna sia tra queste {{n:pair.outs.unpaired}} è di circa il {{n:flop.miss.unpaired}}. Quindi la {{t:pair|coppia}} la prendi solo in circa il {{n:flop.hit.unpaired}} dei casi."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Una mano senza {{t:pair|coppia}} non fa {{t:pair|coppia}} sul flop in circa il {{n:flop.miss.unpaired}} dei casi. Che cosa significa per la c-bet?"
    options:
      - { text: "L'avversario spesso non ha niente, quindi anche una piccola {{t:bet|puntata}} spesso vince subito il {{t:pot|piatto}}", correct: true, why: "Sì: è la base della c-bet. Mancare il flop non significa sempre {{t:fold}} (l'avversario può avere un {{t:draw|progetto}} o carte alte), ma nel suo {{t:range}} le mani deboli sono tante." }
      - { text: "L'avversario {{t:fold|folderà}} esattamente nel {{n:flop.miss.unpaired}} dei casi", why: "No: un avversario senza {{t:pair|coppia}} a volte {{t:call|chiama}} con un {{t:draw|progetto}} o con una carta alta, e a volte ha una {{t:pair|coppia}} in mano. È solo un'approssimazione di quanto spesso il flop non lo ha colpito." }
      - { text: "Anche tu manchi il flop altrettanto spesso, quindi la c-bet non ha senso", why: "No: anche tu manchi spesso il flop, ma l'avversario non sa quando. Il tuo {{t:range}} da {{t:aggressor|aggressore}} (il giocatore che ha {{t:raise|rilanciato}} per ultimo prima del flop) è più forte su molti flop, e una {{t:bet|puntata}} vince il {{t:pot|piatto}} quando l'avversario {{t:fold|folda}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "E in che percentuale dei casi il flop accoppia almeno una delle due carte di una mano senza {{t:pair|coppia}}? Inserisci un numero."
    answer: flop.hit.unpaired
    explanation: "È il complemento del numero precedente: {{n:prob.certain}} meno {{n:flop.miss.unpaired}} fa circa {{n:flop.hit.unpaired}}, cioè più o meno un flop su tre."
---
Prima del flop i {{t:range}} dei giocatori sono diversi. Chi {{t:open|apre}} dal Button ha molte carte alte. Il {{t:big-blind}} difende in modo molto ampio, ma le mani più forti (AA, KK, AK) di solito le {{t:raise|rilancia}}, quindi dopo una semplice {{t:call|chiamata}} ne ha poche. Il flop si adatta meglio a uno di questi {{t:range}}, e questo decide chi può puntare spesso.

## {{t:range-advantage|Vantaggio di range}}

Hai il {{t:range-advantage|vantaggio di range}} quando, su un certo flop, le tue mani sono in media più forti di quelle dell'avversario. Su [[Ks 7d 2c]], dopo un'{{t:open|apertura}} dal Button, sei tu ad avere più re con un buon kicker e più {{t:pair|coppie}} alte. Il {{t:big-blind}} qui ha molte mani che hanno mancato il flop.

Su un flop basso e {{t:connected|connesso}}, ad es. [[7s 6h 5d]], il {{t:range-advantage|vantaggio di range}} quasi sparisce, e le mani più forti le ha più spesso il {{t:big-blind}}: difende molti {{t:connectors|connettori}} dello stesso seme e mani con un sei o un sette, quindi ha più spesso {{t:two-pair}} o {{t:straight|scala}}.

## {{t:nuts-advantage|Vantaggio di nuts}}

Il {{t:nuts-advantage|vantaggio di nuts}} significa avere nel tuo {{t:range}} più mani tra le più forti (i «{{t:nuts}}»). Il {{t:range-advantage|vantaggio di range}} ti dice quanto spesso puoi puntare. Il {{t:nuts-advantage|vantaggio di nuts}} ti dice quanto: quando hai molte più mani tra le più forti rispetto all'avversario, puoi puntare con una dimensione più grande. Quando hai solo il {{t:range-advantage|vantaggio di range}}, punti poco.

## L'avversario di solito manca il flop

Una mano senza {{t:pair|coppia}}, ad es. [[Jc Td]], non fa {{t:pair|coppia}} sul flop in circa il {{n:flop.miss.unpaired}} dei casi. Delle {{n:cards.unseen.preflop}} carte sconosciute, solo {{n:pair.outs.unpaired}} accoppiano le sue carte. Le fonti indicano spesso circa il {{n:flop.hit.one-pair}}: è la probabilità di esattamente una {{t:pair|coppia}}; contando anche {{t:two-pair}} e {{t:three-of-a-kind}}, si va a segno in circa il {{n:flop.hit.unpaired}} dei casi. Per questo una {{t:bet|puntata}} sul flop spesso vince subito il {{t:pot|piatto}}, anche quando tu non hai preso niente. Mancare il flop non significa sempre {{t:fold}}: l'avversario può avere un {{t:draw|progetto}} o due carte alte.

:::note Da dove vengono questi principi
I concetti di {{t:range-advantage|vantaggio di range}} e {{t:nuts-advantage|vantaggio di nuts}} vengono da materiali di teoria dei giochi basati sui risultati dei solver (un glossario dei termini e un articolo sulle dimensioni della c-bet). I numeri di questa lezione sono calcoli esatti dell'app.
:::
