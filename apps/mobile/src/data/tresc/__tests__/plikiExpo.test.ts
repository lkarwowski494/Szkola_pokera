/// <reference types="jest" />
// Adapter `PlikiTresci` na expo (D-232) z atrapą systemu plików w pamięci: tłumaczenie „katalogu paczki” na zasoby Metro,
// kopia bez nadpisywania, usuwanie idempotentne, przebieg `przygotujTresc` z domeny na adapterze (URI z „file://”).
// Zachowanie na urządzeniu (prawdziwe expo-file-system, ścieżki iOS) sprawdza E2E (flowy z treścią) — tu tylko logika adaptera.
import { KONFIGURACJA, przygotujTresc } from '@szkola/domena';
import { PACZKA, plikiTresciExpo, type SystemPlikow } from '../plikiExpo';
import { metaZWierszy } from '../startTresci';

const KATALOG = 'file:///Documents/SQLite';
const MAPA = { pl: { plik: 'tresc-abc-pl.db', zasob: 11 }, de: { plik: 'tresc-abc-de.db', zasob: 12 } };

function atrapa(start: Record<string, string> = {}, o: { zasobNull?: boolean } = {}) {
  const pliki = new Map<string, string>(Object.entries(start));
  pliki.set('file:///App.app/assets/tresc-abc-pl.db', 'PL');
  pliki.set('file:///App.app/assets/tresc-abc-de.db', 'DE');
  const kopie: { z: string; na: string }[] = [];
  const sys: SystemPlikow = {
    plik: (uri) => ({
      uri,
      get exists() { return pliki.has(uri); },
      // najgorszy przypadek systemu: kopia i przeniesienie nadpisują po cichu, więc „bez nadpisywania” musi zapewnić adapter
      copy: async (cel) => {
        const t = pliki.get(uri);
        if (t === undefined) throw new Error('brak źródła');
        kopie.push({ z: uri, na: cel.uri });
        pliki.set(cel.uri, t);
      },
      move: async (cel) => {
        const t = pliki.get(uri);
        if (t === undefined) throw new Error('brak');
        pliki.delete(uri);
        pliki.set(cel.uri, t);
      },
      delete: () => { if (!pliki.delete(uri)) throw new Error('brak pliku'); },
    }),
    katalog: (uri) => ({
      exists: [...pliki.keys()].some((k) => k.startsWith(`${uri}/`)) || uri === KATALOG,
      list: () => {
        if (!([...pliki.keys()].some((k) => k.startsWith(`${uri}/`)) || uri === KATALOG)) throw new Error('brak katalogu');
        return [...pliki.keys()].filter((k) => k.startsWith(`${uri}/`)).map((k) => ({ name: k.slice(uri.length + 1) }));
      },
    }),
    zasob: async (id) => (o.zasobNull ? null : id === 11 ? 'file:///App.app/assets/tresc-abc-pl.db' : id === 12 ? 'file:///App.app/assets/tresc-abc-de.db' : null),
  };
  return { sys, pliki, kopie };
}

const meta = (j: string) => ({ format: String(KONFIGURACJA.TRESC_FORMAT), wersja: 'abc', jezyk: j, min_wersja_aplikacji: '0.1.0' });
const start = (a: ReturnType<typeof atrapa>, jezyk = 'pl') =>
  przygotujTresc({
    paczka: PACZKA, katalog: KATALOG, jezyk, pliki: plikiTresciExpo(MAPA, a.sys), obslugiwanyFormat: KONFIGURACJA.TRESC_FORMAT,
    otworz: async (s) => ({ baza: s, meta: a.pliki.get(s) === 'PL' ? meta('pl') : a.pliki.get(s) === 'DE' ? meta('de') : null }),
    zamknij: async () => undefined,
  });

describe('adapter PlikiTresci (expo)', () => {
  it('pierwszy start: kopia z zasobu paczki pod nazwę tymczasową w katalogu baz, potem plik docelowy; postęp nietknięty', async () => {
    const a = atrapa({ [`${KATALOG}/postep.db`]: 'POSTEP', [`${KATALOG}/content-v6.db`]: 'STARA' });
    expect(await start(a)).toMatchObject({ ok: true, wartosc: { plik: 'tresc-abc-pl.db' } });
    expect(a.kopie).toEqual([{ z: 'file:///App.app/assets/tresc-abc-pl.db', na: `${KATALOG}/tresc-abc-pl.db.kopia` }]);
    expect([...a.pliki.keys()].filter((k) => k.startsWith(KATALOG)).sort()).toEqual([`${KATALOG}/content-v6.db`, `${KATALOG}/postep.db`, `${KATALOG}/tresc-abc-pl.db`]);
    expect(a.pliki.get(`${KATALOG}/postep.db`)).toBe('POSTEP');
  });

  it('zmiana języka: kopia de, plik pl usunięty po otwarciu', async () => {
    const a = atrapa({ [`${KATALOG}/tresc-abc-pl.db`]: 'PL' });
    expect(await start(a, 'de')).toMatchObject({ ok: true, wartosc: { plik: 'tresc-abc-de.db' } });
    expect([...a.pliki.keys()].filter((k) => k.startsWith(KATALOG))).toEqual([`${KATALOG}/tresc-abc-de.db`]);
  });

  it('zasób bez lokalnego URI → tresc_niedostepna, bez resztek', async () => {
    const a = atrapa({}, { zasobNull: true });
    await expect(plikiTresciExpo(MAPA, a.sys).kopiuj(`${PACZKA}/tresc-abc-pl.db`, `${KATALOG}/n.db`)).rejects.toThrow(/Brak lokalnego URI/);
    expect(await start(a)).toEqual({ ok: false, powod: 'tresc_niedostepna' });
    expect([...a.pliki.keys()].filter((k) => k.startsWith(KATALOG))).toEqual([]);
  });

  it('kontrakt portu: kopia i przemianowanie bez nadpisywania, usuwanie idempotentne, lista brakującego katalogu pusta', async () => {
    const a = atrapa({ [`${KATALOG}/x.db`]: 'X', [`${KATALOG}/y.db`]: 'Y' });
    const p = plikiTresciExpo(MAPA, a.sys);
    await expect(p.kopiuj(`${PACZKA}/tresc-abc-pl.db`, `${KATALOG}/x.db`)).rejects.toThrow();
    await expect(p.przemianuj(`${KATALOG}/x.db`, `${KATALOG}/y.db`)).rejects.toThrow();
    await expect(p.usun(`${KATALOG}/brak.db`)).resolves.toBeUndefined();
    await expect(p.kopiuj(`${PACZKA}/obcy.db`, `${KATALOG}/z.db`)).rejects.toThrow(/Brak pliku w paczce/);
    expect(await p.lista('file:///nie-ma')).toEqual([]);
    expect((await p.lista(PACZKA)).sort()).toEqual(['tresc-abc-de.db', 'tresc-abc-pl.db']);
    expect([a.pliki.get(`${KATALOG}/x.db`), a.pliki.get(`${KATALOG}/y.db`)]).toEqual(['X', 'Y']);
  });

  it('metaZWierszy: tylko wiersze { key: string, value: string }', () => {
    expect(metaZWierszy([{ key: 'format', value: '1' }, { key: 'x', value: 1 }, null, 'tekst', { key: 'jezyk', value: 'pl' }])).toEqual({ format: '1', jezyk: 'pl' });
  });
});
