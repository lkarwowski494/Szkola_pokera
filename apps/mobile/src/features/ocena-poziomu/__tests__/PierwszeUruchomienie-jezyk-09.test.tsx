/// <reference types="jest" />
// D-357 (rola 09, E2E 42665157453, flow 08): zmiana języka podmienia bazę treści, więc `BramkaStartu` (_layout.tsx) daje
// nowe `moduly` i `wiersz`. Po ukończonym starcie bramka nie może wrócić do „ładowania”: odmontowałaby nawigację, a ta
// startuje od nowa na „Dziś” (użytkownik po wyborze języka trafiał z ekranu „Język” na „Dziś”).
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';
import type { Drill } from '@szkola/content-schema';
import type { DrillRow } from '@/data/content/repo';
import PierwszeUruchomienie from '@/features/ocena-poziomu/PierwszeUruchomienie';
import { PYTANIA_OCENY } from '@/features/ocena-poziomu/ocenaPoziomu';
import { utworzZegar } from '@/platform/zegar';
import { portTestowy } from '@/test-utils/postepTestowy';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const zegar = utworzZegar({ kalendarz: () => 'Europe/Warsaw', intl: () => null }, () => Date.UTC(2026, 10, 9, 10));
const moduly = (jezyk: string) => ['m0', 'm1'].map((id, i) => ({ id, title: `${jezyk} ${i}`, pierwszaLekcja: `${jezyk} ${i}.1` }));
const choice = (id: string): Drill =>
  ({ kind: 'choice', id, family: 'f', rules: [], prompt: `Pytanie ${id}`, options: [{ text: 'a', correct: true, why: 'a' }, { text: 'b', correct: false, why: 'b' }] }) as unknown as Drill;
const wiersze = new Map<string, DrillRow>(PYTANIA_OCENY.map((p) => [p.zadanieId, { id: p.zadanieId, lessonId: null, family: 'f', drill: choice(p.zadanieId) }]));

let montowania = 0;
function Nawigacja() {
  useEffect(() => {
    montowania++;
  }, []);
  return <Text>NAWIGACJA</Text>;
}

it('po ukończonym starcie nowa baza treści (zmiana języka) nie odmontowuje nawigacji', async () => {
  const { port } = await portTestowy();
  montowania = 0;
  const widok = (jezyk: string) => (
    <PierwszeUruchomienie port={port} moduly={moduly(jezyk)} wiersz={(id) => wiersze.get(id)} zegar={zegar}>
      <Nawigacja />
    </PierwszeUruchomienie>
  );
  const { rerender } = await render(widok('pl'));
  await screen.findByText(/bez gry na pieniądze/);
  await fireEvent.press(screen.getByRole('button', { name: 'Dalej' }));
  await fireEvent.press(await screen.findByRole('button', { name: 'Pomiń' }));
  await screen.findByText('NAWIGACJA');
  expect(montowania).toBe(1);

  await rerender(widok('en'));
  await new Promise((r) => setTimeout(r, 50));
  expect(screen.getByText('NAWIGACJA')).toBeTruthy();
  expect(montowania).toBe(1);
});
