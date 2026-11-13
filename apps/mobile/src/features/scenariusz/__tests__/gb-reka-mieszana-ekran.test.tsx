/// <reference types="jest" />
// 08 GB (FW §3, D-1502; kryteria akceptacji 1–4 dla 08; 08-programista-201 / sonda FU docs/programista/dowody/fu-sonda-reka-mieszana.txt): ręka mieszana w list-hand.
// O bloku decyduje ocena akcji („zgodne”), nie równość z `correct`: druga poprawna akcja to widoczny blok „też dobre”, nie „Dlaczego nie”.
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import { classOf, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import i18n from '@/i18n';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { propsFg, sesjaFg, wariantFg } from '@/test-utils/fgScenariusz';
import { KoniecScenariusza, PrzebiegScenariusza, tekstAkcji } from '../EkranScenariusza';
import { bloki, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;
const bezNbsp = (x: string) => x.replace(/\s/g, ' ');
const POZIOM: ScenarioLevel = 'latwy';
const SZABLON = ScenarioTemplate.parse({
  id: 'sc-gb-lista', module: 'm4', situation: 'Fixture.', table: '6max', positions: { hero: 'BTN', villain: 'CO' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['4bet'] } },
  decisions: [{
    street: 'preflop', kind: 'list-hand', rule: 'R-M4-004',
    entries: [{ hands: ['AA'], correct: '4bet' }, { hands: ['AKs'], correct: ['4bet', 'call'] }, { hands: ['AKo'], correct: '4bet', acceptable: ['call'] }],
    actions: [
      { action: '4bet', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, 4-bet wygrywa wartością.' },
      { action: 'call', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, sprawdzenie też jest dobre.' },
      { action: 'fold', explanation: 'Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, pas oddaje wartość.' },
    ],
  }],
});
const wariantKlasy = (klasa: string): ScenarioVariant => {
  for (let z = 1; z < 400; z++) { const w = wariantFg(SZABLON, POZIOM, z); if (classOf(w.hero[0], w.hero[1]) === klasa) return w; }
  throw new Error(`brak ziarna dla ${klasa}`);
};
const rodzaje = (klasa: string, wybor: Akcja): string[] => bloki(wariantKlasy(klasa), SZABLON, 0, wybor, t).map((b) => `${b.rodzaj}:${b.akcja}`);
const fraza = (klasa: string, a: Akcja): string => tekstAkcji(wariantKlasy(klasa), 0, a, SZABLON, t).fraza;
const ocena = (klasa: string, wybor: Akcja) => render(<PrzebiegScenariusza sesja={sesjaFg(SZABLON, POZIOM, wariantKlasy(klasa), [wybor])} faza="ocena" koniec onWybierz={jest.fn()} {...propsFg()} />);

describe('GB kryterium 1: bloki przy wyborze zgodnym ręki mieszanej', () => {
  it('AKs, wybór call: „dobrze:call”, „tez_dobrze:4bet”, „dlaczego_nie:fold”; żaden „dlaczego_nie” nie dotyczy akcji ocenionej „zgodne” (sonda FU)', () => {
    const b = rodzaje('AKs', 'call');
    expect(b).toEqual(['dobrze:call', 'tez_dobrze:4bet', 'dlaczego_nie:fold']);
    expect(b).not.toContain('dlaczego_nie:4bet');
  });
  it('AKs, wybór 4bet: symetrycznie „dobrze:4bet”, „tez_dobrze:call”, „dlaczego_nie:fold”', () => {
    expect(rodzaje('AKs', '4bet')).toEqual(['dobrze:4bet', 'tez_dobrze:call', 'dlaczego_nie:fold']);
  });
  it('ekran: nagłówek „też dobre zagranie” jest widoczny (nie zwinięty), „Dlaczego nie” tylko dla pasa', async () => {
    await ocena('AKs', 'call');
    expect(screen.getByText(t('scenario.why.alsoGood', { akcja: fraza('AKs', '4bet') }))).toBeTruthy();
    expect(screen.getAllByTestId('dlaczego-nie')).toHaveLength(1);
    expect(tekstEkranu()).toMatch(/4-bet wygrywa wartością/);
  });
});

describe('GB kryterium 2: bloki przy wyborze niezgodnym', () => {
  it('AKs, wybór fold: „slabsza:fold” i po jednym „lepsza” na każdą zgodną w kolejności akcji punktu (pas, sprawdzenie, 4-bet: akcjePunktu)', () => {
    expect(rodzaje('AKs', 'fold')).toEqual(['slabsza:fold', 'lepsza:call', 'lepsza:4bet']);
  });
});

describe('GB kryterium 3: werdykt i ogłoszenie', () => {
  it('wybór zgodny przy ręce mieszanej: scenario.verdict.yoursGoodAlso z „inne” = druga zgodna', async () => {
    await ocena('AKs', 'call');
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('scenario.verdict.yoursGoodAlso', { akcja: fraza('AKs', 'call'), inne: fraza('AKs', '4bet') })));
  });
  it('wybór niezgodny: „Lepiej” zawiera wszystkie zgodne połączone scenario.or', async () => {
    await ocena('AKs', 'fold');
    const lepiej = t('scenario.or', { a: fraza('AKs', 'call'), b: fraza('AKs', '4bet') });
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('scenario.verdict.yours', { akcja: fraza('AKs', 'fold'), lepiej })));
  });
  it('bez ręki mieszanej teksty bez zmian: AA fold → yours z jedną zgodną; AKo call (dopuszczalne) → yours z 4-bet; AA 4bet → yoursGood', async () => {
    await ocena('AA', 'fold');
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('scenario.verdict.yours', { akcja: fraza('AA', 'fold'), lepiej: fraza('AA', '4bet') })));
  });
  it('AKo call (dopuszczalne): bloki jak dotąd, „slabsza” + „lepsza” z jedną zgodną', () => {
    expect(rodzaje('AKo', 'call')).toEqual(['slabsza:call', 'lepsza:4bet']);
    expect(rodzaje('AA', '4bet')).toEqual(['dobrze:4bet', 'dlaczego_nie:fold', 'dlaczego_nie:call']);
  });
  it('AA 4bet: werdykt yoursGood (bez „Też dobrze”)', async () => {
    await ocena('AA', '4bet');
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('scenario.verdict.yoursGood', { akcja: fraza('AA', '4bet') })));
    expect(tekstEkranu()).not.toMatch(/Też dobrze/);
  });
});

describe('GB kryterium 4: lista na końcu', () => {
  it('AKs, wybór fold: „Lepiej: sprawdzenie (call) albo 4-bet.” (kolejność akcji punktu) z tym samym połączeniem', async () => {
    const sesja = sesjaFg(SZABLON, POZIOM, wariantKlasy('AKs'), ['fold']);
    await render(<KoniecScenariusza sesja={sesja} poziom={POZIOM} bladStartu={null} onNowe={jest.fn()} onPowtorz={jest.fn()} onZamknij={jest.fn()} />);
    const lepiej = t('scenario.or', { a: fraza('AKs', 'call'), b: fraza('AKs', '4bet') });
    expect(bezNbsp(tekstEkranu())).toContain(bezNbsp(t('scenario.end.better', { akcja: lepiej })));
  });
  it('AKs, wybór call (zgodny): bez „Lepiej”', async () => {
    const sesja = sesjaFg(SZABLON, POZIOM, wariantKlasy('AKs'), ['call']);
    await render(<KoniecScenariusza sesja={sesja} poziom={POZIOM} bladStartu={null} onNowe={jest.fn()} onPowtorz={jest.fn()} onZamknij={jest.fn()} />);
    expect(tekstEkranu()).not.toMatch(/Lepiej/);
  });
});
