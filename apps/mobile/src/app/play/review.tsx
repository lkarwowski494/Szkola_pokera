import { actionMenu, createRng, gradeDecision, permuteSituation, replaySituation, type Finding, type PlayerAction } from '@szkola/poker-core';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CardRow } from '@/components/PlayingCard';
import { RuleCard } from '@/components/RuleCard';
import { Button, Muted, Screen, Title } from '@/components/ui';
import { getRules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { dueGameCards, introduceGameCards, recordGameReview } from '@/data/user/game';
import { codes, fmtBb, menuLabel } from '@/features/play/format';
import { handLog } from '@/features/play/log';
import { detailText } from '@/features/play/report';
import { playFormat } from '@/features/play/kit';
import { usePlayKit } from '@/features/play/usePlayKit';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Najwyżej tyle sytuacji w jednej powtórce (jak 8 rodzin × 2 zadania w powtórkach zadań). */
const MAX_ITEMS = 16;

/**
 * Powtórka sytuacji z gry (dokument 14, 4.4.5): ta sama sytuacja z kolorami zamienionymi jedną permutacją (5.6),
 * gracz decyduje jeszcze raz, ocena tym samym silnikiem co w grze, FSRS jak w zadaniach.
 */
export default function GameReviewScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const kit = usePlayKit();
  const rules = useMemo(() => new Map(getRules(db).map((r) => [r.id, r])), [db]);
  const items = useMemo(() => {
    introduceGameCards(userDb);
    const rng = createRng(Date.now() & 0x7fffffff);
    return dueGameCards(userDb, Date.now(), MAX_ITEMS).map((c) => ({ cardId: c.card.familyId, state: replaySituation(permuteSituation(c.situation, rng)) }));
  }, []);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<{ finding: Finding; action: PlayerAction } | null>(null);
  const shownAt = useRef(Date.now());

  if (!items.length) {
    return (
      <Screen>
        <Title>{t('play.review.title')}</Title>
        <Muted>{t('play.review.empty')}</Muted>
        <Button label={t('play.review.finish')} onPress={() => router.back()} />
      </Screen>
    );
  }
  const item = items[idx]!;
  const st = item.state;
  const me = st.seats[st.toAct!]!;
  const bb = st.config.bigBlind;
  const pot = st.seats.reduce((s, x) => s + x.committed, 0);
  const choose = (action: PlayerAction) => {
    const finding = gradeDecision(st, action, playFormat(kit, st.seats.length).grading);
    recordGameReview(userDb, item.cardId, finding.verdict, Date.now() - shownAt.current);
    setAnswer({ finding, action });
  };
  const next = () => {
    if (idx + 1 >= items.length) router.back();
    else {
      setIdx(idx + 1);
      setAnswer(null);
      shownAt.current = Date.now();
    }
  };
  const v = answer?.finding.verdict;
  const color = v === 'mistake' || v === 'inaccuracy' ? tk.bad : v === 'acceptable' ? tk.warn : tk.good;
  const rule = answer?.finding.ruleId ? rules.get(answer.finding.ruleId) : undefined;

  return (
    <Screen>
      <View style={styles.top}>
        <Muted>{t('play.review.of', { n: idx + 1, total: items.length })}</Muted>
        <Pressable accessibilityRole="button" onPress={() => router.back()} hitSlop={12}>
          <Text style={[tp.body, { color: tk.felt, fontWeight: '700' }]}>{t('play.review.finish')}</Text>
        </Pressable>
      </View>
      <Title>{t('play.review.title')}</Title>
      <Muted>{t('play.review.hint')}</Muted>
      <View style={[styles.felt, { backgroundColor: tk.feltDeep }]}>
        <Text style={[tp.small, { color: tk.onFelt, fontWeight: '700' }]}>{`${me.position} · ${fmtBb(me.stack / bb)}bb · ${t('play.potLabel', { bb: fmtBb(pot / bb) })}`}</Text>
        <CardRow cards={codes(me.hole)} size="lg" />
        {st.board.length ? <CardRow cards={codes(st.board)} size="md" /> : null}
      </View>
      {handLog(t, st, t('play.you')).map((s, i) => (
        <View key={i}>
          <Text style={[tp.caption, { color: tk.muted, fontWeight: '700' }]}>{t(`play.streets.${s.street}`)}</Text>
          {s.lines.map((l, j) => (
            <Text key={j} style={[tp.small, { color: tk.ink }]}>
              {l}
            </Text>
          ))}
        </View>
      ))}
      {!answer ? (
        <View style={styles.actions}>
          {actionMenu(st, playFormat(kit, st.seats.length).knowledge.sizes).map((m, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              onPress={() => choose(m.action)}
              style={({ pressed }) => [styles.action, { borderColor: tk.felt, backgroundColor: m.kind === 'fold' ? tk.surface : tk.felt, opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={[tp.body, { fontWeight: '700', color: m.kind === 'fold' ? tk.felt : tk.onFelt }]}>{menuLabel(t, m)}</Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={{ gap: space.m }}>
          <Text style={[tp.h3, { color }]}>{t(`play.report.verdicts.${answer.finding.verdict}`)}</Text>
          {detailText(t, answer.finding.detail, codes(me.hole).join(' '), bb) ? <Text style={[tp.small, { color: tk.ink }]}>{detailText(t, answer.finding.detail, codes(me.hole).join(' '), bb)}</Text> : null}
          {rule ? <RuleCard rule={rule} showSource /> : null}
          <Button label={idx + 1 >= items.length ? t('play.review.finish') : t('play.review.next')} onPress={next} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  felt: { borderRadius: radius.l, padding: space.l, gap: space.m },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s },
  action: { minHeight: 48, paddingHorizontal: space.m, borderRadius: radius.m, borderWidth: 1.5, justifyContent: 'center', flexGrow: 1 },
});
