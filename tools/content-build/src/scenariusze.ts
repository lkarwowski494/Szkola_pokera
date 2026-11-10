// Szablony scenariuszy w budowaniu treści (BR-SZB-001, D-533): wczytanie z content/<język>/scenarios/*.yaml, sprawdzenie
// źródeł oceny (reguła albo rachunek, RD-11, ADR-24), kompletności poziomów i wyjaśnień, pojemności generatora.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ScenarioTemplate, SCENARIO_LEVELS_LIST, type RuleLevel } from '@szkola/content-schema';
import { findVariantMarkers, generateVariant, VARIANT_MARKERS, type GeneratorContext, type GeneratorTemplate, type RangeSpotData, type ScenarioLevel } from '@szkola/poker-core';

export interface ScenarioCheckContext {
  /** id reguły → poziom pewności (rules.yaml). */
  ruleLevels: ReadonlyMap<string, RuleLevel>;
  numberKeys: ReadonlySet<string>;
  moduleIds: ReadonlySet<string>;
  /** id spotu zakresu → etykiety akcji węzła solvera (F1); bez tego punkty range-spot są błędem. */
  spots?: ReadonlyMap<string, readonly string[]>;
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
    const oczekiwane = t.bounds[l]?.expected;
    if (oczekiwane !== undefined && oczekiwane.length !== t.decisions.length) {
      e.push(`${pre} poziom ${l}: oczekiwanych akcji ${oczekiwane.length}, punktów decyzji ${t.decisions.length} (po jednej na punkt, D-556)`);
    }
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
    if (d.kind === 'range-spot') {
      const labels = ctx.spots?.get(d.spot);
      if (!labels) e.push(`${p} nieznany spot zakresu ${d.spot}`);
      else {
        const nieznane = d.actions.map((a) => a.action).filter((a) => !labels.includes(a));
        if (nieznane.length) e.push(`${p} akcje spoza węzła spotu ${d.spot}: ${nieznane.join(', ')} (są: ${labels.join(', ')})`);
        if (new Set(d.actions.map((a) => a.action)).size !== d.actions.length) e.push(`${p} akcja powtórzona`);
        for (const l of SCENARIO_LEVELS_LIST) {
          const ex = t.bounds[l]?.expected[i];
          if (ex !== undefined && !d.actions.some((a) => a.action === ex)) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} nie ma wyjaśnienia (BR-OCE-002)`);
          if (ex !== undefined && !labels.includes(ex)) e.push(`${p} poziom ${l}: oczekiwana akcja ${ex} spoza węzła spotu ${d.spot}`);
          if (t.bounds[l] && !t.bounds[l]!.freqs?.[i]) e.push(`${p} poziom ${l}: punkt range-spot wymaga przedziału freqs`);
        }
      }
    } else {
      const akcje = d.actions.map((a) => a.action).sort().join(',');
      if (akcje !== 'call,fold') e.push(`${p} akcje to dokładnie call i fold, każda z własnym wyjaśnieniem (BR-OCE-002)`);
      for (const l of SCENARIO_LEVELS_LIST) {
        const ex = t.bounds[l]?.expected[i];
        if (ex !== undefined && ex !== 'call' && ex !== 'fold') e.push(`${p} poziom ${l}: oczekiwana akcja punktu draw-call to call albo fold, jest ${ex}`);
        if (t.bounds[l] && t.bounds[l]!.draws.length === 0) e.push(`${p} poziom ${l}: punkt draw-call wymaga listy draws`);
      }
      if (i === 0 && d.pots.length === 0) e.push(`${p} brak puli do losowania`);
    }
    for (const a of d.actions) {
      // BR-OCE-001/002, D-557: pierwsze zdanie wymienia rękę, pozycję i stół z wariantu (znaczniki), a nie z przykładu w treści
      // koniec zdania szukany poza znacznikami {{…}} (kropka w kluczu {{n:a.b}} nie kończy zdania), także „。！？” (CJK); 08-programista-105
      const maska = a.explanation.replace(/\{\{[^{}]*\}\}/g, (m) => 'x'.repeat(m.length));
      const koniec = maska.search(/[.!?。！？\n]/);
      const zdanie = koniec < 0 ? a.explanation : a.explanation.slice(0, koniec);
      const znane = findVariantMarkers(a.explanation);
      const nieznane = znane.filter((m) => !(VARIANT_MARKERS as readonly string[]).includes(m));
      if (nieznane.length) e.push(`${p} akcja ${a.action}: nieznany znacznik wariantu ${nieznane.map((m) => `{{w:${m}}}`).join(', ')} (dozwolone: ${VARIANT_MARKERS.join(', ')})`);
      const w = findVariantMarkers(zdanie);
      const brak = (['reka', 'stol', 'pozycja'] as const).filter((m) => !w.includes(m));
      if (brak.length) e.push(`${p} akcja ${a.action}: zdanie sytuacji (pierwsze) musi mieć znaczniki wariantu ${brak.map((m) => `{{w:${m}}}`).join(', ')}, żeby pokazywało karty i pozycję z wylosowanego wariantu`);
    }
    if (d.kind === 'draw-call' && i === 1 && t.decisions[0]!.kind === 'draw-call' && d.street !== 'turn') e.push(`${p} druga decyzja draw-call jest na turnie`);
    if (d.kind === 'draw-call' && i === 0 && t.decisions.length === 2 && t.decisions[1]!.kind === 'draw-call' && d.street !== 'flop') e.push(`${p} przy dwóch punktach decyzji pierwszy jest na flopie`);
    if (d.kind === 'range-spot' && i !== 0) e.push(`${p} punkt range-spot jest pierwszy`);
  });
  if (t.villainType !== undefined && !exploit) e.push(`${pre} typ rywala wymaga reguły exploit z populacją (ADR-24, szczebel 5)`);
  return e;
}

/** Pojemność wariantów na poziom (BR-GEN-002 c): co najmniej tyle różnych odcisków. */
export const POJEMNOSC_MIN = 40;
export const PROBY_POJEMNOSCI = 2000;

/** Generator musi wytwarzać warianty na każdym poziomie (granice i oczekiwana akcja spełnialne) w liczbie odcisków ≥ POJEMNOSC_MIN po odrzuceniach (dolna granica z losowań; parametry do testu progu). */
export function checkScenarioGenerator(
  t: ScenarioTemplate,
  pojemnoscMin: number = POJEMNOSC_MIN,
  proby: number = PROBY_POJEMNOSCI,
  ctx: GeneratorContext = { spots: [] as readonly RangeSpotData[], thresholds: { mixedMin: 0.035, mixedLow: 0.25 } },
): string[] {
  const e: string[] = [];
  const g = { id: t.id, stackBb: t.stackBb, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  for (const level of t.levels as ScenarioLevel[]) {
    const odciski = new Set<string>();
    try {
      for (let seed = 1; seed <= proby; seed++) odciski.add(generateVariant(g, level, seed, ctx).fingerprint);
    } catch (err) {
      e.push(`szablon ${t.id}: poziom ${level}: generator nie wytwarza wariantów (${err instanceof Error ? err.message : String(err)})`);
      continue;
    }
    if (odciski.size < pojemnoscMin) e.push(`szablon ${t.id}: poziom ${level}: pojemność ${odciski.size} odcisków w ${proby} losowaniach, wymagane ${pojemnoscMin}`);
  }
  return e;
}

/** ŚR-103 b: zestaw szablonów jednego modułu nie ma wszystkich łatwych poziomów z tą samą odpowiedzią (uczyłoby „zawsze call”). */
export function checkScenarioSet(templates: readonly ScenarioTemplate[]): string[] {
  const wgModulu = new Map<string, { id: string; expected: string }[]>();
  for (const t of templates) {
    const e = t.bounds.latwy?.expected;
    if (e === undefined) continue; // brak łatwego poziomu zgłasza checkScenarioTemplate
    wgModulu.set(t.module, [...(wgModulu.get(t.module) ?? []), { id: t.id, expected: e.join(',') }]);
  }
  const errors: string[] = [];
  for (const [module, list] of wgModulu) {
    if (list.length >= 2 && new Set(list.map((x) => x.expected)).size === 1) {
      errors.push(`moduł ${module}: wszystkie szablony (${list.map((x) => x.id).join(', ')}) mają na poziomie łatwym tę samą odpowiedź ${list[0]!.expected}; dodaj szablon z inną (ŚR-103 b)`);
    }
  }
  return errors;
}
