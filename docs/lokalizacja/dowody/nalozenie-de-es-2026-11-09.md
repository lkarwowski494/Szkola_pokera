# Nałożenie de, es (sesja AK, 2026-11-09, D-393)

Wzór: `nalozenie-4-jezykow-2026-11-09.md` (AE). Plan: `przygotowane/plan-de-es-ko-it-vi.md` §1–§5.

## Artefakty (sha256 zip = `przeklad-de-es-ko-it-vi-2026-11-09.txt`; 3/3 zgodne)
de lekcje 13712135232 b2f7b01050e7…, es lekcje 13710864058 bb37dc40e86f…, de+es reszta 13714991913 f9f58bfa7ff4…

## Poprawki przeglądu (`narzedzia/poprawki.mjs`)
de lekcje (D1–D4) 6, es lekcje (E1–E3) 17, de+es reszta (D1–D4, E1–E3) 139 = **162** (161 sesji AI + D4), pominięte 0, kod 0.

## Jednostki nieaktualne (D-385 §1, wariant A)
`ocena-propozycji.mjs`: lekcje 44/44 × 2 zgodne z HEAD; reszta 40/42 — różne tylko `locales/de.json` i `es.json` (źródło `pl.json` zmienione po dispatchu wyłącznie w `welcome.title`, e67157a). W kopii: `welcome.title` „Pokerschule” / „Escuela de Póker” → „PokerGym”, `zrodlo_sha256` → b96030943185… (HEAD) — potem 42/42. Wyjątek od strażnika skrótu nazwany w D-393 (lista: te 2 pliki).

## `--zastosuj` (na HEAD f323024)
de lekcje 44, es lekcje 44, de+es reszta 42 plików; kod 0, odrzucone 0. Ostrzeżenia automatyczne (terminy/liczby): de lekcje 9, es lekcje 7, reszta 5 — rozstrzygnięte w przeglądach D1–D3/E1–E3 (np. es `rules.yaml` „5.10” = data 5/10/2026, E1.md:8); de m8-l3:55 zgubiony `{{t:big-blind}}` przywrócony (skrypt niżej).

## Ujednolicenie form poza próbą (`narzedzia/ujednolic-formy.mjs --jezyki de,es --zapisz`; drugi przebieg: 0 zamian)
| język | reguła | zamian |
|---|---|---|
| de | bet żeński przy znaczniku bez formy (eine/einer/diese/die erste/eine kleine; m7-l4, m9-l4) | 11 |
| de | SPR żeński (der/welcher/die; einem/des `{{t:spr\|SPR}}` → einer/der; „einer einzigen”, „eine hohe”) | 19 |
| de | `hohes {{t:two-pair}}` → `hohe {{t:two-pair\|zwei Paare}}` (m9-l1:136) | 1 |
| de | shoven/shovst/shovt/Shover → pushen/pushst/pusht/Pusher (m11) | 12 |
| de | m8-l3:55 „Der Big Blind” → `{{t:big-blind\|Big Blind}}` | 1 |
| es | call: formy czasownika w `{{t:call\|pag…}}` → `igual…` (pagu+e → igual+e); rzeczowniki „pago/pagos” (59, „un pago”, „más pagos”) bez zmiany | 328 + 1 („Siempre … igualo”) |
| es | top pair „pareja máxima/mayor” (D-389) | 84 |
| es | wet „mojado” → „húmedo” (w znaczniku) | 8 |
| es | paired „doblado” → „emparejado” (w znaczniku) | 9 |
Razem 474 (de 44, es 430; raport wierszowy: `ujednolicenie-de-es-2026-11-09.md`). Treść krytyczna m12 dotknięta: es 6 wierszy w m12-l2, m12-l3:118, exams/m12:43 (tylko pagar→igualar; kontrola objęła 7 kandydatów) — objęte kontrolą (a) niżej. de m12-l3:133 zmienione przez D4 (lista przeglądu, D-390).

Poza zakresem (NISKIE, backlog): de „der Bet” w tekście wolnym ok. 60 miejsc (rodzaj męski obok żeńskiego 138×; oba w użyciu, zmiana wymaga przepisania odmiany przymiotników); es rzeczownik call „pago” vs „call” (m12-l2 vs exams/m12); de R-M12-006 „ein tiefer Atemzug”; es R-M12-007 „parar a tiempo”.

## K-05
`content/de/terms-nazwy.yaml`, `content/es/terms-nazwy.yaml` ← szkice `przygotowane/terms-nazwy-de|es.yaml` (162 klucze; [DO USTALENIA] de 39, es 36 — forma tłumacza zostaje).

## Kontrola (a) m12-l1 + R-M12-* ponownie (subagent, przekład zwrotny przed otwarciem pl, potem porównanie sensu)
de: 89 jednostek, es: 96 (+ 7 wierszy pagar→igualar) — **zaliczona w obu**: 0 KRYT / 0 WYS / 0 ŚR; tokeny `{{n:…}}` 0 różnic (188 = 188 w m12-l1). Granice: de „spätestens/frühestens”, es „como muy tarde/como muy pronto” (R-M12-011), „nie weniger als / nunca menos de” (R-M12-012).

## Kontrole
`pnpm content:build` kod 0; `pnpm i18n` 0 błędów, 192 uwagi (de 19, es 20 — zapożyczenia identyczne z pl); `scal-rejestr --przeglad zastępczy --sprawdz`: 22 błędy (11 × de/es bez kontroli (a)) → `przeglad_jezyki.de/es` dopisane → 0 błędów.
