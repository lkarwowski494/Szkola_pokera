// D-1461 (FQ; FV): klucz ceny zakładu ⅔ puli w numbers.yaml jako formuła z `refs` (nie wpis ręczny): ex.frac.two-thirds → ex.bet.two-thirds (product) → eq.bet-two-thirds (requiredEquity).
// Rachunek: bet ÷ (pula + 2·bet) przy zakładzie ⅔ puli = (2/3) ÷ (1 + 4/3) = 2/7 ≈ 28,6% (nie 40%).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { LICZBY_ZAREZERWOWANE } from '../src/build';
import { content, number } from './kit';

const raw = parseYaml(readFileSync(join(resolve(import.meta.dirname, '../../..'), 'content', 'numbers.yaml'), 'utf8')) as Record<string, Record<string, unknown>>;

describe('D-1461: cena ⅔ puli', () => {
  it('eq.bet-two-thirds to formuła requiredEquity z refs, a zakład to product z ułamka (bez ręcznej liczby)', () => {
    expect(raw['eq.bet-two-thirds']).toMatchObject({ formula: 'requiredEquity', refs: ['ex.pot', 'ex.bet.two-thirds'], unit: 'percent' });
    expect(raw['ex.bet.two-thirds']).toMatchObject({ formula: 'product', refs: ['ex.pot', 'ex.frac.two-thirds'] });
    expect(raw['eq.bet-two-thirds']).not.toHaveProperty('value');
    expect(raw['ex.bet.two-thirds']).not.toHaveProperty('value');
  });
  it('wartość: zakład 66,67 przy puli 100 → potrzeba 2/7 ≈ 28,57% (niezależny rachunek)', () => {
    const f = number('ex.frac.two-thirds');
    expect(f).toBeCloseTo(2 / 3, 5);
    const zaklad = number('ex.bet.two-thirds');
    expect(zaklad).toBeCloseTo(100 * f, 9);
    expect(number('eq.bet-two-thirds')).toBeCloseTo(zaklad / (100 + 2 * zaklad), 9);
    expect(number('eq.bet-two-thirds')).toBeCloseTo(2 / 7, 4);
  });
});

describe('D-1490: lista liczb zarezerwowanych pod treść', () => {
  // HA (D-1562): SC-13 weszło do content/ z {{n:eq.bet-two-thirds}} (refs: ex.bet.two-thirds, ex.frac.two-thirds), więc wpisy D-1461 wygasły
  it('klucze D-1461 są użyte w SC-13 i nie ma ich na liście, a lista nie trzyma liczb już użytych ani nieistniejących', () => {
    for (const k of ['ex.frac.two-thirds', 'ex.bet.two-thirds', 'eq.bet-two-thirds']) expect(LICZBY_ZAREZERWOWANE).not.toHaveProperty(k);
    for (const j of ['pl', 'en']) expect(readFileSync(join(resolve(import.meta.dirname, '../../..'), 'content', j, 'scenarios', 'sc-13.yaml'), 'utf8')).toContain('{{n:eq.bet-two-thirds}}');
    for (const k of Object.keys(LICZBY_ZAREZERWOWANE)) expect(raw).toHaveProperty(k);
    expect(content.warnings.filter((w) => /nie jest nigdzie używana|jest już używana/.test(w))).toEqual([]);
  });
});
