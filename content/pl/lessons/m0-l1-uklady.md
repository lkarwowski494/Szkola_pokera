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
    prompt: "Kto wygrywa: {{t:flush}} czy {{t:straight}}?"
    options:
      - { text: "{{t:flush|Kolor}}", correct: true, why: "{{t:flush|Kolor}} jest wyżej w rankingu. Trudniej zebrać 5 kart w jednym kolorze niż 5 kart po kolei." }
      - { text: "{{t:straight|Strit}}", why: "To częsty błąd początkujących. {{t:straight|Strit}} jest pozycję niżej niż {{t:flush}}." }
      - { text: "Remis", why: "Różne układy nigdy nie remisują. Wyższy w rankingu zawsze wygrywa." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Ty masz {{t:full-house|fulla}}, przeciwnik {{t:flush}}. Kto wygrywa?"
    options:
      - { text: "Ty, {{t:full-house}} bije {{t:flush}}", correct: true, why: "{{t:full-house|Full}} ({{t:three-of-a-kind}} i {{t:pair}}) jest na 4. miejscu, {{t:flush}} na 5. Kolejność z góry: poker, {{t:four-of-a-kind}}, {{t:full-house}}, {{t:flush}}, {{t:straight}}." }
      - { text: "Przeciwnik, {{t:flush}} bije {{t:full-house|fulla}}", why: "Odwrotnie. {{t:full-house|Full}} jest rzadszy, więc silniejszy." }
      - { text: "Zależy od wysokości kart", why: "Wysokość kart liczy się tylko przy tym samym typie układu." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Co jest silniejsze: {{t:two-pair}} czy {{t:three-of-a-kind}}?"
    options:
      - { text: "{{t:three-of-a-kind|Trójka}}", correct: true, why: "{{t:three-of-a-kind|Trójka}} jest na 7. miejscu, {{t:two-pair}} na 8. Łatwo pomylić, bo {{t:two-pair}} „wyglądają” na więcej kart." }
      - { text: "{{t:two-pair|Dwie pary}}", why: "{{t:two-pair|Dwie pary}} są pozycję niżej niż {{t:three-of-a-kind}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Obaj macie {{t:pair|parę}} króli. Kto wygrywa?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Ty", correct: true, why: "{{t:pair|Para}} jest ta sama, więc decyduje kicker: twój as bije damę przeciwnika. Dlatego AK jest dużo lepsze niż KQ." }
      - { text: "Przeciwnik", why: "Dama przeciwnika jest niższa niż twój as." }
      - { text: "{{t:split-pot|Podział puli}}", why: "Podział byłby przy identycznej najlepszej piątce. Tu różni je kicker: as kontra dama." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Na {{t:board|stole}} leży {{t:straight}}. Kto wygrywa?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Podział puli}}", correct: true, why: "Najlepsza piątka obu graczy to {{t:straight}} ze {{t:board|stołu}}. {{t:pair|Para}} asów jest słabsza niż {{t:straight}}, więc nic nie dodaje. To sytuacja „{{t:playing-the-board}}”." }
      - { text: "Ty, bo masz {{t:pair|parę}} asów", why: "{{t:pair|Para}} asów to tylko {{t:pair}}. {{t:straight|Strit}} ze {{t:board|stołu}} jest silniejszy, więc grasz nim, tak samo jak przeciwnik." }
      - { text: "Przeciwnik", why: "Do wyższego {{t:straight|strita}} przeciwnik potrzebowałby dziesiątki." }
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
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
W Texas Hold'em dostajesz **2 {{t:hole-cards}}**, a na {{t:board}} trafia **5 {{t:community-cards|kart wspólnych}}**. Z tych 7 kart budujesz najlepszy układ z **5**. Silniejszy układ wygrywa całą {{t:pot|pulę}}.

## Ranking od najsilniejszego

| | Układ | Przykład |
|---|---|---|
| 1 | {{t:royal-flush|Poker królewski}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Poker}}: {{t:straight-flush|strit w kolorze}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Kareta}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full}}: {{t:three-of-a-kind}} i {{t:pair}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Kolor}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Strit}} (5 po kolei) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Trójka}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Dwie pary}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Para}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Wysoka karta}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Najpierw porównuje się rangę układu: {{t:three-of-a-kind}} bije {{t:two-pair}}. Przy tym samym układzie decyduje jego wysokość: {{t:pair}} króli bije {{t:pair|parę}} dam, a przy dwóch {{t:pair|parach}} najpierw porównuje się wyższą {{t:pair|parę}}. Dopiero gdy rdzeń układu jest identyczny (ta sama {{t:pair}}, {{t:three-of-a-kind}} albo te same {{t:two-pair}}), decydują karty dodatkowe, czyli kickery: najpierw najwyższy, a przy remisie kolejny. Liczą się tylko kickery z najlepszej piątki. Jeśli obie piątki są identyczne, {{t:split-pot|pula jest dzielona}}.
:::

As może być najniższą kartą {{t:straight|strita}}: [[5h 4s 3c 2d Ah]] to najniższy {{t:straight}}, tak zwany {{t:wheel}}.
