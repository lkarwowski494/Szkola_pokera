import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { useTokens } from '@/theme/tokens';

// testID zakładki = accessibilityIdentifier elementu paska na iOS (expo-router 58.0.30, native-tabs/types.d.ts:564–573:
// „XCUITest and Maestro match”) — flowy E2E odróżniają zakładkę od wiersza „Dziś” o tym samym tekście (flow 02, D-271).
export default function TabsLayout() {
  const { t } = useTranslation();
  const tk = useTokens();
  return (
    <NativeTabs backgroundColor={tk.surface} tintColor={tk.ink}>
      <NativeTabs.Trigger name="index" testID="zakladka-dzis">
        <NativeTabs.Trigger.Label>{t('tabs.today')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'book', selected: 'book.fill' }} md="menu_book" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="review" testID="zakladka-powtorki">
        <NativeTabs.Trigger.Label>{t('tabs.review')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="arrow.triangle.2.circlepath" md="autorenew" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="progress" testID="zakladka-postep">
        <NativeTabs.Trigger.Label>{t('tabs.progress')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} md="bar_chart" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
