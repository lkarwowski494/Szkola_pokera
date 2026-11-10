import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { nazwaLokalna, type GlossaryEntry } from '@/features/glossary/glossary';
import i18n, { jezykDlaUstawienia, ustawJezyk } from '../index';
import { WYDANE } from '../slowniki';

// Wydanie pt (portugalski europejski) — sesja AO, D-405, wzór jezyk-ko-it-vi-09 (D-394). Zastępuje tymczasowy łańcuch
// pt → pt-BR z D-373: telefon w Portugalii (i innych regionach pt ≠ BR) dostaje pt; Brazylia i samo „pt” — pt-BR
// (CLDR likelySubtags pt → pt_Latn_BR; jak Trening `lib/i18n.ts:51`, odczyt 2026-11-10).
const app = JSON.parse(readFileSync(join(__dirname, '../../../app.json'), 'utf8')).expo;

describe('wydanie pt (pt-PT)', () => {
  it('pt w wydaniu obok pt-BR', () => {
    expect(WYDANE).toEqual(expect.arrayContaining(['pt', 'pt-BR']));
  });
  it('telefon: pt-PT, pt-AO, pt-MZ → pt; pt-BR i samo pt → pt-BR', () => {
    for (const t of ['pt-PT', 'pt-AO', 'pt-MZ', 'pt_PT']) expect(jezykDlaUstawienia('auto', [t])).toBe('pt');
    for (const t of ['pt-BR', 'pt']) expect(jezykDlaUstawienia('auto', [t])).toBe('pt-BR');
  });
  it('ustawienie ręczne wygrywa z telefonem', () => {
    expect(jezykDlaUstawienia('pt', ['pt-BR'])).toBe('pt');
    expect(jezykDlaUstawienia('pt-BR', ['pt-PT'])).toBe('pt-BR');
  });
  it('zmiana języka w trakcie: nazwa języka, nazwa aplikacji, liczba mnoga 0 → other (pt-PT), potem pl', async () => {
    expect(await ustawJezyk('pt')).toBe('pt');
    expect(i18n.t('language.name')).toBe('Português (Portugal)');
    expect(i18n.t('welcome.title')).toBe('PokerGym');
    expect(i18n.services.pluralResolver.getSuffix('pt', 0)).toBe('_other');
    expect(await ustawJezyk('pt-BR')).toBe('pt-BR');
    expect(i18n.services.pluralResolver.getSuffix('pt-BR', 0)).toBe('_one');
    expect(await ustawJezyk('pl')).toBe('pl');
  });
  it('app.json: pt w supportedLocales i nazwa pod ikoną z locales/systemowe = PokerGym', () => {
    const wtyczka = app.plugins.find((p: unknown) => Array.isArray(p) && p[0] === 'expo-localization')[1];
    expect(wtyczka.supportedLocales.ios).toContain('pt');
    expect(wtyczka.supportedLocales.android).toContain('pt');
    const sys = JSON.parse(readFileSync(join(__dirname, '../../..', app.locales.pt), 'utf8'));
    expect(sys.ios.CFBundleDisplayName).toBe('PokerGym');
    expect(sys.android.app_name).toBe('PokerGym');
  });
  it('słowniczek: nazwa lokalna z content/pt/terms-nazwy (straight → „sequência”)', () => {
    const straight = { key: 'straight', pl: 'strit', en: 'straight', enAlt: [], area: 'hands' } as unknown as GlossaryEntry;
    expect(nazwaLokalna(straight, 'pt')).toBe('sequência');
  });
});
