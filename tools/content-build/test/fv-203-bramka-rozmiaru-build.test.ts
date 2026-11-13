// 08-programista-203 (FU, mutant MU5; FV): wpięcie kontroli 06-tresci-008 w `compileContent` (build.ts: `numberValue` w kontekście bramki).
// Bez tego testu usunięcie `numberValue` z kontekstu po cichu wyłączało kontrolę (warunek `if (ctx.numberValue)` w scenariusze.ts), a testy zostawały zielone.
// Kopia content/ z jednym szkicem SC-20 (docs/tresci/szablony-robocze/fd/pl, tylko odczyt) dodanym do scenariuszy pl.
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';

const root = resolve(import.meta.dirname, '../../..');
const sc20 = readFileSync(join(root, 'docs', 'tresci', 'szablony-robocze', 'fd', 'pl', 'sc-20.yaml'), 'utf8');

/** Kompilacja kopii treści z dołożonym szablonem; wynik: komunikat błędu budowy albo null. */
function budowa(yaml: string): string | null {
  const kopia = mkdtempSync(join(tmpdir(), 'fv203-'));
  try {
    cpSync(join(root, 'content'), join(kopia, 'content'), { recursive: true });
    symlinkSync(join(root, 'tools'), join(kopia, 'tools'));
    symlinkSync(join(root, 'docs'), join(kopia, 'docs'));
    writeFileSync(join(kopia, 'content/pl/scenarios/sc-fv-203.yaml'), yaml);
    try { compileContent(join(kopia, 'content'), 'pl', { kontrolaGeneratora: false }); return null; } catch (e) { return e instanceof Error ? e.message : String(e); }
  } finally { rmSync(kopia, { recursive: true, force: true }); }
}

describe('08-programista-203: build wpina kontrolę rozmiaru 06-tresci-008', () => {
  it('SC-20 zgodny z cbet.size.big (big 0,75) przechodzi budowanie', () => {
    expect(budowa(sc20.replace(/^id: sc-20$/m, 'id: sc-fv-203'))).toBeNull();
  });
  it('SC-20 z big 0,6 przy {{n:cbet.size.big}} w tekście: błąd budowy 06-tresci-008', () => {
    const zly = sc20.replace(/^id: sc-20$/m, 'id: sc-fv-203').replace(/^(\s+)big: 0\.75$/m, '$1big: 0.6');
    expect(zly).not.toBe(sc20);
    expect(budowa(zly)).toMatch(/06-tresci-008/);
  });
});
