---
id: m11.l3
module: m11
order: 3
title: "ICM e bubble factor"
sub: "Le fiches non sono denaro"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Restano tre giocatori e sono pagati due posti. Stack: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fiches}}. Secondo l'{{t:icm}}, qual è la probabilità dello stack più corto di arrivare 1°? Inserisci un numero in percentuale."
    answer: m11.icm.a.chips3
    explanation: "Probabilità del 1° posto = stack ÷ tutte le {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Stessi stack ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Lo stack grande ha preso il 1° posto. Qual è ora la probabilità dello stack più corto di arrivare 2°?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Restano due giocatori con {{n:m11.icm.a.rest1}} {{t:chips|fiches}}, di cui il corto ne ha {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Questa è la probabilità del 1° posto, calcolata su tutte le {{t:chips|fiches}}. Quando il vincitore esce dal conteggio, dividi solo per le {{t:chips}} dei giocatori rimasti: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Questa è la probabilità totale dello {{t:short-stack|short stack}} di arrivare 2°, su entrambi i possibili vincitori. La domanda riguarda il caso in cui ha vinto lo stack grande." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Pagamenti}}: {{n:m11.icm.a.p1}} del {{t:prize-pool|montepremi}} per il 1° posto e {{n:m11.icm.a.p2}} per il 2°. Stack {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Secondo l'{{t:icm}}, quanto vale lo stack più corto (in percentuale del {{t:prize-pool|montepremi}})? Inserisci un numero."
    answer: m11.icm.a.eq3
    explanation: "Probabilità del 1° posto {{n:m11.icm.a.chips3}}, del 2° posto {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, più del suo {{n:m11.icm.a.chips3}} delle {{t:chips|fiches}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Lo stack grande ha {{n:m11.icm.a.chips1}} delle {{t:chips|fiches}} in gioco. Secondo l'{{t:icm}}, quanto vale in denaro?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, cioè meno della sua quota di {{t:chips|fiches}}", correct: true, why: "Lo stack grande può vincere al massimo {{n:m11.icm.a.p1}} del {{t:prize-pool|montepremi}}, anche se può conquistare tutte le {{t:chips}}. Per questo le {{t:chips}} del leader valgono meno della loro quota, e quelle dello {{t:short-stack|short stack}} di più ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, quanto la sua quota di {{t:chips|fiches}}", why: "Sarebbe così se il vincitore prendesse l'intero {{t:prize-pool|montepremi}}. Con {{t:payout|pagamenti}} {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, ogni {{t:chips|fiche}} dello stack grande vale meno: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, perché vincerà quasi sicuramente", why: "Ha solo {{n:m11.icm.a.chips1}} di probabilità del 1° posto, e il resto della sua {{t:tournament-equity|equity di torneo}} gli viene dal 2° posto. In totale {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bolla}}: quattro giocatori, tre posti pagati. {{t:call|Chiamando}} un all-in, se perdi perdi {{n:m11.bf.loss}} del {{t:prize-pool|montepremi}}, se vinci guadagni {{n:m11.bf.gain}}. Quanto vale il bubble factor? Inserisci un numero con due decimali."
    answer: m11.bf.value
    explanation: "Bubble factor = perdita ÷ guadagno = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Perdere fa male quasi una volta e mezza in più di quanto vincere aiuti."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Il bubble factor è {{n:m11.bf.value}}. Quanta equity ti serve perché il {{t:call}} dell'all-in convenga? Inserisci un numero in percentuale."
    answer: m11.bf.req
    explanation: "Equity necessaria = BF ÷ (BF + 1), cioè perdita ÷ (perdita + guadagno) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Nel gioco a {{t:chips}} basterebbe {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Nel gioco a {{t:chips}}, per {{t:call|chiamare}} questo all-in basta {{n:m11.bf.req-chips}} di equity, ma secondo l'{{t:icm}} te ne serve {{n:m11.bf.req}}. Come si chiama la differenza?"
    options:
      - { text: "{{t:risk-premium|Risk premium}} ({{n:m11.bf.premium}})", correct: true, why: "Il {{t:risk-premium|risk premium}} è l'equity aggiuntiva che l'{{t:icm}} richiede oltre al prezzo in {{t:chips|fiches}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Il bubble factor è il rapporto tra perdita e guadagno ({{n:m11.bf.value}}). Da esso calcoli l'equity necessaria, e la differenza rispetto al gioco a {{t:chips}} è il {{t:risk-premium}}." }
      - { text: "Fold equity", why: "La fold equity è il profitto dai {{t:fold|fold}} dell'avversario. Quando {{t:call|chiami}} un all-in, non ce l'hai." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bolla}}, l'esempio della lezione. La tua mano ha circa {{n:m11.bf.example-eq}} di equity contro il {{t:range}} di all-in dell'avversario. Nel gioco a {{t:chips}} il {{t:call}} converrebbe, perché basta {{n:m11.bf.req-chips}}. Cosa fai qui?"
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Secondo l'{{t:icm}} qui ti serve {{n:m11.bf.req}} di equity. Una mano che vince meno spesso perde denaro, anche se in {{t:chips|fiches}} sarebbe in attivo." }
      - { text: "{{t:call|Chiamo}}, perché in {{t:chips|fiches}} è un guadagno", why: "In un {{t:tournament|torneo}} con {{t:payout|pagamenti}} conta il denaro, non le {{t:chips}}. Perdere ti costa {{n:m11.bf.loss}} del {{t:prize-pool|montepremi}}, mentre vincere ti dà solo {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Chiamo}}, perché vinco più della metà delle volte", why: "Una mano con {{n:m11.bf.example-eq}} vince più della metà delle volte, ma qui è comunque troppo debole: la soglia è {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bolla}} del {{t:tournament|torneo}}. Hai lo stack più grande al tavolo e {{t:cover|copri}} tutti. Lo stack medio passa contro di te molto spesso. Cosa ne consegue?"
    options:
      - { text: "Puoi {{t:shove|pushare}} più largo, perché gli avversari {{t:call|chiamano}} stretto", correct: true, why: "Lo stack medio, quando {{t:call|chiama}}, rischia di uscire appena prima dei premi, quindi gli serve molta equity. Tu, se perdi, perdi solo una parte dello stack. Gli avversari {{t:call|chiamano}} stretto, quindi più spesso ti prendi il {{t:pot|piatto}} senza combattere." }
      - { text: "Giochi più stretto per non perdere il comando", why: "Il leader ha il rischio più basso al tavolo. Giocare stretto gli fa rinunciare al suo vantaggio principale: la pressione sugli stack medi." }
      - { text: "Niente, perché l'{{t:icm}} riguarda solo gli {{t:short-stack|short stack}}", why: "L'{{t:icm}} riguarda tutti: cambia quanta equity serve a ciascuno per {{t:call|chiamare}}, e questo dipende dall'intera distribuzione degli stack." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "Che cosa presuppone il modello {{t:icm}}?"
    options:
      - { text: "Che tutti giochino ugualmente bene e che a decidere i piazzamenti siano solo gli stack", correct: true, why: "L'{{t:icm}} converte i soli stack in probabilità di piazzamento. Non conosce la {{t:position|posizione}}, i blind crescenti né i vantaggi di abilità." }
      - { text: "Che il giocatore migliore vinca più spesso", why: "Al contrario: l'{{t:icm}} presuppone abilità uguali. Il vantaggio di un giocatore non lo considera affatto." }
      - { text: "Che il giocatore in {{t:big-blind|big blind}} abbia meno probabilità", why: "L'{{t:icm}} non conosce la {{t:position|posizione}} né i blind: guarda solo gli stack. È uno dei suoi limiti." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
Nel gioco a soldi (cash) una {{t:chips|fiche}} è denaro: quella vinta e quella persa valgono lo stesso. In un {{t:tournament|torneo}} non è così. I premi vanno ai primi piazzamenti, e il vincitore non prende tutto il {{t:prize-pool|montepremi}}, anche se prende tutte le {{t:chips}}. Per questo le {{t:chips}} vanno convertite in denaro.

## {{t:icm}}: lo stack in denaro

Il modello delle {{t:chips|fiches}} indipendenti ({{t:icm}}) converte gli stack in probabilità di finire in ciascun posto. Presuppone che tutti giochino ugualmente bene, quindi l'ordine d'arrivo dipende solo dagli stack.

```formula
probabilità del 1° posto = il tuo stack ÷ tutte le fiches
```

La probabilità del 2° posto la calcoli allo stesso modo, ma separatamente per ogni possibile vincitore: togli le sue {{t:chips}} e dividi per ciò che resta. L'{{t:tournament-equity|equity di torneo}} di uno stack, cioè la sua quota attesa del {{t:prize-pool|montepremi}}, è la somma di: probabilità del piazzamento × {{t:payout}} per quel piazzamento.

## Esempio: tre giocatori in {{t:bubble|bolla}}

Sono pagati due posti: {{n:m11.icm.a.p1}} e {{n:m11.icm.a.p2}} del {{t:prize-pool|montepremi}}. Stack: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fiches}}.

- Lo {{t:short-stack|short stack}} vince il {{t:tournament}} con probabilità {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Per il 2° posto: se vince lo stack grande ({{n:m11.icm.a.chips1}}), il corto arriva secondo con probabilità {{n:m11.icm.a.second3.via1}}; se vince il medio ({{n:m11.icm.a.chips2}}), con probabilità {{n:m11.icm.a.second3.via2}}. In totale {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (le componenti sono arrotondate).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** del {{t:prize-pool|montepremi}}.

| Stack | Quota di {{t:chips|fiches}} | Equity secondo l'{{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

Lo {{t:short-stack|short stack}} vale più delle sue {{t:chips}}, quello grande meno: il leader non può ottenere più del premio per il 1° posto.

## Bubble factor: perdere fa più male

Quattro giocatori, tre posti pagati: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} e {{n:m11.bf.p3}}. Stack {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (tu), {{n:m11.bf.s3}} e {{n:m11.bf.s4}}. Il giocatore con {{n:m11.bf.s3}} va all-in e tu lo {{t:cover|copri}}, cioè hai più {{t:chips|fiches}}. Per semplicità ignoriamo i blind nel {{t:pot|piatto}}.

- Ora il tuo stack vale {{n:m11.bf.eq.now}} del {{t:prize-pool|montepremi}}.
- Se vinci: hai {{n:m11.bf.win}}, l'avversario esce e sono tutti a premio. La tua equity sale a {{n:m11.bf.eq.win}}, cioè di **{{n:m11.bf.gain}}**.
- Se perdi: ti restano {{n:m11.bf.lose}} e l'equity scende a {{n:m11.bf.eq.lose}}, cioè di **{{n:m11.bf.loss}}**.

```formula
bubble factor = perdita se perdi ÷ guadagno se vinci
```

Qui {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. L'app usa questa definizione (perdita ÷ guadagno): nel gioco a {{t:chips}}, dove la perdita è uguale al guadagno, il bubble factor vale uno. Alcune tabelle push/fold calcolano il bubble factor in un altro modo, su un'altra scala, quindi non confrontare direttamente i loro numeri con questi. Dal bubble factor deriva l'equity necessaria:

```formula
equity necessaria = BF ÷ (BF + 1)
```

Risulta **{{n:m11.bf.req}}**. Nel gioco a {{t:chips}} rischi {{n:m11.bf.s3}} per vincere {{n:m11.bf.s3}}, quindi basterebbe {{n:m11.bf.req-chips}}. La differenza, {{n:m11.bf.premium}}, è il **{{t:risk-premium}}**.

La stessa tendenza si vede in un equilibrio pubblicato per tre giocatori con stack uguali (un articolo scientifico del 2008): quando il Button e lo {{t:small-blind}} sono già all-in, il {{t:big-blind}} in una singola mano {{t:call|chiama}} con {{n:m11.jamfold3.overcall.single}} delle mani, mentre in un {{t:tournament|torneo}} con {{t:payout|pagamenti}} solo con {{n:m11.jamfold3.overcall.tourn}}, cioè solo le {{t:pocket-pair|coppie servite}} più alte e AKs.

:::note Chi {{t:call|chiama}} stretto
Uno stack medio in {{t:bubble|bolla}} o al {{t:final-table|tavolo finale}} (l'ultimo tavolo di un {{t:tournament|torneo}}, dove si gioca per i premi più alti) {{t:call|chiama}} gli all-in molto più stretto che nel gioco a {{t:chips}}. Uno stack grande che {{t:cover|copre}} gli avversari rischia meno e può sfruttarlo: {{t:shove|pushare}} più largo, perché gli avversari devono {{t:fold|foldare}}. Il bubble factor dipende da tutti gli stack al tavolo, perciò non si calcola al tavolo: lo si allena sugli esempi, per sviluppare la sensibilità.
:::

## Limiti dell'{{t:icm}}

L'{{t:icm}} non tiene conto della {{t:position|posizione}}, dei blind crescenti né dell'abilità dei giocatori. È un'approssimazione, non una valutazione esatta del {{t:tournament|torneo}}.
