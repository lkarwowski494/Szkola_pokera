/// <reference types="jest" />
/**
 * D-335 (otwarte #3 sesji P, plan-09 §13): definicja terminu w języku aplikacji z nakładki `content/<język>/terms-def.yaml`
 * (moduł `TERM_DEFS`). Po polsku pole `def`; w innym języku łańcuch wariant → język → en, bez zejścia do polskiego
 * (słowniczek en z polskim zdaniem gorszy niż brak). Ćwiczenie słownictwa w en wraca do kierunku „definicja → termin” (P-2),
 * gdy definicja jest w tym języku; opcje w tym kierunku to nazwy angielskie, nie polskie.
 */
import { createRng } from '@szkola/poker-core';
import i18n from '@/i18n';
import { TERMS } from '@/data/content/terms.generated';
import { instantiate } from '../../drills/engine';
import { vocabModes } from '../../drills/vocab';
import { definicjaTerminu } from '../definicje';

jest.mock('@/data/content/terms.generated', () => {
  const prawdziwy = jest.requireActual('@/data/content/terms.generated');
  return { ...prawdziwy, TERM_DEFS: { en: { pot: 'All the chips bet in the current hand.', flop: 'The first three community cards, dealt together.' } } };
});

describe('definicjaTerminu', () => {
  it('pl: pole def z terms.yaml', () => {
    expect(definicjaTerminu('pot', 'pl')).toBe(TERMS.pot.def);
  });
  it('en: przekład z nakładki; ja bez nakładki: łańcuch → en; brak przekładu w łańcuchu: brak definicji (nie polska)', () => {
    expect(definicjaTerminu('pot', 'en')).toBe('All the chips bet in the current hand.');
    expect(definicjaTerminu('pot', 'ja')).toBe('All the chips bet in the current hand.');
    expect(definicjaTerminu('pot', 'de', {})).toBeUndefined();
    expect(definicjaTerminu('nieznany', 'pl')).toBeUndefined();
  });
});

describe('ćwiczenie słownictwa w en z definicjami w języku', () => {
  beforeAll(async () => { await i18n.changeLanguage('en'); });
  afterAll(async () => { await i18n.changeLanguage('pl'); });

  it('vocabModes: termin z definicją en dostaje kierunek def; bez definicji tylko skrót (P-2)', () => {
    expect(vocabModes({ ...TERMS.flop, def: definicjaTerminu('flop', 'en')! }, 'en')).toEqual(['def']);
    const { def: _pominieta, ...bez } = TERMS.flop;
    expect(vocabModes(bez, 'en')).toEqual([]);
  });

  it('zadania def w en: definicja angielska w pytaniu i w wyjaśnieniu, opcje to nazwy angielskie', () => {
    const d = { kind: 'generated' as const, id: 't.table', family: 'vocab.table', rules: [], generator: 'vocab' as const, params: { area: 'table', dir: 'def' }, count: 4 };
    const zadania = [1, 2, 3, 4, 5].flatMap((s) => instantiate(d, null, createRng(s)));
    expect(zadania.length).toBeGreaterThan(0);
    for (const z of zadania) {
      if (z.kind !== 'choice') throw new Error('oczekiwane zadanie wyboru');
      expect(z.prompt).toMatch(/All the chips bet|The first three community cards/);
      expect(z.explanation).toMatch(/All the chips bet|The first three community cards/);
      const dobra = z.options.find((o) => o.correct)!;
      expect(['pot', 'flop']).toContain(dobra.text);
      expect(z.options.map((o) => o.text).filter((t) => /[ąćęłńóśźż]|\(/.test(t))).toEqual([]);
    }
  });
});
