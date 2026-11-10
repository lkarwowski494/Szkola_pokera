---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Quanto costa giocare e cosa cambia nelle decisioni"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Giochi a NL10 6-max su una delle grandi sale online. Quanto è grande il {{t:rake}} rispetto al winrate di un tipico giocatore vincente ai {{t:stakes|limiti}} bassi?"
    options:
      - { text: "Diverse volte più grande: circa {{n:rake.micro.low}}–{{n:rake.micro.high}} contro {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Convertendo in bb/100 le tabelle delle sale, ai microlimiti risulta circa {{n:rake.micro.low}}–{{n:rake.micro.high}}. Un giocatore vincente deve battere gli avversari di più di quanto vale il {{t:rake}}, e solo l'eccedenza è il suo winrate." }
      - { text: "Più o meno uguale", why: "Il {{t:rake}} ai microlimiti è circa {{n:rake.micro.low}}–{{n:rake.micro.high}}, mentre un winrate tipico è {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. La differenza è di diverse volte." }
      - { text: "Trascurabile, perché la sala prende solo qualche percento del {{t:pot|piatto}}", why: "Qualche percento di ogni {{t:pot|piatto}} dopo il flop si somma a circa {{n:rake.micro.low}}–{{n:rake.micro.high}}. È più di quanto vince un tipico giocatore vincente." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "In un report sulla popolazione cash 6-max, ogni giocatore NL100 perde in media {{n:rake.pop.nl100.loss}}. Da dove viene questa perdita?"
    options:
      - { text: "È il {{t:rake}}: senza di esso i giocatori, nel complesso, andrebbero in pari", correct: true, why: "I giocatori giocano tra loro, quindi ciò che uno vince, un altro lo perde. In media tutti perdono solo ciò che prende la sala. L'autore: «your biggest villain is the house»." }
      - { text: "Dal fatto che la maggior parte dei giocatori gioca male", why: "Il gioco scarso sposta denaro dai giocatori più deboli a quelli migliori, ma non cambia la media. La media la abbassa solo il {{t:rake}}." }
      - { text: "Dalla {{t:variance|varianza}}: con un campione più grande verrà zero", why: "La {{t:variance|varianza}}, cioè la dispersione dei risultati attorno al {{t:expected-value|valore atteso}}, agisce sui risultati dei singoli giocatori in entrambe le direzioni. La media dell'intera popolazione è negativa perché il {{t:rake}} lo pagano tutti." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Secondo una stima dell'autore degli stessi dati (con correzione bayesiana), tra i giocatori con almeno {{n:rake.pop.reg.hands}} mani circa {{n:rake.pop.reg.prerake}} vince prima della detrazione del {{t:rake}}. Quanti vincono dopo averlo detratto?"
    options:
      - { text: "Circa {{n:rake.pop.reg.postrake}}", correct: true, why: "Il {{t:rake}} si porta via quasi metà dei vincenti: circa {{n:rake.pop.reg.prerake}} prima del rake, circa {{n:rake.pop.reg.postrake}} dopo. Per questo il winrate lo calcoli sempre al netto del rake." }
      - { text: "Quasi altrettanti, circa {{n:rake.pop.reg.prerake}}", why: "Se il {{t:rake}} fosse piccolo, sarebbe così. Con un rake di qualche bb/100, molti giocatori vincenti prima del rake scendono sotto zero." }
      - { text: "Quasi nessuno", why: "Esagerato: circa {{n:rake.pop.reg.postrake}} di questo gruppo vince ancora. Il {{t:rake}} è un grosso ostacolo, ma non chiude la strada alla vittoria." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Perché a NL500 il {{t:rake}} in bb/100 è diverse volte più piccolo ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) che ai microlimiti?"
    options:
      - { text: "Perché i {{t:pot|piatti}} più grandi raggiungono più spesso il {{t:rake-cap|tetto del rake}}, che lì in bb è piccolo", correct: true, why: "La sala prende una percentuale del {{t:pot|piatto}}, ma non più di un tetto in dollari. Ai microlimiti il tetto vale molti bb e i {{t:pot|piatti}} lo raggiungono di rado, quindi paghi la percentuale piena. A NL500 lo stesso tetto è una frazione di bb." }
      - { text: "Perché a NL500 la sala prende una percentuale più bassa", why: "La percentuale è spesso simile (circa {{n:rake.ex.pct}}). La differenza la fa il {{t:rake-cap|tetto del rake}}, che ai {{t:stakes|limiti}} alti taglia la commissione sui {{t:pot|piatti}} grandi." }
      - { text: "Perché a NL500 si giocano meno mani all'ora", why: "bb/100 misura il {{t:rake}} ogni 100 mani, quindi il ritmo di gioco non lo cambia. Lo cambia il {{t:rake-cap|tetto del rake}} espresso in bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.half}}. La sala preleva il {{n:rake.ex.pct}} del {{t:pot|piatto}}, senza un {{t:rake-cap|tetto}} alla portata. Quanta equity ti serve per {{t:call|chiamare}}? Inserisci una percentuale."
    answer: eq.bet-half.rake
    explanation: "Dopo la {{t:call|chiamata}} nel {{t:pot|piatto}} ci sono {{n:ex.half.total}}, e al netto del rake restano {{n:rake.ex.pot-after}}. Aggiungi {{n:ex.bet.half}}, quindi ti serve {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} invece del {{n:eq.bet-half}} senza rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Senza {{t:rake}}, una {{t:call|chiamata}} contro un bet di metà {{t:pot|piatto}} richiede il {{n:eq.bet-half}} di equity. Quanta ne richiede con un {{t:rake}} del {{n:rake.ex.pct}}?"
    options:
      - { text: "Un po' di più: circa {{n:eq.bet-half.rake}}", correct: true, why: "Vinci il {{t:pot|piatto}} meno il {{t:rake}}, ma metti l'intera somma. Una mano appena sopra la soglia senza rake può essere già sotto la soglia con il rake." }
      - { text: "La stessa, perché il {{t:rake}} lo pagano entrambi i giocatori", why: "Il {{t:rake}} si sottrae dal {{t:pot|piatto}} che vinci, non dalla somma che aggiungi. La soglia sale a circa {{n:eq.bet-half.rake}}." }
      - { text: "Meno, perché il {{t:pot|piatto}} è più grande", why: "Il {{t:pot|piatto}} dopo il rake è più piccolo, non più grande, quindi ti serve più equity: circa {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Giochi in una sala che preleva il {{t:rake}} solo dai {{t:pot|piatti}} che arrivano al flop. Qualcuno prima di te {{t:open|apre}}, tu sei in {{t:position|posizione}} con una mano che senza rake sarebbe al limite della {{t:call|chiamata}}. Cosa cambia il {{t:rake}}?"
    options:
      - { text: "{{t:call|Chiamo}} meno spesso: le mani al limite della {{t:call|chiamata}} più spesso le {{t:fold|foldo}} o le 3-betto", correct: true, why: "Nelle soluzioni pubblicate di un solver con rake, i giocatori in {{t:position|posizione}} contro un'{{t:open|apertura}} giocano circa {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} mani in meno. Ci perde proprio la {{t:call|chiamata}}, perché il {{t:pot|piatto}} dopo il flop paga il {{t:rake}}, mentre il {{t:pot|piatto}} vinto con un 3-bet prima del flop no." }
      - { text: "Niente: il {{t:rake}} riguarda solo il gioco dopo il flop", why: "Proprio per questo cambia la decisione prima del flop: la {{t:call|chiamata}} porta al flop e al rake, mentre un 3-bet o un {{t:fold}} spesso chiudono la mano senza." }
      - { text: "{{t:call|Chiamo}} più spesso, perché i {{t:pot|piatti}} dopo il flop sono grandi", why: "Al contrario: il {{t:rake}} prende una parte proprio di quei {{t:pot|piatti}}. Il solver con rake {{t:call|chiama}} nettamente meno spesso." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Nelle stesse soluzioni del solver, il {{t:big-blind}} {{t:call|chiama}} un min-raise in un gioco con rake solo in circa {{n:rake.solver.bb-minraise}} dei casi in cui lo {{t:call|chiama}} senza rake. Cosa significa per te in {{t:big-blind}}?"
    options:
      - { text: "Difendo ancora molte mani, ma più stretto che nelle tabelle calcolate senza rake", correct: true, why: "Il {{t:big-blind}} difende ancora spesso, perché ha già delle {{t:chips|chip}} nel {{t:pot|piatto}} e chiude l'azione. Il {{t:rake}} però taglia le {{t:call|chiamate}} più deboli, quindi le tabelle senza rake per te sono troppo larghe." }
      - { text: "Smetto di difendere il {{t:big-blind}} con la {{t:call|chiamata}}", why: "No: secondo l'autore la {{t:call|chiamata}} dai blind resta una parte importante della strategia anche con il rake. Cambia l'ampiezza della difesa, non la sua esistenza." }
      - { text: "Difendo altrettanto largo, perché dal {{t:big-blind}} il {{t:rake}} non conta", why: "Conta: il {{t:pot|piatto}} dopo la {{t:call|chiamata}} arriva al flop e paga il {{t:rake}}. Per questo il solver {{t:call|chiama}} dal {{t:big-blind}} meno spesso." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "In alcune sale il {{t:rake}} viene prelevato anche dai {{t:pot|piatti}} con 3-bet che finiscono prima del flop. Cosa cambia nell'argomento «il 3-bet non paga rake»?"
    options:
      - { text: "In una sala così l'argomento si indebolisce: anche il 3-bet paga, quindi il vantaggio del 3-bet sulla {{t:call|chiamata}} è minore", correct: true, why: "Il risultato del solver riguarda la struttura «no flop, no drop», in cui il {{t:pot|piatto}} senza flop è esente dal rake. In una sala così questa regola copre solo i {{t:pot|piatti}} senza 3-bet, quindi la {{t:call|chiamata}} perde ancora per il rake, ma il 3-bet non ne è esente." }
      - { text: "Niente, perché il {{t:rake}} sul 3-bet è trascurabile", why: "Non lo sappiamo senza fare i conti per la sala specifica. L'unica certezza è che il 3-bet non è più esente dal rake." }
      - { text: "In una sala così bisogna sempre {{t:call|chiamare}} invece di 3-bettare", why: "La {{t:call|chiamata}} porta al flop e paga il {{t:rake}} come prima. Cambia solo che anche il 3-bet paga." }
---
Il {{t:rake}} è la commissione che la sala preleva dal {{t:pot|piatto}}. I giocatori giocano tra loro, quindi senza {{t:rake}} nel complesso andrebbero in pari. Con il rake, il giocatore medio perde esattamente quanto prende la sala, e un giocatore vincente deve battere gli avversari di più di quanto vale il {{t:rake}}.

## Quanto costa

La sala prende una percentuale del {{t:pot|piatto}}, ma non più di un {{t:rake-cap|tetto del rake}} in dollari. Sulle due sale online più grandi, a NL2–NL10 è il {{n:rake.ex.pct}} del {{t:pot|piatto}}. Ai microlimiti i {{t:pot|piatti}} raggiungono di rado il tetto, quindi paghi la percentuale piena.

Un confronto tra le tabelle delle sale le converte in bb/100 sulla distribuzione dei {{t:pot|piatti}} di diversi milioni di mani:

| {{t:stakes|Limite}} (6-max, le due sale online più grandi) | {{t:rake}} |
|---|---|
| NL2–NL25 | circa {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | circa {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Un tipico giocatore vincente ai {{t:stakes|limiti}} bassi ha un winrate di {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (modulo 12): diverse volte meno di quanto paga alla sala. Ai {{t:stakes|limiti}} più alti lo stesso tetto in dollari è una frazione di bb, quindi il {{t:rake}} in bb/100 scende.

I dati sulla popolazione dicono lo stesso. In un report sulla popolazione (cash 6-max, NL10–NL500), ogni giocatore perde in media {{n:rake.pop.nl10.loss}} a NL10, {{n:rake.pop.nl100.loss}} a NL100 e {{n:rake.pop.nl500.loss}} a NL500. Tra i giocatori NL100 con almeno {{n:rake.pop.reg.hands}} mani, secondo la stima dell'autore (correzione bayesiana), circa {{n:rake.pop.reg.prerake}} vince prima della detrazione del rake, e dopo la detrazione circa {{n:rake.pop.reg.postrake}} (nei dati grezzi {{n:rake.pop.reg.prerake.raw}} e {{n:rake.pop.reg.postrake.raw}}).

## La soglia di {{t:call|chiamata}} con il rake

Vinci il {{t:pot|piatto}} meno il {{t:rake}}, ma metti l'intera somma. L'equity necessaria del modulo 2 aumenta:

```formula
equity necessaria = somma da aggiungere ÷ ({{t:pot|piatto}} dopo la {{t:call|chiamata}} × (1 − {{t:rake}}))
```

Bet di {{n:ex.bet.half}} in un {{t:pot|piatto}} di {{n:ex.pot}}: senza rake ti serve il {{n:eq.bet-half}}, con un rake del {{n:rake.ex.pct}} il {{n:eq.bet-half.rake}}. La differenza è piccola in una singola mano, ma riguarda ogni {{t:pot|piatto}} dopo il flop.

## Cosa cambia il {{t:rake}} prima del flop

In molte sale il {{t:rake}} si preleva solo dai {{t:pot|piatti}} che arrivano al flop («no flop, no drop»). In quel caso il {{t:pot|piatto}} vinto prima del flop ne è esente, mentre il {{t:pot|piatto}} dopo una {{t:call|chiamata}} paga. Nelle soluzioni pubblicate di un solver con rake a NL100:

- i giocatori in {{t:position|posizione}} contro un'{{t:open|apertura}} giocano circa {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} mani in meno; ci perde soprattutto la {{t:call|chiamata}}, e i 3-bet sono un po' di più;
- il {{t:big-blind}} {{t:call|chiama}} un min-raise solo in circa {{n:rake.solver.bb-minraise}} dei casi in cui lo fa senza rake, anche se la difesa dai blind si basa ancora sulla {{t:call|chiamata}}.

Per lo stesso motivo, nel modulo 3 dallo {{t:small-blind}} {{t:raise|rilanci}} o {{t:fold|foldi}}, senza completare fino al {{t:big-blind}}. Alcune sale prelevano il {{t:rake}} anche dai {{t:pot|piatti}} con 3-bet che finiscono prima del flop; lì il 3-bet non ne è esente.

:::note Fonti
Entità del rake: confronto del rake delle sale online del 2026 (tabelle delle due sale più grandi convertite in bb/100, consultato il 5 ottobre 2026); altre sale hanno numeri diversi. Perdita della popolazione: report indipendente sulla popolazione (cash 6-max NLHE, sale con database di tracciamento delle mani, giocatori con almeno 100 mani; l'autore non indica le sale né il periodo). Effetto del rake sul gioco prima del flop: articolo pubblicato sulle dimensioni dei rilanci prima del flop, soluzioni di un solver per stack di {{n:rake.solver.depth}}; l'autore scrive che le conclusioni si estendono in gran parte ad altri formati, quindi per uno stack di {{n:format.stack}} è una semplificazione. La soglia di equity è un calcolo.
:::
