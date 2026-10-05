// Start wątku roboczego gry po flopie: ładuje moduł TypeScript przez tsx (src/pfworker.ts).
import { tsImport } from 'tsx/esm/api';
await tsImport('./pfworker.ts', import.meta.url);
