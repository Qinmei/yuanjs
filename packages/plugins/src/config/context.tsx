import React, { FC, createContext, useReducer, useState } from 'react';

export type LocaleType = 'zh' | 'en';

interface DataType {
  locale: LocaleType;
}

interface MethodsType {
  changeLocale: (value: LocaleType) => void;
}

interface ContextProps {
  state: DataType;
  methods: MethodsType;
}

const ConfigContext = createContext({} as ContextProps);

const ConfigProvider: FC = props => {
  const { children } = props;
  const [localeDefault] = useState<LocaleType>('zh');

  const reducer = (state: DataType, action: Partial<DataType>) => {
    return {
      ...state,
      ...action,
    };
  };

  const data: DataType = {
    locale: localeDefault,
  };

  const [state, dispatch] = useReducer(reducer, data);

  const methods: MethodsType = {
    changeLocale: value => dispatch({ locale: value }),
  };

  const contextValue: ContextProps = {
    state,
    methods,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
