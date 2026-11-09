import { create } from 'zustand';
import { decyzja, KONFIGURACJA, type OdczytSklepu } from '@szkola/domena';
import { odczytajPamiec, zapiszPamiec, type PortBazy } from '@szkola/postep';
import { zapiszBladPostepu } from '@/data/postep';

/**
 * Dostęp (Pro) od startu aplikacji (D-247, 08-F06; ADR 0006, D-209), wzór Trening `lib/entitlement.ts:74–79` (odczyt
 * 2026-11-08): po otwarciu postep.db decyzja z pamięci `uprawnienie_cache` (od razu, bez sieci) → nasłuch transakcji
 * (Apple: listener „as soon as your app launches”) → odczyt sklepu → `decyzja` domeny → zapis pamięci. Zakończona transakcja
 * z nasłuchu (zakup, zgoda rodzica, odnowienie) odświeża dostęp bez ponownego uruchomienia (BR-ZAK-002). Store to tylko kopia
 * do renderowania; źródłem jest sklep, a przy jego błędzie pamięć ostatniego udanego odczytu.
 */
export interface ZrodloDostepu {
  odczyt(): Promise<OdczytSklepu>;
  nasluchuj(fn: (z: 'zakonczona' | 'oczekuje' | 'anulowano' | 'blad') => void): () => void;
}
export const useDostep = create<{ pro: boolean }>(() => ({ pro: false }));
const ustawPro = (pro: boolean) => {
  if (useDostep.getState().pro !== pro) useDostep.setState({ pro });
};
const decyduj = (o: OdczytSklepu, pamiec: Parameters<typeof decyzja>[1], teraz: number) =>
  decyzja(o, pamiec, teraz, KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE, KONFIGURACJA.PRODUKTY_BEZ_KONCA);

async function pamiec(port: PortBazy) {
  const p = await odczytajPamiec(port);
  if (p.ok) return p.wartosc;
  zapiszBladPostepu(p.powod, 'dostep'); // nieczytelna pamięć = brak pamięci (decyduje sklep), nie zgadnięty dostęp
  return null;
}

/** Odczyt sklepu bez odrzucenia: wyjątek spoza adaptera (który sam zamienia błędy na `{ ok: false }`) = błąd sklepu (ADR 0006 pkt 4). */
const odczytSklepu = (sklep: Pick<ZrodloDostepu, 'odczyt'>): Promise<OdczytSklepu> =>
  sklep.odczyt().catch((): OdczytSklepu => ({ ok: false }));

/**
 * Odczyt sklepu → decyzja; udany odczyt zastępuje pamięć (także pustą — zwrot, W7). Wynik: dostęp. Nie odrzuca (pamięć i zapis
 * zwracają `Wynik`, sklep przez `odczytSklepu`), więc wywołujący po zakupie zawsze dostaje decyzję (P2 przeglądu D-043, sesja Q).
 */
export async function odswiezDostep(port: PortBazy, sklep: Pick<ZrodloDostepu, 'odczyt'>, teraz: number): Promise<boolean> {
  const [p, o] = await Promise.all([pamiec(port), odczytSklepu(sklep)]);
  const d = decyduj(o, p, teraz);
  if (o.ok && d.nowaPamiec) {
    const z = await zapiszPamiec(port, d.nowaPamiec);
    if (!z.ok) zapiszBladPostepu(z.powod, 'dostep');
  }
  return d.dostep;
}

/** Start przy otwarciu postep.db: pamięć → nasłuch → odczyt sklepu. Zwraca odpięcie nasłuchu. */
export function startDostepu(port: PortBazy, sklep: ZrodloDostepu, teraz: () => number): () => void {
  let aktywny = true;
  const odswiez = () =>
    void odswiezDostep(port, sklep, teraz()).then((d) => {
      if (aktywny) ustawPro(d);
    });
  void pamiec(port).then((p) => {
    if (!aktywny) return;
    ustawPro(decyduj({ ok: false }, p, teraz()).dostep);
    odswiez();
  });
  const odepnij = sklep.nasluchuj((z) => {
    if (z === 'zakonczona') odswiez();
  });
  return () => {
    aktywny = false;
    odepnij();
  };
}
