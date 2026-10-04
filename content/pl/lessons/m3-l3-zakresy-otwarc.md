---
id: m3.l3
module: m3
order: 3
title: "Zakresy otwarć"
sub: "Z czym wchodzić jako pierwszy, pozycja po pozycji"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-004]
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

Każde pole to jeden rodzaj ręki. Nad przekątną są ręce w jednym kolorze (np. AKs), pod nią w różnych kolorach (np. AKo), a na przekątnej pary. Zielone pole to przebicie, puste to pas. Częściowo wypełnione pole oznacza, że solver gra rękę tylko czasem. Jeśli otwiera ją z częstością od {{n:range.mixed.low}} do {{n:range.mixed.high}}, to ręka mieszana: w ćwiczeniach zaliczamy wtedy obie odpowiedzi.

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

Z każdą pozycją bliżej Buttona zakres rośnie: HJ (Hijack) otwiera {{n:solver.rfi.hj}}, a CO (Cutoff) już {{n:solver.rfi.co}} rąk.

```range
rfi.btn
```

Na Buttonie solver otwiera już {{n:solver.rfi.btn}} rąk, bo zostały tylko blindy, a po flopie masz pozycję.

```range
rfi.sb
```

Mały blind gra tylko przeciw dużemu blindowi, ale po flopie mówi pierwszy, dlatego otwiera mniej niż Button: {{n:solver.rfi.sb}} rąk. W modelu solvera aplikacji mały blind gra tylko przebiciem albo pasem, bez dopłacania do dużego blinda. Niektóre strategie z innych solverów dopłacają z małego blinda częścią rąk; tego wariantu tu nie uczymy.

:::note Jak zapamiętać
Nie ucz się {{n:combos.kinds}} pól na pamięć. Zapamiętaj granice: które pary, które asy w kolorze i od której karty zaczynają się ręce w różnych kolorach. Ćwiczenia poniżej losują częściej właśnie ręce z granicy zakresu.
:::

Te zakresy pochodzą z modelu, który upraszcza grę po flopie, dlatego na granicy zakresu różnią się od profesjonalnych tabel. Model zaniża ręce w kolorze po kolei, a zawyża słabe ręce w różnych kolorach. Trzymaj się zasady z lekcji „Ręce startowe”: ręce w kolorze po kolei dobrze grają z późnej pozycji. Dopóki takie ręce nie zostaną zweryfikowane ze źródłami, ćwiczenia ich nie oceniają.
