import { HAND_CLASSES } from '@szkola/poker-core';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import type { RangeSpot } from '@/data/content/repo';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Siatka 13×13 (FR-03). Wiersz/kolumna: A→2; nad przekątną ręce w kolorze, pod nią w różnych kolorach.
 * Kolor pola: udział pierwszej grupy akcji (np. przebicie) i drugiej (np. sprawdzenie) jako paski.
 */
export function RangeGrid({ spot }: { spot: RangeSpot }) {
  const tk = useTokens();
  const colors = [tk.felt1, tk.przejsciowe.warn, tk.cardBlue];
  const { t, i18n } = useTranslation();
  // A04-10 (D-284): liczba w formacie języka (jak `features/stol/skala.ts`), tekst z t()
  const pct = new Intl.NumberFormat(i18n.language || 'pl', { maximumFractionDigits: 1 }).format(spot.playPercent * 100);
  return (
    <View style={{ gap: odstep.s }} accessible accessibilityLabel={t('range.label', { title: spot.title, pct })}>
      <Text style={[styl.naglowek, { color: tk.ink }]}>{spot.title}</Text>
      <View style={[styles.grid, { borderColor: tk.separator }]}>
        {Array.from({ length: 13 }, (_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: 13 }, (__, col) => {
              const i = row * 13 + col;
              const hc = HAND_CLASSES[i]!;
              let offset = 0;
              return (
                <View key={col} style={[styles.cell, { backgroundColor: tk.surface, borderColor: tk.separator }]}>
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
            <Text style={[styl.drobny, { color: tk.muted }]}>{g.name}</Text>
          </View>
        ))}
        <Text style={[styl.drobny, { color: tk.muted }]}>{t('range.playPercent', { pct })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { borderWidth: StyleSheet.hairlineWidth, aspectRatio: 1, width: '100%' },
  row: { flex: 1, flexDirection: 'row' },
  cell: { flex: 1, borderWidth: StyleSheet.hairlineWidth / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  label: { fontSize: 8, fontWeight: '600' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.m, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
});
