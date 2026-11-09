import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { nazwaLokalna, type GlossaryEntry } from '@/features/glossary/glossary';
import i18n, { jezykDlaUstawienia, ustawJezyk } from '../index';
import { WYDANE } from '../slowniki';

// Wydanie de, es (plan-de-es-ko-it-vi §5, wzór jezyk-4-09 / D-380; sesja AK, D-393): wybór z języka telefonu (warianty
// regionalne → język bazowy; es-419 nie jest wydany, więc es-MX/es-US → es), ustawienie ręczne, zmiana bez restartu,
// nazwa pod ikoną „PokerGym” (D-378) i nazwy terminów K-05 z content/<j>/terms-nazwy.yaml w słowniczku.
const app = JSON.parse(readFileSync(join(__dirname, '../../../app.json'), 'utf8')).expo;

describe('wydanie de, es', () => {
  it('de i es w wydaniu', () => {
    expect(WYDANE).toEqual(expect.arrayContaining(['de', 'es']));
  });
  it('telefon: de-DE, de-AT, de-CH → de; es-ES, es-MX, es-US, es-419, es → es', () => {
    for (const t of ['de-DE', 'de-AT', 'de-CH', 'de']) expect(jezykDlaUstawienia('auto', [t])).toBe('de');
    for (const t of ['es-ES', 'es-MX', 'es-US', 'es-419', 'es']) expect(jezykDlaUstawienia('auto', [t])).toBe('es');
  });
  it('ustawienie ręczne wygrywa z telefonem', () => {
    expect(jezykDlaUstawienia('de', ['es-ES'])).toBe('de');
    expect(jezykDlaUstawienia('es', ['de-DE'])).toBe('es');
  });
  it('zmiana języka w trakcie: nazwa języka, nazwa aplikacji na powitaniu, potem z powrotem pl', async () => {
    for (const [j, n] of Object.entries({ de: 'Deutsch', es: 'Español' })) {
      expect(await ustawJezyk(j as 'de' | 'es')).toBe(j);
      expect(i18n.t('language.name')).toBe(n);
      expect(i18n.t('welcome.title')).toBe('PokerGym');
    }
    expect(await ustawJezyk('pl')).toBe('pl');
  });
  it('app.json: nazwa pod ikoną z locales/systemowe dla de i es = PokerGym', () => {
    for (const j of ['de', 'es']) {
      const sys = JSON.parse(readFileSync(join(__dirname, '../../..', app.locales[j]), 'utf8'));
      expect(sys.ios.CFBundleDisplayName).toBe('PokerGym');
      expect(sys.android.app_name).toBe('PokerGym');
    }
  });
  it('słowniczek: nazwa lokalna z terms-nazwy (de straight „Straße”, es straight „escalera”)', () => {
    const straight = { key: 'straight', pl: 'strit', en: 'straight', enAlt: [], area: 'hands' } as unknown as GlossaryEntry;
    expect(nazwaLokalna(straight, 'de')).toBe('Straße');
    expect(nazwaLokalna(straight, 'es')).toBe('escalera');
  });
});
