import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted } from '@/components/ui';
import { odstep, promien, styl, useTokens } from '@/theme/tokens';
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
  return (
    <View style={{ gap: odstep.s }}>
      {notice.visible ? (
        <View accessibilityRole="alert" style={[styles.notice, { backgroundColor: tk.surface, borderColor: tk.ink }]}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{t('advancement.recalcTitle')}</Text>
            <Muted>{t('advancement.recalcBody')}</Muted>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={t('advancement.recalcDismiss')} onPress={notice.dismiss} hitSlop={12}>
            <Text style={[styl.tresc, { color: tk.link, fontWeight: '700' }]}>{t('advancement.recalcDismiss')}</Text>
          </Pressable>
        </View>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${t('advancement.title')}: ${value} ${t('advancement.outOf')}. ${t('advancement.knowledge')} ${knowledge}.`}
        accessibilityHint={t('advancement.openHint')}
        onPress={() => router.push('/advancement')}
        style={({ pressed }) => [styles.card, { backgroundColor: tk.surface, borderColor: tk.separator, opacity: pressed ? 0.85 : 1 }]}
      >
        <View style={[styles.badge, { backgroundColor: tk.surface, borderColor: tk.ink }]}>
          <Text style={[styles.number, { color: tk.ink }]}>{value}</Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[styl.tresc, { color: tk.ink, fontWeight: '700' }]}>{t('advancement.title')}</Text>
          <Muted>{`${t('advancement.knowledge')} ${knowledge}`}</Muted>
        </View>
        <Text style={[styl.naglowek, { color: tk.muted }]}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: odstep.l, padding: odstep.l, borderRadius: promien.przycisk, borderWidth: 1.5 },
  badge: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  notice: { flexDirection: 'row', alignItems: 'center', gap: odstep.m, padding: odstep.m, borderRadius: promien.przycisk, borderWidth: 1 },
  number: { fontSize: 30, lineHeight: 36, fontWeight: '800', fontVariant: ['tabular-nums'] },
});
