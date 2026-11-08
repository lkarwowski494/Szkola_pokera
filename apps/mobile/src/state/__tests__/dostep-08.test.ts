/// <reference types="jest" />
// Dostęp od startu aplikacji (D-247, 08-F06; ADR 0006, D-209): pamięć `uprawnienie_cache` → nasłuch transakcji → odczyt sklepu
// → `decyzja` domeny → zapis pamięci. Wzór: Trening lib/entitlement.ts:74–79 (odczyt 2026-11-08). Port na node:sqlite,
// sklep jako atrapa portu `Sklep` (odczyt + nasłuch).
import { KONFIGURACJA, type OdczytSklepu } from '@szkola/domena';
import { odczytajPamiec, zapiszPamiec } from '@szkola/postep';
import { odswiezDostep, startDostepu, useDostep } from '@/state/dostep';
import { portTestowy } from '@/test-utils/postepTestowy';

jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));

const [, ROK] = KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE;
const T = 1_800_000_000_000;
const aktywny: OdczytSklepu = { ok: true, transakcje: [{ produkt: ROK!, wygasaMs: T + 1000, odebrana: false }] };
type Zdarzenie = 'zakonczona' | 'oczekuje' | 'anulowano' | 'blad';
function sklep(odczyty: OdczytSklepu[]) {
  const sluchacze: ((z: Zdarzenie) => void)[] = [];
  const kolejnosc: string[] = [];
  return {
    kolejnosc,
    emituj: (z: Zdarzenie) => sluchacze.forEach((f) => f(z)),
    odczyt: jest.fn(async () => {
      kolejnosc.push('odczyt');
      return odczyty.shift() ?? { ok: false as const };
    }),
    nasluchuj: jest.fn((f: (z: Zdarzenie) => void) => {
      kolejnosc.push('nasluch');
      sluchacze.push(f);
      return () => kolejnosc.push('odpiecie');
    }),
  };
}

describe('odświeżenie dostępu', () => {
  it('udany odczyt sklepu: dostęp i pamięć zapisana', async () => {
    const { port } = await portTestowy();
    expect(await odswiezDostep(port, sklep([aktywny]), T)).toBe(true);
    expect(await odczytajPamiec(port)).toEqual({ ok: true, wartosc: { produkty: [{ produkt: ROK, wygasaMs: T + 1000 }], odczytanoMs: T } });
  });
  it('błąd sklepu: decyduje pamięć ostatniego udanego odczytu, bez zmiany (W4–W6)', async () => {
    const { port } = await portTestowy();
    await zapiszPamiec(port, { produkty: [{ produkt: ROK!, wygasaMs: T + 1000 }], odczytanoMs: T - 5 });
    expect(await odswiezDostep(port, sklep([{ ok: false }]), T)).toBe(true);
    expect((await odczytajPamiec(port)).ok && (await odczytajPamiec(port))).toEqual({ ok: true, wartosc: { produkty: [{ produkt: ROK, wygasaMs: T + 1000 }], odczytanoMs: T - 5 } });
    expect(await odswiezDostep(port, sklep([{ ok: false }]), T + 2000)).toBe(false); // pamięć po końcu okresu
  });
  it('udany odczyt bez zakupów czyści pamięć (zwrot, W7)', async () => {
    const { port } = await portTestowy();
    await zapiszPamiec(port, { produkty: [{ produkt: ROK!, wygasaMs: T + 1000 }], odczytanoMs: T - 5 });
    expect(await odswiezDostep(port, sklep([{ ok: true, transakcje: [] }]), T)).toBe(false);
    expect(await odczytajPamiec(port)).toEqual({ ok: true, wartosc: null });
  });
});

describe('start dostępu (D-247)', () => {
  beforeEach(() => useDostep.setState({ pro: false }));

  it('najpierw pamięć, potem nasłuch, potem odczyt sklepu; wynik w stanie aplikacji', async () => {
    const { port } = await portTestowy();
    await zapiszPamiec(port, { produkty: [{ produkt: ROK!, wygasaMs: T + 1000 }], odczytanoMs: T - 5 });
    const s = sklep([{ ok: true, transakcje: [] }]);
    const stany: boolean[] = [];
    const odepnij = useDostep.subscribe((x) => stany.push(x.pro));
    const stop = startDostepu(port, s, () => T);
    await new Promise((r) => setTimeout(r, 20));
    expect(s.kolejnosc.slice(0, 2)).toEqual(['nasluch', 'odczyt']);
    expect(stany).toEqual([true, false]); // pamięć dała dostęp, odczyt sklepu go odebrał
    stop();
    odepnij();
    expect(s.kolejnosc).toContain('odpiecie');
  });

  it('zakończona transakcja z nasłuchu (np. zgoda rodzica, odnowienie) → ponowny odczyt i dostęp bez ponownego uruchomienia', async () => {
    const { port } = await portTestowy();
    const s = sklep([{ ok: true, transakcje: [] }, aktywny]);
    const stop = startDostepu(port, s, () => T);
    await new Promise((r) => setTimeout(r, 20));
    expect(useDostep.getState().pro).toBe(false);
    s.emituj('oczekuje');
    s.emituj('zakonczona');
    await new Promise((r) => setTimeout(r, 20));
    expect(s.odczyt).toHaveBeenCalledTimes(2);
    expect(useDostep.getState().pro).toBe(true);
    stop();
  });
});
