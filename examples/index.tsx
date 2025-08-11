import React from 'react';
import { render } from 'react-dom';
import { Yuan } from '../packages/core/src/factory';
import { appModule } from './modules';

const init = (App: JSX.Element) => {
  render(App, document.getElementById('root'));
};

export const yuan = new Yuan(appModule, { middleware: [renderRouter] }, init);
