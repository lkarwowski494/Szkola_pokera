/// <reference types="jest" />
// P2(a) przeglądu D-043 sesji Q: ekran startowy schodził, gdy plik treści był gotowy, a `ProviderTresci` jeszcze otwierał bazę
// (render null) — pusta klatka między ekranem startowym a nawigacją. Teraz czeka na `onPierwszeOtwarcie`, gdy nawigacja ma się pokazać.
import { ekranStartowyDoZdjecia, type StanStartu } from '../startEkranu';

const gotowe: StanStartu = { tresc: 'ok', postep: 'ok', kroje: true, bazaTresciOtwarta: true };

describe('ekran startowy: kiedy zdjąć (P2a)', () => {
  it('nawigacja: dopiero po otwarciu bazy treści w kontekście', () => {
    expect(ekranStartowyDoZdjecia({ ...gotowe, bazaTresciOtwarta: false })).toBe(false);
    expect(ekranStartowyDoZdjecia(gotowe)).toBe(true);
  });
  it('ekran błędu treści albo postępu (bez ProviderTresci): od razu, bez czekania na bazę', () => {
    expect(ekranStartowyDoZdjecia({ ...gotowe, tresc: 'blad', bazaTresciOtwarta: false })).toBe(true);
    expect(ekranStartowyDoZdjecia({ ...gotowe, postep: 'blad', bazaTresciOtwarta: false })).toBe(true);
  });
  it('w trakcie ładowania treści, postępu albo krojów: nie', () => {
    expect(ekranStartowyDoZdjecia({ ...gotowe, tresc: 'ladowanie' })).toBe(false);
    expect(ekranStartowyDoZdjecia({ ...gotowe, postep: 'ladowanie' })).toBe(false);
    expect(ekranStartowyDoZdjecia({ ...gotowe, kroje: false })).toBe(false);
  });
});
