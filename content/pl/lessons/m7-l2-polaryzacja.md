---
id: m7.l2
module: m7
order: 2
title: "Polaryzacja"
sub: "Duży bet: silne ręce i półblefy"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Który {{t:range}} betu na turnie jest {{t:polarized}}?"
    options:
      - { text: "Sety, {{t:two-pair}} i {{t:draw|drawy}}, bez średnich {{t:pair|par}}", correct: true, why: "Tak: {{t:range}} {{t:polarized}} ma dwa bieguny, bardzo silne ręce i {{t:semi-bluff|semi-blefy}}. Środka, czyli średnich rąk, w nim nie ma: te ręce {{t:check|czekają}}." }
      - { text: "{{t:top-pair|Najwyższe pary}}, średnie {{t:pair|pary}} i słabsze {{t:pair|pary}}", why: "Tu nie ma żadnego bieguna: brakuje bardzo silnych rąk i {{t:semi-bluff|semi-blefów}}, są same {{t:pair|pary}} od góry w dół. Bliżej temu do {{t:range|zakresu}} {{t:linear|liniowego}}, który betuje głównie rękami z wartością, zwykle małym rozmiarem, a nie dużym na turnie." }
      - { text: "Same {{t:bluff|blefy}}", why: "{{t:range|Zakres}} bez silnych rąk rywal łatwo rozpozna i będzie {{t:call|sprawdzał}}. {{t:polarized|Spolaryzowany}} {{t:range}} łączy {{t:bluff|blefy}} z bardzo silnymi rękami." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Na {{t:dry|suchym}} flopie [[Ks 7d 2c]] betowałeś mało prawie wszystkimi rękami: od seta po słabe {{t:pair|pary}}. Jak nazywa się taki {{t:range}} betu?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Liniowy}} (zmieszany)", correct: true, why: "Tak: silne i średnie ręce betują razem, małym rozmiarem. To plan z M5 na {{t:dry|suchym}}, wysokim flopie, gdzie masz {{t:range-advantage|przewagę zakresu}}." }
      - { text: "{{t:polarized|Spolaryzowany}}", why: "{{t:polarized|Spolaryzowany}} {{t:range}} nie ma średnich rąk: betują tylko bardzo silne ręce i {{t:bluff|blefy}}. Tu betowały też słabe {{t:pair|pary}}." }
      - { text: "Ograniczony", why: "Ograniczony {{t:range}} to taki, w którym brakuje najsilniejszych rąk. Ty betowałeś także setami." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Dlaczego średnia {{t:pair}} nie lubi dużego betu na turnie?"
    options:
      - { text: "Bo gorsze ręce {{t:fold|spasują}}, a zapłacą lepsze", correct: true, why: "Tak: duży bet średnią {{t:pair|parą}} zarabia tylko wtedy, gdy zapłaci gorsza ręka, a takie ręce na duży bet zwykle {{t:fold|pasują}}. Zostają {{t:call|sprawdzenia}} od rąk, które cię biją." }
      - { text: "Bo duży bet zawsze jest {{t:bluff|blefem}}", why: "Nie: duży bet {{t:bet|stawiają}} też najsilniejsze ręce. Kłopot średniej {{t:pair|pary}} polega na tym, kto jej zapłaci." }
      - { text: "Bo średnia {{t:pair}} nie może wygrać", why: "Może: wygrywa z {{t:bluff|blefami}} i z gorszymi {{t:pair|parami}}. Dlatego {{t:check|czeka}} i dochodzi do showdownu tanio." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to dwójka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Masz seta. Co robisz?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Tak: rywal może mieć {{t:draw}} do {{t:flush|koloru}} (dwa kiery) i do {{t:straight|strita}} (np. 65, T9). Przy becie 3/4 {{t:pot|puli}} {{t:flush-draw}} potrzebuje {{n:eq.bet-three-quarters}} equity, a {{t:flush}} trafia w ok. {{n:odds.flush.turn-river}} przypadków. Przeciw twojemu setowi ma jeszcze mniej: [[4h]] i [[2h]] dają ci {{t:full-house|fulla}}, więc zostaje mu {{n:outs.flush.vs-set}} czystych outów, ok. {{n:odds.flush.vs-set}}. Płaci za drogo." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: przy becie 1/4 {{t:pot|puli}} {{t:draw}} potrzebuje tylko {{n:eq.bet-quarter}} equity, więc dostaje dobrą cenę. Z bardzo silną ręką na {{t:board|stole}} z {{t:flush-draw|drawem do koloru}} betujesz dużo." }
      - { text: "{{t:check|Czekam}}", why: "Darmowa karta to prezent dla {{t:draw|drawów}}, a ty nie budujesz {{t:pot|puli}} przed riverem. Set na {{t:board|stole}} z {{t:flush-draw|drawem do koloru}} betuje." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to {{t:three-of-a-kind}}. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Tak: {{t:flush-draw}} z dwiema wysokimi kartami to dobry {{t:semi-bluff}}. Betujesz tym samym dużym rozmiarem co silne ręce, więc rywal nie odróżni {{t:bluff|blefu}} od wartości." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: tak tani bet rywal {{t:call|sprawdzi}} każdą {{t:pair|parą}}, a {{t:semi-bluff}} zarabia przede wszystkim na {{t:fold|pasach}}. Gdyby małe bety oznaczały u ciebie {{t:draw|drawy}}, a duże silne ręce, rywal łatwo by to wykorzystał." }
      - { text: "{{t:check|Czekam}}", correct: true, why: "Też dobrze: za darmo zobaczysz rivera i trafisz {{t:flush}} w {{n:odds.flush.turn-river}} przypadków. Bet jest jednak zwykle lepszy, bo {{t:draw}} z wysokimi kartami to jeden z najlepszych {{t:semi-bluff|semi-blefów}}, a {{t:check|czekając}} rezygnujesz z wygrania {{t:pot|puli}} od razu." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to piątka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "{{t:top-pair|Najwyższa para}} ze słabym kickerem to średnia ręka. Na duży bet zapłacą głównie lepsze króle (AK, KQ, KJ), a gorsze ręce {{t:fold|spasują}}. {{t:check|Czekając}}, dochodzisz tanio do showdownu." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Duży bet pasuje do {{t:range|zakresu}} {{t:polarized|spolaryzowanego}}. Z tą ręką zarabiasz głównie od rąk, które cię biją." }
      - { text: "Betuję {{n:ex.bet.pot}}", why: "Jeszcze większa {{t:pot}} z ręką średniej siły: gorsze ręce prawie zawsze {{t:fold|spasują}}, a lepsze zapłacą." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz {{n:ex.bet.three-quarters}} z bardzo silną ręką. Ile procent equity potrzebuje rywal z {{t:draw|drawem}}, żeby {{t:call|sprawdzić}}? Wpisz liczbę."
    answer: eq.bet-three-quarters
    explanation: "Rywal dopłaca {{n:ex.bet.three-quarters}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. {{t:flush-draw|Draw do koloru}} ma na turnie ok. {{n:odds.flush.turn-river}}, więc płaci za drogo."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Masz seta i betujesz tylko {{n:ex.bet.quarter}} do {{t:pot|puli}} {{n:ex.pot}}. Rywal ma {{t:flush-draw}} (ok. {{n:odds.flush.turn-river}} na riverze). Co z tego wynika?"
    options:
      - { text: "Dostaje dobrą cenę: potrzebuje tylko {{n:eq.bet-quarter}}", correct: true, why: "Tak: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, mniej niż jego {{n:odds.flush.turn-river}}. {{t:call|Sprawdzenie}} mu się opłaca, a tobie mały bet oddaje część wartości." }
      - { text: "Musi {{t:fold|spasować}}, bo potrzebuje {{n:eq.bet-three-quarters}}", why: "Tyle potrzebowałby przy becie 3/4 {{t:pot|puli}}. Przy becie 1/4 {{t:pot|puli}} wystarcza mu {{n:eq.bet-quarter}}." }
      - { text: "Cena nie ma znaczenia, bo i tak go bijesz", why: "Teraz go bijesz, ale w ok. {{n:odds.flush.turn-river}} przypadków wygra na riverze. Rozmiar betu decyduje, czy płaci za tę szansę za dużo, czy za mało." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Rywal ma na turnie {{t:oesd}}: ok. {{n:odds.oesd.turn-river}} na riverze. Od jakiego twojego betu płaci za drogo (licząc tylko pot odds)?"
    options:
      - { text: "Już od 1/3 {{t:pot|puli}}: potrzebuje {{n:eq.bet-third}}", correct: true, why: "Tak: {{n:eq.bet-third}} to więcej niż {{n:odds.oesd.turn-river}}. Na turnie {{t:draw|drawy}} mają tylko jedną kartę, więc nawet średni bet daje im złą cenę." }
      - { text: "Dopiero od całej {{t:pot|puli}}: potrzebuje {{n:eq.bet-pot}}", why: "Przy całej {{t:pot|puli}} płaci dużo za drogo, ale już przy 1/3 {{t:pot|puli}} potrzebuje {{n:eq.bet-third}}, więcej niż swoje {{n:odds.oesd.turn-river}}." }
      - { text: "Nigdy, {{t:draw}} zawsze może {{t:call|sprawdzić}}", why: "{{t:draw|Draw}} {{t:call|sprawdza}} tylko przy dobrej cenie albo z implied odds (następna lekcja). Na turnie ma ok. {{n:odds.oesd.turn-river}}, więc większość betów to dla niego zła cena." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz całą {{t:pot|pulę}}: {{n:ex.bet.pot}}. Ile procent equity potrzebuje rywal, żeby {{t:call|sprawdzić}}? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "Rywal dopłaca {{n:ex.bet.pot}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Ani {{t:flush}} (ok. {{n:odds.flush.turn-river}}), ani {{t:straight}} otwarty (ok. {{n:odds.oesd.turn-river}}) nie mają takiej szansy."
---
Na flopie często betowałeś mało prawie całym {{t:range|zakresem}}. Na turnie {{t:range}} betu się zmienia: zostają w nim bardzo silne ręce i {{t:semi-bluff|semi-blefy}}, a średnie ręce {{t:check|czekają}}. Taki {{t:range}} nazywamy {{t:polarized|spolaryzowanym}}.

## Dwa rodzaje {{t:range|zakresu}}

- **{{t:linear|Liniowy}} (zmieszany):** betujesz od najsilniejszych rąk w dół, razem ze średnimi. Zwykle małym rozmiarem, np. c-bet {{n:cbet.size.small}} {{t:pot|puli}} na [[Ks 7d 2c]].
- **{{t:polarized|Spolaryzowany}}:** betują dwa bieguny, bardzo silne ręce (sety, {{t:two-pair}}, {{t:straight|strity}}, kolory) i {{t:semi-bluff|semi-blefy}} ({{t:draw|drawy}}). Średnich rąk w nim nie ma.

Ogólnie {{t:range}} {{t:polarized}} to bardzo silne ręce i {{t:bluff|blefy}}. Na turnie {{t:bluff|blefami}} są zwykle {{t:semi-bluff|semi-blefy}}, a na riverze (M8) ręce bez szans przy showdownie.

## Dlaczego na turnie polaryzujesz

Rywal {{t:call|sprawdził}} flop, więc ma {{t:pair|parę}} albo {{t:draw}}. Średnia ręka na drugi bet nic nie zyskuje: gorsze ręce {{t:fold|pasują}}, a lepsze płacą. Silne ręce chcą zbudować {{t:pot|pulę}} przed riverem, a {{t:semi-bluff|semi-blefy}} potrzebują {{t:fold|pasów}} i mają outy, gdy dostaną {{t:call}}.

## {{t:range|Zakres}} {{t:polarized}}, duży bet

{{t:range|Zakres}} {{t:polarized}} betuje dużo, np. 3/4 {{t:pot|puli}}. Silne ręce wyciągają więcej {{t:chips|żetonów}}, a {{t:semi-bluff|semi-blefy}} częściej wygrywają od razu. Średnie ręce {{t:check|czekają}}. Gdy {{t:bluff|blefy}} i silne ręce betują tym samym rozmiarem, rywal nie wie, co masz.

## Cena dla {{t:draw|drawów}}

Na turnie {{t:draw}} ma tylko jedną kartę. Duży bet każe mu płacić za drogo:

| Twój bet | Rywal potrzebuje | {{t:flush|Kolor}} ma | {{t:straight|Strit}} otwarty ma |
|---|---|---|---|
| 1/4 {{t:pot|puli}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 {{t:pot|puli}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 {{t:pot|puli}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 {{t:pot|puli}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Cała {{t:pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Przy becie 1/4 {{t:pot|puli}} {{t:flush-draw}} ma dobrą cenę. Przy 1/3 {{t:pot|puli}} cena jest prawie równa szansie {{t:flush|koloru}} ({{n:eq.bet-third}} wobec {{n:odds.flush.turn-river}}), a od 1/2 {{t:pot|puli}} wzwyż {{t:flush}} płaci wyraźnie za drogo, chyba że liczy na implied odds (następna lekcja). Zadania z {{t:draw|drawem}} w tej lekcji liczą tylko pot odds.

:::note Skąd te zasady
Pojęcia {{t:range|zakresu}} {{t:polarized|spolaryzowanego}} i {{t:linear|liniowego}} oraz zasada „{{t:polarized}} {{t:range}} betuje dużo, średnie ręce {{t:check|czekają}}” pochodzą z materiałów szkoleniowych i są tu heurystyką; zalecenie dużego betu silną, wrażliwą ręką także. Solver na turnie używa też małych rozmiarów. Rozmiar 3/4 {{t:pot|puli}} to przykład do ćwiczeń, a nie jedyny dobry rozmiar. Ceny w tabeli to dokładne obliczenia aplikacji.
:::
