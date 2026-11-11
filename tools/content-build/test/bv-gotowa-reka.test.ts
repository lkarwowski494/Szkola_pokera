// Recenzja BV (06-tresci, audit, 2026-11-10), znalezisko 06-tresci-201 (WYS): test odtwarzający, czerwony na 866744e.
// Ocena „pas” w szablonie draw-call stoi na rachunku: equity = outy do koloru/strita ÷ karty nieznane (R-M2-005, R-M7-007).
// To jest equity tylko wtedy, gdy bez trafienia gracz nie wygrywa. Gdy karta gracza poprawia stół (para i lepiej), reguła
// draw-price nie pasuje — tak samo wyłącza ją silnik ocen (packages/poker-core/src/grading.ts:430-431, drawFacts).
// Wyrocznia: classifyHolding (definicja silnika ocen), nie analyseOutsSpot, którego używa generator.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { classifyHolding, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';

const pl = loadScenarioTemplates(join(resolve(import.meta.dirname, '../../..'), 'content', 'pl', 'scenarios'))
  // tylko szablony draw-call: „pas” drawem; icm-call to decyzja przed flopem (bez stołu), cbet-case nie ma pasu (sesja CO, D-791)
  .filter((x) => x.template.decisions.every((d) => d.kind === 'draw-call'));
const LOSOWANIA = 2_000;

describe('06-tresci-201: ocena „pas” drawem tylko bez gotowej ręki gracza (R-M2-005 dotyczy samego drawa)', () => {
  for (const { template: t } of pl) {
    const g = { id: t.id, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      const b = t.bounds[level]!;
      if (!b.expected.includes('fold')) continue;
      it(`${t.id} ${level}: w punkcie z oczekiwanym „fold” karta gracza nie poprawia stołu`, () => {
        const zle: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA; seed++) {
          const v = generateVariant(g, level, seed);
          v.decisions.forEach((d, i) => {
            if (b.expected[i] !== 'fold') return;
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            if (classifyHolding(v.hero, stol).improvesBoard) zle.push(`${seed}#${i + 1}`);
          });
        }
        expect(zle.length, `warianty z gotową ręką gracza i oczekiwanym pasem: ${zle.slice(0, 5).join(', ')}`).toBe(0);
      }, 120_000);
    }
  }
});
