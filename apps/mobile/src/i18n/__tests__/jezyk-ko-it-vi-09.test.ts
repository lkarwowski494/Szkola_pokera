import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { nazwaLokalna, type GlossaryEntry } from '@/features/glossary/glossary';
import i18n, { jezykDlaUstawienia, ustawJezyk } from '../index';
import { WYDANE } from '../slowniki';

// Wydanie ko, it, vi (plan-de-es-ko-it-vi §5, wzór jezyk-de-es-09 / D-393; sesja AL, D-394): wybór z języka telefonu
// (warianty regionalne → język bazowy), ustawienie ręczne, zmiana bez restartu, nazwa pod ikoną „PokerGym” (D-378)
// i nazwy terminów K-05 z content/<j>/terms-nazwy.yaml w słowniczku.
const app = JSON.parse(readFileSync(join(__dirname, '../../../app.json'), 'utf8')).expo;

describe('wydanie ko, it, vi', () => {
  it('ko, it i vi w wydaniu', () => {
    expect(WYDANE).toEqual(expect.arrayContaining(['ko', 'it', 'vi']));
  });
  it('telefon: ko-KR → ko; it-IT, it-CH → it; vi-VN → vi', () => {
    for (const t of ['ko-KR', 'ko']) expect(jezykDlaUstawienia('auto', [t])).toBe('ko');
    for (const t of ['it-IT', 'it-CH', 'it']) expect(jezykDlaUstawienia('auto', [t])).toBe('it');
    for (const t of ['vi-VN', 'vi']) expect(jezykDlaUstawienia('auto', [t])).toBe('vi');
  });
  it('ustawienie ręczne wygrywa z telefonem', () => {
    expect(jezykDlaUstawienia('ko', ['it-IT'])).toBe('ko');
    expect(jezykDlaUstawienia('it', ['vi-VN'])).toBe('it');
    expect(jezykDlaUstawienia('vi', ['ko-KR'])).toBe('vi');
  });
  it('zmiana języka w trakcie: nazwa języka, nazwa aplikacji na powitaniu, potem z powrotem pl', async () => {
    for (const [j, n] of Object.entries({ ko: '한국어', it: 'Italiano', vi: 'Tiếng Việt' })) {
      expect(await ustawJezyk(j as 'ko' | 'it' | 'vi')).toBe(j);
      expect(i18n.t('language.name')).toBe(n);
      expect(i18n.t('welcome.title')).toBe('PokerGym');
    }
    expect(await ustawJezyk('pl')).toBe('pl');
  });
  it('app.json: ko, it, vi w supportedLocales i nazwa pod ikoną z locales/systemowe = PokerGym', () => {
    const wtyczka = app.plugins.find((p: unknown) => Array.isArray(p) && p[0] === 'expo-localization')[1];
    for (const j of ['ko', 'it', 'vi']) {
      expect(wtyczka.supportedLocales.ios).toContain(j);
      expect(wtyczka.supportedLocales.android).toContain(j);
      const sys = JSON.parse(readFileSync(join(__dirname, '../../..', app.locales[j]), 'utf8'));
      expect(sys.ios.CFBundleDisplayName).toBe('PokerGym');
      expect(sys.android.app_name).toBe('PokerGym');
    }
  });
  it('słowniczek: nazwa lokalna z terms-nazwy (straight: ko „스트레이트”, it „scala”, vi „sảnh”)', () => {
    const straight = { key: 'straight', pl: 'strit', en: 'straight', enAlt: [], area: 'hands' } as unknown as GlossaryEntry;
    expect(nazwaLokalna(straight, 'ko')).toBe('스트레이트');
    expect(nazwaLokalna(straight, 'it')).toBe('scala');
    expect(nazwaLokalna(straight, 'vi')).toBe('sảnh');
  });
});
