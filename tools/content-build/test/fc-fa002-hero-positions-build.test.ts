// FC FA-002 (recenzja FA, 08-programista-002): `params.heroPositions` reguły cbet-case jest sprawdzane przy kompilacji reguł (build treści),
// nie dopiero w grze: pusty napis, nie-napis, pozycja spoza nazw stołu reguły (wielkość liter liczy się: „hj”) i literówka („C0”) to błąd builda z ID reguły.
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const OBECNE = 'heroPositions: "HJ,CO"';

/** Kompiluje kopię treści z podmienioną wartością `heroPositions` w R-M5-012 (pl). */
function zWartoscia(wartosc: string) {
  const root = mkdtempSync(join(tmpdir(), 'herop-'));
  try {
    cpSync(contentDir, join(root, 'content'), { recursive: true });
    symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
    symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
    const p = join(root, 'content/pl/rules.yaml');
    const tekst = readFileSync(p, 'utf8');
    expect(tekst.split(OBECNE).length).toBe(2); // wartość występuje dokładnie raz (sprawdzenie samego testu)
    writeFileSync(p, tekst.replace(OBECNE, `heroPositions: ${wartosc}`));
    return compileContent(join(root, 'content'), 'pl', { kontrolaGeneratora: false });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('FC FA-002: heroPositions w buildzie treści', () => {
  it('poprawna wartość „HJ,CO” przechodzi i trafia do skompilowanej reguły', () => {
    const r = zWartoscia('"HJ,CO"').evalRules.find((x) => x.id === 'R-M5-012');
    expect(r?.check.params?.heroPositions).toBe('HJ,CO');
  });
  for (const [opis, wartosc, wzorzec] of [
    ['pusty napis', '""', /R-M5-012.*heroPositions.*pusta/],
    ['liczba zamiast napisu', '5', /R-M5-012.*heroPositions.*napis/],
    ['małe litery („hj,co”)', '"hj,co"', /R-M5-012.*heroPositions.*hj/],
    ['literówka („C0” z zerem)', '"HJ,C0"', /R-M5-012.*heroPositions.*C0/],
  ] as const) {
    it(`${opis} → błąd builda z ID reguły`, () => {
      expect(() => zWartoscia(wartosc)).toThrow(wzorzec);
    });
  }
});
