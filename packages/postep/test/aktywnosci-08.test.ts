// Repozytorium `aktywnosci`, część 5 (rola 08 krok 3): start, wznowienie, zakończenie w jednej transakcji, porzucenie, zużycie dnia.
// Wyrocznia: moduly.md „Maszyny stanów” (tabela `aktywnosc`: zapis przy każdym przejściu; ostatnia odpowiedź + koniec_ms
// + wynik_testu w jednej transakcji; powtórki: odpowiedź + karta/log w jednej transakcji), „Kurs” (ukończenie lekcji =
// zakończenie aktywności `lekcja`), ADR 0007 (zużycie = aktywności z limitu w dniu lokalnym), D-248 (plan z zadaniami).
import { afterEach, describe, expect, it } from 'vitest';
import type { AktywnoscWToku } from '../../domena/src';
import {
  aktywnoscWToku, odpowiedziAktywnosci, porzucAktywnosc, zacznijAktywnosc, zakonczAktywnosc, zapiszKrok, zuzyteDzis,
  type OdpowiedzKroku, type PowtorkaKroku,
} from '../src';
import { adapterNode, ile, otworzNode } from '../../../tests/narzedzia/postep-node';
import { DZIEN_WZORCA, T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { otworzPostep } from '../src';
import { przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

const SESJA: AktywnoscWToku = {
  stan: 'w_toku', rodzaj: 'sesja', zLimitu: true, dzienLokalny: '2026-11-08', strefa: 'Europe/Warsaw', startMs: T0, krok: 0,
  plan: { liczbaKrokow: 3, trescId: null, zadania: [{ id: 'z1', ziarno: 11 }, { id: 'z2', ziarno: 12 }, { id: 'z3', ziarno: 13 }] },
};
const TEST: AktywnoscWToku = { ...SESJA, rodzaj: 'test_modulu', plan: { liczbaKrokow: 1, trescId: 'm01', zadania: [{ id: 'm01-t1', ziarno: 0 }] } };
const LEKCJA: AktywnoscWToku = { ...SESJA, rodzaj: 'lekcja', zLimitu: false, plan: { liczbaKrokow: 1, trescId: 'm01-l2', zadania: [{ id: 'm01-l2-z1', ziarno: 0 }] } };
const odp = (krok: number, zadanie = `z${krok + 1}`): OdpowiedzKroku => ({
  krok, zadanie_id: zadanie, rodzina_id: 'r1', wybor: '{"akcja":"call"}', ocena: 'zgodne', zaliczona: 1, czas_ms: 1200, odpowiedziano_ms: T0 + krok,
});
const stan = (db: ReturnType<typeof otworzNode>, id: string) => db.prepare('SELECT stan, krok, koniec_ms FROM aktywnosc WHERE id = ?').get(id);

describe('start i wznowienie', () => {
  it('zacznij → w toku tego rodzaju z planem (także zadaniami); inny rodzaj i zamknięte nie są „w toku”', async () => {
    const { port } = await przygotuj('pusta');
    expect(await zacznijAktywnosc(port, 'a1', SESJA)).toEqual({ ok: true, wartosc: undefined });
    expect(await aktywnoscWToku(port, 'sesja')).toEqual({ ok: true, wartosc: { id: 'a1', aktywnosc: SESJA } });
    expect(await aktywnoscWToku(port, 'powtorki')).toEqual({ ok: true, wartosc: null });
    await zakonczAktywnosc(port, 'a1', T0 + 9);
    expect(await aktywnoscWToku(port, 'sesja')).toEqual({ ok: true, wartosc: null });
  });
  it('wznowienie po zabiciu aplikacji: nowy port na tym samym pliku widzi krok i odpowiedzi w kolejności kroku', async () => {
    const { port, sciezka } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'a1', SESJA);
    await zapiszKrok(port, 'a1', odp(1), 2); // kolejność zapisu inna niż kroków
    await zapiszKrok(port, 'a1', odp(0), 1);
    await port.zamknij();
    const port2 = await otworzPostep(adapterNode(otworzNode(sciezka)));
    expect(await aktywnoscWToku(port2, 'sesja')).toEqual({ ok: true, wartosc: { id: 'a1', aktywnosc: { ...SESJA, krok: 2 } } });
    expect(await odpowiedziAktywnosci(port2, 'a1')).toEqual({ ok: true, wartosc: [odp(0), odp(1)] });
  });
  it('porzuć i zacznij: stara porzucona z koniec_ms w tej samej transakcji; błąd startu (zajęte id) zostawia starą w toku', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'a1', SESJA);
    expect(await zacznijAktywnosc(port, 'a1', SESJA, { id: 'a1', teraz: T0 + 5 })).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(stan(db, 'a1')).toEqual({ stan: 'w_toku', krok: 0, koniec_ms: null });
    expect(await zacznijAktywnosc(port, 'a2', SESJA, { id: 'a1', teraz: T0 + 5 })).toEqual({ ok: true, wartosc: undefined });
    expect(stan(db, 'a1')).toEqual({ stan: 'porzucona', krok: 0, koniec_ms: T0 + 5 });
    expect((await aktywnoscWToku(port, 'sesja')).ok && (await aktywnoscWToku(port, 'sesja'))).toMatchObject({ wartosc: { id: 'a2' } });
  });
  it('dwie aktywności w toku tego rodzaju (schemat nie zabrania) → wznawiana najnowsza (start_ms)', async () => {
    const { port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'stara', { ...SESJA, startMs: T0 });
    await zacznijAktywnosc(port, 'nowa', { ...SESJA, startMs: T0 + 10 });
    const w = await aktywnoscWToku(port, 'sesja');
    expect(w.ok && w.wartosc?.id).toBe('nowa');
  });
  it('wiersz w toku z planem spoza kształtu PlanAktywnosci → odczyt_nieudany (nie cichy brak aktywności)', async () => {
    const { port } = await przygotuj('wzorzec'); // a-scen: plan {"scenariusz":"s01"} (08-F12)
    expect(await aktywnoscWToku(port, 'scenariusz')).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('zakończenie i porzucenie', () => {
  it('test: ostatnia odpowiedź, koniec_ms i wynik_testu w jednej transakcji', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 't1', TEST);
    const w = await zakonczAktywnosc(port, 't1', T0 + 50, { ostatnia: odp(0, 'm01-t1'), wynikTestu: { modulId: 'm01', poprawne: 1, wszystkie: 1, zaliczony: true } });
    expect(w).toEqual({ ok: true, wartosc: undefined });
    expect(stan(db, 't1')).toEqual({ stan: 'zakonczona', krok: 0, koniec_ms: T0 + 50 });
    expect(db.prepare('SELECT * FROM wynik_testu').all()).toEqual([{ aktywnosc_id: 't1', modul_id: 'm01', poprawne: 1, wszystkie: 1, zaliczony: 1 }]);
    expect(ile(db, 'odpowiedz')).toBe(1);
  });
  it('błąd w środku zakończenia (wynik niezgodny z CHECK) → nic nie zapisane: aktywność w toku, bez odpowiedzi i wyniku', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 't1', TEST);
    const w = await zakonczAktywnosc(port, 't1', T0 + 50, { ostatnia: odp(0, 'm01-t1'), wynikTestu: { modulId: 'm01', poprawne: 2, wszystkie: 1, zaliczony: true } });
    expect(w).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(stan(db, 't1')).toEqual({ stan: 'w_toku', krok: 0, koniec_ms: null });
    expect([ile(db, 'odpowiedz'), ile(db, 'wynik_testu')]).toEqual([0, 0]);
  });
  it('lekcja: zakończenie ustawia postep_lekcji.ukonczono_ms; teoria i miejsce zostają; pierwsze ukończenie nie jest nadpisywane', async () => {
    const { db, port } = await przygotuj('wzorzec');
    const przed = db.prepare("SELECT teoria_przeczytana, miejsce FROM postep_lekcji WHERE lekcja_id = 'm01-l2'").get();
    await zacznijAktywnosc(port, 'l1', LEKCJA);
    expect(await zakonczAktywnosc(port, 'l1', T0 + 70, { ostatnia: odp(0, 'm01-l2-z1'), lekcjaId: 'm01-l2' })).toEqual({ ok: true, wartosc: undefined });
    expect(db.prepare("SELECT teoria_przeczytana, miejsce FROM postep_lekcji WHERE lekcja_id = 'm01-l2'").get()).toEqual(przed);
    expect(db.prepare("SELECT ukonczono_ms, zmieniono_ms FROM postep_lekcji WHERE lekcja_id = 'm01-l2'").get()).toEqual({ ukonczono_ms: T0 + 70, zmieniono_ms: T0 + 70 });
    await zacznijAktywnosc(port, 'l2', LEKCJA);
    await zakonczAktywnosc(port, 'l2', T0 + 90, { lekcjaId: 'm01-l2' });
    expect(db.prepare("SELECT ukonczono_ms FROM postep_lekcji WHERE lekcja_id = 'm01-l2'").get()).toEqual({ ukonczono_ms: T0 + 70 });
  });
  it('zakończenie albo porzucenie aktywności już zamkniętej → zapis_nieudany, stan bez zmian (zakonczona/porzucona są końcowe)', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'a1', SESJA);
    expect(await porzucAktywnosc(port, 'a1', T0 + 1)).toEqual({ ok: true, wartosc: undefined });
    expect(await zakonczAktywnosc(port, 'a1', T0 + 2)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(await porzucAktywnosc(port, 'a1', T0 + 3)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(stan(db, 'a1')).toEqual({ stan: 'porzucona', krok: 0, koniec_ms: T0 + 1 });
  });
});

describe('powtórki: odpowiedź, karta i log w jednej transakcji', () => {
  const powt: PowtorkaKroku = {
    karta: { rodzina_id: 'r1', termin_ms: T0 + 86_400_000, stabilnosc: 2, trudnosc: 5, dni_zaplanowane: 1, kroki_nauki: 0, powtorzenia: 1, zapomnienia: 0, stan: 2, ostatnia_powtorka_ms: T0, zmieniono_ms: T0 },
    log: { ocena_fsrs: 3, stan_przed: 0, termin_przed_ms: T0, powtorzono_ms: T0 },
  };
  it('log wskazuje zapisaną odpowiedź', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'p1', { ...SESJA, rodzaj: 'powtorki' });
    const w = await zapiszKrok(port, 'p1', odp(0), 1, powt);
    expect(w.ok).toBe(true);
    expect(db.prepare('SELECT rodzina_id, odpowiedz_id FROM log_powtorki').all()).toEqual([{ rodzina_id: 'r1', odpowiedz_id: w.ok ? w.wartosc : -1 }]);
    expect(db.prepare('SELECT termin_ms FROM karta').all()).toEqual([{ termin_ms: T0 + 86_400_000 }]);
  });
  it('błąd zapisu karty → odpowiedź i krok wycofane', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'p1', { ...SESJA, rodzaj: 'powtorki' });
    const zla = { ...powt, karta: { ...powt.karta, powtorzenia: -1 } };
    expect(await zapiszKrok(port, 'p1', odp(0), 1, zla)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect([ile(db, 'odpowiedz'), ile(db, 'karta'), ile(db, 'log_powtorki')]).toEqual([0, 0, 0]);
    expect(stan(db, 'p1')).toEqual({ stan: 'w_toku', krok: 0, koniec_ms: null });
  });
  it('ostatnia powtórka przy zakończeniu: też karta i log w tej samej transakcji', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'p1', { ...SESJA, rodzaj: 'powtorki' });
    expect(await zakonczAktywnosc(port, 'p1', T0 + 5, { ostatnia: odp(2), powtorka: powt })).toEqual({ ok: true, wartosc: undefined });
    expect([ile(db, 'odpowiedz'), ile(db, 'karta'), ile(db, 'log_powtorki')]).toEqual([1, 1, 1]);
  });
});

describe('zużycie dnia (ADR 0007)', () => {
  it('liczy aktywności z limitu danego dnia lokalnego, także zakończone i porzucone; bez limitu i inne dni nie', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await zuzyteDzis(port, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: 3 }); // a-sesja, a-powt (porzucona), a-scen (w toku)
    expect(await zuzyteDzis(port, '2026-10-07')).toEqual({ ok: true, wartosc: 0 }); // a-test bez limitu
    expect(await zuzyteDzis(port, '2026-10-08')).toEqual({ ok: true, wartosc: 1 });
    expect(await zuzyteDzis(port, '2030-01-01')).toEqual({ ok: true, wartosc: 0 });
  });
});
