// CN (NIS-004 CM, D-787): plan scenariusza niesie odcisk wariantu; plan sprzed CN (bez odcisku) czyta się jak dotąd, odcisk innego typu to plan niepoprawny.
import { describe, expect, it } from 'vitest';
import { parsujPlan } from '../src';

const baza = { liczbaKrokow: 1, trescId: 'sc-01', decyzje: [[{ akcja: 'fold', dalej: 'koniec' }, { akcja: 'call', dalej: 'pokazanie' }]] };
describe('parsujPlan: odcisk wariantu', () => {
  it('odcisk zapisany w planie wraca po odczycie', () => {
    expect(parsujPlan({ ...baza, wariant: { poziom: 'sredni', ziarno: 7, odcisk: 'sc-01|sredni|AhKh/...' } })?.wariant).toEqual({ poziom: 'sredni', ziarno: 7, odcisk: 'sc-01|sredni|AhKh/...' });
  });
  it('plan sprzed CN (bez odcisku) czytany jak dotąd, bez pola odcisk', () => {
    expect(parsujPlan({ ...baza, wariant: { poziom: 'sredni', ziarno: 7 } })?.wariant).toEqual({ poziom: 'sredni', ziarno: 7 });
  });
  it('odcisk nie będący napisem: plan niepoprawny (null), nie cicho pominięty', () => {
    expect(parsujPlan({ ...baza, wariant: { poziom: 'sredni', ziarno: 7, odcisk: 5 } })).toBeNull();
  });
});
