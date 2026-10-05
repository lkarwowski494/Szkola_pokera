---
id: m3.l2
module: m3
order: 2
title: "Ręce startowe"
sub: "Które karty grać przed flopem"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Która ręka jest silniejsza?"
    options:
      - { text: "A♥ K♥ (ten sam kolor)", correct: true, why: "Te same rangi, ale ręka w kolorze ma dodatkową drogę do wygranej przez {{t:flush}}." }
      - { text: "A♥ K♣ (różne kolory)", why: "W różnych kolorach tracisz szansę na {{t:flush}}." }
      - { text: "Są równe", why: "Prawie, ale nie całkiem. Kolor kart ma znaczenie." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Nikt jeszcze nie wszedł do gry. Co robisz?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "7-2 w różnych kolorach to jedna z najsłabszych rąk: karty są za daleko od siebie, żeby razem tworzyć {{t:straight|strita}}, rzadko dają {{t:flush}}, a trafiona {{t:pair}} ma słaby kicker. Często nazywa się ją najgorszą ręką, choć w rachunku wobec losowej ręki niektóre inne, np. 3-2 w różnych kolorach, wypadają jeszcze słabiej." }
      - { text: "{{t:raise|Przebijam}}, żeby zaskoczyć", why: "{{t:bluff|Blef}} preflop z jedną z najsłabszych rąk, gdy za tobą jest jeszcze czterech graczy, traci w długim terminie." }
      - { text: "{{t:call|Sprawdzam}}, bo jest tanio", why: "Każde „tanie” wejście słabą ręką sumuje się w duże straty." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "Gracz przed tobą {{t:raise|przebił}}. Co robisz?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Przebijam}} ponownie (3-bet)", correct: true, why: "Masz najlepszą możliwą rękę. Chcesz wpłacić jak najwięcej i zmniejszyć liczbę rywali." }
      - { text: "Tylko {{t:call|sprawdzam}}", why: "Zaawansowani czasem tak grają dla zmyłki, ale jako zasada tracisz wartość i wpuszczasz innych tanio." }
      - { text: "{{t:fold|Pasuję}}", why: "Asów nigdy nie {{t:fold|pasujesz}} preflop. Wobec każdej innej ręki są faworytem, np. wobec KK mają ok. {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Wszyscy {{t:fold|spasowali}} do ciebie. Co robisz?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Przebijam}}", correct: true, why: "QJ w kolorze to bardzo dobra ręka do ataku na blindy z {{t:position|pozycji}}: trafia {{t:straight|strity}}, kolory i wysokie {{t:pair|pary}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Na Buttonie ta ręka jest za dobra na {{t:fold}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "Lepiej {{t:raise|przebić}}: masz szansę zgarnąć blindy od razu i grasz z {{t:initiative|inicjatywą}}." }
---
Większość pieniędzy początkujący tracą, grając za dużo słabych rąk. Dobra selekcja na starcie to najszybszy sposób, żeby przestać przegrywać.

## Grupy rąk

- **Najmocniejsze**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] oraz AK w kolorze i w różnych kolorach, np. [[As Ks]] i [[As Kd]]. {{t:raise|Przebijasz}}, a gdy ktoś {{t:raise|przebił}} przed tobą, zwykle {{t:raise|przebijasz}} ponownie.
- **Mocne**: JJ, TT, AQ, AJ w kolorze, KQ w kolorze.
- **Spekulacyjne**: małe {{t:pair|pary}} i karty po kolei w jednym kolorze, np. [[7h 6h]]. Dobre w {{t:late-position|późnej pozycji}}.
- **Słabe**: rozrzucone, niskie, w różnych kolorach, np. [[9c 3d]]. {{t:fold|Pas}}.

:::note Ile jest {{t:combo|kombinacji}}
Wszystkich rąk startowych jest {{n:combos.total}} {{t:combo|kombinacji}}, ale tylko {{n:combos.kinds}} rodzajów: {{n:combos.kinds.pair}} {{t:pair|par}}, {{n:combos.kinds.suited}} rąk w kolorze i {{n:combos.kinds.offsuit}} w różnych kolorach. Każda {{t:pair}} to {{n:combos.pair}} {{t:combo|kombinacji}}, ręka w kolorze {{n:combos.suited}}, a w różnych kolorach {{n:combos.offsuit}}. Dlatego AK w różnych kolorach zdarza się trzy razy częściej niż AK w kolorze.
:::

Grupy powyżej to uproszczenie na start. Dokładne {{t:range|zakresy}} {{t:open|otwarć}} dla każdej {{t:position|pozycji}}, w siatce {{t:range|zakresów}}, poznasz w następnej lekcji.
