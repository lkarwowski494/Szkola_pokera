# fr-L10: francuski (fr), treść krytyczna — moduł 12 (lekcje m12-l1…l4, egzamin m12) i linie pomocy (helplines)

Recenzja niezależna, źródło: `content/pl/…` (lekcje, egzamin) i `content/helplines.yaml` (linie pomocy). Każde zdanie porównane ze źródłem.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m12-l1-wariancja.md | tak | 140 |
| content/fr/lessons/m12-l2-decyzja-wynik.md | tak | 116 |
| content/fr/lessons/m12-l3-tilt.md | tak | 134 |
| content/fr/lessons/m12-l4-bankroll.md | tak | 149 |
| content/fr/exams/m12.yaml | tak | 93 |
| content/fr/helplines.yaml (względem content/helplines.yaml) | tak | 39 |
| content/fr/terms-nazwy.yaml (terminologia, pomocniczo) | tak | 153 |

## Znaleziska

Brak znalezisk KRYT i WYS. Liczby, granice i kierunki zaleceń (próg zejścia „au plus tard” przy połowie, powrót „au plus tôt”, „jamais moins de”, sygnały ostrzegawcze, poprawne odpowiedzi, wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, `{{helplines}}`) zgodne ze źródłem. `helplines.yaml`: `id`, `claim`, `country`, `kind`, `name` („Gambling Therapy (Gordon Moody)”), `label`, `url` (https://www.gamblingtherapy.org/), `sources`, daty `checked`/`review_by` identyczne ze źródłem; `pointer`, `fallback.text`, `regions_label`, `info` oddają sens w całości (lekarz albo specjalista zdrowia psychicznego; nagłe zagrożenie, także myśli samobójcze własne lub znajomej osoby → lokalny numer alarmowy; bezpłatnie, online, poufnie) — bez znalezisk.

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m12-l3-tilt.md:133 | lisez la fiche sur le jeu responsable | lisez l'encadré « Jeu responsable » | pl „kartę o odpowiedzialnej grze”; ta sama ramka w m12-l4:102 i jej tytuł (m12-l4:143) to „l'encadré « Jeu responsable »” — jedna nazwa na odesłanie do treści krytycznej | wysoka | tak |
| 2 | ŚR | m12.yaml:56 | text: "Le tilt d'erreur" | text: "Le tilt de l'erreur" | q6: nazwa typu tiltu w lekcji m12-l3 (16, 42, 43, 53) to „tilt de l'erreur”; pytanie odwołuje się do podziału z lekcji | wysoka | tak |
| 3 | ŚR | m12.yaml:56 | Le tilt d'erreur, c'est | Le tilt de l'erreur, c'est | q6 why: nazwa typu tiltu jak w lekcji m12-l3 („tilt de l'erreur”) | wysoka | tak |
| 4 | ŚR | m12-l4-bankroll.md:51 | C'est du tilt par désespoir | C'est du tilt de désespoir | q-move-down why: nazwa typu tiltu w m12-l3 (17, 33, 71) to „tilt de désespoir” | wysoka | tak |
| 5 | ŚR | m12-l2-decyzja-wynik.md:74 | à partir de quand le talent commence à l'emporter | à partir de quand la compétence commence à l'emporter | pl „umiejętność” (skill, rzecz wyuczona), „talent” sugeruje wrodzony dar; w tym samym pliku „écart de niveau” | średnia | tak |
| 6 | ŚR | m12-l2-decyzja-wynik.md:112 | le talent ne commençait à l'emporter | la compétence ne commençait à l'emporter | pl „umiejętność zaczynała przeważać”; „talent” ≠ umiejętność | średnia | tak |
| 7 | ŚR | m12-l2-decyzja-wynik.md:16 | equity." | équité." | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 8 | ŚR | m12-l2-decyzja-wynik.md:17 | equity au | équité au | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 9 | ŚR | m12-l2-decyzja-wynik.md:31 | {{n:eq.bet-quarter}} d'equity et vous | {{n:eq.bet-quarter}} d'équité et vous | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 10 | ŚR | m12-l2-decyzja-wynik.md:40 | {{n:eq.bet-pot}} d'equity et vous | {{n:eq.bet-pot}} d'équité et vous | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 11 | ŚR | m12-l2-decyzja-wynik.md:49 | prix, l'equity face à | prix, l'équité face à | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 12 | ŚR | m12-l2-decyzja-wynik.md:85 | equity que | équité que | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 13 | ŚR | m12-l2-decyzja-wynik.md:106 | et l'equity face à | et l'équité face à | termin equity: terms-nazwy.yaml fr = „équité”; pl ma tu nieoznaczone „equity” | wysoka | tak |
| 14 | ŚR | m12.yaml:45 | equity, | équité, | termin equity: terms-nazwy.yaml fr = „équité” | wysoka | tak |
| 15 | ŚR | m12.yaml:46 | equity face | équité face | termin equity: terms-nazwy.yaml fr = „équité” | wysoka | tak |
| 16 | NISKIE | m12-l2-decyzja-wynik.md:68 | {{t:standard-deviation\|écart type}} d'env. | {{t:standard-deviation\|écart-type}} d'env. | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 17 | NISKIE | m12-l2-decyzja-wynik.md:77 | {{t:standard-deviation\|écart type}} (leçon | {{t:standard-deviation\|écart-type}} (leçon | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 18 | NISKIE | m12-l4-bankroll.md:20 | avec un {{t:standard-deviation\|écart type}} de {{n:var.sd}} | avec un {{t:standard-deviation\|écart-type}} de {{n:var.sd}} | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 19 | NISKIE | m12-l4-bankroll.md:29 | {{n:br.bi.base}} {{t:buy-in\|buy-ins}}, un {{t:standard-deviation\|écart type}} de {{n:var.sd}}, mais un | {{n:br.bi.base}} {{t:buy-in\|buy-ins}}, un {{t:standard-deviation\|écart-type}} de {{n:var.sd}}, mais un | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 20 | NISKIE | m12-l4-bankroll.md:38 | {{n:br.bi.base}} {{t:buy-in\|buy-ins}}, un {{t:standard-deviation\|écart type}} de {{n:var.sd}}, mais vous | {{n:br.bi.base}} {{t:buy-in\|buy-ins}}, un {{t:standard-deviation\|écart-type}} de {{n:var.sd}}, mais vous | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 21 | NISKIE | m12-l4-bankroll.md:123 | Avec un {{t:standard-deviation\|écart type}} de {{n:var.sd}} | Avec un {{t:standard-deviation\|écart-type}} de {{n:var.sd}} | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 22 | NISKIE | m12.yaml:7 | {{n:var.wr.typical.high}} avec un {{t:standard-deviation\|écart type}} de {{n:var.sd}} et | {{n:var.wr.typical.high}} avec un {{t:standard-deviation\|écart-type}} de {{n:var.sd}} et | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 23 | NISKIE | m12.yaml:9 | {{t:buy-in\|buy-ins}}. L'{{t:standard-deviation\|écart type}} du résultat | {{t:buy-in\|buy-ins}}. L'{{t:standard-deviation\|écart-type}} du résultat | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 24 | NISKIE | m12.yaml:10 | moyenne. L'{{t:standard-deviation\|écart type}} du résultat | moyenne. L'{{t:standard-deviation\|écart-type}} du résultat | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 25 | NISKIE | m12.yaml:16 | votre {{t:standard-deviation\|écart type}} de | votre {{t:standard-deviation\|écart-type}} de | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 26 | NISKIE | m12.yaml:25 | votre {{t:standard-deviation\|écart type}} est | votre {{t:standard-deviation\|écart-type}} est | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 27 | NISKIE | m12.yaml:27 | {{t:standard-deviation\|écart type}} plus | {{t:standard-deviation\|écart-type}} plus | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 28 | NISKIE | m12.yaml:28 | un {{t:standard-deviation\|écart type}} de {{n:var.sd}}", | un {{t:standard-deviation\|écart-type}} de {{n:var.sd}}", | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 29 | NISKIE | m12.yaml:28 | "L'{{t:standard-deviation\|écart type}} est | "L'{{t:standard-deviation\|écart-type}} est | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 30 | NISKIE | m12.yaml:34 | Votre {{t:standard-deviation\|écart type}} est | Votre {{t:standard-deviation\|écart-type}} est | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 31 | NISKIE | m12.yaml:71 | {{n:dd.wr-low}} avec un {{t:standard-deviation\|écart type}} de {{n:var.sd}} et | {{n:dd.wr-low}} avec un {{t:standard-deviation\|écart-type}} de {{n:var.sd}} et | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 32 | NISKIE | m12.yaml:89 | {{t:standard-deviation\|écart type}} ne | {{t:standard-deviation\|écart-type}} ne | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 33 | NISKIE | m12.yaml:93 | {{t:standard-deviation\|écart type}} qui | {{t:standard-deviation\|écart-type}} qui | pisownia terminu: terms-nazwy.yaml i m12-l1 mają „écart-type” (z łącznikiem) | wysoka | tak |
| 34 | NISKIE | m12-l2-decyzja-wynik.md:68 | {{n:var.hands.k}} milliers de mains | {{n:var.hands.k}} mille mains | wszędzie indziej w module „{{n:…}} mille mains”; „100 milliers de mains” niepoprawne | wysoka | tak |
| 35 | NISKIE | m12-l2-decyzja-wynik.md:67 | contre les {{n:skill.pct}} plus faibles | contre les {{n:skill.pct}} les plus faibles | stopień najwyższy („najsłabszego”) wymaga rodzajnika: „les plus faibles”; bez niego czyta się jak stopień wyższy | wysoka | tak |
| 36 | NISKIE | m12-l2-decyzja-wynik.md:76 | devancent les {{n:skill.pct}} plus faibles | devancent les {{n:skill.pct}} les plus faibles | stopień najwyższy: „les plus faibles” | wysoka | tak |
| 37 | NISKIE | m12-l2-decyzja-wynik.md:112 | devançaient les {{n:skill.pct}} plus faibles | devançaient les {{n:skill.pct}} les plus faibles | stopień najwyższy: „les plus faibles” | wysoka | tak |
| 38 | NISKIE | m12-l3-tilt.md:22 | relance sur vos blinds | relance sur vos blindes | pisownia: terms-nazwy.yaml „blinde”, w korpusie przeważa „blindes” | wysoka | tak |
| 39 | NISKIE | m12-l3-tilt.md:78 | ce qui vous déclenche | ce qui déclenche votre tilt | kalka „co cię wyzwala”; po francusku wyzwala się tilt, nie gracza (por. m12-l3:118 „ce qui le déclenche”) | średnia | tak |
| 40 | NISKIE | m12-l3-tilt.md:130 | Votre jeu a un écart | Votre niveau de jeu varie | kalka „gra ma rozrzut”; „a un écart” jest po francusku niezręczne i niejasne | średnia | tak |
| 41 | NISKIE | m12-l4-bankroll.md:77 | Elle le protège de la faillite | Elle le protège de la ruine | pl „bankructwo” = to samo pojęcie co w {{t:risk-of-ruin}} („risque de ruine”); „faillite” to inne słowo na to samo pojęcie | średnia | tak |
| 42 | NISKIE | m12-l1-wariancja.md:65 | fait normalement partie du jeu d'un joueur gagnant | est une composante normale du jeu d'un joueur gagnant | pl „jest normalną częścią gry”; „fait normalement partie” czyta się jak „zwykle należy do” | średnia | tak |
| 43 | NISKIE | m12-l2-decyzja-wynik.md:13, 22 | Préflop / préflop | preflop | terms-nazwy.yaml ma „preflop” (bez akcentu); w korpusie fr obie pisownie (preflop ×84, préflop ×41), obie poprawne po francusku — wybór pisowni dla całego korpusu, nie tylko tego modułu | średnia | nie |
| 44 | NISKIE | m12-l2-decyzja-wynik.md:13, 22, 97; exams/m12.yaml:43, 45, 47 | tout votre tapis / à tapis / fait tapis | (stack / all-in) | terms-nazwy.yaml: stack = „stack”, all-in = „all-in” (forma „à tapis” dopuszczona w komentarzu); m12-l4:113 ma „stack complet”. Sens bez zmian, naturalny francuski; do decyzji przy ujednolicaniu korpusu | średnia | nie |
| 45 | NISKIE | m12-l2-decyzja-wynik.md:67, 69 vs exams/m12.yaml:36 | nouveaux coups / nouvelles actions | (jedno słowo) | pl „nowe zagrania” w obu miejscach; dwa różne odpowiedniki, sens ten sam | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- Konstrukcja „{{n:var.hands.k}} mille mains” (wyświetla się jako „100 mille mains”, „20 mille mains”) w m12-l1, m12-l2, m12-l4 i egzaminie (ok. 40 miejsc): zrozumiała i konsekwentna, ale rodzimy czytelnik napisałby „100 000 mains”. Wynika z budowy źródła („{{n}} tys. rąk”); zmiana wymagałaby innego klucza liczbowego, więc bez poprawki.
- m12-l2:67, 76, 112 „les {{n:skill.pct}} meilleurs (joueurs)”: po poprawkach 35–37 zostaje „les 1 % meilleurs joueurs … les 1 % les plus faibles”; naturalniej byłoby „le meilleur 1 % des joueurs … le 1 % le plus faible” (wymaga przebudowy zdania i zgody czasownika) — do oceny przez native speakera.
- m12-l3:94 forma „jeu mental” dla `{{t:mental-game}}`: terms-nazwy.yaml podaje „mental game”, a „jeu mental” jako formę tłumacza; zdanie jest poprawne, do decyzji, czy w treści ma być nazwa angielska.
- Poprawki 5–6 („talent” → „compétence”): alternatywa „l'habileté” (termin z dyskusji „jeu d'adresse / jeu de hasard”); wybór słowa do potwierdzenia.

## Uwagi do źródła pl

- Brak uwag merytorycznych. (m12-l3:60 i 125: pl ma w przygotowanym zdaniu tryb rozkazujący „graj dalej dobrze”, fr pierwszą osobę „je continue à bien jouer” — to zdanie mówione do siebie, sens zachowany, bez poprawki.)

## Ocena ogólna

Przekład modułu 12 i linii pomocy jest wierny i naturalny: w treści krytycznej (odpowiedzialna gra, progi bankrolla, sygnały ostrzegawcze, tilt, kontakt pomocowy) nie znalazłem żadnej zmiany sensu, liczby, granicy ani znacznika, a nazwa organizacji i adres są identyczne ze źródłem. Znaleziska dotyczą wyłącznie spójności: nazwy typów tiltu i odesłania do ramki „Jeu responsable” różnią się między lekcjami a egzaminem, „equity” i „écart type” odbiegają od `terms-nazwy.yaml` („équité”, „écart-type”), a „talent” nieściśle oddaje „umiejętność”. Reszta to drobne kalki i pisownia. Wszystkie 42 poprawki JSON przechodzą walidator (błędy: 0).
