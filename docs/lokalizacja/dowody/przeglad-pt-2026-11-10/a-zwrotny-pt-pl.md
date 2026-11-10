# Przekład zwrotny pt (Portugalia) → pl, moduł M12 (2026-11-10)

Kontrola jakości treści krytycznej. Tłumaczone bez wglądu w oryginał polski i w inne języki. Przekład dosłowny, bez poprawiania. Znaczniki `{{n:…}}`, `{{t:…}}`, `[T:…]` przepisane bez zmian (także etykieta po `|` w `{{t:…}}`, zostawiona po portugalsku).

Uwagi ogólne o przekładzie:
- Tekst pt używa formy grzecznościowej 3. osoby („Ganha”, „sabe”, „tem” = „Pan/Pani wygrywa”); oddaję ją 2. osobą lp. („wygrywasz”), bo tak brzmiałby naturalny polski tekst. Miejsca, gdzie forma czasownika może być zarówno trybem rozkazującym 2. os. („tu”), jak i oznajmującym formy grzecznościowej, oznaczam `[DWUZNACZNE: …]`, gdy zmienia to sens (polecenie czy opis).
- W lekcjach „stakes” to „limite” (oddaję: „limit”), w egzaminie i regułach „nível” (oddaję: „poziom”). To różnica w samym tekście pt, nie w przekładzie.
- Komentarze YAML (`#`) po polsku w plikach pt pominięte, poza zaznaczeniem ich miejsca.

---

## 1. `content/pt/lessons/m12-l1-wariancja.md`

### Frontmatter

```yaml
id: m12.l1
module: m12
order: 1
title: "Wariancja w liczbach"
sub: "Co mówi wynik na przestrzeni tysięcy rozdań"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Wygrywasz średnio {{n:var.wr.ex}} i zagrasz {{n:var.hands.k}} tys. rozdań. Ilu {{t:buy-in|buy-ins}} (po {{n:format.stack}} każdy) odpowiada twój wynik oczekiwany? Wpisz liczbę."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} tys. rozdań to {{n:var.blocks}} bloków po 100 rozdań. Wynik oczekiwany = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. Chodzi o średnią: rzeczywisty wynik może się od niej bardzo oddalić."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "{{t:standard-deviation|desvio-padrão}} twojej gry wynosi {{n:var.sd}}. Jakie jest {{t:standard-deviation|desvio}} wyniku po {{n:var.hands.k}} tys. rozdań ({{n:var.blocks}} bloków po 100 rozdań)?"
    options:
      - { text: "Około {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "{{t:standard-deviation|desvio}} rośnie z pierwiastkiem kwadratowym z liczby bloków: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli około {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "Około {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "Tyle wychodzi, gdy pomnoży się {{t:standard-deviation|desvio}} przez liczbę bloków. Losowe wahania częściowo się znoszą, dlatego mnoży się przez pierwiastek kwadratowy: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Około {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "To jest wynik oczekiwany przy {{n:var.wr.ex}}, a nie jego {{t:standard-deviation|desvio}}. {{t:standard-deviation|desvio}} wynosi około {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Wygrywasz {{n:var.wr.ex}} przy {{t:standard-deviation|desvio}} {{n:var.sd}}. W jakim przedziale znajdzie się twój wynik po {{n:var.hands.k}} tys. rozdań, z około {{n:var.conf95}} pewności?"
    options:
      - { text: "Od około {{n:var.ci.low.bi}} do około {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Wynik oczekiwany {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Nawet wyraźnie wygrywający gracz może być blisko zera po {{n:var.hands.k}} tys. rozdań." }
      - { text: "Od około {{n:var.ci68.low.bi}} do około {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "To jest przedział jednego {{t:standard-deviation|desvio}}: obejmuje tylko około 2 na 3 wyniki. Dla {{n:var.conf95}} bierze się {{n:var.z95}} {{t:standard-deviation|desvios}}: od około {{n:var.ci.low.bi}} do około {{n:var.ci.high.bi}}." }
      - { text: "Dokładnie {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "To jest tylko średnia. Wynik waha się wokół niej o kilkadziesiąt {{t:buy-in|buy-ins}} w każdą stronę." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Po {{n:var.hands.k}} tys. rozdań ({{n:var.blocks}} bloków po 100), przy {{t:standard-deviation|desvio}} {{n:var.sd}}: jaki jest błąd standardowy twojego winrate w bb/100? Przyjmij √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Wpisz liczbę."
    answer: var.se.wr
    explanation: "Błąd standardowy = SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Przedział {{n:var.conf95}} to ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Po {{n:var.hands.k}} tys. rozdań twój wynik to {{n:var.wr.ex}}, {{t:standard-deviation|desvio}} {{n:var.sd}}. Co wiesz o swoim prawdziwym winrate?"
    options:
      - { text: "Z około {{n:var.conf95}} pewności mieści się między około {{n:var.wr.ci.low}} a około {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Po {{n:var.hands.k}} tys. rozdań wiesz tylko, że prawdopodobnie nie przegrywasz." }
      - { text: "Wynosi {{n:var.wr.ex}}, bo próba jest duża", why: "{{n:var.hands.k}} tys. rozdań wydaje się dużo, ale przy {{t:standard-deviation|desvio}} {{n:var.sd}} błąd nadal wynosi około ± {{n:var.ci.wr}}." }
      - { text: "Nic, wynik w pokerze to czyste szczęście", why: "Przesada. Próba zawęża przedział, tyle że powoli: błąd maleje z pierwiastkiem kwadratowym z liczby rozdań." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Chcesz poznać swój winrate z dokładnością ± {{n:var.target}} i {{n:var.conf95}} pewności. {{t:standard-deviation|desvio}} wynosi {{n:var.sd}}. Ilu rozdań potrzebujesz?"
    options:
      - { text: "Około {{n:var.need.hands.k}} tys.", correct: true, why: "Bloki = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Odpowiada to około {{n:var.need.hands.k}} tys. rozdań." }
      - { text: "Około {{n:var.hands.k}} tys.", why: "Po {{n:var.hands.k}} tys. rozdań błąd wynosi około ± {{n:var.ci.wr}}. Żeby go zmniejszyć do ± {{n:var.target}}, potrzebujesz około {{n:var.need.hands.k}} tys. rozdań." }
      - { text: "Około {{n:var.need.blocks}} rozdań", why: "To jest liczba bloków po 100 rozdań. Rozdań jest sto razy więcej: około {{n:var.need.hands.k}} tys." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Gracz wygrywa {{n:var.wr.ex}} przy {{t:standard-deviation|desvio}} {{n:var.sd}}. Jak często w ciągu {{n:var.hands.k}} tys. rozdań będzie miał {{t:downswing}} co najmniej {{n:dd.bi.small}} {{t:buy-in|buy-ins}} od najwyższego punktu?"
    options:
      - { text: "Prawie zawsze, około {{n:dd.p.small.100k}}", correct: true, why: "Symulacja {{n:var.hands.k}} tys. rozdań z tymi parametrami daje taki {{t:downswing}} w około {{n:dd.p.small.100k}} przebiegów. {{t:downswing|downswing}} o {{n:dd.bi.small}} {{t:buy-in|buy-ins}} to normalna część gry wygrywającego gracza." }
      - { text: "W około {{n:dd.p.small.20k}} przypadków", why: "To jest wartość dla krótszej próby, {{n:dd.hands.short.k}} tys. rozdań. W {{n:var.hands.k}} tys. rozdań szans na głęboki {{t:downswing}} jest dużo więcej: około {{n:dd.p.small.100k}}." }
      - { text: "Rzadko, około {{n:var.p.lose}}", why: "Tak rzadko gracz z {{n:var.wr.ex}} kończy {{n:var.hands.k}} tys. rozdań na minusie. {{t:downswing|downswing}} po drodze to co innego: zdarza się prawie zawsze." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Dwóch graczy, {{t:standard-deviation|desvio}} {{n:var.sd}}, {{n:var.hands.k}} tys. rozdań. Jeden wygrywa {{n:var.wr.ex}}, drugi {{n:dd.wr-low}}. Jak często każdy z nich przejdzie {{t:downswing}} o {{n:dd.bi.big}} {{t:buy-in|buy-ins}}?"
    options:
      - { text: "Pierwszy w około {{n:dd.p.big.100k}}, drugi w około {{n:dd.p.big.100k.wr-low}} przypadków", correct: true, why: "Niższy winrate ciągnie wynik w górę z mniejszą siłą, dlatego {{t:downswing|downswings}} są głębsze i częstsze. Przy {{n:dd.wr-low}}, typowym dla wygrywających na mikrolimitach, {{t:downswing}} o {{n:dd.bi.big}} {{t:buy-in|buy-ins}} zdarza się w ponad połowie prób." }
      - { text: "Obaj równie często, bo {{t:standard-deviation|desvio}} jest takie samo", why: "{{t:standard-deviation|desvio}} wyznacza wahania, ale winrate wyznacza, jak szybko wynik się od nich oddala. Przy {{n:dd.wr-low}} {{t:downswing}} o {{n:dd.bi.big}} {{t:buy-in|buy-ins}} zdarza się w około {{n:dd.p.big.100k.wr-low}} prób; przy {{n:var.wr.ex}} w około {{n:dd.p.big.100k}}." }
      - { text: "Żaden: {{t:downswing}} o {{n:dd.bi.big}} {{t:buy-in|buy-ins}} zdarza się tylko przegrywającym graczom", why: "Fałsz. Nawet gracz z {{n:var.wr.ex}} przechodzi go w około {{n:dd.p.big.100k}} prób po {{n:var.hands.k}} tys. rozdań." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Od miesiąca jesteś {{n:dd.bi.small}} {{t:buy-in|buy-ins}} pod kreską. Co z tego wynika?"
    options:
      - { text: "Sam {{t:downswing}} niczego nie rozstrzyga; przejrzyj decyzje w przegranych rozdaniach [DWUZNACZNE: „revê” = tryb rozkazujący 2. os. lp. „przejrzyj” albo tryb oznajmujący formy grzecznościowej „przeglądasz (Pan przegląda)”]", correct: true, why: "{{t:downswing|downswing}} o {{n:dd.bi.small}} {{t:buy-in|buy-ins}} w ciągu {{n:var.hands.k}} tys. rozdań dotyka prawie wszystkich graczy, którzy wygrywają od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}). To, czy grasz dobrze, czy nie, pokazuje przegląd decyzji, a nie sam wynik." }
      - { text: "Grasz źle i musisz zmienić cały swój styl gry", why: "{{t:downswing|Downswings}} tej wielkości zdarzają się graczom, którzy wygrywają {{n:var.wr.ex}} (SD {{n:var.sd}}), w około {{n:dd.p.small.100k}} prób po {{n:var.hands.k}} tys. rozdań. Zmiana stylu tylko z powodu wyniku to reagowanie na szum." }
      - { text: "Na pewno masz pecha, nie musisz niczego przeglądać", why: "{{t:downswing|downswing}} może też wynikać z błędów. Wynik nie odróżnia pecha od błędu, ale przegląd rozdań może to zrobić." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Jakie {{t:standard-deviation|desvio-padrão}} jest typowe w cash game 6-max No-Limit Hold'em?"
    options:
      - { text: "Około {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "Tyle podają kalkulatory {{t:variance|variância}}. Jako wartość typową najczęściej przyjmuje się około {{n:var.sd}}. Agresywny styl daje wyższe {{t:standard-deviation|desvio}}." }
      - { text: "Około {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "To jest typowy winrate wygrywających graczy na mikrolimitach. {{t:standard-deviation|desvio}} jest kilkadziesiąt razy większe od winrate i dlatego wyniki tak bardzo się wahają." }
      - { text: "Około {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} na 100 rozdań", why: "To jest {{t:standard-deviation|desvio}} wyniku po {{n:var.hands.k}} tys. rozdań, a nie na 100 rozdań." }
```

### Treść lekcji

Twój wynik w pokerze to suma dwóch rzeczy: jakości twojej gry i szczęścia. Obie składowe można zmierzyć. Winrate mówi, ile wygrywasz średnio, a {{t:standard-deviation|desvio-padrão}} mówi, jak bardzo wynik waha się wokół tej średniej.

## Dwie liczby w bb/100

**Winrate** to średni zysk na 100 rozdań w {{t:big-blind|big blinds}}. Wygrywający gracze na mikrolimitach mają zwykle {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**{{t:standard-deviation|desvio-padrão}} (SD)** to typowy rozrzut wyniku na 100 rozdań. W cash game 6-max mieści się zwykle między {{n:var.sd.low}}–{{n:var.sd.high}}, a jako wartość typową przyjmuje się {{n:var.sd}}. {{t:standard-deviation|desvio}} jest kilkadziesiąt razy większe od winrate, dlatego wynik {{t:session|sessão}}, a nawet miesiąca, mówi bardzo mało.

## Wynik na przestrzeni wielu rozdań

Podziel liczbę rozdań przez 100, żeby otrzymać liczbę bloków.

```formula
wynik oczekiwany = winrate × liczba bloków
odchylenie wyniku = SD × √(liczba bloków)
przedział {{n:var.conf95}} = wynik oczekiwany ± {{n:var.z95}} × odchylenie wyniku
```

Przykład: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} tys. rozdań, czyli {{n:var.blocks}} bloków. Oczekujesz {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. {{t:standard-deviation|desvio}} wyniku to {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli około {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. Z {{n:var.conf95}} pewności skończysz między około **{{n:var.ci.low.bi}} a {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. Wynik oczekiwany leży około {{n:var.z.lose}} {{t:standard-deviation|desvios}} powyżej zera, dlatego prawdopodobieństwo bycia na minusie po {{n:var.hands.k}} tys. rozdań wynosi około {{n:var.p.lose}}.

## Ile rozdań, żeby poznać swój winrate

Ten sam rachunek działa w odwrotną stronę. Błąd oszacowania winrate maleje z pierwiastkiem kwadratowym z liczby rozdań:

```formula
błąd winrate = SD ÷ √(liczba bloków)
potrzebne bloki = ({{n:var.z95}} × SD ÷ dokładność)²
```

Po {{n:var.hands.k}} tys. rozdań błąd wynosi około {{n:var.se.wr}}, dlatego przedział {{n:var.conf95}} to ± {{n:var.ci.wr}}. Wynik {{n:var.wr.ex}} oznacza więc tylko, że prawdziwy winrate leży gdzieś między około {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}. Żeby poznać winrate z dokładnością ± {{n:var.target}}, potrzebujesz około **{{n:var.need.hands.k}} tys. rozdań**.

## {{t:downswing|downswings}} są normalne

{{t:downswing|downswing}} to spadek wyniku od najwyższego punktu. Symulacja gracza z {{n:var.wr.ex}} przy SD {{n:var.sd}}:

| {{t:downswing|Downswing}} od szczytu | W {{n:dd.hands.short.k}} tys. rozdań | W {{n:var.hands.k}} tys. rozdań | W {{n:var.hands.k}} tys. rozdań przy {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Skąd te liczby
Wyniki symulacji: tysiące przebiegów po {{n:var.hands.k}} tys. rozdań każdy, z losowym wynikiem dla każdego bloku. Rzeczywiste {{t:downswing|downswings}} mogą być trochę głębsze, bo wynik zmienia się z każdym rozdaniem, a nie co 100 rozdań. Wniosek: {{t:downswing}} o {{n:dd.bi.small}} {{t:buy-in|buy-ins}} nie dowodzi, że grasz źle.
:::

To są ogólne wskazówki, a nie gwarancja wyników. Jeśli gra przestanie być pod kontrolą, zajrzyj na ekran „Pomoc” („Ajuda”).

---

## 2. `content/pt/lessons/m12-l4-bankroll.md`

### Frontmatter

```yaml
id: m12.l4
module: m12
order: 4
title: "Bankroll i ryzyko"
sub: "Wariancja mierzona w buy-inach i kiedy zejść z limitu"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Jeden {{t:buy-in|buy-in}} odpowiada {{n:format.stack}}. Ile bb ma bankroll o wielkości {{n:br.bi.base}} {{t:buy-in|buy-ins}}? Wpisz liczbę."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Bankroll liczy się w {{t:buy-in|buy-ins}} {{t:stakes|limite}}, na którym grasz."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Wygrywasz {{n:var.wr.typical.high}} przy {{t:standard-deviation|desvio-padrão}} {{n:var.sd}} i masz {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Jakie jest ryzyko utraty całego bankrollu?"
    options:
      - { text: "Około {{n:ror.base}}", correct: true, why: "Wykładnik to 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, więc RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. To prawdopodobieństwo, że kiedykolwiek stracisz cały bankroll, jeśli nigdy nie zejdziesz z {{t:stakes|limite}}." }
      - { text: "Około {{n:ror.half}}", why: "Tyle wychodzi przy połowie bankrollu, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. Przy {{n:br.bi.base}} wykładnik jest dwa razy większy, więc ryzyko spada do około {{n:ror.base}}." }
      - { text: "Zero, bo gracz wygrywa", why: "Wygrywający gracz też może trafić na {{t:downswing|downswing}} głębszy niż cały bankroll. Ryzyko maleje wraz z bankrollem, ale nigdy nie dochodzi do zera." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Ten sam bankroll {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}, ale winrate tylko {{n:var.wr.typical.low}}. Jakie jest ryzyko utraty bankrollu?"
    options:
      - { text: "Około {{n:ror.base.wr-min}}", correct: true, why: "Winrate jest w wykładniku: przy {{n:var.wr.typical.low}} zamiast {{n:var.wr.typical.high}} wykładnik jest trzy razy mniejszy, a ryzyko rośnie z około {{n:ror.base}} do około {{n:ror.base.wr-min}}." }
      - { text: "Około {{n:ror.base}}, bo bankroll jest ten sam", why: "Ryzyko zależy od iloczynu winrate × bankroll. Niższy winrate działa jak mniejszy bankroll: wychodzi około {{n:ror.base.wr-min}}." }
      - { text: "Około {{n:ror.base.wr-ex}}", why: "Tyle wychodzi przy winrate {{n:var.wr.ex}}. Przy {{n:var.wr.typical.low}} ryzyko jest kilkadziesiąt razy większe: około {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Masz {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}, ale jeszcze nie znasz swojego winrate. Co wiesz o ryzyku utraty całego bankrollu?"
    options:
      - { text: "Zależy od winrate: przy {{n:var.wr.typical.high}} około {{n:ror.base}}, przy {{n:var.wr.typical.low}} około {{n:ror.base.wr-min}}", correct: true, why: "Winrate jest w wykładniku, obok bankrollu. Nie znając winrate, nie znasz też ryzyka, a przy niskim winrate ten sam bankroll daje ryzyko kilka razy większe." }
      - { text: "Około {{n:ror.base}}, bo zależy tylko od bankrollu", why: "Tak wychodzi tylko przy {{n:var.wr.typical.high}}. Przy {{n:var.wr.typical.low}} ten sam bankroll daje około {{n:ror.base.wr-min}}." }
      - { text: "Zero, bo {{n:br.bi.base}} {{t:buy-in|buy-ins}} to dużo", why: "Przy dodatnim winrate ryzyko maleje wraz z bankrollem, ale nigdy nie dochodzi do zera. Przy {{n:var.wr.typical.low}} nadal wynosi około {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Zacząłeś na tym {{t:stakes|limite}} z {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Po {{t:downswing|downswing}} masz {{n:br.ex.below}}. Co robisz?"
    options:
      - { text: "Schodzisz o jeden {{t:stakes|limite}} [DWUZNACZNE: „Desce” = oznajmujący „schodzisz (Pan schodzi)” albo rozkazujący 2. os. „zejdź”]", correct: true, why: "Spadłeś poniżej połowy zakładanego bankrollu ({{n:br.bi.move-down}}). Przy tej liczbie {{t:buy-in|buy-ins}} ryzyko utraty reszty jest kilka razy większe niż przy {{n:br.bi.base}} (przy winrate {{n:var.wr.typical.high}} i SD {{n:var.sd}}). Na {{t:stakes|limite}} dwa razy niższym ten sam bankroll znów stanowi prawie pełną liczbę {{t:buy-in|buy-ins}} tego limitu." }
      - { text: "Grasz dalej, bo to tylko {{t:variance|variância}}", why: "To prawda, że prawdopodobnie to {{t:variance|variância}}, ale właśnie przed nią chroni zejście z {{t:stakes|limite}}. Przy {{n:br.ex.below}} {{t:buy-in|buy-ins}} kolejny {{t:downswing|downswing}} może zabrać wszystko." }
      - { text: "Wchodzisz na wyższy {{t:stakes|limite}}, żeby szybciej odrobić", why: "To tilt z desperacji. Wyższy {{t:stakes|limite}} przy mniejszym bankrollu w {{t:buy-in|buy-ins}} gwałtownie zwiększa {{t:risk-of-ruin|risco de ruína}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Zacząłeś na tym {{t:stakes|limite}} z {{n:br.bi.base}} {{t:buy-in|buy-ins}} i straciłeś {{n:dd.bi.small}}. Masz teraz {{n:br.ex.after-dd}}. Co robisz?"
    options:
      - { text: "Zostajesz na {{t:stakes|limite}} i przeglądasz decyzje w przegranych rozdaniach [DWUZNACZNE: „Fica… e revê” = oznajmujący albo rozkazujący 2. os. „zostań… i przejrzyj”]", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} to nadal więcej niż najpóźniejszy próg zejścia, {{n:br.bi.move-down}}. W symulacji taki {{t:downswing|downswing}} dotyka około {{n:dd.p.small.100k}} graczy, którzy wygrywają {{n:var.wr.ex}} w {{n:var.hands.k}} tys. rozdań, a przegląd rozdań sprawdza, czy nie chodzi o błędy." }
      - { text: "Schodzisz z {{t:stakes|limite}} od razu", correct: true, why: "To też dobra decyzja: niektóre źródła radzą zejść zaraz po stracie {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Zejście przed dojściem do połowy bankrollu nie jest błędem, ale zejście później już jest. [DWUZNACZNE: „descer depois já é” = „zejście dopiero po (przekroczeniu) połowy jest błędem” albo „zejście potem (po tym momencie) jest już [czymś innym/dobrą decyzją]”; podmiot orzeczenia domyślny]" }
      - { text: "Dokładasz {{t:buy-in|buy-ins}} z zewnątrz, żeby znów mieć {{n:br.bi.base}}", why: "Dokładanie pieniędzy po każdym {{t:downswing|downswing}} niweczy sens bankrollu jako granicy ryzyka. Ustal próg z góry i trzymaj się go." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Masz {{n:br.bi.base}} {{t:buy-in|buy-ins}} obecnego {{t:stakes|limite}}, czyli tyle, ile ustaliłeś jako bankroll. Wyższy {{t:stakes|limite}} ma {{t:buy-in|buy-in}} dwa razy większy. Wchodzisz wyżej?"
    options:
      - { text: "Nie, na wyższym {{t:stakes|limite}} to tylko połowa zakładanego bankrollu", correct: true, why: "Bankroll liczy się w {{t:buy-in|buy-ins}} {{t:stakes|limite}}, na który chcesz przejść. Twoje {{n:br.bi.base}} {{t:buy-in|buy-ins}} odpowiada tam {{n:br.bi.move-down}}, czyli dokładnie progowi zejścia." }
      - { text: "Tak, bo idzie dobrze", why: "Dobry miesiąc to głównie {{t:variance|variância}} (lekcja o {{t:variance|variância}}). Wejście wyżej zależy od bankrollu na nowym {{t:stakes|limite}}." }
      - { text: "Tak, bo masz już {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} obecnego {{t:stakes|limite}} to tylko {{n:br.bi.move-down}} na {{t:stakes|limite}} dwa razy wyższym." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Gracz średnio przegrywa na swoim {{t:stakes|limite}}, ale ma ogromny bankroll. Co mu to daje? [DWUZNACZNE: „lhe” = „jemu (graczowi)” albo „Panu/Pani (tobie)”]"
    options:
      - { text: "Tylko odsuwa stratę w czasie", correct: true, why: "Przy ujemnym winrate wynik średnio spada, więc prędzej czy później straci bankroll niezależnie od jego wielkości. Bankroll chroni przed {{t:variance|variância}}, a nie przed złą grą." }
      - { text: "Chroni go przed bankructwem [DWUZNACZNE: „o” = „jego (gracza)” albo „Pana (ciebie)”]", why: "Wzór na ryzyko działa tylko przy dodatnim winrate. Przegrywający gracz na pewno straci bankroll, tylko wolniej przy większym bankrollu." }
      - { text: "Pozwala mu grać na wyższych {{t:stakes|limites}} [DWUZNACZNE: „lhe” = „mu” albo „Panu (ci)”]", why: "Wyższy {{t:stakes|limite}} przy ujemnym winrate tylko przyspiesza stratę." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Zaczynasz. Jak dzielisz czas między naukę a grę?"
    options:
      - { text: "Około {{n:study.beginner}} nauki", correct: true, why: "Na początku masz najwięcej do nadrobienia, dlatego przeważa nauka." }
      - { text: "Około {{n:study.min}} nauki", why: "To minimum dla gracza, który już wygrywa. Na początku powinna przeważać nauka." }
      - { text: "Tylko gra; nauka przyjdzie z doświadczeniem", why: "Wynik gry to słaba informacja zwrotna (lekcja o decyzji i wyniku). Nauka z wyjaśnieniami i analiza rozdań uczą szybciej." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Już wygrywasz na swoim {{t:stakes|limite}}. Jak dzielisz czas?"
    options:
      - { text: "Mniej więcej pół na pół, ale nigdy mniej niż {{n:study.min}} nauki", correct: true, why: "Także gdy wygrywasz, ideałem jest około {{n:study.winner}} nauki, a minimum to {{n:study.min}}." }
      - { text: "Tylko gra, skoro wygrywasz", why: "Nawet gdy wygrywasz, nie schodzisz poniżej {{n:study.min}} czasu poświęconego nauce." }
      - { text: "Około {{n:study.beginner}} nauki, jak na początku", why: "Możesz, jeśli przygotowujesz się do wyższych {{t:stakes|limites}}. Jeśli po prostu wygrywasz na swoim, wystarczy około {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Jaki sygnał wskazuje, że gra może przestawać być pod kontrolą?"
    options:
      - { text: "Po przegranej wracasz do gry, żeby odrobić straty", correct: true, why: "Próby odrabiania strat to jeden z sygnałów problemu z grą na pieniądze wymienionych w kryteriach diagnostycznych. Jeśli rozpoznajesz u siebie te sygnały, skorzystaj z kontaktów z karty o odpowiedzialnej grze." }
      - { text: "Analizujesz przegrane rozdania po {{t:session|sessão}}", why: "To zdrowy nawyk nauki. Sygnałami problemu są m.in. próby odrabiania strat, granie dłużej niż planowano i granie za pożyczone pieniądze." }
      - { text: "Kończysz {{t:session|sessão}} zgodnie z planem", why: "To dobra kontrola gry. Sygnałem problemu byłoby granie dłużej niż planowano albo odczuwanie potrzeby odrobienia strat." }
  # [komentarz YAML po polsku w pliku pt, pominięty]
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
```

### Treść lekcji

Bankroll to cała rezerwa przeznaczona wyłącznie na grę w pokera. W tej lekcji liczysz go w **{{t:buy-in|buy-ins}}**, a nie w pieniądzach: jeden {{t:buy-in|buy-in}} to pełny stack {{n:format.stack}} na {{t:stakes|limite}}, na którym grasz.

## {{t:risk-of-ruin|Risco de ruína}}

To prawdopodobieństwo, że kiedykolwiek stracisz cały bankroll, jeśli będziesz dalej grać na tym samym {{t:stakes|limite}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

Wzór jest przybliżeniem, które zakłada stały winrate i SD. Winrate i SD podaje się w bb/100, a bankroll w bb. Przy {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Od czego zależy ryzyko

Winrate i bankroll stoją we wzorze obok siebie: dwa razy niższy winrate wymaga dwa razy większego bankrollu dla tego samego ryzyka. Dlatego ta sama liczba {{t:buy-in|buy-ins}} daje jednemu graczowi ryzyko kilka razy mniejsze niż drugiemu. Na początku winrate jest nieznany, a do jego oszacowania potrzeba bardzo wielu rozdań (lekcja o {{t:variance|variância}}). Przy ujemnym winrate żaden bankroll nie pomaga, bo chroni przed {{t:variance|variância}}, a nie przed złą grą.

## Kiedy zejść z {{t:stakes|limite}}

Ustal próg z góry: schodzisz o jeden {{t:stakes|limite}} najpóźniej wtedy, gdy bankroll spadnie do **połowy** zakładanej liczby {{t:buy-in|buy-ins}}, na przykład z {{n:br.bi.base}} do {{n:br.bi.move-down}}. Źródła podają progi między połową a całością bankrollu; połowa jest najpóźniejsza. Na {{t:stakes|limite}} dwa razy niższym ten sam bankroll znów stanowi prawie pełną liczbę {{t:buy-in|buy-ins}} tego limitu. Wracasz wyżej dopiero wtedy, gdy masz pełny bankroll w {{t:buy-in|buy-ins}} wyższego {{t:stakes|limite}}. Niektóre źródła radzą schodzić wcześniej, zaraz po stracie {{n:dd.bi.small}} {{t:buy-in|buy-ins}}: zejście przed progiem połowy nie jest błędem.

## Nauka i gra

Na początku poświęcasz około {{n:study.beginner}} czasu na naukę, a resztę na grę. Gdy wygrywasz na swoim {{t:stakes|limite}}, ideałem jest około {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}} nauki.

:::note Odpowiedzialna gra
Niektóre sygnały, że gra przestaje być pod kontrolą: grasz dłużej, niż planowałeś; po przegranej wracasz, żeby odrobić straty; grasz za pieniądze, których nie możesz stracić, albo pożyczasz, żeby grać; grasz, żeby uciec od zmartwień; ukrywasz granie przed bliskimi.

Gdzie szukać pomocy:

{{helplines}}
:::

---

## 3. `content/pt/exams/m12.yaml`

```yaml
module: m12
drills:
  - kind: choice
    id: m12.exam.q1
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Wygrywasz średnio {{n:var.wr.typical.high}} przy {{t:standard-deviation|desvio-padrão}} {{n:var.sd}} i zagrasz {{n:exam.m12.hands.k}} tys. rozdań ({{n:exam.m12.blocks}} bloków po 100). W jakim przedziale znajdzie się twój wynik, z około {{n:var.conf95}} ufności?"
    options:
      - { text: "Od około {{n:exam.m12.ci.low.bi}} do około {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. {{t:standard-deviation|desvio-padrão}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}." }
      - { text: "Dokładnie {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}", why: "{{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}} to wynik oczekiwany, czyli średnia. {{t:standard-deviation|desvio-padrão}} wyniku po {{n:exam.m12.hands.k}} tys. rozdań wynosi około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}, więc rzeczywisty wynik może być daleko od średniej." }
      - { text: "Od około {{n:exam.m12.exp.bi}} do około {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}: wygrywający gracz nie kończy na minusie", why: "Wygrywający gracz może skończyć na minusie: przy tych parametrach dolna granica przedziału wynosi około {{n:exam.m12.ci.low.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.exam.q2
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Po {{n:exam.m12.hands.k}} tys. rozdań twój winrate to {{n:var.wr.typical.high}}, a {{t:standard-deviation|desvio-padrão}} to {{n:var.sd}}. Co wiesz o swoim prawdziwym winrate?"
    options:
      - { text: "Z około {{n:var.conf95}} ufności mieści się między około {{n:exam.m12.wr.ci.low}} a około {{n:exam.m12.wr.ci.high}}", correct: true, why: "Błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}. Po {{n:exam.m12.hands.k}} tys. rozdań nie wiesz nawet, czy wygrywasz." }
      - { text: "Że wygrywasz, bo wynik jest dodatni po dużej próbie", why: "{{n:exam.m12.hands.k}} tys. rozdań to mała próba dla winrate: przedział {{n:var.conf95}} biegnie od około {{n:exam.m12.wr.ci.low}} do około {{n:exam.m12.wr.ci.high}}, więc obejmuje też granie na minusie." }
      - { text: "Że jest bardzo blisko {{n:var.wr.typical.high}}, bo próba jest duża", why: "Z {{n:exam.m12.hands.k}} tys. rozdań nie da się uzyskać tak wąskiego przedziału. Policz {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ ± {{n:exam.m12.ci.wr}}. [DWUZNACZNE: „Calcula” = rozkazujący 2. os. „policz” albo oznajmujący „liczysz (Pan liczy)”]" }
  - kind: choice
    id: m12.exam.q3
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Grasz agresywnie i twoje {{t:standard-deviation|desvio-padrão}} wynosi {{n:var.sd.high}}. Chcesz poznać swój winrate z dokładnością ± {{n:var.target}} i {{n:var.conf95}} ufności. Ilu rozdań potrzebujesz?"
    options:
      - { text: "Około {{n:exam.m12.need.hands.k}} tys.", correct: true, why: "Bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tys. rozdań. Wyższe {{t:standard-deviation|desvio-padrão}} wymaga dużo większej próby." }
      - { text: "Około {{n:var.need.hands.k}} tys., tyle samo co przy {{t:standard-deviation|desvio-padrão}} {{n:var.sd}}", why: "{{t:standard-deviation|desvio-padrão}} występuje we wzorze w kwadracie, więc przy {{n:var.sd.high}} zamiast {{n:var.sd}} potrzebujesz wyraźnie więcej rozdań: około {{n:exam.m12.need.hands.k}} tys." }
      - { text: "Wystarczy kilkadziesiąt tysięcy rozdań", why: "Błąd maleje tylko z pierwiastkiem kwadratowym z liczby rozdań. Przy {{n:var.sd.high}} i dokładności ± {{n:var.target}} potrzebujesz około {{n:exam.m12.need.blocks}} bloków po 100 rozdań." }
  - kind: choice
    id: m12.exam.q4
    family: m12.sample-size
    rules: [R-M12-005, R-M12-001]
    prompt: "Zmieniłeś styl gry i po {{n:exam.m12.style.hands.k}} tys. rozdań masz {{n:exam.m12.style.wr}}. {{t:standard-deviation|desvio-padrão}} wynosi {{n:var.sd}}. Czy to dowodzi, że nowy styl jest lepszy?"
    options:
      - { text: "Nie: przedział {{n:var.conf95}} to ± około {{n:exam.m12.style.ci}}; oceń nowe zagrania w przeglądzie rozdań [DWUZNACZNE: „avalia” = rozkazujący 2. os. „oceń” albo oznajmujący „oceniasz (Pan ocenia)”]", correct: true, why: "Błąd winrate po {{n:exam.m12.style.blocks}} blokach to {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, więc przedział to ± {{n:var.z95}} × {{n:exam.m12.style.se}} ≈ ± {{n:exam.m12.style.ci}}. Taki wynik mieści się zarówno w lepszym, jak i w gorszym stylu. O strategii rozstrzyga się przez przegląd decyzji." }
      - { text: "Tak: {{n:exam.m12.style.wr}} to dużo więcej niż typowy winrate", why: "Przy {{n:exam.m12.style.hands.k}} tys. rozdań przedział {{n:var.conf95}} to około ± {{n:exam.m12.style.ci}}. Wysoki wynik na małej próbie to głównie {{t:variance}}." }
      - { text: "Tak, jeśli wygrałeś większość {{t:session|sessões}}", why: "Liczba wygranych {{t:session|sessões}} to ten sam wynik, tylko pocięty na kawałki. Nadal opiera się na {{n:exam.m12.style.hands.k}} tys. rozdań i nie mówi, czy decyzje są lepsze." }
  - kind: choice
    id: m12.exam.q5
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Masz czysty {{t:flush-draw}}, a {{t:pot|pote}} wynosi {{n:ex.pot}}. Przeciwnik idzie all-in za {{n:ex.bet.half}} i nie da się już wygrać niczego więcej. Robisz {{t:call|call}}, {{t:flush}} wchodzi na riverze i wygrywasz. Jak oceniasz {{t:call}}?"
    options:
      - { text: "Był zły, mimo wygranej", correct: true, why: "Potrzebowałeś {{n:eq.bet-half}} equity, a {{t:flush-draw}} wchodzi na riverze w około {{n:odds.flush.turn-river}} przypadków. Przeciwnik jest all-in, więc potem nic ci już nie zapłaci. W wielu powtórzeniach taki {{t:call}} przegrywa." }
      - { text: "Był dobry, bo wygrałeś {{t:pot|pote}}", why: "Wynik jednego rozdania nie zmienia ceny. Ocena dotyczy decyzji przy informacji, którą miałeś: {{n:odds.flush.turn-river}} equity wobec potrzebnych {{n:eq.bet-half}}." }
      - { text: "Nie da się ocenić bez znajomości kart przeciwnika", why: "Do oceny wystarczy to, co wiedziałeś: przeciwnik jest all-in, twoja ręka wygrywa tylko, jeśli trafisz {{t:flush}}, a cena wymaga {{n:eq.bet-half}}." }
  - kind: choice
    id: m12.exam.q6
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Przegrałeś duży {{t:pot|pote}}. Wiesz, że zagrałeś dobrze i że to {{t:variance}}, a przeciwnik też zagrał poprawnie. Mimo to sama przegrana tak cię irytuje, że nie możesz się skupić. Jaki to rodzaj tiltu według klasyfikacji z lekcji o tilcie?"
    options:
      - { text: "Tilt z nienawiści do przegrywania", correct: true, why: "Wyzwalaczem jest sama przegrana, nawet gdy wiesz, że to {{t:variance}}. Nie obwiniasz szczęścia, siebie ani przeciwnika." }
      - { text: "Tilt z niesprawiedliwości", why: "Ten rodzaj wyzwala poczucie, że poker jest niesprawiedliwy: bad beaty, coolery, przeciwnicy trafiający na riverze. Tu wiesz, że wszystko przebiegło normalnie, a irytuje cię sama przegrana." }
      - { text: "Tilt z błędu", why: "Tilt z błędu to irytacja własnymi błędami. Tu wiesz, że zagrałeś dobrze." }
      - { text: "Tilt zemsty", why: "Zemsta kieruje się na przeciwnika, na przykład po braku szacunku. Tu przeciwnik zagrał poprawnie i to nie on jest przyczyną irytacji." }
  - kind: choice
    id: m12.exam.q7
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Po przegraniu trzech dużych {{t:pot|potes}} nie potrafisz już ocenić, czy twój ostatni {{t:call}} był dobry, i myślisz o wejściu na wyższy {{t:stakes|nível}}, żeby szybciej odrobić straty. Co robisz?"
    options:
      - { text: "Kończę {{t:session|sessão}}", correct: true, why: "Niemożność spokojnej oceny decyzji i chęć odrobienia strat to sygnały, że grasz już na swoim najgorszym poziomie gry (C-game). Celem jest przerwać wcześniej, zanim stracisz jeszcze więcej." }
      - { text: "Biorę kilka głębokich oddechów i gram dalej na wyższym {{t:stakes|nível}}", why: "Oddech pomaga przy pierwszych sygnałach tiltu, dopóki jeszcze myślisz jasno. Tu tilt już urósł, a wyższy {{t:stakes|nível}} tylko zwiększa straty." }
      - { text: "Gram dalej na tym samym {{t:stakes|nível}}, ale tylko silnymi rękami", why: "Gdy nie potrafisz już spokojnie oceniać decyzji, dalsza gra to gra na twoim najgorszym poziomie (C-game), niezależnie od tego, jakie ręce wybierasz. Kończysz {{t:session|sessão}}. [DWUZNACZNE: „Termina” = oznajmujący „kończysz (Pan kończy)” albo rozkazujący 2. os. „zakończ”]" }
  - kind: choice
    id: m12.exam.q8
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Wygrywasz {{n:dd.wr-low}} przy {{t:standard-deviation|desvio-padrão}} {{n:var.sd}} i masz {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Jakie jest ryzyko utraty całego bankrollu, jeśli nigdy nie zejdziesz z {{t:stakes|nível}}?"
    options:
      - { text: "Około {{n:exam.m12.ror}}", correct: true, why: "Wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}." }
      - { text: "Zero, bo wygrywasz", why: "Dodatni winrate nie chroni przed {{t:variance|variância}}. Przy tym bankrollu i tym winrate ryzyko wynosi około {{n:exam.m12.ror}}: wyraźnie powyżej zera." }
      - { text: "Około połowy, bo winrate jest niski", why: "Ryzyko maleje wykładniczo wraz z bankrollem. Przy {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} wykładnik wynosi {{n:exam.m12.ror.x}}, a e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}." }
  - kind: choice
    id: m12.exam.q9
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Ustaliłeś bankroll {{n:br.bi.beginner}} {{t:buy-in|buy-ins}}. Po {{t:downswing}} masz {{n:exam.m12.md.now}}. Co robisz?"
    options:
      - { text: "Schodzę o jeden {{t:stakes|nível}}", correct: true, why: "Próg zejścia to połowa ustalonej liczby {{t:buy-in|buy-ins}}: przy {{n:br.bi.beginner}} to {{n:exam.m12.md.half}}. Masz {{n:exam.m12.md.now}}, czyli mniej. Na {{t:stakes|nível}} dwa razy niższym ten sam bankroll znów odpowiada prawie pełnej liczbie {{t:buy-in|buy-ins}} tego poziomu. To ogólna wskazówka; jeśli gra przestanie być pod kontrolą, zajrzyj na ekran „Pomoc” („Ajuda”)." }
      - { text: "Zostaję, bo {{n:exam.m12.md.now}} to więcej niż próg {{n:br.bi.move-down}}", why: "Próg {{n:br.bi.move-down}} to połowa bankrollu {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Licz go od bankrollu, który sam ustaliłeś. Ustaliłeś {{n:br.bi.beginner}}, więc schodzisz najpóźniej przy {{n:exam.m12.md.half}}. [DWUZNACZNE: „Calcula-o” = rozkazujący 2. os. „licz go” albo oznajmujący „liczysz go (Pan liczy)”]" }
      - { text: "Zostaję i gram więcej, żeby odrobić straty", why: "Próby odrabiania strat to sygnał ostrzegawczy, a nie plan. Bankroll spadł poniżej progu {{n:exam.m12.md.half}}, więc schodzisz o jeden {{t:stakes|nível}}." }
  - kind: choice
    id: m12.exam.q10
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Twój winrate okazuje się dwa razy niższy, niż zakładałeś, a {{t:standard-deviation|desvio-padrão}} się nie zmienia. Ilu {{t:buy-in|buy-ins}} potrzebujesz, żeby {{t:risk-of-ruin|risco de ruína}} pozostało takie samo?"
    options:
      - { text: "Dwa razy więcej", correct: true, why: "We wzorze RoR = e^(−2 × winrate × bankroll ÷ SD²) winrate i bankroll występują obok siebie jako iloczyn. Gdy winrate spada o połowę, ten sam wykładnik uzyskuje się tylko przy dwa razy większym bankrollu." }
      - { text: "Tyle samo, bo ryzyko zależy tylko od bankrollu", why: "Winrate jest w wykładniku, obok bankrollu. Przy niższym winrate ten sam bankroll daje większe ryzyko." }
      - { text: "Cztery razy więcej", why: "W kwadracie jest {{t:standard-deviation|desvio-padrão}}, a nie winrate. Winrate i bankroll tworzą iloczyn, więc wystarczy dwa razy więcej {{t:buy-in|buy-ins}}." }
```

---

## 4. `content/pt/helplines.yaml`

```yaml
# [komentarze YAML po polsku w pliku pt (linie 1–10), pominięte]
checked: '2026-11-04'
review_by: '2027-11-04'
pointer: 'Ten sam kontakt znajdziesz w aplikacji, na ekranie „Pomoc” („Ajuda”). [DWUZNACZNE: „Encontra” = oznajmujący „znajdziesz (Pan znajduje)” albo rozkazujący 2. os. „znajdź”]'
fallback:
  claim: H-INT-2
  text: 'Jeśli rozpoznajesz u siebie sygnały problemu z grą albo masz wątpliwości, porozmawiaj z lekarzem albo ze specjalistą zdrowia psychicznego. W sytuacji bezpośredniego zagrożenia, także gdy myślisz o odebraniu sobie życia albo gdy myśli o tym ktoś, kogo znasz, zadzwoń natychmiast pod lokalny numer alarmowy.'
  online: [int-gambling-therapy]
regions_label: 'Numery według regionu'
regions: {}
entries:
  # [komentarz po polsku, pominięty]
  - id: int-gambling-therapy
    claim: H-INT-1
    country: '*'
    kind: gambling
    name: 'Gambling Therapy (Gordon Moody)'
    info: 'Bezpłatne praktyczne doradztwo i wsparcie emocjonalne online dla każdej osoby dotkniętej hazardem; poufne.'
    links:
      - label: 'Gambling Therapy'
        url: https://www.gamblingtherapy.org/
    # [komentarze po polsku, pominięte]
    sources:
      - url: https://www.gamblingtherapy.org/
        quote: 'a global service offered by Gordon Moody, providing free practical advice and emotional support to anyone affected by gambling.'   # [cytat angielski, bez przekładu]
      - url: https://www.gamblingtherapy.org/
        quote: 'Confidential, safe and delivered online'   # [cytat angielski, bez przekładu]
      - url: https://www.gamblingtherapy.org/
        quote: 'a global service offered by Gordon Moody'   # [cytat angielski, bez przekładu]
```

Uwaga do `info`: „jogo” w pt oznacza zarówno „grę”, jak i „hazard”; w kontekście Gambling Therapy oddane jako „hazard”. W `fallback.text` „problema com o jogo” oddane jako „problem z grą” (dosłownie). [DWUZNACZNE: „o jogo” w `fallback.text` i w `info` = „gra (ogólnie)” albo „hazard / gra na pieniądze”]

---

## 5. `content/pt/rules.yaml` — reguły `R-M12-*`

```yaml
# [komentarz po polsku nad blokiem, pominięty]
- id: R-M12-001
  module: m12
  if: "oceniasz swój wynik albo winrate na podstawie próby rozdań"
  then: "liczysz przedział: winrate ± {{n:var.z95}} × SD ÷ √(liczba rozdań ÷ 100)"
  because: "przy SD {{n:var.sd}} nawet po {{n:var.hands.k}} tys. rozdań przedział {{n:var.conf95}} ma około ± {{n:var.ci.wr}}, dlatego wynik {{n:var.wr.ex}} oznacza tylko „między około {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}”"
  level: math
  source: "rachunek: błąd standardowy średniej (rozkład normalny); SD ze strony z kalkulatorami pokerowymi, Examples and Impacts of Variance in Cash Games i Poker Variance Calculator"
  sources: [{ kind: training }, { kind: math }]
- id: R-M12-002
  module: m12
  if: "wchodzisz w {{t:downswing|downswing}} o {{n:dd.bi.small}} {{t:buy-in|buy-ins}}"
  then: "nie traktujesz go jako dowodu złej gry; zamiast tego przeglądasz decyzje w przegranych rozdaniach"
  because: "w {{n:var.hands.k}} tys. rozdań taki {{t:downswing|downswing}} od szczytu zdarza się około {{n:dd.p.small.100k}} graczy, którzy wygrywają {{n:var.wr.ex}} (SD {{n:var.sd}})"
  level: heuristic
  source: "rachunek: symulacja Monte Carlo (numbers.yaml, klucze dd.*); strona z kalkulatorami pokerowymi, Examples and Impacts of Variance in Cash Games, podaje dla tego scenariusza niższą liczbę (raport M12)"
  sources: [{ kind: training }, { kind: math }]
- id: R-M12-003
  module: m12
  if: "chcesz wiedzieć, ile naprawdę wygrywasz"
  then: "zbierasz setki tysięcy rozdań: dokładność ± {{n:var.target}} przy {{n:var.conf95}} ufności wymaga około {{n:var.need.hands.k}} tys. rozdań"
  because: "błąd oszacowania maleje z pierwiastkiem kwadratowym z liczby rozdań: potrzebne bloki po 100 rozdań = ({{n:var.z95}} × SD ÷ dokładność)²"
  level: math
  source: "rachunek: (1,96 × 80 ÷ 2)² bloków; zgodne z rzędem wielkości z dokumentu 08 (około 615 tys. rozdań)"
  sources: [{ kind: math }]
- id: R-M12-004
  module: m12
  if: "oceniasz swoje zagranie po rozdaniu"
  then: "pytasz się o decyzję (cenę, equity, informację, którą miałeś), a nie o to, czy wygrałeś"
  because: "dobra decyzja regularnie przegrywa: all-in z AA przeciw KK przegrywa w około {{n:res.kk-wins}} przypadków, a ludzie i tak oceniają decyzje po wyniku, choć wiedzą, że nie powinni"
  level: heuristic
  source: "Baron i Hershey (1988), Outcome bias in decision evaluation, J Pers Soc Psychol 54(4); Annie Duke o „resulting” (Masters in Business, Ritholtz 2018); equity AA–KK: dokładny rachunek (dokument 08)"
  sources: [{ kind: math }, { kind: book }, { kind: study }]
- id: R-M12-005
  module: m12
  if: "wynik kilku {{t:session|sessões}} skłania cię do zmiany strategii"
  then: "zmieniasz ją dopiero po przejrzeniu rozdań, a nie na podstawie samego wyniku"
  because: "nawet najlepsze {{n:skill.pct}} graczy wyprzedza najgorsze {{n:skill.pct}} tylko w około {{n:skill.ahead}} przypadków po około {{n:skill.hands}} rozdaniach, a mniejsze różnice umiejętności potrzebują dużo więcej rozdań"
  level: heuristic
  source: "van Loon, van den Assem i van Dolder (2015), Beyond Chance? The Persistence of Performance in Online Poker, PLoS ONE 10(3)"
  sources: [{ kind: study }]
- id: R-M12-006
  module: m12
  if: "zauważasz pierwsze sygnały tiltu ze swojego profilu (np. złość po bad beacie, chęć ukarania przeciwnika)"
  then: "reagujesz natychmiast: oddech i przygotowane zdanie, które przypomina, dlaczego to jest {{t:variance|variância}} albo błąd, z którego można się uczyć"
  because: "gdy tilt rośnie, przestajesz jasno myśleć i wtedy nie da się go już kontrolować"
  level: heuristic
  source: "Tendler, wywiad na stronie z wiadomościami (2014) („When tilt becomes too intense, it shuts down your ability to think”, „you must begin correcting tilt when it's small”); Tendler i Carter, The Mental Game of Poker (2011), technika „injecting logic”"
  sources: [{ kind: book }]
- id: R-M12-007
  module: m12
  if: "po serii strat nie potrafisz już spokojnie oceniać decyzji (np. myślisz tylko o odrobieniu albo grasz ręce, z którymi normalnie {{t:fold|desiste}})"
  then: "kończysz {{t:session|sessão}}"
  because: "dalsza gra w tym stanie to gra na twoim najgorszym poziomie (C-game), a celem jest przerwać wcześniej, zanim stracisz zdolność jasnego myślenia"
  level: heuristic
  source: "Tendler i Carter, The Mental Game of Poker (2011), fragment „Inchworm” (fragment opublikowany online): „quit sooner when it's no longer possible to recover a solid thought process”"
  sources: [{ kind: book }]
- id: R-M12-008
  module: m12
  if: "pracujesz nad swoją grą"
  then: "zaczynasz od poprawy najgorszych zagrań (C-game), a nie od doskonalenia najlepszych"
  because: "poprawa najgorszej gry daje stały postęp i uwalnia uwagę na naukę nowych rzeczy"
  level: heuristic
  source: "Tendler i Carter, The Mental Game of Poker (2011), fragment „Inchworm” (fragment opublikowany online); Tendler, The Inchworm Concept (jaredtendler.com)"
  sources: [{ kind: book }]
- id: R-M12-009
  module: m12
  if: "liczysz {{t:risk-of-ruin|risco de ruína}}, czyli utraty całego bankrollu"
  then: "używasz wzoru RoR = e^(−2 × winrate × bankroll ÷ SD²), z bankrollem w bb; to przybliżenie, które zakłada stały winrate i SD"
  because: "przy {{n:var.wr.typical.high}} i SD {{n:var.sd}} bankroll {{n:br.bi.base}} {{t:buy-in|buy-ins}} daje około {{n:ror.base}} ryzyka, a {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} już około {{n:ror.half}}"
  level: math
  source: "strona z kalkulatorami pokerowymi, Risk of Ruin Formula for Poker Players („RoR = e^(-2 x WR x BR / SD^2)”); wartości: rachunek (numbers.yaml, klucze ror.*)"
  sources: [{ kind: training }, { kind: math }]
- id: R-M12-011
  module: m12
  if: "bankroll spada do połowy zakładanej liczby {{t:buy-in|buy-ins}} (przy {{n:br.bi.base}} do {{n:br.bi.move-down}})"
  then: "schodzisz o jeden {{t:stakes|nível}} najpóźniej w tym momencie, a wracasz wyżej najwcześniej wtedy, gdy masz pełny bankroll w {{t:buy-in|buy-ins}} wyższego {{t:stakes|nível}}"
  because: "{{t:downswing|downswings}} o {{n:dd.bi.small}} {{t:buy-in|buy-ins}} w {{n:var.hands.k}} tys. rozdań zdarzają się prawie wszystkim graczom, którzy wygrywają od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}), niektóre źródła radzą zejść zaraz po takiej stracie, a przy {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} ryzyko utraty reszty rośnie z około {{n:ror.base}} do około {{n:ror.half}} (przy winrate {{n:var.wr.typical.high}} i SD {{n:var.sd}})"
  level: heuristic
  source: "strona szkoleniowa, Bankroll Management („half the roll, which is the point to move down a stake”); strona szkoleniowa, Poker Bankroll Management Strategy (przy 3bb/100 zejście przy 30 buy-inach, czyli przy pełnym bankrollu); strona z kalkulatorami pokerowymi, Risk of Ruin Formula for Poker Players („Losing 10 should trigger a move down”); rachunek ryzyka ruiny i symulacja downswingów"
  sources: [{ kind: training }, { kind: training }, { kind: training }, { kind: math }]
- id: R-M12-012
  module: m12
  if: "planujesz czas poświęcany pokerowi"
  then: "na początku poświęcasz około {{n:study.beginner}} czasu na naukę; gdy już wygrywasz na swoim {{t:stakes|nível}}, około {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}}"
  because: "na początku masz najwięcej do nadrobienia, a gdy już wygrywasz na swoim {{t:stakes|nível}}, możesz grać więcej"
  level: heuristic
  source: "strona szkoleniowa, What should your study-to-play ratio be (artykuł Dary O'Kearney): „New players have so much catching up to do”; „Once you are beating the games you are in you can start to reduce the study and increase the grinding”"
  sources: [{ kind: training }]
```

Uwaga do R-M12-011 `source`: „com 3bb/100, descer aos 30 buy-ins, ou seja, com o bankroll completo” oddane dosłownie; sens „przy pełnym bankrollu” jest w tekście pt, nie dodany. [DWUZNACZNE: „com o bankroll completo” = „zejście już przy pełnym bankrollu (próg = cały bankroll)” albo „mając (jeszcze) pełny bankroll”]
