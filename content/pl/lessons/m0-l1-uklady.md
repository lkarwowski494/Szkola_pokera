---
id: m0.l1
module: m0
order: 1
title: "Układy kart"
sub: "Co wygrywa z czym"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Kto wygrywa: kolor czy strit?"
    options:
      - { text: "Kolor", correct: true, why: "Kolor jest wyżej w rankingu. Trudniej zebrać 5 kart w jednym kolorze niż 5 kart po kolei." }
      - { text: "Strit", why: "To częsty błąd początkujących. Strit jest pozycję niżej niż kolor." }
      - { text: "Remis", why: "Różne układy nigdy nie remisują. Wyższy w rankingu zawsze wygrywa." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Ty masz fulla, przeciwnik kolor. Kto wygrywa?"
    options:
      - { text: "Ty, full bije kolor", correct: true, why: "Full (trójka i para) jest na 4. miejscu, kolor na 5. Kolejność z góry: poker, kareta, full, kolor, strit." }
      - { text: "Przeciwnik, kolor bije fulla", why: "Odwrotnie. Full jest rzadszy, więc silniejszy." }
      - { text: "Zależy od wysokości kart", why: "Wysokość kart liczy się tylko przy tym samym typie układu." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Co jest silniejsze: dwie pary czy trójka?"
    options:
      - { text: "Trójka", correct: true, why: "Trójka jest na 7. miejscu, dwie pary na 8. Łatwo pomylić, bo dwie pary „wyglądają” na więcej kart." }
      - { text: "Dwie pary", why: "Dwie pary są pozycję niżej niż trójka." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Obaj macie parę króli. Kto wygrywa?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Ty", correct: true, why: "Para jest ta sama, więc decyduje kicker: twój as bije damę przeciwnika. Dlatego AK jest dużo lepsze niż KQ." }
      - { text: "Przeciwnik", why: "Dama przeciwnika jest niższa niż twój as." }
      - { text: "Podział puli", why: "Podział byłby przy identycznej najlepszej piątce. Tu różni je kicker: as kontra dama." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Na stole leży strit. Kto wygrywa?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "Podział puli", correct: true, why: "Najlepsza piątka obu graczy to strit ze stołu. Para asów jest słabsza niż strit, więc nic nie dodaje. To sytuacja „gra stół”." }
      - { text: "Ty, bo masz parę asów", why: "Para asów to tylko para. Strit ze stołu jest silniejszy, więc grasz nim, tak samo jak przeciwnik." }
      - { text: "Przeciwnik", why: "Do wyższego strita przeciwnik potrzebowałby dziesiątki." }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
---
W Texas Hold'em dostajesz **2 karty własne**, a na stół trafia **5 kart wspólnych**. Z tych 7 kart budujesz najlepszy układ z **5**. Silniejszy układ wygrywa całą pulę.

## Ranking od najsilniejszego

| | Układ | Przykład |
|---|---|---|
| 1 | Poker królewski | [[As Ks Qs Js Ts]] |
| 2 | Poker (strit w kolorze) | [[9h 8h 7h 6h 5h]] |
| 3 | Kareta | [[Qs Qh Qd Qc 4s]] |
| 4 | Full (trójka i para) | [[Ks Kd Kc 7h 7s]] |
| 5 | Kolor | [[Ad Jd 8d 6d 2d]] |
| 6 | Strit (5 po kolei) | [[Tc 9d 8s 7h 6c]] |
| 7 | Trójka | [[8s 8h 8d Kc 3s]] |
| 8 | Dwie pary | [[Jh Jc 5s 5d Ac]] |
| 9 | Para | [[9c 9d Ah 7s 4c]] |
| 10 | Wysoka karta | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Gdy dwóch graczy ma ten sam układ, wygrywa ten, kto ma wyższą kartę dodatkową, czyli kickera. Liczy się jednak tylko najlepsza piątka. Jeśli obie piątki są identyczne, pula jest dzielona.
:::

As może być najniższą kartą strita: [[5h 4s 3c 2d Ah]] to najniższy strit, tak zwane koło.
