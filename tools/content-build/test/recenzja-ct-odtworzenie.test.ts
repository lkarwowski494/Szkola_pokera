// Recenzja niezależna CT (rola 08, audit, D-043) poprawek CR 9a6f45f..cd327e9 i CS cd327e9..8133a8c.
// Raport: docs/programista/recenzje/recenzja-cs-8133a8c.md. `it.fails` = błąd istnieje (test odtwarzający); po naprawie zamienić na `it`
// (dla 08-programista-002 także przeliczyć wzorzec w tym samym commicie co podniesienie GENERATOR_WERSJA).
// Wyrocznie liczone od zera: outy z talii (karty, po których ręka gracza z jego kartą staje się stritem albo kolorem), nadkarty jako
// suma i jako unia z outami drawa, cena = zakład ÷ (pula + 2 × zakład); ocena c-betu z silnika gry na prawdziwym rozdaniu (gradeDecision).
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  akcjeSzablonu,
  applyAction,
  classOf,
  GENERATOR_WERSJA,
  generateVariant,
  gradeDecision,
  startHand,
  type Card,
  type GeneratorTemplate,
  type HandState,
  type PlayerAction,
  type ScenarioLevel,
  type TableConfig,
} from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content, kit, number } from './kit';

const root = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
const szablon = (id: string) => pl.find((t) => t.id === id)!;
const gen = (t: (typeof pl)[number]) => ({ id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions }) as GeneratorTemplate;

// ---------- (a) draw-call: outy i decyzja od zera ----------
const R = (c: number) => c >> 2;
const S = (c: number) => c & 3;
function stritNajwyzszy(karty: readonly number[]): number {
  const rangi = new Set(karty.map(R));
  for (let gora = 12; gora >= 3; gora--) {
    const potrzebne = gora === 3 ? [3, 2, 1, 0, 12] : [0, 1, 2, 3, 4].map((k) => gora - k);
    if (potrzebne.every((r) => rangi.has(r))) return gora;
  }
  return -1;
}
const kolor = (karty: readonly number[]) => [0, 1, 2, 3].find((s) => karty.filter((c) => S(c) === s).length >= 5) ?? -1;
/** Karta `c` kończy draw gracza: kolor z jego kartą (stół sam koloru nie ma) albo strit lepszy niż strit samego stołu. */
function konczy(reka: readonly number[], stol: readonly number[], c: number): boolean {
  const wszystkie = [...reka, ...stol, c];
  const k = kolor(wszystkie);
  if (k >= 0 && kolor([...stol, c]) < 0 && reka.some((h) => S(h) === k)) return true;
  const s = stritNajwyzszy(wszystkie);
  return s >= 0 && stritNajwyzszy([...stol, c]) < s;
}
const C2 = (n: number) => (n * (n - 1)) / 2;
const szansa = (o: number, n: number, karty: 1 | 2) => (karty === 1 ? o / n : 1 - C2(n - o) / C2(n));

describe('CT (a): draw-call sc-02, sc-03, sc-19 — outy z talii i decyzja przy outach drawa, unii z nadkartami i sumie (górna granica)', () => {
  for (const id of ['sc-01', 'sc-02', 'sc-03', 'sc-19']) {
    const t = szablon(id);
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${id} ${level}: 1500 wariantów`, () => {
        const bledy: string[] = [];
        for (let seed = 1; seed <= 1500 && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed);
          v.decisions.forEach((d, i) => {
            const spec = t.decisions[i] as { villain?: string };
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            const znane = new Set([...v.hero, ...stol]);
            const nieznane = Array.from({ length: 52 }, (_, c) => c).filter((c) => !znane.has(c));
            const outyDrawa = nieznane.filter((c) => konczy(v.hero, stol, c));
            const nad = [...new Set(v.hero.map(R).filter((r) => r > Math.max(...stol.map(R))))];
            const unia = new Set([...outyDrawa, ...nieznane.filter((c) => nad.includes(R(c)))]).size;
            const suma = outyDrawa.length + 3 * nad.length;
            const n = nieznane.length;
            const karty: 1 | 2 = spec.villain === 'all-in' && d.street === 'flop' ? 2 : 1;
            const cena = d.bet / (d.pot + 2 * d.bet);
            const oczek = t.bounds[level]!.expected[i];
            if (outyDrawa.length !== d.outs) bledy.push(`${seed}#${i}: outy wyroczni ${outyDrawa.length}, wariant ${d.outs}`);
            if (Math.abs(cena - d.required) > 1e-12) bledy.push(`${seed}#${i}: cena ${cena} ≠ ${d.required}`);
            if (Math.abs(szansa(outyDrawa.length, n, karty) - d.hit) > 1e-12) bledy.push(`${seed}#${i}: szansa ${d.hit} ≠ ${outyDrawa.length}/${n}`);
            for (const [nazwa, o] of [['drawa', outyDrawa.length], ['unia', unia], ['suma', suma]] as const) {
              const decyzja = szansa(o, n, karty) > cena ? 'call' : 'fold';
              if (decyzja !== oczek) bledy.push(`${seed}#${i}: outy ${nazwa} ${o} → ${decyzja}, oczekiwano ${oczek} (cena ${cena.toFixed(3)})`);
            }
            if (d.correct !== oczek) bledy.push(`${seed}#${i}: wariant uczy ${d.correct}, oczekiwano ${oczek}`);
          });
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

// ---------- (c) SC-11, SC-12: werdykty wariantu = ocena silnika gry; ręka z zakresu otwarcia BTN ----------
const BB = 100;
const cfg: TableConfig = { stacks: Array(6).fill(100 * BB), smallBlind: BB / 2, bigBlind: BB, button: 3 };
const AKCJE = ['check', 'bet-small', 'bet-big'] as const;
type AkcjaCbet = (typeof AKCJE)[number];
function flopBtn(hero: [Card, Card], villain: [Card, Card], flop: Card[]): HandState {
  const holes: ([Card, Card] | null)[] = Array(6).fill(null);
  holes[3] = hero;
  holes[5] = villain;
  let st = startHand(cfg, 1, { holes, board: flop });
  const seq: PlayerAction[] = [{ type: 'fold' }, { type: 'fold' }, { type: 'fold' }, { type: 'raise', to: Math.round(2.5 * BB) }, { type: 'fold' }, { type: 'call' }, { type: 'check' }];
  for (const a of seq) st = applyAction(st, a);
  return st;
}
const akcjaGry = (a: AkcjaCbet): PlayerAction =>
  a === 'check' ? { type: 'check' } : { type: 'bet', to: Math.round(5 * BB * number(a === 'bet-small' ? 'cbet.size.small' : 'cbet.size.big')) };
const ctx = {
  spots: compileRanges(join(root, 'content')).spots,
  thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
  cbetCases: content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!,
};
// zakres otwarcia BTN prosto z pliku zakresów (nie ze spotu skompilowanego, którego używa generator)
const pf = JSON.parse(readFileSync(join(root, 'content/ranges/preflop-6max-100bb.json'), 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };
const btn = pf.spots.find((s) => s.path === 'UTG:fold,HJ:fold,CO:fold' && s.player === 'BTN')!;
const czestoscOtwarcia = (klasa: string) => btn.actions.reduce((suma, a, i) => (a === 'fold' ? suma : suma + (btn.strategy[i]![klasa] ?? 0)), 0);

describe('CT (c): SC-11 i SC-12 z treści — oceny wariantu (to, co pokazuje ekran) równe ocenie silnika gry dla każdej akcji', () => {
  for (const id of ['sc-11', 'sc-12']) {
    const t = szablon(id);
    const regula = (t.decisions[0] as { rule: string }).rule;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${id} ${level}: 2000 wariantów, akcje ekranu = trzy akcje c-betu, werdykt = gradeDecision, ręka z zakresu otwarcia BTN`, () => {
        expect(akcjeSzablonu('cbet-case')).toEqual(AKCJE);
        const bledy: string[] = [];
        for (let seed = 1; seed <= 2000 && bledy.length < 5; seed++) {
          const v = generateVariant(gen(t), level, seed, ctx);
          const p = v.points[0]!;
          if (p.point !== 'cbet-case') { bledy.push(`${seed}: punkt ${p.point}`); continue; }
          if (!(czestoscOtwarcia(classOf(v.hero[0], v.hero[1])) > 0)) bledy.push(`${seed}: ${classOf(v.hero[0], v.hero[1])} poza zakresem otwarcia BTN`);
          const st = flopBtn(v.hero, v.villain, v.board.slice(0, 3));
          for (const a of AKCJE) {
            const f = gradeDecision(st, akcjaGry(a), kit);
            if (f.ruleId !== regula) bledy.push(`${seed}: ${a}: reguła silnika ${f.ruleId}, szablon ${regula}`);
            if (f.verdict !== p.verdicts[a]) bledy.push(`${seed}: ${a}: silnik ${f.verdict}, wariant ${p.verdicts[a]}`);
          }
        }
        expect(bledy).toEqual([]);
      }, 300_000);
    }
  }
});

// ---------- 08-programista-001 (WYSOKI): SC-12 ocenia duży c-bet jak mały, wbrew D-792 i źródłu („Size down”) ----------
describe('08-programista-001: SC-12 (niski połączony flop) — duży c-bet nie może mieć tej samej oceny co mały', () => {
  // D-792 (rola 06, CO): „SC-12 bez akcji bet-big: grading.ts ocenia ją jak mały zakład („acceptable”), a źródło mówi „Size down and bet less
  // on flops that complete straights” — nie piszemy wyjaśnienia, które musiałoby nazwać duży zakład dopuszczalnym”. CS dodał bet-big
  // z wyjaśnieniem „Duży bet jest dopuszczalny” i ekran pokazuje obu zakładom „Dopuszczalna”. Test nie wybiera naprawy: przechodzi, gdy duży
  // zakład nie jest akcją punktu na ekranie albo ma ocenę gorszą niż mały.
  it.fails('SC-12 łatwy i średni, ziarna 1–50: duży zakład oferowany na ekranie ma inną ocenę niż mały', () => {
    const t = szablon('sc-12');
    const wTresci = (t.decisions[0]!.actions as { action: string }[]).map((a) => a.action);
    const naEkranie = (akcjeSzablonu('cbet-case') ?? []).filter((a) => wTresci.includes(a));
    const bledy: string[] = [];
    for (const level of t.levels as ScenarioLevel[]) {
      for (let seed = 1; seed <= 50; seed++) {
        const p = generateVariant(gen(t), level, seed, ctx).points[0]!;
        if (p.point !== 'cbet-case' || !naEkranie.includes('bet-big')) continue;
        if (p.verdicts['bet-big'] === p.verdicts['bet-small']) bledy.push(`${level} ${seed}: bet-big ${p.verdicts['bet-big']} = bet-small`);
      }
    }
    expect(bledy).toEqual([]);
  });
});

// ---------- 08-programista-002 (ŚREDNI): zmiana wyniku generatora bez podniesienia GENERATOR_WERSJA ----------
describe('08-programista-002: to samo ziarno pod tą samą wersją generatora daje ten sam odcisk (szablony z treści)', () => {
  // Odciski policzone generatorem z cd327e9 (przed CS, GENERATOR_WERSJA = 1), sonda CT: docs/programista/dowody/ct-wersja-generatora.txt.
  // CS (nadkarty w draw-call) zmienił odcisk dla 35–63% ziaren sc-01 Ś/T, sc-02 i sc-19 przy tej samej wersji 1, więc „Zagraj jeszcze raz
  // to samo rozdanie” (ziarnoPowtorki) pokazuje po aktualizacji inne karty, a limit liczy je jako nowe rozdanie (czyPowtorkaWariantu).
  const WZORCE: { id: string; level: ScenarioLevel; seed: number; odcisk: string }[] = [
    { id: 'sc-01', level: 'sredni', seed: 1, odcisk: 'sc-01|sredni|4030/K19060/92' },
    { id: 'sc-02', level: 'latwy', seed: 3, odcisk: 'sc-02|latwy|J0T1/908142/93' },
    { id: 'sc-19', level: 'latwy', seed: 1, odcisk: 'sc-19|latwy|K061/713121/82' },
  ];
  it.fails('wersja 1: odciski ziaren wzorcowych jak przed CS (albo wersja podniesiona i wzorce przeliczone)', () => {
    for (const w of WZORCE) {
      expect({ wersja: GENERATOR_WERSJA, odcisk: generateVariant(gen(szablon(w.id)), w.level, w.seed).fingerprint }).toEqual({ wersja: 1, odcisk: w.odcisk });
    }
  });
});
