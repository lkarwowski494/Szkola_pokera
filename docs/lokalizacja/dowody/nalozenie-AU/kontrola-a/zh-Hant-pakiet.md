# Pakiet kontroli (a), zh-Hant: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:45
NOWE:       - { text: "是錯的，雖然贏了", correct: true, why: "你需要 {{n:eq.bet-half}} 的權益，而{{t:flush-draw|同花聽牌}}在河牌成牌的機率約為 {{n:odds.flush.turn-river}}。對手已經全下，之後不會再多付你任何錢。重複很多次之後，這樣的{{t:call|跟注}}會虧錢。" }
STARE:       - { text: "是錯的，雖然贏了", correct: true, why: "你需要 {{n:eq.bet-half}} 的 equity，而{{t:flush-draw|同花聽牌}}在河牌成牌的機率約為 {{n:odds.flush.turn-river}}。對手已經全下，之後不會再多付你任何錢。重複很多次之後，這樣的{{t:call|跟注}}會虧錢。" }

## [2] exams/m12.yaml:46
NOWE:       - { text: "是對的，因為你贏了{{t:pot|底池}}", why: "單一手牌的結果不會改變價格。評價針對的是你根據當時資訊所做的決策：{{n:odds.flush.turn-river}} 的權益對上所需的 {{n:eq.bet-half}}。" }
STARE:       - { text: "是對的，因為你贏了{{t:pot|底池}}", why: "單一手牌的結果不會改變價格。評價針對的是你根據當時資訊所做的決策：{{n:odds.flush.turn-river}} 的 equity 對上所需的 {{n:eq.bet-half}}。" }

## [3] lessons/m12-l1-wariancja.md:74
NOWE:       - { text: "第一位約 {{n:dd.p.big.100k}}，第二位約 {{n:dd.p.big.100k.wr-low}} 的情況", correct: true, why: "贏率較低，把結果往上拉的力量較弱，所以{{t:downswing|下風期}}更深、也更頻繁。在 {{n:dd.wr-low}}（微級別贏錢玩家的典型贏率）下，{{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}在超過一半的樣本中出現。" }
STARE:       - { text: "第一位約 {{n:dd.p.big.100k}}，第二位約 {{n:dd.p.big.100k.wr-low}} 的情況", correct: true, why: "贏率較低，把結果往上拉的力量較弱，所以{{t:downswing|下風期}}更深、也更頻繁。在 {{n:dd.wr-low}}（微注級別贏錢玩家的典型贏率）下，{{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}在超過一半的樣本中出現。" }

## [4] lessons/m12-l1-wariancja.md:93
NOWE:       - { text: "約 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "這是微級別贏錢玩家的典型贏率。{{t:standard-deviation|標準差}}比贏率大數十倍，所以結果才會波動這麼大。" }
STARE:       - { text: "約 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "這是微注級別贏錢玩家的典型贏率。{{t:standard-deviation|標準差}}比贏率大數十倍，所以結果才會波動這麼大。" }

## [5] lessons/m12-l1-wariancja.md:100
NOWE: **贏率**是每 100 手牌的平均獲利，以{{t:big-blind|大盲注}}計算。微級別的贏錢玩家通常是 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}。
STARE: **贏率**是每 100 手牌的平均獲利，以{{t:big-blind|大盲注}}計算。微注級別的贏錢玩家通常是 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}。

## [6] lessons/m12-l2-decyzja-wynik.md:22
NOWE:     prompt: "翻牌前全下時，AA 對上 KK 約有 {{n:pf.aa-vs-kk}} 的情況會贏。即使做了所能做出的最好決策，你仍會在百分之多少的情況下輸掉？請輸入數字。"
STARE:     prompt: "翻牌前全下時，AA 對上 KK 約有 {{n:pf.aa-vs-kk}} 的情況會贏。即使做了最好的決策，你仍會在百分之多少的情況下輸掉？請輸入數字。"

## [7] lessons/m12-l2-decyzja-wynik.md:86
NOWE:       - { text: "什麼都不做，這個{{t:session|場次}}贏了", why: "贏的{{t:session|場次}}裡的錯誤一樣代價高昂，只是更難察覺。只檢討輸的場次，會漏掉一半的錯誤。" }
STARE:       - { text: "什麼都不做，這個{{t:session|場次}}贏了", why: "贏的{{t:session|場次}}裡的錯誤一樣代價高昂，只是更難察覺。只檢討輸的{{t:session|場次}}，會漏掉一半的錯誤。" }

## [8] lessons/m12-l2-decyzja-wynik.md:97
NOWE: 拿{{t:pair|一對}} A 對上{{t:pair|一對}} K 全下，是所能做出的最好決策，但仍有約 **{{n:res.kk-wins}}** 的情況會輸。另一方面，在轉牌用{{t:flush-draw|同花聽牌}}{{t:call|跟注}}整個{{t:pot|底池}}的下注是差的（你需要 {{n:eq.bet-pot}}，你約有 {{n:odds.flush.turn-river}}），但大約每五次仍會贏一次。
STARE: 拿{{t:pair|一對}} A 對上{{t:pair|一對}} K 全下，是最好的決策，但仍有約 **{{n:res.kk-wins}}** 的情況會輸。另一方面，在轉牌用{{t:flush-draw|同花聽牌}}{{t:call|跟注}}整個{{t:pot|底池}}的下注是差的（你需要 {{n:eq.bet-pot}}，你約有 {{n:odds.flush.turn-river}}），但大約每五次仍會贏一次。

## [9] lessons/m12-l3-tilt.md:100
NOWE: 上頭（tilt）是在負面情緒影響下失去控制，通常發生在被逆轉或長時間連輸之後。結果就是做出糟糕的決策，輸得比平常多很多。這並不少見：在一項問卷調查中，{{n:tilt.severe}} 的玩家承認過去六個月內至少嚴重上頭過一次。
STARE: 上頭是在負面情緒影響下失去控制，通常發生在被逆轉或長時間連輸之後。結果就是做出糟糕的決策，輸得比平常多很多。這並不少見：在一項問卷調查中，{{n:tilt.severe}} 的玩家承認過去六個月內至少嚴重上頭過一次。

## [10] lessons/m12-l3-tilt.md:133
NOWE: 如果你打得比原本計畫的久、追輸，或用輸不起的錢在打牌，請閱讀資金那一課裡關於負責任遊戲的卡片。
STARE: 如果你打得比原本計畫的久、想把輸的追回來，或用輸不起的錢在打牌，請閱讀資金那一課裡關於負責任遊戲的卡片。

## [11] lessons/m12-l4-bankroll.md:51
NOWE:       - { text: "升到更高的{{t:stakes|級別}}，想更快贏回來", why: "這是絕望型上頭。以{{t:buy-in|買入}}計資金變少時還打更高的{{t:stakes|級別}}，會急遽提高{{t:risk-of-ruin|破產風險}}。" }
STARE:       - { text: "升到更高的{{t:stakes|級別}}，想更快贏回來", why: "這是出於絕望的上頭。以{{t:buy-in|買入}}計資金變少時還打更高的{{t:stakes|級別}}，會急遽提高{{t:risk-of-ruin|破產風險}}。" }

## [12] lessons/m12-l4-bankroll.md:123
NOWE: 這個公式是在贏率和 SD 固定時的近似值。贏率和 SD 以 bb/100 表示，資金以 bb 表示。在{{t:standard-deviation|標準差}}為 {{n:var.sd}} 時：
STARE: 這個公式是在贏率和 SD 固定時的近似值。贏率和 SD 以 bb/100 輸入，資金以 bb 輸入。在{{t:standard-deviation|標準差}}為 {{n:var.sd}} 時：

## [13] rules.yaml R-M12-006
NOWE:
```
- id: R-M12-006
  module: m12
  if: "你注意到自己上頭側寫中的最初訊號（例如被爆冷後生氣、想懲罰對手）"
  then: "你立刻反應：深呼吸，再加上一句事先準備好的話，提醒自己為什麼這是{{t:variance|變異數}}，或是可以學習的錯誤"
  because: "上頭一旦加劇，你就無法清楚思考，這時就再也控制不住了"
  level: heuristic
  source: "Tendler，新聞網站訪談（2014）（「When tilt becomes too intense, it shuts down your ability to think」，「you must begin correcting tilt when it's small」）；Tendler 與 Carter，The Mental Game of Poker（2011），「injecting logic」技巧"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-006
  module: m12
  if: "你注意到自己檔案中情緒失控（tilt）的第一個徵兆（例如被爆冷後生氣、想懲罰對手）"
  then: "你立刻反應：深呼吸，再加上一句事先準備好的話，提醒自己為什麼這是{{t:variance|變異數}}，或是可以學習的錯誤"
  because: "情緒失控一旦加劇，你就無法清楚思考，這時就再也控制不住了"
  level: heuristic
  source: "Tendler，新聞網站訪談（2014）（「When tilt becomes too intense, it shuts down your ability to think」，「you must begin correcting tilt when it's small」）；Tendler 與 Carter，The Mental Game of Poker（2011），「injecting logic」技巧"
  sources: [{ kind: book }]
```
