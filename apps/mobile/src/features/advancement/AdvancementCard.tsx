import type { AdvancementReport } from '@szkola/srs';
import { router } from 'expo-router';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted } from '@/components/ui';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';
import { useAdvancement } from './useAdvancement';
import { useContentChangeNotice } from './useContentChangeNotice';

/**
 * Jedna liczba na Nauce i w Postępie; dotknięcie otwiera rozbicie na obszary (ADR-25). Po aktualizacji treści,
 * która dodała umiejętności, nad kafelkiem raz pojawia się komunikat o przeliczeniu wskaźnika.
 */
export function AdvancementCard() {
  const tk = useTokens();
  const { t } = useTranslation();
  const r = useAdvancement();
  const value = r.overall === null ? '–' : String(r.overall);
  const knowledge = r.knowledge.score === null ? '–' : String(r.knowledge.score);
  const notice = useContentChangeNotice();
  const gameText = gameSummary(t, r);
  return (
    <View style={{ gap: space.s }}>
      {notice.visible ? (
        <View accessibilityRole="alert" style={[styles.notice, { backgroundColor: tk.feltSoft, borderColor: tk.felt }]}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{t('advancement.recalcTitle')}</Text>
            <Muted>{t('advancement.recalcBody')}</Muted>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={t('advancement.recalcDismiss')} onPress={notice.dismiss} hitSlop={12}>
            <Text style={[tp.body, { color: tk.felt, fontWeight: '700' }]}>{t('advancement.recalcDismiss')}</Text>
          </Pressable>
        </View>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${t('advancement.title')}: ${value} ${t('advancement.outOf')}. ${t('advancement.knowledge')} ${knowledge}. ${t('advancement.game')}: ${gameText}.`}
        accessibilityHint={t('advancement.openHint')}
        onPress={() => router.push('/advancement')}
        style={({ pressed }) => [styles.card, { backgroundColor: tk.surface, borderColor: tk.line, opacity: pressed ? 0.85 : 1 }]}
      >
        <View style={[styles.badge, { backgroundColor: tk.feltSoft, borderColor: tk.felt }]}>
          <Text style={[styles.number, { color: tk.felt }]}>{value}</Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[tp.body, { color: tk.ink, fontWeight: '700' }]}>{t('advancement.title')}</Text>
          <Muted>{`${t('advancement.knowledge')} ${knowledge}`}</Muted>
          <Muted>{`${t('advancement.game')}: ${gameText}`}</Muted>
        </View>
        <Text style={[tp.h2, { color: tk.muted }]}>›</Text>
      </Pressable>
    </View>
  );
}

/** Krótki opis części „gra”: ile obszarów z grą ma już wynik (albo „dostępne po trybie gry”). */
export function gameSummary(t: TFunction, r: AdvancementReport): string {
  if (r.game.status !== 'active') return t('advancement.gamePending');
  const withGame = r.game.areas.filter((g) => g.status !== 'no-game');
  return t('advancement.gameAreas', { n: withGame.filter((g) => g.score !== null).length, total: withGame.length });
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: space.l, padding: space.l, borderRadius: radius.m, borderWidth: 1.5 },
  badge: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  notice: { flexDirection: 'row', alignItems: 'center', gap: space.m, padding: space.m, borderRadius: radius.m, borderWidth: 1 },
  number: { fontSize: 30, lineHeight: 36, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
