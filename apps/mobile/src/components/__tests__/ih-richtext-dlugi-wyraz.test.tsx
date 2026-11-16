/// <reference types="jest" />
// IH (recenzja IF P2-3): akapit z kartami (RichText) składa się z osobnych `Text` na wyraz w wierszu z zawijaniem; wyraz szerszy niż wiersz (320 pt, AX5:
// „sprawdzających”) wychodził poza prawą krawędź (docs/design/dowody/if-de-ocena-blad-320-ax5.png). Wyraz musi mieć prawo się zmniejszyć i nie przekraczać wiersza.
import '@/i18n';
import { StyleSheet } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { RichText } from '../RichText';

describe('RichText: długi wyraz w akapicie z kartami', () => {
  it('każdy wyraz ma flexShrink 1 i maxWidth 100% (łamie się w obrębie wiersza), a wiersz nie przekracza rodzica', async () => {
    await render(<RichText text="Masz [[Qs Qh]] na Button, więcej sprawdzających rąk jest gorszych" />);
    const wyraz = screen.getByText(/sprawdzających/);
    const st = StyleSheet.flatten(wyraz.props.style);
    expect(st.flexShrink).toBe(1);
    expect(st.maxWidth).toBe('100%');
    const wiersz = StyleSheet.flatten(wyraz.parent!.props.style);
    expect(wiersz.maxWidth).toBe('100%');
  });
});
