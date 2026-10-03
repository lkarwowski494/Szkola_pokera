---
id: m3.l3
module: m3
order: 3
title: "Zakresy otwarć"
sub: "Z czym wchodzić jako pierwszy, pozycja po pozycji"
rules: [R-M3-002, R-M3-003, R-M3-004]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Wszyscy przed tobą spasowali, jesteś na Buttonie. Pomaluj ręce, którymi otwierasz."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Jesteś pierwszy do mówienia (UTG). Pomaluj ręce, którymi otwierasz."
---
Zakres otwarcia to lista rąk, z którymi przebijasz, gdy wszyscy przed tobą spasowali. Siatki poniżej policzył solver preflop tej aplikacji dla stołu 6-osobowego i stacków {{n:format.stack}}.

## Jak czytać siatkę

Każde pole to jeden rodzaj ręki. Nad przekątną są ręce w jednym kolorze (np. AKs), pod nią w różnych kolorach (np. AKo), a na przekątnej pary. Zielone pole to przebicie, puste to pas. Częściowo wypełnione pole oznacza rękę graniczną, którą solver czasem otwiera, a czasem pasuje.

## Od pierwszej pozycji do Buttona

```range
rfi.utg
```

Z UTG solver otwiera {{n:solver.rfi.utg}} rąk. Profesjonalne źródła podają {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

Z każdą pozycją bliżej Buttona zakres rośnie: HJ otwiera {{n:solver.rfi.hj}}, a CO już {{n:solver.rfi.co}} rąk.

```range
rfi.btn
```

Na Buttonie solver otwiera już {{n:solver.rfi.btn}} rąk, bo zostały tylko blindy, a po flopie masz pozycję.

```range
rfi.sb
```

Mały blind gra tylko przeciw dużemu blindowi, ale po flopie mówi pierwszy, dlatego otwiera mniej niż Button: {{n:solver.rfi.sb}} rąk.

:::note Jak zapamiętać
Nie ucz się 169 pól na pamięć. Zapamiętaj granice: które pary, które asy w kolorze i od której karty zaczynają się ręce w różnych kolorach. Ćwiczenia poniżej losują częściej właśnie ręce z granicy zakresu.
:::

Te zakresy pochodzą z modelu, który upraszcza grę po flopie, dlatego mogą różnić się od profesjonalnych tabel o pojedyncze ręce na granicy. Dla takich rąk różnica w wyniku jest bardzo mała.
