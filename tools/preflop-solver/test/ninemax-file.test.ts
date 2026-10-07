import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import type { ResultFile } from '../src/merge9';
import { buildTree, DEFAULT_TREE, positionsFor } from '../src/tree';

// Plik 9-max (dokument 10, „Pomiar N9a”): wynik solvera dla poddrzew otwarć UTG–UTG+2 + kanon 6-max pod pasami UTG–UTG+2.
// W aplikacji 9-max jest ukryty (plik nie jest czytany przez content-build ani aplikację) do decyzji właściciela o scaleniu.
const file = resolve(import.meta.dirname, '../../../content/ranges/preflop-9max-100bb.json');

describe.skipIf(!existsSync(file))('plik preflop-9max-100bb.json', () => {
  const d = JSON.parse(readFileSync(file, 'utf8')) as ResultFile;
  it('ma każdy węzeł decyzyjny pełnego drzewa 9-max, z tym samym graczem i akcjami, a strategie sumują się do 1', () => {
    const tree = buildTree({ ...DEFAULT_TREE, players: 9 });
    const pos = positionsFor(9);
    const byPath = new Map(d.spots.map((s) => [s.path, s]));
    const decisions = tree.nodes.filter((n) => n.kind === 'decision');
    expect(d.spots.length).toBe(decisions.length);
    for (const n of decisions) {
      if (n.kind !== 'decision') continue;
      const s = byPath.get(n.path);
      expect(s, n.path).toBeDefined();
      expect(s!.player).toBe(pos[n.player]);
      expect(s!.actions).toEqual(n.actions.map((a) => a.label));
      for (const hc of HAND_CLASSES) expect(s!.strategy.reduce((t, x) => t + x[hc]!, 0)).toBeCloseTo(1, 2);
    }
  });
  it('meta: 9 graczy, NashConv poniżej 0,01 bb (kryterium N4), podstawa 6-max', () => {
    expect(d.meta.players).toBe(9);
    expect(d.meta.nashConvBb as number).toBeLessThan(0.01);
    expect((d.meta.base6max as { file: string }).file).toBe('content/ranges/preflop-6max-100bb.json');
  });
});
