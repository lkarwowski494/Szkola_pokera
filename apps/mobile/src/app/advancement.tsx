import { ADVANCEMENT } from '@szkola/srs';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getModules } from '@/data/content/repo';
import { gameSummary } from '@/features/advancement/AdvancementCard';
import { useAdvancement } from '@/features/advancement/useAdvancement';
import { userDb } from '@/data/user/db';
import { advancementHistoryFor } from '@/data/user/game';
import { space, type as tp, useTokens } from '@/theme/tokens';

/** Rozbicie wskaźnika zaawansowania na obszary (moduły kursu) i części: wiedza teraz, gra po trybie gry (ADR-25). */
export default function AdvancementScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const r = useAdvancement();
  const titles = useMemo(() => new Map(getModules(db).map((m) => [m.id, m.title])), [db]);
  const k = r.knowledge;
  const history = useMemo(() => advancementHistoryFor(userDb, 'all').slice(-HISTORY_DAYS), []);

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
        <Surface style={{ flex: 1, gap: space.xs }}>
          <Muted>{t('advancement.game')}</Muted>
          <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{gameSummary(t, r)}</Text>
        </Surface>
      </View>
      <Muted>{t('advancement.explain', { days: ADVANCEMENT.horizonDays })}</Muted>
      <Muted>{r.game.status === 'active' ? t('advancement.gameExplain', { window: ADVANCEMENT.gameWindow, min: ADVANCEMENT.gameMin }) : t('advancement.gamePendingLong')}</Muted>

      <H2>{t('advancement.history')}</H2>
      <HistoryBars rows={history} />

      <H2>{t('advancement.areas')}</H2>
      {k.areas.map((a, i) => {
        const c = r.combined[i]!;
        const g = r.game.status === 'active' ? r.game.areas[i] : undefined;
        const gameText = !g
          ? t('advancement.gamePending')
          : g.status === 'no-game'
            ? t('advancement.gameNone')
            : g.status === 'too-little'
              ? t('advancement.gameTooLittle', { n: g.decisions, min: ADVANCEMENT.gameMin })
              : g.status === 'provisional'
                ? t('advancement.gameProvisional', { score: g.score })
                : String(g.score);
        return (
          <View key={a.id} style={{ gap: space.xs }} accessible accessibilityLabel={`${titles.get(a.id) ?? a.id}: ${c.score ?? t('advancement.noLessons')}`}>
            <View style={styles.row}>
              <Text style={[tp.body, { color: c.score === null ? tk.muted : tk.ink, flex: 1, fontWeight: '600' }]}>{titles.get(a.id) ?? a.id}</Text>
              <Text style={[tp.body, { color: c.score === null ? tk.muted : tk.ink, fontWeight: '700', fontVariant: ['tabular-nums'] }]}>
                {c.score ?? t('advancement.noLessons')}
              </Text>
            </View>
            {c.score !== null ? (
              <>
                <ProgressBar value={c.score / ADVANCEMENT.scale} height={4} />
                <Muted>{t('advancement.areaLine', { k: a.score ?? '–', g: gameText })}</Muted>
                <Muted>{t('advancement.practiced', { done: a.practiced, total: a.skills })}</Muted>
              </>
            ) : null}
            {!a.counted ? <Muted>{t('advancement.optional')}</Muted> : null}
          </View>
        );
      })}
    </Screen>
  );
}

/** Ile ostatnich zapisanych dni pokazuje wykres historii. */
const HISTORY_DAYS = 30;
const BAR_HEIGHT = 64;

/** Historia wyniku ogólnego: jeden słupek na zapisany dzień (dni bez otwarcia aplikacji nie mają punktu, 4.8). */
function HistoryBars({ rows }: { rows: { day: string; combined: number | null }[] }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const pts = rows.filter((r) => r.combined !== null);
  if (pts.length < 2) return <Muted>{t('advancement.historyEmpty')}</Muted>;
  const last = pts[pts.length - 1]!;
  return (
    <View style={{ gap: space.xs }} accessible accessibilityLabel={pts.map((p) => `${p.day}: ${p.combined}`).join(', ')}>
      <View style={[styles.bars, { borderBottomColor: tk.line }]}>
        {pts.map((p) => (
          <View key={p.day} style={{ flex: 1, height: Math.max(2, (BAR_HEIGHT * p.combined!) / ADVANCEMENT.scale), backgroundColor: tk.felt, borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
        ))}
      </View>
      <Muted>{t('advancement.historyHint', { last: `${last.day}: ${last.combined}` })}</Muted>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: { height: BAR_HEIGHT, flexDirection: 'row', alignItems: 'flex-end', gap: 2, borderBottomWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.m },
  parts: { flexDirection: 'row', gap: space.m },
  big: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
