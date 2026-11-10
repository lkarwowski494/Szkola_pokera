// Recenzja CE (rola 08, audit) zmian CA 6a5ca17..1533486: testy odtwarzające znalezisk WYS, celowo CZERWONE (bez naprawy).
// Raport: docs/programista/recenzje/recenzja-ca-1533486.md. Oznaczone `it.fails`, żeby `pnpm run ci` zostało zielone, dopóki
// błąd trwa; z CE_CZERWONE=1 to zwykłe `it` (dowód czerwieni). Naprawa: zamień `przypadek` na `it` (test ma przejść).
// Wyrocznie liczone od zera z pozycji szablonu, bez stałych i modelu generatora (ŚR-204).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';

const przypadek = process.env.CE_CZERWONE ? it : it.fails;
const root = resolve(import.meta.dirname, '../../..');
const fixtures = join(resolve(import.meta.dirname), 'fixtures');
const BLIND = { SB: 0.5, BB: 1 } as Record<string, number>;
/** Martwe blindy: wpłacone przez graczy spoza rozdania (pozycje szablonu). */
const martwe = (hero: string, villain: string) => Object.entries(BLIND).filter(([p]) => p !== hero && p !== villain).reduce((s, [, v]) => s + v, 0);
const generator = (t: { id: string; stackBb?: number; bounds: unknown; decisions: unknown }) =>
  ({ id: t.id, stackBb: t.stackBb, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

/** ICM Malmutha-Harville'a z definicji; gracz z zerem odpada. */
function icm(stacks: number[], payouts: readonly number[], who: number): number {
  if (stacks[who]! <= 0) return 0;
  const out = stacks.map(() => 0);
  const rec = (zostali: number[], miejsce: number, p: number) => {
    if (miejsce >= payouts.length || zostali.length === 0) return;
    const suma = zostali.reduce((a, k) => a + stacks[k]!, 0);
    for (const k of zostali) {
      const pk = (p * stacks[k]!) / suma;
      out[k]! += pk * payouts[miejsce]!;
      rec(zostali.filter((z) => z !== k), miejsce + 1, pk);
    }
  };
  rec(stacks.map((_, i) => i).filter((i) => stacks[i]! > 0), 0, 1);
  return out[who]!;
}

describe('recenzja CE 08-programista-001: icm-call pomija blindy wpłacone przez gracza w BB (pozycje szablonu)', () => {
  const t = loadScenarioTemplates(join(fixtures, 'icm-call'))[0]!.template;
  const eqf = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as { classes: string[]; equity: number[][]; pairs: number[][] };
  const ctx = { spots: compileRanges(join(root, 'content')).spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169: eqf };
  przypadek(`${t.id} trudny: odpowiedź zgodna z rachunkiem ICM z blindami (gracz ${t.positions.hero} wobec all-inu ${t.positions.villain}, stos efektywny ${t.stackBb} bb)`, () => {
    expect(t.positions.hero).toBe('BB');
    const odwrocone: string[] = [];
    for (let seed = 1; seed <= 300; seed++) {
      const v = generateVariant(generator(t), 'trudny' as ScenarioLevel, seed, ctx);
      const p = v.points[0]!;
      if (p.point !== 'icm-call') throw new Error('punkt');
      const s = p.stacks;
      const eff = Math.min(s[p.heroIndex]!, s[p.villainIndex]!);
      const bb = eff / t.stackBb!; // spot push na stos efektywny stackBb
      const po = (d: number) => s.map((x, i) => (i === p.heroIndex ? x + d : i === p.villainIndex ? x - d : x));
      const pas = icm(po(-BLIND.BB! * bb), p.payouts, p.heroIndex); // pas: gracz traci wpłacony duży blind
      const wygrana = icm(po(eff), p.payouts, p.heroIndex);
      const przegrana = icm(po(-eff), p.payouts, p.heroIndex);
      const wymagane = (pas - przegrana) / (wygrana - przegrana);
      const poprawna = p.handEquity >= wymagane ? 'call' : 'fold';
      if (poprawna !== p.correct) odwrocone.push(`${seed}: ${p.handClass} equity ${p.handEquity.toFixed(3)}, próg z blindami ${wymagane.toFixed(3)}: ${poprawna}, generator ${p.correct}`);
    }
    expect(odwrocone.slice(0, 3)).toEqual([]);
  }, 120_000);
});

describe('recenzja CE 08-programista-002: all-in rywala nie większy niż stos gracza, gdy gracz albo rywal jest blindem', () => {
  const t = loadScenarioTemplates(join(fixtures, 'scenariusze')).find((x) => x.template.id === 'sc-fx-allin-draw')!.template;
  przypadek(`${t.id}: zakład = stos ${t.positions.hero} za pulą przy martwych blindach z pozycji (${t.positions.hero} wobec ${t.positions.villain})`, () => {
    const dead = martwe(t.positions.hero, t.positions.villain);
    const zle: string[] = [];
    for (let seed = 1; seed <= 300; seed++) {
      const v = generateVariant(generator(t), 'sredni' as ScenarioLevel, seed);
      const d = v.decisions[0]!;
      const stos = t.stackBb! - (d.pot - dead) / 2; // pula = 2 × wkład + martwe blindy
      if (Math.abs(d.bet - stos) > 1e-9) zle.push(`${seed}: pula ${d.pot}, all-in ${d.bet}, stos za pulą ${stos}`);
    }
    expect(zle.slice(0, 3)).toEqual([]);
  }, 60_000);
});
