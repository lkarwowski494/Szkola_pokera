import { combosCount, HAND_CLASSES } from '@szkola/poker-core';
import type { RangeSpot } from '@/data/content/repo';
import { MIXED_HIGH, MIXED_LOW, NUMERIC_TOLERANCE, PAINT_PASS } from './thresholds';
import type { DrillAnswer, DrillInstance, GradeResult, NumericInstance } from './types';

/**
 * Ocena odpowiedzi: czysta funkcja, wspólna dla lekcji, powtórek, treningu na czas i egzaminu.
 */

/** Stan pola siatki po ocenie malowania. */
export type PaintCell = 'hit' | 'miss' | 'extra' | 'mixed' | 'none';

export interface PaintScore {
  /** Udział poprawnie ocenionych kombinacji wśród rąk z zakresu solvera albo zaznaczonych (0–1). */
  score: number;
  cells: PaintCell[];
  /** Liczby kombinacji: brakujące, nadmiarowe, w zakresie (bez mieszanych). */
  missCombos: number;
  extraCombos: number;
  targetCombos: number;
}

/** Częstość gry (wszystkie grupy akcji poza pasem) dla każdej ze 169 klas. */
export function playFreqs(spot: RangeSpot): number[] {
  return HAND_CLASSES.map((_, h) => spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0));
}

/**
 * Malowanie zakresu (decyzja właściciela 3.10.2026, B-016): gram / pas, wynik ważony kombinacjami
 * (para 6, w kolorze 4, w różnych kolorach 12). Liczymy tylko ręce z zakresu solvera (z mieszanymi) albo zaznaczone,
 * żeby łatwe pasy nie zawyżały wyniku. Ręce mieszane (MIXED_LOW–MIXED_HIGH) są zaliczane w obie strony.
 */
export function scorePaint(spot: RangeSpot, painted: readonly boolean[]): PaintScore {
  const play = playFreqs(spot);
  let relevant = 0;
  let ok = 0;
  let missCombos = 0;
  let extraCombos = 0;
  let targetCombos = 0;
  const cells = HAND_CLASSES.map((hc, h): PaintCell => {
    const c = combosCount(hc);
    const p = play[h]!;
    const sel = !!painted[h];
    const inRange = p >= MIXED_HIGH;
    const mixed = p >= MIXED_LOW && p < MIXED_HIGH;
    if (inRange) targetCombos += c;
    if (!inRange && !mixed && !sel) return 'none';
    relevant += c;
    if (mixed) {
      ok += c;
      return 'mixed';
    }
    if (inRange && sel) {
      ok += c;
      return 'hit';
    }
    if (inRange) {
      missCombos += c;
      return 'miss';
    }
    extraCombos += c;
    return 'extra';
  });
  return { score: relevant ? ok / relevant : 1, cells, missCombos, extraCombos, targetCombos };
}

/** Odczyt liczby wpisanej po polsku: przecinek albo kropka, opcjonalnie z „%” lub „bb”. */
export function parseNumberInput(text: string): number | null {
  const s = text.trim().replace(/\s+/g, '').replace(/(%|bb|x|×)$/i, '').replace(/^[−–]/, '-').replace(',', '.');
  // dopuszczamy „5.”, „33,” i „,5” (niedokończony zapis dziesiętny)
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return Number(s);
}

export function gradeNumeric(inst: Pick<NumericInstance, 'answer' | 'unit'>, value: number): GradeResult {
  const tol = NUMERIC_TOLERANCE[inst.unit];
  const diff = Math.abs(value - inst.answer);
  const eps = 1e-9;
  if (diff <= tol.ok + eps) return 'correct';
  if (diff <= tol.close + eps) return 'close';
  return 'wrong';
}

export function gradeAnswer(inst: DrillInstance, answer: DrillAnswer): GradeResult {
  if (answer.kind === 'timeout') return 'wrong';
  switch (inst.kind) {
    case 'choice': {
      if (answer.kind !== 'choice') return 'wrong';
      const o = inst.options[answer.index];
      if (!o) return 'wrong';
      return o.correct ? 'correct' : o.sizeError ? 'size' : 'wrong';
    }
    case 'numeric':
      return answer.kind === 'numeric' ? gradeNumeric(inst, answer.value) : 'wrong';
    case 'paint':
      return answer.kind === 'paint' && scorePaint(inst.spot, answer.painted).score >= PAINT_PASS ? 'correct' : 'wrong';
    case 'texture':
      // wszystkie osie trafione = dobrze; choćby jedna zła = źle (decyzja tymczasowa M5, bez oceny „blisko”)
      if (answer.kind !== 'texture' || answer.picks.length !== inst.axes.length) return 'wrong';
      return inst.axes.every((a, i) => a.options[answer.picks[i]!]?.correct === true) ? 'correct' : 'wrong';
  }
}
