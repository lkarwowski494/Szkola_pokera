// Repozytoria `uprawnienia` (pamięć dostępu, D-209) i `dziennik` (D-240) — rola 08 cz. 5 krok 5.
import { afterEach, describe, expect, it } from 'vitest';
import { KONFIGURACJA } from '../../domena/src';
import { odczytajDziennik, odczytajPamiec, zapiszPamiec, zapiszWpisDziennika } from '../src';
import { ile } from '../../../tests/narzedzia/postep-node';
import { T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { bladIO, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const [KW, ROK, DOZ] = KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE;

describe('uprawnienia (pamięć dostępu)', () => {
  it('odczyt wzorca: produkty z końcem albo bez (null), czas odczytu', async () => {
    const { port } = await przygotuj('wzorzec');
    const w = await odczytajPamiec(port);
    expect(w).toEqual({ ok: true, wartosc: { produkty: [{ produkt: DOZ, wygasaMs: null }, { produkt: ROK, wygasaMs: T0 + 300 * 86_400_000 }], odczytanoMs: T0 } });
  });
  it('pusta baza → null', async () => {
    const { port } = await przygotuj('pusta');
    expect(await odczytajPamiec(port)).toEqual({ ok: true, wartosc: null });
  });
  it('zapis zastępuje całą pamięć (produkt, którego już nie ma, znika)', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await zapiszPamiec(port, { produkty: [{ produkt: KW, wygasaMs: T0 + 5 }], odczytanoMs: T0 + 1 })).toEqual({ ok: true, wartosc: undefined });
    expect(await odczytajPamiec(port)).toEqual({ ok: true, wartosc: { produkty: [{ produkt: KW, wygasaMs: T0 + 5 }], odczytanoMs: T0 + 1 } });
  });
  it('pusta pamięć (udany odczyt bez zakupów) usuwa wpisy; odczyt daje null — dostęp ten sam (brak)', async () => {
    const { db, port } = await przygotuj('wzorzec');
    await zapiszPamiec(port, { produkty: [], odczytanoMs: T0 + 1 });
    expect(ile(db, 'uprawnienie_cache')).toBe(0);
    expect(await odczytajPamiec(port)).toEqual({ ok: true, wartosc: null });
  });
  it('błąd w środku zapisu → pamięć bez zmian', async () => {
    const { db, port } = await przygotuj('wzorzec');
    expect(await zapiszPamiec(port, { produkty: [{ produkt: KW, wygasaMs: 1 }, { produkt: '', wygasaMs: 1 }], odczytanoMs: T0 + 1 })).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(ile(db, 'uprawnienie_cache')).toBe(2);
  });
});

describe('dziennik', () => {
  it('wpis zapisany; odczyt od najstarszego; brak ekranu zostaje null', async () => {
    const { port } = await przygotuj('pusta');
    await zapiszWpisDziennika(port, { ms: 2, kod: 'zakup_blad', ekran: null, wersja: '0.1.0' }, 10);
    await zapiszWpisDziennika(port, { ms: 3, kod: 'zapis_nieudany', ekran: 'sesja', wersja: '0.1.0' }, 10);
    expect(await odczytajDziennik(port)).toEqual({ ok: true, wartosc: [
      { ms: 2, kod: 'zakup_blad', ekran: null, wersja: '0.1.0' }, { ms: 3, kod: 'zapis_nieudany', ekran: 'sesja', wersja: '0.1.0' },
    ] });
  });
  it('przycięcie do maks najnowszych w tej samej transakcji (granica: równo maks zostaje)', async () => {
    const { db, port } = await przygotuj('pusta');
    for (let i = 0; i < 3; i++) await zapiszWpisDziennika(port, { ms: i, kod: 'k', ekran: null, wersja: 'v' }, 3);
    expect(ile(db, 'dziennik')).toBe(3);
    await zapiszWpisDziennika(port, { ms: 3, kod: 'k', ekran: null, wersja: 'v' }, 3);
    const w = await odczytajDziennik(port);
    expect(w.ok && w.wartosc.map((x) => x.ms)).toEqual([1, 2, 3]);
  });
  it('błąd bazy → zapis_nieudany / odczyt_nieudany', async () => {
    const { port } = await przygotuj('pusta');
    const z = { ...port, all: async () => { throw bladIO(); }, transakcja: async () => { throw bladIO(); } };
    expect(await zapiszWpisDziennika(z, { ms: 1, kod: 'k', ekran: null, wersja: 'v' }, 3)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(await odczytajDziennik(z)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
    expect(await zapiszPamiec(z, { produkty: [], odczytanoMs: 1 })).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(await odczytajPamiec(z)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});
