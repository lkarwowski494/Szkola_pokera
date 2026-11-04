import { describe, expect, it } from 'vitest';
import { JEZYKI, jezykZTagu, wybierzJezyk, lancuchZastepczy } from '../src/index';

describe('lista języków', () => {
  it('35 unikalnych kodów, w tym pl i en', () => {
    expect(JEZYKI).toHaveLength(35);
    expect(new Set(JEZYKI).size).toBe(35);
    expect(JEZYKI).toContain('pl');
    expect(JEZYKI).toContain('en');
  });
});

describe('jezykZTagu (tag systemu → język aplikacji albo null)', () => {
  const przypadki: Array<[string, string | null]> = [
    ['pl-PL', 'pl'], ['en-US', 'en'], ['en-GB', 'en'], ['ja-JP', 'ja'], ['de-AT', 'de'],
    ['pt-BR', 'pt-BR'], ['pt', 'pt-BR'], ['pt-PT', 'pt'], ['pt-AO', 'pt'],
    ['es-ES', 'es'], ['es', 'es'], ['es-MX', 'es-419'], ['es_AR', 'es-419'], ['es-419', 'es-419'], ['es-US', 'es-419'],
    ['zh-Hant-TW', 'zh-Hant'], ['zh-TW', 'zh-Hant'], ['zh-HK', 'zh-Hant'], ['zh-Hans-CN', null], ['zh-CN', null], ['zh', null],
    ['in-ID', 'id'], ['zsm', 'ms'], ['sr-Latn-RS', 'sr'], ['nb-NO', 'nb'],
    ['ar-SA', null], ['he-IL', null], ['hi-IN', null], ['', null],
  ];
  for (const [tag, oczekiwany] of przypadki) it(`${JSON.stringify(tag)} → ${oczekiwany}`, () => expect(jezykZTagu(tag)).toBe(oczekiwany));
});

describe('wybierzJezyk (BRD: spoza listy → angielski)', () => {
  it('język z listy i dostępny', () => expect(wybierzJezyk(['ja-JP'], ['pl', 'en', 'ja'])).toBe('ja'));
  it('język spoza listy → angielski', () => expect(wybierzJezyk(['ar-SA'], ['pl', 'en'])).toBe('en'));
  it('pierwszy dostępny z listy preferencji systemu', () => expect(wybierzJezyk(['ar-SA', 'de-DE', 'ja-JP'], ['pl', 'en', 'ja'])).toBe('ja'));
  it('język z listy, ale bez słownika → angielski', () => expect(wybierzJezyk(['fr-FR'], ['pl', 'en'])).toBe('en'));
  it('pt-BR bez słownika wariantu → język bazowy pt', () => expect(wybierzJezyk(['pt-BR'], ['pl', 'en', 'pt'])).toBe('pt'));
  it('es-MX bez es-419 → es', () => expect(wybierzJezyk(['es-MX'], ['pl', 'en', 'es'])).toBe('es'));
  it('bez angielskiego w słownikach → źródło pl', () => expect(wybierzJezyk(['fr-FR'], ['pl'])).toBe('pl'));
  it('brak tagów → angielski, a bez niego pl', () => {
    expect(wybierzJezyk([], ['pl', 'en'])).toBe('en');
    expect(wybierzJezyk([], ['pl'])).toBe('pl');
  });
});

describe('łańcuch zastępczy wariant → język → źródło', () => {
  it('pt-BR → pt → pl', () => expect(lancuchZastepczy('pt-BR')).toEqual(['pt-BR', 'pt', 'pl']));
  it('es-419 → es → pl', () => expect(lancuchZastepczy('es-419')).toEqual(['es-419', 'es', 'pl']));
  it('de → pl', () => expect(lancuchZastepczy('de')).toEqual(['de', 'pl']));
  it('pl → pl', () => expect(lancuchZastepczy('pl')).toEqual(['pl']));
});
