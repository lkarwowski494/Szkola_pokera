import { Worker } from 'node:worker_threads';
import type { EqrParams } from './model';
import type { StreetModel } from './streets';
import type { WorkerJob } from './pfworker';

/**
 * Pula wątków gry po flopie (v3c). Zlecenia z jednego przejścia CFR są od siebie niezależne (każdy koniec drzewa
 * pojawia się w przejściu najwyżej raz), więc liczą się równolegle; kolejka od największych drzew.
 */
export class PostflopPool {
  private workers: Worker[] = [];
  private ready: Promise<void>;

  constructor(model: StreetModel, files: { equityFile: string; boardsFile: string }, eqr: EqrParams, threads: number) {
    const terminals = model.terminals.map((t, i) => {
      // tablice końców drzewa przenosimy do pamięci współdzielonej (wątek główny i robocze widzą te same dane)
      const r = new SharedArrayBuffer(t.regrets.byteLength);
      const s = new SharedArrayBuffer(t.stratSum.byteLength);
      new Float64Array(r).set(t.regrets);
      new Float64Array(s).set(t.stratSum);
      t.regrets = new Float64Array(r);
      t.stratSum = new Float64Array(s);
      return { pot0: t.pot0, preInvested: t.preInvested, stack: model.stacks[i]!, cfg: model.configs[i]!, regrets: r, stratSum: s };
    });
    const init = { ...files, eqr, regretWeight: model.regretWeight, terminals };
    const readies: Promise<void>[] = [];
    for (let k = 0; k < threads; k++) {
      const w = new Worker(new URL('./pfboot.mjs', import.meta.url), { workerData: init });
      readies.push(
        new Promise((res, rej) => {
          const on = (m: { ready?: boolean }) => {
            if (m.ready) {
              w.off('message', on);
              res();
            }
          };
          w.on('message', on);
          w.once('error', rej);
        }),
      );
      this.workers.push(w);
    }
    this.ready = Promise.all(readies).then(() => undefined);
  }

  /** Liczy wszystkie zlecenia, zwraca wyniki w kolejności zleceń. */
  async run(jobs: Omit<WorkerJob, 'id'>[], cost: (ti: number) => number): Promise<Float64Array[]> {
    await this.ready;
    const out: Float64Array[] = new Array(jobs.length);
    const order = jobs.map((_, i) => i).sort((a, b) => cost(jobs[b]!.ti) - cost(jobs[a]!.ti));
    let next = 0;
    await Promise.all(
      this.workers.map(
        (w) =>
          new Promise<void>((res, rej) => {
            const send = () => {
              if (next >= order.length) {
                w.off('message', on);
                w.off('error', rej);
                res();
                return;
              }
              const id = order[next++]!;
              w.postMessage({ ...jobs[id]!, id });
            };
            const on = (m: { id: number; out: Float64Array }) => {
              out[m.id] = m.out;
              send();
            };
            w.on('message', on);
            w.once('error', rej);
            send();
          }),
      ),
    );
    return out;
  }

  async close(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.terminate()));
  }
}
