interface ModuleOptions {
  namespace: string;
}

interface PropsType {
  modules: Module[];
}

export interface Module {
  imports?: Module[];
  options?: ModuleOptions;
  locale?: { type: string; content: Record<string, string> }[];
  render?: React.FunctionComponentElement<PropsType>;
  models?: any[];
}
