// Pakiety z modułami natywnymi podmieniamy w testach w całości.
// EAS Observe (ExpoObserve, ExpoAppMetrics) instaluje przy imporcie globalny handler błędów; tu zostają tylko metryki startu.
jest.mock('expo-observe', () => {
  const Observe = { configure: jest.fn(), markInteractive: jest.fn(), dispatchEvents: jest.fn(() => Promise.resolve()) };
  const ObserveRoot = ({ children }) => children;
  return { Observe, default: Observe, ObserveRoot, useObserve: () => ({ markInteractive: Observe.markInteractive }) };
});

// Sentry: testy sprawdzają wywołania przez jest.requireMock('@sentry/react-native'). ErrorBoundary odwzorowuje kontrakt
// Sentry.ErrorBoundary (fallback jako element albo funkcja z { error, componentStack, resetError }).
jest.mock('@sentry/react-native', () => {
  const React = require('react');
  const captureException = jest.fn();
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error) {
      captureException(error);
    }
    render() {
      if (this.state.error === null) return this.props.children;
      const f = this.props.fallback;
      return typeof f === 'function' ? f({ error: this.state.error, componentStack: '', resetError: () => this.setState({ error: null }) }) : f;
    }
  }
  return {
    init: jest.fn(),
    setUser: jest.fn(),
    captureException,
    breadcrumbsIntegration: jest.fn((opts) => ({ name: 'Breadcrumbs', opts })),
    wrap: (c) => c,
    ErrorBoundary,
  };
});
