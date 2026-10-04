/**
 * Walidacja zakresów push/fold trzyosobowych (M11) z opublikowanym wynikiem równowagi: Ganzfried i Sandholm,
 * „Computing an Approximate Jam/Fold Equilibrium for 3-player No-Limit Texas Hold'em Tournaments”, AAMAS 2008,
 * tabele 11–16 („single hand strategy with equal stacks”: stacki 4500, blindy 300/600, czyli 7,5bb, gra o żetony).
 *
 * Tabel z artykułu nie trzymamy w repozytorium (cudzy wynik). Przygotowanie:
 *   curl -sSLo gs08.pdf "https://www.cs.cmu.edu/~sandholm/3-player%20jam-fold.AAMAS08.pdf"
 *   pdftotext -f 8 -l 8 -layout gs08.pdf gs08-p8.txt
 *   pnpm --filter @szkola/preflop-solver exec tsx scripts/pushfold3-validate.ts /ścieżka/gs08-p8.txt
 *
 * Wypisuje częstości w każdym węźle (nasz solver / artykuł) i listę klas „niepewnych”: takich, w których zbiór
 * poprawnych odpowiedzi w zadaniu rangeDecision (akcja najczęstsza; w rękach mieszanych także każda grana w co najmniej
 * 25%, progi jak w apps/mobile/src/features/drills/thresholds.ts) różni się między naszym wynikiem a artykułem.
 */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { HAND_CLASSES } from '@szkola/poker-core';
import { PRIOR } from '../src/model';

const MIXED_LOW = 0.25;
const MIXED_HIGH = 0.75;
const R = 'AKQJT98765432';
/** Tabela artykułu → ścieżka węzła w naszym drzewie (src/pushfold3.ts). */
const TABLES: Record<number, string> = {
  11: '',
  12: 'BTN:allin',
  13: 'BTN:fold',
  14: 'BTN:allin,SB:fold',
  15: 'BTN:fold,SB:allin',
  16: 'BTN:allin,SB:call',
};

function parseTables(text: string): Map<number, Record<string, number>> {
  const out = new Map<number, Record<string, number>>();
  let current: number[] = [];
  for (const line of text.split('\n')) {
    const nums = [...line.matchAll(/Table (\d+)/g)].map((m) => Number(m[1]));
    if (nums.length) {
      current = nums;
      continue;
    }
    const t = line.trim().split(/\s+/);
    // wiersz: etykieta + 13 wartości dla tabeli turniejowej i to samo dla tabeli „single hand”
    if (current.length !== 2 || t.length !== 28 || !R.includes(t[0]!) || !R.includes(t[14]!)) continue;
    current.forEach((table, half) => {
      const row = t[14 * half]!;
      const ri = R.indexOf(row);
      const rec = out.get(table) ?? {};
      t.slice(1 + 14 * half, 14 + 14 * half).forEach((v, ci) => {
        const col = R[ci]!;
        // nad przekątną ręce w kolorze, pod nią w różnych kolorach
        const hc = ri === ci ? row + row : ci > ri ? `${row}${col}s` : `${col}${row}o`;
        rec[hc] = v === 'P' ? 1 : v === 'F' ? 0 : Number(v) / 100;
      });
      out.set(table, rec);
    });
  }
  return out;
}

const correct = (f: number): Set<'play' | 'fold'> => {
  const best = Math.max(f, 1 - f);
  const ok = new Set<'play' | 'fold'>();
  for (const [a, x] of [['play', f], ['fold', 1 - f]] as const) if (x === best || (best < MIXED_HIGH && x >= MIXED_LOW)) ok.add(a);
  return ok;
};

const paper = parseTables(readFileSync(process.argv[2]!, 'utf8'));
const ROOT = resolve(import.meta.dirname, '../../..');
const ours = JSON.parse(readFileSync(join(ROOT, 'content/ranges/pushfold.json'), 'utf8')) as {
  spots: { path: string; actions: string[]; strategy: Record<string, number>[] }[];
};
for (const [table, path] of Object.entries(TABLES)) {
  const ref = paper.get(Number(table));
  const node = ours.spots.find((s) => s.path === `3max-7.5bb|${path}`);
  if (!ref || Object.keys(ref).length !== 169 || !node) throw new Error(`brak tabeli ${table} albo węzła "${path}"`);
  const play = node.strategy[node.actions.length - 1]!;
  let fo = 0;
  let fp = 0;
  const uncertain: string[] = [];
  HAND_CLASSES.forEach((hc, h) => {
    fo += PRIOR[h]! * play[hc]!;
    fp += PRIOR[h]! * ref[hc]!;
    const a = correct(play[hc]!);
    const b = correct(ref[hc]!);
    if (a.size !== b.size || [...a].some((x) => !b.has(x))) uncertain.push(`${hc} (${play[hc]!.toFixed(2)} / ${ref[hc]!.toFixed(2)})`);
  });
  console.log(`tabela ${table}, węzeł "${path || 'korzeń'}": nasz ${(fo * 100).toFixed(1)}%, artykuł ${(fp * 100).toFixed(1)}%; niepewne (${uncertain.length}): ${uncertain.join(', ')}`);
}
