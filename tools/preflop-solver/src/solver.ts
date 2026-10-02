import { compatMatrix, N, PRIOR, rake, shareMatrix, type EqrParams, type EquityData } from './model';
import { N_PLAYERS, type DecisionNode, type Node, type ShowdownTerminal } from './tree';

/**
 * Discounted CFR (Brown i Sandholm 2019) z pełnym przejściem drzewa po 169 klasach rąk.
 * Parametry domyślne α=1,5, β=0, γ=2; aktualizacje naprzemienne (jeden gracz na przejście).
 */
export interface DcfrParams {
  alpha: number;
  beta: number;
  gamma: number;
}
export const DEFAULT_DCFR: DcfrParams = { alpha: 1.5, beta: 0, gamma: 2 };

interface Tables {
  regrets: Float64Array;
  stratSum: Float64Array;
  nA: number;
}

interface ShowdownCache {
  /** Macierze: [OOP: c∘share, IP: c∘(1−shareᵀ)], wspólna macierz zgodności c. */
  wOop: Float64Array;
  wIp: Float64Array;
  /** Pula po odjęciu rake. */
  netPot: number;
}

/** y = M·x dla macierzy N×N zapisanej wierszami. */
function matVec(m: Float64Array, x: Float64Array, out: Float64Array): Float64Array {
  for (let h = 0; h < N; h++) {
    let s = 0;
    const row = h * N;
    for (let v = 0; v < N; v++) s += m[row + v]! * x[v]!;
    out[h] = s;
  }
  return out;
}

function sum(x: Float64Array): number {
  let s = 0;
  for (let i = 0; i < x.length; i++) s += x[i]!;
  return s;
}

export class PreflopSolver {
  readonly nodes: Node[];
  readonly root: Node;
  private tables = new Map<number, Tables>();
  private showdown = new Map<number, ShowdownCache>();
  private compat: Float64Array;
  iteration = 0;

  constructor(
    tree: { root: Node; nodes: Node[] },
    equity: EquityData,
    readonly eqr: EqrParams,
    readonly dcfr: DcfrParams = DEFAULT_DCFR,
  ) {
    this.root = tree.root;
    this.nodes = tree.nodes;
    this.compat = compatMatrix(equity.pairs);
    const shareCache = new Map<string, { oop: Float64Array; ip: Float64Array }>();
    for (const n of this.nodes) {
      if (n.kind === 'decision') {
        const nA = n.actions.length;
        this.tables.set(n.id, { regrets: new Float64Array(N * nA), stratSum: new Float64Array(N * nA), nA });
      } else if (n.kind === 'showdown') {
        const spr = n.remaining <= 0 ? 0 : n.remaining / n.pot;
        const key = spr.toFixed(4);
        let mats = shareCache.get(key);
        if (!mats) {
          const s = shareMatrix(equity.equity, eqr, spr);
          const oop = new Float64Array(N * N);
          const ip = new Float64Array(N * N);
          for (let h = 0; h < N; h++)
            for (let v = 0; v < N; v++) {
              const c = this.compat[h * N + v]!;
              oop[h * N + v] = c * s[h * N + v]!;
              ip[h * N + v] = c * (1 - s[v * N + h]!);
            }
          mats = { oop, ip };
          shareCache.set(key, mats);
        }
        this.showdown.set(n.id, { wOop: mats.oop, wIp: mats.ip, netPot: n.pot - rake(n.pot, eqr) });
      }
    }
  }

  /** Strategia bieżąca (dopasowanie żalu) dla węzła: tablica N×nA. */
  private currentStrategy(t: Tables, out: Float64Array): Float64Array {
    const { regrets, nA } = t;
    for (let h = 0; h < N; h++) {
      let pos = 0;
      for (let a = 0; a < nA; a++) pos += Math.max(regrets[h * nA + a]!, 0);
      for (let a = 0; a < nA; a++) out[h * nA + a] = pos > 0 ? Math.max(regrets[h * nA + a]!, 0) / pos : 1 / nA;
    }
    return out;
  }

  /** Strategia uśredniona (wynik solvera). */
  averageStrategy(nodeId: number): Float64Array {
    const t = this.tables.get(nodeId)!;
    const out = new Float64Array(N * t.nA);
    for (let h = 0; h < N; h++) {
      let s = 0;
      for (let a = 0; a < t.nA; a++) s += t.stratSum[h * t.nA + a]!;
      for (let a = 0; a < t.nA; a++) out[h * t.nA + a] = s > 0 ? t.stratSum[h * t.nA + a]! / s : 1 / t.nA;
    }
    return out;
  }

  private terminalValue(node: Node, p: number, reach: Float64Array[]): Float64Array {
    const out = new Float64Array(N);
    if (node.kind === 'fold') {
      let mass = 1;
      for (let q = 0; q < N_PLAYERS; q++) if (q !== p) mass *= sum(reach[q]!);
      const payoff = (node.winner === p ? node.pot : 0) - node.invested[p]!;
      out.fill(payoff * mass);
      return out;
    }
    const sd = node as ShowdownTerminal;
    const cache = this.showdown.get(sd.id)!;
    if (p !== sd.oop && p !== sd.ip) {
      // gracz już spasował: traci swoją stawkę; waga = prawdopodobieństwo, że obaj pozostali tu dotarli (z blokerami)
      let mass = 1;
      for (let q = 0; q < N_PLAYERS; q++) if (q !== p && q !== sd.oop && q !== sd.ip) mass *= sum(reach[q]!);
      if (mass === 0) return out;
      const ra = reach[sd.oop]!;
      if (sum(ra) === 0 || sum(reach[sd.ip]!) === 0) return out;
      const cb = matVec(this.compat, reach[sd.ip]!, new Float64Array(N));
      let joint = 0;
      for (let h = 0; h < N; h++) joint += ra[h]! * cb[h]!;
      out.fill(-sd.invested[p]! * mass * joint);
      return out;
    }
    const opp = p === sd.oop ? sd.ip : sd.oop;
    let mass = 1;
    for (let q = 0; q < N_PLAYERS; q++) if (q !== p && q !== opp) mass *= sum(reach[q]!);
    if (mass === 0) return out;
    const w = p === sd.oop ? cache.wOop : cache.wIp;
    const share = matVec(w, reach[opp]!, new Float64Array(N));
    const compat = matVec(this.compat, reach[opp]!, new Float64Array(N));
    const inv = sd.invested[p]!;
    for (let h = 0; h < N; h++) out[h] = mass * (cache.netPot * share[h]! - inv * compat[h]!);
    return out;
  }

  /**
   * Przejście drzewa dla gracza p. mode: 'train' (aktualizacja żalu), 'br' (najlepsza odpowiedź na strategie
   * uśrednione), 'avg' (wartość strategii uśrednionych).
   */
  private traverse(node: Node, p: number, reach: Float64Array[], mode: 'train' | 'br' | 'avg'): Float64Array {
    if (node.kind !== 'decision') return this.terminalValue(node, p, reach);
    const dn = node as DecisionNode;
    const t = this.tables.get(dn.id)!;
    const nA = t.nA;
    const q = dn.player;
    const sigma = mode === 'train' ? this.currentStrategy(t, new Float64Array(N * nA)) : this.averageStrategy(dn.id);

    if (q !== p) {
      // przycinanie: gdy któryś z rywali nie może tu dotrzeć, wartość = 0
      const out = new Float64Array(N);
      for (let a = 0; a < nA; a++) {
        const r = new Float64Array(N);
        let any = false;
        for (let h = 0; h < N; h++) {
          r[h] = reach[q]![h]! * sigma[h * nA + a]!;
          if (r[h]! > 0) any = true;
        }
        if (!any) continue;
        const next = reach.slice();
        next[q] = r;
        const v = this.traverse(dn.children[a]!, p, next, mode);
        for (let h = 0; h < N; h++) out[h] = out[h]! + v[h]!;
      }
      return out;
    }

    const values: Float64Array[] = [];
    for (let a = 0; a < nA; a++) {
      const r = new Float64Array(N);
      for (let h = 0; h < N; h++) r[h] = mode === 'br' ? reach[p]![h]! : reach[p]![h]! * sigma[h * nA + a]!;
      const next = reach.slice();
      next[p] = r;
      values.push(this.traverse(dn.children[a]!, p, next, mode));
    }
    const out = new Float64Array(N);
    if (mode === 'br') {
      for (let h = 0; h < N; h++) {
        let best = -Infinity;
        for (let a = 0; a < nA; a++) best = Math.max(best, values[a]![h]!);
        out[h] = best;
      }
      return out;
    }
    for (let h = 0; h < N; h++) for (let a = 0; a < nA; a++) out[h] = out[h]! + sigma[h * nA + a]! * values[a]![h]!;
    if (mode === 'avg') return out;

    // aktualizacja DCFR
    const tt = this.iteration;
    const posW = tt ** this.dcfr.alpha / (tt ** this.dcfr.alpha + 1);
    const negW = tt ** this.dcfr.beta / (tt ** this.dcfr.beta + 1);
    const avgW = (tt / (tt + 1)) ** this.dcfr.gamma;
    const { regrets, stratSum } = t;
    for (let h = 0; h < N; h++) {
      for (let a = 0; a < nA; a++) {
        const i = h * nA + a;
        const r = regrets[i]! + (values[a]![h]! - out[h]!);
        regrets[i] = r > 0 ? r * posW : r * negW;
        stratSum[i] = stratSum[i]! * avgW + reach[p]![h]! * sigma[i]!;
      }
    }
    return out;
  }

  private rootReach(): Float64Array[] {
    return Array.from({ length: N_PLAYERS }, () => Float64Array.from(PRIOR));
  }

  /** Jedna iteracja: kolejno każdy gracz aktualizuje swoje węzły. */
  step(): void {
    this.iteration++;
    for (let p = 0; p < N_PLAYERS; p++) this.traverse(this.root, p, this.rootReach(), 'train');
  }

  /** Wartość oczekiwana gracza (w bb) przy strategiach uśrednionych. */
  value(p: number): number {
    const v = this.traverse(this.root, p, this.rootReach(), 'avg');
    let s = 0;
    for (let h = 0; h < N; h++) s += PRIOR[h]! * v[h]!;
    return s;
  }

  /** Zysk z najlepszej odpowiedzi każdego gracza i ich suma (NashConv), w bb na rozdanie. */
  exploitability(): { perPlayer: number[]; nashConv: number } {
    const perPlayer: number[] = [];
    for (let p = 0; p < N_PLAYERS; p++) {
      const br = this.traverse(this.root, p, this.rootReach(), 'br');
      let s = 0;
      for (let h = 0; h < N; h++) s += PRIOR[h]! * br[h]!;
      perPlayer.push(s - this.value(p));
    }
    return { perPlayer, nashConv: perPlayer.reduce((a, b) => a + b, 0) };
  }
}
