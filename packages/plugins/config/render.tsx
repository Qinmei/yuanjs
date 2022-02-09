import { Middleware } from '@yuan/core';
import { ConfigProvider, ConfigContext } from './context';

export const renderConfig: Middleware = (module, children) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export { ConfigContext };
