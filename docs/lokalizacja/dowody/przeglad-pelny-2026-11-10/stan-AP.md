# Stan sesji AP — pełny przegląd przekładu ja, zh-Hant, ko (2026-11-10)

Rola 09-lokalizacja, tryb audit, tylko dokumenty. Gałąź `przeglad-ap-cjk`, baza `claude/sleepy-brahmagupta-2065nu` @ 016317e (polecenie podawało e01ba05; różnica to D-395/D-396 w `docs/sklep`, `store/`, `tests/narzedzia` — koordynator potwierdził 016317e). Niczego nie zmieniono w `content/`, `apps/`, `store/` ani w kodzie.

## Co jest w katalogu
- `instrukcja-subagenta-AP.md` — instrukcja recenzenta (zakres kontroli, wagi, format wyniku).
- `podzial.json` — 16 części na język: L1–L8 (44 lekcje), E1–E2 (14 egzaminów), R1–R4 (`rules.yaml` wg linii), S1 (areas, modules, spots, helplines, terms-def, terms-nazwy), U1 (słownik interfejsu, metadane sklepu).
- `zloz.mjs <język>` — składa `czesci/*.json` (+ `czesci/AP.json`, − `wykluczenia.json`) w `poprawki-<język>.json` i `znaleziska.md`; kontrola: `stary` dokładnie raz w pliku `cel` na HEAD, jedna linia, brak kolizji, ostrzeżenie o zmianie znaczników. Kod 0 = bez odrzuconych i kolizji.
- `<język>/czesci/<CZĘŚĆ>.json`, `<CZĘŚĆ>-uwagi.md` — wynik recenzenta (pokrycie plików, znaleziska bez poprawki, wzorce, pytania).
- `<język>/podsumowanie.md` — pokrycie jednostek (tabela „jednostka → przejrzana, przez kogo”), znaleziska bez poprawki mechanicznej, wzorce do skryptu, rozstrzygnięcia terminologiczne, pytania do rodzimego użytkownika i do źródła pl, treść krytyczna.
- `<język>/poprawki-<język>.json` — poprawki w formacie `docs/lokalizacja/narzedzia/poprawki.mjs` (`jezyk`, `cel`, `stary`, `nowy`, `waga`, `powod`, `grupa`, dodatkowo `linia`). **Różnica wobec D-379/D-393:** `cel` i `stary` odnoszą się do plików w repo na HEAD (przekład jest już nałożony), nie do pliku propozycji z artefaktu — sesja kodu nakłada je wprost na pliki (`stary` → `nowy`, każdy dokładnie raz), potem `pnpm content:build` i `pnpm run ci`.

## Stan na język (końcowy; `zloz.mjs <język>` kod 0, odrzuconych 0, kolizji 0; symulacja nałożenia wszystkich poprawek po kolei: 0 nieudanych)

| Język | Części przeczytane | Jednostki w całości | Poprawki | KRYT | WYS | ŚR | NISKIE | w tym z rozstrzygnięć (`czesci/AP.json`) | Wykluczone (`wykluczenia.json`) | Plików do zmiany |
|---|---|---|---|---|---|---|---|---|---|---|
| ja | 16/16 | 70/70 | 229 | 0 | 1 | 143 | 85 | 93 | 11 | 48 |
| zh-Hant | 16/16 | 70/70 | 347 | 0 | 0 | 258 | 89 | 126 | 10 | 58 |
| ko | 16/16 | 70/70 | 485 | 0 | 0 | 384 | 101 | 192 | 8 | 56 |

„70 jednostek” = 65 jednostek narzędzia (`rules.yaml` liczony w 4 fragmentach) + `terms-nazwy.yaml` + metadane sklepu; tabela jednostka → kto: `<język>/podsumowanie.md`, sekcja „Pokrycie jednostek”. Zgłoszone luki: glosariusz `docs/lokalizacja/glosariusz.md` czytany w całości tylko przez część recenzentów (reszta przez `terms-nazwy`); wersja en tylko punktowo; w zh-Hant 48 form liczby mnogiej pl (`_one/_few/_many`) porównane tylko przez `_other`; render w aplikacji nieoglądany.

Znaleziska bez poprawki mechanicznej (w `podsumowanie.md`): ja 50 (ŚR 5, NISKIE 45), zh-Hant 60 (ŚR 17, NISKIE 43), ko 46 (ŚR 7, NISKIE 39); KRYT 0, WYS 0.

Miejsca, których format poprawek nie obejmuje (identyczne linie, `stary` nie jest unikalny) — komendy `sed` po numerze linii w `<język>/czesci/AP-uwagi.md`, do wykonania PO nałożeniu poprawek: zh-Hant `lessons/m6-l3-check-raise.md:13, 59, 69, 79, 89` (莊位 → 按鈕位) i `zh-Hant.json:232, 243` (教學網站 → 訓練網站); ko `lessons/m6-l2-sprawdzenie.md:41, 61, 71, 81` i `lessons/m7-l1-druga-beczka.md:53, 72, 82` (c-bet → C벳).

Jedyne WYS: `apps/mobile/src/i18n/locales/ja.json:96` (`data.replaceBody`) — japońskie zdanie mówi, że postęp z pliku zostanie zastąpiony postępem z telefonu; `pl.json:99` mówi odwrotnie (okno potwierdzenia importu). Potwierdzone przez sesję nadrzędną na źródle.

Treść krytyczna (lekcje m12, R-M12, egzamin m12, helplines, sklep, teksty o hazardzie w interfejsie): porównana zdanie po zdaniu w każdym języku (części L8, R4, E2, S1, U1) — 0 KRYT, 0 WYS; liczby, progi, warunki i adresy zgodne z pl.

## Rozstrzygnięcia sesji AP (terminologiczne, do weta; numer D-420, wpis do `docs/decyzje.md` zostawiony sesji nakładającej albo koordynatorowi)
- **ja:** semi-connected セミコネクテッド, connected コネクテッド, single-raised pot シングルレイズドポット, offsuit オフスート, „ręka” ハンド (nie 手), baza ベース, profil tiltu プロファイル, condensed コンデンスド, błąd estymacji 反比例; 19 nazw w `terms-nazwy` z `null` → katakana wg części S1; button ボタン. Odrzucone/odłożone (pytanie do rodzimego użytkownika): nazwy statystyk „Fold to 3-bet/c-bet”, zapis „kハンド/千ハンド”, 値段→価格, ソース→情報源.
- **zh-Hant:** limp 溜入, „do rivera” 到河牌為止, set 暗三條, tilt 上頭, board 牌面 (także nazwa w `terms-nazwy`) / community cards 公共牌, solver 求解器, all-in 全下, Button 按鈕位, outs 補牌, mikrostawki 微級別, gutshot 卡順 zostaje w interfejsie (wpisy U1 wykluczone), 10 nazw w `terms-nazwy` z `null` → nazwa chińska. Odłożone: c-bet → 持續下注 (ok. 200 miejsc), bad beat, connected, limper 溜入玩家/溜入者, kicker 踢腳/踢腳牌, „na każdej ulicy” i 動作/行動 poza wskazanymi miejscami.
- **ko:** c-bet C벳, 3-bet 3벳, OESD pełna nazwa 양방향 스트레이트 드로우 (skrót tylko gdzie pl ma `|OESD`), „wysokie karty” 높은 카드, „tys. rąk” jako „{{n}},000핸드” przy wartości całkowitej, ekran 보고서, pisownia 플롭/프리플롭, payout 상금, bad beat 배드 비트, błąd estymacji 반비례; pozostałe formy do `terms-nazwy` (넛, 주도권, 투 페어, 니트, 레이크 캡, 수티드, 웻, 기댓값, 자유 플레이) były już w poprawkach części. Odłożone (rodzimy użytkownik): 벳/베팅, zwrot do czytelnika 나/당신 (334 miejsca), partykuły po „bb/100” (wpis E2 `exams/m12.yaml:18` wykluczony), 모집단/플레이어 풀; angielskie „fold to c-bet/3-bet” w `lessons/m10-l3` wobec „폴드 투 C벳/3벳” w egzaminie i regułach.
- **Sprostowanie:** kandydat KRYT z syntezy ko (`content/ko/rules.yaml:972` jako „614.656,000핸드”) jest błędny — `decimals` domyślnie 0 (`packages/content-schema/src/index.ts:41`), wyświetla się „615,000핸드” (z odczytu kodu, nie z ekranu).
- **Wspólne (z przeczytanego źródła):** pl „rozmiary i stoły” w `content/pl/rules.yaml:906`, `exams/m10.yaml:63`, `lessons/m10-l3-odejscie-od-bazy.md:49` to boardy (`content/en/rules.yaml:906`: „all sizes and boards”) — poprawki „stół do gry → board” zostają w ja, zh-Hant, ko.

## Otwarte (dla sesji nakładającej i koordynatora)
1. Nałożenie: sesja kodu nakłada `poprawki-<język>.json` na pliki HEAD (każdy `stary` dokładnie raz), potem `sed` z `AP-uwagi.md`, `pnpm content:build` (strażnik nazw `tools/content-build/src/nazwy.ts` po zmianach `terms-nazwy`), `pnpm run ci`. Ostrzeżenia skryptu o znacznikach (ja 6, zh-Hant 11, ko 2: dodany/usunięty `{{t:…}}` względem obecnego przekładu, zgodnie z pl) — do obejrzenia przy nakładaniu. Poprawki sklepu: ja 4 i zh-Hant 8 w `store/app-store-metadata.json`, ko 4 w `docs/sklep/aso/metadane-fala2.json` (test `tests/narzedzia/asc.test.mjs` i `store/asc-kontrola.json` mogą wymagać odświeżenia).
2. PYTANIE produktowe (sklep, rola 10): podtytuł ko „결정마다 평가와 해설, 베팅 없음” → propozycja „결정마다 평가와 해설, 판돈 없음” (18 znaków); „베팅 없음” = „bez betów”, a bet to zagranie uczone w aplikacji. Wpis wykluczony z poprawek; opis ko po nałożeniu ma już „판돈도”. Opcje: (a) zmienić podtytuł — spójność z opisem; (b) zostawić — adaptacja ASO, „베팅” bywa rozumiane jako obstawianie; (c) cofnąć też opis. Rekomendacja: (a).
3. Wpis decyzji D-420 (rozstrzygnięcia wyżej) do `docs/decyzje.md` — nie zrobiony w tej sesji (plik poza katalogiem dowodów; treść gotowa w sekcji „Rozstrzygnięcia”).
4. Wyjątki procesu do zapisania: lista 65 jednostek odtworzona regułą z `scripts/i18n/wspolne.mjs:147–178` (na starcie brak `node_modules`; koordynator przyjął); raportu `audit/09-lokalizacja-2026-11-10.md` wg szablonu roli nie ma — polecenie AP zawęża wynik do `znaleziska.md` i plików poprawek; zamiany masowe w ko (C벳, 3벳, „,000핸드”) obejrzane w kontekście linii ko, z pl porównane tylko wybrane.
5. Przegląd AI to nie przegląd rodzimego użytkownika języka: listy „Do sprawdzenia” i pytania do źródła pl w `<język>/podsumowanie.md` są krokiem dla człowieka / roli 06.

## Koszt
0 USD API (workflow `przeglad-tlumaczen.yml` nieuruchamiany). Subagenci w sesji, ten sam model: 48 recenzentów ≈ 8,2 mln tokenów (120–240 tys. każdy), 3 syntezy ≈ 0,83 mln, 3 rozstrzygnięcia ≈ 0,69 mln; razem ≈ 9,7 mln tokenów subagentów plus sesja nadrzędna (ok. 0,35 mln kontekstu). Czas zegarowy ok. 1 h 15 min.
