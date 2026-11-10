// KO-056 c / ŚR-002 (recenzja BZ): all-in rywala to dokładnie stos gracza za pulą, nie więcej (zaokrąglenie dawało +0,25 bb:
// sprawdzenie większe niż stos jest niemożliwe, a cena sprawdzenia liczona od zawyżonej kwoty).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, requiredEquity, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';
import { martweBlindy } from './martwe-blindy-wyrocznia';

const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'scenariusze')).filter((x) => x.template.id === 'sc-fx-allin-draw');
const LOSOWANIA = 2_000;

describe('ŚR-002: all-in równy stosowi za pulą', () => {
  it('fixture z linią all-in istnieje', () => expect(fx.length).toBe(1));
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: zakład = stos za pulą (±1e-9), cena z tej kwoty`, () => {
        const zle: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA; seed++) {
          const v = generateVariant(g, level, seed);
          const d = v.decisions[0]!;
          const stos = t.stackBb - (d.pot - martweBlindy(t.positions)) / 2;
          if (Math.abs(d.bet - stos) > 1e-9) zle.push(`${seed}: zakład ${d.bet}, stos ${stos}`);
          if (Math.abs(d.required - requiredEquity(d.pot, d.bet)) > 1e-12) zle.push(`${seed}: cena z innej kwoty`);
        }
        expect(zle.slice(0, 5)).toEqual([]);
      }, 120_000);
    }
  }
});
