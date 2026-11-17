// IP (IL-001, KO-123): SC-18 łatwy (oczekiwane bet-big) tylko z najwyższą parą z kickerem ≥ Q (jak turn-bet, D-1256). Wyrocznia z rang kart, bez classifyHolding:
// kicker = ranga drugiej karty gracza (tej, która nie paruje stołu turnu). Wszystkie 12 języków (bounds są w każdym pliku sc-18.yaml).
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compileRanges } from '../src/ranges';
import { generateVariant, rankOf, type GeneratorTemplate } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';

const gen = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

const korzen = resolve(import.meta.dirname, '../../..');
const ctx = { spots: compileRanges(join(korzen, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 } };
const Q = 10; // ranga Q w 23456789TJQKA
const ZIARNA = 300;
const jezyki = readdirSync(join(korzen, 'content'), { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== 'ranges').map((d) => d.name);

describe('IP: SC-18 bet-big tylko z kickerem ≥ Q', () => {
  it('jest 12 języków', () => { expect(jezyki).toHaveLength(12); });
  for (const lang of jezyki) {
    it(`${lang}: ${ZIARNA} ziaren, kicker najwyższej pary ≥ Q`, () => {
      const t = loadScenarioTemplates(join(korzen, 'content', lang, 'scenarios')).map((x) => x.template).find((x) => x.id === 'sc-18')!;
      const g = gen(t);
      const zle: string[] = [];
      for (let seed = 1; seed <= ZIARNA; seed++) {
        const v = generateVariant(g, 'latwy', seed, ctx);
        const p = v.points[0];
        if (p?.point !== 'turn-action' || p.correct !== 'bet-big') continue;
        const turn = v.board.slice(0, 4).map(rankOf);
        const najwyzsza = Math.max(...turn);
        const hero = v.hero.map(rankOf) as [number, number];
        const kicker = hero[0] === najwyzsza ? hero[1] : hero[0];
        if (!hero.includes(najwyzsza) || kicker < Q) zle.push(`${seed}: ${v.hero.join(' ')} na ${v.board.slice(0, 4).join(' ')} (kicker ${kicker})`);
      }
      expect(zle, `naruszenia ${zle.length}/${ZIARNA}`).toEqual([]);
    }, 300_000);
  }
});
