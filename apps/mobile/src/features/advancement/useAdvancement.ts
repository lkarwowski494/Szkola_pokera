import { computeAdvancement, type AdvancementReport } from '@szkola/srs';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { getFamilyModules, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { allCards } from '@/data/user/repo';
import { buildAreas } from './areas';
import { gameInput, saveHistory } from './game';

/**
 * Wskaźnik zaawansowania liczony przy każdym wejściu na ekran (zapamiętywalność zależy od chwili): wiedza z FSRS
 * i gra z werdyktów trybu gry M13. Każde przeliczenie nadpisuje dzisiejszy wiersz historii (dokument 14, 4.8).
 */
export function useAdvancement(): AdvancementReport {
  const db = useSQLiteContext();
  const areas = useMemo(() => buildAreas(getModules(db), getFamilyModules(db)), [db]);
  const compute = useCallback(() => computeAdvancement(areas, allCards(userDb), Date.now(), gameInput(userDb)), [areas]);
  const [report, setReport] = useState(compute);
  useFocusEffect(
    useCallback(() => {
      const r = compute();
      setReport(r);
      saveHistory(userDb, r);
    }, [compute]),
  );
  return report;
}
