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
    prompt: "Zostało trzech graczy, płatne są dwa miejsca. Stacki: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} i {{n:m11.icm.a.s3}} {{t:chips|żetonów}}. Jaka jest według {{t:icm}} szansa najkrótszego stacku na 1. miejsce? Wpisz liczbę w procentach."
    answer: m11.icm.a.chips3
    explanation: "Szansa na 1. miejsce = stack ÷ wszystkie {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Ten sam {{t:board}} ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Duży stack zajął 1. miejsce. Jaka jest teraz szansa najkrótszego stacku na 2. miejsce?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Zostali dwaj gracze z {{n:m11.icm.a.rest1}} {{t:chips|żetonów}}, z czego krótki ma {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "To szansa na 1. miejsce, liczona ze wszystkich {{t:chips|żetonów}}. Gdy zwycięzca odpada z liczenia, dzielisz tylko przez {{t:chips}} pozostałych: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "To łączna szansa {{t:short-stack|krótkiego stacku}} na 2. miejsce, po obu możliwych zwycięzcach. Pytanie dotyczy sytuacji, gdy wygrał duży stack." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Wypłaty}}: {{n:m11.icm.a.p1}} {{t:prize-pool|puli nagród}} za 1. miejsce i {{n:m11.icm.a.p2}} za 2. Stacki {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Ile według {{t:icm}} jest wart najkrótszy stack (w procentach {{t:prize-pool|puli nagród}})? Wpisz liczbę."
    answer: m11.icm.a.eq3
    explanation: "Szansa na 1. miejsce {{n:m11.icm.a.chips3}}, na 2. miejsce {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} = {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} = {{n:m11.icm.a.eq3}}, więcej niż jego {{n:m11.icm.a.chips3}} {{t:chips|żetonów}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Duży stack ma {{n:m11.icm.a.chips1}} {{t:chips|żetonów}} w grze. Ile według {{t:icm}} jest wart w pieniądzach?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, czyli mniej niż udział w {{t:chips|żetonach}}", correct: true, why: "Duży stack może wygrać najwyżej {{n:m11.icm.a.p1}} {{t:prize-pool|puli nagród}}, choć ma szansę na wszystkie {{t:chips}}. Dlatego {{t:chips}} lidera są warte mniej niż ich udział, a {{t:short-stack|krótkiego stacku}} więcej ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, tyle co udział w {{t:chips|żetonach}}", why: "Tak byłoby, gdyby zwycięzca brał całą {{t:prize-pool|pulę nagród}}. Przy {{t:payout|wypłatach}} {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} każdy {{t:chips|żeton}} dużego stacku jest wart mniej: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, bo prawie na pewno wygra", why: "Ma tylko {{n:m11.icm.a.chips1}} szans na 1. miejsce, a resztę {{t:pot|puli}} dostaje za 2. miejsce. Razem {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bańka}}: czterech graczy, płatne trzy miejsca. {{t:call|Sprawdzając}} all-in, tracisz przy przegranej {{n:m11.bf.loss}} {{t:prize-pool|puli nagród}}, a przy wygranej zyskujesz {{n:m11.bf.gain}}. Ile wynosi bubble factor? Wpisz liczbę z dwoma miejscami po przecinku."
    answer: m11.bf.value
    explanation: "Bubble factor = strata ÷ zysk = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Przegrana boli prawie półtora raza bardziej, niż wygrana pomaga."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Bubble factor wynosi {{n:m11.bf.value}}. Ile equity potrzebujesz, żeby {{t:call}} all-inu się opłacało? Wpisz liczbę w procentach."
    answer: m11.bf.req
    explanation: "Potrzebne equity = BF ÷ (BF + 1), czyli strata ÷ (strata + zysk) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. W grze o {{t:chips}} wystarczyłoby {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "W grze o {{t:chips}} do {{t:call|sprawdzenia}} tego all-inu wystarczy {{n:m11.bf.req-chips}} equity, a według {{t:icm}} potrzebujesz {{n:m11.bf.req}}. Jak nazywa się różnica?"
    options:
      - { text: "{{t:risk-premium|Premia za ryzyko}} ({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|Premia za ryzyko}} to dodatkowe equity, którego wymaga {{t:icm}} ponad cenę w {{t:chips|żetonach}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Bubble factor to stosunek straty do zysku ({{n:m11.bf.value}}). Z niego liczysz potrzebne equity, a różnica wobec gry o {{t:chips}} to {{t:risk-premium}}." }
      - { text: "Fold equity", why: "Fold equity to zysk z {{t:fold|pasów}} rywala. Przy {{t:call|sprawdzaniu}} all-inu go nie masz." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bańka}}, przykład z lekcji. Twoja ręka ma ok. {{n:m11.bf.example-eq}} equity wobec {{t:range|zakresu}} all-inu rywala. W grze o {{t:chips}} {{t:call}} by się opłacało, bo wystarcza {{n:m11.bf.req-chips}}. Co robisz tutaj?"
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Według {{t:icm}} potrzebujesz tu {{n:m11.bf.req}} equity. Ręka, która wygrywa rzadziej, traci pieniądze, choć w {{t:chips|żetonach}} byłaby na plusie." }
      - { text: "{{t:call|Sprawdzam}}, bo w {{t:chips|żetonach}} to zysk", why: "W {{t:tournament|turnieju}} z {{t:payout|wypłatami}} liczą się pieniądze, nie {{t:chips}}. Przegrana kosztuje cię {{n:m11.bf.loss}} {{t:prize-pool|puli nagród}}, a wygrana daje tylko {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Sprawdzam}}, bo powyżej połowy wygrywam", why: "Ręka z {{n:m11.bf.example-eq}} wygrywa częściej niż połowę, a i tak jest tu za słaba: próg to {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bańka}} {{t:tournament|turnieju}}. Masz największy stack przy stole i {{t:cover|przykrywasz}} wszystkich. Średni stack pasuje do ciebie bardzo często. Co z tego wynika?"
    options:
      - { text: "Możesz {{t:shove|wpychać}} szerzej, bo rywale {{t:call|sprawdzają}} ciasno", correct: true, why: "Średni stack ryzykuje przy {{t:call|sprawdzeniu}} odpadnięcie tuż przed nagrodami, więc potrzebuje dużo equity. Ty przy przegranej tracisz tylko część stacku. Rywale {{t:call|sprawdzają}} ciasno, więc częściej zgarniasz {{t:pot|pulę}} bez walki." }
      - { text: "Grasz ciaśniej, żeby nie stracić prowadzenia", why: "Lider ma najmniejsze ryzyko przy stole. Granie ciasno oddaje mu jego główną przewagę: presję na średnie stacki." }
      - { text: "Nic, bo {{t:icm}} dotyczy tylko {{t:short-stack|krótkich stacków}}", why: "{{t:icm}} dotyczy wszystkich: zmienia, ile equity każdy potrzebuje do {{t:call|sprawdzenia}}, a to zależy od całego rozkładu stacków." }
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
    prompt: "Co zakłada model {{t:icm}} Malmutha-Harville'a?"
    options:
      - { text: "Że wszyscy grają równie dobrze, a o miejscach decydują tylko stacki", correct: true, why: "{{t:icm}} przelicza same stacki na szanse zajęcia miejsc. Nie zna {{t:position|pozycji}}, rosnących blindów ani przewagi umiejętności." }
      - { text: "Że lepszy gracz częściej wygrywa", why: "Odwrotnie: {{t:icm}} zakłada równe umiejętności. Przewagi gracza w ogóle nie uwzględnia." }
      - { text: "Że gracz na {{t:big-blind|dużym blindzie}} ma mniejsze szanse", why: "{{t:icm}} nie zna {{t:position|pozycji}} ani blindów: patrzy tylko na stacki. To jedno z jego ograniczeń." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
W grze o pieniądze (cash) {{t:chips|żeton}} to pieniądz: wygrany i przegrany są warte tyle samo. W {{t:tournament|turnieju}} tak nie jest. Nagrody dostaje kilka pierwszych miejsc, a zwycięzca nie zabiera całej {{t:prize-pool|puli nagród}}, choć zabiera wszystkie {{t:chips}}. Dlatego {{t:chips}} trzeba przeliczać na pieniądze.

## {{t:icm}}: stack w pieniądzach

Model niezależnych {{t:chips|żetonów}} ({{t:icm}}, model Malmutha-Harville'a) przelicza stacki na szanse zajęcia każdego miejsca. Zakłada, że wszyscy grają równie dobrze, więc o kolejności decydują tylko stacki.

```formula
szansa na 1. miejsce = twój stack ÷ wszystkie żetony
```

Szansę na 2. miejsce liczysz tak samo, ale osobno dla każdego możliwego zwycięzcy: odejmujesz jego {{t:chips}} i dzielisz przez to, co zostało. {{t:tournament-equity|Equity turniejowe}} stacku, czyli jego oczekiwany udział w {{t:prize-pool|puli nagród}}, to suma: szansa na miejsce × {{t:payout}} za miejsce.

## Przykład: trzech graczy na {{t:bubble|bańce}}

Płatne są dwa miejsca: {{n:m11.icm.a.p1}} i {{n:m11.icm.a.p2}} {{t:prize-pool|puli nagród}}. Stacki: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} i {{n:m11.icm.a.s3}} {{t:chips|żetonów}}.

- {{t:short-stack|Krótki stack}} wygrywa {{t:tournament}} z szansą {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Na 2. miejsce: gdy wygra duży stack ({{n:m11.icm.a.chips1}}), krótki jest drugi z szansą {{n:m11.icm.a.second3.via1}}; gdy wygra średni ({{n:m11.icm.a.chips2}}), z szansą {{n:m11.icm.a.second3.via2}}. Razem {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} = **{{n:m11.icm.a.second3}}**.
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} = **{{n:m11.icm.a.eq3}}** {{t:prize-pool|puli nagród}}.

| Stack | Udział w {{t:chips|żetonach}} | Equity według {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

{{t:short-stack|Krótki stack}} jest wart więcej niż jego {{t:chips}}, a duży mniej: lider nie dostanie więcej niż nagrodę za 1. miejsce.

## Bubble factor: przegrana boli bardziej

Czterech graczy, płatne trzy miejsca: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} i {{n:m11.bf.p3}}. Stacki {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (ty), {{n:m11.bf.s3}} i {{n:m11.bf.s4}}. Gracz z {{n:m11.bf.s3}} wchodzi all-in, ty go {{t:cover|przykrywasz}}. Dla prostoty pomijamy blindy w {{t:pot|puli}}.

- Teraz twój stack jest wart {{n:m11.bf.eq.now}} {{t:prize-pool|puli nagród}}.
- Wygrasz: masz {{n:m11.bf.win}}, rywal odpada, wszyscy są w nagrodach. Twoje equity rośnie do {{n:m11.bf.eq.win}}, czyli o **{{n:m11.bf.gain}}**.
- Przegrasz: zostaje ci {{n:m11.bf.lose}}, a equity spada do {{n:m11.bf.eq.lose}}, czyli o **{{n:m11.bf.loss}}**.

```formula
bubble factor = strata przy przegranej ÷ zysk przy wygranej
```

Tu {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. Z niego wynika potrzebne equity:

```formula
potrzebne equity = BF ÷ (BF + 1)
```

Wychodzi **{{n:m11.bf.req}}**. W grze o {{t:chips}} ryzykujesz {{n:m11.bf.s3}}, żeby wygrać {{n:m11.bf.s3}}, więc wystarczyłoby {{n:m11.bf.req-chips}}. Różnica, {{n:m11.bf.premium}}, to **{{t:risk-premium}}**.

Ten sam kierunek widać w opublikowanej równowadze dla trzech graczy z równymi stackami (Ganzfried i Sandholm, 2008): gdy Button i {{t:small-blind}} są już all-in, {{t:big-blind}} w pojedynczym rozdaniu {{t:call|sprawdza}} {{n:m11.gs.overcall.single}} rąk, a w {{t:tournament|turnieju}} z {{t:payout|wypłatami}} tylko {{n:m11.gs.overcall.tourn}}, czyli same {{t:top-pair|najwyższe pary}} i AKs.

:::note Kto {{t:call|sprawdza}} ciasno
Średni stack na {{t:bubble|bańce}} {{t:call|sprawdza}} all-iny dużo ciaśniej niż w grze o {{t:chips}}. Duży stack, który {{t:cover|przykrywa}} rywali, ryzykuje mniej i może na tym grać: {{t:shove|wpychać}} szerzej, bo rywale muszą {{t:fold|pasować}}. Bubble factor zależy od wszystkich stacków przy stole, dlatego nie liczy się go przy stole, tylko ćwiczy na przykładach, żeby wyrobić wyczucie.
:::

## Ograniczenia {{t:icm}}

{{t:icm}} nie zna {{t:position|pozycji}}, rosnących blindów ani umiejętności graczy. To dobre przybliżenie do decyzji o all-inie, ale nie dokładna wycena {{t:tournament|turnieju}}.
