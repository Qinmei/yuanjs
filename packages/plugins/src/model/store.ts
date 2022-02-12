import { combineReducers, createStore, Store, ReducersMapObject } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Module, traverseModule } from '@yuanjs/core';

class ModelStore {
  private store: Store | undefined;
  private reducers: ReducersMapObject | undefined;

  init(module: Module) {
    this.reducers = this.initReducer(module);
    this.store = this.initStore(this.reducers);
  }

  initStore = (reducers: ReducersMapObject) => {
    const rootReducer = combineReducers(reducers);
    return createStore(rootReducer, composeWithDevTools());
  };

  initReducer = (module: Module) => {
    const models = traverseModule(module)
      .map(item => item?.models || [])
      .flat();

    const reducers: any = models.reduce(
      (reducers: ReducersMapObject, Model: any) => {
        const model = new Model();
        const name = model.namespace;

        reducers[name] = model.reducer;
        return reducers;
      },
      {} as ReducersMapObject
    );

    return reducers;
  };

  getStore = () => this.store;
  getReducers = () => this.reducers;
}

export const modelStore = new ModelStore();
