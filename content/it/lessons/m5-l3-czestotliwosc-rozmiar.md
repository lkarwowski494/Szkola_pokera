---
id: m5.l3
module: m5
order: 3
title: "Quanto spesso e quanto"
sub: "C-bet in posizione"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e al flop {{t:check|fa check}}. Quale piano si adatta a questo flop?"
    position: BTN
    options:
      check: "{{t:check|Faccio check}} più spesso, c-bet meno spesso del solito"
      small: "C-bet spesso e piccolo: {{n:cbet.size.small}} del {{t:pot|piatto}} ({{n:cbet.btn.small}})"
      big: "C-bet spesso e grande: {{n:cbet.size.big}} del {{t:pot|piatto}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Troppo prudente: su un flop {{t:dry|secco}} e alto hai il {{t:range-advantage|vantaggio di range}} e l'avversario di solito ha mancato. {{t:check|Facendo check}}, gli regali una carta gratis."
          small: "Sì: un flop {{t:dry|secco}} e alto ti favorisce. Una {{t:bet|puntata}} piccola basta per far {{t:fold|foldare}} all'avversario le mani deboli, mentre le {{t:pair|coppie}} peggiori la {{t:call|chiameranno}} comunque."
          big: "Azione giusta, dimensione sbagliata: su un flop {{t:dry|secco}} l'avversario ha pochi {{t:draw|progetti}} e le mani che hanno mancato {{t:fold|foldano}} anche contro una {{t:bet|puntata}} piccola. Una {{t:bet|puntata}} più grande fa {{t:fold|foldare}} più o meno le stesse mani, ma rischia di più. Punta circa {{n:cbet.size.small}} del {{t:pot|piatto}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Troppo prudente: hai il {{t:range-advantage|vantaggio di range}} e su un flop {{t:paired|accoppiato}} è difficile avere un {{t:draw|progetto}}, quindi un avversario senza {{t:pair|coppia}} raramente può pagare anche una {{t:bet|puntata}} piccola."
          small: "Sì: su un flop {{t:paired|accoppiato}} punti spesso e piccolo. Un avversario senza {{t:pair|coppia}} raramente ha qualcosa con cui {{t:call|chiamare}}, e il {{t:three-of-a-kind|tris}} possono averlo entrambi i giocatori, quindi non c'è motivo di rischiare di più."
          big: "Azione giusta, dimensione sbagliata: su un flop {{t:paired|accoppiato}} il {{t:three-of-a-kind|tris}} può averlo ognuno di voi, quindi una {{t:bet|puntata}} grande non conviene, e le mani deboli dell'avversario {{t:fold|foldano}} anche contro una piccola. Basta circa {{n:cbet.size.small}} del {{t:pot|piatto}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sì: un flop basso con carte vicine tra loro favorisce il {{t:big-blind}}, che qui ha più spesso {{t:two-pair|doppia coppia}} o {{t:straight|scala}}. Fai c-bet meno spesso che sui flop alti: molte mani {{t:check|fanno check}} e puntano soprattutto le mani forti e i {{t:draw|progetti}} forti."
          small: "Troppo spesso: su un flop basso con carte vicine tra loro è il {{t:big-blind}} ad avere il {{t:nuts-advantage|vantaggio di nuts}}. C-bet frequenti, anche piccole, gli danno l'occasione di {{t:raise|rilanciare}} dopo aver {{t:check|fatto check}} (check-raise) con le mani più forti."
          big: "Troppo spesso e troppo caro: qui il {{t:big-blind}} ha colpito più spesso {{t:two-pair|doppia coppia}} o {{t:straight|scala}}. Una c-bet grande e frequente rischia molto, quando tu di solito hai solo carte alte."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e {{t:check|fa check}}. Hai una {{t:pair|coppia}} di re con il fante. Cosa fai?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} del {{t:pot|piatto}})", correct: true, why: "Sì: {{t:top-pair}} (una {{t:pair|coppia}} con la carta più alta del {{t:board}}) su un flop {{t:dry|secco}}. Una {{t:bet|puntata}} piccola riceverà una {{t:call|chiamata}} da sette, due e re più deboli, e l'avversario non ha quasi {{t:draw|progetti}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} del {{t:pot|piatto}})", sizeError: true, why: "Azione giusta, dimensione sbagliata: su un flop {{t:dry|secco}} l'avversario non ha {{t:draw|progetti}} e le mani che hanno mancato {{t:fold|foldano}} anche contro una {{t:bet|puntata}} piccola. Una {{t:bet|puntata}} più grande fa {{t:fold|foldare}} più o meno le stesse mani, ma rischia di più. Punta circa {{n:cbet.size.small}} del {{t:pot|piatto}}." }
      - { text: "{{t:check|Faccio check}}", why: "Perdi valore: l'avversario ha molte {{t:pair|coppie}} più deboli e mani con l'asso che pagherebbero una {{t:bet|puntata}} piccola. Su un flop {{t:dry|secco}} con {{t:top-pair|top pair}} punti." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e {{t:check|fa check}}. Hai un set di fanti su un flop con molti {{t:draw|progetti}}. Cosa fai?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} del {{t:pot|piatto}})", correct: true, why: "Sì: l'avversario ha molti {{t:flush-draw|progetti di colore}} e di {{t:straight|scala}} (es. QT, AQ, due cuori). Una {{t:bet|puntata}} grande li costringe a pagare caro la carta successiva." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} del {{t:pot|piatto}})", sizeError: true, why: "Azione giusta, dimensione sbagliata: una {{t:bet|puntata}} piccola dà ai {{t:draw|progetti}} dell'avversario una carta a buon mercato, e il tuo set può perdere contro un colore o una {{t:straight|scala}}. Con molti {{t:draw|progetti}}, punta grande." }
      - { text: "{{t:check|Faccio check}} per non spaventare l'avversario", why: "Con molti {{t:draw|progetti}}, una carta gratis è un regalo per loro. Con una mano molto forte costruisci subito il {{t:pot|piatto}}." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e {{t:check|fa check}}. Il flop è {{t:paired|accoppiato}}. Quale piano è corretto qui?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet spesso e piccolo", correct: true, why: "Sì: hai il {{t:range-advantage|vantaggio di range}} e su un flop {{t:paired|accoppiato}} è difficile avere un {{t:draw|progetto}}, quindi un avversario senza {{t:pair|coppia}} raramente può pagare anche una {{t:bet|puntata}} piccola. Hai anche più {{t:pair|coppie}} alte, es. AA e KK, che il {{t:big-blind}} dopo una semplice {{t:call|chiamata}} di solito non ha." }
      - { text: "C-bet spesso e grande", sizeError: true, why: "Azione giusta, dimensione sbagliata: il {{t:three-of-a-kind|tris}} può averlo ognuno di voi, quindi una {{t:bet|puntata}} grande non conviene, e un avversario senza {{t:pair|coppia}} {{t:fold|folda}} anche contro una piccola. Punta spesso e piccolo." }
      - { text: "{{t:check|Faccio check}} più spesso di quanto punto", why: "Troppo prudente: un flop {{t:paired|accoppiato}} e alto ti favorisce, e qui l'avversario di solito non ha niente." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e {{t:check|fa check}}. Il flop è {{t:monotone|monocolore}}. Quale piano è corretto qui?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet meno spesso del solito e piccolo", correct: true, why: "Sì: il {{t:flush|colore}} può già averlo ognuno dei giocatori, quindi il tuo {{t:nuts-advantage|vantaggio di nuts}} è minore che su un normale flop alto. Punti meno spesso e con una dimensione piccola, per non costruire un {{t:pot|piatto}} grande contro un colore." }
      - { text: "C-bet spesso e grande, così i {{t:draw|progetti}} pagano", why: "Su un flop {{t:monotone|monocolore}} un {{t:pot|piatto}} grande è pericoloso: l'avversario può avere un {{t:flush|colore}} già fatto, e le tue mani senza cuori si difendono male." }
      - { text: "Faccio sempre {{t:check}}", why: "Troppo prudente: un flop alto ti favorisce ancora, e una parte delle mani (es. con una carta di cuori alta) punta volentieri piccolo." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}. Punti {{n:cbet.ex.small}} senza alcuna mano. In che percentuale dei casi l'avversario deve {{t:fold|foldare}} perché questa {{t:bet|puntata}} vada in pareggio? Inserisci un numero."
    answer: alpha.cbet.small
    explanation: "Rischi {{n:cbet.ex.small}} per vincere {{n:ex.pot}}. La soglia è puntata ÷ ({{t:pot|piatto}} + puntata): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. L'avversario manca il flop molto più spesso, per questo una c-bet piccola conviene così spesso."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}. Punti {{n:cbet.ex.big}} senza alcuna mano. In che percentuale dei casi l'avversario deve {{t:fold|foldare}} perché questa {{t:bet|puntata}} vada in pareggio? Inserisci un numero."
    answer: alpha.cbet.big
    explanation: "Rischi {{n:cbet.ex.big}} per vincere {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Un {{t:bluff}} grande deve funzionare molto più spesso di uno piccolo ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Perché su un flop {{t:dry|secco}} una c-bet di {{n:cbet.size.small}} del {{t:pot|piatto}} con una mano senza possibilità conviene più spesso di una c-bet di {{n:cbet.size.big}} del {{t:pot|piatto}}?"
    options:
      - { text: "Perché una {{t:bet|puntata}} piccola ha bisogno di un fold solo nel {{n:alpha.cbet.small}} dei casi, una grande nel {{n:alpha.cbet.big}}", correct: true, why: "Sì: su un flop {{t:dry|secco}} le mani più deboli dell'avversario (senza {{t:pair|coppia}} e senza {{t:draw|progetto}}) {{t:fold|foldano}} contro entrambe le dimensioni, quindi una {{t:bet|puntata}} piccola ottiene lo stesso effetto spendendo meno." }
      - { text: "Perché una {{t:bet|puntata}} piccola ottiene sempre un {{t:fold}}", why: "No: l'avversario {{t:call|chiama}} una {{t:bet|puntata}} piccola con qualsiasi {{t:pair|coppia}}. Una {{t:bet|puntata}} piccola semplicemente rischia meno, quindi ha bisogno di meno {{t:fold}}." }
      - { text: "Perché una {{t:bet|puntata}} grande è sempre un errore", why: "No: su un flop {{t:wet|bagnato}} e con il {{t:nuts-advantage|vantaggio di nuts}}, una {{t:bet|puntata}} grande a volte è la migliore. Su un flop {{t:dry|secco}}, però, non ti dà nulla in cambio del rischio maggiore." }
---
La c-bet ({{t:bet|puntata}} di continuazione) è una {{t:bet|puntata}} al flop del giocatore che ha fatto l'ultimo {{t:raise|rilancio}} prima del flop. In questa lezione giochi {{t:in-position|in posizione}}: {{t:open|hai aperto}} dal Button, il {{t:big-blind}} ha {{t:call|chiamato}} e al flop {{t:check|fa check}}. Il {{t:pot|piatto}} al flop è di {{n:bb.pot-after.vs-btn}}. Le domande sono due: quanto spesso puntare e quanto.

## Flop {{t:dry|secco}} e alto: spesso e piccolo

Su un flop come [[Ks 7d 2c]] hai il {{t:range-advantage|vantaggio di range}} e l'avversario non ha quasi {{t:draw|progetti}}. Punti spesso e piccolo, circa {{n:cbet.size.small}} del {{t:pot|piatto}}, cioè circa {{n:cbet.btn.small}}. Una {{t:bet|puntata}} piccola basta per far {{t:fold|foldare}} all'avversario le mani che hanno mancato, mentre le {{t:pair|coppie}} peggiori la {{t:call|chiameranno}} comunque. Una {{t:bet|puntata}} più grande fa {{t:fold|foldare}} più o meno le stesse mani, ma rischia di più.

Una c-bet piccola tipica è di circa {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} del {{t:pot|piatto}}, una grande di circa {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (materiali didattici); i solver di solito usano {{n:cbet.size.small}} e {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, e su alcuni flop anche l'{{t:overbet}}, cioè una {{t:bet|puntata}} più grande dell'intero {{t:pot|piatto}} (risultati pubblicati dei solver).

## Flop con molti {{t:draw|progetti}}: meno spesso, ma più grande

Su un flop come [[Kh Jh 7c]] l'avversario ha molti {{t:flush-draw|progetti di colore}} e di {{t:straight|scala}}, ma la {{t:straight|scala}} non è ancora possibile. Le mani forti e i {{t:draw|progetti}} forti puntano con una dimensione maggiore, es. {{n:cbet.size.big}} del {{t:pot|piatto}}, perché i {{t:draw|progetti}} paghino caro la carta successiva. Le mani medie senza {{t:draw|progetto}} {{t:check|fanno check}} più spesso. Quando la {{t:straight|scala}} è già possibile, es. su [[Jh Th 8c]], l'avversario può averla, quindi lì i solver puntano con una dimensione minore.

## {{t:paired|Accoppiato}} e {{t:monotone|monocolore}}

Su un flop {{t:paired|accoppiato}}, es. [[Qd Qs 6h]], hai il {{t:range-advantage|vantaggio di range}} ed è difficile avere un {{t:draw|progetto}}, quindi un avversario senza {{t:pair|coppia}} raramente può {{t:call|chiamare}}. Punti spesso e piccolo: una {{t:bet|puntata}} grande non conviene, perché il {{t:three-of-a-kind|tris}} può averlo ognuno di voi. Su un flop {{t:monotone|monocolore}}, es. [[Kh 8h 3h]], il {{t:flush|colore}} può già averlo chiunque, quindi punti meno spesso del solito e piccolo.

Attenzione: «{{t:wet|bagnato}}» non significa «puntata grande». Nell'app un flop {{t:monotone|monocolore}} è sempre {{t:wet|bagnato}}, eppure il solver ci punta raramente e con una dimensione piccola (risultati pubblicati dei solver). La dimensione cresce con la {{t:wetness|bagnatura}} solo fino a un certo livello: sui flop più {{t:wet|bagnati}}, come [[Qd 8d 7d]], torna a scendere. La dimensione maggiore della sezione precedente riguarda i flop con molti {{t:draw|progetti}} su cui la {{t:straight|scala}} non è ancora possibile (nell'app di solito quelli intermedi).

## Basso con carte vicine tra loro: {{t:check|fai check}} più spesso

Su [[7s 6h 5d]] è il {{t:big-blind}} ad avere più spesso {{t:two-pair|doppia coppia}} o {{t:straight|scala}} (lezione sui vantaggi). Lo stesso vale per gli altri flop bassi {{t:connected|connessi}} e {{t:semi-connected|semi-connessi}}. Fai c-bet meno spesso che sui flop alti: molte mani {{t:check|fanno check}} e puntano soprattutto le mani molto forti e i {{t:draw|progetti}} forti.

## Quanto spesso deve {{t:fold|foldare}} l'avversario

Una {{t:bet|puntata}} senza alcuna mano va in pareggio quando l'avversario {{t:fold|folda}} in puntata ÷ ({{t:pot|piatto}} + puntata) dei casi. Con {{n:cbet.size.small}} del {{t:pot|piatto}} è il {{n:alpha.cbet.small}}, con {{n:cbet.size.big}} del {{t:pot|piatto}} già il {{n:alpha.cbet.big}}. Una mano senza {{t:pair|coppia}} manca il flop in circa il {{n:flop.miss.unpaired}} dei casi, per questo una c-bet piccola conviene così spesso.

:::note Da dove vengono queste regole
Le direzioni (flop {{t:dry|secco}}: piccolo e spesso; molti {{t:draw|progetti}} senza {{t:straight|scala}} già fatta: più grande e meno spesso; {{t:straight|scala}} già possibile: più piccolo; {{t:paired|accoppiato}}: piccolo; {{t:monotone|monocolore}}: meno spesso e piccolo) sono regole generali tratte da materiali didattici e da risultati pubblicati dei solver, indicate come euristiche. Le dimensioni {{n:cbet.size.small}} e {{n:cbet.size.big}} del {{t:pot|piatto}} sono esempi presi dagli intervalli indicati sopra (materiali didattici sulle dimensioni delle puntate; risultati pubblicati dei solver). L'app non indica in percentuale quanto spesso puntare, perché questi numeri provengono dai risultati dei solver.
:::
