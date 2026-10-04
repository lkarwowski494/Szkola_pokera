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
    prompt: "Button otworzył, ty w dużym blindzie sprawdziłeś. Na flopie obaj czekacie. Na turnie betujesz pierwszy. Jak nazywa się ten zakład?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Tak: probe bet to zakład bez pozycji na turnie po tym, jak agresor przed flopem nie zrobił c-betu i czekał." }
      - { text: "C-bet", why: "C-bet stawia gracz, który przebijał przed flopem. Ty tylko sprawdzałeś." }
      - { text: "Check-raise", why: "Check-raise to czekanie, a potem przebicie zakładu rywala. Tu betujesz pierwszy, nikogo nie przebijasz." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Dlaczego po czekaniu Buttona na flopie możesz na turnie betować częściej niż zwykle?"
    table: { position: BB }
    options:
      - { text: "Bo z wieloma silnymi rękami Button by betował, więc po czekaniu ma ich mniej", correct: true, why: "Tak: silne ręce zwykle robią c-bet. Zakres Buttona po czekaniu ma więcej rąk średnich i słabych, a ty możesz zaatakować go zakładem." }
      - { text: "Bo czekanie zawsze oznacza, że Button nic nie ma", why: "Nie zawsze: Button czasem czeka z silną ręką, żeby cię złapać. Ma ich jednak mniej niż wtedy, gdy betuje." }
      - { text: "Bo na turnie to ty masz pozycję", why: "Nie: Button mówi po tobie na każdej ulicy. Probe bet stawiasz bez pozycji." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Button czekał na flopie. Na którym stole częściej stawiasz probe bet z dużego blinda?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Tak: niskie karty częściej trafiają szeroką obronę dużego blinda (małe pary, łączniki), a Button po czekaniu rzadko ma tu silną rękę." }
      - { text: "[[Ac Kd 8h Js]]", why: "Na wysokim stole przewagę zakresu ma Button: wiele jego asów i króli trafiło. Tu probe bet stawiasz rzadziej." }
      - { text: "Na obu tak samo często", why: "Tekstura ma znaczenie, tak jak przy c-becie w M5: na niskich stołach betujesz częściej, na wysokich rzadziej." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie obaj czekaliście. Turn to trójka. Mówisz pierwszy. Co robisz?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Betuję (probe bet)", correct: true, why: "Masz otwarte dobieranie do strita (czwórka albo dziewiątka) na niskim stole, który pasuje do twojego zakresu. Wygrywasz, gdy Button spasuje, a gdy sprawdzi, nadal masz {{n:outs.oesd}} outów." }
      - { text: "Czekam", why: "Nie jest to duży błąd, ale oddajesz okazję: Button po czekaniu ma słaby zakres, a ty masz mocny półblef." }
      - { text: "Pasuję", why: "Nikt nie postawił, więc możesz czekać za darmo (zasada z modułu 1). Pas oddaje pulę bez powodu." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie obaj czekaliście. Turn to trójka. Mówisz pierwszy. Co robisz?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Betuję (probe bet)", correct: true, why: "Najwyższa para to dobra ręka do probe betu: zapłacą ci słabsze pary i wysokie karty Buttona, a zakładem nie dajesz im darmowej karty." }
      - { text: "Czekam", why: "Button po czekaniu na flopie często ma wysokie karty bez pary. Gdy znów czeka, dostaje darmową kartę, która może cię pobić, a ty nie zarabiasz na jego słabszych rękach." }
      - { text: "Pasuję", why: "Nikt nie postawił, więc możesz czekać za darmo. A z najwyższą parą chcesz betować." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie obaj czekaliście. Turn to walet. Mówisz pierwszy. Co robisz?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "Czekam", correct: true, why: "Nie masz pary ani dobierania, a wysoki stół sprzyja zakresowi Buttona. Probe bet bez outów na takim stole wygrywa tylko wtedy, gdy Button spasuje, a ma tu wiele asów, króli i waletów." }
      - { text: "Betuję (probe bet)", why: "Probe bet stawiasz częściej na niskich stołach i z rękami, które mają parę albo outy. Tu nie masz ani jednego, ani drugiego." }
      - { text: "Pasuję", why: "Możesz czekać za darmo, więc pas nic nie daje (zasada z modułu 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bronisz duży blind. Sprawdziłeś c-bet Buttona na flopie. Turn to dwójka, czekasz, a Button stawia {{n:ex.bet.three-quarters}} do puli {{n:ex.pot}}. Co robisz?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "Pasuję", correct: true, why: "Masz tylko gutshot (walet): ok. {{n:odds.gutshot.turn-river}} na riverze, a potrzebujesz {{n:eq.bet-three-quarters}}. Bez pary i z jedną kartą do końca ta ręka nie broni się przed drugą beczką." }
      - { text: "Sprawdzam", why: "Cena jest kilka razy wyższa niż twoja szansa: {{n:eq.bet-three-quarters}} wobec ok. {{n:odds.gutshot.turn-river}}. Implied odds nie pokryją takiej różnicy." }
      - { text: "Check-raise", why: "Druga beczka to silniejszy zakres niż c-bet: Button częściej ma króla albo lepszą rękę, która nie spasuje. Z {{n:outs.gutshot}} outami to drogi blef." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bronisz duży blind. Sprawdziłeś c-bet Buttona na flopie. Turn to król, czekasz, a Button stawia tylko {{n:ex.bet.quarter}} do puli {{n:ex.pot}}. Co robisz?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Masz otwarte dobieranie do strita (walet albo szóstka): ok. {{n:odds.oesd.turn-river}}. Mały bet wymaga tylko {{n:eq.bet-quarter}}, czyli prawie dokładnie tyle, a po trafieniu możesz jeszcze wygrać na riverze." }
      - { text: "Pasuję", why: "Przy tak małym becie cena jest prawie równa twojej szansie ({{n:eq.bet-quarter}} wobec ok. {{n:odds.oesd.turn-river}}), a implied odds przechylają decyzję na sprawdzenie." }
      - { text: "Przebijam all-in", why: "Ryzykujesz cały stack ręką, która jeszcze nic nie ma, a Button z królem nie spasuje. Przy tak dobrej cenie wystarczy sprawdzić." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Bronisz duży blind. Sprawdziłeś c-bet Buttona na flopie. Turn to piątka, czekasz, a Button stawia {{n:ex.bet.three-quarters}} do puli {{n:ex.pot}}. Co robisz?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Najwyższa para to za dużo, żeby pasować na pustej karcie: wygrywa z półblefami i słabszymi królami. Potrzebujesz {{n:eq.bet-three-quarters}}, a przeciw zakresowi drugiej beczki taka para zwykle ma tyle." }
      - { text: "Pasuję", why: "Za ciasno. Druga beczka jest silniejsza niż c-bet, ale Button stawia ją też dobieraniami i blefami. Najwyższa para bije je wszystkie." }
      - { text: "Przebijam", why: "Po przebiciu gorsze ręce spasują, a zapłacą lepsze króle i sety. Najwyższa para ze średnim kickerem nie jest ręką do przebicia." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Dlaczego przeciw drugiej beczce bronisz węziej niż przeciw c-betowi na flopie?"
    table: { position: BB }
    options:
      - { text: "Bo drugą beczkę rywal stawia węższym i silniejszym zakresem, a dobierania mają już tylko jedną kartę", correct: true, why: "Tak: część blefów rywal odpuszcza na turnie, a twoje dobierania tracą połowę szans. Słabe pary i ręce bez outów pasujesz częściej niż na flopie." }
      - { text: "Bo na turnie trzeba oszczędzać żetony", why: "Liczy się wartość oczekiwana każdej decyzji, nie oszczędzanie. Bronisz węziej, bo rywal betuje silniejszymi rękami." }
      - { text: "Nie, bronisz szerzej, bo wpłaciłeś już dużo żetonów", why: "To, co już wpłaciłeś, nie wraca. Decyzję podejmujesz na podstawie ceny teraz i siły zakresu rywala." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Turn. Rywal stawia {{n:ex.bet.three-quarters}} do puli {{n:ex.pot}}. Ile wynosi MDF? Wpisz liczbę w procentach."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "MDF = pula ÷ (pula + bet) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Na turnie, tak jak na flopie, bronisz mniej: blefy rywala mają jeszcze outy, a ty bez pozycji nie zrealizujesz całego equity."
---
Na turnie spotkasz dwie nowe sytuacje: Button nie zrobił c-betu i czekał, albo zrobił c-bet i betuje drugi raz. W pierwszej możesz zaatakować sam, w drugiej bronisz się węziej niż na flopie.

## Probe bet

Probe bet to zakład bez pozycji na turnie po tym, jak agresor przed flopem czekał na flopie. Button z wieloma silnymi rękami zrobiłby c-bet, więc po czekaniu ma ich mniej. Jego zakres jest słabszy i możesz go zaatakować.

- **Częściej na niskich stołach**, np. [[8c 5d 2s 3h]]: niskie karty trafiają twoją szeroką obronę.
- **Rzadziej na wysokich**, np. [[Ac Kd 8h Js]]: przewaga zakresu zostaje po stronie Buttona.

## Czym probe betować

- **parami**, które chcą zapłaty od wysokich kart Buttona i nie chcą dawać mu darmowej karty,
- **mocnymi dobieraniami**, które wygrywają na dwa sposoby.

Ręce bez pary i bez outów czekają.

## Obrona przed drugą beczką

Gdy sprawdziłeś c-bet, a Button betuje drugi raz, jego zakres jest węższy i silniejszy niż na flopie: część blefów odpuścił. Twoje dobierania mają już tylko jedną kartę. Dlatego:

- dobierania sprawdzają tylko przy dobrej cenie albo z implied odds (poprzednia lekcja),
- ręce bez outów i najsłabsze pary częściej pasują,
- najwyższa para zwykle nadal sprawdza.

MDF pozostaje punktem odniesienia, nie obowiązkiem: przy becie 3/4 puli wynosi {{n:mdf.bet-three-quarters}}, ale na turnie, tak jak na flopie, bronisz mniej.

:::note Skąd te zasady
Zasady probe betu i obrony przed drugą beczką to heurystyki z literatury (GTO Wizard, Upswing, PokerCoaching). Aplikacja nie podaje częstotliwości w procentach. Liczby o tym, czym gracze mikrostawek stawiają probe bety, wymagają sprawdzonego źródła z opisaną populacją, więc na razie ich tu nie ma.
:::
