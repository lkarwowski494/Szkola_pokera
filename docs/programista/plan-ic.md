# Plan IC — rola 08 (fix): nagłówek werdyktu przy 320 pt i poprawki po recenzjach IA/IB

Gałąź `claude/sesja-ic-poprawki` od `ca2fdfdc`. Decyzje: `docs/decyzje/IC.md` (D-1850…D-1858). Polecenie: `docs/koordynacja/polecenia/IC.md` @ 772aad1e.

| Zadanie | Typ | Commit | Test |
|---|---|---|---|
| 1 nagłówek werdyktu (wysokie) | D | 45b0e937 | `ic-slowo-stopnia.test.tsx` (czerwony 4/4 przebiegi przed, zielony po) + zrzuty `ic-ocena-*` |
| 2 P3 IB: lewa kreska 2×2 | D | c148c7cf | `ib-pasek-4-segmenty.test.tsx` (3 czerwone przed) |
| 2 P3 IB: nit-3bet bez `s` | D (teoretyczny) | 8bd87f48 | `ic-nit3bet-widok.test.ts` (utrwalający) |
| 2 D-1847: konwencja | dokument | D-1858 | — |
| 4 bramka: regex Maestro | D | a1717442 | `sprawdz-scenariusze.test.mjs` (1 czerwony przed) |
| 3 flow 10, numery D, „# powrót”, JLREQ; 4 komentarze-obejścia | D | eac4a157 | `znaczniki-ekranow-ia.test.tsx` (nowy niezmiennik + 5 mutantów) |

Ścieżki wrażliwe (CLAUDE.md): żadna zmiana nie dotyka `packages/postep/`, `src/data/`, `src/platform/`, `.github/workflows/`; przegląd D-043 nie dotyczy.
