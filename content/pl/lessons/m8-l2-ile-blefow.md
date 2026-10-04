---
id: m8.l2
module: m8
order: 2
title: "Ile blefować"
sub: "Proporcja blefów do rozmiaru betu"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. W puli jest {{n:ex.pot}}, betujesz całą pulę: {{n:ex.bet.pot}}. Twój zakres to bardzo silne ręce i blefy. Jaka część twoich betów powinna być blefami, żeby rywal nie mógł cię wykorzystać? Wpisz liczbę w procentach."
    answer: bluff.share.bet-pot
    explanation: "Udział blefów = bet ÷ (pula + 2·bet) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Co trzeci bet to blef: wtedy ręka rywala, która wygrywa tylko z blefami, nie zarabia ani sprawdzeniem, ani pasem."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. W puli jest {{n:ex.pot}}, betujesz pół puli: {{n:ex.bet.half}}. Jaka część twoich betów to w równowadze blefy? Wpisz liczbę w procentach."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Mniejszy bet daje rywalowi lepszą cenę, więc blefów jest mniej niż przy całej puli ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. W puli jest {{n:ex.pot}}, betujesz {{n:ex.bet.three-quarters}}. Jaka część twoich betów to w równowadze blefy?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. To ta sama liczba, co equity potrzebne rywalowi do sprawdzenia." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "To alpha: jak często musi zadziałać pojedynczy blef bez szans. Udział blefów w zakresie liczysz z obu betami w mianowniku: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "To MDF, czyli ile rywal powinien bronić. Udział twoich blefów to {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. W puli jest {{n:ex.pot}}, betujesz więcej niż pulę: {{n:ex.bet.overbet}}. Jaka część twoich betów to w równowadze blefy?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Overbet daje rywalowi najgorszą cenę, więc możesz mieć w nim najwięcej blefów, ale nadal mniej niż połowę." }
      - { text: "{{n:alpha.bet-overbet}}", why: "To alpha dla tego rozmiaru: jak często rywal musi pasować, żeby opłacił się pojedynczy blef. Udział blefów w zakresie to {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Tyle wynosi udział blefów przy becie całej puli. Przy becie {{n:ex.bet.overbet}} jest ich więcej: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Przy którym becie na riverze masz w zakresie więcej blefów: 1/3 puli czy całej puli?"
    options:
      - { text: "Przy całej puli", correct: true, why: "Przy 1/3 puli blefy to ok. {{n:bluff.share.bet-third}} betów, przy całej puli ok. {{n:bluff.share.bet-pot}}. Większy bet daje rywalowi gorszą cenę, więc jego sprawdzenie potrzebuje więcej blefów, żeby się opłacić." }
      - { text: "Przy 1/3 puli", why: "Odwrotnie. Mały bet daje rywalowi dobrą cenę: do sprawdzenia wystarczy mu ok. {{n:bluff.share.bet-third}} blefów w twoich betach. Przy większej liczbie blefów płaciłby z zyskiem." }
      - { text: "Tyle samo", why: "Udział blefów zależy od rozmiaru: ok. {{n:bluff.share.bet-third}} przy 1/3 puli, ok. {{n:bluff.share.bet-pot}} przy całej puli." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Betujesz na riverze całą pulę. Alpha wynosi {{n:alpha.bet-pot}}, a udział blefów {{n:bluff.share.bet-pot}}. Co mówi każda z tych liczb?"
    options:
      - { text: "Alpha: jak często musi spasować rywal; udział: jaka część betów to blefy", correct: true, why: "Alpha dotyczy jednego blefu bez szans: wychodzi na zero, gdy rywal pasuje w {{n:alpha.bet-pot}} przypadków. Udział blefów opisuje skład twojego zakresu: co trzeci bet to blef, żeby sprawdzenie rywala wychodziło na zero." }
      - { text: "To dwie nazwy tej samej rzeczy, któraś jest źle policzona", why: "Obie są dobrze policzone: alpha = bet ÷ (pula + bet), udział blefów = bet ÷ (pula + 2·bet). Odpowiadają na różne pytania." }
      - { text: "Alpha: ile blefów masz w zakresie; udział: jak często rywal pasuje", why: "Odwrotnie. Alpha to próg pasów rywala dla pojedynczego blefu, a udział blefów to skład twojego zakresu betów." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Dlaczego udział blefów w twoich betach liczysz tym samym wzorem, co equity potrzebne rywalowi do sprawdzenia?"
    options:
      - { text: "Bo ręka rywala łapiąca blefy wygrywa dokładnie wtedy, gdy blefujesz", correct: true, why: "Jego ręka przegrywa z twoją wartością i wygrywa z blefami, więc jej equity to udział blefów. Gdy jest on równy potrzebnemu equity, sprawdzenie wychodzi na zero i rywal nie może cię wykorzystać ani sprawdzaniem, ani pasowaniem." }
      - { text: "To przypadek, wzory tylko wyglądają podobnie", why: "To nie przypadek. Udział blefów wybierasz tak, żeby equity ręki łapiącej blefy było równe jej cenie." }
      - { text: "Bo rywal zawsze ma dokładnie potrzebne equity", why: "Rywal ma tyle equity, ile wynika z twoich betów. To ty dobierasz liczbę blefów tak, żeby wyszło na zero." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Betujesz na riverze całą pulę, ale blefy to u ciebie połowa betów, a nie {{n:bluff.share.bet-pot}}. Co może zrobić uważny rywal?"
    options:
      - { text: "Sprawdzać częściej, nawet słabymi rękami łapiącymi blefy", correct: true, why: "Jego sprawdzenie wygrywa w połowie przypadków, a potrzebuje tylko {{n:eq.bet-pot}}. Płacąc więcej, zarabia na twoich blefach więcej, niż traci na wartości." }
      - { text: "Pasować częściej", why: "Pasowanie oddaje ci pulę z blefami. Gdy blefów jest za dużo, rywal zarabia, sprawdzając." }
      - { text: "Nic, proporcja nie ma znaczenia", why: "Ma: przy zbyt wielu blefach każde sprawdzenie ręką łapiącą blefy jest dla rywala zyskowne." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Na riverze betujesz całą pulę prawie wyłącznie dla wartości, prawie bez blefów. Co może zrobić uważny rywal?"
    options:
      - { text: "Pasować wszystkie ręce, które wygrywają tylko z blefami", correct: true, why: "Gdy blefów jest mniej niż {{n:bluff.share.bet-pot}}, sprawdzenie ręką łapiącą blefy traci. Rywal płaci wtedy tylko lepszymi rękami, a twoje bety dla wartości rzadziej dostają zapłatę." }
      - { text: "Sprawdzać częściej", why: "Sprawdzając, płaciłby głównie twojej wartości. Bez blefów w twoim zakresie lepiej mu pasować." }
      - { text: "Przebijać każdą ręką", why: "Przebicie twojej silnej ręki bez lepszego układu to pewna strata. Rywal po prostu pasuje częściej." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "Na riverze betujesz całą pulę zakresem złożonym z {{n:bluff.ex.range}} kombinacji: wartości i blefów. Ile z nich to w równowadze blefy?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} blefów i {{n:bluff.ex.value}} kombinacji dla wartości: jeden blef na dwie ręce dla wartości." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Tak wyszłoby z alpha ({{n:alpha.bet-pot}}). Alpha to próg pasów dla pojedynczego blefu, nie udział blefów w zakresie." }
      - { text: "{{n:bluff.ex.value}}", why: "Tyle to kombinacje dla wartości. Blefów jest dwa razy mniej: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "Na riverze potrzebujesz kilku blefów do betów całą pulą. Które ręce na nie wybierasz?"
    options:
      - { text: "Najsłabsze, np. nietrafione dobierania", correct: true, why: "Ręka bez szans przy showdownie nic nie traci, gdy blef się nie uda: po czekaniu i tak by przegrała. Dlatego ona blefuje." }
      - { text: "Średnie pary", why: "Średnia para często wygrywa po czekaniu. Gdy nią blefujesz, gorsze ręce pasują, a lepsze płacą: oddajesz wygraną przy showdownie." }
      - { text: "Dowolne, byle proporcja się zgadzała", why: "Proporcja to nie wszystko. Blef z ręką, która wygrałaby showdown, kosztuje więcej niż blef ręką bez szans." }
---
W pierwszej lekcji betowałeś dla wartości. Ale gdybyś betował na riverze wyłącznie silnymi rękami, uważny rywal pasowałby wszystko poza jeszcze silniejszymi rękami i twoje bety prawie nigdy nie dostawałyby zapłaty. Blefy sprawiają, że rywalowi opłaca się płacić.

## Zakres spolaryzowany

Na riverze z pozycją często betujesz **zakresem spolaryzowanym**: bardzo silne ręce dla wartości i blefy, bez rąk średnich (te czekają, jak w pierwszej lekcji). Rywal ma wtedy dużo rąk, które przegrywają z twoją wartością, a wygrywają z blefami. To **bluff-catchery** (ręce łapiące blefy).

## Ile blefów

Liczbę blefów dobierasz tak, żeby bluff-catcher rywala wychodził na zero niezależnie od tego, czy sprawdzi, czy spasuje:

```formula
udział blefów = bet ÷ (pula + 2·bet)
```

To ten sam wzór co equity potrzebne do sprawdzenia z M2. To nie przypadek: bluff-catcher wygrywa dokładnie wtedy, gdy blefujesz, więc jego equity to udział twoich blefów. Przy becie całej puli: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, czyli co trzeci bet to blef.

## Większy bet, więcej blefów

| Bet | Udział blefów | Alpha (z M6) |
|---|---|---|
| 1/3 puli | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 puli | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 puli | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Cała pula | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 puli | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Większy bet daje rywalowi gorszą cenę, więc możesz w nim mieć więcej blefów. Mały bet znosi tylko kilka.

## Udział blefów to nie alpha

Alpha z M6 = bet ÷ (pula + bet) mówi, jak często rywal musi spasować, żeby **jeden** blef bez szans wyszedł na zero. Udział blefów = bet ÷ (pula + 2·bet) mówi, jaka część **całego zakresu betów** to blefy. Przy becie całej puli blef potrzebuje ponad {{n:alpha.bet-pot}} pasów, a w zakresie masz {{n:bluff.share.bet-pot}} blefów. W drugim mianowniku jest dodatkowy bet, bo liczysz cenę sprawdzenia rywala.

## Czym blefować

Na blefy wybierasz **najsłabsze ręce**, np. nietrafione dobierania: po czekaniu i tak by przegrały, więc nieudany blef nic im nie odbiera. Ręce z wartością przy showdownie czekają.

:::note To punkt równowagi, nie przepis na każdego rywala
Te proporcje chronią cię przed rywalem, który gra dobrze. Wobec konkretnych graczy można od nich odchodzić; o tym w module o eksploatacji mikrostawek. Zalecenie blefowania najsłabszymi rękami pochodzi z artykułów znanych tylko ze streszczeń i czeka na weryfikację.
:::
