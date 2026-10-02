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
    prompt: "W puli jest 90. Przeciwnik stawia 30. Ile equity potrzebujesz do sprawdzenia?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Pula po zakładzie to 120, dopłacasz 30, razem 150. 30 ÷ 150 = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy zakładzie wielkości puli. Tu zakład to 1/3 puli." }
      - { text: "{{n:eq.bet-half}}", why: "To 30 ÷ 120. Do mianownika dolicz też swoje sprawdzenie." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Masz dobieranie do koloru. W puli 100, przeciwnik stawia 100."
    table: { hand: "Ah 5h", board: "Kh 8h 3c 2s" }
    options:
      - { text: "Pasuję", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}}, a masz ok. {{n:odds.flush.turn-river}}. Cena jest za wysoka, takie sprawdzenie regularnie traci." }
      - { text: "Sprawdzam", why: "Kusi, bo dobierasz do najlepszego koloru, ale {{n:odds.flush.turn-river}} to wyraźnie mniej niż {{n:eq.bet-pot}}." }
      - { text: "Przebijam all-in", why: "U zaawansowanych bywa to zagraniem, ale bez dobrego powodu ryzykujesz cały stack ręką, która jeszcze nic nie ma." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Ta sama ręka, ale przeciwnik stawia tylko 25 do puli 100."
    table: { hand: "Ah 5h", board: "Kh 8h 3c 2s" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Potrzebujesz {{n:eq.bet-quarter}}, a masz ok. {{n:odds.flush.turn-river}}. Mały zakład daje dobrą cenę." }
      - { text: "Pasuję", why: "Za tanio, żeby pasować: {{n:odds.flush.turn-river}} to więcej niż potrzebne {{n:eq.bet-quarter}}." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Przeciwnik stawia pół puli. Ile equity potrzebujesz?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "Pula 100, zakład 50. Dopłacasz 50 do łącznie 200, czyli {{n:eq.bet-half}}." }
      - { text: "50%", why: "Częsty błąd. Dzielisz przez wszystko, co możesz wygrać, łącznie ze swoim sprawdzeniem." }
      - { text: "{{n:eq.bet-pot}}", why: "Tyle potrzebujesz przy zakładzie wielkości całej puli." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Gdy przeciwnik stawia, a ty dobierasz, pytanie brzmi: czy cena jest dobra? Porównujesz dwie liczby: **ile musisz wygrywać** i **ile naprawdę wygrywasz**.

## Ile musisz wygrywać

```formula
potrzebne equity = sprawdzenie ÷ (pula po zakładzie + sprawdzenie)
```

Przykład: w puli jest 100, przeciwnik stawia 50. Pula ma teraz 150, ty dopłacasz 50, razem 200. Potrzebujesz 50 ÷ 200 = **{{n:eq.bet-half}}**.

## Szybka ściąga

| Zakład przeciwnika | Potrzebne equity |
|---|---|
| Cała pula | {{n:eq.bet-pot}} |
| Pół puli | {{n:eq.bet-half}} |
| Ćwierć puli | {{n:eq.bet-quarter}} |

:::note Decyzja
Jeśli twoja szansa jest większa niż potrzebne equity, sprawdzasz. Jeśli mniejsza, pasujesz. Ten jeden rachunek eliminuje większość kosztownych błędów początkujących.
:::
