import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mergeNine, type ResultFile } from '../src/merge9';
// użycie: tsx scripts/merge-9max.ts WYNIK_9MAX.json [WYJŚCIE=content/ranges/preflop-9max-100bb.json]
// Łączy wynik solvera 9-max (--players 9, bez poddrzewa po pasach UTG–UTG+2) z kanonem 6-max (dokument 10, „9-max 100bb”).

const root = resolve(import.meta.dirname, '../../..');
const [nineArg, outArg] = process.argv.slice(2);
const sixFile = 'content/ranges/preflop-6max-100bb.json';
const nine = JSON.parse(readFileSync(resolve(nineArg!), 'utf8')) as ResultFile;
const six = JSON.parse(readFileSync(resolve(root, sixFile), 'utf8')) as ResultFile;
const merged = mergeNine(nine, six, sixFile);
const out = resolve(root, outArg ?? 'content/ranges/preflop-9max-100bb.json');
writeFileSync(out, JSON.stringify(merged, null, 0));
console.log(`Zapisano ${out}: ${nine.spots.length} węzłów 9-max + ${six.spots.length} węzłów 6-max`);
