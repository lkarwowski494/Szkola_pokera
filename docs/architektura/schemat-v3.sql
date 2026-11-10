-- Migracja 3 runnera (`PRAGMA user_version` = 3): wersja generatora wariantów w historii odcisków (ŚR-001, KO-058 A, D-730).
-- Dopisuje kolumnę do tabeli z [`schemat-v2.sql`](schemat-v2.sql) (wydanej migracji się nie zmienia); schemat bazy = v1 + v2 + ten plik.
-- Wpis zapisany starszym generatorem nie odtwarza tej samej ręki pod tym samym ziarnem, więc „to samo rozdanie” wolno ponowić tylko
-- przy wersji równej bieżącej (GENERATOR_WERSJA w poker-core). Wpisy sprzed migracji dostają 0 (zawsze niezgodne z bieżącą, która ma ≥ 1).
-- Kolumna wchodzi do eksportu (wersja_formatu pozostaje 1; plik bez tej kolumny = 0).
ALTER TABLE wariant_historia ADD COLUMN generator_wersja INTEGER NOT NULL DEFAULT 0 CHECK (generator_wersja >= 0);
