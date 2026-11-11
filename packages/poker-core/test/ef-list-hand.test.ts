// 08-N4 (sesja EF): punkt „lista rąk” w generatorze (R-M4-010). Wyrocznia: lista klas z szablonu czytana wprost, bez listHandVerdicts i generatora.
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, TemplateError, type GeneratorTemplate } from '../src';

const LISTA = [
  { hands: ['AA', 'KK'], correct: '4bet' },
  { hands: ['AKs', 'AKo'], correct: '4bet', acceptable: ['call'] },
  { hands: ['JJ', 'TT', '99'], correct: 'call' },
];
const szablon = (expected: string, entries = LISTA): GeneratorTemplate => ({
  id: 'sc-fx-lista',
  positions: { hero: 'BTN', villain: 'CO' },
  levels: { latwy: { draws: [], reject: [], expected: [expected] } },
  decisions: [{ kind: 'list-hand', street: 'preflop', entries }],
});
const LOSOWANIA = 10_000;

describe('08-N4: list-hand', () => {
  for (const oczekiwana of ['4bet', 'call']) {
    it(`oczekiwana ${oczekiwana}: ${LOSOWANIA} wariantów, klasa z listy i akcja z wpisu`, () => {
      const t = szablon(oczekiwana);
      const widziane = new Set<string>();
      for (let seed = 1; seed <= LOSOWANIA; seed++) {
        const v = generateVariant(t, 'latwy', seed);
        const p = v.points[0];
        expect(p?.point).toBe('list-hand');
        if (p?.point !== 'list-hand') return;
        const hc = classOf(v.hero[0], v.hero[1]);
        expect(p.handClass).toBe(hc);
        const wpis = LISTA.filter((e) => e.hands.includes(hc));
        expect(wpis).toHaveLength(1);
        expect(wpis[0]!.correct).toBe(oczekiwana);
        expect(p.correct).toBe(oczekiwana);
        expect(p.acceptable).toEqual((wpis[0] as { acceptable?: string[] }).acceptable ?? []);
        widziane.add(hc);
      }
      const oczekiwaneKlasy = LISTA.filter((e) => e.correct === oczekiwana).flatMap((e) => e.hands).sort();
      expect([...widziane].sort()).toEqual(oczekiwaneKlasy);
    });
  }
  it('lista bez klasy z oczekiwaną akcją to błąd szablonu', () => {
    expect(() => generateVariant(szablon('fold'), 'latwy', 1)).toThrow(TemplateError);
  });
  it('ta sama klasa w dwóch wpisach to błąd szablonu', () => {
    expect(() => generateVariant(szablon('4bet', [{ hands: ['AA'], correct: '4bet' }, { hands: ['AA', 'KK'], correct: 'call' }]), 'latwy', 1)).toThrow(/klasa AA w więcej niż jednym wpisie listy/); // EI-005: komunikat generatora, nie późniejszy z listHandVerdicts
  });
  it('nieznana klasa ręki to błąd szablonu', () => {
    expect(() => generateVariant(szablon('4bet', [{ hands: ['AAs'], correct: '4bet' }]), 'latwy', 1)).toThrow(/AAs/);
  });
  it('ten sam seed daje ten sam wariant', () => {
    const t = szablon('4bet');
    expect(generateVariant(t, 'latwy', 7).fingerprint).toBe(generateVariant(t, 'latwy', 7).fingerprint);
  });
});
