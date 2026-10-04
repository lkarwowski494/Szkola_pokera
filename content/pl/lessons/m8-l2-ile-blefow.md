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
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz całą {{t:pot|pulę}}: {{n:ex.bet.pot}}. Twój {{t:range}} to bardzo silne ręce i {{t:bluff|blefy}}. Jaka część twoich betów powinna być {{t:bluff|blefami}}, żeby rywal nie mógł cię wykorzystać? Wpisz liczbę w procentach."
    answer: bluff.share.bet-pot
    explanation: "Udział {{t:bluff|blefów}} = bet ÷ ({{t:pot}} + 2·bet) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Co trzeci bet to {{t:bluff}}: wtedy ręka rywala, która wygrywa tylko z {{t:bluff|blefami}}, nie zarabia ani {{t:call|sprawdzeniem}}, ani {{t:fold|pasem}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz pół {{t:pot|puli}}: {{n:ex.bet.half}}. Jaka część twoich betów to w równowadze {{t:bluff|blefy}}? Wpisz liczbę w procentach."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Mniejszy bet daje rywalowi lepszą cenę, więc {{t:bluff|blefów}} jest mniej niż przy całej {{t:pot|puli}} ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz {{n:ex.bet.three-quarters}}. Jaka część twoich betów to w równowadze {{t:bluff|blefy}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. To ta sama liczba, co equity potrzebne rywalowi do {{t:call|sprawdzenia}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "To alpha: jak często musi zadziałać pojedynczy {{t:bluff}} bez szans. Udział {{t:bluff|blefów}} w {{t:range|zakresie}} liczysz z obu betami w mianowniku: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "To {{t:mdf}}, czyli ile rywal powinien bronić. Udział twoich {{t:bluff|blefów}} to {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, betujesz więcej niż {{t:pot|pulę}}: {{n:ex.bet.overbet}}. Jaka część twoich betów to w równowadze {{t:bluff|blefy}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Overbet daje rywalowi najgorszą cenę, więc możesz mieć w nim najwięcej {{t:bluff|blefów}}, ale nadal mniej niż połowę." }
      - { text: "{{n:alpha.bet-overbet}}", why: "To alpha dla tego rozmiaru: jak często rywal musi {{t:fold|pasować}}, żeby opłacił się pojedynczy {{t:bluff}}. Udział {{t:bluff|blefów}} w {{t:range|zakresie}} to {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Tyle wynosi udział {{t:bluff|blefów}} przy becie całej {{t:pot|puli}}. Przy becie {{n:ex.bet.overbet}} jest ich więcej: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Przy którym becie na riverze masz w {{t:range|zakresie}} więcej {{t:bluff|blefów}}: 1/3 {{t:pot|puli}} czy całej {{t:pot|puli}}?"
    options:
      - { text: "Przy całej {{t:pot|puli}}", correct: true, why: "Przy 1/3 {{t:pot|puli}} {{t:bluff|blefy}} to ok. {{n:bluff.share.bet-third}} betów, przy całej {{t:pot|puli}} ok. {{n:bluff.share.bet-pot}}. Większy bet daje rywalowi gorszą cenę, więc jego {{t:call}} potrzebuje więcej {{t:bluff|blefów}}, żeby się opłacić." }
      - { text: "Przy 1/3 {{t:pot|puli}}", why: "Odwrotnie. Mały bet daje rywalowi dobrą cenę: do {{t:call|sprawdzenia}} wystarczy mu ok. {{n:bluff.share.bet-third}} {{t:bluff|blefów}} w twoich betach. Przy większej liczbie {{t:bluff|blefów}} płaciłby z zyskiem." }
      - { text: "Tyle samo", why: "Udział {{t:bluff|blefów}} zależy od rozmiaru: ok. {{n:bluff.share.bet-third}} przy 1/3 {{t:pot|puli}}, ok. {{n:bluff.share.bet-pot}} przy całej {{t:pot|puli}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Betujesz na riverze całą {{t:pot|pulę}}. Alpha wynosi {{n:alpha.bet-pot}}, a udział {{t:bluff|blefów}} {{n:bluff.share.bet-pot}}. Co mówi każda z tych liczb?"
    options:
      - { text: "Alpha: jak często musi {{t:fold|spasować}} rywal; udział: jaka część betów to {{t:bluff|blefy}}", correct: true, why: "Alpha dotyczy jednego {{t:bluff|blefu}} bez szans: wychodzi na zero, gdy rywal {{t:fold|pasuje}} w {{n:alpha.bet-pot}} przypadków. Udział {{t:bluff|blefów}} opisuje skład twojego {{t:range|zakresu}}: co trzeci bet to {{t:bluff}}, żeby {{t:call}} rywala wychodziło na zero." }
      - { text: "To dwie nazwy tej samej rzeczy, któraś jest źle policzona", why: "Obie są dobrze policzone: alpha = bet ÷ ({{t:pot}} + bet), udział {{t:bluff|blefów}} = bet ÷ ({{t:pot}} + 2·bet). Odpowiadają na różne pytania." }
      - { text: "Alpha: ile {{t:bluff|blefów}} masz w {{t:range|zakresie}}; udział: jak często rywal {{t:fold|pasuje}}", why: "Odwrotnie. Alpha to próg {{t:fold|pasów}} rywala dla pojedynczego {{t:bluff|blefu}}, a udział {{t:bluff|blefów}} to skład twojego {{t:range|zakresu}} betów." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Dlaczego udział {{t:bluff|blefów}} w twoich betach liczysz tym samym wzorem, co equity potrzebne rywalowi do {{t:call|sprawdzenia}}?"
    options:
      - { text: "Bo ręka rywala łapiąca {{t:bluff|blefy}} wygrywa dokładnie wtedy, gdy {{t:bluff|blefujesz}}", correct: true, why: "Jego ręka przegrywa z twoją wartością i wygrywa z {{t:bluff|blefami}}, więc jej equity to udział {{t:bluff|blefów}}. Gdy jest on równy potrzebnemu equity, {{t:call}} wychodzi na zero i rywal nie może cię wykorzystać ani sprawdzaniem, ani pasowaniem." }
      - { text: "To przypadek, wzory tylko wyglądają podobnie", why: "To nie przypadek. Udział {{t:bluff|blefów}} wybierasz tak, żeby equity ręki łapiącej {{t:bluff|blefy}} było równe jej cenie." }
      - { text: "Bo rywal zawsze ma dokładnie potrzebne equity", why: "Rywal ma tyle equity, ile wynika z twoich betów. To ty {{t:draw|dobierasz}} liczbę {{t:bluff|blefów}} tak, żeby wyszło na zero." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Betujesz na riverze całą {{t:pot|pulę}}, ale {{t:bluff|blefy}} to u ciebie połowa betów, a nie {{n:bluff.share.bet-pot}}. Co może zrobić uważny rywal?"
    options:
      - { text: "{{t:call|Sprawdzać}} częściej, nawet słabymi rękami łapiącymi {{t:bluff|blefy}}", correct: true, why: "Jego {{t:call}} wygrywa w połowie przypadków, a potrzebuje tylko {{n:eq.bet-pot}}. Płacąc więcej, zarabia na twoich {{t:bluff|blefach}} więcej, niż traci na wartości." }
      - { text: "{{t:fold|Pasować}} częściej", why: "Pasowanie oddaje ci {{t:pot|pulę}} z {{t:bluff|blefami}}. Gdy {{t:bluff|blefów}} jest za dużo, rywal zarabia, {{t:call|sprawdzając}}." }
      - { text: "Nic, proporcja nie ma znaczenia", why: "Ma: przy zbyt wielu {{t:bluff|blefach}} każde {{t:call}} ręką łapiącą {{t:bluff|blefy}} jest dla rywala zyskowne." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Na riverze betujesz całą {{t:pot|pulę}} prawie wyłącznie {{t:value|dla wartości}}, prawie bez {{t:bluff|blefów}}. Co może zrobić uważny rywal?"
    options:
      - { text: "{{t:fold|Pasować}} wszystkie ręce, które wygrywają tylko z {{t:bluff|blefami}}", correct: true, why: "Gdy {{t:bluff|blefów}} jest mniej niż {{n:bluff.share.bet-pot}}, {{t:call}} ręką łapiącą {{t:bluff|blefy}} traci. Rywal płaci wtedy tylko lepszymi rękami, a twoje bety {{t:value|dla wartości}} rzadziej dostają zapłatę." }
      - { text: "{{t:call|Sprawdzać}} częściej", why: "{{t:call|Sprawdzając}}, płaciłby głównie twojej wartości. Bez {{t:bluff|blefów}} w twoim {{t:range|zakresie}} lepiej mu {{t:fold|pasować}}." }
      - { text: "{{t:raise|Przebijać}} każdą ręką", why: "{{t:raise|Przebicie}} twojej silnej ręki bez lepszego układu to pewna strata. Rywal po prostu {{t:fold|pasuje}} częściej." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "Na riverze betujesz całą {{t:pot|pulę}} {{t:range|zakresem}} złożonym z {{n:bluff.ex.range}} {{t:combo|kombinacji}}: wartości i {{t:bluff|blefów}}. Ile z nich to w równowadze {{t:bluff|blefy}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|blefów}} i {{n:bluff.ex.value}} {{t:combo|kombinacji}} {{t:value|dla wartości}}: jeden {{t:bluff}} na dwie ręce {{t:value|dla wartości}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Tak wyszłoby z alpha ({{n:alpha.bet-pot}}). Alpha to próg {{t:fold|pasów}} dla pojedynczego {{t:bluff|blefu}}, nie udział {{t:bluff|blefów}} w {{t:range|zakresie}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Tyle to {{t:combo|kombinacje}} {{t:value|dla wartości}}. {{t:bluff|Blefów}} jest dwa razy mniej: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "Na riverze potrzebujesz kilku {{t:bluff|blefów}} do betów całą {{t:pot|pulą}}. Które ręce na nie wybierasz?"
    options:
      - { text: "Najsłabsze, np. nietrafione {{t:draw|dobierania}}", correct: true, why: "Ręka bez szans przy showdownie nic nie traci, gdy {{t:bluff}} się nie uda: po {{t:check|czekaniu}} i tak by przegrała. Dlatego ona {{t:bluff|blefuje}}." }
      - { text: "Średnie {{t:pair|pary}}", why: "Średnia {{t:pair}} często wygrywa po {{t:check|czekaniu}}. Gdy nią {{t:bluff|blefujesz}}, gorsze ręce {{t:fold|pasują}}, a lepsze płacą: oddajesz wygraną przy showdownie." }
      - { text: "Dowolne, byle proporcja się zgadzała", why: "Proporcja to nie wszystko. {{t:bluff|Blef}} z ręką, która wygrałaby showdown, kosztuje więcej niż {{t:bluff}} ręką bez szans." }
---
W pierwszej lekcji betowałeś {{t:value|dla wartości}}. Ale gdybyś betował na riverze wyłącznie silnymi rękami, uważny rywal pasowałby wszystko poza jeszcze silniejszymi rękami i twoje bety prawie nigdy nie dostawałyby zapłaty. {{t:bluff|Blefy}} sprawiają, że rywalowi opłaca się płacić.

## {{t:range|Zakres}} {{t:polarized}}

Na riverze {{t:in-position}} często betujesz **{{t:range|zakresem}} {{t:polarized|spolaryzowanym}}** (jak w M7): bardzo silne ręce {{t:value|dla wartości}} i {{t:bluff|blefy}}, bez rąk średnich (te {{t:check|czekają}}, jak w pierwszej lekcji). Na riverze {{t:bluff|blefami}} są ręce bez szans przy showdownie. Rywal ma wtedy dużo rąk, które przegrywają z twoją wartością, a wygrywają z {{t:bluff|blefami}}. To **bluff-catchery** (ręce łapiące {{t:bluff|blefy}}).

## Ile {{t:bluff|blefów}}

Liczbę {{t:bluff|blefów}} {{t:draw|dobierasz}} tak, żeby bluff-catcher rywala wychodził na zero niezależnie od tego, czy {{t:call|sprawdzi}}, czy {{t:fold|spasuje}}:

```formula
udział blefów = bet ÷ (pula + 2·bet)
```

To ten sam wzór co equity potrzebne do {{t:call|sprawdzenia}} z M2. To nie przypadek: bluff-catcher wygrywa dokładnie wtedy, gdy {{t:bluff|blefujesz}}, więc jego equity to udział twoich {{t:bluff|blefów}}. Przy becie całej {{t:pot|puli}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, czyli co trzeci bet to {{t:bluff}}.

## Większy bet, więcej {{t:bluff|blefów}}

| Bet | Udział {{t:bluff|blefów}} | Alpha (z M6) |
|---|---|---|
| 1/3 {{t:pot|puli}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot|puli}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 {{t:pot|puli}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Cała {{t:pot}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|puli}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Większy bet daje rywalowi gorszą cenę, więc możesz w nim mieć więcej {{t:bluff|blefów}}. Mały bet znosi tylko kilka.

## Udział {{t:bluff|blefów}} to nie alpha

Alpha z M6 = bet ÷ ({{t:pot}} + bet) mówi, jak często rywal musi {{t:fold|spasować}}, żeby **jeden** {{t:bluff}} bez szans wyszedł na zero. Udział {{t:bluff|blefów}} = bet ÷ ({{t:pot}} + 2·bet) mówi, jaka część **całego {{t:range|zakresu}} betów** to {{t:bluff|blefy}}. Przy becie całej {{t:pot|puli}} {{t:bluff}} potrzebuje ponad {{n:alpha.bet-pot}} {{t:fold|pasów}}, a w {{t:range|zakresie}} masz {{n:bluff.share.bet-pot}} {{t:bluff|blefów}}. W drugim mianowniku jest dodatkowy bet, bo liczysz cenę {{t:call|sprawdzenia}} rywala.

## Czym {{t:bluff|blefować}}

Na {{t:bluff|blefy}} wybierasz **najsłabsze ręce**, np. nietrafione {{t:draw|dobierania}}: po {{t:check|czekaniu}} i tak by przegrały, więc nieudany {{t:bluff}} nic im nie odbiera. Ręce z wartością przy showdownie {{t:check|czekają}}.

:::note To punkt równowagi, nie przepis na każdego rywala
Te proporcje chronią cię przed rywalem, który gra dobrze. Wobec konkretnych graczy można od nich odchodzić; o tym w przyszłym module o eksploatacji mikrostawek (M10). Wzór na udział {{t:bluff|blefów}} to rachunek w uproszczonym modelu: {{t:range}} {{t:polarized}} przeciw ręce łapiącej {{t:bluff|blefy}} (GTO Wizard, How to Solve Toy Games). Zalecenie {{t:bluff|blefowania}} najsłabszymi rękami pochodzi z GTO Wizard i Upswing.
:::
