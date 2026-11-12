// Wyrocznie pokrycia flop-size i river-value (08-FD-3, 08-FD-4): pełne przejście po talii, niezależne od generatora. Wspólne dla testów pokrycia treści i FP.
import { classOf, FULL_DECK, generateVariant, strength, suitOf, type Card, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';

export const LOSOWANIA = 40;
/** δ punktu `idx` na poziomie: jak w generatorze (`margins[idx].min` przed `marginMin`); brak to błąd testu, nie 0 (08-programista-003). */
export function deltaPunktu(b: { marginMin?: number | undefined; margins?: readonly { min: number }[] | undefined }, idx: number): number {
  const d = b.margins?.[idx]?.min ?? b.marginMin;
  if (d === undefined) throw new Error(`wyrocznia: brak δ dla punktu ${idx} (ani margins[${idx}].min, ani marginMin)`);
  return d;
}
export const gen = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

/** Sprawdza flop-size: N kart turnu z wyroczni = nominalne 9 outów koloru, e = N/47 (duży zakład także wobec N/45), zbiór wygrywających = outy koloru, marginesy ≥ δ punktu; zwraca listę błędów. */
export function bledyFlopSize(t: ScenarioTemplate): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'flop-size');
  const d = t.decisions[idx]!;
  if (d.kind !== 'flop-size') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const delta = deltaPunktu(t.bounds[level]!, idx);
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(gen(t), level, seed);
      const p = v.points[idx];
      if (p?.point !== 'flop-size') { e.push(`${t.id} ${level} ${seed}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const znane = new Set<Card>([...v.hero, ...v.villain, ...flop]);
      let n = 0, remisy = 0;
      const wygrywa = new Set<Card>();
      for (const c of FULL_DECK) {
        if (znane.has(c)) continue;
        const [r, h] = [strength([...v.villain, ...flop, c]), strength([...v.hero, ...flop, c])];
        if (r < h) { n++; wygrywa.add(c); } else if (r === h) remisy++;
      }
      // czyste outy koloru (08-programista-001, M11): wygrywające karty turnu = pozostałe karty koloru, w którym rywal ma 4 karty z flopem
      const kolor = [0, 1, 2, 3].find((su) => [...v.villain, ...flop].filter((c) => suitOf(c) === su).length === 4);
      if (kolor === undefined) e.push(`${t.id} ${level} ${seed}: rywal nie ma drawa do koloru`);
      else {
        const outy = FULL_DECK.filter((c) => suitOf(c) === kolor && !znane.has(c));
        if (outy.length !== wygrywa.size || !outy.every((c) => wygrywa.has(c))) e.push(`${t.id} ${level} ${seed}: wygrywające karty turnu ≠ pozostałe karty koloru`);
      }
      const ee = n / 47;
      const cena = (f: number) => f / (1 + 2 * f);
      if (remisy !== 0) e.push(`${t.id} ${level} ${seed}: remisy ${remisy}`);
      if (Math.abs(p.hit - ee) > 1e-12) e.push(`${t.id} ${level} ${seed}: hit ${p.hit} ≠ ${ee}`);
      if (!(ee - cena(d.small) >= delta - 1e-12 && cena(d.big) - ee >= delta - 1e-12)) e.push(`${t.id} ${level} ${seed}: margines poniżej ${delta}`);
      // D-1421 (08-programista-001, M12): duży zakład wobec dokładnego equity N/45 (znane obie ręce), nie tylko wobec pokazywanego N/47
      if (!(cena(d.big) - n / 45 >= delta - 1e-12)) e.push(`${t.id} ${level} ${seed}: margines dużego wobec N/45 poniżej ${delta}`);
      const poprawna: string = p.correct;
      if (poprawna !== 'bet-big') e.push(`${t.id} ${level} ${seed}: poprawna ${poprawna}`);
    }
  }
  return e;
}
/** Sprawdza river-value: w z pełnego przejścia po talii, akcja oczekiwana poziomu, margines ≥ δ, brak lepszej ręki wśród pasujących. */
export function bledyRiverValue(t: ScenarioTemplate): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'river-value');
  const d = t.decisions[idx]!;
  if (d.kind !== 'river-value') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const b = t.bounds[level]!;
    const delta = deltaPunktu(b, idx);
    for (let seed = 1; seed <= LOSOWANIA; seed++) {
      const v = generateVariant(gen(t), level, seed);
      const p = v.points[idx];
      if (p?.point !== 'river-value') { e.push(`${t.id} ${level} ${seed}: punkt ${p?.point}`); continue; }
      const martwe = new Set<Card>([...v.hero, ...v.board]);
      const moja = strength([...v.hero, ...v.board]);
      let W = 0, L = 0, lepszePasujace = 0;
      for (let a = 0; a < FULL_DECK.length; a++) for (let c = a + 1; c < FULL_DECK.length; c++) {
        const [x, y] = [FULL_DECK[a]!, FULL_DECK[c]!];
        if (martwe.has(x) || martwe.has(y)) continue;
        const klasa = classOf(x, y);
        const jego = strength([x, y, ...v.board]);
        if (d.calls.includes(klasa)) { if (moja < jego) W++; else if (moja > jego) L++; }
        else if (d.folds.includes(klasa) && moja > jego) lepszePasujace++;
      }
      const w = W / (W + L);
      const oczekiwana = b.expected[idx];
      if (lepszePasujace !== 0) e.push(`${t.id} ${level} ${seed}: lepsze ręce wśród pasujących (${lepszePasujace})`);
      if (oczekiwana === 'bet' ? !(w - 0.5 >= delta - 1e-9) : !(0.5 - w >= delta - 1e-9)) e.push(`${t.id} ${level} ${seed}: w = ${w}, oczekiwana ${oczekiwana}, δ ${delta}`);
      if (p.correct !== oczekiwana || Math.abs(p.w - w) > 1e-12) e.push(`${t.id} ${level} ${seed}: wariant ${p.correct} w ${p.w}, wyrocznia ${oczekiwana} w ${w}`);
    }
  }
  return e;
}
