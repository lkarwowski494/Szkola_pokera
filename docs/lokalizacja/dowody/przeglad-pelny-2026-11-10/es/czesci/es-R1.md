# es-R1 — es (hiszpański) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `content/es/rules.yaml`, reguły R-M0-001 – R-M7-013 (nagłówek + 86 reguł) ↔ `content/pl/rules.yaml` | tak, linie 1–642 w obu plikach (granica: `id: R-M8-001` w linii 643 w pl, es i en); pola if/then/because/population/source porównane pole po polu; dodatkowo skryptem porównane linia w linię zestawy `{{n:…}}`, klucze `{{t:…}}`, adresy URL, liczby poza znacznikami i pola strukturalne (id, module, level, check, sources) — bez różnic |
| `content/es/rules.yaml`, linie 643–1207 (R-M8 i dalej) | nie — poza zakresem tej części (inny recenzent) |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-R1-01 | ŚR | content/es/rules.yaml:384 | `el solver también usa la {{t:overbet\|sobreapuesta}}` | `el solver también usa el {{t:overbet\|overbet}}` | R-M5-007 then; pl `content/pl/rules.yaml:384` „używa też {{t:overbet\|overbetu}}”. `terms-nazwy.yaml`: overbet → „overbet” (rodzaj męski); „sobreapuesta” to inna nazwa terminu (forma musi być formą tego samego terminu). |
| es-R1-02 | NISKIE | content/es/rules.yaml:473 | `los jugadores recreacionales pasivos` | `los jugadores recreativos pasivos` | R-M6-004 source; pl `content/pl/rules.yaml:473` „pasywni gracze rekreacyjni”. Ten sam termin w tej samej regule (pole population, linia 472) i w `terms-nazwy.yaml` to „jugador recreativo”. Pole source nie jest pokazywane w aplikacji, stąd niska waga. |
| es-R1-03 | NISKIE | content/es/rules.yaml:260 | `los conectores suited normalmente los igualas` | `los conectores del mismo palo normalmente los igualas` | R-M4-006 source; pl `content/pl/rules.yaml:260` „konektory w kolorze zwykle sprawdzasz”. W całym pliku „w kolorze” = „del mismo palo” (tak też `terms-nazwy.yaml`: suited); tu jedyny raz anglicyzm w tekście hiszpańskim. Pole source, niska waga. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- **`{{t:top-pair|pareja mayor}}` / `{{t:top-pair|parejas mayores}}`** (linie 502 i 552 w tej części; także 760, 762, 801, 817 w drugiej połowie pliku): `terms-nazwy.yaml` podaje dla `top-pair` nazwę „top pair”, a plik konsekwentnie używa „pareja mayor” (komentarz w terms-nazwy wymienia ją jako synonim ze źródła: „top pair (pareja mayor)”). Formalnie forma nie jest formą nazwy ze słownika, ale w pliku jest spójna; poprawka tylko w mojej połowie rozbiłaby spójność, więc decyzja (zmienić wszystkie 7 wystąpień albo dopuścić „pareja mayor”) należy do koordynatora. Bez poprawki w JSON.
- **„Button”** (bez znacznika, np. linie 122, 139, 166, 229): `terms-nazwy.yaml` ma `button: "botón"`, plik konsekwentnie pisze „el Button” (pl też „Button” bez znacznika). Spójne w pliku; do decyzji, czy nazwa pozycji ma zostać angielska.
- **„completar” dla limpu z dowolnej pozycji** (linie 149, 192, 304, 314, 317): pl „dopłacasz samego blinda” / „wyrównało {{t:big-blind}} (limp)”. W hiszpańskim „completar” zwykle dotyczy małego blinda; dla limpu spoza blindów naturalniejsze byłoby „igualar la ciega grande” / „hacer limp”. Sens zachowany dzięki dopiskowi „(limp)”.
- **Linia 123** (R-M3-001): pl „tylko {{t:small-blind}} otwiera podobnie szeroko” → „abre de forma parecida” — zgubione „szeroko”, sens z kontekstu czytelny.
- **Linia 417** (R-M5-011): „sin ninguna mano” (pl „bez żadnej ręki”) — lekka kalka; naturalniej „sin nada”. Styl.
- Komentarze YAML (linie 1–17, 208, 329–331, 440–441, 532–533, 641–642) są w es po polsku, identyczne z pl — komentarze nie trafiają do aplikacji, nie zgłaszam.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład tej połowy jest bardzo dobry: żadnej zmiany liczby, kierunku zalecenia, pozycji ani zagrania; wszystkie znaczniki `{{n:…}}` i klucze `{{t:…}}` zgodne ze źródłem linia w linię, cytaty i adresy w polach source nienaruszone. Hiszpański naturalny, konsekwentne „tú”, wariant europejski/neutralny (bote, farol, ligar) bez mieszania. Jedyny powtarzający się wzorzec to formy terminów odbiegające od `terms-nazwy.yaml` (overbet → „sobreapuesta”, top-pair → „pareja mayor”) oraz dwa drobne odstępstwa terminologiczne w polach source.
