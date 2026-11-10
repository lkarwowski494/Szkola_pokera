# es-R2 — es — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/rules.yaml (R-M8-001 … R-M13-008; źródło content/pl/rules.yaml) | tak, linie 643–1207 (do końca pliku); wszystkie pola if/then/because/source/population porównane z pl; pierwsza połowa (1–642) poza zakresem tej części |

Dodatkowo skryptem porównano linia po linii (643–1207) zestawy `{{n:…}}`, klucze `{{t:klucz}}`, adresy URL, liczby poza znacznikami, klucze YAML i pola `id/module/level/sources`: bez różnic (jedyna różnica liczb to zapis daty 5.10.2026 → 5/10/2026).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-R2-01 | ŚR | content/es/rules.yaml:857 | «jugadores recreacionales 42/18» | «jugadores recreativos 42/18» | Niespójny termin: `recreational` = «jugador recreativo» (terms-nazwy.yaml:160), tak w regułach R-M10-005/006/011 i w lekcjach (0 × «recreacional»). pl rules.yaml:857 „gracze rekreacyjni”. |
| es-R2-02 | ŚR | content/es/rules.yaml:874 | «y los jugadores recreacionales 32%» | «y los jugadores recreativos 32%» | Jak wyżej; w tej samej regule (linia 873, population) jest «jugadores recreativos». pl rules.yaml:874. |
| es-R2-03 | ŚR | content/es/rules.yaml:1003 | «solo piensas en recuperarte o juegas» | «solo piensas en recuperar lo perdido o juegas» | R-M12-007 (treść krytyczna): pl rules.yaml:1003 „myślisz tylko o odegraniu się” (en: „winning it back”) = odzyskanie strat; «recuperarte» czyta się też jako „dojść do siebie”, co zaciera sygnał ostrzegawczy. Lekcje es używają «recuperar lo perdido» (7 ×). Sens nieodwrócony, liczby i granice bez zmian. |
| es-R2-04 | ŚR | content/es/rules.yaml:1164 | «por eso la repetición de partida muestra» | «por eso el repaso de tus partidas muestra» | pl rules.yaml:1164 „powtórka z gry” to nazwa funkcji aplikacji; w es lekcja m13-l2 („Repasos de tus partidas”) i interfejs („Repasos”) nazywają ją «repaso»; «repetición de partida» nie występuje nigdzie indziej i sugeruje powtórzenie rozgrywki. |

## Źródło (błędy w pl, bez poprawki)
- Brak błędów treści. Uwaga porządkowa (nie błąd przekładu): R-M11-010, pl rules.yaml:1122–1123: pole `source` cytuje cztery źródła (w tym Big Stack Advantage, upswingpoker.com/big-stack-advantage-stone-bubble/), a lista `sources` ma trzy wpisy; es wiernie to powtarza.

## Do sprawdzenia (pewność ≤ 80%)
- content/es/rules.yaml:473 (poza zakresem tej części, pierwsza połowa): trzecie wystąpienie «recreacionales» — ten sam wzorzec co es-R2-01/02; do poprawienia przez recenzenta pierwszej połowy.
- Formy w znacznikach różne od nazwy w terms-nazwy.yaml: `{{t:top-pair|pareja mayor}}` (linie 760, 762, 801, 817; nazwa: «top pair»), `{{t:overpair|sobrepareja}}` (801; nazwa: «overpair»), `{{t:blocker|bloqueadores}}` (734; nazwa: «blocker»). W całej treści es (lekcje, egzaminy) te formy są stosowane konsekwentnie (pareja mayor 67 ×, sobrepareja 8 ×, bloqueador 19 ×), więc nie zgłaszam jako znaleziska; ewentualne ujednolicenie z nazwą to decyzja globalna, nie poprawka w tym pliku.
- content/es/rules.yaml:1005 (R-M12-007): „skończyć wcześniej, zanim stracisz…” oddane jako «parar a tiempo, antes de perder…» (źródłowy cytat: „quit sooner”); sens zalecenia zachowany, różnica stylistyczna.
- content/es/rules.yaml:880 (R-M10-007): pl „a gdy sam broni blindów wąsko” oddane przyczynowo «y como defiende sus ciegas con un rango estrecho» (pl: warunek „gdy”); kierunek zalecenia bez zmian.
- content/es/rules.yaml:1048 (R-M11-001): „fold po przebiciu” oddane «retirarte ante una subida» (dokładniej: resubida); termin `raise` = «subida», więc zgodne z terminologią.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład drugiej połowy jest bardzo wierny: liczby, zakresy, kierunki zaleceń (w tym „como muy tarde / como muy pronto” w R-M12-011), wzory i wszystkie znaczniki zgodne ze źródłem; reguły R-M12-* kompletne i bez zmiany sensu ani granic. Język naturalny, europejski hiszpański, konsekwentne „tú”; cudzysłowy «» i format dat spójne. Jedyne powtarzające się usterki to niespójności nazw (recreacional/recreativo, nazwa funkcji powtórek) oraz jedno dwuznaczne sformułowanie w R-M12-007. Brak znalezisk KRYT i WYS.
