---
id: m9.l1
module: m9
order: 1
title: "SPR: stack do puli"
sub: "Ile pieniędzy zostało za pulą"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Otworzyłeś}} z Buttona do {{n:pf.open-size}}, {{t:big-blind}} {{t:call|sprawdził}}, stacki po {{n:format.stack}}. Na flopie w {{t:pot|puli}} jest {{n:bb.pot-after.vs-btn}}, a za tobą zostało {{n:spr.srp.stack}}. Ile wynosi {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Stack za {{t:pot|pulą}} jest kilkanaście razy większy niż {{t:pot}}: to typowy {{t:spr}} po {{t:open|otwarciu}} i {{t:call|sprawdzeniu}}." }
      - { text: "Ok. {{n:spr.srp.wrong-full}}", why: "Tak wychodzi z całego stacku {{n:format.stack}}. Twoje {{n:pf.open-size}} jest już w {{t:pot|puli}}, więc liczysz tylko to, co zostało: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Ok. {{n:spr.3bet-ip}}", why: "Tyle wynosi {{t:spr}} po 3-becie i {{t:call|sprawdzeniu}}. W {{t:pot|puli}} z jednym podbiciem {{t:pot}} jest dużo mniejsza, więc {{t:spr}} wynosi ok. {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:cutoff|CO}} {{t:open|otworzył}} do {{n:pf.open-size}}, ty z Buttona {{t:raise|przebiłeś}} (3-bet) do {{n:pf.3bet.ip-total}}, {{t:cutoff|CO}} {{t:call|sprawdził}}, blindy {{t:fold|spasowały}}. Na flopie w {{t:pot|puli}} jest {{n:vs3bet.pot-after}}, a za tobą {{n:spr.3bet-ip.stack}}. Ile wynosi {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Po 3-becie {{t:pot}} jest trzy razy większa niż po zwykłym {{t:open|otwarciu}}, więc {{t:spr}} spada z ok. {{n:spr.srp}} do ok. {{n:spr.3bet-ip}}." }
      - { text: "Ok. {{n:spr.3bet-ip.wrong-full}}", why: "Tak wychodzi z całego stacku {{n:format.stack}}. Twój 3-bet za {{n:pf.3bet.ip-total}} jest już w {{t:pot|puli}}, więc dzielisz tylko to, co zostało: {{n:spr.3bet-ip.stack}}." }
      - { text: "Ok. {{n:spr.srp}}", why: "To {{t:spr}} w {{t:pot|puli}} z jednym podbiciem. Po 3-becie {{t:pot}} jest dużo większa, a stack za nią mniejszy, więc {{t:spr}} spada do ok. {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Button {{t:open|otworzył}}, ty z {{t:big-blind|dużego blinda}} {{t:raise|przebiłeś}} (3-bet) do {{n:pf.3bet.oop-total}}, Button {{t:call|sprawdził}}. Na flopie w {{t:pot|puli}} jest {{n:spr.3bet-oop.pot}}, za tobą {{n:spr.3bet-oop.stack}}. Ile wynosi {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Bez pozycji}} 3-bet jest większy, więc {{t:pot}} rośnie bardziej, a {{t:spr}} jest niższy niż po 3-becie {{t:in-position}} ({{n:spr.3bet-ip}})." }
      - { text: "Ok. {{n:spr.3bet-ip}}", why: "To {{t:spr}} po 3-becie {{t:in-position}} do {{n:pf.3bet.ip-total}}. Twój 3-bet do {{n:pf.3bet.oop-total}} robi większą {{t:pot|pulę}}, więc {{t:spr}} jest niższy: ok. {{n:spr.3bet-oop}}." }
      - { text: "Ok. {{n:spr.4bet}}", why: "Tak niski {{t:spr}} daje dopiero 4-bet. Po 3-becie do {{n:pf.3bet.oop-total}} wychodzi ok. {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacki po {{n:format.stack}}. W której {{t:pot|puli}} {{t:spr}} na flopie jest najniższy?"
    options:
      - { text: "W {{t:pot|puli}} po 4-becie i {{t:call|sprawdzeniu}}", correct: true, why: "Tak: gdy Button 4-betuje do {{n:pf.4bet.example.low}} na 3-bet {{t:small-blind|małego blinda}}, {{t:small-blind}} {{t:call|sprawdza}}, a {{t:big-blind}} {{t:fold|spasował}}, w {{t:pot|puli}} jest {{n:spr.4bet.pot}}, a za nią tylko {{n:spr.4bet.stack}}. {{t:spr}} ok. {{n:spr.4bet}}." }
      - { text: "W {{t:pot|puli}} po 3-becie i {{t:call|sprawdzeniu}}", why: "Po 3-becie {{t:spr}} wynosi ok. {{n:spr.3bet-ip}} {{t:in-position}} i ok. {{n:spr.3bet-oop}} {{t:out-of-position}}. 4-bet obniża go jeszcze bardziej: do ok. {{n:spr.4bet}}." }
      - { text: "W {{t:pot|puli}} z jednym podbiciem", why: "Odwrotnie: tu {{t:spr}} jest najwyższy, ok. {{n:spr.srp}}, bo {{t:pot}} na flopie jest mała." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Dlaczego po 3-becie {{t:spr}} na flopie jest dużo niższy niż po zwykłym {{t:open|otwarciu}}?"
    options:
      - { text: "{{t:pot|Pula}} rośnie kilka razy, a stack za nią maleje niewiele", correct: true, why: "Tak: {{t:pot}} rośnie z {{n:bb.pot-after.vs-btn}} do {{n:vs3bet.pot-after}}, a stack za nią spada tylko z {{n:spr.srp.stack}} do {{n:spr.3bet-ip.stack}}. Iloraz spada z ok. {{n:spr.srp}} do ok. {{n:spr.3bet-ip}}." }
      - { text: "Bo po 3-becie gracze mają mniejsze stacki", why: "Tylko trochę mniejsze: {{n:spr.3bet-ip.stack}} zamiast {{n:spr.srp.stack}}. O spadku {{t:spr}} decyduje to, że {{t:pot}} jest trzy razy większa." }
      - { text: "Bo 3-bet daje {{t:position|pozycję}}", why: "{{t:position|Pozycja}} zależy od miejsca przy stole, nie od 3-betu. {{t:spr}} to tylko stack za {{t:pot|pulą}} podzielony przez {{t:pot|pulę}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Otworzyłeś}} z Buttona do {{n:pf.open-size}}, masz {{n:format.stack}}. {{t:big-blind|Duży blind}} ma tylko {{n:spr.short.stack}} i {{t:call|sprawdza}}. {{t:pot|Pula}} na flopie: {{n:bb.pot-after.vs-btn}}. Ile wynosi {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.short}}", correct: true, why: "Liczysz z {{t:effective-stack|efektywnego stacku}}, czyli mniejszego z dwóch: rywalowi zostało {{n:spr.short.behind}}, więc {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Ponad to, co już jest w {{t:pot|puli}}, każdy z was może jeszcze wpłacić najwyżej {{n:spr.short.behind}}." }
      - { text: "Ok. {{n:spr.srp}}", why: "Tak byłoby, gdyby rywal też miał {{n:format.stack}}. Grać możecie tylko o mniejszy stack, więc {{t:spr}} wynosi ok. {{n:spr.short}}." }
      - { text: "Nie da się policzyć, bo stacki są różne", why: "Da się: bierzesz mniejszy stack (efektywny). Rywalowi zostało {{n:spr.short.behind}}, więc {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Kiedy liczysz {{t:spr}}, który mówi, jak zagrać rozdanie po flopie?"
    options:
      - { text: "Na flopie, zanim ktoś {{t:bet|postawi}} {{t:bet}}", correct: true, why: "Tak: {{t:spr}} można policzyć na każdej {{t:street|ulicy}} (w M7 liczyłeś go na turnie), ale do planu rozdania bierzesz stack za {{t:pot|pulą}} podzielony przez {{t:pot|pulę}} na początku flopu. Wtedy wiesz, ile {{t:pot|pul}} zostało do zagrania na trzech {{t:street|ulicach}}." }
      - { text: "Przed rozdaniem, zanim ktoś {{t:raise|przebije}}", why: "Przed flopem nie wiesz jeszcze, jak duża będzie {{t:pot}}. {{t:spr}} zależy właśnie od tego, co stało się przed flopem: po {{t:open|otwarciu}} ok. {{n:spr.srp}}, po 3-becie ok. {{n:spr.3bet-ip}}." }
      - { text: "Na riverze, przed ostatnim {{t:bet|zakładem}}", why: "Na riverze zostaje tylko jedna decyzja. {{t:spr}} da się policzyć i tam, ale do planu rozdania najbardziej przydaje się {{t:spr}} z flopu, bo obejmuje wszystkie trzy {{t:street|ulice}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "{{t:raise|Przebiłeś}} z Buttona (3-bet), {{t:cutoff|CO}} {{t:call|sprawdził}}. {{t:spr}} na flopie wynosi ok. {{n:spr.3bet-ip}}. Trafiłeś {{t:top-pair|najwyższą parę}} z dobrym kickerem. Jak traktujesz tę rękę?"
    table: { position: BTN }
    options:
      - { text: "Jako rękę na granicy: grasz {{t:value|dla wartości}}, ale all-in rywala nie zawsze {{t:call|sprawdzasz}}", correct: true, why: "{{t:spr}} ok. {{n:spr.3bet-ip}} jest w strefie od {{n:spr.zone.low}} do {{n:spr.zone.mid}}, w której {{t:top-pair}} to ręka na granicy. Decyzja o całym stacku zależy od tego, jak gra rywal i jak wygląda {{t:board}}." }
      - { text: "Zawsze grasz o cały stack", why: "Zwykle tak jest dopiero przy {{t:spr}} poniżej ok. {{n:spr.zone.low}}, np. po 4-becie (ok. {{n:spr.4bet}}). Przy {{t:spr}} ok. {{n:spr.3bet-ip}} do all-inu trzeba więcej {{t:bet|zakładów}}, a do końca płacą głównie silniejsze ręce." }
      - { text: "Grasz ostrożnie jak przy bardzo wysokim {{t:spr}}", why: "Tak ostrożnie grasz {{t:top-pair|najwyższą parą}} powyżej ok. {{n:spr.zone.deep}}, np. w {{t:pot|puli}} z jednym podbiciem (ok. {{n:spr.srp}}). Po 3-becie {{t:spr}} jest dużo niższy." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal idzie all-in za {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). Ile equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz liczbę w procentach."
    answer: eq.jam.spr2
    explanation: "Dopłacasz {{n:commit.stack}}, a {{t:pot}} po {{t:call|sprawdzeniu}} wynosi {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Potrzebne equity = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Na flopie rywal idzie all-in za cały stack ({{n:format.stack}} na początku rozdania). W której {{t:pot|puli}} do {{t:call|sprawdzenia}} potrzebujesz najmniej equity?"
    options:
      - { text: "Po 4-becie: ok. {{n:eq.jam.4bet}}", correct: true, why: "Przy {{t:spr}} ok. {{n:spr.4bet}} dopłacasz {{n:spr.4bet.stack}}, żeby wygrać {{t:pot|pulę}} {{n:spr.4bet.pot}} i stack rywala. Im niższy {{t:spr}}, tym lepsza cena." }
      - { text: "Po 3-becie: ok. {{n:eq.jam.3bet-ip}}", why: "Po 3-becie {{t:in-position}} potrzebujesz ok. {{n:eq.jam.3bet-ip}}. Po 4-becie {{t:pot}} jest większa względem stacku, więc wystarcza ok. {{n:eq.jam.4bet}}." }
      - { text: "Po {{t:open|otwarciu}} i {{t:call|sprawdzeniu}}: ok. {{n:eq.jam.srp}}", why: "To najgorsza cena z trzech: przy {{t:spr}} ok. {{n:spr.srp}} dopłacasz {{n:spr.srp.stack}}, żeby wygrać małą {{t:pot|pulę}} {{n:bb.pot-after.vs-btn}} i stack rywala." }
---
Przed flopem decydujesz, ile pieniędzy trafi do {{t:pot|puli}}. Po flopie liczy się, ile jeszcze zostało za nią. Jedna liczba łączy obie rzeczy: {{t:spr}}.

## Co to jest {{t:spr}}

{{t:spr}} (ang. stack-to-pot ratio) to stosunek stacku do {{t:pot|puli}} na początku {{t:street|ulicy}}. Można go liczyć na każdej {{t:street|ulicy}} (w M7 liczyłeś go na turnie), ale do planu rozdania bierzesz {{t:spr}} z flopu, zanim ktoś {{t:bet|postawi}} {{t:bet}}.

```formula
SPR = efektywny stack ÷ pula na flopie
```

{{t:effective-stack|Efektywny stack}} to mniejszy z dwóch stacków, bez tego, co już jest w {{t:pot|puli}}. Tyle najwyżej każdy z graczy może jeszcze dołożyć do {{t:pot|puli}}: ponad {{t:pot|pulę}} nie wygrasz od rywala więcej niż {{t:effective-stack}} i tyle najwyżej możesz jeszcze stracić.

Przykład: {{t:open|otworzyłeś}} z Buttona do {{n:pf.open-size}}, {{t:big-blind}} {{t:call|sprawdził}}. {{t:pot|Pula}} na flopie to {{n:bb.pot-after.vs-btn}}, za tobą zostało {{n:spr.srp.stack}}. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Preflop ustala {{t:spr}}

Każde {{t:raise}} przed flopem kilka razy powiększa {{t:pot|pulę}}, a stack za nią maleje dużo wolniej. Dlatego {{t:spr}} mocno zależy od tego, co stało się przed flopem.

| {{t:pot|Pula}} (stacki {{n:format.stack}}) | {{t:pot|Pula}} na flopie | Stack za {{t:pot|pulą}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Otwarcie}} i {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position}} i {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet z {{t:big-blind|dużego blinda}} i {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet Buttona na 3-bet {{t:small-blind|małego blinda}} i {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Strefy {{t:spr}}

Strefy {{t:spr}} liczysz z {{t:spr}} na flopie. Im wyższy {{t:spr}}, tym silniejszej ręki potrzebujesz, żeby grać o cały stack:

| {{t:spr}} | Z czym zwykle grasz o cały stack |
|---|---|
| poniżej {{n:spr.zone.low}} | {{t:top-pair}} i lepsze |
| od {{n:spr.zone.low}} do {{n:spr.zone.mid}} | {{t:top-pair}} to ręka na granicy |
| od {{n:spr.zone.mid}} do {{n:spr.zone.deep}} | wysokie {{t:two-pair}} i lepsze |
| powyżej {{n:spr.zone.deep}} | set, {{t:straight}} i lepsze |

Po {{t:open|otwarciu}} i {{t:call|sprawdzeniu}} ({{t:spr}} ok. {{n:spr.srp}}) jesteś w najwyższej strefie, po 3-becie (ok. {{n:spr.3bet-ip}}) w strefie, w której {{t:top-pair}} jest na granicy, a po 4-becie (ok. {{n:spr.4bet}}) w najniższej. Progi to uproszczenie. Źródła dzielą strefy różnie, ale zgadzają się, że poniżej ok. {{n:spr.zone.low}} {{t:top-pair}} gra o stack, a powyżej ok. {{n:spr.zone.mid}} jedna {{t:pair}} już nie. Próg {{n:spr.zone.deep}} wynika z rachunku: przy {{t:spr}} {{n:spr.zone.deep}} trzy {{t:bet|zakłady}} wielkości {{t:pot|puli}} dają all-in.

## Niski {{t:spr}}: lepsza cena na all-in

Gdy rywal idzie all-in za cały stack, dopłacasz stack, żeby wygrać {{t:pot|pulę}} i jego stack. Potrzebne equity = stack ÷ ({{t:pot}} + 2·stack). Przy {{t:spr}} {{n:spr.commit}} to {{n:eq.jam.spr2}}, po 4-becie ok. {{n:eq.jam.4bet}}, po 3-becie ok. {{n:eq.jam.3bet-ip}}, a w {{t:pot|puli}} z jednym podbiciem już ok. {{n:eq.jam.srp}}.

Im niższy {{t:spr}}, tym mniej pieniędzy zostało do zagrania i tym łatwiej wpłacić cały stack. Im wyższy, tym więcej {{t:street|ulic}} i {{t:bet|zakładów}} zostaje, zanim stack trafi do {{t:pot|puli}}.

:::note Skąd te liczby
{{t:pot|Pule}} i stacki pochodzą z rozmiarów z modułu o grze przed flopem ({{t:open}} {{n:pf.open-size}}, 3-bet do {{n:pf.3bet.ip-total}} albo {{n:pf.3bet.oop-total}}, 4-bet do {{n:pf.4bet.example.low}}). {{t:pot|Pula}} po 4-becie to scenariusz: Button 4-betuje 3-bet {{t:small-blind|małego blinda}}, {{t:small-blind}} {{t:call|sprawdza}}, a {{t:big-blind}} {{t:fold|spasował}} i jego blind zostaje w {{t:pot|puli}}. Inny rozmiar daje trochę inny {{t:spr}}, ale kolejność jest zawsze ta sama: im więcej {{t:raise|przebić}} przed flopem, tym niższy {{t:spr}}.
:::
