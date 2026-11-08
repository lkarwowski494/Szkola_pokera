// D-248 (rola 08 cz. 5 krok 3): plan z listą zadań — wznowienie buduje ten sam zestaw (BR-CWI-004, flow 06).
// Reguła: lista zadań, jeśli jest, ma dokładnie `liczbaKrokow` pozycji z niepustym id i całkowitym ziarnem (krok i = zadanie i).
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, startAktywnosci, type Limit, type PlanAktywnosci } from '../src';

const T0 = Date.UTC(2026, 10, 8, 12);
const JEDNA: Limit = { bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: 0 };
const start = (plan: PlanAktywnosci) =>
  startAktywnosci({ rodzaj: 'sesja', pierwszePodejscieTestu: false, limit: JEDNA, teraz: T0, dzienLokalny: '2026-11-08', strefa: 'Europe/Warsaw', plan });

describe('D-248 plan z zadaniami', () => {
  it('zadania zgodne z liczbą kroków → start, plan zapisany bez zmian', () => {
    const plan = { liczbaKrokow: 2, trescId: null, zadania: [{ id: 'z1', ziarno: 7 }, { id: 'z2', ziarno: 0 }] };
    const r = start(plan);
    expect(r.ok && r.wartosc.plan).toEqual(plan);
  });
  it('liczba zadań ≠ liczba kroków → plan_niepoprawny (krok bez zadania albo zadanie bez kroku)', () => {
    expect(start({ liczbaKrokow: 3, trescId: null, zadania: [{ id: 'z1', ziarno: 1 }, { id: 'z2', ziarno: 2 }] })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
    expect(start({ liczbaKrokow: 1, trescId: null, zadania: [{ id: 'z1', ziarno: 1 }, { id: 'z2', ziarno: 2 }] })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });
  it('puste id albo ziarno niecałkowite → plan_niepoprawny', () => {
    expect(start({ liczbaKrokow: 1, trescId: null, zadania: [{ id: '', ziarno: 1 }] })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
    expect(start({ liczbaKrokow: 1, trescId: null, zadania: [{ id: 'z1', ziarno: 0.5 }] })).toEqual({ ok: false, powod: 'plan_niepoprawny' });
  });
});
