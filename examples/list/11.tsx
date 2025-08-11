import { Module } from '../../packages/core/src/interface';
import React from 'react';

import { AppRender11 } from '../module/5';

export const modules11: Module = {
  imports: [],
  options: {
    namespace: 'module-11',
  },
  render: () => <AppRender11 />,
};
