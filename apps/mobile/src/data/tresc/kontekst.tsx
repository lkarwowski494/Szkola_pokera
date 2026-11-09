// Baza treści dla ekranów (ADR 0005 pkt 2): jedno miejsce, z którego komponenty biorą połączenie z bazą treści języka aplikacji.
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { SQLiteDatabase } from 'expo-sqlite';

const KontekstTresci = createContext<SQLiteDatabase | null>(null);

export function useBazaTresci(): SQLiteDatabase {
  const db = useContext(KontekstTresci);
  if (db === null) throw new Error('useBazaTresci poza ProviderTresci');
  return db;
}

type Props = {
  plik: string;
  otworz: (plik: string) => Promise<SQLiteDatabase>;
  onBlad: (e: unknown) => void;
  /** Raz, gdy pierwsza baza jest w kontekście (dzieci wyrenderowane) albo jej otwarcie się nie udało — sygnał do zdjęcia ekranu startowego. */
  onPierwszeOtwarcie?: () => void;
  children: ReactNode;
};

/**
 * Baza treści dla drzewa (sesja P, plan-09 §13): zmiana pliku (inny język) otwiera nową bazę obok bieżącej i podmienia ją
 * w kontekście dopiero po otwarciu; dzieci zostają zamontowane (nawigacja nie wraca na start), a poprzednia baza jest
 * zamykana po podmianie. `SQLiteProvider` z expo-sqlite 58 na czas otwierania zwraca null (src/hooks.tsx:226–231), więc
 * każda zmiana `databaseName` montowała całe drzewo od nowa.
 * Błąd otwarcia: przy pierwszej bazie — do granicy błędu (jak domyślne `onError` w SQLiteProvider); przy zmianie — zostaje
 * poprzednia baza, błąd idzie do `onBlad`. Baza otwarta po kolejnej zmianie pliku (szybkie pl → en → de) jest zamykana.
 * Funkcje z propsów w refie (jak w `useTresc`, przegląd D-043 sesji Q, P2c): nowa funkcja nie otwiera bazy ponownie, a wynik
 * otwarcia trafia do bieżącego `onBlad`. `onPierwszeOtwarcie` po zatwierdzeniu pierwszej bazy (efekt) albo przy błędzie startu:
 * ekran startowy schodzi dopiero wtedy, bez pustej klatki między nim a nawigacją (P2a).
 */
export function ProviderTresci({ plik, otworz, onBlad, onPierwszeOtwarcie, children }: Props) {
  const [db, ustawDb] = useState<SQLiteDatabase | null>(null);
  const [bladStartu, ustawBladStartu] = useState<{ e: unknown } | null>(null);
  const jestBaza = useRef(false);
  jestBaza.current = db !== null;
  const fn = useRef({ otworz, onBlad, onPierwszeOtwarcie });
  fn.current = { otworz, onBlad, onPierwszeOtwarcie };
  const startZgloszony = useRef(false);
  const zglosStart = () => {
    if (startZgloszony.current) return;
    startZgloszony.current = true;
    fn.current.onPierwszeOtwarcie?.();
  };

  useEffect(() => {
    let aktualny = true;
    fn.current.otworz(plik).then(
      (nowa) => {
        if (aktualny) ustawDb(nowa);
        else void nowa.closeAsync().catch(() => undefined);
      },
      (e: unknown) => {
        if (!aktualny) return;
        if (jestBaza.current) fn.current.onBlad(e);
        else {
          zglosStart();
          ustawBladStartu({ e });
        }
      },
    );
    return () => {
      aktualny = false;
    };
  }, [plik]);

  useEffect(() => {
    if (db !== null) zglosStart();
  });

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
