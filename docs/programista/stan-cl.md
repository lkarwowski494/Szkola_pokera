# Stan sesji CL (08-programista, build): scalenie CK+CJ+CG+CC
Gałąź `claude/sleepy-brahmagupta-2065nu` od 07b04fb; decyzje `docs/decyzje/CL.md` (D-765…D-768).
- ff CK; scalone --no-ff: CJ, CG, CC. Konflikty: `build.ts`, `build.test.ts` (CK+CJ), pliki generowane (CC; `pnpm content:build`).
- Konflikty semantyczne po scaleniu: typ `WpisHistorii` (domena, mobile), `naGenerator`, test all-in CK (formuła CJ).
- ŚR-003 CH: deterministyczność 30 s (przed 21,5 s w CI-lokalnie, po 1,9 s), test budżetu czasu na szablon.
- Otwarte: ekran scenariusza nie przekazuje `GeneratorContext` (kontekst range-spot/cbet-case/size-spot/icm-call) do `wybierzWariant`; obecne szablony (sc-01, 02, 19) go nie potrzebują.
