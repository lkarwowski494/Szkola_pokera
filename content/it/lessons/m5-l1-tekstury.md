---
id: m5.l1
module: m5
order: 1
title: "Texture del flop"
sub: "Altezza, semi, connessione"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Quale di questi flop è {{t:connected|connesso}}, cioè su quale una {{t:straight|scala}} è già possibile adesso?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Sì: nove, sette e sei stanno entro cinque valori consecutivi. Fanno {{t:straight|scala}}, ad es., 85 o T8." }
      - { text: "[[Ks 8d 3c]]", why: "No: dal tre al re c'è troppa distanza. Qui nessuna combinazione di due carte fa {{t:straight|scala}}." }
      - { text: "[[Qd Qs 9h]]", why: "No: il flop è {{t:paired|accoppiato}}. Con due carte in mano e una {{t:pair|coppia}} sul {{t:board|board}} la {{t:straight|scala}} è impossibile, perché per la {{t:straight|scala}} servono cinque valori diversi." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Il flop è {{t:monotone|monocolore}}: tutte e tre le carte sono dello stesso seme. Che cosa significa?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Un giocatore con due carte di quel seme ha già {{t:flush|colore}}", correct: true, why: "Sì: tre carte di cuori sul {{t:board|board}} e due in mano fanno cinque carte dello stesso seme. Un giocatore con una sola carta di cuori ha un {{t:flush-draw|progetto di colore}}." }
      - { text: "Nessuno può ancora avere {{t:flush|colore}}", why: "No: per il {{t:flush|colore}} servono cinque carte, e tre sono già sul {{t:board|board}}. Ne bastano due in mano." }
      - { text: "Il {{t:flush|colore}} è possibile solo dal turn", why: "No: questo vale sul flop {{t:two-tone|bicolore}}. Su quello {{t:monotone|monocolore}} il {{t:flush|colore}} può essere già fatto adesso." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Hai [[Ac Kd]] e il flop è [[Ks 7d 2c]]. Perché su un flop così una {{t:pair|coppia}} con un buon kicker è più sicura che su un flop {{t:wet|bagnato}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Perché il rivale non ha nessun {{t:draw|progetto}}, quindi le carte successive cambiano raramente chi è in testa", correct: true, why: "Sì: il flop è {{t:rainbow|rainbow}} e la {{t:straight|scala}} non è possibile. Un rivale che ora è dietro di solito ha pochi out: qualche carta per il {{t:three-of-a-kind|tris}} o la {{t:two-pair|doppia coppia}}, e senza {{t:pair|coppia}} gli servono due buone carte di fila." }
      - { text: "Perché su un flop {{t:dry|secco}} il rivale {{t:fold|folda}} sempre", why: "No: un rivale con un sette, un due o un re più debole può {{t:call|chiamare}}. Un flop {{t:dry|secco}} ti dice qualcosa sui {{t:draw|progetti}}, non se il rivale {{t:fold|folderà}}." }
      - { text: "Perché una {{t:pair|coppia}} di re resta sempre davanti fino al river", why: "No: il rivale può avere già un set o una {{t:two-pair|doppia coppia}}. Un flop {{t:dry|secco}} riduce solo il rischio che qualcuno ti raggiunga." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Dopo il flop ogni giocatore vede già cinque delle sue sette carte. Il modo in cui le tre carte sul {{t:board|board}} si adattano alle mani dei giocatori si chiama {{t:texture|texture}} del flop. Dalla {{t:texture|texture}} dipende chi colpisce più spesso e se conviene puntare. Prima di imparare la c-bet (una {{t:bet|puntata}} al flop dopo un {{t:raise|rilancio}} prima del flop), impara a leggere il flop su quattro assi.

## Altezza

Guardiamo la carta più alta. Un flop **alto** ha come carta più alta un asso, un re o una donna, ad es. [[Ks 7d 2c]]. Un flop **medio** ha come carta più alta un jack o un dieci, ad es. [[Jh 8c 4d]]. Un flop **basso** ha come carta più alta un nove o meno, ad es. [[7s 6h 5d]].

## Semi

Un flop **{{t:rainbow|rainbow}}** ha tre semi diversi: nessuno ha ancora un {{t:flush-draw|progetto di colore}}. Un flop **{{t:two-tone|bicolore}}** ha due carte dello stesso seme, ad es. [[Jh Th 8c]]: due carte del giocatore di quel seme danno un {{t:flush-draw|progetto di colore}}. Un flop **{{t:monotone|monocolore}}** ha tutte e tre le carte dello stesso seme, ad es. [[Kh 8h 3h]]: il {{t:flush|colore}} può essere già fatto.

## Valori

Un flop **{{t:paired|accoppiato}}** ha due carte dello stesso valore, ad es. [[Qd Qs 6h]]. Su di esso nessuno ha {{t:straight|scala}} con due carte in mano, anche se a volte è possibile un {{t:straight-draw|progetto di scala}} (ad es. su Q-Q-9).

Un flop **{{t:connected|connesso}}** ha tre valori diversi entro cinque consecutivi, quindi la {{t:straight|scala}} è già possibile adesso: su [[9h 7d 6c]] fanno {{t:straight|scala}}, ad es., 85 e T8. L'asso conta anche come uno, quindi anche [[Ah 5d 3c]] è {{t:connected|connesso}}.

Un flop **{{t:semi-connected|semi-connesso}}** ha solo due delle sue carte entro cinque valori consecutivi. Nessuno ha ancora {{t:straight|scala}}, ma qualcuno può avere un {{t:straight-draw|progetto di scala}} (bilaterale o gutshot): su [[Kh Qd 4c]] ce l'ha, ad es., JT. Questi flop sono frequenti, perché bastano due carte vicine.

Un flop **{{t:disconnected|sconnesso}}** ha carte così distanti che nessuna combinazione di due sta entro cinque valori consecutivi, ad es. [[Ks 8d 3c]]. Qui nessuno ha nemmeno un {{t:straight-draw|progetto di scala}}. Questi flop sono pochi.

## {{t:dry|Secco}} o {{t:wet|bagnato}}

Contiamo i punti di {{t:wetness|umidità}}, cioè quanto il flop favorisce i {{t:draw|progetti}} e le mani forti a colore e a {{t:straight|scala}}:

- {{t:straight|scala}} già possibile in più modi, cioè con almeno due diverse combinazioni di due valori in mano (su [[9h 8d 7c]] la fanno JT, T6 e 65): {{n:tex.points.straight.made}} pt,
- {{t:straight|scala}} possibile in un solo modo (su [[Ah Kd Tc]] la fa solo QJ, su [[Ah 4d 2c]] solo 53): {{n:tex.points.straight.made-one}} pt,
- solo un {{t:straight-draw|progetto di scala}} (flop {{t:semi-connected|semi-connesso}} o {{t:paired|accoppiato}} con due carte vicine): {{n:tex.points.straight.draw}} pt,
- due carte dello stesso seme: {{n:tex.points.suits.two-tone}} pt; tre carte dello stesso seme: {{n:tex.points.suits.monotone}} pt.

Un flop **{{t:dry|secco}}** ha meno di {{n:tex.threshold.medium}} pt, uno **{{t:wet|bagnato}}** almeno {{n:tex.threshold.wet}} pt, e uno **intermedio** sta in mezzo.

| Flop | Semi | {{t:straight|Scala}} | Totale | {{t:texture|Texture}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|secco}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|secco}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|secco}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|secco}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | intermedio |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | intermedio |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|bagnato}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|bagnato}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|bagnato}} |

Una {{t:straight|scala}} fatta pesa più di un semplice {{t:draw|progetto}}, perché cambia i rapporti di forza già adesso. Una {{t:straight|scala}} possibile in più modi pesa più di una {{t:straight|scala}} possibile in un solo modo: su [[9h 8d 7c]] molte mani hanno {{t:straight|scala}} o un {{t:oesd|progetto di scala bilaterale}}, mentre su [[Ah Kd Tc]] la {{t:straight|scala}} la fa solo QJ e nessuno ha un {{t:draw|progetto}} bilaterale. Per questo A-K-T di tre semi è intermedio, anche se è {{t:connected|connesso}}.

Il flop {{t:two-tone|bicolore}} [[Kh 7h 2c]] è un flop {{t:dry|secco}} con un {{t:flush-draw|progetto di colore}}: non ci sono né {{t:straight|scala}} né {{t:straight-draw|progetto di scala}}. Un flop {{t:monotone|monocolore}} è sempre {{t:wet|bagnato}}: su [[Kh 8h 3h]] hanno {{t:flush|colore}} o {{t:flush-draw|progetto di colore}} più mani di quante abbiano {{t:straight|scala}} o {{t:oesd|progetto di scala bilaterale}} su [[9h 8d 7c]].

Su un flop {{t:dry|secco}} chi è in testa di solito resta in testa fino al river. Su uno {{t:wet|bagnato}} le carte successive cambiano spesso i rapporti di forza, quindi la mano migliore al flop è meno sicura.

:::note Da dove vengono queste definizioni
I concetti di {{t:dry|secco}} e {{t:wet|bagnato}} vengono dalla letteratura sul poker: come flop {{t:dry|secchi}} i materiali didattici citano ad es. K-7-2, A-9-4 e A-A-6 di tre semi, come {{t:wet|bagnati}} 9-8-7, Q-J-T e T-9-5-4. I punti e i confini esatti, ad es. che il flop medio inizia dal dieci, sono una convenzione adottata nell'app perché ogni flop si possa valutare in modo univoco. Le fonti non danno soglie di punteggio e non stabiliscono come chiamare i flop né {{t:dry|secchi}} né {{t:wet|bagnati}}. Secondo questa convenzione, i flop {{t:dry|secchi}} sono circa il {{n:tex.share.dry}} di tutti i flop, quelli intermedi circa il {{n:tex.share.medium}} e quelli {{t:wet|bagnati}} circa il {{n:tex.share.wet}}; è un risultato delle definizioni dell'app, non un dato della letteratura.
:::
