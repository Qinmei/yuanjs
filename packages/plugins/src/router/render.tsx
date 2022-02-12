import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Middleware, Module } from '@yuanjs/core';

export const renderRouter: Middleware = (module, children) => {
  const render = createRender(module);

  return (
    <BrowserRouter basename={process.env.namespace || undefined}>
      {render.render || children}
    </BrowserRouter>
  );
};

const createRender = (module: Module) => {
  const modules: Module[] = Reflect.get(module, 'imports') || [];
  const moduleRender = module.render;

  if (!moduleRender) return module;

  const routes = modules
    .map(module => createRender(module))
    .filter(item => item.render);

  module.render = React.cloneElement(moduleRender, { modules: routes });
  return module;
};
