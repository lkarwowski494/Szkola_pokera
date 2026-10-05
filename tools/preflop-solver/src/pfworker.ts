import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { parentPort, workerData } from 'node:worker_threads';
import { compatMatrix, type EqrParams, type EquityData } from './model';
import type { PostflopMode } from './postflop';
import { loadBoards, StreetModel, type StreetTreeConfig } from './streets';

/**
 * Wątek roboczy gry po flopie (v3c): ten sam model co w wątku głównym, a tablice żalu i sum strategii każdego
 * końca drzewa to widoki na wspólną pamięć (SharedArrayBuffer). Wątek liczy StreetModel.value dla zleconych końców.
 */
export interface WorkerInit {
  equityFile: string;
  boardsFile: string;
  eqr: EqrParams;
  regretWeight: 'reach' | 'chance';
  terminals: { pot0: number; preInvested: [number, number]; stack: number; cfg: StreetTreeConfig; regrets: SharedArrayBuffer; stratSum: SharedArrayBuffer }[];
}
export interface WorkerJob {
  id: number;
  ti: number;
  role: 0 | 1;
  reachOwn: Float64Array;
  reachOpp: Float64Array;
  mass: number;
  mode: PostflopMode;
  iteration: number;
  dcfr: { alpha: number; beta: number; gamma: number };
  eps: number;
}

const init = workerData as WorkerInit;
const equity = JSON.parse(readFileSync(init.equityFile, 'utf8')) as EquityData;
const buf = readFileSync(init.boardsFile);
const data = loadBoards(buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf, init.boardsFile);
const model = new StreetModel(data, init.eqr, equity.equity, compatMatrix(equity.pairs));
model.regretWeight = init.regretWeight;
for (const t of init.terminals) {
  const ti = model.addTerminal(t.pot0, t.preInvested, t.stack, t.cfg);
  const term = model.terminals[ti]!;
  if (term.regrets.length * 8 !== t.regrets.byteLength) throw new Error('pfworker: niezgodny rozmiar drzewa');
  term.regrets = new Float64Array(t.regrets);
  term.stratSum = new Float64Array(t.stratSum);
}
parentPort!.on('message', (j: WorkerJob) => {
  const out = model.value(j.ti, j.role, j.reachOwn, j.reachOpp, j.mass, j.mode, j.iteration, j.dcfr, j.eps);
  parentPort!.postMessage({ id: j.id, out }, [out.buffer as ArrayBuffer]);
});
parentPort!.postMessage({ ready: true });
