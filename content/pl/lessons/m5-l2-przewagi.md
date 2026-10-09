---
id: m5.l2
module: m5
order: 2
title: "Komu sprzyja flop"
sub: "Przewaga zakresu i przewaga orzechowa"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Flop: [[Ks 7d 2c]]. Kto ma {{t:range-advantage|przewagę zakresu}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Ty, {{t:open|otwierający}} z Buttona", correct: true, why: "Tak: masz w {{t:range|zakresie}} wszystkie KK, AK i KQ. {{t:big-blind|Duży blind}} najsilniejsze z nich przebiłby przed flopem, a jego szeroka obrona to w większości ręce, które tu chybiły." }
      - { text: "{{t:big-blind|Duży blind}}", why: "Nie: {{t:big-blind}} ma więcej słabych rąk, bo bronił się szeroko. Króla z dobrym kickerem ma rzadziej niż ty." }
      - { text: "Nikt, flop jest losowy", why: "Flop jest losowy, ale {{t:range|zakresy}} nie są. Ten sam flop pasuje lepiej do {{t:range|zakresu}}, w którym jest więcej wysokich kart." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Flop: [[7s 6h 5d]]. Kto częściej ma tu bardzo silną rękę ({{t:two-pair}} albo {{t:straight}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "{{t:big-blind|Duży blind}}", correct: true, why: "Tak: {{t:big-blind}} broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką. Ty z Buttona masz więcej wysokich kart, które tu chybiły. To {{t:nuts-advantage}} {{t:big-blind|dużego blinda}}." }
      - { text: "Ty, {{t:open|otwierający}} z Buttona", why: "Nie: twój {{t:range}} jest pełen wysokich kart. Masz więcej {{t:overpair|overpar}} (np. TT, JJ), ale mniej {{t:two-pair|dwóch par}} i {{t:straight|stritów}}; setów macie podobnie dużo." }
      - { text: "Obaj tak samo często", why: "Nie: {{t:range|zakresy}} różnią się składem. Szeroka obrona {{t:big-blind|dużego blinda}} ma dużo małych kart, a twój {{t:range}} wysokie." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Dlaczego {{t:big-blind}}, który tylko {{t:call|sprawdził}} twoje {{t:open}}, rzadko ma AA albo AK na flopie [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Bo z tymi rękami najczęściej {{t:raise|przebija}} przed flopem (3-bet)", correct: true, why: "Tak: najsilniejsze ręce {{t:big-blind}} gra 3-betem, więc po samym {{t:call|sprawdzeniu}} jego {{t:range}} ma mało najlepszych rąk. Ty masz w {{t:range|zakresie}} wszystkie." }
      - { text: "Bo {{t:big-blind}} nigdy nie gra asów", why: "Nie: {{t:big-blind}} broni wielu asów, np. A5 czy A9. Brakuje mu głównie tych najsilniejszych, które przebiłby." }
      - { text: "Bo na flopie leży już jeden as", why: "As na {{t:board|stole}} zmniejsza liczbę {{t:combo|kombinacji}} asów w obu {{t:range|zakresach}}, ale nie tworzy różnicy między nimi. Różnica bierze się z decyzji przed flopem." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Masz {{t:range-advantage|przewagę zakresu}}, ale rywal ma tyle samo najsilniejszych rąk co ty. Jakim rozmiarem raczej betujesz?"
    options:
      - { text: "Mało, i to często", correct: true, why: "Tak: {{t:range-advantage}} mówi, że możesz betować często. Bez {{t:nuts-advantage|przewagi nutsów}} duży {{t:bet}} ryzykuje dużo przeciw najsilniejszym rękom rywala, a słabsze ręce i tak {{t:fold|pasują}} na mały." }
      - { text: "Dużo, bo masz przewagę", why: "Nie: o dużym rozmiarze decyduje {{t:nuts-advantage}}, czyli więcej najsilniejszych rąk. Tu jej nie masz." }
      - { text: "Zawsze {{t:check|czekam}}", why: "Za ostrożnie: {{t:range-advantage}} to powód, żeby betować często, tylko mało." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "W twoim {{t:range|zakresie}} jest dużo więcej najsilniejszych rąk niż w {{t:range|zakresie}} rywala. Co ci to daje?"
    options:
      - { text: "Możesz betować dużo, bo rzadko trafisz na lepszą rękę", correct: true, why: "Tak: to {{t:nuts-advantage}}. Duży {{t:bet}} wyciąga więcej z rąk średnich rywala, a {{t:raise}} od lepszej ręki zdarza się rzadko." }
      - { text: "Musisz zawsze betować mało", why: "Nie: mały rozmiar wybierasz, gdy masz tylko {{t:range-advantage|przewagę zakresu}}. {{t:nuts-advantage|Przewaga nutsów}} pozwala betować więcej." }
      - { text: "Nic, liczy się tylko twoja ręka", why: "Twoja ręka jest ważna, ale rywal widzi tylko twój {{t:range}}. Rozmiar {{t:bet|zakładu}} wybiera się tak, żeby pasował do wielu rąk naraz." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Rywal ma dwie karty różnej rangi, np. [[Jc Td]]. W ilu procentach przypadków flop nie sparuje żadnej z nich? Wpisz liczbę."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Spośród {{n:cards.unseen.preflop}} nieznanych kart {{t:pair|parę}} dają tylko {{n:pair.outs.unpaired}}: po trzy pozostałe walety i dziesiątki. Flop to {{n:cards.board.flop}} karty, a szansa, że żadna nie będzie z tych {{n:pair.outs.unpaired}}, to ok. {{n:flop.miss.unpaired}}. {{t:pair|Parę}} trafisz więc tylko w ok. {{n:flop.hit.unpaired}} przypadków."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Ręka bez {{t:pair|pary}} nie trafia {{t:pair|pary}} na flopie w ok. {{n:flop.miss.unpaired}} przypadków. Co z tego wynika dla c-betu?"
    options:
      - { text: "Rywal często nie ma nic, więc nawet mały {{t:bet}} często wygrywa {{t:pot|pulę}} od razu", correct: true, why: "Tak: to podstawa c-betu. Chybienie nie zawsze oznacza {{t:fold}} (rywal może mieć {{t:draw}} albo wysokie karty), ale słabych rąk w jego {{t:range|zakresie}} jest dużo." }
      - { text: "Rywal {{t:fold|spasuje}} dokładnie w {{n:flop.miss.unpaired}} przypadków", why: "Nie: rywal bez {{t:pair|pary}} czasem {{t:call|sprawdza}} z {{t:draw|drawem}} albo z wysoką kartą, a czasem ma {{t:pair|parę}} z ręki. To tylko przybliżenie, jak często flop go nie trafił." }
      - { text: "Ty też chybiasz tak samo często, więc c-bet nie ma sensu", why: "Nie: ty też często chybiasz, ale rywal nie wie, kiedy. Twój {{t:range}} jako {{t:aggressor|agresora}} jest silniejszy na wielu flopach, a {{t:bet}} wygrywa {{t:pot|pulę}}, gdy rywal {{t:fold|pasuje}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "A w ilu procentach przypadków flop sparuje co najmniej jedną z dwóch kart ręki bez {{t:pair|pary}}? Wpisz liczbę."
    answer: flop.hit.unpaired
    explanation: "To dopełnienie poprzedniej liczby: {{n:prob.certain}} minus {{n:flop.miss.unpaired}} to ok. {{n:flop.hit.unpaired}}, czyli mniej więcej co trzeci flop."
---
Przed flopem {{t:range|zakresy}} graczy wyglądają różnie. {{t:open|Otwierający}} z Buttona ma wiele wysokich kart. {{t:big-blind|Duży blind}} broni bardzo szeroko, ale najsilniejsze ręce (AA, KK, AK) przeważnie {{t:raise|przebija}}, więc po samym {{t:call|sprawdzeniu}} ma ich mało. Flop pasuje lepiej do jednego z tych {{t:range|zakresów}} i to decyduje, kto może betować często.

## {{t:range-advantage|Przewaga zakresu}}

Masz {{t:range-advantage|przewagę zakresu}}, gdy na danym flopie twoje ręce są średnio silniejsze niż ręce rywala. Na [[Ks 7d 2c]] po {{t:open|otwarciu}} z Buttona to ty masz więcej króli z dobrym kickerem i więcej wysokich {{t:pair|par}}. {{t:big-blind|Duży blind}} ma tu dużo rąk, które chybiły.

Na niskim, {{t:connected|połączonym}} flopie, np. [[7s 6h 5d]], {{t:range-advantage}} prawie znika, a najsilniejsze ręce częściej ma {{t:big-blind}}: broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką, więc częściej ma {{t:two-pair}} albo {{t:straight|strita}}.

## {{t:nuts-advantage|Przewaga nutsów}}

{{t:nuts-advantage|Przewaga nutsów}} to więcej najsilniejszych rąk („{{t:nuts|nutsów}}”) w {{t:range|zakresie}}. {{t:range-advantage|Przewaga zakresu}} mówi, jak często możesz betować. {{t:nuts-advantage|Przewaga nutsów}} mówi, jak dużo: gdy masz dużo więcej najsilniejszych rąk niż rywal, możesz betować większym rozmiarem. Gdy masz tylko {{t:range-advantage|przewagę zakresu}}, betujesz mało.

## Rywal zwykle chybia

Ręka bez {{t:pair|pary}}, np. [[Jc Td]], nie trafia {{t:pair|pary}} na flopie w ok. {{n:flop.miss.unpaired}} przypadków. Spośród {{n:cards.unseen.preflop}} nieznanych kart tylko {{n:pair.outs.unpaired}} paruje jej karty. Źródła podają często ok. {{n:flop.hit.one-pair}}: to szansa na dokładnie jedną {{t:pair|parę}}; z {{t:two-pair|dwiema parami}} i {{t:three-of-a-kind|trójką}} trafienie wynosi ok. {{n:flop.hit.unpaired}}. Dlatego {{t:bet}} na flopie często wygrywa {{t:pot|pulę}} od razu, nawet gdy sam niczego nie trafiłeś. Chybienie nie zawsze oznacza {{t:fold}}: rywal może mieć {{t:draw}} albo dwie wysokie karty.

:::note Skąd te zasady
Pojęcia {{t:range-advantage|przewagi zakresu}} i {{t:nuts-advantage|przewagi nutsów}} pochodzą z materiałów o teorii gry opartych na wynikach solverów (słownik pojęć i artykuł o rozmiarach c-betu). Liczby w tej lekcji to dokładne obliczenia aplikacji.
:::
