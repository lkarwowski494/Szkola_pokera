// F1 (KO-049): punkt range-spot (preflop) oceniany częstościami solvera (ADR-26). BR-GEN-003: 10 000 losowań na poziom.
// Wyrocznia niezależna od generatora: częstości czytane wprost z content/ranges/preflop-6max-100bb.json (węzeł wg path i gracza
// ze spots.yaml), werdykt rangeVerdict (wspólna logika oceny ADR-26) z progami z numbers.yaml; klasa ręki z kart wariantu.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line
import { classOf, generateVariant, HAND_CLASSES, rangeVerdict, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';

const root = resolve(import.meta.dirname, '../../..');
const contentDir = join(root, 'content');
const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'range-spot'));
const spots = compileRanges(contentDir).spots;
const LOSOWANIA = 10_000;

const solver = JSON.parse(readFileSync(join(contentDir, 'ranges/preflop-6max-100bb.json'), 'utf8')) as {
  spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[];
};
const defs = parseYaml(readFileSync(join(contentDir, 'ranges/spots.yaml'), 'utf8')) as { id: string; hero: string; path: string; uncertain?: string[] }[];
const numbers = parseYaml(readFileSync(join(contentDir, 'numbers.yaml'), 'utf8')) as Record<string, { value: number }>;
const progi = { mixedMin: numbers['range.mixed.min']!.value, mixedLow: numbers['range.mixed.low']!.value };

/** Częstości wszystkich akcji węzła dla klasy ręki, wprost z pliku solvera. */
function czestosci(spotId: string, hc: string): { labels: string[]; f: number[]; uncertain: boolean } {
  const def = defs.find((x) => x.id === spotId)!;
  const node = solver.spots.find((n) => n.path === def.path && n.player === def.hero)!;
  return { labels: node.actions, f: node.actions.map((_, i) => node.strategy[i]![hc]!), uncertain: (def.uncertain ?? []).includes(hc) };
}

describe('F1: range-spot', () => {
  it('fixture ładują się, a spoty istnieją w treści', () => {
    expect(fx.map((x) => x.template.id).sort()).toEqual(['sc-fx-rfi-btn', 'sc-fx-rfi-fold']);
    expect(spots.map((s) => s.id)).toEqual(expect.arrayContaining(['rfi.btn', 'rfi.utg']));
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, częstość i werdykt wg solvera`, () => {
        const b = t.bounds[level]!;
        const przedzial = b.freqs![0]!;
        const oczekiwana = b.expected[0]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed, { spots, thresholds: progi });
          const hc = classOf(v.hero[0], v.hero[1]);
          const c = czestosci((t.decisions[0] as { spot: string }).spot, hc);
          const i = c.labels.indexOf(oczekiwana);
          if (c.uncertain) bledy.push(`${seed}: klasa niepewna ${hc}`);
          if (i < 0) { bledy.push(`${seed}: brak akcji ${oczekiwana}`); continue; }
          const f = c.f[i]!;
          if (!(f >= przedzial.min && f <= przedzial.max)) bledy.push(`${seed}: ${hc} częstość ${f} poza [${przedzial.min}, ${przedzial.max}]`);
          if (rangeVerdict(c.f, progi)[i] !== 'correct') bledy.push(`${seed}: ${hc} werdykt ${rangeVerdict(c.f, progi)[i]}`);
          if (v.points[0]!.point !== 'range-spot') bledy.push(`${seed}: rodzaj ${v.points[0]!.point}`);
          if (v.hero.length !== 2 || new Set([...v.hero, ...v.villain, ...v.board]).size !== 9) bledy.push(`${seed}: karty się powtarzają`);
        }
        expect(bledy).toEqual([]);
        expect(HAND_CLASSES.length).toBe(169);
      }, 120_000);
    }
  }
});

import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate } from '../src/scenariusze';

describe('F1: walidacja szablonu range-spot w budowaniu', () => {
  const ctx = {
    ruleLevels: new Map([['R-M3-003', 'gto' as const], ['R-M3-002', 'gto' as const]]),
    numberKeys: new Set<string>(),
    moduleIds: new Set(['m3']),
    spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
  };
  const baza = fx.find((x) => x.template.id === 'sc-fx-rfi-btn')!.template;
  const kopia = (f: (b: any) => void) => { const b = structuredClone(baza) as any; f(b); return ScenarioTemplate.parse(b); };
  it('fixture przechodzi', () => {
    expect(checkScenarioTemplate(baza, 'sc-fx-rfi-btn.yaml', ctx)).toEqual([]);
  });
  it('nieznany spot, akcja spoza węzła i brak freqs to błędy z id i numerem punktu', () => {
    expect(checkScenarioTemplate(kopia((b) => { b.decisions[0].spot = 'rfi.nie-ma'; }), 'sc-fx-rfi-btn.yaml', ctx).join('\n')).toMatch(/punkt decyzji 1.*nieznany spot zakresu rfi.nie-ma/);
    expect(checkScenarioTemplate(kopia((b) => { b.decisions[0].actions[1].action = 'raise 9'; }), 'sc-fx-rfi-btn.yaml', ctx).join('\n')).toMatch(/akcje spoza węzła spotu rfi.btn: raise 9/);
    expect(checkScenarioTemplate(kopia((b) => { delete b.bounds.latwy.freqs; }), 'sc-fx-rfi-btn.yaml', ctx).join('\n')).toMatch(/poziom latwy: punkt range-spot wymaga przedziału freqs/);
  });
  it('oczekiwana akcja bez wyjaśnienia to błąd (BR-OCE-002)', () => {
    expect(checkScenarioTemplate(kopia((b) => { b.decisions[0].actions[0].action = 'fold'; }), 'sc-fx-rfi-btn.yaml', ctx).join('\n')).toMatch(/oczekiwana akcja raise 2.5 nie ma wyjaśnienia/);
  });
});
