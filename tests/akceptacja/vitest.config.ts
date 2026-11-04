// Testy oczekujące (D-175): poza `pnpm run ci`, uruchamiane `pnpm test:akceptacja`. Rola 08 przenosi test do pakietu w commicie, który go zazielenia.
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['**/*.test.ts'] } });
