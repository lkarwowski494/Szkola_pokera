// Rola 08 (D-172): przypadki startu treści, których nie łapie K-06 roli 07 (mutanty, które przeżyły `k06-start`):
// (a) resztka przerwanej kopii innej wersji (`tresc-<w>-<j>.db.kopia`) jest usuwana po udanym otwarciu, a obce pliki
//     `.kopia` zostają (usuwanie tylko według wzorca treści, D-211);
// (b) nieudane usunięcie starego pliku po udanym otwarciu nie odbiera treści (wynik `ok`), a kolejny start dokańcza sprzątanie.
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, przygotujTresc } from '../src';
import { plikiTresciNode, zbudujTresc } from '../../../tests/narzedzia/tresc-node';
import { katalogTymczasowy, sprzatnij } from '../../postep/test/wspolne';

const zamkniecia: (() => void)[] = [];
afterEach(() => { for (const z of zamkniecia.splice(0)) z(); sprzatnij(); });

const meta = (wersja: string, jezyk: string) => ({ format: String(K.TRESC_FORMAT), wersja, jezyk, min_wersja_aplikacji: '0.1.0' });

async function start(paczka: string, katalog: string, wstrzyk: Parameters<typeof plikiTresciNode>[0] = {}) {
  const t = plikiTresciNode(wstrzyk);
  zamkniecia.push(t.zamknij);
  return przygotujTresc({ paczka, katalog, jezyk: 'pl', pliki: t.pliki, otworz: t.otworz, zamknij: t.zamknijBaze, obslugiwanyFormat: K.TRESC_FORMAT });
}

describe('K-06 start treści: sprzątanie (rola 08)', () => {
  it('K06-08-a resztka kopii innej wersji usunięta po otwarciu; obcy plik .kopia zostaje', async () => {
    const paczka = katalogTymczasowy(), katalog = katalogTymczasowy();
    zbudujTresc(join(paczka, 'tresc-8-pl.db'), meta('8', 'pl'));
    writeFileSync(join(katalog, 'tresc-7-pl.db.kopia'), Buffer.alloc(4096, 1)); // przerwana kopia sprzed aktualizacji aplikacji
    writeFileSync(join(katalog, 'notatka.txt.kopia'), 'obcy');
    expect(await start(paczka, katalog)).toMatchObject({ ok: true, wartosc: { plik: 'tresc-8-pl.db' } });
    expect(readdirSync(katalog).sort()).toEqual(['notatka.txt.kopia', 'tresc-8-pl.db']);
  });

  it('K06-08-b błąd usunięcia starego pliku po otwarciu: treść dostępna, kolejny start usuwa stary plik', async () => {
    const paczka = katalogTymczasowy(), katalog = katalogTymczasowy();
    zbudujTresc(join(paczka, 'tresc-8-pl.db'), meta('8', 'pl'));
    zbudujTresc(join(katalog, 'tresc-7-pl.db'), meta('7', 'pl'), 10);
    const pierwszy = await start(paczka, katalog, { blad: (w) => (w.op === 'usun' && w.z.endsWith('tresc-7-pl.db') ? new Error('EBUSY') : null) });
    expect(pierwszy).toMatchObject({ ok: true, wartosc: { plik: 'tresc-8-pl.db', meta: { wersja: '8' } } });
    expect(existsSync(join(katalog, 'tresc-7-pl.db'))).toBe(true);
    zamkniecia.splice(0).forEach((z) => z());
    expect(await start(paczka, katalog)).toMatchObject({ ok: true, wartosc: { plik: 'tresc-8-pl.db' } });
    expect(readdirSync(katalog).filter((n) => n.startsWith('tresc-'))).toEqual(['tresc-8-pl.db']);
  });
});
