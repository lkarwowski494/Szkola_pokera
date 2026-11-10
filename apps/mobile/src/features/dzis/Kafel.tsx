import { Pressable, Text, View } from 'react-native';
import { Ikona, type NazwaIkony } from '@/components/Ikona';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
import { etykietaKafla } from './widok';

/**
 * Kafelek menu „Dziś” (D-541, `docs/design/menu-i-zebatka.md`): tło `surface`, promień 14, ikona 22 pt w wierszu tytułu
 * (tytuł zawija się pod ikoną przy dużym tekście), tytuł 17 pt semibold, stan 13 pt `muted`. Cały kafelek jest przyciskiem
 * z etykietą „{tytuł}. {stan}.”; ikona ukryta przed czytnikiem. Wysokość ≥ 44 pt.
 */
export default function Kafel({ testID, ikona, tytul, stan, onPress, szeroki }: { testID: string; ikona: NazwaIkony; tytul: string; stan: string; onPress(): void; szeroki: boolean }) {
  const tk = useTokens();
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={etykietaKafla(tytul, stan)}
      onPress={onPress}
      style={({ pressed }) => ({
        flexBasis: szeroki ? '100%' : '47%',
        flexGrow: 1,
        minHeight: 72,
        backgroundColor: tk.surface,
        borderRadius: promien.przycisk,
        paddingVertical: odstep.m,
        paddingHorizontal: odstep.m,
        gap: odstep.xs,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: odstep.s, rowGap: odstep.xs }}>
        <Ikona nazwa={ikona} kolor={tk.ink} rozmiar={22} />
        <Text style={[styl.naglowek, { color: tk.ink, flexShrink: 1 }]}>{tytul}</Text>
      </View>
      <Text style={[styl.przypis, { color: tk.muted }]}>{stan}</Text>
    </Pressable>
  );
}
