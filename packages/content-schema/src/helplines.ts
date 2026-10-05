import { z } from 'zod';

/**
 * Telefony i miejsca pomocy (content/helplines.yaml, B-058): jedno źródło prawdy dla ramki „Odpowiedzialna gra”
 * w lekcji M12-L4 i ekranu „Pomoc” w ustawieniach. Nie należy do bazy treści, więc nie zmienia CONTENT_SCHEMA_VERSION.
 */

const httpsUrl = z.string().regex(/^https:\/\/[^\s]+$/, 'adres https://');
/** Numer w zapisie do wyświetlenia: cyfry ze spacjami („801 889 880”). */
const phone = z.string().regex(/^\d[\d ]*\d$/, 'numer: cyfry i spacje');

export const HelplineSource = z.object({ url: httpsUrl, quote: z.string().min(3) }).strict();

export const HelplineEntry = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(3),
    phone: phone.optional(),
    hours: z.string().min(3).optional(),
    cost: z.string().min(3).optional(),
    info: z.string().min(3).optional(),
    links: z.array(z.object({ label: z.string().min(2), url: httpsUrl }).strict()).optional(),
    /** Przeczytane źródło każdego wpisu: adres i dosłowny cytat (ADR-24). */
    sources: z.array(HelplineSource).min(1),
  })
  .strict()
  .refine((e) => e.phone || e.links?.length, 'wpis potrzebuje numeru albo linku');
export type HelplineEntry = z.infer<typeof HelplineEntry>;

export const HelplinesFile = z
  .object({
    /** Data sprawdzenia danych u źródeł (RRRR-MM-DD). */
    checked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Dopisek dla osób za granicą; {{phone:id}} wstawia numer z wpisu. */
    abroad: z.string().min(3),
    entries: z.array(HelplineEntry).min(1),
  })
  .strict();
export type HelplinesFile = z.infer<typeof HelplinesFile>;

/** Adres tel: z numeru do wyświetlenia („801 889 880” → „tel:801889880”). */
export function telUri(phoneText: string): string {
  return `tel:${phoneText.replace(/\s/g, '')}`;
}

const MONTHS_GENITIVE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

/** „2026-10-05” → „5 października 2026”. */
export function formatPolishDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  const month = m ? MONTHS_GENITIVE[Number(m[2]) - 1] : undefined;
  if (!m || !month) throw new Error(`niepoprawna data ${iso}`);
  return `${Number(m[3])} ${month} ${m[1]}`;
}

/** Podstawia {{phone:id}} numerem z wpisu. Nieznany wpis albo wpis bez numeru przerywa budowanie. */
export function resolvePhoneRefs(text: string, entries: readonly Pick<HelplineEntry, 'id' | 'phone'>[]): string {
  return text.replace(/\{\{phone:([a-z0-9-]+)\}\}/g, (_, id: string) => {
    const p = entries.find((e) => e.id === id)?.phone;
    if (!p) throw new Error(`helplines.yaml: {{phone:${id}}}: brak wpisu z numerem`);
    return p;
  });
}
