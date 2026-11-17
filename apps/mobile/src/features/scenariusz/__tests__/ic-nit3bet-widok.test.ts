/// <reference types="jest" />
// IC (zadanie 2, P3 IB): gałąź nit-3bet w `widokDecyzji` zależy od szablonu (`s`: martwe blindy z pozycji). Bez `s` widok niesie tylko stół, kwoty są brakiem
// (null), nie zgadniętą liczbą; z `s` pula = otwarcie + 3-bet + martwe blindy (D-1841). Test utrwalający: zachowanie bez `s` było już takie (przejście do gałęzi końcowej),
// teraz jest jawne w kodzie i przypięte testem; callery bez `s` (liczby.ts, wartosciZnacznikow) czytają tylko `.stol`.
import '@/i18n';
import { generateVariant } from '@szkola/poker-core';
import { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn } from '@/test-utils/kontekstCn';
import { naGenerator, widokDecyzji } from '../wariant';

const wyj = (a: string, zdanie: string) => ({ action: a, explanation: `Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}. ${zdanie}` });
const NIT_3BET = ScenarioTemplate.parse({
  id: 'sc-fx-nit-3bet', module: 'm10', situation: 'Fixture: bardzo ciasny rywal 3-betuje.', table: '6max', positions: { hero: 'BTN', villain: 'BB' }, stackBb: 100, levels: ['latwy'],
  bounds: { latwy: { expected: ['fold'], marginMin: 0.03 } },
  decisions: [{ street: 'preflop', kind: 'nit-3bet', rule: 'R-M10-007', open: 2.5, threeBet: 10, vpips: [0.08, 0.1],
    actions: [wyj('fold', 'VPIP {{w:vpip}}: pas.'), wyj('call', 'VPIP {{w:vpip}}: sprawdzenie to niedokładność.')] }],
});
const wariant = generateVariant(naGenerator(NIT_3BET), 'latwy', 3, getKontekstGeneratora(dbCn, NIT_3BET));

describe('IC (P3 IB): widokDecyzji, nit-3bet bez i z szablonem', () => {
  it('bez szablonu: ulica preflop, pusty stół, kwoty null (nie zgadnięte)', () => {
    expect(widokDecyzji(wariant, 0)).toEqual({ indeks: 0, ulica: 'preflop', stol: [], pulaBb: null, doSprawdzeniaBb: null });
  });
  it('z szablonem: pula 13 bb (2,5 + 10 + SB 0,5), do sprawdzenia 7,5 bb', () => {
    expect(widokDecyzji(wariant, 0, NIT_3BET)).toMatchObject({ pulaBb: 13, doSprawdzeniaBb: 7.5 });
  });
});
