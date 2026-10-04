---
id: m1.l1
module: m1
order: 1
title: "Przebieg rozdania"
sub: "Blindy, ulice i dostępne ruchy"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "Jest flop, nikt przed tobą nie {{t:bet|postawił}}. Co możesz zrobić?"
    options:
      - { text: "{{t:check|Czekać}} albo {{t:bet|postawić}}", correct: true, why: "Bez {{t:bet|zakładu}} przed tobą masz dwie opcje: dać przejść za darmo albo samemu {{t:bet|postawić}}." }
      - { text: "{{t:call|Sprawdzić}}", why: "Nie ma czego {{t:call|sprawdzać}}, bo nikt nic nie {{t:bet|postawił}}." }
      - { text: "{{t:raise|Przebić}}", why: "{{t:raise|Przebić}} można tylko czyjś {{t:bet}}. Pierwszy {{t:bet}} w rundzie to bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Ile {{t:community-cards|kart wspólnych}} pojawia się na flopie?"
    options:
      - { text: "3", correct: true, why: "Flop to trzy karty naraz. Potem turn i river dokładają po jednej." }
      - { text: "1", why: "Po jednej karcie wychodzą turn i river." }
      - { text: "5", why: "Pięć {{t:community-cards|kart wspólnych}} jest dopiero na riverze." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Przeciwnik {{t:bet|postawił}} 20 {{t:chips|żetonów}}. Masz słabą rękę i nie chcesz grać dalej. Co robisz?"
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Gdy jest {{t:bet}}, a nie chcesz płacić, {{t:fold|pasujesz}}. Tracisz tylko to, co już wpłaciłeś." }
      - { text: "{{t:check|Czekam}}", why: "Check nie jest możliwy, gdy jest {{t:bet}} do {{t:call|sprawdzenia}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "{{t:call|Sprawdzenie}} kosztuje 20 {{t:chips|żetonów}}. Skoro nie chcesz grać, to strata." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Która {{t:betting-round}} jest ostatnia?"
    options:
      - { text: "River", correct: true, why: "River to piąta {{t:community-cards|karta wspólna}}. Jeśli po licytacji na riverze zostało co najmniej dwóch graczy, odkrywają karty (showdown)." }
      - { text: "Turn", why: "Turn to czwarta karta. Po nim jest jeszcze river." }
      - { text: "Flop", why: "Flop to pierwsza runda z {{t:community-cards|kartami wspólnymi}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Jesteś na {{t:big-blind|dużym blindzie}}, wszyscy {{t:fold|spasowali}}, {{t:small-blind}} tylko dopłacił. Masz słabą rękę. Co robisz?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Twój {{t:big-blind}} liczy się jak {{t:bet}}, a {{t:small-blind}} tylko go wyrównał. Nikt nie {{t:raise|przebił}}, więc flop zobaczysz za darmo. Słaba ręka nie jest powodem do pasowania, gdy nic nie kosztuje." }
      - { text: "{{t:fold|Pasuję}}", why: "{{t:fold|Pas}}, gdy możesz {{t:check|czekać}} za darmo, to czysta strata." }
      - { text: "{{t:raise|Przebijam}}", why: "Z 7-2 nie masz czego budować; {{t:check}} daje darmowy flop." }
---
Każde rozdanie ma stałą kolejność. Najpierw dwóch graczy wpłaca obowiązkowe stawki, czyli **blindy**: {{t:small-blind}} i {{t:big-blind}}. Dzięki temu w {{t:pot|puli}} zawsze jest o co grać.

Przed flopem {{t:big-blind}} liczy się jak {{t:bet}}: kto chce grać, musi go co najmniej {{t:call|sprawdzić}}. {{t:big-blind|Duży blind}} mówi przed flopem ostatni. Jeśli nikt nie {{t:raise|przebił}}, może {{t:check|czekać}} i zobaczyć flop bez dopłaty.

## Cztery {{t:betting-round|rundy licytacji}}

1. **Preflop**: masz tylko swoje 2 karty.
2. **Flop**: na {{t:board}} trafiają 3 {{t:community-cards}}.
3. **Turn**: czwarta karta.
4. **River**: piąta, ostatnia karta.

Jeśli po licytacji na riverze w grze zostało co najmniej dwóch graczy, odkrywają karty. To **showdown**: najlepszy układ wygrywa {{t:pot|pulę}}. Gdy wszyscy poza jednym {{t:fold|spasują}} wcześniej, ten jeden wygrywa {{t:pot|pulę}} bez pokazywania kart.

## Dostępne ruchy

- **{{t:check|Czekam}}**: nic nie wpłacasz. Tylko gdy w tej rundzie nikt przed tobą jeszcze nic nie wpłacił.
- **{{t:bet|Stawiam}}**: pierwszy {{t:bet}} w rundzie. We wzorach w dalszych lekcjach piszemy krótko „bet”.
- **{{t:call|Sprawdzam}}**: dorównujesz do {{t:bet|zakładu}} przeciwnika.
- **{{t:raise|Przebijam}}**: podnosisz cudzy {{t:bet}}.
- **{{t:fold|Pasuję}}**: wyrzucasz karty i tracisz to, co już wpłaciłeś.

:::note Do zapamiętania
Jeśli ktoś {{t:bet|postawił}}, możesz {{t:fold|pasować}}, {{t:call|sprawdzić}} albo {{t:raise|przebić}}. Jeśli nikt nie {{t:bet|postawił}}, możesz {{t:check|czekać}} albo {{t:bet|postawić}}.
:::

:::note All-in i {{t:side-pot}}
Nie możesz {{t:bet|postawić}} więcej, niż masz przed sobą. Gdy wpłacasz wszystkie {{t:chips}}, jesteś **all-in**: dalej już nie licytujesz, a pozostałe {{t:community-cards}} wychodzą do końca. Od każdego rywala możesz wygrać najwyżej tyle, ile sam wpłaciłeś. Jeśli inni grają dalej o więcej, nadwyżka trafia do **{{t:side-pot|puli bocznej}}** (side pot), o którą walczą tylko oni.
:::
