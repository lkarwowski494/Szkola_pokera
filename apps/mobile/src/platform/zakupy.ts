import { decyzja, KONFIGURACJA, type OdczytSklepu } from '@szkola/domena';
import * as Iap from 'expo-iap';
import type { OdczytProduktow, ProduktSklepu, SklepEkranu } from '@/features/zakup/EkranZakupu';
import { zapiszBlad } from '@/platform/dziennik';

/**
 * Adapter sklepu (ADR 0006; L8-04, D-217) na expo-iap 6.4.2 (build/types.d.ts i build/index.d.ts, odczyt 2026-11-08).
 * Wzorzec: Trening `lib/store-native.ts` (expo-iap 5.8.1, odczyt 2026-11-08, 2e4b0f8) — odstępstwa nazwane niżej.
 * - Dostęp liczy domena (`decyzja`) z `odczyt()`: `getAvailablePurchases({ onlyIncludeActiveItemsIOS: true })`
 *   (StoreKit 2 currentEntitlements), nigdy z `hasActiveSubscriptions` (Trening, ta sama zasada).
 * - Błąd odczytu sklepu = `{ ok: false }`, nie „brak zakupu” (ADR 0006 pkt 4). Błędne dane własnego produktu (data końca
 *   nie liczbą) także `{ ok: false }` — bez zgadywania (zasada roli 9).
 * - `wygasaMs: null` tylko dla `PRODUKTY_BEZ_KONCA`; subskrypcja bez daty końca przechodzi jako `null`, a `decyzja` nie daje
 *   za nią dostępu (W10).
 * - Bez serwera weryfikacji i bez IAPKit (K-07 `iapkit`); żadne wywołanie w transakcji bazy (ADR 0006 pkt 6) — adapter nie
 *   zna bazy, pamięć zapisuje wywołujący po `decyzja`.
 * - Odstępstwo od Treningu: bez odczytu karencji płatności (`subscriptionStatusIOS`) — ADR 0006 jej nie przewiduje; zgłoszenie
 *   08-F05 do roli 05. Bez limitu czasu na wywołania (Trening `withTimeout`) — jw.
 */
export interface Sklep extends SklepEkranu {
  odczyt(): Promise<OdczytSklepu>;
  przywroc(teraz?: number): Promise<'zakonczony' | 'brak_zakupow' | 'blad'>;
  zarzadzaj(): Promise<void>; // arkusz systemowy subskrypcji (ADR 0006 pkt 5)
  nasluchuj(fn: (z: ZdarzenieSklepu) => void): () => void;
}
export type ZdarzenieSklepu = 'zakonczona' | 'oczekuje' | 'anulowano' | 'blad';

type Transakcja = { produkt: string; wygasaMs: number | null; odebrana: boolean };
const ODBLOKOWUJA: readonly string[] = KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE;
const BEZ_KONCA: readonly string[] = KONFIGURACJA.PRODUKTY_BEZ_KONCA;
const OKRES: Record<string, ProduktSklepu['okres']> = {
  'pl.lkarwowski.szkolapokera.kwartal': 'kwartal',
  'pl.lkarwowski.szkolapokera.rok': 'rok',
  'pl.lkarwowski.szkolapokera.dozywotni': null,
};

const kodBledu = (e: unknown): string => (typeof e === 'object' && e !== null && 'code' in e && typeof e.code === 'string' ? e.code : '');
const liczbaLubBrak = (v: unknown): number | null | 'zle' => (v === undefined || v === null ? null : typeof v === 'number' && Number.isFinite(v) ? v : 'zle');

/** Wiersz z expo-iap (unknown) → transakcja własnego produktu; obcy produkt → null; błędne pole → 'zle'. */
function transakcja(w: unknown): Transakcja | null | 'zle' {
  if (typeof w !== 'object' || w === null || !('productId' in w) || typeof w.productId !== 'string') return null;
  if (!ODBLOKOWUJA.includes(w.productId)) return null;
  const wygasa = liczbaLubBrak('expirationDateIOS' in w ? w.expirationDateIOS : undefined);
  const odebrano = liczbaLubBrak('revocationDateIOS' in w ? w.revocationDateIOS : undefined);
  if (wygasa === 'zle' || odebrano === 'zle') return 'zle';
  return { produkt: w.productId, wygasaMs: BEZ_KONCA.includes(w.productId) ? null : wygasa, odebrana: odebrano !== null };
}

function produkt(w: unknown): ProduktSklepu | null {
  if (typeof w !== 'object' || w === null || !('id' in w) || typeof w.id !== 'string' || !(w.id in OKRES)) return null;
  if (!('displayPrice' in w) || typeof w.displayPrice !== 'string' || w.displayPrice === '') return null;
  return { id: w.id, cena: w.displayPrice, okres: OKRES[w.id] ?? null };
}

export function utworzSklep(): Sklep {
  let polaczenie: Promise<boolean> | null = null;
  const polacz = () => (polaczenie ??= Iap.initConnection().catch((e: unknown) => {
    polaczenie = null;
    throw e;
  }));

  const odczyt = async (): Promise<OdczytSklepu> => {
    try {
      await polacz();
      const wiersze: unknown[] = await Iap.getAvailablePurchases({ onlyIncludeActiveItemsIOS: true });
      const transakcje: Transakcja[] = [];
      for (const w of wiersze) {
        const t = transakcja(w);
        if (t === 'zle') throw new Error('Niepoprawna transakcja ze sklepu');
        if (t) transakcje.push(t);
      }
      return { ok: true, transakcje };
    } catch {
      zapiszBlad('sklep_niedostepny', 'zakup');
      return { ok: false };
    }
  };

  return {
    odczyt,
    async produkty(): Promise<OdczytProduktow> {
      try {
        await polacz();
        const wiersze: readonly unknown[] = (await Iap.fetchProducts({ skus: [...ODBLOKOWUJA], type: 'all' })) ?? [];
        return { ok: true, produkty: wiersze.map(produkt).filter((p): p is ProduktSklepu => p !== null) };
      } catch (e) {
        zapiszBlad('sklep_niedostepny', 'zakup');
        return { ok: false, powod: kodBledu(e) === Iap.ErrorCode.NetworkError ? 'brak_sieci' : 'blad' };
      }
    },
    async kup(id) {
      // expo-iap 6.4.2 (index.d.ts przy requestPurchase): „The result arrives through purchaseUpdatedListener /
      // purchaseErrorListener …, not the return value”; natywnie wynik może być nil. „zakonczony” tylko przy zwróconej
      // zakończonej transakcji kupowanego produktu; inaczej „oczekuje”, a wynik przychodzi z `nasluchuj` (przegląd D-043 P1-1).
      try {
        await polacz();
        const wynik = BEZ_KONCA.includes(id)
          ? await Iap.requestPurchase({ request: { apple: { sku: id } }, type: 'in-app' })
          : await Iap.requestPurchase({ request: { apple: { sku: id } }, type: 'subs' });
        let kupiony = false;
        for (const p of Array.isArray(wynik) ? wynik : wynik ? [wynik] : []) {
          if (p.purchaseState !== 'purchased') continue; // pending: transakcja jeszcze niezakończona w sklepie
          // niezakończona transakcja wraca przy następnym starcie; dostęp i tak liczy `decyzja` z odczytu sklepu
          await Iap.finishTransaction({ purchase: p, isConsumable: false }).catch(() => zapiszBlad('zakup_blad', 'zakup'));
          if (p.productId === id) kupiony = true;
        }
        return kupiony ? 'zakonczony' : 'oczekuje';
      } catch (e) {
        const kod = kodBledu(e);
        if (kod === Iap.ErrorCode.UserCancelled) return 'anulowany';
        if (kod === Iap.ErrorCode.Pending || kod === Iap.ErrorCode.DeferredPayment) return 'oczekuje';
        zapiszBlad('zakup_blad', 'zakup');
        return 'blad';
      }
    },
    async przywroc(teraz = Date.now()) {
      try {
        await polacz();
        await Iap.restorePurchases();
      } catch {
        zapiszBlad('sklep_niedostepny', 'zakup');
        return 'blad';
      }
      const o = await odczyt();
      if (!o.ok) return 'blad';
      return decyzja(o, null, teraz, ODBLOKOWUJA, BEZ_KONCA).dostep ? 'zakonczony' : 'brak_zakupow';
    },
    // Nasłuch transakcji (wynik `kup`, zgoda rodzica, odnowienia): zakończona → finishTransaction, potem „zakonczona”;
    // ekran mapuje zdarzenie według stanu maszyny `zakup` (maszyny.ts: w_toku → transakcja_zakonczona, oczekuje →
    // transakcja_z_nasluchu). Podpięcie od startu aplikacji (Apple: listener „as soon as your app launches”): część 5.
    nasluchuj(fn) {
      const zakupy = Iap.purchaseUpdatedListener((p) => {
        if (p.purchaseState === 'pending') return fn('oczekuje');
        if (p.purchaseState !== 'purchased') return;
        void Iap.finishTransaction({ purchase: p, isConsumable: false })
          .catch(() => zapiszBlad('zakup_blad', 'zakup'))
          .then(() => fn('zakonczona'));
      });
      const bledy = Iap.purchaseErrorListener((e) => {
        const kod = kodBledu(e);
        if (kod === Iap.ErrorCode.UserCancelled) return fn('anulowano');
        if (kod === Iap.ErrorCode.Pending || kod === Iap.ErrorCode.DeferredPayment) return fn('oczekuje');
        zapiszBlad('zakup_blad', 'zakup');
        fn('blad');
      });
      return () => {
        zakupy.remove();
        bledy.remove();
      };
    },
    async zarzadzaj() {
      try {
        await Iap.showManageSubscriptionsIOS();
      } catch {
        await Iap.deepLinkToSubscriptions({});
      }
    },
  };
}
