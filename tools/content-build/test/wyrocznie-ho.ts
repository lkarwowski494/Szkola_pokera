// KO-111 (sesja HO): wyrocznie zgodności na treści pl dla rodzajów defend, list-hand, turn-bet, pick-hand i river-catch. Niezależne od generatora i od scenariusze.ts:
// ręce, outy, pary i showdown liczone tu od zera z kart (pełne przejście po talii, własny ewaluator 7 kart: `ocena-reki-wyrocznia.ts`, bez ewaluatora silnika; HT HR-003), reguły z tekstu R-M6-006/007, R-M7-006, R-M8-007, R-M8-010, R-M4-010.
// Dane zakresów (spoty) to dane treści, nie logika generatora. Każda funkcja zwraca listę błędów (pusta = zgodne).
import { classOf, FULL_DECK, generateVariant as generateVariantSilnik, HAND_CLASSES, rankOf, suitOf, type Card, type GeneratorContext, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { silaReki } from './ocena-reki-wyrocznia';

export const LOSOWANIA_HO = 60;
/** Generator wariantów; test mutacyjny podstawia zepsuty, żeby pokazać, że wyrocznia widzi błąd silnika. */
export type Generuj = typeof generateVariantSilnik;
const gen = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;
const T = 8, Q = 10, A = 12; // rangi: 2 = 0 … A = 12

export const piec = (r: number[]): boolean => { const z = new Set(r); if (z.has(12)) z.add(-1); for (let lo = -1; lo <= 8; lo++) { let n = 0; for (let x = lo; x < lo + 5; x++) if (z.has(x)) n++; if (n === 5) return true; } return false; };
export const kolor5 = (c: readonly Card[]): boolean => [0, 1, 2, 3].some((s) => c.filter((x) => suitOf(x) === s).length >= 5);
/** Outy kolor/strit ręki na flopie: karty, po których 6 kart daje kolor albo strit, a 5 kart (ręka + flop) ich jeszcze nie ma. */
export function outyFlopu(hero: readonly Card[], flop: readonly Card[]): number {
  const base = [...hero, ...flop];
  if (kolor5(base) || piec(base.map(rankOf))) return 0;
  return FULL_DECK.filter((c) => !base.includes(c) && (kolor5([...base, c]) || piec([...base, c].map(rankOf)))).length;
}
/** Ręka „zrobiona” z kartą gracza na flopie: para kieszonkowa, karta gracza w parze ze stołem, gotowy kolor albo strit. */
const zrobiona = (hero: readonly Card[], flop: readonly Card[]): boolean => {
  const [a, b] = hero.map(rankOf) as [number, number];
  const fr = flop.map(rankOf);
  return a === b || fr.includes(a) || fr.includes(b) || kolor5([...hero, ...flop]) || piec([a, b, ...fr]);
};
const backdoorKoloru = (hero: readonly Card[], flop: readonly Card[]): boolean => suitOf(hero[0]!) === suitOf(hero[1]!) && flop.filter((c) => suitOf(c) === suitOf(hero[0]!)).length === 1;
/** Backdoor strita: trzy rangi (z co najmniej jedną kartą gracza) w oknie pięciu kolejnych, brakuje dwóch kart. */
function backdoorStrita(hero: readonly Card[], flop: readonly Card[]): boolean {
  const hr = new Set(hero.map(rankOf));
  const z = new Set([...hero, ...flop].map(rankOf));
  if (z.has(12)) z.add(-1);
  if (hr.has(12)) hr.add(-1);
  for (let lo = -1; lo <= 8; lo++) {
    const w = [0, 1, 2, 3, 4].map((k) => lo + k).filter((x) => z.has(x));
    if (w.length >= 3 && w.some((x) => hr.has(x))) return true;
  }
  return false;
}

export function zakresObrony(ctx: GeneratorContext, spot: string): (hc: string) => boolean {
  const s = ctx.spots.find((x) => x.id === spot)!;
  return (hc) => s.actions.filter((a) => a.label !== 'fold').some((a) => (a.freqs[HAND_CLASSES.indexOf(hc)] ?? 0) > 0);
}

/** defend (SC-07, 15, 17): mały c-bet ≤ 0,4 (R-M6-006): kontynuacja = para / outy / as / backdoor z overkartą; pas tylko bez niczego (nawet backdoora); duży ≥ 0,75 (R-M6-007): dwie karty ≥ T, bez pary, drawa i backdoora → pas. */
export function bledyDefend(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'defend');
  const d = t.decisions[idx]!;
  if (d.kind !== 'defend') return e;
  const wZakresie = zakresObrony(ctx, d.spot);
  for (const level of t.levels as ScenarioLevel[]) {
    for (let seed = 1; seed <= LOSOWANIA_HO; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'defend') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      if (!wZakresie(classOf(v.hero[0], v.hero[1]))) e.push(`${m}: ręka ${classOf(v.hero[0], v.hero[1])} spoza zakresu obrony ${d.spot}`);
      if (!d.pots.includes(p.pot)) e.push(`${m}: pula ${p.pot} spoza listy`);
      if (!d.fractions.some((f) => Math.round(p.pot * f) === p.bet)) e.push(`${m}: zakład ${p.bet} nie jest zaokrągleniem puli × ułamek z listy`);
      if (Math.abs(p.fraction - p.bet / p.pot) > 1e-12) e.push(`${m}: fraction ${p.fraction} ≠ bet/pot`);
      const f = p.bet / p.pot;
      const outy = outyFlopu(v.hero, flop);
      const made = zrobiona(v.hero, flop);
      const overkarta = v.hero.some((c) => rankOf(c) > Math.max(...flop.map(rankOf)));
      const as = v.hero.some((c) => rankOf(c) === A);
      const bdK = backdoorKoloru(v.hero, flop);
      const bdS = backdoorStrita(v.hero, flop);
      let oczek: 'call' | 'fold' | null;
      if (f <= 0.4) {
        if (made || outy > 0 || as || ((bdK || bdS) && overkarta)) oczek = 'call';
        else oczek = bdK || bdS ? null : 'fold'; // backdoor bez overkarty: źródło nie rozstrzyga
      } else if (f >= 0.75) oczek = !made && outy === 0 && !bdK && !bdS && v.hero.every((c) => rankOf(c) >= T) ? 'fold' : null;
      else oczek = null;
      if (oczek === null) e.push(`${m}: ręka ${classOf(v.hero[0], v.hero[1])} na ${flop.map(rankOf).join(',')} przy c-becie ${f.toFixed(2)} nie ma odpowiedzi w R-M6-006/007, a wariant ją ma (${p.correct})`);
      else if (oczek !== p.correct) e.push(`${m}: wyrocznia ${oczek}, wariant ${p.correct}`);
      if (p.correct !== t.bounds[level]!.expected[idx]) e.push(`${m}: poprawna ${p.correct} ≠ expected poziomu`);
    }
  }
  return e;
}

/** list-hand (SC-10): ręka z listy wpisów szablonu, odpowiedź dokładnie z wpisu klasy ręki (R-M4-010), klasa w jednym wpisie. */
export function bledyListHand(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'list-hand');
  const d = t.decisions[idx]!;
  if (d.kind !== 'list-hand') return e;
  const uzyte = new Set<string>();
  for (const level of t.levels as ScenarioLevel[]) {
    for (let seed = 1; seed <= LOSOWANIA_HO; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'list-hand') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const hc = classOf(v.hero[0], v.hero[1]);
      uzyte.add(hc);
      const wpisy = d.entries.filter((x) => x.hands.includes(hc));
      if (wpisy.length !== 1) { e.push(`${m}: klasa ${hc} w ${wpisy.length} wpisach`); continue; }
      const w = wpisy[0]!;
      const poprawne = typeof w.correct === 'string' ? [w.correct] : [...w.correct];
      if (p.handClass !== hc) e.push(`${m}: handClass ${p.handClass} ≠ ${hc}`);
      if (p.correct !== poprawne[0]) e.push(`${m}: correct ${p.correct} ≠ ${poprawne[0]}`);
      if (JSON.stringify(p.acceptable) !== JSON.stringify(w.acceptable ?? [])) e.push(`${m}: acceptable ${JSON.stringify(p.acceptable)} ≠ wpis`);
      if (p.correct !== t.bounds[level]!.expected[idx]) e.push(`${m}: poprawna ${p.correct} ≠ expected poziomu`);
    }
  }
  const lista = d.entries.flatMap((x) => x.hands);
  if (![...uzyte].every((hc) => lista.includes(hc))) e.push(`${t.id}: wylosowano klasę spoza listy`);
  return e;
}

/** turn-bet (SC-20): rywal z drawem do koloru (4 karty z turnem), outy z przejścia po talii, e = N/46 (pokazane), N/44 (dokładne), ceny z żetonów, margines ≥ δ, ręka gracza silna i na prowadzeniu. */
export function bledyTurnBet(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'turn-bet');
  const d = t.decisions[idx]!;
  if (d.kind !== 'turn-bet') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const b = t.bounds[level]!;
    const delta = b.margins?.[idx]?.min ?? b.marginMin;
    if (delta === undefined) throw new Error(`wyrocznia: brak δ w ${t.id} ${level}`);
    for (let seed = 1; seed <= LOSOWANIA_HO; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'turn-bet') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const turn = v.board.slice(0, 4);
      const znane = new Set<Card>([...v.hero, ...v.villain, ...turn]);
      if (!d.pots.includes(p.pot)) e.push(`${m}: pula ${p.pot} spoza listy`);
      const bs = Math.round(p.pot * d.small), bb = Math.round(p.pot * d.big);
      if (p.betSmall !== bs || p.betBig !== bb) e.push(`${m}: zakłady ${p.betSmall}/${p.betBig} ≠ ${bs}/${bb}`);
      const cena = (bet: number) => bet / (p.pot + 2 * bet);
      let n = 0, remisy = 0;
      const wygrywa = new Set<Card>();
      for (const c of FULL_DECK) {
        if (znane.has(c)) continue;
        const [r, h] = [silaReki([...v.villain, ...turn, c]), silaReki([...v.hero, ...turn, c])];
        if (r < h) { n++; wygrywa.add(c); } else if (r === h) remisy++;
      }
      const kolor = [0, 1, 2, 3].find((s) => [...v.villain, ...turn].filter((c) => suitOf(c) === s).length === 4);
      if (kolor === undefined) e.push(`${m}: rywal nie ma drawa do koloru`);
      else {
        const outy = FULL_DECK.filter((c) => suitOf(c) === kolor && !znane.has(c));
        if (outy.length !== wygrywa.size || !outy.every((c) => wygrywa.has(c))) e.push(`${m}: wygrywające karty rivera ≠ pozostałe karty koloru (outy nieczyste)`);
      }
      if (remisy !== 0) e.push(`${m}: remisy ${remisy}`);
      if (Math.abs(p.hit - n / 46) > 1e-12) e.push(`${m}: hit ${p.hit} ≠ ${n}/46`);
      if (Math.abs(p.requiredSmall - cena(bs)) > 1e-12 || Math.abs(p.requiredBig - cena(bb)) > 1e-12) e.push(`${m}: ceny ${p.requiredSmall}/${p.requiredBig} ≠ z żetonów`);
      if (!(n / 46 - cena(bs) >= delta - 1e-12)) e.push(`${m}: szansa ${n}/46 nie przewyższa ceny małego o ${delta}`);
      if (!(cena(bb) - n / 44 >= delta - 1e-12)) e.push(`${m}: cena dużego nie przewyższa N/44 o ${delta}`);
      if (p.correct !== 'bet-big') e.push(`${m}: poprawna ${(p as { correct: string }).correct}`);
      // ręka gracza: na prowadzeniu i zrobiona z kartą gracza (para kieszonkowa albo karta w parze ze stołem, w tym dwie pary i wyżej)
      if (!(silaReki([...v.hero, ...turn]) < silaReki([...v.villain, ...turn]))) e.push(`${m}: ręka gracza nie prowadzi wobec rywala na turnie`);
      const hr = v.hero.map(rankOf), tr = turn.map(rankOf);
      if (!(hr[0] === hr[1] || hr.some((r) => tr.includes(r)))) e.push(`${m}: ręka gracza bez pary z kartą gracza`);
    }
  }
  return e;
}

/** pick-hand (SC-23): V, F i SDV obu rąk z pełnego przejścia po talii; odpowiedź z reguły R-M8-007 (blockers: obie SDV = 0, mniej sprawdzających, nie mniej pasujących). */
export function bledyPickHand(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'pick-hand');
  const d = t.decisions[idx]!;
  if (d.kind !== 'pick-hand') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    for (let seed = 1; seed <= LOSOWANIA_HO; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'pick-hand') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const licz = (h: readonly [Card, Card]) => {
        const martwe = new Set<Card>([...h, ...v.board]);
        const moja = silaReki([...h, ...v.board]);
        let V = 0, F = 0, w = 0, r = 0;
        for (let a = 0; a < 52; a++) for (let c = a + 1; c < 52; c++) {
          if (martwe.has(a) || martwe.has(c)) continue;
          const hc = classOf(a, c);
          const kal = d.calls.includes(hc), fol = d.folds.includes(hc);
          if (!kal && !fol) continue;
          if (kal) V++; else F++;
          const s = silaReki([a, c, ...v.board]);
          if (moja < s) w++; else if (moja === s) r++;
        }
        return { V, F, sdv: V + F === 0 ? 0 : (w + r / 2) / (V + F) };
      };
      const [x, y] = [licz(p.hands[0]), licz(p.hands[1])];
      if (x.V !== p.calls[0] || y.V !== p.calls[1] || x.F !== p.folds[0] || y.F !== p.folds[1]) e.push(`${m}: V/F ${p.calls}/${p.folds} ≠ ${x.V},${y.V}/${x.F},${y.F}`);
      if (Math.abs(x.sdv - p.sdv[0]) > 1e-9 || Math.abs(y.sdv - p.sdv[1]) > 1e-9) e.push(`${m}: SDV ${p.sdv} ≠ ${x.sdv},${y.sdv}`);
      let oczek: 'hand-a' | 'hand-b' | null = null;
      if (d.mode === 'showdown') oczek = x.sdv === 0 && y.sdv > 0 ? 'hand-a' : y.sdv === 0 && x.sdv > 0 ? 'hand-b' : null;
      else if (x.sdv === 0 && y.sdv === 0) oczek = x.V < y.V && x.F >= y.F ? 'hand-a' : y.V < x.V && y.F >= x.F ? 'hand-b' : null;
      if (oczek === null) e.push(`${m}: brak jednoznacznej odpowiedzi, a wariant ma ${p.correct}`);
      else if (oczek !== p.correct) e.push(`${m}: wyrocznia ${oczek}, wariant ${p.correct}`);
      if (new Set([...p.hands[0], ...p.hands[1], ...v.board]).size !== 9) e.push(`${m}: powtórzona karta`);
    }
  }
  return e;
}

/** river-catch (SC-24, 31): bluff-catcher = dokładnie jedna para z kartą gracza (bez trójki, dwóch par, koloru, strita), cena S/(P+2S), odpowiedź = udział blefów > cena, margines w granicach poziomu. */
export function bledyRiverCatch(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'river-catch');
  const d = t.decisions[idx]!;
  if (d.kind !== 'river-catch') return e;
  for (const level of t.levels as ScenarioLevel[]) {
    const b = t.bounds[level]!;
    const mmin = b.margins?.[idx]?.min ?? b.marginMin ?? 0;
    const mmax = b.margins?.[idx]?.max ?? b.marginMax ?? null;
    for (let seed = 1; seed <= LOSOWANIA_HO; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'river-catch') { e.push(`${m}: punkt ${p?.point}`); continue; }
      if (!d.pots.includes(p.pot)) e.push(`${m}: pula spoza listy`);
      if (!d.fractions.some((f) => Math.round(p.pot * f) === p.bet)) e.push(`${m}: zakład ${p.bet} ≠ zaokrąglenie puli × ułamek`);
      if (!d.bluffShares.includes(p.bluffShare)) e.push(`${m}: udział blefów ${p.bluffShare} spoza listy`);
      const need = p.bet / (p.pot + 2 * p.bet);
      if (Math.abs(p.required - need) > 1e-12) e.push(`${m}: cena ${p.required} ≠ ${need}`);
      const marg = Math.abs(p.bluffShare - need);
      if (!(marg >= mmin - 1e-12 && (mmax === null || marg < mmax))) e.push(`${m}: margines ${marg.toFixed(4)} poza [${mmin}; ${mmax}) poziomu`);
      const oczek = p.bluffShare > need ? 'call' : 'fold';
      if (oczek !== p.correct || oczek !== b.expected[idx]) e.push(`${m}: wyrocznia ${oczek}, wariant ${p.correct}, expected ${b.expected[idx]}`);
      // ręka: dokładnie jedna para z kartą gracza, bez trójki, dwóch par, koloru i strita na 7 kartach
      const wszystkie = [...v.hero, ...v.board];
      const licz = new Map<number, number>();
      for (const c of wszystkie) licz.set(rankOf(c), (licz.get(rankOf(c)) ?? 0) + 1);
      const hr = v.hero.map(rankOf);
      // para na stole (bez karty gracza) jest dozwolona (D-1143: gra jak jedna para gracza); liczy się dokładnie jedna para z kartą gracza i brak trójki
      const zGracza = [...licz.entries()].filter(([r, n]) => n >= 2 && hr.includes(r));
      if (zGracza.length !== 1 || zGracza[0]![1] !== 2 || [...licz.values()].some((n) => n >= 3)) e.push(`${m}: ręka nie jest jedną parą z kartą gracza`);
      if (kolor5(wszystkie) || piec(wszystkie.map(rankOf))) e.push(`${m}: kolor albo strit u gracza`);
      if (v.board.length !== 5) e.push(`${m}: stół ${v.board.length}`);
    }
  }
  return e;
}
