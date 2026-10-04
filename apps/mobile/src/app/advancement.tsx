import { ADVANCEMENT } from '@szkola/srs';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getModules } from '@/data/content/repo';
import { useAdvancement } from '@/features/advancement/useAdvancement';
import { space, type as tp, useTokens } from '@/theme/tokens';

/** Rozbicie wskaźnika zaawansowania na obszary (moduły kursu) i części: wiedza teraz, gra po trybie gry (ADR-25). */
export default function AdvancementScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const r = useAdvancement();
  const titles = useMemo(() => new Map(getModules(db).map((m) => [m.id, m.title])), [db]);
  const k = r.knowledge;

  return (
    <Screen padTop={false}>
      <Title>{t('advancement.title')}</Title>
      <View style={styles.row}>
        <Text style={[styles.big, { color: tk.felt }]} accessibilityLabel={`${r.overall ?? '–'} ${t('advancement.outOf')}`}>
          {r.overall ?? '–'}
        </Text>
        <Muted style={{ flex: 1 }}>{t('advancement.outOfLong')}</Muted>
      </View>
      <ProgressBar value={(r.overall ?? 0) / ADVANCEMENT.scale} height={8} />

      <View style={styles.parts}>
        <Surface style={{ flex: 1, gap: space.xs }}>
          <Muted>{t('advancement.knowledge')}</Muted>
          <Text style={[tp.h2, { color: tk.ink }]}>{k.score ?? '–'}</Text>
          <Muted>{t('advancement.practiced', { done: k.practiced, total: k.skills })}</Muted>
        </Surface>
        <Surface style={{ flex: 1, gap: space.xs, borderStyle: 'dashed' }}>
          <Muted>{t('advancement.game')}</Muted>
          <Text style={[tp.body, { color: tk.muted, fontWeight: '700' }]}>{t('advancement.gamePending')}</Text>
        </Surface>
      </View>
      <Muted>{t('advancement.explain', { days: ADVANCEMENT.horizonDays })}</Muted>
      <Muted>{t('advancement.gamePendingLong')}</Muted>

      <H2>{t('advancement.areas')}</H2>
      {k.areas.map((a) => (
        <View key={a.id} style={{ gap: space.xs }} accessible accessibilityLabel={`${titles.get(a.id) ?? a.id}: ${a.score ?? t('advancement.noLessons')}`}>
          <View style={styles.row}>
            <Text style={[tp.body, { color: a.score === null ? tk.muted : tk.ink, flex: 1, fontWeight: '600' }]}>{titles.get(a.id) ?? a.id}</Text>
            <Text style={[tp.body, { color: a.score === null ? tk.muted : tk.ink, fontWeight: '700', fontVariant: ['tabular-nums'] }]}>
              {a.score ?? t('advancement.noLessons')}
            </Text>
          </View>
          {a.score !== null ? (
            <>
              <ProgressBar value={a.score / ADVANCEMENT.scale} height={4} />
              <Muted>{t('advancement.practiced', { done: a.practiced, total: a.skills })}</Muted>
            </>
          ) : null}
          {!a.counted ? <Muted>{t('advancement.optional')}</Muted> : null}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.m },
  parts: { flexDirection: 'row', gap: space.m },
  big: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
