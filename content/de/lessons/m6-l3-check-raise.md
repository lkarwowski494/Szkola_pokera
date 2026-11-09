---
id: m6.l3
module: m6
order: 3
title: "Check-Raise"
sub: "Wann du eine C-Bet raist und auf wie viel"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Du verteidigst den {{t:big-blind|Big Blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-Raise", correct: true, why: "{{t:two-pair|Two Pair}} auf einem niedrigen, {{t:connected|verbundenen}} Flop ist eine Hand für {{t:value|Value}}. Auf solchen Flops hat der {{t:big-blind|Big Blind}} mehr der stärksten Kombinationen als der Button. Mit dem {{t:raise|Raise}} baust du den {{t:pot|Pot}} auf und lässt {{t:pair|Paare}} und {{t:draw|Draws}} bezahlen." }
      - { text: "{{t:call|Callen}}", correct: true, why: "Auch gut: Auf einem sehr {{t:connected|verbundenen}} Flop {{t:call|callt}} der Solver einen Teil seiner {{t:two-pair|Two Pairs}} nur. Ein Check-Raise baut den {{t:pot|Pot}} häufiger auf und schützt die Hand." }
      - { text: "{{t:fold|Folden}}", why: "{{t:two-pair|Two Pair}} ist eine der stärksten Hände auf diesem Flop. Ein {{t:fold|Fold}} ist ein großer Fehler." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, der Button {{t:bet|setzt}} eine C-Bet von {{n:ex.third.bet}}. Du hast ein Set und willst einen Check-Raise machen. Auf wie viel {{t:raise|raist}} du?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Auf {{n:xr.example}}", correct: true, why: "Das entspricht {{n:xr.mult.example}} der C-Bet. Der Button muss {{n:xr.example.extra}} nachlegen und braucht ca. {{n:eq.vs-xr.example}} Equity: Schlechtere {{t:pair|Paare}} und schwache {{t:draw|Draws}} (Gutshot) bekommen keinen passenden Preis, und {{t:flush|Flush}}-Draws und {{t:oesd|OESDs}} zahlen dann schon in einen großen {{t:pot|Pot}}." }
      - { text: "Auf {{n:xr.too-small}}", sizeError: true, why: "Richtige Aktion, aber zu kleine Größe: Der Button legt nur {{n:xr.too-small.extra}} nach und braucht ca. {{n:eq.vs-xr.too-small}} Equity. Jeder {{t:flush-draw|Flush Draw}} oder {{t:straight|Straight}}-Draw zahlt fast umsonst." }
      - { text: "{{t:call|Callen}}", why: "Auf einem Flop mit zwei Herz und Karten für eine {{t:straight|Straight}} verschenkst du Wert und Schutz: Viele Turnkarten stoppen die Action oder schlagen deine Hand. Ein Set will den {{t:pot|Pot}} sofort aufbauen." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, der Button {{t:bet|setzt}} eine C-Bet von {{n:ex.third.bet}}. Du machst einen Check-Raise auf {{n:xr.mult.example}} der C-Bet. Auf wie viel {{t:raise|raist}} du? Gib die Anzahl der {{t:chips|Chips}} ein."
    table: { position: BB }
    answer: xr.example
    explanation: "Die C-Bet beträgt {{n:ex.third.bet}}, also sind {{n:xr.mult.example}} der C-Bet {{n:xr.example}}. Die Größe eines Check-Raises berechnest du von der C-Bet aus, nicht vom {{t:pot|Pot}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Im {{t:pot|Pot}} waren {{n:ex.third.pot}}, der Button hat {{n:ex.third.bet}} {{t:bet|gesetzt}}, und du hast auf {{n:xr.example}} {{t:raise|geraist}}. Wie viel Prozent Equity braucht der Button, um zu {{t:call|callen}}? Gib die Zahl ein."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Der Button legt {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}} nach. Im {{t:pot|Pot}} sind dann {{n:xr.example.pot-after}}, und nach seinem {{t:call|Call}} {{n:xr.example.extra}} mehr. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Im {{t:pot|Pot}} waren {{n:ex.third.pot}}, der Button hat {{n:ex.third.bet}} {{t:bet|gesetzt}}, und du hast nur auf {{n:xr.too-small}} {{t:raise|geraist}}. Wie viel Equity braucht der Button, um zu {{t:call|callen}}?"
    table: { position: BB }
    options:
      - { text: "Ca. {{n:eq.vs-xr.too-small}}", correct: true, why: "Er legt {{n:xr.too-small.extra}} in einen {{t:pot|Pot}} von {{n:xr.too-small.pot-after}} nach: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. So billig zahlt er mit fast jeder Hand, deshalb soll dein {{t:raise|Raise}} mehrmals so groß sein wie die C-Bet." }
      - { text: "Ca. {{n:eq.vs-xr.example}}", why: "So viel bräuchte er bei einem {{t:raise|Raise}} auf {{n:xr.example}}. Bei {{n:xr.too-small}} legt er nur {{n:xr.too-small.extra}} nach." }
      - { text: "Ca. {{n:eq.bet-third}}", why: "So viel hast du gebraucht, um die C-Bet zu {{t:call|callen}}. Nach dem Check-Raise berechnest du den Preis des Buttons: Er legt {{n:xr.too-small.extra}} in einen {{t:pot|Pot}} von {{n:xr.too-small.pot-after}} nach." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Du verteidigst den {{t:big-blind|Big Blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-Raise", correct: true, why: "Ein {{t:draw|Draw}} auf den besten {{t:flush|Flush}} ist ein guter {{t:semi-bluff|Semi-Bluff}}: Du gewinnst, wenn der Button {{t:fold|foldet}}, und wenn er zahlt, hast du immer noch {{n:outs.flush}} Outs (ca. {{n:odds.flush.flop-turn}} auf dem Turn)." }
      - { text: "{{t:call|Callen}}", correct: true, why: "Auch gut: Den {{t:flush|Flush}} triffst du auf dem Turn in ca. {{n:odds.flush.flop-turn}} der Fälle, fast so viel wie der Preis von {{n:eq.bet-third}}, und wenn du den besten {{t:flush|Flush}} triffst, gewinnst du mehr (Implied Odds). Starke {{t:draw|Draws}} spielst du auf beide Arten, damit dein Check-Raise nicht nur starke Hände bedeutet." }
      - { text: "{{t:fold|Folden}}", why: "Großer Fehler: Mit {{n:outs.flush}} Outs triffst du den besten {{t:flush|Flush}} auf dem Turn in ca. {{n:odds.flush.flop-turn}} der Fälle, fast so viel wie der Preis von {{n:eq.bet-third}}, und wenn du triffst, gewinnst du mehr (Implied Odds). Außerdem kannst du einen Check-Raise machen." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Du verteidigst den {{t:big-blind|Big Blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-Raise", correct: true, why: "Ein {{t:oesd|OESD}} ({{n:outs.oesd}} Outs) gegen eine kleine C-Bet, die dir eine billige Gelegenheit zum {{t:raise|Raisen}} gibt. Mit dem {{t:raise|Raise}} kannst du sofort gewinnen, und wenn du einen {{t:call|Call}} bekommst, kannst du immer noch treffen." }
      - { text: "{{t:call|Callen}}", correct: true, why: "Auch gut: Die {{t:straight|Straight}} triffst du auf dem Turn in ca. {{n:odds.oesd.flop-turn}} der Fälle, etwas weniger als der Preis von {{n:eq.bet-third}}, aber wenn du triffst, gewinnst du mehr (Implied Odds), und wenn auf dem Turn niemand {{t:bet|setzt}}, siehst du auch den River umsonst. Einen Teil der starken {{t:draw|Draws}} {{t:call|callst}} du, damit deine {{t:call|Calls}} nicht nur schwach sind." }
      - { text: "{{t:fold|Folden}}", why: "Zu tight: Mit {{n:outs.oesd}} Outs triffst du die {{t:straight|Straight}} auf dem Turn in ca. {{n:odds.oesd.flop-turn}} der Fälle, nicht viel weniger als der Preis von {{n:eq.bet-third}}; den Rest liefern Implied Odds und die Chance auf einen kostenlosen River. Außerdem kannst du einen Check-Raise machen." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Du verteidigst den {{t:big-blind|Big Blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Callen}}", correct: true, why: "{{t:top-pair|Top Pair}} mit schwachem Kicker ist eine Hand zum {{t:call|Callen}}. Sie schlägt die {{t:bluff|Bluffs}} des Buttons, und mit dem {{t:call|Call}} hältst du sie im Spiel." }
      - { text: "Check-Raise", why: "Meist {{t:call|callst}} du. Nach einem {{t:raise|Raise}} zahlen dich vor allem bessere Hände und {{t:draw|Draws}}; ein Check-Raise mit so einer Hand ist ein seltener Solver-Spielzug gegen kleine C-Bets." }
      - { text: "{{t:fold|Folden}}", why: "{{t:top-pair|Top Pair}} gegen eine kleine C-Bet ist eindeutig zu stark zum {{t:fold|Folden}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Du verteidigst den {{t:big-blind|Big Blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Folden}}", correct: true, why: "Du hast weder ein {{t:pair|Paar}} noch einen {{t:flush-draw|Flush Draw}}; du hast nur einen schwachen Backdoor-{{t:straight-draw|Straight Draw}} (du brauchst zwei bestimmte Karten), und keine deiner Karten ist höher als das Board. Auf Flops mit einem Ass {{t:fold|foldest}} du mehr solcher Hände." }
      - { text: "Check-Raise als {{t:bluff|Bluff}}", why: "{{t:bluff|Bluffs}} als Check-Raise machst du vor allem mit {{t:draw|Draws}} ({{t:flush|Flush}}-Draws, {{t:oesd|OESDs}}), die auch gewinnen, wenn sie ankommen. Diese Hand hat nur einen schwachen Backdoor-{{t:draw|Draw}}, und der Button hat hier viele Asse und Könige, die nicht {{t:fold|folden}}." }
      - { text: "{{t:call|Callen}}", why: "Der Preis ist gut, aber diese Hand trifft fast nichts: Selbst ein {{t:pair|Paar}} Sechsen oder Fünfen verliert gegen die meisten Hände, mit denen der Button weiter zahlt." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Gegen welche C-Bet des Buttons machst du häufiger einen Check-Raise?"
    table: { position: BB }
    options:
      - { text: "1/4 {{t:pot|Pot}}", correct: true, why: "Eine kleine C-Bet gibt dir eine billige Gelegenheit zum {{t:raise|Raisen}}, und der Button {{t:bet|setzt}} sie mit einer breiten {{t:range|Range}} mit vielen schwachen Händen. Gegen eine große C-Bet {{t:raise|raist}} du seltener und enger: vor allem mit Sets und {{t:two-pair|Two Pair}}, mit weniger {{t:bluff|Bluffs}}." }
      - { text: "Voller {{t:pot|Pot}}", why: "Gegen eine große C-Bet kostet ein {{t:raise|Raise}} viel, und die {{t:range|Range}} des Buttons ist stärker. Du {{t:call|callst}} oder {{t:fold|foldest}} häufiger." }
      - { text: "Gleich oft", why: "Gegen kleine C-Bets {{t:raise|raist}} du häufiger und breiter; gegen große seltener, vor allem mit den stärksten Händen." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Du spielst gegen einen Button, der auf dem Flop fast nie {{t:fold|foldet}}. Er {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was machst du?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Callen}}", correct: true, why: "Ein Gutshot mit hoher Karte ist bei einem Preis von {{n:eq.bet-third}} ein guter {{t:call|Call}}. Ein Check-Raise als {{t:bluff|Bluff}} verdient an {{t:fold|Folds}}, und dieser Gegner {{t:fold|foldet}} fast nie, also verliert der {{t:raise|Raise}} seinen Hauptvorteil." }
      - { text: "Check-Raise", why: "{{t:bluff|Bluffs}} als Check-Raise machst du vor allem mit starken {{t:draw|Draws}}, und ein Gutshot gehört nicht dazu. Außerdem verdient ein {{t:bluff|Bluff}} an {{t:fold|Folds}}, und dieser Gegner {{t:fold|foldet}} fast nie: Gegen ihn {{t:raise|raist}} du vor allem für {{t:value|Value}}." }
      - { text: "{{t:fold|Folden}}", why: "Zu tight: Ein {{t:draw|Draw}} mit hoher Karte lässt sich bei so einem guten Preis verteidigen, egal gegen wen du spielst." }
---
Ein Check-Raise ist ein {{t:check|Check}} und danach ein {{t:raise|Raise}} auf die {{t:bet|Bet}} des Gegners. Aus dem {{t:big-blind|Big Blind}} ist er eine wichtige Waffe gegen C-Bets (meistens entscheidest du ohnehin zwischen {{t:call|Call}} und {{t:fold|Fold}}): Ohne ihn könnte der Button mit fast jeder Hand billig c-betten.

## Warum {{t:raise|raisen}}

Einen Check-Raise machst du aus zwei Gründen:

- **für {{t:value|Value}}**: Du hast eine sehr starke Hand ({{t:two-pair|Two Pair}}, Set) und willst den {{t:pot|Pot}} aufbauen,
- **als {{t:semi-bluff|Semi-Bluff}}**: Du hast einen {{t:draw|Draw}} ({{t:flush|Flush}}, {{t:oesd|OESD}}), der auf zwei Arten gewinnt: wenn der Button {{t:fold|foldet}} oder wenn du triffst.

Mittlere Hände, z. B. {{t:top-pair|Top Pair}} mit schwachem Kicker, {{t:call|callst}} du meistens: Nach einem {{t:raise|Raise}} {{t:fold|folden}} die schlechteren Hände des Buttons häufiger, und die besseren zahlen. Das ist eine Vereinfachung: Gegen kleine C-Bets {{t:raise|raist}} der Solver auch einen Teil seiner {{t:top-pair|Top Pairs}} und schwachen {{t:pair|Paare}} zum Schutz. Umgekehrt {{t:call|callt}} der Solver {{t:two-pair|Two Pair}} auf einem sehr {{t:connected|verbundenen}} Flop oft nur.

## Wann häufiger

- **Gegen eine kleine C-Bet.** Ein {{t:raise|Raise}} ist billig, und der Button {{t:bet|setzt}} eine kleine C-Bet mit einer breiten {{t:range|Range}}. Gegen eine große C-Bet {{t:raise|raist}} du seltener und enger: vor allem mit Sets und {{t:two-pair|Two Pair}}, mit weniger {{t:bluff|Bluffs}}.
- **Auf niedrigen, {{t:connected|verbundenen}} Flops** (z. B. [[7h 6d 5s]]). Der {{t:big-blind|Big Blind}} verteidigt viele niedrige Hände und hat hier daher meist mehr {{t:two-pair|Two Pairs}} und {{t:straight|Straights}} als der Button, also einen {{t:nuts-advantage|Nuts-Vorteil}}.
- **Seltener auf hohen Flops, die dem Button liegen**, z. B. K-J-T oder A-A-K: Dort hat er mehr der stärksten Hände.

## Welche Größe

Die Größe eines Check-Raises berechnest du von der C-Bet aus. Beispiel: Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, die C-Bet beträgt {{n:ex.third.bet}}. Ein Check-Raise auf {{n:xr.mult.example}} der C-Bet ist ein {{t:raise|Raise}} auf {{n:xr.example}}: Der Button legt {{n:xr.example.extra}} nach und braucht ca. **{{n:eq.vs-xr.example}}** Equity. Ein {{t:raise|Raise}} auf nur {{n:xr.too-small}} gibt ihm einen Preis von ca. **{{n:eq.vs-xr.too-small}}**: Er zahlt mit fast jeder Hand, die irgendeinen {{t:draw|Draw}} hat. Deshalb {{t:raise|raist}} du auf ca. {{n:xr.mult.low}}–{{n:xr.mult.example}} der C-Bet, umso mehr, je kleiner die C-Bet ist, und nicht minimal.

:::note Ein Gegner, der nicht {{t:fold|foldet}}
Ein {{t:bluff|Bluff}} als Check-Raise verdient an {{t:fold|Folds}} (denk an Alpha aus der ersten Lektion). Gegen einen Spieler, der auf dem Flop fast nie {{t:fold|foldet}}, {{t:raise|raist}} du vor allem für {{t:value|Value}} und hebst dir {{t:bluff|Bluffs}} für die stärksten {{t:draw|Draws}} auf.
:::
