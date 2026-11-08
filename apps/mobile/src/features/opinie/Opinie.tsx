import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Opinie (PR-09; BR-OPIN-002, BR-OPIN-003; NFR-PRYW-001: bez SDK i serwera, aplikacja niczego nie wysyła sama).
 * `otworzAdres` to Linking.openURL (false albo wyjątek = nie da się otworzyć, np. brak poczty).
 */
export type PropsOpinii = {
  idAplikacjiSklepu: string; // App Store ID [DO USTALENIA] (rola 10)
  adresKontaktowy: string;
  otworzAdres(url: string): Promise<boolean>;
};
export type PropsZgloszeniaBledu = {
  zadanieId: string;
  wersjaAplikacji: string;
  jezyk: string;
  adresKontaktowy: string;
  otworzAdres(url: string): Promise<boolean>;
};

/** Strona aplikacji w App Store z formularzem opinii (Apple: „action=write-review”, BR-OPIN-002-a). */
export const adresOpinii = (id: string) => `https://apps.apple.com/app/id${encodeURIComponent(id)}?action=write-review`;

async function otworz(otworzAdres: (url: string) => Promise<boolean>, url: string): Promise<boolean> {
  try {
    return await otworzAdres(url);
  } catch {
    return false;
  }
}

/** Sekcja ustawień: „Oceń w sklepie”, „Napisz do nas” (BR-OPIN-002). */
export function SekcjaOpinii({ idAplikacjiSklepu, adresKontaktowy, otworzAdres }: PropsOpinii): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const [bezPoczty, ustawBezPoczty] = useState(false);
  return (
    <View style={{ gap: odstep.s }}>
      <Text style={[styl.przypis, { color: tk.muted }]}>{t('feedback.section')}</Text>
      <Button variant="ghost" label={t('feedback.rate')} onPress={() => void otworz(otworzAdres, adresOpinii(idAplikacjiSklepu))} />
      <Button variant="ghost" label={t('feedback.write')} onPress={() => void otworz(otworzAdres, `mailto:${adresKontaktowy}`).then((ok) => ustawBezPoczty(!ok))} />
      {bezPoczty ? (
        <Text selectable style={[styl.tresc, { color: tk.ink }]}>
          {t('feedback.noMail', { adres: adresKontaktowy })}
        </Text>
      ) : null}
    </View>
  );
}

/** „Zgłoś błąd w tym zadaniu” pod oceną (BR-OPIN-003; słownik interakcji design-spec.md). */
export function ZglosBlad({ zadanieId, wersjaAplikacji, jezyk, adresKontaktowy, otworzAdres }: PropsZgloszeniaBledu): React.JSX.Element {
  const tk = useTokens();
  const { t } = useTranslation();
  const [bezPoczty, ustawBezPoczty] = useState(false);
  const zglos = () => {
    const temat = t('feedback.reportSubject', { id: zadanieId });
    const tresc = t('feedback.reportBody', { id: zadanieId, wersja: wersjaAplikacji, jezyk });
    const url = `mailto:${adresKontaktowy}?subject=${encodeURIComponent(temat)}&body=${encodeURIComponent(tresc)}`;
    void otworz(otworzAdres, url).then((ok) => ustawBezPoczty(!ok));
  };
  return (
    <View style={{ gap: odstep.s }}>
      <Button variant="ghost" label={t('feedback.report')} onPress={zglos} />
      {bezPoczty ? (
        <Text selectable style={[styl.przypis, { color: tk.ink }]}>
          {t('feedback.noMailReport', { adres: adresKontaktowy, id: zadanieId })}
        </Text>
      ) : null}
    </View>
  );
}
