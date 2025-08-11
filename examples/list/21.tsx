import { Module } from '../../packages/core/src/interface';
import React from 'react';
import { AppRender21 } from '../module/2';

export const modules21: Module = {
  imports: [],
  options: {
    namespace: 'module-21',
  },
  render: () => <AppRender21 />,
};
