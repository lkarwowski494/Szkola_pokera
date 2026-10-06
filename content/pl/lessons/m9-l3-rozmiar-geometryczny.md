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
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Betujesz całą {{t:pot|pulę}} ({{n:ex.bet.pot}}), rywal {{t:call|sprawdza}}. Ile jest teraz w {{t:pot|puli}}? Wpisz liczbę."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. {{t:bet|Zakład}} wielkości {{t:pot|puli}} i {{t:call}} mnożą {{t:pot|pulę}} przez trzy. Ogólnie: {{t:bet}} f {{t:pot|puli}} i {{t:call}} mnożą {{t:pot|pulę}} przez (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}. Na flopie, turnie i riverze betujesz całą {{t:pot|pulę}} ({{n:ex.bet.pot}}, potem {{n:geo.ex.turn}}, potem {{n:geo.ex.river}}), a rywal za każdym razem {{t:call|sprawdza}}. Ile łącznie wpłaca każdy z was? Wpisz liczbę."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. {{t:pot|Pula}} rośnie z {{n:ex.pot}} do {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} i {{n:geo.ex.river-after}}. Trzy {{t:bet|zakłady}} wielkości {{t:pot|puli}} dają więc all-in przy {{t:spr}} {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Przy jakim {{t:spr}} trzy {{t:bet|zakłady}} pół {{t:pot|puli}} (flop, turn, river, każdy sprawdzony) wpłacają dokładnie cały stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pula}} {{n:ex.pot}}: {{t:bet|zakłady}} {{n:ex.bet.half}}, {{n:geo.half.turn}} i {{n:geo.half.river}} dają razem {{n:geo.half.total}}, czyli stack {{n:geo.half.stack}}. Ze wzoru: (1 + 2·{{n:ex.frac.half}}) do potęgi trzeciej = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Przy {{t:spr}} {{n:spr.zone.deep}} trzeba betować całą {{t:pot|pulę}} na każdej {{t:street|ulicy}}. {{t:bet|Zakłady}} pół {{t:pot|puli}} wpłacą wtedy tylko {{n:geo.half.total}} z {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Przy {{t:spr}} {{n:spr.commit}} trzy {{t:bet|zakłady}} pół {{t:pot|puli}} to za dużo: stack skończy się już na riverze, zanim {{t:bet|postawisz}} pełne pół {{t:pot|puli}}. {{t:fold|Pasuje}} {{t:spr}} {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pula}} z jednym podbiciem: na flopie jest {{n:bb.pot-after.vs-btn}}, za każdym z was {{n:spr.srp.stack}}. Betujesz pół {{t:pot|puli}} na flopie, turnie i riverze, rywal zawsze {{t:call|sprawdza}}. Ile łącznie wpłacisz?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. Większość stacku zostaje za {{t:pot|pulą}}: przy {{t:spr}} ok. {{n:spr.srp}} pół {{t:pot|puli}} to za mało, żeby zagrać o cały stack." }
      - { text: "{{n:spr.srp.stack}}, czyli cały stack", why: "{{t:pot|Pula}} rośnie tylko do {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} i dalej. Trzy {{t:bet|zakłady}} pół {{t:pot|puli}} wpłacają razem {{n:srp.half.total}}, daleko od całego stacku." }
      - { text: "{{n:srp.potbet.total}}", why: "Tyle wpłaciłyby trzy {{t:bet|zakłady}} wielkości całej {{t:pot|puli}} ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). {{t:bet|Zakłady}} pół {{t:pot|puli}} dają tylko {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pula}} z jednym podbiciem, {{t:spr}} ok. {{n:spr.srp}}. Jaki stały rozmiar {{t:bet|zakładu}} na flopie, turnie i riverze wpłaca cały stack?"
    options:
      - { text: "Ok. {{n:geo.srp.3}} {{t:pot|puli}}, czyli więcej niż cała {{t:pot}}", correct: true, why: "Tak: nawet trzy {{t:bet|zakłady}} wielkości {{t:pot|puli}} wpłacają tylko {{n:srp.potbet.total}} ze stacku {{n:spr.srp.stack}}. Cały stack wchodzi dopiero przy ok. {{n:geo.srp.3}} {{t:pot|puli}} na każdej {{t:street|ulicy}}." }
      - { text: "Ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}", why: "Tyle wystarcza w {{t:pot|puli}} 3-betowanej ({{t:spr}} ok. {{n:spr.3bet-ip}}). W {{t:pot|puli}} z jednym podbiciem {{t:spr}} jest ok. {{n:spr.srp}}, więc {{t:bet|zakłady}} muszą być większe niż {{t:pot}}." }
      - { text: "Ok. {{n:cbet.size.small}} {{t:pot|puli}}", why: "Trzy takie {{t:bet|zakłady}} wpłacą tylko niewielką część stacku. Przy {{t:spr}} ok. {{n:spr.srp}} potrzeba ok. {{n:geo.srp.3}} {{t:pot|puli}} na każdej {{t:street|ulicy}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pula}} 3-betowana, masz {{t:position|pozycję}}, {{t:spr}} ok. {{n:spr.3bet-ip}}. Masz bardzo silną rękę i chcesz wpłacić cały stack do rivera równymi {{t:bet|zakładami}}. Ile betujesz na flopie?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Tak: (1 + 2f) do potęgi trzeciej = 1 + 2·{{n:spr.3bet-ip}} daje f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Zakłady}} {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}} dają razem {{n:geo.3bet-ip.total}}, czyli cały stack." }
      - { text: "{{n:cbet.size.small}} {{t:pot|puli}} ({{n:g3b.third.flop}})", sizeError: true, why: "Dobra akcja, zły rozmiar: trzy {{t:bet|zakłady}} po 1/3 {{t:pot|puli}} wpłacą tylko ok. {{n:g3b.third.total}} z {{n:spr.3bet-ip.stack}}. Do planu „cały stack do rivera” potrzeba ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}." }
      - { text: "{{t:check|Czekam}}, a na riverze idę all-in", why: "Na riverze all-in za {{n:spr.3bet-ip.stack}} do {{t:pot|puli}} {{n:vs3bet.pot-after}} to {{t:bet}} wiele razy większy niż {{t:pot}}: rywal zapłaci go tylko bardzo silną ręką. Równe {{t:bet|zakłady}} na trzech {{t:street|ulicach}} dają mu okazję wpłacać pieniądze po trochu." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pula}} po twoim 3-becie z {{t:big-blind|dużego blinda}}, {{t:spr}} ok. {{n:spr.3bet-oop}}. Chcesz wpłacić cały stack do rivera równymi {{t:bet|zakładami}}. Jaki ułamek {{t:pot|puli}} na każdej {{t:street|ulicy}}?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:geo.3bet-oop.3}} {{t:pot|puli}}", correct: true, why: "Tak: przy {{t:spr}} ok. {{n:spr.3bet-oop}} (1 + 2f) do potęgi trzeciej = 1 + 2·{{n:spr.3bet-oop}}, więc f ≈ {{n:geo.3bet-oop.3}}. Niższy {{t:spr}} niż po 3-becie {{t:in-position}}, więc i mniejszy rozmiar." }
      - { text: "Ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}", sizeError: true, why: "Blisko, ale to rozmiar dla {{t:spr}} ok. {{n:spr.3bet-ip}}. Przy {{t:spr}} ok. {{n:spr.3bet-oop}} wystarczy ok. {{n:geo.3bet-oop.3}} {{t:pot|puli}}, a przy większych {{t:bet|zakładach}} na riverze zabraknie stacku na pełny {{t:bet}}." }
      - { text: "Ok. {{n:geo.4bet.3}} {{t:pot|puli}}", sizeError: true, why: "Tyle wystarcza po 4-becie ({{t:spr}} ok. {{n:spr.4bet}}). Przy {{t:spr}} ok. {{n:spr.3bet-oop}} trzy takie {{t:bet|zakłady}} zostawią sporą część stacku." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pula}} po 4-becie, {{t:spr}} ok. {{n:spr.4bet}}. Chcesz wpłacić cały stack w dwóch {{t:bet|zakładach}}: na flopie i na turnie. Ile betujesz na flopie?"
    options:
      - { text: "Ok. {{n:geo.4bet.2}} {{t:pot|puli}}", correct: true, why: "Tak: na dwie {{t:street|ulice}} (1 + 2f) do kwadratu = 1 + 2·{{n:spr.4bet}}, więc f ≈ {{n:geo.4bet.2}}. Po {{t:bet|zakładzie}} i {{t:call|sprawdzeniu}} zostaje dokładnie tyle, ile wynosi taki sam {{t:bet}} na turnie." }
      - { text: "Ok. {{n:geo.4bet.3}} {{t:pot|puli}}", sizeError: true, why: "To rozmiar na trzy {{t:street|ulice}}. W dwóch {{t:bet|zakładach}} po {{n:geo.4bet.3}} {{t:pot|puli}} część stacku zostanie na river." }
      - { text: "All-in od razu ({{n:spr.4bet.stack}})", why: "To plan na jedną {{t:street|ulicę}}, a nie na dwie. {{t:bet|Zakład}} ok. {{n:spr.4bet}} {{t:pot|puli}} od razu daje rywalowi tylko jedną decyzję: {{t:call|sprawdzić}} całość albo {{t:fold|spasować}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Co oznacza rozmiar geometryczny?"
    options:
      - { text: "Ten sam ułamek {{t:pot|puli}} na każdej {{t:street|ulicy}}, tak że ostatni {{t:bet}} to all-in", correct: true, why: "Tak: {{t:bet}} f i {{t:call}} mnożą {{t:pot|pulę}} przez (1 + 2f) na każdej {{t:street|ulicy}}. Rozmiar dobierasz tak, żeby po ostatnim {{t:bet|zakładzie}} cały stack był w {{t:pot|puli}}." }
      - { text: "Zawsze {{t:bet}} wielkości całej {{t:pot|puli}}", why: "Cała {{t:pot}} jest geometryczna tylko przy jednym {{t:spr}} (np. {{n:spr.zone.deep}} na trzy {{t:street|ulice}}). Przy {{t:spr}} ok. {{n:spr.3bet-ip}} wystarczy ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}." }
      - { text: "{{t:bet|Zakłady}} coraz większe procentowo: mały na flopie, duży na riverze", why: "Kwoty rosną, bo rośnie {{t:pot}}, ale ułamek {{t:pot|puli}} jest na każdej {{t:street|ulicy}} taki sam. W {{t:pot|puli}} 3-betowanej to {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}}, za każdym razem ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}." }
---
Zanim {{t:bet|postawisz}} {{t:bet}} na flopie, warto wiedzieć, ile pieniędzy da się wpłacić do rivera. {{t:bet|Zakład}} i {{t:call}} nie dodają do {{t:pot|puli}} stałej kwoty, tylko ją mnożą.

## Jak rośnie {{t:pot}}

{{t:bet|Zakład}} wielkości f {{t:pot|puli}} i {{t:call}} mnożą {{t:pot|pulę}} przez (1 + 2f). Przy {{t:bet|zakładzie}} wielkości całej {{t:pot|puli}} {{t:pot}} rośnie trzy razy:

| {{t:street|Ulica}} | {{t:pot|Pula}} przed {{t:bet|zakładem}} | {{t:bet|Zakład}} (cała {{t:pot}}) | {{t:pot|Pula}} po {{t:call|sprawdzeniu}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Każdy gracz wpłacił {{n:geo.ex.total}}, czyli {{n:spr.zone.deep}} {{t:pot|pul}}. Trzy {{t:bet|zakłady}} wielkości {{t:pot|puli}} dają więc all-in dokładnie przy {{t:spr}} {{n:spr.zone.deep}}. Stąd próg najwyższej strefy {{t:spr}} z pierwszej lekcji.

## Wzór

Rozmiar geometryczny to ten sam ułamek {{t:pot|puli}} f na każdej {{t:street|ulicy}}, dobrany tak, żeby ostatni {{t:bet}} był all-inem. Na n {{t:street|ulic}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Przykład: przy {{t:spr}} {{n:geo.half.spr}} trzy {{t:bet|zakłady}} pół {{t:pot|puli}} wpłacają cały stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} i {{n:geo.half.river}}, razem {{n:geo.half.total}} przy {{t:pot|puli}} {{n:ex.pot}}.

## Rozmiary dla typowych {{t:pot|pul}}

| {{t:pot|Pula}} | {{t:spr}} | Trzy {{t:street|ulice}} | Dwie {{t:street|ulice}} |
|---|---|---|---|
| {{t:open|Otwarcie}} i {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot|puli}} | – |
| 3-bet {{t:in-position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot|puli}} | – |
| 3-bet z {{t:big-blind|dużego blinda}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot|puli}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot|puli}} | {{n:geo.4bet.2}} {{t:pot|puli}} |

W {{t:pot|puli}} 3-betowanej {{t:in-position}} to {{t:bet|zakłady}} {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}}, razem {{n:geo.3bet-ip.total}}, czyli cały stack.

## {{t:pot|Pula}} z jednym podbiciem jest głęboka

Przy {{t:spr}} ok. {{n:spr.srp}} trzy {{t:bet|zakłady}} pół {{t:pot|puli}} wpłacają tylko {{n:srp.half.total}}, a trzy {{t:bet|zakłady}} wielkości {{t:pot|puli}} {{n:srp.potbet.total}} ze stacku {{n:spr.srp.stack}}. Cały stack wchodzi dopiero przy {{t:bet|zakładach}} większych niż {{t:pot}}. Dlatego w takiej {{t:pot|puli}} gra o cały stack zdarza się głównie z bardzo silnymi rękami.

:::note Kiedy to się przydaje
Rozmiar geometryczny przydaje się, gdy chcesz wpłacić cały stack do rivera, czyli z bardzo silną ręką. Nie każda ręka chce grać o cały stack: o tym, ile {{t:value|ulic wartości}} zniesie ręka, jest następna lekcja. Wzór to czysta matematyka. Wcześniejsze moduły podają rozmiary dopasowane do {{t:texture|tekstury}} flopu; rozmiar geometryczny to punkt odniesienia dla planu na cały stack.
:::
