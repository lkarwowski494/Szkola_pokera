import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import type { GameSpec } from './game';

/** Wynik solvera C (`native/flop.c`) dla jednego stołu. */
export interface NativeResult {
  readonly iterations: number;
  readonly nashConv: number;
  readonly nashConvPot: number;
  readonly valueOop: number;
  readonly seconds: number;
  readonly decisionNodes: number;
  readonly tableMB: number;
  readonly root: { readonly player: 0 | 1; readonly actions: readonly string[]; readonly freqs: readonly number[] };
}

export interface NativeOpts {
  /** Liczba wątków OpenMP (0 = wszystkie). */
  readonly threads?: number;
  /** Co ile iteracji liczyć NashConv (i drukować postęp na stderr, gdy `progress`). */
  readonly reportEvery?: number;
  /** Stop, gdy NashConv ÷ pula < próg (wymaga reportEvery). */
  readonly targetNashConvPot?: number;
  readonly progress?: boolean;
  /** Typ regretów w C: float (domyślnie, mniej pamięci) albo double (testy różnicowe z TS, który liczy w float64). */
  readonly real?: 'float' | 'double';
}

const SOURCE = resolve(import.meta.dirname, '../../native/flop.c');

/** Ścieżka skompilowanego solvera; kompiluje przy pierwszym użyciu (nazwa z sumą źródła, więc zmiana kodu = nowa binarka). */
export function nativeBinary(real: 'float' | 'double' = 'float'): string {
  const src = readFileSync(SOURCE);
  const tag = createHash('sha256').update(src).digest('hex').slice(0, 12);
  const dir = join(tmpdir(), 'szkola-flop');
  const bin = join(dir, `flop-${tag}-${real}`);
  if (!existsSync(bin)) {
    mkdirSync(dir, { recursive: true });
    const tmp = `${bin}.${process.pid}`;
    execFileSync('gcc', ['-O3', '-fopenmp', `-DREAL=${real}`, SOURCE, '-o', tmp, '-lm'], { stdio: 'inherit' });
    execFileSync('mv', [tmp, bin]);
  }
  return bin;
}

function num(o: object, k: string): number {
  const v: unknown = k in o ? Reflect.get(o, k) : undefined;
  if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`solver C: pole ${k} nie jest liczbą (${String(v)})`);
  return v;
}

/** Sprawdza wynik solvera C przy wejściu do TS (dane z pliku = unknown). */
export function parseNativeResult(raw: unknown): NativeResult {
  if (typeof raw !== 'object' || raw === null) throw new Error('solver C: wynik nie jest obiektem');
  if (!('root' in raw) || typeof raw.root !== 'object' || raw.root === null) throw new Error('solver C: brak root');
  const root = raw.root;
  if (!('actions' in root) || !Array.isArray(root.actions) || !root.actions.every((a): a is string => typeof a === 'string')) throw new Error('solver C: root.actions');
  if (!('freqs' in root) || !Array.isArray(root.freqs) || !root.freqs.every((a): a is number => typeof a === 'number')) throw new Error('solver C: root.freqs');
  const player = num(root, 'player');
  if (player !== 0 && player !== 1) throw new Error('solver C: root.player');
  return {
    iterations: num(raw, 'iterations'),
    nashConv: num(raw, 'nashConv'),
    nashConvPot: num(raw, 'nashConvPot'),
    valueOop: num(raw, 'valueOop'),
    seconds: num(raw, 'seconds'),
    decisionNodes: num(raw, 'decisionNodes'),
    tableMB: num(raw, 'tableMB'),
    root: { player, actions: root.actions, freqs: root.freqs },
  };
}

/** Wejście solvera C: ta sama specyfikacja co `GameSpec` (karty jako liczby poker-core). */
export function nativeInput(spec: GameSpec, iterations: number, opts: NativeOpts = {}): string {
  return JSON.stringify({
    board: spec.board,
    ranges: [Array.from(spec.ranges[0]), Array.from(spec.ranges[1])],
    pot: spec.pot,
    stack: spec.stack,
    streets: spec.streets,
    raiseMult: spec.raiseMult,
    allinFrac: spec.allinFrac,
    rakeRate: spec.rakeRate,
    rakeCap: spec.rakeCap,
    ipBetAfterCheck: spec.ipBetAfterCheck !== false,
    oopCheckedFirst: spec.oopCheckedFirst === true,
    ...(spec.turnCards ? { turnCards: spec.turnCards } : {}),
    ...(spec.riverCards ? { riverCards: spec.riverCards } : {}),
    iterations,
    threads: opts.threads ?? 0,
    reportEvery: opts.reportEvery ?? 0,
    targetNashConvPot: opts.targetNashConvPot ?? 0,
  });
}

/** Uruchamia solver C na specyfikacji z `game.ts` (etap B4). */
export function solveNative(spec: GameSpec, iterations: number, opts: NativeOpts = {}): NativeResult {
  const bin = nativeBinary(opts.real);
  const dir = mkdtempSync(join(tmpdir(), 'szkola-flop-run-'));
  try {
    const inp = join(dir, 'in.json');
    const out = join(dir, 'out.json');
    writeFileSync(inp, nativeInput(spec, iterations, opts));
    execFileSync(bin, [inp, out], { stdio: ['ignore', 'ignore', opts.progress ? 'inherit' : 'ignore'], maxBuffer: 1 << 26 });
    const raw: unknown = JSON.parse(readFileSync(out, 'utf8'));
    return parseNativeResult(raw);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
