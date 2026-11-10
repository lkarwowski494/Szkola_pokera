---
id: m3.l3
module: m3
order: 3
title: "Ranges de abertura"
sub: "Com que mãos entrar em primeiro lugar, posição a posição"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
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
    prompt: "Todos antes de si {{t:fold|desistiram}} e está no Button. Pinte as mãos com que {{t:open|abre}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "É o primeiro a agir ({{t:utg|UTG}}). Pinte as mãos com que {{t:open|abre}}."
---
Um {{t:range|range}} de {{t:open|abertura}} é a lista de mãos com que {{t:raise|aumenta}} quando todos antes de si {{t:fold|desistiram}}. As grelhas abaixo foram calculadas pelo solver preflop desta aplicação para jogo numa mesa de 6 jogadores, com stacks de {{n:format.stack}}.

## Como ler a grelha

Cada casa corresponde a um tipo de mão. Acima da diagonal estão as mãos do mesmo naipe (p. ex. AKs), abaixo dela as mãos de naipes diferentes (p. ex. AKo) e, na diagonal, os {{t:pair|pares}}. Uma casa verde é {{t:raise|aumento}}; uma casa vazia é {{t:fold|desistência}}. Uma casa parcialmente preenchida significa que o solver joga a mão apenas algumas vezes. Se a {{t:open|abre}} com uma frequência entre {{n:range.mixed.low}} e {{n:range.mixed.high}} (estes limiares são uma definição da aplicação), trata-se de uma {{t:mixed-hand|mão mista}}: nos exercícios aceitamos então ambas as respostas. Uma ação que o solver joga em menos de {{n:range.mixed.low}} dos casos, mas pelo menos em {{n:range.mixed.min}}, é considerada aceitável pelos exercícios: não é um erro, mas a revisão desta tarefa voltará mais cedo. Uma ação que o solver joga em menos de {{n:range.mixed.min}} dos casos é avaliada pelos exercícios como imprecisão (é assim que a escala de avaliação publicada pelo site do solver designa estas jogadas), e uma ação que o solver nunca joga, como erro.

## Da primeira {{t:position|posição}} ao Button

```range
rfi.utg
```

A partir de {{t:utg|UTG}}, o solver {{t:open|abre}} {{n:solver.rfi.utg}} das mãos. As fontes profissionais indicam {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

A cada {{t:position|posição}} mais próxima do Button, o {{t:range|range}} cresce: o {{t:hijack|HJ}} {{t:open|abre}} {{n:solver.rfi.hj}} e o {{t:cutoff|CO}} já {{n:solver.rfi.co}} das mãos.

```range
rfi.btn
```

No Button, o solver já {{t:open|abre}} {{n:solver.rfi.btn}} das mãos, porque só restam os blinds e, depois do flop, terá {{t:position|posição}}.

```range
rfi.sb
```

O {{t:small-blind|small blind}} joga apenas contra o {{t:big-blind|big blind}}, por isso {{t:open|abre}} quase tão largo como o Button: cerca de {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} das mãos, apesar de agir primeiro depois do flop. Nos {{t:stakes|microlimites}}, a partir do {{t:small-blind|small blind}}, {{t:raise|aumenta}} ou {{t:fold|desiste}}, sem completar para o {{t:big-blind|big blind}}: o {{t:rake}} cobrado sobre o {{t:pot|pote}} reduz o lucro de completar. Trata-se de uma simplificação: algumas soluções de solvers completam com parte das mãos a partir do {{t:small-blind|small blind}}. O solver da aplicação {{t:open|abre}} daqui {{n:solver.rfi.sb}} das mãos, ou seja, dentro do intervalo indicado pelas fontes.

:::note Numa mesa de 9 jogadores
Numa mesa de 9 jogadores, antes do {{t:hijack|HJ}} há mais três {{t:position|posições}}: {{t:utg|UTG}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2, seguidas do LJ. Atrás de {{t:utg|UTG}} ficam então oito jogadores, por isso a partir de {{t:utg|UTG}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2 {{t:open|abre}} de forma mais apertada do que a partir de {{t:utg|UTG}} numa mesa de 6 jogadores: há mais jogadores atrás de si. Quando esses três jogadores {{t:fold|desistirem}}, o LJ joga como o {{t:utg|UTG}} numa mesa de 6 jogadores, e as {{t:position|posições}} seguintes jogam tal como nas grelhas acima. Para as {{t:position|posições}} iniciais numa mesa de 9 jogadores indicamos apenas a direção: ainda não verificámos os números nem a composição destes {{t:range|ranges}} com soluções de solvers publicadas.
:::

:::note Como memorizar
Não decore as {{n:combos.kinds}} casas. Memorize os limites: que {{t:pair|pares}}, que ases do mesmo naipe e a partir de que carta começam as mãos de naipes diferentes. Os exercícios abaixo sorteiam com mais frequência precisamente as mãos do limite do {{t:range|range}}.
:::

Estes {{t:range|ranges}} provêm de um modelo que simplifica o jogo depois do flop, por isso, em cerca de uma dúzia de mãos no limite do {{t:range|range}}, diferem das tabelas profissionais, ora num sentido, ora no outro. São sobretudo mãos do mesmo naipe não consecutivas (p. ex. 75s, 97s) e mãos fracas de naipes diferentes (p. ex. A4o, K7o). Os exercícios não avaliam estas mãos.
