import { Module } from '../../packages/core/src/interface';
import React from 'react';
import { AppRender3 } from '../module/4';

export const modules3: Module = {
  imports: [],
  options: {
    namespace: 'module-3',
  },
  render: () => <AppRender3 />,
};
