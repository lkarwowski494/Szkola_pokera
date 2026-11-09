---
id: m13.l2
module: m13
order: 2
title: "Wiederholungen aus dem Spiel und gezieltes Training"
sub: "Was mit deinen Fehlern passiert"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Im Spiel hattest du A♥ K♥ auf dem {{t:board|Board}} Q♥ 7♥ 2♣ und hast einen Fehler gemacht. In der Wiederholung siehst du A♠ K♠ auf dem {{t:board|Board}} Q♠ 7♠ 2♦. Ist die richtige Entscheidung dieselbe?"
    options:
      - { text: "Ja: Alle Farben wurden mit einem einzigen Tausch ersetzt", correct: true, why: "Herz wurde zu Pik und Kreuz zu Karo, überall gleichzeitig. Du hast weiterhin einen {{t:flush-draw|Flush-Draw}} mit Ass und dieselbe Handstärke, also ändert sich die Entscheidung nicht." }
      - { text: "Nein: Pik ist stärker als Herz", why: "Beim Texas Hold'em sind alle Farben gleichwertig: Es zählt nur, ob Karten dieselbe Farbe haben, nicht welche." }
      - { text: "Weiß man nicht, man muss neu rechnen", why: "Muss man nicht: Wenn alle Farben gleichzeitig getauscht werden, bleibt jede Hand und jeder {{t:draw|Draw}} erhalten. Das ist exakte Rechnung, keine Näherung." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Welche dieser Änderungen erhält die Entscheidung aus dieser Situation NICHT: K♥ Q♥ auf dem {{t:board|Board}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ auf dem {{t:board|Board}} J♠ 8♠ 3♥", correct: true, why: "Hier wurden die Farben nur auf dem {{t:board|Board}} getauscht: Deine Herzen passen nicht mehr zum {{t:board|Board}}, und der {{t:flush-draw|Flush-Draw}} ist weg. Das ist schon eine andere Situation." }
      - { text: "K♠ Q♠ auf dem {{t:board|Board}} J♠ 8♠ 3♥", why: "Das ist ein einziger Tausch für alle Karten (Herz ↔ Pik), also ist die Entscheidung dieselbe." }
      - { text: "K♦ Q♦ auf dem {{t:board|Board}} J♦ 8♦ 3♠", why: "Das ist ein einziger Tausch (Herz → Karo) für alle Karten, also ist die Entscheidung dieselbe." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Welche Entscheidungen aus dem Bericht kommen als Karten in die Wiederholungen?"
    options:
      - { text: "Fehler, Ungenauigkeiten und Entscheidungen nach abgelaufener Zeit", correct: true, why: "Ja. Eine zulässige Entscheidung ist kein Fehler, also entsteht daraus keine Karte. Dieselbe Regel mit derselben Handklasse im selben Spot ergibt eine Karte, nicht mehrere." }
      - { text: "Alle bewerteten Entscheidungen", why: "Korrekte und zulässige Entscheidungen müssen nicht verbessert werden, und die Wiederholungen sollen üben, was schiefgelaufen ist." }
      - { text: "Nur Fehler, ohne Ungenauigkeiten", why: "Eine Ungenauigkeit (z. B. richtige Aktion, falsche Größe) zählt wie ein Fehler, kommt also auch in den Wiederholungen zurück." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "Innerhalb von {{n:game.recall.days}} Tagen hast du {{n:game.recall.count}} Fehler in derselben Spot-Familie gemacht (z. B. Verteidigung des {{t:big-blind|Big Blinds}} gegen den Button). Was macht die App?"
    options:
      - { text: "Sie holt die ganze Familie zurück in die Wiederholungen: neue Hände aus diesem Spot", correct: true, why: "Ja: Eine einzelne Situation wird von ihrer Karte wiederholt, und ein wiederkehrender Fehler in einer Familie holt Aufgaben aus der ganzen Familie zurück, mit neuen Händen." }
      - { text: "Nichts, die Fehlerkarten reichen", why: "Eine Karte wiederholt eine konkrete Situation. Ein wiederkehrender Fehler in einer Familie bedeutet, dass es sich lohnt, sie breiter zu üben." }
      - { text: "Sie sperrt den Bereich dieses Moduls", why: "Ein nach den Lektionen freigeschalteter Bereich bleibt verfügbar. Die App fügt nur Wiederholungen hinzu." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Nach einer {{t:session|Session}} mit einigen Dutzend Händen zählst du, dass du bei fast der Hälfte davon mitgespielt hast. Was folgt daraus?"
    options:
      - { text: "Vorerst nichts: Die Stichprobe ist zu klein", correct: true, why: "Selbst {{t:vpip}} liest man erst nach ca. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} Händen. Aus einer {{t:session|Session}} kannst du einzelne Entscheidungen bewerten, aber nicht deine Frequenzen." }
      - { text: "Du spielst zu locker und musst das ändern", why: "Vielleicht, vielleicht nicht: Einige Dutzend Hände sind zu wenig, um deinen Stil von der Kartenverteilung zu unterscheiden. Schau auf die Bewertung jeder Entscheidung, mitzuspielen." }
      - { text: "Du spielst gut, weil du viele Hände gewonnen hast", why: "Das Ergebnis sagt nichts über die Qualität der Entscheidungen, und eine {{t:session}} sagt nichts über Frequenzen." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "In einer {{t:session|Session}} hast du zweimal eine 4-Bet bekommen und zweimal {{t:fold|gefoldet}}. Weißt du jetzt, dass du gegen 4-Bets zu oft {{t:fold|foldest}}?"
    options:
      - { text: "Nein: Es zählen die Gelegenheiten, und zwei sind zu wenig", correct: true, why: "Ein Trainer schaut sich eine Statistik erst bei ca. {{n:hud.opps.look}} Gelegenheiten an und ist sich bei ca. {{n:hud.opps.sure}} sicher. Zwei Gelegenheiten sind Rauschen; du bewertest jede dieser Entscheidungen einzeln." }
      - { text: "Ja: Du {{t:fold|foldest}} in jeder Situation", why: "Zwei von zwei sieht aus wie „immer“, aber bei zwei Gelegenheiten liefert selbst eine Strategie, die in der Hälfte der Fälle {{t:fold|foldet}}, oft dieses Ergebnis." }
      - { text: "Ja, wenn es in einer {{t:session|Session}} war", why: "Eine {{t:session}} fügt nichts hinzu: Die Zahl der Gelegenheiten bleibt klein." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Wann wird der Spielbereich „Flop: C-Bet“ freigeschaltet?"
    options:
      - { text: "Nach Abschluss aller Lektionen des Moduls", correct: true, why: "Ja: Der Bereich teilt nur Situationen aus dem Modul aus, also wird er freigeschaltet, sobald du seine Regeln kennst. Das freie Spiel ist von Anfang an verfügbar." }
      - { text: "Nachdem du einige {{t:session|Sessions}} gewonnen hast", why: "Ein Ergebnis in {{t:chips|Chips}} schaltet nichts frei: Es ist vor allem Rauschen." }
      - { text: "Sofort, wie das freie Spiel", why: "Das freie Spiel ist ab dem ersten Tag verfügbar, die Bereiche erst nach den Lektionen des Moduls." }
---
Jeder Fehler aus dem Bericht kommt in den Wiederholungen zu dir zurück. Diese Lektion zeigt, wie.

## Dieselbe Situation in anderen Farben

Fehler, Ungenauigkeiten und Entscheidungen nach abgelaufener Zeit werden zu Wiederholungskarten. Eine Karte zeigt dieselbe Situation: dieselben {{t:position|Positionen}}, Aktionen und Größen, dieselben Kartenwerte. Nur die Farben ändern sich: Die App tauscht sie mit einem einzigen Tausch für alle Karten gleichzeitig, z. B. Herz gegen Pik und Pik gegen Herz.

Ein solcher Tausch ändert weder die Stärke einer Hand noch die eines {{t:draw|Draws}}, denn es zählt nur, ob Karten dieselbe Farbe haben. Die richtige Entscheidung ist also dieselbe, und du lernst, die Situation zu erkennen, statt dir ein Bild zu merken.

Dieselbe Regel mit derselben Handklasse im selben Spot ergibt eine Karte, nicht mehrere. Neue Karten aus dem Spiel kommen im Rahmen eines Tageslimits in die Wiederholungen; der Rest wartet auf die folgenden Tage.

## Wenn sich ein Fehler wiederholt

Wenn du innerhalb von {{n:game.recall.days}} Tagen mindestens {{n:game.recall.count}} Fehler oder Ungenauigkeiten in derselben Spot-Familie hast, holt die App die ganze Familie zurück in die Wiederholungen: Aufgaben mit neuen Händen aus diesem Spot. Es zählen Entscheidungsfehler, nicht verlorene Hände. Diese Schwellen sind Startwerte, die wir anhand von Nutzungsdaten der App anpassen werden.

## Gezieltes Training

Ein Spielbereich ist ein Modul des Kurses. Er wird freigeschaltet, wenn du alle Lektionen des Moduls abgeschlossen hast, und teilt nur Situationen daraus aus, z. B. eine C-Bet nach einem {{t:open|Open}} vom Button. Aus dem Bericht gelangst du direkt in den Bereich, in dem du die meisten Fehler gemacht hast.

## Eine {{t:session|Session}} ist keine Statistik

Der Bericht zeigt deine Frequenzen nicht, z. B. wie oft du mitspielst. Selbst {{t:vpip}} liest man erst nach ca. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} Händen, und seltene Situationen kommen in einer {{t:session|Session}} nur ein paar Mal vor. Ein Trainer rät, Gelegenheiten zu zählen, nicht Hände: Er schaut sich eine Statistik bei ca. {{n:hud.opps.look}} Gelegenheiten an und ist sich bei ca. {{n:hud.opps.sure}} sicher.

:::note Woher diese Regeln kommen
Der Farbtausch ist exakte Rechnung: Die Rangfolge der Hände unterscheidet keine Farben. Stichproben an Händen wie im Modul zum {{t:exploit|Exploit}} (zwei Trainingsmaterialien); Zahl der Gelegenheiten: ein Trainingsmaterial zur Stichprobengröße für Statistiken im {{t:hud|HUD}}. Die Schwellen für Wiederholungen sind Einstellungen der App, ohne Quelle.
:::
