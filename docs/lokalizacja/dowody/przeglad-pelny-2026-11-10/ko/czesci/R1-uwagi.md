# ko · R1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/rules.yaml, linie 1–331 (nagłówek, R-M0…R-M4) | tak, pl i ko linia po linii (pola if/then/because/source) | Dodatkowo kontrola skryptem: zestaw znaczników `{{t:…}}` i `{{n:…}}` w każdej linii pl vs ko, adresy URL, liczby poza znacznikami, pola nieprzekładalne (id, module, level, check, sources) identyczne z pl. Jedyna różnica znaczników: linia 213. Komentarze YAML (1–17, 208, 329–331) zostają po polsku w obu plikach, nie są wyświetlane. `content/ko/terms-nazwy.yaml` przeczytany w całości; glosariusz `docs/lokalizacja/glosariusz.md` nie był otwierany (terminy sprawdzone wobec terms-nazwy). Wersja en nie była potrzebna. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| — | — | brak | — |

## Do ujednolicenia skryptem
- `프리플랍` → `프리플롭` (terms-nazwy: preflop = „프리플롭”): w liniach 1–331 pliku `content/ko/rules.yaml` 13 linii z „프리플랍”, wszystkie w polu `source` (opis źródeł, np. „프리플랍 차트 사이트”, „프로젝트의 프리플랍 솔버”); w polach if/then/because jest poprawnie „프리플롭” (linia 315). W całym pliku `grep -c` daje 13 linii z „프리플랍” i 12 z „프리플롭”. Waga NISKIE (pole source wg nagłówka zostaje w repozytorium), ale warto ujednolicić jednym przebiegiem.
- `{{t:two-pair|투페어}}` → `{{t:two-pair|투 페어}}`: w całym pliku 5 linii z „투페어” (`grep -c`), w zakresie R1 tylko linia 29 (poprawka w R1.json); pozostałe poza zakresem tej części.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- Linia 266 (R-M4-007 because): pl „pasujesz tuż poniżej tego progu” → „이 기준 바로 아래로 폴드합니다”. Sens zachowany, ale „기준 아래로 폴드” może być mało czytelne; ewentualnie „폴드 빈도를 이 기준 바로 아래로 유지합니다”.
- Linia 313 (R-M4-013 if): pl „przed tobą limpuje więcej graczy” (stopień wyższy: im więcej limperów) → „앞에서 여러 명이 림프했을 때” („kilku”). Wniosek reguły ten sam; ewentualnie „앞에서 림프한 플레이어가 더 많을 때”.
- Linie 132 i 203 (R-M3-002, R-M3-010 because): pl „ktoś częściej ma lepszą rękę” → „가능성이 높습니다” / „가진 경우가 많습니다” bez wyraźnego stopnia wyższego („더”); kierunek zgodny, drobna utrata porównania.
- Linie 165–166, 220, 229–230, 247–248, 298: forma `{{t:cutoff|CO}}`, `{{t:hijack|HJ}}` to skrót, a nie nazwa z terms-nazwy („컷오프”, „하이잭”); pl ma tu te same skróty, a komentarze terms-nazwy odnotowują formy CO/HJ, więc uznane za zgodne z przyjętą konwencją — do potwierdzenia.
- Linia 273 (R-M4-008): „수티드 하이카드” dla „wysokimi kartami w kolorze”; „하이카드” to także nazwa układu (high-card). Zrozumiałe w kontekście; ewentualnie „수티드 높은 카드”.

## Pytania do źródła pl
- brak

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części R1 nie było treści krytycznej (brak reguł R-M12).
