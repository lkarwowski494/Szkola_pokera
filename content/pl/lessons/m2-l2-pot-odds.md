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
    prompt: "W puli jest {{n:ex.third.pot}}. Przeciwnik stawia {{n:ex.third.bet}}. Ile equity potrzebujesz do sprawdzenia?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Pula po zakładzie to {{n:ex.third.pot-after-bet}}, dopłacasz {{n:ex.third.bet}}, razem {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy zakładzie wielkości puli. Tu zakład to 1/3 puli." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "To {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Do mianownika dolicz też swoje sprawdzenie." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Masz dobieranie do koloru. W puli {{n:ex.pot}}, przeciwnik stawia {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "Pasuję", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}}, a masz ok. {{n:odds.flush.turn-river}}. Cena jest za wysoka, takie sprawdzenie regularnie traci." }
      - { text: "Sprawdzam", why: "Kusi, bo dobierasz do najlepszego koloru, ale {{n:odds.flush.turn-river}} to wyraźnie mniej niż {{n:eq.bet-pot}}." }
      - { text: "Przebijam all-in", why: "U zaawansowanych bywa to zagraniem, ale bez dobrego powodu ryzykujesz cały stack ręką, która jeszcze nic nie ma." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Ta sama ręka, ale przeciwnik stawia tylko {{n:ex.bet.quarter}} do puli {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Potrzebujesz {{n:eq.bet-quarter}}, a masz ok. {{n:odds.flush.turn-river}}. Mały zakład daje dobrą cenę." }
      - { text: "Pasuję", why: "Za tanio, żeby pasować: {{n:odds.flush.turn-river}} to więcej niż potrzebne {{n:eq.bet-quarter}}." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Przeciwnik stawia pół puli. Ile equity potrzebujesz?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "Pula {{n:ex.pot}}, zakład {{n:ex.bet.half}}. Dopłacasz {{n:ex.bet.half}} do łącznie {{n:ex.half.total}}, czyli {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Częsty błąd: {{n:ex.wrong.half}} to zakład podzielony przez pulę sprzed zakładu ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Dopłatę dzielisz przez całą pulę po twoim sprawdzeniu: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy zakładzie wielkości całej puli." }
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
    prompt: "Przeciwnik stawia całą pulę. Ile procent equity potrzebujesz do sprawdzenia? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "Pula {{n:ex.pot}}, zakład {{n:ex.bet.pot}}. Dopłacasz {{n:ex.bet.pot}} do puli, która po twoim sprawdzeniu ma {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Dzielisz dopłatę przez całą pulę: {{n:eq.bet-pot}}, czyli jedna trzecia."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Gdy przeciwnik stawia, a ty dobierasz, pytanie brzmi: czy cena jest dobra? Porównujesz dwie liczby: **ile musisz wygrywać** i **ile naprawdę wygrywasz**.

:::note Equity a szansa trafienia
**Equity** to twoja część puli: jak często wygrasz, gdy rozdanie dojdzie do showdownu bez dalszych zakładów. **Szansa trafienia** z lekcji o outach to tylko prawdopodobieństwo, że wyjdzie out. Przy czystym dobieraniu, które wygrywa tylko po trafieniu, szansa trafienia na kartach, które naprawdę zobaczysz za tę cenę, jest przybliżeniem equity. Przy zakładzie na flopie to szansa na jedną kartę, a nie do rivera.
:::

## Ile musisz wygrywać

```formula
potrzebne equity = sprawdzenie ÷ pula po twoim sprawdzeniu
pula po twoim sprawdzeniu = pula przed betem + bet + sprawdzenie
```

Przykład: w puli jest {{n:ex.pot}}, przeciwnik stawia {{n:ex.bet.half}}. Pula ma teraz {{n:ex.half.pot-after-bet}}, ty dopłacasz {{n:ex.bet.half}}, więc pula po twoim sprawdzeniu ma {{n:ex.half.total}}. Potrzebujesz {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Szybka ściąga

| Zakład przeciwnika | Potrzebne equity |
|---|---|
| Cała pula | {{n:eq.bet-pot}} |
| Pół puli | {{n:eq.bet-half}} |
| Ćwierć puli | {{n:eq.bet-quarter}} |

:::note Decyzja
Jeśli twoje equity jest większe niż potrzebne, sprawdzasz. Jeśli mniejsze, pasujesz. Wynika to z wartości oczekiwanej: EV sprawdzenia = equity × pula po twoim sprawdzeniu − sprawdzenie, a to jest ujemne dokładnie wtedy, gdy equity jest mniejsze od potrzebnego. Ten jeden rachunek eliminuje większość kosztownych błędów początkujących.
:::
