import { createFactoryRender } from './render';
import { createFactoryLocale } from './locale';
import { createFactoryModel } from './model';
import { AnyAction, Store } from 'redux';

interface FactoryOptions {}

export const createFactory = (
  appModule: any,
  options: FactoryOptions,
  render: (value: {
    locales: Record<string, Record<string, string>>;
    store: Store<unknown, AnyAction>;
    children: JSX.Element;
  }) => React.FC,
) => {
  const modules = Reflect.getMetadata('imports', appModule);

  const store = createFactoryModel(modules);
  const locales = createFactoryLocale(modules);
  const children = createFactoryRender(appModule);

  return render({ locales, store, children });
};
