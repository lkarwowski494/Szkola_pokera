import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, Muted } from '@/components/ui';
import { odstep } from '@/theme/tokens';

/** Błąd odczytu postępu (odczyt_nieudany, tlo-i-bledy.md §4): komunikat i ponowienie zamiast pustej listy. Z komponentów ui. */
export function BladOdczytu({ onPonow }: { onPonow(): void }) {
  const { t } = useTranslation();
  return (
    <View style={{ gap: odstep.s }}>
      <Muted>{t('postep.odczytNieudany')}</Muted>
      <Button label={t('postep.ponow')} variant="ghost" onPress={onPonow} />
    </View>
  );
}
