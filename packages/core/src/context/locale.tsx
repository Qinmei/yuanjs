import React, { FC, createContext, useReducer } from 'react';
import { useLocalStorage } from 'react-use';

type LocaleType = string;

interface DataType {
  locale: LocaleType;
}

interface MethodsType {
  changeLocale: <T extends LocaleType>(value: T) => void;
}

interface ContextProps {
  state: DataType;
  methods: MethodsType;
}

interface PropsType {
  language: string;
}

const LocaleContext = createContext({} as ContextProps);

const LocaleProvider: FC<PropsType> = (props) => {
  const { children, language } = props;
  const [localeDefault] = useLocalStorage<LocaleType>('locale', language, {
    raw: true,
  });

  const reducer = (state: DataType, action: Partial<DataType>) => {
    return {
      ...state,
      ...action,
    };
  };

  const data: DataType = {
    locale: localeDefault as LocaleType,
  };

  const [state, dispatch] = useReducer(reducer, data);

  const methods: MethodsType = {
    changeLocale: (value) => dispatch({ locale: value }),
  };

  const contextValue: ContextProps = {
    state,
    methods,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export { LocaleContext, LocaleProvider };
