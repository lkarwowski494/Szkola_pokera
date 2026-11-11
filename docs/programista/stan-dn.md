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

## Stan po sesji (2026-11-11)
| Decyzja | Stan | Dowód |
|---|---|---|
| D-890 | zrobione | commit ac071adc; `tools/content-build/test/dn-prog-zetony-d890.test.ts` (czerwony 0,5 ≠ 0,45, potem zielony) |
| D-888 | zrobione (F2–F4 + nadkarty; range-spot bez zdań, jak w §3) | commit 4005a7f4 + poprawka b4297223; `apps/mobile/src/features/scenariusz/liczby.ts`; testy `dn-liczby-d888.test.tsx` (15), `packages/poker-core/test/nadkarty-dn.test.ts` (5) |
| D-889 | **NIE ZROBIONE** (osobny, duży krok UI) | spec: `docs/design/design-spec.md` „Scenariusz: punkt ICM” (kryteria 1–6), makieta `docs/design/ekrany/scenariusz-icm.html`, wzorce zrzutów `wzorce-zrzuty/scenariusz-icm/` |
| D-886/D-887 | bez braków | patrz inwentaryzacja |
| CI | `pnpm run ci` kod 0 na b4297223 | `docs/programista/dowody/dn-ci-b4297223.txt`; czerwone na 4005a7f4: `dn-ci-4005a7f4.txt` (terms.test.ts, naprawione) |

Uwagi do D-889: `icm-call` wraca na `RODZAJE_NA_EKRANIE` dopiero z widokiem i warunkiem SC-34 (06-tresci-002, CQ); stos „ty” i dopłata z twojego stosu (kryterium 2) wymagają stosów w wariancie (`stacks`, `heroIndex`) zamiast `stackBb`; kolejność kroków: komponent widoku → klucze → RNTL → zrzuty AX5.

## Szacunek reszty (czas agenta)
D-890: ok. 0,5 h. D-888: ok. 3–4 h (7 kluczy pl i en, parametry w kodzie, `nadkarty` w wariancie wymaga decyzji: pole w wariancie zmienia odcisk albo liczenie po stronie ekranu). D-889: ok. 3–4 h (komponent, klucze, RNTL). Czekanie: pełne CI ok. kilkanaście minut na przebieg.

## Uwagi
- Pole `nadkarty` w `DrawCallVariantDecision` zmieniłoby kształt wariantu zapisanego w bazie (ścieżka wrażliwa); plan: liczyć je w ekranie z ręki i stołu tą samą funkcją co generator, bez zmiany wariantu (bez podnoszenia `GENERATOR_WERSJA`).

## Dziennik
- 2026-11-11: E0, inwentaryzacja, tożsamość git ustawiona lokalnie (była `Claude <noreply@anthropic.com>`).
