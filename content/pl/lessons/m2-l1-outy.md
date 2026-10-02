---
id: m2.l1
module: m2
order: 1
title: "Outy i szanse"
sub: "Reguła 2 i 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Ile masz outów do koloru?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "9", correct: true, why: "Masz 4 kiery (2 w ręce, 2 na stole). W talii jest 13 kierów, więc zostało 13 − 4 = 9." }
      - { text: "13", why: "13 to wszystkie kiery w talii, ale 4 już widzisz." }
      - { text: "4", why: "4 to kiery, które już masz. Liczymy karty, których potrzebujesz." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Ile masz outów do strita?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "8", correct: true, why: "Masz 6-7-8-9. Strita daje każda piątka i każda dziesiątka: 4 + 4 = 8 kart." }
      - { text: "4", why: "Tyle byłoby przy jednej brakującej karcie w środku (gutshot). Tu strit jest otwarty z obu stron." }
      - { text: "2", why: "Dwie rangi kart (piątka i dziesiątka), ale każda w czterech kolorach." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, masz 9 outów do koloru. Jaka jest szansa, że trafisz na riverze?"
    options:
      - { text: "Ok. {{n:odds.flush.turn-river}}", correct: true, why: "Jedna karta do odkrycia: 9 × 2 = {{n:odds.flush.rule-turn}}. Dokładnie 9 z 46 nieznanych kart, czyli {{n:odds.flush.turn-river}}." }
      - { text: "Ok. {{n:odds.flush.flop-river}}", why: "To szansa na flopie, gdy przed tobą są dwie karty. Na turnie została jedna." }
      - { text: "Ok. 50%", why: "Dobieranie prawie zawsze jest słabsze od gotowej ręki. 50% to przecenianie szans." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Na flopie masz gutshot (4 outy). Jaka jest szansa trafienia do rivera?"
    options:
      - { text: "Ok. {{n:odds.gutshot.flop-river}}", correct: true, why: "4 × 4 = {{n:odds.gutshot.rule-flop}}. Dokładnie {{n:odds.gutshot.flop-river}}. To mało, dlatego za gutshot rzadko warto drogo płacić." }
      - { text: "Ok. {{n:odds.gutshot.rule-turn}}", why: "To szansa przy jednej karcie (4 × 2). Na flopie zostały jeszcze dwie." }
      - { text: "Ok. {{n:odds.oesd.flop-river}}", why: "Tyle miałbyś z 8 outami. Gutshot ma tylko 4." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
---
**Out** to karta, która poprawia twoją rękę na prawdopodobnie wygrywającą. Liczenie outów pozwala szybko oszacować szanse bez kalkulatora.

## Typowe dobierania

- **Do koloru** (4 karty w kolorze): **9 outów**. W kolorze jest 13 kart, 4 widzisz.
- **Otwarte do strita (OESD)**, np. [[8c 9d]] na stole [[6s 7h Kd]]: **8 outów**, czyli cztery piątki i cztery dziesiątki.
- **Dziura w stricie (gutshot)**, np. 5-6-8-9 bez siódemki: **4 outy**.

## Reguła 2 i 4

```formula
szansa ≈ outy × 2   (jedna karta do odkrycia)
szansa ≈ outy × 4   (flop, dwie karty do końca)
```

| Dobieranie | Outy | Flop → river | Turn → river |
|---|---|---|---|
| Kolor | 9 | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| OESD | 8 | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | 4 | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

:::note Skąd te liczby
Na turnie nie znasz 46 kart (52 minus 2 twoje i 4 na stole). Szansa trafienia koloru to 9 z 46. Reguła 2 i 4 myli się najwyżej o ok. 2 punkty procentowe, dopóki outów jest nie więcej niż 10.
:::
