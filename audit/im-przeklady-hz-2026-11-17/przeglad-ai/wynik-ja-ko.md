# Drugi przegląd AI: ja, ko (sc-09, 16, 18, 21, 26, 27, 30), 2026-11-17

Tryb: tylko odczyt. Wzorzec: pl + en. Terminy sprawdzone w `content/{ja,ko}/terms-nazwy.yaml`. Wszystkie znaczniki `{{t:…|forma}}` mają formy zgodne z nazwami w terms-nazwy. Pozycja znaczników `{{n:}}` i `{{w:}}` jest w każdym tekście zgodna z sensem wzorca. Żaden tytuł nie jest wyraźnie za długi; najdłuższy jest ja sc-09, ok. 67 znaków ważonych.

## 1. Tabela

| język | szablon | werdykt | ID znalezisk |
|---|---|---|---|
| ja | sc-09 | OK | — (pytanie 1) |
| ja | sc-16 | uwagi NISKIE | ja-sc-16-1 |
| ja | sc-18 | OK | — |
| ja | sc-21 | OK | — |
| ja | sc-26 | OK | — |
| ja | sc-27 | OK (problem wzorca, sekcja 4) | — |
| ja | sc-30 | uwagi NISKIE | ja-sc-30-1 |
| ko | sc-09 | OK | — |
| ko | sc-16 | OK | — |
| ko | sc-18 | OK | — |
| ko | sc-21 | ŚREDNIE | ko-sc-21-1 |
| ko | sc-26 | uwagi NISKIE | ko-sc-26-1 |
| ko | sc-27 | OK (problem wzorca, sekcja 4) | — |
| ko | sc-30 | OK | — |

Terminy ko oznaczone [DO USTALENIA] (`second-barrel` 세컨드 배럴, `isolation` 아이솔레이션): w sc-18 i sc-09 każde użycie jest zgodne z terms-nazwy i spójne w całym szablonie. Nazw nie oceniam, bo nie mają źródła (znane otwarte).

## 2. Znaleziska

### ko-sc-21-1 · ŚREDNIE · Dwa identyczne zdania „체크합니다. 체크합니다.”
- Pole: explanation akcji `check`.
- Obecnie: „…{{w:rywal}} 위치의 상대가 턴에서 {{t:check|체크}}합니다. {{t:check|체크}}합니다. 플롭에서…”
- Wzorzec: „…a rywal z {{w:rywal}} {{t:check|czeka}} na turnie. {{t:check|Czekasz}}, bo…” / „…{{t:check|checks}} on the turn. You {{t:check}}, because…”
- Problem: w drugim zdaniu nie ma podmiotu, więc czyta się je jak powtórzenie pierwszego. Nie widać, że teraz czeka gracz, a nie rywal. Inne szablony ko nie mają tego problemu, bo w nich akcje się różnią (올인합니다. 콜합니다.).
- Proponowane: „당신은 {{w:pozycja}} 위치에서 {{w:reka}} 핸드를 들고 있고, {{t:board|보드}}는 {{w:stol}}이며, {{w:rywal}} 위치의 상대가 턴에서 {{t:check|체크}}합니다. 당신도 {{t:check|체크}}합니다. 플롭에서 {{t:call|콜}}한 뒤의 상대는 보통 플롭에서보다 강한 {{t:range|레인지}}를 가지고 있어서, 더 이상 걱정 없이 {{t:bet|베팅}}할 수 없기 때문입니다. 리버까지 카드가 한 장 남았으므로 이 핸드는 보호로 얻는 것이 적고, {{t:check|체크}}하면 {{t:pot|팟}}을 작게 유지하며 싸게 {{t:showdown|쇼다운}}까지 갑니다.”
- Pewność: wysoka.

### ja-sc-16-1 · NISKIE · Brak rzeczownika „レイズ” w zdaniu o zbyt małym rozmiarze
- Pole: explanation akcji `raise-small`.
- Obecnie: „{{t:c-bet|Cベット}}の約{{n:xr.too-small.mult}}までは小さすぎます”
- Wzorzec: „do ok. {{n:xr.too-small.mult}} {{t:c-bet|c-betu}} jest za mały” / „a {{t:raise}} to about … the {{t:c-bet}} is too small”
- Problem: zdanie nie mówi, co jest za małe (dosłownie „do ok. 1,5x Cベット jest za małe”). Da się je zrozumieć, ale brzmi nienaturalnie.
- Proponowane: „{{t:check-raise|チェックレイズ}}自体は良い考えですが、{{t:c-bet|Cベット}}の約{{n:xr.too-small.mult}}までの{{t:raise|レイズ}}は小さすぎます：…” (dalej bez zmian).
- Pewność: średnia.

### ja-sc-30-1 · NISKIE · Zniknęło porównanie „nie wypada lepiej”
- Pole: explanation akcji `fold`.
- Obecnie: „{{t:3-bet|3ベット}}そのものに対しても、あなたのハンドが有利になることはありません。”
- Wzorzec: „wobec samego {{t:3-bet|3-betu}} twoja ręka nie wypada lepiej” / „against the {{t:3-bet}} itself your hand does no better”
- Problem: przekład znaczy „nie będzie mieć przewagi” zamiast „nie wypada lepiej (niż wobec rąk z VPIP)”. Logika wzorca (zakres 3-betu jest częścią najsilniejszych rąk, więc equity nie rośnie) staje się mniej czytelna. Kierunek rady się nie zmienia.
- Proponowane: „仮定により相手の{{t:3-bet|3ベット}}はそれらのハンドの中に収まるので、{{t:3-bet|3ベット}}そのものに対しても、あなたのハンドの結果がそれより良くなることはありません。”
- Pewność: średnia.

### ko-sc-26-1 · NISKIE · Nieskładna konstrukcja „핸드로 … 충분합니다”
- Pole: explanation akcji `call`.
- Obecnie: „이런 {{t:spr|SPR}}에서는 {{t:top-pair|탑 페어}}와 그보다 좋은 핸드로 스택 전체를 걸고 플레이하기에 충분합니다.”
- Wzorzec: „{{t:top-pair|najwyższa para}} i lepsze ręce wystarczają, żeby grać o cały stack”
- Problem: zdanie nie ma podmiotu dla „충분합니다”. Sens się nie zmienia.
- Proponowane: „이런 {{t:spr|SPR}}에서는 {{t:top-pair|탑 페어}}와 그보다 좋은 핸드면 스택 전체를 걸고 플레이하기에 충분합니다.”
- Pewność: średnia.

## 3. Do sprawdzenia przez rodzimego użytkownika
1. ja sc-09 (raise, raise-small): czy „このハンドを降ろさせることもできない” jasno znaczy „nie zmusza limpera do pasu / nie odbiera mu rozdania”? Czy „このハンド” nie zostanie odczytane jako ręka gracza? Ewentualnie: „リンパーを降ろすこともできない”.
2. ja sc-30 (situation): czy „少なくとも約{{n:hud.hands.vpip.low}}ハンドで” wystarczająco jasno oznacza wielkość próby (statystyka z co najmniej ok. 100 rąk)? Ewentualnie: „少なくとも約{{n:hud.hands.vpip.low}}ハンドのサンプルで”.
3. ja sc-16 (situation, explanations): czy „小さな{{t:c-bet|Cベット}}で{{t:bet|ベット}}します” (dosłownie „stawia małym c-betem”) brzmi naturalnie, czy lepsze jest „小さな{{t:c-bet|Cベット}}を打ちます”?
4. W pozostałych 10 plikach każdego języka używany jest szablon zdania preflop z `{{w:stol}}` wstawionym jako wtrącenie („…を持ち、{{w:stol}}、…” / „…들고 있고, {{w:stol}}, …”, po wstawieniu „preflop” w danym języku). Czy takie wtrącenie jest zrozumiałe? Dotyczy sc-09 i sc-30.

## 4. Uwagi o źródle (pl/en, wspólne dla wszystkich języków)
- **sc-27, `{{w:rozmiar}}` bez znaku procentu (bet-big i bet-small).** Według `apps/mobile/src/features/scenariusz/wariant.ts:410` wartość to `String(Math.round(d.fractionBig * 100))`, czyli sama liczba. W efekcie pl wyświetla „ok. 75 puli”, en „about 75 of the pot”, ja „ポットの約75”, ko „팟의 약 75 크기로”. Ten sam układ jest we wszystkich językach sprawdzonych grepem (de, es, fr, it, pt, vi, ja, ko). Poprawka we wzorcu i wszystkich przekładach: „{{w:rozmiar}}%” (ja „ポットの約{{w:rozmiar}}%”, ko „팟의 약 {{w:rozmiar}}%”). Druga możliwość: renderer dokleja „%”. Liczba nie jest błędna, ale bez jednostki tekst jest niejasny, więc proponuję poziom ŚREDNIE dla wzorca.
