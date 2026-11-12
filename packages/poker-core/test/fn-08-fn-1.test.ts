// 08-FN-1 (sesja FR; 06-tresci-007, D-1435; spec docs/tresci/stan-fd.md): ręka mieszana w list-hand (ADR-04): wpis listy może mieć kilka akcji poprawnych
// (`correct: [4bet, call]`). Pierwsza z listy jest akcją oczekiwaną (bounds `expected`, `correct` wariantu), pozostałe poprawne w `alsoCorrect`.
// Wpisy z jednym `correct` bez zmian (także kształt wariantu, więc odcisk i istniejące warianty).
import { describe, expect, it } from 'vitest';
import { classOf, generateVariant, listHandVerdicts, type GeneratorTemplate } from '../src';

const LISTA = [
  { hands: ['AA', 'KK'], correct: '4bet' },
  { hands: ['AKs'], correct: ['4bet', 'call'] },
  { hands: ['AKo'], correct: '4bet', acceptable: ['call'] },
  { hands: ['JJ', 'TT'], correct: 'call' },
];
const szablon = (expected: string): GeneratorTemplate => ({
  id: 'sc-fx-lista-mieszana', positions: { hero: 'BTN', villain: 'CO' },
  levels: { latwy: { draws: [], reject: [], expected: [expected] } },
  decisions: [{ kind: 'list-hand', street: 'preflop', entries: LISTA }],
} as unknown as GeneratorTemplate);

describe('08-FN-1: listHandVerdicts', () => {
  it('wpis z listą: correct = pierwsza, alsoCorrect = pozostałe poprawne', () => {
    expect(listHandVerdicts('AKs', LISTA as never)).toEqual({ correct: '4bet', alsoCorrect: ['call'], acceptable: [] });
  });
  it('wpis z jednym correct: bez pola alsoCorrect (kształt jak dotąd)', () => {
    expect(listHandVerdicts('AKo', LISTA as never)).toEqual({ correct: '4bet', acceptable: ['call'] });
    expect(Object.keys(listHandVerdicts('AA', LISTA as never)!)).toEqual(['correct', 'acceptable']);
  });
});

describe('08-FN-1: generator', () => {
  it('oczekiwana 4bet: AKs niesie alsoCorrect [call], pozostałe klasy bez pola; oczekiwana = pierwsza z listy', () => {
    const t = szablon('4bet');
    const widziane = new Map<string, unknown>();
    for (let seed = 1; seed <= 3000; seed++) {
      const v = generateVariant(t, 'latwy', seed);
      const p = v.points[0]!;
      if (p.point !== 'list-hand') throw new Error('nie list-hand');
      expect(p.correct).toBe('4bet');
      widziane.set(classOf(v.hero[0], v.hero[1]), 'alsoCorrect' in p ? p.alsoCorrect : undefined);
    }
    expect(widziane.get('AKs')).toEqual(['call']);
    expect(widziane.get('AKo')).toBeUndefined();
    expect(widziane.get('AA')).toBeUndefined();
    expect(widziane.has('JJ')).toBe(false); // akcja oczekiwana 4bet: JJ (call) nie jest losowane
  });
  it('oczekiwana call: AKs (pierwsza poprawna to 4bet) nie jest losowane', () => {
    const t = szablon('call');
    for (let seed = 1; seed <= 500; seed++) {
      const v = generateVariant(t, 'latwy', seed);
      expect(['JJ', 'TT']).toContain(classOf(v.hero[0], v.hero[1]));
    }
  });
});
