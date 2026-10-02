import { gunzipSync } from 'node:zlib';
import { classOf, combosCount, HAND_CLASSES } from '@szkola/poker-core';
import { N, rake, type EqrParams } from './model';

/**
 * Gra po flopie w pulach 3-betowanych i 4-betowanych (ADR-20, opcja C, wersja 3 solvera).
 *
 * Zamiast mnożnika realizacji equity (EQR) obaj gracze rozgrywają uproszczoną grę:
 * - flop losowany z próbki F flopów (tools/equity/flops.c), ręce zgrupowane w B koszyków na każdym flopie
 *   (abstrakcja kart w stylu OCHS: equity przeciw 8 grupom siły rywala, k-średnie);
 * - po flopie kilka rund licytacji BEZ nowych kart („skrócone” turn i river), jeden rozmiar zakładu na rundę:
 *   geometryczny, tak by przy zakładzie i sprawdzeniu w każdej rundzie stawki weszły do puli w ostatniej rundzie;
 *   przebicie = all-in; na końcu showdown z equity liczonym dokładnie po wszystkich dokończeniach turn + river;
 * - liczba rund zależy od SPR (ROUNDS_FOR_SPR), rake 5% z limitem jak preflop.
 *
 * Gra jest rozwiązywana razem z preflopem tym samym Discounted CFR (wektorowo po koszykach).
 * Przybliżenie koszyków: w obrębie koszyka gęstość kombinacji traktujemy jako jednorodną
 * (wartość ręki = średnia koszyka); jego błąd mierzy test „czekanie do końca” (equity-data.test.ts).
 */

export interface FlopTable {
  cards: [number, number, number];
  /** Koszyk każdej z 1326 kombinacji (255 = zablokowana przez flop). */
  bucket: Uint8Array;
  ehs: Float32Array;
  /** Średnie equity × zgodność i średnia zgodność par koszyków (na parę kombinacji). */
  eAvg: Float64Array;
  dAvg: Float64Array;
  /** Dla każdej klasy: koszyki jej niezablokowanych kombinacji. */
  classBuckets: Uint8Array[];
  /** Liczba kombinacji w każdym koszyku. */
  nBucket: Float64Array;
}

export interface FlopData {
  F: number;
  B: number;
  flops: FlopTable[];
  /** Opis źródła (do meta wyniku). */
  source: string;
}

/** Indeksy kart dla kombinacji 0..1325 (pary a < b leksykograficznie, jak w flops.c). */
export const COMBO_CARDS: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let a = 0; a < 52; a++) for (let b = a + 1; b < 52; b++) out.push([a, b]);
  return out;
})();

const CLASS_INDEX = new Map(HAND_CLASSES.map((hc, i) => [hc, i] as const));
export const COMBO_CLASS: Uint8Array = Uint8Array.from(COMBO_CARDS.map(([a, b]) => CLASS_INDEX.get(classOf(a, b))!));
const CLASS_COMBOS = HAND_CLASSES.map((hc) => combosCount(hc));

export function loadFlops(buf: Buffer, source = 'flops.bin'): FlopData {
  const raw = buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf;
  if (raw.subarray(0, 8).toString('latin1') !== 'SZKPFLP1') throw new Error('flops: nieznany format pliku');
  const F = raw.readUInt32LE(8);
  const B = raw.readUInt32LE(12);
  let off = 16;
  const flops: FlopTable[] = [];
  const f32 = (n: number) => {
    const a = new Float32Array(n);
    for (let i = 0; i < n; i++) a[i] = raw.readFloatLE(off + 4 * i);
    off += 4 * n;
    return a;
  };
  for (let f = 0; f < F; f++) {
    const cards: [number, number, number] = [raw[off]!, raw[off + 1]!, raw[off + 2]!];
    off += 4;
    const bucket = Uint8Array.from(raw.subarray(off, off + 1326));
    off += 1326;
    const ehs = f32(B);
    const E = f32(B * B);
    const D = f32(B * B);
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
    const lists: number[][] = HAND_CLASSES.map(() => []);
    for (let c = 0; c < 1326; c++) if (bucket[c]! !== 255) lists[COMBO_CLASS[c]!]!.push(bucket[c]!);
    flops.push({ cards, bucket, ehs, eAvg, dAvg, classBuckets: lists.map((l) => Uint8Array.from(l)), nBucket: n });
  }
  return { F, B, flops, source };
}

/** Liczba rund licytacji po flopie w zależności od SPR (pule 3-betowane SPR ok. 4–6, 4-betowane ok. 1,4–2,1). */
export function roundsForSpr(spr: number): number {
  return spr >= 3 ? 3 : 2;
}

/** Ułamek puli dla zakładu geometrycznego: po `rounds` rundach zakładu i sprawdzenia stack S trafia do puli P. */
export function geometricFraction(pot: number, stack: number, rounds: number): number {
  return (Math.pow(1 + (2 * stack) / pot, 1 / rounds) - 1) / 2;
}

// ---------- drzewo gry po flopie ----------

type PAction = 'check' | 'bet' | 'fold' | 'call' | 'allin';

export interface PDecision {
  kind: 'decision';
  /** 0 = gracz bez pozycji, 1 = z pozycją. */
  player: 0 | 1;
  actions: PAction[];
  children: PNode[];
  /** Przesunięcie tablic żalu w bloku jednego flopu (w jednostkach akcja × koszyk). */
  offset: number;
}
export interface PLeaf {
  kind: 'fold' | 'showdown';
  /** Kto spasował (dla 'fold'). */
  folder: 0 | 1;
  /** Dodatkowe wkłady po flopie [OOP, IP] i pula końcowa (z pulą preflop). */
  contrib: [number, number];
  pot: number;
}
export type PNode = PDecision | PLeaf;

export interface PTree {
  root: PNode;
  /** Suma liczby akcji po wszystkich węzłach decyzyjnych (rozmiar bloku na koszyk). */
  actionSlots: number;
  decisions: number;
  leaves: number;
}

/**
 * Buduje drzewo: w każdej rundzie OOP czeka albo zakłada; IP odpowiada; zakład geometryczny, przebicie = all-in.
 * Po ostatniej rundzie (albo all-in i sprawdzeniu) showdown.
 */
export function buildPostflopTree(pot0: number, stack: number, rounds: number): PTree {
  let slots = 0;
  let decisions = 0;
  let leaves = 0;
  const dec = (player: 0 | 1, actions: PAction[], mk: (a: PAction) => PNode): PDecision => {
    const d: PDecision = { kind: 'decision', player, actions, children: [], offset: slots };
    slots += actions.length;
    decisions++;
    d.children = actions.map(mk);
    return d;
  };
  const leaf = (kind: 'fold' | 'showdown', folder: 0 | 1, contrib: [number, number]): PLeaf => {
    leaves++;
    return { kind, folder, contrib, pot: pot0 + contrib[0] + contrib[1] };
  };
  const round = (r: number, c: [number, number]): PNode => {
    // c[0] === c[1] na początku rundy
    if (r >= rounds || c[0] >= stack - 1e-9) return leaf('showdown', 0, c);
    const pot = pot0 + c[0] + c[1];
    const left = stack - c[0];
    const g = geometricFraction(pot, left, rounds - r);
    let bet = Math.min(g * pot, left);
    if (left - bet < 1e-6 || r === rounds - 1) bet = left;
    const isAllin = bet >= left - 1e-9;
    const next = (cc: [number, number]) => round(r + 1, cc);
    // odpowiedź na zakład gracza `bettor` (0/1) o wielkości bet
    const facing = (bettor: 0 | 1, cc: [number, number]): PDecision => {
      const caller: 0 | 1 = bettor === 0 ? 1 : 0;
      const acts: PAction[] = isAllin ? ['fold', 'call'] : ['fold', 'call', 'allin'];
      return dec(caller, acts, (a) => {
        if (a === 'fold') return leaf('fold', caller, cc);
        if (a === 'call') {
          const k: [number, number] = [cc[bettor], cc[bettor]];
          return isAllin ? leaf('showdown', 0, k) : next(k);
        }
        // przebicie all-in, odpowiedź zakładającego
        const k: [number, number] = caller === 0 ? [stack, cc[1]] : [cc[0], stack];
        return dec(bettor, ['fold', 'call'], (b) => (b === 'fold' ? leaf('fold', bettor, k) : leaf('showdown', 0, [stack, stack])));
      });
    };
    return dec(0, ['check', 'bet'], (a) => {
      if (a === 'bet') return facing(0, [c[0] + bet, c[1]]);
      return dec(1, ['check', 'bet'], (b) => (b === 'check' ? next(c) : facing(1, [c[0], c[1] + bet])));
    });
  };
  const root = round(0, [0, 0]);
  return { root, actionSlots: slots, decisions, leaves };
}

// ---------- rozwiązywanie ----------

export interface PostflopTerminal {
  tree: PTree;
  /** Wkład preflop każdego z graczy (OOP, IP) i pula preflop. */
  preInvested: [number, number];
  pot0: number;
  regrets: Float64Array;
  stratSum: Float64Array;
}

export type PostflopMode = 'train' | 'br' | 'avg';

/** Stała normalizacji: P(para klas z blokerami) i próbkowanie flopów rozłącznych z czterema kartami. */
const PAIR_NORM = 1326 / 1225;
const FLOP_NORM = 22100 / 17296;

export class PostflopModel {
  readonly terminals: PostflopTerminal[] = [];
  readonly B: number;
  readonly F: number;
  /** Korekta zmiennej kontrolnej (control variate), patrz value(). Wyłączana tylko w testach. */
  controlVariate = true;
  /**
   * Waga aktualizacji żalu koszyka: 'chance' = liczba kombinacji w koszyku (klasyczny CFR na abstrakcji
   * z niepełną pamięcią, waga stała; domyślnie), 'reach' = masa własnych kombinacji według zasięgu preflop
   * (posterior gracza, zmienna między iteracjami). Pomiar 3 października 2026: przy 'reach' wykorzystywalność
   * zatrzymała się na ok. 0,6bb (najlepsza odpowiedź CO po flopie), przy 'chance' 0,08bb już po 100 iteracjach.
   * Wariant 'reach' tylko do pomiarów (zmienna środowiskowa SZKP_REGRET_WEIGHT=reach).
   */
  regretWeight: 'reach' | 'chance' = 'chance';
  /** Macierze wszystkich flopów sklejone: [f·B² + a·B + b]. */
  private readonly eAll: Float64Array;
  private readonly dAll: Float64Array;
  private readonly nAll: Float64Array;

  constructor(
    readonly data: FlopData,
    readonly eqr: EqrParams,
    /** Dokładna macierz equity 169×169 i macierz zgodności klas (z blokerami), jak w modelu preflop. */
    private readonly equity: number[][],
    private readonly compat: Float64Array,
  ) {
    this.B = data.B;
    this.F = data.F;
    const BB = this.B * this.B;
    this.eAll = new Float64Array(this.F * BB);
    this.dAll = new Float64Array(this.F * BB);
    this.nAll = new Float64Array(this.F * this.B);
    data.flops.forEach((fl, f) => {
      this.nAll.set(fl.nBucket, f * this.B);
      this.eAll.set(fl.eAvg, f * BB);
      this.dAll.set(fl.dAvg, f * BB);
    });
  }

  /** Rejestruje pulę (z terminala preflop) i zwraca jej indeks. */
  addTerminal(pot0: number, preInvested: [number, number], stack: number, rounds = roundsForSpr(stack / pot0)): number {
    const tree = buildPostflopTree(pot0, stack, rounds);
    const size = tree.actionSlots * this.B * this.F;
    this.terminals.push({ tree, preInvested, pot0, regrets: new Float64Array(size), stratSum: new Float64Array(size) });
    return this.terminals.length - 1;
  }

  memoryBytes(): number {
    return this.terminals.reduce((s, t) => s + t.regrets.byteLength + t.stratSum.byteLength, 0);
  }

  /**
   * Wartość kontrfaktyczna (na klasę ręki gracza w roli `role`) puli po flopie, sumowana po flopach.
   * reachOwn / reachOpp: zasięgi preflop klas (z PRIOR); mass: iloczyn zasięgów graczy, którzy spasowali.
   * W trybie 'train' aktualizuje żal tylko gracza `role` (aktualizacje naprzemienne).
   *
   * Zmienna kontrolna: wynik = [wartość gry na próbce flopów i koszykach] − [wartość „czekania do showdownu”
   * na tej samej próbce i koszykach] + [dokładna wartość czekania do showdownu z macierzy equity 169×169].
   * Usuwa błąd próbkowania flopów i uśredniania w koszykach z części wynikającej z samego equity;
   * z próbki pochodzi tylko różnica między grą a czekaniem (efekt licytacji po flopie, czyli realizacja equity).
   */
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
    const F = this.F;
    const FB = F * B;
    const out = new Float64Array(N);
    const K = (mass * PAIR_NORM * FLOP_NORM) / F;
    const W = new Float64Array(FB);
    const q = new Float64Array(FB);
    const active = new Uint8Array(F);
    let anyFlop = false;
    for (let f = 0; f < F; f++) {
      const fl = this.data.flops[f]!;
      const o = f * B;
      for (let h = 0; h < N; h++) {
        const ro = reachOpp[h]!;
        const rw = reachOwn[h]!;
        if (ro === 0 && rw === 0) continue;
        const bl = fl.classBuckets[h]!;
        const wo = (K * ro) / CLASS_COMBOS[h]!;
        const ww = rw / CLASS_COMBOS[h]!;
        for (let k = 0; k < bl.length; k++) {
          const b = o + bl[k]!;
          W[b] = W[b]! + wo;
          q[b] = q[b]! + ww;
        }
        if (ro > 0) active[f] = 1;
      }
      if (active[f]) anyFlop = true;
    }
    if (!anyFlop) return out;
    const ctx: Ctx = {
      t,
      role,
      B,
      F,
      mode,
      eps,
      posW: iteration ** dcfr.alpha / (iteration ** dcfr.alpha + 1),
      negW: iteration ** dcfr.beta / (iteration ** dcfr.beta + 1),
      avgW: (iteration / (iteration + 1)) ** dcfr.gamma,
      q,
      active,
      preInv: t.preInvested,
      eqr: this.eqr,
      chance: this.regretWeight === 'chance' ? this.nAll : null,
      eAll: this.eAll,
      dAll: this.dAll,
      slots: t.tree.actionSlots,
      cacheOpp: null,
      cacheD: new Float64Array(FB),
    };
    const v = walk(ctx, t.tree.root, q.slice(), W.slice());
    if (this.controlVariate) {
      // czekanie do showdownu na tej samej próbce: pula preflop, wkład preflop
      const inv = t.preInvested[role];
      const net = t.pot0 - rake(t.pot0, this.eqr);
      const BB = B * B;
      for (let f = 0; f < F; f++) {
        if (!active[f]) continue;
        for (let a = 0; a < B; a++) {
          let e = 0;
          let d = 0;
          const row = f * BB + a * B;
          for (let b = 0; b < B; b++) {
            const w = W[f * B + b]!;
            if (w === 0) continue;
            e += this.eAll[row + b]! * w;
            d += this.dAll[row + b]! * w;
          }
          v[f * B + a] = v[f * B + a]! - (net * e - inv * d);
        }
      }
    }
    for (let f = 0; f < F; f++) {
      if (!active[f]) continue;
      const fl = this.data.flops[f]!;
      for (let h = 0; h < N; h++) {
        const bl = fl.classBuckets[h]!;
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

  /** Średnia strategia w węźle drzewa po flopie (do raportów): [f·B + b] → rozkład akcji. */
  averageAt(ti: number, node: PDecision): Float64Array {
    const t = this.terminals[ti]!;
    const nA = node.actions.length;
    const out = new Float64Array(this.F * this.B * nA);
    for (let f = 0; f < this.F; f++)
      for (let b = 0; b < this.B; b++) {
        const o = (f * t.tree.actionSlots + node.offset) * this.B + b * nA;
        let s = 0;
        for (let a = 0; a < nA; a++) s += t.stratSum[o + a]!;
        for (let a = 0; a < nA; a++) out[(f * this.B + b) * nA + a] = s > 0 ? t.stratSum[o + a]! / s : 1 / nA;
      }
    return out;
  }
}

interface Ctx {
  t: PostflopTerminal;
  role: 0 | 1;
  B: number;
  F: number;
  mode: PostflopMode;
  eps: number;
  posW: number;
  negW: number;
  avgW: number;
  /** Masa własnych kombinacji w koszykach (zasięg preflop), waga aktualizacji żalu: [f·B + b]. */
  q: Float64Array;
  /** Flopy, na których rywal ma niezerowy zasięg. */
  active: Uint8Array;
  preInv: [number, number];
  eqr: EqrParams;
  /** Wagi 'chance' (liczba kombinacji w koszyku) albo null = wagi 'reach' (q). */
  chance: Float64Array | null;
  eAll: Float64Array;
  dAll: Float64Array;
  slots: number;
  /** Pamięć podręczna D·opp dla ostatniego wektora rywala (rodzeństwo liści dzieli ten sam wektor). */
  cacheOpp: Float64Array | null;
  cacheD: Float64Array;
}

/** Indeks tablic żalu: blok flopu, potem węzeł, koszyk, akcja. */
function slot(ctx: Ctx, f: number, node: PDecision, b: number): number {
  return (f * ctx.slots + node.offset) * ctx.B + b * node.actions.length;
}

function strategy(ctx: Ctx, node: PDecision, avg: boolean): Float64Array {
  const nA = node.actions.length;
  const { B, F } = ctx;
  const out = new Float64Array(F * B * nA);
  const src = avg ? ctx.t.stratSum : ctx.t.regrets;
  for (let f = 0; f < F; f++) {
    if (!ctx.active[f]) continue;
    for (let b = 0; b < B; b++) {
      const o = slot(ctx, f, node, b);
      const w = (f * B + b) * nA;
      let s = 0;
      for (let a = 0; a < nA; a++) {
        const x = src[o + a]!;
        s += avg ? x : x > 0 ? x : 0;
      }
      for (let a = 0; a < nA; a++) {
        const x = src[o + a]!;
        out[w + a] = s > 0 ? (avg ? x : x > 0 ? x : 0) / s : 1 / nA;
      }
    }
  }
  return out;
}

function dTimesOpp(ctx: Ctx, opp: Float64Array): Float64Array {
  if (ctx.cacheOpp === opp) return ctx.cacheD;
  const { B, F, dAll } = ctx;
  const BB = B * B;
  const d = ctx.cacheD;
  for (let f = 0; f < F; f++) {
    if (!ctx.active[f]) continue;
    for (let a = 0; a < B; a++) {
      let s = 0;
      const row = f * BB + a * B;
      const ob = f * B;
      for (let b = 0; b < B; b++) {
        const o = opp[ob + b]!;
        if (o !== 0) s += dAll[row + b]! * o;
      }
      d[ob + a] = s;
    }
  }
  ctx.cacheOpp = opp;
  return d;
}

function walk(ctx: Ctx, node: PNode, own: Float64Array, opp: Float64Array): Float64Array {
  const { B, F } = ctx;
  const FB = F * B;
  const out = new Float64Array(FB);
  if (node.kind !== 'decision') {
    const me = ctx.role;
    const inv = ctx.preInv[me]! + node.contrib[me]!;
    const netPot = node.pot - rake(node.pot, ctx.eqr);
    const d = dTimesOpp(ctx, opp);
    if (node.kind === 'fold') {
      const gain = node.folder === me ? -inv : netPot - inv;
      for (let i = 0; i < FB; i++) out[i] = gain * d[i]!;
      return out;
    }
    const BB = B * B;
    const eAll = ctx.eAll;
    for (let f = 0; f < F; f++) {
      if (!ctx.active[f]) continue;
      const ob = f * B;
      for (let a = 0; a < B; a++) {
        let e = 0;
        const row = f * BB + a * B;
        for (let b = 0; b < B; b++) {
          const o = opp[ob + b]!;
          if (o !== 0) e += eAll[row + b]! * o;
        }
        out[ob + a] = netPot * e - inv * d[ob + a]!;
      }
    }
    return out;
  }
  const nA = node.actions.length;
  const train = ctx.mode === 'train';
  const sigma = strategy(ctx, node, !train);
  if (node.player !== ctx.role) {
    const eps = train ? ctx.eps : 0;
    for (let a = 0; a < nA; a++) {
      const r = new Float64Array(FB);
      let any = false;
      for (let i = 0; i < FB; i++) {
        const x = opp[i]! * ((1 - eps) * sigma[i * nA + a]! + eps / nA);
        r[i] = x;
        if (x > 0) any = true;
      }
      if (!any) continue;
      const v = walk(ctx, node.children[a]!, own, r);
      for (let i = 0; i < FB; i++) out[i] = out[i]! + v[i]!;
    }
    return out;
  }
  const vals: Float64Array[] = [];
  for (let a = 0; a < nA; a++) {
    const r = new Float64Array(FB);
    for (let i = 0; i < FB; i++) r[i] = own[i]! * sigma[i * nA + a]!;
    vals.push(walk(ctx, node.children[a]!, r, opp));
  }
  if (ctx.mode === 'br') {
    for (let i = 0; i < FB; i++) {
      let best = -Infinity;
      for (let a = 0; a < nA; a++) best = Math.max(best, vals[a]![i]!);
      out[i] = best;
    }
    return out;
  }
  for (let i = 0; i < FB; i++) for (let a = 0; a < nA; a++) out[i] = out[i]! + sigma[i * nA + a]! * vals[a]![i]!;
  if (!train) return out;
  const { regrets, stratSum } = ctx.t;
  for (let f = 0; f < F; f++) {
    if (!ctx.active[f]) continue;
    for (let b = 0; b < B; b++) {
      const i = f * B + b;
      const o = slot(ctx, f, node, b);
      const w = ctx.chance ? ctx.chance[i]! : ctx.q[i]!;
      for (let a = 0; a < nA; a++) {
        const r = regrets[o + a]! + w * (vals[a]![i]! - out[i]!);
        regrets[o + a] = r > 0 ? r * ctx.posW : r * ctx.negW;
        stratSum[o + a] = stratSum[o + a]! * ctx.avgW + own[i]! * sigma[i * nA + a]!;
      }
    }
  }
  return out;
}
