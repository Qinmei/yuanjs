import { Module } from '../interfaces';

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
