---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Riconoscilo prima che prenda il controllo delle tue decisioni"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Per la terza volta in un'ora un avversario prende al river la carta che lo salva. Senti che il gioco è ingiusto e che qualcuno ce l'ha con te. Che tipo di tilt è, secondo la suddivisione di questa lezione?"
    options:
      - { text: "Tilt da ingiustizia", correct: true, why: "Bad beat, cooler e carte prese dall'avversario al river danno la sensazione che il poker sia ingiusto. È il tipico fattore scatenante del tilt da ingiustizia." }
      - { text: "Tilt da errore", why: "Il tilt da errore riguarda i tuoi sbagli. Qui ti fa arrabbiare la sorte, non la tua decisione." }
      - { text: "Tilt da disperazione", why: "La disperazione è un forte bisogno di rifarsi (lunghe {{t:session|sessioni}}, {{t:stakes|limiti}} più alti). Qui, per ora, si tratta della sensazione di aver subito un torto." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Lo stesso avversario rilancia sui tuoi blind per la quarta volta di fila. Decidi che la prossima volta lo {{t:raise|rilancerai}} con qualsiasi mano, per fargliela vedere. Che tipo di tilt è?"
    options:
      - { text: "Tilt da vendetta", correct: true, why: "Mancanza di rispetto, aggressività continua dell'avversario e voglia di “fargliela vedere” sono fattori scatenanti del tilt da vendetta. A decidere comincia a essere la voglia di rivalsa, non il calcolo." }
      - { text: "Tilt da pretesa di vittoria", why: "Questo tipo nasce dalla convinzione di meritare la vittoria perché sei più bravo. Qui si tratta di rivalsa su un avversario preciso." }
      - { text: "Non è tilt, è solo un adattamento a un avversario aggressivo", why: "Adattarsi significa difendere più largo con mani scelte con criterio. “Con qualsiasi mano, per fargliela vedere” è emozione, non strategia." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Sei in perdita e pensi: “Ancora un'ora, e se non va passo a un {{t:stakes|limite}} più alto e recupero tutto in una volta”. Che tipo di tilt è?"
    options:
      - { text: "Tilt da disperazione", correct: true, why: "Il bisogno di rifarsi porta a {{t:session|sessioni}} lunghissime, a forzare l'azione e a salire di {{t:stakes|limite}}. È il segnale che devi smettere di giocare." }
      - { text: "Tilt da odio per la sconfitta", why: "Ci sei vicino, ma qui c'è anche il piano di recuperare le perdite con un {{t:stakes|limite}} più alto e giocando più a lungo. Sono tratti della disperazione." }
      - { text: "Un piano sensato, perché un {{t:stakes|limite}} più alto recupera le perdite più in fretta", why: "Un {{t:stakes|limite}} più alto aumenta anche le oscillazioni, e prendi decisioni in cattive condizioni. Salire dopo una perdita è l'esatto opposto di una gestione prudente del {{t:bankroll}} (lezione su bankroll e rischio)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "{{t:fold|Hai foldato}} la mano migliore e da quel momento non riesci a smettere di pensarci. Sei arrabbiato con te stesso e giochi sempre peggio. Che tipo di tilt è?"
    options:
      - { text: "Tilt da errore", correct: true, why: "La rabbia per i propri sbagli è tilt da errore. Di solito nasce dall'aspettativa irrealistica di non commettere errori mentre impari." }
      - { text: "Tilt da ingiustizia", why: "Qui non dai la colpa alla sorte, ma a te stesso. È tilt da errore." }
      - { text: "Tilt da vendetta", why: "La vendetta è rivolta a un avversario. Qui la rabbia riguarda la tua decisione." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Stai perdendo contro un giocatore che secondo te gioca malissimo e pensi: “Io studio, lui no, dovrei batterlo”. Che tipo di tilt è?"
    options:
      - { text: "Tilt da pretesa di vittoria", correct: true, why: "Credere di meritare la vittoria per qualche motivo fa sembrare la vincita una tua proprietà. Quando un avversario “che non se lo merita” te la porta via, arriva il tilt." }
      - { text: "Tilt da odio per la sconfitta", why: "Questo tipo riguarda il perdere in generale. Qui la chiave è la convinzione che la vittoria ti spetti." }
      - { text: "Tilt da errore", why: "Non si tratta di un tuo sbaglio, ma della sensazione di meritare la vittoria." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Dopo un bad beat senti la rabbia crescere, ma stai ancora giocando correttamente. Che cosa fai?"
    options:
      - { text: "Reagisci subito: un respiro e una frase preparata, ad es. “È {{t:variance}}, continua a giocare bene”", correct: true, why: "Il tilt si corregge finché è piccolo e riesci ancora a ragionare. Quando cresce, spegne la capacità di ragionare e controllarlo diventa impossibile." }
      - { text: "Continui a giocare finché non noti il primo errore", why: "A quel punto il tilt è già più grande e più difficile da fermare. È più facile reagire ai primi segnali." }
      - { text: "Reprimi la rabbia e fai finta che non ci sia", why: "Meglio riconoscere l'emozione e rispondere alla sua causa con un pensiero concreto. Reprimerla e basta non elimina la causa." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Da mezz'ora giochi mani che di solito {{t:fold|foldi}} e pensi solo a rifarti. Che cosa fai?"
    options:
      - { text: "Chiudi la {{t:session|sessione}}", correct: true, why: "Sono segnali che non riesci più a ritrovare la lucidità. A quel punto l'obiettivo è smettere il prima possibile, non rivincere i soldi." }
      - { text: "Continui a giocare, ma solo le mani migliori", why: "In questo stato è difficile mantenere i propositi, perché è l'emozione a decidere per te. È più sicuro smettere." }
      - { text: "Sali di {{t:stakes|limite}} per recuperare più in fretta", why: "È tilt da disperazione allo stato puro. Un {{t:stakes|limite}} più alto con decisioni peggiori accelera le perdite." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Vuoi accorgerti prima del tilt. Da dove cominci?"
    options:
      - { text: "Dallo scrivere un profilo: che cosa ti fa scattare, che cosa pensi e provi, come cambia il tuo gioco", correct: true, why: "Ogni giocatore va in tilt in modo un po' diverso e per motivi diversi. Il profilo ti permette di riconoscere i segnali prima che il tilt cresca: non puoi controllare ciò che non capisci." }
      - { text: "Dal giocare a {{t:stakes|limiti}} più alti per farti le ossa", why: "Più pressione non ti insegna a riconoscere il tilt. Prima devi sapere come si manifesta in te." }
      - { text: "Dall'evitare tutti gli avversari che ti innervosiscono", why: "I fattori scatenanti non si possono evitare, perché bad beat e avversari aggressivi ci saranno sempre. L'obiettivo è riconoscere la tua reazione e rispondere." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Il tuo gioco ha giorni buoni e giorni cattivi. Dove si trova il progresso stabile più rapido?"
    options:
      - { text: "Nel migliorare il tuo gioco peggiore (C-game)", correct: true, why: "Il progresso ricorda il movimento di un bruco: un passo avanti davanti (un A-game migliore) e un passo dietro (un C-game meno disastroso). Eliminare gli errori peggiori libera anche attenzione per imparare cose nuove." }
      - { text: "Solo nel perfezionare il tuo gioco migliore (A-game)", why: "L'A-game conta, ma è il C-game a costare di più. Senza migliorare i giorni peggiori, il progresso davanti si perde facilmente dietro." }
      - { text: "Da nessuna parte, la forma è una questione di fortuna", why: "Le oscillazioni di forma si possono ridurre: i giocatori che controllano bene il tilt hanno una distribuzione più stretta del livello di gioco (rassegna del 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Come verifichi se il tuo lavoro sul {{t:mental-game}}, cioè sulla gestione di tilt, emozioni e concentrazione, sta dando risultati?"
    options:
      - { text: "Confronti le tue {{t:session|sessioni}} peggiori con le peggiori precedenti", correct: true, why: "Confronta simile con simile: il gioco peggiore con il peggiore precedente. Il progresso si vede anche dal fatto che riconosci prima il tilt e chiudi prima la {{t:session|sessione}}." }
      - { text: "Guardi il risultato dell'ultima settimana", why: "Una settimana di risultati è soprattutto {{t:variance}} (lezione sulla {{t:variance|varianza}}). La qualità del gioco nei giorni peggiori dice di più." }
      - { text: "Confronti la tua {{t:session|sessione}} migliore con la peggiore", why: "Questo confronto mostra solo le oscillazioni, non il progresso. Confronta il gioco peggiore con il peggiore precedente." }
---
Il tilt è la perdita di controllo sotto l'effetto di emozioni negative, di solito dopo dei bad beat o una lunga serie di perdite. Finisce con decisioni scadenti e una perdita molto più grande del solito. Non è raro: in un'indagine tramite questionario, l'{{n:tilt.severe}} dei giocatori ha ammesso di essere andato in tilt pesante almeno una volta negli ultimi sei mesi.

## Sette tipi di tilt

Un autorevole manuale di psicologia del poker descrive il tilt come un problema di rabbia e ne distingue {{n:tilt.types}} tipi:

| Tipo | Che cosa lo scatena |
|---|---|
| Da serie di carte sfavorevoli | Gli altri tipi di tilt tornano così spesso che la mente non fa in tempo a resettarsi prima della {{t:session|sessione}} successiva |
| Da ingiustizia | Bad beat, cooler, carte prese dall'avversario al river |
| Da odio per la sconfitta | La sconfitta in sé, anche quando sai che è {{t:variance}} |
| Da errore | I tuoi sbagli |
| Da pretesa di vittoria | La convinzione di meritare la vittoria |
| Da vendetta | Mancanza di rispetto, aggressività continua dell'avversario |
| Da disperazione | Il bisogno di rifarsi: maratone, {{t:stakes|limiti}} più alti |

## Riconosci i segnali

Ognuno va in tilt in modo un po' diverso. Scrivi il tuo **profilo di tilt**: che cosa lo scatena, che cosa pensi e provi in quel momento, che cosa fai al tavolo (ad es. {{t:call|chiami}} troppo largo, {{t:raise|rilanci}} per vendetta). Più conosci i tuoi segnali, prima li cogli.

## Reagisci finché riesci a ragionare

Quando il tilt cresce, spegne la capacità di ragionare. Per questo reagisci ai primi segnali:

1. Un respiro che ti dà un attimo di distanza dall'emozione.
2. Una frase preparata che risponde alla causa, ad es. “I giocatori più deboli a volte devono vincere, è {{t:variance}}. Continua a giocare bene”.
3. Se non riesci più a ragionare con lucidità, chiudi la {{t:session|sessione}}. È un progresso anche smettere prima, per un buon motivo.

## A-game e C-game

Il tuo gioco ha delle oscillazioni: dal migliore (A-game) al peggiore (C-game). Il progresso ricorda il movimento di un bruco: un passo avanti davanti, quando il gioco migliore diventa ancora migliore, e un passo dietro, quando il peggiore diventa meno disastroso. È il C-game a costare di più, quindi comincia da lì.

:::note Quando è qualcosa di più del tilt
Se giochi più a lungo di quanto hai previsto, cerchi di rifarti delle perdite o giochi con soldi che non puoi permetterti di perdere, leggi la scheda sul gioco responsabile nella lezione sul bankroll.
:::
