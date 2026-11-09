---
id: m11.l2
module: m11
order: 2
title: "跟注全下"
sub: "你需要多少勝率，以及為什麼跟注要更緊"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "你在{{t:big-blind|大盲}}位，有 {{n:m11.depth.10}}，沒有前注。{{t:small-blind|小盲}}全下 {{n:m11.depth.10}}。你需要百分之多少的勝率，{{t:call|跟注}}才有利可圖？請輸入數字。"
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "你的盲注已經在{{t:pot|底池}}裡，所以你只要補 {{n:m11.call.10.cost}}。{{t:call|跟注}}後{{t:pot|底池}}有 {{n:m11.call.10.pot}}：{{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}。"
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "同樣的局面，但雙方籌碼都是 {{n:m11.depth.5}}。你需要多少勝率才能{{t:call|跟注}}全下？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "你補 {{n:m11.call.5.cost}} 進{{t:pot|底池}}，{{t:call|跟注}}後底池有 {{n:m11.call.5.pot}}：{{n:m11.call.5.eq}}。籌碼越短，盲注占籌碼的比例越大，所以價格越好。" }
      - { text: "{{n:m11.call.10.eq}}", why: "這是 {{n:m11.depth.10}} 時的價格。在 {{n:m11.depth.5}} 時，你的盲注占整個籌碼的比例更大，所以需要的更少：{{n:m11.call.5.eq}}。" }
      - { text: "一半", why: "如果你要投入整個籌碼，才需要一半。盲注已經在{{t:pot|底池}}裡，所以你只要補 {{n:m11.call.5.cost}}。" }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "雙方籌碼都是 {{n:m11.depth.15}}，{{t:small-blind|小盲}}全下。你需要多少勝率才能{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "你補 {{n:m11.call.15.cost}} 進 {{n:m11.call.15.pot}} 的{{t:pot|底池}}：{{n:m11.call.15.eq}}。籌碼越深，越接近一半。" }
      - { text: "{{n:m11.call.5.eq}}", why: "這是 {{n:m11.depth.5}} 時的價格。在 {{n:m11.depth.15}} 時，盲注占籌碼的比例較小，所以價格上升到 {{n:m11.call.15.eq}}。" }
      - { text: "超過一半", why: "即使籌碼非常深，價格也不會超過一半：你的盲注永遠已經在{{t:pot|底池}}裡。" }
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
    prompt: "你在{{t:big-blind|大盲}}位，有 {{n:m11.depth.10}}，{{t:small-blind|小盲}}全下。請塗出你會{{t:call|跟注}}的手牌。"
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "在 {{n:m11.depth.10}} 時，求解器在{{t:small-blind|小盲}}位會用同花的七和六（76s）全下。你在{{t:big-blind|大盲}}位拿到這手牌，而{{t:small-blind|小盲}}全下了。你怎麼做？"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "用 76s 全下之所以有利，主要是靠對手{{t:fold|棄牌}}。{{t:call|跟注}}時，你只能在攤牌時獲勝，而且面對的是有很多高牌和{{t:pair|對子}}的全下{{t:range|範圍}}。求解器會{{t:fold|棄掉}}這手牌。" }
      - { text: "{{t:call|跟注}}，因為我在{{t:small-blind|小盲}}位也會用它全下", why: "{{t:call|跟注}}是另一種情況：你沒有棄牌收益，而對手的{{t:range|範圍}}比隨機牌更強。{{t:call|跟注}}需要更強的手牌。" }
      - { text: "{{t:call|跟注}}，因為同花牌發展性好", why: "全下之後就沒有後續行動，手牌沒有機會發展。只看到攤牌為止的勝率。" }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|大盲}}位，{{t:small-blind|小盲}}全下。你拿著一{{t:pair|對}}二。在 {{n:m11.depth.10}} 時，求解器會{{t:call|跟注}}。那在 {{n:m11.depth.15}} 時呢？"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "在 {{n:m11.depth.15}} 時，價格上升到 {{n:m11.call.15.eq}}，而全下{{t:range|範圍}}更窄（約 {{n:m11.push.15}} 的手牌），所以一{{t:pair|對}}二更常碰上更大的{{t:pair|對子}}。{{t:call|跟注}}{{t:range|範圍}}從約 {{n:m11.call.10}} 降到約 {{n:m11.call.15}} 的手牌。" }
      - { text: "{{t:call|跟注}}，因為{{t:pair|對子}}永遠是優勢方", why: "一{{t:pair|對}}二對上兩張高牌大約是擲硬幣，對上任何更大的{{t:pair|對子}}則明顯落後。籌碼越深，對手{{t:shove|推全下}}的弱牌越少，所以{{t:pair|對子}}在他的{{t:range|範圍}}中占比更大。" }
      - { text: "{{t:call|跟注}}，因為籌碼越深就越寬", why: "正好相反：籌碼越深，{{t:call|跟注}}的代價越高，{{t:call|跟注}}{{t:range|範圍}}也越窄。" }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "在 {{n:m11.depth.10}} 時，{{t:small-blind|小盲}}用約 {{n:m11.push.10}} 的手牌全下，但{{t:big-blind|大盲}}只用約 {{n:m11.call.10}} {{t:call|跟注}}。為什麼？"
    options:
      - { text: "跟注者沒有棄牌收益，而且面對的是比隨機牌更強的{{t:range|範圍}}", correct: true, why: "全下在對手{{t:fold|棄牌}}時也能獲勝。{{t:call|跟注}}只能在攤牌時獲勝，而且面對的是已經篩選過的手牌。所以有一條老規則：{{t:call|跟注}}需要的手牌要比率先全下更好。" }
      - { text: "{{t:big-blind|大盲}}要付更多", why: "雙方冒的是同樣的籌碼，而{{t:big-blind|BB}}的盲注已經在{{t:pot|底池}}裡，所以他要補的反而更少。" }
      - { text: "求解器算錯了", why: "這是「全下或{{t:fold|棄牌}}」遊戲的均衡：任何玩家只改變自己的{{t:range|範圍}}都無法獲利。差別來自棄牌收益。" }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "這局有{{t:bb-ante|大盲前注}}。你在{{t:big-blind|大盲}}位，有 {{n:m11.depth.10}}，並付了 {{n:m11.ante}} 的前注。{{t:small-blind|小盲}}全下。你需要多少勝率才能{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "你補的金額一樣（{{n:m11.call.10.cost}}），但{{t:pot|底池}}裡還有前注：{{t:call|跟注}}後是 {{n:m11.call.10-ante.pot}}。{{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}。所以有前注時你{{t:call|跟注}}更寬：約 {{n:m11.call.10-ante}} 的手牌，而不是 {{n:m11.call.10}}。" }
      - { text: "{{n:m11.call.10.eq}}", why: "這是沒有前注時的價格。前注留在{{t:pot|底池}}裡，所以補同樣的金額能贏更多：{{n:m11.call.10-ante.eq}}。" }
      - { text: "比沒有前注時更多，因為你付得更多", why: "前注是已經花掉的錢。只看你還要補多少、能贏多少。" }
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
    prompt: "三名玩家，每人籌碼 {{n:m11.depth.3max}}。按鈕位全下，{{t:small-blind|小盲}}{{t:call|跟注}}。你在{{t:big-blind|大盲}}位只需要 {{n:m11.3max.bb-two.eq}} 的勝率。你會比只有按鈕位全下時{{t:call|跟注}}得更寬嗎？"
    table: { position: BB }
    options:
      - { text: "不會，要更緊", correct: true, why: "價格更好，但你面對兩個{{t:range|範圍}}，其中包括一個拿著強牌的跟注者。求解器在這裡用約 {{n:m11.3max.call.bb-two}} 的手牌{{t:call|跟注}}，而只有按鈕位全下時約為 {{n:m11.3max.call.bb}}。" }
      - { text: "會，因為價格好很多", why: "價格更好還不夠：面對兩個對手，較弱手牌的勝率下降得很快。求解器只用約 {{n:m11.3max.call.bb-two}} 的手牌{{t:call|跟注}}。" }
      - { text: "一樣，因為只看你自己的手牌", why: "重要的是你對上對手手牌的勝率。跟注按鈕位全下的玩家，{{t:range|範圍}}比按鈕位更強，所以你要{{t:call|跟注}}得更緊。" }
---
當對手全下而你在{{t:big-blind|大盲}}位時，決定在形式上很簡單：{{t:call|跟注}}或{{t:fold|棄牌}}。{{t:call|跟注}}之後就沒有後續行動，所以只看價格，以及你對上全下{{t:range|範圍}}的勝率。

## {{t:call|跟注}}的價格

你的盲注已經在{{t:pot|底池}}裡。籌碼為 {{n:m11.depth.10}} 時，你補 {{n:m11.call.10.cost}}，{{t:call|跟注}}後{{t:pot|底池}}有 {{n:m11.call.10.pot}}。

```formula
所需勝率 = 補注金額 ÷ 跟注後的底池
```

| 籌碼 | 補注金額 | {{t:call|跟注}}後的{{t:pot|底池}} | 所需勝率 |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

籌碼越短，價格越好，因為你的盲注占整個籌碼的比例越大。

## {{t:call|跟注}}要比{{t:shove|推全下}}更緊

率先全下時，對手{{t:fold|棄牌}}你也能獲勝。{{t:call|跟注}}時，你只能在攤牌時獲勝，而且面對的是對手挑選來全下的手牌。所以{{t:call|跟注}}需要的手牌要比率先全下更好（文獻中稱為「gap concept」）。

```range
call.bb-10
```

在 {{n:m11.depth.10}} 時，{{t:small-blind|小盲}}用約 {{n:m11.push.10}} 的手牌全下，而{{t:big-blind|大盲}}用約 {{n:m11.call.10}} {{t:call|跟注}}。像 [[7s 6s]] 這樣的手牌，你在{{t:small-blind|小盲}}位會{{t:shove|推全下}}，但面對全下時要{{t:fold|棄掉}}：沒有棄牌收益，它們對上高牌和{{t:pair|對子}}的勝率太低。作為比較，某訓練網站的表格在 {{n:m11.depth.10}} 時給出的{{t:call|跟注}}{{t:range|範圍}}是 {{n:m11.ext.call.10}}。

```range
call.bb-15
```

```range
call.bb-5
```

籌碼越深，{{t:call|跟注}}越貴，對手的全下{{t:range|範圍}}也越窄，所以你{{t:call|跟注}}得越少：{{n:m11.depth.15}} 時約 {{n:m11.call.15}}，而 {{n:m11.depth.5}} 時多達約 {{n:m11.call.5}}。

## 當你後面還有人

三名玩家、每人籌碼 {{n:m11.depth.3max}} 時，{{t:small-blind|小盲}}只用約 {{n:m11.3max.call.sb}} 的手牌{{t:call|跟注}}按鈕位的全下，儘管他只需要 {{n:m11.3max.sb.eq}} 的勝率。在同樣情況下，當{{t:small-blind|小盲}}已經{{t:fold|棄牌}}，{{t:big-blind|大盲}}補 {{n:m11.3max.bb.cost}} 進 {{n:m11.3max.bb.pot}} 的{{t:pot|底池}}，需要 {{n:m11.3max.bb.eq}} 的勝率，並用約 {{n:m11.3max.call.bb}} {{t:call|跟注}}。差別主要來自你後面的玩家（價格差異不大）：{{t:small-blind|小盲}}{{t:call|跟注}}後，可能碰上{{t:big-blind|大盲}}更強的手牌。

```range
call.sb-vs-btn-3max
```

當已經有兩名玩家全下時，價格降到 {{n:m11.3max.bb-two.eq}}，但{{t:big-blind|大盲}}仍只用約 {{n:m11.3max.call.bb-two}} 的手牌{{t:call|跟注}}。面對兩個{{t:range|範圍}}，而且其中一個已經{{t:call|跟注}}全下，較弱的手牌勝率下降得很快。

```range
call.bb-vs-two-3max
```

## 有前注時{{t:call|跟注}}更寬

前注留在{{t:pot|底池}}裡，所以補同樣的金額能贏更多：在 {{n:m11.depth.10}}、{{t:bb-ante|大盲前注}} {{n:m11.ante}} 時，你需要 {{n:m11.call.10-ante.eq}}，而不是 {{n:m11.call.10.eq}}。有前注時對手也會{{t:shove|推全下}}得更寬，所以求解器用約 {{n:m11.call.10-ante}} 的手牌{{t:call|跟注}}。

```range
call.bb-10-ante
```

:::note 本課的{{t:range|範圍}}
這些圖表適用於兩人對局：其他人都{{t:fold|棄牌}}後，{{t:small-blind|小盲}}對{{t:big-blind|大盲}}，而且計算的是{{t:chips|籌碼}}，不是金錢。在{{t:tournament|錦標賽}}中當{{t:payout|獎金}}很重要時，你要{{t:call|跟注}}得更緊（下一課）。
:::
