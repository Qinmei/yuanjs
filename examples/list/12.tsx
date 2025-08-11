import { Module } from '../../packages/core/src/interface';
import React from 'react';

import { AppRender12 } from '../module/6';

export const modules12: Module = {
  imports: [],
  options: {
    namespace: 'module-12',
  },
  render: () => <AppRender12 />,
};
