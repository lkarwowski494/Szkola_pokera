---
id: m3.l2
module: m3
order: 2
title: "Mãos iniciais"
sub: "Que cartas jogar antes do flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Qual das mãos é mais forte?"
    options:
      - { text: "A♥ K♥ (mesmo naipe)", correct: true, why: "Os valores das cartas são os mesmos, mas a mão do mesmo naipe tem uma via adicional para ganhar através de {{t:flush}}." }
      - { text: "A♥ K♣ (naipes diferentes)", why: "Com naipes diferentes, perde a possibilidade de fazer {{t:flush}}." }
      - { text: "São iguais", why: "Quase, mas não exatamente. O naipe das cartas importa." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Ainda ninguém entrou no jogo. O que faz?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "7-2 de naipes diferentes é uma das mãos mais fracas: as cartas estão demasiado afastadas para formarem juntas uma {{t:straight|sequência}}, raramente dão {{t:flush}} e o {{t:pair|par}} que fizer tem um kicker fraco. É frequentemente chamada a pior mão, embora, nas contas contra uma mão aleatória, algumas outras, p. ex. 3-2 de naipes diferentes, se saiam ainda pior." }
      - { text: "{{t:raise|Aumento}} para surpreender", why: "Um {{t:bluff}} (jogar uma mão fraca para que os adversários {{t:fold|desistam}} de mãos melhores) no preflop com uma das mãos mais fracas, quando ainda há quatro jogadores atrás de si, perde a longo prazo." }
      - { text: "{{t:call|Pago}}, porque é barato", why: "Cada entrada «barata» com uma mão fraca acumula-se em grandes perdas." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "O jogador antes de si {{t:raise|aumentou}}. O que faz?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Aumento}} novamente (3-bet)", correct: true, why: "Tem a melhor mão possível. Quer pôr no pote o máximo possível e reduzir o número de adversários." }
      - { text: "Apenas {{t:call|pago}}", why: "Os jogadores avançados por vezes jogam assim para despistar, mas, como regra, perde valor e deixa os outros entrar barato." }
      - { text: "{{t:fold|Desisto}}", why: "Nunca {{t:fold|desiste}} de ases no preflop. Contra qualquer outra mão são favoritos, p. ex., contra KK têm cerca de {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Todos {{t:fold|desistiram}} até chegar a sua vez. O que faz?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}}", correct: true, why: "QJ do mesmo naipe é uma mão muito boa para atacar os blinds a partir de {{t:position|posição}}: faz {{t:straight|sequências}}, flushes e {{t:pair|pares}} altos." }
      - { text: "{{t:fold|Desisto}}", why: "No Button, esta mão é demasiado boa para {{t:fold|desistir}}." }
      - { text: "{{t:call|Pago}}", why: "É melhor {{t:raise|aumentar}}: tem a possibilidade de ganhar os blinds de imediato e joga com a {{t:initiative|iniciativa}}." }
---
A maior parte do dinheiro que os principiantes perdem deve-se a jogarem demasiadas mãos fracas. Uma boa seleção de mãos iniciais é a forma mais rápida de deixar de perder.

## Grupos de mãos

- **As mais fortes**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] e AK do mesmo naipe e de naipes diferentes, p. ex. [[As Ks]] e [[As Kd]]. {{t:raise|Aumenta}} e, quando alguém {{t:raise|aumentou}} antes de si, normalmente {{t:raise|aumenta}} novamente (3-bet) {{t:value|por valor}}, ou seja, para que o adversário {{t:call|pague}} com uma mão mais fraca.
- **Fortes**: JJ, TT, AQ, AJ do mesmo naipe, KQ do mesmo naipe.
- **Especulativas**: {{t:pair|pares}} baixos e cartas seguidas do mesmo naipe, p. ex. [[7h 6h]]. Boas em {{t:late-position|posição tardia}}.
- **Fracas**: desligadas, baixas, de naipes diferentes, p. ex. [[9c 3d]]. {{t:fold|Desiste}}.

:::note Quantas {{t:combo|combinações}} existem
No total, há {{n:combos.total}} {{t:combo|combinações}} de mãos iniciais, mas apenas {{n:combos.kinds}} tipos: {{n:combos.kinds.pair}} {{t:pair|pares}}, {{n:combos.kinds.suited}} mãos do mesmo naipe e {{n:combos.kinds.offsuit}} de naipes diferentes. Cada {{t:pair}} corresponde a {{n:combos.pair}} {{t:combo|combinações}}, uma mão do mesmo naipe a {{n:combos.suited}} e uma de naipes diferentes a {{n:combos.offsuit}}. Por isso, AK de naipes diferentes surge três vezes mais frequentemente do que AK do mesmo naipe.
:::

Os grupos acima são uma simplificação para começar. Na próxima lição, ficará a conhecer os {{t:range|ranges}} exatos de {{t:open|abertura}} para cada {{t:position|posição}}, numa grelha de {{t:range|ranges}}.
