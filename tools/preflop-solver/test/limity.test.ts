import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LIMIT_CIEZKI_MS } from './limity';

// F-SOLVER-CZAS: limit ciężkich testów w jednym miejscu (DEV-13), nie wpisany liczbą w pliki testów.
describe('limity czasu testów solvera', () => {
  it('LIMIT_CIEZKI_MS ≥ 180 s; żaden test nie ma limitu wpisanego liczbą poniżej niego', () => {
    expect(LIMIT_CIEZKI_MS).toBeGreaterThanOrEqual(180_000);
    const dir = new URL('./', import.meta.url);
    const wpisane = readdirSync(dir)
      .filter((f) => f.endsWith('.test.ts') && f !== 'limity.test.ts')
      .flatMap((f) => readFileSync(new URL(f, dir), 'utf8').split('\n').map((l, i) => ({ f, i: i + 1, l })))
      .filter(({ l }) => {
        const m = /\}\s*,\s*([\d_]+)\s*\)\s*;?\s*$/.exec(l);
        return m !== null && Number(m[1]!.replace(/_/g, '')) < LIMIT_CIEZKI_MS;
      })
      .map(({ f, i, l }) => `${f}:${i}: ${l.trim()}`);
    expect(wpisane).toEqual([]);
  });
});
