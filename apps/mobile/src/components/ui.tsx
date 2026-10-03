import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

export function Screen({
  children,
  scroll = true,
  padTop = true,
  scrollEnabled = true,
}: {
  children: ReactNode;
  scroll?: boolean;
  padTop?: boolean;
  /** Np. wyłączone na czas malowania siatki palcem. */
  scrollEnabled?: boolean;
}) {
  const tk = useTokens();
  const insets = useSafeAreaInsets();
  const style = { paddingTop: padTop ? insets.top + space.l : space.l, paddingBottom: insets.bottom + space.xxl, paddingHorizontal: space.l, gap: space.l };
  if (!scroll) return <View style={[{ flex: 1, backgroundColor: tk.bg }, style]}>{children}</View>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: tk.bg }} contentContainerStyle={style} contentInsetAdjustmentBehavior="automatic" scrollEnabled={scrollEnabled} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

export function Title({ children }: { children: ReactNode }) {
  const tk = useTokens();
  return (
    <Text accessibilityRole="header" style={[tp.title, { color: tk.ink }]}>
      {children}
    </Text>
  );
}

export function H2({ children }: { children: ReactNode }) {
  const tk = useTokens();
  return (
    <Text accessibilityRole="header" style={[tp.h2, { color: tk.ink }]}>
      {children}
    </Text>
  );
}

export function Muted({ children, style }: { children: ReactNode; style?: object }) {
  const tk = useTokens();
  return <Text style={[tp.small, { color: tk.muted }, style]}>{children}</Text>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const tk = useTokens();
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? tk.felt : 'transparent',
          borderColor: tk.felt,
          opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text style={[tp.body, { fontWeight: '700', color: primary ? tk.onFelt : tk.felt }]}>{label}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value, height = 6 }: { value: number; height?: number }) {
  const tk = useTokens();
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: tk.line, overflow: 'hidden' }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}>
      <View style={{ width: `${pct * 100}%`, height, backgroundColor: tk.felt }} />
    </View>
  );
}

export function Surface({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const tk = useTokens();
  return <View style={[{ backgroundColor: tk.surface, borderColor: tk.line, borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.m, padding: space.l }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.m,
    borderWidth: 1.5,
    paddingHorizontal: space.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
