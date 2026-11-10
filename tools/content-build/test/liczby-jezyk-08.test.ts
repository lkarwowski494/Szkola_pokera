// JAK-F07-02 (D-220, D-230, ADR 0014 pkt 7): `{{n:…}}` formatowane językiem budowanej bazy przez `@szkola/jezyki`.
// Wyrocznie: wektory ADR 0014 pkt 7 (pl „50%”, de „50 %”, fr „50 %”, tr „%50”) i dotychczasowy polski format (kopia
// `formatNumber` sprzed zmiany, zamrożona niżej) — baza `pl` ma mieć ten sam tekst co przed zmianą dla każdej liczby z `numbers.yaml`.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { NumbersFile, type NumberEntry } from '@szkola/content-schema';
import { formatujLiczbe, formatujProcent } from '@szkola/jezyki';
import { compileContent } from '../src/build';
import { formatNumber, resolveNumbers } from '../src/numbers';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

// Polski format sprzed D-230 (tools/content-build/src/numbers.ts:108 w e08933f), bez zmian: wyrocznia strażnika bazy `pl`.
function dawnyFormatPl(value: number, unit: NumberEntry['unit'], decimals: number): string {
  const fmt = (v: number) => {
    const [int, frac] = v.toFixed(decimals).split('.') as [string, string | undefined];
    const digits = int.replace('-', '');
    const grouped = digits.length >= 5 ? digits.replace(/\B(?=(\d{3})+$)/g, ' ') : digits;
    return (int.startsWith('-') ? '-' : '') + grouped + (frac !== undefined ? `,${frac}` : '');
  };
  switch (unit) {
    case 'percent': return `${fmt(value * 100)}%`;
    case 'bb': return `${fmt(value)}bb`;
    case 'bb100': return `${fmt(value)}bb/100`;
    case 'multiplier': return `${fmt(value)}x`;
    case 'ms': return `${fmt(value / 1000)} s`;
    case 'ratio':
    case 'count': return fmt(value);
  }
}

describe('JAK-F07-02: liczby w treści według języka bazy', () => {
  it('LJ-08-a procent: wektory ADR 0014 pkt 7 (pl, de, fr, tr) = `formatujProcent`', () => {
    expect(formatNumber(0.5, 'percent', 0, 'pl')).toBe('50%');
    expect(formatNumber(0.5, 'percent', 0, 'de')).toBe(formatujProcent(0.5, 'de'));
    expect(formatNumber(0.5, 'percent', 0, 'de')).toMatch(/^50\s%$/u);
    expect(formatNumber(0.5, 'percent', 0, 'fr')).toMatch(/^50\s%$/u);
    expect(formatNumber(0.5, 'percent', 0, 'tr')).toBe('%50');
    expect(formatNumber(0.3497, 'percent', 2, 'en')).toBe('34.97%');
  });

  it('LJ-08-b jednostki domenowe bez zmian poza liczbą; stała liczba cyfr po przecinku', () => {
    expect(formatNumber(2.5, 'bb', 1, 'en')).toBe('2.5bb');
    expect(formatNumber(2.5, 'bb', 1, 'de')).toBe('2,5bb');
    expect(formatNumber(3, 'bb', 1, 'en')).toBe('3.0bb');
    expect(formatNumber(4.2, 'bb100', 1, 'en')).toBe('4.2bb/100');
    expect(formatNumber(2.75, 'multiplier', 2, 'fr')).toBe(`${formatujLiczbe(2.75, 'fr', { miejsca: 2 })}x`);
    expect(formatNumber(3000, 'ms', 0, 'en')).toBe('3 s');
    expect(formatNumber(12345, 'count', 0, 'en')).toBe('12,345');
  });

  it('LJ-08-c `resolveNumbers` formatuje językiem wywołania; wartość ta sama we wszystkich językach (NFR-JEZ-002)', () => {
    const plik = { x: { formula: 'requiredEquity', args: [100, 50], unit: 'percent', decimals: 1, source: 'test' } } as Record<string, NumberEntry>;
    const pl = resolveNumbers(plik, undefined, 'pl').get('x');
    const en = resolveNumbers(plik, undefined, 'en').get('x');
    expect(pl?.value).toBe(en?.value);
    expect([pl?.display, en?.display]).toEqual(['25,0%', '25.0%']);
  });

  it('LJ-08-d strażnik: w bazie `pl` każda liczba z numbers.yaml ma ten sam zapis co przed zmianą', () => {
    const wpisy = NumbersFile.parse(parseYaml(readFileSync(join(contentDir, 'numbers.yaml'), 'utf8')));
    const liczby = compileContent(contentDir, 'pl').numbers;
    expect(liczby.length).toBe(Object.keys(wpisy).length);
    const rozne = liczby.filter((n) => {
      const e = wpisy[n.key]!;
      return n.display !== dawnyFormatPl(n.value, e.unit, e.decimals);
    }).map((n) => ({ key: n.key, display: n.display }));
    expect(rozne).toEqual([]);
  }, 120_000); // compileContent pl z kontrolą generatora szablonów (D-555) trwa ok. 10 s (sesja BS)
});
