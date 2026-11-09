import { dniZOdpowiedzia, seriaDni, statystykiRodzin, type PortBazy } from '@szkola/postep';
import { router } from 'expo-router';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getContentHash, getFamilyLabels } from '@/data/content/repo';
import { useOdczytPostepu } from '@/data/postep';
import { zegarTelefonu } from '@/platform/zegar';
import { AdvancementCard } from '@/features/advancement/AdvancementCard';
import { odstep, styl, useTokens } from '@/theme/tokens';

// Statystyki z odpowiedzi w postep.db (część 5); seria dni z dni lokalnych aktywności (D-251).
async function czytajPostep(port: PortBazy) {
  const [st, dni] = await Promise.all([statystykiRodzin(port), dniZOdpowiedzia(port)]);
  if (!st.ok) return st;
  if (!dni.ok) return dni;
  const dzis = zegarTelefonu.dzienLokalny(Date.now(), zegarTelefonu.strefa());
  return { ok: true as const, wartosc: { stats: st.wartosc.map((x) => ({ family: x.rodzinaId, total: x.wszystkie, correct: x.zaliczone })), streak: seriaDni(dni.wartosc, dzis) } };
}

/** Postęp (FR-09); ustawienia przeniesione do ekranu „Ustawienia” (ikona na „Dziś”, 08 cz. 5b krok 5); zostają słowniczek i Pomoc (flow 04). */
export default function ProgressScreen() {
  const db = useBazaTresci();
  const tk = useTokens();
  const { t } = useTranslation();
  const labels = useMemo(() => getFamilyLabels(db), [db]);
  const hash = useMemo(() => getContentHash(db), [db]);
  const odczyt = useOdczytPostepu(czytajPostep, 'postep');
  const data = odczyt.stan === 'ok' ? odczyt.wartosc : { stats: [], streak: 0 };
  const refresh = odczyt.odswiez;

  const total = data.stats.reduce((s, x) => s + x.total, 0);
  const correct = data.stats.reduce((s, x) => s + x.correct, 0);
  const weakest = data.stats
    .filter((s) => s.total >= 2)
    .map((s) => ({ ...s, acc: s.correct / s.total }))
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 5);

  return (
    <Screen>
      <Title>{t('progress.title')}</Title>
      <AdvancementCard />
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={refresh} /> : null}
      {odczyt.stan !== 'ok' ? null : total === 0 ? (
        <Muted>{t('progress.noData')}</Muted>
      ) : (
        <Surface style={{ gap: odstep.s }}>
          <Text style={[styl.naglowek, { color: tk.ink }]}>{`${t('progress.accuracy')}: ${Math.round((correct / total) * 100)}%`}</Text>
          <ProgressBar value={correct / total} />
          <Muted>{t('progress.answers', { count: total })}</Muted>
          <Muted>{t('progress.streak', { count: data.streak })}</Muted>
        </Surface>
      )}

      {weakest.length > 0 ? (
        <View style={{ gap: odstep.m }}>
          <H2>{t('progress.weakest')}</H2>
          {weakest.map((w) => (
            <View key={w.family} style={{ gap: odstep.xs }}>
              <View style={styles.row}>
                <Text style={[styl.tresc, { color: tk.ink, flex: 1 }]}>{labels.get(w.family) ?? w.family}</Text>
                <Muted>{`${w.correct}/${w.total}`}</Muted>
              </View>
              <Muted>{w.family}</Muted>
              <ProgressBar value={w.acc} height={4} />
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ gap: odstep.m }}>
        <H2>{t('progress.more')}</H2>
        <Pressable accessibilityRole="link" onPress={() => router.push('/glossary')}>
          <Text style={[styl.tresc, { color: tk.link }]}>{t('glossary.link')}</Text>
        </Pressable>
        <Pressable accessibilityRole="link" onPress={() => router.push('/help')}>
          <Text style={[styl.tresc, { color: tk.link }]}>{t('help.link')}</Text>
        </Pressable>
        {/* diagnostyka tylko w buildzie deweloperskim (ADR 0011) */}
        {__DEV__ ? (
          <Pressable accessibilityRole="link" onPress={() => __DEV__ && router.push('/diagnostics')}>
            <Text style={[styl.tresc, { color: tk.link }]}>{t('diagnostics.link')}</Text>
          </Pressable>
        ) : null}
        <Muted>{t('progress.contentVersion', { hash })}</Muted>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: odstep.m },
});
