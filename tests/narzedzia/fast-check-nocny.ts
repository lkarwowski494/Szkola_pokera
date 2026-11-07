// Przebieg nocny (D-171): PROP_RUNS=1000 podnosi domyślną liczbę przypadków fast-check (100) we wszystkich własnościach
// bez jawnego `numRuns`. Własności z jawnym `numRuns` (np. poker-core/test/core.test.ts) zostają przy swojej liczbie.
// „configureGlobal fully resets the settings” (fast-check.dev) — dlatego tylko gdy zmienna jest ustawiona.
import fc from 'fast-check';

const n = Number(process.env.PROP_RUNS);
if (Number.isInteger(n) && n > 0) fc.configureGlobal({ numRuns: n });
