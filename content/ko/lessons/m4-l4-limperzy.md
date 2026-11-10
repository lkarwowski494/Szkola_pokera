---
id: m4.l4
module: m4
order: 4
title: "림퍼"
sub: "아이솔레이션: 크기와 레인지"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "앞에 있는 플레이어 한 명이 {{t:big-blind|빅 블라인드}}에 콜만 했습니다(림프). 버튼에서 {{t:raise|레이즈}}하려고 합니다. 얼마까지 레이즈하시겠습니까?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "{{n:pf.iso.one-limper}}까지", correct: true, why: "기본 {{n:pf.iso.base}}에 림퍼 한 명당 {{n:pf.iso.per-limper}}씩 더합니다. 이 크기는 림퍼에게서 좋은 가격을 빼앗습니다." }
      - { text: "{{n:pf.min-raise}}까지", why: "최소 {{t:raise|레이즈}}는 림퍼에게 아주 좋은 가격을 주고, 바로 {{t:pot|팟}}을 가져오는 경우가 거의 없습니다." }
      - { text: "일반 {{t:open|오픈}}처럼 {{n:pf.open-size}}까지", why: "림퍼가 이미 블라인드만큼 넣었으므로 {{t:pot|팟}}이 더 큽니다. {{t:raise|레이즈}}는 일반 {{t:open|오픈}}보다 커야 합니다." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "앞에 있는 플레이어 두 명이 {{t:big-blind|빅 블라인드}}에 콜만 했습니다. {{t:cutoff|CO}}에서 {{t:raise|레이즈}}하려고 합니다. 얼마까지 레이즈하시겠습니까?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "{{n:pf.iso.two-limpers}}까지", correct: true, why: "{{n:pf.iso.base}}에 두 림퍼 각각에 대해 {{n:pf.iso.per-limper}}씩 더합니다." }
      - { text: "{{n:pf.iso.one-limper}}까지", why: "림퍼 한 명을 상대할 때의 크기입니다. 림퍼가 한 명 늘 때마다 {{n:pf.iso.per-limper}}씩 더합니다." }
      - { text: "콜만 합니다", why: "수딧 AQ는 {{t:value|밸류}}로 {{t:raise|레이즈}}할 핸드입니다. 콜하면 {{t:initiative|이니셔티브}}를 내주고 모두를 싸게 들여보냅니다." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "플레이어 한 명이 림프하고 나머지는 모두 폴드해 {{t:small-blind|스몰 블라인드}}에 있는 당신 차례가 됐습니다. {{t:raise|레이즈}}하려고 합니다. 얼마까지 레이즈하시겠습니까?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "{{n:pf.iso.one-limper-oop}}까지", correct: true, why: "{{t:out-of-position|아웃 오브 포지션}}에서는 {{n:pf.iso.oop-extra}}만큼 더합니다: {{n:pf.iso.base}}에 림퍼 한 명당 {{n:pf.iso.per-limper}}, 여기에 다시 {{n:pf.iso.oop-extra}}만큼 더합니다." }
      - { text: "{{n:pf.iso.one-limper}}까지", why: "{{t:in-position|인 포지션}}에서의 크기입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 상대가 더 자주 {{t:fold|폴드}}하거나 더 비싸게 치르도록 조금 더 크게 {{t:raise|레이즈}}합니다." }
      - { text: "콜만 합니다", why: "KK로는 언제나 {{t:pot|팟}}을 키웁니다." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "앞에 있는 플레이어 한 명이 {{t:big-blind|빅 블라인드}}에 콜만 했습니다(림프). 당신은 버튼에 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{n:pf.iso.one-limper}}까지 {{t:raise|레이즈}}", correct: true, why: "AJ는 {{t:isolation|아이솔레이션}}에 알맞은 핸드입니다: 약한 플레이어가 림프하는 많은 핸드를 도미네이트하고, 플롭 이후 {{t:position|포지션}}을 가집니다. 크기: {{n:pf.iso.base}}에 림퍼 한 명당 {{n:pf.iso.per-limper}}." }
      - { text: "{{n:pf.min-raise}}까지 {{t:raise|레이즈}}", sizeError: true, why: "액션은 맞지만, 최소 {{t:raise|레이즈}}는 림퍼에게 아주 좋은 가격을 주므로 림퍼가 거의 {{t:fold|폴드}}하지 않고 일대일로 플레이할 수 없습니다. {{n:pf.iso.one-limper}}까지 {{t:raise|레이즈}}합니다." }
      - { text: "콜", why: "{{t:initiative|이니셔티브}}를 내주고 블라인드를 싸게 들여보냅니다. 림퍼를 도미네이트하는 핸드로는 {{t:pot|팟}}을 키워야 합니다." }
      - { text: "{{t:fold|폴드}}", why: "너무 타이트합니다: 림퍼 한 명을 상대로 버튼은 약 {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}}의 핸드로 {{t:isolation|아이솔레이션 레이즈}}를 하며, AJ는 여유 있게 그 안에 들어갑니다." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "앞에 있는 플레이어 세 명이 {{t:big-blind|빅 블라인드}}에 콜만 했습니다. 당신은 버튼에 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "콜", correct: true, why: "림퍼가 많을 때 수딧 {{t:connectors|커넥터}}는 투기적인 핸드입니다: {{t:in-position|인 포지션}}에서 싸게 플롭을 보고 큰 핸드를 맞힐 수 있습니다. 한 자료는 여기서 콜을 권하지만 다른 자료는 콜을 피하라고 하므로 {{t:fold|폴드}}도 정답으로 인정합니다." }
      - { text: "{{t:fold|폴드}}", correct: true, why: "이것도 정답입니다: 한 자료는 콜하지 말고 {{t:raise|레이즈}}하거나 {{t:fold|폴드}}하라고 하며, 76s는 {{t:value|밸류}}로 {{t:raise|레이즈}}할 핸드가 아닙니다. 다른 자료는 콜을 권하므로 두 플레이 모두 정답으로 인정합니다." }
      - { text: "{{n:pf.iso.two-limpers}}까지 {{t:raise|레이즈}}", why: "림퍼가 세 명이면 {{t:bluff|블러프}} {{t:raise|레이즈}}로 {{t:pot|팟}}을 가져오는 경우가 드물고, 크기도 더 커야 합니다. 76s는 {{t:value|밸류}}로 {{t:raise|레이즈}}할 핸드가 아닙니다." }
---
림프는 {{t:big-blind|빅 블라인드}}에 콜만 해서 핸드에 참여하는 것입니다. 프로들은 먼저 림프하는 일이 드물기 때문에(모듈 3의 규칙), 마이크로 스테이크의 림퍼는 대개 약한 플레이어입니다. 림퍼에게 하는 {{t:raise|레이즈}}를 {{t:isolation|아이솔레이션}}이라고 합니다: 림퍼와 일대일로, 가능하면 {{t:in-position|인 포지션}}에서 플레이하려는 것입니다.

:::note 이 규칙의 출처
앱의 솔버는 림프를 플레이하지 않으므로, 이 레슨은 교육 자료를 바탕으로 합니다. 규칙은 휴리스틱으로 표시되어 있습니다.
:::

## {{t:isolation|아이솔레이션}} 크기

온라인에서는 {{n:pf.iso.base}}에 림퍼 한 명당 {{n:pf.iso.per-limper}}씩 더한 크기로 {{t:raise|레이즈}}합니다: 림퍼가 한 명이면 {{n:pf.iso.one-limper}}까지, 두 명이면 {{n:pf.iso.two-limpers}}까지입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 {{n:pf.iso.oop-extra}}만큼 더합니다. 절대 최소 레이즈를 하지 마세요: 림퍼가 아주 좋은 가격을 받아 거의 {{t:fold|폴드}}하지 않습니다.

## {{t:isolation|아이솔레이션}} {{t:range|레인지}}

버튼에서 림퍼 한 명을 상대로는 약 {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}}의 핸드로 넓게 {{t:isolation|아이솔레이션}}합니다: 중간 및 높은 {{t:pair|페어}}, 수딧 에이스, 강한 오프수트 에이스, 높은 카드, 그리고 수딧 {{t:connectors|커넥터}} 일부입니다. {{t:position|포지션}}이 앞일수록, 림퍼가 많을수록 {{t:range|레인지}}는 좁아집니다: 림퍼가 세 명이면 주로 {{t:value|밸류}}로 {{t:raise|레이즈}}합니다.

작은 {{t:pair|페어}}와 수딧 {{t:connectors|커넥터}} 같은 투기적인 핸드는 림퍼가 많을 때 {{t:in-position|인 포지션}}에서 콜할 수 있습니다. 여기서는 자료마다 의견이 다릅니다: 하나는 콜을 권하고 다른 하나는 콜을 피하라고 합니다. 연습 문제에서는 콜과 {{t:fold|폴드}} 두 플레이를 모두 정답으로 인정합니다.
