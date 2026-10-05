---
id: m4.l1
module: m4
order: 1
title: "Gdy ktoś otworzył przed tobą"
sub: "Pas, sprawdzenie czy 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "{{t:cutoff|CO}} {{t:open|otworzył}} na {{n:pf.open-size}}. Chcesz {{t:raise|przebić}} z Buttona. Do ilu?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Do {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|Z pozycją}} {{t:raise|przebijasz}} ok. {{n:pf.3bet.size-ip}} {{t:open|otwarcia}}. To standard, który zostawia dobry stosunek stacka do {{t:pot|puli}} na flopie." }
      - { text: "Do {{n:pf.3bet.too-small}}", why: "Za mało: rywal dostaje świetną cenę, żeby {{t:call|sprawdzić}} prawie wszystkim i grać dalej." }
      - { text: "Do {{n:pf.3bet.too-big}}", why: "Za dużo jak na grę {{t:in-position}}: ryzykujesz więcej, a lepsze ręce rywala i tak nie {{t:fold|spasują}}." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Button {{t:open|otworzył}} na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}. Chcesz {{t:raise|przebić}} z {{t:big-blind|dużego blinda}}. Do ilu?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Do {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Bez pozycji}} {{t:raise|przebijasz}} ok. {{n:pf.3bet.size-oop}} {{t:open|otwarcia}}. Większy rozmiar odbiera Buttonowi tanie {{t:call}} {{t:in-position}}." }
      - { text: "Do {{n:pf.3bet.ip-total}}", why: "To rozmiar dla gracza {{t:in-position}}. {{t:out-of-position|Bez pozycji}} dajesz rywalowi zbyt dobrą cenę." }
      - { text: "Tylko {{t:call|sprawdzam}}", why: "Z KK chcesz budować {{t:pot|pulę}} od razu: to druga najlepsza ręka preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Button {{t:open|otworzył}} na {{n:pf.open-size}}. Jesteś na {{t:small-blind|małym blindzie}}. Który plan jest standardem?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Przebijam}} albo {{t:fold|pasuję}}", correct: true, why: "Po {{t:call|sprawdzeniu}} grasz {{t:out-of-position}}, a za tobą jest jeszcze {{t:big-blind}}. Z {{t:small-blind|małego blinda}} wobec późnych {{t:open|otwarć}} solvery prawie zawsze {{t:raise|przebijają}} albo {{t:fold|pasują}}." }
      - { text: "{{t:call|Sprawdzam}} szeroko, bo połowę blinda mam już w {{t:pot|puli}}", why: "Połowa blinda to mało. {{t:call|Sprawdzenie}} {{t:out-of-position}} z {{t:big-blind|dużym blindem}} za plecami słabo {{t:equity-realization|realizuje equity}}: wygrywasz mniejszą część {{t:pot|puli}}, niż wskazuje equity ręki, bo często {{t:fold|pasujesz}} przed showdownem." }
      - { text: "Zawsze {{t:fold|pasuję}}", why: "Za ciasno: Button {{t:open|otwiera}} bardzo szeroko, więc z silnymi rękami i częścią {{t:bluff|blefów}} warto {{t:raise|przebijać}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Jesteś na {{t:big-blind|dużym blindzie}} wobec {{t:open|otwarcia}} z Buttona. Która z tych rąk jest typowym 3-betem jako {{t:bluff}}?"
    table: { position: BB }
    options:
      - { text: "A5 w kolorze", correct: true, why: "Blokuje AA i AK rywala, a po {{t:call|sprawdzeniu}} ma szansę na {{t:flush}} i {{t:straight|strita}}. To typowy {{t:bluff}} z dołu {{t:range|zakresu}} {{t:call|sprawdzenia}}: z {{t:big-blind|dużego blinda}} 3-betujesz najsilniejsze ręce plus takie {{t:bluff|blefy}}." }
      - { text: "K7 w różnych kolorach", why: "Tą ręką bronisz się {{t:call|sprawdzeniem}}. Jako 3-bet nie blokuje niczego ważnego i słabo gra, gdy rywal {{t:call|sprawdzi}}." }
      - { text: "{{t:pair|Para}} 22", why: "Najmniejsze {{t:pair|pary}} bronią się {{t:call|sprawdzeniem}}: zarabiają, gdy trafią seta ({{t:three-of-a-kind|trójkę}} z {{t:pocket-pair|parą w ręce}}), a 3-bet z nimi źle znosi 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Gdy ktoś przed tobą {{t:open|otworzył}}, masz trzy możliwości: {{t:fold|pasujesz}}, {{t:call|sprawdzasz}} albo {{t:raise|przebijasz}} jeszcze raz. Ponowne {{t:raise}} nazywa się 3-betem, bo to trzeci {{t:bet}} w rozdaniu (blind, {{t:open}}, {{t:raise}}).

## Rozmiar 3-betu

{{t:in-position|Z pozycją}} {{t:raise|przebijasz}} do ok. {{n:pf.3bet.size-ip}} {{t:open|otwarcia}}, czyli przy {{t:open|otwarciu}} {{n:pf.open-size}} do {{n:pf.3bet.ip-total}}. {{t:out-of-position|Bez pozycji}}, na przykład z blindów wobec {{t:open|otwarcia}} z {{t:cutoff|CO}} albo Buttona, do ok. {{n:pf.3bet.size-oop}} {{t:open|otwarcia}}, czyli {{n:pf.3bet.oop-total}}. Większy rozmiar {{t:out-of-position}} odbiera rywalowi tanie {{t:call}}, z którym potem grałby z przewagą {{t:position|pozycji}}.

## {{t:position|Pozycja}} decyduje, czy {{t:call|sprawdzać}}

Według rozwiązań GTO Wizard Button wobec {{t:open|otwarcia}} z {{t:cutoff|CO}} {{t:raise|przebija}} ok. {{n:pf.3bet-freq.btn-vs-co.low}} rąk, a {{t:call|sprawdza}} tylko ok. {{n:pf.call-freq.btn-vs-co}}; Preflop Wizard podaje 3-bety w przedziale {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}}. Wobec {{t:open|otwarcia}} z {{t:utg}} {{t:call|sprawdzeń}} jest już nieco więcej niż 3-betów: ok. {{n:pf.call-freq.btn-vs-utg}} wobec {{n:pf.3bet-freq.btn-vs-utg}}. {{t:range|Zakres}} {{t:utg}} jest silny, więc 3-bet częściej dostaje 4-bet i rzadziej wygrywa {{t:pot|pulę}} od razu.

```range
vs-open.btn-vs-co
```

Solver aplikacji gra tu {{n:solver.play.btn-vs-co}} rąk Buttona. Jego 3-bety mieszczą się w przedziale ze źródeł, a {{t:call|sprawdzeń}} jest nieco więcej niż w GTO Wizard.

Z {{t:small-blind|małego blinda}} prawie zawsze {{t:raise|przebijasz}} albo {{t:fold|pasujesz}}. {{t:call|Sprawdzenie}} oznacza grę {{t:out-of-position}}, a {{t:big-blind}} za tobą może jeszcze {{t:raise|przebić}}. {{t:out-of-position|Bez pozycji}} ręka gorzej **{{t:equity-realization|realizuje equity}}**: wygrywa mniejszą część {{t:pot|puli}}, niż wskazuje jej equity, bo częściej {{t:fold|pasujesz}} przed showdownem i trudniej ci wygrać {{t:pot|pulę}} {{t:bet|zakładem}}.

```range
vs-open.sb-vs-btn
```

Według rozwiązania GTO Wizard {{t:small-blind}} wobec Buttona prawie nic nie {{t:call|sprawdza}}: 3-betuje ok. {{n:pf.3bet-freq.sb-vs-btn}} rąk, górę {{t:range|zakresu}} (m.in. 77+, AJo+, KQo, A5s, A4s, T9s), a resztę {{t:fold|pasuje}}. Solver aplikacji 3-betuje tu {{n:solver.3bet.sb-vs-btn}} rąk; jego nieliczne {{t:call|sprawdzenia}} siatka liczy jako {{t:fold}}. W kilku rękach, np. 55, 66 i A9o, solver aplikacji gra inaczej niż GTO Wizard, więc ćwiczenia ich nie oceniają.

## {{t:range|Zakres}} {{t:linear}} czy {{t:polarized}}

Mając {{t:position|pozycję}} wobec {{t:open|otwarcia}} z {{t:hijack|HJ}} albo {{t:cutoff|CO}}, 3-betujesz głównie najlepsze ręce od góry i dokładasz kilka {{t:bluff|blefów}} z asami w kolorze (A5s, A4s), a część słabszych rąk, na przykład małe {{t:pair|pary}} i {{t:connectors|łączniki}} w kolorze, {{t:call|sprawdzasz}}: rywal często {{t:call|sprawdza}}, więc chcesz mieć rękę, która dobrze gra w {{t:pot|puli}} po {{t:call|sprawdzeniu}}. Źródła nazywają taki {{t:range}} różnie: GTO Gecko {{t:linear|liniowym}}, Preflop Wizard {{t:polarized|spolaryzowanym}}; ważniejsze jest, które ręce 3-betujesz, a które {{t:call|sprawdzasz}}.

Z {{t:big-blind|dużego blinda}} wobec Buttona albo {{t:small-blind|małego blinda}} 3-betujesz najsilniejsze ręce (TT+, AQ+, AJs+) plus {{t:bluff|blefy}} z dołu {{t:range|zakresu}} {{t:call|sprawdzenia}}: A5s, czasem A4s, i {{t:connectors|łączniki}} w kolorze. Asy w kolorze blokują AA i AK rywala, a gdy dostaną {{t:call}}, wciąż mogą trafić {{t:flush}} albo {{t:straight|strita}}. Średnie i małe {{t:pair|pary}}, KQo oraz asy w różnych kolorach (AJo–A9o) zwykle tylko {{t:call|sprawdzasz}}: z {{t:big-blind|dużego blinda}} wchodzisz tanio i zamykasz akcję, więc te ręce zarabiają więcej po {{t:call|sprawdzeniu}}. Skład zależy od {{t:rake|rake'u}} i rozmiaru 3-betu, więc 99, KQo i AJo bywają grane różnie.

Z {{t:small-blind|małego blinda}} grasz inaczej: 3-bet albo {{t:fold}}, z górą {{t:range|zakresu}} w 3-becie.

:::note Skąd te zasady
Siatki Buttona i {{t:small-blind|małego blinda}} pochodzą z solvera aplikacji i w przybliżeniu zgadzają się ze źródłami (w {{t:small-blind|małym blindzie}} poza kilkoma rękami, których ćwiczenia nie oceniają). Jak 3-betować z {{t:big-blind|dużego blinda}}, uczy reguła oparta na opublikowanych wynikach innych solverów (GTO Wizard, Poker Academy, ThinkGTO, Upswing): skład 3-betów z {{t:big-blind|dużego blinda}} w solverze aplikacji od nich odbiega.
:::
