---
id: m10.l1
module: m10
order: 1
title: "Statistiche HUD"
sub: "Che cosa misurano VPIP e PFR e quante mani servono"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Sei in {{t:big-blind|big blind}}. Due giocatori fanno limp, tu fai {{t:check}} e vedi il flop. Questa mano aumenta il tuo {{t:vpip}}?"
    options:
      - { text: "No: non hai messo volontariamente nemmeno una {{t:chips|fiche}}", correct: true, why: "Il {{t:vpip}} conta solo i versamenti volontari prima del flop: una {{t:call|chiamata}} o un {{t:raise|rilancio}}. Il {{t:big-blind|big blind}} è un versamento obbligatorio, e il {{t:check}} non costa nulla." }
      - { text: "Sì: giochi il flop, quindi la mano conta come giocata", why: "Vedere il flop non basta. Il {{t:vpip}} sale solo quando sei tu a mettere {{t:chips|fiches}} prima del flop." }
      - { text: "Sì, e aumenta anche il {{t:pfr}}", why: "Il {{t:pfr}} sale solo con un {{t:raise|rilancio}} prima del flop. Qui nessuno ha {{t:raise|rilanciato}}, e tu hai solo fatto {{t:check}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un amico ti mostra un appunto: un avversario ha {{t:vpip}} {{n:hud.ex.wrong.vpip}} e {{t:pfr}} {{n:hud.ex.wrong.pfr}}. Che ne pensi?"
    options:
      - { text: "È impossibile: il {{t:pfr}} non può essere maggiore del {{t:vpip}}", correct: true, why: "Ogni {{t:raise|rilancio}} prima del flop è anche un versamento volontario, quindi conta in entrambe le statistiche. Il {{t:pfr}} è sempre al massimo uguale al {{t:vpip}}; il tuo amico ha confuso i numeri." }
      - { text: "È un giocatore molto aggressivo che non {{t:call|chiama}} quasi mai", why: "Un giocatore che non {{t:call|chiama}} mai ha il {{t:pfr}} uguale al {{t:vpip}}, ma non maggiore. Un {{t:pfr}} maggiore indica un errore di annotazione." }
      - { text: "È un giocatore passivo", why: "La passività si vede quando il {{t:pfr}} è molto minore del {{t:vpip}}, non maggiore." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un avversario ha {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}}. Che cosa fa con le mani che gioca ma non {{t:raise|rilancia}}?"
    options:
      - { text: "{{t:call|Chiama}} o fa limp: è la differenza, il {{n:mda.rec.gap}} delle mani", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Queste mani le mette nel {{t:pot|piatto}} senza {{t:raise|rilancio}}: fa limp o {{t:call|chiama}} le {{t:open|aperture}} altrui." }
      - { text: "Le {{t:fold|folda}} prima del flop", why: "Le mani foldate prima del flop non contano affatto nel {{t:vpip}}. La differenza {{t:vpip}} − {{t:pfr}} sono le mani giocate senza {{t:raise|rilancio}}." }
      - { text: "Le gioca {{t:all-in}}", why: "Anche l'all-in prima del flop è un {{t:raise|rilancio}}, quindi aumenterebbe il {{t:pfr}}. La differenza sono le mani solo {{t:call|chiamate}} o giocate in limp." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Dopo {{n:hud.se.ex.n}} mani un avversario ha {{t:vpip}} {{n:hud.se.ex.p}}. Quanto vale l'errore standard di questo numero in punti percentuali? Inserisci un numero."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Con una confidenza di circa il {{n:var.conf95}}, il vero {{t:vpip}} si trova entro ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Dopo {{n:hud.se.ex.n}} mani il {{t:vpip}} dell'avversario è {{n:hud.se.ex.p}}. Che cosa sai del suo vero {{t:vpip}}?"
    options:
      - { text: "Con una confidenza di circa il {{n:var.conf95}} sta tra {{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}", correct: true, why: "L'errore standard è circa {{n:hud.se.ex}}, e l'intervallo al {{n:var.conf95}} è ± {{n:var.z95}} errori, cioè ± {{n:hud.ci.ex}}. Sai che l'avversario non è estremo, ma non distingui ancora tipi che differiscono di pochi punti." }
      - { text: "È esattamente {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} mani sono ancora un campione piccolo: l'errore è circa {{n:hud.se.ex}}, e l'intervallo al {{n:var.conf95}} è ± {{n:hud.ci.ex}}." }
      - { text: "Niente: prima di mille mani le statistiche non hanno significato", why: "È un'esagerazione. Un intervallo da {{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}} esclude già un giocatore molto tight e uno molto loose. Manca solo la precisione." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Dopo qualche centinaio di mani l'avversario ha avuto {{n:hud.se.f3b.n}} occasioni di rispondere a un 3-bet e ha {{t:fold|foldato}} nel {{n:hud.se.f3b.p}} di esse. Che cosa sai del suo fold to 3-bet?"
    options:
      - { text: "Quasi nulla: con una confidenza di circa il {{n:var.conf95}} è tra {{n:hud.ci.f3b.low}} e {{n:hud.ci.f3b.high}}", correct: true, why: "Contano le occasioni, non le mani. L'errore è √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, e l'intervallo al {{n:var.conf95}} è ± {{n:hud.ci.f3b}}. In un intervallo così rientrano sia un giocatore che difende quasi sempre, sia uno che {{t:fold|folda}} quasi sempre." }
      - { text: "{{t:fold|Folda}} esattamente nel {{n:hud.se.f3b.p}} dei casi, perché il campione ha qualche centinaio di mani", why: "Qualche centinaio di mani sono solo {{n:hud.se.f3b.n}} occasioni per questa statistica. L'errore lo calcoli dalle occasioni: viene circa {{n:hud.se.f3b}}." }
      - { text: "{{t:fold|Folda}} troppo spesso, perché sopra il {{n:hud.f3b.low}} è un errore", why: "{{n:hud.se.f3b.p}} non è “sopra il {{n:hud.f3b.low}}”, e con {{n:hud.se.f3b.n}} occasioni l'errore è circa {{n:hud.se.f3b}}. Da un campione così non puoi trarre conclusioni." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Un avversario nuovo, {{n:hud.ex.few.hands}} mani nell'{{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Come giochi contro di lui?"
    options:
      - { text: "Come contro un giocatore sconosciuto, secondo la base; continuo a raccogliere mani", correct: true, why: "Sotto circa {{n:hud.hands.random}} mani le statistiche sono casuali: qualche buona carta di fila produce un {{t:vpip}} così. Il tipo di giocatore si vede a grandi linee dopo circa {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mani, e {{t:vpip}} e {{t:pfr}} si stabilizzano dopo circa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Come contro un {{t:maniac}}: {{t:call|chiamo}} largo", why: "Il {{t:maniac}}, cioè un giocatore molto loose e aggressivo, è solo una delle possibilità: dopo {{n:hud.ex.few.hands}} mani può essere qualsiasi tipo. {{t:call|Chiamare}} largo in base al caso costa caro quando l'avversario si rivela un normale {{t:regular}}, cioè un frequentatore abituale che gioca in modo abbastanza solido." }
      - { text: "Come contro un {{t:nit}}, perché la maggior parte dei giocatori sono nit", why: "Non sai neanche questo: il {{t:nit}}, cioè un giocatore molto tight, è solo uno dei tipi. Senza campione non c'è lettura, quindi torni alla base." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Quale statistica ha bisogno di più mani per essere affidabile?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "L'occasione per il fold to 3-bet si presenta solo quando l'avversario ha {{t:open|aperto}} e ha ricevuto un 3-bet, cioè di rado. Per questo ti servono circa {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} mani invece di {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "Il {{t:vpip}} ha un'occasione in ogni mano, quindi si stabilizza più in fretta: dopo circa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mani." }
      - { text: "{{t:pfr}}", why: "Il {{t:pfr}}, come il {{t:vpip}}, ha un'occasione in ogni mano in cui il giocatore può {{t:raise|rilanciare}}, quindi si stabilizza in fretta." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "La tua sala vieta i programmi con {{t:hud}} al tavolo. Che cosa fai?"
    options:
      - { text: "Gioco senza {{t:hud}} e dopo la {{t:session|sessione}} rivedo il mio database di mani e gli appunti sugli avversari abituali", correct: true, why: "Il regolamento della sala è vincolante: con un programma vietato rischi la chiusura dell'account. Le statistiche della tua cronologia di mani puoi rivederle dopo il gioco, e alcune sale mostrano statistiche proprie al tavolo." }
      - { text: "Uso l'{{t:hud}} nonostante il divieto, perché dà un vantaggio", why: "Se violi il regolamento, la sala può chiudere l'account e trattenere i fondi. Il vantaggio non ne vale la pena." }
      - { text: "Rinuncio allo {{t:exploit|sfruttamento}}, perché senza {{t:hud}} non si può fare", why: "Si può: anche le letture ricavate dalla revisione delle mani dopo la {{t:session|sessione}} e i dati sulla popolazione del tuo {{t:stakes|limite}} mostrano in che direzione allontanarti dalla base." }
---
Lo {{t:exploit|sfruttamento}} è un allontanamento dalla base dei moduli 3–9 nella direzione dell'errore dell'avversario. Per sapere in che direzione allontanarti, ti servono dati. Online li fornisce l'{{t:hud}}: un programma che registra le mani e mostra le statistiche di ogni avversario al tavolo.

## {{t:vpip}} e {{t:pfr}}

I due numeri più importanti descrivono il gioco prima del flop:

- **{{t:vpip}}**: in che percentuale di mani il giocatore mette volontariamente {{t:chips|fiches}} nel {{t:pot|piatto}} prima del flop, cioè {{t:call|chiama}} o {{t:raise|rilancia}}. I blind non contano, perché sono obbligatori.
- **{{t:pfr}}**: in che percentuale di mani il giocatore {{t:raise|rilancia}} prima del flop: {{t:open|apre}}, fa 3-bet o 4-bet.

Ogni {{t:raise|rilancio}} è anche un versamento volontario, quindi il {{t:pfr}} non supera mai il {{t:vpip}}. La differenza {{t:vpip}} − {{t:pfr}} sono le mani che il giocatore ha solo {{t:call|chiamato}} o giocato in limp. Un giocatore con {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}} gioca molte mani, ma nel {{n:mda.rec.gap}} di tutte le mani entra nel {{t:pot|piatto}} senza {{t:raise|rilancio}}.

## Altre statistiche

| Statistica | Che cosa misura | Occasione |
|---|---|---|
| 3-bet | quanto spesso {{t:raise|rilancia}} l'{{t:open|apertura}} altrui | qualcuno prima di lui ha {{t:open|aperto}} |
| Fold to 3-bet | quanto spesso {{t:fold|folda}} su un 3-bet | ha {{t:open|aperto}} e ha ricevuto un 3-bet |
| C-bet | quanto spesso punta il flop dopo il proprio {{t:raise|rilancio}} | era l'{{t:aggressor|aggressore}} prima del flop |
| Fold to c-bet | quanto spesso {{t:fold|folda}} su un c-bet | ha ricevuto un c-bet |
| {{t:wtsd}} | quanto spesso, dopo il flop, arriva allo showdown | ha visto il flop |

L'ultima colonna è importante: una statistica cambia solo quando l'avversario ne ha l'occasione. Il {{t:vpip}} ha un'occasione in ogni mano, il fold to 3-bet solo quando l'avversario ha {{t:open|aperto}} e ha ricevuto un 3-bet.

## Quante mani servono

Ogni mano è un campione casuale della strategia dell'avversario, quindi una statistica ha un errore come qualsiasi media campionaria. Lo calcoli con la formula dell'errore della media campionaria (nel modulo 12 userai la stessa formula per calcolare l'errore del {{t:winrate}}):

```formula
errore = √(p × (1 − p) ÷ n)
intervallo al {{n:var.conf95}} = p ± {{n:var.z95}} × errore
```

Qui p è la percentuale (per es. il {{t:vpip}}) e n il numero di occasioni. Dopo {{n:hud.se.ex.n}} mani con {{t:vpip}} {{n:hud.se.ex.p}} l'errore è circa {{n:hud.se.ex}}, quindi con una confidenza di circa il {{n:var.conf95}} il vero {{t:vpip}} sta tra **{{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}**. Un fold to 3-bet del {{n:hud.se.f3b.p}} su {{n:hud.se.f3b.n}} occasioni dà un intervallo da {{n:hud.ci.f3b.low}} a {{n:hud.ci.f3b.high}}: quasi nulla.

Gli allenatori indicano soglie simili:

- sotto circa {{n:hud.hands.random}} mani le statistiche sono casuali; giochi come contro un giocatore sconosciuto;
- il tipo di giocatore si vede a grandi linee dopo {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mani, e {{t:vpip}} e {{t:pfr}} si stabilizzano dopo circa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- il 3-bet richiede circa {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} mani, il fold to 3-bet circa {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, le statistiche di turn e river ancora di più.

:::note Quando la sala vieta l'{{t:hud}}
Alcune sale (secondo i materiali di formazione, anche grandi sale ai {{t:stakes|limiti}} bassi) vietano i programmi con {{t:hud}} al tavolo. In quel caso rivedi la tua cronologia di mani dopo la {{t:session|sessione}}, prendi appunti sugli avversari abituali e usi i dati sulla popolazione del tuo {{t:stakes|limite}} (lezione 2). Le soglie dei campioni provengono da due materiali di formazione che indicano numeri di mani diversi. La formula dell'errore è un calcolo.
:::
