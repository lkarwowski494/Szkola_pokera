import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, View } from 'react-native';
import { Button, Screen } from '@/components/ui';
import { odstep, styl, useTokens } from '@/theme/tokens';

/**
 * Dane (PR-07; BR-DANE-001, BR-DANE-002; maszyna `import`, ADR 0008, ADR 0010): eksport do jednego pliku przez
 * udostępnianie systemu, data ostatniego eksportu, import z ostrzeżeniem przy istniejącym postępie (systemowy Alert).
 * Port `dane` składa repozytorium daneUzytkownika (pakiet postep) z adapterem plików (platform/); atrapa w testach.
 */
export interface DaneEkranu {
  maPostep: boolean;
  ostatniEksportMs: number | null;
  eksportuj(): Promise<'zapisano' | 'anulowano' | 'blad'>;
  wybierzIZwaliduj(): Promise<{ ok: true } | { ok: false; powod: 'anulowano' | 'bledny_plik' | 'nowsza_wersja' }>;
  zapiszImport(): Promise<'gotowe' | 'blad_zapisu'>; // wołane tylko po walidacji (i po potwierdzeniu, gdy maPostep)
}
export type PropsEkranuDanych = { dane: DaneEkranu; strefa: string };

type Komunikat = 'zapisano' | 'blad_eksportu' | 'bledny_plik' | 'nowsza_wersja' | 'zaimportowano' | 'blad_zapisu' | null;
const KLUCZ: Record<Exclude<Komunikat, null>, string> = {
  zapisano: 'data.exported',
  blad_eksportu: 'data.exportFailed',
  bledny_plik: 'data.badFile',
  nowsza_wersja: 'data.newerVersion',
  zaimportowano: 'data.imported',
  blad_zapisu: 'data.importFailed',
};

/** Data w strefie telefonu (nie UTC): BR-DANE-001 „datę ostatniego eksportu”. */
export function dataWStrefie(ms: number, strefa: string, jezyk: string): string {
  return new Intl.DateTimeFormat(jezyk, { day: 'numeric', month: 'long', year: 'numeric', timeZone: strefa }).format(new Date(ms));
}

export default function EkranDanych({ dane, strefa }: PropsEkranuDanych): React.JSX.Element {
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const [komunikat, ustawKomunikat] = useState<Komunikat>(null);
  const [zajety, ustawZajety] = useState(false);

  const eksportuj = async () => {
    ustawZajety(true);
    ustawKomunikat(null);
    const w = await dane.eksportuj().catch(() => 'blad' as const);
    ustawZajety(false);
    if (w === 'zapisano') ustawKomunikat('zapisano');
    else if (w === 'blad') ustawKomunikat('blad_eksportu');
  };
  const zapisz = async () => {
    ustawZajety(true);
    const w = await dane.zapiszImport().catch(() => 'blad_zapisu' as const);
    ustawZajety(false);
    ustawKomunikat(w === 'gotowe' ? 'zaimportowano' : 'blad_zapisu');
  };
  const importuj = async () => {
    ustawKomunikat(null);
    ustawZajety(true);
    const w = await dane.wybierzIZwaliduj().catch(() => ({ ok: false, powod: 'bledny_plik' }) as const);
    ustawZajety(false);
    if (!w.ok) {
      if (w.powod !== 'anulowano') ustawKomunikat(w.powod);
      return;
    }
    if (!dane.maPostep) return void zapisz();
    Alert.alert(t('data.replaceTitle'), t('data.replaceBody'), [
      { text: t('settings.cancel'), style: 'cancel' },
      { text: t('data.replaceConfirm'), style: 'destructive', onPress: () => void zapisz() },
    ]);
  };
  const blad = komunikat === 'blad_eksportu' || komunikat === 'bledny_plik' || komunikat === 'nowsza_wersja' || komunikat === 'blad_zapisu';

  return (
    <Screen>
      <Text accessibilityRole="header" style={[styl.tytul, { color: tk.ink }]}>
        {t('data.title')}
      </Text>
      <Text style={[styl.tresc, { color: tk.ink }]}>{t('data.intro')}</Text>
      <View style={{ gap: odstep.s }}>
        <Button label={t('data.export')} onPress={() => void eksportuj()} disabled={zajety} />
        <Text style={[styl.przypis, { color: tk.muted }]}>
          {dane.ostatniEksportMs === null ? t('data.neverExported') : t('data.lastExport', { data: dataWStrefie(dane.ostatniEksportMs, strefa, i18n.language) })}
        </Text>
      </View>
      <View style={{ gap: odstep.s }}>
        <Button variant="ghost" label={t('data.import')} onPress={() => void importuj()} disabled={zajety} />
        <Text style={[styl.przypis, { color: tk.muted }]}>{t('data.importHint')}</Text>
      </View>
      {komunikat ? (
        <Text accessibilityRole="alert" style={[styl.tresc, { color: blad ? tk.alert : tk.ink }]}>
          {t(KLUCZ[komunikat])}
        </Text>
      ) : null}
    </Screen>
  );
}
