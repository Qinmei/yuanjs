import { Module } from '../../packages/core/src/interface';
import React from 'react';

import { AppRender2 } from '../module/3';
import { modules21 } from './21';
import { modules22 } from './22';

export const modules2: Module = {
  imports: [modules21, modules22],
  options: {
    namespace: 'module-2',
  },
  render: () => <AppRender2 />,
};
