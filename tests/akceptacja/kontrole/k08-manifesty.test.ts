// K-08 na drzewie zależności po `pnpm install` (skaner: tests/narzedzia/k08-manifesty.mjs, testy w `pnpm test:skrypty`).
// Oczekujący (D-175): czerwony, dopóki rola 10 nie uzupełni `expo.ios.privacyManifests` (prywatnosc.md §2 „Wniosek dla roli 10”)
// i rola 08 nie usunie trzech typów zbieranych danych (ADR 0009). W CI kontrola informacyjna (strategia.md §8.1).
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

const SKANER = fileURLToPath(new URL('../../narzedzia/k08-manifesty.mjs', import.meta.url));
const KORZEN = fileURLToPath(new URL('../../../', import.meta.url));

it('AK-K-08 każda kategoria required reason API z drzewa zależności jest w app.json; brak zbieranych danych i śledzenia', () => {
  const r = spawnSync(process.execPath, [SKANER, '--json'], { encoding: 'utf8', cwd: KORZEN });
  expect(r.stderr).toBe('');
  const w = JSON.parse(r.stdout) as { braki: string[]; naruszenia: string[]; pakiety: unknown[] };
  expect(w.pakiety.length).toBeGreaterThan(0); // strażnik: skan widzi zainstalowane pakiety
  expect(w.braki).toEqual([]);
  expect(w.naruszenia).toEqual([]);
  expect(r.status).toBe(0);
});
