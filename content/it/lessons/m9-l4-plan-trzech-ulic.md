---
id: m9.l4
module: m9
order: 4
title: "Un piano su tre street"
sub: "Quante street di valore regge una mano"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}. Hai fatto set su un flop {{t:dry|secco}}. Quante {{t:value|street di valore}} regge questa mano?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Tre", correct: true, why: "Un set su un flop {{t:dry|secco}} è quasi sempre la mano migliore. A ogni {{t:street}} le mani peggiori dell'avversario (es. un re, un sette, una {{t:pair|coppia}}) possono ancora pagare, quindi pianifichi una {{t:bet|puntata}} su flop, turn e river." }
      - { text: "Una", why: "Troppo poco: con una mano così forte una sola {{t:bet|puntata}} lascia sul {{t:board}} la maggior parte del valore. Un avversario con un re pagherà più di una volta." }
      - { text: "Nessuna: faccio {{t:check}} per non spaventare l'avversario", why: "Fare {{t:check}} su tutte le {{t:street}} non costruisce il {{t:pot|piatto}}. Il set vuole che il {{t:pot|piatto}} cresca, perché di solito vince allo showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}, {{t:spr}} circa {{n:spr.srp}}. Hai {{t:top-pair}} con il miglior kicker. Qual è il piano?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Di solito due {{t:value|street di valore}}, senza un piano per giocare tutto lo stack", correct: true, why: "Sì: re e otto peggiori di solito pagano una o due {{t:bet|puntate}}. Quando nel {{t:pot|piatto}} ci sono moltissimi soldi, pagano soprattutto mani migliori di una sola {{t:pair|coppia}}. Con {{t:spr}} circa {{n:spr.srp}} tutto lo stack entrerebbe solo con {{t:bet|puntate}} più grandi del {{t:pot|piatto}}." }
      - { text: "Tre {{t:street}} di grandi {{t:bet|puntate}} fino all'all-in", why: "Con {{t:spr}} circa {{n:spr.srp}} significa {{t:bet|puntate}} di circa {{n:geo.srp.3}} del {{t:pot|piatto}} a ogni {{t:street}}. Al river nel {{t:pot|piatto}} resteranno soprattutto {{t:two-pair|doppie coppie}} e set, che battono una sola {{t:pair|coppia}}." }
      - { text: "Una {{t:street}} o nessuna", why: "Troppo prudente: {{t:top-pair}} con il miglior kicker su un flop {{t:dry|secco}} batte molte mani dell'avversario. Di solito regge due {{t:value|street di valore}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}}. Hai una {{t:pair|coppia}} media. Quante {{t:value|street di valore}} regge questa mano?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Una o nessuna: spesso basta arrivare allo showdown", correct: true, why: "Sì: la {{t:pair|coppia}} media batte i {{t:bluff}} e le {{t:pair|coppie}} più deboli, ma le mani peggiori che pagano diverse {{t:bet|puntate}} sono poche. Piano: al massimo una piccola {{t:bet|puntata}}, oppure {{t:check}} e {{t:call|chiamata}}." }
      - { text: "Due, come la {{t:top-pair}}", why: "La {{t:pair|coppia}} media perde contro ogni re. Dopo la seconda {{t:bet|puntata}} pagano soprattutto mani che la battono." }
      - { text: "Tre, così l'avversario non migliora", why: "Tre {{t:bet|puntate}} con una {{t:pair|coppia}} media vengono pagate soprattutto da mani migliori: le mani peggiori {{t:fold|foldano}} già dopo la prima o la seconda {{t:bet|puntata}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Piatto}} da 4-bet, {{t:spr}} circa {{n:spr.4bet}}. Hai {{t:top-pair}} con il miglior kicker. La mano regge due {{t:value|street di valore}}. Qual è il piano?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Due {{t:bet|puntate}} da circa {{n:geo.4bet.2}} del {{t:pot|piatto}}: al turn entra tutto lo stack", correct: true, why: "Sì: con {{t:spr}} circa {{n:spr.4bet}} due {{t:street}} bastano per mettere dentro tutto lo stack. Qui due {{t:value|street di valore}} con la {{t:top-pair}} significano giocare tutto lo stack." }
      - { text: "Piccola {{t:bet|puntata}} e {{t:fold}} sull'all-in", why: "Con {{t:spr}} circa {{n:spr.4bet}}, fare {{t:fold}} sull'all-in con {{t:top-pair}} e asso concede troppo: ti basta circa {{n:eq.jam.4bet}} di equity, e dopo la tua {{t:bet|puntata}} ancora meno." }
      - { text: "Faccio {{t:check}} a ogni {{t:street}} per controllare il {{t:pot|piatto}}", why: "Il controllo del {{t:pot|piatto}} ha senso con {{t:spr}} alto. Qui il {{t:pot|piatto}} è già grande rispetto allo stack, e le mani peggiori (AQ, QQ, JJ) metteranno volentieri il resto." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Piatto}} 3-bettato, hai la {{t:position|posizione}}, {{t:spr}} circa {{n:spr.3bet-ip}}. Hai un set e vuoi mettere dentro tutto lo stack entro il river. Quale linea?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Puntata}} su flop, turn e river, ogni volta di circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}", correct: true, why: "Sì: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} fanno in totale {{n:geo.3bet-ip.total}}, cioè tutto lo stack. A ogni {{t:street}} l'avversario paga una parte ragionevole del {{t:pot|piatto}}." }
      - { text: "{{t:bet|Puntata}} da 1/3 del {{t:pot|piatto}} a ogni {{t:street}}", sizeError: true, why: "Linea buona, dimensione sbagliata: tre {{t:bet|puntate}} da 1/3 del {{t:pot|piatto}} mettono dentro solo circa {{n:g3b.third.total}} su {{n:spr.3bet-ip.stack}}. Un piano per tutto lo stack richiede circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}." }
      - { text: "Faccio {{t:check}} su flop e turn, al river all-in", why: "Al river un all-in per tutto lo stack sarebbe una {{t:bet|puntata}} parecchie volte più grande del {{t:pot|piatto}}. L'avversario lo pagherà solo con una mano molto forte, e le mani peggiori che avrebbero pagato tre {{t:bet|puntate}} più piccole {{t:fold|folderanno}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Perché conviene fissare il piano su tre {{t:street}} già al flop?"
    options:
      - { text: "Perché la dimensione al flop decide quanto si potrà mettere dentro dopo", correct: true, why: "Sì: il {{t:pot|piatto}} cresce per moltiplicazione. Una piccola {{t:bet|puntata}} al flop lascia un {{t:pot|piatto}} piccolo per turn e river, quindi dopo è difficile mettere dentro tutto lo stack senza {{t:bet|puntate}} molto grandi." }
      - { text: "Perché dopo non si può cambiare piano", why: "Cambi piano quando cambia la situazione (es. una carta pericolosa al turn). Il punto è che la prima {{t:bet|puntata}} si adatti all'obiettivo: quante {{t:value|street di valore}} e se giocare tutto lo stack." }
      - { text: "Perché l'avversario vede il tuo piano", why: "L'avversario non conosce il tuo piano. Il piano aiuta te a scegliere la dimensione, così che alla fine nel {{t:pot|piatto}} ci sia quanto la mano regge." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Piatto}} con un solo rilancio, {{t:spr}} circa {{n:spr.srp}}. Hai {{t:top-pair}} con un buon kicker. Punti con la dimensione geometrica di circa {{n:geo.srp.3}} del {{t:pot|piatto}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "No: è una dimensione per tutto lo stack, e questa mano di solito regge due {{t:street}}", correct: true, why: "Esatto: la dimensione geometrica serve a mettere dentro tutto lo stack. Con {{t:bet|puntate}} più grandi del {{t:pot|piatto}} le mani peggiori smettono di pagare, e restano mani migliori di una sola {{t:pair|coppia}}." }
      - { text: "Sì: punto sempre in modo geometrico", why: "La dimensione geometrica si adatta a un piano per tutto lo stack. La {{t:top-pair}} con {{t:spr}} circa {{n:spr.srp}} di solito non ha un piano del genere." }
      - { text: "No: con la {{t:top-pair}} faccio sempre {{t:check}}", why: "La {{t:top-pair}} vuole {{t:bet|puntate}} per valore, solo più piccole e di solito su due {{t:street}}, non per tutto lo stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, stack da {{n:commit.stack}} ciascuno. Punti circa {{n:geo.spr2.2}} del {{t:pot|piatto}} al flop e al turn, l'avversario {{t:call|chiama}}. E il resto dello stack?"
    options:
      - { text: "Dopo il turn tutto lo stack è nel {{t:pot|piatto}}", correct: true, why: "Sì: {{n:geo.spr2.flop}} al flop e {{n:geo.spr2.turn}} al turn fanno in totale {{n:geo.spr2.total}}. Per questo con {{t:spr}} {{n:spr.commit}} due {{t:value|street di valore}} con la {{t:top-pair}} bastano per giocare tutto lo stack." }
      - { text: "Resta circa metà per il river", why: "Il {{t:pot|piatto}} cresce per moltiplicazione: dopo il flop contiene circa {{n:geo.spr2.flop-after}}, e una {{t:bet|puntata}} di circa {{n:geo.spr2.2}} al turn vale circa {{n:geo.spr2.turn}}, cioè il resto dello stack." }
      - { text: "Resta quasi tutto lo stack", why: "Con {{t:spr}} {{n:spr.commit}} lo stack vale solo {{n:spr.commit}} {{t:pot|piatti}}. Due {{t:bet|puntate}} di circa {{n:geo.spr2.2}} del {{t:pot|piatto}} mettono dentro tutti i {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Un buon piano inizia al flop, prima che tu faccia la prima {{t:bet|puntata}}. Chiediti: quante {{t:value|street di valore}} regge la mia mano e voglio giocare tutto lo stack? La risposta unisce la forza della mano all'{{t:spr}}.

## Quante {{t:value|street di valore}}

A ogni {{t:street}} le mani peggiori dell'avversario {{t:fold|foldano}}, e nel {{t:pot|piatto}} restano soprattutto mani migliori della tua. Per questo una mano più forte regge più {{t:bet|puntate}}:

| Mano | {{t:value|Street di valore}} (di solito) |
|---|---|
| Molto forte: set, {{t:straight|scala}}, {{t:two-pair|doppia coppia}} alta | Tre |
| {{t:top-pair}} con un buon kicker, {{t:overpair}} | Due; la terza se l'avversario paga con mani più deboli |
| {{t:pair|Coppia}} più debole (media, bassa) | Una o nessuna |

Il numero di {{t:street}} nella tabella è una semplificazione: molto dipende dalla {{t:texture}} del {{t:board}}, dalle carte di turn e river e dall'avversario.

## Collega la mano all'{{t:spr}}

- **Mano da tre {{t:street}}, la zona di {{t:spr}} permette di giocare per lo stack e vuoi tutto lo stack:** punti con la dimensione geometrica dal flop (in un {{t:pot|piatto}} 3-bettato {{t:in-position}} circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}}).
- **Mano da due {{t:street}} con {{t:spr}} basso:** con {{t:spr}} circa {{n:spr.commit}} due {{t:bet|puntate}} da circa {{n:geo.spr2.2}} del {{t:pot|piatto}} sono già tutto lo stack, quindi giochi per lo stack.
- **Mano da due {{t:street}} con {{t:spr}} alto:** in un {{t:pot|piatto}} con un solo rilancio ({{t:spr}} circa {{n:spr.srp}}) punti per valore, ma non pianifichi tutto lo stack.

Tre {{t:value|street di valore}} non sono la stessa cosa che giocare tutto lo stack. La {{t:two-pair|doppia coppia}} alta regge tre {{t:street}}, ma in un {{t:pot|piatto}} con un solo rilancio ({{t:spr}} circa {{n:spr.srp}}, sopra {{n:spr.zone.deep}}) di solito non gioca tutto lo stack: in questa zona giocano per lo stack set, {{t:straight|scala}} e mani migliori (zone di {{t:spr}} dalla prima lezione).

## Linee

Una linea è il piano delle azioni sulle {{t:street}} successive. Alcune di base:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** mano da tre {{t:value|street di valore}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** mano da due {{t:street}}, al river arrivi allo showdown,
- **{{t:bet}} o {{t:check}}, poi {{t:check}} e {{t:call|chiamata}}:** {{t:pair|coppia}} più debole che vuole arrivare allo showdown spendendo poco.

## La dimensione al flop fissa il resto

Il {{t:pot|piatto}} cresce per moltiplicazione, quindi una piccola {{t:bet|puntata}} al flop lascia un {{t:pot|piatto}} piccolo per le {{t:street}} successive. In un {{t:pot|piatto}} 3-bettato tre {{t:bet|puntate}} da 1/3 del {{t:pot|piatto}} mettono dentro solo circa {{n:g3b.third.total}} di uno stack da {{n:spr.3bet-ip.stack}}, mentre tre {{t:bet|puntate}} da circa {{n:geo.3bet-ip.3}} del {{t:pot|piatto}} mettono dentro tutto lo stack.

:::note Un piano non è una sentenza
Al turn e al river rivaluti il piano: una carta pericolosa può ridurre il numero di {{t:value|street di valore}}. Come giocare turn e river lo insegnano i moduli M7 e M8. Il numero di {{t:value|street di valore}} per le classi di mani è un'euristica, una sintesi di diversi materiali formativi: in un {{t:pot|piatto}} con un solo rilancio l'{{t:spr}} è troppo alto perché molte {{t:top-pair}} raccolgano comodamente tre {{t:value|street di valore}}.
:::
