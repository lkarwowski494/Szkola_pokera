---
id: m9.l3
module: m9
order: 3
title: "Rozmiar geometryczny"
sub: "Ten sam ułamek puli do all-inu"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "W puli jest {{n:ex.pot}}. Betujesz całą pulę ({{n:ex.bet.pot}}), rywal sprawdza. Ile jest teraz w puli? Wpisz liczbę."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Zakład wielkości puli i sprawdzenie mnożą pulę przez trzy. Ogólnie: zakład f puli i sprawdzenie mnożą pulę przez (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "W puli jest {{n:ex.pot}}. Na flopie, turnie i riverze betujesz całą pulę ({{n:ex.bet.pot}}, potem {{n:geo.ex.turn}}, potem {{n:geo.ex.river}}), a rywal za każdym razem sprawdza. Ile łącznie wpłaca każdy z was? Wpisz liczbę."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. Pula rośnie z {{n:ex.pot}} do {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} i {{n:geo.ex.river-after}}. Trzy zakłady wielkości puli dają więc all-in przy SPR {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Przy jakim SPR trzy zakłady pół puli (flop, turn, river, każdy sprawdzony) wpłacają dokładnie cały stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "Pula {{n:ex.pot}}: zakłady {{n:ex.bet.half}}, {{n:geo.half.turn}} i {{n:geo.half.river}} dają razem {{n:geo.half.total}}, czyli stack {{n:geo.half.stack}}. Ze wzoru: (1 + 2·{{n:ex.frac.half}}) do potęgi trzeciej = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Przy SPR {{n:spr.zone.deep}} trzeba betować całą pulę na każdej ulicy. Zakłady pół puli wpłacą wtedy tylko {{n:geo.half.total}} z {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Przy SPR {{n:spr.commit}} trzy zakłady pół puli to za dużo: stack skończy się już na riverze, zanim postawisz pełne pół puli. Pasuje SPR {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "Pula z jednym podbiciem: na flopie jest {{n:bb.pot-after.vs-btn}}, za każdym z was {{n:spr.srp.stack}}. Betujesz pół puli na flopie, turnie i riverze, rywal zawsze sprawdza. Ile łącznie wpłacisz?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. Większość stacku zostaje za pulą: przy SPR ok. {{n:spr.srp}} pół puli to za mało, żeby zagrać o cały stack." }
      - { text: "{{n:spr.srp.stack}}, czyli cały stack", why: "Pula rośnie tylko do {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} i dalej. Trzy zakłady pół puli wpłacają razem {{n:srp.half.total}}, daleko od całego stacku." }
      - { text: "{{n:srp.potbet.total}}", why: "Tyle wpłaciłyby trzy zakłady wielkości całej puli ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Zakłady pół puli dają tylko {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "Pula z jednym podbiciem, SPR ok. {{n:spr.srp}}. Jaki stały rozmiar zakładu na flopie, turnie i riverze wpłaca cały stack?"
    options:
      - { text: "Ok. {{n:geo.srp.3}} puli, czyli więcej niż cała pula", correct: true, why: "Tak: nawet trzy zakłady wielkości puli wpłacają tylko {{n:srp.potbet.total}} ze stacku {{n:spr.srp.stack}}. Cały stack wchodzi dopiero przy ok. {{n:geo.srp.3}} puli na każdej ulicy." }
      - { text: "Ok. {{n:geo.3bet-ip.3}} puli", why: "Tyle wystarcza w puli 3-betowanej (SPR ok. {{n:spr.3bet-ip}}). W puli z jednym podbiciem SPR jest ok. {{n:spr.srp}}, więc zakłady muszą być większe niż pula." }
      - { text: "Ok. {{n:cbet.size.small}} puli", why: "Trzy takie zakłady wpłacą tylko niewielką część stacku. Przy SPR ok. {{n:spr.srp}} potrzeba ok. {{n:geo.srp.3}} puli na każdej ulicy." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "Pula 3-betowana, masz pozycję, SPR ok. {{n:spr.3bet-ip}}. Masz bardzo silną rękę i chcesz wpłacić cały stack do rivera równymi zakładami. Ile betujesz na flopie?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Ok. {{n:geo.3bet-ip.3}} puli ({{n:geo.3bet-ip.flop}})", correct: true, why: "Tak: (1 + 2f) do potęgi trzeciej = 1 + 2·{{n:spr.3bet-ip}} daje f ≈ {{n:geo.3bet-ip.3}}. Zakłady {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}} dają razem {{n:geo.3bet-ip.total}}, czyli cały stack." }
      - { text: "{{n:cbet.size.small}} puli ({{n:g3b.third.flop}})", sizeError: true, why: "Dobra akcja, zły rozmiar: trzy zakłady po 1/3 puli wpłacą tylko ok. {{n:g3b.third.total}} z {{n:spr.3bet-ip.stack}}. Do planu „cały stack do rivera” potrzeba ok. {{n:geo.3bet-ip.3}} puli." }
      - { text: "Czekam, a na riverze idę all-in", why: "Na riverze all-in za {{n:spr.3bet-ip.stack}} do puli {{n:vs3bet.pot-after}} to zakład wiele razy większy niż pula: rywal zapłaci go tylko bardzo silną ręką. Równe zakłady na trzech ulicach dają mu okazję wpłacać pieniądze po trochu." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "Pula po twoim 3-becie z dużego blinda, SPR ok. {{n:spr.3bet-oop}}. Chcesz wpłacić cały stack do rivera równymi zakładami. Jaki ułamek puli na każdej ulicy?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:geo.3bet-oop.3}} puli", correct: true, why: "Tak: przy SPR ok. {{n:spr.3bet-oop}} (1 + 2f) do potęgi trzeciej = 1 + 2·{{n:spr.3bet-oop}}, więc f ≈ {{n:geo.3bet-oop.3}}. Niższy SPR niż po 3-becie z pozycją, więc i mniejszy rozmiar." }
      - { text: "Ok. {{n:geo.3bet-ip.3}} puli", sizeError: true, why: "Blisko, ale to rozmiar dla SPR ok. {{n:spr.3bet-ip}}. Przy SPR ok. {{n:spr.3bet-oop}} wystarczy ok. {{n:geo.3bet-oop.3}} puli, a przy większych zakładach na riverze zabraknie stacku na pełny zakład." }
      - { text: "Ok. {{n:geo.4bet.3}} puli", sizeError: true, why: "Tyle wystarcza po 4-becie (SPR ok. {{n:spr.4bet}}). Przy SPR ok. {{n:spr.3bet-oop}} trzy takie zakłady zostawią sporą część stacku." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Chcesz wpłacić cały stack w dwóch zakładach: na flopie i na turnie. Ile betujesz na flopie?"
    options:
      - { text: "Ok. {{n:geo.4bet.2}} puli", correct: true, why: "Tak: na dwie ulice (1 + 2f) do kwadratu = 1 + 2·{{n:spr.4bet}}, więc f ≈ {{n:geo.4bet.2}}. Po zakładzie i sprawdzeniu zostaje dokładnie tyle, ile wynosi taki sam zakład na turnie." }
      - { text: "Ok. {{n:geo.4bet.3}} puli", sizeError: true, why: "To rozmiar na trzy ulice. W dwóch zakładach po {{n:geo.4bet.3}} puli część stacku zostanie na river." }
      - { text: "All-in od razu ({{n:spr.4bet.stack}})", why: "To plan na jedną ulicę, a nie na dwie. Zakład ok. {{n:spr.4bet}} puli od razu daje rywalowi tylko jedną decyzję: sprawdzić całość albo spasować." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Co oznacza rozmiar geometryczny?"
    options:
      - { text: "Ten sam ułamek puli na każdej ulicy, tak że ostatni zakład to all-in", correct: true, why: "Tak: zakład f i sprawdzenie mnożą pulę przez (1 + 2f) na każdej ulicy. Rozmiar dobierasz tak, żeby po ostatnim zakładzie cały stack był w puli." }
      - { text: "Zawsze zakład wielkości całej puli", why: "Cała pula jest geometryczna tylko przy jednym SPR (np. {{n:spr.zone.deep}} na trzy ulice). Przy SPR ok. {{n:spr.3bet-ip}} wystarczy ok. {{n:geo.3bet-ip.3}} puli." }
      - { text: "Zakłady coraz większe procentowo: mały na flopie, duży na riverze", why: "Kwoty rosną, bo rośnie pula, ale ułamek puli jest na każdej ulicy taki sam. W puli 3-betowanej to {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}}, za każdym razem ok. {{n:geo.3bet-ip.3}} puli." }
---
Zanim postawisz zakład na flopie, warto wiedzieć, ile pieniędzy da się wpłacić do rivera. Zakład i sprawdzenie nie dodają do puli stałej kwoty, tylko ją mnożą.

## Jak rośnie pula

Zakład wielkości f puli i sprawdzenie mnożą pulę przez (1 + 2f). Przy zakładzie wielkości całej puli pula rośnie trzy razy:

| Ulica | Pula przed zakładem | Zakład (cała pula) | Pula po sprawdzeniu |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Każdy gracz wpłacił {{n:geo.ex.total}}, czyli {{n:spr.zone.deep}} pul. Trzy zakłady wielkości puli dają więc all-in dokładnie przy SPR {{n:spr.zone.deep}}. Stąd próg najwyższej strefy SPR z pierwszej lekcji.

## Wzór

Rozmiar geometryczny to ten sam ułamek puli f na każdej ulicy, dobrany tak, żeby ostatni zakład był all-inem. Na n ulic:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Przykład: przy SPR {{n:geo.half.spr}} trzy zakłady pół puli wpłacają cały stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} i {{n:geo.half.river}}, razem {{n:geo.half.total}} przy puli {{n:ex.pot}}.

## Rozmiary dla typowych pul

| Pula | SPR | Trzy ulice | Dwie ulice |
|---|---|---|---|
| Otwarcie i sprawdzenie | {{n:spr.srp}} | {{n:geo.srp.3}} puli | – |
| 3-bet z pozycją | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} puli | – |
| 3-bet z dużego blinda | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} puli | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} puli | {{n:geo.4bet.2}} puli |

W puli 3-betowanej z pozycją to zakłady {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}}, razem {{n:geo.3bet-ip.total}}, czyli cały stack.

## Pula z jednym podbiciem jest głęboka

Przy SPR ok. {{n:spr.srp}} trzy zakłady pół puli wpłacają tylko {{n:srp.half.total}}, a trzy zakłady wielkości puli {{n:srp.potbet.total}} ze stacku {{n:spr.srp.stack}}. Cały stack wchodzi dopiero przy zakładach większych niż pula. Dlatego w takiej puli gra o cały stack zdarza się głównie z bardzo silnymi rękami.

:::note Kiedy to się przydaje
Rozmiar geometryczny przydaje się, gdy chcesz wpłacić cały stack do rivera, czyli z bardzo silną ręką. Nie każda ręka chce grać o cały stack: o tym, ile ulic wartości zniesie ręka, jest następna lekcja. Wzór to czysta matematyka. Wcześniejsze moduły podają rozmiary dopasowane do tekstury flopu; rozmiar geometryczny to punkt odniesienia dla planu na cały stack.
:::
