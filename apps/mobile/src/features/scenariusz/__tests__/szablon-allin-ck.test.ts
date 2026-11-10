/// <reference types="jest" />
// CK 08-programista-002: linia all-in (F5) działa na ekranie: adapter przekazuje stackBb, więc generator liczy cały stos za pulą
// i `otworzScenariusz` nie kończy się „plan_niepoprawny”. Szablon jak fixture BU `sc-fx-allin-draw` (fikcja testowa, nie treść).
import type { ScenarioTemplate } from '@szkola/content-schema';
import { generateVariant } from '@szkola/poker-core';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';
import { otworzScenariusz } from '../aktywnoscScenariusza';
import { naGenerator, widokDecyzji } from '../wariant';

const MARTWE_BLINDY_BB = 1.5; // jak scenario-gen.ts
const ALLIN: ScenarioTemplate = {
  id: 'sc-fx-allin-draw', module: 'm2', situation: '-', table: '6max', positions: { hero: 'BB', villain: 'BTN' }, stackBb: 35,
  levels: ['sredni'],
  bounds: { sredni: { draws: ['flush', 'oesd', 'gutshot'], drawToBest: true, marginMin: 0.02, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] } },
  decisions: [{
    street: 'turn', kind: 'draw-call', pots: [30, 36, 40, 44], fractions: [1], villain: 'all-in', rule: 'R-M7-007',
    actions: [{ action: 'call', explanation: '-' }, { action: 'fold', explanation: '-' }],
  }],
};
const T0 = Date.UTC(2026, 10, 10, 10);

describe('linia all-in na ekranie (CK, 08-programista-002)', () => {
  it('wariant: zakład to cały stos za pulą (stackBb − wkład gracza), widok pokazuje go w bb', () => {
    const v = generateVariant(naGenerator(ALLIN), 'sredni', 3);
    const d = v.decisions[0]!;
    expect(d.bet).toBe(Math.round(35 - (d.pot - MARTWE_BLINDY_BB) / 2));
    expect(widokDecyzji(v, 0).doSprawdzeniaBb).toBe(d.bet);
  });
  it('otworzScenariusz: rozdanie startuje (nie „plan_niepoprawny”)', async () => {
    const { port } = await portTestowy();
    const r = await otworzScenariusz(port, {
      szablon: ALLIN, poziom: 'sredni', tryb: 'nowe', limit: { bezLimitu: true }, ziarno: 3, sesja: new Set(),
      zegar: utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0), noweId: () => 's1',
    });
    expect(r.ok).toBe(true);
  });
});
