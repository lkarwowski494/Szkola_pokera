---
id: m13.l3
module: m13
order: 3
title: "Przegląd rozdań z prawdziwej gry"
sub: "Co przeglądać i jak"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "W trakcie gry na żywo trafiasz na rozdanie, w którym nie wiesz, co zrobić. Co robisz z nim później?"
    options:
      - { text: "Zapisuję je krótko i przeglądam po {{t:session|sesji}}", correct: true, why: "Tak: w trakcie gry tylko oznaczasz rozdanie. Analiza przy stole zabiera uwagę od następnych decyzji, a ocena pod wpływem emocji bywa zła." }
      - { text: "Analizuję je od razu, póki pamiętam", why: "Wystarczy krótka notatka, żeby nie zapomnieć. Pełną analizę robisz później, z jasną głową." }
      - { text: "Nic, liczy się następne rozdanie", why: "Rozdania, w których nie wiedziałeś, co robić, uczą najwięcej. Warto je oznaczyć i wrócić do nich." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Właśnie przegrałeś dużą {{t:pot|pulę}} i jesteś zdenerwowany. Kiedy najlepiej przejrzeć to rozdanie?"
    options:
      - { text: "Po kilku godzinach albo następnego dnia", correct: true, why: "Tak: najlepszy czas na przegląd to kilka godzin albo dni po {{t:session|sesji}}, z jasną głową. Tuż po przegranej łatwo uznać dobrą decyzję za błąd albo odwrotnie." }
      - { text: "Od razu, żeby nie zapomnieć szczegółów", why: "Szczegóły zapisujesz od razu, ale ocenę odkładasz. W emocjach ocena jest zabarwiona wynikiem." }
      - { text: "Nigdy, bo to pech", why: "Może to pech, a może błąd. Dowiesz się tylko z przeglądu, gdy emocje opadną." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Które z tych rozdań najmniej warto długo analizować?"
    options:
      - { text: "Set przegrał z wyższym setem na {{t:dry|suchym}} {{t:board|stole}}; obaj wpłaciliście stack", correct: true, why: "Tak: to cooler. Żaden rozsądny gracz nie {{t:fold|spasowałby}} tu z setem. Coolery zdarzają się każdemu i niewiele uczą." }
      - { text: "Duża przegrana {{t:pot}}, w której na riverze nie wiedziałeś, czy {{t:call|sprawdzić}}", why: "To dobry kandydat do przeglądu: duża {{t:pot}} i trudna decyzja." }
      - { text: "Średnia {{t:pot}}, w której rywal cię przechytrzył i czułeś się zagubiony", why: "Właśnie takie rozdania uczą najwięcej: czułeś, że coś poszło nie tak, i warto zobaczyć co." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Przegrałeś dużą {{t:pot|pulę}}, ale uważasz, że zagrałeś dobrze. Czy warto ją przejrzeć?"
    options:
      - { text: "Tak: w dużej {{t:pot|puli}} decyzje ważą najwięcej, nawet jeśli zagrałeś dobrze", correct: true, why: "Tak: duże {{t:pot|pule}}, zwłaszcza przegrane, to decyzje o największej wadze. Nawet jeśli zagrałeś dobrze, warto wiedzieć dlaczego. Pomijasz tylko oczywiste coolery." }
      - { text: "Nie: skoro zagrałem dobrze, nie ma czego szukać", why: "Pewność bez przeglądu to wciąż tylko pierwsza reakcja. Duża {{t:pot}} to dobry powód, żeby ją przejrzeć." }
      - { text: "Tylko jeśli przegrałem z rzadką ręką", why: "Rodzaj ręki rywala nie decyduje. Liczy się, czy decyzja była trudna albo {{t:pot}} duża." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Zaczynasz przegląd decyzji na riverze. Co robisz najpierw?"
    options:
      - { text: "Zapisuję pierwszą reakcję, np. „łatwe {{t:call|sprawdzenie}}”, a dopiero potem liczę", correct: true, why: "Tak: porównanie pierwszej reakcji z rachunkiem pokazuje, gdzie myli cię intuicja. Z czasem intuicja się poprawia." }
      - { text: "Od razu liczę {{t:equity}}", why: "Liczenie jest potrzebne, ale bez zapisanej pierwszej reakcji nie zobaczysz, gdzie intuicja się myli." }
      - { text: "Patrzę, jakie karty miał rywal", why: "Karty rywala z showdownu to wynik, a nie informacja z chwili decyzji. Oceniasz decyzję wobec jego możliwych rąk." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Przeglądasz {{t:call|sprawdzenie}} na riverze. Nawet przy pesymistycznym założeniu o {{t:range|zakresie}} rywala (mało {{t:bluff|blefów}}) masz dość {{t:equity}}. Co dalej?"
    options:
      - { text: "Mogę skończyć: decyzja jest dobra przy każdym rozsądnym założeniu", correct: true, why: "Tak: skrajne założenia wyznaczają przedział. Jeśli decyzja jest dobra nawet przy pesymistycznym, założenie realistyczne też ją potwierdzi." }
      - { text: "Muszę jeszcze policzyć przypadek realistyczny", why: "Nie musisz: realistyczne założenie leży między skrajnymi, a skoro oba dają ten sam wniosek, wynik się nie zmieni." }
      - { text: "Zmieniam założenie na optymistyczne, bo pesymistyczne jest przesadzone", why: "Zaczynasz od skrajności, żeby wyznaczyć przedział. Gdy pesymistyczne daje dobry wynik, optymistyczne tym bardziej." }
---
Aplikacja przegląda za ciebie rozdania z gry z botami. Rozdania z prawdziwej gry, np. w kasynie, przeglądasz sam. Ta lekcja zbiera sprawdzone wskazówki trenerów.

## Oznaczaj w trakcie, analizuj po {{t:session|sesji}}

W trakcie gry tylko oznaczasz rozdania, które wydały ci się ciekawe, trudne albo dziwne: krótka notatka wystarczy. Analiza przy stole zabiera uwagę od następnych decyzji. Najlepiej przeglądać kilka godzin albo dni po {{t:session|sesji}}, z jasną głową. Najgorszy moment to chwila tuż po dużej przegranej albo w zmęczeniu.

## Co przeglądać

- Duże {{t:pot|pule}}, zwłaszcza przegrane: tam decyzje ważą najwięcej.
- Rozdania, w których nie wiedziałeś, co robić, albo czułeś, że rywal cię przechytrzył.
- Wygrane też: błąd, który się opłacił, kosztuje tak samo (lekcja o decyzji i wyniku).

Nad coolerem i bad beatem nie spędzasz dużo czasu. Cooler to rozdanie, w którym dwie silne ręce się spotykają i żadna nie mogła rozsądnie {{t:fold|spasować}}, np. set na wyższym secie. Takie rozdania zdarzają się każdemu i niewiele uczą.

## Jak przeglądać decyzję

1. Zapisz rozdanie: {{t:position|pozycje}}, stacki, akcje i rozmiary na każdej {{t:street|ulicy}}.
2. Zapisz pierwszą reakcję: czy decyzja wydaje się łatwa, czy trudna.
3. Policz: cenę, {{t:equity}} i to, co wiedziałeś w chwili decyzji.
4. Sprawdź decyzję przy trzech założeniach o {{t:range|zakresie}} rywala: optymistycznym, pesymistycznym i realistycznym. Jeśli jest dobra nawet przy pesymistycznym, możesz skończyć.
5. Zapisz różnicę między pierwszą reakcją a rachunkiem. Z czasem intuicja się poprawia.

:::note Skąd te zasady
Trzy materiały szkoleniowe o przeglądaniu rozdań: kiedy i co przeglądać; coolery i bad beaty; pierwsza reakcja i trzy założenia o rywalu. To heurystyki trenerów, nie wyniki solvera.
:::
