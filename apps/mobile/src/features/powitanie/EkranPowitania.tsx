import { niezaimplementowane } from '../zaslepka';

/** Pierwszy ekran po pierwszym uruchomieniu (PR-01, BR-ONB-004): czym jest aplikacja; „Dalej” prowadzi do oceny poziomu. */
export type PropsEkranuPowitania = { onDalej(): void };

export default function EkranPowitania(_: PropsEkranuPowitania): React.JSX.Element {
  return niezaimplementowane('EkranPowitania (BR-ONB-004)');
}
