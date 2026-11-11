/// <reference types="jest" />
// CX (D-886, docs/design/scenariusz-akcje-i-liczby.md §1 @ 49abc289; kryteria akceptacji 1–5): nazwy akcji z grupy `scenario.action`
// (nazwa + kwota w osobnych liniach przycisku, fraza w zdaniu), „przebicie” vs „3-bet” wg liczby przebić przed graczem, kwoty wg tabeli DA.
import '@/i18n';
import i18n from '@/i18n';
import { generateVariant, type ScenarioVariant, type VariantDecision } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { dbCn, BEZ_LIMPU, CBET, ICM, TROJBET } from '@/test-utils/kontekstCn';
import { getKontekstGeneratora } from '@/data/content/repo';
import { tekstAkcji } from '../EkranScenariusza';
import { naGenerator, opisAkcji, przebiciaWSpocie, type Akcja } from '../wariant';

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const spot = (id: string, labels: string[], correct = labels[0]!): VariantDecision =>
  ({ point: 'range-spot', street: 'preflop', spot: id, handClass: 'AA', options: labels.map((action) => ({ action, f: 0.5, verdict: 'correct' })), correct, freq: 0.5 }) as VariantDecision;
const poz = (hero: string, stackBb = 100) => ({ positions: { hero, villain: 'BTN' }, stackBb }) as Pick<ScenarioTemplate, 'stackBb' | 'positions'>;
const wariantZ = (...points: VariantDecision[]) => ({ points }) as unknown as ScenarioVariant;
const tekst = (p: VariantDecision, a: Akcja, hero = 'BTN', stackBb = 100, nastepne: VariantDecision[] = []) => tekstAkcji(wariantZ(p, ...nastepne), 0, a, poz(hero, stackBb), t);

describe('opisAkcji: klucz nazwy i rodzaj kwoty (kryterium 2)', () => {
  it('raise w spocie bez przebicia = przebicie, z jednym przebiciem = 3-bet; błąd dla spotu z więcej przebiciami albo nieznanego', () => {
    expect(przebiciaWSpocie('rfi.utg')).toBe(0);
    expect(przebiciaWSpocie('nine.rfi.utg1')).toBe(0);
    expect(przebiciaWSpocie('push.sb-10')).toBe(0);
    expect(przebiciaWSpocie('vs-open.bb-vs-btn')).toBe(1);
    expect(przebiciaWSpocie('nine.vs-open.sb-vs-btn')).toBe(1);
    expect(() => przebiciaWSpocie('vs-3bet.co-vs-btn')).toThrow(/vs-3bet\.co-vs-btn/);
    expect(opisAkcji(spot('rfi.utg', ['fold', 'raise 2.5']), 'raise 2.5')).toEqual({ klucz: 'scenario.action.raise', kwota: 'to' });
    expect(opisAkcji(spot('vs-open.bb-vs-btn', ['fold', 'call 2.5', 'raise 10']), 'raise 10')).toEqual({ klucz: 'scenario.action.threeBet', kwota: 'to' });
    expect(opisAkcji(spot('vs-open.bb-vs-btn', ['fold', 'call 2.5', 'raise 10']), 'call 2.5')).toEqual({ klucz: 'scenario.action.call', kwota: 'pay' });
    expect(opisAkcji(spot('push.sb-10', ['fold', 'all-in']), 'all-in')).toEqual({ klucz: 'scenario.action.allIn', kwota: 'all' });
    expect(opisAkcji(spot('call.bb-10', ['fold', 'call']), 'call')).toEqual({ klucz: 'scenario.action.call', kwota: 'pay' });
    expect(opisAkcji(spot('rfi.utg', ['fold', 'raise 2.5']), 'fold')).toEqual({ klucz: 'scenario.action.fold', kwota: null });
  });
});

describe('teksty akcji (kryterium 1): każda etykieta spotów ze spots.yaml ma niepustą nazwę bez znaczników', () => {
  const spoty = dbCn.getAllSync<{ id: string; actions: string }>('SELECT id, actions FROM ranges').map((r) => ({ id: r.id, etykiety: (JSON.parse(r.actions) as { label: string }[]).map((a) => a.label) }));
  it('baza ma spoty', () => expect(spoty.length).toBeGreaterThan(10));
  it.each(spoty.map((s) => [s.id, s.etykiety] as const))('%s', (id, etykiety) => {
    const p = spot(id, [...etykiety]);
    for (const a of etykiety as Akcja[]) {
      const x = tekst(p, a, 'BB', 10);
      expect(x.nazwa.length).toBeGreaterThan(0);
      expect(`${x.nazwa}${x.kwota ?? ''}${x.przycisk}${x.fraza}`).not.toContain('{{');
    }
  });
  it('pozostałe rodzaje: pas, czekanie, sprawdzenie, limp, c-bet', () => {
    for (const a of ['fold', 'check', 'call', 'limp', 'bet-small', 'bet-big'] as Akcja[]) {
      const x = tekstAkcji(wariantZ({ point: 'draw-call', street: 'flop', pot: 10, bet: 3 } as unknown as VariantDecision), 0, a, poz('BTN'), t);
      expect(x.nazwa).toBeTruthy();
      expect(x.fraza).not.toContain('{{');
    }
    expect(tekst(spot('rfi.utg', ['fold', 'raise 2.5']), 'fold').nazwa).toBe('Pas (fold)');
  });
});

describe('kwoty (kryterium 3) i zapis: nazwa wielką literą na przycisku, fraza małą w zdaniu', () => {
  it('BB wobec otwarcia BTN „call 2.5” → 1,5 bb; SB 2 bb', () => {
    const p = spot('vs-open.bb-vs-btn', ['fold', 'call 2.5', 'raise 10']);
    expect(tekst(p, 'call 2.5', 'BB').kwota).toMatch(/^1[.,]5 bb$/);
    expect(tekst(p, 'call 2.5', 'SB').kwota).toMatch(/^2 bb$/);
    expect(tekst(p, 'call 2.5', 'BB').nazwa).toMatch(/^Sprawdzenie/);
  });
  it('push.sb-10 all-in → 10 bb; call.bb-10 → 9 bb; przebicie z etykiety do 2,5 bb', () => {
    expect(tekst(spot('push.sb-10', ['fold', 'all-in']), 'all-in', 'SB', 10)).toMatchObject({ kwota: '10 bb', nazwa: 'All-in' });
    expect(tekst(spot('call.bb-10', ['fold', 'call']), 'call', 'BB', 10).kwota).toBe('9 bb');
    const r = tekst(spot('rfi.utg', ['fold', 'raise 2.5']), 'raise 2.5', 'UTG');
    expect(r.kwota).toMatch(/^do 2[.,]5 bb$/);
    expect(r.nazwa).toMatch(/^Przebicie/);
    expect(r.fraza).toMatch(/^przebicie.* do 2[.,]5 bb$/); // zdanie: małą literą
    expect(r.przycisk).toBe(`${r.nazwa}\n${r.kwota}`);
  });
  it('pas i c-bet bez kwoty', () => {
    expect(tekst(spot('rfi.utg', ['fold', 'raise 2.5']), 'fold').kwota).toBeNull();
    expect(tekstAkcji(wariantZ({ point: 'cbet-case', street: 'flop', rule: 'R-M5-007', correct: 'check' } as unknown as VariantDecision), 0, 'bet-small', poz('BTN'), t)).toMatchObject({ kwota: null, nazwa: expect.stringMatching(/^Mały/) });
  });
});

describe('range-spot przed size-spot (kryterium 4)', () => {
  it('przycisk przebicia bez kwoty (kwota zdradziłaby odpowiedź na pytanie o rozmiar), pozostałe akcje bez zmian', () => {
    const p = spot('vs-open.btn-vs-co', ['fold', 'call 2.5', 'raise 7.5']);
    const size = { point: 'size-spot', street: 'preflop', check: 'three-bet-size', options: [{ action: 'raise', bb: 7.5 }], correct: 'raise', verdicts: {} } as unknown as VariantDecision;
    expect(tekst(p, 'raise 7.5', 'BTN', 100, [size])).toMatchObject({ kwota: null, nazwa: '3-bet', przycisk: '3-bet' });
    expect(tekst(p, 'call 2.5', 'BTN', 100, [size]).kwota).toMatch(/^2[.,]5 bb$/);
    expect(tekst(p, 'raise 7.5', 'BTN', 100).kwota).toMatch(/^do 7[.,]5 bb$/); // bez size-spot kwota jest
  });
});

describe('size-spot (kryterium 5): pasek przed decyzją różni się tylko kwotą i nie zdradza oceny', () => {
  const ctx = (s: ScenarioTemplate) => getKontekstGeneratora(dbCn, s);
  it('3-bet: trzy rozmiary mają tę samą nazwę „3-bet”, różnią się kwotą do N bb', () => {
    const v = generateVariant(naGenerator(TROJBET), 'latwy', 3, ctx(TROJBET));
    const opisy = (['raise-small', 'raise', 'raise-big'] as Akcja[]).map((a) => tekstAkcji(v, 0, a, TROJBET, t));
    expect(new Set(opisy.map((x) => x.nazwa))).toEqual(new Set(['3-bet']));
    expect(new Set(opisy.map((x) => x.kwota)).size).toBe(3);
    expect(opisy.map((x) => x.przycisk).join(' ')).not.toMatch(/standard|mniejsz|większ/i);
  });
  it('limp (SB) → „limp” z dopłatą 0,5 bb, przebicie → „przebicie”', () => {
    const v = generateVariant(naGenerator(BEZ_LIMPU), 'latwy', 3, ctx(BEZ_LIMPU));
    expect(tekstAkcji(v, 0, 'limp', BEZ_LIMPU, t)).toMatchObject({ nazwa: 'Limp', kwota: expect.stringMatching(/^0[.,]5 bb$/) });
    expect(tekstAkcji(v, 0, 'raise', BEZ_LIMPU, t).nazwa).toMatch(/^Przebicie/);
  });
  it('c-bet i icm-call: czekanie, mały i duży c-bet; sprawdzenie z dopłatą 9 bb', () => {
    const c = generateVariant(naGenerator(CBET), 'latwy', 3, ctx(CBET));
    expect(['check', 'bet-small', 'bet-big'].map((a) => tekstAkcji(c, 0, a as Akcja, CBET, t).nazwa)).toEqual([expect.stringMatching(/^Czekanie/), expect.stringMatching(/^Mały/), expect.stringMatching(/^Duży/)]);
    const i = generateVariant(naGenerator(ICM), 'latwy', 3, ctx(ICM));
    expect(tekstAkcji(i, 0, 'call', ICM, t)).toMatchObject({ nazwa: expect.stringMatching(/^Sprawdzenie/), kwota: '9 bb' });
  });
});
