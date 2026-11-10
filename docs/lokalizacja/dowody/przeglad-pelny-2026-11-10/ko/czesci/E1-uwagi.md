# ko · E1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/exams/m0.yaml | tak (92 linie pl i ko) | bez znalezisk |
| content/ko/exams/m1.yaml | tak (75 linii) | 2 poprawki NISKIE |
| content/ko/exams/m2.yaml | tak (99 linii) | 1 poprawka ŚR (nazwa reguły 2 i 4) |
| content/ko/exams/m3.yaml | tak (95 linii) | 5 poprawek ŚR (procent + klasyfikator „개”, „3-bet”) |
| content/ko/exams/m4.yaml | tak (111 linii) | 2 ŚR, 2 NISKIE |
| content/ko/exams/m5.yaml | tak (100 linii) | 5 ŚR, 1 NISKIE; zapis „C-벳” do ujednolicenia |
| content/ko/exams/m6.yaml | tak (96 linii) | 5 ŚR, 4 NISKIE; zapis „c-bet” do ujednolicenia |

Pomocniczo: `content/ko/terms-nazwy.yaml` w całości; `content/numbers.yaml` i `tools/content-build/src/numbers.ts` tylko punktowo (jednostki i zapis liczb: percent → „15%”, multiplier → „4x”, bb → „2.5bb”); lekcje ko tylko przez `grep` (warianty nazw), nie czytane. Glosariusz `docs/lokalizacja/glosariusz.md` nie był otwierany (nazwy sprawdzane wyłącznie względem `terms-nazwy.yaml`). Wersji `en` nie otwierałem. Wcześniejszych przeglądów ani `docs/decyzje.md` nie czytałem.

Kontrola mechaniczna (skrypt, linia po linii, 7 plików): liczba i klucze `{{n:…}}`, klucze `{{t:…}}`, `[[karty]]`, pola `table`, `id`, `family`, `rules`, `answer`, `spot`, `correct`, `sizeError` oraz cała struktura poza tekstami w cudzysłowach — identyczne z pl, bez różnic. Poprawna odpowiedź w każdym zadaniu jest ta sama co w pl i zgodna z uzasadnieniem. Partykuły po znacznikach bez formy (np. `{{t:bet}}이`, `{{t:straight}}가`, `{{t:wheel}}로`, `{{t:pot}}은`) sprawdzone względem nazw z `terms-nazwy` — zgodne.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ko/exams/m2.yaml:63, 64, 65, 72 | pl „twoje sprawdzenie” → „내 {{t:call|콜}}” (forma „ja”), podczas gdy pozostałe egzaminy zwracają się „당신” albo pomijają zaimek | zostawić albo zamienić „내 콜 후” na „콜 후”; bez wpływu na sens |
| NISKIE | content/ko/exams/m5.yaml:90; m6.yaml:39, 76, 77 | pl „zapłacą / płaci” (= sprawdzą) → „돈을 냅니다 / 돈을 내지 않습니다”; zrozumiałe, ale w żargonie naturalniej „콜합니다” | do decyzji przy ujednolicaniu; nie poprawiałem, bo tekst jest poprawny |

## Do ujednolicenia skryptem
- **c-bet → „C벳”** (nazwa z `terms-nazwy`; pl ma zwykły tekst „c-bet” bez znacznika). W części E1 są dwa inne zapisy:
  - `content/ko/exams/m5.yaml`: wzorzec `C-벳` → `C벳`; `grep -o 'C-벳' | wc -l` = 10 wystąpień w 9 liniach (formy: `C-벳`, `C-벳을`, `C-벳합니다`). W E1.json są 2 przykłady (linie 57, 60), po ich nałożeniu zostaje 8.
  - `content/ko/exams/m6.yaml`: wzorzec `c-bet` → `C벳`; `grep -o 'c-bet' | wc -l` = 14 wystąpień w 12 liniach (formy: `c-bet으로`, `c-bet에`, `c-bet에는`, `c-bet에서`, `c-bet의`). W E1.json jest 1 przykład (linia 28), zostaje 13. Wszystkie partykuły po zamianie pozostają poprawne (벳 kończy się spółgłoską: 으로/에/의/을 bez zmian).
  - Uwaga poza częścią: `grep` pokazuje, że „c-bet” łacinką występuje też w lekcjach ko (m.in. m6-l2, m5-l3, m10-l3, m7-l1) i egzaminach m7, m8, m10 — ujednolicenie powinno objąć cały język, nie tylko E1.
- **bet (zwykły tekst) → „베팅” czy „벳”**: m5 pisze „베팅” („베팅 ÷ (팟 + 베팅)”, „작게 베팅합니다”), m6 pisze „벳” („벳 ÷ (팟 + 벳)”, „벳이 클수록”, forma `{{t:bet|벳합니다}}`). `terms-nazwy`: bet = „베팅”, „벳” dopuszczone jako forma. Oba zrozumiałe; do decyzji globalnej (w m6: `벳 ÷`, `+ 벳`, `2·벳`, `벳이`, `벳 크기`, `|벳합니다}}` — 20 wystąpień „벳” poza „C벳/3벳”). Nie poprawiałem.
- **próg (blefu/opłacalności)**: m5 „기준점”, m6 „기준값” (linie 19, 48), a „punkt odniesienia” w m6 też „기준점” (linie 24, 28). Sens zachowany; warto ustalić jedno słowo na „próg” (np. „기준값” albo „손익분기점”) i zostawić „기준점” dla „punkt odniesienia”.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m4.yaml:111 — w E1.json proponuję „콜 / 투기적인 핸드” za „림프 비하인드 / 스페큘레이티브 핸드” (zgodnie z lekcją m4-l4). Jeśli rodzimy użytkownik uzna „림프 비하인드” za naturalny żargon, wystarczy sama zamiana „스페큘레이티브” → „투기적인”.
- m3.yaml:23, 51, 61 — „Dopłacam do dużego blinda” → „빅 블라인드 금액만 맞춥니다” (tak samo w lekcji m3-l1); poprawne, ale opisowe. Czy gracz koreański nie oczekiwałby po prostu „림프합니다”?
- m5.yaml:85 — „parę siódemek z asem” → „에이스와 함께 7 페어”; naturalniej być może „에이스 키커의 7 페어”.
- m0.yaml — „족보” dla „układ” i „랭킹” dla „ranking”: brzmi naturalnie, ale nie mam potwierdzenia, że to to samo słownictwo co w lekcji m0 (lekcji nie czytałem).
- m1.yaml:55, 57 — „układ” oddany jako „패” („가장 좋은 패”, „패가 같을 때만”), a w m0 jako „족보”; oba poprawne, różnica rejestru.
- m6.yaml:34 — „패시브한 … 레크리에이션 플레이어”: „패시브한” jako zapożyczenie zrozumiałe; alternatywa rodzima „소극적인”.

## Pytania do źródła pl
- m2.yaml:89 (pl) — „{{t:straight|Strit}} daje {{n:outs.oesd}} outów” jest odwrócone logicznie (to outy dają strita); przekład ko poprawił to na „스트레이트까지 아웃은 …개”. Drobiazg redakcyjny w pl, bez wpływu na liczby.
- Innych wątpliwości merytorycznych do pl w tej części nie mam.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części E1 (egzaminy m0–m6) nie ma treści krytycznej (brak modułu 12, numerów pomocowych, tekstów o prawdziwych pieniądzach).
