# ja · L7 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m11-l1-push-fold.md | tak (178/178 linii, pl i ja) | bez błędów sensu; zapis „プッシュ／フォールド” do ujednolicenia (niżej) |
| content/ja/lessons/m11-l2-sprawdzanie.md | tak (176/176) | bez znalezisk |
| content/ja/lessons/m11-l3-icm.md | tak (169/169) | 4 poprawki terminu payout (ŚR) |
| content/ja/lessons/m13-l1-raport.md | tak (109/109) | 2 poprawki cytatu z interfejsu (ŚR) |
| content/ja/lessons/m13-l2-powtorki.md | tak (97/97) | 2 poprawki pisowni (NISKIE) |
| content/ja/lessons/m13-l3-przeglad.md | tak (88/88) | bez znalezisk |

Pomocniczo czytane: `content/ja/terms-nazwy.yaml` (całość), wybrane wpisy `content/numbers.yaml` (jednostki liczb w zdaniach), `apps/mobile/src/i18n/locales/ja.json` i `pl.json` (tylko nazwy werdyktów raportu, napis „Oceniono…”, „Gra swobodna”). Glosariusz `docs/lokalizacja/glosariusz.md`: tylko wiersz `push-fold` (nie czytany w całości). Wersji `en` nie otwierałem. Wcześniejszych przeglądów ani `docs/decyzje.md` nie czytałem.

Kontrola mechaniczna (skrypt, linia po linii pl ↔ ja, wszystkie 6 plików): zgodna liczba linii; identyczne zbiory i liczby `{{n:…}}`, kluczy `{{t:…}}`, `[[…]]`, `R-M…` w każdej linii; pola YAML nieprzekładalne (id, family, rules, answer, generator, params, count, spot, table) identyczne; brak uszkodzonych znaczników. Kierunek par liczb przy zmienionym szyku zdania (ryzyko/wygrana, dopłata/pula, „zamiast”, strata/zysk) sprawdzony ręcznie w każdym miejscu — zgodny z pl.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/lessons/m13-l1-raport.md:105 | pl „po ok. {{n:m13.noise.hands.k}} tys. rąk” → „約{{n:m13.noise.hands.k}}千ハンド”; liczba to 2,5, więc na ekranie „約2.5千ハンド” — zrozumiałe, ale po japońsku nienaturalne (pisze się 約2,500ハンド). Znacznik musi zostać, więc bez zmiany klucza w `numbers.yaml` nie da się tego poprawić w przekładzie. Ten sam wzorzec jest poza częścią (`exams/m12.yaml:16`). | Decyzja po stronie źródła liczb (osobny klucz w rękach zamiast w tysiącach) albo zostawić. |
| NISKIE | content/ja/lessons/m13-l1-raport.md:107 i m13-l2-powtorki.md:95, m13-l3-przeglad.md:86 | pl trzy razy ten sam nagłówek ramki „Skąd te zasady” → ja trzy różne: „これらの原則の出典”, „これらのルールの根拠”, „この原則の出典”. Wszystkie poprawne. | Można ujednolicić do „これらの原則の出典”. |

## Do ujednolicenia skryptem
- `プッシュ／フォールド` (ukośnik pełnej szerokości) → `プッシュ/フォールド` w `content/ja/lessons/m11-l1-push-fold.md`: 6 wystąpień w 5 liniach (`grep -c` = 5; linie 15, 26, 108, 117, 123). Reszta przekładu ma ukośnik zwykły: `rules.yaml` 8 linii, `exams/m11.yaml` 1, `modules.yaml` 1, `m11-l3-icm.md` 1. Waga NISKIE (jedna nazwa na pojęcie, tylko zapis).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m11-l3-icm.md:161 — pl „w pojedynczym rozdaniu sprawdza … rąk” → „単一のハンドでは…のハンドでコールします”: „ハンド” dwa razy w jednym zdaniu w dwóch znaczeniach (rozdanie / ręce). Czy czytelniej byłoby „1回きりのハンド（賞金のない勝負）では”? Sens zgodny z pl.
- m11-l3-icm.md:39 (po poprawce) — „{{n}}/{{n}}の{{t:payout|賞金}}では”: czy rodzimy użytkownik wolałby „賞金配分では” (forma złożona z nazwą 賞金)?
- Terminy z `null` w `terms-nazwy` oznaczone [DO USTALENIA], w pl bez znacznika, w ja zapisane katakaną konsekwentnie w całej części: バブルファクター (bubble factor), フォールドエクイティ (fold equity), アンティ (ante), リンプ, ミニマムレイズ; „gap concept” zostawione po angielsku w cudzysłowie (m11-l2:134). Naturalne, ale nazwa nie jest ustalona w słowniku — do potwierdzenia przy ustalaniu `terms-nazwy`.
- „Button” (pl bez znacznika) → „ボタン” w m11-l1/l2/l3 i m13-l2, podczas gdy `terms-nazwy` ma `button: "BTN"`. W całym przekładzie ja „ボタン” jest powszechne w zdaniach, więc nie zgłaszam jako błędu.
- Stack „krótki/krótszy”: m11-l1 „浅い” („スタックが浅いほど広く”), m11-l2 i m11-l3 „短い”. Oba używane w japońskim pokerze; ewentualnie ujednolicić.
- m13-l2-powtorki.md:33–35 — werdykt „Dopuszczalna” oddany opisowo „許容範囲の判断”, nazwa werdyktu w interfejsie to „許容”. Zrozumiałe; czy trzymać dokładną nazwę?

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części nie ma treści modułu 12 ani tekstów o prawdziwych pieniądzach. Lekcja m13-l1 odwołuje się do reguły `R-M12-004` (pole `rules` i zadanie `m13.l1.q-result`): identyfikator bez zmian, zadanie i uzasadnienia porównane zdanie po zdaniu — zgodne z pl (decyzja ważniejsza niż wynik; „kilkadziesiąt rozdań”, „nawet po tysiącach rąk” oddane dokładnie).
