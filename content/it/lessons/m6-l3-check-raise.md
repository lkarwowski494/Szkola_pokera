---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Quando rilanciare un c-bet e a quanto"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Difendi il {{t:big-blind|big blind}} contro l'{{t:open|apertura}} del Button. Al flop fai {{t:check}}, il Button {{t:bet|punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "La {{t:two-pair|doppia coppia}} su un flop basso e {{t:connected|connesso}} è una mano {{t:value|da valore}}. Su flop come questo il {{t:big-blind|big blind}} ha più combinazioni fortissime del Button. {{t:raise|Rilanciando}} costruisci il {{t:pot|piatto}} e fai pagare {{t:pair|coppie}} e {{t:draw|progetti}}." }
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Va bene anche questo: su un flop molto {{t:connected|connesso}} il solver, con una parte delle {{t:two-pair|doppie coppie}}, si limita a {{t:call|chiamare}}. Il check-raise costruisce il {{t:pot|piatto}} e protegge la mano più spesso." }
      - { text: "{{t:fold|Foldo}}", why: "La {{t:two-pair|doppia coppia}} è una delle mani più forti su questo flop. {{t:fold|Foldare}} è un grave errore." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.third.pot}}, il Button {{t:bet|punta}} un c-bet di {{n:ex.third.bet}}. Hai un set e vuoi fare check-raise. A quanto {{t:raise|rilanci}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "A {{n:xr.example}}", correct: true, why: "È {{n:xr.mult.example}} il c-bet. Il Button deve aggiungere {{n:xr.example.extra}} e gli serve circa il {{n:eq.vs-xr.example}} di equity: le {{t:pair|coppie}} peggiori e i {{t:draw|progetti}} deboli (gutshot) non hanno il prezzo, mentre i progetti di {{t:flush|colore}} e gli {{t:oesd|OESD}} pagheranno già in un {{t:pot|piatto}} grande." }
      - { text: "A {{n:xr.too-small}}", sizeError: true, why: "Azione giusta, ma taglia troppo piccola: il Button aggiunge solo {{n:xr.too-small.extra}} e gli serve circa l'{{n:eq.vs-xr.too-small}} di equity. Qualsiasi {{t:flush-draw|progetto di colore}} o di {{t:straight|scala}} pagherà quasi gratis." }
      - { text: "{{t:call|Chiamo}}", why: "Su un flop con due cuori e carte da {{t:straight|scala}} perdi valore e protezione: molte carte al turn fermeranno l'azione o batteranno la tua mano. Il set vuole costruire il {{t:pot|piatto}} subito." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.third.pot}}, il Button {{t:bet|punta}} un c-bet di {{n:ex.third.bet}}. Fai check-raise a {{n:xr.mult.example}} il c-bet. A quanto {{t:raise|rilanci}}? Inserisci il numero di {{t:chips|fiches}}."
    table: { position: BB }
    answer: xr.example
    explanation: "Il c-bet è {{n:ex.third.bet}}, quindi {{n:xr.mult.example}} il c-bet fa {{n:xr.example}}. La taglia del check-raise si calcola sul c-bet, non sul {{t:pot|piatto}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Nel {{t:pot|piatto}} c'erano {{n:ex.third.pot}}, il Button {{t:bet|ha puntato}} {{n:ex.third.bet}} e tu {{t:raise|hai rilanciato}} a {{n:xr.example}}. Che percentuale di equity serve al Button per {{t:call|chiamare}}? Inserisci il numero."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Il Button aggiunge {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. Nel {{t:pot|piatto}} ci sono allora {{n:xr.example.pot-after}}, e dopo la sua {{t:call|chiamata}} {{n:xr.example.extra}} in più. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Nel {{t:pot|piatto}} c'erano {{n:ex.third.pot}}, il Button {{t:bet|ha puntato}} {{n:ex.third.bet}} e tu {{t:raise|hai rilanciato}} solo a {{n:xr.too-small}}. Quanta equity serve al Button per {{t:call|chiamare}}?"
    table: { position: BB }
    options:
      - { text: "Circa {{n:eq.vs-xr.too-small}}", correct: true, why: "Aggiunge {{n:xr.too-small.extra}} a un {{t:pot|piatto}} di {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. A un prezzo così basso pagherà con quasi ogni mano, per questo il {{t:raise|rilancio}} deve essere diverse volte più grande del c-bet." }
      - { text: "Circa {{n:eq.vs-xr.example}}", why: "Questo gli servirebbe contro un {{t:raise|rilancio}} a {{n:xr.example}}. Contro {{n:xr.too-small}} aggiunge solo {{n:xr.too-small.extra}}." }
      - { text: "Circa {{n:eq.bet-third}}", why: "Questo serviva a te per {{t:call|chiamare}} il c-bet. Dopo il check-raise calcoli il prezzo del Button: aggiunge {{n:xr.too-small.extra}} a un {{t:pot|piatto}} di {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Difendi il {{t:big-blind|big blind}} contro l'{{t:open|apertura}} del Button. Al flop fai {{t:check}}, il Button {{t:bet|punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:draw|progetto}} al miglior {{t:flush|colore}} è un buon {{t:semi-bluff}}: vinci se il Button {{t:fold|folda}}, e se paga hai ancora {{n:outs.flush}} out (circa il {{n:odds.flush.flop-turn}} al turn)." }
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Va bene anche questo: chiudi il {{t:flush|colore}} al turn circa nel {{n:odds.flush.flop-turn}} dei casi, quasi quanto il prezzo di {{n:eq.bet-third}}, e quando chiudi il miglior {{t:flush|colore}} vinci di più (implied odds). I {{t:draw|progetti}} forti li giochi in entrambi i modi, così il tuo check-raise non rappresenta solo mani forti." }
      - { text: "{{t:fold|Foldo}}", why: "Grave errore: con {{n:outs.flush}} out chiudi il miglior {{t:flush|colore}} al turn circa nel {{n:odds.flush.flop-turn}} dei casi, quasi quanto il prezzo di {{n:eq.bet-third}}, e quando chiudi vinci di più (implied odds). In più puoi fare check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Difendi il {{t:big-blind|big blind}} contro l'{{t:open|apertura}} del Button. Al flop fai {{t:check}}, il Button {{t:bet|punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:oesd|OESD}} ({{n:outs.oesd}} out) contro un c-bet piccolo, che ti dà un'occasione economica per {{t:raise|rilanciare}}. {{t:raise|Rilanciando}} puoi vincere subito, e se ricevi una {{t:call|chiamata}} puoi ancora chiudere." }
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Va bene anche questo: chiudi la {{t:straight|scala}} al turn circa nel {{n:odds.oesd.flop-turn}} dei casi, un po' meno del prezzo di {{n:eq.bet-third}}, ma quando chiudi vinci di più (implied odds), e se al turn nessuno {{t:bet|punta}} vedi anche il river gratis. Con una parte dei {{t:draw|progetti}} forti {{t:call|chiami}}, così le tue {{t:call|chiamate}} non sono tutte deboli." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto: con {{n:outs.oesd}} out chiudi la {{t:straight|scala}} al turn circa nel {{n:odds.oesd.flop-turn}} dei casi, non molto meno del prezzo di {{n:eq.bet-third}}; il resto lo danno le implied odds e la possibilità di un river gratis. In più puoi fare check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Difendi il {{t:big-blind|big blind}} contro l'{{t:open|apertura}} del Button. Al flop fai {{t:check}}, il Button {{t:bet|punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "La {{t:top-pair|top pair}} con un kicker debole è una mano da {{t:call|chiamata}}. Batte i {{t:bluff}} del Button, e {{t:call|chiamando}} li tieni in gioco." }
      - { text: "Check-raise", why: "Di solito {{t:call|chiami}}. Dopo un {{t:raise|rilancio}} ti pagano soprattutto mani migliori e {{t:draw|progetti}}; il check-raise con una mano così è una giocata rara del solver contro c-bet piccoli." }
      - { text: "{{t:fold|Foldo}}", why: "La {{t:top-pair|top pair}} contro un c-bet piccolo è decisamente troppo per {{t:fold|foldare}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Difendi il {{t:big-blind|big blind}} contro l'{{t:open|apertura}} del Button. Al flop fai {{t:check}}, il Button {{t:bet|punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Non hai né una {{t:pair|coppia}} né un {{t:flush-draw|progetto di colore}}; hai solo un debole {{t:straight-draw|progetto di scala}} backdoor (ti servono due carte precise), e nessuna delle tue carte è più alta del board. Sui flop con l'asso {{t:fold|foldi}} più mani come questa." }
      - { text: "Check-raise come {{t:bluff}}", why: "I {{t:bluff}} in check-raise li fai soprattutto con {{t:draw|progetti}} ({{t:flush|colore}}, {{t:oesd|OESD}}) che vincono anche quando chiudono. Questa mano ha solo un debole {{t:draw|progetto}} backdoor, e qui il Button ha molti assi e re che non {{t:fold|folderanno}}." }
      - { text: "{{t:call|Chiamo}}", why: "Il prezzo è buono, ma questa mano non chiuderà quasi nulla: anche una {{t:pair|coppia}} di sei o di cinque perde con la maggior parte delle mani con cui il Button continuerà a pagare." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Contro quale c-bet del Button fai check-raise più spesso?"
    table: { position: BB }
    options:
      - { text: "1/4 del {{t:pot|piatto}}", correct: true, why: "Un c-bet piccolo ti dà un'occasione economica per {{t:raise|rilanciare}}, e il Button lo {{t:bet|punta}} con un {{t:range}} ampio con molte mani deboli. Contro un c-bet grande {{t:raise|rilanci}} meno spesso e più stretto: soprattutto set e {{t:two-pair|doppie coppie}}, meno {{t:bluff}}." }
      - { text: "{{t:pot|Piatto}} intero", why: "Contro un c-bet grande il {{t:raise|rilancio}} costa molto, e il {{t:range}} del Button è più forte. Più spesso {{t:call|chiami}} o {{t:fold|foldi}}." }
      - { text: "Con la stessa frequenza", why: "Contro c-bet piccoli {{t:raise|rilanci}} più spesso e più largo; contro quelli grandi meno spesso, soprattutto con le mani più forti." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Giochi contro un Button che al flop non {{t:fold|folda}} quasi mai. {{t:bet|Punta}} un c-bet da 1/3 del {{t:pot|piatto}}. Cosa fai?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Un gutshot con una carta alta è una buona {{t:call|chiamata}} al prezzo di {{n:eq.bet-third}}. Il check-raise di {{t:bluff}} guadagna sui {{t:fold}}, e questo avversario non {{t:fold|folda}} quasi mai, quindi il {{t:raise|rilancio}} perde il suo vantaggio principale." }
      - { text: "Check-raise", why: "I {{t:bluff}} in check-raise li fai soprattutto con {{t:draw|progetti}} forti, e il gutshot non è tra questi. In più il {{t:bluff}} guadagna sui {{t:fold}}, e questo avversario non {{t:fold|folda}} quasi mai: contro di lui {{t:raise|rilanci}} soprattutto {{t:value|per valore}}." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto: un {{t:draw|progetto}} con una carta alta a un prezzo così buono si difende, indipendentemente da chi hai di fronte." }
---
Il check-raise è un {{t:check}} seguito da un {{t:raise|rilancio}} sulla {{t:bet|puntata}} dell'avversario. Dal {{t:big-blind|big blind}} è un'arma importante contro i c-bet (il più delle volte scegli comunque tra {{t:call|chiamata}} e {{t:fold}}): senza di essa il Button potrebbe fare c-bet a basso costo con quasi ogni mano.

## Perché {{t:raise|rilanciare}}

Fai check-raise per due motivi:

- **{{t:value|per valore}}**: hai una mano molto forte ({{t:two-pair|doppia coppia}}, set) e vuoi costruire il {{t:pot|piatto}},
- **come {{t:semi-bluff}}**: hai un {{t:draw|progetto}} ({{t:flush|colore}}, {{t:oesd|OESD}}) che vince in due modi: quando il Button {{t:fold|folda}} o quando chiudi.

Con le mani medie, ad esempio la {{t:top-pair|top pair}} con un kicker debole, di solito {{t:call|chiami}}: dopo un {{t:raise|rilancio}} le mani peggiori del Button {{t:fold|foldano}} più spesso, mentre quelle migliori pagano. È una semplificazione: contro c-bet piccoli il solver {{t:raise|rilancia}} anche una parte delle {{t:top-pair|top pair}} e delle {{t:pair|coppie}} deboli per protezione. Al contrario, con la {{t:two-pair|doppia coppia}} su un flop molto {{t:connected|connesso}} il solver spesso si limita a {{t:call|chiamare}}.

## Quando più spesso

- **Contro un c-bet piccolo.** Il {{t:raise|rilancio}} costa poco, e il Button {{t:bet|punta}} un c-bet piccolo con un {{t:range}} ampio. Contro un c-bet grande {{t:raise|rilanci}} meno spesso e più stretto: soprattutto set e {{t:two-pair|doppie coppie}}, meno {{t:bluff}}.
- **Sui flop bassi e {{t:connected|connessi}}** (ad es. [[7h 6d 5s]]). Il {{t:big-blind|big blind}} difende molte mani basse, quindi di solito qui ha più {{t:two-pair|doppie coppie}} e {{t:straight|scale}} del Button, cioè il {{t:nuts-advantage|vantaggio di nuts}}.
- **Meno spesso sui flop alti favorevoli al Button**, ad es. K-J-T o A-A-K: lì è lui ad avere più mani fortissime.

## Che taglia

La taglia del check-raise si calcola sul c-bet. Esempio: nel {{t:pot|piatto}} ci sono {{n:ex.third.pot}}, c-bet {{n:ex.third.bet}}. Un check-raise a {{n:xr.mult.example}} il c-bet è un {{t:raise|rilancio}} a {{n:xr.example}}: il Button aggiunge {{n:xr.example.extra}} e gli serve circa il **{{n:eq.vs-xr.example}}** di equity. Un {{t:raise|rilancio}} solo a {{n:xr.too-small}} gli dà un prezzo di circa **{{n:eq.vs-xr.too-small}}**: pagherà con quasi ogni mano che abbia un {{t:draw|progetto}} qualsiasi. Per questo {{t:raise|rilanci}} a circa {{n:xr.mult.low}}–{{n:xr.mult.example}} il c-bet, tanto di più quanto più piccolo è il c-bet, e non al minimo.

:::note Un avversario che non {{t:fold|folda}}
Il {{t:bluff}} in check-raise guadagna sui {{t:fold}} (ricorda l'alpha della prima lezione). Contro un giocatore che al flop non {{t:fold|folda}} quasi mai, {{t:raise|rilanci}} soprattutto {{t:value|per valore}} e tieni i {{t:bluff}} per i {{t:draw|progetti}} più forti.
:::
