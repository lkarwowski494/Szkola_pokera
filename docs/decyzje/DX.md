# Decyzje sesji DX (08-programista, silnik scenariuszy); pula D-1065…D-1079
| ID | Data | Decyzja | Odrzucone | Powód / zależność |
|---|---|---|---|---|
| D-1065 | 2026-11-11 | Odpowiedź w marginesie od progu rachunku (`riverCatchAction`) nie istnieje (`null`, wariant odrzucany). | Domyślny `call`/`fold` w marginesie. | Analogia do `draw-call` i icm-call: `scenariusze.ts` (marginMin wymagany), `scenario-gen.ts` `inMargin`; odczyt 2026-11-11. |
| D-1066 | 2026-11-11 | N2: mały c-bet ≤ 0,4 puli, duży ≥ 0,7, pośrednie → `null`; backdoor „z wysokimi kartami” = obie ≥ T; „as jako najwyższa karta” = as w ręce (call). Warunkowa (czeka na potwierdzenie 06). | Progi 0,5/0,75; ranga ≥ J dla backdoora. | `docs/tresci/stan-du.md` 08-N2 (≈ 1/3, ≥ 3/4, R-M6-006/007) nie podaje progów pośrednich; uproszczenie dydaktyczne, nazwane; do weta. |
