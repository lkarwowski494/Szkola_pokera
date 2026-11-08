import type { MiejsceProsby } from '@szkola/domena';
import type { PortBazy } from '@szkola/postep';
import { czyPoprosicOOcene, zapiszProsbeOOcene } from '@/features/ustawienia/ustawieniaAplikacji';

/** Systemowa prośba o ocenę (adapter: platform/opinie.ts, expo-store-review). */
export interface PortOceny {
  dostepna(): Promise<boolean>; // StoreReview.isAvailableAsync
  popros(): Promise<void>; // StoreReview.requestReview — system sam decyduje, czy okno się pokaże
}

/**
 * Na podsumowaniu lekcji albo sesji (BR-OPIN-001, D-110): prośba tylko, gdy domena pozwala i system ją obsługuje; chwila
 * prośby zapisana, więc następna czeka PROSBA_O_OCENE_ODSTEP_DNI. Nigdy nie rzuca: podsumowanie nie zależy od prośby.
 */
export async function poprosOOceneGdyPora(port: PortBazy, ocena: PortOceny, miejsce: MiejsceProsby, terazMs: number): Promise<boolean> {
  try {
    const czy = await czyPoprosicOOcene(port, miejsce, terazMs);
    if (!czy.ok || !czy.wartosc || !(await ocena.dostepna())) return false;
    await ocena.popros();
    await zapiszProsbeOOcene(port, terazMs); // nieudany zapis: najwyżej druga prośba wcześniej (system i tak ogranicza okno)
    return true;
  } catch {
    return false;
  }
}
