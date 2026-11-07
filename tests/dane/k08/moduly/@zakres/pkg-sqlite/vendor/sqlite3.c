/* Wycinek: expo-sqlite 57.0.3, vendor/sqlite3/sqlite3.c (SQLite, domena publiczna), linie 39124, 43006, 44555, 45304. */
  unsigned fsFlags;                   /* cached details from statfs() */
    if( fstatvfs(pFile->h, &fsInfo) == -1 ) {
  if( statfs(filePath, &fsInfo) != -1 ){
  if( fstatfs(fd, &fsInfo) == -1 ){
  rc = osFstat(fd, &statbuf); /* wycinek linii 40270: makro osFstat, nie fstat( — bez trafienia */
