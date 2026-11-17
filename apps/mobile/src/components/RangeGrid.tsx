import { HAND_CLASSES } from '@szkola/poker-core';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import type { RangeSpot } from '@/data/content/repo';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Siatka 13×13 (FR-03). Wiersz/kolumna: A→2; nad przekątną ręce w kolorze, pod nią w różnych kolorach.
 * Klasy `spot.uncertain` mają znak „•” i legendę „mieszana” (jak PaintGrid; M2-koordynator-napraw-001). Znak w kolorze `ink`: `muted` miał na zielonym polu 1,60:1 (M1-audytor-generalny-067);
 * stoi w rogu, a nie pod środkiem etykiety, więc zostaje `ink` (≥ 3:1 i do `surface`, i do zieleni, para w `paryZlozone`).
 * Etykieta ręki (tekst 8 pt) ma kolor wg pokrycia pola paskiem pierwszej grupy (M2-koordynator-napraw-006, KO-131): ≥ `POKRYCIE_ETYKIETY_NA_SUKNIE` `onFelt` (≥ 4,5:1 do zieleni z kryciem 0,85),
 * inaczej `ink` (4,5:1 do `surface`). Pola pośrednie (tekst leży na zieleni i `surface` naraz) mają `ink`: ≥ 3:1 do obu teł, 4,5:1 nieosiągalne jednym kolorem (otwarte dla roli 04).
 * Kolor pola: udział pierwszej grupy akcji (np. przebicie) i drugiej (np. sprawdzenie) jako paski.
 */
/** Pokrycie pola paskiem, od którego tekst etykiety (≤ ok. 70% szerokości pola, środek) leży w całości na zieleni. */
export const POKRYCIE_ETYKIETY_NA_SUKNIE = 0.85;

export function RangeGrid({ spot }: { spot: RangeSpot }) {
  const tk = useTokens();
  const niepewne = new Set(spot.uncertain ?? []); // klasy sprzeczne z solverem lub bez pewnego źródła: ta sama kropka co w PaintGrid
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
              const etykieta = (spot.groups[0]?.freqs[i] ?? 0) >= POKRYCIE_ETYKIETY_NA_SUKNIE ? tk.onFelt : tk.ink; // grupa 0 = felt1 (kolory grup 2 i 3 poza regułą: treść pl ma jedną grupę)
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
                  <Text style={[styles.label, { color: etykieta }]} numberOfLines={1}>
                    {hc}
                  </Text>
                  {niepewne.has(hc) ? <Text style={[styles.mark, { color: tk.ink }]}>•</Text> : null}
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
        {niepewne.size > 0 ? <Text style={[styl.drobny, { color: tk.muted }]}>{t('paint.legendMixed')}</Text> : null}
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
  mark: { position: 'absolute', top: 0, right: 1, fontSize: 8, fontWeight: '800' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.m, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
});
