// Kontrole całego drzewa repo (K-07, K-09, R-56; D-236): bramka w `pnpm run ci` przez `pnpm test:kontrole`.
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['**/*.test.ts'] } });
