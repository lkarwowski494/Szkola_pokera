// F4 (KO-049, sesja CA): punkt icm-call. BR-GEN-003: 10 000 losowań na poziom. Wyrocznia niezależna od generatora:
// equity ręki z surowego tools/equity/equity169.json i zakresu push z content/ranges/pushfold.json (własna pętla),
// ICM (Malmuth-Harville) liczony w teście od zera z definicji, nie przez icmEquities/equityAfter.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, ICM_STACK_STEP, ICM_STRUCTURES, ICM_TOTAL_CHIPS, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { blindMiejsca } from './martwe-blindy-wyrocznia';

const root = resolve(import.meta.dirname, '../../..');
const fx = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'icm-call'));
const LOSOWANIA = 10_000;
const eqf = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as { classes: string[]; equity: number[][]; pairs: number[][] };
const push = JSON.parse(readFileSync(join(root, 'content/ranges/pushfold.json'), 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };
const node = push.spots.find((s) => s.path === '10bb|' && s.player === 'SB')!;
const wagi = node.strategy[node.actions.indexOf('all-in')]!; // klasa → częstość all-in
const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eqf };

/** Equity klasy wobec ważonego zakresu: Σ w·pary·eq / Σ w·pary. */
function equityVsRange(hc: string): number {
  const i = eqf.classes.indexOf(hc);
  let w = 0;
  let s = 0;
  eqf.classes.forEach((vc, j) => {
    const x = (wagi[vc] ?? 0) * eqf.pairs[i]![j]!;
    w += x;
    s += x * eqf.equity[i]![j]!;
  });
  return s / w;
}
/** ICM Malmutha-Harville'a z definicji (rekurencja po miejscach). */
function icm(stacks: number[], payouts: readonly number[]): number[] {
  const out = stacks.map(() => 0);
  const rec = (zostali: number[], miejsce: number, p: number) => {
    if (miejsce >= payouts.length || zostali.length === 0) return;
    const suma = zostali.reduce((a, k) => a + stacks[k]!, 0);
    if (suma <= 0) return;
    for (const k of zostali) {
      const pk = (p * stacks[k]!) / suma;
      out[k]! += pk * payouts[miejsce]!;
      rec(zostali.filter((z) => z !== k), miejsce + 1, pk);
    }
  };
  rec(stacks.map((_, i) => i).filter((i) => stacks[i]! > 0), 0, 1);
  return out;
}
const po = (stacks: number[], h: number, v: number, d: number) => stacks.map((x, i) => (i === h ? x + d : i === v ? x - d : x));
// gracz z zerem odpada: jego miejsce jest poza nagrodami (ICM po usunięciu)
const eqPo = (stacks: number[], payouts: readonly number[], h: number) => (stacks[h]! <= 0 ? 0 : icm(stacks, payouts)[h]!);

describe('F4: icm-call', () => {
  it('fixture ładuje się', () => {
    expect(fx.map((x) => x.template.id)).toEqual(['sc-fx-icm-call']);
  });
  for (const { template: t } of fx) {
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów, equity z kart i ICM zgodne z wyrocznią`, () => {
        const b = t.bounds[level]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(g, level, seed, ctx);
          const p = v.points[0];
          if (v.points.length !== 1 || p?.point !== 'icm-call') { bledy.push(`${seed}: punkty ${v.points.map((x) => x.point)}`); continue; }
          const hc = classOf(v.hero[0], v.hero[1]);
          if (p.handClass !== hc) bledy.push(`${seed}: klasa ${p.handClass} ≠ ${hc}`);
          const struktura = ICM_STRUCTURES.find((s) => s.players === p.stacks.length && s.payouts.join() === p.payouts.join());
          if (!struktura) bledy.push(`${seed}: struktura spoza ICM_STRUCTURES`);
          if (p.stacks.reduce((a, x) => a + x, 0) !== ICM_TOTAL_CHIPS || p.stacks.some((x) => x < 2 * ICM_STACK_STEP || x % ICM_STACK_STEP !== 0)) bledy.push(`${seed}: stacki ${p.stacks}`);
          if (p.heroIndex === p.villainIndex) bledy.push(`${seed}: hero = villain`);
          const atRisk = Math.min(p.stacks[p.heroIndex]!, p.stacks[p.villainIndex]!);
          // pas = strata blinda gracza na rzecz rywala; bb = stos efektywny ÷ stackBb (CJ WYS-001: wcześniej wyrocznia liczyła stan sprzed blindów, jak generator)
          const bb = atRisk / t.stackBb!;
          const teraz = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, -blindMiejsca(t.positions.hero) * bb), p.payouts, p.heroIndex);
          const wygrana = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, atRisk), p.payouts, p.heroIndex);
          const przegrana = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, -atRisk), p.payouts, p.heroIndex);
          const wymagane = (teraz - przegrana) / (wygrana - przegrana);
          const eq = equityVsRange(hc);
          const poprawna = eq >= wymagane ? 'call' : 'fold';
          const marza = Math.abs(eq - wymagane);
          if (Math.abs(p.handEquity - eq) > 1e-9) bledy.push(`${seed}: equity ${p.handEquity} ≠ ${eq}`);
          if (Math.abs(p.required - wymagane) > 1e-9) bledy.push(`${seed}: wymagane ${p.required} ≠ ${wymagane}`);
          if (poprawna !== b.expected[0] || p.correct !== poprawna) bledy.push(`${seed}: poprawna ${poprawna}/${p.correct}, oczekiwano ${b.expected[0]}`);
          if (marza < (b.marginMin ?? 0) || (b.marginMax !== null && marza >= b.marginMax) || marza <= 0) bledy.push(`${seed}: margines ${marza} poza [${b.marginMin}, ${b.marginMax}]`);
          if (b.chipsDiffer && (eq >= 0.5 ? 'call' : 'fold') === poprawna) bledy.push(`${seed}: akcja ICM równa akcji w grze o żetony`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioGenerator, checkScenarioTemplate } from '../src/scenariusze';
import { content } from './kit';

describe('F4: walidacja szablonu icm-call w budowaniu', () => {
  const sctx = {
    ruleLevels: new Map(content.rules.map((r) => [r.id, r.level] as const)),
    numberKeys: new Set<string>(),
    moduleIds: new Set(['m11']),
    spots: new Map(ctx.spots.map((s) => [s.id, s.actions.map((a) => a.label)])),
  };
  const baza = fx[0]!.template;
  const kopia = (f: (b: any) => void) => { const b = structuredClone(baza) as any; f(b); return ScenarioTemplate.parse(b); };
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  it('fixture przechodzi', () => {
    expect(checkScenarioTemplate(baza, 'sc-fx-icm-call.yaml', sctx)).toEqual([]);
  });
  it('spot bez akcji all-in jest błędem', () => {
    expect(blad(kopia((b) => { b.decisions[0].spot = 'rfi.btn'; }))).toMatch(/spot rfi\.btn nie ma akcji all-in/);
    expect(blad(kopia((b) => { b.decisions[0].spot = 'nie.ma'; }))).toMatch(/nieznany spot zakresu nie\.ma/);
  });
  it('akcje to dokładnie call i fold, oczekiwana z wyjaśnieniem', () => {
    expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'fold'; }))).toMatch(/akcje to dokładnie call i fold/);
    expect(blad(kopia((b) => { b.bounds.latwy.expected = ['raise']; }))).toMatch(/poziom latwy: oczekiwana akcja punktu icm-call to call albo fold/);
  });
  it('poziom bez marginesu dolnego jest błędem (decyzja bliska progu)', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.marginMin; }))).toMatch(/poziom latwy: punkt icm-call wymaga marginMin > 0/);
  });
  it('chipsDiffer tylko dla icm-call', () => {
    const draw = loadScenarioTemplates(join(resolve(import.meta.dirname), 'fixtures', 'scenariusze')).find((x) => x.template.id === 'sc-fx-turn-gutshot')!.template;
    const b = structuredClone(draw) as any;
    b.bounds.latwy.chipsDiffer = true;
    const t = ScenarioTemplate.parse(b);
    const e = checkScenarioTemplate(t, 'sc-fx-turn-gutshot.yaml', { ...sctx, moduleIds: new Set([t.module]) });
    expect(e.join('\n')).toMatch(/chipsDiffer tylko dla punktu icm-call/);
  });
  it('generator: pojemność na każdym poziomie', () => {
    expect(checkScenarioGenerator(baza, 40, 600, ctx)).toEqual([]);
  }, 300_000);
});
