# fr-L11: francuski (fr), lekcje m0-l1-uklady, m13-l1-raport, m13-l2-powtorki, m13-l3-przeglad

Przegląd niezależny, 2026-11-10. Źródło: `content/pl/lessons/` (te same pliki), terminologia: `content/fr/terms-nazwy.yaml`, nazwy interfejsu: `apps/mobile/src/i18n/locales/fr.json` (grep; klucze podane w znaleziskach).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m0-l1-uklady.md | tak | 104 |
| content/fr/lessons/m13-l1-raport.md | tak | 109 |
| content/fr/lessons/m13-l2-powtorki.md | tak | 97 |
| content/fr/lessons/m13-l3-przeglad.md | tak | 88 |

## Zgodność z interfejsem (m13)

Sprawdzone w `fr.json` i zgodne: stopnie oceny „Conforme”, „Acceptable”, „Imprécision”, „Erreur”, „Non évaluée”, „Temps dépassé” (`game.report.verdicts.*`); licznik „X décisions évaluées sur Y” (`game.report.rated`); „Révisions” (`review.title`); „Jeu libre” (`play.free`); „Résultat en jetons” (`game.report.result`); nazwa obszaru „Flop : c-bet” (`content/fr/modules.yaml`, m5). Niezgodne: „zone (de jeu)” wobec „domaine” (znaleziska 2–8) oraz „fiche (de révision)” wobec „Cartes de révision” (znalezisko 11).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | m0-l1-uklady.md:88 | `{{t:straight\|quinte}} dans une seule couleur` | `{{t:straight-flush\|quinte dans une seule couleur}}` | Źródło ma tu drugi znacznik `{{t:straight-flush\|strit w kolorze}}`; przekład podmienił klucz na `straight` (naprawa znacznika). | wysoka | tak |
| 2 | ŚR | m13-l2-powtorki.md:44 (text) | Elle verrouillera la zone de ce module | Elle verrouillera le domaine de ce module | „Obszar” to w interfejsie „domaine” (`play.areasHint`, `game.report.again`: „Jouer le domaine « … »”, `progress.areas`); lekcja opisująca funkcję używa innej nazwy niż ekran. | wysoka | tak |
| 3 | ŚR | m13-l2-powtorki.md:44 (why) | Une zone débloquée après les leçons | Un domaine débloqué après les leçons | jw. | wysoka | tak |
| 4 | ŚR | m13-l2-powtorki.md:67 | Quand la zone de jeu « Flop : c-bet » se débloque-t-elle | Quand le domaine de jeu « Flop : c-bet » se débloque-t-il | jw. | wysoka | tak |
| 5 | ŚR | m13-l2-powtorki.md:69 | la zone ne distribue que des situations du module, elle se débloque donc | le domaine ne distribue que des situations du module, il se débloque donc | jw. | wysoka | tak |
| 6 | ŚR | m13-l2-powtorki.md:71 | et les zones seulement après | et les domaines seulement après | jw. | wysoka | tak |
| 7 | ŚR | m13-l2-powtorki.md:89 | Une zone de jeu correspond à un module du cours. Elle se débloque | Un domaine de jeu correspond à un module du cours. Il se débloque | jw. | wysoka | tak |
| 8 | ŚR | m13-l2-powtorki.md:89 | vous passez directement à la zone où | vous passez directement au domaine où | jw. | wysoka | tak |
| 9 | ŚR | m13-l2-powtorki.md:33 | décisions prises après la fin du temps imparti | décisions au temps dépassé | pl „decyzje po przekroczonym czasie” odsyła do stopnia „Temps dépassé” (`game.report.verdicts.timeout`, m13-l1:95); omówienie nie przywołuje nazwy i sugeruje, że gracz zdecydował po czasie, a decyzję podjęła aplikacja. | średnia | tak |
| 10 | ŚR | m13-l2-powtorki.md:77 | décisions prises après la fin du temps imparti deviennent | décisions au temps dépassé deviennent | jw. | średnia | tak |
| 11 | ŚR | m13-l2-powtorki.md:31, 33, 42, 43, 77, 81 | fiches de révision / fiche (12×) | jedna nazwa w lekcji i w interfejsie | pl „karty powtórek”; interfejs: „Cartes de révision : {{n}} nouvelles situations…” (`game.report.cards`). Lekcja i ekran raportu nazywają to samo inaczej. Zalecenie: zmienić jeden napis interfejsu na „Fiches de révision” („fiche” nie myli się z kartami do gry, por. „les mêmes rangs de cartes” w tej samej linii 77), a nie 12 miejsc w lekcji; decyzja terminologiczna poza zakresem tej części. | wysoka | nie |
| 12 | ŚR | m0-l1-uklady.md:31, 33, 34, 94, 99 | deux paires / Deux paires (formy `{{t:two-pair\|…}}`) | double paire (albo zmiana nazwy przyjętej) | `terms-nazwy.yaml`: `two-pair: "double paire"`; ćwiczenie słownikowe tej samej lekcji (generator `vocab`, obszar hands) pokaże „double paire”, a tabela rankingu i pytania mają „deux paires”. Obie formy są poprawne po francusku; wybór dla całego korpusu (w korpusie obie). | średnia | nie |
| 13 | NISKIE | m13-l1-raport.md:65 | spot de solver | spot de solveur | „solver” zamiast „solveur” (lekcja, korpus 112× i interfejs mają „solveur”). | wysoka | tak |
| 14 | NISKIE | m13-l1-raport.md:108 | par rapport à un solver | par rapport à un solveur | jw. | wysoka | tak |
| 15 | NISKIE | m13-l3-przeglad.md:87 | résultats de solver | résultats de solveur | jw. | wysoka | tak |
| 16 | NISKIE | m13-l1-raport.md:107 | D'où viennent ces principes | D'où viennent ces règles | Ten sam nagłówek pl „Skąd te zasady” w m13-l2:95 i m13-l3:86 (i 14× w korpusie) brzmi „D'où viennent ces règles”. | średnia | tak |
| 17 | NISKIE | m13-l2-powtorki.md:15 | `{{t:flush-draw\|tirage couleur}} par l'as` | `{{t:flush-draw\|tirage couleur}} à l'as` | „draw do koloru z asem” = „tirage couleur à l'as”; „par l'as” nienaturalne. | średnia | tak |
| 18 | NISKIE | m13-l2-powtorki.md:60 | Un des entraîneurs ne regarde | Un des coachs ne regarde | „trener” w korpusie fr to „coach” (42×, m.in. m10-l1:123, źródła reguł R-M13 w `rules.yaml`); „entraîneur” tylko w m13 (4×). | średnia | tak |
| 19 | NISKIE | m13-l2-powtorki.md:93 | Un des entraîneurs conseille | Un des coachs conseille | jw. | średnia | tak |
| 20 | NISKIE | m13-l3-przeglad.md:64 | des conseils d'entraîneurs | des conseils de coachs | jw. | średnia | tak |
| 21 | NISKIE | m13-l3-przeglad.md:87 | des heuristiques d'entraîneurs | des heuristiques de coachs | jw. | średnia | tak |
| 22 | NISKIE | m13-l3-przeglad.md:80 | les tapis | les stacks | pl „stacki”; przyjęta nazwa „stack” (`terms-nazwy.yaml`), w korpusie „les/des stacks” 31× wobec „tapis” 6×; „tapis” w m13-l1 oznacza all-in („partez à tapis”). | średnia | tak |
| 23 | NISKIE | m13-l3-przeglad.md:13 | Pendant une partie en direct | Pendant une partie en live | „gra na żywo” (en: „live game”) to w pokerze „en live”; „en direct” kojarzy się z transmisją. | średnia | tak |
| 24 | NISKIE | m13-l2-powtorki.md (cały plik) | spacja zwykła przed „:”, „?”, „;” i w « » w części linii, nierozdzielająca w 24 liniach | jedna konwencja w pliku | Typografia niespójna w obrębie pliku (np. linia 67 i 69 z U+00A0, linia 13 i 15 ze zwykłą spacją); bez wpływu na sens, do ujednolicenia narzędziem. | wysoka | nie |

## Do sprawdzenia przez człowieka znającego język

- m13-l1-raport.md:105: „après environ {{n:m13.noise.hands.k}} milliers de mains” wyświetli się jako „environ 2,5 milliers de mains”. Zrozumiałe, ale niezgrabne (naturalnie „2 500 mains”); przy znaczniku liczby trudno o lepszą postać bez zmiany klucza. Pewność niska.
- m13-l3-przeglad.md:35, 73: „rywal cię przechytrzył” → „vous a surclassé / vous surclassait”. „Surclasser” to raczej „przewyższyć klasą” niż „przechytrzyć” (en: „outplayed”); możliwe „vous a manœuvré” albo „a mieux joué que vous”. Sens zalecenia bez zmian. Pewność niska.
- m13-l2-powtorki.md:49, 52, 93: „wejść do gry” → „entrer dans le coup” (spójne z m3-l2:22 i m4-l4:61); bez zastrzeżeń, tylko do potwierdzenia, że to przyjęta forma dla VPIP.
- m0-l1-uklady.md:99: „d'abord la plus haute, puis… la suivante” odnosi się gramatycznie do „cartes d'accompagnement”, choć bezpośrednio poprzedza je „les kickers” (rodzaj męski). Poprawne, ewentualnie „le plus haut… le suivant”.

## Uwagi do źródła pl

- m13-l1-raport.md:45 (pl i fr wiernie): „{{t:call}} grane w ok. {{n:range.mixed.low}} przypadków nie schodzi poniżej progu zgodnej ({{n:range.mixed.low}})” — ta sama liczba dwa razy w jednym zdaniu; czytelne, ale wygląda jak powtórzenie.
- Brak innych uwag.

## Ocena ogólna

Przekład czterech lekcji jest wierny: liczby, karty, kolory w przykładach zamiany, poprawne odpowiedzi i uzasadnienia zgadzają się ze źródłem, a wszystkie znaczniki `{{n:…}}` i `{{t:…}}` są na miejscu poza jednym podmienionym kluczem w tabeli rankingu (m0-l1:88). Nazwy stopni oceny i licznik raportu w m13 zgadzają się z interfejsem co do znaku. Główna słabość to nazwy funkcji w m13-l2: „zone” zamiast interfejsowego „domaine” (7 miejsc, poprawki w JSON) i „fiche” wobec „Cartes de révision” w raporcie (do decyzji, najtaniej po stronie interfejsu). Reszta to drobna spójność (solver/solveur, entraîneur/coach, tapis/stack). Znalezisk KRYT i WYS brak.
