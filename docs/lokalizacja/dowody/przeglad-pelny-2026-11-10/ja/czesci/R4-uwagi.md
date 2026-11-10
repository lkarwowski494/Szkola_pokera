# ja · R4 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/ja/rules.yaml`, linie 953–1207 (pl: `content/pl/rules.yaml`, te same linie) | Tak, cały zakres, pl i ja, reguła po regule (R-M12-001…012, R-M11-001…012, R-M13-001…008), pola `if`/`then`/`because`/`source` | Poza zakresem linii nic nie oceniano. Pomocniczo: `content/ja/terms-nazwy.yaml` (całość), `content/numbers.yaml` (wartości kluczy użytych w zakresie), wyszukiwania w lekcjach ja m12/m13 i w `ja.json` dla spójności nazw. Wersji `en` nie otwierano (nie było potrzeby). Dodatkowo skryptem porównano w każdej linii zbiory znaczników `{{n:…}}` i kluczy `{{t:…}}`, pola `id`/`module`/`level`/`sources` oraz adresy URL: bez różnic. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| — | — | Brak. Wszystkie pewne znaleziska mają poprawkę w `R4.json` (7 poprawek: 3 ŚR, 4 NISKIE). | — |

## Do ujednolicenia skryptem
Brak w tej części.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `rules.yaml:957, 965, 972, 1029` — „{{n:var.hands.k}} tys. rąk” → „{{n:var.hands.k}}kハンド” (wyświetli się „100kハンド”, „…kハンド”). To konwencja całego przekładu (34 wystąpienia `}}kハンド` w `content/ja`), wymuszona przez znacznik liczby w tysiącach; naturalniejsze po japońsku byłoby „10万ハンド”, ale wymagałoby innego klucza liczby. Do decyzji globalnej, nie do poprawki w tej części.
- `rules.yaml:996` — pl „oddech” → „深呼吸” (głęboki oddech); lekcja `m12-l3-tilt.md` (linie 60, 124) ma „呼吸をして”. Sens zalecenia ten sam; ewentualnie ujednolicić z lekcją („ひと呼吸”/„呼吸”).
- `rules.yaml:980, 1135, 1136` — pl „cena” → „値段”. W regułach konsekwentnie (15×), ale czy rodzimy gracz nie oczekiwałby raczej „オッズ”/„必要エクイティ”, wymaga oceny rodzimego użytkownika.
- `rules.yaml:1005` — pl „na twoim najgorszym poziomie (C-game)” → „最悪のレベル（Cゲーム）” bez „twoim/自分の”; z kontekstu jasne, sens zachowany.
- `rules.yaml:1071` — pl „sama ręka bez szans potrzebowałaby jednak pasów w ponad X przypadków” → „勝ち目のないハンドだけなら…”. Zrozumiałe, ale „だけなら” może być odczytane jako „gdyby były tylko takie ręce”; możliwe doprecyzowanie „ハンド自体に勝ち目がまったくない場合は”.
- `rules.yaml:1058` (pole `source`) — pl „przy 5bb przedział od równowagi liczonej niezależnie” → „独立に計算した均衡による範囲”; pl mówi „przedział od (wartości) równowagi”, ja „przedział według równowagi”. Pole źródła, bez wpływu na regułę.
- `rules.yaml:1112, 1119` — pl „gra o {{t:chips}}” → „チップを賭けたゲーム”; czy to czytelne jako „gra na żetony (chip EV)”, do oceny rodzimego użytkownika.
- `rules.yaml:1127, 1135` — pl „Button” (bez znacznika) → „ボタン”; `terms-nazwy` ma dla klucza `button` „BTN”, ale w przekładzie „ボタン” jest powszechne (lekcje m11 też). Nie zgłaszam jako błędu.

## Pytania do źródła pl
- Brak pytań merytorycznych. Uwaga porządkowa: komentarze YAML (linie 952, 1042–1043, 1141–1143) są w przekładzie po polsku jak w pl (nie są wyświetlane).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Reguły R-M12-001…009, 011, 012 (linie 953–1040) porównane zdanie po zdaniu (`if`, `then`, `because`, `source`).
- Liczby i znaczniki: wszystkie `{{n:…}}` identyczne co do klucza i liczby wystąpień w każdym polu; wzory (± z × SD ÷ √(ręce ÷ 100); (z × SD ÷ dokładność)²; RoR = e^(−2 × winrate × bankroll ÷ SD²)) bez zmian; w `source` linii 975 „1,96” → „1.96” i „ok. 615 tys.” → „約61万5千” (ta sama wartość).
- Warunki i granice: „najpóźniej wtedy” → „遅くともその時点で”, „najwcześniej wtedy, gdy masz pełny bankroll” → „戻るのは早くても…満額のバンクロールができたとき” (R-M12-011) — zgodne; „do połowy … (przy X do Y)” — zgodne; „prawie każdemu” → „ほぼすべての” — zgodne; „dopiero po przeglądzie rozdań, a nie na podstawie samego wyniku” (R-M12-005) — zgodne; „kończysz sesję” (R-M12-007) — zgodne; „nigdy mniej niż” (R-M12-012) → „下回ることはありません”: sens zachowany, poprawka NISKIE dodaje jawne „決して”.
- Odchylenia znalezione: R-M12-003 `because` dodane „しか…ない” (ŚR, poprawka); R-M12-006 `then` zgubione „dlaczego” (ŚR, poprawka); R-M12-004 `because` „regularnie” → „定期的に” (NISKIE, poprawka). Poza tym nic nie pominięto, nie złagodzono ani nie wzmocniono.
- Numerów telefonów, adresów i nazw organizacji pomocowych w tym fragmencie nie ma. Cytaty angielskie i nazwiska w polach `source` bez zmian.
