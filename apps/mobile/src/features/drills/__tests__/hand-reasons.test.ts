/// <reference types="jest" />
/// <reference types="node" />
/**
 * Rachunki i kierunek powodów z klasy ręki (sesja BN, KO-040). Szczebel 1 (rachunek) dla liczb; twierdzenie
 * dydaktyczne każdego powodu ma regułę w content/pl/rules.yaml (HAND_REASON_RULE) z poziomem pewności.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRng, handEquity, HAND_CLASSES, parseCard } from '@szkola/poker-core';
import { HAND_REASON_RULE, HAND_REASON_SIDE, handFeatures, handReasonKey, overcardFlop, type HandReasonKey } from '../hand-reasons';

const R = '23456789TJQKA';
const v = (c: string) => R.indexOf(c) + 2;

describe('powody z klasy ręki: rachunki', () => {
  it('liczba stritów z obiema kartami = przegląd 10 stritów (as także jako 1)', () => {
    const straights = Array.from({ length: 10 }, (_, i) => new Set(Array.from({ length: 5 }, (_, j) => i + 1 + j)));
    const inS = (s: Set<number>, x: number) => s.has(x) || (x === 14 && s.has(1));
    for (const hc of HAND_CLASSES) {
      const [a, b] = [v(hc[0]!), v(hc[1]!)];
      const exp = a === b ? 0 : straights.filter((s) => inS(s, a) && inS(s, b)).length;
      expect([hc, handFeatures(hc).straights]).toEqual([hc, exp]);
    }
    expect(handFeatures('98s').straights).toBe(4);
    expect(handFeatures('A5o').straights).toBe(1);
    expect(handFeatures('72o').straights).toBe(0);
  });

  it('szansa karty wyższej od ręki na flopie = przegląd wszystkich 19 600 flopów', () => {
    for (const hc of HAND_CLASSES) {
      const f = handFeatures(hc);
      // talia bez dwóch kart ręki: rangi kart ręki tracą po jednej karcie (para: dwie z tej samej rangi)
      const deck: number[] = [];
      for (let r = 2; r <= 14; r++) {
        const minus = (r === f.high ? 1 : 0) + (r === f.low ? 1 : 0);
        for (let k = 0; k < 4 - minus; k++) deck.push(r);
      }
      let hit = 0, all = 0;
      for (let i = 0; i < deck.length; i++) for (let j = i + 1; j < deck.length; j++) for (let k = j + 1; k < deck.length; k++) {
        all++;
        if (deck[i]! > f.high || deck[j]! > f.high || deck[k]! > f.high) hit++;
      }
      expect(all).toBe(19600);
      expect(overcardFlop(f)).toBeCloseTo(hit / all, 12);
    }
  });

  it('powód „niskie karty” pada tylko przy szansie ≥ 75% („zwykle” albo częściej)', () => {
    for (const hc of HAND_CLASSES) {
      const k = handReasonKey(hc, 'out', 'rfi.btn');
      if (k === 'overcards' || k === 'overcardsPair') expect(overcardFlop(handFeatures(hc))).toBeGreaterThanOrEqual(0.75);
    }
  });

  it('ręka zdominowana (ta sama wysoka karta, niższy kicker) wygrywa rzadziej niż ręka, która ją dominuje', () => {
    const rng = createRng(17);
    let min = 1, max = 0;
    for (let x = 14; x >= 10; x--) for (let k2 = x - 1; k2 >= 2; k2--) for (let k1 = k2 - 1; k1 >= 2; k1--) {
      const e = handEquity([[parseCard(`${R[x - 2]}h`), parseCard(`${R[k1 - 2]}c`)], [parseCard(`${R[x - 2]}s`), parseCard(`${R[k2 - 2]}d`)]], [], { iterations: 1500, exactLimit: 0, rng }).equity[0]!;
      min = Math.min(min, e);
      max = Math.max(max, e);
    }
    expect(max).toBeLessThan(0.5);
    expect(min).toBeGreaterThan(0.2);
  });
});

describe('powody z klasy ręki: kierunek i reguły', () => {
  it('przy ręce w zakresie tylko cechy siły, poza zakresem tylko cechy słabości (D-567, warunek koordynatora a)', () => {
    for (const spot of ['rfi.utg', 'call.bb-10', 'push.btn-3max'])
      for (const hc of HAND_CLASSES) {
        const i = handReasonKey(hc, 'in', spot);
        const o = handReasonKey(hc, 'out', spot);
        if (i) expect(HAND_REASON_SIDE[i]).toBe('in');
        if (o) expect(HAND_REASON_SIDE[o]).toBe('out');
      }
    // ręka w kolorze poza zakresem nie dostaje argumentu „kolor”, a para w zakresie nie dostaje „niskie karty”
    expect(handReasonKey('Q3s', 'out', 'rfi.btn')).toBe('dominated');
    expect(handReasonKey('22', 'in', 'call.bb-5')).toBe('pair');
    // „wyższa karta przy all-in” tylko w spotach all-in
    expect(handReasonKey('T7o', 'in', 'rfi.utg')).toBeNull();
    expect(handReasonKey('T7o', 'in', 'call.bb-5')).toBe('highAllIn');
  });

  it('każdy powód ma regułę w rules.yaml z poziomem pewności i źródłami', () => {
    const yaml = readFileSync(join(__dirname, '../../../../../../content/pl/rules.yaml'), 'utf8');
    const POZIOM: Record<HandReasonKey, string> = {
      pair: 'rules', high: 'heuristic', suited: 'math', connected: 'math', highAllIn: 'rules', dominated: 'heuristic', overcards: 'math', overcardsPair: 'math',
    };
    for (const [k, id] of Object.entries(HAND_REASON_RULE) as [HandReasonKey, string][]) {
      const blok = yaml.split(/\n- id: /).find((b) => b.startsWith(`${id}\n`));
      expect([k, blok ? 'jest' : 'brak']).toEqual([k, 'jest']);
      expect([k, blok!.match(/\n  level: (\w+)/)?.[1]]).toEqual([k, POZIOM[k]]);
      expect(blok).toMatch(/\n  sources: \[/);
    }
  });
});
