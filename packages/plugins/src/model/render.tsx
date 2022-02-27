import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Middleware } from '@yuanjs/core';

import { modelStore } from './store';

export const renderModel: Middleware = (module, children) => {
  modelStore.init(module);
  const store = modelStore.getStore();

  return (
    <div className="renderModel">
      <Provider store={store as Store}>{children}</Provider>
    </div>
  );
};
