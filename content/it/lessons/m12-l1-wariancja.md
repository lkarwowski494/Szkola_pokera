---
id: m12.l1
module: m12
order: 1
title: "La varianza in numeri"
sub: "Quanto dice un risultato su migliaia di mani"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Vinci in media {{n:var.wr.ex}} e giocherai {{n:var.hands.k}} mila mani. A quanti {{t:buy-in|buy-in}} (da {{n:format.stack}} ciascuno) corrisponde il tuo risultato atteso? Inserisci un numero."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} mila mani sono {{n:var.blocks}} blocchi da 100 mani. Risultato atteso = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, cioè {{n:var.exp.bi}} {{t:buy-in|buy-in}}. È una media: il risultato reale può discostarsene molto."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "La {{t:standard-deviation|deviazione standard}} del tuo gioco è {{n:var.sd}}. Quanto vale la {{t:standard-deviation|deviazione}} del risultato dopo {{n:var.hands.k}} mila mani ({{n:var.blocks}} blocchi da 100 mani)?"
    options:
      - { text: "Circa {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}", correct: true, why: "La {{t:standard-deviation|deviazione}} cresce con la radice quadrata del numero di blocchi: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, cioè circa {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}." }
      - { text: "Circa {{n:var.sd.wrong.bi}} {{t:buy-in|buy-in}}", why: "È ciò che ottieni moltiplicando la {{t:standard-deviation|deviazione}} per il numero di blocchi. Le oscillazioni casuali si compensano in parte, quindi moltiplichi per la radice quadrata: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Circa {{n:var.exp.bi}} {{t:buy-in|buy-in}}", why: "È il risultato atteso con {{n:var.wr.ex}}, non la sua {{t:standard-deviation|deviazione}}. La {{t:standard-deviation|deviazione}} è di circa {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Vinci {{n:var.wr.ex}} con una {{t:standard-deviation|deviazione}} di {{n:var.sd}}. In quale intervallo cadrà il tuo risultato dopo {{n:var.hands.k}} mila mani con una certezza di circa il {{n:var.conf95}}?"
    options:
      - { text: "Da circa {{n:var.ci.low.bi}} a circa {{n:var.ci.high.bi}} {{t:buy-in|buy-in}}", correct: true, why: "Risultato atteso {{n:var.exp.bi}} {{t:buy-in|buy-in}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Anche un giocatore nettamente vincente può trovarsi quasi in pareggio dopo {{n:var.hands.k}} mila mani." }
      - { text: "Da circa {{n:var.ci68.low.bi}} a circa {{n:var.ci68.high.bi}} {{t:buy-in|buy-in}}", why: "È l'intervallo di una sola {{t:standard-deviation|deviazione}}: comprende solo circa 2 risultati su 3. Per il {{n:var.conf95}} prendi {{n:var.z95}} {{t:standard-deviation|deviazioni}}: da circa {{n:var.ci.low.bi}} a circa {{n:var.ci.high.bi}}." }
      - { text: "Esattamente {{n:var.exp.bi}} {{t:buy-in|buy-in}}", why: "È solo la media. Il risultato oscilla intorno a essa di decine di {{t:buy-in|buy-in}} in entrambe le direzioni." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Dopo {{n:var.hands.k}} mila mani ({{n:var.blocks}} blocchi da 100) con una {{t:standard-deviation|deviazione}} di {{n:var.sd}}: quanto vale l'errore standard del tuo winrate in bb/100? Considera √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Inserisci un numero."
    answer: var.se.wr
    explanation: "Errore standard = SD ÷ √(numero di blocchi) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. L'intervallo al {{n:var.conf95}} è ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Dopo {{n:var.hands.k}} mila mani il tuo risultato è {{n:var.wr.ex}}, {{t:standard-deviation|deviazione}} {{n:var.sd}}. Cosa sai del tuo vero winrate?"
    options:
      - { text: "Con una certezza di circa il {{n:var.conf95}} si trova tra circa {{n:var.wr.ci.low}} e circa {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Dopo {{n:var.hands.k}} mila mani sai solo che probabilmente non stai perdendo." }
      - { text: "È {{n:var.wr.ex}}, perché il campione è grande", why: "{{n:var.hands.k}} mila mani sembrano tante, ma con una {{t:standard-deviation|deviazione}} di {{n:var.sd}} l'errore è ancora di circa ± {{n:var.ci.wr}}." }
      - { text: "Niente, il risultato nel poker è pura fortuna", why: "Un'esagerazione. Il campione restringe l'intervallo, solo lentamente: l'errore cala con la radice quadrata del numero di mani." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Vuoi conoscere il tuo winrate con una precisione di ± {{n:var.target}} e una certezza del {{n:var.conf95}}. La {{t:standard-deviation|deviazione}} è {{n:var.sd}}. Quante mani ti servono?"
    options:
      - { text: "Circa {{n:var.need.hands.k}} mila", correct: true, why: "Blocchi = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Sono circa {{n:var.need.hands.k}} mila mani." }
      - { text: "Circa {{n:var.hands.k}} mila", why: "Dopo {{n:var.hands.k}} mila mani l'errore è di circa ± {{n:var.ci.wr}}. Per ridurlo a ± {{n:var.target}} ti servono circa {{n:var.need.hands.k}} mila mani." }
      - { text: "Circa {{n:var.need.blocks}} mani", why: "È il numero di blocchi da 100 mani. Le mani sono cento volte di più: circa {{n:var.need.hands.k}} mila." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Un giocatore vince {{n:var.wr.ex}} con una {{t:standard-deviation|deviazione}} di {{n:var.sd}}. Quanto spesso, nell'arco di {{n:var.hands.k}} mila mani, gli capiterà un {{t:downswing}} di almeno {{n:dd.bi.small}} {{t:buy-in|buy-in}} dal punto più alto?"
    options:
      - { text: "Quasi sempre, circa il {{n:dd.p.small.100k}}", correct: true, why: "Una simulazione di {{n:var.hands.k}} mila mani con questi parametri produce un {{t:downswing}} simile in circa il {{n:dd.p.small.100k}} delle prove. Un {{t:downswing|downswing}} di {{n:dd.bi.small}} {{t:buy-in|buy-in}} è una parte normale del gioco di un giocatore vincente." }
      - { text: "In circa il {{n:dd.p.small.20k}} dei casi", why: "È il dato per un campione più breve, {{n:dd.hands.short.k}} mila mani. In {{n:var.hands.k}} mila mani le occasioni per un {{t:downswing}} profondo sono molte di più: circa il {{n:dd.p.small.100k}}." }
      - { text: "Raramente, circa il {{n:var.p.lose}}", why: "È la frequenza con cui un giocatore da {{n:var.wr.ex}} chiude {{n:var.hands.k}} mila mani in perdita. Un {{t:downswing|downswing}} lungo il percorso è un'altra cosa: capita quasi sempre." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Due giocatori, {{t:standard-deviation|deviazione}} {{n:var.sd}}, {{n:var.hands.k}} mila mani. Uno vince {{n:var.wr.ex}}, l'altro {{n:dd.wr-low}}. Quanto spesso ciascuno di loro subirà un {{t:downswing}} di {{n:dd.bi.big}} {{t:buy-in|buy-in}}?"
    options:
      - { text: "Il primo in circa il {{n:dd.p.big.100k}}, il secondo in circa il {{n:dd.p.big.100k.wr-low}} dei casi", correct: true, why: "Un winrate più basso spinge meno il risultato verso l'alto, quindi i {{t:downswing|downswing}} sono più profondi e più frequenti. Con {{n:dd.wr-low}}, tipico dei giocatori vincenti ai microlimiti, un {{t:downswing}} di {{n:dd.bi.big}} {{t:buy-in|buy-in}} capita in più di un campione su due." }
      - { text: "Entrambi con la stessa frequenza, perché la {{t:standard-deviation|deviazione}} è la stessa", why: "La {{t:standard-deviation|deviazione}} determina le oscillazioni, ma il winrate determina quanto velocemente il risultato se ne allontana. Con {{n:dd.wr-low}} un {{t:downswing}} di {{n:dd.bi.big}} {{t:buy-in|buy-in}} capita in circa il {{n:dd.p.big.100k.wr-low}} dei campioni, con {{n:var.wr.ex}} in circa il {{n:dd.p.big.100k}}." }
      - { text: "Nessuno dei due: un {{t:downswing}} di {{n:dd.bi.big}} {{t:buy-in|buy-in}} capita solo ai giocatori in perdita", why: "Falso. Anche un giocatore da {{n:var.wr.ex}} lo subisce in circa il {{n:dd.p.big.100k}} dei campioni da {{n:var.hands.k}} mila mani." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Da un mese sei sotto di {{n:dd.bi.small}} {{t:buy-in|buy-in}}. Cosa ne consegue?"
    options:
      - { text: "Il {{t:downswing}} da solo non dimostra nulla; rivedi le decisioni nelle mani perse", correct: true, why: "Un {{t:downswing|downswing}} di {{n:dd.bi.small}} {{t:buy-in|buy-in}} nell'arco di {{n:var.hands.k}} mila mani colpisce quasi ogni giocatore che vince da {{n:dd.wr-low}} a {{n:var.wr.ex}} (simulazione con SD {{n:var.sd}}). A dirti se giochi bene è la revisione delle decisioni, non il risultato da solo." }
      - { text: "Giochi male e devi cambiare tutto il tuo stile di gioco", why: "{{t:downswing|Downswing}} di queste dimensioni capitano ai giocatori che vincono {{n:var.wr.ex}} (SD {{n:var.sd}}) in circa il {{n:dd.p.small.100k}} dei campioni da {{n:var.hands.k}} mila mani. Cambiare stile solo per il risultato significa reagire al rumore." }
      - { text: "Sei sicuramente sfortunato, non devi rivedere nulla", why: "Un {{t:downswing|downswing}} può anche derivare da errori. Il risultato non distingue la sfortuna da un errore, ma la revisione delle mani può farlo." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Quale {{t:standard-deviation|deviazione standard}} è tipica nel cash game 6-max No-Limit Hold'em?"
    options:
      - { text: "Circa {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "È ciò che riportano i calcolatori di {{t:variance|varianza}}. Come valore tipico si prende più spesso circa {{n:var.sd}}. Uno stile aggressivo dà una {{t:standard-deviation|deviazione}} più alta." }
      - { text: "Circa {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "È il winrate tipico dei giocatori vincenti ai microlimiti. La {{t:standard-deviation|deviazione}} è decine di volte più grande del winrate, ed è per questo che i risultati oscillano così tanto." }
      - { text: "Circa {{n:var.sd.result.bi}} {{t:buy-in|buy-in}} ogni 100 mani", why: "È la {{t:standard-deviation|deviazione}} del risultato dopo {{n:var.hands.k}} mila mani, non ogni 100 mani." }
---
Il tuo risultato nel poker è la somma di due cose: quanto bene giochi e la fortuna. Entrambe le componenti si possono misurare. Il winrate dice quanto vinci in media, la {{t:standard-deviation|deviazione standard}} quanto il risultato oscilla intorno a questa media.

## Due numeri in bb/100

Il **winrate** è il profitto medio ogni 100 mani in {{t:big-blind|big blind}}. I giocatori vincenti ai microlimiti hanno di solito {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

La **{{t:standard-deviation|deviazione standard}} (SD)** è la dispersione tipica del risultato ogni 100 mani. Nel cash game 6-max è di solito {{n:var.sd.low}}–{{n:var.sd.high}}, e come valore tipico si prende {{n:var.sd}}. La {{t:standard-deviation|deviazione}} è decine di volte più grande del winrate, quindi il risultato di una {{t:session|sessione}}, e persino di un mese, dice molto poco.

## Il risultato su molte mani

Dividi il numero di mani per 100 e ottieni il numero di blocchi.

```formula
risultato atteso = winrate × numero di blocchi
deviazione del risultato = SD × √(numero di blocchi)
intervallo al {{n:var.conf95}} = risultato atteso ± {{n:var.z95}} × deviazione del risultato
```

Esempio: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} mila mani, cioè {{n:var.blocks}} blocchi. Ti aspetti {{n:var.exp.bb}}, cioè {{n:var.exp.bi}} {{t:buy-in|buy-in}}. La {{t:standard-deviation|deviazione}} del risultato è {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, cioè circa {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}. Con una certezza del {{n:var.conf95}} chiuderai tra circa **{{n:var.ci.low.bi}} e {{n:var.ci.high.bi}} {{t:buy-in|buy-in}}**. Il risultato atteso si trova circa {{n:var.z.lose}} {{t:standard-deviation|deviazioni standard}} sopra lo zero, quindi la probabilità di essere in perdita dopo {{n:var.hands.k}} mila mani è di circa il {{n:var.p.lose}}.

## Quante mani per conoscere il tuo winrate

Lo stesso calcolo funziona al contrario. L'errore nella stima del winrate cala con la radice quadrata del numero di mani:

```formula
errore del winrate = SD ÷ √(numero di blocchi)
blocchi necessari = ({{n:var.z95}} × SD ÷ precisione)²
```

Dopo {{n:var.hands.k}} mila mani l'errore è di circa {{n:var.se.wr}}, quindi l'intervallo al {{n:var.conf95}} è ± {{n:var.ci.wr}}. Un risultato di {{n:var.wr.ex}} significa allora solo che il tuo vero winrate si trova da qualche parte tra circa {{n:var.wr.ci.low}} e {{n:var.wr.ci.high}}. Per conoscere il winrate con una precisione di ± {{n:var.target}} ti servono circa **{{n:var.need.hands.k}} mila mani**.

## I {{t:downswing|downswing}} sono normali

Il {{t:downswing|downswing}} è un calo del risultato rispetto al punto più alto. Simulazione di un giocatore da {{n:var.wr.ex}} con SD {{n:var.sd}}:

| {{t:downswing|Downswing}} dal picco | In {{n:dd.hands.short.k}} mila mani | In {{n:var.hands.k}} mila mani | In {{n:var.hands.k}} mila mani con {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-in}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-in}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Da dove vengono questi numeri
Risultati di simulazione: migliaia di prove da {{n:var.hands.k}} mila mani ciascuna, con un risultato casuale per ogni blocco. I {{t:downswing|downswing}} reali possono essere un po' più profondi, perché il risultato cambia a ogni mano e non ogni 100 mani. Conclusione: un {{t:downswing}} di {{n:dd.bi.small}} {{t:buy-in|buy-in}} non dimostra che giochi male.
:::

Sono indicazioni generali, non una garanzia di risultato. Se il gioco sfugge al tuo controllo, consulta la schermata «Aiuto».
