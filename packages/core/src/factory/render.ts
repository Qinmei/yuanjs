export const createFactoryRender = (appModule: any) => {
  const modules = Reflect.getMetadata('imports', appModule) || [];
  const moduleReder = appModule.render;

  if (!moduleReder) return undefined;

  const routes = modules.map((module: any) => {
    const options = Reflect.getMetadata('options', module);
    const component = createFactoryRender(module);

    return {
      options,
      component,
    };
  });

  return moduleReder(routes);
};
