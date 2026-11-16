import { useState, type ReactNode, type Ref } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View, type ScrollViewInstance, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import { rozmiarDoSzerokosci } from './dopasowanie';

export function Screen({
  children,
  scroll = true,
  padTop = true,
  scrollEnabled = true,
  scrollRef,
}: {
  children: ReactNode;
  scroll?: boolean;
  padTop?: boolean;
  /** Np. wyłączone na czas malowania siatki palcem. */
  scrollEnabled?: boolean;
  /** Np. przewinięcie na górę po zmianie zadania w sesji (08-F25). */
  scrollRef?: Ref<ScrollViewInstance>;
}) {
  const tk = useTokens();
  const insets = useSafeAreaInsets();
  const style = { paddingTop: padTop ? insets.top + odstep.l : odstep.l, paddingBottom: insets.bottom + odstep.x3, paddingHorizontal: odstep.l, gap: odstep.l };
  if (!scroll) return <View style={[{ flex: 1, backgroundColor: tk.bg }, style]}>{children}</View>;
  return (
    <ScrollView ref={scrollRef} style={{ flex: 1, backgroundColor: tk.bg }} contentContainerStyle={style} contentInsetAdjustmentBehavior="automatic" scrollEnabled={scrollEnabled} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

/** `rozmiar="tytulDlugi"`: mniejszy styl długiego tytułu sytuacji na starcie scenariusza (HX, D-1730); domyślnie `tytul`. */
export function Title({ children, rozmiar = 'tytul' }: { children: ReactNode; rozmiar?: 'tytul' | 'tytulDlugi' }) {
  const tk = useTokens();
  return (
    <Text accessibilityRole="header" style={[styl[rozmiar], { color: tk.ink }]}>
      {children}
    </Text>
  );
}

export function H2({ children }: { children: ReactNode }) {
  const tk = useTokens();
  return (
    <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>
      {children}
    </Text>
  );
}

export function Muted({ children, style }: { children: ReactNode; style?: object }) {
  const tk = useTokens();
  return <Text style={[styl.przypis, { color: tk.muted }, style]}>{children}</Text>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  testID,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  /** „link” dla przycisków otwierających stronę w przeglądarce. */
  accessibilityRole?: 'button' | 'link';
  /** Stały identyfikator dla flowów E2E (selektor po id, nie po tekście). */
  testID?: string;
}) {
  const tk = useTokens();
  const { width: szerokoscOkna, fontScale } = useWindowDimensions(); // IH (IF P2-1): reaktywnie, wzór Trening `components/Segmented.tsx:36`
  const [szerokoscPola, ustawSzerokoscPola] = useState(0);
  const primary = variant === 'primary';
  // IF (D-1880), IH (IF P2-2): etykieta z długim wyrazem („Zobacz podsumowanie”) nie wychodzi poza przycisk przy 320 pt i AX5: rozmiar dopasowany do pola przycisku
  // (jego szerokość z układu − 2 × padding − 2 × obrys; para flex:1 i Surface dają węższe pole niż ekran); przed pierwszym układem szerokość ekranu − 2 × `odstep.l`.
  const szerokoscPrzycisku = szerokoscPola > 0 ? szerokoscPola : szerokoscOkna - 2 * odstep.l;
  const rozmiar = rozmiarDoSzerokosci(label, szerokoscPrzycisku - 2 * odstep.xxl - 2 * BUTTON_OBRYS, fontScale, styl.tresc);
  return (
    <Pressable
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLayout={(e) => { const x = Math.round(e.nativeEvent.layout.width); if (x > 0 && x !== szerokoscPola) ustawSzerokoscPola(x); }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? tk.primaryBg : 'transparent',
          borderColor: tk.primaryBg,
          opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text style={[styl.tresc, rozmiar, { fontWeight: '700', color: primary ? tk.primaryInk : tk.link, textAlign: 'center' }]}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value, height = 6 }: { value: number; height?: number }) {
  const tk = useTokens();
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: tk.separator, overflow: 'hidden' }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}>
      <View style={{ width: `${pct * 100}%`, height, backgroundColor: tk.primaryBg }} />
    </View>
  );
}

export function Surface({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const tk = useTokens();
  return <View style={[{ backgroundColor: tk.surface, borderColor: tk.separator, borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: promien.przycisk, padding: odstep.l }, style]}>{children}</View>;
}

/** Obrys przycisku (pt); wchodzi do pola etykiety w `Button`. */
const BUTTON_OBRYS = 1.5;

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: promien.przycisk,
    borderWidth: BUTTON_OBRYS,
    paddingHorizontal: odstep.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
