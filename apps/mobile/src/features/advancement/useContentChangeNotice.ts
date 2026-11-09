import { useBazaTresci } from '@/data/tresc/kontekst';
import { useEffect } from 'react';
import { create } from 'zustand';
import { getContentHash, getFamilyModules, getModules } from '@/data/content/repo';
import { odczytajKarty, odczytajUstawienie, zapiszUstawienie, type PortBazy } from '@szkola/postep';
import { usePortPostepu, zapiszBladPostepu } from '@/data/postep';
import { zapiszBlad } from '@/platform/dziennik';
import { buildAreas } from './areas';
import { countedSkills, detectContentChange, SEEN_CONTENT_KEY } from './contentChange';

interface NoticeState {
  checked: boolean;
  visible: boolean;
  check: (port: PortBazy, current: { hash: string; skills: string[] }) => Promise<void>;
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
  check: async (port, current) => {
    if (get().checked) return;
    set({ checked: true });
    const [zapisany, karty] = await Promise.all([odczytajUstawienie(port, SEEN_CONTENT_KEY), odczytajKarty(port)]);
    // błąd odczytu albo wartość innego typu niż tekst: bez komunikatu i bez nadpisania (brak nie udaje „nowej treści”)
    if (!zapisany.ok || !karty.ok || (zapisany.wartosc !== null && typeof zapisany.wartosc !== 'string')) return zapiszBlad('odczyt_nieudany', 'nauka');
    const change = detectContentChange(zapisany.wartosc, current, karty.wartosc.length > 0);
    if (change.next !== null) {
      const z = await zapiszUstawienie(port, SEEN_CONTENT_KEY, change.next, Date.now());
      if (!z.ok) zapiszBladPostepu(z.powod, 'nauka');
    }
    set({ visible: change.notice });
  },
  dismiss: () => set({ visible: false }),
}));

export function useContentChangeNotice(): { visible: boolean; dismiss: () => void } {
  const db = useBazaTresci();
  const port = usePortPostepu();
  const { visible, dismiss, check } = useContentNoticeStore();
  useEffect(() => {
    void check(port, { hash: getContentHash(db), skills: countedSkills(buildAreas(getModules(db), getFamilyModules(db))) });
  }, [db, port, check]);
  return { visible, dismiss };
}
