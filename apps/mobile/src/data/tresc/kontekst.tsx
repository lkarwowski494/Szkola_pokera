// Baza treści dla ekranów (ADR 0005 pkt 2): jedno miejsce, z którego komponenty biorą połączenie z bazą treści języka
// aplikacji. Dziś przez kontekst expo-sqlite (`SQLiteProvider` w `app/_layout.tsx`).
export { useSQLiteContext as useBazaTresci } from 'expo-sqlite';
