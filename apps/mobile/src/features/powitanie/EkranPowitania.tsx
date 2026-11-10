import { useTranslation } from 'react-i18next';
import { KONFIGURACJA } from '@szkola/domena';
import { Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Pierwszy ekran po pierwszym uruchomieniu (PR-01, BR-ONB-004) i wybór na starcie (BR-ONB-001, D-475): czym jest aplikacja,
 * potem „Przejdź test poziomujący” (główna) albo „Zacznij od początku” (start od M0). Ten sam ekran wraca po przerwanej ocenie.
 */
export type PropsEkranuPowitania = { onTest(): void; onOdPoczatku(): void };

export default function EkranPowitania({ onTest, onOdPoczatku }: PropsEkranuPowitania): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <Screen>
      <View style={{ flex: 1, gap: odstep.l, paddingTop: odstep.x4 }}>
        <Text accessibilityRole="header" style={[styl.tytulDuzy, { color: tk.ink }]}>
          {t('welcome.title')}
        </Text>
        <Text style={[styl.tresc, { color: tk.ink }]}>{t('welcome.what')}</Text>
        <Text style={[styl.tresc, { color: tk.ink }]}>{t('welcome.noMoney')}</Text>
        <Text style={[styl.przypis, { color: tk.muted }]}>
          {t('welcome.next', { n: KONFIGURACJA.OCENA_POZIOMU_MAKS_PYTAN, min: KONFIGURACJA.OCENA_POZIOMU_CZAS_S / 60 })}
        </Text>
      </View>
      <View style={{ gap: odstep.s }}>
        <Button label={t('welcome.takeTest')} onPress={onTest} />
        <Button variant="ghost" label={t('welcome.startFresh')} onPress={onOdPoczatku} />
      </View>
    </Screen>
  );
}
