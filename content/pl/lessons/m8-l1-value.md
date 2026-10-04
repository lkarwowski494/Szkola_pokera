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
    prompt: "River: wszystkie karty są już na stole. Po co w ogóle betować?"
    options:
      - { text: "Żeby zapłaciły gorsze ręce albo żeby spasowały lepsze", correct: true, why: "Na riverze nie ma już kart do odkrycia, więc bet ma tylko dwa cele: wartość (płacą gorsze ręce) albo blef (pasują lepsze). Bet, który nie robi żadnej z tych rzeczy, tylko kosztuje." }
      - { text: "Żeby odebrać rywalowi szansę na dobranie", why: "To powód do betu na flopie i turnie. Na riverze rywal już niczego nie dobierze: jego ręka jest gotowa." }
      - { text: "Żeby sprawdzić, czy moja ręka jest najlepsza", why: "Bet nie jest pytaniem. Gdy betujesz średnią ręką, gorsze ręce zwykle pasują, a płacą lepsze, więc „dowiadujesz się” za własne pieniądze. Za darmo dowiesz się po czekaniu." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, rywal czeka. Szacujesz, że na twój bet zapłaci w {{n:value.ex.calls}} przypadkach: {{n:value.ex.many}} razy gorszą ręką, {{n:value.ex.few}} razy lepszą. Przebić cię nie może. Betujesz?"
    options:
      - { text: "Tak, to bet dla wartości", correct: true, why: "Wygrywasz bet {{n:value.ex.many}} razy, przegrywasz {{n:value.ex.few}} razy: na czysto zostaje {{n:value.ex.net}} betów. Ponad {{n:value.threshold}} sprawdzeń to gorsze ręce, więc bet zarabia więcej niż czekanie." }
      - { text: "Nie, bo czasem zapłaci lepszą ręką", why: "Lepsza ręka zapłaci zawsze w jakiejś części przypadków. Liczy się, czy gorszych sprawdzeń jest więcej niż lepszych: tu jest ich {{n:value.ex.many}} na {{n:value.ex.few}}." }
      - { text: "Tylko wtedy, gdy rywal nigdy nie ma lepszej ręki", why: "Wtedy betowałbyś tylko nutsami i oddawałbyś dużo wartości. Wystarczy, że ponad {{n:value.threshold}} sprawdzeń to gorsze ręce." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, rywal czeka. Na twój bet zapłaci w {{n:value.ex.calls}} przypadkach: {{n:value.ex.few}} razy gorszą ręką, {{n:value.ex.many}} razy lepszą. Gorsze ręce rywala, które spasują, i tak przegrałyby z tobą przy showdownie. Co robisz?"
    options:
      - { text: "Czekam", correct: true, why: "Bet wygrałby {{n:value.ex.few}} razy, a przegrał {{n:value.ex.many}} razy: na czysto tracisz {{n:value.ex.net}} bety. Po czekaniu wygrywasz pulę z tymi samymi gorszymi rękami, tylko bez dopłaty od lepszych." }
      - { text: "Betuję, bo mam niezłą rękę", why: "Siła ręki sama w sobie nie wystarcza. Liczy się, kto zapłaci: tu większość sprawdzeń to lepsze ręce, więc bet traci." }
      - { text: "Betuję dużo, żeby lepsze ręce spasowały", why: "To byłby blef ręką, która często wygrywa przy showdownie. Lepsze ręce rzadko pasują na riverze, a po czekaniu i tak wygrasz z gorszymi." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. Twój bet sprawdzą {{n:value.ex.many}} gorsze ręce i {{n:value.ex.few}} lepsze. Ile betów zarobisz na czysto na tych {{n:value.ex.calls}} sprawdzeniach? Wpisz liczbę."
    answer: value.ex.net
    explanation: "Każde sprawdzenie gorszą ręką to jeden wygrany bet, każde lepszą to jeden przegrany: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Pulę wygrałbyś z gorszymi rękami także po czekaniu, więc liczysz tylko bety."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Betowałeś na flopie i turnie, za każdym razem dostałeś sprawdzenie. River, duży blind czeka. Co robisz?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Betuję dla wartości", correct: true, why: "Najwyższa para z najlepszym kickerem. Rywal, który sprawdził dwie ulice, ma dużo słabszych króli (KQ, KJ, KT) i dziewiątek, a dobierań na tym stole było mało. Gorsze ręce zapłacą znacznie częściej niż lepsze (dwie pary, sety)." }
      - { text: "Czekam, bo rywal mógł mieć seta", why: "Mógł, ale rzadko. Czekając, tracisz bet od wszystkich słabszych króli, którymi zapłaciłby. Liczysz, kto sprawdzi, a nie, czy istnieje lepsza ręka." }
      - { text: "Czekam, żeby rywal zablefował", why: "Rywal, który dwa razy sprawdzał, ma głównie pary i rzadko blefuje po twoim czekaniu. Pewniej zarobisz, betując w jego słabsze króle." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Na flopie zagrałeś c-bet i dostałeś sprawdzenie, na turnie obaj czekaliście. River, duży blind czeka. Co robisz?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "Czekam", correct: true, why: "Druga para ze słabym kickerem wygrywa z nietrafionymi dobieraniami i słabszymi parami, ale te ręce na bet spasują. Zapłacą głównie króle i lepsze dziesiątki. Czekasz i zobaczysz showdown za darmo." }
      - { text: "Betuję dla wartości", why: "Kto zapłaci? Ręce bez pary spasują, a króle i lepsze dziesiątki sprawdzą. Większość sprawdzeń byłaby lepsza od twojej ręki." }
      - { text: "Betuję dużo jako blef", why: "Twoja ręka często wygrywa przy showdownie. Blefując, oddajesz tę wygraną: gorsze ręce i tak by spasowały, a króle rzadko pasują." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Na flopie zagrałeś c-bet i dostałeś sprawdzenie, na turnie obaj czekaliście. River, duży blind czeka. Masz najwyższą parę z dziesiątką. Jakie ręce zapłacą mały bet i będą gorsze od twojej?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Ósemki, czwórki i damy ze słabszym kickerem", correct: true, why: "Te ręce sprawdziły flop i mają parę, więc często zapłacą mały bet. Przegrywasz z damą z lepszym kickerem, dwiema parami i setami, ale gorszych sprawdzeń jest więcej." }
      - { text: "Ręce bez pary", why: "Ręka bez pary prawie nigdy nie zapłaci betu na riverze: przegrywa nawet z blefami. Ona spasuje." }
      - { text: "Żadne, płacą tylko lepsze ręce", why: "Za ostrożnie: duży blind broni wielu par niższych od damy. Po czekaniu na turnie jego zakres zawiera ich sporo." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Ta sama sytuacja: masz najwyższą parę z dziesiątką, duży blind czeka na riverze. W puli jest {{n:ex.pot}}. Co robisz?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Bet {{n:ex.bet.quarter}}, czyli 1/4 puli", correct: true, why: "Thin value: wygrywasz z niewiele ponad połową rąk, które zapłacą. Mały bet sprawdzą ósemki, czwórki i słabsze damy, więc gorszych sprawdzeń zostaje więcej niż lepszych." }
      - { text: "Bet {{n:ex.bet.pot}}, czyli cała pula", sizeError: true, why: "Dobra akcja, zły rozmiar: na bet wielkości puli ósemki i czwórki spasują, a zapłacą głównie lepsze damy, dwie pary i sety. Wtedy większość sprawdzeń jest lepsza od ciebie. Thin value betujesz mało." }
      - { text: "Czekam", why: "Tracisz wartość: rywal ma wiele niższych par, które zapłacą mały bet. Czekanie oddaje te pieniądze." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Kolega mówi: „Na riverze ze średnią parą betuję, żeby sprawdzić, gdzie jestem”. Co jest nie tak z tym pomysłem?"
    options:
      - { text: "Gorsze ręce spasują, a lepsze zapłacą", correct: true, why: "Po takim becie ręce, z którymi wygrywasz, pasują, a te, z którymi przegrywasz, płacą albo przebijają. Informację dostajesz za darmo po czekaniu, bo z pozycji rywal pokaże karty przy showdownie." }
      - { text: "Nic, to dobry sposób na zdobycie informacji", why: "Informacja kosztuje tu bet, który zwykle przegrywasz. Po czekaniu zobaczysz rękę rywala bez dopłaty." }
      - { text: "Bet powinien być większy", why: "Większy bet pogarsza sprawę: jeszcze więcej gorszych rąk spasuje, a lepsze dalej zapłacą." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Twoje dobieranie do koloru nie weszło. Na riverze rozważasz bet. Jaki to byłby bet?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Blef", correct: true, why: "Masz tylko damę jako najwyższą kartę. Żadna ręka, która cię sprawdzi, nie będzie gorsza, więc bet może wygrać tylko wtedy, gdy rywal spasuje. To blef (o wyborze blefów w kolejnych lekcjach)." }
      - { text: "Bet dla wartości", why: "Bet dla wartości wymaga, żeby płaciły gorsze ręce. Z samą damą prawie nic gorszego cię nie sprawdzi." }
      - { text: "Thin value", why: "Thin value to bet ręką, która wygrywa z niewiele ponad połową sprawdzeń. Twoja ręka nie wygrywa z prawie żadnym sprawdzeniem." }
---
Na riverze wszystkie karty są już na stole. Nikt niczego nie dobierze, więc bet może zrobić tylko dwie rzeczy: sprawić, że zapłaci gorsza ręka (**wartość**), albo że spasuje lepsza (**blef**). W tej lekcji zajmiesz się wartością, w kolejnych blefami i sprawdzaniem.

## Próg: ponad połowa sprawdzeń

Gdy betujesz z pozycji, a rywal może tylko sprawdzić albo spasować, liczysz wyłącznie ręce, którymi zapłaci:

```formula
bet dla wartości: gorsze sprawdzenia > lepsze sprawdzenia
```

Każde sprawdzenie gorszą ręką wygrywa jeden bet. Każde sprawdzenie lepszą przegrywa jeden bet. Gdy rywal pasuje gorszą ręką, wygrywasz tę samą pulę co po czekaniu. Dlatego bet zarabia, gdy ponad **{{n:value.threshold}}** rąk, które zapłacą, jest gorszych od twojej.

Przykład: na {{n:value.ex.calls}} sprawdzeń {{n:value.ex.many}} to gorsze ręce, a {{n:value.ex.few}} lepsze. Na czysto zarabiasz {{n:value.ex.net}} bety. Gdyby proporcja była odwrotna, tyle samo byś tracił.

## Kto zapłaci

Nie pytasz „czy mam dobrą rękę”, tylko „czym rywal zapłaci”. Pomaga przejście przez jego zakres:

- ręce bez pary prawie nigdy nie płacą, bo przegrywają nawet z blefami,
- niższe pary i słabsze kickery często płacą mały bet,
- lepsze ręce zapłacą zawsze, a czasem przebiją.

Gdy rywal może cię przebić, a ty musiałbyś wtedy spasować, próg jest jeszcze wyższy: bet zarabia tylko przy wyraźnej przewadze gorszych sprawdzeń.

## Thin value: mało, ale za cenę

Thin value (cienka wartość) to bet ręką, która wygrywa z niewiele ponad połową sprawdzeń, np. najwyższą parą ze średnim kickerem. Taki bet robisz **mały**: małego zapłacą też słabsze pary, a na duży spasują i zostaną tylko lepsze ręce.

## Średnia ręka czeka

Masz z pozycją średnią rękę, np. drugą parę. Gorsze ręce rywala na bet spasują, a zapłacą lepsze. Bet zamienia wtedy twoją rękę w blef. Czekasz: wygrasz showdown z gorszymi rękami bez dopłaty od lepszych.

:::note Skąd te zasady
Próg ponad połowy sprawdzeń to czysta matematyka. Zalecenie małego rozmiaru przy thin value i czekania średnią ręką pochodzą z artykułów, które znamy tylko ze streszczeń; czekają na weryfikację z pełnym tekstem.
:::
