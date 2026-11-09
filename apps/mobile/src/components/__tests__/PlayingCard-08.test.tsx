/// <reference types="jest" />
// A04-16 (audyt 04, NISKIE): karta miała promień 6 (md, lg) zamiast `promien.karta` 8 i cień '#000' poza tokenem.
// Mały rysunek (sm, w tekście) zostaje przy 4 — rozstrzygnięcie audytu.
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { PlayingCard } from '@/components/PlayingCard';
import { promien } from '@/theme/tokens';
import { kolory } from '@/theme/tokeny';

const styl = () => StyleSheet.flatten(screen.getByLabelText(/as pik/i).props.style);

describe('A04-16: karta z tokenów', () => {
  it.each(['md', 'lg'] as const)('rozmiar %s: promień promien.karta, cień z tk.shadow', async (size) => {
    await render(<PlayingCard code="As" size={size} />);
    expect(styl()).toMatchObject({ borderRadius: promien.karta, shadowColor: kolory.light.shadow });
  });
  it('rozmiar sm: promień 4 (mały rysunek w tekście), cień z tokenu', async () => {
    await render(<PlayingCard code="As" size="sm" />);
    expect(styl()).toMatchObject({ borderRadius: 4, shadowColor: kolory.light.shadow });
  });
});
