import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/** Pierwszy ekran po pierwszym uruchomieniu (PR-01, BR-ONB-004): czym jest aplikacja; „Dalej” prowadzi do oceny poziomu. */
export type PropsEkranuPowitania = { onDalej(): void };

export default function EkranPowitania({ onDalej }: PropsEkranuPowitania): React.JSX.Element {
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
        <Text style={[styl.przypis, { color: tk.muted }]}>{t('welcome.next')}</Text>
      </View>
      <Button label={t('welcome.continue')} onPress={onDalej} />
    </Screen>
  );
}
