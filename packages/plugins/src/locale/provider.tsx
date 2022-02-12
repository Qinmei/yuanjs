import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { FC, memo, useContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import { ConfigContext } from '../config/context';

import antdEn from 'antd/es/locale/en_US';
import antdZh from 'antd/es/locale/zh_CN';

interface PropsType {
  locales: Record<string, Record<string, string>>;
}
export const ConfigProvider: FC<PropsType> = memo(props => {
  const { locales, children } = props;

  const {
    state: { locale },
  } = useContext(ConfigContext);

  const antdLocale = useMemo(() => {
    if (locale === 'zh') return antdZh;
    if (locale === 'en') return antdEn;
    return antdZh;
  }, [locale]);

  return (
    <AntdConfigProvider locale={antdLocale}>
      <IntlProvider locale={locale} messages={locales[locale]}>
        {children}
      </IntlProvider>
    </AntdConfigProvider>
  );
});
