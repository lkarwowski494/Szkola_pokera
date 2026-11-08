import { ADVANCEMENT } from '@szkola/srs';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getModules } from '@/data/content/repo';
import { useAdvancement } from '@/features/advancement/useAdvancement';
import { BladOdczytu } from '@/components/BladOdczytu';
import { useOdczytPostepu } from '@/data/postep';
import { czytajHistorie } from '@/features/advancement/historia';
import { odstep, styl, useTokens } from '@/theme/tokens';

/** Rozbicie wskaźnika zaawansowania na obszary (moduły kursu); tylko wiedza — część „gra” usunięta z trybem gry (ADR 0011). */
export default function AdvancementScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const r = useAdvancement();
  const titles = useMemo(() => new Map(getModules(db).map((m) => [m.id, m.title])), [db]);
  const k = r.knowledge;
  const odczyt = useOdczytPostepu(czytajHistorie, 'wskaznik');
  const history = odczyt.stan === 'ok' ? odczyt.wartosc.slice(-HISTORY_DAYS).map((p) => ({ day: p.dzien, combined: p.wynik })) : [];

  return (
    <Screen padTop={false}>
      <Title>{t('advancement.title')}</Title>
      <View style={styles.row}>
        <Text style={[styles.big, { color: tk.ink }]} accessibilityLabel={`${r.overall ?? '–'} ${t('advancement.outOf')}`}>
          {r.overall ?? '–'}
        </Text>
        <Muted style={{ flex: 1 }}>{t('advancement.outOfLong')}</Muted>
      </View>
      <ProgressBar value={(r.overall ?? 0) / ADVANCEMENT.scale} height={8} />

      <Surface style={{ gap: odstep.xs }}>
        <Muted>{t('advancement.knowledge')}</Muted>
        <Text style={[styl.naglowek, { color: tk.ink }]}>{k.score ?? '–'}</Text>
        <Muted>{t('advancement.practiced', { done: k.practiced, total: k.skills })}</Muted>
      </Surface>
      <Muted>{t('advancement.explain', { days: ADVANCEMENT.horizonDays })}</Muted>

      <H2>{t('advancement.history')}</H2>
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={odczyt.odswiez} /> : <HistoryBars rows={history} />}

      <H2>{t('advancement.areas')}</H2>
      {k.areas.map((a, i) => {
        const c = r.combined[i]!;
        return (
          <View key={a.id} style={{ gap: odstep.xs }} accessible accessibilityLabel={`${titles.get(a.id) ?? a.id}: ${c.score ?? t('advancement.noLessons')}`}>
            <View style={styles.row}>
              <Text style={[styl.tresc, { color: c.score === null ? tk.muted : tk.ink, flex: 1, fontWeight: '600' }]}>{titles.get(a.id) ?? a.id}</Text>
              <Text style={[styl.tresc, { color: c.score === null ? tk.muted : tk.ink, fontWeight: '700', fontVariant: ['tabular-nums'] }]}>
                {c.score ?? t('advancement.noLessons')}
              </Text>
            </View>
            {c.score !== null ? (
              <>
                <ProgressBar value={c.score / ADVANCEMENT.scale} height={4} />
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
    <View style={{ gap: odstep.xs }} accessible accessibilityLabel={pts.map((p) => `${p.day}: ${p.combined}`).join(', ')}>
      <View style={[styles.bars, { borderBottomColor: tk.separator }]}>
        {pts.map((p) => (
          <View key={p.day} style={{ flex: 1, height: Math.max(2, (BAR_HEIGHT * p.combined!) / ADVANCEMENT.scale), backgroundColor: tk.primaryBg, borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
        ))}
      </View>
      <Muted>{t('advancement.historyHint', { last: `${last.day}: ${last.combined}` })}</Muted>
    </View>
  );
}

const styles = StyleSheet.create({
  bars: { height: BAR_HEIGHT, flexDirection: 'row', alignItems: 'flex-end', gap: 2, borderBottomWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: odstep.m },
  big: { fontSize: 56, lineHeight: 64, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
