---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Kiedy przebić c-bet i do ilu"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dwie pary}} na niskim, {{t:connected|połączonym}} flopie to ręka {{t:value|dla wartości}}. Na takich flopach {{t:big-blind}} ma więcej najsilniejszych układów niż Button. {{t:raise|Przebiciem}} budujesz {{t:pot|pulę}} i każesz płacić {{t:pair|parom}} i {{t:draw|drawom}}." }
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Też dobre: na bardzo {{t:connected|połączonym}} flopie część {{t:two-pair|dwóch par}} solver tylko {{t:call|sprawdza}}. Check-raise częściej buduje {{t:pot|pulę}} i chroni rękę." }
      - { text: "{{t:fold|Pasuję}}", why: "{{t:two-pair|Dwie pary}} to jedna z najsilniejszych rąk na tym flopie. {{t:fold|Pas}} to duży błąd." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W {{t:pot|puli}} jest {{n:ex.third.pot}}, Button {{t:bet|stawia}} c-bet {{n:ex.third.bet}}. Masz seta i chcesz zrobić check-raise. Do ilu {{t:raise|przebijasz}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Do {{n:xr.example}}", correct: true, why: "To {{n:xr.mult.example}} c-betu. Button musi dopłacić {{n:xr.example.extra}} i potrzebuje ok. {{n:eq.vs-xr.example}} equity: gorsze {{t:pair|pary}} i słabe {{t:draw|drawy}} (gutshot) nie mają ceny, a {{t:flush}} i {{t:oesd}} zapłacą już do dużej {{t:pot|puli}}." }
      - { text: "Do {{n:xr.too-small}}", sizeError: true, why: "Dobra akcja, ale za mały rozmiar: Button dopłaca tylko {{n:xr.too-small.extra}} i potrzebuje ok. {{n:eq.vs-xr.too-small}} equity. Każdy {{t:flush-draw}} albo {{t:straight|strita}} zapłaci prawie za darmo." }
      - { text: "{{t:call|Sprawdzam}}", why: "Na flopie z dwoma kierami i kartami do {{t:straight|strita}} tracisz wartość i ochronę: wiele kart na turnie zatrzyma akcję albo pobije twoją rękę. Set chce budować {{t:pot|pulę}} od razu." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W {{t:pot|puli}} jest {{n:ex.third.pot}}, Button {{t:bet|stawia}} c-bet {{n:ex.third.bet}}. Robisz check-raise na {{n:xr.mult.example}} c-betu. Do ilu {{t:raise|przebijasz}}? Wpisz liczbę {{t:chips|żetonów}}."
    table: { position: BB }
    answer: xr.example
    explanation: "C-bet to {{n:ex.third.bet}}, więc {{n:xr.mult.example}} c-betu to {{n:xr.example}}. Rozmiar check-raise'u liczysz od c-betu, nie od {{t:pot|puli}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W {{t:pot|puli}} było {{n:ex.third.pot}}, Button {{t:bet|postawił}} {{n:ex.third.bet}}, a ty {{t:raise|przebiłeś}} do {{n:xr.example}}. Ile procent equity potrzebuje Button, żeby {{t:call|sprawdzić}}? Wpisz liczbę."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Button dopłaca {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. W {{t:pot|puli}} jest wtedy {{n:xr.example.pot-after}}, a po jego {{t:call|sprawdzeniu}} o {{n:xr.example.extra}} więcej. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W {{t:pot|puli}} było {{n:ex.third.pot}}, Button {{t:bet|postawił}} {{n:ex.third.bet}}, a ty {{t:raise|przebiłeś}} tylko do {{n:xr.too-small}}. Ile equity potrzebuje Button, żeby {{t:call|sprawdzić}}?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:eq.vs-xr.too-small}}", correct: true, why: "Dopłaca {{n:xr.too-small.extra}} do {{t:pot|puli}} {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. Tak tanio zapłaci prawie każdą ręką, dlatego {{t:raise}} ma być kilka razy większe niż c-bet." }
      - { text: "Ok. {{n:eq.vs-xr.example}}", why: "Tyle potrzebowałby przy {{t:raise|przebiciu}} do {{n:xr.example}}. Przy {{n:xr.too-small}} dopłaca tylko {{n:xr.too-small.extra}}." }
      - { text: "Ok. {{n:eq.bet-third}}", why: "Tyle potrzebowałeś ty, żeby {{t:call|sprawdzić}} c-bet. Po check-raise'ie liczysz cenę Buttona: dopłaca {{n:xr.too-small.extra}} do {{t:pot|puli}} {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:draw|Draw}} do najlepszego {{t:flush|koloru}} to dobry {{t:semi-bluff}}: wygrywasz, gdy Button {{t:fold|spasuje}}, a gdy zapłaci, nadal masz {{n:outs.flush}} outów (ok. {{n:odds.flush.flop-turn}} na turnie)." }
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Też dobre: {{t:flush}} trafisz na turnie w ok. {{n:odds.flush.flop-turn}}, prawie tyle, ile wynosi cena {{n:eq.bet-third}}, a po trafieniu najlepszego {{t:flush|koloru}} wygrasz więcej (implied odds). Mocne {{t:draw|drawy}} grasz w obu wariantach, żeby twój check-raise nie oznaczał samych silnych rąk." }
      - { text: "{{t:fold|Pasuję}}", why: "Duży błąd: z {{n:outs.flush}} outami trafisz najlepszy {{t:flush}} na turnie w ok. {{n:odds.flush.flop-turn}}, prawie tyle, ile wynosi cena {{n:eq.bet-third}}, a po trafieniu wygrasz więcej (implied odds). Do tego możesz zrobić check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:oesd|OESD}} ({{n:outs.oesd}} outów) wobec małego c-betu, który daje tanią okazję do {{t:raise|przebicia}}. {{t:raise|Przebiciem}} możesz wygrać od razu, a gdy dostaniesz {{t:call}}, nadal możesz trafić." }
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Też dobre: {{t:straight|strita}} trafisz na turnie w ok. {{n:odds.oesd.flop-turn}}, trochę mniej niż cena {{n:eq.bet-third}}, ale po trafieniu wygrasz więcej (implied odds), a gdy na turnie nikt nie {{t:bet|postawi}}, zobaczysz też rivera za darmo. Część mocnych {{t:draw|drawów}} {{t:call|sprawdzasz}}, żeby twoje {{t:call|sprawdzenia}} nie były same słabe." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno: z {{n:outs.oesd}} outami trafisz {{t:straight|strita}} na turnie w ok. {{n:odds.oesd.flop-turn}}, niewiele mniej niż cena {{n:eq.bet-third}}; resztę dają implied odds i szansa na darmowego rivera. Do tego możesz zrobić check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "{{t:top-pair|Najwyższa para}} ze słabym kickerem to ręka do {{t:call|sprawdzania}}. Wygrywa z {{t:bluff|blefami}} Buttona, a {{t:call|sprawdzeniem}} trzymasz je w grze." }
      - { text: "Check-raise", why: "Zwykle {{t:call|sprawdzasz}}. Po {{t:raise|przebiciu}} płacą ci głównie lepsze ręce i {{t:draw|drawy}}; check-raise taką ręką to rzadkie zagranie solvera wobec małych c-betów." }
      - { text: "{{t:fold|Pasuję}}", why: "{{t:top-pair|Najwyższa para}} wobec małego c-betu to zdecydowanie za dużo, żeby {{t:fold|pasować}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Nie masz {{t:pair|pary}} ani {{t:flush-draw|drawa do koloru}}; masz tylko słaby dodatkowy {{t:straight-draw}} (potrzebujesz dwóch konkretnych kart), a żadna twoja karta nie jest wyższa od stołu. Na flopach z asem {{t:fold|pasujesz}} takich rąk więcej." }
      - { text: "Check-raise jako {{t:bluff}}", why: "{{t:bluff|Blefy}} w check-raise'ach robisz głównie {{t:draw|drawami}} ({{t:flush}}, {{t:oesd}}), które wygrywają też po trafieniu. Ta ręka ma tylko słaby dodatkowy {{t:draw}}, a Button ma tu dużo asów i królów, które nie {{t:fold|spasują}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "Cena jest dobra, ale ta ręka prawie nic nie trafi: nawet {{t:pair}} szóstek albo piątek przegrywa z większością rąk, którymi Button zapłaci dalej." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Wobec którego c-betu Buttona robisz check-raise częściej?"
    table: { position: BB }
    options:
      - { text: "1/4 {{t:pot|puli}}", correct: true, why: "Mały c-bet daje tanią okazję do {{t:raise|przebicia}}, a Button {{t:bet|stawia}} go szerokim {{t:range|zakresem}} z wieloma słabymi rękami. Wobec dużego c-betu {{t:raise|przebijasz}} rzadziej i węziej: głównie sety i {{t:two-pair}}, mniej {{t:bluff|blefów}}." }
      - { text: "Cała {{t:pot}}", why: "Wobec dużego c-betu {{t:raise}} kosztuje dużo, a {{t:range}} Buttona jest silniejszy. Częściej {{t:call|sprawdzasz}} albo {{t:fold|pasujesz}}." }
      - { text: "Tak samo często", why: "Wobec małych c-betów {{t:raise|przebijasz}} częściej i szerzej; wobec dużych rzadziej, głównie najsilniejszymi rękami." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Grasz z Buttonem, który na flopie prawie nigdy nie {{t:fold|pasuje}}. {{t:bet|Stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Gutshot z wysoką kartą to dobre {{t:call}} przy cenie {{n:eq.bet-third}}. Check-raise {{t:bluff|blefem}} zarabia na {{t:fold|pasach}}, a ten rywal prawie nie {{t:fold|pasuje}}, więc {{t:raise}} traci swoją główną zaletę." }
      - { text: "Check-raise", why: "{{t:bluff|Blefy}} w check-raise'ach robisz głównie mocnymi {{t:draw|drawami}}, a gutshot do nich nie należy. Do tego {{t:bluff}} zarabia na {{t:fold|pasach}}, a ten rywal prawie nie {{t:fold|pasuje}}: wobec niego {{t:raise|przebijasz}} głównie {{t:value|dla wartości}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno: {{t:draw}} z wysoką kartą przy tak dobrej cenie się broni, niezależnie od tego, z kim grasz." }
---
Check-raise to {{t:check}}, a potem {{t:raise}} {{t:bet|zakładu}} rywala. Z {{t:big-blind|dużego blinda}} to ważna broń wobec c-betów (najczęściej i tak wybierasz między {{t:call|sprawdzeniem}} a {{t:fold|pasem}}): bez niej Button mógłby c-betować tanio prawie każdą ręką.

## Po co {{t:raise|przebijać}}

Check-raise robisz z dwóch powodów:

- **{{t:value|dla wartości}}**: masz bardzo silną rękę ({{t:two-pair}}, set) i chcesz zbudować {{t:pot|pulę}},
- **jako {{t:semi-bluff}}**: masz {{t:draw}} ({{t:flush}}, {{t:oesd}}), który wygrywa na dwa sposoby: gdy Button {{t:fold|spasuje}} albo gdy trafisz.

Średnie ręce, np. {{t:top-pair|najwyższą parę}} ze słabym kickerem, zwykle {{t:call|sprawdzasz}}: po {{t:raise|przebiciu}} gorsze ręce Buttona częściej {{t:fold|spasują}}, a zapłacą lepsze. To uproszczenie: wobec małych c-betów solver {{t:raise|przebija}} też część {{t:top-pair|najwyższych par}} i słabych {{t:pair|par}} dla ochrony. Z kolei {{t:two-pair}} na bardzo {{t:connected|połączonym}} flopie solver często tylko {{t:call|sprawdza}}.

## Kiedy częściej

- **Wobec małego c-betu.** {{t:raise|Przebicie}} jest tanie, a Button {{t:bet|stawia}} mały c-bet szerokim {{t:range|zakresem}}. Wobec dużego c-betu {{t:raise|przebijasz}} rzadziej i węziej: głównie sety i {{t:two-pair}}, mniej {{t:bluff|blefów}}.
- **Na niskich, {{t:connected|połączonych}} flopach** (np. [[7h 6d 5s]]). {{t:big-blind|Duży blind}} broni wielu niskich rąk, więc zwykle ma tu więcej {{t:two-pair|dwóch par}} i {{t:straight|stritów}} niż Button, czyli {{t:nuts-advantage|przewagę nutsów}}.
- **Rzadziej na wysokich flopach dobrych dla Buttona**, np. K-J-T albo A-A-K: tam to on ma więcej najsilniejszych rąk.

## Jaki rozmiar

Rozmiar check-raise'u liczysz od c-betu. Przykład: w {{t:pot|puli}} jest {{n:ex.third.pot}}, c-bet {{n:ex.third.bet}}. Check-raise na {{n:xr.mult.example}} c-betu to {{t:raise}} do {{n:xr.example}}: Button dopłaca {{n:xr.example.extra}} i potrzebuje ok. **{{n:eq.vs-xr.example}}** equity. {{t:raise|Przebicie}} tylko do {{n:xr.too-small}} daje mu cenę ok. **{{n:eq.vs-xr.too-small}}**: zapłaci prawie każdą ręką z jakimkolwiek {{t:draw|drawem}}. Dlatego {{t:raise|przebijasz}} ok. {{n:xr.mult.low}}–{{n:xr.mult.example}} c-betu, tym więcej, im mniejszy c-bet, a nie minimalnie.

:::note Rywal, który nie {{t:fold|pasuje}}
{{t:bluff|Blef}} w check-raise'ie zarabia na {{t:fold|pasach}} (przypomnij sobie alphę z pierwszej lekcji). Wobec gracza, który na flopie prawie nigdy nie {{t:fold|pasuje}}, {{t:raise|przebijasz}} głównie {{t:value|dla wartości}}, a {{t:bluff|blefy}} zostawiasz dla najmocniejszych {{t:draw|drawów}}.
:::
