import type { PostepLekcji, WynikLekcji, WynikTestu } from '@szkola/postep';

/** Podsumowania na ekranie Nauka z faktów `postep.db` (zastępują examSummaryMap i lessonProgressMap z user.db). */
export interface PodsumowanieTestu { best: number; total: number; passed: boolean; attempts: number }
export interface PodsumowanieLekcji { done: boolean; bestCorrect: number | null; total: number | null }

// Najlepszy wynik = najwyższy ułamek (przy równym zostaje wcześniejszy); zaliczony, jeśli którakolwiek próba zaliczona.
export function podsumowanieTestow(wyniki: readonly WynikTestu[]): Map<string, PodsumowanieTestu> {
  const out = new Map<string, PodsumowanieTestu>();
  for (const r of wyniki) {
    const p = out.get(r.modulId);
    const lepszy = !p || r.poprawne * p.total > p.best * r.wszystkie;
    out.set(r.modulId, {
      best: lepszy ? r.poprawne : p.best,
      total: lepszy ? r.wszystkie : p.total,
      passed: (p?.passed ?? false) || r.zaliczony,
      attempts: (p?.attempts ?? 0) + 1,
    });
  }
  return out;
}

// Wynik lekcji bez ukończonej aktywności zostaje brakiem (null), nie 0.
export function podsumowanieLekcji(postep: readonly PostepLekcji[], wyniki: readonly WynikLekcji[]): Map<string, PodsumowanieLekcji> {
  const najlepsze = new Map(wyniki.map((w) => [w.lekcjaId, w]));
  return new Map(postep.map((p) => {
    const w = najlepsze.get(p.lekcjaId);
    return [p.lekcjaId, { done: p.ukonczonoMs !== null, bestCorrect: w?.poprawne ?? null, total: w?.wszystkie ?? null }];
  }));
}
