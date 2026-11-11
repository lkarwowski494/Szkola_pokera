// KO-073 (D-1115): zdanie o nadkartach (pair.outs.per-rank w wyjaśnieniach draw-call) tylko w bloku {{jesli:nadkarty}}, we wszystkich językach;
// bramka budowania odrzuca uszkodzone bloki.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { ScenarioTemplate } from '@szkola/content-schema';
import { checkScenarioTemplate, type ScenarioCheckContext } from '../src/scenariusze';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const jezyki = readdirSync(contentDir).filter((d) => existsSync(join(contentDir, d, 'scenarios')));
const KLUCZ = '{{n:pair.outs.per-rank}}';

interface Wyjasnienie { gdzie: string; tekst: string }
function wyjasnienia(jezyk: string): Wyjasnienie[] {
  const dir = join(contentDir, jezyk, 'scenarios');
  return readdirSync(dir).filter((f) => f.endsWith('.yaml')).flatMap((f) => {
    const t = parse(readFileSync(join(dir, f), 'utf8')) as { decisions: { actions: { action: string; explanation: string }[] }[] };
    return t.decisions.flatMap((d, i) => d.actions.map((a) => ({ gdzie: `${jezyk}/${f}#${i + 1}.${a.action}`, tekst: a.explanation })));
  });
}

describe('zdanie o nadkartach: wszystkie wystąpienia w bloku warunkowym (KO-073)', () => {
  it('jest co najmniej 12 języków z scenariuszami', () => {
    expect(jezyki.length).toBeGreaterThanOrEqual(12);
  });
  for (const j of jezyki) {
    it(`${j}: 14 wystąpień, każde w bloku {{jesli:nadkarty}}…{{/jesli}}, a blok to tylko to zdanie`, () => {
      const z = wyjasnienia(j).filter((w) => w.tekst.includes(KLUCZ));
      expect(z.length).toBe(14);
      for (const w of z) {
        const bloki = [...w.tekst.matchAll(/\{\{jesli:nadkarty\}\}([\s\S]*?)\{\{\/jesli\}\}/g)];
        expect(bloki.length, w.gdzie).toBe(1);
        expect(bloki[0]![1], w.gdzie).toContain(KLUCZ);
        expect(w.tekst.replace(/\{\{jesli:nadkarty\}\}[\s\S]*?\{\{\/jesli\}\}/, ''), w.gdzie).not.toContain(KLUCZ);
        expect(w.tekst.trimEnd().endsWith('{{/jesli}}'), `${w.gdzie}: zdanie jest ostatnie`).toBe(true);
      }
    });
  }
});

const BAZA = {
  id: 'sc-test-draw', module: 'm2', situation: 'Masz draw.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { draws: ['flush'], marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza'], expected: ['fold'] } },
  decisions: [{
    street: 'flop', kind: 'draw-call', pots: [20], fractions: [0.5], villain: 'bet', rule: 'R-M2-001',
    actions: [
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}. Sprawdzasz.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}. Pasujesz.' },
    ],
  }],
};
const ctx: ScenarioCheckContext = { ruleLevels: new Map([['R-M2-001', 'math']]), numberKeys: new Set(), moduleIds: new Set(['m2']) };
const z = (dopisek: string, zmien: (b: typeof BAZA) => void = () => undefined): string[] => {
  const b = structuredClone(BAZA);
  b.decisions[0]!.actions[1]!.explanation += dopisek;
  zmien(b);
  return checkScenarioTemplate(ScenarioTemplate.parse(b), 'sc-test-draw.yaml', ctx);
};

describe('bramka budowania: bloki warunkowe wyjaśnienia', () => {
  it('poprawny blok nadkarty w draw-call: bez błędów', () => {
    expect(z('{{jesli:nadkarty}} Nadkarty.{{/jesli}}')).toEqual([]);
  });
  it('nieznany warunek, niedomknięty i zagnieżdżony blok: błąd z miejscem', () => {
    expect(z('{{jesli:xyz}} a{{/jesli}}').join()).toMatch(/sc-test-draw.*fold.*nieznany warunek.*xyz/);
    expect(z('{{jesli:nadkarty}} a').join()).toMatch(/fold.*niedomknięty blok/);
    expect(z('{{jesli:nadkarty}}{{jesli:nadkarty}} a{{/jesli}}{{/jesli}}').join()).toMatch(/fold.*niedomknięty blok|zagnieżdż/);
  });
  it('warunek nadkarty tylko w punkcie draw-call', () => {
    const b = structuredClone(BAZA);
    b.decisions[0]!.actions[1]!.explanation += '{{jesli:nadkarty}} a{{/jesli}}';
    const sz = ScenarioTemplate.parse(b);
    (sz.decisions[0] as { kind: string }).kind = 'cbet-case'; // po parsowaniu: tu sprawdzamy tylko regułę warunku, nie schemat punktu
    expect(checkScenarioTemplate(sz, 'sc-test-draw.yaml', ctx).join()).toMatch(/nadkarty.*draw-call/);
  });
  it('pierwsze zdanie (sytuacja) nie może być warunkowe: znaczniki karty i pozycji poza blokiem', () => {
    const e = z('', (b) => { b.decisions[0]!.actions[1]!.explanation = '{{jesli:nadkarty}}Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}.{{/jesli}} Pasujesz.'; });
    expect(e.join()).toMatch(/zdanie sytuacji|blok/);
  });
});
