---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Reconheça o tilt antes que ele assuma suas decisões"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Pela terceira vez em uma hora, um adversário acerta no river uma carta que o salva. Você sente que o jogo é injusto e que alguém está contra você. Que tipo de tilt é esse, segundo a divisão desta lição?"
    options:
      - { text: "Tilt por injustiça", correct: true, why: "Bad beats, coolers e acertos do adversário no river dão a sensação de que o pôquer é injusto. Esse é um gatilho típico do tilt por injustiça." }
      - { text: "Tilt por erro", why: "O tilt por erro tem a ver com seus próprios erros. Aqui o que irrita você é a sorte, não a sua decisão." }
      - { text: "Tilt por desespero", why: "Desespero é uma forte necessidade de recuperar as perdas ({{t:session|sessões}} longas, {{t:stakes|limites}} mais altos). Aqui, por enquanto, trata-se da sensação de ter sido injustiçado." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "O mesmo adversário ataca os seus blinds pela quarta vez seguida. Você decide que, da próxima vez, vai {{t:raise|aumentar}} contra ele com qualquer mão, para mostrar para ele. Que tipo de tilt é esse?"
    options:
      - { text: "Tilt por vingança", correct: true, why: "Falta de respeito, a agressividade constante do adversário e a vontade de “mostrar para ele” são gatilhos do tilt por vingança. Quem passa a tomar a decisão é a vontade de revanche, não o cálculo." }
      - { text: "Tilt por achar que merece ganhar", why: "Esse tipo vem da convicção de que você merece ganhar porque é melhor. Aqui se trata de revanche contra um adversário específico." }
      - { text: "Não é tilt, é só adaptação a um adversário agressivo", why: "Adaptar-se significa defender com mais mãos, escolhidas com critério. “Com qualquer mão, para mostrar para ele” é emoção, não estratégia." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Você está no prejuízo e pensa: “Mais uma hora e, se não der certo, eu subo para um {{t:stakes|limite}} mais alto e recupero tudo de uma vez”. Que tipo de tilt é esse?"
    options:
      - { text: "Tilt por desespero", correct: true, why: "A necessidade de recuperar as perdas leva a {{t:session|sessões}} muito longas, a forçar a ação e a saltos de {{t:stakes|limite}} para cima. Esse é um sinal para parar de jogar." }
      - { text: "Tilt por ódio de perder", why: "Quase, mas aqui há também o plano de recuperar as perdas com um {{t:stakes|limite}} mais alto e jogando por mais tempo. Essas são características do desespero." }
      - { text: "Um plano sensato, porque um {{t:stakes|limite}} mais alto recupera as perdas mais rápido", why: "Um {{t:stakes|limite}} mais alto também aumenta as oscilações, e você está tomando decisões em mau estado. Subir de limite depois de uma perda é exatamente o oposto da gestão cuidadosa do {{t:bankroll}} (lição sobre bankroll e risco)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "Você {{t:fold|desistiu}} da melhor mão e, desde então, não consegue parar de pensar nisso. Você está com raiva de si mesmo e jogando cada vez pior. Que tipo de tilt é esse?"
    options:
      - { text: "Tilt por erro", correct: true, why: "A raiva dos próprios erros é o tilt por erro. A origem costuma ser a expectativa irrealista de que, enquanto aprende, você não vai cometer erros." }
      - { text: "Tilt por injustiça", why: "Aqui você não culpa a sorte, e sim a si mesmo. Isso é tilt por erro." }
      - { text: "Tilt por vingança", why: "A vingança é dirigida a um adversário. Aqui a raiva tem a ver com a sua decisão." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Você está perdendo para um jogador que, na sua opinião, joga muito mal, e pensa: “Eu estudo, ele não, eu deveria ganhar dele”. Que tipo de tilt é esse?"
    options:
      - { text: "Tilt por achar que merece ganhar", correct: true, why: "Acreditar que você merece ganhar por algum motivo faz a vitória parecer sua propriedade. Quando um adversário “que não merece” a leva, surge o tilt." }
      - { text: "Tilt por ódio de perder", why: "Esse tipo tem a ver com perder em geral. Aqui o ponto central é a convicção de que a vitória é sua por direito." }
      - { text: "Tilt por erro", why: "Não se trata de um erro seu, e sim da sensação de que você merece ganhar." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Depois de um bad beat, você sente a raiva crescer, mas ainda está jogando corretamente. O que você faz?"
    options:
      - { text: "Reaja agora: respire e use uma frase preparada, por exemplo “É {{t:variance}}, continue jogando bem”", correct: true, why: "O tilt se corrige enquanto ainda é pequeno e você ainda consegue pensar. Quando ele cresce, desliga a capacidade de pensar e o controle se torna impossível." }
      - { text: "Continue jogando até perceber o primeiro erro", why: "Nesse ponto o tilt já está maior e é mais difícil detê-lo. É mais fácil reagir aos primeiros sinais." }
      - { text: "Reprima a raiva e finja que ela não existe", why: "É melhor reconhecer a emoção e responder à causa dela com um pensamento concreto. Só reprimir não elimina a causa." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Há meia hora você está jogando mãos das quais normalmente {{t:fold|desiste}} e só pensa em recuperar o que perdeu. O que você faz?"
    options:
      - { text: "Encerre a {{t:session|sessão}}", correct: true, why: "Esses são sinais de que você já não consegue recuperar a clareza de pensamento. Nesse momento, o objetivo é parar o quanto antes, não ganhar o dinheiro de volta." }
      - { text: "Continue jogando, mas só as melhores mãos", why: "Nesse estado é difícil cumprir o que você decidiu, porque a emoção toma as decisões por você. É mais seguro parar." }
      - { text: "Suba de {{t:stakes|limite}} para recuperar mais rápido", why: "Isso é tilt por desespero em estado puro. Um {{t:stakes|limite}} maior com decisões piores acelera as perdas." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Você quer perceber o tilt mais cedo. Por onde você começa?"
    options:
      - { text: "Escrevendo um perfil: o que serve de gatilho para você, o que você pensa e sente, como seu jogo muda", correct: true, why: "Cada jogador entra em tilt de um jeito um pouco diferente e por motivos diferentes. O perfil permite reconhecer os sinais antes que o tilt cresça: não dá para controlar algo que você não entende." }
      - { text: "Jogando em {{t:stakes|limites}} mais altos para ficar mais resistente", why: "Mais pressão não ensina a reconhecer o tilt. Primeiro você precisa saber como ele se manifesta em você." }
      - { text: "Evitando todos os adversários que irritam você", why: "Não dá para evitar os gatilhos, porque bad beats e adversários agressivos sempre vão aparecer. O objetivo é reconhecer sua reação e responder a ela." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Seu jogo tem dias bons e dias ruins. Onde está o progresso duradouro mais rápido?"
    options:
      - { text: "Em melhorar seu pior jogo (C-game)", correct: true, why: "O progresso lembra o movimento de uma lagarta: um passo à frente na parte da frente (um A-game melhor) e um passo na parte de trás (um C-game menos desastroso). Eliminar os piores erros também libera atenção para aprender coisas novas." }
      - { text: "Só em aprimorar seu melhor jogo (A-game)", why: "O A-game é importante, mas é o C-game que custa mais caro. Sem melhorar os piores dias, o progresso conquistado na frente se perde facilmente atrás." }
      - { text: "Em lugar nenhum, a forma é questão de sorte", why: "Dá para reduzir a amplitude da forma: jogadores que controlam bem o tilt têm uma distribuição mais estreita do nível de jogo (revisão de 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Como você verifica se o seu trabalho no {{t:mental-game}}, ou seja, em lidar com tilt, emoções e concentração, está dando resultado?"
    options:
      - { text: "Compare suas piores {{t:session|sessões}} com as piores anteriores", correct: true, why: "Compare semelhante com semelhante: seu pior jogo com o pior jogo anterior. O progresso também aparece quando você reconhece o tilt mais rápido e encerra a {{t:session|sessão}} mais cedo." }
      - { text: "Olhe o resultado da última semana", why: "Uma semana de resultados é principalmente {{t:variance}} (lição sobre {{t:variance}}). A qualidade do seu jogo nos piores dias diz mais." }
      - { text: "Compare sua melhor {{t:session|sessão}} com a pior", why: "Essa comparação mostra apenas a amplitude, não o progresso. Compare seu pior jogo com o pior anterior." }
---
Tilt é a perda de controle sob o efeito de emoções negativas, geralmente depois de bad beats ou de uma longa sequência de perdas. Ele termina em decisões ruins e em uma perda muito maior que o normal. Não é raro: em uma pesquisa por questionário, {{n:tilt.severe}} dos jogadores admitiram ter tido um tilt forte pelo menos uma vez nos últimos seis meses.

## Sete tipos de tilt

Um livro reconhecido sobre psicologia do pôquer descreve o tilt como um problema de raiva e distingue {{n:tilt.types}} tipos:

| Tipo | O que o dispara |
|---|---|
| Por sequência de cartas ruins | Outros tipos de tilt voltam com tanta frequência que a mente não consegue se recuperar antes da próxima {{t:session|sessão}} |
| Por injustiça | Bad beats, coolers, acertos do adversário no river |
| Por ódio de perder | A própria derrota, mesmo quando você sabe que é {{t:variance}} |
| Por erro | Seus próprios erros |
| Por achar que merece ganhar | A convicção de que você merece ganhar |
| Por vingança | Falta de respeito, agressividade constante do adversário |
| Por desespero | A necessidade de recuperar as perdas: maratonas, {{t:stakes|limites}} mais altos |

## Reconheça os sinais

Cada um entra em tilt de um jeito um pouco diferente. Escreva seu **perfil de tilt**: o que o dispara, o que você pensa e sente nesse momento, o que você faz na mesa (por exemplo, {{t:call|paga}} com mãos demais, {{t:raise|aumenta}} por vingança). Quanto melhor você conhecer seus sinais, mais cedo vai percebê-los.

## Reaja enquanto consegue pensar

Quando o tilt cresce, ele desliga a capacidade de pensar. Por isso, você reage aos primeiros sinais:

1. Uma respiração que dá um momento de distância da emoção.
2. Uma frase preparada que responde à causa, por exemplo: “Jogadores mais fracos precisam ganhar às vezes, isso é {{t:variance}}. Continue jogando bem”.
3. Se você já não consegue pensar com clareza, encerra a {{t:session|sessão}}. Também é progresso encerrar mais cedo, por um bom motivo.

## A-game e C-game

Seu jogo tem uma amplitude: do melhor (A-game) ao pior (C-game). O progresso lembra o movimento de uma lagarta: um passo à frente na parte da frente, quando o melhor jogo fica melhor, e um passo na parte de trás, quando o pior fica menos desastroso. O C-game é o que custa mais caro, por isso você começa por ele.

:::note Quando é mais do que tilt
Se você joga por mais tempo do que planeja, tenta recuperar as perdas ou joga com dinheiro que não pode perder, leia o cartão sobre jogo responsável na lição sobre bankroll.
:::
