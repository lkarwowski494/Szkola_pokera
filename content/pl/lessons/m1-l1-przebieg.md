---
id: m1.l1
module: m1
order: 1
title: "Przebieg rozdania"
sub: "Blindy, ulice i dostępne ruchy"
rules: [R-M1-001, R-M1-002, R-M1-003]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "Jest flop, nikt przed tobą nie postawił. Co możesz zrobić?"
    options:
      - { text: "Czekać (check) albo postawić (bet)", correct: true, why: "Bez zakładu przed tobą masz dwie opcje: dać przejść za darmo albo samemu postawić." }
      - { text: "Sprawdzić (call)", why: "Nie ma czego sprawdzać, bo nikt nic nie postawił." }
      - { text: "Przebić (raise)", why: "Przebić można tylko czyjś zakład. Pierwszy zakład w rundzie to bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    prompt: "Ile kart wspólnych pojawia się na flopie?"
    options:
      - { text: "3", correct: true, why: "Flop to trzy karty naraz. Potem turn i river dokładają po jednej." }
      - { text: "1", why: "Po jednej karcie wychodzą turn i river." }
      - { text: "5", why: "Pięć kart wspólnych jest dopiero na riverze." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Przeciwnik postawił 20 żetonów. Masz słabą rękę i nie chcesz grać dalej. Co robisz?"
    options:
      - { text: "Pasuję (fold)", correct: true, why: "Gdy jest zakład, a nie chcesz płacić, pasujesz. Tracisz tylko to, co już wpłaciłeś." }
      - { text: "Czekam (check)", why: "Check nie jest możliwy, gdy jest zakład do sprawdzenia." }
      - { text: "Sprawdzam (call)", why: "Sprawdzenie kosztuje 20 żetonów. Skoro nie chcesz grać, to strata." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    prompt: "Która runda licytacji jest ostatnia?"
    options:
      - { text: "River", correct: true, why: "River to piąta karta wspólna. Po licytacji na riverze gracze odkrywają karty." }
      - { text: "Turn", why: "Turn to czwarta karta. Po nim jest jeszcze river." }
      - { text: "Flop", why: "Flop to pierwsza runda z kartami wspólnymi." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Jesteś na dużym blindzie, wszyscy spasowali, mały blind tylko dopłacił. Masz słabą rękę. Co robisz?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "Czekam (check)", correct: true, why: "Nikt nie przebił, więc flop zobaczysz za darmo. Słaba ręka nie jest powodem do pasowania, gdy nic nie kosztuje." }
      - { text: "Pasuję", why: "Pas, gdy możesz czekać za darmo, to czysta strata." }
      - { text: "Przebijam", why: "Z najgorszą ręką i bez pozycji po flopie nie ma po co." }
---
Każde rozdanie ma stałą kolejność. Najpierw dwóch graczy wpłaca obowiązkowe stawki, czyli **blindy**: mały blind (SB) i duży blind (BB). Dzięki temu w puli zawsze jest o co grać.

## Cztery rundy licytacji

1. **Preflop**: masz tylko swoje 2 karty.
2. **Flop**: na stół trafiają 3 karty wspólne.
3. **Turn**: czwarta karta.
4. **River**: piąta, ostatnia karta.

## Dostępne ruchy

- **Check (czekam)**: nic nie stawiasz. Tylko gdy nikt przed tobą nie postawił.
- **Bet (stawiam)**: pierwszy zakład w rundzie.
- **Call (sprawdzam)**: dorównujesz do zakładu przeciwnika.
- **Raise (przebijam)**: podnosisz cudzy zakład.
- **Fold (pasuję)**: wyrzucasz karty i tracisz to, co już wpłaciłeś.

:::note Do zapamiętania
Jeśli ktoś postawił, możesz pasować, sprawdzić albo przebić. Jeśli nikt nie postawił, możesz czekać albo postawić.
:::
