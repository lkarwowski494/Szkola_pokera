# ja · U1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `apps/mobile/src/i18n/locales/pl.json` → `apps/mobile/src/i18n/locales/ja.json` | tak, wszystkie klucze para po parze (zestawienie klucz → pl → ja) | 48 kluczy pl bez odpowiednika w ja to wyłącznie formy `_one/_few/_many`; ja ma tylko `_other`, co jest poprawne dla japońskiego. Kluczy tylko w ja: 0. Parametry `{{…}}` i klucze `{{t:…}}` porównane też skryptem: zgodne we wszystkich kluczach. |
| `store/app-store-metadata.json` (`lokalizacje.pl`, `en-US` → `lokalizacje.ja`) | tak (name, subtitle, keywords, promotionalText, description) | Limity: name 19/30, subtitle 15/30, keywords 42/100 — w limitach. |
| `docs/sklep/aso/metadane-fala2.json` | nie dotyczy | ja nie ma w tym pliku (jest w `store/app-store-metadata.json`). |
| `store/iap-localizations.json` | tak | brak metadanych: plik ma tylko `pl` i `en`; lokalizacji zakupów dla ja nie ma. |
| `apps/mobile/src/i18n/locales/pl.kontekst.json` (pomocniczy) | nie w całości | Czytane tylko wpisy kluczy, przy których była wątpliwość (glossary, help, drill.vocab, drill.category, drill.texture.label, start.counter, purchase.unlocks, play.format). |
| `content/ja/terms-nazwy.yaml` (pomocniczy) | tak | |
| `docs/lokalizacja/glosariusz.md` (pomocniczy) | nie | Nie otwierany; terminologię sprawdzałem względem `terms-nazwy.yaml`. |
| `apps/mobile/src/i18n/locales/en.json` (pomocniczy) | nie w całości | Tylko pojedyncze klucze (glossary, drill.vocab, welcome, help, play.format). |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | `apps/mobile/src/i18n/locales/ja.json`:873, 872, 878, 879 | `drill.vocab.promptEnPl` „Co po polsku znaczy…” → „ポーランド語で何という意味ですか？”, podobnie `promptPlEn`, `line`, `lineAbbr`. Przekład wierny, ale pytanie o polski w japońskiej aplikacji byłoby błędem na ekranie. Według kodu (`features/drills/vocab.ts`, `vocabModes`) tryby pl-en i en-pl działają tylko w języku źródłowym, więc w ja te teksty się nie wyświetlają. | Bez zmiany; gdyby tryb kiedyś włączono poza pl, tekst trzeba napisać od nowa („日本語で…”). |
| NISKIE | `store/app-store-metadata.json`:27 | Słowa kluczowe ja zajmują 42 ze 100 znaków. To nie błąd przekładu, tylko niewykorzystane miejsce. | Decyzja ASO, poza zakresem recenzji. |
| NISKIE | `apps/mobile/src/i18n/locales/ja.json` (wiele kluczy `drill.*`, `play.report.detail.nutsYes`) | Tam, gdzie pl ma znacznik bez formy (`{{t:flush}}`, `{{t:draw}}`, `{{t:call}}`), ja ma znacznik z formą (`{{t:flush|フラッシュ}}`). Klucze są te same, formy zgodne z `terms-nazwy`; wyświetlany tekst jest poprawny. | Bez zmiany, o ile strażnik znaczników tego nie wymaga. |
| NISKIE | `store/iap-localizations.json` | Brak lokalizacji ja produktów zakupu (zgodnie z opisem pliku: tylko języki wydane). | Dopisać przy wydaniu ja z tekstów `purchase.*` (フルアクセス / 3か月 / 1年 / 永久アクセス). |

## Do ujednolicenia skryptem
Nic ponad poprawki w `U1.json`. Dla informacji: formy `connected`/`disconnected`/`texture` są niejednolite także w `content/ja` (np. `{{t:connected|コネクト}}` 4×, `コネクトした` 5×, `コネクテッド` 4×; `{{t:semi-connected|セミコネクテッド}}` 2×) — to zakres części L/R, nie U1.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `drill.category.pair` / `drill.categoryAcc.pair` (linie 626, 638): forma „ワンペア”, a `terms-nazwy` ma „ペア”. Jako nazwa układu „ワンペア” jest w japońskim naturalna i występuje w treści (9×); zostawiłem. Do decyzji, czy `terms-nazwy` ma dopuszczać obie formy.
- `drill.texture.summary` (linia 869): „このフロップは{{height}}、{{suits}}、{{ranks}}なので、{{wetness}}です” — po wstawieniu etykiet wychodzi np. „高い、レインボー、ペアボードなので、ドライです”; zrozumiałe, ale sklejka przymiotnika z rzeczownikami brzmi sztywno. Pl ma „czyli”, ja „なので” (wynikanie) — sens zbliżony.
- `play.report.detail.implied` (linia 483): „za pulą jest {{have}}bb” → „ポットの後ろには{{have}}bbあります”. Kalka pokerowego „behind”; czy czytelnik zrozumie to jako „pozostałe stacki”, czy lepiej „残りスタックは{{have}}bb”.
- `drill.texture.def.ranks.paired` (linia 824): „ペアボードのフロップ” — lekka tautologia wynikająca z nazwy terminu w `terms-nazwy`.
- `drill.drawCall.verdict*` (linie 773–776): „cena” → „価格”; zrozumiałe, ale w japońskich materiałach częściej mówi się o „オッズ/必要勝率”. Musi być zgodne z lekcjami M3 (poza tą częścią).
- Sklep, podtytuł: pl „Nauka pokera bez gry o stawki”, ja „判断ごとに評価と解説、賭けなし” — adaptacja ASO, informacja o braku stawek zachowana.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Interfejs:
- `welcome.noMoney` „To nauka bez gry na pieniądze.” → „これはお金を賭けない学習です。” — zgodne.
- `help.link` „Pomoc: gdy granie wymyka się spod kontroli” → „ヘルプ：ギャンブルがコントロールできなくなったら” — zgodne.
- `help.intro` „Poker na pieniądze to gra hazardowa. Jeśli granie przestaje być pod kontrolą, możesz skorzystać z pomocy poniżej.” → oba zdania oddane w pełni, bez złagodzenia.
- `help.call`, `help.callA11y`, `help.openA11y`, `help.openFailed` — parametry `{{phone}}`, `{{name}}`, `{{label}}`, `{{host}}`, `{{target}}` nienaruszone; sens zgodny. Numery i nazwy organizacji nie są w słowniku (pochodzą z `helplines.yaml`, poza tą częścią).
- `play.format` „{{t:chips|Żetony}} nie mają żadnej wartości.” → „{{t:chips|チップ}}に価値はありません。” — zgodne (bez wzmocnienia „一切”, ale sens „nie mają wartości” pełny).
- `play.report.result`, `play.report.variance`, `advancement.gameExplain` (wynik w żetonach nie wchodzi do wskaźnika) — zgodne.

Sklep (ja):
- Opis, zdanie 3: „To nauka, nie hazard: w aplikacji nie ma stawek, żetonów do wygrania ani gry na pieniądze.” → „これは学習用のトレーニングであり、ギャンブルではありません。賭け金も、獲得できるチップも、リアルマネーのプレイもありません。” — wszystkie trzy elementy obecne; „w aplikacji” domyślne.
- Tekst promocyjny: „Bez gry na pieniądze, bez konta, bez reklam.” → „リアルマネーのプレイなし、アカウント不要、広告なし。” — zgodne.
- Sekcja „ODPOWIEDZIALNIE”: ekran „Pomoc” z informacją, gdzie szukać pomocy przy problemie z hazardem → zgodne.
- Sekcja „DOSTĘP”: lekcje, ocena poziomu i pierwsze podejście do egzaminu zawsze darmowe; jedna darmowa aktywność dziennie; subskrypcja odnawia się automatycznie do anulowania w ustawieniach konta Apple — wszystkie warunki zachowane (poprawki w `U1.json` dotyczą tylko nazw planów).
- Podtytuł zawiera „賭けなし” (bez stawek).

Wynik: w treści krytycznej tej części nie ma zmienionej liczby, warunku ani odwróconego sensu.
