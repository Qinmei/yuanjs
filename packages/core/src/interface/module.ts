interface ModuleOptions {
  namespace: string;
}

interface PropsType {
  modules: Module[];
}

export interface Module<
  T = Record<string, unknown>,
  K = Record<string, unknown>
> {
  imports?: Module[] | (() => Module[]);
  options?: ModuleOptions & T;
  data?: K;
  locale?: { type: string; content: Record<string, string> }[];
  render?: () => React.FunctionComponentElement<PropsType>; // 此处可替换成函数生成，这样应该可以避免模块初始化，减少不必要的渲染
}
