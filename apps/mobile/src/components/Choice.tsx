import { Pressable, StyleSheet, Text, View } from 'react-native';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/** Wybór jednej opcji z kilku (przyciski w rzędzie, zawijane). */
export function Choice<T extends string | number | null>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly { value: T; label: string; hint?: string; disabled?: boolean }[];
  value: T;
  onChange: (v: T) => void;
  label?: string;
}) {
  const tk = useTokens();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={styles.row}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={String(o.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: on, disabled: !!o.disabled }}
            accessibilityHint={o.hint}
            disabled={o.disabled}
            onPress={() => onChange(o.value)}
            style={({ pressed }) => [
              styles.chip,
              { borderColor: on ? tk.ink : tk.separator, borderWidth: on ? 2.5 : 1.5, backgroundColor: tk.surface, opacity: o.disabled ? 0.45 : pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styl.tresc, { color: tk.ink, fontWeight: on ? '700' : '500' }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.s },
  chip: { minHeight: 44, paddingHorizontal: odstep.l, borderRadius: promien.przycisk, borderWidth: 1.5, justifyContent: 'center' },
});
