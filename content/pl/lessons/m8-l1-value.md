---
id: m8.l1
module: m8
order: 1
title: "Value bet na riverze"
sub: "Betuj, gdy płacą gorsze ręce"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: wszystkie karty są już na {{t:board|stole}}. Po co w ogóle betować?"
    options:
      - { text: "Żeby zapłaciły gorsze ręce albo żeby {{t:fold|spasowały}} lepsze", correct: true, why: "Na riverze nie ma już kart do odkrycia, więc bet ma tylko dwa cele: wartość (płacą gorsze ręce) albo {{t:bluff}} ({{t:fold|pasują}} lepsze). Bet, który nie robi żadnej z tych rzeczy, tylko kosztuje." }
      - { text: "Żeby odebrać rywalowi szansę na dobranie", why: "To powód do betu na flopie i turnie. Na riverze rywal już niczego nie dobierze: jego ręka jest gotowa." }
      - { text: "Żeby sprawdzić, czy moja ręka jest najlepsza", why: "Bet nie jest pytaniem. Gdy betujesz średnią ręką, gorsze ręce zwykle {{t:fold|pasują}}, a płacą lepsze, więc „dowiadujesz się” za własne pieniądze. Za darmo dowiesz się po {{t:check|czekaniu}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, rywal {{t:check|czeka}}. Szacujesz, że na twój bet zapłaci w {{n:value.ex.calls}} przypadkach: {{n:value.ex.many}} razy gorszą ręką, {{n:value.ex.few}} razy lepszą. {{t:raise|Przebić}} cię nie może. Betujesz?"
    options:
      - { text: "Tak, to bet {{t:value|dla wartości}}", correct: true, why: "Wygrywasz bet {{n:value.ex.many}} razy, przegrywasz {{n:value.ex.few}} razy: na czysto zostaje {{n:value.ex.net}} betów. Ponad {{n:value.threshold}} {{t:call|sprawdzeń}} to gorsze ręce, więc bet zarabia więcej niż {{t:check}}." }
      - { text: "Nie, bo czasem zapłaci lepszą ręką", why: "Lepsza ręka zapłaci zawsze w jakiejś części przypadków. Liczy się, czy gorszych {{t:call|sprawdzeń}} jest więcej niż lepszych: tu jest ich {{n:value.ex.many}} na {{n:value.ex.few}}." }
      - { text: "Tylko wtedy, gdy rywal nigdy nie ma lepszej ręki", why: "Wtedy betowałbyś tylko nutsami i oddawałbyś dużo wartości. Wystarczy, że ponad {{n:value.threshold}} {{t:call|sprawdzeń}} to gorsze ręce." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, rywal {{t:check|czeka}}. Na twój bet zapłaci w {{n:value.ex.calls}} przypadkach: {{n:value.ex.few}} razy gorszą ręką, {{n:value.ex.many}} razy lepszą. Gorsze ręce rywala, które {{t:fold|spasują}}, i tak przegrałyby z tobą przy showdownie. Co robisz?"
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Bet wygrałby {{n:value.ex.few}} razy, a przegrał {{n:value.ex.many}} razy: na czysto tracisz {{n:value.ex.net}} bety. Po {{t:check|czekaniu}} wygrywasz {{t:pot|pulę}} z tymi samymi gorszymi rękami, tylko bez dopłaty od lepszych." }
      - { text: "Betuję, bo mam niezłą rękę", why: "Siła ręki sama w sobie nie wystarcza. Liczy się, kto zapłaci: tu większość {{t:call|sprawdzeń}} to lepsze ręce, więc bet traci." }
      - { text: "Betuję dużo, żeby lepsze ręce {{t:fold|spasowały}}", why: "To byłby {{t:bluff}} ręką, która często wygrywa przy showdownie. Lepsze ręce rzadko {{t:fold|pasują}} na riverze, a po {{t:check|czekaniu}} i tak wygrasz z gorszymi." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. Twój bet {{t:call|sprawdzą}} {{n:value.ex.many}} gorsze ręce i {{n:value.ex.few}} lepsze. Ile betów zarobisz na czysto na tych {{n:value.ex.calls}} {{t:call|sprawdzeniach}}? Wpisz liczbę."
    answer: value.ex.net
    explanation: "Każde {{t:call}} gorszą ręką to jeden wygrany bet, każde lepszą to jeden przegrany: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. {{t:pot|Pulę}} wygrałbyś z gorszymi rękami także po {{t:check|czekaniu}}, więc liczysz tylko bety."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Betowałeś na flopie i turnie, za każdym razem dostałeś {{t:call}}. River, {{t:big-blind}} {{t:check|czeka}}. Co robisz?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Betuję {{t:value|dla wartości}}", correct: true, why: "{{t:top-pair|Najwyższa para}} z najlepszym kickerem. Rywal, który {{t:call|sprawdził}} dwie {{t:street|ulice}}, ma dużo słabszych króli (KQ, KJ, KT) i dziewiątek, a {{t:draw|drawów}} na tym {{t:board|stole}} było mało. Gorsze ręce zapłacą znacznie częściej niż lepsze ({{t:two-pair}}, sety). Zwykle {{t:top-pair}} znosi dwie {{t:value|ulice wartości}} (M9); tu trzecią, bo rywal płaci słabszymi królami." }
      - { text: "{{t:check|Czekam}}, bo rywal mógł mieć seta", why: "Mógł, ale rzadko. {{t:check|Czekając}}, tracisz bet od wszystkich słabszych króli, którymi zapłaciłby. Liczysz, kto {{t:call|sprawdzi}}, a nie, czy istnieje lepsza ręka." }
      - { text: "{{t:check|Czekam}}, żeby rywal zablefował", why: "Rywal, który dwa razy {{t:call|sprawdzał}}, ma głównie {{t:pair|pary}} i rzadko {{t:bluff|blefuje}} po twoim {{t:check|czekaniu}}. Pewniej zarobisz, betując w jego słabsze króle." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Na flopie zagrałeś c-bet i dostałeś {{t:call}}, na turnie obaj {{t:check|czekaliście}}. River, {{t:big-blind}} {{t:check|czeka}}. Co robisz?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "{{t:second-pair|Druga para}} ze słabym kickerem wygrywa z nietrafionymi {{t:draw|drawami}} i słabszymi {{t:pair|parami}}, ale te ręce na bet {{t:fold|spasują}}. Zapłacą głównie króle i lepsze dziesiątki. {{t:check|Czekasz}} i zobaczysz showdown za darmo." }
      - { text: "Betuję {{t:value|dla wartości}}", why: "Kto zapłaci? Ręce bez {{t:pair|pary}} {{t:fold|spasują}}, a króle i lepsze dziesiątki {{t:call|sprawdzą}}. Większość {{t:call|sprawdzeń}} byłaby lepsza od twojej ręki." }
      - { text: "Betuję dużo jako {{t:bluff}}", why: "Twoja ręka często wygrywa przy showdownie. {{t:bluff|Blefując}}, oddajesz tę wygraną: gorsze ręce i tak by {{t:fold|spasowały}}, a króle rzadko {{t:fold|pasują}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Na flopie zagrałeś c-bet i dostałeś {{t:call}}, na turnie obaj {{t:check|czekaliście}}. River, {{t:big-blind}} {{t:check|czeka}}. Masz {{t:top-pair|najwyższą parę}} z dziesiątką. Jakie ręce zapłacą mały bet i będą gorsze od twojej?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Ósemki, czwórki i damy ze słabszym kickerem", correct: true, why: "Te ręce sprawdziły flop i mają {{t:pair|parę}}, więc często zapłacą mały bet. Przegrywasz z damą z lepszym kickerem, {{t:two-pair|dwiema parami}}, setami i {{t:straight|stritami}} (A5, 65), ale gorszych {{t:call|sprawdzeń}} jest więcej." }
      - { text: "Ręce bez {{t:pair|pary}}", why: "Ręka bez {{t:pair|pary}} rzadko zapłaci bet na riverze; czasem płaci as-high, ale gorszych {{t:pair|par}} jest tu dużo więcej." }
      - { text: "Żadne, płacą tylko lepsze ręce", why: "Za ostrożnie: {{t:big-blind}} broni wielu {{t:pair|par}} niższych od damy. Po {{t:check|czekaniu}} na turnie jego {{t:range}} zawiera ich sporo." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Ta sama sytuacja: masz {{t:top-pair|najwyższą parę}} z dziesiątką, {{t:big-blind}} czeka na riverze. W {{t:pot|puli}} jest {{n:ex.pot}}. Co robisz?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Bet {{n:ex.bet.quarter}}, czyli 1/4 {{t:pot|puli}}", correct: true, why: "Thin value: wygrywasz z niewiele ponad połową rąk, które zapłacą. Mały bet {{t:call|sprawdzą}} ósemki, czwórki i słabsze damy, więc gorszych {{t:call|sprawdzeń}} zostaje więcej niż lepszych." }
      - { text: "Bet {{n:ex.bet.pot}}, czyli cała {{t:pot}}", sizeError: true, why: "Dobra akcja, zły rozmiar: na bet wielkości {{t:pot|puli}} ósemki i czwórki {{t:fold|spasują}}, a zapłacą głównie lepsze damy, {{t:two-pair}} i sety. Wtedy większość {{t:call|sprawdzeń}} jest lepsza od ciebie. Thin value betujesz mało." }
      - { text: "{{t:check|Czekam}}", why: "Tracisz wartość: rywal ma wiele niższych {{t:pair|par}}, które zapłacą mały bet. {{t:check|Czekanie}} oddaje te pieniądze." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Kolega mówi: „Na riverze ze średnią {{t:pair|parą}} betuję, żeby {{t:call|sprawdzić}}, gdzie jestem”. Co jest nie tak z tym pomysłem?"
    options:
      - { text: "Gorsze ręce {{t:fold|spasują}}, a lepsze zapłacą", correct: true, why: "Po takim becie ręce, z którymi wygrywasz, {{t:fold|pasują}}, a te, z którymi przegrywasz, płacą albo {{t:raise|przebijają}}. Informację dostajesz za darmo po {{t:check|czekaniu}}, bo z {{t:position|pozycji}} rywal pokaże karty przy showdownie." }
      - { text: "Nic, to dobry sposób na zdobycie informacji", why: "Informacja kosztuje tu bet, który zwykle przegrywasz. Po {{t:check|czekaniu}} zobaczysz rękę rywala bez dopłaty." }
      - { text: "Bet powinien być większy", why: "Większy bet pogarsza sprawę: jeszcze więcej gorszych rąk {{t:fold|spasuje}}, a lepsze dalej zapłacą." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Twój {{t:flush-draw}} nie wszedł. Na riverze rozważasz bet. Jaki to byłby bet?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Blef}}", correct: true, why: "Masz tylko damę jako najwyższą kartę. Żadna ręka, która cię {{t:call|sprawdzi}}, nie będzie gorsza, więc bet może wygrać tylko wtedy, gdy rywal {{t:fold|spasuje}}. To {{t:bluff}} (o wyborze {{t:bluff|blefów}} w kolejnych lekcjach)." }
      - { text: "Bet {{t:value|dla wartości}}", why: "Bet {{t:value|dla wartości}} wymaga, żeby płaciły gorsze ręce. Z samą damą prawie nic gorszego cię nie {{t:call|sprawdzi}}." }
      - { text: "Thin value", why: "Thin value to bet ręką, która wygrywa z niewiele ponad połową {{t:call|sprawdzeń}}. Twoja ręka nie wygrywa z prawie żadnym {{t:call|sprawdzeniem}}." }
---
Na riverze wszystkie karty są już na {{t:board|stole}}. Nikt niczego nie dobierze, więc bet może zrobić tylko dwie rzeczy: sprawić, że zapłaci gorsza ręka (**wartość**), albo że {{t:fold|spasuje}} lepsza (**{{t:bluff}}**). W tej lekcji zajmiesz się wartością, w kolejnych {{t:bluff|blefami}} i sprawdzaniem.

## Próg: ponad połowa {{t:call|sprawdzeń}}

Gdy betujesz z {{t:position|pozycji}}, a rywal może tylko {{t:call|sprawdzić}} albo {{t:fold|spasować}}, liczysz wyłącznie ręce, którymi zapłaci:

```formula
bet dla wartości: gorsze sprawdzenia > lepsze sprawdzenia
```

Każde {{t:call}} gorszą ręką wygrywa jeden bet. Każde {{t:call}} lepszą przegrywa jeden bet. Gdy rywal {{t:fold|pasuje}} gorszą ręką, wygrywasz tę samą {{t:pot|pulę}} co po {{t:check|czekaniu}}. Dlatego bet zarabia, gdy ponad **{{n:value.threshold}}** rąk, które zapłacą, jest gorszych od twojej.

Przykład: na {{n:value.ex.calls}} {{t:call|sprawdzeń}} {{n:value.ex.many}} to gorsze ręce, a {{n:value.ex.few}} lepsze. Na czysto zarabiasz {{n:value.ex.net}} bety. Gdyby proporcja była odwrotna, tyle samo byś tracił.

## Kto zapłaci

Nie pytasz „czy mam dobrą rękę”, tylko „czym rywal zapłaci”. Pomaga przejście przez jego {{t:range}}:

- ręce bez {{t:pair|pary}} rzadko płacą; czasem płaci as-high, który bije {{t:bluff|blefy}},
- niższe {{t:pair|pary}} i słabsze kickery często płacą mały bet,
- lepsze ręce zapłacą zawsze, a czasem {{t:raise|przebiją}}.

Gdy rywal może cię {{t:raise|przebić}}, a ty musiałbyś wtedy {{t:fold|spasować}}, próg jest jeszcze wyższy: bet zarabia tylko przy wyraźnej przewadze gorszych {{t:call|sprawdzeń}}.

## Thin value: mało, ale za cenę

Thin value (cienka wartość) to bet ręką, która wygrywa z niewiele ponad połową {{t:call|sprawdzeń}}, np. {{t:top-pair|najwyższą parą}} ze średnim kickerem. Taki bet robisz **mniejszy** niż silną ręką, zwykle ok. 1/4–1/2 {{t:pot|puli}}: mały bet zapłacą też słabsze {{t:pair|pary}}, a na duży {{t:fold|spasują}} i zostaną tylko lepsze ręce.

To uproszczenie: solver bez ryzyka check-raise'u betuje thin value nawet ok. 1/4 {{t:pot|puli}}, a przy tym ryzyku z {{t:position|pozycji}} rzadko schodzi poniżej 1/2 {{t:pot|puli}}.

## Średnia ręka {{t:check|czeka}}

Masz {{t:in-position}} średnią rękę, np. {{t:second-pair|drugą parę}}. Gorsze ręce rywala na bet {{t:fold|spasują}}, a zapłacą lepsze. Bet zamienia wtedy twoją rękę w {{t:bluff}}. {{t:check|Czekasz}}: wygrasz showdown z gorszymi rękami bez dopłaty od lepszych.

:::note Skąd te zasady
Próg ponad połowy {{t:call|sprawdzeń}} to czysta matematyka (bet {{t:in-position}}, bez {{t:raise|przebicia}} i bez rake'u). Rozmiar thin value i {{t:check}} średnią ręką pochodzą z analiz solvera GTO Wizard ({{t:tournament|turnieje}} z krótszymi stackami) oraz z materiałów Deepfold, PokerBank i GTO Gecko.
:::
