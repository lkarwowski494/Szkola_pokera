# Drugi przegląd AI przekładu: ja, zh-Hant (SC-04, 05, 06, 08, 32, 33, 34; R-M11-009)

Data: 2026-11-11. Tylko odczyt repo. Kontrola mechaniczna znaczników i cyfr pominięta (zrobiona wcześniej).

## ja: PRZYJĄĆ Z POPRAWKAMI

Sens, liczby, kierunki („więcej/mniej”, „węziej”, „wyższy próg”) i warunki zgodne ze źródłem we wszystkich 37 kluczach. Rejestr です/ます jednolity. Teksty SC-04 i SC-05 (cbet-case) są identyczne z już przyjętymi SC-11 i SC-12 (ja/scenarios/sc-11.yaml:24–28, sc-12.yaml:24–28), więc są spójne.
Termin 3-bet: wszędzie „3ベット” (276 wystąpień w content/ja, 0 × „スリーベット”; forma znacznika `{{t:3-bet|3ベット}}` w sc-01:4, sc-02:4, sc-03:4). Nowe SC-08 pisze „3ベット” bez znacznika, tak jak źródło pl. Spójne; wpis [DO USTALENIA] w ja/terms-nazwy.yaml (`3-bet: "3ベット"`) można zamknąć tą formą.
バブルファクター w R-M11-009 zgodne z lekcją (ja/lessons/m11-l3-icm.md:5, :47).

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| scenarios/sc-06.yaml:decisions.1:size-spot.actions.raise.explanation | Zdanie przyczynowe zbudowane w kółko: „{{n:pf.open-size-sb}}までレイズするのは、…プレイするので、…少し大きくするためです” = „przebijasz do 3bb, żeby było trochę więcej niż 2,5bb”. Źródło: przyczyną jest gra bez pozycji, „trochę więcej” to skutek. Sens czytelny, logika zdania zaburzona. | „{{n:pf.open-size-sb}}まで{{t:raise\|レイズ}}するのは、{{t:small-blind\|スモールブラインド}}からは{{t:out-of-position\|アウトオブポジション}}でプレイするからです。そのため、他の{{t:position\|ポジション}}の{{n:pf.open-size}}より少し大きくします。” | NIS | wysoka | ja/scenarios/sc-06.yaml:30; ten sam układ „…のは、…からです” w sc-08:31 |
| scenarios/sc-34.yaml:decisions.0:icm-call.actions.fold.explanation, …actions.call.explanation | „gra o żetony” oddana jako „{{t:chips\|チップ}}だけのゲーム”, a reguła R-M11-009.because w tym samym przekładzie ma „{{t:chips\|チップ}}を賭けたゲーム”, lekcja M11 „{{t:chips}}のゲーム”. Jedno pojęcie, trzy brzmienia. | w obu kluczach: „このしきい値が{{t:chips\|チップ}}を賭けたゲームより高いのは、…” | NIS | wysoka | ja/rules.yaml:1144; ja/lessons/m11-l3-icm.md:62 |

## zh-Hant: PRZYJĄĆ Z POPRAWKAMI

Sens, liczby, kierunki i warunki zgodne ze źródłem we wszystkich 37 kluczach. Zwracanie się „你”, znaki tradycyjne, bez znaków uproszczonych; słownictwo zgodne z glosariuszem i ze starszymi szablonami (開池, 過牌, 牌面, 持續下注, 範圍優勢, 無位置/有位置, 推全下, 主動權). Pełnoszerokie ，：；（） jak w starszych szablonach. SC-04 i SC-05 (cbet-case) identyczne z przyjętymi SC-11 i SC-12. „3-bet” zapisany po angielsku, zgodnie z `{{t:3-bet|3-bet}}` w sc-01:4, sc-02:4.

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| scenarios/sc-33.yaml:decisions.0:range-spot.actions.call.explanation | equity oddane jako „勝率”; glosariusz i reszta tekstów: „權益” (293 ×; „勝率” poza tym tylko w sc-33 i jako „攤牌勝率”). „勝率” koliduje z winrate (uwaga w terms-nazwy.yaml:117). Ten sam przekład w SC-34 i R-M11-009 używa „權益”. | „…所以你需要約 {{n:m11.call.10.eq}} 的權益。” | ŚR | wysoka | zh-Hant/terms-nazwy.yaml:59, :117; zh-Hant/scenarios/sc-33.yaml:19 |
| scenarios/sc-33.yaml:decisions.0:range-spot.actions.fold.explanation | jak wyżej („勝率” zamiast „權益”) | „…所以你只需要約 {{n:m11.call.10.eq}} 的權益。” | ŚR | wysoka | zh-Hant/scenarios/sc-33.yaml:21 |
| rules.yaml:R-M11-009.then | Bubble factor jako „泡沫因子”, a lekcja, do której reguła odsyła („w przykładzie z lekcji”), nazywa go „泡沫係數” (tytuł lekcji i 12 wystąpień; „泡沫因子” 5 × tylko w egzaminie). Jedna nazwa na jedno pojęcie. Dodatkowo „BF ÷ （BF + 1）”: spacja przed nawiasem pełnej szerokości; lekcja ma „BF ÷ (BF + 1)”. | „你需要的權益是 BF ÷ (BF + 1)，其中泡沫係數 BF = 輸時損失的權益 ÷ 贏時增加的權益；在課程的範例中是 {{n:m11.bf.req}}，而以{{t:chips\|籌碼}}計算時是 {{n:m11.bf.req-chips}}” | ŚR | wysoka | zh-Hant/lessons/m11-l3-icm.md:5, :141, :150, :156; zh-Hant/rules.yaml:1143 |
| scenarios/sc-04.yaml:situation, …range-spot.actions.raise 2.5.explanation, …range-spot.actions.fold.explanation | „nikt nie wszedł do gry / nobody has entered the pot” jako „還沒有人入局”; w pozostałych tekstach zh-Hant „入池” (28 ×, w tym dokładnie „還沒有人入池”); „入局” występuje tylko w tych trzech kluczach. | „…，還沒有人入池；…” (situation) i „…，{{w:stol}}，還沒有人入池。…” (oba explanation) | ŚR | wysoka | zh-Hant/lessons/m3-l2-rece-startowe.md:22; zh-Hant/scenarios/sc-04.yaml:5, :23, :25 |
| scenarios/sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | „按鈕” zamiast „按鈕位”; glosariusz button = „按鈕位”, 386 wystąpień „按鈕位”, samo „按鈕” poza tym tylko w „莊家按鈕” w lekcji M3. | „…所以你{{t:open\|開池}}的範圍大約和按鈕位一樣寬，約 {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} 的手牌，而這手牌在其中。” | ŚR | wysoka | zh-Hant/terms-nazwy.yaml (button: "按鈕位"); zh-Hant/scenarios/sc-05.yaml:5 |
| scenarios/sc-34.yaml:decisions.0:icm-call.actions.fold.explanation, …actions.call.explanation | „gra o żetony” jako „只算{{t:chips\|籌碼}}時”, a R-M11-009.because i lekcja M11 mają „以{{t:chips\|籌碼}}計價的遊戲”. | w obu kluczach: „這個門檻比以{{t:chips\|籌碼}}計價的遊戲高，因為…” | NIS | średnia | zh-Hant/rules.yaml:1144; zh-Hant/lessons/m11-l3-icm.md:62, :153 |

## Do sprawdzenia przez człowieka

1. ja i zh-Hant, wszystkie klucze range-spot przed flopem (SC-04, 05, 06, 08, 32, 33, „{{w:stol}}、” / „{{w:stol}}，”): przed flopem {{w:stol}} wstawia nazwę ulicy (apps/mobile/src/features/scenariusz/wariant.ts:308; ja „プリフロップ”, zh „翻牌前”). Wychodzi z tego samodzielny rzeczownik wtrącony w zdanie („…を持ち、プリフロップ、まだ誰も…”, „…拿著 [[…]]，翻牌前，還沒有人…”). Tak samo jest w en i pl, więc to decyzja wzorca, nie błąd przekładu. Gdyby to poprawiać: „{{w:stol}}で、” (ja) i „{{w:stol}}時，” (zh). Do oceny na telefonie.
2. ja sc-34 (oba explanation): „{{t:bubble|バブル}}の{{w:pozycja}}で{{w:reka}}を持ち” czyta się jak „na BB bańki”. Zrozumiałe, ale może brzmieć lepiej „{{t:bubble|バブル}}の局面で、あなたは{{w:pozycja}}で{{w:reka}}を持ち”. Brak pewności, co jest bardziej naturalne dla gracza japońskiego.
3. zh-Hant SC-05 bet-small: `{{t:connected|連張}}` (tekstura flopu) i `{{t:connectors|連張}}` (ręce) mają tę samą nazwę w jednym zdaniu. Tekst jest przejęty z przyjętego SC-12, a przyczyna leży w glosariuszu (zh-Hant/terms-nazwy.yaml: connected i connectors = „連張”). Narusza to zasadę jednej nazwy na jedno pojęcie, ale trzeba to rozstrzygnąć w glosariuszu, nie w tym przekładzie.
4. zh-Hant: glosariusz `bubble-factor: null [DO USTALENIA]`. Jeśli poprawka R-M11-009 zostanie przyjęta, warto wpisać „泡沫係數” i ujednolicić egzamin M11 (zh-Hant/exams/m11.yaml:59, 64, 68: „泡沫因子”).

## Liczby znalezisk

- ja: KRYT 0, WYS 0, ŚR 0, NIS 2
- zh-Hant: KRYT 0, WYS 0, ŚR 5, NIS 1 (wiersze tabeli; SC-33 liczone jako 2 klucze, SC-04 jako 1 wiersz obejmujący 3 klucze)
