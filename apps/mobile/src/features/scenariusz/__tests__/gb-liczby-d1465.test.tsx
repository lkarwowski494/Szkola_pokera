/// <reference types="jest" />
// 08 GB (D-1465, KO-097; docs/tresci/liczby-river-catch-defend.md, brzmienie defend po D-1474): sekcja „Liczby” punktów river-catch i defend.
// Wyrocznia: rachunek wprost z pól wariantu (pula = pot + bet, potrzeba = bet ÷ (pot + 2·bet), obrona = pot ÷ (pot + bet)), niezależnie od kodu liczby.ts i poker-core.
// Formaty jak w `scenario.numbers.line` (procent bez miejsc po przecinku); liczby bb przez formatujLiczbe wg języka zadań (DEV-16).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { formatujLiczbe, formatujProcent } from '@szkola/jezyki';
import type { DefendVariantDecision, RiverCatchVariantDecision, ScenarioLevel } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { jezykZadan } from '@/features/drills/text';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg } from '@/test-utils/fgScenariusz';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import { zdaniaLiczb } from '../liczby';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const fb = (x: number) => formatujLiczbe(x, jezykZadan());
const fp = (x: number) => formatujProcent(x, jezykZadan());
const razNa = (potrzeba: number) => Math.max(1, Math.round(1 / potrzeba));

const RIVER = ScenarioTemplate.parse({
  id: 'sc-gb-river', module: 'm8', situation: 'Fixture: river.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy', 'sredni'],
  bounds: { latwy: { marginMin: 0.03, expected: ['call'] }, sredni: { marginMin: 0.03, expected: ['fold'] } },
  decisions: [{
    street: 'river', kind: 'river-catch', calc: 'bluff.share.bet-half', pots: [10, 20, 40], fractions: [0.33, 0.5, 0.75, 1], bluffShares: [0.15, 0.2, 0.25, 0.3, 0.35, 0.4],
    actions: [
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, rywal blefuje dość często, więc sprawdzasz.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, rywal blefuje zbyt rzadko, więc pasujesz.' },
    ],
  }],
});
const DEFEND = ScenarioTemplate.parse({
  id: 'sc-gb-defend', module: 'm6', situation: 'Fixture: obrona BB wobec c-betu.', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 100, levels: ['latwy', 'sredni'],
  bounds: { latwy: { expected: ['call'] }, sredni: { expected: ['fold'] } },
  decisions: [{
    street: 'flop', kind: 'defend', rule: 'R-M4-004', spot: 'vs-open.bb-vs-btn', pots: [6, 9, 12], fractions: [0.33, 0.5],
    actions: [
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ta ręka ma dość, żeby sprawdzić mały zakład.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, ta ręka nie ma dość, żeby sprawdzić.' },
    ],
  }],
});

/** Sesja z ręcznie podanym punktem (znane liczby), reszta wariantu z generatora tylko po to, by sesja była kompletna. */
function sesjaZPunktem(szablon: ScenarioTemplate, punkt: RiverCatchVariantDecision | DefendVariantDecision): SesjaScenariusza {
  const bazowa = sesjaFg(szablon, 'latwy', wariantFg(szablon, 'latwy', 1, getKontekstGeneratora(dbCn, szablon)), ['call']);
  return { ...bazowa, wariant: { ...bazowa.wariant, points: [punkt] } };
}

describe('08 GB (D-1465): „Liczby” river-catch', () => {
  it('SC-24-podobny wariant: pula 14 + zakład 11 → „25 bb”, „11 bb”, 31 %, raz na 3, udział 50 %, więcej blefów niż trzeba (rachunek ręczny: 11 ÷ 36 = 30,6 %)', () => {
    const s = sesjaZPunktem(RIVER, { point: 'river-catch', street: 'river', pot: 14, bet: 11, fraction: 0.79, bluffShare: 0.5, required: 11 / 36, correct: 'call', margin: 0.19 });
    const z = zdaniaLiczb(s, 0, 'call', t);
    expect(z).toHaveLength(2);
    expect(z[0]).toBe(t('scenario.numbers.riverCatch', { pula: fb(25), kwota: fb(11), potrzeba: fp(11 / 36), razPotrzeba: 3, udzial: fp(0.5) }));
    expect(z[0]).toMatch(/25 bb/); expect(z[0]).toMatch(/11 bb/); expect(z[0]).toContain(fp(11 / 36)); expect(z[0]).toContain(fp(0.5)); expect(z[0]).toMatch(/raz na 3/);
    expect(z[1]).toBe(t('scenario.numbers.riverCatchMore'));
  });
  it('udział blefów poniżej progu → „mniej”, niezależnie od wyboru gracza (rachunek dotyczy rozdania)', () => {
    const s = sesjaZPunktem(RIVER, { point: 'river-catch', street: 'river', pot: 20, bet: 20, fraction: 1, bluffShare: 0.25, required: 20 / 60, correct: 'fold', margin: 0.08 });
    for (const wybor of ['call', 'fold'] as const) {
      const z = zdaniaLiczb(s, 0, wybor, t);
      expect(z).toEqual([t('scenario.numbers.riverCatch', { pula: fb(40), kwota: fb(20), potrzeba: fp(1 / 3), razPotrzeba: 3, udzial: fp(0.25) }), t('scenario.numbers.riverCatchLess')]);
    }
  });
  it('wariant z generatora (obie rozstrzygnięcia, ziarna 1–30): zdania zgodne z niezależnym rachunkiem, kierunek zdania = poprawna akcja', () => {
    for (const poziom of ['latwy', 'sredni'] as ScenarioLevel[]) {
      for (let seed = 1; seed <= 30; seed++) {
        const w = wariantFg(RIVER, poziom, seed);
        const d = w.points[0] as RiverCatchVariantDecision;
        const potrzeba = d.bet / (d.pot + 2 * d.bet);
        const z = zdaniaLiczb(sesjaFg(RIVER, poziom, w, [d.correct]), 0, d.correct, t);
        expect(z).toEqual([
          t('scenario.numbers.riverCatch', { pula: fb(d.pot + d.bet), kwota: fb(d.bet), potrzeba: fp(potrzeba), razPotrzeba: razNa(potrzeba), udzial: fp(d.bluffShare) }),
          t(d.bluffShare > potrzeba ? 'scenario.numbers.riverCatchMore' : 'scenario.numbers.riverCatchLess'),
        ]);
        expect(d.bluffShare > potrzeba).toBe(d.correct === 'call');
      }
    }
  });
});

describe('08 GB (D-1465): „Liczby” defend', () => {
  it('pula przed c-betem 12, zakład 4 → „16 bb”, „4 bb”, 20 %, raz na 5, MDF 75 % (MDF z puli PRZED zakładem, nie z wyświetlanej puli 16)', () => {
    const s = sesjaZPunktem(DEFEND, { point: 'defend', street: 'flop', pot: 12, bet: 4, fraction: 0.33, holding: 'pair', correct: 'call' } as unknown as DefendVariantDecision);
    const z = zdaniaLiczb(s, 0, 'call', t);
    expect(z).toEqual([t('scenario.numbers.defend', { pula: fb(16), kwota: fb(4), potrzeba: fp(0.2), razPotrzeba: 5, obrona: fp(0.75) })]);
    expect(z[0]).toMatch(/16 bb/); expect(z[0]).toMatch(/4 bb/); expect(z[0]).toContain(fp(0.2)); expect(z[0]).toMatch(/raz na 5/); expect(z[0]).toContain(fp(0.75));
    expect(z[0]).toContain('na flopie możesz bronić trochę mniej'); // D-1474: MDF jako punkt odniesienia, nie norma
  });
  it('pula 10, zakład 5 → 25 %, raz na 4, MDF 67 % (66,7 %)', () => {
    const s = sesjaZPunktem(DEFEND, { point: 'defend', street: 'flop', pot: 10, bet: 5, fraction: 0.5, holding: 'pair', correct: 'call' } as unknown as DefendVariantDecision);
    expect(zdaniaLiczb(s, 0, 'fold', t)).toEqual([t('scenario.numbers.defend', { pula: fb(15), kwota: fb(5), potrzeba: fp(0.25), razPotrzeba: 4, obrona: fp(10 / 15) })]);
  });
  it('wariant z generatora (ziarna 1–30): jedno zdanie zgodne z niezależnym rachunkiem', () => {
    const ctx = getKontekstGeneratora(dbCn, DEFEND);
    for (let seed = 1; seed <= 30; seed++) {
      const w = wariantFg(DEFEND, 'latwy', seed, ctx);
      const d = w.points[0] as DefendVariantDecision;
      const potrzeba = d.bet / (d.pot + 2 * d.bet);
      expect(zdaniaLiczb(sesjaFg(DEFEND, 'latwy', w, ['call']), 0, 'call', t)).toEqual([
        t('scenario.numbers.defend', { pula: fb(d.pot + d.bet), kwota: fb(d.bet), potrzeba: fp(potrzeba), razPotrzeba: razNa(potrzeba), obrona: fp(d.pot / (d.pot + d.bet)) }),
      ]);
    }
  });
});

/** Tekst ekranu bez glos terminów w nawiasach („Pula (pot)” → „Pula”): sprawdzamy brzmienie zdań, nie glosariusz. */
const bezGlos = (): string => tekstEkranu().replace(/ \([^)]*\)/g, '');

describe('08 GB (D-1465): sekcja „Liczby” na ekranie oceny (zwinięta, po rozwinięciu zdania ze znacznikami terminów rozwiązanymi)', () => {
  it('river-catch: po rozwinięciu cena, „Wygrywasz tylko z blefami” i zdanie kierunku (więcej)', async () => {
    const s = sesjaZPunktem(RIVER, { point: 'river-catch', street: 'river', pot: 14, bet: 11, fraction: 0.79, bluffShare: 0.5, required: 11 / 36, correct: 'call', margin: 0.19 });
    await render(<PrzebiegScenariusza sesja={s} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
    expect(bezGlos()).not.toMatch(/Wygrywasz tylko z/);
    await fireEvent.press(screen.getByTestId('liczby'));
    expect(bezGlos()).toMatch(/Pula to 25 bb, a sprawdzenie kosztuje 11 bb, więc potrzebujesz 31% szans, czyli wygrać mniej więcej raz na 3/);
    expect(bezGlos()).toMatch(/Wygrywasz tylko z blefami, a w tym rozdaniu blefy to 50% jego zakładów/);
    expect(bezGlos()).toMatch(/Blefów jest więcej, niż potrzebujesz, więc sprawdzenie zarabia/);
    expect(bezGlos()).not.toMatch(/\{\{/);
  });
  it('defend: po rozwinięciu cena i MDF z zastrzeżeniem flopu', async () => {
    const s = sesjaZPunktem(DEFEND, { point: 'defend', street: 'flop', pot: 12, bet: 4, fraction: 0.33, holding: 'pair', correct: 'call' } as unknown as DefendVariantDecision);
    await render(<PrzebiegScenariusza sesja={s} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);
    await fireEvent.press(screen.getByTestId('liczby'));
    expect(bezGlos()).toMatch(/Pula to 16 bb, a sprawdzenie kosztuje 4 bb, więc potrzebujesz 20% szans, czyli wygrać mniej więcej raz na 5/);
    expect(bezGlos()).toMatch(/na flopie możesz bronić trochę mniej, a o jednej ręce decyduje wyjaśnienie/);
    expect(bezGlos()).not.toMatch(/\{\{/);
  });
});
