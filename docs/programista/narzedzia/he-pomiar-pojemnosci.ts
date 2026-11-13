// HE: pojemność i liczba prób generatora SC-22/25/29 przed (eaa44e46) i po zmianie D-1590; 2000 ziaren (PROBY_POJEMNOSCI), limit 60 000
// Uruchomienie: kopie packages/poker-core/src w tools/content-build/.he-tmp/{przed,po} (przed = scenario-gen.ts z eaa44e46), w obu po udanym tryVariant zapis PROBY.ostatnie = i + 1; potem (cd tools/content-build && npx tsx .he-tmp/pomiar.ts)
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import * as przed from './przed/index';
import * as po from './po/index';
import { PROBY as PP } from './przed/scenario-gen';
import { PROBY as PO } from './po/scenario-gen';
const root = resolve(import.meta.dirname, '../../..');
const all = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template);
const R = '23456789TJQKA';
for (const id of ['sc-22', 'sc-25', 'sc-28', 'sc-29']) {
  const t: any = all.find((x) => x.id === id)!;
  const g: any = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions };
  for (const level of t.levels) for (const [nazwa, m, licz] of [['przed', przed, PP], ['po', po, PO]] as const) {
    const odc = new Set<string>(); let maks = 0, suma = 0, bledy = 0, remisy = 0; const t0 = Date.now();
    for (let seed = 1; seed <= 2000; seed++) {
      try { const v: any = (m as any).generateVariant(g, level, seed); odc.add(v.fingerprint); maks = Math.max(maks, licz.ostatnie); suma += licz.ostatnie;
        if ((m as any).classComboSplit(v.hero, v.board, t.decisions[0].folds).ties > 0) remisy++; } catch { bledy++; }
    }
    console.log(`${id}|${level} ${nazwa}: odciski ${odc.size}/2000, błędy limitu ${bledy}, próby śr. ${(suma / (2000 - bledy)).toFixed(1)}, maks. ${maks} (limit 60000), warianty z remisem pasującej ${remisy}, czas ${Date.now() - t0} ms`);
  }
}
