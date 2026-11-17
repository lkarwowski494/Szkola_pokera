import { HAND_CLASSES } from '@szkola/poker-core';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { RangeSpot } from '@/data/content/repo';
import { wymiaryEtykietySiatki } from '@/theme/skalowanie';
import { siatka } from '@/theme/tokeny';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Siatka 13×13 (FR-03). Wiersz/kolumna: A→2; nad przekątną ręce w kolorze, pod nią w różnych kolorach.
 * Klasy `spot.uncertain` mają kropkę (View, koło `siatka.znakSrednica`, kolor `ink` w każdym polu) i legendę „mieszana” (jak PaintGrid; M2-koordynator-napraw-001).
 * Kropka w `ink`: `muted` miał na zielonym polu 1,60:1 (M1-audytor-generalny-067); stoi w rogu, ≥ 3:1 i do `surface`, i do zieleni (para w `paryZlozone`).
 * Etykieta ręki (M2-koordynator-napraw-006, KO-132 (a) i (c), D-2020; design-spec „RangeGrid”): pole w pełni zielone (pierwsza grupa = 1) ma `onFelt`
 * (≥ 4,5:1 do zieleni z kryciem 0,85), każde inne `ink` na podkładce `surface` (≥ 4,5:1); jedna gałąź: `ink` ⇔ podkładka. Rozmiar etykiety z szerokości pola
 * i skali tekstu (`wymiaryEtykietySiatki`), bez skalowania przez RN: etykieta to rysunek, treść o siatce niesie tytuł, legenda i etykieta czytnika ekranu.
 * Kolor pola: udział pierwszej grupy akcji (np. przebicie) i drugiej (np. sprawdzenie) jako paski. Pasek pierwszej grupy i próbka legendy to `rangeFill`
 * (M2-koordynator-napraw-009, D-2021), nie `felt1` (suknem stołu): w ciemnych motywach `felt1` dawał pasek 1,47–1,71:1 do `surface`; `rangeFill` ≥ 3:1 do `surface`,
 * `onFelt` ≥ 4,5:1 i kropka `ink` ≥ 3:1 na pasku (pary w `paryZlozone`).
 */
export function RangeGrid({ spot }: { spot: RangeSpot }) {
  const tk = useTokens();
  const niepewne = new Set(spot.uncertain ?? []); // klasy sprzeczne z solverem lub bez pewnego źródła: ta sama kropka co w PaintGrid
  const { width: szerOkna, fontScale: skala } = useWindowDimensions();
  const [szerSiatki, setSzerSiatki] = useState<number | null>(null); // z `onLayout`; przed pomiarem szerokość okna minus marginesy ekranu
  const pole = (szerSiatki ?? szerOkna - 2 * odstep.l) / 13;
  const { fontSize, lineHeight } = wymiaryEtykietySiatki(pole, skala);
  const colors = [tk.rangeFill, tk.przejsciowe.warn, tk.cardBlue];
  const { t, i18n } = useTranslation();
  // A04-10 (D-284): liczba w formacie języka (jak `features/stol/skala.ts`), tekst z t()
  const pct = new Intl.NumberFormat(i18n.language || 'pl', { maximumFractionDigits: 1 }).format(spot.playPercent * 100);
  return (
    <View style={{ gap: odstep.s }} accessible accessibilityLabel={t('range.label', { title: spot.title, pct })}>
      <Text style={[styl.naglowek, { color: tk.ink }]}>{spot.title}</Text>
      <View testID="siatka-zakresu" onLayout={(e) => setSzerSiatki(e.nativeEvent.layout.width)} style={[styles.grid, { borderColor: tk.separator }]}>
        {Array.from({ length: 13 }, (_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: 13 }, (__, col) => {
              const i = row * 13 + col;
              const hc = HAND_CLASSES[i]!;
              let offset = 0;
              const pelne = (spot.groups[0]?.freqs[i] ?? 0) >= 1; // grupa 0 = rangeFill; pole z grupą 2 lub 3 nie jest pełne w sensie tej reguły
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
                  <View style={[styles.podkladka, { maxWidth: pole - 2 }, pelne ? null : { backgroundColor: tk.surface }]}>
                    <Text style={[styles.label, { color: pelne ? tk.onFelt : tk.ink, fontSize, lineHeight }]} allowFontScaling={false} adjustsFontSizeToFit numberOfLines={1}>
                      {hc}
                    </Text>
                  </View>
                  {niepewne.has(hc) ? <View testID={`kropka-${hc}`} accessibilityElementsHidden importantForAccessibility="no" style={[styles.kropka, { backgroundColor: tk.ink }]} /> : null}
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
  podkladka: { paddingHorizontal: siatka.podkladkaPoziom }, // bez promienia i pionowego marginesu: wysokość = interlinia etykiety
  label: { fontWeight: '600' },
  kropka: { position: 'absolute', top: siatka.znakOdstep, right: siatka.znakOdstep, width: siatka.znakSrednica, height: siatka.znakSrednica, borderRadius: siatka.znakSrednica / 2 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.m, alignItems: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
});
