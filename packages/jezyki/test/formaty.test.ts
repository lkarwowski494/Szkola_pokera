import { describe, expect, it } from 'vitest';
import { formatujDate, formatujLiczbe, formatujProcent, znacznikIntl } from '../src/index';

const NBSP = ' ';
const NNBSP = ' ';

describe('formaty liczb wg języka (ICU Node)', () => {
  const l = (n: number, j: string) => formatujLiczbe(n, j as never, { miejsca: 1 });
  it('znak dziesiętny', () => {
    expect(l(2.5, 'pl')).toBe('2,5');
    expect(l(2.5, 'en')).toBe('2.5');
    expect(l(2.5, 'de')).toBe('2,5');
    expect(l(2.5, 'ja')).toBe('2.5');
  });
  it('grupowanie tysięcy', () => {
    expect(formatujLiczbe(12345.6, 'pl' as never)).toBe(`12${NBSP}345,6`);
    expect(formatujLiczbe(12345.6, 'en' as never)).toBe('12,345.6');
    expect(formatujLiczbe(12345.6, 'de' as never)).toBe('12.345,6');
    expect(formatujLiczbe(12345.6, 'fr' as never)).toBe(`12${NNBSP}345,6`);
  });
  it('procent: pl bez spacji, de i fr ze spacją, tr z przodu', () => {
    expect(formatujProcent(0.5, 'pl' as never)).toBe('50%');
    expect(formatujProcent(0.5, 'de' as never)).toBe(`50${NBSP}%`);
    expect(formatujProcent(0.5, 'fr' as never)).toBe(`50${NBSP}%`);
    expect(formatujProcent(0.5, 'tr' as never)).toBe('%50');
  });
  it('data (strefa UTC)', () => {
    const d = new Date(Date.UTC(2026, 10, 4));
    expect(formatujDate(d, 'pl' as never, { timeZone: 'UTC' })).toBe('4 listopada 2026');
    expect(formatujDate(d, 'en' as never, { timeZone: 'UTC' })).toBe('November 4, 2026');
    expect(formatujDate(d, 'ja' as never, { timeZone: 'UTC' })).toBe('2026年11月4日');
  });
  it('znacznik Intl: serbski i chiński tradycyjny zachowują kod', () => {
    expect(znacznikIntl('sr')).toBe('sr');
    expect(znacznikIntl('zh-Hant')).toBe('zh-Hant');
  });
});
