import type { ScreenMeta } from '@/prototype/metadata/types';

const registry = new Map<string, ScreenMeta>();

export function registerScreenMeta(meta: ScreenMeta): void {
  registry.set(meta.route, meta);
}

export function getScreenMeta(route: string): ScreenMeta | undefined {
  return registry.get(route);
}

export function listScreenMeta(): ScreenMeta[] {
  return [...registry.values()];
}
