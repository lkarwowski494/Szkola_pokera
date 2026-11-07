// PROP_RUNS (przebieg nocny, D-171): wspólne ustawienie fast-check z tests/narzedzia/.
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { setupFiles: ['../../tests/narzedzia/fast-check-nocny.ts'] } });
