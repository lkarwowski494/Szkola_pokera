// EAS Observe ma moduł natywny (ExpoObserve, ExpoAppMetrics) i instaluje globalny handler błędów przy imporcie,
// więc w testach podmieniamy całą paczkę. Testy sprawdzają wywołania przez require('expo-observe').Observe.
jest.mock('expo-observe', () => {
  const Observe = {
    configure: jest.fn(),
    reportError: jest.fn(),
    logEvent: jest.fn(),
    markInteractive: jest.fn(),
    setGlobalAttributes: jest.fn(),
    dispatchEvents: jest.fn(() => Promise.resolve()),
  };
  const Pass = ({ children }) => children;
  const React = require('react');
  class ObserveErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error) {
      Observe.reportError(error);
    }
    render() {
      if (!this.state.hasError) return this.props.children;
      const f = this.props.fallback;
      return typeof f === 'function' ? f({ error: this.state.error, resetError: () => this.setState({ hasError: false, error: null }) }) : f;
    }
  }
  return { Observe, default: Observe, ObserveRoot: Pass, ObserveErrorBoundary, useObserve: () => ({ markInteractive: Observe.markInteractive }) };
});
