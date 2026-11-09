/// <reference types="jest" />
/**
 * Przegląd sesji P (plan-09 §13, ŚREDNIE, przed drugim językiem): zmiana języka zmieniała `databaseName` w `SQLiteProvider`,
 * który na czas otwierania nowej bazy zwraca null — drzewo nawigacji było montowane od nowa (użytkownik wracał na start).
 * `ProviderTresci`: nowa baza otwierana obok starej, podmiana w kontekście po otwarciu, stara zamykana po podmianie.
 */
import { Component, useEffect, type ReactNode } from 'react';
import { Text } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';
import type { SQLiteDatabase } from 'expo-sqlite';
import { ProviderTresci, useBazaTresci } from '../kontekst';

type Atrapa = { plik: string; closeAsync: jest.Mock };
function atrapy() {
  const bazy = new Map<string, Atrapa>();
  const czekajace = new Map<string, { ok: () => void; blad: (e: unknown) => void }>();
  const otworz = jest.fn(
    (plik: string) =>
      new Promise<SQLiteDatabase>((ok, blad) => {
        const db: Atrapa = { plik, closeAsync: jest.fn(async () => undefined) };
        bazy.set(plik, db);
        czekajace.set(plik, { ok: () => ok(db as unknown as SQLiteDatabase), blad });
      }),
  );
  const zwolnij = async (plik: string, e?: unknown) => {
    await act(async () => {
      const c = czekajace.get(plik)!;
      if (e === undefined) c.ok();
      else c.blad(e);
    });
  };
  return { bazy, otworz, zwolnij };
}

let montowania = 0;
function Dziecko() {
  const db = useBazaTresci() as unknown as Atrapa;
  useEffect(() => {
    montowania += 1;
  }, []);
  return <Text>{db.plik}</Text>;
}

class Granica extends Component<{ children: ReactNode }, { blad: unknown }> {
  state = { blad: null };
  static getDerivedStateFromError(blad: unknown) {
    return { blad };
  }
  render() {
    return this.state.blad ? <Text>granica</Text> : this.props.children;
  }
}

describe('ProviderTresci: zmiana bazy treści bez przemontowania drzewa (sesja P, plan-09 §13)', () => {
  beforeEach(() => {
    montowania = 0;
  });

  it('zmiana pliku: dzieci zostają zamontowane, do otwarcia nowej widać starą, stara zamknięta po podmianie', async () => {
    const { bazy, otworz, zwolnij } = atrapy();
    const onBlad = jest.fn();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={onBlad}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    expect(screen.getByText('tresc-pl.db')).toBeTruthy();
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={onBlad}><Dziecko /></ProviderTresci>);
    expect(screen.getByText('tresc-pl.db')).toBeTruthy(); // nowa jeszcze się otwiera
    await zwolnij('tresc-en.db');
    expect(screen.getByText('tresc-en.db')).toBeTruthy();
    expect(montowania).toBe(1);
    expect(bazy.get('tresc-pl.db')!.closeAsync).toHaveBeenCalledTimes(1);
    expect(bazy.get('tresc-en.db')!.closeAsync).not.toHaveBeenCalled();
    expect(onBlad).not.toHaveBeenCalled();
  });

  it('błąd otwarcia nowej bazy: zostaje stara (otwarta), błąd przekazany', async () => {
    const { bazy, otworz, zwolnij } = atrapy();
    const onBlad = jest.fn();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={onBlad}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={onBlad}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-en.db', new Error('plik'));
    expect(screen.getByText('tresc-pl.db')).toBeTruthy();
    expect(montowania).toBe(1);
    expect(bazy.get('tresc-pl.db')!.closeAsync).not.toHaveBeenCalled();
    expect(onBlad).toHaveBeenCalledTimes(1);
  });

  it('szybka zmiana pl → en → de: baza otwarta za późno jest zamykana, zostaje ostatni wybór', async () => {
    const { bazy, otworz, zwolnij } = atrapy();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    await r.rerender(<ProviderTresci plik="tresc-de.db" otworz={otworz} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-de.db');
    await zwolnij('tresc-en.db');
    expect(screen.getByText('tresc-de.db')).toBeTruthy();
    expect(bazy.get('tresc-en.db')!.closeAsync).toHaveBeenCalledTimes(1);
    expect(bazy.get('tresc-de.db')!.closeAsync).not.toHaveBeenCalled();
    expect(montowania).toBe(1);
  });

  it('błąd pierwszego otwarcia (brak żadnej bazy): do granicy błędu, jak dotąd SQLiteProvider', async () => {
    const { otworz, zwolnij } = atrapy();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    await render(<Granica><ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={() => undefined}><Dziecko /></ProviderTresci></Granica>);
    await zwolnij('tresc-pl.db', new Error('plik'));
    expect(screen.getByText('granica')).toBeTruthy();
  });

  it('P2(c) przeglądu D-043 sesji Q: błąd otwarcia trafia do bieżącego onBlad (zmiana propsu w trakcie otwierania)', async () => {
    const { otworz, zwolnij } = atrapy();
    const stary = jest.fn();
    const nowy = jest.fn();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={stary}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={stary}><Dziecko /></ProviderTresci>);
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={nowy}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-en.db', new Error('plik'));
    expect(nowy).toHaveBeenCalledTimes(1);
    expect(stary).not.toHaveBeenCalled();
  });

  it('P2(c): nowa funkcja otworz przy tym samym pliku nie otwiera bazy ponownie', async () => {
    const { otworz, zwolnij } = atrapy();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={(p) => otworz(p)} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    await r.rerender(<ProviderTresci plik="tresc-pl.db" otworz={(p) => otworz(p)} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    expect(otworz).toHaveBeenCalledTimes(1);
  });

  it('P2(a): onPierwszeOtwarcie raz, dopiero gdy dzieci widzą bazę (ekran startowy bez pustej klatki); zmiana pliku go nie woła', async () => {
    const { otworz, zwolnij } = atrapy();
    const widoczne: boolean[] = [];
    const onPierwsze = jest.fn(() => widoczne.push(screen.queryByText('tresc-pl.db') !== null));
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={() => undefined} onPierwszeOtwarcie={onPierwsze}><Dziecko /></ProviderTresci>);
    expect(onPierwsze).not.toHaveBeenCalled();
    await zwolnij('tresc-pl.db');
    expect(onPierwsze).toHaveBeenCalledTimes(1);
    expect(widoczne).toEqual([true]);
    await r.rerender(<ProviderTresci plik="tresc-en.db" otworz={otworz} onBlad={() => undefined} onPierwszeOtwarcie={onPierwsze}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-en.db');
    expect(onPierwsze).toHaveBeenCalledTimes(1);
  });

  it('P2(a): błąd pierwszego otwarcia też kończy start (ekran startowy zdjęty, granica błędu widoczna)', async () => {
    const { otworz, zwolnij } = atrapy();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const onPierwsze = jest.fn();
    await render(<Granica><ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={() => undefined} onPierwszeOtwarcie={onPierwsze}><Dziecko /></ProviderTresci></Granica>);
    await zwolnij('tresc-pl.db', new Error('plik'));
    expect(screen.getByText('granica')).toBeTruthy();
    expect(onPierwsze).toHaveBeenCalledTimes(1);
  });

  it('odmontowanie zamyka bieżącą bazę', async () => {
    const { bazy, otworz, zwolnij } = atrapy();
    const r = await render(<ProviderTresci plik="tresc-pl.db" otworz={otworz} onBlad={() => undefined}><Dziecko /></ProviderTresci>);
    await zwolnij('tresc-pl.db');
    await r.unmount();
    expect(bazy.get('tresc-pl.db')!.closeAsync).toHaveBeenCalledTimes(1);
  });
});
