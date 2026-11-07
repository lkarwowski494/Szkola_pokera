// Test roli 08 (próby mutacji D-172): plan treści — przypadki, które przeżyły mutanty przy testach 07.
// Wyrocznia: ADR 0005 pkt 2 (jeden plik na język i wersję; usuwane tylko inne pliki `tresc-<wersja>-<język>.db`).
import { describe, expect, it } from 'vitest';
import { planTresci } from '../src';

describe('plan treści: przypadki roli 08', () => {
  it('dwa pliki tego samego języka w paczce → tresc_niedostepna (bez zgadywania wersji)', () => {
    expect(planTresci({ wPaczce: ['tresc-7-pl.db', 'tresc-8-pl.db'], naUrzadzeniu: [], jezyk: 'pl' })).toEqual({ ok: false, powod: 'tresc_niedostepna' });
  });

  it('nazwy podobne do pliku treści, ale spoza wzorca, zostają na urządzeniu', () => {
    const podobne = ['tresc-6-pl.db-journal', 'tresc.db', 'trescowy.db', 'tresc-6.db', 'tresc-6-pl.db.tmp'];
    const r = planTresci({ wPaczce: ['tresc-7-pl.db'], naUrzadzeniu: ['tresc-6-pl.db', ...podobne], jezyk: 'pl' });
    expect(r).toEqual({ ok: true, wartosc: { plik: 'tresc-7-pl.db', kopiuj: true, usunPoOtwarciu: ['tresc-6-pl.db'] } });
  });
});
