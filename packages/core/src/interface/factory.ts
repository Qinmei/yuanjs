import { Module } from './module';

export interface FactoryOptions {
  middleware?: Middleware[];
}

// 是否需要考虑兼容性，还是说直接使用新的格式
// 中间件还是得使用洋葱模型组合，可以修改格式，但是得加默认逻辑
export type Middleware = ((
  module: Module,
  children: JSX.Element
) => JSX.Element) & {
  // 初始化执行，框架启动时会先执行一遍，以防有一些信息需要注册
  init?: () => void;

  // render模块，将返回的组件等信息进行组合之后添加，跟现在的逻辑保持一致，传入的是module类还是YuanModule类？这个需要考虑清楚，路由需要将子类拼接起来，或者能不能直接使用<DynamicModule />可以将module注册在当前的组件下，这样插件就直接基于当前的组件来render即可
  render: (module: Module) => void;

  // 添加模块，主要对其进行render处理，但是如果重新render整棵树的话，这个有点不太现实，可以在插件的实现上不提供重新全局render的方法
  add?: (module: Module) => void;

  // 移除模块，跟添加相反，实现动态加载和移除，避免内存泄漏
  remove?: (module: Module) => void;
};
// 中间件核心的一部分在于，compose之后是提供新的返回的，得用来做组件包裹，如果动态加载的话，得重新执行一遍，或者可以考虑将其拆分？render中进行节点渲染，然后提供add的方法来对每个模块进行处理和操作

// <DynamicModule />的设计需要重新完善，支持中间件等挂载和使用
// 这么来看，中间件得优化一下，不能直接使用模块的格式来处理，得使用module的方法，比如说module.getOptions, module.getRender, 避免模块的数据格式跟外部设置强绑定
