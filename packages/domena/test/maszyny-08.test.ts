// Test roli 08 (próby mutacji D-172): przypadki maszyn, które przeżyły mutanty przy testach 07.
// Wyrocznia: moduly.md „Maszyny stanów” (scenariusz przyjmuje tylko akcje z oceną, D-109; `porzuc` = „inna aktywność tego rodzaju”).
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, startAktywnosci, wejscieDoAktywnosci, type AktywnoscWToku, type Limit } from '../src';

const T0 = Date.UTC(2026, 10, 7, 12);
const JEDNA: Limit = { bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: 0 };

describe('maszyny: przypadki roli 08', () => {
  it('scenariusz z pustą listą akcji w którymkolwiek kroku → plan_niepoprawny (krok bez akcji z oceną nie da się przejść)', () => {
    const r = startAktywnosci({
      rodzaj: 'scenariusz', pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw',
      plan: { liczbaKrokow: 2, trescId: 'scn-a', akcjeZOcena: [['fold'], []] },
    });
    expect(r).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });

  it('aktywność w toku innego rodzaju nie jest porzucana ani wznawiana: wejście do sesji przy lekcji w toku → start', () => {
    const lekcja: AktywnoscWToku = {
      stan: 'w_toku', rodzaj: 'lekcja', zLimitu: false, dzienLokalny: '2026-11-07', strefa: 'Europe/Warsaw', startMs: T0,
      plan: { liczbaKrokow: 4, trescId: null }, krok: 1,
    };
    expect(wejscieDoAktywnosci('sesja', null, lekcja, false, JEDNA)).toEqual({ akcja: 'start', zLimitu: true });
  });
});
