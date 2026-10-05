import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CardRow } from '@/components/PlayingCard';
import { RuleCard } from '@/components/RuleCard';
import { Button, H2, Muted, Screen, Surface, Title } from '@/components/ui';
import { getModules, getRuleLessons, getRules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { gameCardsFromSession, gameFindingsForSession, gameHandsForSession, gameSession } from '@/data/user/game';
import { fmtBb } from '@/features/play/format';
import { buildReport, type ReportItem } from '@/features/play/report';
import { usePlaySetup } from '@/state/play';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

const FIX = new Set(['mistake', 'inaccuracy', 'timeout']);
const RATED_OK = new Set(['compliant', 'compliant-exploit', 'acceptable']);

/** Raport po sesji (dokument 14, 4.4.4): ocenione decyzje, błędy z regułą i źródłem, moduły, wynik z dopiskiem o wariancji. */
export default function PlayReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const setPlay = usePlaySetup((s) => s.set);
  const sessionId = Number(id);
  const session = useMemo(() => gameSession(userDb, sessionId), [sessionId]);
  const items = useMemo(() => buildReport(t, gameFindingsForSession(userDb, sessionId), gameHandsForSession(userDb, sessionId)), [t, sessionId]);
  const rules = useMemo(() => new Map(getRules(db).map((r) => [r.id, r])), [db]);
  const ruleLessons = useMemo(() => getRuleLessons(db), [db]);
  const modules = useMemo(() => getModules(db), [db]);
  const cards = useMemo(() => gameCardsFromSession(userDb, sessionId), [sessionId]);
  const [showGood, setShowGood] = useState(false);
  if (!session) return <Screen><Muted>—</Muted></Screen>;

  const all = items.length;
  const rated = items.filter((i) => i.finding.verdict !== 'unrated').length;
  const count = (v: string) => items.filter((i) => i.finding.verdict === v).length;
  const toFix = items.filter((i) => FIX.has(i.finding.verdict));
  const good = items.filter((i) => RATED_OK.has(i.finding.verdict));
  const byModule = modules
    .map((m) => {
      const r = items.filter((i) => i.finding.module === m.id && (FIX.has(i.finding.verdict) || RATED_OK.has(i.finding.verdict)) && i.finding.verdict !== 'timeout');
      return { m, rated: r.length, ok: r.filter((i) => RATED_OK.has(i.finding.verdict)).length };
    })
    .filter((x) => x.rated > 0);
  const worst = [...byModule].sort((a, b) => b.rated - b.ok - (a.rated - a.ok))[0];

  return (
    <Screen padTop={false}>
      <Title>{t('play.report.title')}</Title>
      <Surface style={{ gap: space.s }}>
        <Text style={[tp.h3, { color: tk.ink }]}>{t('play.report.rated', { rated, all })}</Text>
        <View style={styles.counts}>
          {(['compliant', 'acceptable', 'inaccuracy', 'mistake', 'timeout', 'unrated'] as const).map((v) => (
            <View key={v} style={[styles.count, { borderColor: tk.line }]}>
              <Text style={[tp.h3, { color: v === 'mistake' ? tk.bad : v === 'inaccuracy' || v === 'timeout' ? tk.warn : tk.ink }]}>{count(v)}</Text>
              <Text style={[tp.caption, { color: tk.muted }]}>{t(`play.report.verdicts.${v}`)}</Text>
            </View>
          ))}
        </View>
        <Muted>{t('play.report.ratedHint')}</Muted>
        {cards ? <Muted>{t('play.report.cards', { n: cards })}</Muted> : null}
      </Surface>

      <H2>{t('play.report.toFix')}</H2>
      {toFix.length ? toFix.map((i) => <ItemView key={i.finding.id} item={i} rule={i.finding.ruleId ? rules.get(i.finding.ruleId) : undefined} lessonId={i.finding.ruleId ? ruleLessons.get(i.finding.ruleId) : undefined} />) : <Muted>{t('play.report.none')}</Muted>}

      <View style={styles.head}>
        <H2>{t('play.report.good')}</H2>
        <Pressable accessibilityRole="button" onPress={() => setShowGood((x) => !x)} hitSlop={10}>
          <Text style={[tp.body, { color: tk.felt, fontWeight: '700' }]}>{showGood ? t('play.report.hide') : t('play.report.show', { n: good.length })}</Text>
        </Pressable>
      </View>
      {showGood ? good.map((i) => <ItemView key={i.finding.id} item={i} rule={i.finding.ruleId ? rules.get(i.finding.ruleId) : undefined} lessonId={undefined} compact />) : null}

      {byModule.length ? (
        <View style={{ gap: space.s }}>
          <H2>{t('play.report.byModule')}</H2>
          {byModule.map(({ m, rated: r, ok }) => (
            <View key={m.id} style={styles.moduleRow}>
              <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{m.title}</Text>
              <Muted>{t('play.report.moduleLine', { ok, rated: r })}</Muted>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ gap: space.xs, marginTop: space.l }}>
        <Text style={[tp.small, { color: tk.muted }]}>{t('play.report.result', { bb: fmtBb(session.resultBb ?? 0) })}</Text>
        <Text style={[tp.caption, { color: tk.muted }]}>{t('play.report.variance')}</Text>
      </View>

      {worst && worst.rated > worst.ok ? (
        <Button
          variant="ghost"
          label={t('play.report.again', { area: worst.m.title })}
          onPress={() => {
            setPlay({ areaModule: worst.m.id });
            router.replace('/play');
          }}
        />
      ) : null}
      <Button label={t('play.report.done')} onPress={() => router.back()} />
    </Screen>
  );
}

function ItemView({ item, rule, lessonId, compact }: { item: ReportItem; rule?: Parameters<typeof RuleCard>[0]['rule']; lessonId?: string; compact?: boolean }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const v = item.finding.verdict;
  const color = v === 'mistake' ? tk.bad : v === 'inaccuracy' || v === 'timeout' ? tk.warn : tk.good;
  return (
    <View style={[styles.item, { borderColor: tk.line, backgroundColor: tk.surface }]}>
      <View style={styles.head}>
        <Text style={[tp.body, { color, fontWeight: '700' }]}>{t(`play.report.verdicts.${v}`)}</Text>
        <Muted>{`${item.finding.position} · ${t(`play.streets.${item.finding.street}`)}`}</Muted>
      </View>
      <View style={styles.cardsRow}>
        <CardRow cards={item.hole} size="md" />
        {item.board.length ? <CardRow cards={item.board} size="sm" /> : null}
      </View>
      <Text style={[tp.body, { color: tk.ink }]}>{t('play.report.yourAction', { action: item.action })}</Text>
      {item.detail ? <Text style={[tp.small, { color: tk.ink }]}>{item.detail}</Text> : null}
      {!compact && t(`play.report.verdictHints.${v}`, { defaultValue: '' }) ? <Muted>{t(`play.report.verdictHints.${v}`)}</Muted> : null}
      {!compact && rule ? <RuleCard rule={rule} showSource /> : null}
      {!compact && lessonId ? <Button variant="ghost" label={t('play.report.lesson')} onPress={() => router.push({ pathname: '/lesson/[id]', params: { id: lessonId } })} /> : null}
      <Pressable accessibilityRole="button" onPress={() => setOpen((x) => !x)} hitSlop={8}>
        <Text style={[tp.small, { color: tk.felt, fontWeight: '700' }]}>{t('play.report.replay')}</Text>
      </Pressable>
      {open
        ? item.log.map((s, i) => (
            <View key={i} style={{ gap: 1 }}>
              <Text style={[tp.caption, { color: tk.muted, fontWeight: '700' }]}>{t(`play.streets.${s.street}`)}</Text>
              {s.lines.map((l, j) => (
                <Text key={j} style={[tp.small, { color: tk.ink }]}>
                  {l}
                </Text>
              ))}
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  counts: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s },
  count: { minWidth: 92, padding: space.s, borderRadius: radius.s, borderWidth: 1, alignItems: 'center' },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  item: { padding: space.m, borderRadius: radius.m, borderWidth: 1, gap: space.s },
  cardsRow: { flexDirection: 'row', alignItems: 'center', gap: space.l, flexWrap: 'wrap' },
  moduleRow: { flexDirection: 'row', alignItems: 'baseline', gap: space.m },
});
