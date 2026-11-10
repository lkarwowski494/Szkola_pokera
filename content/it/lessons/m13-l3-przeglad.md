---
id: m13.l3
module: m13
order: 3
title: "Rivedere le mani del gioco reale"
sub: "Cosa rivedere e come"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Durante una partita dal vivo ti capita una mano in cui non sai cosa fare. Cosa ne fai dopo?"
    options:
      - { text: "La annoto brevemente e la rivedo dopo la {{t:session|sessione}}", correct: true, why: "Sì: durante il gioco ti limiti a segnare la mano e la analizzi dopo, a mente lucida. Un giudizio dato sotto l'effetto delle emozioni può essere sbagliato." }
      - { text: "La analizzo subito, finché me la ricordo", why: "Basta una breve nota per non dimenticarla. L'analisi completa la fai dopo, a mente lucida." }
      - { text: "Niente, conta la mano successiva", why: "Le mani in cui non sapevi cosa fare vale la pena rivederle. Segnale e riprendile dopo la {{t:session|sessione}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Hai appena perso un grosso {{t:pot|piatto}} e sei nervoso. Qual è il momento migliore per rivedere questa mano?"
    options:
      - { text: "Dopo qualche ora o il giorno dopo", correct: true, why: "Sì: il momento migliore per la revisione è qualche ora o qualche giorno dopo la {{t:session|sessione}}, a mente lucida. Subito dopo una sconfitta è facile scambiare una buona decisione per un errore, o viceversa." }
      - { text: "Subito, per non dimenticare i dettagli", why: "I dettagli li annoti subito, ma il giudizio lo rimandi. Sotto l'effetto delle emozioni il giudizio è condizionato dal risultato." }
      - { text: "Mai, è stata sfortuna", why: "Forse è stata sfortuna, forse un errore. Lo scoprirai solo rivedendola, quando le emozioni si saranno calmate." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Quale di queste mani vale meno la pena di analizzare a lungo?"
    options:
      - { text: "Un set perde contro un set più alto su un {{t:board}} {{t:dry|secco}}; avete giocato entrambi tutto lo stack", correct: true, why: "Sì: è un cooler. Nessun giocatore ragionevole qui {{t:fold|folderebbe}} un set. I cooler capitano a tutti e insegnano poco." }
      - { text: "Un grosso {{t:pot}} perso, in cui al river non sapevi se {{t:call|chiamare}}", why: "È un buon candidato per la revisione: un {{t:pot}} grosso e una decisione difficile." }
      - { text: "Un {{t:pot}} medio, in cui l'avversario ti ha giocato d'astuzia e ti sei sentito perso", why: "Mani così vale la pena rivederle: hai sentito che qualcosa è andato storto, e conviene capire cosa." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Hai perso un grosso {{t:pot|piatto}}, ma pensi di aver giocato bene. Vale la pena rivederlo?"
    options:
      - { text: "Sì: in un grosso {{t:pot|piatto}} le decisioni pesano di più, anche se hai giocato bene", correct: true, why: "Sì: i grossi {{t:pot|piatti}}, soprattutto quelli persi, sono le decisioni che pesano di più. Anche se hai giocato bene, vale la pena sapere perché. Tralasci solo i cooler evidenti." }
      - { text: "No: se ho giocato bene, non c'è niente da cercare", why: "Una certezza senza revisione resta solo una prima reazione. Un {{t:pot}} grosso è un buon motivo per rivederlo." }
      - { text: "Solo se ho perso contro una mano rara", why: "Non è il tipo di mano dell'avversario a decidere. Conta se la decisione era difficile o il {{t:pot}} grosso." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Inizi la revisione di una decisione al river. Cosa fai per prima cosa?"
    options:
      - { text: "Annoto la prima reazione, ad es. «{{t:call|chiamata}} facile», e solo dopo faccio i conti", correct: true, why: "Sì: confrontare la prima reazione con i calcoli mostra dove l'intuito ti inganna. Col tempo l'intuito migliora." }
      - { text: "Calcolo subito l'{{t:equity}}", why: "I calcoli servono, ma senza aver annotato la prima reazione non vedrai dove l'intuito sbaglia." }
      - { text: "Guardo quali carte aveva l'avversario", why: "Le carte dell'avversario allo showdown sono il risultato, non un'informazione disponibile al momento della decisione. Valuti la decisione rispetto alle sue mani possibili." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Stai rivedendo una {{t:call|chiamata}} al river. Anche con un'ipotesi pessimistica sul {{t:range}} dell'avversario (pochi {{t:bluff}}), hai abbastanza {{t:equity}}. E ora?"
    options:
      - { text: "Posso fermarmi: la decisione è buona con qualsiasi ipotesi ragionevole", correct: true, why: "Sì: le ipotesi estreme delimitano l'intervallo. Se la decisione è buona anche con quella pessimistica, anche l'ipotesi realistica la confermerà." }
      - { text: "Devo ancora calcolare il caso realistico", why: "Non serve: l'ipotesi realistica sta tra quelle estreme, e dato che entrambe portano alla stessa conclusione, il risultato non cambierà." }
      - { text: "Passo a un'ipotesi ottimistica, perché quella pessimistica è esagerata", why: "Parti dagli estremi per delimitare l'intervallo. Se quella pessimistica dà un buon risultato, a maggior ragione lo darà quella ottimistica." }
---
L'app rivede per te le mani giocate contro i bot. Le mani giocate fuori dall'app le rivedi da solo. Questa lezione raccoglie i consigli degli allenatori.

## Segna durante il gioco, analizza dopo la {{t:session|sessione}}

Durante il gioco ti limiti a segnare le mani che ti sono sembrate interessanti, difficili o strane: basta una breve nota. È meglio rivederle qualche ora o qualche giorno dopo la {{t:session|sessione}}, a mente lucida. Il momento peggiore è subito dopo una grossa sconfitta o quando sei stanco.

## Cosa rivedere

- I grossi {{t:pot|piatti}}, soprattutto quelli persi: è lì che le decisioni pesano di più.
- Le mani in cui non sapevi cosa fare o in cui hai sentito che l'avversario ti ha giocato d'astuzia.
- Anche le vincite: un errore che ha pagato costa esattamente lo stesso (lezione su decisione e risultato).

Non dedichi molto tempo a cooler e bad beat. Un cooler è una mano in cui si incontrano due mani forti e nessuna delle due poteva ragionevolmente {{t:fold|foldare}}, ad es. un set contro un set più alto. Mani così capitano a tutti e insegnano poco.

## Come rivedere una decisione

1. Annota la mano: {{t:position|posizioni}}, stack, azioni e size su ogni {{t:street}}.
2. Annota la prima reazione: se la decisione ti sembra facile o difficile.
3. Calcola: il prezzo, l'{{t:equity}} e ciò che sapevi al momento della decisione.
4. Verifica la decisione con tre ipotesi sul {{t:range}} dell'avversario: ottimistica, pessimistica e realistica. Se è buona anche con quella pessimistica, puoi fermarti.
5. Annota la differenza tra la prima reazione e i calcoli. Col tempo l'intuito migliora.

:::note Da dove vengono queste regole
Tre materiali didattici sulla revisione delle mani: quando e cosa rivedere; cooler e bad beat; prima reazione e tre ipotesi sull'avversario. Sono euristiche degli allenatori, non risultati di un solver.
:::
