---
id: m5.l4
module: m5
order: 4
title: "沒有位置與對抗多名對手"
sub: "何時更常過牌"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "你從 {{t:cutoff|CO}} {{t:open|開池}}，按鈕位{{t:call|跟注}}，盲注位{{t:fold|棄牌}}。翻牌是中等牌面且{{t:connected}}。你先行動。哪個打法適合？"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "比{{t:in-position}}時更常{{t:check|過牌}}", correct: true, why: "對：按鈕位在有{{t:position|位置}}的情況下{{t:call|跟注}}，所以他的{{t:range}}很強，而中等且{{t:connected}}的翻牌很容易擊中他的{{t:pair|對子}}和{{t:connectors|連張}}。{{t:out-of-position|沒有位置}}時，你在這裡非常常{{t:check|過牌}}，即使拿著強牌也一樣。" }
      - { text: "經常小額 C-bet，就像在按鈕位時一樣", why: "這是{{t:in-position}}時在{{t:dry|乾燥}}的高牌翻牌上的打法。這裡你沒有{{t:position|位置}}，翻牌也不利於你的{{t:range|範圍}}。" }
      - { text: "所有牌都 C-bet，以免失去{{t:initiative|主動權}}", why: "{{t:initiative|主動權}}本身不會讓你贏：按鈕位的{{t:range}}在這裡很強，而你每次{{t:bet|下注}}之後，在轉牌和河牌也都要先行動。" }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "為什麼{{t:out-of-position}}時你 C-bet 的頻率比{{t:in-position}}時低？"
    options:
      - { text: "因為{{t:in-position}}的對手在每條{{t:street|街}}都能看到你的動作，而且他{{t:call|跟注}}後的{{t:range}}很強", correct: true, why: "對：在有{{t:position|位置}}時{{t:call|跟注}}的玩家，已經把弱牌{{t:fold|棄掉}}，最強的牌則常常{{t:raise|加注}}。他剩下的是中等牌和好牌，而且他最後行動。" }
      - { text: "因為{{t:out-of-position}}時禁止 C-bet", why: "不對：規則允許你在任何位置下注。重點是{{t:out-of-position}}時 C-bet 比較不划算。" }
      - { text: "因為{{t:out-of-position}}時你的牌總是比較弱", why: "不對：你的牌與{{t:position|位置}}無關。改變的是你能多容易實現它的權益。" }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "你從 {{t:cutoff|CO}} {{t:open|開池}}，按鈕位{{t:call|跟注}}，盲注位{{t:fold|棄牌}}。你在{{t:dry|乾燥}}的翻牌上拿到帶最佳踢腳的{{t:top-pair|頂對}}。你先行動。你怎麼做？"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|過牌}}（準備{{t:call|跟注}}按鈕位的{{t:bet}}）", correct: true, why: "對：按鈕位在有{{t:position|位置}}時{{t:call|跟注}}，所以他的{{t:range}}很強，而在這個翻牌上，求解器在{{t:out-of-position}}時幾乎用整個{{t:range|範圍}}{{t:check|過牌}}，包括帶最佳踢腳的{{t:top-pair|頂對}}。{{t:check|過牌}}之後，你{{t:call|跟注}}按鈕位的{{t:bet}}。" }
      - { text: "C-bet {{t:pot|底池}}的 {{n:cbet.size.small}}", why: "太頻繁：在這個局面中，求解器下注的比例不到 {{n:cbet.oop.a94.bet}}。帶最佳踢腳的{{t:top-pair|頂對}}要用{{t:check|過牌}}和{{t:call|跟注}}來打。" }
      - { text: "C-bet {{t:pot|底池}}的 {{n:cbet.size.big}}", why: "太頻繁：在這個局面中，求解器下注的比例不到 {{n:cbet.oop.a94.bet}}。帶最佳踢腳的{{t:top-pair|頂對}}要用{{t:check|過牌}}和{{t:call|跟注}}來打。" }
      - { text: "{{t:fold|棄牌}}", why: "還沒有人{{t:bet|下注}}，所以{{t:fold}}毫無好處：你可以免費{{t:check|過牌}}（第 1 單元的規則）。這手牌要用{{t:check|過牌}}和{{t:call|跟注}}來打。" }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "你從 {{t:cutoff|CO}} {{t:open|開池}}，按鈕位和{{t:big-blind}}{{t:call|跟注}}。翻牌時{{t:big-blind}}{{t:check|過牌}}，而按鈕位在你之後行動。你只有高牌，沒有{{t:draw|聽牌}}。你怎麼做？"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "對：對抗兩名對手時，沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}的牌很少能靠{{t:bet|下注}}贏下{{t:pot|底池}}。兩人之中有人擊中這個翻牌的機率更高。" }
      - { text: "小額 C-bet，像單挑時一樣", why: "對抗兩名對手時，{{t:bluff}}必須讓兩人都棄牌，而兩人同時沒中的機率遠低於一人沒中。" }
      - { text: "大額 C-bet，把兩人都逼走", why: "對抗兩名對手的大額{{t:bluff}}風險很高，而兩人都{{t:fold|棄牌}}的機率很小。在這個翻牌上，他們有很多{{t:pair|對子}}和{{t:draw|聽牌}}。" }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "你從 {{t:cutoff|CO}} {{t:open|開池}}，按鈕位和{{t:big-blind}}{{t:call|跟注}}。{{t:big-blind|大盲}}{{t:check|過牌}}。你拿到帶好踢腳的{{t:top-pair|頂對}}。你怎麼做？"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "對：在{{t:dry|乾燥}}翻牌的多人{{t:pot|底池}}中，求解器非常常{{t:check|過牌}}，即使拿著非常強的牌也一樣，因為兩名{{t:call|跟注者}}合起來擊中翻牌的機率更高。" }
      - { text: "為了{{t:value|價值}}下注", why: "對抗兩名對手時，在{{t:dry|乾燥}}的翻牌上，求解器即使拿著非常強的牌也會{{t:check|過牌}}；你很少下注、下注也小，主要是在翻牌很能擊中你的{{t:range}}時。" }
      - { text: "{{t:fold|棄牌}}", why: "沒有人{{t:bet|下注}}，所以你可以免費{{t:check|過牌}}。{{t:fold|棄牌}}等於放棄一個你很可能領先的{{t:pot|底池}}。" }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "一手沒有{{t:pair|對子}}的牌，約有 {{n:flop.miss.unpaired}} 的機率錯過翻牌。兩手這樣的牌（四種不同點數）同時錯過的機率是多少？"
    options:
      - { text: "約 {{n:flop.miss.two}}", correct: true, why: "對：計算方式和一手牌相同，只是能配成對子的牌更多：在 {{n:cards.unseen.two-hands}} 張未知牌（不含你的牌）中有 {{n:pair.outs.two-hands}} 張。{{n:cards.board.flop}} 張翻牌都不在其中的機率約為 {{n:flop.miss.two}}：兩人同時錯過的情況不到一半。" }
      - { text: "約 {{n:flop.miss.unpaired}}，和一手牌相同", why: "不對：每多一名對手，就多一次有人擊中的機會。所有人都錯過的機率，會隨著每多一名玩家而降低。" }
      - { text: "約 {{n:flop.hit.unpaired}}", why: "這是一手沒有{{t:pair|對子}}的牌在翻牌配成{{t:pair|對子}}的機率。題目問的是兩手牌都錯過。" }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "{{t:in-position}}複習：你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}，並在翻牌{{t:check|過牌}}。哪個打法適合這個翻牌？"
    position: BTN
    options:
      check: "更常{{t:check|過牌}}，C-bet 比平常少"
      small: "經常小額 C-bet：{{t:pot|底池}}的 {{n:cbet.size.small}}（{{n:cbet.btn.small}}）"
      big: "經常大額 C-bet：{{t:pot|底池}}的 {{n:cbet.size.big}}（{{n:cbet.btn.big}}）"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected], oesdPossible: false }
        best: small
        rule: R-M5-007
        why:
          check: "太保守：在{{t:dry|乾燥}}的高牌翻牌上，你有{{t:range-advantage|範圍優勢}}，而對手通常沒中。{{t:check|過牌}}等於送他一張免費牌。"
          small: "對：{{t:dry}}的高牌翻牌對你有利。小額{{t:bet}}就足以讓對手{{t:fold|棄掉}}弱牌，而較差的{{t:pair|對子}}仍會{{t:call|跟注}}。"
          big: "動作正確，尺寸錯誤：在{{t:dry|乾燥}}的翻牌上，對手的{{t:draw|聽牌}}很少，而沒中的牌面對小額{{t:bet}}也會{{t:fold|棄牌}}。較大的{{t:bet}}不會讓更多牌{{t:fold|棄牌}}，風險卻更高。下注約{{t:pot|底池}}的 {{n:cbet.size.small}}。"
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "對：牌點相近的低牌翻牌會擊中{{t:big-blind|大盲}}的{{t:range|範圍}}：他防守很多小牌手牌，而你的高牌在這裡沒擊中。在{{t:connected|連張}}翻牌上，他還有{{t:straight|順子}}和{{t:two-pair|兩對}}，所以你通常沒有{{t:nuts-advantage|堅果優勢}}。你 C-bet 的頻率比在高牌翻牌上低：很多牌{{t:check|過牌}}，下注的主要是強牌和強{{t:draw|聽牌}}。"
          small: "太頻繁：牌點相近的低牌翻牌會擊中{{t:big-blind|大盲}}的{{t:range|範圍}}，而在{{t:connected|連張}}翻牌上你通常沒有{{t:nuts-advantage|堅果優勢}}。頻繁的 C-bet，即使是小額，也會給{{t:big-blind|大盲}}用最強的牌{{t:raise|加注}}（check-raise）的機會。"
          big: "太頻繁也太貴：這個翻牌會擊中{{t:big-blind|大盲}}的{{t:range|範圍}}，而在{{t:connected|連張}}翻牌上他還有{{t:straight|順子}}和{{t:two-pair|兩對}}。當你自己通常只有高牌時，頻繁的大額 C-bet 風險很高。"
    count: 3
---
到目前為止，你都是{{t:in-position}}對抗一名對手。{{t:out-of-position|沒有位置}}以及對抗多名玩家時，你 C-bet 的頻率會更低。

## {{t:out-of-position|沒有位置}}

當你從 {{t:cutoff|CO}} {{t:open|開池}}、按鈕位{{t:call|跟注}}時，翻牌後你在每條{{t:street|街}}都先行動。而且按鈕位的{{t:range|範圍}}很強：他已經把弱牌{{t:fold|棄掉}}，部分最強的牌則{{t:raise|加注}}了，所以剩下的是中等牌和好牌。這種不含最強牌、主要由中等牌組成的{{t:range|範圍}}，就是{{t:condensed|壓縮}}的。因此，{{t:out-of-position}}時你{{t:check|過牌}}的頻率高得多，常常是整個{{t:range|範圍}}都過牌，包括強牌：你會用{{t:call|跟注}}或 check-raise 來打這些牌。你主要在非常有利於你{{t:range|範圍}}的翻牌上下注，例如 K-Q-6。{{t:out-of-position}}時{{t:check|過牌}}不代表放棄這手牌：其中很多牌會{{t:call|跟注}}對手的{{t:bet}}。

## 對抗多名對手

每多一名對手，就多一次有人擊中翻牌的機會。一手沒有{{t:pair|對子}}的牌約有 {{n:flop.miss.unpaired}} 的機率錯過翻牌，但兩手牌同時錯過的機率只有約 {{n:flop.miss.two}}。{{t:bluff|詐唬}}必須讓所有人都棄牌，所以對抗多名對手時，你主要放棄的是{{t:bluff|詐唬}}。你很少下注、下注也小，主要在很能擊中你{{t:range}}的翻牌上；在{{t:dry|乾燥}}的翻牌上，即使拿著非常強的牌，你也常常{{t:check|過牌}}。

:::note 這些規則從哪裡來
本課的規則來自已發表的求解器結果（{{t:out-of-position}}時的 C-bet、有 A 的翻牌上的 C-bet，以及多人{{t:pot|底池}}中的 C-bet）和教學資料（多人{{t:pot}}）。這些是經驗法則：App 不提供百分比形式的頻率。兩手牌同時錯過的機率，是針對四種不同點數的兩手牌所做的精確計算；它不計入你的牌，和一手牌的數字一樣。
:::
