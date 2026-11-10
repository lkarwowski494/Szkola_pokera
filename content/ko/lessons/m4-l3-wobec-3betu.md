---
id: m4.l3
module: m4
order: 3
title: "3벳을 받았을 때"
sub: "폴드, 콜 또는 4벳"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "{{t:cutoff|CO}}에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 버튼이 어떤 핸드로든 3벳해서 이익을 내지 못하게 하려면 {{t:open|오픈}} {{t:range|레인지}}의 최소 어느 정도로 계속({{t:call|콜}} 또는 4벳)해야 합니까?"
    table: { position: CO }
    options:
      - { text: "{{t:open|오픈}} {{t:range|레인지}}의 약 {{n:mdf.vs-3bet-ip-size}}", correct: true, why: "버튼은 {{n:vs3bet.win}}만큼을 얻기 위해 {{n:pf.3bet.ip-total}}만큼을 겁니다. {{n:alpha.vs-3bet-ip-size}}보다 자주 {{t:fold|폴드하면}} 버튼의 3벳은 최악의 핸드로도 이익을 냅니다." }
      - { text: "{{t:range|레인지}}의 약 절반", why: "최소치로는 너무 많습니다: 수학적으로는 {{n:mdf.vs-3bet-ip-size}}만으로 충분합니다. 솔버 해법과 차트에 따르면 {{t:open|오픈한 플레이어}}는 {{t:open|오픈}}의 약 {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}를 {{t:fold|폴드하므로}}, {{t:range|레인지}}의 절반 미만으로 계속합니다." }
      - { text: "항상, 어떤 핸드로든", why: "그러면 버튼의 {{t:range|레인지}}에 지는 핸드로 3벳에 돈을 내주게 됩니다. {{t:open|오픈}} 중 가장 약한 부분은 {{t:fold|폴드하는}} 것이 맞습니다." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:cutoff|CO}}에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "오프수트 KJ는 {{t:out-of-position|아웃 오브 포지션}}에서 AK, AJ, KQ에 자주 도미네이트되고, 플롭 이후 플레이하기 어렵습니다. 교육 자료는 여기서 {{t:fold|폴드}}를 권장합니다." }
      - { text: "{{t:call|콜합니다}}", why: "높은 카드라 끌리지만, {{t:out-of-position|아웃 오브 포지션}}에서 이 핸드는 {{t:equity-realization|에퀴티 실현}}이 약하고 더 좋은 키커에 자주 집니다." }
      - { text: "4벳합니다", why: "KJo는 {{t:value|밸류}} 4벳을 하기엔 너무 약하고, {{t:bluff|블러프}}로서는 버튼이 계속하는 핸드를 블로킹하지 못합니다." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:cutoff|CO}}에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4벳합니다", correct: true, why: "AK는 보통 4벳합니다: 스택을 넣고 싶은 핸드이고, 상대의 AA와 KK를 블로킹하며, AQ, KQ와 더 약한 에이스를 도미네이트합니다." }
      - { text: "{{t:call|콜합니다}}", why: "일부 자료는 가끔 AK로 {{t:call|콜하지만}}, 보통은 4벳합니다: {{t:out-of-position|아웃 오브 포지션}}에서 {{t:call|콜}}하면 {{t:initiative|주도권}}과 밸류를 잃습니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "AK는 프리플롭 최고의 핸드 중 하나입니다. 여기서 {{t:fold|폴드}}는 큰 실수입니다." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "버튼에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, {{t:small-blind|스몰 블라인드}}는 {{t:fold|폴드했으며}}, {{t:big-blind|빅 블라인드}}가 {{n:pf.3bet.oop-total}}까지 {{t:raise|레이즈했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "{{t:in-position|인 포지션}}의 수티드 {{t:connectors|커넥터}}는 {{t:equity-realization|에퀴티를 잘 실현합니다}}: {{t:straight|스트레이트}}와 플러시를 만들고, 빗나가면 플롭에서 쉽게 {{t:fold|폴드할}} 수 있습니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "{{t:in-position|인 포지션}}에서는 이 핸드가 방어할 만큼 충분히 플레이 가능합니다. {{t:fold|폴드}}는 너무 타이트합니다." }
      - { text: "4벳합니다", why: "{{t:bluff|블러프}}로는 AA와 AK를 블로킹하는 수티드 에이스가 더 적합합니다. 87s는 플롭을 보는 편이 낫습니다." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "버튼에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, {{t:small-blind|스몰 블라인드}}는 {{t:fold|폴드했으며}}, {{t:big-blind|빅 블라인드}}가 {{n:pf.3bet.oop-total}}까지 {{t:raise|레이즈했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "한 자료에 따르면 큰 3벳에는 {{t:in-position|인 포지션}}이라도 가장 낮은 {{t:pair|페어}}를 {{t:fold|폴드합니다}}: 주로 셋을 맞혀야 이익을 내는데, 가격이 너무 비쌉니다. 다른 자료는 {{t:in-position|인 포지션}}에서 이 페어들로 {{t:call|콜하는}} 것을 허용합니다." }
      - { text: "{{t:call|콜합니다}}, {{t:position|포지션}}이 있으니까요", why: "{{t:position|포지션}}은 도움이 되지만, {{n:pf.3bet.oop-total}}까지의 3벳이면 셋을 맞혀야 하는 핸드에는 가격이 너무 비쌉니다." }
      - { text: "4벳합니다", why: "33 {{t:pair|페어}}는 4벳할 핸드가 아닙니다: 밸류도 아니고 좋은 {{t:bluff|블러프}}도 아닙니다." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:cutoff|CO}}에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4벳합니다", correct: true, why: "한 자료는 QQ(와 JJ)를 대부분의 경우 4벳합니다: 버튼이 더 약한 {{t:pair|페어}}와 에이스 다수로 계속하기 때문입니다." }
      - { text: "{{t:call|콜합니다}}", correct: true, why: "역시 좋은 플레이입니다: 다른 자료는 버튼의 더 약한 핸드를 폴드시키지 않으려고 QQ를 {{t:call|콜}} {{t:range|레인지}}에 넣습니다. 자료마다 다르므로 두 플레이 모두 좋습니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "QQ는 프리플롭에서 세 번째로 좋은 핸드입니다. {{t:fold|폴드}}는 큰 실수입니다." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:cutoff|CO}}에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "강한 수티드 에이스는 {{t:call|콜}} {{t:range|레인지}}의 핵심입니다: AA와 AK를 블로킹하고, 플러시와 좋은 {{t:pair|페어}}를 만듭니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "너무 타이트합니다: AJs는 3벳에 맞서 방어하기 가장 좋은 핸드 중 하나입니다." }
      - { text: "{{t:value|밸류}}로 4벳합니다", why: "AJs는 스택 전체를 걸고 플레이하고 싶을 만큼 강하지 않습니다. 버튼의 더 좋은 핸드에 도미네이트됩니다." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "버튼에서 {{n:pf.open-size}} 크기로 {{t:open|오픈했고}}, {{t:small-blind|스몰 블라인드}}가 {{n:pf.3bet.oop-total}}까지 {{t:raise|레이즈했으며}}, {{t:big-blind|빅 블라인드}}는 {{t:fold|폴드했습니다}}. KK를 들고 있고 4벳하려고 합니다. 얼마까지 하시겠습니까?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "약 {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}까지", correct: true, why: "{{t:in-position|인 포지션}}에서 4벳은 3벳의 약 {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}입니다. {{t:small-blind|스몰 블라인드}}가 {{t:call|콜하면}} {{t:pot|팟}}은 약 {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}}가 되고(데드 {{t:big-blind|빅 블라인드}} 포함), 스택에는 {{t:pot|팟}}의 약 {{n:spr.4bet.high}}–{{n:spr.4bet}}배가 남습니다." }
      - { text: "{{n:pf.4bet.too-small}}까지", why: "너무 작습니다: 상대에게 {{t:out-of-position|아웃 오브 포지션}}에서 {{t:call|콜}}할 아주 좋은 가격을 줍니다." }
      - { text: "{{n:format.stack}} 올인", why: "{{n:format.stack}} 스택에서 올인하면 상대가 4벳에 콜했을 더 약한 핸드를 밀어내게 됩니다. 덜 벌게 됩니다." }
---
3벳은 {{t:open|오픈}}에 대한 상대의 대응입니다. 선택지는 세 가지입니다: {{t:fold|폴드}}, {{t:call|콜}}, 또는 한 번 더 {{t:raise|레이즈}}, 즉 4벳입니다.

:::note 이 규칙의 출처
이 레슨은 앱의 솔버가 아니라 여러 자료의 교육 자료와 다른 솔버의 공개된 결과를 바탕으로 합니다. 앱의 솔버는 3벳에 맞선 플레이에 대해 아직 검증을 거치지 않았으므로, 규칙은 휴리스틱으로 표시되어 있습니다.
:::

## 얼마나 계속할까

{{t:cutoff|CO}}에서 한 {{t:open|오픈}}을 버튼이 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈하면}}, 버튼은 {{n:vs3bet.win}}만큼을 얻기 위해 그만큼을 겁니다. {{n:alpha.vs-3bet-ip-size}}보다 자주 {{t:fold|폴드하면}} 버튼의 3벳은 어떤 핸드로든 이익을 냅니다. 따라서 {{t:open|오픈}} {{t:range|레인지}}의 최소 약 {{n:mdf.vs-3bet-ip-size}}로 계속해야 합니다.

공개된 솔버 해법({{t:cutoff|CO}} 대 버튼의 {{n:pf.3bet.ip-total}}까지 3벳)에 따르면 {{t:open|오픈한 플레이어}}는 {{t:open|오픈}}의 약 {{n:pf.vs3bet.pub1.fold}}를 {{t:fold|폴드하고}}, 약 {{n:pf.vs3bet.pub1.call}}를 {{t:call|콜하며}}, 약 {{n:pf.vs3bet.pub1.4bet}}를 4벳합니다. 다른 자료의 단순화된 차트는 약 {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}를 제시합니다. 여기서는 두 자료에 가까운 구간을 채택합니다: {{t:fold|폴드}} 약 {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call|콜}} 약 {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4벳 약 {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. {{t:fold|폴드}}의 상한은 {{n:alpha.vs-3bet-ip-size}} 임계값 바로 아래에 있습니다: 이보다 자주 폴드하면 버튼의 3벳이 어떤 핸드로든 이익을 냅니다. {{t:call|콜}}하려면 약 {{n:eq.call-3bet-ip-size}}의 에퀴티가 필요합니다: {{t:call|콜}} 후 {{n:vs3bet.pot-after}}가 되는 {{t:pot|팟}}에 {{n:vs3bet.call}}를 추가로 넣기 때문입니다.

## {{t:out-of-position|아웃 오브 포지션}}에서는 신중하게 고르세요

{{t:out-of-position|아웃 오브 포지션}}에서는 플롭 이후 잘 플레이되는 핸드로 {{t:call|콜합니다}}: 주로 수티드 하이 카드(KQs, QJs), 강한 수티드 에이스, 중간 및 높은 {{t:pair|페어}}, 그리고 수티드 {{t:connectors|커넥터}} 일부입니다. KJo, ATo, QTo 같은 더 약한 오프수트 핸드는 자주 도미네이트되므로 {{t:fold|폴드합니다}}.

## {{t:in-position|인 포지션}}에서는 더 넓게 방어합니다

{{t:in-position|인 포지션}}에서는 66부터 TT까지의 {{t:pair|페어}}와 수티드 {{t:connectors|커넥터}}(T9s, 98s, 87s)로도 {{t:call|콜합니다}}. 한 자료에 따르면 큰 3벳에는 {{t:in-position|인 포지션}}이라도 가장 낮은 {{t:pair|페어}}를 {{t:fold|폴드합니다}}: 주로 셋을 맞혀야 이익을 내는데, 가격이 너무 비쌉니다. 다른 자료는 {{t:in-position|인 포지션}}에서 이 페어들로 {{t:call|콜하는}} 것을 허용합니다.

## 4벳

AA, KK, AK는 보통 {{t:value|밸류}}로 4벳합니다. 일부 자료는 AK로 가끔 {{t:call|콜합니다}}. QQ와 JJ는 자료마다 다르게 플레이합니다: 한 자료는 주로 4벳하고, 다른 자료는 {{t:call|콜합니다}}. {{t:bluff|블러프}}로는 A5s 같은 수티드 에이스가 가장 좋습니다: 상대의 AA와 AK를 블로킹하고, {{t:call|콜}}을 받은 뒤에는 {{t:flush|플러시}}와 {{t:straight|스트레이트}}를 만들 기회가 있습니다. 4벳 크기는 {{t:in-position|인 포지션}}에서 3벳의 약 {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}, {{t:out-of-position|아웃 오브 포지션}}에서 {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}}입니다. 예를 들어 버튼에서 {{t:small-blind|스몰 블라인드}}의 {{n:pf.3bet.oop-total}}까지 3벳에 4벳할 때({{t:big-blind|빅 블라인드}}는 {{t:fold|폴드}}) {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}까지 {{t:raise|레이즈하고}}, {{t:cutoff|CO}}에서 버튼의 {{n:pf.3bet.ip-total}}까지 3벳에 4벳할 때는 약 {{n:pf.4bet.oop-example.low}}까지 {{t:raise|레이즈합니다}}. {{t:call|콜}} 후에는 스택에 {{t:pot|팟}}의 약 {{n:spr.4bet.high}}–{{n:spr.4bet.oop}}배가 남으므로, 좋은 핸드는 나머지를 쉽게 넣을 수 있습니다.
