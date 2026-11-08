/// <reference types="jest" />
// 08 część 6 krok 6 (D-274): `SkalaStopni` — trzy przedziały, twój złotą obwódką (zrzut), opis dla czytnika.
import '@/i18n';
import i18n from 'i18next';
import { render, screen } from '@testing-library/react-native';
import { SkalaStopni } from '@/components/SkalaStopni';
import { etykietaSkali, przedzialySkali } from '@/features/stol/skala';

const t = i18n.t.bind(i18n);

it('trzy przedziały ze słowem i zakresem, twój oznaczony (selected), opis dla czytnika z częstości i oceny', async () => {
  await render(<SkalaStopni czestosc={0.2} ocena="dopuszczalne" />);
  expect(screen.getByRole('image').props.accessibilityLabel).toBe(etykietaSkali(0.2, 'dopuszczalne', t));
  for (const p of przedzialySkali('dopuszczalne', t)) {
    expect(screen.getByText(p.zakres)).toBeTruthy();
    expect(screen.getByTestId(`przedzial-${p.stopien}`).props.accessibilityState).toEqual({ selected: p.twoj });
  }
});
