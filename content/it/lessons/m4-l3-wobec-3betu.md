---
id: m4.l3
module: m4
order: 3
title: "Quando ricevi un 3-bet"
sub: "Fold, call o 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "Hai {{t:open|aperto}} dal {{t:cutoff|CO}} a {{n:pf.open-size}}, il Button ha {{t:raise|rilanciato}} a {{n:pf.3bet.ip-total}}, i blind hanno {{t:fold|foldato}}. Con quale parte del tuo {{t:range|range}} di {{t:open|apertura}} devi continuare come minimo ({{t:call|chiamando}} o facendo 4-bet), perché il Button non guadagni con il 3-bet con qualsiasi mano?"
    table: { position: CO }
    options:
      - { text: "Circa il {{n:mdf.vs-3bet-ip-size}} del {{t:range|range}} di {{t:open|apertura}}", correct: true, why: "Il Button rischia {{n:pf.3bet.ip-total}} per vincere {{n:vs3bet.win}}. Se {{t:fold|foldi}} più del {{n:alpha.vs-3bet-ip-size}} delle volte, il suo 3-bet guadagna anche con la mano peggiore." }
      - { text: "Circa metà del {{t:range|range}}", why: "Troppo per un minimo: per la matematica basta il {{n:mdf.vs-3bet-ip-size}}. Secondo le soluzioni dei solver e le tabelle, chi {{t:open|apre}} {{t:fold|folda}} circa il {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} delle {{t:open|aperture}}, quindi continua con meno di metà del {{t:range|range}}." }
      - { text: "Sempre, con qualsiasi mano", why: "Così paghi i 3-bet con mani che perdono contro il {{t:range|range}} del Button. {{t:fold|Foldare}} la parte più debole delle {{t:open|aperture}} è corretto." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Hai {{t:open|aperto}} dal {{t:cutoff|CO}} a {{n:pf.open-size}}, il Button ha {{t:raise|rilanciato}} a {{n:pf.3bet.ip-total}}, i blind hanno {{t:fold|foldato}}. Cosa fai?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "KJ di semi diversi {{t:out-of-position}} è spesso dominato da AK, AJ e KQ, ed è difficile da giocare dopo il flop. I materiali didattici consigliano qui il {{t:fold}}." }
      - { text: "{{t:call|Chiamo}}", why: "È allettante, perché sono carte alte, ma {{t:out-of-position}} questa mano {{t:equity-realization|realizza l'equity}} male e spesso perde contro un kicker migliore." }
      - { text: "Faccio 4-bet", why: "KJo è troppo debole per un 4-bet {{t:value|per valore}}, e come {{t:bluff}} non blocca le mani con cui il Button continua." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Hai {{t:open|aperto}} dal {{t:cutoff|CO}} a {{n:pf.open-size}}, il Button ha {{t:raise|rilanciato}} a {{n:pf.3bet.ip-total}}, i blind hanno {{t:fold|foldato}}. Cosa fai?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Faccio 4-bet", correct: true, why: "Con AK di solito fai 4-bet: vuole mettere dentro lo stack, blocca AA e KK dell'avversario e domina AQ, KQ e gli assi più deboli." }
      - { text: "{{t:call|Chiamo}}", why: "Alcune fonti a volte {{t:call|chiamano}} con AK, ma di solito fai 4-bet: {{t:out-of-position}}, dopo il {{t:call|call}} perdi l'{{t:initiative|iniziativa}} e valore." }
      - { text: "{{t:fold|Foldo}}", why: "AK è una delle mani migliori preflop. Il {{t:fold|fold}} qui è un grosso errore." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Hai {{t:open|aperto}} dal Button a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:fold|foldato}}, il {{t:big-blind}} ha {{t:raise|rilanciato}} a {{n:pf.3bet.oop-total}}. Cosa fai?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Un {{t:connectors|connettore}} dello stesso seme {{t:in-position}} {{t:equity-realization|realizza l'equity}} bene: chiude {{t:straight|scale}} e colori, e quando manca è facile {{t:fold|foldarlo}} sul flop." }
      - { text: "{{t:fold|Foldo}}", why: "{{t:in-position|In posizione}} questa mano è abbastanza giocabile da difendere. Il {{t:fold|fold}} sarebbe troppo stretto." }
      - { text: "Faccio 4-bet", why: "Come {{t:bluff}} sono più adatti gli assi dello stesso seme, perché bloccano AA e AK. 87s preferisce vedere il flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Hai {{t:open|aperto}} dal Button a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:fold|foldato}}, il {{t:big-blind}} ha {{t:raise|rilanciato}} a {{n:pf.3bet.oop-total}}. Cosa fai?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Secondo una fonte, contro un 3-bet grande {{t:fold|foldi}} le {{t:pair|coppie}} più basse anche {{t:in-position}}: guadagnano soprattutto chiudendo un set, e il prezzo è troppo alto. Un'altra fonte ammette di {{t:call|chiamarle}} {{t:in-position}}." }
      - { text: "{{t:call|Chiamo}}, perché ho {{t:position|posizione}}", why: "La {{t:position|posizione}} aiuta, ma con un 3-bet a {{n:pf.3bet.oop-total}} il prezzo è troppo alto per una mano che deve chiudere un set." }
      - { text: "Faccio 4-bet", why: "La {{t:pair|coppia}} 33 non è una mano da 4-bet: non è né valore né un buon {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Hai {{t:open|aperto}} dal {{t:cutoff|CO}} a {{n:pf.open-size}}, il Button ha {{t:raise|rilanciato}} a {{n:pf.3bet.ip-total}}, i blind hanno {{t:fold|foldato}}. Cosa fai?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Faccio 4-bet", correct: true, why: "Una fonte fa 4-bet con QQ (e JJ) nella stragrande maggioranza dei casi: il Button continua con molte {{t:pair|coppie}} e assi più deboli." }
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Anche questa è una buona giocata: un'altra fonte mette QQ nel {{t:range|range}} di {{t:call|call}}, per non far scartare le mani più deboli del Button. Le fonti divergono, quindi entrambe le giocate sono buone." }
      - { text: "{{t:fold|Foldo}}", why: "QQ è la terza mano migliore preflop. Il {{t:fold|fold}} è un grosso errore." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Hai {{t:open|aperto}} dal {{t:cutoff|CO}} a {{n:pf.open-size}}, il Button ha {{t:raise|rilanciato}} a {{n:pf.3bet.ip-total}}, i blind hanno {{t:fold|foldato}}. Cosa fai?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Un asso forte dello stesso seme è la base del {{t:range|range}} di {{t:call|call}}: blocca AA e AK, chiude colori e buone {{t:pair|coppie}}." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo stretto: AJs è tra le mani migliori da difendere contro un 3-bet." }
      - { text: "Faccio 4-bet {{t:value|per valore}}", why: "AJs è troppo debole per voler giocare per l'intero stack. Le mani migliori del Button lo dominano." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Hai {{t:open|aperto}} dal Button a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:raise|rilanciato}} a {{n:pf.3bet.oop-total}}, il {{t:big-blind}} ha {{t:fold|foldato}}. Hai KK e vuoi fare 4-bet. A quanto?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "A circa {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|In posizione}} il 4-bet è di circa {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} il 3-bet. Se lo {{t:small-blind}} {{t:call|chiama}}, nel {{t:pot|piatto}} ci sono circa {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (con il {{t:big-blind|big blind}} morto), e negli stack resta circa {{n:spr.4bet.high}}–{{n:spr.4bet}} volte quanto c'è nel {{t:pot|piatto}}." }
      - { text: "A {{n:pf.4bet.too-small}}", why: "Troppo poco: dai all'avversario un prezzo molto buono per un {{t:call}} {{t:out-of-position}}." }
      - { text: "All-in per {{n:format.stack}}", why: "Con stack da {{n:format.stack}}, l'all-in spinge fuori le mani più deboli con cui l'avversario avrebbe pagato il 4-bet. Guadagni meno." }
---
Il 3-bet è la risposta dell'avversario alla tua {{t:open|apertura}}. Hai tre possibilità: {{t:fold|foldi}}, {{t:call|chiami}} oppure {{t:raise|rilanci}} ancora, cioè fai 4-bet.

:::note Da dove vengono queste regole
Questa lezione si basa su materiali didattici di diverse fonti e su risultati pubblicati di altri solver, non sul solver dell'app. Nel gioco contro il 3-bet il solver dell'app non è ancora stato validato, per questo le regole sono contrassegnate come euristiche.
:::

## Quanto continuare

Quando il Button {{t:raise|rilancia}} la tua {{t:open|apertura}} dal {{t:cutoff|CO}} a {{n:pf.3bet.ip-total}}, rischia questa cifra per vincere {{n:vs3bet.win}}. Se {{t:fold|foldi}} più del {{n:alpha.vs-3bet-ip-size}} delle volte, il suo 3-bet guadagna con qualsiasi mano. Devi quindi continuare con almeno circa il {{n:mdf.vs-3bet-ip-size}} del tuo {{t:range|range}} di {{t:open|apertura}}.

Secondo una soluzione pubblicata di un solver ({{t:cutoff|CO}} contro un 3-bet del Button a {{n:pf.3bet.ip-total}}), chi {{t:open|apre}} {{t:fold|folda}} circa il {{n:pf.vs3bet.pub1.fold}} delle {{t:open|aperture}}, {{t:call|chiama}} circa il {{n:pf.vs3bet.pub1.call}} e fa 4-bet con circa il {{n:pf.vs3bet.pub1.4bet}}; le tabelle semplificate di un'altra fonte danno circa {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Adottiamo intervalli vicini a entrambe le fonti: {{t:fold}} circa {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} circa {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet circa {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. Il limite superiore dei {{t:fold|fold}} è appena sotto la soglia del {{n:alpha.vs-3bet-ip-size}}: lasciando più spesso, il 3-bet del Button guadagnerebbe con qualsiasi mano. Per {{t:call|chiamare}} ti serve circa il {{n:eq.call-3bet-ip-size}} di equity: aggiungi {{n:vs3bet.call}} a un {{t:pot|piatto}} che dopo il {{t:call|call}} contiene {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Fuori posizione}} scegli con cura

{{t:out-of-position|Fuori posizione}} {{t:call|chiami}} con mani che giocano bene dopo il flop: soprattutto carte alte dello stesso seme (KQs, QJs), assi forti dello stesso seme, {{t:pair|coppie}} medie e alte e una parte dei {{t:connectors|connettori}} dello stesso seme. Le mani più deboli di semi diversi, come KJo, ATo o QTo, sono spesso dominate, quindi le {{t:fold|foldi}}.

## {{t:in-position|In posizione}} difendi più largo

{{t:in-position|In posizione}} {{t:call|chiami}} anche con le {{t:pair|coppie}} da 66 a TT e con i {{t:connectors|connettori}} dello stesso seme (T9s, 98s, 87s). Secondo una fonte, contro un 3-bet grande {{t:fold|foldi}} le {{t:pair|coppie}} più basse anche {{t:in-position}}: guadagnano soprattutto chiudendo un set, e il prezzo è troppo alto. Un'altra fonte ammette di {{t:call|chiamarle}} {{t:in-position}}.

## 4-bet

Con AA, KK e AK di solito fai 4-bet {{t:value|per valore}}; con AK alcune fonti a volte {{t:call|chiamano}}. Le fonti giocano QQ e JJ in modo diverso: una fa soprattutto 4-bet, l'altra {{t:call|chiama}}. Come {{t:bluff}} i migliori sono gli assi dello stesso seme, per esempio A5s: bloccano AA e AK dell'avversario e, dopo un {{t:call|call}}, hanno possibilità di fare {{t:flush|colore}} e {{t:straight|scala}}. La dimensione del 4-bet è di circa {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} il 3-bet {{t:in-position}} e {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Per esempio, quando dal Button fai 4-bet sul 3-bet dello {{t:small-blind|small blind}} a {{n:pf.3bet.oop-total}} (il {{t:big-blind}} ha {{t:fold|foldato}}), {{t:raise|rilanci}} a {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; quando dal {{t:cutoff|CO}} fai 4-bet sul 3-bet del Button a {{n:pf.3bet.ip-total}}, {{t:raise|rilanci}} a circa {{n:pf.4bet.oop-example.low}}. Dopo un {{t:call|call}}, negli stack resta circa {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} volte quanto c'è nel {{t:pot|piatto}}, quindi le mani buone mettono facilmente dentro il resto.
