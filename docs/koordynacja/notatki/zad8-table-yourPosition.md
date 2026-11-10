# Zad. 8 (KO-028): nazwa pozycji zamiast skrótu — notatki AW dla następnej sesji 08 (2026-11-10)

1. Miejsce zmiany: `apps/mobile/src/features/stol/uklad.ts:107` (`t('table.yourPosition', { pos: s.position })`); klucz `pl.json:578` „Twoja {{t:position|pozycja}}: {{pos}}.” (`en.json:552`).
2. Terminy w `content/terms.yaml`: utg, hijack, cutoff, button, small-blind (abbr SB) istnieją; big-blind (abbr BB) sprawdzić; brak MP/LJ/CO-klucza = zgłoszenie do roli 06, nie wpisywać nazw samemu.
3. Mechanizm: `features/drills/terms.ts` (`tr`, `term`, `termPl`, `nazwyTerminow`; nazwy z `content/<język>/terms-nazwy.yaml` → TERM_NAMES).
4. `opisKart` jest też w etykiecie czytnika (A04-11) — nazwa pozycji ma wejść do obu wariantów; test w `components/__tests__/Stol-08.test.tsx` i `features/stol` (uklad).
5. Po zmianie `content/` uruchomić `pnpm content:build` (bazy .db i *.generated.ts), potem `pnpm run ci`.

## Nazwy pozycji w treści (rola 06) — rozpoznanie BA 2026-11-10 10:56, dla sesji BB (po scaleniu BA)
- pl nazwa `utg` w `content/terms.yaml` to „UTG” (Hijack/Cutoff/Button też angielskie); linia przy stole: „UTG (under the gun)”.
- W pl ok. 20 gołych `{{t:utg}}` w odmianie („z {{t:utg}}”, „za {{t:utg}}”): m3-l1:17,25-27,61-62,66,69; m3-l3:80; m4-l1:79; exams/m3.yaml:89; rules.yaml:166,202-203 — zmiana nazwy na opisową („pierwsza pozycja (UTG)”) bez wcześniejszej zamiany gołych wystąpień na `{{t:utg|UTG}}` zepsuje gramatykę lekcji.
- `terms-nazwy.yaml`: `utg` brak w fr/pt/pt-BR, null w ja/zh-Hant (komentarz „[SKRÓT UTG]” = świadomie skrót); hijack/cutoff jako skrót „HJ”/„CO” w ja i zh-Hant, angielskie słowo w es/fr/it/pt/pt-BR/vi/de.
- Mechanizm (AZ): po `content:build` linia przy stole pokaże nową nazwę bez zmian w kodzie (`features/stol/uklad.ts:99`); test `pozycja-nazwa-az` ma listę BRAKI w tytule — do usunięcia po uzupełnieniu.
