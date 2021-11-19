import React from 'react';
import { render } from 'react-dom';
import { createFactory, Module } from '../packages/core/src/index';

@Module({
  imports: [],
})
export class AppModule {
  static render(children: any[]) {
    return <div>sssss</div>;
  }
}

export const App = createFactory(
  AppModule,
  {},
  ({ store, locales, children }) => () => <div>{children}</div>
);

render(<App />, document.getElementById('root'));
