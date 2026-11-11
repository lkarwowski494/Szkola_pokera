/// <reference types="jest" />
// Recenzja CT (rola 08, audit, D-043), pkt (c): SC-11 i SC-12 z prawdziwej bazy treści pl — ekran oceny pokazuje dla każdej z trzech akcji
// tę ocenę, którą niesie wariant (`verdicts`, poker-core `cbetVerdict`), a ta jest oceną silnika gry (porównanie z gradeDecision na prawdziwym
// rozdaniu: tools/content-build/test/recenzja-ct-odtworzenie.test.ts). `cs-tresc-realna.test.tsx` sprawdza tylko, że ocena się pojawia.
// Raport: docs/programista/recenzje/recenzja-cs-8133a8c.md.
import '@/i18n';
import { render } from '@testing-library/react-native';
import { generateVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora, getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, ocenyAkcji, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const szablony = getScenarioTemplates(dbCn);
const wariant = (szablon: ScenarioTemplate, poziom: 'latwy' | 'sredni', ziarno: number) => generateVariant(naGenerator(szablon), poziom, ziarno, getKontekstGeneratora(dbCn, szablon));
const sesja = (szablon: ScenarioTemplate, poziom: 'latwy' | 'sredni', ziarno: number, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom, wariant: wariant(szablon, poziom, ziarno), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
} as unknown as SesjaScenariusza);
// werdykt reguły c-betu → słowo oceny na ekranie (pl.json grade.*), niezależnie od tabeli w wariant.ts
const SLOWO = { compliant: 'Zgodna', acceptable: 'Dopuszczalna', inaccuracy: 'Niedokładność', mistake: 'Błąd' } as const;
const OCENA = { compliant: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', mistake: 'blad' } as const;

describe('CT (c): ekran SC-11 i SC-12 z bazy treści ocenia każdą akcję tak jak wariant (werdykt reguły silnika gry)', () => {
  for (const id of ['sc-11', 'sc-12']) {
    for (const poziom of ['latwy', 'sredni'] as const) {
      for (const ziarno of [1, 7]) {
        it(`${id} ${poziom} ziarno ${ziarno}: pasek ocen i „Ocena:” dla check, bet-small, bet-big = verdicts wariantu`, async () => {
          const szablon = szablony.find((t) => t.id === id)!;
          const p = wariant(szablon, poziom, ziarno).points[0]!;
          if (p.point !== 'cbet-case') throw new Error(`punkt ${p.point}`);
          expect(ocenyAkcji(wariant(szablon, poziom, ziarno), 0)).toEqual({ check: OCENA[p.verdicts.check], 'bet-small': OCENA[p.verdicts['bet-small']], 'bet-big': OCENA[p.verdicts['bet-big']] });
          for (const akcja of ['check', 'bet-small', 'bet-big'] as const) {
            await render(<PrzebiegScenariusza sesja={sesja(szablon, poziom, ziarno, [akcja])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
            expect(tekstEkranu()).toContain(`Ocena: ${SLOWO[p.verdicts[akcja]]}`);
          }
        });
      }
    }
  }
});
