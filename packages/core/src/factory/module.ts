import { Module } from '../interface';

export const traverseModule = (module: Module) => {
  const modules: Module[] = [module];
  const result: Module[] = [];

  while (modules.length) {
    const node = modules[0];
    const subModules = Reflect.get(node, 'imports') || [];

    modules.push(...subModules);
    result.push(node);
    modules.shift();
  }

  return result;
};

export const forRoot = <T>(module: Module, data: T) => {
  const current = { ...module };
  current.options = { ...module?.options, ...data };

  if (!current._system) {
    current._system = {};
  }

  current._system.forRoot = true;
  current._system.module = module;
  return current as Module;
};
