---
id: m4.l1
module: m4
order: 1
title: "Gdy ktoś otworzył przed tobą"
sub: "Pas, sprawdzenie czy 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "CO otworzył na {{n:pf.open-size}}. Chcesz przebić z Buttona. Do ilu?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Do {{n:pf.3bet.ip-total}}", correct: true, why: "Z pozycją przebijasz ok. {{n:pf.3bet.size-ip}} otwarcia. To standard, który zostawia dobry stosunek stacka do puli na flopie." }
      - { text: "Do {{n:pf.3bet.too-small}}", why: "Za mało: rywal dostaje świetną cenę, żeby sprawdzić prawie wszystkim i grać dalej." }
      - { text: "Do {{n:pf.3bet.too-big}}", why: "Za dużo jak na grę z pozycją: ryzykujesz więcej, a lepsze ręce rywala i tak nie spasują." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Button otworzył na {{n:pf.open-size}}, mały blind spasował. Chcesz przebić z dużego blinda. Do ilu?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Do {{n:pf.3bet.oop-total}}", correct: true, why: "Bez pozycji przebijasz ok. {{n:pf.3bet.size-oop}} otwarcia. Większy rozmiar odbiera Buttonowi tanie sprawdzenie z pozycją." }
      - { text: "Do {{n:pf.3bet.ip-total}}", why: "To rozmiar dla gracza z pozycją. Bez pozycji dajesz rywalowi zbyt dobrą cenę." }
      - { text: "Tylko sprawdzam", why: "Z KK chcesz budować pulę od razu: to druga najlepsza ręka preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Button otworzył na {{n:pf.open-size}}. Jesteś na małym blindzie. Który plan jest standardem?"
    table: { position: SB }
    options:
      - { text: "Przebijam albo pasuję", correct: true, why: "Po sprawdzeniu grasz bez pozycji, a za tobą jest jeszcze duży blind. Z małego blinda wobec późnych otwarć solvery prawie zawsze przebijają albo pasują." }
      - { text: "Sprawdzam szeroko, bo połowę blinda mam już w puli", why: "Połowa blinda to mało. Sprawdzenie bez pozycji z dużym blindem za plecami słabo realizuje equity: wygrywasz mniejszą część puli, niż wskazuje equity ręki, bo często pasujesz przed showdownem." }
      - { text: "Zawsze pasuję", why: "Za ciasno: Button otwiera bardzo szeroko, więc z silnymi rękami i częścią blefów warto przebijać." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Jesteś na dużym blindzie wobec otwarcia z Buttona. Która z tych rąk jest typowym 3-betem jako blef?"
    table: { position: BB }
    options:
      - { text: "A5 w kolorze", correct: true, why: "Blokuje AA i AK rywala, a po sprawdzeniu ma szansę na kolor i strita. To typowy blef z dołu zakresu sprawdzenia: z dużego blinda 3-betujesz najsilniejsze ręce plus takie blefy." }
      - { text: "K7 w różnych kolorach", why: "Tą ręką bronisz się sprawdzeniem. Jako 3-bet nie blokuje niczego ważnego i słabo gra, gdy rywal sprawdzi." }
      - { text: "Para 22", why: "Najmniejsze pary bronią się sprawdzeniem: zarabiają, gdy trafią seta (trójkę z parą w ręce), a 3-bet z nimi źle znosi 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
---
Gdy ktoś przed tobą otworzył, masz trzy możliwości: pasujesz, sprawdzasz albo przebijasz jeszcze raz. Ponowne przebicie nazywa się 3-betem, bo to trzeci zakład w rozdaniu (blind, otwarcie, przebicie).

## Rozmiar 3-betu

Z pozycją przebijasz do ok. {{n:pf.3bet.size-ip}} otwarcia, czyli przy otwarciu {{n:pf.open-size}} do {{n:pf.3bet.ip-total}}. Bez pozycji, na przykład z blindów wobec otwarcia z CO albo Buttona, do ok. {{n:pf.3bet.size-oop}} otwarcia, czyli {{n:pf.3bet.oop-total}}. Większy rozmiar bez pozycji odbiera rywalowi tanie sprawdzenie, z którym potem grałby z przewagą pozycji.

## Pozycja decyduje, czy sprawdzać

Według rozwiązań GTO Wizard Button wobec otwarcia z CO przebija ok. {{n:pf.3bet-freq.btn-vs-co.low}} rąk, a sprawdza tylko ok. {{n:pf.call-freq.btn-vs-co}}; Preflop Wizard podaje 3-bety w przedziale {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}}. Wobec otwarcia z UTG sprawdzeń jest już nieco więcej niż 3-betów: ok. {{n:pf.call-freq.btn-vs-utg}} wobec {{n:pf.3bet-freq.btn-vs-utg}}. Zakres UTG jest silny, więc 3-bet częściej dostaje 4-bet i rzadziej wygrywa pulę od razu.

```range
vs-open.btn-vs-co
```

Solver aplikacji gra tu {{n:solver.play.btn-vs-co}} rąk Buttona. Jego 3-bety mieszczą się w przedziale ze źródeł, a sprawdzeń jest nieco więcej niż w GTO Wizard.

Z małego blinda prawie zawsze przebijasz albo pasujesz. Sprawdzenie oznacza grę bez pozycji, a duży blind za tobą może jeszcze przebić. Bez pozycji ręka gorzej **realizuje equity**: wygrywa mniejszą część puli, niż wskazuje jej equity, bo częściej pasujesz przed showdownem i trudniej ci wygrać pulę zakładem.

```range
vs-open.sb-vs-btn
```

Według rozwiązania GTO Wizard mały blind wobec Buttona prawie nic nie sprawdza: 3-betuje ok. {{n:pf.3bet-freq.sb-vs-btn}} rąk, górę zakresu (m.in. 77+, AJo+, KQo, A5s, A4s, T9s), a resztę pasuje. Solver aplikacji 3-betuje tu {{n:solver.3bet.sb-vs-btn}} rąk; jego nieliczne sprawdzenia siatka liczy jako pas. W kilku rękach, np. 55, 66 i A9o, solver aplikacji gra inaczej niż GTO Wizard, więc ćwiczenia ich nie oceniają.

## Zakres liniowy czy spolaryzowany

Mając pozycję wobec otwarcia z HJ albo CO, 3-betujesz głównie najlepsze ręce od góry i dokładasz kilka blefów z asami w kolorze (A5s, A4s), a część słabszych rąk, na przykład małe pary i łączniki w kolorze, sprawdzasz: rywal często sprawdza, więc chcesz mieć rękę, która dobrze gra w puli po sprawdzeniu. Źródła nazywają taki zakres różnie: GTO Gecko liniowym, Preflop Wizard spolaryzowanym; ważniejsze jest, które ręce 3-betujesz, a które sprawdzasz.

Z dużego blinda wobec Buttona albo małego blinda 3-betujesz najsilniejsze ręce (TT+, AQ+, AJs+) plus blefy z dołu zakresu sprawdzenia: A5s, czasem A4s, i łączniki w kolorze. Asy w kolorze blokują AA i AK rywala, a gdy dostaną sprawdzenie, wciąż mogą trafić kolor albo strita. Średnie i małe pary, KQo oraz asy w różnych kolorach (AJo–A9o) zwykle tylko sprawdzasz: z dużego blinda wchodzisz tanio i zamykasz akcję, więc te ręce zarabiają więcej po sprawdzeniu. Skład zależy od prowizji i rozmiaru 3-betu, więc 99, KQo i AJo bywają grane różnie.

Z małego blinda grasz inaczej: 3-bet albo pas, z górą zakresu w 3-becie.

:::note Skąd te zasady
Siatki Buttona i małego blinda pochodzą z solvera aplikacji i w przybliżeniu zgadzają się ze źródłami (w małym blindzie poza kilkoma rękami, których ćwiczenia nie oceniają). Jak 3-betować z dużego blinda, uczy reguła oparta na opublikowanych wynikach innych solverów (GTO Wizard, Poker Academy, ThinkGTO, Upswing): skład 3-betów z dużego blinda w solverze aplikacji od nich odbiega.
:::
