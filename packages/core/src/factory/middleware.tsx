/**
 * middleware则希望能够更加的纯粹与简洁，另外不做成component传参的形式也是希望能够尽可能的摆脱react的影响，不做成运行时的配置，而是打包的时候就生成完毕，可以静态分析
 * 需要考虑一点，module动态加载后，需要在插件侧重新执行一遍，避免状态不一致，因此需要每个插件提供一个方法，以便能够调用
 */
import type { Middleware, Module as ModuleType } from '../interface';
import { emptyElement } from './template';

export class MiddlewareFactory {
  private rootElement: JSX.Element = emptyElement;

  constructor(
    private middlewares: Middleware[] = [],
    private rootModule: ModuleType,
    private callback?: (rootElement: JSX.Element) => void
  ) {
    this.rootElement = this.compose(middlewares, rootModule);
    this.callback?.(this.rootElement);
  }

  private compose = (middlewares: Middleware[], rootModule: ModuleType) => {
    return middlewares.reduceRight(
      (prev, next) => next(rootModule, prev),
      emptyElement
    );
  };

  // 添加插件，并且重新加载整个react树，但是最好得有个callback,不然外部无法感知到变化
  public add = (middleware: Middleware) => {
    if (this.middlewares.includes(middleware)) return;
    this.middlewares.push(middleware);
    this.reload();
  };

  public insert = (before: Middleware, middleware: Middleware) => {
    const index = this.middlewares.indexOf(before);
    if (index === -1) {
      return this.add(middleware);
    }
    if (this.middlewares.includes(middleware)) return;
    this.middlewares.splice(index, 0, middleware);
    this.reload();
  };

  public remove = (middleware: Middleware) => {
    this.middlewares = this.middlewares.filter(item => item !== middleware);
    this.reload();
  };

  public reload = () => {
    this.rootElement = this.compose(this.middlewares, this.rootModule);
    this.callback?.(this.rootElement);
  };

  // 添加模块，通知每个插件进行对应的操作，是否存在部分操作，需要重置外部的组件？比如说提供一些接口，使其能够调用外部的函数进行重新加载？
  // 感觉还是尽量不要将权限开放太多，就在有限的情况下提供即可，限制动态模块对插件的影响
  // 后续如果有类似的需求的话，可以考虑将yuan的部分权限传递进去
  // 有个问题，这里如果需要用户手动传递的话，那么对象引用则可能跟之前不一样，是否需要考虑这一点？待确认
  public addModule = (module: ModuleType) => {
    this.middlewares.forEach(middleware => {
      if (middleware.addModule && typeof middleware.addModule === 'function') {
        middleware.addModule(module);
      }
    });
  };

  // 移除模块，中间件可以考虑如何对其进行操作
  public removeModule = (module: ModuleType) => {
    this.middlewares.forEach(middleware => {
      if (
        middleware.removeModule &&
        typeof middleware.removeModule === 'function'
      ) {
        middleware.removeModule(module);
      }
    });
  };

  public getRootElement = () => this.rootElement;
}
