import { BOT_POLICY, PLAY_TABLE_SIZES, presetStyles, STYLE_IDS, type StyleId, type TablePresetId } from '@szkola/poker-core';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Choice } from '@/components/Choice';
import { Button, H2, Muted, Screen, Title } from '@/components/ui';
import { getLessonSummaries, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { gameSessionsList, gameVerdictCounts } from '@/data/user/game';
import { lessonProgressMap } from '@/data/user/repo';
import { areaStatuses } from '@/features/play/areas';
import { usePlayKit } from '@/features/play/usePlayKit';
import { usePlaySetup } from '@/state/play';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

const PRESETS = Object.keys(BOT_POLICY.tables) as TablePresetId[];

/** Ekran „Graj” (dokument 14, 4.1 i 4.2): tryb, długość sesji, rywale, limit czasu i ostatnie raporty. */
export default function PlaySetupScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const kit = usePlayKit();
  const setup = usePlaySetup();
  const modules = useMemo(() => getModules(db), [db]);
  const lessons = useMemo(() => getLessonSummaries(db), [db]);
  const [progress, setProgress] = useState(() => lessonProgressMap(userDb));
  const [recent, setRecent] = useState(() => gameSessionsList(userDb, 10));
  const [advanced, setAdvanced] = useState(setup.tablePreset === 'custom');
  useFocusEffect(
    useCallback(() => {
      setProgress(lessonProgressMap(userDb));
      setRecent(gameSessionsList(userDb, 10));
    }, []),
  );
  const statuses = areaStatuses(kit.areas, lessons, (id) => progress.get(id)?.done ?? false);
  const moduleTitle = (id: string) => modules.find((m) => m.id === id)?.title ?? id;
  const styleName = (s: StyleId) => t(`play.styles.${s}`);

  const choosePreset = (p: TablePresetId) => setup.set({ tablePreset: p, seatStyles: presetStyles(p, 9) });
  // obszary treningowe rozdają sytuacje ze spotów 6-max, więc grają przy stole 6-osobowym
  const players = setup.areaModule ? 6 : setup.players;
  const setSeat = (i: number, s: StyleId) => {
    const seatStyles = setup.seatStyles.slice();
    seatStyles[i] = s;
    setup.set({ seatStyles, tablePreset: 'custom' });
  };

  return (
    <Screen padTop={false}>
      <Title>{t('play.title')}</Title>
      <Muted>{t('play.format')}</Muted>

      <H2>{t('play.mode')}</H2>
      <AreaRow title={t('play.free')} sub={t('play.freeHint')} selected={setup.areaModule === null} onPress={() => setup.set({ areaModule: null })} />
      <Muted>{t('play.areasHint')}</Muted>
      {statuses.map((s) => (
        <AreaRow
          key={s.area.module}
          title={moduleTitle(s.area.module)}
          sub={s.unlocked ? undefined : t('play.locked', { done: s.lessonsDone, total: s.lessonsTotal })}
          selected={setup.areaModule === s.area.module}
          disabled={!s.unlocked}
          onPress={() => setup.set({ areaModule: s.area.module })}
        />
      ))}

      <H2>{t('play.tableSize')}</H2>
      {setup.areaModule ? (
        <Muted>{t('play.tableSizeAreas')}</Muted>
      ) : (
        <>
          <Choice
            label={t('play.tableSize')}
            value={setup.players}
            onChange={(n) => setup.set({ players: n })}
            options={PLAY_TABLE_SIZES.map((n) => ({ value: n, label: t('play.tableSizeOpt', { n }) }))}
          />
          {setup.players === 9 ? <Muted>{t('play.tableSizeHint9')}</Muted> : null}
        </>
      )}

      <H2>{t('play.hands')}</H2>
      <Choice label={t('play.hands')} value={setup.hands} onChange={(hands) => setup.set({ hands })} options={[10, 20, 50].map((n) => ({ value: n as 10 | 20 | 50, label: String(n) }))} />

      <H2>{t('play.opponents')}</H2>
      <Choice
        label={t('play.opponents')}
        value={setup.tablePreset === 'custom' ? null : setup.tablePreset}
        onChange={(p) => p && choosePreset(p)}
        options={PRESETS.map((p) => ({ value: p, label: t(`play.tables.${p}`), hint: t(`play.tablesHint.${p}`) }))}
      />
      <Muted>{t(`play.tablesHint.${setup.tablePreset}`)}</Muted>
      <View style={styles.switchRow}>
        <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{t('play.advanced')}</Text>
        <Switch value={advanced} onValueChange={setAdvanced} trackColor={{ true: tk.felt }} accessibilityLabel={t('play.advanced')} />
      </View>
      {advanced
        ? setup.seatStyles.slice(0, players - 1).map((s, i) => (
            <View key={i} style={{ gap: space.xs }}>
              <Text style={[tp.small, { color: tk.muted }]}>{t('play.seat', { n: i + 1 })}</Text>
              <Choice label={t('play.seat', { n: i + 1 })} value={s} onChange={(v) => setSeat(i, v)} options={STYLE_IDS.map((id) => ({ value: id, label: styleName(id), hint: t(`play.styleHints.${id}`) }))} />
            </View>
          ))
        : null}

      <H2>{t('play.timer')}</H2>
      <Choice
        label={t('play.timer')}
        value={setup.timeLimitS}
        onChange={(timeLimitS) => setup.set({ timeLimitS })}
        options={[
          { value: null, label: t('play.timerOff') },
          { value: 30 as const, label: t('play.timerS', { s: 30 }) },
          { value: 15 as const, label: t('play.timerS', { s: 15 }) },
        ]}
      />
      {setup.timeLimitS ? <Muted>{t('play.timerHint')}</Muted> : null}

      <Button label={t('play.start')} onPress={() => router.push('/play/table')} />

      {recent.length ? (
        <View style={{ gap: space.s }}>
          <H2>{t('play.recent')}</H2>
          {recent.map((r) => {
            const c = gameVerdictCounts(userDb, r.id);
            return (
              <Pressable
                key={r.id}
                accessibilityRole="button"
                onPress={() => router.push({ pathname: '/play/report/[id]', params: { id: String(r.id) } })}
                style={({ pressed }) => [styles.recent, { borderColor: tk.line, backgroundColor: tk.surface, opacity: pressed ? 0.85 : 1 }]}
              >
                <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>{r.areaModule ? moduleTitle(r.areaModule) : t('play.free')}</Text>
                <Muted>{t('play.recentItem', { date: new Date(r.startedAt).toLocaleDateString('pl-PL'), hands: r.handsPlayed, rated: c.rated, all: c.all })}</Muted>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </Screen>
  );
}

function AreaRow({ title, sub, selected, disabled, onPress }: { title: string; sub?: string; selected: boolean; disabled?: boolean; onPress: () => void }) {
  const tk = useTokens();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.area, { borderColor: selected ? tk.felt : tk.line, backgroundColor: selected ? tk.feltSoft : tk.surface, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }]}
    >
      <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>{title}</Text>
      {sub ? <Muted>{sub}</Muted> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  area: { padding: space.l, borderRadius: radius.m, borderWidth: 1.5, gap: 2 },
  recent: { padding: space.m, borderRadius: radius.m, borderWidth: 1, gap: 2 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: space.m },
});

