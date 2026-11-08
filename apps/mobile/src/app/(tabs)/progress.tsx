import { dniZOdpowiedzia, seriaDni, statystykiRodzin, type PortBazy } from '@szkola/postep';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { BladOdczytu } from '@/components/BladOdczytu';
import { Button, H2, Muted, ProgressBar, Screen, Surface, Title } from '@/components/ui';
import { getContentHash, getFamilyLabels } from '@/data/content/repo';
import { useOdczytPostepu, usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { usunCalyPostep } from '@/data/postepExpo';
import { zegarTelefonu } from '@/platform/zegar';
import { AdvancementCard } from '@/features/advancement/AdvancementCard';
import { useSettings } from '@/state/settings';
import { space, type as tp, useTokens } from '@/theme/tokens';

// Statystyki z odpowiedzi w postep.db (część 5); seria dni z dni lokalnych aktywności (D-251).
async function czytajPostep(port: PortBazy) {
  const [st, dni] = await Promise.all([statystykiRodzin(port), dniZOdpowiedzia(port)]);
  if (!st.ok) return st;
  if (!dni.ok) return dni;
  const dzis = zegarTelefonu.dzienLokalny(Date.now(), zegarTelefonu.strefa());
  return { ok: true as const, wartosc: { stats: st.wartosc.map((x) => ({ family: x.rodzinaId, total: x.wszystkie, correct: x.zaliczone })), streak: seriaDni(dni.wartosc, dzis) } };
}

/** Postęp (FR-09) i ustawienia (FR-17). */
export default function ProgressScreen() {
  const db = useSQLiteContext();
  const tk = useTokens();
  const { t } = useTranslation();
  const labels = useMemo(() => getFamilyLabels(db), [db]);
  const hash = useMemo(() => getContentHash(db), [db]);
  const settings = useSettings();
  const port = usePortPostepu();
  const odczyt = useOdczytPostepu(czytajPostep, 'postep');
  const data = odczyt.stan === 'ok' ? odczyt.wartosc : { stats: [], streak: 0 };
  const refresh = odczyt.odswiez;
  const [confirmReset, setConfirmReset] = useState(false);
  const [bladUsuwania, ustawBladUsuwania] = useState(false);

  const total = data.stats.reduce((s, x) => s + x.total, 0);
  const correct = data.stats.reduce((s, x) => s + x.correct, 0);
  const weakest = data.stats
    .filter((s) => s.total >= 2)
    .map((s) => ({ ...s, acc: s.correct / s.total }))
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 5);

  return (
    <Screen>
      <Title>{t('progress.title')}</Title>
      <AdvancementCard />
      {odczyt.stan === 'blad' ? <BladOdczytu onPonow={refresh} /> : null}
      {odczyt.stan !== 'ok' ? null : total === 0 ? (
        <Muted>{t('progress.noData')}</Muted>
      ) : (
        <Surface style={{ gap: space.s }}>
          <Text style={[tp.h2, { color: tk.ink }]}>{`${t('progress.accuracy')}: ${Math.round((correct / total) * 100)}%`}</Text>
          <ProgressBar value={correct / total} />
          <Muted>{t('progress.answers', { count: total })}</Muted>
          <Muted>{t('progress.streak', { count: data.streak })}</Muted>
        </Surface>
      )}

      {weakest.length > 0 ? (
        <View style={{ gap: space.m }}>
          <H2>{t('progress.weakest')}</H2>
          {weakest.map((w) => (
            <View key={w.family} style={{ gap: space.xs }}>
              <View style={styles.row}>
                <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{labels.get(w.family) ?? w.family}</Text>
                <Muted>{`${w.correct}/${w.total}`}</Muted>
              </View>
              <Muted>{w.family}</Muted>
              <ProgressBar value={w.acc} height={4} />
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ gap: space.m }}>
        <H2>{t('progress.settings')}</H2>
        <View style={styles.row}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={[tp.body, { color: tk.ink }]}>{t('progress.fourColor')}</Text>
            <Muted>{t('progress.fourColorHint')}</Muted>
          </View>
          <Switch value={settings.fourColor} onValueChange={(v) => void settings.setFourColor(port, v)} trackColor={{ true: tk.felt }} accessibilityLabel={t('progress.fourColor')} />
        </View>
        <View style={styles.row}>
          <Text style={[tp.body, { color: tk.ink, flex: 1 }]}>{t('progress.haptics')}</Text>
          <Switch value={settings.haptics} onValueChange={(v) => void settings.setHaptics(port, v)} trackColor={{ true: tk.felt }} accessibilityLabel={t('progress.haptics')} />
        </View>
        {confirmReset ? (
          <Surface style={{ gap: space.m }}>
            <Text style={[tp.body, { color: tk.ink }]}>{t('progress.resetConfirm')}</Text>
            <View style={styles.row}>
              <Button label={t('progress.cancel')} variant="ghost" onPress={() => setConfirmReset(false)} style={{ flex: 1 }} />
              <Button
                label={t('progress.resetYes')}
                onPress={() => {
                  // BR-DANE-003: postęp i stare user.db*; błąd → komunikat, dane bez zmian (transakcja wycofana)
                  void usunCalyPostep(port, zegarTelefonu.dzienLokalny(Date.now(), zegarTelefonu.strefa())).then(async (w) => {
                    if (!w.ok) zapiszBladPostepu(w.powod, 'postep');
                    ustawBladUsuwania(!w.ok);
                    setConfirmReset(false);
                    await settings.load(port);
                    refresh();
                  });
                }}
                style={{ flex: 1, marginLeft: space.m }}
              />
            </View>
          </Surface>
        ) : (
          <Pressable accessibilityRole="button" onPress={() => setConfirmReset(true)}>
            <Text style={[tp.body, { color: tk.bad }]}>{t('progress.reset')}</Text>
          </Pressable>
        )}
        {bladUsuwania ? <Text accessibilityRole="alert" style={[tp.body, { color: tk.bad }]}>{t('progress.resetFailed')}</Text> : null}
        <Pressable accessibilityRole="link" onPress={() => router.push('/glossary')}>
          <Text style={[tp.body, { color: tk.felt }]}>{t('glossary.link')}</Text>
        </Pressable>
        <Pressable accessibilityRole="link" onPress={() => router.push('/help')}>
          <Text style={[tp.body, { color: tk.felt }]}>{t('help.link')}</Text>
        </Pressable>
        {/* diagnostyka tylko w buildzie deweloperskim (ADR 0011) */}
        {__DEV__ ? (
          <Pressable accessibilityRole="link" onPress={() => __DEV__ && router.push('/diagnostics')}>
            <Text style={[tp.body, { color: tk.felt }]}>{t('diagnostics.link')}</Text>
          </Pressable>
        ) : null}
        <Muted>{t('progress.contentVersion', { hash })}</Muted>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.m },
});
