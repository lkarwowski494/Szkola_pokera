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
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Trafiłeś seta na suchym flopie. Ile ulic wartości zniesie ta ręka?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Trzy", correct: true, why: "Set na suchym flopie jest prawie zawsze najlepszy. Na każdej ulicy gorsze ręce rywala (np. król, siódemka, para) mogą jeszcze płacić, więc planujesz zakład na flopie, turnie i riverze." }
      - { text: "Jedną", why: "Za mało: z tak silną ręką jeden zakład zostawia na stole większość wartości. Rywal z królem zapłaci więcej niż raz." }
      - { text: "Żadnej: czekam, żeby nie spłoszyć rywala", why: "Czekanie na wszystkich ulicach nie buduje puli. Set chce, żeby pula rosła, bo zwykle wygrywa na showdownie." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził, SPR ok. {{n:spr.srp}}. Masz top parę z najlepszym kickerem. Jaki plan?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Zwykle dwie ulice wartości, bez planu gry o cały stack", correct: true, why: "Tak: gorsze króle i ósemki zapłacą zwykle jeden albo dwa zakłady. Gdy pieniędzy w puli robi się bardzo dużo, płacą głównie ręce lepsze od jednej pary. Przy SPR ok. {{n:spr.srp}} cały stack wszedłby dopiero przy zakładach większych niż pula." }
      - { text: "Trzy ulice dużych zakładów do all-inu", why: "Przy SPR ok. {{n:spr.srp}} to zakłady ok. {{n:geo.srp.3}} puli na każdej ulicy. Do rivera zostaną w puli głównie dwie pary i sety, które biją jedną parę." }
      - { text: "Jedna ulica albo żadnej", why: "Za ostrożnie: top para z najlepszym kickerem na suchym flopie bije wiele rąk rywala. Zwykle zniesie dwie ulice wartości." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Masz środkową parę. Ile ulic wartości zniesie ta ręka?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Jedną albo żadnej: często wystarczy dojść do showdownu", correct: true, why: "Tak: środkowa para wygrywa z blefami i słabszymi parami, ale gorszych rąk, które zapłacą kilka zakładów, jest niewiele. Plan: najwyżej jeden mały zakład albo czekanie i sprawdzanie." }
      - { text: "Dwie, jak top para", why: "Środkowa para przegrywa z każdym królem. Po drugim zakładzie płacą głównie ręce, które ją biją." }
      - { text: "Trzy, żeby rywal nie dobrał", why: "Trzy zakłady środkową parą płacą głównie lepszym rękom: gorsze ręce pasują już po pierwszym albo drugim zakładzie." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Masz top parę z najlepszym kickerem. Ręka zniesie dwie ulice wartości. Jaki plan?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Dwa zakłady po ok. {{n:geo.4bet.2}} puli: na turnie wchodzi cały stack", correct: true, why: "Tak: przy SPR ok. {{n:spr.4bet}} dwie ulice wystarczą, żeby wpłacić cały stack. Dwie ulice wartości top pary to tu gra o cały stack." }
      - { text: "Mały zakład i pas na all-in", why: "Przy SPR ok. {{n:spr.4bet}} pas na all-in top parą z asem oddaje za dużo: wystarcza ci ok. {{n:eq.jam.4bet}} equity, a po własnym zakładzie jeszcze mniej." }
      - { text: "Czekam na każdej ulicy, żeby kontrolować pulę", why: "Kontrola puli ma sens przy wysokim SPR. Tu pula jest już duża względem stacku, a gorsze ręce (AQ, QQ, JJ) chętnie wpłacą resztę." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Pula 3-betowana, masz pozycję, SPR ok. {{n:spr.3bet-ip}}. Masz seta, chcesz wpłacić cały stack do rivera. Jaka linia?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Zakład na flopie, turnie i riverze, za każdym razem ok. {{n:geo.3bet-ip.3}} puli", correct: true, why: "Tak: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} i {{n:geo.3bet-ip.river}} dają razem {{n:geo.3bet-ip.total}}, czyli cały stack. Rywal na każdej ulicy płaci rozsądną część puli." }
      - { text: "Zakład 1/3 puli na każdej ulicy", sizeError: true, why: "Dobra linia, zły rozmiar: trzy zakłady po 1/3 puli wpłacą tylko ok. {{n:g3b.third.total}} z {{n:spr.3bet-ip.stack}}. Plan na cały stack wymaga ok. {{n:geo.3bet-ip.3}} puli." }
      - { text: "Czekam na flopie i turnie, na riverze all-in", why: "Na riverze all-in za cały stack byłby zakładem kilka razy większym niż pula. Rywal zapłaci go tylko bardzo silną ręką, a gorsze ręce, które zapłaciłyby trzy mniejsze zakłady, spasują." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Dlaczego plan na trzy ulice warto ustalić już na flopie?"
    options:
      - { text: "Bo rozmiar na flopie decyduje, ile da się wpłacić później", correct: true, why: "Tak: pula rośnie mnożeniem. Mały zakład na flopie zostawia małą pulę na turnie i riverze, więc później trudno wpłacić cały stack bez bardzo dużych zakładów." }
      - { text: "Bo później nie wolno zmieniać planu", why: "Plan zmieniasz, gdy zmienia się sytuacja (np. groźna karta na turnie). Chodzi o to, żeby pierwszy zakład pasował do celu: ile ulic wartości i czy cały stack." }
      - { text: "Bo rywal widzi twój plan", why: "Rywal nie zna twojego planu. Plan pomaga tobie dobrać rozmiar, żeby na koniec w puli było tyle, ile ręka zniesie." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "Pula z jednym podbiciem, SPR ok. {{n:spr.srp}}. Masz top parę z dobrym kickerem. Czy betujesz rozmiarem geometrycznym ok. {{n:geo.srp.3}} puli?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Nie: to rozmiar na cały stack, a ta ręka zwykle zniesie dwie ulice", correct: true, why: "Tak: rozmiar geometryczny służy wpłaceniu całego stacku. Przy zakładach większych niż pula gorsze ręce przestają płacić, a zostają ręce lepsze od jednej pary." }
      - { text: "Tak: zawsze betuję geometrycznie", why: "Rozmiar geometryczny pasuje do planu na cały stack. Top para przy SPR ok. {{n:spr.srp}} zwykle nie ma takiego planu." }
      - { text: "Nie: z top parą zawsze czekam", why: "Top para chce zakładów na wartość, tylko mniejszych i zwykle na dwie ulice, a nie na cały stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "SPR {{n:spr.commit}}: w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz ok. {{n:geo.spr2.2}} puli na flopie i na turnie, rywal sprawdza. Co z resztą stacku?"
    options:
      - { text: "Po turnie cały stack jest w puli", correct: true, why: "Tak: {{n:geo.spr2.flop}} na flopie i {{n:geo.spr2.turn}} na turnie to razem {{n:geo.spr2.total}}. Dlatego przy SPR {{n:spr.commit}} dwie ulice wartości top pary wystarczą na grę o cały stack." }
      - { text: "Zostaje mniej więcej połowa na river", why: "Pula rośnie mnożeniem: po flopie jest w niej ok. {{n:geo.spr2.flop-after}}, a zakład ok. {{n:geo.spr2.2}} na turnie to ok. {{n:geo.spr2.turn}}, czyli reszta stacku." }
      - { text: "Zostaje prawie cały stack", why: "Przy SPR {{n:spr.commit}} stack to tylko {{n:spr.commit}} pule. Dwa zakłady po ok. {{n:geo.spr2.2}} puli wpłacają całe {{n:geo.spr2.total}}." }
---
Dobry plan zaczyna się na flopie, zanim postawisz pierwszy zakład. Pytasz: ile ulic wartości zniesie moja ręka i czy chcę grać o cały stack? Odpowiedź łączy siłę ręki z SPR.

## Ile ulic wartości

Z każdą ulicą gorsze ręce rywala pasują, a w puli zostają głównie ręce lepsze od twojej. Dlatego silniejsza ręka zniesie więcej zakładów:

| Ręka | Ulice wartości (zwykle) |
|---|---|
| Bardzo silna: set, strit, wysokie dwie pary | Trzy |
| Top para z dobrym kickerem, overpara | Dwie |
| Słabsza para (środkowa, niska) | Jedna albo żadnej |

To heurystyka: dużo zależy od tekstury stołu, kart na turnie i riverze oraz od rywala.

## Połącz rękę z SPR

- **Ręka na trzy ulice i chcesz cały stack:** betujesz rozmiarem geometrycznym od flopu (w puli 3-betowanej z pozycją ok. {{n:geo.3bet-ip.3}} puli).
- **Ręka na dwie ulice przy niskim SPR:** przy SPR ok. {{n:spr.commit}} dwa zakłady po ok. {{n:geo.spr2.2}} puli to już cały stack, więc grasz o stack.
- **Ręka na dwie ulice przy wysokim SPR:** w puli z jednym podbiciem (SPR ok. {{n:spr.srp}}) betujesz na wartość, ale nie planujesz całego stacku.

## Linie

Linia to plan akcji na kolejnych ulicach. Kilka podstawowych:

- **zakład, zakład, zakład:** ręka na trzy ulice wartości,
- **zakład, zakład, czekanie:** ręka na dwie ulice, na riverze dochodzisz do showdownu,
- **zakład albo czekanie, potem czekanie i sprawdzanie:** słabsza para, która chce dojść do showdownu tanio.

## Rozmiar na flopie ustala resztę

Pula rośnie mnożeniem, więc mały zakład na flopie zostawia małą pulę na kolejne ulice. W puli 3-betowanej trzy zakłady po 1/3 puli wpłacają tylko ok. {{n:g3b.third.total}} ze stacku {{n:spr.3bet-ip.stack}}, a trzy zakłady po ok. {{n:geo.3bet-ip.3}} puli cały stack.

:::note Plan to nie wyrok
Na turnie i riverze plan sprawdzasz na nowo: groźna karta może zmniejszyć liczbę ulic wartości. Jak grać turn i river, uczą osobne moduły. Liczba ulic wartości dla klas rąk pochodzi z artykułów znanych tylko ze streszczeń, dlatego jest oznaczona jako heurystyka do weryfikacji.
:::
