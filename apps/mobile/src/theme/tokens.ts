import { useColorScheme } from 'react-native';

/**
 * Tokeny wizualne. Kierunek: stół do gry i notatnik do nauki.
 * Jedyny mocny akcent to sukno (zieleń) i same karty; reszta interfejsu jest cicha.
 */
const light = {
  bg: '#F3F5F2',
  surface: '#FFFFFF',
  ink: '#17201B',
  muted: '#5B6862',
  line: '#D9E0DB',
  felt: '#1F5E45',
  feltDeep: '#174A36',
  feltSoft: '#E3EFE8',
  onFelt: '#F2F7F4',
  good: '#1F7A4D',
  goodSoft: '#E2F3E9',
  bad: '#B3372C',
  badSoft: '#FBE7E4',
  warn: '#8A5A00',
  cardFace: '#FFFEFB',
  cardEdge: '#C9C4B8',
  cardInk: '#1A1A1A',
  cardRed: '#C0352B',
  cardBlue: '#2456A6',
  cardGreen: '#2A7A3B',
};

const dark: typeof light = {
  bg: '#0F1512',
  surface: '#18201C',
  ink: '#E5EBE7',
  muted: '#9AA8A1',
  line: '#2A3530',
  felt: '#5FB98F',
  feltDeep: '#1C3A2D',
  feltSoft: '#1C2E25',
  onFelt: '#F2F7F4',
  good: '#6FCF9A',
  goodSoft: '#17301F',
  bad: '#F08478',
  badSoft: '#36201D',
  warn: '#E0B24F',
  cardFace: '#F4F1EA',
  cardEdge: '#B9B3A6',
  cardInk: '#1A1A1A',
  cardRed: '#C0352B',
  cardBlue: '#2456A6',
  cardGreen: '#2A7A3B',
};

export type Tokens = typeof light;

export function useTokens(): Tokens {
  return useColorScheme() === 'dark' ? dark : light;
}

export const space = { xs: 4, s: 8, m: 12, l: 16, xl: 24, xxl: 32 } as const;
export const radius = { s: 6, m: 10, l: 14 } as const;

/** Skala typograficzna (pt). Krój systemowy iOS; indeksy kart szeryfowe jak na prawdziwej talii. */
export const type = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const },
  h2: { fontSize: 21, lineHeight: 27, fontWeight: '700' as const },
  h3: { fontSize: 17, lineHeight: 23, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
};

export const cardFont = 'Georgia';
