import React, { createContext, FC, useMemo } from 'react';
import { Module } from '@yuanjs/core';

type ModuleType = Map<
  Module,
  {
    module?: Module;
    options?: Record<string, unknown>;
  }
>;

interface ContextProps {
  modules: ModuleType;
}

const DataContext = createContext({} as ContextProps);

interface PropsType {
  modules: ModuleType;
}

const DataProvider: FC<PropsType> = props => {
  const { modules, children } = props;

  const data = useMemo(() => {
    return {
      modules,
    };
  }, [modules]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
