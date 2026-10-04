import { computeAdvancement, type AdvancementReport } from '@szkola/srs';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { getFamilyModules, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { allCards } from '@/data/user/repo';
import { buildAreas } from './areas';

/** Wskaźnik zaawansowania liczony przy każdym wejściu na ekran (zapamiętywalność zależy od chwili). */
export function useAdvancement(): AdvancementReport {
  const db = useSQLiteContext();
  const areas = useMemo(() => buildAreas(getModules(db), getFamilyModules(db)), [db]);
  const compute = useCallback(() => computeAdvancement(areas, allCards(userDb), Date.now()), [areas]);
  const [report, setReport] = useState(compute);
  useFocusEffect(useCallback(() => setReport(compute()), [compute]));
  return report;
}
