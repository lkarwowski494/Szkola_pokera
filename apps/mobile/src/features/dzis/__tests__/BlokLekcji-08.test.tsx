/// <reference types="jest" />
// BlokLekcji (design-spec „Komponenty”: sukno na „Dziś”, rama + sukno, bez kart i miejsc; makieta e3 „dzis”).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import BlokLekcji from '@/features/dzis/BlokLekcji';
import { elementyBezRoliLubNazwy, tekstWidoczny } from '@/test-utils/ekrany/wspolne';

const BLOK = { lekcjaId: 'm2.l2', modulTytul: 'Matematyka podstawowa', nrLekcji: 2, tytul: 'Pot odds', opis: 'Kiedy opłaca się sprawdzić', rozpoczeta: true };

describe('BlokLekcji', () => {
  it('moduł i numer lekcji, tytuł, opis; jeden przycisk „Kontynuuj lekcję” z identyfikatorem lekcji', async () => {
    const onOtworz = jest.fn();
    await render(<BlokLekcji blok={BLOK} onOtworz={onOtworz} />);
    expect(tekstWidoczny()).toMatch(/Matematyka podstawowa, lekcja 2/);
    expect(screen.getByText('Pot odds')).toBeTruthy();
    expect(screen.getByText('Kiedy opłaca się sprawdzić')).toBeTruthy();
    const przyciski = screen.getAllByRole('button');
    expect(przyciski).toHaveLength(1);
    await fireEvent.press(screen.getByRole('button', { name: /^Kontynuuj lekcję/ }));
    expect(onOtworz).toHaveBeenCalledWith('m2.l2');
    expect(screen.getByTestId('dzis-lekcja')).toBeTruthy();
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });

  it('lekcja nierozpoczęta: „Zacznij lekcję”', async () => {
    await render(<BlokLekcji blok={{ ...BLOK, rozpoczeta: false }} onOtworz={jest.fn()} />);
    expect(screen.getByRole('button', { name: /^Zacznij lekcję/ })).toBeTruthy();
  });
});
