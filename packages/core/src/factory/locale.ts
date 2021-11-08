const getLocale = (sources: any[], locale: Record<string, Record<string, string>>) => {
  sources.forEach((module: any) => {
    const locales: { type: string; content: Record<string, string> }[] =
      Reflect.getMetadata('locale', module) || [];
    const modules = Reflect.getMetadata('imports', module) || [];

    modules.length && getLocale(modules, locale);

    locales.forEach((item) => {
      locale[item.type] = {
        ...locale[item.type],
        ...item.content,
      };
    });
  });
};

export const createFactoryLocale = (sources: any[]) => {
  const locales: Record<string, Record<string, string>> = {};

  getLocale(sources, locales);

  return locales;
};
