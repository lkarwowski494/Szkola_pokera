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
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { PasekStrategii } from '@/components/PasekStrategii';
import { SkalaStopni } from '@/components/SkalaStopni';
import StopienOceny from '@/features/ocena/StopienOceny';
import { mnoznikSkaliStopni, podstawaPrzedzialu, podstawaSegmentu, sufitTytulu, ZNAK_SKALA_MAX } from '@/theme/skalowanie';
import { styl, typografia } from '@/theme/tokens';

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

  // BI (D-540, D-542): zębatka to rysunek SVG (`Ikona`, stały rozmiar), nie znak „⚙︎”; ✓ w kropkach lekcji i egzaminu jest w `lessons.tsx`.
  it('znaki-✓ na „Lekcjach” z limitem ZNAK_SKALA_MAX = 1,4; „Dziś” bez znaku ⚙︎ (rysunek SVG)', () => {
    expect(ZNAK_SKALA_MAX).toBe(1.4);
    const lekcje = readFileSync(join(__dirname, '..', '..', 'app', '(tabs)', 'lessons.tsx'), 'utf8');
    expect((lekcje.match(/maxFontSizeMultiplier=\{ZNAK_SKALA_MAX\}[^>]*>✓</g) ?? []).length).toBe(2);
    const dzis = readFileSync(join(__dirname, '..', '..', 'app', '(tabs)', 'index.tsx'), 'utf8');
    expect(dzis.split('\n').filter((l) => /⚙︎/.test(l) && !/^\s*(\{\/\*|\/\/|\*)/.test(l))).toEqual([]);
    expect(dzis).toMatch(/<Ikona nazwa="ustawienia"/);
  });
});

describe('A04-06: pasek przed decyzją i skala stopni zawijają się (makieta e3.css:101–102, 112–113)', () => {
  it('podstawy jak w makiecie: segment 70 pt × skala, przedział 76 pt (twój 112) × skala; sufit skali 6% szerokości / 13 pt', () => {
    expect(podstawaSegmentu(1)).toBe(70);
    expect(podstawaSegmentu(2)).toBe(140);
    expect(podstawaPrzedzialu(1.5, false)).toBe(114);
    expect(podstawaPrzedzialu(1, true)).toBe(112);
    expect(mnoznikSkaliStopni(390)).toBeCloseTo(1.8);
    expect(mnoznikSkaliStopni(100)).toBe(1); // nigdy mniej niż rozmiar domyślny
  });

  it('pasek-przyciski: rząd z zawijaniem, segment z podstawą zależną od skali (testID option-<i> zostaje)', async () => {
    const opcje = [{ text: 'Pas' }, { text: 'Przebicie' }, { text: 'All-in' }];
    await render(<PasekStrategii opcje={opcje} wybor={null} klasa="J9o" onWybierz={jest.fn()} />);
    const kontener = screen.getByTestId('option-0').parent!;
    expect(StyleSheet.flatten(kontener.props.style)).toMatchObject({ flexDirection: 'row', flexWrap: 'wrap' });
    expect(StyleSheet.flatten(screen.getByTestId('option-1').props.style)).toMatchObject({ flexBasis: podstawaSegmentu(PixelRatio.getFontScale()), flexGrow: 1 });
  });

  it('skala stopni: rząd z zawijaniem, przedziały z podstawą, tekst z sufitem szerokości', async () => {
    await render(<SkalaStopni czestosc={0.2} ocena="dopuszczalne" />);
    expect(StyleSheet.flatten(screen.getByRole('image').props.style)).toMatchObject({ flexDirection: 'row', flexWrap: 'wrap' });
    const tu = screen.getByTestId('przedzial-dopuszczalne');
    expect(StyleSheet.flatten(tu.props.style)).toMatchObject({ flexBasis: podstawaPrzedzialu(PixelRatio.getFontScale(), true), flexGrow: 1 });
    const m = mnoznikSkaliStopni(Dimensions.get('window').width);
    for (const x of within(tu).getAllByText(/.+/)) expect(x.props.maxFontSizeMultiplier).toBe(m);
  });
});

describe('A04-07: sufit tytułów od AX1 (D-122, typografia.skala.*.maxW) i styl słowa stopnia', () => {
  it('przy tekście domyślnym bez zmian; przy AX tytuł nie rośnie ponad maxW × szerokość (po przemnożeniu przez skalę)', () => {
    const tytul = typografia.skala.tytul; // 28/34, maxW 0,10
    expect(sufitTytulu(tytul, 1, 390)).toEqual({ fontSize: 28, lineHeight: 34 });
    const ax = sufitTytulu(tytul, 3, 390);
    expect(ax.fontSize * 3).toBeCloseTo(39);
    expect(ax.lineHeight / ax.fontSize).toBeCloseTo(34 / 28);
    // poniżej sufitu (XXXL ≈ 1,35 przy 390 pt: 37,8 < 39) — bez zmian
    expect(sufitTytulu(tytul, 1.35, 390)).toEqual({ fontSize: 28, lineHeight: 34 });
    // wąski ekran: sufit nie schodzi poniżej rozmiaru domyślnego (320 × 0,085 = 27,2 < 34)
    expect(sufitTytulu(typografia.skala.slowoStopnia, 2, 320).fontSize * 2).toBeCloseTo(34);
  });

  it('style tytułów używają sufitu; słowo stopnia ma własny styl 34/38 (nie `tytul` 28/34)', async () => {
    const skala = jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(3);
    expect(styl.tytul.fontSize * 3).toBeCloseTo(Dimensions.get('window').width * 0.1);
    expect(styl.tytulDuzy.fontSize * 3).toBeCloseTo(Dimensions.get('window').width * 0.1);
    skala.mockReturnValue(1); // tekst domyślny (atrapa RN w Jest ma inną skalę)
    expect(styl.slowoStopnia).toMatchObject({ fontSize: 34, lineHeight: 38 });
    await render(<StopienOceny ocena="zgodne" naSuknie />);
    expect(StyleSheet.flatten(screen.getByText('Zgodna').props.style)).toMatchObject({ fontSize: 34, lineHeight: 38 });
    skala.mockRestore();
  });
});
