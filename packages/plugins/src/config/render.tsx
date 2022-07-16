import React from 'react';

import { Middleware, Module, traverseModule } from '@yuanjs/core';

import { ConfigContext, ConfigProvider } from './context';

export const renderConfig: Middleware = (module, children) => {
  generateConfig(module);
  return <ConfigProvider>{children}</ConfigProvider>;
};

export { ConfigContext };

const config = new Map();

const generateConfig = (module: Module) => {
  traverseModule(module).forEach(item => {
    config.set(item, item.data);
  });
};

export const getModuleConfig = <T,>(module: Module): T => config.get(module);
