/**
 * Limit czasu ciężkich testów solvera (F-SOLVER-CZAS, sesja I 2026-11-09). Test „wagi blokerów 3-way” trwał ok. 59 s przy
 * limicie 60 s i w `pnpm run ci` (testy pakietów równolegle na 4 rdzeniach) przekroczył go bez zmian w kodzie (sesja F, fec75e7).
 * 180 s = ok. 3× najdłuższy zmierzony czas: zapas na obciążenie, a zawieszenie nadal kończy się czerwienią.
 */
export const LIMIT_CIEZKI_MS = 180_000;
