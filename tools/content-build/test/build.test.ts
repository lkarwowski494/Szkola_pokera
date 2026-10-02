import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { RuleDef } from '@szkola/content-schema';
import { compileContent } from '../src/build';
import { compileMarkdown } from '../src/markdown';
import { findHardcodedNumbers, formatNumber, resolveNumbers, substitute } from '../src/numbers';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

describe('markdown', () => {
  it('kompiluje karty, pogrubienie, ramki, wzory i tabele', () => {
    const ast = compileMarkdown('Masz **parę** [[As Ks]].\n\n:::note Uwaga\nTekst\n:::\n\n```formula\na = b\n```\n\n| A | B |\n|---|---|\n| 1 | [[2h]] |');
    expect(ast[0]).toEqual({ t: 'p', c: [{ t: 'text', v: 'Masz ' }, { t: 'text', v: 'parę', b: true }, { t: 'text', v: ' ' }, { t: 'cards', v: ['As', 'Ks'] }, { t: 'text', v: '.' }] });
    expect(ast[1]).toMatchObject({ t: 'note', title: 'Uwaga' });
    expect(ast[2]).toEqual({ t: 'formula', v: 'a = b' });
    expect(ast[3]).toMatchObject({ t: 'table' });
  });
  it('odrzuca nieobsługiwane elementy', () => {
    expect(() => compileMarkdown('# H1')).toThrow();
    expect(() => compileMarkdown('```js\nx\n```')).toThrow();
  });
});

describe('liczby', () => {
  it('formatuje po polsku', () => {
    expect(formatNumber(0.196, 'percent', 1)).toBe('19,6%');
    expect(formatNumber(2.5, 'bb', 1)).toBe('2,5bb');
  });
  it('liczy formuły i przerywa przy nieznanym kluczu', () => {
    const n = resolveNumbers({ x: { formula: 'requiredEquity', args: [100, 50], unit: 'percent', decimals: 0, source: 'test' } });
    expect(n.get('x')!.display).toBe('25%');
    expect(() => substitute('{{n:y}}', n, 'test', new Set())).toThrow(/nieznana liczba/);
  });
  it('wykrywa liczby wpisane ręcznie', () => {
    expect(findHardcodedNumbers('masz 25% i {{n:x}}, stawiasz 2,5bb')).toEqual(['25%', '2,5bb']);
  });
});

describe('schemat', () => {
  it('reguła eksploatacyjna wymaga populacji', () => {
    const base = { id: 'R-M10-001', module: 'm10', if: 'abc', then: 'abc', because: 'abc', level: 'exploit', source: 'abc' };
    expect(RuleDef.safeParse(base).success).toBe(false);
    expect(RuleDef.safeParse({ ...base, population: 'NL25, Ignition' }).success).toBe(true);
  });
});

describe('treść projektu', () => {
  it('kompiluje się bez błędów i bez liczb wpisanych ręcznie', () => {
    const c = compileContent(contentDir);
    expect(c.lessons.length).toBeGreaterThan(0);
    expect(c.warnings.filter((w) => w.includes('wpisane ręcznie'))).toEqual([]);
    expect(c.warnings.filter((w) => w.includes('nie jest nigdzie używana'))).toEqual([]);
  });
  it('jest deterministyczna (ten sam hash)', () => {
    expect(compileContent(contentDir).hash).toBe(compileContent(contentDir).hash);
  });
});
