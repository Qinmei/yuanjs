import { Module } from '../packages/core/src/interface';
import React from 'react';
import { AppRender } from './module/8';
import { modules1 } from './list/1';

export const appModule: Module = {
  imports: () => [modules1],
  options: {
    namespace: 'app-module',
  },
  render: () => <AppRender />,
};
