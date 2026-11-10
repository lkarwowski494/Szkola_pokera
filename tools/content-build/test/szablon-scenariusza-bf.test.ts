// BR-SZB-001 (D-533): format szablonu scenariusza i jego walidacja w budowaniu treści; szablony tu to fikcje testowe, nie treść.
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileContent } from '../src/build';
import { checkScenarioGenerator, checkScenarioTemplate, type ScenarioCheckContext } from '../src/scenariusze';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const BOUNDS = { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.02, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'] };
const BAZA = {
  id: 'sc-test-draw',
  module: 'm2',
  situation: 'Masz draw na flopie, rywal {{t:bet|stawia}}.',
  table: '6max',
  positions: { hero: 'BB', villain: 'BTN' },
  stackBb: 100,
  levels: ['latwy', 'sredni'],
  bounds: { latwy: { ...BOUNDS, marginMin: 0.1 }, sredni: BOUNDS },
  decisions: [{
    street: 'flop', kind: 'draw-call', pots: [20, 40], fractions: [0.25, 0.5, 1], villain: 'bet', rule: 'R-M2-001',
    actions: [
      { action: 'call', explanation: 'Masz draw, rywal {{t:bet|stawia}}: {{t:call|sprawdzasz}}, bo cena jest niższa niż szansa na trafienie ({{n:outs.flush}} outów).' },
      { action: 'fold', explanation: 'Masz draw, rywal {{t:bet|stawia}}: {{t:fold|pasujesz}}, bo szansa na trafienie jest niższa niż cena.' },
    ],
  }],
};
const kopia = (f: (b: typeof BAZA) => void): unknown => { const b = structuredClone(BAZA); f(b); return b; };
const ctx: ScenarioCheckContext = {
  ruleLevels: new Map([['R-M2-001', 'math'], ['R-M10-006', 'exploit']]),
  numberKeys: new Set(['outs.flush']),
  moduleIds: new Set(['m2', 'm3']),
};
const t = (v: unknown) => ScenarioTemplate.parse(v);

describe('format szablonu (schemat)', () => {
  it('kompletny szablon przechodzi', () => {
    expect(ScenarioTemplate.safeParse(BAZA).success).toBe(true);
  });
  it('punkt decyzji bez źródła oceny albo z dwoma źródłami nie przechodzi', () => {
    expect(ScenarioTemplate.safeParse(kopia((b) => { delete (b.decisions[0] as { rule?: string }).rule; })).success).toBe(false);
    expect(ScenarioTemplate.safeParse(kopia((b) => { (b.decisions[0] as { calc?: string }).calc = 'outs.flush'; })).success).toBe(false);
  });
  it('nieznane pole i brak wyjaśnienia akcji nie przechodzą', () => {
    expect(ScenarioTemplate.safeParse({ ...BAZA, extra: 1 }).success).toBe(false);
    expect(ScenarioTemplate.safeParse(kopia((b) => { b.decisions[0]!.actions[1]!.explanation = ''; })).success).toBe(false);
  });
  it('moduły bez scenariuszy (m0, m1, m12, m13) są odrzucane', () => {
    for (const m of ['m0', 'm1', 'm12', 'm13']) expect(ScenarioTemplate.safeParse({ ...BAZA, module: m }).success).toBe(false);
  });
});

describe('walidacja szablonu w budowaniu', () => {
  it('poprawny szablon: bez błędów', () => {
    expect(checkScenarioTemplate(t(BAZA), 'sc-test-draw.yaml', ctx)).toEqual([]);
  });
  it('nieznana reguła i nieznany rachunek: błąd z id szablonu i numerem punktu decyzji', () => {
    const e1 = checkScenarioTemplate(t(kopia((b) => { b.decisions[0]!.rule = 'R-NIE-MA'; })), 'sc-test-draw.yaml', ctx);
    expect(e1.join('\n')).toMatch(/sc-test-draw.*punkt decyzji 1.*R-NIE-MA/);
    const e2 = checkScenarioTemplate(t(kopia((b) => { delete (b.decisions[0] as { rule?: string }).rule; (b.decisions[0] as { calc?: string }).calc = 'brak.klucza'; })), 'sc-test-draw.yaml', ctx);
    expect(e2.join('\n')).toMatch(/sc-test-draw.*punkt decyzji 1.*brak\.klucza/);
  });
  it('poziom łatwy jest wymagany, a granice muszą pasować do listy poziomów', () => {
    expect(checkScenarioTemplate(t(kopia((b) => { b.levels = ['sredni']; delete (b.bounds as { latwy?: unknown }).latwy; })), 'sc-test-draw.yaml', ctx).join()).toMatch(/łatwy/);
    expect(checkScenarioTemplate(t(kopia((b) => { b.levels = ['latwy', 'sredni', 'trudny']; })), 'sc-test-draw.yaml', ctx).join()).toMatch(/trudny.*granic/);
  });
  it('akcje: obie (call, fold) dokładnie raz', () => {
    const e = checkScenarioTemplate(t(kopia((b) => { b.decisions[0]!.actions[1]!.action = 'call'; })), 'sc-test-draw.yaml', ctx);
    expect(e.join('\n')).toMatch(/punkt decyzji 1.*call.*fold/);
  });
  it('id musi być nazwą pliku (stabilność identyfikatorów), moduł musi istnieć', () => {
    expect(checkScenarioTemplate(t(BAZA), 'inny.yaml', ctx).join()).toMatch(/nazwą pliku/);
    expect(checkScenarioTemplate(t(kopia((b) => { b.module = 'm9'; })), 'sc-test-draw.yaml', ctx).join()).toMatch(/moduł m9/);
  });
  it('typ rywala wymaga reguły exploit', () => {
    const z = { ...BAZA, villainType: 'nit' };
    expect(checkScenarioTemplate(t(z), 'sc-test-draw.yaml', ctx).join()).toMatch(/exploit/);
    const ok = kopia((b) => { b.decisions[0]!.rule = 'R-M10-006'; });
    expect(checkScenarioTemplate(t({ ...(ok as object), villainType: 'nit' }), 'sc-test-draw.yaml', ctx)).toEqual([]);
  });
  it('generator: poprawny szablon ma pojemność ≥ 40 na poziom, niespełnialne granice dają błąd z id i poziomem', () => {
    expect(checkScenarioGenerator(t(BAZA))).toEqual([]);
    const zly = t(kopia((b) => { b.bounds.sredni = { ...BOUNDS, marginMin: 0.99 }; }));
    expect(checkScenarioGenerator(zly).join('\n')).toMatch(/sc-test-draw.*sredni/);
  }, 120_000);
});

describe('compileContent z szablonami scenariuszy', () => {
  const zTreścią = (pliki: Record<string, string>) => {
    const root = mkdtempSync(join(tmpdir(), 'scen-'));
    try {
      cpSync(contentDir, join(root, 'content'), { recursive: true });
      symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
      symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
      mkdirSync(join(root, 'content/pl/scenarios'), { recursive: true });
      for (const [n, y] of Object.entries(pliki)) writeFileSync(join(root, 'content/pl/scenarios', n), y);
      return compileContent(join(root, 'content'));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  };
  const yaml = (o: unknown) => JSON.stringify(o); // JSON jest poprawnym YAML-em
  it('szablon trafia do treści, liczby w wyjaśnieniach są podstawione', () => {
    const c = zTreścią({ 'sc-test-draw.yaml': yaml(BAZA) });
    expect(c.scenarios?.map((s) => s.id)).toEqual(['sc-test-draw']);
    expect(c.scenarios?.[0]?.decisions[0]?.actions[0]?.explanation).not.toContain('{{n:');
  }, 120_000);
  it('szablon bez źródła oceny przerywa budowanie z id i numerem punktu', () => {
    const zly = kopia((b) => { delete (b.decisions[0] as { rule?: string }).rule; });
    expect(() => zTreścią({ 'sc-test-draw.yaml': yaml(zly) })).toThrow(/sc-test-draw.*punkt decyzji 1/);
  }, 120_000);
  it('bez katalogu scenarios treść nie ma pola scenarios (hash bez zmian do czasu pierwszych szablonów)', () => {
    expect('scenarios' in compileContent(contentDir)).toBe(false);
  }, 120_000);
});
