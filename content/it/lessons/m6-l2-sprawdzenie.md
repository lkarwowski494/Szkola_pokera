---
id: m6.l2
module: m6
order: 2
title: "Chiamare o foldare"
sub: "Difendersi dal c-bet fuori posizione"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Nel {{t:pot|piatto}} ci sono {{n:ex.third.pot}}, il Button {{t:bet|punta}} un c-bet di {{n:ex.third.bet}}. Quanta equity ti serve per {{t:call|chiamare}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Aggiungi {{n:ex.third.bet}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} sarà di {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Un c-bet piccolo offre un prezzo molto buono." }
      - { text: "{{n:alpha.bet-third}}", why: "Questo è alpha: quanto spesso il {{t:bluff}} del Button deve funzionare. Al denominatore dell'equity necessaria aggiungi anche il tuo {{t:call}}." }
      - { text: "{{n:mdf.bet-third}}", why: "Questa è la {{t:mdf}}, cioè una parte del {{t:range|range}}, non l'equity di una singola mano. Del resto, al flop {{t:out-of-position}} difendi un po' meno della {{t:mdf}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, il Button {{t:bet|punta}} un c-bet di {{n:ex.bet.three-quarters}}. Quale percentuale di equity ti serve per {{t:call|chiamare}}? Inserisci un numero."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Aggiungi {{n:ex.bet.three-quarters}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} sarà di {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ questa somma = {{n:eq.bet-three-quarters}}. È quasi il doppio rispetto a un c-bet di 1/4 del {{t:pot|piatto}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Stessa mano, stesso flop. Una volta il Button {{t:bet|punta}} 1/3 del {{t:pot|piatto}}, un'altra volta il {{t:pot|piatto}} intero. Come cambia la tua difesa?"
    table: { position: BB }
    options:
      - { text: "Contro il {{t:pot|piatto}} intero difendi con un {{t:range|range}} più stretto", correct: true, why: "Una puntata più grande significa un prezzo peggiore: l'equity necessaria sale da {{n:eq.bet-third}} a {{n:eq.bet-pot}}, e la {{t:mdf}} scende da {{n:mdf.bet-third}} a {{n:mdf.bet-pot}}. Le mani più deboli che chiamavano la puntata piccola ora le {{t:fold|foldi}}." }
      - { text: "Difendi allo stesso modo, perché è la stessa mano", why: "La mano è la stessa, ma il prezzo è diverso. Contro una puntata grande quanto il {{t:pot|piatto}} ti serve {{n:eq.bet-pot}} di equity invece di {{n:eq.bet-third}}." }
      - { text: "Contro il {{t:pot|piatto}} intero difendi più largo, perché una puntata grande è più spesso un {{t:bluff}}", why: "Non esiste una regola simile. Una puntata grande di solito indica un {{t:range}} {{t:polarized}} (mani molto forti e {{t:bluff|bluff}}), e in ogni caso un prezzo peggiore per te." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop {{t:check|fai check}}, il Button {{t:bet|punta}} un c-bet di 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "La {{t:pair}} media batte tutti i {{t:bluff|bluff}} del Button (mani senza {{t:pair|coppia}}), e per {{t:call|chiamare}} ti serve solo {{n:eq.bet-third}} di equity. Una difesa standard." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto. Contro un c-bet piccolo {{t:fold|foldi}} le mani più deboli senza {{t:pair|coppia}} e senza {{t:draw|progetto}}, non una {{t:pair|coppia}}." }
      - { text: "Check-raise", why: "Di solito {{t:call|chiami}}. Dopo un {{t:raise|rilancio}} ti pagano soprattutto mani migliori e {{t:draw|progetti}}; il check-raise con una mano così è una giocata rara del solver contro i c-bet piccoli." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop {{t:check|fai check}}, il Button {{t:bet|punta}} un c-bet di 3/4 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Non hai né {{t:pair|coppia}} né {{t:draw|progetto}} (nessuna carta di picche, e la {{t:straight}} è lontana). Contro un c-bet grande ti serve {{n:eq.bet-three-quarters}} di equity, e {{t:out-of-position}} arriverai raramente allo showdown con sole carte alte. Neanche una {{t:pair|coppia}} di donne o di fanti vincerà sempre." }
      - { text: "{{t:call|Chiamo}}", why: "È allettante, perché donna e fante sono più alti del board. Ma le sole carte alte non bastano a questo prezzo: al turn spesso affronterai un'altra puntata e {{t:fold|folderai}}." }
      - { text: "Check-raise", why: "Per il {{t:bluff|bluff}} sono più adatte le mani con un {{t:draw|progetto}}, che hanno una seconda strada per vincere. Questa mano non ne ha nessuna." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop {{t:check|fai check}}, il Button {{t:bet|punta}} un c-bet di 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Due carte alte più un {{t:flush-draw}} aggiuntivo (backdoor: tre picche, ti serve una picche sia al turn sia al river). Al prezzo di {{n:eq.bet-third}} basta per {{t:call|chiamare}}." }
      - { text: "Check-raise", why: "Di solito no. Fai check-raise soprattutto con le mani più forti e con i {{t:draw|progetti}} ({{t:flush}}, {{t:oesd}}). Un {{t:flush-draw}} aggiuntivo è debole: quando il Button paga, di solito ti restano solo carte alte. Questa mano la {{t:call|chiami}}." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto contro un c-bet piccolo. Il {{t:draw}} aggiuntivo e due carte alte danno abbastanza equity al prezzo di {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop {{t:check|fai check}}, il Button {{t:bet|punta}} un c-bet di 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Hai un gutshot alla {{t:straight|scala}} (donna) e un re più alto del board. La {{t:call|chiamata}} compra una carta: chiudi il gutshot al turn in circa il {{n:odds.gutshot.flop-turn}} dei casi, e il re aggiunge alcuni out per la {{t:top-pair|coppia massima}}. Insieme è meno del prezzo di {{n:eq.bet-third}}, ma se chiudi la {{t:straight|scala}} vincerai di più (implied odds), e il re da solo a volte batte i {{t:bluff|bluff}} del Button. Contro un c-bet piccolo basta per {{t:call|chiamare}}." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto: un {{t:draw}} più una carta alta è abbastanza contro un c-bet piccolo." }
      - { text: "Check-raise all-in", why: "Rischi tutto lo stack con una mano che ancora non ha niente. Con questa dimensione fai uscire le mani più deboli, e pagano solo quelle migliori." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Difendi il {{t:big-blind}} contro l'{{t:open|apertura}} del Button. Al flop {{t:check|fai check}}, il Button {{t:bet|punta}} un c-bet di 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Non hai né {{t:pair|coppia}} né {{t:flush-draw|progetto di colore}}; hai solo un debole {{t:straight-draw}} aggiuntivo (ti servono due carte precise), e nessuna delle tue carte è più alta del board. Su un flop con asso e re il Button ha molte mani forti. Il prezzo è buono, ma questa mano non lo realizzerà quasi mai." }
      - { text: "{{t:call|Chiamo}}, perché la {{t:mdf}} è {{n:mdf.bet-third}}", why: "La {{t:mdf}} è un punto di riferimento per tutto il {{t:range|range}}, non un motivo per pagare con le mani più deboli. Al flop {{t:out-of-position}} puoi difendere un po' meno della {{t:mdf}}." }
      - { text: "Check-raise", why: "Su un flop con asso e re il {{t:range-advantage}} è dalla parte del Button, e tu non hai un {{t:draw|progetto}} che ti dia una seconda strada per vincere." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Perché {{t:out-of-position}} al flop non {{t:call|chiami}} con ogni mano la cui equity è anche solo un po' più alta del prezzo?"
    table: { position: BB }
    options:
      - { text: "Perché non realizzerai tutta l'equity", correct: true, why: "L'equity è la probabilità di vincere giocando fino allo showdown senza ulteriori {{t:bet|puntate}}. {{t:out-of-position|Fuori posizione}} parli per primo al turn e al river e spesso {{t:fold|folderai}} su un'altra puntata. Le mani deboli allora realizzano meno della loro equity." }
      - { text: "Perché al flop il Button ha sempre una mano forte", why: "Il Button {{t:open|apre}} e fa c-bet largo, anche con {{t:bluff|bluff}}. Il problema è la tua {{t:position}}, non la sua forza." }
      - { text: "Perché bisogna risparmiare {{t:chips}} per occasioni migliori", why: "Conta il {{t:expected-value}} di ogni decisione, non risparmiare {{t:chips|fiches}}." }
---
In M5 hai giocato il c-bet da {{t:aggressor}}. Ora sei dall'altra parte: difendi il {{t:big-blind}}, fai check al flop e il Button {{t:bet|punta}} un c-bet. Ricorda da M5: il c-bet è una {{t:bet}} del giocatore che ha {{t:raise|rilanciato}} preflop, e il {{t:range-advantage}} dipende dalla {{t:texture|texture}} del flop.

## Il prezzo del c-bet

Prima calcoli quanta equity ti serve (la formula di M2). Un c-bet piccolo offre un ottimo prezzo, uno grande uno nettamente peggiore.

| C-bet del Button | Equity necessaria | {{t:mdf}} |
|---|---|---|
| 1/4 del {{t:pot|piatto}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 del {{t:pot|piatto}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 del {{t:pot|piatto}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 del {{t:pot|piatto}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|Piatto}} intero | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

La {{t:mdf}} indica la direzione: più grande è la puntata, meno mani difendi. Al flop {{t:out-of-position}} puoi difendere un po' meno della {{t:mdf}}, perché i {{t:bluff|bluff}} del Button hanno ancora equity, ma contro un c-bet piccolo non {{t:fold|foldi}} in massa.

## {{t:out-of-position|Fuori posizione}} realizzi meno

L'equity è la probabilità di vincere giocando fino alla fine senza ulteriori {{t:bet|puntate}}. {{t:out-of-position|Fuori posizione}} parli per primo in ogni {{t:street}}, quindi spesso {{t:fold|folderai}} prima di vedere lo showdown. Le mani deboli senza {{t:draw|progetto}} realizzano meno di quanto indicherebbe la loro equity. Le mani dello stesso seme, i {{t:connectors|connettori}} e le {{t:pair|coppie}} realizzano di più, perché chiudono punti forti o sono già avanti.

## Con cosa {{t:call|chiami}}

Contro un c-bet piccolo (circa 1/3 del {{t:pot|piatto}}) continui:

- con quasi ogni {{t:pair|coppia}}, anche media e bassa,
- con {{t:flush-draw|progetti di colore}} e di {{t:straight|scala}}, anche con un gutshot con una carta alta,
- con carte alte con un {{t:draw|progetto}} aggiuntivo (backdoor), ad es. tre carte dello stesso seme,
- di solito anche con l'asso come carta più alta.

Ricorda da M2: il {{t:call}} di una {{t:bet|puntata}} al flop compra una carta, quindi confronti il {{t:draw}} con la probabilità al turn. Questa probabilità a volte è un po' più bassa del prezzo di un c-bet piccolo. La {{t:call|chiamata}} conviene comunque quando, dopo aver chiuso il punto, vincerai più di quanto c'è ora nel {{t:pot|piatto}} (le cosiddette implied odds, le calcolerai in M7), oppure quando la mano a volte vince senza chiudere nulla, ad es. grazie a una carta alta.

## Con cosa {{t:fold|foldi}}

- le mani senza {{t:pair|coppia}} e senza {{t:draw|progetto}} che non hanno né un asso né carte più alte del board; sui flop con l'asso ne {{t:fold|foldi}} di più,
- di solito due carte alte senza {{t:draw|progetto}}, quando il c-bet è grande (sui flop {{t:dry|asciutti}} con il re, però, il solver {{t:call|chiama}} con molte mani con un asso); {{t:call|chiami}} piuttosto quando hai un {{t:draw}} aggiuntivo, meglio se al {{t:flush|colore}} massimo.

Quando il c-bet cresce, le mani più deboli successive passano dalla {{t:call|chiamata}} al fold.
