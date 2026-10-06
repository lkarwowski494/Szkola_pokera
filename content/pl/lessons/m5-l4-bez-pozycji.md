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
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}}, Button {{t:call|sprawdził}}, blindy {{t:fold|spasowały}}. Flop jest średni i {{t:connected}}. Mówisz pierwszy. Jaki plan {{t:fold|pasuje}}?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Czekam}} częściej niż {{t:in-position}}", correct: true, why: "Tak: Button {{t:call|sprawdził}} z {{t:position|pozycji}}, więc ma silny {{t:range}}, a flop średni i {{t:connected}} dobrze trafia jego {{t:pair|pary}} i {{t:connectors|konektory}}. {{t:out-of-position|Bez pozycji}} {{t:check|czekasz}} tu bardzo często, także z silnymi rękami." }
      - { text: "C-bet często i mało, jak na Buttonie", why: "To plan {{t:in-position}} na {{t:dry|suchym}}, wysokim flopie. Tu nie masz {{t:position|pozycji}}, a flop nie sprzyja twojemu {{t:range|zakresowi}}." }
      - { text: "C-bet ze wszystkimi rękami, żeby nie stracić {{t:initiative|inicjatywy}}", why: "{{t:initiative|Inicjatywa}} nie wygrywa sama: {{t:range}} Buttona jest tu silny, a ty po każdym {{t:bet|zakładzie}} mówisz pierwszy także na turnie i riverze." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Dlaczego {{t:out-of-position}} c-betujesz rzadziej niż {{t:in-position}}?"
    options:
      - { text: "Bo rywal {{t:in-position}} widzi twój ruch na każdej {{t:street|ulicy}}, a jego {{t:range}} po {{t:call|sprawdzeniu}} jest silny", correct: true, why: "Tak: gracz, który {{t:call|sprawdza}} z {{t:position|pozycji}}, słabe ręce {{t:fold|pasował}}, a najsilniejsze często {{t:raise|przebijał}}. Zostają mu ręce średnie i dobre, a do tego mówi ostatni." }
      - { text: "Bo {{t:out-of-position}} c-bet jest zabroniony", why: "Nie: zasady pozwalają betować z każdego miejsca. Chodzi o to, że c-bet {{t:out-of-position}} rzadziej się opłaca." }
      - { text: "Bo {{t:out-of-position}} zawsze masz słabszą rękę", why: "Nie: twoja ręka nie zależy od {{t:position|pozycji}}. Zmienia się to, jak łatwo zrealizujesz jej equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}}, Button {{t:call|sprawdził}}, blindy {{t:fold|spasowały}}. Masz {{t:top-pair|najwyższą parę}} z najlepszym kickerem na {{t:dry|suchym}} flopie. Mówisz pierwszy. Co robisz?"
    table: { hand: "Ah Kc", position: CO, board: "As 7d 2c" }
    options:
      - { text: "{{t:check|Czekam}} (żeby {{t:call|sprawdzić}} {{t:bet}} Buttona)", correct: true, why: "Tak: Button {{t:call|sprawdzał}} z {{t:position|pozycji}}, więc jego {{t:range}} jest silny, a na tym flopie solver {{t:out-of-position}} {{t:check|czeka}} prawie całym {{t:range|zakresem}}, także {{t:top-pair|najwyższą parą}} z najlepszym kickerem. Po {{t:check|czekaniu}} {{t:call|sprawdzasz}} {{t:bet}} Buttona." }
      - { text: "C-bet {{n:cbet.size.small}} {{t:pot|puli}}", why: "Za często: w tym układzie solver betuje w mniej niż {{n:cbet.oop.a94.bet}} przypadków. {{t:top-pair|Najwyższą parę}} z najlepszym kickerem grasz {{t:check|czekaniem}} i {{t:call|sprawdzeniem}}." }
      - { text: "C-bet {{n:cbet.size.big}} {{t:pot|puli}}", why: "Za często: w tym układzie solver betuje w mniej niż {{n:cbet.oop.a94.bet}} przypadków. {{t:top-pair|Najwyższą parę}} z najlepszym kickerem grasz {{t:check|czekaniem}} i {{t:call|sprawdzeniem}}." }
      - { text: "{{t:fold|Pas}}", why: "Nikt jeszcze nie {{t:bet|postawił}}, więc {{t:fold}} nic nie daje: możesz {{t:check|czekać}} za darmo (zasada z modułu 1). A z tą ręką chcesz betować." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}}, {{t:call|sprawdzili}} Button i {{t:big-blind}}. Na flopie {{t:big-blind}} {{t:check|czeka}}, a Button mówi po tobie. Masz same wysokie karty bez {{t:draw|drawa}}. Co robisz?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Tak: przeciw dwóm rywalom ręka bez {{t:pair|pary}} i bez {{t:draw|drawa}} rzadko wygrywa {{t:pot|pulę}} {{t:bet|zakładem}}. Ktoś z dwóch częściej trafił ten flop." }
      - { text: "C-bet mały, jak w grze jeden na jednego", why: "Przeciw dwóm rywalom {{t:bluff}} musi przejść przez obu, a obaj chybiają naraz dużo rzadziej niż jeden." }
      - { text: "C-bet duży, żeby wypchnąć obu", why: "Duży {{t:bluff}} przeciw dwóm rywalom ryzykuje dużo, a szansa, że obaj {{t:fold|spasują}}, jest mała. Na tym flopie mają wiele {{t:pair|par}} i {{t:draw|drawów}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}}, {{t:call|sprawdzili}} Button i {{t:big-blind}}. {{t:big-blind|Duży blind}} {{t:check|czeka}}. Masz {{t:top-pair|najwyższą parę}} z dobrym kickerem. Co robisz?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Tak: w {{t:pot|puli}} wieloosobowej na {{t:dry|suchym}} flopie solver {{t:check|czeka}} bardzo często, nawet bardzo silnymi rękami. Sprawdzający Button ma dużo króli (KJs, KTs), więc {{t:range-advantage}} znika." }
      - { text: "Betuję {{t:value|dla wartości}}", why: "Przeciw dwóm rywalom na {{t:dry|suchym}} flopie solver {{t:check|czeka}} nawet z bardzo silną ręką; betujesz rzadko i mało, głównie gdy flop dobrze trafia twój {{t:range}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Nikt nie {{t:bet|postawił}}, więc możesz {{t:check|czekać}} za darmo. {{t:fold|Pas}} byłby oddaniem {{t:pot|puli}}, w której prawdopodobnie prowadzisz." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Jedna ręka bez {{t:pair|pary}} chybia flop w ok. {{n:flop.miss.unpaired}} przypadków. Jak często chybiają naraz dwie takie ręce (cztery różne rangi)?"
    options:
      - { text: "Ok. {{n:flop.miss.two}}", correct: true, why: "Tak: liczysz tak samo jak dla jednej ręki, tylko kart parujących jest więcej: {{n:pair.outs.two-hands}} spośród {{n:cards.unseen.two-hands}} nieznanych (bez twoich kart). Szansa, że żadna z {{n:cards.board.flop}} kart flopu nie będzie wśród nich, to ok. {{n:flop.miss.two}}: obaj chybiają rzadziej niż w połowie przypadków." }
      - { text: "Ok. {{n:flop.miss.unpaired}}, tak samo jak jedna", why: "Nie: każdy kolejny rywal to kolejna szansa, że ktoś trafił. Szansa, że chybią wszyscy, maleje z każdym graczem." }
      - { text: "Ok. {{n:flop.hit.unpaired}}", why: "To szansa, że jedna ręka bez {{t:pair|pary}} trafi {{t:pair|parę}} na flopie. Pytanie dotyczy tego, że obie chybią." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Powtórka {{t:in-position}}: {{t:open|otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} i na flopie {{t:check|czeka}}. Jaki plan pasuje do tego flopu?"
    position: BTN
    options:
      check: "Częściej {{t:check|czekam}}, c-bet rzadziej niż zwykle"
      small: "C-bet często i mało: {{n:cbet.size.small}} {{t:pot|puli}} ({{n:cbet.btn.small}})"
      big: "C-bet często i dużo: {{n:cbet.size.big}} {{t:pot|puli}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Za ostrożnie: na {{t:dry|suchym}}, wysokim flopie masz {{t:range-advantage|przewagę zakresu}}, a rywal zwykle chybił. {{t:check|Czekając}}, dajesz mu darmową kartę."
          small: "Tak: {{t:dry}}, wysoki flop sprzyja tobie. Mały {{t:bet}} wystarcza, żeby rywal {{t:fold|spasował}} słabe ręce, a gorsze {{t:pair|pary}} wciąż go {{t:call|sprawdzą}}."
          big: "Dobra akcja, zły rozmiar: na {{t:dry|suchym}} flopie rywal ma mało {{t:draw|drawów}}, a ręce, które chybiły, {{t:fold|spasują}} także na mały {{t:bet}}. Większy {{t:bet}} nie {{t:fold|spasuje}} więcej rąk, a ryzykuje więcej. Betuj ok. {{n:cbet.size.small}} {{t:pot|puli}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Tak: niski flop z kartami blisko siebie sprzyja {{t:big-blind|dużemu blindowi}}, który częściej ma tu {{t:two-pair}} albo {{t:straight|strita}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."
          small: "Za często: na niskim flopie z kartami blisko siebie to {{t:big-blind}} ma {{t:nuts-advantage|przewagę nutsów}}. Częste c-bety, nawet małe, dają mu okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."
          big: "Za często i za drogo: {{t:big-blind}} częściej trafił tu {{t:two-pair}} albo {{t:straight|strita}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
    count: 3
---
Do tej pory grałeś {{t:in-position}} przeciw jednemu rywalowi. {{t:out-of-position|Bez pozycji}} i przeciw kilku graczom c-betujesz rzadziej.

## {{t:out-of-position|Bez pozycji}}

Gdy {{t:open|otwierasz}} z {{t:cutoff|CO}}, a Button {{t:call|sprawdza}}, po flopie mówisz pierwszy na każdej {{t:street|ulicy}}. {{t:range|Zakres}} Buttona jest przy tym silny: słabe ręce {{t:fold|pasował}}, a część najsilniejszych {{t:raise|przebijał}}, więc zostały mu ręce średnie i dobre. Dlatego {{t:out-of-position}} {{t:check|czekasz}} dużo częściej, często całym {{t:range|zakresem}}, także z silnymi rękami: zagrasz je {{t:call|sprawdzeniem}} albo check-raise'em. Betujesz głównie na flopach, które bardzo mocno sprzyjają twojemu {{t:range|zakresowi}}, np. K-Q-6. {{t:check|Czekanie}} {{t:out-of-position}} nie oznacza rezygnacji z ręki: wiele z tych rąk {{t:call|sprawdzi}} {{t:bet}} rywala.

## Przeciw kilku rywalom

Każdy kolejny rywal to kolejna szansa, że ktoś trafił flop. Jedna ręka bez {{t:pair|pary}} chybia flop w ok. {{n:flop.miss.unpaired}} przypadków, ale dwie naraz już tylko w ok. {{n:flop.miss.two}}. {{t:bluff|Blef}} musi przejść przez wszystkich, więc przeciw kilku rywalom rezygnujesz głównie z {{t:bluff|blefów}}. Betujesz rzadko i mało, głównie na flopach, które dobrze trafiają twój {{t:range}}; na {{t:dry|suchym}} flopie {{t:check|czekasz}} często nawet z bardzo silną ręką.

:::note Skąd te zasady
Zasady tej lekcji pochodzą z wyników solverów opublikowanych przez GTO Wizard (c-bet {{t:out-of-position}}) i PokerCoaching (c-bet na flopie z asem i w {{t:pot|puli}} wieloosobowej) oraz z GTO Gecko ({{t:pot}} wieloosobowa). To heurystyki: aplikacja nie podaje częstotliwości w procentach. Szansa, że dwie ręce chybią naraz, to dokładne obliczenie dla dwóch rąk o czterech różnych rangach; twoje karty pomija, tak jak liczba dla jednej ręki.
:::
