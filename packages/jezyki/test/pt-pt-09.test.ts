// Wydanie pt (pt-PT) — sesja AO (D-405). Kod języka aplikacji „pt” = portugalski europejski (jak Trening `lib/i18n.ts:28`,
// TAG pt → 'pt-PT', odczyt 2026-11-10). CLDR „pt” bez regionu to wariant brazylijski (plurals.xml: pt i = 0..1, pt_PT i = 1),
// więc znacznik Intl i reguła liczby mnogiej dla „pt” muszą iść przez „pt-PT”: inaczej 0 → „one” („0 lição”).
import { describe, expect, it } from 'vitest';
import { formatujLiczbe, utworzI18n, wybierzJezyk, znacznikIntl } from '../src/index';

describe('pt = pt-PT', () => {
  it('znacznik Intl: pt → pt-PT; pt-BR i inne bez zmian', () => {
    expect(znacznikIntl('pt')).toBe('pt-PT');
    expect(znacznikIntl('pt-BR')).toBe('pt-BR');
    expect(znacznikIntl('pl')).toBe('pl');
  });
  it('liczby pt według pt-PT (grupowanie od 5 cyfr), pt-BR bez zmian', () => {
    expect(formatujLiczbe(1234.5, 'pt')).toBe(new Intl.NumberFormat('pt-PT').format(1234.5));
    expect(formatujLiczbe(1234.5, 'pt-BR')).toBe(new Intl.NumberFormat('pt-BR').format(1234.5));
  });
  it('liczba mnoga pt: 0 → other (pt-PT), pt-BR: 0 → one', async () => {
    const slowniki = {
      pl: { lekcje_one: '{{count}} lekcja', lekcje_few: '{{count}} lekcje', lekcje_many: '{{count}} lekcji', lekcje_other: '{{count}} lekcji' },
      pt: { lekcje_one: '{{count}} lição', lekcje_many: '{{count}} de lições', lekcje_other: '{{count}} lições' },
      'pt-BR': { lekcje_one: '{{count}} lição', lekcje_many: '{{count}} de lições', lekcje_other: '{{count}} lições' },
    };
    const pt = await utworzI18n(slowniki, 'pt');
    expect(pt.t('lekcje', { count: 0 })).toBe('0 lições');
    expect(pt.t('lekcje', { count: 1 })).toBe('1 lição');
    expect(pt.t('lekcje', { count: 2 })).toBe('2 lições');
    const br = await utworzI18n(slowniki, 'pt-BR');
    expect(br.t('lekcje', { count: 0 })).toBe('0 lição');
  });
  it('wybór: pt-PT, pt-AO → pt, gdy pt ma słownik; pt-BR i samo „pt” → pt-BR', () => {
    const dostepne = ['pl', 'en', 'pt-BR', 'pt'] as const;
    expect(wybierzJezyk(['pt-PT'], dostepne)).toBe('pt');
    expect(wybierzJezyk(['pt-AO'], dostepne)).toBe('pt');
    expect(wybierzJezyk(['pt-BR'], dostepne)).toBe('pt-BR');
    expect(wybierzJezyk(['pt'], dostepne)).toBe('pt-BR');
  });
});
