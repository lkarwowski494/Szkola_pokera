# zh-Hant · U1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `apps/mobile/src/i18n/locales/zh-Hant.json` (699 kluczy) vs `pl.json` | Tak: wszystkie 699 kluczy przekładu, każdy obok wartości pl tego samego klucza (zestawienie klucz po kluczu z numerami linii) | Z pl **nie czytałem osobno** 48 form `_one/_few/_many` (16 kluczy liczby mnogiej); porównanie z formą pl `_other`. zh-Hant ma tylko `_other`, co jest poprawne dla chińskiego. Parametry `{{…}}` i klucze `{{t:…}}` porównane też skryptem: 0 różnic (różnią się tylko formy po `\|`). |
| `locales/pl.kontekst.json` | Nie w całości | Odczytane tylko konteksty ok. 15 kluczy wątpliwych (m.in. `drill.drawCall.drawGutshot`, `help.link`, `welcome.noMoney`). |
| `store/app-store-metadata.json`: `lokalizacje.zh-Hant` vs `pl` (pomocniczo `en-US`) | Tak, wszystkie 5 pól | Limity: name 16/30, subtitle 16/30, keywords 43/100, promotionalText 50, description 797 (po poprawkach ok. 811). |
| `docs/sklep/aso/metadane-fala2.json` | Sprawdzone kluczem | Brak zh-Hant (język jest w pliku głównym). |
| `store/iap-localizations.json` | Tak | **Brak zh-Hant** (tylko pl, en) — „brak metadanych IAP” dla tego języka. |
| `content/zh-Hant/terms-nazwy.yaml` | Tak | Odniesienie terminologiczne. |
| `docs/lokalizacja/glosariusz.md` | Nie w całości | Tylko wyszukane wiersze (gutshot, kicker, early-position, bubble-factor). |
| `locales/en.json` | Nie | Otwarte tylko `help.*`. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | zh-Hant.json: 345, 420, 466, 288 i in. | Słowo 牌局 stoi jednocześnie za pl „sesja” (znacznik `t:session`, 3 miejsca — w U1.json), „rozdanie” (`play.autoNote`, `play.report.replay` „牌局回放”, `advancement.gameExplain` „牌局結果”) i „gra” (`play.freeHint`). Poza tym „rozdanie” to też 手/手牌 (`play.handOf`, `play.nextHand`, `start.title.scenario`). | Po zmianie `t:session` na 場次 rozważyć 牌局 → 手牌/這手牌 w `play.autoNote`, `play.report.replay`, `advancement.gameExplain`, żeby „rozdanie” miało jedną nazwę. Wymaga decyzji terminologicznej dla całego przekładu (treść ma 牌局×49 jako formę `session`). |
| NISKIE | store/app-store-metadata.json:36 | pl „To nauka, nie hazard: **w aplikacji** nie ma stawek…” → przekład bez „w aplikacji” (tak samo en-US). Sens zachowany. | Bez zmiany albo „App 內沒有賭注…”. |
| NISKIE | store/app-store-metadata.json:32–33 | name/subtitle nie są przekładem pl („trener strategii GTO” / „Nauka pokera bez gry o stawki”), tylko adaptacją ASO („德州撲克教學” / „每個決策都有評分與解說，不涉真錢”). Informacja o braku prawdziwych pieniędzy jest zachowana. | Bez zmiany (decyzja ASO, nie błąd przekładu). |

## Do ujednolicenia skryptem
- `{{t:session|牌局}}` → `{{t:session|場次}}`: w interfejsie 3 trafienia (wszystkie w U1.json). W `content/zh-Hant` forma 牌局 dla `session` wg komentarza w terms-nazwy ×49 — poza zakresem U1.
- `{{t:prize-pool|獎池}}` → `{{t:prize-pool|獎金池}}`: interfejs 5 trafień (wszystkie w U1.json).
- `{{t:regular|常客}}` → `{{t:regular|常規玩家}}`: interfejs 2 trafienia (wszystkie w U1.json).
- Opis sklepu: 單元 → 模組 (3), 課堂 → 課程 (2) — wszystkie w U1.json.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `help.link` (316): pl „gdy **granie** wymyka się spod kontroli” → „當**賭博**失去控制時” (en: „when gambling gets…”). Przekład idzie za en, nie za pl; w `help.intro` to samo „granie” oddano jako 遊戲行為. Czy ujednolicić (np. 「當玩牌失去控制時」), czy zostawić 賭博 jako naturalniejsze na Tajwanie?
- `help.intro` (317): 「遊戲行為」 — na Tajwanie 遊戲 kojarzy się z grami wideo; czy lepiej 「玩牌」/「賭博行為」?
- `drill.drawCall.drawGutshot` po poprawce na „gutshot”: zdanie 「你有gutshot。」 (parametr bez spacji) — czy lepiej wartość 「gutshot 聽牌」? W treści współistnieją „gutshot” (48×) i 卡順 (17×).
- `drill.whoWins.reason.kicker` (672): 「邊牌（踢腳）」 za pl „karta boczna (kicker)”; terms-nazwy `kicker` = null [DO USTALENIA], w treści 踢腳 60×, „kicker” 11×. Zostawiłem.
- `drill.icm.callExplanation` (713): 「泡沫因子（bubble factor）」 — `bubble-factor` = null; forma z angielską nazwą w nawiasie wygląda poprawnie, do potwierdzenia przy ustalaniu terminu.
- `play.tableSizeHint9` (360): „wczesne pozycje” → 前段位置; terms-nazwy `early-position` = 前位.
- `session.sizeError`, `play.report.detail.size`: „rozmiar” → 尺寸 (czy 下注尺度/大小 naturalniejsze?).
- `play.report.replay`: 回放 (częstsze w ChRL; na Tajwanie też 重播).
- Sklep: nagłówek pl „DOSTĘP” → 「使用方式」 („sposób użycia”); może 「免費與完整存取」.
- Sklep: 「理性遊戲」 za „ODPOWIEDZIALNIE” (en „Play responsibly”) — czy 「負責任博弈」/「理性娛樂」 jest bardziej utarte?

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- `welcome.noMoney`: „To nauka bez gry na pieniądze.” → 「這是學習，不涉及真錢遊戲。」 — zgodne (dodane „prawdziwe” pieniądze, bez zmiany sensu).
- `play.format`: „Żetony nie mają żadnej wartości.” → 「籌碼沒有任何價值。」 — zgodne; 100bb zachowane.
- `help.intro`: „Poker na pieniądze to gra hazardowa. Jeśli granie przestaje być pod kontrolą, możesz skorzystać z pomocy poniżej.” → zgodne co do sensu (uwaga stylistyczna wyżej).
- `help.link`: „granie” → 賭博 — odstępstwo od pl opisane w „Do sprawdzenia”; nie zmienia liczby, warunku ani kierunku.
- `help.call`, `help.callA11y`, `help.openA11y`, `help.openFailed`: parametry `{{phone}}`, `{{name}}`, `{{label}}`, `{{host}}`, `{{target}}` nienaruszone; sens zgodny. Numerów i nazw organizacji w słowniku nie ma (są w `helplines.yaml`, poza U1).
- Sklep, subtitle: 「不涉真錢」 — obecne. promotionalText: „Bez gry na pieniądze, bez konta, bez reklam” → 「沒有真錢遊戲、不需帳號、沒有廣告」 — zgodne.
- Sklep, description: „To nauka, nie hazard: w aplikacji nie ma stawek, żetonów do wygrania ani gry na pieniądze.” → 「這是訓練，不是賭博：沒有賭注、沒有可贏取的籌碼，也沒有真錢遊戲。」 — wszystkie trzy elementy obecne; brak tylko „w aplikacji”. „Ekran »Pomoc« z informacją, gdzie szukać pomocy przy problemie z hazardem” → 「「協助」畫面提供賭博問題的求助管道」 — zgodne, nazwa ekranu jak w aplikacji.
- Sklep, sekcja dostępu: jedna darmowa aktywność dziennie, lekcje/ocena poziomu/pierwsze podejście zawsze darmowe, automatyczne odnawianie do anulowania w ustawieniach konta Apple, jednorazowy dostęp dożywotni — wszystko zgodne z pl; liczby 8 i 15 zachowane.
- Wynik: 0 znalezisk KRYT.
