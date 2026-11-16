// HL (D-1670): tylko dla zrzutów web (metro.config.js podstawia ten moduł za `react-native-web/dist/exports/Text`, gdy SZKOLA_ZRZUTY=1).
// react-native-web nie stosuje skali czcionki systemu. Tu `Text` mnoży fontSize i lineHeight przez skalę z `?fs=` (np. 3.12 = AX5, 53/17 pt),
// z sufitem `maxFontSizeMultiplier` i z pominięciem `allowFontScaling={false}`, czyli jak iOS. To przybliżenie: nie modeluje krzywej Dynamic Type
// poszczególnych stylów tekstu (iOS skaluje mniejsze style mocniej niż duże), tylko jeden mnożnik.
import { createElement, forwardRef, type ReactElement } from 'react';
import type { TextProps } from 'react-native';
import StyleSheet from 'react-native-web/dist/exports/StyleSheet';
import TekstWeb from 'react-native-web/dist/exports/Text';

const skala = Number(new URLSearchParams(globalThis.location?.search ?? '').get('fs') ?? '1') || 1;

const Text = forwardRef<unknown, TextProps>(function Text(props, ref): ReactElement {
  const { style, allowFontScaling, maxFontSizeMultiplier, ...reszta } = props;
  if (skala === 1 || allowFontScaling === false) return createElement(TekstWeb, { ...reszta, style, ref });
  const plaski = StyleSheet.flatten(style) ?? {};
  const k = typeof maxFontSizeMultiplier === 'number' && maxFontSizeMultiplier >= 1 ? Math.min(skala, maxFontSizeMultiplier) : skala;
  const nowy = { ...plaski };
  if (typeof plaski.fontSize === 'number') nowy.fontSize = plaski.fontSize * k;
  if (typeof plaski.lineHeight === 'number') nowy.lineHeight = plaski.lineHeight * k;
  return createElement(TekstWeb, { ...reszta, style: nowy, ref });
});

export default Text;
