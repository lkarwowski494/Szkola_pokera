// Baza treści dla ekranów (ADR 0005 pkt 2): jedno miejsce, z którego komponenty biorą połączenie z bazą treści języka aplikacji.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SQLiteDatabase } from 'expo-sqlite';

const KontekstTresci = createContext<SQLiteDatabase | null>(null);

export function useBazaTresci(): SQLiteDatabase {
  const db = useContext(KontekstTresci);
  if (db === null) throw new Error('useBazaTresci poza ProviderTresci');
  return db;
}

type Props = { plik: string; otworz: (plik: string) => Promise<SQLiteDatabase>; onBlad: (e: unknown) => void; children: ReactNode };

/**
 * Baza treści dla drzewa (sesja P, plan-09 §13): zmiana pliku (inny język) otwiera nową bazę obok bieżącej i podmienia ją
 * w kontekście dopiero po otwarciu; dzieci zostają zamontowane (nawigacja nie wraca na start), a poprzednia baza jest
 * zamykana po podmianie. `SQLiteProvider` z expo-sqlite 58 na czas otwierania zwraca null (src/hooks.tsx:226–231), więc
 * każda zmiana `databaseName` montowała całe drzewo od nowa.
 * Błąd otwarcia: przy pierwszej bazie — do granicy błędu (jak domyślne `onError` w SQLiteProvider); przy zmianie — zostaje
 * poprzednia baza, błąd idzie do `onBlad`. Baza otwarta po kolejnej zmianie pliku (szybkie pl → en → de) jest zamykana.
 */
export function ProviderTresci({ plik, otworz, onBlad, children }: Props) {
  const [db, ustawDb] = useState<SQLiteDatabase | null>(null);
  const [bladStartu, ustawBladStartu] = useState<{ e: unknown } | null>(null);
  const jestBaza = db !== null;

  useEffect(() => {
    let aktualny = true;
    otworz(plik).then(
      (nowa) => {
        if (aktualny) ustawDb(nowa);
        else void nowa.closeAsync().catch(() => undefined);
      },
      (e: unknown) => {
        if (!aktualny) return;
        if (jestBaza) onBlad(e);
        else ustawBladStartu({ e });
      },
    );
    return () => {
      aktualny = false;
    };
    // jestBaza i funkcje z propsów celowo poza zależnościami: nowe otwarcie tylko przy zmianie pliku
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plik]);

  // poprzednia baza zamykana po podmianie (sprzątanie efektu po zatwierdzeniu nowej wartości) i przy odmontowaniu
  useEffect(() => {
    if (db === null) return;
    return () => {
      void db.closeAsync().catch(() => undefined);
    };
  }, [db]);

  if (bladStartu !== null) throw bladStartu.e;
  return db === null ? null : <KontekstTresci.Provider value={db}>{children}</KontekstTresci.Provider>;
}
