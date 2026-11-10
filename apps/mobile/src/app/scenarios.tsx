import { useTranslation } from 'react-i18next';
import { Muted, Screen, Surface, Title } from '@/components/ui';

/**
 * Scenariusze (kafelek na „Dziś”, KO-045): do kroku F (ekran scenariusza, BR-SCN) stan „wkrótce” — bez przycisków, żeby nie było
 * martwego wejścia. Krok F zastępuje ten ekran wyborem poziomu i startem scenariusza (BR-SCN-003).
 */
export default function ScenariosScreen() {
  const { t } = useTranslation();
  return (
    <Screen padTop={false}>
      <Title>{t('scenarios.title')}</Title>
      <Surface>
        <Muted>{t('scenarios.soon')}</Muted>
      </Surface>
    </Screen>
  );
}
