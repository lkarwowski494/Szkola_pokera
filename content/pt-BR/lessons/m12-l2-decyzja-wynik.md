---
id: m12.l2
module: m12
order: 2
title: "Decisão x resultado"
sub: "Avalie a jogada, não a carta do river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "No preflop, você coloca o stack inteiro com um {{t:pair|par}} de ases, e o adversário {{t:call|paga}} com um {{t:pair|par}} de reis. Sai um rei no river e você perde. Como você avalia sua decisão?"
    options:
      - { text: "Foi muito boa", correct: true, why: "AA vence KK em cerca de {{n:pf.aa-vs-kk}} dos casos. Perder em cerca de {{n:res.kk-wins}} é o custo do jogo, não um erro. Você faz a mesma coisa todas as vezes." }
      - { text: "Foi ruim, era preciso jogar com mais cuidado", why: "Isso é avaliar pelo resultado. Se a carta do river fosse outra, a mesma decisão pareceria ótima. A decisão depende do que você sabia antes da carta: cerca de {{n:pf.aa-vs-kk}} de equity." }
      - { text: "Não dá para avaliar, porque você perdeu", why: "Dá, sim: você calcula a equity no momento da decisão. O resultado de uma única mão não acrescenta nada." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA vence KK all-in no preflop em cerca de {{n:pf.aa-vs-kk}} dos casos. Em que porcentagem dos casos você perde, mesmo tomando a melhor decisão possível? Digite um número."
    answer: res.kk-wins
    explanation: "O total menos {{n:pf.aa-vs-kk}} dá cerca de {{n:res.kk-wins}}. Mais ou menos uma vez a cada cinco ou seis, uma boa decisão termina em derrota."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Você tem um {{t:flush-draw}} limpo ({{n:outs.flush}} outs), há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.quarter}}. Você {{t:call|paga}}, o {{t:flush}} não sai e você perde {{n:ex.bet.quarter}}. Como você avalia o {{t:call}}?"
    options:
      - { text: "Foi bom", correct: true, why: "Você precisava de {{n:eq.bet-quarter}} de equity e tinha cerca de {{n:odds.flush.turn-river}}. Um {{t:call}} assim dá lucro no longo prazo, embora perca na maioria das mãos individuais." }
      - { text: "Foi ruim, porque o {{t:flush}} não saiu", why: "O {{t:flush|flush}} só sai em cerca de {{n:odds.flush.turn-river}} dos casos, então não completar era o resultado mais provável. Você avalia a decisão pelo preço, e o preço era bom." }
      - { text: "Só seria bom se o {{t:flush}} tivesse saído", why: "Essa é a definição de avaliar pelo resultado. A mesma decisão não muda de qualidade conforme a carta que saiu depois." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw}} limpo, há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Você {{t:call|paga}} e o {{t:flush}} sai no river. Como você avalia o {{t:call}}?"
    options:
      - { text: "Foi ruim, apesar da vitória", correct: true, why: "Você precisava de {{n:eq.bet-pot}} de equity e tinha cerca de {{n:odds.flush.turn-river}}. Desta vez você ganhou, mas em muitas repetições um {{t:call}} assim perde." }
      - { text: "Foi bom, porque você ganhou o {{t:pot|pote}}", why: "Ganhar não melhora a decisão. Com um preço de {{n:eq.bet-pot}} e uma chance de cerca de {{n:odds.flush.turn-river}}, esse {{t:call}} perde no longo prazo." }
      - { text: "Foi bom, porque o {{t:flush}} é a melhor mão", why: "A força da mão depois de acertar não muda o preço. O que conta é a comparação: {{n:odds.flush.turn-river}} de chance contra {{n:eq.bet-pot}} necessários." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Você está analisando uma mão que perdeu. Qual pergunta é a mais importante?"
    options:
      - { text: "Com as informações que eu tinha, a decisão tinha {{t:expected-value|EV}} positivo?", correct: true, why: "É a única pergunta que separa um erro de azar. Você calcula o preço, a equity contra o {{t:range|range}} do adversário e o que sabia no momento da decisão." }
      - { text: "Que carta o adversário teria recebido se eu tivesse {{t:fold|desistido}}?", why: "Uma carta futura não muda a qualidade da decisão. Só conta o que você sabia naquele momento." }
      - { text: "Quanto perdi nesta mão?", why: "O tamanho da perda fala do {{t:pot|pote}}, não da decisão. Uma perda grande pode vir de uma boa decisão, e uma pequena, de um erro." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Um amigo pergunta sobre a mesma jogada em duas mãos: em uma ele ganhou, na outra perdeu. Você tem a impressão de que na primeira vez ele jogou melhor. O que está acontecendo?"
    options:
      - { text: "É o viés de resultado: você avalia a decisão pelo modo como ela terminou", correct: true, why: "Em estudos de psicologia, as pessoas avaliavam melhor a mesma decisão quando o resultado era bom, mesmo achando que o resultado não deveria importar. Ajuda avaliar antes de conhecer o resultado." }
      - { text: "A primeira decisão foi melhor, porque funcionou", why: "Se a jogada é a mesma, a decisão é a mesma. Só o resultado muda, ou seja, a sorte." }
      - { text: "A segunda decisão foi melhor, porque ensina humildade", why: "A avaliação não depende do resultado em nenhuma direção. A mesma decisão tem a mesma qualidade." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Durante três {{t:session|sessões}} você jogou de forma mais agressiva que o normal e ganhou. Isso prova que o novo estilo é melhor?"
    options:
      - { text: "Não, três {{t:session|sessões}} são pouco; você avalia as novas jogadas na revisão de mãos", correct: true, why: "Mesmo uma diferença enorme de habilidade (os melhores {{n:skill.pct}} contra os piores {{n:skill.pct}}) só fica à frente em cerca de {{n:skill.ahead}} dos casos depois de cerca de {{n:skill.hands}} mãos. A diferença entre os seus dois estilos é bem menor." }
      - { text: "Sim, o resultado mostra o que funciona", why: "O resultado de poucas {{t:session|sessões}} é principalmente ruído. Com um {{t:standard-deviation|desvio padrão}} de cerca de {{n:var.sd}}, mesmo {{n:var.hands.k}} mil mãos deixam um erro de cerca de ± {{n:var.ci.wr}}." }
      - { text: "Sim, se você ganhou mais que o normal", why: "Uma vitória maior em uma amostra pequena continua sendo uma amostra pequena. Você avalia as jogadas pelas contas e pela revisão de mãos." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Um estudo com milhões de mãos online mostrou quando a habilidade começa a superar a sorte. O que exatamente foi medido?"
    options:
      - { text: "Os melhores {{n:skill.pct}} dos jogadores ficam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} dos casos depois de cerca de {{n:skill.hands}} mãos", correct: true, why: "É assim que os autores do estudo (2015) definem isso. É uma comparação entre grupos extremos: com diferenças menores de habilidade, são necessárias muito mais mãos." }
      - { text: "Depois de cerca de {{n:skill.hands}} mãos, todo bom jogador está no lucro", why: "O estudo compara grupos extremos de jogadores e não diz quando um bom jogador individual estará no lucro. Isso depende do winrate e do {{t:standard-deviation|desvio padrão}} (lição sobre {{t:variance|variância}})." }
      - { text: "Depois de cerca de {{n:skill.hands}} mãos, a sorte deixa de importar", why: "A sorte sempre importa. O estudo só diz quando a vantagem dos melhores sobre os piores começa a vencer na maioria das comparações." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Você ganhou uma {{t:session|sessão}} graças a dois calls sem bom preço que acertaram no river. O que você faz depois da {{t:session|sessão}}?"
    options:
      - { text: "Anota esses {{t:call|calls}} como erros a corrigir", correct: true, why: "Ganhar não muda o preço. Se o {{t:call}} exigia mais equity do que você tinha, foi um erro, mesmo que tenha compensado." }
      - { text: "Nada, a {{t:session}} foi vencedora", why: "Erros em {{t:session|sessões}} vencedoras custam o mesmo, só são mais difíceis de notar. Analisar só as derrotas deixa de fora metade dos erros." }
      - { text: "Conclui que lê os adversários melhor do que dizem as contas", why: "Dois acertos são pouco para tirar conclusões sobre a leitura dos adversários. A explicação mais simples é a {{t:variance}}." }
---
O poker dá um retorno que muitas vezes mente. Uma boa decisão pode perder, e uma ruim pode ganhar. Se você avalia seu jogo pelos resultados, aprende com sinais aleatórios.

## Resulting: avaliar pelo resultado

Os jogadores chamam isso de *resulting*: você supõe que a qualidade do resultado indica a qualidade da decisão. Os psicólogos descrevem o mesmo fenômeno como **viés de resultado**. Em um estudo clássico de psicologia (1988), as pessoas avaliavam a mesma decisão como melhor, e quem decidiu como mais competente, quando o resultado era favorável. Faziam isso mesmo quando elas próprias achavam que não deveriam levar o resultado em conta.

## Boas decisões também perdem

Ir all-in com um {{t:pair|par}} de ases contra um {{t:pair|par}} de reis é a melhor decisão possível, e mesmo assim perde em cerca de **{{n:res.kk-wins}}** dos casos. Por outro lado, um {{t:call}} com {{t:flush-draw|flush draw}} pelo {{t:pot|pote}} inteiro no turn é ruim (você precisa de {{n:eq.bet-pot}} e tem cerca de {{n:odds.flush.turn-river}}), e mesmo assim ganha mais ou menos uma vez em cada cinco.

```formula
qualidade da decisão = EV com as informações que você tinha no momento da decisão
```

## Como analisar uma mão

1. Esconda o resultado. Avalie só o que você sabia no momento da decisão.
2. Calcule o preço e a equity contra o {{t:range|range}} do adversário (M2, M6).
3. Verifique se a jogada segue as regras do curso.
4. Analise também as mãos vencedoras: erros que compensaram custam o mesmo.

## Quando o resultado começa a significar algo

Em um estudo com cerca de {{n:skill.sample.m}} milhões de mãos online (estudo de 2015), a habilidade só começava a prevalecer depois de cerca de **{{n:skill.hands}}** mãos. Isso significa que os melhores {{n:skill.pct}} dos jogadores ficavam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} das comparações. Para diferenças menores de habilidade, são necessárias muitas vezes mais mãos. Portanto, o resultado de algumas {{t:session|sessões}} não diz qual estilo de jogo é melhor.

:::note Avaliação neste app
Por isso o app avalia as suas decisões, e não o resultado da mão. Quando o resultado e a decisão não batem, confie nas contas.
:::
