---
id: m12.l2
module: m12
order: 2
title: "Decyzja a wynik"
sub: "Oceniaj zagranie, nie kartę na riverze"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop wpłacasz cały stack z parą asów, rywal sprawdza z parą króli. Na riverze spada król i przegrywasz. Jak oceniasz swoją decyzję?"
    options:
      - { text: "Była bardzo dobra", correct: true, why: "AA wygrywa z KK w ok. {{n:pf.aa-vs-kk}} przypadków. Przegrana w ok. {{n:res.kk-wins}} to koszt gry, a nie błąd. Za każdym razem robisz to samo." }
      - { text: "Była zła, trzeba było grać ostrożniej", why: "To ocena po wyniku. Gdyby karta na riverze była inna, ta sama decyzja wyglądałaby świetnie. Decyzja zależy od tego, co wiedziałeś przed kartą: ok. {{n:pf.aa-vs-kk}} equity." }
      - { text: "Nie da się ocenić, bo przegrałeś", why: "Da się: liczysz equity w chwili decyzji. Wynik jednego rozdania nic nie dodaje." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA wygrywa z KK all-in preflop w ok. {{n:pf.aa-vs-kk}} przypadków. W ilu procentach przypadków przegrywasz mimo najlepszej możliwej decyzji? Wpisz liczbę."
    answer: res.kk-wins
    explanation: "Całość minus {{n:pf.aa-vs-kk}} daje ok. {{n:res.kk-wins}}. Mniej więcej raz na pięć–sześć razy dobra decyzja kończy się przegraną."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Masz czyste dobieranie do koloru ({{n:outs.flush}} outów), w puli {{n:ex.pot}}, rywal stawia {{n:ex.bet.quarter}}. Sprawdzasz, kolor nie wchodzi i tracisz {{n:ex.bet.quarter}}. Jak oceniasz sprawdzenie?"
    options:
      - { text: "Było dobre", correct: true, why: "Potrzebowałeś {{n:eq.bet-quarter}} equity, a miałeś ok. {{n:odds.flush.turn-river}}. Takie sprawdzenie zarabia na dłuższą metę, choć przegrywa w większości pojedynczych rozdań." }
      - { text: "Było złe, bo kolor nie wszedł", why: "Kolor wchodzi tylko w ok. {{n:odds.flush.turn-river}} przypadków, więc chybienie było najbardziej prawdopodobnym wynikiem. Decyzję oceniasz po cenie, a ta była dobra." }
      - { text: "Dobre tylko wtedy, gdyby kolor wszedł", why: "To definicja oceny po wyniku. Ta sama decyzja nie zmienia jakości zależnie od karty, która spadła później." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Czyste dobieranie do koloru, w puli {{n:ex.pot}}, rywal stawia całą pulę: {{n:ex.bet.pot}}. Sprawdzasz i kolor wchodzi na riverze. Jak oceniasz sprawdzenie?"
    options:
      - { text: "Było złe, mimo wygranej", correct: true, why: "Potrzebowałeś {{n:eq.bet-pot}} equity, a miałeś ok. {{n:odds.flush.turn-river}}. Wygrałeś tym razem, ale przy wielu powtórzeniach takie sprawdzenie traci." }
      - { text: "Było dobre, bo wygrałeś pulę", why: "Wygrana nie poprawia decyzji. Przy cenie {{n:eq.bet-pot}} i szansie ok. {{n:odds.flush.turn-river}} to sprawdzenie na dłuższą metę traci." }
      - { text: "Było dobre, bo kolor to najlepsza ręka", why: "Siła ręki po trafieniu nie zmienia ceny. Liczy się porównanie: {{n:odds.flush.turn-river}} szans wobec {{n:eq.bet-pot}} potrzebnych." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Analizujesz przegrane rozdanie. Które pytanie jest najważniejsze?"
    options:
      - { text: "Czy przy informacjach, które miałem, decyzja miała dodatnie EV?", correct: true, why: "To jedyne pytanie, które odróżnia błąd od pecha. Liczysz cenę, equity wobec zakresu rywala i to, co wiedziałeś w chwili decyzji." }
      - { text: "Jaką kartę dostałby rywal, gdybym spasował?", why: "Przyszła karta nie zmienia jakości decyzji. Liczy się tylko to, co wiedziałeś wtedy." }
      - { text: "Ile przegrałem w tym rozdaniu?", why: "Wielkość straty mówi o puli, nie o decyzji. Duża przegrana może wynikać z dobrej decyzji, mała z błędu." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Kolega pyta cię o to samo zagranie w dwóch rozdaniach: w jednym wygrał, w drugim przegrał. Wydaje ci się, że za pierwszym razem zagrał lepiej. Co się dzieje?"
    options:
      - { text: "To efekt wyniku: oceniasz decyzję po tym, jak się skończyła", correct: true, why: "W badaniach Barona i Hersheya ludzie oceniali tę samą decyzję wyżej, gdy wynik był dobry, nawet jeśli uważali, że wynik nie powinien mieć znaczenia. Pomaga ocena przed poznaniem wyniku." }
      - { text: "Pierwsza decyzja była lepsza, bo zadziałała", why: "Skoro zagranie jest to samo, decyzja jest ta sama. Różni się tylko wynik, czyli los." }
      - { text: "Druga decyzja była lepsza, bo uczy pokory", why: "Ocena nie zależy od wyniku w żadną stronę. Ta sama decyzja ma tę samą jakość." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Przez trzy sesje grałeś agresywniej niż zwykle i wygrałeś. Czy to dowód, że nowy styl jest lepszy?"
    options:
      - { text: "Nie, trzy sesje to za mało; oceniasz nowe zagrania w przeglądzie rozdań", correct: true, why: "Nawet ogromna różnica umiejętności (najlepszy {{n:skill.pct}} wobec najsłabszego {{n:skill.pct}}) wychodzi na prowadzenie w ok. {{n:skill.ahead}} przypadków dopiero po ok. {{n:skill.hands}} rękach. Różnica między dwoma twoimi stylami jest dużo mniejsza." }
      - { text: "Tak, wynik pokazuje, co działa", why: "Wynik z kilku sesji to głównie szum. Przy odchyleniu ok. {{n:var.sd}}/100 nawet {{n:var.hands.k}} tys. rąk zostawia błąd ok. ± {{n:var.ci.wr}}/100." }
      - { text: "Tak, jeśli wygrałeś więcej niż zwykle", why: "Większa wygrana z małej próbki to wciąż mała próbka. Zagrania oceniasz rachunkiem i przeglądem rozdań." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Badanie milionów rozdań online pokazało, kiedy umiejętność zaczyna przeważać nad losem. Co dokładnie zmierzono?"
    options:
      - { text: "Najlepszy {{n:skill.pct}} graczy wyprzedza najsłabszy {{n:skill.pct}} w ok. {{n:skill.ahead}} przypadków po ok. {{n:skill.hands}} rękach", correct: true, why: "Tak definiują to autorzy (van Loon i in., 2015). To porównanie skrajnych grup: przy mniejszych różnicach umiejętności potrzeba znacznie więcej rąk." }
      - { text: "Po ok. {{n:skill.hands}} rękach każdy dobry gracz jest na plusie", why: "Badanie porównuje skrajne grupy graczy, a nie mówi, kiedy pojedynczy dobry gracz będzie na plusie. To zależy od winrate i odchylenia (lekcja o wariancji)." }
      - { text: "Po ok. {{n:skill.hands}} rękach los przestaje mieć znaczenie", why: "Los ma znaczenie zawsze. Badanie mówi tylko, kiedy przewaga najlepszych nad najgorszymi zaczyna wygrywać w większości porównań." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Wygrałeś sesję dzięki dwóm sprawdzeniom bez dobrej ceny, które trafiły na riverze. Co robisz po sesji?"
    options:
      - { text: "Zapisujesz te sprawdzenia jako błędy do poprawy", correct: true, why: "Wygrana nie zmienia ceny. Jeśli sprawdzenie wymagało więcej equity, niż miałeś, to był błąd, nawet jeśli się opłacił." }
      - { text: "Nic, sesja była wygrana", why: "Błędy w wygranych sesjach są tak samo kosztowne, tylko trudniej je zauważyć. Analiza samych przegranych pomija połowę błędów." }
      - { text: "Uznajesz, że czytasz rywali lepiej, niż mówi rachunek", why: "Dwa trafienia to za mało, żeby wnioskować o czytaniu rywali. Najprostsze wyjaśnienie to wariancja." }
---
Poker daje informację zwrotną, która często kłamie. Dobra decyzja może przegrać, a zła wygrać. Jeśli oceniasz grę po wynikach, uczysz się na losowych sygnałach.

## Resulting: ocena po wyniku

Gracze nazywają to *resulting*: zakładasz, że jakość wyniku mówi ci o jakości decyzji. Psychologowie opisują to samo zjawisko jako **efekt wyniku**. W badaniu Barona i Hersheya (1988) ludzie oceniali tę samą decyzję jako lepszą, a decydującego jako bardziej kompetentnego, gdy wynik był korzystny. Robili tak nawet wtedy, gdy sami uważali, że wyniku nie powinni brać pod uwagę.

## Dobra decyzja też przegrywa

All-in z parą asów wobec pary króli to najlepsza możliwa decyzja, a przegrywa w ok. **{{n:res.kk-wins}}** przypadków. Z drugiej strony sprawdzenie z dobieraniem do koloru za całą pulę na turnie jest złe (potrzebujesz {{n:eq.bet-pot}}, masz ok. {{n:odds.flush.turn-river}}), a mimo to wygrywa mniej więcej raz na pięć.

```formula
jakość decyzji = EV przy informacjach, które miałeś w chwili decyzji
```

## Jak analizować rozdanie

1. Zakryj wynik. Oceniaj tylko to, co wiedziałeś w chwili decyzji.
2. Policz cenę i equity wobec zakresu rywala (M2, M6).
3. Sprawdź, czy zagranie zgadza się z regułami z kursu.
4. Analizuj też wygrane rozdania: błędy, które się opłaciły, są tak samo kosztowne.

## Kiedy wynik zaczyna coś znaczyć

W badaniu ok. {{n:skill.sample.m}} mln rozdań online (van Loon i in., 2015) umiejętność zaczynała przeważać dopiero po ok. **{{n:skill.hands}}** rękach. Oznacza to, że najlepszy {{n:skill.pct}} graczy wyprzedzał najsłabszy {{n:skill.pct}} w ok. {{n:skill.ahead}} porównań. Dla mniejszych różnic umiejętności potrzeba wielokrotnie więcej rąk. Wynik kilku sesji nie mówi więc, który styl gry jest lepszy.

:::note Ocena w tej aplikacji
Dlatego aplikacja ocenia twoje decyzje, a nie wynik rozdania. Kiedy wynik i decyzja się rozjeżdżają, ufaj rachunkowi.
:::
