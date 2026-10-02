export type Position = 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export interface DrillOption {
  text: string;
  correct: boolean;
  /** Wyjaśnienie tej konkretnej opcji (pokazywane po odpowiedzi). */
  why: string;
}

/** Jedno konkretne zadanie do pokazania (z treści albo z generatora). */
export interface DrillInstance {
  key: string;
  drillId: string;
  family: string;
  lessonId: string | null;
  rules: string[];
  prompt: string;
  table?: { hand?: string[]; opp?: string[]; board?: string[]; position?: Position };
  options: DrillOption[];
  /** Wspólne wyjaśnienie (dla zadań generowanych), pokazywane pod opcjami. */
  explanation?: string;
}
