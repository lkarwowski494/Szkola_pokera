import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import { create } from 'zustand';
import { getContentHash, getFamilyModules, getModules } from '@/data/content/repo';
import { userDb } from '@/data/user/db';
import { allCards, getSetting, setSetting } from '@/data/user/repo';
import { buildAreas } from './areas';
import { countedSkills, detectContentChange, SEEN_CONTENT_KEY } from './contentChange';

interface NoticeState {
  checked: boolean;
  visible: boolean;
  check: (current: { hash: string; skills: string[] }) => void;
  dismiss: () => void;
}

/**
 * Komunikat po aktualizacji treści, która dodała umiejętności. Sprawdzany raz na uruchomienie; nowy stan treści
 * zapisuje się od razu, więc przy kolejnym uruchomieniu komunikat już się nie pokaże. W bieżącym uruchomieniu
 * jest widoczny (na Nauce i w Postępie) do zamknięcia.
 */
export const useContentNoticeStore = create<NoticeState>((set, get) => ({
  checked: false,
  visible: false,
  check: (current) => {
    if (get().checked) return;
    const change = detectContentChange(getSetting(userDb, SEEN_CONTENT_KEY), current, allCards(userDb).length > 0);
    if (change.next !== null) setSetting(userDb, SEEN_CONTENT_KEY, change.next);
    set({ checked: true, visible: change.notice });
  },
  dismiss: () => set({ visible: false }),
}));

export function useContentChangeNotice(): { visible: boolean; dismiss: () => void } {
  const db = useSQLiteContext();
  const { visible, dismiss, check } = useContentNoticeStore();
  useEffect(() => {
    check({ hash: getContentHash(db), skills: countedSkills(buildAreas(getModules(db), getFamilyModules(db))) });
  }, [db, check]);
  return { visible, dismiss };
}
