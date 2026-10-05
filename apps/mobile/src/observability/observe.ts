/**
 * EAS Observe tylko do metryk startu aplikacji (ADR-17, wariant C z 5.10.2026). W planie Free są „Launch metrics”,
 * a panel błędów i panel nawigacji nie (expo.dev/pricing: „Errors dashboard — Free —”, „Navigation events dashboard
 * — Free —”), dlatego błędy zgłaszamy do Sentry (crashReports.ts), a integracji expo-router nie włączamy.
 *
 * Co Observe mierzy: ObserveRoot w _layout zaznacza pierwsze wyrenderowanie, a markInteractive na mapie nauki czas do
 * interakcji. Ograniczenie wersji 57.x: pakiet przy imporcie sam rejestruje nieobsłużone błędy JS i awarie natywne,
 * a opcji errorHandlingEnabled (wyłączenie) nie ma przed linią 58; te zdarzenia liczą się do limitu planu Free.
 * Bez danych osobowych: Observe identyfikuje instalację losowym identyfikatorem i nie nagrywa ekranu.
 */
export { ObserveRoot, useObserve } from 'expo-observe';
