import { gunzipSync } from 'node:zlib';
import { combosCount, HAND_CLASSES } from '@szkola/poker-core';
import { N, rake, type EqrParams } from './model';
import { COMBO_CLASS, geometricFraction, type PostflopMode } from './postflop';

/**
 * Gra po flopie z nowymi kartami (solver v3b): flop, turn i river jako osobne ulice licytacji.
 *
 * Plansze: F losowych flopów, na każdym T turnów, na każdym turnie R riverów (tools/equity/boards.c).
 * Na każdej planszy ręce zgrupowane w B koszyków (OCHS + k-średnie). Gracz na turnie zna tylko koszyk
 * na turnie (abstrakcja z niepełną pamięcią, jak w pracach Johansona i in. 2013), a przejście koszyków
 * między ulicami wynika z tego, do których koszyków trafiają kombinacje po odsłonięciu karty
 * (w obrębie koszyka gęstość kombinacji traktujemy jako jednorodną).
 *
 * Każda ulica: OOP czeka albo zakłada, IP odpowiada; jeden rozmiar zakładu (geometryczny na pozostałe ulice),
 * przebicie = all-in; all-in i sprawdzenie przed riverem → showdown z equity po wszystkich dokończeniach.
 * Wartości próbkowane korygujemy zmienną kontrolną jak w postflop.ts.
 */

export interface StreetBoard {
  /** Nowe karty planszy (flop: 3, turn i river: 1). */
  cards: number[];
  bucket: Uint8Array;
  eAvg: Float64Array;
  dAvg: Float64Array;
  nBucket: Float64Array;
  /** Przejście z koszyka rodzica (flop → turn, turn → river): P(koszyk dziecka | koszyk rodzica) [a·B + a']. */
  trans: Float64Array | null;
  /** Tylko flopy: koszyki kombinacji każdej klasy. */
  classBuckets: Uint8Array[] | null;
}

export interface StreetData {
  kind: 'streets';
  F: number;
  T: number;
  R: number;
  B: number;
  /** Plansze według ulic: [0] flopy (F), [1] turny (F·T, indeks f·T + t), [2] rivery (F·T·R). */
  levels: [StreetBoard[], StreetBoard[], StreetBoard[]];
  source: string;
}

const CLASS_COMBOS = HAND_CLASSES.map((hc) => combosCount(hc));

export function loadBoards(buf: Buffer, source = 'boards.bin'): StreetData {
  const raw = buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf;
  if (raw.subarray(0, 8).toString('latin1') !== 'SZKPPF2\0') throw new Error('boards: nieznany format pliku');
  const F = raw.readUInt32LE(8);
  const T = raw.readUInt32LE(12);
  const R = raw.readUInt32LE(16);
  const B = raw.readUInt32LE(20);
  let off = 24;
  const read = (nNew: number, parent: StreetBoard | null, withClasses: boolean): StreetBoard => {
    const cards = Array.from(raw.subarray(off, off + nNew));
    off += 4;
    const bucket = Uint8Array.from(raw.subarray(off, off + 1326));
    off += 1326;
    const E = new Float64Array(B * B);
    const D = new Float64Array(B * B);
    for (let i = 0; i < B * B; i++) E[i] = raw.readFloatLE(off + 4 * i);
    off += 4 * B * B;
    for (let i = 0; i < B * B; i++) D[i] = raw.readFloatLE(off + 4 * i);
    off += 4 * B * B;
    const n = new Float64Array(B);
    for (let c = 0; c < 1326; c++) if (bucket[c]! !== 255) n[bucket[c]!]!++;
    const eAvg = new Float64Array(B * B);
    const dAvg = new Float64Array(B * B);
    for (let a = 0; a < B; a++)
      for (let b = 0; b < B; b++) {
        const nn = n[a]! * n[b]!;
        if (nn > 0) {
          eAvg[a * B + b] = E[a * B + b]! / nn;
          dAvg[a * B + b] = D[a * B + b]! / nn;
        }
      }
    let trans: Float64Array | null = null;
    if (parent) {
      trans = new Float64Array(B * B);
      for (let c = 0; c < 1326; c++) {
        const a = parent.bucket[c]!;
        const a2 = bucket[c]!;
        if (a === 255 || a2 === 255) continue;
        trans[a * B + a2]!++;
      }
      for (let a = 0; a < B; a++) {
        const na = parent.nBucket[a]!;
        if (na > 0) for (let a2 = 0; a2 < B; a2++) trans[a * B + a2] = trans[a * B + a2]! / na;
      }
    }
    let classBuckets: Uint8Array[] | null = null;
    if (withClasses) {
      const lists: number[][] = HAND_CLASSES.map(() => []);
      for (let c = 0; c < 1326; c++) if (bucket[c]! !== 255) lists[COMBO_CLASS[c]!]!.push(bucket[c]!);
      classBuckets = lists.map((l) => Uint8Array.from(l));
    }
    return { cards, bucket, eAvg, dAvg, nBucket: n, trans, classBuckets };
  };
  const flops: StreetBoard[] = [];
  const turns: StreetBoard[] = [];
  const rivers: StreetBoard[] = [];
  for (let f = 0; f < F; f++) {
    const fl = read(3, null, true);
    flops.push(fl);
    for (let t = 0; t < T; t++) {
      const tb = read(1, fl, false);
      turns.push(tb);
      for (let r = 0; r < R; r++) rivers.push(read(1, tb, false));
    }
  }
  return { kind: 'streets', F, T, R, B, levels: [flops, turns, rivers], source };
}

// ---------- drzewo ----------

type SAction = 'check' | 'bet' | 'fold' | 'call' | 'allin';

export interface SDecision {
  kind: 'decision';
  player: 0 | 1;
  level: number;
  actions: SAction[];
  children: SNode[];
  /** Początek bloku żalu w tablicy terminala. */
  offset: number;
}
export interface SChance {
  kind: 'chance';
  /** Poziom rodzica (0 flop → 1 turn, 1 → 2 river). */
  level: number;
  child: SNode;
}
export interface SLeaf {
  kind: 'fold' | 'showdown';
  level: number;
  folder: 0 | 1;
  contrib: [number, number];
  pot: number;
}
export type SNode = SDecision | SChance | SLeaf;

export interface STree {
  root: SNode;
  size: number;
  decisions: number;
}

/** Drzewo trzech ulic: na każdej OOP czeka albo zakłada, zakład geometryczny na pozostałe ulice, przebicie all-in. */
export function buildStreetTree(pot0: number, stack: number, boardsPerLevel: [number, number, number], B: number): STree {
  let size = 0;
  let decisions = 0;
  const dec = (player: 0 | 1, level: number, actions: SAction[], mk: (a: SAction) => SNode): SDecision => {
    const d: SDecision = { kind: 'decision', player, level, actions, children: [], offset: size };
    size += boardsPerLevel[level]! * B * actions.length;
    decisions++;
    d.children = actions.map(mk);
    return d;
  };
  const leaf = (kind: 'fold' | 'showdown', level: number, folder: 0 | 1, contrib: [number, number]): SLeaf => ({ kind, level, folder, contrib, pot: pot0 + contrib[0] + contrib[1] });
  const street = (level: number, c: [number, number]): SNode => {
    if (c[0] >= stack - 1e-9) return leaf('showdown', level, 0, c);
    const pot = pot0 + c[0] + c[1];
    const left = stack - c[0];
    let bet = level === 2 ? left : Math.min(geometricFraction(pot, left, 3 - level) * pot, left);
    if (left - bet < 1e-6) bet = left;
    const isAllin = bet >= left - 1e-9;
    const next = (cc: [number, number]): SNode => (level === 2 ? leaf('showdown', 2, 0, cc) : { kind: 'chance', level, child: street(level + 1, cc) });
    const facing = (bettor: 0 | 1, cc: [number, number]): SDecision => {
      const caller: 0 | 1 = bettor === 0 ? 1 : 0;
      const acts: SAction[] = isAllin ? ['fold', 'call'] : ['fold', 'call', 'allin'];
      return dec(caller, level, acts, (a) => {
        if (a === 'fold') return leaf('fold', level, caller, cc);
        if (a === 'call') {
          const k: [number, number] = [cc[bettor], cc[bettor]];
          return isAllin ? leaf('showdown', level, 0, k) : next(k);
        }
        const k: [number, number] = caller === 0 ? [stack, cc[1]] : [cc[0], stack];
        return dec(bettor, level, ['fold', 'call'], (b) => (b === 'fold' ? leaf('fold', level, bettor, k) : leaf('showdown', level, 0, [stack, stack])));
      });
    };
    return dec(0, level, ['check', 'bet'], (a) => {
      if (a === 'bet') return facing(0, [c[0] + bet, c[1]]);
      return dec(1, level, ['check', 'bet'], (b) => (b === 'check' ? next(c) : facing(1, [c[0], c[1] + bet])));
    });
  };
  const root = street(0, [0, 0]);
  return { root, size, decisions };
}

// ---------- rozwiązywanie ----------

interface STerminal {
  tree: STree;
  preInvested: [number, number];
  pot0: number;
  regrets: Float64Array;
  stratSum: Float64Array;
}

const PAIR_NORM = 1326 / 1225;
const FLOP_NORM = 22100 / 17296;
/** Turn losowany z 49 kart spoza flopu; dla pary kombinacji dozwolonych jest 45. River: 48 i 44. */
const TURN_NORM = 49 / 45;
const RIVER_NORM = 48 / 44;

export class StreetModel {
  readonly terminals: STerminal[] = [];
  readonly B: number;
  controlVariate = true;
  regretWeight: 'reach' | 'chance' = 'chance';
  private readonly nb: [number, number, number];
  /** Sklejone macierze i przejścia na poziomach. */
  private readonly e: Float64Array[];
  private readonly d: Float64Array[];
  private readonly n: Float64Array[];
  private readonly tr: Float64Array[];

  constructor(
    readonly data: StreetData,
    readonly eqr: EqrParams,
    private readonly equity: number[][],
    private readonly compat: Float64Array,
  ) {
    const B = data.B;
    this.B = B;
    this.nb = [data.F, data.F * data.T, data.F * data.T * data.R];
    const BB = B * B;
    this.e = data.levels.map((l) => {
      const x = new Float64Array(l.length * BB);
      l.forEach((b, i) => x.set(b.eAvg, i * BB));
      return x;
    });
    this.d = data.levels.map((l) => {
      const x = new Float64Array(l.length * BB);
      l.forEach((b, i) => x.set(b.dAvg, i * BB));
      return x;
    });
    this.n = data.levels.map((l) => {
      const x = new Float64Array(l.length * B);
      l.forEach((b, i) => x.set(b.nBucket, i * B));
      return x;
    });
    this.tr = [1, 2].map((lv) => {
      const l = data.levels[lv]!;
      const x = new Float64Array(l.length * BB);
      l.forEach((b, i) => x.set(b.trans!, i * BB));
      return x;
    });
  }

  addTerminal(pot0: number, preInvested: [number, number], stack: number): number {
    const tree = buildStreetTree(pot0, stack, this.nb, this.B);
    this.terminals.push({ tree, preInvested, pot0, regrets: new Float64Array(tree.size), stratSum: new Float64Array(tree.size) });
    return this.terminals.length - 1;
  }

  memoryBytes(): number {
    return this.terminals.reduce((s, t) => s + t.regrets.byteLength + t.stratSum.byteLength, 0);
  }

  /** Rozkład wektora z poziomu lv na lv+1 (dla każdej planszy dziecka): x'[k][a'] = c·Σ_a x[parent(k)][a]·P(a'|a). */
  down(lv: number, x: Float64Array, c: number): Float64Array {
    const B = this.B;
    const BB = B * B;
    const per = lv === 0 ? this.data.T : this.data.R;
    const nChild = this.nb[lv + 1]!;
    const out = new Float64Array(nChild * B);
    const tr = this.tr[lv]!;
    for (let k = 0; k < nChild; k++) {
      const p = Math.floor(k / per);
      const ob = k * B;
      for (let a = 0; a < B; a++) {
        const v = x[p * B + a]!;
        if (v === 0) continue;
        const row = k * BB + a * B;
        for (let a2 = 0; a2 < B; a2++) out[ob + a2] = out[ob + a2]! + c * v * tr[row + a2]!;
      }
    }
    return out;
  }

  /** Złożenie wartości z poziomu lv+1 do lv: v[p][a] = Σ_k∈dzieci(p) Σ_a' P(a'|a)·v'[k][a']. */
  up(lv: number, v: Float64Array): Float64Array {
    const B = this.B;
    const BB = B * B;
    const per = lv === 0 ? this.data.T : this.data.R;
    const out = new Float64Array(this.nb[lv]! * B);
    const tr = this.tr[lv]!;
    const nChild = this.nb[lv + 1]!;
    for (let k = 0; k < nChild; k++) {
      const p = Math.floor(k / per);
      for (let a = 0; a < B; a++) {
        let s = 0;
        const row = k * BB + a * B;
        for (let a2 = 0; a2 < B; a2++) s += tr[row + a2]! * v[k * B + a2]!;
        out[p * B + a] = out[p * B + a]! + s;
      }
    }
    return out;
  }

  oppNorm(lv: number): number {
    return lv === 0 ? TURN_NORM / this.data.T : RIVER_NORM / this.data.R;
  }

  value(
    ti: number,
    role: 0 | 1,
    reachOwn: Float64Array,
    reachOpp: Float64Array,
    mass: number,
    mode: PostflopMode,
    iteration: number,
    dcfr: { alpha: number; beta: number; gamma: number },
    eps: number,
  ): Float64Array {
    const t = this.terminals[ti]!;
    const B = this.B;
    const F = this.data.F;
    const out = new Float64Array(N);
    const K = (mass * PAIR_NORM * FLOP_NORM) / F;
    const W = new Float64Array(F * B);
    const q = new Float64Array(F * B);
    let any = false;
    const flops = this.data.levels[0];
    for (let f = 0; f < F; f++) {
      const cb = flops[f]!.classBuckets!;
      for (let h = 0; h < N; h++) {
        const ro = reachOpp[h]!;
        const rw = reachOwn[h]!;
        if (ro === 0 && rw === 0) continue;
        if (ro > 0) any = true;
        const bl = cb[h]!;
        const wo = (K * ro) / CLASS_COMBOS[h]!;
        const ww = rw / CLASS_COMBOS[h]!;
        for (let k = 0; k < bl.length; k++) {
          const i = f * B + bl[k]!;
          W[i] = W[i]! + wo;
          q[i] = q[i]! + ww;
        }
      }
    }
    if (!any) return out;
    const ctx: SCtx = {
      m: this,
      t,
      role,
      mode,
      eps,
      posW: iteration ** dcfr.alpha / (iteration ** dcfr.alpha + 1),
      negW: iteration ** dcfr.beta / (iteration ** dcfr.beta + 1),
      avgW: (iteration / (iteration + 1)) ** dcfr.gamma,
      cacheOpp: null,
      cacheD: null,
    };
    const v = swalk(ctx, t.tree.root, q, W);
    if (this.controlVariate) {
      const cd = this.checkdown(0, W, t.pot0 - rake(t.pot0, this.eqr), t.preInvested[role]);
      for (let i = 0; i < v.length; i++) v[i] = v[i]! - cd[i]!;
    }
    for (let f = 0; f < F; f++) {
      const cb = flops[f]!.classBuckets!;
      for (let h = 0; h < N; h++) {
        const bl = cb[h]!;
        let s = 0;
        for (let k = 0; k < bl.length; k++) s += v[f * B + bl[k]!]!;
        out[h] = out[h]! + s;
      }
    }
    for (let h = 0; h < N; h++) out[h] = out[h]! / CLASS_COMBOS[h]!;
    if (this.controlVariate) {
      const inv = t.preInvested[role];
      const net = t.pot0 - rake(t.pot0, this.eqr);
      for (let h = 0; h < N; h++) {
        let e = 0;
        let d = 0;
        const row = h * N;
        const eqRow = this.equity[h]!;
        for (let o = 0; o < N; o++) {
          const r = reachOpp[o]!;
          if (r === 0) continue;
          const c = this.compat[row + o]! * r;
          e += c * eqRow[o]!;
          d += c;
        }
        out[h] = out[h]! + mass * (net * e - inv * d);
      }
    }
    return out;
  }

  /** Wartość czekania do showdownu na próbce plansz (do zmiennej kontrolnej), od poziomu lv w dół. */
  checkdown(lv: number, opp: Float64Array, net: number, inv: number): Float64Array {
    if (lv === 2) return this.leafShowdown(2, opp, net, inv);
    const child = this.checkdown(lv + 1, this.down(lv, opp, this.oppNorm(lv)), net, inv);
    return this.up(lv, child);
  }

  leafShowdown(lv: number, opp: Float64Array, net: number, inv: number, dCached: Float64Array | null = null): Float64Array {
    const B = this.B;
    const BB = B * B;
    const nb = this.nb[lv]!;
    const e = this.e[lv]!;
    const d = this.d[lv]!;
    const out = new Float64Array(nb * B);
    for (let k = 0; k < nb; k++) {
      const ob = k * B;
      for (let a = 0; a < B; a++) {
        let se = 0;
        let sd = 0;
        const row = k * BB + a * B;
        for (let b = 0; b < B; b++) {
          const o = opp[ob + b]!;
          if (o === 0) continue;
          se += e[row + b]! * o;
          if (!dCached) sd += d[row + b]! * o;
        }
        out[ob + a] = net * se - inv * (dCached ? dCached[ob + a]! : sd);
      }
    }
    return out;
  }

  dTimes(lv: number, opp: Float64Array): Float64Array {
    const B = this.B;
    const BB = B * B;
    const nb = this.nb[lv]!;
    const d = this.d[lv]!;
    const out = new Float64Array(nb * B);
    for (let k = 0; k < nb; k++) {
      const ob = k * B;
      for (let a = 0; a < B; a++) {
        let s = 0;
        const row = k * BB + a * B;
        for (let b = 0; b < B; b++) {
          const o = opp[ob + b]!;
          if (o !== 0) s += d[row + b]! * o;
        }
        out[ob + a] = s;
      }
    }
    return out;
  }

  levelSize(lv: number): number {
    return this.nb[lv]! * this.B;
  }

  bucketCounts(lv: number): Float64Array {
    return this.n[lv]!;
  }
}

interface SCtx {
  m: StreetModel;
  t: STerminal;
  role: 0 | 1;
  mode: PostflopMode;
  eps: number;
  posW: number;
  negW: number;
  avgW: number;
  cacheOpp: Float64Array | null;
  cacheD: Float64Array | null;
}

function sstrategy(ctx: SCtx, node: SDecision, avg: boolean, size: number): Float64Array {
  const nA = node.actions.length;
  const out = new Float64Array(size * nA);
  const src = avg ? ctx.t.stratSum : ctx.t.regrets;
  for (let i = 0; i < size; i++) {
    const o = node.offset + i * nA;
    let s = 0;
    for (let a = 0; a < nA; a++) {
      const x = src[o + a]!;
      s += avg ? x : x > 0 ? x : 0;
    }
    for (let a = 0; a < nA; a++) {
      const x = src[o + a]!;
      out[i * nA + a] = s > 0 ? (avg ? x : x > 0 ? x : 0) / s : 1 / nA;
    }
  }
  return out;
}

function swalk(ctx: SCtx, node: SNode, own: Float64Array, opp: Float64Array): Float64Array {
  const m = ctx.m;
  if (node.kind === 'chance') {
    const lv = node.level;
    const v = swalk(ctx, node.child, m.down(lv, own, 1), m.down(lv, opp, m.oppNorm(lv)));
    return m.up(lv, v);
  }
  const lv = node.level;
  const size = m.levelSize(lv);
  if (node.kind !== 'decision') {
    const me = ctx.role;
    const inv = ctx.t.preInvested[me]! + node.contrib[me]!;
    const netPot = node.pot - rake(node.pot, m.eqr);
    let d: Float64Array;
    if (ctx.cacheOpp === opp && ctx.cacheD) d = ctx.cacheD;
    else {
      d = m.dTimes(lv, opp);
      ctx.cacheOpp = opp;
      ctx.cacheD = d;
    }
    if (node.kind === 'fold') {
      const gain = node.folder === me ? -inv : netPot - inv;
      const out = new Float64Array(size);
      for (let i = 0; i < size; i++) out[i] = gain * d[i]!;
      return out;
    }
    return m.leafShowdown(lv, opp, netPot, inv, d);
  }
  const nA = node.actions.length;
  const train = ctx.mode === 'train';
  const sigma = sstrategy(ctx, node, !train, size);
  const out = new Float64Array(size);
  if (node.player !== ctx.role) {
    const eps = train ? ctx.eps : 0;
    for (let a = 0; a < nA; a++) {
      const r = new Float64Array(size);
      let any = false;
      for (let i = 0; i < size; i++) {
        const x = opp[i]! * ((1 - eps) * sigma[i * nA + a]! + eps / nA);
        r[i] = x;
        if (x > 0) any = true;
      }
      if (!any) continue;
      const v = swalk(ctx, node.children[a]!, own, r);
      for (let i = 0; i < size; i++) out[i] = out[i]! + v[i]!;
    }
    return out;
  }
  const vals: Float64Array[] = [];
  for (let a = 0; a < nA; a++) {
    const r = new Float64Array(size);
    for (let i = 0; i < size; i++) r[i] = own[i]! * sigma[i * nA + a]!;
    vals.push(swalk(ctx, node.children[a]!, r, opp));
  }
  if (ctx.mode === 'br') {
    for (let i = 0; i < size; i++) {
      let best = -Infinity;
      for (let a = 0; a < nA; a++) best = Math.max(best, vals[a]![i]!);
      out[i] = best;
    }
    return out;
  }
  for (let i = 0; i < size; i++) for (let a = 0; a < nA; a++) out[i] = out[i]! + sigma[i * nA + a]! * vals[a]![i]!;
  if (!train) return out;
  const { regrets, stratSum } = ctx.t;
  const wts = ctx.m.regretWeight === 'chance' ? m.bucketCounts(lv) : own;
  for (let i = 0; i < size; i++) {
    const o = node.offset + i * nA;
    const w = wts[i]!;
    for (let a = 0; a < nA; a++) {
      const r = regrets[o + a]! + w * (vals[a]![i]! - out[i]!);
      regrets[o + a] = r > 0 ? r * ctx.posW : r * ctx.negW;
      stratSum[o + a] = stratSum[o + a]! * ctx.avgW + own[i]! * sigma[i * nA + a]!;
    }
  }
  return out;
}
