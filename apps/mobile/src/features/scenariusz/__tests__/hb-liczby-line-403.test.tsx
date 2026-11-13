/// <reference types="jest" />
// 08-programista-403 (DEV-12/16, pokrewne KO-102): `scenario.numbers.line` formatuje kwotę i pulę przez formatujLiczbe według języka zadań.
// Dziś wszystkie punkty draw-call w content/ mają kwoty całkowite; ułamek (np. all-in przy innych stosach) przeszedłby jako „12.5”.
import '@/i18n';
import i18n from '@/i18n';
import type { ScenarioLevel } from '@szkola/poker-core';
import { getKontekstGeneratora, getScenarioTemplates } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { generateVariant } from '@szkola/poker-core';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { zdaniaLiczb } from '../liczby';
import { naGenerator } from '../wariant';

const t = (k: string, o?: Record<string, unknown>) => i18n.t(k, o) as string;

describe('403: linia draw-call z ułamkową kwotą i pulą (locale z przecinkiem)', () => {
  it('kwota 2,5 bb i pula 12,5 bb (pot 10 + bet 2,5) pokazane z przecinkiem, nie z kropką', () => {
    for (const szablon of getScenarioTemplates(dbCn).filter((x) => x.decisions.some((d) => d.kind === 'draw-call' || d.kind === undefined))) {
      for (const poziom of szablon.levels as ScenarioLevel[]) {
        for (let ziarno = 1; ziarno <= 60; ziarno++) {
          let wariant;
          try { wariant = generateVariant(naGenerator(szablon), poziom, ziarno, getKontekstGeneratora(dbCn, szablon)); } catch { continue; }
          const d = wariant.points[0];
          if (!d || d.point !== 'draw-call') continue;
          const s = { id: 's1', szablon, poziom, wariant: { ...wariant, points: [{ ...d, bet: 2.5, pot: 10 }] }, wybory: ['call'] } as unknown as SesjaScenariusza;
          const linia = zdaniaLiczb(s, 0, 'call', t)[0]!;
          expect(linia).toContain('12,5 bb');
          expect(linia).toContain('kosztuje 2,5 bb');
          expect(linia).not.toMatch(/\d\.\d bb/);
          return;
        }
      }
    }
    throw new Error('brak punktu draw-call w bazie testowej');
  });
});
