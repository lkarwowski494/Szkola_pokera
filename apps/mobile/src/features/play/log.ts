import type { HandEvent, HandState } from '@szkola/poker-core';
import type { TFunction } from 'i18next';
import { fmtBb } from './format';

/** Linia przebiegu rozdania, np. „CO: przebicie do 2,5bb”. Blindy pomijamy. */
export function eventLine(t: TFunction, st: HandState, e: HandEvent, you: string): string | null {
  if (e.type === 'post-sb' || e.type === 'post-bb') return null;
  const pos = e.seat === 0 ? `${you} (${st.seats[e.seat]!.position})` : st.seats[e.seat]!.position;
  const bb = fmtBb(e.to / st.config.bigBlind);
  if (e.allIn && e.type !== 'fold' && e.type !== 'check') return t('play.log.allin', { pos, bb });
  return t(`play.log.${e.type}`, { pos, bb: e.type === 'call' ? fmtBb(e.amount / st.config.bigBlind) : bb });
}

/** Przebieg rozdania po ulicach (do raportu i odtwarzania). */
export function handLog(t: TFunction, st: HandState, you: string, upTo = st.events.length): { street: string; lines: string[] }[] {
  const out: { street: string; lines: string[] }[] = [];
  for (const e of st.events.slice(0, upTo)) {
    const line = eventLine(t, st, e, you);
    if (!line) continue;
    const last = out[out.length - 1];
    if (last && last.street === e.street) last.lines.push(line);
    else out.push({ street: e.street, lines: [line] });
  }
  return out;
}
