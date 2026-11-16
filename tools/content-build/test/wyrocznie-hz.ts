// IE (D-1872…D-1875): wyrocznie zgodności na treści pl dla rodzajów spr-call (SC-26), check-raise (SC-16), turn-action (SC-18, SC-21), geo-size (SC-27) i nit-3bet (SC-30).
// Niezależne od generatora (scenario-gen.ts) i od funkcji grading/math z poker-core: ręce, pary, outy i tekstura liczone tu od zera z kart (pełne przejście po talii),
// ceny, ułamki geometryczne i górne x% liczone wprost z liczb szablonu i macierzy equity169. Dane zakresów i liczby to dane treści, nie logika generatora.
// Każda funkcja zwraca listę błędów (pusta = zgodne). Wzór: wyrocznie-ho.ts (KO-111).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { classOf, generateVariant as generateVariantSilnik, rankOf, suitOf, type Card, type Equity169Data, type GeneratorContext, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { number } from './kit';
import { outyFlopu, piec, zakresObrony, type Generuj } from './wyrocznie-ho';

export const LOSOWANIA_HZ = 150;
const RANGI = '23456789TJQKA';
const T = RANGI.indexOf('T');
const gen = (t: ScenarioTemplate) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;
const bliskie = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;
const rangiKart = (c: readonly Card[]) => c.map(rankOf);
const najwiecejWKolorze = (c: readonly Card[]) => Math.max(...[0, 1, 2, 3].map((s) => c.filter((x) => suitOf(x) === s).length));

type Granice = { expected: string[]; sprRange?: [number, number]; pairKind?: string[]; kickerMin?: string; kickerMax?: string; turnClass?: string; flopMiss?: boolean; flopHighMin?: string; flopBroadwayMax?: number; draws?: string[]; flop?: { suits?: string[]; ranks?: string[] }; marginMin?: number };
const granice = (t: ScenarioTemplate, level: ScenarioLevel) => t.bounds[level] as unknown as Granice;

/** Rodzaj pary gracza z kartą gracza względem stołu (flop albo turn bez pary na stole), liczony z rang; null = brak pary z kartą gracza albo ręka lepsza niż jedna para (dwie pary, set). */
function rodzajPary(hero: readonly Card[], board: readonly Card[]): { rodzaj: 'overpair' | 'second' | 'underpair' | 'top' | 'low'; kicker: number | null } | null {
  const [a, b] = rangiKart(hero) as [number, number];
  const stol = [...new Set(rangiKart(board))].sort((x, y) => y - x);
  if (stol.length < board.length) return null; // zakłada stół niesparowany (szablony HZ: reject stol-sparowany)
  const top = stol[0]!;
  if (a === b) {
    if (stol.includes(a)) return null; // set
    return { rodzaj: a > top ? 'overpair' : a > stol[1]! ? 'second' : 'underpair', kicker: null };
  }
  const trafione = [a, b].filter((r) => stol.includes(r));
  if (trafione.length !== 1) return null; // brak pary albo dwie pary
  const r = trafione[0]!;
  return { rodzaj: r === top ? 'top' : r === stol[1] ? 'second' : 'low', kicker: r === a ? b : a };
}

/** spr-call (SC-26, R-M9-001/002/003): ręka z zakresu obrony BB, SPR = stack ÷ pula w przedziale poziomu, cena S ÷ (P + 2S), najwyższa para albo lepsza (overpair/top), kicker wg poziomu. */
export function bledySprCall(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'spr-call');
  const d = t.decisions[idx]!;
  if (d.kind !== 'spr-call') return e;
  const wZakresie = zakresObrony(ctx, d.spot);
  const sprCommit = number('spr.commit');
  for (const level of t.levels as ScenarioLevel[]) {
    const b = granice(t, level);
    const [sprMin, sprMax] = b.sprRange!;
    if (!(sprMin <= sprCommit && sprCommit <= sprMax)) e.push(`${t.id} ${level}: spr.commit ${sprCommit} poza sprRange [${sprMin}; ${sprMax}] (situation mówi „SPR ok. ${sprCommit}”)`);
    for (let seed = 1; seed <= LOSOWANIA_HZ; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'spr-call') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const hc = classOf(v.hero[0], v.hero[1]);
      if (!wZakresie(hc)) e.push(`${m}: ${hc} poza zakresem obrony ${d.spot}`);
      if (!d.pots.includes(p.pot) || !d.stacks.includes(p.stack)) e.push(`${m}: pula ${p.pot} albo stack ${p.stack} spoza listy szablonu`);
      const spr = p.stack / p.pot;
      if (!bliskie(p.spr, spr)) e.push(`${m}: spr ${p.spr}, rachunek ${spr}`);
      if (spr < sprMin - 1e-9 || spr > sprMax + 1e-9) e.push(`${m}: SPR ${spr} poza [${sprMin}; ${sprMax}]`);
      if (!bliskie(p.required, p.stack / (p.pot + 2 * p.stack), 1e-12)) e.push(`${m}: cena ${p.required}, rachunek S÷(P+2S) = ${p.stack / (p.pot + 2 * p.stack)}`);
      if (new Set(rangiKart(flop)).size < 3 || najwiecejWKolorze(flop) >= 3) e.push(`${m}: stół sparowany albo jednokolorowy: ${flop.join(' ')}`);
      const para = rodzajPary(v.hero, flop);
      if (!para || (para.rodzaj !== 'overpair' && para.rodzaj !== 'top')) { e.push(`${m}: ręka ${v.hero.join(' ')} na ${flop.join(' ')} to ${para?.rodzaj ?? 'bez pary z kartą gracza'}, nie najwyższa para ani lepsza`); continue; }
      if (p.pairKind !== para.rodzaj) e.push(`${m}: pairKind ${p.pairKind}, wyrocznia ${para.rodzaj}`);
      if (b.pairKind && !b.pairKind.includes(para.rodzaj)) e.push(`${m}: rodzaj pary ${para.rodzaj} poza poziomem [${b.pairKind}]`);
      if (para.rodzaj === 'top') {
        if (b.kickerMin !== undefined && para.kicker! < RANGI.indexOf(b.kickerMin)) e.push(`${m}: kicker ${RANGI[para.kicker!]} poniżej ${b.kickerMin}`);
        if (b.kickerMax !== undefined && para.kicker! > RANGI.indexOf(b.kickerMax)) e.push(`${m}: kicker ${RANGI[para.kicker!]} powyżej ${b.kickerMax}`);
      }
      if (p.correct !== 'call' || b.expected[idx] !== 'call') e.push(`${m}: poprawna ${p.correct}`);
      if (p.required >= 0.5) e.push(`${m}: cena ${p.required} ≥ 0,5: sprawdzenie all-inu nie byłoby „najwyższą parą na niskim SPR”`);
      if (e.length >= 5) return e;
    }
  }
  return e;
}

/** Tekstura flopu z rang wg opisu w texture.ts (okno pięciu kolejnych rang, as także jako 1): connected (3 rangi w oknie) / semi-connected (2) / disconnected. */
function rangiFlopuTekstura(flop: readonly Card[]): 'paired' | 'connected' | 'semi-connected' | 'disconnected' {
  const r = [...new Set(rangiKart(flop))];
  if (r.length < 3) return 'paired';
  const z = new Set(r);
  if (z.has(12)) z.add(-1);
  let max = 0;
  for (let lo = -1; lo <= 8; lo++) max = Math.max(max, [0, 1, 2, 3, 4].filter((k) => z.has(lo + k)).length);
  return max >= 3 ? 'connected' : max === 2 ? 'semi-connected' : 'disconnected';
}

/** Outy wprost z talii dla ręki bez pary na flopie: osobno do koloru i do strita (po jednej karcie). */
function outyRodzajowe(hero: readonly Card[], flop: readonly Card[], wszystkie: readonly Card[]): { kolor: number; strit: number } {
  const baza = [...hero, ...flop];
  const wolne = wszystkie.filter((c) => !baza.includes(c));
  const kolor = wolne.filter((c) => [0, 1, 2, 3].some((s) => [...baza, c].filter((x) => suitOf(x) === s).length >= 5)).length;
  const strit = wolne.filter((c) => piec([...baza, c].map(rankOf))).length;
  return { kolor, strit };
}

/** check-raise (SC-16, R-M6-008/010): BB z drawem (kolor albo strit otwarty, ≥ 8 outów) bez pary wobec małego c-betu; ceny BTN po podbiciu (R − c) ÷ (pula + 2R) z żetonów. */
export function bledyCheckRaise(t: ScenarioTemplate, ctx: GeneratorContext, talia: readonly Card[], generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'check-raise');
  const d = t.decisions[idx]!;
  if (d.kind !== 'check-raise') return e;
  const wZakresie = zakresObrony(ctx, d.spot);
  if (d.multipliers.big !== number('xr.mult.example')) e.push(`${t.id}: multipliers.big ${d.multipliers.big} ≠ xr.mult.example ${number('xr.mult.example')}`);
  if (d.multipliers.small !== undefined && d.multipliers.small !== number('xr.too-small.mult')) e.push(`${t.id}: multipliers.small ${d.multipliers.small} ≠ xr.too-small.mult ${number('xr.too-small.mult')}`);
  if (!bliskie(d.cbet, number('cbet.size.small'), 1e-6)) e.push(`${t.id}: cbet ${d.cbet} ≠ cbet.size.small ${number('cbet.size.small')}`);
  for (const level of t.levels as ScenarioLevel[]) {
    const b = granice(t, level);
    for (let seed = 1; seed <= LOSOWANIA_HZ; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'check-raise') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const hc = classOf(v.hero[0], v.hero[1]);
      if (!wZakresie(hc)) e.push(`${m}: ${hc} poza zakresem obrony ${d.spot}`);
      const fr = rangiKart(flop);
      if (new Set(fr).size < 3) e.push(`${m}: stół sparowany ${flop.join(' ')}`);
      if (b.flopBroadwayMax !== undefined && fr.filter((r) => r >= T).length > b.flopBroadwayMax) e.push(`${m}: na flopie ${fr.filter((r) => r >= T).length} kart od T w górę (max ${b.flopBroadwayMax})`);
      const kolory = new Set(flop.map(suitOf)).size;
      const tekstura = kolory === 3 ? 'rainbow' : kolory === 2 ? 'two-tone' : 'monotone';
      if (b.flop?.suits && !b.flop.suits.includes(tekstura)) e.push(`${m}: kolory flopu ${tekstura} poza [${b.flop.suits}]`);
      const ranks = rangiFlopuTekstura(flop);
      if (b.flop?.ranks && !b.flop.ranks.includes(ranks)) e.push(`${m}: układ rang flopu ${ranks} poza [${b.flop.ranks}]`);
      // bez pary z kartą gracza (także kieszonkowej) i bez ręki zrobionej
      const [h1, h2] = rangiKart(v.hero) as [number, number];
      if (h1 === h2 || fr.includes(h1) || fr.includes(h2)) e.push(`${m}: ręka ${v.hero.join(' ')} ma parę z kartą gracza`);
      const { kolor, strit } = outyRodzajowe(v.hero, flop, talia);
      if (outyFlopu(v.hero, flop) < 8) e.push(`${m}: outów ${outyFlopu(v.hero, flop)} < 8`);
      if (p.outs !== outyFlopu(v.hero, flop)) e.push(`${m}: outs ${p.outs}, wyrocznia ${outyFlopu(v.hero, flop)}`);
      const rodzaje = [kolor > 0 && 'flush', strit >= 8 && 'oesd'].filter(Boolean) as string[];
      if (!rodzaje.includes(p.drawKind)) e.push(`${m}: drawKind ${p.drawKind}, wyrocznia [${rodzaje}] (outy: kolor ${kolor}, strit ${strit})`);
      if (b.draws && !b.draws.includes(p.drawKind)) e.push(`${m}: draw ${p.drawKind} poza poziomem [${b.draws}]`);
      // ceny z żetonów: BTN stawia c, gracz podbija do R, BTN dopłaca R − c do puli pula + c + R
      if (!d.pots.includes(p.pot)) e.push(`${m}: pula ${p.pot} spoza listy szablonu`);
      const c = p.pot * d.cbet;
      const cena = (r: number) => (r - c) / (p.pot + c + r + (r - c));
      if (!bliskie(p.cbet, c)) e.push(`${m}: c-bet ${p.cbet}, wyrocznia ${c}`);
      if (!bliskie(p.raiseBig, c * d.multipliers.big)) e.push(`${m}: raiseBig ${p.raiseBig}, wyrocznia ${c * d.multipliers.big}`);
      if (!bliskie(p.requiredBig, cena(c * d.multipliers.big), 1e-12)) e.push(`${m}: requiredBig ${p.requiredBig}, wyrocznia ${cena(c * d.multipliers.big)}`);
      if (d.multipliers.small !== undefined) {
        if (p.raiseSmall === null || !bliskie(p.raiseSmall, c * d.multipliers.small)) e.push(`${m}: raiseSmall ${p.raiseSmall}, wyrocznia ${c * d.multipliers.small}`);
        else if (p.requiredSmall === null || !bliskie(p.requiredSmall, cena(p.raiseSmall), 1e-12)) e.push(`${m}: requiredSmall ${p.requiredSmall}, wyrocznia ${cena(p.raiseSmall)}`);
        else if (!(p.requiredSmall < p.requiredBig)) e.push(`${m}: małe podbicie ma nie mniej korzystną cenę dla BTN niż duże`);
      } else if (p.raiseSmall !== null || p.requiredSmall !== null) e.push(`${m}: raiseSmall bez krotności small w szablonie`);
      if (p.correct !== 'raise-big' || b.expected[idx] !== 'raise-big') e.push(`${m}: poprawna ${p.correct}`);
      if (e.length >= 5) return e;
    }
  }
  return e;
}

const stolZeStritemWyrocznia = (rangi: readonly number[]): boolean => {
  const z = new Set(rangi);
  if (z.has(12)) z.add(-1);
  for (let lo = -1; lo <= 8; lo++) if ([0, 1, 2, 3, 4].filter((k) => z.has(lo + k)).length >= 3) return true;
  return false;
};

/** turn-action (SC-18, SC-21, R-M7-001/003): ręka z zakresu otwarcia pozycji gracza, klasa turnu, para z kartą gracza wg rodzaju poziomu, turn bez koloru i strita, brak drawa; flopMiss = flop bez pary i drawa. */
export function bledyTurnAction(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'turn-action');
  const d = t.decisions[idx]!;
  if (d.kind !== 'turn-action') return e;
  const wZakresie = zakresObrony(ctx, `rfi.${t.positions!.hero.toLowerCase()}`);
  for (const level of t.levels as ScenarioLevel[]) {
    const b = granice(t, level);
    for (let seed = 1; seed <= LOSOWANIA_HZ; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'turn-action') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const turn = v.board.slice(0, 4);
      const hc = classOf(v.hero[0], v.hero[1]);
      if (!wZakresie(hc)) e.push(`${m}: ${hc} poza zakresem otwarcia rfi.${t.positions!.hero.toLowerCase()}`);
      const fr = rangiKart(flop);
      const rt = rankOf(turn[3]!);
      if (new Set(fr).size < 3) e.push(`${m}: flop sparowany`);
      if (fr.includes(rt)) e.push(`${m}: turn paruje stół`);
      const klasa = rt > Math.max(...fr) ? 'overcard' : 'other';
      if (klasa !== b.turnClass || p.turnClass !== klasa) e.push(`${m}: klasa turnu ${klasa}, poziom ${b.turnClass}, wariant ${p.turnClass}`);
      if (b.flopHighMin && Math.max(...fr) < RANGI.indexOf(b.flopHighMin)) e.push(`${m}: najwyższa karta flopu ${RANGI[Math.max(...fr)]} poniżej ${b.flopHighMin}`);
      if (b.flop?.suits?.includes('rainbow') && b.flop.suits.length === 1 && new Set(flop.map(suitOf)).size !== 3) e.push(`${m}: flop nie jest tęczowy`);
      if (najwiecejWKolorze(turn) >= 3) e.push(`${m}: turn daje trzecią kartę koloru`);
      if (stolZeStritemWyrocznia(rangiKart(turn))) e.push(`${m}: na stole turnu trzy rangi w oknie strita`);
      const para = rodzajPary(v.hero, turn);
      if (!para) e.push(`${m}: ręka ${v.hero.join(' ')} na ${turn.join(' ')} nie ma dokładnie jednej pary z kartą gracza`);
      else {
        if (p.pairKind !== para.rodzaj) e.push(`${m}: pairKind ${p.pairKind}, wyrocznia ${para.rodzaj}`);
        if (b.pairKind && !b.pairKind.includes(para.rodzaj)) e.push(`${m}: rodzaj pary ${para.rodzaj} poza poziomem [${b.pairKind}]`);
      }
      if (outyFlopu(v.hero, turn) >= 8) e.push(`${m}: draw na turnie (${outyFlopu(v.hero, turn)} outów)`);
      if (b.flopMiss) {
        const [h1, h2] = rangiKart(v.hero) as [number, number];
        if (h1 === h2 || fr.includes(h1) || fr.includes(h2) || piec([h1, h2, ...fr]) || outyFlopu(v.hero, flop) >= 8) e.push(`${m}: flopMiss, a ręka ${v.hero.join(' ')} trafia flop ${flop.join(' ')}`);
      }
      if (p.correct !== b.expected[idx]) e.push(`${m}: poprawna ${p.correct}, poziom ${b.expected[idx]}`);
      if (e.length >= 5) return e;
    }
  }
  return e;
}

/** Łańcuch równych zakładów: ułamek f puli na każdej z n ulic; zwraca sumę wpłat (pula rośnie ×(1 + 2f)). */
function lancuchZakladow(pula: number, f: number, ulice: number): number {
  let p = pula;
  let razem = 0;
  for (let k = 0; k < ulice; k++) { const bet = p * f; razem += bet; p += 2 * bet; }
  return razem;
}

/** geo-size (SC-27, R-M9-006/009): set z karty kieszonkowej na stole niesparowanym bez koloru; ułamek geometryczny wpłaca stack dokładnie po `streets` zakładach (symulacja), mały ułamek nie. */
export function bledyGeoSize(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'geo-size');
  const d = t.decisions[idx]!;
  if (d.kind !== 'geo-size') return e;
  if (!bliskie(d.small, number('cbet.size.small'), 1e-6)) e.push(`${t.id}: small ${d.small} ≠ cbet.size.small ${number('cbet.size.small')}`);
  for (const level of t.levels as ScenarioLevel[]) {
    const b = granice(t, level);
    for (let seed = 1; seed <= LOSOWANIA_HZ; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'geo-size') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const flop = v.board.slice(0, 3);
      const [h1, h2] = rangiKart(v.hero) as [number, number];
      const fr = rangiKart(flop);
      if (h1 !== h2 || fr.filter((r) => r === h1).length !== 1 || new Set(fr).size < 3 || najwiecejWKolorze(flop) >= 3) e.push(`${m}: ręka ${v.hero.join(' ')} na ${flop.join(' ')} to nie set na stole niesparowanym bez koloru`);
      if (!d.pots.includes(p.pot) || !d.stacks.includes(p.stack)) e.push(`${m}: pula ${p.pot} albo stack ${p.stack} spoza listy szablonu`);
      const spr = p.stack / p.pot;
      if (!bliskie(p.spr, spr)) e.push(`${m}: spr ${p.spr}, rachunek ${spr}`);
      if (b.sprRange && (spr < b.sprRange[0] - 1e-9 || spr > b.sprRange[1] + 1e-9)) e.push(`${m}: SPR ${spr} poza [${b.sprRange}]`);
      if (p.streets !== d.streets) e.push(`${m}: streets ${p.streets}, szablon ${d.streets}`);
      // geometryczny: n zakładów po f puli wpłaca dokładnie stack, a f > mały ułamek
      const wplataDuzy = lancuchZakladow(p.pot, p.fractionBig, d.streets);
      if (!bliskie(wplataDuzy, p.stack, 1e-7)) e.push(`${m}: duży ułamek ${p.fractionBig} wpłaca ${wplataDuzy} bb w ${d.streets} zakładach, stack ${p.stack}`);
      if (!(p.fractionBig > d.small)) e.push(`${m}: ułamek geometryczny ${p.fractionBig} nie jest większy od małego ${d.small}`);
      if (!bliskie(p.fractionSmall, d.small, 1e-12)) e.push(`${m}: fractionSmall ${p.fractionSmall}, szablon ${d.small}`);
      const wplataMaly = lancuchZakladow(p.pot, d.small, d.streets);
      if (!bliskie(p.smallTotal, wplataMaly, 1e-9)) e.push(`${m}: smallTotal ${p.smallTotal}, symulacja ${wplataMaly}`);
      if (!(wplataMaly < p.stack - 0.5)) e.push(`${m}: mały zakład wpłaca ${wplataMaly} z ${p.stack} bb, czyli prawie cały stack (ocena „niedokładność” byłaby bez sensu)`);
      if (p.correct !== 'bet-big' || b.expected[idx] !== 'bet-big') e.push(`${m}: poprawna ${p.correct}`);
      if (e.length >= 5) return e;
    }
  }
  return e;
}

// nit-3bet (SC-30, R-M2-005): górne x% w kombinacjach wg equity klasy wobec losowej ręki; cena z żetonów; margines poziomu. Macierz z pliku narzędzia, nie z generatora.
const KORZEN = resolve(import.meta.dirname, '../../..');
const m169 = JSON.parse(readFileSync(join(KORZEN, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data;
const kombinacje = (h: string) => (h.length === 2 ? 6 : h.endsWith('s') ? 4 : 12);
function gornex(x: number): Set<string> {
  const vs = m169.classes.map((_, i) => m169.classes.reduce((s, __, j) => s + m169.pairs[i]![j]! * m169.equity[i]![j]!, 0) / m169.pairs[i]!.reduce((a, b) => a + b, 0));
  const kolej = m169.classes.map((_, i) => i).sort((a, b) => vs[b]! - vs[a]!);
  const out = new Set<string>();
  let suma = 0;
  for (const i of kolej) {
    const c = kombinacje(m169.classes[i]!);
    if (suma + c > x * 1326) break;
    suma += c;
    out.add(m169.classes[i]!);
  }
  return out;
}
function equityWobec(hc: string, zakres: Set<string>): number {
  const i = m169.classes.indexOf(hc);
  let w = 0;
  let s = 0;
  m169.classes.forEach((vc, j) => { if (zakres.has(vc)) { w += m169.pairs[i]![j]!; s += m169.pairs[i]![j]! * m169.equity[i]![j]!; } });
  return s / w;
}

export function bledyNit3bet(t: ScenarioTemplate, ctx: GeneratorContext, generateVariant: Generuj = generateVariantSilnik): string[] {
  const e: string[] = [];
  const idx = t.decisions.findIndex((d) => d.kind === 'nit-3bet');
  const d = t.decisions[idx]!;
  if (d.kind !== 'nit-3bet') return e;
  const wZakresie = zakresObrony(ctx, `rfi.${t.positions!.hero.toLowerCase()}`);
  const vpipLow = number('hud.ex.nit3bet.vpip.low');
  const vpipHigh = number('hud.ex.nit3bet.vpip.high');
  if (d.open !== number('pf.open-size')) e.push(`${t.id}: open ${d.open} ≠ pf.open-size ${number('pf.open-size')}`);
  if (d.threeBet !== number('pf.3bet.oop-total')) e.push(`${t.id}: threeBet ${d.threeBet} ≠ pf.3bet.oop-total ${number('pf.3bet.oop-total')}`);
  for (const x of d.vpips) if (x < vpipLow - 1e-12 || x > vpipHigh + 1e-12) e.push(`${t.id}: vpip ${x} poza zakresem z treści ${vpipLow}–${vpipHigh}`);
  const required = (d.threeBet - d.open) / (2 * d.threeBet + 0.5); // dopłata ÷ pula po dopłacie: 3-bet rywala + call gracza + 0,5 SB (D-1721)
  for (const level of t.levels as ScenarioLevel[]) {
    const b = granice(t, level);
    const margines = b.marginMin ?? 0;
    for (let seed = 1; seed <= LOSOWANIA_HZ; seed++) {
      const v = generateVariant(gen(t), level, seed, ctx);
      const p = v.points[idx];
      const m = `${t.id} ${level} ${seed}`;
      if (p?.point !== 'nit-3bet') { e.push(`${m}: punkt ${p?.point}`); continue; }
      const hc = classOf(v.hero[0], v.hero[1]);
      if (p.handClass !== hc) e.push(`${m}: handClass ${p.handClass}, ręka ${hc}`);
      if (!(hc.length === 3 && hc.endsWith('o'))) e.push(`${m}: ${hc} to nie offsuit bez pary`);
      if (!wZakresie(hc)) e.push(`${m}: ${hc} poza zakresem otwarcia`);
      if (!d.vpips.includes(p.vpip)) e.push(`${m}: vpip ${p.vpip} spoza listy szablonu`);
      const top = gornex(p.vpip);
      if (top.has(hc)) e.push(`${m}: ${hc} należy do górnych ${p.vpip * 100}%`);
      if (!bliskie(p.required, required, 1e-12)) e.push(`${m}: cena ${p.required}, rachunek ${required}`);
      const eq = equityWobec(hc, top);
      if (!bliskie(p.equity, eq, 1e-9)) e.push(`${m}: equity ${p.equity}, wyrocznia ${eq}`);
      if (!(eq <= required - Math.max(margines, 0.03) + 1e-12)) e.push(`${m}: equity ${eq.toFixed(4)} > cena ${required.toFixed(4)} − margines ${Math.max(margines, 0.03)}`);
      if (p.correct !== 'fold' || b.expected[idx] !== 'fold') e.push(`${m}: poprawna ${p.correct}`);
      if (e.length >= 5) return e;
    }
  }
  return e;
}
