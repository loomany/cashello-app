import { registerScreenMeta } from '@/prototype/metadata/registry';
import type { ScreenMeta } from '@/prototype/metadata/types';

export function useScreenMeta(meta: ScreenMeta): void {
  registerScreenMeta(meta);
}
