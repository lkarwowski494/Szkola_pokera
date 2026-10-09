---
id: m13.l1
module: m13
order: 1
title: "Jak czytać raport z gry"
sub: "Decyzja, wynik i stopnie oceny"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Wpłacasz all-in z {{t:equity}} {{n:m13.eq.example}} i przegrywasz. W ilu procentach takich rozdań przegrywasz mimo dobrej decyzji? Wpisz liczbę."
    answer: m13.lose.example
    explanation: "Przegrywasz w 1 − e rozdań: całość minus {{n:m13.eq.example}} daje {{n:m13.lose.example}}. Ta przegrana nie mówi nic o decyzji."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Dziesięć razy wpłacasz all-in z {{t:equity}} {{n:m13.eq.example}}. Ile z tych rozdań przegrasz średnio? Wpisz liczbę."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Jeśli przegrasz dwa razy z rzędu, to wciąż mieści się w rachunku."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Masz {{t:equity}} {{n:m13.eq.example2}} w all-inie. W ilu procentach takich rozdań przegrywasz? Wpisz liczbę."
    answer: m13.lose.example2
    explanation: "Całość minus {{n:m13.eq.example2}} daje {{n:m13.lose.example2}}: mniej więcej co trzecie takie rozdanie przegrywasz, a decyzja dalej jest dobra."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Solver w tym spocie gra twoją rękę mniej więcej po równo: {{t:raise|przebiciem}} albo {{t:fold|pasem}}. {{t:fold|Spasowałeś}}. Jak oceni to raport?"
    options:
      - { text: "Zgodna", correct: true, why: "Tak: akcja grana przez solver w co najmniej {{n:range.mixed.low}} przypadków jest zgodna. W równowadze gracz miesza tylko zagrania o tej samej {{t:expected-value|wartości oczekiwanej}}, więc oba są poprawne." }
      - { text: "Błąd, bo trzeba było {{t:raise|przebić}}", why: "Nie: przy {{t:mixed-hand|ręce mieszanej}} oba zagrania mają tę samą {{t:expected-value|wartość oczekiwaną}}. Raport nie karze za wybór jednej z nich." }
      - { text: "Bez oceny", why: "Nie: spot ma wynik solvera, więc decyzja jest oceniona. „Bez oceny” dostaje decyzja, do której aplikacja nie ma sprawdzalnej reguły." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Solver gra twoją rękę {{t:raise|przebiciem}} w ok. {{n:range.mixed.high}} przypadków, a {{t:call|sprawdzeniem}} w pozostałych. {{t:call|Sprawdziłeś}}. Jaki werdykt?"
    options:
      - { text: "Zgodna", correct: true, why: "Tak: {{t:call}} grane w ok. {{n:range.mixed.low}} przypadków nie schodzi poniżej progu zgodnej ({{n:range.mixed.low}}). To {{t:mixed-hand|ręka mieszana}}." }
      - { text: "Dopuszczalna", why: "Dopuszczalna jest akcja grana w co najmniej {{n:range.mixed.min}}, ale rzadziej niż w {{n:range.mixed.low}} przypadków. Tu {{t:call}} sięga progu zgodnej." }
      - { text: "Błąd", why: "Błąd to akcja grana przez solver rzadziej niż w {{n:range.mixed.min}} przypadków albo wcale." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "W spocie, w którym solver gra 3-bet, robisz 3-bet, ale do rozmiaru innego niż zaleca reguła. Jaki werdykt?"
    options:
      - { text: "Niedokładność", correct: true, why: "Tak: dobra akcja, zły rozmiar. Liczy się jak błąd i wraca w powtórkach, ale raport pokazuje osobne wyjaśnienie rozmiaru." }
      - { text: "Zgodna", why: "Akcja jest dobra, ale rozmiar ma znaczenie: za mały 3-bet daje rywalowi dobrą cenę, za duży ryzykuje więcej niż trzeba." }
      - { text: "Błąd", why: "Błąd dostaje zła akcja. Dobra akcja ze złym rozmiarem to osobny stopień: niedokładność." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Raport: „Oceniono 14 z 30 decyzji”. Co oznaczają pozostałe decyzje?"
    options:
      - { text: "Aplikacja nie miała do nich sprawdzalnej reguły ani wyniku solvera", correct: true, why: "Tak: „bez oceny” nie znaczy „dobrze”. Te decyzje mogły być dobre albo złe; raport tego nie wie i mówi to wprost." }
      - { text: "Były dobre, więc raport ich nie pokazuje", why: "Nie: dobre decyzje raport liczy jako zgodne. „Bez oceny” to brak oceny, a nie pochwała." }
      - { text: "Były zbyt łatwe, żeby je oceniać", why: "Nie chodzi o trudność. Ocenione są decyzje, do których aplikacja ma regułę z warunkiem albo spot solvera." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Po {{t:session|sesji}} wygrałeś sporo {{t:chips|żetonów}}, ale raport pokazuje pięć błędów. Co mówi więcej o twojej grze?"
    options:
      - { text: "Ocena decyzji", correct: true, why: "Tak: kilkadziesiąt rozdań to za mało, żeby wynik coś mówił. Nawet po tysiącach rąk wynik to w dużej mierze szum, a każdy błąd ma swoją cenę niezależnie od tego, jak skończyło się rozdanie." }
      - { text: "Wynik w {{t:chips|żetonach}}", why: "Wynik krótkiej {{t:session|sesji}} zależy głównie od kart. Raport pokazuje go mniejszą czcionką właśnie dlatego." }
      - { text: "Oba po równo", why: "Wynik z kilkudziesięciu rozdań prawie nic nie mówi o umiejętności. Decyzja oceniona regułą albo solverem mówi dużo więcej." }
---
Raport po {{t:session|sesji}} ocenia twoje decyzje, a nie to, ile wygrałeś. Ta lekcja wyjaśnia, jak go czytać.

## Decyzja, nie wynik

W module o mental game poznałeś zasadę: oceniasz decyzję przy informacjach, które miałeś w chwili decyzji, a nie wynik rozdania. Raport stosuje ją dosłownie: ocenia sytuację sprzed twojej akcji, nie widzi kart rywali ani kart, które padły później.

Przegrana z lepszą ręką mieści się w rachunku. {{t:equity|Equity}} to udział wygranych w wielu powtórzeniach tej samej sytuacji. Z {{t:equity}} {{n:m13.eq.example}} przegrywasz w ok. {{n:m13.lose.example}} rozdań, czyli średnio {{n:m13.lose.of-ten}} na {{n:m13.ten}}.

```formula
szansa przegranej = 1 − equity
```

## Stopnie oceny

- **Zgodna**: akcja, którą zaleca reguła, albo grana przez solver w co najmniej {{n:range.mixed.low}} przypadków.
- **Dopuszczalna**: solver gra ją rzadko (co najmniej {{n:range.mixed.min}}, ale rzadziej niż {{n:range.mixed.low}}) albo reguła mówi o częstotliwości („często”, „rzadziej”), a ty wybrałeś rzadszą opcję. To nie błąd.
- **Niedokładność**: dobra akcja, zły rozmiar. Liczy się jak błąd.
- **Błąd**: akcja sprzeczna z regułą sformułowaną kategorycznie albo grana przez solver rzadziej niż w {{n:range.mixed.min}} przypadków.
- **Bez oceny**: aplikacja nie ma do tej decyzji sprawdzalnej reguły. To nie znaczy „dobrze”.
- **Przekroczony czas**: przy włączonym limicie aplikacja zagrała za ciebie. Taka decyzja nie liczy się do oceny, ale wraca w powtórkach.

Na górze raportu jest liczba „Oceniono X z Y decyzji”. Po flopie wiele decyzji zostaje bez oceny, bo większość reguł z turnu i rivera mówi o częstotliwościach całego {{t:range|zakresu}}, a nie o jednej ręce.

## {{t:mixed-hand|Ręka mieszana}}

Gdy solver gra twoją rękę na dwa sposoby, oba są poprawne. Teoria równowagi tłumaczy to zasadą obojętności: gracz miesza tylko zagrania, które mają tę samą {{t:expected-value|wartość oczekiwaną}}. Dlatego raport nie karze za wybór jednej z nich, a rzadsze zagranie oznacza najwyżej jako dopuszczalne.

## Wynik w {{t:chips|żetonach}}

Wynik jest na dole raportu, małą czcionką. Według analizy {{t:variance|wariancji}} wyników nawet po ok. dwóch i pół tysiąca rąk wynik to prawie sam szum: gracz wygrywający może być na minusie, a przegrywający na dużym plusie. {{t:session|Sesja}} ma kilkadziesiąt rozdań, więc wynik prawie nic nie mówi o twojej grze.

:::note Skąd te zasady
Zasada obojętności: materiały o podstawach teorii równowagi. Próg rzadkiego ruchu: materiał o ocenie własnej gry względem solvera. {{t:variance|Wariancja}} wyniku: analiza tego, po ilu godzinach gry można ufać swojemu winrate. Szansa przegranej to rachunek.
:::
