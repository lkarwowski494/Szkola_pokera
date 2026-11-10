// Szablony scenariuszy z treści (rola 06, sesja BS): BR-GEN-003 na 10 000 losowaniach na poziom z wyrocznią niezależną od
// generatora (outy z analyseOutsSpot na kartach wariantu, cena z requiredEquity), margines poziomu (BR-GEN-003, D-551) i warunek
// merytoryczny D-630: ocena „pas” drawem tylko wtedy, gdy pas daje też rachunek R-M7-008 z całym stosem za pulą
// (ten sam warunek co mathOk w packages/poker-core/src/grading.ts, reguła implied-odds). Przekłady: ta sama struktura co pl.
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { analyseOutsSpot, generateVariant, requiredEquity, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const pl = loadScenarioTemplates(join(contentDir, 'pl', 'scenarios'));
const LOSOWANIA = 10_000;
/** Martwe blindy w puli przed flopem (SB 0,5 + BB 1): wkład gracza preflop ≥ (pula − 1,5) ÷ 2, więc stos za pulą liczony z nadmiarem. */
const MARTWE_BB = 1.5;

/** Stos za pulą po sprawdzeniu punktu decyzji: górna granica (najwięcej, co gracz może jeszcze wygrać po trafieniu). */
function zaPula(stackBb: number, pulaFlop: number, zaklady: number): number {
  return Math.max(0, stackBb - (pulaFlop - MARTWE_BB) / 2 - zaklady);
}

describe('szablony scenariuszy z treści: decyzja niezmienna i oceny zgodne z rachunkiem (BR-GEN-003, D-630)', () => {
  it('treść pl ma szablony', () => {
    expect(pl.length).toBeGreaterThanOrEqual(3);
  });

  for (const { template: t } of pl) {
    const g = { id: t.id, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, oczekiwana akcja w każdym punkcie, margines poziomu, pas odporny na implied odds`, () => {
        const b = t.bounds[level]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed);
          let zaklady = 0;
          v.decisions.forEach((d, i) => {
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            const spot = analyseOutsSpot(v.hero, stol);
            if (!spot || !(b.draws as readonly string[]).includes(spot.draw.kind)) { bledy.push(`${seed}#${i + 1}: brak drawa z granic`); return; }
            const cena = requiredEquity(d.pot, d.bet);
            const akcja = spot.hitNextCard > cena ? 'call' : 'fold';
            const margines = Math.abs(spot.hitNextCard - cena);
            if (akcja !== b.expected[i]) bledy.push(`${seed}#${i + 1}: rachunek ${akcja}, szablon ${b.expected[i]}`);
            if (!(margines > 0 && margines >= (b.marginMin ?? 0) && (b.marginMax === null || margines < b.marginMax))) bledy.push(`${seed}#${i + 1}: margines ${margines}`);
            zaklady += d.bet;
            if (akcja === 'fold') {
              // R-M7-008: po trafieniu trzeba wygrać łącznie dopłata × (nietrafiające ÷ outy); ponad pulę po zakładzie to implied odds
              const nieznane = 52 - 2 - stol.length;
              const potrzeba = (d.bet * (nieznane - spot.outs)) / spot.outs - (d.pot + d.bet);
              // pojedyncza decyzja na flopie: gracz mógłby zobaczyć turn i river, więc liczona szansa na dwie karty (hojnie)
              if (d.street === 'flop' && v.decisions.length === 1) bledy.push(`${seed}#${i + 1}: pas na flopie bez rachunku na dwie karty (D-630)`);
              const dostepne = zaPula(t.stackBb, v.decisions[0]!.pot, zaklady);
              if (potrzeba <= dostepne) bledy.push(`${seed}#${i + 1}: pas nieodporny: implied odds ${potrzeba.toFixed(1)} ≤ ${dostepne.toFixed(1)} bb za pulą`);
            }
          });
        }
        expect(bledy).toEqual([]);
      }, 120_000);
    }
  }

  it('ŚR-103: w module nie wszystkie poziomy łatwe mają tę samą odpowiedź', () => {
    const wgModulu = new Map<string, Set<string>>();
    for (const { template: t } of pl) {
      const e = t.bounds.latwy?.expected.join(',');
      if (e) wgModulu.set(t.module, new Set([...(wgModulu.get(t.module) ?? []), e]));
    }
    const jedna = [...wgModulu].filter(([m, s]) => s.size === 1 && pl.filter((x) => x.template.module === m).length > 1);
    expect(jedna.map(([m]) => m)).toEqual([]);
  });
});

describe('przekłady szablonów: ta sama struktura co pl (zmienia się tylko tekst)', () => {
  const jezyki = readdirSync(contentDir, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== 'pl' && d.name !== 'ranges').map((d) => d.name);
  const bezTekstu = (t: (typeof pl)[number]['template']) => ({
    ...t, situation: '', decisions: t.decisions.map((d) => ({ ...d, actions: d.actions.map((a) => ({ ...a, explanation: '' })) })),
  });
  for (const j of jezyki) {
    it(`${j}: szablony jak w pl`, () => {
      const inne = loadScenarioTemplates(join(contentDir, j, 'scenarios'));
      if (inne.length === 0) return; // brak katalogu = język zastępczy (łańcuch treści)
      expect(inne.map((x) => x.template.id)).toEqual(pl.map((x) => x.template.id));
      inne.forEach((x, i) => expect(bezTekstu(x.template)).toEqual(bezTekstu(pl[i]!.template)));
    });
  }
});
