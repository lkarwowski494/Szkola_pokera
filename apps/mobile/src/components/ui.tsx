import type { ReactNode, Ref } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ScrollViewInstance, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

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

export function Title({ children }: { children: ReactNode }) {
  const tk = useTokens();
  return (
    <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
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
  const primary = variant === 'primary';
  return (
    <Pressable
      testID={testID}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
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
      <Text style={[styl.tresc, { fontWeight: '700', color: primary ? tk.primaryInk : tk.link }]}>{label}</Text>
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

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: promien.przycisk,
    borderWidth: 1.5,
    paddingHorizontal: odstep.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
