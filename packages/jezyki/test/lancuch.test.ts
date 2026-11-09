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
  it('zmiana języka w trakcie działania przelicza łańcuch: start pl → de, brak klucza w de daje tekst źródłowy', async () => {
    const i = await utworzI18n(slowniki, 'pl', { scisle: true });
    await i.changeLanguage('de');
    expect(i.t('tylkoPl')).toBe('Tylko po polsku');
  });
  it('zmiana języka: start pt-BR → de nie zostawia pt w łańcuchu', async () => {
    const i = await utworzI18n({ ...slowniki, de: { a: 'Quelltext' } }, 'pt-BR');
    await i.changeLanguage('de');
    expect(i.t('tylkoPl')).toBe('Tylko po polsku');
    expect(i.t('a')).toBe('Quelltext');
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

// Rola 09, K2b (D-289): po przekładzie en językiem zastępczym treści i interfejsu jest en (wariant → język → en → pl).
// Wybór języka z preferencji systemu (`wybierzJezyk`) zostaje przy `lancuchZastepczy`: drugi język z telefonu
// użytkownika ma pierwszeństwo przed en.
import { lancuchTresci, wybierzJezyk } from '../src/index';
describe('łańcuch treści z en (D-289)', () => {
  it('ja → en → pl; pt-BR → pt → en → pl; en → pl; pl → pl', () => {
    expect(lancuchTresci('ja')).toEqual(['ja', 'en', 'pl']);
    expect(lancuchTresci('pt-BR')).toEqual(['pt-BR', 'pt', 'en', 'pl']);
    expect(lancuchTresci('en')).toEqual(['en', 'pl']);
    expect(lancuchTresci('pl')).toEqual(['pl']);
  });
  it('i18next: brak klucza w de → en, brak w en → pl', async () => {
    const i = await utworzI18n({ ...slowniki, en: { tylkoPl: 'English' } }, 'de');
    expect(i.t('tylkoPl')).toBe('English');
    expect(i.t('lekcja.ex', { count: 2 })).toBe('2 Aufgaben');
    const j = await utworzI18n({ pl: { x: 'Polski' }, en: {}, de: {} }, 'de');
    expect(j.t('x')).toBe('Polski');
  });
  it('wybór z telefonu bez zmian: [ja, pl] przy wydanych pl, en → pl (drugi język użytkownika przed en)', () => {
    expect(wybierzJezyk(['ja-JP', 'pl-PL'], ['pl', 'en'])).toBe('pl');
    expect(wybierzJezyk(['ja-JP'], ['pl', 'en'])).toBe('en');
  });
});
