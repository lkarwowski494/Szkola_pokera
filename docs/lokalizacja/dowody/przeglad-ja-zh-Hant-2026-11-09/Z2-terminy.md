# Z2: terminologia pokerowa zh-Hant (Tajwan) w przekładzie

Metoda: skrypt (/tmp/claude-0/-home-user-Szkola-pokera/d839158c-d2a6-5909-a9e4-6de954e34a7f/scratchpad/z2/terms.py) zlicza {{t:klucz|forma}} we wszystkich plikach tl/content/zh-Hant/** i tl/ui/zh-Hant.json; „∅” = znacznik bez formy (pokazuje nazwę angielską). Dla terminów, które w pl stoją bez znacznika (outs, c-bet, 3-bet, stack, kicker, pot odds…), drugi skrypt (z2/raw.py) liczy wystąpienia form w czystym tekście (z pominięciem linii z adresami URL); te liczby oznaczone „tekst”. Źródła czytane 2026-11-09: zh.wikipedia przez WebFetch; pozostałe strony pobrane curl i przeczytane jako tekst (WebFetch zwracał pustą stronę albo 403); kopie: /tmp/claude-0/-home-user-Szkola-pokera/d839158c-d2a6-5909-a9e4-6de954e34a7f/scratchpad/z2/web/. Główne źródło tajwańskie: glosariusz zh-TW aplikacji szkoleniowej POKER Q'z (pokerqz.com/zh-TW, wersja tradycyjna osobna od 简体中文). Strony kasyn/sal (kpoker.tw, gtbetwn888.com) traktuję tylko jako świadectwo użycia słowa, nie jako autorytet.

Skróty źródeł:
- W = https://zh.wikipedia.org/zh-tw/德州撲克
- R = https://zh.wikipedia.org/zh-tw/撲克牌型
- PQ/x = https://pokerqz.com/zh-TW/tools/glossary/x ; PQR = https://pokerqz.com/zh-TW/blog/texas-holdem-rules
- PF = https://pokerfans.jp/poker-word?_lang=zh_TW (glosariusz zh_TW)
- SP = https://sixpoker666.com/blogs/新手知識區/德州撲克機率 (tajwański blog)
- KP = https://kpoker.tw/texas-holdem-terms/
- GT = https://gtbetwn888.com/all/texas-holdem-poker-terms-glossary/
- M9 = https://digit.make9.tw/startup/other/texas-holdem-guide-beginner-to-advanced/

| klucz | en | forma w przekładzie (liczba wystąpień) | inne formy | źródło (adres, cytat, data odczytu) | ocena |
|---|---|---|---|---|---|
| fold | fold | 棄牌 (620 znaczników) | 棄掉 39; 蓋牌 27 i 蓋掉 1 — wszystkie w lessons/m11-l1-push-fold.md; 已棄牌 1 (UI); ∅ 47 | PQR: „棄牌（…）：不玩這手，放棄已投入的籌碼”; W: „蓋牌（fold），即捨棄並覆蓋手中的牌”; 2026-11-09 | utarte (oba warianty na TW); niespójność: m11-l1 jedyna lekcja z 蓋牌 → ujednolicić do 棄牌 (ŚREDNIE) |
| call | call | 跟注 (804) | 跟 1 (m1-l1, OK w zdaniu); 跟注者 2; **檢視 1 (m9-l4:130 — błędny znacznik, „przejrzeć plan”, błąd z pl)**; ∅ 61 | W: „跟注（call），投入了與所有其他未蓋牌的玩家等量的籌碼。”; 2026-11-09 | utarte; 1 błąd znacznika (ŚREDNIE, w poprawkach) |
| raise | raise | 加注 (308) | ∅ 10; tekst: 加碼 2 (terms-def: „中文也稱「加碼」”) | W: „加注（raise），依據加注規則加注。”; KP: „你可以加碼至 200、300…”; 2026-11-09 | utarte, spójne |
| bet | bet | 下注 (308) | 注 4, 下 1, 下出 1 (warianty składniowe, OK); **定 1 (m10-l3:122 — błędny znacznik „定界線”, błąd z pl)**; ∅ 99 | PQ/bet: „當其他玩家尚未下注時，這個動作會引入新的注碼到遊戲中”; 2026-11-09 | utarte; 1 błąd znacznika (ŚREDNIE) |
| check | check | 過牌 (274) | ∅ 12 | W: „她選擇不加注而只「過牌」（check）”; PQ/check: „在沒有下注的情況下選擇過牌”; 2026-11-09 | utarte, spójne |
| pot | pot | 底池 (810) | ∅ 81 | PQ/pot: „pot 指的是目前在桌上累積的籌碼總量”; KP: „Pot … 底池，所有玩家投入的籌碼總和”; (W używa starszego 彩池); 2026-11-09 | utarte, spójne |
| small-blind / big-blind | blinds | 小盲 (104) / 大盲 (142); tekst 盲注 119 | 小盲注 3, 大盲注 15, 大盲位 3, SB 5, BB 6; ∅ 23 / 117 | W: „須下小盲注（small blind），金額等於大盲注（big blind）的一半。”; PQ/blind: „「blinds」指的是…強制性下注”; 2026-11-09 | utarte; 大盲/大盲注 to dopuszczalne warianty |
| button | button | 按鈕位 (tekst 330); znacznik tylko BTN 3 | 莊位 36 — wszystkie w lessons/m6-l3-check-raise.md; Button 5 | PQ/button: „按鈕位（BTN） / 按鈕、按鈕位、Button、BTN”; 2026-11-09 | utarte; m6-l3 (莊位) niespójne → 按鈕位 (ŚREDNIE) |
| range | range | 範圍 (192) | ∅ 54 | PQ/hand-range: „可能持有的手牌範圍（牌的組合）”; KP: „Range 手牌範圍”; 2026-11-09 | utarte, spójne |
| equity | equity | 權益 (12 znaczników; tekst 153) | 勝率 (3 znaczniki w m13-l3; tekst 108, m.in. m6-l1, m6-l2, m11-l2, m8-l4, m12-l2: „所需勝率”); łacińskie „equity” w tekście 72 | PQ/equity: „權益（EQ） / 權益, EQ”; SP: „我們需要約30%的勝率才能抵抗這手牌”; 2026-11-09 | oba utarte; niespójność między UI/terms-def (權益) a lekcjami (勝率) → termin 權益, „所需勝率” (PQ ma hasło „所需勝率”) można zostawić jako zwrot (ŚREDNIE) |
| pot-odds | pot odds | brak znaczników (pl bez znacznika); tekst: 底池賠率 8, 賠率 52 | pot odds 1 | PQ/pot-odds: „底池賠率 / Odds”; PF: „Pot Odds（底池賠率）”; 2026-11-09 | utarte |
| outs | outs | 補牌 (1 znacznik; tekst 89) | „outs” po łacinie w tekście (część to identyfikatory) | SP: „補牌數指的是尚未發出並且可以讓你的牌型變更強的「補牌」，通常我們常用「Outs」來稱呼”; PF: „Outs（出路）也叫補牌”; 2026-11-09 | utarte |
| draw | draw | 聽牌 (178) | ∅ 23 | PF: „Draw（聽牌）聽牌是指未完成的組合”; 2026-11-09 | utarte, spójne |
| bluff | bluff | 詐唬 (414) | ∅ 60 (tekst 唬牌 37 to część 抓詐唬牌 = bluff-catcher, OK) | KP: „Bluff … 詐唬，用弱牌裝強嚇對手”; PQ/pure-bluff: „純詐唬…半詐唬（semi-bluff）”; 2026-11-09 | utarte, spójne |
| value-bet | value bet | 價值下注 (1; tekst 10) | — | PQ/value-bet: „價值下注 / Value”; 2026-11-09 | utarte |
| c-bet | c-bet | 持續下注 (2 znaczniki UI; tekst 52) | łacina „c-bet” 145 i „C-bet” 60 (m5-l3, m5-l4, m7-l4) | PQ/continuation-bet: „持續下注（CB） / 持續下注, CB, C-bet, Cbet”; 2026-11-09 | oba utarte; niespójna wielkość liter c-bet/C-bet (NISKIE) |
| 3-bet | 3-bet | „3-bet” (tekst 271) | 三次下注 3, 再加注 1 | PQ/3bet: „3bet, re-raise, 3-bet”; KP: „3bet 3-Bet 第三輪加注”; 2026-11-09 | utarte |
| stack | stack | 籌碼量 (tekst 87) | 後手 10, 籌碼深度 5, „stack” 1 w zdaniu | KP: „Stack 籌碼量”; PQ/effective-stack: „有效籌碼量”; 2026-11-09 | utarte |
| position | position | 位置 (92) | ∅ 3 | W: „玩家在該局的加注順序（位置）占了很重要的地位”; PQ/position; 2026-11-09 | utarte, spójne |
| kicker | kicker | 踢腳 (tekst 61) | kicker 10 (w nawiasie), 邊牌 1 (UI: „邊牌（踢腳）”) | PQR: „對子相同再比踢腳（kicker）”; W: „或稱為kicker、次大牌、踢腳牌”; 2026-11-09 | utarte |
| flush | flush | 同花 (84) | ∅ 36 | R: „同花（花）: 五張同一花色的牌”; 2026-11-09 | utarte, spójne |
| straight | straight | 順子 (132) | 順 1 (卡順 w m6-l2, OK); ∅ 26 | R: „順子 (蛇）: 五張順連的牌”; 2026-11-09 | utarte, spójne |
| full-house | full house | 葫蘆 (11) | ∅ 6 | W: „葫蘆（夫佬或滿堂紅，Full house）”; PQ/full-house; 2026-11-09 | utarte |
| set | set | tekst: 暗三條 30, 暗三 43 | **{{t:set\|三條}} 1 (exams/m10.yaml:43 — 三條 to three-of-a-kind ogólnie)**; ∅ 1; „set” 16 | PQ/set: „Set / 暗三條”; PQ/trips: „Trips / 明三條”; 2026-11-09 | 暗三條 utarte; exams/m10 → 暗三條 (ŚREDNIE); 暗三/暗三條 obie w użyciu (NISKIE) |
| showdown | showdown | 攤牌 (1; tekst 96) | 比牌 11, 亮牌 8 (w znaczeniu opisowym) | W: „須攤牌比大小（showdown）”; PQ/showdown: „攤牌”; 2026-11-09 | utarte |
| all-in | all-in | 全下 (1; tekst 258) | all-in 16 | W: „全下（all-in），投入了尚餘的全部籌碼。”; 2026-11-09 | utarte |
| limp | limp | 溜入 (1 znacznik UI; tekst 45) | 跛入 8 (modules.yaml, exams/m4.yaml); limp 32 po łacinie (m4-l4, rules); 平跟 20 (część = flat call) | PQ/limp: „平跟 / Limp in（平跟入池）”; PF: „Limp（跟大盲）”; dla 溜入 nie znalazłem przeczytanego źródła tajwańskiego | 溜入 [DO USTALENIA]; niespójność 溜入/跛入/limp (ŚREDNIE) — ujednolicić po ustaleniu (kandydaci: 溜入 jako większość albo 平跟 z PQ, ale PQ używa 平跟 też dla flat call) |
| bankroll | bankroll | 資金 (1; tekst 82) | bankroll 5–7 po łacinie | PQ/bankroll: „Bankroll（撲克資金）是指專門預留用來打撲克的資金。”; PQR: „資金管理”; 2026-11-09 | utarte |
| variance | variance | 變異數 (9) | 波動 7, 變異 3 (exams/m13, rules), ∅ 7; terms-def standard-deviation „變異的平方根” | PQ/variance: „變異數（Variance）是撲克中的一個概念”; PQR: „短期則波動很大” (opis potoczny); 2026-11-09 | termin 變異數 utarty; 變異 → 變異數 (ŚREDNIE); 波動 dopuszczalne w opisie |
| winrate | win rate | 贏率 (tekst 98: m12-l1, m12-l4, exams/m12, rules) | **勝率 1 (znacznik w m10-l1 — koliduje z equity)**; bb/100 15 | brak przeczytanego źródła TW potwierdzającego 贏率 = win rate (M9 używa „贏率” nawet dla equity: „對抗對手範圍的當前贏率”) | [DO USTALENIA]; w przekładzie spójne poza m10-l1 → 贏率 (ŚREDNIE, w poprawkach) |

Dodatkowe niespójności (poza listą 30, ale z tych samych skryptów):
- regular: 常客 6 (UI) vs 常規玩家 5 (terms-def recreational i lekcje) → jedna forma (proponuję 常客; PQ/tag: „最常推薦給新手和穩健常客的打法”).
- recreational: 娛樂玩家 19 vs 休閒玩家 2 (UI drill.playerType, exams/m10) → 娛樂玩家.
- maniac: 瘋子 14 vs 瘋狂玩家 4 (exams/m10) → 瘋子.
- nit: 岩石玩家 7 vs 岩石型玩家 2 + UI „岩石型玩家” vs 極緊玩家 1; PF: „Rock（石頭）”; PQ/nit zostawia „Nit” → wybrać jedną formę.
- oesd: 兩頭順子聽牌 10 vs 兩頭順聽牌 6 (PQ: „兩頭順聽”).
- session: 牌局 49 vs 場次 5.
- gutshot: terms-def 卡順, UI „gutshot” po łacinie; GT: „兩頭順聽牌是 8 個 outs，卡順是 4 個”; PQ/gutshot-straight-draw: „內聽順”. 卡順 utarte.
- cutoff: terms-def 關煞位 (PF: „Cut off（關煞位）”), PQ/cutoff: „截止位” — oba w użyciu, OK.
- risk-premium: 風險溢價 8; PQ/risk-premium nagłówek „風險溢酬” (w treści też „風險溢價”) — OK.
- m7-l2:51 {{t:three-of-a-kind|三}}: turn to karta 3♠, a nie układ; błąd znacznika w pl i en (ŚREDNIE).

Liczba niespójności (termin z ≥ 2 formami merytorycznymi w przekładzie, bez wariantów składniowych): fold, equity, button, set, limp, variance, winrate, regular, recreational, maniac, nit, oesd, session, c-bet (pisownia) = 14; błędne znaczniki (inne pojęcie): 4 (call 檢視, bet 定, three-of-a-kind 三, set 三條) + 1 kolizja (winrate 勝率). Znaczniki bez formy (łacina w tekście chińskim): łącznie ok. 900 wystąpień w treści (największe: bet 99, pot 81, call 61, bluff 60, range 54, fold 47) — decyzja systemowa K-05.
