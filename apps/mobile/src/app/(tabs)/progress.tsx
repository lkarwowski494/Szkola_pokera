import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Button, H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getContentHash, getFamilyLabels } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { familyStats, resetProgress, streakDays } from '@/data/user/repo';
import { useSettings } from '@/state/settings';
import { space, type as tp, useTokens } from '@/theme/tokens';

/** Postęp (FR-09) i ustawienia (FR-17). */
export default function ProgressScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const labels = useMemo(() => getFamilyLabels(db), [db]);
  const hash = useMemo(() => getContentHash(db), [db]);
  const settings = useSettings();
  const [data, setData] = useState(() => ({ stats: familyStats(userDb), streak: streakDays(userDb) }));
  const [confirmReset, setConfirmReset] = useState(false);
  const refresh = useCallback(() => setData({ stats: familyStats(userDb), streak: streakDays(userDb) }), []);
  useFocusEffect(refresh);

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
      {total === 0 ? (
        <Muted>{t('progress.noData')}</Muted>
      ) : (
        <Surface style={{ gap: space.s }}>
          <Text style={[tp.h2, { color: tk.ink }]}>{`${t('progress.accuracy')}: ${Math.round((correct / total) * 100)}%`}</Text>
          <ProgressBar value={correct / total} />
          <Muted>{t('progress.answers', { count: total })}</Muted>
          <Muted>{t('progress.streak', { count: data.streak })}</Muted>
        </Surface>
      )}

      {weakest.length > 0 ? (
        <View style={{ gap: space.m }}>
          <H2>{t('progress.weakest')}</H2>
          {weakest.map((w) => (
            <View key={w.family} style={{ gap: space.xs }}>
              <View style={styles.row}>
                <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{labels.get(w.family) ?? w.family}</Text>
                <Muted>{`${w.correct}/${w.total}`}</Muted>
              </View>
              <Muted>{w.family}</Muted>
              <ProgressBar value={w.acc} height={4} />
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ gap: space.m }}>
        <H2>{t('progress.settings')}</H2>
        <View style={styles.row}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[tp.body, { color: tk.ink }]}>{t('progress.fourColor')}</Text>
            <Muted>{t('progress.fourColorHint')}</Muted>
          </View>
          <Switch value={settings.fourColor} onValueChange={settings.setFourColor} trackColor={{ true: tk.felt }} accessibilityLabel={t('progress.fourColor')} />
        </View>
        <View style={styles.row}>
          <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{t('progress.haptics')}</Text>
          <Switch value={settings.haptics} onValueChange={settings.setHaptics} trackColor={{ true: tk.felt }} accessibilityLabel={t('progress.haptics')} />
        </View>
        {confirmReset ? (
          <Surface style={{ gap: space.m }}>
            <Text style={[tp.body, { color: tk.ink }]}>{t('progress.resetConfirm')}</Text>
            <View style={styles.row}>
              <Button label={t('progress.cancel')} variant="ghost" onPress={() => setConfirmReset(false)} style={{ flex: 1 }} />
              <Button
                label={t('progress.resetYes')}
                onPress={() => {
                  resetProgress(userDb);
                  setConfirmReset(false);
                  refresh();
                }}
                style={{ flex: 1, marginLeft: space.m }}
              />
            </View>
          </Surface>
        ) : (
          <Pressable accessibilityRole="button" onPress={() => setConfirmReset(true)}>
            <Text style={[tp.body, { color: tk.bad }]}>{t('progress.reset')}</Text>
          </Pressable>
        )}
        <Muted>{t('progress.contentVersion', { hash })}</Muted>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.m },
});
