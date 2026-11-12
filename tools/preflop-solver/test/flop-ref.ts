import { strengthUnchecked, type Card } from '@szkola/poker-core';

/**
 * Niezależny solver wzorcowy do testu W1(c) (plan B, B2): skalarny CFR na zbiorach informacyjnych, z jawnym
 * rozdaniem par rąk. Nie korzysta z kodu `src/flop/` (inne drzewo, inna ocena showdownu: porównanie wprost zamiast
 * sortowania z blokerami). Gra: river, OOP czeka albo zakłada `bet`; IP po czekaniu czeka albo zakłada `bet`;
 * wobec zakładu pas albo sprawdzenie; bez przebić i bez rake'u.
 */
export interface RefSpec {
  readonly board: readonly Card[];
  readonly oop: readonly (readonly [Card, Card])[];
  readonly ip: readonly (readonly [Card, Card])[];
  readonly pot: number;
  readonly bet: number;
}

type Hist = '' | 'x' | 'b' | 'xb';

export function solveRef(spec: RefSpec, iterations: number): { valueOop: number; oopBet: number[]; ipCallVsBet: number[] } {
  const str = (h: readonly [Card, Card]) => strengthUnchecked([...spec.board, h[0], h[1]]);
  const so = spec.oop.map(str);
  const si = spec.ip.map(str);
  const deals: [number, number][] = [];
  for (let i = 0; i < spec.oop.length; i++)
    for (let j = 0; j < spec.ip.length; j++) {
      const a = spec.oop[i]!;
      const b = spec.ip[j]!;
      if (a[0] !== b[0] && a[0] !== b[1] && a[1] !== b[0] && a[1] !== b[1]) deals.push([i, j]);
    }
  // zbiory informacyjne: klucz `${gracz}:${historia}:${ręka}`, dwie akcje (0 = pasywna, 1 = agresywna/sprawdzenie)
  const regret = new Map<string, [number, number]>();
  const sum = new Map<string, [number, number]>();
  const sigma = (k: string): [number, number] => {
    const r = regret.get(k) ?? [0, 0];
    const p0 = Math.max(r[0], 0);
    const p1 = Math.max(r[1], 0);
    return p0 + p1 > 0 ? [p0 / (p0 + p1), p1 / (p0 + p1)] : [0.5, 0.5];
  };
  // wynik OOP przy showdownie z wpłatami c0, c1 (pula martwa spec.pot)
  const sd = (i: number, j: number, c0: number, c1: number): number => {
    const t = spec.pot + c0 + c1;
    if (so[i]! < si[j]!) return t - c0;
    if (so[i]! > si[j]!) return -c0;
    return t / 2 - c0;
  };
  const B = spec.bet;
  // zwraca użyteczność OOP; pi0, pi1 = prawdopodobieństwa dojścia
  const walk = (i: number, j: number, h: Hist, pi0: number, pi1: number, upd: 0 | 1): number => {
    if (h === 'x' || h === '') {
      const player = h === '' ? 0 : 1;
      const k = `${player}:${h}:${player === 0 ? i : j}`;
      const s = sigma(k);
      const u = [
        h === '' ? walk(i, j, 'x', pi0 * s[0], pi1, upd) : sd(i, j, 0, 0),
        h === '' ? walk(i, j, 'b', pi0 * s[1], pi1, upd) : walk(i, j, 'xb', pi0, pi1 * s[1], upd),
      ];
      const v = s[0] * u[0]! + s[1] * u[1]!;
      if (player === upd) {
        const sign = player === 0 ? 1 : -1;
        const cf = player === 0 ? pi1 : pi0;
        const r = regret.get(k) ?? [0, 0];
        regret.set(k, [r[0] + cf * sign * (u[0]! - v), r[1] + cf * sign * (u[1]! - v)]);
        const own = player === 0 ? pi0 : pi1;
        const q = sum.get(k) ?? [0, 0];
        sum.set(k, [q[0] + own * s[0], q[1] + own * s[1]]);
      }
      return v;
    }
    // wobec zakładu: 'b' (OOP założył, decyduje IP) albo 'xb' (IP założył, decyduje OOP)
    const player = h === 'b' ? 1 : 0;
    const k = `${player}:${h}:${player === 0 ? i : j}`;
    const s = sigma(k);
    const u =
      h === 'b'
        ? [spec.pot, sd(i, j, B, B)] // pas IP: OOP bierze pulę (bez swojego zakładu), sprawdzenie: showdown
        : [0, sd(i, j, B, B)]; // pas OOP: 0, sprawdzenie: showdown
    const v = s[0] * u[0]! + s[1] * u[1]!;
    if (player === upd) {
      const sign = player === 0 ? 1 : -1;
      const cf = player === 0 ? pi1 : pi0;
      const r = regret.get(k) ?? [0, 0];
      regret.set(k, [r[0] + cf * sign * (u[0]! - v), r[1] + cf * sign * (u[1]! - v)]);
      const own = player === 0 ? pi0 : pi1;
      const q = sum.get(k) ?? [0, 0];
      sum.set(k, [q[0] + own * s[0], q[1] + own * s[1]]);
    }
    return v;
  };
  for (let t = 0; t < iterations; t++) for (const upd of [0, 1] as const) for (const [i, j] of deals) walk(i, j, '', 1, 1, upd);
  const avg = (k: string): [number, number] => {
    const q = sum.get(k) ?? [0, 0];
    return q[0] + q[1] > 0 ? [q[0] / (q[0] + q[1]), q[1] / (q[0] + q[1])] : [0.5, 0.5];
  };
  // wartość gry przy średnich strategiach
  const val = (i: number, j: number, h: Hist): number => {
    if (h === '') { const s = avg(`0::${i}`); return s[0] * val(i, j, 'x') + s[1] * val(i, j, 'b'); }
    if (h === 'x') { const s = avg(`1:x:${j}`); return s[0] * sd(i, j, 0, 0) + s[1] * val(i, j, 'xb'); }
    if (h === 'b') { const s = avg(`1:b:${j}`); return s[0] * spec.pot + s[1] * sd(i, j, B, B); }
    const s = avg(`0:xb:${i}`);
    return s[1] * sd(i, j, B, B);
  };
  let total = 0;
  for (const [i, j] of deals) total += val(i, j, '');
  return {
    valueOop: total / deals.length,
    oopBet: spec.oop.map((_, i) => avg(`0::${i}`)[1]),
    ipCallVsBet: spec.ip.map((_, j) => avg(`1:b:${j}`)[1]),
  };
}
