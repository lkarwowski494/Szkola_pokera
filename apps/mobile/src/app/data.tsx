import Constants from 'expo-constants';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Screen } from '@/components/ui';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { czyMaPostep, utworzDaneEkranu } from '@/data/przeniesienie';
import EkranDanych from '@/features/dane/EkranDanych';
import { odtworzZBazy } from '@/features/ustawienia/przypomnienie';
import { czytajOstatniEksport } from '@/features/ustawienia/ustawieniaAplikacji';
import { pliki } from '@/platform/pliki';
import { powiadomieniaExpo } from '@/platform/powiadomienia';
import { zegarTelefonu } from '@/platform/zegar';
import { useSettings } from '@/state/settings';

type Stan = { maPostep: boolean; ostatniEksportMs: number | null } | null;

/** Dane (PR-07): eksport i import postępu (ADR 0008); po imporcie ustawienia interfejsu i przypomnienie z nowych danych. */
export default function DataRoute() {
  const port = usePortPostepu();
  const { t } = useTranslation();
  const loadSettings = useSettings((s) => s.load);
  const [stan, ustawStan] = useState<Stan>(null);
  const odswiez = useCallback(() => {
    void Promise.all([czyMaPostep(port), czytajOstatniEksport(port)]).then(([p, e]) => {
      if (!p.ok) zapiszBladPostepu(p.powod, 'dane');
      if (!e.ok) zapiszBladPostepu(e.powod, 'dane');
      // nieczytelny stan → ostrzeżenie przed zastąpieniem i tak (bezpieczniej), data eksportu jako brak
      ustawStan({ maPostep: p.ok ? p.wartosc : true, ostatniEksportMs: e.ok ? e.wartosc : null });
    });
  }, [port]);
  useFocusEffect(odswiez);

  const dane = useMemo(() => {
    if (!stan) return null;
    const d = utworzDaneEkranu({
      port, pliki, aplikacja: Constants.expoConfig?.version ?? 'nieznana', ...stan,
      terazMs: Date.now, dzienLokalny: () => zegarTelefonu.dzienLokalny(Date.now(), zegarTelefonu.strefa()),
      poImporcie: async () => {
        await loadSettings(port);
        await odtworzZBazy(port, powiadomieniaExpo, { tytul: t('reminder.title'), tresc: t('reminder.body') });
      },
    });
    // po eksporcie i imporcie nowy stan (data eksportu, „ma postęp”) z bazy
    return {
      ...d,
      eksportuj: () => d.eksportuj().finally(odswiez),
      zapiszImport: () => d.zapiszImport().finally(odswiez),
    };
  }, [port, stan, loadSettings, t, odswiez]);

  if (!dane) return <Screen>{null}</Screen>;
  return <EkranDanych dane={dane} strefa={zegarTelefonu.strefa()} />;
}
