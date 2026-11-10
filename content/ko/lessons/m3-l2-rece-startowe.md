---
id: m3.l2
module: m3
order: 2
title: "스타팅 핸드"
sub: "플롭 전에 어떤 카드를 플레이할까"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "어느 핸드가 더 강합니까?"
    options:
      - { text: "A♥ K♥ (같은 무늬)", correct: true, why: "랭크는 같지만, 같은 무늬 핸드는 {{t:flush}}로 이길 수 있는 길이 하나 더 있습니다." }
      - { text: "A♥ K♣ (다른 무늬)", why: "무늬가 다르면 {{t:flush}}를 만들 기회를 잃습니다." }
      - { text: "둘이 같습니다", why: "거의 같지만 완전히 같지는 않습니다. 카드의 무늬가 중요합니다." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "아직 아무도 팟에 참여하지 않았습니다. 어떻게 하시겠습니까?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "다른 무늬 7-2는 가장 약한 핸드 중 하나입니다. 두 카드가 너무 떨어져 있어 함께 {{t:straight}}를 만들 수 없고, {{t:flush}}도 드물게 만들며, {{t:pair}}를 맞혀도 키커가 약합니다. 흔히 최악의 핸드라고 불리지만, 무작위 핸드를 상대로 계산하면 다른 무늬 3-2 같은 몇몇 핸드는 결과가 더 나쁩니다." }
      - { text: "상대를 놀라게 하려고 {{t:raise|레이즈합니다}}", why: "뒤에 아직 네 명의 플레이어가 남아 있을 때 가장 약한 핸드 중 하나로 프리플롭에서 하는 {{t:bluff}}(상대가 더 좋은 핸드를 {{t:fold|폴드하게}} 만들려고 약한 핸드로 플레이하는 것)는 장기적으로 손실을 봅니다." }
      - { text: "싸니까 {{t:call|콜합니다}}", why: "약한 핸드로 ‘싸게’ 들어갈 때마다 쌓여서 큰 손실이 됩니다." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "앞의 플레이어가 {{t:raise|레이즈했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "다시 {{t:raise|레이즈합니다}} (3벳)", correct: true, why: "가능한 최고의 핸드입니다. 팟에 최대한 많이 넣고 상대 수를 줄이려는 것입니다." }
      - { text: "{{t:call|콜}}만 합니다", why: "숙련자는 상대를 속이려고 가끔 이렇게 플레이하지만, 원칙적으로는 밸류를 잃고 다른 플레이어를 싸게 들여보냅니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "에이스 페어는 프리플롭에서 절대 {{t:fold|폴드하지}} 않습니다. 다른 모든 핸드를 상대로 우세하며, 예를 들어 KK를 상대로는 약 {{n:pf.aa-vs-kk}}입니다." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "당신 차례까지 모두 {{t:fold|폴드했습니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|레이즈합니다}}", correct: true, why: "같은 무늬 QJ는 {{t:position|포지션}}에서 블라인드를 공격하기에 아주 좋은 핸드입니다. {{t:straight|스트레이트}}, 플러시, 높은 {{t:pair|페어}}를 만듭니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "버튼에서 이 핸드는 {{t:fold|폴드하기에는}} 너무 좋습니다." }
      - { text: "{{t:call|콜합니다}}", why: "{{t:raise|레이즈하는}} 편이 낫습니다. 블라인드를 바로 가져갈 기회가 있고, {{t:initiative}}을 쥐고 플레이합니다." }
---
초보자는 약한 핸드를 너무 많이 플레이하면서 돈의 대부분을 잃습니다. 시작 단계에서 핸드를 잘 고르는 것이 지는 것을 멈추는 가장 빠른 방법입니다.

## 핸드 그룹

- **가장 강한 핸드**: [[As Ah]], [[Ks Kh]], [[Qs Qh]], 그리고 같은 무늬와 다른 무늬 AK(예: [[As Ks]], [[As Kd]]). {{t:raise|레이즈합니다}}. 앞에서 누군가 {{t:raise|레이즈했다면}} 보통 {{t:value|밸류}}를 위해, 즉 상대가 더 약한 핸드로 {{t:call|콜하게}} 하려고 다시 {{t:raise|레이즈합니다}}(3벳).
- **강한 핸드**: JJ, TT, AQ, 같은 무늬 AJ, 같은 무늬 KQ.
- **투기적 핸드**: 작은 {{t:pair|페어}}와 같은 무늬의 연결된 카드(예: [[7h 6h]]). {{t:late-position}}에서 좋습니다.
- **약한 핸드**: 서로 떨어져 있고, 낮고, 무늬가 다른 카드(예: [[9c 3d]]). {{t:fold|폴드}}합니다.

:::note {{t:combo|콤보}}는 몇 개일까
스타팅 핸드는 모두 {{n:combos.total}}개의 {{t:combo|콤보}}가 있지만, 종류는 {{n:combos.kinds}}가지뿐입니다. {{t:pair|페어}} {{n:combos.kinds.pair}}가지, 같은 무늬 핸드 {{n:combos.kinds.suited}}가지, 다른 무늬 핸드 {{n:combos.kinds.offsuit}}가지입니다. {{t:pair}} 하나는 {{n:combos.pair}}개의 {{t:combo|콤보}}, 같은 무늬 핸드는 {{n:combos.suited}}개, 다른 무늬 핸드는 {{n:combos.offsuit}}개입니다. 그래서 다른 무늬 AK는 같은 무늬 AK보다 세 배 자주 나옵니다.
:::

위 그룹은 처음 시작하기 위한 단순화입니다. 각 {{t:position}}별 정확한 {{t:open|오픈}} {{t:range|레인지}}는 다음 레슨에서 {{t:range}} 그리드로 배웁니다.
