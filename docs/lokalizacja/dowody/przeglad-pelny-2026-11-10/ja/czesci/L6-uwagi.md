# ja · L6 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m9-l3-rozmiar-geometryczny.md | tak (130/130 linii pl i ja) | 6 poprawek |
| content/ja/lessons/m9-l4-plan-trzech-ulic.md | tak (131/131) | 4 poprawki, 1 znalezisko bez poprawki |
| content/ja/lessons/m10-l1-statystyki.md | tak (131/131) | 2 poprawki |
| content/ja/lessons/m10-l2-typy-graczy.md | tak (143/143) | 2 poprawki, 1 znalezisko bez poprawki |
| content/ja/lessons/m10-l3-odejscie-od-bazy.md | tak (130/130) | 11 poprawek |
| content/ja/lessons/m10-l4-rake.md | tak (127/127) | bez poprawek |

Pomocniczo: `content/ja/terms-nazwy.yaml` i `docs/lokalizacja/glosariusz.md` w całości; z `content/en/` tylko jedna linia (m10-l3:49). Kontrola mechaniczna linia po linii (skrypt): znaczniki `{{n:…}}` identyczne z pl we wszystkich 6 plikach, pola nieprzekładalne (id, family, rules, answer, table, params) identyczne, kolejność opcji i flagi `correct`/`sizeError` jak w pl. Klucze `{{t:…}}`: jedyna zmiana klucza to m10-l3:75 i :115 (poprawione w JSON); pozostałe różnice to liczba wystąpień tego samego klucza w linii (m9-l3:78, :89; m9-l4:95; m10-l2:90; m10-l3:16) — naturalne w przekładzie, bez wpływu na sens.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/ja/lessons/m9-l4-plan-trzech-ulic.md:17 | pl „jeden bet zostawia na {{t:board\|stole}} większość wartości” (idiom „zostawić na stole” = nie zebrać) → ja „バリューの大半を{{t:board\|ボード}}に残してしまいます”. Po japońsku „zostawić wartość na boardzie (kartach wspólnych)” jest kalką bez sensu. | Naturalnie: „バリューの大半を取り逃がしてしまいます”, ale to usuwa znacznik `{{t:board}}` obecny w pl — decyzja sesji nadrzędnej (zob. pytanie do źródła pl). |
| ŚR | content/ja/lessons/m10-l2-typy-graczy.md:121 | Wiersz tabeli „Fold to 3-bet” po angielsku, a w m10-l1 ta sama statystyka to „フォールド・トゥ・3ベット”. | Ujednolicić razem z m10-l3 (niżej, „Do ujednolicenia skryptem”). |
| NISKIE | content/ja/lessons/m10-l2-typy-graczy.md (ok. 12 linii, np. 22, 31, 43, 52, 99, 126, 130, 139) | Dwukropek „：” w środku zdania przeniesiony z polskiej interpunkcji („…ではありません：{{t:call\|コール}}してくる…”). Zrozumiałe, ale nienaturalne; pozostałe pliki części dzielą takie zdania kropką „。”. | Zamiana na „。” tam, gdzie po dwukropku jest pełne zdanie (ręcznie, nie skryptem: w etykietach opcji „はい：…/いいえ：…” dwukropek jest poprawny). |

## Do ujednolicenia skryptem
- **„baza” (strategia bazowa)**: m10-l1 (4 linie) i m10-l2 (10 linii) piszą „ベースライン”; m10-l3, `exams/m10.yaml` i `rules.yaml` piszą „ベース” (ok. 27 linii). Wzorzec: `ベースライン` → `ベース` w `content/ja/lessons/m10-l1-statystyki.md` (`grep -c` = 4) i `m10-l2-typy-graczy.md` (`grep -c` = 10). Kierunek wg większości i rules.yaml; odwrotny kierunek też poprawny językowo — ważne, żeby była jedna nazwa.
- **Nazwy statystyk HUD „fold to 3-bet” / „fold to c-bet”**: m10-l1 → „フォールド・トゥ・3ベット”, „フォールド・トゥ・Cベット” (7 linii; `rules.yaml` 6 linii); m10-l2 (1 linia), m10-l3 (9 linii), `exams/m10.yaml` (11 linii), `rules.yaml` (2 linie) → po angielsku „Fold to 3-bet”, „Fold to c-bet”. Wzorzec: `Fold to 3-bet` → `フォールド・トゥ・3ベット`, `Fold to c-bet` → `フォールド・トゥ・Cベット` (albo odwrotnie); decyzja o kierunku należy do sesji nadrzędnej, bo dotyczy też plików spoza tej części.
- „próg”: w m10-l4 konsekwentnie „基準” (próg equity/sprawdzenia), w innych plikach „しきい値” (m10-l3 poprawione w JSON z „閾値”). Nie zgłaszam jako błąd — „基準” jest naturalne — ale to trzecia nazwa tego samego pojęcia.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m10-l3:49 — pl „Fold to c-bet łączy wszystkie rozmiary i stoły” → ja „すべてのサイズとテーブル”. W kursie „stół” to zwykle board (karty wspólne), a akapit lekcji (linia 109) mówi „wszystkie rozmiary i flopy”, więc prawdopodobnie powinno być „ボード”. Wersja en ma jednak „tables”. Jeśli pl znaczy board: `すべてのサイズとテーブルをまとめた` → `すべてのサイズとボードをまとめた`.
- m10-l4:123 — pl „bez dopłacania do dużego blinda” (bez limpu/completu z SB) → ja „{{t:big-blind|ビッグブラインド}}に合わせる支払いはしません”. Sens zachowany, ale sformułowanie może być nieczytelne; ewentualnie „…の額に合わせるだけのコールはしません”.
- m10-l1:130, m10-l3:129, m10-l4:126 — pl „to rachunek” (szczebel pewności: matematyka) → ja „計算によるものです”. Poprawne, ale słabsze niż w m9-l3:129 („純粋な数学です”); do oceny, czy ujednolicić.
- m10-l1:86 — pl „zatrzymać środki” → ja „資金を没収する” (konfiskata). Bliskie, minimalnie mocniejsze niż „zatrzymać”.
- m9-l3, opcje i tabela: zapis „約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}” (liczba w procentach + ポット, np. „約65%ポット”) wobec m9-l4 „{{t:pot|ポット}}の約{{n:…}}”. Oba zapisy spotykane; do oceny, czy ujednolicić.

## Pytania do źródła pl
- m9-l4:17 (pl): „zostawia na {{t:board|stole}} większość wartości” — znacznik terminu `board` użyty w idiomie „zostawić na stole”, gdzie „stół” nie oznacza kart wspólnych. Czy znacznik jest tu zamierzony? W przekładach wymusza kalkę.
- m10-l3:49 (pl): „łączy wszystkie rozmiary i stoły” — „stoły” = boardy (jak „flopy” w linii 109) czy stoły do gry? Wersje en i ja przyjęły „tables”.
