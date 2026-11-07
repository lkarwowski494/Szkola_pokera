// Test roli 08 (fix L7-13b, próba mutacji D-172): przypadki przebiegu scenariusza spoza testu 07. Wyrocznia: kontrakt
// `przebiegScenariusza` (scenariusz.ts, moduly.md D-219): wybór, dla którego nie ma decyzji (po końcu), to `akcja_niedostepna`.
import { describe, expect, it } from 'vitest';
import { przebiegScenariusza, type TrescScenariusza } from '../src';

const SCN: TrescScenariusza = {
  id: 'scn-08', rekaGracza: ['As', 'Ad'], rekaRywala: ['Kc', 'Kd'], stol: ['2h', '7s', '9c', 'Jd', '3h'],
  decyzje: [
    { ulica: 'preflop', akcje: [{ akcja: 'raise', czestosc: 1, rywal: 'call', dalej: 1, wyjasnienie: 'a' }, { akcja: 'fold', czestosc: 0, rywal: null, dalej: 'koniec', wyjasnienie: 'b' }] },
    { ulica: 'flop', akcje: [{ akcja: 'bet', czestosc: 1, rywal: 'call', dalej: 'pokazanie', wyjasnienie: 'c' }] },
  ],
};

describe('scenariusz: przypadki roli 08', () => {
  it.each([[['fold', 'bet']], [['raise', 'bet', 'bet']]])('wybory %j: wybór po końcu scenariusza → akcja_niedostepna', (wybory) => {
    expect(przebiegScenariusza(SCN, wybory)).toEqual({ ok: false, powod: 'akcja_niedostepna' });
  });
  it('ta sama kategoria u obu graczy (para asów wobec pary króli) → zwycięzca bez liczb układów', () => {
    const p = przebiegScenariusza(SCN, ['raise', 'bet']);
    expect(p).toMatchObject({ ok: true, wartosc: { koniec: 'pokazanie', pokazanie: { zwyciezca: 'gracz', wyjasnienie: '' } } });
  });
});
