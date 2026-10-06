---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Kiedy opłaca się sprawdzić"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "W {{t:pot|puli}} jest {{n:ex.third.pot}}. Przeciwnik {{t:bet|stawia}} {{n:ex.third.bet}}. Ile equity potrzebujesz do {{t:call|sprawdzenia}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{t:pot|Pula}} po {{t:bet|zakładzie}} to {{n:ex.third.pot-after-bet}}, dopłacasz {{n:ex.third.bet}}, razem {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy {{t:bet|zakładzie}} wielkości {{t:pot|puli}}. Tu {{t:bet}} to 1/3 {{t:pot|puli}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "To {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Do mianownika dolicz też swoje {{t:call}}." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Masz {{t:flush-draw}}. W {{t:pot|puli}} {{n:ex.pot}}, przeciwnik {{t:bet|stawia}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}}. {{t:flush|Kolor}} daje {{n:outs.flush}} outów, czyli ok. {{n:odds.flush.turn-river}}. Nawet jeśli doliczysz {{n:pair.outs.per-rank}} asy, które dają {{t:pair|parę}} asów (razem {{n:outs.flush-ace}} outów, ok. {{n:odds.flush-ace.turn-river}}), to wciąż wyraźnie mniej niż {{n:eq.bet-pot}}. Takie {{t:call}} traci w długim terminie." }
      - { text: "{{t:call|Sprawdzam}}", why: "Kusi, bo masz {{t:draw}} do najlepszego {{t:flush|koloru}}, a as też może pomóc, ale nawet ok. {{n:odds.flush-ace.turn-river}} to mniej niż {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "U zaawansowanych bywa to zagraniem, ale bez dobrego powodu ryzykujesz cały stack ręką, która jeszcze nic nie ma." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Ta sama ręka, ale przeciwnik {{t:bet|stawia}} tylko {{n:ex.bet.quarter}} do {{t:pot|puli}} {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Potrzebujesz {{n:eq.bet-quarter}}, a masz ok. {{n:odds.flush.turn-river}}, a z asami jeszcze więcej. Mały {{t:bet}} daje dobrą cenę." }
      - { text: "{{t:fold|Pasuję}}", why: "Za tanio, żeby {{t:fold|pasować}}: {{n:odds.flush.turn-river}} to więcej niż potrzebne {{n:eq.bet-quarter}}, a z asami jeszcze więcej." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Przeciwnik {{t:bet|stawia}} pół {{t:pot|puli}}. Ile equity potrzebujesz?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pula}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.half}}. Dopłacasz {{n:ex.bet.half}} do łącznie {{n:ex.half.total}}, czyli {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Częsty błąd: {{n:ex.wrong.half}} to {{t:bet}} podzielony przez {{t:pot|pulę}} sprzed {{t:bet|zakładu}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Dopłatę dzielisz przez całą {{t:pot|pulę}} po twoim {{t:call|sprawdzeniu}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy {{t:bet|zakładzie}} wielkości całej {{t:pot|puli}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Przeciwnik {{t:bet|stawia}} całą {{t:pot|pulę}}. Ile procent equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pula}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.pot}}. Dopłacasz {{n:ex.bet.pot}} do {{t:pot|puli}}, która po twoim {{t:call|sprawdzeniu}} ma {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Dzielisz dopłatę przez całą {{t:pot|pulę}}: {{n:eq.bet-pot}}, czyli jedna trzecia."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Gdy przeciwnik {{t:bet|stawia}}, a ty masz {{t:draw}}, pytanie brzmi: czy cena jest dobra? Porównujesz dwie liczby: **ile musisz wygrywać** i **ile naprawdę wygrywasz**.

:::note Equity a szansa trafienia
**Equity** to twoja część {{t:pot|puli}}: jak często wygrasz, gdy rozdanie dojdzie do showdownu bez dalszych {{t:bet|zakładów}}. **Szansa trafienia** z lekcji o outach to tylko prawdopodobieństwo, że wyjdzie out. Przy czystym {{t:draw|drawie}}, który wygrywa tylko po trafieniu, szansa trafienia na kartach, które naprawdę zobaczysz za tę cenę, jest przybliżeniem equity. Przy {{t:bet|zakładzie}} na flopie to szansa na jedną kartę, a nie do rivera.
:::

## Ile musisz wygrywać

```formula
potrzebne equity = sprawdzenie ÷ pula po twoim sprawdzeniu
pula po twoim sprawdzeniu = pula przed betem + bet + sprawdzenie
```

Przykład: w {{t:pot|puli}} jest {{n:ex.pot}}, przeciwnik {{t:bet|stawia}} {{n:ex.bet.half}}. {{t:pot|Pula}} ma teraz {{n:ex.half.pot-after-bet}}, ty dopłacasz {{n:ex.bet.half}}, więc {{t:pot}} po twoim {{t:call|sprawdzeniu}} ma {{n:ex.half.total}}. Potrzebujesz {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Szybka ściąga

| {{t:bet|Zakład}} przeciwnika | Potrzebne equity |
|---|---|
| Cała {{t:pot}} | {{n:eq.bet-pot}} |
| Pół {{t:pot|puli}} | {{n:eq.bet-half}} |
| Ćwierć {{t:pot|puli}} | {{n:eq.bet-quarter}} |

:::note Decyzja
Jeśli twoje equity jest większe niż potrzebne, {{t:call|sprawdzasz}}. Jeśli mniejsze, {{t:fold|pasujesz}}. Wynika to z {{t:expected-value|wartości oczekiwanej}}: {{t:expected-value|EV}} {{t:call|sprawdzenia}} = equity × {{t:pot}} po twoim {{t:call|sprawdzeniu}} − {{t:call}}, a to jest ujemne dokładnie wtedy, gdy equity jest mniejsze od potrzebnego. Ten jeden rachunek eliminuje większość kosztownych błędów początkujących.
:::
