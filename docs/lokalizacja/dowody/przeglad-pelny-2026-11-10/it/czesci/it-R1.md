# it-R1 — it (włoski) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `content/it/rules.yaml` ↔ `content/pl/rules.yaml` | tak, linie 1–642 obu plików (nagłówek, R-M0-001 … R-M7-013; wszystkie pola if/then/because/population/source); linie 643+ poza zakresem części |
| `content/it/terms-nazwy.yaml` | tak, całość (terminologia) |
| `content/en/rules.yaml` | tylko punktowo (linie 123, 240, 510, 603, 612) jako pomoc |

Kontrola mechaniczna linii 1–642: zestaw `{{n:…}}` identyczny w każdej linii; klucze `{{t:…}}` identyczne poza linią 537 (it-R1-01); pola `id`, `module`, `level`, `check`, `sources` identyczne ze źródłem.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-R1-01 | ŚR | content/it/rules.yaml:537 | „fai più spesso il {{t:second-barrel\|second barrel}}” | „{{t:bet\|punti}} più spesso il {{t:second-barrel\|second barrel}}” | Zgubiony znacznik terminu `bet`; pl rules.yaml:537 „częściej {{t:bet\|stawiasz}} {{t:second-barrel\|second barrel}}”. W tym samym pliku it:626 i it:636 znacznik zachowany („{{t:bet\|punti}}”, „{{t:bet\|punta}}”). |
| it-R1-02 | ŚR | content/it/rules.yaml:335 | „flop {{t:dry\|asciutto}}” | „flop {{t:dry\|secco}}” | `terms-nazwy.yaml`: dry = „secco”; forma w znaczniku nie jest formą nazwy terminu (pl:335 `{{t:dry}}`). |
| it-R1-03 | ŚR | content/it/rules.yaml:342 | „definizione di flop {{t:dry\|asciutto}}” | „definizione di flop {{t:dry\|secco}}” | jw. (pl:342) |
| it-R1-04 | ŚR | content/it/rules.yaml:383 | „il flop è {{t:dry\|asciutto}} e alto” | „il flop è {{t:dry\|secco}} e alto” | jw. (pl:383) |
| it-R1-05 | ŚR | content/it/rules.yaml:494 | „sui flop {{t:dry\|asciutti}} con un re” | „sui flop {{t:dry\|secchi}} con un re” | jw. (pl:494) |
| it-R1-06 | ŚR | content/it/rules.yaml:240 | „le soluzioni dei solver pubblicate qui difendono circa” | „le soluzioni dei solver pubblicate difendono qui circa” | „pubblicate qui” czyta się „opublikowane tutaj”; pl:240 „opublikowane rozwiązania solverów bronią tu” („tu” = w tym spocie; en: „defend about … of hands here”). |
| it-R1-07 | ŚR | content/it/rules.yaml:323 | „la soluzione del solver pubblicata qui difende circa” | „la soluzione del solver pubblicata difende qui circa” | jak it-R1-06; pl:323 „opublikowane rozwiązanie solvera broni tu”. |
| it-R1-08 | NISKIE | content/it/rules.yaml:123 | „apri più largo di tutte le {{t:position\|posizioni}} prima dei blind” | „apri più largo che da tutte le altre {{t:position\|posizioni}} prima dei blind” | Niegramatyczne porównanie („szerzej niż wszystkie pozycje”); pl:123 „otwierasz najszerzej ze wszystkich pozycji przed blindami”. Sens zachowany. |
| it-R1-09 | NISKIE | content/it/rules.yaml:527 | „quindi perde meno quando i {{t:fold\|fold}} mancano” | „quindi è quello che perde meno quando i {{t:fold\|fold}} mancano” | pl:527 „więc traci najmniej, gdy pasów brakuje” (stopień najwyższy oddany wyższym). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- Kierunek it-R1-02…05: `terms-nazwy.yaml` (dry: „secco”) ma dopisek [WIELE FORM] [DO USTALENIA] i wzmiankę, że `terms-def` używa „asciutto”; w całym `content/it/rules.yaml` jest konsekwentnie „asciutto” (także w polu `source` linii 338: „flop asciutto”, „flop asciutti”, „confine asciutto/intermedio” — bez poprawki, pole niewidoczne w aplikacji). Jeśli decyzją będzie „asciutto”, poprawić należy `terms-nazwy.yaml`, a poprawki 02–05 odrzucić.
- it:603 „il tuo {{t:draw|progetto}} è alla mano migliore” (pl:603 „masz draw do najlepszej ręki”): zrozumiałe, ale mało naturalne; możliwe „hai un progetto per la mano migliore”.
- it:612 „proprio allora paghi di più” (pl:612 „wtedy płacisz najwięcej”, en „you pay the most”): stopień najwyższy oddany wyższym; sens kierunkowo zachowany.
- it:510 „favorevoli a chi ha rilanciato preflop” (pl:510 „dobrych dla przebijającego”): dopisane „preflop”, zgodne z en („good for the preflop raiser”) — uznane za poprawne doprecyzowanie.
- Komentarze YAML w liniach 1–17, 208, 329–331, 440–441, 532–533, 641–642 zostały po polsku (identyczne ze źródłem); nie są treścią aplikacji.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny i naturalny: liczby, przedziały, kierunki zaleceń, pozycje i ręce zgodne ze źródłem we wszystkich regułach R-M0–R-M7; nie znaleziono błędów KRYT ani WYS. Znaczniki `{{n:…}}` nienaruszone, a `{{t:…}}` mają poprawne klucze poza jednym zgubionym `bet` (linia 537). Jedyny wzorzec terminologiczny to „asciutto” zamiast „secco” z `terms-nazwy.yaml` (4 widoczne wystąpienia). Powtarza się też szyk „pubblicata/e qui”, który zmienia odniesienie „tu” z sytuacji przy stole na miejsce publikacji. Forma zwracania się (2. os. lp.) i terminy fold/call/raise/piatto/progetto są spójne.
