// GA (recenzja FZ CI): sonda tymczasowa — celowo czerwony test, cofnięta następnym commitem. Dowód: check = failure, gdy część pada.
import { expect, test } from 'vitest';
test('GA sonda: celowo czerwony', () => { expect(1).toBe(2); });
