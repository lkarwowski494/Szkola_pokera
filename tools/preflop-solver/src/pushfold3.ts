import type { DecisionNode, FoldTerminal, Node, Showdown3Terminal, ShowdownTerminal } from './tree';

const BTN = 3;
const SB = 4;
const BB = 5;

/**
 * Drzewo push/fold trzyosobowe (Button, mały blind, duży blind; M11): każdy gracz ma ten sam stack `stack` w bb
 * (z blindem), więc nie ma puli bocznych. Pierwszy gracz wchodzi all-in albo pasuje, kolejni sprawdzają all-in albo
 * pasują. Po all-inie nie ma dalszej gry: wynik zależy tylko od equity (pule dwu- i trzyosobowe), jak w artykule
 * Ganzfrieda i Sandholma (AAMAS 2008, „single hand”), z którym walidujemy wynik przy 7,5bb.
 */
export function buildPushFold3Tree(stack: number): { root: Node; nodes: Node[] } {
  const nodes: Node[] = [];
  let id = 0;
  const inv = (btn: number, sb: number, bb: number) => [0, 0, 0, btn, sb, bb];
  const fold = (winner: number, invested: number[], path: string): FoldTerminal => {
    const n: FoldTerminal = { kind: 'fold', id: id++, winner, invested, pot: invested.reduce((a, b) => a + b, 0), path };
    nodes.push(n);
    return n;
  };
  const showdown = (oop: number, ip: number, aggressor: number, invested: number[], path: string): ShowdownTerminal => {
    const n: ShowdownTerminal = { kind: 'showdown', id: id++, oop, ip, aggressor, invested, pot: invested.reduce((a, b) => a + b, 0), remaining: 0, path };
    nodes.push(n);
    return n;
  };
  const decision = (player: number, path: string, actions: DecisionNode['actions'], children: Node[], raiseLevel: number): DecisionNode => {
    const n: DecisionNode = { kind: 'decision', id: id++, player, actions, children, path, raiseLevel };
    nodes.push(n);
    return n;
  };
  const S = stack;

  // Button all-in
  const jj: Showdown3Terminal = { kind: 'showdown3', id: id++, players: [SB, BB, BTN], aggressor: BTN, invested: inv(S, S, S), pot: 3 * S, remaining: 0, path: 'BTN:allin,SB:call,BB:call' };
  nodes.push(jj);
  const bbAfterJamJam = decision(
    BB,
    'BTN:allin,SB:call',
    [
      { kind: 'fold', to: 1, label: 'fold' },
      { kind: 'call', to: S, label: 'call' },
    ],
    [showdown(SB, BTN, BTN, inv(S, S, 1), 'BTN:allin,SB:call,BB:fold'), jj],
    1,
  );
  const bbAfterJamFold = decision(
    BB,
    'BTN:allin,SB:fold',
    [
      { kind: 'fold', to: 1, label: 'fold' },
      { kind: 'call', to: S, label: 'call' },
    ],
    [fold(BTN, inv(S, 0.5, 1), 'BTN:allin,SB:fold,BB:fold'), showdown(BB, BTN, BTN, inv(S, 0.5, S), 'BTN:allin,SB:fold,BB:call')],
    1,
  );
  const sbAfterJam = decision(
    SB,
    'BTN:allin',
    [
      { kind: 'fold', to: 0.5, label: 'fold' },
      { kind: 'call', to: S, label: 'call' },
    ],
    [bbAfterJamFold, bbAfterJamJam],
    1,
  );

  // Button pasuje: pojedynek blindów jak w drzewie heads-up
  const bbAfterFoldJam = decision(
    BB,
    'BTN:fold,SB:allin',
    [
      { kind: 'fold', to: 1, label: 'fold' },
      { kind: 'call', to: S, label: 'call' },
    ],
    [fold(SB, inv(0, S, 1), 'BTN:fold,SB:allin,BB:fold'), showdown(SB, BB, SB, inv(0, S, S), 'BTN:fold,SB:allin,BB:call')],
    1,
  );
  const sbAfterFold = decision(
    SB,
    'BTN:fold',
    [
      { kind: 'fold', to: 0.5, label: 'fold' },
      { kind: 'allin', to: S, label: 'all-in' },
    ],
    [fold(BB, inv(0, 0.5, 1), 'BTN:fold,SB:fold'), bbAfterFoldJam],
    0,
  );

  const root = decision(
    BTN,
    '',
    [
      { kind: 'fold', to: 0, label: 'fold' },
      { kind: 'allin', to: S, label: 'all-in' },
    ],
    [sbAfterFold, sbAfterJam],
    0,
  );
  return { root, nodes };
}
