---
id: m11.l1
module: m11
order: 1
title: "Krótki stack: all-in albo pas"
sub: "Kiedy podbicie zamienia się w all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Turniej. Masz {{n:m11.depth.10}}, wszyscy przed tobą spasowali. Jaki plan gry jest prosty i sprawdzony w źródłach?"
    options:
      - { text: "All-in albo pas", correct: true, why: "Przy ok. {{n:m11.thr.pushfold}} lub mniej źródła zgodnie zalecają push/fold. Podbicie i pas po przebiciu oddałoby za dużo stacku, a all-in wyciska z niego najwięcej pasów rywala." }
      - { text: "Podbicie do {{n:pf.open-size}}, a po przebiciu decyzja", why: "Po takim podbiciu zostaje ci niewiele za pulą, więc wobec przebicia all-in i tak jesteś prawie zmuszony sprawdzić. Rywal nie musi pasować, a ty tracisz fold equity." }
      - { text: "Sprawdzam blind (limp) i patrzę na flop", why: "Limp nie daje szansy zgarnięcia puli od razu. Solvery z pełnym wyborem akcji czasem limpują, ale to strategia dla zaawansowanych; prosty i bezpieczny plan to all-in albo pas." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Masz {{n:m11.thr.raise}} lub więcej i otwierasz grę jako pierwszy. Co robisz z ręką, którą chcesz zagrać?"
    options:
      - { text: "Zwykle podbijam (np. minimalnie)", correct: true, why: "Przy ponad ok. {{n:m11.thr.raise}} źródła zalecają zwykłe podbicie: masz jeszcze miejsce, żeby spasować na przebicie albo grać po flopie." }
      - { text: "Zawsze all-in", why: "All-in z tak dużym stackiem ryzykuje dużo, żeby wygrać tylko blindy. Pasują ci słabsze ręce, a płacą lepsze." }
      - { text: "Push/fold jak przy {{n:m11.thr.pushfold}}", why: "Push/fold to narzędzie dla krótkiego stacku: do ok. {{n:m11.thr.pushfold}}, a dla słabszych rąk do ok. {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Masz {{n:m11.m.stack}} żetonów. Blindy to {{n:m11.m.sb}}/{{n:m11.m.bb}}, a duży blind wpłaca jeszcze ante {{n:m11.m.ante}}. Ile wynosi twoje M?"
    answer: m11.m.value
    explanation: "M = stack ÷ (mały blind + duży blind + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. Tyle okrążeń przetrwasz bez gry. W dużych blindach to {{n:m11.m.bbs}}, ale M liczy też ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Twoje M spadło do ok. {{n:m11.m.example}}. Co mówi o tym model Harringtona?"
    options:
      - { text: "Strefa czerwona: tylko all-in albo pas, najlepiej jako pierwszy", correct: true, why: "Poniżej ok. {{n:m11.m.red}} (źródła różnią się granicą: {{n:m11.m.red}} albo {{n:m11.m.red-alt}}) zostaje ci tylko all-in albo pas. Wejście pierwszy daje szansę, że wszyscy spasują." }
      - { text: "Strefa zielona: grasz normalnie", why: "Zielona strefa zaczyna się dopiero od M ok. {{n:m11.m.green}}. Przy M ok. {{n:m11.m.example}} stack starczy na {{n:m11.m.example}} okrążenia." }
      - { text: "Czekasz na asy, bo i tak masz czas", why: "Przy M ok. {{n:m11.m.example}} blindy zjedzą stack, zanim doczekasz się silnej ręki. Trzeba wejść all-in z szerszym zakresem." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 4
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Masz {{n:m11.depth.10}} na małym blindzie, wszyscy spasowali. Pomaluj ręce, z którymi wchodzisz all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "Mały blind, wszyscy spasowali, masz K2o. Przy {{n:m11.depth.10}} solver wchodzi z tą ręką all-in. A przy {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "Pasuje", correct: true, why: "Przy {{n:m11.depth.15}} ryzykujesz więcej względem blindów, więc zakres all-inu zwęża się z ok. {{n:m11.push.10}} do ok. {{n:m11.push.15}} rąk. K2o z niego wypada." }
      - { text: "All-in, bo król to silna karta", why: "Przy {{n:m11.depth.15}} K2o za często trafia na lepszego króla albo asa w zakresie sprawdzenia. Solver ją pasuje." }
      - { text: "All-in, bo im głębszy stack, tym szerzej", why: "Odwrotnie: im głębszy stack, tym węższy zakres all-inu. Najszerzej wpychasz przy bardzo krótkim stacku." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Mały blind, {{n:m11.depth.10}}, bez ante. Ile razy na sto duży blind musiałby spasować, żeby all-in ręką bez żadnych szans wyszedł na zero?"
    options:
      - { text: "Ponad {{n:m11.push.10.alpha}}", correct: true, why: "Ryzykujesz {{n:m11.push.10.risk}}, żeby wygrać {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) to ok. {{n:m11.push.10.alpha}}. Rywal tyle nie pasuje, więc all-in opłaca się tylko ręką, która ma też equity, gdy rywal sprawdzi." }
      - { text: "Ponad połowę", why: "Połowa wystarczałaby, gdybyś ryzykował tyle, ile możesz wygrać. Tu ryzykujesz {{n:m11.push.10.risk}}, a wygrywasz tylko {{n:m11.push.10.win}} blindów." }
      - { text: "Wystarczy, że czasem spasuje", why: "Każde sprawdzenie kosztuje rękę bez szans cały stack. Bez equity potrzebujesz bardzo częstych pasów: ponad {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Dlaczego z krótkim stackiem wolisz wejść all-in pierwszy, niż czekać, aż ktoś inny wejdzie all-in, i sprawdzić?"
    options:
      - { text: "Bo all-in wygrywa na dwa sposoby", correct: true, why: "Wchodząc pierwszy, zgarniasz pulę, gdy wszyscy spasują, albo wygrywasz na showdownie. Sprawdzając, wygrywasz tylko na showdownie." }
      - { text: "Bo all-in ma zawsze więcej equity", why: "Equity ręki nie zależy od tego, kto wszedł pierwszy. Różnica jest w tym, że all-in daje rywalowi szansę spasować." }
      - { text: "Bo sprawdzanie all-inu jest zabronione", why: "Sprawdzać wolno, ale do sprawdzenia potrzebujesz silniejszej ręki (lekcja o sprawdzaniu)." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Ten sam stack {{n:m11.depth.10}} na małym blindzie, ale duży blind wpłacił ante {{n:m11.ante}}. Jak zmienia się zakres all-inu?"
    options:
      - { text: "Rośnie: ok. {{n:m11.push.10-ante}} zamiast {{n:m11.push.10}}", correct: true, why: "Ante powiększa pulę, którą zgarniasz, gdy rywal spasuje: {{n:m11.push.10.win-ante}} zamiast {{n:m11.push.10.win}}. Ręka bez szans potrzebuje już tylko ponad {{n:m11.push.10.alpha-ante}} pasów, więc opłaca się więcej all-inów." }
      - { text: "Maleje, bo rywal ma więcej w puli i częściej sprawdzi", why: "Rywal rzeczywiście sprawdza szerzej, ale większa pula do zgarnięcia przeważa. Solver wpycha ok. {{n:m11.push.10-ante}} rąk." }
      - { text: "Nie zmienia się", why: "Ante zmienia stosunek ryzyka do nagrody. Bez ante ok. {{n:m11.push.10}}, z ante ok. {{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 2
---
W turnieju blindy rosną, a stack nie. Prędzej czy później masz go tak mało, że zwykłe podbicie przestaje działać. Wtedy wchodzi strategia **push/fold**: z każdą ręką, którą grasz, wchodzisz all-in (push), a resztę pasujesz (fold).

## Kiedy all-in albo pas

Stack liczysz w dużych blindach (bb). Źródła zgadzają się co do jednego: przy ok. **{{n:m11.thr.pushfold}} lub mniej** grasz już prawie wyłącznie all-in albo pas.

| Stack | Co zwykle robisz |
|---|---|
| ok. {{n:m11.thr.pushfold}} lub mniej | all-in albo pas |
| od {{n:m11.thr.pushfold}} do {{n:m11.thr.upper}} | push/fold dla słabszych i średnich rąk |
| ponad ok. {{n:m11.thr.raise}} | zwykłe podbicie |

Dlaczego nie podbicie? Gdy masz {{n:m11.depth.10}} i podbijesz do {{n:pf.open-size}}, zostaje ci tak mało za pulą, że na przebicie all-in i tak prawie musisz sprawdzić. Rywal wie, że nie spasujesz, więc nie musi się bać. All-in od razu wyciska ze stacku najwięcej **fold equity**, czyli zysku z tego, że rywal spasuje.

:::note Uproszczenie
Push/fold to uproszczenie. Solvery, które mają do wyboru także limp i małe podbicie, przy {{n:m11.depth.10}} część rąk limpują albo podbijają minimalnie. All-in albo pas jest jednak prosty, trudno w nim popełnić duży błąd i źródła polecają go jako punkt wyjścia.
:::

## M: ile okrążeń przetrwasz

Dan Harrington liczy krótki stack inaczej: **M** to stack podzielony przez koszt jednego okrążenia stołu.

```formula
M = stack ÷ (mały blind + duży blind + ante)
```

Przykład: masz {{n:m11.m.stack}} żetonów, blindy {{n:m11.m.sb}}/{{n:m11.m.bb}}, ante dużego blinda {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. W dużych blindach to {{n:m11.m.bbs}}, ale M uwzględnia też ante. Poniżej M ok. {{n:m11.m.red}} (strefa czerwona; źródła podają granicę {{n:m11.m.red}} albo {{n:m11.m.red-alt}}) zostaje ci już tylko all-in albo pas.

## Im krótszy stack, tym szerzej

Siatki w tej lekcji policzył solver tej aplikacji dla najprostszej sytuacji: wszyscy spasowali, grasz z małego blinda przeciw dużemu blindowi, a każdy może tylko wejść all-in albo spasować.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Przy {{n:m11.depth.15}} wchodzisz all-in z ok. {{n:m11.push.15}} rąk, przy {{n:m11.depth.10}} z ok. {{n:m11.push.10}}, a przy {{n:m11.depth.5}} już z ok. {{n:m11.push.5}}. Im mniej ryzykujesz względem blindów, tym więcej rąk się opłaca. Dla porównania PokerStrategy podaje przy {{n:m11.depth.10}} {{n:m11.ext.push.10}}; różnica wynika z innego sposobu liczenia, kierunek jest ten sam.

## Dwa sposoby na wygraną

All-in wygrywa, gdy rywal spasuje, albo gdy sprawdzi i przegra na showdownie. Sam pas rywala rzadko wystarcza: przy {{n:m11.depth.10}} ryzykujesz {{n:m11.push.10.risk}}, żeby zgarnąć {{n:m11.push.10.win}} blindów, więc ręka bez szans potrzebowałaby pasów w ponad {{n:m11.push.10.alpha}} przypadków. Dlatego liczy się i fold equity, i equity ręki, gdy rywal sprawdzi.

## Ante poszerza zakres

Ante to dodatkowe żetony w puli przed rozdaniem. Gdy duży blind wpłaca ante {{n:m11.ante}}, all-in zgarnia {{n:m11.push.10.win-ante}} zamiast {{n:m11.push.10.win}}, a ryzyko zostaje to samo. Zakres rośnie z ok. {{n:m11.push.10}} do ok. {{n:m11.push.10-ante}} rąk.

```range
push.sb-10-ante
```
