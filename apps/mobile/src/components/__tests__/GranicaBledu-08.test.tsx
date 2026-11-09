/// <reference types="jest" />
// P1 z przeglądu D-043 sesji R: wyjątek przy pierwszym renderze nawigacji (pod `ProviderTresci`) nie zatwierdza poddrzewa,
// więc `onPierwszeOtwarcie` nie pada, a ekran startowy (zdejmowany po nim, D-329) zakrywał ekran błędu bez końca.
// Granica błędu zgłasza błąd (`onBlad`), a układ główny zdejmuje wtedy ekran startowy.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { GranicaBledu } from '@/components/GranicaBledu';

jest.mock('@/platform/dziennik', () => ({ zapiszBlad: jest.fn() }));

function Rzuca(): React.JSX.Element {
  throw new Error('render');
}

describe('GranicaBledu: zgłoszenie błędu renderu (P1 przeglądu D-043 sesji R)', () => {
  it('wyjątek dziecka → ekran zastępczy i onBlad raz', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const onBlad = jest.fn();
    await render(<GranicaBledu fallback={() => <Text>zastepczy</Text>} onBlad={onBlad}><Rzuca /></GranicaBledu>);
    expect(screen.getByText('zastepczy')).toBeTruthy();
    expect(onBlad).toHaveBeenCalledTimes(1);
  });
  it('strażnik: układ główny przekazuje granicy to samo zgłoszenie startu co ProviderTresci (ekran startowy schodzi przy błędzie renderu)', () => {
    const kod = readFileSync(join(__dirname, '../../app/_layout.tsx'), 'utf8');
    expect(kod).toMatch(/<GranicaBledu fallback=\{[^\n]*\} onBlad=\{pierwszeOtwarcie\}>/);
  });
});
