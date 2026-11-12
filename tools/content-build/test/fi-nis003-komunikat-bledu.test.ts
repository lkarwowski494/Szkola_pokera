// FF NIS-003: błąd z catch ma typ unknown; komunikat przez komunikatBledu, nie rzutowanie `as Error` (wyjątek nie-Error dawał „undefined”).
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { komunikatBledu } from '../src/blad';

describe('FF NIS-003: komunikatBledu', () => {
  it('Error → jego komunikat', () => expect(komunikatBledu(new Error('zły'))).toBe('zły'));
  it('napis, liczba, null, undefined i obiekt bez message → String(), nigdy „undefined” z odczytu pola', () => {
    expect(komunikatBledu('tekst')).toBe('tekst');
    expect(komunikatBledu(42)).toBe('42');
    expect(komunikatBledu(null)).toBe('null');
    expect(komunikatBledu({ kod: 1 })).toBe('[object Object]');
  });
});
describe('FF NIS-003: trwała kontrola', () => {
  it('w src/ brak rzutowania błędu `(e as Error)` / `(err as Error)`', () => {
    const src = join(resolve(import.meta.dirname), '..', 'src');
    const trafienia = readdirSync(src).filter((f) => f.endsWith('.ts')).filter((f) => /\((?:e|err|error) as Error\)/.test(readFileSync(join(src, f), 'utf8')));
    expect(trafienia).toEqual([]);
  });
});
