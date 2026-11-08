import { selectHelplines, telUri } from '@szkola/content-schema';
import { getLocales } from 'expo-localization';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Text, View } from 'react-native';
import { Button, Muted, Screen, Surface, Title } from '@/components/ui';
import { HELPLINES, type AppHelpline } from '@/data/content/helplines.generated';
import { zapiszBlad } from '@/platform/dziennik';
import { odstep, styl, useTokens } from '@/theme/tokens';

const host = (url: string) => url.replace(/^https:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

/**
 * Pomoc przy problemach z hazardem (B-058): telefony i strony z content/helplines.yaml, to samo źródło co ramka
 * „Odpowiedzialna gra” w lekcji M12-L4. Numery jako przyciski tel:, strony w przeglądarce.
 * Wpisy kraju z regionu urządzenia (selectHelplines, RD-12); w GB i CA numer ogólnokrajowy, pod nim lista regionów
 * bez pytania o region (D-152); kraj bez wpisu: tekst bez numeru; pomoc międzynarodowa online zawsze.
 * Wygląd ekranu do przebudowy przez rolę 08 (projekt 04); tu tylko wybór danych (E2 roli 06, przegląd 2026-11-04).
 */
const deviceCountry = (): string => {
  try {
    return getLocales()[0]?.regionCode ?? '';
  } catch {
    return '';
  }
};
export default function HelpScreen() {
  const { t } = useTranslation();
  const [failed, setFailed] = useState<string | null>(null);
  const [region, setRegion] = useState<string | undefined>(undefined);
  const sel = selectHelplines(HELPLINES, deviceCountry(), region);

  const open = (target: string) => {
    setFailed(null);
    Linking.openURL(target).catch(() => {
      // np. symulator bez aplikacji Telefon; w dzienniku sam kod, bez adresu (ADR 0009)
      zapiszBlad('link_niedostepny', 'help');
      setFailed(target);
    });
  };

  return (
    <Screen padTop={false}>
      <Title>{t('help.title')}</Title>
      <Muted>{t('help.intro')}</Muted>
      {sel.fallbackText ? <Muted>{sel.fallbackText}</Muted> : null}
      {sel.entries.map((e) => (
        <Entry key={e.id} entry={e} onOpen={open} />
      ))}
      {sel.regions.length ? (
        <View style={{ gap: odstep.s }}>
          <Muted>{HELPLINES.regionsLabel}</Muted>
          {sel.regions.map((r) => (
            <Button
              key={r.code}
              variant={region === r.code ? 'primary' : 'ghost'}
              label={region === r.code ? `${r.name} ✓` : r.name}
              onPress={() => setRegion(region === r.code ? undefined : r.code)}
            />
          ))}
        </View>
      ) : null}
      {sel.online.map((e) => (
        <Entry key={e.id} entry={e} onOpen={open} />
      ))}
      {failed ? <Muted>{t('help.openFailed', { target: failed.replace(/^tel:/, '') })}</Muted> : null}
      {/* D-158: dla każdego kraju fallbackText to to samo zdanie; bez powtórzenia na dole ekranu */}
      {sel.fallbackText ? null : <Muted>{HELPLINES.abroadText}</Muted>}
      <Muted>{HELPLINES.checkedText}</Muted>
    </Screen>
  );
}

function Entry({ entry, onOpen }: { entry: AppHelpline; onOpen: (target: string) => void }) {
  const tk = useTokens();
  const { t } = useTranslation();
  const details = [entry.hours, entry.cost].filter(Boolean).join(', ');
  return (
    <Surface style={{ gap: odstep.s }}>
      <Text accessibilityRole="header" style={[styl.naglowek, { color: tk.ink }]}>
        {entry.name}
      </Text>
      {details ? <Text style={[styl.tresc, { color: tk.ink }]}>{details}</Text> : null}
      {entry.info ? <Muted>{entry.info}</Muted> : null}
      <View style={{ gap: odstep.s, marginTop: odstep.xs }}>
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
