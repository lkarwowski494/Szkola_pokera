// Szablony scenariuszy w budowaniu treści (BR-SZB-001, D-533): wczytanie z content/<język>/scenarios/*.yaml, sprawdzenie
// źródeł oceny (reguła albo rachunek, RD-11, ADR-24), kompletności poziomów i wyjaśnień, pojemności generatora.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ScenarioTemplate, SCENARIO_LEVELS_LIST, type RuleLevel } from '@szkola/content-schema';
import { generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';

export interface ScenarioCheckContext {
  /** id reguły → poziom pewności (rules.yaml). */
  ruleLevels: ReadonlyMap<string, RuleLevel>;
  numberKeys: ReadonlySet<string>;
  moduleIds: ReadonlySet<string>;
}
export interface LoadedScenario { file: string; template: ScenarioTemplate }

const stem = (file: string) => file.replace(/\.yaml$/, '');

// Błąd schematu z id szablonu (nazwa pliku) i numerem punktu decyzji, gdy dotyczy punktu (BR-SZB-001).
function opisBledu(file: string, path: readonly PropertyKey[], message: string): string {
  const i = path.indexOf('decisions');
  const nr = i >= 0 && typeof path[i + 1] === 'number' ? ` punkt decyzji ${(path[i + 1] as number) + 1}:` : '';
  return `szablon ${stem(file)}:${nr} ${path.map(String).join('.')} ${message}`;
}

export function loadScenarioTemplates(dir: string): LoadedScenario[] {
  if (!existsSync(dir)) return [];
  const out: LoadedScenario[] = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort()) {
    const r = ScenarioTemplate.safeParse(parseYaml(readFileSync(join(dir, file), 'utf8')));
    if (!r.success) throw new Error(r.error.issues.map((x) => opisBledu(file, x.path, x.message)).join('\n'));
    out.push({ file, template: r.data });
  }
  return out;
}

/** Błędy szablonu względem treści (lista pusta = poprawny). Schemat sprawdza kształt, tu: powiązania z regułami, liczbami, modułami. */
export function checkScenarioTemplate(t: ScenarioTemplate, file: string, ctx: ScenarioCheckContext): string[] {
  const e: string[] = [];
  const pre = `szablon ${t.id}:`;
  if (t.id !== stem(file)) e.push(`${pre} id musi być nazwą pliku (${file}); identyfikator jest w historii wariantów użytkownika i nie zmienia się`);
  if (!ctx.moduleIds.has(t.module)) e.push(`${pre} moduł ${t.module} nie istnieje`);
  if (!t.levels.includes('latwy')) e.push(`${pre} poziom łatwy jest wymagany (BR-SZB-002)`);
  for (const l of SCENARIO_LEVELS_LIST) {
    const ma = t.bounds[l] !== undefined;
    if (t.levels.includes(l) && !ma) e.push(`${pre} poziom ${l} na liście poziomów, ale bez granic losowania`);
    if (!t.levels.includes(l) && ma) e.push(`${pre} granice poziomu ${l} bez poziomu na liście poziomów`);
  }
  let exploit = false;
  t.decisions.forEach((d, i) => {
    const p = `${pre} punkt decyzji ${i + 1}:`;
    if (d.rule !== undefined) {
      const level = ctx.ruleLevels.get(d.rule);
      if (level === undefined) e.push(`${p} nieznana reguła ${d.rule}`);
      else if (level === 'exploit') exploit = true;
    }
    if (d.calc !== undefined && !ctx.numberKeys.has(d.calc)) e.push(`${p} nieznany rachunek ${d.calc}`);
    const akcje = d.actions.map((a) => a.action).sort().join(',');
    if (akcje !== 'call,fold') e.push(`${p} akcje to dokładnie call i fold, każda z własnym wyjaśnieniem (BR-OCE-002)`);
    if (i === 0 && d.street !== 'flop') e.push(`${p} pierwsza decyzja jest na flopie`);
    if (i === 1 && d.street !== 'turn') e.push(`${p} druga decyzja jest na turnie`);
    if (i === 0 && d.pots.length === 0) e.push(`${p} brak puli do losowania`);
  });
  if (t.villainType !== undefined && !exploit) e.push(`${pre} typ rywala wymaga reguły exploit z populacją (ADR-24, szczebel 5)`);
  return e;
}

/** Pojemność wariantów na poziom (BR-GEN-002 c): co najmniej tyle różnych odcisków. */
export const POJEMNOSC_MIN = 40;
const PROBY_POJEMNOSCI = 2000;

/** Generator musi wytwarzać warianty na każdym poziomie (granice spełnialne) w liczbie odcisków ≥ POJEMNOSC_MIN (dolna granica z losowań). */
export function checkScenarioGenerator(t: ScenarioTemplate): string[] {
  const e: string[] = [];
  const g = { id: t.id, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  for (const level of t.levels as ScenarioLevel[]) {
    const odciski = new Set<string>();
    try {
      for (let seed = 1; seed <= PROBY_POJEMNOSCI; seed++) odciski.add(generateVariant(g, level, seed).fingerprint);
    } catch (err) {
      e.push(`szablon ${t.id}: poziom ${level}: generator nie wytwarza wariantów (${err instanceof Error ? err.message : String(err)})`);
      continue;
    }
    if (odciski.size < POJEMNOSC_MIN) e.push(`szablon ${t.id}: poziom ${level}: pojemność ${odciski.size} odcisków w ${PROBY_POJEMNOSCI} losowaniach, wymagane ${POJEMNOSC_MIN}`);
  }
  return e;
}
