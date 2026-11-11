// Szablony treści z punktami range-spot (F1) i size-spot (F3) na content/pl/scenarios (rola 06, sesja DU, KO-070, D-1033).
// BR-GEN-003: 10 000 losowań na poziom, wyrocznie niezależne od generatora:
// - range-spot: częstości z surowego pliku solvera (preflop-6max-100bb.json albo pushfold.json, węzeł wg `path` i `hero` ze spots.yaml),
//   werdykt liczony tu od zera z progów range.mixed.* w numbers.yaml (ADR-26: najczęstsza akcja albo ≥ próg niski = zgodna);
// - size-spot: standardowy rozmiar z parametru reguły w surowym rules.yaml (n:klucz → numbers), małe i duże rozmiary = niedokładność.
// Wyjaśnienia w treści mówią, że akcje inne niż oczekiwana nie są zgodne („za ostrożny”, „niedokładność”), więc to też jest sprawdzane.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content, number } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
const en = loadScenarioTemplates(join(root, 'content', 'en', 'scenarios')).map((x) => x.template);
const LOSOWANIA = 10_000;
const gen = (t: (typeof pl)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

type Wezel = { path: string; player: string; actions: string[]; strategy: Record<string, number>[] };
const pliki: Record<string, { spots: Wezel[] }> = {
  'preflop-6max-100bb.json': JSON.parse(readFileSync(join(root, 'content/ranges/preflop-6max-100bb.json'), 'utf8')),
  'pushfold.json': JSON.parse(readFileSync(join(root, 'content/ranges/pushfold.json'), 'utf8')),
};
const defSpotow = parseYaml(readFileSync(join(root, 'content/ranges/spots.yaml'), 'utf8')) as { id: string; hero: string; path: string; solver?: string; uncertain?: string[] }[];
function wezel(spot: string): { wezel: Wezel; niepewne: string[] } {
  const d = defSpotow.find((x) => x.id === spot)!;
  const w = pliki[d.solver ?? 'preflop-6max-100bb.json']!.spots.find((n) => n.path === d.path && n.player === d.hero)!;
  return { wezel: w, niepewne: d.uncertain ?? [] };
}
const progi = { min: number('range.mixed.min'), niski: number('range.mixed.low') };
/** Werdykt ADR-26 liczony od zera: najczęstsza akcja albo częstość ≥ próg niski = zgodna; ≥ próg min = dopuszczalna; > 0 = niedokładność; 0 = błąd. */
function werdykt(freqs: number[], i: number): string {
  const f = freqs[i]!;
  return f === Math.max(...freqs) || f >= progi.niski ? 'correct' : f >= progi.min ? 'acceptable' : f > 0 ? 'inaccuracy' : 'wrong';
}

const rulesYaml = parseYaml(readFileSync(join(root, 'content/pl/rules.yaml'), 'utf8')) as { id: string; check?: { kind: string; params?: Record<string, string | number> } }[];
const param = (rule: string, p: string): number => {
  const v = rulesYaml.find((r) => r.id === rule)!.check!.params![p]!;
  return typeof v === 'number' ? v : number(String(v).replace(/^n:/, ''));
};
const r1 = (x: number) => Math.round(x * 10) / 10;

const ctx = {
  spots: compileRanges(join(root, 'content')).spots,
  thresholds: { mixedMin: progi.min, mixedLow: progi.niski },
  sizeRules: content.evalRules.filter((r) => ['open-size', 'three-bet-size', 'no-limp'].includes(r.check.kind)),
  // EH: SC-04 i SC-05 mają po range-spot punkt cbet-case (ocena c-betu sprawdzana w szablony-co.test.ts); przypadki jak w buildGeneratorContext
  cbetCases: [...new Map(content.evalRules.filter((r) => r.check.kind === 'cbet-case').flatMap((r) => r.check.cases ?? []).map((c) => [JSON.stringify(c), c] as const)).values()],
};

describe('szablony treści range-spot: ręka i ocena zgodne z plikiem solvera (BR-GEN-003, D-1034)', () => {
  const zakres = pl.filter((t) => t.decisions.some((d) => d.kind === 'range-spot'));
  it('treść ma szablony range-spot (SC-04, SC-05, SC-06, SC-08 z EH; SC-32, SC-33)', () => {
    expect(zakres.map((t) => t.id)).toEqual(['sc-04', 'sc-05', 'sc-06', 'sc-08', 'sc-32', 'sc-33']);
  });
  for (const t of zakres) {
    const d = t.decisions[0]!;
    if (d.kind !== 'range-spot') throw new Error(`${t.id}: range-spot nie jest pierwszy`);
    const { wezel: w, niepewne } = wezel(d.spot);
    it(`${t.id}: akcje z wyjaśnieniem = akcje węzła solvera ${d.spot}`, () => {
      expect(d.actions.map((a) => a.action).sort()).toEqual([...w.actions].sort());
    });
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
        const b = t.bounds[level]!;
        const oczekiwana = b.expected[0]!;
        const przedzial = b.freqs![0]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const hc = classOf(v.hero[0], v.hero[1]);
          const freqs = w.actions.map((_, i) => w.strategy[i]![hc] ?? 0);
          const io = w.actions.indexOf(oczekiwana);
          if (niepewne.includes(hc)) bledy.push(`${seed}: ${hc} to klasa niepewna`);
          if (!(freqs[io]! >= przedzial.min && freqs[io]! <= przedzial.max)) bledy.push(`${seed}: ${hc}: częstość ${oczekiwana} ${freqs[io]} poza ${przedzial.min}–${przedzial.max}`);
          if (werdykt(freqs, io) !== 'correct') bledy.push(`${seed}: ${hc}: ${oczekiwana} nie jest zgodna`);
          for (const a of d.actions) {
            const i = w.actions.indexOf(a.action);
            // wyjaśnienia akcji innych niż oczekiwana mówią „za ostrożny” / „prawie nie sprawdzasz”: nie mogą być zgodne
            if (a.action !== oczekiwana && werdykt(freqs, i) === 'correct') bledy.push(`${seed}: ${hc}: ${a.action} zgodna, a wyjaśnienie mówi, że nie`);
          }
          const p = v.points[0];
          if (p?.point !== 'range-spot' || p.handClass !== hc || p.correct !== oczekiwana) bledy.push(`${seed}: punkt wariantu ${JSON.stringify(p).slice(0, 80)}`);
          else for (const o of p.options) if (o.verdict !== werdykt(freqs, w.actions.indexOf(o.action))) bledy.push(`${seed}: ${hc}: ${o.action} generator ${o.verdict}, wyrocznia ${werdykt(freqs, w.actions.indexOf(o.action))}`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

describe('szablony treści size-spot: rozmiary i oceny z parametru reguły (BR-GEN-003, D-1032)', () => {
  const rozmiar = pl.filter((t) => t.decisions.some((d) => d.kind === 'size-spot'));
  it('treść ma szablony size-spot (SC-06, SC-08 z EH)', () => {
    expect(rozmiar.map((t) => t.id)).toEqual(['sc-06', 'sc-08']);
  });
  for (const t of rozmiar) {
    const i = t.decisions.findIndex((d) => d.kind === 'size-spot');
    const d = t.decisions[i]!;
    if (d.kind !== 'size-spot') throw new Error('size-spot');
    const standard = d.check === 'open-size' ? param(d.rule, d.sb ? 'openSb' : 'open') : d.check === 'three-bet-size' ? r1(param(d.rule, 'mult') * d.openBb!) : NaN;
    it(`${t.id}: przebicie w punkcie range-spot przed rozmiarem ma kwotę równą standardowi reguły (${standard} bb)`, () => {
      const prev = t.decisions[i - 1];
      if (prev?.kind === 'range-spot') {
        const ex = t.levels.map((l) => t.bounds[l]!.expected[i - 1]!);
        for (const e of ex) expect(Number(e.replace(/^raise /, ''))).toBe(standard);
      }
    });
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
        const bledy: string[] = [];
        const oczekiwane: Record<string, { bb: number | null; ocena: string }> = {
          raise: { bb: standard, ocena: 'compliant' },
          'raise-small': { bb: r1(standard * 0.8), ocena: 'inaccuracy' },
          'raise-big': { bb: r1(standard * 1.6), ocena: 'inaccuracy' },
        };
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const p = v.points[i];
          if (p?.point !== 'size-spot') { bledy.push(`${seed}: punkt ${i} to ${p?.point}`); continue; }
          if (p.correct !== 'raise' || t.bounds[level]!.expected[i] !== 'raise') bledy.push(`${seed}: poprawna ${p.correct}`);
          for (const a of d.actions) {
            const o = p.options.find((x) => x.action === a.action);
            const w = oczekiwane[a.action]!;
            if (!o || o.bb !== w.bb) bledy.push(`${seed}: ${a.action}: ${o?.bb} bb, wyrocznia ${w.bb}`);
            if ((p.verdicts as Record<string, string>)[a.action] !== w.ocena) bledy.push(`${seed}: ${a.action}: ${(p.verdicts as Record<string, string>)[a.action]}, wyrocznia ${w.ocena}`);
          }
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

describe('szablony DU w en: ta sama struktura co pl (D-1033)', () => {
  for (const id of ['sc-06', 'sc-32', 'sc-33', 'sc-34']) {
    it(`${id}: en ma te same poziomy, granice, punkty i akcje co pl`, () => {
      const a = pl.find((t) => t.id === id)!;
      const b = en.find((t) => t.id === id)!;
      const bezTekstu = (t: typeof a) => ({ ...t, situation: '', decisions: t.decisions.map((d) => ({ ...d, actions: d.actions.map((x) => x.action) })) });
      expect(bezTekstu(b)).toEqual(bezTekstu(a));
    });
  }
});
