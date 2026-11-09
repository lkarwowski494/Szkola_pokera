import { Component, type ErrorInfo, type ReactNode } from 'react';
import { zapiszBlad } from '@/platform/dziennik';

type Props = {
  children: ReactNode;
  fallback: (p: { resetError: () => void }) => ReactNode;
  /** Po złapaniu błędu (np. zdjęcie ekranu startowego, gdy pierwszy render nawigacji się nie udał — przegląd D-043 sesji R). */
  onBlad?: () => void;
};

/**
 * Granica błędu renderowania (ADR 0009; tlo-i-bledy.md §4 `wyjatek_ekranu`): wpis w dzienniku lokalnym i ekran zastępczy.
 * Nie łapie błędów w obsłudze zdarzeń i w kodzie asynchronicznym (react.dev, Component: „Error boundaries do not catch
 * errors for: Event handlers […] Asynchronous code”) — te obsługuje kod wywołujący.
 */
export class GranicaBledu extends Component<Props, { blad: boolean }> {
  state = { blad: false };

  static getDerivedStateFromError(): { blad: boolean } {
    return { blad: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    zapiszBlad('wyjatek_ekranu');
    this.props.onBlad?.();
  }

  private reset = (): void => this.setState({ blad: false });

  render(): ReactNode {
    return this.state.blad ? this.props.fallback({ resetError: this.reset }) : this.props.children;
  }
}
