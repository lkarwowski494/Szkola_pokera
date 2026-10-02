import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

/** Baza użytkownika otwierana raz na cały czas życia aplikacji. */
export const userSqlite = openDatabaseSync('user.db', { enableChangeListener: true });
export const userDb = drizzle(userSqlite, { schema });
export type UserDb = typeof userDb;
