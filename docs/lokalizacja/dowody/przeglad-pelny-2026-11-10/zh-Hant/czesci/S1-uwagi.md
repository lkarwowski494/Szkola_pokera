# zh-Hant · S1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/zh-Hant/areas.yaml` | tak | Brak tekstu do przekładu; plik identyczny z pl (`diff` pusty). |
| `content/zh-Hant/modules.yaml` | tak | 14/14 modułów; pola `id`, `order`, `phase`, `recommended` zgodne z pl (porównanie programowe). 1 poprawka. |
| `content/zh-Hant/ranges/spots.yaml` | tak | Nakładka: przeczytany pełny `diff` wobec `content/ranges/spots.yaml` (wszystkie 34 spoty; różnią się tylko `title`, klucze `groups`, klucz i tekst `wrongSizes`); pola nietekstowe (id, hero, path, akcje, listy rąk) zgodne programowo. 1 poprawka. |
| `content/zh-Hant/helplines.yaml` | tak | TREŚĆ KRYTYCZNA; wynik niżej. Bez poprawek. |
| `content/zh-Hant/terms-def.yaml` | tak | 162/162 definicje porównane z polem `def` tego samego klucza w `content/terms.yaml` (zestawienie klucz po kluczu); zestaw i kolejność kluczy zgodne. 7 poprawek. |
| `content/zh-Hant/terms-nazwy.yaml` | tak | 162/162 nazwy porównane z polami `pl`, `en`, `abbr`, `en_alt` z `content/terms.yaml`. Z `docs/lokalizacja/glosariusz.md` przeczytałem nagłówek z zasadami, pierwsze i ostatnie wiersze oraz kolumnę „Uwagi” wszystkich wierszy; kolumn „Znaczenie”/„Przekład en” nie czytałem osobno wiersz po wierszu, bo glosariusz jest generowany z `terms.yaml`, które przeczytałem. 1 poprawka. |

Z `content/terms.yaml` czytałem pola `pl`, `en`, `abbr`, `en_alt`, `def` wszystkich 162 terminów oraz nagłówek pliku; pól `forms`, `skip`, `source`, `lesson` nie czytałem (nie są przekładane). Znaków uproszczonych w plikach części nie znalazłem (przegląd ręczny i skan listą częstych znaków uproszczonych).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | `content/zh-Hant/exams/m10.yaml:43` (poza częścią S1) | Skutek poprawki `set: "暗三條"`: forma `{{t:set|三條}}` w tym samym zadaniu co `{{t:set}}` (linia 47) da dwie różne nazwy. | Zmienić formę na `{{t:set|暗三條}}` (pl: „trafiłeś seta”). |
| ŚR | `terms-nazwy.yaml:27–28` | `board` i `community-cards` mają tę samą nazwę 公共牌 (pl: „stół” i „karty wspólne” to dwa terminy). W słowniczku i ćwiczeniu słownictwa dwa hasła o identycznej nazwie; w treści board ma formy 公共牌 54× i 牌面 40×. | Rozważyć `board: "牌面"` (przyjęta nazwa „board” na Tajwanie, używana też w definicjach: 牌面結構, 「在牌面上」). Zmienia renderowanie 5 znaczników `{{t:board}}` bez formy — do decyzji. |
| ŚR | `terms-nazwy.yaml:69, 81` | `connectors` (karty własne, pl „konektory”) i `connected` (stół, pl „połączony”) mają tę samą nazwę 連張; w treści connected ma też formy 相連 4×, 連接 1×. Dwa hasła słowniczka o identycznej nazwie. | Rozróżnić, np. `connected: "相連"` albo „連張牌面” — wybór dla rodzimego użytkownika. |
| ŚR | `terms-nazwy.yaml:49` | `button: "BTN"`, a w całym przekładzie pozycja nazywa się 按鈕位 (335× w treści, także we wszystkich definicjach i w `spots.yaml`); pl ma pełną nazwę „Button” ze skrótem BTN. Słowniczek pokaże „BTN”, którego czytelnik w lekcjach prawie nie widzi. | `button: "按鈕位"` (znacznik bez formy: 0 użyć, więc zmiana dotyczy tylko słowniczka/ćwiczenia słownictwa). |
| ŚR | `terms-nazwy.yaml` (null, [DO USTALENIA]) | Terminy z nazwą `null` (słowniczek pokaże nazwę angielską), dla których przekład konsekwentnie używa chińskiej nazwy zwykłym tekstem, bez znacznika: kicker → 踢腳 (60×), check-raise → 過牌加注 (60×), tilt → 上頭 (57×), ante → 前注 (52×), bluff-catcher → 抓詐 (39×), gutshot → 卡順 (22×), backdoor → 後門 (12×), pot-odds → 底池賠率 (8×), fold-equity → 棄牌權益 (8×), stack → 籌碼量 (87×), heads-up → 單挑 (7×), polarization → 極化 (przy polarized = 極化). Czytelnik uczy się chińskiej nazwy w lekcji, a w słowniczku znajduje tylko angielską. | Wpisać nazwy chińskie dla tych kluczy (wszystkie mają 0 znaczników bez formy, więc tekst lekcji się nie zmieni). Decyzja K-05, dlatego bez poprawki mechanicznej. |
| NISKIE | `terms-nazwy.yaml:123` | `mental-game: null` → jedyny `{{t:mental-game}}` bez formy wyświetli angielskie „mental game” w chińskim zdaniu; tytuł modułu m12 ma 心態. | `mental-game: "心態"` albo forma w miejscu użycia. |
| NISKIE | `terms-def.yaml:17` | pl „W polskich tekstach także «podbicie»” → 「中文也稱「加碼」」: adaptacja lokalna, nie przekład; poprawna tylko, jeśli 加碼 rzeczywiście jest używanym synonimem raise (patrz „Do sprawdzenia”). | Jeśli nie — usunąć zdanie. |

## Do ujednolicenia skryptem
Brak (żaden błąd nie powtarza się ponad 10 razy w plikach części).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- `terms-def.yaml:17`: czy „加碼” jest na Tajwanie przyjętym synonimem „加注” (raise) w pokerze? W treści poza tą definicją pojawia się 1×.
- `terms-nazwy.yaml:126` shove = 推全下: czy naturalniejsze nie jest samo „全推”/„推” (w treści formy 推 8×, 全推 2×)?
- `terms-nazwy.yaml:156` nit = 岩石型玩家: „岩石” to raczej „rock”; czy dla „nit” nie jest przyjęte „緊弱玩家” albo angielskie „nit”?
- `terms-nazwy.yaml:117` winrate = 贏率 (w treści 100×) wobec 勝率 (14×, koliduje z equity): potwierdzić 贏率 jako nazwę tajwańską.
- `terms-nazwy.yaml:50` outs = 補牌: czy czytelnik tajwański nie zna tego raczej jako „outs”/„出路”?
- `terms-nazwy.yaml:119` session = 場次, `:128` bubble = 泡沫 (wobec 泡沫期), `:97` condensed = 壓縮: nazwy zrozumiałe, przyjętość do potwierdzenia.
- `modules.yaml:14` „手牌複盤”: 複盤 bywa odbierane jako słowo z Chin kontynentalnych; alternatywa „手牌檢討”.
- `terms-def.yaml:130` (m-ratio): pl ma w nawiasie angielskie „(orbit)”; przekład je pomija („撐幾整圈”) — sens zachowany, do decyzji, czy dodać „(orbit)”.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
`content/zh-Hant/helplines.yaml` wobec `content/helplines.yaml` — różnią się tylko 4 pola tekstowe; wszystko inne (daty `checked`/`review_by`, `claim`, `online`, `id`, `country`, `kind`, `name` „Gambling Therapy (Gordon Moody)”, `label`, adres `https://www.gamblingtherapy.org/`, `sources`) jest identyczne znak w znak. Numerów telefonów w źródle nie ma (`regions: {}`).

| Pole | pl | zh-Hant | Wynik |
|---|---|---|---|
| `pointer` | Ten sam kontakt znajdziesz w aplikacji, w ekranie „Pomoc”. | 你也可以在 App 的「協助」畫面找到同樣的聯絡資訊。 | Zgodne; nazwa ekranu = `協助` jak w interfejsie (`zh-Hant.json`, „help”/„title”). Dodane „也” nie zmienia sensu. |
| `fallback.text` zd. 1 | Jeśli rozpoznajesz u siebie sygnały problemu z hazardem albo masz wątpliwości, porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego. | 如果你發現自己有賭博問題的徵兆，或不確定是否如此，請和醫師或心理健康專業人員談談。 | Zgodne: oba warunki, obaj adresaci (lekarz albo specjalista zdrowia psychicznego). |
| `fallback.text` zd. 2 | W nagłym zagrożeniu, także gdy ty albo ktoś, kogo znasz, myśli o odebraniu sobie życia, od razu dzwoń na lokalny numer alarmowy. | 遇到緊急情況，包括你或你認識的人有輕生的念頭時，請立即撥打當地的緊急電話。 | Zgodne: „także gdy”, „ty albo ktoś, kogo znasz”, „od razu”, „lokalny numer alarmowy” zachowane; nic nie złagodzone ani wzmocnione. |
| `regions_label` | Numery w regionach | 各地區電話 | Zgodne. |
| `entries[0].info` | Bezpłatne porady praktyczne i wsparcie emocjonalne online dla każdego, kogo dotyka hazard; poufnie. | 為所有受賭博影響的人提供免費的線上實用建議與情緒支持；保密。 | Zgodne: bezpłatne, praktyczne porady, wsparcie emocjonalne, online, dla każdego, poufnie; bez dodanych „anonimowo”/liczby języków. |

Wynik: brak znalezisk KRYT/WYS w treści krytycznej.
