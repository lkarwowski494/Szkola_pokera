// 08-EX-4…8 (sesja HO): schemat i bramka budowania punktów spr-call, geo-size, turn-action, check-raise i nit-3bet (fixtures to nie treść aplikacji).
// Każda bramka: fixture przechodzi, a psuta kopia daje błąd z miejscem; generator wytwarza ≥ 40 odcisków na poziom (BR-GEN-003) z prawdziwym zakresem i macierzą equity.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ScenarioTemplate } from '@szkola/content-schema';
import { generateVariant, HAND_CLASSES, type Equity169Data, type GeneratorTemplate } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';
import { checkScenarioGenerator, checkScenarioNaEkran, checkScenarioTemplate, loadScenarioTemplates, RODZAJE_NA_EKRANIE } from '../src/scenariusze';

const dir = resolve(import.meta.dirname);
const root = resolve(dir, '../../..');
const spots = compileRanges(join(root, 'content')).spots;
const equity169 = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as Equity169Data;
const liczby: Record<string, number> = { 'pf.open-size': 2.5, 'pf.3bet.oop-total': 10, 'xr.mult.example': 4.5, 'xr.too-small.mult': 1.5 };
const sctx = {
  ruleLevels: new Map([['R-M9-002', 'math'], ['R-M9-009', 'math'], ['R-M7-001', 'heuristic'], ['R-M6-008', 'heuristic'], ['R-M10-007', 'heuristic']] as const),
  numberKeys: new Set<string>(Object.keys(liczby)), numberValue: (k: string) => liczby[k], moduleIds: new Set(['m6', 'm7', 'm9', 'm10']),
  spots: new Map(spots.map((s) => [s.id, s.actions.map((a) => a.label)] as const)),
};
const gctx = { spots, thresholds: { mixedMin: 0.035, mixedLow: 0.25 }, equity169 };
const wczytaj = (nazwa: string) => loadScenarioTemplates(join(dir, 'fixtures', nazwa))[0]!;
const zgodnie = (nazwa: string) => {
  const fx = wczytaj(nazwa);
  const kopia = (f: (b: any) => void) => { const b = structuredClone(fx.template) as any; f(b); return ScenarioTemplate.parse(b); };
  const blad = (t: ScenarioTemplate) => checkScenarioTemplate(t, `${t.id}.yaml`, sctx).join('\n');
  return { fx, kopia, blad };
};

describe('08-EX-5: bramka spr-call', () => {
  const { fx, kopia, blad } = zgodnie('spr-call');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje call i fold', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'call'; }))).toMatch(/call i fold/); });
  it('oczekiwana akcja to call', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['fold']; }))).toMatch(/call/); });
  it('sprRange nieosiągalny z puli i stacków', () => { expect(blad(kopia((b) => { b.bounds.latwy.sprRange = [5, 6]; }))).toMatch(/spr/i); });
  it('kickerMin ≤ kickerMax', () => { expect(blad(kopia((b) => { b.bounds.latwy.kickerMin = 'A'; b.bounds.latwy.kickerMax = 'K'; }))).toMatch(/kicker/i); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-4: bramka geo-size', () => {
  const { fx, kopia, blad } = zgodnie('geo-size');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje bet-small i bet-big', () => { expect(blad(kopia((b) => { b.decisions[0].actions[1].action = 'bet-small'; }))).toMatch(/bet-small i bet-big/); });
  it('oczekiwana akcja to bet-big', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['bet-small']; }))).toMatch(/bet-big/); });
  it('mały zakład nie może wpłacać stacku ani być większy od geometrycznego', () => { expect(blad(kopia((b) => { b.decisions[0].small = 0.9; }))).toMatch(/sprRange|mały zakład|para/i); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-6: bramka turn-action', () => {
  const { fx, kopia, blad } = zgodnie('turn-action');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('akcje check i bet-big (bet-small opcjonalnie)', () => { expect(blad(kopia((b) => { b.decisions[0].actions[0].action = 'bet-small'; }))).toMatch(/check, bet-big/); });
  it('oczekiwana akcja bet-big albo check', () => { expect(blad(kopia((b) => { b.bounds.latwy.expected = ['fold']; }))).toMatch(/bet-big albo check/); });
  it('turnClass i pairKind są wymagane', () => {
    expect(blad(kopia((b) => { delete b.bounds.latwy.turnClass; }))).toMatch(/turnClass/);
    expect(blad(kopia((b) => { delete b.bounds.latwy.pairKind; }))).toMatch(/pairKind/);
  });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-7: bramka check-raise', () => {
  const { fx, kopia, blad } = zgodnie('check-raise');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('gracz to BB, spot obrony BB', () => {
    expect(blad(kopia((b) => { b.positions.hero = 'CO'; b.positions.villain = 'BTN'; }))).toMatch(/gracz to BB/);
    expect(blad(kopia((b) => { b.decisions[0].spot = 'rfi.co'; }))).toMatch(/vs-open\.bb-/);
  });
  it('krotności zgodne z numbers.yaml (jedno źródło prawdy)', () => {
    expect(blad(kopia((b) => { b.decisions[0].multipliers.big = 4; }))).toMatch(/xr\.mult\.example/);
    expect(blad(kopia((b) => { b.decisions[0].multipliers.small = 2; }))).toMatch(/xr\.too-small\.mult/);
  });
  it('raise-small i multipliers.small występują razem', () => { expect(blad(kopia((b) => { delete b.decisions[0].multipliers.small; }))).toMatch(/raise-small/); });
  it('generator wytwarza ≥ 40 odcisków na poziom', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
describe('08-EX-8: bramka nit-3bet', () => {
  const { fx, kopia, blad } = zgodnie('nit-3bet');
  it('fixture przechodzi', () => { expect(checkScenarioTemplate(fx.template, fx.file, sctx)).toEqual([]); });
  it('liczby zgodne z numbers.yaml', () => {
    expect(blad(kopia((b) => { b.decisions[0].open = 3; }))).toMatch(/pf\.open-size/);
    expect(blad(kopia((b) => { b.decisions[0].threeBet = 9; }))).toMatch(/pf\.3bet\.oop-total/);
  });
  it('tylko poziom łatwy (D-1721) i margines ≥ 0,03', () => {
    expect(blad(kopia((b) => { b.levels = ['latwy', 'sredni']; b.bounds.sredni = { expected: ['fold'], marginMin: 0.03 }; }))).toMatch(/tylko poziom łatwy/);
    expect(blad(kopia((b) => { b.bounds.latwy.marginMin = 0.01; }))).toMatch(/0,03/);
  });
  it('generator wytwarza ≥ 40 odcisków', () => { expect(checkScenarioGenerator(fx.template, undefined, 2000, gctx)).toEqual([]); }, 300_000);
});
// IB (KO-115): widoki rodzajów HO są na ekranie (apps/mobile ib-rodzaje-ho-ekran.test.tsx), więc bramka ekranu je przepuszcza; zastępuje „opcję A” (poza RODZAJE_NA_EKRANIE)
describe('IB: rodzaje HO na ekranie (bramka ekranu)', () => {
  it.each(['spr-call', 'geo-size', 'turn-action', 'check-raise', 'nit-3bet'])('%s w RODZAJE_NA_EKRANIE, fixture przechodzi bramkę ekranu', (k) => {
    expect(RODZAJE_NA_EKRANIE).toContain(k);
    expect(checkScenarioNaEkran(wczytaj(k).template)).toEqual([]);
  });
  it('lista rodzajów ekranu: przypięcie (to samo literalnie w apps/mobile RODZAJE_PUNKTOW_EKRANU)', () => {
    expect([...RODZAJE_NA_EKRANIE]).toEqual(['draw-call', 'cbet-case', 'size-spot', 'range-spot', 'icm-call', 'pick-hand', 'turn-bet', 'flop-size', 'river-catch', 'defend', 'list-hand', 'river-value', 'spr-call', 'check-raise', 'turn-action', 'geo-size', 'nit-3bet']);
  });
  it('turn-action z bet-small: ekran nie ma nazwy dwóch rozmiarów zakładu bez puli (D-1844)', () => {
    const { kopia } = zgodnie('turn-action');
    const t = kopia((b) => { b.decisions[0].actions.push({ action: 'bet-small', explanation: b.decisions[0].actions[0].explanation }); });
    expect(checkScenarioNaEkran(t).join('\n')).toMatch(/turn-action.*bet-small/);
  });
  it('znacznik wariantu {{w:…}} w situation: ekran pokazuje sytuację przed losowaniem (start, wybór, koniec) — błąd (D-1845)', () => {
    const { kopia } = zgodnie('nit-3bet');
    const t = kopia((b) => { b.situation = 'Rywal z VPIP {{w:vpip}}% 3-betuje.'; });
    expect(checkScenarioNaEkran(t).join('\n')).toMatch(/situation.*\{\{w:vpip\}\}/);
  });
});
// IB (koordynator, z pytania HZ o SC-30): nit-3bet nie ma flopu, odcisk to klasa ręki (+ |vpip), więc próg pojemności to min(40, liczba klas, które generator
// dopuszcza, po wszystkich vpips, z częstością otwarcia ≥ mixedMin) — jak D-1040 (range-spot, rangeVerdict) i 08-N4 (list-hand). Liczba klas sprawdzona
// niezależnie: nasycone losowanie (20 000) i częstość otwarcia klasy wprost ze spotu rfi.btn.
describe('IB: pojemność nit-3bet (próg = liczba dopuszczalnych klas, jak D-1040 i 08-N4)', () => {
  const { kopia } = zgodnie('nit-3bet');
  const t = kopia((b) => { b.decisions[0].vpips = [0.1]; });
  it('vpips [0.1] (mniej niż 40 klas) przechodzi kontrolę generatora', () => { expect(checkScenarioGenerator(t, undefined, 2000, gctx)).toEqual([]); }, 300_000);
  it('przy liczbie odcisków mniejszej niż liczba klas — błąd; wymagana liczba = klasy z nasyconego losowania z częstością otwarcia ≥ mixedMin (niezależnie)', () => {
    const blad = checkScenarioGenerator(t, undefined, 3, gctx).join('\n');
    expect(blad).toMatch(/pojemność/);
    const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as unknown as GeneratorTemplate;
    const klasy = new Set<string>();
    for (let z = 1; z <= 20000; z++) { const p = generateVariant(g, 'latwy', z, gctx).points[0]!; if (p.point === 'nit-3bet') klasy.add(p.handClass); }
    const btn = spots.find((s) => s.id === 'rfi.btn')!;
    const otwarcie = (hc: string) => btn.actions.filter((a) => a.label !== 'fold').reduce((x, a) => x + (a.freqs[HAND_CLASSES.indexOf(hc)] ?? 0), 0);
    const uczciwe = [...klasy].filter((hc) => otwarcie(hc) >= gctx.thresholds.mixedMin).length;
    expect(uczciwe).toBeGreaterThan(3);
    expect(uczciwe).toBeLessThan(klasy.size); // generator losuje też klasy-szum (K6o z BTN) — dlatego próg ich nie liczy
    expect(blad).toMatch(new RegExp(`wymagane ${uczciwe}$`));
  }, 300_000);
});

