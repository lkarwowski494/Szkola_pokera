/// <reference types="jest" />
// 08 część 6 krok 7 (D-274): `PanelDecyzji` — zadanie z wyborem ze strategią solvera (design-spec „`PasekStrategii`”,
// „`SkalaStopni`”, „Znaczenie kolorów”; makieta e3 przed-decyzja, po-ocenie). Jest nie renderuje kolorów ani ruchu:
// tu struktura, stopień słowem, skala i wyjaśnienie wybranej opcji; wygląd — zrzuty (lista w plan-08, część 6).
import '@/i18n';
import i18n from 'i18next';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { ChoiceInstance } from '@/features/drills/types';
import { PanelDecyzji, ocenaDecyzji } from '@/features/stol/PanelDecyzji';

const t = i18n.t.bind(i18n);
const J9O: ChoiceInstance = {
  kind: 'choice',
  key: 'k',
  drillId: 'rfi.co',
  family: 'rfi',
  lessonId: null,
  rules: [],
  prompt: 'CO, wszyscy przed tobą spasowali',
  table: { hand: ['Jc', '9d'], position: 'CO', path: 'UTG:fold,HJ:fold' },
  options: [
    { text: 'Pas', correct: true, why: 'Solver pasuje w 80%.', czestosc: 0.8, pas: true },
    { text: 'Przebicie', correct: false, acceptable: true, why: 'Solver gra tak w 20% przypadków.', czestosc: 0.2 },
  ],
};

describe('PanelDecyzji', () => {
  it('przed decyzją: „Wybierz akcję” i pasek-przyciski option-<i> (flowy E2E); dotknięcie wybiera akcję; bez oceny i skali', async () => {
    const wybierz = jest.fn();
    await render(<PanelDecyzji item={J9O} rekord={null} onWybierz={wybierz} />);
    expect(screen.getByText(t('session.chooseAction'))).toBeTruthy();
    expect(screen.getAllByRole('button').map((b) => b.props.testID)).toEqual(['option-0', 'option-1']);
    expect(screen.queryAllByTestId(/^przedzial-/)).toHaveLength(0);
    expect(screen.queryByText(t('grade.dopuszczalne'))).toBeNull();
    fireEvent.press(screen.getByTestId('option-1'));
    expect(wybierz).toHaveBeenCalledWith(1);
  });

  it('po ocenie: stopień słowem na suknie, pasek po ocenie ze znacznikiem nad wyborem, skala z twoim przedziałem, wyjaśnienie wybranej opcji', async () => {
    await render(<PanelDecyzji item={J9O} rekord={{ answer: { kind: 'choice', index: 1 }, grade: 'acceptable' }} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByLabelText(t('grade.label', { slowo: t('grade.dopuszczalne') }))).toBeTruthy();
    expect(screen.getByTestId('znacznik-1')).toBeTruthy();
    expect(screen.getByTestId('przedzial-dopuszczalne').props.accessibilityState).toEqual({ selected: true });
    expect(screen.getByTestId('przedzial-zgodne').props.accessibilityState).toEqual({ selected: false });
    expect(screen.getByText('Solver gra tak w 20% przypadków.')).toBeTruthy();
    expect(screen.queryByText('Solver pasuje w 80%.')).toBeNull();
  });

  it('czas minął: „Czas minął” zamiast stopnia, pasek ze strategią bez znacznika, bez skali i bez wyjaśnienia opcji', async () => {
    await render(<PanelDecyzji item={J9O} rekord={{ answer: { kind: 'timeout' }, grade: 'wrong' }} />);
    expect(screen.getByText(t('session.timeout'))).toBeTruthy();
    expect(screen.queryAllByTestId(/^znacznik-/)).toHaveLength(0);
    expect(screen.getByText('80%')).toBeTruthy();
    expect(screen.queryAllByTestId(/^przedzial-/)).toHaveLength(0);
  });

  it('ocena decyzji z wyniku oceny: correct → zgodne, acceptable → dopuszczalne, size i close → niedokładność, wrong → błąd', () => {
    expect((['correct', 'acceptable', 'size', 'close', 'wrong'] as const).map(ocenaDecyzji)).toEqual(['zgodne', 'dopuszczalne', 'niedokladnosc', 'niedokladnosc', 'blad']);
  });
});
