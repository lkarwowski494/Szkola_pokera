import { describe, expect, it } from 'vitest';
import { mergeNine, NINE_PREFIX, path6to9, type ResultFile } from '../src/merge9';
import { buildTree, DEFAULT_TREE } from '../src/tree';

const spot = (path: string, player: string) => ({ path, player, raiseLevel: 0, actions: ['fold', 'raise 2.5'], strategy: [{ AA: 0 }, { AA: 1 }] });

describe('łączenie wyniku 9-max z kanonem 6-max', () => {
  it('ścieżki 6-max trafiają pod pasy UTG–UTG+2, UTG 6-max to LJ', () => {
    expect(NINE_PREFIX).toBe('UTG:fold,UTG+1:fold,UTG+2:fold');
    expect(path6to9('')).toBe(NINE_PREFIX);
    expect(path6to9('UTG:raise2.5,HJ:fold,CO:raise7.5,BTN:fold,SB:fold,BB:fold,UTG:call')).toBe(`${NINE_PREFIX},LJ:raise2.5,HJ:fold,CO:raise7.5,BTN:fold,SB:fold,BB:fold,LJ:call`);
  });

  it('każdy węzeł pełnego drzewa 9-max jest w dokładnie jednej części', () => {
    const six = buildTree();
    const ext = buildTree({ ...DEFAULT_TREE, players: 9, externalFolds: 3 });
    const full = buildTree({ ...DEFAULT_TREE, players: 9 });
    const fromSix = six.nodes.filter((n) => n.kind === 'decision').map((n) => path6to9(n.path));
    const fromNine = ext.nodes.filter((n) => n.kind === 'decision').map((n) => n.path);
    const all = full.nodes.filter((n) => n.kind === 'decision').map((n) => n.path);
    expect([...fromSix, ...fromNine].sort()).toEqual(all.sort());
  });

  it('mergeNine łączy obie części i odrzuca powtórzone węzły', () => {
    const nine: ResultFile = { meta: { players: 9 }, spots: [spot('', 'UTG')] };
    const six: ResultFile = { meta: { players: 6, iterations: 1800, nashConvBb: 0.009 }, spots: [spot('', 'UTG'), spot('UTG:fold', 'HJ')] };
    const m = mergeNine(nine, six, 'six.json');
    expect(m.spots.map((s) => `${s.path}|${s.player}`)).toEqual(['|UTG', `${NINE_PREFIX}|LJ`, `${NINE_PREFIX},UTG:fold|HJ`.replace(',UTG:fold', ',LJ:fold')]);
    expect((m.meta.base6max as { iterations: number }).iterations).toBe(1800);
    expect(() => mergeNine({ meta: { players: 9 }, spots: [spot(NINE_PREFIX, 'LJ')] }, six, 'six.json')).toThrow();
  });
});
