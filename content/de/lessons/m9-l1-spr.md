---
id: m9.l1
module: m9
order: 1
title: "SPR: Stack zu Pot"
sub: "Wie viel Geld hinter dem Pot liegt"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}, Stacks je {{n:format.stack}}. Auf dem Flop liegen {{n:bb.pot-after.vs-btn}} im {{t:pot}}, und dir bleiben noch {{n:spr.srp.stack}}. Wie hoch ist die {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ca. {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Der Stack hinter dem {{t:pot}} ist über zehnmal so groß wie der {{t:pot}}: eine typische {{t:spr}} nach {{t:open|Eröffnung}} und {{t:call}}." }
      - { text: "Ca. {{n:spr.srp.wrong-full}}", why: "Das ergibt sich aus dem ganzen Stack von {{n:format.stack}}. Deine {{n:pf.open-size}} sind schon im {{t:pot}}, also zählst du nur, was übrig ist: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Ca. {{n:spr.3bet-ip}}", why: "So hoch ist die {{t:spr}} nach einer 3-Bet und einem {{t:call}}. In einem {{t:pot}} mit nur einem Raise ist der {{t:pot}} viel kleiner, daher liegt die {{t:spr}} bei ca. {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Der {{t:cutoff|CO}} hat auf {{n:pf.open-size}} {{t:open|eröffnet}}, du hast vom Button auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}} (3-Bet), der {{t:cutoff|CO}} hat {{t:call|gecallt}}, die Blinds haben {{t:fold|gefoldet}}. Auf dem Flop liegen {{n:vs3bet.pot-after}} im {{t:pot}}, und dir bleiben {{n:spr.3bet-ip.stack}}. Wie hoch ist die {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ca. {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Nach einer 3-Bet ist der {{t:pot}} dreimal so groß wie nach einer normalen {{t:open|Eröffnung}}, daher fällt die {{t:spr}} von ca. {{n:spr.srp}} auf ca. {{n:spr.3bet-ip}}." }
      - { text: "Ca. {{n:spr.3bet-ip.wrong-full}}", why: "Das ergibt sich aus dem ganzen Stack von {{n:format.stack}}. Deine 3-Bet über {{n:pf.3bet.ip-total}} ist schon im {{t:pot}}, also teilst du nur, was übrig ist: {{n:spr.3bet-ip.stack}}." }
      - { text: "Ca. {{n:spr.srp}}", why: "Das ist die {{t:spr}} in einem {{t:pot}} mit nur einem Raise. Nach einer 3-Bet ist der {{t:pot}} viel größer und der Stack dahinter kleiner, daher fällt die {{t:spr}} auf ca. {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Der Button hat {{t:open|eröffnet}}, du hast aus dem {{t:big-blind}} auf {{n:pf.3bet.oop-total}} {{t:raise|geraist}} (3-Bet), der Button hat {{t:call|gecallt}}. Auf dem Flop liegen {{n:spr.3bet-oop.pot}} im {{t:pot}}, dir bleiben {{n:spr.3bet-oop.stack}}. Wie hoch ist die {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Ca. {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Out of Position}} ist die 3-Bet größer, daher wächst der {{t:pot}} stärker und die {{t:spr}} ist niedriger als nach einer 3-Bet {{t:in-position}} ({{n:spr.3bet-ip}})." }
      - { text: "Ca. {{n:spr.3bet-ip}}", why: "Das ist die {{t:spr}} nach einer 3-Bet {{t:in-position}} auf {{n:pf.3bet.ip-total}}. Deine 3-Bet auf {{n:pf.3bet.oop-total}} macht den {{t:pot}} größer, daher ist die {{t:spr}} niedriger: ca. {{n:spr.3bet-oop}}." }
      - { text: "Ca. {{n:spr.4bet}}", why: "So niedrig wird die {{t:spr}} erst durch eine 4-Bet. Nach einer 3-Bet auf {{n:pf.3bet.oop-total}} kommt ca. {{n:spr.3bet-oop}} heraus." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks je {{n:format.stack}}. In welchem {{t:pot}} ist die {{t:spr}} auf dem Flop am niedrigsten?"
    options:
      - { text: "Im {{t:pot}} nach 4-Bet und {{t:call}}", correct: true, why: "Ja: Wenn der Button auf die 3-Bet des {{t:small-blind|Small Blinds}} auf {{n:pf.4bet.example.low}} 4-bettet, der {{t:small-blind}} {{t:call|callt}} und der {{t:big-blind}} {{t:fold|gefoldet}} hat, liegen {{n:spr.4bet.pot}} im {{t:pot}} und dahinter nur {{n:spr.4bet.stack}}. Die {{t:spr}} liegt bei ca. {{n:spr.4bet}}." }
      - { text: "Im {{t:pot}} nach 3-Bet und {{t:call}}", why: "Nach einer 3-Bet liegt die {{t:spr}} bei ca. {{n:spr.3bet-ip}} {{t:in-position}} und bei ca. {{n:spr.3bet-oop}} {{t:out-of-position}}. Eine 4-Bet senkt sie noch weiter: auf ca. {{n:spr.4bet}}." }
      - { text: "Im {{t:pot}} mit nur einem Raise", why: "Umgekehrt: Hier ist die {{t:spr}} am höchsten, ca. {{n:spr.srp}}, weil der {{t:pot}} auf dem Flop klein ist." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Warum ist die {{t:spr}} auf dem Flop nach einer 3-Bet viel niedriger als nach einer normalen {{t:open|Eröffnung}}?"
    options:
      - { text: "Der {{t:pot}} wird um ein Mehrfaches größer, der Stack dahinter schrumpft nur wenig", correct: true, why: "Ja: Der {{t:pot}} wächst von {{n:bb.pot-after.vs-btn}} auf {{n:vs3bet.pot-after}}, der Stack dahinter fällt nur von {{n:spr.srp.stack}} auf {{n:spr.3bet-ip.stack}}. Der Quotient fällt von ca. {{n:spr.srp}} auf ca. {{n:spr.3bet-ip}}." }
      - { text: "Weil die Spieler nach einer 3-Bet kleinere Stacks haben", why: "Nur etwas kleinere: {{n:spr.3bet-ip.stack}} statt {{n:spr.srp.stack}}. Entscheidend für den Rückgang der {{t:spr}} ist, dass der {{t:pot}} dreimal so groß ist." }
      - { text: "Weil eine 3-Bet dir {{t:position}} verschafft", why: "{{t:position|Position}} hängt vom Platz am Tisch ab, nicht von der 3-Bet. Die {{t:spr}} ist nur der Stack hinter dem {{t:pot}} geteilt durch den {{t:pot}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}} und hast {{n:format.stack}}. Der {{t:big-blind}} hat nur {{n:spr.short.stack}} und {{t:call|callt}}. {{t:pot}} auf dem Flop: {{n:bb.pot-after.vs-btn}}. Wie hoch ist die {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ca. {{n:spr.short}}", correct: true, why: "Du rechnest mit dem {{t:effective-stack|effektiven Stack}}, also dem kleineren der beiden: Deinem Gegner bleiben {{n:spr.short.behind}}, also {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Über das hinaus, was schon im {{t:pot}} liegt, kann jeder von euch höchstens noch {{n:spr.short.behind}} einzahlen." }
      - { text: "Ca. {{n:spr.srp}}", why: "So wäre es, wenn dein Gegner auch {{n:format.stack}} hätte. Spielen könnt ihr nur um den kleineren Stack, daher liegt die {{t:spr}} bei ca. {{n:spr.short}}." }
      - { text: "Lässt sich nicht berechnen, weil die Stacks verschieden sind", why: "Doch: Du nimmst den kleineren Stack (den effektiven). Deinem Gegner bleiben {{n:spr.short.behind}}, also ist die {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Wann berechnest du die {{t:spr}}, die dir sagt, wie du die Hand nach dem Flop spielst?"
    options:
      - { text: "Auf dem Flop, bevor jemand eine {{t:bet}} setzt", correct: true, why: "Ja: Die {{t:spr}} kannst du auf jeder {{t:street}} berechnen (in M7 hast du sie auf dem Turn berechnet), aber für deinen Plan für die Hand nimmst du den Stack hinter dem {{t:pot}} geteilt durch den {{t:pot}} zu Beginn des Flops. Dann weißt du, wie viele {{t:pot|Pots}} auf drei {{t:street|Streets}} noch zu spielen sind." }
      - { text: "Vor der Hand, bevor jemand {{t:raise|raist}}", why: "Vor dem Flop weißt du noch nicht, wie groß der {{t:pot}} wird. Die {{t:spr}} hängt gerade davon ab, was vor dem Flop passiert ist: nach einer {{t:open|Eröffnung}} ca. {{n:spr.srp}}, nach einer 3-Bet ca. {{n:spr.3bet-ip}}." }
      - { text: "Auf dem River, vor der letzten {{t:bet}}", why: "Auf dem River bleibt nur eine Entscheidung. Die {{t:spr}} lässt sich auch dort berechnen, aber für den Plan für die Hand ist die {{t:spr}} vom Flop am nützlichsten, weil sie alle drei {{t:street|Streets}} umfasst." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Du hast vom Button {{t:raise|geraist}} (3-Bet), der {{t:cutoff|CO}} hat {{t:call|gecallt}}. Die {{t:spr}} auf dem Flop liegt bei ca. {{n:spr.3bet-ip}}. Du hast {{t:top-pair}} mit gutem Kicker getroffen. Wie behandelst du diese Hand?"
    table: { position: BTN }
    options:
      - { text: "Als Grenzhand: Du spielst sie auf {{t:value}}, {{t:call|callst}} das All-in des Gegners aber nicht immer", correct: true, why: "Eine {{t:spr}} von ca. {{n:spr.3bet-ip}} liegt in der Zone von {{n:spr.zone.low}} bis {{n:spr.zone.mid}}, in der {{t:top-pair}} eine Grenzhand ist. Ob du um den ganzen Stack spielst, hängt davon ab, wie dein Gegner spielt und wie das {{t:board}} aussieht." }
      - { text: "Du spielst immer um den ganzen Stack", why: "Das gilt meist erst bei einer {{t:spr}} unter ca. {{n:spr.zone.low}}, z. B. nach einer 4-Bet (ca. {{n:spr.4bet}}). Bei einer {{t:spr}} von ca. {{n:spr.3bet-ip}} braucht es mehr {{t:bet|Bets}} bis zum All-in, und bis zum Ende zahlen vor allem stärkere Hände." }
      - { text: "Du spielst vorsichtig wie bei einer sehr hohen {{t:spr}}", why: "So vorsichtig spielst du {{t:top-pair}} oberhalb von ca. {{n:spr.zone.deep}}, z. B. in einem {{t:pot}} mit nur einem Raise (ca. {{n:spr.srp}}). Nach einer 3-Bet ist die {{t:spr}} viel niedriger." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. Im {{t:pot}} liegen {{n:ex.pot}}, dein Gegner geht für {{n:commit.stack}} all-in ({{t:spr}} {{n:spr.commit}}). Wie viel Equity brauchst du für einen {{t:call}}? Gib die Zahl in Prozent ein."
    answer: eq.jam.spr2
    explanation: "Du zahlst {{n:commit.stack}} nach, und der {{t:pot}} nach dem {{t:call}} beträgt {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Benötigte Equity = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Auf dem Flop geht dein Gegner mit seinem ganzen Stack all-in ({{n:format.stack}} zu Beginn der Hand). In welchem {{t:pot}} brauchst du für einen {{t:call}} am wenigsten Equity?"
    options:
      - { text: "Nach einer 4-Bet: ca. {{n:eq.jam.4bet}}", correct: true, why: "Bei einer {{t:spr}} von ca. {{n:spr.4bet}} zahlst du {{n:spr.4bet.stack}} nach, um den {{t:pot}} von {{n:spr.4bet.pot}} und den Stack des Gegners zu gewinnen. Je niedriger die {{t:spr}}, desto besser der Preis." }
      - { text: "Nach einer 3-Bet: ca. {{n:eq.jam.3bet-ip}}", why: "Nach einer 3-Bet {{t:in-position}} brauchst du ca. {{n:eq.jam.3bet-ip}}. Nach einer 4-Bet ist der {{t:pot}} im Verhältnis zum Stack größer, daher reichen ca. {{n:eq.jam.4bet}}." }
      - { text: "Nach {{t:open|Eröffnung}} und {{t:call}}: ca. {{n:eq.jam.srp}}", why: "Das ist der schlechteste Preis der drei: Bei einer {{t:spr}} von ca. {{n:spr.srp}} zahlst du {{n:spr.srp.stack}} nach, um den kleinen {{t:pot}} von {{n:bb.pot-after.vs-btn}} und den Stack des Gegners zu gewinnen." }
---
Vor dem Flop entscheidest du, wie viel Geld in den {{t:pot}} kommt. Nach dem Flop zählt, wie viel dahinter noch übrig ist. Eine Zahl verbindet beides: die {{t:spr}}.

## Was ist die {{t:spr}}

Die {{t:spr}} (engl. stack-to-pot ratio) ist das Verhältnis von Stack zu {{t:pot}} zu Beginn einer {{t:street}}. Du kannst sie auf jeder {{t:street}} berechnen (in M7 hast du sie auf dem Turn berechnet), aber für deinen Plan für die Hand nimmst du die {{t:spr}} vom Flop, bevor jemand eine {{t:bet}} setzt.

```formula
SPR = effektiver Stack ÷ Pot auf dem Flop
```

Der {{t:effective-stack|effektive Stack}} ist der kleinere der beiden Stacks, ohne das, was schon im {{t:pot}} liegt. So viel kann jeder Spieler höchstens noch in den {{t:pot}} einzahlen: Über den {{t:pot}} hinaus gewinnst du vom Gegner nicht mehr als den {{t:effective-stack|effektiven Stack}}, und so viel kannst du höchstens noch verlieren.

Beispiel: Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Der {{t:pot}} auf dem Flop beträgt {{n:bb.pot-after.vs-btn}}, dir bleiben {{n:spr.srp.stack}}. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Preflop bestimmt die {{t:spr}}

Jeder {{t:raise}} vor dem Flop macht den {{t:pot}} um ein Mehrfaches größer, während der Stack dahinter viel langsamer schrumpft. Deshalb hängt die {{t:spr}} stark davon ab, was vor dem Flop passiert ist.

| {{t:pot}} (Stacks {{n:format.stack}}) | {{t:pot}} auf dem Flop | Stack hinter dem {{t:pot}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Eröffnung}} und {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-Bet {{t:in-position}} und {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-Bet aus dem {{t:big-blind}} und {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-Bet des Buttons auf eine 3-Bet des {{t:small-blind|Small Blinds}} und {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## {{t:spr}}-Zonen

Die {{t:spr}}-Zonen bestimmst du anhand der {{t:spr}} auf dem Flop. Je höher die {{t:spr}}, desto stärker muss deine Hand sein, damit du um den ganzen Stack spielst:

| {{t:spr}} | Womit du meist um den ganzen Stack spielst |
|---|---|
| unter {{n:spr.zone.low}} | {{t:top-pair}} und besser |
| von {{n:spr.zone.low}} bis {{n:spr.zone.mid}} | {{t:top-pair}} ist eine Grenzhand |
| von {{n:spr.zone.mid}} bis {{n:spr.zone.deep}} | hohe {{t:two-pair|zwei Paare}} und besser |
| über {{n:spr.zone.deep}} | Set, {{t:straight}} und besser |

Nach {{t:open|Eröffnung}} und {{t:call}} ({{t:spr}} ca. {{n:spr.srp}}) bist du in der höchsten Zone, nach einer 3-Bet (ca. {{n:spr.3bet-ip}}) in der Zone, in der {{t:top-pair}} eine Grenzhand ist, und nach einer 4-Bet (ca. {{n:spr.4bet}}) in der niedrigsten. Die Schwellen sind eine Vereinfachung. Quellen teilen die Zonen unterschiedlich ein, sind sich aber einig, dass {{t:top-pair}} unter ca. {{n:spr.zone.low}} um den Stack spielt und ein einzelnes {{t:pair}} bei höherer {{t:spr}} immer seltener. Die Grenze {{n:spr.zone.mid}} ist eine in der App festgelegte Konvention. Die Schwelle {{n:spr.zone.deep}} ergibt sich aus der Rechnung: Bei einer {{t:spr}} von {{n:spr.zone.deep}} bringen dich drei {{t:bet|Bets}} in Größe des {{t:pot|Pots}} all-in.

## Niedrige {{t:spr}}: besserer Preis für ein All-in

Wenn dein Gegner mit seinem ganzen Stack all-in geht, zahlst du deinen Stack nach, um den {{t:pot}} und seinen Stack zu gewinnen. Benötigte Equity = Stack ÷ ({{t:pot}} + 2·Stack). Bei einer {{t:spr}} von {{n:spr.commit}} sind das {{n:eq.jam.spr2}}, nach einer 4-Bet ca. {{n:eq.jam.4bet}}, nach einer 3-Bet ca. {{n:eq.jam.3bet-ip}} und in einem {{t:pot}} mit nur einem Raise schon ca. {{n:eq.jam.srp}}.

Je niedriger die {{t:spr}}, desto weniger Geld bleibt zu spielen und desto leichter zahlst du den ganzen Stack ein. Je höher sie ist, desto mehr {{t:street|Streets}} und {{t:bet|Bets}} bleiben, bevor der Stack im {{t:pot}} landet.

:::note Woher diese Zahlen stammen
Die {{t:pot|Pots}} und Stacks stammen aus den Größen im Modul zum Spiel vor dem Flop ({{t:open|Eröffnung}} auf {{n:pf.open-size}}, 3-Bet auf {{n:pf.3bet.ip-total}} oder {{n:pf.3bet.oop-total}}, 4-Bet auf {{n:pf.4bet.example.low}}). Der {{t:pot}} nach der 4-Bet ist ein Szenario: Der Button 4-bettet die 3-Bet des {{t:small-blind|Small Blinds}}, der {{t:small-blind}} {{t:call|callt}}, und der {{t:big-blind}} hat {{t:fold|gefoldet}}, sein Blind bleibt im {{t:pot}}. Eine andere Größe ergibt eine etwas andere {{t:spr}}, aber die Reihenfolge ist immer gleich: Je mehr {{t:raise|Raises}} vor dem Flop, desto niedriger die {{t:spr}}.
:::
