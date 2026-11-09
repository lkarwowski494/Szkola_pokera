# Kontrola (a) treści krytycznej, moduł 12: pl → fr

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/, 7 plików: m12-l1-wariancja.md, m12-l4-bankroll.md, exams-m12.yaml, helplines.yaml, rules-R-M12-009-011.yaml, terms-def-wybrane.yaml, ui-wybrane.json) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/fr/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności, nazwy i linki pomocy, teksty płatności i usuwania/zastępowania danych.
- Każde wątpliwe miejsce (w tym znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/fr/ i na pliku pełnym <scratchpad>/tl/content/fr/… / <scratchpad>/tl/ui/fr.json.

## Kontrola automatyczna (node, <scratchpad>/pr/A-tmp/kontrola.mjs, <scratchpad>/ka/pl vs <scratchpad>/ka/fr)
- Multizbiór {{n:…}}: zgodny w każdym pliku i w każdym drillu (segmentacja po id) — 0 różnic.
- {{helplines}}: 1 = 1 (m12-l4). Parametry {{…}} UI: zgodne.
- URL: helplines.yaml zgodne (gamblingtherapy.org ×4). terms-def-wybrane.yaml: „brak” 3 URL w fr to artefakt formatu (wyciąg fr zawiera tylko pole `def`) — nie różnica.
- `claim`: H-INT-2, H-INT-1 — zgodne. Nazwy organizacji: „Gambling Therapy (Gordon Moody)”, „Gambling Therapy”, „Apple” — zgodne.
- {{t:…}} (ostrzeżenie): m12-l1 q-dd-meaning: brak 2× {{t:call}} — „revoyez vos décisions” oddaje sens źródła (zgodne).

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst (dokładny fragment do zastąpienia i nowy) | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, treść lekcji (winrate, SD, przedziały, ile rąk, tabela downswingów, nota, zdanie o „Aide”) | zgodne | — | — | — |
| 2 | m12-l1, q-dd-wr-low, why opcji 2: „le winrate détermine la vitesse à laquelle le résultat s'en éloigne” | zgodne | [NIEJASNE] przekładu zwrotnego: „s'en” odnosi się do wahań — dokładnie jak źródło „jak szybko wynik od nich ucieka”; ta sama konstrukcja, bez zmiany sensu | — | — |
| 3 | m12-l1, pozostałe drille | zgodne | q-dd-wr-low „plus d'un échantillon sur deux” = „częściej niż w co drugiej próbce” | — | — |
| 4 | m12-l4, „Quand descendre”: „au plus tard… à la moitié”, „au plus tôt… bankroll complète”, „descendre avant le seuil… n'est pas une erreur” | zgodne | — | — | — |
| 5 | m12-l4, RoR: definicja, wzór, tabela, „Od czego zależy ryzyko” | zgodne | — | — | — |
| 6 | m12-l4, drille q-ror-*, q-unknown-wr, q-move-down, q-stay, q-move-up, q-losing, q-study-* | zgodne | q-stay „plafond de risque” = „granica ryzyka”; q-study-beginner „Vous débutez” = „Dopiero zaczynasz”; q-move-down „fortement” vs „gwałtownie” — odcień | — | — |
| 7 | m12-l4, q-warning-sign, why poprawnej: „utilisez les contacts de la fiche sur le jeu responsable” | różnica (drobna) | Sens zgodny („karta o odpowiedzialnej grze”), ale „fiche” mniej jednoznacznie wskazuje ramkę „Jeu responsable” w tej lekcji | stary: `utilisez les contacts de la fiche sur le jeu responsable.` → nowy: `utilisez les contacts de l'encadré « Jeu responsable ».` | NISKIE |
| 8 | m12-l4, ramka „Jeu responsable” (sygnały, {{helplines}}) | zgodne | — | — | — |
| 9 | exams-m12, q1–q10 | zgodne | q9 „au plus tard à {{n:exam.m12.md.half}}”, q10 „deux fois plus bas” — zgodne | — | — |
| 10 | helplines.yaml: pointer, fallback.text, entry info („en toute confidentialité” = „poufnie”), links, sources | zgodne | — | — | — |
| 11 | rules R-M12-009, R-M12-011 (if/then/because) | zgodne | „au plus tard”, „ne remontez qu'une fois…” — granice zgodne | — | — |
| 12 | rules R-M12-011 source: „à 3bb/100, descente à 30 buy-ins, soit à bankroll complète” | zgodne | [NIEJASNE] przekładu zwrotnego; źródło „czyli przy pełnym bankrollu” (30 wpisowych to pełny bankroll w tym źródle) — fr oddaje to samo, zwięźle; pole źródła, nie zalecenie | — | — |
| 13 | terms-def: bankroll, risk-of-ruin („à la même limite”) | zgodne | — | — | — |
| 14 | UI purchase (unlocks, renews*, oneTime, cancelInfo, terms z „(Terms of Use)”, pending, failed, restore*) | zgodne | — | — | — |
| 15 | UI data (intro, replaceBody „irréversible”, badFile, newerVersion, imported, importFailed) | zgodne | — | — | — |
| 16 | UI help (link „devient incontrôlable”, intro, call, callA11y, openA11y, openFailed) | zgodne | intro „Si vous ne contrôlez plus votre façon de jouer” = „Jeśli granie przestaje być pod kontrolą” | — | — |

Poprawki do nałożenia: <scratchpad>/pr/A-fr.json (grupa „A-fr”, 1 poprawka); `node <scratchpad>/skrypty/sprawdz-poprawki.mjs <scratchpad>/pr/A-fr.json` → „poprawek 1, błędnych 0”.

## Werdykt: zaliczona
Brak różnic sensu KRYT/WYS/ŚR.
Liczby: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 0, NISKIE 1; poprawek w JSON 1.
