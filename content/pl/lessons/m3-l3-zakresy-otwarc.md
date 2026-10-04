---
id: m3.l3
module: m3
order: 3
title: "Zakresy otwarć"
sub: "Z czym wchodzić jako pierwszy, pozycja po pozycji"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
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
    prompt: "Wszyscy przed tobą {{t:fold|spasowali}}, jesteś na Buttonie. Pomaluj ręce, którymi {{t:open|otwierasz}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Jesteś pierwszy do mówienia ({{t:utg}}). Pomaluj ręce, którymi {{t:open|otwierasz}}."
---
{{t:range|Zakres}} {{t:open|otwarcia}} to lista rąk, z którymi {{t:raise|przebijasz}}, gdy wszyscy przed tobą {{t:fold|spasowali}}. Siatki poniżej policzył solver preflop tej aplikacji dla {{t:board|stołu}} 6-osobowego i stacków {{n:format.stack}}.

## Jak czytać siatkę

Każde pole to jeden rodzaj ręki. Nad przekątną są ręce w jednym kolorze (np. AKs), pod nią w różnych kolorach (np. AKo), a na przekątnej {{t:pair|pary}}. Zielone pole to {{t:raise}}, puste to {{t:fold}}. Częściowo wypełnione pole oznacza, że solver gra rękę tylko czasem. Jeśli {{t:open|otwiera}} ją z częstością od {{n:range.mixed.low}} do {{n:range.mixed.high}}, to ręka mieszana: w ćwiczeniach zaliczamy wtedy obie odpowiedzi.

## Od pierwszej {{t:position|pozycji}} do Buttona

```range
rfi.utg
```

Z {{t:utg}} solver {{t:open|otwiera}} {{n:solver.rfi.utg}} rąk. Profesjonalne źródła podają {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

Z każdą {{t:position|pozycją}} bliżej Buttona {{t:range}} rośnie: {{t:hijack|HJ}} {{t:open|otwiera}} {{n:solver.rfi.hj}}, a {{t:cutoff|CO}} już {{n:solver.rfi.co}} rąk.

```range
rfi.btn
```

Na Buttonie solver {{t:open|otwiera}} już {{n:solver.rfi.btn}} rąk, bo zostały tylko blindy, a po flopie masz {{t:position|pozycję}}.

```range
rfi.sb
```

{{t:small-blind|Mały blind}} gra już tylko przeciw {{t:big-blind|dużemu blindowi}}, więc {{t:open|otwiera}} podobnie szeroko jak Button: ok. {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} rąk, mimo że po flopie mówi pierwszy. Na mikrostawkach z {{t:small-blind|małego blinda}} {{t:raise|przebijasz}} albo {{t:fold|pasujesz}}, bez dopłacania do {{t:big-blind|dużego blinda}}: przy prowizji od {{t:pot|puli}} dopłacanie traci. Model solvera aplikacji {{t:open|otwiera}} z tej {{t:position|pozycji}} wyraźnie węziej niż publiczne źródła ({{n:solver.rfi.sb}} rąk), więc tej siatki nie traktuj jako wzoru.

:::note Jak zapamiętać
Nie ucz się {{n:combos.kinds}} pól na pamięć. Zapamiętaj granice: które {{t:pair|pary}}, które asy w kolorze i od której karty zaczynają się ręce w różnych kolorach. Ćwiczenia poniżej losują częściej właśnie ręce z granicy {{t:range|zakresu}}.
:::

Te {{t:range|zakresy}} pochodzą z modelu, który upraszcza grę po flopie, dlatego na granicy {{t:range|zakresu}} różnią się od profesjonalnych tabel. Model zaniża ręce w kolorze po kolei, a zawyża słabe ręce w różnych kolorach. Trzymaj się zasady z lekcji „Ręce startowe”: ręce w kolorze po kolei dobrze grają z {{t:late-position|późnej pozycji}}. Dopóki takie ręce nie zostaną zweryfikowane ze źródłami, ćwiczenia ich nie oceniają.
