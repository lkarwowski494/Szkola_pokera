import { gunzipSync } from 'node:zlib';
import { combosCount, classCombos, HAND_CLASSES } from '@szkola/poker-core';
import { impliedTerm, N, playabilityWeight, type EqrParams, type ImpliedData } from './model';

/**
 * Dane pul trzyosobowych (wersja 2 drzewa): gęste tablice 169³.
 * eq[x·N² + y·N + z] = equity ręki x przeciw y i z (symetryczne względem y, z);
 * compat[...] = waga trójki z blokerami, znormalizowana tak, że Σ PRIOR³·compat = 1.
 */
export interface ThreeWayData {
  eq: Float32Array;
  compat: Float32Array;
  samples: number;
}

const N2 = N * N;

/** Wczytuje tablicę z equity3.c (format SZKP3EQ1, opcjonalnie gzip). */
export function loadThreeWay(buf: Buffer): ThreeWayData {
  const raw = buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf;
  if (raw.subarray(0, 8).toString('latin1') !== 'SZKP3EQ1') throw new Error('equity3: nieznany format pliku');
  const ntri = raw.readUInt32LE(8);
  const samples = raw.readUInt32LE(12);
  const expected = (N * (N + 1) * (N + 2)) / 6;
  if (ntri !== expected) throw new Error(`equity3: ${ntri} trójek, oczekiwano ${expected}`);
  const eq = new Float32Array(N * N2);
  let t = 0;
  for (let i = 0; i < N; i++)
    for (let j = i; j < N; j++)
      for (let k = j; k < N; k++) {
        const off = 16 + 6 * t;
        const ei = raw.readUInt16LE(off) / 65535;
        const ej = raw.readUInt16LE(off + 2) / 65535;
        const ek = raw.readUInt16LE(off + 4) / 65535;
        eq[i * N2 + j * N + k] = ei;
        eq[i * N2 + k * N + j] = ei;
        eq[j * N2 + i * N + k] = ej;
        eq[j * N2 + k * N + i] = ej;
        eq[k * N2 + i * N + j] = ek;
        eq[k * N2 + j * N + i] = ek;
        t++;
      }
  return { eq, compat: threeWayCompat(), samples };
}

/** Liczba rozłącznych trójek kombinacji dla każdej trójki klas, znormalizowana (dokładnie, bez losowania). */
export function threeWayCompat(): Float32Array {
  const combos = HAND_CLASSES.map((hc) => classCombos(hc).map(([a, b]) => [a < 32 ? 1 << a : 0, a >= 32 ? 1 << (a - 32) : 0, b < 32 ? 1 << b : 0, b >= 32 ? 1 << (b - 32) : 0]));
  const masks = combos.map((list) => list.map(([a0, a1, b0, b1]) => [a0! | b0!, a1! | b1!] as [number, number]));
  const out = new Float32Array(N * N2);
  const norm = (1326 * 1326) / (1225 * 1128);
  for (let i = 0; i < N; i++)
    for (let j = i; j < N; j++) {
      // pary (i, j) rozłączne, z maską zajętych kart
      const pairs: [number, number][] = [];
      for (const [x0, x1] of masks[i]!) for (const [y0, y1] of masks[j]!) if ((x0 & y0) === 0 && (x1 & y1) === 0) pairs.push([x0 | y0, x1 | y1]);
      for (let k = j; k < N; k++) {
        let n = 0;
        for (const [p0, p1] of pairs) for (const [z0, z1] of masks[k]!) if ((p0 & z0) === 0 && (p1 & z1) === 0) n++;
        const v = (n / (combosCount(HAND_CLASSES[i]!) * combosCount(HAND_CLASSES[j]!) * combosCount(HAND_CLASSES[k]!))) * norm;
        for (const [a, b, c] of [
          [i, j, k],
          [i, k, j],
          [j, i, k],
          [j, k, i],
          [k, i, j],
          [k, j, i],
        ] as const)
          out[a * N2 + b * N + c] = v;
      }
    }
  return out;
}

/** Indeksy klas z niezerowym zasięgiem (do pomijania pustych części pętli). */
function nonZero(r: Float64Array): number[] {
  const out: number[] = [];
  for (let i = 0; i < N; i++) if (r[i]! > 0) out.push(i);
  return out;
}

/**
 * Tablice wag udziału w puli dla trzech ról przy danym SPR (liczone raz, potem wielokrotnie używane).
 * W[r][h·N² + a·N + b] = compat · udział gracza w roli r z ręką h, gdzie a, b to ręce dwóch pozostałych
 * graczy w kolejności ról (np. dla roli 1: a = bez pozycji, b = z pozycją).
 * Udział: uogólnienie modelu dwuosobowego, e·waga ręki·czynnik pozycji, znormalizowane do 1.
 */
export function threeWayShareTables(d: ThreeWayData, eqr: EqrParams, spr: number, aggressorRole = -1, implied?: ImpliedData): [Float32Array, Float32Array, Float32Array] {
  const full = eqr.sprFull ?? 8;
  const f = Math.min(spr, full) / full;
  const r = (eqr.role ?? 0) * f;
  const pos = [1 - eqr.m * f, 1, 1 + eqr.m * f].map((x, i) => (aggressorRole < 0 ? x : x * (i === aggressorRole ? 1 + r : 1 - r)));
  const fp = Math.min(spr, eqr.sprPlay ?? full) / (eqr.sprPlay ?? full);
  const w = HAND_CLASSES.map((hc) => 1 + eqr.k * (playabilityWeight(hc, eqr.weights) - 1) * fp);
  const out: [Float32Array, Float32Array, Float32Array] = [new Float32Array(N * N2), new Float32Array(N * N2), new Float32Array(N * N2)];
  // x = ręka bez pozycji, y = środek, z = z pozycją
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++)
      for (let z = 0; z < N; z++) {
        const c = d.compat[x * N2 + y * N + z]!;
        if (c === 0) continue;
        const sx = d.eq[x * N2 + y * N + z]! * w[x]! * pos[0]!;
        const sy = d.eq[y * N2 + x * N + z]! * w[y]! * pos[1]!;
        const sz = d.eq[z * N2 + x * N + y]! * w[z]! * pos[2]!;
        const tot = sx + sy + sz;
        // człon implied odds (wariant io): suma par dwuosobowych, antysymetryczna, więc udziały nadal sumują się do 1
        const ix = impliedTerm(eqr, implied, spr, x, y) + impliedTerm(eqr, implied, spr, x, z);
        const iy = impliedTerm(eqr, implied, spr, y, x) + impliedTerm(eqr, implied, spr, y, z);
        const iz = impliedTerm(eqr, implied, spr, z, x) + impliedTerm(eqr, implied, spr, z, y);
        out[0][x * N2 + y * N + z] = c * (sx / tot + ix);
        out[1][y * N2 + x * N + z] = c * (sy / tot + iy);
        out[2][z * N2 + x * N + y] = c * (sz / tot + iz);
      }
  return out;
}

/**
 * Wartość kontrfaktyczna gracza w roli r (0 = bez pozycji, 1 = środek, 2 = z pozycją):
 * Σ_a Σ_b r_a·r_b·(pula netto·W_r[h,a,b] − wkład·compat[h,a,b]).
 */
export function threeWayValue(
  d: ThreeWayData,
  w: Float32Array,
  reachOthers: [Float64Array, Float64Array],
  netPot: number,
  invested: number,
  out: Float64Array,
): void {
  const [ra, rb] = reachOthers;
  const na = nonZero(ra);
  const nb = nonZero(rb);
  for (let h = 0; h < N; h++) {
    let acc = 0;
    for (const a of na) {
      const base = h * N2 + a * N;
      let sw = 0;
      let sc = 0;
      for (const b of nb) {
        const rv = rb[b]!;
        sw += rv * w[base + b]!;
        sc += rv * d.compat[base + b]!;
      }
      acc += ra[a]! * (netPot * sw - invested * sc);
    }
    out[h] = acc;
  }
}

/** Łączne prawdopodobieństwo, że trzej gracze dotarli do końca z danymi zasięgami (z blokerami). */
export function threeWayJoint(d: ThreeWayData, r: [Float64Array, Float64Array, Float64Array]): number {
  const [x, y, z] = r;
  const nx = nonZero(x);
  const ny = nonZero(y);
  const nz = nonZero(z);
  let s = 0;
  for (const a of nx)
    for (const b of ny) {
      const base = a * N2 + b * N;
      const pab = x[a]! * y[b]!;
      for (const c of nz) s += pab * z[c]! * d.compat[base + c]!;
    }
  return s;
}
