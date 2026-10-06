import type { DecisionNode, FoldTerminal, Node, ShowdownTerminal } from './tree';

/**
 * Drzewo push/fold heads-up (SB vs BB) do walidacji solvera: po all-in nie ma dalszej gry,
 * więc wynik zależy wyłącznie od equity i jest porównywalny z tablicami Nasha.
 * `stack` to stack efektywny w bb bez ante. `ante` (M11) to big blind ante w bb: martwe pieniądze w puli,
 * wpłacone przez BB obok blinda i stacku (0 = drzewo walidacyjne z dokumentu 10).
 */
export function buildPushFoldTree(stack: number, ante = 0): { root: Node; nodes: Node[] } {
  const nodes: Node[] = [];
  const blinds = [0, 0, 0, 0, 0.5, 1 + ante];
  const sbFold: FoldTerminal = { kind: 'fold', id: 0, winner: 5, invested: blinds.slice(), pot: 1.5 + ante, path: 'SB:fold' };
  const bbFold: FoldTerminal = { kind: 'fold', id: 1, winner: 4, invested: [0, 0, 0, 0, stack, 1 + ante], pot: stack + 1 + ante, path: 'SB:allin,BB:fold' };
  const call: ShowdownTerminal = {
    kind: 'showdown',
    id: 2,
    oop: 4,
    ip: 5,
    aggressor: 4,
    invested: [0, 0, 0, 0, stack, stack + ante],
    pot: 2 * stack + ante,
    remaining: 0,
    path: 'SB:allin,BB:call',
  };
  const bb: DecisionNode = {
    kind: 'decision',
    id: 3,
    player: 5,
    actions: [
      { kind: 'fold', to: 1, label: 'fold' },
      { kind: 'call', to: stack, label: 'call' },
    ],
    children: [bbFold, call],
    path: 'SB:allin',
    raiseLevel: 1,
  };
  const sb: DecisionNode = {
    kind: 'decision',
    id: 4,
    player: 4,
    actions: [
      { kind: 'fold', to: 0.5, label: 'fold' },
      { kind: 'allin', to: stack, label: 'all-in' },
    ],
    children: [sbFold, bb],
    path: '',
    raiseLevel: 0,
  };
  nodes.push(sbFold, bbFold, call, bb, sb);
  return { root: sb, nodes };
}
