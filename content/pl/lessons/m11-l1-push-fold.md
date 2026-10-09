---
id: m11.l1
module: m11
order: 1
title: "Krótki stack: all-in albo pas"
sub: "Kiedy podbicie zamienia się w all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Turniej}}. Masz {{n:m11.depth.10}}, wszyscy przed tobą {{t:fold|spasowali}}. Jaki plan gry jest prosty i sprawdzony w źródłach?"
    options:
      - { text: "All-in albo {{t:fold}}", correct: true, why: "Przy ok. {{n:m11.thr.pushfold}} lub mniej źródła zgodnie zalecają push/fold. Podbicie i {{t:fold}} po {{t:raise|przebiciu}} oddałoby za dużo stacku, a all-in wyciska z niego najwięcej {{t:fold|pasów}} rywala." }
      - { text: "Podbicie do {{n:pf.open-size}}, a po {{t:raise|przebiciu}} decyzja", why: "Po takim podbiciu zostaje ci niewiele za {{t:pot|pulą}}, więc wobec {{t:raise|przebicia}} all-in i tak jesteś prawie zmuszony {{t:call|sprawdzić}}. Rywal nie musi {{t:fold|pasować}}, a ty tracisz fold equity." }
      - { text: "{{t:call|Sprawdzam}} blind (limp) i patrzę na flop", why: "Limp nie daje szansy zgarnięcia {{t:pot|puli}} od razu. Solvery z pełnym wyborem akcji czasem limpują, ale to strategia dla zaawansowanych; prosty i bezpieczny plan to all-in albo {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Masz {{n:m11.thr.raise}} lub więcej i {{t:open|otwierasz}} grę jako pierwszy. Co robisz z ręką, którą chcesz zagrać?"
    options:
      - { text: "Zwykle podbijam (np. minimalnie)", correct: true, why: "Przy ponad ok. {{n:m11.thr.raise}} źródła zalecają zwykłe podbicie: masz jeszcze miejsce, żeby {{t:fold|spasować}} na {{t:raise}} albo grać po flopie." }
      - { text: "Zawsze all-in", why: "All-in z tak dużym stackiem ryzykuje dużo, żeby wygrać tylko blindy. {{t:fold|Pasują}} ci słabsze ręce, a płacą lepsze." }
      - { text: "Push/fold jak przy {{n:m11.thr.pushfold}}", why: "Push/fold to narzędzie dla {{t:short-stack|short stacku}}: do ok. {{n:m11.thr.pushfold}}, a dla słabszych rąk do ok. {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Masz {{n:m11.m.stack}} {{t:chips|żetonów}}. Blindy to {{n:m11.m.sb}}/{{n:m11.m.bb}}, a {{t:big-blind}} wpłaca jeszcze ante {{n:m11.m.ante}}. Ile wynosi twoje M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. Tyle okrążeń przetrwasz bez gry. W {{t:big-blind|dużych blindach}} to {{n:m11.m.bbs}}, ale M liczy też ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Twoje M spadło do ok. {{n:m11.m.example}}. Co mówi o tym model stref M?"
    options:
      - { text: "{{t:red-zone|Strefa czerwona}}: tylko all-in albo {{t:fold}}, najlepiej jako pierwszy", correct: true, why: "Poniżej ok. {{n:m11.m.red}} (źródła różnią się granicą: {{n:m11.m.red}} albo {{n:m11.m.red-alt}}) zostaje ci tylko all-in albo {{t:fold}}. Wejście pierwszy daje szansę, że wszyscy {{t:fold|spasują}}." }
      - { text: "{{t:green-zone|Strefa zielona}}: grasz normalnie", why: "Zielona strefa zaczyna się dopiero od M ok. {{n:m11.m.green}}. Przy M ok. {{n:m11.m.example}} stack starczy na {{n:m11.m.example}} okrążenia." }
      - { text: "Czekasz na asy, bo i tak masz czas", why: "Przy M ok. {{n:m11.m.example}} blindy zjedzą stack, zanim doczekasz się silnej ręki. Trzeba wejść all-in z szerszym {{t:range|zakresem}}." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Masz {{n:m11.depth.10}} na {{t:small-blind|małym blindzie}}, wszyscy {{t:fold|spasowali}}. Pomaluj ręce, z którymi wchodzisz all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Mały blind}}, wszyscy {{t:fold|spasowali}}, masz K2o. Przy {{n:m11.depth.10}} solver wchodzi z tą ręką all-in. A przy {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Pasuje}}", correct: true, why: "Przy {{n:m11.depth.15}} ryzykujesz więcej względem blindów, więc {{t:range}} all-inu zwęża się z ok. {{n:m11.push.10}} do ok. {{n:m11.push.15}} rąk. K2o z niego wypada." }
      - { text: "All-in, bo król to silna karta", why: "Przy {{n:m11.depth.15}} K2o za często trafia na lepszego króla albo asa w {{t:range|zakresie}} {{t:call|sprawdzenia}}. Solver ją {{t:fold|pasuje}}." }
      - { text: "All-in, bo im głębszy stack, tym szerzej", why: "Odwrotnie: im głębszy stack, tym węższy {{t:range}} all-inu. Najszerzej {{t:shove|pushujesz}} przy bardzo {{t:short-stack|short stacku}}." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Mały blind}}, {{n:m11.depth.10}}, bez ante. Ile razy na sto {{t:big-blind}} musiałby {{t:fold|spasować}}, żeby all-in ręką bez żadnych szans wyszedł na zero?"
    options:
      - { text: "Ponad {{n:m11.push.10.alpha}}", correct: true, why: "Ryzykujesz {{n:m11.push.10.risk}}, żeby wygrać {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) to ok. {{n:m11.push.10.alpha}}. Rywal tyle nie {{t:fold|pasuje}}, więc all-in opłaca się tylko ręką, która ma też equity, gdy rywal {{t:call|sprawdzi}}." }
      - { text: "Ponad połowę", why: "Połowa wystarczałaby, gdybyś ryzykował tyle, ile możesz wygrać. Tu ryzykujesz {{n:m11.push.10.risk}}, a wygrywasz tylko {{n:m11.push.10.win}} blindów." }
      - { text: "Wystarczy, że czasem {{t:fold|spasuje}}", why: "Każde {{t:call}} kosztuje rękę bez szans cały stack. Bez equity potrzebujesz bardzo częstych {{t:fold|pasów}}: ponad {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Dlaczego z {{t:short-stack|short stackiem}} wolisz wejść all-in pierwszy, niż {{t:check|czekać}}, aż ktoś inny wejdzie all-in, i {{t:call|sprawdzić}}?"
    options:
      - { text: "Bo all-in wygrywa na dwa sposoby", correct: true, why: "Wchodząc pierwszy, zgarniasz {{t:pot|pulę}}, gdy wszyscy {{t:fold|spasują}}, albo wygrywasz na showdownie. {{t:call|Sprawdzając}}, wygrywasz tylko na showdownie." }
      - { text: "Bo all-in ma zawsze więcej equity", why: "Equity ręki nie zależy od tego, kto wszedł pierwszy. Różnica jest w tym, że all-in daje rywalowi szansę {{t:fold|spasować}}." }
      - { text: "Bo {{t:call|sprawdzanie}} all-inu jest zabronione", why: "{{t:call|Sprawdzać}} wolno, ale do {{t:call|sprawdzenia}} potrzebujesz silniejszej ręki (lekcja o {{t:call|sprawdzaniu}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Ten sam stack {{n:m11.depth.10}} na {{t:small-blind|małym blindzie}}, ale {{t:big-blind}} wpłacił ante {{n:m11.ante}}. Jak zmienia się {{t:range}} all-inu?"
    options:
      - { text: "Rośnie: ok. {{n:m11.push.10-ante}} zamiast {{n:m11.push.10}}", correct: true, why: "Ante powiększa {{t:pot|pulę}}, którą zgarniasz, gdy rywal {{t:fold|spasuje}}: {{n:m11.push.10.win-ante}} zamiast {{n:m11.push.10.win}}. Ręka bez szans potrzebuje już tylko ponad {{n:m11.push.10.alpha-ante}} {{t:fold|pasów}}, więc opłaca się więcej all-inów." }
      - { text: "Maleje, bo rywal ma więcej w {{t:pot|puli}} i częściej {{t:call|sprawdzi}}", why: "Rywal rzeczywiście {{t:call|sprawdza}} szerzej, ale większa {{t:pot}} do zgarnięcia przeważa. Solver {{t:shove|pushuje}} ok. {{n:m11.push.10-ante}} rąk." }
      - { text: "Nie zmienia się", why: "Ante zmienia stosunek ryzyka do nagrody. Bez ante ok. {{n:m11.push.10}}, z ante ok. {{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
W {{t:tournament|turnieju}} blindy rosną, a stack nie. Prędzej czy później masz go tak mało, że zwykłe podbicie przestaje działać. Wtedy wchodzi strategia **push/fold**: z każdą ręką, którą grasz, robisz {{t:shove|push}}, czyli wchodzisz all-in, a resztę {{t:fold|pasujesz}}.

## Kiedy all-in albo {{t:fold}}

Stack liczysz w {{t:big-blind|dużych blindach}}. Źródła zgadzają się co do jednego: przy ok. **{{n:m11.thr.pushfold}} lub mniej** grasz już prawie wyłącznie all-in albo {{t:fold}}.

| Stack | Co zwykle robisz |
|---|---|
| ok. {{n:m11.thr.pushfold}} lub mniej | all-in albo {{t:fold}} |
| od {{n:m11.thr.pushfold}} do {{n:m11.thr.upper}} | push/fold dla słabszych i średnich rąk |
| ponad ok. {{n:m11.thr.raise}} | zwykłe podbicie |

Dlaczego nie podbicie? Gdy masz {{n:m11.depth.10}} i podbijesz do {{n:pf.open-size}}, zostaje ci tak mało za {{t:pot|pulą}}, że na {{t:raise}} all-in i tak prawie musisz {{t:call|sprawdzić}}. Rywal wie, że nie {{t:fold|spasujesz}}, więc nie musi się bać. All-in od razu wyciska ze stacku najwięcej **fold equity**, czyli zysku z tego, że rywal {{t:fold|spasuje}}.

:::note Uproszczenie
Push/fold to uproszczenie. Solvery, które mają do wyboru także limp i małe podbicie, przy {{n:m11.depth.10}} część rąk limpują albo podbijają minimalnie. All-in albo {{t:fold}} jest jednak prosty, trudno w nim popełnić duży błąd i źródła polecają go jako punkt wyjścia.
:::

## M: ile okrążeń przetrwasz

Popularny model turniejowy liczy {{t:short-stack}} inaczej: **M** to stack podzielony przez koszt jednego okrążenia {{t:board|stołu}}.

```formula
M = stack ÷ (mały blind + duży blind + ante)
```

Przykład: masz {{n:m11.m.stack}} {{t:chips|żetonów}}, blindy {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}} {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. W {{t:big-blind|dużych blindach}} to {{n:m11.m.bbs}}, ale M uwzględnia też ante. Poniżej M ok. {{n:m11.m.red}} ({{t:red-zone}}; źródła podają granicę {{n:m11.m.red}} albo {{n:m11.m.red-alt}}) zostaje ci już tylko all-in albo {{t:fold}}.

## Im krótszy stack, tym szerzej

Siatki w tej lekcji policzył solver tej aplikacji dla najprostszej sytuacji: wszyscy {{t:fold|spasowali}}, grasz z {{t:small-blind|małego blinda}} przeciw {{t:big-blind|dużemu blindowi}}, a każdy może tylko wejść all-in albo {{t:fold|spasować}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Przy {{n:m11.depth.15}} wchodzisz all-in z ok. {{n:m11.push.15}} rąk, przy {{n:m11.depth.10}} z ok. {{n:m11.push.10}}, a przy {{n:m11.depth.5}} już z ok. {{n:m11.push.5}}. Im mniej ryzykujesz względem blindów, tym więcej rąk się opłaca. Dla porównania tabela z serwisu szkoleniowego podaje przy {{n:m11.depth.10}} {{n:m11.ext.push.10}}; różnica wynika z innego sposobu liczenia, kierunek jest ten sam.

## Trzech graczy: im więcej rywali za tobą, tym węziej

Gdy grasz z Buttona, za tobą są jeszcze dwaj gracze, a nie jeden. Każdy z nich może mieć silną rękę, więc {{t:fold|pasy}} obu zdarzają się rzadziej. Przy trzech graczach i stackach po {{n:m11.depth.3max}} Button wchodzi all-in z ok. {{n:m11.3max.push.btn}} rąk, a {{t:small-blind}}, gdy Button {{t:fold|spasował}}, z ok. {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Te dwie siatki sprawdziliśmy z opublikowanym wynikiem równowagi dla tej samej sytuacji (praca naukowa z 2008 roku: Button {{n:m11.gs.btn}}). Kilka rąk, w których wyniki się różnią, nie trafia do ćwiczeń.

## Dwa sposoby na wygraną

All-in wygrywa, gdy rywal {{t:fold|spasuje}}, albo gdy {{t:call|sprawdzi}} i przegra na showdownie. Sam {{t:fold}} rywala rzadko wystarcza: przy {{n:m11.depth.10}} ryzykujesz {{n:m11.push.10.risk}}, żeby zgarnąć {{n:m11.push.10.win}} blindów, więc ręka bez szans potrzebowałaby {{t:fold|pasów}} w ponad {{n:m11.push.10.alpha}} przypadków. Dlatego liczy się i fold equity, i equity ręki, gdy rywal {{t:call|sprawdzi}}.

## Ante poszerza {{t:range}}

Ante to dodatkowe {{t:chips}} w {{t:pot|puli}} przed rozdaniem. Gdy {{t:big-blind}} wpłaca ante {{n:m11.ante}}, all-in zgarnia {{n:m11.push.10.win-ante}} zamiast {{n:m11.push.10.win}}, a ryzyko zostaje to samo. {{t:range|Zakres}} rośnie z ok. {{n:m11.push.10}} do ok. {{n:m11.push.10-ante}} rąk.

```range
push.sb-10-ante
```
