---
id: m11.l3
module: m11
order: 3
title: "ICM i bubble factor"
sub: "Żetony to nie pieniądze"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Zostało trzech graczy, płatne są dwa miejsca. Stacki: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} i {{n:m11.icm.a.s3}} żetonów. Jaka jest według ICM szansa najkrótszego stacku na 1. miejsce? Wpisz liczbę w procentach."
    answer: m11.icm.a.chips3
    explanation: "Szansa na 1. miejsce = stack ÷ wszystkie żetony = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Ten sam stół ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Duży stack zajął 1. miejsce. Jaka jest teraz szansa najkrótszego stacku na 2. miejsce?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Zostali dwaj gracze z {{n:m11.icm.a.rest1}} żetonów, z czego krótki ma {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "To szansa na 1. miejsce, liczona ze wszystkich żetonów. Gdy zwycięzca odpada z liczenia, dzielisz tylko przez żetony pozostałych: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "To łączna szansa krótkiego stacku na 2. miejsce, po obu możliwych zwycięzcach. Pytanie dotyczy sytuacji, gdy wygrał duży stack." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Wypłaty: {{n:m11.icm.a.p1}} puli nagród za 1. miejsce i {{n:m11.icm.a.p2}} za 2. Stacki {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Ile według ICM jest wart najkrótszy stack (w procentach puli nagród)? Wpisz liczbę."
    answer: m11.icm.a.eq3
    explanation: "Szansa na 1. miejsce {{n:m11.icm.a.chips3}}, na 2. miejsce {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} = {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} = {{n:m11.icm.a.eq3}}, więcej niż jego {{n:m11.icm.a.chips3}} żetonów."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Duży stack ma {{n:m11.icm.a.chips1}} żetonów w grze. Ile według ICM jest wart w pieniądzach?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, czyli mniej niż udział w żetonach", correct: true, why: "Duży stack może wygrać najwyżej {{n:m11.icm.a.p1}} puli nagród, choć ma szansę na wszystkie żetony. Dlatego żetony lidera są warte mniej niż ich udział, a krótkiego stacku więcej ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, tyle co udział w żetonach", why: "Tak byłoby, gdyby zwycięzca brał całą pulę nagród. Przy wypłatach {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} każdy żeton dużego stacku jest wart mniej: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, bo prawie na pewno wygra", why: "Ma tylko {{n:m11.icm.a.chips1}} szans na 1. miejsce, a resztę puli dostaje za 2. miejsce. Razem {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Bańka: czterech graczy, płatne trzy miejsca. Sprawdzając all-in, tracisz przy przegranej {{n:m11.bf.loss}} puli nagród, a przy wygranej zyskujesz {{n:m11.bf.gain}}. Ile wynosi bubble factor? Wpisz liczbę z dwoma miejscami po przecinku."
    answer: m11.bf.value
    explanation: "Bubble factor = strata ÷ zysk = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Przegrana boli prawie półtora raza bardziej, niż wygrana pomaga."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Bubble factor wynosi {{n:m11.bf.value}}. Ile equity potrzebujesz, żeby sprawdzenie all-inu się opłacało? Wpisz liczbę w procentach."
    answer: m11.bf.req
    explanation: "Potrzebne equity = BF ÷ (BF + 1), czyli strata ÷ (strata + zysk) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. W grze o żetony wystarczyłoby {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "W grze o żetony do sprawdzenia tego all-inu wystarczy {{n:m11.bf.req-chips}} equity, a według ICM potrzebujesz {{n:m11.bf.req}}. Jak nazywa się różnica?"
    options:
      - { text: "Premia za ryzyko ({{n:m11.bf.premium}})", correct: true, why: "Premia za ryzyko to dodatkowe equity, którego wymaga ICM ponad cenę w żetonach: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Bubble factor to stosunek straty do zysku ({{n:m11.bf.value}}). Z niego liczysz potrzebne equity, a różnica wobec gry o żetony to premia za ryzyko." }
      - { text: "Fold equity", why: "Fold equity to zysk z pasów rywala. Przy sprawdzaniu all-inu go nie masz." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "Bańka, przykład z lekcji. Twoja ręka ma ok. {{n:m11.bf.example-eq}} equity wobec zakresu all-inu rywala. W grze o żetony sprawdzenie by się opłacało, bo wystarcza {{n:m11.bf.req-chips}}. Co robisz tutaj?"
    options:
      - { text: "Pasuję", correct: true, why: "Według ICM potrzebujesz tu {{n:m11.bf.req}} equity. Ręka, która wygrywa rzadziej, traci pieniądze, choć w żetonach byłaby na plusie." }
      - { text: "Sprawdzam, bo w żetonach to zysk", why: "W turnieju z wypłatami liczą się pieniądze, nie żetony. Przegrana kosztuje cię {{n:m11.bf.loss}} puli nagród, a wygrana daje tylko {{n:m11.bf.gain}}." }
      - { text: "Sprawdzam, bo powyżej połowy wygrywam", why: "Ręka z {{n:m11.bf.example-eq}} wygrywa częściej niż połowę, a i tak jest tu za słaba: próg to {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "Bańka turnieju. Masz największy stack przy stole i przykrywasz wszystkich. Średni stack pasuje do ciebie bardzo często. Co z tego wynika?"
    options:
      - { text: "Możesz wpychać szerzej, bo rywale sprawdzają ciasno", correct: true, why: "Średni stack ryzykuje przy sprawdzeniu odpadnięcie tuż przed nagrodami, więc potrzebuje dużo equity. Ty przy przegranej tracisz tylko część stacku. Rywale sprawdzają ciasno, więc częściej zgarniasz pulę bez walki." }
      - { text: "Grasz ciaśniej, żeby nie stracić prowadzenia", why: "Lider ma najmniejsze ryzyko przy stole. Granie ciasno oddaje mu jego główną przewagę: presję na średnie stacki." }
      - { text: "Nic, bo ICM dotyczy tylko krótkich stacków", why: "ICM dotyczy wszystkich: zmienia, ile equity każdy potrzebuje do sprawdzenia, a to zależy od całego rozkładu stacków." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "Co zakłada model ICM Malmutha-Harville'a?"
    options:
      - { text: "Że wszyscy grają równie dobrze, a o miejscach decydują tylko stacki", correct: true, why: "ICM przelicza same stacki na szanse zajęcia miejsc. Nie zna pozycji, rosnących blindów ani przewagi umiejętności." }
      - { text: "Że lepszy gracz częściej wygrywa", why: "Odwrotnie: ICM zakłada równe umiejętności. Przewagi gracza w ogóle nie uwzględnia." }
      - { text: "Że gracz na dużym blindzie ma mniejsze szanse", why: "ICM nie zna pozycji ani blindów: patrzy tylko na stacki. To jedno z jego ograniczeń." }
---
W grze o pieniądze (cash) żeton to pieniądz: wygrany i przegrany są warte tyle samo. W turnieju tak nie jest. Nagrody dostaje kilka pierwszych miejsc, a zwycięzca nie zabiera całej puli nagród, choć zabiera wszystkie żetony. Dlatego żetony trzeba przeliczać na pieniądze.

## ICM: stack w pieniądzach

Model niezależnych żetonów (ICM, model Malmutha-Harville'a) przelicza stacki na szanse zajęcia każdego miejsca. Zakłada, że wszyscy grają równie dobrze, więc o kolejności decydują tylko stacki.

```formula
szansa na 1. miejsce = twój stack ÷ wszystkie żetony
```

Szansę na 2. miejsce liczysz tak samo, ale osobno dla każdego możliwego zwycięzcy: odejmujesz jego żetony i dzielisz przez to, co zostało. Equity stacku to suma: szansa na miejsce × wypłata za miejsce.

## Przykład: trzech graczy na bańce

Płatne są dwa miejsca: {{n:m11.icm.a.p1}} i {{n:m11.icm.a.p2}} puli nagród. Stacki: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} i {{n:m11.icm.a.s3}} żetonów.

- Krótki stack wygrywa turniej z szansą {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Na 2. miejsce: gdy wygra duży stack ({{n:m11.icm.a.chips1}}), krótki jest drugi z szansą {{n:m11.icm.a.second3.via1}}; gdy wygra średni ({{n:m11.icm.a.chips2}}), z szansą {{n:m11.icm.a.second3.via2}}. Razem {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} = **{{n:m11.icm.a.second3}}**.
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} = **{{n:m11.icm.a.eq3}}** puli nagród.

| Stack | Udział w żetonach | Equity według ICM |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

Krótki stack jest wart więcej niż jego żetony, a duży mniej: lider nie dostanie więcej niż nagrodę za 1. miejsce.

## Bubble factor: przegrana boli bardziej

Czterech graczy, płatne trzy miejsca: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} i {{n:m11.bf.p3}}. Stacki {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (ty), {{n:m11.bf.s3}} i {{n:m11.bf.s4}}. Gracz z {{n:m11.bf.s3}} wchodzi all-in, ty go przykrywasz. Dla prostoty pomijamy blindy w puli.

- Teraz twój stack jest wart {{n:m11.bf.eq.now}} puli nagród.
- Wygrasz: masz {{n:m11.bf.win}}, rywal odpada, wszyscy są w nagrodach. Twoje equity rośnie do {{n:m11.bf.eq.win}}, czyli o **{{n:m11.bf.gain}}**.
- Przegrasz: zostaje ci {{n:m11.bf.lose}}, a equity spada do {{n:m11.bf.eq.lose}}, czyli o **{{n:m11.bf.loss}}**.

```formula
bubble factor = strata przy przegranej ÷ zysk przy wygranej
```

Tu {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. Z niego wynika potrzebne equity:

```formula
potrzebne equity = BF ÷ (BF + 1)
```

Wychodzi **{{n:m11.bf.req}}**. W grze o żetony ryzykujesz {{n:m11.bf.s3}}, żeby wygrać {{n:m11.bf.s3}}, więc wystarczyłoby {{n:m11.bf.req-chips}}. Różnica, {{n:m11.bf.premium}}, to **premia za ryzyko**.

Ten sam kierunek widać w opublikowanej równowadze dla trzech graczy z równymi stackami (Ganzfried i Sandholm, 2008): gdy Button i mały blind są już all-in, duży blind w pojedynczym rozdaniu sprawdza {{n:m11.gs.overcall.single}} rąk, a w turnieju z wypłatami tylko {{n:m11.gs.overcall.tourn}}, czyli same najwyższe pary i AKs.

:::note Kto sprawdza ciasno
Średni stack na bańce sprawdza all-iny dużo ciaśniej niż w grze o żetony. Duży stack, który przykrywa rywali, ryzykuje mniej i może na tym grać: wpychać szerzej, bo rywale muszą pasować. Bubble factor zależy od wszystkich stacków przy stole, dlatego nie liczy się go przy stole, tylko ćwiczy na przykładach, żeby wyrobić wyczucie.
:::

## Ograniczenia ICM

ICM nie zna pozycji, rosnących blindów ani umiejętności graczy. To dobre przybliżenie do decyzji o all-inie, ale nie dokładna wycena turnieju.
