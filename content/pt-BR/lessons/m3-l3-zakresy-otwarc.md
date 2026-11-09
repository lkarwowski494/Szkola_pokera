---
id: m3.l3
module: m3
order: 3
title: "Ranges de abertura"
sub: "Com o que entrar primeiro, posição por posição"
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
    prompt: "Todos antes de você {{t:fold|desistiram}}, e você está no Button. Pinte as mãos com que você {{t:open|abre}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Você é o primeiro a agir ({{t:utg}}). Pinte as mãos com que você {{t:open|abre}}."
---
Um {{t:range|range}} de {{t:open|abertura}} é a lista de mãos com que você {{t:raise|aumenta}} quando todos antes de você {{t:fold|desistiram}}. As grades abaixo foram calculadas pelo solver pré-flop deste app para o jogo em mesa de 6 jogadores com stacks de {{n:format.stack}}.

## Como ler a grade

Cada célula é um tipo de mão. Acima da diagonal ficam as mãos do mesmo naipe (ex.: AKs), abaixo dela as de naipes diferentes (ex.: AKo) e, na diagonal, os {{t:pair|pares}}. Uma célula verde significa {{t:raise|aumentar}}; uma vazia significa {{t:fold|desistir}}. Uma célula parcialmente preenchida significa que o solver joga a mão só às vezes. Se ele a {{t:open|abre}} com frequência entre {{n:range.mixed.low}} e {{n:range.mixed.high}} (esses limiares são uma configuração do app), é uma {{t:mixed-hand|mão mista}}: nos exercícios, aceitamos então as duas respostas. Uma ação que o solver joga em menos de {{n:range.mixed.low}} dos casos, mas em pelo menos {{n:range.mixed.min}}, é considerada aceitável pelos exercícios: não é um erro, mas a revisão dessa tarefa voltará mais cedo. Uma ação que o solver joga em menos de {{n:range.mixed.min}} dos casos é avaliada pelos exercícios como imprecisão (é assim que a escala de avaliação publicada pelo site do solver chama esses lances), e uma ação que o solver nunca joga, como erro.

## Da primeira {{t:position|posição}} ao Button

```range
rfi.utg
```

Do {{t:utg}}, o solver {{t:open|abre}} {{n:solver.rfi.utg}} das mãos. Fontes profissionais indicam {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

A cada {{t:position|posição}} mais perto do Button, o {{t:range|range}} cresce: o {{t:hijack|HJ}} {{t:open|abre}} {{n:solver.rfi.hj}}, e o {{t:cutoff|CO}} já {{n:solver.rfi.co}} das mãos.

```range
rfi.btn
```

No Button, o solver já {{t:open|abre}} {{n:solver.rfi.btn}} das mãos, porque só restam os blinds e, depois do flop, você tem {{t:position|posição}}.

```range
rfi.sb
```

O {{t:small-blind|small blind}} joga apenas contra o {{t:big-blind|big blind}}, então {{t:open|abre}} com amplitude semelhante à do Button: cerca de {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} das mãos, embora aja primeiro depois do flop. Nos {{t:stakes|microlimites}}, do {{t:small-blind|small blind}} você {{t:raise|aumenta}} ou {{t:fold|desiste}}, sem completar para o {{t:big-blind|big blind}}: o {{t:rake}} cobrado do {{t:pot|pote}} reduz o lucro de completar. Isso é uma simplificação: algumas soluções de solver completam com parte das mãos do {{t:small-blind|small blind}}. O solver do app {{t:open|abre}} daqui {{n:solver.rfi.sb}} das mãos, ou seja, dentro do intervalo das fontes.

:::note Em mesa de 9 jogadores
Em uma mesa de 9 jogadores, antes do {{t:hijack|HJ}} há mais três {{t:position|posições}}: {{t:utg}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2 e, depois delas, o LJ. Atrás do {{t:utg}} ficam então oito jogadores, por isso do {{t:utg}}, {{t:utg|UTG}}+1 e {{t:utg|UTG}}+2 você {{t:open|abre}} de forma mais fechada do que do {{t:utg}} na mesa de 6 jogadores: há mais jogadores atrás de você. Quando esses três jogadores {{t:fold|desistirem}}, o LJ joga como o {{t:utg}} na mesa de 6 jogadores, e as {{t:position|posições}} seguintes jogam igual às grades acima. Para as {{t:position|posições}} iniciais na mesa de 9 jogadores, indicamos apenas a direção: ainda não conferimos os números nem a composição desses {{t:range|ranges}} com soluções de solver publicadas.
:::

:::note Como memorizar
Não decore {{n:combos.kinds}} células. Memorize os limites: quais {{t:pair|pares}}, quais ases do mesmo naipe e a partir de qual carta começam as mãos de naipes diferentes. Os exercícios abaixo sorteiam com mais frequência justamente as mãos do limite do {{t:range|range}}.
:::

Esses {{t:range|ranges}} vêm de um modelo que simplifica o jogo pós-flop, por isso, em pouco mais de uma dezena de mãos no limite do {{t:range|range}}, eles diferem das tabelas profissionais, ora para um lado, ora para o outro. São principalmente mãos do mesmo naipe com gap (ex.: 75s, 97s) e mãos fracas de naipes diferentes (ex.: A4o, K7o). Os exercícios não avaliam essas mãos.
