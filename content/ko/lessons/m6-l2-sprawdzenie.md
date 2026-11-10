---
id: m6.l2
module: m6
order: 2
title: "콜할까, 폴드할까"
sub: "포지션 없이 C벳 방어하기"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "플롭입니다. {{t:pot|팟}}에 {{n:ex.third.pot}} 있고, 버튼이 {{n:ex.third.bet}} 크기의 C벳을 {{t:bet|베팅}}합니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{n:ex.third.bet}}만큼 더 넣는데, {{t:call|콜}}한 뒤 {{t:pot|팟}}은 총 {{n:ex.third.total}}입니다: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. 작은 C벳은 아주 좋은 가격을 줍니다." }
      - { text: "{{n:alpha.bet-third}}", why: "이것은 알파, 즉 버튼의 {{t:bluff|블러프}}가 얼마나 자주 성공해야 하는지입니다. 필요한 에퀴티를 구할 때는 분모에 자신의 {{t:call|콜}}도 더하세요." }
      - { text: "{{n:mdf.bet-third}}", why: "이것은 {{t:mdf}}, 즉 {{t:range|레인지}}의 일부이지 한 핸드의 에퀴티가 아닙니다. 게다가 플롭에서 {{t:out-of-position}}일 때는 {{t:mdf}}보다 조금 덜 방어합니다." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "플롭입니다. {{t:pot|팟}}에 {{n:ex.pot}} 있고, 버튼이 {{n:ex.bet.three-quarters}} 크기의 C벳을 {{t:bet|베팅}}합니다. {{t:call|콜}}하려면 에퀴티가 몇 퍼센트 필요합니까? 숫자를 입력하세요."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "{{n:ex.bet.three-quarters}}만큼 더 넣는데, {{t:call|콜}}한 뒤 {{t:pot|팟}}은 {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}입니다. {{n:ex.bet.three-quarters}} ÷ 이 합계 = {{n:eq.bet-three-quarters}}. {{t:pot|팟}}의 1/4 크기 C벳에 맞설 때({{n:eq.bet-quarter}})보다 거의 두 배입니다."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "같은 플롭에서 같은 핸드입니다. 한 번은 버튼이 {{t:pot|팟}}의 1/3을, 한 번은 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 방어는 어떻게 달라집니까?"
    table: { position: BB }
    options:
      - { text: "{{t:pot|팟}} 전체 크기의 베팅에는 더 좁은 {{t:range|레인지}}로 방어합니다", correct: true, why: "베팅이 클수록 가격이 나쁩니다: 필요한 에퀴티는 {{n:eq.bet-third}}에서 {{n:eq.bet-pot}}까지 오르고, {{t:mdf}}는 {{n:mdf.bet-third}}에서 {{n:mdf.bet-pot}}까지 내려갑니다. 작은 베팅에 콜하던 가장 약한 핸드는 이제 {{t:fold|폴드}}합니다." }
      - { text: "같은 핸드이니 똑같이 방어합니다", why: "핸드는 같지만 가격이 다릅니다. {{t:pot|팟}} 크기의 베팅에는 {{n:eq.bet-third}} 대신 {{n:eq.bet-pot}}의 에퀴티가 필요합니다." }
      - { text: "{{t:pot|팟}} 전체 크기의 베팅에는 더 넓게 방어합니다. 큰 베팅은 {{t:bluff|블러프}}인 경우가 더 많기 때문입니다", why: "그런 규칙은 없습니다. 큰 베팅은 보통 {{t:polarized|폴라라이즈드}} {{t:range|레인지}}(아주 강한 핸드와 {{t:bluff|블러프}})를 뜻하며, 어쨌든 당신에게는 더 나쁜 가격입니다." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크}}하자 버튼이 {{t:pot|팟}}의 1/3 크기 C벳을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|콜}}", correct: true, why: "미들 {{t:pair|페어}}는 버튼의 모든 {{t:bluff|블러프}}({{t:pair|페어}}가 없는 핸드)를 이기고, {{t:call|콜}}하는 데 필요한 에퀴티는 {{n:eq.bet-third}}뿐입니다. 표준적인 방어입니다." }
      - { text: "{{t:fold|폴드}}", why: "너무 타이트합니다. 작은 C벳에는 {{t:pair|페어}}도 {{t:draw|드로우}}도 없는 가장 약한 핸드를 {{t:fold|폴드}}하는 것이지, {{t:pair|페어}}를 폴드하는 것이 아닙니다." }
      - { text: "체크레이즈", why: "보통은 {{t:call|콜}}합니다. {{t:raise|레이즈}}하면 주로 더 좋은 핸드와 {{t:draw|드로우}}만 돈을 냅니다. 이런 핸드로 체크레이즈하는 것은 작은 C벳에 대해 솔버가 드물게 쓰는 플레이입니다." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크}}하자 버튼이 {{t:pot|팟}}의 3/4 크기 C벳을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|폴드}}", correct: true, why: "{{t:pair|페어}}도 {{t:draw|드로우}}도 없습니다(스페이드가 하나도 없고, {{t:straight|스트레이트}}는 멀리 있습니다). 큰 C벳에는 {{n:eq.bet-three-quarters}}의 에퀴티가 필요한데, {{t:out-of-position}} 상태에서는 하이카드만으로 쇼다운까지 가는 일이 드뭅니다. 퀸이나 잭 {{t:pair|페어}}도 항상 이기지는 않습니다." }
      - { text: "{{t:call|콜}}", why: "퀸과 잭이 보드보다 높아서 끌립니다. 하지만 이 가격에서는 맨 하이카드만으로는 부족합니다: 턴에서 또 베팅을 받고 {{t:fold|폴드}}하게 되는 경우가 많습니다." }
      - { text: "체크레이즈", why: "{{t:bluff|블러프}}에는 {{t:draw|드로우}}가 있어 이길 수 있는 두 번째 길이 있는 핸드가 더 적합합니다. 이 핸드에는 그런 길이 전혀 없습니다." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크}}하자 버튼이 {{t:pot|팟}}의 1/3 크기 C벳을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|콜}}", correct: true, why: "하이카드 두 장에 백도어 {{t:flush-draw|플러시 드로우}}까지 있습니다(스페이드 세 장: 턴과 리버 모두 스페이드가 필요합니다). 가격이 {{n:eq.bet-third}}일 때는 {{t:call|콜}}하기에 충분합니다." }
      - { text: "체크레이즈", why: "보통은 아닙니다. 체크레이즈는 주로 가장 강한 핸드와 {{t:draw|드로우}}({{t:flush}}, {{t:oesd}})로 합니다. 백도어 {{t:flush-draw|플러시 드로우}}는 약합니다: 버튼이 콜하면 보통 하이카드만 남습니다. 이 핸드는 {{t:call|콜}}합니다." }
      - { text: "{{t:fold|폴드}}", why: "작은 C벳에 비해 너무 타이트합니다. 백도어 {{t:draw|드로우}}와 하이카드 두 장이면 가격이 {{n:eq.bet-third}}일 때 충분한 에퀴티가 있습니다." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크}}하자 버튼이 {{t:pot|팟}}의 1/3 크기 C벳을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|콜}}", correct: true, why: "{{t:straight|스트레이트}} 거트샷(퀸)과 보드보다 높은 킹이 있습니다. {{t:call|콜}}로 카드 한 장을 삽니다: 턴에서 거트샷이 맞을 확률은 약 {{n:odds.gutshot.flop-turn}}입니다. 킹은 {{t:top-pair|탑 페어}}로 가는 아웃을 몇 장 더해 줍니다. 합쳐도 가격 {{n:eq.bet-third}}보다 낮지만, {{t:straight|스트레이트}}가 맞으면 더 많이 이기고(임플라이드 오즈), 킹만으로도 가끔 버튼의 {{t:bluff|블러프}}를 이깁니다. 작은 C벳에는 이것으로 {{t:call|콜}}하기에 충분합니다." }
      - { text: "{{t:fold|폴드}}", why: "너무 타이트합니다: 작은 C벳에는 {{t:draw|드로우}}에 하이카드까지 있으면 충분합니다." }
      - { text: "체크레이즈 올인", why: "아직 아무것도 없는 핸드로 스택 전체를 겁니다. 이런 크기는 더 약한 핸드를 밀어내고, 더 좋은 핸드만 돈을 냅니다." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크}}하자 버튼이 {{t:pot|팟}}의 1/3 크기 C벳을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|폴드}}", correct: true, why: "{{t:pair|페어}}도 {{t:flush-draw|플러시 드로우}}도 없습니다. 약한 백도어 {{t:straight-draw|스트레이트 드로우}}뿐이고(특정 카드 두 장이 필요합니다), 보드보다 높은 카드도 하나도 없습니다. 에이스와 킹이 있는 플롭에서는 버튼에게 강한 핸드가 많습니다. 가격은 좋지만 이 핸드는 그 가격을 거의 실현하지 못합니다." }
      - { text: "{{t:call|콜}}. {{t:mdf}}가 {{n:mdf.bet-third}}이기 때문입니다", why: "{{t:mdf}}는 {{t:range|레인지}} 전체의 기준점이지, 가장 약한 핸드로 돈을 낼 이유가 아닙니다. 플롭에서 {{t:out-of-position}}일 때는 {{t:mdf}}보다 조금 덜 방어해도 됩니다." }
      - { text: "체크레이즈", why: "에이스와 킹이 있는 플롭에서는 {{t:range-advantage|레인지 우위}}가 버튼에게 있고, 당신에게는 이길 수 있는 두 번째 길이 되어 줄 {{t:draw|드로우}}가 없습니다." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "{{t:out-of-position}}일 때 플롭에서 에퀴티가 가격보다 조금이라도 높은 핸드를 모두 {{t:call|콜}}하지 않는 이유는 무엇입니까?"
    table: { position: BB }
    options:
      - { text: "에퀴티를 모두 실현하지 못하기 때문입니다", correct: true, why: "에퀴티는 더 이상의 {{t:bet|베팅}} 없이 쇼다운까지 갈 때의 승률입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 턴과 리버에서 먼저 행동하고, 다음 베팅에 {{t:fold|폴드}}하는 경우가 많습니다. 그러면 약한 핸드는 자기 에퀴티보다 적게 실현합니다." }
      - { text: "버튼은 플롭에서 항상 강한 핸드를 가지고 있기 때문입니다", why: "버튼은 넓게 {{t:open|오픈}}하고 넓게 C벳하며, {{t:bluff|블러프}}도 섞습니다. 문제는 상대의 강함이 아니라 당신의 {{t:position|포지션}}입니다." }
      - { text: "더 좋은 기회를 위해 {{t:chips|칩}}을 아껴야 하기 때문입니다", why: "중요한 것은 각 결정의 {{t:expected-value|기댓값}}이지, {{t:chips|칩}}을 아끼는 것이 아닙니다." }
---
M5에서는 {{t:aggressor|어그레서}}로서 C벳을 했습니다. 이제는 반대편에 앉아 있습니다: {{t:big-blind|빅 블라인드}}를 방어하고, 플롭에서 체크하며, 버튼이 C벳을 {{t:bet|베팅}}합니다. M5에서 배운 내용을 기억하세요: C벳은 프리플롭에 {{t:raise|레이즈}}한 플레이어의 {{t:bet|베팅}}이며, {{t:range-advantage|레인지 우위}}는 플롭의 {{t:texture|텍스처}}에 따라 달라집니다.

## C벳의 가격

먼저 에퀴티가 얼마나 필요한지 계산합니다(M2의 공식). 작은 C벳은 아주 좋은 가격을 주고, 큰 C벳은 눈에 띄게 나쁜 가격을 줍니다.

| 버튼의 C벳 | 필요한 에퀴티 | {{t:mdf}} |
|---|---|---|
| {{t:pot|팟}}의 1/4 | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| {{t:pot|팟}}의 1/3 | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| {{t:pot|팟}}의 1/2 | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| {{t:pot|팟}}의 3/4 | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|팟}} 전체 | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf}}는 방향을 보여 줍니다: 베팅이 클수록 방어하는 핸드가 줄어듭니다. 플롭에서 {{t:out-of-position}}일 때는 {{t:mdf}}보다 조금 덜 방어해도 됩니다. 버튼의 {{t:bluff|블러프}}에도 아직 에퀴티가 있기 때문입니다. 하지만 작은 C벳에 대량으로 {{t:fold|폴드}}하지는 않습니다.

## {{t:out-of-position|아웃 오브 포지션}}에서는 덜 실현합니다

에퀴티는 더 이상의 {{t:bet|베팅}} 없이 끝까지 플레이할 때의 승률입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 모든 {{t:street|스트리트}}에서 먼저 행동하므로, 쇼다운을 보기 전에 {{t:fold|폴드}}하는 경우가 많습니다. {{t:draw|드로우}}가 없는 약한 핸드는 에퀴티로 계산한 것보다 적게 실현합니다. 수티드 핸드, {{t:connectors|커넥터}}, {{t:pair|페어}}는 더 많이 실현합니다. 강한 핸드를 만들거나 이미 이기고 있기 때문입니다.

## 무엇으로 {{t:call|콜}}하는가

작은 C벳(약 {{t:pot|팟}}의 1/3)에는 다음 핸드로 계속합니다:

- 거의 모든 {{t:pair|페어}}, 미들 페어와 바텀 페어도 포함,
- {{t:flush-draw|플러시 드로우}}와 {{t:straight|스트레이트}} 드로우, 하이카드가 있는 거트샷도 포함,
- 백도어 {{t:draw|드로우}}가 있는 하이카드, 예: 같은 무늬 카드 세 장,
- 보통 에이스 하이도 포함.

M2에서 배운 내용을 기억하세요: 플롭에서 {{t:bet|베팅}}에 {{t:call|콜}}하면 카드 한 장을 사는 것이므로, {{t:draw|드로우}}는 턴에서의 확률과 비교합니다. 이 확률은 작은 C벳의 가격보다 조금 낮을 때가 있습니다. 그래도 맞혔을 때 지금 {{t:pot|팟}}에 있는 것보다 더 많이 이길 수 있거나(이른바 임플라이드 오즈, M7에서 계산합니다), 맞히지 못해도 하이카드 덕분에 가끔 이기는 핸드라면 {{t:call|콜}}할 가치가 있습니다.

## 무엇으로 {{t:fold|폴드}}하는가

- {{t:pair|페어}}도 {{t:draw|드로우}}도 없고 에이스나 보드보다 높은 카드도 없는 핸드. 에이스가 있는 플롭에서는 이런 핸드를 더 많이 {{t:fold|폴드}}합니다,
- C벳이 클 때는 보통 {{t:draw|드로우}}가 없는 하이카드 두 장(다만 킹이 있는 {{t:dry|드라이}} 플롭에서는 솔버가 에이스가 있는 핸드를 많이 {{t:call|콜}}합니다). 백도어 {{t:draw|드로우}}가 있을 때, 특히 넛 {{t:flush|플러시}}로 가는 드로우가 있을 때는 오히려 {{t:call|콜}}합니다.

C벳이 커질수록 그다음으로 약한 핸드가 차례로 {{t:call|콜}}에서 폴드로 넘어갑니다.
