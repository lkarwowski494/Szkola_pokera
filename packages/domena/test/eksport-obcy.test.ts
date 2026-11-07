// BR-DANE-002 „Plik uszkodzony albo obcy”: obcy plik jest błędny także wtedy, gdy ma wyższą `wersja_formatu` — komunikat
// „zaktualizuj aplikację” byłby nieprawdziwy. Luka testów akceptacyjnych wykryta próbą mutacji (rola 08, D-172), zgłoszona roli 07.
import { describe, expect, it } from 'vitest';
import { FORMAT_EKSPORTU, KONFIGURACJA as K, walidujEksport } from '../src';

describe('BR-DANE-002: obcy plik z wyższą wersją', () => {
  it('inny `format` i wersja_formatu = obsługiwana + 1 → bledny_plik, nie nowsza_wersja', () => {
    const tekst = JSON.stringify({ format: `${FORMAT_EKSPORTU}-inny`, wersja_formatu: K.EKSPORT_WERSJA_FORMATU + 1, dane: {} });
    expect(walidujEksport(tekst, K.EKSPORT_WERSJA_FORMATU)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
});
