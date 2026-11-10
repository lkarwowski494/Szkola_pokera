import { stanKursu } from '@szkola/domena';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Muted, Screen } from '@/components/ui';
import { getLessonSummaries, getModules, getScenarioTemplates } from '@/data/content/repo';
import { useOdczytPostepu } from '@/data/postep';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { modulyKursu } from '@/features/dzis/widok';
import { czytajFaktyKursu } from '@/features/kurs/faktyKursu';
import { szablonOdblokowany } from '@/features/scenariusz/dostep';
import { WyborScenariusza, type GrupaScenariuszy } from '@/features/scenariusz/WyborScenariusza';
import { zapiszBlad } from '@/platform/dziennik';

/**
 * Scenariusze (kafelek na „Dziś”, KO-045; krok F, BR-SCN): lista szablonów pogrupowana w modułach, pod spodem ekran przebiegu
 * `scenario`. Treść bez szablonów (brak tabeli `scenarios` albo pusta) daje „wkrótce” bez przycisków.
 */
export default function ScenariosScreen() {
  const { t } = useTranslation();
  const db = useBazaTresci();
  const fakty = useOdczytPostepu(czytajFaktyKursu, 'scenariusze');
  const grupy = useMemo((): GrupaScenariuszy[] | 'blad' => {
    if (fakty.stan !== 'ok') return [];
    try {
      const moduly = getModules(db);
      const lekcje = getLessonSummaries(db);
      const kurs = stanKursu(modulyKursu(moduly, lekcje), fakty.wartosc);
      const szablony = getScenarioTemplates(db);
      return moduly
        .map((m) => ({
          modulId: m.id,
          tytul: m.title,
          szablony: szablony
            .filter((s) => s.module === m.id)
            .map((szablon) => ({ szablon, odblokowany: szablonOdblokowany(szablon, kurs, lekcje.filter((l) => l.moduleId === m.id).map((l) => l.id)) })),
        }))
        .filter((g) => g.szablony.length > 0);
    } catch {
      zapiszBlad('odczyt_nieudany', 'scenariusze'); // wiersz treści niezgodny ze schematem: błąd odczytu, nie zaniżona lista
      return 'blad';
    }
  }, [db, fakty]);
  if (fakty.stan === 'ladowanie') return <Screen padTop={false}>{null}</Screen>;
  if (fakty.stan === 'blad' || grupy === 'blad') {
    return (
      <Screen padTop={false}>
        <Muted>{t('postep.odczytNieudany')}</Muted>
        <Button label={t('postep.ponow')} onPress={fakty.odswiez} />
      </Screen>
    );
  }
  return <WyborScenariusza grupy={grupy} onWybierz={(id) => router.push({ pathname: '/scenario', params: { id } })} />;
}
