---
id: m12.l2
module: m12
order: 2
title: "Decisão vs. resultado"
sub: "Avalie a jogada, não a carta do river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop, coloca todo o stack com um {{t:pair|par}} de ases e o adversário {{t:call|paga}} com um {{t:pair|par}} de reis. No river sai um rei e perde. Como avalia a sua decisão?"
    options:
      - { text: "Foi muito boa", correct: true, why: "AA ganha a KK em cerca de {{n:pf.aa-vs-kk}} dos casos. Perder em cerca de {{n:res.kk-wins}} é o custo do jogo, não um erro. Faz sempre a mesma jogada." }
      - { text: "Foi má, devia ter jogado com mais cuidado", why: "Isto é avaliar pelo resultado. Se a carta do river fosse outra, a mesma decisão pareceria excelente. A decisão depende do que sabia antes da carta: cerca de {{n:pf.aa-vs-kk}} de equity." }
      - { text: "Não é possível avaliar, porque perdeu", why: "É possível: calcula a equity no momento da decisão. O resultado de uma só mão não acrescenta nada." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA ganha a KK em all-in preflop em cerca de {{n:pf.aa-vs-kk}} dos casos. Em que percentagem dos casos perde, apesar da melhor decisão possível? Introduza um número."
    answer: res.kk-wins
    explanation: "O total menos {{n:pf.aa-vs-kk}} dá cerca de {{n:res.kk-wins}}. Aproximadamente uma vez em cada cinco ou seis, uma boa decisão termina em derrota."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Tem um {{t:flush-draw|flush draw}} limpo ({{n:outs.flush}} outs), o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.quarter}}. {{t:call|Paga}}, o {{t:flush|flush}} não sai e perde {{n:ex.bet.quarter}}. Como avalia o {{t:call|call}}?"
    options:
      - { text: "Foi bom", correct: true, why: "Precisava de {{n:eq.bet-quarter}} de equity e tinha cerca de {{n:odds.flush.turn-river}}. Um {{t:call|call}} assim dá lucro a longo prazo, embora perca na maioria das mãos individuais." }
      - { text: "Foi mau, porque o {{t:flush|flush}} não saiu", why: "O {{t:flush|flush}} só sai em cerca de {{n:odds.flush.turn-river}} dos casos, por isso falhar era o resultado mais provável. Avalia a decisão pelo preço, e o preço era bom." }
      - { text: "Só seria bom se o {{t:flush|flush}} tivesse saído", why: "É a definição de avaliar pelo resultado. A mesma decisão não muda de qualidade consoante a carta que saiu depois." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw|Flush draw}} limpo, o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. {{t:call|Paga}} e o {{t:flush|flush}} sai no river. Como avalia o {{t:call|call}}?"
    options:
      - { text: "Foi mau, apesar da vitória", correct: true, why: "Precisava de {{n:eq.bet-pot}} de equity e tinha cerca de {{n:odds.flush.turn-river}}. Desta vez ganhou, mas ao longo de muitas repetições um {{t:call|call}} assim perde." }
      - { text: "Foi bom, porque ganhou o {{t:pot|pote}}", why: "Ganhar não melhora a decisão. Com um preço de {{n:eq.bet-pot}} e uma probabilidade de cerca de {{n:odds.flush.turn-river}}, este {{t:call|call}} perde a longo prazo." }
      - { text: "Foi bom, porque o {{t:flush|flush}} é a melhor mão", why: "A força da mão depois de acertar não muda o preço. O que conta é a comparação: {{n:odds.flush.turn-river}} de probabilidade contra {{n:eq.bet-pot}} necessários." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Está a analisar uma mão que perdeu. Qual é a pergunta mais importante?"
    options:
      - { text: "Com a informação que tinha, a decisão tinha {{t:expected-value|EV}} positivo?", correct: true, why: "É a única pergunta que distingue um erro do azar. Calcula o preço, a equity contra o {{t:range|range}} do adversário e o que sabia no momento da decisão." }
      - { text: "Que carta teria recebido o adversário se eu tivesse {{t:fold|desistido}}?", why: "Uma carta futura não muda a qualidade da decisão. Só conta o que sabia naquele momento." }
      - { text: "Quanto perdi nesta mão?", why: "O tamanho da perda diz respeito ao {{t:pot|pote}}, não à decisão. Uma perda grande pode resultar de uma boa decisão, e uma pequena, de um erro." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Um amigo pergunta-lhe sobre a mesma jogada em duas mãos: numa ganhou, na outra perdeu. Parece-lhe que da primeira vez jogou melhor. O que está a acontecer?"
    options:
      - { text: "É o viés do resultado: avalia a decisão pela forma como terminou", correct: true, why: "Em estudos de psicologia, as pessoas avaliavam a mesma decisão de forma mais positiva quando o resultado era bom, mesmo que considerassem que o resultado não devia importar. Ajuda avaliar antes de conhecer o resultado." }
      - { text: "A primeira decisão foi melhor, porque resultou", why: "Se a jogada é a mesma, a decisão é a mesma. Só o resultado difere, ou seja, a sorte." }
      - { text: "A segunda decisão foi melhor, porque ensina humildade", why: "A avaliação não depende do resultado, em nenhum sentido. A mesma decisão tem a mesma qualidade." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Durante três {{t:session|sessões}} jogou de forma mais agressiva do que o habitual e ganhou. Isso prova que o novo estilo é melhor?"
    options:
      - { text: "Não, três {{t:session|sessões}} são poucas; avalia as novas jogadas na revisão de mãos", correct: true, why: "Mesmo uma diferença de habilidade enorme (os melhores {{n:skill.pct}} contra os piores {{n:skill.pct}}) só passa para a frente em cerca de {{n:skill.ahead}} dos casos após cerca de {{n:skill.hands}} mãos. A diferença entre os seus dois estilos é muito menor." }
      - { text: "Sim, o resultado mostra o que funciona", why: "O resultado de poucas {{t:session|sessões}} é sobretudo ruído. Com um {{t:standard-deviation|desvio-padrão}} de cerca de {{n:var.sd}}, mesmo {{n:var.hands.k}} mil mãos deixam um erro de cerca de ± {{n:var.ci.wr}}." }
      - { text: "Sim, se ganhou mais do que o habitual", why: "Uma vitória maior numa amostra pequena continua a ser uma amostra pequena. As jogadas avaliam-se pelas contas e pela revisão de mãos." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Um estudo com milhões de mãos online mostrou quando a habilidade começa a pesar mais do que a sorte. O que foi medido exatamente?"
    options:
      - { text: "Os melhores {{n:skill.pct}} dos jogadores estão à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} dos casos após cerca de {{n:skill.hands}} mãos", correct: true, why: "É assim que os autores do estudo (2015) o definem. É uma comparação entre grupos extremos: com diferenças de habilidade menores, são necessárias muito mais mãos." }
      - { text: "Após cerca de {{n:skill.hands}} mãos, qualquer bom jogador está a ganhar", why: "O estudo compara grupos extremos de jogadores; não diz quando um bom jogador individual estará a ganhar. Isso depende do winrate e do {{t:standard-deviation|desvio-padrão}} (lição sobre a {{t:variance|variância}})." }
      - { text: "Após cerca de {{n:skill.hands}} mãos, a sorte deixa de importar", why: "A sorte importa sempre. O estudo diz apenas quando a vantagem dos melhores sobre os piores começa a ganhar a maioria das comparações." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Ganhou uma {{t:session|sessão}} graças a dois calls sem bom preço que acertaram no river. O que faz depois da {{t:session|sessão}}?"
    options:
      - { text: "Regista esses {{t:call|calls}} como erros a corrigir", correct: true, why: "Ganhar não muda o preço. Se o {{t:call|call}} exigia mais equity do que tinha, foi um erro, mesmo que tenha compensado." }
      - { text: "Nada, a {{t:session|sessão}} foi ganha", why: "Os erros em {{t:session|sessões}} ganhas são igualmente caros, só que mais difíceis de notar. Analisar apenas as derrotas deixa passar metade dos erros." }
      - { text: "Conclui que lê os adversários melhor do que dizem as contas", why: "Dois acertos são poucos para tirar conclusões sobre a leitura dos adversários. A explicação mais simples é a {{t:variance|variância}}." }
---
O poker dá um feedback que muitas vezes mente. Uma boa decisão pode perder, e uma má pode ganhar. Se avaliar o jogo pelos resultados, aprende com sinais aleatórios.

## Resulting: avaliar pelo resultado

Os jogadores chamam a isto *resulting*: assume que a qualidade do resultado lhe diz a qualidade da decisão. Os psicólogos descrevem o mesmo fenómeno como **viés do resultado**. Num estudo clássico de psicologia (1988), as pessoas avaliavam a mesma decisão como melhor, e quem decidiu como mais competente, quando o resultado era favorável. Faziam-no mesmo quando elas próprias consideravam que não deviam ter o resultado em conta.

## Uma boa decisão também perde

Ir all-in com um {{t:pair|par}} de ases contra um {{t:pair|par}} de reis é a melhor decisão possível e, ainda assim, perde em cerca de **{{n:res.kk-wins}}** dos casos. Por outro lado, um {{t:call|call}} com um {{t:flush-draw|flush draw}} pelo {{t:pot|pote}} inteiro no turn é mau (precisa de {{n:eq.bet-pot}}, tem cerca de {{n:odds.flush.turn-river}}) e, mesmo assim, ganha aproximadamente uma vez em cada cinco.

```formula
qualidade da decisão = EV com a informação que tinha no momento da decisão
```

## Como analisar uma mão

1. Tape o resultado. Avalie apenas o que sabia no momento da decisão.
2. Calcule o preço e a equity contra o {{t:range|range}} do adversário (M2, M6).
3. Verifique se a jogada está de acordo com as regras do curso.
4. Analise também as mãos ganhas: os erros que compensaram são igualmente caros.

## Quando o resultado começa a significar algo

Num estudo de cerca de {{n:skill.sample.m}} milhões de mãos online (estudo de 2015), a habilidade só começava a pesar mais do que a sorte após cerca de **{{n:skill.hands}}** mãos. Isto significa que os melhores {{n:skill.pct}} dos jogadores estavam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} das comparações. Para diferenças de habilidade menores, são necessárias muitas vezes mais mãos. Por isso, o resultado de algumas {{t:session|sessões}} não diz qual o estilo de jogo melhor.

:::note Avaliação nesta aplicação
Por isso, a aplicação avalia as suas decisões, e não o resultado da mão. Quando o resultado e a decisão divergem, confie nas contas.
:::
