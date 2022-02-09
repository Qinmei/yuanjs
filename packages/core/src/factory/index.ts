/**
 * 1. 用遍历算法将所有的模块都遍历出来，然后将其组成二维数组
 * 2. 用加载的中间件去处理二维模块数据，生成reduce结果
 * 3. 将生成的组件层层包裹起来生成最终的组件详情
 */

import { FactoryOptions, Middleware, Module } from '../interface';
import { compose } from './middleware';
import { traverseModule } from './module';

export const createFactory = (appModule: Module, options?: FactoryOptions) => {
  const middleware: Middleware[] = Reflect.get(options, 'middleware') || [];
  const res = compose(middleware, appModule);

  return res;
};

export { traverseModule };
