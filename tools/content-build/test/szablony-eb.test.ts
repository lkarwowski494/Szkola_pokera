// Poprawki szablonów DU po recenzji EA (rola 06, sesja EB, 2026-11-11; recenzja docs/tresci/recenzje/recenzja-du-7a7a0f1d.md
// na gałęzi sesja-ea-recenzja). Każdy blok odtwarza jedno znalezisko i był czerwony na 7a7a0f1d.
import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadScenarioTemplates } from '../src/scenariusze';

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
