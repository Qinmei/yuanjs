import { Middleware, Module, traverseModule } from '@yuan/core';
import { ConfigProvider } from './provider';

export const renderLocale: Middleware = (module, children) => {
  const locales = generateLocales(module);

  return <ConfigProvider locales={locales}>{children}</ConfigProvider>;
};

const generateLocales = (module: Module) => {
  return traverseModule(module).reduce(
    (prev, next) => {
      prev.zh = Object.assign(formatLocales(next?.locale || [], 'zh'), prev.zh);
      prev.en = Object.assign(formatLocales(next?.locale || [], 'en'), prev.en);
      return prev;
    },
    { zh: {}, en: {} }
  );
};

const formatLocales = (
  locales: { type: string; content: Record<string, string> }[],
  type: string
) => {
  return locales.filter(item => item?.type === type)?.[0]?.content ?? {};
};
