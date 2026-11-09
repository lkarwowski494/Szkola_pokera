---
id: m4.l4
module: m4
order: 4
title: "Limper"
sub: "Isolation: Größe und Range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Ein Spieler vor dir hat nur den {{t:big-blind}} gecallt (Limp). Du willst vom Button {{t:raise|raisen}}. Auf wie viel?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Auf {{n:pf.iso.one-limper}}", correct: true, why: "Basis {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} pro Limper. Diese Größe nimmt dem Limper den guten Preis." }
      - { text: "Auf {{n:pf.min-raise}}", why: "Ein minimaler {{t:raise}} gibt dem Limper einen hervorragenden Preis und gewinnt fast nie sofort den {{t:pot}}." }
      - { text: "Auf {{n:pf.open-size}}, wie bei einem normalen {{t:open|Open}}", why: "Der Limper hat schon einen Blind gezahlt, also ist der {{t:pot}} größer. Der {{t:raise}} muss größer sein als ein normales {{t:open|Open}}." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Zwei Spieler vor dir haben nur den {{t:big-blind}} gecallt. Du willst aus dem {{t:cutoff|CO}} {{t:raise|raisen}}. Auf wie viel?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Auf {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} für jeden der beiden Limper." }
      - { text: "Auf {{n:pf.iso.one-limper}}", why: "Das ist die Größe gegen einen Limper. Jeder weitere fügt {{n:pf.iso.per-limper}} hinzu." }
      - { text: "Ich calle nur", why: "AQ suited ist eine Hand für einen {{t:raise}} {{t:value|auf Value}}. Mit dem Call gibst du die {{t:initiative|Initiative}} ab und lässt alle billig mitspielen." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Ein Spieler limpt, alle folden bis zu dir im {{t:small-blind|Small Blind}}. Du willst {{t:raise|raisen}}. Auf wie viel?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Auf {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Out of Position}} legst du noch {{n:pf.iso.oop-extra}} drauf: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} pro Limper plus {{n:pf.iso.oop-extra}}." }
      - { text: "Auf {{n:pf.iso.one-limper}}", why: "Das ist die Größe {{t:in-position}}. {{t:out-of-position|Out of Position}} {{t:raise|raist}} du etwas höher, damit der Gegner öfter {{t:fold|foldet}} oder mehr bezahlt." }
      - { text: "Ich calle nur", why: "Mit KK baust du immer den {{t:pot|Pot}} auf." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Ein Spieler vor dir hat nur den {{t:big-blind}} gecallt (Limp). Du bist am Button. Was machst du?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "Ich {{t:raise|raise}} auf {{n:pf.iso.one-limper}}", correct: true, why: "AJ ist eine Hand für eine {{t:isolation|Isolation}}: Sie dominiert viele Hände, mit denen ein schwächerer Spieler limpt, und nach dem Flop hast du {{t:position|Position}}. Größe: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} pro Limper." }
      - { text: "Ich {{t:raise|raise}} auf {{n:pf.min-raise}}", sizeError: true, why: "Richtige Aktion, aber ein minimaler {{t:raise}} gibt dem Limper einen hervorragenden Preis, sodass er fast nie {{t:fold|foldet}} und du nicht heads-up gegen ihn spielst. Du {{t:raise|raist}} auf {{n:pf.iso.one-limper}}." }
      - { text: "Ich calle", why: "Du gibst die {{t:initiative|Initiative}} ab und lässt die Blinds billig rein. Mit einer Hand, die den Limper dominiert, willst du den {{t:pot|Pot}} aufbauen." }
      - { text: "Ich {{t:fold|folde}}", why: "Zu tight: Gegen einen Limper {{t:isolation|isoliert}} der Button etwa {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} der Hände, und AJ liegt locker darin." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Drei Spieler vor dir haben nur den {{t:big-blind}} gecallt. Du bist am Button. Was machst du?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Ich calle", correct: true, why: "Gegen viele Limper sind suited {{t:connectors}} spekulative Hände: Du siehst den Flop billig {{t:in-position}} und kannst eine starke Hand treffen. Eine Quelle empfiehlt hier den Call; eine andere rät davon ab, daher werten wir auch einen {{t:fold}} als richtig." }
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Ebenfalls richtig: Eine Quelle rät, nicht zu callen, sondern zu {{t:raise|raisen}} oder zu {{t:fold|folden}}, und 76s ist keine Hand für einen {{t:raise}} {{t:value|auf Value}}. Eine andere Quelle empfiehlt den Call, daher werten wir beide Spielzüge als richtig." }
      - { text: "Ich {{t:raise|raise}} auf {{n:pf.iso.two-limpers}}", why: "Bei drei Limpern gewinnt ein {{t:raise}} als {{t:bluff}} selten den {{t:pot}}, und die Größe sollte noch höher sein. 76s ist keine Hand für einen {{t:raise}} {{t:value|auf Value}}." }
---
Ein Limp bedeutet, in die Hand einzusteigen, indem du nur den {{t:big-blind|Big Blind}} callst. Profis limpen selten als Erste (Regel aus Modul 3), daher sind Limper auf Mikrolimits meist schwächere Spieler. Einen {{t:raise|Raise}} gegen einen Limper nennt man {{t:isolation|Isolation}}: Du willst heads-up gegen ihn spielen, am besten {{t:in-position}}.

:::note Woher diese Regeln kommen
Der Solver der App spielt keine Limps, daher basiert diese Lektion auf Trainingsmaterial. Die Regeln sind als Heuristiken gekennzeichnet.
:::

## Größe der {{t:isolation|Isolation}}

Online {{t:raise|raist}} du auf {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} pro Limper: gegen einen auf {{n:pf.iso.one-limper}}, gegen zwei auf {{n:pf.iso.two-limpers}}. {{t:out-of-position|Out of Position}} legst du noch {{n:pf.iso.oop-extra}} drauf. Raise nie minimal: Der Limper bekäme einen hervorragenden Preis und würde fast nie {{t:fold|folden}}.

## {{t:range|Range}} der {{t:isolation|Isolation}}

Am Button {{t:isolation|isolierst}} du gegen einen Limper breit, etwa {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} der Hände: mittlere und hohe {{t:pair|Paare}}, suited Asse, starke offsuit Asse, hohe Karten und einen Teil der suited {{t:connectors|Connectors}}. Je früher die {{t:position}} und je mehr Limper, desto enger die {{t:range}}: Gegen drei Limper {{t:raise|raist}} du hauptsächlich {{t:value|auf Value}}.

Spekulative Hände wie kleine {{t:pair|Paare}} und suited {{t:connectors|Connectors}} kannst du gegen viele Limper {{t:in-position}} callen. Hier sind sich die Quellen uneinig: Eine empfiehlt den Call, die andere rät davon ab; in den Übungen werten wir beide Spielzüge als richtig, Call und {{t:fold}}.
