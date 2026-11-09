// Rola 09, K2b: baza treści w języku innym niż polski.
// (1) D-287: znacznik {{t:…}} w tekście en daje formę albo samą nazwę angielską, bez nawiasu; kontrola „termin bez
//     znacznika” dotyczy tylko tekstu polskiego (szuka polskich form).
// (2) D-289: język bez własnego katalogu bierze tekst z en, zanim zejdzie do pl.
// (3) Nakładka plików wspólnych (spots.yaml, helplines.yaml): przekład w content/<język>/ zmienia tylko pola tekstowe.
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';
import { POLA_HELPLINES, POLA_SPOTS, roznicePoza } from '../src/nakladka';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const katalogi: string[] = [];
afterAll(() => { for (const k of katalogi) rmSync(k, { recursive: true, force: true }); });

/** Kopia content/ z content/en = kopia content/pl (tekst polski w katalogu en, więc widać sam sposób renderowania). */
function zEn(): string {
  const root = mkdtempSync(join(tmpdir(), 'tresc-en-'));
  katalogi.push(root);
  cpSync(contentDir, join(root, 'content'), { recursive: true });
  symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
  symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
  cpSync(join(root, 'content/pl'), join(root, 'content/en'), { recursive: true });
  return join(root, 'content');
}

const tekstLekcji = (c: ReturnType<typeof compileContent>) => JSON.stringify(c.lessons);

describe('treść w języku innym niż polski (rola 09, K2b)', { timeout: 120_000 }, () => {
  const dir = zEn();
  const pl = compileContent(dir, 'pl');
  const en = compileContent(dir, 'en');

  it('D-287: w en bez nawiasu z nazwą angielską; po polsku nawias zostaje', () => {
    expect(en.tekst).toBe('en');
    expect(tekstLekcji(pl)).toContain('(flush)');
    expect(tekstLekcji(en)).not.toContain('(flush)');
    expect(tekstLekcji(en)).not.toContain('{{t:');
    expect(tekstLekcji(en)).toContain('kolor');
  });

  it('D-287: polska forma bez znacznika w tekście en nie przerywa budowy (kontrola tylko dla pl)', () => {
    const plik = join(dir, 'en/modules.yaml');
    const przed = readFileSync(plik, 'utf8');
    writeFileSync(plik, przed.replace('title: "Zasady i układy"', 'title: "Zasady i układy: kolor"'));
    try {
      expect(() => compileContent(dir, 'en')).not.toThrow();
    } finally {
      writeFileSync(plik, przed);
    }
  });

  // sv: język bez content/sv (ja ma katalog od sesji AE, D-377; sv nie ma przekładu ani planu D-374)
  it('D-289: język bez content/<j> bierze tekst en; pl zostaje pl', () => {
    expect(compileContent(dir, 'sv').tekst).toBe('en');
    expect(pl.tekst).toBe('pl');
  });

  it('nakładka spots.yaml: tytuł z content/en/ranges, zmiana ścieżki solvera przerywa', () => {
    const wsp = readFileSync(join(dir, 'ranges/spots.yaml'), 'utf8');
    const naklad = join(dir, 'en/ranges/spots.yaml');
    cpSync(join(dir, 'ranges'), join(dir, 'en/ranges'), { recursive: true, filter: (p) => !p.endsWith('.json') });
    writeFileSync(naklad, wsp.replace('{{t:utg}}, nikt jeszcze nie wszedł do gry', '{{t:utg}}, nobody has entered the pot yet'));
    const c = compileContent(dir, 'en');
    expect(c.ranges.map((r) => r.title)).toContain('UTG, nobody has entered the pot yet');
    expect(compileContent(dir, 'pl').ranges.map((r) => r.title).join('|')).not.toContain('nobody');
    writeFileSync(naklad, wsp.replace(/path: "([^"]*)"/, 'path: "$1x"'));
    expect(() => compileContent(dir, 'en')).toThrow(/ranges\/spots\.yaml: przekład zmienia coś poza tekstem/);
    rmSync(join(dir, 'en/ranges'), { recursive: true, force: true });
  });

  it('nakładka helplines.yaml: zdanie pomocy z content/en, zmiana adresu przerywa', () => {
    const wsp = readFileSync(join(dir, 'helplines.yaml'), 'utf8');
    const naklad = join(dir, 'en/helplines.yaml');
    writeFileSync(naklad, wsp.replace(/text: 'Jeśli rozpoznajesz[^']*'/, "text: 'If you recognise signs of a gambling problem, talk to a doctor.'"));
    expect(compileContent(dir, 'en').helplines.fallback.text).toBe('If you recognise signs of a gambling problem, talk to a doctor.');
    writeFileSync(naklad, wsp.replace('https://www.gamblingtherapy.org/', 'https://example.org/'));
    expect(() => compileContent(dir, 'en')).toThrow(/helplines\.yaml: przekład zmienia coś poza tekstem/);
    rmSync(naklad);
  });
});

describe('roznicePoza (strażnik nakładki)', () => {
  const spot = { id: 'a', title: 'Tytuł {{n:x}}', path: 'p', groups: { 'Przebij {{t:raise}}': ['raise 2.5'] }, wrongSizes: { 'Przebij {{t:raise}}': [{ text: 'mały', why: 'bo' }] } };
  it('zmiana tylko tekstu i kluczy grup: zgodne', () => {
    expect(roznicePoza(spot, { ...spot, title: 'Title {{n:x}}', groups: { 'Raise {{t:raise}}': ['raise 2.5'] }, wrongSizes: { 'Raise {{t:raise}}': [{ text: 'small', why: 'because' }] } }, POLA_SPOTS)).toEqual([]);
  });
  it('zgubiony {{n:…}}, zmieniona akcja solvera, zgubiony termin w kluczu grupy: różnice', () => {
    expect(roznicePoza(spot, { ...spot, title: 'Title' }, POLA_SPOTS)).toHaveLength(1);
    expect(roznicePoza(spot, { ...spot, groups: { 'Przebij {{t:raise}}': ['raise 3'] } }, POLA_SPOTS)).toHaveLength(1);
    expect(roznicePoza(spot, { ...spot, groups: { Raise: ['raise 2.5'] } }, POLA_SPOTS).length).toBeGreaterThan(0); // termin zgubiony + wrongSizes wskazuje nieistniejącą grupę
  });
  it('wrongSizes w przekładzie wskazuje tę samą grupę co w źródle (przegląd D-043, znalezisko 3)', () => {
    const z = { groups: { Przebij: ['raise 2.5'], Sprawdź: ['call'] }, wrongSizes: { Przebij: [{ text: 'mały', why: 'bo' }] } };
    expect(roznicePoza(z, { groups: { Raise: ['raise 2.5'], Call: ['call'] }, wrongSizes: { Raise: [{ text: 'small', why: 'b' }] } }, POLA_SPOTS)).toEqual([]);
    expect(roznicePoza(z, { groups: { Raise: ['raise 2.5'], Call: ['call'] }, wrongSizes: { Call: [{ text: 'small', why: 'b' }] } }, POLA_SPOTS)).toHaveLength(1);
  });
  it('helplines: cytat źródła i numer nie są tekstem do przekładu', () => {
    const h = { entries: [{ id: 'x', phone: '988', info: 'Pomoc', sources: [{ url: 'https://a.org/', quote: 'Call 988' }] }] };
    expect(roznicePoza(h, { entries: [{ id: 'x', phone: '988', info: 'Help', sources: [{ url: 'https://a.org/', quote: 'Call 988' }] }] }, POLA_HELPLINES)).toEqual([]);
    expect(roznicePoza(h, { entries: [{ id: 'x', phone: '988', info: 'Help', sources: [{ url: 'https://a.org/', quote: 'Zadzwoń 988' }] }] }, POLA_HELPLINES)).toHaveLength(1);
  });
});

describe('renderTermsIn (D-287)', () => {
  const t = { flush: { pl: 'kolor', en: 'flush', area: 'hands' }, utg: { pl: 'UTG', en: 'under the gun', area: 'positions' }, sb: { pl: 'mały blind', en: 'small blind', abbr: 'SB', area: 'positions' } };
  const look = (k: string) => (t as Record<string, { pl: string; en: string; area: string; abbr?: string }>)[k];
  it('pl: nawias przy pierwszym użyciu; en: forma albo nazwa angielska, skrót zostaje skrótem, bez nawiasu', async () => {
    const { renderTermsIn } = await import('@szkola/content-schema');
    expect(renderTermsIn('pl', '{{t:flush|kolor}} i {{t:flush|kolor}}', look, 'x')).toBe('kolor (flush) i kolor');
    expect(renderTermsIn('en', 'a {{t:flush}}, {{t:flush|flushes}}, {{t:utg}}, {{t:sb}}', look, 'x')).toBe('a flush, flushes, UTG, small blind');
    expect(() => renderTermsIn('en', '{{t:brak}}', look, 'x')).toThrow(/nieznany termin/);
  });
});
