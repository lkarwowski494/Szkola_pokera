---
id: m12.l4
module: m12
order: 4
title: "Bankroll e rischio"
sub: "La varianza misurata in buy-in e quando scendere di limite"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Un {{t:buy-in|buy-in}} equivale a {{n:format.stack}}. Quanti bb ha un bankroll di {{n:br.bi.base}} {{t:buy-in|buy-in}}? Inserisci un numero."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Il bankroll lo conti in {{t:buy-in|buy-in}} del {{t:stakes|limite}} a cui giochi."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Vinci {{n:var.wr.typical.high}} con una {{t:standard-deviation|deviazione standard}} di {{n:var.sd}} e hai {{n:br.bi.base}} {{t:buy-in|buy-in}} ({{n:br.base.bb}}). Qual è il rischio di perdere tutto il bankroll?"
    options:
      - { text: "Circa {{n:ror.base}}", correct: true, why: "L'esponente è 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, quindi RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. È la probabilità di perdere prima o poi tutto il bankroll, se non scendi mai di {{t:stakes|limite}}." }
      - { text: "Circa {{n:ror.half}}", why: "Questo è il risultato con metà bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-in}}. Con {{n:br.bi.base}} l'esponente è il doppio, quindi il rischio scende a circa {{n:ror.base}}." }
      - { text: "Zero, perché il giocatore è vincente", why: "Anche un giocatore vincente può incappare in un {{t:downswing}} più profondo dell'intero bankroll. Il rischio diminuisce con il bankroll, ma non scende mai a zero." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Stesso bankroll di {{n:br.bi.base}} {{t:buy-in|buy-in}}, {{t:standard-deviation|deviazione standard}} {{n:var.sd}}, ma winrate di soli {{n:var.wr.typical.low}}. Qual è il rischio di perdere il bankroll?"
    options:
      - { text: "Circa {{n:ror.base.wr-min}}", correct: true, why: "Il winrate sta nell'esponente: con {{n:var.wr.typical.low}} invece di {{n:var.wr.typical.high}} l'esponente è tre volte più piccolo, e il rischio sale da circa {{n:ror.base}} a circa {{n:ror.base.wr-min}}." }
      - { text: "Circa {{n:ror.base}}, perché il bankroll è lo stesso", why: "Il rischio dipende dal prodotto winrate × bankroll. Un winrate più basso agisce come un bankroll più piccolo: il risultato è circa {{n:ror.base.wr-min}}." }
      - { text: "Circa {{n:ror.base.wr-ex}}", why: "Questo è il risultato con un winrate di {{n:var.wr.ex}}. Con {{n:var.wr.typical.low}} il rischio è decine di volte più alto: circa {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Hai {{n:br.bi.base}} {{t:buy-in|buy-in}}, {{t:standard-deviation|deviazione standard}} {{n:var.sd}}, ma non conosci ancora il tuo winrate. Cosa sai del rischio di perdere tutto il bankroll?"
    options:
      - { text: "Dipende dal winrate: con {{n:var.wr.typical.high}} circa {{n:ror.base}}, con {{n:var.wr.typical.low}} circa {{n:ror.base.wr-min}}", correct: true, why: "Il winrate sta nell'esponente accanto al bankroll. Se non conosci il winrate, non conosci nemmeno il rischio, e con un winrate basso lo stesso bankroll dà un rischio diverse volte più alto." }
      - { text: "Circa {{n:ror.base}}, perché dipende solo dal bankroll", why: "Questo risultato vale solo con {{n:var.wr.typical.high}}. Con {{n:var.wr.typical.low}} lo stesso bankroll dà circa {{n:ror.base.wr-min}}." }
      - { text: "Zero, perché {{n:br.bi.base}} {{t:buy-in|buy-in}} sono tanti", why: "Con un winrate positivo il rischio diminuisce con il bankroll, ma non scende mai a zero. Con {{n:var.wr.typical.low}} è ancora circa {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Hai iniziato a questo {{t:stakes|limite}} con {{n:br.bi.base}} {{t:buy-in|buy-in}}. Dopo un {{t:downswing}} ne hai {{n:br.ex.below}}. Cosa fai?"
    options:
      - { text: "Scendi di un {{t:stakes|limite}}", correct: true, why: "Sei sceso sotto la metà del bankroll previsto ({{n:br.bi.move-down}}). Con così pochi {{t:buy-in|buy-in}} il rischio di perdere il resto è diverse volte più alto che con {{n:br.bi.base}} (con winrate {{n:var.wr.typical.high}} e SD {{n:var.sd}}). A un {{t:stakes|limite}} dimezzato lo stesso bankroll torna a essere quasi il numero completo di {{t:buy-in|buy-in}} di quel limite." }
      - { text: "Continui a giocare, perché è solo {{t:variance|varianza}}", why: "È vero che probabilmente è {{t:variance|varianza}}, ma scendere di {{t:stakes|limite}} serve proprio a proteggerti da essa. Con {{n:br.ex.below}} {{t:buy-in|buy-in}} un altro {{t:downswing}} può portarti via tutto." }
      - { text: "Passi a un {{t:stakes|limite}} più alto per recuperare più in fretta", why: "È tilt da disperazione. Un {{t:stakes|limite}} più alto con un bankroll più piccolo in {{t:buy-in|buy-in}} aumenta bruscamente il {{t:risk-of-ruin|rischio di rovina}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Hai iniziato a questo {{t:stakes|limite}} con {{n:br.bi.base}} {{t:buy-in|buy-in}} e ne hai persi {{n:dd.bi.small}}. Ora ne hai {{n:br.ex.after-dd}}. Cosa fai?"
    options:
      - { text: "Resti a questo {{t:stakes|limite}} e rivedi le decisioni nelle mani perse", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} sono ancora più della soglia di discesa più tardiva, {{n:br.bi.move-down}}. In una simulazione un {{t:downswing}} così colpisce circa {{n:dd.p.small.100k}} dei giocatori che vincono {{n:var.wr.ex}} su {{n:var.hands.k}} mila mani, e la revisione delle mani verifica se dietro ci sono errori." }
      - { text: "Scendi subito di {{t:stakes|limite}}", correct: true, why: "Anche questa è una buona decisione: alcune fonti consigliano di scendere già dopo aver perso {{n:dd.bi.small}} {{t:buy-in|buy-in}}. Scendere prima di arrivare a metà bankroll non è un errore, farlo dopo sì." }
      - { text: "Aggiungi {{t:buy-in|buy-in}} da fuori per tornare a {{n:br.bi.base}}", why: "Ricaricare dopo ogni {{t:downswing}} toglie senso al bankroll come confine del rischio. Fissi la soglia in anticipo e la rispetti." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Hai {{n:br.bi.base}} {{t:buy-in|buy-in}} del {{t:stakes|limite}} attuale, cioè quanto hai fissato come bankroll. Il {{t:stakes|limite}} superiore ha un {{t:buy-in|buy-in}} doppio. Sali?"
    options:
      - { text: "No, al {{t:stakes|limite}} superiore è solo metà del bankroll previsto", correct: true, why: "Il bankroll lo conti in {{t:buy-in|buy-in}} del {{t:stakes|limite}} a cui vuoi passare. Lì i tuoi {{n:br.bi.base}} {{t:buy-in|buy-in}} diventano {{n:br.bi.move-down}}, cioè esattamente la soglia di discesa." }
      - { text: "Sì, perché ti sta andando bene", why: "Un buon mese è soprattutto {{t:variance|varianza}} (lezione sulla {{t:variance|varianza}}). Salire dipende dal bankroll al nuovo {{t:stakes|limite}}." }
      - { text: "Sì, perché hai già {{n:br.bi.base}} {{t:buy-in|buy-in}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-in}} del {{t:stakes|limite}} attuale sono solo {{n:br.bi.move-down}} a un {{t:stakes|limite}} doppio." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Un giocatore perde in media al suo {{t:stakes|limite}}, ma ha un bankroll enorme. A cosa gli serve?"
    options:
      - { text: "Rimanda solo la perdita nel tempo", correct: true, why: "Con un winrate negativo il risultato in media scende, quindi prima o poi perderà il bankroll, qualunque sia la sua dimensione. Il bankroll protegge dalla {{t:variance|varianza}}, non dal gioco scarso." }
      - { text: "Lo protegge dalla bancarotta", why: "La formula del rischio vale solo con un winrate positivo. Un giocatore perdente perde il bankroll con certezza, solo più lentamente se il bankroll è più grande." }
      - { text: "Gli permette di giocare a {{t:stakes|limiti}} più alti", why: "Un {{t:stakes|limite}} più alto con un winrate negativo accelera solo la perdita." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Hai appena iniziato. Come dividi il tempo tra studio e gioco?"
    options:
      - { text: "Circa {{n:study.beginner}} di studio", correct: true, why: "All'inizio hai più cose da recuperare, quindi lo studio prevale." }
      - { text: "Circa {{n:study.min}} di studio", why: "È la soglia minima per un giocatore che già vince. All'inizio lo studio dovrebbe prevalere." }
      - { text: "Solo gioco, lo studio arriverà con l'esperienza", why: "Il risultato del gioco è un feedback debole (lezione su decisione e risultato). Lo studio con spiegazioni e l'analisi delle mani insegnano più in fretta." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Vinci già al tuo {{t:stakes|limite}}. Come dividi il tempo?"
    options:
      - { text: "Più o meno metà e metà, ma mai meno di {{n:study.min}} di studio", correct: true, why: "Anche quando vinci, l'ideale è circa {{n:study.winner}} di studio, e il minimo è {{n:study.min}}." }
      - { text: "Solo gioco, visto che vinci", why: "Anche quando vinci, non scendi sotto {{n:study.min}} del tempo dedicato allo studio." }
      - { text: "Circa {{n:study.beginner}} di studio, come all'inizio", why: "Puoi farlo, se ti prepari per {{t:stakes|limiti}} più alti. Se semplicemente vinci al tuo, basta circa {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Quale segnale indica che il gioco potrebbe sfuggire al controllo?"
    options:
      - { text: "Dopo una perdita torni a giocare per rifarti delle perdite", correct: true, why: "Rincorrere le perdite è uno dei segnali di un problema con il gioco d'azzardo elencati nei criteri diagnostici. Se riconosci in te segnali di questo tipo, usa i contatti della scheda sul gioco responsabile." }
      - { text: "Analizzi le mani perse dopo la {{t:session|sessione}}", why: "È una sana abitudine di studio. Tra i segnali di un problema ci sono rincorrere le perdite, giocare più a lungo del previsto e giocare con soldi presi in prestito." }
      - { text: "Chiudi la {{t:session|sessione}} come previsto", why: "È un buon controllo del gioco. Un segnale di problema sarebbe giocare più a lungo del previsto o sentire il bisogno di rifarsi." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
Il bankroll è l'intera riserva destinata esclusivamente al gioco del poker. In questa lezione lo conti in **{{t:buy-in|buy-in}}**, non in denaro: un {{t:buy-in|buy-in}} è uno stack completo di {{n:format.stack}} al {{t:stakes|limite}} a cui giochi.

## {{t:risk-of-ruin|Rischio di rovina}}

È la probabilità di perdere prima o poi tutto il bankroll, se continui a giocare allo stesso {{t:stakes|limite}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

La formula è un'approssimazione con winrate e SD costanti. Winrate e SD si indicano in bb/100, il bankroll in bb. Con una {{t:standard-deviation|deviazione standard}} di {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-in}} | {{n:br.bi.base}} {{t:buy-in|buy-in}} | {{n:br.bi.beginner}} {{t:buy-in|buy-in}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Da cosa dipende il rischio

Winrate e bankroll stanno uno accanto all'altro nella formula: un winrate dimezzato richiede un bankroll doppio per lo stesso rischio. Per questo lo stesso numero di {{t:buy-in|buy-in}} dà a un giocatore un rischio diverse volte più basso che a un altro. All'inizio il winrate è sconosciuto, e per stimarlo servono moltissime mani (lezione sulla {{t:variance|varianza}}). Con un winrate negativo nessun bankroll aiuta, perché protegge dalla {{t:variance|varianza}}, non dal gioco scarso.

## Quando scendere di {{t:stakes|limite}}

Fissa la soglia in anticipo: scendi di un {{t:stakes|limite}} al più tardi quando il bankroll cala alla **metà** del numero di {{t:buy-in|buy-in}} previsto, per esempio da {{n:br.bi.base}} a {{n:br.bi.move-down}}. Le fonti indicano soglie che vanno dalla metà al bankroll completo; la metà è la più tardiva. A un {{t:stakes|limite}} dimezzato lo stesso bankroll torna a essere quasi il numero completo di {{t:buy-in|buy-in}} di quel limite. Risali non prima di avere un bankroll completo in {{t:buy-in|buy-in}} del {{t:stakes|limite}} superiore. Alcune fonti consigliano di scendere prima, già dopo aver perso {{n:dd.bi.small}} {{t:buy-in|buy-in}}: scendere prima della soglia della metà non è un errore.

## Studio e gioco

All'inizio dedichi circa {{n:study.beginner}} del tempo allo studio e il resto al gioco. Quando vinci al tuo {{t:stakes|limite}}, l'ideale è circa {{n:study.winner}}, ma mai meno di {{n:study.min}} di studio.

:::note Gioco responsabile
Alcuni segnali che il gioco sta sfuggendo al controllo: giochi più a lungo di quanto avevi previsto; dopo una perdita torni a giocare per rifarti delle perdite; giochi con soldi che non puoi permetterti di perdere o chiedi prestiti per giocare; giochi per sfuggire alle preoccupazioni; nascondi il gioco alle persone care.

Dove cercare aiuto:

{{helplines}}
:::
