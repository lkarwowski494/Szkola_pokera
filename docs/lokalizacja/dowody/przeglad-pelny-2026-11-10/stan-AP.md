# Stan sesji AP — pełny przegląd przekładu ja, zh-Hant, ko (2026-11-10)

Rola 09-lokalizacja, tryb audit, tylko dokumenty. Gałąź `przeglad-ap-cjk`, baza `claude/sleepy-brahmagupta-2065nu` @ 016317e (polecenie podawało e01ba05; różnica to D-395/D-396 w `docs/sklep`, `store/`, `tests/narzedzia` — koordynator potwierdził 016317e). Niczego nie zmieniono w `content/`, `apps/`, `store/` ani w kodzie.

## Co jest w katalogu
- `instrukcja-subagenta.md` — instrukcja recenzenta (zakres kontroli, wagi, format wyniku).
- `podzial.json` — 16 części na język: L1–L8 (44 lekcje), E1–E2 (14 egzaminów), R1–R4 (`rules.yaml` wg linii), S1 (areas, modules, spots, helplines, terms-def, terms-nazwy), U1 (słownik interfejsu, metadane sklepu).
- `zloz.mjs <język>` — składa `czesci/*.json` (+ `czesci/AP.json`, − `wykluczenia.json`) w `poprawki-<język>.json` i `znaleziska.md`; kontrola: `stary` dokładnie raz w pliku `cel` na HEAD, jedna linia, brak kolizji, ostrzeżenie o zmianie znaczników. Kod 0 = bez odrzuconych i kolizji.
- `<język>/czesci/<CZĘŚĆ>.json`, `<CZĘŚĆ>-uwagi.md` — wynik recenzenta (pokrycie plików, znaleziska bez poprawki, wzorce, pytania).
- `<język>/podsumowanie.md` — pokrycie jednostek (tabela „jednostka → przejrzana, przez kogo”), znaleziska bez poprawki mechanicznej, wzorce do skryptu, rozstrzygnięcia terminologiczne, pytania do rodzimego użytkownika i do źródła pl, treść krytyczna.
- `<język>/poprawki-<język>.json` — poprawki w formacie `docs/lokalizacja/narzedzia/poprawki.mjs` (`jezyk`, `cel`, `stary`, `nowy`, `waga`, `powod`, `grupa`, dodatkowo `linia`). **Różnica wobec D-379/D-393:** `cel` i `stary` odnoszą się do plików w repo na HEAD (przekład jest już nałożony), nie do pliku propozycji z artefaktu — sesja kodu nakłada je wprost na pliki (`stary` → `nowy`, każdy dokładnie raz), potem `pnpm content:build` i `pnpm run ci`.

## Stan na język

| Język | Części przeczytane | Jednostki w całości | Poprawki (po kontroli) | KRYT | WYS | ŚR | NISKIE | Synteza | Rozstrzygnięcia sprzeczności |
|---|---|---|---|---|---|---|---|---|---|
| ja | 16/16 | 70/70 (65 jednostek narzędzia + terms-nazwy + sklep, `rules.yaml` w 4 fragmentach) | 229 | 0 | 1 | 143 | 85 | gotowa | gotowe (`czesci/AP.json` 93, `wykluczenia.json` 11) |
| zh-Hant | 16/16 | 70/70 | 231 (przed rozstrzygnięciami) | 0 | 0 | 169 | 62 | gotowa | **w toku** (subagent; wynik: `zh-Hant/czesci/AP.json`, `wykluczenia.json`) |
| ko | 16/16 | do potwierdzenia w syntezie | 301 (przed rozstrzygnięciami) | 0 | 0 | 213 | 88 | **w toku** (subagent; wynik: `ko/podsumowanie.md`) | **nie zaczęte** |

Jedyne WYS: `apps/mobile/src/i18n/locales/ja.json:96` (`data.replaceBody`) — japońskie zdanie mówi, że postęp z pliku zostanie zastąpiony postępem z telefonu; `pl.json:99` mówi odwrotnie (okno potwierdzenia importu). Potwierdzone przez sesję nadrzędną na źródle.

Treść krytyczna (lekcje m12, R-M12, egzamin m12, helplines, sklep, teksty o hazardzie w interfejsie): porównana zdanie po zdaniu w każdym języku (części L8, R4, E2, S1, U1) — 0 KRYT, 0 WYS; liczby, progi, warunki i adresy zgodne z pl.

## Rozstrzygnięcia sesji AP (terminologiczne, do weta; numer D-420, wpis do `docs/decyzje.md` zostawiony sesji nakładającej albo koordynatorowi)
- **ja:** semi-connected セミコネクテッド, connected コネクテッド, single-raised pot シングルレイズドポット, offsuit オフスート, „ręka” ハンド (nie 手), baza ベース, profil tiltu プロファイル, condensed コンデンスド, błąd estymacji 反比例; 19 nazw w `terms-nazwy` z `null` → katakana wg części S1; button ボタン. Odrzucone/odłożone (pytanie do rodzimego użytkownika): nazwy statystyk „Fold to 3-bet/c-bet”, zapis „kハンド/千ハンド”, 値段→価格, ソース→情報源.
- **zh-Hant** (zlecone, w toku): limp 溜入, „do rivera” 到河牌為止, set 暗三條, tilt 上頭, board 牌面 / community cards 公共牌, solver 求解器, all-in 全下, Button 按鈕位, outs 補牌, mikrostawki 微級別, gutshot 卡順 zostaje w interfejsie (wpisy U1 wykluczone). Odłożone: c-bet → 持續下注 (ok. 200 miejsc), bad beat, connected.
- **Wspólne (z przeczytanego źródła):** pl „rozmiary i stoły” w `content/pl/rules.yaml:906`, `exams/m10.yaml:63`, `lessons/m10-l3-odejscie-od-bazy.md:49` to boardy (`content/en/rules.yaml:906`: „all sizes and boards”) — poprawki „stół do gry → board” zostają w ja, zh-Hant, ko.

## Otwarte
1. zh-Hant: po zakończeniu subagenta uruchomić `node …/zloz.mjs zh-Hant` (kod 0) i zacommitować.
2. ko: przeczytać odpowiedź syntezy (sprzeczności między częściami), rozstrzygnąć, zlecić `ko/czesci/AP.json` + `wykluczenia.json` wzorem ja, `zloz.mjs ko`.
3. PYTANIE produktowe (sklep, rola 10): ko podtytuł i opis w `docs/sklep/aso/metadane-fala2.json` — „베팅 없음 / 베팅도 없습니다” („bez betów”; bet to zagranie uczone w aplikacji) → propozycja U1 „판돈” (stawka). Poprawki są w `ko/czesci/U1.json`; opcje: (a) przyjąć obie, (b) tylko opis, podtytuł zostaje (ASO), (c) odrzucić.
4. Wyjątki procesu do zapisania: lista 65 jednostek odtworzona regułą z `scripts/i18n/wspolne.mjs:147–178` (na starcie brak `node_modules`); raportu `audit/09-lokalizacja-2026-11-10.md` wg szablonu roli nie ma — polecenie AP zawęża wynik do `znaleziska.md` i plików poprawek; glosariusz `docs/lokalizacja/glosariusz.md` większość recenzentów czytała tylko przez `terms-nazwy` i wyszukiwanie; nikt nie oglądał renderu w aplikacji.
5. Przegląd AI to nie przegląd rodzimego użytkownika języka: listy „Do sprawdzenia” w `podsumowanie.md` są krokiem dla człowieka.

## Koszt
0 USD API. Subagenci w sesji (ten sam model): 48 recenzentów × 120–240 tys. tokenów ≈ 8,0 mln; syntezy i rozstrzygnięcia ≈ 1,2 mln (stan na zapis pliku). Czas zegarowy od startu ok. 45 min.
