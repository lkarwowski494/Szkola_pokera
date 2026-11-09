import i18n, { jezykDlaUstawienia, ustawJezyk } from '../index';
import { WYDANE } from '../slowniki';

// Wydanie ja, zh-Hant, pt-BR, fr (plan-ja-zh-Hant §6, plan-pt-BR-fr §5; wzór K3 en): wybór z języka telefonu, ustawienie
// ręczne, zmiana bez restartu; D-373: pt w innym regionie niż BR → pt-BR, dopóki pt nie jest wydany.
describe('wydanie ja, zh-Hant, pt-BR, fr', () => {
  it('cztery języki w wydaniu obok pl i en', () => {
    expect([...WYDANE].sort()).toEqual(['en', 'fr', 'ja', 'pl', 'pt-BR', 'zh-Hant']);
  });
  it('telefon: ja-JP → ja; zh-Hant-TW, zh-TW, zh-HK → zh-Hant; zh-Hans-CN → en (ZAPASOWY)', () => {
    expect(jezykDlaUstawienia('auto', ['ja-JP'])).toBe('ja');
    for (const t of ['zh-Hant-TW', 'zh-TW', 'zh-HK']) expect(jezykDlaUstawienia('auto', [t])).toBe('zh-Hant');
    expect(jezykDlaUstawienia('auto', ['zh-Hans-CN'])).toBe('en');
  });
  it('telefon: pt-BR i pt → pt-BR; pt-PT → pt-BR (D-373); fr-FR, fr-CA → fr', () => {
    expect(jezykDlaUstawienia('auto', ['pt-BR'])).toBe('pt-BR');
    expect(jezykDlaUstawienia('auto', ['pt'])).toBe('pt-BR');
    expect(jezykDlaUstawienia('auto', ['pt-PT'])).toBe('pt-BR');
    expect(jezykDlaUstawienia('auto', ['fr-FR'])).toBe('fr');
    expect(jezykDlaUstawienia('auto', ['fr-CA'])).toBe('fr');
  });
  it('ustawienie ręczne wygrywa z telefonem', () => {
    expect(jezykDlaUstawienia('ja', ['zh-TW'])).toBe('ja');
    expect(jezykDlaUstawienia('zh-Hant', ['ja-JP'])).toBe('zh-Hant');
  });
  it('zmiana języka w trakcie: nazwa języka w każdym z czterech, potem z powrotem pl', async () => {
    const nazwy = { ja: '日本語', 'zh-Hant': '繁體中文', 'pt-BR': 'Português (Brasil)', fr: 'Français' } as const;
    for (const [j, n] of Object.entries(nazwy)) {
      expect(await ustawJezyk(j as keyof typeof nazwy)).toBe(j);
      expect(i18n.t('language.name')).toBe(n);
    }
    expect(await ustawJezyk('pl')).toBe('pl');
  });
});
