// Testy akceptacyjne liczb w wyjaśnieniach ćwiczeń i lekcji (BR-CWI-002, BR-CWI-003, BR-CWI-005, BR-CWI-006, BR-KURS-005;
// rola 07 E3 część 13, D-197). Dane z „Zakładając, że …” w BRD to przykład sprawdzający regułę, nie treść do skopiowania
// (D-197), więc każde kryterium ma trzy kontrole: (1) silnik liczb (`poker-core`, z którego liczą i budowa treści, i zadania
// generowane) daje wartość wektora z tests/wektory/brd.json; (2) treść liczy tę wielkość formułą w content/numbers.yaml
// (nie wpisuje jej ręcznie) i używa jej znacznikiem {{n:klucz}} w content/pl; (3) relacje z kryterium, które da się sprawdzić
// na treści (przybliżenie obok dokładnego, „przybliżenie”, „zawyża”, ograniczenie modelu ICM).
// Poza tym plikiem (luka dla 05/04, strategia.md §9 część 13): wyjaśnienie zadania generowanego w aplikacji (poker-core
// `generatePotOdds` itp.) nie ma portu z sygnaturą, więc „wyjaśnienie podaje …” dla zadań losowych sprawdza rola 08 po decyzji 05.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { geometricFraction, hitProbability, icmEquities, mdf, requiredEquity, ruleOf2And4, spr } from '../../../packages/poker-core/src';
import { resolveNumbers, type ResolvedNumber } from '../../../tools/content-build/src/numbers';
import { compileRanges } from '../../../tools/content-build/src/ranges';

const TRESC = fileURLToPath(new URL('../../../content/', import.meta.url));
const WEKTORY = JSON.parse(readFileSync(new URL('../../wektory/brd.json', import.meta.url), 'utf8')) as {
  id: string;
  oczekiwane: Record<string, unknown>;
  tolerancja: number | null;
}[];
const plik = parse(readFileSync(join(TRESC, 'numbers.yaml'), 'utf8')) as Record<string, { formula?: string; refs?: string[]; args?: number[] }>;
const { spots } = compileRanges(TRESC);
const LICZBY = resolveNumbers(plik as never, (id) => spots.find((r) => r.id === id));

/** Teksty treści polskiej: klucz → pliki, w których jest użyty znacznikiem {{n:klucz}}. */
const UZYCIA = new Map<string, Set<string>>();
const TEKSTY = new Map<string, string>();
(function chodz(d: string) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const s = join(d, e.name);
    if (e.isDirectory()) chodz(s);
    else if (/\.(md|ya?ml)$/.test(e.name)) {
      const t = readFileSync(s, 'utf8');
      TEKSTY.set(s, t);
      for (const m of t.matchAll(/\{\{n:([a-z0-9.\-]+)\}\}/gi)) {
        const k = m[1] as string;
        if (!UZYCIA.has(k)) UZYCIA.set(k, new Set());
        UZYCIA.get(k)!.add(s.slice(TRESC.length));
      }
    }
  }
})(join(TRESC, 'pl'));

function wejscia(k: string): number[] {
  const e = plik[k]!;
  return e.refs ? e.refs.map((r) => LICZBY.get(r)!.value) : (e.args ?? []);
}
const rowne = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => Math.abs(x - (b[i] as number)) < 1e-9);
/** Liczby treści z formułą `formula` i danymi wejściowymi `dane` (kolejność jak w poker-core). */
function zFormula(formula: string, dane: number[]): ResolvedNumber[] {
  return Object.keys(plik)
    .filter((k) => plik[k]!.formula === formula && rowne(wejscia(k), dane))
    .map((k) => LICZBY.get(k)!);
}
const wektor = (id: string, pole: string) => {
  const w = WEKTORY.find((v) => v.id === id)!;
  return { oczek: Number(w.oczekiwane[pole]), tol: Math.max(w.tolerancja ?? 0, 5e-5) };
};
/** Klucze z formułą `formula` użyte w content/pl (wielkość liczona, nie wpisana). */
const uzyteZFormula = (formula: string) => Object.keys(plik).filter((k) => plik[k]!.formula === formula && UZYCIA.has(k));
const tekst = (rel: string) => TEKSTY.get(join(TRESC, rel))!;
describe('AK-BR-CWI-002: wyjaśnienie sprawdzenia (RD-01, RD-02, RD-08)', () => {
  it('AK-BR-CWI-002-a pula 100, zakład 50: wymagane equity 25% (RD-01-W1) i MDF 66,67% (RD-02-W1); obie wielkości liczone w treści', () => {
    const e = wektor('RD-01-W1', 'e [-]');
    const m = wektor('RD-02-W1', 'MDF [-]');
    expect(Math.abs(requiredEquity(100, 50) - e.oczek)).toBeLessThanOrEqual(e.tol);
    expect(Math.abs(mdf(100, 50) - m.oczek)).toBeLessThanOrEqual(m.tol);
    expect(uzyteZFormula('requiredEquity'), 'requiredEquity w content/pl').not.toEqual([]);
    expect(uzyteZFormula('mdf'), 'mdf w content/pl').not.toEqual([]);
  });
  it('AK-BR-CWI-002-b equity 30%, pula 100, zakład 50: wartość sprawdzenia +10 (RD-08-W2) — silnik liczb ma funkcję EV', async () => {
    const w = wektor('RD-08-W2', 'EV [żetony]');
    const pc = (await import('../../../packages/poker-core/src')) as Record<string, unknown>;
    const ev = (pc.callEv ?? pc.evCall ?? pc.expectedValueOfCall) as ((e: number, pot: number, bet: number) => number) | undefined;
    expect(ev, 'poker-core bez funkcji EV sprawdzenia (callEv(equity, pula po zakładzie, dopłata))').toBeTypeOf('function');
    expect(Math.abs(ev!(0.3, 100 + 50, 50) - w.oczek)).toBeLessThanOrEqual(w.tol); // callEv(equity, pula po zakładzie, dopłata)
  });
  it('AK-BR-CWI-002-c zakład 0 (RD-01-W4) w treści → budowa treści odrzuca liczbę (ER-11)', () => {
    expect(() => resolveNumbers({ p: { value: 100, unit: 'count' }, b: { value: 0, unit: 'count' }, e: { formula: 'requiredEquity', refs: ['p', 'b'], unit: 'percent' } } as never)).toThrow();
  });
});

describe('AK-BR-CWI-003 i AK-BR-KURS-005: szanse trafienia i reguła 2 i 4 (RD-04, RD-05)', () => {
  it('AK-BR-CWI-003-a 9 outów, 47 kart, 2 do odkrycia: 34,97% (RD-04-W1); szanse w treści liczone formułą', () => {
    const w = wektor('RD-04-W1', 'p [-]');
    expect(Math.abs(hitProbability(9, 47, 2) - w.oczek)).toBeLessThanOrEqual(w.tol);
    expect(uzyteZFormula('hitProbability')).not.toEqual([]);
  });
  it('AK-BR-CWI-003-b 0 outów: 0% (RD-04-W4) — silnik i budowa treści dają 0, nie błąd', () => {
    expect(hitProbability(0, 47, 2)).toBe(wektor('RD-04-W4', 'p [-]').oczek);
    const r = resolveNumbers({ o: { value: 0, unit: 'count' }, n: { value: 47, unit: 'count' }, k: { value: 2, unit: 'count' }, p: { formula: 'hitProbability', refs: ['o', 'n', 'k'], unit: 'percent' } } as never);
    expect(r.get('p')!.value).toBe(0);
  });
  it('AK-BR-KURS-005-a przybliżenie 36% (RD-05-W1); każde przybliżenie z reguły 2 i 4 w treści stoi w pliku z dokładnym wynikiem dla tych outów i słowem „przybliżenie”', () => {
    expect(ruleOf2And4(9, 2) * 100).toBeCloseTo(wektor('RD-05-W1', 'p [%]').oczek, 9);
    const przybl = uzyteZFormula('ruleOf2And4');
    expect(przybl).not.toEqual([]);
    const braki: string[] = [];
    for (const k of przybl) {
      const [outy, karty] = wejscia(k);
      const dokladne = uzyteZFormula('hitProbability').filter((d) => wejscia(d)[0] === outy && wejscia(d)[2] === karty);
      for (const p of UZYCIA.get(k)!) {
        const obok = dokladne.some((d) => UZYCIA.get(d)!.has(p));
        if (!obok || !/przybliż/i.test(tekst(p))) braki.push(`${k} w ${p}${obok ? '' : ' (bez dokładnego)'}${/przybliż/i.test(tekst(p)) ? '' : ' (bez „przybliżenie”)'}`);
      }
    }
    expect(braki, 'przybliżenia bez dokładnego wyniku albo bez słowa „przybliżenie” (zgłoszenie dla 06)').toEqual([]);
  });
  it('AK-BR-KURS-005-b 15 outów: 60% (RD-05-W3) wobec dokładnego 54,12%; przybliżenie zawyżające o ponad 3 pp ma w pliku słowo „zawyża”', () => {
    expect(ruleOf2And4(15, 2) * 100).toBeCloseTo(wektor('RD-05-W3', 'p [%]').oczek, 9);
    expect(hitProbability(15, 47, 2)).toBeCloseTo(1 - 496 / 1081, 9); // rachunek: 1 − C(32,2)/C(47,2)
    const braki: string[] = [];
    for (const k of uzyteZFormula('ruleOf2And4')) {
      const [outy, karty] = wejscia(k) as [number, 1 | 2];
      const nieznane = karty === 2 ? 47 : 46;
      if (LICZBY.get(k)!.value - hitProbability(outy, nieznane, karty) <= 0.03) continue;
      for (const p of UZYCIA.get(k)!) if (!/zawyż/i.test(tekst(p))) braki.push(`${k} w ${p}`);
    }
    expect(braki, 'przybliżenie zawyża o > 3 pp bez słowa „zawyża” (zgłoszenie dla 06)').toEqual([]);
  });
});

describe('AK-BR-CWI-005: equity ICM trzech graczy (RD-09-W1)', () => {
  it('AK-BR-CWI-005-a stacki 5000/3000/2000, wypłaty 65/35: 44,375%, 32,625%, 23% (RD-09-W1); equity ICM w treści liczone formułą', () => {
    const oczek = String(WEKTORY.find((v) => v.id === 'RD-09-W1')!.oczekiwane['equity [%]']).split(';').map((x) => Number(x.trim().replace(',', '.')) / 100);
    icmEquities([5000, 3000, 2000], [0.65, 0.35]).forEach((v, i) => expect(Math.abs(v - (oczek[i] as number))).toBeLessThan(1e-5));
    expect(uzyteZFormula('icm')).not.toEqual([]);
  });
  it('AK-BR-CWI-005-b każdy plik z equity ICM nazywa ograniczenie modelu (umiejętności i pozycja)', () => {
    const pliki = [...new Set(uzyteZFormula('icm').flatMap((k) => [...UZYCIA.get(k)!]))];
    expect(pliki).not.toEqual([]);
    const braki = pliki.filter((p) => !(/umiejętn/i.test(tekst(p)) && /pozycj/i.test(tekst(p))));
    expect(braki, 'pliki z ICM bez ograniczenia modelu (zgłoszenie dla 06)').toEqual([]);
  });
});

describe('AK-BR-CWI-006: SPR i rozmiar geometryczny (RD-06, RD-07)', () => {
  it('AK-BR-CWI-006-a stack 100, pula 10: SPR 10 (RD-06-W1)', () => {
    expect(spr(100, 10)).toBe(wektor('RD-06-W1', 'SPR [-]').oczek);
  });
  it('AK-BR-CWI-006-b SPR 4, dwie ulice: 100% puli (RD-07-W1); rozmiar geometryczny w treści liczony formułą', () => {
    const w = wektor('RD-07-W1', 'f [-]');
    expect(Math.abs(geometricFraction(4, 2) - w.oczek)).toBeLessThanOrEqual(w.tol);
    expect(uzyteZFormula('geometric'), 'formuła geometric w content/pl').not.toEqual([]);
  });
});
