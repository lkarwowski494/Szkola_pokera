---
id: m5.l4
module: m5
order: 4
title: "Bez pozycji i przeciw kilku"
sub: "Kiedy częściej czekać"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Otworzyłeś z CO, Button sprawdził, blindy spasowały. Flop jest średni i połączony. Mówisz pierwszy. Jaki plan pasuje?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "Czekam częściej niż z pozycją", correct: true, why: "Tak: Button sprawdził z pozycji, więc ma silny zakres, a flop średni i połączony dobrze trafia jego pary i łączniki. Bez pozycji czekasz tu bardzo często, także z silnymi rękami." }
      - { text: "C-bet często i mało, jak na Buttonie", why: "To plan z pozycją na suchym, wysokim flopie. Tu nie masz pozycji, a flop nie sprzyja twojemu zakresowi." }
      - { text: "C-bet ze wszystkimi rękami, żeby nie stracić inicjatywy", why: "Inicjatywa nie wygrywa sama: zakres Buttona jest tu silny, a ty po każdym zakładzie mówisz pierwszy także na turnie i riverze." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Dlaczego bez pozycji c-betujesz rzadziej niż z pozycją?"
    options:
      - { text: "Bo rywal z pozycją widzi twój ruch na każdej ulicy, a jego zakres po sprawdzeniu jest silny", correct: true, why: "Tak: gracz, który sprawdza z pozycji, słabe ręce pasował, a najsilniejsze często przebijał. Zostają mu ręce średnie i dobre, a do tego mówi ostatni." }
      - { text: "Bo bez pozycji c-bet jest zabroniony", why: "Nie: zasady pozwalają betować z każdego miejsca. Chodzi o to, że c-bet bez pozycji rzadziej się opłaca." }
      - { text: "Bo bez pozycji zawsze masz słabszą rękę", why: "Nie: twoja ręka nie zależy od pozycji. Zmienia się to, jak łatwo zrealizujesz jej equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Otworzyłeś z CO, Button sprawdził, blindy spasowały. Masz najwyższą parę z najlepszym kickerem na suchym flopie. Mówisz pierwszy. Co robisz?"
    table: { hand: "Ah Kc", position: CO, board: "As 7d 2c" }
    options:
      - { text: "Czekam (żeby sprawdzić zakład Buttona)", correct: true, why: "Tak: Button sprawdzał z pozycji, więc jego zakres jest silny, a na tym flopie solver bez pozycji czeka prawie całym zakresem, także najwyższą parą z najlepszym kickerem. Po czekaniu sprawdzasz zakład Buttona." }
      - { text: "C-bet {{n:cbet.size.small}} puli", why: "Za często: w tym układzie solver betuje w mniej niż {{n:cbet.oop.a94.bet}} przypadków. Najwyższą parę z najlepszym kickerem grasz czekaniem i sprawdzeniem." }
      - { text: "C-bet {{n:cbet.size.big}} puli", why: "Za często: w tym układzie solver betuje w mniej niż {{n:cbet.oop.a94.bet}} przypadków. Najwyższą parę z najlepszym kickerem grasz czekaniem i sprawdzeniem." }
      - { text: "Pas", why: "Nikt jeszcze nie postawił, więc pas nic nie daje: możesz czekać za darmo (zasada z modułu 1). A z tą ręką chcesz betować." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Otworzyłeś z CO, sprawdzili Button i duży blind. Na flopie duży blind czeka, a Button mówi po tobie. Masz same wysokie karty bez dobierania. Co robisz?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "Czekam", correct: true, why: "Tak: przeciw dwóm rywalom ręka bez pary i bez dobierania rzadko wygrywa pulę zakładem. Ktoś z dwóch częściej trafił ten flop." }
      - { text: "C-bet mały, jak w grze jeden na jednego", why: "Przeciw dwóm rywalom blef musi przejść przez obu, a obaj chybiają naraz dużo rzadziej niż jeden." }
      - { text: "C-bet duży, żeby wypchnąć obu", why: "Duży blef przeciw dwóm rywalom ryzykuje dużo, a szansa, że obaj spasują, jest mała. Na tym flopie mają wiele par i dobierań." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Otworzyłeś z CO, sprawdzili Button i duży blind. Duży blind czeka. Masz najwyższą parę z dobrym kickerem. Co robisz?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "Czekam", correct: true, why: "Tak: w puli wieloosobowej na suchym flopie solver czeka bardzo często, nawet bardzo silnymi rękami. Sprawdzający Button ma dużo króli (KJs, KTs), więc przewaga zakresu znika." }
      - { text: "Betuję dla wartości", why: "Przeciw dwóm rywalom na suchym flopie solver czeka nawet z bardzo silną ręką; betujesz rzadko i mało, głównie gdy flop dobrze trafia twój zakres." }
      - { text: "Pasuję", why: "Nikt nie postawił, więc możesz czekać za darmo. Pas byłby oddaniem puli, w której prawdopodobnie prowadzisz." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Jedna ręka bez pary chybia flop w ok. {{n:flop.miss.unpaired}} przypadków. Jak często chybiają naraz dwie takie ręce (cztery różne rangi)?"
    options:
      - { text: "Ok. {{n:flop.miss.two}}", correct: true, why: "Tak: liczysz tak samo jak dla jednej ręki, tylko kart parujących jest więcej: {{n:pair.outs.two-hands}} spośród {{n:cards.unseen.two-hands}} nieznanych (bez twoich kart). Szansa, że żadna z {{n:cards.board.flop}} kart flopu nie będzie wśród nich, to ok. {{n:flop.miss.two}}: obaj chybiają rzadziej niż w połowie przypadków." }
      - { text: "Ok. {{n:flop.miss.unpaired}}, tak samo jak jedna", why: "Nie: każdy kolejny rywal to kolejna szansa, że ktoś trafił. Szansa, że chybią wszyscy, maleje z każdym graczem." }
      - { text: "Ok. {{n:flop.hit.unpaired}}", why: "To szansa, że jedna ręka bez pary trafi parę na flopie. Pytanie dotyczy tego, że obie chybią." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Powtórka z pozycją: otworzyłeś z Buttona, duży blind sprawdził i na flopie czeka. Jaki plan pasuje do tego flopu?"
    position: BTN
    options:
      check: "Częściej czekam, c-bet rzadziej niż zwykle"
      small: "C-bet często i mało: {{n:cbet.size.small}} puli ({{n:cbet.btn.small}})"
      big: "C-bet często i dużo: {{n:cbet.size.big}} puli ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Za ostrożnie: na suchym, wysokim flopie masz przewagę zakresu, a rywal zwykle chybił. Czekając, dajesz mu darmową kartę."
          small: "Tak: suchy, wysoki flop sprzyja tobie. Mały zakład wystarcza, żeby rywal spasował słabe ręce, a gorsze pary wciąż go sprawdzą."
          big: "Dobra akcja, zły rozmiar: na suchym flopie rywal ma mało dobierań, a ręce, które chybiły, spasują także na mały zakład. Większy zakład nie spasuje więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} puli."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Tak: niski flop z kartami blisko siebie sprzyja dużemu blindowi, który częściej ma tu dwie pary albo strita. C-betujesz rzadziej niż na wysokich flopach: wiele rąk czeka, a betują głównie silne ręce i mocne dobierania."
          small: "Za często: na niskim flopie z kartami blisko siebie to duży blind ma przewagę orzechową. Częste c-bety, nawet małe, dają mu okazję do przebicia (check-raise) najsilniejszymi rękami."
          big: "Za często i za drogo: duży blind częściej trafił tu dwie pary albo strita. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
    count: 3
---
Do tej pory grałeś z pozycją przeciw jednemu rywalowi. Bez pozycji i przeciw kilku graczom c-betujesz rzadziej.

## Bez pozycji

Gdy otwierasz z CO, a Button sprawdza, po flopie mówisz pierwszy na każdej ulicy. Zakres Buttona jest przy tym silny: słabe ręce pasował, a część najsilniejszych przebijał, więc zostały mu ręce średnie i dobre. Dlatego bez pozycji czekasz dużo częściej, często całym zakresem, także z silnymi rękami: zagrasz je sprawdzeniem albo check-raise'em. Betujesz głównie na flopach, które bardzo mocno sprzyjają twojemu zakresowi, np. K-Q-6. Czekanie bez pozycji nie oznacza rezygnacji z ręki: wiele z tych rąk sprawdzi zakład rywala.

## Przeciw kilku rywalom

Każdy kolejny rywal to kolejna szansa, że ktoś trafił flop. Jedna ręka bez pary chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, ale dwie naraz już tylko w ok. {{n:flop.miss.two}}. Blef musi przejść przez wszystkich, więc przeciw kilku rywalom rezygnujesz głównie z blefów. Betujesz rzadko i mało, głównie na flopach, które dobrze trafiają twój zakres; na suchym flopie czekasz często nawet z bardzo silną ręką.

:::note Skąd te zasady
Zasady tej lekcji pochodzą z wyników solverów opublikowanych przez GTO Wizard (c-bet bez pozycji) i PokerCoaching (c-bet na flopie z asem i w puli wieloosobowej) oraz z GTO Gecko (pula wieloosobowa). To heurystyki: aplikacja nie podaje częstotliwości w procentach. Szansa, że dwie ręce chybią naraz, to dokładne obliczenie dla dwóch rąk o czterech różnych rangach; twoje karty pomija, tak jak liczba dla jednej ręki.
:::
