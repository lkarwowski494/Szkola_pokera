---
id: m4.l4
module: m4
order: 4
title: "Limperzy"
sub: "Izolacja: rozmiar i zakres"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Jeden gracz przed tobą tylko wyrównał {{t:big-blind}} (limp). Chcesz {{t:raise|przebić}} z Buttona. Do ilu?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Do {{n:pf.iso.one-limper}}", correct: true, why: "Podstawa {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera. Taki rozmiar odbiera limperowi dobrą cenę." }
      - { text: "Do {{n:pf.min-raise}}", why: "Minimalne {{t:raise}} daje limperowi świetną cenę i prawie nigdy nie wygrywa {{t:pot|puli}} od razu." }
      - { text: "Do {{n:pf.open-size}}, jak zwykłe {{t:open}}", why: "Limper już wpłacił blind, więc {{t:pot}} jest większa. {{t:raise|Przebicie}} musi być większe niż zwykłe {{t:open}}." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Dwóch graczy przed tobą tylko wyrównało {{t:big-blind}}. Chcesz {{t:raise|przebić}} z {{t:cutoff|CO}}. Do ilu?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Do {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za każdego z dwóch limperów." }
      - { text: "Do {{n:pf.iso.one-limper}}", why: "To rozmiar wobec jednego limpera. Każdy kolejny dodaje {{n:pf.iso.per-limper}}." }
      - { text: "Tylko dopłacam", why: "AQ w kolorze to ręka do {{t:raise|przebicia}} {{t:value|dla wartości}}. Dopłata oddaje inicjatywę i wpuszcza wszystkich tanio." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Jeden gracz limpuje, wszyscy pasują do ciebie na {{t:small-blind|małym blindzie}}. Chcesz {{t:raise|przebić}}. Do ilu?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Do {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Bez pozycji}} dodajesz jeszcze {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera plus {{n:pf.iso.oop-extra}}." }
      - { text: "Do {{n:pf.iso.one-limper}}", why: "To rozmiar {{t:in-position}}. {{t:out-of-position|Bez pozycji}} {{t:raise|przebijasz}} trochę więcej, żeby rywal częściej {{t:fold|pasował}} albo płacił drożej." }
      - { text: "Tylko dopłacam", why: "Z KK zawsze budujesz {{t:pot|pulę}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Jeden gracz przed tobą tylko wyrównał {{t:big-blind}} (limp). Jesteś na Buttonie. Co robisz?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Przebijam}} do {{n:pf.iso.one-limper}}", correct: true, why: "AJ to ręka do {{t:isolation|izolacji}}: dominuje wiele rąk, którymi limpuje słabszy gracz, a po flopie masz {{t:position|pozycję}}. Rozmiar: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera." }
      - { text: "{{t:raise|Przebijam}} do {{n:pf.min-raise}}", sizeError: true, why: "Dobra akcja, ale minimalne {{t:raise}} daje limperowi świetną cenę, więc prawie nigdy nie {{t:fold|spasuje}} i nie grasz z nim sam na sam. {{t:raise|Przebijasz}} do {{n:pf.iso.one-limper}}." }
      - { text: "Dopłacam", why: "Oddajesz inicjatywę i wpuszczasz blindy tanio. Z ręką, która dominuje limpera, chcesz zbudować {{t:pot|pulę}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno: wobec jednego limpera Button {{t:isolation|izoluje}} ok. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} rąk, a AJ mieści się w nim z zapasem." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Trzech graczy przed tobą tylko wyrównało {{t:big-blind}}. Jesteś na Buttonie. Co robisz?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Dopłacam", correct: true, why: "Wobec wielu limperów {{t:connectors}} w kolorze to ręka spekulacyjna: tanio zobaczysz flop {{t:in-position}} i możesz trafić dużą rękę. Upswing zaleca tu dopłatę." }
      - { text: "{{t:fold|Pasuję}}", why: "Preflop Wizard radzi grać tylko {{t:raise|przebiciem}} albo {{t:fold|pasem}}, ale {{t:in-position}} wobec słabych limperów dopłata z 76s jest bardziej opłacalna: cena jest niska, a trafiona ręka wygrywa dużą {{t:pot|pulę}}." }
      - { text: "{{t:raise|Przebijam}} do {{n:pf.iso.two-limpers}}", why: "Przy trzech limperach {{t:bluff}} {{t:raise|przebiciem}} rzadko odbiera {{t:pot|pulę}}, a rozmiar powinien być jeszcze większy. 76s nie nadaje się do {{t:raise|przebicia}} {{t:value|dla wartości}}." }
---
Limp to wejście do rozdania przez samo wyrównanie {{t:big-blind|dużego blinda}}. Profesjonaliści rzadko limpują jako pierwsi (reguła z modułu 3), więc limperzy na mikrostawkach to zwykle słabsi gracze. {{t:raise|Przebicie}} limpera nazywa się {{t:isolation|izolacją}}: chcesz grać z nim sam na sam, najlepiej {{t:in-position}}.

:::note Skąd te zasady
Solver aplikacji nie gra limpów, więc ta lekcja opiera się na literaturze (Upswing, Preflop Wizard). Reguły są oznaczone jako heurystyki.
:::

## Rozmiar {{t:isolation|izolacji}}

Online {{t:raise|przebijasz}} do {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za każdego limpera: wobec jednego do {{n:pf.iso.one-limper}}, wobec dwóch do {{n:pf.iso.two-limpers}}. {{t:out-of-position|Bez pozycji}} dodajesz jeszcze {{n:pf.iso.oop-extra}}. Nigdy nie przebijaj minimalnie: limper dostałby świetną cenę i prawie nigdy nie {{t:fold|spasuje}}.

## {{t:range|Zakres}} {{t:isolation|izolacji}}

Na Buttonie wobec jednego limpera {{t:isolation|izolujesz}} szeroko, ok. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} rąk: średnie i wysokie {{t:pair|pary}}, asy w kolorze, mocne asy w różnych kolorach, wysokie karty i część {{t:connectors|łączników}} w kolorze. Im wcześniejsza {{t:position}} i im więcej limperów, tym węższy {{t:range}}: wobec trzech limperów {{t:raise|przebijasz}} głównie {{t:value|dla wartości}}.

Ręce spekulacyjne, takie jak małe {{t:pair|pary}} i {{t:connectors|łączniki}} w kolorze, wobec wielu limperów {{t:in-position}} najlepiej dopłacić. Tu źródła się różnią: Upswing zaleca dopłatę, Preflop Wizard radzi jej unikać; w ćwiczeniach przyjmujemy wersję Upswing.
