---
id: m3.l2
module: m3
order: 2
title: "Mani di partenza"
sub: "Quali carte giocare prima del flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Quale mano è più forte?"
    options:
      - { text: "A♥ K♥ (stesso seme)", correct: true, why: "I valori sono gli stessi, ma la mano dello stesso seme ha una strada in più per vincere: il {{t:flush|colore}}." }
      - { text: "A♥ K♣ (semi diversi)", why: "Con semi diversi perdi la possibilità di fare {{t:flush|colore}}." }
      - { text: "Sono uguali", why: "Quasi, ma non del tutto. Il seme delle carte conta." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Nessuno è ancora entrato in gioco. Cosa fai?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "7-2 di semi diversi è una delle mani più deboli: le carte sono troppo distanti per formare insieme una {{t:straight|scala}}, raramente danno un {{t:flush|colore}} e la {{t:pair|coppia}} che centri ha un kicker debole. Spesso viene chiamata la mano peggiore, anche se, facendo i conti contro una mano casuale, alcune altre, ad es. 3-2 di semi diversi, vanno ancora peggio." }
      - { text: "{{t:raise|Rilancio}} per sorprendere", why: "Un {{t:bluff|bluff}} (giocare una mano debole perché gli avversari {{t:fold|foldino}} mani migliori) preflop con una delle mani più deboli, quando dietro di te ci sono ancora quattro giocatori, nel lungo periodo perde." }
      - { text: "{{t:call|Chiamo}}, perché costa poco", why: "Ogni ingresso “economico” con una mano debole si somma in grandi perdite." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "Il giocatore prima di te ha {{t:raise|rilanciato}}. Cosa fai?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Rilancio}} di nuovo (3-bet)", correct: true, why: "Hai la migliore mano possibile. Vuoi mettere nel piatto il più possibile e ridurre il numero di avversari." }
      - { text: "Mi limito a {{t:call|chiamare}}", why: "I giocatori esperti a volte lo fanno per confondere, ma come regola perdi valore e fai entrare gli altri a poco prezzo." }
      - { text: "{{t:fold|Foldo}}", why: "Non {{t:fold|foldi}} mai gli assi preflop. Contro qualsiasi altra mano sono favoriti, ad es. contro KK hanno circa {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Tutti hanno {{t:fold|foldato}} fino a te. Cosa fai?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Rilancio}}", correct: true, why: "QJ dello stesso seme è un'ottima mano per attaccare i blind dalla {{t:position|posizione}}: centra {{t:straight|scale}}, colori e {{t:pair|coppie}} alte." }
      - { text: "{{t:fold|Foldo}}", why: "Sul Button questa mano è troppo buona per {{t:fold|foldare}}." }
      - { text: "{{t:call|Chiamo}}", why: "Meglio {{t:raise|rilanciare}}: hai la possibilità di prendere subito i blind e giochi con l'{{t:initiative|iniziativa}}." }
---
I principianti perdono la maggior parte dei soldi giocando troppe mani deboli. Una buona selezione delle mani di partenza è il modo più rapido per smettere di perdere.

## Gruppi di mani

- **Le più forti**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] e AK dello stesso seme e di semi diversi, ad es. [[As Ks]] e [[As Kd]]. {{t:raise|Rilanci}} e, se qualcuno ha {{t:raise|rilanciato}} prima di te, di solito {{t:raise|rilanci}} di nuovo (3-bet) {{t:value|per valore}}, cioè perché l'avversario {{t:call|chiami}} con una mano più debole.
- **Forti**: JJ, TT, AQ, AJ dello stesso seme, KQ dello stesso seme.
- **Speculative**: {{t:pair|coppie}} basse e carte consecutive dello stesso seme, ad es. [[7h 6h]]. Buone in {{t:late-position|posizione avanzata}}.
- **Deboli**: scollegate, basse, di semi diversi, ad es. [[9c 3d]]. {{t:fold|Folda}}.

:::note Quante {{t:combo|combinazioni}} ci sono
Le mani di partenza sono in tutto {{n:combos.total}} {{t:combo|combinazioni}}, ma solo {{n:combos.kinds}} tipi: {{n:combos.kinds.pair}} {{t:pair|coppie}}, {{n:combos.kinds.suited}} mani dello stesso seme e {{n:combos.kinds.offsuit}} di semi diversi. Ogni {{t:pair|coppia}} conta {{n:combos.pair}} {{t:combo|combinazioni}}, una mano dello stesso seme {{n:combos.suited}} e una di semi diversi {{n:combos.offsuit}}. Per questo AK di semi diversi capita tre volte più spesso di AK dello stesso seme.
:::

I gruppi qui sopra sono una semplificazione per iniziare. I {{t:range|range}} di {{t:open|apertura}} esatti per ogni {{t:position|posizione}}, nella griglia dei {{t:range|range}}, li imparerai nella prossima lezione.
