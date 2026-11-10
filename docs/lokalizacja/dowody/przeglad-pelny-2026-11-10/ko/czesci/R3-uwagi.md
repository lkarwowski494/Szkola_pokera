# ko · R3 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/rules.yaml, linie 643–952 (R-M8-001…R-M10-015) wobec content/pl/rules.yaml 643–952 | Tak, cały fragment, linia po linii (if/then/because/source/population) | Poza zakresem linii nie czytano. `en` otwarte pomocniczo tylko dla R-M8-003 (then). Dodatkowo kontrola skryptem: klucze `{{n:}}` i `{{t:}}` w każdej linii identyczne z pl (0 różnic); pola nieprzekładalne (id, module, level, sources, adresy) identyczne z pl; formy w `{{t:klucz|forma}}` porównane z terms-nazwy (5 niezgodności, wszystkie w R3.json). |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| — | — | Brak. Nie znaleziono błędów sensu (liczby, kierunki, progi, zagrania, pozycje zgodne z pl). | — |

## Do ujednolicenia skryptem
- Brak wzorców powyżej ok. 10 trafień w tym fragmencie. Uwaga dla całego pliku: „닛” → „니트” (nit), „투페어” → „투 페어” (two-pair), „레이크 상한” → „레이크 캡” (rake-cap) mogą występować także poza liniami 643–952 i w lekcjach/egzaminach m9–m10; przy zamianie „닛” trzeba poprawić partykułę (닛은→니트는, 닛이→니트가, 닛을→니트를).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- 839: pl „błąd takiej średniej maleje dopiero z pierwiastkiem z liczby okazji” → „기회 수의 제곱근에 비례해서만 줄어듭니다”. Sens zrozumiały, ale ściślej byłoby „제곱근에 반비례해서만 줄어듭니다” (błąd jest odwrotnie proporcjonalny do pierwiastka).
- 753, 762, 770: „{{t:spr|SPR}} {{n:spr.commit}}이면 / …에서는” — po liczbie 2 („이”) naturalniejsze „2면”; partykuły po `{{n:}}` zależą od wyrenderowanej liczby (także „{{n:spr.srp}}이면”), do oceny po wyrenderowaniu.
- Partykuły po „VPIP” (는/와/가, np. 830, 846, 861): poprawne przy czytaniu literami („브이피아이피”); przy czytaniu „브이핍” byłoby 은/과/이. Do ujednolicenia z resztą treści.
- 794, 810: „{{t:pot|팟}}의 약 {{n:geo.srp.3}}로” — liczba renderuje się z jednostką „x” (np. 1.26x); konstrukcja „팟의 약 1.26x로” wierna pl („ok. … puli”), ale warto obejrzeć na ekranie.
- 849: „같은 단계의 상충” (pl „sprzeczność na tym samym szczeblu”) — zrozumiałe w polu source, termin metodologiczny, bez wzorca w glosariuszu.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- Nie dotyczy: fragment obejmuje R-M8…R-M10; linia 952 to tylko polski komentarz nagłówka M12 (identyczny w pl i ko, nieprzekładany komentarz YAML).
