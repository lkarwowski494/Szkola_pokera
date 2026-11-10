# it-R2 — włoski (it) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `content/it/rules.yaml` (źródło `content/pl/rules.yaml`, pomoc `content/en/rules.yaml` punktowo) | tak, zakres zlecony: linie 643–1207 (do końca pliku); reguły R-M8-001…012, R-M9-001…010, R-M10-001…015, R-M12-001…009, 011, 012, R-M11-001…012, R-M13-001…008; pola if/then/because/source/population. Linie 1–642 poza zakresem (inny recenzent). |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-R2-01 | ŚR | content/it/rules.yaml:862 | `{{t:maniac\|maniaco}}` | `{{t:maniac\|maniac}}` | Nazwa terminu w `content/it/terms-nazwy.yaml` to „maniac”; „maniaco” to inna nazwa tego samego pojęcia (pl content/pl/rules.yaml:862 `{{t:maniac\|maniak}}`). |
| it-R2-02 | ŚR | content/it/rules.yaml:887 | `contro un {{t:maniac\|maniaco}}` | `contro un {{t:maniac\|maniac}}` | Jak it-R2-01 (pl content/pl/rules.yaml:887). |
| it-R2-03 | ŚR | content/it/rules.yaml:892 | `maniaco «Trap with premium hands` | `maniac «Trap with premium hands` | Jak it-R2-01, tekst bez znacznika w polu source (pl content/pl/rules.yaml:892 „maniak”). |
| it-R2-04 | ŚR | content/it/rules.yaml:1164 | `il replay del gioco mostra` | `il ripasso dal gioco mostra` | „powtórka z gry” (pl content/pl/rules.yaml:1164) to nazwa funkcji aplikacji; lekcja `content/it/lessons/m13-l2-powtorki.md:5` nazywa ją „Ripassi dal gioco”. „Replay del gioco” to inna nazwa i sugeruje odtworzenie rozdania. |
| it-R2-05 | NISKIE | content/it/rules.yaml:996 | `un respiro profondo e una frase preparata` | `un respiro e una frase preparata` | Dodane „profondo”; źródło ma „oddech” (pl content/pl/rules.yaml:996; en „a breath”). Reguła R-M12-006 (treść krytyczna), sens zalecenia bez zmiany. |

## Źródło (błędy w pl, bez poprawki)
Brak. (Numeracja R-M12 przeskakuje z 009 na 011 tak samo w pl, en i it; to nie różnica przekładu.)

## Do sprawdzenia (pewność ≤ 80%)
- Rodzaj „value bet”: `content/it/rules.yaml:649` „un value bet”, `:871` i `:874` „del value bet” (rodzaj męski), a `terms-nazwy.yaml` podaje dla `value-bet` rodzaj żeński („una value bet”). W tych miejscach nie ma znacznika, więc konfliktu technicznego nie ma; do ujednolicenia w skali całego języka.
- Rodzajnik przed procentem ze znacznika: w całym pliku (także w pierwszej połowie, 33× „circa {{n:…}}”) wartości procentowe stoją bez rodzajnika („circa {{n:…}} delle mani”, „più di {{n:…}} delle mani”, „con circa {{n:var.conf95}} di confidenza”), a włoski wymaga „circa il 14%”, „più del 50%”, „l'80%”. Rodzajnik zależy od liczby (il/l'), więc poprawka statyczna jest ryzykowna; decyzja systemowa (formatowanie liczb dla it).
- `content/it/rules.yaml:662` „con la {{t:position|posizione}} raramente scendi sotto 1/2” za pl „z {{t:position|pozycji}}” (en „with position”): zrozumiałe, ale naturalniej „in posizione”; forma znacznika musiałaby zostać formą terminu `position`.
- `content/it/rules.yaml:1037` „all'inizio hai più da recuperare” za pl „masz najwięcej do nadrobienia” (stopień najwyższy osłabiony do wyższego; sens zalecenia bez zmiany).
- `content/it/rules.yaml:1048` „l'all-in spreme dall'avversario il massimo dei fold” za pl „all-in wyciska z nich [żetonów] najwięcej pasów rywala”: odniesienie przesunięte z żetonów na rywala, sens praktyczny ten sam.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład drugiej połowy jest wierny: wszystkie liczby, zakresy, kierunki zaleceń i przeczenia zgodne ze źródłem, znaczniki `{{n:…}}` i `{{t:…}}` kompletne i z niezmienionymi kluczami, cytaty i adresy w polach source nienaruszone. Reguły R-M12-* (wariancja, tilt, bankroll, zejście o limit „al più tardi” / powrót „non prima”) są kompletne i bez zmiany sensu; jedyne znalezisko tam to drobny dodatek stylistyczny. Powtarzające się wzorce: „maniaco” zamiast nazwy terminu „maniac” oraz brak rodzajnika przed procentami ze znaczników (wzorzec całego pliku). Terminologia poza tym spójna z `terms-nazwy.yaml` (piatto, puntata, rilancio, limite, fiches, premi, bolla, tetto del rake).
