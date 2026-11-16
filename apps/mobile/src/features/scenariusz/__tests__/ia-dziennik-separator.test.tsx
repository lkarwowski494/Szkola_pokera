/// <reference types="jest" />
// HX 3.2 (D-1734…D-1736): ekran scenariusza z punktem iso-size pokazuje limperów na stole (stan „limp”), „W puli N bb” pod stołem,
// jeden wiersz dziennika „Blindy 0,5/1 bb. UTG: pas. HJ: limp 1 bb” i etykietę VoiceOver stołu. Szablony-fikcje: `kontekstCn.ts`.
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { generateVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { dbCn, ISO_CO, ISO_SB } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, widokDecyzji, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const sesja = (szablon: ScenarioTemplate, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom: 'latwy', wariant: generateVariant(naGenerator(szablon), 'latwy', 5, getKontekstGeneratora(dbCn, szablon)), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
});
const pokaz = async (szablon: ScenarioTemplate, wybory: Akcja[] = []) => {
  await render(<PrzebiegScenariusza sesja={sesja(szablon, wybory)} faza={wybory.length ? 'ocena' : 'decyzja'} koniec={wybory.length > 0} bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};
const stan = (poz: string) => screen.getByTestId(`miejsce-${poz}`).props.accessibilityValue.text;


// IA / HX-P3: wpisy dziennika łączy separator z `play.log.sep` (ja, zh-Hant: „。”, nie łacińska kropka); polski bez zmian.
import i18n from 'i18next';
afterEach(async () => { await i18n.changeLanguage('pl'); });

describe('dziennik preflop: separator wpisów zależy od języka (play.log.sep)', () => {
  it('pl: „Blindy 0,5/1 bb. UTG: pas. HJ: limp 1 bb” (bez zmian)', async () => {
    await pokaz(ISO_CO);
    expect(tekstEkranu()).toMatch(/Blindy 0,5\/1\sbb\. UTG: pas( \(fold\))?\. HJ: limp 1\sbb/);
  });
  it.each(['ja', 'zh-Hant'])('%s: wpisy rozdziela „。”, bez „. ” między nimi', async (j) => {
    await i18n.changeLanguage(j);
    await pokaz(ISO_CO);
    const tekst = tekstEkranu();
    expect(tekst).toMatch(/bb。UTG：[^。]+。HJ：/);
    expect(tekst).not.toMatch(/bb\. UTG|：[^.]*\. HJ/);
  });
});
