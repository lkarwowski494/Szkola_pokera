---
id: m7.l4
module: m7
order: 4
title: "Probe bet e difesa"
sub: "Quando l'avversario fa check o punta una seconda volta"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Il Button {{t:open|ha aperto}}, tu dal {{t:big-blind}} {{t:call|hai chiamato}}. Al flop fate check entrambi. Al turn punti per primo. Come si chiama questa {{t:bet}}?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Sì: il probe bet è una {{t:bet}} {{t:out-of-position}} al turn dopo che l'{{t:aggressor}} preflop non ha fatto c-bet e ha {{t:check|fatto check}}." }
      - { text: "C-bet", why: "A {{t:bet|puntare}} il c-bet è il giocatore che ha {{t:raise|rilanciato}} prima del flop. Tu hai solo {{t:call|chiamato}}." }
      - { text: "Check-raise", why: "Il check-raise è un {{t:check}} seguito da un {{t:raise}} sulla {{t:bet|puntata}} dell'avversario. Qui punti per primo e non {{t:raise|rilanci}} nessuno." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Perché dopo il {{t:check}} del Button al flop puoi puntare al turn più spesso del solito?"
    table: { position: BB }
    options:
      - { text: "Perché con molte mani forti il Button avrebbe puntato, quindi dopo il {{t:check}} ne ha meno", correct: true, why: "Sì: le mani forti di solito fanno c-bet. Dopo il {{t:check}} il {{t:range}} del Button ha più mani medie e deboli, e tu puoi attaccarlo con una {{t:bet|puntata}}." }
      - { text: "Perché il {{t:check}} significa sempre che il Button non ha niente", why: "Non sempre: a volte il Button {{t:check|fa check}} con una mano forte per intrappolarti. Però ne ha meno di quando punta." }
      - { text: "Perché al turn sei tu ad avere la {{t:position}}", why: "No: il Button agisce dopo di te su ogni {{t:street}}. Il probe bet lo {{t:bet|punti}} {{t:out-of-position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Il Button ha {{t:check|fatto check}} al flop. Su quale {{t:board}} {{t:bet|punti}} più spesso il probe bet dal {{t:big-blind}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Sì: le carte basse colpiscono più spesso la difesa ampia del {{t:big-blind}} (piccole {{t:pair|coppie}}, {{t:connectors|connettori}}), e qui il Button dopo il {{t:check}} ha raramente una mano forte." }
      - { text: "[[Ac Kd 8h Js]]", why: "Su un {{t:board}} alto il {{t:range-advantage}} ce l'ha il Button: molti dei suoi assi e re hanno colpito. Qui il probe bet lo {{t:bet|punti}} meno spesso." }
      - { text: "Su entrambi con la stessa frequenza", why: "La {{t:texture}} conta, come per il c-bet in M5: sui board bassi punti più spesso, su quelli alti meno spesso." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop avete {{t:check|fatto check}} entrambi. Il turn è un tre. Agisci per primo. Cosa fai?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Punto (probe bet)", correct: true, why: "Hai un {{t:oesd}} (un quattro o un nove) su un {{t:board}} basso che si adatta al tuo {{t:range}}. Vinci se il Button {{t:fold|folda}}, e se {{t:call|chiama}} hai ancora {{n:outs.oesd}} out." }
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Va bene anche così: con un {{t:draw|progetto}} puoi vedere il river gratis, se anche il Button {{t:check|fa check}}. Però il probe bet di solito è migliore, perché dopo il {{t:check}} al flop il Button ha un {{t:range}} debole e tu hai un {{t:semi-bluff}} forte." }
      - { text: "{{t:fold|Foldo}}", why: "Nessuno ha {{t:bet|puntato}}, quindi puoi {{t:check|fare check}} gratis (regola del modulo 1). Il {{t:fold}} regala il {{t:pot|piatto}} senza motivo." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop avete {{t:check|fatto check}} entrambi. Il turn è un tre. Agisci per primo. Cosa fai?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Punto (probe bet)", correct: true, why: "La {{t:top-pair}} è una buona mano per il probe bet: ti pagheranno le {{t:pair|coppie}} più deboli e le carte alte del Button, e con la {{t:bet|puntata}} non gli dai una carta gratis." }
      - { text: "{{t:check|Faccio check}}", why: "Dopo il {{t:check}} al flop il Button ha spesso carte alte senza {{t:pair|coppia}}. Se {{t:check|fa check}} di nuovo, riceve una carta gratis che può batterti, e tu non guadagni sulle sue mani più deboli." }
      - { text: "{{t:fold|Foldo}}", why: "Nessuno ha {{t:bet|puntato}}, quindi puoi {{t:check|fare check}} gratis. E con la {{t:top-pair}} vuoi puntare." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop avete {{t:check|fatto check}} entrambi. Il turn è un fante. Agisci per primo. Cosa fai?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Non hai né {{t:pair|coppia}} né {{t:draw|progetto}}, e il {{t:board}} alto favorisce il {{t:range}} del Button. Un probe bet senza out su un {{t:board}} così vince solo se il Button {{t:fold|folda}}, e qui ha molti assi, re e fanti." }
      - { text: "Punto (probe bet)", why: "Il probe bet lo {{t:bet|punti}} più spesso sui board bassi e con mani che hanno una {{t:pair|coppia}} o degli out. Qui non hai né l'una né gli altri." }
      - { text: "{{t:fold|Foldo}}", why: "Puoi {{t:check|fare check}} gratis, quindi il {{t:fold}} non ti dà nulla (regola del modulo 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Difendi il {{t:big-blind}}. Hai {{t:call|chiamato}} il c-bet del Button al flop. Il turn è un due, {{t:check|fai check}} e il Button {{t:bet|punta}} {{n:ex.bet.three-quarters}} in un {{t:pot|piatto}} di {{n:ex.pot}}. Cosa fai?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Hai solo un gutshot (un fante): circa {{n:odds.gutshot.turn-river}} al river, e ti serve {{n:eq.bet-three-quarters}}. Senza {{t:pair|coppia}} e con una sola carta ancora da vedere, questa mano non regge contro un {{t:second-barrel}}." }
      - { text: "{{t:call|Chiamo}}", why: "Il prezzo è parecchie volte più alto della tua probabilità: {{n:eq.bet-three-quarters}} contro circa {{n:odds.gutshot.turn-river}}. Le implied odds non coprono una differenza simile." }
      - { text: "Check-raise", why: "Il {{t:second-barrel}} è un {{t:range}} più forte del c-bet: il Button ha più spesso un re o una mano migliore che non {{t:fold|folda}}. Con {{n:outs.gutshot}} out è un {{t:bluff}} costoso." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Difendi il {{t:big-blind}}. Hai {{t:call|chiamato}} il c-bet del Button al flop. Il turn è un re, {{t:check|fai check}} e il Button {{t:bet|punta}} solo {{n:ex.bet.quarter}} in un {{t:pot|piatto}} di {{n:ex.pot}}. Cosa fai?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Hai un {{t:oesd}} (un fante o un sei): circa {{n:odds.oesd.turn-river}}. La puntata piccola richiede solo {{n:eq.bet-quarter}}, cioè quasi esattamente quanto hai, e se centri puoi vincere ancora al river." }
      - { text: "{{t:fold|Foldo}}", why: "Con una puntata così piccola il prezzo è quasi pari alla tua probabilità ({{n:eq.bet-quarter}} contro circa {{n:odds.oesd.turn-river}}), e le implied odds fanno pendere la decisione verso la {{t:call|chiamata}}." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Rischi tutto lo stack con una mano che ancora non ha niente, e il Button con un re non {{t:fold|folda}}. A un prezzo così buono basta {{t:call|chiamare}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Difendi il {{t:big-blind}}. Hai {{t:call|chiamato}} il c-bet del Button al flop. Il turn è un cinque, {{t:check|fai check}} e il Button {{t:bet|punta}} {{n:ex.bet.three-quarters}} in un {{t:pot|piatto}} di {{n:ex.pot}}. Cosa fai?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "La {{t:top-pair}} è troppo per {{t:fold|foldare}} su una carta neutra: batte i {{t:semi-bluff}} e i re più deboli. Ti serve {{n:eq.bet-three-quarters}}, e contro il {{t:range}} di un {{t:second-barrel}} una {{t:pair|coppia}} così di solito ce l'ha." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto. Il {{t:second-barrel}} è più forte del c-bet, ma il Button lo {{t:bet|punta}} anche con {{t:draw|progetti}} e {{t:bluff}}. La {{t:top-pair}} li batte tutti." }
      - { text: "{{t:raise|Rilancio}}", why: "Dopo un {{t:raise}} le mani peggiori {{t:fold|foldano}}, mentre pagano i re migliori e i set. Una {{t:top-pair}} con kicker medio non è una mano con cui {{t:raise|rilanciare}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Perché contro un {{t:second-barrel}} difendi più stretto che contro un c-bet al flop?"
    table: { position: BB }
    options:
      - { text: "Perché l'avversario {{t:bet|punta}} il {{t:second-barrel}} con un {{t:range}} più stretto e di solito con una size più grande, e i {{t:draw|progetti}} hanno ormai una sola carta", correct: true, why: "Sì: al turn l'avversario rinuncia a una parte dei {{t:bluff}}, una puntata più grande abbassa l'{{t:mdf}} (con 3/4 di {{t:pot|piatto}} è {{n:mdf.bet-three-quarters}}), e i tuoi {{t:draw|progetti}} perdono metà delle probabilità. Le {{t:pair|coppie}} deboli e le mani senza out le {{t:fold|foldi}} più spesso che al flop." }
      - { text: "Perché al turn bisogna risparmiare {{t:chips|fiches}}", why: "Conta il {{t:expected-value}} di ogni decisione, non il risparmio. Difendi più stretto perché l'avversario punta con mani più forti." }
      - { text: "No, difendi più largo perché hai già messo molte {{t:chips|fiches}}", why: "Quello che hai già messo non torna indietro. Decidi in base al prezzo attuale e alla forza del {{t:range}} dell'avversario." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. L'avversario {{t:bet|punta}} {{n:ex.bet.three-quarters}} in un {{t:pot|piatto}} di {{n:ex.pot}}. Quanto vale l'{{t:mdf}}? Inserisci il numero in percentuale."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + puntata) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. In un esempio pubblicato sul turn il solver difendeva in media vicino all'{{t:mdf}}; {{t:out-of-position}} capita di difendere meno (al flop e al turn). Quando sai che l'avversario {{t:bluff|bluffa}} meno spesso, {{t:fold|foldi}} più spesso (i calcoli sono in M8, nella lezione su come catturare i {{t:bluff}})."
---
Al turn incontrerai due situazioni nuove: il Button non ha fatto c-bet e ha {{t:check|fatto check}}, oppure ha fatto c-bet e punta una seconda volta. Nella prima puoi attaccare tu, nella seconda difendi più stretto che al flop.

## Probe bet

Il probe bet è una {{t:bet}} {{t:out-of-position}} al turn dopo che l'{{t:aggressor}} preflop ha {{t:check|fatto check}} al flop. Con molte mani forti il Button avrebbe fatto c-bet, quindi dopo il {{t:check}} ne ha meno. Il suo {{t:range}} è più debole e puoi attaccarlo.

- **Più spesso sui board bassi**, ad es. [[8c 5d 2s 3h]]: le carte basse colpiscono la tua difesa ampia.
- **Meno spesso su quelli alti**, ad es. [[Ac Kd 8h Js]]: il {{t:range-advantage}} resta dalla parte del Button.

## Con cosa fare probe bet

- **{{t:pair|Coppie}}** che vogliono farsi pagare dalle carte alte del Button e non vogliono dargli una carta gratis,
- **{{t:draw|progetti}} forti**, che vincono in due modi.

Le mani senza {{t:pair|coppia}} e senza out {{t:check|fanno check}}.

## Difesa contro il {{t:second-barrel}}

Quando hai {{t:call|chiamato}} un c-bet e il Button punta una seconda volta, il suo {{t:range}} è più stretto e più forte che al flop: ha rinunciato a una parte dei {{t:bluff}}. I tuoi {{t:draw|progetti}} hanno ormai una sola carta. Per questo:

- i {{t:draw|progetti}} {{t:call|chiamano}} solo a un buon prezzo o con implied odds (lezione precedente),
- le mani senza out e le {{t:pair|coppie}} più deboli {{t:fold|foldano}} più spesso,
- la {{t:top-pair}} di solito {{t:call|chiama}} ancora.

L'{{t:mdf}} resta il punto di riferimento: con una puntata di 3/4 di {{t:pot|piatto}} vale {{n:mdf.bet-three-quarters}}. In un esempio pubblicato sul turn il solver difendeva in media vicino a questo valore; {{t:out-of-position}} capita di difendere meno. Difendi meno anche quando l'avversario {{t:bluff|bluffa}} meno spesso di quanto presuppone l'{{t:mdf}}.

:::note Da dove vengono queste regole
Le regole sul probe bet e sulla difesa contro il {{t:second-barrel}} sono euristiche tratte da materiali didattici e analisi dei solver. La difesa al turn vicino all'{{t:mdf}} è mostrata da un esempio di solver pubblicato. L'app non indica frequenze in percentuale, perché le fonti variano a seconda del board. I dati su con quali mani i giocatori dei micro-limiti {{t:bet|puntano}} i probe bet richiedono una fonte con una popolazione descritta (campione, {{t:stakes|limiti}}, siti), quindi qui non ci sono.
:::
