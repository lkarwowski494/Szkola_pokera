# Nałożenie ja, zh-Hant, pt-BR, fr (sesja AE, 2026-11-09, D-379)

## Artefakty (sha256 zip = dowody przeklad-*-2026-11-09.txt; wszystkie 6 zgodne)
ja 13701526861 e6d6141738cf…, zh-Hant 13702171129 aa6ebfc92f43…, ja+zh-Hant 13704291515 c868e1ead7bd…,
pt-BR 13702616081 57f25a20c6f3…, fr 13703066134 3668bf795482…, pt-BR+fr 13704203642 cb4c9c77b427…

## Poprawki przeglądu (`docs/lokalizacja/narzedzia/poprawki.mjs`)
ja 21, zh 27, ja+zh 128 (pominięte 0); pt 9, fr 16, pt+fr 133 (pominięte 0); typografia fr 0 / 1 499 / 1 749.

## `--zastosuj` (na content/pl z 935c9cf^ = d726aef; wyjątek od strażnika skrótu, D-379)
ja 44, zh 44, ja+zh 42, pt 44, fr 44, pt+fr 42 = 260 plików, odrzucone 0 (ostrzeżenia {{t:…}}/liczb: 70/64/47/16/22/13 — rozstrzygnięte w przeglądach AB/AD).

## 16 miejsc D-376 ręcznie wg content/en (2 subagenty, świeży kontekst)
| język | zmienione | pliki |
|---|---|---|
| ja | 6 | m3-l1:17, m7-l1:77, m11-l1:79, m11-l3:20/40/161 |
| zh-Hant | 5 | m3-l1:17, m11-l1:79, m11-l3:20/40/161 |
| pt-BR | 8 | m3-l1:17, m7-l1:77, m7-l4:43/53, m9-l4:130, m11-l1:79, m11-l3:20/40/161 |
| fr | 7 | m3-l1:17, m7-l4:43/53, m8-l1:87, m11-l1:79, m11-l3:20/40/161 |
Reszta miejsc już poprawna. m12-l1 i rules.yaml (krytyczne): 0 zmian w każdym języku.

## Kontrola (a) m12-l1 + R-M12-* ponownie (subagent, przekład zwrotny przed otwarciem pl, potem porównanie sensu)
ja, zh-Hant, pt-BR, fr: 0 KRYT / 0 WYS / 0 ŚR sensu — **zaliczona**; tokeny {{n:…}} 0 rozbieżności (skrypt).
Uwagi stylu (NISKIE, backlog): fr R-M12-002 „vérifiez” vs lekcja „revoyez”; zh-Hant R-M12-002 檢查 vs lekcja 檢視.

## Kontrole
`pnpm content:build` kod 0; `pnpm i18n` 0 błędów, 146 uwag; `scal-rejestr --przeglad zastępczy --sprawdz` 0 błędów (przeglad_jezyki 11 × 4).
Formy `{{t:k|forma}}` różne od terms-nazwy (raport, nie błąd):
ja bez formy 1772, forma = nazwa 6257, forma ≠ nazwa 71; najczęstsze: pair|ワンペア×9, big-blind|BB×6, paired|ペアの×6, small-blind|SB×5, connected|コネクトした×5, connected|コネクト×4
zh-Hant bez formy 1359, forma = nazwa 6297, forma ≠ nazwa 381; najczęstsze: pair|一對×54, session|牌局×46, fold|棄掉×38, board|牌面×37, fold|蓋牌×27, out-of-position|沒有位置×17
pt-BR bez formy 1621, forma = nazwa 3048, forma ≠ nazwa 3432; najczęstsze: bluff|blefes×234, call|pagar×215, call|paga×182, fold|desiste×178, fold|desistir×152, open|abriu×104
fr bez formy 1429, forma = nazwa 3159, forma ≠ nazwa 3451; najczęstsze: bluff|bluffs×236, call|suivre×178, call|suivi×124, call|suit×96, draw|tirages×94, pair|paires×93
