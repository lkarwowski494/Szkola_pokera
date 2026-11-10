---
id: m8.l1
module: m8
order: 1
title: "河牌價值下注"
sub: "較差的牌會付錢時就下注"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "河牌：所有牌都已經發到{{t:board|公共牌}}上。到底為什麼要下注？"
    options:
      - { text: "讓較差的牌付錢，或讓較好的牌{{t:fold|棄牌}}", correct: true, why: "河牌已經沒有牌要發，所以下注只有兩個目的：價值（較差的牌付錢）或{{t:bluff}}（較好的牌{{t:fold|棄牌}}）。兩者都做不到的下注只會讓你白花錢。" }
      - { text: "為了不讓對手有機會補牌", why: "這是在翻牌和轉牌下注的理由。到了河牌，對手已經補不到任何牌：他的牌已經定型。" }
      - { text: "為了確認我的牌是不是最好的", why: "下注不是提問。你用中等牌下注時，較差的牌通常會{{t:fold|棄牌}}，較好的牌則會付錢，所以你是自掏腰包「打聽」。{{t:check|過牌}}之後就能免費知道。" }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "河牌，對手{{t:check|過牌}}。你估計你下注後，他會在{{n:value.ex.calls}}種情況下付錢：{{n:value.ex.many}}次是較差的牌，{{n:value.ex.few}}次是較好的牌。他不能{{t:raise|加注}}你。你要下注嗎？"
    options:
      - { text: "要，這是{{t:value|價值}}下注", correct: true, why: "你贏下這注{{n:value.ex.many}}次，輸掉{{n:value.ex.few}}次：淨賺{{n:value.ex.net}}注。超過{{n:value.threshold}}的{{t:call|跟注}}是較差的牌，所以下注比{{t:check}}賺得更多。" }
      - { text: "不要，因為他有時會用較好的牌付錢", why: "較好的牌總會在一部分情況下付錢。重點是較差的{{t:call|跟注}}是否多於較好的：這裡是{{n:value.ex.many}}比{{n:value.ex.few}}。" }
      - { text: "只有在對手絕不可能有較好的牌時才下注", why: "那樣你只會用堅果牌下注，放棄大量價值。只要超過{{n:value.threshold}}的{{t:call|跟注}}是較差的牌就夠了。" }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "河牌，對手{{t:check|過牌}}。你下注後，他會在{{n:value.ex.calls}}種情況下付錢：{{n:value.ex.few}}次是較差的牌，{{n:value.ex.many}}次是較好的牌。對手那些會{{t:fold|棄牌}}的較差牌，攤牌時本來就會輸給你。你怎麼做？"
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "下注會贏{{n:value.ex.few}}次、輸{{n:value.ex.many}}次：淨虧{{n:value.ex.net}}注。{{t:check|過牌}}後，你一樣能對同樣那些較差的牌贏下{{t:pot|底池}}，只是不必多付錢給較好的牌。" }
      - { text: "下注，因為我的牌還不錯", why: "光有牌力還不夠。重點是誰會付錢：這裡大多數{{t:call|跟注}}是較好的牌，所以下注會虧。" }
      - { text: "下大注，讓較好的牌{{t:fold|棄牌}}", why: "這等於拿一手經常在攤牌時獲勝的牌去{{t:bluff}}。較好的牌在河牌很少{{t:fold|棄牌}}，而{{t:check|過牌}}後你本來就能贏較差的牌。" }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "河牌。會有{{n:value.ex.many}}手較差的牌和{{n:value.ex.few}}手較好的牌{{t:call|跟注}}你的下注。在這{{n:value.ex.calls}}次{{t:call|跟注}}中，你淨賺幾注？請輸入數字。"
    answer: value.ex.net
    explanation: "每次較差的牌{{t:call}}，你贏一注；每次較好的牌跟注，你輸一注：{{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}。{{t:check|過牌}}後你同樣會對較差的牌贏下{{t:pot|底池}}，所以只計算下注的部分。"
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。你在翻牌和轉牌都下注，每次都被{{t:call}}。河牌，{{t:big-blind}}{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "{{t:value|價值}}下注", correct: true, why: "{{t:top-pair|頂對}}配最大踢腳。{{t:call|跟注}}了兩{{t:street|輪}}的對手有很多較弱的K（KQ、KJ、KT）和9，而這個{{t:board|公共牌}}面上的{{t:draw|聽牌}}很少。較差的牌付錢的頻率會遠高於較好的牌（{{t:two-pair}}、暗三條）。通常{{t:top-pair}}能承受兩{{t:value|輪價值下注}}（M9）；這裡可以打到第三輪，因為對手會用較弱的K付錢。" }
      - { text: "{{t:check|過牌}}，因為對手可能有暗三條", why: "有可能，但很少。{{t:check|過牌}}會讓你失去所有較弱的K本來會付的那一注。你要算的是誰會{{t:call|跟注}}，而不是有沒有更好的牌存在。" }
      - { text: "{{t:check|過牌}}，讓對手詐唬", why: "兩次都{{t:call|跟注}}的對手手上主要是{{t:pair|對子}}，在你{{t:check|過牌}}後很少{{t:bluff|詐唬}}。下注打他較弱的K，賺錢更穩。" }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。你在翻牌持續下注並被{{t:call}}，轉牌你們都{{t:check|過牌}}。河牌，{{t:big-blind}}{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "踢腳很弱的{{t:second-pair|第二對}}能贏沒聽中的{{t:draw|聽牌}}和較弱的{{t:pair|對子}}，但這些牌面對下注會{{t:fold|棄牌}}。會付錢的主要是K和踢腳較好的10。你{{t:check|過牌}}，免費看到攤牌。" }
      - { text: "{{t:value|價值}}下注", why: "誰會付錢？沒有{{t:pair|對子}}的牌會{{t:fold|棄牌}}，而K和踢腳較好的10會{{t:call|跟注}}。大多數{{t:call|跟注}}都會比你的牌好。" }
      - { text: "當作{{t:bluff}}下大注", why: "你的牌經常在攤牌時獲勝。{{t:bluff|詐唬}}就等於放棄這份勝利：較差的牌本來就會{{t:fold|棄牌}}，而K很少{{t:fold|棄牌}}。" }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。你在翻牌持續下注並被{{t:call}}，轉牌你們都{{t:check|過牌}}。河牌，{{t:big-blind}}{{t:check|過牌}}。你有{{t:top-pair|頂對}}配10踢腳。哪些牌會付小注，而且比你的牌差？"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "8、4，以及踢腳較弱的Q", correct: true, why: "這些牌跟注了翻牌而且有{{t:pair|對子}}，所以常會付小注。你會輸給踢腳較好的Q、{{t:two-pair|兩對}}、暗三條和{{t:straight|順子}}（A5、65），但較差的{{t:call|跟注}}更多。" }
      - { text: "沒有{{t:pair|對子}}的牌", why: "沒有{{t:pair|對子}}的牌很少付河牌的下注；有時A高牌會付錢，但這裡較差的{{t:pair|對子}}多得多。" }
      - { text: "沒有，只有較好的牌會付錢", why: "太保守了：{{t:big-blind}}會用許多比Q小的{{t:pair|對子}}防守。轉牌{{t:check|過牌}}後，他的{{t:range}}裡有不少這種牌。" }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "同樣的情況：你有{{t:top-pair|頂對}}配10踢腳，{{t:big-blind}}在河牌過牌。{{t:pot|底池}}裡有{{n:ex.pot}}。你怎麼做？"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "下注{{n:ex.bet.quarter}}，也就是1/4{{t:pot|底池}}", correct: true, why: "薄價值：你只贏過略多於一半會付錢的牌。小注會有8、4和較弱的Q{{t:call|跟注}}，所以較差的{{t:call|跟注}}仍多於較好的。" }
      - { text: "下注{{n:ex.bet.pot}}，也就是整個{{t:pot}}", sizeError: true, why: "行動對了，尺寸錯了：面對{{t:pot|底池}}大小的下注，8和4會{{t:fold|棄牌}}，付錢的主要是較好的Q、{{t:two-pair}}和暗三條。這樣大多數{{t:call|跟注}}都比你好。薄價值要下小注。" }
      - { text: "{{t:check|過牌}}", why: "你會損失價值：對手有很多較小的{{t:pair|對子}}會付小注。{{t:check|過牌}}就是把這些錢讓出去。" }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "朋友說：「在河牌拿著中等{{t:pair|對子}}時，我會下注來確認自己處境如何。」這個想法有什麼問題？"
    options:
      - { text: "較差的牌會{{t:fold|棄牌}}，而較好的牌會付錢", correct: true, why: "這樣下注後，你贏得了的牌會{{t:fold|棄牌}}，你輸給的牌則會付錢或{{t:raise|加注}}。{{t:check|過牌}}就能免費得到資訊，因為你有{{t:position|位置}}，對手會在攤牌時亮牌。" }
      - { text: "沒問題，這是取得資訊的好方法", why: "這裡的資訊要花一注，而這一注你通常會輸。{{t:check|過牌}}後，你不必多付錢就能看到對手的牌。" }
      - { text: "下注應該更大", why: "下更大的注只會更糟：會有更多較差的牌{{t:fold|棄牌}}，較好的牌照樣付錢。" }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "你的{{t:flush-draw}}沒聽中。你在河牌考慮下注。這會是哪一種下注？"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|詐唬}}", correct: true, why: "你只有Q高牌。任何會{{t:call|跟注}}你的牌都不會比你差，所以只有對手{{t:fold|棄牌}}時這注才能贏。這是{{t:bluff}}（如何挑選{{t:bluff|詐唬}}牌會在之後的課程介紹）。" }
      - { text: "{{t:value|價值}}下注", why: "{{t:value|價值}}下注需要較差的牌付錢。只有Q高牌時，幾乎沒有更差的牌會{{t:call|跟注}}你。" }
      - { text: "薄價值", why: "薄價值是用一手只贏過略多於一半{{t:call|跟注}}的牌下注。你的牌幾乎贏不了任何{{t:call|跟注}}。" }
---
到了河牌，所有牌都已經發到{{t:board|公共牌}}上。沒有人能再補到任何牌，所以下注只能做到兩件事：讓較差的牌付錢（**價值**），或讓較好的牌{{t:fold|棄牌}}（**{{t:bluff}}**）。這一課講價值，之後的課程會講{{t:bluff|詐唬}}和跟注。

## 門檻：超過一半的{{t:call|跟注}}

當你在有{{t:position|位置}}時下注，而對手只能{{t:call|跟注}}或{{t:fold|棄牌}}，你只計算他會拿來付錢的牌：

```formula
價值下注：較差的跟注 > 較好的跟注
```

每一次較差的牌{{t:call}}，你贏一注。每一次較好的牌{{t:call}}，你輸一注。對手用較差的牌{{t:fold|棄牌}}時，你贏到的{{t:pot|底池}}和{{t:check|過牌}}後一樣。所以，當會付錢的牌中超過 **{{n:value.threshold}}** 比你的牌差，下注就能賺錢。

例子：在{{n:value.ex.calls}}次{{t:call|跟注}}中，{{n:value.ex.many}}次是較差的牌，{{n:value.ex.few}}次是較好的牌。你淨賺{{n:value.ex.net}}注。如果比例反過來，你就會虧掉同樣多。

## 誰會付錢

你要問的不是「我的牌好不好」，而是「對手會用什麼牌付錢」。逐一檢視他的{{t:range}}會有幫助：

- 沒有{{t:pair|對子}}的牌很少付錢；有時A高牌會付錢，它能贏{{t:bluff|詐唬}}，
- 較小的{{t:pair|對子}}和踢腳較弱的牌常會付小注，
- 較好的牌一定會付錢，有時還會{{t:raise|加注}}。

如果對手可能{{t:raise|加注}}你，而你到時只能{{t:fold|棄牌}}，門檻就更高：只有在較差的{{t:call|跟注}}明顯佔多數時，下注才能賺錢。

## 薄價值：賺得少，但有人付

薄價值（thin value）是用一手只贏過略多於一半{{t:call|跟注}}的牌下注，例如踢腳中等的{{t:top-pair|頂對}}。這種下注要比強牌下得**更小**，通常約1/4–1/2{{t:pot|底池}}：小注連較弱的{{t:pair|對子}}也會付，但面對大注它們會{{t:fold|棄牌}}，只剩下較好的牌。

這是簡化的說法：沒有被過牌加注的風險時，求解器的薄價值下注甚至小到約1/4{{t:pot|底池}}；有這種風險時，在有{{t:position|位置}}的情況下很少低於1/2{{t:pot|底池}}。

## 中等牌就{{t:check|過牌}}

你{{t:in-position}}拿著中等牌，例如{{t:second-pair|第二對}}。對手較差的牌面對下注會{{t:fold|棄牌}}，而較好的牌會付錢。這時下注會把你的牌變成{{t:bluff}}。你{{t:check|過牌}}：攤牌時你能贏較差的牌，又不必多付錢給較好的牌。

:::note 這些規則從何而來
超過一半{{t:call|跟注}}的門檻是純數學（{{t:in-position}}下注，沒有{{t:raise|加注}}，也沒有抽水）。薄價值的下注尺寸和中等牌{{t:check}}，來自已發表的求解器分析（籌碼量較短的{{t:tournament|錦標賽}}）以及教學資料。
:::
