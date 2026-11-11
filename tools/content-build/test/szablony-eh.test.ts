// Szablony SC-04, SC-05 (range-spot + cbet-case, po 08-A) i SC-08 (range-spot + size-spot, po KO-074/D-1040) w treści (rola 06, sesja EH,
// 2026-11-11). Ocena punktów wyroczniami niezależnymi: range-spot i size-spot w szablony-du.test.ts, cbet-case (także po range-spot,
// z sekwencją akcji zależną od positions.hero) w szablony-co.test.ts, ekran na prawdziwej bazie w cs-tresc-realna.test.tsx (06-tresci-003).
// Tu: jedno źródło (szkice usunięte), wszystkie 12 języków treści, ta sama struktura i ten sam zbiór znaczników co pl (przekład agenta,
// jakość językowa: rola 09).
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { defendVsCbet, parseCards } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';
import { number } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const JEZYKI = readdirSync(join(root, 'content')).filter((d) => statSync(join(root, 'content', d)).isDirectory() && d !== 'ranges');
const szablony = (lang: string) => loadScenarioTemplates(join(root, 'content', lang, 'scenarios')).map((x) => x.template);
const EH = ['sc-04', 'sc-05', 'sc-08'];
const znaczniki = (s: string) => [...new Set([...s.matchAll(/\{\{([twn]):([^}|]+)(?:\|[^}]*)?\}\}/g)].map((m) => `${m[1]}:${m[2]}`))].sort();

describe('EH: SC-04, SC-05, SC-08 w treści, szkice usunięte (jedno źródło)', () => {
  it('treść ma 12 języków', () => expect(JEZYKI.length).toBe(12));
  for (const id of EH) {
    it(`${id}: w content/pl/scenarios, nie w docs/tresci/szablony-robocze`, () => {
      expect(szablony('pl').map((t) => t.id)).toContain(id);
      expect(existsSync(join(root, 'docs', 'tresci', 'szablony-robocze', `${id}.yaml`))).toBe(false);
    });
  }
  it('poziomy: SC-04 tylko łatwy (D-1165), SC-05 łatwy i średni, SC-08 tylko łatwy (D-1034)', () => {
    const pl = szablony('pl');
    expect(EH.map((id) => [id, pl.find((t) => t.id === id)?.levels])).toEqual([['sc-04', ['latwy']], ['sc-05', ['latwy', 'sredni']], ['sc-08', ['latwy']]]);
  });
});

describe('EH: przekłady SC-04, SC-05, SC-08 — ta sama struktura i te same znaczniki co pl, w każdym języku', () => {
  const pl = szablony('pl');
  const bezTekstu = (t: (typeof pl)[number]) => ({ ...t, situation: '', decisions: t.decisions.map((d) => ({ ...d, actions: d.actions.map((x) => x.action) })) });
  for (const lang of JEZYKI.filter((l) => l !== 'pl')) {
    it(`${lang}: poziomy, granice, punkty, akcje i znaczniki jak pl`, () => {
      const t = szablony(lang);
      const rozbieznosci: string[] = [];
      for (const id of EH) {
        const a = pl.find((x) => x.id === id);
        const b = t.find((x) => x.id === id);
        if (!a || !b) { rozbieznosci.push(`${id}: brak szablonu (${a ? lang : 'pl'})`); continue; }
        if (JSON.stringify(bezTekstu(b)) !== JSON.stringify(bezTekstu(a))) rozbieznosci.push(`${id}: struktura inna niż pl`);
        if (znaczniki(b.situation).join() !== znaczniki(a.situation).join()) rozbieznosci.push(`${id} situation: ${znaczniki(b.situation).join()} ≠ ${znaczniki(a.situation).join()}`);
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

describe('08-EH-2 (D-1166, NIS-004): próg „dużego c-betu” w defendVsCbet = cbet.size.big z numbers.yaml, włącznie', () => {
  const big = number('cbet.size.big');
  const [qh, jd] = parseCards('Qh Jd') as [number, number];
  const flop = parseCards('7c 3d 2s');
  it('rozmiar równy kluczowi → fold (dwie wysokie karty, czysta ręka), tuż pod nim → null', () => {
    expect(big).toBe(0.75);
    expect(defendVsCbet([qh, jd], flop, big)).toBe('fold');
    expect(defendVsCbet([qh, jd], flop, big - 0.001)).toBeNull();
    expect(defendVsCbet([qh, jd], flop, 0.7)).toBeNull();
  });
});
