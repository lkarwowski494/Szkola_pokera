---
id: m11.l1
module: m11
order: 1
title: "Stack corto: all-in o fold"
sub: "Quando il rilancio diventa un all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Torneo}}. Hai {{n:m11.depth.10}} e tutti prima di te hanno {{t:fold|foldato}}. Quale piano di gioco è semplice e verificato nelle fonti?"
    options:
      - { text: "All-in o {{t:fold}}", correct: true, why: "Con circa {{n:m11.thr.pushfold}} o meno le fonti concordano nel consigliare il push/fold. Il rilancio e il {{t:fold}} dopo un {{t:raise|rilancio}} ti farebbero cedere troppo stack, mentre l'all-in ne ricava il maggior numero di {{t:fold}} dell'avversario." }
      - { text: "Rilancio a {{n:pf.open-size}}, poi decido dopo un {{t:raise|rilancio}}", why: "Dopo un rilancio così ti resta poco dietro al {{t:pot|piatto}}, quindi contro un {{t:raise|rilancio}} all-in sei comunque quasi costretto a {{t:call|chiamare}}. L'avversario non è obbligato a {{t:fold|foldare}} e tu perdi fold equity." }
      - { text: "{{t:call|Chiamo}} il blind (limp) e vedo il flop", why: "Il limp non ti dà la possibilità di vincere subito il {{t:pot|piatto}}. I solver con la scelta completa di azioni a volte fanno limp, ma è una strategia per giocatori avanzati; il piano semplice e sicuro è all-in o {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Hai {{n:m11.thr.raise}} o più e {{t:open|apri}} il gioco per primo. Cosa fai con una mano che vuoi giocare?"
    options:
      - { text: "Di solito rilancio (ad es. al minimo)", correct: true, why: "Sopra circa {{n:m11.thr.raise}} le fonti consigliano un rilancio normale: hai ancora margine per {{t:fold|foldare}} su un {{t:raise|rilancio}} o per giocare dopo il flop." }
      - { text: "Sempre all-in", why: "Andare all-in con uno stack così grande significa rischiare molto per vincere solo i blind. Le mani più deboli {{t:fold|foldano}}, quelle migliori pagano." }
      - { text: "Push/fold come con {{n:m11.thr.pushfold}}", why: "Il push/fold è uno strumento per lo {{t:short-stack|short stack}}: fino a circa {{n:m11.thr.pushfold}}, e per le mani più deboli fino a circa {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Hai {{n:m11.m.stack}} {{t:chips|fiche}}. I blind sono {{n:m11.m.sb}}/{{n:m11.m.bb}} e il {{t:big-blind}} versa anche un ante di {{n:m11.m.ante}}. Quanto vale il tuo M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. È il numero di giri che superi senza giocare. In {{t:big-blind|big blind}} sono {{n:m11.m.bbs}}, ma M conta anche l'ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Il tuo M è sceso a circa {{n:m11.m.example}}. Cosa dice in proposito il modello delle zone di M?"
    options:
      - { text: "{{t:red-zone|Zona rossa}}: solo all-in o {{t:fold}}, meglio da primo", correct: true, why: "Con un M di circa {{n:m11.m.red}} o meno ti restano solo all-in o {{t:fold}}. Entrare per primo ti dà la possibilità che tutti {{t:fold|foldino}}." }
      - { text: "{{t:green-zone|Zona verde}}: giochi normalmente", why: "La {{t:green-zone|zona verde}}, in cui lo stack ti permette di giocare liberamente, inizia solo da un M di circa {{n:m11.m.green}}. Con un M di circa {{n:m11.m.example}} lo stack basta per {{n:m11.m.example}} giri." }
      - { text: "Aspetti gli assi, tanto hai tempo", why: "Con un M di circa {{n:m11.m.example}} i blind si mangeranno lo stack prima che ti arrivi una mano forte. Devi andare all-in con un {{t:range}} più ampio." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Hai {{n:m11.depth.10}} in {{t:small-blind}} e tutti hanno {{t:fold|foldato}}. Colora le mani con cui vai all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small blind}}, tutti hanno {{t:fold|foldato}}, hai K2o. Con {{n:m11.depth.10}} il solver va all-in con questa mano. E con {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Con {{n:m11.depth.15}} rischi di più rispetto ai blind, quindi il {{t:range}} di all-in si restringe da circa {{n:m11.push.10}} a circa {{n:m11.push.15}} mani. K2o ne resta fuori." }
      - { text: "All-in, perché il re è una carta forte", why: "Con {{n:m11.depth.15}} K2o trova troppo spesso un re migliore o un asso nel {{t:range}} di {{t:call|chiamata}}. Il solver la {{t:fold|folda}}." }
      - { text: "All-in, perché più lo stack è profondo, più si gioca largo", why: "Al contrario: più lo stack è profondo, più è stretto il {{t:range}} di all-in. Il {{t:shove|push}} più largo lo fai con uno {{t:short-stack|short stack}} molto corto." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small blind}}, {{n:m11.depth.10}}, senza ante. Quante volte su cento il {{t:big-blind}} dovrebbe {{t:fold|foldare}} perché un all-in con una mano senza alcuna possibilità vada in pareggio?"
    options:
      - { text: "Più di {{n:m11.push.10.alpha}}", correct: true, why: "Rischi {{n:m11.push.10.risk}} per vincere {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) fa circa {{n:m11.push.10.alpha}}. L'avversario non {{t:fold|folda}} così spesso, quindi l'all-in conviene solo con una mano che abbia anche equity quando l'avversario {{t:call|chiama}}." }
      - { text: "Più della metà", why: "La metà basterebbe se rischiassi quanto puoi vincere. Qui rischi {{n:m11.push.10.risk}} e vinci solo {{n:m11.push.10.win}} blind." }
      - { text: "Basta che a volte {{t:fold|foldi}}", why: "Ogni {{t:call|chiamata}} costa a una mano senza possibilità l'intero stack. Senza equity ti servono {{t:fold}} molto frequenti: più di {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Perché con uno {{t:short-stack|short stack}} preferisci andare all-in per primo invece di aspettare che qualcun altro vada all-in e poi {{t:call|chiamare}}?"
    options:
      - { text: "Perché l'all-in vince in due modi", correct: true, why: "Entrando per primo, vinci il {{t:pot|piatto}} quando tutti {{t:fold|foldano}}, oppure vinci allo showdown. {{t:call|Chiamando}}, vinci solo allo showdown." }
      - { text: "Perché l'all-in ha sempre più equity", why: "L'equity di una mano non dipende da chi è entrato per primo. La differenza è che l'all-in dà all'avversario la possibilità di {{t:fold|foldare}}." }
      - { text: "Perché {{t:call|chiamare}} un all-in è vietato", why: "{{t:call|Chiamare}} è consentito, ma per {{t:call|chiamare}} ti serve una mano più forte (lezione sulla {{t:call|chiamata}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Stesso stack di {{n:m11.depth.10}} in {{t:small-blind}}, ma si gioca con il {{t:bb-ante}}: il {{t:big-blind}} ha versato un ante di {{n:m11.ante}}. Come cambia il {{t:range}} di all-in?"
    options:
      - { text: "Si allarga: circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} invece di {{n:m11.push.10}}", correct: true, why: "L'ante aumenta il {{t:pot|piatto}} che vinci quando l'avversario {{t:fold|folda}}: {{n:m11.push.10.win-ante}} invece di {{n:m11.push.10.win}}. A una mano senza possibilità ora servono solo più di {{n:m11.push.10.alpha-ante}} {{t:fold}}, quindi conviene fare più all-in." }
      - { text: "Si restringe, perché l'avversario ha di più nel {{t:pot|piatto}} e {{t:call|chiamerà}} più spesso", why: "L'avversario in effetti {{t:call|chiama}} più largo, ma il {{t:pot|piatto}} più grande da vincere pesa di più. L'equilibrio è di circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mani." }
      - { text: "Non cambia", why: "L'ante cambia il rapporto tra rischio e ricompensa. Senza ante circa {{n:m11.push.10}}, con ante circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
In un {{t:tournament|torneo}} i blind salgono, ma lo stack no. Prima o poi ne hai così poco che il rilancio normale smette di funzionare. A quel punto entra in gioco la strategia **push/fold**: con ogni mano che giochi fai {{t:shove|push}}, cioè vai all-in, e tutte le altre le {{t:fold|foldi}}.

## Quando all-in o {{t:fold}}

Conti lo stack in {{t:big-blind|big blind}}. Le fonti concordano su una cosa: con circa **{{n:m11.thr.pushfold}} o meno** giochi ormai quasi esclusivamente all-in o {{t:fold}}.

| Stack | Cosa fai di solito |
|---|---|
| circa {{n:m11.thr.pushfold}} o meno | all-in o {{t:fold}} |
| da {{n:m11.thr.pushfold}} a {{n:m11.thr.upper}} | push/fold con le mani più deboli e medie |
| oltre circa {{n:m11.thr.raise}} | rilancio normale |

Perché non rilanciare? Se hai {{n:m11.depth.10}} e rilanci a {{n:pf.open-size}}, ti resta così poco dietro al {{t:pot|piatto}} che contro un {{t:raise|rilancio}} all-in sei comunque quasi obbligato a {{t:call|chiamare}}. L'avversario sa che non {{t:fold|folderai}}, quindi non ha nulla da temere. Andare subito all-in spreme dallo stack il massimo della **fold equity**, cioè del guadagno che ottieni quando l'avversario {{t:fold|folda}}.

:::note Semplificazione
Il push/fold è una semplificazione. I solver che possono scegliere anche il limp e un rilancio piccolo, con {{n:m11.depth.10}} fanno limp o rilanciano al minimo con una parte delle mani. L'all-in o {{t:fold}} è però semplice, è difficile commettere grandi errori e le fonti lo consigliano come punto di partenza.
:::

## M: quanti giri sopravvivi

Un diffuso modello da torneo misura lo {{t:short-stack|short stack}} in un altro modo: **M** è lo stack diviso per il costo di un giro completo dei giocatori al tavolo.

```formula
M = stack ÷ (small blind + big blind + ante)
```

Esempio: hai {{n:m11.m.stack}} {{t:chips|fiche}}, blind {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}} {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. In {{t:big-blind|big blind}} sono {{n:m11.m.bbs}}, ma M tiene conto anche dell'ante. Con un M di circa {{n:m11.m.red}} o meno ({{t:red-zone|zona rossa}}) ti restano ormai solo all-in o {{t:fold}}.

## Più lo stack è corto, più si gioca largo

Le griglie di questa lezione le ha calcolate il solver di questa app per la situazione più semplice: tutti hanno {{t:fold|foldato}}, giochi dallo {{t:small-blind}} contro il {{t:big-blind}} e ognuno può solo andare all-in o {{t:fold|foldare}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Con {{n:m11.depth.15}} vai all-in con circa {{n:m11.push.15}} mani, con {{n:m11.depth.10}} con circa {{n:m11.push.10}}, e con {{n:m11.depth.5}} ormai con circa {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Meno rischi rispetto ai blind, più mani diventano redditizie. Per confronto, la tabella di un sito di formazione indica {{n:m11.ext.push.10}} con {{n:m11.depth.10}}; la differenza rientra nella tolleranza di validazione del solver e la direzione è la stessa.

## Tre giocatori: più avversari hai dietro, più stretto

Quando giochi dal Button, dietro di te ci sono ancora due giocatori, non uno. Ognuno di loro può avere una mano forte, quindi che {{t:fold|foldino}} entrambi succede più di rado. Con tre giocatori e stack di {{n:m11.depth.3max}} ciascuno, il Button va all-in con circa {{n:m11.3max.push.btn}} mani, e lo {{t:small-blind}}, quando il Button ha {{t:fold|foldato}}, con circa {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Abbiamo confrontato queste due griglie con un risultato di equilibrio pubblicato per la stessa situazione (un articolo scientifico del 2008: Button {{n:m11.jamfold3.btn}}). Le poche mani in cui i risultati differiscono non entrano negli esercizi.

## Due modi per vincere

L'all-in vince quando l'avversario {{t:fold|folda}}, oppure quando {{t:call|chiama}} e perde allo showdown. Il solo {{t:fold}} dell'avversario raramente basta: con {{n:m11.depth.10}} rischi {{n:m11.push.10.risk}} per vincere {{n:m11.push.10.win}} blind, quindi una mano senza possibilità avrebbe bisogno di {{t:fold}} in più di {{n:m11.push.10.alpha}} dei casi. Per questo contano sia la fold equity sia l'equity della mano quando l'avversario {{t:call|chiama}}.

## L'ante allarga il {{t:range}}

L'ante sono {{t:chips|fiche}} in più nel {{t:pot|piatto}} prima della distribuzione delle carte. Con il {{t:bb-ante}} il {{t:big-blind}} versa un ante di {{n:m11.ante}}, quindi l'all-in vince {{n:m11.push.10.win-ante}} invece di {{n:m11.push.10.win}}, mentre il rischio resta lo stesso. In questa struttura il {{t:range}} si allarga da circa {{n:m11.push.10}} a circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mani (il solver dell'app e un calcolo di equilibrio indipendente differiscono di una frazione di punto).

```range
push.sb-10-ante
```
