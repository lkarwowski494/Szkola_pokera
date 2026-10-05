/// <reference types="jest" />
import { fireEvent, render, screen } from '@testing-library/react-native';
import { ObserveErrorBoundary } from 'expo-observe';
import { Text } from 'react-native';
import { RenderErrorScreen } from '@/components/RenderErrorScreen';
import { parseSeen } from '@/features/advancement/contentChange';
import { configureObserve, reportError } from '@/observability/observe';

const { Observe } = jest.requireMock<{ Observe: { configure: jest.Mock; reportError: jest.Mock } }>('expo-observe');

describe('EAS Observe', () => {
  beforeEach(() => {
    Observe.configure.mockClear();
    Observe.reportError.mockReset();
  });

  it('konfiguracja: jedno wywołanie, integracja expo-router, bez własnych atrybutów i bez wysyłania w trybie debug', () => {
    configureObserve();
    expect(Observe.configure).toHaveBeenCalledTimes(1);
    const cfg = Observe.configure.mock.calls[0][0];
    expect(cfg).toEqual({ integrations: { 'expo-router': true } });
    expect(cfg).not.toHaveProperty('dispatchInDebug');
  });

  it('reportError przekazuje błąd i nigdy nie rzuca, nawet gdy Observe zawiedzie', () => {
    const e = new Error('x');
    reportError(e);
    expect(Observe.reportError).toHaveBeenCalledWith(e);
    Observe.reportError.mockImplementation(() => {
      throw new Error('moduł natywny niedostępny');
    });
    expect(() => reportError(e)).not.toThrow();
  });

  it('uszkodzony zapis w user.db: parseSeen zwraca null i zgłasza błąd', () => {
    expect(parseSeen('{zepsute')).toBeNull();
    expect(Observe.reportError).toHaveBeenCalledTimes(1);
    expect(parseSeen(null)).toBeNull();
    expect(Observe.reportError).toHaveBeenCalledTimes(1);
  });

  it('granica błędów pokazuje ekran zastępczy, a „Spróbuj ponownie” montuje drzewo od nowa', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    let fail = true;
    function Boom() {
      if (fail) throw new Error('render');
      return <Text>działa</Text>;
    }
    // granica z jest.setup.js odwzorowuje kontrakt AppMetricsErrorBoundary (fallback jako funkcja z resetError)
    await render(
      <ObserveErrorBoundary fallback={({ resetError }) => <RenderErrorScreen onRetry={resetError} />}>
        <Boom />
      </ObserveErrorBoundary>,
    );
    expect(screen.getByText('Coś poszło nie tak')).toBeTruthy();
    expect(Observe.reportError).toHaveBeenCalled();
    fail = false;
    await fireEvent.press(screen.getByText('Spróbuj ponownie'));
    expect(screen.getByText('działa')).toBeTruthy();
  });
});
