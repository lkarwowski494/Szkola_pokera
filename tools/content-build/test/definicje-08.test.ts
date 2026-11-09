// Nakładka definicji terminów `content/<język>/terms-def.yaml` (otwarte #3 sesji P, plan-09 §13; D-335): pole `def` w
// content/terms.yaml jest po polsku i nie miało jednostki przekładu, więc w en słowniczek nie miał definicji, a ćwiczenie
// „definicja → termin” (P-2) nie wracało. Przekład: plik klucz → definicja; strażnik pilnuje kluczy i czystego tekstu.
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { afterAll, describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';
import { czytajDefinicje, definicjeJezykow, PLIK_DEFINICJI, roznicaDefinicji, tekstZrodlaDefinicji, zrodloDefinicji } from '../src/definicje';
import { termsModuleSource } from '../src/terms';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const katalogi: string[] = [];
afterAll(() => { for (const k of katalogi) rmSync(k, { recursive: true, force: true }); });
const tmp = (p: string) => { const d = mkdtempSync(join(tmpdir(), p)); katalogi.push(d); return d; };

const TERMS = { a: { pl: 'pula', def: 'Żetony na środku stołu.' }, b: { pl: 'flop', def: 'Trzy pierwsze karty wspólne.' }, c: { pl: 'BB' } };

describe('źródło jednostki przekładu definicji', () => {
  it('klucz → definicja tylko dla terminów z def, w kolejności terms.yaml', () => {
    expect(zrodloDefinicji(TERMS)).toEqual({ a: 'Żetony na środku stołu.', b: 'Trzy pierwsze karty wspólne.' });
    expect(Object.keys(zrodloDefinicji(TERMS))).toEqual(['a', 'b']);
  });
  it('tekst źródła to YAML tej samej mapy, deterministyczny (skrót sha256 jednostki się nie zmienia bez zmiany def)', () => {
    const t = tekstZrodlaDefinicji(TERMS);
    expect(parseYaml(t)).toEqual(zrodloDefinicji(TERMS));
    expect(tekstZrodlaDefinicji(structuredClone(TERMS))).toBe(t);
  });
});

describe('strażnik roznicaDefinicji', () => {
  const zr = zrodloDefinicji(TERMS);
  it('zgodny przekład: te same klucze, niepuste napisy bez znaczników', () => {
    expect(roznicaDefinicji(zr, { a: 'Chips in the middle.', b: 'The first three community cards.' })).toEqual([]);
  });
  it('brak klucza, klucz spoza źródła, pusty tekst, nie-napis, znacznik, nie-mapa', () => {
    expect(roznicaDefinicji(zr, { a: 'Chips.' })).toEqual(['b: brak definicji w przekładzie']);
    expect(roznicaDefinicji(zr, { a: 'Chips.', b: 'Cards.', x: 'Extra.' })).toEqual(['x: klucz spoza źródła (termin bez def albo nieznany)']);
    expect(roznicaDefinicji(zr, { a: '  ', b: 'Cards.' })).toEqual(['a: pusty albo nie-tekst']);
    expect(roznicaDefinicji(zr, { a: 3, b: 'Cards.' })).toEqual(['a: pusty albo nie-tekst']);
    expect(roznicaDefinicji(zr, { a: 'Chips {{n:x}}.', b: 'Cards <b>.' })).toEqual(['a: znaczniki w definicji (def to czysty tekst)', 'b: znaczniki w definicji (def to czysty tekst)']);
    expect(roznicaDefinicji(zr, ['Chips.'])).toEqual(['(korzeń): nie mapa klucz → definicja']);
  });
});

describe('odczyt z content/<język>/terms-def.yaml', () => {
  it('pl = źródło; język bez pliku = null; plik zgodny = mapa; niezgodny = błąd budowy z nazwą pliku', () => {
    const dir = tmp('def-');
    expect(czytajDefinicje(dir, 'pl', TERMS)).toEqual(zrodloDefinicji(TERMS));
    expect(czytajDefinicje(dir, 'en', TERMS)).toBeNull();
    mkdirSync(join(dir, 'en'));
    writeFileSync(join(dir, 'en', PLIK_DEFINICJI), 'a: Chips.\nb: Cards.\n');
    expect(czytajDefinicje(dir, 'en', TERMS)).toEqual({ a: 'Chips.', b: 'Cards.' });
    writeFileSync(join(dir, 'en', PLIK_DEFINICJI), 'a: Chips.\n');
    expect(() => czytajDefinicje(dir, 'en', TERMS)).toThrow(/en\/terms-def\.yaml.*\n.*b: brak definicji/);
  });
  it('definicjeJezykow: tylko katalogi języków z listy (bez pl) z plikiem; inne katalogi (ranges) pominięte', () => {
    const dir = tmp('def-');
    for (const k of ['en', 'ja', 'ranges']) mkdirSync(join(dir, k));
    writeFileSync(join(dir, 'en', PLIK_DEFINICJI), 'a: Chips.\nb: Cards.\n');
    writeFileSync(join(dir, 'ranges', PLIK_DEFINICJI), 'a: x\n');
    expect(definicjeJezykow(dir, TERMS)).toEqual({ en: { a: 'Chips.', b: 'Cards.' } });
  });
});

describe('moduł terminów aplikacji', () => {
  it('TERM_DEFS: definicje według języka (dziś puste — brak przekładów)', () => {
    const src = termsModuleSource([{ key: 'a', pl: 'pula', en: 'pot', enAlt: [], def: 'Żetony.', area: 'table' }], { en: { a: 'Chips.' } });
    expect(src).toContain('export const TERM_DEFS: Readonly<Partial<Record<string, Readonly<Record<string, string>>>>> = {');
    expect(src).toContain('  "en": {"a":"Chips."},');
    expect(termsModuleSource([], {})).toContain('= {\n};');
  });
});

describe('budowa bazy en z nakładką definicji', { timeout: 120_000 }, () => {
  const root = tmp('tresc-def-');
  cpSync(contentDir, join(root, 'content'), { recursive: true });
  symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
  symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
  cpSync(join(root, 'content/pl'), join(root, 'content/en'), { recursive: true });
  const dir = join(root, 'content');
  const termsYaml = parseYaml(readFileSync(join(dir, 'terms.yaml'), 'utf8')) as Record<string, { def?: string }>;
  const zr = zrodloDefinicji(termsYaml);

  it('budowa en: plik zgodny przechodzi i trafia do TERM_DEFS; plik niezgodny przerywa budowę', () => {
    writeFileSync(join(dir, 'en', PLIK_DEFINICJI), Object.entries(zr).map(([k, v]) => `${k}: ${JSON.stringify(`EN ${v}`)}`).join('\n') + '\n');
    expect(() => compileContent(dir, 'en')).not.toThrow();
    expect(definicjeJezykow(dir, termsYaml).en?.pot).toBe(`EN ${zr.pot}`);
    writeFileSync(join(dir, 'en', PLIK_DEFINICJI), 'pot: "Chips {{n:x}}"\n');
    expect(() => compileContent(dir, 'en')).toThrow(/en\/terms-def\.yaml: przekład definicji niezgodny/);
  });
});
