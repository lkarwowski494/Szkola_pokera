// IG (D-1890…): stos z ekranu startu (`stackBb`, napis „Głębokość … bb”, EkranScenariusza.tsx:114) a stosy wariantów generatora.
// `stackBb` to głębokość na początku rozdania (stos gracza przed blindami i otwarciem). Wariant spr-call / geo-size niesie `stack` = stos ZA PULĄ na flopie;
// głębokość na starcie = stack + wkład gracza w pulę (pula bez martwych blindów ÷ 2: gracz i rywal wpłacili po równo). Rachunek niezależny od wyniku generatora (tylko liczby szablonu).
import { deadBlindsBb, generateVariant, type GeneratorContext, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';

export interface Probka { id: string; level: string; kind: string; pot: number; stack: number; start: number; }
export const ZIARNA_IG = 120;
/** Wkład gracza w pulę przed flopem: (pula − martwe blindy) ÷ 2 (otwarcie rywala/gracza i sprawdzenie, po równo). */
export const wkladGracza = (pot: number, positions: { hero: string; villain: string }): number => (pot - deadBlindsBb(positions)) / 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function probkiStosow(sz: any, ctx: GeneratorContext, ziarna = ZIARNA_IG): Probka[] {
  const t = { id: sz.id, stackBb: sz.stackBb, positions: sz.positions, levels: sz.bounds, decisions: sz.decisions } as GeneratorTemplate; // jak gen() w wyrocznie-ho.ts
  const out: Probka[] = [];
  const poziomy = sz.levels as ScenarioLevel[];
  for (const level of poziomy) {
    const widziane = new Set<string>();
    for (let seed = 1; seed <= ziarna; seed++) {
      const v = generateVariant(t, level, seed, ctx);
      for (const p of v.points) {
        if (p.point !== 'spr-call' && p.point !== 'geo-size') continue;
        const k = `${p.pot}/${p.stack}`;
        if (widziane.has(k)) continue;
        widziane.add(k);
        out.push({ id: t.id, level, kind: p.point, pot: p.pot, stack: p.stack, start: p.stack + wkladGracza(p.pot, t.positions!) });
      }
    }
  }
  return out;
}
