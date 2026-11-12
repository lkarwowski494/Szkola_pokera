import { parseCard, strengthUnchecked, type Card } from '@szkola/poker-core';
import { COMBO_C1, COMBO_C2, NC } from './combos';
import { DEFAULT_DCFR, type DcfrParams } from '../solver';

/**
 * Solver jednego stołu bez abstrakcji kart (plan B, `docs/solver/plan-b-etapy.md`, etapy B2–B3).
 * Gra dwóch graczy od bieżącej ulicy do rivera; gracz 0 = bez pozycji (OOP), 1 = z pozycją (IP).
 * Zakresy to wektory wag 1326 kombinacji (`combos.ts`). Algorytm: DCFR jak w preflopie (`src/solver.ts:19`, α 1,5, β 0, γ 2),
 * aktualizacje naprzemienne, wektorowo po kombinacjach. Showdown: sortowanie siły rąk z korektą blokerów (O(n) na węzeł).
 * Model gry: D-1333 (`docs/decyzje/FB.md`).
 */

/** Rozmiary pierwszego zakładu na ulicy: w bb albo jako ułamki puli (jedno z dwóch). */
export interface StreetSpec {
  readonly betsBb?: readonly number[];
  readonly betsPot?: readonly number[];
  /** Pierwszy zakład OOP na tej ulicy (lead, na flopie SRP: donk BB), w bb; brak = rozmiary ulicy (D-1335, M3). */
  readonly oopLeadBb?: readonly number[];
  /** Bez przebić na tej ulicy (reguła 12 GB z D-1335: river kandydata, D-1400). */
  readonly noRaise?: boolean;
}

export interface GameSpec {
  /** 3, 4 albo 5 kart stołu. */
  readonly board: readonly Card[];
  /** [OOP, IP], wagi 1326 kombinacji. */
  readonly ranges: readonly [Float64Array, Float64Array];
  /** Pula na początku ulicy (martwe pieniądze). */
  readonly pot: number;
  /** Efektywny stack za stawką. */
  readonly stack: number;
  /** Jeden wpis na każdą ulicę do rivera włącznie (pierwszy = bieżąca ulica). */
  readonly streets: readonly StreetSpec[];
  /** Przebicie do raiseMult × zakład; 0 = bez przebić. Najwyżej jedno przebicie na ulicę (D-1333). */
  readonly raiseMult: number;
  /** Zakład albo przebicie ≥ allinFrac × reszta stacka zamienia się w all-in. */
  readonly allinFrac: number;
  readonly rakeRate: number;
  readonly rakeCap: number;
  /** Czy IP może zagrać po czekaniu OOP (domyślnie tak). */
  readonly ipBetAfterCheck?: boolean;
  /** OOP już czekał na pierwszej ulicy (SRP: BB czeka na flopie; strona pokazuje decyzję otwierającego). */
  readonly oopCheckedFirst?: boolean;
  /** Tylko do testów (B4): ogranicza karty turnu do tej listy (równe prawdopodobieństwa). */
  readonly turnCards?: readonly Card[];
  /** Tylko do testów (B3): ogranicza karty rivera do tej listy (równe prawdopodobieństwa). */
  readonly riverCards?: readonly Card[];
}

export interface SolveStats {
  readonly iterations: number;
  /** Suma zysków najlepszych odpowiedzi obu graczy, w żetonach na rozdanie. */
  readonly nashConv: number;
  /** nashConv ÷ pula początkowa. */
  readonly nashConvPot: number;
}

interface Decision {
  readonly k: 'd';
  readonly p: 0 | 1;
  readonly actions: readonly string[];
  readonly ch: readonly Node[];
  readonly reg: Float64Array;
  readonly sum: Float64Array;
}
interface Terminal {
  readonly k: 't';
  /** Zwycięzca po pasie albo -1 = showdown. */
  readonly winner: -1 | 0 | 1;
  readonly c0: number;
  readonly c1: number;
  readonly board: readonly Card[];
}
interface Chance {
  readonly k: 'c';
  readonly cards: readonly Card[];
  readonly ch: readonly Node[];
  /** Liczba możliwych kart przy znanych rękach obu graczy: 52 − karty stołu − 4. */
  readonly div: number;
}
type Node = Decision | Terminal | Chance;

/** Kombinacje zawierające daną kartę (węzeł losowy zeruje ich zasięg). */
const WITH_CARD: readonly Int32Array[] = Array.from({ length: 52 }, (_, c) => {
  const out: number[] = [];
  for (let i = 0; i < NC; i++) if (COMBO_C1[i] === c || COMBO_C2[i] === c) out.push(i);
  return Int32Array.from(out);
});

const fmt = (x: number): string => String(Math.round(x * 100) / 100);

interface StreetState {
  readonly board: readonly Card[];
  readonly street: number;
  /** Wpłaty od początku gry (nie ulicy). */
  readonly c: readonly [number, number];
  /** Wpłaty na tej ulicy. */
  readonly s: readonly [number, number];
  readonly toAct: 0 | 1;
  /** Historia ulicy: '' (start), 'x' (czekanie OOP), 'b' (zakład), 'r' (przebicie). */
  readonly hist: '' | 'x' | 'b' | 'r';
}

export class FlopGame {
  private readonly root: Node;
  private iteration = 0;
  private readonly dcfr: DcfrParams;
  private readonly strengthCache = new Map<string, Int32Array>();
  /** Kombinacje z dodatnią wagą w zakresie gracza (bez kart stołu); pętle idą tylko po nich. */
  private readonly act: readonly [Int32Array, Int32Array];
  private readonly actAll: Int32Array;

  constructor(
    readonly spec: GameSpec,
    dcfr: DcfrParams = DEFAULT_DCFR,
  ) {
    if (spec.board.length + spec.streets.length !== 6) throw new Error('streets: jeden wpis na każdą ulicę do rivera');
    this.dcfr = dcfr;
    const active = (r: Float64Array): number[] => {
      const out: number[] = [];
      for (let i = 0; i < NC; i++) if (r[i]! > 0 && !spec.board.includes(COMBO_C1[i]!) && !spec.board.includes(COMBO_C2[i]!)) out.push(i);
      return out;
    };
    const a0 = active(spec.ranges[0]);
    const a1 = active(spec.ranges[1]);
    this.act = [Int32Array.from(a0), Int32Array.from(a1)];
    this.actAll = Int32Array.from([...new Set([...a0, ...a1])].sort((x, y) => x - y));
    const start: StreetState = spec.oopCheckedFirst
      ? { board: spec.board, street: 0, c: [0, 0], s: [0, 0], toAct: 1, hist: 'x' }
      : { board: spec.board, street: 0, c: [0, 0], s: [0, 0], toAct: 0, hist: '' };
    this.root = this.build(start);
  }

  // ---------- budowa drzewa ----------

  private remaining(st: StreetState, p: 0 | 1): number {
    return this.spec.stack - st.c[p];
  }

  private sized(st: StreetState, p: 0 | 1, streetTotal: number): number {
    // kwota (suma na ulicy) po zamianie na all-in, gdy przekracza próg
    const rem = this.remaining(st, p) + st.s[p];
    if (streetTotal >= rem || streetTotal - st.s[p] >= this.spec.allinFrac * this.remaining(st, p)) return rem;
    return streetTotal;
  }

  private put(st: StreetState, p: 0 | 1, streetTotal: number, hist: StreetState['hist']): StreetState {
    const add = streetTotal - st.s[p];
    const c: [number, number] = [st.c[0], st.c[1]];
    const s: [number, number] = [st.s[0], st.s[1]];
    c[p] += add;
    s[p] += add;
    return { ...st, c, s, toAct: p === 0 ? 1 : 0, hist };
  }

  private nextStreet(st: StreetState): Node {
    if (st.board.length === 5) return { k: 't', winner: -1, c0: st.c[0], c1: st.c[1], board: st.board };
    const cards: Card[] = [];
    const ch: Node[] = [];
    const allowed = st.board.length === 4 ? this.spec.riverCards : st.board.length === 3 ? this.spec.turnCards : undefined;
    for (let card = 0; card < 52; card++) {
      if (st.board.includes(card) || (allowed && !allowed.includes(card))) continue;
      cards.push(card);
      const board = [...st.board, card];
      const allIn = this.remaining(st, 0) <= 1e-9 || this.remaining(st, 1) <= 1e-9;
      const next: StreetState = { board, street: st.street + 1, c: st.c, s: [0, 0], toAct: 0, hist: '' };
      ch.push(allIn ? this.nextStreet(next) : this.build(next));
    }
    return { k: 'c', cards, ch, div: allowed ? allowed.length : 52 - st.board.length - 4 };
  }

  private dec(p: 0 | 1, items: [string, Node][]): Decision {
    const nA = items.length;
    return { k: 'd', p, actions: items.map((x) => x[0]), ch: items.map((x) => x[1]), reg: new Float64Array(NC * nA), sum: new Float64Array(NC * nA) };
  }

  private bets(st: StreetState, p: 0 | 1): [string, Node][] {
    const sp = this.spec.streets[st.street]!;
    const potNow = this.spec.pot + st.c[0] + st.c[1];
    const lead = p === 0 && st.hist === '' ? sp.oopLeadBb : undefined;
    const raw = lead ? [...lead] : sp.betsBb ? [...sp.betsBb] : (sp.betsPot ?? []).map((f) => f * potNow);
    const seen = new Set<number>();
    const out: [string, Node][] = [];
    for (const b of raw) {
      const amt = this.sized(st, p, b);
      const key = Math.round(amt * 1e6);
      if (amt <= 0 || seen.has(key)) continue;
      seen.add(key);
      out.push([`b${fmt(amt)}`, this.build(this.put(st, p, amt, 'b'))]);
    }
    return out;
  }

  private build(st: StreetState): Node {
    const p = st.toAct;
    const o: 0 | 1 = p === 0 ? 1 : 0;
    if (st.hist === '' || st.hist === 'x') {
      const items: [string, Node][] = [];
      if (st.hist === '') items.push(['x', this.build({ ...st, toAct: 1, hist: 'x' })]);
      else items.push(['x', this.nextStreet(st)]);
      if (st.hist === '' || this.spec.ipBetAfterCheck !== false) items.push(...this.bets(st, p));
      return this.dec(p, items);
    }
    // wobec zakładu albo przebicia
    const items: [string, Node][] = [];
    items.push(['f', { k: 't', winner: o, c0: st.c[0], c1: st.c[1], board: st.board }]);
    const called = this.put(st, p, Math.min(st.s[o], st.s[p] + this.remaining(st, p)), st.hist);
    items.push(['c', this.nextStreet(called)]);
    const facingAllIn = this.remaining(st, o) <= 1e-9;
    if (st.hist === 'b' && this.spec.raiseMult > 0 && this.spec.streets[st.street]!.noRaise !== true && !facingAllIn && this.remaining(st, p) > st.s[o] - st.s[p]) {
      const amt = this.sized(st, p, this.spec.raiseMult * st.s[o]);
      items.push([`r${fmt(amt)}`, this.build(this.put(st, p, amt, 'r'))]);
    }
    return this.dec(p, items);
  }

  // ---------- showdown ----------

  /** Siła ręki każdej kombinacji na pełnym stole (niżej = silniej); -1 = kombinacja z kartą stołu. */
  private strengths(board: readonly Card[]): Int32Array {
    const key = board.join(',');
    let s = this.strengthCache.get(key);
    if (s) return s;
    s = new Int32Array(NC);
    const seven = [...board, 0, 0];
    for (let i = 0; i < NC; i++) {
      const a = COMBO_C1[i]!;
      const b = COMBO_C2[i]!;
      if (board.includes(a) || board.includes(b)) {
        s[i] = -1;
        continue;
      }
      seven[5] = a;
      seven[6] = b;
      s[i] = strengthUnchecked(seven);
    }
    this.strengthCache.set(key, s);
    return s;
  }

  private order(board: readonly Card[]): Int32Array {
    const key = `o${board.join(',')}`;
    const cached = this.orderCache.get(key);
    if (cached) return cached;
    const st = this.strengths(board);
    const idx: number[] = [];
    for (const i of this.actAll) if (st[i]! >= 0) idx.push(i);
    idx.sort((x, y) => st[y]! - st[x]!); // od najsłabszej
    const out = Int32Array.from(idx);
    this.orderCache.set(key, out);
    return out;
  }
  private readonly orderCache = new Map<string, Int32Array>();

  /** Suma wag zgodnych kombinacji rywala dla każdej ręki (bez wspólnych kart). */
  private compatSum(board: readonly Card[], opp: Float64Array, out: Float64Array): void {
    const card = new Float64Array(52);
    let tot = 0;
    for (const i of this.actAll) {
      const r = opp[i]!;
      if (r === 0) continue;
      tot += r;
      { const q = COMBO_C1[i]!; card[q] = card[q]! + r; }
      { const q = COMBO_C2[i]!; card[q] = card[q]! + r; }
    }
    for (const i of this.actAll) {
      const a = COMBO_C1[i]!;
      const b = COMBO_C2[i]!;
      out[i] = board.includes(a) || board.includes(b) ? 0 : tot - card[a]! - card[b]! + opp[i]!;
    }
  }

  private terminal(t: Terminal, p: 0 | 1, opp: Float64Array): Float64Array {
    const out = new Float64Array(NC);
    const T = this.spec.pot + t.c0 + t.c1;
    const net = T - Math.min(T * this.spec.rakeRate, this.spec.rakeCap);
    const own = p === 0 ? t.c0 : t.c1;
    if (t.winner !== -1) {
      const R = new Float64Array(NC);
      this.compatSum(t.board, opp, R);
      const pay = (t.winner === p ? net : 0) - own;
      for (const i of this.actAll) out[i] = pay * R[i]!;
      return out;
    }
    const st = this.strengths(t.board);
    const ord = this.order(t.board);
    const accCard = new Float64Array(52);
    const gCard = new Float64Array(52);
    let acc = 0;
    let k = 0;
    while (k < ord.length) {
      let e = k;
      const sv = st[ord[k]!]!;
      while (e < ord.length && st[ord[e]!]! === sv) e++;
      let g = 0;
      for (let j = k; j < e; j++) {
        const i = ord[j]!;
        const r = opp[i]!;
        g += r;
        { const q = COMBO_C1[i]!; gCard[q] = gCard[q]! + r; }
        { const q = COMBO_C2[i]!; gCard[q] = gCard[q]! + r; }
      }
      for (let j = k; j < e; j++) {
        const i = ord[j]!;
        const a = COMBO_C1[i]!;
        const b = COMBO_C2[i]!;
        const win = acc - accCard[a]! - accCard[b]!;
        const tie = g - gCard[a]! - gCard[b]! + opp[i]!;
        out[i] = net * (win + tie / 2);
      }
      for (let j = k; j < e; j++) {
        const i = ord[j]!;
        const r = opp[i]!;
        acc += r;
        { const q = COMBO_C1[i]!; accCard[q] = accCard[q]! + r; }
        { const q = COMBO_C2[i]!; accCard[q] = accCard[q]! + r; }
        gCard[COMBO_C1[i]!] = 0;
        gCard[COMBO_C2[i]!] = 0;
      }
      k = e;
    }
    if (own !== 0) {
      const R = new Float64Array(NC);
      this.compatSum(t.board, opp, R);
      for (const i of this.actAll) out[i] = out[i]! - own * R[i]!;
    }
    return out;
  }

  // ---------- przejścia ----------

  private sigma(d: Decision, avg: boolean): Float64Array {
    const nA = d.actions.length;
    const src = avg ? d.sum : d.reg;
    const out = new Float64Array(NC * nA);
    for (const h of this.act[d.p]) {
      let tot = 0;
      for (let a = 0; a < nA; a++) {
        const v = src[h * nA + a]!;
        if (v > 0) tot += v;
      }
      for (let a = 0; a < nA; a++) {
        const v = src[h * nA + a]!;
        out[h * nA + a] = tot > 0 ? (v > 0 ? v / tot : 0) : 1 / nA;
      }
    }
    return out;
  }

  /**
   * Wartości kontrfaktyczne gracza p. mode: 'train' (aktualizacja DCFR), 'avg' (średnie strategie obu graczy),
   * 'br' (p gra najlepszą odpowiedź na średnią strategię rywala).
   */
  private walk(n: Node, p: 0 | 1, reach: readonly [Float64Array, Float64Array], mode: 'train' | 'avg' | 'br'): Float64Array {
    if (n.k === 't') return this.terminal(n, p, reach[p === 0 ? 1 : 0]);
    if (n.k === 'c') {
      const out = new Float64Array(NC);
      for (let ci = 0; ci < n.cards.length; ci++) {
        const card = n.cards[ci]!;
        const r0 = Float64Array.from(reach[0]);
        const r1 = Float64Array.from(reach[1]);
        for (const i of WITH_CARD[card]!) { r0[i] = 0; r1[i] = 0; }
        const v = this.walk(n.ch[ci]!, p, [r0, r1], mode);
        for (const i of WITH_CARD[card]!) v[i] = 0;
        for (const i of this.act[p]) out[i] = out[i]! + v[i]!;
      }
      for (const i of this.act[p]) out[i] = out[i]! / n.div;
      return out;
    }
    const nA = n.actions.length;
    const sig = this.sigma(n, mode !== 'train');
    if (n.p !== p) {
      const out = new Float64Array(NC);
      const opp = reach[n.p];
      const actO = this.act[n.p];
      const actP = this.act[p];
      for (let a = 0; a < nA; a++) {
        const r = new Float64Array(NC);
        for (const h of actO) r[h] = opp[h]! * sig[h * nA + a]!;
        const v = this.walk(n.ch[a]!, p, n.p === 0 ? [r, reach[1]] : [reach[0], r], mode);
        for (const h of actP) out[h] = out[h]! + v[h]!;
      }
      return out;
    }
    const own = reach[p];
    const actP = this.act[p];
    const vals: Float64Array[] = [];
    for (let a = 0; a < nA; a++) {
      const r = new Float64Array(NC);
      for (const h of actP) r[h] = own[h]! * sig[h * nA + a]!;
      vals.push(this.walk(n.ch[a]!, p, p === 0 ? [r, reach[1]] : [reach[0], r], mode));
    }
    const out = new Float64Array(NC);
    if (mode === 'br') {
      for (const h of actP) {
        let best = -Infinity;
        for (let a = 0; a < nA; a++) best = Math.max(best, vals[a]![h]!);
        out[h] = best;
      }
      return out;
    }
    for (const h of actP) for (let a = 0; a < nA; a++) out[h] = out[h]! + sig[h * nA + a]! * vals[a]![h]!;
    if (mode !== 'train') return out;
    const t = this.iteration;
    const posW = t ** this.dcfr.alpha / (t ** this.dcfr.alpha + 1);
    const negW = t ** this.dcfr.beta / (t ** this.dcfr.beta + 1);
    const avgW = (t / (t + 1)) ** this.dcfr.gamma;
    for (const h of actP) {
      for (let a = 0; a < nA; a++) {
        const i = h * nA + a;
        const r = n.reg[i]! + (vals[a]![h]! - out[h]!);
        n.reg[i] = r > 0 ? r * posW : r * negW;
        n.sum[i] = n.sum[i]! * avgW + own[h]! * sig[i]!;
      }
    }
    return out;
  }

  /** Wykonuje `iterations` iteracji DCFR. */
  run(iterations: number): void {
    for (let k = 0; k < iterations; k++) {
      this.iteration++;
      for (const p of [0, 1] as const) this.walk(this.root, p, [this.spec.ranges[0], this.spec.ranges[1]], 'train');
    }
  }

  /** Suma wag par rąk bez wspólnych kart (normalizacja wartości na rozdanie). */
  private pairsWeight(): number {
    const R = new Float64Array(NC);
    this.compatSum(this.spec.board, this.spec.ranges[1], R);
    let z = 0;
    for (let i = 0; i < NC; i++) z += this.spec.ranges[0][i]! * R[i]!;
    return z;
  }

  private value(p: 0 | 1, mode: 'avg' | 'br'): number {
    const v = this.walk(this.root, p, [this.spec.ranges[0], this.spec.ranges[1]], mode);
    let s = 0;
    for (let i = 0; i < NC; i++) s += this.spec.ranges[p][i]! * v[i]!;
    return s / this.pairsWeight();
  }

  /** NashConv średniej strategii. */
  stats(): SolveStats {
    let nc = 0;
    for (const p of [0, 1] as const) nc += this.value(p, 'br') - this.value(p, 'avg');
    return { iterations: this.iteration, nashConv: nc, nashConvPot: nc / this.spec.pot };
  }

  /** Średnia strategia w korzeniu: etykiety akcji i częstości [kombinacja × akcja]. */
  rootStrategy(): { player: 0 | 1; actions: string[]; freqs: Float64Array } {
    return this.strategyAt([]);
  }

  /** Średnia strategia w węźle wskazanym ścieżką akcji (np. ['b10'] = odpowiedź na zakład 10). */
  strategyAt(path: readonly string[]): { player: 0 | 1; actions: string[]; freqs: Float64Array } {
    let n: Node = this.root;
    for (const a of path) {
      if (a.startsWith('=') && n.k === 'c') {
        // '=Js' = gałąź węzła losowego z tą kartą
        const ci = n.cards.indexOf(parseCard(a.slice(1)));
        if (ci < 0) throw new Error(`ścieżka ${path.join(',')}: brak karty ${a}`);
        n = n.ch[ci]!;
        continue;
      }
      if (n.k !== 'd') throw new Error(`ścieżka ${path.join(',')}: węzeł nie jest decyzją`);
      const i: number = n.actions.indexOf(a);
      if (i < 0) throw new Error(`ścieżka ${path.join(',')}: brak akcji ${a} (są: ${n.actions.join(',')})`);
      n = n.ch[i]!;
    }
    if (n.k !== 'd') throw new Error(`ścieżka ${path.join(',')}: węzeł nie jest decyzją`);
    return { player: n.p, actions: [...n.actions], freqs: this.sigma(n, true) };
  }

  /** Wartość gry dla OOP przy średnich strategiach (żetony na rozdanie, względem wpłat od początku ulicy). */
  valueOop(): number {
    return this.value(0, 'avg');
  }
}
