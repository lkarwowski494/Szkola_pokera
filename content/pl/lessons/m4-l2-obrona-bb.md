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
    prompt: "Button {{t:open|otworzył}} na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}. Ile procent equity potrzebujesz na {{t:big-blind|dużym blindzie}}, żeby {{t:call}} się opłacało (bez uwzględnienia gry po flopie)? Wpisz liczbę."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Dopłacasz {{n:bb.call.vs-btn}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} to ok. {{n:eq.bb-vs-btn-open}}. Połowy potrzebowałbyś tylko wtedy, gdyby w {{t:pot|puli}} był sam {{t:bet}} rywala; blindy w {{t:pot|puli}} poprawiają cenę."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "{{t:small-blind|Mały blind}} {{t:open|otworzył}} na {{n:pf.open-size-sb}}. Ile equity potrzebujesz na {{t:big-blind|dużym blindzie}} do {{t:call|sprawdzenia}}?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:eq.bb-vs-sb-open}}", correct: true, why: "Dopłacasz {{n:bb.call.vs-sb}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:bb.pot-after.vs-sb}}: to ok. {{n:eq.bb-vs-sb-open}}. Cena jest gorsza niż wobec Buttona, ale za to po flopie masz {{t:position|pozycję}}." }
      - { text: "Ok. {{n:eq.bb-vs-btn-open}}", why: "To cena wobec {{t:open|otwarcia}} z Buttona na {{n:pf.open-size}}. {{t:small-blind|Mały blind}} {{t:open|otwiera}} większym rozmiarem, więc płacisz więcej." }
      - { text: "Ok. połowy", why: "Połowy equity potrzebowałbyś, gdyby w {{t:pot|puli}} był tylko {{t:bet}} rywala. Tu są w niej jeszcze blindy, więc cena jest lepsza." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Dlaczego na {{t:big-blind|dużym blindzie}} nie {{t:call|sprawdzasz}} każdej ręki, która ma ok. {{n:eq.bb-vs-btn-open}} equity wobec {{t:range|zakresu}} Buttona?"
    table: { position: BB }
    options:
      - { text: "Bo {{t:out-of-position}} nie zrealizujesz całego equity", correct: true, why: "Equity to szansa przy grze do końca bez {{t:bet|zakładów}}. {{t:out-of-position|Bez pozycji}} często {{t:fold|spasujesz}} rękę przed showdownem, więc słabe ręce w różnych kolorach realizują mniej, niż wskazuje equity." }
      - { text: "Bo Button zawsze ma silną rękę", why: "Button {{t:open|otwiera}} bardzo szeroko, dlatego obrona {{t:big-blind|BB}} jest szeroka." }
      - { text: "Bo trzeba oszczędzać {{t:chips}}", why: "Liczy się {{t:expected-value}}, nie oszczędzanie {{t:chips|żetonów}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Button {{t:open|otworzył}} na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}. Masz QQ na {{t:big-blind|dużym blindzie}}. Co robisz?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet do {{n:pf.3bet.oop-total}}", correct: true, why: "QQ to ręka {{t:value|dla wartości}}. {{t:out-of-position|Bez pozycji}} {{t:raise|przebijasz}} ok. {{n:pf.3bet.size-oop}} {{t:open|otwarcia}}, żeby Button nie {{t:call|sprawdzał}} tanio {{t:in-position}}." }
      - { text: "3-bet do {{n:pf.3bet.ip-total}}", sizeError: true, why: "Dobra akcja, ale to rozmiar dla gracza {{t:in-position}} ({{n:pf.3bet.size-ip}} {{t:open|otwarcia}}). {{t:out-of-position|Bez pozycji}} {{t:raise|przebijasz}} więcej: do {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "Tracisz wartość: z QQ chcesz budować {{t:pot|pulę}} przed flopem, a nie rozgrywać małej {{t:pot|puli}} {{t:out-of-position}}." }
      - { text: "{{t:fold|Pasuję}}", why: "QQ to jedna z najlepszych rąk preflop. {{t:fold|Pas}} to duży błąd." }
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
    prompt: "Button {{t:open|otworzył}} na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}. Pomaluj ręce, którymi bronisz {{t:big-blind}} ({{t:call|sprawdzeniem}} albo 3-betem)."
---
{{t:big-blind|Duży blind}} ma już w {{t:pot|puli}} cały blind, więc wobec {{t:open|otwarcia}} dopłaca niewiele. Gdy Button {{t:open|otwiera}} na {{n:pf.open-size}}, a {{t:small-blind}} {{t:fold|pasuje}}, do {{t:call|sprawdzenia}} potrzebujesz tylko ok. {{n:eq.bb-vs-btn-open}} equity. Dlatego {{t:big-blind}} broni się najszerzej ze wszystkich {{t:position|pozycji}}.

## Cena to nie wszystko

Equity mówi, jak często wygrasz, gdy obaj dojdziecie do showdownu bez dalszych {{t:bet|zakładów}}. {{t:out-of-position|Bez pozycji}} często {{t:fold|spasujesz}} po flopie, więc słabe ręce w różnych kolorach realizują mniej niż ich equity. Ręce w kolorze, {{t:connectors|konektory}} i średnie {{t:pair|pary}} realizują więcej, dlatego w siatce bronisz nimi chętniej.

```range
vs-open.bb-vs-btn
```

Solver aplikacji broni tu {{n:solver.def.bb-vs-btn}} rąk ({{t:call}} i 3-bet razem). Opublikowane rozwiązanie podaje ok. {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}}, więc solver aplikacji jest na górnej granicy tego przedziału.

## Wobec {{t:small-blind|małego blinda}}

{{t:small-blind|Mały blind}} {{t:open|otwiera}} większym rozmiarem, na {{n:pf.open-size-sb}}, więc do {{t:call|sprawdzenia}} potrzebujesz ok. {{n:eq.bb-vs-sb-open}} equity. Cena jest gorsza, ale po flopie masz {{t:position|pozycję}}, więc wciąż bronisz szeroko: ponad połowę rąk.

```range
vs-open.bb-vs-sb
```

Solver aplikacji broni tu {{n:solver.def.bb-vs-sb}} rąk, a opublikowane rozwiązanie innego solvera podaje ok. {{n:pf.bb-def.vs-sb.pub}}.

:::note Jak {{t:raise|przebijać}} z {{t:big-blind|dużego blinda}}
Siatki pokazują, czym się bronić, a nie jak: 3-bet i {{t:call}} są {{t:connected|połączone}}, bo skład 3-betów z {{t:big-blind|dużego blinda}} w solverze aplikacji różni się od opublikowanych wyników innych solverów. Wobec Buttona 3-bet z {{t:big-blind|dużego blinda}} ma ok. {{n:pf.3bet.size-oop}} {{t:open|otwarcia}}. 3-betujesz najsilniejsze ręce (TT+, AQ+, AJs+) plus {{t:bluff|blefy}} z dołu {{t:range|zakresu}} {{t:call|sprawdzenia}}: A5s, czasem A4s, i {{t:connectors|konektory}} w kolorze. Średnie i małe {{t:pair|pary}}, KQo oraz asy w różnych kolorach zwykle {{t:call|sprawdzasz}}. Wobec {{t:small-blind|małego blinda}} masz {{t:position|pozycję}}, więc {{t:raise|przebijasz}} mniej, ok. {{n:pf.3bet.size-ip}} {{t:open|otwarcia}}.
:::
