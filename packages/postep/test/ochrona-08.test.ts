// ADR 0013 pkt 4 („długa operacja w porcie sprawdza flagę przerwij przed każdą instrukcją”): po wygaśnięciu czasu import nie
// wykonuje dalszych instrukcji aż do końca, tylko przerywa na najbliższej granicy. Test roli 08: mutant sprawdzający flagę
// dopiero przed COMMIT przechodził K-10 (wynik ten sam, ale cały import wykonany po wygaśnięciu).
import { afterEach, describe, expect, it } from 'vitest';
import { eksportuj, importuj } from '../src';
import { atrapaOchrony } from '../../../tests/narzedzia/ochrona-atrapa';
import { DZIEN_WZORCA, T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

describe('ADR 0013 pkt 4 przerwanie na granicy instrukcji', () => {
  it('wygaśnięcie przy 2. INSERT importu → najwyżej ta jedna instrukcja wykonana po wygaśnięciu, wynik przerwano_w_tle', async () => {
    const { port: pz } = await przygotuj('wzorzec');
    const plik = await eksportuj(pz, { terazMs: T0, aplikacja: '1.0.0' });
    if (!plik.ok) throw new Error(plik.powod);
    const atrapa = atrapaOchrony([]);
    let wstawien = 0, poWygasnieciu = 0, wygaslo = false;
    const { port } = await przygotuj('wzorzec', {
      ochrona: atrapa.ochrona,
      zdarzenie: (z) => {
        if (wygaslo && z.rodzaj !== 'transakcja') poWygasnieciu++;
        if (z.rodzaj === 'run' && /\bINSERT\b/i.test(z.sql) && ++wstawien === 2) { atrapa.wygasnij(); wygaslo = true; }
      },
    });
    expect(await importuj(port, plik.wartosc, DZIEN_WZORCA)).toEqual({ ok: false, powod: 'przerwano_w_tle' });
    expect(poWygasnieciu, 'instrukcje wykonane po wygaśnięciu (bez tej, przy której wygasło)').toBe(0);
  });
});
