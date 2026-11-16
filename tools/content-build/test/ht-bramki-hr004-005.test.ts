// HT: HR-004 (mutant M9: `kluczeRozmiaruZgodne` pomija geo-size) i HR-005 (check-raise: `cbet` szablonu wiązany z `cbet.size.small`, jedno źródło prawdy).
// Fixtures to nie treść aplikacji (jak ho-bramki.test.ts).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';
import { checkScenarioTemplate, kluczeRozmiaruZgodne, loadScenarioTemplates } from '../src/scenariusze';

const dir = resolve(import.meta.dirname);
const root = resolve(dir, '../../..');
const spots = compileRanges(join(root, 'content')).spots;
const liczby: Record<string, number> = { 'xr.mult.example': 4.5, 'xr.too-small.mult': 1.5, 'cbet.size.small': 0.333333, 'cbet.size.big': 0.75 };
const sctx = {
  ruleLevels: new Map([['R-M9-009', 'math'], ['R-M6-008', 'heuristic']] as const),
  numberKeys: new Set<string>(Object.keys(liczby)), numberValue: (k: string) => liczby[k], moduleIds: new Set(['m6', 'm9']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)] as const)),
};
const wczytaj = (nazwa: string) => loadScenarioTemplates(join(dir, 'fixtures', nazwa))[0]!;
const kopia = (t: ScenarioTemplate, f: (b: any) => void) => { const b = structuredClone(t) as any; f(b); return ScenarioTemplate.parse(b); };
const wartosc = (k: string): number | undefined => liczby[k];

describe('HT HR-004 (M9): kluczeRozmiaruZgodne obejmuje geo-size', () => {
  const fx = wczytaj('geo-size').template;
  const zKluczem = (small: number) => kopia(fx, (b) => {
    b.decisions[0].small = small;
    b.decisions[0].actions[0].explanation = 'Masz {{w:reka}}, SPR {{w:spr}}: mały zakład to {{n:cbet.size.small}} puli i nie wpłaci stacku.';
  });
  it('small zgodny z cbet.size.small: brak błędu', () => {
    expect(kluczeRozmiaruZgodne(zKluczem(0.333333), wartosc)).toEqual([]);
  });
  it('small ≠ cbet.size.small (0,5 wobec 0,333333) przy kluczu w tekście: błąd z rozmiarem i kluczem', () => {
    expect(kluczeRozmiaruZgodne(zKluczem(0.5), wartosc).join('\n')).toMatch(/geo-size.*small 0\.5.*cbet\.size\.small.*0\.333333/);
  });
});

describe('HT HR-005: check-raise: cbet wiązany z cbet.size.small', () => {
  const fx = wczytaj('check-raise');
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  it('fixture z cbet = cbet.size.small przechodzi', () => {
    expect(checkScenarioTemplate(kopia(fx.template, (b) => { b.decisions[0].cbet = 0.333333; }), fx.file, sctx)).toEqual([]);
  });
  it('cbet 0,5 ≠ cbet.size.small daje błąd budowania', () => {
    expect(blad(kopia(fx.template, (b) => { b.decisions[0].cbet = 0.5; }))).toMatch(/cbet 0\.5.*cbet\.size\.small.*0\.333333/);
  });
});

describe('HT (dodatek HU, D-1771): kontrola 06-tresci-008 zna ex.frac.* dla turn-bet', () => {
  const fx = wczytaj('turn-bet').template;
  const lw: Record<string, number> = { ...liczby, 'ex.frac.quarter': 0.25, 'ex.frac.three-quarters': 0.75 };
  const w = (k: string): number | undefined => lw[k];
  const zTekstem = (small: number, big: number) => kopia(fx, (b) => {
    b.decisions[0].small = small; b.decisions[0].big = big;
    b.decisions[0].actions[0].explanation = 'Mały zakład to {{n:ex.frac.quarter}} puli, duży {{n:ex.frac.three-quarters}} puli.';
  });
  it('small 0,25 i big 0,75: brak błędu', () => {
    expect(kluczeRozmiaruZgodne(zTekstem(0.25, 0.75), w)).toEqual([]);
  });
  it('small 0,333333 wobec ex.frac.quarter 0,25: błąd', () => {
    expect(kluczeRozmiaruZgodne(zTekstem(0.333333, 0.75), w).join('\n')).toMatch(/turn-bet.*small 0\.333333.*ex\.frac\.quarter.*0\.25/);
  });
  it('big 0,5 wobec ex.frac.three-quarters 0,75: błąd', () => {
    expect(kluczeRozmiaruZgodne(zTekstem(0.25, 0.5), w).join('\n')).toMatch(/turn-bet.*big 0\.5.*ex\.frac\.three-quarters.*0\.75/);
  });
});
