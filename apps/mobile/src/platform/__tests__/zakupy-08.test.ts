/// <reference types="jest" />
// Krok 5 części 4 (ADR 0006, L8-04): adapter expo-iap 6.4.2 → OdczytSklepu (decyzja domeny) i port ekranu zakupu.
// Atrapa modułu zgodna z build/types.d.ts paczki (odczyt 2026-11-08): getAvailablePurchases, fetchProducts,
// requestPurchase, restorePurchases, finishTransaction, showManageSubscriptionsIOS, deepLinkToSubscriptions.
import { KONFIGURACJA, decyzja } from '@szkola/domena';
import { utworzSklep } from '@/platform/zakupy';

jest.mock('expo-iap', () => ({
  // wartości enum ErrorCode z build/types.d.ts 6.4.2
  ErrorCode: { UserCancelled: 'user-cancelled', Pending: 'pending', DeferredPayment: 'deferred-payment', NetworkError: 'network-error' },
  initConnection: jest.fn(() => Promise.resolve(true)),
  getAvailablePurchases: jest.fn(() => Promise.resolve([])),
  fetchProducts: jest.fn(() => Promise.resolve([])),
  requestPurchase: jest.fn(() => Promise.resolve(null)),
  restorePurchases: jest.fn(() => Promise.resolve()),
  finishTransaction: jest.fn(() => Promise.resolve()),
  showManageSubscriptionsIOS: jest.fn(() => Promise.resolve([])),
  deepLinkToSubscriptions: jest.fn(() => Promise.resolve()),
  purchaseUpdatedListener: jest.fn(() => ({ remove: jest.fn() })),
  purchaseErrorListener: jest.fn(() => ({ remove: jest.fn() })),
}));
jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));
const I = jest.requireMock<Record<string, jest.Mock>>('expo-iap');
const D = jest.requireMock<{ zapiszBlad: jest.Mock }>('@/platform/dziennik');

const [KWARTAL, ROK, DOZYWOTNI] = KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE;
const TERAZ = 1_800_000_000_000;
const zakup = (productId: string, extra: Record<string, unknown> = {}) => ({ productId, transactionId: 't', purchaseState: 'purchased', platform: 'ios', ...extra });
const blad = (code: string) => Object.assign(new Error(code), { code });
const decyduj = (o: Parameters<typeof decyzja>[0]) =>
  decyzja(o, null, TERAZ, KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE, KONFIGURACJA.PRODUKTY_BEZ_KONCA);

beforeEach(() => {
  Object.values(I).forEach((f) => typeof f === 'function' && f.mockClear());
  D.zapiszBlad.mockClear();
});

describe('odczyt transakcji → OdczytSklepu', () => {
  it('aktywne uprawnienia z getAvailablePurchases({ onlyIncludeActiveItemsIOS: true }); data końca i zwrot', async () => {
    I.getAvailablePurchases!.mockResolvedValueOnce([
      zakup(ROK!, { expirationDateIOS: TERAZ + 1000 }),
      zakup(KWARTAL!, { expirationDateIOS: TERAZ + 5, revocationDateIOS: TERAZ - 5 }),
      zakup('obcy.produkt', { expirationDateIOS: TERAZ + 9 }),
    ]);
    const o = await utworzSklep().odczyt();
    expect(I.getAvailablePurchases).toHaveBeenCalledWith({ onlyIncludeActiveItemsIOS: true });
    expect(o).toEqual({
      ok: true,
      transakcje: [
        { produkt: ROK, wygasaMs: TERAZ + 1000, odebrana: false },
        { produkt: KWARTAL, wygasaMs: TERAZ + 5, odebrana: true },
      ],
    });
  });

  it('dożywotni: wygasaMs null (PRODUKTY_BEZ_KONCA) → dostęp; subskrypcja bez daty końca → wygasaMs null i brak dostępu (W10)', async () => {
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(DOZYWOTNI!)]);
    const o1 = await utworzSklep().odczyt();
    expect(o1).toEqual({ ok: true, transakcje: [{ produkt: DOZYWOTNI, wygasaMs: null, odebrana: false }] });
    expect(decyduj(o1).dostep).toBe(true);
    // dożywotni z datą końca od sklepu (brzegowe): i tak bez końca — o „bez końca” decyduje lista produktów, nie sklep
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(DOZYWOTNI!, { expirationDateIOS: TERAZ - 1 })]);
    expect(await utworzSklep().odczyt()).toEqual({ ok: true, transakcje: [{ produkt: DOZYWOTNI, wygasaMs: null, odebrana: false }] });
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(ROK!)]);
    const o2 = await utworzSklep().odczyt();
    expect(o2).toEqual({ ok: true, transakcje: [{ produkt: ROK, wygasaMs: null, odebrana: false }] });
    expect(decyduj(o2).dostep).toBe(false);
  });

  it('brak sieci albo błąd sklepu → { ok: false } (nie „brak zakupu”) i wpis w dzienniku', async () => {
    I.getAvailablePurchases!.mockRejectedValueOnce(blad('network-error'));
    expect(await utworzSklep().odczyt()).toEqual({ ok: false });
    expect(D.zapiszBlad).toHaveBeenCalledWith('sklep_niedostepny', 'zakup');
  });

  it('błędne dane własnego produktu (data końca nie liczbą) → { ok: false }, bez zgadywania', async () => {
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(ROK!, { expirationDateIOS: '2030-01-01' })]);
    expect(await utworzSklep().odczyt()).toEqual({ ok: false });
  });
});

describe('port ekranu zakupu', () => {
  it('produkty: cena tylko ze sklepu (displayPrice), okres z identyfikatora; obce pominięte; brak sieci → brak_sieci', async () => {
    I.fetchProducts!.mockResolvedValueOnce([
      { id: KWARTAL, displayPrice: '$9.99' },
      { id: ROK, displayPrice: '$14.99' },
      { id: DOZYWOTNI, displayPrice: '$19.99' },
      { id: 'obcy', displayPrice: '$1' },
    ]);
    const s = utworzSklep();
    expect(await s.produkty()).toEqual({
      ok: true,
      produkty: [
        { id: KWARTAL, cena: '$9.99', okres: 'kwartal' },
        { id: ROK, cena: '$14.99', okres: 'rok' },
        { id: DOZYWOTNI, cena: '$19.99', okres: null },
      ],
    });
    expect(I.fetchProducts).toHaveBeenCalledWith({ skus: [...KONFIGURACJA.PRODUKTY_ODBLOKOWUJACE], type: 'all' });
    I.fetchProducts!.mockRejectedValueOnce(blad('network-error'));
    expect(await s.produkty()).toEqual({ ok: false, powod: 'brak_sieci' });
    I.fetchProducts!.mockRejectedValueOnce(blad('service-error'));
    expect(await s.produkty()).toEqual({ ok: false, powod: 'blad' });
  });

  it('kup: subskrypcja jako subs, dożywotni jako in-app; transakcja kończona; anulowanie, oczekiwanie i błąd', async () => {
    const s = utworzSklep();
    const p = zakup(ROK!, { expirationDateIOS: TERAZ + 1 });
    I.requestPurchase!.mockResolvedValueOnce(p);
    expect(await s.kup(ROK!)).toBe('zakonczony');
    expect(I.requestPurchase).toHaveBeenLastCalledWith({ request: { apple: { sku: ROK } }, type: 'subs' });
    expect(I.finishTransaction).toHaveBeenCalledWith({ purchase: p, isConsumable: false });
    I.requestPurchase!.mockResolvedValueOnce([zakup(DOZYWOTNI!)]);
    expect(await s.kup(DOZYWOTNI!)).toBe('zakonczony');
    expect(I.requestPurchase).toHaveBeenLastCalledWith({ request: { apple: { sku: DOZYWOTNI } }, type: 'in-app' });
    I.requestPurchase!.mockRejectedValueOnce(blad('user-cancelled'));
    expect(await s.kup(ROK!)).toBe('anulowany');
    I.requestPurchase!.mockRejectedValueOnce(blad('deferred-payment'));
    expect(await s.kup(ROK!)).toBe('oczekuje');
    I.requestPurchase!.mockRejectedValueOnce(blad('pending'));
    expect(await s.kup(ROK!)).toBe('oczekuje');
    I.requestPurchase!.mockRejectedValueOnce(blad('service-error'));
    expect(await s.kup(ROK!)).toBe('blad');
    expect(D.zapiszBlad).toHaveBeenCalledWith('zakup_blad', 'zakup');
  });

  it('przywróć: restorePurchases, potem odczyt; aktywne → zakonczony, brak → brak_zakupow, błąd → blad', async () => {
    const s = utworzSklep();
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(DOZYWOTNI!)]);
    expect(await s.przywroc(TERAZ)).toBe('zakonczony');
    expect(I.restorePurchases!.mock.invocationCallOrder[0]).toBeLessThan(I.getAvailablePurchases!.mock.invocationCallOrder[0]!);
    I.getAvailablePurchases!.mockResolvedValueOnce([zakup(ROK!, { expirationDateIOS: TERAZ - 1 })]);
    expect(await s.przywroc(TERAZ)).toBe('brak_zakupow');
    I.restorePurchases!.mockRejectedValueOnce(blad('network-error'));
    expect(await s.przywroc(TERAZ)).toBe('blad');
  });

  it('zarządzanie subskrypcją: arkusz systemowy, a przy jego błędzie strona App Store (ADR 0006 pkt 5)', async () => {
    const s = utworzSklep();
    await s.zarzadzaj();
    expect(I.showManageSubscriptionsIOS).toHaveBeenCalledTimes(1);
    expect(I.deepLinkToSubscriptions).not.toHaveBeenCalled();
    I.showManageSubscriptionsIOS!.mockRejectedValueOnce(blad('service-error'));
    await s.zarzadzaj();
    expect(I.deepLinkToSubscriptions).toHaveBeenCalledTimes(1);
  });
});

describe('wynik zakupu przez nasłuch (expo-iap 6.4.2 index.d.ts: „The result arrives through purchaseUpdatedListener / purchaseErrorListener … not the return value”; przegląd D-043 P1-1)', () => {
  it('requestPurchase bez transakcji (null) → oczekuje, nie zakonczony; bez finishTransaction', async () => {
    I.requestPurchase!.mockResolvedValueOnce(null);
    expect(await utworzSklep().kup(ROK!)).toBe('oczekuje');
    expect(I.finishTransaction).not.toHaveBeenCalled();
  });

  it('zwrócona transakcja w stanie pending (np. zgoda rodzica) → oczekuje, bez finishTransaction', async () => {
    I.requestPurchase!.mockResolvedValueOnce(zakup(ROK!, { purchaseState: 'pending' }));
    expect(await utworzSklep().kup(ROK!)).toBe('oczekuje');
    expect(I.finishTransaction).not.toHaveBeenCalled();
  });

  it('zwrócona transakcja innego produktu → oczekuje (wynik dla kupowanego przyjdzie z nasłuchu)', async () => {
    I.requestPurchase!.mockResolvedValueOnce(zakup(KWARTAL!, { expirationDateIOS: TERAZ + 1 }));
    expect(await utworzSklep().kup(ROK!)).toBe('oczekuje');
  });

  it('nasłuch: zakup → finishTransaction i „zakonczona”; pending → „oczekuje”; anulowanie i błąd z purchaseErrorListener; odpięcie', async () => {
    const zdarzenia: string[] = [];
    const odepnij = utworzSklep().nasluchuj((z) => void zdarzenia.push(z));
    const naZakup = I.purchaseUpdatedListener!.mock.calls[0]![0] as (p: unknown) => void;
    const naBlad = I.purchaseErrorListener!.mock.calls[0]![0] as (e: unknown) => void;
    const p = zakup(ROK!, { expirationDateIOS: TERAZ + 1 });
    naZakup(p);
    await Promise.resolve();
    await Promise.resolve();
    expect(I.finishTransaction).toHaveBeenCalledWith({ purchase: p, isConsumable: false });
    naZakup(zakup(ROK!, { purchaseState: 'pending' }));
    naZakup({ bez: 'pola' });
    naBlad(blad('user-cancelled'));
    naBlad(blad('service-error'));
    await new Promise((r) => setTimeout(r, 0));
    // „zakonczona” po finishTransaction (dwie mikrozadania wyżej), reszta od razu; wiersz bez productId pominięty
    expect(zdarzenia).toEqual(['zakonczona', 'oczekuje', 'anulowano', 'blad']);
    odepnij();
    expect(I.purchaseUpdatedListener!.mock.results[0]!.value.remove).toHaveBeenCalled();
    expect(I.purchaseErrorListener!.mock.results[0]!.value.remove).toHaveBeenCalled();
  });
});
