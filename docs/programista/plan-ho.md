# Plan sesji HO (08-programista, build), stan 2026-11-16
Zakres: warunki silnika dla szablonów bez nich. Decyzje: `docs/decyzje/HO.md` (D-1700…D-1711). Warunki wejściowe: `fd/warunki-hp.md` (branch `claude/sesja-hp-szkice` @ 5f383a7c).

| Szablon | Punkt | Zadanie | Commit | Dowód |
|---|---|---|---|---|
| SC-26 | `spr-call` | 08-EX-5 | a656dcd7 | `packages/poker-core/test/ho-spr-call.test.ts` |
| SC-27 | `geo-size` | 08-EX-4 | edd0edfe | `ho-geo-size.test.ts` |
| SC-18, SC-21 | `turn-action` | 08-EX-6 | d2601481 | `ho-turn-action.test.ts` |
| SC-16 | `check-raise` | 08-EX-7 | 95cdd95c | `ho-check-raise.test.ts` |
| SC-30 | `nit-3bet` | 08-EX-8 | 9cad6ed1 | `tools/content-build/test/ho-nit-3bet.test.ts` |
| bramki | wszystkie | — | 1df8bd03 | `tools/content-build/test/ho-bramki.test.ts` |

Każdy punkt: test napisany przed implementacją (czerwony), wyrocznia niezależna od generatora, determinizm, `TemplateError` przy błędnym szablonie.
Otwarte: widoki ekranu (opcja A, D-1704), listy akcji per poziom (D-1710), SC-26 T i EV pick-hand (D-1711).
