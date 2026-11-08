import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { Screen } from '@/components/ui';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { WierszPrzejscia } from '@/features/ustawienia/SekcjeUstawien';
import { czytajJezyk, zapiszJezyk, type UstawienieJezyka } from '@/features/ustawienia/ustawieniaAplikacji';
import { ustawJezyk } from '@/i18n';
import { WYDANE } from '@/i18n/slowniki';
import i18n from 'i18next';
import { styl, useTokens } from '@/theme/tokens';

/**
 * Język aplikacji (F-16, BR-JEZ-001; ADR 0014 pkt 3, D-132; D-269): „Jak w telefonie” albo jeden z wydanych języków; zapis
 * w `ustawienie.jezyk`, zmiana interfejsu bez restartu (`ustawJezyk`). Wzór Treningu: app/more/language.tsx:15–17 (lista
 * „Jak w telefonie” + języki, nazwa języka w nim samym), odczyt 2026-11-08. Treść w nowym języku: baza na język przy starcie
 * (ADR 0005) — przełączenie bazy w trakcie działania razem z drugim językiem treści (flow 08 oczekujący, rola 09).
 */
export default function LanguageRoute() {
  const port = usePortPostepu();
  const tk = useTokens();
  const { t } = useTranslation();
  const [obecne, ustawObecne] = useState<UstawienieJezyka | null>(null);
  const [blad, ustawBlad] = useState(false);
  useFocusEffect(
    useCallback(() => {
      void czytajJezyk(port).then((w) => {
        if (!w.ok) zapiszBladPostepu(w.powod, 'jezyk');
        ustawObecne(w.ok ? w.wartosc : 'auto');
      });
    }, [port]),
  );
  const wybierz = (j: UstawienieJezyka) => {
    ustawBlad(false);
    void zapiszJezyk(port, j, Date.now()).then(async (w) => {
      if (!w.ok) {
        zapiszBladPostepu(w.powod, 'jezyk');
        ustawBlad(true);
        return;
      }
      ustawObecne(j);
      await ustawJezyk(j);
    });
  };
  const opcje: [UstawienieJezyka, string][] = [['auto', t('language.auto')], ...WYDANE.map((j): [UstawienieJezyka, string] => [j, i18n.getFixedT(j)('language.name')])];
  return (
    <Screen>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t('language.title')}
      </Text>
      {opcje.map(([k, nazwa]) => (
        <WierszPrzejscia key={k} testID={`jezyk-${k}`} tytul={nazwa} wartosc={k === obecne ? t('language.selected') : undefined} onPress={() => wybierz(k)} />
      ))}
      {blad ? (
        <Text accessibilityRole="alert" style={[styl.tresc, { color: tk.alert }]}>
          {t('language.saveFailed')}
        </Text>
      ) : null}
    </Screen>
  );
}
