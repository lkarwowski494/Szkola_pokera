---
id: m13.l2
module: m13
order: 2
title: "Ripassi dal gioco e allenamento mirato"
sub: "Cosa succede ai tuoi errori"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "In partita avevi A♥ K♥ sul {{t:board|board}} Q♥ 7♥ 2♣ e hai commesso un errore. Nel ripasso vedi A♠ K♠ sul {{t:board|board}} Q♠ 7♠ 2♦. La decisione corretta è la stessa?"
    options:
      - { text: "Sì: tutti i semi sono stati cambiati con un unico scambio", correct: true, why: "I cuori sono diventati picche e i fiori quadri, ovunque contemporaneamente. Hai ancora un {{t:flush-draw|progetto di colore}} con l'asso e la stessa forza della mano, quindi la decisione non cambia." }
      - { text: "No: le picche sono più forti dei cuori", why: "Nel Texas Hold'em i semi sono equivalenti: conta solo se le carte sono dello stesso seme, non di quale." }
      - { text: "Non si sa, bisogna ricalcolare da capo", why: "Non serve: scambiare tutti i semi contemporaneamente conserva ogni combinazione e ogni {{t:draw|progetto}}. È un calcolo, non un'approssimazione." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Quale di questi cambi NON conserva la decisione della situazione: K♥ Q♥ sul {{t:board|board}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ sul {{t:board|board}} J♠ 8♠ 3♥", correct: true, why: "Qui i semi sono stati cambiati solo sul {{t:board|board}}: i tuoi cuori non corrispondono più al {{t:board|board}} e il {{t:flush-draw|progetto di colore}} è sparito. È già un'altra situazione." }
      - { text: "K♠ Q♠ sul {{t:board|board}} J♠ 8♠ 3♥", why: "È un unico scambio per tutte le carte (cuori ↔ picche), quindi la decisione è la stessa." }
      - { text: "K♦ Q♦ sul {{t:board|board}} J♦ 8♦ 3♠", why: "È un unico scambio (cuori → quadri) per tutte le carte, quindi la decisione è la stessa." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Quali decisioni del report finiscono nei ripassi come carte?"
    options:
      - { text: "Errori, imprecisioni e decisioni prese dopo lo scadere del tempo", correct: true, why: "Sì. Una decisione accettabile non è un errore, quindi non crea una carta. La stessa regola con la stessa classe di mano nello stesso spot dà una sola carta, non più carte." }
      - { text: "Tutte le decisioni valutate", why: "Le decisioni conformi e quelle accettabili non richiedono correzioni, e i ripassi servono ad allenare ciò che è andato storto." }
      - { text: "Solo gli errori, non le imprecisioni", why: "Un'imprecisione (ad es. azione giusta, dimensione sbagliata) conta come un errore, quindi torna anch'essa nei ripassi." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "Nell'arco di {{n:game.recall.days}} giorni hai commesso {{n:game.recall.count}} errori nella stessa famiglia di spot (ad es. difesa del {{t:big-blind|big blind}} contro il Button). Cosa farà l'app?"
    options:
      - { text: "Riporterà nei ripassi l'intera famiglia: nuove mani da quello spot", correct: true, why: "Sì: la singola situazione viene ripetuta dalla sua carta, mentre un errore ricorrente in una famiglia riporta esercizi da tutta la famiglia, con mani nuove." }
      - { text: "Niente, bastano le carte degli errori", why: "Una carta ripete una situazione specifica. Un errore ricorrente in una famiglia significa che vale la pena esercitarla in modo più ampio." }
      - { text: "Bloccherà l'area di questo modulo", why: "Un'area sbloccata dopo le lezioni resta disponibile. L'app aggiunge solo ripassi." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Dopo una {{t:session|sessione}} di qualche decina di mani, conti di essere entrato in gioco in quasi metà di esse. Cosa ne consegue?"
    options:
      - { text: "Per ora niente: il campione è troppo piccolo", correct: true, why: "Anche il {{t:vpip}} si legge dopo circa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mani. Da una sola {{t:session|sessione}} valuti le singole decisioni, ma non le tue frequenze." }
      - { text: "Giochi troppo largo e devi cambiare", why: "Forse sì, forse no: qualche decina di mani è troppo poco per distinguere lo stile dalla distribuzione delle carte. Guarda la valutazione di ogni decisione di entrare in gioco." }
      - { text: "Giochi bene, perché hai vinto molte mani", why: "Il risultato non dice nulla sulla qualità delle decisioni, e una {{t:session}} non dice nulla sulle frequenze." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "In una {{t:session|sessione}} hai ricevuto un 4-bet due volte e hai {{t:fold|foldato}} entrambe le volte. Sai già che {{t:fold|foldi}} troppo spesso al 4-bet?"
    options:
      - { text: "No: contano le occasioni, e due sono troppo poche", correct: true, why: "Uno dei coach guarda la statistica solo da circa {{n:hud.opps.look}} occasioni e ne diventa sicuro a circa {{n:hud.opps.sure}}. Due occasioni sono rumore; valuti ognuna di queste decisioni separatamente." }
      - { text: "Sì: {{t:fold|foldi}} in ogni situazione", why: "Due su due sembra «sempre», ma con due occasioni anche una strategia che {{t:fold|folda}} metà delle volte darà spesso questo risultato." }
      - { text: "Sì, se è successo in una sola {{t:session|sessione}}", why: "Una sola {{t:session}} non aggiunge nulla: il numero di occasioni resta piccolo." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Quando si sblocca l'area di gioco «Flop: c-bet»?"
    options:
      - { text: "Dopo aver completato tutte le lezioni del modulo", correct: true, why: "Sì: l'area distribuisce solo situazioni del modulo, quindi si sblocca quando ne conosci già le regole. Il gioco libero è disponibile dall'inizio." }
      - { text: "Dopo aver vinto qualche {{t:session|sessione}}", why: "Il risultato in {{t:chips|fiches}} non sblocca nulla: è soprattutto rumore." }
      - { text: "Subito, come il gioco libero", why: "Il gioco libero è disponibile dal primo giorno, le aree solo dopo le lezioni del modulo." }
---
Ogni errore del report ti ritorna nei ripassi. Questa lezione ti mostra come.

## La stessa situazione con semi diversi

Errori, imprecisioni e decisioni prese dopo lo scadere del tempo diventano carte di ripasso. Una carta mostra la stessa situazione: le stesse {{t:position|posizioni}}, azioni e dimensioni, gli stessi valori delle carte. Cambiano solo i semi: l'app li sostituisce con un unico scambio per tutte le carte contemporaneamente, ad es. cuori con picche e picche con cuori.

Uno scambio del genere non cambia la forza di nessuna mano né di nessun {{t:draw|progetto}}, perché conta solo se le carte sono dello stesso seme. La decisione corretta quindi è la stessa, e tu impari a riconoscere la situazione invece di memorizzare un'immagine.

La stessa regola con la stessa classe di mano nello stesso spot dà una sola carta, non più carte. Le nuove carte dal gioco entrano nei ripassi entro un limite giornaliero; le altre aspettano i giorni successivi.

## Quando un errore si ripete

Se nell'arco di {{n:game.recall.days}} giorni hai almeno {{n:game.recall.count}} errori o imprecisioni nella stessa famiglia di spot, l'app riporta nei ripassi l'intera famiglia: esercizi con nuove mani da quello spot. Contano gli errori di decisione, non le mani perse. Queste soglie sono valori iniziali, che miglioreremo in base ai dati di utilizzo dell'app.

## Allenamento mirato

Un'area di gioco corrisponde a un modulo del corso. Si sblocca dopo aver completato tutte le lezioni del modulo e distribuisce solo situazioni di quel modulo, ad es. un c-bet dopo un'{{t:open|apertura}} dal Button. Dal report passi direttamente all'area in cui hai fatto più errori.

## Una {{t:session|sessione}} non è una statistica

Il report non mostra le tue frequenze, ad es. quanto spesso entri in gioco. Anche il {{t:vpip}} si legge dopo circa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mani, e le situazioni rare capitano in una {{t:session|sessione}} solo poche volte. Uno dei coach consiglia di contare le occasioni, non le mani: guarda la statistica a circa {{n:hud.opps.look}} occasioni e ne diventa sicuro a circa {{n:hud.opps.sure}}.

:::note Da dove vengono queste regole
Lo scambio dei semi è un calcolo: la classifica delle combinazioni non distingue i semi. Campioni di mani come nel modulo sullo {{t:exploit|sfruttamento}} (due materiali formativi); numero di occasioni: un materiale formativo sulla dimensione del campione per le statistiche dell'{{t:hud|HUD}}. Le soglie dei ripassi sono impostazioni dell'app, senza fonte.
:::
