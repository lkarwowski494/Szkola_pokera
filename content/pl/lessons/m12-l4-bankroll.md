---
id: m12.l4
module: m12
order: 4
title: "Bankroll"
sub: "Ile pieniędzy na grę i kiedy zejść stawkę"
rules: [R-M12-009, R-M12-010, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-010]
    prompt: "Wpisowe to {{n:format.stack}}. Ile bb ma bankroll {{n:br.bi.base}} wpisowych? Wpisz liczbę."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Bankroll liczysz w wpisowych na stawkę, na której grasz."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Wygrywasz {{n:var.wr.typical.high}}/100 przy odchyleniu {{n:var.sd}}/100 i masz {{n:br.bi.base}} wpisowych ({{n:br.base.bb}}). Jakie jest ryzyko utraty całego bankrollu?"
    options:
      - { text: "Ok. {{n:ror.base}}", correct: true, why: "Wykładnik to 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, więc RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. To szansa, że kiedykolwiek stracisz cały bankroll, jeśli nigdy nie zejdziesz stawkę." }
      - { text: "Ok. {{n:ror.half}}", why: "Tyle wychodzi przy połowie bankrollu, {{n:br.bi.move-down}} wpisowych. Przy {{n:br.bi.base}} wykładnik jest dwa razy większy, więc ryzyko spada do ok. {{n:ror.base}}." }
      - { text: "Zero, bo gracz wygrywa", why: "Wygrywający gracz też może trafić zjazd głębszy niż cały bankroll. Ryzyko maleje z bankrollem, ale nigdy nie spada do zera." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009, R-M12-010]
    prompt: "Ten sam bankroll {{n:br.bi.base}} wpisowych, odchylenie {{n:var.sd}}/100, ale winrate tylko {{n:var.wr.typical.low}}/100. Jakie jest ryzyko utraty bankrollu?"
    options:
      - { text: "Ok. {{n:ror.base.wr-min}}", correct: true, why: "Winrate stoi w wykładniku: przy {{n:var.wr.typical.low}}/100 zamiast {{n:var.wr.typical.high}}/100 wykładnik jest trzy razy mniejszy, a ryzyko rośnie z ok. {{n:ror.base}} do ok. {{n:ror.base.wr-min}}." }
      - { text: "Ok. {{n:ror.base}}, bo bankroll jest ten sam", why: "Ryzyko zależy od iloczynu winrate × bankroll. Niższy winrate działa jak mniejszy bankroll: wychodzi ok. {{n:ror.base.wr-min}}." }
      - { text: "Ok. {{n:ror.base.wr-ex}}", why: "Tyle wychodzi przy winrate {{n:var.wr.ex}}/100. Przy {{n:var.wr.typical.low}}/100 ryzyko jest kilkadziesiąt razy większe: ok. {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-beginner
    family: m12.bankroll-size
    rules: [R-M12-010]
    prompt: "Zaczynasz grać na prawdziwe pieniądze i nie znasz jeszcze swojego winrate. Ile wpisowych powinieneś mieć na wybranej stawce?"
    options:
      - { text: "Co najmniej {{n:br.bi.beginner}}", correct: true, why: "Bez potwierdzonego winrate zakładasz ostrożnie, że jest niski. Nawet {{n:br.bi.beginner}} wpisowych przy {{n:var.wr.typical.low}}/100 zostawia ok. {{n:ror.beginner.wr-min}} ryzyka, a {{n:br.bi.base}} aż ok. {{n:ror.base.wr-min}}." }
      - { text: "Ok. {{n:dd.bi.small}}", why: "Zjazd o {{n:dd.bi.small}} wpisowych zdarza się prawie każdemu wygrywającemu, więc taki bankroll szybko by się skończył." }
      - { text: "Co najmniej {{n:br.bi.base}}", why: "To minimum dla gracza z potwierdzonym winrate. Bez tej wiedzy bierzesz zapas: {{n:br.bi.beginner}} wpisowych." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Zacząłeś stawkę z {{n:br.bi.base}} wpisowymi. Po zjeździe masz {{n:br.ex.below}}. Co robisz?"
    options:
      - { text: "Schodzisz o jedną stawkę niżej", correct: true, why: "Spadłeś poniżej połowy założonego bankrollu ({{n:br.bi.move-down}}). Przy tylu wpisowych ryzyko utraty reszty jest kilka razy większe niż przy {{n:br.bi.base}}. Na niższej stawce te same pieniądze to znów pełny bankroll." }
      - { text: "Grasz dalej, bo to tylko wariancja", why: "To prawda, że to pewnie wariancja, ale właśnie przed nią chroni zejście stawkę. Z {{n:br.ex.below}} wpisowymi kolejny zjazd może zabrać wszystko." }
      - { text: "Przechodzisz na wyższą stawkę, żeby szybciej odrobić", why: "To tilt z desperacji. Wyższa stawka przy mniejszym bankrollu w wpisowych gwałtownie zwiększa ryzyko bankructwa." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Zacząłeś stawkę z {{n:br.bi.base}} wpisowymi i straciłeś {{n:dd.bi.small}}. Masz teraz {{n:br.ex.after-dd}}. Co robisz?"
    options:
      - { text: "Zostajesz na stawce i przeglądasz decyzje w przegranych rozdaniach", correct: true, why: "{{n:br.ex.after-dd}} wpisowych to wciąż więcej niż próg {{n:br.bi.move-down}}. Zjazd o {{n:dd.bi.small}} wpisowych jest normalny, a przegląd rozdań sprawdza, czy to nie błędy." }
      - { text: "Schodzisz stawkę od razu", why: "Próg zejścia to połowa bankrollu: {{n:br.bi.move-down}} wpisowych. Schodzenie po każdym zjeździe o {{n:dd.bi.small}} wpisowych oznaczałoby schodzenie prawie zawsze, bo taki zjazd trafia ok. {{n:dd.p.small.100k}} wygrywających w {{n:var.hands.k}} tys. rąk." }
      - { text: "Dokładasz pieniądze, żeby mieć znów {{n:br.bi.base}}", why: "Dokładanie pieniędzy po każdym zjeździe zaciera sens bankrollu jako granicy ryzyka. Ustalasz próg z góry i trzymasz się go." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-010]
    prompt: "Po dobrym miesiącu masz {{n:br.bi.base}} wpisowych obecnej stawki. Wyższa stawka ma dwa razy większe wpisowe. Czy przechodzisz wyżej?"
    options:
      - { text: "Nie, na wyższej stawce to tylko połowa wymaganego bankrollu", correct: true, why: "Liczysz bankroll w wpisowych stawki, na którą chcesz przejść. Twoje {{n:br.bi.base}} wpisowych to tam {{n:br.bi.move-down}}, czyli dokładnie próg zejścia." }
      - { text: "Tak, bo dobrze ci idzie", why: "Dobry miesiąc to głównie wariancja (lekcja o wariancji). Przejście w górę zależy od bankrollu na nowej stawce." }
      - { text: "Tak, bo masz już {{n:br.bi.base}} wpisowych", why: "{{n:br.bi.base}} wpisowych obecnej stawki to tylko {{n:br.bi.move-down}} na stawce dwa razy wyższej." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Gracz przegrywa średnio na swojej stawce, ale ma ogromny bankroll. Co mu to daje?"
    options:
      - { text: "Tylko odsuwa stratę w czasie", correct: true, why: "Przy ujemnym winrate wynik średnio spada, więc prędzej czy później straci bankroll niezależnie od jego wielkości. Bankroll chroni przed wariancją, a nie przed słabą grą." }
      - { text: "Chroni go przed bankructwem", why: "Wzór na ryzyko działa tylko przy dodatnim winrate. Przegrywający gracz traci bankroll z pewnością, tylko wolniej przy większym bankrollu." }
      - { text: "Pozwala mu grać wyższe stawki", why: "Wyższa stawka przy ujemnym winrate tylko przyspiesza stratę." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Dopiero zaczynasz. Jak dzielisz czas między naukę a grę?"
    options:
      - { text: "Ok. {{n:study.beginner}} nauki", correct: true, why: "Na początku nauka daje najwięcej: każda nowa reguła poprawia wiele przyszłych decyzji. Gra bez nauki utrwala błędy." }
      - { text: "Ok. {{n:study.min}} nauki", why: "To dolna granica dla gracza, który już wygrywa. Na początku nauka powinna przeważać." }
      - { text: "Sama gra, nauka przyjdzie z doświadczeniem", why: "Wynik gry to słaba informacja zwrotna (lekcja o decyzji i wyniku). Nauka z wyjaśnieniem i analiza rozdań uczą szybciej." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Wygrywasz już na swojej stawce. Jak dzielisz czas?"
    options:
      - { text: "Mniej więcej pół na pół, ale nigdy mniej niż {{n:study.min}} nauki", correct: true, why: "Gdy wygrywasz, możesz grać więcej, ale ideałem wciąż jest ok. {{n:study.winner}} nauki. Poniżej {{n:study.min}} gra przestaje się rozwijać." }
      - { text: "Tylko gra, skoro wygrywasz", why: "Gry się zmieniają, a rywale się uczą. Bez nauki przewaga topnieje. Dolna granica to {{n:study.min}} czasu na naukę." }
      - { text: "Ok. {{n:study.beginner}} nauki, jak na początku", why: "Możesz, jeśli przygotowujesz się do wyższych stawek. Gdy po prostu wygrywasz na swojej, wystarcza ok. {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Który sygnał świadczy o tym, że granie może przestawać być pod kontrolą?"
    options:
      - { text: "Po przegranej czujesz, że musisz jak najszybciej wrócić i odegrać straty", correct: true, why: "Odgrywanie strat to jeden z najczęściej wymienianych sygnałów problemu z hazardem. Jeśli rozpoznajesz u siebie takie sygnały, skorzystaj z kontaktów z karty o odpowiedzialnej grze." }
      - { text: "Analizujesz przegrane rozdania po sesji", why: "To zdrowy nawyk nauki. Sygnałem problemu jest m.in. odgrywanie strat, gra dłuższa niż planowana i granie za pożyczone pieniądze." }
      - { text: "Kończysz sesję zgodnie z planem", why: "To dobra kontrola gry. Sygnałem problemu byłaby gra dłuższa niż planowana albo potrzeba odegrania się." }
---
Bankroll to pieniądze przeznaczone wyłącznie na pokera, oddzielone od pieniędzy na życie. Liczysz go w **wpisowych**: jedno wpisowe to pełny stack {{n:format.stack}} na stawce, na której grasz.

## Ryzyko bankructwa

Ryzyko, że kiedykolwiek stracisz cały bankroll, jeśli nigdy nie zejdziesz stawkę:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

Winrate i SD podajesz w bb/100, bankroll w bb. Przy odchyleniu {{n:var.sd}}/100:

| Winrate | {{n:br.bi.move-down}} wpisowych | {{n:br.bi.base}} wpisowych | {{n:br.bi.beginner}} wpisowych |
|---|---|---|---|
| {{n:var.wr.typical.low}}/100 | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}}/100 | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}}/100 | — | {{n:ror.base.wr-ex}} | — |

Winrate i bankroll stoją we wzorze obok siebie: dwa razy niższy winrate wymaga dwa razy większego bankrollu dla tego samego ryzyka. Przy ujemnym winrate żaden bankroll nie pomoże, bo chroni przed wariancją, a nie przed słabą grą.

## Ile wpisowych

Źródła różnią się bardzo: od {{n:br.bi.src-low}} do ponad {{n:br.bi.src-high}} wpisowych. Rachunek pokazuje, skąd ta różnica: wszystko zależy od winrate, a ten na początku jest nieznany i zwykle niski. Dlatego:

- **{{n:br.bi.beginner}} wpisowych**, póki nie znasz swojego winrate,
- **{{n:br.bi.base}} wpisowych** jako minimum dla gracza, który potwierdził, że wygrywa.

## Kiedy zejść stawkę

Ustal próg z góry: schodzisz o jedną stawkę niżej, gdy bankroll spadnie poniżej **połowy** założonej liczby wpisowych, np. z {{n:br.bi.base}} do {{n:br.bi.move-down}}. Na niższej stawce te same pieniądze znów są pełnym bankrollem. Wracasz wyżej, gdy masz pełny bankroll w wpisowych wyższej stawki. Sam zjazd o {{n:dd.bi.small}} wpisowych nie jest powodem do zejścia: zdarza się prawie każdemu wygrywającemu.

## Nauka i gra

Na początku ok. {{n:study.beginner}} czasu przeznaczasz na naukę, a resztę na grę. Gdy wygrywasz na swojej stawce, ideałem jest ok. {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}} nauki.

:::note Odpowiedzialna gra
Poker na pieniądze to w Polsce gra hazardowa, dozwolona tylko dla osób pełnoletnich. Sygnały, że granie przestaje być pod kontrolą: grasz dłużej, niż planowałeś; po przegranej wracasz, żeby odegrać straty; stawiasz pieniądze, których nie możesz stracić, albo pożyczasz na grę; grasz, żeby uciec od zmartwień; ukrywasz granie przed bliskimi.

Gdzie szukać pomocy:

- **Telefon Zaufania uzależnienia behawioralne: 801 889 880**, codziennie 17.00–22.00 (opłata według taryfy operatora). Prowadzi go Instytut Psychologii Zdrowia PTP na zlecenie Krajowego Centrum Przeciwdziałania Uzależnieniom. Na stronie uzaleznieniabehawioralne.pl jest test „Czy mam problem z hazardem?” i baza placówek pomocy.
- **116 123**, telefon dla dorosłych w kryzysie emocjonalnym: bezpłatnie, całą dobę.
- **Anonimowi Hazardziści**: bezpłatne mityngi w całej Polsce i online (anonimowihazardzisci.org).
- W sytuacji zagrożenia życia: **112**.
:::
