---
id: m3.l3
module: m3
order: 3
title: "Range di apertura"
sub: "Con cosa entrare per primo, posizione per posizione"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Tutti prima di te hanno {{t:fold|foldato}} e sei sul Button. Colora le mani con cui {{t:open|apri}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Sei il primo a parlare ({{t:utg}}). Colora le mani con cui {{t:open|apri}}."
---
Il {{t:range|range}} di {{t:open|apertura}} è l'elenco delle mani con cui {{t:raise|rilanci}} quando tutti prima di te hanno {{t:fold|foldato}}. Le griglie qui sotto sono state calcolate dal solver preflop di questa app per il gioco a un tavolo da 6 giocatori con stack da {{n:format.stack}}.

## Come leggere la griglia

Ogni casella è un tipo di mano. Sopra la diagonale ci sono le mani dello stesso seme (es. AKs), sotto quelle di semi diversi (es. AKo) e sulla diagonale le {{t:pair|coppie}}. Una casella verde è un {{t:raise|rilancio}}, una vuota è un {{t:fold|fold}}. Una casella riempita solo in parte significa che il solver gioca la mano solo a volte. Se la {{t:open|apre}} con una frequenza tra {{n:range.mixed.low}} e {{n:range.mixed.high}} (queste soglie sono un'impostazione dell'app), è una {{t:mixed-hand|mano mista}}: negli esercizi accettiamo allora entrambe le risposte. Un'azione che il solver gioca in meno del {{n:range.mixed.low}} dei casi, ma almeno nel {{n:range.mixed.min}}, è considerata accettabile dagli esercizi: non è un errore, ma il ripasso di questo esercizio tornerà prima. Un'azione che il solver gioca in meno del {{n:range.mixed.min}} dei casi viene valutata dagli esercizi come imprecisione (è così che chiama queste mosse la scala di valutazione pubblicata dal sito del solver), mentre un'azione che il solver non gioca mai viene valutata come errore.

## Dalla prima {{t:position|posizione}} al Button

```range
rfi.utg
```

Da {{t:utg}} il solver {{t:open|apre}} {{n:solver.rfi.utg}} delle mani. Le fonti professionali indicano {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

A ogni {{t:position|posizione}} più vicina al Button il {{t:range|range}} cresce: l'{{t:hijack|HJ}} {{t:open|apre}} {{n:solver.rfi.hj}} e il {{t:cutoff|CO}} già {{n:solver.rfi.co}} delle mani.

```range
rfi.btn
```

Sul Button il solver {{t:open|apre}} già {{n:solver.rfi.btn}} delle mani, perché restano solo i blind e dopo il flop hai la {{t:position|posizione}}.

```range
rfi.sb
```

Lo {{t:small-blind|small blind}} gioca ormai solo contro il {{t:big-blind|big blind}}, quindi {{t:open|apre}} più o meno largo quanto il Button: circa {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} delle mani, anche se dopo il flop parla per primo. Ai micro {{t:stakes|limiti}}, dallo {{t:small-blind|small blind}} {{t:raise|rilanci}} oppure {{t:fold|foldi}}, senza completare fino al {{t:big-blind|big blind}}: il {{t:rake}} prelevato dal {{t:pot|piatto}} riduce il profitto del completare. È una semplificazione: alcune soluzioni dei solver completano con una parte delle mani dallo {{t:small-blind|small blind}}. Il solver dell'app da qui {{t:open|apre}} {{n:solver.rfi.sb}} delle mani, cioè nell'intervallo indicato dalle fonti.

:::note A un tavolo da 9 giocatori
A un tavolo da 9 giocatori, prima dell'{{t:hijack|HJ}} ci sono altre tre {{t:position|posizioni}}: {{t:utg}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2, seguite dal LJ. Dietro a {{t:utg}} siedono allora otto giocatori, quindi da {{t:utg}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2 {{t:open|apri}} più stretto che da {{t:utg}} a un tavolo da 6 giocatori: dietro di te siedono più giocatori. Quando questi tre giocatori {{t:fold|foldano}}, il LJ gioca come {{t:utg}} a un tavolo da 6 giocatori e le {{t:position|posizioni}} successive come nelle griglie qui sopra. Per le {{t:position|posizioni}} iniziali a un tavolo da 9 giocatori indichiamo solo la direzione: non abbiamo ancora verificato i numeri né la composizione di questi {{t:range|range}} con le soluzioni dei solver pubblicate.
:::

:::note Come ricordare
Non imparare a memoria {{n:combos.kinds}} caselle. Ricorda i confini: quali {{t:pair|coppie}}, quali assi dello stesso seme e da quale carta iniziano le mani di semi diversi. Gli esercizi qui sotto estraggono più spesso proprio le mani al confine del {{t:range|range}}.
:::

Questi {{t:range|range}} provengono da un modello che semplifica il gioco dopo il flop, per questo in una quindicina di mani al confine del {{t:range|range}} differiscono dalle tabelle professionali, a volte in una direzione, a volte nell'altra. Si tratta soprattutto di mani dello stesso seme con un buco (es. 75s, 97s) e di mani deboli di semi diversi (es. A4o, K7o). Gli esercizi non valutano queste mani.
