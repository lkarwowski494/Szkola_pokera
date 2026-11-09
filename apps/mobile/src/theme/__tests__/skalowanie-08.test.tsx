/// <reference types="jest" />
// A04-05 (D-283 pkt 3): tekst w rysunkach o stałym rozmiarze (nazwa i stan miejsca, indeks i kolor karty) bez skalowania
// — informację niesie opis pod stołem (design-spec „Typografia”); znaki-ikony (⚙︎, ✓ w kropce) z limitem 1,4 jak w Treningu
// (`lib/theme.ts:37`, GLYPH_SCALE_MAX; main, odczyt 2026-11-09). Jest nie mierzy układu: tu właściwości `Text`, wygląd na zrzucie.
import '@/i18n';
import { render, screen, within } from '@testing-library/react-native';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Stol } from '@/components/Stol';
import { PlayingCard } from '@/components/PlayingCard';
import { ZNAK_SKALA_MAX } from '@/theme/skalowanie';

describe('A04-05: tekst w rysunkach', () => {
  it('miejsca przy stole: nazwa i stan bez skalowania (allowFontScaling=false)', async () => {
    await render(<Stol table={{ hand: ['Jc', '9d'], position: 'CO', path: 'UTG:fold,HJ:fold' }} />);
    const m = within(screen.getByTestId('miejsce-CO'));
    for (const x of [m.getByText('CO'), m.getByText('ty')]) expect(x.props.allowFontScaling).toBe(false);
  });

  it.each(['sm', 'md', 'lg'] as const)('karta %s: indeks i kolor bez skalowania', async (size) => {
    await render(<PlayingCard code="Th" size={size} />);
    for (const x of [screen.getByText('10'), screen.getByText('♥')]) expect(x.props.allowFontScaling).toBe(false);
  });

  it('znaki-ikony na „Dziś” (⚙︎, ✓) z limitem ZNAK_SKALA_MAX = 1,4', () => {
    expect(ZNAK_SKALA_MAX).toBe(1.4);
    const dzis = readFileSync(join(__dirname, '..', '..', 'app', '(tabs)', 'index.tsx'), 'utf8');
    const znaki = dzis.split('\n').filter((l) => /⚙︎|>✓</.test(l) && !/^\s*(\{\/\*|\/\/|\*)/.test(l) && !/zamiast rysunku/.test(l));
    expect(znaki.length).toBeGreaterThanOrEqual(3);
    // ⚙︎ stoi w osobnym wierszu: sprawdzamy element Text, który go zawiera
    expect(dzis).toMatch(/maxFontSizeMultiplier=\{ZNAK_SKALA_MAX\}[^>]*>\s*⚙︎/);
    expect((dzis.match(/maxFontSizeMultiplier=\{ZNAK_SKALA_MAX\}[^>]*>✓</g) ?? []).length).toBe(2);
  });
});
