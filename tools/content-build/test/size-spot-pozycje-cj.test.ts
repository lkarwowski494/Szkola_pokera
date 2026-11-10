// CJ ŚR-003 (recenzja CE 08-programista-003): size-spot sprawdza pozycje wobec reguły: gracz ≠ rywal, kolejność akcji
// preflop (otwierający przed rywalem; przy 3-becie rywal otworzył przed graczem) i zgodność ip/oop reguły z pozycjami po flopie.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'size-spot'));
const reguly = content.evalRules.filter((r) => ['open-size', 'three-bet-size', 'no-limp'].includes(r.check.kind));
const sctx = {
  ruleLevels: new Map(content.evalRules.map((r) => [r.id, r.level] as const)),
  numberKeys: new Set<string>(),
  moduleIds: new Set(['m3', 'm4']),
  sizeRules: reguly as never,
};
const wez = (id: string) => fx.find((x) => x.template.id === id)!.template;
const bledy = (id: string, hero: string, villain: string) => {
  const b = structuredClone(wez(id)) as any;
  b.positions = { hero, villain };
  const t = ScenarioTemplate.parse(b);
  return checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
};

describe('CJ ŚR-003: pozycje size-spot', () => {
  it('fixtury z poprawnymi pozycjami przechodzą', () => {
    for (const { template, file } of fx) expect(checkScenarioTemplate(template, file, sctx)).toEqual([]);
  });
  it('gracz i rywal w tym samym miejscu to błąd', () => {
    expect(bledy('sc-fx-3bet-oop', 'BB', 'BB')).toMatch(/gracz i rywal nie mogą siedzieć na tej samej pozycji/);
    expect(bledy('sc-fx-open-size', 'BTN', 'BTN')).toMatch(/gracz i rywal nie mogą siedzieć na tej samej pozycji/);
  });
  it('open-size: BB nie otwiera, a rywal działa po otwierającym', () => {
    expect(bledy('sc-fx-open-size', 'BB', 'BTN')).toMatch(/otwierający .* przed rywalem/);
    expect(bledy('sc-fx-open-size', 'BTN', 'CO')).toMatch(/otwierający .* przed rywalem/);
  });
  it('three-bet-size: rywal otworzył przed graczem', () => {
    expect(bledy('sc-fx-3bet-ip', 'CO', 'BTN')).toMatch(/rywal otworzył przed graczem/);
  });
  it('three-bet-size: ip/oop reguły zgodne z pozycjami po flopie', () => {
    expect(bledy('sc-fx-3bet-ip', 'SB', 'BTN')).toMatch(/reguła .* position ip, a gracz jest poza pozycją/);
    expect(bledy('sc-fx-3bet-oop', 'BTN', 'CO')).toMatch(/reguła .* position oop, a gracz ma pozycję/);
  });
  // CJ ŚR-004: złe „raise-small” = 0,8 × 2,5 = 2,0 bb to rozmiar solvera z UTG (Range Morphology: „The smallest open is for the minimum of 2bb from UTG, the CO makes it 2.3bb, the BTN makes it 2.5bb, and the SB makes it 3bb”),
  // więc open-size z UTG…CO uczyłby, że rozmiar solvera jest zły; dozwolone tylko BTN i SB.
  it('open-size tylko z BTN i SB (rozmiar solvera z UTG to 2 bb)', () => {
    for (const hero of ['UTG', 'UTG1', 'UTG2', 'LJ', 'HJ', 'CO']) expect(bledy('sc-fx-open-size', hero, 'BB')).toMatch(/open-size tylko z BTN i SB/);
    expect(bledy('sc-fx-open-size', 'BTN', 'BB')).toBe('');
  });
  it('no-limp nie jest ograniczony do BTN i SB', () => {
    expect(bledy('sc-fx-no-limp', 'CO', 'BB')).toBe('');
  });
});
