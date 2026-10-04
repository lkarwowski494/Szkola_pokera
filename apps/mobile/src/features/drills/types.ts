import type { NumberUnitName } from '@szkola/content-schema';
import type { RangeSpot } from '@/data/content/repo';

export type Position = 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export interface DrillOption {
  text: string;
  correct: boolean;
  /** Dobra akcja, zły rozmiar: liczone jako błąd, pokazywane jako „niedokładność”. */
  sizeError?: boolean;
  /** Wyjaśnienie tej konkretnej opcji (pokazywane po odpowiedzi). */
  why: string;
}

interface InstanceBase {
  key: string;
  drillId: string;
  family: string;
  lessonId: string | null;
  rules: string[];
  prompt: string;
  table?: { hand?: string[]; opp?: string[]; board?: string[]; position?: Position };
  /** Wspólne wyjaśnienie, pokazywane pod odpowiedzią. */
  explanation?: string;
}

export interface ChoiceInstance extends InstanceBase {
  kind: 'choice';
  options: DrillOption[];
}

export interface NumericInstance extends InstanceBase {
  kind: 'numeric';
  /** Poprawna wartość w jednostkach wpisywanych przez użytkownika (procenty jako 0–100). */
  answer: number;
  unit: NumberUnitName;
  /** Poprawna wartość sformatowana do pokazania (np. „33%”). */
  display: string;
}

export interface PaintInstance extends InstanceBase {
  kind: 'paint';
  spot: RangeSpot;
}

/** Jedna oś klasyfikacji tekstury flopa (np. wysokość) z opcjami i wyjaśnieniem każdej z nich. */
export interface TextureAxisItem {
  axis: 'height' | 'suits' | 'ranks' | 'wetness';
  label: string;
  options: DrillOption[];
}

/** Klasyfikacja tekstury flopa (M5): po jednej odpowiedzi na każdą oś. */
export interface TextureInstance extends InstanceBase {
  kind: 'texture';
  axes: TextureAxisItem[];
}

/** Jedno konkretne zadanie do pokazania (z treści albo z generatora). */
export type DrillInstance = ChoiceInstance | NumericInstance | PaintInstance | TextureInstance;

/** Odpowiedź użytkownika. */
export type DrillAnswer =
  | { kind: 'choice'; index: number }
  | { kind: 'numeric'; value: number }
  | { kind: 'paint'; painted: readonly boolean[] }
  /** Indeks wybranej opcji dla każdej osi tekstury (w kolejności osi). */
  | { kind: 'texture'; picks: readonly number[] }
  | { kind: 'timeout' };

/**
 * Ocena: correct = dobrze; close = blisko (FSRS: trudne); size = dobra akcja, zły rozmiar (liczone jako błąd);
 * wrong = źle.
 */
export type GradeResult = 'correct' | 'close' | 'size' | 'wrong';
