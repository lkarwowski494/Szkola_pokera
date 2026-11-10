---
id: m12.l4
module: m12
order: 4
title: "Bankroll e risco"
sub: "Variância medida em buy-ins e quando descer de limite"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Um {{t:buy-in|buy-in}} equivale a {{n:format.stack}}. Quantos bb tem um bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}? Digite um número."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Você conta o bankroll em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} em que joga."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Você ganha {{n:var.wr.typical.high}} com {{t:standard-deviation|desvio padrão}} de {{n:var.sd}} e tem {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Qual é o risco de perder todo o bankroll?"
    options:
      - { text: "Cerca de {{n:ror.base}}", correct: true, why: "O expoente é 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, então RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. É a chance de você perder todo o bankroll em algum momento, se nunca descer de {{t:stakes|limite}}." }
      - { text: "Cerca de {{n:ror.half}}", why: "Esse é o resultado com metade do bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. Com {{n:br.bi.base}}, o expoente é duas vezes maior, então o risco cai para cerca de {{n:ror.base}}." }
      - { text: "Zero, porque o jogador é vencedor", why: "Um jogador vencedor também pode pegar um {{t:downswing}} mais profundo que todo o bankroll. O risco diminui conforme o bankroll cresce, mas nunca chega a zero." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "O mesmo bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio padrão}} {{n:var.sd}}, mas winrate de apenas {{n:var.wr.typical.low}}. Qual é o risco de perder o bankroll?"
    options:
      - { text: "Cerca de {{n:ror.base.wr-min}}", correct: true, why: "O winrate está no expoente: com {{n:var.wr.typical.low}} em vez de {{n:var.wr.typical.high}}, o expoente é três vezes menor, e o risco sobe de cerca de {{n:ror.base}} para cerca de {{n:ror.base.wr-min}}." }
      - { text: "Cerca de {{n:ror.base}}, porque o bankroll é o mesmo", why: "O risco depende do produto winrate × bankroll. Um winrate menor funciona como um bankroll menor: o resultado é cerca de {{n:ror.base.wr-min}}." }
      - { text: "Cerca de {{n:ror.base.wr-ex}}", why: "Esse é o resultado com winrate de {{n:var.wr.ex}}. Com {{n:var.wr.typical.low}}, o risco é dezenas de vezes maior: cerca de {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Você tem {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio padrão}} {{n:var.sd}}, mas ainda não sabe seu winrate. O que você sabe sobre o risco de perder todo o bankroll?"
    options:
      - { text: "Depende do winrate: com {{n:var.wr.typical.high}}, cerca de {{n:ror.base}}; com {{n:var.wr.typical.low}}, cerca de {{n:ror.base.wr-min}}", correct: true, why: "O winrate está no expoente, ao lado do bankroll. Sem conhecer o winrate, você também não conhece o risco, e com um winrate baixo o mesmo bankroll dá um risco várias vezes maior." }
      - { text: "Cerca de {{n:ror.base}}, porque depende só do bankroll", why: "Esse é o resultado só com {{n:var.wr.typical.high}}. Com {{n:var.wr.typical.low}}, o mesmo bankroll dá cerca de {{n:ror.base.wr-min}}." }
      - { text: "Zero, porque {{n:br.bi.base}} {{t:buy-in|buy-ins}} é bastante", why: "Com winrate positivo, o risco diminui conforme o bankroll cresce, mas nunca chega a zero. Com {{n:var.wr.typical.low}}, ainda é cerca de {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Você começou no {{t:stakes|limite}} com {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Depois de um {{t:downswing|downswing}}, você tem {{n:br.ex.below}}. O que você faz?"
    options:
      - { text: "Desce um {{t:stakes|limite}}", correct: true, why: "Você caiu abaixo da metade do bankroll planejado ({{n:br.bi.move-down}}). Com essa quantidade de {{t:buy-in|buy-ins}}, o risco de perder o resto é várias vezes maior do que com {{n:br.bi.base}} (com winrate de {{n:var.wr.typical.high}} e SD {{n:var.sd}}). Num {{t:stakes|limite}} duas vezes menor, o mesmo bankroll volta a ser quase o número completo de {{t:buy-in|buy-ins}} desse limite." }
      - { text: "Continua jogando, porque é só {{t:variance|variância}}", why: "É verdade que provavelmente é {{t:variance|variância}}, mas é justamente contra ela que descer de {{t:stakes|limite}} protege. Com {{n:br.ex.below}} {{t:buy-in|buy-ins}}, outro {{t:downswing}} pode levar tudo." }
      - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais rápido", why: "Isso é tilt por desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta drasticamente o {{t:risk-of-ruin|risco de ruína}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Você começou no {{t:stakes|limite}} com {{n:br.bi.base}} {{t:buy-in|buy-ins}} e perdeu {{n:dd.bi.small}}. Agora você tem {{n:br.ex.after-dd}}. O que você faz?"
    options:
      - { text: "Fica no {{t:stakes|limite}} e revisa as decisões nas mãos perdidas", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} ainda é mais do que o patamar de descida mais tardio, {{n:br.bi.move-down}}. Numa simulação, um {{t:downswing}} assim atinge cerca de {{n:dd.p.small.100k}} dos jogadores que ganham {{n:var.wr.ex}} em {{n:var.hands.k}} mil mãos, e a revisão das mãos verifica se não são erros." }
      - { text: "Desce de {{t:stakes|limite}} imediatamente", correct: true, why: "Também é uma boa decisão: algumas fontes recomendam descer já depois de perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Descer antes de chegar à metade do bankroll não é erro; descer depois, sim." }
      - { text: "Coloca {{t:buy-in|buy-ins}} de fora para voltar a ter {{n:br.bi.base}}", why: "Repor depois de cada {{t:downswing}} tira o sentido do bankroll como teto de risco. Você define o patamar com antecedência e o respeita." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Você tem {{n:br.bi.base}} {{t:buy-in|buy-ins}} do {{t:stakes|limite}} atual, ou seja, o que definiu como bankroll. O {{t:stakes|limite}} acima tem um {{t:buy-in}} duas vezes maior. Você sobe?"
    options:
      - { text: "Não, no {{t:stakes|limite}} mais alto isso é só metade do bankroll planejado", correct: true, why: "Você conta o bankroll em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} para o qual quer subir. Lá, seus {{n:br.bi.base}} {{t:buy-in|buy-ins}} viram {{n:br.bi.move-down}}, exatamente o patamar de descida." }
      - { text: "Sim, porque está indo bem", why: "Um mês bom é principalmente {{t:variance|variância}} (lição sobre {{t:variance|variância}}). Subir depende do bankroll no novo {{t:stakes|limite}}." }
      - { text: "Sim, porque você já tem {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} do {{t:stakes|limite}} atual são só {{n:br.bi.move-down}} num {{t:stakes|limite}} duas vezes mais alto." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Um jogador perde, em média, no seu {{t:stakes|limite}}, mas tem um bankroll enorme. O que isso lhe dá?"
    options:
      - { text: "Só adia a perda", correct: true, why: "Com winrate negativo, o resultado cai em média, então cedo ou tarde ele vai perder o bankroll, seja qual for o tamanho. O bankroll protege contra a {{t:variance|variância}}, não contra jogo fraco." }
      - { text: "Protege o jogador da falência", why: "A fórmula do risco só funciona com winrate positivo. Um jogador perdedor perde o bankroll com certeza, só que mais devagar com um bankroll maior." }
      - { text: "Permite jogar {{t:stakes|limites}} mais altos", why: "Um {{t:stakes|limite}} mais alto com winrate negativo só acelera a perda." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Você está apenas começando. Como divide o tempo entre estudo e jogo?"
    options:
      - { text: "Cerca de {{n:study.beginner}} de estudo", correct: true, why: "No início, você tem mais coisa para recuperar, então o estudo predomina." }
      - { text: "Cerca de {{n:study.min}} de estudo", why: "Esse é o mínimo para um jogador que já é vencedor. No início, o estudo deve predominar." }
      - { text: "Só jogar; o aprendizado vem com a experiência", why: "O resultado do jogo é um feedback fraco (lição sobre decisão e resultado). Estudar com explicações e analisar mãos ensina mais rápido." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Você já ganha no seu {{t:stakes|limite}}. Como divide o tempo?"
    options:
      - { text: "Mais ou menos meio a meio, mas nunca menos de {{n:study.min}} de estudo", correct: true, why: "Mesmo quando você ganha, o ideal é cerca de {{n:study.winner}} de estudo, e o mínimo é {{n:study.min}}." }
      - { text: "Só jogar, já que está ganhando", why: "Mesmo ganhando, você não fica abaixo de {{n:study.min}} do tempo dedicado ao estudo." }
      - { text: "Cerca de {{n:study.beginner}} de estudo, como no início", why: "Pode, se estiver se preparando para {{t:stakes|limites}} mais altos. Se você simplesmente ganha no seu, cerca de {{n:study.winner}} basta." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Qual sinal indica que o jogo pode estar saindo do controle?"
    options:
      - { text: "Depois de uma derrota, você volta a jogar para recuperar as perdas", correct: true, why: "Tentar recuperar as perdas é um dos sinais de problema com jogos de azar listados nos critérios diagnósticos. Se você reconhece esses sinais em si mesmo, use os contatos do quadro “Jogo responsável”." }
      - { text: "Você analisa as mãos perdidas depois da {{t:session|sessão}}", why: "É um hábito saudável de estudo. Sinais de problema incluem, entre outros, tentar recuperar as perdas, jogar por mais tempo do que o planejado e jogar com dinheiro emprestado." }
      - { text: "Você encerra a {{t:session|sessão}} conforme o planejado", why: "É um bom controle do jogo. Sinal de problema seria jogar por mais tempo do que o planejado ou sentir necessidade de recuperar o que perdeu." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
Bankroll é toda a reserva destinada exclusivamente a jogar pôquer. Nesta lição, você o conta em **{{t:buy-in|buy-ins}}**, e não em dinheiro: um {{t:buy-in}} é um stack completo de {{n:format.stack}} no {{t:stakes|limite}} em que você joga.

## {{t:risk-of-ruin|Risco de ruína}}

É a probabilidade de você perder todo o bankroll em algum momento, se continuar jogando no mesmo {{t:stakes|limite}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

A fórmula é uma aproximação que supõe winrate e SD constantes. Informe winrate e SD em bb/100 e o bankroll em bb. Com {{t:standard-deviation|desvio padrão}} de {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Do que o risco depende

Winrate e bankroll ficam lado a lado na fórmula: um winrate duas vezes menor exige um bankroll duas vezes maior para o mesmo risco. Por isso, o mesmo número de {{t:buy-in|buy-ins}} dá a um jogador um risco várias vezes menor do que a outro. No início, o winrate é desconhecido, e estimá-lo exige muitíssimas mãos (lição sobre {{t:variance|variância}}). Com winrate negativo, nenhum bankroll ajuda, porque ele protege contra a {{t:variance|variância}}, não contra jogo fraco.

## Quando descer de {{t:stakes|limite}}

Defina o patamar com antecedência: desça um {{t:stakes|limite}} no mais tardar quando o bankroll cair para a **metade** do número planejado de {{t:buy-in|buy-ins}}, por exemplo, de {{n:br.bi.base}} para {{n:br.bi.move-down}}. As fontes indicam patamares que vão da metade ao bankroll completo; a metade é o mais tardio deles. Num {{t:stakes|limite}} duas vezes menor, o mesmo bankroll volta a ser quase o número completo de {{t:buy-in|buy-ins}} desse limite. Volte a subir só quando tiver um bankroll completo em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} mais alto. Algumas fontes recomendam descer antes, já depois de perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}: descer antes do patamar da metade não é erro.

## Estudo e jogo

No início, dedique cerca de {{n:study.beginner}} do tempo ao estudo e o resto ao jogo. Quando você estiver ganhando no seu {{t:stakes|limite}}, o ideal é cerca de {{n:study.winner}}, mas nunca menos de {{n:study.min}} de estudo.

:::note Jogo responsável
Alguns sinais de que o jogo está saindo do controle: você joga por mais tempo do que planejou; depois de uma derrota, volta para recuperar as perdas; joga com dinheiro que não pode perder ou pega dinheiro emprestado para jogar; joga para fugir das preocupações; esconde o jogo das pessoas próximas.

Onde buscar ajuda:

{{helplines}}
:::
