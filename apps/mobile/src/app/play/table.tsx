import {
  actionMenu,
  BOT_POLICY_VERSION,
  dealPlayHand,
  finishPlayHand,
  heroAct,
  HERO_SEAT,
  nextActor,
  stepAuto,
  styleOf,
  timeoutAction,
  type AreaGeneratorId,
  type PlayConfig,
  type PlayerAction,
  type PlayHand,
  type SeatState,
} from '@szkola/poker-core';
import * as Haptics from 'expo-haptics';
import { router, Stack } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardRow } from '@/components/PlayingCard';
import { Button, Muted } from '@/components/ui';
import { userDb } from '@/data/user/db';
import { createGameSession, endGameSession, introduceGameCards, saveGameHand } from '@/data/user/game';
import { codes, fmtBb, menuLabel } from '@/features/play/format';
import { eventLine } from '@/features/play/log';
import { playFormat } from '@/features/play/kit';
import { FELT_MIN_HEIGHT, seatLayout, type Box } from '@/features/play/seatLayout';
import { usePlayKit } from '@/features/play/usePlayKit';
import { usePlaySetup } from '@/state/play';
import { useSettings } from '@/state/settings';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Opóźnienie ruchu bota i kroku scenariusza obszaru (ms): rywale „mówią” z krótką przerwą (dokument 14, 4.1). */
const BOT_DELAY_MS = 650;
const SCRIPT_DELAY_MS = 200;
const STACK_BB = 100;
const BIG_BLIND = 100;

export default function PlayTableScreen() {
  const tk = useTokens();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const kit = usePlayKit();
  const setup = usePlaySetup();
  const haptics = useSettings((s) => s.haptics);

  const area = setup.areaModule ? (kit.areas.find((a) => a.module === setup.areaModule)?.generator as AreaGeneratorId | undefined) ?? null : null;
  // obszary treningowe rozdają sytuacje ze spotów 6-max; stół 9-osobowy tylko w grze swobodnej
  const players = area ? 6 : setup.players;
  const seatStyleIds = setup.seatStyles.slice(0, players - 1);
  const fmt = playFormat(kit, players);
  const [felt, setFelt] = useState({ w: 0, h: FELT_MIN_HEIGHT });
  const onFelt = (e: LayoutChangeEvent) => setFelt({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height });
  const layout = useMemo(() => seatLayout(players, felt.w, felt.h), [players, felt]);
  const pc: PlayConfig = useMemo(
    () => ({
      players: players,
      stackBb: STACK_BB,
      bigBlind: BIG_BLIND,
      seatStyles: seatStyleIds.map(styleOf),
      hands: setup.hands,
      seed: Date.now() & 0x7fffffff,
      area,
    }),
    // ustawienia są stałe przez całą sesję
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // sesja powstaje przy pierwszym zapisanym rozdaniu (bez pustych sesji po szybkim wyjściu)
  const sessionRef = useRef<number | null>(null);
  const ensureSession = () =>
    (sessionRef.current ??= createGameSession(userDb, {
      mode: area ? 'area' : 'free',
      areaModule: setup.areaModule,
      handsPlanned: setup.hands,
      tablePreset: setup.tablePreset,
      seatStyles: seatStyleIds,
      players: players,
      stackBb: STACK_BB,
      timeLimitS: setup.timeLimitS,
      botVersion: BOT_POLICY_VERSION,
      contentHash: kit.contentHash,
      seed: pc.seed,
    }));

  const [handNo, setHandNo] = useState(0);
  const [hp, setHp] = useState<PlayHand>(() => dealPlayHand(pc, 0, kit.areaCtx));
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const savedHand = useRef(-1);
  const actor = nextActor(hp);

  // boty i scenariusz obszaru: jeden ruch na raz, z opóźnieniem
  useEffect(() => {
    if (actor !== 'auto') return;
    const scripted = hp.script.length > 0;
    const id = setTimeout(() => setHp((h) => stepAuto(h, fmt.knowledge, pc)), scripted ? SCRIPT_DELAY_MS : BOT_DELAY_MS);
    return () => clearTimeout(id);
  }, [hp, actor, fmt.knowledge, pc]);

  // koniec rozdania: ocena i zapis (raz na rozdanie)
  useEffect(() => {
    if (actor !== 'done' || savedHand.current === hp.handNo) return;
    savedHand.current = hp.handNo;
    const r = finishPlayHand(hp, fmt.grading);
    saveGameHand(
      userDb,
      ensureSession(),
      { handNo: hp.handNo, seed: hp.seed, config: hp.config, preset: hp.preset, actions: hp.state.actions, heroSeat: HERO_SEAT, timeouts: hp.timeouts, resultBb: r.resultBb },
      r.findings,
      r.situations,
      { contentHash: kit.contentHash, stackBb: STACK_BB },
    );
    setLastResult(r.resultBb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actor, hp, kit]);

  // limit czasu na decyzję (5.11): po czasie czekanie, gdy darmowe, inaczej pas
  useEffect(() => {
    if (actor !== 'hero' || !setup.timeLimitS) {
      setSecondsLeft(null);
      return;
    }
    const deadline = Date.now() + setup.timeLimitS * 1000;
    setSecondsLeft(setup.timeLimitS);
    const id = setInterval(() => {
      const left = Math.ceil((deadline - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(id);
        setHp((h) => (nextActor(h) === 'hero' ? heroAct(h, timeoutAction(h.state), true) : h));
      } else setSecondsLeft(left);
    }, 250);
    return () => clearInterval(id);
  }, [actor, hp.state.actions.length, setup.timeLimitS]);

  const act = (a: PlayerAction) => {
    if (haptics) void Haptics.selectionAsync();
    setHp((h) => (nextActor(h) === 'hero' ? heroAct(h, a) : h));
  };

  const finishSession = () => {
    if (sessionRef.current === null) {
      router.back();
      return;
    }
    endGameSession(userDb, sessionRef.current);
    introduceGameCards(userDb);
    router.replace({ pathname: '/play/report/[id]', params: { id: String(sessionRef.current) } });
  };
  const confirmEnd = () =>
    Alert.alert(t('play.end'), t('play.endConfirm'), [
      { text: t('play.cancel'), style: 'cancel' },
      { text: t('play.endYes'), style: 'destructive', onPress: finishSession },
    ]);
  const nextHand = () => {
    const n = handNo + 1;
    setHandNo(n);
    setLastResult(null);
    setHp(dealPlayHand(pc, n, kit.areaCtx));
  };

  const st = hp.state;
  const bb = st.config.bigBlind;
  const pot = st.seats.reduce((s, x) => s + x.committed, 0);
  const shown = new Set(st.result?.shown ?? []);
  const menu = actor === 'hero' ? actionMenu(st, fmt.knowledge.sizes) : [];
  const log = st.events
    .map((e) => eventLine(t, st, e, t('play.you')))
    .filter((x): x is string => !!x)
    .slice(-4);
  const lastHand = handNo + 1 >= pc.hands;

  return (
    <View style={{ flex: 1, backgroundColor: tk.bg, paddingTop: insets.top + space.s, paddingBottom: insets.bottom + space.s, paddingHorizontal: space.m, gap: space.s }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.top}>
        <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{t('play.handOf', { n: handNo + 1, total: pc.hands })}</Text>
        {secondsLeft !== null ? (
          <Text accessibilityLiveRegion="polite" style={[tp.body, { color: secondsLeft <= 5 ? tk.bad : tk.muted, fontWeight: '700' }]}>
            {t('play.secondsLeft', { s: secondsLeft })}
          </Text>
        ) : null}
        <Pressable accessibilityRole="button" onPress={confirmEnd} hitSlop={12}>
          <Text style={[tp.body, { color: tk.felt, fontWeight: '700' }]}>{t('play.end')}</Text>
        </Pressable>
      </View>

      <View onLayout={onFelt} style={[styles.felt, { backgroundColor: tk.feltDeep }]}>
        <View style={[styles.center, { left: Math.max(0, layout.board.x), top: layout.board.y, width: layout.board.w }]}>
          <CardRow cards={codes(st.board)} size={layout.boardSize} />
          <Text style={[tp.small, { color: tk.onFelt, fontWeight: '700' }]}>{t('play.potLabel', { bb: fmtBb(pot / bb) })}</Text>
        </View>
        {/* miejsca dopiero po zmierzeniu sukna (układ zależy od jego szerokości) */}
        {felt.w > 0 ? st.seats.map((s) => (
          <SeatView
            key={s.seat}
            s={s}
            bb={bb}
            box={layout.seats[(s.seat - HERO_SEAT + players) % players]!}
            compact={layout.compact}
            name={s.seat === HERO_SEAT ? t('play.you') : t(`play.styles.${seatStyleIds[s.seat - 1]}`)}
            active={st.toAct === s.seat}
            reveal={s.seat === HERO_SEAT || shown.has(s.seat)}
            foldedLabel={t('play.folded')}
          />
        )) : null}
      </View>

      <View style={{ minHeight: 64 }}>
        {log.map((l, i) => (
          <Text key={i} style={[tp.small, { color: i === log.length - 1 ? tk.ink : tk.muted }]}>
            {l}
          </Text>
        ))}
      </View>

      <View style={styles.hero}>
        <CardRow cards={codes(st.seats[HERO_SEAT]!.hole)} size="lg" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{`${st.seats[HERO_SEAT]!.position} · ${fmtBb(st.seats[HERO_SEAT]!.stack / bb)}bb`}</Text>
          <Muted>{actor === 'hero' ? t('play.yourTurn') : actor === 'auto' ? t('play.waiting') : ''}</Muted>
          {hp.auto.length && actor === 'hero' ? <Muted>{t('play.autoNote')}</Muted> : null}
        </View>
      </View>

      {actor === 'hero' ? (
        <View style={styles.actions}>
          {menu.map((m, i) => (
            <Pressable
              key={i}
              accessibilityRole="button"
              onPress={() => act(m.action)}
              style={({ pressed }) => [
                styles.action,
                { borderColor: tk.felt, backgroundColor: m.kind === 'fold' ? tk.surface : tk.felt, opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={[tp.body, { fontWeight: '700', color: m.kind === 'fold' ? tk.felt : tk.onFelt }]}>{menuLabel(t, m)}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {actor === 'done' ? (
        <View style={{ gap: space.s }}>
          {st.result?.shown.length ? <Muted>{t('play.shown')}</Muted> : null}
          {lastResult !== null ? (
            <Text style={[tp.body, { color: tk.ink, fontWeight: '600' }]}>
              {lastResult > 0 ? t('play.handWon', { bb: fmtBb(lastResult) }) : lastResult < 0 ? t('play.handLost', { bb: fmtBb(-lastResult) }) : t('play.handEven')}
            </Text>
          ) : null}
          {lastHand ? <Button label={t('play.toReport')} onPress={finishSession} /> : <Button label={t('play.nextHand')} onPress={nextHand} />}
        </View>
      ) : null}
    </View>
  );
}

function SeatView({
  s,
  bb,
  box,
  compact,
  name,
  active,
  reveal,
  foldedLabel,
}: {
  s: SeatState;
  bb: number;
  box: Box;
  compact: boolean;
  name: string;
  active: boolean;
  reveal: boolean;
  foldedLabel: string;
}) {
  const tk = useTokens();
  const hero = s.seat === HERO_SEAT;
  const cardsShown = !hero && reveal && !s.folded;
  const backs = !hero && !reveal && !s.folded;
  const bet = s.streetBet > 0 ? <Text style={[tp.caption, { color: tk.felt, fontWeight: '700' }]}>{`${fmtBb(s.streetBet / bb)}bb`}</Text> : null;
  const label = `${name}, ${s.position}, ${fmtBb(s.stack / bb)}bb${s.folded ? `, ${foldedLabel}` : ''}`;
  const frame = {
    left: box.x,
    top: box.y,
    width: box.w,
    height: box.h,
    borderColor: active ? tk.warn : 'transparent',
    backgroundColor: tk.surface,
    opacity: s.folded ? 0.45 : 1,
  };
  if (compact) {
    // stół 9-osobowy: pozycja i stack w jednej linii; pod spodem styl rywala albo odkryte karty, potem zakład albo rewersy
    return (
      <View accessible accessibilityLabel={label} style={[styles.seat, frame]}>
        <Text numberOfLines={1} style={[tp.caption, { color: tk.ink, fontWeight: '700' }]}>{`${s.position} · ${fmtBb(s.stack / bb)}bb`}</Text>
        {cardsShown ? <CardRow cards={codes(s.hole)} size="sm" /> : <Text numberOfLines={1} style={[tp.caption, { color: tk.muted }]}>{name}</Text>}
        {cardsShown ? null : bet ?? (backs ? <View style={styles.backs}>{[0, 1].map((i) => <View key={i} style={[styles.backSm, { backgroundColor: tk.felt, borderColor: tk.cardEdge }]} />)}</View> : null)}
      </View>
    );
  }
  return (
    <View accessible accessibilityLabel={label} style={[styles.seat, frame]}>
      <Text numberOfLines={1} style={[tp.caption, { color: tk.ink, fontWeight: '700' }]}>{`${s.position} · ${name}`}</Text>
      <Text style={[tp.caption, { color: tk.muted }]}>{`${fmtBb(s.stack / bb)}bb`}</Text>
      {cardsShown ? <CardRow cards={codes(s.hole)} size="sm" /> : backs ? <View style={styles.backs}>{[0, 1].map((i) => <View key={i} style={[styles.back, { backgroundColor: tk.felt, borderColor: tk.cardEdge }]} />)}</View> : null}
      {bet}
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  felt: { flex: 1, minHeight: FELT_MIN_HEIGHT, borderRadius: 140, marginVertical: space.s },
  center: { position: 'absolute', alignItems: 'center', gap: space.xs },
  seat: { position: 'absolute', padding: space.xs, borderRadius: radius.s, borderWidth: 2, alignItems: 'center', gap: 1, overflow: 'hidden' },
  backs: { flexDirection: 'row', gap: 2 },
  back: { width: 16, height: 22, borderRadius: 3, borderWidth: 1 },
  backSm: { width: 11, height: 15, borderRadius: 2, borderWidth: 1 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: space.m },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s },
  action: { minHeight: 48, paddingHorizontal: space.m, borderRadius: radius.m, borderWidth: 1.5, justifyContent: 'center', flexGrow: 1 },
});
