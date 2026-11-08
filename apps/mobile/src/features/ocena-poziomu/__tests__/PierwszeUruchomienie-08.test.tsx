/// <reference types="jest" />
// Bramka pierwszego uruchomienia (rola 08 cz. 5b krok 3; PR-01, flow 05): powitanie → ocena → „Dziś”; przerwana ocena po
// ponownym uruchomieniu od pierwszego pytania z „Pomiń”, bez powitania (BR-ONB-001-c); zapis w postep.db (node:sqlite).
import '@/i18n';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { Text } from 'react-native';
import i18n from '@/i18n';
import { opisKart } from '@/features/stol/uklad';
import type { Drill } from '@szkola/content-schema';
import type { DrillRow } from '@/data/content/repo';
import PierwszeUruchomienie from '@/features/ocena-poziomu/PierwszeUruchomienie';
import { PYTANIA_OCENY } from '@/features/ocena-poziomu/ocenaPoziomu';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const T0 = Date.UTC(2026, 10, 8, 10);
const MODULY = ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'].map((id, i) => ({ id, title: `Moduł ${i}`, pierwszaLekcja: `Lekcja ${i}.1` }));
const choice = (id: string): Drill =>
  ({ kind: 'choice', id, family: 'f', rules: [], prompt: `Pytanie ${id}`, options: [{ text: `Dobra ${id}`, correct: true, why: 'a' }, { text: `Zła ${id}`, correct: false, why: 'b' }] }) as unknown as Drill;
const WIERSZE = new Map<string, DrillRow>(PYTANIA_OCENY.map((p) => [p.zadanieId, { id: p.zadanieId, lessonId: null, family: 'f', drill: choice(p.zadanieId) }]));
const zegar = utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => T0);

function Bramka({ port }: { port: Awaited<ReturnType<typeof portTestowy>>['port'] }) {
  return (
    <PierwszeUruchomienie port={port} moduly={MODULY} wiersz={(id) => WIERSZE.get(id)} zegar={zegar}>
      <Text>DZIŚ</Text>
    </PierwszeUruchomienie>
  );
}

describe('pierwsze uruchomienie', () => {
  it('08-F29: pytanie ze stołem rysuje `Stol` (obraz z etykietą dla VoiceOver), nie `TableFelt`', async () => {
    const { port } = await portTestowy();
    const pierwsze = PYTANIA_OCENY[0]!.zadanieId;
    const zStolem = new Map(WIERSZE);
    zStolem.set(pierwsze, { ...WIERSZE.get(pierwsze)!, drill: { ...choice(pierwsze), table: { hand: 'Jc 9d', board: 'Ts 7h 2c' } } as unknown as Drill });
    await render(
      <PierwszeUruchomienie port={port} moduly={MODULY} wiersz={(id) => zStolem.get(id)} zegar={zegar}>
        <Text>DZIŚ</Text>
      </PierwszeUruchomienie>,
    );
    await screen.findByText(/bez gry na pieniądze/);
    await fireEvent.press(screen.getByRole('button', { name: 'Dalej' }));
    await screen.findByText(`Pytanie ${pierwsze}`);
    const etykieta = opisKart({ hand: ['Jc', '9d'], board: ['Ts', '7h', '2c'] }, i18n.t.bind(i18n));
    expect(screen.getByRole('image').props.accessibilityLabel).toBe(etykieta);
    expect(screen.queryByText('Twoje karty')).toBeNull(); // podpis starego `TableFelt`
  });

  it('08-F29: `TableFelt` bez użyć w kodzie apps/mobile/src (komponent usunięty)', () => {
    const src = join(__dirname, '..', '..', '..');
    const pliki = (d: string): string[] => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? pliki(join(d, n)) : /\.tsx?$/.test(n) ? [join(d, n)] : []));
    // testy pomijane: strażnik sesji (`sesja-ekran-08`) wymienia nazwę w asercji „nie zawiera”
    expect(pliki(src).filter((f) => !f.includes('__tests__') && /\bTableFelt\b/.test(readFileSync(f, 'utf8')))).toEqual([]);
  });

  it('BR-ONB-001-b: powitanie → Dalej → pytanie 1 → Pomiń → „Dziś”, punkt startu M0', async () => {
    const { port, db } = await portTestowy();
    await render(<Bramka port={port} />);
    await screen.findByText(/bez gry na pieniądze/);
    expect(screen.queryByText('DZIŚ')).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Dalej' }));
    await screen.findByText('Pytanie m0.exam.q1');
    await fireEvent.press(screen.getByRole('button', { name: 'Pomiń' }));
    await screen.findByText('DZIŚ');
    expect(JSON.parse((db.prepare("SELECT wartosc FROM ustawienie WHERE klucz = 'punkt_startu'").get() as { wartosc: string }).wartosc)).toEqual({ modulId: 'm0', ustawionoMs: T0 });
  });

  it('BR-ONB-001-c: przerwana po pierwszej odpowiedzi → po ponownym uruchomieniu pytanie 1 i „Pomiń”, bez powitania', async () => {
    const { port, sciezka } = await portTestowy();
    const pierwszy = await render(<Bramka port={port} />);
    await screen.findByText(/bez gry na pieniądze/);
    await fireEvent.press(screen.getByRole('button', { name: 'Dalej' }));
    await screen.findByText('Pytanie m0.exam.q1');
    await fireEvent.press(screen.getByRole('button', { name: /^Dobra m0/ }));
    await screen.findByText('Pytanie m1.exam.q2');
    pierwszy.unmount();
    await port.zamknij();
    const drugi = await portTestowy(sciezka);
    await render(<Bramka port={drugi.port} />);
    await screen.findByText('Pytanie m0.exam.q1');
    expect(screen.queryByText(/bez gry na pieniądze/)).toBeNull();
    expect(screen.getByRole('button', { name: 'Pomiń' })).toBeTruthy();
  });

  it('BR-ONB-001-a/BR-ONB-002: wszystkie odpowiedzi → punkt startu z regułą wyniku i „Zacznij naukę” → „Dziś”', async () => {
    const { port, db } = await portTestowy();
    await render(<Bramka port={port} />);
    await screen.findByText(/bez gry na pieniądze/);
    await fireEvent.press(screen.getByRole('button', { name: 'Dalej' }));
    for (const p of PYTANIA_OCENY) {
      await screen.findByText(`Pytanie ${p.zadanieId}`);
      await fireEvent.press(screen.getByRole('button', { name: new RegExp(`^${p.modulId === 'm2' ? 'Zła' : 'Dobra'} ${p.zadanieId.replace(/\./g, '\\.')}`) }));
    }
    await screen.findByText(/Moduł 2/);
    expect(screen.getByText(/Lekcja 2\.1/)).toBeTruthy();
    expect(screen.queryByText(/\$|zł|Przywróć zakupy/)).toBeNull(); // bez ekranu zakupu na końcu (D-105)
    await fireEvent.press(screen.getByRole('button', { name: 'Zacznij naukę' }));
    await screen.findByText('DZIŚ');
    await waitFor(() => expect(JSON.parse((db.prepare("SELECT wartosc FROM ustawienie WHERE klucz = 'punkt_startu'").get() as { wartosc: string }).wartosc).modulId).toBe('m2'));
  });

  it('punkt startu zapisany → od razu „Dziś”', async () => {
    const { port, db } = await portTestowy();
    db.prepare("INSERT INTO ustawienie (klucz, wartosc, zmieniono_ms) VALUES ('punkt_startu', ?, ?)").run(JSON.stringify({ modulId: 'm0', ustawionoMs: T0 }), T0);
    await render(<Bramka port={port} />);
    await screen.findByText('DZIŚ');
  });
});
