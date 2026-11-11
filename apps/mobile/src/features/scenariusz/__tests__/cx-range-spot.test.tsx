/// <reference types="jest" />
// CX (F1, D-755 → obsługa): ekran scenariusza obsługuje punkt range-spot (preflop): akcje spotu (etykiety węzła solvera: pas, przebicie do N bb,
// sprawdzenie, all-in), ocena z werdyktów rangeVerdict wariantu (ADR-26: oczekiwana zgodna, w ręce mieszanej druga dopuszczalna),
// kontekst generatora z bazy treści (`getKontekstGeneratora`, CN D-780). Szablony to fixture w stylu CA/BU (nie treść aplikacji).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { generateVariant, rangeVerdict, type ScenarioLevel } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { akcjePunktu, grafPunktow, kwotaAkcji, naGenerator, ocenyAkcji, poprawnaAkcja, przebiegWariantu, widokDecyzji, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const znaczniki = (zdanie: string) => `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. ${zdanie}`;
const akcje = (...a: string[]) => a.map((action) => ({ action, explanation: znaczniki(`Wyjaśnienie akcji ${action}.`) }));
const podstawa = { module: 'm3', situation: '-', table: '6max' as const, stackBb: 100, positions: { hero: 'BTN', villain: 'BB' } };

/** Jak sc-fx-rfi-btn (tools/content-build/test/fixtures/range-spot): trzy poziomy wg przedziału częstości akcji oczekiwanej. */
const RFI_BTN = {
  ...podstawa, id: 'sc-cx-rfi-btn', levels: ['latwy', 'sredni', 'trudny'],
  bounds: {
    latwy: { freqs: [{ min: 0.99, max: 1 }], expected: ['raise 2.5'], draws: [], reject: [] },
    sredni: { freqs: [{ min: 0.9, max: 0.99 }], expected: ['raise 2.5'], draws: [], reject: [] },
    trudny: { freqs: [{ min: 0.25, max: 0.9 }], expected: ['raise 2.5'], draws: [], reject: [] },
  },
  decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'rfi.btn', rule: 'R-M3-003', actions: akcje('raise 2.5', 'fold') }],
} as unknown as ScenarioTemplate;
/** Oczekiwany pas (ręka daleko poza zakresem otwarcia). */
const RFI_PAS = {
  ...RFI_BTN, id: 'sc-cx-rfi-pas', positions: { hero: 'UTG', villain: 'BB' }, levels: ['latwy'],
  bounds: { latwy: { freqs: [{ min: 0.99, max: 1 }], expected: ['fold'], draws: [], reject: [] } },
  decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'rfi.utg', rule: 'R-M3-003', actions: akcje('raise 2.5', 'fold') }],
} as unknown as ScenarioTemplate;
/** Range-spot, a po otwarciu draw-call na flopie (linia preflop → flop). */
const RFI_DRAW = {
  ...RFI_BTN, id: 'sc-cx-rfi-draw', module: 'm3', levels: ['latwy'],
  bounds: { latwy: { freqs: [{ min: 0.25, max: 1 }, null], draws: ['flush'], marginMin: 0.1, marginMax: null, expected: ['raise 2.5', 'call'], reject: ['rywal-ma-out-gracza', 'stol-sparowany'] } },
  decisions: [
    { street: 'preflop', kind: 'range-spot', spot: 'rfi.btn', rule: 'R-M3-003', actions: akcje('raise 2.5', 'fold') },
    { street: 'flop', kind: 'draw-call', pots: [18, 20, 22, 24], fractions: [0.1, 0.2, 0.25, 0.3], villain: 'bet', rule: 'R-M2-005', actions: akcje('call', 'fold') },
  ],
} as unknown as ScenarioTemplate;

const ctx = (s: ScenarioTemplate) => getKontekstGeneratora(dbCn, s);
const wariant = (s: ScenarioTemplate, poziom: ScenarioLevel, ziarno = 5) => generateVariant(naGenerator(s), poziom, ziarno, ctx(s));
const sesja = (s: ScenarioTemplate, wybory: Akcja[], poziom: ScenarioLevel = 'latwy', ziarno = 5): SesjaScenariusza => ({
  id: 's1', szablon: s, poziom, wariant: wariant(s, poziom, ziarno), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: s.id } },
});
const decyzja = async (s: ScenarioTemplate, onWybierz = jest.fn()) => {
  await render(<PrzebiegScenariusza sesja={sesja(s, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={onWybierz} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
  return onWybierz;
};
const ocena = async (s: ScenarioTemplate, wybor: Akcja, poziom: ScenarioLevel = 'latwy') => {
  await render(<PrzebiegScenariusza sesja={sesja(s, [wybor], poziom)} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};

describe('wariant: punkt range-spot (czyste funkcje)', () => {
  it('akcje punktu to etykiety węzła spotu w kolejności solvera, poprawna akcja z wariantu', () => {
    const v = wariant(RFI_BTN, 'latwy');
    const p = v.points[0]!;
    if (p.point !== 'range-spot') throw new Error('oczekiwano range-spot');
    expect(akcjePunktu(p)).toEqual(p.options.map((o) => o.action));
    expect(akcjePunktu(p)).toEqual(expect.arrayContaining(['fold', 'raise 2.5']));
    expect(poprawnaAkcja(p)).toBe('raise 2.5');
  });
  it('widok: preflop, bez kart stołu, bez puli i kwoty sprawdzenia', () => {
    expect(widokDecyzji(wariant(RFI_BTN, 'latwy'), 0)).toEqual({ indeks: 0, ulica: 'preflop', stol: [], pulaBb: null, doSprawdzeniaBb: null });
  });
  it('ocena każdej akcji = werdykt rangeVerdict wariantu (poprawna zgodna, pas przy 100% otwarcia to błąd)', () => {
    const o = ocenyAkcji(wariant(RFI_BTN, 'latwy'), 0);
    expect(o['raise 2.5']).toBe('zgodne');
    expect(o.fold).toBe('blad');
  });
  it('ocena akcji = rangeVerdict z częstości wariantu (ADR-26; w ręce mieszanej druga akcja nie jest błędem), a ocena kroku zgodna z paskiem', () => {
    const NA = { correct: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', wrong: 'blad' } as const;
    const progi = ctx(RFI_BTN)!.thresholds;
    let mieszana = 0;
    for (let z = 1; z <= 300; z++) {
      const v = wariant(RFI_BTN, 'trudny', z);
      const p = v.points[0]!;
      if (p.point !== 'range-spot') throw new Error('oczekiwano range-spot');
      const oczekiwane = rangeVerdict(p.options.map((o) => o.f), progi).map((w) => NA[w]);
      const o = ocenyAkcji(v, 0);
      p.options.forEach((x, i) => expect(o[x.action as Akcja]).toBe(oczekiwane[i]));
      const kr = przebiegWariantu(v, ['raise 2.5']);
      expect(kr.ok && kr.wartosc.kroki[0]?.ocena).toBe('zgodne');
      if (o.fold !== 'blad') mieszana++;
    }
    expect(mieszana).toBeGreaterThan(0); // poziom trudny losuje także ręce mieszane
  });
  it('graf: sam range-spot kończy rozdanie każdą akcją; z draw-call pas kończy, otwarcie prowadzi do flopu', () => {
    expect(grafPunktow(wariant(RFI_BTN, 'latwy')).flat().every((a) => a.dalej === 'koniec')).toBe(true);
    const g = grafPunktow(wariant(RFI_DRAW, 'latwy'));
    expect(g[0]?.find((a) => a.akcja === 'fold')?.dalej).toBe('koniec');
    expect(g[0]?.find((a) => a.akcja === 'raise 2.5')?.dalej).toBe(1);
    expect(g[1]?.find((a) => a.akcja === 'call')?.dalej).toBe('pokazanie');
  });
  it('spójność: na każdym poziomie wariant i ocena powstają z kontekstem, bez kontekstu generator odmawia', () => {
    for (const s of [RFI_BTN, RFI_PAS, RFI_DRAW]) {
      expect(() => generateVariant(naGenerator(s), s.levels[0] as ScenarioLevel, 1)).toThrow(/GeneratorContext/);
      for (const l of s.levels as ScenarioLevel[]) {
        const v = wariant(s, l, 3);
        expect(v.points).toHaveLength(s.decisions.length);
        const oc = ocenyAkcji(v, 0);
        expect(Object.keys(oc).length).toBeGreaterThanOrEqual(2);
        expect(przebiegWariantu(v, v.points.map((p) => poprawnaAkcja(p))).ok).toBe(true);
      }
    }
  });
});

describe('kwoty akcji spotu (kwotaAkcji)', () => {
  const poz = (hero: string, stackBb: number | undefined) => ({ positions: { hero, villain: 'BTN' }, ...(stackBb === undefined ? {} : { stackBb }) }) as Pick<ScenarioTemplate, 'stackBb' | 'positions'>;
  const p = (spot: string) => wariant({ ...RFI_BTN, decisions: [{ ...(RFI_BTN.decisions[0] as object), spot }] } as unknown as ScenarioTemplate, 'latwy', 1).points[0]!;
  it('podbicie = rozmiar z etykiety; „call N” = dopłata za blindem gracza; all-in i „call” = stos (za blindem przy sprawdzeniu)', () => {
    const d = p('rfi.btn');
    expect(kwotaAkcji(d, 'raise 2.5', poz('BTN', 100))).toBe(2.5);
    expect(kwotaAkcji(d, 'raise 10', poz('BB', 100))).toBe(10); // podbicie to rozmiar całkowity, blind gracza go nie zmniejsza (DC NIS-006, M5)
    expect(kwotaAkcji(d, 'raise 3', poz('SB', 100))).toBe(3);
    expect(kwotaAkcji(d, 'call 2.5', poz('BB', 100))).toBe(1.5);
    expect(kwotaAkcji(d, 'call 3', poz('SB', 100))).toBe(2.5);
    expect(kwotaAkcji(d, 'all-in', poz('SB', 10))).toBe(10);
    expect(kwotaAkcji(d, 'call', poz('BB', 10))).toBe(9);
    expect(kwotaAkcji(d, 'all-in', poz('SB', undefined))).toBeNull();
    expect(kwotaAkcji(d, 'fold', poz('SB', 10))).toBeNull();
  });
});

describe('graf: range-spot z następnym punktem (DC NIS-006, M7)', () => {
  it('all-in i pas kończą rozdanie także w linii dwupunktowej, sprawdzenie prowadzi dalej', () => {
    const v = wariant(RFI_DRAW, 'latwy');
    const p0 = v.points[0]!;
    if (p0.point !== 'range-spot') throw new Error('oczekiwano range-spot');
    const push = { ...p0, spot: 'push.sb-10', options: ['fold', 'all-in', 'call'].map((action) => ({ action, f: 0.3, verdict: 'correct' as const })) };
    const g = grafPunktow({ ...v, points: [push, v.points[1]!] });
    expect(g[0]?.find((a) => a.akcja === 'all-in')?.dalej).toBe('koniec');
    expect(g[0]?.find((a) => a.akcja === 'fold')?.dalej).toBe('koniec');
    expect(g[0]?.find((a) => a.akcja === 'call')?.dalej).toBe(1);
  });
});

describe('ekran: range-spot', () => {
  it('przyciski akcji spotu z nazwami, wybór zwraca etykietę spotu, bez puli i „Liczb”', async () => {
    const onWybierz = await decyzja(RFI_BTN);
    expect(tekstEkranu()).not.toMatch(/W puli/);
    expect(screen.getByRole('button', { name: /^Pas/ })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: /^Przebicie[\s\S]*do 2[.,]5/ }));
    expect(onWybierz).toHaveBeenCalledWith('raise 2.5');
    await fireEvent.press(screen.getByRole('button', { name: /^Pas/ }));
    expect(onWybierz).toHaveBeenCalledWith('fold');
  });
  it('ocena zgodna: „dobrze” i „dlaczego nie” dla pozostałych akcji, tekst z szablonu bez surowych znaczników', async () => {
    await ocena(RFI_BTN, 'raise 2.5');
    const t = tekstEkranu();
    expect(t).toMatch(/Zgodna/);
    expect(t).toMatch(/Wyjaśnienie akcji raise 2\.5/);
    expect(t).not.toContain('{{w:');
    expect(t).toMatch(/, preflop\./); // {{w:stol}} przed flopem = nazwa ulicy (CN D-784)
    expect(screen.getAllByTestId('dlaczego-nie').length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByTestId('liczby')).toBeNull();
  });
  it('ocena błędu: pas przy ręce z zakresu otwarcia → słabsze i lepsze, nazwa lepszej akcji z kwotą', async () => {
    await ocena(RFI_BTN, 'fold');
    const t = tekstEkranu();
    expect(t).toMatch(/Błąd/);
    expect(t).toMatch(/Wyjaśnienie akcji fold/);
    expect(t).toMatch(/Wyjaśnienie akcji raise 2\.5/);
    expect(t).toMatch(/Lepiej: przebicie.* do 2[.,]5/);
  });
  it('range-spot + draw-call: po otwarciu decyzja na flopie z pulą i kartami stołu', async () => {
    const v = wariant(RFI_DRAW, 'latwy');
    expect(v.points.map((p) => p.point)).toEqual(['range-spot', 'draw-call']);
    await render(<PrzebiegScenariusza sesja={sesja(RFI_DRAW, ['raise 2.5'])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
    expect(tekstEkranu()).toMatch(/W puli/);
    expect(screen.getByRole('button', { name: /^Pas/ })).toBeTruthy();
  });
});
