// KO-056 b / ŚR-003 (recenzja BZ): schemat nie ustawia domyślnie marginMin = 0; poziom bez deklaracji marginesu w punkcie draw-call
// i poziom łatwy bez marginesu dodatniego nie przechodzą budowania (margines 0 na łatwym = decyzja bez jednoznacznej odpowiedzi).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate, loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'scenariusze'));
const baza = fx.find((x) => x.template.id === 'sc-fx-turn-gutshot')!.template;
const sctx = {
  ruleLevels: new Map(content.rules.map((r) => [r.id, r.level] as const)),
  numberKeys: new Set(content.numbers.map((n) => n.key)),
  moduleIds: new Set([baza.module]),
};
const kopia = (f: (b: any) => void) => { const b = structuredClone(baza) as any; f(b); return ScenarioTemplate.parse(b); };
const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');

describe('ŚR-003: margines poziomu', () => {
  it('schemat nie wstawia marginMin = 0, gdy poziom go nie podaje', () => {
    const t = kopia((b) => { delete b.bounds.latwy.marginMin; delete b.bounds.latwy.margins; });
    expect(t.bounds.latwy!.marginMin).toBeUndefined();
  });
  it('poziom draw-call bez marginMin i margins jest błędem budowania', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; delete b.bounds.latwy.margins; }))).toMatch(/poziom latwy: punkt draw-call wymaga marginMin albo margins/);
  });
  it('poziom łatwy z marginesem 0 jest błędem, trudny z 0 jest dozwolony', () => {
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0; delete b.bounds.latwy.margins; }))).toMatch(/poziom latwy: margines dolny musi być > 0/);
    const t = kopia((b) => { b.levels = ['latwy', 'trudny']; b.bounds.trudny = { ...structuredClone(b.bounds.latwy), marginMin: 0, marginMax: 0.02 }; delete b.bounds.trudny.margins; });
    expect(blad(t)).not.toMatch(/margines dolny/);
  });
  it('fixture z poprawnym marginesem przechodzi', () => {
    expect(checkScenarioTemplate(baza, 'sc-fx-turn-gutshot.yaml', sctx)).toEqual([]);
  });
});
