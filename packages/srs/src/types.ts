/** Stan karty FSRS jako zwykły JSON (daty jako ms), żeby trzymać go w SQLite. */
export interface StoredCard {
  familyId: string;
  due: number;
  stability: number;
  difficulty: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  state: number;
  lastReview: number | null;
}
