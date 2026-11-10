import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { H2, Muted, Screen, Surface, Title } from '@/components/ui';
import { numerModulu } from './dostep';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Lista scenariuszy (wejście z kafelka „Dziś”, BR-MENU-001): szablony pogrupowane w modułach M2–M11; zablokowany mówi, co go
 * odblokuje, zamiast znikać albo prowadzić do pustego ekranu. Moduły bez szablonów (M0, M1, M12, M13) nie mają pustych pozycji (BR-SZB-002).
 */
export interface GrupaScenariuszy {
  modulId: string;
  tytul: string;
  szablony: readonly { szablon: ScenarioTemplate; odblokowany: boolean }[];
}

export function WyborScenariusza({ grupy, onWybierz }: { grupy: readonly GrupaScenariuszy[]; onWybierz(id: string): void }): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  return (
    <Screen padTop={false}>
      <Title>{t('scenarios.title')}</Title>
      {grupy.length === 0 ? (
        <Surface>
          <Muted>{t('scenarios.soon')}</Muted>
        </Surface>
      ) : (
        grupy.map((g) => (
          <View key={g.modulId} style={{ gap: odstep.s }}>
            <H2>{g.tytul}</H2>
            {g.szablony.map(({ szablon, odblokowany }) => (
              <Pressable
                key={szablon.id}
                testID={`scenariusz-${szablon.id}`}
                accessibilityRole="button"
                accessibilityState={{ disabled: !odblokowany }}
                disabled={!odblokowany}
                onPress={() => onWybierz(szablon.id)}
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Surface style={{ gap: odstep.xs, minHeight: 56, opacity: odblokowany ? 1 : 0.6 }}>
                  <Text style={[styl.naglowek, { color: tk.ink }]}>{szablon.situation}</Text>
                  <Text style={[styl.przypis, { color: tk.muted }]}>
                    {odblokowany ? t('scenarios.levels', { lista: szablon.levels.map((l) => t(`scenario.level.${l}`).toLowerCase()).join(', ') }) : t('scenarios.locked', { n: numerModulu(szablon.module) ?? szablon.module })}
                  </Text>
                </Surface>
              </Pressable>
            ))}
          </View>
        ))
      )}
    </Screen>
  );
}
