import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Ustawienia (PR-06, PR-07, PR-08): „Zarządzaj subskrypcją” (BR-ZAK-004), „Przywróć zakupy” (BR-ZAK-003),
 * „Pomoc” (BR-POM-002), „Usuń postęp” z potwierdzeniem systemowym Alert (BR-DANE-003; design-spec.md, słownik interakcji).
 */
export type PropsEkranuUstawien = {
  subskrypcjaAktywna: boolean;
  otworzZarzadzanie(): Promise<void>; // arkusz zarządzania subskrypcjami sklepu (ADR 0006 pkt 5)
  onPrzywroc(): void;
  onPomoc(): void;
  usunPostep(): Promise<void>; // repozytorium daneUzytkownika (pakiet postep); wołane tylko po potwierdzeniu
  /** Rozszerzenie roli 08 (5b, D-262; opcjonalne — kontrakt 07 bez zmian): sekcje trasy (dane, opinie, przypomnienie, język). */
  sekcje?: ReactNode;
};

export default function EkranUstawien({ subskrypcjaAktywna, otworzZarzadzanie, onPrzywroc, onPomoc, usunPostep, sekcje }: PropsEkranuUstawien): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const potwierdzUsuniecie = () =>
    Alert.alert(t('settings.resetTitle'), t('settings.resetBody'), [
      { text: t('settings.cancel'), style: 'cancel' },
      { text: t('settings.resetConfirm'), style: 'destructive', onPress: () => void usunPostep() },
    ]);
  return (
    <Screen>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t('settings.title')}
      </Text>
      <View style={{ gap: odstep.s }}>
        <Text style={[styl.przypis, { color: tk.muted }]}>{t('settings.purchases')}</Text>
        {subskrypcjaAktywna ? <Button variant="ghost" label={t('settings.manage')} onPress={() => void otworzZarzadzanie()} /> : null}
        <Button variant="ghost" label={t('purchase.restore')} onPress={onPrzywroc} />
      </View>
      {sekcje}
      <View style={{ gap: odstep.s }}>
        <Text style={[styl.przypis, { color: tk.muted }]}>{t('settings.other')}</Text>
        <Button variant="ghost" label={t('settings.help')} onPress={onPomoc} />
        <Button variant="ghost" label={t('settings.reset')} onPress={potwierdzUsuniecie} />
      </View>
    </Screen>
  );
}
