// Szablony treści z punktami cbet-case (F2) i icm-call (F4) (rola 06, sesja CO, D-791). BR-GEN-003: 10 000 losowań na poziom,
// wyrocznie niezależne od generatora, jak w szablony-f2-ca i szablony-f4-ca (te same metody, tu na content/pl/scenarios):
// - cbet-case: prawdziwe rozdanie w silniku gry (BTN otwiera 2,5 bb, BB sprawdza i czeka), ocena gradeDecision z kit; poza akcją
//   zgodną sprawdzane są też oceny pozostałych akcji (ŚR-005, D-793: rzadsza akcja „dopuszczalna”, duży zakład przy best small
//   „niedokładność”), bo wyjaśnienia w treści mówią to wprost; od EH otwiera gracz z positions.hero (SC-04: UTG), a punkt c-betu
//   może stać po range-spot;
// - icm-call: equity z surowego equity169.json wobec zakresu push z pushfold.json i ICM Malmutha-Harville'a liczony od zera.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import {
  applyAction,
  classifyFlop,
  classOf,
  generateVariant,
  gradeDecision,
  HOLDING_LIMITS,
  makeCard,
  rankOf,
  suitOf,
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
// SC-34 (icm-call): w treści bez poziomu trudnego (DU, D-1036); szkic z poziomem trudnym zostaje dla 06-tresci-002 i wyrocznia ICM sprawdza oba
const szkice = loadScenarioTemplates(join(root, 'docs', 'tresci', 'szablony-robocze')).map((x) => x.template);
const LOSOWANIA = 10_000;
const gen = (t: (typeof pl)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

// ---------- cbet-case ----------
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const cbetCases = content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!;
const AKCJE = ['check', 'bet-small', 'bet-big'] as const;
type Akcja = (typeof AKCJE)[number];
/** Miejsca przy stole z cfg (button = 3): kolejność akcji przed flopem od UTG. */
const MIEJSCA = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
/**
 * Flop po otwarciu gracza z `pozycja` na 2,5 bb, pasach pozostałych, sprawdzeniu BB i jego czekaniu (EH: SC-04 otwiera z UTG; dawniej
 * tylko Button). Rywalem jest zawsze BB (szablony cbet-case mają villain: BB).
 */
function flopPo(pozycja: string, hero: [Card, Card], villain: [Card, Card], flop: Card[]): HandState {
  const h = MIEJSCA.indexOf(pozycja as (typeof MIEJSCA)[number]);
  if (h < 0 || h > 4) throw new Error(`pozycja otwarcia ${pozycja}`);
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[h] = hero;
  holes[5] = villain;
  let st = startHand(cfg, 1, { holes, board: flop });
  const seq: PlayerAction[] = [...MIEJSCA.slice(0, 5).map((_, i): PlayerAction => (i === h ? { type: 'raise', to: Math.round(2.5 * BB) } : { type: 'fold' })), { type: 'call' }, { type: 'check' }];
  for (const a of seq) st = applyAction(st, a);
  return st;
}
const pula = 5 * BB;
const akcja = (a: Akcja): PlayerAction =>
  a === 'check' ? { type: 'check' } : { type: 'bet', to: Math.round(pula * number(a === 'bet-small' ? 'cbet.size.small' : 'cbet.size.big')) };
const maPare = (hero: readonly Card[], flop: readonly Card[]) => rankOf(hero[0]!) === rankOf(hero[1]!) || hero.some((c) => flop.some((f) => rankOf(f) === rankOf(c)));
/**
 * Gotowy układ z pięciu kart (ręka + flop), z samych rang i kolorów (07-jakosc-003): kolor (5 kart w jednym kolorze) albo strit
 * (5 kolejnych rang, as także nisko). Ręka z takim układem nie „chybiła”, więc nie jest air, mimo że outyDrawa dla niej daje 0.
 */
function gotowyUklad(hero: readonly Card[], flop: readonly Card[]): 'kolor' | 'strit' | null {
  const karty = [...hero, ...flop];
  if (karty.length !== 5) return null;
  if (new Set(karty.map(suitOf)).size === 1) return 'kolor';
  const rangi = new Set(karty.map(rankOf));
  if (rangi.size !== 5) return null;
  const posortowane = [...rangi].sort((x, y) => x - y);
  const kolejne = posortowane[4]! - posortowane[0]! === 4;
  const kolo = posortowane.join() === '0,1,2,3,12'; // A2345
  return kolejne || kolo ? 'strit' : null;
}
/**
 * Outy drawa liczone z samych rang i kolorów (CZ, 06-tresci-007), bez classifyHolding, którego używa generator: niewidziane karty,
 * które dają kolor (4 karty w kolorze z kartą gracza) albo strit (5 kolejnych rang, as także nisko). Stół ma 3 karty, więc strit
 * z jedną dobraną kartą zawsze używa karty gracza. Próg „draw” to parametr klas rąk HOLDING_LIMITS.drawOutsMin (kolor 9, strit
 * otwarty 8), nie wartość z kodu generatora; gutshot (4 outy) i backdoory zostają poniżej progu.
 */
function outyDrawa(hero: readonly Card[], flop: readonly Card[]): number {
  const widziane = new Set([...hero, ...flop]);
  const outy = new Set<Card>();
  for (let s = 0; s < 4; s++) {
    const wKolorze = [...widziane].filter((c) => suitOf(c) === s);
    if (wKolorze.length === 4 && hero.some((c) => suitOf(c) === s)) for (let r = 0; r < 13; r++) if (!widziane.has(makeCard(r, s))) outy.add(makeCard(r, s));
  }
  const rangi = new Set([...widziane].map(rankOf));
  const strit = (rs: Set<number>) => {
    const z = (r: number) => rs.has(r) || (r === -1 && rs.has(12)); // -1 = as nisko (A-2-3-4-5)
    for (let lo = -1; lo <= 8; lo++) if ([0, 1, 2, 3, 4].every((k) => z(lo + k))) return true;
    return false;
  };
  if (!strit(rangi)) {
    for (let r = 0; r < 13; r++) {
      if (rangi.has(r) || !strit(new Set([...rangi, r]))) continue;
      for (let s = 0; s < 4; s++) if (!widziane.has(makeCard(r, s))) outy.add(makeCard(r, s));
    }
  }
  return outy.size;
}
// Zakres otwarcia BTN wprost z pliku solvera (węzeł wg path i gracza ze spots.yaml), nie z compileRanges ani z losowania generatora:
// „otworzyłeś z Buttona” wymaga klasy ręki z niezerową częstością akcji innej niż pas (CS, 06-tresci-004).
const solver6 = JSON.parse(readFileSync(join(root, 'content/ranges/preflop-6max-100bb.json'), 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };
const defSpotow = parseYaml(readFileSync(join(root, 'content/ranges/spots.yaml'), 'utf8')) as { id: string; hero: string; path: string }[];
function otwiera(pozycja: string, hc: string): boolean {
  const def = defSpotow.find((x) => x.id === `rfi.${pozycja.toLowerCase()}`)!;
  const wezel = solver6.spots.find((n) => n.path === def.path && n.player === def.hero)!;
  return wezel.actions.some((a, i) => a !== 'fold' && (wezel.strategy[i]![hc] ?? 0) > 0);
}
/**
 * Oceny silnika gry dla akcji przy przypadku c-betu (D-793): best small → check dopuszczalne, big niedokładne; best check → mały zakład
 * dopuszczalny, a duży na flopie połączonym niedokładny (D-845, `sizeDown` przypadku R-M5-004; SC-12 ma tylko flopy połączone).
 */
const OCENY: Record<string, Record<Akcja, string>> = {
  'bet-small': { 'bet-small': 'compliant', check: 'acceptable', 'bet-big': 'inaccuracy' },
  check: { check: 'compliant', 'bet-small': 'acceptable', 'bet-big': 'inaccuracy' },
};

describe('CZ (06-tresci-007): wyrocznia outów drawa z rang i kolorów, rachunek ręczny', () => {
  const k = (x: string) => makeCard('23456789TJQKA'.indexOf(x[0]!), 'shdc'.indexOf(x[1]!));
  const o = (h: string, f: string) => outyDrawa(h.split(' ').map(k), f.split(' ').map(k));
  it.each([
    ['Ah 5h', 'Kh 8h 3c', 9], // kolor: 13 − 4 widziane kiery
    ['9s 8d', '7c 6h 2s', 8], // strit otwarty: T i 5, po 4
    ['9s 8d', 'Jc 7h 2s', 4], // gutshot: T
    ['5s 4d', 'Ac 3h Kd', 4], // as nisko: 2
    ['9h 8h', '7h 6c 2h', 15], // kolor 9 + T i 5 bez dwóch kierów (6)
    ['Ks Qd', '9c 5h 2s', 0], // bez drawa
  ] as const)('%s na %s: %i outów', (h, f, n) => expect(o(h, f)).toBe(n));
  it.each([
    ['9s 8d', '7c 6h 5s', 'strit'],
    ['As 2d', '3c 4h 5s', 'strit'], // koło
    ['Ah 5h', 'Kh 8h 3h', 'kolor'],
    ['9s 8d', '7c 6h 2s', null], // dopiero draw
    ['Ks Qd', '9c 5h 2s', null],
  ] as const)('gotowy układ %s na %s: %s', (h, f, n) => expect(gotowyUklad(h.split(' ').map(k), f.split(' ').map(k))).toBe(n));
  it('próg drawa z parametru klas rąk: gutshot poniżej, strit otwarty od progu', () => {
    expect(HOLDING_LIMITS.drawOutsMin).toBeGreaterThan(4);
    expect(HOLDING_LIMITS.drawOutsMin).toBeLessThanOrEqual(8);
  });
});

describe('szablony treści cbet-case: ocena silnika gry zgodna z oczekiwaną akcją i z wyjaśnieniami (BR-GEN-003, D-793)', () => {
  const cbet = pl.filter((t) => t.decisions.some((d) => d.kind === 'cbet-case'));
  it('treść ma szablony cbet-case (SC-04, SC-05 po range-spot; SC-11, SC-12)', () => {
    expect(cbet.map((t) => t.id)).toEqual(['sc-04', 'sc-05', 'sc-11', 'sc-12']);
  });
  for (const t of cbet) {
    const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, cbetCases };
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
        const b = t.bounds[level]!;
        const k = t.decisions.findIndex((d) => d.kind === 'cbet-case'); // EH: punkt c-betu bywa drugi (po range-spot)
        const oczekiwana = b.expected[k]! as Akcja;
        const regula = (t.decisions[k] as { rule: string }).rule;
        const wTresci = (t.decisions[k]!.actions as { action: string }[]).map((a) => a.action) as Akcja[];
        const bledy: string[] = [];
        for (let seed = 1; seed <= LOSOWANIA && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const flop = v.board.slice(0, 3);
          if (new Set([...v.hero, ...v.villain, ...v.board]).size !== 9) bledy.push(`${seed}: karty się powtarzają`);
          if (b.flop && !textureMatches(classifyFlop(flop), b.flop)) bledy.push(`${seed}: tekstura poza filtrem`);
          // holding air: bez pary i bez drawa, oba z samych rang i kolorów (CZ, 06-tresci-007: bez classifyHolding generatora)
          if ((b.holding ?? []).join() === 'air' && maPare(v.hero, flop)) bledy.push(`${seed}: ręka poza filtrem air (para)`);
          if ((b.holding ?? []).join() === 'air' && gotowyUklad(v.hero, flop)) bledy.push(`${seed}: ręka poza filtrem air (gotowy ${gotowyUklad(v.hero, flop)})`);
          if ((b.holding ?? []).join() === 'air' && outyDrawa(v.hero, flop) >= HOLDING_LIMITS.drawOutsMin) bledy.push(`${seed}: ręka poza filtrem air (draw, ${outyDrawa(v.hero, flop)} outów)`);
          if (t.positions && !otwiera(t.positions.hero, classOf(v.hero[0], v.hero[1]))) bledy.push(`${seed}: ${classOf(v.hero[0], v.hero[1])} poza zakresem otwarcia ${t.positions.hero}`);
          const st = flopPo(t.positions!.hero, v.hero, v.villain, flop);
          for (const a of wTresci) {
            const f = gradeDecision(st, akcja(a), kit);
            if (f.ruleId !== regula) bledy.push(`${seed}: ${a}: reguła ${f.ruleId} zamiast ${regula}`);
            if (f.verdict !== OCENY[oczekiwana]![a]) bledy.push(`${seed}: ${a}: silnik ${f.verdict}, wyjaśnienie zakłada ${OCENY[oczekiwana]![a]}`);
          }
          if (v.points[k]?.point !== 'cbet-case' || v.points[k]!.correct !== oczekiwana) bledy.push(`${seed}: punkt wariantu ${v.points[k]?.point} ${v.points[k]?.correct}`);
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
  const icmPl = pl.filter((t) => t.decisions.some((d) => d.kind === 'icm-call'));
  const icmSzkic = szkice.filter((t) => t.decisions.some((d) => d.kind === 'icm-call'));
  it('treść ma SC-34 bez poziomu trudnego (D-1036), a szkic SC-34 z poziomem trudnym czeka na 06-tresci-002 (D-825, D-986)', () => {
    expect(icmPl.map((t) => t.id)).toEqual(['sc-34']);
    expect(icmPl[0]!.levels).toEqual(['latwy', 'sredni']);
    expect(icmSzkic.map((t) => t.id)).toEqual(['sc-34']);
    expect(icmSzkic[0]!.levels).toContain('trudny');
  });
  const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eqf };
  for (const [zrodlo, t] of [...icmPl.map((x) => ['treść', x] as const), ...icmSzkic.map((x) => ['szkic', x] as const)]) {
    const spot = (t.decisions[0] as { spot: string }).spot; // push.sb-10
    const node = push.spots.find((s) => s.path === `${spot.replace('push.sb-', '')}bb|` && s.player === 'SB')!;
    const wagi = node.strategy[node.actions.indexOf('all-in')]!;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${zrodlo} ${t.id} ${level}: ${LOSOWANIA} wariantów`, () => {
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
