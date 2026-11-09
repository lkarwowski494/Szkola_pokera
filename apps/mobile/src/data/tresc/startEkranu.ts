// Kiedy zdjąć ekran startowy (przegląd D-043 sesji Q, P2a): gdy pokaże się nawigacja — dopiero po otwarciu bazy treści
// w `ProviderTresci` (`onPierwszeOtwarcie`), bo do tego czasu renderuje null (pusta klatka); gdy ekran błędu — od razu.
export type StanStartu = { tresc: 'ladowanie' | 'ok' | 'blad'; postep: 'ladowanie' | 'ok' | 'blad'; kroje: boolean; bazaTresciOtwarta: boolean };

export function ekranStartowyDoZdjecia(s: StanStartu): boolean {
  if (s.tresc === 'ladowanie' || s.postep === 'ladowanie' || !s.kroje) return false;
  const nawigacja = s.tresc === 'ok' && s.postep === 'ok';
  return !nawigacja || s.bazaTresciOtwarta;
}
