import { useSQLiteContext } from 'expo-sqlite';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { RuleCard } from '@/components/RuleCard';
import { Muted, Screen, Title } from '@/components/ui';
import { getModules, getRules } from '@/data/content/repo';
import { radius, space, type as tp, useTokens } from '@/theme/tokens';

/** Księga reguł (FR-06) z wyszukiwaniem. */
export default function RulesScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const rules = useMemo(() => getRules(db), [db]);
  const moduleTitles = useMemo(() => new Map(getModules(db).map((m) => [m.id, m.title])), [db]);
  const [q, setQ] = useState('');

  const norm = (s: string) => s.toLocaleLowerCase('pl-PL');
  const filtered = q.trim()
    ? rules.filter((r) => norm(`${r.ifText} ${r.thenText} ${r.because} ${r.id}`).includes(norm(q.trim())))
    : rules;
  return (
    <Screen>
      <Title>{t('rules.title')}</Title>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder={t('rules.search')}
        placeholderTextColor={tk.muted}
        clearButtonMode="while-editing"
        accessibilityLabel={t('rules.search')}
        style={[styles.search, tp.body, { color: tk.ink, backgroundColor: tk.surface, borderColor: tk.line }]}
      />
      {filtered.length === 0 ? <Muted>{t('rules.empty', { q })}</Muted> : null}
      <View style={{ gap: space.m }}>
        {filtered.map((r, i) => {
          // nagłówek modułu przy pierwszej regule danego modułu (lista jest posortowana po module)
          const header = i === 0 || filtered[i - 1]!.moduleId !== r.moduleId ? moduleTitles.get(r.moduleId) : null;
          return (
            <View key={r.id} style={{ gap: space.s }}>
              {header ? <Muted style={{ marginTop: space.s, fontWeight: '700' }}>{header}</Muted> : null}
              <RuleCard rule={r} showSource />
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: StyleSheet.hairlineWidth * 2, borderRadius: radius.m, paddingHorizontal: space.l, paddingVertical: space.m },
});
