import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { ReactNode } from 'react';

/**
 * Ikony menu (D-546, D-540): rysunki 24×24 z makiety `docs/design/narzedzia/menu-makieta.mjs` (ZEBATKA, ikony), kreska 2 pt,
 * kolor z tokenu przekazany przez wywołującego, `stroke-linejoin: round`. Rysunek ma stały rozmiar (jak ikony paska iOS);
 * przy dużym tekście nie rośnie. Dla czytnika ukryte — nazwę niesie przycisk albo kafelek.
 */
const ZEBATKA = 'M9.02 4.79L10.72 4.31L10.74 1.88L13.26 1.88L13.28 4.31L14.98 4.79L16.54 5.65L18.27 3.95L20.05 5.73L18.35 7.46L19.21 9.02L19.69 10.72L22.12 10.74L22.12 13.26L19.69 13.28L19.21 14.98L18.35 16.54L20.05 18.27L18.27 20.05L16.54 18.35L14.98 19.21L13.28 19.69L13.26 22.12L10.74 22.12L10.72 19.69L9.02 19.21L7.46 18.35L5.73 20.05L3.95 18.27L5.65 16.54L4.79 14.98L4.31 13.28L1.88 13.26L1.88 10.74L4.31 10.72L4.79 9.02L5.65 7.46L3.95 5.73L5.73 3.95L7.46 5.65Z';

export type NazwaIkony = 'ustawienia' | 'powtorki' | 'cwiczenia' | 'scenariusze';

const RYSUNKI: Record<NazwaIkony, ReactNode> = {
  ustawienia: (
    <>
      <Path d={ZEBATKA} />
      <Circle cx={12} cy={12} r={3.6} />
    </>
  ),
  powtorki: <Path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" />,
  cwiczenia: (
    <>
      <Rect x={3.5} y={5} width={10} height={14} rx={2} />
      <Path d="M15.5 6.5l4 1-3 11.5-3.2-.8" />
    </>
  ),
  scenariusze: (
    <>
      <Rect x={2.5} y={6} width={19} height={12} rx={6} />
      <Path d="M7 12h7.5M12 9.5l2.5 2.5-2.5 2.5" />
    </>
  ),
};

export function Ikona({ nazwa, kolor, rozmiar = 24 }: { nazwa: NazwaIkony; kolor: string; rozmiar?: number }) {
  return (
    <Svg
      testID={`ikona-${nazwa}`}
      width={rozmiar}
      height={rozmiar}
      viewBox="0 0 24 24"
      fill="none"
      stroke={kolor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {RYSUNKI[nazwa]}
    </Svg>
  );
}
