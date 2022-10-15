interface ModuleOptions {
  namespace: string;
}

interface SystemOptions {
  forRoot?: boolean;
  module?: Module;
}

interface PropsType {
  modules: Module[];
}

export interface Module<T = Record<string, unknown>> {
  _system?: SystemOptions;

  imports?: Module[];
  options?: ModuleOptions & T;
  locale?: { type: string; content: Record<string, string> }[];
  render?: React.FunctionComponentElement<PropsType>;
  models?: unknown[];
}
