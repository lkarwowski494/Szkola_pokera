// BR-OCE-002 (08-programista-004, D-557): wyjaśnienie akcji ma znaczniki wariantu ({{w:reka}}, {{w:stol}}, {{w:pozycja}}, {{w:rywal}}),
// podstawiane przy wyświetleniu kartami i pozycją z wylosowanego wariantu, a nie z przykładu w treści. Formatowanie kart (język) podaje wołający.
import { describe, expect, it } from 'vitest';
import { fillVariantMarkers, findVariantMarkers, VARIANT_MARKERS } from '../src';

const WARTOSCI = { reka: 'A♥ K♥', stol: 'Q♥ 7♥ 2♣', pozycja: 'BB', rywal: 'BTN' };

describe('znaczniki wariantu w wyjaśnieniu', () => {
  it('podstawia karty i pozycje z wariantu', () => {
    const t = 'Masz {{w:reka}} na {{w:pozycja}}, stół {{w:stol}}, rywal z {{w:rywal}} stawia: sprawdzasz, bo masz draw.';
    expect(fillVariantMarkers(t, WARTOSCI)).toBe('Masz A♥ K♥ na BB, stół Q♥ 7♥ 2♣, rywal z BTN stawia: sprawdzasz, bo masz draw.');
  });
  it('ten sam znacznik wiele razy; tekst bez znaczników bez zmian', () => {
    expect(fillVariantMarkers('{{w:reka}} i znów {{w:reka}}', WARTOSCI)).toBe('A♥ K♥ i znów A♥ K♥');
    expect(fillVariantMarkers('Bez znaczników.', WARTOSCI)).toBe('Bez znaczników.');
  });
  it('nieznany znacznik to błąd, nie cichy napis', () => {
    expect(() => fillVariantMarkers('Masz {{w:reka2}}', WARTOSCI)).toThrow(/reka2/);
  });
  it('findVariantMarkers zwraca nazwy znaczników z tekstu (także nieznane) w kolejności występowania', () => {
    expect(findVariantMarkers('{{w:stol}} a {{w:xyz}} i {{w:reka}}')).toEqual(['stol', 'xyz', 'reka']);
    expect(VARIANT_MARKERS).toEqual(['reka', 'stol', 'pozycja', 'rywal']);
  });
});
