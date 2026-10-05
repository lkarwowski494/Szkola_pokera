---
id: m6.l1
module: m6
order: 1
title: "MDF i alpha"
sub: "Ile bronić, gdy rywal stawia"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.third.pot}}, rywal {{t:bet|stawia}} {{n:ex.third.bet}}. Jaką co najmniej część {{t:range|zakresu}} musisz bronić ({{t:call|sprawdzić}} albo {{t:raise|przebić}}), żeby jego {{t:bluff}} bez szans nie zarabiał automatycznie? Wpisz liczbę w procentach."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + bet) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Rywal ryzykuje {{n:ex.third.bet}}, żeby wygrać {{n:ex.third.pot}}, więc jego {{t:bluff}} zarabia, gdy {{t:fold|pasujesz}} częściej niż {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} całą {{t:pot|pulę}}: {{n:ex.bet.pot}}. Ile wynosi {{t:mdf}}? Wpisz liczbę w procentach."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Przy becie wielkości {{t:pot|puli}} {{t:bluff}} ryzykuje tyle, ile może wygrać, więc wystarczy, że {{t:fold|pasujesz}} w co drugim przypadku, żeby wyszedł na zero."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} pół {{t:pot|puli}}: {{n:ex.bet.half}}. Ile wynosi {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. Tyle {{t:range|zakresu}} bronisz, żeby {{t:bluff}} bez szans nie zarabiał." }
      - { text: "{{n:alpha.bet-half}}", why: "To alpha: jak często {{t:bluff}} rywala musi zadziałać. {{t:mdf}} to reszta do całości, czyli {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "To equity potrzebne do {{t:call|sprawdzenia}} jedną ręką (z M2). {{t:mdf}} mówi, jaką część całego {{t:range|zakresu}} bronisz." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} więcej niż {{t:pot|pulę}}: {{n:ex.bet.overbet}}. Ile wynosi {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Im większy bet, tym mniejszą część {{t:range|zakresu}} musisz bronić." }
      - { text: "{{n:alpha.bet-overbet}}", why: "To alpha: tak często musi zadziałać {{t:bluff}} za {{n:ex.bet.overbet}}. Ty bronisz resztę, czyli {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "To equity potrzebne do {{t:call|sprawdzenia}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Inna liczba, inne pytanie." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Blefujesz}} ręką bez szans: w {{t:pot|puli}} jest {{n:ex.pot}}, {{t:bet|stawiasz}} {{n:ex.bet.half}}. Jak często rywal musi {{t:fold|pasować}}, żeby {{t:bluff}} wyszedł na zero? Wpisz liczbę w procentach."
    answer: alpha.bet-half
    explanation: "Alpha = bet ÷ ({{t:pot}} + bet) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Ryzykujesz {{n:ex.bet.half}}, żeby wygrać {{n:ex.pot}}: gdy rywal {{t:fold|pasuje}} częściej, {{t:bluff}} zarabia."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Blefujesz}}: w {{t:pot|puli}} jest {{n:ex.pot}}, {{t:bet|stawiasz}} {{n:ex.bet.three-quarters}}. Jak często rywal musi {{t:fold|pasować}}, żeby {{t:bluff}} się opłacał?"
    options:
      - { text: "Częściej niż {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Tyle wynosi alpha dla betu 3/4 {{t:pot|puli}}." }
      - { text: "Częściej niż {{n:mdf.bet-three-quarters}}", why: "To {{t:mdf}}, czyli ile rywal powinien bronić. Alpha to część, którą może {{t:fold|spasować}}, zanim twój {{t:bluff}} zacznie zarabiać: {{n:alpha.bet-three-quarters}}." }
      - { text: "Częściej niż {{n:eq.bet-three-quarters}}", why: "To equity, którego rywal potrzebuje do {{t:call|sprawdzenia}}. Próg dla {{t:bluff|blefu}} liczysz bez jego {{t:call|sprawdzenia}} w mianowniku: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Który {{t:bluff}} bez szans potrzebuje rzadszych {{t:fold|pasów}} rywala: za {{n:ex.bet.quarter}} czy za {{n:ex.bet.pot}}?"
    options:
      - { text: "Za {{n:ex.bet.quarter}}: wystarczy ponad {{n:alpha.bet-quarter}} {{t:fold|pasów}}", correct: true, why: "Mały {{t:bluff}} ryzykuje mało: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. {{t:bluff|Blef}} za całą {{t:pot|pulę}} potrzebuje ponad {{n:alpha.bet-pot}} {{t:fold|pasów}}." }
      - { text: "Za {{n:ex.bet.pot}}: wystarczy ponad {{n:alpha.bet-quarter}} {{t:fold|pasów}}", why: "Odwrotnie. Większy bet ryzykuje więcej, więc rywal musi {{t:fold|pasować}} częściej: przy całej {{t:pot|puli}} ponad {{n:alpha.bet-pot}}." }
      - { text: "Oba potrzebują tyle samo", why: "Alpha zależy od rozmiaru: {{n:alpha.bet-quarter}} przy {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} przy {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, rywal {{t:bet|stawia}} 1/3 {{t:pot|puli}}. {{t:mdf}} wynosi {{n:mdf.bet-third}}, a do {{t:call|sprawdzenia}} potrzebujesz {{n:eq.bet-third}} equity. Jak pogodzić te dwie liczby?"
    options:
      - { text: "{{t:mdf}} dotyczy całego {{t:range|zakresu}}, equity jednej ręki", correct: true, why: "{{t:mdf}} mówi, jaką część wszystkich swoich rąk bronisz, żeby rywal nie mógł {{t:bluff|blefować}} dowolnymi kartami. Potrzebne equity mówi, czy {{t:call}} konkretną ręką się opłaca wobec tego, czym rywal naprawdę {{t:bet|stawia}}." }
      - { text: "Jedna z nich jest źle policzona", why: "Obie są poprawne: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} oraz {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Odpowiadają na różne pytania." }
      - { text: "{{t:call|Sprawdzasz}}, gdy masz co najmniej {{n:mdf.bet-third}} equity", why: "Pomieszanie pojęć. Do {{t:call|sprawdzenia}} wystarcza {{n:eq.bet-third}} equity. {{n:mdf.bet-third}} to część {{t:range|zakresu}}, a nie szansa jednej ręki." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Bronisz {{t:big-blind}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. {{t:mdf}} wynosi {{n:mdf.bet-third}}. Czy musisz bronić aż tyle rąk?"
    table: { position: BB }
    options:
      - { text: "Nie, możesz bronić trochę mniej", correct: true, why: "{{t:mdf}} zakłada {{t:bluff}} bez żadnych szans. Na flopie {{t:bluff|blefy}} Buttona mają jeszcze equity ({{t:draw|dobierania}}, wysokie karty), a ty {{t:out-of-position}} nie zrealizujesz całego equity słabych rąk. Dlatego możesz bronić trochę mniej niż {{t:mdf}}, ale na mały c-bet nie {{t:fold|pasujesz}} masowo." }
      - { text: "Tak, inaczej Button zarabia każdą ręką", why: "Na riverze tak by było. Na flopie Button nie {{t:bluff|blefuje}} ręką bez szans: nawet gdy go {{t:call|sprawdzisz}}, może trafić. {{t:mdf}} to punkt odniesienia, nie obowiązek." }
      - { text: "Nie, bronisz więcej, bo to dopiero flop", why: "Odwrotnie. Przyszłe {{t:street|ulice}} działają na korzyść betującego {{t:in-position}}, więc bronisz mniej, nie więcej." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Mikrostawki. Pasywny gracz, który przez całe rozdanie tylko {{t:call|sprawdzał}}, na riverze nagle {{t:bet|stawia}} całą {{t:pot|pulę}}. Masz {{t:pair|parę}} króli ze słabym kickerem. Co robisz?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Gracze pasywni na mikrostawkach rzadko {{t:bluff|blefują}} dużym betem na riverze. Gdy {{t:bluff|blefów}} brakuje, twoja {{t:pair}} płaci głównie lepszym rękom (KQ, sety). Wobec takiego gracza {{t:fold|pasujesz}} częściej, niż wskazuje {{t:mdf}}." }
      - { text: "{{t:call|Sprawdzam}}, bo {{t:mdf}} każe bronić {{n:mdf.bet-pot}}", why: "{{t:mdf}} chroni przed graczem, który {{t:bluff|blefuje}} wystarczająco często. Ten gracz tego nie robi, więc trzymanie się {{t:mdf}} oddaje mu pieniądze." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "Lepsze ręce zapłacą, gorsze {{t:fold|spasują}}. {{t:pair|Para}} ze słabym kickerem nie jest ręką do {{t:raise|przebicia}}." }
---
Gdy rywal {{t:bet|stawia}}, nie pytasz tylko „czy ta ręka może wygrać”. Patrzysz też na wszystkie ręce, które możesz mieć w tej sytuacji, czyli na swój {{t:range}}. Dwie liczby mówią, ile z nich bronić i jak często {{t:bluff}} rywala musi zadziałać.

## Alpha: jak często {{t:bluff}} musi zadziałać

{{t:bluff|Blef}} bez szans wygrywa tylko wtedy, gdy rywal {{t:fold|spasuje}}. Ryzykujesz bet, żeby wygrać {{t:pot|pulę}}.

```formula
alpha = bet ÷ (pula + bet)
```

Przykład: w {{t:pot|puli}} jest {{n:ex.pot}}, {{t:bet|stawiasz}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Jeśli rywal {{t:fold|pasuje}} częściej, twój {{t:bluff}} zarabia nawet bez żadnej ręki.

## {{t:mdf}}: ile musisz bronić

{{t:mdf}} (minimalna częstość obrony) to druga strona alphy. Jeśli bronisz ({{t:call|sprawdzasz}} albo {{t:raise|przebijasz}}) mniej rąk, rywal zarabia, {{t:bluff|blefując}} dowolnymi kartami.

```formula
MDF = pula ÷ (pula + bet)
```

Przykład z rivera: w {{t:pot|puli}} jest {{n:ex.third.pot}}, rywal {{t:bet|stawia}} {{n:ex.third.bet}}, czyli 1/3 {{t:pot|puli}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Bet rywala | {{t:mdf}} | Alpha | Potrzebne equity |
|---|---|---|---|
| 1/4 {{t:pot|puli}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 {{t:pot|puli}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|puli}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 {{t:pot|puli}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Cała {{t:pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} to nie potrzebne equity

Potrzebne equity z M2 dotyczy **jednej ręki**: czy {{t:call}} nią się opłaca. {{t:mdf}} dotyczy **całego {{t:range|zakresu}}**: jaką jego część bronisz. Przy becie 1/3 {{t:pot|puli}} na riverze {{t:mdf}} podpowiada, żeby bronić ok. {{n:mdf.bet-third}} rąk, a pojedyncze {{t:call}} opłaca się, gdy ręka wygrywa w co najmniej {{n:eq.bet-third}} przypadków.

## Na flopie {{t:out-of-position}} bronisz trochę mniej

{{t:mdf}} zakłada, że {{t:bluff}} rywala nie ma żadnych szans. Najbliżej prawdy jest to na riverze, gdzie {{t:draw|dobierania}} już się nie poprawią. Na flopie {{t:bluff|blefy}} mają jeszcze equity: {{t:draw|dobierania}} i wysokie karty mogą się poprawić. Do tego {{t:out-of-position}} nie zrealizujesz całego equity swoich słabych rąk. Dlatego na flopie {{t:out-of-position}} możesz bronić trochę mniej niż {{t:mdf}} i traktujesz go jako punkt odniesienia, a nie obowiązek; na małe c-bety nie {{t:fold|pasujesz}} jednak masowo. Na turnie solver broni średnio blisko {{t:mdf}}, inaczej niż na flopie {{t:out-of-position}}, gdzie broni mniej.

:::note Gdy rywal rzadko {{t:bluff|blefuje}}
{{t:mdf}} chroni cię przed graczem, który {{t:bluff|blefuje}} wystarczająco często. Na mikrostawkach wielu graczy, zwłaszcza pasywnych, {{t:bluff|blefuje}} dużymi betami na riverze za rzadko. Wobec nich {{t:fold|pasujesz}} częściej, niż wskazuje {{t:mdf}}: {{t:call|sprawdzanie}} słabszą {{t:pair|parą}} płaci głównie lepszym rękom. To {{t:exploit|eksploatacja}}, nie strategia wobec każdego (więcej w module 10).
:::
