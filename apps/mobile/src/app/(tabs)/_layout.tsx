import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { useTokens } from '@/theme/tokens';

export default function TabsLayout() {
  const { t } = useTranslation();
  const tk = useTokens();
  return (
    <NativeTabs backgroundColor={tk.surface} tintColor={tk.felt}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t('tabs.learn')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'book', selected: 'book.fill' }} md="menu_book" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="review">
        <NativeTabs.Trigger.Label>{t('tabs.review')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="arrow.triangle.2.circlepath" md="autorenew" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="rules">
        <NativeTabs.Trigger.Label>{t('tabs.rules')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="list.bullet.rectangle" md="list" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="progress">
        <NativeTabs.Trigger.Label>{t('tabs.progress')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} md="bar_chart" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
