---
id: m7.l1
module: m7
order: 1
title: "第二槍"
sub: "何時在轉牌再下注一次"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。翻牌 [[Jd 7c 3s]]，你持續{{t:bet|下注}}，他{{t:call|跟注}}。哪張轉牌最能幫助你的{{t:second-barrel|第二槍}}？"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "對：A 能擊中你{{t:open|開池}}{{t:range|範圍}}中的許多手牌（AK、AQ、AJ），而{{t:big-blind}}在翻牌{{t:call|跟注}}的主要是{{t:pair|對子}}和{{t:draw|聽牌}}。他的每個{{t:pair}}都會往下掉一名。" }
      - { text: "[[8h]]", why: "不對：8 與翻牌相連。它讓 T9 成{{t:straight|順子}}、讓 87 成{{t:two-pair}}，而這些都是{{t:big-blind}}大量防守的手牌。這張牌比較有利於他。" }
      - { text: "[[3h]]", why: "不算最差，但改變不大：它很少改善你的{{t:range}}，而有{{t:pair|對子}}的對手仍然有{{t:pair|對子}}。A 對你的{{t:second-barrel|第二槍}}幫助大得多。" }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "為什麼翻牌 [[Jd 7c 3s]] 之後轉牌出 A，很適合按鈕位的{{t:open|開池者}}打{{t:second-barrel|第二槍}}？"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "它擊中你的 AK 和 AQ，而對手的{{t:pair}}變成第二或第三大的{{t:pair|對子}}", correct: true, why: "對：高牌更常擊中{{t:open|開池者}}的{{t:range}}，而在翻牌用一{{t:pair|對}} J 或 7 {{t:call|跟注}}的對手，相對於{{t:board|公共牌}}，現在的手牌變弱了。" }
      - { text: "因為對手面對 A 總是會{{t:fold|棄牌}}", why: "不一定：有 A 或暗三條的對手會付錢。A 會提高{{t:fold}}的機率，但不保證任何事。" }
      - { text: "因為 A 讓對手的{{t:draw|聽牌}}成牌", why: "不對：在這組{{t:board|公共牌}}上，A 不會讓對手可能有的任何{{t:flush|同花}}或{{t:straight|順子}}成牌。它有幫助，是因為它符合你的{{t:range|範圍}}。" }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。翻牌你持續{{t:bet|下注}}，他{{t:call|跟注}}。轉牌是 7。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "在有 9 和 6 的{{t:board|公共牌}}上，7 讓 T8 和 85 成{{t:straight|順子}}、讓 76 和 97 成{{t:two-pair}}，這些都是{{t:big-blind}}會防守的手牌。你沒有{{t:pair|對子}}，也沒有{{t:draw|聽牌}}。你放棄{{t:bluff}}，拿一張免費牌。" }
      - { text: "下注 {{n:ex.bet.three-quarters}}", why: "這張牌符合對手的{{t:range|範圍}}，而不是你的，而且你沒有能變成強牌的 outs。用{{t:bluff|詐唬}}打{{t:second-barrel|第二槍}}，要選在對你有利的牌上，並用能改進的手牌。" }
      - { text: "下注 {{n:ex.bet.pot}}", why: "在對對手有利的牌上大額{{t:bluff}}風險很高：他必須在超過 {{n:alpha.bet-pot}} 的情況下{{t:fold|棄牌}}，而他在翻牌{{t:call|跟注}}後有很多{{t:pair|對子}}和{{t:draw|聽牌}}。" }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}在翻牌{{t:call|跟注}}了你的持續下注。轉牌是 A。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "下注 {{n:ex.bet.three-quarters}}", correct: true, why: "好的{{t:second-barrel}}：A 符合你的{{t:range|範圍}}，而且你有聽{{t:straight|順子}}的卡順（缺 10）。對手{{t:fold|棄掉}}{{t:pair|對子}}時，你立刻贏下；他{{t:call|跟注}}時，你仍有機會擊中。" }
      - { text: "下注 {{n:ex.bet.quarter}}", sizeError: true, why: "行動對，尺寸錯：這麼便宜的下注，對手用任何{{t:pair|對子}}都會{{t:call|跟注}}，而這個{{t:bluff}}主要靠對手{{t:fold|棄牌}}獲利。在對你有利的牌上要下大注，就像用強牌時一樣。" }
      - { text: "{{t:check|過牌}}", correct: true, why: "也可以：你有 outs，而且能免費看到河牌，所以{{t:check}}不是錯誤。在一個已公開的 solver 範例中，聽堅果{{t:straight|順子}}的卡順在轉牌{{t:check|過牌}}。兩種打法都正確。" }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}在翻牌{{t:call|跟注}}了你的持續下注。轉牌是 2。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "你沒有{{t:pair|對子}}，也沒有{{t:draw|聽牌}}：只剩一張牌要發，三張紅心不夠，而{{t:straight|順子}}還差兩張牌。2 什麼都沒改變，而對手在有 K 的{{t:board|公共牌}}上{{t:call|跟注}}了翻牌，所以他常常有{{t:pair|對子}}。你放棄{{t:bluff}}。" }
      - { text: "下注 {{n:ex.bet.three-quarters}}", why: "沒有 outs 的{{t:bluff|詐唬}}只有在對手{{t:fold|棄牌}}時才會贏。他在翻牌{{t:call|跟注}}後有很多{{t:pair|對子}}（K、8），面對一張無關緊要的 2 不會{{t:fold|棄牌}}。" }
      - { text: "{{t:fold|棄牌}}", why: "對手{{t:check|過牌}}，所以你可以免費{{t:check|過牌}}（第 1 單元的規則）。{{t:fold|棄牌}}會毫無理由地放棄{{t:pot|底池}}。" }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "你用{{t:flush-draw|同花聽牌}}{{t:bet|下注}}打{{t:second-barrel|第二槍}}，對手{{t:call|跟注}}。你還有多少機會？"
    options:
      - { text: "約 {{n:odds.flush.turn-river}} 能在河牌成{{t:flush}}", correct: true, why: "對：這是你贏的第二條路。{{n:cards.unseen.turn}} 張未知的牌中有 {{n:outs.flush}} 張 outs。所以{{t:semi-bluff}}比沒有 outs 的{{t:bluff|詐唬}}好。" }
      - { text: "沒有了，{{t:bluff}}失敗了", why: "沒有 outs 的{{t:bluff|詐唬}}已經沒有機會了，但你有{{t:draw}}：即使被{{t:call|跟注}}，河牌成{{t:flush}}照樣會贏。" }
      - { text: "約 {{n:odds.flush.flop-river}}", why: "那是你在翻牌、還有兩張牌要發時的機率。到了轉牌只剩一張：{{n:odds.flush.turn-river}}。" }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}在翻牌{{t:call|跟注}}了你的持續下注。轉牌是 2。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "一{{t:pair|對}} 9 是中等牌力：能贏{{t:bluff|詐唬}}，但輸給任何 K。面對第二次下注，對手會{{t:fold|棄掉}}較差的牌，而用 K 付錢。{{t:check|過牌}}讓你把{{t:pot|底池}}控制得小，並走到攤牌。" }
      - { text: "下注 {{n:ex.bet.three-quarters}}", why: "對手已經在有 K 的{{t:board|公共牌}}上{{t:call|跟注}}了翻牌。較差的牌（8、3）會{{t:fold|棄牌}}或只付一次，較好的牌則一定會付。這樣的下注是讓較好的牌賺錢。" }
      - { text: "下注，看看自己處在什麼位置", why: "「為了資訊」下注是常見的錯誤：你得為資訊付錢，因為較好的牌反正不會讓你脫身，而較差的牌會逃走。你下注是為了{{t:value|價值}}，或是當作{{t:bluff}}。" }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}在翻牌{{t:call|跟注}}了你的持續下注。轉牌是 2。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "為{{t:value|價值}}下注", correct: true, why: "帶最大踢腳的{{t:top-pair|頂對}}是強牌。對手{{t:call|跟注}}了翻牌，所以他常常有較弱的 K 或 8，會再付一次。" }
      - { text: "{{t:check|過牌}}，反正對手什麼都沒有", why: "對手{{t:call|跟注}}了翻牌，所以他常常有{{t:pair|對子}}。{{t:check|過牌}}會讓你損失一次較差的牌本來會付的{{t:bet}}。" }
      - { text: "全下", why: "較差的{{t:pair|對子}}很少會付掉整個籌碼。選一個能讓較弱的 K 和 8 付錢的尺寸。" }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "在轉牌，你最常用哪些手牌{{t:bet|下注}}打{{t:second-barrel|第二槍}}？"
    options:
      - { text: "強牌和{{t:draw|聽牌}}；中等牌{{t:check|過牌}}", correct: true, why: "對：強牌想被付錢，{{t:draw|聽牌}}有兩種贏法，而中等牌無法從再一次{{t:bet|下注}}中得到好處。" }
      - { text: "全部都打，以免失去{{t:initiative|主動權}}", why: "{{t:initiative|主動權}}本身不會讓你贏。對手{{t:call|跟注}}了翻牌，所以他的{{t:range}}更強，而沒有 outs 的牌和中等{{t:pair|對子}}會因為不斷下注而虧損。" }
      - { text: "只用最強的牌", why: "那樣的話，你每次下注對手都會棄牌，只有在贏你時才付錢。{{t:draw|聽牌}}是天然的{{t:semi-bluff|半詐唬}}。" }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，你用幾乎贏不了的牌{{t:bluff|詐唬}}，{{t:bet|下注}} {{n:ex.bet.three-quarters}}。對手必須多常{{t:fold|棄牌}}，這個{{t:bluff}}才能損益兩平？請輸入百分比數字。"
    answer: alpha.bet-three-quarters
    explanation: "Alpha = 下注 ÷ ({{t:pot}} + 下注) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}。有 outs 時，你需要的{{t:fold|棄牌}}較少，因為被{{t:call|跟注}}的情況中，有一部分你仍會在河牌贏下。"
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "為什麼對手{{t:call|跟注}}持續下注之後，他在轉牌的{{t:range}}比在翻牌時更強？"
    options:
      - { text: "因為他在翻牌已經{{t:fold|棄掉}}最弱的牌", correct: true, why: "對：面對持續下注，沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}的牌會{{t:fold|棄牌}}。剩下的是{{t:pair|對子}}和{{t:draw|聽牌}}，所以{{t:second-barrel}}面對的{{t:range}}比第一次下注時更強。" }
      - { text: "因為轉牌總是對他有利", why: "不對：轉牌是隨機的，有時對你有利（例如 A）。讓對手{{t:range|範圍}}變強的，是他自己在翻牌的決定。" }
      - { text: "並沒有，他的{{t:range}}和翻牌前一樣", why: "每個決定都會篩掉一部分手牌。{{t:call|跟注}}了{{t:bet}}的人，通常已經擊中某些牌，或是有{{t:draw}}。" }
---
{{t:second-barrel|第二槍}}是翻牌前{{t:raise|加注}}的玩家所下的第二次{{t:bet}}：翻牌持續下注、對手{{t:call}}，接著在轉牌下注。在轉牌，你不只要問「我有沒有牌」，也要問「這張牌幫的是我，還是對手」。

## 對手{{t:call|跟注}}了，所以他更強

面對持續下注，對手會{{t:fold|棄掉}}沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}的牌。{{t:call|跟注}}的人通常有{{t:pair|對子}}或{{t:draw}}，有時是帶後門的高牌（就像 M6 的防守）。因此{{t:second-barrel}}面對的{{t:range}}比第一次下注時更強，你不會用所有牌都再下注一次。

## 哪張牌有幫助

- **較低{{t:board|公共牌}}上的高牌**（A、K）通常有利於{{t:open|開池者}}：它擊中開池者的 AK、AQ、KQ，而對手的每個{{t:pair}}都會往下掉一名。在這類牌上，你更常再下注一次，包括用{{t:bluff|詐唬}}。
- **與{{t:board|公共牌}}相連的低牌**，例如 [[9h 6c 2d]] 上的 7，有利於{{t:big-blind|大盲}}：它讓大盲防守最多的手牌成{{t:straight|順子}}和{{t:two-pair}}。
- **空白牌**，例如 [[Kd 8c 3s]] 上的 2，改變不大。由你的手牌決定。

## 用什麼牌再下注一次

你用強牌（為了{{t:value|價值}}）和{{t:draw|聽牌}}（作為{{t:semi-bluff}}）下注。{{t:semi-bluff|半詐唬}}有兩種贏法：對手{{t:fold|棄牌}}，或你在河牌擊中。沒有{{t:pair|對子}}也沒有 outs 的牌，你比較常放棄，因為它們只能靠對手棄牌贏，除非它們阻擋了對手會拿來付錢的牌。當對手可能用{{t:raise|加注}}回應時，solver 也會用沒有 outs 的牌{{t:bluff|詐唬}}。

毫無勝算的{{t:bluff|詐唬}}，在對手以 下注 ÷ ({{t:pot}} + 下注) 的比例{{t:fold|棄牌}}時損益兩平（M6 的 alpha）。下注 3/4 {{t:pot|底池}}時是 {{n:alpha.bet-three-quarters}}，下注半個{{t:pot|底池}}時是 {{n:alpha.bet-half}}。

## 中等牌{{t:check|過牌}}

{{t:second-pair|第二對}}或踢腳弱的{{t:top-pair}}能贏{{t:bluff|詐唬}}，但輸給更好的{{t:pair|對子}}。面對第二次下注，較差的牌會{{t:fold|棄牌}}，較好的牌會付錢。你{{t:check|過牌}}，把{{t:pot|底池}}控制得小，並走到攤牌。

:::note 這些規則從哪來
這些大方向（高牌通常有利於{{t:second-barrel|第二槍}}、用有 outs 而非沒有 outs 的牌{{t:bluff|詐唬}}、中等牌{{t:check|過牌}}）是來自教學資料和 solver 分析的經驗法則，適用於約 {{n:format.stack}} 的籌碼深度。這是一種簡化：當沒有 outs 的牌能阻擋對手的價值牌，或對手可能用{{t:raise|加注}}回應時，solver 也會用其中一部分牌{{t:bluff|詐唬}}。這個 App 不提供以百分比表示的下注頻率，因為這類數字取決於 solver 結果中的具體牌局。
:::
