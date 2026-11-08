import type { PortBazy } from '@szkola/postep';
import { createContext } from 'react';

/** Port `postep.db` otwarty przy starcie (`_layout`); ekrany przechodzą na niego w części 5 (D-239: P-1 = B). */
export const PostepKontekst = createContext<PortBazy | null>(null);
