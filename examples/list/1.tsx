import { Module } from '../../packages/core/src/interface';
import React from 'react';
import { AppRender1 } from '../module/7';
import { modules11 } from './11';
import { modules12 } from './12';

export const modules1: Module = {
  imports: [modules11, modules12],
  options: {
    namespace: 'module-1',
  },
  render: () => <AppRender1 />,
};
