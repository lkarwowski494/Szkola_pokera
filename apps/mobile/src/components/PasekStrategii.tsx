import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Animated, Easing, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import { podstawaSegmentu } from '@/theme/skalowanie';
import { opisPaska, segmentyPaska, type OpcjaPaska } from '@/features/stol/pasek';
import { haptyka, odstep, promien, ruch, styl, useTokens } from '@/theme/tokens';
import { wykonajHaptyke } from '@/features/session/haptyka';

/**
 * Pasek strategii (08 cz. 6 krok 5, D-274; design-spec „`PasekStrategii`”, element firmowy D-116; makieta e3).
 * Przed decyzją: równe segmenty-przyciski ≥ 64 pt, nic nie zdradzają; `testID` `option-<i>` jak dotychczasowe opcje (flowy E2E).
 * Po ocenie: te same granice przesuwają się do częstości solvera (`ruch.ocena`, 240 ms), „pas” kreskowany (obwódka
 * kreskowana — najbliższe kreskowaniu w RN bez grafiki; 08-F27), złoty znacznik nad twoim wyborem (`ruch.znacznik`),
 * podpisy z procentami. „Ogranicz ruch”: bez przesunięć, tylko przenikanie (`ruch.ograniczRuch`).
 */
export type OpcjaPaskaUI = OpcjaPaska & { readonly pas?: boolean; /** Etykieta czytnika zamiast tekstu widocznego (np. nazwy kart zamiast „A♥ 4♥”). */ readonly etykieta?: string };
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
            accessibilityLabel={o.etykieta ?? o.text}
            onPress={() => {
              void wykonajHaptyke(haptyka.wyborAkcji).catch(() => undefined);
              onWybierz?.(i);
            }}
            style={({ pressed }) => [
              styles.przycisk,
              { flexBasis: podstawaSegmentu(PixelRatio.getFontScale()), minHeight: CEL_AKCJI, borderLeftWidth: i === 0 ? 0 : StyleSheet.hairlineWidth * 2, borderColor: tk.actionEdge, opacity: pressed ? 0.85 : 1 },
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
  // szerokość kolumny: równe segmenty → częstości solvera (ruch.ocena); 0% zostaje cienką kolumną (podpis ma minWidth)
  const kolumna = (szerokosc: number) => ({
    flexGrow: postep.interpolate({ inputRange: [0, 1], outputRange: [rowne, Math.max(szerokosc, 0.0001)] }),
    flexBasis: 0,
  });
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
      {/* znaczniki, oś i podpisy w tych samych kolumnach (flexGrow segmentu): znacznik i podpis stoją nad i pod swoim segmentem */}
      <View style={styles.wiersz}>
        {seg.map((s) => (
          <Animated.View key={s.indeks} style={kolumna(s.szerokosc)}>
            {s.twoj ? (
              <Animated.View testID={`znacznik-${s.indeks}`} style={[styles.znacznik, { borderTopColor: tk.gold, opacity: znacznik }]} />
            ) : (
              <View style={styles.znacznikMiejsce} />
            )}
          </Animated.View>
        ))}
      </View>
      <View testID="os-paska" style={[styles.os, { borderColor: tk.onFelt }]}>
        {seg.map((s, i) => (
          <Animated.View
            key={s.indeks}
            style={[
              kolumna(s.szerokosc),
              opcje[s.indeks]?.pas
                ? { backgroundColor: tk.foldFill, borderColor: tk.foldStripe, borderStyle: 'dashed', borderWidth: 2 }
                : { backgroundColor: tk.raiseFill, borderColor: tk.onFelt, borderLeftWidth: i === 0 ? 0 : GRUBOSC_OSI },
            ]}
          />
        ))}
      </View>
      <View style={styles.podpisy}>
        {seg.map((s) => (
          <Animated.View key={s.indeks} testID={`podpis-${s.indeks}`} style={[kolumna(s.szerokosc), styles.podpis, { minWidth: podstawaSegmentu(PixelRatio.getFontScale()) }]}>
            <Text style={[styl.przypis, styles.podpisTekst, { color: s.twoj ? tk.goldText : tk.onFelt, fontWeight: '600' }]}>{s.tekst}</Text>
            {s.procent !== null ? (
              <Text style={[styl.przypis, styles.podpisTekst, { color: s.twoj ? tk.goldText : tk.onFeltMuted, fontVariant: ['tabular-nums'] }]}>{t('strategy.pct', { pct: s.procent })}</Text>
            ) : null}
            {s.twoj ? <Text style={[styl.przypis, styles.podpisTekst, { color: tk.goldText }]}>{t('strategy.yourChoiceShort')}</Text> : null}
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const GRUBOSC_OSI = 1.5; // e3.css:111 (obrys osi i granica segmentów)
const ZNACZNIK = { szerokosc: 10, wysokosc: 15 }; // e3.css:114: trójkąt z obramowań (10 + 10 × 15)

const styles = StyleSheet.create({
  przyciski: { flexDirection: 'row', flexWrap: 'wrap', borderRadius: promien.przycisk, borderWidth: StyleSheet.hairlineWidth * 2, overflow: 'hidden' },
  przycisk: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: odstep.s, paddingVertical: odstep.m },
  wiersz: { flexDirection: 'row' },
  // e3.css:111: oś 44 pt, obrys 1,5, promień 12 — najbliższy token `promien.przycisk` (14, ten sam co pasek przed decyzją; brak tokenu 12 zgłoszony do 04)
  os: { flexDirection: 'row', height: 44, borderWidth: GRUBOSC_OSI, borderRadius: promien.przycisk, overflow: 'hidden' },
  znacznik: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: ZNACZNIK.szerokosc,
    borderRightWidth: ZNACZNIK.szerokosc,
    borderTopWidth: ZNACZNIK.wysokosc,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: odstep.xs,
  },
  znacznikMiejsce: { height: ZNACZNIK.wysokosc + odstep.xs },
  // przy dużym tekście albo małym udziale podpisy z minWidth zawijają się do następnego wiersza zamiast nachodzić
  podpisy: { flexDirection: 'row', flexWrap: 'wrap' },
  podpis: { gap: 2, paddingTop: odstep.s, paddingHorizontal: 2 },
  podpisTekst: { textAlign: 'center' },
});
