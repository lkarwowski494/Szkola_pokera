# Pakiet kontroli (a), de: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:36
NOWE:       - { text: "Nein: Das {{n:var.conf95}}-Intervall beträgt ± etwa {{n:exam.m12.style.ci}}; neue Spielzüge bewertest du in der Handanalyse", correct: true, why: "Der Fehler der Winrate nach {{n:exam.m12.style.blocks}} Blöcken ist {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, also beträgt das Intervall ± {{n:var.z95}} × {{n:exam.m12.style.se}} ≈ ± {{n:exam.m12.style.ci}}. Ein solches Ergebnis passt sowohl zu einem besseren als auch zu einem schlechteren Stil. Über die Strategie entscheidet die Analyse der Entscheidungen." }
STARE:       - { text: "Nein: Das {{n:var.conf95}}-Intervall beträgt ± etwa {{n:exam.m12.style.ci}}; neue Spielzüge bewertest du im Hand-Review", correct: true, why: "Der Fehler der Winrate nach {{n:exam.m12.style.blocks}} Blöcken ist {{n:var.sd}} ÷ {{n:exam.m12.style.sqrt}} ≈ {{n:exam.m12.style.se}}, also beträgt das Intervall ± {{n:var.z95}} × {{n:exam.m12.style.se}} ≈ ± {{n:exam.m12.style.ci}}. Ein solches Ergebnis passt sowohl zu einem besseren als auch zu einem schlechteren Stil. Über die Strategie entscheidet die Analyse der Entscheidungen." }

## [2] exams/m12.yaml:54
NOWE:       - { text: "Tilt aus Hass aufs Verlieren", correct: true, why: "Auslöser ist der Verlust selbst, auch wenn du weißt, dass es {{t:variance|Varianz}} ist. Du gibst weder dem Schicksal noch dir selbst noch dem Gegner die Schuld." }
STARE:       - { text: "Tilt aus Hass aufs Verlieren", correct: true, why: "Auslöser ist der Verlust selbst, auch wenn du weißt, dass es {{t:variance|Varianz}} ist. Du gibst weder dem Glück noch dir selbst noch dem Gegner die Schuld." }

## [3] exams/m12.yaml:55
NOWE:       - { text: "Tilt aus Ungerechtigkeit", why: "Dieser Typ wird durch das Gefühl ausgelöst, dass Poker ungerecht ist: Bad Beats, Cooler, Treffer des Gegners am River. Hier weißt du, dass alles normal gelaufen ist, und dich ärgert der Verlust selbst." }
STARE:       - { text: "Ungerechtigkeits-Tilt", why: "Dieser Typ wird durch das Gefühl ausgelöst, dass Poker ungerecht ist: Bad Beats, Cooler, Treffer des Gegners am River. Hier weißt du, dass alles normal gelaufen ist, und dich ärgert der Verlust selbst." }

## [4] exams/m12.yaml:56
NOWE:       - { text: "Tilt aus Fehlern", why: "Tilt aus Fehlern ist Ärger über eigene Fehler. Hier weißt du, dass du gut gespielt hast." }
STARE:       - { text: "Fehler-Tilt", why: "Fehler-Tilt ist Ärger über eigene Fehler. Hier weißt du, dass du gut gespielt hast." }

## [5] exams/m12.yaml:57
NOWE:       - { text: "Tilt aus Rache", why: "Rache richtet sich gegen einen Gegner, z. B. nach respektlosem Verhalten. Hier hat der Gegner korrekt gespielt und ist nicht der Grund für deinen Ärger." }
STARE:       - { text: "Rache-Tilt", why: "Rache richtet sich gegen einen Gegner, z. B. nach respektlosem Verhalten. Hier hat der Gegner korrekt gespielt und ist nicht der Grund für deinen Ärger." }

## [6] lessons/m12-l2-decyzja-wynik.md:68
NOWE:       - { text: "Ja, das Ergebnis zeigt, was funktioniert", why: "Das Ergebnis aus wenigen {{t:session|Sessions}} ist vor allem Rauschen. Bei einer {{t:standard-deviation|Standardabweichung}} von ca. {{n:var.sd}} lassen selbst {{n:var.hands.k}} Tsd. Hände einen Fehler von ca. ± {{n:var.ci.wr}}." }
STARE:       - { text: "Ja, das Ergebnis zeigt, was funktioniert", why: "Das Ergebnis aus wenigen {{t:session|Sessions}} ist vor allem Rauschen. Bei einer {{t:standard-deviation|Standardabweichung}} von ca. {{n:var.sd}} lassen selbst {{n:var.hands.k}} Tausend Hände einen Fehler von ca. ± {{n:var.ci.wr}}." }

## [7] lessons/m12-l3-tilt.md:88
NOWE:       - { text: "Nur im Feilen an deinem besten Spiel (A-Game)", why: "Das A-Game ist wichtig, aber das C-Game kostet am meisten. Ohne Verbesserung deiner schlechtesten Tage geht der Fortschritt an der Spitze hinten leicht wieder verloren." }
STARE:       - { text: "Nur im Feilen an deinem besten Spiel (A-Game)", why: "Das A-Game ist wichtig, aber das C-Game kostet am meisten. Ohne Verbesserung deiner schlechtesten Tage geht der Fortschritt an der Spitze am Ende leicht wieder verloren." }

## [8] lessons/m12-l4-bankroll.md:102
NOWE:       - { text: "Nach einem Verlust kehrst du ins Spiel zurück, um die Verluste zurückzuholen", correct: true, why: "Verlusten hinterherjagen ist eines der Anzeichen für ein Glücksspielproblem, die in diagnostischen Kriterien genannt werden. Wenn du solche Anzeichen bei dir erkennst, nutze die Kontakte im Hinweis „Verantwortungsvolles Spielen“." }
STARE:       - { text: "Nach einem Verlust kehrst du ins Spiel zurück, um die Verluste zurückzuholen", correct: true, why: "Verlusten hinterherjagen ist eines der Anzeichen für ein Glücksspielproblem, die in diagnostischen Kriterien genannt werden. Wenn du solche Anzeichen bei dir erkennst, nutze die Kontakte im Hinweis „Verantwortungsvolles Spielen“ am Ende dieser Lektion." }
