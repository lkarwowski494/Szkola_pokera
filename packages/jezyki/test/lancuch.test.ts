import { describe, expect, it } from 'vitest';
import { utworzI18n, type Slowniki } from '../src/index';

const slowniki: Slowniki = {
  pl: { a: 'Tekst źródłowy', tylkoPl: 'Tylko po polsku', pusty: 'Niepusty', 'lekcja.ex_one': '{{count}} zadanie', 'lekcja.ex_few': '{{count}} zadania', 'lekcja.ex_many': '{{count}} zadań', 'lekcja.ex_other': '{{count}} zadania' },
  de: { a: 'Quelltext', pusty: '', 'lekcja.ex_one': '{{count}} Aufgabe', 'lekcja.ex_other': '{{count}} Aufgaben' },
  pt: { a: 'Texto' },
  'pt-BR': {},
};

describe('łańcuch zastępczy w i18next', () => {
  it('klucz w języku → tekst języka', async () => expect((await utworzI18n(slowniki, 'de')).t('a')).toBe('Quelltext'));
  it('brak klucza w de → tekst źródłowy, nie klucz', async () => expect((await utworzI18n(slowniki, 'de')).t('tylkoPl')).toBe('Tylko po polsku'));
  it('pusty tekst w tłumaczeniu: runtime go nie ukrywa (zatrzymuje go skrypt, błąd „pusty tekst”)', async () => expect((await utworzI18n(slowniki, 'de')).t('pusty')).toBe(''));
  it('wariant pt-BR bez klucza → język pt', async () => expect((await utworzI18n(slowniki, 'pt-BR')).t('a')).toBe('Texto'));
  it('wariant pt-BR bez klucza w pt → źródło', async () => expect((await utworzI18n(slowniki, 'pt-BR')).t('tylkoPl')).toBe('Tylko po polsku'));
  it('liczba mnoga pl z Intl.PluralRules: 1, 2, 5, 22', async () => {
    const i = await utworzI18n(slowniki, 'pl');
    expect([1, 2, 5, 22].map((count) => i.t('lekcja.ex', { count }))).toEqual(['1 zadanie', '2 zadania', '5 zadań', '22 zadania']);
  });
  it('liczba mnoga de: one/other', async () => {
    const i = await utworzI18n(slowniki, 'de');
    expect([1, 2].map((count) => i.t('lekcja.ex', { count }))).toEqual(['1 Aufgabe', '2 Aufgaben']);
  });
  it('klucz bez wpisu w źródle: tryb ścisły rzuca błąd', async () => {
    const i = await utworzI18n(slowniki, 'de', { scisle: true });
    expect(() => i.t('nie.ma')).toThrow(/nie\.ma/);
  });
  it('tryb ścisły: jawna wartość domyślna (opcjonalna podpowiedź) nie rzuca błędu', async () => {
    const i = await utworzI18n(slowniki, 'de', { scisle: true });
    expect(i.t('nie.ma', { defaultValue: '' })).toBe('');
    expect(i.t('nie.ma', { defaultValue: 'zapas' })).toBe('zapas');
  });
});
