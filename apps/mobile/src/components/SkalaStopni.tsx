import { useTranslation } from 'react-i18next';
import { PixelRatio, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { mnoznikSkaliStopni, podstawaPrzedzialu } from '@/theme/skalowanie';
import { etykietaSkali, przedzialySkali, type OcenaDecyzji } from '@/features/stol/skala';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';

/**
 * Skala stopni na suknie po ocenie (08 cz. 6 krok 6, D-274; design-spec „`SkalaStopni`”, makieta e3 po-ocenie): trzy
 * przedziały z progów `thresholds.ts`, obwódki `scaleEdge`, twój przedział złotą obwódką („złoto znaczy wyłącznie ty”).
 * Stopnie bez koloru: niosą je słowo i zakres.
 */
export function SkalaStopni({ czestosc, ocena }: { czestosc: number; ocena: OcenaDecyzji }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const skala = PixelRatio.getFontScale();
  const mnoznik = mnoznikSkaliStopni(useWindowDimensions().width); // A04-06: sufit tekstu jak makieta (e3.css:112)
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={etykietaSkali(czestosc, ocena, t)} style={styles.rzad}>
      {przedzialySkali(ocena, t).map((p) => (
        <View
          key={p.stopien}
          testID={`przedzial-${p.stopien}`}
          accessibilityState={{ selected: p.twoj }}
          style={[styles.przedzial, { flexBasis: podstawaPrzedzialu(skala, p.twoj), borderColor: p.twoj ? tk.gold : tk.scaleEdge, borderWidth: p.twoj ? 2.5 : 1 }]}
        >
          <Text maxFontSizeMultiplier={mnoznik} style={[styl.drobny, { color: p.twoj ? tk.goldText : tk.onFelt, fontWeight: '600' }]}>{p.slowo}</Text>
          <Text maxFontSizeMultiplier={mnoznik} style={[styl.drobny, { color: p.twoj ? tk.goldText : tk.onFeltMuted, fontVariant: ['tabular-nums'] }]}>{p.zakres}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rzad: { flexDirection: 'row', flexWrap: 'wrap', gap: odstep.s },
  przedzial: { flexGrow: 1, minWidth: 0, borderRadius: promien.przedzial, paddingVertical: odstep.s, paddingHorizontal: odstep.s, gap: 2 },
});
