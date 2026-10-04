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
    prompt: "River. W puli jest {{n:ex.third.pot}}, rywal stawia {{n:ex.third.bet}}. Jaką co najmniej część zakresu musisz bronić (sprawdzić albo przebić), żeby jego blef bez szans nie zarabiał automatycznie? Wpisz liczbę w procentach."
    answer: mdf.bet-third
    explanation: "MDF = pula ÷ (pula + bet) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Rywal ryzykuje {{n:ex.third.bet}}, żeby wygrać {{n:ex.third.pot}}, więc jego blef zarabia, gdy pasujesz częściej niż {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W puli jest {{n:ex.pot}}, rywal stawia całą pulę: {{n:ex.bet.pot}}. Ile wynosi MDF? Wpisz liczbę w procentach."
    answer: mdf.bet-pot
    explanation: "MDF = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Przy becie wielkości puli blef ryzykuje tyle, ile może wygrać, więc wystarczy, że pasujesz w co drugim przypadku, żeby wyszedł na zero."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W puli jest {{n:ex.pot}}, rywal stawia pół puli: {{n:ex.bet.half}}. Ile wynosi MDF?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. Tyle zakresu bronisz, żeby blef bez szans nie zarabiał." }
      - { text: "{{n:alpha.bet-half}}", why: "To alpha: jak często blef rywala musi zadziałać. MDF to reszta do całości, czyli {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "To equity potrzebne do sprawdzenia jedną ręką (z M2). MDF mówi, jaką część całego zakresu bronisz." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. W puli jest {{n:ex.pot}}, rywal stawia więcej niż pulę: {{n:ex.bet.overbet}}. Ile wynosi MDF?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Im większy bet, tym mniejszą część zakresu musisz bronić." }
      - { text: "{{n:alpha.bet-overbet}}", why: "To alpha: tak często musi zadziałać blef za {{n:ex.bet.overbet}}. Ty bronisz resztę, czyli {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "To equity potrzebne do sprawdzenia: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Inna liczba, inne pytanie." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Blefujesz ręką bez szans: w puli jest {{n:ex.pot}}, stawiasz {{n:ex.bet.half}}. Jak często rywal musi pasować, żeby blef wyszedł na zero? Wpisz liczbę w procentach."
    answer: alpha.bet-half
    explanation: "Alpha = bet ÷ (pula + bet) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Ryzykujesz {{n:ex.bet.half}}, żeby wygrać {{n:ex.pot}}: gdy rywal pasuje częściej, blef zarabia."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Blefujesz: w puli jest {{n:ex.pot}}, stawiasz {{n:ex.bet.three-quarters}}. Jak często rywal musi pasować, żeby blef się opłacał?"
    options:
      - { text: "Częściej niż {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Tyle wynosi alpha dla betu 3/4 puli." }
      - { text: "Częściej niż {{n:mdf.bet-three-quarters}}", why: "To MDF, czyli ile rywal powinien bronić. Alpha to część, którą może spasować, zanim twój blef zacznie zarabiać: {{n:alpha.bet-three-quarters}}." }
      - { text: "Częściej niż {{n:eq.bet-three-quarters}}", why: "To equity, którego rywal potrzebuje do sprawdzenia. Próg dla blefu liczysz bez jego sprawdzenia w mianowniku: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "W puli jest {{n:ex.pot}}. Który blef bez szans potrzebuje rzadszych pasów rywala: za {{n:ex.bet.quarter}} czy za {{n:ex.bet.pot}}?"
    options:
      - { text: "Za {{n:ex.bet.quarter}}: wystarczy ponad {{n:alpha.bet-quarter}} pasów", correct: true, why: "Mały blef ryzykuje mało: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Blef za całą pulę potrzebuje ponad {{n:alpha.bet-pot}} pasów." }
      - { text: "Za {{n:ex.bet.pot}}: wystarczy ponad {{n:alpha.bet-quarter}} pasów", why: "Odwrotnie. Większy bet ryzykuje więcej, więc rywal musi pasować częściej: przy całej puli ponad {{n:alpha.bet-pot}}." }
      - { text: "Oba potrzebują tyle samo", why: "Alpha zależy od rozmiaru: {{n:alpha.bet-quarter}} przy {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} przy {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, rywal stawia 1/3 puli. MDF wynosi {{n:mdf.bet-third}}, a do sprawdzenia potrzebujesz {{n:eq.bet-third}} equity. Jak pogodzić te dwie liczby?"
    options:
      - { text: "MDF dotyczy całego zakresu, equity jednej ręki", correct: true, why: "MDF mówi, jaką część wszystkich swoich rąk bronisz, żeby rywal nie mógł blefować dowolnymi kartami. Potrzebne equity mówi, czy sprawdzenie konkretną ręką się opłaca wobec tego, czym rywal naprawdę stawia." }
      - { text: "Jedna z nich jest źle policzona", why: "Obie są poprawne: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} oraz {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Odpowiadają na różne pytania." }
      - { text: "Sprawdzasz, gdy masz co najmniej {{n:mdf.bet-third}} equity", why: "Pomieszanie pojęć. Do sprawdzenia wystarcza {{n:eq.bet-third}} equity. {{n:mdf.bet-third}} to część zakresu, a nie szansa jednej ręki." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Bronisz duży blind, Button stawia c-bet 1/3 puli. MDF wynosi {{n:mdf.bet-third}}. Czy musisz bronić aż tyle rąk?"
    table: { position: BB }
    options:
      - { text: "Nie, bronisz mniej", correct: true, why: "MDF zakłada blef bez żadnych szans. Na flopie blefy Buttona mają jeszcze equity (dobierania, wysokie karty), a ty bez pozycji nie zrealizujesz całego equity słabych rąk. Dlatego bronisz mniej niż MDF." }
      - { text: "Tak, inaczej Button zarabia każdą ręką", why: "Na riverze tak by było. Na flopie Button nie blefuje ręką bez szans: nawet gdy go sprawdzisz, może trafić. Obrona aż {{n:mdf.bet-third}} zmuszałaby cię do płacenia rękami, które tracą." }
      - { text: "Nie, bronisz więcej, bo to dopiero flop", why: "Odwrotnie. Przyszłe ulice działają na korzyść betującego z pozycją, więc bronisz mniej, nie więcej." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Mikrostawki. Pasywny gracz, który przez całe rozdanie tylko sprawdzał, na riverze nagle stawia całą pulę. Masz parę króli ze słabym kickerem. Co robisz?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "Gracze pasywni na mikrostawkach rzadko blefują dużym betem na riverze. Gdy blefów brakuje, twoja para płaci głównie lepszym rękom (KQ, sety). Wobec takiego gracza pasujesz częściej, niż wskazuje MDF." }
      - { text: "Sprawdzam, bo MDF każe bronić {{n:mdf.bet-pot}}", why: "MDF chroni przed graczem, który blefuje wystarczająco często. Ten gracz tego nie robi, więc trzymanie się MDF oddaje mu pieniądze." }
      - { text: "Przebijam all-in", why: "Lepsze ręce zapłacą, gorsze spasują. Para ze słabym kickerem nie jest ręką do przebicia." }
---
Gdy rywal stawia, nie pytasz tylko „czy ta ręka może wygrać”. Patrzysz też na wszystkie ręce, które możesz mieć w tej sytuacji, czyli na swój zakres. Dwie liczby mówią, ile z nich bronić i jak często blef rywala musi zadziałać.

## Alpha: jak często blef musi zadziałać

Blef bez szans wygrywa tylko wtedy, gdy rywal spasuje. Ryzykujesz bet, żeby wygrać pulę.

```formula
alpha = bet ÷ (pula + bet)
```

Przykład: w puli jest {{n:ex.pot}}, stawiasz {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Jeśli rywal pasuje częściej, twój blef zarabia nawet bez żadnej ręki.

## MDF: ile musisz bronić

MDF (minimalna częstość obrony) to druga strona alphy. Jeśli bronisz (sprawdzasz albo przebijasz) mniej rąk, rywal zarabia, blefując dowolnymi kartami.

```formula
MDF = pula ÷ (pula + bet)
```

Przykład z rivera: w puli jest {{n:ex.third.pot}}, rywal stawia {{n:ex.third.bet}}, czyli 1/3 puli. MDF = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Bet rywala | MDF | Alpha | Potrzebne equity |
|---|---|---|---|
| 1/4 puli | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 puli | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 puli | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 puli | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Cała pula | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## MDF to nie potrzebne equity

Potrzebne equity z M2 dotyczy **jednej ręki**: czy sprawdzenie nią się opłaca. MDF dotyczy **całego zakresu**: jaką jego część bronisz. Przy becie 1/3 puli na riverze MDF podpowiada, żeby bronić ok. {{n:mdf.bet-third}} rąk, a pojedyncze sprawdzenie opłaca się, gdy ręka wygrywa w co najmniej {{n:eq.bet-third}} przypadków.

## Na flopie bronisz mniej

MDF zakłada, że blef rywala nie ma żadnych szans. To prawda tylko na riverze. Na flopie i turnie blefy mają jeszcze equity: dobierania i wysokie karty mogą się poprawić. Do tego bez pozycji nie zrealizujesz całego equity swoich słabych rąk. Dlatego na flopie bronisz mniej niż MDF i traktujesz go jako punkt odniesienia, a nie obowiązek.

:::note Gdy rywal rzadko blefuje
MDF chroni cię przed graczem, który blefuje wystarczająco często. Na mikrostawkach wielu graczy, zwłaszcza pasywnych, blefuje dużymi betami na riverze za rzadko. Wobec nich pasujesz częściej, niż wskazuje MDF: sprawdzanie słabszą parą płaci głównie lepszym rękom. To eksploatacja, nie strategia wobec każdego.
:::
