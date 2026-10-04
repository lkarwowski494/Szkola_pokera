---
id: m12.l1
module: m12
order: 1
title: "Wariancja w liczbach"
sub: "Ile mówi wynik z tysięcy rąk"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Wygrywasz średnio {{n:var.wr.ex}}/100 i rozegrasz {{n:var.hands.k}} tys. rąk. Ile wpisowych (po {{n:format.stack}}) wynosi twój oczekiwany wynik? Wpisz liczbę."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} tys. rąk to {{n:var.blocks}} bloków po 100 rąk. Oczekiwany wynik = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. To średnia: prawdziwy wynik może od niej daleko odbiegać."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Odchylenie standardowe twojej gry to {{n:var.sd}}/100. Ile wynosi odchylenie wyniku po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków po 100 rąk)?"
    options:
      - { text: "Ok. {{n:var.sd.result.bi}} wpisowego", correct: true, why: "Odchylenie rośnie z pierwiastkiem z liczby bloków: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowego." }
      - { text: "Ok. {{n:var.sd.wrong.bi}} wpisowych", why: "Tak wychodzi, gdy mnożysz odchylenie przez liczbę bloków. Losowe wahania częściowo się znoszą, więc mnożysz przez pierwiastek: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Ok. {{n:var.exp.bi}} wpisowych", why: "To oczekiwany wynik przy {{n:var.wr.ex}}/100, a nie jego odchylenie. Odchylenie wynosi ok. {{n:var.sd.result.bi}} wpisowego." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Wygrywasz {{n:var.wr.ex}}/100 przy odchyleniu {{n:var.sd}}/100. W jakim przedziale wypadnie twój wynik po {{n:var.hands.k}} tys. rąk z ok. {{n:var.conf95}} pewnością?"
    options:
      - { text: "Od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}} wpisowych", correct: true, why: "Oczekiwany wynik {{n:var.exp.bi}} wpisowych ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Nawet wyraźnie wygrywający gracz może po {{n:var.hands.k}} tys. rąk być prawie na zero." }
      - { text: "Od ok. {{n:var.ci68.low.bi}} do ok. {{n:var.ci68.high.bi}} wpisowych", why: "To przedział jednego odchylenia: obejmuje tylko ok. 2 z 3 wyników. Dla {{n:var.conf95}} bierzesz {{n:var.z95}} odchylenia: od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}}." }
      - { text: "Dokładnie {{n:var.exp.bi}} wpisowych", why: "To tylko średnia. Wynik waha się wokół niej o kilkadziesiąt wpisowych w obie strony." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków po 100) przy odchyleniu {{n:var.sd}}/100: ile wynosi błąd standardowy twojego winrate w bb/100? Przyjmij √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Wpisz liczbę."
    answer: var.se.wr
    explanation: "Błąd standardowy = SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}/100. Przedział {{n:var.conf95}} to ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}/100."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Po {{n:var.hands.k}} tys. rąk twój wynik to {{n:var.wr.ex}}/100, odchylenie {{n:var.sd}}/100. Co wiesz o swoim prawdziwym winrate?"
    options:
      - { text: "Z ok. {{n:var.conf95}} pewnością leży między ok. {{n:var.wr.ci.low}} a ok. {{n:var.wr.ci.high}}/100", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Po {{n:var.hands.k}} tys. rąk wiesz tylko, że raczej nie przegrywasz." }
      - { text: "Wynosi {{n:var.wr.ex}}/100, bo próbka jest duża", why: "{{n:var.hands.k}} tys. rąk brzmi jak dużo, ale przy odchyleniu {{n:var.sd}}/100 błąd wynosi wciąż ok. ± {{n:var.ci.wr}}/100." }
      - { text: "Nic, wynik w pokerze to czysty los", why: "Przesada. Próbka zawęża przedział, tylko wolno: błąd maleje z pierwiastkiem z liczby rąk." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Chcesz znać swój winrate z dokładnością ± {{n:var.target}}/100 przy {{n:var.conf95}} pewności. Odchylenie wynosi {{n:var.sd}}/100. Ile rąk potrzebujesz?"
    options:
      - { text: "Ok. {{n:var.need.hands.k}} tys.", correct: true, why: "Bloki = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. To ok. {{n:var.need.hands.k}} tys. rąk." }
      - { text: "Ok. {{n:var.hands.k}} tys.", why: "Po {{n:var.hands.k}} tys. rąk błąd wynosi ok. ± {{n:var.ci.wr}}/100. Żeby go zmniejszyć do ± {{n:var.target}}, potrzebujesz ok. {{n:var.need.hands.k}} tys. rąk." }
      - { text: "Ok. {{n:var.need.blocks}} rąk", why: "To liczba bloków po 100 rąk. Rąk jest sto razy więcej: ok. {{n:var.need.hands.k}} tys." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Gracz wygrywa {{n:var.wr.ex}}/100 przy odchyleniu {{n:var.sd}}/100. Jak często w ciągu {{n:var.hands.k}} tys. rąk zdarzy mu się zjazd o co najmniej {{n:dd.bi.small}} wpisowych od najwyższego punktu?"
    options:
      - { text: "Prawie zawsze, ok. {{n:dd.p.small.100k}}", correct: true, why: "Symulacja {{n:var.hands.k}} tys. rąk przy tych parametrach daje taki zjazd w ok. {{n:dd.p.small.100k}} przebiegów. Zjazd o {{n:dd.bi.small}} wpisowych jest normalną częścią gry wygrywającego gracza." }
      - { text: "W ok. {{n:dd.p.small.20k}} przypadków", why: "Tyle wychodzi dla krótszej próbki, {{n:dd.hands.short.k}} tys. rąk. W {{n:var.hands.k}} tys. rąk szans na głęboki zjazd jest dużo więcej: ok. {{n:dd.p.small.100k}}." }
      - { text: "Rzadko, ok. {{n:var.p.lose}}", why: "Tak rzadko gracz {{n:var.wr.ex}}/100 kończy {{n:var.hands.k}} tys. rąk na minusie. Zjazd po drodze to coś innego: zdarza się prawie zawsze." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Dwóch graczy, odchylenie {{n:var.sd}}/100, {{n:var.hands.k}} tys. rąk. Jeden wygrywa {{n:var.wr.ex}}/100, drugi {{n:dd.wr-low}}/100. Jak często każdy z nich trafi zjazd o {{n:dd.bi.big}} wpisowych?"
    options:
      - { text: "Pierwszy w ok. {{n:dd.p.big.100k}}, drugi w ok. {{n:dd.p.big.100k.wr-low}} przypadków", correct: true, why: "Niższy winrate słabiej ciągnie wynik w górę, więc zjazdy są głębsze i częstsze. Przy {{n:dd.wr-low}}/100, typowym dla wygrywających na mikrostawkach, zjazd o {{n:dd.bi.big}} wpisowych zdarza się częściej niż w co drugiej próbce." }
      - { text: "Obaj tak samo często, bo odchylenie jest to samo", why: "Odchylenie decyduje o wahaniach, ale winrate o tym, jak szybko wynik od nich ucieka. Przy {{n:dd.wr-low}}/100 zjazd o {{n:dd.bi.big}} wpisowych zdarza się w ok. {{n:dd.p.big.100k.wr-low}} próbek, przy {{n:var.wr.ex}}/100 w ok. {{n:dd.p.big.100k}}." }
      - { text: "Żaden: zjazd o {{n:dd.bi.big}} wpisowych zdarza się tylko przegrywającym", why: "Nieprawda. Nawet gracz {{n:var.wr.ex}}/100 trafia go w ok. {{n:dd.p.big.100k}} próbek {{n:var.hands.k}} tys. rąk." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Od miesiąca jesteś {{n:dd.bi.small}} wpisowych pod kreską. Co z tego wynika?"
    options:
      - { text: "Sam zjazd niczego nie przesądza; sprawdzasz decyzje w przegranych rozdaniach", correct: true, why: "Zjazd o {{n:dd.bi.small}} wpisowych trafia prawie każdego wygrywającego gracza. O tym, czy grasz dobrze, mówi przegląd decyzji, a nie sam wynik." }
      - { text: "Grasz źle i musisz zmienić cały styl gry", why: "Zjazdy tej wielkości zdarzają się graczom wygrywającym w ok. {{n:dd.p.small.100k}} próbek {{n:var.hands.k}} tys. rąk. Zmiana stylu z powodu samego wyniku to reagowanie na szum." }
      - { text: "Na pewno masz pecha, nic nie musisz sprawdzać", why: "Zjazd może też wynikać z błędów. Wynik nie odróżni pecha od błędu, ale przegląd rozdań może to zrobić." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Jakie odchylenie standardowe jest typowe dla cash game 6-max No-Limit Hold'em?"
    options:
      - { text: "Ok. {{n:var.sd.low}}–{{n:var.sd.high}}/100", correct: true, why: "Tak podają kalkulatory wariancji. Najczęściej jako typową wartość przyjmuje się ok. {{n:var.sd}}/100. Agresywny styl daje wyższe odchylenie." }
      - { text: "Ok. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}/100", why: "To typowy winrate wygrywających graczy na mikrostawkach. Odchylenie jest kilkadziesiąt razy większe od winrate i dlatego wyniki tak bardzo skaczą." }
      - { text: "Ok. {{n:var.sd.result.bi}} wpisowego na 100 rąk", why: "To odchylenie wyniku po {{n:var.hands.k}} tys. rąk, a nie na 100 rąk." }
---
Twój wynik w pokerze to suma dwóch rzeczy: tego, jak dobrze grasz, i losu. Oba składniki da się zmierzyć. Winrate mówi, ile wygrywasz średnio, a odchylenie standardowe, jak bardzo wynik skacze wokół tej średniej.

## Dwie liczby w bb/100

**Winrate** to średni zysk na 100 rąk w dużych blindach. Wygrywający gracze na mikrostawkach mają zwykle {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}/100.

**Odchylenie standardowe (SD)** to typowy rozrzut wyniku na 100 rąk. W cash game 6-max wynosi zwykle {{n:var.sd.low}}–{{n:var.sd.high}}/100, a jako typową wartość przyjmuje się {{n:var.sd}}/100. Odchylenie jest kilkadziesiąt razy większe od winrate, więc wynik z jednej sesji, a nawet z miesiąca, mówi bardzo mało.

## Wynik po wielu rękach

Liczbę rąk dzielisz przez 100 i dostajesz liczbę bloków.

```formula
oczekiwany wynik = winrate × liczba bloków
odchylenie wyniku = SD × √(liczba bloków)
przedział {{n:var.conf95}} = oczekiwany wynik ± {{n:var.z95}} × odchylenie wyniku
```

Przykład: {{n:var.wr.ex}}/100, SD {{n:var.sd}}/100, {{n:var.hands.k}} tys. rąk, czyli {{n:var.blocks}} bloków. Oczekujesz {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. Odchylenie wyniku to {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowego. Z {{n:var.conf95}} pewnością skończysz między ok. **{{n:var.ci.low.bi}} a {{n:var.ci.high.bi}} wpisowych**. Oczekiwany wynik leży ok. {{n:var.z.lose}} odchylenia nad zerem, więc szansa, że po {{n:var.hands.k}} tys. rąk będziesz na minusie, wynosi ok. {{n:var.p.lose}}.

## Ile rąk, żeby poznać swój winrate

Ten sam rachunek działa w drugą stronę. Błąd oszacowania winrate maleje z pierwiastkiem z liczby rąk:

```formula
błąd winrate = SD ÷ √(liczba bloków)
potrzebne bloki = ({{n:var.z95}} × SD ÷ dokładność)²
```

Po {{n:var.hands.k}} tys. rąk błąd wynosi ok. {{n:var.se.wr}}/100, więc przedział {{n:var.conf95}} to ± {{n:var.ci.wr}}/100. Wynik {{n:var.wr.ex}}/100 znaczy wtedy tylko tyle, że prawdziwy winrate leży gdzieś między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}/100. Żeby poznać winrate z dokładnością ± {{n:var.target}}/100, potrzebujesz ok. **{{n:var.need.hands.k}} tys. rąk**.

## Zjazdy są normalne

Zjazd to spadek wyniku od najwyższego punktu. Symulacja gracza {{n:var.wr.ex}}/100 przy SD {{n:var.sd}}/100:

| Zjazd od szczytu | W {{n:dd.hands.short.k}} tys. rąk | W {{n:var.hands.k}} tys. rąk | W {{n:var.hands.k}} tys. rąk przy {{n:dd.wr-low}}/100 |
|---|---|---|---|
| {{n:dd.bi.small}} wpisowych | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} wpisowych | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Skąd te liczby
Wyniki symulacji: tysiące przebiegów gry po {{n:var.hands.k}} tys. rąk z losowym wynikiem każdego bloku. Prawdziwe zjazdy bywają nieco głębsze, bo wynik zmienia się z każdym rozdaniem, a nie co 100 rąk. Wniosek: zjazd o {{n:dd.bi.small}} wpisowych nie dowodzi, że grasz źle.
:::
