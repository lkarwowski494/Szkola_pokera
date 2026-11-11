/// <reference types="jest" />
// CS (CQ 06-tresci-001): szablony SC-11 i SC-12 z prawdziwej bazy treści pl (nie fixtury) startują na ekranie z kontekstem generatora:
// trzy akcje c-betu, każda ma ocenę i wyjaśnienie z szablonu, bez surowych znaczników. Szablonu z punktem icm-call w bazie nie ma (D-807).
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
const sesja = (szablon: ScenarioTemplate, poziom: 'latwy' | 'sredni', ziarno: number, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom, wariant: generateVariant(naGenerator(szablon), poziom, ziarno, getKontekstGeneratora(dbCn, szablon)), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
} as unknown as SesjaScenariusza);

describe('treść z bazy: SC-11 i SC-12 na ekranie (CQ 06-tresci-001)', () => {
  it('baza nie ma szablonu z punktem icm-call ani range-spot (ekran ich nie obsługuje)', () => {
    expect(szablony.flatMap((t) => t.decisions.map((d) => d.kind)).filter((k) => k === 'icm-call' || k === 'range-spot')).toEqual([]);
    expect(szablony.map((t) => t.id)).toEqual(expect.arrayContaining(['sc-11', 'sc-12']));
    expect(szablony.map((t) => t.id)).not.toContain('sc-34');
  });
  for (const id of ['sc-11', 'sc-12']) {
    for (const poziom of ['latwy', 'sredni'] as const) {
      it(`${id} ${poziom}: decyzja ma trzy przyciski z trzema akcjami c-betu`, async () => {
        const szablon = szablony.find((t) => t.id === id)!;
        const onWybierz = jest.fn();
        await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, 7, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={onWybierz} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
        for (const [nazwa, akcja] of [[/^Czekam/, 'check'], [/^Mały/, 'bet-small'], [/^Duży/, 'bet-big']] as const) {
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
