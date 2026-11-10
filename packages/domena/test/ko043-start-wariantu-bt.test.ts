// BT, krok F, recenzja BO ŚR-101: KO-043 (powtórka wariantu poza limitem) musi działać na ścieżce startu aktywności,
// nie tylko w `mozeStartowac`. Wyrocznia: `limit.ts` (limit liczy nowe warianty, „Zagraj jeszcze raz” jest tą samą aktywnością).
import { describe, expect, it } from 'vitest';
import { startAktywnosci, wejscieDoAktywnosci, type Limit } from '../src';

const T0 = Date.UTC(2026, 10, 10, 12);
const WYCZERPANY: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: T0 + 1 };
const PLAN = { liczbaKrokow: 1, trescId: 'sc-01', decyzje: [[{ akcja: 'call', dalej: 'koniec' as const }, { akcja: 'fold', dalej: 'koniec' as const }]] };
const wej = { rodzaj: 'scenariusz' as const, pierwszePodejscieTestu: false, limit: WYCZERPANY, plan: PLAN, teraz: T0, dzienLokalny: '2026-11-10', strefa: 'Europe/Warsaw' };
const HISTORIA = [{ odcisk: 'sc-01|latwy|A', ziarno: 1 }, { odcisk: 'sc-01|latwy|B', ziarno: 2 }];

describe('KO-043 na ścieżce startu (ŚR-101)', () => {
  it('limit wyczerpany + powtórka ostatniego wariantu → start poza limitem (zLimitu: false)', () => {
    const r = startAktywnosci({ ...wej, wariant: { historia: HISTORIA, odcisk: 'sc-01|latwy|B' } });
    expect(r.ok).toBe(true);
    expect(r.ok ? r.wartosc.zLimitu : null).toBe(false);
  });
  it('limit wyczerpany + nowy wariant → limit_wyczerpany', () => {
    expect(startAktywnosci({ ...wej, wariant: { historia: HISTORIA, odcisk: 'sc-01|latwy|C' } })).toEqual({ ok: false, powod: 'limit_wyczerpany' });
  });
  it('limit wyczerpany + starszy wpis niż ostatni → nowe rozdanie, limit_wyczerpany', () => {
    expect(startAktywnosci({ ...wej, wariant: { historia: HISTORIA, odcisk: 'sc-01|latwy|A' } })).toEqual({ ok: false, powod: 'limit_wyczerpany' });
  });
  it('bez wariantu zachowanie jak dotąd (limit wyczerpany → odmowa)', () => {
    expect(startAktywnosci(wej)).toEqual({ ok: false, powod: 'limit_wyczerpany' });
  });
  it('wejscieDoAktywnosci: powtórka wariantu przy wyczerpanym limicie → start, nie ekran zakupu', () => {
    expect(wejscieDoAktywnosci('scenariusz', 'sc-01', null, false, WYCZERPANY, { historia: HISTORIA, odcisk: 'sc-01|latwy|B' })).toEqual({ akcja: 'start', zLimitu: false });
  });
});
