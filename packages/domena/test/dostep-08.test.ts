// Test roli 08 (próby mutacji D-172): przypadki logiki dostępu spoza 9 wektorów docs/monetyzacja.md, które przeżyły mutanty.
// Wyrocznia: ADR 0006 pkt 2–3 (dostęp tylko z produktów odblokowujących; pamięć = ostatni udany odczyt) i reguła Treningu
// (lib/entitlement.ts:41–45: z kilku transakcji liczy się najpóźniejszy koniec).
import { describe, expect, it } from 'vitest';
import { decyzja, KONFIGURACJA as K } from '../src';

const [KWARTAL, ROK] = K.PRODUKTY_ODBLOKOWUJACE;
const T = Date.UTC(2026, 10, 4, 12);
const D = 86_400_000;

describe('dostęp: przypadki roli 08', () => {
  it('produkt spoza listy odblokowujących nie daje dostępu ani wpisu w pamięci (sklep i pamięć)', () => {
    const w = decyzja({ ok: true, transakcje: [{ produkt: 'pl.lkarwowski.inna.aplikacja', wygasaMs: null, odebrana: false }] }, null, T, K.PRODUKTY_ODBLOKOWUJACE, K.PRODUKTY_BEZ_KONCA);
    expect(w).toEqual({ dostep: false, zrodlo: 'sklep', nowaPamiec: { produkty: [], odczytanoMs: T } });
    const z = decyzja({ ok: false }, { produkty: [{ produkt: 'obcy', wygasaMs: null }], odczytanoMs: T - D }, T, K.PRODUKTY_ODBLOKOWUJACE, K.PRODUKTY_BEZ_KONCA);
    expect(z.dostep).toBe(false);
  });

  it('odnowienia tego samego produktu: pamięć ma jeden wpis z najpóźniejszym końcem, niezależnie od kolejności transakcji', () => {
    for (const kolejnosc of [[T + 30 * D, T + 2 * D], [T + 2 * D, T + 30 * D]]) {
      const w = decyzja({ ok: true, transakcje: kolejnosc.map((wygasaMs) => ({ produkt: ROK!, wygasaMs, odebrana: false })) }, null, T, K.PRODUKTY_ODBLOKOWUJACE, K.PRODUKTY_BEZ_KONCA);
      expect(w.nowaPamiec?.produkty).toEqual([{ produkt: ROK, wygasaMs: T + 30 * D }]);
    }
  });

  it('kwartał odebrany, rok trwa → dostęp, w pamięci tylko rok', () => {
    const w = decyzja({ ok: true, transakcje: [{ produkt: KWARTAL!, wygasaMs: T + 10 * D, odebrana: true }, { produkt: ROK!, wygasaMs: T + D, odebrana: false }] }, null, T, K.PRODUKTY_ODBLOKOWUJACE, K.PRODUKTY_BEZ_KONCA);
    expect(w).toEqual({ dostep: true, zrodlo: 'sklep', nowaPamiec: { produkty: [{ produkt: ROK, wygasaMs: T + D }], odczytanoMs: T } });
  });
});
