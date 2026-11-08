/// <reference types="jest" />
// Krok 6 części 4 (ADR 0013 pkt 1–2): adapter OchronaTla nad modułem `modules/ochrona-tla` (atrapa modułu natywnego).
// Swift (beginBackgroundTask / endBackgroundTask) bez testu w Node — sprawdzenie na telefonie, krok właściciela U-2.
import type { ModulOchronyTla } from '../../../modules/ochrona-tla';
import { utworzOchroneTla } from '@/platform/ochronaTla';

function atrapa() {
  const sluchacze = new Set<(e: { id: number }) => void>();
  const zakonczone: number[] = [];
  let nastepny = 7;
  const mod: ModulOchronyTla = {
    rozpocznij: jest.fn(() => nastepny++),
    zakoncz: jest.fn((id: number) => void zakonczone.push(id)),
    addListener: (_n, fn) => {
      sluchacze.add(fn);
      return { remove: () => void sluchacze.delete(fn) };
    },
  };
  return { mod, zakonczone, sluchacze, wygasa: (id: number) => sluchacze.forEach((f) => f({ id })) };
}

describe('OchronaTla (adapter)', () => {
  it('rozpocznij przekazuje nazwę i id z modułu; zakoncz woła moduł', () => {
    const a = atrapa();
    const o = utworzOchroneTla(a.mod);
    const id = o.rozpocznij('import');
    expect(a.mod.rozpocznij).toHaveBeenCalledWith('import');
    expect(id).toBe(7);
    o.zakoncz(id);
    expect(a.zakonczone).toEqual([7]);
  });

  it('po wygasa: słuchacz dostaje id, a późniejsze zakoncz(id) nie woła modułu drugi raz (handler natywny już zakończył)', () => {
    const a = atrapa();
    const o = utworzOchroneTla(a.mod);
    const wygasle: number[] = [];
    o.naWygasniecie((id) => wygasle.push(id));
    const id = o.rozpocznij('eksport');
    a.wygasa(id);
    expect(wygasle).toEqual([id]);
    o.zakoncz(id);
    expect(a.zakonczone).toEqual([]);
  });

  it('wypisanie odpina słuchacza', () => {
    const a = atrapa();
    const o = utworzOchroneTla(a.mod);
    const fn = jest.fn();
    const przed = a.sluchacze.size; // adapter ma własnego słuchacza (rejestr wygaśnięć)
    const wypisz = o.naWygasniecie(fn);
    expect(a.sluchacze.size).toBe(przed + 1);
    wypisz();
    a.wygasa(1);
    expect(fn).not.toHaveBeenCalled();
    expect(a.sluchacze.size).toBe(przed);
  });

  it('system nie dał czasu: −1, zakoncz(−1) bez wywołania modułu', () => {
    const a = atrapa();
    (a.mod.rozpocznij as jest.Mock).mockReturnValueOnce(-1);
    const o = utworzOchroneTla(a.mod);
    expect(o.rozpocznij('kopia')).toBe(-1);
    o.zakoncz(-1);
    expect(a.zakonczone).toEqual([]);
  });

  it('bez modułu (Android, testy, Expo Go): −1, wypisanie bez działania', () => {
    const o = utworzOchroneTla(null);
    expect(o.rozpocznij('import')).toBe(-1);
    expect(() => o.zakoncz(-1)).not.toThrow();
    expect(() => o.naWygasniecie(() => undefined)()).not.toThrow();
  });
});
