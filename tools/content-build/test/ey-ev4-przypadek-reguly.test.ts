// EY EV-4 (R-M5-012; stan-ev.md 08-EV-4): punkt cbet-case w generatorze wybiera przypadek reguły punktu (`spec.rule`), a nie pierwszy pasujący z puli wszystkich reguł.
// Na niskich połączonych flopach przypadek IP innej reguły (R-M5-004) zasłaniał przypadek R-M5-012. Fixture syntetyczny; wektor: flop niski → przypadek check reguły punktu.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, type CbetCaseData, type GeneratorTemplate } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { compileRanges } from '../src/ranges';

const spots = compileRanges(join(resolve(import.meta.dirname), '..', '..', '..', 'content')).spots;
const t = ScenarioTemplate.parse({
  id: 'sc-fx-cbet-oop', module: 'm5', situation: 'Fixture: c-bet z CO wobec BTN.', table: '6max', positions: { hero: 'CO', villain: 'BTN' }, stackBb: 100,
  levels: ['latwy'], bounds: { latwy: { flop: { height: ['low'] }, expected: ['check'] } },
  decisions: [{ street: 'flop', kind: 'cbet-case', rule: 'R-B', actions: ['check', 'bet-small', 'bet-big'].map((a) => ({ action: a, explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wyjaśnienie.' })) }],
});
const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
const przypadki: CbetCaseData[] = [
  { when: { height: ['low'] }, best: 'small', rule: 'R-A' }, // wcześniejsza reguła zasłania niski flop
  { when: { height: ['low'] }, best: 'check', rule: 'R-B' },
];
const ctx = (cases: CbetCaseData[]) => ({ spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, cbetCases: cases });

describe('EY EV-4: cbet-case wybiera przypadek reguły punktu', () => {
  it('flop niski, wcześniejszy przypadek innej reguły o tej samej teksturze nie zasłania przypadku R-B → wariant z check z R-B', () => {
    for (let seed = 1; seed <= 100; seed++) {
      const p = generateVariant(g, 'latwy', seed, ctx(przypadki)).points[0];
      expect(p?.point === 'cbet-case' && p.rule === 'R-B' && p.correct === 'check', `seed ${seed}`).toBe(true);
    }
  });
  it('kolejność przypadków w puli nie ma znaczenia (R-B przed R-A daje ten sam wynik)', () => {
    const p = generateVariant(g, 'latwy', 5, ctx([...przypadki].reverse())).points[0];
    expect(p?.point === 'cbet-case' && p.rule === 'R-B' && p.correct === 'check').toBe(true);
  });
  it('reguła bez przypadku dla flopu nadal odrzuca wariant (błąd szablonu przy braku jakiegokolwiek)', () => {
    expect(() => generateVariant(g, 'latwy', 1, ctx([przypadki[0]!]))).toThrow();
  }, 60_000); // 08-FQ-1 (D-1450): limit odrzuceń 60 000 zamiast 20 000, więc odmowa trwa ok. 3× dłużej (ok. 9 s)
});
