---
id: m10.l2
module: m10
order: 2
title: "Tipos de jogadores"
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
    prompt: "Após {{n:hud.ex.reg.hands}} mãos, o adversário tem {{t:vpip}} {{n:hud.ex.passive.vpip}} e {{t:pfr}} {{n:hud.ex.passive.pfr}}. O que diz isto sobre o seu jogo antes do flop?"
    options:
      - { text: "É passivo: na maioria das mãos limita-se a {{t:call|pagar}} ou a fazer limp", correct: true, why: "A diferença {{t:vpip}} − {{t:pfr}} é de {{n:hud.ex.passive.gap}} pontos, acima do limiar de {{n:hud.gap.passive}}. Joga bastantes mãos, mas coloca a maioria delas no {{t:pot|pote}} sem {{t:raise|aumento}}." }
      - { text: "É agressivo, porque joga muitas mãos", why: "O número de mãos ({{t:vpip}}) indica quão solto joga, e não quão agressivo. A agressividade é indicada pelo {{t:pfr}} e pela diferença entre os dois." }
      - { text: "É um {{t:nit}}", why: "Um {{t:nit}} joga até cerca de {{n:hud.vpip.nit-max}} das mãos; este jogador joga claramente mais." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Segundo dados da população dos microlimites online (NL25), os {{t:recreational|jogadores recreativos}} chegam ao showdown em {{n:mda.rec.wtsd}} dos casos e ganham {{n:mda.rec.wsd}} dos showdowns; os {{t:regular|regulares}}, {{n:mda.reg.wtsd}} e {{n:mda.reg.wsd}}. O que se conclui daqui?"
    options:
      - { text: "Os {{t:recreational|jogadores recreativos}} pagam até ao fim e perdem com mais frequência: {{t:call|pagam}} com mãos mais fracas", correct: true, why: "Chegam ao showdown com mais frequência e ganham-no com menos frequência, por isso lá chegam com mãos mais fracas. Contra eles, aposta {{t:value|por valor}} com mais mãos e {{t:bluff|faz bluff}} menos." }
      - { text: "Os {{t:recreational|jogadores recreativos}} {{t:bluff|fazem bluff}} com mais frequência", why: "Estes números dizem respeito à frequência com que chegam ao showdown e com quê, e não aos {{t:bluff|bluffs}}. Ganham menos showdowns porque {{t:call|pagam}} com mãos mais fracas." }
      - { text: "Nada: uma diferença de poucos pontos é ruído", why: "São dados de toda a população deste {{t:stakes|limite}} ao longo de {{n:mda.period.months}} meses, e não de algumas dezenas de mãos de um só jogador. A diferença é consistente em NL25, NL50 e NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Apostou no flop e no turn, e o adversário {{t:call|pagou}}. O adversário é um {{t:recreational|jogador recreativo}} passivo ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} mãos). {{t:check|Passa}}. O que faz com {{t:top-pair|top pair}} e o segundo melhor kicker?"
    options:
      - { text: "Aposto {{t:value|por valor}}", correct: true, why: "Este tipo de jogador {{t:call|paga}} até ao fim com reis mais fracos, oitos e {{t:pair|pares}} de mão. Mais de metade dos seus {{t:call|pagamentos}} são mãos piores do que a sua, por isso a aposta dá lucro (o limiar do módulo 8)." }
      - { text: "{{t:check|Passo}} para não dar com uma mão melhor", why: "Contra um jogador que {{t:call|paga}} com mãos mais fracas, o {{t:check}} desperdiça valor. As mãos melhores pagarão por vezes, mas há mais {{t:call|pagamentos}} de mãos piores." }
      - { text: "Aposto o {{t:pot|pote}} inteiro como {{t:bluff}}", why: "Com {{t:top-pair|top pair}} isto não é um {{t:bluff}}: ganha a muitas das mãos que vão {{t:call|pagar}}. A aposta é {{t:value|por valor}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, {{t:straight-draw|draw de sequência}} falhado. O adversário é um {{t:recreational|jogador recreativo}} passivo ({{t:wtsd}} {{n:mda.rec.wtsd}}) que {{t:call|pagou}} no flop e no turn. {{t:check|Passa}}. O que faz?"
    options:
      - { text: "{{t:check|Passo}} e abdico do {{t:pot|pote}}", correct: true, why: "Um {{t:bluff}} só dá lucro quando o adversário {{t:fold|desiste}} com mais frequência do que o {{t:alpha}} da sua aposta. Um jogador que {{t:call|pagou}} duas {{t:street|rondas}} e chega frequentemente ao showdown raramente {{t:fold|desiste}} no river." }
      - { text: "Aposto alto, porque não tenho valor de showdown", why: "Na base (módulo 8), um {{t:bluff}} destes pode ser bom, mas contra este jogador faltam {{t:fold|desistências}}: o {{t:bluff}} perde dinheiro." }
      - { text: "Aposto pouco, para que o {{t:bluff}} saia mais barato", why: "Uma aposta menor precisa de menos {{t:fold|desistências}}, mas uma mão que {{t:call|pagou}} duas {{t:street|rondas}} normalmente também {{t:call|paga}} uma aposta pequena. É melhor abdicar do {{t:pot|pote}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:open|Abre}} do {{t:cutoff|CO}}. No Button está um {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} mãos. Ele faz-lhe 3-bet. O que faz com AJo?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Quem joga tão poucas mãos faz 3-bet sobretudo com as mais fortes: AQ, AK e {{t:pair|pares}} altos, que dominam AJ. Contra ele, {{t:fold|desiste}} com mais frequência do que na base do módulo 4." }
      - { text: "{{t:call|Pago}}, porque AJ é uma mão forte", why: "AJ é forte contra um {{t:range}} amplo. Contra o 3-bet de um jogador com {{t:vpip}} {{n:hud.ex.nit.vpip}}, está muitas vezes dominado e fora de {{t:position|posição}}." }
      - { text: "Faço 4-bet", why: "Um 4-bet com AJ contra um {{t:nit}} joga contra um {{t:range}} que o domina e raramente {{t:fold|desiste}}. Não é nem {{t:value|valor}} nem um bom {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Está no Button e todos {{t:fold|desistiram}}. No {{t:big-blind}} está um {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} após {{n:hud.ex.reg.hands}} mãos). Como ajusta a sua {{t:open|abertura}}?"
    options:
      - { text: "{{t:open|Abro}} mais largo do que na base", correct: true, why: "Um {{t:nit}} defende o blind de forma estreita, por isso a sua {{t:open|abertura}} ganha de imediato com mais frequência, mesmo com uma mão fraca." }
      - { text: "{{t:open|Abro}} mais apertado, porque o {{t:nit}} tem mãos fortes", why: "O {{t:nit}} tem mãos fortes quando joga. No {{t:big-blind}}, na maioria das vezes {{t:fold|desiste}}, e é aí que está o seu lucro." }
      - { text: "Sem alterações: o tipo de jogador não influencia o roubo de blinds", why: "Influencia. O lucro do roubo depende da frequência com que o blind {{t:fold|desiste}}, e um {{t:nit}} {{t:fold|desiste}} muitas vezes." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "O adversário é um {{t:maniac|maníaco}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} após {{n:hud.ex.reg.hands}} mãos. Apostou em cada {{t:street|ronda}} e no river {{t:bet|aposta}} o {{t:pot|pote}} inteiro. O que faz com {{t:top-pair|top pair}} e kicker fraco?"
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Contra um jogador que {{t:bluff|faz bluff}} mais do que na base, as mãos no limite do {{t:call|pagamento}} dão lucro. O {{t:pair|par}} de topo ganha aos seus {{t:bluff|bluffs}} e a parte do seu valor." }
      - { text: "{{t:fold|Desisto}}, porque uma aposta do {{t:pot|pote}} inteiro significa uma mão forte", why: "Num jogador que joga quase todas as mãos com {{t:raise|aumento}} e aposta em cada {{t:street|ronda}}, uma aposta grande contém muitos {{t:bluff|bluffs}}. Ao {{t:fold|desistir}}, paga-lhe por ser agressivo." }
      - { text: "{{t:raise|Aumento}} all-in", why: "O {{t:raise|aumento}} faz com que os {{t:bluff|bluffs}} {{t:fold|desistam}} e as mãos melhores {{t:call|paguem}}. Com uma mão que apanha {{t:bluff|bluffs}}, basta {{t:call|pagar}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Joga contra um {{t:maniac|maníaco}}. No turn tem uma mão fraca sem hipóteses de melhorar, e ele {{t:check|passa}}. O que faz?"
    options:
      - { text: "{{t:check|Passo}}: {{t:bluff|fazer bluff}} a um {{t:maniac|maníaco}} raramente resulta", correct: true, why: "O {{t:maniac|maníaco}} raramente {{t:fold|desiste}} e {{t:raise|aumenta}} com frequência. Contra ele, ganha dinheiro com {{t:call|pagamentos}} com mãos mais fortes, e não com {{t:bluff|bluffs}}." }
      - { text: "Aposto, porque o {{t:check}} de um {{t:maniac|maníaco}} significa fraqueza", why: "Pode ser, mas um {{t:maniac|maníaco}} {{t:raise|aumenta}} muitas vezes com qualquer mão. O {{t:bluff}} exige {{t:fold|desistências}}, e ele dá poucas." }
      - { text: "Aposto all-in para que ele não possa {{t:raise|aumentar}}", why: "Arrisca o stack inteiro para ganhar um {{t:pot|pote}} pequeno, contra um jogador que raramente {{t:fold|desiste}}. É a forma mais cara de {{t:bluff|fazer bluff}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
As estatísticas da lição anterior compõem alguns perfis típicos. O tipo de jogador indica em que sentido ele se afasta da base: joga mãos a menos, mãos a mais, {{t:call|paga}} com demasiada frequência ou {{t:raise|aumenta}} com demasiada frequência.

## Dois números, quatro tipos

O tipo lê-se a partir do {{t:vpip}} e da diferença {{t:vpip}} − {{t:pfr}} (6-max, pelo menos cerca de {{n:hud.hands.vpip.low}} mãos):

| Tipo | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Erro face à base |
|---|---|---|---|
| {{t:nit|Nit}} | até cerca de {{n:hud.vpip.nit-max}} | pequena | joga mãos a menos |
| {{t:regular|Regular}} ({{t:tag}}, {{t:lag}}) | cerca de {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | pequena | próximo da base |
| {{t:recreational|jogador recreativo}} passivo | a partir de cerca de {{n:hud.vpip.loose}} | mais de {{n:hud.gap.passive}} pontos | mãos a mais, {{t:call|paga}} com demasiada frequência |
| {{t:maniac|maníaco}} | a partir de cerca de {{n:hud.vpip.loose}} | até cerca de {{n:hud.gap.aggressive}} pontos | mãos a mais, {{t:raise|aumenta}} com demasiada frequência |

Ao jogador passivo com uma diferença grande também se chama {{t:calling-station}}. Entre os tipos há zonas de transição (p. ex., um {{t:vpip}} de dez e poucos por cento ou um jogador solto com uma diferença de poucos pontos): aí não se atribui um tipo; olha-se para as estatísticas seguintes.

## O que dizem os dados da população

Uma base pública de estatísticas apresenta as estatísticas médias dos jogadores de uma grande sala online, NL25 6-max, de todas as mãos dos últimos {{n:mda.period.months}} meses. Nela, os {{t:regular|regulares}} são jogadores com {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} e um resultado acima de {{n:mda.reg.def.wr}}, e os {{t:recreational|jogadores recreativos}} são os que têm {{t:vpip}} acima de {{n:mda.rec.def}} e um resultado abaixo de {{n:mda.rec.def.wr}}:

| Estatística | {{t:regular|Regulares}} | {{t:recreational|Jogadores recreativos}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdowns ganhos | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Resultado | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

Os {{t:recreational|jogadores recreativos}} têm uma diferença {{t:vpip}} − {{t:pfr}} de {{n:mda.rec.gap.pp}} pontos, ou seja, são passivos. Chegam ao showdown com mais frequência e ganham-no com menos frequência: {{t:call|pagam}} com mãos mais fracas. Também raramente {{t:fold|desistem}} perante um 3-bet. Em NL50 e NL100 os números são quase iguais.

## O {{t:recreational|jogador recreativo}} passivo

A base do módulo 8 não muda: aposta {{t:value|por valor}} quando mais de metade das mãos que vão {{t:call|pagar}} são piores, e um {{t:bluff}} dá lucro quando o adversário {{t:fold|desiste}} com mais frequência do que o {{t:alpha}}. O que muda é o adversário: {{t:call|paga}} com mais mãos fracas. Por isso:

- aposta {{t:value|por valor}} com mais mãos, incluindo mais finas, p. ex. {{t:top-pair|top pair}} com um kicker mais fraco em três {{t:street|rondas}};
- {{t:bluff|faz bluff}} com menos frequência, sobretudo no river: faltam as {{t:fold|desistências}} com que o {{t:bluff}} deveria dar lucro.

## {{t:nit|Nit}} e {{t:maniac|maníaco}}

**O {{t:nit}}** joga apenas mãos fortes. Quando {{t:raise|aumenta}} ou faz 3-bet, as mãos da parte baixa do seu {{t:range}} de {{t:call|pagamento}} estão mais vezes dominadas, por isso {{t:fold|desiste}} com elas com mais frequência do que na base do módulo 4. Quando ele está no blind, rouba os blinds com mais frequência, porque ele raramente defende.

**O {{t:maniac|maníaco}}** joga muitas mãos e {{t:raise|aumenta}} com quase todas. As suas apostas contêm mais {{t:bluff|bluffs}} do que na base, por isso {{t:call|paga}} com as mãos no limite do {{t:call|pagamento}}, com mãos muito fortes deixa-o apostar e não {{t:bluff|faz bluff}}: ele raramente {{t:fold|desiste}}.

:::note De onde vêm estes limiares
Os limiares dos tipos são convenções de treinadores (dois materiais de formação, cash 6-max online): usamos a parte comum ou um intervalo que abranja ambas as fontes. Os dados da população provêm de uma base pública de estatísticas (uma grande sala online, NL25–NL100, todas as mãos dos {{n:mda.period.months}} meses anteriores a outubro de 2026; o site não indica o número de mãos). A leitura do tipo de um {{t:nit}} ou de um {{t:maniac|maníaco}} baseia-se nas estatísticas de um adversário concreto, e não em dados de toda a população, pelo que exige uma amostra.
:::
