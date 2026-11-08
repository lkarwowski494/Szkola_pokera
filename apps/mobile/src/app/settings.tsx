import { KONFIGURACJA } from '@szkola/domena';
import { odczytajPamiec } from '@szkola/postep';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Text } from 'react-native';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { usunCalyPostep } from '@/data/postepExpo';
import { SekcjaOpinii } from '@/features/opinie/Opinie';
import EkranUstawien from '@/features/ustawienia/EkranUstawien';
import { Sekcja, WierszPrzejscia, WierszPrzelacznika } from '@/features/ustawienia/SekcjeUstawien';
import { odtworzZBazy, przelaczPrzypomnienie } from '@/features/ustawienia/przypomnienie';
import { czySubskrypcjaAktywna, czytajPrzypomnienie } from '@/features/ustawienia/ustawieniaAplikacji';
import { ADRES_KONTAKTOWY, ID_APLIKACJI_SKLEPU } from '@/platform/adresy';
import { powiadomieniaExpo } from '@/platform/powiadomienia';
import { sklepAplikacji } from '@/platform/zakupy';
import { zegarTelefonu } from '@/platform/zegar';
import { useDostep, odswiezDostep } from '@/state/dostep';
import { useSettings } from '@/state/settings';
import { styl, useTokens } from '@/theme/tokens';

type Komunikat = 'przywrocono' | 'brak_zakupow' | 'przywracanie_blad' | 'usuwanie_blad' | 'brak_zgody' | 'przypomnienie_blad' | null;
const KLUCZ: Record<Exclude<Komunikat, null>, string> = {
  przywrocono: 'settings.restored',
  brak_zakupow: 'purchase.noPurchases',
  przywracanie_blad: 'purchase.restoreFailed',
  usuwanie_blad: 'progress.resetFailed',
  brak_zgody: 'settings.reminderDenied',
  przypomnienie_blad: 'settings.reminderFailed',
};

/**
 * Ustawienia (PR-06–PR-09, F-11, F-16, F-17; plan 5b krok 5): zakupy, wyświetlanie, przypomnienie (D-252), dane, język,
 * opinie, pomoc, „Usuń postęp”. Wejście z ikony na „Dziś” (`ustawienia`). Ekran z kontraktem 07 (`EkranUstawien`) + sekcje
 * trasy (D-262). Wzór Treningu: app/more/settings.tsx (lista sekcji z przełącznikami i przejściami), odczyt 2026-11-08.
 */
export default function SettingsRoute() {
  const port = usePortPostepu();
  const tk = useTokens();
  const { t, i18n } = useTranslation();
  const settings = useSettings();
  const [subskrypcja, ustawSubskrypcje] = useState(false);
  const [przypomnienie, ustawPrzypomnienie] = useState<boolean | null>(null);
  const [komunikat, ustawKomunikat] = useState<Komunikat>(null);
  const tekstPrzypomnienia = () => ({ tytul: t('reminder.title'), tresc: t('reminder.body') });

  const odswiez = useCallback(() => {
    void odczytajPamiec(port).then((p) => {
      if (!p.ok) zapiszBladPostepu(p.powod, 'ustawienia');
      ustawSubskrypcje(czySubskrypcjaAktywna(p.ok ? p.wartosc : null, Date.now()));
    });
    void czytajPrzypomnienie(port).then((u) => {
      if (!u.ok) zapiszBladPostepu(u.powod, 'ustawienia');
      ustawPrzypomnienie(u.ok ? u.wartosc.wlaczone : false);
    });
  }, [port]);
  useFocusEffect(odswiez);

  const przywroc = () => {
    ustawKomunikat(null);
    void sklepAplikacji()
      .przywroc()
      .then(async (w) => {
        if (w === 'zakonczony') useDostep.setState({ pro: await odswiezDostep(port, sklepAplikacji(), Date.now()) });
        ustawKomunikat(w === 'zakonczony' ? 'przywrocono' : w === 'brak_zakupow' ? 'brak_zakupow' : 'przywracanie_blad');
        odswiez();
      });
  };

  const usunPostep = async () => {
    ustawKomunikat(null);
    const w = await usunCalyPostep(port, zegarTelefonu.dzienLokalny(Date.now(), zegarTelefonu.strefa()));
    if (!w.ok) {
      zapiszBladPostepu(w.powod, 'ustawienia');
      ustawKomunikat('usuwanie_blad'); // transakcja wycofana, dane bez zmian
      return;
    }
    await settings.load(port);
    await odtworzZBazy(port, powiadomieniaExpo, tekstPrzypomnienia()); // klucz `przypomnienie` usunięty → anulowane (dane.md)
    odswiez();
  };

  const przelacz = (v: boolean) => {
    ustawKomunikat(null);
    ustawPrzypomnienie(v);
    void przelaczPrzypomnienie(port, powiadomieniaExpo, v, tekstPrzypomnienia(), Date.now()).then((w) => {
      ustawPrzypomnienie(w === 'wlaczone');
      if (w === 'brak_zgody') ustawKomunikat('brak_zgody');
      else if (w === 'blad') ustawKomunikat('przypomnienie_blad');
    });
  };

  const { godzina, minuta } = KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA;
  const pora = new Intl.DateTimeFormat(i18n.language, { hour: 'numeric', minute: '2-digit' }).format(new Date(2000, 0, 1, godzina, minuta));
  const blad = komunikat !== null && komunikat !== 'przywrocono';

  return (
    <EkranUstawien
      subskrypcjaAktywna={subskrypcja}
      otworzZarzadzanie={() => sklepAplikacji().zarzadzaj()}
      onPrzywroc={przywroc}
      onPomoc={() => router.push('/help')}
      usunPostep={usunPostep}
      sekcje={
        <>
          {komunikat ? (
            <Text accessibilityRole="alert" style={[styl.tresc, { color: blad ? tk.alert : tk.ink }]}>
              {t(KLUCZ[komunikat])}
            </Text>
          ) : null}
          <Sekcja tytul={t('settings.display')}>
            <WierszPrzelacznika tytul={t('progress.fourColor')} podpis={t('progress.fourColorHint')} wartosc={settings.fourColor} onZmiana={(v) => void settings.setFourColor(port, v)} />
            <WierszPrzelacznika tytul={t('progress.haptics')} wartosc={settings.haptics} onZmiana={(v) => void settings.setHaptics(port, v)} />
          </Sekcja>
          <Sekcja tytul={t('settings.reminderSection')}>
            <WierszPrzelacznika
              testID="ustawienia-przypomnienie"
              tytul={t('settings.reminder')}
              podpis={t('settings.reminderHint', { pora })}
              wartosc={przypomnienie ?? false}
              wylaczony={przypomnienie === null}
              onZmiana={przelacz}
            />
          </Sekcja>
          <Sekcja tytul={t('settings.general')}>
            <WierszPrzejscia testID="ustawienia-dane" tytul={t('data.title')} onPress={() => router.push('/data')} />
            <WierszPrzejscia testID="ustawienia-jezyk" tytul={t('settings.language')} wartosc={t('language.name')} onPress={() => router.push('/language')} />
          </Sekcja>
          {ID_APLIKACJI_SKLEPU && ADRES_KONTAKTOWY ? (
            <SekcjaOpinii
              idAplikacjiSklepu={ID_APLIKACJI_SKLEPU}
              adresKontaktowy={ADRES_KONTAKTOWY}
              otworzAdres={(url) => Linking.openURL(url).then(() => true)}
            />
          ) : null}
        </>
      }
    />
  );
}
