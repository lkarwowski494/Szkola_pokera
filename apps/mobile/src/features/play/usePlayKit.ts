import { useSQLiteContext } from 'expo-sqlite';
import { useMemo } from 'react';
import { loadPlayKit, type PlayKit } from './kit';

/** Zestaw trybu gry z bazy treści, liczony raz na otwarcie ekranu. */
export function usePlayKit(): PlayKit {
  const db = useSQLiteContext();
  return useMemo(() => loadPlayKit({ all: (sql, ...params) => db.getAllSync(sql, ...params) }), [db]);
}
