---
id: m8.l3
module: m8
order: 3
title: "Blocker"
sub: "Con quale mano bluffare"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "Che cos'è un {{t:blocker}}?"
    options:
      - { text: "Una carta nella tua mano per cui l'avversario ha meno {{t:combo|combo}} di una certa mano", correct: true, why: "L'avversario non può avere la carta che hai tu. Se hai un asso, l'avversario ha meno assi: meno {{t:pair|coppie}} d'assi, meno AK, meno colori con l'asso." }
      - { text: "Una carta sul {{t:board}} che rovina un {{t:draw|progetto}}", why: "A volte si dice così, in modo colloquiale, delle carte sul {{t:board}}, ma un {{t:blocker}} in questo senso è una carta nella tua mano. Le carte sul {{t:board}} le vedono entrambi i giocatori." }
      - { text: "Una piccola puntata che serve a fermare una grossa puntata dell'avversario", why: "Quello è il cosiddetto blocking bet, un'altra cosa. Il {{t:blocker}} è una carta nella tua mano che riduce il numero di {{t:combo|combo}} dell'avversario." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Senza alcuna informazione, AK ha {{n:combos.unpaired}} {{t:combo|combo}}. Hai un re (senza asso). Quante {{t:combo|combo}} di AK può avere l'avversario? Inserisci il numero."
    answer: combos.unpaired.one-blocked
    explanation: "Gli assi sono {{n:cards.suits}}, mentre di re ne restano {{n:pair.outs.per-rank}}, perché uno ce l'hai tu: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Una sola carta elimina un intero quarto delle {{t:combo|combo}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Una {{t:pair|coppia}} d'assi ha {{n:combos.pair}} {{t:combo|combo}}. Hai un asso. Quante {{t:combo|combo}} di {{t:pair|coppia}} d'assi può avere l'avversario? Inserisci il numero."
    answer: combos.pair.one-blocked
    explanation: "Restano {{n:pair.outs.per-rank}} assi, e con tre carte si possono formare solo {{n:combos.pair.one-blocked}} {{t:pair|coppie}}. Un asso nella tua mano elimina metà delle {{t:combo|combo}} di AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Hai [[Ah Kc]]. Quante {{t:combo|combo}} di AK può avere l'avversario?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Restano {{n:pair.outs.per-rank}} assi e {{n:pair.outs.per-rank}} re: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Sarebbero tante se avessi solo l'asso o solo il re. Tu blocchi entrambi i valori." }
      - { text: "{{n:combos.unpaired}}", why: "Tante sono le {{t:combo|combo}} di AK nel mazzo prima che tu veda le tue carte. Il tuo asso e il tuo re non possono essere in mano all'avversario." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "Al river è uscita la terza carta di cuori e il {{t:flush|colore}} è possibile. Il {{t:big-blind}} {{t:check|fa check}}. Hai in mano solo un asso alto e vuoi bluffare. Con quale mano il {{t:bluff}} è migliore?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "L'asso di cuori blocca i colori più forti dell'avversario: non può avere il {{t:flush|colore}} con l'asso, ed è una mano che pagherà sempre. L'avversario ha meno mani con cui {{t:call|chiamare}}, quindi il {{t:bluff}} funziona più spesso." }
      - { text: "[[Ad 3c]]", why: "Stessa forza allo showdown, ma non blocchi nessun {{t:flush|colore}}. L'avversario ha tutti i suoi colori, con cui pagherà." }
      - { text: "Nessuna differenza, sono entrambe solo asso alto", why: "Allo showdown sì, ma come {{t:bluff}} no. L'asso di cuori riduce il numero di colori dell'avversario che pagheranno di sicuro." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "Il {{t:flush-draw|progetto di colore}} a picche non è entrato. Il {{t:big-blind}} fa check al river. Entrambe le mani hanno solo donna-otto. Con quale è meglio bluffare?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Senza picche non blocchi i {{t:draw|progetti}} mancati dell'avversario, e sono mani che sulla tua puntata {{t:fold|folderanno}}. Le altre carte delle due mani sono uguali." }
      - { text: "[[Qd 8s]]", why: "L'otto di picche blocca parte dei {{t:flush-draw|progetti di colore}} mancati (es. [[8s 7s]]) con cui l'avversario avrebbe {{t:fold|foldato}}. Gli restano relativamente più mani con cui pagherà." }
      - { text: "Nessuna differenza", why: "La differenza sta nel seme dell'otto. Una picca nella tua mano toglie all'avversario parte delle mani da foldare." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Stessa situazione: le picche non sono entrate, il {{t:big-blind}} {{t:check|fa check}}. Hai una di due mani. Con quale {{t:bluff|bluffi}} e con quale {{t:check|fai check}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Bluffo}} con [[Qc Jd]], {{t:check|faccio check}} con [[9c 8c]]", correct: true, why: "La {{t:pair|coppia}} di nove batte i {{t:draw|progetti}} mancati dopo il {{t:check}}. Donna-jack perde contro quasi ogni mano, quindi solo con un {{t:bluff}} può vincere il {{t:pot|piatto}}." }
      - { text: "{{t:bluff|Bluffo}} con [[9c 8c]], {{t:check|faccio check}} con [[Qc Jd]]", why: "È il contrario. Un {{t:bluff}} con la {{t:pair|coppia}} di nove rinuncia alla vittoria allo showdown, e il {{t:check}} con donna-jack cede il {{t:pot|piatto}} senza combattere." }
      - { text: "{{t:bluff|Bluffo}} con entrambe", why: "La {{t:pair|coppia}} di nove non ha bisogno di un {{t:bluff}}: batte molte mani dopo il {{t:check}}. {{t:bluff|Bluffi}} con mani senza valore allo showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Scegli un {{t:bluff}} al river tra le mani senza valore allo showdown. Quale carta in mano aiuta di più?"
    options:
      - { text: "Una carta delle mani con cui l'avversario pagherà", correct: true, why: "Blocchi il suo valore: ha meno mani forti, quindi più spesso gli resta una mano da foldare." }
      - { text: "Una carta del seme del {{t:draw|progetto}} mancato", why: "Blocca le mani che l'avversario {{t:fold|folderà}}. Il {{t:bluff}} allora funziona meno spesso." }
      - { text: "La carta più alta, indipendentemente dal board", why: "Una carta alta dà un po' di forza allo showdown, ma non dice nulla su cosa blocchi. Guarda quali mani dell'avversario pagheranno." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "Al river è uscita la terza carta di cuori. Il {{t:big-blind}} {{t:check|fa check}}. Hai una {{t:pair|coppia}} di nove e l'asso di cuori. Cosa fai?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "La {{t:pair|coppia}} di nove, dopo il {{t:check}}, batte molte mani dell'avversario senza {{t:pair|coppia}}. Un {{t:blocker}} non trasforma una mano con valore allo showdown in un buon {{t:bluff}}: prima scegli le mani senza possibilità, solo dopo guardi i {{t:blocker|blocker}}." }
      - { text: "Punto come {{t:bluff}}, perché ho l'asso di cuori", why: "L'asso di cuori è un buon {{t:blocker}}, ma con una {{t:pair|coppia}} di nove perdi {{t:bluff|bluffando}}: le mani peggiori {{t:fold|folderebbero}} comunque, e i colori e i re pagheranno." }
      - { text: "Punto {{t:value|per valore}}", why: "Chi pagherà con una mano peggiore? Su un {{t:board}} con un colore possibile, le mani più deboli di una {{t:pair|coppia}} di nove {{t:fold|foldano}} quasi sempre." }
---
Nella lezione precedente hai stabilito quanti {{t:bluff|bluff}} ti servono e che {{t:bluff|bluffi}} con mani senza possibilità allo showdown. Spesso queste mani sono più di quante ne servano. In quel caso a decidere sono i **{{t:blocker|blocker}}**.

## {{t:blocker|Blocker}}

L'avversario non può avere la carta che hai tu. Per questo ha meno {{t:combo|combo}} delle mani che contengono quella carta:

| Mano dell'avversario | Senza {{t:blocker}} | Hai una carta di quel valore |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Se hai sia l'asso sia il re, l'avversario ha solo {{n:combos.unpaired.both-blocked}} {{t:combo|combo}} di AK.

## Blocca le mani con cui l'avversario pagherà

Un buon {{t:bluff}} ha una carta delle mani con cui l'avversario **{{t:call|chiamerà}}**. Esempio: al river è uscita la terza carta di cuori. L'asso di cuori nella tua mano significa che l'avversario non ha il {{t:flush|colore}} con l'asso, cioè una mano che paga sempre. Gli restano più mani da foldare.

## Non bloccare le mani che l'avversario {{t:fold|folderà}}

Quando il {{t:flush-draw|progetto di colore}} **non entra**, l'avversario {{t:fold|folderà}} i suoi {{t:draw|progetti}} mancati. Se hai una carta di quel seme, ne ha di meno, quindi il tuo {{t:bluff}} troverà più spesso una mano che pagherà. Tra due {{t:bluff|bluff}} simili scegli quello senza carte del seme del {{t:draw|progetto}} mancato.

## Prima la forza allo showdown

L'ordine è fisso: prima metti da parte le mani che possono vincere dopo il {{t:check}}, e solo tra le restanti scegli i {{t:bluff|bluff}} con i {{t:blocker|blocker}} migliori. Un buon {{t:blocker}} non trasforma in {{t:bluff}} una {{t:pair|coppia}} che vincerebbe allo showdown. I {{t:blocker|blocker}} fanno pendere la scelta tra mani simili; l'effetto in sé è piccolo, quindi decide solo quando le mani hanno forza simile (lo stesso vale per la scelta delle {{t:call|chiamate}} nella prossima lezione).

:::note Da dove vengono queste regole
I numeri di {{t:combo|combo}} sono calcolo combinatorio. Le regole per scegliere i {{t:bluff|bluff}} in base ai {{t:blocker|blocker}} provengono dal programma didattico, da materiali di formazione e da analisi dei solver. Quando mancano altri {{t:bluff|bluff}}, il solver {{t:bluff|bluffa}} anche con i colori mancati.
:::
