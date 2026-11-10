# ko · L7 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m11-l1-push-fold.md | tak (pl 178 linii, ko 178 linii) | bez poprawek; sens, liczby i znaczniki zgodne z pl |
| content/ko/lessons/m11-l2-sprawdzanie.md | tak (176 / 176) | 5 poprawek (termin „갭 컨셉”, „2 페어”, „하이 카드”) |
| content/ko/lessons/m11-l3-icm.md | tak (169 / 169) | 4 poprawki (forma znacznika payout) |
| content/ko/lessons/m13-l1-raport.md | tak (109 / 109) | 7 poprawek (cytat napisu z ekranu, „리포트” → „보고서”, polecenia liczbowe) |
| content/ko/lessons/m13-l2-powtorki.md | tak (97 / 97) | 8 poprawek (4벳, C벳, „자유 플레이”, nagłówek ramki) |
| content/ko/lessons/m13-l3-przeglad.md | tak (88 / 88) | 1 poprawka (zgubione „nigdy”) |

Pomocniczo: `content/ko/terms-nazwy.yaml` przeczytany w całości; `content/ko/modules.yaml` (tytuły modułów), `content/numbers.yaml` (wybrane klucze m11/m13, format liczb) i `apps/mobile/src/i18n/locales/ko.json` / `pl.json` tylko wyszukiwaniem (nazwy werdyktów, raportu, trybów gry). `docs/lokalizacja/glosariusz.md` nie był czytany (nazwy ko sprawdzane względem `terms-nazwy.yaml`). Wersji `en` nie otwierałem.

Kontrole mechaniczne (pl ↔ ko, każdy z 6 plików): zestaw i liczba wystąpień kluczy `{{t:…}}` i `{{n:…}}` identyczne; pola nieprzekładalne (id, module, order, rules, kind, family, answer, generator, params, count, spot, table, bloki `range`) identyczne linia w linię; `correct: true` w tych samych liniach; notacja kart (`[[7s 6s]]`, A♥ K♥ itd.) identyczna. Partykuły po znacznikach bez formy (`{{t:pot}}이`, `{{t:range}}가`, `{{t:chips}}을`, `{{t:equity}}가`, `{{t:big-blind}}는` …) zgodne z nazwami z `terms-nazwy`.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/ko/lessons/m13-l1-raport.md (16 wystąpień), m13-l2-powtorki.md (4 wystąpienia) | pl „raport” → ko „리포트”, a ekran w interfejsie nazywa się „세션 보고서” (`play.report.title`); w `L7.json` są tylko 3 przykłady z m13-l1 | patrz „Do ujednolicenia skryptem” |

## Do ujednolicenia skryptem
- `리포트` → `보고서` w `content/ko/lessons/m13-l1-raport.md` (`grep -c`: 14 linii, 16 wystąpień; 3 z nich są już w `L7.json`: linie 5, 76, 105) i `content/ko/lessons/m13-l2-powtorki.md` (`grep -c`: 4 linie, 4 wystąpienia: 31, 73, 89, 93). Oba słowa kończą się samogłoską, więc partykuły (는/를/에/의/에서/에는) zostają bez zmian. Powód: interfejs ko ma „세션 보고서” (`play.report.title`), `content/ko/rules.yaml` też głównie „보고서” (4 linie wobec 1 z „리포트”).
- Poza częścią L7 (do wiadomości sesji nadrzędnej, nie sprawdzałem tych plików w całości): „리포트” występuje też w `content/ko/exams/m13.yaml` (linie 23, 34) i `content/ko/rules.yaml` (linia 1155).
- Kolejność: jeśli skrypt zadziała przed nałożeniem `L7.json`, trzy poprawki z „리포트” w polu `stary` (m13-l1 linie 5, 76, 105) nie znajdą dopasowania — są wtedy zbędne.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m11-l1-push-fold.md:156 — pl „Każdy z nich może mieć silną rękę” → „둘 다 강한 핸드를 가질 수 있으므로”. Czy czyta się jako „każdy z dwóch może mieć”, czy jako „obaj naraz mają”? Ewentualnie „둘 중 누구든 강한 핸드를 가질 수 있으므로”.
- m11-l1-push-fold.md:65 — „{{t:short-stack|숏 스택}}이 아주 짧을 때” (pl „przy bardzo short stacku”): „숏 스택이 짧을 때” to tautologia; ewentualnie „스택이 아주 짧을 때” (ale wtedy znika znacznik terminu).
- m11-l1 (linie 152) i m11-l2 (linia 140) — ta sama „tabela z serwisu szkoleniowego” raz jako „차트”, raz jako „표”. Oba poprawne; ewentualne ujednolicenie.
- m11-l1 pisze „약 {{n}} 핸드”, m11-l2 „약 {{n}}의 핸드” (liczba to procent, np. „약 58.3%의 핸드”). Wersja z „의” jest gramatycznie pewniejsza; w m11-l1 (linie 63, 90–92, 152, 156, 174) „약 58.3% 핸드로” jest zrozumiałe, ale mniej staranne.
- m13-l1-raport.md:105 — „약 {{n:m13.noise.hands.k}}천 핸드 후에도” (= „약 2.5천 핸드”): czy zapis „2.5천” jest naturalny w tekście dydaktycznym (zamiast „2,500”)? Liczba pochodzi ze znacznika, więc zmiana wymagałaby innego klucza. Dodane „-에도” („nawet po”) nie zmienia wniosku.
- m13-l3-przeglad.md:74 — „결과가 좋았던 실수도 똑같이 대가를 치릅니다” (pl „błąd, który się opłacił, kosztuje tak samo”): podmiotem „대가를 치르다” jest zwykle osoba; ewentualnie „똑같이 대가가 따릅니다”.
- m13-l3-przeglad.md:13 — pl „W trakcie gry na żywo” → „라이브 게임 중에”: po polsku może znaczyć zarówno grę przy stole, jak i grę „w czasie rzeczywistym”; przekład wybrał pierwsze znaczenie.
- m13-l3 — „배드 빗” (bad beat) i „쿨러”: brak w `terms-nazwy`; zapis „배드빗” bez spacji też spotykany.
- Dwukropek w środku zdania („…입니다: …”, „맞습니다: …”) w m11-l3 i m13-l3 jest kalką interpunkcji pl; m11-l1/l2 i m13-l1/l2 używają kropki. Styl, nie zgłaszam jako poprawki.
- m13-l2 — „게임 영역” (pl „obszar gry”): interfejs ko używa samego „영역” i nazwy trybu „집중 훈련”; zrozumiałe, bez poprawki.

## Pytania do źródła pl
- m11-l2-sprawdzanie.md:154 (pl) — „dopłaca {{n:m11.3max.bb.cost}} do {{t:pot|puli}} {{n:m11.3max.bb.pot}}”: wg `numbers.yaml` to pula po sprawdzeniu, a zdanie brzmi, jakby to była pula przed dopłatą (w tabeli wyżej jest jawnie „pula po sprawdzeniu”). Przekład ko wiernie powtarza pl.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L7 nie było treści krytycznej (brak lekcji `m12-*`, reguł `R-M12-*` w treści, `helplines.yaml`, ramki „Odpowiedzialna gra”). Lekcja m13-l1 tylko odwołuje się do reguły R-M12-004 w polu `rules` (identycznie jak w pl) i do zasady „decyzja, nie wynik” z modułu o mental game; odpowiadające zdania (linie 72–74, 80) porównane z pl — sens zgodny, nic nie pominięto ani nie złagodzono.
