import type { PortBazy } from '@szkola/postep';
import { createContext } from 'react';

/** Port `postep.db` otwarty przy starcie (`_layout`); ekrany biorą go przez `usePortPostepu` (data/postep.ts). */
export const PostepKontekst = createContext<PortBazy | null>(null);
