# Stan sesji DN (08-programista, build): „Liczby” F2–F4, ekran i próg ICM (D-888…D-890)
Gałąź `sesja-dn-liczby` @ 709f6947. Inwentaryzacja z 2026-11-11 (czytane pliki, nie pamięć). Polecenie: `docs/koordynacja/polecenia/DN.md` @ 3cde055 (gałąź `koordynacja`).

## Inwentaryzacja
| Decyzja | Stan | Dowód (plik:linia) | Brak |
|---|---|---|---|
| D-886 nazwy akcji | **Zrobione** | grupa `scenario.action.*` w `pl.json` (13 kluczy); `EkranScenariusza.tsx:27-53` (`wielka`, `amountPay/To/All`, `withAmount`); `wariant.ts:56-69` (`przebiciaWSpocie`, błąd dla nieznanej rodziny); test `cx-nazwy-akcji.test.tsx`, `scenariusz-akcje-de-09.test.ts` | nic (4-bet czeka na pierwszy spot z dwoma przebiciami, zgodnie z dokumentem) |
| D-887 `{{w:stol}}` przed flopem | **Zrobione** (jak zatwierdzono; warunek dla roli 09 otwarty) | `wariant.ts:250` (`t('scenario.street.preflop').toLowerCase()`) | sprawdzenie 11 słowników to rola 09, nie 08 |
| D-888 „Liczby” F2–F4 + nadkarty | **Brak** (jest tylko draw-call) | `EkranScenariusza.tsx:174-182` `zdanieLiczb` zwraca `''` poza draw-call; w `pl.json` istnieją tylko `scenario.numbers.title` i `.line` | klucze `cbet`, `sizeOpen`, `size3bet`, `limp`, `icm`, `overcardsFold`, `overcardsCall`; parametry `nadkarty`/`trafiszRazem` (wariant ma `outs`, generator liczy nadkarty w `scenario-gen.ts:531-532`, ale nie zapisuje ich w wariancie); przedział `na10`; zdania w en |
| D-889 widok punktu ICM | **Brak** | w `EkranScenariusza.tsx` icm-call ma tylko dziennik `play.log.allin` (`:132`) i kwoty `wariant.ts:236-239`; brak stołu 3–4 miejsc, listy stosów, nagród, przypisu | cała sekcja (komponent widoku, klucze, ocena „Stosy i nagrody”) |
| D-890 próg `(S − b) ÷ (2S)` | **Brak** | `scenario-gen.ts:278` `ICM_CHIPS_REQUIRED = 0.5`, wpisane w `:464` jako `requiredChips`; pole czytane też w `icm.ts`, `drills/text.ts` | zmiana wartości `requiredChips` (S = `stackBb`, b = `blindBb(hero)`), test niezależny; uwaga: `chipsDiffer` (`:461`) zostaje na 0,5 zgodnie z D-890 |

## Szacunek reszty (czas agenta)
D-890: ok. 0,5 h. D-888: ok. 3–4 h (7 kluczy pl i en, parametry w kodzie, `nadkarty` w wariancie wymaga decyzji: pole w wariancie zmienia odcisk albo liczenie po stronie ekranu). D-889: ok. 3–4 h (komponent, klucze, RNTL). Czekanie: pełne CI ok. kilkanaście minut na przebieg.

## Uwagi
- Pole `nadkarty` w `DrawCallVariantDecision` zmieniłoby kształt wariantu zapisanego w bazie (ścieżka wrażliwa); plan: liczyć je w ekranie z ręki i stołu tą samą funkcją co generator, bez zmiany wariantu (bez podnoszenia `GENERATOR_WERSJA`).

## Dziennik
- 2026-11-11: E0, inwentaryzacja, tożsamość git ustawiona lokalnie (była `Claude <noreply@anthropic.com>`).
