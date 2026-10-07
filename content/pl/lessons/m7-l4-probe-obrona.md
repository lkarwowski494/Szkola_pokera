---
id: m7.l4
module: m7
order: 4
title: "Probe bet i obrona"
sub: "Gdy rywal czeka albo betuje drugi raz"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Button {{t:open|otworzył}}, ty w {{t:big-blind|dużym blindzie}} {{t:call|sprawdziłeś}}. Na flopie obaj czekacie. Na turnie betujesz pierwszy. Jak nazywa się ten {{t:bet}}?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Tak: probe bet to {{t:bet}} {{t:out-of-position}} na turnie po tym, jak {{t:aggressor}} przed flopem nie zrobił c-betu i {{t:check|czekał}}." }
      - { text: "C-bet", why: "C-bet {{t:bet|stawia}} gracz, który {{t:raise|przebijał}} przed flopem. Ty tylko {{t:call|sprawdzałeś}}." }
      - { text: "Check-raise", why: "Check-raise to {{t:check}}, a potem {{t:raise}} {{t:bet|zakładu}} rywala. Tu betujesz pierwszy, nikogo nie {{t:raise|przebijasz}}." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Dlaczego po {{t:check|czekaniu}} Buttona na flopie możesz na turnie betować częściej niż zwykle?"
    table: { position: BB }
    options:
      - { text: "Bo z wieloma silnymi rękami Button by betował, więc po {{t:check|czekaniu}} ma ich mniej", correct: true, why: "Tak: silne ręce zwykle robią c-bet. {{t:range|Zakres}} Buttona po {{t:check|czekaniu}} ma więcej rąk średnich i słabych, a ty możesz zaatakować go {{t:bet|zakładem}}." }
      - { text: "Bo {{t:check}} zawsze oznacza, że Button nic nie ma", why: "Nie zawsze: Button czasem {{t:check|czeka}} z silną ręką, żeby cię złapać. Ma ich jednak mniej niż wtedy, gdy betuje." }
      - { text: "Bo na turnie to ty masz {{t:position|pozycję}}", why: "Nie: Button mówi po tobie na każdej {{t:street|ulicy}}. Probe bet {{t:bet|stawiasz}} {{t:out-of-position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Button {{t:check|czekał}} na flopie. Na którym {{t:board|stole}} częściej {{t:bet|stawiasz}} probe bet z {{t:big-blind|dużego blinda}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Tak: niskie karty częściej trafiają szeroką obronę {{t:big-blind|dużego blinda}} (małe {{t:pair|pary}}, {{t:connectors|konektory}}), a Button po {{t:check|czekaniu}} rzadko ma tu silną rękę." }
      - { text: "[[Ac Kd 8h Js]]", why: "Na wysokim {{t:board|stole}} {{t:range-advantage|przewagę zakresu}} ma Button: wiele jego asów i króli trafiło. Tu probe bet {{t:bet|stawiasz}} rzadziej." }
      - { text: "Na obu tak samo często", why: "{{t:texture|Tekstura}} ma znaczenie, tak jak przy c-becie w M5: na niskich stołach betujesz częściej, na wysokich rzadziej." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie obaj {{t:check|czekaliście}}. Turn to {{t:three-of-a-kind}}. Mówisz pierwszy. Co robisz?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Betuję (probe bet)", correct: true, why: "Masz {{t:oesd}} (czwórka albo dziewiątka) na niskim {{t:board|stole}}, który pasuje do twojego {{t:range|zakresu}}. Wygrywasz, gdy Button {{t:fold|spasuje}}, a gdy {{t:call|sprawdzi}}, nadal masz {{n:outs.oesd}} outów." }
      - { text: "{{t:check|Czekam}}", correct: true, why: "Też dobrze: z {{t:draw|drawem}} możesz zobaczyć rivera za darmo, jeśli Button też {{t:check|poczeka}}. Probe bet jest jednak zwykle lepszy, bo Button po {{t:check|czekaniu}} na flopie ma słaby {{t:range}}, a ty masz mocny {{t:semi-bluff}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Nikt nie {{t:bet|postawił}}, więc możesz {{t:check|czekać}} za darmo (zasada z modułu 1). {{t:fold|Pas}} oddaje {{t:pot|pulę}} bez powodu." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie obaj {{t:check|czekaliście}}. Turn to {{t:three-of-a-kind}}. Mówisz pierwszy. Co robisz?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Betuję (probe bet)", correct: true, why: "{{t:top-pair|Najwyższa para}} to dobra ręka do probe betu: zapłacą ci słabsze {{t:pair|pary}} i wysokie karty Buttona, a {{t:bet|zakładem}} nie dajesz im darmowej karty." }
      - { text: "{{t:check|Czekam}}", why: "Button po {{t:check|czekaniu}} na flopie często ma wysokie karty bez {{t:pair|pary}}. Gdy znów {{t:check|czeka}}, dostaje darmową kartę, która może cię pobić, a ty nie zarabiasz na jego słabszych rękach." }
      - { text: "{{t:fold|Pasuję}}", why: "Nikt nie {{t:bet|postawił}}, więc możesz {{t:check|czekać}} za darmo. A z {{t:top-pair|najwyższą parą}} chcesz betować." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie obaj {{t:check|czekaliście}}. Turn to walet. Mówisz pierwszy. Co robisz?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Nie masz {{t:pair|pary}} ani {{t:draw|drawa}}, a wysoki {{t:board}} sprzyja {{t:range|zakresowi}} Buttona. Probe bet bez outów na takim {{t:board|stole}} wygrywa tylko wtedy, gdy Button {{t:fold|spasuje}}, a ma tu wiele asów, króli i waletów." }
      - { text: "Betuję (probe bet)", why: "Probe bet {{t:bet|stawiasz}} częściej na niskich stołach i z rękami, które mają {{t:pair|parę}} albo outy. Tu nie masz ani jednego, ani drugiego." }
      - { text: "{{t:fold|Pasuję}}", why: "Możesz {{t:check|czekać}} za darmo, więc {{t:fold}} nic nie daje (zasada z modułu 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bronisz {{t:big-blind}}. {{t:call|Sprawdziłeś}} c-bet Buttona na flopie. Turn to dwójka, {{t:check|czekasz}}, a Button {{t:bet|stawia}} {{n:ex.bet.three-quarters}} do {{t:pot|puli}} {{n:ex.pot}}. Co robisz?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Masz tylko gutshot (walet): ok. {{n:odds.gutshot.turn-river}} na riverze, a potrzebujesz {{n:eq.bet-three-quarters}}. Bez {{t:pair|pary}} i z jedną kartą do końca ta ręka nie broni się przed {{t:second-barrel|second barrelem}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "Cena jest kilka razy wyższa niż twoja szansa: {{n:eq.bet-three-quarters}} wobec ok. {{n:odds.gutshot.turn-river}}. Implied odds nie pokryją takiej różnicy." }
      - { text: "Check-raise", why: "{{t:second-barrel|Second barrel}} to silniejszy {{t:range}} niż c-bet: Button częściej ma króla albo lepszą rękę, która nie {{t:fold|spasuje}}. Z {{n:outs.gutshot}} outami to drogi {{t:bluff}}." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bronisz {{t:big-blind}}. {{t:call|Sprawdziłeś}} c-bet Buttona na flopie. Turn to król, {{t:check|czekasz}}, a Button {{t:bet|stawia}} tylko {{n:ex.bet.quarter}} do {{t:pot|puli}} {{n:ex.pot}}. Co robisz?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Masz {{t:oesd}} (walet albo szóstka): ok. {{n:odds.oesd.turn-river}}. Mały bet wymaga tylko {{n:eq.bet-quarter}}, czyli prawie dokładnie tyle, a po trafieniu możesz jeszcze wygrać na riverze." }
      - { text: "{{t:fold|Pasuję}}", why: "Przy tak małym becie cena jest prawie równa twojej szansie ({{n:eq.bet-quarter}} wobec ok. {{n:odds.oesd.turn-river}}), a implied odds przechylają decyzję na {{t:call}}." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "Ryzykujesz cały stack ręką, która jeszcze nic nie ma, a Button z królem nie {{t:fold|spasuje}}. Przy tak dobrej cenie wystarczy {{t:call|sprawdzić}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Bronisz {{t:big-blind}}. {{t:call|Sprawdziłeś}} c-bet Buttona na flopie. Turn to piątka, {{t:check|czekasz}}, a Button {{t:bet|stawia}} {{n:ex.bet.three-quarters}} do {{t:pot|puli}} {{n:ex.pot}}. Co robisz?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "{{t:top-pair|Najwyższa para}} to za dużo, żeby {{t:fold|pasować}} na pustej karcie: wygrywa z {{t:semi-bluff|semi-blefami}} i słabszymi królami. Potrzebujesz {{n:eq.bet-three-quarters}}, a przeciw {{t:range|zakresowi}} {{t:second-barrel|second barrela}} taka {{t:pair}} zwykle ma tyle." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno. {{t:second-barrel|Second barrel}} jest silniejszy niż c-bet, ale Button {{t:bet|stawia}} go też {{t:draw|drawami}} i {{t:bluff|blefami}}. {{t:top-pair|Najwyższa para}} bije je wszystkie." }
      - { text: "{{t:raise|Przebijam}}", why: "Po {{t:raise|przebiciu}} gorsze ręce {{t:fold|spasują}}, a zapłacą lepsze króle i sety. {{t:top-pair|Najwyższa para}} ze średnim kickerem nie jest ręką do {{t:raise|przebicia}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Dlaczego przeciw {{t:second-barrel|second barrelu}} bronisz węziej niż przeciw c-betowi na flopie?"
    table: { position: BB }
    options:
      - { text: "Bo {{t:second-barrel|second barrel}} rywal {{t:bet|stawia}} węższym {{t:range|zakresem}} i zwykle większym rozmiarem, a {{t:draw|drawy}} mają już tylko jedną kartę", correct: true, why: "Tak: część {{t:bluff|blefów}} rywal odpuszcza na turnie, większy bet obniża {{t:mdf}} (przy 3/4 {{t:pot|puli}} {{n:mdf.bet-three-quarters}}), a twoje {{t:draw|drawy}} tracą połowę szans. Słabe {{t:pair|pary}} i ręce bez outów {{t:fold|pasujesz}} częściej niż na flopie." }
      - { text: "Bo na turnie trzeba oszczędzać {{t:chips}}", why: "Liczy się {{t:expected-value}} każdej decyzji, nie oszczędzanie. Bronisz węziej, bo rywal betuje silniejszymi rękami." }
      - { text: "Nie, bronisz szerzej, bo wpłaciłeś już dużo {{t:chips|żetonów}}", why: "To, co już wpłaciłeś, nie wraca. Decyzję podejmujesz na podstawie ceny teraz i siły {{t:range|zakresu}} rywala." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. Rywal {{t:bet|stawia}} {{n:ex.bet.three-quarters}} do {{t:pot|puli}} {{n:ex.pot}}. Ile wynosi {{t:mdf}}? Wpisz liczbę w procentach."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + bet) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Na turnie solver broni średnio blisko {{t:mdf}}, inaczej niż na flopie {{t:out-of-position}}, gdzie broni mniej. Gdy wiesz, że rywal {{t:bluff|blefuje}} rzadziej, {{t:fold|pasujesz}} częściej (rachunek w M8, lekcja o łapaniu {{t:bluff|blefów}})."
---
Na turnie spotkasz dwie nowe sytuacje: Button nie zrobił c-betu i {{t:check|czekał}}, albo zrobił c-bet i betuje drugi raz. W pierwszej możesz zaatakować sam, w drugiej bronisz się węziej niż na flopie.

## Probe bet

Probe bet to {{t:bet}} {{t:out-of-position}} na turnie po tym, jak {{t:aggressor}} przed flopem {{t:check|czekał}} na flopie. Button z wieloma silnymi rękami zrobiłby c-bet, więc po {{t:check|czekaniu}} ma ich mniej. Jego {{t:range}} jest słabszy i możesz go zaatakować.

- **Częściej na niskich stołach**, np. [[8c 5d 2s 3h]]: niskie karty trafiają twoją szeroką obronę.
- **Rzadziej na wysokich**, np. [[Ac Kd 8h Js]]: {{t:range-advantage}} zostaje po stronie Buttona.

## Czym probe betować

- **{{t:pair|parami}}**, które chcą zapłaty od wysokich kart Buttona i nie chcą dawać mu darmowej karty,
- **mocnymi {{t:draw|drawami}}**, które wygrywają na dwa sposoby.

Ręce bez {{t:pair|pary}} i bez outów {{t:check|czekają}}.

## Obrona przed {{t:second-barrel|second barrelem}}

Gdy {{t:call|sprawdziłeś}} c-bet, a Button betuje drugi raz, jego {{t:range}} jest węższy i silniejszy niż na flopie: część {{t:bluff|blefów}} odpuścił. Twoje {{t:draw|drawy}} mają już tylko jedną kartę. Dlatego:

- {{t:draw|drawy}} {{t:call|sprawdzają}} tylko przy dobrej cenie albo z implied odds (poprzednia lekcja),
- ręce bez outów i najsłabsze {{t:pair|pary}} częściej {{t:fold|pasują}},
- {{t:top-pair}} zwykle nadal {{t:call|sprawdza}}.

{{t:mdf}} pozostaje punktem odniesienia: przy becie 3/4 {{t:pot|puli}} wynosi {{n:mdf.bet-three-quarters}}. Na turnie solver broni średnio blisko tej wartości; mniej bronisz tylko wtedy, gdy rywal {{t:bluff|blefuje}} rzadziej, niż zakłada {{t:mdf}}.

:::note Skąd te zasady
Zasady probe betu i obrony przed {{t:second-barrel|second barrelem}} to heurystyki z literatury (GTO Wizard, Upswing, PokerCoaching). Obronę na turnie blisko {{t:mdf}} pokazują rozwiązania PIOSolvera omawiane na Upswing. Aplikacja nie podaje częstotliwości w procentach, bo źródła różnią się zależnie od stołu. Liczby o tym, czym gracze mikrostawek {{t:bet|stawiają}} probe bety, wymagają źródła z opisaną populacją (próba, {{t:stakes|stawki}}, sale), więc ich tu nie ma.
:::
