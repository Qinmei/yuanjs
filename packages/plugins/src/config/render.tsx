import React from 'react';

import { Middleware, Module, traverseModule } from '@yuanjs/core';

import { ConfigProvider } from './context';

export const renderConfig: Middleware = (module, children) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};
