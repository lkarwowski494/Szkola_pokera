# Stan sesji BS (rola 06, build, krok C) — 2026-11-10
Gałąź `sesja-bs-szablony` (start 70fdf40). Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/BS.md` @ 8b4e77c.

## Zrobione
- E0: `docs/tresci/bs-e0.md` (format B, plan 14, co da się zrobić). Decyzje D-630 (ŚR-103, pas drawem odporny na implied odds), D-631 (SC-02/SC-19: Ł Ś, 35 bb).
- Szablony w treści: `content/{pl,en}/scenarios/sc-01.yaml`, `sc-02.yaml`, `sc-19.yaml`; test `tools/content-build/test/szablony-bs.test.ts` (10 000 losowań na poziom, wyrocznia niezależna, odporność pasu, ŚR-103, przekłady = struktura pl).
- Szkice 11 szablonów spoza formatu B i lista rozszerzeń F1–F6 dla roli 08: `docs/tresci/szablony-robocze/README.md`.

## Do przeglądu roli 09 (przekład w sesji, bez native speakera, KO-046)
- `content/{de,es,fr,it,pt,pt-BR,ja,ko,vi,zh-Hant}/scenarios/sc-01.yaml`, `sc-02.yaml`, `sc-19.yaml`: pola `situation` i `explanation` (przekład subagentów z pl/en). Niepewne formy do sprawdzenia:
  - zh-Hant: `{{t:3-bet|3-bet}}`, `{{t:oesd|兩頭順子聽牌}}` (nazwy w terms-nazwy puste), „za pulą” = 底池之外; ja: OESD, SPR, ポットの後ろ; vi: `{{t:board|board}}` (lekcje częściej „bài chung”), „za pulą” = ngoài pot.
  - fr: forma „vous” (jak cała treść fr, nie „tu” z polecenia dla subagenta); pt: trzecia osoba bez zaimka jak `pt/rules.yaml`; pt-BR: „você”.
  - de: „Bei niedriger {{t:spr}}” (rodzaj żeński), „{{t:fold|Folden}}”; it: „un {{t:3-bet}}” (terms-nazwy: „una 3-bet”), „una {{t:call|chiamata}}”, „troppo tight” (brak wzoru).
  - wprowadzenie pozycji: de „am/im”, es „en el”, fr/it „en/in”, pt/pt-BR „no” — zależy od formatu `{{w:pozycja}}` z kroku F.

## Otwarte
- PYTANIE do koordynatora (2026-11-10): 11 szablonów poza formatem B — rekomendacja (a): rozszerzenie formatu przez 08 według szkiców.
- Jednostka `pots` i zakładów (bb, zaokrąglenie zakładu do 1 bb w generatorze) — do potwierdzenia przez 08/05 przy kroku F.
- `purchase.unlocks` bez „scenariuszy” do czasu ekranu (krok F/K, plan §5).
