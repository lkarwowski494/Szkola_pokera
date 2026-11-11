# Drugi przegląd AI przekładu: ko, vi (sc-04, 05, 06, 08, 32, 33, 34, R-M11-009)

Data: 2026-11-11. Tylko odczyt repo. Kontrola mechaniczna znaczników i cyfr pominięta (zrobiona wcześniej).

Uwaga ogólna: szablony c-betu w sc-04 i sc-05 (ko i vi) są słowo w słowo takie same jak już przyjęte sc-11 i sc-12 (ko: `content/ko/scenarios/sc-11.yaml:24-28`, `sc-12.yaml:24-28`; vi: te same linie w `content/vi/`), więc są spójne ze starszymi tekstami.

## ko — werdykt: PRZYJĄĆ Z POPRAWKAMI

Sens, liczby i kierunki („더 적은/많은”, „좁게/넓게”, „더 크게/작게”) zgodne z pl/en we wszystkich 37 kluczach. Terminy zgodne z `content/ko/terms-nazwy.yaml` (오픈, 레이즈, 콜, 폴드, 올인, 푸시, 상금, 주도권, 아웃 오브 포지션, 인 포지션, 버블, 레인지 우위, C벳, 3벳). Rejestr -니다 konsekwentny. Partykuły po wstawkach i liczbach poprawne (`{{w:pozycja}} 위치에서`, `{{w:reka}} 핸드를`, `{{w:stol}}이며` jak w sc-01…sc-19; „10 BB로/에서는”, „약 X%를/로”). Sformułowanie 3-betu „오픈 금액의 약 {{n:pf.3bet.size-oop}}” zgodne z `content/ko/rules.yaml:253`.

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-06.yaml:situation | „모두 당신까지 폴드했습니다” — 까지 bez 에게/차례 czyta się też jako „nawet ty” („wszyscy, łącznie z tobą, spasowali”); reszta tekstów ko używa „당신에게까지 모두” / „당신 차례까지 모두” | `당신은 {{t:small-blind\|스몰 블라인드}}에 있고, 당신 차례까지 모두 {{t:fold\|폴드}}했습니다.` | ŚR | wysoka | `content/ko/exams/m3.yaml:46` („당신에게까지 모두 폴드했습니다”), `content/ko/lessons/m3-l2-rece-startowe.md:42` („당신 차례까지 모두 폴드했습니다”) |
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | to samo: „모두 당신까지 {{t:fold\|폴드}}했습니다” | `…, {{w:stol}}, 당신 차례까지 모두 {{t:fold\|폴드}}했습니다.` | ŚR | wysoka | jw. |
| sc-06.yaml:decisions.0:range-spot.actions.fold.explanation | to samo | `…, {{w:stol}}, 당신 차례까지 모두 {{t:fold\|폴드}}했습니다.` | ŚR | wysoka | jw. |
| sc-32.yaml:situation | to samo | `{{t:tournament\|토너먼트}}: 당신은 {{n:m11.depth.10}}로 {{t:small-blind\|스몰 블라인드}}에 있고, 당신 차례까지 모두 {{t:fold\|폴드}}했습니다.` | ŚR | wysoka | jw. |
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation; …fold.explanation | „{{t:big-blind\|빅 블라인드}}하고만” — potoczne 하고 w tekście w rejestrze -니다; po nazwie terminu może też wyglądać jak czasownik „블라인드하다” | `이제 {{t:big-blind\|빅 블라인드}}와만 겨루기 때문입니다` / `이제 {{t:big-blind\|빅 블라인드}}와만 겨루므로` | NIS | średnia | — |

Liczba znalezisk ko: KRYT 0, WYS 0, ŚR 4, NIS 1.

## vi — werdykt: PRZYJĄĆ Z POPRAWKAMI

Sens, liczby i kierunki („ít hơn/nhiều hơn”, „hẹp hơn”, „nhiều hơn một chút”) zgodne z pl/en we wszystkich 37 kluczach. Terminy zgodne z `content/vi/terms-nazwy.yaml` (mở cược, tố, theo, bỏ bài, push, tiền thưởng, thế chủ động, không có vị trí, có vị trí, bubble, lợi thế range). Zwracanie się „bạn” konsekwentne; poleceń w tych kluczach brak. Opis 3-betu („khoảng {{n:pf.3bet.size-oop}} mức mở”) zgodny z `content/vi/lessons/m4-l1-3bet.md:26`, opis pushowania z `content/vi/rules.yaml:1127`.

| plik:klucz | problem | propozycja poprawki (pełne brzmienie fragmentu) | waga | pewność | dowód |
|---|---|---|---|---|---|
| sc-06.yaml:decisions.0:range-spot.actions.raise 3.explanation | „bạn {{t:open\|mở}} rộng” tworzy na ekranie złożenie „mở rộng” (= „rozszerzać”), więc zdanie czyta się „rozszerzasz prawie tak jak z buttona”; równoległe sc-05 ma „mở cược rộng”; do tego „button” małą literą (jedyne miejsce w treści vi, wszędzie indziej „Button”) | `nên bạn {{t:open\|mở cược}} rộng gần bằng từ Button, khoảng {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} số tay bài, và tay này nằm trong đó.` | ŚR | wysoka | `content/vi/scenarios/sc-05.yaml` (klucze range-spot: „từ Button bạn {{t:open\|mở cược}} rộng”); glosariusz `content/vi/terms-nazwy.yaml:65` (open = „mở cược”) |
| sc-06.yaml:decisions.0:range-spot.actions.fold.explanation | to samo złożenie: „bạn {{t:open\|mở}} rộng” | `nên từ {{t:small-blind\|small blind}} bạn {{t:open\|mở cược}} rộng, khoảng {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} số tay bài.` | ŚR | wysoka | jw. |
| sc-34.yaml:…fold.explanation, …call.explanation vs rules.yaml:R-M11-009.because | to samo porównanie raz „so với chơi bằng {{t:chips\|chip}}” (sc-34), raz „so với khi chơi vì {{t:chips\|chip}}” (reguła); w regule też „thắng thường hơn”, a w sc-34 „thắng thường xuyên hơn”; en „for chips” = „vì chip”, tak też R-M11-010 i egzamin | sc-34 (oba klucze): `Ngưỡng này cao hơn so với khi chơi vì {{t:chips\|chip}}, …`; R-M11-009.because: `… nên {{t:call\|theo}} phải thắng thường xuyên hơn so với khi chơi vì {{t:chips\|chip}}` | NIS | wysoka | `content/vi/rules.yaml:1151` („so với khi chơi vì {{t:chips\|chip}}”), `content/vi/exams/m11.yaml:64` („Khi chơi vì {{t:chips}}”) |

Liczba znalezisk vi: KRYT 0, WYS 0, ŚR 2, NIS 1.

## Do sprawdzenia przez człowieka

1. ko i vi, wszystkie klucze range-spot i size-spot przed flopem (sc-04…sc-08, sc-32, sc-33): `{{w:stol}}` daje przed flopem samą nazwę ulicy małą literą (`apps/mobile/src/features/scenariusz/wariant.ts:307-308`, ko „프리플롭”, vi „preflop”). Po ko zdanie wygląda tak: „…핸드를 들고 있고, 프리플롭, 아직 아무도…”, czyli wtrącenie bez orzeczenia. Odpowiada to en („…, preflop, and…”), więc to decyzja na poziomie szablonu (D-784), a nie błąd przekładu. Jeśli trzeba to poprawić w ko, można napisać „…들고 있고, 지금은 {{w:stol}}이며, …”. Wymaga to sprawdzenia partykuły dla wariantu z kartami stołu, bo `{{w:stol}}` jest wspólne dla obu przypadków.
2. vi sc-08.yaml:…call 2.5.explanation: w „Từ {{t:small-blind|small blind}} trước Button” słowo „trước” znaczy „wobec”, ale można je też odczytać jako „przed Buttonem” (pozycyjnie). Ten sam sens „trước” w znaczeniu „wobec” pojawia się w sc-34 („trước range all-in”) i w sc-04 („trước một khoản cược”), więc to prawdopodobnie przyjęty uzus. Jednoznaczna wersja to „đối đầu với Button”.
3. ko sc-33.yaml:…call.explanation: w „약 {{n:m11.call.10}} 대 약 {{n:m11.push.10}}입니다” pominięto „핸드의” (en „of hands”). Sens jest jasny z kontekstu. Opcjonalnie: „핸드의 약 {{n:m11.call.10}} 대 약 {{n:m11.push.10}}입니다”.
