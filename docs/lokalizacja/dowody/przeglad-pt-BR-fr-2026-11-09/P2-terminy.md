# P2-terminy: terminologia pt-BR i nazwy K-05 (przegląd P2, 2026-11-09)

Zakres: (1) ok. 30 kluczowych terminów sprawdzonych na przeczytanych źródłach pt-BR; (2) nazwa K-05 dla każdego z 151 wierszy `k05-kand-pt-BR.tsv` (plik `pr/terms-nazwy-pt-BR.yaml`); (3) konflikty rodzaju i liczby przy znacznikach `{{t:klucz}}` bez formy (1 711 wystąpień w `tl/content/pt-BR` i `tl/ui/pt-BR.json`, skrypt `pr/P2-tmp/ctx.mjs`).

Wszystkie cytaty niżej sprawdzone dosłownie na surowym tekście (curl → tekst → `grep -F`), data odczytu 2026-11-09. Kopie: `pr/P2-tmp/web/`.

## Źródła

- [A] https://pt.wikipedia.org/wiki/Texas_hold_%27em (pt.wikipedia, artykuł o Texas hold 'em)
- [B] https://pt.wikipedia.org/wiki/P%C3%B4quer (pt.wikipedia, „Pôquer”, tabela rankingu mãos i sekcja „Blefe”)
- [C] https://br.pokernews.com/regras-poker/texas-holdem.htm (PokerNews Brasil, zasady Texas Hold'em)
- [D] https://br.pokernews.com/termos-poker/ + hasła `…/termos-poker/<hasło>.htm` (glosariusz PokerNews Brasil: aposta, bet, call, check, fold, raise, pot, pot-odds, blocker, bluff, downswing, variance, rake, flush, flush-draw, full-house, two-pair, top-pair, value, buy-in, equity, big-blind, small-blind, calling-station, street, position)
- [E] https://br.pokernews.com/estrategia-poker/dicas-texas-holdem-posicoes-no-poker-54824.htm (PokerNews Brasil, pozycje)
- [F] PokerNews Brasil, artykuły strategii: https://br.pokernews.com/estrategia-poker/donk-all-in-river-overpair-analise-solver-67006.htm, https://br.pokernews.com/estrategia-poker/overpair-forte-foldaria-mao-67777.htm, https://br.pokernews.com/estrategia-poker/matematica-poker-contas-basicas-58436.htm
- [G] https://br.pokernews.com/estrategia-poker/5-principais-dicas-do-888poker-para-subir-nos-limites-57147.htm
- [H] https://br.pokernews.com/estrategia-poker/cash-game-call-ou-all-in-com-um-grande-draw-vs-aposta-e-rais-34631.htm (uwaga: styl pt-PT, „Estamos a segurar”; tylko pomocniczo)

Nie dało się otworzyć / nie nadają się: pt.wikipedia „Glossário de pôquer”, „Mãos de pôquer”, „Blefe”, „Rake (pôquer)”, „Bankroll” (404; „Glossário do pôquer” to czerwony link); br.pokernews.com/poker-termos/, /glossario-poker/, /regras-do-poker/texas-holdem.htm (404); pokerstars.com/br/… i /pt-BR/… (przekierowanie na FanDuel, brak treści PokerStars); gtowizard.com/pt/glossary/, /pt-BR/glossary/ (404); maisesports.com.br, maisev.com, sigma.world/pt-br (403); superpoker.com.br/glossario (404). Wyszukiwania (WebSearch) „projeto de flush” i „nit” nie dały żadnej czytelnej strony pt-BR — nie użyte jako źródło.

## Tabela: terminy kluczowe

| klucz | en | forma w przekładzie (liczba) | inne formy | źródło (adres, cytat, data) | ocena |
|---|---|---|---|---|---|
| pot | pot | pote (742+27) | — | [A] „o objetivo do Texas hold 'em é ganhar o pote”; [C] „o jogador restante vence o pote sem precisar mostrar suas cartas” (2026-11-09) | potwierdzone: **pote** (m) |
| big-blind | big blind | big blind (115+4) | BB×6 | [A] „Hold 'em é normalmente jogado usando small blinds e big blinds.”; [C] „conhecidas como 'small blind' e 'big blind'” (2026-11-09) | potwierdzone: **big blind** (m) |
| small-blind | small blind | small blind (82) | SB×5 | jak wyżej [A][C]; [D] small-blind: „Aposta compulsória feita por aquele que está imediatamente a esquerda…” (2026-11-09) | potwierdzone: **small blind** (m) |
| call | call | pagar/paga/pagou… (~600) | call×54, pagamento×40 | [A] „"call" (cobrir a aposta), "raise" (aumentar a aposta), "fold"(abandonar) ou "check" (passar a vez)”; [D] call: „Quando um jogador dá "call", ele opta por igualar a aposta atual em vez de aumentar ou desistir.”; [D] check: „você terá que pagar (call), aumentar (raise) ou desistir (fold)” (2026-11-09) | potwierdzone oba: czasownik **pagar** (forma tłumacza) i rzeczownik **call** (m). Nazwa K-05: **call** — 82 miejsca bez formy to rzeczownik („o call”, „um call”, „do call”); „pagar” nie pasuje do „o/um”. [WIELE FORM] |
| fold | fold | desistir/desiste… (~460) | folda×55, desistências×30 | [C] „desistir (fold)”; [D] fold: „Desistir da mão.” (2026-11-09) | potwierdzone; nazwa K-05 **fold** (m): miejsca bez formy to „all-in ou fold”, „o fold do adversário”; „desistência” (ż) kłóci się z „o”. [WIELE FORM] |
| check | check | dá check / check (~170) | passar×25, passa×24, Passo×18 | [A] „"check" (passar a vez)”; [C] „os jogadores agora podem dar 'check'” (2026-11-09) | potwierdzone: **check** (m), konstrukcja „dar check” |
| bet | bet | aposta/apostas (~330) | apostar×26 | [D] aposta: „Aposta é um termo de poker que se refere ao ato de colocar dinheiro ou fichas no pote”; [C] „apostar (bet)” (2026-11-09) | potwierdzone: **aposta** (ż); miejsca bez formy mają „uma/essa/primeira” — zgodne |
| raise | raise | aumento/aumenta/aumentar (~300) | raise×3 | [A] „"raise" (aumentar a aposta)”; [D] raise: „Aumentar uma aposta anterior.” (2026-11-09) | potwierdzone: **aumento** (m) (2 miejsca bez formy: „um raise all-in”, „de um raise” — rodzaj zgodny) [WIELE FORM] |
| bluff | bluff | blefe/blefes (~370) | blefa, blefar | [B] „Blefe (português brasileiro) ou Bluff (português europeu)” (2026-11-09) | potwierdzone: **blefe** (m) |
| range | range | range (91+5) | — | [F] 67006: „quais mãos estão realmente no range deles” (2026-11-09) | potwierdzone: **range** (m) |
| straight | straight | sequência (155) | — | [B] „São 5 cartas seguidas sem importar o naipe. Em caso de empate, ganha quem tiver a maior sequência.”; [C] „Sequência – quaisquer cinco cartas seguidas” (2026-11-09) | potwierdzone: **sequência** (ż) |
| flush | flush | flush (29) | — | [B] „Caso dois jogadores possuam um flush…”; [D] flush: „Cinco cartas do mesmo naipe.” (2026-11-09) | potwierdzone: **flush** (m) |
| full-house | full house | full house (7) | — | [B] „Full House ou Full Hand … Uma trinca (trio) e um par.”; [D] full-house: „Uma trica acompanhada de um par” (2026-11-09) | potwierdzone: **full house** (m) |
| two-pair | two pair | dois pares (44) | — | [B] „Dois Pares”; [C] „um jogador com A♣7♠ teria dois pares”; [D] two-pair: „Dois diferentes pares em uma mão.” (2026-11-09) | potwierdzone: **dois pares** (m lm); miejsca bez formy („dois pares altos”, „os mesmos dois pares”) zgodne |
| top-pair | top pair | par mais alto (37) | top pair/Top pair×17 | [D] top-pair (hasło „Top Pair”): „…uma carta de mesmo valor da maior carta da mesa.” (2026-11-09) | potwierdzone **top pair** (m). „par mais alto” nie znalezione w źródłach i koliduje z „o par mais alto” = wyższa para (definicja two-pair, lekcje) → nazwa **top pair**; zalecana unifikacja form tłumacza. [WIELE FORM] |
| draw | draw | projeto/projetos (142) | draws×29, draw×5 | [F] 67777: „grandes flush draws com muita equidade”; [F] 58436: „se você tiver uma queda para flush no flop”; [D] pot-odds: „pedidas para flush ou sequência”; [H] „Call ou All-in com um Grande Draw” (2026-11-09) | **draw** (m) potwierdzone; „projeto” [DO USTALENIA] (brak w przeczytanych źródłach; wyszukiwanie bez wyniku). Nazwa K-05: **draw**. [WIELE FORM] |
| flush-draw | flush draw | projeto de flush (33) | flush draw×8, draw de flush×9 | [D] flush-draw: „Quando um jogador tem quatro cartas de um mesmo naipe e espera a quinta para formar um flush.” (hasło „Flush Draw”) (2026-11-09) | potwierdzone **flush draw** (m); „projeto de flush” [DO USTALENIA]. [WIELE FORM] |
| out-of-position | out of position | fora de posição (40) | — | [E] „Embora jogar fora de posição possa ocasionalmente oferecer vantagens, como o check-raise, as vantagens de jogar em posição são muito maiores.” (2026-11-09) | potwierdzone: **fora de posição** |
| in-position | in position | em posição (27) | — | [E] jak wyżej („jogar em posição”) | potwierdzone: **em posição** |
| street | street | streets (30) | rua/ruas×18, rodada(s)×12 | [D] street: „A quarta carta é conhecida como quarta street” (sens Stud); [H] „nas streets seguintes” (pt-PT) (2026-11-09) | **street** (ż: „cada/toda/uma street” w miejscach bez formy) — źródło BR tylko w sensie Stud, częściowo [DO USTALENIA]; „rua” nieużywane w źródłach. [WIELE FORM] |
| board | board | mesa (64) | board×26 | [C] „se a mesa mostra 7♣2♦Q♠8♥A♠”; [F] 58436: „em um board Q♦J♥9♦5♣3♠” (2026-11-09) | oba potwierdzone; nazwa K-05 **board** (m): 14 miejsc bez formy ma „o/ao/no/num/neste board” — „mesa” (ż) dałaby „ao mesa”, „num mesa”. [WIELE FORM] |
| equity | equity | equity (9) | — | [D] equity (hasło „Equity”): „sua equidade é de $40” (2026-11-09) | potwierdzone (hasło „equity”, w tekście „equidade”); **equity** (ż: „a equity”) |
| variance | variance | variância (20) | — | [D] variance: „quanto maior sua variância maior os efeitos no seu bankroll” (2026-11-09) | potwierdzone: **variância** (ż) |
| downswing | downswing | downswing(s) (8) | — | [D] downswing: „Uma série de resultados negativos que fazem um jogador perder dinheiro…” (2026-11-09) | potwierdzone: **downswing** (m) |
| rake | rake | rake (2) | — | [D] rake: „Aquelas fichas tiradas do pote pela administração da sala de poker…” (2026-11-09) | potwierdzone: **rake** (m) |
| nit | nit | nit (7) | — | brak przeczytanego źródła pt-BR (glosariusz [D] ma tylko „Nits and Lice”, „Rock”) | **nit** (m) [DO USTALENIA] |
| stakes | stakes | limite/limites (62) | microlimites×1 | [G] „Antes de subir de limite, você deve avaliar o limite em que está jogando atualmente.” (2026-11-09) | potwierdzone: **limite** (m); w [G] także „micro-stakes”, „low stakes” |
| buy-in | buy-in | buy-ins (81) | — | [D] buy-in: „Taxa de inscrição para qualquer torneio ou mesa particular.” (2026-11-09) | potwierdzone: **buy-in** (m) |
| blocker | blocker | bloqueador(es) (19) | blocker(s)×3 | [D] blocker: „o Jogador A tem dois “blockers”” (2026-11-09) | potwierdzone **blocker**; „bloqueador” [DO USTALENIA]. Nazwa K-05 **blocker** (0 miejsc bez formy, dotyczy słowniczka). [WIELE FORM] |
| value | value | por valor/valor (~80) | streets de valor×22 | [D] value: „O mesmo que 'apostar por valor'.” (2026-11-09) | potwierdzone: **valor** (m) |
| pair | pair | par/pares (297) | — | [B] „Par … São 2 cartas iguais, mais 3 cartas diferentes.” (2026-11-09) | potwierdzone: **par** (m) |
| four-of-a-kind / three-of-a-kind / high-card | — | quadra (6) / trinca (21) / carta alta (1) | — | [B] „Quadra ou Poker”, „Trinca ou Trio”, „Carta Alta” (2026-11-09) | potwierdzone (ż) |
| pocket-pair | pocket pair | par na mão / par de mão (3) | — | [A] „são chamadas par de mão” (2026-11-09) | potwierdzone: **par de mão** |
| overpair | overpair | overpairs (1) | — | [F] 67006: „Você folda o seu overpair?” (2026-11-09) | potwierdzone: **overpair** (m) |
| range-advantage | range advantage | vantagem de range (25) | — | [D] bluff.htm: „…quando você tem posição ou vantagem de range.” (2026-11-09) | potwierdzone |
| calling-station / recreational | — | — / jogador recreativo (21) | — | [D] calling-station: „Um jogador passivo e solto que não aumenta muito, porém paga mais do que deveria.”; [G] „uma mistura de jogadores recreativos e profissionais” (2026-11-09) | potwierdzone |

Potwierdzone na przeczytanym źródle: 58 z 151 nazw (w pliku YAML ze znacznikiem „źr.”); 93 z [DO USTALENIA] (nazwa robocza = forma tłumacza albo nazwa en; m.in. nit, kicker, projeto, bloqueador, cartas fechadas, posição inicial, textura/seco/molhado, bolha, premiação).

## Najważniejsze rozstrzygnięcia nazw

1. Akcje: **call, fold, check** jako rzeczowniki angielskie (m) — tak je podaje [A][C][D] („dar call/check/fold”), a 154 miejsca bez formy to składnia rzeczownikowa („o call”, „all-in ou fold”, „dá check”). **bet → aposta**, **raise → aumento** (rzeczowniki pt, zgodne z formami tłumacza i [A][D]).
2. **board** (nie „mesa”) — powód: rodzaj w 14 miejscach bez formy; „mesa” zostaje poprawną formą tam, gdzie tłumacz ją wpisał.
3. **top pair** (nie „par mais alto”) — źródło [D] i uniknięcie kolizji z „par mais alto” = wyższa para.
4. **draw / flush draw / straight draw** (nie „projeto…”) — „projeto” nieznalezione w przeczytanych źródłach; 142 formy „projeto” w treści to rozbieżność do decyzji 06/09 (ujednolicić na „draw” albo znaleźć źródło dla „projeto”).
5. **stakes → limite**, **variance → variância**, **bluff → blefe**, **straight → sequência**.

## Konflikty rodzaju i liczby (znaczniki bez formy, proponowane nazwy)

Kontrola automatyczna (rodzajnik/zaimek bezpośrednio przed znacznikiem vs rodzaj nazwy, 66 terminów z miejscami bez formy, 1 711 wystąpień): **0 rzeczywistych konfliktów** przy nazwach z YAML. Jedyne trafienie, `mesmo {{t:in-position}}` (lessons/m4-l3-wobec-3betu.md), to przysłówek „mesmo” = „nawet” — fałszywy alarm.

Konflikty, które powstałyby przy innych nazwach (powód wyboru):
- board = „mesa”: „ao/neste/num/no {{t:board}}” (14×, m.in. lessons z modułu 7–8, rules.yaml) → niegramatyczne; stąd „board”.
- call = „pagar”: „o/um/do/seu {{t:call}}” (≈60×) → „um pagar”; stąd „call”.
- fold = „desistência”: „o {{t:fold}} do adversário” (5×) → rodzaj; stąd „fold”.

Konflikty dziś (render nazwy en, przed K-05) — znikają po K-05 z nazwami z YAML:
- ui `drill.categoryAcc.fourOfAKind` „uma {{t:four-of-a-kind}}” → dziś „uma four of a kind”; po K-05 „uma quadra”. Tak samo `straight` („uma straight” → „uma sequência”), `threeOfAKind` („uma three of a kind” → „uma trinca”); w treści „a {{t:straight}} está aberta” (lessons/m2-l1-outy.md), „a {{t:straight}}” (exams/m9.yaml).
- „{{t:two-pair}} altos” (lekcje m9) → dziś „two pair altos”; po K-05 „dois pares altos”.
- „a {{t:range-advantage}}”, „a {{t:nuts-advantage}}” (ż) → dziś „a range advantage”; po K-05 „a vantagem de range/nuts”.
- „uma {{t:session}}”, „a {{t:initiative}}” → po K-05 „uma sessão”, „a iniciativa”.

Niespójność (nie rodzaj): po K-05 w tych samych tekstach obok siebie wystąpią formy tłumacza „projeto”, „par mais alto”, „mesa”, „pagar/desistir” i nazwy „draw”, „top pair”, „board”, „call/fold”. Dla call/fold/check/board to naturalny żargon (źródła [C][D] używają obu); dla draw i top-pair zalecam ujednolicenie form w treści (ŚREDNIE, poza zakresem tej poprawki).
