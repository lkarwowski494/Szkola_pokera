/// <reference types="jest" />
// Recenzja DC (D-043) zmian CX 46197812..92b06ca9, raport docs/programista/recenzje/recenzja-cx-92b06ca.md. Test odtwarzający WYS-001:
// w ręce mieszanej rangeVerdict daje „correct” każdej akcji z częstością ≥ mixedLow (ADR-04, ADR-26), więc pas bywa „Zgodna”, a ekran i tak
// pokazuje „Lepiej: …” oraz bloki „słabsza / lepsza” (bloki porównują wybór z `poprawnaAkcja`, nie z oceną). Design: przy „zgodne” blok „dobrze”,
// przy ręce mieszanej „Kiedy które zagranie” (docs/design/scenariusz-i-ocena.md:19). `it.failing` do naprawy; po naprawie → `it`.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { generateVariant, type ScenarioVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { bloki, naGenerator, ocenyAkcji, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const akcje = (...a: string[]) => a.map((action) => ({ action, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. Wyjaśnienie akcji ${action}.` }));
/** Jak poziom „trudny” sc-fx-rfi-btn (fixture CX): oczekiwane otwarcie z częstością 0,25–0,9, więc pas ma częstość do 0,75. */
const RFI_TRUDNY = {
  module: 'm3', situation: '-', table: '6max', stackBb: 100, positions: { hero: 'BTN', villain: 'BB' },
  id: 'sc-dc-rfi-trudny', levels: ['trudny'],
  bounds: { trudny: { freqs: [{ min: 0.25, max: 0.9 }], expected: ['raise 2.5'], draws: [], reject: [] } },
  decisions: [{ street: 'preflop', kind: 'range-spot', spot: 'rfi.btn', rule: 'R-M3-003', actions: akcje('raise 2.5', 'fold') }],
} as unknown as ScenarioTemplate;

const t = (k: string, o?: Record<string, unknown>) => require('@/i18n').default.t(k, o) as string;
/** Pierwsze ziarno, w którym pas ma werdykt „correct” (ręka mieszana), przy oczekiwanym otwarciu. */
function wariantMieszany(): ScenarioVariant {
  for (let z = 1; z <= 500; z++) {
    const v = generateVariant(naGenerator(RFI_TRUDNY), 'trudny', z, getKontekstGeneratora(dbCn, RFI_TRUDNY));
    const p = v.points[0];
    if (p?.point === 'range-spot' && p.correct === 'raise 2.5' && p.options.find((o) => o.action === 'fold')?.verdict === 'correct') return v;
  }
  throw new Error('brak ręki mieszanej z pasem ≥ mixedLow w 500 ziarnach');
}
const sesja = (v: ScenarioVariant, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon: RFI_TRUDNY, poziom: 'trudny', wariant: v, wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: RFI_TRUDNY.id } },
});

describe('DC WYS-001: ręka mieszana w range-spot, pas oceniony „Zgodna”', () => {
  const v = wariantMieszany();
  it('warunek wstępny: pas i otwarcie mają ocenę zgodną (rangeVerdict, ADR-04)', () => {
    expect(ocenyAkcji(v, 0)).toEqual({ fold: 'zgodne', 'raise 2.5': 'zgodne' });
  });
  it.failing('bloki wyjaśnień: wybór oceniony „zgodne” dostaje blok „dobrze”, nie „słabsza / lepsza”', () => {
    expect(bloki(v, RFI_TRUDNY, 0, 'fold', t)[0]?.rodzaj).toBe('dobrze');
  });
  it.failing('ekran oceny: przy werdykcie „Zgodna” nie ma zdania „Lepiej: …”', async () => {
    await render(<PrzebiegScenariusza sesja={sesja(v, ['fold'])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
    const tekst = tekstEkranu();
    expect(tekst).toMatch(/Zgodna/);
    expect(tekst).not.toMatch(/Lepiej:/);
  });
});
