import { telUri } from '@szkola/content-schema';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Text, View } from 'react-native';
import { Button, Muted, Screen, Surface, Title } from '@/components/ui';
import { HELPLINES, type AppHelpline } from '@/data/content/helplines.generated';
import { reportError } from '@/observability/observe';
import { space, type as tp, useTokens } from '@/theme/tokens';

const host = (url: string) => url.replace(/^https:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

/**
 * Pomoc przy problemach z hazardem (B-058): telefony i strony z content/helplines.yaml, to samo źródło co ramka
 * „Odpowiedzialna gra” w lekcji M12-L4. Numery jako przyciski tel:, strony w przeglądarce. Tylko Polska.
 */
export default function HelpScreen() {
  const { t } = useTranslation();
  const [failed, setFailed] = useState<string | null>(null);

  const open = (target: string) => {
    setFailed(null);
    Linking.openURL(target).catch((e: unknown) => {
      // np. symulator bez aplikacji Telefon; błąd bez danych osobowych (sam adres tel:/https z pliku treści)
      reportError(e);
      setFailed(target);
    });
  };

  return (
    <Screen padTop={false}>
      <Title>{t('help.title')}</Title>
      <Muted>{t('help.intro')}</Muted>
      {HELPLINES.entries.map((e) => (
        <Entry key={e.id} entry={e} onOpen={open} />
      ))}
      {failed ? <Muted>{t('help.openFailed', { target: failed.replace(/^tel:/, '') })}</Muted> : null}
      <Muted>{HELPLINES.abroadText}</Muted>
      <Muted>{HELPLINES.checkedText}</Muted>
    </Screen>
  );
}

function Entry({ entry, onOpen }: { entry: AppHelpline; onOpen: (target: string) => void }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const details = [entry.hours, entry.cost].filter(Boolean).join(', ');
  return (
    <Surface style={{ gap: space.s }}>
      <Text accessibilityRole="header" style={[tp.h3, { color: tk.ink }]}>
        {entry.name}
      </Text>
      {details ? <Text style={[tp.body, { color: tk.ink }]}>{details}</Text> : null}
      {entry.info ? <Muted>{entry.info}</Muted> : null}
      <View style={{ gap: space.s, marginTop: space.xs }}>
        {entry.phone ? (
          <Button
            label={t('help.call', { phone: entry.phone })}
            onPress={() => onOpen(telUri(entry.phone!))}
            accessibilityLabel={t('help.callA11y', { phone: entry.phone, name: entry.name })}
          />
        ) : null}
        {entry.links.map((l) => (
          <Button
            key={l.url}
            variant="ghost"
            label={`${l.label}: ${host(l.url)}`}
            onPress={() => onOpen(l.url)}
            accessibilityRole="link"
            accessibilityLabel={t('help.openA11y', { label: l.label, host: host(l.url) })}
          />
        ))}
      </View>
    </Surface>
  );
}
