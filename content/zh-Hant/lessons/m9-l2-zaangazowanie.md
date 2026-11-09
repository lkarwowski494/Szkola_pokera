---
id: m9.l2
module: m9
order: 2
title: "底池承諾"
sub: "當你要把整個籌碼量打進去"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "翻牌，{{t:spr}} {{n:spr.commit}}：{{t:pot|底池}}裡有 {{n:ex.pot}}，雙方籌碼量各 {{n:commit.stack}}。你下注整個{{t:pot|底池}}（{{n:ex.bet.pot}}），對手全下。你要再補 {{n:commit.after-pot.call}}。你需要多少 equity 才能{{t:call|跟注}}？請以百分比輸入數字。"
    answer: eq.commit.after-pot
    explanation: "在對手多出的金額之前，{{t:pot|底池}}裡有 {{n:ex.pot.after-pot-call}}（{{t:pot}}、你的{{t:bet}}和對手跟上的金額）。你再補 {{n:commit.after-pot.call}}，所以所需 equity = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}。下了這樣的{{t:bet|下注}}之後，你已形成底池承諾：{{t:fold}}通常不划算。"
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "翻牌，{{t:spr}} {{n:spr.commit}}：{{t:pot|底池}}裡有 {{n:ex.pot}}，雙方籌碼量各 {{n:commit.stack}}。你下注半個{{t:pot|底池}}（{{n:ex.bet.half}}），對手全下。你要再補 {{n:commit.after-half.call}}。你需要多少 equity 才能{{t:call|跟注}}？請以百分比輸入數字。"
    answer: eq.commit.after-half
    explanation: "在對手多出的金額之前，{{t:pot|底池}}裡有 {{n:ex.half.total}}（{{t:pot}}、你的{{t:bet}}和對手跟上的金額）。你再補 {{n:commit.after-half.call}}：{{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}。比直接面對全下時（{{n:eq.jam.spr2}}）少，因為你已經投入了一部分的錢。"
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "翻牌，{{t:spr}} {{n:spr.commit}}。你有{{t:top-pair|頂對}}，下注整個{{t:pot|底池}}，對手全下。你需要 {{n:eq.commit.after-pot}} 的 equity 才能{{t:call|跟注}}。你怎麼做？"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "對：價格非常好。{{t:spr}}低時，對手也會拿{{t:draw|聽牌}}和較弱的 Q 全下，所以帶 A 的{{t:top-pair}}通常遠超過 {{n:eq.commit.after-pot}} 的 equity。它只會明顯輸給{{t:two-pair|兩對}}和三條。" }
      - { text: "{{t:fold|棄牌}}，因為全下代表強牌", why: "{{t:fold|棄牌}}等於放棄一個你已經投入不少的{{t:pot|底池}}。你只需要五次贏一次，也就是 {{n:eq.commit.after-pot}} 的情況。如果你本來就打算在這裡{{t:fold|棄牌}}，當初最好別下注整個{{t:pot|底池}}。" }
      - { text: "{{t:fold|棄牌}}，因為{{t:spr}}很低", why: "低{{t:spr}}的作用正好相反：此時更容易把整個籌碼量打進去，因為面對全下的價格更好。" }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "你{{t:bet|下注}}之後，籌碼量剩下的會比這筆下注被{{t:call|跟注}}後的{{t:pot}}還少。哪個計畫不合理？"
    options:
      - { text: "{{t:bet|下注}}，對手全下就{{t:fold}}", correct: true, why: "對，這個計畫是錯的：下了這樣的{{t:bet|下注}}之後，{{t:call|跟注}}全下只需要非常少的 equity（{{t:spr}} {{n:spr.commit}}、{{t:bet|下注}}大小等於{{t:pot|底池}}時只要 {{n:eq.commit.after-pot}}）。如果你反正會{{t:fold|棄牌}}，這筆{{t:bet}}只是白白送出{{t:chips}}。" }
      - { text: "直接全下", why: "拿強牌時這是合理的計畫：反正你要打整個籌碼量，就直接全部投入。" }
      - { text: "{{t:check|過牌}}", why: "當你不想打整個籌碼量時也合理：你不會投入那些之後讓你難以{{t:fold|棄牌}}的錢。" }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4-bet 後的{{t:pot|底池}}，{{t:spr}}約 {{n:spr.4bet}}。你中了帶最好踢腳的{{t:top-pair|頂對}}。你的計畫是？"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "打整個籌碼量", correct: true, why: "對：{{t:spr}}約 {{n:spr.4bet}} 時，全下只需要約 {{n:eq.jam.4bet}} 的 equity，而帶 A 的{{t:top-pair}}在這裡非常強。你下注或{{t:call|跟注}}，計畫把籌碼全部打進去。" }
      - { text: "小心打，遇到大{{t:bet}}就{{t:fold|棄牌}}", why: "在這麼低的{{t:spr}}下，拿{{t:top-pair|頂對}}{{t:fold}}放棄太多。4-bet 後對手也會有 AQ、QQ、JJ 和其他輸給你的牌。" }
      - { text: "小額下注，遇到全下就{{t:fold|棄牌}}", why: "這是低{{t:spr}}下的{{t:bet}}再{{t:fold}}計畫：你{{t:bet|下注}}之後，面對全下的價格會更好，而{{t:fold}}等於放棄你已經投入的{{t:pot|底池}}。" }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "為什麼在{{t:spr}}約 {{n:spr.commit}} 時，{{t:top-pair}}通常會打整個籌碼量？"
    options:
      - { text: "因為全下只需要約 {{n:eq.jam.spr2}} 的 equity，而兩次約為{{t:pot|底池}} {{n:geo.spr2.2}} 的{{t:bet|下注}}就能把整個籌碼量打進去", correct: true, why: "對：價格好，而且兩條{{t:value|價值街}}就足以把籌碼量打進去。{{t:top-pair}}通常撐得住這麼多。門檻本身只是經驗法則：對手拿什麼牌在打也很重要。" }
      - { text: "因為{{t:top-pair}}一定會贏", why: "不一定：有時對手有{{t:two-pair}}或三條。不過在低{{t:spr}}下，較差的牌和{{t:draw|聽牌}}會投入足夠的錢，而且價格很好。" }
      - { text: "因為{{t:spr}} {{n:spr.commit}} 時規則不允許你{{t:fold|棄牌}}", why: "你隨時都可以{{t:fold|棄牌}}。重點是{{t:fold}}通常代價大於收益：全下只需要約 {{n:eq.jam.spr2}} 的 equity。" }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "單次加注的{{t:pot|底池}}，雙方籌碼量各 {{n:format.stack}}，{{t:spr}}約 {{n:spr.srp}}。你中了帶好踢腳的{{t:top-pair|頂對}}。你怎麼看待這手牌？"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "當作價值牌，但通常不打整個籌碼量", correct: true, why: "對：{{t:spr}}約 {{n:spr.srp}} 時，要經過好幾次大於{{t:pot}}的{{t:bet|下注}}，整個籌碼量才會進去。願意投入這麼多的對手，很少拿比一個{{t:pair}}更差的牌。" }
      - { text: "打整個籌碼量，因為{{t:top-pair}}很強", why: "{{t:spr}} {{n:spr.commit}} 時是這樣，但這裡{{t:spr}}約 {{n:spr.srp}}。當整個籌碼量都進了{{t:pot|底池}}，對手通常有{{t:two-pair}}、三條或更好的{{t:pair|對子}}。" }
      - { text: "對手第一次{{t:bet}}就{{t:fold|棄牌}}", why: "太保守了：帶好踢腳的{{t:top-pair}}在這個翻牌面是強牌。重點是不要用它做出整個籌碼量的{{t:pot|底池}}，而不是{{t:fold}}。" }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4-bet 後的{{t:pot|底池}}，{{t:spr}}約 {{n:spr.4bet}}。你有{{t:pair|一對}} J，翻牌上有 A 和 K。對手全下。「低{{t:spr}}時我打整個籌碼量」這條規則怎麼看？"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "不涵蓋這手牌：它是比{{t:board|公共牌}}兩張高牌都小的{{t:pair}}", correct: true, why: "對：這條規則講的是{{t:top-pair|頂對}}和更好的牌。4-bet 後對手常有 A 或 K，而你的 J 會輸給任何用高牌組成的{{t:pair|對子}}。這裡儘管價格不錯（{{n:eq.jam.4bet}}），你更常{{t:fold|棄牌}}。" }
      - { text: "涵蓋：低{{t:spr}}時我什麼牌都{{t:call|跟注}}", why: "低{{t:spr}}給你好價格，但不會把弱牌變成強牌。當對手常有更好的{{t:pair|對子}}時，即使只需 {{n:eq.jam.4bet}} 的 equity 也可能太多。" }
      - { text: "涵蓋，但只在我有{{t:position|位置}}時", why: "{{t:position|位置}}不會改變你手上拿什麼牌。這條規則針對{{t:top-pair|頂對}}和更好的牌。" }
---
底池承諾（英文：commitment）是指{{t:pot|底池}}裡相對於你的籌碼量已經有很多錢，以至於面對全下時{{t:fold}}幾乎永遠不划算。上一課的{{t:spr}}能告訴你，在翻牌一開始你就已經離這個狀態多近。

## {{t:bet|下注}}之後，價格會更好

例子：{{t:spr}} {{n:spr.commit}}，{{t:pot|底池}}裡有 {{n:ex.pot}}，雙方籌碼量各 {{n:commit.stack}}。如果對手直接全下，你需要 {{n:eq.jam.spr2}} 的 equity。如果你先下注，需要的會更少：

| 對手全下前你的{{t:bet}} | 需補金額 | 所需 equity |
|---|---|---|
| 無（對手直接全下） | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| 半個{{t:pot|底池}}（{{n:ex.bet.half}}） | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| 整個{{t:pot}}（{{n:ex.bet.pot}}） | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## 不要計畫{{t:bet|下注}}再{{t:fold|棄牌}}

如果你{{t:bet|下注}}之後，籌碼量剩下的會比這筆下注被{{t:call|跟注}}後的{{t:pot}}還少，那麼{{t:bet}}之後面對全下再{{t:fold}}通常不合理：這時{{t:call|跟注}}全下所需的 equity，比{{t:call|跟注}}一個底池大小的{{t:bet|下注}}（{{n:eq.bet-pot}}）還少。你有兩條合理的路：打整個籌碼量（下注或全下），或是{{t:check|過牌}}。

## 低{{t:spr}}：{{t:top-pair}}打整個籌碼量

規則：**翻牌時{{t:spr}}低於約 {{n:spr.zone.low}} 時，{{t:top-pair}}和更好的牌通常會打整個籌碼量**（上一課的{{t:spr}}區間）。例子中的{{t:spr}} {{n:spr.commit}} 落在這個區間，而此時的計算支持這條規則：

- 全下最多只需要約 {{n:eq.jam.spr2}} 的 equity，自己先{{t:bet|下注}}後還會更少，
- 兩次約為{{t:pot|底池}} {{n:geo.spr2.2}} 的{{t:bet|下注}}就能把整個籌碼量打進去：{{t:pot|底池}}為 {{n:ex.pot}} 時，翻牌下 {{n:geo.spr2.flop}}、轉牌下 {{n:geo.spr2.turn}}，合計 {{n:geo.spr2.total}}，
- {{t:top-pair}}通常撐得住兩條{{t:value|價值街}}（見三條{{t:street|街}}計畫那一課）。

不過，計算本身並不能定出精確的門檻。{{t:top-pair}}的 equity 夠不夠，取決於對手拿什麼牌在打。所以這是經驗法則，不是硬性定律。這條規則針對{{t:top-pair|頂對}}和更好的牌：比{{t:board|公共牌}}上高牌還小的{{t:pair}}不符合。

## 高{{t:spr}}：一個{{t:pair}}要打得更小心

在單次加注的{{t:pot|底池}}中，{{t:spr}}約為 {{n:spr.srp}}。要在河牌前把整個籌碼量打進去，每條{{t:street|街}}都得下注超過{{t:pot|底池}}（見幾何下注尺度那一課）。願意投入這麼多錢的對手，很少拿比一個{{t:pair}}更差的牌。所以在這種{{t:pot|底池}}裡拿一個{{t:pair|對子}}，你是打價值，但通常不會計畫打整個籌碼量。

:::note 這些原則從哪裡來
約 {{n:spr.zone.low}} 的界線來自教學資料和一份已發表的 solver 分析（{{t:spr}}約 {{n:spr.commit}} 時，所有{{t:top-pair}}和更好的牌都會打整個籌碼量）。高{{t:spr}}時對一個{{t:pair|對子}}保持謹慎，則有教學資料和 solver 分析佐證。本課中關於價格和下注大小的數字都是純數學。
:::
