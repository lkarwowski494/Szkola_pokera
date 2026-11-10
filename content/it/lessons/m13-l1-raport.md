---
id: m13.l1
module: m13
order: 1
title: "Come leggere il report di gioco"
sub: "Decisione, risultato e gradi di valutazione"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vai all-in con l'{{n:m13.eq.example}} di {{t:equity}} e perdi. In quale percentuale di mani di questo tipo perdi nonostante una buona decisione? Inserisci un numero."
    answer: m13.lose.example
    explanation: "Perdi in 1 − e delle mani: il totale meno {{n:m13.eq.example}} dà {{n:m13.lose.example}}. Questa sconfitta non dice nulla sulla decisione."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vai all-in dieci volte con l'{{n:m13.eq.example}} di {{t:equity}}. Quante di queste mani perderai in media? Inserisci un numero."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Se perdi due volte di fila, rientra comunque nei conti."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Hai il {{n:m13.eq.example2}} di {{t:equity}} in un all-in. In quale percentuale di mani di questo tipo perdi? Inserisci un numero."
    answer: m13.lose.example2
    explanation: "Il totale meno {{n:m13.eq.example2}} dà {{n:m13.lose.example2}}: perdi circa una mano su tre di questo tipo, e la decisione resta buona."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "In questo spot il solver gioca la tua mano più o meno in parti uguali: {{t:raise|rilancio}} o {{t:fold|fold}}. Hai scelto il {{t:fold|fold}}. Come lo valuterà il report?"
    options:
      - { text: "Conforme", correct: true, why: "Sì: un'azione che il solver gioca in almeno il {{n:range.mixed.low}} dei casi è conforme. In equilibrio un giocatore mescola solo giocate con lo stesso {{t:expected-value|valore atteso}}, quindi entrambe sono corrette." }
      - { text: "Errore, perché bisognava {{t:raise|rilanciare}}", why: "No: con una {{t:mixed-hand|mano mista}} entrambe le giocate hanno lo stesso {{t:expected-value|valore atteso}}. Il report non penalizza la scelta di una delle due." }
      - { text: "Senza valutazione", why: "No: lo spot ha un risultato del solver, quindi la decisione è valutata. «Senza valutazione» viene assegnato a una decisione per cui l'app non ha una regola verificabile." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Il solver gioca la tua mano con un {{t:raise|rilancio}} in circa il {{n:range.mixed.high}} dei casi e con un {{t:call|call}} nei restanti. Hai scelto il {{t:call|call}}. Qual è il verdetto?"
    options:
      - { text: "Conforme", correct: true, why: "Sì: il {{t:call}} giocato in circa il {{n:range.mixed.low}} dei casi non scende sotto la soglia di conforme ({{n:range.mixed.low}}). È una {{t:mixed-hand|mano mista}}." }
      - { text: "Accettabile", why: "È accettabile un'azione giocata in almeno il {{n:range.mixed.min}} dei casi, ma meno spesso che nel {{n:range.mixed.low}}. Qui il {{t:call}} raggiunge la soglia di conforme." }
      - { text: "Errore", why: "Un errore è un'azione che il solver non gioca mai. Un'azione giocata meno spesso che nel {{n:range.mixed.min}} dei casi è un'imprecisione." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "In uno spot in cui il solver gioca un 3-bet, fai 3-bet, ma con una dimensione diversa da quella raccomandata dalla regola. Qual è il verdetto?"
    options:
      - { text: "Imprecisione", correct: true, why: "Sì: azione giusta, dimensione sbagliata. Conta come un errore e torna nei ripassi, ma il report mostra una spiegazione separata della dimensione." }
      - { text: "Conforme", why: "L'azione è giusta, ma la dimensione conta: un 3-bet troppo piccolo dà all'avversario un buon prezzo, uno troppo grande rischia più del necessario." }
      - { text: "Errore", why: "L'errore spetta a un'azione sbagliata. Un'azione giusta con la dimensione sbagliata è un grado a parte: l'imprecisione." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Report: «Valutate 14 decisioni su 30». Cosa significano le decisioni restanti?"
    options:
      - { text: "L'app non aveva per loro una regola verificabile né un risultato del solver", correct: true, why: "Sì: «senza valutazione» non significa «bene». Queste decisioni potevano essere buone o cattive; il report non lo sa e lo dice apertamente." }
      - { text: "Erano buone, quindi il report non le mostra", why: "No: il report conta le decisioni buone come conformi. «Senza valutazione» è assenza di valutazione, non un elogio." }
      - { text: "Erano troppo facili per essere valutate", why: "Non è una questione di difficoltà. Sono valutate le decisioni per cui l'app ha una regola con una condizione o uno spot del solver." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Dopo la {{t:session|sessione}} hai vinto parecchie {{t:chips|fiches}}, ma il report mostra cinque errori. Cosa dice di più sul tuo gioco?"
    options:
      - { text: "La valutazione delle decisioni", correct: true, why: "Sì: qualche decina di mani è troppo poco perché il risultato dica qualcosa. Anche dopo migliaia di mani il risultato è in gran parte rumore, e ogni errore ha il suo costo indipendentemente da come è finita la mano." }
      - { text: "Il risultato in {{t:chips|fiches}}", why: "Il risultato di una {{t:session|sessione}} breve dipende soprattutto dalle carte. Proprio per questo il report lo mostra con un carattere più piccolo." }
      - { text: "Entrambi allo stesso modo", why: "Un risultato di qualche decina di mani non dice quasi nulla sull'abilità. Una decisione valutata con una regola o dal solver dice molto di più." }
---
Il report dopo la {{t:session|sessione}} valuta le tue decisioni, non quanto hai vinto. Questa lezione spiega come leggerlo.

## La decisione, non il risultato

Nel modulo sul mental game hai imparato il principio: valuti una decisione in base alle informazioni che avevi al momento della decisione, non in base al risultato della mano. Il report lo applica alla lettera: valuta la situazione prima della tua azione, non vede le carte degli avversari né le carte uscite dopo.

Perdere con la mano migliore rientra nei conti. L'{{t:equity|equity}} è la quota di vittorie su molte ripetizioni della stessa situazione. Con l'{{n:m13.eq.example}} di {{t:equity}} perdi circa il {{n:m13.lose.example}} delle mani, cioè in media {{n:m13.lose.of-ten}} su {{n:m13.ten}}.

```formula
probabilità di perdere = 1 − equity
```

## Gradi di valutazione

- **Conforme**: l'azione raccomandata dalla regola, oppure un'azione che il solver gioca in almeno il {{n:range.mixed.low}} dei casi (questa soglia è un'impostazione dell'app).
- **Accettabile**: il solver la gioca di rado (almeno il {{n:range.mixed.min}}, ma meno spesso del {{n:range.mixed.low}}), oppure la regola parla di frequenza («spesso», «meno spesso») e tu hai scelto l'opzione meno frequente. Non è un errore.
- **Imprecisione**: azione giusta, dimensione sbagliata, oppure un'azione che il solver gioca, ma meno spesso che nel {{n:range.mixed.min}} dei casi. Conta come un errore: è un'impostazione dell'app, non teoria.
- **Errore**: un'azione in contrasto con una regola formulata in modo categorico, oppure un'azione che il solver non gioca mai.
- **Senza valutazione**: l'app non ha una regola verificabile per questa decisione. Non significa «bene».
- **Tempo scaduto**: con il limite di tempo attivo, l'app ha giocato al posto tuo. Una decisione così non conta ai fini della valutazione, ma torna nei ripassi.

In cima al report c'è il conteggio «Valutate X decisioni su Y». Dopo il flop molte decisioni restano senza valutazione, perché la maggior parte delle regole di turn e river parla delle frequenze dell'intero {{t:range|range}}, non di una singola mano.

## {{t:mixed-hand|Mano mista}}

Quando il solver gioca la tua mano in due modi, entrambi sono corretti. La teoria dell'equilibrio lo spiega con il principio di indifferenza: un giocatore mescola solo giocate che hanno lo stesso {{t:expected-value|valore atteso}}. Per questo il report non penalizza la scelta di una delle due, e segna la giocata meno frequente come accettabile quando il solver la gioca in almeno il {{n:range.mixed.min}} dei casi; meno spesso è un'imprecisione (impostazione dell'app).

## Il risultato in {{t:chips|fiches}}

Il risultato è in fondo al report, con un carattere piccolo. Secondo i calcoli della lezione sulla {{t:variance|varianza}}, dopo circa {{n:m13.noise.hands.k}} mila mani l'intervallo al {{n:var.conf95}} per il winrate è di circa ± {{n:m13.noise.ci}}, quindi il risultato è quasi solo rumore: un giocatore vincente può essere in perdita, e uno perdente in forte attivo. Una {{t:session|sessione}} ha qualche decina di mani, quindi il risultato non dice quasi nulla sul tuo gioco.

:::note Da dove vengono questi principi
Principio di indifferenza: materiali sulle basi della teoria dell'equilibrio. La soglia della mossa rara e il nome «imprecisione»: materiale sulla valutazione del proprio gioco rispetto al solver. La soglia del {{n:range.mixed.low}} è un'impostazione dell'app, senza fonte. La {{t:variance|varianza}} del risultato e la probabilità di perdere sono calcoli.
:::
