/** Komunikat z wartości przechwyconej w `catch` (typ unknown): Error daje message, wszystko inne String(); bez rzutowania `as Error` (FF NIS-003). */
export function komunikatBledu(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
