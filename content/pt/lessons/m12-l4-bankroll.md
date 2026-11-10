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
    prompt: "Um {{t:buy-in|buy-in}} corresponde a {{n:format.stack}}. Quantos bb tem um bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}? Introduza um número."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. O bankroll conta-se em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} em que joga."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Ganha {{n:var.wr.typical.high}} com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}} e tem {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Qual é o risco de perder todo o bankroll?"
    options:
      - { text: "Cerca de {{n:ror.base}}", correct: true, why: "O expoente é 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, pelo que RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. É a probabilidade de algum dia perder todo o bankroll, se nunca descer de {{t:stakes|limite}}." }
      - { text: "Cerca de {{n:ror.half}}", why: "É o que resulta com metade do bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. Com {{n:br.bi.base}}, o expoente é duas vezes maior, pelo que o risco desce para cerca de {{n:ror.base}}." }
      - { text: "Zero, porque o jogador ganha", why: "Um jogador vencedor também pode apanhar um {{t:downswing|downswing}} mais profundo do que todo o bankroll. O risco diminui com o bankroll, mas nunca chega a zero." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "O mesmo bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}, mas um winrate de apenas {{n:var.wr.typical.low}}. Qual é o risco de perder o bankroll?"
    options:
      - { text: "Cerca de {{n:ror.base.wr-min}}", correct: true, why: "O winrate está no expoente: com {{n:var.wr.typical.low}} em vez de {{n:var.wr.typical.high}}, o expoente é três vezes menor e o risco sobe de cerca de {{n:ror.base}} para cerca de {{n:ror.base.wr-min}}." }
      - { text: "Cerca de {{n:ror.base}}, porque o bankroll é o mesmo", why: "O risco depende do produto winrate × bankroll. Um winrate mais baixo funciona como um bankroll menor: o resultado é cerca de {{n:ror.base.wr-min}}." }
      - { text: "Cerca de {{n:ror.base.wr-ex}}", why: "É o que resulta com um winrate de {{n:var.wr.ex}}. Com {{n:var.wr.typical.low}}, o risco é dezenas de vezes maior: cerca de {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Tem {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}, mas ainda não conhece o seu winrate. O que sabe sobre o risco de perder todo o bankroll?"
    options:
      - { text: "Depende do winrate: com {{n:var.wr.typical.high}} cerca de {{n:ror.base}}, com {{n:var.wr.typical.low}} cerca de {{n:ror.base.wr-min}}", correct: true, why: "O winrate está no expoente, ao lado do bankroll. Sem conhecer o winrate, também não conhece o risco, e com um winrate baixo o mesmo bankroll dá um risco várias vezes maior." }
      - { text: "Cerca de {{n:ror.base}}, porque depende apenas do bankroll", why: "Isso só resulta com {{n:var.wr.typical.high}}. Com {{n:var.wr.typical.low}}, o mesmo bankroll dá cerca de {{n:ror.base.wr-min}}." }
      - { text: "Zero, porque {{n:br.bi.base}} {{t:buy-in|buy-ins}} é muito", why: "Com um winrate positivo, o risco diminui com o bankroll, mas nunca chega a zero. Com {{n:var.wr.typical.low}}, continua a ser cerca de {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Começou neste {{t:stakes|limite}} com {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Depois de um {{t:downswing|downswing}}, tem {{n:br.ex.below}}. O que faz?"
    options:
      - { text: "Desce um {{t:stakes|limite}}", correct: true, why: "Ficou abaixo de metade do bankroll previsto ({{n:br.bi.move-down}}). Com este número de {{t:buy-in|buy-ins}}, o risco de perder o resto é várias vezes maior do que com {{n:br.bi.base}} (com um winrate de {{n:var.wr.typical.high}} e SD {{n:var.sd}}). Num {{t:stakes|limite}} duas vezes mais baixo, o mesmo bankroll volta a ser quase o número completo de {{t:buy-in|buy-ins}} desse limite." }
      - { text: "Continua a jogar, porque é apenas {{t:variance|variância}}", why: "É verdade que provavelmente é {{t:variance|variância}}, mas é precisamente contra ela que descer de {{t:stakes|limite}} protege. Com {{n:br.ex.below}} {{t:buy-in|buy-ins}}, outro {{t:downswing|downswing}} pode levar tudo." }
      - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais depressa", why: "Isso é tilt de desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta bruscamente o {{t:risk-of-ruin|risco de ruína}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Começou neste {{t:stakes|limite}} com {{n:br.bi.base}} {{t:buy-in|buy-ins}} e perdeu {{n:dd.bi.small}}. Tem agora {{n:br.ex.after-dd}}. O que faz?"
    options:
      - { text: "Fica no {{t:stakes|limite}} e revê as decisões nas mãos perdidas", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} continua a ser mais do que o limiar de descida mais tardio, {{n:br.bi.move-down}}. Numa simulação, um {{t:downswing|downswing}} destes atinge cerca de {{n:dd.p.small.100k}} dos jogadores que ganham {{n:var.wr.ex}} em {{n:var.hands.k}} mil mãos, e a revisão das mãos verifica se não se trata de erros." }
      - { text: "Desce de {{t:stakes|limite}} de imediato", correct: true, why: "Também é uma boa decisão: algumas fontes aconselham descer logo após perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Descer antes de o bankroll chegar à metade não é um erro, mas adiar a descida para além desse momento já é um erro." }
      - { text: "Acrescenta {{t:buy-in|buy-ins}} de fora para voltar a ter {{n:br.bi.base}}", why: "Repor dinheiro após cada {{t:downswing|downswing}} anula o sentido do bankroll como fronteira do risco. Define o limiar antecipadamente e mantém-se fiel a ele." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Tem {{n:br.bi.base}} {{t:buy-in|buy-ins}} do {{t:stakes|limite}} atual, ou seja, o que definiu como bankroll. O {{t:stakes|limite}} superior tem um {{t:buy-in|buy-in}} duas vezes maior. Sobe?"
    options:
      - { text: "Não, no {{t:stakes|limite}} superior isso é apenas metade do bankroll previsto", correct: true, why: "O bankroll conta-se em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} para o qual quer passar. Os seus {{n:br.bi.base}} {{t:buy-in|buy-ins}} correspondem lá a {{n:br.bi.move-down}}, ou seja, exatamente ao limiar de descida." }
      - { text: "Sim, porque está a correr bem", why: "Um bom mês é sobretudo {{t:variance|variância}} (lição sobre a {{t:variance|variância}}). A subida depende do bankroll no novo {{t:stakes|limite}}." }
      - { text: "Sim, porque já tem {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} do {{t:stakes|limite}} atual são apenas {{n:br.bi.move-down}} num {{t:stakes|limite}} duas vezes mais alto." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Um jogador perde em média no seu {{t:stakes|limite}}, mas tem um bankroll enorme. O que é que isso lhe dá?"
    options:
      - { text: "Apenas adia a perda", correct: true, why: "Com um winrate negativo, o resultado desce em média, pelo que, mais cedo ou mais tarde, perderá o bankroll independentemente do seu tamanho. O bankroll protege contra a {{t:variance|variância}}, e não contra o mau jogo." }
      - { text: "Protege-o da bancarrota", why: "A fórmula do risco só funciona com um winrate positivo. Um jogador perdedor perde o bankroll com certeza, apenas mais devagar com um bankroll maior." }
      - { text: "Permite-lhe jogar {{t:stakes|limites}} mais altos", why: "Um {{t:stakes|limite}} mais alto com um winrate negativo apenas acelera a perda." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Está a começar. Como divide o tempo entre o estudo e o jogo?"
    options:
      - { text: "Cerca de {{n:study.beginner}} de estudo", correct: true, why: "No início é quando tem mais para recuperar, por isso o estudo predomina." }
      - { text: "Cerca de {{n:study.min}} de estudo", why: "É o mínimo para um jogador que já ganha. No início, o estudo deve predominar." }
      - { text: "Só jogar; o estudo virá com a experiência", why: "O resultado do jogo é um feedback fraco (lição sobre decisão e resultado). O estudo com explicações e a análise de mãos ensinam mais depressa." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Já ganha no seu {{t:stakes|limite}}. Como divide o tempo?"
    options:
      - { text: "Mais ou menos meio a meio, mas nunca menos de {{n:study.min}} de estudo", correct: true, why: "Também quando ganha, o ideal é cerca de {{n:study.winner}} de estudo, e o mínimo é {{n:study.min}}." }
      - { text: "Só jogar, já que ganha", why: "Mesmo quando ganha, não desce abaixo de {{n:study.min}} do tempo dedicado ao estudo." }
      - { text: "Cerca de {{n:study.beginner}} de estudo, como no início", why: "Pode, se estiver a preparar-se para {{t:stakes|limites}} mais altos. Se simplesmente ganha no seu, basta cerca de {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Que sinal indica que o jogo pode estar a deixar de estar sob controlo?"
    options:
      - { text: "Depois de uma derrota, volta a jogar para recuperar as perdas", correct: true, why: "Tentar recuperar as perdas é um dos sinais de problema com o jogo a dinheiro referidos nos critérios de diagnóstico. Se reconhece em si esses sinais, utilize os contactos do cartão sobre jogo responsável." }
      - { text: "Analisa as mãos perdidas após a {{t:session|sessão}}", why: "É um hábito de estudo saudável. Sinais de problema são, entre outros, tentar recuperar as perdas, jogar mais tempo do que o planeado e jogar com dinheiro emprestado." }
      - { text: "Termina a {{t:session|sessão}} conforme o planeado", why: "É um bom controlo do jogo. Um sinal de problema seria jogar mais tempo do que o planeado ou sentir necessidade de recuperar as perdas." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
O bankroll é toda a reserva destinada exclusivamente a jogar póquer. Nesta lição, conta-o em **{{t:buy-in|buy-ins}}**, e não em dinheiro: um {{t:buy-in|buy-in}} é um stack completo de {{n:format.stack}} no {{t:stakes|limite}} em que joga.

## {{t:risk-of-ruin|Risco de ruína}}

É a probabilidade de algum dia perder todo o bankroll, se continuar a jogar no mesmo {{t:stakes|limite}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

A fórmula é uma aproximação que pressupõe winrate e SD constantes. O winrate e o SD indicam-se em bb/100, e o bankroll em bb. Com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## De que depende o risco

O winrate e o bankroll estão lado a lado na fórmula: um winrate duas vezes mais baixo exige um bankroll duas vezes maior para o mesmo risco. Por isso, o mesmo número de {{t:buy-in|buy-ins}} dá a um jogador um risco várias vezes menor do que a outro. No início, o winrate é desconhecido, e para o estimar são necessárias muitíssimas mãos (lição sobre a {{t:variance|variância}}). Com um winrate negativo, nenhum bankroll ajuda, porque protege contra a {{t:variance|variância}}, e não contra o mau jogo.

## Quando descer de {{t:stakes|limite}}

Defina o limiar antecipadamente: desce um {{t:stakes|limite}} o mais tardar quando o bankroll cair para **metade** do número de {{t:buy-in|buy-ins}} previsto, por exemplo de {{n:br.bi.base}} para {{n:br.bi.move-down}}. As fontes indicam limiares entre metade e a totalidade do bankroll; metade é o mais tardio. Num {{t:stakes|limite}} duas vezes mais baixo, o mesmo bankroll volta a ser quase o número completo de {{t:buy-in|buy-ins}} desse limite. Só volta a subir quando tiver um bankroll completo em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} superior. Algumas fontes aconselham descer mais cedo, logo após perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}: descer antes do limiar de metade não é um erro.

## Estudo e jogo

No início, dedica cerca de {{n:study.beginner}} do tempo ao estudo e o resto ao jogo. Quando ganha no seu {{t:stakes|limite}}, o ideal é cerca de {{n:study.winner}}, mas nunca menos de {{n:study.min}} de estudo.

:::note Jogo responsável
Alguns sinais de que o jogo está a deixar de estar sob controlo: joga mais tempo do que planeou; depois de uma derrota, volta para recuperar as perdas; joga com dinheiro que não pode perder, ou pede emprestado para jogar; joga para fugir às preocupações; esconde o jogo das pessoas próximas.

Onde procurar ajuda:

{{helplines}}
:::
