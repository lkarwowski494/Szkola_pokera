# K2-terminy: terminologia ko i nazwy K-05 (przegląd K2, 2026-11-09)

Zakres: (1) ok. 45 kluczowych terminów sprawdzonych na przeczytanych źródłach koreańskich; (2) nazwa K-05 dla każdego ze 162 wierszy `k05-kand-ko.tsv` (plik `pr/K2/terms-nazwy-ko.yaml`); (3) konflikty partykuł przy 1068 znacznikach `{{t:klucz}}` bez formy w `tl/content/ko` i `tl/…/ko.json` (skrypty `pr/K2/ctx.py`, `pr/K2/part.py`, `pr/K2/gen.py`; lista `pr/K2/konflikty.tsv`).

Wszystkie cytaty niżej sprawdzone dosłownie na surowym tekście (curl → HTML → tekst `h2t.py` → `grep -F`; lista 98 cytatów: `pr/K2/cytaty.tsv`, 98/98 trafień), data odczytu 2026-11-09. Kopie stron: `pr/K2/web/` (scratchpad sesji).

## Źródła

- [A] https://ko.wikipedia.org/wiki/텍사스_홀덤 (ko.wikipedia, „텍사스 홀덤”: przebieg, rundy, układy, pozycja)
- [B] https://ko.wikipedia.org/wiki/포커, https://ko.wikipedia.org/wiki/블러프, https://ko.wikipedia.org/wiki/내시_균형
- [C] https://thepoker.co.kr/guide/glossary.php (더포커, „홀덤 용어 총정리 — 포커 용어 사전”, 108 haseł; serwis edukacyjny bez gry na pieniądze: „돈 거는 곳이 아니라, 공부하는 곳”) i https://thepoker.co.kr/guide/hands.php („족보”)
- [D] https://pokerqz.com/ko/tools/glossary/<hasło> (POKER Q'z, „용어집”, 202 hasła; przeczytane strony haseł: flop, pre-flop, continuation-bet, polarize, blocker, bankroll, variance, equity, hand-range, outs, pot-odds, three-of-a-kind, trips, two-pair, one-pair, nit, maniac, linear, effective-stack, risk-premium, bubble-factor, short-stack, wheel, kicker, dry-board, rainbow-board, monotone-board, two-tone-board, connected-board, pair-board, overbet, donk-bet, isolate, limp, bubble, cover, fold-equity, nash-equilibrium, chip-ev, rake-cap, rake, 3bet, mdf, spr, icm, last-aggressor, double-barrel i in. — `pr/K2/web/qz/`) oraz https://pokerqz.com/ko/blog/cbet
- [E] https://m.cafe.daum.net/TexasHoldemPoker/4k6E/1 … /25 (kawiarnia Daum „♠ 텍사스 홀덤 포커 ♠”, dział „홀덤 기초”, 2012; zwłaszcza 4k6E/14 „홀덤의 용어”, 4k6E/4 „족보”) — źródło starsze, potwierdza żargon podstawowy
- [F] artykuły 더포커: https://thepoker.co.kr/bbs/board.php?bo_table=pokeredu&wr_id=93 (배리언스, 다운스윙), …&wr_id=127 (레인지/넛 어드밴티지, 텍스처), …&wr_id=141 (배리언스, 표준편차, 뱅크롤), …&wr_id=221 (변동성), …&wr_id=256 (윈레이트), …?bo_table=free&wr_id=523 (MDF); https://www.rangecraftpoker.com/ko/help-center/poker-tools-reading-basic-betting-patterns

Nie dało się otworzyć / nie nadają się: wikidocs.net/274444, 274447, 274448 i pokergosu.com (Cloudflare „Just a moment…”, 403); namu.wiki i thewiki.kr (403); ko.wikipedia „포커 용어”, „포커 핸드”, „포커 족보”, „세븐 포커” (404); kr.pokernews.com (treść angielska); ggpoker.com/ko, natural8 ko, 888poker ko (404); coinpoker.com/kr (403). Serwis afiliacyjny „홀덤마스터” (xn--qn1b64jo7hvupb4f.com: kasyno, bakarat, „파워볼”) pobrany, ale nie liczony jako źródło.

## Tabela: terminy kluczowe

| klucz | en | forma w przekładzie (liczba) | inne formy | źródło (adres, cytat, data 2026-11-09) | ocena |
|---|---|---|---|---|---|
| pot | pot | 팟 (823) | — | [A] „패에 걸린 모든 칩을 얻게 되며, 이를 팟(pot)이라고 한다.” | potwierdzone: **팟** |
| small-blind / big-blind | blinds | 스몰 블라인드 (108) / 빅 블라인드 (195) | SB×5, BB×6 | [A] „스몰 블라인드와 빅 블라인드 베팅” | potwierdzone |
| check / call / raise / fold | — | 체크 (~270), 콜 (~770), 레이즈 (~300), 폴드 (~660) | — | [A] „플레이어는 체크, 콜, 레이즈, 폴드의 베팅 옵션을 갖는다.”; [C] check „앞에서 아무도 걸지 않았을 때 칩을 내지 않고 차례를 넘기는 것.”; call „앞사람이 건 만큼 똑같이 내는 것.”; raise „앞사람이 건 것보다 더 많이 거는 것.”; fold „카드를 버리고 그 판에서 빠지는 것.” | potwierdzone; znaczniki bez formy z „-하다” („{{t:fold}}할까요”) gramatyczne |
| bet | bet | 베팅 (~330) | 벳 (~50) | [C] „벳 Bet” „그 라운드에서 처음으로 칩을 거는 것.”; [E] „BETTING(베팅)” | obie formy w źródłach; nazwa K-05 **베팅** (forma większościowa) [WIELE FORM] |
| all-in | all-in | 올인 | — | [A] „(이를 올인 베팅이라고 한다)” | potwierdzone |
| bluff / semi-bluff | — | 블러프 (~420) / 세미 블러프 (22) | 블러핑 w źródłach | [E] „약한 패를 가지고 레이즈 혹은 베팅하는 것을 블러프, 블러핑(Bluffing)이라고 합니다.”; [C] semi-bluff „지금은 약하지만 더 좋아질 수 있는 드로우로 하는 블러프.” | potwierdzone |
| range | range | 레인지 (214) | — | [C] „레인지 Range” „상대가 그 상황에서 가지고 있을 만한 패 전체의 묶음.” | potwierdzone |
| street | street | 스트리트 (79) | — | [A] „("턴" 또는 "포스 스트리트")”; [C] „프리플랍, 플랍, 턴, 리버 각각의 베팅 단계.” | potwierdzone |
| flop / preflop | — | 플롭 (425) / 프리플롭 (22) | 플랍 (289), 프리플랍 (55) | [A] „이 단계는 세 장의 카드("플롭")”, „핸드는 "프리플롭" 베팅 라운드로 시작되며” (플롭 11×, 플랍 1×: „베팅 라운드는 플랍이 열리기 전과”); [E] „Flop (플롭)”; [C] „프리플랍”, „플랍”; [D] continuation-bet „프리플롭에서 레이즈한 플레이어가 플롭 이후의 라운드에서도” | obie pisownie w źródłach (żargon społeczności: 플랍; encyklopedia i pisownia normatywna 외래어 표기법: 플롭). Nazwa K-05 **플롭/프리플롭** (UI, większość lekcji). Przekład miesza: terms-def (33×+16×) i rules.yaml (79×+25×) „플랍/프리플랍” → terms-def poprawione (ŚR), rules/lekcje do sesji K1/K3 [WIELE FORM] |
| turn / river / showdown | — | 턴, 리버, 쇼다운 | — | [C] „턴 Turn”, „리버 River”, „쇼다운 Showdown” (cytaty w `cytaty.tsv`); [A] „쇼다운” | potwierdzone |
| straight / flush | — | 스트레이트 (146) / 플러시 (103) | — | [C] hands „스트레이트 Straight”; [A] „플러시 같은 무늬의 카드 5장, 순서대로 아님” | potwierdzone |
| pair / two-pair / three-of-a-kind | — | 페어 (~285) / 투 페어 (32) / 트리플 (19) | 투페어×16, 원페어×2, 쓰리 오브 어 카인드×4 | [A] „(예: 투 페어 또는 트리플 )를 포함한다면, 키커 가 동점을 가르기 위해”; [C] hands „투 페어 Two Pair”, „트리플 Three of a Kind”; [D] three-of-a-kind „쓰리 오브 어 카인드(트립스)는 같은 랭크의 카드 3장으로 이루어진 포커 핸드를 의미합니다.” | potwierdzone; UI „투페어” → „투 페어” (2 poprawki ŚR) [WIELE FORM] |
| four-of-a-kind / full-house / high-card | — | 포카드 (8) / 풀하우스 (15) / 하이카드 (3) | — | [C] hands „포카드 Four of a Kind”, „풀하우스 Full House”, „하이 카드 High Card” | potwierdzone (하이카드: źródło ze spacją — kosmetyka, bez poprawki) |
| set / trips | — | 셋 / 트립스 | — | [C] hands „둘 다 트리플이지만 만든 방법이 다릅니다.”; [C] set „포켓 페어에 보드 한 장이 붙어 만든 트리플.” | potwierdzone |
| kicker | kicker | 키커 | — | [A] „키커 가 동점을 가르기 위해” | potwierdzone ([C] pisze „킥커”) |
| top-pair / overpair | — | 탑 페어 (62) / 오버페어 (9) | 톱 페어×1 | [E] „Top Pair(탑 페어)를 잡은 것입니다.”; [C] „보드에서 가장 높은 카드와 내 카드로 만든 페어.”; [E] „그 페어를 오버페어라고 부릅니다.” | potwierdzone |
| board / community-cards | — | 보드 (98) / 커뮤니티 카드 (10) | — | [C] board „가운데 펼쳐 모두가 함께 쓰는 공용 카드. 커뮤니티 카드라고도 합니다.”; [A] „모든 플레이어가 이용할 수 있는 커뮤니티 카드를 사용한다.” | potwierdzone |
| position / in-position / out-of-position | — | 포지션 (92) / 인 포지션 (38) / 아웃 오브 포지션 (51) | 포지션 없이×4 | [A] „앉는 위치( 포지션 )가 텍사스 홀덤 전략의 중요한 요소”; [C] IP „상대보다 늦게 행동하는 유리한 처지.”; OOP „상대보다 먼저 행동해야 하는 불리한 처지.” | potwierdzone |
| outs | outs | 아웃 (UI, lekcje) | 아웃츠×1 (terms-def) | [C] „내 패를 완성해 주는 남은 카드의 수.”; [E] „이길수 있도록 자신의 패를 향상시킬 수 있는 카드들을 아웃이라고 합니다.” | potwierdzone **아웃**; terms-def „아웃츠” → „아웃” (ŚR) |
| draw / flush-draw / oesd / gutshot | — | 드로우 (193) / 플러시 드로우 (46) / OESD×10, 오픈엔디드…×6, 양방향…×3 / 거트샷 (29) | 드로×2, 플러시 드로×6 | [E] „드로우란 좋은 카드가 나와 핸드가 좋아지기를 바라는 것을 말합니다.”; [C] „같은 무늬가 네 장이라 한 장만 더 오면 플러시가 되는 상태.”; [C] „양방향 스트레이트 드로우 Open-ended straight draw”; [C] gutshot „가운데 한 숫자가 와야만 스트레이트가 되는 상태. 아웃 4장.” | potwierdzone; OESD: nazwa K-05 **양방향 스트레이트 드로우** (UI, [C]); „드로”, „플러시 드로” w lekcjach do ujednolicenia [WIELE FORM] |
| pot-odds / equity | — | 팟 오즈 (8) / 에퀴티 (310) | 에쿼티 w [D] | [C] pot odds „콜할 칩과 그 콜로 얻을 수 있는 팟의 비율.”; [C] equity „끝까지 갔을 때 내가 팟에서 가져갈 평균 몫.”; [D] „포커에서 에퀴티(Equity)는 자신의 핸드가 팟을 이길 확률(승률)을 수치로 나타낸 것입니다.” | potwierdzone |
| expected-value | expected value | 기댓값 (8) | 기대값×4 | [C] „기댓값 EV” | **기댓값** (normatywne); „기대값” w m6-l2, m7-l4, rules → do sesji lekcji (NISKIE) |
| 3-bet / c-bet | — | 3벳 (206) / 씨벳 (42), C벳 (39), c벳 (33) | 컨티뉴에이션 (2) | [C] „3벳 3-bet”; [C] c-bet „프리플랍에서 마지막으로 레이즈한 사람이 플랍에서 이어서 하는 벳. 컨티뉴에이션 벳.”; [D] blog „포커 C벳(C-Bet)이란?” | **C벳** (źródła, terms-def); UI „씨벳” → „C벳” (2 ŚR); lekcja m6-l3 (24× 씨벳), rules (28× „c벳” małą literą) — do sesji lekcji/reguł [WIELE FORM] |
| blocker | blocker | 블로커 (18) | — | [C] „내가 들고 있어서 상대가 특정 패를 가질 가능성을 줄여 주는 카드.”; [D] „블로커(blocker)는 상대가 특정 핸드를 가지고 있을 가능성을 줄여주는 카드입니다.” | potwierdzone |
| polarized | polarized | 폴라라이즈드 (21) | 양극화된×1 | [D] „이러한 레인지로 베팅하는 것을 "폴라라이즈드 베팅"이라고 하며” | potwierdzone |
| value-bet | value bet | 밸류 벳 | — | [C] „나보다 약한 패가 콜해 주기를 바라며 하는 벳.” | potwierdzone |
| dry / wet / paired / two-tone / monotone / connected | — | 드라이 (53), 웻 (23), 페어드 (17), 투톤 (7), 모노톤 (18), 커넥티드 (15) | 웨트×5 | [C] „드라이 보드 Dry board”, „웻 보드 Wet board”, „페어드 보드 Paired board”; [D] „투톤 보드(two-tone board)는…”, „모노톤 보드란 플롭의 세 장 카드가 모두 같은 슈트로 구성된 상황을 의미합니다.”, „커넥티드 보드(connect board)는…” | potwierdzone; „웨트” (m5-l3) do ujednolicenia |
| texture | texture | 텍스처 (8) | — | [F:127] „보드 텍스처” | potwierdzone |
| range-advantage / nuts-advantage / nuts | — | 레인지 우위 (31) / 너츠 우위 (19) / 너츠 (22) | 넛 우위×1, 넛 어드밴티지×1 | [F:127] „레인지 어드밴티지”, „넛 어드밴티지”; [E] „Nut, Nuts (넛)”; [C] „넛 Nuts” | „너츠” nieznalezione w źródłach (są „넛”, „넛츠”). Nazwy K-05: **넛**, **넛 우위** [INNA NIŻ TŁUMACZ], **레인지 우위** [DO USTALENIA] — decyzja 06/09: zostawić „우위” czy przejść na „어드밴티지” jak źródła |
| effective-stack / spr / mdf | — | 유효 스택 (5) / SPR / MDF | 이펙티브 스택×4 | [C] „맞붙은 두 사람 가운데 적은 쪽의 스택.”, SPR „유효 스택을 팟으로 나눈 값. 낮을수록 올인까지 가기 쉽습니다.”; [D] „MDF (Minimum Defense Frequency)는…” | potwierdzone; „이펙티브 스택” ([D]) w m9-l1 [WIELE FORM] |
| variance / standard-deviation | — | 분산 (14) / 표준편차 (42) | 변동성×6 | [D] variance „분산(베리언스)은 포커에서 결과가 기대값(EV, 장기적인 평균 수익)으로부터 얼마나 벗어나는지를”; [C] „베리언스 Variance”; [F:221] „포커는 변동성이 큰 게임입니다.”; [F:141] „세번째는 표준편차 (bb/100)입니다.” | potwierdzone **분산** ([D]); „변동성” (m12-l3, modules, rules) też w źródłach — jako opis, nie nazwa [WIELE FORM] |
| downswing / winrate / bankroll / tilt | — | 다운스윙 (20) / 윈레이트 (1) / 뱅크롤 (78) / 틸트 (62) | — | [F:93] „배리언스는 홀덤의 자연스러운 부분이며, 다운스윙 기간 동안 좌절하거나 의기소침할 수 있습니다.”; [F:256] „윈레이트를 향상시키십시오.”; [D] „뱅크롤(bankroll)이란 포커를 플레이하기 위해 따로 마련해 둔 자금을 의미합니다.”; [C] tilt „감정이 흔들려 평소보다 나쁜 판단을 하게 되는 상태.” | potwierdzone (moduł 12) |
| limp | limp | 림프 | — | [E] „빅블라인드 액수를 콜하면서 게임을 계속하는 것을 림프인이라고 합니다.” | potwierdzone |
| nit / maniac / calling-station | — | 니트 (9) / 매니악 (18) / 콜링 스테이션 | 닛×8 | [D] nit „포커에서 "nit"는 매우 타이트한 플레이 스타일을 가진 플레이어를 의미합니다.” (nazwa hasła „니트”); [E] „Maniac (매니악)”, „Calling Station (콜링 스테이션)” | potwierdzone **니트**; „닛” (m10-l1, rules, exams/m10) do ujednolicenia [WIELE FORM] |
| exploit | exploit | 익스플로잇 (9) | — | [C] „상대의 치우친 버릇을 노려 균형에서 일부러 벗어나는 전략.” | potwierdzone |
| icm / bubble / bubble-factor / risk-premium | — | ICM / 버블 (11) / — (UI „Bubble factor”) / 리스크 프리미엄 (6) | — | [C] „ICM Independent chip model”, bubble „입상권 바로 앞, 한두 명만 더 떨어지면 입상이 정해지는 시점.”; [D] „버블 팩터(bubble factor)는 포커 토너먼트에서”; „리스크 프리미엄은 토너먼트에서 칩 가치 기준으로 요구되는 equity와” | potwierdzone |
| short-stack / push-fold | — | 숏 스택 (13) / 푸시 (22) | 숏스택×2 | [C] „숏 스택 Short stack”, push/fold „칩이 적을 때 올인 아니면 폴드, 두 가지만 고르는 방식.” | potwierdzone |
| nash-equilibrium | Nash equilibrium | (brak form) | — | [B] tytuł hasła „내시 균형 - 위키백과”; [D] „내쉬 균형” | **내시 균형** (pisownia normatywna, [B]) |

Potwierdzone na przeczytanym źródle koreańskim: 131 ze 162 nazw (w YAML „źr.” z literą); 7 skrótów lub złożeń bez potrzeby źródła (HUD, VPIP, PFR, WTSD, TAG, LAG; bb-ante = dwa człony potwierdzone osobno); 24 [DO USTALENIA] (nazwa robocza = forma tłumacza): equity-realization, mixed-hand, isolation, disconnected, semi-connected, wetness, second-pair ([E] „세컨 페어”), range-advantage, nuts-advantage, condensed, bluff-catcher, second-barrel, probe-bet, alpha, risk-of-ruin, mental-game, m-ratio, red-zone, green-zone, tournament-equity, pay-jump, overcall, stack-off, regular. [INNA NIŻ TŁUMACZ]: nuts („넛”, tłumacz „너츠”), nuts-advantage („넛 우위”), rake-cap („레이크 캡” [D], tłumacz „레이크 상한”).

## Najważniejsze rozstrzygnięcia nazw

1. **플롭 / 프리플롭** (nie „플랍”): ko.wikipedia [A] i pisownia normatywna; ta forma jest w UI i w większości lekcji (425 wobec 289). Żargon serwisów [C][D] to „플랍” — obie są zrozumiałe, ale aplikacja ma mieć jedną. Poprawione w terms-def (33 linie); rules.yaml (79× 플랍, 25× 프리플랍) i 10 lekcji/egzaminów z „플랍” — do sesji K1/K3.
2. **C벳** (nie „씨벳”/„c벳”): [C] i tytuł [D]; terms-def już tak pisze; UI poprawione (2).
3. **아웃** (nie „아웃츠”): [C][D][E]; terms-def poprawione.
4. **투 페어** (ze spacją): [A][C]; UI poprawione (2); m0-l1 i rules mają „투페어” (do sesji lekcji, NISKIE/ŚR).
5. **니트**, **레크리에이션 플레이어**, **유효 스택**, **웻**, **기댓값** — formy większościowe i potwierdzone; warianty „닛”, „레크리에이셔널”, „이펙티브 스택”, „웨트”, „기대값” w pojedynczych lekcjach do ujednolicenia przez przegląd lekcji.
6. **넛** zamiast „너츠” (22+19 form w lekcjach): „너츠” nie występuje w żadnym przeczytanym źródle; 0 znaczników bez formy dla nuts, 2 dla nuts-advantage (bez konfliktu). Decyzja o przepisaniu lekcji: 06/09.

## Konflikty partykuł (znaczniki bez formy, proponowane nazwy)

Kontrola automatyczna (`part.py`, `gen.py`): dla każdego z 1068 znaczników bez formy (74 klucze) sprawdzam partykułę zaraz po znaczniku (은/는, 이/가, 을/를, 과/와, 으로/로, 이나/나, 이란/란, 이라) wobec zakończenia nazwy: samogłoska, spółgłoska, ㄹ (skróty czytane po koreańsku: SPR/PFR → „알” ㄹ, ICM → „엠” spółgłoska, MDF/VPIP/UTG/HUD → samogłoska). Złącza z „-하다” („{{t:fold}}할까요”), kopuła „입니다/이며/일 때” i partykuły niezależne (에, 의, 도, 만, 보다, 에서) nie zależą od zakończenia.

**5 konfliktów** przy nazwach z YAML:
- `content/ko/lessons/m3-l2-rece-startowe.md`: „{{t:initiative}}를 쥐고” — nazwa „주도권” (spółgłoska) wymaga „을”; tłumacz pisał pod „이니셔티브”. Jedyny konflikt wywołany wyborem nazwy (주도권 potwierdzone w [D][E], 이니셔티브 nie) → poprawka do sesji lekcji: „를” → „을”.
- `content/ko/lessons/m9-l1-spr.md`: „{{t:spr}}으로 판단합” — SPR (에스피알, ㄹ) → „로”; błąd niezależny od K-05 (nazwa = forma tłumacza).
- `content/ko/lessons/m10-l2-typy-graczy.md`: „{{t:pfr}}는”, „{{t:pfr}}와” — PFR (피에프알, ㄹ) → „은”, „과”; niezależne od K-05.
- `content/ko/exams/m10.yaml`: „{{t:nit}}은 강한 핸” — „니트” → „는”; przy nazwie „닛” konfliktów byłoby 6 (pozostałe „니트가/는”), stąd „니트”.

Konflikty, które powstałyby przy innych nazwach (powód wyboru): nit = „닛” → 6; initiative = „이니셔티브” → 0, ale bez źródła; oesd = „OESD” (오이에스디, samogłoska) → 0 — wybór tu nie zależy od partykuł. Pozostałe nazwy = forma tłumacza, więc konfliktów nie zmieniają.

W UI (`ko.json`) znaczniki z formą: 1 konflikt „{{t:pfr|PFR}}를” (drill.playerType.readEnough) → poprawka NISKIE. Parametry UI przyjmujące nazwę układu („{{winner}}가”, „{{hand}}를”, „“{{hand}}”가”) dają błąd przy „트리플” — 3 poprawki ŚR w K2.md.
