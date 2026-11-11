// Szablony treści z punktami cbet-case (F2) i icm-call (F4) (rola 06, sesja CO, D-791). BR-GEN-003: 10 000 losowań na poziom,
// wyrocznie niezależne od generatora, jak w szablony-f2-ca i szablony-f4-ca (te same metody, tu na content/pl/scenarios):
// - cbet-case: prawdziwe rozdanie w silniku gry (BTN otwiera 2,5 bb, BB sprawdza i czeka), ocena gradeDecision z kit; poza akcją
//   zgodną sprawdzane są też oceny pozostałych akcji (ŚR-005, D-793: rzadsza akcja „dopuszczalna”, duży zakład przy best small
//   „niedokładność”), bo wyjaśnienia w treści mówią to wprost;
// - icm-call: equity z surowego equity169.json wobec zakresu push z pushfold.json i ICM Malmutha-Harville'a liczony od zera.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  applyAction,
  classifyFlop,
  classifyHolding,
  classOf,
  generateVariant,
  gradeDecision,
  rankOf,
  startHand,
  textureMatches,
  type Card,
  type GeneratorTemplate,
  type HandState,
  type PlayerAction,
  type ScenarioLevel,
  type TableConfig,
} from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content, kit, number } from './kit';
import { blindMiejsca } from './martwe-blindy-wyrocznia';

const root = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
// SC-34 (icm-call) wrócił do szkiców (CS D-825, D-807): wyrocznia ICM nadal sprawdza szkic, żeby powrót nie zgubił rachunku
const szkice = loadScenarioTemplates(join(root, 'docs', 'tresci', 'szablony-robocze')).map((x) => x.template);
const LOSOWANIA = 10_000;
const gen = (t: (typeof pl)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

// ---------- cbet-case ----------
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const cbetCases = content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!;
const AKCJE = ['check', 'bet-small', 'bet-big'] as const;
type Akcja = (typeof AKCJE)[number];
function flopBtn(hero: [Card, Card], villain: [Card, Card], flop: Card[]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[3] = hero;
  holes[5] = villain;
  let st = startHand(cfg, 1, { holes, board: flop });
  const seq: PlayerAction[] = [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'raise', to: Math.round(2.5 * BB) }, { type: 'fold' }, { type: 'call' }, { type: 'check' }];
  for (const a of seq) st = applyAction(st, a);
  return st;
}
const pula = 5 * BB;
const akcja = (a: Akcja): PlayerAction =>
  a === 'check' ? { type: 'check' } : { type: 'bet', to: Math.round(pula * number(a === 'bet-small' ? 'cbet.size.small' : 'cbet.size.big')) };
const maPare = (hero: readonly Card[], flop: readonly Card[]) => rankOf(hero[0]!) === rankOf(hero[1]!) || hero.some((c) => flop.some((f) => rankOf(f) === rankOf(c)));
/** Oceny silnika gry dla akcji przy przypadku c-betu (D-793): best small → check dopuszczalne, big niedokładne; best check → bet dopuszczalny. */
const OCENY: Record<string, Record<Akcja, string>> = {
  'bet-small': { 'bet-small': 'compliant', check: 'acceptable', 'bet-big': 'inaccuracy' },
  check: { check: 'compliant', 'bet-small': 'acceptable', 'bet-big': 'acceptable' },
};

describe('szablony treści cbet-case: ocena silnika gry zgodna z oczekiwaną akcją i z wyjaśnieniami (BR-GEN-003, D-793)', () => {
  const cbet = pl.filter((t) => t.decisions.some((d) => d.kind === 'cbet-case'));
  it('treść ma szablony cbet-case (SC-11, SC-12)', () => {
    expect(cbet.map((t) => t.id)).toEqual(['sc-11', 'sc-12']);
  });
  for (const t of cbet) {
    const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, cbetCases };
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
        const b = t.bounds[level]!;
        const oczekiwana = b.expected[0]! as Akcja;
        const regula = (t.decisions[0] as { rule: string }).rule;
        const wTresci = (t.decisions[0]!.actions as { action: string }[]).map((a) => a.action) as Akcja[];
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const flop = v.board.slice(0, 3);
          if (new Set([...v.hero, ...v.villain, ...v.board]).size !== 9) bledy.push(`${seed}: karty się powtarzają`);
          if (b.flop && !textureMatches(classifyFlop(flop), b.flop)) bledy.push(`${seed}: tekstura poza filtrem`);
          // holding air: bez pary (z samych rang) i klasa air
          if ((b.holding ?? []).join() === 'air' && (maPare(v.hero, flop) || classifyHolding(v.hero, flop).cls !== 'air')) bledy.push(`${seed}: ręka poza filtrem air`);
          const st = flopBtn(v.hero, v.villain, flop);
          for (const a of wTresci) {
            const f = gradeDecision(st, akcja(a), kit);
            if (f.ruleId !== regula) bledy.push(`${seed}: ${a}: reguła ${f.ruleId} zamiast ${regula}`);
            if (f.verdict !== OCENY[oczekiwana]![a]) bledy.push(`${seed}: ${a}: silnik ${f.verdict}, wyjaśnienie zakłada ${OCENY[oczekiwana]![a]}`);
          }
          if (v.points[0]!.correct !== oczekiwana) bledy.push(`${seed}: punkt wariantu ${v.points[0]!.correct}`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

// ---------- icm-call ----------
const eqf = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as { classes: string[]; equity: number[][]; pairs: number[][] };
const push = JSON.parse(readFileSync(join(root, 'content/ranges/pushfold.json'), 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };
function equityVsRange(hc: string, wagi: Record<string, number>): number {
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
const eqPo = (stacks: number[], payouts: readonly number[], h: number) => (stacks[h]! <= 0 ? 0 : icm(stacks, payouts)[h]!);

describe('szablony treści icm-call: equity z kart i próg ICM zgodne z wyrocznią (BR-GEN-003)', () => {
  const icmT = szkice.filter((t) => t.decisions.some((d) => d.kind === 'icm-call'));
  it('szkic ma szablon icm-call (SC-34); w content/ go nie ma, bo ekran nie pokazuje stosów i wypłat (D-807)', () => {
    expect(pl.some((t) => t.decisions.some((d) => d.kind === 'icm-call'))).toBe(false);
    expect(icmT.map((t) => t.id)).toEqual(['sc-34']);
  });
  const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eqf };
  for (const t of icmT) {
    const spot = (t.decisions[0] as { spot: string }).spot; // push.sb-10
    const node = push.spots.find((s) => s.path === `${spot.replace('push.sb-', '')}bb|` && s.player === 'SB')!;
    const wagi = node.strategy[node.actions.indexOf('all-in')]!;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
        const b = t.bounds[level]!;
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const p = v.points[0];
          if (v.points.length !== 1 || p?.point !== 'icm-call') { bledy.push(`${seed}: punkty ${v.points.map((x) => x.point)}`); continue; }
          // bańka: miejsc płatnych o jedno mniej niż graczy (wyjaśnienia mówią „na bańce”)
          if (p.payouts.length !== p.stacks.length - 1) bledy.push(`${seed}: ${p.stacks.length} graczy, ${p.payouts.length} płatnych miejsc — to nie bańka`);
          const hc = classOf(v.hero[0], v.hero[1]);
          const atRisk = Math.min(p.stacks[p.heroIndex]!, p.stacks[p.villainIndex]!);
          const bb = atRisk / t.stackBb;
          const teraz = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, -blindMiejsca(t.positions.hero) * bb), p.payouts, p.heroIndex);
          const wygrana = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, atRisk), p.payouts, p.heroIndex);
          const przegrana = eqPo(po(p.stacks, p.heroIndex, p.villainIndex, -atRisk), p.payouts, p.heroIndex);
          const wymagane = (teraz - przegrana) / (wygrana - przegrana);
          const eq = equityVsRange(hc, wagi);
          const poprawna = eq >= wymagane ? 'call' : 'fold';
          // wyjaśnienia: próg z ICM jest wyższy niż w grze o żetony (dopłata ÷ pula po sprawdzeniu, blind BB już w puli)
          const zetony = (t.stackBb - blindMiejsca(t.positions.hero)) / (2 * t.stackBb);
          if (!(wymagane > zetony)) bledy.push(`${seed}: próg ICM ${wymagane} nie jest wyższy niż w żetonach ${zetony}`);
          if (Math.abs(p.handEquity - eq) > 1e-9 || Math.abs(p.required - wymagane) > 1e-9) bledy.push(`${seed}: equity/próg ${p.handEquity}/${p.required} ≠ ${eq}/${wymagane}`);
          if (poprawna !== b.expected[0] || p.correct !== poprawna) bledy.push(`${seed}: poprawna ${poprawna}/${p.correct}, oczekiwano ${b.expected[0]}`);
          const marza = Math.abs(eq - wymagane);
          if (marza < (b.marginMin ?? 0) || (b.marginMax !== null && marza >= b.marginMax) || marza <= 0) bledy.push(`${seed}: margines ${marza}`);
          if (b.chipsDiffer && (eq >= zetony ? 'call' : 'fold') === poprawna) bledy.push(`${seed}: akcja ICM równa akcji w grze o żetony`);
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});
