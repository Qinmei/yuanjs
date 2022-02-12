import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Middleware } from '@yuanjs/core';

import { modelStore } from './store';

export const renderModel: Middleware = (module, children) => {
  modelStore.init(module);
  const store = modelStore.getStore();

  return <Provider store={store as Store}>{children}</Provider>;
};
