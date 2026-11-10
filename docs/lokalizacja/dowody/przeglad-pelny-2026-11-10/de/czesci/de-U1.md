# de-U1: niemiecki (de), słownik interfejsu, nazwa systemowa, metadane sklepu de-DE, areas/modules, nakładka spotów zakresów

Przegląd niezależny, 2026-11-10. Źródło: pl (dla sklepu także en-US). Terminologia: `content/de/terms-nazwy.yaml`.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| `apps/mobile/src/i18n/locales/de.json` (względem `pl.json`, klucz po kluczu; kontekst `pl.kontekst.json` dla kluczy wątpliwych) | tak | 903 (715 kluczy; pl: 935 linii, 747 kluczy) |
| `apps/mobile/locales/systemowe/de.json` (względem `pl.json`) | tak | 4 |
| `docs/sklep/aso/metadane-fala2.json`, lokalizacja `de-DE` (względem `pl` i `en-US` w `store/app-store-metadata.json`) | tak (wpis de-DE, `_opis`, `_aliasy`; pozostałe lokalizacje pliku poza zakresem) | 43 (de-DE: linie 7–13) |
| `store/iap-localizations.json` | tak (tylko sprawdzenie obecności wpisu de) | 46 |
| `content/de/areas.yaml` (względem `content/pl/areas.yaml`) | tak | 19 |
| `content/de/modules.yaml` (względem `content/pl/modules.yaml`) | tak | 14 |
| `content/de/ranges/spots.yaml` (względem `content/ranges/spots.yaml`) | tak | 269 |

Kontrole mechaniczne (skrypt, cały słownik):
- zestaw kluczy bazowych de = pl (brak kluczy nadmiarowych i brakujących);
- liczba mnoga: każdy klucz mnogi ma w de dokładnie `_one` i `_other` (16 kluczy), w pl odpowiednio więcej form;
- parametry `{{nazwa}}`, klucze `{{t:…}}` i ich krotność: w każdym kluczu de zgodne z co najmniej jedną formą pl (0 różnic; różnią się tylko tłumaczone formy po `|`);
- `areas.yaml`: identyczny z pl (same identyfikatory); `spots.yaml`: pola `id`, `hero`, `path`, `solver`, `uncertain`, listy akcji i znaczniki `{{n:…}}` identyczne ze źródłem, klucz grupy w `wrongSizes` zgodny z kluczem w `groups`.

Limity App Store, de-DE (policzone): name 22/30, subtitle 30/30, keywords 98/100, promotionalText 138/170, description 2263/4000. Po poprawce nr 1 subtitle ma 30/30.

`store/iap-localizations.json`: **wpisu de nie ma** (są tylko `pl` i `en`; plik sam opisuje to jako „tylko języki wydane w aplikacji”). Teksty, z których powstanie (purchase.title, purchase.plan.*, pierwsze zdania purchase.renewsQuarter/renewsYear, purchase.oneTime), mieszczą się w limitach 30/45 znaków (najdłuższy opis: „Einmaliger Kauf, ohne weitere Zahlungen.”, 40).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | `docs/sklep/aso/metadane-fala2.json`:9 (de-DE subtitle) | Entscheiden üben, ohne Einsatz | Entscheiden üben ohne Echtgeld | „ohne Einsatz” jest dwuznaczne: „bez stawki”, ale równie naturalnie „bez zaangażowania, bez wysiłku”; pl „bez gry o stawki”, en „no real money”. Zamiennik: 30 znaków, spójny z „Kein Echtgeldspiel” w tekście promocyjnym | średnia | tak |
| 2 | ŚR | `docs/sklep/aso/metadane-fala2.json`:12 (de-DE description, ÜBEN) | Entscheidungen in vier Stufen bewertet | Entscheidungen in vier Stufen bewertet: übereinstimmend, vertretbar, Ungenauigkeit, Fehler | pominięte nazwy czterech stopni oceny, które są w pl i en; nazwy jak w słowniku aplikacji (grade.*) | wysoka | tak |
| 3 | NISKIE | `docs/sklep/aso/metadane-fala2.json`:12 (de-DE description) | Tagesserie und ein Fortschrittswert | Tagesserie und ein Leistungsindex | „wskaźnik zaawansowania” w aplikacji to „Leistungsindex” (advancement.title); dwie nazwy jednego pojęcia | średnia | tak |
| 4 | ŚR | `apps/mobile/src/i18n/locales/de.json`:724 (drill.icm.foldRightChips) | {{t:risk-premium\|Risikoprämie}} | {{t:risk-premium\|Risk Premium}} | przyjęta nazwa terminu to „Risk Premium” (terms-nazwy.yaml; w treści ×10 wobec „Risikoprämie” ×2) | wysoka | tak |
| 5 | ŚR | `apps/mobile/src/i18n/locales/de.json`:656 (drill.paint.explanation) | {{t:combo\|Kombos}} | {{t:combo\|Kombinationen}} | przyjęta nazwa terminu combo to „Kombination” (terms-nazwy.yaml; w treści „Kombinationen” ×27) | wysoka | tak |
| 6 | ŚR | `apps/mobile/src/i18n/locales/de.json`:685 (drill.whoWins.reason.kicker) | Die Kombination ist dieselbe | Die Handkategorie ist dieselbe | pl „Układ jest ten sam” = ta sama kategoria układu; „Kombination” jest w de nazwą terminu combo, więc zdanie jest dwuznaczne | średnia | tak |
| 7 | NISKIE | `apps/mobile/src/i18n/locales/de.json`:662 (drill.numeric.diffPp) | {{diff}} Pp. | {{diff}} Prozentpunkte | „Pp.” nie jest przyjętym niemieckim skrótem punktów procentowych (w treści de występuje „pp”) | średnia | tak |
| 8 | NISKIE | `apps/mobile/src/i18n/locales/de.json`:56 (purchase.cancelInfo) | deines Apple-Accounts (Abonnements) | deines Apple Accounts (Abonnements) | nazwa własna Apple: „Apple Account” bez łącznika; tak w opisie sklepu de-DE | średnia | tak |
| 9 | NISKIE | `apps/mobile/src/i18n/locales/de.json`:61 (purchase.noPurchases) | auf diesem Apple-Account keine | auf diesem Apple Account keine | jak nr 8 | średnia | tak |
| 10 | NISKIE | `apps/mobile/src/i18n/locales/de.json`:830–848 (drill.texture.def.*, 14 kluczy) | ein hoher Flop hat … | Ein hoher Flop hat … | definicje są wstawiane po „Ja: ” / „Nein: ” (texture.whyRight/whyWrong); po dwukropku pełne zdanie zaczyna się po niemiecku wielką literą. Typografia, 14 miejsc, bez wpływu na sens | średnia | nie |
| 11 | NISKIE | `content/de/ranges/spots.yaml`:64, 76, 158, 165, 243, 250, 257, 264 | Button hat auf 2,5bb … / Button ist all-in gegangen / Button hat gefoldet | der Button hat … / Der Button ist … | w zdaniu z orzeczeniem „Button” stoi bez rodzajnika, a w tym samym tytule „der Small Blind hat gefoldet” ma rodzajnik; żargonowo dopuszczalne, ale niespójne | średnia | nie |

Razem: KRYT 0, WYS 0, ŚR 5, NISKIE 6.

## Do sprawdzenia przez człowieka znającego język

- `grade.zgodne`, `play.report.verdicts.compliant`, `play.report.good`, `advancement.gameExplain`: „Übereinstimmend” jako słowo stopnia oceny (pl „Zgodna”, tzn. zgodna z solverem). Poprawne, ale jako samodzielna etykieta brzmi urzędowo; rodzimy czytelnik mógłby oczekiwać np. „Solver-konform” albo „Optimal”. Zmiana dotyczyłaby 4 kluczy i opisu sklepu, więc bez poprawki.
- `exam.passed`, `exam.failed` („Grenze {{need}}”), `play.report.detail.implied` („Grenze {{sprMin}}”), `drill.icm.foldWrong` („liegt die Grenze bei”): pl „próg”. „Grenze” jest zrozumiałe, przy egzaminie naturalniejsze byłoby „Bestehensgrenze”, przy liczbach „Schwelle”.
- `drill.texture.scale`: „mit mindestens zwei Sätzen aus zwei Rängen” (pl „z co najmniej dwoma zestawami dwóch rang”) — „Sätzen” jest tu nieoczywiste; możliwe „mit mindestens zwei Paaren passender Ränge” albo „Kombinationen aus zwei Rängen” (to drugie koliduje z terminem combo).
- `content/de/ranges/spots.yaml`:62: „raist du etwa {{n:pf.3bet.size-ip}} der Eröffnung” daje „etwa 3x der Eröffnung”; wierne pl („ok. 3x otwarcia”), po niemiecku żargonowe (pełniej: „etwa das 3-Fache der Eröffnung”).
- `table.seatHero`: „du auf {{pos}} mit {{hand}}” („du auf UTG mit J9o”); możliwe, że naturalniej „du am/im {{pos}}”, ale przyimek zależy od pozycji, więc zostaje.
- `play.report.detail.implied`: „hinter dem Pot liegen {{have}}bb” (pl „za pulą jest”) — kalka żargonu „behind”; zrozumiałe dla grających, dla początkującego mniej.
- Sklep, name: „PokerGym: Poker lernen” zamiast pl/en „trener strategii GTO / GTO Strategy Trainer” — świadoma adaptacja ASO (słowo „gto” jest w keywords), nie błąd; „anfänger” w keywords nie ma odpowiednika w pl/en, ale nie jest obietnicą sprzeczną z opisem.
- Sklep a aplikacja, drobne różnice nazewnictwa bez wpływu na sens: „Handy” (sklep) / „Telefon” (aplikacja); „dauerhafter Zugang per Einmalkauf” (sklep) / „Lebenslanger Zugriff” (purchase.plan.lifetime); „Übungseinheit” (sklep) / „Übungssession” (aplikacja).

## Uwagi do źródła pl

- `apps/mobile/src/features/drills/text.ts`:152 (kod, poza zakresem przekładu): nazwa akcji w `range.freq` przechodzi przez `toLowerCase()`; po niemiecku rzeczowniki („Raise”, „Fold”, „Call”) zostaną wypisane małą literą. To samo w `textureText` (etykiety małą literą) jest po niemiecku poprawne, bo to przymiotniki.
- `store/iap-localizations.json`: brak wpisu de (zgodnie z opisem pliku — do dodania przy wydaniu języka).

## Ocena ogólna

Przekład interfejsu jest wierny i naturalny: wszystkie liczby, parametry, znaczniki i formy liczby mnogiej zgadzają się ze źródłem, tekst ekranu pomocy (odpowiedzialna gra) oddaje sens bez zmian, a w całym zakresie nie ma znaleziska KRYT ani WYS. Znaleziska to trzy niespójności terminologiczne względem `terms-nazwy.yaml`, drobna typografia oraz dwie rzeczy w metadanych sklepu: dwuznaczny podtytuł i pominięte nazwy stopni oceny. Metadane de-DE mieszczą się w limitach App Store i nie sugerują gry na pieniądze; `modules.yaml`, `areas.yaml` i nakładka spotów są bez zastrzeżeń merytorycznych.
