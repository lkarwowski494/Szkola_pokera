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
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Flop: [[Ks 7d 2c]]. Kto ma przewagę zakresu?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Ty, otwierający z Buttona", correct: true, why: "Tak: masz w zakresie wszystkie KK, AK i KQ. Duży blind najsilniejsze z nich przebiłby przed flopem, a jego szeroka obrona to w większości ręce, które tu chybiły." }
      - { text: "Duży blind", why: "Nie: duży blind ma więcej słabych rąk, bo bronił się szeroko. Króla z dobrym kickerem ma rzadziej niż ty." }
      - { text: "Nikt, flop jest losowy", why: "Flop jest losowy, ale zakresy nie są. Ten sam flop pasuje lepiej do zakresu, w którym jest więcej wysokich kart." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Flop: [[7s 6h 5d]]. Kto częściej ma tu bardzo silną rękę (dwie pary, seta, strita)?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Duży blind", correct: true, why: "Tak: duży blind broni wielu łączników w kolorze, małych par i rąk z szóstką albo siódemką. Ty z Buttona masz więcej wysokich kart, które tu chybiły. To przewaga orzechowa dużego blinda." }
      - { text: "Ty, otwierający z Buttona", why: "Nie: twój zakres jest pełen wysokich kart. Masz więcej nadpar (np. TT, JJ), ale mniej dwóch par, setów i stritów." }
      - { text: "Obaj tak samo często", why: "Nie: zakresy różnią się składem. Szeroka obrona dużego blinda ma dużo małych kart, a twój zakres wysokie." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Dlaczego duży blind, który tylko sprawdził twoje otwarcie, rzadko ma AA albo AK na flopie [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Bo z tymi rękami najczęściej przebija przed flopem (3-bet)", correct: true, why: "Tak: najsilniejsze ręce duży blind gra 3-betem, więc po samym sprawdzeniu jego zakres ma mało najlepszych rąk. Ty masz w zakresie wszystkie." }
      - { text: "Bo duży blind nigdy nie gra asów", why: "Nie: duży blind broni wielu asów, np. A5 czy A9. Brakuje mu głównie tych najsilniejszych, które przebiłby." }
      - { text: "Bo na flopie leży już jeden as", why: "As na stole zmniejsza liczbę kombinacji asów u obu graczy po równo. Różnica w zakresach bierze się z decyzji przed flopem." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Masz przewagę zakresu, ale rywal ma tyle samo najsilniejszych rąk co ty. Jakim rozmiarem raczej betujesz?"
    options:
      - { text: "Mało, i to często", correct: true, why: "Tak: przewaga zakresu mówi, że możesz betować często. Bez przewagi orzechowej duży zakład ryzykuje dużo przeciw najsilniejszym rękom rywala, a słabsze ręce i tak pasują na mały." }
      - { text: "Dużo, bo masz przewagę", why: "Nie: o dużym rozmiarze decyduje przewaga orzechowa, czyli więcej najsilniejszych rąk. Tu jej nie masz." }
      - { text: "Zawsze czekam", why: "Za ostrożnie: przewaga zakresu to powód, żeby betować często, tylko mało." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "W twoim zakresie jest dużo więcej najsilniejszych rąk niż w zakresie rywala. Co ci to daje?"
    options:
      - { text: "Możesz betować dużo, bo rzadko trafisz na lepszą rękę", correct: true, why: "Tak: to przewaga orzechowa. Duży zakład wyciąga więcej z rąk średnich rywala, a przebicie od lepszej ręki zdarza się rzadko." }
      - { text: "Musisz zawsze betować mało", why: "Nie: mały rozmiar wybierasz, gdy masz tylko przewagę zakresu. Przewaga orzechowa pozwala betować więcej." }
      - { text: "Nic, liczy się tylko twoja ręka", why: "Twoja ręka jest ważna, ale rywal widzi tylko twój zakres. Rozmiar zakładu wybiera się tak, żeby pasował do wielu rąk naraz." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Rywal ma dwie karty różnej rangi, np. [[Jc Td]]. W ilu procentach przypadków flop nie sparuje żadnej z nich? Wpisz liczbę."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Spośród {{n:cards.unseen.preflop}} nieznanych kart parę dają tylko {{n:pair.outs.unpaired}}: po trzy pozostałe walety i dziesiątki. Flop to {{n:cards.board.flop}} karty, a szansa, że żadna nie będzie z tych {{n:pair.outs.unpaired}}, to ok. {{n:flop.miss.unpaired}}. Parę trafisz więc tylko w ok. {{n:flop.hit.unpaired}} przypadków."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Ręka bez pary nie trafia pary na flopie w ok. {{n:flop.miss.unpaired}} przypadków. Co z tego wynika dla c-betu?"
    options:
      - { text: "Rywal często nie ma nic, więc nawet mały zakład często wygrywa pulę od razu", correct: true, why: "Tak: to podstawa c-betu. Chybienie nie zawsze oznacza pas (rywal może mieć dobieranie albo wysokie karty), ale słabych rąk w jego zakresie jest dużo." }
      - { text: "Rywal spasuje dokładnie w {{n:flop.miss.unpaired}} przypadków", why: "Nie: rywal bez pary czasem sprawdza z dobieraniem albo z wysoką kartą, a czasem ma parę z ręki. To tylko przybliżenie, jak często flop go nie trafił." }
      - { text: "Ty też chybiasz tak samo często, więc c-bet nie ma sensu", why: "Nie: ty też często chybiasz, ale rywal nie wie, kiedy. Twój zakres jako agresora jest silniejszy na wielu flopach, a zakład wygrywa pulę, gdy rywal pasuje." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "A w ilu procentach przypadków flop sparuje co najmniej jedną z dwóch kart ręki bez pary? Wpisz liczbę."
    answer: flop.hit.unpaired
    explanation: "To dopełnienie poprzedniej liczby: {{n:prob.certain}} minus {{n:flop.miss.unpaired}} to ok. {{n:flop.hit.unpaired}}, czyli mniej więcej co trzeci flop."
---
Przed flopem zakresy graczy wyglądają różnie. Otwierający z Buttona ma wiele wysokich kart. Duży blind broni bardzo szeroko, ale najsilniejsze ręce (AA, KK, AK) przeważnie przebija, więc po samym sprawdzeniu ma ich mało. Flop pasuje lepiej do jednego z tych zakresów i to decyduje, kto może betować często.

## Przewaga zakresu

Masz przewagę zakresu, gdy na danym flopie twoje ręce są średnio silniejsze niż ręce rywala. Na [[Ks 7d 2c]] po otwarciu z Buttona to ty masz więcej króli z dobrym kickerem i więcej wysokich par. Duży blind ma tu dużo rąk, które chybiły.

Na niskim, połączonym flopie, np. [[7s 6h 5d]], jest odwrotnie. Duży blind broni wielu łączników w kolorze i małych par, więc częściej ma dwie pary, seta albo strita.

## Przewaga orzechowa

Przewaga orzechowa to więcej najsilniejszych rąk („orzechów”) w zakresie. Przewaga zakresu mówi, jak często możesz betować. Przewaga orzechowa mówi, jak dużo: gdy masz dużo więcej najsilniejszych rąk niż rywal, możesz betować większym rozmiarem. Gdy masz tylko przewagę zakresu, betujesz mało.

## Rywal zwykle chybia

Ręka bez pary, np. [[Jc Td]], nie trafia pary na flopie w ok. {{n:flop.miss.unpaired}} przypadków. Spośród {{n:cards.unseen.preflop}} nieznanych kart tylko {{n:pair.outs.unpaired}} paruje jej karty. Dlatego zakład na flopie często wygrywa pulę od razu, nawet gdy sam niczego nie trafiłeś. Chybienie nie zawsze oznacza pas: rywal może mieć dobieranie albo dwie wysokie karty.

:::note Skąd te zasady
Pojęcia przewagi zakresu i przewagi orzechowej pochodzą z GTO Wizard (słownik i artykuł o rozmiarach c-betu). Liczby w tej lekcji to dokładne obliczenia aplikacji.
:::
