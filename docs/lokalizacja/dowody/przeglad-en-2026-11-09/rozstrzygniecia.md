# Rozstrzygnięcia drugiego przeglądu przekładu en (G1–G8)

Data: 2026-11-09. Edytowane wyłącznie: `content/en/**` (bez `lessons/m12-l4-bankroll.md` i `helplines.yaml`) oraz `apps/mobile/src/i18n/locales/en.json`. Nie ruszano `content/pl/`, `content/terms.yaml`, `content/helplines.yaml`, `content/numbers.yaml`, wpisów R-M12-009 i R-M12-011, definicji `bankroll` i `risk-of-ruin`, ani pól zawierających `{{n:br.bi.base}}`, `{{n:br.bi.beginner}}`, `{{n:dd.bi.small}}`, `{{n:ror.two}}`.

Kontrole po edycjach: `pnpm content:build` kod 0 (35 baz, 44 lekcje, 141 reguł, 829 liczb, 162 terminy); `pnpm i18n` kod 0, błędy: 0, uwagi: 28 (te same co przed zmianą: „tekst taki sam jak w źródle”); `narz/plikowa.mjs`: znaczniki 0 błędów.

## Podsumowanie

| waga | razem | zastosowano | odrzucono | odłożone (treść krytyczna) | backlog |
|---|---|---|---|---|---|
| KRYTYCZNE | 1 | 1 | 0 | 0 | 0 |
| WYSOKIE | 20 | 20 | 0 | 0 | 0 |
| ŚREDNIE | 64 | 62 | 2 | 0 | 0 |
| NISKIE | 78 | 44 | 1 | 5 | 28 |

## Decyzje

| raport | plik | miejsce | waga | decyzja |
|---|---|---|---|---|
| G1 | content/en/rules.yaml | R-M12-002, then | WYSOKIE | zastosowano („you review the decisions”); edytowane tylko pole then, które nie zawiera tokenów krytycznych (`{{n:dd.bi.small}}` jest w polu if, nietknięte); błąd źródła pl |
| G1 | content/en/rules.yaml | R-M7-008, then | ŚREDNIE | zastosowano („cards that miss”, spójnie z lekcją m7-l3 i egzaminem m7) |
| G1 | content/en/rules.yaml | R-M3-009, then | NISKIE | backlog (styl) |
| G1 | content/en/rules.yaml | R-M0-001, because | NISKIE | zastosowano („how high the cards are”, spójnie z polem then) |
| G1 | content/en/rules.yaml | R-M2-001, then | NISKIE | zastosowano („about a … chance”) |
| G1 | content/en/rules.yaml | R-M6-004, if | NISKIE | backlog (styl) |
| G1 | content/en/rules.yaml | R-M10-001, because | NISKIE | backlog (styl) |
| G1 | content/en/rules.yaml | R-M10-003, then | NISKIE | backlog (styl) |
| G1 | content/en/rules.yaml | R-M12-011, then | NISKIE | odłożone (treść krytyczna) |
| G1 | content/en/rules.yaml | R-M3-010, source | NISKIE | backlog (sposób cytowania polskich nagłówków dokumentu 10 w en: konwencja do ustalenia z rolą 06) |
| G1 | content/en/rules.yaml | R-M10-014, source | NISKIE | odrzucono: słowa cytatu są dosłowne; zagnieżdżony cudzysłów pojedynczy wewnątrz “…” to konwencja typograficzna en, nie zmiana treści |
| G2 | en.json | help.intro | KRYTYCZNE | zastosowano: „If your playing is starting to get out of control, you can use the help below.” (wierne „przestaje być pod kontrolą”, próg wczesny, bez „your gambling”) |
| G2 | content/en/terms-def.yaml | check | ŚREDNIE | zastosowano (usunięte „Polish “sprawdzam””) |
| G2 | content/en/terms-def.yaml | call | ŚREDNIE | zastosowano (usunięte „Polish “czekam””) |
| G2 | content/en/terms-def.yaml | raise | ŚREDNIE | zastosowano (usunięte zdanie o „podbicie”) |
| G2 | content/en/terms-def.yaml | board | ŚREDNIE | zastosowano („It means the cards, not the table you play at.”) |
| G2 | content/en/terms-def.yaml | mixed-hand | ŚREDNIE | zastosowano („Such a hand is also said to be played with a mixed strategy.”) |
| G2 | content/en/terms-def.yaml | linear | ŚREDNIE | zastosowano („You will also see the related term “merged range””) |
| G2 | content/en/terms-def.yaml | wetness | ŚREDNIE | zastosowano („It is also described as how coordinated the board is.”) |
| G2 | content/en/terms-def.yaml | tournament-equity | ŚREDNIE | zastosowano („It is also called “$EV”.”) |
| G2 | content/en/terms-def.yaml | vpip, pfr, wtsd | ŚREDNIE | zastosowano („A HUD statistic”, glosariusz) |
| G2 | en.json | glossary.intro, glossary.link, glossary.search | ŚREDNIE | odrzucono: ekran słowniczka w en nadal pokazuje polski termin obok angielskiego (`apps/mobile/src/app/glossary.tsx`, `entry.pl` w wierszu terminu), więc obecny tekst jest prawdziwy wobec ekranu; zmiana tekstu bez zmiany ekranu byłaby nieprawdziwa. Pytanie produktowe niżej |
| G2 | content/en/ranges/spots.yaml | rfi.utg i spot UTG 9-osobowy, title | NISKIE | zastosowano (`{{t:utg}}`, glosariusz/D-287) |
| G2 | content/en/ranges/spots.yaml | tytuły spotów 9-osobowych | NISKIE | zastosowano („9-player table” ×10, spójnie z UI) |
| G2 | content/en/terms-def.yaml | early-position | NISKIE | zastosowano („e.g. UTG”) |
| G2 | content/en/terms-def.yaml | straight-draw | NISKIE | zastosowano („OESD”) |
| G2 | content/en/terms-def.yaml | spr | NISKIE | zastosowano („the lower the SPR”) |
| G2 | content/en/terms-def.yaml | variance | NISKIE | zastosowano („can show big losses or big wins”) |
| G2 | content/en/terms-def.yaml | bankroll | NISKIE | odłożone (treść krytyczna) |
| G2 | content/en/terms-def.yaml | nuts | NISKIE | zastosowano |
| G2 | en.json | play.log.bet, play.log.raise | NISKIE | backlog (forma logu rozdania; do decyzji przy przeglądzie ekranu gry) |
| G2 | en.json | play.betFrac | NISKIE | backlog (długość przycisku do sprawdzenia na urządzeniu) |
| G2 | en.json | table.seatHero | NISKIE | backlog |
| G2 | en.json | play.waiting | NISKIE | backlog (długość; sprawdzić na urządzeniu) |
| G2 | en.json | play.review.start | NISKIE | backlog (długość; sprawdzić na urządzeniu) |
| G2 | en.json | glossary.areas.board | NISKIE | backlog (długość; sprawdzić na urządzeniu) |
| G2 | en.json | welcome.noMoney | NISKIE | backlog (styl) |
| G3 | content/en/exams/m13.yaml | drills[2].options[1].text | WYSOKIE | zastosowano („Aligned”) |
| G3 | content/en/exams/m13.yaml | drills[2].options[1].why | WYSOKIE | zastosowano („is aligned”, `{{t:fold\|Fold}}`) |
| G3 | content/en/exams/m13.yaml | drills[3].options[3].text | WYSOKIE | zastosowano („Ungraded”) |
| G3 | content/en/exams/m13.yaml | drills[3].options[3].why | WYSOKIE | zastosowano („“Ungraded” is what a decision gets…”) |
| G3 | content/en/exams/m13.yaml | drills[1].options[0].why | ŚREDNIE | zastosowano (`{{t:equity\|Equity}}`) |
| G3 | content/en/exams/m13.yaml | drills[2].options[2].why | ŚREDNIE | zastosowano (`{{t:fold\|Fold}}`) |
| G3 | content/en/exams/m13.yaml | drills[3].options[0].why | ŚREDNIE | zastosowano (`{{t:call\|Calling}}`) |
| G3 | content/en/exams/m13.yaml | drills[2].options[0].why | NISKIE | zastosowano („The solver folds”) |
| G3 | content/en/exams/m13.yaml | drills[3].options[2].why | NISKIE | zastosowano („is too low”) |
| G3 | content/en/exams/m7.yaml | drills[2].options[0].text | ŚREDNIE | zastosowano (`{{t:check\|Check}}`) |
| G3 | content/en/exams/m7.yaml | drills[5].options[2].text | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m7.yaml | drills[8].options[1].text | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m7.yaml | drills[8].options[2].text | ŚREDNIE | zastosowano („Check, planning to check-raise”) |
| G3 | content/en/exams/m7.yaml | drills[9].options[0].text | ŚREDNIE | zastosowano (`{{t:fold\|Fold}}`) |
| G3 | content/en/exams/m7.yaml | drills[9].options[1].text | ŚREDNIE | zastosowano (`{{t:call\|Call}}`) |
| G3 | content/en/exams/m7.yaml | drills[9].options[2].text | ŚREDNIE | zastosowano (`{{t:raise\|Raise}}`) |
| G3 | content/en/exams/m7.yaml | drills[6].prompt | ŚREDNIE | zastosowano („cards that miss”) |
| G3 | content/en/exams/m7.yaml | drills[0].prompt | NISKIE | zastosowano częściowo: zaimek „they”; kalka „you bet as a c-bet” → backlog (usunięcie `{{t:bet}}` zmieniłoby zestaw terminów) |
| G3 | content/en/exams/m7.yaml | drills[0].options[1].why | NISKIE | zastosowano („them”) |
| G3 | content/en/exams/m7.yaml | drills[8].options[1].why | NISKIE | zastosowano („they”) |
| G3 | content/en/exams/m7.yaml | drills[8].options[2].why | NISKIE | zastosowano („their”) |
| G3 | content/en/exams/m7.yaml | drills[9].options[0].why | NISKIE | zastosowano („their” ×2) |
| G3 | content/en/exams/m7.yaml | drills[5].options[2].why | NISKIE | backlog (styl „lose value”) |
| G3 | content/en/exams/m10.yaml | drills[7].options[0].text | ŚREDNIE | zastosowano („against this opponent, 3-bet mostly strong hands”) |
| G3 | content/en/exams/m10.yaml | drills[2].options[0].text | NISKIE | backlog (styl) |
| G3 | content/en/exams/m12.yaml | drills[0].prompt | ŚREDNIE | zastosowano („interval”) |
| G3 | content/en/exams/m12.yaml | drills[0].options[0].why | ŚREDNIE | zastosowano („Interval:”) |
| G3 | content/en/exams/m12.yaml | drills[0].options[2].why | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[1].options[0].why | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[1].options[1].why | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[1].options[2].why | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[3].options[0].text | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[3].options[0].why | ŚREDNIE | zastosowano (×2 w polu) |
| G3 | content/en/exams/m12.yaml | drills[3].options[1].why | ŚREDNIE | zastosowano |
| G3 | content/en/exams/m12.yaml | drills[8].options[0].text | NISKIE | odłożone (treść krytyczna: zadanie q9 z regułą R-M12-011 i `{{n:br.bi.beginner}}`) |
| G3 | content/en/exams/m11.yaml | drills[2].prompt | NISKIE | zastosowano (szyk „to break even with a hand that has no chance at all”, spójnie z lekcją m11-l1) |
| G3 | content/en/exams/m11.yaml | drills[3].prompt | NISKIE | zastosowano (jak wyżej) |
| G3 | content/en/exams/m11.yaml | drills[2].options[0].why | NISKIE | zastosowano („to win the … in blinds”) |
| G3 | content/en/exams/m4.yaml | drills[6].options[2].why | NISKIE | backlog (styl) |
| G3 | content/en/exams/m4.yaml | drills[7].options[2].why | NISKIE | backlog (styl) |
| G3 | content/en/exams/m3.yaml | drills[8].options[0].why | NISKIE | zastosowano („a player {{t:utg}} opens with”) |
| G3 | content/en/exams/m0.yaml | drills[0].prompt | NISKIE | backlog (styl) |
| G3 | content/en/exams/m0.yaml | drills[1].prompt | NISKIE | backlog (styl) |
| G3 | content/en/exams/m6.yaml | całość (apostrof ’) | NISKIE | backlog (typografia; ’ występuje też w lekcjach m12–m13, ujednolicić jednym przebiegiem dla całego en) |
| G4 | content/en/lessons/m3-l1-pozycja.md | drills[0].options[2].why | WYSOKIE | zastosowano („the whole table behind it”); błąd źródła pl |
| G4 | content/en/lessons/m1-l1-przebieg.md | drills[0].options[2].why | ŚREDNIE | zastosowano („The first wager in a round is called a bet.”) |
| G4 | content/en/lessons/m1-l1-przebieg.md | lista „Available moves”, Bet | NISKIE | backlog (styl) |
| G4 | content/en/lessons/m1-l1-przebieg.md | ¶2 „Big blind” | NISKIE | zastosowano (mała litera) |
| G4 | content/en/lessons/m2-l1-outy.md | lista „Common draws”, pkt 3 | NISKIE | zastosowano („An inside {{t:straight}} draw (gutshot)”; glosariusz: inside straight draw) |
| G4 | content/en/lessons/m3-l1-pozycja.md | `:::note` Open size | NISKIE | zastosowano (`{{t:open\|Open}}`) |
| G4 | content/en/lessons/m3-l1-pozycja.md | `:::note`, ostatnie zdanie | NISKIE | backlog (styl) |
| G4 | content/en/lessons/m3-l3-zakresy-otwarc.md | ¶1 | ŚREDNIE | zastosowano („An {{t:open\|opening}} {{t:range}}”) |
| G4 | content/en/lessons/m3-l3-zakresy-otwarc.md | ¶2 | NISKIE | backlog (styl) |
| G4 | content/en/lessons/m4-l1-3bet.md | „Linear or polarized range” | NISKIE | backlog (styl) |
| G4 | content/en/lessons/m4-l2-obrona-bb.md | ¶1 | NISKIE | zastosowano (mała litera) |
| G4 | content/en/lessons/m4-l2-obrona-bb.md | drills[1].options[1].why | NISKIE | zastosowano |
| G4 | content/en/lessons/m4-l2-obrona-bb.md | ¶ „Against the small blind” | NISKIE | zastosowano |
| G4 | content/en/lessons/m4-l3-wobec-3betu.md | ¶ „How much to continue” | ŚREDNIE | zastosowano („We adopt intervals close to both sources”) |
| G4 | content/en/lessons/m4-l3-wobec-3betu.md | drills[7].options[0].why i ¶ „4-bet” | NISKIE | zastosowano („2.2×–2.5× the 3-bet”) |
| G5 | content/en/lessons/m7-l3-implied-odds.md | ¶ SPR, zd. 1 | WYSOKIE | zastosowano („(stack-to-{{t:pot}} ratio)”) |
| G5 | content/en/lessons/m6-l1-mdf-alpha.md | ~17 miejsc z „Minimum defense frequency” | ŚREDNIE | zastosowano (`{{t:mdf}}`; zdanie definicji: „{{t:mdf}} (minimum defense frequency) is the flip side of alpha”) |
| G5 | content/en/lessons/m7-l4-probe-obrona.md | n-mdf-turn.explanation | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m5-l3-czestotliwosc-rozmiar.md | q-paired.prompt, q-mono.prompt | ŚREDNIE | zastosowano („Which plan fits?”); błąd źródła pl |
| G5 | content/en/lessons/m7-l2-polaryzacja.md | q-semibluff-size.prompt | ŚREDNIE | zastosowano („The turn is a three.”); błąd źródła pl |
| G5 | content/en/lessons/m7-l4-probe-obrona.md | q-probe-oesd.prompt, q-probe-value.prompt | ŚREDNIE | zastosowano; błąd źródła pl |
| G5 | content/en/lessons/m5-l3-czestotliwosc-rozmiar.md | ¶ „Note: wet…” | ŚREDNIE | zastosowano („medium ones”) |
| G5 | content/en/lessons/m5-l4-bez-pozycji.md | q-oop-plan.prompt | ŚREDNIE | zastosowano („The flop is middle and {{t:connected}}.”) |
| G5 | content/en/lessons/m5-l4-bez-pozycji.md | q-oop-plan.options[0].why | ŚREDNIE | zastosowano („middle”, „they/their”) |
| G5 | content/en/lessons/m5-l4-bez-pozycji.md | q-oop-why, q-oop-strong, c-review, ¶ „Out of position” | ŚREDNIE | zastosowano (they/their/them) |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-barrel-card.prompt, q-bad-card.prompt | ŚREDNIE | zastosowano („they”) |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-barrel-card why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-bad-card why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-gutshot-ace why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-air-blank why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-value-top why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-what-to-bet why | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-filter (prompt, opcje) | ŚREDNIE | zastosowano |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | nagłówek, lista, ¶ „What to bet…” | ŚREDNIE | zastosowano („so they are stronger”, „hits their AK”, „only when the opponent folds”) |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | q-medium-pair.options[2].text | ŚREDNIE | zastosowano („Bet to find out where you stand”); błąd źródła pl |
| G5 | content/en/lessons/m7-l3-implied-odds.md | blok formula | ŚREDNIE | zastosowano („cards that miss”) |
| G5 | content/en/lessons/m7-l3-implied-odds.md | ¶ SPR, ostatnie zdanie | ŚREDNIE | zastosowano („Hand Planning”, jak modules.yaml) |
| G5 | content/en/lessons/m7-l4-probe-obrona.md | ¶1 | ŚREDNIE | zastosowano („take the initiative and bet yourself”) |
| G5 | content/en/lessons/m7-l4-probe-obrona.md | q-probe-board why | NISKIE | zastosowano („hit”) |
| G5 | content/en/lessons/m6-l2-sprawdzenie.md | q-realize why | NISKIE | zastosowano („their”) |
| G5 | content/en/lessons/m6-l2-sprawdzenie.md | title | NISKIE | zastosowano („Call or fold”) |
| G5 | content/en/lessons/m5-l4-bez-pozycji.md | c-review options.small/big, why.big, check | NISKIE | backlog (ujednolicić z m5-l3 jednym przebiegiem) |
| G5 | content/en/lessons/m7-l1-druga-beczka.md | ¶ „(as in defense in M6)” | NISKIE | backlog (styl) |
| G6 | content/en/lessons/m9-l1-spr.md | ¶2 | WYSOKIE | zastosowano („(stack-to-pot ratio)”) |
| G6 | content/en/lessons/m8-l1-value.md | q-where-am-i.prompt | ŚREDNIE | zastosowano (zwykłe „see”); błąd źródła pl |
| G6 | content/en/lessons/m8-l1-value.md | q-where-am-i.options[0].why | NISKIE | backlog (styl/klarowność) |
| G6 | content/en/lessons/m8-l3-blokery.md | q-missed-flush.prompt | NISKIE | backlog (dodanie znaczników, pojęcie poprawne) |
| G6 | content/en/lessons/m9-l3-rozmiar-geometryczny.md | q-3bet-ip.options[1].why | NISKIE | zastosowano (“…”) |
| G6 | content/en/lessons/m9-l4-plan-trzech-ulic.md | ¶1 | NISKIE | zastosowano („before you make your first {{t:bet}}”, bez błędnego znacznika na „put in”) |
| G7 | content/en/lessons/m10-l2-typy-graczy.md | ¶4 | WYSOKIE | zastosowano („a {{t:vpip}} in the teens” = kilkanaście procent) |
| G7 | content/en/lessons/m11-l1-push-fold.md | q-two-ways.prompt | WYSOKIE | zastosowano („rather than wait … and then {{t:call}}”); błąd źródła pl |
| G7 | content/en/lessons/m11-l3-icm.md | q-second.prompt | WYSOKIE | zastosowano („Same stacks”); błąd źródła pl |
| G7 | content/en/lessons/m11-l3-icm.md | q-big-stack.options[2].why | WYSOKIE | zastosowano („the rest of its equity comes from 2nd place”); błąd źródła pl |
| G7 | content/en/lessons/m11-l3-icm.md | ¶ 2008 (Bubble factor) | WYSOKIE | zastosowano („highest {{t:pocket-pair\|pocket pairs}}”, „in a single-hand game”); błąd źródła pl |
| G7 | content/en/lessons/m11-l1-push-fold.md | q-fold-equity.prompt | ŚREDNIE | zastosowano (szyk) |
| G7 | content/en/lessons/m10-l3-odejscie-od-bazy.md | ¶ „3-betting a player who doesn't fold” | ŚREDNIE | zastosowano (zwykłe „put”); błąd źródła pl |
| G7 | content/en/lessons/m10-l1-statystyki.md | q-vpip-bb.prompt | NISKIE | zastosowano („increase”) |
| G7 | content/en/lessons/m10-l1-statystyki.md | q-gap.options[2].why | NISKIE | zastosowano („increase”) |
| G7 | content/en/lessons/m10-l2-typy-graczy.md | ¶8 | NISKIE | zastosowano („more weak hands”); zaimek „he” zostawiony, bo cała lekcja m10-l1/m10-l2 konsekwentnie używa „he” (ujednolicenie: backlog niżej) |
| G7 | content/en/lessons/m10-l3-odejscie-od-bazy.md | q-sample-direction.options[1].text | NISKIE | zastosowano („a maximally exploitative strategy”) |
| G7 | content/en/lessons/m10-l4-rake.md | ¶9 | NISKIE | zastosowano („with … rake you need …”) |
| G8 | content/en/lessons/m13-l1-raport.md | ¶5 lista stopni | WYSOKIE | zastosowano (Aligned / Acceptable / Inaccuracy / Mistake / Ungraded / Timed out, jak `grade.*` i `game.report.verdicts`) |
| G8 | content/en/lessons/m13-l1-raport.md | ¶6 licznik | WYSOKIE | zastosowano („X of Y decisions graded”, „ungraded”) |
| G8 | content/en/lessons/m13-l1-raport.md | q-mixed options[0] | WYSOKIE | zastosowano |
| G8 | content/en/lessons/m13-l1-raport.md | q-mixed options[2] | WYSOKIE | zastosowano |
| G8 | content/en/lessons/m13-l1-raport.md | q-rare options[0], options[1].why | WYSOKIE | zastosowano („threshold for aligned”) |
| G8 | content/en/lessons/m13-l1-raport.md | q-size options[1].text | WYSOKIE | zastosowano |
| G8 | content/en/lessons/m13-l1-raport.md | q-unrated prompt, options[0–2].why | WYSOKIE | zastosowano (oraz q-result options[2].why „graded by a rule”) |
| G8 | content/en/lessons/m13-l1-raport.md | sub; nagłówek | NISKIE | zastosowano („Decision, result and grades”, „## Grade levels”) |
| G8 | content/en/lessons/m13-l2-powtorki.md | q-cards options[1] | ŚREDNIE | zastosowano („All graded decisions”, „Aligned and acceptable”) |
| G8 | content/en/lessons/m13-l2-powtorki.md | q-vpip options[1].why | NISKIE | zastosowano („grade”) |
| G8 | content/en/lessons/m13-l2-powtorki.md | q-swap options[0].why | NISKIE | zastosowano („an ace-high {{t:flush-draw}}”) |
| G8 | content/en/lessons/m13-l2-powtorki.md | ¶8 | NISKIE | zastosowano („they look … become”) |
| G8 | content/en/lessons/m13-l2-powtorki.md | title | NISKIE | zastosowano („Reviews from play and targeted training”) |
| G8 | content/en/lessons/m12-l3-tilt.md | ¶7 („When it’s more than tilt”) | ŚREDNIE | zastosowano („read the “Responsible gaming” card in the lesson on bankroll”; akapit bez tokenów krytycznych, ramka w m12-l4 nietknięta) |
| G8 | content/en/lessons/m12-l1-wariancja.md | q-dd-wr-low options[0].why | ŚREDNIE | zastosowano („in more than half of the samples”; pole bez tokenów krytycznych) |
| G8 | content/en/lessons/m12-l1-wariancja.md (źródło pl) | q-dd-meaning options[0].text, options[2].text | ŚREDNIE | odrzucono dla en: en („review”) jest poprawny, zmiana dotyczy tylko pl → lista błędów źródła |
| G8 | content/en/lessons/m12-l2-decyzja-wynik.md | q-strategy-change options[0].why | NISKIE | backlog (styl) |
| G8 | content/en/lessons/m12-l2-decyzja-wynik.md | q-skill-hands options[1].why | NISKIE | zastosowano („winrate”) |
| G8 | content/en/lessons/m12-l4-bankroll.md | ¶3 pod formula | NISKIE | odłożone (treść krytyczna) |
| G8 | content/en/lessons/m12-l4-bankroll.md | title | NISKIE | odłożone (treść krytyczna) |
| G8 | content/en/lessons/m13-l3-przeglad.md | q-mark options[0].why | NISKIE | zastosowano („can be wrong” = „bywa zła”) |

## Błędy źródła pl dla roli 06

Znacznik terminu użyty dla zwykłego słowa w `content/pl/` (en poprawiony albo już poprawny bez znacznika):

1. `content/pl/rules.yaml`, R-M12-002, then (wiersz 964): `{{t:call|sprawdzasz}} decyzje` = przeglądasz decyzje, nie call.
2. `content/pl/lessons/m3-l1-pozycja.md`, drills[0].options[2].why (opcja UTG, wiersz 17): `ma za sobą cały {{t:board}}` = stół z graczami, nie karty wspólne (zwykłe „stół”, bez znacznika).
3. `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md`, q-paired.prompt i q-mono.prompt (wiersze 66, 76): `plan {{t:fold|pasuje}}` = odpowiada.
4. `content/pl/lessons/m5-l4-bez-pozycji.md`, q-oop-plan.prompt (wiersz 13): `plan {{t:fold|pasuje}}` = odpowiada.
5. `content/pl/lessons/m7-l2-polaryzacja.md`, q-semibluff-size.prompt (wiersz 51): `Turn to {{t:three-of-a-kind}}` = karta 3 (trójka), nie układ.
6. `content/pl/lessons/m7-l4-probe-obrona.md`, q-probe-oesd.prompt i q-probe-value.prompt (wiersze 43, 53): jak wyżej.
7. `content/pl/lessons/m7-l1-druga-beczka.md`, q-medium-pair.options[2].text (wiersz 77): `żeby {{t:call|sprawdzić}}, gdzie stoję` = przekonać się.
8. `content/pl/lessons/m8-l1-value.md`, q-where-am-i.prompt (wiersz 87): `żeby {{t:call|sprawdzić}}, gdzie jestem` = przekonać się.
9. `content/pl/lessons/m9-l3-rozmiar-geometryczny.md`, drills[2].options[2].why (wiersz 31): `{{t:fold|Pasuje}} {{t:spr}}` = odpowiada.
10. `content/pl/lessons/m9-l4-plan-trzech-ulic.md`, notka (wiersz 130): `plan {{t:call|sprawdzasz}} na nowo` = weryfikujesz.
11. `content/pl/lessons/m10-l3-odejscie-od-bazy.md`, ¶ „3-bet przeciw graczowi, który nie pasuje” (wiersz 122): `{{t:bet|stawiają}} tę granicę` = wyznaczają.
12. `content/pl/lessons/m11-l1-push-fold.md`, q-two-ways.prompt (wiersz 79): `{{t:check|czekać}}, aż ktoś…` = zwykłe czekanie, nie check.
13. `content/pl/lessons/m11-l3-icm.md`, q-second.prompt (wiersz 20): `Ten sam {{t:board}}` = ten sam układ stacków przy stole.
14. `content/pl/lessons/m11-l3-icm.md`, q-big-stack.options[2].why (wiersz 40): `resztę {{t:pot|puli}}` = pula nagród (`prize-pool`) / equity, nie pula rozdania.
15. `content/pl/lessons/m11-l3-icm.md`, ¶ o pracy z 2008 r. (wiersz 161): `{{t:top-pair|najwyższe pary}}` = najwyższe pary kieszonkowe (`pocket-pair`), sytuacja przed flopem.
16. `content/pl/lessons/m12-l1-wariancja.md`, q-dd-meaning options[0].text (`{{t:call|sprawdzasz}} decyzje`) i options[2].text (`{{t:call|sprawdzać}}`) (wiersze 83, 85) = przeglądasz/sprawdzać (weryfikować). Uwaga: plik m12-l1 dotyczy wariancji; zmiana w pl nie dotyka tokenów krytycznych w tych polach, ale pole options[0] należy do zadania z `{{n:dd.bi.small}}` w prompcie — poprawiać z tą samą ostrożnością.

## Pytania produktowe

1. Słowniczek w en (i w pozostałych 33 językach): ekran (`apps/mobile/src/app/glossary.tsx`) pokazuje w każdym języku polski termin (`entry.pl`) obok angielskiego, a `glossary.link` / `glossary.intro` / `glossary.search` obiecują „Glossary PL–EN”, „Polish terms from the course”, wyszukiwanie po polsku. Dla użytkownika en kurs nie jest po polsku. Opcje: (a) w en ekran pokazuje termin angielski z definicją, bez polskiego (teksty: „Glossary”, „Poker terms used in the course…”, „Search terms”); (b) zostawić słowniczek PL–EN jako cechę wszystkich języków i tylko lepiej opisać, po co jest polska kolumna; (c) w innych językach: termin w języku interfejsu + angielski. Rekomendacja: (a) dla en, (c) dla pozostałych — decyzja roli 08/06 i właściciela; do tego czasu teksty en zostają wierne ekranowi.
2. Długości etykiet en (`play.waiting`, `play.review.start`, `glossary.areas.board`, `play.betFrac`): do sprawdzenia na telefonie w liście kontrolnej testu; skracać dopiero po zobaczeniu ucięcia.

## Backlog (uwagi dodatkowe, poza tabelą)

- Zaimek rywala: m10-l1 i m10-l2 konsekwentnie używają „he/his/him” (nie zgłoszone w G7 poza jednym zdaniem); reszta kursu „they”. Ujednolicić do „they” jednym przebiegiem (także egzamin m13 q10 „friend … he”, m12-l3 cytat myśli gracza — tam zostawić). m12-l3 nie ruszano.
- Apostrof typograficzny ’ vs ' (m6 egzamin, lekcje m12–m13): ujednolicić jednym przebiegiem dla całego en (z wyłączeniem m12-l4 do czasu zgody na zmiany w treści krytycznej).
