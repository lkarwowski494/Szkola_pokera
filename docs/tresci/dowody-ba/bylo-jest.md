# BA: „było → jest” (pl), KO-029 / D-500

Reguła: M5 → R-M5-004, M6 → R-M6-009. Źródła i cytaty: `zadanie1-zrodla.md`; dystraktory m5.q2 K-10-3 i A-Q-7: GTO Wizard, Overbetting the Flop in Cash Games („Give us a large nut advantage as the preflop raiser (PFR)”); wymiana A-A-7: GTO Wizard, Flop Heuristics: IP C-Betting in Cash Games („reduced nut advantage from trips being in both player’s ranges”). Przekłady 11 języków: te same linie (kontrola: 24 linie na język, znaczniki = pl).

## `content/pl/exams/m5.yaml:19` (R-M5-004)

- było: `prompt: "{{t:open|Otworzyłeś}} grę z Buttona, a gracz na {{t:big-blind|dużym blindzie}} {{t:call|sprawdził}}. Na którym z tych flopów (pierwszych trzech {{t:community-cards|kart wspólnych}}) ten gracz częściej niż ty ma {{t:two-pair}} albo {{t:straight|strita}}?"`
- jest: `prompt: "{{t:open|Otworzyłeś}} grę z Buttona, a gracz na {{t:big-blind|dużym blindzie}} {{t:call|sprawdził}}. Na którym z tych flopów (pierwszych trzech {{t:community-cards|kart wspólnych}}) nie masz {{t:nuts-advantage|przewagi nutsów}}, czyli wyraźnie więcej najsilniejszych rąk niż rywal?"`

## `content/pl/exams/m5.yaml:22` (R-M5-004)

- było: `- { text: "[[8h 6d 5c]]", correct: true, why: "Tak: niski, {{t:connected}} flop trafia {{t:connectors|konektory}} i ręce z małymi kartami, których {{t:big-blind}} broni dużo. Ty z Buttona masz więcej wysokich kart, które tu chybiły. To {{t:nuts-advantage}} {{t:big-blind|dużego blinda}}." }`
- jest: `- { text: "[[8h 6d 5c]]", correct: true, why: "Tak: niski, {{t:connected}} flop trafia {{t:connectors|konektory}} i ręce z małymi kartami, których {{t:big-blind}} broni dużo, więc {{t:straight|strity}} i {{t:two-pair|dwie pary}} ma tu także on. Twoje wysokie karty tu chybiły, więc najsilniejszych rąk nie masz wyraźnie więcej." }`

## `content/pl/exams/m5.yaml:23` (R-M5-004)

- było: `- { text: "[[Kd Td 3s]]", why: "Nie: wysoki flop sprzyja {{t:open|otwierającemu}}. Masz więcej króli z dobrym kickerem, KT i wysokich {{t:pair|par}}." }`
- jest: `- { text: "[[Kd Td 3s]]", why: "Nie: flop z dwiema wysokimi kartami daje {{t:nuts-advantage|przewagę nutsów}} {{t:open|otwierającemu}}. Masz tu więcej najsilniejszych rąk, np. KK i KT, bo {{t:big-blind}} większość KK {{t:raise|przebija}} przed flopem." }`

## `content/pl/exams/m5.yaml:24` (R-M5-004)

- było: `- { text: "[[Ah Ad 7c]]", why: "Nie: na flopie z {{t:pair|parą}} asów więcej asów masz ty, bo {{t:big-blind}} najsilniejsze asy {{t:raise|przebija}} przed flopem. {{t:straight|Strita}} nikt tu nie ma." }`
- jest: `- { text: "[[Ah Qd 7c]]", why: "Nie: na flopie z asem i damą to ty masz więcej najsilniejszych rąk, np. AA i AQ, bo {{t:big-blind}} najsilniejsze asy zwykle {{t:raise|przebija}} przed flopem." }`

## `content/pl/exams/m6.yaml:94` (R-M6-009)

- było: `- { text: "[[8d 6c 5h]]", correct: true, why: "Tak: na niskim, {{t:connected|połączonym}} flopie {{t:big-blind}} ma więcej najsilniejszych układów ({{t:two-pair}}, {{t:straight|strity}}) niż Button, więc check-raise robi tu częściej." }`
- jest: `- { text: "[[8d 6c 5h]]", correct: true, why: "Tak: na niskim, {{t:connected|połączonym}} flopie {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}, więc check-raise robisz tu częściej." }`

## `content/pl/lessons/m5-l2-przewagi.md:23` (R-M5-004)

- było: `prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Flop: [[7s 6h 5d]]. Kto częściej ma tu bardzo silną rękę ({{t:two-pair}} albo {{t:straight}})?"`
- jest: `prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Flop: [[7s 6h 5d]]. Czy masz tu {{t:nuts-advantage|przewagę nutsów}}, czyli wyraźnie więcej najsilniejszych rąk niż rywal?"`

## `content/pl/lessons/m5-l2-przewagi.md:26` (R-M5-004)

- było: `- { text: "{{t:big-blind|Duży blind}}", correct: true, why: "Tak: {{t:big-blind}} broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką. Ty z Buttona masz więcej wysokich kart, które tu chybiły. To {{t:nuts-advantage}} {{t:big-blind|dużego blinda}}." }`
- jest: `- { text: "Nie: {{t:straight|strity}} i {{t:two-pair|dwie pary}} ma tu też {{t:big-blind}}", correct: true, why: "Dobrze: {{t:big-blind}} broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Twoje wysokie karty tu chybiły, więc najsilniejszych rąk nie masz wyraźnie więcej." }`

## `content/pl/lessons/m5-l2-przewagi.md:27` (R-M5-004)

- było: `- { text: "Ty, {{t:open|otwierający}} z Buttona", why: "Nie: twój {{t:range}} jest pełen wysokich kart. Masz więcej {{t:overpair|overpar}} ({{t:pocket-pair|pocket par}} wyższych od każdej karty na {{t:board|stole}}, np. TT, JJ), ale mniej {{t:two-pair|dwóch par}} i {{t:straight|stritów}}; setów (trójek z {{t:pocket-pair|pocket parą}}) macie podobnie dużo." }`
- jest: `- { text: "Tak, bo {{t:open|otworzyłeś}} przed flopem", why: "Nie: {{t:open|otwarcie}} daje ci przewagę na wysokich flopach. Na niskim, {{t:connected|połączonym}} flopie twoje wysokie karty chybiły, a {{t:range}} rywala trafia tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}." }`

## `content/pl/lessons/m5-l2-przewagi.md:28` (R-M5-004)

- było: `- { text: "Obaj tak samo często", why: "Nie: {{t:range|zakresy}} różnią się składem. Szeroka obrona {{t:big-blind|dużego blinda}} ma dużo małych kart, a twój {{t:range}} wysokie." }`
- jest: `- { text: "Tak, bo masz więcej wysokich {{t:pair|par}}", why: "Nie: masz więcej {{t:overpair|overpar}} ({{t:pocket-pair|pocket par}} wyższych od każdej karty na {{t:board|stole}}, np. TT, JJ), ale na takim flopie {{t:overpair}} nie należy do najsilniejszych rąk: przegrywa ze {{t:straight|stritem}}, setem i {{t:two-pair|dwiema parami}}." }`

## `content/pl/lessons/m5-l2-przewagi.md:88` (R-M5-004)

- było: `Na niskim, {{t:connected|połączonym}} flopie, np. [[7s 6h 5d]], {{t:range-advantage}} prawie znika, a najsilniejsze ręce częściej ma {{t:big-blind}}: broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką, więc częściej ma {{t:two-pair}} albo {{t:straight|strita}}.`
- jest: `Na niskim, {{t:connected|połączonym}} flopie, np. [[7s 6h 5d]], {{t:range-advantage}} prawie znika. {{t:big-blind|Duży blind}} broni wielu {{t:connectors|konektorów}} w kolorze i rąk z szóstką albo siódemką, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a twoje wysokie karty chybiły.`

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:38` (R-M5-004)

- było: `check: "Tak: niski flop z kartami blisko siebie sprzyja {{t:big-blind|dużemu blindowi}}, który częściej ma tu {{t:two-pair}} albo {{t:straight|strita}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."`
- jest: `check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: ma tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."`

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:39` (R-M5-004)

- było: `small: "Za często: na niskim flopie z kartami blisko siebie to {{t:big-blind}} ma {{t:nuts-advantage|przewagę nutsów}}. Częste c-bety, nawet małe, dają mu okazję do {{t:raise|przebicia}} po wcześniejszym {{t:check|czekaniu}} (check-raise) najsilniejszymi rękami."`
- jest: `small: "Za często: na niskim flopie z kartami blisko siebie nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} po wcześniejszym {{t:check|czekaniu}} (check-raise) najsilniejszymi rękami."`

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:40` (R-M5-004)

- było: `big: "Za często i za drogo: {{t:big-blind}} częściej trafił tu {{t:two-pair}} albo {{t:straight|strita}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."`
- jest: `big: "Za często i za drogo: {{t:big-blind}} ma tu w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."`

## `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:126` (R-M5-004)

- było: `Na [[7s 6h 5d]] to {{t:big-blind}} częściej ma {{t:two-pair}} albo {{t:straight|strita}} (lekcja o przewagach). Podobnie na innych niskich flopach {{t:connected|połączonych}} i {{t:semi-connected|półpołączonych}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie bardzo silne ręce i mocne {{t:draw|drawy}}.`
- jest: `Na [[7s 6h 5d]] {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}} (lekcja o przewagach). Podobnie na innych niskich flopach {{t:connected|połączonych}} i {{t:semi-connected|półpołączonych}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie bardzo silne ręce i mocne {{t:draw|drawy}}.`

## `content/pl/lessons/m5-l4-bez-pozycji.md:90` (R-M5-004)

- było: `check: "Tak: niski flop z kartami blisko siebie sprzyja {{t:big-blind|dużemu blindowi}}, który częściej ma tu {{t:two-pair}} albo {{t:straight|strita}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."`
- jest: `check: "Tak: niski flop z kartami blisko siebie trafia {{t:range|zakres}} {{t:big-blind|dużego blinda}}: ma tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a ty nie masz {{t:nuts-advantage|przewagi nutsów}}. C-betujesz rzadziej niż na wysokich flopach: wiele rąk {{t:check|czeka}}, a betują głównie silne ręce i mocne {{t:draw|drawy}}."`

## `content/pl/lessons/m5-l4-bez-pozycji.md:91` (R-M5-004)

- było: `small: "Za często: na niskim flopie z kartami blisko siebie to {{t:big-blind}} ma {{t:nuts-advantage|przewagę nutsów}}. Częste c-bety, nawet małe, dają mu okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."`
- jest: `small: "Za często: na niskim flopie z kartami blisko siebie nie masz {{t:nuts-advantage|przewagi nutsów}}. Częste c-bety, nawet małe, dają {{t:big-blind|dużemu blindowi}} okazję do {{t:raise|przebicia}} (check-raise) najsilniejszymi rękami."`

## `content/pl/lessons/m5-l4-bez-pozycji.md:92` (R-M5-004)

- było: `big: "Za często i za drogo: {{t:big-blind}} częściej trafił tu {{t:two-pair}} albo {{t:straight|strita}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."`
- jest: `big: "Za często i za drogo: {{t:big-blind}} ma tu w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}. Częsty duży c-bet ryzykuje dużo, gdy sam zwykle masz tylko wysokie karty."`

## `content/pl/lessons/m6-l3-check-raise.md:16` (R-M6-009)

- było: `- { text: "Check-raise", correct: true, why: "{{t:two-pair|Dwie pary}} na niskim, {{t:connected|połączonym}} flopie to ręka {{t:value|dla wartości}}. Na takich flopach {{t:big-blind}} ma więcej najsilniejszych układów niż Button. {{t:raise|Przebiciem}} budujesz {{t:pot|pulę}} i każesz płacić {{t:pair|parom}} i {{t:draw|drawom}}." }`
- jest: `- { text: "Check-raise", correct: true, why: "{{t:two-pair|Dwie pary}} na niskim, {{t:connected|połączonym}} flopie to ręka {{t:value|dla wartości}}. Na takich flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}. {{t:raise|Przebiciem}} budujesz {{t:pot|pulę}} i każesz płacić {{t:pair|parom}} i {{t:draw|drawom}}." }`

## `content/pl/lessons/m6-l3-check-raise.md:130` (R-M6-009)

- było: `- **Na niskich, {{t:connected|połączonych}} flopach** (np. [[7h 6d 5s]]). {{t:big-blind|Duży blind}} broni wielu niskich rąk, więc zwykle ma tu więcej {{t:two-pair|dwóch par}} i {{t:straight|stritów}} niż Button, czyli {{t:nuts-advantage|przewagę nutsów}}.`
- jest: `- **Na niskich, {{t:connected|połączonych}} flopach** (np. [[7h 6d 5s]]). {{t:big-blind|Duży blind}} broni wielu niskich rąk, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, więc Button nie ma tu {{t:nuts-advantage|przewagi nutsów}}.`

## `content/pl/rules.yaml:360` (R-M5-004)

- było: `because: "{{t:big-blind}} broni wielu {{t:connectors|konektorów}} w kolorze i małych {{t:pair|par}}, więc częściej ma {{t:two-pair}} albo {{t:straight|strita}}: to on ma {{t:nuts-advantage|przewagę nutsów}}"`
- jest: `because: "{{t:big-blind}} broni wielu {{t:connectors|konektorów}} i rąk z małymi kartami, które trafiają tu {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a twoje wysokie karty chybiły: nie masz {{t:nuts-advantage|przewagi nutsów}}"`

## `content/pl/rules.yaml:363` (R-M5-004)

- było: `source: "kombinatoryka: Button otwiera wszystkie pary 55–77, a duży blind je sprawdza, więc setów obaj mają podobnie; serwis komercyjnego solvera, Bullying the Blinds (na 654r Button czeka ponad połowę zakresu; „Even on 654r… BB has less than 52% equity”)"`
- jest: `source: "serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in Cash Games (BTN vs BB: „flopped straights often being in the BB’s range”; „Size down and bet less on flops that complete straights and flushes in your opponent’s range”); serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in MTTs (na flopach połączonych „the raiser generally does not have a nuts advantage”); serwis komercyjnego solvera, Bullying the Blinds (20bb, 654r: „BB’s advantage at the top end”, Button czeka ponad połowę zakresu); serwis szkoleniowy, 3 Concepts That Should Shape Your Postflop Strategy („the Big Blind will often have the nut advantage”, https://upswingpoker.com/nut-range-positional-advantage/)"`

## `content/pl/rules.yaml:364` (R-M5-004)

- było: `sources: [{ kind: solver-pub }, { kind: math }]`
- jest: `sources: [{ kind: solver-pub }, { kind: training, url: "https://upswingpoker.com/nut-range-positional-advantage/" }]`

## `content/pl/rules.yaml:511` (R-M6-009)

- było: `because: "na niskich flopach {{t:big-blind}} ma więcej najsilniejszych układów ({{t:nuts-advantage}}), a mały c-bet daje tanią okazję do {{t:raise|przebicia}}"`
- jest: `because: "na niskich, {{t:connected|połączonych}} flopach {{t:big-blind}} ma w {{t:range|zakresie}} {{t:straight|strity}} i {{t:two-pair|dwie pary}}, a Button nie ma {{t:nuts-advantage|przewagi nutsów}}; mały c-bet daje tanią okazję do {{t:raise|przebicia}}"`

## `content/pl/rules.yaml:513` (R-M6-009)

- było: `source: "serwis szkoleniowy, How to Check-Raise Like a High Stakes Juggernaut (flopy, na których nie przebijać: K♣J♥T♠, Q♥J♦T♠, A♥A♠K♥; check-raise 12,65% wobec 33% i 8,66% wobec 66% puli); serwis komercyjnego solvera („The larger the BTN bets, the less BB raises”)"`
- jest: `source: "serwis szkoleniowy, How to Check-Raise Like a High Stakes Juggernaut (flopy, na których nie przebijać: K♣J♥T♠, Q♥J♦T♠, A♥A♠K♥; check-raise 12,65% wobec 33% i 8,66% wobec 66% puli); serwis komercyjnego solvera („The larger the BTN bets, the less BB raises”); serwis komercyjnego solvera, Flop Heuristics: IP C-Betting in Cash Games („flopped straights often being in the BB’s range”)"`
