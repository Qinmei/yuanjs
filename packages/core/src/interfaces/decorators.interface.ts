import { ReactNode } from 'react';

type LocaleType = { type: string; content: Record<string, string> }[];

export interface ModuleMetadata {
  options?: string | Record<string, unknown>;
  locale?: LocaleType;
  model?: any[];
  imports?: any[];
  render?: ReactNode;
}
