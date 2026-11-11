// KO-073 (decyzja właściciela 2026-11-11, D-1115): zdanie w wyjaśnieniu pokazywane warunkowo, blok {{jesli:nazwa}}…{{/jesli}}.
import { describe, expect, it } from 'vitest';
import { fillVariantMarkers, findVariantConditions, overcardOuts, overcardOutsAt, parseCards } from '../src';

const wartosci = { reka: 'R', stol: 'S', pozycja: 'P', rywal: 'W' };
const tekst = 'Zdanie pierwsze.{{jesli:nadkarty}} Zdanie o nadkartach.{{/jesli}} Zdanie ostatnie.';

describe('blok warunkowy w wyjaśnieniu (KO-073)', () => {
  it('warunek spełniony: treść bloku zostaje, znaczniki bloku znikają', () => {
    expect(fillVariantMarkers(tekst, wartosci, { nadkarty: true })).toBe('Zdanie pierwsze. Zdanie o nadkartach. Zdanie ostatnie.');
  });
  it('warunek niespełniony: blok znika razem z odstępem w środku, reszta tekstu nietknięta', () => {
    expect(fillVariantMarkers(tekst, wartosci, { nadkarty: false })).toBe('Zdanie pierwsze. Zdanie ostatnie.');
  });
  it('blok z markerem {{w:…}} w środku: marker podstawiany tylko, gdy blok widoczny', () => {
    expect(fillVariantMarkers('A.{{jesli:nadkarty}} Masz {{w:reka}}.{{/jesli}}', wartosci, { nadkarty: true })).toBe('A. Masz R.');
    expect(fillVariantMarkers('A.{{jesli:nadkarty}} Masz {{w:reka}}.{{/jesli}}', wartosci, { nadkarty: false })).toBe('A.');
  });
  it('błędy: nieznany warunek, niedomknięty i zagnieżdżony blok, brak wartości warunku', () => {
    expect(() => fillVariantMarkers('{{jesli:xyz}}a{{/jesli}}', wartosci, { nadkarty: true })).toThrow(/nieznany warunek/);
    expect(() => fillVariantMarkers('{{jesli:nadkarty}}a', wartosci, { nadkarty: true })).toThrow(/niedomknięty/);
    expect(() => fillVariantMarkers('a{{/jesli}}', wartosci, { nadkarty: true })).toThrow(/niedomknięty|zamykający/);
    expect(() => fillVariantMarkers('{{jesli:nadkarty}}{{jesli:nadkarty}}a{{/jesli}}{{/jesli}}', wartosci, { nadkarty: true })).toThrow(/zagnieżdż/);
    expect(() => fillVariantMarkers(tekst, wartosci)).toThrow(/wartości warunku/);
  });
  it('findVariantConditions: nazwy w kolejności, także nieznane i uszkodzone', () => {
    expect(findVariantConditions(tekst)).toEqual(['nadkarty']);
    expect(findVariantConditions('{{jesli:a}}x{{/jesli}}{{jesli:b}}')).toEqual(['a', 'b', '{{jesli:(niedomknięty)']);
    expect(findVariantConditions('bez bloków')).toEqual([]);
  });
});

describe('overcardOutsAt: jedna definicja nadkart punktu (KO-073)', () => {
  const k = parseCards;
  it('outy drawa liczone z samej ręki i stołu: nadkarty bez nakładania z outami drawa', () => {
    expect(overcardOutsAt(k('As Ks'), k('7s 5s 2h'))).toBe(6);
    expect(overcardOutsAt(k('Ah Kd'), k('9d 5d 2d'))).toBe(5); // Ad jest outem koloru, więc nie liczy się drugi raz
  });
  it('brak nadkart: najwyższa karta stołu wyższa od obu kart gracza; para w ręce', () => {
    expect(overcardOutsAt(k('6s 4s'), k('Ks 5s 2h'))).toBe(0);
    expect(overcardOutsAt(k('As Ad'), k('7c 5d 2h'))).toBe(0);
  });
});
