# Było → jest (sesja BB, KO-029 Z-1…Z-5, Z-8, D-510) — pl

Pełny diff: `git diff 02ec8c4 05df4d1 -- content/pl` (`diff-pl.patch`). Przekłady 11 języków: 22547d0, 0e6d4d5. Kontrola półpołączonych: `kontrola-przed.txt` (84 naruszeń) → `kontrola-po.txt` (0). CI: `ci-2026-11-10.log` (pnpm run ci na 0e6d4d5, KOD WYJŚCIA: 0).

## `content/pl/exams/m5.yaml:22`

- było: - { text: "[[8h 6d 5c]]", correct: true, why: "Tak: niski, {{t:connected}} flop trafia {{t:connectors|konektory}} i ręce z małymi kartami, których {{t:big-blind}} broni dużo, więc {{t:straight|strity}} i {{t:two-pair|dwie pary}} ma tu także on. Twoje wysokie karty tu chybiły, więc najsilniejszych rąk nie masz wyraźnie więcej." }
- jest: - { text: "[[8h 6d 5c]]", correct: true, why: "Tak: niski, {{t:connected}} flop trafia {{t:connectors|konektory}} i ręce z małymi kartami, których {{t:big-blind}} broni dużo, więc {{t:straight|strity}} i {{t:two-pair|dwie pary}} ma tu także on. Twoje wysokie karty tu chybiły, więc zwykle najsilniejszych rąk nie masz wyraźnie więcej." }

## `content/pl/exams/m5.yaml:23`

- było: - { text: "[[Kd Td 3s]]", why: "Nie: flop z dwiema wysokimi kartami daje {{t:nuts-advantage|przewagę nutsów}} {{t:open|otwierającemu}}. Masz tu więcej najsilniejszych rąk, np. KK i KT, bo {{t:big-blind}} większość KK {{t:raise|przebija}} przed flopem." }
- jest: - { text: "[[Kd Td 3s]]", why: "Nie: flop z dwiema wysokimi kartami daje {{t:nuts-advantage|przewagę nutsów}} {{t:open|otwierającemu}}. Masz tu więcej najsilniejszych rąk, np. KK, bo {{t:big-blind}} większość KK {{t:raise|przebija}} przed flopem." }

## `content/pl/exams/m6.yaml:94`

- było: - { text: "[[8d 6c 5h]]", correct: true, why: "Tak: na niskim, {{t:connected|połączonym}} flopie {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}, więc check-raise robisz tu częściej." }
- jest: - { text: "[[8d 6c 5h]]", correct: true, why: "Tak: na niskim, {{t:connected|połączonym}} flopie {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button zwykle nie ma {{t:nuts-advantage|przewagi nutsów}}, więc check-raise robisz tu częściej." }

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:38`

- było: check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: ma tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."
- jest: check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: broni on wielu rąk z małymi kartami, a twoje wysokie karty tu chybiły. Na flopie {{t:connected|połączonym}} ma on też {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc zwykle nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:39`

- było: small: "Za często: na niskim flopie z kartami blisko siebie nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} po wcześniejszym {{t:check|czekaniu}} (check-raise) najsilniejszymi rękami."
- jest: small: "Za często: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}, a na {{t:connected|połączonym}} zwykle nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} po wcześniejszym {{t:check|czekaniu}} (check-raise) najsilniejszymi rękami."

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:40`

- było: big: "Za często i za drogo: {{t:big-blind}} ma tu w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
- jest: big: "Za często i za drogo: ten flop trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}, a na {{t:connected|połączonym}} ma on też {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:126`

- było: Na [[7s 6h 5d]] {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}} (lekcja o przewagach). Podobnie na innych niskich flopach {{t:connected|połączonych}} i {{t:semi-connected|półpołączonych}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie bardzo silne ręce i mocne {{t:draw|drawy}}.
- jest: Na [[7s 6h 5d]] {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}} (lekcja o przewagach). Zwykle podobnie jest na innych niskich flopach {{t:connected|połączonych}}. Na niskim flopie {{t:semi-connected|półpołączonym}} {{t:straight|strita}} jeszcze nie ma, ale flop i tak trafia ręce z małymi kartami, których {{t:big-blind}} broni dużo, a twoje wysokie karty chybiły. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie bardzo silne ręce i mocne {{t:draw|drawy}}.

## `content/pl/lessons/m5-l4-bez-pozycji.md:90`

- było: check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: ma tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."
- jest: check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: broni on wielu rąk z małymi kartami, a twoje wysokie karty tu chybiły. Na flopie {{t:connected|połączonym}} ma on też {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc zwykle nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."

## `content/pl/lessons/m5-l4-bez-pozycji.md:91`

- było: small: "Za często: na niskim flopie z kartami blisko siebie nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."
- jest: small: "Za często: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}, a na {{t:connected|połączonym}} zwykle nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."

## `content/pl/lessons/m5-l4-bez-pozycji.md:92`

- było: big: "Za często i za drogo: {{t:big-blind}} ma tu w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."
- jest: big: "Za często i za drogo: ten flop trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}, a na {{t:connected|połączonym}} ma on też {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."

## `content/pl/lessons/m6-l3-check-raise.md:16`

- było: - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dwie pary}} na niskim, {{t:connected|połączonym}} flopie to ręka {{t:value|dla wartości}}. Na takich flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}. {{t:raise|Przebiciem}} budujesz {{t:pot|pulę}} i każesz płacić {{t:pair|parom}} i {{t:draw|drawom}}." }
- jest: - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dwie pary}} na niskim, {{t:connected|połączonym}} flopie to ręka {{t:value|dla wartości}}. Na takich flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button zwykle nie ma {{t:nuts-advantage|przewagi nutsów}}. {{t:raise|Przebiciem}} budujesz {{t:pot|pulę}} i każesz płacić {{t:pair|parom}} i {{t:draw|drawom}}." }

## `content/pl/lessons/m6-l3-check-raise.md:130`

- było: - **Na niskich, {{t:connected|połączonych}} flopach** (np. [[7h 6d 5s]]). {{t:big-blind|Duży blind}} broni wielu niskich rąk, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc Button nie ma tu {{t:nuts-advantage|przewagi nutsów}}.
- jest: - **Na niskich, {{t:connected|połączonych}} flopach** (np. [[7h 6d 5s]]). {{t:big-blind|Duży blind}} broni wielu niskich rąk, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc Button zwykle nie ma tu {{t:nuts-advantage|przewagi nutsów}}.

## `content/pl/rules.yaml:360`

- było: because: "{{t:big-blind}} broni wielu {{t:connectors|konektorów}} i rąk z małymi kartami, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a twoje wysokie karty chybiły: nie masz {{t:nuts-advantage|przewagi nutsów}}"
- jest: because: "{{t:big-blind}} broni wielu {{t:connectors|konektorów}} i rąk z małymi kartami, które trafiają niski flop, a twoje wysokie karty chybiły; na flopie {{t:connected|połączonym}} ma też {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc zwykle nie masz {{t:nuts-advantage|przewagi nutsów}}"

## `content/pl/rules.yaml:363`

- było: source: "serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in Cash Games (BTN vs BB: „flopped straights often being in the BB’s range”; „Size down and bet less on flops that complete straights and flushes in your opponent’s range”); serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in MTTs (na flopach połączonych „the raiser generally does not have a nuts advantage”); serwis komercyjnego solvera, Bullying the Blinds (20bb, 654r: „BB’s advantage at the top end”, Button czeka ponad połowę zakresu); serwis szkoleniowy, 3 Concepts That Should Shape Your Postflop Strategy („the Big Blind will often have the nut advantage”, https://upswingpoker.com/nut-range-positional-advantage/)"
- jest: source: "serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in Cash Games (https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/, BTN vs BB: „a large portion of their range consists of low-card holdings because of the preflop discount posed by the blinds. We connect better with high-card boards and get to bet more.”; „flopped straights often being in the BB’s range”; „Size down and bet less on flops that complete straights and flushes in your opponent’s range”); serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in MTTs (https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-mtts/; inny spot: BTN vs SB, 40bb; na flopach połączonych „the raiser generally does not have a nuts advantage”; uproszczenie: przeniesione kierunkowo na BTN vs BB w grze gotówkowej, zgodnie z artykułem o grze gotówkowej); serwis komercyjnego solvera, Bullying the Blinds (https://blog.gtowizard.com/bullying-the-blinds-with-continuation-bets/, 20bb, 654r: „BB’s advantage at the top end”, Button czeka ponad połowę zakresu); serwis szkoleniowy, 3 Concepts That Should Shape Your Postflop Strategy („the Big Blind will often have the nut advantage”, https://upswingpoker.com/nut-range-positional-advantage/)"

## `content/pl/rules.yaml:511`

- było: because: "na niskich, {{t:connected|połączonych}} flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}; mały c-bet daje tanią okazję do {{t:raise|przebicia}}"
- jest: because: "na niskich, {{t:connected|połączonych}} flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button zwykle nie ma {{t:nuts-advantage|przewagi nutsów}}; mały c-bet daje tanią okazję do {{t:raise|przebicia}}"

