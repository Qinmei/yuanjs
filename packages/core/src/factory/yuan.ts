import { Module, FactoryOptions, Middleware } from '../interface';
import { MiddlewareFactory } from './middleware';
import { ModuleFactory } from './module';

// yuan的基类，所有的状态都在这里进行维护和管理
// 通过传递模块树，将其组装后生成react的JSX组件树，也就是中间再抽象一层
// middleware每次加载则重新初始化整个react树，module则需要实现动态加载，只初始化加载的部分，而不影响其他的部分
export class Yuan {
  private middlewareFactory: MiddlewareFactory;
  private moduleFactory: ModuleFactory;

  // 初始化的时候进行参数的配置和映射, 并生成静态的组件
  constructor(
    private rootModule: Module,
    private options: FactoryOptions,
    private callback?: (rootElement: JSX.Element) => void
  ) {
    const middleware: Middleware[] =
      Reflect.get(this.options as object, 'middleware') || [];
    this.moduleFactory = new ModuleFactory(this.rootModule);

    // middlewareFactory不再接受module类型，需要接受处理后的module格式，同时也需要考虑兼容性，不过当前对外的插件不多，可以考虑一次性全部升级掉
    // 这里的逻辑关系有问题，yuan应该是控制方，不能将这个传递给子类进行深入控制，需要实现类似控制反转的实现
    // 再通过模块的遍历操作，来将插件完整注入进去
    this.middlewareFactory = new MiddlewareFactory(
      middleware,
      this.rootModule,
      callback
    );
  }

  // 中间件的操作，统一都封装到这里面去
  public middleware = {
    add: (middleware: Middleware) => {
      this.middlewareFactory.add(middleware);
    },
    insert: (before: Middleware, middleware: Middleware) => {
      this.middlewareFactory.insert(before, middleware);
    },
    remove: (middleware: Middleware) => {
      this.middlewareFactory.remove(middleware);
    },
  };

  // 模块的操作，统一封装
  public module = {
    add: (module: Module) => {
      this.middlewareFactory.addModule(module);
    },
    // 这里可以考虑添加一个remove方法，或者直接在中间件中处理
  };

  public getRootElement = () => this.middlewareFactory.getRootElement();
}
