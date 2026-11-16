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

describe('widokDecyzji: pula iso-size', () => {
  it('CO / 1 limper → 2,5 bb, bez „do sprawdzenia”; SB / 2 → 3,5 bb', () => {
    const co = sesja(ISO_CO, []);
    expect(widokDecyzji(co.wariant, 0, co.szablon)).toMatchObject({ pulaBb: 2.5, doSprawdzeniaBb: null });
    const sb = sesja(ISO_SB, []);
    expect(widokDecyzji(sb.wariant, 0, sb.szablon)).toMatchObject({ pulaBb: 3.5, doSprawdzeniaBb: null });
  });
});

describe('ekran iso-size: 1 limper (hero CO)', () => {
  it('stół: UTG pas, HJ limp, po tobie BTN, SB, BB; limp ma obwódkę ciągłą 2,5 pt i słowo „limp”', async () => {
    await pokaz(ISO_CO);
    expect(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'].map(stan)).toEqual(['pas', 'limp', 'ty', 'czeka', 'czeka', 'czeka']);
    const hj = StyleSheet.flatten(screen.getByTestId('miejsce-HJ').props.style);
    expect(hj.borderWidth).toBe(2.5);
    expect(hj.borderStyle).toBe('solid');
    expect(screen.getByTestId('miejsce-HJ')).toHaveTextContent(/limp/);
    expect(StyleSheet.flatten(screen.getByTestId('miejsce-UTG').props.style).borderStyle).toBe('dashed'); // pas jak dotąd
  });
  it('pula „W puli 2,5 bb” bez „do sprawdzenia”; czytnik: „UTG pas (fold), HJ limp, ty na CO, karty …”', async () => {
    await pokaz(ISO_CO);
    const t = tekstEkranu();
    expect(t).toMatch(/W puli( \(pot\))? 2,5 bb/);
    expect(t).not.toMatch(/do sprawdzenia/);
    const e: string = screen.getByRole('image').props.accessibilityLabel;
    expect(e).toMatch(/^Przy stole: UTG pas \(fold\), HJ limp, ty na CO, karty .+, po tobie BTN, SB i BB\.$/);
  });
  it('dziennik: jeden wiersz „Preflop” „Blindy 0,5/1 bb. UTG: pas. HJ: limp 1 bb”; po wyborze dopisuje przebicie gracza', async () => {
    await pokaz(ISO_CO);
    expect(tekstEkranu()).toMatch(/Blindy 0,5\/1\sbb\. UTG: pas( \(fold\))?\. HJ: limp 1\sbb/);
    expect(screen.getAllByText(/Blindy 0,5\/1/)).toHaveLength(1);
  });
  it('ocena po wyborze: dziennik „… HJ: limp 1 bb, CO: przebicie do … bb”', async () => {
    await pokaz(ISO_CO, ['raise']);
    expect(tekstEkranu()).toMatch(/UTG: pas( \(fold\))?\. HJ: limp 1\sbb, CO: przebicie( \(raise\))? do [\d,]+\sbb/);
  });
});

describe('ekran iso-size: 2 limperów (hero SB)', () => {
  it('stół: UTG, HJ pas; CO, BTN limp; BB po tobie; pula 3,5 bb; wpis dziennika z dwoma limpami', async () => {
    await pokaz(ISO_SB);
    expect(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'].map(stan)).toEqual(['pas', 'pas', 'limp', 'limp', 'ty', 'czeka']);
    const t = tekstEkranu();
    expect(t).toMatch(/W puli( \(pot\))? 3,5 bb/);
    expect(t).toMatch(/UTG: pas( \(fold\))?\. HJ: pas( \(fold\))?\. CO: limp 1\sbb\. BTN: limp 1\sbb/);
  });
});

describe('pasek akcji iso-size', () => {
  it('trzy przebicia z kwotami generatora (3,2 / 4 / 6,4 bb dla 1 limpera z CO), bez limpa i bez „do sprawdzenia”', async () => {
    await pokaz(ISO_CO);
    const t = tekstEkranu();
    for (const kwota of ['3,2', '4', '6,4']) expect(t).toMatch(new RegExp(`do ${kwota}\\sbb`));
    expect(t).not.toMatch(/Limp\b/);
  });
});
