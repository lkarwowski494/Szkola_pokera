import { closeSync, existsSync, openSync, readSync, renameSync, writeSync } from 'node:fs';
import { compatMatrix, N, PRIOR, rake, shareMatrix, type EqrParams, type EquityData } from './model';
import { PostflopModel, type FlopData } from './postflop';
import { StreetModel, V3B_TREE, type StreetData, type StreetTreeConfig } from './streets';
import type { PostflopPool } from './pfpool';
import type { PostflopMode } from './postflop';
import { threeWayJoint, threeWayShareTables, threeWayValue, type ThreeWayData } from './threeway';
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

/**
 * Eksploracja (drżąca ręka): w przejściu treningowym rywale grają (1−ε)·σ + ε·jednostajnie, ε = EXPLORE/√t.
 * Bez tego węzły, do których rywal przestał docierać (np. odpowiedź UTG na 3-bet), zamierają ze strategią
 * z pierwszych iteracji, a gracz ocenia swoje akcje wobec tej przestarzałej strategii.
 */
export const EXPLORE = 0.1;
/** Po tej liczbie iteracji eksploracja jest wyłączana: zasięgi znów są rzadkie (szybsze pętle 3-way), a gra zbiega do równowagi modelu bez zaburzeń. */
export const EXPLORE_ITERATIONS = 150;

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
  /** Liczba graczy przy stole (z drzewa; 6 albo 9). */
  readonly nPlayers: number;
  private tables = new Map<number, Tables>();
  private showdown = new Map<number, ShowdownCache>();
  private compat: Float64Array;
  private equityM: number[][];
  private threeWayTables = new Map<string, [Float32Array, Float32Array, Float32Array]>();
  iteration = 0;
  exploration = EXPLORE;
  /**
   * Do której iteracji działa eksploracja. Wariant v3c (raport 10): Infinity, bo po wyłączeniu eksploracji węzeł,
   * do którego rywal przestał docierać (np. odpowiedź BTN na 3-bet SB), zamarza ze strategią z początku obliczeń.
   */
  exploreIterations = EXPLORE_ITERATIONS;
  /** Diagnostyka: false = w najlepszej odpowiedzi gra po flopie zostaje na strategii uśrednionej (wykorzystywalność samego preflopu). */
  postflopBestResponse = true;
  /** Gra po flopie (wersja 3): terminal preflop → indeks puli w modelu. */
  readonly postflop: PostflopModel | StreetModel | null;
  private postflopIndex = new Map<number, number>();
  /**
   * Wariant pomiarowy (B-045, nie kanon): węzeł → wymuszona częstość pasa. Gracz pasuje dokładnie taką częścią
   * swojego zasięgu w węźle, zaczynając od klas z najmniejszą przewagą kontynuacji nad pasem (skumulowany żal);
   * podział reszty między sprawdzenie i podbicie zostaje swobodny.
   */
  readonly foldLocks = new Map<number, number>();
  /**
   * Równoległa gra po flopie (v3c, pfpool.ts): przejście „collect” zbiera zlecenia dla końców z grą po flopie
   * i nie zmienia żalu, potem wątki liczą wartości, a przejście „replay” powtarza to samo przejście z wynikami.
   */
  private phase: 'normal' | 'collect' | 'replay' = 'normal';
  private pfJobs: { node: number; ti: number; role: 0 | 1; reachOwn: Float64Array; reachOpp: Float64Array; mass: number; mode: PostflopMode; eps: number }[] = [];
  private pfResults = new Map<number, Float64Array>();

  constructor(
    tree: { root: Node; nodes: Node[]; players?: number },
    equity: EquityData,
    readonly eqr: EqrParams,
    readonly dcfr: DcfrParams = DEFAULT_DCFR,
    private readonly threeWay: ThreeWayData | null = null,
    flops: FlopData | StreetData | null = null,
    /** Minimalna liczba podbić, od której pula heads-up jest rozgrywana grą po flopie (2 = pule 3-betowane i wyżej). */
    postflopMinRaises = 2,
    /** Maksymalna liczba podbić dla gry po flopie (wyżej: model EQR). */
    postflopMaxRaises = 99,
    /** Drzewo gry po flopie (v3c) w zależności od SPR puli; domyślnie drzewo v3b. */
    postflopTree: (spr: number) => StreetTreeConfig = () => V3B_TREE,
  ) {
    this.root = tree.root;
    this.nodes = tree.nodes;
    this.nPlayers = tree.players ?? N_PLAYERS;
    this.postflop = !flops
      ? null
      : 'kind' in flops && flops.kind === 'streets'
        ? new StreetModel(flops, eqr, equity.equity, compatMatrix(equity.pairs))
        : new PostflopModel(flops as FlopData, eqr, equity.equity, compatMatrix(equity.pairs));
    if (this.postflop && process.env.SZKP_REGRET_WEIGHT === 'reach') this.postflop.regretWeight = 'reach';
    this.compat = compatMatrix(equity.pairs);
    this.equityM = equity.equity;
    const shareCache = new Map<string, { oop: Float64Array; ip: Float64Array }>();
    for (const n of this.nodes) {
      if (n.kind === 'decision') {
        const nA = n.actions.length;
        this.tables.set(n.id, { regrets: new Float64Array(N * nA), stratSum: new Float64Array(N * nA), nA });
      } else if (n.kind === 'showdown') {
        const spr = n.remaining <= 0 ? 0 : n.remaining / n.pot;
        const aggOop = n.aggressor === n.oop;
        const raises = (n.path.match(/:(raise|allin)/g) ?? []).length;
        if (this.postflop && raises >= postflopMinRaises && raises <= postflopMaxRaises && n.remaining > 0) {
          const pm = this.postflop;
          const pre: [number, number] = [n.invested[n.oop]!, n.invested[n.ip]!];
          this.postflopIndex.set(n.id, pm instanceof StreetModel ? pm.addTerminal(n.pot, pre, n.remaining, postflopTree(spr)) : pm.addTerminal(n.pot, pre, n.remaining));
        }
        const role3 = eqr.role3 ?? eqr.role ?? 0;
        const role = raises >= 3 ? (eqr.role4 ?? role3) : raises === 2 ? role3 : (eqr.role ?? 0);
        const key = `${spr.toFixed(4)}|${aggOop}|${role}`;
        let mats = shareCache.get(key);
        if (!mats) {
          const s = shareMatrix(equity.equity, { ...eqr, role }, spr, aggOop, equity.implied);
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
      } else if (n.kind === 'showdown3') {
        if (!this.threeWay) throw new Error('Drzewo zawiera pule trzyosobowe, a nie wczytano tablicy equity3');
        const spr = n.remaining <= 0 ? 0 : n.remaining / n.pot;
        const aggRole = n.players.indexOf(n.aggressor);
        const key = `${Math.min(spr, Math.max(eqr.sprFull ?? 8, eqr.sprPlay ?? 0)).toFixed(4)}|${aggRole}`;
        if (!this.threeWayTables.has(key)) this.threeWayTables.set(key, threeWayShareTables(this.threeWay, eqr, spr, aggRole, equity.implied));
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

  /** Strategia z blokadą częstości pasa (foldLocks) dla zasięgu `reach` gracza w węźle; akcja 0 to pas. */
  private lockedStrategy(t: Tables, target: number, reach: Float64Array, out: Float64Array): Float64Array {
    const { regrets, nA } = t;
    this.currentStrategy(t, out);
    const adv = new Float64Array(N);
    for (let h = 0; h < N; h++) {
      let best = -Infinity;
      for (let a = 1; a < nA; a++) best = Math.max(best, regrets[h * nA + a]!);
      adv[h] = best - regrets[h * nA]!;
    }
    const order = Array.from({ length: N }, (_, h) => h).sort((x, y) => adv[x]! - adv[y]!);
    let left = target * sum(reach);
    for (const h of order) {
      const r = reach[h]!;
      const f = r <= 0 ? 0 : Math.min(1, Math.max(0, left / r));
      if (r > 0) left -= f * r;
      // kontynuacja: podział z dopasowania żalu bez pasa; gdy nic nie ma dodatniego żalu, po równo
      let pos = 0;
      for (let a = 1; a < nA; a++) pos += Math.max(regrets[h * nA + a]!, 0);
      out[h * nA] = f;
      for (let a = 1; a < nA; a++) out[h * nA + a] = (1 - f) * (pos > 0 ? Math.max(regrets[h * nA + a]!, 0) / pos : 1 / (nA - 1));
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

  private terminalValue(node: Node, p: number, reach: Float64Array[], mode: 'train' | 'br' | 'avg' = 'avg'): Float64Array {
    const out = new Float64Array(N);
    if (node.kind === 'external') return out;
    if (node.kind === 'fold') {
      let mass = 1;
      for (let q = 0; q < this.nPlayers; q++) if (q !== p) mass *= sum(reach[q]!);
      const payoff = (node.winner === p ? node.pot : 0) - node.invested[p]!;
      out.fill(payoff * mass);
      return out;
    }
    if (node.kind === 'showdown3') {
      const d = this.threeWay!;
      const role = node.players.indexOf(p);
      let mass = 1;
      for (let q = 0; q < this.nPlayers; q++) if (!node.players.includes(q) && q !== p) mass *= sum(reach[q]!);
      if (mass === 0) return out;
      if (role < 0) {
        const joint = threeWayJoint(d, node.players.map((q) => reach[q]!) as [Float64Array, Float64Array, Float64Array]);
        out.fill(-node.invested[p]! * mass * joint);
        return out;
      }
      const others = node.players.filter((q) => q !== p).map((q) => reach[q]!) as [Float64Array, Float64Array];
      const spr = node.remaining <= 0 ? 0 : node.remaining / node.pot;
      const tables = this.threeWayTables.get(`${Math.min(spr, Math.max(this.eqr.sprFull ?? 8, this.eqr.sprPlay ?? 0)).toFixed(4)}|${node.players.indexOf(node.aggressor)}`)!;
      threeWayValue(d, tables[role]!, others, node.pot - rake(node.pot, this.eqr), node.invested[p]!, out);
      for (let h = 0; h < N; h++) out[h] = out[h]! * mass;
      return out;
    }
    const sd = node as ShowdownTerminal;
    const cache = this.showdown.get(sd.id)!;
    if (p !== sd.oop && p !== sd.ip) {
      // gracz już spasował: traci swoją stawkę; waga = prawdopodobieństwo, że obaj pozostali tu dotarli (z blokerami)
      let mass = 1;
      for (let q = 0; q < this.nPlayers; q++) if (q !== p && q !== sd.oop && q !== sd.ip) mass *= sum(reach[q]!);
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
    for (let q = 0; q < this.nPlayers; q++) if (q !== p && q !== opp) mass *= sum(reach[q]!);
    if (mass === 0) return out;
    const pi = this.postflopIndex.get(sd.id);
    if (pi !== undefined) {
      const eps = mode === 'train' && this.iteration <= this.exploreIterations ? this.exploration / Math.sqrt(this.iteration) : 0;
      const pm = mode === 'br' && !this.postflopBestResponse ? 'avg' : mode;
      const role: 0 | 1 = p === sd.oop ? 0 : 1;
      if (this.phase === 'collect') {
        this.pfJobs.push({ node: sd.id, ti: pi, role, reachOwn: reach[p]!, reachOpp: reach[opp]!, mass, mode: pm, eps });
        return out;
      }
      if (this.phase === 'replay') {
        const r = this.pfResults.get(sd.id);
        if (r) return r;
      }
      return this.postflop!.value(pi, role, reach[p]!, reach[opp]!, mass, pm, Math.max(this.iteration, 1), this.dcfr, eps);
    }
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
    if (node.kind !== 'decision') return this.terminalValue(node, p, reach, mode);
    const dn = node as DecisionNode;
    const t = this.tables.get(dn.id)!;
    const nA = t.nA;
    const q = dn.player;
    const lock = this.foldLocks.get(dn.id);
    const sigma =
      mode !== 'train'
        ? this.averageStrategy(dn.id)
        : lock !== undefined
          ? this.lockedStrategy(t, lock, reach[q]!, new Float64Array(N * nA))
          : this.currentStrategy(t, new Float64Array(N * nA));

    if (q !== p) {
      // przycinanie: gdy któryś z rywali nie może tu dotrzeć, wartość = 0
      const out = new Float64Array(N);
      const eps = mode === 'train' && this.iteration <= this.exploreIterations ? this.exploration / Math.sqrt(this.iteration) : 0;
      for (let a = 0; a < nA; a++) {
        const r = new Float64Array(N);
        let any = false;
        for (let h = 0; h < N; h++) {
          r[h] = reach[q]![h]! * ((1 - eps) * sigma[h * nA + a]! + eps / nA);
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
      // w węźle z blokadą najlepsza odpowiedź gra strategią zablokowaną (wykorzystywalność tylko poza blokadą)
      for (let h = 0; h < N; h++) r[h] = mode === 'br' && lock === undefined ? reach[p]![h]! : reach[p]![h]! * sigma[h * nA + a]!;
      const next = reach.slice();
      next[p] = r;
      values.push(this.traverse(dn.children[a]!, p, next, mode));
    }
    const out = new Float64Array(N);
    if (mode === 'br' && lock === undefined) {
      for (let h = 0; h < N; h++) {
        let best = -Infinity;
        for (let a = 0; a < nA; a++) best = Math.max(best, values[a]![h]!);
        out[h] = best;
      }
      return out;
    }
    for (let h = 0; h < N; h++) for (let a = 0; a < nA; a++) out[h] = out[h]! + sigma[h * nA + a]! * values[a]![h]!;
    if (mode !== 'train' || this.phase === 'collect') return out;

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
    return Array.from({ length: this.nPlayers }, () => Float64Array.from(PRIOR));
  }

  /** Jedna iteracja: kolejno każdy gracz aktualizuje swoje węzły. */
  /** Wszystkie tablice stanu w stałej kolejności (punkt kontrolny: zapis i wznowienie obliczeń). */
  private stateArrays(): Float64Array[] {
    const out: Float64Array[] = [];
    for (const n of this.nodes) {
      if (n.kind !== 'decision') continue;
      const t = this.tables.get(n.id)!;
      out.push(t.regrets, t.stratSum);
    }
    if (this.postflop) for (const t of this.postflop.terminals) out.push(t.regrets, t.stratSum);
    return out;
  }

  /** Zapisuje stan (iteracja + tablice żalu i sum strategii) atomowo: plik tymczasowy, potem zmiana nazwy. */
  saveState(path: string, fingerprint: string): void {
    const arrays = this.stateArrays();
    const header = Buffer.from(JSON.stringify({ iteration: this.iteration, fingerprint, sizes: arrays.map((a) => a.length) }), 'utf8');
    const len = Buffer.alloc(4);
    len.writeUInt32LE(header.length);
    const fd = openSync(`${path}.tmp`, 'w');
    writeSync(fd, len);
    writeSync(fd, header);
    for (const a of arrays) writeSync(fd, new Uint8Array(a.buffer, a.byteOffset, a.byteLength));
    closeSync(fd);
    renameSync(`${path}.tmp`, path);
  }

  /** Wczytuje stan zapisany przez saveState; zwraca false, gdy plik nie istnieje albo nie pasuje do konfiguracji. */
  loadState(path: string, fingerprint: string): boolean {
    if (!existsSync(path)) return false;
    // odczyt kawałkami prosto do tablic: punkt kontrolny 9-max ma ok. 4,6 GB, a readFileSync czyta najwyżej 2 GB
    const fd = openSync(path, 'r');
    try {
      const read = (dst: Uint8Array, pos: number) => {
        for (let done = 0; done < dst.length; ) {
          const n = readSync(fd, dst, done, Math.min(dst.length - done, 1 << 28), pos + done);
          if (n <= 0) throw new Error(`Punkt kontrolny ${path} jest ucięty`);
          done += n;
        }
      };
      const len = Buffer.alloc(4);
      read(len, 0);
      const hl = len.readUInt32LE(0);
      const hb = Buffer.alloc(hl);
      read(hb, 4);
      const header = JSON.parse(hb.toString('utf8')) as { iteration: number; fingerprint: string; sizes: number[] };
      const arrays = this.stateArrays();
      if (header.fingerprint !== fingerprint || header.sizes.length !== arrays.length || header.sizes.some((n, i) => n !== arrays[i]!.length)) return false;
      let off = 4 + hl;
      for (const a of arrays) {
        read(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), off);
        off += a.byteLength;
      }
      this.iteration = header.iteration;
      return true;
    } finally {
      closeSync(fd);
    }
  }

  step(): void {
    this.iteration++;
    for (let p = 0; p < this.nPlayers; p++) this.traverse(this.root, p, this.rootReach(), 'train');
  }

  /** Przejście dla gracza p z grą po flopie liczoną w puli wątków (wynik identyczny z wersją synchroniczną). */
  private async traverseParallel(pool: PostflopPool, p: number, mode: 'train' | 'br' | 'avg'): Promise<Float64Array> {
    this.phase = 'collect';
    this.pfJobs = [];
    try {
      this.traverse(this.root, p, this.rootReach(), mode);
      const jobs = this.pfJobs;
      const it = Math.max(this.iteration, 1);
      const res = await pool.run(
        jobs.map((j) => ({ ti: j.ti, role: j.role, reachOwn: j.reachOwn, reachOpp: j.reachOpp, mass: j.mass, mode: j.mode, iteration: it, dcfr: this.dcfr, eps: j.eps })),
        (ti) => this.postflop!.terminals[ti]!.regrets.length,
      );
      this.pfResults = new Map(jobs.map((j, i) => [j.node, res[i]!]));
      this.phase = 'replay';
      return this.traverse(this.root, p, this.rootReach(), mode);
    } finally {
      this.phase = 'normal';
      this.pfResults = new Map();
      this.pfJobs = [];
    }
  }

  async stepParallel(pool: PostflopPool): Promise<void> {
    this.iteration++;
    for (let p = 0; p < this.nPlayers; p++) await this.traverseParallel(pool, p, 'train');
  }

  async valueParallel(pool: PostflopPool, p: number): Promise<number> {
    const v = await this.traverseParallel(pool, p, 'avg');
    let s = 0;
    for (let h = 0; h < N; h++) s += PRIOR[h]! * v[h]!;
    return s;
  }

  async exploitabilityParallel(pool: PostflopPool): Promise<{ perPlayer: number[]; nashConv: number }> {
    const perPlayer: number[] = [];
    for (let p = 0; p < this.nPlayers; p++) {
      const br = await this.traverseParallel(pool, p, 'br');
      let s = 0;
      for (let h = 0; h < N; h++) s += PRIOR[h]! * br[h]!;
      perPlayer.push(s - (await this.valueParallel(pool, p)));
    }
    return { perPlayer, nashConv: perPlayer.reduce((a, b) => a + b, 0) };
  }

  /**
   * Diagnostyka realizacji equity w puli heads-up (terminal `showdown`) przy strategiach uśrednionych:
   * udział w puli netto, który gracz faktycznie zdobywa, wobec udziału wynikającego z samego equity.
   */
  realization(nodeId: number, reach: Float64Array[]): { player: number; equityShare: number; realizedShare: number; eqr: number }[] {
    const sd = this.nodes[nodeId] as ShowdownTerminal;
    const net = sd.pot - rake(sd.pot, this.eqr);
    let mass = 1;
    for (let q = 0; q < this.nPlayers; q++) if (q !== sd.oop && q !== sd.ip) mass *= sum(reach[q]!);
    return [sd.oop, sd.ip].map((p) => {
      const o = p === sd.oop ? sd.ip : sd.oop;
      const v = this.terminalValue(sd, p, reach, 'avg');
      let ev = 0;
      let cd = 0;
      let joint = 0;
      for (let h = 0; h < N; h++) {
        const rp = reach[p]![h]!;
        if (rp === 0) continue;
        ev += rp * v[h]!;
        for (let x = 0; x < N; x++) {
          const c = rp * reach[o]![x]! * this.compat[h * N + x]! * mass;
          joint += c;
          cd += c * this.equityM[h]![x]!;
        }
      }
      const inv = sd.invested[p]!;
      const equityShare = cd / joint;
      const realizedShare = (ev / joint + inv) / net;
      return { player: p, equityShare, realizedShare, eqr: realizedShare / equityShare };
    });
  }

  /**
   * Diagnostyka (B-045): wartość każdej akcji w węźle dla gracza, który w nim decyduje, przy strategiach uśrednionych,
   * w bb na rękę. `reach` = zasięgi wszystkich graczy w węźle (report.playerReach). Normalizacja przez iloczyn mas
   * zasięgów rywali bez usuwania kart (jak przy terminalach pasa), więc w pulach do showdownu wartość jest przybliżona
   * o efekt blokerów; różnica między akcjami tej samej klasy ma poprawny znak.
   * Dalsze decyzje gracza: najlepsza odpowiedź (raport 10, naprawa EQR). Strategia uśredniona ręki, która nigdy nie
   * dociera do węzła (np. 76s po 4-becie, gdy nie 3-betuje), jest jednostajna, więc tryb 'avg' zaniżał wartość blefów.
   */
  actionValues(node: DecisionNode, reach: Float64Array[]): Float64Array[] {
    const p = node.player;
    let mass = 1;
    for (let q = 0; q < this.nPlayers; q++) if (q !== p) mass *= sum(reach[q]!);
    // gra po flopie (v3) zostaje na strategii uśrednionej: najlepsza odpowiedź tylko w decyzjach preflop
    const keep = this.postflopBestResponse;
    this.postflopBestResponse = false;
    try {
      return node.children.map((c) => this.traverse(c, p, reach, 'br').map((x) => x / mass));
    } finally {
      this.postflopBestResponse = keep;
    }
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
    for (let p = 0; p < this.nPlayers; p++) {
      const br = this.traverse(this.root, p, this.rootReach(), 'br');
      let s = 0;
      for (let h = 0; h < N; h++) s += PRIOR[h]! * br[h]!;
      perPlayer.push(s - this.value(p));
    }
    return { perPlayer, nashConv: perPlayer.reduce((a, b) => a + b, 0) };
  }
}
