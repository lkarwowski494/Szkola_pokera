import i18n, { jezykDlaUstawienia, ustawJezyk } from '../index';

// K3 (plan-09, D-291): en w wydaniu — wybór z języka telefonu, ustawienie ręczne i zmiana bez restartu (BRD F-16, D-132).
describe('wydanie en', () => {
  it('telefon po angielsku → en; po polsku → pl; język spoza wydania → en (ZAPASOWY)', () => {
    expect(jezykDlaUstawienia('auto', ['en-US'])).toBe('en');
    expect(jezykDlaUstawienia('auto', ['en-GB', 'pl-PL'])).toBe('en');
    expect(jezykDlaUstawienia('auto', ['pl-PL'])).toBe('pl');
    expect(jezykDlaUstawienia('auto', ['ru-RU'])).toBe('en');
  });
  it('ustawienie ręczne wygrywa z telefonem', () => {
    expect(jezykDlaUstawienia('en', ['pl-PL'])).toBe('en');
    expect(jezykDlaUstawienia('pl', ['en-US'])).toBe('pl');
  });
  it('zmiana języka w trakcie: teksty en, potem z powrotem pl', async () => {
    expect(await ustawJezyk('en')).toBe('en');
    expect(i18n.t('language.name')).toBe('English');
    expect(await ustawJezyk('pl')).toBe('pl');
    expect(i18n.t('language.name')).not.toBe('English');
  });
});
