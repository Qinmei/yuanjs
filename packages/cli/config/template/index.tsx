import { render } from 'react-dom';
import { createFactory } from '@yuanjs/core';
import {
  renderConfig,
  renderLocale,
  renderModel,
  renderRouter,
} from '@yuanjs/plugins';

const AppModule = require(process.env.APPINDEX).default;

const App = createFactory(AppModule, {
  middleware: [renderModel, renderConfig, renderLocale, renderRouter],
});

render(App, document.getElementById('root'));
