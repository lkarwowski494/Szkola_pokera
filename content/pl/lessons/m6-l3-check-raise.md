---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Kiedy przebić c-bet i do ilu"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Dwie pary na niskim, połączonym flopie to ręka dla wartości. Na takich flopach duży blind ma więcej najsilniejszych układów niż Button. Przebiciem budujesz pulę i każesz płacić parom i dobieraniom." }
      - { text: "Sprawdzam", why: "Nie jest to duży błąd, ale tracisz wartość i ochronę: wiele kart na turnie (czwórka, ósemka, dziewiątka, pary na stole) osłabia twoją rękę albo zatrzymuje akcję." }
      - { text: "Pasuję", why: "Dwie pary to jedna z najsilniejszych rąk na tym flopie. Pas to duży błąd." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W puli jest {{n:ex.third.pot}}, Button stawia c-bet {{n:ex.third.bet}}. Masz seta i chcesz zrobić check-raise. Do ilu przebijasz?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Do {{n:xr.example}}", correct: true, why: "To {{n:xr.mult.example}} c-betu. Button musi dopłacić {{n:xr.example.extra}} i potrzebuje do sprawdzenia ok. {{n:eq.vs-xr.example}} equity, więc dobierania płacą drogo, a gorsze pary nie mają dobrej ceny." }
      - { text: "Do {{n:xr.too-small}}", sizeError: true, why: "Dobra akcja, ale za mały rozmiar: Button dopłaca tylko {{n:xr.too-small.extra}} i potrzebuje ok. {{n:eq.vs-xr.too-small}} equity. Każde dobieranie do koloru albo strita zapłaci prawie za darmo." }
      - { text: "Sprawdzam", why: "Na flopie z dwoma kierami i kartami do strita tracisz wartość i ochronę: wiele kart na turnie zatrzyma akcję albo pobije twoją rękę. Set chce budować pulę od razu." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W puli jest {{n:ex.third.pot}}, Button stawia c-bet {{n:ex.third.bet}}. Robisz check-raise na {{n:xr.mult.example}} c-betu. Do ilu przebijasz? Wpisz liczbę żetonów."
    table: { position: BB }
    answer: xr.example
    explanation: "C-bet to {{n:ex.third.bet}}, więc {{n:xr.mult.example}} c-betu to {{n:xr.example}}. Rozmiar check-raise'u liczysz od c-betu, nie od puli."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W puli było {{n:ex.third.pot}}, Button postawił {{n:ex.third.bet}}, a ty przebiłeś do {{n:xr.example}}. Ile procent equity potrzebuje Button, żeby sprawdzić? Wpisz liczbę."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Button dopłaca {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. W puli jest wtedy {{n:xr.example.pot-after}}, a po jego sprawdzeniu o {{n:xr.example.extra}} więcej. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "W puli było {{n:ex.third.pot}}, Button postawił {{n:ex.third.bet}}, a ty przebiłeś tylko do {{n:xr.too-small}}. Ile equity potrzebuje Button, żeby sprawdzić?"
    table: { position: BB }
    options:
      - { text: "Ok. {{n:eq.vs-xr.too-small}}", correct: true, why: "Dopłaca {{n:xr.too-small.extra}} do puli {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. Tak tanio zapłaci prawie każdą ręką, dlatego przebicie ma być kilka razy większe niż c-bet." }
      - { text: "Ok. {{n:eq.vs-xr.example}}", why: "Tyle potrzebowałby przy przebiciu do {{n:xr.example}}. Przy {{n:xr.too-small}} dopłaca tylko {{n:xr.too-small.extra}}." }
      - { text: "Ok. {{n:eq.bet-third}}", why: "Tyle potrzebowałeś ty, żeby sprawdzić c-bet. Po check-raise'ie liczysz cenę Buttona: dopłaca {{n:xr.too-small.extra}} do puli {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Dobieranie do najlepszego koloru to dobry półblef: wygrywasz, gdy Button spasuje, a gdy zapłaci, nadal masz {{n:outs.flush}} outów (ok. {{n:odds.flush.flop-river}} do rivera)." }
      - { text: "Sprawdzam", correct: true, why: "Też dobre: przy cenie {{n:eq.bet-third}} sprawdzenie dobieraniem do koloru się opłaca. Mocne dobierania grasz w obu wariantach, żeby twój check-raise nie oznaczał samych silnych rąk." }
      - { text: "Pasuję", why: "Duży błąd: {{n:outs.flush}} outów do najlepszego koloru to dużo więcej niż potrzebne {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Otwarte dobieranie do strita ({{n:outs.oesd}} outów) na niskim flopie, który lepiej pasuje do zakresu dużego blinda. Przebiciem możesz wygrać od razu, a gdy dostaniesz sprawdzenie, nadal możesz trafić." }
      - { text: "Sprawdzam", correct: true, why: "Też dobre: przy cenie {{n:eq.bet-third}} dobieranie z {{n:outs.oesd}} outami spokojnie sprawdza. Część mocnych dobierań sprawdzasz, żeby twoje sprawdzenia nie były same słabe." }
      - { text: "Pasuję", why: "Za ciasno: {{n:outs.oesd}} outów to ok. {{n:odds.oesd.flop-river}} do rivera, dużo więcej niż potrzebne {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "Sprawdzam", correct: true, why: "Najwyższa para ze słabym kickerem to ręka do sprawdzania. Wygrywa z blefami Buttona, a sprawdzeniem trzymasz je w grze." }
      - { text: "Check-raise", why: "Po przebiciu Button pasuje gorszymi rękami, a płaci lepszymi królami (AK, KQ, KJ) i setami. Średnio silną rękę zamieniasz w blef." }
      - { text: "Pasuję", why: "Najwyższa para wobec małego c-betu to zdecydowanie za dużo, żeby pasować." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-009]
    prompt: "Bronisz duży blind przeciw otwarciu Buttona. Na flopie czekasz, Button stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "Nie masz pary ani dobierania do koloru, a do strita brakuje dwóch kart. Flop z asem i królem pasuje do zakresu Buttona, więc blef check-raise'em ma tu małe szanse." }
      - { text: "Check-raise jako blef", why: "Na flopach z asem i królem przewaga jest po stronie Buttona: ma dużo asów i królów, które nie spasują. Blefy w check-raise'ach lepiej robić na niskich flopach i z prawdziwym dobieraniem." }
      - { text: "Sprawdzam", why: "Cena jest dobra, ale ta ręka prawie nic nie trafi: nawet para szóstek albo piątek przegrywa z większością rąk, którymi Button zapłaci dalej." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Wobec którego c-betu Buttona robisz check-raise częściej?"
    table: { position: BB }
    options:
      - { text: "1/4 puli", correct: true, why: "Mały c-bet daje tanią okazję do przebicia, a Button stawia go szerokim zakresem z wieloma słabymi rękami. Wobec dużego c-betu ręce do check-raise'u są te same, ale grasz je tak rzadziej." }
      - { text: "Cała pula", why: "Wobec dużego c-betu przebicie kosztuje dużo, a zakres Buttona jest silniejszy. Częściej sprawdzasz albo pasujesz." }
      - { text: "Tak samo często", why: "Rodzaj rąk do check-raise'u się nie zmienia, ale częstość tak: wobec małych c-betów przebijasz częściej." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Grasz z Buttonem, który na flopie prawie nigdy nie pasuje. Stawia c-bet 1/3 puli. Co robisz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "Sprawdzam", correct: true, why: "Gutshot z wysoką kartą to dobre sprawdzenie przy cenie {{n:eq.bet-third}}. Check-raise blefem zarabia na pasach, a ten rywal prawie nie pasuje, więc przebicie traci swoją główną zaletę." }
      - { text: "Check-raise", why: "Wobec typowego gracza to możliwy półblef. Ale blef zarabia na pasach, a ten rywal prawie nie pasuje. Wobec niego przebijasz głównie dla wartości." }
      - { text: "Pasuję", why: "Za ciasno: dobieranie z wysoką kartą przy tak dobrej cenie się broni, niezależnie od tego, z kim grasz." }
---
Check-raise to czekanie, a potem przebicie zakładu rywala. Z dużego blinda to twoja główna broń wobec c-betów: bez niej Button mógłby c-betować tanio prawie każdą ręką.

## Po co przebijać

Check-raise robisz z dwóch powodów:

- **dla wartości**: masz bardzo silną rękę (dwie pary, set) i chcesz zbudować pulę,
- **jako półblef**: masz mocne dobieranie, które wygrywa na dwa sposoby: gdy Button spasuje albo gdy trafisz.

Średnie ręce, np. najwyższą parę ze słabym kickerem, zwykle sprawdzasz. Po przebiciu gorsze ręce Buttona spasują, a zapłacą lepsze.

## Kiedy częściej

- **Wobec małego c-betu.** Przebicie jest tanie, a Button stawia mały c-bet szerokim zakresem. Wobec dużego c-betu przebijasz tymi samymi rękami, ale rzadziej.
- **Na niskich, połączonych flopach** (np. [[7h 6d 5s]]). Duży blind broni wielu niskich rąk, więc zwykle ma tu więcej dwóch par, setów i stritów niż Button, czyli przewagę nutsów.
- **Rzadziej na flopach z asem albo królem.** Tam przewagę zakresu ma Button (przypomnienie z M5).

## Jaki rozmiar

Rozmiar check-raise'u liczysz od c-betu. Przykład: w puli jest {{n:ex.third.pot}}, c-bet {{n:ex.third.bet}}. Check-raise na {{n:xr.mult.example}} c-betu to przebicie do {{n:xr.example}}: Button dopłaca {{n:xr.example.extra}} i potrzebuje ok. **{{n:eq.vs-xr.example}}** equity. Przebicie tylko do {{n:xr.too-small}} daje mu cenę ok. **{{n:eq.vs-xr.too-small}}**: zapłaci prawie każdą ręką z jakimkolwiek dobieraniem. Dlatego przebijasz kilka razy więcej niż c-bet, a nie minimalnie.

:::note Rywal, który nie pasuje
Blef w check-raise'ie zarabia na pasach (przypomnij sobie alphę z pierwszej lekcji). Wobec gracza, który na flopie prawie nigdy nie pasuje, przebijasz głównie dla wartości, a blefy zostawiasz dla najmocniejszych dobierań.
:::
