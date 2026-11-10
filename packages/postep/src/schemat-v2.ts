// Schemat v2 bazy postępu (migracja 2, D-532): dosłowna kopia docs/architektura/schemat-v2.sql, linia po linii (jak SCHEMAT_V1, D-199).
// Aplikacja nie czyta plików z docs/, więc tekst jest w kodzie; zmiana schemat-v2.sql wymaga tej samej zmiany tutaj
// (pilnuje test packages/postep/test/schemat-v2.test.ts). Od wydania v2 wolno tylko dopisywać nowe migracje (v3…), nie zmieniać tej.
export const SCHEMAT_V2: string = [
  "-- Migracja 2 runnera (`PRAGMA user_version` = 2): historia odcisków wariantów scenariuszy (D-532).",
  "-- Dopisuje tabelę do schematu v1 ([`schemat.sql`](schemat.sql), wydanej migracji się nie zmienia); schemat bazy = v1 + ten plik.",
  "-- Okno 20 ostatnich odcisków na szablon i poziom (KONFIGURACJA.WARIANTY_HISTORIA_OKNO) pilnuje kod pakietu postep, nie baza.",
  "-- Identyfikator szablonu jako TEXT bez klucza obcego (treść w innym pliku, ADR 0005). Tabela wchodzi do eksportu",
  "-- (wersja_formatu pozostaje 1; plik bez tej tabeli = pusta historia) i jest czyszczona przez „Usuń postęp”.",
  "CREATE TABLE wariant_historia (",
  "  id INTEGER PRIMARY KEY,",
  "  szablon_id TEXT NOT NULL CHECK (length(szablon_id) > 0),",
  "  poziom TEXT NOT NULL CHECK (poziom IN ('latwy', 'sredni', 'trudny')),",
  "  odcisk TEXT NOT NULL CHECK (length(odcisk) > 0),",
  "  ziarno INTEGER NOT NULL CHECK (ziarno >= 0),",
  "  zagrano_ms INTEGER NOT NULL,",
  "  UNIQUE (szablon_id, poziom, odcisk)",
  ");",
  "CREATE INDEX idx_wariant_historia_okno ON wariant_historia(szablon_id, poziom, zagrano_ms);",
  "",
].join('\n');
