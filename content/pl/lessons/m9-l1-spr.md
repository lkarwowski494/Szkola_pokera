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
    prompt: "Otworzyłeś z Buttona do {{n:pf.open-size}}, duży blind sprawdził, stacki po {{n:format.stack}}. Na flopie w puli jest {{n:bb.pot-after.vs-btn}}, a za tobą zostało {{n:spr.srp.stack}}. Ile wynosi SPR?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Stack za pulą jest kilkanaście razy większy niż pula: to typowy SPR po otwarciu i sprawdzeniu." }
      - { text: "Ok. {{n:spr.srp.wrong-full}}", why: "Tak wychodzi z całego stacku {{n:format.stack}}. Twoje {{n:pf.open-size}} jest już w puli, więc liczysz tylko to, co zostało: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Ok. {{n:spr.3bet-ip}}", why: "Tyle wynosi SPR po 3-becie i sprawdzeniu. W puli z jednym podbiciem pula jest dużo mniejsza, więc SPR wynosi ok. {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "CO otworzył do {{n:pf.open-size}}, ty z Buttona przebiłeś (3-bet) do {{n:pf.3bet.ip-total}}, CO sprawdził, blindy spasowały. Na flopie w puli jest {{n:vs3bet.pot-after}}, a za tobą {{n:spr.3bet-ip.stack}}. Ile wynosi SPR?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Po 3-becie pula jest trzy razy większa niż po zwykłym otwarciu, więc SPR spada z ok. {{n:spr.srp}} do ok. {{n:spr.3bet-ip}}." }
      - { text: "Ok. {{n:spr.3bet-ip.wrong-full}}", why: "Tak wychodzi z całego stacku {{n:format.stack}}. Twój 3-bet za {{n:pf.3bet.ip-total}} jest już w puli, więc dzielisz tylko to, co zostało: {{n:spr.3bet-ip.stack}}." }
      - { text: "Ok. {{n:spr.srp}}", why: "To SPR w puli z jednym podbiciem. Po 3-becie pula jest dużo większa, a stack za nią mniejszy, więc SPR spada do ok. {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Button otworzył, ty z dużego blinda przebiłeś (3-bet) do {{n:pf.3bet.oop-total}}, Button sprawdził. Na flopie w puli jest {{n:spr.3bet-oop.pot}}, za tobą {{n:spr.3bet-oop.stack}}. Ile wynosi SPR?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. Bez pozycji 3-bet jest większy, więc pula rośnie bardziej, a SPR jest niższy niż po 3-becie z pozycją ({{n:spr.3bet-ip}})." }
      - { text: "Ok. {{n:spr.3bet-ip}}", why: "To SPR po 3-becie z pozycją do {{n:pf.3bet.ip-total}}. Twój 3-bet do {{n:pf.3bet.oop-total}} robi większą pulę, więc SPR jest niższy: ok. {{n:spr.3bet-oop}}." }
      - { text: "Ok. {{n:spr.4bet}}", why: "Tak niski SPR daje dopiero 4-bet. Po 3-becie do {{n:pf.3bet.oop-total}} wychodzi ok. {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacki po {{n:format.stack}}. W której puli SPR na flopie jest najniższy?"
    options:
      - { text: "W puli po 4-becie i sprawdzeniu", correct: true, why: "Tak: gdy Button 4-betuje do {{n:pf.4bet.example.low}} na 3-bet małego blinda, mały blind sprawdza, a duży blind spasował, w puli jest {{n:spr.4bet.pot}}, a za nią tylko {{n:spr.4bet.stack}}. SPR ok. {{n:spr.4bet}}." }
      - { text: "W puli po 3-becie i sprawdzeniu", why: "Po 3-becie SPR wynosi ok. {{n:spr.3bet-ip}} z pozycją i ok. {{n:spr.3bet-oop}} bez pozycji. 4-bet obniża go jeszcze bardziej: do ok. {{n:spr.4bet}}." }
      - { text: "W puli z jednym podbiciem", why: "Odwrotnie: tu SPR jest najwyższy, ok. {{n:spr.srp}}, bo pula na flopie jest mała." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Dlaczego po 3-becie SPR na flopie jest dużo niższy niż po zwykłym otwarciu?"
    options:
      - { text: "Pula rośnie kilka razy, a stack za nią maleje niewiele", correct: true, why: "Tak: pula rośnie z {{n:bb.pot-after.vs-btn}} do {{n:vs3bet.pot-after}}, a stack za nią spada tylko z {{n:spr.srp.stack}} do {{n:spr.3bet-ip.stack}}. Iloraz spada z ok. {{n:spr.srp}} do ok. {{n:spr.3bet-ip}}." }
      - { text: "Bo po 3-becie gracze mają mniejsze stacki", why: "Tylko trochę mniejsze: {{n:spr.3bet-ip.stack}} zamiast {{n:spr.srp.stack}}. O spadku SPR decyduje to, że pula jest trzy razy większa." }
      - { text: "Bo 3-bet daje pozycję", why: "Pozycja zależy od miejsca przy stole, nie od 3-betu. SPR to tylko stack za pulą podzielony przez pulę." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Otworzyłeś z Buttona do {{n:pf.open-size}}, masz {{n:format.stack}}. Duży blind ma tylko {{n:spr.short.stack}} i sprawdza. Pula na flopie: {{n:bb.pot-after.vs-btn}}. Ile wynosi SPR?"
    table: { position: BTN }
    options:
      - { text: "Ok. {{n:spr.short}}", correct: true, why: "Liczysz z efektywnego stacku, czyli mniejszego z dwóch: rywalowi zostało {{n:spr.short.behind}}, więc {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Ponad to, co już jest w puli, każdy z was może jeszcze wpłacić najwyżej {{n:spr.short.behind}}." }
      - { text: "Ok. {{n:spr.srp}}", why: "Tak byłoby, gdyby rywal też miał {{n:format.stack}}. Grać możecie tylko o mniejszy stack, więc SPR wynosi ok. {{n:spr.short}}." }
      - { text: "Nie da się policzyć, bo stacki są różne", why: "Da się: bierzesz mniejszy stack (efektywny). Rywalowi zostało {{n:spr.short.behind}}, więc SPR ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Kiedy liczysz SPR, który mówi, jak zagrać rozdanie po flopie?"
    options:
      - { text: "Na flopie, zanim ktoś postawi zakład", correct: true, why: "Tak: SPR można policzyć na każdej ulicy (w M7 liczyłeś go na turnie), ale do planu rozdania bierzesz stack za pulą podzielony przez pulę na początku flopu. Wtedy wiesz, ile pul zostało do zagrania na trzech ulicach." }
      - { text: "Przed rozdaniem, zanim ktoś przebije", why: "Przed flopem nie wiesz jeszcze, jak duża będzie pula. SPR zależy właśnie od tego, co stało się przed flopem: po otwarciu ok. {{n:spr.srp}}, po 3-becie ok. {{n:spr.3bet-ip}}." }
      - { text: "Na riverze, przed ostatnim zakładem", why: "Na riverze zostaje tylko jedna decyzja. SPR da się policzyć i tam, ale do planu rozdania najbardziej przydaje się SPR z flopu, bo obejmuje wszystkie trzy ulice." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Przebiłeś z Buttona (3-bet), CO sprawdził. SPR na flopie wynosi ok. {{n:spr.3bet-ip}}. Trafiłeś najwyższą parę z dobrym kickerem. Jak traktujesz tę rękę?"
    table: { position: BTN }
    options:
      - { text: "Jako rękę na granicy: grasz dla wartości, ale all-in rywala nie zawsze sprawdzasz", correct: true, why: "SPR ok. {{n:spr.3bet-ip}} jest w strefie od {{n:spr.zone.low}} do {{n:spr.zone.mid}}, w której najwyższa para to ręka na granicy. Decyzja o całym stacku zależy od tego, jak gra rywal i jak wygląda stół." }
      - { text: "Zawsze grasz o cały stack", why: "Zwykle tak jest dopiero przy SPR poniżej ok. {{n:spr.zone.low}}, np. po 4-becie (ok. {{n:spr.4bet}}). Przy SPR ok. {{n:spr.3bet-ip}} do all-inu trzeba więcej zakładów, a do końca płacą głównie silniejsze ręce." }
      - { text: "Grasz ostrożnie jak przy bardzo wysokim SPR", why: "Tak ostrożnie grasz najwyższą parą powyżej ok. {{n:spr.zone.deep}}, np. w puli z jednym podbiciem (ok. {{n:spr.srp}}). Po 3-becie SPR jest dużo niższy." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. W puli jest {{n:ex.pot}}, rywal idzie all-in za {{n:commit.stack}} (SPR {{n:spr.commit}}). Ile equity potrzebujesz do sprawdzenia? Wpisz liczbę w procentach."
    answer: eq.jam.spr2
    explanation: "Dopłacasz {{n:commit.stack}}, a pula po sprawdzeniu wynosi {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Potrzebne equity = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Na flopie rywal idzie all-in za cały stack ({{n:format.stack}} na początku rozdania). W której puli do sprawdzenia potrzebujesz najmniej equity?"
    options:
      - { text: "Po 4-becie: ok. {{n:eq.jam.4bet}}", correct: true, why: "Przy SPR ok. {{n:spr.4bet}} dopłacasz {{n:spr.4bet.stack}}, żeby wygrać pulę {{n:spr.4bet.pot}} i stack rywala. Im niższy SPR, tym lepsza cena." }
      - { text: "Po 3-becie: ok. {{n:eq.jam.3bet-ip}}", why: "Po 3-becie z pozycją potrzebujesz ok. {{n:eq.jam.3bet-ip}}. Po 4-becie pula jest większa względem stacku, więc wystarcza ok. {{n:eq.jam.4bet}}." }
      - { text: "Po otwarciu i sprawdzeniu: ok. {{n:eq.jam.srp}}", why: "To najgorsza cena z trzech: przy SPR ok. {{n:spr.srp}} dopłacasz {{n:spr.srp.stack}}, żeby wygrać małą pulę {{n:bb.pot-after.vs-btn}} i stack rywala." }
---
Przed flopem decydujesz, ile pieniędzy trafi do puli. Po flopie liczy się, ile jeszcze zostało za nią. Jedna liczba łączy obie rzeczy: SPR.

## Co to jest SPR

SPR (ang. stack-to-pot ratio) to stosunek stacku do puli na początku ulicy. Można go liczyć na każdej ulicy (w M7 liczyłeś go na turnie), ale do planu rozdania bierzesz SPR z flopu, zanim ktoś postawi zakład.

```formula
SPR = efektywny stack ÷ pula na flopie
```

Efektywny stack to mniejszy z dwóch stacków, bez tego, co już jest w puli. Tyle najwyżej każdy z graczy może jeszcze dołożyć do puli: ponad pulę nie wygrasz od rywala więcej niż efektywny stack i tyle najwyżej możesz jeszcze stracić.

Przykład: otworzyłeś z Buttona do {{n:pf.open-size}}, duży blind sprawdził. Pula na flopie to {{n:bb.pot-after.vs-btn}}, za tobą zostało {{n:spr.srp.stack}}. SPR = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Preflop ustala SPR

Każde przebicie przed flopem kilka razy powiększa pulę, a stack za nią maleje dużo wolniej. Dlatego SPR mocno zależy od tego, co stało się przed flopem.

| Pula (stacki {{n:format.stack}}) | Pula na flopie | Stack za pulą | SPR |
|---|---|---|---|
| Otwarcie i sprawdzenie | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet z pozycją i sprawdzenie | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet z dużego blinda i sprawdzenie | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet Buttona na 3-bet małego blinda i sprawdzenie | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Strefy SPR

Strefy SPR liczysz z SPR na flopie. Im wyższy SPR, tym silniejszej ręki potrzebujesz, żeby grać o cały stack:

| SPR | Z czym zwykle grasz o cały stack |
|---|---|
| poniżej {{n:spr.zone.low}} | najwyższa para i lepsze |
| od {{n:spr.zone.low}} do {{n:spr.zone.mid}} | najwyższa para to ręka na granicy |
| od {{n:spr.zone.mid}} do {{n:spr.zone.deep}} | wysokie dwie pary i lepsze |
| powyżej {{n:spr.zone.deep}} | set, strit i lepsze |

Po otwarciu i sprawdzeniu (SPR ok. {{n:spr.srp}}) jesteś w najwyższej strefie, po 3-becie (ok. {{n:spr.3bet-ip}}) w strefie, w której najwyższa para jest na granicy, a po 4-becie (ok. {{n:spr.4bet}}) w najniższej. Progi to uproszczenie. Źródła dzielą strefy różnie, ale zgadzają się, że poniżej ok. {{n:spr.zone.low}} najwyższa para gra o stack, a powyżej ok. {{n:spr.zone.mid}} jedna para już nie. Próg {{n:spr.zone.deep}} wynika z rachunku: przy SPR {{n:spr.zone.deep}} trzy zakłady wielkości puli dają all-in.

## Niski SPR: lepsza cena na all-in

Gdy rywal idzie all-in za cały stack, dopłacasz stack, żeby wygrać pulę i jego stack. Potrzebne equity = stack ÷ (pula + 2·stack). Przy SPR {{n:spr.commit}} to {{n:eq.jam.spr2}}, po 4-becie ok. {{n:eq.jam.4bet}}, po 3-becie ok. {{n:eq.jam.3bet-ip}}, a w puli z jednym podbiciem już ok. {{n:eq.jam.srp}}.

Im niższy SPR, tym mniej pieniędzy zostało do zagrania i tym łatwiej wpłacić cały stack. Im wyższy, tym więcej ulic i zakładów zostaje, zanim stack trafi do puli.

:::note Skąd te liczby
Pule i stacki pochodzą z rozmiarów z modułu o grze przed flopem (otwarcie {{n:pf.open-size}}, 3-bet do {{n:pf.3bet.ip-total}} albo {{n:pf.3bet.oop-total}}, 4-bet do {{n:pf.4bet.example.low}}). Pula po 4-becie to scenariusz: Button 4-betuje 3-bet małego blinda, mały blind sprawdza, a duży blind spasował i jego blind zostaje w puli. Inny rozmiar daje trochę inny SPR, ale kolejność jest zawsze ta sama: im więcej przebić przed flopem, tym niższy SPR.
:::
