// K-05 (D-367, D-372): znacznik {{t:klucz}} bez formy w języku innym niż pl i en renderuje nazwę terminu w języku tekstu
// z `content/<język>/terms-nazwy.yaml` (klucz → nazwa; null = dzisiejsze zachowanie: skrót albo nazwa angielska).
// Bez tego ok. 1 000–1 350 znaczników na język dałoby łacińskie „call”, „pot” w środku tekstu ja/zh-Hant/pt-BR/fr.
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { renderTermsIn } from '@szkola/content-schema';
import { compileContent } from '../src/build';
import { czytajNazwy, nazwyJezykow, PLIK_NAZW, roznicaNazw } from '../src/nazwy';
import { termsModuleSource } from '../src/terms';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const katalogi: string[] = [];
afterAll(() => { for (const k of katalogi) rmSync(k, { recursive: true, force: true }); });
const tmp = (p: string) => { const d = mkdtempSync(join(tmpdir(), p)); katalogi.push(d); return d; };

const T = {
  call: { pl: 'sprawdzenie', en: 'call', area: 'actions' },
  pot: { pl: 'pula', en: 'pot', area: 'table' },
  sb: { pl: 'mały blind', en: 'small blind', abbr: 'SB', area: 'positions' },
  utg: { pl: 'UTG', en: 'under the gun', area: 'positions' },
};
const look = (k: string) => (T as Record<string, { pl: string; en: string; area: string; abbr?: string }>)[k];

describe('renderTermsIn z nazwami języka (K-05)', () => {
  it('ja: bez formy → nazwa z pliku; forma wygrywa; null → skrót albo nazwa angielska', () => {
    const nazwy = { call: 'コール', pot: 'ポット', sb: null };
    expect(renderTermsIn('ja', '{{t:call}}後の{{t:pot}}、{{t:pot|ポットを}}、{{t:sb}}、{{t:utg}}', look, 'x', new Set(), undefined, nazwy)).toBe('コール後のポット、ポットを、small blind、UTG');
  });
  it('en bez pliku: bez zmian (D-287)', () => {
    expect(renderTermsIn('en', 'a {{t:call}} into the {{t:pot}}', look, 'x')).toBe('a call into the pot');
  });
  it('nieznany klucz nadal przerywa', () => {
    expect(() => renderTermsIn('ja', '{{t:brak}}', look, 'x', new Set(), undefined, { call: 'コール' })).toThrow(/nieznany termin/);
  });
});

describe('strażnik roznicaNazw', () => {
  it('zgodny: klucze ⊆ terms.yaml, niepuste napisy bez znaczników albo null', () => {
    expect(roznicaNazw(T, { call: 'コール', sb: null })).toEqual([]);
  });
  it('klucz spoza terms.yaml, pusty, nie-napis, znacznik, nie-mapa', () => {
    expect(roznicaNazw(T, { xx: 'a' })).toEqual(['xx: klucz spoza terms.yaml']);
    expect(roznicaNazw(T, { call: ' ' })).toEqual(['call: pusta nazwa albo nie-tekst (null = brak nazwy)']);
    expect(roznicaNazw(T, { call: 3 })).toEqual(['call: pusta nazwa albo nie-tekst (null = brak nazwy)']);
    expect(roznicaNazw(T, { call: '{{t:call}}' })).toEqual(['call: znaczniki w nazwie (nazwa to czysty tekst)']);
    expect(roznicaNazw(T, ['x'])).toEqual(['(korzeń): nie mapa klucz → nazwa']);
    expect(roznicaNazw(T, { constructor: 'x' })).toEqual(['constructor: klucz spoza terms.yaml']);
  });
});

describe('odczyt content/<język>/terms-nazwy.yaml', () => {
  it('pl i język bez pliku → null; plik zgodny → mapa bez null; niezgodny → błąd budowy z nazwą pliku', () => {
    const dir = tmp('nazwy-');
    expect(czytajNazwy(dir, 'ja', T)).toBeNull();
    mkdirSync(join(dir, 'ja'));
    writeFileSync(join(dir, 'ja', PLIK_NAZW), 'call: "コール"  # komentarz\nsb: null\n');
    expect(czytajNazwy(dir, 'ja', T)).toEqual({ call: 'コール' });
    mkdirSync(join(dir, 'pl'));
    writeFileSync(join(dir, 'pl', PLIK_NAZW), 'call: x\n');
    expect(czytajNazwy(dir, 'pl', T)).toBeNull();
    writeFileSync(join(dir, 'ja', PLIK_NAZW), 'zzz: "x"\n');
    expect(() => czytajNazwy(dir, 'ja', T)).toThrow(/ja\/terms-nazwy\.yaml.*\n.*zzz: klucz spoza/);
  });
  it('nazwyJezykow: tylko języki z listy z plikiem (bez pl), bez pustych map', () => {
    const dir = tmp('nazwy-');
    for (const k of ['fr', 'ja', 'ranges']) mkdirSync(join(dir, k));
    writeFileSync(join(dir, 'fr', PLIK_NAZW), 'pot: pot\nsb: "petite blinde"\n');
    writeFileSync(join(dir, 'ja', PLIK_NAZW), 'sb: null\n');
    writeFileSync(join(dir, 'ranges', PLIK_NAZW), 'pot: x\n');
    expect(nazwyJezykow(dir, T)).toEqual({ fr: { pot: 'pot', sb: 'petite blinde' } });
  });
  it('moduł terminów aplikacji: TERM_NAMES według języka', () => {
    const src = termsModuleSource([], {}, { ja: { call: 'コール' } });
    expect(src).toContain('export const TERM_NAMES: Readonly<Partial<Record<string, Readonly<Record<string, string>>>>> = {');
    expect(src).toContain('"ja": {"call":"コール"},');
  });
});

describe('budowa bazy języka z plikiem nazw', () => {
  it('ja: znacznik bez formy w tekście bazy ja → nazwa z pliku; bez pliku → nazwa angielska', () => {
    const root = tmp('nazwy-baza-');
    const dir = join(root, 'content');
    cpSync(contentDir, dir, { recursive: true });
    symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
    symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
    rmSync(join(dir, 'ja'), { recursive: true, force: true });
    cpSync(join(dir, 'en'), join(dir, 'ja'), { recursive: true });
    const lekcja = join(dir, 'ja', 'lessons', 'm0-l1-uklady.md');
    writeFileSync(lekcja, `${readFileSync(lekcja, 'utf8')}\n\nK05 {{t:call}} K05\n`);
    const bez = JSON.stringify(compileContent(dir, 'ja').lessons);
    expect(bez).toContain('K05 call K05');
    writeFileSync(join(dir, 'ja', PLIK_NAZW), 'call: "コール"\n');
    const z = JSON.stringify(compileContent(dir, 'ja').lessons);
    expect(z).toContain('K05 コール K05');
  });
});
