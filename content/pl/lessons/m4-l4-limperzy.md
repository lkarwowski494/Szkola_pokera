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
    prompt: "Jeden gracz przed tobą tylko wyrównał duży blind (limp). Chcesz przebić z Buttona. Do ilu?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Do {{n:pf.iso.one-limper}}", correct: true, why: "Podstawa {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera. Taki rozmiar odbiera limperowi dobrą cenę." }
      - { text: "Do {{n:pf.min-raise}}", why: "Minimalne przebicie daje limperowi świetną cenę i prawie nigdy nie wygrywa puli od razu." }
      - { text: "Do {{n:pf.open-size}}, jak zwykłe otwarcie", why: "Limper już wpłacił blind, więc pula jest większa. Przebicie musi być większe niż zwykłe otwarcie." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Dwóch graczy przed tobą tylko wyrównało duży blind. Chcesz przebić z CO. Do ilu?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Do {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za każdego z dwóch limperów." }
      - { text: "Do {{n:pf.iso.one-limper}}", why: "To rozmiar wobec jednego limpera. Każdy kolejny dodaje {{n:pf.iso.per-limper}}." }
      - { text: "Tylko dopłacam", why: "AQ w kolorze to ręka do przebicia dla wartości. Dopłata oddaje inicjatywę i wpuszcza wszystkich tanio." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Jeden gracz limpuje, wszyscy pasują do ciebie na małym blindzie. Chcesz przebić. Do ilu?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Do {{n:pf.iso.one-limper-oop}}", correct: true, why: "Bez pozycji dodajesz jeszcze {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera plus {{n:pf.iso.oop-extra}}." }
      - { text: "Do {{n:pf.iso.one-limper}}", why: "To rozmiar z pozycją. Bez pozycji przebijasz trochę więcej, żeby rywal częściej pasował albo płacił drożej." }
      - { text: "Tylko dopłacam", why: "Z KK zawsze budujesz pulę." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Jeden gracz przed tobą tylko wyrównał duży blind (limp). Jesteś na Buttonie. Co robisz?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "Przebijam do {{n:pf.iso.one-limper}}", correct: true, why: "AJ to ręka do izolacji: dominuje wiele rąk, którymi limpuje słabszy gracz, a po flopie masz pozycję. Rozmiar: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za limpera." }
      - { text: "Przebijam do {{n:pf.min-raise}}", sizeError: true, why: "Dobra akcja, ale minimalne przebicie daje limperowi świetną cenę, więc prawie nigdy nie spasuje i nie grasz z nim sam na sam. Przebijasz do {{n:pf.iso.one-limper}}." }
      - { text: "Dopłacam", why: "Oddajesz inicjatywę i wpuszczasz blindy tanio. Z ręką, która dominuje limpera, chcesz zbudować pulę." }
      - { text: "Pasuję", why: "Za ciasno: wobec jednego limpera Button izoluje ok. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} rąk, a AJ mieści się w nim z zapasem." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Trzech graczy przed tobą tylko wyrównało duży blind. Jesteś na Buttonie. Co robisz?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Dopłacam", correct: true, why: "Wobec wielu limperów łącznik w kolorze to ręka spekulacyjna: tanio zobaczysz flop z pozycją i możesz trafić dużą rękę. Upswing zaleca tu dopłatę." }
      - { text: "Pasuję", why: "Preflop Wizard radzi grać tylko przebiciem albo pasem, ale z pozycją wobec słabych limperów dopłata z 76s jest bardziej opłacalna: cena jest niska, a trafiona ręka wygrywa dużą pulę." }
      - { text: "Przebijam do {{n:pf.iso.two-limpers}}", why: "Przy trzech limperach blef przebiciem rzadko odbiera pulę, a rozmiar powinien być jeszcze większy. 76s nie nadaje się do przebicia dla wartości." }
---
Limp to wejście do rozdania przez samo wyrównanie dużego blinda. Profesjonaliści rzadko limpują jako pierwsi (reguła z modułu 3), więc limperzy na mikrostawkach to zwykle słabsi gracze. Przebicie limpera nazywa się izolacją: chcesz grać z nim sam na sam, najlepiej z pozycją.

:::note Skąd te zasady
Solver aplikacji nie gra limpów, więc ta lekcja opiera się na literaturze (Upswing, Preflop Wizard). Reguły są oznaczone jako heurystyki.
:::

## Rozmiar izolacji

Online przebijasz do {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} za każdego limpera: wobec jednego do {{n:pf.iso.one-limper}}, wobec dwóch do {{n:pf.iso.two-limpers}}. Bez pozycji dodajesz jeszcze {{n:pf.iso.oop-extra}}. Nigdy nie przebijaj minimalnie: limper dostałby świetną cenę i prawie nigdy nie spasuje.

## Zakres izolacji

Na Buttonie wobec jednego limpera izolujesz szeroko, ok. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} rąk: średnie i wysokie pary, asy w kolorze, mocne asy w różnych kolorach, wysokie karty i część łączników w kolorze. Im wcześniejsza pozycja i im więcej limperów, tym węższy zakres: wobec trzech limperów przebijasz głównie dla wartości.

Ręce spekulacyjne, takie jak małe pary i łączniki w kolorze, wobec wielu limperów z pozycją najlepiej dopłacić. Tu źródła się różnią: Upswing zaleca dopłatę, Preflop Wizard radzi jej unikać; w ćwiczeniach przyjmujemy wersję Upswing.
