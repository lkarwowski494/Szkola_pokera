/// <reference types="jest" />
/**
 * Rola 09, K2a (D-288): teksty zadań generowanych pochodzą ze słownika interfejsu (`drill.*`), więc w języku innym
 * niż polski nie zostaje ani jedno słowo z kodu. Test podstawia słownik „en” z literami zamienionymi na X (poza
 * znacznikami {{…}}) i sprawdza, że w każdym wygenerowanym tekście zostają tylko: X, liczby, karty [[…]], nazwy rąk
 * (AKo) i nazwy angielskie terminów (w en znacznik {{t:…}} daje samą nazwę angielską, D-287).
 * P-2 (D-293): w języku innym niż polski ćwiczenie słownictwa pyta tylko o skrót (definicje w języku: K5).
 */
import type { Drill } from '@szkola/content-schema';
import { createRng, HAND_CLASSES } from '@szkola/poker-core';
import i18n from '@/i18n';
import pl from '@/i18n/locales/pl.json';
import { TERMS } from '@/data/content/terms.generated';
import type { RangeSpot } from '@/data/content/repo';
import { instantiate } from '../engine';

const iksy = (v: unknown): unknown =>
  typeof v === 'string'
    ? v.split(/(\{\{[^{}]*\}\})/).map((c, i) => (i % 2 ? c.replace(/^\{\{t:([^|}]+)\|[^}]*\}\}$/, '{{t:$1}}') : c.replace(/\p{L}/gu, 'X'))).join('')
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, iksy(x)]))
      : v;

const DOZWOLONE = new Set(
  Object.values(TERMS).flatMap((t) => [t.en, ...t.enAlt, ...('abbr' in t && t.abbr ? [t.abbr] : [])]).flatMap((s) => s.toLowerCase().split(/[^\p{L}]+/u)).concat(['test', 'raise']),
);

/** Słowa spoza słownika: wszystko, co nie jest X, kartą, nazwą ręki ani słowem z nazw angielskich terminów. */
function obce(s: string): string[] {
  const bez = s.replace(/\[\[[^\]]*\]\]/g, ' ').replace(/\b[2-9TJQKA]{2}[so]?\b/g, ' ');
  return (bez.match(/\p{L}+/gu) ?? []).filter((w) => !/^x+$/i.test(w) && !/^[A-Z]$/.test(w) && !DOZWOLONE.has(w.toLowerCase()));
}

function teksty(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => teksty(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (['prompt', 'text', 'why', 'explanation', 'label', 'options', 'rows'].includes(k)) teksty(x, out);
  return out;
}

const spot: RangeSpot = {
  id: 's', title: 'Test', hero: 'BTN', path: '', playPercent: 0.1,
  groups: [{ name: 'Raise', freqs: HAND_CLASSES.map((hc) => (hc === 'AA' ? 1 : hc === 'AKs' ? 0.5 : hc === 'AKo' ? 0.1 : 0)) }],
};
const ctx = { range: () => spot };
const g = (generator: string, params: Record<string, string | number> = {}, count = 30): Drill =>
  ({ kind: 'generated', id: `t.${generator}`, family: `f.${generator}`, rules: [], generator, params, count }) as Drill;
const ZADANIA: Drill[] = [
  g('whoWins'), g('whoWinsKicker'), g('bestHand'), g('outs', { kind: 'flush' }), g('outs', { kind: 'oesd' }), g('outs', { kind: 'gutshot' }),
  g('potOdds'), g('drawCall'), g('icm', { mode: 'call' }), g('icm', { mode: 'equity' }), g('rangeDecision', { spots: 's' }),
  g('playerType', { nitMax: 0.14, regLow: 0.18, regHigh: 0.3, loose: 0.35, passiveGap: 10, aggressiveGap: 3, minHands: 30, readHands: 100 }, 60),
  { kind: 'texture', id: 'tx', family: 'tx', rules: [], axes: ['height', 'suits', 'ranks', 'wetness'], count: 60 } as Drill,
  { kind: 'texture', id: 'tx1', family: 'tx1', rules: [], axes: ['ranks'], count: 30 } as Drill,
  { kind: 'paint', id: 'p', family: 'p', rules: [], spot: 's', prompt: 'X' } as Drill,
  g('vocab', { area: 'positions', dir: 'both' }, 20),
];

describe('teksty zadań w języku innym niż polski (K2a, D-288)', () => {
  beforeAll(async () => {
    i18n.addResourceBundle('en', 'translation', { drill: iksy((pl as { drill: unknown }).drill) }, true, true);
    await i18n.changeLanguage('en');
  });
  afterAll(async () => {
    await i18n.changeLanguage('pl');
  });

  it.each(ZADANIA.map((d) => [d.id + JSON.stringify('params' in d ? d.params : ''), d] as const))('%s: bez słów spoza słownika', (_n, d) => {
    const wyniki = instantiate(d, 'l1', createRng(7), undefined, ctx).flatMap((x) => teksty(x));
    expect(wyniki.length).toBeGreaterThan(0);
    expect(wyniki.filter((s) => s.includes('{{'))).toEqual([]);
    expect([...new Set(wyniki.flatMap(obce))]).toEqual([]);
  });

  it('liczby w zapisie języka: kropka dziesiętna w en', () => {
    const w = instantiate(g('drawCall'), 'l1', createRng(3), undefined, ctx).flatMap((x) => teksty(x)).join(' ');
    expect(w).toMatch(/\d\.\d/);
    expect(w).not.toMatch(/\d,\d/);
  });

  it('P-2: ćwiczenie słownictwa w en tylko w kierunku „skrót → nazwa”; obszar bez skrótów nie daje zadań', () => {
    const pyt = instantiate(g('vocab', { area: 'positions', dir: 'both' }, 20), 'l1', createRng(5)).map((x) => (x as { prompt: string }).prompt);
    const wzor = (pl as { drill: { vocab: { promptAbbr: string } } }).drill.vocab.promptAbbr.split('{{abbr}}')[0]!.replace(/\p{L}/gu, 'X');
    expect(pyt.filter((p) => !p.startsWith(wzor))).toEqual([]);
    expect(instantiate(g('vocab', { area: 'hands', dir: 'both' }, 5), 'l1', createRng(5))).toEqual([]);
  });
});
