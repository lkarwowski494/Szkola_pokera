/// <reference types="jest" />
// 08 część 6 krok 5 (D-274): `PasekStrategii` (design-spec „`PasekStrategii`”, D-116; makieta e3 przed-decyzja, po-ocenie).
// Jest nie liczy układu ani ruchu: tu przyciski, cel ≥ 64 pt w stylu, opis dla czytnika, podpisy i znacznik. Ruch 240 ms
// i kreskowanie — zrzuty i telefon (lista w plan-08, część 6).
import '@/i18n';
import i18n from 'i18next';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { PasekStrategii } from '@/components/PasekStrategii';
import { opisPaska } from '@/features/stol/pasek';
import { promien, styl } from '@/theme/tokens';
import { kolory } from '@/theme/tokeny';

const t = i18n.t.bind(i18n);
const J9O = [
  { text: 'Pas', czestosc: 0.8, pas: true },
  { text: 'Przebicie', czestosc: 0.2 },
];

describe('PasekStrategii', () => {
  it('przed decyzją: jeden przycisk na akcję (testID option-<i> dla E2E), cel ≥ 64 pt, bez procentów; dotknięcie wybiera akcję', async () => {
    const wybierz = jest.fn();
    await render(<PasekStrategii opcje={J9O} wybor={null} klasa="J9o" onWybierz={wybierz} />);
    const przyciski = screen.getAllByRole('button');
    expect(przyciski.map((b) => b.props.testID)).toEqual(['option-0', 'option-1']);
    for (const b of przyciski) expect(StyleSheet.flatten(b.props.style).minHeight).toBeGreaterThanOrEqual(64);
    expect(screen.queryByText(/%/)).toBeNull();
    fireEvent.press(screen.getByTestId('option-1'));
    expect(wybierz).toHaveBeenCalledWith(1);
  });

  it('po ocenie: bez przycisków; opis dla czytnika ze strategią i wyborem; podpisy z procentami, „twój wybór” i znacznik nad wyborem', async () => {
    await render(<PasekStrategii opcje={J9O} wybor={1} klasa="J9o" />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(opisPaska(J9O, 1, 'J9o', t));
    expect(screen.getByText('80%')).toBeTruthy();
    expect(screen.getByText('20%')).toBeTruthy();
    expect(screen.getByText(t('strategy.yourChoiceShort'))).toBeTruthy();
    expect(screen.getByTestId('znacznik-1')).toBeTruthy();
    expect(screen.queryByTestId('znacznik-0')).toBeNull();
  });

  it('A04-13: oś po ocenie jak makieta e3.css:111, 114 — 44 pt, obrys onFelt 1,5, zaokrąglona; znacznik trójkątem; podpisy przypis w szerokości segmentu', async () => {
    await render(<PasekStrategii opcje={J9O} wybor={1} klasa="J9o" />);
    const os = StyleSheet.flatten(screen.getByTestId('os-paska').props.style);
    expect(os).toMatchObject({ height: 44, borderWidth: 1.5, borderColor: kolory.light.onFelt, borderRadius: promien.przycisk, overflow: 'hidden' });
    const znacznik = StyleSheet.flatten(screen.getByTestId('znacznik-1').props.style);
    expect(znacznik).toMatchObject({ width: 0, height: 0, borderTopWidth: 15, borderLeftWidth: 10, borderRightWidth: 10, borderTopColor: kolory.light.gold, borderLeftColor: 'transparent', borderRightColor: 'transparent' });
    expect(StyleSheet.flatten(screen.getByText('80%').props.style).fontSize).toBe(styl.przypis.fontSize);
    // podpis stoi w kolumnie swojego segmentu (ta sama szerokość co segment osi), z minimalną szerokością przy małym udziale
    const podpis = StyleSheet.flatten(screen.getByTestId('podpis-1').props.style);
    expect(podpis.flexBasis).toBe(0);
    expect(podpis.minWidth).toBeGreaterThan(0);
  });
});
