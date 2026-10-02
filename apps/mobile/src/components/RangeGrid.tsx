import { HAND_CLASSES } from '@szkola/poker-core';
import { StyleSheet, Text, View } from 'react-native';
import type { RangeSpot } from '@/data/content/repo';
import { space, type as tp, useTokens } from '@/theme/tokens';

/**
 * Siatka 13×13 (FR-03). Wiersz/kolumna: A→2; nad przekątną ręce w kolorze, pod nią w różnych kolorach.
 * Kolor pola: udział pierwszej grupy akcji (np. przebicie) i drugiej (np. sprawdzenie) jako paski.
 */
export function RangeGrid({ spot }: { spot: RangeSpot }) {
  const tk = useTokens();
  const colors = [tk.felt, tk.warn, tk.cardBlue];
  const pct = Math.round(spot.playPercent * 1000) / 10;
  return (
    <View style={{ gap: space.s }} accessible accessibilityLabel={`${spot.title}. Gra ${pct} procent rąk.`}>
      <Text style={[tp.h3, { color: tk.ink }]}>{spot.title}</Text>
      <View style={[styles.grid, { borderColor: tk.line }]}>
        {Array.from({ length: 13 }, (_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: 13 }, (__, col) => {
              const i = row * 13 + col;
              const hc = HAND_CLASSES[i]!;
              let offset = 0;
              return (
                <View key={col} style={[styles.cell, { backgroundColor: tk.surface, borderColor: tk.line }]}>
                  <View style={StyleSheet.absoluteFill}>
                    {spot.groups.map((g, gi) => {
                      const f = g.freqs[i] ?? 0;
                      const el = <View key={gi} style={{ position: 'absolute', left: `${offset * 100}%`, width: `${f * 100}%`, top: 0, bottom: 0, backgroundColor: colors[gi % colors.length], opacity: 0.85 }} />;
                      offset += f;
                      return el;
                    })}
                  </View>
                  <Text style={[styles.label, { color: tk.ink }]} numberOfLines={1}>
                    {hc}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        {spot.groups.map((g, gi) => (
          <View key={g.name} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: colors[gi % colors.length] }]} />
            <Text style={[tp.caption, { color: tk.muted }]}>{g.name}</Text>
          </View>
        ))}
        <Text style={[tp.caption, { color: tk.muted }]}>{`Gra ${String(pct).replace('.', ',')}% rąk`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { borderWidth: StyleSheet.hairlineWidth, aspectRatio: 1, width: '100%' },
  row: { flex: 1, flexDirection: 'row' },
  cell: { flex: 1, borderWidth: StyleSheet.hairlineWidth / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  label: { fontSize: 8, fontWeight: '600' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: space.m, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
});
