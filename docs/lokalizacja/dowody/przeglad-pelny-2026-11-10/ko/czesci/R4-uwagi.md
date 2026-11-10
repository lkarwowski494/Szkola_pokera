# ko · R4 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/ko/rules.yaml`, linie 953–1207 (pl: `content/pl/rules.yaml`, te same linie) | Tak, cały fragment, pl i ko linia po linii | R-M12-001…012 (treść krytyczna, 11 reguł: 001–009, 011, 012), R-M11-001…012, R-M13-001…008. Pola `if`/`then`/`because`/`source`. Reszta pliku (linie 1–952) poza zakresem części, nieczytana. |

Kontrole mechaniczne na zakresie 953–1207 (skrypt, porównanie linia w linię pl↔ko): zestaw znaczników `{{n:…}}` identyczny w każdej linii; klucze `{{t:…}}` identyczne w każdej linii; pola `id`, `module`, `level`, `sources` identyczne; adresy URL identyczne. Formy w `{{t:klucz|forma}}` zgodne z `content/ko/terms-nazwy.yaml` (sprawdzone wzrokowo wszystkie użyte klucze, w tym skróty BB/SB dla big-blind/small-blind, które terms-nazwy dopuszcza jako formy tłumacza). Wartości liczb sprawdzone w `content/numbers.yaml` tam, gdzie od nich zależy koreańska składnia (np. `var.hands.k` = 100 → „100,000핸드”, `var.need.hands.k` ≈ 615 → „615,000핸드”: zgodne z pl „100 tys.” / „615 tys.”).

Pomocniczo otwarte: `content/en/rules.yaml` (2 linie: 981, 1005), `content/ko/lessons/m13-l2-powtorki.md` (nazwa funkcji „powtórki z gry” w ko), `content/numbers.yaml`.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| — | — | brak | — |

## Do ujednolicenia skryptem
Brak w tej części.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `content/ko/rules.yaml:981` (R-M12-004, treść krytyczna): pl „dobra decyzja **regularnie** przegrywa” → ko „좋은 결정도 **자주** 집니다” („często”). Przykład w tym samym zdaniu to ok. 18% (AA vs KK), więc „자주” może lekko wzmacniać. Możliwa wersja: „좋은 결정도 일정한 비율로 집니다”. Wniosek reguły się nie zmienia; do oceny przez rodzimego użytkownika, czy „자주” jest tu odbierane jako „regularnie”.
- Partykuły po liczbach z jednostką bb/100 (znacznik renderuje np. „5bb/100”): `:957` „{{n:var.wr.ex}}라는 결과”, `:965` „{{n:var.wr.ex}}로 이기는”, `:1029` „{{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는”. Przy czytaniu „…백” poprawnie byłoby „이라는” / „으로”; przy czytaniu po angielsku („헌드레드”) obecna forma jest dobra. Zależy od przyjętego odczytu jednostki; warto ustalić raz dla całego przekładu.
- `:1048` (R-M11-001): pl „{{t:fold}} po {{t:raise|przebiciu}}” → ko „상대의 {{t:raise|레이즈}}에 {{t:fold|폴드}}하면”. Sens zachowany („상대의” wskazuje, że to przebicie rywala); naturalniejsze mogłoby być „리레이즈”, ale forma znacznika jest zgodna z terms-nazwy, więc nie zgłaszam poprawki.
- `:1048`: pl „all-in wyciska **z nich** [żetonów] najwięcej pasów rywala” → ko „올인은 상대에게서 가장 많은 폴드를 끌어냅니다” (bez „z nich”). Drobne pominięcie bez wpływu na wniosek.

## Pytania do źródła pl
- Brak błędów merytorycznych zauważonych w tym fragmencie. Uwaga redakcyjna: w R-M12-003 pl „błąd oszacowania maleje z pierwiastkiem z liczby rąk” jest skrótem myślowym (błąd jest odwrotnie proporcjonalny do pierwiastka); wzór w tym samym zdaniu jest jednoznaczny.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Reguły R-M12-001…009, 011, 012 (linie 953–1040), każde pole `if`/`then`/`because`/`source` porównane z pl:
- **Liczby i znaczniki**: wszystkie `{{n:…}}` obecne, te same klucze i liczba wystąpień w każdej linii; stałe wpisane w `source` zgodne („(1.96 × 80 ÷ 2)²”, „약 615,000핸드”, „3bb/100에서 30 바이인”, lata publikacji, cytaty angielskie bez zmian). Zapis „{{n:…}},000핸드” poprawnie oddaje „… tys. rąk”.
- **Warunki i granice**: R-M12-011 „najpóźniej wtedy” → „늦어도 그때”, „najwcześniej wtedy, gdy masz pełny bankroll” → „빨라도 … 뱅크롤이 다 찼을 때” — zachowane; „do połowy założonej liczby wpisowych” → „계획한 바이인 수의 절반으로” — zachowane; „prawie każdemu” → „거의 모든” — zachowane; „część źródeł radzi zejść już po takiej stracie” — zachowane. R-M12-012 „nigdy mniej niż” → „절대 … 보다 적게 하지는 않습니다” — zachowane. R-M12-005 „dopiero po przeglądzie rozdań, a nie na podstawie samego wyniku” — zachowane; „dopiero po ok. … rękach”, „znacznie więcej rąk” — zachowane. R-M12-003 „setki tysięcy rąk” → „수십만 핸드” — poprawne. R-M12-009 „to przybliżenie przy stałym winrate i SD”, „bankroll w bb” — zachowane. R-M12-006/007/008 — kierunek zaleceń i uzasadnienia zachowane (reakcja od razu; koniec sesji; zaczynać od najgorszych zagrań).
- **Nic nie odwrócono ani nie zgubiono z liczb, progów i warunków.** Znaleziska: wyłącznie NISKIE — brak „twoim” w R-M12-007 (:1005), nieścisłe „제곱근에 비례해” w R-M12-003 (:973), partykuła „으로” po 15 w R-M12-011 (:1027); wszystkie z poprawką w `R4.json`. Jedna wątpliwość co do odcienia („regularnie” → „자주”, :981) w sekcji „Do sprawdzenia”.
- Brak w tej części numerów telefonów, adresów pomocy i nazw organizacji pomocowych (są w innych częściach).
