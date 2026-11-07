// K-07 + D-174 na kodzie repo (skaner: tests/narzedzia/k07-zakazy.mjs, jego testy w `pnpm test:skrypty`). Oczekujący (D-175):
// czerwony, dopóki rola 08 nie usunie Sentry i Expo Observe (ADR 0009) — wtedy przechodzi do `ci.yml` jako bramka (strategia.md §5).
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

const SKANER = fileURLToPath(new URL('../../narzedzia/k07-zakazy.mjs', import.meta.url));

it('AK-K-07 kod produkcyjny w apps/ i packages/ bez zakazanych wzorców (0 trafień)', () => {
  const r = spawnSync(process.execPath, [SKANER, '--json'], { encoding: 'utf8' });
  expect(r.stderr).toBe('');
  const trafienia = JSON.parse(r.stdout) as { regula: string; sciezka: string; linia: number }[];
  expect(trafienia.map((t) => `${t.sciezka}:${t.linia} [${t.regula}]`)).toEqual([]);
  expect(r.status).toBe(0);
});
