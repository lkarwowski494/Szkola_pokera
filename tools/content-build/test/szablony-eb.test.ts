// Poprawki szablonów DU po recenzji EA (rola 06, sesja EB, 2026-11-11; recenzja docs/tresci/recenzje/recenzja-du-7a7a0f1d.md
// na gałęzi sesja-ea-recenzja). Każdy blok odtwarza jedno znalezisko i był czerwony na 7a7a0f1d.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { blindMiejsca } from './martwe-blindy-wyrocznia';

const root = resolve(import.meta.dirname, '../../..');
const JEZYKI = readdirSync(join(root, 'content')).filter((d) => statSync(join(root, 'content', d)).isDirectory() && d !== 'ranges');
const szablony = (lang: string) => loadScenarioTemplates(join(root, 'content', lang, 'scenarios')).map((x) => x.template);
const DU = ['sc-06', 'sc-32', 'sc-33', 'sc-34'];
/** Zbiór (bez powtórzeń: przekład może powtórzyć pojęcie rzadziej) pojęć słownika ({{t:id}}, {{t:id|forma}}) i wstawek ({{w:…}}, {{n:…}}). */
const znaczniki = (s: string) => [...new Set([...s.matchAll(/\{\{([twn]):([^}|]+)(?:\|[^}]*)?\}\}/g)].map((m) => `${m[1]}:${m[2]}`))].sort();

describe('06-tresci-006: przekłady szablonów DU mają te same znaczniki co pl, w każdym języku', () => {
  it('treść ma 12 języków', () => expect(JEZYKI.length).toBe(12));
  const pl = szablony('pl');
  for (const lang of JEZYKI.filter((l) => l !== 'pl')) {
    it(`${lang}: sytuacja i każde wyjaśnienie SC-06, SC-32, SC-33, SC-34 mają zbiór znaczników jak pl`, () => {
      const t = szablony(lang);
      const rozbieznosci: string[] = [];
      for (const id of DU) {
        const a = pl.find((x) => x.id === id)!;
        const b = t.find((x) => x.id === id);
        if (!b) { rozbieznosci.push(`${id}: brak szablonu`); continue; }
        if (znaczniki(b.situation).join() !== znaczniki(a.situation).join()) rozbieznosci.push(`${id} situation`);
        a.decisions.forEach((d, i) => d.actions.forEach((x, j) => {
          const y = b.decisions[i]?.actions[j];
          if (y?.action !== x.action) rozbieznosci.push(`${id} ${i} ${x.action}: brak akcji`);
          else if (znaczniki(y.explanation).join() !== znaczniki(x.explanation).join()) rozbieznosci.push(`${id} ${i} ${x.action}: ${znaczniki(y.explanation).join()} ≠ ${znaczniki(x.explanation).join()}`);
        }));
      }
      expect(rozbieznosci).toEqual([]);
    });
  }
});

// 06-tresci-001: wyjaśnienie akcji poprawnej jest jedno dla wszystkich wariantów poziomu, więc jego przyczyna musi być prawdziwa w każdym.
// Zdanie decyzji (to ze znacznikiem akcji) może podać {{t:payout}} (ICM) jako powód tylko wtedy, gdy w każdym wariancie gra o żetony
// dałaby inną akcję; inaczej powodem jest equity ręki wobec progu z ICM ({{t:equity}} i {{t:icm}} w tym zdaniu). Equity i próg ICM
// wariantu są sprawdzone wyrocznią niezależną w szablony-co; próg w żetonach (S − blind) ÷ 2S (R-M11-006) liczony tu z tabeli blindów.
describe('06-tresci-001: SC-34 — przyczyna w zdaniu decyzji prawdziwa dla każdego wariantu generatora, w każdym języku', () => {
  const LOSOWANIA = 10_000;
  const t = szablony('pl').find((x) => x.id === 'sc-34')!;
  const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) };
  const zetony = (t.stackBb - blindMiejsca(t.positions.hero)) / (2 * t.stackBb);
  /** Zdania tekstu (kropka, wykrzyknik, pytajnik albo 。), bez rozbijania znaczników {{…}}. */
  const zdania = (s: string) => s.split(/(?<=[.!?。])\s*(?![^{]*\}\})/).filter((z) => z.trim());
  for (const level of t.levels as ScenarioLevel[]) {
    const poprawna = t.bounds[level]!.expected[0]!;
    let takSamoWZetonach = 0;
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const p = generateVariant(g, level, seed, ctx).points[0]!;
      if (p.point !== 'icm-call') throw new Error(`${seed}: punkt ${p.point}`);
      if ((p.handEquity >= zetony ? 'call' : 'fold') === p.correct) takSamoWZetonach++;
    }
    it(`${level}: generator ma warianty, w których gra o żetony daje tę samą akcję (${poprawna}): ${takSamoWZetonach}/${LOSOWANIA}`, () => {
      expect(takSamoWZetonach).toBeGreaterThan(0);
    });
    for (const lang of JEZYKI) {
      it(`${lang} ${level}: zdanie decyzji ${poprawna} uzasadnia equity wobec progu z ICM, nie wypłatami`, () => {
        const tl = szablony(lang).find((x) => x.id === 'sc-34')!;
        const wyj = tl.decisions[0]!.actions.find((a) => a.action === poprawna)!.explanation;
        const decyzja = zdania(wyj).filter((z) => z.includes(`{{t:${poprawna}`));
        expect(decyzja).toHaveLength(1);
        expect({ payout: /\{\{t:payout[|}]/.test(decyzja[0]!), equity: /\{\{t:equity[|}]/.test(decyzja[0]!), icm: /\{\{t:icm[|}]/.test(decyzja[0]!) })
          .toEqual({ payout: false, equity: true, icm: true });
      });
    }
  }
});
