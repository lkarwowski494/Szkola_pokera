import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted } from '@/components/ui';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';
import { useAdvancement } from './useAdvancement';

/** Jedna liczba na ekranie głównym; dotknięcie otwiera rozbicie na obszary (ADR-25). */
export function AdvancementCard() {
  const tk = useTokens();
  const { t } = useTranslation();
  const r = useAdvancement();
  const value = r.overall === null ? '–' : String(r.overall);
  const knowledge = r.knowledge.score === null ? '–' : String(r.knowledge.score);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${t('advancement.title')}: ${value} ${t('advancement.outOf')}. ${t('advancement.knowledge')} ${knowledge}. ${t('advancement.game')}: ${t('advancement.gamePending')}.`}
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
        <Muted>{`${t('advancement.game')}: ${t('advancement.gamePending')}`}</Muted>
      </View>
      <Text style={[tp.h2, { color: tk.muted }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: space.l, padding: space.l, borderRadius: radius.m, borderWidth: 1.5 },
  badge: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  number: { fontSize: 30, lineHeight: 36, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
