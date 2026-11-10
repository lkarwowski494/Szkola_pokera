# Zad. 8 (KO-028): nazwa pozycji zamiast skrótu — notatki AW dla następnej sesji 08 (2026-11-10)

1. Miejsce zmiany: `apps/mobile/src/features/stol/uklad.ts:107` (`t('table.yourPosition', { pos: s.position })`); klucz `pl.json:578` „Twoja {{t:position|pozycja}}: {{pos}}.” (`en.json:552`).
2. Terminy w `content/terms.yaml`: utg, hijack, cutoff, button, small-blind (abbr SB) istnieją; big-blind (abbr BB) sprawdzić; brak MP/LJ/CO-klucza = zgłoszenie do roli 06, nie wpisywać nazw samemu.
3. Mechanizm: `features/drills/terms.ts` (`tr`, `term`, `termPl`, `nazwyTerminow`; nazwy z `content/<język>/terms-nazwy.yaml` → TERM_NAMES).
4. `opisKart` jest też w etykiecie czytnika (A04-11) — nazwa pozycji ma wejść do obu wariantów; test w `components/__tests__/Stol-08.test.tsx` i `features/stol` (uklad).
5. Po zmianie `content/` uruchomić `pnpm content:build` (bazy .db i *.generated.ts), potem `pnpm run ci`.
