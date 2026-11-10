# ja · S1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/ja/areas.yaml` | tak | Brak pól tekstowych; plik identyczny z `content/pl/areas.yaml` (diff pusty). |
| `content/ja/modules.yaml` | tak | 14 tytułów i podtytułów; id, order, phase, recommended jak w pl. Bez znalezisk. |
| `content/ja/ranges/spots.yaml` | tak | Wszystkie 269 linii; różnice wobec `content/ranges/spots.yaml` tylko w `title`, kluczach `groups`/`wrongSizes` i tekście `text`/`why`. Pola nieprzekładalne (id, hero, path, solver, uncertain, wartości grup) porównane skryptem: identyczne. Klucz kotwicy `&g-btn-vs-co` i klucz `wrongSizes` są tym samym napisem (wymóg nakładki). Znaczniki `{{t:…}}` i `{{n:…}}` jak w pl. Bez znalezisk. |
| `content/ja/helplines.yaml` | tak | TREŚĆ KRYTYCZNA, wynik niżej. Różnice wobec pl tylko w 4 polach tekstowych (pointer, fallback.text, regions_label, info). |
| `content/ja/terms-def.yaml` | tak | 162 definicje porównane z polem `def` tego samego klucza w `content/terms.yaml` (klucze i kolejność zgodne; pola `def` identyczne z kolumną „Znaczenie” glosariusza). 3 poprawki NISKIE. |
| `content/ja/terms-nazwy.yaml` | tak | 162 klucze porównane z `pl`/`en` w `terms.yaml` i z glosariuszem; komentarzy po `#` nie oceniałem. 21 poprawek ŚR. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | `content/ja/terms-nazwy.yaml` (10 kluczy z `null`) | Poza 19 kluczami z poprawką w S1.json zostaje 10 terminów bez nazwy lokalnej, dla których przekład nie ma jeszcze utrwalonej formy (0–1 wystąpień katakaną): polarization, donk-bet, m-ratio, gap-concept, chip-ev, pay-jump, nash-equilibrium, overcall, dead-money, stack-off. W słowniczku ja mają tylko nazwę angielską. | Przyjęte nazwy japońskie do potwierdzenia źródłem: ドンクベット, ナッシュ均衡, オーバーコール, デッドマネー, ペイジャンプ, チップEV, スタックオフ, ギャップコンセプト, ポラライゼーション; m-ratio zostawić „M” (jak pl). |
| NISKIE | `content/ja/terms-def.yaml:17` (raise), `:25` (board), `:14`/`:16` (check, call) | Zdania o polszczyźnie („W polskich tekstach także »podbicie«”, „stół to karty, nie miejsce gry”, „nie mylić ze »sprawdzam«/»czekam«”) są w ja pominięte albo zaadaptowane (ostrzeżenie check↔call zostało bez polskich słów). To uzasadniona adaptacja, nie błąd; zapisuję, bo to jedyne miejsca, gdzie definicja ja ma mniej treści niż pl. | Bez zmiany. |

Uwaga do poprawek `null → nazwa` w S1.json: dla tych 19 kluczy w `content/ja` nie ma dziś ani jednego znacznika `{{t:klucz}}` (z formą ani bez), więc zmiana dotyka tylko słowniczka i wyszukiwania; po nałożeniu trzeba uruchomić `pnpm content:build` (strażnik `nazwy.ts`).

## Do ujednolicenia skryptem
- Poza częścią S1 (zauważone przy liczeniu form): `オフスーツ` (9 trafień w `content/ja`, m.in. `exams/m3.yaml`, `rules.yaml`, `lessons/m3-l3-zakresy-otwarc.md`) obok `オフスート` (18 trafień) dla tego samego pojęcia offsuit. Wzorzec: `オフスーツ` → `オフスート` (liczba: `grep -rhoF 'オフスーツ' content/ja | wc -l` = 9).
- Formy znaczników niezgodne z nazwą po poprawkach: `{{t:semi-connected|セミコネクト}}` (2 trafienia) → `セミコネクテッド`; `{{t:mixed-hand|混合ハンド}}` (4) wobec nazwy `ミックスハンド`; `{{t:payout|ペイアウト}}` (4) wobec `賞金`; `{{t:rake-cap|レーキキャップ}}` (2) wobec `レーキ上限`; `{{t:polarized|ポラライズド}}` (3) wobec `ポラライズ`; `{{t:connected|コネクト}}`/`コネクトした` (4+5) wobec `コネクテッド`. Te pliki należą do innych części; tu tylko sygnał.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `terms-nazwy.yaml:47–48`: hijack = „HJ”, cutoff = „CO” (pl: pełne nazwy Hijack/Cutoff, skrót osobno). W tekście przeważają formy skrótowe (`{{t:hijack|HJ}}` 17×, `{{t:cutoff|CO}}` 55×), ale definicje piszą „カットオフ”. Czy nazwą lokalną nie powinno być „ハイジャック”/„カットオフ” (analogicznie do poprawki button → „ボタン”)?
- `terms-nazwy.yaml:15`: wheel = null (potwierdzone wcześniejszą decyzją). W japońskich materiałach spotyka się też „ホイール”; bez przeczytanego źródła nie zgłaszam.
- `terms-nazwy.yaml:122`: risk-of-ruin = „破産リスク”; częstsze w japońskich tekstach o bankrollu wydaje się „破産確率” (definicja mówi o prawdopodobieństwie). Do potwierdzenia.
- `terms-nazwy.yaml:64`: mixed-hand = „ミックスハンド”; termin rzadki po japońsku (zwykle opisowo „混合戦略でプレイするハンド”). Zrozumiały, ale warto potwierdzić.
- `terms-def.yaml:30` (chips) i `:47` (button): „円盤” jako „krążek”. Poprawne, lecz przy Buttonie naturalniejsze byłoby „ディーラーボタン”; przy żetonach samo „円盤” brzmi technicznie.
- `terms-def.yaml:99` (semi-bluff): „カードが当たれば勝てます” (pl „gdy trafisz”); naturalniej „ドローが完成すれば”. Sens zachowany.
- `helplines.yaml:16`: w jednym akapicie „ご自身” i „あなた”; oba grzeczne, ale rodzimy użytkownik może woleć jedną formę zwrotu.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
`content/ja/helplines.yaml` wobec `content/helplines.yaml`:
- Pola nieprzekładalne identyczne: `checked` 2026-11-04, `review_by` 2027-11-04, `claim` H-INT-2 i H-INT-1, `online: [int-gambling-therapy]`, `regions: {}`, `id`, `country: '*'`, `kind`, `name` „Gambling Therapy (Gordon Moody)”, `links.label` „Gambling Therapy”, adres `https://www.gamblingtherapy.org/` (link i 3 źródła), cytaty źródeł. Numerów telefonów nie ma ani w pl, ani w ja.
- `pointer`: pl „Ten sam kontakt znajdziesz w aplikacji, w ekranie »Pomoc«.” → ja „同じ連絡先は、アプリの「ヘルプ」画面でも確認できます。” Zgodne; nazwa ekranu „ヘルプ” zgodna z interfejsem (`ja.json`: help/title = „ヘルプ”). Dodane „でも” („także”) nie zmienia sensu.
- `fallback.text`, zdanie 1: sygnały problemu z hazardem albo wątpliwości → lekarz albo specjalista zdrowia psychicznego: „医師または精神保健の専門家に相談してください”. Zgodne, oba warunki i obaj adresaci zachowani.
- `fallback.text`, zdanie 2: nagłe zagrożenie, „także gdy ty albo ktoś, kogo znasz, myśli o odebraniu sobie życia”, „od razu”, „lokalny numer alarmowy” → „緊急の危険があるときは、あなたや知り合いが自ら命を絶つことを考えている場合も含め、すぐに地域の緊急通報番号に電話してください。” Zgodne; nic nie pominięte, nie złagodzone ani nie wzmocnione.
- `regions_label`: „Numery w regionach” → „地域別の電話番号”. Zgodne.
- `info`: „Bezpłatne porady praktyczne i wsparcie emocjonalne online dla każdego, kogo dotyka hazard; poufnie.” → bezpłatne, praktyczne porady, wsparcie emocjonalne, online, dla każdego dotkniętego, poufność: wszystko zachowane; brak dopisków („anonimowo”, liczba języków).
- Wynik: brak znalezisk w treści krytycznej.
