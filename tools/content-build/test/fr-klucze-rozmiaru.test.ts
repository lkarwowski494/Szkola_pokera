// 06-tresci-008 (FR, recenzja FD fc16e128, opcja a): trwała kontrola zgodności rozmiaru zakładu w szablonie z kluczem `cbet.size.*` użytym w tekście wyjaśnienia.
// Szkice SC-17 (defend) i SC-20 (turn-bet) w docs/tresci/szablony-robocze/fd/pl czytane tylko do odczytu; mutacje na kopiach.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { kluczeRozmiaruZgodne, loadScenarioTemplates } from '../src/scenariusze';
import { number } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const szkice = loadScenarioTemplates(join(root, 'docs', 'tresci', 'szablony-robocze', 'fd', 'pl')).map((x) => x.template);
const sc = (id: string) => szkice.find((t) => t.id === id)!;
const zmien = (t: ScenarioTemplate, f: (b: any) => void) => { const b = structuredClone(t) as any; f(b); return ScenarioTemplate.parse(b); };
const wartosc = (k: string): number | undefined => { try { return number(k); } catch { return undefined; } };

describe('06-tresci-008: rozmiar w decyzji = klucz w tekście', () => {
  it('SC-20 (turn-bet, big 0,75) i SC-17 (defend, fractions [0,75]) są zgodne z cbet.size.big', () => {
    expect(number('cbet.size.big')).toBe(0.75);
    expect(kluczeRozmiaruZgodne(sc('sc-20'), wartosc)).toEqual([]);
    expect(kluczeRozmiaruZgodne(sc('sc-17'), wartosc)).toEqual([]);
  });
  it('SC-20: `big` ≠ cbet.size.big daje błąd z rozmiarem i kluczem', () => {
    const t = zmien(sc('sc-20'), (b) => { b.decisions[0].big = 0.6; });
    expect(kluczeRozmiaruZgodne(t, wartosc).join('\n')).toMatch(/sc-20.*big 0\.6.*cbet\.size\.big.*0\.75/);
  });
  it('SC-17: ułamek defend ≠ cbet.size.big daje błąd', () => {
    const t = zmien(sc('sc-17'), (b) => { b.decisions[0].fractions = [0.75, 0.5]; });
    expect(kluczeRozmiaruZgodne(t, wartosc).join('\n')).toMatch(/sc-17.*0\.5.*cbet\.size\.big/);
  });
  it('zmiana wartości klucza (np. 0,7) przy tym samym szablonie daje błąd (kierunek odwrotny)', () => {
    expect(kluczeRozmiaruZgodne(sc('sc-20'), (k) => (k === 'cbet.size.big' ? 0.7 : wartosc(k))).join('\n')).toMatch(/cbet\.size\.big/);
  });
  it('szablon bez klucza rozmiaru w tekście (SC-20 `small` mówi słowem) nie jest błędem tej kontroli', () => {
    const t = zmien(sc('sc-20'), (b) => { b.decisions[0].small = 0.2; });
    expect(kluczeRozmiaruZgodne(t, wartosc)).toEqual([]);
  });
});

describe('06-tresci-008: kontrola wpięta w checkScenarioTemplate (ctx.numberValue)', () => {
  it('z numberValue błąd rozmiaru trafia do wyniku bramki szablonu; bez numberValue kontrola pominięta', async () => {
    const { checkScenarioTemplate } = await import('../src/scenariusze');
    const t = zmien(sc('sc-20'), (b) => { b.decisions[0].big = 0.6; });
    const ctx = { ruleLevels: new Map<string, 'math'>([['R-M7-006', 'math']]), numberKeys: new Set<string>(), moduleIds: new Set(['m7']) } as unknown as Parameters<typeof checkScenarioTemplate>[2];
    expect(checkScenarioTemplate(t, 'sc-20.yaml', ctx).join('\n')).not.toMatch(/06-tresci-008/);
    expect(checkScenarioTemplate(t, 'sc-20.yaml', { ...ctx, numberValue: wartosc }).join('\n')).toMatch(/06-tresci-008/);
  });
});
