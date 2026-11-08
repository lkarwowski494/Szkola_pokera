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
});
