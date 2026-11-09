import { computeAdvancement, type AdvancementReport } from '@szkola/srs';
import { odczytajKarty } from '@szkola/postep';
import { useFocusEffect } from 'expo-router';
import { useBazaTresci } from '@/data/tresc/kontekst';
import { useCallback, useMemo, useState } from 'react';
import { getFamilyModules, getModules } from '@/data/content/repo';
import { kartaZWiersza, usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { zapiszBlad } from '@/platform/dziennik';
import { zegarTelefonu } from '@/platform/zegar';
import { buildAreas } from './areas';
import { zapiszHistorie } from './historia';

/**
 * Wskaźnik zaawansowania liczony przy każdym wejściu na ekran (zapamiętywalność zależy od chwili): wiedza z kart FSRS
 * w `postep.db`; część „gra” usunięta z trybem gry (ADR 0011). Każde przeliczenie nadpisuje dzisiejszy punkt historii (D-250).
 * Do pierwszego odczytu (i przy błędzie odczytu) raport z pustej listy kart — wskaźnik pokazuje wtedy brak wyniku („–”).
 */
export function useAdvancement(): AdvancementReport {
  const db = useBazaTresci();
  const port = usePortPostepu();
  const areas = useMemo(() => buildAreas(getModules(db), getFamilyModules(db)), [db]);
  const [report, setReport] = useState(() => computeAdvancement(areas, [], Date.now()));
  useFocusEffect(
    useCallback(() => {
      let aktualny = true;
      void odczytajKarty(port).then(async (k) => {
        if (!k.ok) return zapiszBlad('odczyt_nieudany', 'wskaznik');
        const teraz = Date.now();
        const r = computeAdvancement(areas, k.wartosc.map(kartaZWiersza), teraz);
        if (aktualny) setReport(r);
        const z = await zapiszHistorie(port, r, zegarTelefonu.dzienLokalny(teraz, zegarTelefonu.strefa()), teraz);
        if (!z.ok) zapiszBladPostepu(z.powod, 'wskaznik');
      });
      return () => {
        aktualny = false;
      };
    }, [areas, port]),
  );
  return report;
}
