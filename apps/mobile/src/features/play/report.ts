import { legalActions, replaySituation, situationAt, type GradeDetail, type HandPreset, type PlayerAction, type TableConfig } from '@szkola/poker-core';
import type { TFunction } from 'i18next';
import { codes, fmtBb, fmtPct } from './format';
import { handLog } from './log';

/** Wiersze z bazy potrzebne do raportu (game_findings i game_hands). */
export interface FindingRow {
  id: number;
  handId: number;
  actionIndex: number;
  street: string;
  position: string;
  verdict: string;
  ruleId: string | null;
  level: string | null;
  module: string | null;
  detail: string | null;
}
export interface HandRow {
  id: number;
  handNo: number;
  seed: number;
  config: string;
  preset: string | null;
  actions: string;
  resultBb: number;
}

export interface ReportItem {
  finding: FindingRow;
  hole: string[];
  board: string[];
  action: string;
  detail: string | null;
  log: { street: string; lines: string[] }[];
}

const ORDER = ['mistake', 'inaccuracy', 'timeout', 'acceptable', 'compliant-exploit', 'compliant', 'unrated'];

/** Opis decyzji gracza („Ty (BTN): przebicie do 2,5bb”). */
function actionText(t: TFunction, a: PlayerAction, toCallBb: number, bb: number): string {
  const pos = t('play.you');
  if (a.type === 'call') return t('play.log.call', { pos, bb: fmtBb(toCallBb) });
  if (a.type === 'bet' || a.type === 'raise') return t(`play.log.${a.type}`, { pos, bb: fmtBb((a.to ?? 0) / bb) });
  return t(`play.log.${a.type}`, { pos });
}

export function detailText(t: TFunction, d: GradeDetail | null, hand: string, bb: number): string | null {
  if (!d) return null;
  switch (d.kind) {
    case 'solver':
      return t('play.report.detail.solver', {
        hand,
        options: d.options.map((o) => `${o.name === 'fold' ? t('play.report.detail.solverFold') : o.name} ${fmtPct(o.f)}`).join(', '),
      });
    case 'size':
      return t('play.report.detail.size', { expected: fmtBb(d.expectedBb), actual: fmtBb(d.actualBb) });
    case 'cbet':
      return t('play.report.detail.cbet', { best: t(`play.report.detail.cbetPlans.${d.best}`), chosen: t(`play.report.detail.cbetPlans.${d.chosen}`) });
    case 'draw': {
      const base = t('play.report.detail.draw', { outs: d.outs, unseen: d.unseen, hit: fmtPct(d.hit, 1), required: fmtPct(d.required, 1) });
      if (!d.implied) return base;
      const i = d.implied;
      return `${base} ${t('play.report.detail.implied', {
        need: fmtBb(Math.max(0, i.neededExtra) / bb),
        have: fmtBb(i.available / bb),
        spr: fmtBb(i.spr),
        sprMin: fmtBb(i.sprMin),
        nuts: t(i.nutDraw ? 'play.report.detail.nutsYes' : 'play.report.detail.nutsNo'),
      })}`;
    }
    case 'free-check':
      return t('play.report.detail.freeCheck');
    case 'limp':
      return t('play.report.detail.limp');
    case 'timeout':
      return t(d.auto === 'check' ? 'play.report.detail.timeoutCheck' : 'play.report.detail.timeoutFold');
  }
}

/**
 * Pozycje raportu: sytuacja w chwili decyzji (karty, stół), decyzja gracza, wyjaśnienie werdyktu i przebieg rozdania
 * do decyzji. Kolejność: błędy, niedokładności, przekroczony czas, potem dopuszczalne i zgodne.
 */
export function buildReport(t: TFunction, findings: readonly FindingRow[], hands: readonly HandRow[]): ReportItem[] {
  const byId = new Map(hands.map((h) => [h.id, h]));
  const items = findings.map((f) => {
    const h = byId.get(f.handId)!;
    const config = JSON.parse(h.config) as TableConfig;
    const preset = h.preset ? (JSON.parse(h.preset) as HandPreset) : undefined;
    const actions = JSON.parse(h.actions) as { seat: number; action: PlayerAction }[];
    const sit = situationAt(config, h.seed, actions, f.actionIndex, preset);
    const st = replaySituation(sit);
    const me = st.seats[sit.heroSeat]!;
    const la = legalActions(st);
    const hole = codes(me.hole);
    return {
      finding: f,
      hole,
      board: codes(st.board),
      action: actionText(t, actions[f.actionIndex]!.action, (me.streetBet + (la.callAmount ?? 0)) / config.bigBlind, config.bigBlind),
      detail: detailText(t, f.detail ? (JSON.parse(f.detail) as GradeDetail) : null, hole.join(' '), config.bigBlind),
      log: handLog(t, st, t('play.you')),
    };
  });
  return items.sort((a, b) => ORDER.indexOf(a.finding.verdict) - ORDER.indexOf(b.finding.verdict) || a.finding.id - b.finding.id);
}
