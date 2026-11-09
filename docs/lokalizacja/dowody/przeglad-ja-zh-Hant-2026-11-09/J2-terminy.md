# J2: terminologia pokerowa w przekładzie ja (30 terminów)

Metoda: skrypt (`node`) przeszedł wszystkie pliki `tl/content/ja/**` i `tl/ui/ja.json` i policzył formy w znacznikach `{{t:klucz|forma}}`; „bez formy” = `{{t:klucz}}`, które poza pl renderuje się nazwą angielską alfabetem łacińskim (K-05). Dla terminów, których źródło pl nie oznacza znacznikiem (anglicyzmy: equity, outy, c-bet, 3-bet, stack…), podano liczbę wystąpień formy w zwykłym tekście (poza znacznikami; liczby przybliżone, bo np. „ベット” zawiera się w „Cベット”). Źródła otwarte narzędziem WebFetch 2026-11-09 (strona pobrana; cytat wyodrębniony z pobranego tekstu przez narzędzie, przy nałożeniu warto rzucić okiem na stronę):

- [A] https://ja.wikipedia.org/wiki/テキサス・ホールデム
- [B] https://ja.wikipedia.org/wiki/ポーカー・ハンドの一覧
- [C] https://ja.wikipedia.org/wiki/ポーカー
- [D] https://light-three.com/pokerterms/ (japoński słownik terminów pokerowych)
- [E] https://light-three.com/poker-advanced-terms-quiz/ (ten sam serwis, terminy średnio zaawansowane)
- [F] https://japan.gtowizard.com/blog/what-is-equity-in-poker/ (japońska wersja serwisu szkoleniowego GTO Wizard)

Nie dało się otworzyć: gameshub.com/jp (403), jp.pokernews.com (przekierowanie na wersję angielską), ja.wikipedia „ポーカー用語” (404, artykuł nie istnieje). Strony JOPT/Japan Poker Association nie zostały przeczytane.

| klucz | en | forma w przekładzie (liczba wystąpień) | inne formy | źródło (adres, cytat, data odczytu) | ocena |
|---|---|---|---|---|---|
| fold | fold | フォールド (666 w znacznikach + 99 w tekście) | bez formy 68; フォールドする 1 | [A] „プレイヤーはチェック、コール、レイズ、フォールドを選択する” (2026-11-09) | utarta; 68 × bez formy → „fold” po łacinie (K-05) |
| call | call | コール (759 + 90) | bez formy 107; コールする 2, コールする側 1, コーラー 1 | [A] jw.; [C] „前のプレイヤーと同額のチップを賭けることを**コール**と呼び” (2026-11-09) | utarta; warianty gramatyczne OK; 107 × bez formy (K-05) |
| raise | raise | レイズ (297 + 140) | bez formy 21 | [C] „賭ける金額を吊り上げることを**レイズ**と呼ぶ。” (2026-11-09) | utarta |
| bet | bet | ベット (314 + tekst) | bez formy 109; **置いて 1** (m10-l3: znacznik przy „ustawiają granicę”, błąd przeniesiony ze źródła pl) | [C] „ポーカーではゲーム中、何度かベット（賭け）をするための期間がある。” (2026-11-09) | utarta; 置いて = zły znacznik (WYSOKIE, poprawka w J2-poprawki.json) |
| check | check | チェック (272 + 80) | bez formy 15 | [C] „**チェック**とはその回のベットをパスすることである。” (2026-11-09) | utarta |
| pot | pot | ポット (785 + 100) | bez formy 109 | [C] „このチップを置く場所を**ポット**と呼ぶ。” (2026-11-09) | utarta; 109 × bez formy (K-05) |
| small-blind / big-blind (blinds) | small blind / big blind | スモールブラインド (90), ビッグブラインド (132); „ブラインド” w tekście 124 | bez formy: SB 40, BB **144**; skróty SB 5, BB 6 | [A] „スモールブラインドとビッグブラインドと呼ばれる2つの強制ベットを用いる” (2026-11-09) | utarta; big-blind bez formy 144 × — najczęstszy łaciński wtręt (K-05) |
| button | button | BTN (3 w znacznikach); ボタン ok. 390 i BTN ok. 110 w tekście | ディーラーボタン 1 | [C] „このプレートのことを「ディーラー・ボタン」と称する”; [D] „ボタン（Button / BTN）: ディーラーボタンが置かれているポジション” (2026-11-09) | utarta (ボタン/BTN obok siebie normalne) |
| range | range | レンジ (192 + 25) | bez formy 54 | [D] „レンジ: ある状況で、相手が持っている可能性のあるハンドの範囲全体のことです。”; [C] „ハンドレンジ(参加する手札の幅)” (2026-11-09) | utarta |
| equity | equity | エクイティ (2 w znacznikach + ok. 275 w tekście) | bez formy 17; „勝率” ok. 6 w znaczeniu equity (m3-l2, m7-l3, m7-l4) | [F] „エクイティとは、全員がチェックで回してショーダウンまで進んだ場合に、そのハンドが勝つ、またはチョップする頻度を示す数値です。” (2026-11-09) | utarta; „勝率” jako zamiennik nieprecyzyjny (pomija remis), NISKIE/ŚREDNIE do ujednolicenia |
| pot-odds | pot odds | ポットオッズ (0 w znacznikach; 8 w tekście) | — | [A] „ポジション、ポットオッズ、ブラフの可能性などが判断材料となる”; [D] „ポットオッズ（Pot Odds）: 自分がコールするために必要な額と…ポットの額の比率” (2026-11-09) | utarta |
| outs | out | アウツ (1 + ok. 105 w tekście) | — | [A] „アウツとは、次に引くことで自分のハンドを勝利に近づけるカードである。” (2026-11-09) | utarta, spójna |
| draw | draw | ドロー (180 + 27) | bez formy 24 | [D] „ドロー: 今後のカード次第で役になる状態のこと” (2026-11-09) | utarta |
| bluff | bluff | ブラフ (407 + 60) | bez formy 72 | [C] „ブラフ（ハッタリ。ベットすることによって弱い手を強く見せて相手をフォールドさせようとすること）” (2026-11-09) | utarta |
| value-bet | value bet | バリューベット (1 + 6 w tekście) | — | [D] „バリューベット（Value Bet）: 相手にコールしてもらうことで利益を最大化するために行うベットのことです。” (2026-11-09) | utarta |
| c-bet | c-bet | Cベット (2 + ok. 245 w tekście) | terms-def: 継続ベット（コンティニュエーションベット） | [D] „Cベット: プリフロップでレイズして主導権を握ったプレイヤーが、フロップが開かれた後もその勢いを継続” (2026-11-09) | utarta; definicja ze spolszczeniem pełnej nazwy OK |
| 3-bet | 3-bet | 3ベット (ok. 260 w tekście; brak znaczników) | „Fold to 3-bet” (nazwa statystyki HUD, po angielsku) | [D] „3ベット（3-bet）: プリフロップにおけるリレイズ（再レイズ）のことです。” (2026-11-09) | utarta |
| stack | stack | スタック (ok. 375 w tekście; brak znaczników) | — | [D] „スタック: プレイヤーがテーブル上に持っているチップの総量のことです。” (2026-11-09) | utarta |
| position | position | ポジション (85 + 15) | bez formy 8; **インポジション 2** (m10-l3; to klucz in-position) | [C] / [A] „戦略上、プレイヤーの位置、すなわちポジションは重要である。” (2026-11-09) | utarta; 2 × zły klucz (ŚREDNIE, poprawka) |
| kicker | kicker | キッカー (ok. 63 w tekście; brak znaczników) | — | [A] „役を構成しない補助的なカードであるキッカー” (2026-11-09) | utarta |
| flush | flush | フラッシュ (76 + 31) | bez formy 44 | [B] nagłówek sekcji „フラッシュ” (2026-11-09) | utarta |
| straight | straight | ストレート (120 + 13) | bez formy 40 | [B] nagłówek sekcji „ストレート” (2026-11-09) | utarta |
| full-house | full house | フルハウス (10 + 3) | bez formy 7 | [B] nagłówek sekcji „フルハウス” (2026-11-09) | utarta |
| set | set | セット (1 + ok. 59 w tekście) | bez formy 1 (exams/m10.yaml) | [B] „トリップス(trips)・セット(set)とも呼ばれる”; [D] „セット（Set）: 手札のポケットペアと、ボード上の1枚のカードで完成したスリーカードのことです。” (2026-11-09) | utarta |
| showdown | showdown | ショーダウン (1 + 93) | — | [C] „全員のベット額が同じになり次第ショーダウン（カードを明かす）” (2026-11-09) | utarta |
| all-in | all-in | オールイン (1 + ok. 257) | — | [A] „手持ちのチップ全額を賭けることをオールインという。” (2026-11-09) | utarta |
| limp | limp | リンプ (1 + 43) | bez formy 1 (m3-l1) | [D] „リンプ: レイズせずにビッグブラインドと同額をコールしてゲームに参加すること” (2026-11-09) | utarta |
| bankroll | bankroll | バンクロール (1 + 73) | — | [D] „バンクロール（Bankroll）: ポーカーのために用意している活動資金全体のことを指します。” (2026-11-09) | utarta |
| variance | variance | 分散 (11 + 3) | bez formy 14; **バリアンス** 1 znacznik + tytuł m12-l1 | [E] „分散: 短期的な結果の上下幅。” (2026-11-09); „バリアンス” w czytanych źródłach: [DO USTALENIA] | niespójne: ujednolicić na 分散 (ŚREDNIE, poprawki dla m12-l1) |
| winrate | win rate | ウィンレート (ok. 74 w tekście) | bez formy 1 (m10-l1 → „winrate” po łacinie) | [E] „ウィンレート: 一定量プレイしたときの平均的な勝ち幅。キャッシュゲームではbb/100で表すことが多い。” (2026-11-09) | utarta |

## Dodatkowe niespójności zauważone przy liczeniu
- connected: コネクト (5), コネクトした (5), **コネクテッド (4)**; disconnected: ディスコネクト (1), **ディスコネクテッド (1)**. Interfejs (etykiety odpowiedzi) używa コネクト/ディスコネクト — ujednolicić lekcje do tej formy (ŚREDNIE).
- paired: ペアボード (7), ペアの (6), ペア (2) — dopuszczalne warianty gramatyczne.
- oesd: OESD (11), オープンエンド・ストレートドロー (5) — skrót i pełna nazwa, OK.
- Układy: three-of-a-kind = スリーカード, four-of-a-kind = フォーカード, pair = ペア/ワンペア (nazwa układu) — zgodne z [B] („日本では**スリーカード**”, „日本では**フォーカード**”, nagłówek „ワンペア”).

## Wnioski
1. Formy japońskie są utarte i spójne dla 28 z 30 terminów; jedyna realna niespójność form: variance (分散/バリアンス) i connected (コネクト/コネクテッド).
2. Główny problem jest systemowy (K-05): ok. **900 (896) znaczników bez formy** wśród tych 30 kluczy (m.in. big-blind 144, call 107, bet 109, pot 109, bluff 72, fold 68, range 54, flush 44) wyświetli angielską nazwę alfabetem łacińskim w środku japońskiego zdania. Rekomendacja dla 09: dla ja dopisać formę automatycznie z mapy klucz → forma kanoniczna z tej tabeli (w ui/ja.json poprawki są już w J2-poprawki.json).
3. Dwa złe znaczniki: `{{t:bet|置いて}}` (błąd także w pl/en) i `{{t:position|インポジション}}` × 2.
