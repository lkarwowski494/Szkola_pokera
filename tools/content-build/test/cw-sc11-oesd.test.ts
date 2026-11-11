// CW (rola 06, fix): ŚR-005 = 06-tresci-005 z recenzji CQ (docs/tresci/recenzje/recenzja-co-ad62a2d.md) i nowe znalezisko CW-1
// (przypadek 1 zadania m5.l3.c-btn). Źródło szczebla 2 (GTO Wizard, Flop Heuristics: IP C-Betting in Cash Games, odczyt 2026-11-11)
// rozdziela flopy „Disconnected” (częsty c-bet 33%) i „OESD possible” („increased use of the 66% pot bet size, but decreased overall
// betting frequency”); „często i mało” (R-M5-007) wolno uczyć tylko na flopach, na których nikt nie może mieć OESD (D-856, D-858).
// Wyrocznia możliwego OESD liczona od zera z rang, niezależnie od texture.ts: OESD = cztery kolejne rangi domykane z obu końców
// (definicja źródła: „will make a straight if a card at either end their four completes; an 8-out straight draw”), więc okno nie
// zawiera asa (A-2-3-4 i J-Q-K-A domyka tylko jeden koniec). Przegląd wszystkich par rang gracza.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { classifyFlop, FULL_DECK, generateVariant, rankOf, textureMatches, type GeneratorTemplate, type TextureFilter } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { loadScenarioTemplates } from '../src/scenariusze';
import { content } from './kit';

const root = resolve(import.meta.dirname, '../../..');
/** Języki z własnymi plikami treści (pl + 11 przekładów, jak w poleceniu CW). */
const JEZYKI_TRESCI = ['pl', 'en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt-BR', 'pt', 'vi', 'zh-Hant'] as const;

/** Wyrocznia: czy jakaś ręka (dwie rangi gracza) daje z flopem cztery kolejne rangi otwarte z obu stron. Rangi 0 = 2 … 12 = A. */
export function oesdMozliwyZRang(flop: readonly number[]): boolean {
  // pozycje 1…14: as jako 1 i 14; okno czterech kolejnych pozycji [lo, lo+3] jest otwarte z obu stron, gdy lo−1 ≥ 1 i lo+4 ≤ 14
  const poz = (r: number) => (r === 12 ? [1, 14] : [r + 2]);
  for (let a = 0; a < 13; a++) {
    for (let b = a; b < 13; b++) {
      const zajete = new Set([...flop, a, b].flatMap(poz));
      for (let lo = 2; lo <= 10; lo++) if ([0, 1, 2, 3].every((k) => zajete.has(lo + k))) return true;
    }
  }
  return false;
}

const wszystkieFlopy: number[][] = [];
for (let a = 0; a < 52; a++) for (let b = a + 1; b < 52; b++) for (let c = b + 1; c < 52; c++) wszystkieFlopy.push([FULL_DECK[a]!, FULL_DECK[b]!, FULL_DECK[c]!]);

describe('CW ŚR-005: tekstura zna możliwy OESD (pole oesdPossible = wyrocznia z rang)', () => {
  it('na wszystkich 22 100 flopach classifyFlop(...).oesdPossible równa się wyroczni', () => {
    const bledy: string[] = [];
    for (const f of wszystkieFlopy) {
      const w = oesdMozliwyZRang(f.map(rankOf));
      if ((classifyFlop(f) as { oesdPossible?: unknown }).oesdPossible !== w && bledy.length < 5) bledy.push(`${f.join(',')}: wyrocznia ${w}`);
    }
    expect(bledy).toEqual([]);
  });

  // Recenzja CQ podała 84: pominęła 6 układów Q/K z 3-2, 4-2 i 5-2, na których 4-5 daje 2-3-4-5 domykane asem albo szóstką (8 outów,
  // OESD według definicji źródła). Poprawnie 90 (D-856).
  it('rachunek: z 138 układów rang wysokich flopów półpołączonych 90 pozwala na OESD (recenzja CQ: 84, bez okna 2-3-4-5)', () => {
    const uklady = new Map<string, boolean>();
    for (const f of wszystkieFlopy) {
      const t = classifyFlop(f);
      if (t.height !== 'high' || t.ranks !== 'semi-connected') continue;
      const r = f.map(rankOf).sort((x, y) => y - x);
      uklady.set(r.join('-'), oesdMozliwyZRang(r));
    }
    expect(uklady.size).toBe(138);
    expect([...uklady.values()].filter(Boolean).length).toBe(90);
    expect(oesdMozliwyZRang([10, 1, 0])).toBe(true); // Q-3-2: 4-5 daje 2-3-4-5
  });

  it('filtr tekstury oesdPossible: false przepuszcza tylko flopy bez możliwego OESD', () => {
    const filtr = { oesdPossible: false } as TextureFilter;
    for (const f of wszystkieFlopy.slice(0, 3000)) expect(textureMatches(classifyFlop(f), filtr)).toBe(!oesdMozliwyZRang(f.map(rankOf)));
  });
});

describe('CW ŚR-005: SC-11 średni nie uczy „często i mało” na flopie z możliwym OESD', () => {
  const t = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template).find((x) => x.id === 'sc-11')!;
  const gen = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  const ctx = {
    spots: compileRanges(join(root, 'content')).spots,
    thresholds: { mixedMin: 0.035, mixedLow: 0.25 },
    cbetCases: content.evalRules.find((r) => r.id === 'R-M5-007')!.check.cases!,
  };
  for (const level of ['latwy', 'sredni'] as const) {
    it(`${level}: ziarna 1–400 dają flopy bez możliwego OESD (wyrocznia z rang)`, () => {
      const bledy: string[] = [];
      for (let seed = 1; seed <= 400 && bledy.length < 5; seed++) {
        const v = generateVariant(gen, level, seed, ctx);
        const flop = v.board.slice(0, 3);
        if (oesdMozliwyZRang(flop.map(rankOf))) bledy.push(`ziarno ${seed}: flop ${flop.join(',')} pozwala na OESD, a oczekiwana akcja to ${v.points.at(-1)?.correct}`);
      }
      expect(bledy).toEqual([]);
    }, 120_000);
  }

  it('granice poziomu średniego są takie same w 12 językach treści (pl + 11 przekładów)', () => {
    const plSredni = t.bounds.sredni?.flop;
    expect(plSredni).toMatchObject({ oesdPossible: false });
    for (const j of JEZYKI_TRESCI) {
      const x = loadScenarioTemplates(join(root, 'content', j, 'scenarios')).find((s) => s.template.id === 'sc-11');
      if (x) expect(x.template.bounds.sredni?.flop, j).toEqual(plSredni);
    }
  });
});

describe('CW-1 (D-858): zadanie m5.l3.c-btn nie ocenia flopu z możliwym OESD jako R-M5-007 „często i mało”', () => {
  const drill = content.lessons.flatMap((l) => l.drills).find((d) => d.id === 'm5.l3.c-btn');
  it('w treści pl żaden przypadek R-M5-007 nie pasuje do flopu z możliwym OESD', () => {
    expect(drill?.kind).toBe('cbet');
    const cases = drill!.kind === 'cbet' ? drill!.cases : [];
    const bledy: string[] = [];
    for (const f of wszystkieFlopy) {
      if (!oesdMozliwyZRang(f.map(rankOf))) continue;
      const c = cases.find((x) => textureMatches(classifyFlop(f), x.when as TextureFilter));
      if (c && (c.rule === 'R-M5-007' || c.best === 'small') && classifyFlop(f).ranks !== 'paired' && bledy.length < 5) bledy.push(`${f.join(',')}: przypadek ${c.rule} (${c.best})`);
    }
    expect(bledy).toEqual([]);
  });

  it('przypadki zadania (when) są takie same w 12 językach treści', () => {
    const czytaj = (j: string) => {
      const md = readFileSync(join(root, 'content', j, 'lessons', 'm5-l3-czestotliwosc-rozmiar.md'), 'utf8');
      const fm = parseYaml(md.split(/^---$/m)[1]!) as { drills: { id: string; cases?: { when: unknown }[] }[] };
      return fm.drills.find((d) => d.id === 'm5.l3.c-btn')!.cases!.map((c) => c.when);
    };
    const wzor = czytaj('pl');
    for (const j of JEZYKI_TRESCI) expect(czytaj(j), j).toEqual(wzor);
  });
});
