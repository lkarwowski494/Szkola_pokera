---
id: m4.l2
module: m4
order: 2
title: "Obrona dużego blinda"
sub: "Cena sprawdzenia i szeroka obrona"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "Button otworzył na {{n:pf.open-size}}, mały blind spasował. Ile procent equity potrzebujesz na dużym blindzie, żeby sprawdzenie się opłacało (bez uwzględnienia gry po flopie)? Wpisz liczbę."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Dopłacasz {{n:bb.call.vs-btn}} do puli, która po sprawdzeniu ma {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} to ok. {{n:eq.bb-vs-btn-open}}. Połowy potrzebowałbyś tylko wtedy, gdyby w puli był sam zakład rywala; blindy w puli poprawiają cenę."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "Mały blind otworzył na {{n:pf.open-size-sb}}. Ile equity potrzebujesz na dużym blindzie do sprawdzenia?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:eq.bb-vs-sb-open}}", correct: true, why: "Dopłacasz {{n:bb.call.vs-sb}} do puli, która po sprawdzeniu ma {{n:bb.pot-after.vs-sb}}: to ok. {{n:eq.bb-vs-sb-open}}. Cena jest gorsza niż wobec Buttona, ale za to po flopie masz pozycję." }
      - { text: "Ok. {{n:eq.bb-vs-btn-open}}", why: "To cena wobec otwarcia z Buttona na {{n:pf.open-size}}. Mały blind otwiera większym rozmiarem, więc płacisz więcej." }
      - { text: "Ok. połowy", why: "Połowy equity potrzebowałbyś, gdyby w puli był tylko zakład rywala. Tu są w niej jeszcze blindy, więc cena jest lepsza." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Dlaczego na dużym blindzie nie sprawdzasz każdej ręki, która ma ok. {{n:eq.bb-vs-btn-open}} equity wobec zakresu Buttona?"
    table: { position: BB }
    options:
      - { text: "Bo bez pozycji nie zrealizujesz całego equity", correct: true, why: "Equity to szansa przy grze do końca bez zakładów. Bez pozycji często spasujesz rękę przed showdownem, więc słabe ręce w różnych kolorach realizują mniej, niż wskazuje equity." }
      - { text: "Bo Button zawsze ma silną rękę", why: "Button otwiera bardzo szeroko, dlatego obrona BB jest szeroka." }
      - { text: "Bo trzeba oszczędzać żetony", why: "Liczy się wartość oczekiwana, nie oszczędzanie żetonów." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Button otworzył na {{n:pf.open-size}}, mały blind spasował. Masz QQ na dużym blindzie. Co robisz?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet do {{n:pf.3bet.oop-total}}", correct: true, why: "QQ to ręka dla wartości. Bez pozycji przebijasz ok. {{n:pf.3bet.size-oop}} otwarcia, żeby Button nie sprawdzał tanio z pozycją." }
      - { text: "3-bet do {{n:pf.3bet.ip-total}}", sizeError: true, why: "Dobra akcja, ale to rozmiar dla gracza z pozycją ({{n:pf.3bet.size-ip}} otwarcia). Bez pozycji przebijasz więcej: do {{n:pf.3bet.oop-total}}." }
      - { text: "Sprawdzam", why: "Tracisz wartość: z QQ chcesz budować pulę przed flopem, a nie rozgrywać małej puli bez pozycji." }
      - { text: "Pasuję", why: "QQ to jedna z najlepszych rąk preflop. Pas to duży błąd." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "Button otworzył na {{n:pf.open-size}}, mały blind spasował. Pomaluj ręce, którymi bronisz duży blind (sprawdzeniem albo 3-betem)."
---
Duży blind ma już w puli cały blind, więc wobec otwarcia dopłaca niewiele. Gdy Button otwiera na {{n:pf.open-size}}, a mały blind pasuje, do sprawdzenia potrzebujesz tylko ok. {{n:eq.bb-vs-btn-open}} equity. Dlatego duży blind broni się najszerzej ze wszystkich pozycji.

## Cena to nie wszystko

Equity mówi, jak często wygrasz, gdy obaj dojdziecie do showdownu bez dalszych zakładów. Bez pozycji często spasujesz po flopie, więc słabe ręce w różnych kolorach realizują mniej niż ich equity. Ręce w kolorze, łączniki i średnie pary realizują więcej, dlatego w siatce bronisz nimi chętniej.

```range
vs-open.bb-vs-btn
```

Solver aplikacji broni tu {{n:solver.def.bb-vs-btn}} rąk (sprawdzenie i 3-bet razem). GTO Gecko podaje ok. {{n:pf.bb-def.gecko.low}}–{{n:pf.bb-def.gecko.high}}, więc solver aplikacji broni nieco szerzej.

## Wobec małego blinda

Mały blind otwiera większym rozmiarem, na {{n:pf.open-size-sb}}, więc do sprawdzenia potrzebujesz ok. {{n:eq.bb-vs-sb-open}} equity. Cena jest gorsza, ale po flopie masz pozycję, więc wciąż bronisz bardzo szeroko.

```range
vs-open.bb-vs-sb
```

Solver aplikacji broni tu {{n:solver.def.bb-vs-sb}} rąk.

:::note Jak przebijać z dużego blinda
Siatki pokazują, czym się bronić, a nie jak: 3-bet i sprawdzenie są połączone, bo skład 3-betów z dużego blinda w solverze aplikacji różni się od opublikowanych wyników innych solverów. Wobec Buttona 3-bet z dużego blinda ma ok. {{n:pf.3bet.size-oop}} otwarcia. 3-betujesz najsilniejsze ręce (TT+, AQ+, AJs+) plus blefy z dołu zakresu sprawdzenia: A5s, czasem A4s, i łączniki w kolorze. Średnie i małe pary, KQo oraz asy w różnych kolorach zwykle sprawdzasz. Wobec małego blinda masz pozycję, więc przebijasz mniej, ok. {{n:pf.3bet.size-ip}} otwarcia.
:::
