/**
 * Drzewo akcji preflop 6-max (ADR-20), od wersji 9-max także dla 9 graczy (TreeConfig.players). Uproszczenia pierwszej wersji, opisane w dokumentacji:
 * - bez limpów (otwarcie albo pas), także w pojedynku blindów;
 * - jeden rozmiar na każdym poziomie podbicia; 5-bet to all-in;
 * - sprawdzenie otwarcia przez pierwszego chętnego; gdy otwarcie ma już jedno sprawdzenie,
 *   dołączyć może tylko duży blind (pula trzyosobowa, wersja 2 drzewa, decyzja właściciela: opcja B);
 * - sprawdzenie 3-betu i dalszych tylko w sytuacji heads-up.
 */

export const POSITIONS = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;
export type Position = (typeof POSITIONS)[number];
export const N_PLAYERS = 6;
/** Pozycje stołu 9-max: trzy wczesne przed pozycjami 6-max (LJ odpowiada UTG w 6-max). */
export const POSITIONS_9 = ['UTG', 'UTG+1', 'UTG+2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const;

/** Nazwy pozycji dla stołu z `n` graczami (6 albo 9). */
export function positionsFor(n: number): readonly string[] {
  if (n === 6) return POSITIONS;
  if (n === 9) return POSITIONS_9;
  throw new Error(`Nieobsługiwana liczba graczy: ${n}`);
}

export type ActionKind = 'fold' | 'call' | 'raise' | 'allin';

export interface TreeConfig {
  stack: number;
  openSize: number;
  openSizeSb: number;
  /** 3-bet: mnożnik otwarcia w pozycji i bez pozycji. */
  threeBetIp: number;
  threeBetOop: number;
  /** 4-bet: mnożnik 3-betu w pozycji i bez pozycji. */
  fourBetIp: number;
  fourBetOop: number;
  /** Czy duży blind może dołączyć do otwarcia z jednym sprawdzeniem (pula trzyosobowa). */
  bbOvercall: boolean;
  /** Liczba graczy (domyślnie 6). */
  players?: number;
  /**
   * 9-max: gdy pierwszych `externalFolds` graczy spasuje, reszta drzewa to dokładnie gra 6-max (te same blindy i stacki;
   * model nie uwzględnia blokerów spasowanych graczy), więc zamiast niej jest końcówka `external` o wartości 0, a
   * strategię tego poddrzewa bierze się z wyniku 6-max (scripts/merge-9max.ts, dokument 10).
   */
  externalFolds?: number;
}

export const DEFAULT_TREE: TreeConfig = {
  stack: 100,
  openSize: 2.5,
  openSizeSb: 3,
  threeBetIp: 3,
  threeBetOop: 4,
  fourBetIp: 2.3,
  fourBetOop: 2.5,
  bbOvercall: true,
};

export interface DecisionNode {
  kind: 'decision';
  id: number;
  player: number;
  actions: { kind: ActionKind; to: number; label: string }[];
  children: Node[];
  /** Ścieżka akcji od korzenia, np. "UTG:raise2.5,HJ:fold". */
  path: string;
  /** Poziom podbicia, z którym gracz się mierzy (0 = nikt nie otworzył). */
  raiseLevel: number;
}

export interface FoldTerminal {
  kind: 'fold';
  id: number;
  winner: number;
  invested: number[];
  pot: number;
  path: string;
}

export interface ShowdownTerminal {
  kind: 'showdown';
  id: number;
  /** Gracz bez pozycji po flopie i gracz z pozycją. */
  oop: number;
  ip: number;
  /** Ostatni podbijający preflop (inicjatywa). */
  aggressor: number;
  invested: number[];
  pot: number;
  /** Stack pozostały efektywnie po preflopie (0 = all-in). */
  remaining: number;
  path: string;
}

/** Pula trzyosobowa na flopie (otwarcie, jedno sprawdzenie, dołączenie dużego blinda). */
export interface Showdown3Terminal {
  kind: 'showdown3';
  id: number;
  /** Gracze w kolejności postflop: bez pozycji, środkowy, z pozycją. */
  players: [number, number, number];
  aggressor: number;
  invested: number[];
  pot: number;
  remaining: number;
  path: string;
}

/**
 * Poddrzewo liczone osobno (9-max: wszyscy wcześni gracze spasowali, dalej gra 6-max). Wartość 0 dla każdego gracza:
 * spasowani wcześni gracze nic nie włożyli, a żal pozostałych graczy w węzłach poza tym poddrzewem od niego nie zależy.
 */
export interface ExternalTerminal {
  kind: 'external';
  id: number;
  path: string;
}

export type Node = DecisionNode | FoldTerminal | ShowdownTerminal | Showdown3Terminal | ExternalTerminal;

/** Kolejność postflop: blindy mówią pierwsze (SB, BB), potem UTG…BTN. Większy indeks = później. */
export function postflopOrder(p: number, n = N_PLAYERS): number {
  return p === n - 2 ? 0 : p === n - 1 ? 1 : p + 2;
}

/** Czy gracz `a` ma pozycję na graczu `b` po flopie. */
export function isInPosition(a: number, b: number, n = N_PLAYERS): boolean {
  return postflopOrder(a, n) > postflopOrder(b, n);
}

interface State {
  invested: number[];
  folded: boolean[];
  pending: number[];
  currentBet: number;
  raiseLevel: number;
  /** Gracze, którzy sprawdzili obecny poziom (do zasady „jeden sprawdzający otwarcie”). */
  callers: number;
  lastRaiser: number;
  path: string[];
}

const round2 = (x: number) => Math.round(x * 100) / 100;

export function buildTree(cfg: TreeConfig = DEFAULT_TREE): { root: Node; nodes: Node[]; players: number; positions: readonly string[] } {
  const nP = cfg.players ?? N_PLAYERS;
  const POS = positionsFor(nP);
  const SB = nP - 2;
  const BB = nP - 1;
  const order = (p: number) => postflopOrder(p, nP);
  const inPos = (a: number, b: number) => isInPosition(a, b, nP);
  const ext = cfg.externalFolds ?? 0;
  const extPath = POS.slice(0, ext).map((x) => `${x}:fold`).join(',');
  const nodes: Node[] = [];
  const add = <T extends Node>(n: Omit<T, 'id'>): T => {
    const node = { ...n, id: nodes.length } as T;
    nodes.push(node);
    return node;
  };

  const activePlayers = (s: State) => s.folded.map((f, i) => (f ? -1 : i)).filter((i) => i >= 0);

  const build = (s: State): Node => {
    if (ext > 0 && s.path.length === ext && s.path.join(',') === extPath) return add<ExternalTerminal>({ kind: 'external', path: extPath });
    const active = activePlayers(s);
    const pot = round2(s.invested.reduce((a, b) => a + b, 0));
    if (active.length === 1) {
      return add<FoldTerminal>({ kind: 'fold', winner: active[0]!, invested: s.invested.slice(), pot, path: s.path.join(',') });
    }
    if (s.pending.length === 0) {
      if (active.length === 3) {
        const players = active.slice().sort((x, y) => order(x) - order(y)) as [number, number, number];
        const remaining = round2(cfg.stack - Math.max(...players.map((q) => s.invested[q]!)));
        return add<Showdown3Terminal>({ kind: 'showdown3', players, aggressor: s.lastRaiser, invested: s.invested.slice(), pot, remaining, path: s.path.join(',') });
      }
      if (active.length !== 2) throw new Error(`Na flopie ${active.length} graczy: ${s.path.join(',')}`);
      const [a, b] = active as [number, number];
      const oop = inPos(a, b) ? b : a;
      const ip = oop === a ? b : a;
      const remaining = round2(cfg.stack - Math.max(s.invested[a]!, s.invested[b]!));
      return add<ShowdownTerminal>({ kind: 'showdown', oop, ip, aggressor: s.lastRaiser, invested: s.invested.slice(), pot, remaining, path: s.path.join(',') });
    }

    const p = s.pending[0]!;
    const rest = s.pending.slice(1);
    const actions: DecisionNode['actions'] = [];
    const childStates: State[] = [];
    const facing = s.currentBet - s.invested[p]!;
    const name = POS[p];

    // pas (gdy jest co sprawdzać)
    if (facing > 0) {
      const folded = s.folded.slice();
      folded[p] = true;
      actions.push({ kind: 'fold', to: s.invested[p]!, label: 'fold' });
      childStates.push({ ...s, folded, pending: rest, path: [...s.path, `${name}:fold`] });
    }

    // sprawdzenie
    const othersActive = activePlayers(s).length;
    const allinFacing = s.currentBet >= cfg.stack;
    const callAllowed =
      s.raiseLevel === 1
        ? facing > 0 && (s.callers === 0 || (cfg.bbOvercall && s.callers === 1 && p === BB))
        : s.raiseLevel >= 2
          ? othersActive === 2
          : false;
    if (callAllowed) {
      const invested = s.invested.slice();
      invested[p] = s.currentBet;
      actions.push({ kind: 'call', to: s.currentBet, label: `call ${s.currentBet}` });
      childStates.push({ ...s, invested, pending: rest, callers: s.callers + 1, path: [...s.path, `${name}:call`] });
    }

    // podbicie
    if (!allinFacing) {
      let to: number;
      let kind: ActionKind = 'raise';
      if (s.raiseLevel === 0) to = p === SB ? cfg.openSizeSb : cfg.openSize;
      else if (s.raiseLevel === 1) to = s.currentBet * (inPos(p, s.lastRaiser) ? cfg.threeBetIp : cfg.threeBetOop);
      else if (s.raiseLevel === 2) to = s.currentBet * (inPos(p, s.lastRaiser) ? cfg.fourBetIp : cfg.fourBetOop);
      else to = cfg.stack;
      to = round2(Math.min(to, cfg.stack));
      if (to >= cfg.stack) {
        to = cfg.stack;
        kind = 'allin';
      }
      const invested = s.invested.slice();
      invested[p] = to;
      // po podbiciu odpowiadają wszyscy pozostali aktywni, w kolejności od gracza za podbijającym
      const order: number[] = [];
      for (let k = 1; k < nP; k++) {
        const q = (p + k) % nP;
        if (!s.folded[q]) order.push(q);
      }
      actions.push({ kind, to, label: kind === 'allin' ? 'all-in' : `raise ${to}` });
      childStates.push({
        ...s,
        invested,
        pending: order,
        currentBet: to,
        raiseLevel: s.raiseLevel + 1,
        callers: 0,
        lastRaiser: p,
        path: [...s.path, `${name}:${kind === 'allin' ? 'allin' : `raise${to}`}`],
      });
    }

    if (actions.length < 2) {
      // gracz bez wyboru (np. tylko pas) — przechodzimy dalej bez węzła decyzyjnego
      return build(childStates[0]!);
    }

    const node = add<DecisionNode>({ kind: 'decision', player: p, actions, children: [], path: s.path.join(','), raiseLevel: s.raiseLevel });
    node.children = childStates.map(build);
    return node;
  };

  const invested = Array.from({ length: nP }, (_, i) => (i === SB ? 0.5 : i === BB ? 1 : 0));
  const root = build({
    invested,
    folded: Array(nP).fill(false),
    pending: Array.from({ length: nP }, (_, i) => i),
    currentBet: 1,
    raiseLevel: 0,
    callers: 0,
    lastRaiser: BB,
    path: [],
  });
  return { root, nodes, players: nP, positions: POS };
}
