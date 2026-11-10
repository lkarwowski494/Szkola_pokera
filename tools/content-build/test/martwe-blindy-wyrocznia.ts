// Wyrocznia testów (CJ WYS-002): martwe blindy z pozycji szablonu, liczone wprost z tabeli blindów, bez kodu generatora (ŚR-204).
const BLIND_BB: Record<string, number> = { SB: 0.5, BB: 1 };
/** Blindy wpłacone przez graczy spoza rozdania (pula przed flopem = 2 × wkład gracza + martwe). */
export const martweBlindy = (p: { hero: string; villain: string }): number =>
  Object.entries(BLIND_BB).filter(([m]) => m !== p.hero && m !== p.villain).reduce((s, [, v]) => s + v, 0);
/** Blind wpłacony przez miejsce (bb), z tabeli blindów. */
export const blindMiejsca = (m: string): number => BLIND_BB[m] ?? 0;
