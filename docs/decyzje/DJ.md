# Decyzje sesji DJ (09-lokalizacja, build): przekład poprawki 06-tresci-001 na 11 języków
Pula D-934…D-939. Kto: A = procesowa lub techniczna agenta (delegacja z `CLAUDE.md`); wszystkie do weta właściciela. Analogia z Treningiem (D-191): nie sprawdzano osobno, bo zakres to przekład gotowego zdania pl (brak nowej decyzji produktowej); sprawdzenie `lkarwowski494/trening` [DO USTALENIA] jeśli właściciel zażąda.

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa | Zależy od |
|---|---|---|---|---|---|---|
| D-934 | 2026-11-11 | A | Zdanie o outach nadkart w 154 wyjaśnieniach (11 języków × sc-01 4, sc-02 4, sc-03 2, sc-19 4) dostaje odpowiednik „najwyżej” w miejscu pl (przed `{{n:pair.outs.per-rank}}`); reszta zdania, `{{…}}`, NBSP i spacje bez zmian. | Przekład całych wyjaśnień od nowa (ryzyko rozjazdu z ścieżką 06 i zbędny koszt) | diff pl 431cb885..a13d407b: „daje jeszcze najwyżej {{n:pair.outs.per-rank}}” | D-917 (DG) |
| D-935 | 2026-11-11 | A | Przekład własny w sesji, bez płatnego API (zgoda wyczerpana, polecenie DJ pkt 3); oznaczenie: maszynowe, tryb DJ, fala poprawkowa 2026-11-11. | API przekładu | polecenie koordynatora | — |
| D-936 | 2026-11-11 | A | Sformułowania: en „at most”, de „höchstens”, es „como máximo”, fr „au plus”, it „al massimo”, ja „最大で”, ko „최대”, pt/pt-BR „no máximo”, vi „tối đa”, zh-Hant „最多”. Sens: górna granica liczby niepewnych outów na parę (nadkarta może mieć mniej outów, gdy część jest wykluczona). | „maximum of”/„up to” (cięższe, gorsza naturalność) | zgodność sensu z pl | D-917 |
| D-937 | 2026-11-11 | A | Znaczniki zgodności: w repo nie znaleziono pól `sha_pl` w treści scenariuszy; zgodność strukturalną pilnuje `pnpm content:build` i `pnpm run ci` (wyniki niżej). Hash baz treści zmienia się z build (35 baz). | Ręczne pola sha_pl | brak mechanizmu w kodzie, `grep sha_pl` = 0 trafień | — |
| D-938 | 2026-11-11 | A | Przegląd człowieka i drugi przegląd AI w świeżym kontekście: nie wykonane w tej sesji; przekład zostaje „maszynowy, do przeglądu roli 09”. | — | zasada 2 roli | — |

## Zmienione pliki
`content/{en,de,es,fr,it,ja,ko,pt,pt-BR,vi,zh-Hant}/scenarios/{sc-01,sc-02,sc-03,sc-19}.yaml` (44 pliki, 154 zdania), `apps/mobile/assets/content/*.db` (35 baz po build), `docs/lokalizacja/dowody/dj-ci.txt`.
