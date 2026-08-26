import type { PrototypeStatus } from '@/prototype/config';

export type ScreenMeta = {
  screenId?: string;
  screenName: string;
  route: string;
  legacyNodeId?: string;
  taskId?: string;
  prototypeStatus: PrototypeStatus;
  relatedBp?: string;
  relatedFlow?: string;
  cmpIds?: string[];
};

export type LegacyFigmaReference = {
  fileKey?: string;
  nodeId?: string;
  legacyScreenName?: string;
  keep: string[];
  modify: string[];
  remove: string[];
  add: string[];
  states: string[];
};
