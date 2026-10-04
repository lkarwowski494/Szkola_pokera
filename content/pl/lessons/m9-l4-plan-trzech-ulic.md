---
id: m9.l4
module: m9
order: 4
title: "Plan na trzy ulice"
sub: "Ile ulic wartości zniesie ręka"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Trafiłeś seta na {{t:dry|suchym}} flopie. Ile {{t:value|ulic wartości}} zniesie ta ręka?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Trzy", correct: true, why: "Set na {{t:dry|suchym}} flopie jest prawie zawsze najlepszy. Na każdej {{t:street|ulicy}} gorsze ręce rywala (np. król, siódemka, {{t:pair}}) mogą jeszcze płacić, więc planujesz {{t:bet}} na flopie, turnie i riverze." }
      - { text: "Jedną", why: "Za mało: z tak silną ręką jeden {{t:bet}} zostawia na {{t:board|stole}} większość wartości. Rywal z królem zapłaci więcej niż raz." }
      - { text: "Żadnej: {{t:check|czekam}}, żeby nie spłoszyć rywala", why: "{{t:check|Czekanie}} na wszystkich {{t:street|ulicach}} nie buduje {{t:pot|puli}}. Set chce, żeby {{t:pot}} rosła, bo zwykle wygrywa na showdownie." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}, {{t:spr}} ok. {{n:spr.srp}}. Masz {{t:top-pair|najwyższą parę}} z najlepszym kickerem. Jaki plan?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Zwykle dwie {{t:value|ulice wartości}}, bez planu gry o cały stack", correct: true, why: "Tak: gorsze króle i ósemki zapłacą zwykle jeden albo dwa {{t:bet|zakłady}}. Gdy pieniędzy w {{t:pot|puli}} robi się bardzo dużo, płacą głównie ręce lepsze od jednej {{t:pair|pary}}. Przy {{t:spr}} ok. {{n:spr.srp}} cały stack wszedłby dopiero przy {{t:bet|zakładach}} większych niż {{t:pot}}." }
      - { text: "Trzy {{t:street|ulice}} dużych {{t:bet|zakładów}} do all-inu", why: "Przy {{t:spr}} ok. {{n:spr.srp}} to {{t:bet|zakłady}} ok. {{n:geo.srp.3}} {{t:pot|puli}} na każdej {{t:street|ulicy}}. Do rivera zostaną w {{t:pot|puli}} głównie {{t:two-pair}} i sety, które biją jedną {{t:pair|parę}}." }
      - { text: "Jedna {{t:street}} albo żadnej", why: "Za ostrożnie: {{t:top-pair}} z najlepszym kickerem na {{t:dry|suchym}} flopie bije wiele rąk rywala. Zwykle zniesie dwie {{t:value|ulice wartości}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Masz środkową {{t:pair|parę}}. Ile {{t:value|ulic wartości}} zniesie ta ręka?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Jedną albo żadnej: często wystarczy dojść do showdownu", correct: true, why: "Tak: środkowa {{t:pair}} wygrywa z {{t:bluff|blefami}} i słabszymi {{t:pair|parami}}, ale gorszych rąk, które zapłacą kilka {{t:bet|zakładów}}, jest niewiele. Plan: najwyżej jeden mały {{t:bet}} albo {{t:check}} i {{t:call|sprawdzanie}}." }
      - { text: "Dwie, jak {{t:top-pair}}", why: "Środkowa {{t:pair}} przegrywa z każdym królem. Po drugim {{t:bet|zakładzie}} płacą głównie ręce, które ją biją." }
      - { text: "Trzy, żeby rywal nie dobrał", why: "Trzy {{t:bet|zakłady}} środkową {{t:pair|parą}} płacą głównie lepszym rękom: gorsze ręce {{t:fold|pasują}} już po pierwszym albo drugim {{t:bet|zakładzie}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pula}} po 4-becie, {{t:spr}} ok. {{n:spr.4bet}}. Masz {{t:top-pair|najwyższą parę}} z najlepszym kickerem. Ręka zniesie dwie {{t:value|ulice wartości}}. Jaki plan?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Dwa {{t:bet|zakłady}} po ok. {{n:geo.4bet.2}} {{t:pot|puli}}: na turnie wchodzi cały stack", correct: true, why: "Tak: przy {{t:spr}} ok. {{n:spr.4bet}} dwie {{t:street|ulice}} wystarczą, żeby wpłacić cały stack. Dwie {{t:value|ulice wartości}} {{t:top-pair|najwyższej pary}} to tu gra o cały stack." }
      - { text: "Mały {{t:bet}} i {{t:fold}} na all-in", why: "Przy {{t:spr}} ok. {{n:spr.4bet}} {{t:fold}} na all-in {{t:top-pair|najwyższą parą}} z asem oddaje za dużo: wystarcza ci ok. {{n:eq.jam.4bet}} equity, a po własnym {{t:bet|zakładzie}} jeszcze mniej." }
      - { text: "{{t:check|Czekam}} na każdej {{t:street|ulicy}}, żeby kontrolować {{t:pot|pulę}}", why: "Kontrola {{t:pot|puli}} ma sens przy wysokim {{t:spr}}. Tu {{t:pot}} jest już duża względem stacku, a gorsze ręce (AQ, QQ, JJ) chętnie wpłacą resztę." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pula}} 3-betowana, masz {{t:position|pozycję}}, {{t:spr}} ok. {{n:spr.3bet-ip}}. Masz seta, chcesz wpłacić cały stack do rivera. Jaka linia?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Zakład}} na flopie, turnie i riverze, za każdym razem ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}", correct: true, why: "Tak: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}} dają razem {{n:geo.3bet-ip.total}}, czyli cały stack. Rywal na każdej {{t:street|ulicy}} płaci rozsądną część {{t:pot|puli}}." }
      - { text: "{{t:bet|Zakład}} 1/3 {{t:pot|puli}} na każdej {{t:street|ulicy}}", sizeError: true, why: "Dobra linia, zły rozmiar: trzy {{t:bet|zakłady}} po 1/3 {{t:pot|puli}} wpłacą tylko ok. {{n:g3b.third.total}} z {{n:spr.3bet-ip.stack}}. Plan na cały stack wymaga ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}." }
      - { text: "{{t:check|Czekam}} na flopie i turnie, na riverze all-in", why: "Na riverze all-in za cały stack byłby {{t:bet|zakładem}} kilka razy większym niż {{t:pot}}. Rywal zapłaci go tylko bardzo silną ręką, a gorsze ręce, które zapłaciłyby trzy mniejsze {{t:bet|zakłady}}, {{t:fold|spasują}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Dlaczego plan na trzy {{t:street|ulice}} warto ustalić już na flopie?"
    options:
      - { text: "Bo rozmiar na flopie decyduje, ile da się wpłacić później", correct: true, why: "Tak: {{t:pot}} rośnie mnożeniem. Mały {{t:bet}} na flopie zostawia małą {{t:pot|pulę}} na turnie i riverze, więc później trudno wpłacić cały stack bez bardzo dużych {{t:bet|zakładów}}." }
      - { text: "Bo później nie wolno zmieniać planu", why: "Plan zmieniasz, gdy zmienia się sytuacja (np. groźna karta na turnie). Chodzi o to, żeby pierwszy {{t:bet}} pasował do celu: ile {{t:value|ulic wartości}} i czy cały stack." }
      - { text: "Bo rywal widzi twój plan", why: "Rywal nie zna twojego planu. Plan pomaga tobie dobrać rozmiar, żeby na koniec w {{t:pot|puli}} było tyle, ile ręka zniesie." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pula}} z jednym podbiciem, {{t:spr}} ok. {{n:spr.srp}}. Masz {{t:top-pair|najwyższą parę}} z dobrym kickerem. Czy betujesz rozmiarem geometrycznym ok. {{n:geo.srp.3}} {{t:pot|puli}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Nie: to rozmiar na cały stack, a ta ręka zwykle zniesie dwie {{t:street|ulice}}", correct: true, why: "Tak: rozmiar geometryczny służy wpłaceniu całego stacku. Przy {{t:bet|zakładach}} większych niż {{t:pot}} gorsze ręce przestają płacić, a zostają ręce lepsze od jednej {{t:pair|pary}}." }
      - { text: "Tak: zawsze betuję geometrycznie", why: "Rozmiar geometryczny pasuje do planu na cały stack. {{t:top-pair|Najwyższa para}} przy {{t:spr}} ok. {{n:spr.srp}} zwykle nie ma takiego planu." }
      - { text: "Nie: z {{t:top-pair|najwyższą parą}} zawsze {{t:check|czekam}}", why: "{{t:top-pair|Najwyższa para}} chce {{t:bet|zakładów}} na wartość, tylko mniejszych i zwykle na dwie {{t:street|ulice}}, a nie na cały stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: w {{t:pot|puli}} {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz ok. {{n:geo.spr2.2}} {{t:pot|puli}} na flopie i na turnie, rywal {{t:call|sprawdza}}. Co z resztą stacku?"
    options:
      - { text: "Po turnie cały stack jest w {{t:pot|puli}}", correct: true, why: "Tak: {{n:geo.spr2.flop}} na flopie i {{n:geo.spr2.turn}} na turnie to razem {{n:geo.spr2.total}}. Dlatego przy {{t:spr}} {{n:spr.commit}} dwie {{t:value|ulice wartości}} {{t:top-pair|najwyższej pary}} wystarczą na grę o cały stack." }
      - { text: "Zostaje mniej więcej połowa na river", why: "{{t:pot|Pula}} rośnie mnożeniem: po flopie jest w niej ok. {{n:geo.spr2.flop-after}}, a {{t:bet}} ok. {{n:geo.spr2.2}} na turnie to ok. {{n:geo.spr2.turn}}, czyli reszta stacku." }
      - { text: "Zostaje prawie cały stack", why: "Przy {{t:spr}} {{n:spr.commit}} stack to tylko {{n:spr.commit}} {{t:pot|pule}}. Dwa {{t:bet|zakłady}} po ok. {{n:geo.spr2.2}} {{t:pot|puli}} wpłacają całe {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Dobry plan zaczyna się na flopie, zanim {{t:bet|postawisz}} pierwszy {{t:bet}}. Pytasz: ile {{t:value|ulic wartości}} zniesie moja ręka i czy chcę grać o cały stack? Odpowiedź łączy siłę ręki z {{t:spr}}.

## Ile {{t:value|ulic wartości}}

Z każdą {{t:street|ulicą}} gorsze ręce rywala {{t:fold|pasują}}, a w {{t:pot|puli}} zostają głównie ręce lepsze od twojej. Dlatego silniejsza ręka zniesie więcej {{t:bet|zakładów}}:

| Ręka | {{t:value|Ulice wartości}} (zwykle) |
|---|---|
| Bardzo silna: set, {{t:straight}}, wysokie {{t:two-pair}} | Trzy |
| {{t:top-pair|Najwyższa para}} z dobrym kickerem, {{t:overpair}} | Dwie; trzecia, gdy rywal płaci słabszymi rękami |
| Słabsza {{t:pair}} (środkowa, niska) | Jedna albo żadnej |

To heurystyka: dużo zależy od {{t:texture|tekstury}} {{t:board|stołu}}, kart na turnie i riverze oraz od rywala.

## Połącz rękę z {{t:spr}}

- **Ręka na trzy {{t:street|ulice}}, strefa {{t:spr}} pozwala na grę o stack i chcesz cały stack:** betujesz rozmiarem geometrycznym od flopu (w {{t:pot|puli}} 3-betowanej {{t:in-position}} ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}}).
- **Ręka na dwie {{t:street|ulice}} przy niskim {{t:spr}}:** przy {{t:spr}} ok. {{n:spr.commit}} dwa {{t:bet|zakłady}} po ok. {{n:geo.spr2.2}} {{t:pot|puli}} to już cały stack, więc grasz o stack.
- **Ręka na dwie {{t:street|ulice}} przy wysokim {{t:spr}}:** w {{t:pot|puli}} z jednym podbiciem ({{t:spr}} ok. {{n:spr.srp}}) betujesz na wartość, ale nie planujesz całego stacku.

Trzy {{t:value|ulice wartości}} to nie to samo co gra o cały stack. Wysokie {{t:two-pair}} znoszą trzy {{t:street|ulice}}, ale w {{t:pot|puli}} z jednym podbiciem ({{t:spr}} ok. {{n:spr.srp}}, powyżej {{n:spr.zone.deep}}) zwykle nie grają o cały stack: w tej strefie o stack gra set, {{t:straight}} i lepsze ręce (strefy {{t:spr}} z pierwszej lekcji).

## Linie

Linia to plan akcji na kolejnych {{t:street|ulicach}}. Kilka podstawowych:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** ręka na trzy {{t:value|ulice wartości}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** ręka na dwie {{t:street|ulice}}, na riverze dochodzisz do showdownu,
- **{{t:bet}} albo {{t:check}}, potem {{t:check}} i {{t:call|sprawdzanie}}:** słabsza {{t:pair}}, która chce dojść do showdownu tanio.

## Rozmiar na flopie ustala resztę

{{t:pot|Pula}} rośnie mnożeniem, więc mały {{t:bet}} na flopie zostawia małą {{t:pot|pulę}} na kolejne {{t:street|ulice}}. W {{t:pot|puli}} 3-betowanej trzy {{t:bet|zakłady}} po 1/3 {{t:pot|puli}} wpłacają tylko ok. {{n:g3b.third.total}} ze stacku {{n:spr.3bet-ip.stack}}, a trzy {{t:bet|zakłady}} po ok. {{n:geo.3bet-ip.3}} {{t:pot|puli}} cały stack.

:::note Plan to nie wyrok
Na turnie i riverze plan {{t:call|sprawdzasz}} na nowo: groźna karta może zmniejszyć liczbę {{t:value|ulic wartości}}. Jak grać turn i river, uczą moduły M7 i M8. Liczba {{t:value|ulic wartości}} dla klas rąk to heurystyka, synteza z Upswing, PokerCoaching i GTO Wizard: w {{t:pot|puli}} z jednym podbiciem {{t:spr}} jest za wysoki, żeby wiele {{t:top-pair|najwyższych par}} wygodnie zebrało trzy {{t:value|ulice wartości}}.
:::
