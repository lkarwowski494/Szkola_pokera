# Nałożenie ko, it, vi (sesja AL, 2026-11-10, D-394)

Wzór: `nalozenie-de-es-2026-11-09.md` (AK). Plan: `przygotowane/plan-de-es-ko-it-vi.md` §1–§5.

## Artefakty (sha256 zip = `przeklad-de-es-ko-it-vi-2026-11-09.txt`; 5/5 zgodne)
ko lekcje 13712785439 1a1021d1becf…, it lekcje 13713531627 56110c820271…, vi lekcje 13713362603 d47a0ad78b21…, ko+it reszta 13715857062 93eb119df9f0…, vi reszta 13716755980 03d592f48541…

## Jednostki nieaktualne (D-385 §1, wariant A)
`ocena-propozycji.mjs` na HEAD 804160d: lekcje 44/44 × 3 i vi reszta 21/21 zgodne z HEAD; ko+it reszta 40/42 — różne tylko `locales/ko.json` i `it.json` (źródło `pl.json` zmienione po dispatchu wyłącznie w `welcome.title`, e67157a; skrót `pl.json` na HEAD b96030943185… = ten sam co w AK). `welcome.title` = „PokerGym” jest już w listach K2/I2; w kopii odświeżony tylko `zrodlo_sha256` → 42/42. Wyjątek od strażnika skrótu nazwany w D-394 (lista: te 2 pliki).

## Poprawki przeglądu (`narzedzia/poprawki.mjs`, kolejność list z planu §2)
ko lekcje 22, it lekcje 11, vi lekcje 9, ko+it reszta 194, vi reszta 65 = **301**, pominięte 0, kod 0 (= test łączny AJ, D-388).

## `--zastosuj` (na HEAD 804160d)
ko lekcje 44, it lekcje 44, vi lekcje 44, ko+it reszta 42, vi reszta 21 = **195 plików**; kod 0, odrzucone 0. Ostrzeżenia automatyczne (terminy / liczby): ko lekcje 8/33, it lekcje 6/7, vi lekcje 9/28, ko+it reszta 2/16, vi reszta 3/14 — typ jak w AK (znacznik bez odpowiednika w zdaniu, liczby cyfrą zamiast słowem); liczby cyfrą sprawdzone w AJ (ko 101, vi 81: 0 spoza źródła). Zgubiony `{{t:big-blind}}` w m8-l3:55 — vi (plan §3) **i ko** (to samo ostrzeżenie; plan go nie wymienił) — przywrócony skryptem niżej.

## Ujednolicenie form poza próbą (`narzedzia/ujednolic-formy.mjs --jezyki ko,it,vi --zapisz`; drugi przebieg: 0 zamian)
Raport wierszowy: `ujednolicenie-ko-it-vi-2026-11-10.md` (468) + 1 (ko m8-l3:55, dopisane po pomiarze ostrzeżeń).

| język | reguła | zamian |
|---|---|---|
| ko | 플랍 → 플롭, 프리플랍 → 프리플롭 | 142 + 9 |
| ko | 씨벳 / c벳 → C벳 | 39 |
| ko | 디펜드 / 디펜스 → 방어 (rdzeń; końcówki 하다/를/는 bez zmiany — ta sama klasa głoski) | 21 + 26 |
| ko | m12-l3 `{{t:variance\|변동성}}` → 분산 (tylko ten plik, plan §3) | 5 |
| ko | `{{t:flush-draw\|플러시 드로}}` → 플러시 드로우 | 3 |
| ko | m8-l3:55 „빅 블라인드가” → `{{t:big-blind\|빅 블라인드}}가` | 1 |
| it | fold: passare/lasciare → foldare **tylko w znaczniku `{{t:fold\|…}}`** (znacznik rozstrzyga sens; w tekście wolnym „passare” bywa checkiem — bez zmian) | 105 |
| it | „la tua / la {{t:call}}” → „il tuo / il {{t:call}}” (rodzaj męski K-05) | 2 + 3 |
| it | „micro limiti” → „microlimiti” | 10 |
| it | „bui” → „blind” (m3-l2 ×2, m12-l3:22) | 3 |
| vi | „mở bài” → „mở cược” | 79 |
| vi | „bộ bài” → „tay bài” **tylko w znaczeniu ręki** (m1-l1:81, m5-l1:80, exams/m0:32,40, exams/m1:55,57); „bộ bài” = talia (m2-l1, m8-l3:40, terms-def, exams/m2) bez zmian | 6 |
| vi | „học phần” → „mô-đun” (także m7-l1, poza listą planu) | 14 |
| vi | m8-l3:55 `{{t:big-blind\|Big blind}}` | 1 |

Razem **469**. Pola `source:` (opisy źródeł) pomijane jak w AH/AK — zostają tam „플랍” (rules.yaml, ok. 20) i „c벳” (3). Poza skryptem ręcznie: ko `ranges/spots.yaml` etykieta grupy „디펜스 (…)” → „방어 (…)” ×2 (katalog `ranges/` poza zasięgiem skryptu).
Treść krytyczna m12 dotknięta: ko m12-l3:26,60,97,110,125 (분산), it m12-l3:22 (blind) — objęte kontrolą (a) niżej.

## Schemat treści
ko `modules.yaml` m7 „턴” (1 znak) łamie `ModuleDef.title: min(2)` (`packages/content-schema/src/index.ts:98`) → „턴 플레이” (D-394; schemat bez zmian).

## K-05
`content/ko|it|vi/terms-nazwy.yaml` ← szkice `przygotowane/terms-nazwy-ko|it|vi.yaml` (162 klucze; [DO USTALENIA] ko 25, it 52, vi 48 — forma tłumacza zostaje). Nagłówek szkicu zastąpiony nagłówkiem pliku treści jak w AK.

## Kroje
ko: `BEZ_LITERATY` ma `ko` (`apps/mobile/src/theme/kroje.ts:14`, test `kroje-cjk-09`). vi, it: wszystkie znaki nałożonej treści (`content/<j>/**`, `locales/<j>.json`) wobec cmap `Literata-SemiBold.ttf` (fontTools, 2026-11-10): vi 206 znaków, it 141 — brakujących liter/interpunkcji/cyfr 0.

## Kontrola (a) m12-l1 + R-M12-* ponownie (subagent, przekład zwrotny przed otwarciem pl, potem porównanie sensu)
ko 72 jednostki, it 75, vi 67 (+ zmienione wiersze m12-l3: ko ×6, it w22; it m12-l4 i R-M12-011 — poprawka WYS „al più tardi / non prima”; vi R-M3-006 — poprawka WYS kierunku) — **zaliczona w 3/3**: 0 KRYT / 0 WYS / 0 ŚR; NISKIE: ko 2 („,000핸드” vs „k 핸드”; R-M12-006 „głęboki oddech”), it 1 (R-M12-006 „respiro profondo”), vi 2 (m12-l1 w125 bez „ok.”; R-M12-011 „zaraz po” zamiast „już po”). Tokeny `{{n:…}}` w m12-l1: 188 = 188 we wszystkich (ten sam zbiór, md5 posortowanej listy 6def5560 — sprawdzone też ręcznie). Wynik i przekład zwrotny: `kontrola-a-ko-it-vi-2026-11-10/`.

## Kontrole
`pnpm content:build` kod 0 (5 uwag: ko „1bb의 일부” = „ułamek bb”, ko „10%대” = „kilkanaście procent” — sens zgodny); `pnpm i18n` 0 błędów, 284 uwagi (ko 24, it 31, vi 37 — zapożyczenia identyczne z pl, liczby cyfrą, „PokerGym”); `scal-rejestr --sprawdz`: 33 błędy (11 × ko/it/vi bez kontroli (a)) → `przeglad_jezyki.ko/it/vi` dopisane (11 × 3, skróty po nałożeniu) → 0 błędów; `docs/tresci/rejestr.json` przebudowany.
