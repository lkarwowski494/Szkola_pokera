---
id: m12.l2
module: m12
order: 2
title: "Decisione e risultato"
sub: "Valuta la giocata, non la carta del river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop metti dentro tutto lo stack con una {{t:pair|coppia}} di assi, l'avversario {{t:call|chiama}} con una {{t:pair|coppia}} di re. Al river scende un re e perdi. Come valuti la tua decisione?"
    options:
      - { text: "È stata molto buona", correct: true, why: "AA batte KK in circa {{n:pf.aa-vs-kk}} dei casi. Perdere in circa {{n:res.kk-wins}} dei casi è il costo del gioco, non un errore. Ogni volta fai la stessa cosa." }
      - { text: "È stata cattiva, dovevi giocare con più cautela", why: "Questo è giudicare in base al risultato. Se la carta del river fosse stata diversa, la stessa decisione sembrerebbe ottima. La decisione dipende da ciò che sapevi prima della carta: circa {{n:pf.aa-vs-kk}} di equity." }
      - { text: "Non si può valutare, perché hai perso", why: "Si può: calcoli l'equity nel momento della decisione. Il risultato di una sola mano non aggiunge nulla." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA batte KK all-in preflop in circa {{n:pf.aa-vs-kk}} dei casi. In quale percentuale dei casi perdi nonostante la migliore decisione possibile? Inserisci un numero."
    answer: res.kk-wins
    explanation: "Il totale meno {{n:pf.aa-vs-kk}} dà circa {{n:res.kk-wins}}. Più o meno una volta su cinque o sei una buona decisione finisce con una sconfitta."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Hai un {{t:flush-draw|progetto di colore}} pulito ({{n:outs.flush}} outs), nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.quarter}}. {{t:call|Chiami}}, il {{t:flush|colore}} non entra e perdi {{n:ex.bet.quarter}}. Come valuti la {{t:call|chiamata}}?"
    options:
      - { text: "È stata buona", correct: true, why: "Ti serviva {{n:eq.bet-quarter}} di equity e ne avevi circa {{n:odds.flush.turn-river}}. Una {{t:call|chiamata}} così guadagna sul lungo periodo, anche se perde nella maggior parte delle singole mani." }
      - { text: "È stata cattiva, perché il {{t:flush|colore}} non è entrato", why: "Il {{t:flush|colore}} entra solo in circa {{n:odds.flush.turn-river}} dei casi, quindi mancarlo era il risultato più probabile. Valuti la decisione in base al prezzo, e il prezzo era buono." }
      - { text: "Buona solo se il {{t:flush|colore}} fosse entrato", why: "Questa è la definizione di giudizio in base al risultato. La stessa decisione non cambia qualità a seconda della carta uscita dopo." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw|Progetto di colore}} pulito, nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} tutto il {{t:pot|piatto}}: {{n:ex.bet.pot}}. {{t:call|Chiami}} e il {{t:flush|colore}} entra al river. Come valuti la {{t:call|chiamata}}?"
    options:
      - { text: "È stata cattiva, nonostante la vincita", correct: true, why: "Ti serviva {{n:eq.bet-pot}} di equity e ne avevi circa {{n:odds.flush.turn-river}}. Questa volta hai vinto, ma su molte ripetizioni una {{t:call|chiamata}} così perde." }
      - { text: "È stata buona, perché hai vinto il {{t:pot|piatto}}", why: "La vincita non migliora la decisione. Con un prezzo di {{n:eq.bet-pot}} e una probabilità di circa {{n:odds.flush.turn-river}}, questa {{t:call|chiamata}} perde sul lungo periodo." }
      - { text: "È stata buona, perché il {{t:flush|colore}} è la mano migliore", why: "La forza della mano dopo aver chiuso il punto non cambia il prezzo. Conta il confronto: hai {{n:odds.flush.turn-river}} di probabilità, te ne servono {{n:eq.bet-pot}}." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Stai analizzando una mano persa. Qual è la domanda più importante?"
    options:
      - { text: "Con le informazioni che avevo, la decisione aveva {{t:expected-value|EV}} positivo?", correct: true, why: "È l'unica domanda che distingue un errore dalla sfortuna. Calcoli il prezzo, l'equity contro il {{t:range|range}} dell'avversario e ciò che sapevi nel momento della decisione." }
      - { text: "Quale carta avrebbe ricevuto l'avversario se avessi {{t:fold|foldato}}?", why: "Una carta futura non cambia la qualità della decisione. Conta solo ciò che sapevi in quel momento." }
      - { text: "Quanto ho perso in questa mano?", why: "L'entità della perdita dice qualcosa sul {{t:pot|piatto}}, non sulla decisione. Una grossa perdita può derivare da una buona decisione, una piccola da un errore." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Un amico ti chiede della stessa giocata in due mani: in una ha vinto, nell'altra ha perso. Ti sembra che la prima volta abbia giocato meglio. Che cosa sta succedendo?"
    options:
      - { text: "È il bias dell'esito: giudichi la decisione da come è andata a finire", correct: true, why: "Negli studi di psicologia le persone valutavano meglio la stessa decisione quando l'esito era buono, anche se ritenevano che l'esito non dovesse contare. Aiuta valutare prima di conoscere il risultato." }
      - { text: "La prima decisione era migliore, perché ha funzionato", why: "Se la giocata è la stessa, la decisione è la stessa. Cambia solo il risultato, cioè la sorte." }
      - { text: "La seconda decisione era migliore, perché insegna l'umiltà", why: "La valutazione non dipende dal risultato in nessuna direzione. La stessa decisione ha la stessa qualità." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Per tre {{t:session|sessioni}} hai giocato in modo più aggressivo del solito e hai vinto. È la prova che il nuovo stile è migliore?"
    options:
      - { text: "No, tre {{t:session|sessioni}} sono troppo poche; valuti le nuove giocate nella revisione delle mani", correct: true, why: "Anche un enorme divario di abilità (il {{n:skill.pct}} più forte contro il {{n:skill.pct}} più debole) passa in vantaggio in circa {{n:skill.ahead}} dei casi solo dopo circa {{n:skill.hands}} mani. La differenza tra i tuoi due stili è molto più piccola." }
      - { text: "Sì, il risultato mostra cosa funziona", why: "Il risultato di poche {{t:session|sessioni}} è soprattutto rumore. Con una {{t:standard-deviation|deviazione standard}} di circa {{n:var.sd}}, anche {{n:var.hands.k}} mila mani lasciano un errore di circa ± {{n:var.ci.wr}}." }
      - { text: "Sì, se hai vinto più del solito", why: "Una vincita più grande su un piccolo campione resta un piccolo campione. Le giocate le valuti con i calcoli e con la revisione delle mani." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Uno studio su milioni di mani online ha mostrato quando l'abilità inizia a prevalere sulla fortuna. Che cosa è stato misurato esattamente?"
    options:
      - { text: "Il {{n:skill.pct}} più forte dei giocatori supera il {{n:skill.pct}} più debole in circa {{n:skill.ahead}} dei casi dopo circa {{n:skill.hands}} mani", correct: true, why: "È così che lo definiscono gli autori dello studio (2015). È un confronto tra gruppi estremi: con differenze di abilità minori servono molte più mani." }
      - { text: "Dopo circa {{n:skill.hands}} mani ogni buon giocatore è in attivo", why: "Lo studio confronta gruppi estremi di giocatori, non dice quando un singolo buon giocatore sarà in attivo. Questo dipende dal winrate e dalla {{t:standard-deviation|deviazione standard}} (lezione sulla {{t:variance|varianza}})." }
      - { text: "Dopo circa {{n:skill.hands}} mani la fortuna smette di contare", why: "La fortuna conta sempre. Lo studio dice solo quando il vantaggio dei migliori sui peggiori inizia a vincere nella maggior parte dei confronti." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Hai vinto una {{t:session|sessione}} grazie a due chiamate senza un buon prezzo che hanno chiuso il punto al river. Che cosa fai dopo la {{t:session|sessione}}?"
    options:
      - { text: "Annoti queste {{t:call|chiamate}} come errori da correggere", correct: true, why: "La vincita non cambia il prezzo. Se la {{t:call|chiamata}} richiedeva più equity di quella che avevi, era un errore, anche se ha pagato." }
      - { text: "Niente, la {{t:session|sessione}} è stata vincente", why: "Gli errori nelle {{t:session|sessioni}} vincenti costano altrettanto, solo che è più difficile notarli. Analizzare solo le perdite trascura metà degli errori." }
      - { text: "Concludi che leggi gli avversari meglio di quanto dicano i calcoli", why: "Due colpi andati a segno sono troppo pochi per trarre conclusioni sulla lettura degli avversari. La spiegazione più semplice è la {{t:variance|varianza}}." }
---
Il poker ti dà un riscontro che spesso mente. Una buona decisione può perdere e una cattiva può vincere. Se giudichi il tuo gioco dai risultati, impari da segnali casuali.

## Resulting: giudicare in base al risultato

I giocatori lo chiamano *resulting*: dai per scontato che la qualità del risultato ti dica la qualità della decisione. Gli psicologi descrivono lo stesso fenomeno come **bias dell'esito**. In un classico studio di psicologia (1988) le persone giudicavano la stessa decisione migliore, e chi l'aveva presa più competente, quando l'esito era favorevole. Lo facevano anche quando loro stesse ritenevano di non dover tenere conto dell'esito.

## Anche le buone decisioni perdono

Andare all-in con una {{t:pair|coppia}} di assi contro una {{t:pair|coppia}} di re è la migliore decisione possibile, eppure perde in circa **{{n:res.kk-wins}}** dei casi. D'altra parte, una {{t:call|chiamata}} con un {{t:flush-draw|progetto di colore}} per tutto il {{t:pot|piatto}} al turn è sbagliata (ti serve {{n:eq.bet-pot}}, hai circa {{n:odds.flush.turn-river}}), eppure vince più o meno una volta su cinque.

```formula
qualità della decisione = EV con le informazioni che avevi nel momento della decisione
```

## Come analizzare una mano

1. Copri il risultato. Valuta solo ciò che sapevi nel momento della decisione.
2. Calcola il prezzo e l'equity contro il {{t:range|range}} dell'avversario (M2, M6).
3. Verifica se la giocata rispetta le regole del corso.
4. Analizza anche le mani vinte: gli errori che hanno pagato costano altrettanto.

## Quando il risultato inizia a significare qualcosa

In uno studio su circa {{n:skill.sample.m}} milioni di mani online (studio del 2015) l'abilità iniziava a prevalere solo dopo circa **{{n:skill.hands}}** mani. Questo significa che il {{n:skill.pct}} più forte dei giocatori superava il {{n:skill.pct}} più debole in circa {{n:skill.ahead}} dei confronti. Per differenze di abilità minori servono molte volte più mani. Il risultato di poche {{t:session|sessioni}} quindi non ti dice quale stile di gioco sia migliore.

:::note La valutazione in questa app
Per questo l'app valuta le tue decisioni, non il risultato della mano. Quando risultato e decisione non coincidono, fidati dei calcoli.
:::
