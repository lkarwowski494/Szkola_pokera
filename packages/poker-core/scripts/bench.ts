/** Pomiar wydajności w Node (porównanie z wynikiem na iPhonie z ekranu diagnostyki, NFR-03). */
import { performance } from 'node:perf_hooks';
import { NFR03, runBenchmark } from '../src/bench';

const r = runBenchmark(() => performance.now());
const ms = (x: number) => x.toFixed(1);
console.log(`Equity MC ${NFR03.iterations} prób (AA vs KK): mediana ${ms(r.equityMedianMs)} ms [${r.equityRunsMs.map(ms).join(', ')}], equity AA ${(r.equityCheck * 100).toFixed(1)}%`);
console.log(`Ocena 7 kart: ${Math.round(r.evalsPerSecond).toLocaleString('pl-PL')}/s`);
console.log(`NFR-03 (< ${NFR03.maxMs} ms): ${r.passesNfr03 ? 'spełnione' : 'NIE spełnione'}`);
