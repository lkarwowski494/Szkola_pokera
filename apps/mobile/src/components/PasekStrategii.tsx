import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { opisPaska, segmentyPaska, type OpcjaPaska } from '@/features/stol/pasek';
import { odstep, promien, ruch, styl, useTokens } from '@/theme/tokens';

/**
 * Pasek strategii (08 cz. 6 krok 5, D-274; design-spec „`PasekStrategii`”, element firmowy D-116; makieta e3).
 * Przed decyzją: równe segmenty-przyciski ≥ 64 pt, nic nie zdradzają; `testID` `option-<i>` jak dotychczasowe opcje (flowy E2E).
 * Po ocenie: te same granice przesuwają się do częstości solvera (`ruch.ocena`, 240 ms), „pas” kreskowany (obwódka
 * kreskowana — najbliższe kreskowaniu w RN bez grafiki; 08-F27), złoty znacznik nad twoim wyborem (`ruch.znacznik`),
 * podpisy z procentami. „Ogranicz ruch”: bez przesunięć, tylko przenikanie (`ruch.ograniczRuch`).
 */
export type OpcjaPaskaUI = OpcjaPaska & { readonly pas?: boolean };
const CEL_AKCJI = 64; // design-spec: akcje decyzji ≥ 64 pt

function useOgraniczRuch(): boolean {
  const [on, ustaw] = useState(false);
  useEffect(() => {
    let aktywny = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => aktywny && ustaw(v))
      .catch(() => undefined); // brak odczytu = ruch zwykły (preferencja interfejsu)
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', ustaw);
    return () => {
      aktywny = false;
      sub.remove();
    };
  }, []);
  return on;
}

export function PasekStrategii({
  opcje,
  wybor,
  klasa,
  onWybierz,
}: {
  opcje: readonly OpcjaPaskaUI[];
  wybor: number | null;
  klasa: string;
  onWybierz?: (i: number) => void;
}): React.JSX.Element {
  const tk = useTokens();
  if (wybor === null) {
    return (
      <View accessibilityRole="none" style={[styles.przyciski, { backgroundColor: tk.actionBg, borderColor: tk.actionOutline }]}>
        {opcje.map((o, i) => (
          <Pressable
            key={`${o.text}-${i}`}
            testID={`option-${i}`}
            accessibilityRole="button"
            accessibilityLabel={o.text}
            onPress={() => {
              void Haptics.selectionAsync().catch(() => undefined); // haptyka.wyborAkcji
              onWybierz?.(i);
            }}
            style={({ pressed }) => [
              styles.przycisk,
              { minHeight: CEL_AKCJI, borderLeftWidth: i === 0 ? 0 : StyleSheet.hairlineWidth * 2, borderColor: tk.actionEdge, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styl.naglowek, { color: tk.actionInk, textAlign: 'center' }]}>{o.text}</Text>
          </Pressable>
        ))}
      </View>
    );
  }
  return <PoOcenie opcje={opcje} wybor={wybor} klasa={klasa} />;
}

function PoOcenie({ opcje, wybor, klasa }: { opcje: readonly OpcjaPaskaUI[]; wybor: number; klasa: string }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const ogranicz = useOgraniczRuch();
  const seg = segmentyPaska(opcje, wybor);
  const rowne = 1 / Math.max(1, opcje.length);
  const postep = useRef(new Animated.Value(0)).current;
  const znacznik = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = ogranicz
      ? Animated.parallel([
          Animated.timing(postep, { toValue: 1, duration: 0, useNativeDriver: false }),
          Animated.timing(znacznik, { toValue: 1, duration: ruch.ograniczRuch.czas, easing: Easing.linear, useNativeDriver: false }),
        ])
      : Animated.parallel([
          Animated.timing(postep, { toValue: 1, duration: ruch.ocena.czas, easing: Easing.out(Easing.quad), useNativeDriver: false }),
          Animated.timing(znacznik, { toValue: 1, duration: ruch.znacznik.czas, delay: ruch.znacznik.opoznienie, easing: Easing.out(Easing.quad), useNativeDriver: false }),
        ]);
    anim.start();
    return () => anim.stop();
  }, [ogranicz, postep, znacznik]);
  return (
    <View accessible accessibilityRole="image" accessibilityLabel={opisPaska(opcje, wybor, klasa, t) ?? undefined} style={{ gap: odstep.s }}>
      <View style={styles.os}>
        {seg.map((s) => (
          <Animated.View
            key={s.indeks}
            style={{ flexGrow: postep.interpolate({ inputRange: [0, 1], outputRange: [rowne, Math.max(s.szerokosc, 0.0001)] }), flexBasis: 0 }}
          >
            {s.twoj ? <Animated.View testID={`znacznik-${s.indeks}`} style={[styles.znacznik, { backgroundColor: tk.gold, opacity: znacznik }]} /> : <View style={styles.znacznikMiejsce} />}
            <View
              style={[
                styles.segment,
                opcje[s.indeks]?.pas
                  ? { backgroundColor: tk.foldFill, borderColor: tk.foldStripe, borderStyle: 'dashed', borderWidth: 2 }
                  : { backgroundColor: tk.raiseFill, borderColor: tk.onFelt, borderWidth: StyleSheet.hairlineWidth },
              ]}
            />
          </Animated.View>
        ))}
      </View>
      <View style={styles.podpisy}>
        {seg.map((s) => (
          <View key={s.indeks} style={styles.podpis}>
            <Text style={[styl.drobny, { color: s.twoj ? tk.goldText : tk.onFelt, fontWeight: '600' }]}>{s.tekst}</Text>
            {s.procent !== null ? (
              <Text style={[styl.drobny, { color: s.twoj ? tk.goldText : tk.onFeltMuted, fontVariant: ['tabular-nums'] }]}>{t('strategy.pct', { pct: s.procent })}</Text>
            ) : null}
            {s.twoj ? <Text style={[styl.drobny, { color: tk.goldText }]}>{t('strategy.yourChoiceShort')}</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  przyciski: { flexDirection: 'row', borderRadius: promien.przycisk, borderWidth: StyleSheet.hairlineWidth * 2, overflow: 'hidden' },
  przycisk: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: odstep.s, paddingVertical: odstep.m },
  os: { flexDirection: 'row', alignItems: 'flex-end' },
  segment: { height: 16 },
  znacznik: { alignSelf: 'center', width: 12, height: 12, borderRadius: promien.przedzial, marginBottom: odstep.xs },
  znacznikMiejsce: { height: 12 + odstep.xs },
  podpisy: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: odstep.m },
  podpis: { gap: 2 },
});
