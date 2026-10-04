import { realizationReport } from '../src/report';
import { loadResult } from './load';
// użycie: tsx scripts/realization.ts WYNIK.json [...]  — realizacja equity w pulach heads-up dla zapisanego wyniku
// (pule 3-betowane wariantu v3 liczone modelem EQR, bo gra po flopie nie jest odtwarzana z pliku)
for (const file of process.argv.slice(2)) {
  const { solver, meta } = loadResult(file);
  console.log(`${file} (eqr ${JSON.stringify(meta.eqr)}${meta.postflop ? ', UWAGA: wynik v3, pule 3-betowane przybliżone EQR' : ''})`);
  console.log(realizationReport(solver));
}
