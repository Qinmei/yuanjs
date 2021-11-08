import { createStore, combineReducers, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { handStore } from '../redux/store';

const getModel = (sources: any[], reducers: Record<string, unknown>) => {
  sources.forEach((module: any) => {
    const models = Reflect.getMetadata('model', module) || [];
    const modules = Reflect.getMetadata('imports', module) || [];

    modules.length && getModel(modules, reducers);

    models.forEach((ele: any) => {
      const ModelClass = ele;
      if (!ModelClass) return;
      const model = new ModelClass();
      const namespace = model.namespace;
      reducers[namespace] = model.handler;
    });
  });
};

export const createFactoryModel = (sources: any[]) => {
  const reducers: Record<string, unknown> = {};

  getModel(sources, reducers);

  const rootReducer = combineReducers(reducers as any);
  const [, setStore] = handStore();

  const store: Store = createStore(rootReducer, composeWithDevTools());
  // @ts-ignore
  setStore(store);
  return store;
};
