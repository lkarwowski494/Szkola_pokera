# de-L2: niemiecki (de), lekcje m4-l1…m4-l4 i egzamin m4

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m4-l1-3bet.md | tak | 105 |
| content/de/lessons/m4-l2-obrona-bb.md | tak | 93 |
| content/de/lessons/m4-l3-wobec-3betu.md | tak | 112 |
| content/de/lessons/m4-l4-limperzy.md | tak | 75 |
| content/de/exams/m4.yaml | tak | 111 |

Każdy plik czytany obok `content/pl/…` linia po linii; terminologia względem `content/de/terms-nazwy.yaml`; zapis liczb sprawdzony w `tools/content-build/src/numbers.ts` (mnożnik „3x”, stosunek bez jednostki).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | content/de/lessons/m4-l1-3bet.md:97 | `(hauptsächlich aus sehr starken` | `(hauptsächlich bestehend aus sehr starken` | brak imiesłowu (pl „złożonym głównie z”); nawias bez czasownika jest eliptyczny obok „(von den stärksten Händen abwärts aufgebaut)” | wysoka | tak |
| 2 | ŚR | content/de/lessons/m4-l2-obrona-bb.md:73 | `Gesuitete Hände` | `Suited Hände` | termin „suited” (terms-nazwy: suited; l1, l3, l4 piszą „suited”), tu „gesuitet”: niespójne | wysoka | tak |
| 3 | ŚR | content/de/lessons/m4-l2-obrona-bb.md:92 | `und gesuitete {{t:connectors\|Connectors}}. Mittlere` | `und suited {{t:connectors\|Connectors}}. Mittlere` | termin „suited” (terms-nazwy: suited; l1, l3, l4 piszą „suited”), tu „gesuitet”: niespójne | wysoka | tak |
| 4 | ŚR | content/de/lessons/m4-l2-obrona-bb.md:92 | `sowie gesuitete {{t:connectors\|Connectors}}` | `sowie suited {{t:connectors\|Connectors}}` | termin „suited” (terms-nazwy: suited; l1, l3, l4 piszą „suited”), tu „gesuitet”: niespójne | wysoka | tak |
| 5 | NISKIE | content/de/lessons/m4-l2-obrona-bb.md:46 | `Du verlierst Wert` | `Du verlierst Value` | pl „wartość” = termin value (terms-nazwy: Value; l3:58 „weder Value”, egzamin q9 „verschenkt Value”); „Wert” niespójne | średnia | tak |
| 6 | NISKIE | content/de/lessons/m4-l3-wobec-3betu.md:37 | `{{t:initiative\|Initiative}} und Wert` | `{{t:initiative\|Initiative}} und Value` | pl „wartość” = termin value (terms-nazwy: Value); „Wert” niespójne z resztą | średnia | tak |
| 7 | ŚR | content/de/lessons/m4-l3-wobec-3betu.md:46 | `{{t:straight\|Straights}}` | `{{t:straight\|Straßen}}` | termin straight: terms-nazwy „Straße”, l1 „eine Straße”; tu „Straight”: niespójne | wysoka | tak |
| 8 | ŚR | content/de/lessons/m4-l3-wobec-3betu.md:112 | `einen {{t:straight\|Straight}}` | `eine {{t:straight\|Straße}}` | termin straight: terms-nazwy „Straße”, l1 „eine Straße”; tu „Straight”: niespójne | wysoka | tak |
| 9 | NISKIE | content/de/exams/m4.yaml:12 | `Die größere Größe` | `Die größere Size` | niezręczne powtórzenie „größere Größe”; l1:26 w tym samym zdaniu ma „Die größere Size” | wysoka | tak |
| 10 | ŚR | content/de/exams/m4.yaml:12 | `also {{t:raise\|erhöhst}} du auf etwa` | `also {{t:raise\|raist}} du auf etwa` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 11 | ŚR | content/de/exams/m4.yaml:13 | `{{t:raise\|erhöhst}} du auf {{n:pf.3bet.oop-total}}` | `{{t:raise\|raist}} du auf {{n:pf.3bet.oop-total}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 12 | ŚR | content/de/exams/m4.yaml:14 | `noch {{t:raise\|erhöhen}}` | `noch {{t:raise\|raisen}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 13 | ŚR | content/de/exams/m4.yaml:53 | `{{t:raise\|erhöht}} er weniger` | `{{t:raise\|raist}} er kleiner` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie (l2:92 „raist du kleiner”) | wysoka | tak |
| 14 | ŚR | content/de/exams/m4.yaml:68 | `der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise\|erhöht}}` | `der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise\|geraist}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 15 | ŚR | content/de/exams/m4.yaml:78 | `{{n:pf.3bet.oop-total}} {{t:raise\|erhöht}}` | `{{n:pf.3bet.oop-total}} {{t:raise\|geraist}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 16 | ŚR | content/de/exams/m4.yaml:88 | `der {{t:cutoff\|CO}} hat auf {{n:pf.3bet.ip-total}} {{t:raise\|erhöht}}` | `der {{t:cutoff\|CO}} hat auf {{n:pf.3bet.ip-total}} {{t:raise\|geraist}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 17 | ŚR | content/de/exams/m4.yaml:98 | `{{t:raise\|erhöhst}} du? Gib` | `{{t:raise\|raist}} du? Gib` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 18 | ŚR | content/de/exams/m4.yaml:109 | `{{n:exam.m4.iso.three}} {{t:raise\|erhöhen}}` | `{{n:exam.m4.iso.three}} {{t:raise\|raisen}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 19 | ŚR | content/de/exams/m4.yaml:109 | `Limper {{t:raise\|erhöhst}} du vor allem` | `Limper {{t:raise\|raist}} du vor allem` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 20 | ŚR | content/de/exams/m4.yaml:110 | `{{n:pf.iso.one-limper}} {{t:raise\|erhöhen}}` | `{{n:pf.iso.one-limper}} {{t:raise\|raisen}}` | forma terminu raise: w lekcjach m4 wszędzie „raisen/raist”, w egzaminie „erhöhen”: jedna nazwa na jedno pojęcie | wysoka | tak |
| 21 | ŚR | content/de/exams/m4.yaml:33 | `A9 in verschiedenen Farben` | `A9 offsuit` | termin „offsuit” (terms-nazwy; lekcje m4: „offsuit”, zapis rąk AJo–A9o), tu opisowo „in verschiedenen Farben”: niespójne | wysoka | tak |
| 22 | ŚR | content/de/exams/m4.yaml:33 | `Asse in verschiedenen Farben (AJo–A9o)` | `Offsuit-Asse (AJo–A9o)` | termin „offsuit” (terms-nazwy; lekcje m4: „offsuit”, zapis rąk AJo–A9o), tu opisowo „in verschiedenen Farben”: niespójne | wysoka | tak |
| 23 | ŚR | content/de/exams/m4.yaml:71 | `AT in verschiedenen Farben ist` | `AT offsuit ist` | termin „offsuit” (terms-nazwy; lekcje m4: „offsuit”, zapis rąk AJo–A9o), tu opisowo „in verschiedenen Farben”: niespójne | wysoka | tak |
| 24 | NISKIE | content/de/exams/m4.yaml:23 | `Ein 3-Bet gibt dir` | `Eine 3-Bet gibt dir` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 25 | NISKIE | content/de/exams/m4.yaml:29 | `ein typisches 3-Bet` | `eine typische 3-Bet` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 26 | NISKIE | content/de/exams/m4.yaml:34 | `und ein 3-Bet mit ihnen verträgt ein 4-Bet schlecht` | `und eine 3-Bet mit ihnen verträgt eine 4-Bet schlecht` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 27 | NISKIE | content/de/exams/m4.yaml:52 | `also beträgt das 3-Bet etwa` | `also beträgt die 3-Bet etwa` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 28 | NISKIE | content/de/exams/m4.yaml:54 | `ist ein 3-Bet gegen eine` | `ist eine 3-Bet gegen eine` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 29 | NISKIE | content/de/exams/m4.yaml:59 | `Du bekommst ein 3-Bet von` | `Du bekommst eine 3-Bet von` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 30 | NISKIE | content/de/exams/m4.yaml:61 | `würde das 3-Bet des Gegners` | `würde die 3-Bet des Gegners` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 31 | NISKIE | content/de/exams/m4.yaml:71 | `du gegen ein 3-Bet.` | `du gegen eine 3-Bet.` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 32 | NISKIE | content/de/exams/m4.yaml:73 | `Ein 4-Bet {{t:value\|für Value}} spielst du meist mit AA, KK und AK. ATo` | `Eine 4-Bet {{t:value\|für Value}} spielst du meist mit AA, KK und AK. ATo` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 33 | NISKIE | content/de/exams/m4.yaml:83 | `Ein 4-Bet {{t:value\|für Value}} spielst du meist mit AA, KK und AK. 99` | `Eine 4-Bet {{t:value\|für Value}} spielst du meist mit AA, KK und AK. 99` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 34 | NISKIE | content/de/exams/m4.yaml:91 | `beträgt das 4-Bet etwa` | `beträgt die 4-Bet etwa` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 35 | NISKIE | content/de/exams/m4.yaml:91 | `des 3-Bets: ` | `der 3-Bet: ` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 36 | NISKIE | content/de/exams/m4.yaml:93 | `ein normales 4-Bet bezahlen` | `eine normale 4-Bet bezahlen` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 37 | NISKIE | content/de/exams/m4.yaml:93 | `Nach einem 4-Bet von etwa` | `Nach einer 4-Bet von etwa` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 38 | NISKIE | content/de/exams/m4.yaml:93 | `des 3-Bets bringst` | `der 3-Bet bringst` | rodzaj gramatyczny: 3-Bet/4-Bet są żeńskie (terms-nazwy: r. f; lekcje m4: „eine 3-Bet”), tu rodzaj nijaki | wysoka | tak |
| 39 | ŚR | lekcje m4 i egzamin (całość) | `{{t:open\|Eröffnung}}` (l1, egzamin) / `{{t:open\|Open}}`, `des {{t:open\|Opens}}` (l2, l3, l4) | jedna forma rzeczownika w całym module | rzeczownik dla open ma dwie nazwy w jednym module (np. l1:16 „3x der Eröffnung”, l2:44 „3x des Opens”); wybór dotyczy całego korpusu (terms-nazwy: Open, oznaczone WIELE FORM) | wysoka | nie |
| 40 | ŚR | l1–l3, egzamin vs l4:36, l4:37, l4:69 | `{{t:out-of-position\|Ohne Position}}` / `{{t:out-of-position\|Out of Position}}` | jedna forma | out-of-position ma dwie nazwy w module (l4 „Out of Position”, reszta „ohne Position”; znacznik bez formy daje „out of Position”); wybór korpusowy (terms-nazwy: WIELE FORM) | wysoka | nie |
| 41 | NISKIE | l3:28, l3:78, l3:112, l4:28, l4:58, l4:59, l4:73 vs l1:99, l2:92, egzamin | `{{t:value\|auf Value}}` / `{{t:value\|für Value}}` | jedna forma | „dla wartości” oddane dwojako w jednym module; wybór korpusowy | wysoka | nie |
| 42 | NISKIE | l1:26, l1:27, l1:75 vs l2:45, l4, egzamin | `Size` / `Größe` | jedna nazwa | rozmiar zakładu raz „Size”, raz „Größe” (termin bez klucza); wybór korpusowy | średnia | nie |
| 43 | NISKIE | l2:46, l2:47, egzamin (opcje) vs l1, l3, l4 | `Callen` / `Ich calle` | jedna konwencja | tekst opcji odpowiedzi raz w bezokoliczniku, raz w 1. osobie (pl zawsze 1. osoba: „Sprawdzam”, „Pasuję”); bez wpływu na sens | wysoka | nie |

Nie znaleziono błędów sensu: liczby, ręce, zakresy, pozycje, kierunki zaleceń, poprawne odpowiedzi (także podwójne `correct: true` w m4.l3.q-qq i m4.l4.q-many oraz `sizeError`) i klucze znaczników `{{t:…}}` / `{{n:…}}` zgadzają się ze źródłem w każdej linii. Różnice typu `{{t:fold}}` (pl) → `{{t:fold|Fold}}` (de) zachowują klucz.

## Do sprawdzenia przez człowieka znającego język

- l1:93 „callt der Small Blind gegen den Button fast nichts” (pl „prawie nic nie sprawdza”): naturalniej „fast nie”; zrozumiałe, bez poprawki.
- l3:98 „riskiert er so viel, um … zu gewinnen” (pl „ryzykuje tyle, żeby wygrać”): dosłowne, lekko niezręczne („riskiert er diesen Betrag”); sens zachowany.
- l3:104 „suited hohe Karten” — szyk; częściej „hohe suited Karten”.
- l3:67, l4:58, l4:75 „Spielzug/Spielzüge” dla „zagranie”: poprawne, ale w pokerze częściej „Play” albo „Spielweise”.
- egzamin:73 „die es callen” (zaimek do ATo; w l3:78 „die Hand”).
- egzamin:24, 82 „Zu eng” vs lekcje „Zu tight”; egzamin:33 „schließt die Aktion ab” vs l1:99 „schließt die Action”; egzamin:106 „bezahlt” i 111 „Mitlimpen” vs l4 „gecallt”, „Ich calle” — drobne różnice stylu między egzaminem a lekcjami.

## Uwagi do źródła pl

- m4-l2:92 „3-bet i {{t:call}} są ze sobą powiązane” — z kontekstu („siatki pokazują, czym się bronić, a nie jak”) i z en („are combined”) wynika „połączone / pokazane razem”; de „zusammengefasst” oddaje zamierzony sens, pl jest nieprecyzyjne.

## Ocena ogólna

Przekład lekcji m4 i egzaminu jest merytorycznie wierny: nie znaleziono żadnego błędu KRYT ani WYS, wszystkie liczby, ręce, kierunki zaleceń i znaczniki zgadzają się ze źródłem. Słabością jest spójność między plikami: egzamin wyraźnie pochodzi z innego przebiegu tłumaczenia niż lekcje (raise = „erhöhen” zamiast „raisen”, „das 3-Bet” zamiast „die 3-Bet”, „in verschiedenen Farben” zamiast „offsuit”), a lekcje różnią się między sobą formami open („Eröffnung”/„Open”), out-of-position i value. Język jest naturalny i poprawny; poprawki JSON (38) dotyczą wyłącznie ujednolicenia terminów i rodzaju gramatycznego.
