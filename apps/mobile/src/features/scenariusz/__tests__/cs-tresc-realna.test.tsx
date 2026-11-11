/// <reference types="jest" />
// CS (CQ 06-tresci-001): szablony SC-11 i SC-12 z prawdziwej bazy treści pl (nie fixtury) startują na ekranie z kontekstem generatora:
// trzy akcje c-betu, każda ma ocenę i wyjaśnienie z szablonu, bez surowych znaczników. Od DU (KO-070) baza ma też range-spot (SC-06, SC-32,
// SC-33; ekran od D-866) i icm-call (SC-34 bez poziomu trudnego; ekran od D-889, bramka D-986).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { generateVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora, getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const szablony = getScenarioTemplates(dbCn);
const sesja = (szablon: ScenarioTemplate, poziom: ScenarioTemplate['levels'][number], ziarno: number, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom, wariant: generateVariant(naGenerator(szablon), poziom, ziarno, getKontekstGeneratora(dbCn, szablon)), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: szablon.decisions.length, trescId: szablon.id } },
} as unknown as SesjaScenariusza);

describe('treść z bazy: SC-11 i SC-12 na ekranie (CQ 06-tresci-001)', () => {
  it('baza ma SC-11 i SC-12, a SC-34 (icm-call) tylko bez poziomu trudnego (D-986, D-1036)', () => {
    expect(szablony.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-11', 'sc-12']));
    expect(szablony.filter((t) => t.decisions.some((d) => d.kind === 'icm-call')).map((t) => [t.id, t.levels])).toEqual([['sc-34', ['latwy', 'sredni']]]);
    expect(szablony.filter((t) => t.decisions.some((d) => d.kind === 'range-spot')).map((t) => t.id)).toEqual(['sc-06', 'sc-32', 'sc-33']);
  });
  for (const id of ['sc-11', 'sc-12']) {
    for (const poziom of ['latwy', 'sredni'] as const) {
      it(`${id} ${poziom}: decyzja ma trzy przyciski z trzema akcjami c-betu`, async () => {
        const szablon = szablony.find((t) => t.id === id)!;
        const onWybierz = jest.fn();
        await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, 7, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={onWybierz} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
        for (const [nazwa, akcja] of [[/^Czekanie/, 'check'], [/^Mały/, 'bet-small'], [/^Duży/, 'bet-big']] as const) {
          await fireEvent.press(screen.getByRole('button', { name: nazwa }));
          expect(onWybierz).toHaveBeenLastCalledWith(akcja);
        }
      });
      for (const akcja of ['check', 'bet-small', 'bet-big'] as const) {
        it(`${id} ${poziom}: wybór ${akcja} daje ocenę z wyjaśnieniem bez surowych znaczników`, async () => {
          const szablon = szablony.find((t) => t.id === id)!;
          await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, 7, [akcja])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
          const t = tekstEkranu();
          expect(t).toMatch(/Ocena: /);
          expect(t).not.toContain('{{');
        });
      }
    }
  }
});

// EB (06-tresci-003, mechanizm CQ 06-tresci-001): każdy szablon z prawdziwej bazy pl, nie lista jawnych ID, więc nowy szablon trafia
// do testu sam. Każdy poziom, każdy punkt decyzji (wcześniejsze punkty z akcją oczekiwaną poziomu) i każda akcja punktu: ekran oceny
// ma „Ocena:” i nie ma surowych znaczników. Wzór: sonda recenzji EA (docs/tresci/recenzje/dowody/ea-du-sonda-ekranu.test.tsx.txt).
describe('treść z bazy: każdy szablon, poziom, punkt i akcja na ekranie oceny (06-tresci-003)', () => {
  it('baza ma szablony, w tym DU (SC-06, SC-32, SC-33, SC-34)', () => {
    expect(szablony.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-06', 'sc-32', 'sc-33', 'sc-34']));
  });
  for (const szablon of szablony) {
    for (const poziom of szablon.levels) {
      it(`${szablon.id} ${poziom}: każda akcja każdego punktu daje ocenę bez surowych znaczników`, async () => {
        const oczekiwane = szablon.bounds[poziom]!.expected as Akcja[];
        for (let k = 0; k < szablon.decisions.length; k++) {
          const przed = oczekiwane.slice(0, k);
          await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, 3, przed)} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
          expect(tekstEkranu()).not.toContain('{{');
          for (const a of szablon.decisions[k]!.actions) {
            await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, 3, [...przed, a.action as Akcja])} faza="ocena" koniec={k === szablon.decisions.length - 1} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
            const t = tekstEkranu();
            expect(`${a.action}: ${t}`).toMatch(/Ocena: /);
            expect(t).not.toContain('{{');
          }
        }
      });
    }
  }
});
