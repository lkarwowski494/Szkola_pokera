---
id: m7.l3
module: m7
order: 3
title: "Dobierania i implied odds"
sub: "Ile musisz wygrać później"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "Na flopie miałeś ok. {{n:odds.flush.flop-river}} szans na {{t:flush}} do rivera. Turn nie pomógł. Ile masz teraz?"
    options:
      - { text: "Ok. {{n:odds.flush.turn-river}}", correct: true, why: "Tak: została jedna karta. {{n:outs.flush}} outów z {{n:cards.unseen.turn}} nieznanych kart to {{n:odds.flush.turn-river}}, mniej więcej połowa szansy z flopu." }
      - { text: "Nadal ok. {{n:odds.flush.flop-river}}, bo outów jest tyle samo", why: "Outów jest tyle samo, ale kart do odkrycia mniej. {{n:odds.flush.flop-river}} liczy dwie karty, a na turnie została jedna." }
      - { text: "Nie da się tego policzyć bez kalkulatora", why: "Da się: reguła 2 i 4 z M2. Jedna karta, więc outy × 2: ok. {{n:odds.flush.rule-turn}}. Dokładnie {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Ile masz outów do {{t:flush|koloru}} albo {{t:straight|strita}}? Wpisz liczbę."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Do {{t:flush|koloru}} {{n:outs.flush}} kierów, do {{t:straight|strita}} każda dama i każda siódemka, czyli {{n:outs.oesd}} kart. Dama kier i siódemka kier są już policzone w kolorze, więc odejmujesz {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} {{n:ex.bet.three-quarters}}. Co robisz?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Masz {{n:outs.combo}} outów, czyli ok. {{n:odds.combo.turn-river}} na riverze. Potrzebujesz {{n:eq.bet-three-quarters}}, więc {{t:call}} opłaca się nawet bez implied odds." }
      - { text: "{{t:fold|Pasuję}}, bo {{t:draw}} na turnie to za mało", why: "Zwykłe {{t:draw}} przy tej cenie rzeczywiście {{t:fold|pasuje}}, ale {{t:flush}} razem ze {{t:straight|stritem}} daje ok. {{n:odds.combo.turn-river}}, więcej niż potrzebne {{n:eq.bet-three-quarters}}." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.third.pot}}, rywal {{t:bet|stawia}} {{n:io.flush.bet}}. {{t:flush-draw|Dobierasz do koloru}}: {{n:outs.flush}} outów z {{n:cards.unseen.turn}} kart. Ile {{t:chips|żetonów}} musisz dodatkowo wygrać na riverze, gdy trafisz, żeby {{t:call}} wyszło na zero? Wpisz liczbę."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Potrzebujesz {{n:io.flush.eq}} equity, a masz ok. {{n:odds.flush.turn-river}}. Na {{n:cards.unseen.turn}} możliwych riverów trafiasz {{n:outs.flush}} razy, a chybiasz {{n:miss.flush.turn}} razy i za każdym razem tracisz {{n:io.flush.bet}}. Każde trafienie musi więc przynieść {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. W {{t:pot|puli}} jest {{n:io.flush.pot-after-bet}}, brakuje {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:io.oesd.pot}}, rywal {{t:bet|stawia}} {{n:io.oesd.bet}}. Masz {{t:oesd}}: {{n:outs.oesd}} outów, {{n:miss.oesd.turn}} kart nietrafiających. Ile musisz dodatkowo wygrać na riverze, gdy trafisz?"
    options:
      - { text: "Ok. {{n:io.oesd.extra}}", correct: true, why: "Każde trafienie musi przynieść {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. W {{t:pot|puli}} jest {{n:io.oesd.pot-after-bet}}, więc brakuje {{n:io.oesd.extra}}." }
      - { text: "Ok. {{n:io.oesd.need}}", why: "Tyle musisz wygrać łącznie na każdym trafieniu. Część z tego leży już w {{t:pot|puli}} ({{n:io.oesd.pot-after-bet}}), więc dodatkowo brakuje {{n:io.oesd.extra}}." }
      - { text: "Nic, cena wystarcza", why: "Potrzebujesz {{n:eq.bet-half}} equity, a masz ok. {{n:odds.oesd.turn-river}}. Sama {{t:pot}} nie wystarcza, brakuje {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.third.pot}}, rywal {{t:bet|stawia}} {{n:io.flush.bet}}. Za każdym z was zostało jeszcze {{n:spr.stack.high}}, a rywal chętnie płaci z {{t:pair|parą}} asów. Co robisz?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Sama cena nie wystarcza ({{n:io.flush.eq}} wobec ok. {{n:odds.flush.turn-river}}), ale po trafieniu wystarczy wygrać jeszcze {{n:io.flush.extra}}. {{t:draw|Dobierasz}} do najlepszego {{t:flush|koloru}} (as kier leży na {{t:board|stole}}, więc {{t:flush}} z królem jest najwyższy), za rywalem jest dużo {{t:chips|żetonów}}, a gracz z {{t:pair|parą}} asów często zapłaci taki bet na riverze." }
      - { text: "{{t:fold|Pasuję}}, bo {{n:odds.flush.turn-river}} to mniej niż {{n:io.flush.eq}}", why: "Pot odds mówią „{{t:fold}}”, ale pomijasz implied odds. Brakuje tylko {{n:io.flush.extra}}, a rywal ma za sobą {{n:spr.stack.high}} i rękę, która zapłaci." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "Rywal z {{t:pair|parą}} asów raczej {{t:call|sprawdzi}}, a ty masz wtedy tylko ok. {{n:odds.flush.turn-river}}. Lepiej tanio zobaczyć rivera i wygrać więcej, gdy trafisz." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} {{n:ex.bet.half}}. Masz gutshot. Po trafieniu musiałbyś wygrać jeszcze {{n:io.gut.extra}}, a za rywalem zostało tylko {{n:spr.stack.low}}. Co robisz?"
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Gutshot daje ok. {{n:odds.gutshot.turn-river}}, a potrzebujesz {{n:eq.bet-half}}. Implied odds nie pomogą: nawet gdy rywal wpłaci wszystkie {{n:spr.stack.low}}, nie pokryje brakujących {{n:io.gut.extra}}." }
      - { text: "{{t:call|Sprawdzam}}, bo implied odds", why: "Implied odds to {{t:chips}}, które rywal może ci jeszcze zapłacić. Ma ich tylko {{n:spr.stack.low}}, a potrzebujesz {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "{{t:bluff|Blef}} w all-in z {{n:outs.gutshot}} outami ryzykuje wszystko. Rywal, który {{t:bet|postawił}} pół {{t:pot|puli}} przy tak małym stacku, często już nie {{t:fold|spasuje}}." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, ostrożny rywal {{t:bet|stawia}} całą {{t:pot|pulę}}: {{n:ex.bet.pot}}. Co robisz?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}}, a masz ok. {{n:odds.flush.turn-river}}. Do tego twój {{t:flush}} jest niski: gdy wpadnie kier, rywal z damą albo waletem kier ma lepszy {{t:flush}} i wtedy przegrasz najwięcej (odwrotne implied odds)." }
      - { text: "{{t:call|Sprawdzam}}, bo implied odds", why: "Implied odds są tu słabe: trafiony {{t:flush}} może przegrać z wyższym, a trzeci kier na {{t:board|stole}} widzi każdy. Brakuje też bardzo dużo: cena to {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Przebijam}}", why: "Ostrożny rywal, który {{t:bet|stawia}} całą {{t:pot|pulę}} na {{t:board|stole}} z asem i królem, rzadko {{t:fold|spasuje}}. Ryzykujesz dużo z ręką, która nawet trafiając może przegrać." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Kiedy implied odds są największe?"
    options:
      - { text: "Gdy {{t:draw|dobierasz}} do najlepszej ręki, rywal ma silną rękę i dużo {{t:chips|żetonów}} za sobą", correct: true, why: "Tak: wtedy po trafieniu wygrywasz, a rywal ma czym i z czym ci zapłacić." }
      - { text: "Gdy rywal ma mało {{t:chips|żetonów}} (niski {{t:spr}})", why: "Odwrotnie: przy niskim {{t:spr}} rywal nie ma już czego dopłacić, więc implied odds są małe." }
      - { text: "Gdy {{t:draw|dobierasz}} do niskiego {{t:flush|koloru}}", why: "To odwrotne implied odds: czasem trafisz i nadal przegrasz, i to w dużej {{t:pot|puli}}." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "Na początku turnu w {{t:pot|puli}} jest {{n:ex.pot}}, a mniejszy z waszych stacków to {{n:spr.stack.high}}. Ile wynosi {{t:spr}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Za rywalem jest kilka {{t:pot|pul}}, więc implied odds mogą być duże." }
      - { text: "{{n:spr.low}}", why: "Tyle byłoby przy stacku {{n:spr.stack.low}}. Tu stack to {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "To {{t:pot}}. {{t:spr}} to stosunek: stack podzielony przez {{t:pot|pulę}}." }
---
Na turnie zostaje już tylko jedna karta. Szansa {{t:draw|dobierania}} spada mniej więcej o połowę, a cena za kolejną kartę zwykle rośnie. Dlatego na turnie liczysz dokładniej i zadajesz nowe pytanie: ile mogę wygrać później, gdy trafię?

## Jedna karta do końca

| {{t:draw|Dobieranie}} | Outy | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Kolor}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Strit}} otwarty | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Kolor}} + {{t:straight}} otwarty | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Z regułą 2 i 4 z M2 mnożysz outy przez 2. Gdy dwa {{t:draw|dobierania}} mają wspólne karty, liczysz je raz.

## Implied odds

Implied odds (szanse ukryte) to {{t:chips}}, które wygrasz na riverze, gdy trafisz. Przykład: w {{t:pot|puli}} jest {{n:ex.third.pot}}, rywal {{t:bet|stawia}} {{n:io.flush.bet}}, ty {{t:flush-draw|dobierasz do koloru}}. Potrzebujesz {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} equity, a masz ok. {{n:odds.flush.turn-river}}. Sama {{t:pot}} nie wystarcza.

Na {{n:cards.unseen.turn}} możliwych riverów trafiasz {{n:outs.flush}} razy, a chybiasz {{n:miss.flush.turn}} razy. Żeby wyjść na zero, każde trafienie musi przynieść tyle, ile kosztują chybienia:

```formula
potrzebna wygrana = dopłata × (karty nietrafiające ÷ outy)
```

Tu: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. W {{t:pot|puli}} jest {{n:io.flush.pot-after-bet}}, więc na riverze musisz dostać jeszcze średnio **{{n:io.flush.extra}}**.

## {{t:spr}}: ile {{t:chips|żetonów}} jest za rywalem

{{t:spr}} (stack do {{t:pot|puli}}) to {{t:effective-stack}}, czyli mniejszy z dwóch, podzielony przez {{t:pot|pulę}} na początku {{t:street|ulicy}}. {{t:spr}} można liczyć na każdej {{t:street|ulicy}}; tu liczysz go na turnie. Przy {{t:pot|puli}} {{n:ex.pot}} i stacku {{n:spr.stack.high}} {{t:spr}} wynosi {{n:spr.high}}, czyli za rywalem jest jeszcze kilka {{t:pot|pul}}, a przy stacku {{n:spr.stack.low}} tylko {{n:spr.low}}. Implied odds nie mogą być większe niż {{t:chips}}, które rywal ma jeszcze przed sobą. Przy niskim {{t:spr}} liczą się prawie wyłącznie pot odds. Więcej o {{t:spr}} w module „Plan rozdania” (M9), który planuje rozdanie według {{t:spr}} z flopu.

## Kiedy implied odds są prawdziwe

- {{t:draw|dobierasz}} do **najlepszej ręki** (najwyższy możliwy {{t:flush}}, zwykle z asem),
- rywal ma **silną rękę**, z którą zapłaci,
- za rywalem jest **dużo {{t:chips|żetonów}}** (wysoki {{t:spr}}),
- trafienie **nie rzuca się w oczy** (np. gutshot jest mniej widoczny niż trzeci kier na {{t:board|stole}}).

Odwrotne implied odds działają przeciw tobie: gdy {{t:draw|dobierasz}} do niskiego {{t:flush|koloru}} albo do {{t:straight|strita}}, a na {{t:board|stole}} może wpaść {{t:flush}}, czasem trafisz i nadal przegrasz, i to w dużej {{t:pot|puli}}.

:::note Skąd te zasady
Rachunek implied odds to dokładne obliczenie z {{t:expected-value|wartości oczekiwanej}}. Warunki, kiedy implied odds są prawdziwe, oraz odwrotne implied odds to heurystyki z literatury (SplitSuit, PokerCoaching, FlopTurnRiver).
:::
