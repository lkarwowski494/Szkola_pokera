import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { RangeSpotsFile, type CompiledRangeSpot } from '@szkola/content-schema';
import { combosCount, HAND_CLASSES } from '@szkola/poker-core';

interface SolverFile {
  meta: Record<string, unknown>;
  spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[];
}

const DEFAULT_SOLVER = 'preflop-6max-100bb.json';

/**
 * Kompiluje nazwane spoty zakresów z wyniku solvera preflop (ADR-20).
 * Brak pliku solvera = brak zakresów (lekcje z blokiem ```range nie przejdą walidacji).
 */
export function compileRanges(contentDir: string): { spots: CompiledRangeSpot[]; solverMeta: Record<string, unknown> | null } {
  const defsPath = join(contentDir, 'ranges/spots.yaml');
  const solverPath = join(contentDir, 'ranges', DEFAULT_SOLVER);
  if (!existsSync(defsPath) || !existsSync(solverPath)) return { spots: [], solverMeta: null };
  const r = RangeSpotsFile.safeParse(parseYaml(readFileSync(defsPath, 'utf8')));
  if (!r.success) throw new Error(`ranges/spots.yaml: ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  const solver = JSON.parse(readFileSync(solverPath, 'utf8')) as SolverFile;
  // inne pliki solvera (pole solver w spots.yaml, np. pushfold-hu.json w M11): wczytywane raz, ścieżki węzłów osobno dla pliku
  const files = new Map<string, Map<string, SolverFile['spots'][number]>>([[DEFAULT_SOLVER, new Map(solver.spots.map((s) => [s.path, s]))]]);
  const nodesOf = (file: string) => {
    let m = files.get(file);
    if (!m) {
      const p = join(contentDir, 'ranges', file);
      if (!existsSync(p)) throw new Error(`ranges/spots.yaml: brak pliku solvera ranges/${file}`);
      m = new Map((JSON.parse(readFileSync(p, 'utf8')) as SolverFile).spots.map((s) => [s.path, s]));
      files.set(file, m);
    }
    return m;
  };
  const ids = new Set<string>();
  const spots = r.data.map((def) => {
    if (ids.has(def.id)) throw new Error(`ranges/spots.yaml: powtórzony spot ${def.id}`);
    ids.add(def.id);
    const node = nodesOf(def.solver ?? DEFAULT_SOLVER).get(def.path);
    if (!node) throw new Error(`spot ${def.id}: brak węzła "${def.path}" w wyniku solvera ${def.solver ?? DEFAULT_SOLVER}`);
    if (node.player !== def.hero) throw new Error(`spot ${def.id}: w węźle decyduje ${node.player}, nie ${def.hero}`);
    const groups = Object.entries(def.groups).map(([name, labels]) => {
      const idx = labels.map((l) => {
        const i = node.actions.indexOf(l);
        if (i < 0) throw new Error(`spot ${def.id}: brak akcji "${l}" (są: ${node.actions.join(', ')})`);
        return i;
      });
      const freqs = HAND_CLASSES.map((hc) => Math.round(idx.reduce((s, i) => s + node.strategy[i]![hc]!, 0) * 1000) / 1000);
      const wrongSizes = def.wrongSizes?.[name];
      return { name, freqs, ...(wrongSizes ? { wrongSizes } : {}) };
    });
    for (const g of Object.keys(def.wrongSizes ?? {})) {
      if (!(g in def.groups)) throw new Error(`spot ${def.id}: wrongSizes dla nieznanej grupy "${g}"`);
    }
    // udział rąk w grupach pokazywanych w siatce (reszta to pas); spot może pominąć akcję, np. sprawdzenie w „3-bet / pas”
    const playPercent =
      HAND_CLASSES.reduce((s, hc, h) => s + combosCount(hc) * groups.reduce((g, gr) => g + gr.freqs[h]!, 0), 0) / 1326;
    const uncertainSet = new Set(def.uncertain ?? []);
    for (const hc of uncertainSet) if (!HAND_CLASSES.includes(hc)) throw new Error(`spot ${def.id}: nieznana klasa rąk w uncertain: "${hc}"`);
    const uncertain = HAND_CLASSES.filter((hc) => uncertainSet.has(hc));
    return { id: def.id, title: def.title, hero: def.hero, path: def.path, groups, playPercent, uncertain };
  });
  return { spots, solverMeta: solver.meta };
}
