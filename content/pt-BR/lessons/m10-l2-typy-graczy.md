---
id: m10.l2
module: m10
order: 2
title: "Tipos de jogador"
sub: "Nit, reg, jogador passivo, maníaco"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Depois de {{n:hud.ex.reg.hands}} mãos, o adversário tem {{t:vpip}} {{n:hud.ex.passive.vpip}} e {{t:pfr}} {{n:hud.ex.passive.pfr}}. O que isso diz sobre o jogo dele antes do flop?"
    options:
      - { text: "Ele é passivo: com a maioria das mãos ele só {{t:call|paga}} ou dá limp", correct: true, why: "A diferença {{t:vpip}} − {{t:pfr}} é de {{n:hud.ex.passive.gap}} pontos, acima do limiar de {{n:hud.gap.passive}}. Ele joga bastante mãos, mas coloca a maioria delas no {{t:pot|pote}} sem {{t:raise|aumento}}." }
      - { text: "Ele é agressivo, porque joga muitas mãos", why: "O número de mãos ({{t:vpip}}) diz o quanto ele joga solto, não o quanto é agressivo. A agressão é mostrada pelo {{t:pfr}} e pela diferença entre os dois." }
      - { text: "É um {{t:nit}}", why: "Um {{t:nit}} joga até cerca de {{n:hud.vpip.nit-max}} das mãos; este jogador joga claramente mais." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Segundo dados da população dos microlimites online (NL25), os {{t:recreational|jogadores recreativos}} chegam ao showdown em {{n:mda.rec.wtsd}} dos casos e vencem {{n:mda.rec.wsd}} dos showdowns; os {{t:regular|regulares}}, {{n:mda.reg.wtsd}} e {{n:mda.reg.wsd}}. O que se conclui disso?"
    options:
      - { text: "Os {{t:recreational|jogadores recreativos}} pagam até o fim com mais frequência e perdem com mais frequência: {{t:call|pagam}} com mãos mais fracas", correct: true, why: "Eles chegam ao showdown com mais frequência e o vencem menos, então chegam lá com mãos mais fracas. Contra eles, você aposta {{t:value|por valor}} com mais mãos e {{t:bluff|blefa}} menos." }
      - { text: "Os {{t:recreational|jogadores recreativos}} {{t:bluff|blefam}} com mais frequência", why: "Esses números falam de com que frequência eles chegam ao showdown e com o quê, não de {{t:bluff|blefes}}. Eles vencem menos showdowns porque {{t:call|pagam}} com mãos mais fracas." }
      - { text: "Nada: uma diferença de poucos pontos é ruído", why: "São dados de toda a população desse {{t:stakes|limite}} ao longo de {{n:mda.period.months}} meses, e não de algumas dezenas de mãos de um só jogador. A diferença é consistente em NL25, NL50 e NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Você apostou no flop e no turn, e o adversário {{t:call|pagou}}. Ele é um {{t:recreational|jogador recreativo}} passivo ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} mãos). Ele {{t:check|dá check}}. O que você faz com {{t:top-pair}} e o segundo melhor kicker?"
    options:
      - { text: "Aposto {{t:value|por valor}}", correct: true, why: "Esse tipo de jogador {{t:call|paga}} até o fim com reis mais fracos, oitos e {{t:pair|pares}} de mão. Mais da metade dos {{t:call|calls}} dele são mãos piores que a sua, então a aposta dá lucro (limiar do módulo 8)." }
      - { text: "{{t:check|Dou check}} para não dar de cara com uma mão melhor", why: "Contra um jogador que {{t:call|paga}} com mãos mais fracas, o {{t:check}} abre mão de valor. Mãos melhores às vezes vão pagar, mas há mais {{t:call|calls}} de mãos piores." }
      - { text: "Aposto o {{t:pot|pote}} inteiro como {{t:bluff|blefe}}", why: "Com {{t:top-pair}} isso não é {{t:bluff|blefe}}: você ganha de muitas mãos que vão {{t:call|pagar}}. A aposta é {{t:value|por valor}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, seu {{t:straight-draw|projeto de sequência}} não fechou. O adversário é um {{t:recreational|jogador recreativo}} passivo ({{t:wtsd}} {{n:mda.rec.wtsd}}) que {{t:call|pagou}} no flop e no turn. Ele {{t:check|dá check}}. O que você faz?"
    options:
      - { text: "{{t:check|Dou check}} e entrego o {{t:pot|pote}}", correct: true, why: "Um {{t:bluff|blefe}} só dá lucro quando o adversário {{t:fold|desiste}} com mais frequência que o {{t:alpha}} da sua aposta. Um jogador que {{t:call|pagou}} duas {{t:street|streets}} e chega muito ao showdown raramente {{t:fold|desiste}} no river." }
      - { text: "Aposto alto, porque não tenho valor de showdown", why: "Na base (módulo 8), um {{t:bluff|blefe}} assim pode ser bom, mas contra esse jogador faltam {{t:fold|folds}}: o {{t:bluff|blefe}} perde dinheiro." }
      - { text: "Aposto pouco para o {{t:bluff|blefe}} sair mais barato", why: "Uma aposta menor precisa de menos {{t:fold|folds}}, mas uma mão que {{t:call|pagou}} duas {{t:street|streets}} costuma {{t:call|pagar}} também uma aposta pequena. Melhor entregar o {{t:pot|pote}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "Você {{t:open|abre}} do {{t:cutoff|CO}}. No Button está um {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} mãos. Ele te dá 3-bet. O que você faz com AJo?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Quem joga tão poucas mãos dá 3-bet principalmente com as mais fortes: AQ, AK e {{t:pair|pares}} altos, que dominam AJ. Contra ele, você {{t:fold|desiste}} com mais frequência que na base do módulo 4." }
      - { text: "{{t:call|Pago}}, porque AJ é uma mão forte", why: "AJ é forte contra um {{t:range}} amplo. Contra o 3-bet de um jogador com {{t:vpip}} {{n:hud.ex.nit.vpip}}, muitas vezes está dominado e fora de {{t:position|posição}}." }
      - { text: "Dou 4-bet", why: "Um 4-bet com AJ contra um {{t:nit}} joga contra um {{t:range}} que o domina e raramente {{t:fold|desiste}}. Não é nem {{t:value|valor}} nem um bom {{t:bluff|blefe}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Você está no Button, e todos {{t:fold|desistiram}}. No {{t:big-blind}} está um {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} depois de {{n:hud.ex.reg.hands}} mãos). Como você ajusta sua {{t:open|abertura}}?"
    options:
      - { text: "{{t:open|Abro}} mais amplo que na base", correct: true, why: "O {{t:nit}} defende o blind de forma estreita, então sua {{t:open|abertura}} ganha na hora com mais frequência, mesmo com uma mão fraca." }
      - { text: "{{t:open|Abro}} mais fechado, porque o {{t:nit}} tem mãos fortes", why: "O {{t:nit}} tem mãos fortes quando joga. No {{t:big-blind}} ele geralmente {{t:fold|desiste}}, e esse é o seu lucro." }
      - { text: "Nada muda: o tipo de jogador não afeta o roubo de blinds", why: "Afeta. O lucro do roubo depende de com que frequência o blind {{t:fold|desiste}}, e o {{t:nit}} {{t:fold|desiste}} com frequência." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "O adversário é um {{t:maniac|maníaco}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} depois de {{n:hud.ex.reg.hands}} mãos. Ele apostou em todas as {{t:street|streets}} e, no river, {{t:bet|aposta}} o {{t:pot|pote}} inteiro. O que você faz com {{t:top-pair}} e kicker fraco?"
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Contra um jogador que {{t:bluff|blefa}} mais que na base, mãos no limite do {{t:call}} dão lucro. O {{t:pair|par}} mais alto ganha dos {{t:bluff|blefes}} dele e de parte do valor." }
      - { text: "{{t:fold|Desisto}}, porque uma aposta do {{t:pot|pote}} inteiro significa mão forte", why: "Vindo de um jogador que joga quase toda mão com {{t:raise|aumento}} e aposta em toda {{t:street}}, uma aposta grande contém muitos {{t:bluff|blefes}}. Ao {{t:fold|desistir}}, você o paga por ser agressivo." }
      - { text: "{{t:raise|Aumento}} all-in", why: "O {{t:raise|aumento}} faz os {{t:bluff|blefes}} {{t:fold|desistirem}} e as mãos melhores {{t:call|pagarem}}. Com uma mão que pega {{t:bluff|blefes}}, basta {{t:call|pagar}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Você está jogando contra um {{t:maniac|maníaco}}. No turn você tem uma mão fraca, sem chance de melhorar, e ele {{t:check|dá check}}. O que você faz?"
    options:
      - { text: "{{t:check|Dou check}}: {{t:bluff|blefar}} contra um {{t:maniac|maníaco}} raramente funciona", correct: true, why: "O {{t:maniac|maníaco}} raramente {{t:fold|desiste}} e muitas vezes {{t:raise|aumenta}}. Contra ele, você ganha dinheiro {{t:call|pagando}} com mãos mais fortes, não com {{t:bluff|blefes}}." }
      - { text: "Aposto, porque o {{t:check}} de um {{t:maniac|maníaco}} significa fraqueza", why: "Pode ser, mas o {{t:maniac|maníaco}} muitas vezes {{t:raise|aumenta}} com qualquer mão. O {{t:bluff|blefe}} precisa de {{t:fold|folds}}, e ele dá poucos." }
      - { text: "Aposto all-in para ele não poder {{t:raise|aumentar}}", why: "Você arrisca o stack inteiro para ganhar um {{t:pot|pote}} pequeno contra um jogador que raramente {{t:fold|desiste}}. É o jeito mais caro de {{t:bluff|blefar}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
As estatísticas da lição anterior formam alguns perfis típicos. O tipo de jogador diz para que lado ele se afasta da base: joga mãos de menos, mãos demais, {{t:call|paga}} com frequência demais ou {{t:raise|aumenta}} com frequência demais.

## Dois números, quatro tipos

Você identifica o tipo pelo {{t:vpip}} e pela diferença {{t:vpip}} − {{t:pfr}} (6-max, pelo menos cerca de {{n:hud.hands.vpip.low}} mãos):

| Tipo | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Erro em relação à base |
|---|---|---|---|
| {{t:nit|Nit}} | até cerca de {{n:hud.vpip.nit-max}} | pequena | joga mãos de menos |
| {{t:regular}} ({{t:tag}}, {{t:lag}}) | cerca de {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | pequena | perto da base |
| {{t:recreational|jogador recreativo}} passivo | a partir de cerca de {{n:hud.vpip.loose}} | mais de {{n:hud.gap.passive}} pontos | mãos demais, {{t:call|paga}} com frequência demais |
| {{t:maniac|maníaco}} | a partir de cerca de {{n:hud.vpip.loose}} | até cerca de {{n:hud.gap.aggressive}} pontos | mãos demais, {{t:raise|aumenta}} com frequência demais |

O jogador passivo com diferença grande também é chamado de {{t:calling-station}}. Entre os tipos há zonas de transição (por exemplo, um {{t:vpip}} de dez e poucos por cento, ou um jogador solto com diferença de poucos pontos): ali você não atribui um tipo, mas olha as estatísticas seguintes.

## O que dizem os dados da população

Uma base pública de estatísticas traz as estatísticas médias dos jogadores de uma grande sala online, NL25 6-max, de todas as mãos dos últimos {{n:mda.period.months}} meses. Nela, {{t:regular|regulares}} são jogadores com {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} e resultado acima de {{n:mda.reg.def.wr}}, e {{t:recreational|jogadores recreativos}} são os com {{t:vpip}} acima de {{n:mda.rec.def}} e resultado abaixo de {{n:mda.rec.def.wr}}:

| Estatística | {{t:regular|Regulares}} | {{t:recreational|Jogadores recreativos}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdowns vencidos | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Resultado | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

Os {{t:recreational|jogadores recreativos}} têm diferença {{t:vpip}} − {{t:pfr}} de {{n:mda.rec.gap.pp}} pontos, ou seja, são passivos. Eles chegam ao showdown com mais frequência e o vencem menos: {{t:call|pagam}} com mãos mais fracas. Também raramente {{t:fold|desistem}} diante de um 3-bet. Em NL50 e NL100 os números são quase os mesmos.

## O {{t:recreational|jogador recreativo}} passivo

A base do módulo 8 não muda: você aposta {{t:value|por valor}} quando mais da metade das mãos que vão {{t:call|pagar}} são piores, e o {{t:bluff|blefe}} dá lucro quando o adversário {{t:fold|desiste}} com mais frequência que o {{t:alpha}}. O que muda é o adversário: ele {{t:call|paga}} com mais mãos fracas. Por isso:

- você aposta {{t:value|por valor}} com mais mãos, inclusive mais finas, por exemplo {{t:top-pair}} com kicker mais fraco em três {{t:street|streets}};
- você {{t:bluff|blefa}} menos, sobretudo no river: faltam os {{t:fold|folds}} com os quais o {{t:bluff|blefe}} daria lucro.

## {{t:nit|Nit}} e {{t:maniac|maníaco}}

**O {{t:nit|nit}}** joga só mãos fortes. Quando ele {{t:raise|aumenta}} ou dá 3-bet, as mãos da parte de baixo do seu {{t:range}} de {{t:call}} ficam dominadas com mais frequência, então você {{t:fold|desiste}} com elas mais vezes que na base do módulo 4. Quando ele está no blind, você rouba mais, porque ele raramente defende.

**O {{t:maniac|maníaco}}** joga muitas mãos e {{t:raise|aumenta}} com quase todas. As apostas dele contêm mais {{t:bluff|blefes}} que na base, então você {{t:call|paga}} com as mãos no limite do {{t:call}}, deixa ele apostar quando você tem mãos muito fortes e não {{t:bluff|blefa}}: ele raramente {{t:fold|desiste}}.

:::note De onde vêm esses limiares
Os limiares dos tipos são convenções de treinadores (dois materiais de treinamento, cash 6-max online): usamos a parte em comum ou um intervalo que abrange as duas fontes. Os dados da população vêm de uma base pública de estatísticas (uma grande sala online, NL25–NL100, todas as mãos dos {{n:mda.period.months}} meses antes de outubro de 2026; o site não informa o número de mãos). Identificar o tipo de um {{t:nit|nit}} ou de um {{t:maniac|maníaco}} depende das estatísticas de um adversário específico, e não de dados sobre a população inteira, por isso exige amostra.
:::
