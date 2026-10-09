---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Ile kosztuje gra i co to zmienia w decyzjach"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Grasz NL10 6-max na jednej z dużych sal online. Jak duży jest {{t:rake}} w porównaniu z winrate typowego wygrywającego gracza na niskich {{t:stakes|stawkach}}?"
    options:
      - { text: "Kilka razy większy: ok. {{n:rake.micro.low}}–{{n:rake.micro.high}} wobec {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Po przeliczeniu harmonogramów sal na bb/100 na mikrostawkach wychodzi ok. {{n:rake.micro.low}}–{{n:rake.micro.high}}. Wygrywający gracz musi ogrywać rywali o więcej, niż wynosi {{t:rake}}, i dopiero nadwyżka jest jego winrate." }
      - { text: "Mniej więcej taki sam", why: "{{t:rake}} na mikrostawkach to ok. {{n:rake.micro.low}}–{{n:rake.micro.high}}, a typowy winrate {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. Różnica jest kilkukrotna." }
      - { text: "Pomijalnie mały, bo sala bierze tylko kilka procent {{t:pot|puli}}", why: "Kilka procent z każdej {{t:pot|puli}} po flopie sumuje się do ok. {{n:rake.micro.low}}–{{n:rake.micro.high}}. To więcej, niż wygrywa typowy wygrywający gracz." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "W raporcie o populacji cash 6-max każdy gracz NL100 traci średnio {{n:tombos.nl100.loss}}. Skąd ta strata?"
    options:
      - { text: "To {{t:rake}}: bez niego gracze razem wychodziliby na zero", correct: true, why: "Gracze grają przeciw sobie, więc to, co jeden wygrywa, drugi przegrywa. Średnio wszyscy tracą tylko to, co zabiera sala. Autor: „your biggest villain is the house”." }
      - { text: "Z tego, że większość graczy gra słabo", why: "Słaba gra przenosi pieniądze od słabszych graczy do lepszych, ale nie zmienia średniej. Średnią obniża tylko {{t:rake}}." }
      - { text: "Z {{t:variance|wariancji}}: przy większej próbie wyjdzie zero", why: "{{t:variance|Wariancja}} rozrzuca wyniki pojedynczych graczy w obie strony. Średnia całej populacji jest ujemna, bo {{t:rake}} płacą wszyscy." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Według tych samych danych wśród graczy z co najmniej {{n:tombos.reg.hands}} rąk ok. {{n:tombos.reg.prerake}} wygrywa przed odliczeniem {{t:rake|rake'u}}. Ilu wygrywa po jego odliczeniu?"
    options:
      - { text: "Ok. {{n:tombos.reg.postrake}}", correct: true, why: "{{t:rake}} zabiera prawie połowę wygrywających: ok. {{n:tombos.reg.prerake}} przed rake'iem, ok. {{n:tombos.reg.postrake}} po nim. Dlatego winrate liczysz zawsze po rake'u." }
      - { text: "Prawie tyle samo, ok. {{n:tombos.reg.prerake}}", why: "Gdyby {{t:rake}} był mały, tak by było. Przy kilku bb/100 rake'u wielu graczy wygrywających przed nim schodzi poniżej zera." }
      - { text: "Prawie nikt", why: "Przesada: ok. {{n:tombos.reg.postrake}} tej grupy wciąż wygrywa. {{t:rake}} jest dużą przeszkodą, ale nie zamyka drogi do wygrywania." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Dlaczego przy NL500 {{t:rake}} w bb/100 jest kilka razy mniejszy ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) niż na mikrostawkach?"
    options:
      - { text: "Bo większe {{t:pot|pule}} częściej dochodzą do {{t:rake-cap|limitu rake'u}}, który w bb jest tam mały", correct: true, why: "Sala bierze procent {{t:pot|puli}}, ale nie więcej niż limit w dolarach. Na mikrostawkach limit to wiele bb i {{t:pot|pule}} rzadko do niego dochodzą, więc płacisz pełny procent. Przy NL500 ten sam limit to ułamek bb." }
      - { text: "Bo przy NL500 sala bierze mniejszy procent", why: "Procent bywa podobny (ok. {{n:rake.ex.pct}}). Różnicę robi {{t:rake-cap|limit rake'u}}, który przy wysokich {{t:stakes|stawkach}} obcina opłatę z dużych {{t:pot|pul}}." }
      - { text: "Bo przy NL500 gra się mniej rąk na godzinę", why: "bb/100 liczy {{t:rake}} na 100 rąk, więc tempo gry go nie zmienia. Zmienia go {{t:rake-cap|limit rake'u}} wyrażony w bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} {{n:ex.bet.half}}. Sala pobiera {{n:rake.ex.pct}} {{t:pot|puli}} bez {{t:rake-cap|limitu}} w zasięgu. Ile equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz procent."
    answer: eq.bet-half.rake
    explanation: "Po {{t:call|sprawdzeniu}} w {{t:pot|puli}} jest {{n:ex.half.total}}, a po rake'u zostaje {{n:rake.ex.pot-after}}. Dopłacasz {{n:ex.bet.half}}, więc potrzebujesz {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} zamiast {{n:eq.bet-half}} bez rake'u."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Bez {{t:rake|rake'u}} {{t:call}} na bet pół {{t:pot|puli}} potrzebuje {{n:eq.bet-half}} equity. Ile potrzebuje przy {{t:rake|rake'u}} {{n:rake.ex.pct}}?"
    options:
      - { text: "Trochę więcej: ok. {{n:eq.bet-half.rake}}", correct: true, why: "Wygrywasz {{t:pot|pulę}} pomniejszoną o {{t:rake}}, a dopłacasz całą kwotę. Ręka tuż nad progiem bez rake'u może być już pod progiem z rake'iem." }
      - { text: "Tyle samo, bo {{t:rake}} płacą obaj gracze", why: "{{t:rake}} odejmuje się od {{t:pot|puli}}, którą wygrywasz, a nie od dopłaty. Próg rośnie do ok. {{n:eq.bet-half.rake}}." }
      - { text: "Mniej, bo {{t:pot}} jest większa", why: "{{t:pot}} po rake'u jest mniejsza, a nie większa, więc potrzebujesz więcej equity: ok. {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Grasz na sali, która pobiera {{t:rake}} tylko od {{t:pot|pul}}, które dochodzą do flopu. Ktoś przed tobą {{t:open|otwiera}}, ty jesteś w {{t:position|pozycji}} z ręką, która bez rake'u byłaby na granicy {{t:call|sprawdzenia}}. Co zmienia {{t:rake}}?"
    options:
      - { text: "{{t:call|Sprawdzam}} rzadziej: ręce z granicy {{t:call|sprawdzenia}} częściej {{t:fold|pasuję}} albo 3-betuję", correct: true, why: "W opublikowanych rozwiązaniach solvera z rake'iem gracze w {{t:position|pozycji}} wobec {{t:open|otwarcia}} grają o ok. {{n:gtow.rake.vpip-drop.low}}–{{n:gtow.rake.vpip-drop.high}} mniej rąk. Traci samo {{t:call|sprawdzenie}}, bo {{t:pot}} po flopie płaci {{t:rake}}, a {{t:pot}} wygrana 3-betem przed flopem nie." }
      - { text: "Nic: {{t:rake}} dotyczy tylko gry po flopie", why: "Właśnie dlatego zmienia decyzję przed flopem: {{t:call|sprawdzenie}} prowadzi do flopu i do rake'u, a 3-bet albo {{t:fold}} często kończą rozdanie bez niego." }
      - { text: "{{t:call|Sprawdzam}} częściej, bo {{t:pot|pule}} po flopie są duże", why: "Odwrotnie: {{t:rake}} zabiera część właśnie tych {{t:pot|pul}}. Solver z rake'iem {{t:call|sprawdza}} wyraźnie rzadziej." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "W tych samych rozwiązaniach solvera {{t:big-blind}} {{t:call|sprawdza}} min-raise w grze z rake'iem tylko w ok. {{n:gtow.rake.bb-minraise}} tych przypadków, w których {{t:call|sprawdza}} go bez rake'u. Co z tego wynika dla ciebie na {{t:big-blind|dużym blindzie}}?"
    options:
      - { text: "Bronię nadal dużo rąk, ale węziej niż w tabelach liczonych bez rake'u", correct: true, why: "{{t:big-blind}} wciąż broni często, bo ma już {{t:chips|żetony}} w {{t:pot|puli}} i zamyka akcję. {{t:rake}} odcina jednak najsłabsze {{t:call|sprawdzenia}}, więc tabele bez rake'u są dla ciebie za szerokie." }
      - { text: "Przestaję bronić {{t:big-blind|dużego blinda}} {{t:call|sprawdzeniem}}", why: "Nie: według autora {{t:call|sprawdzanie}} z blindów pozostaje ważną częścią strategii także z rake'iem. Zmienia się szerokość obrony, nie jej istnienie." }
      - { text: "Bronię tak samo szeroko, bo z {{t:big-blind|dużego blinda}} {{t:rake}} się nie liczy", why: "Liczy się: {{t:pot}} po {{t:call|sprawdzeniu}} dochodzi do flopu i płaci {{t:rake}}. Dlatego solver {{t:call|sprawdza}} z {{t:big-blind|dużego blinda}} rzadziej." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Na niektórych salach {{t:rake}} pobierany jest także od {{t:pot|pul}} z 3-betem, które kończą się przed flopem. Co to zmienia w argumencie „3-bet nie płaci rake'u”?"
    options:
      - { text: "Na takiej sali ten argument słabnie: 3-bet też płaci, więc przewaga 3-betu nad {{t:call|sprawdzeniem}} jest mniejsza", correct: true, why: "Wynik solvera dotyczy struktury „no flop, no drop”, w której {{t:pot}} bez flopu jest wolna od rake'u. Na takiej sali ta zasada obejmuje tylko {{t:pot|pule}} bez 3-betu, więc {{t:call|sprawdzenie}} wciąż traci na rake'u, ale 3-bet nie jest od niego wolny." }
      - { text: "Nic, bo {{t:rake}} z 3-betu jest pomijalny", why: "Nie wiemy tego bez rachunku dla konkretnej sali. Pewne jest tylko, że 3-bet przestaje być wolny od rake'u." }
      - { text: "Na takiej sali należy zawsze {{t:call|sprawdzać}} zamiast 3-betować", why: "{{t:call|Sprawdzenie}} prowadzi do flopu i płaci {{t:rake}} tak samo jak wcześniej. Zmienia się tylko to, że 3-bet też płaci." }
---
{{t:rake}} to opłata, którą sala pobiera z {{t:pot|puli}}. Gracze grają przeciw sobie, więc gdyby nie {{t:rake}}, razem wychodziliby na zero. Z rake'iem średni gracz traci dokładnie tyle, ile zabiera sala, a wygrywający musi ogrywać rywali o więcej, niż wynosi {{t:rake}}.

## Ile to kosztuje

Sala bierze procent {{t:pot|puli}}, ale nie więcej niż {{t:rake-cap|limit rake'u}} w dolarach. Na dwóch największych salach online przy NL2–NL10 to {{n:rake.ex.pct}} {{t:pot|puli}}. Na mikrostawkach {{t:pot|pule}} rzadko dochodzą do limitu, więc płacisz pełny procent.

Porównanie harmonogramów sal przelicza je na bb/100 na rozkładzie {{t:pot|pul}} z kilku milionów rąk:

| {{t:stakes|Stawka}} (6-max, dwie największe sale online) | {{t:rake}} |
|---|---|
| NL2–NL25 | ok. {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | ok. {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Typowy wygrywający gracz na niskich {{t:stakes|stawkach}} ma winrate {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (moduł 12): kilka razy mniej, niż płaci sali. Przy wyższych {{t:stakes|stawkach}} ten sam limit w dolarach to ułamek bb, więc {{t:rake}} w bb/100 spada.

Dane z populacji mówią to samo. W raporcie o populacji (cash 6-max, NL10–NL500) każdy gracz traci średnio {{n:tombos.nl10.loss}} przy NL10, {{n:tombos.nl100.loss}} przy NL100 i {{n:tombos.nl500.loss}} przy NL500. Wśród graczy z co najmniej {{n:tombos.reg.hands}} rąk ok. {{n:tombos.reg.prerake}} wygrywa przed odliczeniem rake'u, a po odliczeniu ok. {{n:tombos.reg.postrake}}.

## Próg {{t:call|sprawdzenia}} z rake'iem

Wygrywasz {{t:pot|pulę}} pomniejszoną o {{t:rake}}, a dopłacasz całą kwotę. Potrzebne equity z modułu 2 rośnie:

```formula
potrzebne equity = dopłata ÷ ({{t:pot}} po {{t:call|sprawdzeniu}} × (1 − {{t:rake}}))
```

Bet {{n:ex.bet.half}} do {{t:pot|puli}} {{n:ex.pot}}: bez rake'u potrzebujesz {{n:eq.bet-half}}, przy rake'u {{n:rake.ex.pct}} {{n:eq.bet-half.rake}}. Różnica jest mała w jednym rozdaniu, ale dotyczy każdej {{t:pot|puli}} po flopie.

## Co {{t:rake}} zmienia przed flopem

Na wielu salach {{t:rake}} pobiera się tylko od {{t:pot|pul}}, które dochodzą do flopu („no flop, no drop”). Wtedy {{t:pot}} wygrana przed flopem jest od niego wolna, a {{t:pot}} po {{t:call|sprawdzeniu}} płaci. W opublikowanych rozwiązaniach solvera z rake'iem NL100:

- gracze w {{t:position|pozycji}} wobec {{t:open|otwarcia}} grają o ok. {{n:gtow.rake.vpip-drop.low}}–{{n:gtow.rake.vpip-drop.high}} mniej rąk; traci głównie {{t:call|sprawdzenie}}, a 3-betów jest trochę więcej;
- {{t:big-blind}} {{t:call|sprawdza}} min-raise tylko w ok. {{n:gtow.rake.bb-minraise}} tych przypadków, co bez rake'u, choć obrona z blindów nadal opiera się na {{t:call|sprawdzaniu}}.

Z tego samego powodu w module 3 z {{t:small-blind|małego blinda}} {{t:raise|przebijasz}} albo {{t:fold|pasujesz}}, bez dopłacania do {{t:big-blind|dużego blinda}}. Niektóre sale pobierają {{t:rake}} także od {{t:pot|pul}} z 3-betem, które kończą się przed flopem; tam 3-bet nie jest od niego wolny.

:::note Źródła
Wysokość rake'u: porównanie rake'u sal online z 2026 roku (harmonogramy dwóch największych sal przeliczone na bb/100, odczyt 5 października 2026); inne sale mają inne liczby. Strata populacji: niezależny raport o populacji (cash 6-max NLHE, sale z bazami śledzenia rąk, gracze z co najmniej 100 rękami; sal i okresu autor nie podaje). Wpływ rake'u na grę przed flopem: opublikowany artykuł o rozmiarach podbicia przed flopem, rozwiązania solvera dla stacków {{n:gtow.rake.depth}}; autor pisze, że wnioski w dużej mierze przenoszą się na inne formaty, więc dla stacku {{n:format.stack}} to uproszczenie. Próg equity to rachunek.
:::
