---
id: m11.l2
module: m11
order: 2
title: "올인에 콜하기"
sub: "필요한 에퀴티와 더 좁게 콜하는 이유"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "{{t:big-blind|빅 블라인드}}에 있고 스택은 {{n:m11.depth.10}}, 앤티는 없습니다. {{t:small-blind|스몰 블라인드}}가 {{n:m11.depth.10}} 전부를 걸고 올인했습니다. {{t:call|콜}}이 이익이 되려면 에퀴티가 몇 퍼센트 필요합니까? 숫자를 입력하세요."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "블라인드가 이미 {{t:pot|팟}}에 들어가 있으므로 추가로 내는 금액은 {{n:m11.call.10.cost}}입니다. {{t:call|콜}} 후 {{t:pot|팟}}은 {{n:m11.call.10.pot}}입니다: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "같은 상황이지만 스택이 각각 {{n:m11.depth.5}}입니다. 올인에 {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "추가로 내는 금액은 {{n:m11.call.5.cost}}, {{t:call|콜}} 후 {{t:pot|팟}}은 {{n:m11.call.5.pot}}이므로 {{n:m11.call.5.eq}}입니다. 스택이 더 짧으면 블라인드가 스택에서 차지하는 비중이 더 크므로 가격이 더 좋습니다." }
      - { text: "{{n:m11.call.10.eq}}", why: "그것은 {{n:m11.depth.10}}일 때의 가격입니다. {{n:m11.depth.5}}에서는 블라인드가 전체 스택에서 차지하는 비중이 더 크므로 필요한 에퀴티가 더 적습니다: {{n:m11.call.5.eq}}." }
      - { text: "절반", why: "스택 전체를 넣어야 한다면 절반이 필요할 것입니다. 블라인드는 이미 {{t:pot|팟}}에 들어가 있으므로 추가로 내는 금액은 {{n:m11.call.5.cost}}뿐입니다." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "스택은 각각 {{n:m11.depth.15}}이며 {{t:small-blind|스몰 블라인드}}가 올인했습니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "추가로 내는 금액은 {{n:m11.call.15.cost}}, {{t:pot|팟}}은 {{n:m11.call.15.pot}}이므로 {{n:m11.call.15.eq}}입니다. 스택이 깊을수록 절반에 가까워집니다." }
      - { text: "{{n:m11.call.5.eq}}", why: "그것은 {{n:m11.depth.5}}일 때의 가격입니다. {{n:m11.depth.15}}에서는 블라인드가 스택에서 차지하는 비중이 더 작으므로 가격이 {{n:m11.call.15.eq}}까지 올라갑니다." }
      - { text: "절반보다 많이", why: "스택이 아주 깊어도 가격은 절반을 넘지 않습니다. {{t:pot|팟}}에는 항상 내 블라인드가 들어가 있기 때문입니다." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "{{t:big-blind|빅 블라인드}}에 있고 스택은 {{n:m11.depth.10}}이며 {{t:small-blind|스몰 블라인드}}가 올인했습니다. {{t:call|콜}}할 핸드를 칠하세요."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "{{n:m11.depth.10}}에서 솔버는 {{t:small-blind|스몰 블라인드}}에서 같은 무늬의 7과 6(76s)으로 올인합니다. 이 핸드를 {{t:big-blind|빅 블라인드}}에서 받았고, {{t:small-blind|스몰 블라인드}}가 올인했습니다. 어떻게 하시겠습니까?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "76s로 올인하는 것은 주로 상대의 {{t:fold|폴드}} 덕분에 이익이 됩니다. {{t:call|콜}}하면 쇼다운에서만 이길 수 있고, 그것도 하이 카드와 {{t:pair|페어}}가 많은 올인 {{t:range|레인지}}를 상대로 해야 합니다. 솔버는 이 핸드를 {{t:fold|폴드}}합니다." }
      - { text: "{{t:call|콜}}합니다. {{t:small-blind|스몰 블라인드}}에서라면 이 핸드로 올인할 테니까요", why: "{{t:call|콜}}은 다른 상황입니다. 폴드 에퀴티가 없고, 상대의 {{t:range|레인지}}는 무작위보다 강합니다. {{t:call|콜}}하려면 더 강한 핸드가 필요합니다." }
      - { text: "{{t:call|콜}}합니다. 같은 무늬 핸드는 잘 발전하니까요", why: "올인 후에는 핸드가 발전할 수 있는 이후 플레이가 없습니다. 쇼다운까지의 에퀴티만 중요합니다." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|빅 블라인드}}이고 {{t:small-blind|스몰 블라인드}}가 올인했습니다. 2로 이루어진 {{t:pair|페어}}를 가지고 있습니다. {{n:m11.depth.10}}에서 솔버는 {{t:call|콜}}합니다. {{n:m11.depth.15}}에서는 어떻습니까?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "{{n:m11.depth.15}}에서는 가격이 {{n:m11.call.15.eq}}까지 올라가고 올인 {{t:range|레인지}}는 더 좁아서(약 {{n:m11.push.15}}의 핸드) 2 {{t:pair|페어}}가 더 높은 {{t:pair|페어}}를 만나는 경우가 많아집니다. {{t:call|콜}} {{t:range|레인지}}는 약 {{n:m11.call.10}}에서 약 {{n:m11.call.15}}의 핸드로 줄어듭니다." }
      - { text: "{{t:call|콜}}합니다. {{t:pair|페어}}는 항상 우세하니까요", why: "2 {{t:pair|페어}}는 더 높은 카드 두 장을 상대로 대략 동전 던지기이고, 더 높은 {{t:pair|페어}}를 상대로는 확실한 열세입니다. 스택이 깊을수록 상대는 약한 핸드를 더 적게 {{t:shove|푸시}}하므로 {{t:pair|페어}}가 상대 {{t:range|레인지}}에서 차지하는 비중이 커집니다." }
      - { text: "{{t:call|콜}}합니다. 스택이 깊을수록 더 넓어지니까요", why: "반대입니다. 스택이 깊을수록 {{t:call|콜}} 비용이 커지고 {{t:call|콜}} {{t:range|레인지}}는 좁아집니다." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "{{n:m11.depth.10}}에서 {{t:small-blind|스몰 블라인드}}는 약 {{n:m11.push.10}}의 핸드로 올인하지만, {{t:big-blind|빅 블라인드}}는 약 {{n:m11.call.10}}의 핸드로만 {{t:call|콜}}합니다. 왜 그렇습니까?"
    options:
      - { text: "콜하는 쪽은 폴드 에퀴티가 없고, 무작위보다 강한 {{t:range|레인지}}를 상대로 플레이하기 때문입니다", correct: true, why: "올인은 상대가 {{t:fold|폴드}}할 때도 이깁니다. {{t:call|콜}}은 쇼다운에서만 이기며, 그것도 이미 선별된 핸드를 상대로 합니다. 그래서 오래된 원칙이 있습니다: 먼저 올인할 때보다 {{t:call|콜}}할 때 더 좋은 핸드가 필요합니다." }
      - { text: "{{t:big-blind|빅 블라인드}}가 더 많이 내기 때문입니다", why: "두 사람 모두 같은 스택을 걸고, {{t:big-blind|BB}}는 이미 블라인드를 {{t:pot|팟}}에 넣어 두었으므로 추가로 내는 금액은 오히려 더 적습니다." }
      - { text: "솔버가 틀렸기 때문입니다", why: "이것은 올인 아니면 {{t:fold|폴드}}만 하는 게임의 균형입니다. 어떤 플레이어도 자신의 {{t:range|레인지}}만 바꿔서는 이익을 얻을 수 없습니다. 차이는 폴드 에퀴티에서 생깁니다." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "{{t:bb-ante|빅 블라인드 앤티}}가 있는 게임입니다. {{t:big-blind|빅 블라인드}}에 있고 스택은 {{n:m11.depth.10}}이며 {{n:m11.ante}}의 앤티를 냈습니다. {{t:small-blind|스몰 블라인드}}가 올인했습니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "추가로 내는 금액은 같지만({{n:m11.call.10.cost}}) {{t:pot|팟}}에는 앤티도 들어 있습니다. {{t:call|콜}} 후 팟은 {{n:m11.call.10-ante.pot}}입니다. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. 그래서 앤티가 있으면 더 넓게 {{t:call|콜}}합니다. {{n:m11.call.10}} 대신 약 {{n:m11.call.10-ante}}의 핸드로 콜합니다." }
      - { text: "{{n:m11.call.10.eq}}", why: "그것은 앤티가 없을 때의 가격입니다. 앤티는 {{t:pot|팟}}에 남아 있으므로 같은 금액을 추가로 내고 더 많이 얻습니다: {{n:m11.call.10-ante.eq}}." }
      - { text: "앤티가 없을 때보다 많이 필요합니다. 더 많이 냈으니까요", why: "앤티는 이미 쓴 돈입니다. 중요한 것은 앞으로 얼마를 더 내고 얼마를 얻을 수 있는지뿐입니다." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "플레이어 세 명, 스택은 각각 {{n:m11.depth.3max}}입니다. 버튼이 올인했고 {{t:small-blind|스몰 블라인드}}가 {{t:call|콜}}했습니다. {{t:big-blind|빅 블라인드}}에서 필요한 에퀴티는 {{n:m11.3max.bb-two.eq}}뿐입니다. 버튼 혼자 올인했을 때보다 더 넓게 {{t:call|콜}}합니까?"
    table: { position: BB }
    options:
      - { text: "아니요, 더 좁게 합니다", correct: true, why: "가격은 더 좋지만 두 개의 {{t:range|레인지}}를 상대해야 하고, 그중 하나는 강한 핸드를 가진 콜러입니다. 솔버는 여기서 약 {{n:m11.3max.call.bb-two}}의 핸드로 {{t:call|콜}}하고, 버튼만 올인했을 때는 약 {{n:m11.3max.call.bb}}의 핸드로 콜합니다." }
      - { text: "네, 가격이 훨씬 좋으니까요", why: "더 좋은 가격만으로는 부족합니다. 상대가 두 명이면 약한 핸드의 에퀴티가 빠르게 떨어집니다. 솔버는 약 {{n:m11.3max.call.bb-two}}의 핸드로만 {{t:call|콜}}합니다." }
      - { text: "똑같이 합니다. 내 핸드만 중요하니까요", why: "중요한 것은 상대 핸드에 대한 에퀴티입니다. 버튼의 올인에 콜한 플레이어는 버튼보다 강한 {{t:range|레인지}}를 가지고 있으므로 더 좁게 {{t:call|콜}}합니다." }
---
상대가 올인했고 내가 {{t:big-blind|빅 블라인드}}에 있다면, 결정의 형태는 간단합니다. {{t:call|콜}}하거나 {{t:fold|폴드}}합니다. {{t:call|콜}} 후에는 더 이상 플레이가 없으므로 가격과 올인 {{t:range|레인지}}에 대한 내 에퀴티만 중요합니다.

## {{t:call|콜}}의 가격

블라인드는 이미 {{t:pot|팟}}에 들어가 있습니다. 스택이 {{n:m11.depth.10}}이면 추가로 내는 금액은 {{n:m11.call.10.cost}}이고, {{t:call|콜}} 후 {{t:pot|팟}}은 {{n:m11.call.10.pot}}입니다.

```formula
필요 에퀴티 = 추가 금액 ÷ 콜 후의 팟
```

| 스택 | 추가 금액 | {{t:call|콜}} 후 {{t:pot|팟}} | 필요 에퀴티 |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

스택이 짧을수록 가격이 좋습니다. 블라인드가 전체 스택에서 차지하는 비중이 크기 때문입니다.

## {{t:shove|푸시}}할 때보다 더 좁게 {{t:call|콜}}합니다

먼저 올인하면 상대가 {{t:fold|폴드}}할 때도 이깁니다. {{t:call|콜}}하면 쇼다운에서만 이기며, 그것도 상대가 올인하려고 고른 핸드를 상대로 합니다. 그래서 먼저 올인할 때보다 {{t:call|콜}}할 때 더 좋은 핸드가 필요합니다(문헌에서는 이를 “갭 콘셉트(gap concept)”라고 부릅니다).

```range
call.bb-10
```

{{n:m11.depth.10}}에서 {{t:small-blind|스몰 블라인드}}는 약 {{n:m11.push.10}}의 핸드로 올인하고, {{t:big-blind|빅 블라인드}}는 약 {{n:m11.call.10}}의 핸드로 {{t:call|콜}}합니다. [[7s 6s]] 같은 핸드는 {{t:small-blind|스몰 블라인드}}에서 {{t:shove|푸시}}하지만, 올인에 대해서는 {{t:fold|폴드}}합니다. 폴드 에퀴티가 없으면 하이 카드와 {{t:pair|페어}}를 상대로 에퀴티가 너무 부족하기 때문입니다. 참고로 한 트레이닝 사이트의 표에 따르면 {{n:m11.depth.10}}에서 {{t:call|콜}} {{t:range|레인지}}는 {{n:m11.ext.call.10}}입니다.

```range
call.bb-15
```

```range
call.bb-5
```

스택이 깊을수록 {{t:call|콜}}이 비싸지고 상대의 올인 {{t:range|레인지}}가 좁아지므로 {{t:call|콜}}하는 빈도가 줄어듭니다. {{n:m11.depth.15}}에서는 약 {{n:m11.call.15}}, {{n:m11.depth.5}}에서는 무려 약 {{n:m11.call.5}}입니다.

## 뒤에 아직 누군가 있을 때

플레이어가 세 명이고 스택이 각각 {{n:m11.depth.3max}}일 때, {{t:small-blind|스몰 블라인드}}는 필요한 에퀴티가 {{n:m11.3max.sb.eq}}인데도 버튼의 올인에 약 {{n:m11.3max.call.sb}}의 핸드로만 {{t:call|콜}}합니다. 같은 상황에서 {{t:small-blind|스몰 블라인드}}가 {{t:fold|폴드}}했을 때 {{t:big-blind|빅 블라인드}}가 {{t:pot|팟}} {{n:m11.3max.bb.pot}}에 추가로 내는 금액은 {{n:m11.3max.bb.cost}}이고, 필요한 에퀴티는 {{n:m11.3max.bb.eq}}이며, 약 {{n:m11.3max.call.bb}}의 핸드로 {{t:call|콜}}합니다. 차이는 주로 뒤에 있는 플레이어 때문입니다(가격 차이는 크지 않습니다). {{t:small-blind|스몰 블라인드}}가 {{t:call|콜}}하면 {{t:big-blind|빅 블라인드}}의 더 강한 핸드를 만날 수 있습니다.

```range
call.sb-vs-btn-3max
```

이미 두 명이 올인했을 때는 가격이 {{n:m11.3max.bb-two.eq}}까지 내려가지만, 그런데도 {{t:big-blind|빅 블라인드}}는 약 {{n:m11.3max.call.bb-two}}의 핸드로만 {{t:call|콜}}합니다. 그중 하나가 이미 올인에 {{t:call|콜}}한 두 {{t:range|레인지}}를 상대로는 약한 핸드의 에퀴티가 빠르게 떨어집니다.

```range
call.bb-vs-two-3max
```

## 앤티가 있으면 더 넓게 {{t:call|콜}}합니다

앤티는 {{t:pot|팟}}에 남아 있으므로 같은 금액을 추가로 내고 더 많이 얻습니다. {{n:m11.depth.10}}, {{t:bb-ante|빅 블라인드 앤티}} {{n:m11.ante}}에서는 {{n:m11.call.10.eq}} 대신 필요한 에퀴티가 {{n:m11.call.10-ante.eq}}입니다. 앤티가 있으면 상대도 더 넓게 {{t:shove|푸시}}하므로, 솔버는 약 {{n:m11.call.10-ante}}의 핸드로 {{t:call|콜}}합니다.

```range
call.bb-10-ante
```

:::note 이 레슨의 {{t:range|레인지}}
그리드는 2인 플레이를 다룹니다. 다른 모든 플레이어가 {{t:fold|폴드}}했을 때 {{t:small-blind|스몰 블라인드}} 대 {{t:big-blind|빅 블라인드}}의 상황이며, 돈이 아니라 {{t:chips|칩}}을 기준으로 계산합니다. {{t:tournament|토너먼트}}에서 {{t:payout|상금}}이 중요할 때는 더욱 좁게 {{t:call|콜}}합니다(다음 레슨).
:::
