### content/pt/lessons/m12-l2-decyzja-wynik.md:29
PRZED:     prompt: "Turn. Tem um {{t:flush-draw|projeto de cor}} limpo ({{n:outs.flush}} outs), o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.quarter}}. {{t:call|Paga}}, a {{t:flush|cor}} não sai e perde {{n:ex.bet.quarter}}. Como avalia o {{t:call|call}}?"
PO:        prompt: "Turn. Tem um {{t:flush-draw|flush draw}} limpo ({{n:outs.flush}} outs), o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.quarter}}. {{t:call|Paga}}, o {{t:flush|flush}} não sai e perde {{n:ex.bet.quarter}}. Como avalia o {{t:call|call}}?"
### content/pt/lessons/m12-l2-decyzja-wynik.md:32
PRZED:       - { text: "Foi mau, porque a {{t:flush|cor}} não saiu", why: "A {{t:flush|cor}} só sai em cerca de {{n:odds.flush.turn-river}} dos casos, por isso falhar era o resultado mais provável. Avalia a decisão pelo preço, e o preço era bom." }
PO:          - { text: "Foi mau, porque o {{t:flush|flush}} não saiu", why: "O {{t:flush|flush}} só sai em cerca de {{n:odds.flush.turn-river}} dos casos, por isso falhar era o resultado mais provável. Avalia a decisão pelo preço, e o preço era bom." }
### content/pt/lessons/m12-l2-decyzja-wynik.md:33
PRZED:       - { text: "Só seria bom se a {{t:flush|cor}} tivesse saído", why: "É a definição de avaliar pelo resultado. A mesma decisão não muda de qualidade consoante a carta que saiu depois." }
PO:          - { text: "Só seria bom se o {{t:flush|flush}} tivesse saído", why: "É a definição de avaliar pelo resultado. A mesma decisão não muda de qualidade consoante a carta que saiu depois." }
### content/pt/lessons/m12-l2-decyzja-wynik.md:38
PRZED:     prompt: "Turn. {{t:flush-draw|Projeto de cor}} limpo, o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. {{t:call|Paga}} e a {{t:flush|cor}} sai no river. Como avalia o {{t:call|call}}?"
PO:        prompt: "Turn. {{t:flush-draw|Flush draw}} limpo, o {{t:pot|pote}} é de {{n:ex.pot}} e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. {{t:call|Paga}} e o {{t:flush|flush}} sai no river. Como avalia o {{t:call|call}}?"
### content/pt/lessons/m12-l2-decyzja-wynik.md:42
PRZED:       - { text: "Foi bom, porque a {{t:flush|cor}} é a melhor mão", why: "A força da mão depois de acertar não muda o preço. O que conta é a comparação: {{n:odds.flush.turn-river}} de probabilidade contra {{n:eq.bet-pot}} necessários." }
PO:          - { text: "Foi bom, porque o {{t:flush|flush}} é a melhor mão", why: "A força da mão depois de acertar não muda o preço. O que conta é a comparação: {{n:odds.flush.turn-river}} de probabilidade contra {{n:eq.bet-pot}} necessários." }
### content/pt/lessons/m12-l2-decyzja-wynik.md:49
PRZED:       - { text: "Com a informação que tinha, a decisão tinha {{t:expected-value|EV}} positivo?", correct: true, why: "É a única pergunta que distingue um erro do azar. Calcula o preço, a equity contra a {{t:range|gama de mãos}} do adversário e o que sabia no momento da decisão." }
PO:          - { text: "Com a informação que tinha, a decisão tinha {{t:expected-value|EV}} positivo?", correct: true, why: "É a única pergunta que distingue um erro do azar. Calcula o preço, a equity contra o {{t:range|range}} do adversário e o que sabia no momento da decisão." }
### content/pt/lessons/m12-l2-decyzja-wynik.md:97
PRZED: Ir all-in com um {{t:pair|par}} de ases contra um {{t:pair|par}} de reis é a melhor decisão possível e, ainda assim, perde em cerca de **{{n:res.kk-wins}}** dos casos. Por outro lado, um {{t:call|call}} com um {{t:flush-draw|projeto de cor}} pelo {{t:pot|pote}} inteiro no turn é mau (precisa de {{n:eq.bet-pot}}, tem cerca de {{n:odds.flush.turn-river}}) e, mesmo assim, ganha aproximadamente uma vez em cada cinco.
PO:    Ir all-in com um {{t:pair|par}} de ases contra um {{t:pair|par}} de reis é a melhor decisão possível e, ainda assim, perde em cerca de **{{n:res.kk-wins}}** dos casos. Por outro lado, um {{t:call|call}} com um {{t:flush-draw|flush draw}} pelo {{t:pot|pote}} inteiro no turn é mau (precisa de {{n:eq.bet-pot}}, tem cerca de {{n:odds.flush.turn-river}}) e, mesmo assim, ganha aproximadamente uma vez em cada cinco.
### content/pt/lessons/m12-l2-decyzja-wynik.md:106
PRZED: 2. Calcule o preço e a equity contra a {{t:range|gama de mãos}} do adversário (M2, M6).
PO:    2. Calcule o preço e a equity contra o {{t:range|range}} do adversário (M2, M6).
### content/pt/lessons/m12-l3-tilt.md:118
PRZED: Cada pessoa entra em tilt de forma um pouco diferente. Escreva o seu **perfil de tilt**: o que o desencadeia, o que pensa e sente nesse momento, o que faz à mesa (p. ex. {{t:call|paga}} com um leque demasiado largo, {{t:raise|aumenta}} por vingança). Quanto melhor conhecer os seus sinais, mais cedo os detetará.
PO:    Cada pessoa entra em tilt de forma um pouco diferente. Escreva o seu **perfil de tilt**: o que o desencadeia, o que pensa e sente nesse momento, o que faz à mesa (p. ex. {{t:call|paga}} com um range demasiado largo, {{t:raise|aumenta}} por vingança). Quanto melhor conhecer os seus sinais, mais cedo os detetará.
### content/pt/lessons/m12-l4-bankroll.md:51
PRZED:       - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais depressa", why: "Isso é tilt por desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta bruscamente o {{t:risk-of-ruin|risco de ruína}}." }
PO:          - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais depressa", why: "Isso é tilt de desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta bruscamente o {{t:risk-of-ruin|risco de ruína}}." }
### content/pt/lessons/m12-l4-bankroll.md:59
PRZED:       - { text: "Desce de {{t:stakes|limite}} de imediato", correct: true, why: "Também é uma boa decisão: algumas fontes aconselham descer logo após perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Descer antes de chegar a metade do bankroll não é um erro, mas descer depois já é." }
PO:          - { text: "Desce de {{t:stakes|limite}} de imediato", correct: true, why: "Também é uma boa decisão: algumas fontes aconselham descer logo após perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Descer antes de o bankroll chegar à metade não é um erro, mas descer só depois disso já é um erro." }
### content/pt/lessons/m12-l4-bankroll.md:94
PRZED:       - { text: "Mais ou menos metade-metade, mas nunca menos de {{n:study.min}} de estudo", correct: true, why: "Também quando ganha, o ideal é cerca de {{n:study.winner}} de estudo, e o mínimo é {{n:study.min}}." }
PO:          - { text: "Mais ou menos meio a meio, mas nunca menos de {{n:study.min}} de estudo", correct: true, why: "Também quando ganha, o ideal é cerca de {{n:study.winner}} de estudo, e o mínimo é {{n:study.min}}." }
### content/pt/exams/m12.yaml:36
PRZED:       - { text: "Não: o intervalo de {{n:var.conf95}} é de ± cerca de {{n:exam.m12.style.ci}}; avalia as novas jogadas na revisão de mãos", correct: true, why: "O erro do winrate após {{n:exam.m12.style.blocks}} blocos é {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, pelo que o intervalo é ± {{n:var.z95}} × {{n:exam.m12.style.se}} ≈ ± {{n:exam.m12.style.ci}}. Um resultado assim cabe tanto num estilo melhor como num pior. A estratégia decide-se pela revisão das decisões." }
PO:          - { text: "Não: o intervalo de {{n:var.conf95}} é de cerca de ± {{n:exam.m12.style.ci}}; avalia as novas jogadas na revisão de mãos", correct: true, why: "O erro do winrate após {{n:exam.m12.style.blocks}} blocos é {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, pelo que o intervalo é ± {{n:var.z95}} × {{n:exam.m12.style.se}} ≈ ± {{n:exam.m12.style.ci}}. Um resultado assim cabe tanto num estilo melhor como num pior. A estratégia decide-se pela revisão das decisões." }
### content/pt/exams/m12.yaml:43
PRZED:     prompt: "Turn. Tem um {{t:flush-draw}} limpo e o {{t:pot|pote}} é de {{n:ex.pot}}. O adversário vai all-in por {{n:ex.bet.half}}, e já não é possível ganhar mais nada. Faz {{t:call|call}}, o {{t:flush}} sai no river e ganha. Como avalia o {{t:call}}?"
PO:        prompt: "Turn. Tem um {{t:flush-draw}} limpo e o {{t:pot|pote}} é de {{n:ex.pot}}. O adversário vai all-in por {{n:ex.bet.half}}, e já não é possível ganhar mais nada. {{t:call|Paga}}, o {{t:flush}} sai no river e ganha. Como avalia o {{t:call}}?"
### content/pt/exams/m12.yaml:54
PRZED:       - { text: "Tilt por odiar perder", correct: true, why: "O gatilho é a própria derrota, mesmo quando sabe que é {{t:variance}}. Não culpa a sorte, a si próprio nem o adversário." }
PO:          - { text: "Tilt de ódio a perder", correct: true, why: "O gatilho é a própria derrota, mesmo quando sabe que é {{t:variance}}. Não culpa a sorte, a si próprio nem o adversário." }
### content/pt/exams/m12.yaml:55
PRZED:       - { text: "Tilt por injustiça", why: "Este tipo é desencadeado pela sensação de que o póquer é injusto: bad beats, coolers, adversários a acertar no river. Aqui sabe que tudo decorreu normalmente, e o que lhe causa irritação é a própria derrota." }
PO:          - { text: "Tilt de injustiça", why: "Este tipo é desencadeado pela sensação de que o póquer é injusto: bad beats, coolers, adversários a acertar no river. Aqui sabe que tudo decorreu normalmente, e o que lhe causa irritação é a própria derrota." }
### content/pt/exams/m12.yaml:56
PRZED:       - { text: "Tilt por erro", why: "O tilt por erro é a irritação com os próprios erros. Aqui sabe que jogou bem." }
PO:          - { text: "Tilt de erro", why: "O tilt de erro é a irritação com os próprios erros. Aqui sabe que jogou bem." }
### content/pt/exams/m12.yaml:62
PRZED:     prompt: "Depois de perder três {{t:pot|potes}} grandes, já não consegue avaliar se o seu último {{t:call}} foi bom, e pensa em subir para um {{t:stakes|nível}} mais alto para recuperar as perdas mais depressa. O que faz?"
PO:        prompt: "Depois de perder três {{t:pot|potes}} grandes, já não consegue avaliar se o seu último {{t:call}} foi bom, e pensa em subir para um {{t:stakes|limite}} mais alto para recuperar as perdas mais depressa. O que faz?"
### content/pt/exams/m12.yaml:65
PRZED:       - { text: "Respiro fundo algumas vezes e continuo a jogar num {{t:stakes|nível}} mais alto", why: "A respiração ajuda aos primeiros sinais de tilt, enquanto ainda pensa com clareza. Aqui o tilt já cresceu, e um {{t:stakes|nível}} mais alto só aumenta as perdas." }
PO:          - { text: "Respiro fundo algumas vezes e continuo a jogar num {{t:stakes|limite}} mais alto", why: "A respiração ajuda nos primeiros sinais de tilt, enquanto ainda pensa com clareza. Aqui o tilt já cresceu, e um {{t:stakes|limite}} mais alto só aumenta as perdas." }
### content/pt/exams/m12.yaml:66
PRZED:       - { text: "Continuo a jogar no mesmo {{t:stakes|nível}}, mas apenas com mãos fortes", why: "Quando já não consegue avaliar as decisões com calma, continuar a jogar é jogar no seu pior nível de jogo (C-game), independentemente das mãos que escolhe. Termina a {{t:session|sessão}}." }
PO:          - { text: "Continuo a jogar no mesmo {{t:stakes|limite}}, mas apenas com mãos fortes", why: "Quando já não consegue avaliar as decisões com calma, continuar a jogar é jogar no seu pior nível de jogo (C-game), independentemente das mãos que escolhe. Termina a {{t:session|sessão}}." }
### content/pt/exams/m12.yaml:71
PRZED:     prompt: "Ganha {{n:dd.wr-low}} com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}} e tem {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Qual é o risco de perder todo o bankroll se nunca descer de {{t:stakes|nível}}?"
PO:        prompt: "Ganha {{n:dd.wr-low}} com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}} e tem {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Qual é o risco de perder todo o bankroll se nunca descer de {{t:stakes|limite}}?"
### content/pt/exams/m12.yaml:82
PRZED:       - { text: "Desço um {{t:stakes|nível}}", correct: true, why: "O limiar de descida é metade do número de {{t:buy-in|buy-ins}} definido: com {{n:br.bi.beginner}}, são {{n:exam.m12.md.half}}. Tem {{n:exam.m12.md.now}}, ou seja, menos. Num {{t:stakes|nível}} duas vezes mais baixo, o mesmo bankroll volta a corresponder a quase o número completo de {{t:buy-in|buy-ins}} desse nível. Esta é uma indicação geral; se o jogo deixar de estar sob controlo, consulte o ecrã «Ajuda»." }
PO:          - { text: "Desço um {{t:stakes|limite}}", correct: true, why: "O limiar de descida é metade do número de {{t:buy-in|buy-ins}} definido: com {{n:br.bi.beginner}}, são {{n:exam.m12.md.half}}. Tem {{n:exam.m12.md.now}}, ou seja, menos. Num {{t:stakes|limite}} duas vezes mais baixo, o mesmo bankroll volta a corresponder a quase o número completo de {{t:buy-in|buy-ins}} desse limite. Esta é uma indicação geral; se o jogo deixar de estar sob controlo, consulte o ecrã «Ajuda»." }
### content/pt/exams/m12.yaml:84
PRZED:       - { text: "Fico e jogo mais para recuperar as perdas", why: "Tentar recuperar as perdas é um sinal de alerta, e não um plano. O bankroll caiu abaixo do limiar de {{n:exam.m12.md.half}}, pelo que desce um {{t:stakes|nível}}." }
PO:          - { text: "Fico e jogo mais para recuperar as perdas", why: "Tentar recuperar as perdas é um sinal de alerta, e não um plano. O bankroll caiu abaixo do limiar de {{n:exam.m12.md.half}}, pelo que desce um {{t:stakes|limite}}." }
### content/pt/rules.yaml:989
PRZED:   because: "mesmo os melhores {{n:skill.pct}} dos jogadores só ficam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} dos casos após cerca de {{n:skill.hands}} mãos, e diferenças menores de habilidade precisam de muito mais mãos"
PO:      because: "mesmo os melhores {{n:skill.pct}} dos jogadores só ao fim de cerca de {{n:skill.hands}} mãos ficam à frente dos piores {{n:skill.pct}} em cerca de {{n:skill.ahead}} dos casos, e diferenças menores de habilidade precisam de muito mais mãos"
### content/pt/rules.yaml:1028
PRZED:   then: "desce um {{t:stakes|nível}}, o mais tardar, nesse momento, e volta a subir, o mais cedo, quando tiver o bankroll completo em {{t:buy-in|buy-ins}} do {{t:stakes|nível}} superior"
PO:      then: "desce um {{t:stakes|limite}} o mais tardar nesse momento, e só volta a subir quando tiver o bankroll completo em {{t:buy-in|buy-ins}} do {{t:stakes|limite}} superior"
### content/pt/rules.yaml:1036
PRZED:   then: "no início dedica cerca de {{n:study.beginner}} do tempo ao estudo; quando já ganha no seu {{t:stakes|nível}}, cerca de {{n:study.winner}}, mas nunca menos de {{n:study.min}}"
PO:      then: "no início dedica cerca de {{n:study.beginner}} do tempo ao estudo; quando já ganha no seu {{t:stakes|limite}}, cerca de {{n:study.winner}}, mas nunca menos de {{n:study.min}}"
### content/pt/rules.yaml:1037
PRZED:   because: "no início é quando tem mais para recuperar, e quando já ganha no seu {{t:stakes|nível}} pode jogar mais"
PO:      because: "no início é quando tem mais terreno a recuperar, e quando já ganha no seu {{t:stakes|limite}} pode jogar mais"